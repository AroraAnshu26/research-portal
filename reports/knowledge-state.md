# Knowledge state

The file every agent reads to answer "what does he already know". Maintained by
M2 Ledger Keeper after each editor run. This is a state file, not a document:
no prose, no commentary, no history beyond what is needed to compute a diff.

Last updated 2026-10-01 by the M1/M2 run. Window 30 September to 1 October, the
Thursday default, no extension. The 30 September run published normally, so the
seven-day gap recorded last run has not recurred.

---

## voices

The F6 list. Keep between 8 and 12 names. Read at the person's own venue only.

| person | venue | newest seen | date |
|---|---|---|---|
| Dario Amodei | darioamodei.com, short posts | We Must Pace the Frontier, still newest on 2026-10-01. RESOLVED 2026-10-01, close this line of enquiry: an href scrape returns exactly four `/post/` URLs and two `/essay/` URLs, so the "six titles" counted on 09-30 was posts and essays added together. Four short posts, unchanged since 09-12: on-deepseek-and-export-controls, policy-on-the-ai-exponential, the-urgency-of-interpretability, we-must-pace-the-frontier | 2026-09-12 |
| Dario Amodei | darioamodei.com/essay/ | Two essays, unchanged: Machines of Loving Grace and The Adolescence of Technology, the latter dated "January 2026" on the page. /archive still returns HTTP 404 on 2026-10-01 while appearing in the site navigation | 2026-01 |
| Paul Graham | paulgraham.com/articles.html | Making Startups Powerful, unchanged, re-read 2026-10-01. Next four below it: How Universities Should Prepare Founders, How to Earn a Billion Dollars, How to Convert Between Wealth and Income Tax, The Brand Age. Store these so a later run diffs titles rather than re-reading position | 2026-09 |
| Andrej Karpathy | karpathy.bearblog.dev/blog | newest is Sequoia Ascent 2026 summary, unchanged, re-read 2026-10-01. RETRIEVAL, settled 2026-09-22 and confirmed a fifth time on 10-01: the venue flaps between HTTP 200 and 404 for HTTP clients (200 on 09-17, 404 on 09-15, 09-22, 09-30 and 10-01) and renders reliably in a browser pane. Read it there and do not record the 404 as a venue outage or as a DIFF | 2026-04-30 |
| Andrej Karpathy | karpathy.github.io | newest is microgpt, 12 Feb 2026, unchanged, re-read 2026-10-01 | 2026-02-12 |

Slots open: 8. Candidates not yet added, decide before adding: Chelsea Finn,
Dorsa Sadigh, Ben Thompson, Dylan Patel, Jack Clark, Cedric Chin.

---

## instruments

The F3 watchlist. Carry every row forward every run.

