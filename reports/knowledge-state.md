# Knowledge state

The file every agent reads to answer "what does he already know". Maintained by
M2 Ledger Keeper after each editor run. This is a state file, not a document:
no prose, no commentary, no history beyond what is needed to compute a diff.

Last updated 2026-10-21 by the M1/M2 run. NINETEEN briefs published, counted
from `ls reports/newsletter/*.md`. Count the directory, do not carry the
previous header's number forward. Window 20 to 21 October, 24 hours, computed
from the newest file in reports/newsletter/ rather than the calendar as the
standing instruction requires. THE TASK FIRED ON SCHEDULE for a third
consecutive run. Zero duplicates were found against the 20, 19 and 16 October
briefs.

THE "FROM THE STOCK SIDE" SECTION WAS OMITTED FOR THE FIRST TIME, which is the
exhaustion marker of 2026-10-20 being honoured rather than re-litigated. Do not
re-open terrain-map.md and do not invent a replacement domain. The narrowing
trigger stays live and S1 stays unstarted until Anshu picks a domain.

TWO F1 ITEMS LANDED ON THEIR FORM D WHILE THEIR COMPANY MATERIAL WAS DAYS OLD,
and the handling is now settled rather than re-derived each time. Teradyne /
FormFactor had an 8-K of 13 October for a 6 October agreement and a 12 October
press release; Modal Labs had a company post of 14 October. Neither was caught
by the 13, 14, 16, 19 or 20 October runs. Both Form Ds were accepted on 20
October, which is in window, so both were reported on the FILING as trigger
with the company material as second source, and the brief said in provenance
that the older material is a miss by those runs rather than news. This is the
Liqid precedent of 2026-10-20 generalised: when a Form D in window evidences a
round whose announcement the board missed, the filing is the dateline and the
miss is disclosed.

THE CHEAPEST MISS THIS BOARD KEEPS MAKING IS A SECOND PROCEEDING UNDER A FILE
NUMBER IT ALREADY HAS. The SEC accredited-investor credential line was stored
on 2026-10-05 from File No. 4-931, the FINRA exam at about $100. File No. 4-933,
published the SAME DAY, proposes designating the CFA charter and was not
recorded. It surfaced only because an ADDRESSES correction, FR Doc C1-2026-20311,
published on 21 October. RULE, so this is not rediscovered: when an agency
assigns a file number to a proceeding, check the adjacent numbers in the same
series before recording the line as singular.

THE MONDAY arXiv SEAM RECURRED AS PREDICTED AND THE PREDICTION WAS RIGHT, so
stop re-deriving it. All 68 cs.RO submissions in this window carry a `published`
date of 19 October and NONE carries 20 October, confirmed by a per-day count
over the range query. arXiv's indexing lag means a Tuesday run reads Monday's
batch. The 2026-10-19 header said this seam recurs every Monday; it recurs every
day, one day behind, and the Monday case is only the visible one.

A NEW CLASS OF QUOTE ERROR WAS CAUGHT AND IT IS WORTH ONE LINE HERE, because the
matcher now has to check it: a quoted span ended with the full stop INSIDE the
quotation marks where the source sentence continues with a colon. The span was
verbatim up to that character and the whitespace-normalising matcher caught it
only because the stop is part of the captured string. Capture the closing
punctuation when checking, not just the words.

THREE HAYSTACK FALSE NEGATIVES, logged once so the next run does not treat them
as text errors. A quote that lives inside an HTML `meta` attribute, which is
where a company's own one-line product description usually sits, is destroyed by
tag-stripping and must be checked against the raw bytes. A quote of this board's
own prior brief is not in any retrieved page and must be checked against
reports/newsletter/. Neither is a source problem.

RETRIEVAL NOTE CARRIED, still true: the Single Market Compliance Space register
serves a COOKIE NOTICE before the application renders. Clicking "Accept only
essential cookies" is required before the "Search results (n)" heading exists
in the DOM. Everything else in the 2026-10-11 URL-filter method and the
2026-10-14 host correction holds. ADDED 2026-10-19, and three runs have read
this count without storing it: the legislationId for Directive 2006/42/EC is
131881. It was read off the filter checkbox's own `value` attribute with
`javascript_tool`, because the Legislation dropdown control sits outside the
viewport and cannot be clicked, the same limitation recorded for "Items per
page: 100" on 30 September. Known ids now: 162400 Reg (EU) 2023/1230, 131881
Dir 2006/42/EC, 168380 Reg (EU) 2024/1689, 167953 Reg (EU) 2024/2847.

CORRIGENDUM RETRIEVAL IS NOW SOLVED AND IS CHEAPER THAN THE 2026-10-16 ROUTE.
`tools/eurlex.mjs get` 404s on every `R(nn)` CELEX. Do NOT fall back to SPARQL.
Request `publications.europa.eu/resource/celex/<URL-encoded CELEX>` with
`Accept: application/xhtml+xml` and an explicit `Accept-Language`, trying the
24 language codes in parallel; the single-language corrigendum answers on
exactly one. A 404 body names the cellar identifier, which can then be
requested directly at `/resource/cellar/<id>` with the same two headers. A
request without `Accept-Language` returns HTTP 400 "Invalid content type
CONTENT_STREAM for WORK without language", which is the signature to add it.
Only `application/xhtml+xml` is served for these; PDF and plain text 404.

BOTH STRUCTURALLY EMPTY SOURCES RECOVERED THIS RUN, and the recovery is the
part worth carrying. arXiv's four-day stall ended: the newest indexed cs.RO
submission is 2610.18874 of 13 October 17:59, against 2610.13945 of 9 October
on the three previous runs, so 10 to 13 October all propagated at once. The
standing note that called it a lag rather than a failure was right and the
stronger reading floated on 13 October should NOT be adopted. EDGAR likewise:
form.20261013.idx returns 200 and 93,706 bytes, form.20261012.idx returns 403
consistent with the Columbus Day holiday, form.20261014.idx returns 403 because
the day is not closed. F1 ran on priority 1 for the first time in three runs.

NEW RETRIEVAL FAILURE, logged once so it is not rediscovered: the arXiv API
returned HTTP 429 "Rate exceeded" on four consecutive calls after three
succeeded, and every `id_list` call failed that way while `search_query` calls
kept working after a pause. The fallback that worked was fetching
`arxiv.org/abs/<id>` and reading `citation_title`, `citation_author` and the
abstract blockquote out of the HTML. Space the API calls and prefer one wide
`search_query` over several `id_list` lookups.

HOST CORRECTION ON THE NOTIFIED-BODY REGISTER, and the stored note was wrong.
`single-market-economy.ec.europa.eu/single-market/single-market-compliance-space/...`
returns "Page not found". The working host is
`webgate.ec.europa.eu/single-market-compliance-space/notified-bodies/notified-body-list?filter=notificationStatusId:1,legislationId:N`.
Everything else in the 2026-10-11 method note holds: the filter round-trips
through the URL, the "Search results (n)" heading reads out of the DOM with
`javascript_tool`, and the paginator's "2" control takes a JS click.

THE RUN SCHEDULE REMAINS A KNOWN FAILURE POINT, carried from 2026-10-11: the
task did not fire on 8, 9 or 10 October and nothing in the system noticed. A
later run should not assume the previous brief is yesterday's. It fired
correctly on 12, 13 and 14 October.

---

## voices

The F6 list. Keep between 8 and 12 names. Read at the person's own venue only.

