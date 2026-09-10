import re,sys,io,json,os,time,urllib.request
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
SP=os.path.dirname(os.path.abspath(__file__))
UA={'User-Agent':'Mozilla/5.0 (academic research; anshuaro@stanford.edu)'}
B="https://profiles.stanford.edu"
CACHE=os.path.join(SP,"cache"); os.makedirs(CACHE,exist_ok=True)
cfg=json.load(open(os.path.join(SP,"org_counts.json")))
ORGS=cfg["orgs"]; COUNTS=cfg["counts"]

def get(u,key,tries=3):
    fp=os.path.join(CACHE,key+".html")
    if os.path.exists(fp) and os.path.getsize(fp)>5000:
        return io.open(fp,encoding='utf-8',errors='replace').read()
    for t in range(tries):
        try:
            h=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read().decode('utf-8','replace')
            io.open(fp,'w',encoding='utf-8').write(h); time.sleep(0.4); return h
        except Exception as e:
            if t==tries-1:
                print("FAIL",key,str(e)[:60]); return ""
            time.sleep(3)

ENTRY=re.compile(r'<li class="mini-profile-holder">(.*?)</li>',re.S)
def parse(h):
    out=[]
    for m in ENTRY.finditer(h):
        blk=m.group(1)
        a=re.search(r'<a href="/([a-zA-Z0-9\-\._]+)">',blk)
        n=re.search(r'<h4>(.*?)</h4>',blk,re.S)
        t=re.search(r'<h5>(.*?)</h5>',blk,re.S)
        p=re.search(r'<p class="hidden-phone"[^>]*>(.*?)</p>',blk,re.S)
        if not (a and n): continue
        def clean(x):
            if not x: return ""
            x=re.sub(r'<br\s*/?>',' ',x); x=re.sub(r'<[^>]+>','',x)
            x=x.replace('&amp;','&').replace('&#39;',"'").replace('&quot;','"').replace('&nbsp;',' ')
            return re.sub(r'\s+',' ',x).strip()
        interests=clean(p.group(1)) if p else ""
        for lbl in ["Current Research and Scholarly Interests","Bio","Research Interests","Clinical Focus"]:
            if interests.startswith(lbl): interests=interests[len(lbl):].strip()
        out.append({"slug":a.group(1),"name":clean(n.group(1)),"title":clean(t.group(1)) if t else "","interests":interests})
    return out

people={}
for k,p in ORGS.items():
    n=COUNTS.get(k,0)
    if not n: continue
    pages=(n+99)//100
    got=0
    for pg in range(1,pages+1):
        u=f"{B}{p}?affiliations=capFaculty&ps=100&p={pg}"
        h=get(u,f"{k}_{pg}")
        if not h: continue
        rows=parse(h); got+=len(rows)
        for r in rows:
            s=r["slug"]
            if s not in people:
                people[s]=dict(r); people[s]["orgs"]=[]
            if k not in people[s]["orgs"]: people[s]["orgs"].append(k)
            if len(r["interests"])>len(people[s]["interests"]): people[s]["interests"]=r["interests"]
            if len(r["title"])>len(people[s]["title"]): people[s]["title"]=r["title"]
    print(f"{k:14s}expected={n:5d} parsed={got:5d} unique_total={len(people)}")
json.dump(list(people.values()),open(os.path.join(SP,"faculty_raw.json"),"w",encoding="utf-8"),ensure_ascii=False)
print("UNIQUE FACULTY:",len(people))
withint=sum(1 for v in people.values() if v["interests"])
print("with research-interest text:",withint)
