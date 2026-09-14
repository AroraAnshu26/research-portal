import json, re, os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from collections import Counter

SP = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(SP, "yc_raw.json"), encoding="utf-8"))
# Batch order and short codes are derived from whatever yc_raw.json contains, so
# a batch added after this was written flows through without an edit here.
# Spring is X (W/S/F are already taken by Winter/Summer/Fall).
SEASON = {"Winter": 0, "Spring": 1, "Summer": 2, "Fall": 3}
LETTER = {"Winter": "W", "Spring": "X", "Summer": "S", "Fall": "F"}

def _key(name):
    s, y = name.split()
    return (int(y), SEASON[s])

B = sorted({c["batch"] for c in D if c.get("batch") and len(c["batch"].split()) == 2
            and c["batch"].split()[0] in SEASON}, key=_key)
BSHORT = {b: LETTER[b.split()[0]] + b.split()[1][-2:] for b in B}

# theme -> (strong regex for one_liner/tags, broad regex for description)
T = {
 "Robotics & Physical AI": (
   r"robot|humanoid|manipulat|teleoper|embodied|physical ai|vision.language.action|\bvla\b|dexter|autonomous (vehicle|truck|forklift|mobile|machine)|\bamr\b|self.driving|drone|actuator|end.effector",
   r"robot|humanoid|manipulat|teleoper|embodied|physical ai|sim.?to.?real|\bvla\b|dexterous|autonomous (vehicle|truck|forklift|mobile)|self.driving|drone|actuator|end.effector|motion planning|grasp"),
 "Defense & Aerospace": (
   r"defen[cs]e|military|munition|missile|interceptor|\bdod\b|warfare|battlefield|counter.?(drone|uas)|hypersonic|\bisr\b|radar|national security|army|navy|air force|contested",
   r"defen[cs]e (department|contract|prime|tech)|military|munition|missile|interceptor|\bdod\b|warfare|battlefield|counter.?(drone|uas)|hypersonic|electronic warfare|national security|dfars|\bitar\b"),
 "Space": (
   r"satellite|\borbit|launch vehicle|lunar|spacecraft|rocket|space|constellation",
   r"satellite|low earth orbit|\bleo\b|launch vehicle|lunar|spacecraft|rocket|in.space|space station|orbital"),
 "Semiconductors & Compute HW": (
   r"semiconductor|chip|\basic\b|\beda\b|lithograph|wafer|tapeout|photonic|\bfoundry\b|silicon|\bfpga\b|quantum comput|accelerator hardware|inference chip",
   r"semiconductor|chip design|\basic\b|\beda\b|lithograph|wafer|tapeout|photonic|silicon design|\bfpga\b|quantum comput|advanced packaging|verilog|rtl\b"),
 "Energy & Nuclear": (
   r"nuclear|fusion|geothermal|\bsmr\b|reactor|energy|grid|battery|solar|uranium|power",
   r"nuclear|fusion reactor|geothermal|\bsmr\b|power grid|electric grid|energy storage|battery (cell|chemistr|manufactur)|interconnection|uranium|megawatt|gigawatt|utility.scale"),
 "Data Centers & AI Infra HW": (
   r"data ?cent|colocation|liquid cooling|gpu (capacity|cluster|fleet)|compute (economy|capacity)|immersion cooling",
   r"data ?cent|colocation|liquid cooling|gpu cluster|rack.scale|immersion cooling|megawatt of compute"),
 "Bio & Life Sciences": (
   r"biotech|drug|therapeutic|protein|genomic|molecul|crispr|antibody|synthetic biolog|vaccine|cancer|peptide|mrna|enzyme|bioreactor|clinical trial|biolog|pharma|cell therapy",
   r"drug discovery|therapeutic|protein (design|structure|engineering)|genomic|molecular (simulation|discovery)|crispr|antibody|synthetic biolog|vaccine|oncolog|peptide|mrna|enzyme|bioreactor|clinical trial|preclinical|\bfda\b|biomanufactur"),
 "Manufacturing & Industrial": (
   r"manufactur|factory|machining|\bcnc\b|welding|foundry|fabricat|metal|mill|industrial|shop floor|3d print|additive|mining|injection mold|machine shop",
   r"manufactur|factory floor|machining|\bcnc\b|welding|fabricat|steel|aluminum|shop floor|3d print|additive manufactur|mining|injection mold|\bplc\b|\bscada\b|bill of materials|tooling"),
 "Supply Chain & Logistics": (
   r"supply chain|logistics|freight|shipping|warehouse|fulfilment|fulfillment|trucking|customs|port|inventory|last mile|3pl",
   r"supply chain|logistics|freight|shipping (carrier|line)|warehouse|fulfilment|fulfillment|trucking|customs broker|container|last mile|\b3pl\b|procurement of parts"),
 "Healthcare Delivery & Admin": (
   r"health|patient|clinic|medical|physician|\behr\b|payer|nurse|dental|medicare|medicaid|care\b|hospital|pharmacy|revenue cycle|prior authorization",
   r"patient|clinic|physician|\behr\b|payer|prior authorization|nurse|dental|medicare|medicaid|revenue cycle|hospital|pharmacy|health system|claims"),
 "Fintech & Stablecoins": (
   r"stablecoin|payment|bank|lending|underwrit|invoice|accounting|treasury|payroll|insurance|fintech|hedge fund|trading|tax|neobank|remittance|credit|financial|capital markets|\bcfo\b",
   r"stablecoin|payments? (rail|infrastructure|processing)|banking|lending|underwriting|invoice|accounting|treasury|payroll|insurance|hedge fund|trading desk|neobank|remittance|credit risk|\bkyc\b|\baml\b|broker.dealer"),
 "Crypto & Web3": (
   r"crypto|blockchain|web3|\bnft\b|ethereum|solana|on.?chain|\bdefi\b|token|wallet|smart contract",
   r"crypto|blockchain|web3|\bnft\b|ethereum|solana|on.?chain|\bdefi\b|tokeniz|smart contract|validator|\bl2\b"),
 "AI Agents & Automation": (
   r"\bagent(s|ic)?\b|automat|digital (worker|employee)|\bai employee|\brpa\b|workflow|autonomous software|browser use|computer use",
   r"\bagents?\b|agentic|automate (the|your|back.office|manual|repetitive|workflow)|workflow automation|\brpa\b|digital (worker|employee)|browser automation|computer use|multi.agent|tool calling"),
 "Dev Tools & AI Coding": (
   r"developer|devtool|\bsdk\b|ci/cd|observability|kubernetes|codebase|coding agent|code (generation|review|editor|search)|cursor for|compiler|open.source|\bdatabase\b|debugg|api (platform|gateway|management)|\bide\b|terminal",
   r"developer (tool|experience|platform)|\bsdk\b|ci/cd|observability|kubernetes|codebase|code generation|coding agent|pull request|open.source|database|compiler|type.safe|deploy(ment)? pipeline|software engineer"),
 "AI Infrastructure & Models": (
   r"foundation model|\bllm\b|large language model|fine.?tun|inference|vector (database|search)|\brag\b|training data|world model|\bgpu|embedding|synthetic data|reinforcement learning|model (serving|eval|weights)",
   r"foundation model|\bllm\b|large language model|fine.?tun|inference (engine|server|cost|optimiz)|vector (database|search)|retrieval.augmented|\brag\b|training (data|run|cluster)|model (serving|evaluation|weights)|gpu (orchestr|schedul|utiliz)|world model|reinforcement learning|synthetic data"),
 "Vertical & Enterprise SaaS": (
   r"\bsaas\b|enterprise|\bcrm\b|\berp\b|platform for|software for|back.?office|compliance|audit|contract|procurement|sales|marketing|recruiting|\bhr\b|legal|real estate|construction|restaurant|retail|dealership|insurance brokerage",
   r"\bsaas\b|enterprise software|\bcrm\b|\berp\b|back.office|compliance|audit|contract (review|lifecycle|management)|procurement|sales team|marketing team|recruiting|legal team|law firm|property manag|construction (firm|project)|restaurant|dealership"),
 "Consumer & Media": (
   r"consumer|social network|dating|creator|fitness|shopping|gaming|video (editing|generation)|music|entertainment|companion|education|tutor|students|classroom|travel",
   r"consumer app|social (network|app|feed)|dating|creator economy|fitness|shopping|gaming|video generation|music generation|entertainment|companion|students|tutor|classroom|travel booking"),
 "Climate & Carbon": (
   r"carbon|climate|emission|decarbon|\bccus\b|recycl|waste|water|sustainab",
   r"carbon (capture|credit|accounting|removal)|climate|emissions|decarboniz|\bccus\b|recycling|waste stream|water treatment|scope [123]"),
 "Security": (
   r"security|cyber|pentest|soc 2|threat|vulnerabilit|zero trust|fraud|identity|deepfake|authentication",
   r"cybersecurity|infosec|penetration test|soc 2|threat detection|vulnerabilit|zero trust|fraud detection|identity verification|deepfake|phishing|siem"),
 "Government & Public Sector": (
   r"government|public sector|municipal|federal|permit|civic|police|emergency|\bgsa\b|city\b|state agency",
   r"government agenc|public sector|municipal|federal (agency|government|contract)|permitting|civic|police department|emergency response|\bgsa\b|rfp\b"),
}
ORDER = list(T.keys())
STRONG = {k: re.compile(v[0]) for k, v in T.items()}
BROAD = {k: re.compile(v[1]) for k, v in T.items()}

