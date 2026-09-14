"""Rebuild the Stanford student-companies dashboard from TWO layers.

Layer A, systematic: every company in the YC directory (Winter 2022 onward)
whose founder bios name Stanford as a personal affiliation. Produced by
founders.py + stanford_filter.py. 252 companies.

Layer B, curated: the hand-verified records in
reports/stanford-faculty-census/students.json, which carry valuations, backers
and funding detail, and which include the large non-YC companies (Humans&,
Simile, Cartesia, Axiom Math, Pika, Applied Compute ...) that no YC census can
see. 28 companies, 6 of them also in layer A.

Union: 274. The first version of this dashboard had 28, because it was built
from press coverage instead of from the directory. That is the whole reason
layer A exists.

Output: reports/stanford-students-building.html
"""
import json, os, sys, io, re
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.environ.get("STUDENTS_OUT", os.path.join(ROOT, "reports", "stanford-students-building.html"))

Y = json.load(io.open(os.path.join(HERE, "stanford_yc.json"), encoding="utf-8"))
C = json.load(io.open(os.path.join(ROOT, "reports", "stanford-faculty-census", "students.json"), encoding="utf-8"))

TIE_LABEL = {
    "phd": "PhD", "masters": "Master's", "undergrad": "Undergrad", "dropout": "Left mid-degree",
    "mba": "MBA / GSB", "md": "Medicine", "postdoc": "Postdoc", "researcher": "Researcher",
    "studied": "Studied there", "faculty": "Faculty", "unspecified": "Stanford, unspecified",
}
STUDENT = {"phd", "masters", "undergrad", "dropout", "researcher", "postdoc", "mba", "md", "studied"}

rows = []
yc_by_name = {}
for h in Y["companies"]:
    fs = h.get("stanford_founders") or []
    kinds = sorted({k for f in fs for k in f["tie_kinds"]})
    labs = sorted({l for f in fs for l in f["labs"]})
    r = {
        "name": h["name"], "layer": "YC census", "batch": h["batch"], "founded": h["batch"],
        "status": h["status"], "what": h["one_liner"] or "", "industry": h["industry"] or "",
        "team": h["team_size"], "website": h["website"] or "",
        "yc": "https://www.ycombinator.com/companies/" + h["slug"],
        "signal": h["signal"], "tie_kinds": kinds, "labs": labs,
        "student_tie": bool(STUDENT & set(kinds)),
        "founders": [{"name": f["name"], "title": f["title"], "kinds": f["tie_kinds"],
                      "labs": f["labs"], "linkedin": f.get("linkedin", ""), "bio": f["bio"]}
                     for f in fs],
        "blurb_context": h.get("blurb_context", ""),
        "valuation": None, "raised": None, "backers": "", "curated_note": "",
    }
    rows.append(r)
    yc_by_name[h["name"].lower()] = r

for c in C["companies"]:
    key = c["name"].lower()
    if key in yc_by_name:                      # enrich the YC row with curated money detail
        r = yc_by_name[key]
        r["layer"] = "both"
        r["valuation"] = c.get("valuation_usd")
        r["raised"] = c.get("raised_usd")
        r["backers"] = c.get("backers", "")
        r["curated_note"] = c.get("round", "")
        r["curated_founders"] = c.get("founders", "")
        continue
    rows.append({
        "name": c["name"], "layer": "curated", "batch": "", "founded": c.get("founded", ""),
        "status": "private", "what": c.get("what", ""), "industry": c.get("domain", ""),
        "team": None, "website": c.get("url", ""), "yc": "",
        "signal": "hand-verified", "tie_kinds": [], "labs": [],
        "student_tie": True,
        "founders": [], "curated_founders": c.get("founders", ""),
        "valuation": c.get("valuation_usd"), "raised": c.get("raised_usd"),
        "backers": c.get("backers", ""), "curated_note": c.get("round", ""),
        "blurb_context": "",
    })

rows.sort(key=lambda r: (-(r["valuation"] or 0), -(r["raised"] or 0), r["name"]))

