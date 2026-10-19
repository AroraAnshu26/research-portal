# -*- coding: utf-8 -*-
"""Match the YC directory against the hardware/space/defense RFS themes.

Reads yc_raw_all.json (full-history pull, all batches) and scores every company
against the eight RFS requests Anshu pulled from ycombinator.com/rfs, plus the
adjacent hardware themes. Writes rfs_companies.json.

Scoring mirrors classify2.py: a hit in the one-liner counts most, then YC's own
tags, then the long description. Word boundaries everywhere -- the cheap failure
here is "space" matching "workspace" and "mill" matching "million", which is why
every pattern below is anchored and several carry explicit negatives.
"""
import json, re, os, io
from collections import Counter, defaultdict

SP = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- themes
# Each theme: required "anchor" family (must hit at least one) and optional
# "boost" terms. Anchors are what make the theme that theme; boosts only rank.
THEMES = {
  "electronics-in-space": dict(
    label="Electronics in Space", rfs="Summer 2026", author="Philip Johnston",
    anchors=[r"\bin[- ]space\b", r"\bsatellites?\b", r"\bspacecraft\b", r"\borbital\b",
             r"\bin[- ]orbit\b", r"\bLEO\b", r"\bsmallsats?\b", r"\bcubesats?\b",
             r"\bradiation[- ]hardened\b", r"\brad[- ]hard\b", r"\bspace[- ]grade\b",
             r"\bconstellations?\b", r"\bspace\b(?!\s*(?:for|to|where|that|is|with)\b)"],
    boost=[r"\bchips?\b", r"\bsilicon\b", r"\binference\b", r"\bcompute\b", r"\bprocessors?\b",
           r"\bedge\b", r"\bavionics\b", r"\bpayloads?\b", r"\bsensors?\b", r"\bASIC\b", r"\bFPGA\b"],
    neg=[r"\bworkspace", r"\bheadspace", r"\bspace\s+for\s+(?:teams|work)", r"\bairspace\b"],
  ),
  "industrial-capabilities-in-space": dict(
    label="Industrial Capabilities in Space", rfs="Summer 2026", author="Adi Oltean",
    anchors=[r"\bregolith\b", r"\blunar\b", r"\bmoon\b", r"\basteroids?\b", r"\bISRU\b",
             r"\bin[- ]space manufacturing\b", r"\borbital manufacturing\b",
             r"\bspace stations?\b", r"\bin[- ]space assembly\b", r"\bmicrogravity\b",
             r"\bspace mining\b", r"\bspace manufacturing\b"],
    boost=[r"\bmining\b", r"\bextract\w*\b", r"\belectrolysis\b", r"\b3d[- ]print\w*\b",
           r"\bmanufactur\w*\b", r"\btitanium\b", r"\bsilicon\b", r"\bfoundry\b", r"\bsmelt\w*\b"],
    neg=[r"\bmoonshot\b", r"\bover the moon\b"],
  ),
  "hardware-supply-chain": dict(
    label="Hardware Supply Chain", rfs="Summer 2026", author="Nicolas Dessaigne",
    # "sourcing", "procurement", "suppliers" and "prototyping" on their own are
    # how an AP-automation fintech and a real-estate marketplace scored as
    # hardware supply chain. They rank, they no longer qualify.
    anchors=[r"\bcontract manufactur\w*\b", r"\bCNC\b", r"\binjection moul?ding\b",
             r"\bPCBA?\b", r"\bactuators?\b", r"\bmachining\b",
             r"\bsheet metal\b", r"\bbill of materials\b", r"\bBOM\b",
             r"\bfabricat\w*\b", r"\bhardware (?:teams?|companies|startups?|iteration|supply)\b",
             r"\bmachine shops?\b", r"\bfactor(?:y|ies)\b", r"\bmanufactur\w*\b",
             r"\bsupplier networks?\b", r"\bhardware supply\b", r"\bmechanical parts?\b"],
    boost=[r"\bhardware\b", r"\bfaster\b", r"\blead times?\b", r"\bShenzhen\b", r"\bparts?\b",
           r"\bsupply chains?\b", r"\bdesign\b", r"\blogistics\b", r"\bCAD\b",
           r"\bsourcing\b", r"\bprocurement\b", r"\bsuppliers?\b", r"\bprototyp\w*\b", r"\btooling\b"],
    neg=[r"\bsoftware supply chain\b", r"\bfood supply\b"],
  ),
  "supply-chain-for-semiconductors": dict(
    label="Supply Chain 2.0 for Semiconductors", rfs="Summer 2026", author="Diana Hu",
    anchors=[r"\bsemiconductors?\b", r"\bwafers?\b", r"\bfoundr(?:y|ies)\b", r"\bfabs?\b",
             r"\btape[- ]?out\b", r"\bEDA\b", r"\bchip design\b", r"\bHBM\b",
             r"\badvanced packaging\b", r"\bchip supply\b", r"\bchiplets?\b",
             r"\blithograph\w*\b", r"\bTSMC\b", r"\bASML\b"],
    boost=[r"\bsupply chains?\b", r"\ballocation\b", r"\bexport controls?\b", r"\bCHIPS Act\b",
           r"\bcompliance\b", r"\bvisibility\b", r"\bsilicon\b", r"\byield\b", r"\bmetrology\b"],
    neg=[r"\bprefab\b", r"\bfabric\b"],
  ),
  "modern-metal-mills": dict(
    label="Modern Metal Mills", rfs="Spring 2026", author="Zane Hengsperger",
    anchors=[r"\bsteel\b", r"\baluminum\b", r"\baluminium\b", r"\bmetal mills?\b",
             r"\brolling mills?\b", r"\bsmelt\w*\b", r"\bforging\b", r"\bcasting\b",
             r"\bextrusions?\b", r"\bmetallurg\w*\b", r"\bfoundr(?:y|ies)\b",
             r"\bmetals?\b", r"\bmills?\b(?!\w)", r"\bheavy industry\b"],
    boost=[r"\bMES\b", r"\bscheduling\b", r"\bproduction planning\b", r"\blead times?\b",
           r"\bindustrial\b", r"\bplants?\b", r"\breindustrial\w*\b", r"\bfactory\b",
           r"\bautomation\b", r"\benergy\b", r"\bquoting\b"],
    neg=[r"\bmillions?\b", r"\bmillennial", r"\bwindmill", r"\btreadmill", r"\bmilli[sm]",
         r"\bbare[- ]metal\b", r"\bheavy metal\b", r"\bprecious metals?\b", r"\bmetal bands?\b"],
  ),
  "the-future-of-american-defense": dict(
    label="The Future of American Defense", rfs="Fall 2026", author="Daniel P. Driscoll, US Secretary of the Army",
    anchors=[r"\bdefen[cs]e\b", r"\bmilitary\b", r"\bDoD\b", r"\bwarfighters?\b",
             r"\bcounter[- ]?UAS\b", r"\binterceptors?\b", r"\bmunitions?\b",
             r"\bnational security\b", r"\bUAVs?\b", r"\bdrones?\b", r"\bISR\b",
             r"\bArmy\b", r"\bNavy\b", r"\bAir Force\b", r"\bPentagon\b",
             r"\bautonomous weapons?\b", r"\bbattlefield\b", r"\btactical\b"],
    boost=[r"\bautonomy\b", r"\bswarms?\b", r"\bC2\b", r"\bsensors?\b", r"\bradar\b",
           r"\bgovernment\b", r"\bsecure\b", r"\bmissions?\b", r"\bresilient\b", r"\blogistics\b"],
    neg=[r"\bself[- ]defen[cs]e\b", r"\bdefensive driving\b", r"\bdefend your\b"],
  ),
  "compute-at-sea": dict(
    label="Compute at Sea", rfs="Fall 2026", author="Francois Chaubard",
    anchors=[r"\bfloating data ?cent(?:er|re)s?\b", r"\boffshore\b", r"\bat sea\b",
             r"\bmaritime\b", r"\bsubsea\b", r"\bocean\b", r"\bbarges?\b",
             r"\bship(?:board|ping vessels?)\b", r"\bvessels?\b", r"\bmarine\b"],
    boost=[r"\bdata ?cent(?:er|re)s?\b", r"\bcompute\b", r"\bcooling\b", r"\bmegawatts?\b",
           r"\bpower\b", r"\bGPUs?\b", r"\bcapacity\b", r"\bmodular\b"],
    neg=[r"\bocean of\b", r"\bblue ocean\b"],
  ),
  "new-operating-systems-for-the-physical-world": dict(
    label="New Operating Systems for the Physical World", rfs="Fall 2026", author="Charlie Warren",
    anchors=[r"\bfield service\w*\b", r"\bdeskless\b", r"\bfrontline\b", r"\bwork orders?\b",
             r"\bdispatch\w*\b", r"\bCMMS\b", r"\btechnicians?\b", r"\bcontractors?\b",
             r"\bconstruction\b", r"\bfleets?\b", r"\bmaintenance\b", r"\bHVAC\b",
             r"\bplumb\w*\b", r"\bblue[- ]collar\b", r"\btrades(?:people)?\b",
             r"\bphysical world\b", r"\bjob sites?\b", r"\bfacilit(?:y|ies) management\b"],
    boost=[r"\boperating systems?\b", r"\bschedul\w*\b", r"\bAI agents?\b", r"\brobots?\b",
           r"\bwearables?\b", r"\bassets?\b", r"\bbilling\b", r"\bindustrial\b", r"\bsafety\b"],
    neg=[r"\bconstruction of a\b", r"\bunder construction\b"],
  ),
}

