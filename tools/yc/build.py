# -*- coding: utf-8 -*-
import json, os, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
SP = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SP, "..", "..", "..", "..", "..", "..")  # unused

C = json.load(open(os.path.join(SP, "companies.json"), encoding="utf-8"))
TR = json.load(open(os.path.join(SP, "trends.json"), encoding="utf-8"))
MK = json.load(open(os.path.join(SP, "market.json"), encoding="utf-8"))
RF = json.load(open(os.path.join(SP, "rfs.json"), encoding="utf-8"))

FRONTIER_FLAGS = {"frontier","physical_ai","nuclear","space_flag","semis","datacenter",
                  "defense_tech","humanoid","world_model","robot_data","capital_intensive"}
# map company name -> cluster id
name2cluster = {}
for cl in MK["clusters"]:
    for n in cl["companies"]:
        name2cluster.setdefault(n, cl["id"])

slim = []
for c in C:
    fr = bool(FRONTIER_FLAGS & set(c["flags"])) and c["status"] == "Active"
    d = c["desc"]
    if not fr and len(d) > 320:
        d = d[:320] + "…"
    slim.append({
        "n": c["name"], "b": c["b"], "B": c["batch"], "o": c["one_liner"], "d": d,
        "t": c["theme"], "f": c["flags"], "s": c["status"], "g": c["geo"],
        "i": c["industry"], "sb": c["sub"], "tm": c["team"], "u": c["url"],
        "w": c["website"], "fr": 1 if fr else 0,
        "cl": name2cluster.get(c["name"], ""),
    })

DATA = {"companies": slim, "trends": TR, "market": MK, "rfs": RF}