| instrument | state as of 2026-09-30 | next date |
|---|---|---|
| EPA Carbon Pollution Standards for fossil fuel-fired EGUs, 40 CFR Part 60 | partial repeal final rule published 2026-09-17; repeals the CCS-based Phase 2 standards for new base load stationary combustion turbines; rule text names AI datacenter load as driving a "nearly 2.6-fold increase in projected growth rates"; a concurrent supplemental proposal seeks comment on rescinding all GHG requirements for EGUs | effective 2026-11-16 |
| EU harmonised-standard citations, Commission throughput | Implementing Decision (EU) 2026/2048, published 2026-09-16, cited EN 18060:2025 under the Batteries Regulation 2023/1542. Not machinery, carried as evidence the citation machinery is running | none stated |
| Machinery Regulation (EU) 2023/1230 | applies 2027-01-20; Annex I Part A item 5 confirmed untouched by the Digital Omnibus | 2027-01-20 |
| Reg (EU) 2026/1744, Digital Omnibus on AI | in force 2026-07-27; moved 2023/1230 from AI Act Annex I Section A to Section B point 21. **MOVED 2026-09-29**, corrigendum `32026R1744R(01)`, OJ ref 2026/90810, German only. It replaces one word in Article 1 point 8, page 18, which inserts AI Act Article 6(1b): "Unbeschadet des Absatzes 1a" becomes "Ungeachtet des Absatzes 1a". English 1b reads "Notwithstanding paragraph 1a, AI systems the failure or malfunctioning of which would endanger health and safety shall qualify as safety components." Verified this run: the English text contains "Notwithstanding" exactly once (at 1b) and "Without prejudice" 21 times; the published German contained "Unbeschadet" 11 times including at 1b and "Ungeachtet" zero times. So the German rendering of the overriding clause matched the Regulation's own rendering of "without prejudice to" for 67 days. NEW TO THE BOARD, and the more consequential half: Article 1 point 8 also inserts 6(1a), "AI systems that are solely used for non-safety related aspects of user assistance, performance optimisation, service efficiency, automation or convenience or quality control shall not qualify as safety components", and 6(1c), excluding a product that needs third-party assessment "solely due to risks other than risks to health and safety, in particular risks relating to the distribution of radio spectrum or electromagnetic interference". Recital 7 states the amended Art. 3(14) definition exists because the old one "risks extending the high-risk classification of AI systems beyond what is justified". RETRIEVAL: `tools/eurlex.mjs get` and the CELLAR REST route both 404 on the corrigendum CELEX and on its ELI; it was retrieved by SPARQL for the expression URI then fetching `http://publications.europa.eu/resource/cellar/1d32c7c2-bb9e-11f1-81de-01aa75ed71a1.0001` | 2028-08-02 |
| Machinery Art. 8 delegated acts, AI health and safety into Annex III | not adopted; Art. 3(1) of the Omnibus sets "shall apply by 2 August 2028" | 2028-08-02 |
| Machinery Art. 20(10) | added by the Omnibus; AI Act harmonised standards give presumption of conformity in the interim | when Machinery AI hStds are cited |
| CEN/CENELEC AI harmonised standards for machinery | none submitted to the Commission as of Aug 2026 (secondary: IBF Solutions) | unknown |
| prEN 50742, protection against corruption | no ballot result published as of 2026-09-18. CORRECTION, do not re-read this as movement: the IBF sentence "Following a positive final vote in September, publication is scheduled for November 2026" sits on a page last updated 2026-07-31 and is prospective. standards.cencenelec.eu returned HTTP 500 again on 2026-09-22, a fourth consecutive run. ESCALATION EXHAUSTED: the browser pane also returns HTTP 500, so this is a server-side outage and not the browser-pane pattern. A nen.nl mirror was tried and 404ed. NOT RETRIED on 2026-09-30, per that decision, and the row is now **DORMANT**: stop spending a collector slot on it each run. Re-open it only on a different national mirror (candidates not yet tried: din.de, afnor.org, une.org, uni.com) or on a CEN/CENELEC announcement reached some other way. The prospective IBF sentence about a November 2026 publication remains prospective and is not evidence | 2026-11, dormant |
| ~800 carried-over Machinery Directive hStds | first citations expected Q3 2026 | Q3 2026 |
| ISO 25785-1, humanoid safety | **ISO/CD 25785-1**, unchanged at stage 30.60 on 2026-09-30, a third consecutive reading. Full official title, read at source: "Robotics — Safety requirements for dynamically stable industrial mobile robots (legged, wheeled, or other forms of locomotion) — Part 1: Robots". Committee Draft, stage 30.60 "Close of comment period", ISO/TC 299, first read 2026-09-18. Scope: "safety requirements for industrial mobile robots with actively controlled stability". Part 2, on integration, to be developed separately. NEW on 2026-09-30, the exclusions read at source: the document excludes "robots whose travel speed and travel direction is solely under control of a driver or an operator (e.g., human remote control, human continuous local control)", and also excludes ridden robots, worn robots such as exoskeletons, road vehicles, airborne and underwater robots, floor-cleaning robots and non-industrial environments. This is the exact complement of the FDA RASD scope below, which covers only teleoperated systems. The page carries no date for the stage, so this is a state reading and not a dated movement | unknown |
| NHTSA post-AV-STEP exemption regime | AV STEP withdrawn 2026-06-26; case-by-case exemptions | none stated |
| ISO 10218-1/-2:2025, ANSI/A3 R15.06-2025, UL 3300 | in force; UL 3300 on OSHA NRTL list 2025-12-31 | none stated |
| BIS advanced computing licence policy | case-by-case review; TPP < 21,000 and DRAM bw < 6,500 GB/s; independent third-party performance testing required | none stated |
| FMCSA broker bond and double-brokering penalties | $150k bond; penalties $50k | none stated |
| EAC ESTEP, Election Supporting Technology Evaluation Program | voluntary; Application for Testing form published 2026-09-15; agency sizes it at 9 submissions/yr, 1,296 hours, $101,217.60 | comment period per FR notice |
| ISO 25785-1, retrieval | RESOLVED 2026-09-18 by loading iso.org in a browser pane; curl still returns HTTP 403. Also corrected: catalogue ID 89619, retried on prior runs, is ISO/FDIS 25256 on road sweepers. The correct record is iso.org/standard/91469.html | n/a |
| Notified bodies designated under Reg (EU) 2023/1230 | **41 active, against 153 under Directive 2006/42/EC**, re-read 2026-09-30 with notification status Active. The Regulation line is unchanged from 09-22. The Directive line went 153 (09-18) to 152 (09-22) to 153 (09-30), so it has now moved twice and returned to its starting value; treat single-unit moves on that line as noise unless a name changes with them. Ratio 26.8%, against 27.0% on 09-22 and 26.1% on 09-18, 112 days before the Regulation applies. The complete 41-name list was captured on 09-30 across two pages with no overlap and is stored below, replacing the incomplete 37 from 09-22 | 2027-01-20 |
| NANDO / Single Market Compliance Space, retrieval | RESOLVED 2026-09-18. The register renders and filters in a browser pane; it returns an application shell to HTTP clients. Filter path: Legislation dropdown, then Refine results | n/a |
| Reg (EU) 2026/2108, Union Customs Code recast | NEW, published 2026-09-19, in force 2026-09-20, applies 2027-09-21 (Art. 287(2)) with staged provisions to 2028-07-01. Art. 27(2) binds the importer to ensure goods "comply with relevant other legislation applied by the customs authorities and provide or make available and keep appropriate records of such compliance"; only one importer at a time; the importer "shall be established in the customs territory of the Union". Buried: "The release of the goods shall not be considered to be proof of conformity." Links customs to Reg (EU) 2019/1020 market surveillance and the EU Product Compliance Network | 2027-09-21 |
| FDA draft guidance, Robotically-Assisted Surgical Devices, Premarket Submissions | NEW, published 2026-09-25, Docket FDA-2026-N-9505, FR Doc 2026-19704, guidance document number GUI01500081. Provides "draft recommendations regarding non-clinical and clinical testing and premarket submission content for RASDs". Creates no binding obligation: "This draft guidance is not final nor is it for implementation at this time" and it "does not establish any rights for any person and is not binding on FDA or the public". THE SCOPE IS THE FINDING: RASDs are defined as "teleoperated, software-controlled systems that integrate robotic technologies and subassemblies that are designed to assist qualified practitioners in precisely positioning and controlling multiple surgical instruments", so a learned autonomous surgical policy is outside this document. Read against ISO/CD 25785-1, which excludes teleoperated robots, the two instruments are exact complements and neither covers an autonomous policy in a clinical setting. Fifth instance of the pattern already on the board, a US regulator addressing robots without creating a third-party regime | comments close 2026-11-24 |
| Dir (EU) 2024/2853, Product Liability Directive | NEW to the watchlist 2026-10-01, added because it is the liability counterpart to certification and a corrigendum in window surfaced it. Corrigendum `32024L2853R(02)`, OJ ref 2026/90830, published 2026-09-29, **Dutch only**: "In de gehele richtlijn worden de woorden 'gratis en opensourcesoftware' vervangen door de woorden 'vrije en opensourcesoftware'." That replaces a free-of-charge reading with a libre one throughout the Dutch version, 680 days after publication on 2024-11-18. Not promoted to MOVES: changes no tracked number. Carried so a later run diffs the FOSS carve-out, which bears on the commons argument against assurance-seam | not read in full; transposition deadline not yet checked |
| NIST / NIBIB medical metrology and standards RFI | NEW, published 2026-09-18. Asks for "Suggested changes to the medical metrology and standards process to allow improved and cost-effective healthcare in a time of rapidly changing technology and incorporation of AI". Creates no obligation. Symposium 2026-09-24 | comment period per FR notice |

Notified bodies read active under Reg (EU) 2023/1230 on 2026-09-30. COMPLETE:
all 41 names, captured across two pages (30 + 11) with no overlap, against the
incomplete 37 stored on 09-22. Method that worked: filter Legislation to
"Regulation (EU) 2023/1230 on machinery" and Notification status to Active,
click Refine results, then read the table rows out of the DOM with a script
rather than from page text, and page with the paginator's "2" control. The
"Items per page: 100" control is present in the markup but sits outside the
viewport and cannot be clicked. Stored so a later run diffs names, not counts.

