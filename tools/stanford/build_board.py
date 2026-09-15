"""Build the Stanford company board from THREE layers, with backer filters.

Layers, in order of how systematic they are:

  A. YC census      tools/yc/stanford_yc.json — every company in the YC
                    directory (W22+) whose founder bios name Stanford as a
                    personal affiliation. Carries founders, degree level,
                    named labs and LinkedIn. 252 companies.
  B. StartX         tools/startx/companies.json — the full StartX community
                    directory, 1,270 companies 2010-2026. StartX is the
                    Stanford-affiliated accelerator: zero equity, no fees.
                    Carries session, industry and website but NO founders and
                    NO valuation, so degree level cannot come from here.
  C. Curated        reports/stanford-faculty-census/students.json — 28
                    hand-verified records that carry valuations and backers,
                    including the large non-YC names.

Dedupe is by normalised name and by website domain, so a company in two
layers becomes one row carrying both accelerator tags.

Degree level is only ever asserted where a source states it. Layer B supplies
none, which is why a large "unknown" bucket is reported rather than guessed at.

Output: reports/stanford-students-building.html
"""
import json, os, re, sys, io
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
ROOT = os.path.abspath(os.path.join(ROOT, ".."))
OUT = os.environ.get("BOARD_OUT", os.path.join(ROOT, "reports", "stanford-students-building.html"))

YC = json.load(io.open(os.path.join(ROOT, "tools", "yc", "stanford_yc.json"), encoding="utf-8"))
SX = json.load(io.open(os.path.join(ROOT, "tools", "startx", "companies.json"), encoding="utf-8"))
CU = json.load(io.open(os.path.join(ROOT, "reports", "stanford-faculty-census", "students.json"), encoding="utf-8"))

# ---------------------------------------------------------------- degree level
# Ordered most-specific first. "dropout" is kept as its own level because
# leaving mid-degree is the signal, not the degree that was abandoned.
LEVEL_ORDER = [
    ("phd", "PhD"), ("postdoc", "Postdoc"), ("md", "MD"), ("mba", "MBA"),
    ("masters", "MS"), ("undergrad", "Undergrad"), ("dropout", "Left mid-degree"),
    ("faculty", "Faculty"), ("researcher", "Researcher, degree unstated"),
    ("studied", "Studied there, degree unstated"),
    ("unspecified", "Stanford, capacity unstated"),
]
STUDENT_LEVELS = {"PhD", "Postdoc", "MD", "MBA", "MS", "Undergrad", "Left mid-degree"}

# Backers worth their own filter chip, matched against the curated backers text.
BACKERS = ["Y Combinator", "StartX", "a16z", "Sequoia", "Kleiner Perkins", "Lightspeed",
           "Index Ventures", "General Catalyst", "Benchmark", "Lux Capital", "NVIDIA",
           "Khosla", "GV", "Greenoaks", "NEA", "8VC", "Pear VC", "South Park Commons",
           "DCVC", "Menlo Ventures", "Madrona", "Emergence", "Neo", "Mayfield",
           "Afore", "Felicis", "Thiel Fellowship", "Founders Fund", "Accel", "Bessemer"]
BACKER_PAT = {b: re.compile(re.escape(b.split()[0]) if b in ("a16z",) else re.escape(b), re.I) for b in BACKERS}
BACKER_PAT["a16z"] = re.compile(r"a16z|andreessen", re.I)
BACKER_PAT["GV"] = re.compile(r"\bGV\b|Google Ventures", re.I)
BACKER_PAT["Neo"] = re.compile(r"\bNeo\b", re.I)


def norm(n):
    n = (n or "").lower()
    n = re.sub(r"\b(inc|llc|ltd|corp|co|technologies|technology|labs|lab|the|v\d)\b", " ", n)
    n = re.sub(r"[^a-z0-9]", "", n)
    return n


# Domains that are never a company's own site. The curated layer's "url" field
# is the SOURCE ARTICLE, not the company, so six curated companies shared
# techcrunch.com and collapsed into one row before this existed. StartX has 15
# companies pointing at lu.ma event pages. Both are dedupe poison.
NOT_A_COMPANY = set("""techcrunch.com forbes.com fortune.com bloomberg.com cnbc.com
sequoiacap.com a16z.com generalcatalyst.com menlovc.com lsvp.com greylock.com
ycombinator.com startx.com crunchbase.com pitchbook.com tracxn.com dealroom.co
sfstandard.com ktvu.com aol.com enstarz.com spotlightonstartups.com yahoo.com
gsb.stanford.edu stanford.edu businesswire.com prnewswire.com
lu.ma linkedin.com x.com twitter.com medium.com substack.com notion.so
github.com google.com docs.google.com sites.google.com youtube.com
payne.net""".split())


def dom(u):
    m = re.search(r"https?://(?:www\.)?([^/]+)", u or "")
    d = (m.group(1).lower() if m else "").replace("www.", "")
    return "" if d in NOT_A_COMPANY else d


def level_for(kinds):
    """The single most specific level in one founder's tie kinds."""
    for key, label in LEVEL_ORDER:
        if key in kinds:
            return label
    return ""


