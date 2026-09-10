/* Research library — the cards that populate the Library board.
   Columns are the five axes of the CTO worldview mandate (2026-09-10).
   Agents and later passes append to data/library-user.json rather than editing this file. */

window.AXES = [
  { id: "money",  label: "Money flows",            blurb: "Venture, growth, corporate capex, sovereign funds. Who is paying, and what changed." },
  { id: "macro",  label: "Macro & cycles",         blurb: "Rates, capex cycles, labour, energy, cost curves." },
  { id: "geo",    label: "Geopolitics × tech", blurb: "Export controls, regulation as forcing function, industrial policy." },
  { id: "new",    label: "What is genuinely new",  blurb: "Frontier technical results, and the people producing them." },
  { id: "thesis", label: "Theses",                 blurb: "Explicit claims about how the world turns. Each carries a kill test." }
];

window.LIBRARY = [

/* ============================== MONEY FLOWS ============================== */
{
  id: "yc-batch-census",
  axis: "money",
  kind: "dashboard",
  title: "YC batch census, W22 → Fall 2026",
  dek: "All 3,009 YC companies across 15 batches, classified into 21 themes and 22 flags, with every Requests-for-Startups edition set against what founders actually built.",
  status: "live",
  date: "2026-09-10",
  owner: "anshu",
  open: "reports/yc-batch-map.html",
  openLabel: "Open dashboard",
  tags: ["YC", "3,009 companies", "15 batches", "RFS"],
  metrics: [
    { v: "3.0% → 20.1%", l: "Robotics & physical AI as primary theme, W22 → S26" },
    { v: "27.6% → 8.1%", l: "Fintech share of the batch, W22 → S26" },
    { v: "50.8% → 32.6%", l: "Agentic language, Spring 2026 peak → Fall 2026" },
    { v: "7.8% → 65.2%", l: "Teams of two or fewer, W22 → F26 (partial)" }
  ],
  body: [
    ["What it is", "A single-file interactive dashboard with four tabs: Companies (filterable, sortable, click-through drawer), Trends (theme share batch over batch), Requests for Startups (every edition, expandable), and Frontier & markets."],
    ["Method, reusable", "YC's public directory is fully scrapeable through its Algolia index. App ID 45BWZJ1SGC; the search key is NOT stable — read it live from window.AlgoliaOpts in the HTML of ycombinator.com/companies. Endpoint 45bwzj1sgc-dsn.algolia.net/1/indexes/YCCompany_production/query, filter batch:\"Winter 2022\", hitsPerPage 1000. Fields include one_liner, long_description, industry, subindustry, tags, regions, team_size, status, stage, launched_at. top_company is always false in the public index — do not rely on it."],
    ["Observations across the full census", "Physical-AI vocabulary (embodied / VLA / sim-to-real / teleop / world model / manipulation / humanoid): 2 of 1,126 companies in W22–S23 (0.2%) against 42 of 672 in W26–F26 (6.2%). Data centres as a subject 0.5% → 8.1%, the fastest-moving flag. Defense 1.2% → 6.4%. Semis: zero companies in W22 and S22, seven in S26 alone. Frontier and deep-tech keywords 6.0% → 26.1%. Crypto: 15 companies in W22+S22 alone, five across all eleven batches W24 → F26 — yet crypto returns as a Fall 2026 RFS request. Structurally: batch size 398 → 234 while cadence doubled to four batches a year, median team size 10 → 2, US share 56% → 92%. 537 companies are still active and carry a frontier flag, 318 of them in the 2025–26 batches."],
    ["RFS against reality", "No RFS existed at all from W22 through the run-up to S24 — YC's February 2024 post was its first refresh since 2018 — which makes 2022–23 a clean control. The Summer 2025 request (\"software tools for robots / a ChatGPT moment in robotics\") is the one that visibly tracked. The Spring 2025 datacenter request took roughly four batches to appear in composition. The Fall 2025 \"reskill tradespeople\" request was answered sideways: founders built robots for the trades rather than vocational schools. Summer 2026 is the first batch where RFS and composition agree across every hard-tech flag at once."],
    ["Known soft spots", "web.archive.org is unreachable from this machine, so historical page states came from secondary sources. ycombinator.com/rfs only server-renders the currently selected edition — the tab buttons are React state with no href — so earlier editions were reconstructed from secondary sources, and the Winter-2025-vs-Spring-2025 boundary is explicitly unreliable."]
  ],
  files: [
    { p: "reports/yc-batch-map.html", d: "The dashboard, self-contained, 1.9 MB" }
  ]
},
{
  id: "physical-ai-capital-map",
  axis: "money",
  kind: "brief",
  title: "Who supplies robot policies, and what they are worth",
  dek: "The policy layer is being unbundled from the robot. Two supply layers, named, with valuations as of September 2026.",
  status: "current",
  date: "2026-09-07",
  owner: "anshu",
  tags: ["valuations", "unbundling", "RaaS"],
  metrics: [
    { v: "$39B", l: "Figure" },
    { v: "$14B", l: "Skild AI" },
    { v: "$5.6B", l: "Physical Intelligence" },
    { v: "~$32B", l: "RaaS market, 35–40% of commercial robot deployments" }
  ],
  body: [
    ["Layer A — vertically integrated operators owning their own stack", "Amazon Robotics (absorbed the Covariant founders Abbeel / Chen / Duan plus roughly 25% of staff and a non-exclusive model licence, August 2024; ships Sparrow, Robin, Cardinal, Vulcan touch-picking, and DeepFleet for fleet coordination), Symbotic, Dexterity (~$1.65B), Ambi Robotics, RightHand Robotics, Nimble, Osaro, Mujin, Plus One."],
    ["Layer B — horizontal robot-brain vendors licensing policies into other people's hardware", "Physical Intelligence (~$5.6B; pi0, pi0.5 trained across 7 platforms / 68 tasks / 104 homes, pi-star-0.6 with RECAP), Skild AI (~$14B; Skild Brain \"omni-bodied\", partnered with ABB, Universal Robots, Mobile Industrial Robots, NVIDIA, Foxconn), NVIDIA (open GR00T N1.5 / N1.7 with Isaac Sim, Isaac Lab, Newton, Cosmos), Google DeepMind (Gemini Robotics), Figure (Helix, in-house), Field AI (~$2B). Valuation context: Figure ~$39B, Skild ~$14B, Wayve ~$8.6B, PI ~$5.6B, Apptronik ~$5B, Agility ~$1.75–2.1B."],
    ["The structural consequence", "When the brain vendor, the arm OEM and the integrator are three different companies, and the brain updates over the air, a failure has no owner. Historically a neutral measurement authority appears at exactly that point — SOC 2 after cloud unbundled, MRC and Nielsen accreditation in advertising, rating agencies in credit, independent test houses in semiconductors. In every case the referee arrived after unbundling, never before."],
    ["The contracting shift that puts money on it", "2026 saw RaaS move to performance-based contracting: uptime guarantees, bonuses above target, credits and penalties below a floor, a typical 95% uptime SLA, $1.5k–8k per unit per month. A 95% SLA on a stochastic manipulation policy receiving OTA model updates is currently unenforceable — no agreed failure definition, no attribution, no trial count to establish regression. Every model update is an uncontrolled experiment with money attached."],
    ["Best-funded adjacent buyer", "Insurers. AV and robot underwriters face an actuarially insufficient claims record and price conservatively; premiums reportedly track \"compute volume and architectural maturity scores\", i.e. guesses. Y-Risk / Hartford underwrite AV trucking selectively, Koop.ai claims 10–40% premium improvement through API underwriting, Bot Auto published a model to make AV truck risk \"measurable, not theoretical\"."]
  ]
},

/* ========================= WHAT IS GENUINELY NEW ========================= */
{
  id: "physical-intelligence-review",
  axis: "new",
  kind: "report",
  title: "Physical Intelligence: a chronological literature review",
  dek: "36,765 words, 97 typeset pages, 2015 → September 2026. The robot-learning field traced end to end, with the evaluation arithmetic worked out rather than asserted.",
  status: "done",
  date: "2026-09-06",
  owner: "anshu",
  open: "reports/physical-intelligence-review-2026-09-03.pdf",
  openLabel: "Open PDF, 97 pp",
  tags: ["36,765 words", "97 pages", "3,103 equations", "2015–2026"],
  metrics: [
    { v: "11.2 pp", l: "Standard error at p=0.5, n=20 rollouts" },
    { v: "~44 pp", l: "Two-arm minimum detectable effect at 80% power, n=20" },
    { v: "~390", l: "Rollouts per arm to resolve a 10 pp difference" },
    { v: "0.924 vs 0.308", l: "SIMPLER sim-real Pearson against the validation-loss proxy the field actually uses" }
  ],
  body: [
    ["The conclusion the document itself reached", "Robot evaluation is statistically broken by arithmetic, not by sloppiness. Required rollouts scale as 1/δ², so resolving 5 pp needs roughly 1,570 per arm and 2 pp roughly 9,800 per arm. The measurement problem therefore gets harder as policies converge — a growing bottleneck, not a transient one."],
    ["Methodology that exists in the literature but has not been productised", "Vincent / Nishimura / Schwager / Kollar (arXiv 2405.05439), tighter-than-Clopper-Pearson bounds, 40–50 rollouts for MES 0.08–0.12. Snyder et al. RSS 2025 STEP (−32% trials). Badithela / Snyder / Dixit / Majumdar SureSim (2510.04354), prediction-powered inference, 20–25% hardware saving. SIMPLER (CoRL 2024), sim-real Pearson 0.924. RoboArena (CoRL 2025), 612 comparisons across seven institutions, converging around 100."],
    ["Independent replication", "Every humanoid autonomy claim in the field is a company self-report with no matched-protocol independent replication — Figure 200 h sorting, 1X NEO 60–70% autonomy with teleop fallback, RECAP / pi-star-0.6 halving failure rates."],
    ["Build note worth keeping", "The gstack make-pdf binary has no KaTeX or MathJax support at all, so it would have printed 3,103 LaTeX expressions as literal source. The replacement pipeline — markdown-it with @vscode/markdown-it-katex, KaTeX CSS and woff2 fonts inlined as base64 data URIs, puppeteer-core driving cached Chrome with displayHeaderFooter — is reusable for any future maths-heavy report."]
  ],
  files: [
    { p: "reports/physical-intelligence-review-2026-09-03.pdf", d: "Typeset, 97 pages" },
    { p: "reports/physical-intelligence-review-2026-09-03.md", d: "Markdown source, 316 KB" }
  ]
},
{
  id: "stanford-frontier-map",
  axis: "new",
  kind: "dashboard",
  title: "Stanford frontier map",
  dek: "7,394 faculty deduplicated from a 12,827-row census across 21 org units, 86 hand-checked lab nodes, 28 Stanford-linked companies, and an institute co-affiliation matrix built from Stanford's own affiliation records.",
  status: "live",
  date: "2026-09-10",
  owner: "anshu",
  open: "reports/stanford-frontier-map.html",
  openLabel: "Open dashboard",
  tags: ["7,394 faculty", "86 labs", "28 companies", "6 tabs"],
  metrics: [
    { v: "0", l: "Unique people added by all 13 institutes — they are pure overlays on department appointments" },
    { v: "74.8%", l: "Faculty holding no institute seat at all (5,529 of 7,394); 853 hold two or more, one holds six" },
    { v: "494", l: "Faculty shared by Bio-X and Wu Tsai Neurosciences, the densest institute pair" },
    { v: "66 of 189", l: "HAI faculty who are Engineering faculty" }
  ],
  body: [
    ["Why", "Stated aim, verbatim: \"me being at stanford is very powerful. I right now only know chelsea finn and PI. I am sure there are so many more stalwarts out there here doing crazy stuff.\" Scoped to the entire picture — core AI and robotics plus the hard-science frontier — because, in the stated reason, \"often times people use AI and robotics as a tool in powerful sense to crack problems in other domains. I want to see this.\" Cross-domain application is therefore a first-class filter axis, not a footnote."],
    ["Method, reusable", "Stanford Profiles has an undocumented but public census engine: profiles.stanford.edu/browse/<org-path>?affiliations=capFaculty&ps=100&p=N returns server-rendered listings carrying name, full appointment title and the free-text research-interest field, parseable from <li class=\"mini-profile-holder\"> blocks. ps caps at 100. The org tree itself sits in the define('app-config') JSON blob under c.browseOrgs — 6 schools, 14 institutes, 8 administrations. The CAP API at api.stanford.edu/cap/v1 requires auth and returns 401, and profiles.stanford.edu/proxy/api/cap 404s, so the HTML browse endpoint is the way in. Department sites are not uniform: only ee.stanford.edu uses the Drupal orglist markup with research-area UUID facets, so per-department parsers are not worth building."],
    ["Census result", "12,827 rows across 21 org units, deduplicated to 7,394 unique faculty, at a 99.8% parse rate against Stanford's own stated result counts. Only 4,369 of 7,394 (59%) filled in the research-interest field, so every keyword-derived number is a floor, not a total. School of Medicine alone is 5,143 of the 7,394."],
    ["What the affiliation records show, with no inference", "All 13 institutes added zero unique people — they are overlays on department appointments. 5,529 faculty (74.8%) hold no institute seat; 853 hold two or more; one person holds six. Bio-X and Wu Tsai Neurosciences share 494 faculty. HAI shares 77 with Bio-X and 49 with Wu Tsai Neuro, but only 4 with Precourt (energy) and 2 with Sarafan ChEM-H. On Stanford's own data the AI institute overlaps heavily with bio and neuro and barely touches energy or chemical biology."],
    ["The cross-domain evidence", "The Stanford Robotics Center's 42-faculty roster includes appointments in Oceans, Pathology, Surgery, Radiology, Chemical Engineering and Civil Engineering. That is the cleanest available evidence for the cross-domain reading, and it comes from a roster rather than from keyword matching."],
    ["Stated limits — read these before quoting a count", "The regex method-by-domain classifier ran at roughly two-in-three precision on hand inspection: clinical faculty trip on \"robotic surgery\" and then an unrelated second keyword trips a domain. Those counts were demoted in the deliverable, the precision limit is labelled inline, and all 128 flagged names are published with profile links so they can be judged directly. The institute co-affiliation matrix is the reliable signal instead. Two census gaps are named openly: Dan Jurafsky, an active CS and Linguistics professor, does not appear in the harvest at all; and Christopher Manning's harvested title reads as Linguistics emeritus, because a person with several appointments shows only whichever listing caught them."],
    ["Deferred to a second pass", "Per-lab grant dollar amounts, affiliate fee schedules beyond HAI's stated $550K, the full StartX and alumni company set, and techfinder.stanford.edu's licensable-technology listings across its four collections."]
  ],
  files: [
    { p: "reports/stanford-frontier-map.html", d: "The dashboard — six tabs, self-contained, 272 KB" },
    { p: "reports/stanford-faculty-census/method-and-findings.md", d: "Full method notes, findings and stated limits" },
    { p: "reports/stanford-faculty-census/harvest.py", d: "Resumable crawler and parser" },
    { p: "reports/stanford-faculty-census/nodes.json", d: "The 86 lab nodes" },
    { p: "reports/stanford-faculty-census/companies.json", d: "The 28 companies with per-row sources" },
    { p: "reports/stanford-faculty-census/theses.json", d: "Cluster theses and market-size layer" },
    { p: "reports/stanford-faculty-census/org_counts.json", d: "The 21 org paths and their faculty counts" }
  ]
},
{
  id: "stanford-money-layer",
  axis: "money",
  kind: "brief",
  title: "What Stanford research money actually looks like",
  dek: "Sponsored research, the corporate-affiliate mechanics, and the 2026 valuations of the companies that came out of the labs.",
  status: "current",
  date: "2026-09-10",
  owner: "anshu",
  open: "reports/stanford-frontier-map.html",
  openLabel: "Open the companies tab",
  tags: ["$2.3B", "28 companies", "sourced 2026-09-10"],
  metrics: [
    { v: "$2.3B", l: "Stanford sponsored research, FY ended 2025-08-31, incl. SLAC — over 70% federal, 7,500+ awards" },
    { v: "$550K", l: "The stated HAI \"Wallet\" of research tokens per corporate affiliate, directable to a named lab" },
    { v: "$120B", l: "StartX reported portfolio valuation — zero equity taken, no fees charged" },
    { v: "35", l: "SystemX Alliance members, incl. Apple, TSMC, Samsung, Tencent, Ant Group, Bosch, Caterpillar" }
  ],
  body: [
    ["The institutional change of the year", "Stanford HAI absorbed Stanford Data Science on 4 May 2026, keeping the HAI name: 400+ scholars, $60M in cumulative grants, and the Marlowe HPC cluster. James Landay is Denning Director; Fei-Fei Li and John Hennessy co-chair the advisory council. In the census, Stanford Data Science still shows only 10 faculty of its own."],
    ["Company facts, all web-retrieved 2026-09-10 — cite the outlet, not this card", "Physical Intelligence: $5.6B confirmed at the Nov 2025 $600M Series B led by Google CapitalG, $1.6B total across two rounds per Dealroom; Bloomberg reported March 2026 talks above $11B, not confirmed closed. World Labs: $5B after $1B closed 18 Feb 2026, about $1.23B total, with Autodesk putting in $200M and taking a strategic advisory role alongside NVIDIA and AMD. Together AI: $8.3B at an $800M Series C, July 2026, claiming over $1.15B in annual bookings — Chris Ré and Percy Liang are co-founders. SambaNova: $11B post-money at the Series F first close of $1B on 8 July 2026 led by General Atlantic — Kunle Olukotun and Chris Ré are co-founders. Shield AI: $12.7B, March 2026; co-founder Ryan Tseng holds a Stanford AI PhD. Dexterity: $1.65B, founded by Samir Menon out of Oussama Khatib's lab."],
    ["Smaller and less reported", "Genesis Therapeutics $806.79M per Forge Global — out of Vijay Pande's lab, founded by Evan Feinberg and Ben Sklaroff, with Pande now the a16z general partner whose firm led its Series A. Inertia: $450M milestone-based Series A, Feb 2026, from Bessemer and GV, co-founded by Mike Dunne who directed SLAC's Linac Coherent Light Source. Astranis: over $1.2B raised, valuation above $2B, prime on the DoD programs of record PTS-G, Resilient GPS and Andromeda. Human Intelligence: James Zou reported raising about $100M at roughly $1B, April 2026, unconfirmed. Pumpkinseed Bio: $20M Series A, with Jen Dionne both the source researcher and the CEO. Amprius (NYSE: AMPX): 2025 revenue $73M, guiding above $125M for 2026."],
    ["Two people worth noting for how they operate", "Yi Cui has founded five companies — Amprius, EnerVenue, EEnotech, 4C Air, LifeLabs Design — and is faculty director of the Sustainability Accelerator. H.-S. Philip Wong has been TSMC's Chief Scientist in an advisory role since 2020 while remaining Stanford faculty."],
    ["Stanford's own taxonomy of the frontier", "The Stanford Emerging Technology Review 2026 frames it as exactly ten areas: AI, biotech and synthetic biology, cryptography and computer security, energy, materials, neuroscience, quantum, robotics, semiconductors, space."]
  ]
},
{
  id: "market-size-spread",
  axis: "macro",
  kind: "brief",
  title: "The market-size estimates disagree by up to 8.4×, and the spread is the finding",
  dek: "Four research firms sizing the same 2026 market do not agree within an order of magnitude. One number in the sector is firm: hyperscaler capex.",
  status: "current",
  date: "2026-09-10",
  owner: "anshu",
  tags: ["estimates", "8.4x spread", "capex"],
  metrics: [
    { v: "$725–800B", l: "2026 hyperscaler capex guided by five operators — roughly 3× the ~$238B of 2024" },
    { v: "55–60%", l: "Share of that capex flowing to NVIDIA" },
    { v: "8.4×", l: "AI drug discovery 2026: $2.9B (Grand View) to $24.51B (Towards Healthcare)" },
    { v: "2.3×", l: "Grid-scale battery storage 2026: $8.32B to $19.09B across four firms" }
  ],
  body: [
    ["What the spread means in practice", "Quantum computing 2026 is sized between $1.82B and $5.09B, and the high 2026 estimate already exceeds QED-C's $3B-by-2028 revenue projection — so the two cannot be measuring the same thing. When four firms sizing one market land eight times apart, the number is not a measurement; it is a definition choice about what counts as in-scope revenue. Any deck built on a single sourced TAM figure inherits that choice silently."],
    ["The one firm number", "Hyperscaler 2026 capex, at $725–800B guided by five named operators, is a company-guided figure rather than a modelled one, roughly tripling the ~$238B of 2024, with 55–60% flowing to NVIDIA. It is the largest single capital flow in the sector and the one with the least estimation risk."],
    ["Convention adopted from this", "Where a market size appears anywhere in this portal it carries its source and its date, and it is labelled an estimate with its basis. Where firms disagree materially, the range is shown rather than a midpoint."]
  ]
},

/* ======================= GEOPOLITICS x TECHNOLOGY ======================= */
{
  id: "eu-machinery-2027",
  axis: "geo",
  kind: "brief",
  title: "20 January 2027: the EU makes third-party certification of learned policies mandatory",
  dek: "A dated legal obligation with no published method to satisfy it. The hardest forcing function on the board.",
  status: "current",
  date: "2026-09-07",
  owner: "anshu",
  tags: ["DATE", "EU 2023/1230", "ISO 25785-1", "forcing function"],
  metrics: [
    { v: "2027-01-20", l: "Machinery Regulation (EU) 2023/1230 applies; 2006/42/EC repealed" },
    { v: "800+", l: "Harmonised standards under the old Directive needing review" },
    { v: "77", l: "OSHA-reported robot accidents 2015–2022 — itself an n problem for actuaries" },
    { v: "2028-08-02", l: "Deadline for Commission delegated acts adding AI-specific requirements" }
  ],
  body: [
    ["The obligation", "Annex I Part A item 5 explicitly names \"safety components with fully or partially self-evolving behaviour using machine learning approaches ensuring safety functions\" as a high-risk category. That removes the self-certification option and mandates third-party Notified Body assessment through Module B (EU type-examination), Module H (full quality assurance) or Module G (unit verification). TÜV SÜD was the first NB designated under the new Regulation, September 2024. NB capacity is finite."],
    ["The gap in one sentence", "From January 2027, EU law requires a third party to certify a learned policy performing a safety function, and there is no published agreed method to do it. ISO 25785-1, the humanoid-specific standard, is unpublished. CEN/CENELEC missed the August 2025 deadline for AI harmonised standards and work is still ongoing. Notified bodies do not have the statistical machinery."],
    ["The US moved the other way", "There is no OSHA robot-specific standard; OSHA enforces reactively under General Duty Clause 5(a)(1), machine guarding and LOTO, and treats conformance to consensus standards as evidence of due diligence. Live standards: ANSI/A3 R15.06-2025 adopting ISO 10218-1/-2:2025, ISO 3691-4:2023 for driverless industrial trucks covering AGVs and AMRs, ANSI B56.5, ISO/TS 15066 for collaborative operation, UL 3300 added to OSHA's NRTL list on 2025-12-31. NHTSA withdrew AV STEP on 2026-06-26 and replaced it with case-by-case exemptions carrying enhanced-oversight conditions and Operational Authorizations; Zoox took the first US-built exemption."],
    ["Geography inverts", "The US declined to create a third-party AV evaluation regime, so that market shrank. The EU simultaneously created a mandatory third-party regime for self-evolving safety components. So: United States → sell into contracts and insurance. Europe → sell into regulatory certification."],
    ["Also true, and it complicates the date", "The AI Act moved Machinery from Annex I Section A to Section B, so Chapter III obligations do not apply directly. Instead the Commission must adopt delegated acts amending Machinery Regulation Annex III with AI-specific health and safety requirements by 2 August 2028, and the Annex I high-risk deadline slipped from 2 August 2027 to 2 August 2028."],
    ["Unresolved", "Rung-3 geography: EU January 2027 notified-body buyers against US RaaS and insurance buyers reachable from Stanford this quarter."]
  ]
},

/* ================================ THESES ================================ */
{
  id: "assurance-seam",
  axis: "thesis",
  kind: "thesis",
  title: "The assurance seam",
  dek: "Seven separate industrial openings are the same problem in seven costumes: a contract or a regulator now requires someone to certify a number nobody can currently measure.",
  status: "live",
  date: "2026-09-08",
  owner: "anshu",
  tags: ["EDGE", "7 beachheads", "kill test attached"],
  metrics: [
    { v: "7", l: "Independent beachheads: W4, W5, L2, L3, C1, C2, C4" },
    { v: "~7–8", l: "YC entrants now inside this seam, 2025–26 batches" },
    { v: "1/δ²", l: "Rollout scaling — the bottleneck grows as policies converge" }
  ],
  body: [
    ["The claim", "Everyone wants to train the policy; almost nobody wants to do measurement theory. Unbundling, performance contracts and a dated EU obligation together create demand for a neutral party that can state, with validity, what a learned policy can actually do. The nearest historical shape is a metrology house or a rating agency, not a SaaS company."],
    ["Why seven and not one", "W4 RaaS acceptance testing, W5 twin-based commissioning, L2 safety-case validation, L3 autonomy underwriting, C1 learned-policy conformity, C2 Scope 3 assurance, C4 robot safety standards. In each case a contract or a regulator now requires someone to certify a number nobody can measure. Seven independent buyers rather than one: if a buyer shrugs, the method transfers."],
    ["Where the precedent is exact", "ISO 9283 (\"Manipulating industrial robots — performance criteria and related test methods\") defines pose accuracy and pose repeatability, and an entire metrology-services sector exists to measure robots against it: Dynalog (CompuGauge, DynaCal), API Metrology, FARO, Leica/Hexagon, Creaform, Wiest, Teconsult, Bluewrist, Metronor, Metris, with the laser tracker as the standard instrument. All of it measures the mechanism. None of it measures the policy. ISO 9283 tells you the arm repeats to ±0.05 mm and tells you nothing about whether the VLA picks the bag 87% or 61% of the time. Instrument, service model, certificate and standard all exist one layer below the layer that now matters — and the seat is empty because there is no standard to measure against yet."],
    ["Competitive boundary, stated honestly", "Scenario-coverage V&V for vehicles is occupied — Applied Intuition ~$15B post-$600M Series F across automotive, trucking, defense, mining, construction, ag, aerospace and robotics; Foretellix $135M with NVIDIA backing. That method depends on parameterising a driving scenario: speed, gap, cut-in angle. \"Grasp the deformable item from a cluttered tote\" has no parameterisable scenario space, so scenario coverage does not transfer, leaving statistical inference over rollouts as the only route. That is a technical boundary of the incumbent method, not a marketing one."],
    ["What is already crowding in — material update, 2026-09-10", "The YC census surfaced roughly seven to eight entrants in this exact seam in the 2025–26 batches: Robocurve (S26, evals for robots, open-source independent benchmarks, arguing explicitly that no standardised robotics benchmarks exist and labs self-evaluate), Physical Turing (S25, evaluating humanoids in the real world — procures, staffs and operates target environments for rollouts), One Robot (W26, world models for robot evals), Valgo (W26, insurance risk layer for physical AI — notes car insurance draws on 30 billion claims records while autonomous trucks and robots have nearly zero), Risklytics (S26, AI-native insurance for frontier tech), PRINCEPS (S26, insurance for the compute economy), Hebbian Robotics (S26, APIs to verify robotics data quality), Standard Machines (S26, environments and evals for chip design). The seam is no longer empty. Nodes C1, W4 and L3 need re-scoring on the uncrowdedness axis before they are ranked."],
    ["Open fork", "Certificate — metrology house, hardware plus accredited method, slow-compounding, regulatory, rating-agency terminal economics. Or tooling — pure software, faster to ship and sell, competing directly with NVIDIA giving eval infrastructure away and with Lightwheel's funded twin platform."],
    ["Rule carried over from the last failure", "The pain must be learned from someone already spending money badly on it — never from a friend or a warm introduction. Borrowed pain is what broke the previous attempt: nine LOIs were the same warm connections counted repeatedly, and the pre-registered test (\"when the recorder silently dies, does anyone complain? silence is louder than install-day success\") resolved negative."]
  ]
},
{
  id: "sc-node-map",
  axis: "thesis",
  kind: "map",
  title: "Supply chain × emerging tech — 38-node map and research ledger",
  dek: "Nine clusters, 38 nodes, nine fixed fields per node so they stay comparable. One thesis under the mandate, not the whole of it.",
  status: "current",
  date: "2026-09-08",
  owner: "anshu",
  open: "reports/supply-chain-tech-map.md",
  openLabel: "Open the ledger",
  tags: ["38 nodes", "9 clusters", "EDGE / DATE / CROWD"],
  metrics: [
    { v: "38", l: "Nodes, each carrying a kill test" },
    { v: "9", l: "Clusters: four walls, yard & dock, line-haul, ports & rail, last mile, trust, planning, assurance, infrastructure" },
    { v: "every 5th", l: "Re-rank cadence; stop when two consecutive re-ranks give the same top three" }
  ],
  body: [
    ["Scope, as corrected", "\"Supply chain\" means the supply chain and logistics industry — freight, warehousing, ports, fulfilment, last mile — as the domain. The second bucket is emerging technology and how it is being applied. Physical AI is the largest branch, not the only one."],
    ["Per-node record, nine fixed fields", "1 the opening in two sentences. 2 what changed, with a date — if nothing changed it is not an opening. 3 who is already here, named, with funding and what each sells. 4 the buyer, what they spend badly on, roughly how much. 5 forcing function and its date, where \"none\" is a valid and important answer. 6 why it is still open, the specific technical or structural reason — a vague answer means it is not really open. 7 verdict against the edge: fit / adjacent / no fit. 8 score on five axes 1–5: forcing function, buyer pays today, edge fit, uncrowdedness, technical depth. 9 the kill test — the single question that would close the node, plus who can answer it."],
    ["Ledger mechanics", "Status vocabulary: untouched / scoped / researched / parked / killed. One gbrain page per node at research/sc-map/<id>-<slug>. Re-rank the whole ledger every fifth node; the stop condition is two consecutive re-ranks producing the same top three, which means desk research has saturated and it is time for primary evidence from people in those seats. Every node carries a kill test so the map converges rather than grows."],
    ["Controls built into the order", "T1 carrier identity fraud and N1 inventory foundation models are included as controls: both large, obvious openings with no relation to the edge, present specifically to test whether the edge is genuinely the best asset or merely the first thing examined."]
  ],
  files: [
    { p: "reports/supply-chain-tech-map.md", d: "Node index and research ledger" },
    { p: "reports/physical-ai-survey-charter.md", d: "Survey charter, secondary" }
  ]
},
{
  id: "twin-certification",
  axis: "thesis",
  kind: "thesis",
  title: "Nobody certifies the twin",
  dek: "The digital-twin-and-finetune business is funded and occupied. Certifying that a twin's evidence is admissible is not.",
  status: "current",
  date: "2026-09-07",
  owner: "anshu",
  tags: ["SRCC", "Lightwheel", "repositioning"],
  metrics: [
    { v: "$145–147M", l: "Lightwheel AI Series B, June 2026, Sequoia-led with a16z, Lux, Spark" },
    { v: "0.91 ± 0.04", l: "The shape of the sellable claim: SRCC on a task family" },
    { v: "60–70%", l: "Honest gross margin of the services-shaped early path" }
  ],
  body: [
    ["The idea that already exists and is well funded", "Lightwheel AI, founded 2023, runs a \"Physical Measurement Factory\": robotic rigs capture real contact, friction and dynamics off the customer's own hardware to calibrate the physics solver, build a validated twin of the actual production line, expand a small set of human demonstrations into a large varied training set, and fine-tune NVIDIA GR00T N1.7 to that specific robot and task entirely inside the twin. Deployed at Geely; co-calibrating Newton for Samsung cable handling. Claims the per-task train-and-iterate cycle drops from months to weeks. Adjacent or competing: NVIDIA Isaac Lab-Arena, Applied Intuition, Scale, and the synthetic-data players Synthesis AI, MetAI, Bifrost, Mindtech."],
    ["What remains open", "Nobody certifies the twin. Sim-to-real correlation is a research metric, not a product. Literature: SIMPLER (CoRL 2024) Pearson 0.924 / MMRV 0.056 on Google Robot visual matching against r=0.308 for the validation-loss proxy everyone actually uses; Real-is-Sim (arXiv 2504.03597), a dynamic digital twin for real-world policy evaluation; reconstructed simulators reported above 0.9 correlation on deformable manipulation; SRCC proposed as the metric, with the crucial caveat that a simulator can have high average real performance and low SRCC, which makes sim improvements unpredictable in the real world."],
    ["The sellable sentence", "\"Your twin has SRCC 0.91 ± 0.04 on this task family, therefore k sim rollouts substitute for m real rollouts with stated validity.\" That is precisely what a Notified Body will demand from January 2027 when a manufacturer offers simulation as evidence. Neither NVIDIA nor Lightwheel can certify their own tooling — conflict of interest is why third-party regimes exist at all."],
    ["Second and third openings", "Lightwheel's measurement factory serves Geely and Samsung, so a 40-robot 3PL has no path to it. And the three-way accountability problem — brain vendor, arm OEM, integrator — has no neutral measurer."],
    ["Hardware is entirely off the shelf", "Six-axis force/torque: Bota Systems SensONE retrofit kits pre-configured for UR, Franka, Stäubli, KUKA, Kassow and Piper, plus per-robot kits shipping with cables, adapters and mounts; also ATI, Robotiq, OnRobot. Tactile: GelSight Mini ~$500 per fingertip, Meta DIGIT (~$15 BOM), Digit360 (1 mN), L3 F-Touch combining tactile and three-axis force in one unit. Ground-truth pose: laser tracker (API / FARO / Leica) or CompuGauge-class rigs. Demonstration capture: UMI and Fast-UMI, Trossen TRumi as the supported commercial product, GELLO (~$300 per arm), ALOHA (~$20k bimanual), SO-101 ($100–130). The kit is an integration exercise — assemble a fixture, do not manufacture a product line."],
    ["Incumbent adjacency to watch", "FANUC ZDT and ABB Connected Services already stream fleet telemetry for predictive maintenance — ABB claims up to 25% fewer incidents and 60% faster response, with condition monitoring, diagnostics and a web portal across sites — and they own the install base and the connectivity. But note precisely what they measure: mechanical health, servo current, gearbox wear, vibration signatures. Not task success under a learned policy. That boundary is also the natural acquisition thesis. Second risk: the metrology incumbents could move up the stack; they hold instruments and accreditation but not the ML statistics. That race argues for speed on the method, not on the hardware."]
  ]
},

{
  id: "agent-system-plan",
  axis: "new",
  kind: "plan",
  title: "The research agent system: nine agents, the guardrails, the newsletter format",
  dek: "What Karpathy, Graham, Anthropic's engineering team and the expertise researchers actually say, turned into an architecture: five flow agents, four stock agents, eleven guardrails, and a daily format written out as a worked sample.",
  status: "current",
  date: "2026-09-10",
  owner: "anshu",
  open: "reports/agent-system-plan-2026-09-10.md",
  openLabel: "Read the plan",
  tags: ["9 agents", "11 guardrails", "format to agree"],
  metrics: [
    { v: "45% / 31% / 20%", l: "EBU-BBC study of 3,000+ AI news answers: significant issues, sourcing failures, accuracy failures. The reason for every guardrail." },
    { v: "+90% / 15×", l: "Anthropic's orchestrator gain over a single agent on parallel research, and its token cost" },
    { v: "1–2k tokens", l: "Condensed summary each sub-agent returns, so the editor never touches raw material" },
    { v: "<700 words", l: "The daily page ceiling. Review speed is the binding constraint on agentic work." }
  ],
  body: [
    ["The finding the architecture rests on", "Karpathy's formulation is that \"you can outsource your thinking, but you can't outsource your understanding\". That single line is why your two categories need two systems rather than one better newsletter. Flow is perishable and its value is the delta. Stock is durable and compounds. A flow agent succeeds when it says nothing happened on a quiet day; a stock agent succeeds when you can explain the domain to a skeptical practitioner six weeks later without notes. Those tests reward opposite behaviour, so one prompt cannot hold both."],
    ["Why the guardrails are shaped the way they are", "In June and July 2025, researchers from 22 public service media organisations across 18 countries and 14 languages evaluated more than 3,000 AI assistant answers to news questions. 45% carried at least one significant issue, 31% had significant sourcing problems including fabricated citations, and 20% had major accuracy problems. Sourcing failures exceeding accuracy failures is the operative detail: a wrong fact eventually contradicts something you know, a wrong citation never does. Hence rule one, no link no claim, and rule two, quote the number."],
    ["The one design decision that matters most", "Separate collection from writing, and give the writer a hard budget. Almost every disappointing research agent fails identically: one agent gathers and then writes, it gathers more than it can hold, and it writes to fill the expected length. Collectors extract, which is verifiable and cheap. The editor selects, which is where intelligence should be spent. The budget converts the editor's job from describing everything it received into choosing what earns the space."],
    ["Where the build should start", "Three agents, not nine. F3 Policy Diff, because its sources are free, primary, machine-readable and almost unread, and because it serves the one thesis with a dated deadline. F1 Capital Ledger, because it is the axis you already trust and it calibrates the format fast. S3 Explainer on one domain, because it is the only one that changes what you are capable of noticing. F4 Frontier Claims is the most appealing and should wait, because it is blocked on X access and on a hand-built account list."],
    ["The six decisions that are yours, not mine", "The funding floor. Delivery time and channel. Whether weekends run. One newsletter or five, which is the one where I argue against your stated preference in the document. Which domain the stock side starts with. And the X account list, which is unavoidably manual and is the entire asset of F4."]
  ],
  files: [
    { p: "reports/agent-system-plan-2026-09-10.md", d: "The full plan, 13,700 words, sources cited inline" }
  ]
},

/* ============================ MACRO & CYCLES ============================ */
{
  id: "freight-cycle-2026",
  axis: "macro",
  kind: "brief",
  title: "The freight cycle turned — and it is the wrong problem",
  dek: "Kept on the board as a closed question, because closing things explicitly is what stops them being reopened as if new.",
  status: "closed",
  date: "2026-09-07",
  owner: "anshu",
  tags: ["closed", "freight", "control"],
  metrics: [
    { v: "14.2%", l: "Tender rejection rate" },
    { v: "June 2026", l: "Spot overtook contract" },
    { v: "$75k → $150k", l: "FMCSA broker bond" },
    { v: "$700M–1B/yr", l: "Estimated freight fraud" }
  ],
  body: [
    ["What is true", "Freight is genuinely turning: tender rejections 14.2%, spot overtook contract in June 2026, capacity contracting. FMCSA doubled the broker bond from $75k to $150k and raised double-brokering penalties from $16k to $50k; complaints ran about 8,000 in 2025 against roughly 2,000 in 2021, with fraud estimated at $700M–1B a year."],
    ["Why it is closed anyway", "That is an identity, trust and verification problem, won by whoever holds load-board and TMS distribution. It is not a learned-policy measurement problem. Good business, wrong fit — recorded here so it does not get rediscovered."],
    ["Autonomous trucking, for the record", "Aurora around 440k driverless miles with zero system-attributed collisions across 10 Sun Belt lanes; Kodiak targeting driver-out by end 2026 and 100 driverless trucks by mid-2027 with Atlas Energy in the Permian; California highway AV truck testing opened August 2026 with the Teamsters challenging. Statistically, 440k miles of zero events cannot distinguish superhuman from far-worse-than-human against a human fatal rate near one per 10⁸ miles — the Kalra–Paddock problem."]
  ]
}

];