NB 0035 TUV Rheinland Industrie Service; NB 0036 TUV SUD Industrie Service;
NB 0044 TUV NORD CERT; NB 0080 INERIS; NB 0090 TUV Thueringen; NB 0102 PTB;
NB 0121 IFA / DGUV Test; NB 0123 TUV SUD Product Service; NB 0158 DEKRA Testing
and Certification; NB 0197 TUV Rheinland LGA Products; NB 0340 DGUV Test
Elektrotechnik; NB 0363 KWF Services; NB 0366 VDE Pruef- und
Zertifizierungsinstitut; NB 0370 LGAI Applus+; NB 0408 TUV AUSTRIA;
NB 0417 DGUV Test Verkehr und Landschaft; NB 0424 Kiwa Tarkastus;
NB 0515 DGUV Test Bauwesen; NB 0556 DGUV Test Nahrungsmittel und Verpackung;
NB 0598 SGS FIMKO; NB 0697 DGUV Test Holz und Metall; NB 0739 DGUV Test Druck
und Papierverarbeitung; NB 0905 Intertek Deutschland; NB 1015 Strojirensky
zkusebni ustav; NB 1073 Danish Technological Institute Dancert; NB 1339
Seilbahnbuero Schupfer; NB 1384 Technicke laboratore Opava; NB 1411
Certification and Testing Center (LV); NB 1433 Urzad Dozoru Technicznego;
NB 1456 KOMAG; NB 2187 POTA; NB 2261 TUV CYPRUS; NB 2703 ICR Polska;
NB 2805 Safenet Certification Services; NB 2828 CAC Conformity Assessment
Center; NB 2834 CCQS Certification Services; NB 2881 Boesmueller & Partner;
NB 2902 FINN-Tarkastus; NB 2957 Intercert Global; NB 2981 Exida IRL;
NB 3133 Technicka inspekce-CZ.

Four of these were absent from the 09-22 list: NB 0739, NB 1384, NB 2834 and
NB 2957. They are artefacts of that run's incomplete scrape and NOT new
designations, because the counter read 41 on both dates. NB 0050, recorded as
"not seen" on 09-22, is not in the register under this filter and that row
should not be carried forward.

Concentration, computed from the complete list on 2026-09-30 and not previously
visible because earlier runs held only a count. Germany holds 18 of the 41.
Seven of those 18 are DGUV Test units of the same body, the Deutsche
Gesetzliche Unfallversicherung: NB 0121 IFA, NB 0340 Elektrotechnik, NB 0417
Verkehr und Landschaft, NB 0515 Bauwesen, NB 0556 Nahrungsmittel und
Verpackung, NB 0697 Holz und Metall and NB 0739 Druck und Papierverarbeitung.
So one German statutory accident-insurance institution accounts for 7 of the 41
notified bodies under the new Regulation, and six further German entities carry
a TUV brand across four groups (NB 0035 and 0197 Rheinland, NB 0036 and 0123
SUD, NB 0044 NORD, NB 0090 Thueringen); NB 2261 TUV CYPRUS is a seventh
TUV-branded body outside Germany. Remaining countries: Poland 4, Austria 4, Finland 3, Czech Republic
3, Ireland 3, Spain 1, France 1, Croatia 1, Latvia 1, Denmark 1, Cyprus 1.
This bears on terrain-map.md §1 "the constraint", which reads the capacity
limit as accredited assessor headcount: the register says the new regime's
capacity is concentrated in a handful of institutions rather than spread across
41 independent firms.

---

## capex

| line | value | recorded | source |
|---|---|---|---|
| 2026 hyperscaler capex, five operators, guided | $725–800B | 2026-09-10 | company guidance, via parallel session |
| accelerator share of that capex | 55–60% to NVIDIA | 2026-09-10 | same |
| 2024 comparison | ~$238B | 2026-09-10 | same |
| non-NVIDIA inference silicon, largest private round tracked | EUCLYD, over EUR 200M Series A, co-led by Samsung | 2026-09-15 | company release |
| industrial world models, seed rounds tracked | Noetive, $41M seed led by Eclipse, no valuation disclosed | 2026-09-16 | company release |
| free public robot-manipulation evaluation benchmarks | 3: lbm_eval (TRI), RoboArena (Berkeley), RoboVAD (Zenodo 22754659) | 2026-09-17 | own count |
| AI-infrastructure round, largest tracked | Crusoe, $3.9B Series F initial closing at $30.9B post-money, co-led by Atreides Management, Mubadala Capital, Valor Equity Partners | 2026-09-17 | company release |
| datacenter capacity, first line tracked | Crusoe "6GW+ of gross contracted capacity across data centers and cloud, including 1 GW of gross capacity delivered and operational today"; over $140B total contracted value | 2026-09-17 | company release |
| non-regression testing as a product, first round tracked | Raindrop, Series A led by CRV, total funding USD 50M, no valuation stated. Lightspeed, Y Combinator and named OpenAI / Anthropic / Thinking Machines researchers participating. Sells replay of production traffic against a proposed change | 2026-09-17 | company release via Business Wire |
| colocation liquid cooling, first unit price tracked | Nasdaq NY11-5: Nasdaq-provided liquid-cooled cabinet at approximately 28.75 kVA, ongoing monthly fee $28,751.20 on a one-year commitment, $25,876.08 on two, $23,000.96 on three; installation $56,312.16 / $51,999.48 / $47,686.80, being a $4,560 standard NY11-4/-5 installation fee plus 28.75 kVA at $1,800 / $1,650 / $1,500 per kVA. Implied monthly per-kVA rates are $1,000 / $900 / $800, which is this system's arithmetic on the filing's worked examples. Two smaller tiers at approximately 14.38 and 23.00 kVA. A customer-provided cabinet carries "an installation fee of $2,500 and no ongoing monthly fee", and unlike air-cooled cabinets it may be customer-supplied. Immediately effective, implementation stated for Q4 2026. Filed identically by four Nasdaq venues on 2026-09-30: ISE (2026-19949), MRX (2026-19948), Texas (2026-19951), GEMX (2026-19947) | 2026-10-01 | SRO rule filing, Federal Register full text |
| robotics-sector round, largest tracked | D-Robotics, US$400M Series C. Primary release names no investor, only "a leading global internet company, alongside with top-tier investment institutions"; no valuation. Cumulative Sunrise chip shipments "exceeded 8 million units" | 2026-09-17 | company release |

---

## theses

| id | claim | state | kill test | last moved |
|---|---|---|---|---|
| assurance-seam | A neutral party that can state with validity what a learned policy does becomes structurally necessary | **contested** | Does any buyer pay for third-party attestation rather than open-sourcing the tool or using its own telemetry | 2026-10-01 |
| assurance-seam, surviving form | Production telemetry cannot establish whether an OTA update is a regression, because the previous policy cannot be run counterfactually without surrendering throughput | **contested, and the kill test may have fired** | Show one buyer paying for paired non-regression testing | 2026-10-01 |
| twin-certification | Nobody certifies the twin; SRCC-style validity claims are the sellable product | live | Show NVIDIA or Lightwheel successfully self-certifying, or a notified body accepting vendor sim evidence unaudited | 2026-10-01 |
| sc-node-map | 38 nodes, 7 of them the same assurance problem in different costumes | current | per-node kill tests in the ledger | 2026-09-08 |