def levels_for(founders):
    """Every distinct level present across a company's founders.

    A company with a PhD founder and an undergrad founder holds BOTH. Collapsing
    to the highest degree hid most of the undergraduates — it took the undergrad
    count from 59 to 8 — so the board filters on set membership instead.
    """
    out = []
    for f in founders:
        lv = level_for(f["tie_kinds"] if "tie_kinds" in f else f.get("kinds", []))
        if lv and lv not in out:
            out.append(lv)
    return sorted(out, key=lambda l: [x[1] for x in LEVEL_ORDER].index(l))


rows, by_name, by_dom = [], {}, {}

# Any domain used by two or more distinct companies in the raw sources is
# ambiguous and is refused as a match key, whatever it is.
_dcount = Counter()
for _c in SX:
    _d = dom(_c.get("website"))
    if _d:
        _dcount[_d] += 1
for _h in YC["companies"]:
    _d = dom(_h.get("website"))
    if _d:
        _dcount[_d] += 1
AMBIGUOUS_DOM = {d for d, n in _dcount.items() if n > 1}


def put(rec):
    n = norm(rec["name"])
    d = dom(rec.get("website"))
    if d in AMBIGUOUS_DOM:
        d = ""
    hit = by_name.get(n) or (by_dom.get(d) if d else None)
    if hit:
        return hit
    rows.append(rec)
    by_name[n] = rec
    if d:
        by_dom[d] = rec
    return rec


# ---- Layer A: YC census
for h in YC["companies"]:
    fs = h.get("stanford_founders") or []
    kinds = sorted({k for f in fs for k in f["tie_kinds"]})
    put({
        "name": h["name"], "what": h["one_liner"] or "", "website": h["website"] or "",
        "accelerators": ["Y Combinator"], "backers": "",
        "yc_batch": h["batch"], "startx_session": "", "year": (h["batch"] or "").split()[-1],
        "status": h["status"], "industry": h["industry"] or "",
        "tie_kinds": kinds, "level": level_for(kinds), "levels": levels_for(fs),
        "labs": sorted({l for f in fs for l in f["labs"]}),
        "founders": [{"name": f["name"], "title": f["title"], "kinds": f["tie_kinds"],
                      "level": level_for(f["tie_kinds"]), "labs": f["labs"],
                      "linkedin": f.get("linkedin", ""), "bio": f["bio"]} for f in fs],
        "valuation": None, "raised": None, "round": "", "curated_founders": "",
        "yc_url": "https://www.ycombinator.com/companies/" + h["slug"],
        "sources": ["YC company page, founder bio"],
    })

# ---- Layer B: StartX
for c in SX:
    r = put({
        "name": c["name"], "what": c["description"] or "", "website": c["website"] or "",
        "accelerators": [], "backers": "",
        "yc_batch": "", "startx_session": c["session"], "year": c["year"],
        "status": "", "industry": c["industry"] or "",
        "tie_kinds": [], "level": "", "levels": [], "labs": [], "founders": [],
        "valuation": None, "raised": None, "round": "", "curated_founders": "",
        "yc_url": "", "sources": ["StartX community directory"],
    })
    if "StartX" not in r["accelerators"]:
        r["accelerators"].append("StartX")
    if not r["startx_session"]:
        r["startx_session"] = c["session"]
    if not r["year"]:
        r["year"] = c["year"]
    if not r["what"]:
        r["what"] = c["description"] or ""
    if not r["industry"]:
        r["industry"] = c["industry"] or ""
    if "StartX community directory" not in r["sources"]:
        r["sources"].append("StartX community directory")

# ---- Layer C: curated
for c in CU["companies"]:
    r = put({
        # url here is the SOURCE ARTICLE, deliberately not used as a website
        "name": c["name"], "what": c.get("what", ""), "website": "",
        "source_url": c.get("url", ""),
        "accelerators": [], "backers": c.get("backers", ""),
        "yc_batch": "", "startx_session": "", "year": str(c.get("founded", ""))[:4],
        "status": "private", "industry": c.get("domain", ""),
        "tie_kinds": [], "level": "", "levels": [], "labs": [], "founders": [],
        "valuation": c.get("valuation_usd"), "raised": c.get("raised_usd"),
        "round": c.get("round", ""), "curated_founders": c.get("founders", ""),
        "yc_url": "", "sources": ["hand-verified, press"],
    })
    # merge money and founder prose onto whatever row already exists
    r["valuation"] = r["valuation"] or c.get("valuation_usd")
    r["raised"] = r["raised"] or c.get("raised_usd")
    r["round"] = r["round"] or c.get("round", "")
    r["curated_founders"] = r["curated_founders"] or c.get("founders", "")
    if c.get("backers") and c["backers"] not in (r["backers"] or ""):
        r["backers"] = (r["backers"] + "; " if r["backers"] else "") + c["backers"]
    if not r["what"]:
        r["what"] = c.get("what", "")
    if "hand-verified, press" not in r["sources"]:
        r["sources"].append("hand-verified, press")
    # the curated tier is student-native by construction
    if not r["level"]:
        r["level"] = "Stanford, capacity unstated"

