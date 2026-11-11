const ARTIFACT_URL = "";   /* filled in after publishing; used by copies of the page that run outside Claude */
const ORDER = Object.keys(PAPERS).sort((a,b)=>PAPERS[a].n-PAPERS[b].n);
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const strip = h => { const d=document.createElement("div"); d.innerHTML=h; return (d.textContent||"").replace(/\s+\n/g,"\n").trim(); };
function h(tag, attrs={}, html){ const e=document.createElement(tag); for(const k in attrs){ if(k==="class") e.className=attrs[k]; else if(k.startsWith("on")) e.addEventListener(k.slice(2),attrs[k]); else e.setAttribute(k,attrs[k]); } if(html!==undefined) e.innerHTML=html; return e; }

/* ---------------- state + storage ---------------- */
const state = { mod:1, focus:null, tabs:{}, status:{}, notes:{}, answers:{}, grades:{} };
const chats = {};           // key -> [{role,content}]
let db=null, uid=null, saveTimer=null;
const LS="nwna-v1";
function lsGet(k){ try{ return JSON.parse(localStorage.getItem(LS+":"+k)||"null"); }catch(e){ return null; } }
function lsSet(k,v){ try{ localStorage.setItem(LS+":"+k, JSON.stringify(v)); }catch(e){} }
function snapshot(){ return {mod:state.mod, tabs:state.tabs, status:state.status, notes:state.notes, answers:state.answers, grades:state.grades}; }
function applySaved(s){ if(!s) return; for(const k of ["tabs","status","notes","answers","grades"]) if(s[k]&&typeof s[k]==="object") state[k]=Object.assign({}, s[k]); if(s.mod) state.mod=s.mod; }
function scheduleSave(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(async()=>{
    const s=snapshot(); lsSet("state",s);
    if(db&&uid){ try{ await db.doc(`data/users/${uid}/progress`).set(s); flashSaved(); }catch(e){ /* keep local copy */ } } else flashSaved();
  },700);
}
async function saveChat(key){
  const turns=(chats[key]||[]).slice(-24); lsSet("chat:"+key,turns);
  if(db&&uid){ try{ await db.doc(`data/users/${uid}/chat_${key}`).set({turns, at:Date.now()}); }catch(e){} }
}
async function loadChat(key){
  if(chats[key]) return chats[key];
  let t=null;
  if(db&&uid){ try{ const s=await db.doc(`data/users/${uid}/chat_${key}`).get(); if(s.exists) t=s.data().turns; }catch(e){} }
  if(!t) t=lsGet("chat:"+key);
  chats[key]=Array.isArray(t)?t.filter(x=>x&&x.role&&x.content):[];
  return chats[key];
}
function flashSaved(){ document.querySelectorAll(".saved").forEach(e=>{ e.textContent="Saved"; setTimeout(()=>{e.textContent="";},1400); }); }

