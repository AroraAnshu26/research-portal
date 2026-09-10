import json,re,os,sys,io
from collections import Counter
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
SP=os.path.dirname(os.path.abspath(__file__))
F=json.load(open(os.path.join(SP,"faculty_raw.json"),encoding="utf-8"))

# Methods = the instrument someone works WITH. Tightened to technical phrases.
METHODS={
 "Foundation models & NLP":r"language model|foundation model|large language|generative model|generative ai|transformer model|natural language processing|speech recognition|\bllms?\b",
 "Machine learning":r"machine learning|deep learning|neural network|reinforcement learning|representation learning|predictive model|artificial intelligence",
 "Robotics & embodied":r"\brobot|robotic|legged|locomotion|embodied|humanoid|teleoperat|exoskeleton|prosthetic|autonomous vehicle|autonomous system|unmanned|haptic",
 "Vision, imaging & sensing":r"computer vision|image reconstruction|image analysis|medical imaging|microscopy|spectroscopy|remote sensing|biosensor|wearable sensor|tomography|magnetic resonance imag|ultrasound imag",
 "Simulation & scientific computing":r"numerical simulation|computational fluid|finite element|molecular dynamics|numerical method|high.performance computing|multiscale model|monte carlo|digital twin|computational modeling",
 "Statistics & causal inference":r"statistical method|causal inference|bayesian|experimental design|uncertainty quantif|randomized|biostatistic|econometric|study design",
 "Devices & nanofabrication":r"nanofabricat|nanostructure|semiconductor device|transistor|\bmems\b|microfluidic|nanomaterial|thin.film|photonic device|integrated circuit|nanoscale device",
 "Quantum":r"quantum comput|quantum inform|quantum device|quantum material|quantum optic|qubit|quantum sensing",
 "Genomic & molecular tools":r"crispr|gene editing|dna sequencing|high.throughput sequencing|synthetic biology|protein engineering|directed evolution|single.cell|mass spectrometry|proteomic",
 "Optimization & algorithms":r"convex optimization|combinatorial optimization|algorithm design|control theory|optimal control|information theory|game theory|integer program",
}
# Domains = the field the work is aimed AT. Generic prose words removed.
DOMAINS={
 "Health & clinical care":r"clinical (care|outcome|trial|practice|decision)|patient (care|outcome|safety)|disease (diagnos|progress|mechanism)|cancer|tumor|surgical|surgery|diagnostic|therapeutic|oncolog|cardiovascular|cardiac|radiolog|infectious disease|vaccine|drug discovery|drug development|public health",
 "Biology & molecular":r"protein structure|protein folding|protein design|gene expression|gene regulation|genom|transcriptom|cell biolog|molecular biolog|microbiome|immunolog|enzyme|stem cell|metabolism|developmental biolog|structural biolog",
 "Neuroscience & brain":r"neuroscience|neural circuit|brain (activity|function|imaging|computation|machine)|neuron|neurodegenerat|cognitive (science|process|neuro)|neurophysiolog|brain.computer interface|neural decoding",
 "Energy & power":r"batter|solar cell|photovoltaic|power grid|electric grid|nuclear (energy|reactor|power)|fusion (energy|plasma|reactor)|hydrogen (fuel|production)|electrochemi|fuel cell|combustion|energy storage|energy system|geothermal",
 "Climate, earth & ocean":r"climate (change|model|science|risk)|atmospheric|ocean|geophysic|earthquake|seismic|hydrolog|carbon (capture|removal|sequestr)|ecosystem|biodiversity|wildfire|greenhouse gas|permafrost|glacier",
 "Materials & chemistry":r"materials (science|design|discovery|synthesis|propert)|polymer|catalysis|catalyst|crystal structure|alloy|ceramic|composite material|surface chemistr|metal.organic",
 "Compute, chips & systems":r"computer architecture|compiler|operating system|distributed system|semiconductor|processor design|memory system|computer network|database system|cloud computing|hardware accelerat|chip design",
 "Space":r"spacecraft|satellite|orbital|planetary science|astrophysic|astronom|cosmolog|launch vehicle|space mission|space system",
 "Security & defense":r"cryptograph|cybersecurity|computer security|national security|defense (application|system|technolog)|military|adversarial (attack|robust)|formal verification|privacy.preserv",
 "Manufacturing & industry":r"manufactur|industrial (process|automation|system)|supply chain|factory|additive manufactur|production planning|warehouse",
 "Mobility & transport":r"autonomous driving|self.driving|vehicle dynamics|aviation|aircraft|air traffic|transportation (system|network|planning)|traffic flow|freight|urban mobility",
 "Agriculture & food":r"agricultur|crop (yield|model|product)|farming|soil (health|carbon|microb)|fisheries|food (system|security|production)|livestock|irrigation",
 "Finance & economics":r"financial market|asset pricing|corporate finance|market design|economic (growth|policy|development)|insurance market|actuarial|labor economic",
 "Public policy & governance":r"public policy|policy analysis|governance|regulatory (policy|framework|agency)|misinformation|labor market|economic inequality|antitrust|international relations",
 "Water":r"water (resource|quality|supply|treatment|scarcity)|desalinat|wastewater|aquifer|groundwater",
}
# Home field inferred from appointment title, so cross-domain means aimed outside home.
NATIVE={
 "Health & clinical care":r"school of medicine|of medicine|radiolog|surgery|surgical|pediatric|psychiatr|anesthes|patholog|dermatolog|neurolog|obstetric|gynecolog|ophthalmolog|orthopaed|orthoped|urolog|otolaryngolog|emergency medicine|health policy|health research|epidemiolog|oncolog|cardiolog|nursing|primary care|internal medicine|bioengineering|biomedical",
 "Biology & molecular":r"\bbiology\b|biochemistr|genetics|microbiolog|immunolog|structural biolog|molecular and cellular|developmental biolog|biomedical data science|bioengineering",
 "Neuroscience & brain":r"neurobiolog|neuroscience|psycholog|psychiatr|neurosurger",
 "Energy & power":r"energy resources|nuclear engineering|energy science",
 "Climate, earth & ocean":r"earth system|geophysic|\boceans\b|environmental|sustainability|geolog|earth science",
 "Materials & chemistry":r"materials science|\bchemistry\b|chemical engineering",
 "Compute, chips & systems":r"computer science|electrical engineering|computational and mathematical|computer engineering",
 "Space":r"aeronautics|astronautics|\bphysics\b",
 "Finance & economics":r"\beconomics\b|graduate school of business|\bfinance\b|accounting",
 "Public policy & governance":r"\blaw\b|school of law|education|political science|sociolog|communication|philosoph|history|anthropolog|public policy|international studies",
 "Mobility & transport":r"civil and environmental",
 "Manufacturing & industry":r"management science|industrial engineering|operations research",
}
def hits(pm,txt): return [k for k,p in pm.items() if re.search(p,txt)]

