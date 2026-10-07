# Knowledge state

The file every agent reads to answer "what does he already know". Maintained by
M2 Ledger Keeper after each editor run. This is a state file, not a document:
no prose, no commentary, no history beyond what is needed to compute a diff.

Last updated 2026-10-06 by the M1/M2 run. Window 5 to 6 October, plus the
arXiv batch of 3 to 5 October the 10-05 run could not see. Runs have now
published on six consecutive weekdays.

---

## voices

The F6 list. Keep between 8 and 12 names. Read at the person's own venue only.

| person | venue | newest seen | date |
|---|---|---|---|
| Dario Amodei | darioamodei.com, short posts | We Must Pace the Frontier, still newest on 2026-10-06. RESOLVED 2026-10-01, close this line of enquiry: an href scrape returns exactly four `/post/` URLs and two `/essay/` URLs, so the "six titles" counted on 09-30 was posts and essays added together. Four short posts, unchanged since 09-12: on-deepseek-and-export-controls, policy-on-the-ai-exponential, the-urgency-of-interpretability, we-must-pace-the-frontier | 2026-09-12 |
| Dario Amodei | darioamodei.com/essay/ | Two essays, unchanged: Machines of Loving Grace and The Adolescence of Technology, the latter dated "January 2026" on the page. /archive still returns HTTP 404 while appearing in the site navigation | 2026-01 |
| Paul Graham | paulgraham.com/articles.html | Making Startups Powerful, unchanged on 2026-10-06. The stored-title diff WORKS and is now the method: the five titles below it read identically on 10-01, 10-02, 10-05 and 10-06, so the page does not need reading in depth. Order: How Universities Should Prepare Founders, How to Earn a Billion Dollars, How to Convert Between Wealth and Income Tax, The Brand Age, The Shape of the Essay Field | 2026-09 |
| Andrej Karpathy | karpathy.bearblog.dev/blog | newest is Sequoia Ascent 2026 summary, unchanged, re-read 2026-10-06. RETRIEVAL, settled 2026-09-22 and confirmed an eighth time on 10-06: the venue flaps between HTTP 200 and 404 for HTTP clients (200 on 09-17, 404 on 09-15, 09-22, 09-30, 10-01, 10-02, 10-05 and 10-06) and renders reliably in a browser pane. Read it there and do not record the 404 as a venue outage or as a DIFF | 2026-04-30 |
| Andrej Karpathy | karpathy.github.io | newest is microgpt, 12 Feb 2026, unchanged, re-read 2026-10-06 | 2026-02-12 |

Slots open: 8. Candidates not yet added, decide before adding: Chelsea Finn,
Dorsa Sadigh, Ben Thompson, Dylan Patel, Jack Clark, Cedric Chin.

---

## instruments

The F3 watchlist. Carry every row forward every run.

