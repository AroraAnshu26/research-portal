import re,sys,io,json,os,time,urllib.request
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
SP=os.path.dirname(os.path.abspath(__file__))
UA={'User-Agent':'Mozilla/5.0 (academic research; anshuaro@stanford.edu)'}
B="https://profiles.stanford.edu"
def get(u,tries=3):
    for t in range(tries):
        try:
            return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=45).read().decode('utf-8','replace')
        except Exception as e:
            if t==tries-1: return 'ERR:'+str(e)[:70]
            time.sleep(2)
ORGS={
 "SoE":"/browse/school-of-engineering",
 "H&S":"/browse/school-of-humanities-and-sciences",
 "Med":"/browse/school-of-medicine",
 "Sustain":"/browse/stanford-doerr-school-of-sustainability",
 "GSB":"/browse/graduate-school-of-business",
 "GSE":"/browse/graduate-school-of-education",
 "SLAC":"/browse/slac-national-accelerator-laboratory",
 "VPDoR":"/browse/vice-provost-and-dean-of-research",
 "Bio-X":"/browse/vice-provost-and-dean-of-research/bio-x",
 "HAI":"/browse/vice-provost-and-dean-of-research/institute-for-human-centered-artificial-intelligence-hai",
 "ChEM-H":"/browse/vice-provost-and-dean-of-research/sarafan-chem-h",
 "SDS":"/browse/vice-provost-and-dean-of-research/stanford-data-science",
 "WuTsaiNeuro":"/browse/vice-provost-and-dean-of-research/wu-tsai-neurosciences-institute",
 "WuTsaiHPA":"/browse/vice-provost-and-dean-of-research/life-science-institutes-independent-labs-institutes-centers-dor/wu-tsai-human-performance-alliance",
 "Precourt":"/browse/stanford-doerr-school-of-sustainability/precourt-institute-for-energy",
 "Woods":"/browse/stanford-doerr-school-of-sustainability/stanford-woods-institute-for-the-environment",
 "PULSE":"/browse/vice-provost-and-dean-of-research/stanford-pulse-institute",
 "ICME":"/browse/school-of-engineering/programs-centers-and-institutes/institute-for-computational-and-mathematical-engineering-icme",
 "StemCell":"/browse/school-of-medicine/institute-for-stem-cell-biology-and-regenerative-medicine",
 "FSI":"/browse/vice-provost-and-dean-of-research/freeman-spogli-institute-for-international-studies",
 "SIEPR":"/browse/vice-provost-and-dean-of-research/stanford-institute-for-economic-policy-research-siepr",
}
out={}
for k,p in ORGS.items():
    h=get(f"{B}{p}?affiliations=capFaculty&ps=10")
    if h.startswith('ERR:'): print(f"{k:14s}{h}"); continue
    m=re.search(r'Showing [\d,]+-[\d,]+ of ([\d,]+)',h)
    n=int(m.group(1).replace(',','')) if m else 0
    out[k]=n
    print(f"{k:14s}faculty={n}")
json.dump({"orgs":ORGS,"counts":out},open(os.path.join(SP,"org_counts.json"),"w"),indent=1)
print("TOTAL rows (with double-counting across orgs):",sum(out.values()))