Evidence against assurance-seam, carried so it is not forgotten: the commons
argument (TRI open-sourced lbm_eval, Berkeley open-sourced RoboArena, the field
has priced eval tooling at zero every time), the self-liquidation argument
(DYNA 99.4% across 850+ napkins means telemetry supplies trial counts free
where reliability is real), FoldNet++ claiming >90% zero-shot real-world
folding from synthetic data alone, and NHTSA declining to create the market.

Evidence for: Anthropic and OpenAI both committing to embedded third-party
evaluators 2026-09-12, EU 2023/1230 Annex I Part A item 5 confirmed intact,
BIS independent third-party testing condition of 2026-01-15, and LIBERO-CTRL
(arXiv 2609.15940, 2026-09-14) measuring that up to 29.0% of matched initial
states change outcome while the aggregate difference is not distinguishable
from zero, which is the surviving form's mechanism measured by a third party.

Further evidence against, carried at equal weight: the EAC sizes an entire
national voluntary third-party certification programme (ESTEP) at 9
submissions a year and $101,217.60 of respondent burden, which is one
datapoint on how small a voluntarily created evaluator seat can be. Added
2026-09-17: arXiv 2609.18264 derives generic indicators of resilience from
critical slowing down and affirms them "through real-world flight experiments
of a quadrotor that is nudged towards instability by progressively damaging
its propeller blades", with degraded resilience "evident well before" it
reaches behaviour. That is a telemetry-side early-warning instrument on real
hardware, which is the function the thesis assigns to an outside examiner. The
bound on the reading: the degradation is physical damage, not a model update,
and the paper does not test whether the indicators separate a policy
regression from ordinary wear. Also arXiv 2609.18293, function-preserving
synthetic data generation reporting zero-shot deployment "without real-world
fine-tuning", which extends the self-liquidation argument to pre-deployment.

Added 2026-09-18, and the weakening side is the better-evidenced again.
Weakening: arXiv 2609.20625, Chronicle, performs the counterfactual the
surviving form says cannot be performed. Its "cut-point replay, serves a
chosen subset of boundaries from the record and executes the complementary
subset live with new code, turning a recorded incident into a regression
test", at "23 microseconds per crossing (0.008% of an assumed 300 ms model
call)", with replay issuing "zero model calls" and "bit-stable across 20
repetitions". Public on GitHub, which is the commons argument running again.
The bound: an LLM agent's non-determinism sits at recordable boundaries, and a
robot policy's contact with the world does not, so the transfer to physical
policies is not demonstrated. Also weakening: arXiv 2609.20016,
Governance-as-Code, renders EU AI Act Articles 8 to 15 as "43 machine-checkable
acceptance criteria" in a CI/CD pipeline and reports it "reproduces all of the
manual audit's findings, including three penalty-triggering violations, while
cutting audit labor by roughly 75%", which automates the attestation labour on
the obligated party's own side. And arXiv 2609.19607, DeltaSelect, prices a
repeated baseline-versus-candidate comparison at USD 27.86 across 13
evaluations, while independently measuring the aggregate-versus-instance gap:
only 19.5% of tasks (22 of 113) reached a fifth-percentile Pearson correlation
of 0.50 with full-benchmark performance.
Supporting, at equal prominence: arXiv 2609.19844, SecTB-RTL, reports that
"The provider accepted 1,857 responses, but only nine passed the production
semantic validator" and concludes that "provider or schema acceptance does not
establish execution validity". Self-attestation and independent validation
disagreed by two orders of magnitude on the same artefacts. One incident, one
provider, hardware verification rather than a learned policy.

Further evidence for, added 2026-09-17: arXiv 2609.18820 argues that step-
scoped governance of agentic workflows cannot detect a class it names
Compositional Policy Violations, because "a predicate over a single step
cannot evaluate a property that step does not determine, so no improvement in
the accuracy of the step-scoped monitors detects this class". Same structure as
the non-regression claim, in a regulated non-robotics domain. It defines the
class rather than sizing it, and names no buyer.

Added 2026-09-22, and the kill test came closer to being answered than on any
prior run. Supporting: the Self-Healing Harness (arXiv 2609.24130, 21 September)
gates an agent's edits to its own operating instructions and reports that the
gate "rejected 383 replay-decided proposals. Of these, 211 (55%) improved their
triggering failure while degrading a case that previously worked." That is the
first measured base rate this system holds for the surviving form's core claim,
that a local improvement hides a regression. The bound: it gates a text context
and not model weights, and the team shipping the change chooses the protected
cases. Weakening, at equal prominence and arguably the stronger item: Raindrop
took a Series A led by CRV to USD 50M total and shipped Simulations, which
"replay real production traffic and existing test cases against a proposed
change to an agent harness, then apply Raindrop's anomaly detection to the
results". The kill test asks for a buyer paying for paired non-regression
testing; these buyers pay a vendor for a tool rather than a third party for a
verdict, which is the commons argument mutating into a SaaS argument. Raindrop
is not a new entrant: it is already in reports/yc-batch-map.html as W24, "Sentry
for AI Agents". THE UNRESOLVED POINT, carried forward from the 2026-09-18
gbrain capture and still unresolved: every replay system built so far replays a
digital boundary. Nothing has replayed physical contact. If the thesis is
restated as non-replayability of the physical world rather than non-regression
generally, it stops being contested by any of these items. That restatement is
the next decision on this board and Anshu has not made it.

For twin-certification, added 2026-09-22: arXiv 2609.23252, 19 September, shows
a latent dynamics model trained on one action parameterization and handed the
identical commanded trajectory written in the other "collapses". Retrieval
degrades 2.6-13.4x across three robot datasets and two morphologies,
goal-conditioned action selection falls from 53% to 15%, and on PushT the two
beliefs about the same future reach cos = 0.067, worst case -0.377, while the
encodings are "mutually reconstructible at R^2 = 0.996". Their invariance test
"rejected three of the four axes we proposed". Direction: supports, because a
twin whose predictions invert under a relabelling the manufacturer picks
silently needs an outside check on the encoding and not only on the outcome.
Bound: a research model on three datasets, and no notified body has been asked
to accept either. Note for Anshu specifically: this cuts against the world-model
route he stated on 2026-09-19 as the better approach, and it was cut from MOVES
on the charter's ranking rules rather than on its interest.