SUBPRIOR = {
 "Industrials -> Manufacturing and Robotics": ["Robotics & Physical AI", "Manufacturing & Industrial"],
 "Industrials -> Aviation and Space": ["Space", "Defense & Aerospace"],
 "Industrials -> Defense": ["Defense & Aerospace"],
 "Industrials -> Energy": ["Energy & Nuclear"],
 "Industrials -> Drones": ["Robotics & Physical AI", "Defense & Aerospace"],
 "Industrials -> Climate": ["Climate & Carbon"],
 "Industrials -> Agriculture": ["Manufacturing & Industrial"],
 "Industrials -> Automotive": ["Robotics & Physical AI"],
 "Healthcare -> Therapeutics": ["Bio & Life Sciences"],
 "Healthcare -> Drug Discovery and Delivery": ["Bio & Life Sciences"],
 "Healthcare -> Industrial Bio": ["Bio & Life Sciences"],
 "Healthcare -> Medical Devices": ["Bio & Life Sciences"],
 "Healthcare -> Diagnostics": ["Bio & Life Sciences"],
 "Healthcare -> Healthcare IT": ["Healthcare Delivery & Admin"],
 "Healthcare -> Healthcare Services": ["Healthcare Delivery & Admin"],
 "Healthcare -> Consumer Health and Wellness": ["Healthcare Delivery & Admin"],
 "B2B -> Supply Chain and Logistics": ["Supply Chain & Logistics"],
 "B2B -> Security": ["Security"],
 "B2B -> Infrastructure": ["Dev Tools & AI Coding", "AI Infrastructure & Models"],
 "B2B -> Engineering, Product and Design": ["Dev Tools & AI Coding"],
 "B2B -> Legal": ["Vertical & Enterprise SaaS"],
 "B2B -> Finance and Accounting": ["Fintech & Stablecoins"],
 "Fintech -> Payments": ["Fintech & Stablecoins"],
 "Fintech -> Insurance": ["Fintech & Stablecoins"],
 "Fintech -> Banking and Exchange": ["Fintech & Stablecoins"],
 "Fintech -> Credit and Lending": ["Fintech & Stablecoins"],
 "Fintech -> Asset Management": ["Fintech & Stablecoins"],
 "Fintech -> Consumer Finance": ["Fintech & Stablecoins"],
 "Real Estate and Construction -> Construction": ["Vertical & Enterprise SaaS"],
 "Government": ["Government & Public Sector"],
 "Education": ["Consumer & Media"],
 "Consumer -> Gaming": ["Consumer & Media"],
 "Consumer -> Content": ["Consumer & Media"],
 "Consumer -> Social": ["Consumer & Media"],
 "Consumer -> Consumer Electronics": ["Consumer & Media"],
}