cov = Y["coverage"]
n_yc = sum(1 for r in rows if r["layer"] in ("YC census", "both"))
n_cur = sum(1 for r in rows if r["layer"] in ("curated", "both"))
n_student = sum(1 for r in rows if r["student_tie"])
tot_raised = sum(r["raised"] or 0 for r in rows)
uni = [r for r in rows if (r["valuation"] or 0) >= 1e9]


def money(v):
    if not v:
        return "&mdash;"
    return "$%.2fB" % (v / 1e9) if v >= 1e9 else ("$%.0fM" % (v / 1e6) if v >= 1e6 else "$%.0fK" % (v / 1e3))


def esc(s):
    return (str(s) if s is not None else "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


tiles = [
    (str(len(rows)), "companies", "Union of two layers: %d found systematically in the YC directory and %d hand-verified, %d in both."
     % (n_yc, n_cur, n_yc + n_cur - len(rows))),
    (str(n_student), "with a student-type tie", "Undergrad, master's, PhD, postdoc, MBA, researcher or left mid-degree. Faculty-only ties are excluded from this count."),
    ("%.1f%%" % cov["bio_coverage_pct"], "founder-bio coverage",
     "%d of %d YC founder records carry a self-written bio, which is what makes the systematic pass possible."
     % (cov["founder_records_with_a_bio"], cov["founder_records"])),
    ("28 &rarr; %d" % len(rows), "the correction", "The first version of this board had 28 companies because it was built from press coverage. Press covers the loud ones."),
]
tile_html = "".join('<div class="tile"><div class="tile-n">%s</div><div class="tile-l">%s</div><div class="tile-d">%s</div></div>' % t for t in tiles)

ep_html = "".join(
    '<article class="ep"><h3><a href="%s" target="_blank" rel="noopener">%s</a></h3>'
    '<div class="ep-who">%s</div><p>%s</p></article>'
    % (e["url"], esc(e["name"]), esc(e["who"]), esc(e["note"])) for e in C["entry_points"])

tie_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (TIE_LABEL.get(k, k), v)
                   for k, v in Counter(k for r in rows for k in r["tie_kinds"]).most_common())
batch_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (k, v)
                     for k, v in sorted(Counter(r["batch"] for r in rows if r["batch"]).items(),
                                        key=lambda x: -x[1]))
ind_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (esc(k), v)
                   for k, v in Counter(r["industry"] for r in rows if r["industry"]).most_common(12))
lab_rows = "".join("<tr><th scope='row'>%s</th><td class='num'>%d</td></tr>" % (esc(k), v)
                   for k, v in Counter(l for r in rows for l in r["labs"]).most_common())

DATA = [{k: r[k] for k in ("name", "layer", "batch", "founded", "status", "what", "industry",
                           "team", "website", "yc", "signal", "tie_kinds", "labs",
                           "student_tie", "founders", "valuation", "raised", "backers",
                           "curated_note", "blurb_context")
         } | ({"curated_founders": r.get("curated_founders", "")}) for r in rows]