| person | venue | newest seen | date |
|---|---|---|---|
| Dario Amodei | darioamodei.com, short posts | We Must Pace the Frontier, still newest on 2026-10-21, re-read over HTTP a fourteenth consecutive time. RETRIEVAL, logged once: darioamodei.com returns HTTP 301 and 166 bytes without `curl -L`, which reads as an empty venue; with `-L` it returns 200 and 28,947 bytes. Always follow the redirect. RESOLVED 2026-10-01, close this line of enquiry: an href scrape returns exactly four `/post/` URLs and two `/essay/` URLs, so the "six titles" counted on 09-30 was posts and essays added together. Four short posts, unchanged since 09-12 and confirmed again 2026-10-16: on-deepseek-and-export-controls, policy-on-the-ai-exponential, the-urgency-of-interpretability, we-must-pace-the-frontier | 2026-09-12 |
| Dario Amodei | darioamodei.com/essay/ | Two essays, unchanged: Machines of Loving Grace and The Adolescence of Technology, the latter dated "January 2026" on the page. /archive still returns HTTP 404 while appearing in the site navigation | 2026-01 |
| Paul Graham | paulgraham.com/articles.html | Making Startups Powerful, unchanged on 2026-10-21, returning 200 and 119,430 bytes with `-L`. **NEW RETRIEVAL NOTE 2026-10-20: `http://www.paulgraham.com/articles.html` returns HTTP 301 with a zero-length body and needs `-L`, the same trap already recorded for darioamodei.com. Three runs read this venue without recording it, which means three runs got lucky with their client.** The stored-title diff WORKS and is now the method: the five titles below it read identically on 10-01, 10-02, 10-05, 10-06, 10-07, 10-11, 10-12, 10-13, 10-14, 10-16, 10-19, 10-20 and 10-21, so the page does not need reading in depth. Order: How Universities Should Prepare Founders, How to Earn a Billion Dollars, How to Convert Between Wealth and Income Tax, The Brand Age, The Shape of the Essay Field | 2026-09 |
| Andrej Karpathy | karpathy.bearblog.dev/blog | newest is Sequoia Ascent 2026 summary (30 Apr 2026), unchanged, re-read 2026-10-21, an eighth consecutive HTTP 200. RETRIEVAL, settled 2026-09-22 and now settled in both directions: the venue flaps between HTTP 200 and 404 for HTTP clients (200 on 09-17, **2026-10-07**, **2026-10-11**, **2026-10-12**, **2026-10-14**, **2026-10-16** and **2026-10-19**, 404 on 09-15, 09-22, 09-30, 10-01, 10-02, 10-05 and 10-06) and renders reliably in a browser pane. On 10-07, 10-11, 10-12, 10-14 and 10-16 a plain HTTP client with a desktop User-Agent returned 200 and the full post list, so the browser pane was not needed. EIGHT consecutive 200s now, against nine prior 404s: the standing note is softening but not reversed, so keep trying HTTP first and keep the pane as the fallback. Do not record the 404 as a venue outage or as a DIFF, and do not record a 200 as a publication either: try HTTP first, fall back to the pane | 2026-04-30 |
| Andrej Karpathy | karpathy.github.io | newest is microgpt, 12 Feb 2026, unchanged, re-read 2026-10-21 | 2026-02-12 |

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
| Machinery Art. 20(10) | added by the Omnibus; AI Act harmonised standards give presumption of conformity in the interim. **THE TRIGGER FIRED 2026-10-14**: the interim route is no longer hypothetical, because EN 18286:2026 is now cited under AI Act Art. 40. Verbatim, grepped from CELEX 32026R1744: "Until harmonised standards or common specifications are referenced or adopted pursuant to this Article as regards high-risk AI systems, high-risk AI systems within the scope of this Regulation which comply with the relevant harmonised standards referenced, or common specifications adopted pursuant to Articles 40 and, respectively, 41 of Regulation (EU) 2024/1689 shall be presumed to be in conformity with the essential health and safety requirements set out in Annex III to this Regulation as regards high-risk AI systems." So the presumption now has one standard behind it, and zero notified bodies under either Regulation 2024/1689 or an AI scope under 2023/1230 to assess it | fired 2026-10-14 |
| CEN/CENELEC AI harmonised standards for machinery | none submitted to the Commission as of Aug 2026 (secondary: IBF Solutions), and this row is still true as written: no AI harmonised standard has been cited under Reg (EU) 2023/1230. **BUT THE ADJACENT ROUTE OPENED 2026-10-14, see the new AI Act hStd row below**, and Machinery Art. 20(10) makes an AI Act hStd a substitute in the interim, so a run reading this row must read that one with it | unknown |
| Reg (EU) 2024/1689 AI Act, harmonised standards under Art. 40 | **NEW to the watchlist 2026-10-14, and it is the lead of that brief. WAS ZERO FOR THE WHOLE LIFE OF THIS BOARD, NOW ONE.** Commission Implementing Decision (EU) 2026/2274 of 12 October, published and in force 2026-10-14, publishes the reference of EN 18286:2026, "Artificial intelligence – Quality management system for EU AI Act regulatory purposes". It is the sole entry in the Annex. Recital 3 says CEN and Cenelec "completed the work on the harmonised standard requested corresponding to point 9 of Annex I to that Decision regarding harmonised standard(s) ... on quality management systems for providers of AI systems, including post-market monitoring processes", under the standardisation request in Implementing Decision C(2025) 3871 of 23 June 2025. Recital 5: "Standard EN 18286:2026 satisfies the requirements which it aims to cover", with NO restriction attached, unlike EN 12953-6:2024 on 2026-10-02. Art. 1 publishes the reference; Art. 2 enters into force on publication. NOVELTY CHECKED NOT ASSERTED: `eurlex.mjs since 2024-08-01 --to 2026-10-13 --match "harmonised standards for high-risk AI\|support of Regulation \(EU\) 2024/1689"` returns no match across 5,000 sector-3 documents. THE BOUND, state it every time this row is cited: EN 18286 is a quality management system standard answering AI Act Art. 17, so what it can discharge is narrow, and nothing read says it covers the Machinery Annex III essential health and safety requirements that Annex I Part A item 5 routes through a notified body. Buried: none; it creates no new obligation and supplies a way to discharge one. NEXT ON THIS ROW: whether any further standard from the C(2025) 3871 request is cited, in particular one answering Art. 15 accuracy, robustness and cybersecurity, which is the one that would reach Annex III | in force 2026-10-14 |
| prEN 50742, protection against corruption | no ballot result published as of 2026-09-18. CORRECTION, do not re-read this as movement: the IBF sentence "Following a positive final vote in September, publication is scheduled for November 2026" sits on a page last updated 2026-07-31 and is prospective. standards.cencenelec.eu returned HTTP 500 again on 2026-09-22, a fourth consecutive run. ESCALATION EXHAUSTED: the browser pane also returns HTTP 500, so this is a server-side outage and not the browser-pane pattern. A nen.nl mirror was tried and 404ed. NOT RETRIED on 2026-09-30, per that decision, and the row is now **DORMANT**: stop spending a collector slot on it each run. Re-open it only on a different national mirror (candidates not yet tried: din.de, afnor.org, une.org, uni.com) or on a CEN/CENELEC announcement reached some other way. The prospective IBF sentence about a November 2026 publication remains prospective and is not evidence | 2026-11, dormant |
| ~800 carried-over Machinery Directive hStds | first citations expected Q3 2026 | Q3 2026 |
| ISO 25785-1, humanoid safety | **ISO/CD 25785-1**, unchanged at stage 30.60 on 2026-10-19, a FIFTH consecutive reading, title unchanged, read in a browser pane. Prior: 2026-10-05, a fourth consecutive reading. Full official title, read at source: "Robotics — Safety requirements for dynamically stable industrial mobile robots (legged, wheeled, or other forms of locomotion) — Part 1: Robots". Committee Draft, stage 30.60 "Close of comment period", ISO/TC 299, first read 2026-09-18. Scope: "safety requirements for industrial mobile robots with actively controlled stability". Part 2, on integration, to be developed separately. NEW on 2026-09-30, the exclusions read at source: the document excludes "robots whose travel speed and travel direction is solely under control of a driver or an operator (e.g., human remote control, human continuous local control)", and also excludes ridden robots, worn robots such as exoskeletons, road vehicles, airborne and underwater robots, floor-cleaning robots and non-industrial environments. This is the exact complement of the FDA RASD scope below, which covers only teleoperated systems. The page carries no date for the stage, so this is a state reading and not a dated movement | unknown |
| NHTSA post-AV-STEP exemption regime | AV STEP withdrawn 2026-06-26; case-by-case exemptions. **MOVED 2026-10-07, and it is the first evidence on this row that the declined seat is being built outside the agency.** arXiv 2610.08450 and 2610.08458, both submitted 2026-10-06, 102 days after the withdrawal, propose and then run "a dedicated third-party testing initiative for systematically evaluating AV behavioral safety", comprising a Behavioral Competency Test on "reactive behaviors under controlled scenarios" and a Driving Intelligence Test on "interactive behaviors within naturalistic traffic conditions, quantifying the frequency of safety-critical events to deliver statistically meaningful safety metrics before large-scale deployment". Part II validates it on Autoware.Universe, an open-source Level 4 ADS, in simulation and on the physical track at the University of Michigan's Mcity Testing Facility, and reports: "Autoware.Universe possesses 6 out of 14 behavioral competencies and exhibited a crash rate of 3.01x10^-3 crashes per mile, approximately 1,000 times higher than the average human driver crash rate", plus "a number of unknown unsafe scenarios". THE READING, and it cuts both ways: the framework is the thing NHTSA declined to mandate, and it was published free by a university with no buyer, which is the commons argument arriving on the physical side after six instances on the digital side. Nothing on this row shows anyone paying for it. ALSO NEW 2026-10-07, carried not promoted: FR Doc 2026-20516, Docket NHTSA-2026-1618, sets an Automated Driving Systems Workshop for the afternoon of 1 December 2026 inside the Fall 2026 Safety Research Portfolio public meeting; the meeting "will not be live streamed", panel presentations are recorded, and "The ADS Workshop will not be recorded" | ADS Workshop 2026-12-01 |
| ISO 10218-1/-2:2025, ANSI/A3 R15.06-2025, UL 3300 | in force; UL 3300 on OSHA NRTL list 2025-12-31 | none stated |
| BIS advanced computing licence policy | case-by-case review; TPP < 21,000 and DRAM bw < 6,500 GB/s; independent third-party performance testing required | none stated |
| FMCSA broker bond and double-brokering penalties | $150k bond; penalties $50k | none stated |
| FMCSA Training Provider Registry, 49 CFR part 380 subpart G | **NEW to the watchlist 2026-10-21, and it is the first WORKING third-party certification registry this board has sized.** Information collection renewal published 2026-10-21, OMB control number 2126-0028, a renewal of a currently-approved ICR with expiration date 2027-02-28. Verbatim: "Estimated Number of Respondents: 26,284", "Estimated Time per Response: 0.55 hours", "Estimated Total Annual Burden: 198,730 hours", respondents being "Training Providers". Each provider registers once, must "update their information at least biennially", and after a driver-trainee completes training "must submit training certification information regarding the driver-trainee to the TPR". THE COMPARISON, and it is the reason this row exists: the EU register holds 43 notified bodies under Reg (EU) 2023/1230 and the EAC sizes ESTEP at 9 submissions a year, so the orders of magnitude between a working registry and the two certification regimes this board tracks are 26,284 against 43 against 9. THE BOUND, state it whenever this row is cited: 26,284 counts registered training PROVIDERS certifying their own graduates, not accredited third-party certifiers, so it is a scale comparison and not an equivalence. Buried: none, the ICR renews an existing obligation and creates none | comment period per FR notice |
| SEC Rule 501(a)(10) credential designations | **NEW to the watchlist 2026-10-21, and the board had HALF of it since 2026-10-05.** Two live proceedings, not one. File No. 4-931, already stored, would designate passage of a FINRA-built accredited investor exam at a fee "similar to the SIE Exam fee, which is currently $100". File No. 4-933, Release No. 33-11447, published the SAME DAY, 2026-10-05, 91 FR 63314, would designate "holding a charter as a Chartered Financial Analyst (“CFA”) in good standing as qualifying natural persons for accredited investor status"; comments close 2026-12-04. The proposed verification mechanism is the issuer's own: the CFA Institute "offers the public access to an online searchable Member Directory to verify whether an individual (i) is a member in good standing of CFA Institute, (ii) holds the CFA charter and (iii) the date when the individual earned the charter". That is the SAME STRUCTURE the board flagged on 2026-10-05 against Rule 501(a)(10)(iv), which requires that holding be "either made publicly available by the relevant self-regulatory organization or other industry body or is otherwise independently verifiable": here the register satisfying the test is run by the body that issues the credential. HOW IT SURFACED: not by the 5 October run, which missed it, but by FR Doc C1-2026-20311 of 2026-10-21, an ADDRESSES correction with no substantive content. NEXT ON THIS ROW: whether the Commission issues an order on either file, and whether it addresses issuer-run verification under 501(a)(10)(iv) | comments close 2026-12-04 |
| EAC ESTEP, Election Supporting Technology Evaluation Program | voluntary; Application for Testing form published 2026-09-15; agency sizes it at 9 submissions/yr, 1,296 hours, $101,217.60 | comment period per FR notice |
| openai.com, retrieval | RESOLVED 2026-10-12, first time this was logged. openai.com/news returns HTTP 403 to an HTTP client with a desktop User-Agent. openai.com/news/rss.xml returns HTTP 200 with 1,287 dated items carrying `<pubDate>`, `<title>` and `<link>`, which is enough for the F4 and dateline tests. Do NOT escalate the 403 to a browser pane; use the RSS feed | n/a |
| deepmind.google, retrieval | RESOLVED 2026-10-12, first time this was logged. deepmind.google/discover/blog is a 301 to deepmind.google/blog, whose rss.xml returns HTTP 200 but with a gzip-encoded body that curl does not decode without `--compressed`. Without that flag the body reads as binary and every date regex returns nothing while the exit code stays 0, which is the SAME SILENT-FAILURE SHAPE as the arXiv http-versus-https trap recorded 2026-10-06. Rule, generalised from both: when a 200 response yields zero parsed records, check the byte count and the encoding before concluding the source is empty. blog.google/technology/google-deepmind/rss/ is a working alternative that needs no flag | n/a |
| ISO 25785-1, retrieval | RESOLVED 2026-09-18 by loading iso.org in a browser pane; curl still returns HTTP 403. Also corrected: catalogue ID 89619, retried on prior runs, is ISO/FDIS 25256 on road sweepers. The correct record is iso.org/standard/91469.html | n/a |
| Notified bodies designated under Reg (EU) 2023/1230 | **RE-READ 2026-10-19, ALL FOUR FILTERS. Reg (EU) 2023/1230 reads 43 for a THIRD consecutive time (10-14, 10-16, 10-19) and Dir 2006/42/EC reads 154 unchanged, so the ratio holds at 27.9% with 93 days to application; the single-unit noise rule did not fire and no name diff was attempted. Reg (EU) 2024/1689 reads 0 at 443 days and Reg (EU) 2024/2847 reads 0 at 130 days. PRIOR ENTRY: **RE-READ 2026-10-16, ALL FOUR FILTERS. Reg (EU) 2023/1230 reads 43 ACTIVE, unchanged, the first consecutive confirmation of that value. Directive 2006/42/EC reads 154, against 153 on 09-30 and 10-14, so the ratio is 27.9% against 28.1%, 96 days before the Regulation applies. The Directive line has now moved FOUR times, 153 (09-18) -> 152 (09-22) -> 153 (09-30, 10-14) -> 154 (10-16), which is why the stored instruction to treat single-unit moves on it as noise unless a name changes was applied: the move went in as a DIFF and no name diff was attempted. No name capture was run on the Regulation line either, since the count did not move, so the stored 43-name list is NOT re-verified as of 10-16. NEW RETRIEVAL STEP, do not rediscover it: the page serves a cookie notice before the application renders and "Accept only essential cookies" must be clicked before the "Search results (n)" heading exists in the DOM. Prior state follows.** **MOVED 2026-10-14, 41 -> 43 ACTIVE, the first name-level change this board has ever captured and the first movement on this line since 40 -> 41 on 2026-09-18. The two additions are NB 1637 SGS-TUV Saar GmbH (Germany) and NB 1179 SGS - Statutory Services Belgium vzw/asbl (Belgium), both absent from the complete 41-name list of 2026-09-30, and both SGS. Belgium enters the list for the first time; SGS now holds three with NB 0598 SGS FIMKO (Finland). Directive 2006/42/EC unchanged at 153, so the ratio is 28.1% against 26.8%, 98 days before application. Germany now 19 of 43, DGUV Test units 7 of 43. THE CAPTURE IS SOUND, which matters because the 2026-10-05 name diff was inconclusive from pagination instability: 30 rows on page 1 and 13 on page 2, no overlap, 43 total against a "Search results (43)" heading, and all 41 stored names present. HOST CORRECTED: use webgate.ec.europa.eu, not single-market-economy.ec.europa.eu, which 404s. NEXT ON THIS ROW: whether NB 1637 and NB 1179 also hold a Directive 2006/42/EC notification, which separates new capacity from an existing body adding a scope; page 1 of that filter shows neither but is 30 of 153 rows and proves nothing. Prior state follows.** 41 active, against 153 under Directive 2006/42/EC**, re-read 2026-09-30 with notification status Active. The Regulation line is unchanged from 09-22. The Directive line went 153 (09-18) to 152 (09-22) to 153 (09-30), so it has now moved twice and returned to its starting value; treat single-unit moves on that line as noise unless a name changes with them. Ratio 26.8%, against 27.0% on 09-22 and 26.1% on 09-18, 112 days before the Regulation applies. The complete 41-name list was captured on 09-30 across two pages with no overlap and is stored below, replacing the incomplete 37 from 09-22. RE-READ 2026-10-11: both counters unchanged, 41 and 153, ratio 26.8%, 101 days before the Regulation applies, a sixth consecutive reading at 41. The unfiltered total moved 1,566 (10-06) to 1,565, so treat single-unit moves on that line as noise too. **METHOD SUPERSEDED 2026-10-11, and this replaces the dropdown archaeology below. The application writes its filter into the URL and reads it back on navigation, so a run can go straight to `/single-market-compliance-space/notified-bodies/notified-body-list?filter=notificationStatusId:1,legislationId:N` and read the "Search results (n)" heading out of the DOM with `javascript_tool`. Omitting `notificationStatusId:1` gives the count at any status. Four legislation IDs are now stored: 162400 Reg (EU) 2023/1230, 131881 Dir 2006/42/EC, 168380 Reg (EU) 2024/1689, 167953 Reg (EU) 2024/2847. The browser pane cleared the emulated viewport twice and screenshots timed out three times during this read, while reading the heading out of the DOM worked every time. Do not re-derive this.** RE-READ 2026-10-05: both counters unchanged, 41 and 153, ratio 26.8%, 107 days before the Regulation applies. The name capture FAILED this run and the failure mode is now documented: the two pages returned 30 and 11 rows with 4 duplicated between them, so only 37 distinct names were seen. All 37 are in the stored list; the 4 not seen are NB 0408, NB 0556, NB 1411 and NB 2981. This is pagination instability, the same artefact that produced the incomplete 09-22 list, so the count stands and the name diff for 2026-10-05 is INCONCLUSIVE rather than four removals. METHOD CORRECTION, carry this forward: setting the legislation select value programmatically and dispatching input/change does NOT reach the application's own model and leaves the count at 1566. It must be done as real clicks in the browser pane, which requires a non-zero viewport, so call resize_window first. The legislation option value for Regulation (EU) 2023/1230 is 162400 and for Directive 2006/42/EC is 131881, read off the hidden select whose option labels are rendered in a separate overlay; those IDs are stored so a later run can skip the dropdown archaeology. Paging to 2 works with a JS click on the paginator | 2027-01-20 |
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
| Anthropic Cyber Verification Program, vendor-run capability vetting (NOT the first such regime; see the LSVP row, 2026-09-17) | **NEW to the watchlist 2026-10-07**, added because it is the only instrument on this board where the party selling the capability is also the party that verifies who may hold it, with no third party and no public register. Company post of 2026-10-06, `datePublished` 2026-10-06T19:00:00Z and `dateModified` 2026-10-07T08:52:51Z, so it landed after the 10-06 run was written. Project Glasswing and the prior CVP are merged into one programme with three tiers, each giving access to "Claude Opus 5.5, Claude Sonnet 5.5, Claude Mythos 5.1, and new models moving forward". Operative, read at source: "Each has different verification requirements and security controls." Defense Access covers SOC, incident response, malware reverse-engineering and vulnerability validation, with a few days' review. Red Team Access adds "authorized penetration testing and red-teaming", is "for organizations only", takes "a few weeks to review", and still blocks "deploying ransomware, damaging physical systems, or pen testing high-risk safety systems". Specialized Access "has the fewest cyber blocks" and is "reserved for a limited set of verified organizations that are authorized to test safety systems that could impact people's lives or disrupt markets, such as flight operating systems, power grids, telecom networks, interbank transfer infrastructure, and government administrative networks. For this tier, we currently review every organization in depth in collaboration with the US government." Price of entry: "Data retention is required for organizations enrolled in the program so that we can monitor for cyber misuse", relaxed when Enterprise Frontier Safeguards ships "later this fall". Self-reported efficacy on CyScenarioBench, five attempts at each of 10 challenges per tier: without CVP "every task was blocked on the first prompt"; Defense Access blocked 46 of 50 trials; Red Team Access blocked none and completed 34 of 50, against a stated 67.6% unsafeguarded success rate. Self-reported impact: Glasswing partners "uncovered at least 129,000 verified software vulnerabilities between April and July 2026", plus 5,500 from Anthropic's own open-source scanning April to October, "more than 33,000" rated critical or high, from "33 partner reports" with "fewer than 50% of partners disclosed patched numbers". WHY IT IS ON THE BOARD: it is the third credential-gating instrument in five days and the structural inverse of SEC Rule 501(a)(10)(iv), which makes independent verifiability a condition of a credential counting. Here verification is entirely in the vendor's gift and nothing about tier membership is published. NEXT ON THIS ROW: whether any tier decision is ever reviewable by anyone outside Anthropic and the US government | EFS "later this fall", no date |
| Reg (EU) 2024/1689 AI Act, Chapter III Section 4, notified bodies | **NEW to the watchlist 2026-10-11, and it is the lead of that brief.** Art. 113(b): "Chapter III Section 4, Chapter V, Chapter VII and Chapter XII and Article 78 shall apply from 2 August 2025, with the exception of Article 101". Chapter III Section 4 is headed "Notifying authorities and notified bodies" and opens at Article 28, "Each Member State shall designate or establish at least one notifying authority". The Commission's Single Market Compliance Space register, read 2026-10-11 under legislationId 168380, returns "Search results (0)" both with notificationStatusId:1 (Active) and with no status filter at all. So 435 days after the designation machinery applied, no body has been notified under the AI Act. **RE-READ 2026-10-16: still 0 at any status, now 440 days, a third consecutive reading at zero. The control holds: Reg (EU) 2023/1230 returns 43 on the same read.** **RE-READ 2026-10-14: still 0 at both filters, now 438 days, and the reading is sharper than on 10-11 because the same day produced the first harmonised standard under this Regulation. A standard conferring presumption of conformity now exists and nobody is authorised to assess against it.** The control that the register is not simply empty for every new instrument is Reg (EU) 2023/1230 itself, which returns 41 on the same read. Also from Art. 113: the Regulation applies from 2 August 2026, and Art. 6(1), the Annex I route that reaches machinery, from 2 August 2027. WHY IT IS ON THE BOARD: the eu-machinery-2027 live disagreement turns on whether anyone can assess an AI requirement in January 2027, and this is the first number on the "who" half of that question rather than the "against what" half. NEXT ON THIS ROW: whether any Member State has designated a notifying authority under Art. 28 even with no body notified, which is a different register and has not been looked for | Art. 6(1) 2027-08-02 |
| Reg (EU) 2024/2847, Cyber Resilience Act | **NEW to the watchlist 2026-10-11.** Two movements in one run. First, the register: legislationId 167953 returns "Search results (0)" with and without the Active filter, re-read 2026-10-16 and still 0 at 127 days, although Art. 71(2) provides "This Regulation shall apply from 11 December 2027. However, Article 14 shall apply from 11 September 2026 and Chapter IV (Articles 35 to 51) shall apply from 11 June 2026", and Chapter IV is the notification of conformity assessment bodies. That chapter has been open 122 days with nobody notified. Second, corrigendum `32024R2847R(08)`, OJ ref 2026/90847, published 2026-10-09, **Slovenian only**, 688 days after the OJ of 2024-11-20, and it is the eighth corrigendum to this act. It corrects Art. 3(17) so a distributor is a person who "omogoci dostopnost izdelka z digitalnimi elementi na trgu Unije" rather than one who "da izdelek z digitalnimi elementi na trg Unije": making available on the market, not placing on the market, which are distinct legal acts in EU product law carrying distinct obligations. It makes the same correction at Art. 14(7) third subparagraph point (c) and replaces "izdelovalcev" with "proizvajalcev" in the titles of Art. 21 and Art. 22, which are the articles that convert a distributor into a manufacturer. English Art. 3(17), read at source: "'distributor' means a natural or legal person in the supply chain, other than the manufacturer or the importer, that makes a product with digital elements available on the Union market without affecting its properties". Buried: none new; the obligation corrected is an existing one whose Slovenian scope was wrong. An eighth corrigendum to one Regulation is the second instance of the high-count pattern after the twentieth to the BRRD logged 2026-10-07 | applies 2027-12-11 |
| Anthropic Usage Policy, High-risk Physical Actions | **NEW to the watchlist 2026-10-11**, added because it is the first instrument on this board where a model vendor sets machinery-safety conditions over its customers' hardware by contract. Published 2026-10-08, and "The updated policy takes effect on November 12." Operative, read at source on the policy page: "Human control and independent safety limits for physical actions. For High-risk Physical Actions, there must be a qualified individual who is able to observe the equipment's operation and stop it at any time, and the equipment must stop or hold a safe state when that individual intervenes or when connection to our services is lost. Any operating limits to keep the equipment within safe bounds, such as speed, force, reach, temperature, pressure, voltage, energy output, dose, or operating area, must be enforced by the equipment or a controller independent of model output." Scope: six classes of hardware act, triggered "when outputs of our products and services are acted upon by hardware without human approval", being move through shared space, apply force that could cause injury, control hazardous energy or materials, act on the human body, control safety systems, run industrial processes. The disclaimer is the other half of the finding, verbatim: "These requirements apply alongside applicable law. For physical devices, they do not replace vehicle, aviation, medical device, machinery, or workplace safety law or certification." Context, out of window and not itself movement: the Model Hardware Standard research preview of 2026-08-27, "a shared specification for AI agents to safely operate physical devices". WHY IT IS ON THE BOARD: a contractual safe-state and independent-limit requirement over learned-policy hardware, 69 days before Machinery Reg (EU) 2023/1230 applies, with no third party, no register of who complies and no stated audit. Fourth credential-or-gating instrument from the same vendor in ten days, after Claude Frontier Academy (10-02), the CVP tiers (10-07) and the Cyber Mission (10-08). NEXT ON THIS ROW: whether any enforcement of it is ever published | in effect 2026-11-12 |
| FMCSA exemption regime for Level 4 ADS commercial motor vehicles | **NEW 2026-10-11**, and it is the mandate-side counterpart to the NHTSA row above. FR Doc 2026-20734, Docket FMCSA-2026-0958, published 2026-10-09: a limited five-year exemption to Aurora Operations, Inc. (USDOT #341156) "and other motor carriers operating Level 4 automated driving system (ADS)-equipped commercial motor vehicles (CMVs), with prior notice to FMCSA", from the warning-device placement, steady-burning lamp and warning-device type and number requirements, permitting cab-mounted warning beacons instead. THE ENTRY MECHANISM IS THE FINDING: a non-Aurora carrier enters by emailing "A statement that adequately demonstrates the motor carrier currently has cab-mounted warning beacons and the ability to comply with all terms and conditions of this exemption" plus, under 28 U.S.C. 1746, "I, [Name], certify under penalty of perjury that the foregoing is true and correct." No third party verifies anything. Oversight is an annual self-report due by 1 November covering CMVs operated, vehicle miles travelled and each beacon malfunction, and under term 8 that nonpublic information "will be treated as CBI" and withheld "to the greatest extent possible" where the carrier designates it. Operations are limited to "the validated Operational Design Domain for the specific ADS-equipped CMV", with no validator named. History the notice supplies: FMCSA denied Aurora's 2023 request because it would "exempt a class of unspecified carriers using unspecified equipment on unspecified vehicles" (89 FR 105675, 105679, 2024-12-27), and the cure accepted here was notification plus annual reports, not an outside check. Buried: none creating a third-party obligation, which is the point | five years from 2026-10-09; first annual report 2027-11-01 |
| Anthropic embedded evaluation, Accenture partnership | **NEW to the watchlist 2026-10-12, and it is the single largest miss this board has made.** Company post of 2026-09-18, `datePublished` 2026-09-18T16:00:00Z, absent from every file in reports/, data/ and logs/ until this run, so it sat unrecorded for 24 days while the board carried only the generic "Anthropic and OpenAI both committing to embedded third-party evaluators 2026-09-12". The post names the counterparty and the price. Operative, read at source: "We're partnering with Accenture on independent evaluation of frontier AI", the work "will be led by Faculty, Accenture's specialist AI business, and will include evaluating and red-teaming models, conducting alignment assessments, and testing model safeguards", and "Anthropic and Accenture each expect to invest at least $1 billion in building capacity in this area over the next five years". THE FUNDING STRUCTURE IS THE FINDING, not the figure: "Long-term, we think funding should come from pooled or government sources, as we called for in our [RFC] in June. As neither exists today, we plan to work with different evaluators under different funding arrangements. Given the importance and urgency of this work, Anthropic will fund Accenture's work directly." Buried, and it is the certification-capacity point in a new costume: "There are, as yet, no standards for what information embedded evaluators should have access to, or how they should report what they find. There is also no settled system for funding independent evaluation." Also stated: the access model, "Unlike today's external evaluators, embedded evaluators will work inside AI companies, with access comparable to an employee's", and the partnership "is non-exclusive", with other evaluators "to be announced in the coming weeks". So the audited party pays the auditor, with no standard governing access or the report, which is the DSA Art. 37 independence architecture inverted | other evaluators announced "in the coming weeks" from 2026-09-18 |
| Implementing Reg (EU) 2026/798, eIDAS remote onboarding to EUDI Wallets | **NEW 2026-10-13**, added on a corrigendum. Base act OJ 2026-04-08; Slovak corrigendum of 2026-10-13 at 188 days, OJ ref 2026/90863, replaces "významná" with "pokročilá" for assurance level "substantial" in the title, recital 2 and the Annex, so the ENGLISH TEXT IS UNCHANGED. The reason it is tracked is the provision the corrigendum touches, Annex section 2 point 9 amending point 8.2.4, which reads verbatim: "[CONDITIONAL] COL-8.2.4-02X: If the Baseline LoIP is targeted, the eID means shall have been notified at least at eIDAS LoA substantial or its assurance level shall have been confirmed by an accredited conformity assessment body defined in Article 2(13) of Regulation (EC) No 765/2008 or by an equivalent body, and, if all applicable requirements are fulfilled, the assessment shall result in a certificate of compliance based on a certification audit. This formal certification process shall be based on a security evaluation process that refers to the levels of assurance defined for notified electronic identification means or for certified European Digital Identity Wallets under Regulation (EU) No 910/2014". This is the first instrument on the board where state notification and a paid accredited-CAB certificate sit in ONE SENTENCE as alternatives, which is why it bears on assurance-seam. Bound: digital identity, not machinery or AI | in force; base act applies per its own Art., not re-read this run |
| Anthropic Life Sciences Verification Program | **NEW 2026-10-13**, recorded out of window and the CVP line below is wrong by date. Published 2026-09-17, TWENTY DAYS BEFORE the Cyber Verification Program post of 2026-10-06, and absent from every file in reports/, data/ and logs/ until now. Two grant tiers, not three: "Standard Use" renewed yearly and team-wide, "High-risk Use" renewed every six months and tied to "a single research project", which "removes all safeguards that block life sciences requests". Vetting is "a review of their research credentials, security standards, and ethical research oversight". No price published, no public register. State gate on the top tier: "We are working with the US government to make high-risk grants more broadly available for Claude Mythos". Payment in kind: "we are requiring data retention for 30 days". THE FINDING, and it is not the tier structure: "Because we vet the LSVP organizations for their life sciences credibility and oversight, we can empower them to specify for themselves what constitutes safe usage for teams or projects within their program." The vendor vets the buyer and then delegates the safety definition to the buyer it vetted. Also shifts enforcement "from real-time blocking ... to offline monitoring" | beta, applications open |
| CFTC compute derivatives contracts | **RESOLVED 2026-10-19 AND READ AT SOURCE, closing a three-run retrieval failure. The row is no longer a lead.** cftc.gov returns curl exit 60, a TLS failure, to every HTTP client and URL form, which is why 10-13, 10-14 and 10-16 all logged it unreachable; it loads in a browser pane on the first attempt, per the F3 escalation rule and gbrain concepts/browser-pane-retrieval. Release 9286-26 is dated 2026-08-19 and is OUT OF WINDOW, so it was carried in DIFFS and not as a MOVES item. Verbatim: the CFTC "issued a request for comment to better inform its understanding and oversight of derivatives markets in compute", and Chairman Michael S. Selig, whose full name this row previously lacked, said "America cannot win the AI race without a robust derivatives market for compute". THE OPERATIVE VEHICLE IS THE FEDERAL REGISTER NOTICE: FR Doc 2026-17163, published 2026-08-21, 91 FR 54259, COMMENTS CLOSE 2026-10-20, the day after this brief. Two of its questions are this board's own question in a regulator's words: "Would it be appropriate to permit trading in a derivative contract settling to a price computed from data that the Commission may not be able to observe, verify, or surveil, in whole or in part?" and "Have any audits, studies, or independent verifications of the transaction data referenced in question 1(c) above been conducted, and if so, what did they conclude?" The 10-13 quote from the crypto-asset proposed rule stands and is now corroborated at primary. NEXT: whether any comment filed by 2026-10-20 answers the independent-verification question. Nothing on the docket was read this run. | comments close 2026-10-20 |
| ITC Investigation 337-TA-1526, vertical power delivery for AI datacenters | **NEW to the watchlist 2026-10-14**, added because it is the first instrument on the datacenter and power axis since the EPA repeal of 2026-09-17 and the first that could stop AI server hardware at the US border. FR Doc 2026-20993, published 2026-10-14; complaint filed 2026-09-09 by Vicor Corporation of Andover, Massachusetts, supplemented 2026-09-10; Commission ordered institution 2026-10-09 under section 337 of the Tariff Act of 1930, 19 U.S.C. 1337, on claims of U.S. Patent No. 10,903,734. Plain-language scope, verbatim and this is the operative sentence: "vertical power delivery systems and components thereof, used in data center server, artificial intelligence and cloud computing systems, to power artificial intelligence (`AI') accelerators, tensor processing units (`TPU'), graphical processing units (`GPU') and central processing units (`CPU'), and computing systems containing the same". Relief requested: "a limited exclusion order and cease and desist orders". TWENTY respondents, this system's count of the names served: Delta Electronics (3 entities), Infineon Technologies AG, Luxshare (2), Monolithic Power Systems (3), Flex Ltd., Celestica Inc., Quanta (4), Hon Hai / Foxconn (3), Ingrasys (2). Buried: none creating a testing or certification obligation, and the absence is itself on-pattern. ALSO: "The Office of Unfair Import Investigations will not participate as a party in this investigation", so no government party sits in a proceeding that could exclude AI server power hardware. NEXT ON THIS ROW: the ALJ designation and the target date, neither set in this notice | ALJ to be designated; no date stated |
| Anthropic MOU with Singapore Ministry of Digital Development and Information | **NEW to the watchlist 2026-10-14.** Post of 2026-10-14, Singapore office opening plus MOU signed by Kai Fong Chng, Permanent Secretary, and Anthropic co-founder Ben Mann on the sidelines of Singapore International Cyber Week. Operative, read at source: it "sets out areas of cooperation in AI safety, security, and model evaluation; research on AI adoption and its impact; and responsible adoption across the public and private sectors", and under it the company plans "technical exchanges with Singapore's AI safety, security, and assurance institutions on model evaluation, testing standards, and incident response". Prior relationship stated: joined the IMDA / AI Verify Foundation Generative AI Evaluation Sandbox in 2023 and a later red-teaming project in English, Mandarin, Malay and Tamil. NO FIGURE, NO OBLIGATION, NO REPORTING STANDARD, and an MOU binds nobody. WHY IT IS ON THE BOARD: it is the fourth distinct evaluator arrangement from one vendor in 27 days, after LSVP (09-17), Accenture at USD 1bn a side (09-18) and the CVP tiers (10-06), and the FIRST whose counterparty is a state assurance institution rather than a paid vendor or a vetted customer. So the vendor now has one arrangement of each kind: it vets its customers, it pays its auditor, and it exchanges technique with a state body for free. NEXT ON THIS ROW: whether anything under the MOU is ever published | no date |
| Anthropic Genesis Mission commitment | **NEW 2026-10-14, recorded out of window and it is a miss by the 2026-10-11 run, which recovered 8 to 10 October.** Post of 2026-10-08, absent from every file in reports/, data/ and logs/ until now, so it sat unrecorded for six days. "Anthropic is deepening its support for American scientific research by committing $150 million over three years to the Genesis Mission, a federal initiative to accelerate scientific and technological discovery through AI." The funding "will go toward making Claude available to more than 15 agencies that are part of the mission, including NASA, the National Institutes of Health, and the National Science Foundation", announced at the White House OSTP "Science: A New Golden Age Summit". In kind, not cash: "Claude, Claude Code, and API credits to several hundred Genesis Mission research projects", plus training and onboarding. CORRECTION THIS POST FORCES: it describes the Model Hardware Standard as "a shared specification for AI agents to safely operate lab instruments", where this board stored "physical devices" from the 2026-08-27 preview. Buried: none | three years from 2026-10-08 |
| Dir (EU) 2023/2413, renewable energy, Art. 24 district heating | **NEW 2026-10-14, carried not promoted**, added on the datacenter and power axis because district heating is where datacenter waste heat goes and that axis has had one promoted item since 2026-09-17. Corrigendum of 2026-10-14, OJ ref 2026/90880, **German only**, 1,079 days after the OJ of 2023-10-31. Page 49, Art. 1 point 14(b) amending Art. 24(4b) of Dir (EU) 2018/2001: "mehr als 25 MWh" becomes "mehr als 25 MWth", so the threshold above which Member States must encourage district heating and cooling operators read as an energy quantity and now reads as thermal power. Buried: none, it creates no testing obligation. Instance of the single-language operative-word pattern, and the first where the error is a physical unit | not checked |
| Anthropic embedded evaluators, METR / SecureBio / Accenture / Hugging Face | **NEW to the watchlist 2026-10-16, and it is the lead of that brief. It also closes the NEXT on the Accenture row, which asked whether the other evaluators promised "in the coming weeks" on 2026-09-18 would be named: they were, 27 days later.** Post "An update on independent evaluators", `datePublished` 2026-10-15T17:20:00Z, `dateModified` 2026-10-15T23:35:48Z, with a stated footnote "Updated on October 15 to clarify SecureBio's current project terms". Operative, read at source: "we've started to give employee-like access to a team from METR, a nonprofit that evaluates frontier AI models", and "We've onboarded six METR employees with company hardware, office space, and access to internal tools and systems that are roughly on par with what our own risk assessment teams have access to". PUBLICATION RIGHTS, verbatim: "METR will publish its analysis of our risk levels, incidents, or practices. Anthropic can't veto publication, but we can require them to redact information if it falls into narrow, predefined categories like the ones above. METR is free to characterize our redactions publicly, and say whether it believes the redactions were justified, as long as it does so without revealing the redacted information." Carve-outs named: customer data, attorney-client privileged information, model architectures. THREE TIERS, a fourth tier structure from this vendor after LSVP, the CVP and the Usage Policy classes: tier 1 "narrowly scoped risk investigations", access decided by Anthropic, publication "with our approval"; tier 2 publication "without our approval" with category removal still available; tier 3 is the METR arrangement. **THE FINDING, and it is the independence criterion stated by the funder in its own words**: evaluators must have "Independence: they shouldn't hold equity in the company they're evaluating, or be financially or operationally dependent on it." The same post names Accenture as an evaluator, and the 2026-09-18 post says "Anthropic will fund Accenture's work directly". NOT ASSERTED AND NOT READ: whether METR receives money from Anthropic. The post does not say and the criterion discloses neither way, so the tension recorded here is between the published criterion and the Accenture funding arrangement, NOT between the criterion and METR. Other content: SecureBio "is in the process of reviewing the chemical and biological weapons chapter of our August Risk Report" after "completing and publishing a pilot review"; Hugging Face is in "early discussions"; the engagement is "limited to a small team operating under enforceable agreements" with other METR employees siloed. The analogy offered is bank supervision: "regulators assign resident examiners to work inside the largest banks". Voluntariness stated: "We're embedding evaluators voluntarily, and we believe every frontier AI company should do the same." Buried: none, it creates no obligation on anyone. NEXT ON THIS ROW: whether METR actually publishes, and what the first published analysis says about redactions | METR access live; no publication date stated |
| White House Accord on Super Intelligence | **NEW 2026-10-16, LEAD ONLY, NOT VERIFIED and nothing was read about it.** The Anthropic post of 2026-10-15 states "We also signed the White House Accord on Super Intelligence, in which companies pledged to partner with independent external auditors or evaluators." NOVELTY CHECKED: `grep -ril "Accord on Super"` across reports/, data/ and logs/ returns nothing, so this board has never logged it. It is plausibly connected to EO 14434 of 2026-09-29, already on the board, which mandates the "Super Intelligence" vocabulary across the executive branch. If a voluntary multi-company pledge to use external auditors exists, it is the first instrument on this board where several frontier labs commit to the same evaluator arrangement at once, which bears directly on the assurance-seam buyer question. NEXT ON THIS ROW, and it is the whole row: find the Accord text, its signatories and its date. whitehouse.gov was not fetched this run | unread |
| Implementing Decision (EU) 2026/2316, recognition of the RSB EU RED voluntary scheme | **NEW to the watchlist 2026-10-16**, added because it is the only instrument on this board where the Commission formally recognises a PRIVATE certification scheme as discharging a statutory compliance test, which is the assurance seam working in production in another sector. Of 15 October, published 2026-10-16, in force on the twentieth day after publication. Operative, read at source, Article 1: "The 'Roundtable on Sustainable Biomaterials (RSB) EU RED' voluntary scheme, as submitted to the Commission for recognition on 24 June 2021 and 30 September 2025, demonstrates, for renewable fuels and recycled carbon fuels audited under the scheme, the following:", then six limbs covering Art. 29(2) to (5) and (10) sustainability and greenhouse-gas criteria, the Delegated Reg (EU) 2019/807 low ILUC criteria, Art. 27(6) renewable-electricity share, Art. 29a(1) and (2) GHG savings for RFNBOs and recycled carbon fuels, and Art. 31a(2) accurate entry of information into the Union database. TERM AND MAINTENANCE, which is the part that prices the seat: Article 4, "It shall apply until 5 November 2031", so five years and twenty days; Article 3 repeals the predecessor Implementing Decision (EU) 2022/607 of 2022-04-08; Article 2 obliges the scheme to "notify the Commission" of any change "that might affect the justification for this Decision" "without delay", after which "The Commission shall assess the notified changes". TIMELINE, this system's arithmetic on the recital dates: recital 5 says the scheme requested recognition on 27 August 2020 and "The Commission assessed the scheme and identified some issues requiring amendments"; Article 1 dates the submissions recognised here to 24 June 2021 and 30 September 2025; recognition landed 2026-10-15, 2,240 days after the first request. Publication of the fact is a website entry, not a register: recital 14, the information "should be made available in the section on the Commission's 'Europa' website devoted to voluntary schemes". Recital 12 adds that the scheme "complies with Commission Implementing Regulation (EU) 2022/996", which sets the verification rules. Buried: none; it creates no new obligation and supplies a route to discharge one. Bound, state it whenever this row is cited: fuels sustainability, not machinery and not AI. NEXT ON THIS ROW: read Implementing Reg (EU) 2022/996 for the auditor-independence and accreditation requirements it imposes on a recognised scheme, which is the direct comparator to DSA Art. 37(3)(a) and to the Anthropic criterion above | applies until 2031-11-05 |
| OSHA Nationally Recognized Testing Laboratory regime, 29 CFR 1910.7 | **NEW to the watchlist 2026-10-16**, promoted from the UL 3300 row because this is the first NRTL action this board has read at source. FR Doc 2026-21172, Docket OSHA-2013-0016, published 2026-10-16, filed 2026-10-15, signed 2026-09-24 by Amanda Laihow: final decision granting Nemko North America, Inc. one additional recognised test site at Philip Pedersens Vei 11, 1366 Lysaker, Norway, "effective on October 16, 2026". **THE OPERATIVE SENTENCE IS A FEDERAL STATEMENT OF EXACTLY WHAT A THIRD-PARTY CERTIFICATION SEAT IS AND IS NOT**, verbatim: "Recognition is not a delegation or grant of government authority; however, recognition enables employers to use products approved by the NRTL to meet OSHA standards that require product testing and certification." Also: "Recognition is an acknowledgment that the organization can perform independent safety testing and certification of the specific products covered within the scope of recognition", and a scope comprises "(1) the type of products the NRTL may test, with each type specified by the applicable test standard; and (2) the recognized site(s) that has/have the technical capability". PROCESS COST, which is the certification-capacity figure this board keeps looking for, here as a duration rather than a price: NNA applied 2024-07-19; OSHA performed an on-site review 2025-08-25/26 in which "assessors found some nonconformances with the requirements of 29 CFR 1910.7"; the preliminary notice published 2026-08-21 (91 FR 54404) drew no comments; the final decision is 2026-10-16. That is 819 days from application to grant for a single test-site addition by an already-recognised body. Two Federal Register notices are required per application by Appendix A to 29 CFR 1910.7. Buried: the three standing conditions, that NNA inform OSHA "as soon as possible, in writing, of any change of ownership, facilities, or key personnel", meet all terms, and "continue to meet the requirements for recognition". NEXT ON THIS ROW: whether any NRTL scope has ever been expanded to a standard covering a learned policy, and what the OSHA NRTL list says about UL 3300 today | effective 2026-10-16 |
| Reg (EU) No 910/2014 eIDAS, Slovak assurance-level vocabulary | **NEW to the watchlist 2026-10-16, and it is a genuine divergence rather than a fifth instance of the corrigendum pattern.** 13th corrigendum to the base Regulation, OJ ref 2026/90869, published 2026-10-15, **Slovak only**, 4,431 days after the OJ of 2014-08-28. It corrects ELEVEN sites, the highest site count this board has logged in one corrigendum: recitals 15 and 16, Art. 6(1)(b) and (c), Art. 6(2), Art. 7(c), (d) and (e), Art. 8, Art. 9(1)(a), Art. 12(4)(a) and (b), Art. 12(6)(a) and (b), Art. 24(1) second subparagraph points (b) and (d), and Annex II point 1(c). It replaces "uroven zabezpecenia", level of security, with "uroven zaruky", level of assurance, and at level substantial replaces "pokrocila" with "vyznamna" (diacritics stripped here; the retrieved text carries them). Term counts in the retrieved text: "vyznamna" 10, "pokrocil" 12, "zaruk" 38, "zabezpecen" 36. **THE FINDING: two days earlier the Slovak corrigendum to its implementing act went the OTHER WAY.** `32026R0798R(02)`, OJ ref 2026/90863, published 2026-10-13 and already on the board, corrects a published Slovak text that read "urovni zabezpecenia 'vyznamna'" in the title and recital 2 and, at Annex section 2 point 9, "pokrocilej urovni zabezpecenia 'vyznamna'". Both directions were read at source on 2026-10-16. So the Slovak texts of the base Regulation and of its implementing Regulation now use different words for the same eIDAS assurance level, each set by a corrigendum two days apart. Article 8 is the assurance-levels article and Article 24(1) is the qualified-trust-service-provider identity verification article, so these are operative provisions and not recitals only. THIS IS A TEST OF THE RULE STATED 2026-10-14, that all-language corrigenda correct language-independent content while single-language corrigenda correct translations: the rule holds on its face, and the new information is that the translation correction is not converging. NEXT ON THIS ROW: whether a later corrigendum aligns the two, and whether the Slovak EUDI Wallet implementing acts use a third term | ongoing |
| Dir (EU) 2018/2001, renewable energy, Art. 29(10) GHG saving thresholds | **NEW 2026-10-16, carried not promoted.** 14th corrigendum, OJ ref 2026/90889, published 2026-10-16, **Dutch only**, 2,856 days after the OJ of 2018-12-21, correcting page 82, Article 29(10) points (b), (e), (f), (g) and (h), the greenhouse-gas emission saving percentage thresholds and the installation commissioning dates and thermal-input bands they attach to. On the board for one reason and it is a coincidence worth a diff rather than a claim: Implementing Decision (EU) 2026/2316, adopted one day earlier, recognises a private voluntary scheme to certify compliance with that same Article 29(10). So the paragraph a private scheme was just recognised to certify had its Dutch text corrected the next day. Buried: none, it creates no testing obligation. Fourteenth corrigendum to one Directive, against the twentieth to the BRRD logged 2026-10-07 and the eighth to the CRA logged 2026-10-11 | not checked |
| Anthropic Public Benefit Fund | **NEW to the watchlist 2026-10-19, and it is the lead of that brief.** Post "Investing in the public benefit", datePublished 2026-10-18T16:49:35.513Z, a Sunday. Operative, read at source: "Subject to stockholder approval, 5% of Anthropic's shares will be committed today, with an additional 2% added at the board's discretion for every 50% increase in the company's value above a set baseline." Structure: "We're establishing the Anthropic Public Benefit Fund as a wholly-owned LLC - rather than a 501(c)(3) or other format - to give adjustability between different forms of giving." Named example uses: "we might explore large donations to traditional nonprofits or direct distributions to specific populations." Aggregate, CUT FROM THE LEAD ON THE WORD CAP AND CARRIED HERE: "roughly 20% of Anthropic shares will be dedicated to the public good", counting the founders' 80%-of-equity pledge and an employee match in which "Approximately half of our employees participate". Limit stated: "None of the Anthropic equity held by the LLC will be used for lobbying or political giving, in the US or abroad." WHY IT IS ON THIS BOARD: it is three days after the 2026-10-15 post that set the evaluator independence test, that an evaluator "shouldn't hold equity in the company they're evaluating, or be financially or operationally dependent on it", and the evaluator given employee-like access, METR, is a nonprofit, while the Fund's named example use is large donations to nonprofits. NOT ASSERTED AND STILL UNREAD: whether the Fund will fund any evaluator, and whether METR receives money from Anthropic. The post does not say. NEXT: the promised disclosure, "In the coming months, we will share more about the Anthropic Public Benefit Fund's structure and governance, including the valuation milestones that may add to its stake", and "an upcoming public benefit report". | stockholder approval pending |
| Commission Delegated Directive (EU) 2026/2325, defence-related products | **NEW to the watchlist 2026-10-19**, added because it is the first instrument on the dual-use axis this board has read at source and it creates two dates 16 days after the Machinery Regulation applies. Published 2026-10-19, in force 2026-11-08, ELI http://data.europa.eu/eli/dir_del/2026/2325/oj. It replaces the whole Annex to Directive 2009/43/EC on intra-EU transfers of defence-related products, because, verbatim, "According to Article 13 of Directive 2009/43/EC that Annex is to strictly correspond to the Common Military List of the European Union", which the Council updated on 2026-02-23 (OJ C/2026/1640). Binds Member States: "Member States shall adopt and publish, by 31 January 2027 at the latest, the laws, regulations and administrative provisions necessary to comply with the Annex to this Directive referred to in Article 1", and "They shall apply those provisions from 5 February 2027." BURIED, and it is the part that matters here: the replaced Annex controls "Robots", "robot" controllers and "robot" "end-effectors" at ML17.e only where they are "Specially designed for military use", ballistic-hardened or EMP-rated, and the Annex's own definition of a "Robot" turns on three or more servo-devices plus "user-accessible programmability" by "the teach/playback method or by means of an electronic computer". Nothing in the definition refers to a learned policy, a model or training, and the Annex cross-references the EU Dual-Use list at Annex I to Reg (EU) 2021/821. NOT CHECKED: whether this definition differs from the Annex it replaces; the prior Annex was not diffed, so no claim of change or of continuity is made. | 2027-01-31 adopt, 2027-02-05 apply |
| Reg (EU) 2021/821, EU dual-use export control regime | **NEW to the watchlist 2026-10-19 on a corrigendum**, and it was cut from MOVES on the word cap with its full text carried in that brief's provenance. Eighth corrigendum, OJ ref 2026/90899, published 2026-10-19, **Greek only**, 1,956 days after the OJ of L 206 of 2021-06-11. It does not fix a page or an article; it replaces the regime's own scope term across the whole instrument. Verbatim: "Ο όρος «είδη διπλής χρήσης» αντικαθίσταται από τον όρο «αγαθά διττής χρήσης» στον τίτλο και σε ολόκληρο το κείμενο του κανονισμού στον οικείο γραμματικό τύπο." A second sentence does the same for «προϊόντα διπλής χρήσης». Both replaced terms mean dual-use items, so the published Greek text carried two different names for the Regulation's own subject and now carries a third. This is the widest-scope single-language corrigendum this board has logged, against single words and clauses in the eIDAS, RED, PLD and EIA instances. Note the adjacency, recorded not argued: Reg (EU) 2021/821 Annex I is the list the defence-products Annex published in the same OJ cross-references. | none stated |
| DHS FASCSA exclusion and removal order, DeepSeek | **NEW to the watchlist 2026-10-20, and it is the lead of that brief. First instrument on this board that makes MODEL LINEAGE a procurement compliance test.** FR Doc 2026-21447, 91 FR 66346, published 2026-10-20, filed 10-19, DHS Docket DHS-2026-0628, signed for DHS by General Counsel James H. Percival II. Authority: "Pursuant to the authority granted by the Federal Acquisition Supply Chain Security Act of 2018, 41 U.S.C. 1321-1328, and implementing regulations at 41 CFR 201-1, following review of the Federal Acquisition Security Council Recommendation and affiliated evidence". Two operative limbs, read at source: "(1) exclusion of information technology products and services developed by Hangzhou DeepSeek Artificial Intelligence Co., Ltd (DeepSeek), to include affiliated entities as defined in 48 CFR 2.101, from federal civilian agency procurements; and (2) removal of all DeepSeek and DeepSeek-affiliate products, and third-party products and services developed using DeepSeek implementations, from civilian agency information technology". THE BURIED FIELD IS THE WHOLE POINT: the second limb reaches products DeepSeek did not make, and the notice states no method for establishing that a third-party product was developed using a DeepSeek implementation and names no verifier. The signed order itself is in an Appendix printed as images across pages 66347 to 66350 and was NOT read; only the notice text was read, and the Appendix is the next retrieval. | regulations.gov Docket DHS-2026-0628 |
| CAISSI, US Center for Advancing Innovation and Standards for Super Intelligence | **NEW to the watchlist 2026-10-20, recorded OUT OF WINDOW and zero prior mentions on this board.** Named in the Anthropic post "Strengthening our defenses against distillation attacks", datePublished 2026-10-12, which the 13 October run did not record. Operative, read at source: CAISSI "has since assessed GLM-5.3 to be the most cyber-capable open-weights model released to date". That is a US government body performing third-party capability assessment of a foreign open-weights model and publishing a ranking. NOT YET VERIFIED AND DO NOT ASSERT IT: nothing read this run establishes that CAISSI is a renamed AI Safety Institute, and the Federal Register returns count 0 for the term CAISSI, so the body has no primary-source footprint on this board yet. That search is the next step on this row. Note the adjacency to EO 14434 of 2026-10-02, which ordered "Super Intelligence" and "SI" to replace "Artificial Intelligence" in executive-branch usage; the adjacency is suggestive and is NOT evidence. | find CAISSI at primary |
| Implementing Decision (EU) 2026/2267, Reg (EU) 2024/1244 industrial reporting format | **NEW 2026-10-20, carried as a DIFF not a MOVES item after the word cap forced the demotion.** Adopted 13 October, published 2026-10-20, repeals Implementing Decision (EU) 2019/1741, applies from 2028-01-01. Headline is burden reduction: from reporting year 2028 a Member State may "verify and, if necessary, update the prefilled templates and submit them to the Commission". BURIED, and it is why the row exists, in the Annex definition of recycled polymers: "Chemically recycled content shall only be reported where supported by supplier certification or mass balance documentation." A supplier certificate is made the evidentiary gate for a reported figure, which is the assurance pattern appearing inside an instrument whose stated purpose is to reduce paperwork. Companion act 32026D2326 of the same day amends Implementing Decision (EU) 2018/1135 under Dir 2010/75/EU and contains NO match for verif, accredit, conformity, third part or certif in 28,966 characters, so it is recorded as read and empty rather than unread. | 2028-01-01 |
| corrigendum pattern, cross-instrument | **PATTERN, stated once on 2026-10-05 so later runs stop rediscovering it. BROKEN 2026-10-12, do not carry the single-language claim forward unqualified.** The fifth corrigendum in the series was issued in ALL language versions at once: `32025R2643R(01)`, OJ ref 2026/90862, published 2026-10-12, correcting the EDIP Regulation (EU) 2025/2643 at 287 days after the OJ of 2025-12-29. On page 50, Article 35(7), second sentence: for "The Council may amend the project proposals referred to in paragraph 4 acting by qualified majority.", read "The Council may amend the proposals referred to in paragraph 3 acting by qualified majority." That is an internal cross-reference and a dropped word, not a substantive term, and the EDIP Regulation is not otherwise on this board. So the pattern is four single-language operative-word changes plus one all-language cross-reference fix, and the open question below about whether a single-language change creates a divergent obligation is unaffected by it. Original pattern text follows. Four single-language corrigenda across three runs, each changing an operative word in exactly one language version, at 67, 73, 680 and 5,364 days after publication: German on Reg (EU) 2026/1744 Art. 6(1b), the override clause (09-29); Italian on Reg (EU) 2026/1738 Annex VIII (10-05); Dutch on Dir (EU) 2024/2853, the FOSS carve-out (09-29); Danish on Dir 2011/92/EU Annex II, the screening list (10-05). THE QUESTION THE PATTERN POINTS AT, and nothing on this board tests it: whether a manufacturer who relied on the uncorrected national text for 67, 680 or 5,364 days had a defence. RETRIEVAL, settled: `tools/eurlex.mjs get` and the CELEX REST route both 404 on every `R(nn)` CELEX. The route that works on all of them is SPARQL for the expression URI on `cdm:resource_legal_id_celex`, then a CELLAR fetch of `<uuid>.0001` with `Accept: application/xhtml+xml`. Make that the default for corrigenda rather than retrying `get` | ongoing. **DEVELOPED 2026-10-06, and this is the first movement on the pattern rather than a fifth instance.** Implementing Regulation (EU) 2026/2214 corrects three language versions of a certification Regulation using an amending act with a stated entry into force 20 days out, not a corrigendum, and each recital gives the reason: the error "affects the substance". So the Commission's own practice distinguishes the two cases. A corrigendum is used where the correction is treated as always having been the text; a Regulation is used where it is not. That is the instrument-side answer to the reliance question, and it is not the same as a court having decided it. **DEVELOPED AGAIN 2026-10-07, and the development is volume.** Six corrigenda appeared in one OJ issue, six of the eleven sector-3 documents published that day, which is the highest single-issue count this board has logged. Five have no English expression at all: `32024R1739R(01)` Dutch on Council Reg (EU) 2024/1739 amending the Ukraine restrictive-measures Regulation 269/2014, rewording the Art. 9(1) anti-circumvention prohibition 835 days on; `32017R0392R(03)` Dutch, Slovenian, Latvian and Greek on Commission Del Reg (EU) 2017/392, the CSDR technical standards, replacing in Art. 70(6) "beveiligingssystemen" with "effectensystemen", so for 3,498 days the Dutch text obliged a central securities depository to report the performance of its *security* systems to "de bevoegde autoriteit" where the instrument means its *securities* systems; `32008L0115R(05)` Hungarian on the Return Directive; `32014L0059R(20)` Swedish on the BRRD, a twentieth corrigendum to one Directive; and `32026D1347R(01)`. The sixth, `32024L1799R(03)` on Dir (EU) 2024/1799 on the repair of goods, is the only one with English text and corrects a footnote number from 29 to 30 in Article 18, 819 days on, so it is trivial. THE PATTERN NOW HAS A SECOND AXIS: not only how long an operative word can read wrong in one language, but that the single-language corrigendum is routine traffic rather than a rarity, which weakens any reading of the four earlier instances as a cluster. Nothing on this board still tests the reliance question itself. **DEVELOPED AGAIN 2026-10-14, and this is the first rule the pattern supports rather than another instance.** Dir (EU) 2024/2841 on the European Disability Card was corrected in ALL 24 language versions at once on 2026-10-13, OJ ref 2026/90860, 698 days after the OJ of 2024-11-14, and what it corrects is Annex II point 2 second indent, where the colour named "yellow" read "CMYK 94, 63, 7, 1" against "RGB 255, 237, 0" and now reads "CMYK 0, 7, 100, 0". The CMYK value as published was a blue. Read with the all-language EDIP cross-reference fix of 2026-10-12, the rule is: ALL-LANGUAGE corrigenda correct language-INDEPENDENT content, numbers and cross-references, while SINGLE-LANGUAGE corrigenda correct translations. The Machinery Reg 2023/1230 Swedish corrigendum of the same window fits the second half, and the Dir 2023/2413 German MWh/MWth fix fits it too. A later run should test the rule rather than count instances. Fourth corrigendum to Reg (EU) 2023/1230 logged 2026-10-14, OJ ref 2026/90875, Swedish only, 1,203 days after the OJ of 2023-06-29: Annex V Section A point 6 read "Foremalet for forsakran i punkt 6", pointing at itself, and now reads "punkt 5". English point 6 reads "The object of the declaration referred to in point 5 is in conformity with the following Union harmonisation legislation." Annex V Section A is the EU declaration of conformity template, the document the manufacturer signs, and the Swedish version of it was self-referential for 1,203 days ending 98 days before the Regulation applies |

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
| free public robot-manipulation evaluation benchmarks | **MOVED 2026-10-21, 5 -> 7.** Was 5 on 2026-10-20: lbm_eval (TRI), RoboArena (Berkeley), RoboVAD (Zenodo 22754659), RoboValue (arXiv 2610.26663) and HandsOn (arXiv 2610.26765). Now 7, adding HATCH (arXiv 2610.27485, 20 October, "an openly specified, physically replicable, sensor-scored, and unrehearsable benchmark", with task specifications, build guide, bill of materials and scoring rubrics "released under an open license") and RoboCasa-Shift (arXiv 2610.27861, 20 October, built on RoboCasa365, 1,040 formal rollouts against GR00T N1.5, code at github.com/HaochengWang23/RoboCasa-Shift). An eighth adjacent artefact was NOT counted on this line and is recorded here instead, because it benchmarks judges rather than manipulation policies: RoboJudge-Bench (arXiv 2610.27782, 20 October), 800 human-annotated videos from 8 corpora and 10 generators, plus RoboJudge-Train at 12K videos and 25K human-verified scores; the fine-tuned RoboJudge-9B reaches "a Pearson correlation of 0.719". EVERY ONE OF THE SEVEN IS BUILDER-SUPPLIED AND FREE, which is the commons argument arriving for an eighth and ninth time on this exact line, and HATCH is the sharpest instance yet, because its first sentence makes the assurance thesis's case and its last sentence gives the method away | 2026-10-21 | own count |
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
| aerial robotics and defence drones, first round tracked | PDW Holdings, Inc., 400 Diamond Drive NW, Huntsville, Alabama, Delaware-incorporated, trading as Performance Drone Works and self-described as "Defense Drones & Aerial Robotics"; SIC "Aircraft". New Form D (isAmendment false) in the EDGAR index of 2026-10-06, signature date 2026-10-05, date of first sale 2026-09-21: totalOfferingAmount 52,200,194, totalAmountSold 52,200,194, totalRemaining 0, Rule 506(b) (exemption 06b), equity, minimum investment 0, two investors, no non-accredited investors, revenue range "Decline to Disclose". Sales compensation recipient Houlihan Lokey Capital, Inc., CRD 17708, with finders fees estimated at 2,100,000 and sales commissions 0, solicited in 20 states plus foreign. A Form D names no lead and no valuation. Named directors on the filing include Nicholas Horbaczewski, Samantha Greenberg, David Spirk and Raymond Thomas III; James Slider is listed as executive officer and director. The company's own site states that "The Department of War's Office of Strategic Capital has announced a commitment to Performance Drone Works to help expand domestic manufacturing of the critical technologies behind the next generation of drones, robotics, and mission-capable systems", with no figure attached and no date read | 2026-10-07 | SEC Form D and company site |
| credentialed capability access, first vendor-run tier regime tracked | **CORRECTED 2026-10-13: the first is the Life Sciences Verification Program of 2026-09-17, not the CVP of 2026-10-06, which is twenty days later. Neither publishes a price, so this line still has no number.** Anthropic Cyber Verification Program, three tiers, no price published and no public register of who holds which tier. Payment is in kind: "Data retention is required for organizations enrolled in the program." Third credential-gating instrument on this board in five days, after Claude Frontier Academy at USD 10,000 a head (2026-10-02) and the SEC's proposed FINRA accredited-investor exam at USD 100 (2026-10-05). Unlike either of those, the examiner here also sells the thing being gated | 2026-10-07 | company post |
| compute round, recorded not reported | Athanor Compute, Inc., 123 Townsend Street, San Francisco, incorporated 2026. Form D accepted 2026-10-09: totalOfferingAmount 150,000,000, totalAmountSold 124,999,998, date of first sale 2026-09-02, industry self-reported "Other Technology", revenue range "Decline to Disclose". Named on the filing: Tomas Puig (executive officer and director), Alok Pandey (executive officer and director), Curtis Mo (executive officer), Matthew Roberts (director). A Form D names no lead and no valuation. DROPPED FROM MOVES, and on the sources test rather than the floor: no company release, no company site and no secondary-database record were located, so the charter's `sells` field cannot be filled and the name is the only evidence of sector. Four candidate domains were tried and none resolved to the company. This is the Metaview precedent of 2026-10-06. It moves no tracked line: the largest AI-infrastructure round tracked remains Crusoe at $3.9B | 2026-10-11 | SEC Form D |
| datacenter vehicle, recorded not reported | Good Bull Data Centers, LP, Delaware, general partner Good Bull Data Centers GP LLC of The Woodlands, Texas, formed 2026. Form D of 2026-10-08: totalOfferingAmount 40,000,000, totalAmountSold 820,783, totalRemaining 39,179,217, 9 investors, minimum investment accepted 1, first sale 2026-08-31, industry self-reported "Commercial". An intention rather than a round, and recorded only because the datacenter and power row has had nothing on it for four consecutive runs | 2026-10-11 | SEC Form D |
| independent AI evaluation, first committed spend tracked | Anthropic and Accenture, "at least $1 billion" each over five years, so at least USD 2,000,000,000 committed in total on the companies' own statement. Work led by Faculty, Accenture's specialist AI business. Paid directly by the audited party: "Anthropic will fund Accenture's work directly", pending pooled or government funding that the post says does not exist. No per-engagement price, no headcount and no report standard published. THIS IS THE FIRST NAMED, PRICED BUYER OF THIRD-PARTY EVALUATION ON THIS BOARD and it answers the assurance-seam kill test in the affirmative on the buyer question while leaving the independence question open. Recorded 2026-10-12 from a post of 2026-09-18, 24 days late | 2026-10-12 | company release, Anthropic |
| universal/reconfigurable processor for physical AI, first round tracked | Ubitium GmbH, Dusseldorf. Release dated "13 OCTOBER 2026": "$14 million in new seed funding", led by Ibex Investors with OpenOcean, KBC Focus Fund, Runa Capital, Inflection, and Quantum Systems co-founder and co-CEO Florian Seibel "investing personally". "It brings Ubitium’s total seed funding to $18 million since the company was founded in 2024." No valuation stated. Built: "the UB108 with 256 processing elements, manufactured on Samsung’s 8nm process". Next: "the UB410 with 4,096 processing elements, and deliver evaluation units in 2027". Does NOT move the non-NVIDIA inference silicon largest-round line, which stays at EUCLYD | 2026-10-13 | company release |
| humanoid round, recorded not promoted | Astribot / Stardust Intelligence, Shenzhen. Announced 2026-10-13: "a new 1 billion yuan (approximately $149.4 million) funding round", "lifting its valuation to 15 billion yuan (approximately $2.2 billion)", led by "Toukong Donghai (Shenzhen Investment Holdings)" with Hongtai Fund, Ninghai Xingtaihe Fund managed by Guanghua Yangguang, Shanheng Capital, and existing shareholder Xianmu adding. "Since March 2026, the company has completed Series A+, Series A++, Series B, and the current round." "Combined production capacity for the S and T series has now reached the 10,000-unit level." SECONDARY-PRESS ONLY: astribot.com/en/news renders client-side and returned no text; no company release located; sources disagree on the cumulative total, so none is recorded. The conversions are the source’s, not computed here. Does NOT move the largest robotics round, which stays at D-Robotics US$400M | 2026-10-13 | secondary-press |
| named embedded evaluators at one frontier lab | **MOVED 2026-10-16, 1 -> 3 named plus 1 in discussion.** Was Accenture alone, recorded 2026-10-12 from the post of 2026-09-18. Now METR (six employees onboarded with employee-like access, tier 3), SecureBio (reviewing the CBRN chapter of the August 2026 Risk Report, tier 1 or 2, terms clarified in the 15 October update) and Accenture with Faculty, plus Hugging Face in "early discussions". NO PRICE IS PUBLISHED FOR ANY OF THEM except Accenture. So the committed-spend line below is still the only figure on this row, and it is attached to the one arrangement the vendor's own published independence criterion does not obviously cover | 2026-10-16 | company post, Anthropic |
| third-party certification seat, first duration tracked from application to grant | 819 days. OSHA NRTL: Nemko North America applied 2024-07-19 to add ONE test site to an existing recognition; on-site review 2025-08-25/26 found "some nonconformances"; preliminary notice 2026-08-21; final grant effective 2026-10-16. No fee is stated in the notice. The comparator on the EU side, also a duration and not a price: the RSB EU RED voluntary scheme first requested Commission recognition on 2020-08-27 and was recognised on 2026-10-15, 2,240 days. BOTH ARE DURATIONS, NOT PRICES, and the §1 gap on what a notified body charges is still open | 2026-10-16 | Federal Register and OJ |
| testing market, largest priced transaction tracked | **NEW 2026-10-21 and it is the lead of that brief. THE BOARD HAD NO PRICE ON A TESTING MARKET AT ALL BEFORE THIS.** Teradyne, Inc. agreed on 2026-10-06 to buy from FormFactor, Inc. "an aggregate of 2,234,887 shares of the Company's common stock" for "aggregate cash consideration of approximately $300.0 million", a private placement under Securities Act Section 4(a)(2), expected to close in Q4 fiscal 2026. 8-K filed 2026-10-13 for the 6 October agreement; press release 2026-10-12; Form D accepted 2026-10-20, isAmendment false, totalOfferingAmount 300,000,056 and totalAmountSold 300,000,056, ONE investor, date of first sale 2026-10-06, equity, exemption 06b. 8-K signed by Alan Chan, SVP and Chief Legal Officer. Teradyne CEO Gregory Smith: "By investing in FormFactor and combining our leading-edge test platforms with FormFactor's probe and interface expertise, we're building a more complete, validated path to production for our shared customers, and reinforcing our commitment to an open, interoperable ecosystem." FormFactor CEO Mike Slessor: "The semiconductor industry is entering a period where test performance, scalability, and time-to-market are becoming decisive competitive advantages". THE BOUND, and carry it every time this line is cited: this is PRODUCTION TEST OF SILICON bought by a test-equipment vendor taking a supply-chain stake, not a third party attesting to a learned policy, and the property under test is measurable by an instrument. It does NOT answer the assurance-seam kill test. Teradyne also owns Universal Robots and Mobile Industrial Robots, which is recorded and NOT used, because nothing read connects the collaboration to robotics | 2026-10-21 | SEC 8-K, company release and SEC Form D |
| AI-infrastructure round, second-largest tracked | **NEW 2026-10-21.** Modal Labs, Inc., 233 Spring Street New York. Form D accepted 2026-10-20, isAmendment false: totalOfferingAmount 800,000,000, totalAmountSold 601,892,375, totalRemaining 198,107,625, 18 investors, date of first sale 2026-10-01, equity, exemption 06b, revenue range "Decline to Disclose". Related persons include Erik Bernhardsson, Sarah Catanzaro, Patrick Chase, Seth Zelnick and Akshat Bubna. Company post of 2026-10-14 by Bernhardsson: "To keep building what's next, we've raised a $750M Series D at a $15.75B post-money valuation. Accel led the round." and "We recently crossed $1B in annualized run rate with no sign of slowing down.", the latter being the company's claim about its own business. Prior round on the same blog: "Series C: Raising $355M at a $4.65B valuation", dated 2026-05-21, so post-money went 4.65 to 15.75 in 146 days, which is this system's arithmetic on the company's own two figures. THE GAP IS STATED AND NOT RECONCILED: the company says $750M raised, the Form D reports 601,892,375 sold against an 800,000,000 authorisation. This is the CScale shape of 2026-10-02 inverted, where the authorisation exceeded the announcement. Sells "Cloud infrastructure for teams that develop, train, and serve AI applications at scale", the company's own meta description. Does NOT move the largest AI-infrastructure round, which stays Crusoe at $3.9B | 2026-10-21 | SEC Form D and company release |
| robotics-sector round, largest tracked | D-Robotics, US$400M Series C. Primary release names no investor, only "a leading global internet company, alongside with top-tier investment institutions"; no valuation. Cumulative Sunrise chip shipments "exceeded 8 million units" | 2026-09-17 | company release |
| frontier-lab equity committed to a public-benefit vehicle, first tracked | Anthropic Public Benefit Fund, announced 2026-10-18: "5% of Anthropic's shares will be committed today", subject to stockholder approval, with "an additional 2% added at the board's discretion for every 50% increase in the company's value above a set baseline", held in a "wholly-owned LLC" rather than a 501(c)(3). With the founders' 80%-of-equity pledge and an employee match, "roughly 20% of Anthropic shares will be dedicated to the public good". No dollar figure is stated and none is inferred here, because no valuation appears in the post | 2026-10-19 | company post |
| memory and GPU pooling infrastructure, first round tracked | Liqid Inc., Westminster, Colorado, Delaware-incorporated, CIK 1620971. Form D accepted 2026-10-19, isAmendment false: totalOfferingAmount 28,450,000, totalAmountSold 26,950,000, totalRemaining 1,500,000, 16 investors, date of first sale 2026-05-12, revenue range "Decline to Disclose", federal exemption 06b. Related persons include Richard Hegberg, Sumit Puri, Ashish Puri, Ryan Pollock, Andrew Dye, David Larson, John Byrne and Kevin Connors. No round name, no lead and no valuation are stated and none was inferred. Company's own site, retrieved 2026-10-20, titles itself "Memory & GPU Pooling Infrastructure" and claims of its own product "5x more tokens per dollar and 2x more tokens per watt". No company release was located in window. **This is the first F1 qualifying item after FOUR consecutive runs with none.** | 2026-10-19 |
| compute-named venture fund, first tracked | Lux Compute Leaders, L.P., New York. Form D accepted 2026-10-19, isAmendment false, industryGroupType "Pooled Investment Fund": totalOfferingAmount 300,000,000, totalAmountSold 0, totalRemaining 300,000,000, 0 investors, date of first sale yetToOccur true. Recorded not reported, on the Pillbot SPV precedent: a fund naming compute in its own name at $300M with nothing yet raised evidences intent, not a commitment, and the ledger must not read it as capital deployed. | 2026-10-19 |
| Form D above floor, dropped on the sector test, largest parsed | Ramp Business Corp, 28 West 23rd Street New York. Form D accepted 2026-10-16, isAmendment false: totalOfferingAmount 1,850,000,000 and totalAmountSold 1,585,000,000, self-reported industry "Other Technology", revenue range "Decline to Disclose", related persons including Eric Glyman, Karim Atiyeh and Keith Rabois. Largest Form D this system has parsed. Sells corporate spend management, which matches no tracked sector and no live thesis, so DROPPED ON SECTOR not floor, the Metaview, Athanor, Sapphire and Curadel precedent. No company release located in window | 2026-10-19 | primary-filing |
| Form D above floor, dropped on the sector test, recorded not reported | Memazing, Inc., 344 Nassau Street Princeton, incorporated 2025. Form D accepted 2026-10-16: totalOfferingAmount 26,244,981, totalAmountSold 15,404,990, date of first sale 2026-09-30, self-reported "Other Technology", executive officer and director Hyunjune Seung. What it sells was not established at source and is not guessed here. Also above floor and dropped: Estuary Biotherapeutics, Inc., totalOfferingAmount 103,654,385 and totalAmountSold 40,654,685, self-reported "Biotechnology" | 2026-10-19 | primary-filing |

---

## theses

| id | claim | state | kill test | last moved |
|---|---|---|---|---|
| assurance-seam | A neutral party that can state with validity what a learned policy does becomes structurally necessary | **contested, and 2026-10-16 adds a THIRD axis the thesis did not have: not whether a buyer pays, nor whether validity is attainable, but whether the paid evaluator meets the funder's own published independence test** | Does any buyer pay for third-party attestation rather than open-sourcing the tool or using its own telemetry | 2026-10-16. SUPPORTING on the validity half and WEAKENING on the buyer half, in the same two items, which is why neither direction is promoted over the other. SUPPORTING: a group with no stake in Bench2Drive found that the dominant closed-loop driving benchmark's comfort metric "mostly measures how long a vehicle stays stationary, correlating with stationary time at r = 0.97 across eight models" (arXiv 2610.21741, 15 October), and a corrected distance-based metric "cuts that correlation to r = 0.06". That is a measurement-validity failure in the field's own instrument that only an outside party found, which is the thesis's own claim demonstrated. WEAKENING: the finding and the fixes are free, "We will release all fixes as standalone code", and nobody paid for the audit, which is the commons argument arriving again. THE NEW AXIS, and it comes from the lead: Anthropic published the independence criterion an evaluator must meet, that it "shouldn't hold equity in the company they're evaluating, or be financially or operationally dependent on it", and in the same post named Accenture, whose work it funds directly, as an evaluator. So the single named, priced buyer of third-party evaluation on this board is the arrangement that the buyer's own published test does not obviously cover. The kill test is still answered yes on its face and the answer is now qualified by the funder's own words. PRIOR READING, carried: 2026-10-14. SUPPORTING on the mandate half, and it completes a shape this board has been assembling since 11 October: the EU now has a cited harmonised standard under the AI Act (EN 18286:2026, in force 2026-10-14) conferring presumption of conformity, reaching machinery through Article 20(10), with zero bodies notified under that Regulation to assess against it on the same day's register read. So the 10-11 finding has its other half: not only a mandate nobody is authorised to discharge, but now a method nobody is authorised to apply. The bound: EN 18286 answers AI Act Article 17 on quality management systems, so what it discharges is narrow and does not reach the Machinery Annex III requirements that Annex I Part A item 5 routes through a notified body. WEAKENING at equal prominence, and it is the surviving form rather than this row: see the next row on RoboFQE. Prior state, 2026-10-11. The 10-07 restatement, that the thesis turns on mandate rather than artefact type, survived contact but got narrower again: a mandate with no notified body is not yet a buyer. The AI Act's designation machinery has run 435 days and the Cyber Resilience Act's 122 days with zero bodies on the Commission's own register, so two mandates exist that nobody has yet been authorised to discharge. Prior state, 2026-10-07. The platform-versus-physical split proposed on 10-06 did not survive one day: on 10-07 the platform side produced vendor-run vetting with no third party (Anthropic CVP) and the physical side produced a third-party framework with no buyer (Mcity AV). What separates the cases is whether anyone is obliged to pay, not what kind of artefact it is |
| assurance-seam, surviving form | Production telemetry cannot establish whether an OTA update is a regression, because the previous policy cannot be run counterfactually without surrendering throughput | **contested, and the kill test may have fired** | Show one buyer paying for paired non-regression testing | 2026-10-14. WEAKENED, and the mechanism claim is the part that moved rather than the kill test. RoboFQE (arXiv 2610.18699, 13 October) estimates a target policy's discounted expected return from offline robot trajectories with no rollouts, no simulator and no behaviour-policy density, and reports that it "preserves policy rankings even on long-horizon manipulation tasks where video world-model evaluators are degraded by autoregressive prediction errors". The thesis says the previous policy cannot be run counterfactually without surrendering throughput; off-policy evaluation does not run it at all. The bound, unchanged from every prior instance and the reason this is weakened and not fired: the method is free on arXiv, the kill test names a buyer paying for paired non-regression testing, and nobody is paying. The abstract carries no headline number, so this is a qualitative claim, self-reported and unreplicated. Prior state 2026-10-05 |
| twin-certification | Nobody certifies the twin; SRCC-style validity claims are the sellable product | **live, and weakened again 2026-10-16: VeriVLA (arXiv 2610.21985, 15 October) puts the verifier INSIDE the policy, a JEPA-based latent world model ranking the policy's own candidate action chunks, raising "the average completion score from 50.8% to 65.5%" at "326 ms for sampling and verification per triggered decision on a single RTX 4090". That is the same shape as Argon on 2026-10-13, the builder supplying the test, now at runtime rather than at twin-construction time. Self-reported, not replicated, no pushback in window. Prior state: weakened 2026-10-13, the twin’s builder now also supplies the validity test.** Google DeepMind’s Gemini 4 Argon reconstructs "physically calibrated simulation twins" from a camera feed, a human video or a hand-drawn sketch, then holds them to "two verification objectives", visual match across three cameras and "physical match: the simulated contact force/torque on each Sharpa fingertip, in the sensor frame, matches the logged tactile_force in timing, magnitude and direction". The anti-gaming rules are PROMPT TEXT, not audit: "No sim cheating", no external forces or welds after t=0, no "reporting contact forces that don’t come from the MuJoCo solver". Measured transfer, vendor’s own and unreproduced: 4,500+ generated episodes took real-world Success Rate "56% to 75%" and completion "35s to 24s". THE BOUND, and it is why this is weakens and not fires: the kill test names NVIDIA or Lightwheel self-certifying or a notified body accepting vendor sim evidence unaudited, and NEITHER happened. Nobody certified anything and no regulator was involved, so what moved is who holds the method, not who holds the seat | Show NVIDIA or Lightwheel successfully self-certifying, or a notified body accepting vendor sim evidence unaudited | 2026-10-14. WEAKENED AGAIN AND FROM THE OTHER SIDE, which is why it is recorded rather than folded into yesterday. On 13 October Argon put the twin and its validity test inside one model, moving who holds the method. On the same day an unrelated group asked the question a third party would have to answer and could not: YUBI-Real2Sim (arXiv 2610.17521) reconstructs scenes with 3D Gaussian Splatting under dual fisheye wrist views and tests whether real-to-sim evaluation preserves policy ordering, reproducing it in 8 of 9 scene-task comparisons across two bimanual platforms, three scenes and three tasks, but concludes on the acceptance question: "These results do not yet establish a generally reliable scene-acceptance rule", and reports "limitations of quality-based reliability prediction". So novel-view quality scores do not tell you whether a twin is good enough to rank policies. That cuts both ways and both are recorded: it supports the claim that an SRCC-style validity statement is a separate sellable thing, because the obvious cheap substitute does not work; and it weakens any claim that such a statement can be produced today, because the group trying to produce one says it cannot yet. Prior state 2026-10-13 |
| sc-node-map | 38 nodes, 7 of them the same assurance problem in different costumes | current | per-node kill tests in the ledger | 2026-09-08 |

F5 THESIS SENTRY, 2026-10-21, three items against a ceiling of three, and they
do not agree. SUPPORTING the assurance seam in the one way it has never been
supported, which is with a price: USD 300,000,000 changed hands inside a testing
market. Teradyne bought "an aggregate of 2,234,887 shares of the Company's common
stock" from FormFactor for "aggregate cash consideration of approximately $300.0
million". The mechanism is that this thesis has always been argued against the
commons objection, that the field prices evaluation at zero, and the semiconductor
test market is a standing counterexample in which testing is bought at scale by
people who are not giving it away. THE BOUND, and it is the whole item: what
Teradyne bought is PRODUCTION TEST OF SILICON by a test-equipment vendor taking a
supply-chain stake, not a third party attesting to a learned policy, and the
property under test there is measurable by an instrument. Nothing read says
Teradyne bought anything resembling policy evaluation, and the kill test is
untouched. SUPPORTING AND WEAKENING IN THE SAME PAPER, which is why it is one item
and not two: HATCH (arXiv 2610.27485, 20 October) opens with this thesis's own
claim, "Capability claims in robot manipulation are unverifiable, and existing
leaderboards are each closed, simulated, or gameable", proposes attestation by
instrumentation rather than human judgment with "attested self-runs (uncut video,
sensor logs, and the seed)", and then releases the task specifications, build
guide, bill of materials and scoring rubrics "under an open license" with no
buyer. That is the commons argument arriving for an eighth time on this line, and
it arrives inside the paper that makes the thesis's case, which is the sharpest
form it has taken. Single author, proposal, no results reported. WEAKENING
twin-certification: an independent group with no stake measured NVIDIA's own
digital-twin pipeline against real Idealworks industrial robots (arXiv 2610.28432,
20 October) and found it transfers, "raises the real-world success rate of learned
navigation from 65.3% to 91.7% across four scenarios", "bringing it within 8.3
points of the production navigation stack, fully onboard". The kill test on that
thesis names NVIDIA or Lightwheel self-certifying, or a notified body accepting
vendor sim evidence unaudited, and NEITHER happened, so this weakens and does not
fire. What moved is that the validity measurement was produced by a third party
and published free, which SUPPORTS the claim that an SRCC-style validity statement
is a separate thing and WEAKENS the claim that it is sellable, the same two-way cut
recorded on 2026-10-14. The kill test on assurance-seam is still answered yes only
by the Accenture arrangement.