Added 2026-09-30, and this is the run the surviving form has been waiting for.
THE UNRESOLVED POINT carried since 2026-09-18 was that every replay system built
so far replays a digital boundary and nothing has replayed physical contact. That
is no longer true. arXiv 2609.30608, "Audit Before You Commit", 24 September,
audits a probe-then-commit insertion pipeline and reports that "replaying the
recorded taps under an injected model error shows the audit's signature on real
data", on a physical arm inserting a tool into a rigid pocket by touch. Its other
figures: in simulated insertion the truth leaves the belief's support on 16.9% of
episodes while the failure score "turns optimistic by 0.31"; "Conformal
calibration restores coverage but not the decision: confidently wrong instances
still pass a confidence gate"; a hand scan found a 2.1 mm error in the tap
boundary and correcting that one number cut failure from 0.354 to 0.112 on
untouched instances, transferring unrefitted to a second engine. Seven task
families, three engines. THE BOUND, and it decides whether the kill test actually
fired: what is replayed is recorded proprioceptive probes re-scored under a
changed observation model, not contact dynamics re-executed under a different
action. So the physical world was replayed in the sense the 09-18 capture feared,
but only for the passive sensing half of it. The decision Anshu has not made,
carried forward for a second run and now with a concrete artefact attached: state
the thesis as non-replayability of *contact under a changed action* or concede it.

Supporting, added 2026-09-30: arXiv 2609.37771 audited seven simulated
manipulation benchmarks including RoboTwin, LIBERO-Plus and VLABench and found
"22 bugs of these types and 4 design limitations", where fixes "can reverse
method rankings, moving the baseline from last to first on one task" and on
another the baseline "moves from 21 percentage points behind an accelerated
method to 5 points ahead". The field's own published scores were wrong by more
than the effect being claimed, and a party auditing the harness rather than
running it is what found it. Bound: the auditors are inside the field and shipped
fixes rather than a verdict. Also arXiv 2609.32495, Hearsay: across sixteen
deployed agent frameworks "none writes one in full", an append-only log kept
outside the harness "reports all 28 omissions and fabrications we made a harness
commit as it ran, where a hash chain over the harness's own record passes all
28", and "What makes a record evidence is who writes it, not what is captured."
That is the seam's structural claim tested directly, bounded to agent harnesses
rather than robot policies, and with the same authors building attack and remedy.
Also arXiv 2609.36518, LIBERO-MAX, 8,000 paired cases holding "the task, initial
state, policy seed, and pre-event action sequence fixed" so as to distinguish
"event-associated regressions from failures already present without the change",
with success falling 11.0 to 25.7 percentage points across fourteen policies:
the paired protocol LIBERO-CTRL began is now a standing benchmark.

Weakening, added 2026-09-30 at equal prominence: arXiv 2609.30557 audited
latent-space failure monitors on two autonomous-driving tasks and found a monitor
using only LaneSegNet's prediction outputs reaches AUROC 0.825 while for VAD ego
state, driving command and predicted trajectory reach 0.924, with "Adding latent
features to either baseline yields no statistically resolved improvement". If
observable inputs and outputs predict failure as well as privileged internal
access does, the examiner's claim to need access the operator must grant gets
weaker. Bound: failure prediction is not regression detection and neither task
involves a policy update. Also weakening on the commons argument: arXiv 2609.31374
(RECAST) lifts driving-log replay into closed-loop simulation and raises the
no-collision rate from 22.2% to 63.0%, and arXiv 2609.28952 (RoboRecover)
reconstructs deviation states "by replaying action prefixes", both in simulation
and both public.

For twin-certification, added 2026-09-30: arXiv 2609.34300, "When World Models
Lie", states that world-model predictions "can be biased, miscalibrated, or
confidently wrong" and that the auxiliary signals normally used to detect this,
ensemble disagreement and value-target consistency residuals, "can remain small
even when the world model's predictions deviate from observations". Direction:
supports, because the twin's own internal confidence signals do not reveal its
error. Bound, and it is why this did not reach MOVES: the remedy proposed is an
adaptive conformal filter the operator runs on itself, not an outside check.

Also carried, on self-issued certificates: arXiv 2609.23478, 20 September,
shows the "label-free certificate" used to validate latent action models does
not establish what it claims, since "a trained but unconstrained counterpart
already achieves 83-97% of the reduction relative to an untrained anchor". And
arXiv 2609.23957, 21 September, separates reproducibility from validity on the
same artefacts: enforced checks "raised fresh-run reproduction from one of eight
to eight of eight but could not detectably improve conclusion validity, because
fifteen of sixteen agents selected the same audit-excluded entry".

Added 2026-10-01. Two supporting and two weakening, and the weakening side now
has the thing the board had been waiting for on the hardware question.

Weakening, and it is the sharpest item of the day: arXiv 2609.39755, 30
September, runs a model-replacement gate on a physical Unitree Go2. A
continual-learning pipeline maps pre-contact images to five proprioceptive
indicators (planar foot slip, mean normal ground-reaction force, traction
index, cost of transport, touchdown loading rate), and "Candidate models
replace the deployed predictor only when they improve performance on recent
held-out data while keeping degradation on historical held-out data within a
prescribed tolerance". On a sequential hardware stream over three unseen
terrains, "gated replay reduces final anchor negative log-likelihood (NLL)
degradation by 23.1% relative to replay without the gate". So an operator gated
its own update against its own historical contact measurements, on real
hardware, with no third party and no throughput surrendered. THE BOUND, and it
is the whole remaining thesis: what is scored is stored proprioceptive data
re-scored by a candidate model, and the prior predictor is never re-executed.
That is sound for a perception predictor, whose inputs are recorded, and it is
not available for a closed-loop control policy, whose actions determine which
states exist to be scored. Together with 2609.30608 of 24 September, which
replayed recorded taps under an injected observation error, the pattern is now
clear and should be stated once rather than rediscovered: the physical half of
replay works wherever the robot's sensing is passive, and nothing yet
re-executes contact under a different action. The decision Anshu has not made,
carried for a third run: state the thesis as non-replayability of contact under
a changed action, or concede it.

Also weakening, from the operations side rather than research: OpenAI's 30
September security post gives an operator a reason to destroy replayability on
purpose. It "closed a pathway that allowed someone who already possessed
another user's encrypted reasoning to replay it and recover its contents", and
states that "Systems that support portable or replayable reasoning artifacts
may face related risks". If recordability is an extraction surface, the
operator's incentive is to make artefacts unreplayable, which forecloses
third-party replay audit for reasons that have nothing to do with whether it
works. This is a different kind of objection from the commons and
self-liquidation arguments already on the board and should be tracked as its own
line: call it the foreclosure argument.