CSS = """
:root{
  color-scheme: light;
  --paper:#f6f4ee; --surface:#fcfbf7; --ink:#141310; --ink-2:#52514e; --ink-3:#898781;
  --hairline:#e3e1d7; --baseline:#c9c7bb; --accent:#b3300e; --accent-ink:#8f2609; --wash:#efece2;
  --chart:#2a78d6; --chart-dim:#9ec5f4;
  --c1:#1baf7a; --c2:#4a3aa7; --c3:#eb6834; --c4:#2a78d6; --c5:#eda100; --c6:#8d3bb8;
  --c7:#008300; --c8:#e87ba4; --c9:#8f5f10; --c10:#00a2b8; --c11:#e34948; --c12:#5b6770;
  --shadow: 0 1px 2px rgba(20,19,16,.05), 0 8px 24px -12px rgba(20,19,16,.18);
}
@media (prefers-color-scheme: dark){
  :root{
    color-scheme: dark;
    --paper:#111110; --surface:#1a1a19; --ink:#f4f3ee; --ink-2:#c3c2b7; --ink-3:#898781;
    --hairline:#2c2c2a; --baseline:#383835; --accent:#e05c33; --accent-ink:#ef7c58; --wash:#232320;
    --chart:#3987e5; --chart-dim:#1c5cab;
    --c1:#199e70; --c2:#9085e9; --c3:#d95926; --c4:#3987e5; --c5:#c98500; --c6:#b45ac6;
    --c7:#0f9b0f; --c8:#dd6791; --c9:#a8762b; --c10:#009fb6; --c11:#e66767; --c12:#8b959c;
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
.dek{color:var(--ink-2);max-width:78ch;font-size:14.5px}
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
.sec-h span{color:var(--ink-3);text-transform:none;letter-spacing:0;font-size:10.5px}
h2.sub{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:20px;margin-bottom:6px;letter-spacing:-.01em}
p.note{color:var(--ink-2);max-width:80ch;margin-bottom:14px}
.controls{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
input[type=text],select{font-family:"IBM Plex Sans",sans-serif;font-size:12.5px;padding:7px 9px;
  border:1px solid var(--hairline);background:var(--surface);color:var(--ink);border-radius:6px;outline:none}
input[type=text]{min-width:230px}
input[type=text]:focus,select:focus{border-color:var(--accent)}
.clear-btn{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;
  padding:7px 11px;border:1px solid var(--hairline);background:transparent;color:var(--ink-3);
  border-radius:6px;cursor:pointer}
.clear-btn:hover{color:var(--accent);border-color:var(--accent)}
.count-note{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--ink-3);margin-bottom:9px}
.sheet{border:1px solid var(--hairline);border-radius:8px;overflow:hidden;background:var(--surface)}
table{width:100%;border-collapse:collapse;font-size:13px}
th{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-3);text-align:left;padding:9px 11px;border-bottom:1px solid var(--hairline);
  background:var(--wash);cursor:pointer;white-space:nowrap;position:sticky;top:0;z-index:2}
th:hover{color:var(--ink)}
td{padding:9px 11px;border-bottom:1px solid var(--hairline);vertical-align:top}
tr:last-child td{border-bottom:none}
tbody tr{cursor:pointer}
tbody tr:hover{background:var(--wash)}
.cname{font-weight:600}
.cone{color:var(--ink-2);font-size:12.5px}
.bpill{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.05em;padding:2px 6px;
  border:1px solid var(--baseline);border-radius:4px;color:var(--ink-2);white-space:nowrap}
.dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px;vertical-align:middle}
.tg{font-family:"IBM Plex Mono",monospace;font-size:9.5px;padding:1.5px 5px;border-radius:3px;
  background:var(--wash);border:1px solid var(--hairline);color:var(--ink-3);margin:0 3px 3px 0;
  display:inline-block;white-space:nowrap}
.tg.hot{color:var(--accent);border-color:var(--accent);background:transparent}
.st-a{color:var(--c1)}.st-i{color:var(--ink-3)}.st-q{color:var(--c4)}
.empty{padding:38px;text-align:center;color:var(--ink-3);font-size:13px}
aside#drawer{position:fixed;top:0;right:0;width:min(560px,94vw);height:100vh;background:var(--surface);
  border-left:1px solid var(--hairline);box-shadow:var(--shadow);transform:translateX(101%);
  transition:transform .22s cubic-bezier(.4,0,.2,1);z-index:60;overflow-y:auto}
aside#drawer.on{transform:none}
#scrim{position:fixed;inset:0;background:rgba(20,19,16,.32);opacity:0;pointer-events:none;
  transition:opacity .22s;z-index:50}
#scrim.on{opacity:1;pointer-events:auto}
.dr-inner{padding:26px 28px 60px}
.dr-x{position:absolute;top:16px;right:18px;background:none;border:none;color:var(--ink-3);
  font-size:20px;cursor:pointer;line-height:1}
.dr-x:hover{color:var(--accent)}
.dr-nm{font-family:"Fraunces",Georgia,serif;font-size:24px;font-weight:500;letter-spacing:-.015em;
  margin-bottom:5px;padding-right:30px}
.dr-sub{color:var(--ink-2);font-size:13.5px;margin-bottom:16px}
.d-h{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;
  color:var(--ink-3);margin:20px 0 7px;padding-bottom:5px;border-bottom:1px solid var(--hairline)}
.d-body{font-size:13.5px;color:var(--ink-2);white-space:pre-wrap}
.kv{display:flex;gap:10px;font-size:12.5px;padding:4px 0;border-bottom:1px dotted var(--hairline)}
.kv b{min-width:100px;color:var(--ink-3);font-weight:500;font-family:"IBM Plex Mono",monospace;font-size:10.5px;
  letter-spacing:.06em;text-transform:uppercase;padding-top:2px}
a{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent}
a:hover{border-bottom-color:var(--accent)}
.mkbox{background:var(--wash);border:1px solid var(--hairline);border-left:2px solid var(--accent);
  border-radius:0 6px 6px 0;padding:12px 14px;margin-top:8px;font-size:12.5px;color:var(--ink-2)}
.mkbox .mknum{font-family:"Fraunces",Georgia,serif;font-size:17px;color:var(--ink);display:block;margin-bottom:4px}
.est{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--accent);border:1px solid var(--accent);padding:1px 4px;border-radius:3px;margin-left:6px;
  vertical-align:2px}
.chartwrap{border:1px solid var(--hairline);border-radius:8px;background:var(--surface);padding:16px 18px 10px;margin-bottom:18px;overflow-x:auto}
.legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px;font-size:11.5px;color:var(--ink-2)}
.legend div{display:flex;align-items:center;gap:5px}
.sm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(228px,1fr));gap:1px;background:var(--hairline);
  border:1px solid var(--hairline);border-radius:8px;overflow:hidden}
.sm{background:var(--surface);padding:12px 13px}
.sm-t{font-size:12.5px;font-weight:600;margin-bottom:1px}
.sm-d{font-family:"IBM Plex Mono",monospace;font-size:10px;color:var(--ink-3);margin-bottom:7px}
.sm-d b{color:var(--accent);font-weight:500}
.obs{border:1px solid var(--hairline);border-radius:8px;background:var(--surface);overflow:hidden}
.obs .o{padding:13px 16px;border-bottom:1px solid var(--hairline);display:flex;gap:14px;align-items:flex-start}
.obs .o:last-child{border-bottom:none}
.obs .onum{font-family:"Fraunces",Georgia,serif;font-size:19px;color:var(--accent);min-width:108px;line-height:1.2}
.obs .otx{font-size:13.5px;color:var(--ink-2)}
.obs .otx b{color:var(--ink);font-weight:600}
.rfs-ed{border:1px solid var(--hairline);border-radius:8px;background:var(--surface);margin-bottom:16px;overflow:hidden}
.rfs-hd{padding:14px 17px;border-bottom:1px solid var(--hairline);background:var(--wash);cursor:pointer;
  display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.rfs-hd .rl{font-family:"Fraunces",Georgia,serif;font-size:18px;font-weight:500}
.rfs-hd .rc{font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3)}
.rfs-bd{padding:16px 17px;display:none}
.rfs-bd.on{display:block}
.rfs-fr{font-size:13px;color:var(--ink-2);border-left:2px solid var(--baseline);padding-left:12px;margin-bottom:15px}
.rfs-src{font-family:"IBM Plex Mono",monospace;font-size:10px;color:var(--ink-3);margin-bottom:12px}
.rfs-it{padding:9px 0;border-bottom:1px dotted var(--hairline);display:grid;grid-template-columns:1fr 2fr;gap:14px}
.rfs-it:last-child{border-bottom:none}
.rfs-it .it{font-weight:600;font-size:13px}
.rfs-it .ia{font-family:"IBM Plex Mono",monospace;font-size:10px;color:var(--ink-3);margin-top:2px}
.rfs-it .id{font-size:12.5px;color:var(--ink-2)}
.cl-card{border:1px solid var(--hairline);border-radius:8px;background:var(--surface);margin-bottom:14px;overflow:hidden}
.cl-hd{padding:15px 18px;border-bottom:1px solid var(--hairline);display:flex;justify-content:space-between;
  align-items:baseline;gap:14px;flex-wrap:wrap}
.cl-nm{font-family:"Fraunces",Georgia,serif;font-size:19px;font-weight:500}
.cl-est{font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--accent);text-align:right}
.cl-bd{padding:15px 18px}
.cl-row{display:grid;grid-template-columns:120px 1fr;gap:14px;padding:7px 0;border-bottom:1px dotted var(--hairline);font-size:13px}
.cl-row:last-of-type{border-bottom:none}
.cl-row b{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.11em;text-transform:uppercase;
  color:var(--ink-3);font-weight:500;padding-top:3px}
.cl-row div{color:var(--ink-2)}
.cl-cos{margin-top:13px;padding-top:12px;border-top:1px solid var(--hairline);display:flex;flex-wrap:wrap;gap:5px}
.cco{font-size:12px;padding:3px 9px;border:1px solid var(--hairline);border-radius:999px;background:var(--wash);
  cursor:pointer;color:var(--ink-2)}
.cco:hover{border-color:var(--accent);color:var(--accent)}
.cco i{font-family:"IBM Plex Mono",monospace;font-size:9.5px;font-style:normal;color:var(--ink-3);margin-left:4px}
.warn{background:var(--wash);border:1px solid var(--hairline);border-left:2px solid var(--c5);
  border-radius:0 6px 6px 0;padding:13px 15px;font-size:12.5px;color:var(--ink-2);margin-bottom:20px}
.warn b{color:var(--ink)}
.foot{margin-top:44px;padding-top:16px;border-top:1px solid var(--hairline);
  font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);line-height:1.8}
.bar-row{display:flex;align-items:center;gap:9px;margin-bottom:4px;font-size:12px}
.bar-row .bl{min-width:210px;color:var(--ink-2)}
.bar-row .bt{flex:1;height:13px;background:var(--wash);border-radius:2px;overflow:hidden;position:relative}
.bar-row .bf{height:100%;background:var(--chart)}
.bar-row .bf.b2{background:var(--accent)}
.bar-row .bv{font-family:"IBM Plex Mono",monospace;font-size:10.5px;color:var(--ink-3);min-width:82px;text-align:right}
@media(max-width:760px){
  .wrap{padding:24px 15px 0}h1{font-size:26px}
  .rfs-it,.cl-row{grid-template-columns:1fr}
  .bar-row .bl{min-width:120px}
  table{font-size:12px}
  .hide-sm{display:none}
}
"""