F5 THESIS SENTRY, 2026-10-20, three items against a ceiling of three. WEAKENING
the surviving form, and it is the SECOND IN FOUR DAYS after SCOPE on 16 October:
Cartender (arXiv 2610.26390, 19 October) builds the counterfactual branch out of
the log rather than out of a simulator or a re-run. "Counterfactual Branching
constructs matched and mismatched instruction-action pairs from real recordings
without a simulator", and "instruction following is evaluated by swapping
instructions under identical recorded inputs and measuring behavior rather than
agreement with generated targets". Same-scene paired instruction success goes
"from 23.67% to 57.00%" against matched-only imitation on the same backbone, and
"its gate reduces infeasible-instruction execution from 53.36% to 14.18%". The
mechanism against the thesis: the surviving form says the previous policy cannot
be run counterfactually without surrendering throughput, and Cartender does not
run it at all, it has a vision-language model propose the alternative futures the
log does not contain. THE BOUND, stated rather than assumed, and it is the same
bound SCOPE has: the branches are PROPOSED, not OBSERVED, so what is measured is
behaviour under a swapped instruction on identical recorded inputs, not an
outcome that occurred. Nothing here replays physical contact under a changed
action, so the question isolated on 22 September is untouched for a fifth
consecutive run. SUPPORTING the assurance seam, and it is the more interesting of
the two because it moves the thesis one layer up: RoboValue (arXiv 2610.26663,
19 October) tests the MONITORS rather than the policies. "Existing evaluations
cover only selected aspects of execution understanding, leaving the reliability
of value feedback insufficiently tested." It finds "errors in fine-grained
instruction grounding, history-dependent progress tracking, and recovery
assessment, even in models with strong outcome and forward-progress scores", and
that "the same semantic subtask can also receive substantially different value
gains across valid execution orders". That is the aggregate-hides-the-gap
mechanism, which the thesis has only ever been argued about at the policy layer,
measured at the judge layer: a monitor with a good outcome score is wrong about
progress and recovery. If the judge is unreliable, a neutral party is needed to
judge the judge, which is the seam one level up rather than the seam
commoditised. SUPPORTING in a domain the thesis has never been argued in: the
DHS FASCSA order of 20 October creates a verification obligation over MODEL
LINEAGE and names no verifier and no method, which is the seam's shape in
software provenance rather than in physical safety. The kill test on
assurance-seam is still answered yes only by the Accenture arrangement. The kill
test on twin-certification did not move this run; nothing in window put a
verifier inside the builder.