| instrument | state as of 2026-10-06 | next date |
|---|---|---|
| EPA Carbon Pollution Standards for fossil fuel-fired EGUs, 40 CFR Part 60 | partial repeal final rule published 2026-09-17; repeals the CCS-based Phase 2 standards for new base load stationary combustion turbines; rule text names AI datacenter load as driving a "nearly 2.6-fold increase in projected growth rates"; a concurrent supplemental proposal seeks comment on rescinding all GHG requirements for EGUs | effective 2026-11-16 |
| EU harmonised-standard citations, Commission throughput | **MOVED 2026-10-02.** Implementing Decision (EU) 2026/2211, published 2026-10-02, amends Implementing Decision (EU) 2025/165 under the Pressure Equipment Directive 2014/68/EU: it inserts 19 references (EN 10253-2:2021+A1:2025, EN 12392:2025, EN 12953-2:2025, EN 12953-6:2024, EN 12953-9:2024, EN ISO 17779:2025, EN ISO 24664:2024, EN ISO 13585:2024, EN 14129:2024, EN 14222:2021+A1:2025, EN 14585:2024, EN 14917:2021+A1:2026, EN ISO 15493:2003/A11:2025, EN ISO 15613:2025, EN ISO 15614-5:2024, EN ISO 15614-11:2025, EN ISO 21009-2:2024, EN ISO 21922:2021/A1:2024, EN 14071:2024, EN ISO 14732:2025) and deletes 18 superseded rows. TWO FINDINGS WORTH CARRYING, both usable against the machinery question. First, the transition the Commission grants when a harmonised standard is merely revised: Article 2 provides "Point 1 of the Annex to this Decision shall apply from 2 April 2028", 18 months after publication, "In order to give manufacturers sufficient time to adapt their products to the revised versions of harmonised standards". Second, the Commission will cite a standard it has judged defective: EN 12953-6:2024 "satisfies several requirements which it aims to cover, but contains technical shortcomings as regards the requirements for the method of operation of pressure equipment, the exceeding of allowable limits, the design and construction of safety accessories and the protection from the risk of overheating. It is therefore appropriate to publish the reference of this standard in the Official Journal of the European Union with a corresponding restriction." Prior state, carried: Implementing Decision (EU) 2026/2048, published 2026-09-16, cited EN 18060:2025 under the Batteries Regulation 2023/1542. Neither is machinery; both are evidence the citation machinery is running and now evidence of the grace period it grants | 2028-04-02 |
| Machinery Regulation (EU) 2023/1230 | applies 2027-01-20; Annex I Part A item 5 confirmed untouched by the Digital Omnibus | 2027-01-20 |
| Reg (EU) 2026/1744, Digital Omnibus on AI | in force 2026-07-27; moved 2023/1230 from AI Act Annex I Section A to Section B point 21. **MOVED 2026-09-29**, corrigendum `32026R1744R(01)`, OJ ref 2026/90810, German only. It replaces one word in Article 1 point 8, page 18, which inserts AI Act Article 6(1b): "Unbeschadet des Absatzes 1a" becomes "Ungeachtet des Absatzes 1a". English 1b reads "Notwithstanding paragraph 1a, AI systems the failure or malfunctioning of which would endanger health and safety shall qualify as safety components." Verified this run: the English text contains "Notwithstanding" exactly once (at 1b) and "Without prejudice" 21 times; the published German contained "Unbeschadet" 11 times including at 1b and "Ungeachtet" zero times. So the German rendering of the overriding clause matched the Regulation's own rendering of "without prejudice to" for 67 days. NEW TO THE BOARD, and the more consequential half: Article 1 point 8 also inserts 6(1a), "AI systems that are solely used for non-safety related aspects of user assistance, performance optimisation, service efficiency, automation or convenience or quality control shall not qualify as safety components", and 6(1c), excluding a product that needs third-party assessment "solely due to risks other than risks to health and safety, in particular risks relating to the distribution of radio spectrum or electromagnetic interference". Recital 7 states the amended Art. 3(14) definition exists because the old one "risks extending the high-risk classification of AI systems beyond what is justified". RETRIEVAL: `tools/eurlex.mjs get` and the CELLAR REST route both 404 on the corrigendum CELEX and on its ELI; it was retrieved by SPARQL for the expression URI then fetching `http://publications.europa.eu/resource/cellar/1d32c7c2-bb9e-11f1-81de-01aa75ed71a1.0001`. NEW TO THE BOARD 2026-10-02, and this board had carried the Omnibus for 70 days without it: Article 1 point 22(a) also deferred the AI regulatory sandboxes by a year. AI Act Article 57(1) as published read "which shall be operational by 2 August 2026"; the Omnibus replaces that subparagraph so it reads "which shall be operational by 2 August 2027". Both texts were grepped out of the retrieved CELEX on 2026-10-02. Consequence, and it is this system's own arithmetic: the EU's own supervised pre-market AI testing venues need not exist until 194 days after the Machinery Regulation applies on 2027-01-20. Surfaced by arXiv 2610.01539, which derives "11 architectural and governance requirements" for AIRS testing infrastructure and ships an open-source Configurator that "contributed to an official Exit Report" in a live engagement, which is the commons argument appearing on the regulator's own side | 2028-08-02 |
| Machinery Art. 8 delegated acts, AI health and safety into Annex III | not adopted; Art. 3(1) of the Omnibus sets "shall apply by 2 August 2028" | 2028-08-02 |
| Machinery Art. 20(10) | added by the Omnibus; AI Act harmonised standards give presumption of conformity in the interim | when Machinery AI hStds are cited |
| CEN/CENELEC AI harmonised standards for machinery | none submitted to the Commission as of Aug 2026 (secondary: IBF Solutions) | unknown |
| prEN 50742, protection against corruption | no ballot result published as of 2026-09-18. CORRECTION, do not re-read this as movement: the IBF sentence "Following a positive final vote in September, publication is scheduled for November 2026" sits on a page last updated 2026-07-31 and is prospective. standards.cencenelec.eu returned HTTP 500 again on 2026-09-22, a fourth consecutive run. ESCALATION EXHAUSTED: the browser pane also returns HTTP 500, so this is a server-side outage and not the browser-pane pattern. A nen.nl mirror was tried and 404ed. NOT RETRIED on 2026-09-30, per that decision, and the row is now **DORMANT**: stop spending a collector slot on it each run. Re-open it only on a different national mirror (candidates not yet tried: din.de, afnor.org, une.org, uni.com) or on a CEN/CENELEC announcement reached some other way. The prospective IBF sentence about a November 2026 publication remains prospective and is not evidence | 2026-11, dormant |
| ~800 carried-over Machinery Directive hStds | first citations expected Q3 2026 | Q3 2026 |
| ISO 25785-1, humanoid safety | **ISO/CD 25785-1**, unchanged at stage 30.60 on 2026-10-05, a fourth consecutive reading. Full official title, read at source: "Robotics — Safety requirements for dynamically stable industrial mobile robots (legged, wheeled, or other forms of locomotion) — Part 1: Robots". Committee Draft, stage 30.60 "Close of comment period", ISO/TC 299, first read 2026-09-18. Scope: "safety requirements for industrial mobile robots with actively controlled stability". Part 2, on integration, to be developed separately. NEW on 2026-09-30, the exclusions read at source: the document excludes "robots whose travel speed and travel direction is solely under control of a driver or an operator (e.g., human remote control, human continuous local control)", and also excludes ridden robots, worn robots such as exoskeletons, road vehicles, airborne and underwater robots, floor-cleaning robots and non-industrial environments. This is the exact complement of the FDA RASD scope below, which covers only teleoperated systems. The page carries no date for the stage, so this is a state reading and not a dated movement | unknown |
| NHTSA post-AV-STEP exemption regime | AV STEP withdrawn 2026-06-26; case-by-case exemptions | none stated |
| ISO 10218-1/-2:2025, ANSI/A3 R15.06-2025, UL 3300 | in force; UL 3300 on OSHA NRTL list 2025-12-31 | none stated |
| BIS advanced computing licence policy | case-by-case review; TPP < 21,000 and DRAM bw < 6,500 GB/s; independent third-party performance testing required | none stated |
| FMCSA broker bond and double-brokering penalties | $150k bond; penalties $50k | none stated |
| EAC ESTEP, Election Supporting Technology Evaluation Program | voluntary; Application for Testing form published 2026-09-15; agency sizes it at 9 submissions/yr, 1,296 hours, $101,217.60 | comment period per FR notice |
| ISO 25785-1, retrieval | RESOLVED 2026-09-18 by loading iso.org in a browser pane; curl still returns HTTP 403. Also corrected: catalogue ID 89619, retried on prior runs, is ISO/FDIS 25256 on road sweepers. The correct record is iso.org/standard/91469.html | n/a |
| Notified bodies designated under Reg (EU) 2023/1230 | **41 active, against 153 under Directive 2006/42/EC**, re-read 2026-09-30 with notification status Active. The Regulation line is unchanged from 09-22. The Directive line went 153 (09-18) to 152 (09-22) to 153 (09-30), so it has now moved twice and returned to its starting value; treat single-unit moves on that line as noise unless a name changes with them. Ratio 26.8%, against 27.0% on 09-22 and 26.1% on 09-18, 112 days before the Regulation applies. The complete 41-name list was captured on 09-30 across two pages with no overlap and is stored below, replacing the incomplete 37 from 09-22. RE-READ 2026-10-05: both counters unchanged, 41 and 153, ratio 26.8%, 107 days before the Regulation applies. The name capture FAILED this run and the failure mode is now documented: the two pages returned 30 and 11 rows with 4 duplicated between them, so only 37 distinct names were seen. All 37 are in the stored list; the 4 not seen are NB 0408, NB 0556, NB 1411 and NB 2981. This is pagination instability, the same artefact that produced the incomplete 09-22 list, so the count stands and the name diff for 2026-10-05 is INCONCLUSIVE rather than four removals. METHOD CORRECTION, carry this forward: setting the legislation select value programmatically and dispatching input/change does NOT reach the application's own model and leaves the count at 1566. It must be done as real clicks in the browser pane, which requires a non-zero viewport, so call resize_window first. The legislation option value for Regulation (EU) 2023/1230 is 162400 and for Directive 2006/42/EC is 131881, read off the hidden select whose option labels are rendered in a separate overlay; those IDs are stored so a later run can skip the dropdown archaeology. Paging to 2 works with a JS click on the paginator | 2027-01-20 |
| NANDO / Single Market Compliance Space, retrieval | RESOLVED 2026-09-18. The register renders and filters in a browser pane; it returns an application shell to HTTP clients. Filter path: Legislation dropdown, then Refine results | n/a |
| Reg (EU) 2026/2108, Union Customs Code recast | NEW, published 2026-09-19, in force 2026-09-20, applies 2027-09-21 (Art. 287(2)) with staged provisions to 2028-07-01. Art. 27(2) binds the importer to ensure goods "comply with relevant other legislation applied by the customs authorities and provide or make available and keep appropriate records of such compliance"; only one importer at a time; the importer "shall be established in the customs territory of the Union". Buried: "The release of the goods shall not be considered to be proof of conformity." Links customs to Reg (EU) 2019/1020 market surveillance and the EU Product Compliance Network | 2027-09-21 |
| FDA draft guidance, Robotically-Assisted Surgical Devices, Premarket Submissions | NEW, published 2026-09-25, Docket FDA-2026-N-9505, FR Doc 2026-19704, guidance document number GUI01500081. Provides "draft recommendations regarding non-clinical and clinical testing and premarket submission content for RASDs". Creates no binding obligation: "This draft guidance is not final nor is it for implementation at this time" and it "does not establish any rights for any person and is not binding on FDA or the public". THE SCOPE IS THE FINDING: RASDs are defined as "teleoperated, software-controlled systems that integrate robotic technologies and subassemblies that are designed to assist qualified practitioners in precisely positioning and controlling multiple surgical instruments", so a learned autonomous surgical policy is outside this document. Read against ISO/CD 25785-1, which excludes teleoperated robots, the two instruments are exact complements and neither covers an autonomous policy in a clinical setting. Fifth instance of the pattern already on the board, a US regulator addressing robots without creating a third-party regime | comments close 2026-11-24 |
| Dir (EU) 2024/2853, Product Liability Directive | NEW to the watchlist 2026-10-01, added because it is the liability counterpart to certification and a corrigendum in window surfaced it. Corrigendum `32024L2853R(02)`, OJ ref 2026/90830, published 2026-09-29, **Dutch only**: "In de gehele richtlijn worden de woorden 'gratis en opensourcesoftware' vervangen door de woorden 'vrije en opensourcesoftware'." That replaces a free-of-charge reading with a libre one throughout the Dutch version, 680 days after publication on 2024-11-18. Not promoted to MOVES: changes no tracked number. Carried so a later run diffs the FOSS carve-out, which bears on the commons argument against assurance-seam | not read in full; transposition deadline not yet checked |
| NIST / NIBIB medical metrology and standards RFI | NEW, published 2026-09-18. Asks for "Suggested changes to the medical metrology and standards process to allow improved and cost-effective healthcare in a time of rapidly changing technology and incorporation of AI". Creates no obligation. Symposium 2026-09-24 | comment period per FR notice |
| AI Act Art. 57, AI regulatory sandboxes | NEW to the watchlist 2026-10-02. Member States must have at least one national AI regulatory sandbox operational by 2027-08-02, deferred one year from the originally published 2026-08-02 by Reg (EU) 2026/1744 Art. 1 point 22(a). These are supervised pre-market testing environments under AI Act Chapter VI, not conformity assessment bodies, so this is not a notified-body count. 194 days after the Machinery Regulation applies, on this system's arithmetic. The Commission must also adopt implementing acts specifying "the detailed arrangements for the establishment, development, implementation, operation, governance, and supervision of the AI regulatory sandboxes", with a new point (d) added by the Omnibus on data protection authority involvement. No such implementing act has been looked for yet and that is the next thing to check on this row | 2027-08-02 |
| EO 14434, Inaugurating the Era of Super Intelligence | NEW 2026-10-02. Signed 2026-09-29, published 2026-10-02, FR Doc 2026-20321, Pages 63129-63130. Policy that "to the maximum extent permitted by law, the executive branch shall use the terms ``Super Intelligence'' and ``SI'' in place of ``Artificial Intelligence'' and ``AI'' and will not acknowledge the usage of ``Artificial Intelligence'' and ``AI'' in any applicable setting". Sec. 2(b): "Nothing in this section requires the alteration of previously issued regulations, Presidential actions, contracts, grants, or other historical documents." Sec. 3(a) pins the meaning to the existing statute: the terms "mean the technologies and systems encompassed by the term ``artificial intelligence'' as defined in section 9401(3) of title 15, United States Code. This definition shall govern the implementation of this order unless and until superseded by subsequent Presidential action consistent with applicable law or by an Act of Congress." Sec. 3(b) creates the only date: within 60 days, so by 2026-11-28, the Assistant to the President for Science and Technology shall submit proposed legislative language including "an assessment of whether, and to what extent, the definition of ``Super Intelligence'' and ``SI'' should modify, expand upon, or otherwise supersede the existing statutory definition of ``artificial intelligence''". Buried: none, no testing, certification or attestation obligation. WHY IT IS ON THE BOARD RATHER THAN NOISE: every federal instrument keyed to 15 U.S.C. 9401(3) moves if that definition is superseded, and the order commissions the assessment of whether to supersede it. Sixth instance of the pattern already on the board, a US federal action addressing AI without creating a third-party regime | 2026-11-28 |
| AI Act Art. 50(2), machine-readable marking of synthetic content | **NEW to the watchlist 2026-10-05.** Applied since 2026-08-02 under Art. 113, which sets the general application date and does not except Chapter IV. Operative sentence, read at source: "Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, shall ensure that the outputs of the AI system are marked in a machine-readable format and detectable as artificially generated or manipulated. Providers shall ensure their technical solutions are effective, interoperable, robust and reliable as far as this is technically feasible, taking into account the specificities and limitations of various types of content, the costs of implementation and the generally acknowledged state of the art, as may be reflected in relevant technical standards." THE FINDING IS WHAT THE TEXT DOES NOT SAY: it requires the output to be detectable and does not say by whom, and names no verifier, no register and no third party. First compliance act logged 2026-10-05, 64 days after the obligation applied, and it tests the clause in both directions at once. OpenAI shipped textGrain text watermarking: opt-in for API customers globally and "off by default in the API", an invisible watermark to eligible ChatGPT and Codex output "in the European Union" only and explicitly not a global default, and detector access "initially limited to approved researchers and expert organizations" on a case-by-case basis "In accordance with the Code of Practice", with "we are not making it publicly available at launch". It also published figures against the Regulation's own robustness standard: at a 1% target false positive rate the detector found watermarks in about 80% of 200-token passages against about 95% of 400-token passages for content such as psychology and "substantially lower" for mathematics, and on 400-token passages replacing 10% of words with synonyms cut detection from about 92% to 66% while replacing 25% cut it to 17%. Its own stated limits: "A watermark does not measure human contribution", "A watermark does not establish ownership or responsibility", "The absence of a detected watermark does not prove human authorship". No quality cost reported across eight benchmarks. OpenAI says it plans to make textGrain open source, which is the commons argument appearing on the marking side. NEXT ON THIS ROW: whether the Code of Practice, or any harmonised standard cited under Art. 50, says who must be able to run the detector. Nothing has been looked for yet | detector access case-by-case, no date |
| SEC Rule 501(a)(10), professional credentials as a regulatory qualification | **NEW to the watchlist 2026-10-05**, added because it is the only instrument on this board that writes down what makes a credential count. Five notices published 2026-10-05, including Release No. 33-11445, File No. 4-931, comments close 2026-12-04: the Commission is considering designating the US CPA licence, the CFA charter, the CFP certification, the Series 79 and Series 86/87 licences, and passage of an accredited investor exam "to be developed by the Financial Industry Regulatory Authority, Inc.", as qualifying natural persons for accredited investor status. THE OPERATIVE PART IS THE FOUR-ATTRIBUTE TEST, verbatim: the credential "arises out of an examination or series of examinations administered by a self-regulatory organization or other industry body or is issued by an accredited educational institution"; the examination "is designed to reliably and validly demonstrate an individual's comprehension and sophistication in the areas of securities and investing"; holders "can reasonably be expected to have sufficient knowledge and experience in financial and business matters to evaluate the merits and risks of a prospective investment"; and "An indication that an individual holds the certification or designation is either made publicly available by the relevant self-regulatory organization or other industry body or is otherwise independently verifiable". That fourth attribute, 501(a)(10)(iv), is independent verifiability as a condition of the credential having legal effect, which is the assurance seam's structural claim stated by a regulator in a rule in force since 2020. Exam design as described: modelled on the SIE Exam, about 75 multiple-choice questions in a 65 to 85 range, two hours, English, passing score set by "standard setting" with "a committee of subject matter experts", anticipated fee "similar to the SIE Exam fee, which is currently $100", valid ten years with no anticipated waivers, open to anyone 18 or older, retake after 30 days and after 180 days following three failures in two years, FINRA creates and administers "with delivery by a third-party vendor", and a verification process so "issuers or others would be able to independently verify the status of Exam Holders". Prior state: 3 licences designated at adoption on 2020-08-26, Series 7, Series 82 and Series 65, with nothing added in over five years. Scale of the exemption a credential unlocks: "Approximately $400 billion was raised in Regulation D offerings (excluding pooled funds) between July 1, 2024 and June 30, 2025" | comments close 2026-12-04 |
| Dir 2011/92/EU, Environmental Impact Assessment, Annex II screening list | **NEW to the watchlist 2026-10-05**, added on the datacenter and power axis because Annex II is the list of projects a Member State must screen. Corrigendum `32011L0092R(07)`, OJ ref 2026/90841, published 2026-10-05, **Danish only**, 5,364 days after the OJ of 28 January 2012. It replaces Annex II point 10(b) "Anlaegsarbejder i byzoner, herunder opforelse af butikscentre og parkeringsanlaeg" with "Byudviklingsprojekter, herunder opforelse af butikscentre og parkeringsanlaeg", which is construction works in urban areas becoming urban development projects, and point 10(f) "Anlaeg af vandveje" with "Anlaeg af indre vandveje" while "regulering af vandlob" becomes "anlaeg til beskyttelse mod oversvommelse". Buried: none, it creates no new obligation and widens the category that triggers one. Not read in full and the transposition consequence in Denmark has not been checked | not checked |
| Reg (EU) 2026/1738, vehicle circularity and end-of-life vehicles | NEW 2026-10-05, carried not promoted. Corrigendum `32026R1738R(01)`, OJ ref 2026/90839, published 2026-10-05, **Italian only**, 73 days after the OJ of 24 July 2026. Annex VIII Part G point 2(d): "separazione pneumatica" becomes "separazione ad aria", pneumatic separation becoming air separation, in the treatment of the heavy shredder fraction. Changes no tracked number. On the board only because the Regulation amends Reg (EU) 2019/1020 on market surveillance, which this board tracks through the Customs Code recast, and because it is one of the four in the pattern below | 2027 staged |
| Reg (EU) 2022/2065, Digital Services Act, Art. 33 and 37 | **NEW to the watchlist 2026-10-06**, added because it is the only instrument on this board that makes a named frontier-lab product buy a recurring independent audit by law. Notice C/2026/5181, published 2026-10-06, is the Art. 33(4) list of designated very large online platforms and search engines. ChatGPT appears as a **Very large online search engine, designation decision 31 August 2026**; also newly carried against the 25 April 2023 originals are Reddit and Roblox (both 31 August 2026) and WhatsApp (26 January 2026). Operative, read at source in CELEX 32022R2065: Art. 37(1) "Providers of very large online platforms and of very large online search engines shall be subject, at their own expense and at least once a year, to independent audits to assess compliance with the following: (a) the obligations set out in Chapter III". Buried, and the reason this is on the board: Art. 37(3)(a) sets statutory independence, barring an organisation that has "provided non-audit services related to the matters audited ... in the 12 months' period before the beginning of the audit", committed to not providing them for 12 months after, or that has audited the same provider "during a period longer than 10 consecutive years". Art. 33(6): obligations apply "from four months after the notification to the provider concerned", so ChatGPT's audit obligation falls about 2026-12-31 on the designation-decision date; the notification date the clause actually runs from is not published, and that bound is stated in the brief. RETRIEVAL NOTE: no notice matching "Very large online" appears in the OJ between 2026-08-01 and 2026-10-05, so this is the first OJ list carrying ChatGPT within that window | audit obligation ~2026-12-31 |
| FDA 510(k) exemption, class II clinical toxicology test systems | **NEW 2026-10-06**, and it is the weakening counterpart to every mandated-attestation row above. Final amendment and final order, FR Doc 2026-20448, published 2026-10-06, immediately in effect. Amends 14 classification regulations (21 CFR 862.3100(b), .3150(b), .3170(b), .3250(b), .3270(b), .3580(b), .3610(b), .3620(b), .3630(b), .3640(b), .3650(b), .3700(b), .3870(b), .3910(b)). Operative: "In this order, FDA is removing the exception to the 510(k) exemption for devices intended for Federal drug testing programs." Stated effect: it "will decrease regulatory burdens on the medical device industry and will eliminate private costs and expenditures required to comply with certain Federal regulations". Approximately 70 commenters on the May 2026 notice (91 FR 23427). The exemption remains subject to the general limitations of 21 CFR 862.9 and to the labelling condition that the device "is intended solely for use in employment and insurance testing". THE DIRECTION IS THE FINDING: the consumer of the test result here is the federal government, and the premarket check was removed anyway | in effect 2026-10-06 |
| Implementing Reg (EU) 2024/2215, F-gas certification of natural and legal persons | **NEW 2026-10-06.** Corrected by Implementing Regulation (EU) 2026/2214 of 5 October, published 2026-10-06, in force 2026-10-26, 757 days after the original OJ of 2024-09-09. On the board because 2024/2215 sets "minimum requirements for the issuance of certificates to natural and legal persons and the conditions for the mutual recognition of such certificates", which is the credential thread the Anthropic and SEC rows carry. Errors corrected in the Hungarian, Lithuanian and Polish versions, in Art. 3(3)(a) "as regards the responsibility for the correct execution of the activity" and across the Annex I point 4 examination table at rows 1.00, 1.02, 6.02, 6.06, 7.03, 7.07, 8.03 and 8.08, "as regards the required understanding of legislation", "as regards the required understanding of refrigerants", "as regards the type of the equipment" and "as regards the checks during operation of the equipment". Each recital states the error "affects the substance". Art. 1 reads "(Does not concern the English language.)" THE INSTRUMENT CHOICE IS THE FINDING, see the corrigendum-pattern row below: this is an amending Regulation with a prospective 20-day entry into force, not a retroactive OJ corrigendum | in force 2026-10-26 |
| NHTSA, Assessment of Contextual Driver Monitoring Systems | NEW 2026-10-06, carried not promoted. FR Doc 2026-20394, OMB submission under the PRA, comments close 2026-11-05, new OMB control number, three-year approval requested. A "single, one-time experimental research study" to "develop and evaluate a prototype contextual DMS, which fuses data gathered from driver attention (e.g., gaze location), physiological state (e.g., heart rate variability), vehicle kinematics (e.g., lateral lane position) and environmental sensors". 48 participants recruited from 204 contacted, four ten-minute simulator drives each, one safety-critical scenario last and never counterbalanced, contractor Westat, 134 total burden hours, $120 honorarium for two hours. Creates no obligation. On the board because it prices the federal evidence base for a monitoring system against this board's own stored figure of ~390 rollouts per arm to resolve 10pp at p=0.5: 48 participants across two DMS conditions is 24 per arm | comment period per FR notice |
| corrigendum pattern, cross-instrument | **PATTERN, stated once on 2026-10-05 so later runs stop rediscovering it.** Four single-language corrigenda across three runs, each changing an operative word in exactly one language version, at 67, 73, 680 and 5,364 days after publication: German on Reg (EU) 2026/1744 Art. 6(1b), the override clause (09-29); Italian on Reg (EU) 2026/1738 Annex VIII (10-05); Dutch on Dir (EU) 2024/2853, the FOSS carve-out (09-29); Danish on Dir 2011/92/EU Annex II, the screening list (10-05). THE QUESTION THE PATTERN POINTS AT, and nothing on this board tests it: whether a manufacturer who relied on the uncorrected national text for 67, 680 or 5,364 days had a defence. RETRIEVAL, settled: `tools/eurlex.mjs get` and the CELEX REST route both 404 on every `R(nn)` CELEX. The route that works on all of them is SPARQL for the expression URI on `cdm:resource_legal_id_celex`, then a CELLAR fetch of `<uuid>.0001` with `Accept: application/xhtml+xml`. Make that the default for corrigenda rather than retrying `get` | ongoing. **DEVELOPED 2026-10-06, and this is the first movement on the pattern rather than a fifth instance.** Implementing Regulation (EU) 2026/2214 corrects three language versions of a certification Regulation using an amending act with a stated entry into force 20 days out, not a corrigendum, and each recital gives the reason: the error "affects the substance". So the Commission's own practice distinguishes the two cases. A corrigendum is used where the correction is treated as always having been the text; a Regulation is used where it is not. That is the instrument-side answer to the reliance question, and it is not the same as a court having decided it |

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
| credentialed technical competence, first price tracked | Anthropic Claude Frontier Academy, USD 100,000,000 commitment to train 10,000 Frontier Deployed Engineers "by the end of 2027", so USD 10,000 a head on this system's arithmetic. Vendor sets the syllabus, grades the practical and issues the badge. Two gates: a Claude Resident Engineer badge after a multi-day in-person program finishing "with a graded practical on a new scenario", then a 12-week residency and a second assessment for the Claude Frontier Deployed Engineer badge, "with the first expected in early 2027". First cohorts named: Accenture, Bain, Capgemini, Commonwealth Bank of Australia, Deloitte, McKinsey, Morgan Stanley, Novo Nordisk. Cohorts in San Francisco, New York and London. Participation "is by nomination"  SECOND PRICE POINT, added 2026-10-05, and it is two orders of magnitude below: the SEC is considering designating passage of a FINRA-built accredited investor exam as qualifying for accredited investor status, at an anticipated fee "similar to the SIE Exam fee, which is currently $100", open to anyone 18 or older, valid ten years, with a public process so "issuers or others would be able to independently verify the status of Exam Holders". So the vendor-graded badge is 100x the SRO-examined one on this system's arithmetic, and only the cheaper one is independently verifiable, which is the property Rule 501(a)(10)(iv) makes a condition of the credential counting at all.| 2026-10-02 | company release |
| optical interconnect for AI scale-up, first round tracked | CScale, Palo Alto. Announced 2026-09-30 as "$145 million in Series C funding", total funding "$188 million", led by Atreides Management with Valor Equity Partners and Premji Invest co-leading, Sutter Hill Ventures and Maverick Silicon continuing, "NVIDIA and Intel Capital joined as CScale's first strategic investors". The Form D filed 2026-10-01 reports totalOfferingAmount 194999885, totalAmountSold 144999891 and totalRemaining 49999994, so the authorised offering is $50m larger than the announced round. Atreides and Valor also co-led Crusoe's $3.9B Series F tracked on 2026-09-17 | 2026-10-02 | company release and SEC Form D |
| GPU cloud round, recorded out of window | GMI Cloud, "$223 million in equity for Series B" plus a "$445 million credit facility led by CTBC", Series B led by ARCHIV with NVIDIA participating and DSC Investment, Trend Micro, KB Investment, Kyobo Life and KT Corporation named; no valuation stated. Contracted ARR "more than 9x its year-end 2025 level", live ARR "more than 4.5x", inference platform processing "approximately 4 trillion tokens per week", all the company's own figures. RECORDED, NOT REPORTED: the PR Newswire release is timestamped 1 October 2026, 09:05 CST, which is inside the window the 2026-10-02 brief covered and outside the 2026-10-05 window, so it is a miss by that run rather than news. It moves no tracked line: the largest AI-infrastructure round tracked remains Crusoe at $3.9B | 2026-10-05 | company release via PR Newswire |
| surgical robotics round, first tracked | Virtual Incision Corp, Lincoln, Nebraska, formerly Nebraska Surgical Solutions Inc. New Form D (isAmendment false) accepted 2026-10-05 16:10:04, signature date 2026-10-02: totalOfferingAmount 80,140,041, totalAmountSold 35,140,060, totalRemaining 44,999,981, Rule 506(b), minimum investment 0, revenue range "Decline to Disclose", industry self-reported as Biotechnology. A Form D names no lead and no valuation. Company describes itself as "on a mission to miniaturize robotic surgery". Filed 11 days after the FDA RASD draft guidance of 2026-09-25 already on the watchlist | 2026-10-06 | SEC Form D and company site |
| hiring-intelligence round, recorded not reported | Metaview Technologies Inc., Form D of 2026-10-05, totalOfferingAmount 59,999,954, totalAmountSold 59,999,954, fully sold, industry self-reported "Other Technology". Dropped from MOVES on the sector test, not the floor: no tracked sector match and no company release located in window. Recorded so a later run diffs rather than rediscovers | 2026-10-06 | SEC Form D |
| robotics SPV, recorded not reported | NV Pillbot Series A-2 Partners LLC, Form D of 2026-10-05, 13,359,060 fully sold, industryGroupType "Pooled Investment Fund". Evidences a Series A-2 in Pillbot without stating the company-level round size, so it does not move the largest-round lines | 2026-10-06 | SEC Form D |
| robotics-sector round, largest tracked | D-Robotics, US$400M Series C. Primary release names no investor, only "a leading global internet company, alongside with top-tier investment institutions"; no valuation. Cumulative Sunrise chip shipments "exceeded 8 million units" | 2026-09-17 | company release |

