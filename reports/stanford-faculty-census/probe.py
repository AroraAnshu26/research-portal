import re,sys,io,json,urllib.request
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
UA={'User-Agent':'Mozilla/5.0 (research; contact anshuaro@stanford.edu)'}
def get(u):
    try:
        r=urllib.request.Request(u,headers=UA)
        return urllib.request.urlopen(r,timeout=30).read().decode('utf-8','replace')
    except Exception as e:
        return 'ERR:'+str(e)[:80]
CANDS=["ee","me","aa","msande","bioengineering","cheme","mse","cee","cs","icme",
 "physics","chemistry","appliedphysics","statistics","mathematics","biology",
 "earth","psychology","chemsyseng","energy","neuroscience"]
for d in CANDS:
    for path in ["/people/faculty","/people/faculty-members","/faculty"]:
        u=f"https://{d}.stanford.edu{path}"
        h=get(u)
        if h.startswith('ERR:'):
            print(f"{d:16s} {path:22s} {h}"); continue
        n=len(re.findall(r'orglist__display-name',h))
        pg=[int(x) for x in re.findall(r'page=(\d+)',h)] or [0]
        print(f"{d:16s} {path:22s} names={n:3d} maxpage={max(pg)} len={len(h)}")
        if n: break
