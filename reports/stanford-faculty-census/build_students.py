import json,os,sys,io
from collections import Counter
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
SP=os.path.dirname(os.path.abspath(__file__))
D=json.load(open(os.path.join(SP,"students.json"),encoding="utf-8"))
CO=D["companies"]; EP=D["entry_points"]; ST=D["context_stats"]

def esc(s): return (s or "").replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
def money(v):
    if v is None: return "&mdash;"
    if v>=1e9: return "$%.2fB"%(v/1e9)
    if v>=1e6: return "$%.0fM"%(v/1e6)
    return "$%dK"%(v/1e3)

TIERS=sorted({c["tier"] for c in CO}); DOMS=sorted({c["domain"] for c in CO})
PAL={"PhD":"--c-reasoning","PhD / postdoc":"--c-reasoning","Dropout (PhD)":"--c-bio",
 "Dropout (undergrad)":"--c-accent2","Undergrad":"--c-embodied","Undergrad + master's":"--c-frontier",
 "GSB (MBA)":"--c-world","Student researchers":"--c-physics","PhD (co-founder)":"--c-reasoning",
 "PhD / lab":"--c-materials"}

disclosed=[c for c in CO if c["valuation_usd"]]
tot_val=sum(c["valuation_usd"] for c in disclosed)
tot_raised=sum(c["raised_usd"] or 0 for c in CO)
unicorns=[c for c in CO if (c["valuation_usd"] or 0)>=1e9]

tiles=[
 (str(len(CO)),"companies traced","Founded 2021&ndash;2026 with at least one Stanford student, PhD or postdoc founder, excluding anyone with more than about five years of prior industry."),
 (money(tot_raised),"disclosed capital raised","Sum of the disclosed round or total figures across all %d companies."%len(CO)),
 (str(len(unicorns)),"at $1B or above","%s. Six of the seven were founded in the last three years."%", ".join(c["name"] for c in unicorns)),
 (money(tot_val),"sum of disclosed valuations","Across the %d companies with a public valuation. The other %d have not disclosed one."%(len(disclosed),len(CO)-len(disclosed))),
]
tile_html="".join('<div class="tile"><div class="tile-n">%s</div><div class="tile-l">%s</div><div class="tile-d">%s</div></div>'%t for t in tiles)
stat_html="".join('<div class="tile"><div class="tile-n">%s</div><div class="tile-l">%s</div><div class="tile-d">%s</div></div>'%(esc(s["stat"]),esc(s["label"]),esc(s["note"])) for s in ST)

ep_html="".join('''<article class="ep">
 <h3><a href="%s" target="_blank" rel="noopener">%s</a></h3>
 <div class="ep-who">%s</div><p>%s</p></article>'''%(e["url"],esc(e["name"]),esc(e["who"]),esc(e["note"])) for e in EP)

tier_counts="".join("<tr><th scope='row'>%s</th><td class='num'>%d</td><td class='num'>%s</td></tr>"%(
  esc(t),sum(1 for c in CO if c["tier"]==t),
  money(sum(c["raised_usd"] or 0 for c in CO if c["tier"]==t))) for t in TIERS)
dom_counts="".join("<tr><th scope='row'>%s</th><td class='num'>%d</td><td class='num'>%s</td></tr>"%(
  esc(d),sum(1 for c in CO if c["domain"]==d),
  money(sum(c["raised_usd"] or 0 for c in CO if c["domain"]==d))) for d in DOMS)