/* ---------------- story, map, table ---------------- */
function renderActs(){
  $("#acts").innerHTML = ACTS.map(a=>`<div class="act"><div class="yr">${a[0]}</div><div><h4>${esc(a[1])}</h4><p>${esc(a[2])}</p></div></div>`).join("");
}
function renderMap(){
  const W=920,H=360,L=150,R=150; const lanes=Object.keys(THREADS);
  const yOf=t=>40+lanes.indexOf(t)*48;
  const xYear=y=>{ const a=L, b=W-R; const knee=2016, kx=a+(b-a)*0.16; return y<=knee ? a+(kx-a)*(y-2003)/(knee-2003) : kx+(b-kx)*(y-knee)/(2026.4-knee); };
  const off={rag:0.45, codex:0, instruct:0.35, gemrob:0.55}; const LBL={gpt3:0, chinchilla:0, rag:1, flash:0, llama3:1, codex:1, instruct:0, r1:0, rt2:0, vjepa2:0, gemrob:1};
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Six research threads converging on agents that act"><title>Convergence map</title>`;
  [2003,2010,2017,2020,2023,2026].forEach(y=>{ const x=xYear(y); s+=`<line x1="${x}" y1="22" x2="${x}" y2="${H-34}" stroke="var(--rule)" stroke-dasharray="2 4"/><text x="${x}" y="${H-16}" text-anchor="middle" font-size="11" fill="var(--ink3)">${y}</text>`; });
  const cx=W-48, cy=yOf(lanes[2])+24;
  lanes.forEach(t=>{
    const y=yOf(t), ps=ORDER.filter(id=>PAPERS[id].thread===t);
    const x0=ps.length?xYear(PAPERS[ps[0]].year+(off[ps[0]]||0)):L;
    const xe=ps.length?xYear(PAPERS[ps[ps.length-1]].year+(off[ps[ps.length-1]]||0)):L;
    s+=`<text x="${L-14}" y="${y+4}" text-anchor="end" font-size="11.5" fill="${THREADS[t].color}">${esc(THREADS[t].name.split(",")[0].split(" & ")[0])}</text>`;
    s+=`<line x1="${x0}" y1="${y}" x2="${xe}" y2="${y}" stroke="${THREADS[t].color}" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>`;
    s+=`<path d="M ${xe} ${y} C ${xe+60} ${y}, ${cx-70} ${cy}, ${cx-16} ${cy}" fill="none" stroke="${THREADS[t].color}" stroke-width="2" opacity=".45"/>`;
    ps.forEach((id,i)=>{ const p=PAPERS[id], x=xYear(p.year+(off[id]||0)); const done=state.status[id]==="done";
      s+=`<g class="node" tabindex="0" role="button" data-id="${id}" aria-label="${esc(p.title)}"><circle cx="${x}" cy="${y}" r="8" fill="${done?THREADS[t].color:"var(--surface)"}" stroke="${THREADS[t].color}" stroke-width="2"/><text x="${x}" y="${y+((LBL[id]??(i%2))?22:-13)}" text-anchor="middle" font-size="10.5" fill="var(--ink2)">${p.n}. ${esc(p.short)}</text></g>`; });
  });
  s+=`<circle cx="${cx}" cy="${cy}" r="14" fill="var(--accent)"/><text x="${cx}" y="${cy+32}" text-anchor="middle" font-size="11" fill="var(--ink)" font-weight="500">Agents</text><text x="${cx}" y="${cy+46}" text-anchor="middle" font-size="11" fill="var(--ink)" font-weight="500">that act</text></svg>`;
  $("#mapSvg").innerHTML=s;
  $("#mapSvg").querySelectorAll(".node").forEach(g=>{ const go=()=>openPaper(g.dataset.id); g.addEventListener("click",go); g.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();go();} }); });
  $("#legend").innerHTML=Object.values(THREADS).map(t=>`<span><i style="background:${t.color}"></i>${esc(t.name)}</span>`).join("")+`<span><i style="background:var(--surface);border:2px solid var(--ink3);width:8px;height:8px"></i>open = not done</span>`;
}
const stLabel={none:"Not started",reading:"Reading",done:"Done"};
function renderTable(){
  let r=`<thead><tr><th>#</th><th>Paper</th><th>Year</th><th>Module</th><th>Why it is here</th><th>Status</th></tr></thead><tbody>`;
  ORDER.forEach(id=>{ const p=PAPERS[id], m=MODULES.find(x=>x.id===p.mod), st=state.status[id]||"none";
    r+=`<tr class="row" tabindex="0" data-id="${id}"><td class="num">${p.n}</td><td><span class="thread-dot" style="background:${THREADS[p.thread].color}"></span><span class="ttl">${esc(p.title)}</span><div class="muted">${esc(p.authors.split(",")[0])} et al.</div></td><td class="yr">${p.year}</td><td>${m.id}. ${esc(m.title)}</td><td style="max-width:320px">${esc(p.why.split(". ")[0])}.</td><td><span class="st ${st}">${stLabel[st]}</span></td></tr>`; });
  $("#readTbl").innerHTML=r+"</tbody>";
  $("#readTbl").querySelectorAll("tr.row").forEach(tr=>{ const go=()=>openPaper(tr.dataset.id); tr.addEventListener("click",go); tr.addEventListener("keydown",e=>{ if(e.key==="Enter"){go();} }); });
}
function renderProgress(){
  const done=ORDER.filter(id=>state.status[id]==="done").length;
  $("#progFill").style.width=(done/ORDER.length*100)+"%"; $("#progTxt").textContent=`${done} / ${ORDER.length}`;
}

