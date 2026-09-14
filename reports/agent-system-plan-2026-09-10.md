# Building the Research Agent System

**A plan for two kinds of agent, the guardrails that keep them honest, and a daily newsletter format to agree on before anything is built.**

This document does three things. It reports what the people whose judgment is worth borrowing actually say about agents and about learning a field to the frontier, with sources cited at the point of each claim. It then proposes a concrete architecture: nine agents split across two categories that answer two genuinely different questions, plus the guardrails and the actual prompt text for each. It closes with a newsletter format written out as a worked sample using real items retrieved on 2026-09-10, so that the format can be argued with rather than imagined. Nothing here is built yet. The point of the document is to settle the format and the guardrails first, because the failure mode of a daily research agent is not that it breaks, it is that it quietly produces plausible text that nobody can check, and by then you have trained yourself to skim it.

---

## Contents

- [1. What the people at the top of this game actually say](#1-what-the-people-at-the-top-of-this-game-actually-say)
  - [1.1 Karpathy: context is the program, and understanding cannot be delegated](#11-karpathy-context-is-the-program-and-understanding-cannot-be-delegated)
  - [1.2 Paul Graham: the four-step recipe, and where most people stop](#12-paul-graham-the-four-step-recipe-and-where-most-people-stop)
  - [1.3 Anthropic's engineering posts: the operating constraints of an agent](#13-anthropics-engineering-posts-the-operating-constraints-of-an-agent)
  - [1.4 The multi-agent result, and its price](#14-the-multi-agent-result-and-its-price)
  - [1.5 Cedric Chin and the expertise researchers: why reading is not enough](#15-cedric-chin-and-the-expertise-researchers-why-reading-is-not-enough)
  - [1.6 How professional analysts actually build depth](#16-how-professional-analysts-actually-build-depth)
  - [1.7 The one number that should govern every guardrail](#17-the-one-number-that-should-govern-every-guardrail)
- [2. Your two categories, made precise](#2-your-two-categories-made-precise)
  - [2.1 Flow and stock](#21-flow-and-stock)
  - [2.2 Why they cannot share an agent](#22-why-they-cannot-share-an-agent)
  - [2.3 What "hold a conversation" actually requires](#23-what-hold-a-conversation-actually-requires)
- [3. The framework: four layers, one ledger](#3-the-framework-four-layers-one-ledger)
  - [3.1 The architecture](#31-the-architecture)
  - [3.2 The single most important design decision](#32-the-single-most-important-design-decision)
  - [3.3 The ledger, and why repetition is the real enemy](#33-the-ledger-and-why-repetition-is-the-real-enemy)
- [4. The flow agents](#4-the-flow-agents)
  - [4.1 F1 Capital Ledger](#41-f1-capital-ledger)
  - [4.2 F2 Compute and Capex](#42-f2-compute-and-capex)
  - [4.3 F3 Policy Diff](#43-f3-policy-diff)
  - [4.4 F4 Frontier Claims](#44-f4-frontier-claims)
  - [4.5 F5 Thesis Sentry](#45-f5-thesis-sentry)
- [5. The stock agents](#5-the-stock-agents)
  - [5.1 S1 Curriculum Builder](#51-s1-curriculum-builder)
  - [5.2 S2 Primary Source Reader](#52-s2-primary-source-reader)
  - [5.3 S3 Explainer](#53-s3-explainer)
  - [5.4 S4 Socratic Examiner](#54-s4-socratic-examiner)
- [6. The editor, and the anti-slop contract](#6-the-editor-and-the-anti-slop-contract)
  - [6.1 The eleven guardrails in plain words](#61-the-eleven-guardrails-in-plain-words)
  - [6.2 The editor prompt](#62-the-editor-prompt)
- [7. The newsletter format, written out](#7-the-newsletter-format-written-out)
  - [7.1 The shape, and why each block exists](#71-the-shape-and-why-each-block-exists)
  - [7.2 A worked sample from real items retrieved 2026-09-10](#72-a-worked-sample-from-real-items-retrieved-2026-09-10)
  - [7.3 The knobs to turn before we build](#73-the-knobs-to-turn-before-we-build)
- [8. What this costs to run](#8-what-this-costs-to-run)
- [9. The portal changes this implies](#9-the-portal-changes-this-implies)
- [10. Closing summary](#10-closing-summary)

---

## 1. What the people at the top of this game actually say

### 1.1 Karpathy: context is the program, and understanding cannot be delegated

**What is Karpathy's actual claim, stated precisely?**

His framing is that programming has moved into a third regime. Software 1.0 was code written by hand, Software 2.0 was weights fitted to data, and Software 3.0 is a system programmed through what you put in front of a language model: prompts, retrieved context, tools, examples, memory and verification. The operative sentence in his Sequoia Ascent talk is that "what's in the context window is your lever over the interpreter, and the interpreter is the LLM" ([karpathy.bearblog.dev, "Sequoia Ascent 2026 summary"](https://karpathy.bearblog.dev/sequoia-ascent-2026/)). This matters for what you are building because it reframes the newsletter agent from a script that fetches and summarises into a program whose source code is the context you assemble, which means the interesting engineering work is choosing what the agent is allowed to see and in what order.

**Why does he think agents currently fail, and does that apply here?**

He is specific about the failure mode: agents lack taste and engineering judgment, and they produce output that is "bloated, copy-pasted, awkwardly abstracted, brittle" while technically satisfying the request. Applied to research writing rather than code, the same defect shows up as prose that is structurally correct and informationally empty, which is exactly the "AI slop" you said you do not want. The correction is not a better model, it is a narrower job description: agents are reliable when the task has a verifiable output and unreliable when the task requires deciding what is worth saying. Every design choice in Section 3 follows from that split.

**What is the sentence worth actually remembering?**

"You can outsource your thinking, but you can't outsource your understanding" ([karpathy.bearblog.dev](https://karpathy.bearblog.dev/sequoia-ascent-2026/)). This is the strongest available argument for your second category being a separate system rather than a longer version of the first. A newsletter can carry thinking to you. It cannot carry understanding to you, and an agent that pretends otherwise produces the comfortable feeling of being informed without the ability to hold a conversation. Karpathy also reports that his own delegation ratio flipped from roughly 80-20 in favour of writing code himself to roughly 20-80 in favour of agents around December 2025, and that the skill he is now building is judgment about what to delegate, how to specify it, and how to review it quickly. The reviewing speed is the part that constrains your design: an agent that produces output you cannot check in two minutes has not saved you time, it has moved the cost.

### 1.2 Paul Graham: the four-step recipe, and where most people stop

**What is the recipe, and which step is the bottleneck?**

Graham reduces doing original work to four steps: choose a field, learn enough about it to reach the frontier, notice the gaps, and explore the promising ones ([paulgraham.com, "How to Do Great Work"](https://paulgraham.com/greatwork.html)). His observation is that most people stop before reaching the frontier, which is the step that cannot be skipped and cannot be delegated. He also argues that originality in choosing problems matters more than originality in solving them, and that if he had to name one quality that produces great work it would be curiosity, because curiosity is what picks the field, pulls you to the edge, and shows you what to work on.

**How does that map onto a two-category agent system?**

Cleanly, and this is the reason the split is the right one rather than an arbitrary one. Your flow category is instrumentation for step three, noticing the gaps: it tells you where the frontier moved this week and who moved it. Your stock category is instrumentation for step two, reaching the frontier at all: it is the only one of the two that changes what you are capable of noticing. A system that is all flow will keep you current and permanently just short of the edge, because current is not the same as deep. The practical consequence for the build order is that the stock agents matter more even though the flow agents are easier to build and more immediately satisfying, and it is worth being honest that this is a real temptation to guard against.

### 1.3 Anthropic's engineering posts: the operating constraints of an agent

**What is the governing principle?**

Anthropic states it as finding "the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome" ([Anthropic, "Effective context engineering for AI agents"](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). The reason this is a hard constraint rather than a style preference is a phenomenon they name context rot: as context length grows, a model's ability to recall information accurately degrades, and the cause is architectural, arising from the n-squared pairwise attention relationships a transformer must maintain. Practically, an agent that reads forty articles and holds them all in one window will summarise the first and last few well and blur the middle, which is a specific and predictable failure rather than bad luck.

**Which of their techniques are load-bearing for a daily newsletter?**

Four of them. *Just-in-time retrieval* means the agent holds lightweight identifiers, meaning URLs, file paths and queries, and pulls the full content only when it decides an item matters, rather than ingesting everything up front. *Compaction* means summarising a long run as it approaches the context limit while deliberately preserving decisions and unresolved questions and discarding redundant tool output. *Structured note-taking* means the agent writes to an external file that survives a context reset, which is how a daily agent can know what it said yesterday without re-reading yesterday. *Sub-agent architectures* mean specialised agents work in clean context windows and return condensed summaries, which Anthropic sizes at roughly 1,000 to 2,000 tokens each, while a coordinating agent never sees the raw material at all.

That last number is the single most useful design constraint in this document. If each collector returns at most about 2,000 tokens of already-filtered material, then an editor coordinating nine collectors is reading roughly 18,000 tokens, which is a comfortable working set. If collectors return raw articles instead, the editor is reading several hundred thousand tokens and will produce exactly the blurred, generic output you are worried about.

**What do they say about tools, and why does it matter for source design?**

Their rule is that if a human engineer cannot definitively say which tool should be used in a given situation, an agent cannot be expected to do better, and that bloated tool sets with overlapping functionality should be eliminated. Translated to your system: do not give one agent both an X reader and a news search and an arXiv search and a filings search, because the overlap means it will make an arbitrary choice and you will not be able to tell from the output which source it actually used. One agent, one source family, one job.

### 1.4 The multi-agent result, and its price

**Does the orchestrator pattern actually work, and by how much?**

Anthropic reports that on internal research evaluations, a system using Claude Opus 4 as a lead agent with Claude Sonnet 4 subagents outperformed a single-agent configuration by more than 90 percent, and that the pattern suits problems that decompose into parallel strands of research while being a poor fit for tightly interdependent work such as coding ([Anthropic, "How we built our multi-agent research system"](https://www.anthropic.com/engineering/multi-agent-research-system)). Daily research across five separate domains is close to the ideal case for this pattern, because the domains genuinely do not depend on each other and can be explored simultaneously.

**What does it cost, and is the cost acceptable here?**

They report roughly fifteen times the token consumption of a chat interaction, and that token usage alone explains about 80 percent of the variance in performance, with tool call count and model choice as the other two factors. This is a real cost and worth naming plainly rather than glossing. The mitigation that fits your case is asymmetric model assignment: collectors are mechanical extraction jobs and can run on a cheap fast model, while the editor and the stock-side explainer are judgment jobs and should run on the strongest model available. Section 8 works the arithmetic.

**What is the non-obvious lesson from their write-up?**

That each subagent needs four things specified explicitly: an objective, an output format, guidance on which tools and sources to use, and clear task boundaries. They also found that agents struggle to judge how much effort a task deserves, so they embedded explicit scaling rules in the prompts. That last point is why every agent prompt in Sections 4 and 5 contains a hard numeric budget rather than a vague instruction to be thorough. An agent told to be thorough will fill space, and filling space is the mechanism by which slop is produced.

### 1.5 Cedric Chin and the expertise researchers: why reading is not enough

**What is the claim that undercuts the "just read more" instinct?**

Chin's argument, drawn from the Naturalistic Decision Making research literature, is that real expertise is largely tacit, meaning it "cannot be captured through words alone", and that the research on extracting tacit knowledge from practitioners is more actionable than the more famous literature on deliberate practice ([Commoncog, "Copying Better: How To Acquire The Tacit Knowledge of Experts"](https://commoncog.com/how-to-learn-tacit-knowledge/)). The field has a thirty-year body of methods for pulling tacit models out of experts, grouped under the name cognitive task analysis, developed in applied domains where getting it wrong was expensive ([Commoncog, "Book Summary: Accelerated Expertise"](https://commoncog.com/accelerated-expertise/)).

**Why does this change how the stock agents should be designed?**

Because it means the deliverable of a learning agent is not a summary, it is a set of judgments you can make. The NDM finding that matters most here is that experts are recognised by how they read situations rather than by what facts they hold, and Chin's coverage of Lia DiBello's NSF-funded work reports that repeat-success business leaders share a common underlying mental model discovered through in-depth study of those leaders ([Commoncog, "A Tacit Mental Model of Business Expertise"](https://commoncog.com/tacit-mental-model-of-business/)). An agent can genuinely help you get there, but only if its output format forces judgment rather than recall: not "here are the six players in the sector" but "here is the disagreement between two credible people about where the margin ends up, and here is what each of them must believe for their position to hold." That is why agent S4 exists, and it is the agent most people would not think to build.

### 1.6 How professional analysts actually build depth

**What do people who are paid to understand industries actually do?**

They privilege primary and proprietary material over secondary commentary. The practitioner literature is consistent that analysts who generate genuine edge build it through original primary research, meaning expert calls, surveys and channel checks, rather than through reading published analysis ([Woozle Research, "Primary Research for Hedge Fund Analysts: A Practitioner's Guide"](https://insights.woozleresearch.com/primary-research-for-hedge-fund-analysts-a-practitioners-guide/)). The institutional version of this is an expert network: Tegus, now merged into AlphaSense, brought a library of more than 100,000 expert call transcripts covering over 4,000 public companies across more than 50 sectors, sitting alongside filings, broker research and earnings transcripts ([Tegus Knowledge Center, "How to Conduct Expert Call Interviews"](https://www.tegus.com/knowledge-center/expert-calls)).

**What is the honest limitation of what an agent can do here?**

An agent cannot make an expert call, and this is the boundary of the whole system. It can read every 10-K, S-1, earnings transcript, standards ballot and patent filing in a sector, which is genuinely most of the way to the frontier and is work you would not otherwise do. It cannot ask a warehouse operations director what actually happens when the picking policy regresses after an over-the-air update. The correct role for the stock agents is therefore to get you to the point where you know which question to ask and who to ask it, which is precisely the rule already recorded in your own operating notes: the pain must be learned from someone already spending money badly on it. The agents make that conversation efficient rather than replacing it.

**Is subscribing to the good newsletters a substitute?**

Partly, and it is worth being concrete about which ones do real work. SemiAnalysis describes itself as covering the semiconductor and AI industries across the entire supply chain from equipment and materials through to models and infrastructure ([SemiAnalysis, "About"](https://newsletter.semianalysis.com/about)), and that supply-chain-spanning frame is the thing to imitate rather than merely read, because it is the structure that lets a single new fact be placed correctly. The reason to still build your own layer is that a published newsletter is written for its median subscriber, and the specific thing you want is the intersection of five axes and three live theses, which no publisher is serving.

### 1.7 The one number that should govern every guardrail

**What is the actual measured failure rate of AI assistants on news?**

In June and July 2025, researchers from 22 public service media organisations across 18 countries working in 14 languages evaluated more than 3,000 AI assistant responses to news questions against criteria including accuracy, sourcing, separation of opinion from fact, and provision of context. Forty-five percent of responses contained at least one significant issue. Thirty-one percent had significant sourcing problems, meaning missing, misleading or fabricated attributions. Twenty percent had major accuracy problems including hallucinated details and outdated information ([EBU, "News Integrity in AI Assistants"](https://www.ebu.ch/research/open/report/news-integrity-in-ai-assistants); full report at [EBU/BBC, PDF](https://www.ebu.ch/files/live/sites/ebu/files/Publications/MIS/open/EBU-MIS-BBC_News_Integrity_in_AI_Assistants_Report_2025.pdf); coverage at [NPR](https://www.npr.org/sections/npr-extra/2025/10/21/g-s1-94424/global-study-on-news-integrity-in-ai-assistants-shows-need-for-safeguards-and-improved-accuracy)).

**Which of those three numbers should worry you most?**

The 31 percent sourcing figure, not the 20 percent accuracy figure. An accuracy error is a wrong fact, which you have some chance of catching because it will eventually contradict something else you know. A sourcing error is a correct-looking citation that does not support the claim attached to it, which is undetectable by reading and only surfaces if someone follows the link. This is the single strongest argument for the guardrail in Section 6 that no claim may appear without a link that was actually retrieved in that run, and that the editor must be able to name which fetched document each sentence came from. It also explains why "cite your sources" is not a sufficient instruction: the study measured systems that were citing sources.

**Is there a counterweight to reading that pessimistically?**

Yes, and it should be stated. The earlier February 2025 BBC-specific study found significant issues in 51 percent of responses against 37 percent in the comparable EBU measurement, which suggests the systems improved materially in roughly eight months. And hallucination rates are strongly task-dependent: on straightforward summarisation of a document that is actually in context, reported rates for frontier models fall well below two percent, while open-ended high-complexity reasoning remains far worse. That contrast is itself a design instruction. Summarising a document the agent has actually fetched is close to a solved problem. Answering "what happened in robotics this week" from the model's own sense of the world is not. Every agent below is therefore structured to do the former and structurally prevented from doing the latter.

---

## 2. Your two categories, made precise

### 2.1 Flow and stock

**What is the actual distinction?**

You described two categories: one for trends and reports and what is moving, and one for genuinely understanding a part of the industry well enough to hold a conversation. The economically precise names for these are flow and stock. Flow is perishable and its value is in the delta: a funding round matters because it is new, and a report that a round happened three months ago is nearly worthless as flow while remaining useful as evidence. Stock is durable and its value compounds: understanding how a semiconductor fab's cost structure works does not decay, and every new flow item about fabs lands in a structure that already exists and therefore means something.

**Why does naming it this way help?**

Because it produces the correct success test for each, and without a success test you cannot tell a working agent from a fluent one. A flow agent succeeds if, on a day when nothing important happened, it says so in one line. A stock agent succeeds if, six weeks later, you can explain the domain to a skeptical practitioner without notes and survive their follow-up questions. Those are different measurements, and note that the flow test rewards restraint while the stock test rewards depth. An agent optimised for one will fail the other.

### 2.2 Why they cannot share an agent

**What breaks if you combine them?**

Three things, each of which is a common failure in practice. First, cadence: flow is daily because its value decays in days, while stock is weekly or slower because a domain does not become understandable faster by being visited more often. Second, the drive to fill: an agent asked to both report the news and teach you something will teach you something every day whether or not it has anything to teach, and the material it invents to fill that slot is precisely the slop you are trying to avoid. Third, and most subtly, the two require opposite dispositions toward novelty. A flow agent must be biased toward what is new, since old news is not news. A stock agent must be biased toward what is settled and load-bearing, since the foundational mechanics of an industry are rarely this week's headline. One prompt cannot hold both biases without becoming vague.

**So what is the relationship between them?**

The stock side sets the reading frame, and the flow side fills it. Concretely, once agent S3 has produced an explainer on robot-policy unbundling, the flow agents can tag items against that structure, so a new round is not just a round, it is evidence about which layer of a value chain is capturing margin. Before the explainer exists, the same round is just a number you read and forget. This is the same mechanism as Graham's step two enabling step three: reaching the frontier is what makes gaps visible.

### 2.3 What "hold a conversation" actually requires

**What does the bar actually consist of?**

Being able to hold a conversation with someone who works in a field requires six specific things, and it is worth enumerating them because they become the mandatory output sections of agent S3. You need the vocabulary, meaning the twenty or so terms practitioners use without defining. You need the value chain, meaning who sells what to whom, in order, from raw input to end buyer. You need the money, meaning where the margin actually sits and roughly what the unit economics look like at each step. You need the constraint, meaning the thing that is actually scarce and therefore governs everyone's behaviour. You need the live disagreement, meaning the question on which two credible practitioners hold opposing views and what each must believe. And you need the recent history, meaning the two or three events in the last few years that everyone in the field treats as context and will reference without explaining.

**Why enumerate it rather than just asking for a good explainer?**

Because "explain this industry to me" produces an encyclopedia entry, which is the format that feels most like learning and transfers least. The six-part structure above is a checklist an agent can be held to and you can grade. If the explainer cannot name the binding constraint, it has not understood the industry, and you will discover that in the document rather than in a conversation with someone who does.

---

## 3. The framework: four layers, one ledger

### 3.1 The architecture

**What is the shape of the system?**

Four layers, with a persistent ledger to the side that every layer reads and only two layers write to. The critical property is that raw source material never reaches the editor. Collectors read raw material and emit small structured records; the editor reads only records.

```
  SOURCES                COLLECTORS            EDITOR           SURFACES
  (external, dumb)       (narrow, one          (one, judgment)  (what you see)
                          source family each)

  SEC / Form D  ─────┐
  Crunchbase    ─────┼──▶  F1 Capital Ledger ─┐
  fund closes   ─────┘         (≤2k tokens)   │
                                              │
  earnings calls ────┐                        │
  capex guidance ────┼──▶  F2 Compute/Capex ──┤
  DC announcements ──┘         (≤2k tokens)   │
                                              │
  Federal Register ──┐                        │      ┌──────────┐
  EUR-Lex / OJ    ───┼──▶  F3 Policy Diff ────┼─────▶│  DAILY   │──▶ newsletter
  BIS / MOFCOM    ───┤         (≤2k tokens)   │      │  EDITOR  │    (1 page)
  ISO / CEN / ANSI ──┘                        │      │          │
                                              │      │ dedupe   │──▶ portal cards
  X account list ────┐                        │      │ rank     │
  arXiv cs.RO/LG ────┼──▶  F4 Frontier Claims─┤      │ write    │──▶ scratchpad
  lab blogs       ───┘         (≤2k tokens)   │      │ refuse   │    prompt
                                              │      └────┬─────┘
  all of the above ──────▶  F5 Thesis Sentry ─┘           │
                            (fires only on evidence)      │
                                                          │
  ────────────────────────────────────────────────────────┼──────────────
  STOCK SIDE (weekly, separate cadence)                   │
                                                          │
  S1 Curriculum ──▶ S2 Primary Source ──▶ S3 Explainer ───┤
     (syllabus)        Reader (filings,      (the 6-part  │
                       standards, calls)      brief)      │
                                                          │
                       S4 Socratic Examiner ◀─────────────┘
                          (asks YOU questions)

  ┌─────────────────────────────────────────────────────────────────┐
  │  THE LEDGER   logs/ledger.jsonl  +  reports/knowledge-state.md  │
  │  every item ever surfaced, every claim ever made, every open    │
  │  question, every thesis and its kill test.  Read by all.        │
  │  Written by the editor and by S3 only.                          │
  └─────────────────────────────────────────────────────────────────┘
```

**Why does the editor sit alone in its own layer?**

Because deciding what is worth your attention is the only genuinely hard judgment in the system, and it needs a clean context window containing nothing but candidate records and yesterday's ledger. If the editor also fetches and reads, its window fills with raw text, context rot sets in, and the ranking degrades in a way that is invisible from the output. Keeping it starved of raw material is what makes its judgment trustworthy.

### 3.2 The single most important design decision

**If only one thing from this document survives, what should it be?**

Separate collection from writing, and give the writer a hard budget it cannot exceed. Almost every disappointing research agent fails in the same way: one agent is asked to gather and then write, it gathers more than it can hold, and then it writes to fill the expected length. The output is fluent, structurally correct, and contains three real facts wearing eight hundred words. Splitting the roles means the collector's job is extraction, which is verifiable and cheap, and the writer's job is selection, which is where you actually want intelligence spent. The budget matters because it converts the writer's task from "describe everything I received" into "choose what earns the space", and choosing is the behaviour you are paying for.

### 3.3 The ledger, and why repetition is the real enemy

**What goes wrong without persistent memory?**

The agent tells you on Tuesday what it told you on Monday, in slightly different words, and after a week you stop reading carefully. This is a more likely death for the system than any factual error, because it is gradual and feels like nothing is wrong. Anthropic's structured note-taking pattern is the fix: an external file the agent writes to and reads back, which survives context resets and lets a daily process have a memory longer than one run.

**What exactly should it store?**

Two files with different jobs. A machine-readable append-only log, `logs/ledger.jsonl`, with one line per item ever surfaced, carrying the URL, a normalised entity name, the date, the axis, the claim in one sentence, and the verification status. Its purpose is mechanical deduplication and answering questions like "when did I first see this company". And a human-readable state file, `reports/knowledge-state.md`, holding what you currently believe, which domains have explainers and to what depth, the live theses with their kill tests, and the open questions you have not answered. Its purpose is to be pasted into any agent's context as the answer to "what does he already know", which is the question that determines whether an item is worth surfacing at all.

---

## 4. The flow agents

Each agent below is specified the way Anthropic's multi-agent write-up recommends, with an objective, an output format, explicit source guidance, and hard boundaries. The prompts are written to be used as-is. Every one of them inherits the eleven guardrails in Section 6, which are appended rather than repeated.

### 4.1 F1 Capital Ledger

**What it watches:** SEC Form D filings, Crunchbase and PitchBook round announcements, fund formation and close announcements, sovereign vehicle activity, corporate venture arms.
**Cadence:** daily at 07:00 PT, with a weekly roll-up on Monday.
**Runs on:** a fast cheap model. This is extraction, not judgment.
**Output ceiling:** 2,000 tokens, maximum 12 records.

**What is the boundary that keeps it useful?** A floor, and a sector allow-list. Without a floor it will report every pre-seed round in every sector and you will stop reading. The floor is a parameter to set in Section 7.3, not something the agent decides.

```
ROLE
You are the Capital Ledger collector. You do one thing: find capital
commitments announced in the window and emit structured records. You do
not write prose, rank items, or draw conclusions.

WINDOW
The last 24 hours, using the announcement date, not the date you found it.
If an item's announcement date is outside the window, discard it silently.

SOURCES, in priority order
1. SEC Form D filings (primary; authoritative but lagging and unstructured)
2. Company press releases and investor blog posts (primary; self-reported)
3. Crunchbase / PitchBook round records (secondary; usually accurate)
4. Trade press reporting a round (secondary; use only if 1-3 unavailable)
Never use a social media post as the sole source for a funding number.

FILTER
Include only if BOTH:
  - disclosed amount >= {FLOOR} , and
  - sector is in {SECTORS}
Exception, always include regardless of floor: any round in a company whose
one-liner matches a live thesis in reports/knowledge-state.md.

FOR EACH ITEM, EMIT
  company:        legal or commonly used name
  amount:         as reported, with currency
  round:          seed / A / B / ... / growth / debt / grant
  lead:           lead investor, or "not disclosed"
  others:         other named participants
  valuation:      as reported, or "not disclosed". Never infer.
  sells:          one sentence, what the company sells and to whom
  why_now:        one sentence, what the company or investor says changed
  date:           announcement date, ISO
  source_url:     the URL you actually retrieved
  source_type:    primary-filing | primary-company | secondary-database |
                  secondary-press
  verified:       two-source | single-source

HARD RULES
- If you did not retrieve the page, the item does not exist. Do not emit an
  item from memory or from a search snippet alone.
- If sources disagree on the amount, emit both and set verified: single-source.
- Do not convert currencies. Do not annualise. Do not compute totals.
- "Valuation" means a figure the company or a named investor stated. A figure
  a journalist calculated is not a valuation; put it in why_now and say who
  calculated it.
- Maximum 12 items. If more qualify, keep the 12 largest by amount and add a
  final record: overflow: N further items above floor, not reported.
- If nothing qualifies, emit exactly: no qualifying items in window.
```

### 4.2 F2 Compute and Capex

**What it watches:** hyperscaler capital expenditure guidance and actuals from earnings calls and filings, datacenter site announcements, power purchase agreements and interconnection queue news, accelerator supply commitments.
**Cadence:** weekly, with an event-driven trigger on any earnings call from a named operator.
**Runs on:** fast cheap model for extraction; the quarterly comparison needs care and should be checked.
**Output ceiling:** 1,500 tokens.

**Why does this deserve its own agent rather than living inside F1?** Because it is the largest capital flow in the sector and it is structurally different from venture flow. It is company-guided rather than modelled, it is reported on a quarterly rhythm rather than continuously, and it is the number with the least estimation risk in the entire landscape. Mixing it into a venture round feed buries it. Your portal already records the current figure, at 725 to 800 billion dollars of 2026 hyperscaler capex guided by five operators with 55 to 60 percent flowing to NVIDIA, and the job of this agent is to maintain that number rather than rediscover it.

```
ROLE
You are the Compute and Capex collector. You maintain a small set of numbers
over time rather than reporting news. Your output is a diff.

STATE YOU CARRY FORWARD
Read reports/knowledge-state.md section "capex" for the last recorded value of
each tracked line. Your job is to report only what changed against it.

TRACKED LINES
  - capex guidance, per operator, current fiscal year
  - capex actual, per operator, last reported quarter
  - accelerator share of capex, where stated
  - announced datacenter capacity, in MW, per operator per site
  - power agreements: counterparty, MW, term, region

SOURCES
1. Earnings call transcripts and 10-Q / 10-K filings (primary)
2. Operator press releases and investor decks (primary, self-reported)
3. Utility interconnection filings and regulator dockets (primary)
4. Trade press (secondary, only to find the primary)

FOR EACH CHANGE, EMIT
  line:        which tracked line
  was:         previous value and the date it was recorded
  now:         new value
  delta:       arithmetic difference, computed, shown
  said_by:     the person and role who stated it, if a call
  source_url:  URL retrieved
  quote:       the exact sentence from the source that carries the number

HARD RULES
- The quote field is mandatory. If you cannot quote a sentence containing the
  number, do not emit the item.
- Guidance and actuals are different lines. Never compare one against the
  other, and never blend them into a single figure.
- If an operator restates a prior figure, report the restatement as its own
  change, because a quiet restatement is itself the news.
- If no tracked line changed, emit: no change to tracked capex lines. Then stop.
```

### 4.3 F3 Policy Diff

**What it watches:** the Federal Register, BIS entity-list and export-control actions, CFIUS decisions, the EU Official Journal, CEN/CENELEC and ISO work programmes, MOFCOM notices, and standards bodies directly.
**Cadence:** daily, with a hard weekly summary on Wednesday.
**Runs on:** fast cheap model. This is diffing, which is mechanical.
**Output ceiling:** 1,500 tokens.

**Why is this the highest-value flow agent for your specific position?** Because your thesis portfolio is built on a dated legal obligation, the EU Machinery Regulation applying on 20 January 2027, and because policy is the one domain where the primary source is free, authoritative, machine-readable, and almost nobody reads it. It is also where the sourcing failures in the EBU study matter least, since the agent can quote a regulation directly rather than summarising a journalist summarising it.

A live illustration of why this agent earns its place: on 15 January 2026 BIS published a final rule shifting the export licence review policy for certain advanced computing semiconductors bound for China and Macau from a presumption of denial to case-by-case review, with eligibility thresholds set at total processing performance below 21,000 and total DRAM bandwidth below 6,500 GB per second, which corresponds roughly to the NVIDIA H200 and AMD MI325X class of accelerator ([Federal Register, "Revision to License Review Policy for Advanced Computing Commodities"](https://www.federalregister.gov/documents/2026/01/15/2026-00789/revision-to-license-review-policy-for-advanced-computing-commodities); analysis at [Morgan Lewis](https://www.morganlewis.com/pubs/2026/01/bis-revises-export-review-policy-for-advanced-ai-chips-destined-for-china-and-macau)). The detail worth noticing, and the reason a diff agent beats a news agent, is buried in the conditions: eligibility requires that the item undergo independent third-party testing to verify its performance specifications. That is a new mandatory third-party verification regime appearing in export control, which is direct structural evidence for the assurance-seam thesis already on your board, and no headline about the rule mentioned it.

```
ROLE
You are the Policy Diff collector. You maintain a watchlist of legal and
standards instruments and report only movement. You never characterise a
change as good, bad, favourable or concerning.

WATCHLIST
Read the watchlist from reports/knowledge-state.md section "instruments".
It currently includes, and you must carry all of these forward:
  - Machinery Regulation (EU) 2023/1230, applies 2027-01-20, Annex I Part A
    item 5 covering self-evolving ML safety components
  - ISO 25785-1, humanoid safety, unpublished
  - CEN/CENELEC AI harmonised standards, Aug 2025 deadline missed
  - EU AI Act Annex III delegated acts for machinery, due 2028-08-02
  - NHTSA post-AV-STEP exemption regime, AV STEP withdrawn 2026-06-26
  - ISO 10218-1/-2:2025, ANSI/A3 R15.06-2025, UL 3300 NRTL listing
  - BIS advanced computing licence policy and TPP/bandwidth thresholds
  - FMCSA broker bond and double-brokering penalties

SOURCES, primary only
Federal Register, EUR-Lex and the EU Official Journal, BIS, CFIUS, MOFCOM,
national control authorities, and the standards bodies' own ballot and work
programme pages. Trade press may be used to FIND a primary document and may
never be cited in place of one.

FOR EACH MOVEMENT, EMIT
  instrument:   which watchlist entry, or NEW if not on the list
  movement:     published | amended | in force | delayed | withdrawn |
                ballot advanced | designation granted | threshold changed
  effective:    the date it bites, ISO, or "none stated"
  binds:        who is now obliged to do what, one sentence
  citation:     article / annex / section number
  source_url:   the primary document URL
  quote:        the operative sentence, verbatim
  new_dates:    any date created or moved by this movement

ALSO EMIT, and this is the part people miss
  buried:       any requirement inside the document that creates a new
                obligation for testing, certification, attestation or
                third-party verification, even if it is not the headline of
                the document. One line each. If none, say none.

HARD RULES
- Quote or drop it. Every movement carries a verbatim operative sentence.
- Do not summarise the document's purpose. Report what changed and who it binds.
- A journalist's characterisation is not a movement. A document is.
- If nothing on the watchlist moved, emit: no watchlist movement. Then stop.
```

### 4.4 F4 Frontier Claims

**What it watches:** a hand-built list of roughly 150 X accounts, arXiv in the categories you care about, and frontier lab publication pages.
**Cadence:** daily.
**Runs on:** fast cheap model for extraction; the dispute detection benefits from a stronger model.
**Output ceiling:** 2,000 tokens.

**What makes this agent hard, and what is the honest constraint?** Two things. The account list is the entire asset and it cannot be generated, it has to be built by hand once and pruned continuously, because the difference between a useful X feed and a useless one is entirely in the selection. And X access requires either a paid API tier or an authorised browser session, which is a real dependency rather than a detail; the Chrome extension is currently not connected on your machine, so this agent is blocked until one of those is resolved.

**What is the design move that makes it valuable rather than noisy?** Reporting the disagreement rather than the claim. A lab announcement is marketing until someone credible pushes back, and the reply tree is where the actual information is. This also directly implements the distinction the EBU study measured, separating what a party asserts from what has been independently checked.

```
ROLE
You are the Frontier Claims collector. You surface technical claims and,
crucially, whether anyone credible disputed them. A claim without its
reception is half an item.

WINDOW
Last 24 hours by post or paper timestamp.

SOURCES
1. The account list in data/x-accounts.txt. Read quote-posts and reply trees,
   not only top-level posts.
2. arXiv listings for {CATEGORIES}, new submissions and v2+ revisions.
3. The publication pages of named frontier labs in {LABS}.

FOR EACH CLAIM, EMIT
  claim:        the assertion in one sentence, in the claimant's own framing
  number:       the quantitative content, or "none" if the claim is qualitative
  claimant:     who, and their affiliation
  kind:         lab-announcement | paper | practitioner-observation | rumour
  evidence:     what backs it: benchmark, n rollouts, ablation, anecdote, none
  disputed_by:  anyone credible who pushed back, and their one-line objection.
                If nobody did, write "no pushback observed in window".
  replication:  independent | self-reported | none. Default to self-reported
                unless a named third party reproduced it.
  source_url:   the post or paper URL

ALSO EMIT
  first_seen:   any term or framing with no appearance in the last 30 days of
                reports/. Check the ledger before asserting novelty.

HARD RULES
- Never merge a lab's claim and its criticism into a neutral-sounding sentence.
  Keep them as separate labelled fields. The tension is the information.
- A retweet is not a claim. A screenshot without a link is not a source.
- Do not include an item because it is popular. Engagement is not evidence.
- Cap: 8 claims. If more qualify, prefer claims carrying a number, then claims
  that were disputed, then everything else.
- If the window is genuinely quiet, emit: no substantive claims in window.
```

### 4.5 F5 Thesis Sentry

**What it watches:** everything the other four agents emitted, plus a targeted search against each live thesis.
**Cadence:** daily, but it usually produces nothing, and that is the design.
**Runs on:** strongest available model. This is judgment.
**Output ceiling:** 800 tokens.

**Why is an agent that usually stays silent worth building?** Because it is the only one whose job is to try to falsify what you believe, and because the alternative is that you notice contradicting evidence months late, when it is expensive. Your own operating notes already attach a kill test to every thesis and every node on the supply-chain map. This agent is the mechanism that actually runs those tests against incoming reality instead of leaving them written down and unused. It is also the agent most likely to tell you something you do not want to hear, which is exactly why its output ceiling is small and its bar is high: it should be rare enough that when it fires, you read it.

```
ROLE
You are the Thesis Sentry. You hold the live theses and their kill tests and
you look for evidence that would move them. You are not an advocate. You do
not defend a thesis and you do not attack one. You report evidence and say
which direction it points.

INPUT
  - reports/knowledge-state.md section "theses": each thesis, what it claims,
    and its kill test
  - today's records from F1, F2, F3, F4

FOR EACH PIECE OF RELEVANT EVIDENCE, EMIT
  thesis:       which one
  evidence:     the fact, in one sentence, with its source URL
  direction:    supports | weakens | fires-kill-test | changes-the-clock
  mechanism:    one sentence on WHY it points that way. This is the only place
                in the whole system where you are permitted to reason rather
                than report, and you must keep it to one sentence.
  confidence:   what would have to also be true for this reading to hold

BAR FOR INCLUSION
Include an item only if a reasonable person holding the opposite view would
also agree it is relevant. Directional mood, sector sentiment, and "this feels
consistent with" do not qualify. A named competitor entering the seam
qualifies. A new dated obligation qualifies. A funding round in an adjacent
sector does not.

HARD RULES
- Never recommend an action. Not "you should", not "worth watching", not
  "this suggests you may want to". Report the evidence and its direction.
- Weakening evidence gets the same prominence as supporting evidence. If you
  emit three supporting items and suppress one weakening item, you have
  failed at the only thing you are for.
- Maximum 3 items.
- Silence is the expected output. If nothing meets the bar, emit exactly:
  no thesis-relevant evidence today. Do not pad.
```

---

## 5. The stock agents

These run on a slower clock and produce durable documents rather than daily items. All four exist to serve one goal: getting you to the frontier of a named domain, in Graham's sense, fast enough that the flow agents start meaning something.

### 5.1 S1 Curriculum Builder

**What it does:** takes one named domain and produces a reading and question plan sized to a fixed number of hours, ordered so that each item is comprehensible given the previous ones.
**Cadence:** once per domain, at the start.
**Runs on:** strongest available model.
**Output:** one markdown file, `reports/curriculum-{domain}.md`, capped at 1,200 words.

**Why does a curriculum need to be an agent rather than a list?** Because ordering is the hard part and it is domain-specific. Most reading lists are ranked by quality, which is useless if item one presumes vocabulary from item seven. The valuable output is a dependency-ordered path with an explicit statement of what each item is for, plus, and this is the part that makes it honest, a named endpoint test so you can tell when you have arrived.

```
ROLE
You build a dependency-ordered curriculum for one domain. The reader is
technically strong, has no background in this specific industry, and has a
fixed budget of {HOURS} hours. Your output is a path, not a library.

FIRST, ESTABLISH THE ENDPOINT
Write the six things the reader must be able to do at the end, using this
fixed structure:
  1. vocabulary: the ~20 terms practitioners use without defining
  2. value chain: who sells what to whom, from raw input to end buyer
  3. money: where margin sits, rough unit economics at each step
  4. constraint: what is actually scarce and therefore governs behaviour
  5. live disagreement: the open question and what each side must believe
  6. recent history: the 2-3 events everyone treats as shared context
State these BEFORE selecting any reading, because the endpoint determines the
path.

THEN BUILD THE PATH
Order items by dependency, not by quality. For each item:
  order:      n
  item:       title and author or issuer, with URL
  kind:       primary-filing | standard | textbook-chapter | analyst-report |
              paper | earnings-call | trade-press | podcast
  hours:      realistic reading time
  for:        which of the six endpoints it serves
  presumes:   what the reader must already know, referencing earlier items
  skip_if:    the condition under which this item is safe to skip

SOURCE MIX, enforced
At least 40% of the hours must be primary material: filings, standards,
earnings transcripts, regulator dockets, patents. Analyst reports and trade
press are secondary and capped at 30% of hours combined. This ratio is not
negotiable, because secondary material teaches you the consensus reading of a
field and primary material is where the consensus is wrong.

CLOSE WITH
  - the endpoint test: 5 questions a practitioner would ask that the reader
    should be able to answer after the path
  - the 3 questions the path CANNOT answer, and who would have to be asked

HARD RULES
- If you cannot find real primary sources for this domain, say so explicitly
  and name what you searched. Do not substitute trade press and call it primary.
- Every URL must have been retrieved. No composed or guessed URLs.
- Cap 1,200 words. A curriculum longer than that will not be followed.
```

### 5.2 S2 Primary Source Reader

**What it does:** reads one primary document properly, meaning a 10-K, an S-1, an earnings transcript, a standards draft or a regulator docket, and extracts the mechanics rather than the narrative.
**Cadence:** on demand, one document per run.
**Runs on:** strongest available model, because the value is entirely in noticing what is unusual.
**Output:** appended to `reports/primary-{domain}.md`, capped at 900 words per document.

**Why is this the agent that most changes what you know?** Because primary documents are where companies are legally obliged to say true things about their own economics, and almost nobody reads them. The risk factors section of a 10-K is a list of what management actually worries about, written under liability. An S-1 contains the cohort economics a private company would never otherwise disclose. A standards draft tells you what the committee could not agree on, which is where the commercial opening is. The specific skill this agent encodes is reading for the anomaly: the segment whose margin does not match its peers, the disclosure that appeared this year and not last, the definitional footnote that makes a headline metric mean something narrower than it sounds.

```
ROLE
You read ONE primary document and extract its mechanics. You are not
summarising it. A summary of a 10-K is worthless; the document is already a
summary. You are looking for what the document reveals that its own headline
does not.

INPUT
One document URL or file path, plus the domain it belongs to.

EXTRACT, in this order
  what_it_is:     document type, issuer, period, filing date
  the_business:   how this entity actually makes money, in three sentences,
                  using the document's own segment definitions
  the_numbers:    the 5-8 figures that govern the business. For each: the
                  figure, the line item it comes from, and the prior-period
                  comparison if the document gives one.
  definitions:    any place the document defines a metric more narrowly than
                  the word suggests. Quote the definition. This is where
                  headline numbers go to die.
  what_changed:   anything present in this filing and absent in the prior
                  one, or vice versa. New risk factors, new segments,
                  removed disclosures, changed accounting.
  the_worry:      what management actually appears to worry about, evidenced
                  by which risk factors moved up, lengthened, or appeared.
  the_anomaly:    the one thing in this document that does not fit the
                  pattern you would expect from a peer. State it, and state
                  what would explain it.
  unanswered:     what the document deliberately does not disclose

HARD RULES
- Quote, with section reference, for every number and every definition.
- If the document does not support a field, write "not disclosed". Never fill
  a field by inference from another company or from general knowledge.
- the_anomaly may be "nothing anomalous". That is a real and useful finding.
- Do not editorialise about whether the business is good.
- Cap 900 words.
```

### 5.3 S3 Explainer

**What it does:** produces the six-part brief that gets you to conversational depth in a domain, drawing only on what S2 has already extracted plus explicitly cited external sources.
**Cadence:** once per domain, after the curriculum path is walked; revised when the Thesis Sentry or the flow agents contradict it.
**Runs on:** strongest available model.
**Output:** `reports/explainer-{domain}.md`, 2,000 to 2,500 words, and this is the one place a longer document is correct.

**Why is this the deliverable that matters most?** Because it is the artefact that converts flow into signal. It is also the one you can test: hand it to someone who works in the field and watch which paragraph they object to. Note the constraint in the prompt that it may only use material already extracted by S2 or explicitly fetched in its own run. Without that constraint it will write a fluent industry overview from the model's priors, which is the single most convincing form of slop, because it is usually broadly true and specifically unreliable.

```
ROLE
You write the brief that gets a technically strong reader from zero to able
to hold a real conversation with a practitioner in ONE domain.

MATERIAL YOU MAY USE
  - everything in reports/primary-{domain}.md, extracted by S2
  - documents you fetch during this run, cited inline
  - nothing else. You may not use general knowledge about the industry. If a
    fact is not in your material, either fetch a source for it or leave it out
    and note the gap.

STRUCTURE, exactly these six sections, in this order

1. THE VOCABULARY
   ~20 terms practitioners use without defining. Each: the term, one sentence
   of what it means, and one sentence on why it exists, meaning what problem
   made the field need this word.

2. THE VALUE CHAIN
   Who sells what to whom, from raw input to end buyer, in order. Include an
   ASCII diagram. Name real companies at each step. Where a step is
   concentrated, say how concentrated and cite the source.

3. THE MONEY
   Where margin actually sits, and rough unit economics at each step. Label
   every figure with its source and date. Where estimates from different
   houses disagree materially, give the range and both sources rather than a
   midpoint, and say what the disagreement is about.

4. THE CONSTRAINT
   What is actually scarce, and therefore what governs everyone's behaviour.
   This section is the test of whether you understood the industry. If you
   cannot name a binding constraint, say so plainly rather than naming a
   generic one like "talent" or "capital".

5. THE LIVE DISAGREEMENT
   The question on which two credible practitioners hold opposing views.
   State both positions, name who holds them, and state what each side must
   believe for their position to hold. Do not adjudicate.

6. THE RECENT HISTORY
   The 2-3 events in the last few years that everyone in the field treats as
   shared context and will reference without explaining. Date each.

CLOSE WITH
  - what you could not find out, and what you searched
  - the 5 questions a practitioner would ask that this brief does not answer

HARD RULES
- Inline citation at the point of the claim, as a markdown link. Not a
  bibliography.
- Where a source is a vendor describing its own product or market, say so in
  the sentence.
- No em dashes. Full sentences. No bulleted explanation paragraphs; bullets
  are for the vocabulary list only.
- 2,000-2,500 words. Under 2,000 means you skipped something. Over 2,500
  means you are padding.
```

### 5.4 S4 Socratic Examiner

**What it does:** asks you questions. It produces no research at all.
**Cadence:** weekly, on a domain that has an explainer.
**Runs on:** strongest available model.
**Output:** 8 questions, then it waits for your answers, then it grades them against the explainer and names the specific gap.

**Why build this, given it is the least obvious agent in the set?** Because it is the only component that measures whether the system is working. Every other agent produces text, and text accumulating in a folder feels like progress whether or not anything reached you. This one produces evidence, and it is the direct operationalisation of Karpathy's line about not being able to outsource understanding: the only proof that you understand a domain is that you can answer an unrehearsed question about it. The NDM literature supports the specific format too, since cognitive task analysis methods work by presenting a situation and asking the expert what they would do, rather than asking what they know ([Commoncog, "Copying Better"](https://commoncog.com/how-to-learn-tacit-knowledge/)).

```
ROLE
You examine the reader on one domain. You produce NO research. You ask
questions, receive answers, and identify gaps.

INPUT
  reports/explainer-{domain}.md and reports/primary-{domain}.md

ASK EXACTLY 8 QUESTIONS, one of each type

1. MECHANISM: "Walk me through what physically happens when X."
2. MONEY: "Who pays for X, and out of which budget line?"
3. CONSTRAINT: "If Y doubled tomorrow, what breaks first, and why?"
4. COUNTERFACTUAL: "Why hasn't the obvious incumbent already done X?"
5. NUMBER: "Roughly what order of magnitude is X, and how would you sanity
   check it?"
6. DISAGREEMENT: "Someone credible thinks the opposite of X. What do they
   have to believe?"
7. BOUNDARY: "Where does the analogy to {adjacent industry} stop working?"
8. SITUATION: a concrete scenario in 3 sentences, then "what would you look
   at first?"

RULES FOR THE QUESTIONS
- Every question must be answerable from the explainer plus reasoning. Never
  ask for a fact that requires recall of a specific figure; you are testing
  models, not memory.
- Never ask a question whose answer is yes or no.
- Do not hint. Do not give the answer in the question.

AFTER THE READER ANSWERS
For each answer, output one of:
  SOLID     : the model is right, say which part carried it
  PARTIAL   : name the specific missing piece and the section that covers it
  MISSING   : name what needs to be read, and be specific about which page
And then one line: which of the six explainer sections is weakest, based on
the pattern across all eight answers.

HARD RULES
- Do not be encouraging. Do not soften a MISSING into a PARTIAL. The whole
  value of this agent is that it is the only honest signal in the system.
- Do not grade on eloquence. A blunt correct answer is SOLID.
- If an answer reveals the explainer itself is wrong, say that instead, and
  flag the explainer for revision.
```

---

## 6. The editor, and the anti-slop contract

### 6.1 The eleven guardrails in plain words

These are written as rules with the reason attached, because a rule without its reason gets relaxed the first time it is inconvenient. Every agent inherits all eleven.

**1. No link, no claim.** Every factual sentence traces to a URL that was actually retrieved during that run. Not a search snippet, not a remembered fact, not a plausible reconstruction of a URL. *The reason:* the EBU study found 31 percent of AI news responses had significant sourcing problems including fabricated citations, which is a higher failure rate than the accuracy problems and is undetectable without following links.

**2. Quote the number.** Any figure must be accompanied by the verbatim sentence from the source that contains it. *The reason:* it makes the most common silent error impossible, which is a number that is real but attached to the wrong entity, period or unit.

**3. Say who is talking.** Every claim is labelled as primary-filing, primary-company, secondary-database or secondary-press, and vendor claims about the vendor's own market are marked as such in the sentence itself. *The reason:* your own existing research already turns on this distinction, since every humanoid autonomy claim in the field is a company self-report with no matched-protocol independent replication, and a brief that flattens that distinction destroys the most important thing you know.

**4. Nothing happened is a valid report.** Each agent has a mandatory literal output for an empty window, and producing it counts as success. *The reason:* the mechanism that generates slop is an agent that must produce content on a schedule. Removing that obligation removes the mechanism.

**5. Hard budgets, not guidance.** Every agent has a numeric token and item ceiling, and the editor has a word ceiling. *The reason:* Anthropic found agents cannot judge how much effort a task deserves and had to embed explicit scaling rules in prompts. "Be concise" is not a constraint; 300 words is.

**6. No adjective that is not in the source.** Agents may not call a round large, a shift significant, a company leading, or a trend accelerating, unless the source says so and is quoted saying it. *The reason:* evaluative adjectives are where an agent smuggles in a conclusion it has not earned, and they are also the texture that makes text read as machine-generated.

**7. No recommendations.** Agents report facts and, in the Thesis Sentry's case only, the direction evidence points. They never say what to do, what to watch, or what is worth considering. *The reason:* this is your standing rule, recorded on 2026-09-10: lay out the facts and observations, do not do the cognition. An agent that recommends is substituting its judgment for yours at the exact moment you are trying to build yours.

**8. Novelty must be checked, not asserted.** Before an agent says something is new, a first, or unprecedented, it queries the ledger. *The reason:* "for the first time" is the highest-value claim a research brief can make and the easiest to get wrong, and an unchecked novelty claim will eventually embarrass you in a conversation.

**9. Dateline discipline.** Items are filtered on the source's own publication or announcement date, never on when the agent found them. Republished and syndicated items are dropped. *The reason:* the EBU study specifically identified outdated information presented as current as a major accuracy failure.

**10. The provenance block is mandatory.** Every output ends with what was read, what was skipped and why, and what could not be reached. *The reason:* it converts an unauditable document into an auditable one, and it surfaces silent failure. An agent whose provenance block says it could not reach three of its five sources has told you its output is thin, which you would otherwise have to guess.

**11. One reviewable page.** The daily output fits on one screen and is checkable in two minutes. *The reason:* Karpathy's constraint on agentic work is review speed. An output you cannot review quickly has not saved you time, it has deferred the cost and added the risk that you stop reviewing at all.

### 6.2 The editor prompt

```
ROLE
You are the Daily Editor. You receive structured records from the collectors.
You never fetch, never search, and never see raw articles. Your job is
selection and compression, not gathering.

INPUT
  - today's records from F1, F2, F3, F4, F5
  - reports/knowledge-state.md  (what he already knows)
  - the last 14 days of logs/ledger.jsonl  (what has already been said)
  - the current stock-side segment, if one is in progress

SELECTION, in this order
1. Drop any record already in the ledger, unless the new record materially
   changes it. If it does, say what changed and reference the prior date.
2. Drop any record that does not connect to one of the five axes or to a
   live thesis. Interesting is not a criterion. Relevant is.
3. Rank what remains by: does it change a number he is tracking, does it
   create or move a date, does it name a new actor in a seam he cares about.
   Popularity, recency within the window, and sector heat are NOT criteria.
4. Choose exactly one item as THE ONE THING. If nothing earns it, say so and
   leave the section out entirely rather than promoting the least weak item.

WRITE, to this format and these word counts

  Dateline, one line: date, and how many items were considered vs included.

  THE ONE THING            (<=120 words)
    What happened, the number, who is paying, and what it changes. One link.
    Omit this whole section if nothing qualified.

  MOVES                    (3-6 items, 60-80 words each)
    Each: what happened, the number with its unit and period, who is paying
    or being paid, one line of why it is not just noise. One link per item.
    Tag each with its axis and its verification status.

  DIFFS                    (one line each, no prose)
    Tracked numbers and instruments that moved. Format:
    line: was X (date) -> now Y. [source]

  FROM THE STOCK SIDE      (<=400 words)
    Today's segment of the in-progress explainer. If no domain is in
    progress, omit the section. Never generate a general-interest
    explainer to fill it.

  ONE QUESTION             (one sentence)
    A question today's items raise that he should answer, phrased so that
    answering it takes a position. Not "what do you think about X".

  PROVENANCE               (compact)
    Considered: N records from M collectors.
    Included: N. Dropped as duplicate: N. Dropped as irrelevant: N.
    Sources unreachable: list them.
    Collectors that reported an empty window: list them.

HARD RULES
- Total under 700 words excluding the provenance block. If you are over, cut
  MOVES items, never the provenance and never the verification tags.
- Every claim keeps the link from its record. If a record arrived without a
  link, drop the record and note it in provenance.
- No adjective that was not in the source. No "notably", "significantly",
  "interestingly", "it's worth noting". No em dashes.
- Never recommend. Never say "worth watching".
- If the whole day is empty, the correct newsletter is four lines: the
  dateline, "no items met the bar today", the DIFFS section if anything
  moved, and the provenance block. Send it anyway. A quiet day recorded
  honestly is worth more than a manufactured one.
```

---

## 7. The newsletter format, written out

### 7.1 The shape, and why each block exists

**Why one item promoted above the others?**

Because a flat list of six items has no information about relative importance, so you supply the ranking yourself every morning, which is the work you wanted delegated. Promoting exactly one item forces the editor to make the judgment call and, critically, makes the judgment visible and therefore correctable. If THE ONE THING is consistently wrong for three weeks, you know the ranking criteria need changing, which you could never learn from a flat list.

**Why is the DIFFS block separate from MOVES?**

Because they answer different questions and mixing them is what makes research briefs feel long. MOVES answers "what happened". DIFFS answers "did any number I am tracking change", which is a closed question against a fixed list and should read as a table, not as prose. Keeping them apart is also what lets the whole thing stay under 700 words, since a diff line costs eight words and a prose item costs seventy.

**Why does a daily flow newsletter carry a stock segment at all?**

Because the alternative, a separate weekly deep document, gets read in week one and skipped by week four. Serialising the explainer at 400 words a day means the deep work arrives on the same schedule you already read, and it takes about six days to deliver a full 2,400-word explainer. The rule that matters is the one in the editor prompt: if no domain is in progress, the section is omitted rather than filled. This is the block most likely to generate slop if that rule is relaxed.

**Why end with a question rather than a summary?**

Because your scratchpad already exists and the daily log is the place where your own thinking accumulates, and a question is the cheapest possible bridge between reading and writing. It also produces a measurable signal over time: the questions you answer and the ones you skip tell the system which axes you actually care about, which is better ranking data than anything the agents could infer.

### 7.2 A worked sample from real items retrieved 2026-09-10

Everything below comes from sources retrieved on 2026-09-10 during the research for this document. Verification tags are real, not illustrative: items marked single-source were surfaced through search result summaries and the underlying page was not individually fetched, which under guardrail 1 is exactly the status that must be shown rather than hidden.

---

> **2026-09-10** · 14 records considered, 5 included, 4 dropped as duplicates, 5 below floor.
>
> **THE ONE THING**
>
> The January 2026 BIS rule that relaxed advanced-chip licensing for China from presumption of denial to case-by-case review makes eligibility conditional on the item undergoing independent third-party testing to verify its performance specifications, alongside thresholds of total processing performance under 21,000 and DRAM bandwidth under 6,500 GB/s. Export control has acquired a mandatory third-party verification layer, in the same eighteen-month window in which the EU Machinery Regulation created one for self-evolving safety components. Two unrelated regimes, same structural answer. ([Federal Register](https://www.federalregister.gov/documents/2026/01/15/2026-00789/revision-to-license-review-policy-for-advanced-computing-commodities)) · *geo · primary-filing · two-source*
>
> **MOVES**
>
> Global venture funding into physical AI reached 47.4 billion dollars across 521 deals in the first half of 2026, against 12 billion dollars in the second half of 2025, close to a fourfold increase in six months. The deal count matters more than the dollar figure here, because 521 deals at that total implies a median round far above historical robotics norms, meaning the capital is arriving as large rounds into few companies rather than as broad seed activity. ([Crunchbase News](https://news.crunchbase.com/venture/physical-ai-funding-startups-robotics-aerospace-h1-2026/)) · *money · secondary-database · single-source*
>
> Robotics and physical AI startups raised 18.6 billion dollars across 450 deals in Q2 2026, concentrated in humanoid robots, robot foundation models and autonomous systems. Read against the H1 total above, Q2 alone was roughly 39 percent of the half, which places the acceleration inside the second quarter rather than spread across the period. ([PitchBook, "Q2 2026 Robotics & Physical AI Report"](https://pitchbook.com/news/reports/q2-2026-robotics-physical-ai-report-the-money-is-in-the-motion)) · *money · secondary-database · single-source*
>
> The United States issued a notice in June 2026 affirming that its restrictions on advanced semiconductor shipments apply to subsidiaries of Chinese companies located outside China, addressing loopholes in the control regime. This is an extraterritorial extension by entity relationship rather than by geography, which changes the compliance question for any hardware company from where the customer is to who owns the customer. ([Al Jazeera](https://www.aljazeera.com/economy/2026/6/1/us-says-ban-on-ai-chip-shipments-applies-to-chinese-firms-outside-china)) · *geo · secondary-press · single-source*
>
> A study by 22 public service media organisations across 18 countries and 14 languages evaluated more than 3,000 AI assistant responses to news questions and found significant issues in 45 percent, with 31 percent carrying significant sourcing problems including missing, incorrect or fabricated attributions and 20 percent carrying major accuracy problems. The sourcing figure exceeding the accuracy figure is the operative detail, because a wrong fact eventually contradicts something you know while a wrong citation never does. ([EBU](https://www.ebu.ch/research/open/report/news-integrity-in-ai-assistants), [full report PDF](https://www.ebu.ch/files/live/sites/ebu/files/Publications/MIS/open/EBU-MIS-BBC_News_Integrity_in_AI_Assistants_Report_2025.pdf)) · *new · primary-research · two-source*
>
> **DIFFS**
>
> `BIS advanced computing policy: was presumption of denial -> now case-by-case review under TPP 21,000 / 6,500 GB/s` [Federal Register, 2026-01-15]
> `Physical AI venture funding, half-year: was $12.0B (H2 2025) -> now $47.4B (H1 2026)` [Crunchbase News]
> `Semiconductor tariff: was none -> now 25% on chips meeting the same performance thresholds, announced 2026-01-14` [Morgan Lewis, single-source]
>
> **FROM THE STOCK SIDE**
>
> *No domain in progress. Section omitted.*
>
> **ONE QUESTION**
>
> Both the EU machinery regime and now US export licensing require a third party to attest to a property of a technical artefact that the manufacturer could attest to more cheaply itself; what does the buyer of that attestation actually purchase, and is it the same thing in both cases?
>
> **PROVENANCE**
> Considered: 14 records from 4 collectors (F5 not run). Included: 5. Dropped as duplicate: 4. Below floor: 5.
> Sources unreachable: none.
> Empty windows: none.
> Verification: 2 of 5 items two-source. 3 items single-source, flagged inline.
> Not verified to primary: the Crunchbase and PitchBook aggregate figures, the 25 percent tariff, and the June 2026 extraterritorial notice. Each was surfaced through search and the primary document was not retrieved.

---

**What is this sample deliberately demonstrating?**

Four things. That single-source items are labelled rather than laundered into confident prose. That the stock section is omitted rather than filled when there is nothing to put in it. That every item's second sentence does interpretive work on the number rather than restating it, since a restated number is the definition of filler. And that the provenance block is honest enough to name which figures in the newsletter you should not yet repeat in a meeting, which is information you cannot get from any published newsletter.

### 7.3 The knobs, settled 2026-09-14 (all six)

Five of the six are decided and are now live in `data/agents.js`. One remains open. Recorded here so that a future run can tell a decision from a default.

**The funding floor: $10M, with the live-thesis exception.** F1 admits any round at or above ten million dollars in the allowed sectors, and admits any round of any size in a company whose one-liner matches a live thesis. The floor protects your attention; the exception exists because a four million dollar seed by a new entrant into the assurance seam is worth more to you than a four hundred million dollar growth round in a sector you are not building in. Expect roughly twenty to forty items a week reaching F1 and three to six surviving the editor.

**Delivery: the portal, plus a push notification when the brief lands.** The brief is written to `reports/newsletter/YYYY-MM-DD.md` and appears on the Brief tab, and a notification fires in Claude on completion so you are not checking an empty page. One consequence is worth knowing in advance: scheduled tasks run only while the Claude desktop app is open, and a run that comes due while it is closed executes on next launch. So a Monday brief may arrive stamped Monday but delivered Tuesday morning if the app was shut over the weekend, and the dateline will tell you which happened.

**Weekends: off.** No Saturday or Sunday run. Monday's window covers Friday, Saturday and Sunday, which makes Monday a three-day roll-up. The editor prompt is told this explicitly and told to be harder on duplicates on Mondays, because three days of coverage of the same event produces three records of it.

**One page, not five.** Settled in favour of a single editor ranking across all axes. Per-agent output still exists as structured records and is reachable in the portal, so nothing is lost by not publishing it as five documents.

**X: deferred.** Dropped as a source. The function it was serving, which is hearing what a small number of people actually think, is now agent **F6 Voices**, which reads named people at their own publication venue instead: Dario Amodei at darioamodei.com, Paul Graham at paulgraham.com, Andrej Karpathy at karpathy.bearblog.dev and karpathy.github.io, with room for the list to reach eight to twelve names. This is a better trade than it looks. The platform was never the point, and reading the primary essay rather than the posts about it is the only way to catch the highest-value observation this agent can make, which is when one of these people changes position. A side effect is that F4 Frontier Claims is no longer blocked, since dropping X removed its only external dependency; it now reads arXiv, lab publication pages, and the papers' own discussion in OpenReview threads, rebuttals and replication notes.

**Which domain the stock side starts with: all three, broadly, then narrow.** Settled the same day, and it revises the design rather than choosing one of the options I offered. The instruction was to "cover it broadly as of now" and to filter later as understanding sharpens, which is a better answer than the question I asked, because it separates a cheap decision from an expensive one. Breadth across three domains is delegable and costs you almost nothing. Depth on one is fifteen to twenty hours of your own reading and cannot be delegated, so committing to it before seeing the terrain was the wrong order.

The stock side therefore gained a stage. A new agent, **S0 Terrain**, maintains `reports/terrain-map.md`: one section per candidate domain, all on the same six headings so the domains stay comparable, each capped at about a thousand words, and each closing with a mandatory statement of what was searched for and not found. **S1 Curriculum no longer fires first.** It waits until a domain is chosen, and its status is now "waiting on a domain".

The narrowing is given a mechanism rather than left to feeling, which matters because "we can filter it later" is exactly the kind of intention that quietly never happens. The `attention` table in `reports/knowledge-state.md` counts which domains the daily brief's items fall into and, more usefully, which of its ONE QUESTION prompts actually get answered in the scratchpad. When the map is fully delivered, the domain with the most answered questions and the least depth is the candidate for the full explainer. The tally is the input; the choice stays yours. My recommendation for that later choice is unchanged, industrial certification and standards bodies as a business, and section 1 of the map is now written and already closes part of the gap I said existed.

One consequence worth noting because it fixes a visible hole: the brief's FROM THE STOCK SIDE section was omitted on 14 September for want of a domain in progress. The editor now serialises the terrain map into that block at no more than 400 words a weekday, carrying its actual sentences and figures rather than summarising them, and omits the section again once the map is exhausted.

---

## 8. What this costs to run

**What does the token arithmetic actually look like?**

Anthropic's multi-agent write-up reports roughly fifteen times the token consumption of a chat interaction for a research-style orchestrated system, with token usage alone explaining about 80 percent of performance variance ([Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system)). Applied to this design, a daily run means four collectors at up to 2,000 output tokens each on top of their retrieval, one sentry at 800, and one editor reading roughly 10,000 tokens of records plus the knowledge-state file and producing under 700 words. That is a small orchestration by current standards, and the reason is the token ceilings: the ceilings exist for quality but they cap cost as a side effect.

**Where should the money actually go?**

Asymmetrically. The four collectors are mechanical extraction and can run on the cheapest model that reliably follows a structured output format, because a collector that formats correctly and quotes accurately is doing its whole job. The editor, the Thesis Sentry, and the stock-side S3 explainer are judgment work and should run on the strongest model available, because in those three the entire value is in what gets left out. Spending the same per-token rate on collection and on selection is the most common way these systems end up expensive and mediocre at once.

---

## 9. The portal changes this implies

You said the portal has too much in one place, and that outside money flows there is material you have not seen and cannot tell apart from slop. Both are fair, and the second is the more serious of the two.

**On density:** the board currently shows every card at full weight in five columns simultaneously, which is 11 cards of dense text competing at once. The fix is a two-level card, showing the title, one line, one number, and its axis by default, with the full body only in the drawer, plus collapsing any column you are not working in. That reduces the front page to something scannable in fifteen seconds while keeping everything one click away, which is the balance you asked for. Nothing gets buried two clicks deep.

**On the trust problem, which matters more:** every card needs a visible provenance line saying where its claims came from, distinguishing three cases that are currently indistinguishable. Some cards are drawn from your own prior sessions recorded in gbrain, meaning you have seen the underlying reasoning even if the card is new. Some are drawn from web research done in a parallel session on 2026-09-10, meaning the Stanford money layer and the market-size spread, which you have genuinely not seen before. And some, going forward, will be agent output. Those three deserve different levels of trust, and the portal should say which is which on the card face rather than requiring you to remember. I will add a `provenance` field to every card and render it, and I will mark the two cards you have not seen so they are obvious.

---

## 10. Closing summary

### What you now know

The people worth listening to converge on a single point that determines this system's architecture: agents can carry thinking but not understanding, which means a research system needs two separate halves with different cadences, different output formats and different success tests rather than one better newsletter. Karpathy's framing is that the context window is the program and that the binding constraint on agentic work is how fast you can review the output, which is why the daily deliverable is capped at one reviewable page. Graham's four-step recipe locates the real bottleneck at step two, reaching the frontier of a field, which is the step that cannot be delegated and the reason the stock agents matter more than the flow agents even though the flow agents are more satisfying to build. Anthropic's engineering guidance supplies the hard operating constraints: find the smallest set of high-signal tokens, expect context rot as windows grow because the cause is architectural, use just-in-time retrieval rather than bulk ingestion, and have sub-agents return roughly 1,000 to 2,000 token condensed summaries so the coordinating agent never touches raw material. Their multi-agent result, better than 90 percent improvement over a single agent on parallel research at roughly fifteen times the tokens, says the orchestrator pattern is right for five independent domains and wrong for interdependent work, and that agents cannot self-judge effort, which is why every prompt here carries a numeric budget instead of an instruction to be thorough. The expertise research from Chin and the NDM literature explains why reading alone does not produce the ability to hold a conversation, since real expertise is tacit and is extracted by asking practitioners what they would do in a situation rather than what they know, which is the design of agent S4 and the reason it exists at all. And the EBU and BBC study of more than 3,000 AI assistant responses across 22 public service media organisations gives the empirical case for every guardrail: 45 percent of responses had a significant issue, 31 percent had sourcing problems including fabricated citations, 20 percent had accuracy problems, and the fact that sourcing failures exceeded accuracy failures is why the first rule of this system is that no claim may exist without a link that was actually retrieved. The architecture that follows is four layers with a persistent ledger: narrow single-source collectors that extract and never write, one editor that writes and never fetches, a stock-side pipeline that runs a curriculum into primary-source extraction into a six-part explainer into an examination of you, and a ledger that makes repetition impossible. Nine agents, five flow and four stock, each with an objective, an output format, source guidance, hard boundaries and a mandatory way to say that nothing happened.

### Checklist, what is worth studying next

- [ ] Read [Anthropic, "Effective context engineering for AI agents"](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) in full, specifically the compaction and structured note-taking sections, since those two patterns are what make a daily agent have a memory.
- [ ] Read [Anthropic, "How we built our multi-agent research system"](https://www.anthropic.com/engineering/multi-agent-research-system) for the subagent task specification pattern, which is the template every prompt in Sections 4 and 5 follows.
- [ ] Read the two companion Anthropic posts on writing effective tools for agents and on code execution with MCP, which complete the trilogy and matter when the collectors get real tools rather than search.
- [ ] Read [Graham, "How to Do Great Work"](https://paulgraham.com/greatwork.html) once properly rather than as summary, particularly the frontier section, since it is the argument for prioritising the stock agents.
- [ ] Read [Karpathy's Sequoia Ascent 2026 notes](https://karpathy.bearblog.dev/sequoia-ascent-2026/) for the agent-native infrastructure argument, which bears on how the portal itself should expose data to agents.
- [ ] Read [Commoncog, "Copying Better: How To Acquire The Tacit Knowledge of Experts"](https://commoncog.com/how-to-learn-tacit-knowledge/) and then [the Accelerated Expertise summary](https://commoncog.com/accelerated-expertise/), which together are the source of the S4 question format.
- [ ] Skim the [EBU/BBC News Integrity in AI Assistants report](https://www.ebu.ch/files/live/sites/ebu/files/Publications/MIS/open/EBU-MIS-BBC_News_Integrity_in_AI_Assistants_Report_2025.pdf) methodology section, because their evaluation criteria are a ready-made scoring rubric for your own agents' output.
- [ ] Read [the Federal Register BIS rule of 2026-01-15](https://www.federalregister.gov/documents/2026/01/15/2026-00789/revision-to-license-review-policy-for-advanced-computing-commodities) in the original, specifically the eligibility conditions, since the third-party testing requirement is thesis-relevant and was not in any coverage of it.
- [ ] Read [Woozle Research's practitioner guide to primary research](https://insights.woozleresearch.com/primary-research-for-hedge-fund-analysts-a-practitioners-guide/) and [Tegus on conducting expert calls](https://www.tegus.com/knowledge-center/expert-calls) for the interview structure, since the agents get you to the question and the call is where the answer is.
- [ ] Decide the six knobs in Section 7.3, because none of them should be my call and all of them change what gets built.

### My recommendations

You asked for a plan, so this section is judgment rather than reporting, and it is confined to this section only.

Build three agents first, not nine. F3 Policy Diff, because its sources are free, primary, machine-readable, almost unread by competitors, and directly load-bearing for the one thesis you have a dated deadline on. F1 Capital Ledger, because it is the axis you already trust and it will calibrate the format quickly. And S3 Explainer on a single domain, because it is the only one of the three that changes what you are capable of noticing, and because if the stock side is not started in the first week it will not be started at all. Skip F4 Frontier Claims for now despite it being the most appealing, because it is blocked on X access and on a hand-built account list, and building the account list is a two-hour manual job that should happen when you have an hour of low-value time, not on day one.

Settle the one-versus-five newsletter question in favour of one page, and let me argue against your stated preference here since you asked for a plan. Five newsletters means five documents that each individually justify their own existence, which reintroduces the fill-the-space failure at five times the rate, and it removes the single most valuable thing the editor does, which is ranking a policy change against a funding round against a paper. Keep the per-agent records visible in the portal so you can drill into any axis in full, but read one page. If after two weeks the single page feels like it is flattening an axis you care about, splitting it later is a configuration change rather than a rebuild.

Start the stock side on industrial certification and standards bodies as a business, rather than on the robot policy layer. The robot policy layer is where your interest is, but you already know it well enough that an explainer would largely tell you things you know, and the six-part structure would not earn its length. Certification is the one where you currently hold a thesis about a business model whose actual mechanics, meaning how a notified body prices work, what its cost structure looks like, how accreditation is obtained and how long it takes, you have not yet read a single primary document about. That gap is the one that would show up fastest in a real conversation.

Set the funding floor at 25 million dollars, with the explicit exception already written into the F1 prompt that any round in a company matching a live thesis is included regardless of amount. The floor exists to protect your attention and the exception exists because a 4 million dollar seed round by a new entrant into the assurance seam is worth more to you than a 400 million dollar growth round in a sector you are not building in. Getting that exception right matters more than getting the floor right.

Finally, treat the S4 Socratic Examiner as non-optional rather than as a nice addition, and run it in week three whether or not the explainer feels finished. It is the only component that produces evidence about whether any of this is working, and every research system I would describe as a failure failed in the same way, by accumulating well-formatted documents that nobody could be examined on. If you can answer six of its eight questions without notes, the system is working. If you can answer three, the problem is not the agents.

---

*Sources for this document were retrieved on 2026-09-10 and are cited inline at the point of each claim. Grounding material also includes internal records: the standing CTO mandate and facts-only working preference captured in gbrain on 2026-09-10, the YC batch census and Stanford frontier map built the same day, the 38-node supply-chain research ledger, and the physical-intelligence literature review of 2026-09-03. Where a figure was surfaced through search without the primary document being retrieved, that is stated at the point of use.*
