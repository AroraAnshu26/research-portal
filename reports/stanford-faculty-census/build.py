import json,os,sys,io,math
from collections import Counter
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
SP=os.path.dirname(os.path.abspath(__file__))
L=lambda n: json.load(open(os.path.join(SP,n),encoding="utf-8"))
R=L("faculty_classified.json"); NODES=L("nodes.json"); CO=L("companies.json"); TH=L("theses.json"); OC=L("org_counts.json")
COUNTS=OC["counts"]

SCHOOLS=[("SoE","School of Engineering"),("H&S","Humanities & Sciences"),("Med","School of Medicine"),
         ("Sustain","Doerr School of Sustainability"),("GSB","Graduate School of Business"),
         ("GSE","Graduate School of Education"),("SLAC","SLAC National Accelerator Laboratory")]
INST=[("HAI","Human-Centered AI (HAI)"),("SDS","Stanford Data Science"),("Bio-X","Bio-X"),("ChEM-H","Sarafan ChEM-H"),
      ("WuTsaiNeuro","Wu Tsai Neurosciences"),("WuTsaiHPA","Wu Tsai Human Performance"),("Precourt","Precourt Institute for Energy"),
      ("Woods","Woods Institute for the Environment"),("PULSE","Stanford PULSE Institute"),("ICME","ICME"),
      ("StemCell","Stem Cell Biology & Regenerative Medicine"),("FSI","Freeman Spogli Institute"),("SIEPR","SIEPR")]
IK=[k for k,_ in INST]

def ov(a,b): return sum(1 for r in R if a in r["orgs"] and b in r["orgs"])
inst_ov={a:{b:(0 if a==b else ov(a,b)) for b in IK} for a in IK}
sch_inst={s:{i:ov(s,i) for i in IK} for s,_ in SCHOOLS}
n_inst=Counter(sum(1 for i in IK if i in r["orgs"]) for r in R)
AI=["Foundation models & NLP","Machine learning","Robotics & embodied"]
DOMS=sorted({d for r in R for d in r["domains"]})
md={a:Counter() for a in AI}
for r in R:
    for a in AI:
        if a in r["methods"]:
            for x in r["cross"]: md[a][x]+=1
xlist=sorted([r for r in R if r["cross"] and any(a in r["methods"] for a in AI)],key=lambda r:r["name"])

TOTAL=len(R); WITH=sum(1 for r in R if r["has_interests"])
AIN=sum(1 for r in R if r["ai_method"]); XN=sum(1 for r in R if r["cross"])
NO_INST=n_inst[0]; MULTI=sum(v for k,v in n_inst.items() if k>=2)

CLUS=sorted({n["cluster"] for n in NODES})
PAL={"Robotics & physical AI":"--c-embodied","Foundation models & core AI":"--c-reasoning",
     "AI x biology & medicine":"--c-bio","Semiconductors, photonics & quantum":"--c-semis",
     "Space & aerospace":"--c-frontier","Oceans, climate & earth":"--c-physics",
     "Neurotechnology":"--c-agents","Energy, materials & sustainability":"--c-world",
     "Security & cryptography":"--c-arch","AI institutions & capital":"--c-materials"}

def svg_matrix():
    cell=34; lx=190; ty=150; n=len(IK)
    w=lx+cell*n+30; h=ty+cell*n+30
    mx=max(inst_ov[a][b] for a in IK for b in IK) or 1
    s=['<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" class="matrix" role="img" aria-label="Institute co-affiliation matrix">'%(w,h)]
    for j,b in enumerate(IK):
        x=lx+j*cell+cell/2
        s.append('<text x="%.1f" y="%d" class="mlab mrot" transform="rotate(-55 %.1f %d)">%s</text>'%(x,ty-8,x,ty-8,b))
    for i,a in enumerate(IK):
        y=ty+i*cell+cell/2+4
        s.append('<text x="%d" y="%.1f" class="mlab" text-anchor="end">%s</text>'%(lx-10,y,dict(INST)[a][:34]))
        for j,b in enumerate(IK):
            v=inst_ov[a][b]; x=lx+j*cell
            if a==b:
                s.append('<rect x="%d" y="%d" width="%d" height="%d" fill="var(--wash)"/>'%(x,ty+i*cell,cell-2,cell-2))
                continue
            o=0.0 if v==0 else 0.10+0.90*(math.log1p(v)/math.log1p(mx))
            s.append('<rect x="%d" y="%d" width="%d" height="%d" fill="var(--chart)" fill-opacity="%.3f"><title>%s and %s: %d shared faculty</title></rect>'%(x,ty+i*cell,cell-2,cell-2,o,dict(INST)[a],dict(INST)[b],v))
            if v>=20:
                s.append('<text x="%.1f" y="%.1f" class="mval" fill="%s">%d</text>'%(x+cell/2-1,ty+i*cell+cell/2+4,"#fff" if o>0.55 else "var(--ink-2)",v))
    s.append('</svg>')
    return "".join(s)

def money(v):
    if v is None: return "&mdash;"
    if v>=1e9: return "$%.2fB"%(v/1e9)
    if v>=1e6: return "$%.0fM"%(v/1e6)
    return "$%d"%v

DATA={"nodes":NODES,"companies":CO["companies"],"clusters":CLUS,
      "schools":[[k,v] for k,v in SCHOOLS],"insts":[[k,v] for k,v in INST]}