---

## theses

| id | claim | state | kill test | last moved |
|---|---|---|---|---|
| assurance-seam | A neutral party that can state with validity what a learned policy does becomes structurally necessary | **contested** | Does any buyer pay for third-party attestation rather than open-sourcing the tool or using its own telemetry | 2026-10-06, and the kill test is now answered yes for a platform and no for a physical product on the same day |
| assurance-seam, surviving form | Production telemetry cannot establish whether an OTA update is a regression, because the previous policy cannot be run counterfactually without surrendering throughput | **contested, and the kill test may have fired** | Show one buyer paying for paired non-regression testing | 2026-10-05 |
| twin-certification | Nobody certifies the twin; SRCC-style validity claims are the sellable product | live | Show NVIDIA or Lightwheel successfully self-certifying, or a notified body accepting vendor sim evidence unaudited | 2026-10-05 |
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

Added 2026-10-02. One supporting, one weakening, and the weakening side is
ahead on the hardware question for a fourth consecutive run.

Supporting: arXiv 2610.00993 prices the gate, which almost nothing on this
board does. Treating a model release gate as a design problem rather than a
checklist: "In one configuration, a 99 percent target needs 8 independent
tests, but 74 tests at a latent correlation of 0.3 and 5,182 at 0.5, where the
gate keeps fewer than one good model in ten." It proves that "when both classes
share the same latent correlation, a stricter gate always raises reliability, so
the gate that keeps the most good models is the most lenient one that still
meets the target", and that under pass-all gating "the share of good models kept
tends to zero as the suite grows". Direction: supports, because it makes "it
passed the suite" an unsupported reliability claim and relocates the competence
from running tests to designing and certifying the gate, which is an
examiner-shaped skill. Bound: a two-class latent-factor model, no robot
policies, and the validation procedure built "on exact binomial bounds" is
published free, which is the commons argument running again.