/* ── Provenance ───────────────────────────────────────────────────────────
   Where each card's claims actually came from. Three cases that are
   otherwise indistinguishable on a card face:
     own-prior-work   you did this research in an earlier session; the
                      reasoning is in gbrain and you have seen it
     web-2026-09-10   web research run on 2026-09-10, in this session or the
                      parallel Stanford one. NEW TO YOU.
     agent            produced by one of the agents in data/agents.js
   Merged onto cards by assets/app.js and shown on the card face.           */
window.PROVENANCE = {
  "yc-batch-census":            { kind: "own-prior-work", note: "Your own census pass, 2026-09-10. Method and findings recorded in gbrain; all 3,009 records scraped from YC's public Algolia index." },
  "physical-ai-capital-map":    { kind: "own-prior-work", note: "Your Noctem-pivot research sessions of 2026-09-07, recorded in gbrain. Valuations were web-retrieved then, not re-verified since." },
  "physical-intelligence-review": { kind: "own-prior-work", note: "You wrote it. 36,765 words, 2026-09-03, with the source list in the document." },
  "stanford-frontier-map":      { kind: "own-prior-work", note: "Your census pass, 2026-09-10. Faculty structure is computed from Stanford's own affiliation records; the classifier limits are stated on the card and in the deliverable." },
  "stanford-money-layer":       { kind: "web-2026-09-10", note: "NEW TO YOU. Web-retrieved 2026-09-10 in the parallel Stanford session. Every company figure carries the outlet that reported it; the Bloomberg $11B talks and the Human Intelligence round are explicitly unconfirmed." },
  "market-size-spread":         { kind: "web-2026-09-10", note: "NEW TO YOU. Research-firm estimates collected 2026-09-10. The spread is the finding; no single figure here should be quoted as a market size." },
  "eu-machinery-2027":          { kind: "own-prior-work", note: "Your regulatory research of 2026-09-07, recorded in gbrain. Regulation numbers, annex citations and dates are from the primary instruments." },
  "assurance-seam":             { kind: "own-prior-work", note: "Your thesis, developed across the 2026-09-07 and 09-08 sessions. The 2026-09-10 crowding update comes from your own YC census." },
  "sc-node-map":                { kind: "own-prior-work", note: "Your 38-node map and ledger, 2026-09-08. The scope correction and the nine-field record template are your decisions, recorded verbatim in gbrain." },
  "twin-certification":         { kind: "own-prior-work", note: "Your research of 2026-09-07. Lightwheel round and the SRCC literature were web-retrieved then; the repositioning argument is from that session." },
  "freight-cycle-2026":         { kind: "own-prior-work", note: "Your 2026-09-07 session. Kept as a closed card deliberately so the question is not reopened as new." },
  "agent-system-plan":          { kind: "web-2026-09-10", note: "NEW TO YOU. Research run 2026-09-10 against Karpathy, Graham, Anthropic engineering, Commoncog and the EBU/BBC study, cited inline in the document. The architecture and the nine agents are proposals, not findings." }
};