# ---- stat tiles
tiles=[
 (f"{TOTAL:,}","faculty in the census","Unique people with a faculty affiliation across 6 schools, SLAC, the Dean of Research office and 13 institutes"),
 (f"{WITH:,}","wrote research interests",f"{WITH/TOTAL*100:.0f}% filled in the research-interest field on Stanford Profiles. Everything keyword-derived below is measured only over these."),
 (f"{NO_INST:,}","hold no institute seat",f"{NO_INST/TOTAL*100:.1f}% of faculty sit in a department only. {MULTI:,} hold two or more institute affiliations."),
 (f"{COUNTS['HAI']}","HAI faculty",f"Of whom {sch_inst['SoE']['HAI']} are Engineering and {sch_inst['H&S']['HAI']+sch_inst['Med']['HAI']+sch_inst['Sustain']['HAI']+sch_inst['GSB']['HAI']+sch_inst['GSE']['HAI']} come from H&S, Medicine, Sustainability, Business and Education."),
 ("$2.3B","sponsored research, FY2025","Total sponsored support revenue for the year ended 31 August 2025, including SLAC. Over 70% federally sponsored."),
 (f"{len(CO['companies'])}","companies traced","Faculty spinouts, lab-of-origin companies, alumni and student ventures with a stated Stanford tie."),
 ("$725&ndash;800B","2026 hyperscaler capex","Guided by Amazon, Alphabet, Microsoft, Meta and Oracle combined; roughly 3x the ~$238B deployed in 2024."),
 ("4 May 2026","HAI absorbed Data Science","The two institutes merged under the HAI name: 400+ scholars, $60M cumulative grants, the Marlowe cluster."),
]

def esc(s): return (s or "").replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")

tile_html="".join(
 f'<div class="tile"><div class="tile-n">{n}</div><div class="tile-l">{l}</div><div class="tile-d">{d}</div></div>'
 for n,l,d in tiles)

tl_html="".join(
 f'<li class="tl-item tl-{t["kind"]}"><span class="tl-date">{t["date"]}</span>'
 f'<span class="tl-dot"></span><span class="tl-label">{esc(t["label"])}</span></li>'
 for t in TH["timeline"])

# census table
rows=[]
for k,label in SCHOOLS:
    tot=COUNTS[k]
    cells="".join(f'<td class="num">{sch_inst[k][i] or ""}</td>' for i in IK)
    rows.append(f'<tr><th scope="row">{label}</th><td class="num strong">{tot:,}</td>{cells}</tr>')
census_head="".join(f'<th class="rot"><span>{dict(INST)[i]}</span></th>' for i in IK)
census_rows="".join(rows)
inst_tot="".join(f'<td class="num strong">{COUNTS[i]:,}</td>' for i in IK)

md_rows=""
for a in AI:
    cells="".join(f'<td class="num">{md[a].get(d,"") or ""}</td>' for d in DOMS)
    n=sum(1 for r in R if a in r["methods"])
    md_rows+=f'<tr><th scope="row">{a}<span class="sub">n={n}</span></th>{cells}</tr>'
md_head="".join(f'<th class="rot"><span>{d}</span></th>' for d in DOMS)

x_rows="".join(
 f'<tr><td><a href="https://profiles.stanford.edu/{r["slug"]}" target="_blank" rel="noopener">{esc(r["name"])}</a></td>'
 f'<td class="dim">{esc(r["title"][:90])}</td><td>{esc(", ".join(r["cross"]))}</td>'
 f'<td class="dim">{esc(", ".join(m for m in r["methods"] if m in AI))}</td></tr>' for r in xlist)

th_html=""
for c in TH["clusters"]:
    eq=c.get("stanford_equity")
    eqs=("Stanford-linked disclosed valuation in this cluster: <strong>"+money(eq)+"</strong>") if eq else ("Stanford-linked disclosed valuation: <strong>none disclosed</strong>" if eq==0 else "")
    srcs="".join(f'<a href="{s}" target="_blank" rel="noopener">source</a>' for s in c["sources"])
    th_html+=f'''<article class="thesis" id="th-{c["id"]}">
      <h3>{esc(c["name"])}</h3>
      <div class="th-grid">
        <div><h4>What is observably happening</h4><p>{esc(c["observation"])}</p></div>
        <div><h4>Who is paying</h4><p>{esc(c["who_pays"])}</p></div>
        <div><h4>Market size, as published</h4><p>{esc(c["market_size"])}</p></div>
        <div><h4>The arithmetic</h4><p class="arith">{esc(c["arithmetic"])}</p></div>
      </div>
      <div class="th-foot"><span>{eqs}</span><span class="srcs">{srcs}</span></div>
    </article>'''