Weakening: arXiv 2610.01751, Evidence-Gated Research, states the surviving
form's control point explicitly and then hands it to the developer. It
"identify model replacement as a distinct statistical control point in adaptive
model development", reports that in a 5,000-trajectory closed-loop benchmark
"development-only e-LOND attains persistent FDR 0.621, whereas no persistent
false-adoption path is observed for the audited EGR variants in that finite
run", and in "matched replay over 600 challenger-incumbent pairs, Stagewise EGR
preserves fixed-anytime alternative crossing decisions while using 56.1% less
decision evidence at the representative threshold". So the ungated adoption path
is wrong most of the time and the fix is cheaper evidence run by the party doing
the replacing. Same shape as the 30 September quadruped gate (2609.39755): for
the fourth consecutive run the strongest item against the surviving form is a
developer-run gate, not an absence of gating.

Carried, read and not promoted, each changing no tracked number. arXiv
2610.01348 audits a modular agent claim by claim rather than by score, finds
"the runtime verifier can be bypassed with no visible change in outcomes", and
records each conclusion with "one of four verdicts (supported, unsupported,
unresolved or not evaluated) and the boundary within which it holds";
supporting in structure, synthetic market. arXiv 2610.01138 reproduces the
Hearsay external-log result in a different setting: "A separate full-state
journal audit exactly replays 156 checkpoints and rejects 1,332 constructed
corruptions with a retained terminal anchor." arXiv 2610.01073 shows a stale
score preserving an unsafe program: after a new authorization dependency
invalidates earlier optimizations, "historical scores preserve the same unsafe
programs in 22 of 48 framework histories despite a correct alternative in every
affected archive", which is the stored-data-rescored limitation of every gate on
this board stated from the failure side. arXiv 2610.00917 is the
harness-as-confound result in a new domain: model rankings reverse across agent
harnesses, Claude leading GPT by 7.94 points in OpenHands and trailing it by
30.16 in PI, and "A model's own vendor harness is not reliably its best"; same
shape as the 29 September benchmark audit (2609.37771). arXiv 2610.01349 PACE
distinguishes "the certified execution contract from the evaluated
configuration". arXiv 2610.01535 sizes selection bias in safety-routing
benchmarks under distribution shift.