Supporting: arXiv 2609.40027, 30 September, red-teams a causal action verifier
(CIVeX) by corrupting only its committed graph. Omitting one bidirected edge
takes it from zero false executions to 15.3% with "91% of its executions
harmful"; reversing one arrowhead gives "48.9% false executions and no correct
ones". "Every one of these actions carries an internally valid certificate." An
attestation step testing certified executions against a bounded randomised
sample "detected both attacks, with 2 false alarms in 555 executions". It also
prices the seat, which almost nothing on this board does: "Recovering safety
costs 127 experiments per 1,050 actions; recovering the lost value costs 614
more." And it adds a structural distinction worth carrying: "An audit that
inspects only executions protects against wrongful action. Wrongful inaction has
to be paid for separately", because at the published confounding strength 97.1%
of beneficial actions are still never executed. Bound: synthetic benchmark, LLM
tool use, and the same authors built attack and remedy.

Supporting: arXiv 2609.38983, Approval Laundering, 30 September, instruments
Claude Code's PreToolUse mediation point across six failure modes at N=19-20
runs each with inter-rater kappa=1.0, and reports that the assumption "that the
action A a human approves is the same action A' the harness executes" fails
"systematically and reproducibly". A keyed Approval Token, evaluated by paired
before/after replay of 118 runs under McNemar's exact test, "fully eliminates
Delegation laundering" and Temporal laundering at p<10^-5 "but by design leaves
Scope laundering unaffected and shows no significant reduction in Argument"
laundering. Same structure as Hearsay (2609.32495) but with a measured rate and
a remedy that provably does not close all of it. Bound: coding agents, not robot
policies, and the authors built both taxonomy and token.

Carried, read and not promoted, each changing no tracked number. arXiv
2609.38956 pushes the 30 September outputs-versus-latent finding (2609.30557)
considerably further: under an exact label null the apparent gain from
privileged internal routing signals is an artefact of checkpoint selection, and
"across all output views the raw detection rate falls from 27.5% (528/1,920) to
zero observed detections" once checkpoints are chosen on validation log loss
rather than accuracy. Direction: weakens, because it says the examiner's claim
to need internal access was partly a measurement artefact. arXiv 2609.39717
proposes Runtime Assurance Contracts under which "aggregate performance cannot
authorize action", and reports a published score rule admitting "80 of 100
block-required injections and all 40 review-required injections"; synthetic
cases only. arXiv 2609.40306 DynaHarness gates a self-evolving robot agent's own
revisions, where "Paired regression checks govern admission or rejection", 75.2%
against 17.5% for the frozen policy on 800 newly sampled initial states, in
simulation on LIBERO-Pro; this is the Machinery Annex I "self-evolving" language
appearing as an engineering artefact. arXiv 2609.37315 audits 34 mutating tools
across four agent benchmarks against their advertised interfaces and confirms
"seven tool defects and one evaluator property", including a clinical benchmark
whose grader "takes that message as evidence, so its action success rate records
whether a request carried the expected payload, not whether any record changed";
same shape as 2609.37771 from 09-29, in a different domain. arXiv 2609.39537
finds LLM-assisted classification of EU AI Act compliance evidence reaching only
kappa 0.045 in the employment domain, "a cautionary result for automated
fairness-related evidence retrieval", which cuts against the Governance-as-Code
(2609.20016) weakening item already on the board and is the first item to do so.

For twin-certification, added 2026-10-01, and neither reached MOVES because
neither involves an outside party. arXiv 2609.39235 finds that a latent world
model "guides action selection reliably only when the goal lies within, or
slightly beyond, the trajectory it imagines during planning": with five-step
rollouts it ranks actions reliably only five to ten control steps ahead while
"task goals lie 16 to 53 steps away", and "Neither an 81-fold larger predictor
nor longer-rollout training extends this range". Decisively, "the limit persists
under perfect prediction: using the real simulator, success falls from 92% to
41% as the target moves from five to twenty steps ahead of a five-step rollout".
That complicates the thesis rather than supporting it: certifying a twin's
fidelity would not buy planning competence, because the binding limit is the
rollout horizon and not the prediction error. The certifiable property, if there
is one, is the horizon over which the twin's ranking holds. arXiv 2609.39182
MEND detects latent hallucination in a frozen world model "in the absence of
ground-truth error labels" at AUROC up to 0.80 with per-token AUPRC up to 0.87,
which is another self-administered check in the lineage of the label-free
certificate already criticised at 2609.23478.

---

## domains

Stock-side state. Decision of 2026-09-14: **breadth first, narrow later.**

| domain | depth | document | status |
|---|---|---|---|
| industrial certification and standards bodies | terrain | reports/terrain-map.md §1 | written 2026-09-14; §1 "what is missing" partly closed 2026-09-18, updated 2026-09-22, and updated again 2026-09-30 to 41 under 2023/1230 and 153 under 2006/42/EC with the complete 41-name list and the DGUV / TUV concentration finding. Fee schedules, day rates and assessor utilisation remain not found, which is now the only substantive gap left in §1. §1 "the money" fully serialised into the brief as of 2026-10-01 |
| the robot policy layer | terrain | reports/terrain-map.md §2 | skeleton, gaps named |
| datacenter and power buildout | none | reports/terrain-map.md §3 | scope only, not researched |

In progress for the brief's FROM THE STOCK SIDE section: `reports/terrain-map.md`.
Serialise it in order, at most 400 words per weekday, and record the last
section delivered in the `serialised` line below. When the file is exhausted,
omit the section rather than inventing a new domain.

serialised: §1 vocabulary completed 2026-09-17. §1 the value chain COMPLETE, ASCII diagram carried whole plus the working-group-as-commercial-asset paragraph (2026-09-18). §1 the money COMPLETE as of 2026-10-01, delivered out of document order across three instalments and now reconciled: the margin paragraph with Bureau Veritas FY2025 revenue EUR 6.5bn, adjusted operating profit EUR 1,052.9m, 16.3% adjusted operating margin and 18.2% Certification division margin (2026-09-22); the Recital 27 and Article 25(5) SME fee paragraph with the 98% figure and the "shall take into account" duty (2026-09-30); and the four-house TIC market spread carried whole on 2026-10-01, with USD 254.41bn / 275.39bn / 280.2bn / 320.55bn, the 26% spread, the "no single figure here should be quoted as the market size" instruction and Asia Pacific at roughly 38%. NOTHING FROM §1 THE MONEY IS NOW OUTSTANDING. Next, in document order: §1 the constraint, which opens on Article 30(8) "The remuneration of the top-level management and the personnel responsible for carrying out the conformity assessment tasks shall not depend on the number of conformity assessments carried out or on the results of those assessments", then its two further paragraphs on Article 30(9) liability insurance and Article 30(10) professional secrecy. Carry the DGUV concentration finding with the first of those, because the register says that assessor headcount sits inside a handful of institutions. Then §1 the live disagreement, then §1 the recent history and the designation mechanics of Articles 33(2), 33(3) and 34(5).

Narrowing trigger, so this does not drift forever: after the terrain map is
fully delivered, compare the attention tally below against depth. The domain
with the most answered questions and the least depth is the S1 curriculum
candidate. Anshu decides; the tally is the input, not the decision.