HTML=f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stanford Frontier Map &mdash; Labs, Money and Spinouts, September 2026</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{{
  color-scheme: light;
  --paper:#f6f4ee; --surface:#fcfbf7; --ink:#141310; --ink-2:#52514e; --ink-3:#898781;
  --hairline:#e3e1d7; --baseline:#c9c7bb; --accent:#b3300e; --accent-ink:#8f2609; --wash:#efece2;
  --chart:#2a78d6; --chart-dim:#9ec5f4;
  --c-embodied:#1baf7a; --c-reasoning:#4a3aa7; --c-bio:#eb6834; --c-frontier:#2a78d6;
  --c-world:#eda100; --c-agents:#8d3bb8; --c-materials:#008300; --c-arch:#e87ba4;
  --c-semis:#8f5f10; --c-physics:#00a2b8;
}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 "IBM Plex Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}}
.wrap{{max-width:1280px;margin:0 auto;padding:0 28px 80px}}
header.top{{border-bottom:1px solid var(--baseline);padding:44px 0 22px;margin-bottom:0}}
h1{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:40px;line-height:1.1;margin:0 0 10px;letter-spacing:-.01em}}
.dek{{font-size:17px;color:var(--ink-2);max-width:74ch;margin:0 0 14px}}
.stamp{{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}}
nav.tabs{{display:flex;gap:0;border-bottom:1px solid var(--baseline);margin:26px 0 30px;flex-wrap:wrap}}
nav.tabs button{{appearance:none;background:none;border:0;border-bottom:2px solid transparent;padding:12px 16px;font:500 14px/1 "IBM Plex Sans";color:var(--ink-2);cursor:pointer}}
nav.tabs button:hover{{color:var(--ink)}}
nav.tabs button[aria-selected=true]{{color:var(--accent-ink);border-bottom-color:var(--accent)}}
section.tab{{display:none}} section.tab.on{{display:block}}
h2{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:25px;margin:34px 0 6px}}
h2:first-child{{margin-top:0}}
.lede{{color:var(--ink-2);max-width:82ch;margin:0 0 20px}}
.tiles{{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline);margin:0 0 34px}}
.tile{{background:var(--surface);padding:18px 18px 16px}}
.tile-n{{font-family:Fraunces,Georgia,serif;font-size:27px;font-weight:500;line-height:1.05;letter-spacing:-.01em}}
.tile-l{{font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--accent-ink);margin:6px 0 7px;font-weight:500}}
.tile-d{{font-size:12.5px;color:var(--ink-3);line-height:1.45}}
table{{width:100%;border-collapse:collapse;background:var(--surface);font-size:13.5px}}
th,td{{text-align:left;padding:8px 10px;border-bottom:1px solid var(--hairline);vertical-align:top}}
thead th{{font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3);font-weight:500;border-bottom:1px solid var(--baseline);background:var(--wash)}}
td.num,th.num{{text-align:right;font-family:"IBM Plex Mono",monospace;font-size:12.5px}}
td.strong{{font-weight:600}} td.dim{{color:var(--ink-3);font-size:12.5px}}
th.rot{{height:132px;white-space:nowrap;vertical-align:bottom;padding:0 0 8px}}
th.rot>span{{display:inline-block;transform:rotate(-55deg);transform-origin:left bottom;width:18px;font-size:11px;letter-spacing:.02em}}
tbody tr:hover{{background:var(--wash)}}
.sub{{display:block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);text-transform:none;letter-spacing:0}}
a{{color:var(--accent-ink);text-decoration:none;border-bottom:1px solid rgba(179,48,14,.28)}}
a:hover{{border-bottom-color:var(--accent)}}
.filters{{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:16px;background:var(--surface);border:1px solid var(--hairline);margin-bottom:16px}}
.filters label{{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:4px}}
.filters select,.filters input{{font:14px "IBM Plex Sans";padding:7px 9px;background:var(--paper);border:1px solid var(--baseline);color:var(--ink);min-width:172px}}
.filters .clear{{margin-left:auto}}
button.btn{{font:500 13px "IBM Plex Sans";padding:8px 13px;background:var(--paper);border:1px solid var(--baseline);cursor:pointer;color:var(--ink-2)}}
button.btn:hover{{border-color:var(--accent);color:var(--accent-ink)}}
.count{{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--ink-3);margin:0 0 8px}}
th.sortable{{cursor:pointer;user-select:none}} th.sortable:hover{{color:var(--ink)}}
th.sortable::after{{content:"";opacity:.35;margin-left:5px}}
th.sortable[data-dir=asc]::after{{content:"\\2191";opacity:1}}
th.sortable[data-dir=desc]::after{{content:"\\2193";opacity:1}}
.chip{{display:inline-block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;padding:2px 6px;border:1px solid var(--hairline);background:var(--paper);color:var(--ink-2);margin:0 3px 3px 0;white-space:nowrap}}
.dot{{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;vertical-align:-1px}}
tr.row{{cursor:pointer}}
.drawer{{position:fixed;top:0;right:0;width:min(560px,94vw);height:100%;background:var(--surface);border-left:1px solid var(--baseline);box-shadow:-14px 0 44px rgba(20,19,16,.13);transform:translateX(102%);transition:transform .22s ease;z-index:60;overflow-y:auto;padding:26px 28px 60px}}
.drawer.on{{transform:none}}
.drawer h3{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:24px;margin:0 0 4px}}
.drawer .dt{{font-size:13.5px;color:var(--ink-2);margin:0 0 18px}}
.drawer dl{{margin:0}} .drawer dt{{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin:16px 0 3px}}
.drawer dd{{margin:0;font-size:14px}}
.drawer .x{{position:absolute;top:16px;right:20px;font-size:22px;color:var(--ink-3);cursor:pointer;line-height:1;background:none;border:0}}
.scrim{{position:fixed;inset:0;background:rgba(20,19,16,.16);opacity:0;pointer-events:none;transition:opacity .22s;z-index:55}}
.scrim.on{{opacity:1;pointer-events:auto}}
.matrix{{width:100%;max-width:780px;height:auto;display:block;background:var(--surface);border:1px solid var(--hairline);padding:10px}}
.mlab{{font-family:"IBM Plex Sans";font-size:10.5px;fill:var(--ink-2)}}
.mrot{{text-anchor:start}}
.mval{{font-family:"IBM Plex Mono",monospace;font-size:9.5px;text-anchor:middle}}
ol.tl{{list-style:none;margin:0;padding:0;border-left:1px solid var(--baseline)}}
.tl-item{{position:relative;padding:0 0 16px 24px;font-size:14px}}
.tl-dot{{position:absolute;left:-4.5px;top:7px;width:8px;height:8px;border-radius:50%;background:var(--chart)}}
.tl-company .tl-dot{{background:var(--accent)}} .tl-money .tl-dot{{background:var(--c-materials)}}
.tl-date{{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink-3);display:inline-block;width:66px}}
.tl-label{{color:var(--ink)}}
.thesis{{background:var(--surface);border:1px solid var(--hairline);padding:22px 24px;margin:0 0 18px}}
.thesis h3{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:22px;margin:0 0 14px}}
.th-grid{{display:grid;grid-template-columns:1fr 1fr;gap:18px 28px}}
.th-grid h4{{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--accent-ink);margin:0 0 5px;font-weight:500}}
.th-grid p{{margin:0;font-size:14px;color:var(--ink-2)}}
p.arith{{font-family:"IBM Plex Mono",monospace;font-size:12.5px;line-height:1.6;color:var(--ink)}}
.th-foot{{display:flex;justify-content:space-between;gap:18px;margin-top:16px;padding-top:12px;border-top:1px solid var(--hairline);font-size:12.5px;color:var(--ink-2)}}
.srcs a{{margin-left:10px;font-family:"IBM Plex Mono",monospace;font-size:11px}}
.note{{background:var(--wash);border:1px solid var(--hairline);padding:16px 18px;font-size:13.5px;color:var(--ink-2);margin:0 0 22px}}
.note strong{{color:var(--ink)}}
.two{{display:grid;grid-template-columns:1fr 1fr;gap:28px}}
.scroll{{overflow-x:auto;border:1px solid var(--hairline)}}
footer{{border-top:1px solid var(--baseline);margin-top:50px;padding:20px 0;font-size:12px;color:var(--ink-3)}}
@media (max-width:1080px){{.tiles{{grid-template-columns:repeat(2,1fr)}}}}
@media (max-width:860px){{.th-grid,.two{{grid-template-columns:1fr}} h1{{font-size:30px}}}}
@media (max-width:560px){{.tiles{{grid-template-columns:1fr}}}}
</style></head><body>
<div class="wrap">
<header class="top">
  <h1>Stanford Frontier Map</h1>
  <p class="dek">A census of who builds what at Stanford, which institute they sit in, who pays for it, and what has been spun out at what price. Built from Stanford's own faculty affiliation records, plus company figures retrieved from named outlets. Filters are the point: the cross-domain view shows where AI and robotics are being used as instruments on a different field.</p>
  <p class="stamp">Census pulled 10 September 2026 &middot; {TOTAL:,} faculty &middot; 21 organisational units &middot; {len(NODES)} detailed lab nodes &middot; {len(CO["companies"])} companies</p>