NEW AND BEARING ON THE OPEN DECISION, added 2026-10-02: arXiv 2610.01626 is the
first item this board holds on whether open-loop replay could serve as the
counterfactual the surviving form says is unavailable. It injects a small action
error at each state and measures propagation under two regimes, "open-loop,
where the rest of the chunk is replayed without replanning, and closed-loop,
where the policy replans after the perturbation". Across twelve manipulation
tasks from three benchmark suites, "confidently stable states are rare, while
error amplification is common among states whose propagation rate can be
resolved", the measured rate "depends strongly on the fitting horizon", and
"replanning rarely turns open-loop amplification into confident contraction". A
state's open-loop regime "can be recovered from camera frames and proprioception
alone" while closed-loop propagation is "only partially recoverable". Reading,
and it is the one the open decision needs: replaying a recorded action chunk is
not a valid counterfactual for a changed policy, because the quantity that
decides the outcome is how the policy reacts after the deviation and that is the
part the replay does not contain. That is an argument FOR stating the thesis as
non-replayability of contact under a changed action, which is the restatement
Anshu has not made. Bound: simulation benchmarks, and the paper's own purpose is
to argue for perturbation-oriented training, not for an outside examiner.

For twin-certification, added 2026-10-02, and it did not reach MOVES because it
involves no outside party: arXiv 2610.01581 starts from the premise the thesis
asserts, that generative scenario models "often provide limited transparency
into learned representations and consistency with real-world vehicle dynamics"
and that "This lack of formal assurance limits their use in safety-critical
validation and certification workflows". Its five-layer protocol finds that
"Although standard output-level metrics and visualizations suggest that the
generated scenarios are realistic", the latent space's kinematic alignment and
the outputs' compliance with constraints such as lateral jerk thresholds tell a
different story. Direction: supports. Bound: the protocol is self-administered,
demonstrated on a VAE, and no notified body has been asked to accept it.

Added 2026-10-05, and the open decision moved for the first time since it was
stated. Two supporting, one weakening, and one item that is neither because it
reframes the decision itself.

NEW AND BEARING ON THE OPEN DECISION: arXiv 2610.02860 does the thing the
surviving form says cannot be done, in the one place where it is free, and
reports that it still does not answer the question. It traces one intervention
"through simulator state, raster observations, target embeddings, and predictor
outputs" using "Exact simulator-state forks in a controlled deformable-physics
testbed", which is a counterfactual under a changed action rather than a replay
of a recorded one. The finding: "Changed commands alter particle motion, yet
41.5% of one-step raster pairs are identical." Across "579 high-visibility
counterfactuals, median predictor-to-target response is 0.0051 and 0.0217
across two seeds, falling to 0.0027 and 0.0116 after variance normalization",
while "An isotropic state perturbation matched to the target counterfactual
embedding shift produces 190x and 53x larger predictor changes on the same
visible pairs, isolating action-path under-use rather than a dead or globally
shrunk predictor". And, in the paper's own word: "neither error nor rank alone
certifies physical state". READING, and it is the one the open decision needs.
The board has spent four runs asking whether the thesis should be restated as
non-replayability of contact under a changed action. This item says that
restatement is necessary but not sufficient, because a second obstacle sits
behind it: even with an exact fork, the consequence of the changed action is
absent from the observation 41.5% of the time at one step, so the limit is
observability and not only replayability. The decision Anshu has not made now
has a sharper form: state the thesis as the non-identifiability of a changed
action's consequence from the record, which covers both the physical and the
digital case, or concede it. Bound: a simulated deformable-physics testbed, two
seeds, and the paper's purpose is to motivate separate auditing of "physical
effect, observation visibility, representation geometry, and action dependence"
rather than an outside examiner.

Supporting: arXiv 2610.02662 audits a trace-completeness assumption in a
deployed robot safety monitor and finds the monitor checking an artefact
execution does not produce. Comparing RoboGuard's verdict on a surface plan
with its verdict on a graph-refined trace under the same LTL specification,
"all 12 targeted abstraction cases exhibit the predicted surface-versus-refined
discrepancy while all 16 controls behave as expected", across 28 controlled
cases in five action-abstraction families plus 14 end-to-end cases with SPINE
generating plans from natural language. Same structure as the Compositional
Policy Violations result of 09-17 (2609.18820), now in physical AI and with a
measured rate of 12 of 12. Bound: one monitor and one planner, the authors
propose graph-based trace refinement as a mitigation rather than issuing a
verdict, and nobody is paying for the audit.