F5 THESIS SENTRY, 2026-10-19, three items against a ceiling of three, and they
do not agree. SUPPORTING the surviving form: arXiv 2610.23372 of 16 October is
LIBERO-CTRL's mechanism measured again by a different group with no stake,
"aggregate rates can hide offsetting gains and losses", with "a
one-unit-in-the-last-place (ULP) intervention, including its installation
procedure" changing "11.9% of seed-paired outcomes", against 29.0% under
compound perturbation on 14 September. WEAKENING it at equal prominence, and it
is the stronger of the two: SCOPE (arXiv 2610.23128, 16 October) runs the
counterfactual the surviving form says cannot be run, by replaying recorded API
responses and mutations rather than re-running the previous policy. "Selective
behavioral certification uses stateful API replay to restore recorded responses
and mutations, checking whether edits preserve selected historical successes."
The builder does it in-house and releases the code, which is the commons
argument arriving a fifth time. THE BOUND ON THAT READING, stated rather than
assumed: the replay is of a digital boundary on LIBERO-PRO and Robosuite, not
of physical contact, so it does not reach the question isolated on 22 September
and does not fire the kill test. WEAKENING twin-certification, and it is the
THIRD CONSECUTIVE INSTANCE of the builder supplying both the twin and the test
that certifies it, after Argon on 13 October and VeriVLA on 16 October: PASS
(arXiv 2610.23019, 16 October) proposes "Sim-to-Real Scene Trustworthiness
(SRST), a measure based on DINOv2 feature distributions and UMAP, to quantify
sim-to-real closeness" for "CAT III integrity algorithm development", which is
an aviation certification category, so the pattern has now appeared inside a
certified regime rather than only in research settings. The kill test on
assurance-seam, does any buyer pay for third-party attestation, is still
answered yes only by the Accenture arrangement, and the lead of 2026-10-19 adds
a structural question about that arrangement's funder rather than an answer.

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