</header>
<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true" data-t="overview">Overview</button>
  <button role="tab" aria-selected="false" data-t="people">Labs &amp; people</button>
  <button role="tab" aria-selected="false" data-t="cross">Cross-domain</button>
  <button role="tab" aria-selected="false" data-t="companies">Companies</button>
  <button role="tab" aria-selected="false" data-t="theses">Theses &amp; market size</button>
  <button role="tab" aria-selected="false" data-t="method">Method &amp; gaps</button>
</nav>

<section class="tab on" id="tab-overview">
  <div class="tiles">{tile_html}</div>
  <h2>What changed, September 2024 to September 2026</h2>
  <p class="lede">Institution changes and financing events in one sequence. Red marks a company event, blue an institutional one, green a university-level money figure.</p>
  <ol class="tl">{tl_html}</ol>
  <h2>Where the faculty actually sit</h2>
  <p class="lede">Rows are schools; columns are the 13 institutes. A number is the count of faculty who appear in both. The institutes are overlays: every institute member already holds a school appointment, so adding all 13 institutes to the census produced zero additional people.</p>
  <div class="scroll"><table>
    <thead><tr><th>School</th><th class="num">Faculty</th>{census_head}</tr></thead>
    <tbody>{census_rows}
    <tr><th scope="row">Institute total</th><td class="num">&mdash;</td>{inst_tot}</tr></tbody>
  </table></div>
  <p class="note">Row sums across institutes can exceed a school's total because faculty hold courtesy appointments in more than one school, and one person can belong to several institutes. <strong>{n_inst[1]:,}</strong> faculty hold exactly one institute seat, <strong>{n_inst[2]:,}</strong> hold two, <strong>{n_inst[3]:,}</strong> hold three, <strong>{n_inst[4]+n_inst[5]+n_inst[6]:,}</strong> hold four or more.</p>
</section>

