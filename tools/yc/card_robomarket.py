# -*- coding: utf-8 -*-
"""Register the robotics-marketplace landscape as a Library card. Idempotent."""
import json, io, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
LIB = os.path.join(ROOT, "data", "library.js")
CARD_ID = "robotics-marketplace-map"

d = json.load(io.open(os.path.join(HERE, "robomarket.json"), encoding="utf-8"))
allp = [p for L in d["layers"] for p in L["players"]]
ycp = [p for p in allp if p.get("yc")]
recent = [p for p in ycp if p["yc"].split()[-1] in ("2025", "2026")]
ver = [p for p in allp if p.get("confidence") == "verified"]
n_layers = len(d["layers"])
counts = {L["label"]: len(L["players"]) for L in d["layers"]}

card = '''
{
  id: "%(id)s",
  axis: "money",
  kind: "brief",
  title: "Robotics marketplaces \\u2014 who is already building the parts counter",
  dek: "A landscape scan of everyone building some piece of one place where a robotics team browses arms, actuators and simulation environments by requirement, with AI doing the searching. Seven layers, %(n)d companies, %(yc)d of them YC-backed.",
  status: "live",
  date: "2026-10-19",
  owner: "anshu",
  open: "reports/robotics-marketplace-map.html",
  openLabel: "Open the scan",
  tags: ["robotics", "marketplace", "actuators", "simulation", "%(n)d companies"],
  metrics: [
    { v: "%(n)d", l: "Companies across seven layers of the stack" },
    { v: "%(recent)d of %(yc)d", l: "YC entrants that are 2025\\u201326 batches" },
    { v: "0", l: "Players spanning hardware + parts + sim under one search" },
    { v: "%(ver)d", l: "Read at the company's own page on the day" }
  ],
  body: [
    ["The question", "Anshu's framing, scanned against rather than assessed: a place where a robotics team comes in and browses arms by requirement, actuators by requirement, and simulation environments to pick from, all surfaced by AI search, so iteration loops tighten. He asked for the people and companies doing this and said explicitly not to vet the idea yet, so the page is descriptive and carries no verdict on the opportunity."],
    ["The shape of the answer", "Every layer has someone in it and nobody spans more than about half. The seven layers: robot and parts catalogs you can browse (%(c1)d), AI-native procurement marketplaces (%(c2)d), on-demand manufacturing for custom parts (%(c3)d), component search engines (%(c4)d), software and driver registries (%(c5)d), simulation and RL-environment supply (%(c6)d), and the component makers who would populate any of it (%(c7)d)."],
    ["The two closest to the brief", "ROBOTICS CENTER OF SILICON VALLEY (DeepAware AI, YC S25) is the closest on the physical side and closer than expected: a browsable catalog of 1,000+ products \\u2014 humanoids, arms, quadrupeds, dexterous hands, sensors, teleop kits \\u2014 buy or lease, with side-by-side comparison AND a partner programme letting third parties list, which makes it a marketplace rather than a reseller. It also runs a data marketplace (LeRobot/HDF5/RLDS), an RL-environments offering and cross-embodiment policy evaluation on real arms. Authorised distributor for Unitree, Wuji and UFACTORY; YC and NVIDIA Inception. REFRAME (YC W26) is the closest on procurement: it calls itself the only AI-native marketplace for hardware teams to procure both off-the-shelf and custom components, using agents to run the sourcing loop."],
    ["The software-side precedent nobody mentions in the same breath", "VIAM'S REGISTRY is the marketplace shape applied to the drivers rather than the parts \\u2014 Viam compares it to npm or PyPI for robotics. A machine config names a hardware model and viam-server pulls the matching driver automatically; publishers keep modules private to an org or publish publicly, and companies claim a namespace as official publisher. Worth holding alongside the hardware layer, because a parts catalog without drivers leaves the integration work with the buyer. Viam said in 2023 that paid modules were coming with Viam handling billing; that is NOT confirmed live."],
    ["Simulation is the youngest and least consolidated layer", "There is no general marketplace for simulation environments. There is a distribution MECHANISM (LeRobot pulls environments straight from the Hugging Face Hub by repo ID), a STANDARD (NVIDIA SimReady, ~1,000 hand-validated OpenUSD assets covering physics, semantics and behavioural metadata), and a cluster of very new YC companies selling environments as a service one customer at a time: Fern (W26), One Robot (W26), Twolabs (X26), Enact (S26, real-world rather than simulated), with Runtime.si (F26) and Robocurve (S26) on evaluation. All six are 2025\\u201326 batches, which dates the category precisely."],
    ["One company took the opposite position on purpose", "MANTLE (YC F26) is a full-stack field-service company for machines and robots, and its own copy says: 'We're not a marketplace or software tool, we own uptime directly to provide better, more reliable service without burdening your engineers on support calls.' Recorded because it is the clearest statement of the alternative model in the same market."],
    ["Negative results, recorded so they are not re-searched", "No funded marketplace dedicated to ROBOT PARTS specifically (actuators, arms, grippers) surfaced beyond Robotics Center \\u2014 searches returned component manufacturers and SEO market-report pages. No general marketplace for simulation environments exists. And no player found spans physical hardware + components + simulation under one AI-driven search; Robotics Center spans the most, Viam spans the software-module equivalent, and the two do not overlap."],
    ["Method", "The YC side is not a guess. It is a search over the full directory pull behind the RFS hardware map \\u2014 all 6,306 companies YC publishes, Summer 2005 to Summer 2027 \\u2014 filtered for marketplace, catalog and sourcing language intersected with robotics, parts and simulation language, then read one by one. Non-YC names are web-retrieved on 2026-10-19, each carrying its source and a confidence flag; %(ver)d of %(n)d were read at the company's own page. Where sources disagreed the disagreement is kept rather than averaged: Octopart's distributor count appears as 117, 200+ and 400+ across three pages, so no single figure is quoted."]
  ],
  files: [
    { p: "reports/robotics-marketplace-map.html", d: "The scan, self-contained" },
    { p: "tools/yc/robomarket.json", d: "The seven layers and %(n)d companies, each with a confidence flag" },
    { p: "tools/yc/build_robomarket.py", d: "Emits the scan into reports/" }
  ]
},
''' % dict(id=CARD_ID, n=len(allp), yc=len(ycp), recent=len(recent), ver=len(ver),
           c1=counts.get("Robot & parts catalogs you can actually browse", 0),
           c2=counts.get("AI-native procurement marketplaces for hardware teams", 0),
           c3=counts.get("On-demand manufacturing marketplaces (custom parts, AI quoting)", 0),
           c4=counts.get("Component search engines and spec aggregation", 0),
           c5=counts.get("Software and driver registries for robot hardware", 0),
           c6=counts.get("Simulation and RL-environment supply", 0),
           c7=counts.get("Component makers (supply side, not marketplaces)", 0))