# Adjacent themes Anshu did not link but that sit in the same thesis.
ADJACENT = {
  "counter-swarm-defense": dict(
    label="Counter-Swarm Defense", rfs="Summer 2026", author="Tyler Bosmeny",
    anchors=[r"\bcounter[- ]?(?:drone|UAS|swarm)\b", r"\bdrone defen[cs]e\b",
             r"\bswarms?\b", r"\binterceptors?\b", r"\bjamm\w*\b", r"\bRF detection\b"],
    boost=[r"\bdrones?\b", r"\bdefen[cs]e\b", r"\bradar\b", r"\bautonomy\b", r"\bsensors?\b"],
    neg=[],
  ),
  "inference-chips": dict(
    label="Inference Chips for Agent Workflows", rfs="Summer 2026", author="Diana Hu",
    anchors=[r"\binference chips?\b", r"\bAI (?:chips?|accelerators?|silicon)\b",
             r"\bASICs?\b", r"\baccelerators?\b", r"\bchip architectures?\b",
             r"\bcustom silicon\b", r"\bRISC[- ]?V\b", r"\bphotonic\w*\b", r"\bneuromorphic\b"],
    boost=[r"\binference\b", r"\bcompilers?\b", r"\bGPUs?\b", r"\bthroughput\b",
           r"\blatency\b", r"\bagents?\b", r"\bKV cache\b", r"\bsilicon\b"],
    neg=[r"\bpoker chips\b"],
  ),
  "robotics-general": dict(
    label="Robotics (general hard-tech base)", rfs="cross-cutting", author="-",
    anchors=[r"\brobots?\b", r"\brobotics?\b", r"\bhumanoids?\b", r"\bmanipulat\w*\b",
             r"\bautonomous (?:vehicles?|mobile)\b", r"\bAMRs?\b", r"\bteleoperat\w*\b",
             r"\bend effectors?\b", r"\bgrippers?\b", r"\bVLA\b", r"\bembodied\b"],
    boost=[r"\bwarehouse\b", r"\bfactory\b", r"\bautomation\b", r"\bRL\b",
           r"\bfoundation models?\b", r"\bperception\b", r"\bactuators?\b"],
    neg=[r"\bprocess automation\b", r"\brobotic process\b", r"\bRPA\b"],
  ),
}

