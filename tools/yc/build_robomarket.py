# -*- coding: utf-8 -*-
"""Build reports/robotics-marketplace-map.html.

Who is already building the pieces of "a place where a robotics team browses
arms, actuators and simulation environments by requirement, with AI search".

Descriptive by design. Anshu asked for the people and companies doing this and
explicitly said not to vet the idea yet, so this page reports what exists and
does not grade the opportunity. The one judgement it does make is structural
and stated as such: which layers are crowded and which are empty.

Input: robomarket.json (hand-built, each item carrying a confidence flag) plus
rfs_companies.json for the YC cross-reference count.
"""
import json, os, io, html

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.environ.get("ROBO_OUT", os.path.join(ROOT, "reports", "robotics-marketplace-map.html"))
PULL = "2026-10-19"


def e(s):
    return html.escape(s or "", quote=True)


def main():
    d = json.load(io.open(os.path.join(HERE, "robomarket.json"), encoding="utf-8"))
    layers = d["layers"]
    allp = [p for L in layers for p in L["players"]]
    ycp = [p for p in allp if p.get("yc")]
    verified = [p for p in allp if p.get("confidence") == "verified"]
    recent = [p for p in ycp if p["yc"].split()[-1] in ("2025", "2026")]

    P = []
    w = P.append
    w("""<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Robotics marketplaces &mdash; who is already building the parts counter</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  color-scheme: light;
  --paper:#f6f4ee; --surface:#fcfbf7; --ink:#141310; --ink-2:#52514e; --ink-3:#898781;
  --hairline:#e3e1d7; --baseline:#c9c7bb; --accent:#b3300e; --accent-ink:#8f2609; --wash:#efece2;
  --chart:#2a78d6; --ok:#1baf7a;
  --shadow: 0 1px 2px rgba(20,19,16,.05), 0 8px 24px -12px rgba(20,19,16,.18);
}
@media (prefers-color-scheme: dark){
  :root{
    color-scheme: dark;
    --paper:#111110; --surface:#1a1a19; --ink:#f4f3ee; --ink-2:#c3c2b7; --ink-3:#898781;
    --hairline:#2c2c2a; --baseline:#383835; --accent:#e05c33; --accent-ink:#ef7c58; --wash:#232320;
    --chart:#3987e5; --ok:#199e70;
    --shadow: 0 1px 2px rgba(0,0,0,.4), 0 8px 24px -12px rgba(0,0,0,.6);
  }
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:"IBM Plex Sans",system-ui,sans-serif;
  font-size:14px;line-height:1.55;padding:0 0 80px;-webkit-font-smoothing:antialiased}
.wrap{max-width:1180px;margin:0 auto;padding:36px 26px 0}
.kicker{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--accent);margin-bottom:10px}
h1{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:33px;line-height:1.12;
  letter-spacing:-.015em;margin-bottom:9px}
h1 em{font-style:italic;color:var(--ink-2);font-weight:400}
.dek{color:var(--ink-2);max-width:80ch;font-size:14.5px}
.dek b{color:var(--ink);font-weight:600}
.meta{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--ink-3);margin-top:12px;
  padding-top:11px;border-top:1px solid var(--hairline)}
.band{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;
  background:var(--hairline);border:1px solid var(--hairline);border-radius:8px;overflow:hidden;margin:24px 0}
.tile{background:var(--surface);padding:14px 16px}
.tile .v{font-family:"Fraunces",Georgia,serif;font-size:25px;font-weight:500;line-height:1.05;letter-spacing:-.02em}
.tile .l{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3);margin-top:5px}
.brief{border:1px solid var(--hairline);border-left:3px solid var(--accent);background:var(--surface);
  border-radius:0 9px 9px 0;padding:16px 19px;margin:22px 0;max-width:86ch}
.brief .lb{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:7px}
.brief p{color:var(--ink-2);font-size:13.5px}
.layer{margin:38px 0 0}
.layer-h{display:flex;justify-content:space-between;align-items:baseline;gap:12px;
  padding-bottom:9px;border-bottom:1px solid var(--baseline);margin-bottom:6px;flex-wrap:wrap}
.layer-h h2{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:21px;letter-spacing:-.01em}
.layer-h .n{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink-3)}
.layer-note{color:var(--ink-2);font-size:13px;max-width:84ch;margin:10px 0 16px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:12px}
.p{border:1px solid var(--hairline);background:var(--surface);border-radius:9px;padding:15px 17px;
  display:flex;flex-direction:column;gap:7px}
.p.closest{border-color:var(--accent);box-shadow:var(--shadow)}
.p .top{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap}
.p .nm{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:17px;letter-spacing:-.01em}
.p .nm small{font-family:"IBM Plex Sans",sans-serif;font-size:11px;color:var(--ink-3);font-weight:400}
.p .what{color:var(--ink-2);font-size:12.8px}
.p .also{color:var(--ink-3);font-size:12.2px;padding-top:7px;border-top:1px dashed var(--hairline)}
.p .ftr{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:auto;padding-top:8px}
.pill{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.07em;text-transform:uppercase;
  padding:2px 8px;border:1px solid var(--hairline);border-radius:999px;color:var(--ink-3);background:var(--wash)}
.pill.yc{color:var(--accent);border-color:var(--accent);background:transparent}
.pill.ok{color:var(--ok);border-color:var(--ok);background:transparent}
.lnk{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent;font-size:12px;
  font-family:"IBM Plex Mono",monospace}
.lnk:hover{border-bottom-color:var(--accent)}
.neg{border:1px solid var(--hairline);background:var(--wash);border-radius:9px;padding:17px 19px;margin-top:14px}
.neg ul{margin:9px 0 0 17px}
.neg li{color:var(--ink-2);font-size:13px;margin-bottom:9px}
footer{margin-top:54px;padding-top:18px;border-top:1px solid var(--hairline);
  font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);line-height:1.8}
</style></head><body>
<div class="wrap">
""")
    w('<div class="kicker">CTO Portal &middot; Landscape scan &middot; %s</div>' % PULL)
    w('<h1>Robotics marketplaces: <em>who is already building the parts counter</em></h1>')
    w('<p class="dek">A scan of everyone building some piece of <b>one place where a robotics team browses arms, actuators and simulation environments by requirement, with AI doing the searching</b>. '
      'Seven layers, %d companies. The short version: <b>every layer has someone in it, and nobody spans more than about half of them.</b> '
      'This page reports what exists and deliberately does not grade the opportunity.</p>' % len(allp))

    w('<div class="brief"><div class="lb">The brief this was scanned against</div><p>%s</p></div>' % e(d["brief"]))

    w('<div class="band">')
    w('<div class="tile"><div class="v">%d</div><div class="l">Companies found</div></div>' % len(allp))
    w('<div class="tile"><div class="v">%d</div><div class="l">Layers of the stack</div></div>' % len(layers))
    w('<div class="tile"><div class="v">%d</div><div class="l">YC-backed</div></div>' % len(ycp))
    w('<div class="tile"><div class="v">%d</div><div class="l">From 2025&ndash;26 batches</div></div>' % len(recent))
    w('<div class="tile"><div class="v">%d</div><div class="l">Read at source today</div></div>' % len(verified))
    w('</div>')

    CLOSEST = {"Robotics Center of Silicon Valley", "Reframe"}
    for L in layers:
        w('<div class="layer"><div class="layer-h"><h2>%s</h2><span class="n">%d</span></div>' % (e(L["label"]), len(L["players"])))
        w('<p class="layer-note">%s</p>' % e(L["note"]))
        w('<div class="grid">')
        for p in L["players"]:
            cl = " closest" if p["name"] in CLOSEST else ""
            w('<div class="p%s">' % cl)
            w('<div class="top"><div class="nm">%s%s</div></div>'
              % (e(p["name"]), (' <small>(%s)</small>' % e(p["legal"])) if p.get("legal") else ""))
            w('<div class="what">%s</div>' % e(p["what"]))
            if p.get("also"):
                w('<div class="also">%s</div>' % e(p["also"]))
            w('<div class="ftr">')
            if p.get("yc"):
                w('<span class="pill yc">YC %s</span>' % e(p["yc"]))
            if p.get("backing"):
                w('<span class="pill">%s</span>' % e(p["backing"]))
            w('<span class="pill%s">%s</span>' % (" ok" if p.get("confidence") == "verified" else "", e(p.get("confidence"))))
            if p["name"] in CLOSEST:
                w('<span class="pill yc">closest to the brief</span>')
            w('</div>')
            if p.get("url"):
                w('<div><a class="lnk" href="%s" target="_blank" rel="noopener">%s</a></div>'
                  % (e(p["url"]), e(p["url"].replace("https://", "").replace("http://", "").rstrip("/"))))
            w('</div>')
        w('</div></div>')

    c = d["counterpoint"]
    w('<div class="layer"><div class="layer-h"><h2>The deliberate counterpoint</h2><span class="n">1</span></div>')
    w('<div class="grid"><div class="p"><div class="top"><div class="nm">%s</div></div>' % e(c["name"]))
    w('<div class="what">%s</div>' % e(c["what"]))
    w('<div class="ftr"><span class="pill yc">YC %s</span><span class="pill ok">%s</span></div></div></div></div>'
      % (e(c["yc"]), e(c["confidence"])))

    w('<div class="layer"><div class="layer-h"><h2>What was looked for and not found</h2><span class="n">negative results</span></div>')
    w('<p class="layer-note">Recorded so the next pass does not repeat the same searches. A negative result is only as good as the search behind it, so each says what was actually queried.</p>')
    w('<div class="neg"><ul>')
    for n in d["negative_results"]:
        w('<li>%s</li>' % e(n))
    w('</ul></div></div>')

    w('<div class="layer"><div class="layer-h"><h2>Method</h2><span class="n">how this was assembled</span></div>')
    w('<p class="layer-note">%s</p>' % e(d["method"]))
    w('<p class="layer-note">The YC side is not a guess: it is a search over the full directory pull behind the '
      '<a class="lnk" href="yc-rfs-hardware-map.html">RFS hardware map</a> &mdash; all 6,306 companies YC publishes, '
      'Summer 2005 to Summer 2027 &mdash; filtered for marketplace, catalog and sourcing language intersected with '
      'robotics, parts and simulation language, then read one by one. Non-YC names are web-retrieved and each carries '
      'its source and a confidence flag. Where sources disagreed, the disagreement is recorded rather than averaged: '
      'Octopart\'s distributor count appears as 117, 200+ and 400+ across three pages, so no single figure is quoted as fact.</p>')
    w('</div>')

    w('<footer>Scanned %s. Company descriptions are each company\'s own words unless marked otherwise. '
      'Items marked <b>verified</b> were read at the company\'s own page in this session; <b>reported</b> items come from '
      'secondary sources. Descriptive scan only &mdash; no assessment of the opportunity was requested and none is recorded here.</footer>' % PULL)
    w('</div></body></html>')

    out = "\n".join(P)
    io.open(OUT, "w", encoding="utf-8").write(out)
    print("wrote %s  (%.0f KB)" % (OUT, len(out.encode("utf-8")) / 1024.0))
    print("players %d across %d layers; YC %d; verified %d" % (len(allp), len(layers), len(ycp), len(verified)))
    for L in layers:
        print("  %-52s %d" % (L["label"][:52], len(L["players"])))


if __name__ == "__main__":
    main()