HTML = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>What the Stanford Students Are Building &mdash; %(n)d companies</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light;--paper:#f6f4ee;--surface:#fcfbf7;--ink:#141310;--ink-2:#52514e;--ink-3:#898781;
--hairline:#e3e1d7;--baseline:#c9c7bb;--accent:#b3300e;--accent-ink:#8f2609;--wash:#efece2;--chart:#2a78d6;
--c-yc:#1baf7a;--c-cur:#4a3aa7;--c-both:#b3300e}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 "IBM Plex Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:1340px;margin:0 auto;padding:0 28px 80px}
header.top{border-bottom:1px solid var(--baseline);padding:44px 0 22px}
h1{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:40px;line-height:1.1;margin:0 0 10px;letter-spacing:-.01em}
.dek{font-size:17px;color:var(--ink-2);max-width:78ch;margin:0 0 14px}
.stamp{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}
nav.tabs{display:flex;border-bottom:1px solid var(--baseline);margin:26px 0 30px;flex-wrap:wrap}
nav.tabs button{appearance:none;background:none;border:0;border-bottom:2px solid transparent;padding:12px 16px;font:500 14px/1 "IBM Plex Sans";color:var(--ink-2);cursor:pointer}
nav.tabs button:hover{color:var(--ink)}
nav.tabs button[aria-selected=true]{color:var(--accent-ink);border-bottom-color:var(--accent)}
section.tab{display:none}section.tab.on{display:block}
h2{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:25px;margin:34px 0 6px}h2:first-child{margin-top:0}
.lede{color:var(--ink-2);max-width:86ch;margin:0 0 20px}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline);margin:0 0 30px}
.tile{background:var(--surface);padding:18px}
.tile-n{font-family:Fraunces,Georgia,serif;font-size:26px;font-weight:500;line-height:1.05}
.tile-l{font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--accent-ink);margin:6px 0 7px;font-weight:500}
.tile-d{font-size:12.5px;color:var(--ink-3);line-height:1.45}
table{width:100%%;border-collapse:collapse;background:var(--surface);font-size:13.5px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--hairline);vertical-align:top}
thead th{font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3);font-weight:500;border-bottom:1px solid var(--baseline);background:var(--wash)}
td.num,th.num{text-align:right;font-family:"IBM Plex Mono",monospace;font-size:12.5px}
td.dim{color:var(--ink-3);font-size:12.5px}
tbody tr:hover{background:var(--wash)}
.sub{display:block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);margin-top:2px}
a{color:var(--accent-ink);text-decoration:none;border-bottom:1px solid rgba(179,48,14,.28)}a:hover{border-bottom-color:var(--accent)}
.filters{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:16px;background:var(--surface);border:1px solid var(--hairline);margin-bottom:16px}
.filters label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:4px}
.filters select,.filters input{font:14px "IBM Plex Sans";padding:7px 9px;background:var(--paper);border:1px solid var(--baseline);color:var(--ink);min-width:158px}
button.btn{font:500 13px "IBM Plex Sans";padding:8px 13px;background:var(--paper);border:1px solid var(--baseline);cursor:pointer;color:var(--ink-2);margin-left:auto}
button.btn:hover{border-color:var(--accent);color:var(--accent-ink)}
.count{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--ink-3);margin:0 0 8px}
th.sortable{cursor:pointer;user-select:none}th.sortable:hover{color:var(--ink)}
th.sortable[data-dir=asc]::after{content:"\\2191";margin-left:5px}th.sortable[data-dir=desc]::after{content:"\\2193";margin-left:5px}
.chip{display:inline-block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;padding:2px 6px;border:1px solid var(--hairline);background:var(--paper);color:var(--ink-2);margin:0 3px 3px 0;white-space:nowrap}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%%;margin-right:7px;vertical-align:-1px}
tr.row{cursor:pointer}
.drawer{position:fixed;top:0;right:0;width:min(600px,94vw);height:100%%;background:var(--surface);border-left:1px solid var(--baseline);box-shadow:-14px 0 44px rgba(20,19,16,.13);transform:translateX(102%%);transition:transform .22s ease;z-index:60;overflow-y:auto;padding:26px 28px 60px}
.drawer.on{transform:none}
.drawer h3{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:24px;margin:0 0 4px}
.drawer .dt{font-size:13.5px;color:var(--ink-2);margin:0 0 18px}
.drawer dt{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin:16px 0 3px}
.drawer dd{margin:0;font-size:14px}
.drawer .x{position:absolute;top:16px;right:20px;font-size:22px;color:var(--ink-3);cursor:pointer;line-height:1;background:none;border:0}
.scrim{position:fixed;inset:0;background:rgba(20,19,16,.16);opacity:0;pointer-events:none;transition:opacity .22s;z-index:55}
.scrim.on{opacity:1;pointer-events:auto}
.fr{border-top:1px solid var(--hairline);padding:10px 0 2px}
.fr b{font-weight:600}
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
  <h1>What the Stanford Students Are Building</h1>
  <p class="dek">%(n)d companies with at least one Stanford founder, assembled two ways: a systematic pass over every company in the Y Combinator directory from Winter 2022 onward, and a hand-verified set that carries the funding detail and the large non-YC companies. Filter by how the founder was at Stanford, by named lab, by batch, or by backer.</p>
  <p class="stamp">%(n)d companies &middot; %(nst)d with a student-type tie &middot; %(nyc)d from the YC census &middot; %(ncur)d hand-verified &middot; 5,830 founder records read</p>