---

## attention

The filter. Counts where his own attention actually goes, which is better
ranking data than anything the agents can infer. M2 increments these.

| domain | brief items | questions answered | questions skipped |
|---|---|---|---|
| certification and standards | 18 | 0 | 0 |
| robot policy layer | 8 | 0 | 0 |
| datacenter and power | 5 | 0 | 0 |
| capital flows, general | 6 | 0 | 0 |

2026-09-17: certification +2 (the two arXiv assurance claims), datacenter and
power +1 (the EPA repeal, the first dated federal instrument this system has
logged on that domain), capital +1 (Noetive).

2026-09-18: certification +3 (the notified-body count, the ISO 25785-1 stage,
and the Chronicle / SecTB-RTL pair), datacenter and power +1 (Crusoe's 6GW
contracted and 1GW operational, the first capacity figures on that domain),
capital +1 (Crusoe and D-Robotics counted once as a capital item). Six
consecutive ONE QUESTIONs are now unanswered. The tally is still counting
items rather than attention, so it cannot yet do the job the 2026-09-14
narrowing decision assigned it. Note the shape it has anyway: certification
leads 10 to 5 to 4, and it leads because the agents keep finding items there,
not because Anshu has signalled anything. Do not read the lead as a
preference until at least one question is answered.

2026-09-22: certification +3 (the register moving on both lines, the Intertek
designation, and the Self-Healing Harness measurement), robot policy layer +1
(the action-reparameterization result), capital +1 (Raindrop). Seven consecutive
ONE QUESTIONs are now unanswered. The tally still counts agent output rather
than Anshu's attention, so it remains unusable as the narrowing input the
2026-09-14 decision assigned it. This is the second consecutive run saying so.
The honest conclusion, stated rather than deferred again: the tally cannot start
working until a question gets answered, so either the questions need to be
easier to answer in one line, or the narrowing decision needs a different input.
That is a decision for Anshu, not a number the agents can produce.

2026-09-30: certification +3 (the FDA RASD scope, the benchmark audit reversing
rankings, and the DGUV / TUV concentration in the register), robot policy layer
+2 (the physical-contact replay and LIBERO-MAX). Eight consecutive ONE QUESTIONs
are now unanswered, and this is the third consecutive run reporting that the
tally measures agent output rather than attention. STOP RE-STATING THIS. The
design assumed the questions would be answered in a scratchpad that no run has
ever found; there is no scratchpad file in the repository and none of the eight
questions has an answer recorded anywhere. Either the answer channel does not
exist or it is somewhere the agents do not read. Until one of those is fixed the
narrowing decision of 2026-09-14 has no input and the certification lead, now
16 to 7 to 4, reflects only where the collectors keep finding items. A concrete
proposal so this is not deferred a fourth time: today's question is a yes or no
with a named consequence, which is the cheapest possible answer format, and if
it too goes unanswered the attention mechanism should be declared dead and
replaced by Anshu choosing the domain directly.

2026-10-01: certification +2 (the Digital Omnibus corrigendum and the new
Article 6(1a)/(1b) qualification test, counted as one; and the self-issued
certificate result), robot policy layer +1 (the hardware model-replacement
gate), datacenter and power +1 (the first colocation liquid-cooling price).
Nine consecutive ONE QUESTIONs are now unanswered. Per the decision recorded on
30 September, this is the run after the cheapest-possible-format question was
tried, and it went unanswered like the eight before it. STATE THE CONSEQUENCE
RATHER THAN DEFERRING IT AGAIN: the attention mechanism designed on 2026-09-14
has never received a single input, there is no scratchpad file anywhere in the
repository, and the tally now reads 18 to 8 to 5 purely as a record of where the
collectors look. It should be treated as dead for the purpose of the narrowing
decision. The narrowing input is therefore Anshu choosing the domain directly,
and until he does, the terrain map continues to serialise in document order,
which is the behaviour that needs no decision. Do not open a tenth run by
re-describing this problem. Today's question is retained because it is a
genuine fork in the eu-machinery-2027 card rather than because the mechanism
works.

---

## questions

Open, from the daily ONE QUESTION block. Unanswered until a scratchpad entry
addresses them.

| date | question | answered |
|---|---|---|
| 2026-09-14 | Does a voluntarily created evaluator seat become a product faster than a mandated one, or slower, given the labs choose their own examiners and can unchoose them | no |
| 2026-09-14 | If a simulator good enough to train a transferable policy is by construction good enough to evaluate one, does the non-regression wedge survive at all, or only for tasks whose simulators are still bad | no |
| 2026-09-15 | If the only independent measurement of the non-regression gap so far was published free on arXiv by two authors, is the defensible asset the method or the accredited seat that signs the certificate | no |
| 2026-09-10 | What does the buyer of an attestation actually purchase, and is it the same thing in export control and in machinery safety | no |
| 2026-09-17 | If loss of stability is detectable from a robot's own telemetry before it reaches outcomes, is the non-regression wedge now confined to the case where neither policy is degrading | no |
| 2026-09-18 | If the register shows 40 notified bodies for the Regulation against 153 for the Directive it replaces in 124 days, is the binding constraint on 20 January 2027 the missing standard or the missing assessors | no |
| 2026-09-22 | Replay-based non-regression testing is now funded and shipping for agent traffic, while nothing has replayed physical contact: is the surviving thesis about non-regression at all, or only about the non-replayability of the physical world | no |
| 2026-09-30 | Recorded taps on a real arm have now been replayed under an injected model error, which the 18 September capture said would kill the surviving thesis outright: does that fire the kill test, or do proprioceptive probes fall short of contact under a changed action, in which case the thesis needs restating in those words | no |
| 2026-10-01 | AI Act Article 6(1a), inserted by the Digital Omnibus, excludes an AI system solely used for quality control from qualifying as a safety component: does that put visual inspection and weld-quality policies, which is where most paying industrial deployments sit, outside the 20 January 2027 notified-body obligation, yes or no | no |

---

## numbers

Figures cited more than once. Each carries its source and date so a later run
can diff rather than re-derive.