ALL = dict(THEMES); ALL.update(ADJACENT)
for v in ALL.values():
    v["_a"] = [re.compile(p, re.I) for p in v["anchors"]]
    v["_b"] = [re.compile(p, re.I) for p in v["boost"]]
    v["_n"] = [re.compile(p, re.I) for p in v.get("neg", [])]


def fields(c):
    one = c.get("one_liner") or ""
    desc = c.get("long_description") or ""
    tags = " ".join(c.get("tags") or [])
    ind = " ".join([c.get("industry") or "", c.get("subindustry") or ""] + (c.get("industries") or []))
    return one, desc, tags, ind


def score(c, th):
    one, desc, tags, ind = fields(c)
    blob = " ".join([one, tags, ind, desc])
    # negatives are scrubbed from the text before testing, not used as a veto:
    # a company can legitimately say "millions" and still be a steel mill.
    clean = blob
    for n in th["_n"]:
        clean = n.sub(" ", clean)
    one_c, tags_c, ind_c, desc_c = one, tags, ind, desc
    for n in th["_n"]:
        one_c = n.sub(" ", one_c); tags_c = n.sub(" ", tags_c)
        ind_c = n.sub(" ", ind_c); desc_c = n.sub(" ", desc_c)

    s = 0; hits = []
    anchored = False
    strong = False   # anchor landed in a field the company chose to describe itself
    for rx in th["_a"]:
        if rx.search(one_c): s += 5; anchored = strong = True; hits.append(("one", rx.pattern))
        elif rx.search(tags_c): s += 4; anchored = strong = True; hits.append(("tag", rx.pattern))
        elif rx.search(ind_c): s += 3; anchored = strong = True; hits.append(("ind", rx.pattern))
        elif rx.search(desc_c): s += 2; anchored = True; hits.append(("desc", rx.pattern))
    # A theme word buried in the long description is how "Muzz" became a chip
    # company. Require the anchor in the one-liner / tags / industry, unless the
    # description evidence is overwhelming.
    if not anchored or (not strong and s < 10):
        return 0, [], ""
    for rx in th["_b"]:
        if rx.search(one_c): s += 2; hits.append(("one+", rx.pattern))
        elif rx.search(desc_c) or rx.search(tags_c): s += 1; hits.append(("desc+", rx.pattern))

    # evidence window: the brain's lesson -- print the text a judgement rests on
    ev = ""
    for rx in th["_a"]:
        m = rx.search(clean)
        if m:
            i = max(0, m.start() - 110)
            ev = clean[i:m.end() + 110].strip().replace("\n", " ")
            break
    return s, hits, ev


