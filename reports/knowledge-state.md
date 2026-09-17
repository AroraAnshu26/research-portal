# Knowledge state

The file every agent reads to answer "what does he already know". Maintained by
M2 Ledger Keeper after each editor run. This is a state file, not a document:
no prose, no commentary, no history beyond what is needed to compute a diff.

Last updated 2026-09-17 by the M1/M2 run. No run happened on 2026-09-16: the
03:00 task was deferred to next launch, so the 2026-09-17 window covered
15 to 17 September.

---

## voices

The F6 list. Keep between 8 and 12 names. Read at the person's own venue only.

| person | venue | newest seen | date |
|---|---|---|---|
| Dario Amodei | darioamodei.com, short posts | We Must Pace the Frontier | 2026-09-12 |
| Dario Amodei | darioamodei.com/essay/ | The Adolescence of Technology, dated "January 2026" on the page; /archive returns HTTP 404 | 2026-01 |
| Paul Graham | paulgraham.com/articles.html | Making Startups Powerful | 2026-09 |
| Andrej Karpathy | karpathy.bearblog.dev/blog | venue restored, HTTP 200 on 2026-09-17 after 404 on 2026-09-15; newest is Sequoia Ascent 2026 summary | 2026-04-30 |
| Andrej Karpathy | karpathy.github.io | (older) | 2026-02-12 |

Slots open: 8. Candidates not yet added, decide before adding: Chelsea Finn,
Dorsa Sadigh, Ben Thompson, Dylan Patel, Jack Clark, Cedric Chin.

---

## instruments

The F3 watchlist. Carry every row forward every run.

| instrument | state as of 2026-09-17 | next date |
|---|---|---|
| EPA Carbon Pollution Standards for fossil fuel-fired EGUs, 40 CFR Part 60 | partial repeal final rule published 2026-09-17; repeals the CCS-based Phase 2 standards for new base load stationary combustion turbines; rule text names AI datacenter load as driving a "nearly 2.6-fold increase in projected growth rates"; a concurrent supplemental proposal seeks comment on rescinding all GHG requirements for EGUs | effective 2026-11-16 |
| EU harmonised-standard citations, Commission throughput | Implementing Decision (EU) 2026/2048, published 2026-09-16, cited EN 18060:2025 under the Batteries Regulation 2023/1542. Not machinery, carried as evidence the citation machinery is running | none stated |
| Machinery Regulation (EU) 2023/1230 | applies 2027-01-20; Annex I Part A item 5 confirmed untouched by the Digital Omnibus | 2027-01-20 |
| Reg (EU) 2026/1744, Digital Omnibus on AI | in force 2026-07-27; moved 2023/1230 from AI Act Annex I Section A to Section B point 21 | 2028-08-02 |
| Machinery Art. 8 delegated acts, AI health and safety into Annex III | not adopted; Art. 3(1) of the Omnibus sets "shall apply by 2 August 2028" | 2028-08-02 |
| Machinery Art. 20(10) | added by the Omnibus; AI Act harmonised standards give presumption of conformity in the interim | when Machinery AI hStds are cited |
| CEN/CENELEC AI harmonised standards for machinery | none submitted to the Commission as of Aug 2026 (secondary: IBF Solutions) | unknown |
| prEN 50742, protection against corruption | no ballot result published as of 2026-09-17. CORRECTION, do not re-read this as movement: the IBF sentence "Following a positive final vote in September, publication is scheduled for November 2026" sits on a page last updated 2026-07-31 and is prospective. standards.cencenelec.eu returned HTTP 500, so no ballot page has been read | 2026-11 |
| ~800 carried-over Machinery Directive hStds | first citations expected Q3 2026 | Q3 2026 |
| ISO 25785-1, humanoid safety | unpublished | unknown |
| NHTSA post-AV-STEP exemption regime | AV STEP withdrawn 2026-06-26; case-by-case exemptions | none stated |
| ISO 10218-1/-2:2025, ANSI/A3 R15.06-2025, UL 3300 | in force; UL 3300 on OSHA NRTL list 2025-12-31 | none stated |
| BIS advanced computing licence policy | case-by-case review; TPP < 21,000 and DRAM bw < 6,500 GB/s; independent third-party performance testing required | none stated |
| FMCSA broker bond and double-brokering penalties | $150k bond; penalties $50k | none stated |
| EAC ESTEP, Election Supporting Technology Evaluation Program | voluntary; Application for Testing form published 2026-09-15; agency sizes it at 9 submissions/yr, 1,296 hours, $101,217.60 | comment period per FR notice |
| ISO 25785-1, humanoid safety, retrieval | iso.org returns HTTP 403 to non-browser clients; stage unverified for three consecutive runs, 2026-09-15, 09-16 (not run) and 09-17. Needs a browser fetch or a different route | unknown |

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

---

## theses

| id | claim | state | kill test | last moved |
|---|---|---|---|---|
| assurance-seam | A neutral party that can state with validity what a learned policy does becomes structurally necessary | **contested** | Does any buyer pay for third-party attestation rather than open-sourcing the tool or using its own telemetry | 2026-09-14 |
| assurance-seam, surviving form | Production telemetry cannot establish whether an OTA update is a regression, because the previous policy cannot be run counterfactually without surrendering throughput | live | Show one buyer paying for paired non-regression testing | 2026-09-17 |
| twin-certification | Nobody certifies the twin; SRCC-style validity claims are the sellable product | live | Show NVIDIA or Lightwheel successfully self-certifying, or a notified body accepting vendor sim evidence unaudited | 2026-09-17 |
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

Further evidence for, added 2026-09-17: arXiv 2609.18820 argues that step-
scoped governance of agentic workflows cannot detect a class it names
Compositional Policy Violations, because "a predicate over a single step
cannot evaluate a property that step does not determine, so no improvement in
the accuracy of the step-scoped monitors detects this class". Same structure as
the non-regression claim, in a regulated non-robotics domain. It defines the
class rather than sizing it, and names no buyer.

---

## domains

Stock-side state. Decision of 2026-09-14: **breadth first, narrow later.**

| domain | depth | document | status |
|---|---|---|---|
| industrial certification and standards bodies | terrain | reports/terrain-map.md §1 | written 2026-09-14 |
| the robot policy layer | terrain | reports/terrain-map.md §2 | skeleton, gaps named |
| datacenter and power buildout | none | reports/terrain-map.md §3 | scope only, not researched |

In progress for the brief's FROM THE STOCK SIDE section: `reports/terrain-map.md`.
Serialise it in order, at most 400 words per weekday, and record the last
section delivered in the `serialised` line below. When the file is exhausted,
omit the section rather than inventing a new domain.

serialised: §1 vocabulary COMPLETE, through "lose the self-certification option" (2026-09-17). Next: §1 the value chain, carrying its ASCII diagram, the named notified bodies and the working-group-as-commercial-asset paragraph. Then §1 the money.

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
| certification and standards | 7 | 0 | 0 |
| robot policy layer | 4 | 0 | 0 |
| datacenter and power | 3 | 0 | 0 |
| capital flows, general | 4 | 0 | 0 |

2026-09-17: certification +2 (the two arXiv assurance claims), datacenter and
power +1 (the EPA repeal, the first dated federal instrument this system has
logged on that domain), capital +1 (Noetive). Five consecutive ONE QUESTIONs
are now unanswered, so the narrowing input is still empty and the tally is
counting items rather than attention. That is worth knowing before the tally
is used to pick the S1 domain.

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
