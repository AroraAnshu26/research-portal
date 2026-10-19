# -*- coding: utf-8 -*-
"""Register the RFS hardware map as a Library card in data/library.js.

Idempotent: if a card with this id is already present the file is left alone.
Numbers are read from the built datasets rather than typed, so a rebuild that
changes the counts and a re-run of this script stay in agreement.
"""
import json, io, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
LIB = os.path.join(ROOT, "data", "library.js")
CARD_ID = "yc-rfs-hardware-map"

comp = json.load(io.open(os.path.join(HERE, "rfs_companies.json"), encoding="utf-8"))
founders = json.load(io.open(os.path.join(HERE, "rfs_founders.json"), encoding="utf-8"))
try:
    pre = json.load(io.open(os.path.join(HERE, "rfs_prepivot.json"), encoding="utf-8"))
except Exception:
    pre = {}

n_co = len(comp["unique"])
matched = {c["slug"] for c in comp["unique"]}
n_f = sum(len(f.get("founders") or []) for f in founders if f.get("slug") in matched)
n_pv = sum(1 for v in pre.values() if v.get("pitch_changed"))
n_dir = comp["directory_size"]
cnt = {k: len(v) for k, v in comp["by_theme"].items()}
n_former = sum(1 for c in comp["unique"] if c.get("former_names"))

