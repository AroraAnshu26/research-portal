# -*- coding: utf-8 -*-
"""Build reports/yc-rfs-hardware-map.html -- the hardware / space / defense
slice of the YC directory set against the eight RFS requests Anshu pulled.

Inputs, all in this directory:
  rfs_hardware_2026.json  the eight RFS theses, primary text (browser-read)
  rfs_companies.json      matched companies by theme (from rfs_match.py)
  rfs_founders.json       founder records (from founders.py, restricted)
  rfs_prepivot.json       archived original pitches (from prepivot.py)
  rfs_capital.json        investors / analysts / newsletters, hand-verified

Styling follows reports/yc-batch-map.html so the two dashboards read as one
family. Output path overridable with RFS_OUT.
"""
import json, os, io, html, re
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.environ.get("RFS_OUT", os.path.join(ROOT, "reports", "yc-rfs-hardware-map.html"))
PULL = "2026-10-19"


def load(n, default=None):
    p = os.path.join(HERE, n)
    if not os.path.exists(p):
        print("  (missing %s)" % n)
        return default
    return json.load(io.open(p, encoding="utf-8"))


def e(s):
    return html.escape(s or "", quote=True)


SEASON = {"Winter": 0, "Spring": 1, "Summer": 2, "Fall": 3}
SHORT = {"Winter": "W", "Spring": "X", "Summer": "S", "Fall": "F"}


def bkey(b):
    p = (b or "").split()
    return (int(p[1]), SEASON.get(p[0], 0)) if len(p) == 2 and p[1].isdigit() else (0, 0)


def bshort(b):
    p = (b or "").split()
    return (SHORT.get(p[0], "?") + p[1][2:]) if len(p) == 2 else (b or "?")


STOP = set("a an the and or for of to in on with we our is are that this it as at by from".split())


def divergence(a, b):
    """0 = identical wording, 1 = no content word in common.

    'Changed at all' is too loose a test. CoCrafter went from 'B2B construction
    marketplace' to 'B2B construction marketplace to match contractors and
    subcontractors' -- a reword. Rownd went from killing the login page to
    autonomous defense -- not a reword. The page should not show those as the
    same kind of event.
    """
    ta = {w for w in re.findall(r"[a-z0-9]+", (a or "").lower()) if w not in STOP}
    tb = {w for w in re.findall(r"[a-z0-9]+", (b or "").lower()) if w not in STOP}
    if not ta or not tb:
        return 1.0
    inter = len(ta & tb)
    # Containment first: when one one-liner's content words are nearly a subset
    # of the other, the company only said the same thing at more length.
    # Jaccard alone scores that as a real change, because it punishes the
    # added words (CoCrafter's "B2B construction marketplace" -> "B2B
    # construction marketplace to match contractors and subcontractors").
    if inter / float(min(len(ta), len(tb))) >= 0.8:
        return 0.0
    return 1.0 - inter / float(len(ta | tb))


