import json,os,sys,io,re,unicodedata
from collections import Counter
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
SP=os.path.dirname(os.path.abspath(__file__))
R=json.load(open(os.path.join(SP,"faculty_classified.json"),encoding="utf-8"))
BY_SLUG={r["slug"]:r for r in R}

# (slug, cluster, cross-domain target, lab/role, lab_url)
# Slugs are Stanford's own profile identifiers, taken from the census, so every link resolves.
# lab names and URLs are only those verified by fetching the source page in this session.
SRC="https://src.stanford.edu/about-people"
LABS="https://src.stanford.edu/labs"
SAIL="https://ai.stanford.edu/faculty/"
WANT=[
 # ---------- Robotics & physical AI
 ("oussama-khatib","Robotics & physical AI","","Stanford Robotics Lab; Director, Stanford Robotics Center","https://robotics.stanford.edu/"),
 ("chelsea-finn","Robotics & physical AI","","IRIS lab; co-founder of Physical Intelligence",LABS),
 ("shuran-song","Robotics & physical AI","","REALab (Robotics and Embodied AI)","https://real.stanford.edu/lab.html"),
 ("dorsa-sadigh","Robotics & physical AI","","ILIAD (Intelligent and Interactive Autonomous Systems)",LABS),
 ("jeannette-bohg","Robotics & physical AI","","IPRL (Interactive Perception and Robot Learning)",LABS),
 ("marco-pavone","Robotics & physical AI","Mobility & transport","Autonomous Systems Lab; Center for Automotive Research at Stanford",LABS),
 ("mac-schwager","Robotics & physical AI","","Multi-Robot Systems Lab",LABS),
 ("mykel-kochenderfer","Robotics & physical AI","Mobility & transport","Stanford Intelligent Systems Laboratory (SISL)",LABS),
 ("allison-okamura","Robotics & physical AI","Health & clinical care","CHARM Lab; haptics and teleoperation",LABS),
 ("mark-cutkosky","Robotics & physical AI","Manufacturing & industry","Biomimetics and Dexterous Manipulation Lab",LABS),
 ("monroe-kennedy","Robotics & physical AI","","Assistive Robotics and Manipulation Lab",LABS),
 ("steven-collins","Robotics & physical AI","Health & clinical care","Biomechatronics Lab; exoskeletons and prostheses",LABS),
 ("sean-follmer","Robotics & physical AI","","SHAPE Lab; haptics and accessible interfaces",LABS),
 ("c-karen-liu","Robotics & physical AI","Neuroscience & brain","The Movement Lab; human motion models",LABS),
 ("jiajun-wu","Robotics & physical AI","","Stanford Vision and Learning Lab; SRC executive committee",LABS),
 ("gracegao","Robotics & physical AI","Space","Navigation and Autonomous Vehicles Lab",LABS),
 ("somil-bansal","Robotics & physical AI","Mobility & transport","Safe autonomy; SRC faculty",SRC),
 ("john-salisbury","Robotics & physical AI","Health & clinical care","Professor (Research) of CS and of Surgery; surgical robotics",SRC),
 ("264302","Robotics & physical AI","Manufacturing & industry","Millirobots and morphing structures; SRC faculty",SRC),
 ("iro-armeni","Robotics & physical AI","Manufacturing & industry","Built-environment perception; SRC faculty",SRC),
 ("zerina-kapetanovic","Robotics & physical AI","Agriculture & food","Low-power sensing; SRC faculty",SRC),
 ("martin-fischer","Robotics & physical AI","Manufacturing & industry","Center for Integrated Facility Engineering",LABS),
 ("silvio-savarese","Robotics & physical AI","","Computer vision; SRC faculty",SRC),
 ("leonidas-guibas","Robotics & physical AI","","Geometric computation; SRC faculty",SRC),
 # ---------- Robotics/AI used on a different field entirely
 ("zhenan-bao","Robotics & physical AI","Materials & chemistry","Skin-inspired electronics; SRC faculty; Precourt senior fellow",SRC),
 ("manu-prakash","Robotics & physical AI","Global health, oceans","Prakash Lab, frugal science; SRC faculty; Woods senior fellow",SRC),
 ("karen-casciotti","Oceans, climate & earth","Robotics & sensing","Oceans; SRC faculty",SRC),
 ("fiorenza-micheli","Oceans, climate & earth","Robotics & sensing","Oceans; SRC faculty",SRC),
 ("krish-seetah","Oceans, climate & earth","Robotics & sensing","Oceans; SRC faculty",SRC),
 ("186687","AI x biology & medicine","Robotics & automation","Genome engineering; SRC faculty",SRC),
 ("sheng-xu","AI x biology & medicine","Robotics & sensing","Stanford Medicine; SRC faculty",SRC),
 ("carla-pugh","AI x biology & medicine","Robotics & sensing","Surgery; SRC faculty",SRC),
 ("scott-delp","AI x biology & medicine","Robotics & biomechanics","Director, Wu Tsai Human Performance Alliance at Stanford",SRC),
 ("ehsan-adeli","AI x biology & medicine","Psychiatry","CS and Psychiatry; SRC faculty",SRC),
 ("stephen-boyd","Foundation models & core AI","Optimization across fields","Convex optimization; SRC faculty",SRC),
 # ---------- Foundation models & core AI (SAIL roster)
 ("fei-fei-li","Foundation models & core AI","","Stanford Vision and Learning Lab; HAI advisory co-chair; founder of World Labs",SAIL),
 ("percy-liang","Foundation models & core AI","","Center for Research on Foundation Models; co-founder of Together AI",SAIL),
 ("chris-manning","Foundation models & core AI","","Stanford NLP Group; SAIL director",SAIL),
 ("christopher-re","Foundation models & core AI","","ML systems; co-founder of SambaNova, Snorkel, Together AI",SAIL),
 ("stefano-ermon","Foundation models & core AI","Energy & sustainability","Probabilistic reasoning and sustainability; founder of Inception",SAIL),
 ("tatsunori-hashimoto","Foundation models & core AI","","ML and NLP",SAIL),
 ("emma-brunskill","Foundation models & core AI","Education","Reinforcement learning and interactive learning",SAIL),
 ("tengyu-ma","Foundation models & core AI","","ML theory and deep learning",SAIL),
 ("sanmi-koyejo","Foundation models & core AI","Health, neuroscience","Trustworthy ML",SAIL),
 ("noah-goodman","Foundation models & core AI","Cognitive science","Cognitive science and probabilistic programming",SAIL),
 ("diyi-yang","Foundation models & core AI","Society","Social and human-centred NLP",SAIL),
 ("ludwig-schmidt","Foundation models & core AI","","Datasets and evaluation of foundation models",SAIL),
 ("carlos-guestrin","Foundation models & core AI","","ML systems, explainability, fairness",SAIL),
 ("yejin-choi","Foundation models & core AI","","SAIL faculty",SAIL),
 ("monica-lam","Foundation models & core AI","","NLP and virtual assistants",SAIL),
 ("248640","Foundation models & core AI","Health","Bayesian dynamic modelling; ML for health",SAIL),
 ("ron-fedkiw","Foundation models & core AI","Physics simulation","Physics, graphics and vision",SAIL),
 ("michael-genesereth","Foundation models & core AI","Law","Computational logic",SAIL),
 ("gordon-wetzstein","Foundation models & core AI","Imaging & displays","Computational imaging; SRC faculty",SRC),
 # ---------- AI x biology & medicine
 ("jure-leskovec","AI x biology & medicine","Networks, biomedicine","Graph learning; co-founder of Kumo.AI",SAIL),
 ("ron-dror","AI x biology & medicine","Drug design","ML plus molecular simulation","https://aisbdd.stanford.edu/people/ron-dror"),
 ("anshul-kundaje","AI x biology & medicine","Genomics","Computational genomics",SAIL),
 ("gill-bejerano","AI x biology & medicine","Genomics","Computational and experimental genomics",SAIL),
 ("james-zou","AI x biology & medicine","Physiology","Biomedical data science; founder of Human Intelligence","https://www.james-zou.com/"),
 ("russ-altman","AI x biology & medicine","Pharmacogenomics","Biomedical informatics","https://profiles.stanford.edu/russ-altman"),
 ("curtis-langlotz","AI x biology & medicine","Medical imaging","Director, Center for AI in Medicine and Imaging (AIMI)","https://aimi.stanford.edu/"),
 ("nigam-shah","AI x biology & medicine","Clinical decisions","Computational medicine; AIMI","https://aimi.stanford.edu/people"),
 ("possu-huang","AI x biology & medicine","Protein design","Protein Design Lab","http://www.proteindesign.org/"),
 ("michael-snyder","AI x biology & medicine","Genomics, wearables","Genetics; Healthcare Innovation Lab","https://innovations.stanford.edu/proteomics/"),
 ("stephen-quake","AI x biology & medicine","Biophysics","Bioengineering and applied physics","https://profiles.stanford.edu/stephen-quake"),
 ("jennifer-dionne","AI x biology & medicine","Proteomics","Founder and CEO, Pumpkinseed Bio","https://www.pumpkinseed.bio/"),
 # ---------- Neurotechnology
 ("jaimie-henderson","Neurotechnology","","Neural Prosthetics Translational Lab; Paradromics research partner","https://nptl.stanford.edu/"),
 ("francis-willett","Neurotechnology","","Neural decoding, NPTL; Paradromics research partner","https://nptl.stanford.edu/"),
 ("kwabena-boahen","Neurotechnology","Neuromorphic chips","Brains in Silicon","https://profiles.stanford.edu/kwabena-boahen"),
 # ---------- Energy, materials & sustainability
 ("yi-cui","Energy, materials & sustainability","","Faculty director, Sustainability Accelerator; founder of Amprius, EnerVenue, EEnotech, 4C Air, LifeLabs Design","https://sustainability-accelerator.stanford.edu/"),
 # ---------- Semiconductors, photonics & quantum
 ("jelena-vuckovic","Semiconductors, photonics & quantum","","Nanoscale and Quantum Photonics Lab","https://nqp.stanford.edu/"),
 ("amir-safavi-naeini","Semiconductors, photonics & quantum","","LINQS Lab","https://web.stanford.edu/~safavi/"),
 ("philip-wong","Semiconductors, photonics & quantum","","Chief Scientist of TSMC in an advisory role since 2020","https://web.stanford.edu/~hspwong/"),
 ("kunle-olukotun","Semiconductors, photonics & quantum","AI compute","Co-founder, SambaNova Systems","https://profiles.stanford.edu/kunle-olukotun"),
 ("mark-horowitz","Semiconductors, photonics & quantum","","Co-founder of Rambus; SRC faculty",SRC),
 ("srabanti-chowdhury","Semiconductors, photonics & quantum","Energy","Wide-bandgap devices","https://profiles.stanford.edu/srabanti-chowdhury"),
 ("sara-achour","Semiconductors, photonics & quantum","","Unconventional computing substrates","https://profiles.stanford.edu/sara-achour"),
 # ---------- Space & aerospace
 ("simone-damico","Space & aerospace","","Space Rendezvous Laboratory","https://profiles.stanford.edu/simone-damico"),
 ("juan-alonso","Space & aerospace","Mobility & transport","Aerospace Design Lab","https://profiles.stanford.edu/juan-alonso"),
 ("charbel-farhat","Space & aerospace","Simulation","Computational aerosciences","https://profiles.stanford.edu/charbel-farhat"),
 ("debbie-senesky","Space & aerospace","Extreme-environment devices","Extreme environment microsystems","https://profiles.stanford.edu/debbie-senesky"),
 ("manan-arya","Space & aerospace","Materials & chemistry","Deployable space structures","https://profiles.stanford.edu/manan-arya"),
 ("maria-sakovsky","Space & aerospace","Materials & chemistry","Adaptive space structures","https://profiles.stanford.edu/maria-sakovsky"),
 # ---------- Security
 ("dan-boneh","Security & cryptography","","Applied cryptography group","https://profiles.stanford.edu/dan-boneh"),
 # ---------- Institutions and capital
 ("james-landay","AI institutions & capital","","Denning Director, Stanford HAI, which merged with Stanford Data Science on 4 May 2026","https://hai.stanford.edu/"),
 ("john-hennessy","AI institutions & capital","","Co-chair, HAI advisory council","https://hai.stanford.edu/"),
]

out=[]; missing=[]
for slug,cluster,xdom,lab,url in WANT:
    r=BY_SLUG.get(slug)
    if not r: missing.append(slug); continue
    out.append({"name":r["name"],"slug":slug,"cluster":cluster,"xdomain":xdom,"lab":lab,"lab_url":url,
      "title":r["title"],"interests":r["interests"],
      "profile":"https://profiles.stanford.edu/"+slug,
      "orgs":r["orgs"],"methods":r["methods"],"domains":r["domains"],
      "native":r["native"],"cross":r["cross"]})
json.dump(out,open(os.path.join(SP,"nodes.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print("matched:",len(out)," missing:",missing)
for k,v in Counter(o["cluster"] for o in out).most_common(): print("  %3d  %s"%(v,k))
print("nodes with a stated cross-domain target:",sum(1 for o in out if o["xdomain"]))
print("nodes with interests text:",sum(1 for o in out if o["interests"]))