Added 2026-10-11, covering a four-day window. One supporting, two weakening,
and the supporting item is the first on this board that is a count rather than
a claim.

SUPPORTING, and it is the run's lead: the Commission's Single Market Compliance
Space returns zero notified bodies under Regulation (EU) 2024/1689 and zero
under Regulation (EU) 2024/2847, at any notification status, read 2026-10-11.
AI Act Article 113(b) brought Chapter III Section 4, "Notifying authorities and
notified bodies", into application on 2 August 2025, which is 435 days before
this reading. CRA Article 71(2) brought Chapter IV, Articles 35 to 51, into
application on 11 June 2026, 122 days before. Direction: supports, because a
statutory third-party assessment obligation cannot be discharged by publishing
a tool, which is the one property the commons argument cannot run against, and
these are two such obligations on instruments that name AI and software
directly rather than reaching them through machinery. THE BOUND, and it is why
this is not stronger than it looks: zero bodies is also zero revenue. The kill
test asks whether a buyer pays, and nobody can pay a body that does not exist.
So the honest reading, stated once: mandate is necessary and is not sufficient,
because a mandate with no notified body is not yet a buyer. That is narrower
than the 2026-10-07 restatement and it is the third consecutive run on which
the restatement has been shown to cost something.

WEAKENING, at equal prominence, and it is the sharper of the two on the axis
Anshu is building in. FMCSA granted a five-year exemption on 2026-10-09 letting
Aurora and any other carrier run Level 4 ADS commercial motor vehicles with
cab-mounted beacons. Entry for a non-Aurora carrier is an email containing "A
statement that adequately demonstrates the motor carrier currently has
cab-mounted warning beacons and the ability to comply with all terms and
conditions of this exemption" and a 28 U.S.C. 1746 perjury certification.
Oversight is an annual self-report that term 8 says "will be treated as CBI"
if the carrier designates it. A federal regulator took a signature where it
could have required a test, four days after a university published the
third-party AV assessment framework NHTSA declined to mandate and gave it away.
Note the shape, because it is the same shape as the 2026-10-06 FDA order: on
the physical side the premarket third-party check keeps being removed or never
created, while on the platform side it keeps being created.