<section class="tab" id="tab-people">
  <h2>Labs &amp; people</h2>
  <p class="lede">Hand-checked nodes: {len(NODES)} faculty drawn from the Stanford Robotics Center roster, the SAIL faculty list, AIMI, the institutes and the spinout record. Titles and profile links come from Stanford's own records. Click a row for the full research-interest text and links.</p>
  <div class="filters">
    <div><label for="f-cluster">Cluster</label><select id="f-cluster"><option value="">All clusters</option></select></div>
    <div><label for="f-school">School</label><select id="f-school"><option value="">All schools</option></select></div>
    <div><label for="f-inst">Institute</label><select id="f-inst"><option value="">All institutes</option></select></div>
    <div><label for="f-x">Cross-domain target</label><select id="f-x"><option value="">Any</option><option value="__any">Has a cross-domain target</option></select></div>
    <div><label for="f-co">Company</label><select id="f-co"><option value="">Any</option><option value="1">Named in a company</option></select></div>
    <div><label for="f-q">Search</label><input id="f-q" type="search" placeholder="name, lab, interest"></div>
    <button class="btn clear" id="f-reset">Reset</button>
  </div>
  <p class="count" id="p-count"></p>
  <table id="t-people">
    <thead><tr>
      <th class="sortable" data-k="name">Name</th>
      <th class="sortable" data-k="cluster">Cluster</th>
      <th>Lab or role</th>
      <th class="sortable" data-k="xdomain">Cross-domain target</th>
      <th>Institutes</th>
    </tr></thead><tbody></tbody>
  </table>
</section>

<section class="tab" id="tab-cross">
  <h2>Institute co-affiliation</h2>
  <p class="lede">Stanford's own affiliation records, not keywords. Each cell is the number of faculty who sit in both institutes. This is the most reliable cross-domain signal in the map because it is Stanford's data rather than my inference.</p>
  {svg_matrix()}
  <p class="note">Densest pair: <strong>Bio-X and Wu Tsai Neurosciences share {inst_ov['Bio-X']['WuTsaiNeuro']} faculty</strong>. HAI shares {inst_ov['HAI']['Bio-X']} with Bio-X and {inst_ov['HAI']['WuTsaiNeuro']} with Wu Tsai Neurosciences, but only {inst_ov['HAI']['Precourt']} with the Precourt Institute for Energy and {inst_ov['HAI']['ChEM-H']} with Sarafan ChEM-H. On Stanford's own records, the AI institute overlaps heavily with biology and neuroscience and barely at all with energy or chemical biology.</p>
  <h2>AI and robotics methods aimed outside the home department</h2>
  <p class="lede">Keyword-derived, and weaker evidence than the matrix above. A person counts here when their research-interest text names an AI, ML or robotics method <em>and</em> a target field that is not their own department's field. Measured over the {WITH:,} faculty who filled in that field, so these are floors, not totals.</p>
  <div class="scroll"><table>
    <thead><tr><th>Method</th>{md_head}</tr></thead>
    <tbody>{md_rows}</tbody>
  </table></div>
  <p class="note"><strong>Precision caveat, stated plainly.</strong> I hand-checked a sample of this table. Engineering-department rows are mostly right; clinical-faculty rows include false positives, because phrases like "robotic surgery" trip the robotics pattern and a second unrelated keyword then trips a domain. Treat the counts as indicative and the names below as the checkable artefact. Roughly two in three of the sampled rows survived inspection.</p>
  <h2>The {len(xlist)} people behind those counts</h2>
  <p class="lede">Every row the classifier flagged, so you can judge them yourself rather than trust the count.</p>
  <table><thead><tr><th>Name</th><th>Appointment</th><th>Target field flagged</th><th>Method flagged</th></tr></thead>
  <tbody>{x_rows}</tbody></table>
</section>

<section class="tab" id="tab-companies">
  <h2>Companies with a stated Stanford tie</h2>
  <p class="lede">{len(CO["companies"])} companies. The tie type matters and is kept separate: a current professor founding a company is a different signal from an alumnus or a dropout. Every figure carries its source; click a row.</p>
  <div class="filters">
    <div><label for="c-cluster">Cluster</label><select id="c-cluster"><option value="">All clusters</option></select></div>
    <div><label for="c-tie">Stanford tie</label><select id="c-tie"><option value="">Any tie</option></select></div>
    <div><label for="c-status">Status</label><select id="c-status"><option value="">Any status</option></select></div>
    <div><label for="c-val">Valuation</label><select id="c-val"><option value="">Any</option><option value="1">Disclosed only</option><option value="b">$1B and above</option></select></div>
    <div><label for="c-q">Search</label><input id="c-q" type="search" placeholder="company, founder, investor"></div>
    <button class="btn clear" id="c-reset">Reset</button>
  </div>
  <p class="count" id="c-count"></p>
  <table id="t-co">
    <thead><tr>
      <th class="sortable" data-k="name">Company</th>
      <th class="sortable" data-k="cluster">Cluster</th>
      <th class="sortable" data-k="tie_type">Tie</th>
      <th class="sortable num" data-k="valuation_usd">Valuation</th>
      <th class="sortable num" data-k="total_raised_usd">Raised</th>
      <th class="sortable" data-k="status">Status</th>
    </tr></thead><tbody></tbody>
  </table>
  <p class="note">{esc(CO["provenance"])}</p>
</section>

<section class="tab" id="tab-theses">
  <h2>Theses and market size, by cluster</h2>
  <p class="lede">{esc(TH["note"])}</p>
  {th_html}
</section>

