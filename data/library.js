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
  id: "stanford-faculty-census",
  axis: "new",
  kind: "dashboard",
  title: "Stanford faculty & lab census",
  dek: "Every Stanford faculty profile across 21 schools, institutes and centres, with research-interest text. The YC census method pointed at the people within walking distance.",
  status: "running",
  date: "2026-09-10",
  owner: "anshu",
  tags: ["profiles.stanford.edu", "21 orgs", "crawl in flight"],
  metrics: [
    { v: "690", l: "School of Engineering faculty listings" },
    { v: "189", l: "HAI" },
    { v: "1,763", l: "Vice Provost & Dean of Research" },
    { v: "5,156", l: "School of Medicine, the largest listing set" }
  ],
  body: [
    ["Why", "Stated aim, verbatim: \"me being at stanford is very powerful. I right now only know chelsea finn and PI. I am sure there are so many more stalwarts out there here doing crazy stuff.\" Same census method as the YC pass, pointed at Stanford instead of a batch list."],
    ["Method", "profiles.stanford.edu /browse/<org> with ?affiliations=capFaculty&ps=100&p=N, parsed out of the mini-profile-holder list items: slug, name, title, and the research-interest paragraph. Pages are cached to disk so the crawl is resumable. Faculty appearing in several orgs are deduplicated by slug, keeping the longest interest text."],
    ["Coverage mapped", "21 orgs: SoE 690, H&S 1,395, Medicine 5,156, Doerr Sustainability 357, GSB 149, GSE 122, SLAC 92, VPDoR 1,763, Bio-X 1,151, HAI 189, Sarafan ChEM-H 112, Stanford Data Science 10, Wu Tsai Neurosciences 658, Wu Tsai Human Performance Alliance 364, Precourt 116, Woods 164, PULSE 20, ICME 78, Stem Cell 51, FSI 91, SIEPR 99."],
    ["Status", "The crawl was live as of 2026-09-10 08:15 in a parallel session. The harvest scripts are preserved here so the method survives that session; the finished dashboard drops into reports/ when it lands and appears on the Reports tab automatically."]
  ],
  files: [
    { p: "reports/stanford-faculty-census/harvest.py", d: "Resumable crawler and parser" },
    { p: "reports/stanford-faculty-census/org_counts.json", d: "The 21 org paths and their faculty counts" },
    { p: "reports/stanford-faculty-census/orgs.py", d: "Org discovery" }
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