WEAKENING: Anthropic's Cyber Mission post of 2026-10-08 states "As part of
Project Glasswing, partners uncovered many vulnerabilities, but we haven't yet
achieved a sufficient reduction in cyber risk. It's easier than ever to find
vulnerabilities, but verifying, prioritizing, and fixing these findings remains
challenging." That is a material qualification, by the same party two days
later, of the "at least 129,000 verified software vulnerabilities" figure this
board recorded on 2026-10-07, and it should be read against that row rather
than as a new one. Its OSS Scanner then ships findings free where "The reports
are model-generated and sent without human review" at an expected true-positive
rate "above 90%", which is the verification step being skipped rather than
sold. Direction: weakens, because the party best placed to sell verification
priced it at zero and omitted it.

NOT PROMOTED, both directions, 2026-10-11, each changing no tracked number.
Weakening on the open decision: arXiv 2610.12033, Traceable World State, builds
deterministic replay for a robot world state with "a canonical SHA-256 hash
chain" and reports "exact terminal-state replay in all episodes and detected
412/412 injected corruptions with a 1.72% storage overhead over Plain JSONL"
across 103 simulated Unitree G1 trajectories containing 78,369 frames. This is
the Hearsay external-log result (2609.32495) arriving in robotics with a
measured corruption-detection rate. The bound is the same bound as every replay
item since 24 September and should not be rediscovered: what is replayed is an
ordered sequence of recorded state updates, not contact re-executed under a
different action, and the trajectories are simulated. arXiv 2610.12468,
DreamTrue, does counterfactual post-training by "modifying recorded action
trajectories and generating future videos under a wider range of actions and
contact configurations" and cuts a human-assessed interaction defect rate "from
48.12% to 6.25%"; direction ambiguous, because the judge is an embodied video
reward model the same authors trained, which is the self-administered check
already criticised at 2609.23478. Supporting: arXiv 2610.11464 makes the
verifier the evolving object and finds that "removing the anchor guards
collapses the verifier into a vacuous always-pass grader, yet that collapsed
verifier trains skills just as well. Downstream task score cannot certify a
self-evolved verifier." Supporting: arXiv 2610.11754 separates
"contract-relative verification from scientific truth" and reports a
deterministic checker with access to what was approved before execution caught
all eight registered mutations, while eighteen judge aliases given only
artifacts flagged 104 of 144 mutated cases with 32 abstentions. Supporting on
the marking row: arXiv 2610.12106 introduces a split-key public-private
watermark, finds "Public detection improves removal only at small edit budgets,
since plain rephrasing already strips the watermark at a lower quality cost,
but it does enable forgery, which the private pipeline can identify", and
concludes that releasing half "bounds the provider's liability and questions
the need to keep detectors fully private". That is a direct, dated answer to
the 2026-10-05 question about a detector whose only verifier is the discloser,
and it answers it against the discloser.

Added 2026-10-12, and the two sides now answer different questions rather than
the same one, which is the most useful thing this run produced.