Supporting, and the first external verifier of physical state this board holds:
arXiv 2610.02668 puts a consumer webcam outside an Opentrons Flex liquid
handler and checks the deck against a reference protocol library. The
architectural sentence is the thesis's own: "It operates independently of the
robot controller and does not interrupt or gate a run." Figures: the completed
assembly identified "in all 29 frames before robot motion", "95.1% of the 348
labware classifications for slots requiring exact matches agreed with the
protocol reference", "In 480 frames with partially occluded reservoirs, all
6,720 slot assignments were correct", slot assignment 100% correct and 97.73%
of labware classifications matching across three camera positions and two
lighting conditions, median verification 2.10 s on a laptop CPU. Direction:
supports, because an outside observer stated a fact about physical state
without taking throughput, which is exactly the function the thesis assigns.
Bound, and why it did not reach MOVES: it verifies setup before a run rather
than a policy after an update, so it is not non-regression, and the authors
shipped a tool for the operator rather than a verdict for a buyer.

Supporting: arXiv 2610.02694 verifies compliance with an operational constraint
from telemetry the regulated party supplies, and finds the record defeats the
check. Reconstructing rover trajectories to verify compliance with Lunar Safety
Zones, "standard outlier-robust pose graph optimisation methods are vulnerable
in this setting, because Byzantine rovers can generate measurements that are
internally consistent and numerous enough to make truthful incriminating
measurements appear as outliers". Its remedy "reasons over rover credibility
rather than individual measurement validity". Same structure as Hearsay
(2609.32495) and Approval Laundering (2609.38983), now on physical
trajectories. Bound: synthetic simulation plus analogue trajectory data, no
real multi-operator deployment, and the authors built both the attack model and
the remedy.

Supporting: arXiv 2610.02911 is the fourth consecutive harness-as-confound
result and the most quotable. "We show that details of the experimental harness
can reverse the observed ranking of methods", and after four harness details
were corrected a method that "first finished ahead in both stacks" no longer
did. The sentence worth carrying: "In each case the logged quantity looked
consistent with a working setup, while the quantity that defines the comparison
went unchecked." That is the seam's claim about self-administered measurement
stated from the inside. With 2609.37771 (09-29), 2610.00917 and 2610.01073
(10-01), the harness-as-confound line now has four independent instances in
seven days and should be treated as established rather than re-argued.

Weakening, at equal prominence, and the pattern is now five runs old: arXiv
2610.02616 reports that "optimizer self-evolution fails to improve performance
without execution-based verification, but achieves the best result of that
study when verification is available", and that its optimizer "lets the
optimizer test draft edits, replay failures, and perturb suspected steps before
submission, while tracking fixes and regressions across rounds", reaching 42.3%
and 37.7% against 39.2% and 29.3% for the strongest baselines, with code
public. For the fifth consecutive run the strongest item against the surviving
form is a developer-run gate rather than an absence of gating, and it is
published free. Also weakening on the commons argument: arXiv 2610.02874 runs
"matched physical counterfactuals in parallel: traffic scenario setup and
vehicle controllers remain fixed while only the road condition changes", across
1,024 matched 12-vehicle worlds per condition and 21 friction and grade
conditions, finding that when friction drops from 1.0 to 0.18 "the share of
vehicles that clear the work zone safely falls by 6 to 90 percentage points
across learned policies", with code on GitHub. Note the distinction that keeps
it weakening rather than fatal: what varies is the environment, not the policy,
so it is not the counterfactual the surviving form says is unavailable.

A CONSEQUENCE OF THE RESTATEMENT THAT CUTS AGAINST THE THESIS, added 2026-10-05
after retrieving the 2026-09-18 capture (inbox/2026-09-19-942eadd4) and reading
it against today's item. That capture states the original framing as a binary:
"If someone builds record-and-replay for physical contact dynamics, the
surviving form dies outright; if the physical world genuinely cannot be put in
an envelope, that non-replayability IS the moat and should be stated as the
thesis rather than 'non-regression' generally." arXiv 2610.02860 does not meet
the kill condition, because it forked a simulator rather than building contact
replay, so the thesis survives this run on its own terms. But it shows the
dichotomy has a third branch nobody allowed for: a case where the envelope is
perfect, the fork is exact, and the counterfactual still fails, because the
consequence of the changed action is absent from the observation 41.5% of the
time. HERE IS THE PART THAT CUTS AGAINST THE THESIS AND IS NOT IN THE BRIEF. If
the binding obstacle is identifiability rather than replayability, the claim
stops being specific to the physical world. Non-replayability was a robotics
moat precisely because contact cannot be enveloped while an LLM agent's
boundaries can. Non-identifiability is not: a recorded digital boundary can be
replayed perfectly and still fail to identify what a changed policy would have
done, which is the same gap Chronicle (2609.20625) and the open-loop result
(2610.01626) leave open in their own domain. So the sharper restatement buys
accuracy at the cost of the thing that made the thesis defensible, which is
that robots are different. Anshu should decide knowing that: the honest options
are a narrow claim that is probably true and not robotics-specific, or a
robotics-specific claim that today's item has made harder to state. This is the
first time the restatement has been shown to have a price, and it should not be
rediscovered as a fresh insight next run.

THE FORECLOSURE ARGUMENT, opened 2026-10-01 and now with a second and stronger
instance. OpenAI's 2026-10-05 text-provenance post is an operator meeting a
statutory detectability obligation with a mark whose detector it rations:
detector access "initially limited to approved researchers and expert
organizations" case by case, "we are not making it publicly available at
launch", watermarking "off by default in the API", and the EU rollout
explicitly not a global default. The reasons it gives are real ones, false
positives and false negatives, and it published the numbers: 17% detection
after 25% of words are replaced with synonyms. The structural point for this
board is that the line now has a live regulatory instance and not only a
security rationale, and that AI Act Article 50(2) requires an output to be
"detectable as artificially generated or manipulated" without naming who must
be able to detect it. Read against SEC Rule 501(a)(10)(iv), which makes
"otherwise independently verifiable" a condition of a credential having legal
effect, the two instruments of the same day take opposite positions on whether
the verifier must be independent of the party being verified. That contrast,
not either item alone, is the finding.

THE SPLIT, 2026-10-06, and it is the most consequential thing this run adds.
Two primary filings dated the same day point in opposite directions, and the
contrast is cleaner than any single item on this board because neither is a
research claim and both are law.

Supporting, and it is the first mandated and funded evaluator seat the thesis
has ever had in a published instrument. OJ notice C/2026/5181 of 2026-10-06
lists ChatGPT as a designated very large online search engine under DSA Article
33(4), decision dated 31 August 2026. Article 37(1) requires providers to be
subject "at their own expense and at least once a year, to independent audits",
and Article 37(3)(a) bars the auditor from having "provided non-audit services
related to the matters audited" in the 12 months either side, or from auditing
the same provider "during a period longer than 10 consecutive years". The
assurance-seam kill test asks whether any buyer pays for third-party attestation
rather than open-sourcing the tool or using its own telemetry. Here the buyer has
no choice, pays annually, and may not buy anything else from its examiner. The
commons argument cannot run against this, because the obligated party cannot
discharge a statutory audit by publishing a tool.

Weakening, at equal prominence, and it is the sharper of the two on the axis
Anshu is actually building in. FDA's final order FR Doc 2026-20448, immediately
in effect the same day, removes the exception to the 510(k) exemption for class
II clinical toxicology test systems "intended for Federal drug testing
programs", across 14 classification regulations, on the statutory ground that a
510(k) "is not necessary to assure the safety and effectiveness". The consumer
of the test result in that case is the federal government itself, and the
premarket third-party check was removed anyway, with the order stating it "will
eliminate private costs and expenditures required to comply".

THE READING, stated once so the next run does not re-derive it. The two filings
are consistent with each other and jointly inconsistent with the thesis as
written. Mandated independent evaluation is arriving where the harm is
informational and systemic and the obligated party is a platform, and it is
being withdrawn where the artefact is a physical product with a measurable
specification. That is the opposite of the direction the thesis assumed, which
was that physical safety is where the neutral examiner becomes structurally
necessary. The surviving form, non-regression at the moment of a model update,
is untouched by either filing: a DSA audit assesses Chapter III obligations, not
whether an update is a regression. So the thesis is not weakened in its
surviving form today; it is the broader claim, that the seam generalises from
platforms to machines, that has taken the hit. The ONE QUESTION of 2026-10-06 is
written to force that call rather than to restate it, and this is the second
consecutive run on which the restatement has been shown to have a price.