AI=["Foundation models & NLP","Machine learning","Robotics & embodied"]
rows=[]
for f in F:
    title=f["title"].lower(); ints=f["interests"].lower()
    txt=title+" "+ints
    m=hits(METHODS,txt)
    d=hits(DOMAINS,txt)
    d_int=hits(DOMAINS,ints)   # domain must be asserted in the research text, not just the job title
    native=hits(NATIVE,title)
    ai_method=any(k in m for k in AI)
    cross=sorted({x for x in d_int if x not in native}) if ai_method else []
    rows.append({**f,"methods":m,"domains":d,"native":sorted(set(native)),"cross":cross,
                 "ai_method":ai_method,"has_interests":bool(f["interests"])})
json.dump(rows,open(os.path.join(SP,"faculty_classified.json"),"w",encoding="utf-8"),ensure_ascii=False)

print("TOTAL unique faculty:",len(rows))
print("with research-interest text:",sum(1 for r in rows if r["has_interests"]))
print("using an AI/robotics method:",sum(1 for r in rows if r["ai_method"]))
print("AI/robotics method aimed outside their own department:",sum(1 for r in rows if r["cross"]))
print()
for lbl,key in [("METHOD","methods"),("DOMAIN","domains")]:
    print("== "+lbl+" ==")
    for k,v in Counter(x for r in rows for x in r[key]).most_common(): print("  %5d  %s"%(v,k))
    print()
print("== AI/ROBOTICS METHOD x TARGET DOMAIN, cross-department only ==")
for a in AI:
    cc=Counter()
    for r in rows:
        if a in r["methods"]:
            for x in r["cross"]: cc[x]+=1
    n=sum(1 for r in rows if a in r["methods"])
    print("-- %s  (n=%d)"%(a,n))
    for k,v in cc.most_common(10): print("     %4d  %s"%(v,k))