/* ---------------- modules ---------------- */
function modDone(m){ const ps=m.papers.length?m.papers:(m.revisit?[]:[]); return ps.length>0 && ps.every(id=>state.status[id]==="done"); }
function renderModNav(){
  $("#mods").innerHTML=MODULES.map(m=>`<button type="button" data-m="${m.id}" class="${m.id===state.mod?"on":""}"><span class="mn">${String(m.id).padStart(2,"0")}</span><span class="mt">${esc(m.title)}${modDone(m)?'<span class="chk" aria-label="done">✓</span>':""}</span></button>`).join("");
  $("#mods").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>openModule(+b.dataset.m,null,true)));
}
function openModule(id, pid, scroll){
  state.mod=id; const m=MODULES.find(x=>x.id===id);
  state.focus = pid || m.papers[0] || m.revisit || null;
  renderModNav(); renderModule(); scheduleSave(); updateTutorCtx();
  try{ history.replaceState(null,"","#module-"+id); }catch(e){}
  if(scroll){ const t = pid ? document.getElementById("paper-"+pid) : $("#modules"); (t||$("#modules")).scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth", block:"start"}); }
}
function openPaper(id){ openModule(PAPERS[id].mod, id, true); }
function renderModule(){
  const m=MODULES.find(x=>x.id===state.mod), i=MODULES.indexOf(m);
  const v=$("#modView"); v.innerHTML="";
  v.append(h("div",{class:"mod-head"},`<div class="eyebrow">Module ${m.id} of ${MODULES.length} · ${esc(m.years)} · <span style="color:${THREADS[m.thread].color}">${esc(THREADS[m.thread].name)}</span></div><h3>${esc(m.title)}</h3><p>${esc(m.intro)}</p>`));
  if(m.departure) v.append(h("div",{class:"note"},`<span class="eyebrow">Order note</span>${esc(m.departure)}`));
  if(m.revisit){ const p=PAPERS[m.revisit]; v.append(h("div",{class:"note"},`<span class="eyebrow">Revisit</span>Paper ${p.n}, <a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a>: re-read §2–3 and Figures 1.2 and 3.1 with this module's question in mind.`)); }
  if(m.body) v.append(h("div",{class:"paper"},`<div class="p-body">${m.body}</div>`));
  m.papers.forEach(pid=>v.append(paperCard(pid)));
  if(m.bridges.length){ const b=h("div",{class:"bridges"}); b.append(h("div",{class:"eyebrow"},"Historical bridges · no full reading needed"));
    m.bridges.forEach(x=>b.append(h("p",{class:"bridge"},`<span class="tag">${esc(x[0])}</span>${x[1]}`))); v.append(b); }
  const pg=h("div",{class:"pager"});
  const prev=MODULES[i-1], next=MODULES[i+1];
  const pb=h("button",{type:"button",onclick:()=>prev&&openModule(prev.id,null,true)},prev?`← ${prev.id}. ${esc(prev.title)}`:"← Start"); if(!prev) pb.disabled=true;
  const nb=h("button",{type:"button",onclick:()=>next&&openModule(next.id,null,true)},next?`${next.id}. ${esc(next.title)} →`:"End of course"); if(!next) nb.disabled=true;
  pg.append(pb,nb); v.append(pg);
}
function paperCard(pid){
  const p=PAPERS[pid], st=state.status[pid]||"none", tab=state.tabs[pid]||"guide";
  const c=h("article",{class:"paper",id:"paper-"+pid});
  c.addEventListener("focusin",()=>{ if(state.focus!==pid){ state.focus=pid; updateTutorCtx(); } });
  c.addEventListener("pointerdown",()=>{ if(state.focus!==pid){ state.focus=pid; updateTutorCtx(); } });
  const links=[`<a class="btn primary" href="${p.url}" target="_blank" rel="noopener">Open paper ↗</a>`, `<a class="btn" href="${p.pdf}" target="_blank" rel="noopener">PDF ↗</a>`].concat((p.extra||[]).map(e=>`<a class="btn" href="${e[1]}" target="_blank" rel="noopener">${esc(e[0])} ↗</a>`));
  const top=h("div",{class:"p-top"},`<div class="p-meta"><span class="pn">Paper ${p.n} of ${ORDER.length}</span><span><span class="thread-dot" style="background:${THREADS[p.thread].color}"></span>${esc(THREADS[p.thread].name)}</span><span class="mono">${p.year}</span></div><h3>${esc(p.title)}</h3><div class="p-auth">${esc(p.authors)}</div><div class="muted">${esc(p.venue)}</div>`);
  const lr=h("div",{class:"p-links"},links.join(""));
  const seg=h("div",{class:"seg",role:"group","aria-label":"Reading status"});
  ["none","reading","done"].forEach(k=>{ const b=h("button",{type:"button",class:k===st?"on":"","aria-pressed":String(k===st)},stLabel[k]); b.addEventListener("click",()=>{ state.status[pid]=k; scheduleSave(); renderTable(); renderProgress(); renderMap(); renderModNav(); seg.querySelectorAll("button").forEach(x=>{x.classList.toggle("on",x===b); x.setAttribute("aria-pressed",String(x===b));}); }); seg.append(b); });
  lr.append(seg); top.append(lr); c.append(top);
  const tabs=h("div",{class:"tabs",role:"tablist"}); const body=h("div",{class:"p-body"});
  const T=[["guide","Reading guide"],["lesson","Lesson"],["check","Checkpoint"],["notes","Notes"]];
  T.forEach(([k,l])=>{ const b=h("button",{type:"button",role:"tab","aria-selected":String(k===tab),class:k===tab?"on":""},l); b.addEventListener("click",()=>{ state.tabs[pid]=k; scheduleSave(); tabs.querySelectorAll("button").forEach(x=>{x.classList.toggle("on",x===b);x.setAttribute("aria-selected",String(x===b));}); fillTab(body,pid,k); }); tabs.append(b); });
  c.append(tabs,body); fillTab(body,pid,tab); return c;
}
function fillTab(body,pid,k){
  const p=PAPERS[pid]; body.innerHTML="";
  if(k==="guide"){
    body.innerHTML=`<dl class="kv">
<dt>Why it is here</dt><dd>${p.why}</dd>
<dt>Prior bottleneck</dt><dd>${p.bottleneck}</dd>
<dt>Central contribution</dt><dd>${p.contribution}</dd>
<dt>Prerequisites</dt><dd>${p.prereq}</dd>
<dt>Concepts to own</dt><dd><div class="chips">${p.concepts.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div></dd>
<dt>Study closely</dt><dd>${p.study}</dd>
<dt>Skim</dt><dd>${p.skim}</dd>
<dt>Key evidence</dt><dd>${p.evidence}</dd>
<dt>Main limitation</dt><dd>${p.limitation}</dd>
<dt>Checkpoint</dt><dd><i>${p.checkpoint}</i></dd></dl>
<div class="note eval"><span class="eyebrow">Evaluation lens</span>${p.evalLens}</div>`;
  } else if(k==="lesson"){
    body.innerHTML=p.lesson+`<div class="note eval"><span class="eyebrow">Evaluation lens</span>${p.evalLens}</div><div class="lens"><div class="note cc"><span class="eyebrow">In Claude Code</span>${p.cc}</div><div class="note rb"><span class="eyebrow">In your robot</span>${p.robot}</div></div>`;
  } else if(k==="check"){
    body.append(h("h4",{},"Explain this in your own words"), h("p",{class:"check-q"},p.checkpoint));
    const ta=h("textarea",{id:"ans-"+pid,rows:"7",placeholder:"Write your explanation. Aim for what you could say aloud to a classmate in two minutes."}); ta.value=state.answers[pid]||"";
    ta.addEventListener("input",()=>{ state.answers[pid]=ta.value; scheduleSave(); });
    const fb=h("div",{class:"feedback msg bot"}); if(state.grades[pid]) fb.innerHTML=md(state.grades[pid]);
    const btn=h("button",{type:"button",class:"btn primary"},"Grade my answer");
    btn.addEventListener("click",()=>gradeAnswer(pid,ta.value,fb,btn));
    const row=h("div",{class:"row-btns"}); row.append(btn,h("span",{class:"saved"}),h("span",{class:"muted"},"The tutor compares your answer with the paper and says what is missing or wrong."));
    body.append(ta,row,fb);
  } else {
    body.append(h("h4",{},"Your notes on this paper"));
    const ta=h("textarea",{id:"notes-"+pid,rows:"10",placeholder:"Questions, equations you re-derived, links to your robot work… The tutor reads these when you ask about this paper."}); ta.value=state.notes[pid]||"";
    ta.addEventListener("input",()=>{ state.notes[pid]=ta.value; scheduleSave(); });
    const row=h("div",{class:"row-btns"}); row.append(h("span",{class:"saved"}));
    body.append(ta,row);
  }
}

/* ---------------- optional + method ---------------- */
function renderOptional(){
  $("#optList").innerHTML=OPTIONAL.map(o=>`<div class="opt-item"><h4><a href="${o.url}" target="_blank" rel="noopener">${esc(o.title)}</a></h4><span class="when">${esc(o.who)} · ${esc(o.when)} · Module ${o.mod}</span><p class="why">${esc(o.why)}</p></div>`).join("");
  $("#methodList").innerHTML=METHOD.map(m=>`<li><div><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div></li>`).join("");
  $("#evalList").innerHTML=EVALQ.map(x=>`<p>${x}</p>`).join("");
  $("#verifyNote").textContent="Every title, author list, date and link on this page was checked against its primary source (arXiv, JMLR, Nature, anthropic.com) on 10 November 2026. Venue names come from the arXiv record or the publisher. Statements about proprietary systems are limited to what their developers have published.";
}

/* ---------------- markdown (safe subset) ---------------- */
function md(src){
  const lines=String(src||"").replace(/\r/g,"").split("\n"); let out="", inList=null, inCode=false, code=[];
  const inline=t=>esc(t).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|[^*])\*([^*\n]+)\*/g,"$1<i>$2</i>");
  const close=()=>{ if(inList){ out+=`</${inList}>`; inList=null; } };
  for(const ln of lines){
    if(ln.trim().startsWith("```")){ if(inCode){ out+=`<pre><code>${esc(code.join("\n"))}</code></pre>`; code=[]; inCode=false; } else { close(); inCode=true; } continue; }
    if(inCode){ code.push(ln); continue; }
    let m;
    if((m=ln.match(/^\s*#{1,4}\s+(.*)/))){ close(); out+=`<h3>${inline(m[1])}</h3>`; continue; }
    if((m=ln.match(/^\s*[-*•]\s+(.*)/))){ if(inList!=="ul"){ close(); out+="<ul>"; inList="ul"; } out+=`<li>${inline(m[1])}</li>`; continue; }
    if((m=ln.match(/^\s*\d+[.)]\s+(.*)/))){ if(inList!=="ol"){ close(); out+="<ol>"; inList="ol"; } out+=`<li>${inline(m[1])}</li>`; continue; }
    if(!ln.trim()){ close(); continue; }
    close(); out+=`<p>${inline(ln)}</p>`;
  }
  if(inCode) out+=`<pre><code>${esc(code.join("\n"))}</code></pre>`;
  close(); return out;
}

/* ---------------- tutor ---------------- */
let sample=null, sampleReady=false, dict=null, busy=false, ctl=null;
function ctxKey(){ return state.focus ? state.focus : "m"+state.mod; }
function ctxLabel(){ const m=MODULES.find(x=>x.id===state.mod); if(state.focus&&PAPERS[state.focus]){ const p=PAPERS[state.focus]; return `<b>Paper ${p.n}:</b> ${esc(p.short)} · Module ${m.id}`; } return `<b>Module ${m.id}:</b> ${esc(m.title)}`; }
function updateTutorCtx(){ $("#tCtx").innerHTML=ctxLabel(); renderLog(); }
function courseOutline(){ return MODULES.map(m=>`Module ${m.id} ${m.title}: `+(m.papers.map(id=>`Paper ${PAPERS[id].n} "${PAPERS[id].title}" (${PAPERS[id].year})`).join("; ")||"revisits GPT-3")).join("\n"); }
function paperContext(pid){
  const p=PAPERS[pid]; if(!p) return "";
  return `CURRENT PAPER: Paper ${p.n} of ${ORDER.length}, "${p.title}" (${p.authors}; ${p.venue}). Link: ${p.url}
Why in curriculum: ${strip(p.why)}
Bottleneck: ${strip(p.bottleneck)}
Contribution: ${strip(p.contribution)}
Concepts: ${p.concepts.join("; ")}
Study: ${strip(p.study)}
Evidence: ${strip(p.evidence)}
Limitation: ${strip(p.limitation)}
Checkpoint: ${strip(p.checkpoint)}
Lesson text on the page:\n${strip(p.lesson).slice(0,9000)}
Claude Code lens: ${strip(p.cc)}
Robot lens: ${strip(p.robot)}
Learner's notes: ${(state.notes[pid]||"(none)").slice(0,3000)}`;
}
function rulesTurn(){
  const m=MODULES.find(x=>x.id===state.mod);
  let ctx = state.focus&&PAPERS[state.focus] ? paperContext(state.focus) : "";
  if(!state.focus || !PAPERS[state.focus] || m.body) ctx += `\nCURRENT MODULE ${m.id}: ${m.title}. ${m.intro}\n${strip(m.body||"").slice(0,6000)}\nBridges: ${m.bridges.map(b=>strip(b[1])).join(" | ").slice(0,4000)}`;
  return `You are the tutor built into "Next Word to Next Action", a 15-paper curriculum on how modern LLMs were developed. The learner is a Stanford robotics student who wants deep conceptual understanding (not coding projects) so they can understand how LLMs and robot foundation models are converging. Today is 10 November 2026.

How to teach:
- When asked to teach a paper: conceptual primer, then the mechanism and essential mathematics (define every symbol), then the evidence (which tables/figures, what they do and do not show), then connections to the preceding and following developments in this curriculum.
- Plain, direct language. Use small worked examples and thought experiments. Use plain-text math (e.g. softmax(QK^T/sqrt(d_k))V) since LaTeX is not rendered. Markdown lists and **bold** render.
- Be accurate about what papers report. If you are not sure of a number or a section, say so rather than guess. Do not invent papers or results after your knowledge; the page lists verified 2026 work.
- For proprietary systems (Claude, GPT, Gemini, o1), separate what was publicly disclosed from inference and from unknowns. Never imply their training recipes are public.
- Never declare one model universally better; tie comparisons to task, tools, inference budget, cost and evidence.
- Keep evaluation in view: contamination, generalisation, ablations, reward hacking, verifier errors, matched budgets.
- Connect to robotics when it helps (VLAs, world models, sim, verifiers for physical tasks), and to Claude Code as the running agent example.
- Default length: focused, roughly 150–400 words unless asked to go deep.

COURSE OUTLINE:
${courseOutline()}

${ctx}`;
}
const QUICK = [
 ["Teach me this","Teach me this paper using the four-part structure: primer, mechanism and math, evidence, connections. Go deep."],
 ["Key equation","Walk me through the single most important equation or algorithm here, symbol by symbol, with a tiny numeric example."],
 ["Quiz me","Ask me 3 questions that test real understanding of this material, one at a time. Wait for my answer before the next. Start with question 1."],
 ["Robotics link","How does this connect to robot learning today (VLAs, world models, sim, data)? Be specific about what transfers and what does not."],
 ["Was this overturned?","Which claims in this paper were later revised, overturned or shown to be limited, by which later work?"]
];
function renderQuick(){ $("#tQuick").innerHTML=""; QUICK.forEach(([l,q])=>{ const b=h("button",{type:"button"},l); b.addEventListener("click",()=>ask(q)); $("#tQuick").append(b); }); }
async function renderLog(){
  const key=ctxKey(); const turns=await loadChat(key); if(key!==ctxKey()) return;
  const log=$("#tLog"); log.innerHTML="";
  if(!turns.length){
    log.append(h("div",{class:"empty-t"}, (tutorMode==="portal-login") || (sample===null&&window.__sampleChecked) ?
      offlineHtml() :
      `<b>Ask anything about what you are reading.</b><span>The tutor sees the current paper, its lesson and your notes. Try a button above, select text on the page, or type a question. Each paper keeps its own conversation.</span>`));
  }
  turns.forEach(t=>log.append(bubble(t.role,t.content)));
  log.scrollTop=log.scrollHeight;
}
let tutorMode="none";   /* claude | portal | none */
const LOGIN_MSG="The tutor uses Claude on this computer, which needs you to sign in once. In the CTO-Portal folder, double-click “Sign in to Claude.cmd”, finish the sign-in in your browser, then ask again.";
function offlineHtml(){
  if(tutorMode==="portal-login") return `<div class="offline">${esc(LOGIN_MSG)}</div>`;
  return `<div class="offline">The tutor works when this page is opened from your own portal: double-click <b>Start Portal.cmd</b> in the CTO-Portal folder and open this report from the Library tab.${ARTIFACT_URL?` Or <a href="${ARTIFACT_URL}" target="_blank" rel="noopener">open the Claude copy of this page</a>.`:""} Everything else here works without it, and your progress and notes are kept in this browser.</div>`;
}
/* Same call shape as Claude's page capability, backed by the portal's /api/ask (local Claude CLI). */
async function portalSample(input,opts={}){
  let res;
  try{ res=await fetch("/api/ask",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({input,tier:opts.modelTier||"default"}),signal:opts.signal}); }
  catch(e){ throw {code:opts.signal&&opts.signal.aborted?"cancelled":"upstream_error"}; }
  if(!res.ok||!res.body) throw {code:"upstream_error"};
  const rd=res.body.getReader(), dec=new TextDecoder(); let text="";
  try{
    for(;;){ const {done,value}=await rd.read(); if(done) break; text+=dec.decode(value,{stream:true});
      const cut=text.indexOf("\u0000TUTOR_ERROR:"); const shown=(cut>=0?text.slice(0,cut):text).replace(/^\s+/,"");
      if(shown&&opts.onText) opts.onText({text:shown}); }
  }catch(e){ throw {code:opts.signal&&opts.signal.aborted?"cancelled":"upstream_error", text:text||undefined}; }
  const cut=text.indexOf("\u0000TUTOR_ERROR:");
  if(cut>=0){ const kind=text.slice(cut+13).split(":")[0]; const part=text.slice(0,cut).trim();
    if(kind==="login"){ tutorMode="portal-login"; throw {code:"login", text:part||undefined}; }
    throw {code:"upstream_error", text:part||undefined}; }
  text=text.trim(); if(!text) throw {code:"empty_completion"};
  if(tutorMode==="portal-login") tutorMode="portal";
  return {text, truncated:false};
}
function bubble(role,text){ const d=h("div",{class:"msg "+(role==="user"?"user":"bot")}); if(role==="user") d.textContent=text; else d.innerHTML=md(text); return d; }
async function ask(q){
  q=(q||"").trim(); if(!q||busy) return;
  openSheet();
  if(!sample){ const log=$("#tLog"); log.innerHTML=""; log.append(h("div",{class:"empty-t"},offlineHtml())); return; }
  const key=ctxKey(); const turns=await loadChat(key);
  turns.push({role:"user",content:q}); $("#tInput").value="";
  const log=$("#tLog"); if(turns.length===1) log.innerHTML="";
  log.append(bubble("user",q)); const out=h("div",{class:"msg bot"},"<p class=\"muted\">Thinking…</p>"); log.append(out); log.scrollTop=log.scrollHeight;
  busy=true; setBusy(true); ctl=new AbortController();
  const input=[{role:"user",content:rulesTurn()},{role:"assistant",content:"Understood. I have the page context and will teach from it."}].concat(turns.slice(-16));
  try{
    const tier=$("#tDepth").value;
    const r=await sample(input,{cache:false,signal:ctl.signal,modelTier:tier,onText:({text})=>{ out.innerHTML=md(text); log.scrollTop=log.scrollHeight; }});
    turns.push({role:"assistant",content:r.text}); if(r.truncated) log.append(h("div",{class:"msg sys"},"Answer cut short. Ask for the rest."));
  }catch(e){
    if(e&&e.text){ turns.push({role:"assistant",content:e.text}); }
    else { turns.pop(); }
    out.innerHTML = e&&e.code==="cancelled" ? (e.text?md(e.text):"<p class=\"muted\">Stopped.</p>") : (e&&e.text?md(e.text):"")+`<p class="muted">${esc(errCopy(e))}</p>`;
    if(e&&(e.code==="not_granted"||e.code==="sampling_disabled")) sample=null;
  }finally{ busy=false; setBusy(false); saveChat(key); }
}
function errCopy(e){ const c=e&&e.code; return ({login:LOGIN_MSG, empty_completion:"The tutor returned nothing. Try asking again.", not_granted:"Claude was not allowed for this page. You can allow it from the page's permissions menu.",rate_limited:"Too many requests just now. Try again in a minute.",session_expired:"Your Claude session expired. Sign in again.",refused:"Claude declined that request. Try rephrasing it.",prompt_too_large:"That was too long. Clear the conversation and ask again.",sampling_disabled:"Claude is not available for this account here."})[c]||"Something went wrong reaching Claude. Try again."; }
function setBusy(b){ const s=$("#tSend"); s.textContent=b?"Stop":"Ask"; s.classList.toggle("primary",!b); }
async function gradeAnswer(pid,answer,fb,btn){
  const p=PAPERS[pid];
  if(!answer.trim()){ fb.innerHTML="<p class=\"muted\">Write an answer first.</p>"; return; }
  if(!sample){ fb.innerHTML=offlineHtml(); return; }
  btn.disabled=true; fb.innerHTML="<p class=\"muted\">Reading your answer…</p>";
  const prompt=`${rulesTurn()}\n\nTASK: Grade the learner's answer to this checkpoint question, as a demanding but kind teacher.\nQUESTION: ${strip(p.checkpoint)}\nLEARNER'S ANSWER:\n${answer.slice(0,6000)}\n\nRespond with: a one-line verdict (Solid / Partly there / Not yet), then "What you have right" (bullets), "What is missing or wrong" (bullets, specific, with the correct idea), and one follow-up question that would test the weakest point. Under 300 words.`;
  try{ const r=await sample(prompt,{cache:false,modelTier:$("#tDepth").value,onText:({text})=>{ fb.innerHTML=md(text); }}); state.grades[pid]=r.text; scheduleSave(); }
  catch(e){ fb.innerHTML=(e&&e.text?md(e.text):"")+`<p class="muted">${esc(errCopy(e))}</p>`; if(e&&(e.code==="not_granted"||e.code==="sampling_disabled")) sample=null; }
  finally{ btn.disabled=false; }
}
function openSheet(){ if(matchMedia("(max-width:900px)").matches) document.body.classList.add("sheet-open"); else if(document.body.classList.contains("panel-off")) togglePanel(); }
function togglePanel(){ const off=document.body.classList.toggle("panel-off"); $("#panelToggle").textContent=off?"Show tutor":"Hide tutor"; try{ localStorage.setItem(LS+":panel",off?"off":"on"); }catch(e){} }