# ---- accelerator / backer tags from the curated backers prose
for r in rows:
    txt = " ".join([r.get("backers") or "", r.get("round") or ""])
    for b, pat in BACKER_PAT.items():
        if b in ("StartX",):
            continue
        if txt and pat.search(txt) and b not in r["accelerators"]:
            r["accelerators"].append(b)
    r["accelerators"] = sorted(set(r["accelerators"]))
    if not r.get("levels") and r.get("level"):
        r["levels"] = [r["level"]]
    r["student_tie"] = bool(STUDENT_LEVELS & set(r.get("levels") or []))
    if not r.get("levels"):
        r["levels"] = ["Unknown (no founder data)"]
    r["level"] = r["levels"][0]
    r["level_all"] = ", ".join(r["levels"])

rows.sort(key=lambda r: (-(r["valuation"] or 0), -(r["raised"] or 0), r["name"].lower()))

n_yc = sum(1 for r in rows if "Y Combinator" in r["accelerators"])
n_sx = sum(1 for r in rows if "StartX" in r["accelerators"])
n_both = sum(1 for r in rows if "Y Combinator" in r["accelerators"] and "StartX" in r["accelerators"])
known_level = sum(1 for r in rows if r["levels"] != ["Unknown (no founder data)"])
n_student = sum(1 for r in rows if r["student_tie"])
recent = [r for r in rows if (r["year"] or "0") >= "2021"]


def money(v):
    if not v:
        return "&mdash;"
    return "$%.2fB" % (v / 1e9) if v >= 1e9 else ("$%.0fM" % (v / 1e6) if v >= 1e6 else "$%.0fK" % (v / 1e3))


def esc(s):
    return (str(s) if s is not None else "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


tiles = [
    (str(len(rows)), "companies", "Union of three layers, deduplicated by name and domain: %d Y Combinator, %d StartX (%d in both), %d hand-verified."
     % (n_yc, n_sx, n_both, len(CU["companies"]))),
    (str(len(recent)), "from 2021 onward", "The rest reach back to StartX's first 2010 session, which is why the year filter exists."),
    ("%d of %d" % (known_level, len(rows)), "with a degree level",
     "Read off founder bios. StartX publishes no founder data at all, so most StartX-only rows are honestly unknown rather than guessed."),
    ("%d" % n_student, "student-level ties", "Undergrad, MS, PhD, postdoc, MBA, MD or left mid-degree. Faculty and unstated ties are excluded from this count."),
]
tile_html = "".join('<div class="tile"><div class="tile-n">%s</div><div class="tile-l">%s</div><div class="tile-d">%s</div></div>' % t for t in tiles)

ep_html = "".join(
    '<article class="ep"><h3><a href="%s" target="_blank" rel="noopener">%s</a></h3>'
    '<div class="ep-who">%s</div><p>%s</p></article>'
    % (e["url"], esc(e["name"]), esc(e["who"]), esc(e["note"])) for e in CU["entry_points"])

lvl_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (esc(k), v)
                   for k, v in Counter(l for r in rows for l in r["levels"]).most_common())
acc_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (esc(k), v)
                   for k, v in Counter(a for r in rows for a in r["accelerators"]).most_common())
yr_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (esc(k or "unstated"), v)
                  for k, v in sorted(Counter(r["year"] for r in rows).items(), reverse=True)[:18])
ind_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (esc(k), v)
                   for k, v in Counter(r["industry"] for r in rows if r["industry"]).most_common(14))
lab_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (esc(k), v)
                   for k, v in Counter(l for r in rows for l in r["labs"]).most_common())