JS = r"""
const D = window.__DATA__;
const CO = D.companies, TR = D.trends, MK = D.market, RF = D.rfs;
const PAL = ['--c1','--c2','--c3','--c4','--c5','--c6','--c7','--c8','--c9','--c10','--c11','--c12'];
const THEMES = Object.keys(TR.themes);
const themeColor = {};
THEMES.forEach((t,i)=>{ themeColor[t] = 'var(' + PAL[i % PAL.length] + ')'; });
const FLAGLABEL = {
  ai:'AI in description', agentic:'Agentic', atoms:'Atoms (physical)', physical_ai:'Physical-AI vocabulary',
  frontier:'Frontier / deep tech', regulated:'Regulated / certification', govt_buyer:'Government buyer',
  capital_intensive:'Capital intensive', open_source:'Open source', datacenter:'Data centers',
  humanoid:'Humanoid', world_model:'World models', robot_data:'Robot data / RL envs',
  defense_tech:'Defense', stablecoin:'Stablecoin', space_flag:'Space', nuclear:'Nuclear / fusion',
  semis:'Semiconductors', biotech:'Biotech', coding_agent:'Coding agents', voice:'Voice AI',
  china_supply:'Reshoring / export controls'
};
const HOT = new Set(['physical_ai','humanoid','world_model','robot_data','frontier','datacenter','defense_tech','nuclear','semis','space_flag']);

// ---------- tabs ----------
document.querySelectorAll('.tab').forEach(b=>{
  b.onclick = ()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
    document.querySelectorAll('.page').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    document.getElementById(b.dataset.pg).classList.add('on');
    window.scrollTo({top:0,behavior:'smooth'});
  };
});

// ---------- drawer ----------
const drawer = document.getElementById('drawer'), scrim = document.getElementById('scrim');
function closeDrawer(){ drawer.classList.remove('on'); scrim.classList.remove('on'); }
scrim.onclick = closeDrawer;
document.getElementById('dr-x').onclick = closeDrawer;
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeDrawer(); });

function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function openCo(c){
  const cl = c.cl ? MK.clusters.find(x=>x.id===c.cl) : null;
  let h = '';
  h += '<div class="dr-nm">'+esc(c.n)+'</div>';
  h += '<div class="dr-sub">'+esc(c.o||'')+'</div>';
  h += '<div class="d-h">Record</div>';
  h += '<div class="kv"><b>Batch</b><div>'+esc(c.B)+'</div></div>';
  h += '<div class="kv"><b>Theme</b><div><span class="dot" style="background:'+(themeColor[c.t]||'var(--ink-3)')+'"></span>'+esc(c.t)+'</div></div>';
  h += '<div class="kv"><b>YC industry</b><div>'+esc(c.sb||c.i||'—')+'</div></div>';
  h += '<div class="kv"><b>Status</b><div>'+esc(c.s)+'</div></div>';
  h += '<div class="kv"><b>Team size</b><div>'+(c.tm==null?'—':c.tm)+'</div></div>';
  h += '<div class="kv"><b>Location</b><div>'+esc(c.g)+'</div></div>';
  h += '<div class="kv"><b>Links</b><div><a href="'+c.u+'" target="_blank" rel="noopener">YC profile</a>'+(c.w?' &nbsp;·&nbsp; <a href="'+esc(c.w)+'" target="_blank" rel="noopener">site</a>':'')+'</div></div>';
  if(c.f && c.f.length){
    h += '<div class="d-h">Keyword flags</div><div>'+c.f.map(f=>'<span class="tg'+(HOT.has(f)?' hot':'')+'">'+esc(FLAGLABEL[f]||f)+'</span>').join('')+'</div>';
  }
  h += '<div class="d-h">What they say they do <span style="text-transform:none;letter-spacing:0">— verbatim from YC</span></div>';
  h += '<div class="d-body">'+esc(c.d||'(no description published)')+'</div>';
  if(cl){
    h += '<div class="d-h">Market cluster<span class="est">estimate</span></div>';
    h += '<div class="mkbox"><span class="mknum">'+esc(cl.name)+'</span>';
    h += '<b>Revenue pool at maturity:</b> '+esc(cl.estimate)+'<br><br>';
    h += '<b>Arithmetic:</b> '+esc(cl.basis)+'<br><br>';
    h += '<b>Equity scale:</b> '+esc(cl.equity)+'<br><br>';
    h += '<b>Observable spend today:</b> '+esc(cl.pool)+'</div>';
  }
  document.getElementById('dr-body').innerHTML = h;
  drawer.classList.add('on'); scrim.classList.add('on');
  drawer.scrollTop = 0;
}

// ---------- companies table ----------
const q = document.getElementById('q'), fB = document.getElementById('f-b'), fT = document.getElementById('f-t'),
      fF = document.getElementById('f-f'), fS = document.getElementById('f-s'), fG = document.getElementById('f-g'),
      fI = document.getElementById('f-i'), fFr = document.getElementById('f-fr');
function opts(sel, arr, label){
  sel.innerHTML = '<option value="">'+label+'</option>' + arr.map(a=>'<option value="'+esc(a)+'">'+esc(a)+'</option>').join('');
}
opts(fB, TR.short.slice().reverse().map((s,i)=>s), 'All batches');
fB.innerHTML = '<option value="">All batches</option>' + TR.batches.map((b,i)=>'<option value="'+TR.short[i]+'">'+TR.short[i]+' — '+b+'</option>').reverse().join('');
opts(fT, THEMES, 'All themes');
opts(fS, ['Active','Inactive','Acquired'], 'Any status');
opts(fG, Array.from(new Set(CO.map(c=>c.g))).sort(), 'Anywhere');
opts(fI, Array.from(new Set(CO.map(c=>c.i).filter(Boolean))).sort(), 'All YC industries');
fF.innerHTML = '<option value="">Any keyword flag</option>' + Object.keys(FLAGLABEL).map(k=>'<option value="'+k+'">'+FLAGLABEL[k]+'</option>').join('');

let sortKey = 'b', sortDir = -1;
document.querySelectorAll('#tbl th').forEach(th=>{
  th.onclick = ()=>{
    const k = th.dataset.k;
    if(sortKey===k) sortDir *= -1; else { sortKey = k; sortDir = (k==='n'||k==='t'||k==='g')?1:-1; }
    render();
  };
});
function filtered(){
  const s = q.value.trim().toLowerCase();
  return CO.filter(c=>{
    if(fB.value && c.b!==fB.value) return false;
    if(fT.value && c.t!==fT.value) return false;
    if(fS.value && c.s!==fS.value) return false;
    if(fG.value && c.g!==fG.value) return false;
    if(fI.value && c.i!==fI.value) return false;
    if(fF.value && !(c.f||[]).includes(fF.value)) return false;
    if(fFr.value==='1' && !c.fr) return false;
    if(s && !(c.n.toLowerCase().includes(s) || (c.o||'').toLowerCase().includes(s) || (c.d||'').toLowerCase().includes(s))) return false;
    return true;
  });
}
const BORD = {}; TR.short.forEach((s,i)=>BORD[s]=i);
function render(){
  const rows = filtered();
  rows.sort((a,b)=>{
    let x,y;
    if(sortKey==='b'){ x=BORD[a.b]; y=BORD[b.b]; }
    else if(sortKey==='tm'){ x=a.tm==null?-1:a.tm; y=b.tm==null?-1:b.tm; }
    else { x=(a[sortKey]||'').toString().toLowerCase(); y=(b[sortKey]||'').toString().toLowerCase(); }
    if(x<y) return -1*sortDir; if(x>y) return 1*sortDir;
    return a.n.localeCompare(b.n);
  });
  document.getElementById('note').textContent =
    rows.length.toLocaleString()+' of '+CO.length.toLocaleString()+' companies'+
    (rows.length?' · click any row for the full record':'');
  const cap = rows.slice(0, 600);
  const tb = document.getElementById('tb');
  tb.innerHTML = cap.map((c,i)=>{
    const st = c.s==='Active'?'st-a':(c.s==='Acquired'?'st-q':'st-i');
    const hot = (c.f||[]).filter(f=>HOT.has(f)).slice(0,3);
    return '<tr data-i="'+CO.indexOf(c)+'">'+
      '<td><span class="bpill">'+c.b+'</span></td>'+
      '<td><div class="cname">'+esc(c.n)+'</div><div class="cone">'+esc(c.o||'')+'</div>'+
        (hot.length?'<div style="margin-top:4px">'+hot.map(f=>'<span class="tg hot">'+esc(FLAGLABEL[f]||f)+'</span>').join('')+'</div>':'')+'</td>'+
      '<td class="hide-sm"><span class="dot" style="background:'+(themeColor[c.t]||'var(--ink-3)')+'"></span>'+esc(c.t)+'</td>'+
      '<td class="hide-sm '+st+'">'+c.s+'</td>'+
      '<td class="hide-sm" style="font-family:IBM Plex Mono,monospace;font-size:11.5px">'+(c.tm==null?'—':c.tm)+'</td>'+
      '<td class="hide-sm" style="font-size:12px;color:var(--ink-2)">'+esc(c.g)+'</td>'+
      '</tr>';
  }).join('');
  document.getElementById('empty').style.display = rows.length?'none':'block';
  document.getElementById('trunc').style.display = rows.length>600?'block':'none';
  document.getElementById('trunc').textContent = rows.length>600 ? ('Showing the first 600 of '+rows.length.toLocaleString()+' matches — narrow the filters to see the rest.') : '';
  tb.querySelectorAll('tr').forEach(tr=>{ tr.onclick = ()=> openCo(CO[+tr.dataset.i]); });
}
[q,fB,fT,fF,fS,fG,fI,fFr].forEach(el=>{ el.oninput = render; el.onchange = render; });
document.getElementById('clear').onclick = ()=>{ [q,fB,fT,fF,fS,fG,fI,fFr].forEach(e=>e.value=''); render(); };

// ---------- stat tiles ----------
(function(){
  const act = CO.filter(c=>c.s==='Active').length;
  const acq = CO.filter(c=>c.s==='Acquired').length;
  const ina = CO.filter(c=>c.s==='Inactive').length;
  document.getElementById('st-n').textContent = CO.length.toLocaleString();
  document.getElementById('st-b').textContent = TR.batches.length;
  document.getElementById('st-a').textContent = (100*act/CO.length).toFixed(0)+'%';
  document.getElementById('st-x').textContent = ina+' / '+acq;
  document.getElementById('st-fr').textContent = CO.filter(c=>c.fr).length;
})();

// ---------- svg helpers ----------
function svgLine(series, opts){
  // series: [{name,color,vals[]}]
  const W = opts.w||1180, H = opts.h||300, PL = 46, PR = 14, PT = 14, PB = 30;
  const xs = TR.short, n = xs.length;
  const maxv = opts.max || Math.max(...series.flatMap(s=>s.vals)) * 1.12;
  const px = i => PL + i*(W-PL-PR)/(n-1);
  const py = v => H-PB - (v/maxv)*(H-PT-PB);
  let g = '';
  for(let t=0;t<=4;t++){
    const v = maxv*t/4, y = py(v);
    g += '<line x1="'+PL+'" x2="'+(W-PR)+'" y1="'+y.toFixed(1)+'" y2="'+y.toFixed(1)+'" style="stroke:var(--hairline);stroke-width:1"/>';
    g += '<text x="'+(PL-7)+'" y="'+(y+3.5).toFixed(1)+'" text-anchor="end" font-family="IBM Plex Mono,monospace" font-size="9.5" style="fill:var(--ink-3)">'+v.toFixed(0)+(opts.pct?'%':'')+'</text>';
  }
  xs.forEach((s,i)=>{
    g += '<text x="'+px(i).toFixed(1)+'" y="'+(H-PB+15)+'" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="9.5" style="fill:var(--ink-3)">'+s+'</text>';
  });
  series.forEach(s=>{
    const d = s.vals.map((v,i)=>(i?'L':'M')+px(i).toFixed(1)+' '+py(v).toFixed(1)).join(' ');
    g += '<path d="'+d+'" style="fill:none;stroke:'+s.color+';stroke-width:2;stroke-linejoin:round"/>';
    s.vals.forEach((v,i)=>{ g += '<circle cx="'+px(i).toFixed(1)+'" cy="'+py(v).toFixed(1)+'" r="2.4" style="fill:'+s.color+'"><title>'+s.name+' · '+xs[i]+' · '+v+(opts.pct?'%':'')+'</title></circle>'; });
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;min-width:820px;height:auto;display:block">'+g+'</svg>';
}
function legend(series){
  return '<div class="legend">'+series.map(s=>'<div><span class="dot" style="background:'+s.color+'"></span>'+esc(s.name)+'</div>').join('')+'</div>';
}
function svgBars(vals, labels, opts){
  const W = opts.w||1180, H = opts.h||150, PL = 46, PR = 14, PT = 12, PB = 28;
  const n = vals.length, maxv = Math.max(...vals)*1.1;
  const bw = (W-PL-PR)/n * .62;
  let g = '';
  const y0 = H-PB;
  g += '<line x1="'+PL+'" x2="'+(W-PR)+'" y1="'+y0+'" y2="'+y0+'" style="stroke:var(--baseline)"/>';
  vals.forEach((v,i)=>{
    const cx = PL + (i+.5)*(W-PL-PR)/n;
    const h = (v/maxv)*(H-PT-PB);
    g += '<rect x="'+(cx-bw/2).toFixed(1)+'" y="'+(y0-h).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="1.5" style="fill:var(--chart)"><title>'+labels[i]+': '+v+'</title></rect>';
    g += '<text x="'+cx.toFixed(1)+'" y="'+(y0-h-4).toFixed(1)+'" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="9.5" style="fill:var(--ink-2)">'+v+'</text>';
    g += '<text x="'+cx.toFixed(1)+'" y="'+(y0+14)+'" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="9.5" style="fill:var(--ink-3)">'+labels[i]+'</text>';
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;min-width:820px;height:auto;display:block">'+g+'</svg>';
}

// ---------- trends page ----------
(function(){
  document.getElementById('ch-size').innerHTML = svgBars(TR.n, TR.short, {h:158});

  const mainThemes = ['Robotics & Physical AI','AI Agents & Automation','Fintech & Stablecoins',
    'Dev Tools & AI Coding','Healthcare Delivery & Admin','Defense & Aerospace','Crypto & Web3'];
  const s1 = mainThemes.map(t=>({name:t, color:themeColor[t], vals:TR.themes[t]}));
  document.getElementById('ch-theme').innerHTML = svgLine(s1,{pct:true,h:320}) + legend(s1);

  const fl = ['ai','agentic','atoms','frontier','physical_ai','datacenter','defense_tech','capital_intensive'];
  const s2 = fl.map((f,i)=>({name:FLAGLABEL[f], color:'var('+PAL[i%PAL.length]+')', vals:TR.flags[f]}));
  document.getElementById('ch-flag').innerHTML = svgLine(s2,{pct:true,h:320}) + legend(s2);

  const s3 = [
    {name:'Median team size', color:'var(--accent)', vals:TR.flags.median_team},
  ];
  document.getElementById('ch-team').innerHTML = svgLine(s3,{h:180});

  const s4 = [
    {name:'Active', color:'var(--c1)', vals:TR.flags.status_Active},
    {name:'Inactive', color:'var(--ink-3)', vals:TR.flags.status_Inactive},
    {name:'Acquired', color:'var(--c4)', vals:TR.flags.status_Acquired},
    {name:'US-based', color:'var(--c5)', vals:TR.flags.us_share},
  ];
  document.getElementById('ch-stat').innerHTML = svgLine(s4,{pct:true,h:250}) + legend(s4);

  // small multiples for every theme
  const sm = THEMES.map(t=>{
    const v = TR.themes[t], a = v.slice(0,4).reduce((x,y)=>x+y,0)/4, b = v.slice(-4).reduce((x,y)=>x+y,0)/4;
    const dir = b>a*1.25 ? 'rising' : (b<a*0.8 ? 'falling' : 'flat');
    return {t, a, b, dir, v, tot:TR.totals[t]||0};
  }).sort((x,y)=>(y.b-y.a)-(x.b-x.a));
  document.getElementById('sm-grid').innerHTML = sm.map(o=>{
    const W=200,H=42, mx=Math.max(...o.v)*1.15||1;
    const d = o.v.map((v,i)=>(i?'L':'M')+(i*W/(o.v.length-1)).toFixed(1)+' '+(H-(v/mx)*H).toFixed(1)).join(' ');
    const col = o.dir==='rising'?'var(--c1)':(o.dir==='falling'?'var(--c11)':'var(--ink-3)');
    return '<div class="sm"><div class="sm-t">'+esc(o.t)+'</div>'+
      '<div class="sm-d">'+o.tot+' cos &nbsp;·&nbsp; W22–S23 avg '+o.a.toFixed(1)+'% → W26–F26 avg <b>'+o.b.toFixed(1)+'%</b></div>'+
      '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:'+H+'px;display:block"><path d="'+d+'" style="fill:none;stroke:'+col+';stroke-width:1.8"/></svg></div>';
  }).join('');
})();

// ---------- RFS page ----------
(function(){
  const el = document.getElementById('rfs-list');
  el.innerHTML = RF.editions.map((e,i)=>{
    const items = e.items.map(it=>
      '<div class="rfs-it"><div><div class="it">'+esc(it.t)+'</div>'+(it.a&&it.a!=='—'?'<div class="ia">'+esc(it.a)+'</div>':'')+'</div>'+
      '<div class="id">'+esc(it.d)+'</div></div>').join('');
    return '<div class="rfs-ed"><div class="rfs-hd" data-i="'+i+'"><div class="rl">'+esc(e.label)+'</div>'+
      '<div class="rc">'+(e.items.length?e.items.length+' requests':'no RFS published')+' &nbsp;·&nbsp; '+esc(e.date)+' &nbsp;·&nbsp; click to open</div></div>'+
      '<div class="rfs-bd'+(i===0?' on':'')+'" id="rfsb'+i+'">'+
      '<div class="rfs-src">Source: '+esc(e.source)+'</div>'+
      '<div class="rfs-fr">'+esc(e.framing)+'</div>'+items+'</div></div>';
  }).join('');
  el.querySelectorAll('.rfs-hd').forEach(h=>{
    h.onclick = ()=> document.getElementById('rfsb'+h.dataset.i).classList.toggle('on');
  });
  document.getElementById('rfs-note').textContent = RF.note;
})();

// ---------- market clusters page ----------
(function(){
  const byId = {}; CO.forEach(c=>{ byId[c.n] = c; });
  document.getElementById('mk-disc').textContent = MK.disclaimer;
  document.getElementById('cl-list').innerHTML = MK.clusters.map(cl=>{
    const cos = cl.companies.map(n=>{
      const c = byId[n];
      return c ? '<span class="cco" data-i="'+CO.indexOf(c)+'">'+esc(n)+'<i>'+c.b+'</i></span>'
               : '<span class="cco" style="opacity:.5">'+esc(n)+'</span>';
    }).join('');
    return '<div class="cl-card"><div class="cl-hd"><div class="cl-nm">'+esc(cl.name)+'</div>'+
      '<div class="cl-est">'+esc(cl.estimate)+'<span class="est">estimate</span></div></div>'+
      '<div class="cl-bd">'+
      '<div class="cl-row"><b>Spend today</b><div>'+esc(cl.pool)+'</div></div>'+
      '<div class="cl-row"><b>Arithmetic</b><div>'+esc(cl.basis)+'</div></div>'+
      '<div class="cl-row"><b>Equity scale</b><div>'+esc(cl.equity)+'</div></div>'+
      '<div class="cl-cos">'+cos+'</div></div></div>';
  }).join('');
  document.querySelectorAll('.cco[data-i]').forEach(s=>{ s.onclick = ()=> openCo(CO[+s.dataset.i]); });
})();

render();
"""