FLAGS = {
 "ai": r"\bai\b|a\.i\.|artificial intelligence|\bllm\b|machine learning|\bgpt|foundation model|neural net|deep learning|transformer model",
 "agentic": r"\bagents?\b|agentic",
 "atoms": r"robot|hardware|manufactur|factory|satellite|rocket|nuclear|fusion|semiconductor|chip|reactor|drone|vehicle|machine|physical|material|battery|device|sensor|bioreactor|\bmill\b|foundry|warehouse|data ?cent|wafer|metal",
 "physical_ai": r"physical ai|embodied|vision.language.action|\bvla\b|world model|sim.?to.?real|teleoper|manipulat|humanoid|dexterous|robot (foundation|policy|learning|brain|data)|real.world data",
 "frontier": r"nuclear|fusion|hypersonic|quantum|humanoid|satellite|rocket|lunar|orbit|semiconductor|chip design|photonic|superconduct|neural interface|brain.computer|gene (editing|therapy)|synthetic biolog|carbon capture|desalinat|reactor|plasma|cryogen|propulsion|autonomous (vehicle|truck|aircraft|ship)|\bevtol\b|\buav\b|robot|interceptor|missile|laser|radar|wafer|lithograph",
 "regulated": r"\bfda\b|\bfaa\b|\bnrc\b|\bitar\b|\bnhtsa\b|\bhipaa\b|\bfinra\b|clinical trial|regulatory approval|certification|homologat|\biso \d|export control|\bcmmc\b|fedramp|\bdfars\b|\bsoc 2\b",
 "govt_buyer": r"government|federal|\bdod\b|\barmy\b|\bnavy\b|air force|municipal|public sector|state agenc|\bnasa\b|defense department",
 "capital_intensive": r"factory|\bfab\b|foundry|\bplant\b|\bmill\b|reactor|launch|constellation|fleet of|manufacturing (facility|line)|data ?cent|capex|pilot line|gigafactory|megawatt|gigawatt",
 "open_source": r"open.source",
 "datacenter": r"data ?cent|colocation|liquid cooling|gpu (capacity|cluster|fleet|utiliz)|megawatt|immersion cooling|compute (economy|capacity)",
 "humanoid": r"humanoid",
 "world_model": r"world model|neural simulat|learned simulat",
 "robot_data": r"(real.world|robot|embodied|physical) (data|dataset|demonstration)|teleoper|data collection (rig|for robot)|rl environment|annotation for robot",
 "defense_tech": r"defen[cs]e|military|dod|munition|missile|interceptor|warfare|battlefield|counter.?(drone|uas)|national security|isr|hypersonic",
 "stablecoin": r"stablecoin|usdc|genius act",
 "space_flag": r"satellite|orbit|launch vehicle|lunar|spacecraft|rocket|space station",
 "nuclear": r"nuclear|fusion|smr|reactor|uranium|fission",
 "semis": r"semiconductor|chip design|asic|eda|lithograph|wafer|tapeout|photonic|silicon design|inference chip|advanced packaging",
 "biotech": r"biotech|drug discovery|therapeutic|protein design|genomic|crispr|antibody|synthetic biolog|vaccine|peptide|mrna|clinical trial|enzyme|bioreactor",
 "coding_agent": r"coding agent|writes code|code generation|cursor for|software engineer(ing)? agent|pull request|codegen|vibe cod",
 "voice": r"voice (ai|agent|bot)|phone call|speech.to.text|call cent|cold call",
 "china_supply": r"export control|tariff|reshor|onshor|near.?shor|china|allied manufactur|domestic (production|manufactur|supply)",
}
FC = {k: re.compile(v) for k, v in FLAGS.items()}

