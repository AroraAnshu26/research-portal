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
    { v: "2028-08-02", l: "Deadline for Commission delegated acts adding AI-specific requirements" },
    { v: "40", l: "Notified bodies active under Reg (EU) 2023/1230, Commission register read 2026-09-18" },
    { v: "153", l: "Notified bodies active under Directive 2006/42/EC, the instrument 2023/1230 replaces" }
  ],
  body: [
    ["The obligation", "Annex I Part A item 5 explicitly names \"safety components with fully or partially self-evolving behaviour using machine learning approaches ensuring safety functions\" as a high-risk category. That removes the self-certification option and mandates third-party Notified Body assessment through Module B (EU type-examination), Module H (full quality assurance) or Module G (unit verification). TÜV SÜD was the first NB designated under the new Regulation, September 2024. NB capacity is finite, and as of 2026-09-18 it is also counted: the Commission's Single Market Compliance Space register returns 40 active notified bodies under Regulation (EU) 2023/1230 against 153 active under Directive 2006/42/EC, both filtered on notification status Active. 40 against 153 is 26.1% of the outgoing count, 124 days before the Regulation applies. The register renders only in a browser; it returns an application shell to HTTP clients, which is why this count was recorded as not retrieved on four previous runs."],
    ["The gap in one sentence", "From January 2027, EU law requires a third party to certify a learned policy performing a safety function, and there is no published agreed method to do it. ISO 25785-1, the humanoid-specific standard, is unpublished; read at source on 2026-09-18 it is ISO/CD 25785-1, a Committee Draft at stage 30.60, \"Close of comment period\", under ISO/TC 299, and its Part 2 covering integration is not yet drafted. CEN/CENELEC missed the August 2025 deadline for AI harmonised standards and work is still ongoing. Notified bodies do not have the statistical machinery."],
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
  dek: "Seven industrial openings were the same problem in seven costumes. Two kill arguments landed on 13 September and the surviving claim is narrower: non-regression at the moment of a model update. On 15 September an independent paired benchmark measured the gap the surviving claim depends on, and a federal agency sized an entire voluntary certification programme at nine submissions a year. On 16 September the telemetry side answered back, on real hardware.",
  status: "contested",
  date: "2026-09-18",
  owner: "anshu",
  tags: ["EDGE", "7 beachheads", "kill test attached"],
  metrics: [
    { v: "7", l: "Independent beachheads: W4, W5, L2, L3, C1, C2, C4" },
    { v: "~7–8", l: "YC entrants now inside this seam, 2025–26 batches" },
    { v: "2", l: "Frontier labs that committed to embedded third-party evaluators, 2026-09-12" },
    { v: "0", l: "Times the field has paid for evaluation tooling rather than open-sourcing it" },
    { v: "2028-08-02", l: "Delegated act carrying high-risk AI requirements into the Machinery Regulation, after Reg (EU) 2026/1744 moved it to AI Act Annex I Section B" },
    { v: "29.0%", l: "Matched initial states that change outcome under compound perturbation while the aggregate difference is not distinguishable from zero (arXiv 2609.15940)" },
    { v: "9", l: "Submissions a year the EAC estimates for its entire voluntary third-party certification programme, ESTEP" },
    { v: "3", l: "Free public robot-manipulation evaluation benchmarks now tracked: lbm_eval, RoboArena, RoboVAD" },
    { v: "0.008%", l: "Overhead at which Chronicle records an agent run for later counterfactual replay (arXiv 2609.20625)" },
    { v: "1,857 : 9", l: "Outputs accepted by the provider's own schema against outputs passing an independent validator (arXiv 2609.19844)" },
    { v: "$27.86", l: "Recorded cost of 13 baseline-versus-candidate agent comparisons (arXiv 2609.19607)" },
    { v: "40", l: "Notified bodies active under Reg (EU) 2023/1230, against 153 under the Directive it replaces on 2027-01-20" }
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
    ["Both directions again, 2026-09-17, and the weakening item is the stronger one", "Weakening, first because it is the better-evidenced of the two. \"Indicators of resilience for autonomous control systems\" (arXiv 2609.18264, submitted 16 September 2026) designs generic indicators derived from critical slowing down for nonlinear control systems, and states that \"these results are affirmed through real-world flight experiments of a quadrotor that is nudged towards instability by progressively damaging its propeller blades\", with the implications of degraded resilience on closed-loop stability \"evident well before they appear\". This is a telemetry-side instrument, validated on physical hardware, doing the thing the thesis says requires an outside examiner: telling you that a deployed system is losing margin before the outcome rate moves. Note the asymmetry with LIBERO-CTRL of 15 September, which was simulation only: the supporting measurement is in simulation and the weakening one is on real hardware. The bound on the reading, and it is a real bound: the degradation here is physical damage to propellers, not a model update, and the paper does not test whether the indicators can separate a policy regression from ordinary wear, which is precisely the discrimination the surviving claim rests on. Also weakening, at lower weight: arXiv 2609.18293, 16 September, generates synthetic demonstrations \"without teleoperated source trajectories\" and reports zero-shot deployment \"without real-world fine-tuning\", extending the self-liquidation argument from production telemetry to pre-deployment. And a third free public evaluation benchmark arrived, RoboVAD (arXiv 2609.17843, 15 September), released on Zenodo with the authors reporting all methods \"below a micro-averaged frame-level AUC threshold of 70%\" in the hardest cross-domain setup, which is the commons argument running for the third time: the field built the instrument and gave it away, and the instrument is not yet good enough. Supporting, at equal prominence: \"Compositional Policy Violations\" (arXiv 2609.18820, 16 September) argues that governance of agentic workflows \"is almost entirely step-scoped\" while the policies organisations actually hold \"are properties of the whole execution rather than of any one step\", producing a failure mode where \"every individual step passes its own check while the composed execution violates the governing policy\". Its load-bearing claim is an impossibility rather than an accuracy gap: \"a predicate over a single step cannot evaluate a property that step does not determine, so no improvement in the accuracy of the step-scoped monitors detects this class.\" That is the same structure as the non-regression claim, arriving independently in a regulated non-robotics domain, which is mild evidence the structure generalises. It defines the class rather than sizing it and names no buyer, so it does not touch the kill test."],
    ["Both directions again, 2026-09-18, and the counterfactual got performed", "Weakening, and it is the most direct hit the surviving form has taken. The surviving claim is that you cannot run the previous policy counterfactually without surrendering throughput. Chronicle (arXiv 2609.20625, 17 September 2026) does exactly that for LLM agents: it records a run at its non-deterministic boundaries as immutable envelopes, and its \"cut-point replay, serves a chosen subset of boundaries from the record and executes the complementary subset live with new code, turning a recorded incident into a regression test that runs in continuous integration\". The cost is \"23 microseconds per crossing (0.008% of an assumed 300 ms model call)\", replay \"issues zero model calls and is bit-stable across 20 repetitions\", and in a mutation study the cut-point tests \"catch every mutant that lets the recorded unsafe action through, while a baseline that stubs every boundary, using the same assertion, catches none\". It is on GitHub, which is the commons argument running for a fourth time. The bound, and it is the whole question: an LLM agent's non-determinism sits at enumerable, recordable boundaries, and a robot policy's non-determinism is its contact with a physical world that cannot be put in an envelope and replayed. Nothing in the paper claims the transfer. Whether the wedge survives now turns on whether that difference is fundamental or merely unbuilt. Also weakening: Governance-as-Code (arXiv 2609.20016, 17 September) renders EU AI Act Articles 8 to 15 as \"43 machine-checkable acceptance criteria across six compliance modules that run in a CI/CD pipeline and emit Article-indexed audit evidence\", and reports that against a manual expert audit it \"reproduces all of the manual audit's findings, including three penalty-triggering violations, while cutting audit labor by roughly 75%\". The attestation labour is being automated on the obligated party's own side, which is the seat shrinking rather than the seat being filled. And DeltaSelect (arXiv 2609.19607, 17 September) puts a price on the comparison itself: USD 27.86 across 13 evaluations. It also supplies a second independent measurement of the aggregate-versus-instance gap, reporting that only 19.5% of tasks, 22 of 113, reached a fifth-percentile Pearson correlation of at least 0.50 with full-benchmark performance. Supporting, at equal prominence: SecTB-RTL (arXiv 2609.19844, 17 September) reports that \"The provider accepted 1,857 responses, but only nine passed the production semantic validator\", preserves the run as an instrument-validation incident, reports no prompt-effect estimate, and concludes that \"provider or schema acceptance does not establish execution validity\". Self-attestation and independent validation disagreed by two orders of magnitude on the same artefacts, which is the thesis's core structure measured. It is one incident with one provider in hardware verification rather than a learned policy, and it names no buyer, so it does not touch the kill test either."],
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
  id: "measurement-rig",
  axis: "thesis",
  kind: "report",
  title: "The measurement rig \u2014 build spec",
  dek: "Hardware, software and a five-rung test ladder for the instrument. Rung 0 is built and passing: the statistical core is validated against known ground truth.",
  status: "current",
  date: "2026-09-19",
  owner: "anshu",
  open: "reports/measurement-rig-spec-2026-09-19.md",
  openLabel: "Open spec",
  tags: ["measurement", "built", "anytime-valid", "test ladder"],
  metrics: [
    { v: "68.5% vs 96.8%", l: "Coverage under optional stopping. Wilson breaks when a human is allowed to watch it; the anytime-valid interval holds. The result that justifies the rig." },
    { v: "46%", l: "Robot time saved by replaying the identical seeded placement list \u2014 179 paired trials against 329 per arm independent, for a 10pp regression" },
    { v: "~$450", l: "Everything that has to be bought. Cameras, clamps, tag board, lighting. The robots and tactile kits are borrowed from the floor." },
    { v: "0 integration", l: "The rig never connects to the robot. No ROS, no driver, no API \u2014 which is both the independence argument and why a team can opt in during lunch." }
  ],
  body: [
    ["What it is", "An instrument that takes a robot doing a task and returns a defensible success rate with an interval, WITHOUT being connected to the robot. That clause is the whole design: a number derived from the system under test is the fox counting the hens, so the rig observes from outside the way a laser tracker observes an arm. Three consequences \u2014 independence of the estimate, zero integration cost per team, and it works on hardware it has never seen. The stated cost of the choice: the rig cannot see internal state, so failure attribution comes from the operator, prompted, in the three seconds after the trial."],
    ["Rung 0 is built and passing", "tools/rig/stats.py and tools/rig/test_coverage.py, numpy and scipy only, run on 2026-09-19 under seed 20261024. Simulate trials from a KNOWN success rate and ask whether the instrument reads it back at the coverage it advertises. Fixed n=40: hedged-cs 99.7% coverage at width 0.435, Wilson 95.0% at 0.270. Real effect p=0.85 against a claim of 0.60: resolved in 100% of runs, median 23 trials against a fixed-n design needing 49. Imperfect judge at se=.92/sp=.88: naive estimate biased \u22120.018, Rogan-Gladen corrected to +0.002."],
    ["The result that justifies the project", "TEST 2 lets a simulated operator watch the interval after every trial and stop as soon as it excludes the claim \u2014 which is what every real operator does. The true rate IS the claim, so every stop is a false positive. The anytime-valid interval holds 96.8% coverage with 3.2% false stops; Wilson collapses to 68.5% coverage with 31.5% false stops. A method that is perfectly correct at a pre-committed n loses a third of its coverage the moment a human is allowed to look at it. That gap is the product."],
    ["The reset is part of the measurement", "The part most evaluations get wrong and that is free to get right. If a human resets the object by eye, the initial-state distribution is unmeasured and drifts over the day \u2014 tired operators place objects in easier spots and the policy appears to improve after dinner. So the rig draws placement i from a seeded list fixed before the session, displays it as an overlay, measures the achieved pose from tags, and REFUSES TO ARM the trial until the achieved pose is within 5mm and 3 degrees. A static reference tag is re-solved every frame, so somebody bumping the tripod at 14:30 becomes a logged drift alarm instead of a silent corruption."],
    ["The judge is an instrument and carries its own error", "Tier 2 success labelling uses a VLM over sampled frames, for tasks with no pose predicate. Its sensitivity, specificity and kappa are measured against 40-60 blind hand-labelled trials, printed on every receipt it touches, and fed into a Rogan-Gladen correction. A judge at se=.92/sp=.88 reads as excellent and still biases the headline rate by about two points. Gate to pass at Rung 1: kappa at or above 0.7 on the intended task family."],
    ["The test ladder, and what is still unknown", "Five rungs, each failing cheaply, NONE requiring the event. Rung 0 statistics, done. Rung 1 judge validation on existing video, ~1 day, no purchase needed and the likeliest thing to kill the tier-2 plan. Rung 2 camera and tag metrology including a two-hour drift test and a deliberate tripod bump. Rung 3 full loop on a ~$120 SO-101 with DELIBERATELY INJECTED failure so the true rate is known by construction and the instrument can be caught lying. Rung 4 dress rehearsal on a real arm with a stranger operating, where throughput is the gate at roughly 27 minutes per 40-trial policy. The genuinely unknown number is rho, how well replays actually pair: at rho=0.6 the paired design saves 46%, at rho=0.3 only 22%, at rho=0 nothing. Measuring the real rho is a Rung 3 deliverable and is publishable on its own."],
    ["What to do next", "Rung 1 this week, because it needs no purchase and a bad kappa now is worth more than a good demo later. Then order ~$450 of cameras and clamps, Rung 2 on arrival, an SO-101 for Rung 3, and a lab hour booked for Rung 4 in early October. Submit the Luma application regardless \u2014 approval is gated on capacity, not readiness, and the rig is worth building whether or not the application lands."]
  ],
  files: [
    { p: "reports/measurement-rig-spec-2026-09-19.md", d: "The spec: architecture, hardware BOM with prices, software requirements, the five-rung test ladder, failure modes" },
    { p: "tools/rig/stats.py", d: "BUILT. Hedged-capital anytime-valid confidence sequence, Rogan-Gladen correction, paired McNemar and Connor sample size, power calculators" },
    { p: "tools/rig/test_coverage.py", d: "BUILT AND PASSING. Rung 0: six simulation tests against known ground truth" },
    { p: "tools/rig/README.md", d: "How to run it, the API sketch, and the three papers it implements" },
    { p: "reports/astra-hackathon-plan-2026-09-18.md", d: "Why the rig should exist, and the 24 October event it is aimed at" }
  ]
},
{
  id: "astra-hackathon-plan",
  axis: "thesis",
  kind: "report",
  title: "The certificate desk at the Astra hackathon",
  dek: "A one-day plan for the 24 Oct Saturday Robotics × Robotics Center hackathon that runs the thesis-2 kill test in twelve hours instead of six weeks.",
  status: "current",
  date: "2026-09-18",
  owner: "anshu",
  open: "reports/astra-hackathon-plan-2026-09-18.md",
  openLabel: "Open plan",
  tags: ["hackathon", "kill test", "measurement", "24 Oct 2026"],
  metrics: [
    { v: "100–200", l: "Failures the six-week kill test asks for. A floor of frontier models grasping real objects for ten hours produces that many before dinner." },
    { v: "12 h vs 6 wk", l: "What the kill test costs here against what four-theses-analysis budgeted for it" },
    { v: "n=1", l: "The sample size behind every demo the judges will rank at 20:00, and the name of the 13:00 lightning talk" },
    { v: "$0 vs $5,000", l: "Cost of a judge-adjacent seat via the instrument, against the Prize Track sponsor tier" }
  ],
  body: [
    ["Why it is on the board", "Registered under the standing rule that robotics, Stanford and startup artefacts get a space here (gbrain concepts/portal-artefact-rule). It is a plan, not a finished artefact — carded now so the 24 October date is visible from the board and so the result can be written back onto the same card."],
    ["The event", "GPT-6 Astra Robotics Hardware Hackathon, Saturday Robotics × Robotics Center of Silicon Valley, 24 October 2026, 09:00–21:00, 90 Welsh St, San Francisco. Approval-based registration; hosts Junfan Zhu, Aurora Feng and Jerry Huang. On the floor: M1 mobile manipulator, Unitree G1, Unitree Go2, OpenArm, Wuji Hand 2, Wuji Glove, ALOHA leader arms, tactile kits and cameras. Community-run and explicitly not affiliated with OpenAI."],
    ["The idea", "Every other team spends twelve hours producing a demo that runs once in front of judges. This is the instrument that says whether any of them worked, and it hands each team a signed number at 20:00. Design rule, and it is the whole project: nothing in the scoring path reads the robot's own logs — external camera, AprilTag task frame, tactile ground truth. Independence is what separates a dashboard from a certificate."],
    ["Why this event and not another", "It is a one-room, one-day, many-policies, same-hardware natural experiment, and that configuration is expensive to buy and is being given away. More importantly it runs Experiment A from the four-theses analysis — attribute 100–200 real failures across perception / policy / embodiment / latency / capability-ceiling, then ask for what fraction the attribution changes what the operator does next. Here the operators are standing beside the robot and can be asked directly. The prior being tested is the Gemini Robotics lightbulb asymmetry, 92% out against 36% in; if the modal answer is 'capability ceiling, collect more data', thesis 2 dies cheaply and in public."],
    ["Scope discipline", "The floor-wide version needs other teams to opt in, so it is not on the critical path. CRITICAL PATH: one arm, one task family, one policy, 40 trials, one receipt, dependent on nobody, demoable alone at 20:00. UPSIDE: every team that opts in is a strictly additive row. The harness is built and validated before 24 October against an SO-101 or in sim, so the day is calibration and data rather than authoring code — the most credible claim available to an applicant, and it must be true before it is written down."],
    ["The statistics are the product", "The operator declares a claim, a Wald sequential probability ratio test stops as soon as the evidence decides rather than burning a fixed n, and the receipt prints the estimate, the interval, the n actually needed and the claims the data did NOT support. The VLM success judge is itself measured against 20 hand-labelled trials and its agreement rate is printed on every receipt it issues; an evaluator that will not state its own error rate is not an evaluator. Across teams the leaderboard is bootstrapped and the report states how often the ranking flips."],
    ["Hardware ask, deliberately small", "OpenArm for the full day, Wuji Hand 2 plus Wuji Glove for about two hours to get a human teleoperator baseline, a tactile kit, two cameras, a tripod and a corner of a table. Not the G1 and not the M1. Capacity is gated by the number of robots in the room and the approval queue will be full of teams asking for the humanoid; asking for less is a positioning decision."],
    ["What it is worth even if it goes badly", "A floor of failures attributed and paired with operators' stated next actions, from a room of frontier-model teams, in one day. That either kills thesis 2 or gives it its first proof point, and it does so in October rather than December."]
  ],
  files: [
    { p: "reports/astra-hackathon-plan-2026-09-18.md", d: "The plan: concept, scope discipline, the 13:00 unlock, hardware ask, failure modes" },
    { p: "reports/four-theses-analysis-2026-09-16.md", d: "Source of Experiment A, the six-week kill test this event compresses" }
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
},
{
  id: "robotics-primer",
  axis: "new",
  kind: "report",
  title: "A working primer on modern robotics",
  dek: "The whole vocabulary in one 35-minute read: VLMs, VLAs, world models, action chunking, the control hierarchy, how data is collected and annotated, why the field turned egocentric, and what Isaac Lab actually is.",
  status: "current",
  date: "2026-09-18",
  owner: "anshu",
  open: "reports/robotics-primer-2026-09-18.md",
  openLabel: "Read the primer",
  tags: ["primer", "VLA", "world models", "egocentric data", "Isaac Lab", "13,274 words"],
  metrics: [
    { v: "4", l: "Distinct things people mean by \u201cworld model\u201d" },
    { v: "7", l: "Ways to collect a robot trajectory, each with its cost" },
    { v: "0.924 vs 0.308", l: "SIMPLER real-to-sim correlation against the validation-loss proxy" },
    { v: "68\u201399%", l: "95% CI on a 90% success rate measured over 20 rollouts" }
  ],
  body: [
    ["What it is", "Teaching material, not research. A single self-contained document written to make the field\u2019s vocabulary usable in conversation at any level: what a term means, which of the three parent traditions it came from (control engineering, computer vision, large-model ML), why the design choice it names exists, and what the honest sceptical question back is. Ten sections plus a dense glossary organised by subsystem, with ASCII diagrams for the control hierarchy, the VLA architecture, the four senses of world model, and the egocentric annotation pipeline."],
    ["The frame everything hangs off", "A robot is one loop running at four speeds at once: motor drive at 1\u201320 kHz, controller at 200\u20131000 Hz, learned policy at 5\u201350 Hz, language planner at 0.2\u20132 Hz. Every term in the field attaches to one of those layers, and most confusion in robotics conversations is a claim stated without saying which layer it is about. \u201cOur model runs at 200 Hz\u201d means nothing until that is answered."],
    ["VLM to VLA, stated precisely", "A VLA is a VLM fine-tuned to emit actions, and the only two architectural facts that matter are how the action is represented and what stays frozen. Either discretised action tokens reusing the language vocabulary (RT-2, OpenVLA; FAST compresses them with a DCT before quantising) or a continuous action expert, typically flow-matching, reading the backbone\u2019s features (pi0 on PaliGemma). Continuous experts give smoother high-frequency control; token approaches keep the language interface intact. Cross-embodiment transfer, the result the whole foundation-policy industry rests on, is real but demonstrated at modest scale in Open X-Embodiment, not established as a scaling law."],
    ["World models, disambiguated", "Four distinguishable things share the phrase: latent dynamics for training in imagination (Dreamer), action-conditioned generative video as a neural simulator (Genie, Cosmos), JEPA as an architecture that predicts the embedding of the future rather than its pixels, and the purely rhetorical usage. JEPA is not an alternative to a world model; it is an architecture that can be the predictive core of one. All the real variants break on the same two things, contact and long-horizon consistency, which is why the measured sim-to-real correlation matters more than the rendering."],
    ["Why action chunking is everywhere, and what it costs", "Predicting the next k actions and executing them open loop (ACT, 2023) simultaneously suppresses compounding error, hides inference latency so a 200 ms model can drive a 50 Hz arm, and captures the stroke structure of a demonstration. The cost is that the robot is blind for the duration of the chunk, and the statistical cost is that the effective number of independent decisions per rollout is far smaller than the control rate implies, which is directly load-bearing for how many trials a certification would need."],
    ["Why the field turned to egocentric video, as a four-step argument", "Supply: teleop costs a human minute per trajectory, head-mounted cameras cost nothing, and the ratio is three to four orders of magnitude. Viewpoint: a head camera sees what a humanoid\u2019s head camera sees, with hands entering from below at the same scale, which third-person internet video never does. Content: object diversity, clutter, real homes, mistake recovery, long-task sequencing. Evidence: this step is the weak one. Pretraining encoders on human video helps (R3M, VC-1) and co-training on paired human and robot data helps (EgoMimic), but no policy has learned a genuinely new manipulation skill from human video alone at deployment quality. The field is betting step four arrives."],
    ["How egocentric data is actually annotated", "Camera pose from visual SLAM (Aria ships it as a service); hand pose by fitting MANO, typically with HaMeR, giving wrist pose plus finger angles; grasp state inferred from fingertip proximity or a learned contact classifier, and this is the noisiest stage, routinely wrong by a few frames on release timing; retargeting the world-frame wrist trajectory to an end-effector pose plus gripper command, with a feasibility filter dropping anything outside joint limits or reach; object masks from SAM plus a tracker; instructions written by a VLM captioner, which is fluent and frequently wrong about which object was touched and in what order, so a serious pipeline validates against a hand-labelled subset and reports agreement. Then quality filtering, where RoboMimic\u2019s uncomfortable finding still holds: a smaller clean dataset often beats a larger noisy one, and mixing in a poor operator can drop performance below the good operator alone."],
    ["The Isaac naming maze, untangled", "Omniverse is the substrate (OpenUSD scene composition and rendering). Isaac Sim is the simulator application on top of it. Isaac Lab is the open-source training framework on top of Isaac Sim, successor to Isaac Gym and Orbit, and its parallel-environment abstraction keeping tensors on the GPU is the concrete reason sim-trained locomotion works at all. Isaac Lab Arena is the newer evaluation layer, integrated with LeRobot, and sits directly adjacent to the assurance thesis. Isaac ROS is unrelated: GPU perception packages for deployment on a Jetson. GR00T is the policy, Cosmos the generative world model, Newton the physics engine built on Warp, Jetson Orin and Thor the computer in the robot."],
    ["Where it connects to the thesis", "Section 8 is deliberately the pointed one. Published success rates are typically over 20 to 50 rollouts with unstated success criteria, and a 90% rate on 20 trials has a 95% interval of roughly 68 to 99%, so the standard published comparison is statistically empty. There is no cross-embodiment leaderboard a third party can reproduce. The primer also names the specific place an internal evaluator hides: every scaled autonomous-collection programme depends on an automatic success classifier whose own error rate is almost never measured, and that classifier sets the ceiling on everything trained downstream."],
    ["What it does not do", "It contains no new research and no web retrieval. Version-numbered product claims (pi0.5, pi-star-0.6, GR00T N1.7, Helix, Cosmos) are carried from the existing gbrain record rather than re-verified, so they are point-in-time. Primary papers are cited inline by arXiv identifier so any claim can be traced in one click."]
  ],
  files: [
    { p: "reports/robotics-primer-2026-09-18.md", d: "The primer, 13,274 words, ten sections plus a glossary organised by subsystem" }
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
  "robotics-primer":            { kind: "agent", note: "AGENT-WRITTEN TEACHING MATERIAL, 2026-09-18, not research. No web retrieval was performed for it. The technical content is standard published field knowledge and every primary paper is cited inline by arXiv identifier so it can be checked in one click. The connective claims \u2014 the unbundling-to-referee argument, the Lightwheel measurement factory, the SIMPLER 0.924 against 0.308 figures, the evaluation gap \u2014 are carried from YOUR OWN prior work in gbrain (2026-09-03, 2026-09-07, 2026-09-14) and from reports/synthetic-robot-data-landscape-2026-09-14.md, and were not re-verified. Product and version details for pi0.5, pi-star-0.6, GR00T N1.7, Helix and Cosmos come from that same record rather than from primary sources read on the day, so treat version numbers as point-in-time. The judgements in section 10 and the closing recommendations are the agent\u2019s, not yours." },
  "synthetic-robot-data-landscape": { kind: "web-2026-09-14", note: "NEW TO YOU. Researched 2026-09-14 from company product pages, official project pages, primary papers and the existing gbrain record of the Nocteam robotics thesis. Company-reported deployment and performance claims are marked as such. The company universe includes material publicly verifiable vendors, infrastructure providers and adopters; thin SEO sites and firms with no concrete technical evidence were excluded. FoldNet++ comparison and uncertainty arithmetic were checked separately in the same session." },
  "measurement-rig":            { kind: "own-prior-work", note: "Written 2026-09-19 in this session. UNUSUALLY, the Rung 0 numbers on this card are not research findings but MEASUREMENTS FROM CODE IN THIS REPO: tools/rig/test_coverage.py was written and run on 2026-09-19 under seed 20261024, and every coverage, width and sample-size figure quoted here is that run's stdout. Re-runnable, and it should be re-run rather than trusted. The paired sample-size formula is cross-checked inside the test by simulation (77.5% simulated against a nominal 80%), because an earlier version of it was wrong in the direction of making the paired design look WORSE than independent runs. Everything above Rung 0 \u2014 the hardware BOM, the prices, the throughput budget, the rho estimate of 0.6 \u2014 is specification and estimate, NOT measurement, and the spec says so at each point. The three papers cited (Waudby-Smith and Ramdas 2023, Connor 1987, Rogan and Gladen 1978) are implemented from their standard forms and were not re-fetched in this session." },
  "astra-hackathon-plan":       { kind: "own-prior-work", note: "Written 2026-09-18 in this session. The event details were read off the Luma page (luma.com/jzbe8ytd) in a browser pane on that date under the browser-pane-retrieval procedure, and are point-in-time: the page itself says the date and location are TBD pending confirmation, and tracks and prizes are unannounced. The plan, the scope discipline and the hardware ask are the agent's proposal, not yet reviewed by you and not yet submitted. Experiment A, the TRI and RECAP trial-count figures and the ISO 9283 precedent are carried from your own prior work — reports/four-theses-analysis-2026-09-16.md and gbrain inbox/2026-09-07-a3b77cb4 — and are not re-verified here." },
  "iris-robotics-decision":     { kind: "own-prior-work", note: "Your decision document of 2026-09-13, recorded in gbrain at inbox/2026-09-13-e406a4a4. The roster was verified against the lab's own pages that day; the market figures were web-retrieved then and are not re-verified since. The roster section is SUPERSEDED by the 2026-09-14 labs board, which corrects the member count from 33 to 32." },
  "stanford-student-companies": { kind: "web-2026-09-14", note: "REBUILT TWICE on 2026-09-14. Third source added the same day from a link you supplied: the full StartX community directory, 1,270 companies harvested across 53 pages, giving accelerator membership as a directory fact rather than a press mention. A dedupe-on-domain bug was found and fixed during the merge — it had briefly attributed Humans&'s $4.48B to an unrelated StartX company, because the hand-verified layer's link field is a source article and six companies shared techcrunch.com. Degree level is stated for 268 of 1,522 and left unknown for the rest, because StartX publishes no founder data and guessing would be worse than a blank. FIRST REBUILD, same day: after you pushed back on the count, and the pushback was correct. Two layers now. The systematic layer fetched all 3,014 YC company pages and read 5,830 founder bios (97.6% coverage, zero fetch failures), classifying each Stanford mention by proximity with a nearest-university rule — that is primary-source data, not press. The hand-verified layer is the earlier 2026-09-11 press pass, kept because it carries valuations, backers and the large non-YC companies; it is media-skewed and the card says so. Company-level precision was measured on a hand-read random sample of 14 and was 14 of 14; tie-kind precision is lower and is reported as an 'unspecified' bucket rather than forced. One collaboration-only false positive excluded, 13 ambiguous held back for a human read." },
  "stanford-labs-map":        { kind: "web-2026-09-14", note: "NEW TO YOU. Rosters fetched 2026-09-13/14 from irislab.stanford.edu/people.html and real.stanford.edu/lab.html \u2014 REALab's roster and its 91-paper list are JavaScript literals in the page, so the raw HTML must be read directly. All 60 abstracts were fetched from their arXiv pages and are quoted verbatim, none paraphrased. Faculty ranks, courses and advising loads from profiles.stanford.edu. Emails only where actually published; nothing pattern-guessed. The two scores per person were requested explicitly on 2026-09-13, which suspends house rule 1 \u2014 each decomposes into five stated components so it stays auditable." },
  "yc-batch-census":            { kind: "own-prior-work", note: "Your own census pass, 2026-09-10. Method and findings recorded in gbrain; all 3,009 records scraped from YC's public Algolia index. The pipeline that produced it was moved into tools/yc on 2026-09-14 and re-run to prove it still works — that test run is NOT what the published dashboard shows, and the delta it found is described on the card." },
  "physical-ai-capital-map":    { kind: "own-prior-work", note: "Your Noctem-pivot research sessions of 2026-09-07, recorded in gbrain. Valuations were web-retrieved then, not re-verified since." },
  "physical-intelligence-review": { kind: "own-prior-work", note: "You wrote it. 36,765 words, 2026-09-03, with the source list in the document." },
  "stanford-frontier-map":      { kind: "own-prior-work", note: "Your census pass, 2026-09-10. Faculty structure is computed from Stanford's own affiliation records; the classifier limits are stated on the card and in the deliverable." },
  "stanford-money-layer":       { kind: "web-2026-09-10", note: "NEW TO YOU. Web-retrieved 2026-09-10 in the parallel Stanford session. Every company figure carries the outlet that reported it; the Bloomberg $11B talks and the Human Intelligence round are explicitly unconfirmed." },
  "market-size-spread":         { kind: "web-2026-09-10", note: "NEW TO YOU. Research-firm estimates collected 2026-09-10. The spread is the finding; no single figure here should be quoted as a market size." },
  "eu-machinery-2027":          { kind: "own-prior-work", note: "Your regulatory research of 2026-09-07, recorded in gbrain. Regulation numbers, annex citations and dates are from the primary instruments. The 2026-09-18 additions are agent output from the daily run: the 40 and 153 notified-body counts were read from the Commission's Single Market Compliance Space register in a browser pane on that date with notification status Active, and the ISO/CD 25785-1 stage from iso.org/standard/91469.html the same way. Neither source is reachable by HTTP client. Both are point-in-time register readings, not dated publications." },
  "assurance-seam":             { kind: "own-prior-work", note: "Your thesis, developed across the 2026-09-07 and 09-08 sessions; the crowding update comes from your own YC census. REVISED TWICE SINCE: the two kill arguments and the narrowing to non-regression are from your 2026-09-13 IRIS and robotics-market research; the embedded-evaluator counterweight is web-retrieved 2026-09-14 and is new to you. The 2026-09-17 block is agent output from the daily run: four arXiv papers retrieved that day, every quoted sentence taken from the paper's own abstract record, and none of the four independently replicated. The 2026-09-18 block is agent output from the same daily run: four arXiv papers dated 17 September, every quoted sentence taken from the paper's own abstract record, none independently replicated, and three of the four point against the thesis." },
  "sc-node-map":                { kind: "own-prior-work", note: "Your 38-node map and ledger, 2026-09-08. The scope correction and the nine-field record template are your decisions, recorded verbatim in gbrain." },
  "twin-certification":         { kind: "own-prior-work", note: "Your research of 2026-09-07. Lightwheel round and the SRCC literature were web-retrieved then; the repositioning argument is from that session." },
  "freight-cycle-2026":         { kind: "own-prior-work", note: "Your 2026-09-07 session. Kept as a closed card deliberately so the question is not reopened as new." },
  "nanorobotics-field-map":     { kind: "web-2026-09-11", note: "NEW TO YOU. Web research run 2026-09-11 across four parallel tracks (medical/clinical, molecular machines and DNA nanotech, the enabling stack, capital and institutions) plus a lead track. ~130 searches and ~80 direct fetches before the session budget ran out. Primary sources preferred; arXiv and PMC mirrors used where publishers returned 403. Physics calculations in §4, §5, §8.1 and §8.2 are derived here from standard relations, not quoted — the arithmetic is shown so it can be checked. Fifteen items could not be confirmed and are listed in §15." },
  "terrain-map":                { kind: "web-2026-09-10", note: "NEW TO YOU. Breadth pass written 2026-09-14. The Machinery Regulation provisions were read at primary through the Publications Office CELLAR service and every quoted article was verified by grep against the retrieved text. The Bureau Veritas margin is a company results release. The TIC market range is four research houses and no single figure in it should be quoted. Sections 2 and 3 are deliberately incomplete and name their own gaps." },
  "agent-system-plan":          { kind: "web-2026-09-10", note: "NEW TO YOU. Research run 2026-09-10 against Karpathy, Graham, Anthropic engineering, Commoncog and the EBU/BBC study, cited inline in the document. The architecture and the nine agents are proposals, not findings." }
};
