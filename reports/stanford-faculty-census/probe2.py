import re,sys,io,urllib.request
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
UA={'User-Agent':'Mozilla/5.0 (research; anshuaro@stanford.edu)'}
def get(u):
    try:
        return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=35).read().decode('utf-8','replace')
    except Exception as e: return 'ERR:'+str(e)[:60]
URLS=["https://me.stanford.edu/people/faculty","https://aa.stanford.edu/people/faculty",
"https://msande.stanford.edu/people/faculty","https://bioengineering.stanford.edu/faculty",
"https://cheme.stanford.edu/people/faculty","https://mse.stanford.edu/people/faculty",
"https://cee.stanford.edu/people/faculty","https://icme.stanford.edu/people/faculty",
"https://physics.stanford.edu/people/faculty","https://chemistry.stanford.edu/people/faculty",
"https://appliedphysics.stanford.edu/people/faculty","https://statistics.stanford.edu/people/faculty",
"https://biology.stanford.edu/people/faculty","https://earth.stanford.edu/faculty",
"https://psychology.stanford.edu/people/faculty"]
for u in URLS:
    h=get(u)
    if h.startswith('ERR:'): print(f"{u[:52]:54s}{h}"); continue
    prof=set(re.findall(r'profiles\.stanford\.edu/([a-z0-9][a-z0-9\-]{2,60})',h))
    prof={p for p in prof if not p.startswith('proxy')}
    mail=set(re.findall(r'mailto:([\w\.\-]+@stanford\.edu)',h))
    slug=set(re.findall(r'/people/([a-z][a-z0-9\-]{3,50})',h))
    print(f"{u[:52]:54s}profiles={len(prof):3d} mail={len(mail):3d} peopleslug={len(slug):3d} len={len(h)}")
    if prof: print("     ex:", list(sorted(prof))[:6])