<section class="tab" id="tab-method">
  <h2>How this was built</h2>
  <p class="lede">So you can check it, rebuild it, or disagree with a specific step.</p>
  <div class="two">
    <div>
      <h2 style="font-size:19px">The census</h2>
      <p class="lede">Stanford Profiles exposes a browse endpoint per organisational unit that accepts an affiliation filter. Pulling <code>?affiliations=capFaculty</code> across 6 schools, SLAC, the Vice Provost and Dean of Research office and 13 institutes returned 12,827 rows, which dedupe by profile slug to <strong>{TOTAL:,} unique faculty</strong>. Parse rate against Stanford's own stated result counts was 99.8%. Each record carries name, full appointment title, and the free-text research-interest field where the person filled it in ({WITH:,} of {TOTAL:,}).</p>
      <h2 style="font-size:19px">The nodes</h2>
      <p class="lede">The {len(NODES)} detailed nodes were assembled from four pages fetched directly this session: the Stanford Robotics Center faculty roster (42 faculty), the SAIL faculty list (32), the AIMI centre, and the institutes. Lab names and lab URLs appear only where that page named them. Every person link is Stanford's own profile URL, taken from the census, so it resolves.</p>
    </div>
    <div>
      <h2 style="font-size:19px">Known gaps, stated</h2>
      <p class="lede"><strong>Faculty missing from the census.</strong> The browse filter returns people carrying a faculty affiliation in the units queried. Dan Jurafsky, an active CS and Linguistics professor, does not appear in the harvest at all. So the census is a floor even at the person level.<br><br>
      <strong>One title per person.</strong> Where someone holds several appointments, the harvested title is whichever the listing showed. Christopher Manning's record reads as Linguistics emeritus faculty; he is also an active CS professor and SAIL director. Titles are Stanford's text, not corrected by me.<br><br>
      <strong>Keyword layer is weak evidence.</strong> The method and domain tags are regex over the research-interest field. Precision on the cross-domain cells ran about two in three in my sample. The institute co-affiliation matrix has no such problem and should be preferred.<br><br>
      <strong>Market sizes are third-party.</strong> Where research firms disagree the spread is shown, up to 8.4x in AI drug discovery. No single number here is mine except the explicitly labelled arithmetic, which is addition and division over cited figures.<br><br>
      <strong>Not covered in this pass.</strong> Grant-level dollar amounts per lab, affiliate-programme fee schedules beyond HAI's stated $550K research-token wallet, and the full StartX and alumni company set. Those were deferred to a second pass.</p>
    </div>
  </div>
  <h2>Money layer, as found</h2>
  <table><tbody>
    <tr><th scope="row">Stanford sponsored research, FY ended 31 Aug 2025</th><td>$2.3B total sponsored support revenue including SLAC, across more than 7,500 externally funded awards; the federal government sponsors over 70%. <a href="https://facts.stanford.edu/research" target="_blank" rel="noopener">Stanford Facts</a></td></tr>
    <tr><th scope="row">Stanford HAI after the 4 May 2026 merger</th><td>Absorbed Stanford Data Science under the HAI name. Brought 400+ scholars and $60M in cumulative grant funding, plus the Marlowe HPC cluster. James Landay is Denning Director; Fei-Fei Li and John Hennessy co-chair the advisory council. <a href="https://news.stanford.edu/stories/2026/05/stanford-merges-hai-data-science" target="_blank" rel="noopener">Stanford Report</a></td></tr>
    <tr><th scope="row">HAI corporate affiliate programme</th><td>Members receive a stated $550K "HAI Wallet" usable as research tokens, which can be directed to a named faculty member or lab, with results shared with all members and the public. Recent joiners include AXA, SCBX and Hanwha Life Insurance. <a href="https://hai.stanford.edu/corporate-affiliate-program" target="_blank" rel="noopener">Stanford HAI</a></td></tr>
    <tr><th scope="row">SystemX Alliance, founded 1978</th><td>35 member companies including AMD, Analog Devices, Ant Group, Apple, Applied Materials, Balyasny Asset Management, Bosch, Caterpillar, Ericsson, IMEC, Infineon, Intel, Keysight, Kioxia, Lam Research, CEA-Leti, LG Display, Marvell, MetaOptics, Qualcomm, Samsung, Siemens, Tencent, TEL and TSMC. Fee schedule not published. <a href="https://systemx.stanford.edu/industry-affiliates/member-companies" target="_blank" rel="noopener">SystemX</a></td></tr>
    <tr><th scope="row">Sustainability Accelerator</th><td>Nearly $5M awarded to teams across 22 departments; faculty director is Yi Cui. <a href="https://sustainability.stanford.edu/news/sustainability-accelerator-showcases-18-innovations-tackle-greenhouse-gas-removal" target="_blank" rel="noopener">Doerr School</a></td></tr>
    <tr><th scope="row">StartX</th><td>No fee, no equity. Reported total portfolio valuation $120B, average $42M raised per company; roughly 123 startups supported as of May 2026 with 5 unicorns and 32 exits; the wider community reached 1,300 companies by 2025 with 20 unicorns. <a href="https://tracxn.com/d/accelerator-incubator/startx/__gxYoGzqu_WhoNA3T186PTnxju_ddH2nwu2Eng3OAiT0" target="_blank" rel="noopener">Tracxn</a></td></tr>
    <tr><th scope="row">Stanford Emerging Technology Review 2026</th><td>Stanford's own framing of the frontier, in ten areas: artificial intelligence, biotechnology and synthetic biology, cryptography and computer security, energy technologies, materials science, neuroscience, quantum technologies, robotics, semiconductors, space. <a href="https://setr.stanford.edu/technology-areas-2026" target="_blank" rel="noopener">SETR</a></td></tr>
  </tbody></table>
</section>