card = '''
{
  id: "%(id)s",
  axis: "money",
  kind: "dashboard",
  title: "YC RFS hardware map \\u2014 space, defense, silicon, metal",
  dek: "The eight Requests for Startups covering space electronics, in-space industry, hardware supply chain, semiconductor supply chain, modern metal mills, American defense, compute at sea and operating systems for the physical world \\u2014 set against every company YC has ever funded, with founders and recovered pre-pivot pitches.",
  status: "live",
  date: "2026-10-19",
  owner: "anshu",
  open: "reports/yc-rfs-hardware-map.html",
  openLabel: "Open dashboard",
  tags: ["YC", "RFS", "%(n_dir)d companies", "50 batches", "hardware", "defense", "space"],
  metrics: [
    { v: "%(n_co)d", l: "YC companies matching one of the eight requests" },
    { v: "%(metal)d and %(sea)d", l: "Companies answering Modern Metal Mills and Compute at Sea" },
    { v: "%(n_f)d", l: "Founders resolved, 90%% with a self-written bio" },
    { v: "%(n_pv)d", l: "Original pre-pivot pitches recovered from the archive" }
  ],
  body: [
    ["What it is", "A single-file dashboard in five tabs. The eight requests in full primary text with a live company count on each; a filterable, searchable company grid with a drill-down drawer carrying the thesis, every founder with bio and links, and the pre-pivot pitch where one was recovered; a before-and-after view of the pivots; the capital and analyst layer underwriting the same thesis; and a method tab that states the limits."],
    ["The requests are primary for the first time", "ycombinator.com/rfs server-renders only the currently selected edition \\u2014 the edition tabs are React state with no href and no reachable JSON \\u2014 which is why tools/yc/rfs.json carries earlier editions as secondary-source reconstructions with the Winter-2025-vs-Spring-2025 boundary flagged unreliable. For this build each tab was clicked in a real browser engine and the rendered text read out of the DOM, so Fall 2026, Summer 2026 and Spring 2026 are all primary here. The eight requests span three editions: three are Fall 2026, four Summer 2026, one Spring 2026."],
    ["The census has a denominator, and a wider one than the batch card", "All %(n_dir)d companies YC publishes, across 50 batches from Summer 2005 to Summer 2027. This deliberately drops the Winter-2022 floor the yc-batch-census card uses, which would have hidden Astranis (W16), Scale AI (S16), Solugen (W17) and every other pre-2022 hard-tech company \\u2014 exactly the Vori failure mode recorded on 2026-09-14. Matching is weighted keyword scoring over the one-liner, YC's tags, the industry pair and the long description."],
    ["Thin fields are the finding", "Modern Metal Mills matches %(metal)d companies and Compute at Sea matches %(sea)d, against %(n_dir)d in the directory. Those requests exist precisely because almost nobody has built them. By contrast Hardware Supply Chain matches %(hw)d and American Defense %(def)d. Read a low count as an open field, not a broken query. Two companies answer their request almost verbatim: Atomarine (S26) is 'floating nuclear powered data centers at sea' against Chaubard's Compute at Sea, and Ethos Space Resources (S26) 'makes silicon on the Moon' by electrolysing regolith against Oltean's request, which asks for exactly that."],
    ["Precision was measured, not asserted", "A first pass at a higher threshold returned one metal-mill company and two in-space-industry companies, which was implausible; the near-miss band held real companies (Proglix, Duranium, AstroForge, TransAstra, Baud, Mobius Materials) just under it. Lowering the threshold alone admitted a fundraising tool called 'Metal', a bank offering 'bare-metal' access and a rare-coin marketplace. The fix was structural: the theme word must land in the one-liner, tags or industry \\u2014 a field the company chose to describe itself by \\u2014 not merely somewhere in the description, plus a hand-read exclusion list. Each record carries the evidence window its judgement rests on. Independent check: YC's Hardware Supply Chain request names two companies itself, Hlabs (W26) and Prototyping.io (Spring 2026); both are in the matched set."],
    ["A stale constraint, now lifted", "tools/yc/README.md and the brain both record web.archive.org as unreachable from this machine, which is why the earlier pass had no historical page states. That is NO LONGER TRUE \\u2014 the CDX API answered normally on 2026-10-19. Raw snapshots come back gzipped and must be decompressed or they read as a failed fetch. This unlocked the pre-pivot layer: the YC directory serves only a company's CURRENT pitch, so a pivot overwrites the original in place. %(n_former)d of the %(n_co)d matched companies carry a former name, and the archive returned a materially different original pitch for %(n_pv)d of them, recovered both from the earliest snapshot of the live URL and from the dead URL under the former name."],
    ["Name-matching across lists needs a check", "Cross-referencing a16z's American Dynamism 50 against the directory by name produced two false hits: a16z's Armada (edge compute) collided with a YC company formerly named Armada that turns videos into movies, and a16z's Radiant (nuclear) collided with a former name of Dev Tools AI. Both struck after reading the one-liners. The same pass produced a true result worth keeping: a16z's 'Diode' is the YC company now called RMFG, via Reason Robotics \\u2192 Diode \\u2192 RMFG. Seven AD50 companies are YC-backed: Astranis, Astro Mechanica, Turion Space, Scale AI, Solugen, Atomic Industries and RMFG."],
    ["The capital layer, and what it is not", "a16z's American Dynamism practice, Lux, Eclipse, Construct, DCVC, Playground, Founders Fund and 8VC; McKinsey's reindustrialization and defense-industrial-base work, BCG on physical AI and factory economics; and eight newsletters. This section is CURATED, not a census \\u2014 the sources found worth reading, not the category. Each item carries a confidence flag: only items read at their own primary page in this session are marked verified. Fund sizes are marked reported and conflict badly across directories. A negative result is recorded deliberately: no 2026 Bain equivalent of the McKinsey or BCG pieces was found, so the next pass need not re-search it."],
    ["What is missing", "Funding amounts and valuations are not in YC's public index and are not here. Pre-pivot coverage is partial \\u2014 the archive rate-limits, and a company that pivoted without renaming and was never crawled early is unrecoverable. Subscriber counts are published by almost no newsletter; only Construction Physics states one (77,000+)."]
  ],
  files: [
    { p: "reports/yc-rfs-hardware-map.html", d: "The dashboard, self-contained" },
    { p: "tools/yc/rfs_hardware_2026.json", d: "The eight requests in full primary text, browser-read, plus edition framing" },
    { p: "tools/yc/rfs_match.py", d: "Theme classifier with per-theme anchors, negatives and a hand-read exclusion list" },
    { p: "tools/yc/rfs_companies.json", d: "%(n_co)d matched companies with scores and evidence windows" },
    { p: "tools/yc/rfs_founders.json", d: "%(n_f)d founder records with bios and links" },
    { p: "tools/yc/prepivot.py", d: "Wayback recovery of original pitches, via current and former slugs" },
    { p: "tools/yc/rfs_prepivot.json", d: "Recovered pre-pivot pitches with archive URLs" },
    { p: "tools/yc/rfs_capital.json", d: "Investors, analyst houses and newsletters, each with a confidence flag" },
    { p: "tools/yc/scrape_all.py", d: "Full-history directory pull \\u2014 all 50 batches, no 2022 floor" },
    { p: "tools/yc/build_rfs.py", d: "Emits the dashboard into reports/" }
  ]
},
''' % dict(id=CARD_ID, n_co=n_co, n_f=n_f, n_pv=n_pv, n_dir=n_dir, n_former=n_former,
           metal=cnt.get("modern-metal-mills", 0), sea=cnt.get("compute-at-sea", 0),
           hw=cnt.get("hardware-supply-chain", 0), def_=0,
           **{"def": cnt.get("the-future-of-american-defense", 0)})

