# Terrain map: three domains, breadth before depth

**Decision of 2026-09-14.** Rather than take one domain to the frontier immediately, cover all three broadly and narrow later, as stated: "cover it broadly as of now. as time goes by, we can filter it as my understanding also gets more nuanced." This document is the breadth pass. It is deliberately a map and not the territory: enough of each domain to hold a conversation for five minutes and to know which questions are the expensive ones, which is a different and cheaper thing than the full six-part explainer that agent S3 produces at fifteen to twenty hours of reading.

The narrowing is not left to feeling. The `attention` table in [knowledge-state.md](knowledge-state.md) counts which domains the daily brief items fall into and which of its ONE QUESTION prompts get answered in the scratchpad. When this map is fully delivered, the domain with the most answered questions and the least depth is the candidate for the full explainer. The tally is the input; the choice stays yours.

Each section below carries the same six headings so the three are comparable, and every section ends with **what is missing**, stated rather than smoothed over. Section 1 is written. Sections 2 and 3 carry what is already sourced and name their gaps, and the daily brief serialises the rest at no more than 400 words a weekday.

---

## Contents

- [1. Industrial certification and standards bodies as a business](#1-industrial-certification-and-standards-bodies-as-a-business)
- [2. The robot policy layer](#2-the-robot-policy-layer)
- [3. Datacenter and power buildout](#3-datacenter-and-power-buildout)
- [How this map gets used](#how-this-map-gets-used)

---

## 1. Industrial certification and standards bodies as a business

### The vocabulary

**Conformity assessment** is the act of demonstrating that a product meets a legal requirement. **Self-certification** is the manufacturer doing it alone and signing a declaration. A **notified body** is a private company that a Member State has authorised to perform third-party conformity assessment, and the word "notified" is literal: the state notifies the Commission of it, and the register is called NANDO. A **notifying authority** is the Member State organ that does the notifying. A **national accreditation body** is a separate organisation that attests the candidate meets the competence requirements, which is a different step from being notified. A **module** is a named assessment route: module A is internal production control, module B is EU type-examination, module G is unit verification, module H is full quality assurance. A **harmonised standard** is a technical standard cited in the Official Journal whose application gives a **presumption of conformity**, meaning that following it is legally treated as meeting the requirement. **CE marking** is the manufacturer's claim that the whole process was followed. **Annex I** of the Machinery Regulation is the list of product categories that lose the self-certification option.

### The value chain

```
  standards          accreditation        assessment           the buyer
  writing            layer                layer

  ISO / IEC   ──┐
  CEN/CENELEC ──┼──▶ national         ──▶ notified body   ──▶ machinery
  (committees,   │   accreditation         (TUV SUD NB 0123,      manufacturer
  staffed by     │   body                  TUV Rheinland,         (~98% of the
  member-state   │   (attests              Intertek,              sector is SMEs)
  delegations    │   competence            ICR Polska NB 2703,
  and by         │   against               SGS, Bureau Veritas,
  industry)      │   Art. 30)              DEKRA)
                 │        │
                 │        ▼
                 └──▶ notifying authority ──▶ Commission + other
                      (Member State)           Member States
                                               (objection window)
```

The structurally interesting feature is that the layer which writes the rules and the layer which sells assessment against them are different organisations, but the same companies sit on the committees that write the standards and then sell the service of assessing against them. That is not a scandal, it is how the system is designed to acquire technical competence, and it is the reason a seat on a working group is a commercial asset rather than a civic duty.

### The money

Mid-teens operating margins, not software margins. Bureau Veritas reported FY2025 revenue of EUR 6.5 billion with adjusted operating profit of EUR 1,052.9 million, an adjusted operating margin of 16.3%, up 32 basis points year on year, and its Certification division specifically at 18.2% ([Bureau Veritas, FY 2025 results](https://group.bureauveritas.com/newsroom/sector-leading-organic-revenue-growth-65-fy-2025-strong-margin-improvement-163-fy)). That is the number to hold when anyone describes a certification business as a rating agency in waiting: the incumbents at scale earn roughly one sixth of revenue as operating profit, which is a good industrial business and not a licensing one.

Market size, and the spread is again the finding rather than the number. Four research houses size the 2026 testing, inspection and certification market at USD 254.41 billion ([MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/testing-inspection-certification-market-5352498.html)), USD 275.39 billion ([Astute Analytica](https://www.astuteanalytica.com/industry-report/testing-inspection-certification-tic-market)), USD 280.2 billion, and USD 320.55 billion ([Business Research Insights](https://www.businessresearchinsights.com/market-reports/testing-inspection-and-certification-tic-market-117693)). A 26% spread on a market this mature means the houses disagree about what counts as in scope, so no single figure here should be quoted as the market size. Asia Pacific is put at roughly 38% of it in 2026.

Two pricing facts from the primary text, and they matter more than the market size. Recital 27 of the Regulation states that "in the machinery sector, approximately 98 % of companies are small or medium sized enterprises (SMEs)" and that "it is important that notified bodies consider adapting the fees for conformity assessment and reducing them proportionately to the specific interests and needs of SMEs". Article 25(5) makes it an obligation rather than an aspiration: "Notified bodies shall take into account the specific interests and needs of small and medium sized enterprises when setting the fees for conformity assessment" ([CELEX 32023R1230](http://publications.europa.eu/resource/celex/32023R1230)). So the buyer base is overwhelmingly small, and pricing is unregulated but carries a statutory duty to flex downward for most of the market.

### The constraint

Accredited competence, and it is a people constraint rather than a capital one. The binding text is Article 30(8): "The remuneration of the top-level management and the personnel responsible for carrying out the conformity assessment tasks shall not depend on the number of conformity assessments carried out or on the results of those assessments." That single sentence removes the two levers a normal services business would use to scale, which are paying assessors on volume and paying them on outcome. Growth therefore comes only from hiring and accrediting more qualified assessors, which is slow, and this is the mechanism behind the notified-body capacity shortage that everyone in the sector describes.

Two further requirements shape the cost base. Article 30(9) requires liability insurance "unless liability is assumed by the Member State in accordance with national law". Article 30(10) imposes professional secrecy over everything learned during an assessment, which is what makes a notified body usable by competitors simultaneously and is therefore an asset, not just a compliance cost.

### The live disagreement

Whether the 20 January 2027 date is a real forcing function or a soft one, and credible people read it both ways. The case for real: Machinery Annex I Part A item 5 covers safety components with self-evolving machine-learning behaviour, it removes the self-certification option, and it was confirmed untouched by the Digital Omnibus, since Regulation (EU) 2026/1744 Article 3 amends only Machinery Articles 8, 20 and 47 and does not mention Annex I. The case for soft: no harmonised standards for the AI requirements had been submitted to the Commission as of August 2026, the AI-specific technical content is deferred to a delegated act that "shall apply by 2 August 2028" under the new Machinery Article 8, and the new Article 20(10) lets manufacturers lean on AI Act harmonised standards for presumption of conformity in the interim. What each side must believe: the "real" reading requires that notified bodies will assess against something in January 2027 even without a cited standard, using their own judgment; the "soft" reading requires that enforcement will tolerate a sixteen-month gap between an obligation applying and a method existing.

### The recent history

Everyone in this sector will reference three things without explaining them. The Machinery Directive 2006/42/EC was replaced by a Regulation rather than another Directive, which removed national transposition and is why the date is the same everywhere. TÜV SÜD became the first notified body designated under the new Regulation, as NB 0123, in September 2024 ([TÜV SÜD](https://www.tuvsud.com/en/newsroom/press-releases/2024/september/tuev-sued-becomes-the-worlds-first-notified-body-for-the-new-machinery-regulation)), which is treated as the starting gun for the capacity race. And designation is visibly still in progress two years later: Intertek Deutschland achieved accreditation on 5 December 2025 and said it would report separately on completing designation ([Intertek](https://www.intertek.com/news/2025/intertek-notified-body-accreditation-machinery-regulation-eu-2023-1230/)), and ICR Polska was designated as NB 2703 as recently as 22 August 2026 ([ICR Polska](https://icrpolska.com/en/2026/08/24/17551/)).

The designation mechanics, since the two-step structure is what causes the delay: under Article 33(2) the application goes to the notifying authority with an accreditation certificate from a national accreditation body "where one exists", or under Article 33(3) with full documentary evidence if not. Then under Article 34(5) the body "may perform the activities of a notified body only where no objections are raised by the Commission or the other Member States within two weeks of the validation of the notification where it includes an accreditation certificate, or within two months of the notification where it includes documentary evidence". So the final objection window is two weeks with accreditation and two months without, which means accreditation is the long pole and the notification step is fast.

### What is missing from this section

RESOLVED 2026-09-18, and the method is the finding. The Single Market Compliance Space returns a single-page-application shell to an HTTP client, but it renders and filters normally when loaded in a browser pane. Filtered on notification status Active, the register returns 40 bodies under Regulation (EU) 2023/1230 and 153 under Directive 2006/42/EC, the instrument 2023/1230 replaces on 20 January 2027. So the capacity question described qualitatively above now has a number against it: the new regime has 26.1% of the notified bodies the outgoing one has, 124 days before it applies. The three individual designations named above remain the only ones traced to a company or press source; the counts come from the Commission's own register.

Still not found: any published fee schedule or day rate for a machinery conformity assessment, the utilisation rate or revenue per assessor of a notified body, and the duration of the accreditation step rather than the notification step. Bureau Veritas is used above as the margin reference because it publishes; TÜV SÜD, TÜV Rheinland and DEKRA are structured such that comparable segment margins were not located. No primary document on what a notified body charges has been read, which was the specific gap this section was written to close and which it has only partly closed.

---

## 2. The robot policy layer

### Status

Skeleton. Much of this is already sourced on the board, at [who supplies robot policies](../index.html#board) and in the physical-intelligence review, so the gaps below are the honest remainder rather than the whole.

### What is already sourced

**Vocabulary and value chain** are covered. Two supply layers: vertically integrated operators owning their own stack (Amazon Robotics, Symbotic, Dexterity, Ambi, RightHand, Nimble, Osaro, Mujin, Plus One) and horizontal brain vendors licensing policies into other people's hardware (Physical Intelligence, Skild AI, NVIDIA with open GR00T, Google DeepMind, Figure in-house, Field AI). **The money** is partly covered: Figure ~$39B, Skild ~$14B, Wayve ~$8.6B, Physical Intelligence ~$5.6B, Apptronik ~$5B, Agility ~$1.75–2.1B, RaaS at roughly $32B and 35–40% of commercial robot deployments, performance-based contracts at a typical 95% uptime SLA and $1.5k–8k per unit per month. **The constraint** has a candidate answer: contact-rich manipulation reliability, with Gemini Robotics 2 reported unscrewing a lightbulb at 92% and screwing it back in at 36% with the same model and hand, which locates the blocker in insertion and compliance rather than perception.

### The gaps

Unit economics of a deployment from the operator's side, meaning what a 3PL actually pays per pick and what it displaces, have not been read from a primary document. Nobody's gross margin on a robot deployment is known. The **live disagreement** section is unwritten: the obvious candidate is whether the brain layer or the integration layer captures the margin, and neither side has been stated in its own terms with what it must believe. No 10-K or S-1 in this sector has been read by agent S2, and Symbotic is public, so that is the cheapest available fix.

---

## 3. Datacenter and power buildout

### Status

Scope only. Not researched. Recorded here so the map is honest about its own coverage rather than appearing complete.

### The one thing that is sourced

2026 hyperscaler capital expenditure guided at $725–800 billion across five operators, roughly three times the ~$238 billion of 2024, with 55–60% flowing to NVIDIA. This is company-guided rather than modelled, which makes it the figure with the least estimation risk in the whole landscape.

### What this section must contain when written

The vocabulary of interconnection, meaning the queue, the study process, and what a large-load application actually is. The value chain from turbine and transformer supply through EPC to the operator, with lead times, since the binding constraint is widely asserted to be transformers and turbines rather than chips and that assertion has not been checked here. The money, meaning dollars per megawatt of built capacity and the structure of a power purchase agreement. The constraint, which is the claim to test. The live disagreement, for which the obvious candidate is whether the buildout is demand-led or a capex race that will strand assets. And the recent history everyone references.

---

## How this map gets used

Agent **S0 Terrain** maintains this file. Agent **M1 Daily Editor** serialises it into the brief's FROM THE STOCK SIDE block at no more than 400 words a weekday, in document order, recording progress on the `serialised` line in [knowledge-state.md](knowledge-state.md). When the file is exhausted the section is omitted rather than filled with something new, which is the same rule that kept it empty on 14 September.

Agent **S1 Curriculum** does not fire until a domain is chosen. When it does, it takes one domain from this map and produces a dependency-ordered reading path of fifteen to twenty hours with at least 40% primary material, and agent **S4 Socratic Examiner** then tests whether the reading worked. Breadth is cheap and can be delegated. Depth is expensive and cannot.

---

*Sources retrieved 2026-09-14 and cited inline, except the notified-body counts in section 1, read from the Commission's Single Market Compliance Space register on 2026-09-18. Machinery Regulation text read at primary through the Publications Office CELLAR service using `tools/eurlex.mjs`, because eur-lex.europa.eu returns HTTP 202 with an empty body to non-browser clients. Internal grounding: the physical-intelligence review of 2026-09-03, the supply-chain node map of 2026-09-08, and the IRIS and robotics-market decision document of 2026-09-13.*