ON THE BUYER QUESTION the thesis is now SUPPORTED by a named, priced buyer,
and this board had missed it for 24 days. Anthropic's post of 2026-09-18 names
Accenture, with the work led by Faculty, and states that "Anthropic and
Accenture each expect to invest at least $1 billion in building capacity in
this area over the next five years". The kill test asks whether any buyer pays
for third-party attestation rather than open-sourcing the tool or using its own
telemetry. A buyer does, at a scale no prior item on this board approached. The
bound, and it is the whole of the independence objection: "Anthropic will fund
Accenture's work directly", because the pooled or government funding the post
prefers does not exist, and "there are, as yet, no standards for what
information embedded evaluators should have access to, or how they should
report what they find". So the commons argument does not run against this item,
but the DSA Art. 37 independence architecture inverts in it.

ON THE VALIDITY QUESTION the thesis is WEAKENED, and by a proof rather than by
a cheaper substitute, which is a new kind of evidence on this row. arXiv
2610.13928, accepted at NeurIPS 2026, embeds encrypted neural networks in host
model weights that decrypt and execute "only upon receiving a secret trigger",
and reports that under cryptographic assumptions the hidden circuits "remain
provably hard to elicit and interpret ... even given full access to model
weights", surviving fine-tuning, weight noising, gradient-based trigger search
and latent adversarial training. The authors state the result as "a limit of
elicitation-based capability audits". The bound, which must be carried with the
item: the construction is a backdoor deliberately inserted by whoever trained
the model, so it bounds the audit of an adversarial developer and says nothing
about an honest developer's unintended capability. Every prior weakening item
on this row said a cheaper party could do the measurement. This one says the
measurement has a provable ceiling, which is why it is filed separately.

THE TWO READ TOGETHER, and this is the reading the 2026-10-12 question tests:
Anthropic's stated rationale for the embedded form is that an embedded
evaluator has "access comparable to an employee's" and can "watch models take
shape in training", which is precisely the thing elicitation after training
cannot recover. The paper supplies a cryptographic reason why that distinction
is load-bearing rather than rhetorical. If that holds, the sellable asset in
this seam is access during training, which is granted by contract and cannot be
open-sourced, rather than method, which can. Nothing on this board tests it yet.

Also weakening, at equal prominence and with a number: arXiv 2610.13516,
RESCUE, restores simulator and policy state at execution checkpoints across
128,340 counterfactual branches on OpenVLA-OFT and pi-0.5 over LIBERO-Spatial
and LIBERO-Plus, finds that "favourable detection scores do not establish lower
intervention cost", and puts a ceiling on the monitor: "even an idealised
detector can afford only a 2.0-3.3% false-alarm rate before unnecessary resets
outweigh the savings from stopping failures early". That prices the intervention
rather than the measurement, which is a different attack on the surviving form
than the replay papers make. And arXiv 2610.13628, JitterVLA, "replays
identical commands and arrival traces through alternative controllers" on a
physical UR3 as well as in simulation, lowering accelerometer-derived jerk 3.0
to 14.0%; the bound is the same bound as every replay item since 2026-09-24,
namely that what is replayed is the command stream and not contact under a
changed action.

---

## domains

Stock-side state. Decision of 2026-09-14: **breadth first, narrow later.**

| domain | depth | document | status |
|---|---|---|---|
| industrial certification and standards bodies | terrain | reports/terrain-map.md §1 | written 2026-09-14; §1 "what is missing" partly closed 2026-09-18, updated 2026-09-22, and updated again 2026-09-30 to 41 under 2023/1230 and 153 under 2006/42/EC with the complete 41-name list and the DGUV / TUV concentration finding. Fee schedules, day rates and assessor utilisation remain not found, which is now the only substantive gap left in §1. §1 "the money" fully serialised as of 2026-10-01 and §1 "the constraint" fully serialised as of 2026-10-05 |
| the robot policy layer | terrain | reports/terrain-map.md §2 | DELIVERED IN FULL 2026-10-19. Prose, NOT a skeleton; corrected 2026-10-14 and acted on 2026-10-16. "What is already sourced" serialised verbatim 2026-10-16, "Status" and "The gaps" verbatim 2026-10-19 |
| datacenter and power buildout | none | reports/terrain-map.md §3 | scope only, not researched. CORRECTED 2026-10-19: it does carry three short prose paragraphs, against the 2026-10-16 claim that it carries none. DELIVERED 2026-10-20, closing the document. "Status" and "What this section must contain when written" both went out verbatim; "The one thing that is sourced" duplicates the tracked capex line and was skipped with the skip stated in the brief |

In progress for the brief's FROM THE STOCK SIDE section: `reports/terrain-map.md`.
Serialise it in order, at most 400 words per weekday, and record the last
section delivered in the `serialised` line below. When the file is exhausted,
omit the section rather than inventing a new domain.

serialised: **MARKER CONFIRMED 2026-10-21 AND ACTED ON: THE SECTION WAS OMITTED FROM THE BRIEF FOR THE FIRST TIME. reports/terrain-map.md is exhausted and the 2026-10-21 run did not re-open it, did not re-serialise anything and did not invent a replacement domain. A later run must do the same: omit the section, say nothing about it in the body, and record the omission in provenance only. The narrowing trigger stays LIVE and S1 stays UNSTARTED, because that decision is Anshu's and no agent may take it. Prior marker follows.** **THE DOCUMENT IS EXHAUSTED AS OF 2026-10-20. reports/terrain-map.md IS FULLY SERIALISED AND THE BRIEF’S "FROM THE STOCK SIDE" SECTION IS OMITTED FROM THE NEXT RUN RATHER THAN FILLED.** §3 "Status" went out verbatim ("Scope only. Not researched. Recorded here so the map is honest about its own coverage rather than appearing complete.") and §3 "What this section must contain when written" went out verbatim in full, being the vocabulary of interconnection, the value chain from turbine and transformer supply through EPC to the operator with lead times and the unchecked assertion that transformers and turbines rather than chips are the binding constraint, dollars per megawatt and the structure of a power purchase agreement, the constraint as the claim to test, the demand-led versus stranded-capex disagreement, and the recent history. §3 "The one thing that is sourced" was SKIPPED and the brief said so: it restates the $725 to $800 billion hyperscaler capex line already in the capex table, and carrying it would repeat. The 2026-10-16 marker claimed exhaustion one run early and the 2026-10-19 run corrected it; this marker claims exhaustion on the run that actually finished the file, and the difference is that the §3 prose was read and carried rather than asserted to be absent. **THE NARROWING TRIGGER IS NOW LIVE.** Per the rule below, compare the attention tally against depth and name the S1 curriculum candidate; the tally currently reads certification and standards 50, robot policy layer 25, capital flows 14, datacenter and power 10, dual-use and export control 3, and the only domain with depth is certification, so the arithmetic points at the robot policy layer. ANSHU DECIDES. The agents must not start S1. Prior history of the serialisation, kept short: §1 vocabulary 2026-09-17, the value chain 2026-09-18, the money 2026-10-01, the constraint 2026-10-05, the live disagreement 2026-10-06 and 2026-10-07, the recent history 2026-10-11 and 2026-10-12, what is missing 2026-10-13 and 2026-10-14 closing §1, §2 "What is already sourced" 2026-10-16, §2 "Status" and "The gaps" 2026-10-19, §3 "Status" and "What this section must contain when written" 2026-10-20 closing the document. Six of those were half-section splits forced by the 700-word cap, each recorded in its brief’s provenance.

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
| certification and standards | 53 | 0 | 0 |
| robot policy layer | 27 | 0 | 0 |
| datacenter and power | 10 | 0 | 0 |
| capital flows, general | 16 | 0 | 0 |
| dual-use and export control | 3 | 0 | 0 |

2026-10-21: certification +3 (the Teradyne / FormFactor purchase as the lead,
counted here because it prices a testing market; the FMCSA Training Provider
Registry at 26,284; and the SEC File No. 4-933 CFA designation), robot policy
layer +2 (HATCH and the NVIDIA sim-to-real third-party benchmark), capital +2
(Teradyne / FormFactor counted once here as well as on certification, the
2026-10-12 precedent, and Modal Labs), datacenter and power +0 DESPITE Modal
selling cloud infrastructure, on the same reasoning the Liqid item was handled
on 2026-10-20: the evidence is a Form D and a company post about a funding
round, neither of which says anything about buildout, and double-counting it
would inflate the thinnest row. Dual-use +0, the first run with nothing on that
row since it was created. Running total 109 items across 19 briefs.
TWENTY-ONE consecutive ONE QUESTIONs are now unanswered. Certification still
leads, 53 to 27 to 16 to 10 to 3. THE NARROWING TRIGGER REMAINS LIVE and the
candidate is unchanged from 2026-10-20, the ROBOT POLICY LAYER on brief items
against depth, because no question has ever been answered and the rule's
primary input is still empty. ANSHU DECIDES and the agents do not start S1.