</header>
<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true" data-t="companies">The companies</button>
  <button role="tab" aria-selected="false" data-t="patterns">Patterns</button>
  <button role="tab" aria-selected="false" data-t="entry">How to get in</button>
  <button role="tab" aria-selected="false" data-t="method">Method &amp; gaps</button>
</nav>

<section class="tab on" id="tab-companies">
  <div class="tiles">%(tiles)s</div>
  <div class="filters">
    <div><label for="f-tie">Stanford tie</label><select id="f-tie"><option value="">Any tie</option></select></div>
    <div><label for="f-lab">Named lab / school</label><select id="f-lab"><option value="">Any lab</option></select></div>
    <div><label for="f-batch">YC batch</label><select id="f-batch"><option value="">Any batch</option></select></div>
    <div><label for="f-ind">Industry</label><select id="f-ind"><option value="">Any industry</option></select></div>
    <div><label for="f-layer">Source layer</label><select id="f-layer"><option value="">Both layers</option><option value="YC census">YC census</option><option value="curated">Hand-verified</option><option value="both">In both</option></select></div>
    <div><label for="f-st">Student tie only</label><select id="f-st"><option value="">No</option><option value="1">Yes</option></select></div>
    <div><label for="f-q">Search</label><input id="f-q" type="search" placeholder="company, founder, lab, backer"></div>
    <button class="btn" id="f-reset">Reset</button>
  </div>
  <p class="count" id="p-count"></p>
  <table id="t-co"><thead><tr>
    <th class="sortable" data-k="name">Company</th>
    <th class="sortable" data-k="batch">Batch</th>
    <th>Stanford tie</th>
    <th class="sortable" data-k="industry">Industry</th>
    <th class="sortable num" data-k="valuation">Valuation</th>
    <th class="sortable num" data-k="raised">Raised</th>
    <th class="sortable" data-k="status">Status</th>
  </tr></thead><tbody></tbody></table>
  <p class="note">Click a row for the founders, how each was at Stanford, their own words from the YC bio, and a LinkedIn link where YC publishes one. Valuations are reported figures for private companies, not audited, and exist only for the hand-verified layer.</p>
</section>

<section class="tab" id="tab-patterns">
  <h2>How the founders were at Stanford</h2>
  <p class="lede">Read off each founder's own bio, inside a window around the word Stanford, with the nearest-university rule applied so a degree from another school is not credited to Stanford. A founder can hold more than one. "Stanford, unspecified" is the honest residue: the bio says Stanford but not in what capacity, and it is not upgraded by guesswork.</p>
  <div class="two">
    <div><table><thead><tr><th>Tie</th><th class="num">Founder records</th></tr></thead><tbody>%(tie_rows)s</tbody></table></div>
    <div><table><thead><tr><th>Named lab or school</th><th class="num">Founders</th></tr></thead><tbody>%(lab_rows)s</tbody></table></div>
  </div>
  <h2>By batch and by industry</h2>
  <div class="two">
    <div><table><thead><tr><th>YC batch</th><th class="num">Companies</th></tr></thead><tbody>%(batch_rows)s</tbody></table></div>
    <div><table><thead><tr><th>Industry</th><th class="num">Companies</th></tr></thead><tbody>%(ind_rows)s</tbody></table></div>
  </div>
  <h2>Three observations</h2>
  <p class="note"><strong>Stanford is about 8%% of the YC directory.</strong> 252 of 3,014 companies from Winter 2022 onward have a founder whose own bio names Stanford. That is a base rate, not a shortlist, and it is the number to hold in mind when anyone describes a Stanford YC founder as rare.</p>
  <p class="note"><strong>The master's route is not unusual here.</strong> Master's and undergraduate ties are the two largest determinable categories after the generic ones. Whatever the faculty-spinout pipeline looks like, the YC layer is dominated by people who were students and left, not by people who finished a doctorate first.</p>
  <p class="note"><strong>B2B is roughly half of it.</strong> Healthcare and Industrials follow. The consumer-AI skew that press coverage produced is an artefact of what gets written about, not of what gets built.</p>
