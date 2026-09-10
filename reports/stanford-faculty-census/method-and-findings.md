2026-09-10 session 2, run in parallel with the YC batch-analysis session: built the STANFORD FRONTIER MAP for Anshu, the Stanford-side counterpart to the YC dashboard, under the same standing CTO mandate (inbox/2026-09-10-6221b8f2) and the same facts-only rule (inbox/2026-09-10-8a887c4d).

ANSHU'S FOUR SCOPING DECISIONS THIS SESSION
1. Boundary: the entire picture, core AI/robotics PLUS the hard-science frontier. Their stated reason: "often times people use AI and robotics as a tool in powerful sense to crack problems in other domains. I want to see this." So cross-domain application is a first-class filter axis, not a footnote.
2. Nodes: labs/PIs + their spinouts + a student/alumni company layer.
3. Money: facts-now (who funds what, spinout facts as published), plus a thesis and market-cap layer per cluster like the netlify reference.
4. Access layer: links to the lab or startup page only, nothing more.

KEY REUSABLE METHOD DISCOVERY (the most important thing to remember here)
Stanford Profiles has an undocumented but public census engine:
  https://profiles.stanford.edu/browse/<org-path>?affiliations=capFaculty&ps=100&p=N
It returns server-rendered faculty listings carrying name, full appointment title and the free-text research-interest field, parseable from <li class="mini-profile-holder"> blocks. ps caps at 100; p is the page number. The org tree itself is embedded in any search page inside the define('app-config') JSON blob under c.browseOrgs (6 schools, 14 institutes, 8 administrations). The CAP API at api.stanford.edu/cap/v1 requires auth and returns 401, and profiles.stanford.edu/proxy/api/cap 404s, so the HTML browse endpoint is the way in. Department sites are NOT uniform: only ee.stanford.edu uses the Drupal "orglist" markup with research-area UUID facets, while me/aa/msande and the rest each differ, so do not waste time building per-department parsers.

CENSUS RESULT
12,827 rows across 21 org units, deduped to 7,394 unique faculty, 99.8% parse rate against Stanford's own stated result counts. Only 4,369 of 7,394 (59%) filled in the research-interest field, so every keyword-derived number is a floor, not a total. School of Medicine alone is 5,143 of the 7,394.

HARD STRUCTURAL FINDINGS, from Stanford's own affiliation records with no inference
- All 13 institutes added ZERO unique people to the census: institutes are pure overlays on department appointments.
- 5,529 faculty (74.8%) hold no institute seat at all. 853 hold two or more. One person holds six.
- HAI has 189 faculty, of whom only 66 are Engineering.
- Densest institute pair: Bio-X and Wu Tsai Neurosciences share 494 faculty.
- HAI and Bio-X share 77, HAI and Wu Tsai Neuro share 49, but HAI and Precourt (energy) share only 4, and HAI and Sarafan ChEM-H only 2. On Stanford's own data the AI institute overlaps heavily with bio and neuro and barely touches energy or chemical biology.
- The Stanford Robotics Center's 42-faculty roster includes appointments in Oceans, Pathology, Surgery, Radiology, Chemical Engineering and Civil Engineering. That is the cleanest available evidence for Anshu's cross-domain thesis.

METHODOLOGICAL HONESTY NOTE I ACTED ON
My regex method-by-domain classifier ran at roughly 2-in-3 precision on hand inspection (clinical faculty trip "robotic surgery" and then an unrelated second keyword trips a domain). Rather than publish those counts as headline claims I demoted them, labelled the precision limit inline in the deliverable, and published all 128 flagged names with profile links so Anshu can judge them himself. The institute co-affiliation matrix is presented as the reliable signal instead. Two census gaps are named openly in the deliverable: Dan Jurafsky, an active CS and Linguistics professor, does not appear in the harvest at all; and Christopher Manning's harvested title reads as Linguistics emeritus, because a person with several appointments shows only whichever listing caught them.