HTML=f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>What the Stanford Students Are Building &mdash; 2021 to 2026</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{{
  color-scheme: light;
  --paper:#f6f4ee; --surface:#fcfbf7; --ink:#141310; --ink-2:#52514e; --ink-3:#898781;
  --hairline:#e3e1d7; --baseline:#c9c7bb; --accent:#b3300e; --accent-ink:#8f2609; --wash:#efece2;
  --chart:#2a78d6;
  --c-embodied:#1baf7a; --c-reasoning:#4a3aa7; --c-bio:#eb6834; --c-frontier:#2a78d6;
  --c-world:#eda100; --c-agents:#8d3bb8; --c-materials:#008300; --c-arch:#e87ba4;
  --c-semis:#8f5f10; --c-physics:#00a2b8; --c-accent2:#b3300e;
}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 "IBM Plex Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}}
.wrap{{max-width:1280px;margin:0 auto;padding:0 28px 80px}}
header.top{{border-bottom:1px solid var(--baseline);padding:44px 0 22px}}
h1{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:40px;line-height:1.1;margin:0 0 10px;letter-spacing:-.01em}}
.dek{{font-size:17px;color:var(--ink-2);max-width:76ch;margin:0 0 14px}}
.stamp{{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}}
nav.tabs{{display:flex;border-bottom:1px solid var(--baseline);margin:26px 0 30px;flex-wrap:wrap}}
nav.tabs button{{appearance:none;background:none;border:0;border-bottom:2px solid transparent;padding:12px 16px;font:500 14px/1 "IBM Plex Sans";color:var(--ink-2);cursor:pointer}}
nav.tabs button:hover{{color:var(--ink)}}
nav.tabs button[aria-selected=true]{{color:var(--accent-ink);border-bottom-color:var(--accent)}}
section.tab{{display:none}} section.tab.on{{display:block}}
h2{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:25px;margin:34px 0 6px}}
h2:first-child{{margin-top:0}}
.lede{{color:var(--ink-2);max-width:84ch;margin:0 0 20px}}
.tiles{{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline);margin:0 0 34px}}
.tiles.three{{grid-template-columns:repeat(3,1fr)}}
.tile{{background:var(--surface);padding:18px}}
.tile-n{{font-family:Fraunces,Georgia,serif;font-size:27px;font-weight:500;line-height:1.05}}
.tile-l{{font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--accent-ink);margin:6px 0 7px;font-weight:500}}
.tile-d{{font-size:12.5px;color:var(--ink-3);line-height:1.45}}
table{{width:100%;border-collapse:collapse;background:var(--surface);font-size:13.5px}}
th,td{{text-align:left;padding:9px 10px;border-bottom:1px solid var(--hairline);vertical-align:top}}
thead th{{font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3);font-weight:500;border-bottom:1px solid var(--baseline);background:var(--wash)}}
td.num,th.num{{text-align:right;font-family:"IBM Plex Mono",monospace;font-size:12.5px}}
td.dim{{color:var(--ink-3);font-size:12.5px}}
tbody tr:hover{{background:var(--wash)}}
.sub{{display:block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);text-transform:none;letter-spacing:0;margin-top:2px}}
a{{color:var(--accent-ink);text-decoration:none;border-bottom:1px solid rgba(179,48,14,.28)}}
a:hover{{border-bottom-color:var(--accent)}}
.filters{{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;padding:16px;background:var(--surface);border:1px solid var(--hairline);margin-bottom:16px}}
.filters label{{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin-bottom:4px}}
.filters select,.filters input{{font:14px "IBM Plex Sans";padding:7px 9px;background:var(--paper);border:1px solid var(--baseline);color:var(--ink);min-width:170px}}
button.btn{{font:500 13px "IBM Plex Sans";padding:8px 13px;background:var(--paper);border:1px solid var(--baseline);cursor:pointer;color:var(--ink-2);margin-left:auto}}
button.btn:hover{{border-color:var(--accent);color:var(--accent-ink)}}
.count{{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--ink-3);margin:0 0 8px}}
th.sortable{{cursor:pointer;user-select:none}} th.sortable:hover{{color:var(--ink)}}
th.sortable[data-dir=asc]::after{{content:"\\2191";margin-left:5px}}
th.sortable[data-dir=desc]::after{{content:"\\2193";margin-left:5px}}
.chip{{display:inline-block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;padding:2px 6px;border:1px solid var(--hairline);background:var(--paper);color:var(--ink-2);margin:0 3px 3px 0;white-space:nowrap}}
.dot{{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;vertical-align:-1px}}
tr.row{{cursor:pointer}}
.drawer{{position:fixed;top:0;right:0;width:min(580px,94vw);height:100%;background:var(--surface);border-left:1px solid var(--baseline);box-shadow:-14px 0 44px rgba(20,19,16,.13);transform:translateX(102%);transition:transform .22s ease;z-index:60;overflow-y:auto;padding:26px 28px 60px}}
.drawer.on{{transform:none}}
.drawer h3{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:24px;margin:0 0 4px}}
.drawer .dt{{font-size:13.5px;color:var(--ink-2);margin:0 0 18px}}
.drawer dt{{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3);margin:16px 0 3px}}
.drawer dd{{margin:0;font-size:14px}}
.drawer .x{{position:absolute;top:16px;right:20px;font-size:22px;color:var(--ink-3);cursor:pointer;line-height:1;background:none;border:0}}
.scrim{{position:fixed;inset:0;background:rgba(20,19,16,.16);opacity:0;pointer-events:none;transition:opacity .22s;z-index:55}}
.scrim.on{{opacity:1;pointer-events:auto}}
.eps{{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hairline);border:1px solid var(--hairline)}}
.ep{{background:var(--surface);padding:18px 20px}}
.ep h3{{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:19px;margin:0 0 4px}}
.ep-who{{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--accent-ink);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}}
.ep p{{margin:0;font-size:13.5px;color:var(--ink-2)}}
.note{{background:var(--wash);border:1px solid var(--hairline);padding:16px 18px;font-size:13.5px;color:var(--ink-2);margin:0 0 22px}}
.two{{display:grid;grid-template-columns:1fr 1fr;gap:28px}}
footer{{border-top:1px solid var(--baseline);margin-top:50px;padding:20px 0;font-size:12px;color:var(--ink-3)}}
@media (max-width:1080px){{.tiles,.tiles.three{{grid-template-columns:repeat(2,1fr)}}}}
@media (max-width:860px){{.two,.eps{{grid-template-columns:1fr}} h1{{font-size:30px}}}}
</style></head><body>
<div class="wrap">
<header class="top">
  <h1>What the Stanford Students Are Building</h1>
  <p class="dek">Companies founded between 2021 and 2026 where at least one founder was a Stanford undergrad, master's student, PhD or postdoc at the time &mdash; or walked out of the degree to start it. Career-changers with more than about five years of prior industry are excluded, so this is the student-native layer only. Each row carries the backer that actually wrote the cheque.</p>
  <p class="stamp">Researched 11 September 2026 &middot; {len(CO)} companies &middot; {len(EP)} entry points &middot; every figure sourced to a named outlet</p>