HTML = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stanford Company Board &mdash; %(n)d companies, YC + StartX + hand-verified</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light;--paper:#f6f4ee;--surface:#fcfbf7;--ink:#141310;--ink-2:#52514e;--ink-3:#898781;
--hairline:#e3e1d7;--baseline:#c9c7bb;--accent:#b3300e;--accent-ink:#8f2609;--wash:#efece2;
--c-yc:#1baf7a;--c-sx:#4a3aa7;--c-cur:#b3300e;--c-multi:#eda100}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 "IBM Plex Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:1380px;margin:0 auto;padding:0 28px 80px}
header.top{border-bottom:1px solid var(--baseline);padding:44px 0 22px}
h1{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:40px;line-height:1.1;margin:0 0 10px;letter-spacing:-.01em}
.dek{font-size:17px;color:var(--ink-2);max-width:80ch;margin:0 0 14px}
.stamp{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}
nav.tabs{display:flex;border-bottom:1px solid var(--baseline);margin:26px 0 30px;flex-wrap:wrap}
nav.tabs button{appearance:none;background:none;border:0;border-bottom:2px solid transparent;padding:12px 16px;font:500 14px/1 "IBM Plex Sans";color:var(--ink-2);cursor:pointer}
nav.tabs button:hover{color:var(--ink)}
nav.tabs button[aria-selected=true]{color:var(--accent-ink);border-bottom-color:var(--accent)}
section.tab{display:none}section.tab.on{display:block}
h2{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:25px;margin:34px 0 6px}h2:first-child{margin-top:0}
.lede{color:var(--ink-2);max-width:88ch;margin:0 0 20px}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline);margin:0 0 24px}
.tile{background:var(--surface);padding:18px}
.tile-n{font-family:Fraunces,Georgia,serif;font-size:26px;font-weight:500;line-height:1.05}
.tile-l{font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--accent-ink);margin:6px 0 7px;font-weight:500}
.tile-d{font-size:12.5px;color:var(--ink-3);line-height:1.45}
.quick{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px}
.quick button{font:500 12px "IBM Plex Sans";padding:6px 11px;background:var(--surface);border:1px solid var(--baseline);cursor:pointer;color:var(--ink-2)}
.quick button:hover,.quick button.on{border-color:var(--accent);color:var(--accent-ink);background:var(--wash)}
table{width:100%%;border-collapse:collapse;background:var(--surface);font-size:13.5px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--hairline);vertical-align:top}
thead th{font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3);font-weight:500;border-bottom:1px solid var(--baseline);background:var(--wash)}
td.num,th.num{text-align:right;font-family:"IBM Plex Mono",monospace;font-size:12.5px}
td.dim{color:var(--ink-3);font-size:12.5px}
tbody tr:hover{background:var(--wash)}
.sub{display:block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);margin-top:2px}
a{color:var(--accent-ink);text-decoration:none;border-bottom:1px solid rgba(179,48,14,.28)}a:hover{border-bottom-color:var(--accent)}
.filters{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:16px;background:var(--surface);border:1px solid var(--hairline);margin-bottom:14px}
.filters label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:4px}
.filters select,.filters input{font:14px "IBM Plex Sans";padding:7px 9px;background:var(--paper);border:1px solid var(--baseline);color:var(--ink);min-width:150px}
button.btn{font:500 13px "IBM Plex Sans";padding:8px 13px;background:var(--paper);border:1px solid var(--baseline);cursor:pointer;color:var(--ink-2);margin-left:auto}
button.btn:hover{border-color:var(--accent);color:var(--accent-ink)}
.count{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--ink-3);margin:0 0 8px}
th.sortable{cursor:pointer;user-select:none}th.sortable:hover{color:var(--ink)}
th.sortable[data-dir=asc]::after{content:"\\2191";margin-left:5px}th.sortable[data-dir=desc]::after{content:"\\2193";margin-left:5px}
.chip{display:inline-block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;padding:2px 6px;border:1px solid var(--hairline);background:var(--paper);color:var(--ink-2);margin:0 3px 3px 0;white-space:nowrap}
.chip.yc{border-color:var(--c-yc);color:#0d7a54}.chip.sx{border-color:var(--c-sx);color:var(--c-sx)}
.lvl{font-family:"IBM Plex Mono",monospace;font-size:11px}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%%;margin-right:7px;vertical-align:-1px}
tr.row{cursor:pointer}
.drawer{position:fixed;top:0;right:0;width:min(620px,94vw);height:100%%;background:var(--surface);border-left:1px solid var(--baseline);box-shadow:-14px 0 44px rgba(20,19,16,.13);transform:translateX(102%%);transition:transform .22s ease;z-index:60;overflow-y:auto;padding:26px 28px 60px}
.drawer.on{transform:none}
.drawer h3{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:24px;margin:0 0 4px}
.drawer .dt{font-size:13.5px;color:var(--ink-2);margin:0 0 18px}
.drawer dt{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin:16px 0 3px}
.drawer dd{margin:0;font-size:14px}
.drawer .x{position:absolute;top:16px;right:20px;font-size:22px;color:var(--ink-3);cursor:pointer;line-height:1;background:none;border:0}
.scrim{position:fixed;inset:0;background:rgba(20,19,16,.16);opacity:0;pointer-events:none;transition:opacity .22s;z-index:55}
.scrim.on{opacity:1;pointer-events:auto}
.fr{border-top:1px solid var(--hairline);padding:10px 0 2px}
.eps{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline)}
.ep{background:var(--surface);padding:18px 20px}
.ep h3{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:19px;margin:0 0 4px}
.ep-who{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--accent-ink);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
.ep p{margin:0;font-size:13.5px;color:var(--ink-2)}
.note{background:var(--wash);border:1px solid var(--hairline);padding:16px 18px;font-size:13.5px;color:var(--ink-2);margin:0 0 18px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:28px}
footer{border-top:1px solid var(--baseline);margin-top:50px;padding:20px 0;font-size:12px;color:var(--ink-3)}
@media (max-width:1080px){.tiles{grid-template-columns:repeat(2,1fr)}}
@media (max-width:860px){.two,.eps{grid-template-columns:1fr}h1{font-size:30px}}
</style></head><body>
<div class="wrap">
<header class="top">
  <h1>Stanford Company Board</h1>
  <p class="dek">%(n)d companies with a Stanford tie, from three sources: every Y Combinator company whose founder bios name Stanford, the entire StartX community directory, and a hand-verified layer carrying valuations. Use the accelerator buttons first &mdash; the whole list is deliberately long, and the filters are how you cut it to something readable.</p>
  <p class="stamp">%(nyc)d Y Combinator &middot; %(nsx)d StartX &middot; %(nboth)d in both &middot; %(known)d with a stated degree level &middot; %(nrecent)d from 2021 on</p>