def fields(c):
    ol = (c.get("one_liner") or "").lower()
    tg = " ".join(c.get("tags") or []).lower()
    ds = (c.get("long_description") or "").lower()
    sub = (c.get("subindustry") or "")
    return ol, tg, ds, sub

out = []
for c in D:
    ol, tg, ds, sub = fields(c)
    score = {}
    NARROW = {"Data Centers & AI Infra HW":5,"Semiconductors & Compute HW":4,"Space":4,
              "Defense & Aerospace":4,"Energy & Nuclear":3,"Robotics & Physical AI":3,
              "Bio & Life Sciences":3,"Crypto & Web3":3}
    for th in ORDER:
        s = 0
        if STRONG[th].search(ol): s += 4 + NARROW.get(th, 0)
        if STRONG[th].search(tg): s += 3
        hits = len(set(m.group(0) for m in BROAD[th].finditer(ds)))
        s += min(hits, 3)
        if sub in SUBPRIOR and th in SUBPRIOR[sub]:
            s += 6 - SUBPRIOR[sub].index(th)
        score[th] = s
    best = max(ORDER, key=lambda t: (score[t], -ORDER.index(t)))
    theme = best if score[best] >= 4 else "Other / Unclassified"
    allt = " ".join([ol, tg, ds, sub.lower(), (c.get("industry") or "").lower()])
    fl = [k for k, rx in FC.items() if rx.search(allt)]
    regions = c.get("regions") or []
    if "United States of America" in regions:
        geo = "United States"
    else:
        geo = "Unspecified"
        for r in regions:
            if r not in ("Remote","Partly Remote","Fully Remote","Unspecified","America / Canada"):
                geo = r
                break
    out.append({
        "name": c["name"], "slug": c["slug"], "batch": c["batch"], "b": BSHORT[c["batch"]],
        "one_liner": (c.get("one_liner") or "").strip(),
        "desc": (c.get("long_description") or "").strip()[:600],
        "theme": theme, "score": score[best], "flags": fl,
        "status": c.get("status"), "stage": c.get("stage"),
        "industry": c.get("industry"), "sub": c.get("subindustry"),
        "team": c.get("team_size"), "geo": geo,
        "tags": c.get("tags") or [], "website": c.get("website"),
        "url": "https://www.ycombinator.com/companies/" + c["slug"],
    })