def build_html():
    obs = [
        ("3.0% → 20.1%", "<b>Robotics &amp; Physical AI</b> as a company's primary theme, W22 to Summer 2026. In absolute companies: 10 across the four 2022–23 batches, 91 across the eight 2025–26 batches. Fall 2026 sits at 13.0% on a partial batch of 46."),
        ("0.2% → 6.2%", "Share using <b>physical-AI vocabulary specifically</b> — embodied, VLA, sim-to-real, teleoperation, world model, manipulation, humanoid — comparing the 1,126 companies of W22–S23 against the 672 of W26–F26. It was 2 companies then and 42 now."),
        ("27.6% → 8.1%", "<b>Fintech</b> as primary theme, W22 to Summer 2026. It is still the largest single non-software theme by cumulative count (344 companies) and it is still the thing the batches have most stopped doing."),
        ("15 → 5", "<b>Crypto</b> companies: 15 in W22+S22 alone, 5 across all eleven batches from W24 to F26. Crypto returns as an RFS request in Fall 2026 (\"The Best Time to Build in Crypto\") after two years of near-total absence from the batches themselves."),
        ("6.0% → 26.1%", "<b>Frontier / deep-tech keywords</b> (nuclear, fusion, hypersonic, quantum, humanoid, satellite, wafer, reactor, propulsion, interceptor, laser…) peaking in Summer 2026."),
        ("0.5% → 8.1%", "<b>Data centers</b> as a subject, W22 to Summer 2026 — cooling, power, siting, GPU capacity, robots to build and maintain them. This is the single fastest-moving cross-cutting flag in the dataset."),
        ("1.2% → 6.4%", "<b>Defense</b> keywords, W22 to Summer 2026. Defense &amp; Aerospace as a primary theme went from 1 company across all of 2022–23 to 16 across the 2026 batches."),
        ("0 → 15", "<b>Semiconductor</b> companies by primary theme: none in W22 or S22, 3 across 2022–23, and 9 in the 2026 batches with 20 cumulative. Summer 2026 alone has 7 chip companies (3.0% of the batch)."),
        ("398 → 234", "Batch size, W22 to Summer 2026, while cadence went from two batches a year to four. The smallest batch is Fall 2024 at 94; Winter 2025 through Fall 2025 ran 143–166."),
        ("10 → 2", "<b>Median team size</b>, W22 to Summer 2026. Teams of two or fewer went from 7.8% of W22 to 58.1% of Summer 2026 and 65.2% of the partial Fall 2026 batch."),
        ("11.8% → 50.8%", "<b>Agentic</b> language, W22 to the Spring 2026 peak. It then falls back to 35.0% in Summer 2026 and 32.6% in Fall 2026 — the first sustained decline in the series, coinciding with the robotics rise."),
        ("56% → 92%", "<b>US-based share</b>, W22 to Summer 2026. The batches became markedly more American at the same time as they became more physical, and while reshoring and export-control language appeared (0.1% of 2022–23 companies, 3.4% of Summer 2026)."),
        ("12.1% / 9.3%", "W22's <b>inactive / acquired</b> rates — the only batches old enough to show mortality. W23 is at 13.9% inactive and 12.4% acquired. Everything from Winter 2026 on is 100% active, which reflects age, not quality."),
        ("537", "Companies that are <b>still active and carry at least one frontier flag</b>. 318 of them are in the eight 2025–26 batches. This is the population the Frontier &amp; Markets tab prices."),
    ]
    obs_html = "".join(
        '<div class="o"><div class="onum">%s</div><div class="otx">%s</div></div>' % (a, b) for a, b in obs
    )

    div = [
        ("Summer 2024 RFS asked for robotics + ML, defense, reshoring, space, climate. 20 requests.",
         "The batch that followed (S24) put 3.6% of companies in Robotics, 0.8% in Defense, 0.8% in Space, 1.6% in Climate. RFS led; the batch barely moved."),
        ("Winter 2025 RFS asked for US manufacturing, industrial robots, government software, public safety.",
         "W25 delivered 3.0% Robotics, 4.2% Manufacturing, 2.4% Government. Government &amp; Public Sector hit its all-time high in W25 (2.4%) — the one place the RFS visibly landed inside a single batch."),
        ("Spring 2025 RFS asked for datacenters, inference infrastructure, vertical agents, B2A software for agent customers.",
         "X25 and S25 show agentic language at 41.3% and 45.2%, the highest sustained level in the dataset. The datacenter request took longer: the flag was 2.1% in X25 and 0.0% in S25, reaching 8.1% only in Summer 2026 — roughly four batches of lag."),
        ("Summer 2025 RFS asked for software tools for robots and 'the ChatGPT moment in robotics'.",
         "Robotics primary theme: 4.2% in S25, 6.2% in F25, 7.5% in W26, 9.8% in S26. The robot-data / RL-environment flag went from 0% before 2025 to 9 companies in the 2026 batches. This request tracked."),
        ("Fall 2025 RFS asked for reskilling tradespeople for the AI build-out, video generation, multi-agent infrastructure.",
         "The trades request shows up sideways: instead of vocational schools, the batches produced robots for the trades — data-center maintenance, welding, wire harnesses, container unloading, solar installation. Founders answered the labour-shortage premise with automation rather than training."),
        ("Spring 2026 RFS asked for modern metal mills, AI guidance for physical work, AI for government, stablecoin services.",
         "X26 is the agentic peak (50.8%) and Robotics is 6.7%. Metal and welding companies do appear (Advanced Metal Research, Ultrasonium, ProvenMetal, Nox Metals, Duranium) but they cluster in S25–S26, both before and after the request."),
        ("Summer 2026 RFS asked for electronics in space, inference chips for agents, semiconductor supply chain, industrial capability in space, counter-swarm defense.",
         "Summer 2026 is the batch where the hard-tech flags all peak simultaneously: frontier 26.1%, atoms 45.7%, robotics 9.8%, semis 4.3%, datacenter 8.1%, defense 6.4%, capital-intensive 15.0%. RFS and batch composition agree for the first time in the series."),
        ("Fall 2026 RFS opens with \"AI is moving into the physical world\" and includes a request from the sitting Secretary of the Army.",
         "The partial Fall 2026 batch (46 companies) is 13.0% Robotics — the highest of any batch — with 45.7% carrying the atoms flag. Whether that holds when the full batch publishes is the open question."),
    ]
    div_html = "".join(
        '<div class="o"><div class="onum" style="min-width:340px;font-size:13.5px;font-family:\'IBM Plex Sans\',sans-serif;color:var(--ink)">%s</div><div class="otx">%s</div></div>' % (a, b)
        for a, b in div
    )

    html = """<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>YC Batch Map — __FIRSTB__ to __LASTB__</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>__CSS__</style>
</head><body>
<div class="wrap">
  <div class="kicker">Y Combinator · __NB__ batches · full census</div>
  <h1>YC Batch Map <em>— __FIRSTB__ to __LASTB__</em></h1>
  <p class="dek">Every company YC's public directory lists for the __NB__ batches from __FIRSTB__ to __LASTB__: <b>__NCO__ records</b>, each with YC's own description, industry, status, team size and location, classified into 21 themes and 22 keyword flags. Alongside it, every Requests-for-Startups edition YC has published since it resumed the practice, and a market-sizing pass over the 537 still-active companies carrying frontier flags.</p>
  <div class="meta">Pulled __PULLED__ from ycombinator.com/companies · __LASTB__ was the batch in progress at pull time (__LASTN__ companies published) · Company text is verbatim from YC; classification is keyword-derived and imperfect; market figures are estimates and labelled as such</div>

  <nav class="tabs">
    <button class="tab on" data-pg="page-co">Companies</button>
    <button class="tab" data-pg="page-tr">Trends</button>
    <button class="tab" data-pg="page-rfs">Requests for Startups</button>
    <button class="tab" data-pg="page-mk">Frontier &amp; markets</button>
  </nav>

  <!-- ============ COMPANIES ============ -->
  <div class="page on" id="page-co">
    <div class="band">
      <div class="tile"><div class="v" id="st-n">—</div><div class="l">companies</div></div>
      <div class="tile"><div class="v" id="st-b">—</div><div class="l">batches, W22–F26</div></div>
      <div class="tile"><div class="v" id="st-a">—</div><div class="l">still active</div></div>
      <div class="tile"><div class="v" id="st-x">—</div><div class="l">inactive / acquired</div></div>
      <div class="tile"><div class="v" id="st-fr">—</div><div class="l">active + frontier flag</div></div>
    </div>

    <div class="sec-h">Batch size <span>Companies published per batch. YC moved from two batches a year to four during 2024.</span></div>
    <div class="chartwrap" id="ch-size"></div>

    <div class="sec-h">Filter the census <span>Search runs over name, one-liner and full description</span></div>
    <div class="controls">
      <input type="text" id="q" placeholder="Search 3,009 companies…">
      <select id="f-b"></select>
      <select id="f-t"></select>
      <select id="f-f"></select>
      <select id="f-s"></select>
      <select id="f-g"></select>
      <select id="f-i"></select>
      <select id="f-fr"><option value="">Everything</option><option value="1">Frontier + active only</option></select>
      <button class="clear-btn" id="clear">Reset</button>
    </div>
    <div class="count-note" id="note"></div>
    <div class="sheet">
      <table id="tbl">
        <thead><tr>
          <th data-k="b">Batch</th>
          <th data-k="n">Company</th>
          <th data-k="t" class="hide-sm">Theme</th>
          <th data-k="s" class="hide-sm">Status</th>
          <th data-k="tm" class="hide-sm">Team</th>
          <th data-k="g" class="hide-sm">Location</th>
        </tr></thead>
        <tbody id="tb"></tbody>
      </table>
      <div class="empty" id="empty" style="display:none">No company matches those filters.</div>
    </div>
    <div class="count-note" id="trunc" style="display:none"></div>
  </div>

  <!-- ============ TRENDS ============ -->
  <div class="page" id="page-tr">
    <h2 class="sub">What changed, in the batches' own words</h2>
    <p class="note">Each figure below is a count or a share computed over the full 3,009-company census. Themes are single-label (one theme per company, chosen by weighted keyword score against YC's own industry tags); flags are multi-label, so a company can be both agentic and physical. 502 companies (16.7%) score too low to classify and sit in Other / Unclassified.</p>
    <div class="obs">__OBS__</div>

    <div class="sec-h">Primary theme share by batch <span>Seven largest movers · hover any point for the value</span></div>
    <div class="chartwrap" id="ch-theme"></div>

    <div class="sec-h">Keyword flags by batch <span>Multi-label — a company can carry several</span></div>
    <div class="chartwrap" id="ch-flag"></div>

    <div class="sec-h">Every theme, W22 → F26 <span>Sorted by change between the first four and last four batches</span></div>
    <div class="sm-grid" id="sm-grid"></div>

    <div class="sec-h" style="margin-top:34px">Median team size <span>People per company at the time YC published the record</span></div>
    <div class="chartwrap" id="ch-team"></div>

    <div class="sec-h">Status and geography <span>Mortality is only meaningful for 2022–24; newer batches are too young</span></div>
    <div class="chartwrap" id="ch-stat"></div>
  </div>

  <!-- ============ RFS ============ -->
  <div class="page" id="page-rfs">
    <h2 class="sub">What YC asked for, edition by edition</h2>
    <div class="warn" id="rfs-note"></div>
    <div id="rfs-list"></div>

    <div class="sec-h" style="margin-top:30px">RFS against what the batches actually did</div>
    <p class="note">Left: the request. Right: what the census shows in the batches around it.</p>
    <div class="obs">__DIV__</div>
  </div>

  <!-- ============ MARKETS ============ -->
  <div class="page" id="page-mk">
    <h2 class="sub">The frontier set, priced</h2>
    <p class="note">537 companies are still active and carry at least one frontier flag; 318 of those are in the 2025–26 batches. They fall into 22 clusters. For each cluster: what is verifiably being spent today, what I estimate the revenue pool becomes, the arithmetic behind that estimate, and the equity scale it implies. Click any company chip to open its full record.</p>
    <div class="warn"><b>On the numbers:</b> <span id="mk-disc"></span></div>
    <div id="cl-list"></div>
  </div>

  <div class="foot">
    Sources — Companies: ycombinator.com/companies public directory, all 15 batches, retrieved 10 Sep 2026 (3,009 records).<br>
    RFS Fall 2026: ycombinator.com/rfs, primary. Earlier editions: secondary sources named per edition; the Wayback Machine was unreachable from this machine, and YC's site serves only the current edition in HTML.<br>
    Classification: weighted keyword scoring over YC's one-liner, tags, description and industry labels. Not hand-verified per company. Expect false positives in the flags.<br>
    Market figures: my own estimates with the arithmetic shown. Not sourced market research.
  </div>
</div>

<div id="scrim"></div>
<aside id="drawer"><button class="dr-x" id="dr-x">&times;</button><div class="dr-inner" id="dr-body"></div></aside>

<script>window.__DATA__ = /*PAYLOAD*/0;</script>
<script>__JS__</script>
</body></html>"""

    import datetime
    html = html.replace("__FIRSTB__", TR["batches"][0])
    html = html.replace("__LASTB__", TR["batches"][-1])
    html = html.replace("__NB__", str(len(TR["batches"])))
    html = html.replace("__NCO__", "{:,}".format(len(slim)))
    html = html.replace("__LASTN__", str(TR["n"][-1]))
    html = html.replace("__PULLED__", os.environ.get("YC_PULL_DATE",
        datetime.date.today().strftime("%d %B %Y")))
    html = html.replace("__CSS__", CSS)
    html = html.replace("__OBS__", obs_html)
    html = html.replace("__DIV__", div_html)
    html = html.replace("/*PAYLOAD*/0", json.dumps(DATA, ensure_ascii=False, separators=(",", ":")).replace("</", "<\/"))
    html = html.replace("__JS__", JS)
    return html


# Writes straight into the portal's reports/ directory, which is where the
# library card points. Override with YC_MAP_OUT if you want it somewhere else.
default_out = os.path.normpath(os.path.join(SP, "..", "..", "reports", "yc-batch-map.html"))
target = os.environ.get("YC_MAP_OUT", default_out)
h = build_html()
io.open(target, "w", encoding="utf-8").write(h)
print("wrote", target, len(h), "bytes")
print("REMINDER: the observation and RFS-divergence prose in build_html() is hand-written")
print("for the 2026-09-10 pull. Re-check every figure in it against this run's numbers.")