</header>
<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true" data-t="companies">The companies</button>
  <button role="tab" aria-selected="false" data-t="patterns">Patterns</button>
  <button role="tab" aria-selected="false" data-t="entry">How to get in</button>
  <button role="tab" aria-selected="false" data-t="method">Method &amp; gaps</button>
</nav>

<section class="tab on" id="tab-companies">
  <div class="tiles">%(tiles)s</div>
  <div class="quick" id="quick"></div>
  <p class="count">Accelerator membership is a directory fact and is complete for both YC and StartX. Investor names are only present on the %(ncur)d hand-verified rows &mdash; neither directory publishes who invested &mdash; so a thin VC filter means thin data, not a company without backers.</p>
  <div class="filters">
    <div><label for="f-acc">Accelerator / backer</label><select id="f-acc"><option value="">Any</option></select></div>
    <div><label for="f-lvl">Degree level</label><select id="f-lvl"><option value="">Any level</option></select></div>
    <div><label for="f-lab">Named lab</label><select id="f-lab"><option value="">Any lab</option></select></div>
    <div><label for="f-yr">Year from</label><select id="f-yr"><option value="">Any year</option></select></div>
    <div><label for="f-ind">Industry</label><select id="f-ind"><option value="">Any industry</option></select></div>
    <div><label for="f-val">Valuation</label><select id="f-val"><option value="">Any</option><option value="d">Disclosed only</option><option value="b">$1B and above</option></select></div>
    <div><label for="f-q">Search</label><input id="f-q" type="search" placeholder="company, founder, lab, backer"></div>
    <button class="btn" id="f-reset">Reset</button>
  </div>
  <p class="count" id="p-count"></p>
  <table id="t-co"><thead><tr>
    <th class="sortable" data-k="name">Company</th>
    <th>Accelerator</th>
    <th class="sortable" data-k="level">Degree level</th>
    <th class="sortable" data-k="year">Year</th>
    <th class="sortable" data-k="industry">Industry</th>
    <th class="sortable num" data-k="valuation">Worth now</th>
    <th class="sortable num" data-k="raised">Raised</th>
  </tr></thead><tbody></tbody></table>
  <p class="note">Click a row for founders, how each was at Stanford in their own words, and LinkedIn where it is published. "Worth now" exists only where a named outlet reported a valuation &mdash; StartX publishes none, so most StartX-only rows are blank rather than estimated.</p>
</section>

<section class="tab" id="tab-patterns">
  <h2>Degree level, where a source states it</h2>
  <p class="lede">Read off each founder's own bio inside a window around the word Stanford, with a nearest-university rule so a degree from another school is not credited to Stanford. The unknown bucket is almost entirely StartX-only rows: StartX's directory carries session, industry and website but no founders at all.</p>
  <div class="two">
    <div><table><thead><tr><th>Level</th><th class="num">Companies</th></tr></thead><tbody>%(lvl_rows)s</tbody></table></div>
    <div><table><thead><tr><th>Accelerator or backer</th><th class="num">Companies</th></tr></thead><tbody>%(acc_rows)s</tbody></table></div>
  </div>
  <h2>By year and industry</h2>
  <div class="two">
    <div><table><thead><tr><th>Year</th><th class="num">Companies</th></tr></thead><tbody>%(yr_rows)s</tbody></table></div>
    <div><table><thead><tr><th>Industry</th><th class="num">Companies</th></tr></thead><tbody>%(ind_rows)s</tbody></table></div>
  </div>
  <h2>Named Stanford labs in founder bios</h2>
  <div class="two"><div><table><thead><tr><th>Lab or school</th><th class="num">Founders</th></tr></thead><tbody>%(lab_rows)s</tbody></table></div><div>
  <p class="note">Only %(nlabs)d founder records name a specific lab. Most bios say "Stanford" and stop, so this table is a lower bound on lab lineage, not a census of it. It is still the fastest way to find someone who worked in a lab you care about.</p></div></div>
  <h2>Three observations</h2>
  <p class="note"><strong>The three layers are almost completely disjoint.</strong> Only %(nboth)d companies carry both YC and StartX, out of %(nyc)d and %(nsx)d. Of the %(ncur)d hand-verified companies, 7 are in YC and exactly <em>one</em> is in StartX. A census built on any single source will therefore always look small, and that is the whole reason this board has three.</p>
  <p class="note"><strong>The biggest Stanford student companies went through no accelerator at all.</strong> Flapping Airplanes ($5.00B), Humans&amp; ($4.48B), Simile ($2.00B), Axiom Math ($1.60B), Engram ($0.60B), Pika ($0.47B) and Cartesia appear in neither the YC nor the StartX directory. They raised directly from Sequoia, Index, GV, Greenoaks, NVIDIA, Lightspeed and General Catalyst. An accelerator is how a Stanford student with no track record gets a first cheque; it is visibly not how a Stanford PhD with a named research result gets one. CORRECTION WORTH RECORDING: an earlier draft of this board claimed StartX contained Humans&amp;, Flapping Airplanes, Pika and Numbers Station. It did not. Those were false matches created by deduplicating on website domain when the hand-verified layer's link field holds the source article, so six companies collided on techcrunch.com. Press-link domains and shared event domains are now refused as match keys.</p>
  <p class="note"><strong>StartX's own headline figures, from its community page:</strong> over 3,000 Stanford-affiliated founders, $200B+ in total valuation, 29 unicorns and 144 startups valued above $100M. Note those disagree with third-party trackers, which variously report 20 unicorns, 5 unicorns and a $120B total. The spread is the finding: nobody agrees, and StartX is marking its own homework.</p>
  <p class="note"><strong>Degree level is knowable for roughly a third of the board and no more.</strong> %(known)d of %(n)d. That is a hard ceiling set by what founders choose to write about themselves, not something more searching would fix.</p>