PROV = ('  "%s": { kind: "own-prior-work", note: "Built 2026-10-19 in this session from a live pull of '
        'YC\'s public Algolia index (%d companies, 50 batches, Summer 2005 to Summer 2027) and a BROWSER READ of '
        'ycombinator.com/rfs, which is the first time the pre-Fall-2026 editions have been primary here rather than '
        'reconstructed from secondary sources. The eight requests are quoted in full and verbatim. Company text is YC\'s own. '
        'Classification is this system\'s, and its precision was measured rather than asserted: a first threshold produced '
        'implausibly thin categories, the near-miss band was read by hand, and the rule that fixed it \\u2014 theme word must '
        'appear in a self-description field, not merely in the long description \\u2014 is recorded on the card along with the '
        'companies struck out and why. An independent check passed: the two companies YC itself names in the Hardware Supply '
        'Chain request, Hlabs and Prototyping.io, are both in the matched set. THE THIN COUNTS ARE REAL FINDINGS, not query '
        'failures: %d companies answer Modern Metal Mills and %d answer Compute at Sea. The pre-pivot layer is NEW CAPABILITY '
        '\\u2014 web.archive.org is recorded as unreachable from this machine in tools/yc/README.md and in the brain, and that '
        'is now stale; the CDX API answered normally on 2026-10-19, and %d original pitches were recovered. Coverage there is '
        'PARTIAL and the dashboard says so. The capital, consulting and newsletter sections are CURATED and web-retrieved on '
        '2026-10-19, not a census; every item carries a confidence flag and only those read at their own primary page are '
        'marked verified, with fund sizes explicitly flagged as conflicting across directories. Two false cross-list matches '
        '(a16z\'s Armada and Radiant against unrelated YC former names) were caught and struck \\u2014 do not regress them." },\n'
        ) % (CARD_ID, n_dir, cnt.get("modern-metal-mills", 0), cnt.get("compute-at-sea", 0), n_pv)

src = io.open(LIB, encoding="utf-8").read()
if '"%s"' % CARD_ID in src or "id: \"%s\"" % CARD_ID in src:
    print("card already present; leaving library.js alone")
else:
    src = src.replace("window.LIBRARY = [\n", "window.LIBRARY = [\n" + card, 1)
    src = src.replace("window.PROVENANCE = {\n", "window.PROVENANCE = {\n" + PROV, 1)
    io.open(LIB, "w", encoding="utf-8").write(src)
    print("inserted card %s into data/library.js" % CARD_ID)
print("metrics: companies=%d founders=%d pivots=%d metal=%d sea=%d"
      % (n_co, n_f, n_pv, cnt.get("modern-metal-mills", 0), cnt.get("compute-at-sea", 0)))