Also read and not promoted, both directions, 2026-10-06. Supporting: arXiv
2610.04699 collects roughly 22,000 labels from four models built by three labs
across six corpora including the EU AI Act and FINRA guidance, and finds that
"their errors run in opposite directions, so no model can be trusted as the
conservative choice", that on a deployed credit agent's own rule-set "they err
together, over-claiming that a fixed check will do, the direction that never
gets escalated", and that agreement with a reference judge "climbs from 30% to
77% across calibration bands while the genuinely decidable share does not move,
because a judge drawn from the population under indictment ratifies the blind
spot it shares". That last clause is the most compact argument for an outside
examiner this board holds, and it is a measured result rather than an assertion.
Supporting: arXiv 2610.06317 turns AI Act Article 50(2) into "a premarket
certificate, signed detector report, and postmarket recalibration protocol",
which is the seam's architecture drawn for the obligation the 10-05 brief led
on, and reports that "the surviving-token rule overstates the tolerable edit
rate roughly twofold". Supporting: arXiv 2610.04418 computes Clopper-Pearson
bounds and a "noise certification envelope" for a policy "delivered for
evaluation as opaque executable or remote API", which is the outside-examiner
problem in the authors' own terms. Weakening, same weight: arXiv 2610.06235
finds that under scene-preserving instruction interventions "all evaluated
policies predominantly approach and pick up the incorrect original target" while
"linear probes accurately recover instructed targets", and arXiv 2610.05818
reports up to 95% of implied-harm robot runs completing with no flag and that
activation monitoring "does not close this gap". Both keep locating the missing
measurement inside the developer's own instrumentation, which is the fourth
consecutive run on that shape, and nobody in window sold it from the outside.

---

## domains

Stock-side state. Decision of 2026-09-14: **breadth first, narrow later.**

| domain | depth | document | status |
|---|---|---|---|
| industrial certification and standards bodies | terrain | reports/terrain-map.md §1 | written 2026-09-14; §1 "what is missing" partly closed 2026-09-18, updated 2026-09-22, and updated again 2026-09-30 to 41 under 2023/1230 and 153 under 2006/42/EC with the complete 41-name list and the DGUV / TUV concentration finding. Fee schedules, day rates and assessor utilisation remain not found, which is now the only substantive gap left in §1. §1 "the money" fully serialised as of 2026-10-01 and §1 "the constraint" fully serialised as of 2026-10-05 |
| the robot policy layer | terrain | reports/terrain-map.md §2 | skeleton, gaps named |
| datacenter and power buildout | none | reports/terrain-map.md §3 | scope only, not researched |

In progress for the brief's FROM THE STOCK SIDE section: `reports/terrain-map.md`.
Serialise it in order, at most 400 words per weekday, and record the last
section delivered in the `serialised` line below. When the file is exhausted,
omit the section rather than inventing a new domain.

serialised: §1 vocabulary completed 2026-09-17. §1 the value chain COMPLETE (2026-09-18). §1 the money COMPLETE as of 2026-10-01. §1 THE CONSTRAINT COMPLETE as of 2026-10-05: the first paragraph went out 2026-10-02 with the Article 30(8) remuneration sentence verbatim and the DGUV concentration clause, and the second paragraph went out 2026-10-05, carrying Article 30(9) liability insurance "unless liability is assumed by the Member State in accordance with national law" and Article 30(10) professional secrecy as an asset rather than a compliance cost. OUTSTANDING, and next: §1 the live disagreement, whose two halves are the case for the 20 January 2027 date being real (Annex I Part A item 5, no self-certification option, untouched by the Omnibus since Reg 2026/1744 Art. 3 amends only Machinery Arts. 8, 20 and 47) and the case for it being soft (no AI harmonised standards submitted as of August 2026, the delegated act deferred to 2 August 2028, Art. 20(10) letting manufacturers lean on AI Act hStds), then what each side must believe. Then §1 the recent history and the designation mechanics of Articles 33(2), 33(3) and 34(5). Then §2, the robot policy layer, which is a skeleton with gaps named rather than prose, so the next run should expect §1 to run out and say so rather than serialising a skeleton. §1 THE LIVE DISAGREEMENT, FIRST HALF ONLY, delivered 2026-10-06: the opening sentence verbatim plus the whole case for real, including the Reg (EU) 2026/1744 Article 3 clause. NOT yet delivered and next in order: the case for soft, then "what each side must believe". The half-section was a word-cap decision, recorded in that brief's provenance, not a judgement that the second half matters less.

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
| certification and standards | 26 | 0 | 0 |
| robot policy layer | 12 | 0 | 0 |
| datacenter and power | 7 | 0 | 0 |
| capital flows, general | 8 | 0 | 0 |

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

2026-10-02: certification +3 (the Claude Frontier Academy credential, the
harmonised-standard citation decision with its 18-month deferral, and EO 14434),
robot policy layer +1 (the action-chunk stability measurement), datacenter and
power +1 (CScale optical interconnect), capital +1 (CScale counted once as a
capital item). Ten consecutive ONE QUESTIONs are now unanswered. Per the
decision recorded on 1 October this mechanism is treated as dead for the
narrowing decision and is not re-described here; the tally now reads 21 to 9 to
6 purely as a record of where the collectors look. The terrain map continues to
serialise in document order, which is the behaviour needing no decision. The one
new fact relevant to narrowing: today's items came from four different
collectors rather than mostly from F4, which is the first run where that is
true, so the certification lead is no longer solely an artefact of arXiv volume.

2026-10-05: certification and standards +2 (the SEC Rule 501(a)(10) credential
designations, and the AI Act Art. 50(2) marking obligation with its first
compliance act), robot policy layer +2 (the counterfactual action-evaluation
result and the robot safety monitor audit), datacenter and power +1 (the EIA
Directive Annex II screening correction, the second dated EU instrument this
system has logged on that domain). Capital flows unchanged at 7, because no
round with a primary source published in window cleared the floor: this is the
first run since 09-16 on which F1 returned zero, and the two items it did see
were dropped on the dateline rule and on the no-primary-source rule rather than
on the floor. Certification keeps the lead at 23 against 11, and today it was
not an arXiv artefact: the two items came from the Federal Register and from
EUR-Lex. Questions answered remains 0 across every domain after 11 questions,
which is now the longest-running fact about this system and the one the
narrowing trigger depends on. The trigger as written compares answered
questions against depth; with the numerator still zero on every row it cannot
discriminate, so the narrowing will have to run on brief-item counts alone or
the trigger needs rewriting. That is a decision for Anshu and it is not
urgent until §1 and §2 of the terrain map are delivered.

2026-10-06: certification and standards +3 (the DSA Article 37 independent-audit
seat with ChatGPT inside it, the FDA 510(k) removal, and the F-gas certification
syllabus corrected by binding act), robot policy layer +1 (the NHTSA contextual
DMS assessment at 48 participants), capital flows +1 (Virtual Incision, the
first surgical-robotics round tracked). Datacenter and power unchanged at 7, the
second consecutive run with nothing on that domain. Certification extends the
lead to 26 against 12, and for a second consecutive run the items came from the
Official Journal and the Federal Register rather than from arXiv. Questions
answered remains 0 after 12 questions, so the narrowing trigger still cannot
discriminate; per the decision of 1 October this is not re-described further.