<footer>Stanford Frontier Map &middot; built 10 September 2026 &middot; census from Stanford Profiles browse endpoints; company and market figures from the outlets cited on each row. Private valuations are reported, not audited.</footer>
</div>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-live="polite"><button class="x" id="dx" aria-label="Close">&times;</button><div id="dbody"></div></aside>
<script>
const DATA={json.dumps(DATA,ensure_ascii=False)};
const PAL={json.dumps(PAL)};
const money=v=>v==null?"\\u2014":(v>=1e9?"$"+(v/1e9).toFixed(2)+"B":v>=1e6?"$"+Math.round(v/1e6)+"M":"$"+v);
const esc=s=>(s==null?"":String(s)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const SCH=Object.fromEntries(DATA.schools), INS=Object.fromEntries(DATA.insts);

// tabs
document.querySelectorAll("nav.tabs button").forEach(b=>b.onclick=()=>{{
  document.querySelectorAll("nav.tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));
  document.querySelectorAll("section.tab").forEach(s=>s.classList.toggle("on",s.id==="tab-"+b.dataset.t));
  window.scrollTo({{top:0,behavior:"instant"}});
}});

// drawer
const drawer=document.getElementById("drawer"),scrim=document.getElementById("scrim"),dbody=document.getElementById("dbody");
const close=()=>{{drawer.classList.remove("on");scrim.classList.remove("on")}};
document.getElementById("dx").onclick=close; scrim.onclick=close;
document.addEventListener("keydown",e=>{{if(e.key==="Escape")close()}});
const open=h=>{{dbody.innerHTML=h;drawer.classList.add("on");scrim.classList.add("on")}};

// ---------- people
const fill=(id,vals)=>{{const s=document.getElementById(id);vals.forEach(([v,l])=>{{const o=document.createElement("option");o.value=v;o.textContent=l;s.appendChild(o)}})}};
fill("f-cluster",DATA.clusters.map(c=>[c,c]));
fill("f-school",DATA.schools.map(([k,v])=>[k,v]));
fill("f-inst",DATA.insts.map(([k,v])=>[k,v]));
fill("f-x",[...new Set(DATA.nodes.map(n=>n.xdomain).filter(Boolean))].sort().map(x=>[x,x]));
let pSort={{k:"name",dir:1}};
function people(){{
  const c=f("f-cluster"),s=f("f-school"),i=f("f-inst"),x=f("f-x"),co=f("f-co"),q=f("f-q").toLowerCase();
  let rows=DATA.nodes.filter(n=>
    (!c||n.cluster===c)&&(!s||n.orgs.includes(s))&&(!i||n.orgs.includes(i))&&
    (!x||(x==="__any"?!!n.xdomain:n.xdomain===x))&&
    (!co||/founder|co-founder|Director|Chief Scientist/i.test(n.lab))&&
    (!q||(n.name+" "+n.lab+" "+n.title+" "+n.interests).toLowerCase().includes(q)));
  rows.sort((a,b)=>{{const k=pSort.k;return String(a[k]||"").localeCompare(String(b[k]||""))*pSort.dir||a.name.localeCompare(b.name)}});
  document.getElementById("p-count").textContent=rows.length+" of "+DATA.nodes.length+" nodes";
  document.querySelector("#t-people tbody").innerHTML=rows.map((n,ix)=>
    `<tr class="row" data-i="${{DATA.nodes.indexOf(n)}}">
      <td><span class="dot" style="background:var(${{PAL[n.cluster]||"--ink-3"}})"></span><strong>${{esc(n.name)}}</strong><span class="sub">${{esc(n.title.slice(0,74))}}</span></td>
      <td>${{esc(n.cluster)}}</td><td class="dim">${{esc(n.lab)}}</td>
      <td>${{n.xdomain?esc(n.xdomain):'<span class="dim">&mdash;</span>'}}</td>
      <td>${{n.orgs.filter(o=>INS[o]).map(o=>'<span class="chip">'+o+'</span>').join("")||'<span class="dim">none</span>'}}</td>
    </tr>`).join("");
  document.querySelectorAll("#t-people tbody tr").forEach(tr=>tr.onclick=()=>{{
    const n=DATA.nodes[+tr.dataset.i];
    open(`<h3>${{esc(n.name)}}</h3><p class="dt">${{esc(n.title)}}</p><dl>
      <dt>Cluster</dt><dd>${{esc(n.cluster)}}</dd>
      <dt>Lab or role</dt><dd>${{esc(n.lab)}}</dd>
      ${{n.xdomain?`<dt>Cross-domain target</dt><dd>${{esc(n.xdomain)}}</dd>`:""}}
      <dt>Schools and institutes on record</dt><dd>${{n.orgs.map(o=>'<span class="chip">'+esc(SCH[o]||INS[o]||o)+'</span>').join("")}}</dd>
      ${{n.interests?`<dt>Research interests, as written by them on Stanford Profiles</dt><dd>${{esc(n.interests)}}</dd>`:'<dt>Research interests</dt><dd class="dim">Not filled in on their profile.</dd>'}}
      ${{n.methods.length?`<dt>Methods flagged by keyword</dt><dd>${{n.methods.map(m=>'<span class="chip">'+esc(m)+'</span>').join("")}}</dd>`:""}}
      ${{n.domains.length?`<dt>Target fields flagged by keyword</dt><dd>${{n.domains.map(m=>'<span class="chip">'+esc(m)+'</span>').join("")}}</dd>`:""}}
      <dt>Links</dt><dd><a href="${{n.profile}}" target="_blank" rel="noopener">Stanford profile</a>${{n.lab_url?' &middot; <a href="'+n.lab_url+'" target="_blank" rel="noopener">lab or centre page</a>':""}}</dd>
    </dl>`);
  }});
}}
const f=id=>document.getElementById(id).value;
["f-cluster","f-school","f-inst","f-x","f-co"].forEach(id=>document.getElementById(id).onchange=people);
document.getElementById("f-q").oninput=people;
document.getElementById("f-reset").onclick=()=>{{["f-cluster","f-school","f-inst","f-x","f-co","f-q"].forEach(id=>document.getElementById(id).value="");people()}};
document.querySelectorAll("#t-people th.sortable").forEach(th=>th.onclick=()=>{{
  const k=th.dataset.k; pSort.dir=(pSort.k===k)?-pSort.dir:1; pSort.k=k;
  document.querySelectorAll("#t-people th.sortable").forEach(o=>o.removeAttribute("data-dir"));
  th.dataset.dir=pSort.dir>0?"asc":"desc"; people();
}});

// ---------- companies
const CO=DATA.companies;
fill("c-cluster",[...new Set(CO.map(c=>c.cluster))].sort().map(c=>[c,c]));
fill("c-tie",[...new Set(CO.map(c=>c.tie_type))].sort().map(c=>[c,c]));
fill("c-status",[...new Set(CO.map(c=>c.status))].sort().map(c=>[c,c]));
let cSort={{k:"valuation_usd",dir:-1}};
function comps(){{
  const cl=f("c-cluster"),t=f("c-tie"),st=f("c-status"),v=f("c-val"),q=f("c-q").toLowerCase();
  let rows=CO.filter(c=>(!cl||c.cluster===cl)&&(!t||c.tie_type===t)&&(!st||c.status===st)&&
    (!v||(v==="1"?c.valuation_usd!=null:c.valuation_usd>=1e9))&&
    (!q||JSON.stringify(c).toLowerCase().includes(q)));
  rows.sort((a,b)=>{{const k=cSort.k;const A=a[k],B=b[k];
    if(typeof A==="number"||typeof B==="number"){{return ((A==null?-1:A)-(B==null?-1:B))*cSort.dir}}
    return String(A||"").localeCompare(String(B||""))*cSort.dir}});
  const disc=rows.filter(r=>r.valuation_usd).reduce((s,r)=>s+r.valuation_usd,0);
  document.getElementById("c-count").textContent=rows.length+" of "+CO.length+" companies \\u00b7 disclosed valuations sum to "+money(disc);
  document.querySelector("#t-co tbody").innerHTML=rows.map(c=>
    `<tr class="row" data-i="${{CO.indexOf(c)}}">
      <td><strong>${{esc(c.name)}}</strong><span class="sub">${{esc(c.what.slice(0,72))}}</span></td>
      <td>${{esc(c.cluster)}}</td><td><span class="chip">${{esc(c.tie_type)}}</span></td>
      <td class="num">${{money(c.valuation_usd)}}</td><td class="num">${{money(c.total_raised_usd)}}</td>
      <td class="dim">${{esc(c.status)}}</td></tr>`).join("");
  document.querySelectorAll("#t-co tbody tr").forEach(tr=>tr.onclick=()=>{{
    const c=CO[+tr.dataset.i];
    open(`<h3>${{esc(c.name)}}</h3><p class="dt">${{esc(c.what)}}</p><dl>
      <dt>Cluster</dt><dd>${{esc(c.cluster)}}</dd>
      <dt>Stanford tie</dt><dd>${{esc(c.stanford_tie)}} <span class="chip">${{esc(c.tie_type)}}</span></dd>
      <dt>Valuation</dt><dd>${{money(c.valuation_usd)}}${{c.valuation_note?"<br><span class=\\"dim\\">"+esc(c.valuation_note)+"</span>":""}}</dd>
      <dt>Total raised</dt><dd>${{money(c.total_raised_usd)}}${{c.raised_note?"<br><span class=\\"dim\\">"+esc(c.raised_note)+"</span>":""}}</dd>
      <dt>Investors named</dt><dd>${{esc(c.investors)}}</dd>
      <dt>Status</dt><dd>${{esc(c.status)}}</dd>
      <dt>Links</dt><dd><a href="${{c.url}}" target="_blank" rel="noopener">company</a> &middot; <a href="${{c.source}}" target="_blank" rel="noopener">source for these figures</a></dd>
    </dl>`);
  }});
}}
["c-cluster","c-tie","c-status","c-val"].forEach(id=>document.getElementById(id).onchange=comps);
document.getElementById("c-q").oninput=comps;
document.getElementById("c-reset").onclick=()=>{{["c-cluster","c-tie","c-status","c-val","c-q"].forEach(id=>document.getElementById(id).value="");comps()}};
document.querySelectorAll("#t-co th.sortable").forEach(th=>th.onclick=()=>{{
  const k=th.dataset.k; cSort.dir=(cSort.k===k)?-cSort.dir:-1; cSort.k=k;
  document.querySelectorAll("#t-co th.sortable").forEach(o=>o.removeAttribute("data-dir"));
  th.dataset.dir=cSort.dir>0?"asc":"desc"; comps();
}});
people(); comps();
</script>
</body></html>'''

out=os.path.join(SP,"stanford-frontier-map.html")
open(out,"w",encoding="utf-8").write(HTML)
print("wrote",out,len(HTML),"bytes")
print("nodes",len(NODES),"companies",len(CO["companies"]),"clusters",len(CLUS),"xlist",len(xlist))