</section>

<section class="tab" id="tab-entry">
  <h2>Where these companies came from</h2>
  <p class="lede">Ordered roughly by how low the barrier is. The first has no selection at all &mdash; admission is guaranteed to any Stanford student who fills in the form &mdash; and it exists specifically to help you find co-founders.</p>
  <div class="eps">%(ep_html)s</div>
</section>

<section class="tab" id="tab-method">
  <h2>Three layers, and what each can and cannot see</h2>
  <div class="two">
    <div>
      <p class="lede"><strong>A. The YC census (%(nyc)d).</strong> YC's Algolia index carries no founder data, but every company page embeds a JSON blob with founders[] including a self-written bio. All 3,014 pages from Winter 2022 on were fetched, zero failures, 5,830 founder records, 97.6%% with a bio. A company qualifies when a founder's own bio names Stanford as a personal affiliation. Tie kinds are read only within 150 characters of the word Stanford and a nearest-university rule discards degrees belonging to another school. Collaboration phrasing &mdash; "scientists from Stanford" &mdash; is subtracted before the personal test, which removed one false positive outright.</p>
      <p class="lede"><strong>B. StartX (%(nsx)d).</strong> The Stanford-affiliated accelerator: zero equity, no fees. Its community directory is a Webflow CMS list, 25 per page, 53 pages, harvested in full &mdash; 1,270 companies from the first 2010 session to Spring 2026. It carries session, industry, description and website. It carries <em>no founders and no valuations</em>, which is the single biggest limit on this board: for a StartX-only company there is no honest way to state a degree level, so it is left unknown.</p>
      <p class="lede"><strong>C. Hand-verified (%(ncur)d).</strong> The earlier press pass. Kept because it is the only layer with valuations and named backers, and because it holds large companies neither directory contains. It is media-selected and therefore biased toward big rounds.</p>
    </div>
    <div>
      <p class="lede"><strong>Dedupe.</strong> By normalised company name and by website domain, so a company in two layers is one row with both accelerator tags rather than two near-duplicates. %(nboth)d companies carry both YC and StartX.</p>
      <p class="lede"><strong>Precision.</strong> On the YC layer, a random sample of 14 was hand-read against full bios and all 14 were true positives at company level. Tie-kind precision is lower, which is why levels like "Researcher, degree unstated" and "Stanford, capacity unstated" exist as their own categories instead of being forced into a degree.</p>
      <p class="lede"><strong>What is still missing.</strong> The YC snapshot starts at Winter 2022, so earlier Stanford YC companies are invisible to layer A &mdash; Vori is a confirmed case, caught only by layer C. StartX's directory is the accelerator's own membership list, so a Stanford company that never applied is absent from both directories and can only arrive through the press layer. Bios are self-written, so a Stanford founder who did not say so is uncountable. 13 YC companies sit in an ambiguous bucket in the data file awaiting a human read. And no valuation was invented: a blank means no named outlet reported one, not that the company is worth nothing.</p>
    </div>
  </div>
  <h2>Reproducing it</h2>
  <p class="note">tools/yc/scrape.py &rarr; tools/yc/founders.py &rarr; tools/yc/stanford_filter.py for layer A; tools/startx/scrape.py for layer B; then tools/stanford/build_board.py to merge all three and render this page. Every YC row keeps the evidence window its judgement rests on, in tools/yc/stanford_yc.json, so any classification here can be argued with by pointing at the text.</p>
</section>

<footer>Stanford Company Board &middot; %(n)d companies &middot; YC + StartX + hand-verified &middot; companion to the Stanford Frontier Map and the IRIS/REALab board &middot; private valuations are reported, not audited</footer>
</div>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer"><button class="x" id="dx" aria-label="Close">&times;</button><div id="dbody"></div></aside>
<script>
const CO=%(data)s;
const money=v=>!v?"\\u2014":(v>=1e9?"$"+(v/1e9).toFixed(2)+"B":v>=1e6?"$"+Math.round(v/1e6)+"M":"$"+Math.round(v/1e3)+"K");
const esc=s=>(s==null?"":String(s)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
document.querySelectorAll("nav.tabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("nav.tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));
  document.querySelectorAll("section.tab").forEach(s=>s.classList.toggle("on",s.id==="tab-"+b.dataset.t));
  window.scrollTo({top:0,behavior:"instant"});});