| figure | value | source | date |
|---|---|---|---|
| Bureau Veritas FY2025 adjusted operating margin | 16.3% | company release | 2026-02-25 |
| Bureau Veritas Certification division margin | 18.2% | company release | 2026-02-25 |
| SMEs as share of the machinery sector | ~98% | Reg 2023/1230 recital 27 | 2023-06-29 |
| rollouts to resolve 10pp at p=0.5 | ~390 per arm | own review | 2026-09-03 |
| rollouts to resolve 5pp | ~1,570 per arm | own review | 2026-09-03 |
| EBU/BBC AI news answers with a significant issue | 45% | EBU report | 2025-10 |
| TIC market 2026, spread across four houses | $254B to $321B | four research firms | 2026-09-14 |
| matched initial states changing outcome under compound perturbation | up to 29.0%, 34.5% worst condition | arXiv 2609.15940 | 2026-09-14 |
| EAC ESTEP annual respondent burden | 1,296 hours, $101,217.60 at $78.10/hr, 9 submissions | Federal Register 2026-18797 | 2026-09-15 |
| projected US electricity load growth rate, increase attributed largely to AI datacenter demand | nearly 2.6-fold | EPA final rule, FR 2026-19071, footnote 109 | 2026-09-17 |
| RoboVAD hardest cross-domain setup, best frame-level AUC | all methods below 70% micro-averaged | arXiv 2609.17843 | 2026-09-15 |
| global physical economy, as the vendor sizes it | $30 trillion | Noetive release, vendor claim about its own market | 2026-09-16 |
| notified bodies active under Reg (EU) 2023/1230 | 41, unchanged from 2026-09-22, was 40 on 2026-09-18 | Commission Single Market Compliance Space register | 2026-09-30 |
| notified bodies active under Directive 2006/42/EC | 153, was 152 on 2026-09-22 and 153 on 2026-09-18 | same register, same reading | 2026-09-30 |
| new machinery regime as a share of the outgoing one | 26.8%, was 27.0% on 2026-09-22 and 26.1% on 2026-09-18 | own arithmetic on the two counts | 2026-09-30 |
| DGUV Test units among the 41 notified bodies under Reg (EU) 2023/1230 | 7 of 41, one German institution | own count on the complete register list | 2026-09-30 |
| German share of notified bodies under Reg (EU) 2023/1230 | 18 of 41 | same count | 2026-09-30 |
| belief support loss on a probe-then-commit insertion pipeline | truth leaves the belief's support on 16.9% of episodes, failure score optimistic by 0.31 | arXiv 2609.30608 | 2026-09-24 |
| failure rate after correcting a 2.1 mm observation-model error | 0.354 to 0.112 on untouched instances | arXiv 2609.30608 | 2026-09-24 |
| bugs and design limitations found auditing seven manipulation benchmarks | 22 bugs, 4 design limitations; one baseline moved from 21pp behind to 5pp ahead | arXiv 2609.37771 | 2026-09-29 |
| success drop under a mid-execution change, fourteen policies | 11.0 to 25.7 percentage points, 8,000 paired cases | arXiv 2609.36518 | 2026-09-29 |
| outputs-only versus latent failure monitor, autonomous driving | AUROC 0.825 and 0.924, latent features add no statistically resolved improvement | arXiv 2609.30557 | 2026-09-24 |
| deployed agent harnesses writing a fully evidentiary record | 0 of 16; an external log caught 28 of 28 fabrications a hash chain missed | arXiv 2609.32495 | 2026-09-26 |
| self-modifications that improved the triggering failure while degrading a previously working case | 55%, 211 of 383 replay-decided proposals | arXiv 2609.24130 | 2026-09-21 |
| goal-conditioned action selection under a rewritten action parameterization | falls from 53% to 15% on the identical commanded trajectory | arXiv 2609.23252 | 2026-09-19 |
| share of a latent-action "label-free certificate" reduction already reached by an unconstrained baseline | 83-97% | arXiv 2609.23478 | 2026-09-20 |
| Crusoe gross contracted datacenter capacity | 6GW+ contracted, 1GW delivered and operational | company release | 2026-09-17 |
| Crusoe total contracted value | over $140B | company release, company's own figure | 2026-09-17 |
| Chronicle record-and-replay overhead | 23 microseconds per crossing, 0.008% of an assumed 300 ms model call | arXiv 2609.20625 | 2026-09-17 |
| provider schema acceptance versus independent validator pass | 1,857 accepted, 9 passed | arXiv 2609.19844 | 2026-09-17 |
| EU AI Act compliance audit labour reduction, self-reported | roughly 75% | arXiv 2609.20016 | 2026-09-17 |
| cost of a repeated baseline-versus-candidate agent comparison | USD 27.86 across 13 evaluations | arXiv 2609.19607 | 2026-09-17 |
| tasks whose single run tracks full-benchmark performance | 19.5%, 22 of 113, at a fifth-percentile Pearson correlation of 0.50 | arXiv 2609.19607 | 2026-09-17 |
| occurrences of "Unbeschadet" in the German text of Reg (EU) 2026/1744 as published | 11, against 0 for "Ungeachtet"; the English has "Notwithstanding" once and "Without prejudice" 21 times | own count on the CELLAR German and English expressions | 2026-10-01 |
| days the German Art. 6(1b) override read like a without-prejudice clause | 67, from OJ publication 2026-07-24 to the corrigendum 2026-09-29 | own arithmetic | 2026-10-01 |
| colocation liquid-cooled cabinet, monthly fee at ~28.75 kVA | $28,751.20 one-year, $25,876.08 two-year, $23,000.96 three-year; implied $1,000 / $900 / $800 per kVA per month | Nasdaq ISE SR filing, FR 2026-19949 | 2026-09-30 |
| colocation liquid-cooled cabinet, installation at ~28.75 kVA | $56,312.16 one-year, being $4,560 plus 28.75 kVA at $1,800 per kVA; customer-supplied cabinet $2,500 with no monthly fee | same filing | 2026-09-30 |
| false executions after corrupting one edge of a committed action-verification graph | 0% to 15.3%, 91% of executions harmful; one reversed arrowhead gives 48.9% and no correct ones, every one carrying an internally valid certificate | arXiv 2609.40027 | 2026-09-30 |
| cost of restoring an audited verifier's decisions | 127 experiments per 1,050 actions for safety, 614 more to recover the lost beneficial actions | arXiv 2609.40027 | 2026-09-30 |
| gated model replacement on a physical quadruped | final anchor NLL degradation cut 23.1% against ungated replay, three unseen terrains, Unitree Go2 | arXiv 2609.39755 | 2026-09-30 |
| apparent failure-prediction gain from privileged internal routing signals, under an exact label null | 27.5% (528/1,920) detection rate falls to zero once checkpoints are selected on validation log loss | arXiv 2609.38956 | 2026-09-30 |
| world-model planning limit under perfect prediction | success falls 92% to 41% as the target moves from five to twenty steps ahead of a five-step rollout | arXiv 2609.39235 | 2026-09-30 |
| LLM-assisted classification of EU AI Act compliance evidence, employment domain | Cohen kappa 0.045 against a 69-record gold standard | arXiv 2609.39537 | 2026-09-30 |
| requests in the extraction campaign OpenAI attributes to individuals associated with Moonshot AI | 16,000 on 24 and 25 July from over 4,000 users, inside a cluster of more than 15,000 users; attempted, not necessarily successful | OpenAI, company post | 2026-09-30 |