The one thing this run adds that bears on narrowing, and it is a shape not a
count. Today produced a matched pair on the same day and in the same axis: one
jurisdiction created a recurring, provider-funded, statutorily independent audit
seat over a frontier-lab product, and another removed a premarket third-party
check from tests its own government consumes. The assurance-seam thesis has been
accumulating supporting and weakening evidence separately for three weeks; this
is the first run on which both arrived as primary filings dated the same day.
That is the strongest available argument that the thesis is not one claim but
two, split by whether the artefact is a platform or a physical product, and the
open question of 2026-10-06 is written to force that split rather than to
restate it.

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
| 2026-10-02 | The EU's own supervised pre-market testing venues, AI Act Article 57 sandboxes, need not be operational until 2 August 2027, 194 days after the Machinery obligation bites on 20 January 2027, and the Commission grants 18 months of grace when a harmonised standard is merely revised: is the 20 January 2027 date therefore unenforceable in practice, yes or no | no |
| 2026-10-05 | AI Act Article 50(2) requires an output to be "detectable as artificially generated" and does not say by whom, OpenAI has shipped a mark whose detector is rationed case by case to approved researchers, and on the same day the SEC restated that a credential counts only if holding it is "made publicly available ... or is otherwise independently verifiable": is a disclosure obligation whose only verifier is the discloser satisfied, yes or no | no |
| 2026-10-06 | On one day the EU put a frontier lab's product under a yearly independent audit it pays for and may buy nothing else from, DSA Art. 37, while the FDA removed premarket review from tests the federal government itself consumes: is the mandated-evaluator seat a platform instrument that never crosses into physical product safety, yes or no | no |

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
| notified bodies active under Reg (EU) 2023/1230 | 41, unchanged on 2026-10-06, a fourth consecutive reading at 41 after 10-05, 09-30 and 09-22; was 40 on 2026-09-18 | Commission Single Market Compliance Space register | 2026-10-06 |
| notified bodies active under Directive 2006/42/EC | 153, unchanged on 2026-10-06, was 152 on 2026-09-22 and 153 on 09-18, 09-30 and 10-05 | same register, same reading | 2026-10-06 |
| new machinery regime as a share of the outgoing one | 26.8%, unchanged on 2026-10-06, was 27.0% on 2026-09-22 and 26.1% on 2026-09-18; 106 days to application | own arithmetic on the two counts | 2026-10-06 |
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
| tests needed for a 99% reliability release gate as test correlation rises | 8 independent, 74 at latent correlation 0.3, 5,182 at 0.5, where the gate keeps fewer than one good model in ten | arXiv 2610.00993 | 2026-10-01 |
| false discovery rate of an ungated moving-incumbent model-adoption path | persistent FDR 0.621 for development-only e-LOND, 5,000-trajectory closed-loop benchmark; Stagewise EGR uses 56.1% less decision evidence over 600 matched pairs | arXiv 2610.01751 | 2026-10-01 |
| manipulation states with confidently contracting action-error propagation | rare; amplification common where the rate resolves, across twelve tasks and three benchmark suites, and replanning rarely converts amplification to confident contraction | arXiv 2610.01626 | 2026-10-01 |
| agent model ranking reversal across harnesses, Terminal-Bench 4 | Claude leads GPT by 7.94 points in OpenHands and trails it by 30.16 in PI | arXiv 2610.00917 | 2026-10-01 |
| unsafe programs preserved by stale historical scores after a contract change | 22 of 48 framework histories, with a correct alternative in every affected archive | arXiv 2610.01073 | 2026-10-01 |
| price of a vendor-issued technical credential at scale | USD 10,000 a head, being USD 100,000,000 for 10,000 engineers by end-2027 | own arithmetic on the Anthropic release | 2026-10-02 |
| harmonised standards cited in one Commission decision, and the grace period granted | 19 cited, 18 deleted with deletion deferred to 2028-04-02, 18 months after publication | Implementing Decision (EU) 2026/2211 | 2026-10-02 |
| days between the Machinery obligation applying and the AI Act sandbox deadline | 194, from 2027-01-20 to 2027-08-02 | own arithmetic on Reg (EU) 2026/1744 Art. 1(22)(a) | 2026-10-02 |
| CScale Series C, announced against authorised | announced $145,000,000; Form D reports totalOfferingAmount 194,999,885, totalAmountSold 144,999,891, totalRemaining 49,999,994 | company release and SEC Form D | 2026-10-02 |
| OpenAI text watermark detection, 1% target false positive rate | about 80% of 200-token passages against about 95% of 400-token passages for content such as psychology, "substantially lower" for mathematics | OpenAI, company post | 2026-10-05 |
| OpenAI text watermark detection after editing, 400-token passages | about 92% falling to 66% when 10% of words are replaced with synonyms, and to 17% at 25% | OpenAI, company post | 2026-10-05 |
| days from the AI Act Art. 50(2) marking obligation applying to the first frontier-lab text watermark | 64, from 2026-08-02 to 2026-10-05 | own arithmetic on Reg (EU) 2024/1689 Art. 113 and the OpenAI post | 2026-10-05 |
| anticipated fee for a regulator-recognised credential that substitutes for the accredited-investor wealth test | USD 100, "similar to the SIE Exam fee", about 75 questions, two hours, valid ten years | SEC Release 33-11445 | 2026-10-05 |
| ratio of the two credential prices on this board | 100x, USD 10,000 vendor-graded and by nomination against USD 100 SRO-examined and independently verifiable | own arithmetic on the Anthropic release and SEC Release 33-11445 | 2026-10-05 |
| credentials designated as qualifying natural persons for accredited investor status | was 3 since 2020-08-26 (Series 7, 82, 65), now 3 plus 5 under notice with comments closing 2026-12-04 | SEC Release 33-11445 | 2026-10-05 |
| capital raised under the exemption a designated credential unlocks | "Approximately $400 billion was raised in Regulation D offerings (excluding pooled funds) between July 1, 2024 and June 30, 2025" | SEC, quoting its own Office of the Advocate for Small Business Capital Formation | 2026-10-05 |
| one-step observations identical under a changed command, exact simulator-state forks | 41.5% of raster pairs; median predictor-to-target response 0.0051 and 0.0217 on two seeds across 579 high-visibility counterfactuals, against 190x and 53x for a matched isotropic state perturbation | arXiv 2610.02860 | 2026-10-02 |
| robot safety monitor verdicts diverging between a surface plan and a graph-refined trace | 12 of 12 targeted abstraction cases, 0 of 16 controls, under the same LTL specification | arXiv 2610.02662 | 2026-10-02 |
| external camera verifying a liquid handler deck against its protocol, without gating the run | 95.1% of 348 labware classifications agreeing, 100% slot assignment across three camera positions and two lighting conditions, 6,720 of 6,720 slot assignments correct under partial occlusion, median 2.10 s on a laptop CPU | arXiv 2610.02668 | 2026-10-02 |
| safe clearance under a matched physical counterfactual on road condition only | falls 6 to 90 percentage points across learned policies as friction drops from 1.0 to 0.18, 1,024 matched 12-vehicle worlds per condition, 21 conditions | arXiv 2610.02874 | 2026-10-02 |
| days between an EU act and a single-language corrigendum to its operative wording | 67 German (Reg 2026/1744), 73 Italian (Reg 2026/1738), 680 Dutch (Dir 2024/2853), 5,364 Danish (Dir 2011/92) | own arithmetic on four OJ references | 2026-10-05 |
| GMI Cloud, recorded out of window | $223,000,000 equity Series B led by ARCHIV with NVIDIA participating, plus a $445,000,000 credit facility led by CTBC; no valuation; contracted ARR "more than 9x its year-end 2025 level" | company release via PR Newswire, 2026-10-01 09:05 CST | 2026-10-05 |
| total active notified bodies, all legislations | 1,566 | same register, unfiltered, first recorded | 2026-10-06 |
| designated very large online platforms and search engines under DSA Art. 33(4) | 28 services; ChatGPT a Very large online search engine, decision 31 August 2026, alongside Reddit and Roblox the same day and WhatsApp on 26 January 2026 | OJ C/2026/5181 | 2026-10-06 |
| days from a DSA designation decision to the independent-audit obligation | about 122, being Art. 33(6)'s four months from notification, applied to the published decision date of 2026-08-31; the notification date is not published | own arithmetic on Reg (EU) 2022/2065 Art. 33(6) | 2026-10-06 |
| statutory independence rules on a DSA auditor | no non-audit services to the provider for 12 months before and 12 months after the audit; no auditing the same provider for more than 10 consecutive years | Reg (EU) 2022/2065 Art. 37(3)(a) | 2026-10-06 |
| classification regulations from which FDA removed the federal-drug-testing exception to the 510(k) exemption | 14, immediately in effect, approximately 70 commenters | FR Doc 2026-20448 | 2026-10-06 |
| days from an EU certification Regulation to a substantive correction of its examination syllabus | 757, from the OJ of 2024-09-09 to Implementing Reg (EU) 2026/2214 of 2026-10-06, in three language versions, by amending act rather than corrigendum | own arithmetic on two OJ references | 2026-10-06 |
| federal evidence base for a prototype contextual driver monitoring system | 48 participants from 204 contacted, four ten-minute simulator drives each, 134 burden hours, $120 a head; 24 per arm across two DMS conditions against ~390 per arm to resolve 10pp at p=0.5 | FR Doc 2026-20394 and own arithmetic | 2026-10-06 |
| agreement with a reference judge on what an agent verifier can check | climbs from 30% to 77% across calibration bands while the genuinely decidable share does not move; ~22,000 labels, four models, three labs, six corpora | arXiv 2610.04699 | 2026-10-06 |
| tolerable edit rate implied by the surviving-token watermark rule | overstated roughly twofold, on a reproducible tournament-watermark simulation | arXiv 2610.06317 | 2026-10-06 |
| implied-harm robot runs completing with no monitor flag | up to 95%, and up to 90% after recalibrating the text guard on robot instructions; activation monitoring "does not close this gap" | arXiv 2610.05818 | 2026-10-06 |
| policies picking the scene-favoured target when the instruction names a different visible object | all evaluated VLA policies and world-action models, while "linear probes accurately recover instructed targets" | arXiv 2610.06235 | 2026-10-06 |