json.dump(out, open(os.path.join(SP, "companies.json"), "w", encoding="utf-8"), ensure_ascii=False)
print("companies:", len(out), "unclassified:", sum(1 for c in out if c["theme"] == "Other / Unclassified"))

themes = ORDER + ["Other / Unclassified"]
print("\n" + " " * 30 + "".join(f"{BSHORT[b]:>6s}" for b in B) + "   TOTAL")
tr = {}
tot = {}
for th in themes:
    row = []
    for b in B:
        sub = [c for c in out if c["batch"] == b]
        row.append(round(100 * sum(1 for c in sub if c["theme"] == th) / len(sub), 1))
    tr[th] = row
    tot[th] = sum(1 for c in out if c["theme"] == th)
    print(f"{th[:29]:30s}" + "".join(f"{v:6.1f}" for v in row) + f"   {tot[th]:5d}")

print("\nFLAGS")
fr = {}
for k in FLAGS:
    row = []
    for b in B:
        sub = [c for c in out if c["batch"] == b]
        row.append(round(100 * sum(1 for c in sub if k in c["flags"]) / len(sub), 1))
    fr[k] = row
    print(f"{k:30s}" + "".join(f"{v:6.1f}" for v in row))

for st in ["Active", "Inactive", "Acquired"]:
    row = []
    for b in B:
        sub = [c for c in out if c["batch"] == b]
        row.append(round(100 * sum(1 for c in sub if c["status"] == st) / len(sub), 1))
    fr["status_" + st] = row
    print(f"{('status ' + st):30s}" + "".join(f"{v:6.1f}" for v in row))

row = []
for b in B:
    ts = sorted(c["team"] for c in out if c["batch"] == b and isinstance(c["team"], int))
    row.append(ts[len(ts) // 2] if ts else 0)
fr["median_team"] = row
print(f"{'median team':30s}" + "".join(f"{v:6d}" for v in row))

row = []
for b in B:
    sub = [c for c in out if c["batch"] == b]
    row.append(round(100 * sum(1 for c in sub if c["geo"] == "United States") / len(sub), 1))
fr["us_share"] = row
print(f"{'US share':30s}" + "".join(f"{v:6.1f}" for v in row))

json.dump({"batches": B, "short": [BSHORT[b] for b in B],
           "n": [sum(1 for c in out if c["batch"] == b) for b in B],
           "themes": tr, "totals": tot, "flags": fr},
          open(os.path.join(SP, "trends.json"), "w"))
print("\nwrote trends.json")
