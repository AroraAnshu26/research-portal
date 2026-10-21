# -*- coding: utf-8 -*-
"""Register the Mom Test field kit as a Library card. Idempotent."""
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
LIB = os.path.join(ROOT, "data", "library.js")
CARD_ID = "mom-test-robotics-marketplace"

card = '''
{
  id: "mom-test-robotics-marketplace",
  axis: "thesis",
  kind: "brief",
  title: "Mom Test field kit \\u2014 robotics parts exchange",
  dek: "A question set and interview framework for the two weeks before the YC deadline, built to discriminate between three open decisions rather than merely confirm that sourcing is painful.",
  status: "live",
  date: "2026-10-21",
  owner: "anshu",
  open: "reports/mom-test-robotics-marketplace.html",
  openLabel: "Open the field kit",
  tags: ["Mom Test", "customer discovery", "YC", "robotics", "marketplace", "56 questions"],
  metrics: [
    { v: "3", l: "Decisions the fortnight must settle" },
    { v: "5", l: "Populations, only three of them customers" },
    { v: "56", l: "Questions, segment by segment" },
    { v: "12", l: "Days, worked backwards from the deadline" }
  ],
  body: [
    ["What it is", "A field kit, not a summary of the book. Six tabs: the three decisions, a seven-move interview spine used in every meeting, eight question swaps (the thing you will be tempted to ask set against the version that produces evidence), per-segment question sets, a scorecard with a reading key, and a twelve-day run plan."],
    ["The design constraint that shaped it", "Anshu confirmed that BOTH the hard side of the market AND the fulfilment model are open questions he wants tested, and that the catalogue launches as physical parts only. That makes a generic problem-validation script useless: almost everyone agrees sourcing is painful, and agreement is the cheapest thing you can collect. So every set is built to FORCE A CHOICE between (1) is the pain real, recent and expensive, (2) are buyers or sellers the desperate side, (3) do people pay for speed or for selection."],
    ["The single most useful pair of questions", "Decision 3 is settled by two questions about the last purchase rather than by discussion. 'Did you end up with the part you wanted, or the part you could get fastest?' \\u2014 if the answer is the one they could get, that is a speed buyer and it argues for holding inventory. 'Have you ever waited weeks because nothing else matched the spec?' \\u2014 a yes is a selection buyer and argues for asset-light breadth. Those are different businesses, and the scorecard tallies them separately so the pile resolves into a decision instead of a mood."],
    ["Two corrections to the plan as Anshu described it", "FIRST, the seller side was missing. He listed robot founders, sim founders, GSB supply-chain people and PhD students \\u2014 all demand-side or adjacent. You cannot test which side is the hard side by interviewing one side, so a component-vendor segment was added with its own questions, and the sharpest signal there is whether a vendor will send a current price and lead-time list at all. SECOND, GSB supply-chain contacts are EXPERT WITNESSES, not customers; asking them validation questions yields fluent, confident, worthless answers. Their set asks only for mechanism \\u2014 where the margin sits, what incumbent distributors do that is not obvious from outside, who holds the working capital, and whether a Shenzhen supplier would take a five-unit order from an unknown startup at all. That last question could invalidate the startup-to-startup premise on its own. PhD students are real buyers with real pain and near-zero budget authority: good for frequency data, misleading on willingness to pay."],
    ["The honesty check", "Recorded because it is the part most likely to be skipped. If after fifteen interviews there are no disconfirming notes and every meeting felt good, the DATA is bad rather than the idea validated \\u2014 that is Fitzpatrick's whole argument. The scorecard therefore carries a mandatory 'one thing they said that argues against you' field, and a blank there means the interview was a pitch."],
    ["Source and limits", "Framework from Rob Fitzpatrick, The Mom Test (2013): three rules, three kinds of bad data (compliments, fluff, ideas), and commitment through time, reputation or money. The book was not re-read cover to cover in this session \\u2014 its structure was verified against several independent summaries and the publisher's own page on 2026-10-21, and the application to robotics sourcing is this system's, not the book's. None of the 56 questions has been tested in a real interview yet. Company names in the segment sets come from the robotics-marketplace scan on this portal."]
  ],
  files: [
    { p: "reports/mom-test-robotics-marketplace.html", d: "The field kit, six tabs, self-contained" },
    { p: "reports/mom-test-robotics-marketplace.pdf", d: "Same content, 15 pages, for reading on an iPad" }
  ]
},
'''

PROV = (
 '  "mom-test-robotics-marketplace": { kind: "own-prior-work", note: "Built 2026-10-21 for Anshu ahead of a YC '
 'deadline in roughly two weeks. THE FRAMEWORK IS ROB FITZPATRICK\'S (The Mom Test, 2013) \\u2014 three rules, three kinds '
 'of bad data, and commitment through time, reputation or money. The book was NOT re-read cover to cover in this session; '
 'its structure was checked against several independent summaries and the publisher\'s page on the day, and the three rules '
 'and the compliments/fluff/ideas taxonomy are consistently attested across them. The phrase \'commitment currencies\' is '
 'this system\'s shorthand \\u2014 the sources confirm the concept (a meeting succeeds only if it advances on time, '
 'reputation or money) but did not use that exact wording, so do not quote it back as the book\'s. EVERYTHING ELSE IS THE '
 'AGENT\'S: the three decisions, the seven-move spine, the eight question swaps, all 56 questions, the scorecard and the '
 'twelve-day plan are constructed for this specific idea and have NOT been tested in a real interview. TWO SUBSTANTIVE '
 'CORRECTIONS TO ANSHU\'S OWN PLAN are on the card and should not be lost: he listed only demand-side and adjacent '
 'populations, so the seller side was added as its own segment (you cannot test which side is hard by interviewing one '
 'side); and GSB supply-chain contacts are treated as expert witnesses rather than customers, with mechanism-only '
 'questions. ANSHU\'S OWN ANSWERS, which drove the design: catalogue launches as PHYSICAL PARTS ONLY; the hard side is '
 'explicitly UNDECIDED and to be tested; the fulfilment model (hold inventory vs asset-light) is explicitly UNDECIDED and '
 'to be tested; the fortnight must produce all four of problem proof, design partners or LOIs, a wedge decision, and YC '
 'application material. The 12-day schedule assumes a deadline on or about 2 November and the page says to confirm that '
 'date before relying on it. Two company names Anshu gave by voice, \'Moving Atoms\' and \'OceanVio\', could NOT be '
 'resolved by search and are deliberately not referenced anywhere in the deliverable." },\n')

src = io.open(LIB, encoding="utf-8").read()
if 'id: "%s"' % CARD_ID in src:
    print("card already present; leaving library.js alone")
else:
    src = src.replace("window.LIBRARY = [\n", "window.LIBRARY = [\n" + card, 1)
    src = src.replace("window.PROVENANCE = {\n", "window.PROVENANCE = {\n" + PROV, 1)
    io.open(LIB, "w", encoding="utf-8").write(src)
    print("inserted card %s" % CARD_ID)
