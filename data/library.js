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
    ["Known soft spots", "web.archive.org is unreachable from this machine, so historical page states came from secondary sources. ycombinator.com/rfs only server-renders the currently selected edition — the tab buttons are React state with no href — so earlier editions were reconstructed from secondary sources, and the Winter-2025-vs-Spring-2025 boundary is explicitly unreliable."],
    ["The pipeline is in the repo, and re-runnable", "tools/yc holds the three scripts and the 2026-09-10 datasets, so this stops being a snapshot and becomes something that can be refreshed: python scrape.py, then classify2.py, then build.py, which writes straight back into reports/. Two things were hardened on 2026-09-14 so a re-run does not silently fail. The Algolia search key rotates, so scrape.py now reads it live out of window.AlgoliaOpts in the directory page and only falls back to the stored key. And batches are discovered from the index facet rather than hardcoded, so a batch YC adds later flows through with no code edit. This is the code the batch-delta agent charter needs; tools/yc/README.md documents the delta procedure."],
    ["What a refresh would change, as of 2026-09-14", "A test re-run four days after the pull returned 3,014 companies across 16 batches: Winter 2027 now exists as a batch with one company, Fall 2026 has grown from 46 to 51, and Summer 2022 has dropped from 234 to 233 — a company removed from the directory. The published dashboard and every figure on this card remain the verified 2026-09-10 pull. The observation prose in build.py and the metrics on this card are hand-written for that pull, so a republish means re-checking each figure rather than just re-running the scripts."]
  ],
  files: [
    { p: "reports/yc-batch-map.html", d: "The dashboard, self-contained, 1.9 MB" },
    { p: "tools/yc/README.md", d: "How to re-run the pipeline, and how to generate a batch delta" },
    { p: "tools/yc/scrape.py", d: "Live pull from YC's Algolia index — rotating key read at runtime, batches discovered from the facet" },
    { p: "tools/yc/classify2.py", d: "21 themes, 22 flags, weighted keyword scoring against YC's own industry labels" },
    { p: "tools/yc/build.py", d: "Emits the dashboard into reports/; header and counts derive from the data" },
    { p: "tools/yc/companies.json", d: "The classified 2026-09-10 snapshot, 3,009 records" },
    { p: "tools/yc/trends.json", d: "Per-batch theme and flag shares behind the Trends tab" },
    { p: "tools/yc/rfs.json", d: "Eight RFS editions, 97 requests, with the source named per edition" },
    { p: "tools/yc/market.json", d: "22 market clusters — spend today, estimate, arithmetic, equity scale" }
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
  dek: "Seven industrial openings were the same problem in seven costumes. Two kill arguments landed on 13 September and the surviving claim is narrower: non-regression at the moment of a model update. On 15 September an independent paired benchmark measured the gap the surviving claim depends on, and a federal agency sized an entire voluntary certification programme at nine submissions a year.",
  status: "contested",
  date: "2026-09-15",
  owner: "anshu",
  tags: ["EDGE", "7 beachheads", "kill test attached"],
  metrics: [
    { v: "7", l: "Independent beachheads: W4, W5, L2, L3, C1, C2, C4" },
    { v: "~7–8", l: "YC entrants now inside this seam, 2025–26 batches" },
    { v: "2", l: "Frontier labs that committed to embedded third-party evaluators, 2026-09-12" },
    { v: "0", l: "Times the field has paid for evaluation tooling rather than open-sourcing it" },
    { v: "2028-08-02", l: "Delegated act carrying high-risk AI requirements into the Machinery Regulation, after Reg (EU) 2026/1744 moved it to AI Act Annex I Section B" },
    { v: "29.0%", l: "Matched initial states that change outcome under compound perturbation while the aggregate difference is not distinguishable from zero (arXiv 2609.15940)" },
    { v: "9", l: "Submissions a year the EAC estimates for its entire voluntary third-party certification programme, ESTEP" }
  ],
  body: [
    ["The claim", "Everyone wants to train the policy; almost nobody wants to do measurement theory. Unbundling, performance contracts and a dated EU obligation together create demand for a neutral party that can state, with validity, what a learned policy can actually do. The nearest historical shape is a metrology house or a rating agency, not a SaaS company."],
    ["Why seven and not one", "W4 RaaS acceptance testing, W5 twin-based commissioning, L2 safety-case validation, L3 autonomy underwriting, C1 learned-policy conformity, C2 Scope 3 assurance, C4 robot safety standards. In each case a contract or a regulator now requires someone to certify a number nobody can measure. Seven independent buyers rather than one: if a buyer shrugs, the method transfers."],
    ["Where the precedent is exact", "ISO 9283 (\"Manipulating industrial robots — performance criteria and related test methods\") defines pose accuracy and pose repeatability, and an entire metrology-services sector exists to measure robots against it: Dynalog (CompuGauge, DynaCal), API Metrology, FARO, Leica/Hexagon, Creaform, Wiest, Teconsult, Bluewrist, Metronor, Metris, with the laser tracker as the standard instrument. All of it measures the mechanism. None of it measures the policy. ISO 9283 tells you the arm repeats to ±0.05 mm and tells you nothing about whether the VLA picks the bag 87% or 61% of the time. Instrument, service model, certificate and standard all exist one layer below the layer that now matters — and the seat is empty because there is no standard to measure against yet."],
    ["Competitive boundary, stated honestly", "Scenario-coverage V&V for vehicles is occupied — Applied Intuition ~$15B post-$600M Series F across automotive, trucking, defense, mining, construction, ag, aerospace and robotics; Foretellix $135M with NVIDIA backing. That method depends on parameterising a driving scenario: speed, gap, cut-in angle. \"Grasp the deformable item from a cluttered tote\" has no parameterisable scenario space, so scenario coverage does not transfer, leaving statistical inference over rollouts as the only route. That is a technical boundary of the incumbent method, not a marketing one."],
    ["What is already crowding in — material update, 2026-09-10", "The YC census surfaced roughly seven to eight entrants in this exact seam in the 2025–26 batches: Robocurve (S26, evals for robots, open-source independent benchmarks, arguing explicitly that no standardised robotics benchmarks exist and labs self-evaluate), Physical Turing (S25, evaluating humanoids in the real world — procures, staffs and operates target environments for rollouts), One Robot (W26, world models for robot evals), Valgo (W26, insurance risk layer for physical AI — notes car insurance draws on 30 billion claims records while autonomous trucks and robots have nearly zero), Risklytics (S26, AI-native insurance for frontier tech), PRINCEPS (S26, insurance for the compute economy), Hebbian Robotics (S26, APIs to verify robotics data quality), Standard Machines (S26, environments and evals for chip design). The seam is no longer empty. Nodes C1, W4 and L3 need re-scoring on the uncrowdedness axis before they are ranked."],
    ["REVISED 2026-09-13: two kill arguments, and the thesis is now narrower", "The commons argument: every sophisticated actor that felt this pain built the tool and gave it away. TRI open-sourced lbm_eval with 49 tasks, Berkeley open-sourced RoboArena, and the same happened with Bi-DexHands, DaXBench, GarmentLab and SoftGym. The field has priced evaluation tooling at zero every time it has been asked. The self-liquidation argument: DYNA reports 99.4% on towel folding across 850+ napkins and 99% acceptance across 200,000+ towels, so where reliability is real the trial counts arrive free from production telemetry, meaning valid evaluation is cheapest exactly where the business would work. Also a correction to the 2026-09-07 reading: NHTSA withdrawing AV STEP cuts against the thesis rather than for it, because a regulator declining to create a third-party evaluation regime makes each safety case a services engagement rather than a product. WHAT SURVIVES, and it is narrower: production telemetry cannot tell you whether an over-the-air update is a regression, because you cannot run the previous policy counterfactually without surrendering throughput. Non-regression at the moment of model update is the defensible wedge, not general evaluation."],
    ["The other side of the ledger, 2026-09-14", "Dario Amodei committed Anthropic unilaterally to giving third-party evaluators permanent employee-level access, with the right to publish adverse findings, and Sam Altman committed OpenAI to match it the same day. That is a third-party evaluation function created voluntarily by the two largest labs, with no regulator involved, in the same eighteen months in which the EU made third-party conformity assessment mandatory for self-evolving safety components and BIS made chip export eligibility conditional on independent third-party performance testing. Direction: this weakens the commons argument in one specific respect, because these labs are inviting an outside examiner rather than open-sourcing a tool. It does not answer whether the examiner's seat is a product or a services engagement, and the labs choose their own examiners and can unchoose them."],
    ["Two weakening items, 2026-09-14 afternoon run", "The dated EU obligation is one assessment, not two, and its AI-specific content is deferred. Regulation (EU) 2026/1744, the Digital Omnibus on AI, in force 27 July 2026, moved Regulation (EU) 2023/1230 out of Section A of Annex I to the AI Act and added it as point 21 of Section B, so a manufacturer no longer runs a separate AI Act conformity assessment on a safety component on top of the Machinery one, and the delegated act carrying the high-risk AI technical requirements into the Machinery Regulation is due 2 August 2028 rather than biting on 20 January 2027. Machinery Annex I Part A item 5 is untouched and still routes self-evolving ML safety components through a notified body under Module B, G or H. That is now confirmed against the primary text, read at CELEX 32026R1744: Article 3 is the only article amending the Machinery Regulation, it amends Articles 8, 20 and 47, and it does not mention Annex I. So the third-party assessment survives and became singular rather than doubled, which is the opposite of what a headline reading of the Omnibus would suggest. Separately, FoldNet++ (arXiv 2609.12433, submitted 11 September 2026) reports 120K synthetic episodes across 6 embodiments and states that policies trained solely on synthetic data exceed 90% end-to-end success deployed zero-shot to unseen real T-shirts and environments. That extends the self-liquidation argument from production telemetry to pre-deployment: a simulator good enough to train a transferable policy is available to the buyer as an evaluation instrument at no marginal cost. It holds only if the FEM cloth dynamics match reality on the actions used, which is self-reported and unreplicated."],
    ["Both directions at once, 2026-09-15", "Supporting: the surviving claim is that an aggregate rate cannot tell you whether an update is a regression, and an independent paired benchmark has now measured how large that blind spot is. LIBERO-CTRL (arXiv 2609.15940, submitted 14 September 2026) pairs each initial state across six single-axis perturbation conditions and a matched simultaneous condition, and reports that \"even when the difference between the two transition rates is not statistically distinguishable from zero, as many as 29.0% of matched initial states still change outcome\", reaching 34.5% in the most affected condition across six policies and three severity levels. Its stated conclusion is that \"matched per-instance evaluation is needed to reveal how joint perturbations alter behavior\". Two caveats: it is simulation only with no physical deployment, and it was published free on arXiv by two authors, which is the commons argument operating again on the method rather than on the tooling. Weakening, at equal weight: the US Election Assistance Commission published the application form for ESTEP on 15 September 2026, a voluntary federal third-party certification programme which \"evaluates the functionality, security, and accessibility of election-supporting technologies\", and its own Paperwork Reduction Act burden table sizes the whole national programme at 3 first-time submissions of 240 hours and 6 subsequent submissions of 32 hours, a total of 1,296 hours and $101,217.60 a year. That is a voluntarily created evaluator seat with a measured annual volume of nine, which is the first number this board has on the size of a voluntary attestation market and it is small. It bears directly on the open question of 14 September about whether a voluntary evaluator seat becomes a product faster than a mandated one."],
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
  id: "synthetic-robot-data-landscape",
  axis: "thesis",
  kind: "report",
  title: "Synthetic robot data and sim-to-real landscape",
  dek: "The material companies, infrastructure platforms and 29 research papers behind the synthetic-data thesis, separated by what they actually generate: pixels, trajectories, calibrated twins or policy evidence.",
  status: "current",
  date: "2026-09-14",
  owner: "anshu",
  open: "reports/synthetic-robot-data-landscape-2026-09-14.md",
  openLabel: "Open report",
  tags: ["sim-to-real", "synthetic data", "29 papers", "Lightwheel", "FoldNet++", "EDGE"],
  metrics: [
    { v: "~93%", l: "FoldNet++ synthetic-only real success on Galbot: 14 of 15 reported trials, with a wide confidence interval" },
    { v: "~67%", l: "FoldNet++ on the out-of-distribution ARX embodiment, exposing the remaining transfer gap" },
    { v: "100:1", l: "Lightwheel's company-reported simulated-to-real data ratio in its Geely deployment" },
    { v: "29", l: "Research papers and projects mapped across randomisation, demonstration multiplication, real-to-sim, world models, deformables and evaluation" }
  ],
  body: [
    ["The thesis, stated precisely", "A small amount of real measurement or demonstration can anchor a simulator or world model, after which synthetic variation can multiply the useful training distribution far more cheaply than collecting every case on hardware. The evidence is strong for bounded tasks and not yet proof of broad sim-only autonomy."],
    ["The market is not one market", "Perception vendors generate labelled pixels; simulation engines generate physics rollouts; demonstration systems turn a few examples into many trajectories; Real2Sim firms calibrate a customer-specific twin; evaluation platforms ask whether simulated policy ranking predicts hardware. Only the last four address action validity, and only a small group combines them."],
    ["Closest companies", "Lightwheel is the closest direct commercial competitor to the complete Real2Sim2Real thesis. Bifrost and Duality overlap horizontally. Applied Intuition has the capital and AV tooling to move into general physical AI. Intrinsic owns the industrial workcell path. NVIDIA is the enabling platform incumbent. AgiBot and Ai2/MolmoBot show that raw synthetic trajectories may be commoditised through open releases."],
    ["What FoldNet++ does and does not prove", "Its best synthetic-only system reports about 14 successes in 15 real Galbot trials, roughly matching pretrained pi0 on that protocol. The same method falls to roughly 67% on an out-of-distribution ARX embodiment. Fourteen of fifteen is excellent evidence of feasibility but statistically compatible with a much wider range of true reliability, and it would still imply too many interventions for many production tasks."],
    ["The open commercial layer", "Raw synthetic episodes are getting cheaper. The scarce layer is measured validity: for this robot, task and site, which generated experience is action-correct, which scenario classes remain invalid, how well does simulated performance predict real performance, and how many real trials does the synthetic evidence actually replace?"],
    ["Nocteam wedge", "Do not begin as another general synthetic-data studio. Test an independent validity layer, a synthetic-data acceptance test, or a last-mile calibration kit for smaller fleets. The first artifact should compare real-only, synthetic-only, a naive mixture, and calibrated synthetic plus real-failure replay on one contact-rich task across two embodiments."],
    ["Evidence discipline", "Company deployment figures are labelled as vendor-reported. Different folding tasks and initial-state distributions are not treated as matched benchmarks. The report excludes thin lead-generation sites and generic consultancies without a concrete product, dataset, paper or deployment." ]
  ],
  files: [
    { p: "reports/synthetic-robot-data-landscape-2026-09-14.md", d: "Full report, company matrix, infrastructure map, 29-paper reading list, failure modes and proposed thesis test" }
  ]
},

{
  id: "terrain-map",
  axis: "new",
  kind: "map",
  title: "Terrain map: three domains, breadth before depth",
  dek: "Certification, the robot policy layer, and the datacenter buildout, each on the same six headings so they stay comparable. A map, not the territory.",
  status: "live",
  date: "2026-09-14",
  owner: "anshu",
  open: "reports/terrain-map.md",
  openLabel: "Open the map",
  tags: ["breadth first", "3 domains", "serialised daily"],
  metrics: [
    { v: "16.3%", l: "Bureau Veritas FY2025 adjusted operating margin. Certification division 18.2%. Not a software business." },
    { v: "~98%", l: "Share of the machinery sector that is SMEs, per recital 27 of the Regulation itself" },
    { v: "2 weeks / 2 months", l: "Notified-body objection window with accreditation, against without. Accreditation is the long pole." },
    { v: "$254B–$321B", l: "2026 TIC market across four research houses. A 26% spread on a mature market; the spread is the finding." }
  ],
  body: [
    ["Why breadth rather than one domain", "Your decision of 2026-09-14, verbatim: \"cover it broadly as of now. as time goes by, we can filtr it as my undersatnding also gets more nuanced.\" That is a different design from the one in the plan, which assumed a single domain taken to the frontier immediately. So the stock side now has two stages: a cheap breadth pass across all three candidates, which an agent can do, and then the expensive six-part explainer on one of them, which needs fifteen to twenty hours of your reading and cannot be delegated."],
    ["How the narrowing actually happens, so it does not drift", "The attention table in reports/knowledge-state.md counts which domains the daily brief items fall into and which ONE QUESTION prompts you actually answer in the scratchpad. When the map is fully delivered, the domain with the most answered questions and the least depth is the candidate for the full explainer. The tally is the input, not the decision."],
    ["What section 1 closed, and what it did not", "The gap I claimed existed was how a notified body works as a business, and it is now partly closed from primary text. Article 30(8) of Regulation 2023/1230 states that assessor and management remuneration \"shall not depend on the number of conformity assessments carried out or on the results of those assessments\", which removes the two levers a normal services business uses to scale and is the actual mechanism behind the notified-body capacity shortage. Article 25(5) obliges notified bodies to take SME interests into account when setting fees, against a sector that recital 27 puts at roughly 98% SMEs. Article 34(5) sets the objection window at two weeks with an accreditation certificate and two months without. Still not found: any published fee schedule or day rate, revenue per assessor, the duration of the accreditation step, and the count of bodies designated under 2023/1230, because NANDO did not respond to four retrieval attempts and the Single Market Compliance Space API returns a page shell rather than data."],
    ["The live disagreement it surfaced", "Whether 20 January 2027 is a hard forcing function or a soft one. Hard: Annex I Part A item 5 removes self-certification for self-evolving ML safety components and was confirmed untouched by the Digital Omnibus, since Regulation (EU) 2026/1744 Article 3 amends only Machinery Articles 8, 20 and 47. Soft: no harmonised standards for the AI requirements had been submitted as of August 2026, the AI-specific content is deferred to a delegated act that \"shall apply by 2 August 2028\", and new Article 20(10) lets manufacturers lean on AI Act harmonised standards in the interim. The hard reading requires notified bodies to assess without a cited standard on their own judgment; the soft reading requires enforcement to tolerate a sixteen-month gap between an obligation applying and a method existing."],
    ["Sections 2 and 3 are honest about being incomplete", "The robot policy layer is a skeleton: vocabulary, value chain, valuations and a candidate constraint are sourced, while deployment unit economics, anyone's gross margin, and the live disagreement are not. Symbotic is public and no filing in the sector has been read, which is the cheapest available fix. The datacenter section is scope only, carrying one sourced figure, and says so rather than appearing complete."]
  ],
  files: [
    { p: "reports/terrain-map.md", d: "The map. Section 1 written, 2 skeleton, 3 scope only." },
    { p: "reports/knowledge-state.md", d: "The state file the agents read: watchlist, theses, attention tally, open questions" }
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
},
{
  id: "nanorobotics-field-map",
  axis: "new",
  kind: "brief",
  title: "Nanobots: what exists, what is physically impossible, and who is paying",
  dek: "Sixty-seven years from Feynman to a magnetically steered capsule in a sheep's brain. The field advanced by abandoning its original object — and three physical constants bound everything that remains.",
  status: "current",
  date: "2026-09-11",
  owner: "anshu",
  open: "reports/nanorobotics-field-map-2026-09-11.md",
  openLabel: "Open report",
  tags: ["micro/nanorobotics", "ARPA-H", "molecular machines", "protein design", "APM"],
  metrics: [
    { v: "$175M", l: "All-time disclosed VC into untethered micro/nanorobot companies, every vintage combined" },
    { v: "$175.3M", l: "ARPA-H AIR program, 5 years, awarded 6 Aug 2026 — out-funds two years of global VC in the sector" },
    { v: "0", l: "Registered human trials of an untethered microrobot, as of 11 Sep 2026" },
    { v: "3.7 nm", l: "Directional persistence length of a 100 nm 'nanobot' at 10 µm/s — 4% of its own body" }
  ],
  body: [
    ["The category error", "Almost nothing called a nanobot is one. Convention: nanorobot ≤1 µm, microrobot <1 mm, millirobot <1 cm. Bionaut's device is 3.1 mm, Stanford's M3bot ~2.5 mm, Robeauté's 1.8 mm — all millirobots. The only genuinely autonomous microrobots that exist are 200 × 300 × 50 µm. DNA origami at 50–100 nm is the only true nanorobot class, and it cannot move purposefully. A second distinction matters as much: every medical device in the field is a passive object dragged by a room-sized magnet, not an agent."],
    ["Three numbers that bound the field", "(1) Rotational Brownian diffusion sets a floor at ~1 µm — a 100 nm object forgets its heading in 0.37 ms, travels 3.7 nm in that time, and has an effective thermal velocity of 272 µm/s against propulsion of 1–10 µm/s. Péclet 0.22: transport is diffusive, not directed. Nothing changes kT. (2) Imaging sets a second floor at ~10 µm — an iron-oxide particle blooms the MRI field over ~50× its size against a 500 µm voxel. Below that, only swarms are locatable. (3) Dose mass sets a ceiling at ~10⁸–10⁹ units — 10¹² ten-micron robots is one litre of injected solid. Floors push up, ceiling pushes down; the surviving window is 1–100 µm at 10⁶–10⁹ units, which excludes both literal nanobots and dose-scale systemic therapy."],
    ["The power story is the opposite of the one usually told", "Energy to swim 1 cm as a 10 µm sphere: 94 femtojoules, against ~2.7 µJ storable in a 1 pL volume — a 29-million-fold margin. Propulsion is free. What consumes the budget is digital logic and actuator inefficiency: Cornell measured surface electrochemical actuators at 10⁻⁴ efficiency with ~1% photovoltaic transmission. At 75 nW draw, a full-volume battery lasts 36 seconds. Hence the field's answer — do not carry power, harvest an external field — which creates the steering problem."],
    ["Steering from outside is the binding clinical constraint", "Gradient force scales as L³ against drag at L, so v ∝ L²; rotating-field torque scales with drag, so speed ∝ L. That is why every group abandoned gradient pulling for helical or rolling propulsion — Zhang & Nelson's 2009 design still wins. Depth: gradient falls as 1/d⁴, leaving 0.39% at 20 cm relative to 5 cm. Clinical MRI gradients are 0.04 T/m against 1–9.5 T/m benchtop rigs: the only hardware that exists at human scale is ~250× too weak. Holding a 10 µm sphere against capillary flow needs 57 pN; clinical MRI delivers 10 pN. And control is underactuated as a theorem, not a gap: a homogeneous robot team is uncontrollable from any global field. Two or three robots have been independently controlled; therapeutic dose is 10⁹."],
    ["What actually happened, Nov 2025 – Aug 2026", "Landers et al., Science 390:710, 28 authors, ETH Zurich: gelatin capsule with iron oxide (steering) and tantalum (X-ray visibility), three navigation modes, >95% delivery success in live pigs and sheep, payloads including thrombolytics. Nelson's estimate for humans: three to five years. Then 6 Aug 2026, ARPA-H's AIR program awards up to $175.3M over 5 years — Stanford $27.2M for the M3bot milli-spinner (>55 cm/s, shrinks clot volume >95%), Berkeley $19.3M, with Siemens Healthineers and Philips as funded TA1 performers and Philips, Medtronic and Terumo Neuro attached to Stanford. Rationale: only 12% of 335,000 eligible US stroke patients get thrombectomy. Separately, Penn + Michigan (Science Robotics, 15 Dec 2025) built the first genuinely autonomous microrobots: 200 × 300 × 50 µm, 55 nm CMOS, processor + memory + sensor + comms on 75 nanowatts of onboard solar, months of operation, ~1¢ each. Funded by NSF, AFOSR, ARO, Packard and Sloan — no venture capital."],
    ["The nanoscale end converged on biology", "CBN Nano Technologies (Freitas and Merkle co-authoring) demonstrated real mechanosynthesis between Dec 2025 and Jun 2026 — positional carbon donation and silicon abstraction on Si(100) at 93–97% per-operation yield. Drexler was right about the chemistry, 23 years late. But it runs at 4.4 K, serially, with manual drift correction, and the primary literature states that even 7 million STM tips in parallel on a 300 mm wafer is many orders of magnitude too slow. Smalley was right about manufacturing. The irony: Smalley's own rebuttal — 'enzymes and ribosomes already do this' — became the winning path. De novo protein design (RFdiffusion3, Dec 2025, 90% active-site scaffolding) builds atomically precise nanomachines and manufactures them by fermentation. It has absorbed >$2.3B plus a $400M IPO since 2024, against ~$70M for atomically precise manufacturing across its entire 29-year history."],
    ["Who is paying, and the ratio", "All-time disclosed VC into untethered micro/nanorobot companies: ~$175M (Bionaut, Robeauté, Nanoflex, Endiatx, Theranautilus, DNA Nanobots, Amplifold). Run-rate $30–40M/year — 0.2–0.3% of robotics VC, which hit $18.8B in 2026 YTD. One Apptronik extension ($520M, Feb 2026) is 3× the field's entire historical capitalisation. The '$9.10B nanorobots market' in analyst reports is AFM and nanomanipulator revenue for Bruker, JEOL, Thermo Fisher and ZEISS; nanomanipulators alone are 31% of it, and vendor forecasts for the same category span $4.52B to $31.4B. US federal civilian nanotech funding meanwhile fell 31.7% in the FY2026 NNI request (NSF −67.5%, NIH −39.7%, NIOSH zeroed) while the Department of War line rose 9.3% and has more than doubled since 2016. China holds 43% of granted nanotech patents 2000–2025 and published 62.4% of micro/nanomotor cancer papers; India is #2 by publication count, the US #3 and declining."],
    ["The exit record", "Nanoscribe: bought for €50M (2021), sold for €26M (2024). Zyvex: 29 years, a founder's personal fortune, dismembered — the only commercial output was a materials business selling hockey sticks. Nanophase survived by becoming a cosmetics company. Molecular Assemblies shut down 2024; Catalog absorbed 2026. And the nearest deployed relative, Stereotaxis, has been doing this since 1990 and did $32.4M of revenue in FY2025, still loss-making — on the easy version of the problem, a tethered catheter with a magnet on the tip."],
    ["Credibility items to carry", "Ido Bachelet announced in Oct 2014 that a terminal leukaemia patient would receive DNA nanobots; no outcome, no registry entry, no follow-up has ever appeared. Hao Yan's thrombin-carrying DNA origami nanorobot (Nature Biotechnology, 2018, complete regression in 3 of 8 melanoma mice) has never been independently replicated and never entered a clinic. Bionaut's last formal communication is its Nov 2022 Series B; a Feb 2024 report that Mayo trials would start 'later this year' was never updated or retracted. Nanoflex's first-in-human has slipped from Q3 2023. Three companies promised first-in-human in 2026; none is reported dosed."],
    ["Fifteen unverified items", "Carried explicitly in §15 of the report rather than smoothed over — including Bionaut's true total raised (four conflicting figures plus an unconfirmed $42.1M Series C), the exact diameter and animal n of the ETH Science device, CBN's operations-per-hour throughput, and whether any units-per-dose figure for swarm microrobots has ever been published. No such figure was found."]
  ],
  files: [
    { p: "reports/nanorobotics-field-map-2026-09-11.md", d: "Full report — progression, seven-subsystem stack, bottlenecks with who is attacking each, company table, capital layer, unverified register" }
  ]
}
,
{
  id: "stanford-labs-map",
  axis: "new",
  kind: "dashboard",
  title: "IRIS and REALab, person by person",
  dek: "Every current member of both robot-learning labs \u2014 programme, open question, published email, papers with verbatim abstracts \u2014 scored on startup relevance and ease of entry, plus every alumnus traced to a company and the Stanford faculty worth talking to.",
  status: "live",
  date: "2026-09-14",
  owner: "anshu",
  open: "reports/stanford-labs-map.html",
  openLabel: "Open dashboard",
  tags: ["IRIS", "REALab", "51 members", "69 alumni", "12 founders", "EDGE"],
  metrics: [
    { v: "51", l: "current members scored (32 IRIS, 19 REALab); 7 more unscored because no public work exists" },
    { v: "12 of 69", l: "traced alumni who founded a company \u2014 founding is the exception, not the path" },
    { v: "$1.15B", l: "Sunday Robotics, whose two co-founders are one from each lab" },
    { v: "0", l: "companies founded by Khatib, Cutkosky, Okamura, Kochenderfer, Schwager, Sadigh, Bohg, C. Karen Liu, Jiajun Wu and Pavone combined" }
  ],
  body: [
    ["What it is", "Six tabs: Overview, People and scores (filterable, sortable, click-through drawer per person), IRIS vs REALab, Alumni and founders with founders colour-coded vermilion, Faculty in eight clusters, and Method and rubric. Two scores out of ten per person, each decomposing into five stated components visible in the drawer \u2014 so a number can be argued with by pointing at a component rather than at a judgement."],
    ["The single most striking fact", "Sunday Robotics has one co-founder from each lab. Tony Z. Zhao left the IRIS PhD in his third year and is CEO; Cheng Chi did his PhD under Shuran Song and is CTO. $165M Series B led by Coatue at $1.15B post-money, reported 2026-03-12, roughly fifteen months from founding. Hojung Choi and Alper Canberk are there too as early hires. Chi also wrote Diffusion Policy and the Universal Manipulation Interface, so this is the clearest case of lab research becoming a field default and then a company."],
    ["Someone is already building the thesis", "Govind Chada, an IRIS undergraduate alumnus, is Founder and CTO of Enact in YC Summer 2026 \u2014 \u2018the post-training layer for robotics\u2019: deploy policies on real robots, find failure states, recreate them, collect recovery demonstrations, retrain. They quote 99/100 rollouts against a 90/100 baseline. Validation that the problem is real, and evidence the wedge is not unclaimed."],
    ["The faculty who match the thesis are not in CS", "Statistical validation of stochastic policies is owned by Mykel Kochenderfer (Aero/Astro; wrote Algorithms for Validation, MIT Press 2026; his earlier work became the FAA\u2019s ACAS X certification basis; 27 MS advisees, zero commercial conflicts), Mac Schwager (Aero/Astro; co-author of the tighter-than-Clopper-Pearson bounds the arithmetic rests on), Somil Bansal (Aero/Astro; safety filters) and Emma Brunskill (CS; off-policy evaluation without a simulator, and she states she is accepting students). Neither Finn nor Song is on that list."],
    ["Lineage, not operating experience", "Ten core robotics faculty have founded a combined zero companies. What they hold is lineage \u2014 Khatib trained the CEO of Dexterity ($1.65B). The most commercially experienced person at the Robotics Center is not faculty: Steve Cousins, its Executive Director, co-founded Savioke and was CEO of Willow Garage, which gave ROS away and spun out eight companies, two acquired by Google. He has lived both sides of the commons argument."],
    ["A six-week window", "Thomas Berrueta starts as Assistant Professor of ME on 1 November 2026 (his own site and the ME department agree; the SRC roster says January 2027 and is wrong). Stated foundations: RL, optimal control and information theory. Area: real-time learning for safety-critical systems. PAL Lab page is live. No students yet."],
    ["Lab asymmetry worth acting on", "REALab is 100% robotics across all 91 papers on its page, dominated by compliance and contact-rich control, with no Physical Intelligence conflict (channels are NVIDIA, Amazon FAR, Boston Dynamics, Meta, 1X, Anthropic), and it publishes member emails almost universally \u2014 18 of the 19 pages that loaded. IRIS has four of twelve PhD students working entirely on language models with no robot, routes applications through a form, and carries the PI conflict. Mean startup-relevance 8.5 REALab against 5.8 IRIS, though part of that gap is the rubric rewarding contact-rich work by construction."],
    ["Four false founder claims killed", "Huaxiu Yao did not co-found Ricursive Intelligence (Anna Goldie and Azalia Mirhoseini did). Moo Jin Kim is not CollectedAI\u2019s CTO \u2014 a hallucinated search summary with zero corroboration. Suraj Nair is a \u2018founding researcher\u2019 at Physical Intelligence, an early-employee designation. J. Kenneth Salisbury did not found Intuitive Surgical; he was its scientific advisor 1997\u20142003. Repeating these in the field would cost credibility, so they are recorded rather than dropped."],
    ["Known gaps", "Seven of 51 members unscored: no public research record exists. IRIS emails largely absent because genuinely unpublished \u2014 nothing pattern-guessed. Gordon Wetzstein and Leonidas Guibas flagged but not researched, startup score left blank rather than zeroed. Shuran Song\u2019s own founding record was never individually probed, so \u2018none surfaced\u2019 is not \u2018confirmed none\u2019. Eleven clinical and cross-domain SRC faculty named but unscored. Two REALab papers have no arXiv record at all, so their abstracts are blank by choice."]
  ],
  files: [
    { p: "reports/stanford-labs-map.html", d: "The dashboard, self-contained, ~560 KB" },
    { p: "reports/stanford-labs-map-2026-09-14.md", d: "Markdown companion \u2014 rosters, scores with component breakdowns, alumni table, faculty records" }
  ]
}
,
{
  id: "stanford-student-companies",
  axis: "new",
  kind: "dashboard",
  title: "Stanford company board: YC, StartX and the ones that skipped both",
  dek: "1,522 companies with a Stanford tie from three sources — every YC company whose founder bios name Stanford, the entire StartX community directory, and a hand-verified layer carrying valuations. Filter by accelerator, by degree level (undergrad / MS / PhD), by named lab, by year, or by what it is worth now.",
  status: "live",
  date: "2026-09-14",
  owner: "anshu",
  open: "reports/stanford-students-building.html",
  openLabel: "Open board",
  tags: ["1,522 companies", "252 YC", "1,266 StartX", "268 with a degree level", "accelerator filter"],
  metrics: [
    { v: "28 → 274 → 1,522", l: "Two corrections in one day. Press coverage gave 28; the YC directory added 252; the full StartX community directory added 1,266 more" },
    { v: "15 of 1,522", l: "Companies carrying both YC and StartX. The layers are near-disjoint, which is exactly why any single-source census looks small" },
    { v: "$5.00B, $4.48B, $2.00B", l: "Flapping Airplanes, Humans& and Simile — the three most valuable, and none of them is in either accelerator directory" },
    { v: "268 of 1,522", l: "With a stated degree level. StartX publishes no founder data at all, so most StartX-only rows are honestly unknown rather than guessed" }
  ],
  body: [
    ["StartX added, and the accelerator filter you asked for", "Second pass, same day. Anshu supplied web.startx.com/community and asked for the non-YC side, degree flags, current worth, and an accelerator filter so the list is navigable rather than a wall. StartX is the Stanford-affiliated accelerator — zero equity, no fees — and its community directory is a Webflow CMS list, 25 per page, 53 pages, harvested in full: 1,270 companies from the first 2010 session to Spring 2026, carrying session, industry, description and website. It carries no founders and no valuations, which is the hard limit on degree flags: for a StartX-only company there is no honest way to state one. The board now leads with accelerator buttons, plus filters for degree level, named lab, year, industry and valuation, and quick toggles for student-level-only, degree-known and 2021-onward."],
    ["The finding that came out of merging them", "The three layers are almost completely disjoint. Only 15 companies carry both YC and StartX out of 252 and 1,266. Of the 28 hand-verified companies, 7 are in YC and exactly one (Coframe) is in StartX. And the most valuable Stanford student companies are in NEITHER directory: Flapping Airplanes $5.00B, Humans& $4.48B, Simile $2.00B, Axiom Math $1.60B, Applied Compute $1.30B, Rox $1.20B, Engram $0.60B, Pika $0.47B. They raised straight from Sequoia, Index, GV, Greenoaks, NVIDIA, Lightspeed and General Catalyst. Observation, not advice: an accelerator is how a student with no track record gets a first cheque, and visibly not how a PhD with a named research result gets one."],
    ["A dedupe bug that produced false facts, and how it was caught", "Merging on website domain corrupted the data before anyone looked at the numbers. The hand-verified layer's link field holds the SOURCE ARTICLE, not the company, so Humans&, Flapping Airplanes, Pika, Numbers Station, Human Behavior and Breakthrough Ventures all shared techcrunch.com and collapsed into a single row — which then wore Humans&'s $4.48B under the name of an unrelated StartX company called Loki Studios. StartX separately has 15 companies pointing at lu.ma event pages. It surfaced only because a spot-check listed the top companies by valuation and the top row was a name that made no sense. Fix: an explicit blocklist of press, VC and event domains, plus a rule refusing any domain used by two or more distinct companies as a match key. An earlier draft of this card asserted StartX contained Humans& and Pika; it does not, and that claim came from this bug. Lesson kept: when a merge key can be wrong, sort by the most extreme value and read the top rows, because that is where a bad join shows itself first."],
    ["The first correction, and why it happened", "This board first shipped on 2026-09-11 with 28 companies. Anshu pushed back on 2026-09-14 — \"thats way too little man there are so many more that have gotten into YC from stanford like enact, innate etc\" — and he was right. The 28 came from searching press coverage for Stanford student founders, which only surfaces large rounds, famous surnames and consumer products. Enact (S26, real-world RL environments for robotics, CTO out of Chelsea Finn's IRIS lab) and Innate (F24, personal AI robots, CEO a former Stanford HCI researcher) were both missing, and both are obvious the moment you read the directory instead of the news. An order-of-magnitude undercount is the expected output of that method, not bad luck. The lesson is general enough to keep: a census needs a denominator, and press coverage does not have one."],
    ["Why", "Asked for directly, on 2026-09-11: find the student-native layer specifically, excluding anyone who spent more than about five years in industry first, and name the top-tier backer on each, \"so that i can also go and build with them.\" This is the companion to the Stanford frontier map (faculty and institutes) and the IRIS/REALab board (two labs, person by person). Same five-axis card, same visual system."],
    ["The systematic method", "YC's Algolia index — the one the yc-batch-census card uses — carries no founder data whatsoever, which is exactly why the first pass had to fall back on press. But every YC company page embeds a JSON blob with founders[], including a self-written founder_bio that routinely names the school. All 3,014 pages were fetched (zero failures), giving 5,830 founder records of which 5,690, or 97.6%, carry a bio. That coverage is what turns this from a sample into something close to a census of YC."],
    ["It is not a grep, and here is what broke when it was", "Two error classes showed up in the sanity pass and both are now handled in tools/yc/stanford_filter.py. Wrong tie kind: \"Deep RL at Stanford and PhD at Technical University Munich\" was being labelled PhD, so tie kinds are now read only within 150 characters of the word Stanford and a nearest-university rule discards degrees belonging to another school — that alone fixed Bloomy, whose undergraduate degree is Amherst's, and PAX Markets, whose is the Naval Academy's. Wrong company: \"working with top scientists from Stanford, Adobe and Brown ... during his time at IIT Kharagpur\" is a collaboration, not an affiliation, so collaboration phrasing is subtracted before the personal-affiliation test runs. One company was excluded on that basis and 13 are held in an ambiguous bucket for a human read rather than being counted or dropped silently."],
    ["Precision, measured rather than asserted", "A random sample of 14 counted companies was hand-read against the full bio: 14 of 14 were true positives at the company level. Four of them looked like false positives at first glance because the Stanford evidence sat beyond the first line — one founder's bio reads \"4 degrees from Stanford in just over 6 years\". Tie-kind accuracy is materially lower than company accuracy, which is why the dashboard reports a large \"Stanford, unspecified\" bucket instead of forcing every founder into a degree category."],
    ["Inclusion rule, and who it deliberately excludes", "In: at least one founder was a Stanford undergrad, master's student, PhD candidate or postdoc at founding, or left that programme to found it. Out, by the rule rather than by oversight: World Labs (Fei-Fei Li, faculty), Physical Intelligence (faculty plus DeepMind veterans), SambaNova, Together AI and Snorkel. Those are Stanford companies but they belong to the faculty-and-operator layer, which the frontier map already covers. Keeping the two layers apart is the whole point of this card."],
    ["The capital pattern, which holds but now has a caveat", "Within the hand-verified layer the shape is stark: the YC-backed companies there hold $32M between them, the Sequoia-backed ones $630M, and the PhD-tier companies $1.18B. Age is not the variable — Applied Compute's founders are all 25 or under and raised at roughly $700M. The variable is whether the founder authored a named research result. THE CAVEAT the systematic pass adds: that comparison is drawn from the press-derived layer, which is selected for large rounds, so it describes the companies journalists write about rather than the population. The 252 YC companies mostly have no disclosed valuation at all, and no funding figure was invented for them."],
    ["The PhD tier", "The Chris Ré pipeline at full speed, plus its neighbours. Humans& — Eric Zelikman, Stanford CS PhD then xAI, $480M seed at $4.48B in Jan 2026, one of the largest seed rounds on record, from NVIDIA, Bezos and GV. Simile — Joon Sung Park, whose Smallville generative-agents dissertation won Stanford's Arthur Samuel Award, now $2B with Sequoia and Greenoaks. Cartesia — Goel, Gu, Desai and Yang, all four Ré PhDs who founded on the day they graduated in 2023, productising the State Space Models they had invented in his lab. Engram — $98M at $600M with thirteen employees. Flapping Airplanes — Ben Spector, Stanford statistics PhD, $180M seed and reported talks at $5B. Radical Numerics — $50M, built Evo. Phylo — Kexin Huang's PhD under Jure Leskovec finished weeks before, $13.5M from a16z and Menlo. Pika — Demi Guo and Chenlin Meng walked out of their Stanford AI Lab PhDs in April 2023, now $470M."],
    ["The undergrad tier", "Voice, video and analytics; small cheques, fast. Willow, Human Behavior ($5M in two days from YC, General Catalyst, Paul Graham and Vercel Ventures), Golpo, Known, Phia, Verita AI, TensorPool, Candor. The exception proves the shape: Wispr Flow was founded straight out of Stanford undergrad in 2021 and is now reported at $2B — but it took five years and killing its own original product. One hybrid worth staring at: Valar Labs, three researchers who met in Andrew Ng's lab, through PearX S21, now $26M from a16z Bio+Health and DCVC with an FDA-track bladder-cancer product. Students doing the hard-science path successfully."],
    ["The founding mechanism is physical proximity", "TensorPool's three founders met on the same freshman dorm floor. Human Behavior's team met at a hacker house one founder started after leaving. Phia was two roommates. Vori's three met at Stanford. This is the only part of the dataset that cannot be reproduced from off campus, and it is the argument for being in those rooms rather than in any particular programme."],
    ["Entry points, lowest barrier first", "Stanford Venture Studio has non-competitive admission — guaranteed to any Stanford student who submits the form — and runs mixers specifically for co-founder formation. StartX takes zero equity and charges no fees. The highest-yield small programme found in this pass, relative to its size, is the Stanford ML Group's AI for Healthcare Bootcamp: its alumni started both Valar Labs and Wispr. Money aimed specifically at Stanford students: NFX FAST for Stanford ($150K uncapped SAFE or $1.5–3M for 15%, deadline 12 April), Pear Garage and Pear Dorm ($100K uncapped SAFE), Neo Scholars (~30 a year, $20K) and Neo Residency ($40K to take a semester off), Thiel Fellowship ($250K over two years in the 2026 class), YC Early Decision (apply as a student, funded on acceptance, do YC after graduating), a16z Speedrun (up to $1M, sub-0.4% acceptance), Z Fellows ($10K at a $1B cap)."],
    ["Verified out, so they are not rediscovered as new", "Four companies that look Stanford-student on first pass and are not: Noble Machines (Wenlong Ma plus Apple, Caltech and NASA people — not Stanford's Wenlong Huang, a real and easy confusion), Density AI (ex-Tesla Dojo team), Deep Cogito (IIT Delhi, ex-Google Search), Goodfire (Yale, NYU, DeepMind). Mercor, frequently filed under Stanford, is Georgetown and Harvard dropouts."],
    ["Known gaps, and they are not small", "The YC snapshot begins at Winter 2022, so earlier Stanford YC companies are invisible to the systematic layer by construction — Vori is a confirmed case, present only because the hand-verified layer already had it. 23 YC companies publish no founder records at all. Bios are self-written, so a Stanford founder who did not mention Stanford is uncountable, and 100 founder records name Stanford without saying in what capacity. 13 companies sit in an ambiguous bucket awaiting a human read. The non-YC side is still press-derived: the 22 curated-only companies are real, but there is no reason to think they are all of them — a systematic non-YC pass would need Crunchbase or LinkedIn, neither of which is reachable from here. Separately, Stanford does not record why students take leave, so the often-quoted dropout wave has no official denominator either: one founder counted about a dozen classmates, an economics professor knew of at least five. Both layers are floors; only the YC layer has a defensible denominator."]
  ],
  files: [
    { p: "reports/stanford-students-building.html", d: "The board, 1,522 companies, accelerator buttons plus degree / lab / year / industry / valuation filters" },
    { p: "tools/startx/scrape.py", d: "Harvests the full StartX community directory, 53 pages, 1,270 companies" },
    { p: "tools/startx/companies.json", d: "StartX directory: name, session, industry, description, website" },
    { p: "tools/stanford/build_board.py", d: "Merges YC + StartX + hand-verified, dedupes safely, renders the board" },
    { p: "tools/yc/founders.py", d: "Fetches all 3,014 YC company pages and extracts founders[] with bios; cached and resumable" },
    { p: "tools/yc/stanford_filter.py", d: "Proximity + nearest-university classifier; writes stanford_yc.json with an evidence window per founder" },
    { p: "tools/yc/stanford_yc.json", d: "252 companies, every founder record with its tie kinds, labs, LinkedIn and the text it was judged on" },
    { p: "reports/stanford-faculty-census/students.json", d: "The 28 hand-verified records and the 18 entry points, with provenance" }
  ]
},
{
  id: "iris-robotics-decision",
  axis: "thesis",
  kind: "report",
  title: "IRIS, the robotics market, and whether there is a company here",
  dek: "The 19,944-word decision document. Two kill arguments against the business, the narrower thesis that survived them, and the market verdicts to reuse.",
  status: "current",
  date: "2026-09-13",
  owner: "anshu",
  open: "reports/iris-and-robotics-market-2026-09-13.md",
  openLabel: "Open report",
  tags: ["decision", "kill test", "DATE", "EDGE"],
  metrics: [
    { v: "2 kill args", l: "The commons argument and the self-liquidation argument, both against the BUSINESS. The research case survives both." },
    { v: "92% / 36%", l: "Gemini Robotics 2 unscrews a lightbulb, then screws it back in, same model and same hand. Insertion is the blocker, not perception." },
    { v: "1,800 + 47,000", l: "TRI real and simulated rollouts across 29 tasks, after which its CIs were still 20-30 points wide at n=50" },
    { v: "~1,570/arm", l: "Trials needed to resolve the 5pp effect PI's RECAP claims on 300 trajectories per iteration" }
  ],
  body: [
    ["Why it is on the board", "It was the single most decision-relevant robotics artefact not reachable from the portal. Registered under the standing rule that robotics, Stanford and startup artefacts get a space here (gbrain concepts/portal-artefact-rule). The original stays at Desktop/Research; this is a copy, so nothing linked elsewhere breaks."],
    ["The two kill arguments", "THE COMMONS ARGUMENT: every sophisticated actor that felt this pain built the tool and gave it away \u2014 TRI open-sourced lbm_eval across 49 tasks, Berkeley open-sourced RoboArena, and Bi-DexHands, DaXBench, GarmentLab and SoftGym all went the same way. The field has priced evaluation tooling at zero every single time. THE SELF-LIQUIDATION ARGUMENT: DYNA reports 99.4% towel folding across 850+ napkins and 99% acceptance across 200,000+ towels, so when reliability is real the trial counts arrive free from production telemetry. Valid evaluation is cheapest exactly where the business would work."],
    ["What survived", "Production telemetry cannot tell you whether an OTA update is a regression, because you cannot run the previous policy counterfactually without surrendering throughput. Non-regression AT THE MOMENT OF MODEL UPDATE is the defensible wedge \u2014 not general evaluation. Also a reversal worth keeping: NHTSA withdrawing AV STEP cuts the OPPOSITE way from the Sept 7 reading, because the regulator declined to create a market for third-party evaluators, which makes each safety case a services engagement rather than a product."],
    ["Market verdicts to reuse", "STRONG: certification and evaluation for learned controllers; collapsing integration cost (Rethink Robotics died twice on it \u2014 usability without precision does not sell); geofenced autonomy (but Waymo took $27B and Cruise died on $10B+). CONTESTED: arbitrary-SKU picking; deformable food and meat cutting \u2014 the most underattacked gap relative to value, with huge processors as buyers and the worst injury profiles in manufacturing. WEAK: humanoid labour (no disclosed revenue anywhere, yet $8.6B of the $18.8B 2026 robotics funding); restaurant automation (Zume took $375M from SoftBank and shut); elder care (largest labour gap at 4.68M jobs and 760.5k annual openings, but Medicaid does not reimburse robots)."],
    ["The co-founder verdict, delivered bluntly", "The arrangement is upside down, not merely imperfect. Buyers here are reliability engineers, actuaries, standards-committee members and VPs of deployment \u2014 none reachable through freight brokerage and none buying on relationship. Actuaries buy on model documentation, committees on technical contribution, engineers on reproducible benchmarks. In this market the publication record is the primary sales asset, which inverts the assumed division of labour. One narrow surviving role: running the falsification interviews, because interviewing transfers even when the network does not."],
    ["Correction now on record", "This document states 33 IRIS members and 13 PhD students. The lab page lists 12 PhD students by name, so the correct count is 32 excluding Finn. The 2026-09-14 labs board (card: stanford-labs-map) supersedes the roster section and adds the per-person scoring, verbatim abstracts, alumni founder trace and faculty map."]
  ],
  files: [
    { p: "reports/iris-and-robotics-market-2026-09-13.md", d: "The decision document, 19,944 words \u2014 roster, market map, dexterity evidence, synthesis, five ranked project proposals, risk register, 60-day falsification plan" }
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
  "synthetic-robot-data-landscape": { kind: "web-2026-09-14", note: "NEW TO YOU. Researched 2026-09-14 from company product pages, official project pages, primary papers and the existing gbrain record of the Nocteam robotics thesis. Company-reported deployment and performance claims are marked as such. The company universe includes material publicly verifiable vendors, infrastructure providers and adopters; thin SEO sites and firms with no concrete technical evidence were excluded. FoldNet++ comparison and uncertainty arithmetic were checked separately in the same session." },
  "iris-robotics-decision":     { kind: "own-prior-work", note: "Your decision document of 2026-09-13, recorded in gbrain at inbox/2026-09-13-e406a4a4. The roster was verified against the lab's own pages that day; the market figures were web-retrieved then and are not re-verified since. The roster section is SUPERSEDED by the 2026-09-14 labs board, which corrects the member count from 33 to 32." },
  "stanford-student-companies": { kind: "web-2026-09-14", note: "REBUILT TWICE on 2026-09-14. Third source added the same day from a link you supplied: the full StartX community directory, 1,270 companies harvested across 53 pages, giving accelerator membership as a directory fact rather than a press mention. A dedupe-on-domain bug was found and fixed during the merge — it had briefly attributed Humans&'s $4.48B to an unrelated StartX company, because the hand-verified layer's link field is a source article and six companies shared techcrunch.com. Degree level is stated for 268 of 1,522 and left unknown for the rest, because StartX publishes no founder data and guessing would be worse than a blank. FIRST REBUILD, same day: after you pushed back on the count, and the pushback was correct. Two layers now. The systematic layer fetched all 3,014 YC company pages and read 5,830 founder bios (97.6% coverage, zero fetch failures), classifying each Stanford mention by proximity with a nearest-university rule — that is primary-source data, not press. The hand-verified layer is the earlier 2026-09-11 press pass, kept because it carries valuations, backers and the large non-YC companies; it is media-skewed and the card says so. Company-level precision was measured on a hand-read random sample of 14 and was 14 of 14; tie-kind precision is lower and is reported as an 'unspecified' bucket rather than forced. One collaboration-only false positive excluded, 13 ambiguous held back for a human read." },
  "stanford-labs-map":        { kind: "web-2026-09-14", note: "NEW TO YOU. Rosters fetched 2026-09-13/14 from irislab.stanford.edu/people.html and real.stanford.edu/lab.html \u2014 REALab's roster and its 91-paper list are JavaScript literals in the page, so the raw HTML must be read directly. All 60 abstracts were fetched from their arXiv pages and are quoted verbatim, none paraphrased. Faculty ranks, courses and advising loads from profiles.stanford.edu. Emails only where actually published; nothing pattern-guessed. The two scores per person were requested explicitly on 2026-09-13, which suspends house rule 1 \u2014 each decomposes into five stated components so it stays auditable." },
  "yc-batch-census":            { kind: "own-prior-work", note: "Your own census pass, 2026-09-10. Method and findings recorded in gbrain; all 3,009 records scraped from YC's public Algolia index. The pipeline that produced it was moved into tools/yc on 2026-09-14 and re-run to prove it still works — that test run is NOT what the published dashboard shows, and the delta it found is described on the card." },
  "physical-ai-capital-map":    { kind: "own-prior-work", note: "Your Noctem-pivot research sessions of 2026-09-07, recorded in gbrain. Valuations were web-retrieved then, not re-verified since." },
  "physical-intelligence-review": { kind: "own-prior-work", note: "You wrote it. 36,765 words, 2026-09-03, with the source list in the document." },
  "stanford-frontier-map":      { kind: "own-prior-work", note: "Your census pass, 2026-09-10. Faculty structure is computed from Stanford's own affiliation records; the classifier limits are stated on the card and in the deliverable." },
  "stanford-money-layer":       { kind: "web-2026-09-10", note: "NEW TO YOU. Web-retrieved 2026-09-10 in the parallel Stanford session. Every company figure carries the outlet that reported it; the Bloomberg $11B talks and the Human Intelligence round are explicitly unconfirmed." },
  "market-size-spread":         { kind: "web-2026-09-10", note: "NEW TO YOU. Research-firm estimates collected 2026-09-10. The spread is the finding; no single figure here should be quoted as a market size." },
  "eu-machinery-2027":          { kind: "own-prior-work", note: "Your regulatory research of 2026-09-07, recorded in gbrain. Regulation numbers, annex citations and dates are from the primary instruments." },
  "assurance-seam":             { kind: "own-prior-work", note: "Your thesis, developed across the 2026-09-07 and 09-08 sessions; the crowding update comes from your own YC census. REVISED TWICE SINCE: the two kill arguments and the narrowing to non-regression are from your 2026-09-13 IRIS and robotics-market research; the embedded-evaluator counterweight is web-retrieved 2026-09-14 and is new to you." },
  "sc-node-map":                { kind: "own-prior-work", note: "Your 38-node map and ledger, 2026-09-08. The scope correction and the nine-field record template are your decisions, recorded verbatim in gbrain." },
  "twin-certification":         { kind: "own-prior-work", note: "Your research of 2026-09-07. Lightwheel round and the SRCC literature were web-retrieved then; the repositioning argument is from that session." },
  "freight-cycle-2026":         { kind: "own-prior-work", note: "Your 2026-09-07 session. Kept as a closed card deliberately so the question is not reopened as new." },
  "nanorobotics-field-map":     { kind: "web-2026-09-11", note: "NEW TO YOU. Web research run 2026-09-11 across four parallel tracks (medical/clinical, molecular machines and DNA nanotech, the enabling stack, capital and institutions) plus a lead track. ~130 searches and ~80 direct fetches before the session budget ran out. Primary sources preferred; arXiv and PMC mirrors used where publishers returned 403. Physics calculations in §4, §5, §8.1 and §8.2 are derived here from standard relations, not quoted — the arithmetic is shown so it can be checked. Fifteen items could not be confirmed and are listed in §15." },
  "terrain-map":                { kind: "web-2026-09-10", note: "NEW TO YOU. Breadth pass written 2026-09-14. The Machinery Regulation provisions were read at primary through the Publications Office CELLAR service and every quoted article was verified by grep against the retrieved text. The Bureau Veritas margin is a company results release. The TIC market range is four research houses and no single figure in it should be quoted. Sections 2 and 3 are deliberately incomplete and name their own gaps." },
  "agent-system-plan":          { kind: "web-2026-09-10", note: "NEW TO YOU. Research run 2026-09-10 against Karpathy, Graham, Anthropic engineering, Commoncog and the EBU/BBC study, cited inline in the document. The architecture and the nine agents are proposals, not findings." }
};
