import json, urllib.request, time, os, re
SP=os.path.dirname(os.path.abspath(__file__))

# The Algolia search key rotates. Read it live from window.AlgoliaOpts in the
# directory page; fall back to the key that worked on 2026-09-10 if that fails.
APP="45BWZJ1SGC"
FALLBACK_KEY="NzllNTY5MzJiZGM2OTY2ZTQwMDEzOTNhYWZiZGRjODlhYzVkNjBmOGRjNzJiMWM4ZTU0ZDlhYTZjOTJiMjlhMWFuYWx5dGljc1RhZ3M9eWNkYyZyZXN0cmljdEluZGljZXM9WUNDb21wYW55X3Byb2R1Y3Rpb24lMkNZQ0NvbXBhbnlfQnlfTGF1bmNoX0RhdGVfcHJvZHVjdGlvbiZ0YWdGaWx0ZXJzPSU1QiUyMnljZGNfcHVibGljJTIyJTVE"

def live_creds():
    try:
        req=urllib.request.Request("https://www.ycombinator.com/companies",
            headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        html=urllib.request.urlopen(req, timeout=45).read().decode("utf-8","replace")
        m=re.search(r'window\.AlgoliaOpts\s*=\s*(\{.*?\})', html, re.S)
        if m:
            o=json.loads(m.group(1))
            if o.get("app") and o.get("key"):
                print("using live Algolia creds, app", o["app"])
                return o["app"], o["key"]
        print("WARNING: window.AlgoliaOpts not found in the page; using fallback key")
    except Exception as e:
        print("WARNING: could not read live creds (%s); using fallback key" % e)
    return APP, FALLBACK_KEY

APP, KEY = live_creds()
URL=f"https://{APP.lower()}-dsn.algolia.net/1/indexes/YCCompany_production/query"

def q(payload):
    req=urllib.request.Request(URL, data=json.dumps(payload).encode(),
        headers={"x-algolia-api-key":KEY,"x-algolia-application-id":APP,"Content-Type":"application/json"})
    for attempt in range(4):
        try:
            return json.loads(urllib.request.urlopen(req, timeout=45).read())
        except Exception as e:
            print("retry",attempt,e); time.sleep(2+attempt*2)
    raise SystemExit("failed")

# Batches are discovered from the index facet rather than hardcoded, so a batch
# YC adds after this was written (Winter 2027 and on) is picked up with no edit.
# Anything before Winter 2022 is out of scope for this census.
SEASON={"Winter":0,"Spring":1,"Summer":2,"Fall":3}
def discover_batches(from_year=2022):
    f=q({"query":"","hitsPerPage":1,"facets":["batch"],"maxValuesPerFacet":200})
    out=[]
    for name in f.get("facets",{}).get("batch",{}):
        parts=name.split()
        if len(parts)==2 and parts[0] in SEASON and parts[1].isdigit():
            if int(parts[1])>=from_year:
                out.append(name)
    out.sort(key=lambda n:(int(n.split()[1]), SEASON[n.split()[0]]))
    return out

BATCHES=discover_batches()
print("batches discovered:", len(BATCHES), "->", ", ".join(BATCHES))

all_hits=[]
for b in BATCHES:
    page=0; got=0
    while True:
        r=q({"query":"","hitsPerPage":1000,"page":page,"filters":f'batch:"{b}"'})
        hits=r["hits"]; all_hits+=hits; got+=len(hits)
        if page+1>=r["nbPages"]: break
        page+=1
    print(f"{b:14s} {got:4d}")
print("TOTAL",len(all_hits))
keep=["name","slug","batch","one_liner","long_description","industry","subindustry","industries",
"tags","regions","all_locations","team_size","status","stage","top_company","website","launched_at","nonprofit","isHiring","former_names","id"]
out=[{k:h.get(k) for k in keep} for h in all_hits]
json.dump(out, open(os.path.join(SP,"yc_raw.json"),"w",encoding="utf-8"), ensure_ascii=False)
print("wrote yc_raw.json", os.path.getsize(os.path.join(SP,"yc_raw.json")))
# facet summaries
from collections import Counter
for f in ["status","stage","industry","regions","tags"]:
    c=Counter()
    for h in out:
        v=h.get(f)
        if isinstance(v,list): c.update(v)
        elif v: c[v]+=1
    print("\n##",f, len(c))
    for k,n in c.most_common(30): print(f"  {n:5d}  {k}")