2026 STANFORD-LINKED COMPANY FACTS (all web-retrieved 2026-09-10; cite the outlet, not me)
- Physical Intelligence: 5.6B USD confirmed at the Nov 2025 Series B of 600M led by Google CapitalG; 1.6B total across two rounds per Dealroom. Bloomberg reported Mar 2026 talks above 11B, NOT confirmed closed.
- World Labs: 5B USD after 1B closed 18 Feb 2026; about 1.23B total. Autodesk put in 200M and took a strategic advisory role, alongside NVIDIA and AMD.
- Together AI: 8.3B USD at an 800M Series C, July 2026; claims over 1.15B in annual bookings. Chris Re and Percy Liang are co-founders.
- SambaNova: 11B USD post-money at the Series F first close of 1B, 8 July 2026, led by General Atlantic. Kunle Olukotun and Chris Re are co-founders.
- Shield AI: 12.7B USD, March 2026. Co-founder Ryan Tseng holds a Stanford AI PhD.
- Dexterity: 1.65B USD. Founded by Samir Menon, Stanford CS PhD out of Oussama Khatib's lab.
- Genesis Therapeutics: 806.79M USD per Forge Global. CORRECTION TO CARRY FORWARD: it came out of VIJAY PANDE's Stanford lab, not Ron Dror's. Founded by Evan Feinberg and Ben Sklaroff, and Pande is now the a16z general partner whose firm led its Series A.
- Inertia: 450M USD milestone-based Series A, Feb 2026, from Bessemer and GV. Co-founded by Mike Dunne, who directed SLAC's Linac Coherent Light Source.
- Astranis: over 1.2B raised, valuation above 2B, prime on the DoD programs of record PTS-G, Resilient GPS and Andromeda.
- Human Intelligence: James Zou reported raising about 100M at roughly 1B, April 2026, unconfirmed.
- Pumpkinseed Bio: 20M Series A. Jen Dionne is both the source researcher and the CEO.
- Amprius (NYSE: AMPX): 2025 revenue 73M, guiding above 125M for 2026.
- Yi Cui has founded five companies (Amprius, EnerVenue, EEnotech, 4C Air, LifeLabs Design) and is faculty director of the Sustainability Accelerator.
- H.-S. Philip Wong has been TSMC's Chief Scientist in an advisory role since 2020 while remaining Stanford faculty.

MONEY-LAYER FACTS
- Stanford sponsored research: 2.3B USD for the fiscal year ended 31 August 2025 including SLAC, over 70% federal, across more than 7,500 awards.
- Stanford HAI ABSORBED Stanford Data Science on 4 May 2026, keeping the HAI name: 400+ scholars, 60M in cumulative grants, the Marlowe HPC cluster. James Landay is Denning Director; Fei-Fei Li and John Hennessy co-chair the advisory council.
- HAI corporate affiliates receive a stated 550K USD "HAI Wallet" of research tokens, directable to a named faculty member or lab.
- SystemX Alliance (founded 1978) has 35 members including Apple, TSMC, Samsung, Tencent, Ant Group, Bosch, Caterpillar and Balyasny Asset Management.
- StartX takes zero equity and charges no fees; reported portfolio valuation 120B USD.
- The Stanford Emerging Technology Review 2026 frames the frontier in exactly ten areas: AI, biotech and synthetic biology, cryptography and computer security, energy, materials, neuroscience, quantum, robotics, semiconductors, space. Useful as Stanford's own taxonomy.

MARKET-SPREAD OBSERVATION WORTH REUSING
Research-firm 2026 estimates disagree wildly, and the spread is itself the finding. AI drug discovery 2026 runs from 2.9B (Grand View) to 24.51B (Towards Healthcare), an 8.4x spread. Grid-scale battery storage 2026 spans 8.32B to 19.09B across four firms. Quantum computing 2026 spans 1.82B to 5.09B, and the high 2026 estimate already exceeds QED-C's 3B-by-2028 revenue projection, so they cannot be measuring the same thing. Hyperscaler 2026 capex is the one firm number: 725-800B guided by five operators, roughly 3x the ~238B of 2024, with 55-60% flowing to NVIDIA.

DELIVERABLE
stanford-frontier-map.html, a single self-contained 272KB file with six tabs (Overview, Labs and people, Cross-domain, Companies, Theses and market size, Method and gaps), 86 hand-checked lab nodes with resolving Stanford profile links, 28 companies with per-row source links, an SVG institute co-affiliation matrix, and a filter row plus sortable tables plus click-through drawers. It matches the Neo Lab Deal Map design contract from https://eclectic-pothos-3962d4.netlify.app/ (warm paper #f6f4ee, surface #fcfbf7, vermilion #b3300e, Fraunces plus IBM Plex Sans and Mono) so it sits alongside the YC dashboard as one visual system. Verified in-browser: no console errors, filters, sorting and drawers all work, and the matrix values match the computed data. Built in the session scratch workspace, so it needs moving to a real folder if Anshu wants to keep it.

DEFERRED TO A SECOND PASS
Per-lab grant dollar amounts, affiliate fee schedules beyond HAI's stated 550K, the full StartX and alumni company set, and techfinder.stanford.edu's licensable-technology listings (four collections: life sciences, physical sciences, sustainability, AI).