const drawer=document.getElementById("drawer"),scrim=document.getElementById("scrim"),dbody=document.getElementById("dbody");
const close=()=>{drawer.classList.remove("on");scrim.classList.remove("on")};
document.getElementById("dx").onclick=close;scrim.onclick=close;
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
const fill=(id,vals)=>{const s=document.getElementById(id);vals.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;s.appendChild(o)})};
const ACCS=[...new Set(CO.flatMap(c=>c.accelerators))].sort();
fill("f-acc",ACCS);
fill("f-lvl",[...new Set(CO.flatMap(c=>c.levels))].sort());
fill("f-lab",[...new Set(CO.flatMap(c=>c.labs))].sort());
fill("f-yr",[...new Set(CO.map(c=>c.year).filter(Boolean))].sort().reverse());
fill("f-ind",[...new Set(CO.map(c=>c.industry).filter(Boolean))].sort());
// quick accelerator buttons, the thing that makes a long list usable
const QUICK=["Y Combinator","StartX","a16z","Sequoia","Kleiner Perkins","Lightspeed","Index Ventures","General Catalyst","South Park Commons","Pear VC","Thiel Fellowship"];
const qbar=document.getElementById("quick");
// Only show a chip where there is real coverage. Investor names exist ONLY on
// the hand-verified rows, because neither YC's nor StartX's directory publishes
// investors, so a chip reading "a16z (1)" would imply a census that does not exist.
QUICK.filter(q=>ACCS.includes(q)).filter(q=>CO.filter(c=>c.accelerators.includes(q)).length>=3).forEach(q=>{
  const n=CO.filter(c=>c.accelerators.includes(q)).length;
  const b=document.createElement("button");b.textContent=q+" ("+n+")";b.dataset.acc=q;
  b.onclick=()=>{const cur=document.getElementById("f-acc").value===q;
    document.getElementById("f-acc").value=cur?"":q;render();};
  qbar.appendChild(b);});
function toggleBtn(label,key){const b=document.createElement("button");b.textContent=label;b.dataset[key]="1";
  b.onclick=()=>{b.classList.toggle("on");render();};qbar.appendChild(b);return b;}