/* selection → ask */
let selBtn=null;
function setupSelection(){
  document.addEventListener("mouseup",e=>{ setTimeout(()=>{
    const s=window.getSelection(); const t=s&&String(s).trim();
    if(selBtn){ selBtn.remove(); selBtn=null; }
    if(!t||t.length<8||t.length>1500) return;
    if(!$("#main").contains(s.anchorNode)) return;
    const r=s.getRangeAt(0).getBoundingClientRect();
    selBtn=h("button",{type:"button",class:"sel-ask"},"Ask the tutor about this");
    selBtn.style.left=Math.max(8,Math.min(window.scrollX+r.left, window.scrollX+document.documentElement.clientWidth-200))+"px";
    selBtn.style.top=(window.scrollY+r.bottom+8)+"px";
    selBtn.addEventListener("mousedown",ev=>ev.preventDefault());
    selBtn.addEventListener("click",()=>{ const q=`Explain this passage from the page, and why it matters here:\n\n"${t}"`; selBtn.remove(); selBtn=null; window.getSelection().removeAllRanges(); ask(q); });
    document.body.append(selBtn);
  },10); });
}

/* ---------------- boot ---------------- */
function boot(){
  applySaved(lsGet("state"));
  const hm=(location.hash||"").match(/^#module-(\d+)$/); if(hm){ const n=+hm[1]; if(MODULES.some(m=>m.id===n)) state.mod=n; }
  const m=MODULES.find(x=>x.id===state.mod)||MODULES[0]; state.mod=m.id; state.focus=m.papers[0]||m.revisit||null;
  renderActs(); renderMap(); renderTable(); renderProgress(); renderModNav(); renderModule(); renderOptional(); renderQuick(); updateTutorCtx(); setupSelection();
  if(hm) setTimeout(()=>$("#modules").scrollIntoView(),50);
  try{ if(localStorage.getItem(LS+":panel")==="off"){ document.body.classList.add("panel-off"); $("#panelToggle").textContent="Show tutor"; } }catch(e){}
  $("#panelToggle").addEventListener("click",togglePanel);
  $("#askFab").addEventListener("click",()=>document.body.classList.add("sheet-open"));
  $("#sheetClose").addEventListener("click",()=>{ if(matchMedia("(max-width:900px)").matches) document.body.classList.remove("sheet-open"); else togglePanel(); });
  $("#tSend").addEventListener("click",()=>{ if(busy){ ctl&&ctl.abort(); } else ask($("#tInput").value); });
  $("#tInput").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); if(!busy) ask($("#tInput").value); } });
  $("#tClear").addEventListener("click",()=>{ const k=ctxKey(); chats[k]=[]; saveChat(k); renderLog(); });
  document.addEventListener("keydown",e=>{ const tg=e.target.tagName; if(tg==="TEXTAREA"||tg==="INPUT"||tg==="SELECT") return; const i=MODULES.findIndex(x=>x.id===state.mod);
    if(e.key==="]"&&MODULES[i+1]) openModule(MODULES[i+1].id,null,true); if(e.key==="["&&MODULES[i-1]) openModule(MODULES[i-1].id,null,true); });
  initClaude();
}
async function initPortal(){
  /* Opened from the portal's local server: the tutor runs through /api/ask. Opened as a plain file or on the public site: no tutor. */
  try{
    const r=await fetch("/api/ask/status",{cache:"no-store"});
    const s=r.ok?await r.json():null;
    if(s&&s.available){ sample=portalSample; tutorMode=s.loggedIn?"portal":"portal-login"; }
  }catch(e){}
  window.__sampleChecked=true; renderLog();
  /* Voice input through the browser's own speech recognition (Chrome and Edge). */
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(SR&&sample){ const mic=$("#tMic"); mic.hidden=false; let rec=null, base="";
    mic.addEventListener("click",()=>{
      if(rec){ rec.stop(); return; }
      rec=new SR(); rec.continuous=true; rec.interimResults=true; rec.lang="en-US"; base=$("#tInput").value;
      rec.onresult=ev=>{ let fin="", tmp=""; for(let i=ev.resultIndex;i<ev.results.length;i++){ const t=ev.results[i][0].transcript; if(ev.results[i].isFinal) fin+=t; else tmp+=t; } if(fin) base=(base+" "+fin).trim(); $("#tInput").value=(base+" "+tmp).trim(); };
      rec.onend=()=>{ rec=null; mic.classList.remove("on"); mic.textContent="Speak"; };
      rec.onerror=ev=>{ if(ev.error==="not-allowed") mic.hidden=true; };
      try{ rec.start(); mic.classList.add("on"); mic.textContent="Stop"; }catch(e){ rec=null; }
    });
  }
}
async function initClaude(){
  const C=window.claude;
  if(!C||typeof C.use!=="function"){ return initPortal(); }
  C.use("sample").then(s=>{ sample=s||null; if(s) tutorMode="claude"; window.__sampleChecked=true; sampleReady=!!s; renderLog(); }).catch(()=>{ window.__sampleChecked=true; renderLog(); });
  C.use("dictation").then(d=>{ if(!d) return; dict=d; const mic=$("#tMic"); mic.hidden=false; let base="";
    d.onPartial(({text})=>{ $("#tInput").value=(base+" "+text).trim(); });
    d.onFinal(({text})=>{ base=(base+" "+text).trim(); $("#tInput").value=base; });
    d.onState(({state:s})=>{ const on=s==="listening"; mic.classList.toggle("on",on); mic.textContent=on?"Stop":"Speak"; });
    mic.addEventListener("click",()=>{ if(mic.classList.contains("on")){ d.stop().catch(()=>{}); return; } base=$("#tInput").value; d.start().catch(e=>{ if(e&&e.code==="not_granted") mic.hidden=true; }); });
  }).catch(()=>{});
  try{
    const [d,u]=await Promise.all([C.use("db"),C.use("user")]);
    if(d&&u){ const id=await u.id(); if(id){ db=d; uid=id;
      const s=await db.doc(`data/users/${uid}/progress`).get().catch(()=>null);
      if(s&&s.exists){ applySaved(s.data()); const mm=MODULES.find(x=>x.id===state.mod)||MODULES[0]; state.mod=mm.id; state.focus=mm.papers[0]||mm.revisit||null; updateTutorCtx(); renderTable(); renderProgress(); renderMap(); renderModNav(); renderModule(); }
      $("#storeNote").textContent="Progress and notes save to your Claude account";
      Object.keys(chats).forEach(k=>delete chats[k]); renderLog();
    } }
  }catch(e){}
}
boot();