</section>

<section class="tab" id="tab-entry">
  <h2>Where these companies came from</h2>
  <p class="lede">Ordered roughly by how low the barrier is. The first has no selection at all &mdash; admission is guaranteed to any Stanford student who fills in the form &mdash; and it exists specifically to help you find co-founders.</p>
  <div class="eps">%(ep_html)s</div>
</section>

<section class="tab" id="tab-method">
  <h2>Why the first version of this board said 28</h2>
  <p class="note"><strong>Because it was built from press coverage.</strong> The first pass searched news for Stanford student founders and found 28 companies. Press covers the loud ones: large rounds, famous surnames, consumer products. Enact (Summer 2026, real-world RL environments for robotics, CTO out of Chelsea Finn's IRIS lab) and Innate (Fall 2024, personal AI robots, CEO a former Stanford HCI researcher) were both absent, and both are obvious once you look at the directory rather than at the news. An order-of-magnitude undercount is the expected result of that method, not bad luck.</p>
  <h2>What replaced it</h2>
  <div class="two">
    <div>
      <p class="lede"><strong>The systematic layer.</strong> YC's Algolia index carries no founder data at all, which is why a census had to go further. Each company page, however, embeds a JSON blob with founders[], including a self-written founder_bio. All 3,014 pages were fetched, yielding 5,830 founder records of which 5,690 (97.6%%) carry a bio. A company qualifies when a founder's bio names Stanford as a personal affiliation.</p>
      <p class="lede"><strong>Not a grep.</strong> Two error classes showed up in a sanity pass and both are handled. First, wrong tie kind: "Deep RL at Stanford and PhD at Technical University Munich" was being labelled PhD, so tie kinds are now read only within &plusmn;150 characters of the word Stanford, and a nearest-university rule discards degrees that belong to another school &mdash; that alone corrected Bloomy (undergrad was Amherst) and PAX Markets (undergrad was the Naval Academy). Second, wrong company: "working with top scientists from Stanford, Adobe and Brown ... during his time at IIT Kharagpur" is a collaboration, not an affiliation, so collaboration phrasing is subtracted before the personal test. One company was excluded on that basis.</p>
    </div>
    <div>
      <p class="lede"><strong>Precision, measured rather than asserted.</strong> On a random sample of 14 counted companies, all 14 were true positives at the company level once the full bio was read &mdash; including four whose evidence was only visible beyond the first line, such as the founder with "4 degrees from Stanford in just over 6 years". Tie-kind accuracy is lower than company accuracy, which is why the tables above report a large "unspecified" bucket instead of forcing a category.</p>
      <p class="lede"><strong>What is still missing, and it is not small.</strong> The YC snapshot starts at Winter 2022, so earlier Stanford YC companies are invisible to it &mdash; Vori is a confirmed example, caught only because the curated layer had it. 13 companies are held in an ambiguous bucket in the data file awaiting a human read. 23 YC companies publish no founder records at all. Bios are self-written, so a Stanford founder who did not mention it is uncountable. And the non-YC side is still press-derived: the 22 curated-only companies are real, but there is no reason to believe they are all of them. This board is a floor in both layers, and the YC layer is the only one with a defensible denominator.</p>
    </div>
  </div>
  <h2>Reproducing it</h2>
  <p class="note">tools/yc/scrape.py &rarr; founders.py &rarr; stanford_filter.py &rarr; build_students.py. The founder fetch caches every page under .cache/yc-founders, so a re-run costs only what has changed. stanford_yc.json carries the evidence window and the affiliation verdict for every founder record, so any row here can be argued with by pointing at the text it came from.</p>
</section>

<footer>What the Stanford Students Are Building &middot; %(n)d companies &middot; companion to the Stanford Frontier Map and the IRIS/REALab board &middot; private valuations are reported, not audited</footer>
</div>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer"><button class="x" id="dx" aria-label="Close">&times;</button><div id="dbody"></div></aside>
<script>
const CO=%(data)s;
const TIE=%(tielabel)s;
const money=v=>!v?"\\u2014":(v>=1e9?"$"+(v/1e9).toFixed(2)+"B":v>=1e6?"$"+Math.round(v/1e6)+"M":"$"+Math.round(v/1e3)+"K");
const esc=s=>(s==null?"":String(s)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const LCOL={"YC census":"--c-yc","curated":"--c-cur","both":"--c-both"};
document.querySelectorAll("nav.tabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("nav.tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));
  document.querySelectorAll("section.tab").forEach(s=>s.classList.toggle("on",s.id==="tab-"+b.dataset.t));
  window.scrollTo({top:0,behavior:"instant"});});