const bStu=toggleBtn("Student-level only","stu");
const bKnown=toggleBtn("Degree known ("+CO.filter(c=>c.levels[0]!=="Unknown (no founder data)").length+")","known");
const bRecent=toggleBtn("2021 onward","recent");
const f=id=>document.getElementById(id).value;
let S={k:"valuation",dir:-1};
function render(){
  const a=f("f-acc"),l=f("f-lvl"),lab=f("f-lab"),yr=f("f-yr"),ind=f("f-ind"),v=f("f-val"),q=f("f-q").toLowerCase();
  const stu=bStu.classList.contains("on"),known=bKnown.classList.contains("on"),recent=bRecent.classList.contains("on");
  document.querySelectorAll("#quick button[data-acc]").forEach(b=>b.classList.toggle("on",b.dataset.acc===a));
  let rows=CO.filter(c=>(!a||c.accelerators.includes(a))&&(!l||c.levels.includes(l))&&(!lab||c.labs.includes(lab))
    &&(!yr||(c.year||"")>=yr)&&(!ind||c.industry===ind)&&(!stu||c.student_tie)
    &&(!known||c.levels[0]!=="Unknown (no founder data)")&&(!recent||(c.year||"")>="2021")
    &&(!v||(v==="d"?c.valuation!=null:(c.valuation||0)>=1e9))
    &&(!q||JSON.stringify(c).toLowerCase().includes(q)));
  rows.sort((x,z)=>{const k=S.k,A=x[k],B=z[k];
    if(k==="valuation"||k==="raised")return ((A==null?-1:A)-(B==null?-1:B))*S.dir;
    return String(A||"").localeCompare(String(B||""))*S.dir});
  const disc=rows.filter(r=>r.valuation).reduce((s,r)=>s+r.valuation,0);
  document.getElementById("p-count").textContent=rows.length+" of "+CO.length+" companies"+(disc?" \\u00b7 disclosed valuations sum to "+money(disc):"");
  document.querySelector("#t-co tbody").innerHTML=rows.map(c=>
    `<tr class="row" data-i="${CO.indexOf(c)}">
      <td><strong>${esc(c.name)}</strong><span class="sub">${esc((c.what||"").slice(0,70))}</span></td>
      <td>${c.accelerators.map(x=>'<span class="chip '+(x==="Y Combinator"?"yc":x==="StartX"?"sx":"")+'">'+esc(x)+'</span>').join("")}</td>
      <td class="lvl">${esc(c.level_all)}</td>
      <td class="dim">${esc(c.year||"")}<span class="sub">${esc(c.yc_batch||c.startx_session||"")}</span></td>
      <td class="dim">${esc(c.industry)}</td>
      <td class="num">${money(c.valuation)}</td>
      <td class="num">${money(c.raised)}</td></tr>`).join("");
  document.querySelectorAll("#t-co tbody tr").forEach(tr=>tr.onclick=()=>{
    const c=CO[+tr.dataset.i];
    let h=`<h3>${esc(c.name)}</h3><p class="dt">${esc(c.what)}</p><dl>`;
    h+=`<dt>Accelerator / backer</dt><dd>${c.accelerators.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")||"<span class='dim'>none recorded</span>"}</dd>`;
    h+=`<dt>Degree level</dt><dd>${c.levels.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")}</dd>`;
    if(c.yc_batch)h+=`<dt>YC batch</dt><dd>${esc(c.yc_batch)}${c.status?" &middot; "+esc(c.status):""}</dd>`;
    if(c.startx_session)h+=`<dt>StartX session</dt><dd>${esc(c.startx_session)}</dd>`;
    if(c.labs.length)h+=`<dt>Named lab</dt><dd>${c.labs.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")}</dd>`;
    if(c.valuation||c.raised)h+=`<dt>Worth now</dt><dd>${money(c.valuation)} valuation &middot; ${money(c.raised)} raised${c.round?'<br><span class="dim">'+esc(c.round)+'</span>':""}</dd>`;
    if(c.backers)h+=`<dt>Backers</dt><dd>${esc(c.backers)}</dd>`;
    if(c.founders&&c.founders.length){h+=`<dt>Founders, in their own words on YC</dt><dd>`;
      c.founders.forEach(fd=>{h+=`<div class="fr"><b>${esc(fd.name)}</b>${fd.title?" &middot; "+esc(fd.title):""} <span class="chip">${esc(fd.level||"unstated")}</span>
        <div class="dim">${esc(fd.bio)}</div>${fd.linkedin?'<a href="'+fd.linkedin+'" target="_blank" rel="noopener">LinkedIn</a>':""}</div>`});
      h+=`</dd>`;}
    if(c.curated_founders)h+=`<dt>Founders (hand-verified note)</dt><dd>${esc(c.curated_founders)}</dd>`;
    h+=`<dt>Sources</dt><dd>${c.sources.map(s=>'<span class="chip">'+esc(s)+'</span>').join("")}</dd>`;
    h+=`<dt>Links</dt><dd>${c.website?'<a href="'+c.website+'" target="_blank" rel="noopener">site</a>':""}${c.yc_url?' &middot; <a href="'+c.yc_url+'" target="_blank" rel="noopener">YC page</a>':""}${c.source_url?' &middot; <a href="'+c.source_url+'" target="_blank" rel="noopener">source</a>':""}</dd></dl>`;
    dbody.innerHTML=h;drawer.classList.add("on");scrim.classList.add("on");});
}
["f-acc","f-lvl","f-lab","f-yr","f-ind","f-val"].forEach(id=>document.getElementById(id).onchange=render);
document.getElementById("f-q").oninput=render;
document.getElementById("f-reset").onclick=()=>{["f-acc","f-lvl","f-lab","f-yr","f-ind","f-val","f-q"].forEach(id=>document.getElementById(id).value="");[bStu,bKnown,bRecent].forEach(b=>b.classList.remove("on"));render()};
document.querySelectorAll("#t-co th.sortable").forEach(th=>th.onclick=()=>{
  const k=th.dataset.k;S.dir=(S.k===k)?-S.dir:-1;S.k=k;
  document.querySelectorAll("#t-co th.sortable").forEach(o=>o.removeAttribute("data-dir"));
  th.dataset.dir=S.dir>0?"asc":"desc";render();});
render();
</script></body></html>""" % {
    "n": len(rows), "nyc": n_yc, "nsx": n_sx, "nboth": n_both, "ncur": len(CU["companies"]),
    "known": known_level, "nrecent": len(recent),
    "nlabs": sum(Counter(l for r in rows for l in r["labs"]).values()),
    "tiles": tile_html, "ep_html": ep_html,
    "lvl_rows": lvl_rows, "acc_rows": acc_rows, "yr_rows": yr_rows,
    "ind_rows": ind_rows, "lab_rows": lab_rows,
    "data": json.dumps(rows, ensure_ascii=False),
}

io.open(OUT, "w", encoding="utf-8").write(HTML)
print("wrote %s  (%d bytes)" % (OUT, len(HTML)))
print("companies %d  | YC %d  StartX %d  both %d  curated %d" % (len(rows), n_yc, n_sx, n_both, len(CU["companies"])))
print("degree level known: %d of %d (%.0f%%)  | student-level %d  | 2021+ %d"
      % (known_level, len(rows), 100.0 * known_level / len(rows), n_student, len(recent)))
print("levels:", dict(Counter(l for r in rows for l in r["levels"]).most_common()))
print("top accelerators:", dict(Counter(a for r in rows for a in r["accelerators"]).most_common(10)))