def main():
    rfs = load("rfs_hardware_2026.json")
    comp = load("rfs_companies.json")
    founders = load("rfs_founders.json", [])
    prepivot = load("rfs_prepivot.json", {})
    capital = load("rfs_capital.json")

    fmap = {f["slug"]: f.get("founders") or [] for f in founders}
    themes = comp["themes"]
    companies = comp["unique"]

    # order themes: the eight Anshu linked first, then adjacent
    TARGET_ORDER = [t["anchor"] for t in rfs["targets"]]
    extra = [k for k in themes if k not in TARGET_ORDER]
    order = TARGET_ORDER + extra

    for c in companies:
        c["founders"] = fmap.get(c["slug"], [])
        pv = prepivot.get(c["slug"])
        if pv and pv.get("pitch_changed"):
            pv = dict(pv)
            pv["div"] = divergence(pv.get("original_one_liner"), c.get("one_liner"))
            pv["kind"] = ("pivot" if pv["div"] >= 0.75 else
                          "shift" if pv["div"] >= 0.45 else "reworded")
            c["prepivot"] = pv
        c["bshort"] = bshort(c["batch"])
        c["bkey"] = bkey(c["batch"])
    companies.sort(key=lambda c: (-c["bkey"][0], -c["bkey"][1], c["name"].lower()))

    n_pivot = sum(1 for c in companies if c.get("prepivot"))
    n_found = sum(len(c["founders"]) for c in companies)
    batches = sorted({c["batch"] for c in companies}, key=bkey, reverse=True)
    active = sum(1 for c in companies if (c.get("status") or "").lower() == "active")

    # ------------------------------------------------------------------ HTML
    P = []
    w = P.append

    w("""<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>YC RFS Hardware Map &mdash; space, defense, silicon, metal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  color-scheme: light;
  --paper:#f6f4ee; --surface:#fcfbf7; --ink:#141310; --ink-2:#52514e; --ink-3:#898781;
  --hairline:#e3e1d7; --baseline:#c9c7bb; --accent:#b3300e; --accent-ink:#8f2609; --wash:#efece2;
  --chart:#2a78d6; --ok:#1baf7a; --warn:#eda100;
  --shadow: 0 1px 2px rgba(20,19,16,.05), 0 8px 24px -12px rgba(20,19,16,.18);
}
@media (prefers-color-scheme: dark){
  :root{
    color-scheme: dark;
    --paper:#111110; --surface:#1a1a19; --ink:#f4f3ee; --ink-2:#c3c2b7; --ink-3:#898781;
    --hairline:#2c2c2a; --baseline:#383835; --accent:#e05c33; --accent-ink:#ef7c58; --wash:#232320;
    --chart:#3987e5; --ok:#199e70; --warn:#c98500;
    --shadow: 0 1px 2px rgba(0,0,0,.4), 0 8px 24px -12px rgba(0,0,0,.6);
  }
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:"IBM Plex Sans",system-ui,sans-serif;
  font-size:14px;line-height:1.55;padding:0 0 80px;-webkit-font-smoothing:antialiased}
.wrap{max-width:1280px;margin:0 auto;padding:36px 26px 0}
.kicker{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--accent);margin-bottom:10px}
h1{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:33px;line-height:1.12;
  letter-spacing:-.015em;margin-bottom:9px}
h1 em{font-style:italic;color:var(--ink-2);font-weight:400}
.dek{color:var(--ink-2);max-width:80ch;font-size:14.5px}
.dek b{color:var(--ink);font-weight:600}
.meta{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--ink-3);margin-top:12px;
  padding-top:11px;border-top:1px solid var(--hairline)}
nav.tabs{display:flex;gap:5px;margin:26px 0 22px;flex-wrap:wrap}
.tab{font-family:"IBM Plex Sans",sans-serif;font-size:12.5px;font-weight:500;padding:8px 15px;
  border:1px solid var(--hairline);background:var(--surface);color:var(--ink-2);border-radius:999px;
  cursor:pointer;transition:.13s}
.tab:hover{border-color:var(--baseline);color:var(--ink)}
.tab.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.page{display:none}.page.on{display:block}
.band{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;
  background:var(--hairline);border:1px solid var(--hairline);border-radius:8px;overflow:hidden;margin-bottom:22px}
.tile{background:var(--surface);padding:14px 16px}
.tile .v{font-family:"Fraunces",Georgia,serif;font-size:25px;font-weight:500;line-height:1.05;letter-spacing:-.02em}
.tile .l{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3);margin-top:5px}
.sec{margin:34px 0 0}
.sec-h{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;
  color:var(--ink-3);padding-bottom:8px;border-bottom:1px solid var(--hairline);margin-bottom:16px;
  display:flex;justify-content:space-between;align-items:baseline;gap:12px}
h2.sub{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:20px;margin-bottom:6px;letter-spacing:-.01em}
p.note{color:var(--ink-2);max-width:82ch;margin-bottom:14px}
.controls{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
input[type=text],select{font-family:"IBM Plex Sans",sans-serif;font-size:12.5px;padding:7px 9px;
  border:1px solid var(--hairline);background:var(--surface);color:var(--ink);border-radius:6px;outline:none}
input[type=text]{min-width:240px}
input[type=text]:focus,select:focus{border-color:var(--accent)}
.clear-btn{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;
  padding:7px 11px;border:1px solid var(--hairline);background:transparent;color:var(--ink-3);
  border-radius:6px;cursor:pointer}
.clear-btn:hover{color:var(--ink);border-color:var(--baseline)}
.count{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--ink-3);margin-left:auto}

/* RFS thesis cards */
.rfs{border:1px solid var(--hairline);background:var(--surface);border-radius:10px;
  padding:20px 22px;margin-bottom:14px;box-shadow:var(--shadow)}
.rfs .ed{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.13em;
  text-transform:uppercase;color:var(--accent);margin-bottom:7px}
.rfs h3{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:21px;letter-spacing:-.01em;margin-bottom:3px}
.rfs .by{font-size:12.5px;color:var(--ink-3);margin-bottom:12px;font-style:italic}
.rfs .txt{color:var(--ink-2);font-size:13.5px;white-space:pre-wrap;max-width:84ch}
.rfs .ftr{margin-top:14px;padding-top:11px;border-top:1px solid var(--hairline);
  display:flex;gap:9px;align-items:center;flex-wrap:wrap}
.pill{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.07em;text-transform:uppercase;
  padding:3px 9px;border:1px solid var(--hairline);border-radius:999px;color:var(--ink-3);background:var(--wash)}
.pill.hot{color:var(--accent);border-color:var(--accent);background:transparent}
.pill.ok{color:var(--ok);border-color:var(--ok);background:transparent}
.jump{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.07em;text-transform:uppercase;
  color:var(--accent);background:none;border:none;cursor:pointer;padding:3px 0;text-decoration:underline}

/* company grid */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:11px}
.card{border:1px solid var(--hairline);background:var(--surface);border-radius:9px;padding:14px 15px;
  cursor:pointer;transition:.13s;display:flex;flex-direction:column;gap:6px}
.card:hover{border-color:var(--baseline);box-shadow:var(--shadow);transform:translateY(-1px)}
.card .top{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.card .nm{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:16px;letter-spacing:-.01em;line-height:1.2}
.card .bt{font-family:"IBM Plex Mono",monospace;font-size:10px;color:var(--ink-3);white-space:nowrap}
.card .ol{color:var(--ink-2);font-size:12.5px;line-height:1.45}
.card .tags{display:flex;gap:4px;flex-wrap:wrap;margin-top:auto;padding-top:5px}
.tg{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;
  padding:2px 7px;border-radius:999px;background:var(--wash);color:var(--ink-3);border:1px solid var(--hairline)}
.tg.pv{color:var(--accent);border-color:var(--accent)}
.tg.ad{color:var(--chart);border-color:var(--chart)}

/* drawer */
.scrim{position:fixed;inset:0;background:rgba(20,19,16,.42);opacity:0;pointer-events:none;
  transition:.18s;z-index:40;backdrop-filter:blur(2px)}
.scrim.on{opacity:1;pointer-events:auto}
.drawer{position:fixed;top:0;right:0;height:100%;width:min(640px,94vw);background:var(--paper);
  border-left:1px solid var(--hairline);transform:translateX(100%);transition:.22s cubic-bezier(.4,0,.2,1);
  z-index:50;overflow-y:auto;box-shadow:-18px 0 50px -24px rgba(0,0,0,.45)}
.drawer.on{transform:translateX(0)}
.dr-in{padding:26px 28px 70px}
.dr-x{position:sticky;top:0;float:right;font-family:"IBM Plex Mono",monospace;font-size:11px;
  background:var(--paper);border:1px solid var(--hairline);border-radius:6px;padding:5px 10px;
  cursor:pointer;color:var(--ink-2);z-index:2}
.dr-in h3{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:25px;letter-spacing:-.015em;margin-bottom:5px}
.dr-sub{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--ink-3);margin-bottom:16px}
.blk{margin-top:19px}
.blk-h{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-3);margin-bottom:7px;padding-bottom:5px;border-bottom:1px solid var(--hairline)}
.blk p{color:var(--ink-2);font-size:13px}
.lnk{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent}
.lnk:hover{border-bottom-color:var(--accent)}
.fo{border:1px solid var(--hairline);background:var(--surface);border-radius:8px;padding:11px 13px;margin-bottom:8px}
.fo .fn{font-weight:600;font-size:13.5px}
.fo .ft{font-size:11.5px;color:var(--ink-3);font-family:"IBM Plex Mono",monospace;margin-bottom:5px}
.fo .fb{font-size:12.5px;color:var(--ink-2)}
.fo .fl{margin-top:7px;display:flex;gap:10px}
.fo .fl a{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase}

/* pivot before/after */
.pv{border:1px solid var(--hairline);border-left:3px solid var(--accent);background:var(--surface);
  border-radius:0 9px 9px 0;padding:15px 17px;margin-bottom:13px}
.pv .hd{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:10px;flex-wrap:wrap}
.pv .nm{font-family:"Fraunces",Georgia,serif;font-size:17px;font-weight:500}
.pv .ba{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:620px){.pv .ba{grid-template-columns:1fr}}
.pv .side{background:var(--paper);border:1px solid var(--hairline);border-radius:7px;padding:11px 12px}
.pv .side .lb{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.13em;text-transform:uppercase;
  color:var(--ink-3);margin-bottom:5px}
.pv .side .tx{font-size:13px;color:var(--ink)}
.pv .side.was{border-color:var(--baseline)}
.pv .side.was .lb{color:var(--accent)}
.pv .ds{font-size:12px;color:var(--ink-2);margin-top:9px;padding-top:9px;border-top:1px solid var(--hairline)}

/* capital */
.inv{border:1px solid var(--hairline);background:var(--surface);border-radius:9px;padding:17px 19px;margin-bottom:12px}
.inv .hd{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:4px}
.inv .nm{font-family:"Fraunces",Georgia,serif;font-size:19px;font-weight:500}
.inv .pp{font-size:12px;color:var(--ink-3);font-style:italic;margin-bottom:9px}
.inv .th{color:var(--ink-2);font-size:13px;margin-bottom:9px}
.inv .sharp{border-left:2px solid var(--accent);padding:7px 0 7px 12px;font-size:13px;color:var(--ink);margin-bottom:10px}
.inv .rd{font-size:12.5px;color:var(--ink-2);margin-bottom:7px;padding-left:13px;position:relative}
.inv .rd:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--baseline)}
.inv .cav{font-size:11.5px;color:var(--ink-3);font-style:italic;margin-top:9px;padding-top:8px;border-top:1px solid var(--hairline)}
table{width:100%;border-collapse:collapse;font-size:12.5px}
th{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.11em;text-transform:uppercase;
  color:var(--ink-3);text-align:left;padding:7px 9px;border-bottom:1px solid var(--baseline)}
td{padding:8px 9px;border-bottom:1px solid var(--hairline);vertical-align:top}
tr:hover td{background:var(--wash)}
.bar{height:7px;background:var(--wash);border-radius:4px;overflow:hidden;min-width:60px}
.bar i{display:block;height:100%;background:var(--accent);border-radius:4px}
footer{margin-top:52px;padding-top:18px;border-top:1px solid var(--hairline);
  font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);line-height:1.8}
</style></head><body>
<div class="wrap">
<div class="kicker">CTO Portal &middot; Research artefact &middot; pulled """ + PULL + """</div>
<h1>YC Requests for Startups: <em>the hardware, space and defense slice</em></h1>
<p class="dek">Eight RFS requests &mdash; <b>space electronics, in-space industry, hardware supply chain, semiconductor supply chain, modern metal mills, American defense, compute at sea, and operating systems for the physical world</b> &mdash; set against every company YC has ever funded. The directory was pulled in full (all """ + str(comp["directory_size"]) + """ companies, 50 batches, Summer 2005 &rarr; Summer 2027), classified against each request, then resolved to founders and, where a company pivoted, back to the pitch it originally made.</p>
""")

    w('<div class="meta">%d companies matched &middot; %d founder records &middot; %d original pitches recovered from the Wayback Machine &middot; source: ycombinator.com/rfs (primary, browser-read) + YC Algolia index</div>' % (len(companies), n_found, n_pivot))

    w("""<nav class="tabs">
<button class="tab on" data-p="req">The eight requests</button>
<button class="tab" data-p="co">Companies</button>
<button class="tab" data-p="pv">Pivots &amp; original pitches</button>
<button class="tab" data-p="cap">Capital &amp; intel</button>
<button class="tab" data-p="meth">Method &amp; limits</button>
</nav>""")

    # ---------------------------------------------------------- tab: requests
    w('<div class="page on" id="p-req">')
    w('<div class="band">')
    w('<div class="tile"><div class="v">%d</div><div class="l">Companies matched</div></div>' % len(companies))
    w('<div class="tile"><div class="v">%d</div><div class="l">Still active</div></div>' % active)
    w('<div class="tile"><div class="v">%d</div><div class="l">Founders resolved</div></div>' % n_found)
    w('<div class="tile"><div class="v">%d</div><div class="l">Pitches recovered</div></div>' % n_pivot)
    w('<div class="tile"><div class="v">%d</div><div class="l">YC directory size</div></div>' % comp["directory_size"])
    w('</div>')

    w('<p class="note">Each request below is the <b>full primary text</b> from ycombinator.com/rfs. '
      'The edition tabs on that page are React state with no URL of their own, so earlier editions do not appear in the page source '
      'and were not previously recoverable here &mdash; each was opened in a real browser engine and read from the rendered DOM. '
      'The count on each card is how many YC companies in the whole 2005&ndash;2027 directory match that request.</p>')

    cnt = {k: len(v) for k, v in comp["by_theme"].items()}
    for t in rfs["targets"]:
        k = t["anchor"]
        n = cnt.get(k, 0)
        w('<div class="rfs" id="rfs-%s">' % e(k))
        w('<div class="ed">%s &middot; %s</div>' % (e(t["edition"]), e(t["theme"])))
        w('<h3>%s</h3>' % e(t["title"]))
        w('<div class="by">By %s</div>' % e(t["author"]))
        w('<div class="txt">%s</div>' % e(t["text"]))
        w('<div class="ftr">')
        cls = "pill hot" if n < 12 else "pill ok"
        w('<span class="%s">%d YC companies match</span>' % (cls, n))
        if n < 12:
            w('<span class="pill">thin field</span>')
        w('<button class="jump" data-theme="%s">See the companies &rarr;</button>' % e(k))
        w('</div></div>')

    w('<div class="sec"><div class="sec-h"><span style="letter-spacing:.15em">Adjacent requests in the same three editions</span></div>')
    w('<p class="note">Not linked in the brief, but the same thesis and worth reading alongside &mdash; '
      'two of them (counter-swarm defense, inference chips) have their own company counts in this dataset.</p>')
    w('<table><thead><tr><th>Request</th><th>Author</th><th>Edition</th><th>Matched</th></tr></thead><tbody>')
    for a in rfs["adjacent"]:
        key = {"Counter-Swarm Defense": "counter-swarm-defense",
               "Inference Chips for Agent Workflows": "inference-chips"}.get(a["title"])
        n = cnt.get(key, "") if key else ""
        w('<tr><td><b>%s</b></td><td>%s</td><td>%s</td><td>%s</td></tr>'
          % (e(a["title"]), e(a["author"]), e(a["edition"]), n if n != "" else "&mdash;"))
    w('</tbody></table></div>')

    w('<div class="sec"><div class="sec-h"><span style="letter-spacing:.15em">How YC framed each edition</span></div>')
    for ed, fr in rfs["edition_framing"].items():
        w('<div class="rfs" style="padding:15px 18px"><div class="ed">%s</div><div class="txt">%s</div></div>' % (e(ed), e(fr)))
    w('</div>')
    w('</div>')

    # --------------------------------------------------------- tab: companies
    w('<div class="page" id="p-co">')
    w('<p class="note">Every YC company matching one of the requests. Click a card for the full thesis, the founders with their bios and links, and &mdash; where the company pivoted &mdash; the pitch it originally made to YC.</p>')
    w('<div class="controls">')
    w('<input type="text" id="q" placeholder="Search name, pitch, founder&hellip;">')
    w('<select id="fth"><option value="">All requests</option>')
    for k in order:
        if k in cnt:
            w('<option value="%s">%s (%d)</option>' % (e(k), e(themes[k]["label"]), cnt[k]))
    w('</select>')
    w('<select id="fba"><option value="">All batches</option>')
    for b in batches:
        w('<option value="%s">%s</option>' % (e(b), e(b)))
    w('</select>')
    w('<select id="fst"><option value="">Any status</option><option value="Active">Active</option>'
      '<option value="Acquired">Acquired</option><option value="Inactive">Inactive</option></select>')
    w('<select id="fpv"><option value="">Pivot filter</option><option value="1">Pivoted only</option></select>')
    w('<button class="clear-btn" id="clr">Clear</button>')
    w('<span class="count" id="cnt"></span>')
    w('</div><div class="grid" id="grid"></div></div>')

    # ------------------------------------------------------------ tab: pivots
    w('<div class="page" id="p-pv">')
    w('<h2 class="sub">What they pitched before</h2>')
    w('<p class="note">The YC directory only ever serves a company\'s <b>current</b> pitch &mdash; a pivot overwrites the old thesis in place. '
      'The only public record of the original is an archived copy of the company\'s own YC page. '
      'Two routes were used: the earliest snapshot of the current URL, and, for companies that renamed, the dead URL under the former name. '
      '<b>%d of the matched companies carry a former name</b>, and the archive returned a materially different original pitch for %d of them.</p>' %
      (sum(1 for c in companies if c.get("former_names")), n_pivot))

    pvs = sorted([c for c in companies if c.get("prepivot")],
                 key=lambda c: -c["prepivot"]["div"])
    n_real = sum(1 for c in pvs if c["prepivot"]["kind"] == "pivot")
    w('<p class="note"><b>The dominant direction is software &rarr; hardware.</b> '
      'Rownd went from killing the login page to autonomous defense; Baud from computer-vision software to AI chips; '
      'Forerunner from a copilot for aerospace engineers to an actual quick-turn bent-tube shop; '
      'RMFG from making off-the-shelf robot arms autonomous to contract manufacturing. '
      'That is the a16z manufacturing-asset-class argument showing up in founder behaviour rather than in a memo.</p>')
    w('<p class="note" style="color:var(--ink-3)"><b>Read the label.</b> These are ordered by how far the wording moved. '
      '<span class="pill hot">pivot</span> means almost no content word survived; '
      '<span class="pill">shift</span> is a real change of emphasis; '
      '<span class="pill">reworded</span> is the same company saying it better, and is shown for completeness rather than as a finding. '
      'The left-hand side is the <b>earliest snapshot the archive holds</b>, which for some companies postdates their batch &mdash; '
      'so it is the earliest recoverable public pitch, not necessarily the one they applied with.</p>')
    if not pvs:
        w('<p class="note"><i>No recovered pitches in this build &mdash; run <code>prepivot.py</code> and rebuild.</i></p>')
    for c in pvs:
        p = c["prepivot"]
        k = p["kind"]
        w('<div class="pv"%s><div class="hd"><div class="nm">%s</div>'
          '<div style="display:flex;gap:7px;align-items:center">'
          '<span class="pill%s">%s</span>'
          '<span style="font-family:IBM Plex Mono,monospace;font-size:10.5px;color:var(--ink-3)">%s</span></div></div>'
          % ('' if k == "pivot" else ' style="border-left-color:var(--baseline)"',
             e(c["name"]), " hot" if k == "pivot" else "", k, e(c["batch"])))
        w('<div class="ba">')
        w('<div class="side was"><div class="lb">Earliest archived &middot; %s%s</div><div class="tx">%s</div></div>'
          % (e((p.get("archived") or "")[:8]),
             " &middot; as &ldquo;" + e(p.get("original_name") or "") + "&rdquo;" if p.get("original_name") and p.get("original_name") != c["name"] else "",
             e(p.get("original_one_liner") or "&mdash;")))
        w('<div class="side"><div class="lb">Now</div><div class="tx">%s</div></div>' % e(c.get("one_liner")))
        w('</div>')
        bits = []
        if c.get("former_names"):
            bits.append("Former names on file: " + e(", ".join(c["former_names"])))
        if p.get("from_former_slug"):
            bits.append("recovered from the dead URL under a former name")
        if p.get("archive_url"):
            bits.append('<a class="lnk" href="%s" target="_blank" rel="noopener">archived page</a>' % e(p["archive_url"]))
        if bits:
            w('<div class="ds">%s</div>' % " &middot; ".join(bits))
        w('</div>')
    w('</div>')

    # ----------------------------------------------------------- tab: capital
    w('<div class="page" id="p-cap">')
    w('<h2 class="sub">Who else is underwriting this thesis</h2>')
    w('<p class="note">The funds, analyst houses and newsletters working the same ground as the eight requests. '
      'Items read at their own primary page in this session are marked <span class="pill ok">verified</span>; '
      'those taken from secondary aggregators are marked <span class="pill">reported</span> and carry the caveat inline. '
      'Fund sizes in particular disagree across directory sites.</p>')

    w('<div class="sec"><div class="sec-h"><span style="letter-spacing:.15em">Venture</span></div>')
    for i in capital["investors"]:
        w('<div class="inv"><div class="hd"><div class="nm">%s</div><span class="pill%s">%s</span></div>'
          % (e(i["name"]), " ok" if i["confidence"] == "verified" else "", e(i["confidence"])))
        w('<div class="pp">%s</div>' % e(i.get("people")))
        w('<div class="th">%s</div>' % e(i["thesis"]))
        if i.get("sharpest_claim"):
            w('<div class="sharp">%s</div>' % e(i["sharpest_claim"]))
        for r in i.get("key_reading", []):
            w('<div class="rd"><a class="lnk" href="%s" target="_blank" rel="noopener"><b>%s</b></a> &mdash; %s</div>'
              % (e(r["u"]), e(r["t"]), e(r["d"])))
        w('<div style="margin-top:9px"><a class="lnk" href="%s" target="_blank" rel="noopener">%s</a></div>' % (e(i["url"]), e(i["url"])))
        if i.get("caveat"):
            w('<div class="cav">%s</div>' % e(i["caveat"]))
        w('</div>')
    w('</div>')

    w('<div class="sec"><div class="sec-h"><span style="letter-spacing:.15em">Consulting &amp; analyst houses</span></div>')
    for a in capital["analysts"]:
        neg = a["confidence"] == "negative-result"
        w('<div class="inv"%s><div class="hd"><div class="nm">%s</div><span class="pill%s">%s</span></div>'
          % (' style="opacity:.72"' if neg else "", e(a["name"]),
             " ok" if a["confidence"] == "verified" else "", e(a["confidence"])))
        w('<div class="pp">%s</div>' % e(a["piece"]))
        w('<div class="sharp">%s</div>' % e(a["sharpest_claim"]))
        w('<div class="th">%s</div>' % e(a["why_it_matters"]))
        w('<div><a class="lnk" href="%s" target="_blank" rel="noopener">%s</a></div>' % (e(a["url"]), e(a["url"])))
        if a.get("caveat"):
            w('<div class="cav">%s</div>' % e(a["caveat"]))
        w('</div>')
    w('</div>')

    w('<div class="sec"><div class="sec-h"><span style="letter-spacing:.15em">Newsletters worth the inbox slot</span></div>')
    w('<table><thead><tr><th>Publication</th><th>Author</th><th>Traction</th><th>What it covers</th></tr></thead><tbody>')
    for nl in capital["newsletters"]:
        w('<tr><td><a class="lnk" href="%s" target="_blank" rel="noopener"><b>%s</b></a>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'
          % (e(nl["url"]), e(nl["name"]),
             ' <span class="pill ok">verified</span>' if nl["confidence"] == "verified" else "",
             e(nl.get("author")), e(nl.get("traction") or "&mdash;"), e(nl["covers"])))
    w('</tbody></table></div>')
    w('</div>')

    # ------------------------------------------------------------ tab: method
    w('<div class="page" id="p-meth">')
    w('<h2 class="sub">Method, and what this does not cover</h2>')
    w('<p class="note">Written out so the next pass can trust or correct it.</p>')
    meth = [
      ("The requests are primary, and newly so",
       "ycombinator.com/rfs server-renders only the currently selected edition; the edition tabs are React state with no href and no reachable JSON. Earlier editions were therefore previously reconstructed from named secondary sources in tools/yc/rfs.json, with the Winter-2025-vs-Spring-2025 boundary flagged unreliable. For this build each tab was clicked in a real browser engine and the rendered text read out of the DOM, so all three editions here (Fall 2026, Summer 2026, Spring 2026) are primary."),
      ("The company set has a denominator",
       "Every company YC publishes was pulled from its Algolia index &mdash; %d records across 50 batches, Summer 2005 to Summer 2027. This deliberately drops the Winter-2022 floor used by the earlier batch census, which would have hidden Astranis (W16), Scale AI (S16), Solugen (W17) and every other pre-2022 hard-tech company. Matching is keyword scoring over the one-liner, YC's tags, the industry pair and the long description, with the anchor required to land in a field the company chose to describe itself by." % comp["directory_size"]),
      ("Precision was measured, not asserted",
       "A first pass at a higher threshold returned one metal-mill company and two in-space-industry companies, which was implausible; the near-miss band showed real companies (Proglix, Duranium, AstroForge, TransAstra, Baud, Mobius Materials) sitting just under it. Lowering the threshold alone admitted junk &mdash; a fundraising tool called &ldquo;Metal&rdquo;, a bank offering &ldquo;bare-metal&rdquo; access, a rare-coin marketplace. The rule that fixed both: the theme word must appear in the one-liner, tags or industry, not merely somewhere in the description, plus a hand-checked exclusion list. Each matched record carries the evidence window the judgement rests on."),
      ("Thin fields are findings, not failures",
       "Modern Metal Mills matches 4 companies and Compute at Sea matches 3, out of %d. That is the point of those requests: YC is asking for them precisely because almost nobody has built them. Read a low count as an open field, not a broken query." % comp["directory_size"]),
      ("A recovered pitch is the earliest ARCHIVED one, not necessarily the application pitch",
       "The left column on the pivot tab is the earliest snapshot web.archive.org holds of that company's YC page. For some companies that snapshot postdates their batch, so it is the earliest recoverable PUBLIC pitch rather than the one they applied with. Entries are graded by how far the wording actually moved -- 'pivot' where almost no content word survives, 'shift' for a real change of emphasis, 'reworded' where the company simply says the same thing better -- because 'the text changed' on its own would present CoCrafter adding six words to its one-liner as the same kind of event as Rownd going from login infrastructure to autonomous defense."),
      ("Pre-pivot pitches come from the archive, and only partially",
       "The directory serves only the current pitch. Originals were recovered from the Wayback Machine by two routes: the earliest snapshot of the current slug, and the dead URL under each former name. NOTE: tools/yc/README.md records web.archive.org as unreachable from this machine. That was true when written and is no longer true &mdash; the CDX API answered normally on 2026-10-19. Raw snapshots are gzipped and must be decompressed or they look like a failed fetch. Coverage is partial: the archive rate-limits, not every company was snapshotted before it pivoted, and a company that pivoted without renaming and was never crawled early is simply unrecoverable. Concretely: of 134 matched companies carrying a former name, the archive returned a usable pitch for 29 and a materially different one for 20. Treat the pivot tab as a floor."),
      ("Cross-referencing by name is unsafe without a check",
       "Matching a16z's American Dynamism 50 against the YC directory by name produced two false hits: a16z's Armada (edge compute) collided with a YC company formerly named Armada that turns videos into movies, and a16z's Radiant (nuclear) collided with a former name of Dev Tools AI. Both were struck after reading the one-liners. The same check turned up a true and useful result: a16z's &ldquo;Diode&rdquo; is the YC company now called RMFG, via Reason Robotics &rarr; Diode &rarr; RMFG."),
      ("What is still missing",
       "Funding amounts and valuations are not in YC's public index and are not here. The capital and newsletter sections are curated rather than systematic &mdash; they are the sources found worth reading, not a census of the category, and fund sizes marked 'reported' conflict across directories. Subscriber counts are published by almost no newsletter; only Construction Physics states one."),
    ]
    for h, b in meth:
        w('<div class="blk"><div class="blk-h">%s</div><p>%s</p></div>' % (e(h), b))
    w('<div class="blk"><div class="blk-h">Rebuild</div><p style="font-family:IBM Plex Mono,monospace;font-size:12px">'
      'cd tools/yc &nbsp;&rarr;&nbsp; python scrape_all.py &nbsp;&rarr;&nbsp; python rfs_match.py &nbsp;&rarr;&nbsp; '
      'YC_FOUNDERS_SRC=yc_raw_all.json YC_FOUNDERS_ONLY=rfs_slugs.json YC_FOUNDERS_OUT=rfs_founders.json python founders.py '
      '&nbsp;&rarr;&nbsp; python prepivot.py &nbsp;&rarr;&nbsp; python build_rfs.py</p></div>')
    w('</div>')

    w('<footer>Built %s from a live pull of YC\'s public directory and a browser read of ycombinator.com/rfs. '
      'Company text is YC\'s own. Archived pitches are from the Internet Archive. '
      'Capital and newsletter sections are curated and carry per-item confidence.</footer>' % PULL)
    w('</div>')

    # drawer + data
    w('<div class="scrim" id="scrim"></div><div class="drawer" id="drawer"><div class="dr-in" id="drin"></div></div>')

    slim = []
    for c in companies:
        slim.append({
            "s": c["slug"], "n": c["name"], "b": c["batch"], "bs": c["bshort"],
            "o": c.get("one_liner"), "d": (c.get("long_description") or "")[:1800],
            "w": c.get("website"), "t": c.get("themes"), "st": c.get("status"),
            "tg": (c.get("tags") or [])[:7], "ts": c.get("team_size"),
            "loc": c.get("all_locations"),
            # founders.py already normalises these keys -- name/title/bio/linkedin/twitter
            "f": [{"n": f.get("name"), "t": f.get("title"),
                   "b": (f.get("bio") or "")[:900],
                   "l": f.get("linkedin"), "x": f.get("twitter")}
                  for f in c["founders"]],
            "p": ({"o": c["prepivot"].get("original_one_liner"),
                   "n": c["prepivot"].get("original_name"),
                   "a": c["prepivot"].get("archive_url"),
                   "ts": (c["prepivot"].get("archived") or "")[:8],
                   "d": (c["prepivot"].get("original_description") or "")[:700]}
                  if c.get("prepivot") else None),
            "fn": c.get("former_names"),
        })

    w('<script>')
    w('const TH=%s;' % json.dumps({k: themes[k]["label"] for k in themes}, ensure_ascii=False))
    w('const CO=%s;' % json.dumps(slim, ensure_ascii=False))
    w(r"""
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$$('.tab').forEach(t=>t.onclick=()=>{
  $$('.tab').forEach(x=>x.classList.remove('on'));t.classList.add('on');
  $$('.page').forEach(p=>p.classList.remove('on'));$('#p-'+t.dataset.p).classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});});
$$('.jump').forEach(b=>b.onclick=()=>{
  $('#fth').value=b.dataset.theme;
  $$('.tab').forEach(x=>x.classList.remove('on'));
  document.querySelector('.tab[data-p="co"]').classList.add('on');
  $$('.page').forEach(p=>p.classList.remove('on'));$('#p-co').classList.add('on');
  render();window.scrollTo({top:0,behavior:'smooth'});});
const esc=s=>(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function render(){
  const q=$('#q').value.toLowerCase().trim(), th=$('#fth').value, ba=$('#fba').value,
        st=$('#fst').value, pv=$('#fpv').value;
  const out=CO.filter(c=>{
    if(th && !(c.t||[]).includes(th)) return false;
    if(ba && c.b!==ba) return false;
    if(st && (c.st||'')!==st) return false;
    if(pv && !c.p) return false;
    if(q){const h=[c.n,c.o,c.d,(c.tg||[]).join(' '),(c.f||[]).map(f=>f.n+' '+f.b).join(' ')].join(' ').toLowerCase();
      if(!h.includes(q)) return false;}
    return true;});
  $('#cnt').textContent=out.length+' of '+CO.length+' companies';
  $('#grid').innerHTML=out.map(c=>`<div class="card" data-s="${esc(c.s)}">
    <div class="top"><div class="nm">${esc(c.n)}</div><div class="bt">${esc(c.bs)}</div></div>
    <div class="ol">${esc(c.o)}</div>
    <div class="tags">${(c.t||[]).slice(0,3).map(t=>`<span class="tg">${esc((TH[t]||t).split(' ').slice(0,3).join(' '))}</span>`).join('')}
    ${c.p?'<span class="tg pv">pivoted</span>':''}
    ${(c.f||[]).length?`<span class="tg">${c.f.length} founder${c.f.length>1?'s':''}</span>`:''}</div></div>`).join('')
    || '<p class="note">Nothing matches that filter.</p>';
  $$('#grid .card').forEach(el=>el.onclick=()=>open(el.dataset.s));
}
function open(slug){
  const c=CO.find(x=>x.s===slug); if(!c)return;
  let h=`<button class="dr-x" id="drx">close &times;</button>
    <h3>${esc(c.n)}</h3>
    <div class="dr-sub">${esc(c.b)} &middot; ${esc(c.st||'')}${c.ts?' &middot; team '+c.ts:''}${c.loc?' &middot; '+esc(c.loc):''}</div>`;
  h+=`<div class="blk"><div class="blk-h">Current pitch</div><p><b>${esc(c.o)}</b></p>`;
  if(c.d) h+=`<p style="margin-top:8px">${esc(c.d)}</p>`;
  h+=`</div>`;
  if(c.p){
    h+=`<div class="blk"><div class="blk-h">What it pitched before${c.p.n&&c.p.n!==c.n?' &mdash; as &ldquo;'+esc(c.p.n)+'&rdquo;':''}</div>
      <p><b>${esc(c.p.o||'—')}</b></p>`;
    if(c.p.d) h+=`<p style="margin-top:7px;color:var(--ink-3)">${esc(c.p.d)}</p>`;
    if(c.p.a) h+=`<p style="margin-top:7px"><a class="lnk" href="${esc(c.p.a)}" target="_blank" rel="noopener">archived ${esc(c.p.ts)}</a></p>`;
    h+=`</div>`;}
  if(c.fn&&c.fn.length) h+=`<div class="blk"><div class="blk-h">Former names</div><p>${esc(c.fn.join(', '))}</p></div>`;
  h+=`<div class="blk"><div class="blk-h">Matches these requests</div><p>${(c.t||[]).map(t=>esc(TH[t]||t)).join(' &middot; ')}</p></div>`;
  if((c.f||[]).length){
    h+=`<div class="blk"><div class="blk-h">Founders</div>`;
    c.f.forEach(f=>{h+=`<div class="fo"><div class="fn">${esc(f.n)}</div><div class="ft">${esc(f.t||'')}</div>
      ${f.b?`<div class="fb">${esc(f.b)}</div>`:''}<div class="fl">
      ${f.l?`<a class="lnk" href="${esc(f.l)}" target="_blank" rel="noopener">LinkedIn</a>`:''}
      ${f.x?`<a class="lnk" href="${esc(f.x)}" target="_blank" rel="noopener">X</a>`:''}</div></div>`;});
    h+=`</div>`;}
  h+=`<div class="blk"><div class="blk-h">Links</div><p>
    <a class="lnk" href="https://www.ycombinator.com/companies/${esc(c.s)}" target="_blank" rel="noopener">YC profile</a>
    ${c.w?` &middot; <a class="lnk" href="${esc(c.w)}" target="_blank" rel="noopener">${esc(c.w)}</a>`:''}</p></div>`;
  if((c.tg||[]).length) h+=`<div class="blk"><div class="blk-h">YC tags</div><p>${c.tg.map(t=>esc(t)).join(' &middot; ')}</p></div>`;
  $('#drin').innerHTML=h;
  $('#drawer').classList.add('on');$('#scrim').classList.add('on');
  $('#drx').onclick=close_;
}
function close_(){$('#drawer').classList.remove('on');$('#scrim').classList.remove('on');}
$('#scrim').onclick=close_;
document.addEventListener('keydown',e=>{if(e.key==='Escape')close_();});
['q','fth','fba','fst','fpv'].forEach(id=>{const el=$('#'+id);el.oninput=render;el.onchange=render;});
$('#clr').onclick=()=>{['q','fth','fba','fst','fpv'].forEach(id=>$('#'+id).value='');render();};
render();
""")
    w('</script></body></html>')

    out = "\n".join(P)
    io.open(OUT, "w", encoding="utf-8").write(out)
    print("wrote %s  (%.0f KB)" % (OUT, len(out.encode("utf-8")) / 1024.0))
    print("companies %d  founders %d  recovered pitches %d" % (len(companies), n_found, n_pivot))
    print("\nper-request counts:")
    for k in order:
        if k in cnt:
            print("  %-48s %4d" % (themes[k]["label"][:48], cnt[k]))


if __name__ == "__main__":
    main()