PROV = ('  "%s": { kind: "web-2026-10-19", note: "NEW TO YOU. Landscape scan run 2026-10-19 against Anshu\'s own '
        'framing of a robotics parts-and-simulation marketplace. He asked for who is already doing this and said '
        'explicitly NOT to vet the idea yet, so the page and this card are DESCRIPTIVE and carry no assessment of the '
        'opportunity; the only judgement made is structural (which layers are crowded, which are empty) and it is '
        'labelled as such. TWO SOURCE LAYERS, different reliability. The YC layer is systematic: a search over the full '
        '6,306-company directory pull behind the yc-rfs-hardware-map card, filtered on marketplace/catalog/sourcing '
        'language intersected with robotics/parts/simulation language, then every hit read individually - so it has a '
        'denominator. The non-YC layer is web-retrieved the same day and is NOT a census; it is the players found worth '
        'recording. %d of %d entries were read at the company\'s own page and are marked verified; the rest are marked '
        'reported. Where sources disagreed the disagreement is preserved rather than averaged - Octopart\'s distributor '
        'count appears as 117, 200+ and 400+ across three pages and no single figure is quoted as fact. THREE NEGATIVE '
        'RESULTS are recorded deliberately so the next pass does not repeat the searches: no funded robot-parts-specific '
        'marketplace beyond Robotics Center, no general simulation-environment marketplace, and no player spanning '
        'hardware + components + simulation under one AI search. Company descriptions are each company\'s own words. '
        'Viam\'s paid-module capability is explicitly flagged UNCONFIRMED." },\n') % (CARD_ID, len(ver), len(allp))

src = io.open(LIB, encoding="utf-8").read()
if 'id: "%s"' % CARD_ID in src:
    print("card already present; leaving library.js alone")
else:
    src = src.replace("window.LIBRARY = [\n", "window.LIBRARY = [\n" + card, 1)
    src = src.replace("window.PROVENANCE = {\n", "window.PROVENANCE = {\n" + PROV, 1)
    io.open(LIB, "w", encoding="utf-8").write(src)
    print("inserted card %s" % CARD_ID)
print("players=%d yc=%d recent=%d verified=%d" % (len(allp), len(ycp), len(recent), len(ver)))