const drawer=document.getElementById("drawer"),scrim=document.getElementById("scrim"),dbody=document.getElementById("dbody");
const close=()=>{drawer.classList.remove("on");scrim.classList.remove("on")};
document.getElementById("dx").onclick=close;scrim.onclick=close;
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
const fill=(id,vals,lab)=>{const s=document.getElementById(id);vals.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=lab?(lab[v]||v):v;s.appendChild(o)})};
fill("f-tie",[...new Set(CO.flatMap(c=>c.tie_kinds))].sort(),TIE);
fill("f-lab",[...new Set(CO.flatMap(c=>c.labs))].sort());
fill("f-batch",[...new Set(CO.map(c=>c.batch).filter(Boolean))].sort());
fill("f-ind",[...new Set(CO.map(c=>c.industry).filter(Boolean))].sort());
const f=id=>document.getElementById(id).value;
let S={k:"valuation",dir:-1};
function render(){
  const t=f("f-tie"),l=f("f-lab"),b=f("f-batch"),i=f("f-ind"),ly=f("f-layer"),st=f("f-st"),q=f("f-q").toLowerCase();
  let rows=CO.filter(c=>(!t||c.tie_kinds.includes(t))&&(!l||c.labs.includes(l))&&(!b||c.batch===b)
    &&(!i||c.industry===i)&&(!ly||c.layer===ly)&&(!st||c.student_tie)
    &&(!q||JSON.stringify(c).toLowerCase().includes(q)));
  rows.sort((a,z)=>{const k=S.k,A=a[k],B=z[k];
    if(k==="valuation"||k==="raised")return ((A==null?-1:A)-(B==null?-1:B))*S.dir;
    return String(A||"").localeCompare(String(B||""))*S.dir});
  document.getElementById("p-count").textContent=rows.length+" of "+CO.length+" companies";
  document.querySelector("#t-co tbody").innerHTML=rows.map(c=>
    `<tr class="row" data-i="${CO.indexOf(c)}">
      <td><span class="dot" style="background:var(${LCOL[c.layer]})"></span><strong>${esc(c.name)}</strong><span class="sub">${esc((c.what||"").slice(0,64))}</span></td>
      <td>${esc(c.batch||c.founded||"")}</td>
      <td>${(c.tie_kinds.length?c.tie_kinds:["\\u2014"]).map(k=>'<span class="chip">'+esc(TIE[k]||k)+'</span>').join("")}</td>
      <td class="dim">${esc(c.industry)}</td>
      <td class="num">${money(c.valuation)}</td>
      <td class="num">${money(c.raised)}</td>
      <td class="dim">${esc(c.status)}</td></tr>`).join("");
  document.querySelectorAll("#t-co tbody tr").forEach(tr=>tr.onclick=()=>{
    const c=CO[+tr.dataset.i];
    let h=`<h3>${esc(c.name)}</h3><p class="dt">${esc(c.what)}</p><dl>`;
    h+=`<dt>Source layer</dt><dd><span class="chip">${esc(c.layer)}</span> <span class="chip">${esc(c.signal)}</span>${c.batch?' <span class="chip">'+esc(c.batch)+'</span>':""}${c.status?' <span class="chip">'+esc(c.status)+'</span>':""}</dd>`;
    if(c.tie_kinds.length)h+=`<dt>Stanford tie</dt><dd>${c.tie_kinds.map(k=>'<span class="chip">'+esc(TIE[k]||k)+'</span>').join("")}</dd>`;
    if(c.labs.length)h+=`<dt>Named lab or school</dt><dd>${c.labs.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")}</dd>`;
    if(c.valuation||c.raised)h+=`<dt>Money</dt><dd>${money(c.valuation)} valuation &middot; ${money(c.raised)} raised${c.curated_note?'<br><span class="dim">'+esc(c.curated_note)+'</span>':""}</dd>`;
    if(c.backers)h+=`<dt>Backers</dt><dd>${esc(c.backers)}</dd>`;
    if(c.founders&&c.founders.length){
      h+=`<dt>Founders, in their own words on YC</dt><dd>`;
      c.founders.forEach(fd=>{h+=`<div class="fr"><b>${esc(fd.name)}</b>${fd.title?" &middot; "+esc(fd.title):""}
        ${fd.kinds.map(k=>'<span class="chip">'+esc(TIE[k]||k)+'</span>').join("")}
        <div class="dim">${esc(fd.bio)}</div>
        ${fd.linkedin?'<a href="'+fd.linkedin+'" target="_blank" rel="noopener">LinkedIn</a>':""}</div>`});
      h+=`</dd>`;
    }
    if(c.curated_founders)h+=`<dt>Founders (hand-verified note)</dt><dd>${esc(c.curated_founders)}</dd>`;
    if(c.blurb_context)h+=`<dt>Company blurb mentions Stanford</dt><dd class="dim">&hellip;${esc(c.blurb_context)}&hellip;</dd>`;
    h+=`<dt>Links</dt><dd>${c.website?'<a href="'+c.website+'" target="_blank" rel="noopener">site</a>':""}${c.yc?' &middot; <a href="'+c.yc+'" target="_blank" rel="noopener">YC page</a>':""}</dd></dl>`;
    dbody.innerHTML=h;drawer.classList.add("on");scrim.classList.add("on");});
}
["f-tie","f-lab","f-batch","f-ind","f-layer","f-st"].forEach(id=>document.getElementById(id).onchange=render);
document.getElementById("f-q").oninput=render;
document.getElementById("f-reset").onclick=()=>{["f-tie","f-lab","f-batch","f-ind","f-layer","f-st","f-q"].forEach(id=>document.getElementById(id).value="");render()};
document.querySelectorAll("#t-co th.sortable").forEach(th=>th.onclick=()=>{
  const k=th.dataset.k;S.dir=(S.k===k)?-S.dir:-1;S.k=k;
  document.querySelectorAll("#t-co th.sortable").forEach(o=>o.removeAttribute("data-dir"));
  th.dataset.dir=S.dir>0?"asc":"desc";render();});
render();
</script></body></html>""" % {
    "n": len(rows), "nst": n_student, "nyc": n_yc, "ncur": n_cur,
    "tiles": tile_html, "ep_html": ep_html,
    "tie_rows": tie_rows, "lab_rows": lab_rows, "batch_rows": batch_rows, "ind_rows": ind_rows,
    "data": json.dumps(DATA, ensure_ascii=False),
    "tielabel": json.dumps(TIE_LABEL, ensure_ascii=False),
}

io.open(OUT, "w", encoding="utf-8").write(HTML)
print("wrote %s  (%d bytes)" % (OUT, len(HTML)))
print("companies %d  (YC %d, curated %d, both %d)  student-tie %d"
      % (len(rows), n_yc, n_cur, n_yc + n_cur - len(rows), n_student))
print("unicorns:", ", ".join(r["name"] for r in uni))