</header>
<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true" data-t="companies">The companies</button>
  <button role="tab" aria-selected="false" data-t="patterns">Patterns</button>
  <button role="tab" aria-selected="false" data-t="entry">How to get in</button>
  <button role="tab" aria-selected="false" data-t="method">Method &amp; gaps</button>
</nav>

<section class="tab on" id="tab-companies">
  <div class="tiles">{tile_html}</div>
  <div class="filters">
    <div><label for="f-tier">Founder stage</label><select id="f-tier"><option value="">All stages</option></select></div>
    <div><label for="f-dom">Domain</label><select id="f-dom"><option value="">All domains</option></select></div>
    <div><label for="f-back">Backer</label><select id="f-back"><option value="">Any backer</option></select></div>
    <div><label for="f-q">Search</label><input id="f-q" type="search" placeholder="company, founder, lab"></div>
    <button class="btn" id="f-reset">Reset</button>
  </div>
  <p class="count" id="p-count"></p>
  <table id="t-co">
    <thead><tr>
      <th class="sortable" data-k="name">Company</th>
      <th class="sortable" data-k="tier">Founder stage</th>
      <th class="sortable" data-k="domain">Domain</th>
      <th class="sortable num" data-k="valuation_usd">Valuation</th>
      <th class="sortable num" data-k="raised_usd">Raised</th>
      <th>Backers</th>
    </tr></thead><tbody></tbody>
  </table>
  <p class="note">Click any row for the founders, what they actually built, and the source. Valuations are reported figures for private companies, not audited.</p>