2026-10-20: certification +2 (the DHS FASCSA lineage test as the lead, and the
supplier-certification clause buried in Implementing Decision (EU) 2026/2267),
robot policy layer +2 (Cartender and RoboValue), capital +1 (Liqid, the first F1
qualifying item in five runs), datacenter and power +0 DESPITE Liqid selling into
datacenters, because the item is counted on capital where its evidence is a Form
D and double-counting it would inflate the thinnest row with a filing that says
nothing about buildout, dual-use +1 (the FASCSA order, counted once here and once
on certification on the 2026-10-12 precedent). Running total 102 items across 18
briefs. TWENTY consecutive ONE QUESTIONs are now unanswered. The tally still
counts agent output rather than attention, which is the seventh run to say so and
the last time it will be said, because repeating it is now itself the noise.
Certification still leads, 50 to 25 to 14 to 10 to 3. **THE NARROWING TRIGGER IS
LIVE AS OF THIS RUN**, because the terrain map is exhausted. The rule says the
domain with the most answered questions and the least depth is the S1 candidate;
no question has ever been answered, so the rule's primary input is empty and the
fallback is brief items against depth. On that reading the candidate is the ROBOT
POLICY LAYER: 25 items, terrain depth only, and the one domain whose §2 gaps name
a specific cheap next action (read Symbotic's 10-K with agent S2). Certification
leads on volume but already has the deepest section and the complete notified-body
list. Datacenter and power has 10 items and no depth at all, which is the other
defensible answer. ANSHU DECIDES and the agents do not start S1.

2026-10-19: certification +2 (the Anthropic Public Benefit Fund as the lead, and
the CFTC compute-verification request resolved at source after three unreachable
runs), robot policy layer +2 (SCOPE and the interventional memory protocol),
capital +1 (the equity commitment, counted once on this axis as well as on
certification, the 2026-10-12 precedent), datacenter and power +0, dual-use +2.
**A FIFTH ROW WAS ADDED THIS RUN AND IT SHOULD HAVE EXISTED FROM THE START:
dual-use and export control.** The charter names five axes and the tally carried
four domains, so every dual-use item this board has logged, including the BIS
advanced-computing row, has had nowhere to be counted. It starts at 2 with
today's two items and is NOT backfilled, because backfilling it would be this
system inventing a history it did not record. Running total 96 items across 17
briefs, which is not comparable with the 89 of 2026-10-16 because the
denominator of domains changed. NINETEEN consecutive ONE QUESTIONs are now
unanswered. The tally still counts agent output rather than attention, which is
the sixth run to say so, and the standing instruction not to re-state it is
respected by saying it once in this clause and not arguing it again. Certification
still leads, 48 to 23 to 13 to 10 to 2, and it leads because the agents keep
finding items there. The narrowing trigger does NOT become live this run: the
terrain map is not exhausted, because §3 carries prose the 2026-10-16 marker
said it did not.

2026-09-17: certification +2 (the two arXiv assurance claims), datacenter and
power +1 (the EPA repeal, the first dated federal instrument this system has
logged on that domain), capital +1 (Noetive).

2026-10-16: certification +5 (the Anthropic embedded-evaluator post as the lead,
the RSB voluntary-scheme recognition, the OSHA NRTL grant, the eIDAS Slovak
divergence, and the register re-read at 43 and 154), robot policy layer +2
(Bench2Drive and VeriVLA), datacenter and power +1 (the RED II Art. 29(10)
corrigendum), capital +0 (F1 returned no qualifying item). Running total 89
items across 16 briefs. EIGHTEEN consecutive ONE QUESTIONs are now unanswered,
and the tally still counts items rather than attention, so it still cannot do
the job the 2026-09-14 narrowing decision assigned it. The shape is unchanged
and sharper: certification leads 46 to 21 to 12 to 10, and it leads because the
agents keep finding items there. Do not read the lead as a preference until at
least one question is answered. The narrowing trigger becomes live once the
terrain map is exhausted, which is one run away.

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

2026-10-12: certification +3 (the elicitation-limit proof, the RESCUE monitor
ceiling and the Accenture embedded-evaluation correction), robot policy layer
+1 (JitterVLA on a physical UR3), capital +1 (the USD 1bn-a-side evaluation
commitment, counted once). Fourteen consecutive ONE QUESTIONs are now
unanswered, so the tally still counts items rather than attention and still
cannot do the job the 2026-09-14 narrowing decision assigned it. Certification
leads 35 to 17 to 10 to 7 because the agents keep finding items there. Do not
read the lead as a preference.

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

2026-10-07: certification and standards +3 (the Anthropic CVP vetting tiers, the
Copyright Office streaming-fraud inquiry, and the six-corrigendum OJ issue with
the 3,498-day Dutch reporting obligation inside it), robot policy layer +2 (the
Mcity third-party AV framework and its Autoware.Universe result, counted once,
and the NHTSA ADS Workshop date), capital flows +1 (PDW Holdings, the first
aerial-robotics round tracked). Datacenter and power unchanged at 7, a third
consecutive run with nothing on that domain, which is now the longest gap on any
row and worth saying plainly: the collectors are not finding that axis, and
terrain-map.md §3 is still scope only. Certification extends the lead to 29
against 14. Questions answered remains 0 after 13 questions; per the decision of
1 October this is not re-described further.

The shape this run adds, and it corrects rather than extends yesterday's. The
2026-10-06 entry concluded that the assurance-seam thesis is probably two
claims split by platform against physical product, because a platform got a
mandated audit seat and a physical product lost a premarket check on the same
day. Today both halves moved the other way. On the platform side Anthropic put
itself in the verifier seat over its own customers, which is a platform
instrument with no third party in it at all. On the physical side a university
published a working third-party AV assessment framework and gave it away, which
is a physical-product instrument with a third party in it and no buyer. So the
split does not survive one day of contact: what separates these cases is not
platform against physical product but whether anyone is obliged to pay, and only
the DSA item of 2026-10-06 has that property. The honest restatement, and it is
narrower than yesterday's: the thesis turns on mandate, not on artefact type.


2026-10-11: certification and standards +3 (the two register zeros under the AI
Act and the Cyber Resilience Act, counted as one; the Cyber Resilience Act
corrigendum inverting the Slovenian distributor definition; and the Anthropic
Usage Policy writing machinery safety into contract terms), robot policy layer
+2 (the FMCSA Level 4 ADS class exemption on a perjury certification, and the
Anthropic High-risk Physical Actions scope counted here as well as under
certification because it defines six classes of hazardous robot act). Capital
flows unchanged at 9 and datacenter and power unchanged at 7, a fourth
consecutive run with nothing promoted on that domain, although two Form D
filings were recorded against it for the first time since 2 October.
Certification extends the lead to 32 against 16. Questions answered remains 0
after 14 questions; per the decision of 1 October this is not re-described.

Two things this run adds that bear on the system itself rather than the board.
First, the schedule failed silently: no brief ran on 8, 9 or 10 October and
nothing detected it. Three days of Federal Register, OJ and arXiv output were
never collected, and this run recovered the EU and US halves because both are
queryable by date, but the arXiv half of 9 and 10 October is unrecoverable from
the API, which had not indexed either date by the time this ran. If the brief
is worth running daily it needs a liveness check that is not the brief itself.
Second, and this is the shape: for the first time the strongest item of the day
came from re-reading a register the board already had, with two new filters, at
no new source. Four of the last five runs led with something found by reading
further into an instrument already on the board rather than by finding a new
one. That is an argument for depth over breadth which the 2026-09-14 decision
settled the other way, and the narrowing trigger it was supposed to feed still
has a zero numerator.

2026-10-13: certification and standards +3 (the eIDAS accredited-CAB route, the eight-corrigendum issue, the Argon twin and its self-administered validity tests), robot policy layer +1 (the same Argon post, read on the policy axis), capital +2 (Ubitium, Astribot). THE SHAPE OF THIS RUN, recorded because it is the third instance of one pattern: the two best items were a frontier lab’s own product post and a one-language corrigendum to a six-month-old implementing act, neither of which any watchlist query would have surfaced. The watchlist caught nothing. What caught both was reading the full day’s document list and following a corrigendum to the provision it corrects. Five of the last six runs led with something found by reading further into material already reachable rather than by finding a new source, which strengthens the depth-over-breadth argument the 2026-09-14 decision settled the other way. The narrowing trigger it was supposed to feed still has a zero numerator: 0 of 19 ONE QUESTION prompts answered.

ALSO UNRESOLVED AND NOT A COLLECTOR PROBLEM: the F1 charter’s source hierarchy assumes SEC Form D is available. It has now been unavailable for two consecutive runs because of a weekend plus a federal holiday, and on both runs F1 fell through to trade press, which is priority 4. That is the charter working as written, but it means the money axis is secondary-sourced on any run following a US market closure, and a Monday or post-holiday run should expect to tag its capital items secondary-press rather than treat that as a failure.


2026-10-14: certification and standards +3 (the first AI Act harmonised standard and the Article 20(10) trigger, counted as one; the register moving 41 to 43 with two named SGS additions; the Singapore MOU as a fourth evaluator form), robot policy layer +1 (YUBI-Real2Sim on whether a twin can rank policies), datacenter and power +2 (the ITC exclusion proceeding over AI server power delivery, and the RED III district-heating unit correction), capital flows unchanged at 12, a run with no qualifying round in an allowed sector despite EDGAR returning for the first time in three runs. Certification extends the lead to 41 against 19 against 9. Questions answered remains 0 after 20 questions; per the decision of 1 October this is not re-described.

THE SHAPE OF THIS RUN, and it breaks the pattern the last three runs recorded. Five of the last six runs led with something found by reading further into material already on the board. Today the watchlist worked: the lead was a document in the plain EU listing for the window, on a row this board has carried since 14 September ("CEN/CENELEC AI harmonised standards: none submitted"), and the second item was a counter re-read on schedule that had not moved in six readings and moved today. Two things follow. First, the depth-over-breadth argument accumulated over the last three runs should NOT be treated as settled, because a run that is simply read properly can still find the day's best item in the first listing it pulls. Second, the value of re-reading a counter every run is now demonstrated rather than assumed: five null reads bought the sixth, and without them the 41 to 43 move would have been a count with no names behind it.

THE SECOND MISS IN THREE RUNS, and the shape is consistent. The Anthropic Genesis Mission post of 8 October, USD 150m over three years to 15-plus federal agencies, was absent from every file in reports/, data/ and logs/ and was found today only by listing anthropic.com/news and checking the datePublished of every link rather than the first few. That is the same method that found the Accenture post 24 days late on 12 October and the Life Sciences Verification Program on 13 October. Three misses, all from the same vendor's own news index, all found by enumerating the index rather than by any watchlist query. A standing instruction follows and should be acted on rather than restated: enumerate anthropic.com/news in full every run and diff the slug list against the board, because the slugs are stable and the diff is cheap.

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
| 2026-10-07 | A frontier lab vetted its own customers in three tiers today while a university published the third-party AV assessment a regulator declined to mandate: is the verifier seat occupiable only by a party selling nothing into the market it examines, yes or no | no |
| 2026-10-11 | The AI Act's notified-body chapter has run 435 days with nobody designated under it and the Cyber Resilience Act's 122 days, while the Machinery Regulation it feeds has 41 bodies and 101 days left: can a body notified only under Machinery assess an AI requirement the AI Act defines, yes or no | no |
| 2026-10-12 | A capability can be hidden in model weights so that an auditor holding those weights provably cannot elicit it (arXiv 2610.13928), while the embedded form Anthropic and Accenture are funding at USD 1bn a side buys access during training instead: is the sellable asset in this seam access rather than method, yes or no | no |
| 2026-10-14 | The EU cited its first AI Act harmonised standard on the same day its register showed zero bodies notified to assess against it, and Machinery Article 20(10) now routes that standard into a presumption of conformity 98 days before the Machinery Regulation applies: is a cited standard with no assessor enough to make 20 January 2027 dischargeable, yes or no | no |
| 2026-10-13 | Google’s Argon now builds the calibrated simulation twin AND supplies the two objectives that certify it against the real episode, while the EU has written an accredited conformity assessment body’s "certificate of compliance based on a certification audit" into eIDAS as the alternative to state notification: if the builder of a twin also supplies the tests that say it matches reality, is anything left for a third party to sell except the signature | no |
| 2026-10-16 | Anthropic published the test an evaluator must meet, that it not be "financially or operationally dependent" on the company it evaluates, and named in the same post the evaluator whose work it funds directly at USD 1bn a side: is an evaluator that fails its funder's own published independence test worth more than no evaluator, yes or no | no |
| 2026-10-19 | A derivatives regulator asked on 19 August whether independent verification of compute transaction data exists at all, and the comment window closes 20 October with this board holding no evidence that anyone answered: is compute the assurance seam's second buyer, or the proof that a seam nobody fills is a seam nobody needs | no |
| 2026-10-20 | An order published today makes civilian agencies remove third-party products "developed using DeepSeek implementations" and states no method for establishing that a product was, while naming no verifier: is model lineage the assurance seam's third buyer, or the first case where the property to be verified leaves no trace in the artefact | no |
| 2026-10-21 | Teradyne paid $300.0 million for a position inside semiconductor test, where what is tested leaves a physical trace, on the day a manipulation benchmark declared capability claims unverifiable and gave its scoring rubric away under an open licence: is the assurance seam short of a buyer because nobody has priced it, or because money only appears where an instrument can settle the question | no |

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
| notified bodies active under Reg (EU) 2023/1230 | 41, unchanged on 2026-10-07, a fifth consecutive reading at 41 after 10-06, 10-05, 09-30 and 09-22; was 40 on 2026-09-18 | Commission Single Market Compliance Space register | 2026-10-07 |
| notified bodies active under Directive 2006/42/EC | 153, unchanged on 2026-10-07, was 152 on 2026-09-22 and 153 on 09-18, 09-30, 10-05 and 10-06 | same register, same reading | 2026-10-07 |
| robotic value models, errors surviving a strong outcome score | "errors in fine-grained instruction grounding, history-dependent progress tracking, and recovery assessment, even in models with strong outcome and forward-progress scores" | arXiv 2610.26663 | 2026-10-19 |
| cross-embodiment dexterous manipulation, best trained multi-task policy | 29.1% Core-50 success; GPT-6 without benchmark finetuning 5.2% Core-50 and 1.9% Transfer-16 over 660 trials | arXiv 2610.26765 | 2026-10-19 |
| infeasible-instruction execution under a scene-language compatibility gate | from 53.36% to 14.18%; same-scene paired instruction success from 23.67% to 57.00% | arXiv 2610.26390 | 2026-10-19 |
| new machinery regime as a share of the outgoing one | 26.8%, unchanged on 2026-10-07, was 27.0% on 2026-09-22 and 26.1% on 2026-09-18; 105 days to application | own arithmetic on the two counts | 2026-10-07 |
| DGUV Test units among the 41 notified bodies under Reg (EU) 2023/1230 | 7 of 41, one German institution | own count on the complete register list | 2026-09-30 |
| German share of notified bodies under Reg (EU) 2023/1230 | 18 of 41 | same count | 2026-09-30 |
| belief support loss on a probe-then-commit insertion pipeline | truth leaves the belief's support on 16.9% of episodes, failure score optimistic by 0.31 | arXiv 2609.30608 | 2026-09-24 |
| failure rate after correcting a 2.1 mm observation-model error | 0.354 to 0.112 on untouched instances | arXiv 2609.30608 | 2026-09-24 |
| bugs and design limitations found auditing seven manipulation benchmarks | 22 bugs, 4 design limitations; one baseline moved from 21pp behind to 5pp ahead | arXiv 2609.37771 | 2026-09-29 |
| success drop under a mid-execution change, fourteen policies | 11.0 to 25.7 percentage points, 8,000 paired cases | arXiv 2609.36518 | 2026-09-29 |
| outputs-only versus latent failure monitor, autonomous driving | AUROC 0.825 and 0.924, latent features add no statistically resolved improvement | arXiv 2609.30557 | 2026-09-24 |
| deployed agent harnesses writing a fully evidentiary record | 0 of 16; an external log caught 28 of 28 fabrications a hash chain missed | arXiv 2609.32495 | 2026-09-26 |
| committed spend on independent evaluation of frontier AI | "at least $1 billion" each from Anthropic and Accenture over five years, funded directly by Anthropic | Anthropic post, company claim about its own arrangement | 2026-09-18, recorded 2026-10-12 |
| false-alarm rate an idealised runtime monitor can carry before it costs more than it saves | 2.0 to 3.3%, under a stop-and-reset model, 128,340 counterfactual branches | arXiv 2610.13516 | 2026-10-09 |
| elicitation methods a cryptographically hidden capability survived | 4 of 4: fine-tuning, weight noising, gradient-based trigger search, latent adversarial training, with full weight access | arXiv 2610.13928, NeurIPS 2026 | 2026-10-09 |
| p99 jerk reduction from controller interpolation on VLA command streams | 83%, 615 to 106 m/s^3 at 200 ms delay, at a 2.0 cm tracking cost; 3.0 to 14.0% on a physical UR3 | arXiv 2610.13628 | 2026-10-09 |
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
| open-source Level 4 ADS measured by a third-party behavioral safety framework | "6 out of 14 behavioral competencies" and "a crash rate of 3.01x10^-3 crashes per mile, approximately 1,000 times higher than the average human driver crash rate", Autoware.Universe, simulation plus the Mcity physical track | arXiv 2610.08458 | 2026-10-07 |
| days from NHTSA withdrawing AV STEP to a published third-party AV behavioral safety framework | 102, from 2026-06-26 to the arXiv submission of 2026-10-06 | own arithmetic | 2026-10-07 |
| frontier-lab cyber capability gating, self-reported tier efficacy | without the programme "every task was blocked on the first prompt"; Defense Access blocked 46 of 50 trials; Red Team Access blocked 0 and completed 34 of 50, against a stated 67.6% unsafeguarded rate; 10 CyScenarioBench challenges, five attempts each per tier | Anthropic, company post | 2026-10-07 |
| vulnerabilities attributed to a frontier lab's vetted-access programme | "at least 129,000 verified software vulnerabilities between April and July 2026" from 33 partner reports, plus 5,500 from the lab's own open-source scanning April to October, "more than 33,000" rated critical or high; the lab states "fewer than 50% of partners disclosed patched numbers" | Anthropic, company post, company's own figures | 2026-10-07 |
| aerial-robotics round, first tracked | PDW Holdings, Inc. (Performance Drone Works), totalOfferingAmount 52,200,194 fully sold, Rule 506(b), two investors, finders fees estimated 2,100,000 to Houlihan Lokey Capital, first sale 2026-09-21 | SEC Form D | 2026-10-07 |
| corrigenda in a single OJ issue | 6, being 6 of the 11 sector-3 documents published 2026-10-07; 5 of the 6 have no English expression | own count on the EUR-Lex listing | 2026-10-07 |
| days an EU supervisory reporting obligation read wrong in one language | 3,498, Dutch Art. 70(6) of Del Reg (EU) 2017/392 reading "beveiligingssystemen" for "effectensystemen", from the OJ of 2017-03-10 to the corrigendum of 2026-10-07 | own arithmetic on two OJ references | 2026-10-07 |
| notified bodies under Reg (EU) 2024/1689, the AI Act | 0, at any notification status, 435 days after Chapter III Section 4 applied on 2025-08-02 | Commission Single Market Compliance Space register, legislationId 168380 | 2026-10-11 |
| notified bodies under Reg (EU) 2024/2847, the Cyber Resilience Act | 0, at any notification status, 122 days after Chapter IV applied on 2026-06-11 | same register, legislationId 167953 | 2026-10-11 |
| notified bodies active under Reg (EU) 2023/1230 | 41, unchanged on 2026-10-11, a sixth consecutive reading at 41 after 10-07, 10-06, 10-05, 09-30 and 09-22; was 40 on 2026-09-18 | same register, legislationId 162400 | 2026-10-11 |
| notified bodies active under Directive 2006/42/EC | 153, unchanged on 2026-10-11 | same register, legislationId 131881 | 2026-10-11 |
| new machinery regime as a share of the outgoing one | 26.8%, unchanged on 2026-10-11; 101 days to application | own arithmetic on the two counts | 2026-10-11 |
| total active notified bodies, all legislations | 1,565, was 1,566 on 2026-10-06 | same register, unfiltered | 2026-10-11 |
| days a Cyber Resilience Act definition read with the wrong legal act in one language | 688, Slovenian Art. 3(17) defining a distributor by placing on the market rather than making available, from the OJ of 2024-11-20 to the corrigendum of 2026-10-09; the eighth corrigendum to that Regulation | own arithmetic on two OJ references | 2026-10-11 |
| days from the Union Customs Code recast to a corrigendum inverting its importer-deeming rule | 19, Art. 33(3) French and Dutch, from the OJ of 2026-09-19 to the corrigendum of 2026-10-08 | own arithmetic on two OJ references | 2026-10-11 |
| federal relief granted to Level 4 driverless trucks on a self-certification | five years, open to any carrier on written notice plus a 28 U.S.C. 1746 perjury statement; annual self-report withheld as CBI on request | FR Doc 2026-20734 | 2026-10-11 |
| classes of hazardous physical act a model vendor now conditions by contract | 6, with a stop-and-safe-state requirement and operating limits "enforced by the equipment or a controller independent of model output", effective 2026-11-12 | Anthropic Usage Policy | 2026-10-11 |
| vulnerability-finding programme output, qualified by its own operator | "partners uncovered many vulnerabilities, but we haven't yet achieved a sufficient reduction in cyber risk", two days after the 129,000 figure; OSS Scanner reports are "model-generated and sent without human review" at an expected true-positive rate "above 90%" | Anthropic, company post | 2026-10-11 |
| harmonised standards cited under Reg (EU) 2024/1689, the AI Act | 1, EN 18286:2026 on quality management systems, in force 2026-10-14; was 0 for the whole life of this board and 0 across 5,000 sector-3 documents since 2024-08-01 | Implementing Decision (EU) 2026/2274 and own eurlex.mjs match | 2026-10-14 |
| notified bodies active under Reg (EU) 2023/1230 | 43, up from 41 held over six readings 2026-09-22 to 2026-10-11; was 40 on 2026-09-18 | Commission Single Market Compliance Space register, legislationId 162400 | 2026-10-14 |
| notified bodies active under Directive 2006/42/EC | 153, unchanged on 2026-10-14 | same register, legislationId 131881 | 2026-10-14 |
| new machinery regime as a share of the outgoing one | 28.1%, was 26.8% on 2026-10-11; 98 days to application | own arithmetic on 43 and 153 | 2026-10-14 |
| German share of notified bodies under Reg (EU) 2023/1230 | 19 of 43, with DGUV Test units 7 of 43 | own count on the complete 43-name register list | 2026-10-14 |
| notified bodies under Reg (EU) 2024/1689, the AI Act | 0, at any notification status, 438 days after Chapter III Section 4 applied, and on the day the first harmonised standard under that Regulation entered into force | same register, legislationId 168380 | 2026-10-14 |
| notified bodies under Reg (EU) 2024/2847, the Cyber Resilience Act | 0, at any notification status, 125 days after Chapter IV applied | same register, legislationId 167953 | 2026-10-14 |
| in-kind compute committed by a frontier lab to a state science programme | USD 150,000,000 over three years to the US Genesis Mission across "more than 15 agencies" (Anthropic, 2026-10-08) against USD 3,000,000 in credits to "up to 200 top European scientific researchers" via the EU RAISE initiative (Google DeepMind and Google Cloud, 2026-10-14) | two company posts, each company's own figure | 2026-10-14 |
| VLA success under hardware and setup perturbation only, tasks held fixed | pooled success 0.932 -> 0.767 at middle severity -> 0.509 at highest; 11 perturbation axes, 5 severity levels, 210 conditions, 9 models, 500 episodes per condition; "training on visual perturbations does not mitigate faults that leave camera images unchanged" | arXiv 2610.18843 | 2026-10-13 |
| real-to-sim policy ordering preserved by a 3DGS twin | 8 of 9 scene-task comparisons, two bimanual platforms, three scenes, three tasks; and "These results do not yet establish a generally reliable scene-acceptance rule" | arXiv 2610.17521 | 2026-10-13 |
| days a Machinery Regulation declaration-of-conformity template pointed at itself in one language | 1,203, Swedish Annex V Section A point 6 reading "punkt 6" for "punkt 5", from the OJ of 2023-06-29 to the corrigendum of 2026-10-14; the fourth corrigendum to that Regulation | own arithmetic on two OJ references | 2026-10-14 |
| days a mandatory card colour was specified as the wrong colour in every language | 698, Dir (EU) 2024/2841 Annex II "yellow" given as CMYK 94,63,7,1 against RGB 255,237,0, corrected to CMYK 0,7,100,0 on 2026-10-13; all 24 language versions at once | own arithmetic on two OJ references | 2026-10-14 |
| days an EU renewable-energy threshold read in the wrong physical unit in one language | 1,079, German Art. 24(4b) of Dir (EU) 2018/2001 as amended reading "25 MWh" for "25 MWth", energy for thermal power, from the OJ of 2023-10-31 to the corrigendum of 2026-10-14 | own arithmetic on two OJ references | 2026-10-14 |
| respondents in a US exclusion proceeding over AI datacenter power delivery | 20, including Hon Hai / Foxconn, Quanta, Delta, Infineon, Flex, Celestica, Luxshare, Monolithic Power Systems and Ingrasys; relief sought "a limited exclusion order and cease and desist orders" | ITC Inv. 337-TA-1526, FR Doc 2026-20993, own count of names served | 2026-10-14 |
| robot world-state replay with a hash chain, corruption detection | 412 of 412 injected corruptions detected, exact terminal-state replay in all episodes, 1.72% storage overhead, 103 simulated Unitree G1 trajectories and 78,369 frames | arXiv 2610.12033 | 2026-10-08 |