def main():
    raw = json.load(io.open(os.path.join(SP, "yc_raw_all.json"), encoding="utf-8"))
    print("companies in directory:", len(raw))

    THRESH = 6
    # Hand-checked false positives: the theme word is real but means something
    # else in that company's sentence. Each is a company whose evidence window
    # was read in full before it was struck out.
    EXCLUDE = {
      ("modern-metal-mills", "metal-2"),            # "Metal is an AI-driven OS for fundraising"
      ("modern-metal-mills", "cumbuca"),          # "bare-metal access" to Brazilian banking
      ("modern-metal-mills", "pure"),             # marketplace for rare coins
      ("modern-metal-mills", "givemetap"),        # stainless steel water bottles
      ("modern-metal-mills", "metalbook"),        # kept only if metals trading, re-check
      ("compute-at-sea", "venostent"),            # "blood vessels"
      ("inference-chips", "rex"), ("inference-chips", "aisle50"),
      ("inference-chips", "muzz"), ("inference-chips", "razorpay"),
      ("inference-chips", "mixerbox"), ("inference-chips", "teamnote"),
      ("supply-chain-for-semiconductors", "predxion-bio"),
      # maritime, but no compute -- the RFS is about siting DATA CENTERS at sea
      ("compute-at-sea", "greywing"), ("compute-at-sea", "regent"),
      # silicon photonics for health wearables, not AI inference silicon
      ("inference-chips", "siphox-health"),
      # "drone" is not "defense": mosquito control, warehouse inventory, dive gear
      ("the-future-of-american-defense", "tornyol"),
      ("the-future-of-american-defense", "corvus-robotics"),
      ("the-future-of-american-defense", "daivin"),
      ("electronics-in-space", "pacific"),        # micro data centers, not orbital
      ("modern-metal-mills", "palifer"),          # predictive maintenance for trains
      ("modern-metal-mills", "1849-bio"),         # microbes for ore leaching, not mills
      ("new-operating-systems-for-the-physical-world", "obia"),  # CRE brokerage
    }
    out = defaultdict(list)
    for c in raw:
        for key, th in ALL.items():
            if (key, (c.get("slug") or "").lower()) in EXCLUDE:
                continue
            s, hits, ev = score(c, th)
            if s >= THRESH:
                out[key].append(dict(
                    slug=c.get("slug"), name=c.get("name"), batch=c.get("batch"),
                    one_liner=c.get("one_liner"), long_description=c.get("long_description"),
                    website=c.get("website"), tags=c.get("tags"), industry=c.get("industry"),
                    subindustry=c.get("subindustry"), team_size=c.get("team_size"),
                    status=c.get("status"), stage=c.get("stage"),
                    former_names=c.get("former_names"), all_locations=c.get("all_locations"),
                    score=s, evidence=ev, hits=[h[1] for h in hits][:8],
                ))

    for k in out:
        out[k].sort(key=lambda r: -r["score"])

    print("\n%-46s %5s  %s" % ("THEME", "N", "top 5 by score"))
    for k, th in ALL.items():
        rows = out.get(k, [])
        top = ", ".join("%s (%s)" % (r["name"], r["batch"].replace("Winter", "W").replace("Summer", "S")
                                     .replace("Spring", "X").replace("Fall", "F").replace(" ", ""))
                        for r in rows[:5])
        print("%-46s %5d  %s" % (th["label"][:46], len(rows), top[:120]))

    uniq = {}
    for k, rows in out.items():
        for r in rows:
            u = uniq.setdefault(r["slug"], dict(r, themes=[]))
            u["themes"].append(k)
            u["score"] = max(u["score"], r["score"])
    print("\nunique companies matched:", len(uniq))

    json.dump(dict(pulled="2026-10-19", directory_size=len(raw), threshold=THRESH,
                   themes={k: dict(label=v["label"], rfs=v["rfs"], author=v["author"]) for k, v in ALL.items()},
                   by_theme={k: v for k, v in out.items()},
                   unique=list(uniq.values())),
              io.open(os.path.join(SP, "rfs_companies.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("wrote rfs_companies.json")


if __name__ == "__main__":
    main()