</section>

<section class="tab" id="tab-patterns">
  <h2>Context you need to read these numbers against</h2>
  <div class="tiles three">{stat_html}</div>
  <h2>By founder stage</h2>
  <p class="lede">The interesting split is not undergrad versus PhD. It is whether the company monetises a <em>method the founder authored</em> or a <em>product they shipped fast</em>. PhD-tier companies raise an order of magnitude more per company, because the asset is a named research result.</p>
  <div class="two">
    <div><table><thead><tr><th>Founder stage</th><th class="num">Companies</th><th class="num">Capital</th></tr></thead><tbody>{tier_counts}</tbody></table></div>
    <div><table><thead><tr><th>Domain</th><th class="num">Companies</th><th class="num">Capital</th></tr></thead><tbody>{dom_counts}</tbody></table></div>
  </div>
  <h2>Three observations</h2>
  <p class="note"><strong>1. The Ré pipeline is a machine, and it runs on PhDs.</strong> Cartesia, Engram, Numbers Station, Rox and Radical Numerics all have a Chris Ré lab member as a founder, and Ré himself as co-founder on four of them. Cartesia's four founders were all his PhD students and founded the day they graduated. No master's student appears anywhere in that pipeline.</p>
  <p class="note"><strong>2. The undergrad route is voice, video and analytics &mdash; not research.</strong> Willow, Human Behavior, Golpo, Known, Phia, Verita, TensorPool. Cheque sizes $0.5M&ndash;$10M, almost all YC or a named angel network. The exception that proves the shape: Wispr Flow, founded straight out of Stanford undergrad in 2021, is now reported at $2B &mdash; it took five years and a full pivot.</p>
  <p class="note"><strong>3. Dorm-floor and hacker-house proximity keeps showing up as the founding mechanism.</strong> TensorPool's three founders met on the same freshman dorm floor. Human Behavior's team met at a hacker house one founder started after leaving. Phia was two roommates. Vori's three met at Stanford. This is the part that is not replicable from off campus, and it is the reason to be physically present in those rooms.</p>
</section>

<section class="tab" id="tab-entry">
  <h2>Where these companies actually came from</h2>
  <p class="lede">Ordered roughly by how low the barrier is. The first one has <em>no</em> selection at all &mdash; admission is guaranteed to any Stanford student who fills in the form &mdash; and it exists specifically to help you find co-founders.</p>
  <div class="eps">{ep_html}</div>
</section>

<section class="tab" id="tab-method">
  <h2>How this was built, and what is missing</h2>
  <div class="two">
    <div>
      <h2 style="font-size:19px">Inclusion rule</h2>
      <p class="lede">A company is in if at least one founder was a Stanford undergrad, master's student, PhD candidate or postdoc at founding, or left that programme to found it. Founders with more than roughly five years of prior industry are excluded per the brief &mdash; which is why World Labs (Fei-Fei Li, faculty), Physical Intelligence (faculty plus DeepMind veterans), SambaNova, Together AI and Snorkel are <em>not</em> here despite being Stanford companies. They belong to the faculty-and-operator layer, not the student layer.</p>
      <h2 style="font-size:19px">Verified out</h2>
      <p class="lede">Four companies that look Stanford-student on first pass and are not, checked and discarded: <strong>Noble Machines</strong> (Apple, Caltech and NASA veterans &mdash; the founder is Wenlong Ma, not Stanford's Wenlong Huang), <strong>Density AI</strong> (ex-Tesla Dojo team), <strong>Deep Cogito</strong> (IIT Delhi, ex-Google Search), <strong>Goodfire</strong> (Yale, NYU, DeepMind). <strong>Mercor</strong>, often filed under Stanford, is Georgetown and Harvard dropouts.</p>
    </div>
    <div>
      <h2 style="font-size:19px">Known gaps</h2>
      <p class="lede"><strong>This is a floor, not a census.</strong> There is no registry of student-founded companies. Stanford does not track why students take a leave of absence, so nobody &mdash; including Stanford &mdash; knows the real number. One dropout founder put his own count of classmates who left for AI companies at about a dozen; a Stanford economics professor separately said he knew of at least five in his own classes.<br><br>
      <strong>Undisclosed rounds.</strong> Candor, Revere Technologies, SoranoAI and 10x Science have no public funding figures. Known and Golpo disclose amounts but not investors. Axiom Math's investor names were not in any source I found.<br><br>
      <strong>Under-covered by construction.</strong> Press coverage skews to consumer AI and to founders who make good copy. Hardware, bio and defence student companies are almost certainly undercounted here: SPARK and the Biotechnology Group run real pipelines whose outputs rarely get a TechCrunch post. Treat the domain mix in the Patterns tab as a map of <em>media attention</em> as much as of activity.<br><br>
      <strong>One unresolved name.</strong> The 2026 Thiel class includes a Stanford CS student, ex-OpenAI on agent memory and Stanford AI Lab researcher, now COO of Kinetic &mdash; reported only by surname. I could not confirm the full name or the company.</p>
    </div>
  </div>
  <p class="note">{esc(D["provenance"])}</p>
</section>

<footer>What the Stanford Students Are Building &middot; compiled 11 September 2026 &middot; companion to the Stanford Frontier Map &middot; private valuations are reported, not audited</footer>
</div>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer"><button class="x" id="dx" aria-label="Close">&times;</button><div id="dbody"></div></aside>
<script>
const CO={json.dumps(CO,ensure_ascii=False)};
const PAL={json.dumps(PAL)};
const money=v=>v==null?"\\u2014":(v>=1e9?"$"+(v/1e9).toFixed(2)+"B":v>=1e6?"$"+Math.round(v/1e6)+"M":"$"+Math.round(v/1e3)+"K");
const esc=s=>(s==null?"":String(s)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const BACKERS=["Y Combinator","Sequoia","a16z","Andreessen","Kleiner Perkins","Lightspeed","Index","General Catalyst","Benchmark","Lux","NVIDIA","Khosla","GV","Greenoaks","NEA","8VC","Pear","South Park Commons","DCVC","Menlo","Madrona","Emergence","Neo","Mayfield","Afore","Felicis","Paul Graham"];

document.querySelectorAll("nav.tabs button").forEach(b=>b.onclick=()=>{{
  document.querySelectorAll("nav.tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));
  document.querySelectorAll("section.tab").forEach(s=>s.classList.toggle("on",s.id==="tab-"+b.dataset.t));
  window.scrollTo({{top:0,behavior:"instant"}});
}});
const drawer=document.getElementById("drawer"),scrim=document.getElementById("scrim"),dbody=document.getElementById("dbody");
const close=()=>{{drawer.classList.remove("on");scrim.classList.remove("on")}};
document.getElementById("dx").onclick=close; scrim.onclick=close;
document.addEventListener("keydown",e=>{{if(e.key==="Escape")close()}});

const fill=(id,vals)=>{{const s=document.getElementById(id);vals.forEach(v=>{{const o=document.createElement("option");o.value=v;o.textContent=v;s.appendChild(o)}})}};
fill("f-tier",[...new Set(CO.map(c=>c.tier))].sort());
fill("f-dom",[...new Set(CO.map(c=>c.domain))].sort());
fill("f-back",BACKERS.filter(b=>CO.some(c=>(c.backers||"").includes(b))));
const f=id=>document.getElementById(id).value;
let S={{k:"raised_usd",dir:-1}};
function render(){{
  const t=f("f-tier"),d=f("f-dom"),b=f("f-back"),q=f("f-q").toLowerCase();
  let rows=CO.filter(c=>(!t||c.tier===t)&&(!d||c.domain===d)&&(!b||(c.backers||"").includes(b))
    &&(!q||JSON.stringify(c).toLowerCase().includes(q)));
  rows.sort((a,z)=>{{const k=S.k,A=a[k],B=z[k];
    if(k==="valuation_usd"||k==="raised_usd") return ((A==null?-1:A)-(B==null?-1:B))*S.dir;
    return String(A||"").localeCompare(String(B||""))*S.dir}});
  const cap=rows.reduce((s,r)=>s+(r.raised_usd||0),0);
  document.getElementById("p-count").textContent=rows.length+" of "+CO.length+" companies \\u00b7 "+money(cap)+" raised between them";
  document.querySelector("#t-co tbody").innerHTML=rows.map(c=>
    `<tr class="row" data-i="${{CO.indexOf(c)}}">
      <td><span class="dot" style="background:var(${{PAL[c.tier]||"--ink-3"}})"></span><strong>${{esc(c.name)}}</strong><span class="sub">${{esc(c.what.slice(0,68))}}</span></td>
      <td>${{esc(c.tier)}}<span class="sub">founded ${{esc(c.founded)}}</span></td>
      <td>${{esc(c.domain)}}</td>
      <td class="num">${{money(c.valuation_usd)}}</td>
      <td class="num">${{money(c.raised_usd)}}</td>
      <td class="dim">${{esc((c.backers||"").slice(0,56))}}${{(c.backers||"").length>56?"&hellip;":""}}</td>
    </tr>`).join("");
  document.querySelectorAll("#t-co tbody tr").forEach(tr=>tr.onclick=()=>{{
    const c=CO[+tr.dataset.i];
    dbody.innerHTML=`<h3>${{esc(c.name)}}</h3><p class="dt">${{esc(c.what)}}</p><dl>
      <dt>Founders</dt><dd>${{esc(c.founders)}}</dd>
      <dt>Founder stage</dt><dd><span class="chip">${{esc(c.tier)}}</span> <span class="chip">founded ${{esc(c.founded)}}</span> <span class="chip">${{esc(c.domain)}}</span></dd>
      <dt>Round</dt><dd>${{esc(c.round)}}</dd>
      <dt>Valuation</dt><dd>${{money(c.valuation_usd)}}</dd>
      <dt>Backers</dt><dd>${{esc(c.backers)}}</dd>
      <dt>Source</dt><dd><a href="${{c.url}}" target="_blank" rel="noopener">${{esc(c.url.replace(/^https?:\\/\\//,"").split("/")[0])}}</a></dd></dl>`;
    drawer.classList.add("on");scrim.classList.add("on");
  }});
}}
["f-tier","f-dom","f-back"].forEach(id=>document.getElementById(id).onchange=render);
document.getElementById("f-q").oninput=render;
document.getElementById("f-reset").onclick=()=>{{["f-tier","f-dom","f-back","f-q"].forEach(id=>document.getElementById(id).value="");render()}};
document.querySelectorAll("#t-co th.sortable").forEach(th=>th.onclick=()=>{{
  const k=th.dataset.k; S.dir=(S.k===k)?-S.dir:-1; S.k=k;
  document.querySelectorAll("#t-co th.sortable").forEach(o=>o.removeAttribute("data-dir"));
  th.dataset.dir=S.dir>0?"asc":"desc"; render();
}});
render();
</script>
</body></html>'''
out=os.path.join(SP,"stanford-students-building.html")
open(out,"w",encoding="utf-8").write(HTML)
print("wrote",out,len(HTML),"bytes; companies",len(CO),"entry points",len(EP))
print("total raised: ",money(tot_raised),"unicorns:",len(unicorns))
