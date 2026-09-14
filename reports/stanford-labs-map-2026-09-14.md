# IRIS and REALab, person by person

**Built 14 September 2026.** Every current member of Chelsea Finn's IRIS lab and Shuran Song's REALab, with programme, the open question they actually work on, their published Stanford email where one exists, their papers with **verbatim** abstracts, and two scores out of ten. Plus every alumnus traced to a company, and the Stanford faculty worth talking to about the robotics industry.

Interactive version with filters, sortable columns and click-through drawers: [`reports/stanford-labs-map.html`](stanford-labs-map.html)

**Counts.** 44 current members scored (32 IRIS, 19 REALab), 7 deliberately unscored, 69 alumni traced, 12 confirmed founders, 37 faculty records, 60 verbatim abstracts.

---

## How to read this, and one house-rule exception

This portal's first house rule is *no ambition scores, no recommended verdicts, no selling.* These scores exist because they were explicitly requested on 13 September 2026. To keep them auditable rather than authoritative, each score is the sum of five stated 0-2 components, printed under every person. If you disagree with a number, point at the component.

**Startup relevance is scored on the WORK, not on seniority.** A second-author MS student on a high-relevance paper inherits a high score. That is intentional: the column tells you which *room* to walk into. Availability and crowding enter through the alignment score instead.

### Startup relevance /10 — blended on purpose

Two components score the narrow surviving thesis (non-regression certification for OTA policy updates); three score the broader question of whether the work could become or feed a venture-scale robotics company at all. So a person can score high by attacking the measurement problem *or* the physical capability blocker — different bets.

- **S1. Buyer already spending badly**
- **S2. Attacks a verified capability ceiling**
- **S3. Incumbent whitespace**
- **S4. Transferability out of the lab**
- **S5. Deployment proximity**

### Alignment & ease of entry /10 — weighted toward 'can you start'

Deliberately weighted toward whether you can actually begin, not whether it is your comfort zone, because you said learning matters more than fit.

- **A1. RL / ML overlap**
- **A2. Signal-processing / statistics overlap**
- **A3. Hardware barrier (inverted)**
- **A4. Room beside them**
- **A5. Reachable and still here**

### The evidence the scores lean on

- TRI ran 1,800 real and 47,000 simulated rollouts across 29 tasks and published that at n=50 their confidence intervals are 20-30 points wide (arXiv 2507.05331). Documented misspend with poor measurement.
- Physical Intelligence's RECAP claims halved failure rates on 300 trajectories per iteration; halving a 10% failure rate is a 5pp effect needing roughly 1,570 per arm, so it is underpowered by its own budget 2-5x.
- Gemini Robotics 2 unscrews a lightbulb 92% of the time and screws it back in 36% with the same model and the same hand. Insertion and compliance is the blocker, not perception.
- The field has priced evaluation tooling at zero every time it felt the pain: TRI open-sourced lbm_eval, Berkeley open-sourced RoboArena. That is what holds S3 down for pure-evaluation work.
- Applied Intuition is $15B and Foretellix has $135M for scenario-based V&V, so vehicle scenario coverage is occupied.

---

## Executive findings

**1. Sunday Robotics has one co-founder from each lab.** Tony Z. Zhao left the IRIS PhD in his third year and is CEO; Cheng Chi did his PhD under Shuran Song and is CTO. $165M Series B led by Coatue at $1.15B post-money, reported 2026-03-12, roughly fifteen months from founding. Hojung Choi (Song postdoc) and Alper Canberk (Columbia BS) are there as early hires. Chi also wrote Diffusion Policy and the Universal Manipulation Interface.

**2. Someone is already building your thesis, and he came out of IRIS.** Govind Chada, an IRIS undergraduate alumnus, is Founder and CTO of **Enact** in YC Summer 2026 — "the post-training layer for robotics": deploy policies on physical robots, find failure states, recreate them, collect recovery demonstrations, retrain. They quote 99/100 rollouts against a 90/100 baseline. Validation that the problem is real; evidence that you are not early.

**3. The faculty who match your thesis are not in CS.** Mykel Kochenderfer (Aero/Astro) wrote *Algorithms for Validation* (MIT Press, 2026) and his earlier work became the FAA's ACAS X certification basis; he has 27 MS advisees and zero commercial conflicts. Mac Schwager (Aero/Astro) co-authored the tighter-than-Clopper-Pearson bounds your arithmetic rests on. Somil Bansal (Aero/Astro) builds the safety-filter certification layer. Emma Brunskill (CS) works on off-policy evaluation without a simulator, which is your thesis in its native statistical vocabulary, and states she is accepting students. Neither Finn nor Song is on that list.

**4. Almost none of the robotics faculty have founded anything, and the most commercially experienced person at the Robotics Center is not faculty.** Khatib, Cutkosky, Okamura, Kochenderfer, Schwager, Sadigh, Bohg, C. Karen Liu, Jiajun Wu and Pavone have founded a combined zero companies. What they hold is lineage: Khatib trained Samir Menon, CEO of Dexterity ($1.65B). **Steve Cousins**, the Robotics Center's Executive Director, co-founded Savioke, was its CEO, and before that was CEO of Willow Garage — which gave ROS away and spun out eight companies, two acquired by Google. He has personally lived both sides of your commons problem.

**5. A brand-new lab with your exact background arrives in about six weeks.** **Thomas Berrueta** starts as Assistant Professor of Mechanical Engineering on **1 November 2026** — his own site and the ME department agree; the Robotics Center roster says January 2027 and is wrong. His stated foundations are reinforcement learning, optimal control and information theory. His area is real-time robot learning for safety-critical systems. His PAL Lab page is live and he has no students.

### The twelve highest combined scores

| # | Person | Lab | Programme | Startup rel. | Alignment | Sum |
|---|---|---|---|---|---|---|
| 1 | **Juntao Ren** | REALab | PhD | **10** | **10** | 20 |
| 2 | **Zhanyi Sun** | REALab | PhD (2nd year) | **10** | **9** | 19 |
| 3 | **Marcel Torne Villasevil** | IRIS | PhD | **9** | **9** | 18 |
| 4 | **Lars Lien Ankile** | IRIS | PhD | **9** | **8** | 17 |
| 5 | **Anubha Mahajan** | IRIS | MS | **8** | **9** | 17 |
| 6 | **Abhijnya Bhat** | IRIS | MS | **8** | **9** | 17 |
| 7 | **Changhao Wang** | REALab | Postdoc | **9** | **8** | 17 |
| 8 | **Jaden Clark** | REALab | PhD (started 9/2025) | **9** | **8** | 17 |
| 9 | **Chuer Pan** | REALab | PhD | **9** | **8** | 17 |
| 10 | **Joshua Citron** | REALab | MS Computer Science (coterm) | **9** | **8** | 17 |
| 11 | **Yuejiang Liu** | IRIS | Postdoc | **7** | **9** | 16 |
| 12 | **Han Zhang** | REALab | PhD (1st year) | **9** | **7** | 16 |

Seven of the twelve are in REALab, which has 19 members against IRIS's 32. The reason is in the lab comparison below.

---

## IRIS (Chelsea Finn) roster — 32 members

Taken from irislab.stanford.edu/people.html. An earlier pass described 13 PhD students, but the page lists 12 by name, so the count here is **32 excluding Finn**. Note that IRIS members generally do **not** publish email addresses, and the lab asks that applications go through a form on its contact page rather than by emailing members directly.

| Person | Programme | Thrust | S/10 | A/10 | Published email |
|---|---|---|---|---|---|
| **Yuejiang Liu** | Postdoc | World models / verification | 7 | 9 | *not published* |
| **Ji Woong Kim** | Postdoc | Surgical & medical robotics | 6 | 5 | *not published* |
| **Perry Dong** | PhD | RL for expressive policies | 4 | 7 | *not published* |
| **Yoonho Lee** | PhD | LLM post-training & inference compute | 3 | 6 | *not published* |
| **Moo Jin Kim** | PhD | Generalist policies & VLAs | 5 | 3 | *not published* |
| **Jonathan Yang** | PhD | Data composition / robustness | 8 | 6 | *not published* |
| **Tian Gao** | PhD | Generalist policies & VLAs / multi-robot | 5 | 5 | *not published* |
| **Anikait Singh** | PhD | LLM post-training & inference compute | 3 | 5 | *not published* |
| **Lucy Xiaoyang Shi** | PhD | Generalist policies & VLAs / world models | 7 | 3 | *not published* |
| **Marcel Torne Villasevil** | PhD | Memory & long-horizon control / human preference learning | 9 | 9 | *not published* |
| **Lars Lien Ankile** | PhD | Dexterous, contact-rich & humanoid manipulation | 9 | 8 | *not published* |
| **Jubayer Ibn Hamid** | PhD | LLM post-training & inference compute | 2 | 8 | *not published* |
| **Ajay Sridhar** | PhD | Memory & long-horizon control | 7 | 6 | *not published* |
| **Alexander Swerdlow** | PhD | RL for expressive policies | 5 | 9 | *not published* |
| **Bo Ai** | PhD (rotating) | World models / dexterous manipulation | 8 | 7 | *not published* |
| **Aneesh Muppidi** | PhD (rotating) | Continual RL / adjacent to the vacant robustness thrust | 6 | 9 | *not published* |
| **Sohyeon Kim** | PhD (visiting, Seoul National University) | NLP retrieval - not robotics | 4 | 4 | *not published* |
| **Gary Sarwin** | PhD (visiting, ETH Zurich CVL) | Surgical & medical robotics | 5 | 4 | *not published* |
| **Armaan Abraham** | MS | RL for expressive policies / long-horizon | 5 | 9 | *not published* |
| **Anubha Mahajan** | MS | Human preference learning | 8 | 9 | *not published* |
| **Abhijnya Bhat** | MS | Human preference learning | 8 | 9 | *not published* |
| **Ke Wang** | MS | Dexterous manipulation / generalist policies | 7 | 6 | *not published* |
| **Pyrros Koussios** | MS (visiting) | Reward modelling | 5 | 7 | *not published* |
| **Roshen Sanjay Nair** | Undergraduate (BS) | LLM post-training | 3 | 7 | *not published* |
| **Rohan Tan Bhowmik** | Undergraduate (BS) | Dexterous/humanoid (unpublished) | 5 | 8 | *not published* |
| **Aadi Shah (Aaditya Shah)** | Undergraduate (BS) | Memory & long-horizon control / world models | 7 | 8 | *not published* |
| **Ayush Agarwal** | MS | Unknown | — | — | *not published* |
| **Ron Polonsky** | MS | Unknown | — | — | *not published* |
| **Mikul Rai** | MS | Unknown | — | — | *not published* |
| **Elijah Song** | MS | Unknown | — | — | *not published* |
| **Yi Du** | Undergraduate (BS) | Unknown | — | — | *not published* |
| **Eric Liang** | Undergraduate (BS) | Unknown | — | — | *not published* |

### Yuejiang Liu

**Postdoc** · Postdoc · World models / verification

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Verifying a prediction is fundamentally easier than making one. Builds verifiers and critics that supply dense feedback where reward is scarce.
- **Advising:** Chelsea Finn; mentored by Yilun Du
- **Hardware / platforms:** Simulation-led: MiniGrid, RoboMimic, ManiSkill, with small real-robot checks
- **Status and signals:** CONFIRMED DEPARTURE: incoming Assistant Professor at NUS from 2027, already recruiting. Also in your SGSI coaching Team Two, so the relationship is already live.

**Startup relevance 7/10.** Highest-possible S1: his research question IS your thesis. World Action Verifier decomposes action-conditioned prediction into state plausibility and action reachability and argues each is separately checkable - the formal skeleton of a surrogate evaluator. Best Paper, ICLR 2026 World Model workshop. S3 held at 1 because the commons argument bites: every sophisticated actor that felt this pain built the tool and gave it away.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 9/10.** Nine of ten and it is not close. Verifiers and critics under scarce reward is core RL; plausibility-versus-reachability is an estimation decomposition; needs no robot. He owns the evaluation thrust that is otherwise orphaned. A5 is 1 only because of NUS 2027 - a one-year window, then a collaborator abroad and a possible PhD route.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **1**

**Papers.**

- **World Action Verifier: Self-Improving World Models via Forward-Inverse Asymmetry** — [arXiv 2604.01985](https://arxiv.org/abs/2604.01985)
  - *Authors:* Yuejiang Liu, Fan Feng, Lingjing Kong, Weifeng Lu, Jinzhou Tang, Kun Zhang, Kevin Murphy, Chelsea Finn, Yilun Du
  - *What it does, and why it matters to you:* Argues that a world model can check its own predictions more cheaply than it can make them, by splitting the check into two parts that can be verified independently: is this state plausible, and is this action reachable. Matters to you because it is the formal skeleton of a surrogate evaluator - the thing that would let you score a policy without paying for the rollouts.
  - *Abstract (verbatim):* General-purpose world models promise scalable policy evaluation, optimization, and planning, yet achieving the required level of robustness remains challenging. Unlike policy learning which primarily focuses on optimal actions, a world model needs to be reliable over a vast space of suboptimal actions, which are often underrepresented in action-labeled robot interactions. To address this challenge, we propose World Action Verifier (WAV), a framework that enables world models to identify their own prediction errors and self-improve. The key idea is to decompose action-conditioned state prediction into two independently verifiable factors: state plausibility and action reachability. We show that verifying these factors is significantly more tractable than direct forward prediction due to two underlying asymmetries: the broader availability of action-free data and the lower dimensionality of action-relevant features. Leveraging these asymmetries, we augment a world model with (i) a diverse subgoal generator obtained from video corpora and (ii) a sparse inverse model that infers actions from a subset of state features. By enforcing cycle consistency among proposed subgoals, inferred actions, and forward rollouts, WAV provides an effective verification mechanism in under-explored regimes, where existing methods often fail. Across nine tasks spanning MiniGrid, RoboMimic, and ManiSkill, our method achieves 2x higher sample efficiency while improving downstream policy performance by over 22%.

- **Bidirectional Decoding: Improving Action Chunking via Guided Test-Time Sampling** — [arXiv 2408.17355](https://arxiv.org/abs/2408.17355)
  - *Authors:* Yuejiang Liu, Jubayer Ibn Hamid, Annie Xie, Yoonho Lee, Maximilian Du, Chelsea Finn
  - *What it does, and why it matters to you:* Action chunking makes robot policies fast but sloppy at chunk boundaries; this fixes it at test time by sampling with guidance rather than retraining. A neat example of buying performance with inference compute instead of data.
  - *Abstract (verbatim):* Predicting and executing a sequence of actions without intermediate replanning, known as action chunking, is increasingly used in robot learning from human demonstrations. Yet, its effects on the learned policy remain inconsistent: some studies find it crucial for achieving strong results, while others observe decreased performance. In this paper, we first dissect how action chunking impacts the divergence between a learner and a demonstrator. We find that action chunking allows the learner to better capture the temporal dependencies in demonstrations but at the cost of reduced reactivity to unexpected states. To address this tradeoff, we propose Bidirectional Decoding (BID), a test-time inference algorithm that bridges action chunking with closed-loop adaptation. At each timestep, BID samples multiple candidate predictions and searches for the optimal one based on two criteria: (i) backward coherence, which favors samples that align with previous decisions; (ii) forward contrast, which seeks samples of high likelihood for future plans. By coupling decisions within and across action chunks, BID promotes both long-term consistency and short-term reactivity. Experimental results show that our method boosts the performance of two state-of-the-art generative policies across seven simulation benchmarks and two real-world tasks. Code and videos are available at [this https URL](https://bid-robot.github.io).

---

### Ji Woong Kim

**Postdoc** · Postdoc · Surgical & medical robotics

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Can an imitation-learned policy execute a complete surgical procedure autonomously on real hardware, including recovering from its own errors?
- **Advising:** Chelsea Finn; Axel Krieger (JHU) is senior collaborator, not a Stanford co-advisor
- **Hardware / platforms:** da Vinci / dVRK surgical platform; humanoids with Tesollo and Inspire five-finger hands, 58-dim bimanual action space
- **Status and signals:** His page solicits graduate students and PhD visitors - the most explicit 'I will take students' signal on the roster. Faculty-track but no accepted position stated.

**Startup relevance 6/10.** S2 and S3 both 2: SRT-H is a real policy completing a full procedure with error recovery on real surgical hardware, Science Robotics 2025 with a July cover, and nobody well-funded is doing learned autonomous surgical execution at that level. S4 is 0 and that is the problem - gated on da Vinci plus five-finger humanoid hands. S1 is 1 because surgical buyers spend heavily but on an FDA cycle measured in years, not an SLA cycle.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **0** · Deployment proximity **1**

**Alignment & ease of entry 5/10.** Low alignment, high accessibility - an unusual pairing. Almost no estimation or RL content and an absolute hardware barrier, so A1/A2/A3 are 1/0/0. But the thrust is thin with no succession and he openly solicits students, so A4 and A5 are 2. The cheapest door in the lab for a conversation rather than a project.

> RL / ML overlap **1** · Signal-processing / statistics overlap **0** · Hardware barrier (inverted) **0** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **SRT-H: A Hierarchical Framework for Autonomous Surgery via Language Conditioned Imitation Learning** — [arXiv 2505.10251](https://arxiv.org/abs/2505.10251)
  - *Authors:* Ji Woong Kim, Juo-Tung Chen, Pascal Hansen, Lucy X. Shi, Antony Goldenberg, Samuel Schmidgall, Paul Maria Scheikl, Anton Deguet, Brandon M. White, De Ru Tsai, Richard Cha, Jeffrey Jopling, Chelsea Finn, Axel Krieger
  - *What it does, and why it matters to you:* A hierarchical language-conditioned imitation system that performs a complete surgical procedure on real hardware and recovers from its own mistakes. The lab's highest-prestige placement, Science Robotics 2025 with a July cover.
  - *Abstract (verbatim):* Research on autonomous surgery has largely focused on simple task automation in controlled environments. However, real-world surgical applications demand dexterous manipulation over extended durations and generalization to the inherent variability of human tissue. These challenges remain difficult to address using existing logic-based or conventional end-to-end learning approaches. To address this gap, we propose a hierarchical framework for performing dexterous, long-horizon surgical steps. Our approach utilizes a high-level policy for task planning and a low-level policy for generating robot trajectories. The high-level planner plans in language space, generating task-level or corrective instructions that guide the robot through the long-horizon steps and correct for the low-level policy's errors. We validate our framework through ex vivo experiments on cholecystectomy, a commonly-practiced minimally invasive procedure, and conduct ablation studies to evaluate key components of the system. Our method achieves a 100% success rate across eight unseen ex vivo gallbladders, operating fully autonomously without human intervention. This work demonstrates step-level autonomy in a surgical procedure, marking a milestone toward clinical deployment of autonomous surgical systems.

- **Ego-Pi: VLA Fine-Tuning for Ego-Centric Human and Robot Data** — [arXiv 2606.08107](https://arxiv.org/abs/2606.08107)
  - *Authors:* Ji Woong Kim, Ke Wang, Zipeng Fu, Sirui Chen, Cong Zhao, Jeff Lai, Chelsea Finn
  - *What it does, and why it matters to you:* Fine-tunes a vision-language-action model on egocentric human video and then drives a humanoid with five-finger hands over a 58-dimensional bimanual action space. The point is the data source: human video is the cheapest robot data there is.
  - *Abstract (verbatim):* Robotics faces a fundamental challenge of data scarcity. Unlike language or vision research, there is no internet-scale dataset for robotic manipulation. A promising path forward is to leverage egocentric human data, which can be collected more easily, with greater breadth, and at a larger scale. Towards this end, we investigate key design choices for learning across human and humanoid embodiments equipped with dexterous five-finger hands, using the π₀.₅ model as a foundation. Our results show that human data enables robots to learn new task semantics and compose existing skills into novel behaviors without corresponding robot data.

---

### Perry Dong

**PhD** · PhD student · RL for expressive policies

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do you make value-based RL work when the policy is a diffusion or flow model and the critic is transformer-scale?
- **Advising:** Dorsa Sadigh and Chelsea Finn (per ILIAD people page)
- **Hardware / platforms:** Simulation-heavy: Robomimic, LIBERO, some real single-arm
- **Status and signals:** Highest-volume author in the lab: 8 first-author papers in ~18 months. Start year UNVERIFIED - no Stanford profile resolves, his own site root 404s.

**Startup relevance 4/10.** Four of ten, instructively. This is capability research with no buyer attached - nobody is spending money badly on diffusion-policy value learning specifically. They are spending it on data collection and on not knowing whether a policy regressed. S4=2 (sim-reproducible) is most of the score.

> Buyer already spending badly **0** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **0**

**Alignment & ease of entry 7/10.** The sharpest illustration in this whole exercise. On raw technical fit he is the best match on the roster - value learning, critics, off-policy stability, TD variance, i.e. your RL and estimation background almost exactly. And A4 is 0, the worst on the roster, because he first-authors 8 of ~11 papers in his own thrust at a cadence you cannot match as an MS student. Best fit, worst room. Do not read the 7 as an invitation.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **0** · Reachable and still here **1**

**Papers.**

- **EXPO: Stable Reinforcement Learning with Expressive Policies** — [arXiv 2507.07986](https://arxiv.org/abs/2507.07986)
  - *Authors:* Perry Dong, Qiyang Li, Dorsa Sadigh, Chelsea Finn
  - *What it does, and why it matters to you:* Makes reinforcement learning stable when the policy is an expressive generative model rather than a simple Gaussian. Core RL machinery, closest to your own background, and the flagship of the lab's most crowded thrust.
  - *Abstract (verbatim):* We study the problem of training and fine-tuning expressive policies with online reinforcement learning (RL) given an offline dataset. Training expressive policy classes with online RL present a unique challenge of stable value maximization. Unlike simpler Gaussian policies commonly used in online RL, expressive policies like diffusion and flow-matching policies are parameterized by a long denoising chain, which hinders stable gradient propagation from actions to policy parameters when optimizing against some value function. Our key insight is that we can address stable value maximization by avoiding direct optimization over value with the expressive policy and instead construct an on-the-fly RL policy to maximize Q-value. We propose Expressive Policy Optimization (EXPO), a sample-efficient online RL algorithm that utilizes an on-the-fly policy to maximize value with two parameterized policies -- a larger expressive base policy trained with a stable imitation learning objective and a light-weight Gaussian edit policy that edits the actions sampled from the base policy toward a higher value distribution. The on-the-fly policy optimizes the actions from the base policy with the learned edit policy and chooses the value maximizing action from the base and edited actions for both sampling and temporal-difference (TD) backup. Our approach yields up to 2-3x improvement in sample efficiency on average over prior methods both in the setting of fine-tuning a pretrained policy given offline data and in leveraging offline data to train online.

- **FASTER: Value-Guided Sampling for Fast RL** — [arXiv 2604.19730](https://arxiv.org/abs/2604.19730)
  - *Authors:* Perry Dong, Alexander Swerdlow, Dorsa Sadigh, Chelsea Finn
  - *What it does, and why it matters to you:* Puts value guidance inside the denoising loop so sampling is both fast and high-value. Denoising plus value estimation is signal processing sitting inside reinforcement learning - technically the most frictionless entry point in IRIS for someone with your training.
  - *Abstract (verbatim):* Some of the most performant reinforcement learning algorithms today can be prohibitively expensive as they use test-time scaling methods such as sampling multiple action candidates and selecting the best one. In this work, we propose FASTER, a method for getting the benefits of sampling-based test-time scaling of diffusion-based policies without the computational cost by tracing the performance gain of action samples back to earlier in the denoising process. Our key insight is that we can model the denoising of multiple action candidates and selecting the best one as a Markov Decision Process (MDP) where the goal is to progressively filter action candidates before denoising is complete. With this MDP, we can learn a policy and value function in the denoising space that predicts the downstream value of action candidates in the denoising process and filters them while maximizing returns. The result is a method that is lightweight and can be plugged into existing generative RL algorithms. Across challenging long-horizon manipulation tasks in online and batch-online RL, FASTER consistently improves the underlying policies and achieves the best overall performance among the compared methods. Applied to a pretrained VLA, FASTER achieves the same performance while substantially reducing training and inference compute requirements. Code is available at [this https URL](https://github.com/alexanderswerdlow/faster) .

---

### Yoonho Lee

**PhD** · PhD student · LLM post-training & inference compute

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do you improve an LLM system without touching its weights, by optimising the text and code artifacts around it?
- **Advising:** Chelsea Finn alone
- **Hardware / platforms:** None. LLM-only, no robot.
- **Status and signals:** His site states he is on the 2026-2027 academic and industry job market. Pivoted off the lab's old robustness line.

**Startup relevance 3/10.** Three of ten: the buyers are real but they are not robotics buyers. Meta-Harness automates search over harness source code using execution traces; the customers are AI companies. S3 is 0 - the fastest-commoditising corner of the field, with the DSPy/Khattab ecosystem already there (Khattab is a co-author).

> Buyer already spending badly **0** · Attacks a verified capability ceiling **0** · Incumbent whitespace **0** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 6/10.** A2 gets a 2 for a specific reason: Feedback Descent argues pairwise critiques carry more supervisory bandwidth than binary preferences, an information-content argument sitting directly on your information-theory background. But A5 is 0 - on the job market this cycle, so no multi-year relationship is available.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **1** · Reachable and still here **0**

**Papers.**

- **Meta-Harness: End-to-End Optimization of Model Harnesses** — [arXiv 2603.28052](https://arxiv.org/abs/2603.28052)
  - *Authors:* Yoonho Lee, Roshen Nair, Qizheng Zhang, Kangwook Lee, Omar Khattab, Chelsea Finn
  - *What it does, and why it matters to you:* Treats the scaffolding around a language model - its harness source code - as the thing to optimise, searching over it using execution traces. No robot anywhere, but a good illustration of optimising the system instead of the weights.
  - *Abstract (verbatim):* The performance of large language model (LLM) systems depends not only on model weights, but also on their harness: the code that determines what information to store, retrieve, and present to the model. Yet harnesses are still designed largely by hand, and existing text optimizers are poorly matched to this setting because they compress feedback too aggressively. We introduce Meta-Harness, an outer-loop system that searches over harness code for LLM applications. It uses an agentic proposer that accesses the source code, scores, and execution traces of all prior candidates through a filesystem. On online text classification, Meta-Harness improves over a state-of-the-art context management system by 7.7 points while using 4x fewer context tokens. On retrieval-augmented math reasoning, a single discovered harness improves accuracy on 200 IMO-level problems by 4.7 points on average across five held-out models. On agentic coding, discovered harnesses surpass the best hand-engineered baselines on TerminalBench-2. Together, these results show that richer access to prior experience can enable automated harness engineering.

- **Feedback Descent: Open-Ended Text Optimization via Pairwise Comparison** — [arXiv 2511.07919](https://arxiv.org/abs/2511.07919)
  - *Authors:* Yoonho Lee, Joseph Boen, Chelsea Finn
  - *What it does, and why it matters to you:* Argues that a pairwise critique carries far more supervisory information than a binary preference, and uses that to optimise text directly. The claim is information-theoretic in substance, which is why it sits on your information-theory background rather than only on your ML background.
  - *Abstract (verbatim):* We introduce \textit{Feedback Descent}, a framework that optimizes text artifacts -- prompts, code, and molecules -- through structured textual feedback, rather than relying solely on scalar rewards. By preserving detailed critiques instead of compressing them to binary preferences, Feedback Descent widens the information bottleneck in preference learning, enabling directed optimization in text space rather than weight space. We show that in-context learning can transform structured feedback into gradient-like directional information, enabling targeted edits. Unlike prior approaches that collapse judgments into single bits, our evaluators pair each comparison with textual feedback, which functions as high-bandwidth supervision. The iteration loop is done purely at inference time, without modifying any model weights, and is task-agnostic. We evaluate Feedback Descent on three diverse domains and find that it outperforms state-of-the-art prompt optimization (GEPA), reinforcement learning methods (GRPO, REINVENT), and even specialized graph-based molecular optimizers. In the DOCKSTRING molecule discovery benchmark, Feedback Descent identifies novel drug-like molecules surpassing the $99.9$th percentile of a database with more than $260{,}000$ compounds across six protein targets.

---

### Moo Jin Kim

**PhD** · PhD student · Generalist policies & VLAs

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do you turn large pretrained generative models into fast, high-success robot policies?
- **Advising:** Chelsea Finn and Percy Liang (stated on his site)
- **Hardware / platforms:** WidowX, Google Robot, Franka Panda, bimanual ALOHA
- **Status and signals:** Final-year. Now works on LLM post-training for Marin, Stanford's open foundation model - he has moved OFF robotics. On the IRIS MS alumni list too, so the lab converted him from MS to PhD.

**Startup relevance 5/10.** S5 is 2 and earned: OpenVLA-OFT is a real artifact people deploy, isolating parallel decoding, action chunking and L1 regression to reach 97.1% on LIBERO at 26x faster inference. But S3 is 0 - the thrust is occupied by Physical Intelligence, NVIDIA and Google, and Cosmos Policy is itself an NVIDIA collaboration.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **0** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 3/10.** Three of ten, lowest among people with a record, on availability rather than the work: final-year AND already moved to LLM post-training. Worth reading his papers, not worth planning a project around him. Take one thing from him though - the MS-to-PhD conversion path in this lab is real and he is the proof.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **1** · Room beside them **0** · Reachable and still here **0**

**Papers.**

- **OpenVLA: An Open-Source Vision-Language-Action Model** — [arXiv 2406.09246](https://arxiv.org/abs/2406.09246)
  - *Authors:* Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, Quan Vuong, Thomas Kollar, Benjamin Burchfiel, Russ Tedrake, Dorsa Sadigh, Sergey Levine, Percy Liang, Chelsea Finn
  - *What it does, and why it matters to you:* The open vision-language-action model that beat a 55-billion-parameter closed model with 7 billion parameters. CoRL 2024 Outstanding Paper finalist and probably the single most reused artifact out of IRIS.
  - *Abstract (verbatim):* Large policies pretrained on a combination of Internet-scale vision-language data and diverse robot demonstrations have the potential to change how we teach robots new skills: rather than training new behaviors from scratch, we can fine-tune such vision-language-action (VLA) models to obtain robust, generalizable policies for visuomotor control. Yet, widespread adoption of VLAs for robotics has been challenging as 1) existing VLAs are largely closed and inaccessible to the public, and 2) prior work fails to explore methods for efficiently fine-tuning VLAs for new tasks, a key component for adoption. Addressing these challenges, we introduce OpenVLA, a 7B-parameter open-source VLA trained on a diverse collection of 970k real-world robot demonstrations. OpenVLA builds on a Llama 2 language model combined with a visual encoder that fuses pretrained features from DINOv2 and SigLIP. As a product of the added data diversity and new model components, OpenVLA demonstrates strong results for generalist manipulation, outperforming closed models such as RT-2-X (55B) by 16.5% in absolute task success rate across 29 tasks and multiple robot embodiments, with 7x fewer parameters. We further show that we can effectively fine-tune OpenVLA for new settings, with especially strong generalization results in multi-task environments involving multiple objects and strong language grounding abilities, and outperform expressive from-scratch imitation learning methods such as Diffusion Policy by 20.4%. We also explore compute efficiency; as a separate contribution, we show that OpenVLA can be fine-tuned on consumer GPUs via modern low-rank adaptation methods and served efficiently via quantization without a hit to downstream success rate. Finally, we release model checkpoints, fine-tuning notebooks, and our PyTorch codebase with built-in support for training VLAs at scale on Open X-Embodiment datasets.

- **Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success** — [arXiv 2502.19645](https://arxiv.org/abs/2502.19645)
  - *Authors:* Moo Jin Kim, Chelsea Finn, Percy Liang
  - *What it does, and why it matters to you:* An ablation study that isolates which three things actually make a VLA fast and accurate: parallel decoding, action chunking and L1 regression. Reaches 97.1% on LIBERO at 26 times faster inference - a deployment result rather than a capability result.
  - *Abstract (verbatim):* Recent vision-language-action models (VLAs) build upon pretrained vision-language models and leverage diverse robot datasets to demonstrate strong task execution, language following ability, and semantic generalization. Despite these successes, VLAs struggle with novel robot setups and require fine-tuning to achieve good performance, yet how to most effectively fine-tune them is unclear given many possible strategies. In this work, we study key VLA adaptation design choices such as different action decoding schemes, action representations, and learning objectives for fine-tuning, using OpenVLA as our representative base model. Our empirical analysis informs an Optimized Fine-Tuning (OFT) recipe that integrates parallel decoding, action chunking, a continuous action representation, and a simple L1 regression-based learning objective to altogether improve inference efficiency, policy performance, and flexibility in the model's input-output specifications. We propose OpenVLA-OFT, an instantiation of this recipe, which sets a new state of the art on the LIBERO simulation benchmark, significantly boosting OpenVLA's average success rate across four task suites from 76.5% to 97.1% while increasing action generation throughput by 26×. In real-world evaluations, our fine-tuning recipe enables OpenVLA to successfully execute dexterous, high-frequency control tasks on a bimanual ALOHA robot and outperform other VLAs (π_0 and RDT-1B) fine-tuned using their default recipes, as well as strong imitation learning policies trained from scratch (Diffusion Policy and ACT) by up to 15% (absolute) in average success rate. We release code for OFT and pretrained model checkpoints at [this https URL](https://openvla-oft.github.io/).

---

### Jonathan Yang

**PhD** · PhD student · Data composition / robustness

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Which kind of data diversity buys which kind of generalisation?
- **Advising:** Chelsea Finn and Dorsa Sadigh (stated on his site)
- **Hardware / platforms:** Real cross-embodiment transfer experiments plus cheap Unreal Engine imagery for co-training
- **Status and signals:** Admitted Autumn 2022, so likely finishing 2027. A Google DeepMind author list on the 2025 paper suggests an internship - INFERENCE, not stated.

**Startup relevance 8/10.** Eight of ten and one of the most underrated lines in the lab for your purposes. Data Analogies makes a sharp, falsifiable claim: viewpoint shifts benefit from broad unstructured diversity while morphology shifts do not, and instead gain most from paired cross-embodiment demonstrations - 22.5% real transfer improvement from data composition alone, no new model. S1=2 because every robot company is burning capital on data collection with no theory of what to collect; S5=2 because the finding is directly actionable by anyone holding a data budget.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 6/10.** A2 is 2: underneath the robotics vocabulary this is experimental design and variance decomposition. Which factor buys which generalisation is a statistics question, and statistical rigour is the edge you actually have. A3 is 1 because real-transfer results need hardware though the Unreal half is cheap. A5 is 1 on timing - fourth year, probably finishing while you are still coursework-bound.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **1** · Reachable and still here **1**

**Papers.**

- **Data Analogies Enable Efficient Cross-Embodiment Transfer** — [arXiv 2603.06450](https://arxiv.org/abs/2603.06450)
  - *Authors:* Jonathan Yang, Chelsea Finn, Dorsa Sadigh
  - *What it does, and why it matters to you:* The sharpest falsifiable claim in the lab: viewpoint shifts benefit from broad unstructured data diversity, while morphology shifts do not and instead need paired cross-embodiment demonstrations. A 22.5% real-world transfer gain from changing only the data composition. This is experimental design, and it tells a company with a data budget what to buy.
  - *Abstract (verbatim):* Generalist robot policies are trained on demonstrations collected across a wide variety of robots, scenes, and viewpoints. Yet it remains unclear how to best organize and scale such heterogeneous data so that it genuinely improves performance in a given target setting. In this work, we ask: what form of demonstration data is most useful for enabling transfer across robot set-ups? We conduct controlled experiments that vary end-effector morphology, robot platform appearance, and camera perspective, and compare the effects of simply scaling the number of demonstrations against systematically broadening the diversity in different ways. Our simulated experiments show that while perceptual shifts such as viewpoint benefit most from broad diversity, morphology shifts benefit far less from unstructured diversity and instead see the largest gains from data analogies, i.e. paired demonstrations that align scenes, tasks, and/or trajectories across different embodiments. Informed by the simulation results, we improve real-world cross-embodiment transfer success by an average of 22.5% over large-scale, unpaired datasets by changing only the composition of the data.

---

### Tian Gao

**PhD** · PhD student · Generalist policies & VLAs / multi-robot

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do you bridge high-level semantic reasoning and low-level reactive control?
- **Advising:** Chelsea Finn and Dorsa Sadigh (stated on his site). Jeannette Bohg co-authors CHORUS but does NOT advise him.
- **Hardware / platforms:** Driving VLA; three-robot decentralised teams
- **Status and signals:** Tsinghua Yao Class background. Start year UNVERIFIED.

**Startup relevance 5/10.** Straight ones - genuinely middling rather than a hidden gem or a trap. CHORUS is the more interesting half: one shared VLA backbone driving decentralised multi-robot teams from purely local observations plus a robot-identifying prompt, 90% success on three-robot teams. That has warehouse buyers. SteerVLA's move is clever but sits inside the crowded VLA thrust.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **1** · Deployment proximity **1**

**Alignment & ease of entry 5/10.** Also straight ones. Multi-robot is his own corner within a crowded thrust so there is some room, but little estimation content and moderate hardware need. No strong reason to start here, none to avoid it.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **1** · Room beside them **1** · Reachable and still here **1**

**Papers.**

- **SteerVLA: Steering Vision-Language-Action Models in Long-Tail Driving Scenarios** — [arXiv 2602.08440](https://arxiv.org/abs/2602.08440)
  - *Authors:* Tian Gao, Celine Tan, Catherine Glossop, Timothy Gao, Jiankai Sun, Kyle Stachowicz, Shirley Wu, Oier Mees, Dorsa Sadigh, Sergey Levine, Chelsea Finn
  - *What it does, and why it matters to you:* Uses a vision-language model to write dense fine-grained language annotations that then steer a low-level driving policy through long-tail scenarios. The trick is that the annotations are the supervision that makes a language interface actually steerable.
  - *Abstract (verbatim):* A fundamental challenge in autonomous driving is the integration of high-level, semantic reasoning for long-tail events with low-level, reactive control for robust driving. While large vision-language models (VLMs) trained on web-scale data offer powerful common-sense reasoning, they lack the grounded experience necessary for safe vehicle control. We posit that an effective autonomous agent should leverage the world knowledge of VLMs to guide a steerable driving policy toward robust control in driving scenarios. To this end, we propose SteerVLA, which leverages the reasoning capabilities of VLMs to produce fine-grained language instructions that steer a vision-language-action (VLA) driving policy. Key to our method is this rich language interface between the high-level VLM and low-level VLA, which allows the high-level policy to more effectively ground its reasoning in the control outputs of the low-level policy. To provide fine-grained language supervision aligned with vehicle control, we leverage a VLM to augment existing driving data with detailed language annotations, which we find to be essential for effective reasoning and steerability. We evaluate SteerVLA on a challenging closed-loop benchmark, where it outperforms state-of-the-art methods by 4.77 points in overall driving score and by 8.04 points on a long-tail subset. The project website is available at: this https URL

- **CHORUS: Decentralized Multi-Embodiment Collaboration with One VLA Policy** — [arXiv 2606.12352](https://arxiv.org/abs/2606.12352)
  - *Authors:* Ria Doshi, Tian Gao, Annie Chen, Chelsea Finn, Jeannette Bohg
  - *What it does, and why it matters to you:* One shared VLA backbone drives a decentralised multi-robot team, with each robot seeing only its own local observations plus a prompt identifying which robot it is. 90% success on three-robot teams - relevant wherever fleets must coordinate without a central planner.
  - *Abstract (verbatim):* Multi-robot collaboration allows robots to efficiently take on a wide range of tasks, from moving a couch through a doorway to assembling structures on a construction site. However, achieving such coordination in mobile multi-robot settings remains challenging: centralized methods conditioned on the combined observations of a team scale poorly with team size, and decentralized methods that train one policy per robot often require explicit alignment procedures or information sharing at inference time to overcome partial observability. Our key insight is that the visuomotor priors of pretrained vision-language-action (VLA) models should enable reactive, decentralized collaboration from each robot's local observations alone, without these inference-time assumptions. We propose CHORUS, a framework that adapts a single VLA backbone to control diverse, multi-robot teams. At inference time, each robot runs an independent copy of CHORUS, conditioned only on its own observations and a robot-identifying prompt. In real-world experiments including mobile tape measurement, library book handovers, and laundry basket lifting, CHORUS achieves a 64% point improvement over decentralized, from-scratch models, improves reactivity to teammate behavior by 40% points, and outperforms centralized baselines. Together, these results show that a shared VLA backbone is capable of achieving decentralized multi-robot collaboration, without per-robot policies or inter-robot communication at inference.

---

### Anikait Singh

**PhD** · PhD student · LLM post-training & inference compute

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** What data and feedback actually make preference fine-tuning work, and how does a model adapt to one real user from a handful of examples?
- **Advising:** Chelsea Finn and Aviral Kumar (stated verbatim on his site)
- **Hardware / platforms:** None. LLM-only.
- **Status and signals:** Final-year. Currently a Research Scientist Intern at Meta Superintelligence Labs.

**Startup relevance 3/10.** Three of ten, same as Yoonho Lee: real buyers, wrong industry. LLM alignment, and the preference-learning corner is among the most crowded in all of ML.

> Buyer already spending badly **0** · Attacks a verified capability ceiling **0** · Incumbent whitespace **0** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 5/10.** A1 is 2 and worth reading even if you never work with him: 'Preference Fine-Tuning of LLMs Should Leverage Suboptimal, On-Policy Data' (ICML 2024) is a theory-of-data result in RL, and the on-policy-versus-off-policy question it settles is the same question that decides whether you can evaluate a policy update without re-running the old policy. A4 and A5 are 0 - crowded, final year, at Meta.

> RL / ML overlap **2** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **2** · Room beside them **0** · Reachable and still here **0**

**Papers.**

- **FSPO: Few-Shot Optimization of Synthetic Preferences Personalizes to Real Users** — [arXiv 2502.19312](https://arxiv.org/abs/2502.19312)
  - *Authors:* Anikait Singh, Sheryl Hsu, Kyle Hsu, Eric Mitchell, Stefano Ermon, Tatsunori Hashimoto, Archit Sharma, Chelsea Finn
  - *What it does, and why it matters to you:* Reframes reward modelling as meta-learning over synthetic preference distributions so a model can personalise to one real user from a handful of examples. 70% win rate with real humans.
  - *Abstract (verbatim):* Effective personalization of LLMs is critical for a broad range of user-interfacing applications such as virtual assistants and content curation. Inspired by the strong in-context capabilities of LLMs, we propose few-shot preference optimization (FSPO), an algorithm for LLM personalization that reframes reward modeling as a meta-learning problem. Under FSPO, an LLM learns to quickly infer a personalized reward function for a user via a few labeled preferences. FSPO also utilizes user description rationalization (RAT) to encourage better reward modeling and instruction following, recovering performance with the oracle user description. Since real-world preference data is challenging to collect at scale, we propose careful design choices to construct synthetic preference datasets for personalization, generating over 1M synthetic personalized preferences using publicly available LLMs. To successfully transfer from synthetic data to real users, we find it crucial for the data to exhibit both high diversity and coherent, self-consistent structure. We evaluate FSPO on personalized open-ended generation for up to 1,500 synthetic users across three domains: movie reviews, education, and open-ended question answering. We also run a controlled human study. Overall, FSPO achieves an 87% Alpaca Eval winrate in generating responses that are personalized to synthetic users and a 70% winrate with real human users in open-ended question answering.

- **Preference Fine-Tuning of LLMs Should Leverage Suboptimal, On-Policy Data** — [arXiv 2404.14367](https://arxiv.org/abs/2404.14367)
  - *Authors:* Fahim Tajwar, Anikait Singh, Archit Sharma, Rafael Rafailov, Jeff Schneider, Tengyang Xie, Stefano Ermon, Chelsea Finn, Aviral Kumar
  - *What it does, and why it matters to you:* An ICML 2024 result that settles which data preference fine-tuning should actually use: suboptimal and on-policy. Worth reading for your thesis because the on-policy-versus-off-policy question is exactly what decides whether you can evaluate a policy update without re-running the old policy.
  - *Abstract (verbatim):* Learning from preference labels plays a crucial role in fine-tuning large language models. There are several distinct approaches for preference fine-tuning, including supervised learning, on-policy reinforcement learning (RL), and contrastive learning. Different methods come with different implementation tradeoffs and performance differences, and existing empirical findings present different conclusions, for instance, some results show that online RL is quite important to attain good fine-tuning results, while others find (offline) contrastive or even purely supervised methods sufficient. This raises a natural question: what kind of approaches are important for fine-tuning with preference data and why? In this paper, we answer this question by performing a rigorous analysis of a number of fine-tuning techniques on didactic and full-scale LLM problems. Our main finding is that, in general, approaches that use on-policy sampling or attempt to push down the likelihood on certain responses (i.e., employ a "negative gradient") outperform offline and maximum likelihood objectives. We conceptualize our insights and unify methods that use on-policy sampling or negative gradient under a notion of mode-seeking objectives for categorical distributions. Mode-seeking objectives are able to alter probability mass on specific bins of a categorical distribution at a fast rate compared to maximum likelihood, allowing them to relocate masses across bins more effectively. Our analysis prescribes actionable insights for preference fine-tuning of LLMs and informs how data should be collected for maximal improvement.

---

### Lucy Xiaoyang Shi

**PhD** · PhD student · Generalist policies & VLAs / world models

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How does a robot turn open-ended language, including mid-task corrections, into long-horizon behaviour - and can it close the loop against a learned world model?
- **Advising:** Chelsea Finn alone
- **Hardware / platforms:** Single-arm, dual-arm and mobile platforms; ALOHA-style bimanual; Physical Intelligence hardware
- **Status and signals:** Started September 2024. Researcher at Physical Intelligence since March 2024 as one of its first team members. THE STRUCTURAL CONFLICT: an independent policy evaluator is adversarial to a policy vendor.

**Startup relevance 7/10.** Seven, and the two 2s are real. Yell At Your Robot is live human language correction mid-task, which is not a demo - it is the actual economics of how shipped humanoids work today (1X ships NEO at 60-70% autonomy with teleop fallback). VLAW co-improves policy and world model for a 39.2-point absolute gain. But S4 is 0: these are effectively Physical Intelligence papers with privileged data and hardware.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **1** · Transferability out of the lab **0** · Deployment proximity **2**

**Alignment & ease of entry 3/10.** Three of ten, and the reason is not the work - it is that she is a core PI member. The sharpest honest findings in your direction are adverse to Physical Intelligence (pi-0.5 substitutes task progress for success rate; RECAP is underpowered by its own trial budget). Working under a PI core member on an evaluation project you intend to commercialise is structurally awkward in a way no amount of research fit fixes. This is the clearest single argument for REALab over IRIS.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **0** · Room beside them **1** · Reachable and still here **0**

**Papers.**

- **Hi Robot: Open-Ended Instruction Following with Hierarchical Vision-Language-Action Models** — [arXiv 2502.19417](https://arxiv.org/abs/2502.19417)
  - *Authors:* Lucy Xiaoyang Shi, Brian Ichter, Michael Equi, Liyiming Ke, Karl Pertsch, Quan Vuong, James Tanner, Anna Walling, Haohuan Wang, Niccolo Fusai, Adrian Li-Bell, Danny Driess, Lachy Groom, Sergey Levine, Chelsea Finn
  - *What it does, and why it matters to you:* A hierarchical VLA that follows open-ended instructions on single-arm, dual-arm and mobile platforms doing table cleaning and sandwich making. ICML 2025.
  - *Abstract (verbatim):* Generalist robots that can perform a range of different tasks in open-world settings must be able to not only reason about the steps needed to accomplish their goals, but also process complex instructions, prompts, and even feedback during task execution. Intricate instructions (e.g., "Could you make me a vegetarian sandwich?" or "I don't like that one") require not just the ability to physically perform the individual steps, but the ability to situate complex commands and feedback in the physical world. In this work, we describe a system that uses vision-language models in a hierarchical structure, first reasoning over complex prompts and user feedback to deduce the most appropriate next step to fulfill the task, and then performing that step with low-level actions. In contrast to direct instruction following methods that can fulfill simple commands ("pick up the cup"), our system can reason through complex prompts and incorporate situated feedback during task execution ("that's not trash"). We evaluate our system across three robotic platforms, including single-arm, dual-arm, and dual-arm mobile robots, demonstrating its ability to handle tasks such as cleaning messy tables, making sandwiches, and grocery shopping. Videos are available at [this https URL](https://www.pi.website/research/hirobot)

- **Yell At Your Robot: Improving On-the-Fly from Language Corrections** — [arXiv 2403.12910](https://arxiv.org/abs/2403.12910)
  - *Authors:* Lucy Xiaoyang Shi, Zheyuan Hu, Tony Z. Zhao, Archit Sharma, Karl Pertsch, Jianlan Luo, Sergey Levine, Chelsea Finn
  - *What it does, and why it matters to you:* A human watches the robot and shouts corrections in natural language; the robot improves on the fly. Not a demo trick - this is the actual economics of shipped humanoids, which run at partial autonomy with human fallback.
  - *Abstract (verbatim):* Hierarchical policies that combine language and low-level control have been shown to perform impressively long-horizon robotic tasks, by leveraging either zero-shot high-level planners like pretrained language and vision-language models (LLMs/VLMs) or models trained on annotated robotic demonstrations. However, for complex and dexterous skills, attaining high success rates on long-horizon tasks still represents a major challenge -- the longer the task is, the more likely it is that some stage will fail. Can humans help the robot to continuously improve its long-horizon task performance through intuitive and natural feedback? In this paper, we make the following observation: high-level policies that index into sufficiently rich and expressive low-level language-conditioned skills can be readily supervised with human feedback in the form of language corrections. We show that even fine-grained corrections, such as small movements ("move a bit to the left"), can be effectively incorporated into high-level policies, and that such corrections can be readily obtained from humans observing the robot and making occasional suggestions. This framework enables robots not only to rapidly adapt to real-time language feedback, but also incorporate this feedback into an iterative training scheme that improves the high-level policy's ability to correct errors in both low-level execution and high-level decision-making purely from verbal feedback. Our evaluation on real hardware shows that this leads to significant performance improvement in long-horizon, dexterous manipulation tasks without the need for any additional teleoperation. Videos and code are available at [this https URL](https://yay-robot.github.io/).

- **Ctrl-World: A Controllable Generative World Model for Robot Manipulation** — [arXiv 2510.10125](https://arxiv.org/abs/2510.10125)
  - *Authors:* Yanjiang Guo, Lucy Xiaoyang Shi, Jianyu Chen, Chelsea Finn
  - *What it does, and why it matters to you:* A controllable generative world model for manipulation, co-first-authored by an alumnus. The open question underneath it is whether a learned world model can ever be trusted enough to score actions instead of merely predicting them.
  - *Abstract (verbatim):* Generalist robot policies can now perform a wide range of manipulation skills, but evaluating and improving their ability with unfamiliar objects and instructions remains a significant challenge. Rigorous evaluation requires a large number of real-world rollouts, while systematic improvement demands additional corrective data with expert labels. Both of these processes are slow, costly, and difficult to scale. World models offer a promising, scalable alternative by enabling policies to rollout within imagination space. However, a key challenge is building a controllable world model that can handle multi-step interactions with generalist robot policies. This requires a world model compatible with modern generalist policies by supporting multi-view prediction, fine-grained action control, and consistent long-horizon interactions, which is not achieved by previous works. In this paper, we make a step forward by introducing a controllable multi-view world model that can be used to evaluate and improve the instruction-following ability of generalist robot policies. Our model maintains long-horizon consistency with a pose-conditioned memory retrieval mechanism and achieves precise action control through frame-level action conditioning. Trained on the DROID dataset (95k trajectories, 564 scenes), our model generates spatially and temporally consistent trajectories under novel scenarios and new camera placements for over 20 seconds. We show that our method can accurately rank policy performance without real-world robot rollouts. Moreover, by synthesizing successful trajectories in imagination and using them for supervised fine-tuning, our approach can improve policy success by 44.7%.

---

### Marcel Torne Villasevil

**PhD** · PhD student · Memory & long-horizon control / human preference learning

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do policies adapt in context with human-centric supervision - and what should a policy retain from ten minutes ago?
- **Advising:** Chelsea Finn alone. Pulkit Agrawal is a prior MIT supervisor and continuing collaborator, NOT an advisor.
- **Hardware / platforms:** Real long-horizon tasks (fifteen-minute kitchen cleaning); CASHER is real-to-sim-to-real, which lowers hardware cost
- **Status and signals:** Started September 2024, mid-PhD, present for years. At Physical Intelligence June 2025 to March 2026, now back at Stanford. Co-authors with TWO MS students on Freeform Preference Learning. IMPORTANT NUANCE FOUND ON REVIEW: his MEM paper carries NINE Physical Intelligence-affiliated co-authors (Pertsch, Nair, Ichter, Vuong, Levine, Driess, Equi, Springenberg, Stachowicz), so the memory half of his work is substantially a PI collaboration. Freeform Preference Learning, by contrast, is just him, two MS students and Finn - no PI people at all. The thesis-adjacent half of his work is PI-free; the memory half is not.

**Startup relevance 9/10.** Nine of ten, joint highest in the lab. Freeform Preference Learning is the one that matters for you: annotators define their own language preference axes - speed, carefulness - for a 38-point gain over binary-preference baselines. That is a failure-and-quality definition problem, and 'what counts as a failure' is precisely the unenforceable term in every 95%-uptime RaaS SLA. MEM runs fifteen-minute tasks by mixing video-encoded short-horizon with text-based long-horizon memory, attacking long-horizon reliability directly - though note MEM is substantially a Physical Intelligence paper by author list, which is why S4 stays at 1.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 9/10.** Nine, and the highest-confidence 9 here. A2=2 because defining and eliciting failure taxonomies is measurement theory, not robotics engineering - the part of this field your statistics background is genuinely rare in. A3=2 because the project shape needs zero robot hours and roughly $1k of annotation. A4=2 because memory/long-horizon is the most attractive thin thrust and it is growing, not vacating. A5=2 on evidence not hope: he already co-authors with two MS students. If you want one room to walk into, this is it - and it agrees with the Sept 13 recommendation reached independently.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **MEM: Multi-Scale Embodied Memory for Vision Language Action Models** — [arXiv 2603.03596](https://arxiv.org/abs/2603.03596)
  - *Authors:* Marcel Torne, Karl Pertsch, Homer Walke, Kyle Vedder, Suraj Nair, Brian Ichter, Allen Z. Ren, Haohuan Wang, Jiaming Tang, Kyle Stachowicz, Karan Dhabalia, Michael Equi, Quan Vuong, Jost Tobias Springenberg, Sergey Levine, Chelsea Finn, Danny Driess
  - *What it does, and why it matters to you:* Mixes short-horizon memory encoded as video with long-horizon memory encoded as text, which lets a policy run fifteen-minute tasks like cleaning a kitchen. Long-horizon reliability is the blocker this attacks.
  - *Abstract (verbatim):* Conventionally, memory in end-to-end robotic learning involves inputting a sequence of past observations into the learned policy. However, in complex multi-stage real-world tasks, the robot's memory must represent past events at multiple levels of granularity: from long-term memory that captures abstracted semantic concepts (e.g., a robot cooking dinner should remember which stages of the recipe are already done) to short-term memory that captures recent events and compensates for occlusions (e.g., a robot remembering the object it wants to pick up once its arm occludes it). In this work, our main insight is that an effective memory architecture for long-horizon robotic control should combine multiple modalities to capture these different levels of abstraction. We introduce Multi-Scale Embodied Memory (MEM), an approach for mixed-modal long-horizon memory in robot policies. MEM combines video-based short-horizon memory, compressed via a video encoder, with text-based long-horizon memory. Together, they enable robot policies to perform tasks that span up to fifteen minutes, like cleaning up a kitchen, or preparing a grilled cheese sandwich. Additionally, we find that memory enables MEM policies to intelligently adapt manipulation strategies in-context.

- **Freeform Preference Learning for Robotic Manipulation** — [arXiv 2606.32027](https://arxiv.org/abs/2606.32027)
  - *Authors:* Marcel Torne, Anubha Mahajan, Abhijnya Bhat, Chelsea Finn
  - *What it does, and why it matters to you:* Instead of asking annotators for binary A-or-B preferences, it lets them name their own axes - speed, carefulness - and gets a 38-point gain over binary-preference baselines. THE most thesis-relevant paper in IRIS: defining what good and bad behaviour even mean is the unenforceable term in every robot uptime SLA.
  - *Abstract (verbatim):* Reward design remains a central bottleneck for autonomous robot policy improvement, especially in long-horizon manipulation tasks where sparse success labels provide too little signal and binary preferences collapse many competing notions of quality into one ambiguous signal. We introduce Freeform Preference Learning (FPL), a method for learning robot policies from freeform human preferences. Rather than asking annotators which of two trajectories is better overall, FPL lets them define natural-language preference axes, such as speed, safety, quality of placement, or carefulness, and provide pairwise preferences along each axis. These annotations are used to learn a language-conditioned reward model that maps a trajectory and preference label to an axis-specific reward. We use this model to train a reward-conditioned policy that optimizes across the multiple human-specified dimensions. Across four real-world and two simulated long-horizon manipulation tasks, FPL improves over sparse-reward and binary-preference methods by 38 percentage points. Beyond improved performance, FPL learns dense progress signals without explicit subtask segmentation, shows compositionality of behavior not present in the data, and allows users to steer the policy towards different behaviors at test time without retraining. Blog post with videos available at [this https URL](https://freeform-pl.github.io/fpl.website/)

- **Learning Long-Context Diffusion Policies via Past-Token Prediction** — [arXiv 2505.09561](https://arxiv.org/abs/2505.09561)
  - *Authors:* Marcel Torne, Andy Tang, Yuejiang Liu, Chelsea Finn
  - *What it does, and why it matters to you:* Trains diffusion policies to predict their own past tokens, which forces them to actually use long context. Three times the performance at ten times faster training. CoRL 2025.
  - *Abstract (verbatim):* Reasoning over long sequences of observations and actions is essential for many robotic tasks. Yet, learning effective long-context policies from demonstrations remains challenging. As context length increases, training becomes increasingly expensive due to rising memory demands, and policy performance often degrades as a result of spurious correlations. Recent methods typically sidestep these issues by truncating context length, discarding historical information that may be critical for subsequent decisions. In this paper, we propose an alternative approach that explicitly regularizes the retention of past information. We first revisit the copycat problem in imitation learning and identify an opposite challenge in recent diffusion policies: rather than over-relying on prior actions, they often fail to capture essential dependencies between past and future actions. To address this, we introduce Past-Token Prediction (PTP), an auxiliary task in which the policy learns to predict past action tokens alongside future ones. This regularization significantly improves temporal modeling in the policy head, with minimal reliance on visual representations. Building on this observation, we further introduce a multistage training strategy: pre-train the visual encoder with short contexts, and fine-tune the policy head using cached long-context embeddings. This strategy preserves the benefits of PTP while greatly reducing memory and computational overhead. Finally, we extend PTP into a self-verification mechanism at test time, enabling the policy to score and select candidates consistent with past actions during inference. Experiments across four real-world and six simulated tasks demonstrate that our proposed method improves the performance of long-context diffusion policies by 3x and accelerates policy training by more than 10x.

---

### Lars Lien Ankile

**PhD** · PhD student · Dexterous, contact-rich & humanoid manipulation

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do you squeeze precision out of imperfect behaviour-cloned policies - treating the BC policy as a frozen black box and learning lightweight per-step residual corrections with off-policy RL from sparse binary rewards?
- **Advising:** Chelsea Finn alone (admitted Autumn 2025 per Stanford Profiles)
- **Hardware / platforms:** Humanoid with dexterous hands; Franka-class arms for precise visual assembly
- **Status and signals:** Admitted Autumn 2025, very early - a newcomer arrives ALONGSIDE him, not behind. Interned at Amazon Frontier AI and Robotics. On no 2024-2026 entry of the IRIS publications page, which is a lag in that page rather than an absence of work.

**Startup relevance 9/10.** Nine of ten, tied with Torne but on the OTHER bet. Where Torne is the measurement thesis, Ankile is the capability blocker: Residual Off-Policy RL claims the first successful real-world RL training on a humanoid with dexterous hands, and JUICER plus From Imitation to Refinement are precise visual assembly. This lands exactly on the verified ceiling - Gemini Robotics 2 unscrews a lightbulb 92% of the time and screws it back in 36% with the same model and hand, so insertion and compliance is the blocker, not perception. Sub-mm force-controlled insertion is also the gap you separately researched on 2026-09-12.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 8/10.** Eight, dragged down only by A3. A1 and A2 are both 2 and this is the cleanest technical match on the roster: off-policy RL from sparse binary rewards, and residual correction of a frozen base policy is literally control and signal processing. A4 and A5 are 2 because he is a first-year who IS the entire thrust and therefore needs collaborators. A3 is a hard 0 - real humanoid plus dexterous hands, no way around it. Highest-relevance work whose entry cost is hardware access rather than knowledge.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **0** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **Residual Off-Policy RL for Finetuning Behavior Cloning Policies** — [arXiv 2509.19301](https://arxiv.org/abs/2509.19301)
  - *Authors:* Lars Ankile, Zhenyu Jiang, Rocky Duan, Guanya Shi, Pieter Abbeel, Anusha Nagabandi
  - *What it does, and why it matters to you:* Freezes an imperfect behaviour-cloned policy and learns small per-step residual corrections on top of it using off-policy RL from sparse binary rewards. Claims the first successful real-world RL training on a humanoid with dexterous hands. This is your RL and control background pointed straight at the insertion-and-compliance ceiling.
  - *Abstract (verbatim):* Recent advances in behavior cloning (BC) have enabled impressive visuomotor control policies. However, these approaches are limited by the quality of human demonstrations, the manual effort required for data collection, and the diminishing returns from offline data. In comparison, reinforcement learning (RL) trains an agent through autonomous interaction with the environment and has shown remarkable success in various domains. Still, training RL policies directly on real-world robots remains challenging due to sample inefficiency, safety concerns, and the difficulty of learning from sparse rewards for long-horizon tasks, especially for high-degree-of-freedom (DoF) systems. We present a recipe that combines the benefits of BC and RL through a residual learning framework. Our approach leverages BC policies as black-box bases and learns lightweight per-step residual corrections via sample-efficient off-policy RL. We demonstrate that our method requires only sparse binary reward signals and can effectively improve manipulation policies on high-degree-of-freedom (DoF) systems in both simulation and the real world. In particular, we demonstrate, to the best of our knowledge, the first successful real-world RL training on a humanoid robot with dexterous hands. Our results demonstrate state-of-the-art performance in various vision-based tasks, pointing towards a practical pathway for deploying RL in the real world.

- **From Imitation to Refinement -- Residual RL for Precise Assembly** — [arXiv 2407.16677](https://arxiv.org/abs/2407.16677)
  - *Authors:* Lars Ankile, Anthony Simeonov, Idan Shenfeld, Marcel Torne, Pulkit Agrawal
  - *What it does, and why it matters to you:* The same residual-RL idea applied to precise assembly on Franka-class arms - taking a policy that roughly works and making it precise enough to actually insert things. ICRA 2025.
  - *Abstract (verbatim):* Recent advances in Behavior Cloning (BC) have made it easy to teach robots new tasks. However, we find that the ease of teaching comes at the cost of unreliable performance that saturates with increasing data for tasks requiring precision. The performance saturation can be attributed to two critical factors: (a) distribution shift resulting from the use of offline data and (b) the lack of closed-loop corrective control caused by action chucking (predicting a set of future actions executed open-loop) critical for BC performance. Our key insight is that by predicting action chunks, BC policies function more like trajectory "planners" than closed-loop controllers necessary for reliable execution. To address these challenges, we devise a simple yet effective method, ResiP (Residual for Precise Manipulation), that overcomes the reliability problem while retaining BC's ease of teaching and long-horizon capabilities. ResiP augments a frozen, chunked BC model with a fully closed-loop residual policy trained with reinforcement learning (RL) that addresses distribution shifts and introduces closed-loop corrections over open-loop execution of action chunks predicted by the BC trajectory planner.

---

### Jubayer Ibn Hamid

**PhD** · PhD student · LLM post-training & inference compute

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do you train a model to use all three axes of inference compute jointly - sequential reasoning, parallel sampling, and learned aggregation?
- **Advising:** Dorsa Sadigh and Chelsea Finn (stated on his site). Noah Goodman a recurring third senior author.
- **Hardware / platforms:** None. LLM-only. Pivoted off robot action chunking.
- **Status and signals:** Admitted Autumn 2025 and a FORMER IRIS UNDERGRADUATE - the lab converts its own juniors. LinkedIn lists him as a Student Researcher at Google.

**Startup relevance 2/10.** Two of ten, the lowest scored on the roster, purely a domain mismatch rather than a quality judgement - SPIRAL's set-level RL result (parallel traces trained to be collectively rather than individually useful, up to 11x better scaling efficiency than GRPO) is a strong paper with no robotics buyer.

> Buyer already spending badly **0** · Attacks a verified capability ceiling **0** · Incumbent whitespace **0** · Transferability out of the lab **2** · Deployment proximity **0**

**Alignment & ease of entry 8/10.** Eight, and the contrast with his S of 2 is the most useful pairing in this table: highest-alignment, lowest-relevance. A1=2 on set-level RL and reward aggregation, A3=2 with no robot, A5=2 as a first-year former-undergrad who will be here for years. If your objective were 'learn RL from someone adjacent and accessible' he would rank near the top. It is not - but he is the person to ask how the undergrad-to-PhD conversion actually works here.

> RL / ML overlap **2** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **2** · Room beside them **1** · Reachable and still here **2**

**Papers.**

- **SPIRAL: Learning to Search and Aggregate** — [arXiv 2606.23595](https://arxiv.org/abs/2606.23595)
  - *Authors:* Jubayer Ibn Hamid, Ifdita Hasan Orney, Michael Y. Li, Omar Shaikh, Yoonho Lee, Dorsa Sadigh, Chelsea Finn, Noah Goodman
  - *What it does, and why it matters to you:* Trains a model to use sequential reasoning, parallel sampling and learned aggregation jointly, with set-level RL so parallel traces are collectively rather than individually useful. Up to 11 times better scaling efficiency than GRPO. Strong RL, no robot.
  - *Abstract (verbatim):* Language model reasoning can be substantially improved at test time via scaffolds that scale inference compute across different primitives -- sequential reasoning within a trace, independently sampled parallel traces, and aggregation of multiple reasoning traces into a final response. During post-training, however, language models are optimized only for sequential reasoning within a single trace. We introduce Sequential-Parallel-Aggregative Reinforcement Learning (SPIRAL), a framework in which a language model is trained to use all three primitives, as part of a unified inference compute pipeline. Concretely, the language model first samples a set of independent traces in parallel, each produced through sequential chain-of-thought reasoning, and then generates a final aggregation trace conditioned on those traces; all components are optimized end-to-end against the reward of the final aggregated response. To train this system, SPIRAL uses set reinforcement learning to teach models to produce a set of traces that are collectively useful for an aggregator and standard reinforcement learning to teach models to aggregate the set into improved final responses. Our experiments on reasoning tasks show that SPIRAL effectively scales with inference compute, outperforming GRPO by up to 11× scaling efficiency and 15% higher performance when all three compute primitives are scaled.

---

### Ajay Sridhar

**PhD** · PhD student · Memory & long-horizon control

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** How do you give policies the two things monolithic VLAs lack - memory, and embodiment-invariance?
- **Advising:** Dorsa Sadigh and Chelsea Finn (stated on his site). NSF Fellow.
- **Hardware / platforms:** ViperX 300 S and Franka Research 3. MemER built on Qwen2.5-VL-7B and pi-0.5, so needs compute.
- **Status and signals:** Start year UNVERIFIED. BARX is a Toyota Research Institute collaboration - an industry channel that is NOT Physical Intelligence, which matters for the conflict question. NoMaD won ICRA 2024 Best Conference Paper.

**Startup relevance 7/10.** Seven. MemER retrieves task-relevant keyframes from past experience instead of stuffing the context window - a deployment-cost argument as much as a capability one, since context length is what you pay for. S1=2 because the BARX work with TRI is industry-partnered on a real problem, and TRI is the one organisation that has publicly published its own evaluation pain.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **1**

**Alignment & ease of entry 6/10.** Six. A4=2 - memory and long-horizon is thin and he is one of only three occupants alongside Torne and undergrad Aadi Shah, and notably the three papers genuinely disagree about the answer (architectural context vs training objective vs retrieval), so the question is live rather than settled. The TRI rather than PI affiliation makes him cleaner than Lucy Shi on the conflict axis.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **1**

**Papers.**

- **MemER: Scaling Up Memory for Robot Control via Experience Retrieval** — [arXiv 2510.20328](https://arxiv.org/abs/2510.20328)
  - *Authors:* Ajay Sridhar, Jennifer Pan, Satvik Sharma, Chelsea Finn
  - *What it does, and why it matters to you:* Rather than stuffing a growing context window, it retrieves the few task-relevant keyframes from past experience. A cost argument as much as a capability one, since context length is what you pay for at inference.
  - *Abstract (verbatim):* Humans routinely rely on memory to perform tasks, yet most robot policies lack this capability; our goal is to endow robot policies with the same ability. Naively conditioning on long observation histories is computationally expensive and brittle under covariate shift, while indiscriminate subsampling of history leads to irrelevant or redundant information. We propose a hierarchical policy framework, where the high-level policy is trained to select and track previous relevant keyframes from its experience. The high-level policy uses selected keyframes and the most recent frames when generating text instructions for a low-level policy to execute. This design is compatible with existing vision-language-action (VLA) models and enables the system to efficiently reason over long-horizon dependencies. In our experiments, we finetune Qwen2.5-VL-7B-Instruct and π₀.₅ as the high-level and low-level policies respectively, using demonstrations supplemented with minimal language annotations. Our approach, MemER, outperforms prior methods on three real-world long-horizon robotic manipulation tasks that require minutes of memory.

- **NoMaD: Goal Masked Diffusion Policies for Navigation and Exploration** — [arXiv 2310.07896](https://arxiv.org/abs/2310.07896)
  - *Authors:* Ajay Sridhar, Dhruv Shah, Catherine Glossop, Sergey Levine
  - *What it does, and why it matters to you:* Goal-masked diffusion policies that handle both goal-directed navigation and undirected exploration in one model. ICRA 2024 Best Conference Paper.
  - *Abstract (verbatim):* Robotic learning for navigation in unfamiliar environments needs to provide policies for both task-oriented navigation (i.e., reaching a goal that the robot has located), and task-agnostic exploration (i.e., searching for a goal in a novel setting). Typically, these roles are handled by separate models, for example by using subgoal proposals, planning, or separate navigation strategies. In this paper, we describe how we can train a single unified diffusion policy to handle both goal-directed navigation and goal-agnostic exploration, with the latter providing the ability to search novel environments, and the former providing the ability to reach a user-specified goal once it has been located. We show that this unified policy results in better overall performance when navigating to visually indicated goals in novel environments, as compared to approaches that use subgoal proposals from generative models, or prior methods based on latent variable models. We instantiate our method by using a large-scale Transformer-based policy trained on data from multiple ground robots, with a diffusion model decoder to flexibly handle both goal-conditioned and goal-agnostic navigation. Our experiments, conducted on a real-world mobile robot platform, show effective navigation in unseen environments in comparison with five alternative methods, and demonstrate significant improvements in performance and lower collision rates, despite utilizing smaller models than state-of-the-art approaches. For more videos, code, and pre-trained model checkpoints, see [this https URL](https://general-navigation-models.github.io/nomad/)

---

### Alexander Swerdlow

**PhD** · PhD student · RL for expressive policies

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Unified multimodal generation via discrete diffusion; at IRIS, value-guided filtering inside the denoising loop.
- **Advising:** Chelsea Finn alone (admitted Autumn 2025, second-year). His CMU co-advisors were for his master's.
- **Hardware / platforms:** None of his own.
- **Status and signals:** Admitted Autumn 2025, second-year. Physical Intelligence intern. Came from CMU generative modelling into IRIS reinforcement learning.

**Startup relevance 5/10.** Five. FASTER (co-first with Perry Dong) puts value guidance inside the denoising loop - an inference-efficiency play with real but indirect commercial value. S5=0: nothing here is an artifact a deployment buyer picks up.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **0**

**Alignment & ease of entry 9/10.** Nine, and the quiet one worth flagging. A1, A2 and A3 are all 2: discrete diffusion, denoising, value-guided filtering is signal processing in the literal sense, sitting inside RL, with no hardware requirement at all. A5=2 as a second-year advised by Finn alone. A4 is 1 rather than 0 for an important reason - he works in Perry Dong's crowded thrust but as a CO-FIRST AUTHOR with him rather than a competitor, which is the demonstrated way into that thrust without colliding with it. If your constraint is 'start something this quarter with no robot access', he is the most technically frictionless entry point in the lab.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **1** · Reachable and still here **2**

**Papers.**

- **FASTER: Value-Guided Sampling for Fast RL** — [arXiv 2604.19730](https://arxiv.org/abs/2604.19730)
  - *Authors:* Perry Dong, Alexander Swerdlow, Dorsa Sadigh, Chelsea Finn
  - *What it does, and why it matters to you:* Puts value guidance inside the denoising loop so sampling is both fast and high-value. Denoising plus value estimation is signal processing sitting inside reinforcement learning - technically the most frictionless entry point in IRIS for someone with your training.
  - *Abstract (verbatim):* Some of the most performant reinforcement learning algorithms today can be prohibitively expensive as they use test-time scaling methods such as sampling multiple action candidates and selecting the best one. In this work, we propose FASTER, a method for getting the benefits of sampling-based test-time scaling of diffusion-based policies without the computational cost by tracing the performance gain of action samples back to earlier in the denoising process. Our key insight is that we can model the denoising of multiple action candidates and selecting the best one as a Markov Decision Process (MDP) where the goal is to progressively filter action candidates before denoising is complete. With this MDP, we can learn a policy and value function in the denoising space that predicts the downstream value of action candidates in the denoising process and filters them while maximizing returns. The result is a method that is lightweight and can be plugged into existing generative RL algorithms. Across challenging long-horizon manipulation tasks in online and batch-online RL, FASTER consistently improves the underlying policies and achieves the best overall performance among the compared methods. Applied to a pretrained VLA, FASTER achieves the same performance while substantially reducing training and inference compute requirements. Code is available at [this https URL](https://github.com/alexanderswerdlow/faster) .

- **Unified Multimodal Discrete Diffusion** — [arXiv 2503.20853](https://arxiv.org/abs/2503.20853)
  - *Authors:* Alexander Swerdlow, Mihir Prabhudesai, Siddharth Gandhi, Deepak Pathak, Katerina Fragkiadaki
  - *What it does, and why it matters to you:* Unified multimodal generation using discrete diffusion - one model over text and images in a discrete denoising process. Pre-IRIS work from CMU, included because it explains what he brought into the lab: generative-model machinery that he then pointed at RL.
  - *Abstract (verbatim):* Multimodal generative models that can understand and generate across multiple modalities are dominated by autoregressive (AR) approaches, which process tokens sequentially from left to right, or top to bottom. These models jointly handle images, text, video, and audio for various tasks such as image captioning, question answering, and image generation. In this work, we explore discrete diffusion models as a unified generative formulation in the joint text and image domain, building upon their recent success in text generation. Discrete diffusion models offer several advantages over AR models, including improved control over quality versus diversity of generated samples, the ability to perform joint multimodal inpainting (across both text and image domains), and greater controllability in generation through guidance. Leveraging these benefits, we present the first Unified Multimodal Discrete Diffusion (UniDisc) model which is capable of jointly understanding and generating text and images for a variety of downstream tasks. We compare UniDisc to multimodal AR models, performing a scaling analysis and demonstrating that UniDisc outperforms them in terms of both performance and inference-time compute, enhanced controllability, editability, inpainting, and flexible trade-off between inference time and generation quality. Code and additional visualizations are available at this https URL.

---

### Bo Ai

**PhD (rotating)** · Rotating PhD student · World models / dexterous manipulation

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Do embodiment scaling laws exist, and can cross-embodiment world models scale to dexterous manipulation?
- **Advising:** Rotating - not committed to IRIS
- **Hardware / platforms:** Locomotion and dexterous manipulation platforms
- **Status and signals:** ROTATING, so may not stay in IRIS - treat any plan around him as provisional. Strong prior record from UC San Diego.

**Startup relevance 8/10.** Eight. Embodiment Scaling Laws in Robot Locomotion (CoRL 2025) is a spend-allocation result dressed as a science result - scaling laws tell a company what to buy more of, which is why S1 is 2. The dexterous cross-embodiment world-model paper sits on both thin thrusts at once.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **1**

**Alignment & ease of entry 7/10.** Seven. A2=2 because scaling laws are empirical statistics and fitting them properly is exactly where underpowered experiments hide. A4=2 because he is adjacent to both thin thrusts. A5 held at 1 solely because rotating status means he may not be in IRIS next year.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **1**

**Papers.**

- **Towards Embodiment Scaling Laws in Robot Locomotion** — [arXiv 2505.05753](https://arxiv.org/abs/2505.05753)
  - *Authors:* Bo Ai, Liu Dai, Nico Bohlinger, Dichen Li, Tongzhou Mu, Zhanxin Wu, K. Fay, Henrik I. Christensen, Jan Peters, Hao Su
  - *What it does, and why it matters to you:* Asks whether scaling laws exist for embodiment itself in locomotion - how much does training across more body types buy you. Scaling laws are spend-allocation results dressed as science results. CoRL 2025.
  - *Abstract (verbatim):* Cross-embodiment generalization underpins the vision of building generalist embodied agents for any robot, yet its enabling factors remain poorly understood. We investigate embodiment scaling laws, the hypothesis that increasing the number of training embodiments improves generalization to unseen ones, using robot locomotion as a test bed. We procedurally generate ~1,000 embodiments with topological, geometric, and joint-level kinematic variations, and train policies on random subsets. We observe positive scaling trends supporting the hypothesis, and find that embodiment scaling enables substantially broader generalization than data scaling on fixed embodiments. Our best policy, trained on the full dataset, transfers zero-shot to novel embodiments in simulation and the real world, including the Unitree Go2 and H1. These results represent a step toward general embodied intelligence, with relevance to adaptive control for configurable robots, morphology co-design, and beyond.

- **Scaling Cross-Embodiment World Models for Dexterous Manipulation** — [arXiv 2511.01177](https://arxiv.org/abs/2511.01177)
  - *Authors:* Zihao He, Bo Ai, Tongzhou Mu, Yulin Liu, Weikang Wan, Jiawei Fu, Yilun Du, Henrik I. Christensen, Hao Su
  - *What it does, and why it matters to you:* Extends cross-embodiment world models to dexterous manipulation, sitting on two of the thinnest thrusts in IRIS at once. IROS 2026.
  - *Abstract (verbatim):* Cross-embodiment learning seeks to build generalist robots that learn from and operate across diverse morphologies, but differences in kinematics and action spaces hinder data sharing and control transfer. We ask: What structure can be shared across embodiments despite these differences? We argue that the physical interactions they induce can be modeled in a shared geometric space, allowing world models to provide a common interface for learning and control. To realize this idea, we represent human and robot hands as sets of 3D particles and define actions as end-effector particle displacement fields. This representation abstracts away embodiment-specific joint spaces while preserving the geometry and motion relevant to physical interaction. We train a graph-based world model on random interaction data from diverse simulated robot hands and real human hands, and integrate it with model-predictive control for deployment on new hardware. Experiments on rigid and deformable manipulation reveal three findings: increasing the diversity of training embodiments improves generalization to unseen hands; appropriately combining simulated and real-world data outperforms either source alone; and the same learned model enables effective control on robotic hands with distinct kinematics and degrees of freedom. These results position particle-based world models as a shared interface for learning from and for heterogeneous embodiments.

---

### Aneesh Muppidi

**PhD (rotating)** · Rotating PhD student · Continual RL / adjacent to the vacant robustness thrust

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Continual and real-time RL: how does a learner keep adapting without catastrophic interference and without tuned hyperparameters?
- **Advising:** Rotating - not committed to IRIS
- **Hardware / platforms:** Simulation / RL benchmarks
- **Status and signals:** ROTATING. TRAC appeared at NeurIPS 2024.

**Startup relevance 6/10.** Six, and there is a structural link worth noticing: continual RL is the same shape as the OTA-update problem. A policy that keeps adapting in the field is exactly the object whose regressions you cannot detect from production telemetry. S1 is 1 rather than 2 because that link is analogical - nobody pays for continual-RL non-regression as such yet.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 9/10.** Nine. TRAC is parameter-free adaptive continual optimisation - online-learning theory, strong RL, strong statistics, zero hardware, and adjacent to the robustness thrust that emptied when Yoonho Lee pivoted. A5=1 on rotating status alone. If Bo Ai and Muppidi both commit to IRIS, the thin-thrust picture changes materially.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **1**

**Papers.**

- **Fast TRAC: A Parameter-Free Optimizer for Lifelong Reinforcement Learning** — [arXiv 2405.16642](https://arxiv.org/abs/2405.16642)
  - *Authors:* Aneesh Muppidi, Zhiyu Zhang, Heng Yang
  - *What it does, and why it matters to you:* A parameter-free optimizer for lifelong RL - it keeps adapting without hyperparameter tuning and without catastrophic interference. Online-learning theory, and structurally the same shape as the over-the-air update problem you care about.
  - *Abstract (verbatim):* A key challenge in lifelong reinforcement learning (RL) is the loss of plasticity, where previous learning progress hinders an agent's adaptation to new tasks. While regularization and resetting can help, they require precise hyperparameter selection at the outset and environment-dependent adjustments. Building on the principled theory of online convex optimization, we present a parameter-free optimizer for lifelong RL, called TRAC, which requires no tuning or prior knowledge about the distribution shifts. Extensive experiments on Procgen, Atari, and Gym Control environments show that TRAC works surprisingly well-mitigating loss of plasticity and rapidly adapting to challenging distribution shifts-despite the underlying optimization problem being nonconvex and nonstationary.

---

### Sohyeon Kim

**PhD (visiting, Seoul National University)** · Visiting PhD student · NLP retrieval - not robotics

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** When should dense retrievers be updated as a corpus evolves?
- **Advising:** Gunhee Kim (SNU)
- **Hardware / platforms:** None.
- **Status and signals:** Visiting from SNU, so temporary.

**Startup relevance 4/10.** Four, and the low score hides the most interesting structural parallel on this roster. 'When Should Dense Retrievers Be Updated' is formally the same question as 'is this OTA policy update a regression' - when does a deployed model degrade enough against a shifting environment to justify the cost of replacing it, and how do you detect that from cheap signals. Different domain, same decision problem. Read the paper even though the person is visiting and the field is wrong.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **0** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **0**

**Alignment & ease of entry 4/10.** Four. No RL, no robot, visiting. The value is one paper, not a relationship.

> RL / ML overlap **0** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **2** · Room beside them **1** · Reachable and still here **0**

---

### Gary Sarwin

**PhD (visiting, ETH Zurich CVL)** · Visiting PhD student · Surgical & medical robotics

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Machine vision for endoscopic neurosurgery - can anatomical priors substitute for explicit navigation hardware?
- **Advising:** ETH Zurich Computer Vision Lab
- **Hardware / platforms:** Endoscopic surgical imaging
- **Status and signals:** Visiting from ETH, so temporary.

**Startup relevance 5/10.** Five. Vision-based neurosurgical guidance is genuinely unoccupied by well-funded incumbents (S3=2), but S4 is 0 on hardware and the regulatory path is long.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **0** · Deployment proximity **1**

**Alignment & ease of entry 4/10.** Four overall, but A2 is a 2 and it is the most specific match to a part of your background nobody else here touches: medical image reconstruction and guidance, i.e. your Reconstruction_Signals and Journal_Signals work. If you ever want the signal-processing half of your background to be the rare thing in the room rather than the RL half, this is where it would be. A3 and A5 are 0, so it is a conversation, not a project.

> RL / ML overlap **0** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **0** · Room beside them **2** · Reachable and still here **0**

---

### Armaan Abraham

**MS** · MS student · RL for expressive policies / long-horizon

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Can hinge losses on n-step optimality-tightening inequalities stop compounding TD error over long horizons?
- **Advising:** Works with Lucy Shi and Chelsea Finn
- **Hardware / platforms:** Simulation
- **Status and signals:** THE PROOF POINT: an MS student who is FIRST AUTHOR on a paper with Lucy Shi and Chelsea Finn. Of roughly 8 IRIS MS students about half have a visible paper and the modal path is 2nd or 3rd author - he is the exception showing first-author is reachable.

**Startup relevance 5/10.** Five. Long-Horizon Q-Learning is methodologically strong and commercially indirect - it makes value learning work over long horizons, which matters, but no buyer holds a budget for it.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **0**

**Alignment & ease of entry 9/10.** Nine, and the single most useful person on this roster to talk to first - not for the score but for what he demonstrates. An MS student who first-authored with Finn on a Q-learning paper, your exact technical area, using hinge losses on optimality-tightening inequalities, which is estimation work. He is the existence proof for the path you are considering, one year ahead of you. Ask him how it happened.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **1** · Reachable and still here **2**

**Papers.**

- **Long-Horizon Q-Learning: Accurate Value Learning via n-Step Inequalities** — [arXiv 2605.05812](https://arxiv.org/abs/2605.05812)
  - *Authors:* Armaan A. Abraham, Lucy Xiaoyang Shi, Chelsea Finn
  - *What it does, and why it matters to you:* Uses hinge losses on n-step optimality-tightening inequalities to stop temporal-difference error compounding over long horizons. Notable because the first author is an MS student - your existence proof that this is reachable from a master's seat.
  - *Abstract (verbatim):* Off-policy, value-based reinforcement learning methods such as Q-learning are appealing because they can learn from arbitrary experience, including data collected by older policies or other agents. In practice, however, bootstrapping makes long-horizon learning brittle: estimation errors at later states propagate backward through temporal-difference (TD) updates and can compound over time. We propose long-horizon Q-learning (LQL), which introduces a principled backstop against compounding error when learning the optimal action-value function. LQL builds on a prior optimality tightening observation: any realized action sequence lower-bounds what the optimal policy can achieve in expectation, so acting optimally earlier should not be worse than following the observed actions for several steps before switching to optimal behavior. Our contribution is to turn this inequality into a practical stabilization mechanism for Q-learning by using a hinge loss to penalize violations of these bounds. Importantly, LQL computes these penalties using network outputs already produced for the TD error, requiring no auxiliary networks and no additional forward passes relative to Q-learning. When combined with multiple state-of-the-art methods on a range of online and offline-to-online benchmarks, LQL consistently outperforms both 1-step TD and n-step TD learning at similar runtime.

---

### Anubha Mahajan

**MS** · MS student · Human preference learning

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Freeform preference learning - letting annotators define their own language preference axes rather than answering binary comparisons.
- **Advising:** Works with Marcel Torne
- **Hardware / platforms:** Annotation-based; low hardware need
- **Status and signals:** Second author on Freeform Preference Learning. Direct evidence that Torne's thrust takes MS students and gives them real authorship.

**Startup relevance 8/10.** Eight, inherited from the work rather than from seniority - which is the point of scoring the work. Freeform Preference Learning is the closest thing in the lab to a failure-definition methodology, the unenforceable term in every RaaS uptime SLA, at a 38-point gain over binary-preference baselines.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 9/10.** Nine. This is what the score is for: a peer, in the thinnest attractive thrust, on the most thesis-adjacent paper, doing annotation-based work needing no robot hours. A5=2 because she is living proof the room takes MS students. Talk to her and Abhijnya Bhat together - they are the two-MS-student half of that paper.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **Freeform Preference Learning for Robotic Manipulation** — [arXiv 2606.32027](https://arxiv.org/abs/2606.32027)
  - *Authors:* Marcel Torne, Anubha Mahajan, Abhijnya Bhat, Chelsea Finn
  - *What it does, and why it matters to you:* Instead of asking annotators for binary A-or-B preferences, it lets them name their own axes - speed, carefulness - and gets a 38-point gain over binary-preference baselines. THE most thesis-relevant paper in IRIS: defining what good and bad behaviour even mean is the unenforceable term in every robot uptime SLA.
  - *Abstract (verbatim):* Reward design remains a central bottleneck for autonomous robot policy improvement, especially in long-horizon manipulation tasks where sparse success labels provide too little signal and binary preferences collapse many competing notions of quality into one ambiguous signal. We introduce Freeform Preference Learning (FPL), a method for learning robot policies from freeform human preferences. Rather than asking annotators which of two trajectories is better overall, FPL lets them define natural-language preference axes, such as speed, safety, quality of placement, or carefulness, and provide pairwise preferences along each axis. These annotations are used to learn a language-conditioned reward model that maps a trajectory and preference label to an axis-specific reward. We use this model to train a reward-conditioned policy that optimizes across the multiple human-specified dimensions. Across four real-world and two simulated long-horizon manipulation tasks, FPL improves over sparse-reward and binary-preference methods by 38 percentage points. Beyond improved performance, FPL learns dense progress signals without explicit subtask segmentation, shows compositionality of behavior not present in the data, and allows users to steer the policy towards different behaviors at test time without retraining. Blog post with videos available at [this https URL](https://freeform-pl.github.io/fpl.website/)

---

### Abhijnya Bhat

**MS** · MS student · Human preference learning

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Freeform preference learning - annotator-defined preference axes for robot behaviour quality.
- **Advising:** Works with Marcel Torne
- **Hardware / platforms:** Annotation-based; low hardware need
- **Status and signals:** Third author on Freeform Preference Learning.

**Startup relevance 8/10.** Eight, same basis as Anubha Mahajan - the score attaches to Freeform Preference Learning, the lab's closest existing work to a failure-and-quality definition methodology.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 9/10.** Nine, same basis. They score identically because they are the same evidence: Marcel Torne's thrust demonstrably hands MS students real authorship on thesis-adjacent work with no robot-hour requirement. Two independent confirmations of one accessible room is worth more than either alone.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **Freeform Preference Learning for Robotic Manipulation** — [arXiv 2606.32027](https://arxiv.org/abs/2606.32027)
  - *Authors:* Marcel Torne, Anubha Mahajan, Abhijnya Bhat, Chelsea Finn
  - *What it does, and why it matters to you:* Instead of asking annotators for binary A-or-B preferences, it lets them name their own axes - speed, carefulness - and gets a 38-point gain over binary-preference baselines. THE most thesis-relevant paper in IRIS: defining what good and bad behaviour even mean is the unenforceable term in every robot uptime SLA.
  - *Abstract (verbatim):* Reward design remains a central bottleneck for autonomous robot policy improvement, especially in long-horizon manipulation tasks where sparse success labels provide too little signal and binary preferences collapse many competing notions of quality into one ambiguous signal. We introduce Freeform Preference Learning (FPL), a method for learning robot policies from freeform human preferences. Rather than asking annotators which of two trajectories is better overall, FPL lets them define natural-language preference axes, such as speed, safety, quality of placement, or carefulness, and provide pairwise preferences along each axis. These annotations are used to learn a language-conditioned reward model that maps a trajectory and preference label to an axis-specific reward. We use this model to train a reward-conditioned policy that optimizes across the multiple human-specified dimensions. Across four real-world and two simulated long-horizon manipulation tasks, FPL improves over sparse-reward and binary-preference methods by 38 percentage points. Beyond improved performance, FPL learns dense progress signals without explicit subtask segmentation, shows compositionality of behavior not present in the data, and allows users to steer the policy towards different behaviors at test time without retraining. Blog post with videos available at [this https URL](https://freeform-pl.github.io/fpl.website/)

---

### Ke Wang

**MS** · MS student · Dexterous manipulation / generalist policies

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Can a VLA fine-tuned on egocentric human video control a humanoid with five-finger hands?
- **Advising:** Works with Ji Woong Kim
- **Hardware / platforms:** Humanoid with Tesollo and Inspire five-finger hands, 58-dim bimanual action space
- **Status and signals:** CO-FIRST AUTHOR on Ego-Pi at CVPR 2026 as an MS student - the strongest MS publication outcome on the roster alongside Armaan Abraham.

**Startup relevance 7/10.** Seven. Egocentric human video as a training source is the cheapest conceivable data path, which is why S1 is 2 - the alternative is teleoperation at scale, which is what everyone is currently overspending on. S2=2 on the five-finger dexterous half. S4=0: Tesollo and Inspire hands on a humanoid is privileged hardware.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **1** · Transferability out of the lab **0** · Deployment proximity **2**

**Alignment & ease of entry 6/10.** Six. The work is not close to your background and the hardware barrier is absolute, but A5=2 and he is worth talking to for the same reason as Armaan Abraham. Between them they establish that both first and co-first authorship are achievable from an MS seat here, which is the base rate you actually need.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **0** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **Ego-Pi: VLA Fine-Tuning for Ego-Centric Human and Robot Data** — [arXiv 2606.08107](https://arxiv.org/abs/2606.08107)
  - *Authors:* Ji Woong Kim, Ke Wang, Zipeng Fu, Sirui Chen, Cong Zhao, Jeff Lai, Chelsea Finn
  - *What it does, and why it matters to you:* Fine-tunes a vision-language-action model on egocentric human video and then drives a humanoid with five-finger hands over a 58-dimensional bimanual action space. The point is the data source: human video is the cheapest robot data there is.
  - *Abstract (verbatim):* Robotics faces a fundamental challenge of data scarcity. Unlike language or vision research, there is no internet-scale dataset for robotic manipulation. A promising path forward is to leverage egocentric human data, which can be collected more easily, with greater breadth, and at a larger scale. Towards this end, we investigate key design choices for learning across human and humanoid embodiments equipped with dexterous five-finger hands, using the π₀.₅ model as a foundation. Our results show that human data enables robots to learn new task semantics and compose existing skills into novel behaviors without corresponding robot data.

---

### Pyrros Koussios

**MS (visiting)** · Visiting MS student · Reward modelling

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Can structure-aware fine-tuning improve VLM reward models?
- **Advising:** Andreas Krause is a co-author. ETH Zurich affiliation is INFERRED from co-authors and UNVERIFIED.
- **Hardware / platforms:** None.
- **Status and signals:** Visiting MS, temporary. Affiliation unverified.

**Startup relevance 5/10.** Five. Reward-model quality is upstream of everything but sells to nobody directly.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **0** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 7/10.** Seven. A1=2 because reward modelling is RL, A3=2 with no hardware. Held back by visiting status.

> RL / ML overlap **2** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **2** · Room beside them **1** · Reachable and still here **1**

---

### Roshen Sanjay Nair

**Undergraduate (BS)** · Undergraduate · LLM post-training

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** Automated search over LLM harness source code using execution traces.
- **Advising:** Works with Yoonho Lee
- **Hardware / platforms:** None.
- **Status and signals:** Second author on Meta-Harness (COLM 2026) with Yoonho Lee, Qizheng Zhang, Kangwook Lee, Omar Khattab and Chelsea Finn. The ONLY 2025-26 IRIS paper with an undergraduate co-author.

**Startup relevance 3/10.** Three. LLM systems work, no robotics buyer.

> Buyer already spending badly **0** · Attacks a verified capability ceiling **0** · Incumbent whitespace **0** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 7/10.** Seven. Notable less for fit than for what he proves about the lab's floor - an undergraduate can land second author on a COLM paper here. If an undergrad can do that, the MS ceiling of one first-author paper is not an optimistic estimate.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **2** · Room beside them **1** · Reachable and still here **2**

**Papers.**

- **Meta-Harness: End-to-End Optimization of Model Harnesses** — [arXiv 2603.28052](https://arxiv.org/abs/2603.28052)
  - *Authors:* Yoonho Lee, Roshen Nair, Qizheng Zhang, Kangwook Lee, Omar Khattab, Chelsea Finn
  - *What it does, and why it matters to you:* Treats the scaffolding around a language model - its harness source code - as the thing to optimise, searching over it using execution traces. No robot anywhere, but a good illustration of optimising the system instead of the weights.
  - *Abstract (verbatim):* The performance of large language model (LLM) systems depends not only on model weights, but also on their harness: the code that determines what information to store, retrieve, and present to the model. Yet harnesses are still designed largely by hand, and existing text optimizers are poorly matched to this setting because they compress feedback too aggressively. We introduce Meta-Harness, an outer-loop system that searches over harness code for LLM applications. It uses an agentic proposer that accesses the source code, scores, and execution traces of all prior candidates through a filesystem. On online text classification, Meta-Harness improves over a state-of-the-art context management system by 7.7 points while using 4x fewer context tokens. On retrieval-augmented math reasoning, a single discovered harness improves accuracy on 200 IMO-level problems by 4.7 points on average across five held-out models. On agentic coding, discovered harnesses surpass the best hand-engineered baselines on TerminalBench-2. Together, these results show that richer access to prior experience can enable automated harness engineering.

---

### Rohan Tan Bhowmik

**Undergraduate (BS)** · Undergraduate · Dexterous/humanoid (unpublished)

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** At IRIS: humanoid athletic skills and human-out-of-the-loop robot learning. Outside IRIS: wildfire ML, respiratory disease prediction, quantum optical CNNs.
- **Advising:** IRIS projects unpublished
- **Hardware / platforms:** Humanoid platforms
- **Status and signals:** Substantial NON-IRIS publication record (2025 CaWFI dataset arXiv, ICCV 2025 workshop paper on Lake Tahoe 3D reconstruction) but NO IRIS or robotics papers yet - his three listed IRIS projects are unpublished.

**Startup relevance 5/10.** Five, low confidence because the IRIS work is unpublished - there is nothing to score except project titles. Humanoid athletics is capability-adjacent.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **1** · Deployment proximity **1**

**Alignment & ease of entry 8/10.** Eight, and A2 is 2 for an unexpected reason: his non-IRIS record is signal processing - wildfire remote sensing, quantum optical CNNs, 3D reconstruction. He is the person here whose background most resembles yours arriving at robotics from outside it. Worth a conversation about how he made that translation, independent of the IRIS work.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

---

### Aadi Shah (Aaditya Shah)

**Undergraduate (BS)** · Undergraduate · Memory & long-horizon control / world models

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** World models and memory for long-horizon manipulation.
- **Advising:** IRIS and ILIAD
- **Hardware / platforms:** Unclear - course projects only
- **Status and signals:** Works across IRIS and ILIAD. Only course-project papers (CS231N, CS224R), no arXiv.

**Startup relevance 7/10.** Seven on topic, low confidence on execution - he sits on the intersection of the two thinnest thrusts but has published nothing, so this scores the room, not the output.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **1**

**Alignment & ease of entry 8/10.** Eight. A4 and A5 are 2: he occupies the thin thrust and he is an undergraduate who will be around. Practically he is a useful first conversation because he spans IRIS and ILIAD, exactly the Finn/Sadigh boundary you would be navigating.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

---

### Ayush Agarwal

**MS** · MS student · Unknown

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** NO VERIFIABLE RESEARCH RECORD. A candidate paper (COBALT, arXiv 2605.19138) belongs to a Georgia Tech and NVIDIA author group with no Finn involvement; the identity match is unconfirmed.
- **Advising:** UNKNOWN
- **Hardware / platforms:** Unknown
- **Status and signals:** Stanford enrolment confirmed; no findable papers or research page.

**Not scored.** NOT SCORED. There is no stated work to score, and assigning a number to an absence would be inventing data.

### Ron Polonsky

**MS** · MS student · Unknown

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** NO VERIFIABLE RESEARCH RECORD. Stanford enrolment confirmed; no papers or research pages found.
- **Advising:** UNKNOWN
- **Hardware / platforms:** Unknown
- **Status and signals:** Roster entry only.

**Not scored.** NOT SCORED - no stated work.

### Mikul Rai

**MS** · MS student · Unknown

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** NO VERIFIABLE RESEARCH RECORD. Stanford enrolment confirmed; no papers or research pages found.
- **Advising:** UNKNOWN
- **Hardware / platforms:** Unknown
- **Status and signals:** Roster entry only.

**Not scored.** NOT SCORED - no stated work.

### Elijah Song

**MS** · MS student · Unknown

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** NO VERIFIABLE RESEARCH RECORD. Stanford enrolment confirmed; no papers or research pages found.
- **Advising:** UNKNOWN
- **Hardware / platforms:** Unknown
- **Status and signals:** Roster entry only.

**Not scored.** NOT SCORED - no stated work.

### Yi Du

**Undergraduate (BS)** · Undergraduate · Unknown

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** NO FINDABLE PROFILE AT ALL. Roster entry with no link and no locatable page.
- **Advising:** UNKNOWN
- **Hardware / platforms:** Unknown
- **Status and signals:** Roster entry only, no link.

**Not scored.** NOT SCORED - no stated work.

### Eric Liang

**Undergraduate (BS)** · Undergraduate · Unknown

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** NO FINDABLE PROFILE AT ALL. Roster entry with no link and no locatable page.
- **Advising:** UNKNOWN
- **Hardware / platforms:** Unknown
- **Status and signals:** Roster entry only, no link.

**Not scored.** NOT SCORED - no stated work.

## REALab (Shuran Song) roster — 19 members

Taken from real.stanford.edu/lab.html — **19 members excluding Song**. The roster and the lab's 91-paper publication list are embedded as JavaScript literals in the page, so a summarising fetch returns an empty shell and the raw HTML has to be read directly. REALab publishes member emails almost universally: 18 of its 19 members publish one, the sole exception being the visiting student whose page would not load.

| Person | Programme | Thrust | S/10 | A/10 | Published email |
|---|---|---|---|---|---|
| **Hao Li** | Postdoc | Dexterous hardware & field manipulation | 8 | 7 | `hao.li@cs.stanford.edu` |
| **Changhao Wang** | Postdoc | Dexterous & contact-rich manipulation | 9 | 8 | `changhaowang@stanford.edu` |
| **Juntao Ren** | PhD | Robust imitation / world & reward models (thrust not yet written at REALab) | 10 | 10 | `juntao.ren@stanford.edu` |
| **Zhanyi Sun** | PhD (2nd year) | Safety, robustness & distribution shift | 10 | 9 | `zhanyis@stanford.edu` |
| **Jaden Clark** | PhD (started 9/2025) | Multisensory sensing & interactive world models | 9 | 8 | `jvclark@stanford.edu` |
| **Han Zhang** | PhD (1st year) | Robot design & dexterous hardware interfaces | 9 | 7 | `robohan@stanford.edu` |
| **Chuer Pan** | PhD | Data-efficient manipulation & precision | 9 | 8 | `chuerpan@stanford.edu` |
| **Austin Patel** | PhD | In-context & embodiment-general policies | 9 | 7 | `auspatel@stanford.edu` |
| **Xiaomeng Xu** | PhD (4th year candidate) | Hardware-software co-design & whole-body manipulation | 9 | 5 | `xuxm@stanford.edu` |
| **Zeyi Liu** | PhD (final year) | Multimodal sensorimotor learning & compliance | 9 | 5 | `liuzeyi@stanford.edu` |
| **Yihuai Gao** | PhD (3rd year, EE Department) | World models & video generation for robots / memory | 6 | 7 | `yihuai@stanford.edu` |
| **Maximilian Du** | PhD (3rd year) | Rapid adaptation & human-robot interaction | 7 | 8 | `maxjdu@stanford.edu` |
| **Jisang Park** | MSCS | Data-efficient long-horizon bimanual mobile manipulation | 9 | 7 | `jisangp@stanford.edu` |
| **Joshua Citron** | MS Computer Science (coterm) | Teleoperation interfaces & force-sensing manipulation | 9 | 8 | `jcitron@stanford.edu` |
| **Renee Zbizika** | MS Computer Science (started April 2026; BS CS Stanford, June 2026) | Learning dexterous everyday tasks from humans | 8 | 8 | `rzbizika@stanford.edu` |
| **Sophia Huang** | MS Electrical Engineering | Perception, LiDAR, SLAM & robot integration | 6 | 8 | `sophiacc@stanford.edu` |
| **Jack Goler** | Undergraduate (Mathematics and EE/CS) | Cheap-data manipulation & cross-embodiment transfer | 9 | 7 | `jgoler@stanford.edu` |
| **Ryan Zhang** | Undergraduate (Mathematics and CS), Class of 2028 | Affordance-guided policies & embodiment-agnostic data | 8 | 8 | `ryanzhang@stanford.edu` |
| **Calvin Luo** | Visiting student | Unknown | — | — | *not published* |

### Hao Li

**Postdoc** · Postdoc · Dexterous hardware & field manipulation

- **Email:** `hao.li@cs.stanford.edu`
- **Open question:** Can you learn manipulation for environments where teleoperation is impossible - starting with underwater?
- **Advising:** Shuran Song (postdoc). PhD in Robotics at Stanford in Mark Cutkosky's BDML, also collaborated with Oussama Khatib and Song. MS in SVL with Jiajun Wu and Fei-Fei Li.
- **Hardware / platforms:** UMI-Aquatic handheld gripper; underwater manipulation platforms
- **Status and signals:** THE MOST NETWORKED PERSON IN EITHER LAB: PhD under Cutkosky, collaborations with Khatib and Song, MS under Jiajun Wu and Fei-Fei Li, undergrad with Karthik Ramani (himself a Cutkosky PhD). His page says verbatim: 'Feel free to reach out to chat about research, career plans, or anything else! I'm happy to share my experience.' That is the most explicit invitation on either roster.

**Startup relevance 8/10.** Eight. UMI-Underwater is co-first-authored and attacks a genuinely unoccupied market - subsea inspection and intervention, where the incumbent method is an ROV with a human pilot at day rates. S3 is 2 because no well-funded incumbent is doing learned underwater manipulation. S5 is 2 because the whole UMI premise is cheap handheld data collection, which is a product shape rather than a paper shape. S1 held at 1: the buyers are real but I have no documented evidence of them mis-measuring their spend.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 7/10.** Seven on the rubric, but treat this one as the exception where the number understates the person. He is your single best first email in either lab - not because the research is the closest fit, but because he has trained under four of the faculty you are trying to understand and he has explicitly invited career conversations. Use him to map the department, not to pick a project.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **UMI-Underwater** — no arXiv record exists; the lab publishes it only as a project page or a PDF, so there is no canonical abstract to quote. Left blank rather than paraphrased.

---

### Changhao Wang

**Postdoc** · Postdoc · Dexterous & contact-rich manipulation

- **Email:** `changhaowang@stanford.edu`
- **Open question:** How does a pretrained visuomotor policy keep learning once force and touch enter the loop?
- **Advising:** Shuran Song (postdoc). PhD UC Berkeley, December 2023, under Masayoshi Tomizuka. Previously Meta Fundamental AI Research (FAIR).
- **Hardware / platforms:** Dexterous hands, tactile gloves (OSMO is open-source), sim-to-real dexterity stacks
- **Status and signals:** Associate Editor for ICRA 2027 - senior enough to sponsor work. Five accepted papers in 2026 alone (CoRL, IROS, RA-L, ICRA). Second author behind first-year PhD Jaden Clark on Multisensory Continual Learning, so he demonstrably lets juniors lead.

**Startup relevance 9/10.** Nine. Contact-rich dexterous manipulation is the most underattacked gap relative to its value, and he is the only person in either lab whose entire research identity is that gap. S1 is 2 because tactile and force data is exactly what everyone is currently buying badly through teleoperation. OSMO being an open-source tactile glove for human-to-robot skill transfer is S5 = 2: a buyer can pick it up.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 8/10.** Eight. A2 is 2 and it matters: the Tomizuka lineage at Berkeley is control and mechatronics, and force, tactile and multisensory fusion is signal processing under a robotics name. Your sigpro background is the rare thing in that room, not the common thing. A5 is 2 on evidence - he is a postdoc who is present now, senior enough to co-sign work, and already gives first authorship to a first-year.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **Multisensory Continual Learning: Adapting Pretrained Visuomotor Policies to Force** — [arXiv 2606.30988](https://arxiv.org/abs/2606.30988)
  - *Authors:* Jaden Clark, Changhao Wang, Yihuai Gao, Seongheon Hong, Hojung Choi, Mark Cutkosky, Yifan Hou, Shuran Song
  - *What it does, and why it matters to you:* Takes a pretrained visuomotor policy and continually adapts it to force and touch information it was never trained on, without retraining from scratch. CoRL 2026, first-authored by a first-year PhD student. Read this as the over-the-air update problem in miniature: new information arrives, and you must absorb it without breaking what already worked.
  - *Abstract (verbatim):* Robot manipulation often relies on sensory feedback beyond vision, particularly in contact-rich settings where force, tactile, or audio signals reveal interaction states that are not directly observable from images. However, these modalities are often hardware- and task-specific, and large-scale multisensory robot datasets remain scarce. As a result, it is impractical to pretrain policies with every sensor they may encounter. We study multisensory continual learning: adapting a pretrained robot policy to new tasks with newly introduced modalities while preserving performance under the original sensor suite. We propose MultiSensory World Model (MuSe), which incorporates limited multisensory data into pretrained vision-only policies through multi-stage fusion, multisensory future prediction, and experience replay over pretraining data. We instantiate MuSe by augmenting a pretrained vision-only policy with force-torque sensing and evaluate it on real-world manipulation tasks. Our experiments show that MuSe performs strongly on contact-rich finetuning tasks while preserving, and in some cases improving, performance on the original pretraining tasks. These results suggest that a modest multisensory dataset can improve general robot capabilities beyond the finetuning distribution.

---

### Juntao Ren

**PhD** · PhD student · Robust imitation / world & reward models (thrust not yet written at REALab)

- **Email:** `juntao.ren@stanford.edu`
- **Open question:** How can robots learn and reason over time in the physical world - and recover from their own mistakes at test time?
- **Advising:** Shuran Song. Cornell undergrad with Sanjiban Choudhury.
- **Hardware / platforms:** Demonstration-data driven; low hardware requirement
- **Status and signals:** Knight-Hennessy Fellowship AND NSF GRFP. Spent time at 1X TECHNOLOGIES working on World Models - direct exposure to the company that ships NEO at 60-70% autonomy with teleop fallback. His page says verbatim 'Please feel free to reach out!' He has ZERO papers on the REALab publications page: everything so far is pre-Stanford, which means his REALab thrust is genuinely unwritten.

**Startup relevance 10/10.** Ten of ten - the only S10 across both labs, and the components are individually defensible. SAILOR (NeurIPS 2025 Spotlight, top 3%) trains both world and reward models from demonstration data so the agent can reason about how to recover from mistakes at test time. Recovery from self-inflicted failure is not an academic nicety: teleop fallback IS the cost line for every deployed humanoid, and he has seen that spend from inside 1X. S3 is 2 because nobody sells robust-imitation-with-test-time-recovery as a product. S4 is 2 because it is learned from demonstrations, not a privileged fleet. S5 is 2 because 'the policy recovers from its own errors' is the single property a VP of deployment would pay for.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **2**

**Alignment & ease of entry 10/10.** Ten of ten - the only A10. World models plus reward models plus learning-to-search is core RL; he needs no robot time; he is early with an unwritten thrust, so there is maximal room; and he explicitly invites contact. TWO HONEST CAVEATS. First, A2 is the softest component: learning-to-search is estimation-flavoured but it is not statistics the way Marcel Torne's or Zhanyi Sun's work is. Second, the same fact that gives him maximum room - no REALab papers yet - means there is no evidence his Stanford line will continue his Cornell line. The 10/10 is a statement about opportunity, not about a track record at this lab.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **A Smooth Sea Never Made a Skilled SAILOR: Robust Imitation via Learning to Search** — [arXiv 2506.05294](https://arxiv.org/abs/2506.05294)
  - *Authors:* Arnav Kumar Jain, Vibhakar Mohta, Subin Kim, Atiksh Bhardwaj, Juntao Ren, Yunhai Feng, Sanjiban Choudhury, Gokul Swamy
  - *What it does, and why it matters to you:* Trains both a world model and a reward model from demonstration data so the agent can reason at test time about how to recover from its own mistakes. NeurIPS 2025 Spotlight, top 3% of submissions. THE most decision-relevant paper on this whole board for you: recovery from self-inflicted failure is what teleop fallback currently pays for, and he learned the problem from inside 1X.
  - *Abstract (verbatim):* The fundamental limitation of the behavioral cloning (BC) approach to imitation learning is that it only teaches an agent what the expert did at states the expert visited. This means that when a BC agent makes a mistake which takes them out of the support of the demonstrations, they often don't know how to recover from it. In this sense, BC is akin to giving the agent the fish -- giving them dense supervision across a narrow set of states -- rather than teaching them to fish: to be able to reason independently about achieving the expert's outcome even when faced with unseen situations at test-time. In response, we explore learning to search (L2S) from expert demonstrations, i.e. learning the components required to, at test time, plan to match expert outcomes, even after making a mistake. These include (1) a world model and (2) a reward model. We carefully ablate the set of algorithmic and design decisions required to combine these and other components for stable and sample/interaction-efficient learning of recovery behavior without additional human corrections. Across a dozen visual manipulation tasks from three benchmarks, our approach SAILOR consistently out-performs state-of-the-art Diffusion Policies trained via BC on the same data. Furthermore, scaling up the amount of demonstrations used for BC by 5-10x still leaves a performance gap. We find that SAILOR can identify nuanced failures and is robust to reward hacking. Our code is available at this https URL .

- **Motion Tracks: A Unified Representation for Human-Robot Transfer in Few-Shot Imitation Learning** — [arXiv 2501.06994](https://arxiv.org/abs/2501.06994)
  - *Authors:* Juntao Ren, Priya Sundaresan, Dorsa Sadigh, Sanjiban Choudhury, Jeannette Bohg
  - *What it does, and why it matters to you:* Proposes a single action representation - tracks of motion - that lets a policy learn from human video and transfer to a robot in few shots. ICRA 2025, with Sadigh, Choudhury and Bohg as co-authors, which makes it a map of the Cornell-to-Stanford network he arrived through.
  - *Abstract (verbatim):* Teaching robots to autonomously complete everyday tasks remains a challenge. Imitation Learning (IL) is a powerful approach that imbues robots with skills via demonstrations, but is limited by the labor-intensive process of collecting teleoperated robot data. Human videos offer a scalable alternative, but it remains difficult to directly train IL policies from them due to the lack of robot action labels. To address this, we propose to represent actions as short-horizon 2D trajectories on an image. These actions, or motion tracks, capture the predicted direction of motion for either human hands or robot end-effectors. We instantiate an IL policy called Motion Track Policy (MT-pi) which receives image observations and outputs motion tracks as actions. By leveraging this unified, cross-embodiment action space, MT-pi completes tasks with high success given just minutes of human video and limited additional robot demonstrations. At test time, we predict motion tracks from two camera views, recovering 6DoF trajectories via multi-view synthesis. MT-pi achieves an average success rate of 86.5% across 4 real-world tasks, outperforming state-of-the-art IL baselines which do not leverage human data or our action space by 40%, and generalizes to scenarios seen only in human videos. Code and videos are available on our website this https URL.

---

### Zhanyi Sun

**PhD (2nd year)** · PhD student · Safety, robustness & distribution shift

- **Email:** `zhanyis@stanford.edu`
- **Open question:** How do you refine a pretrained generative robot policy with online feedback without letting it drift out of distribution?
- **Advising:** Shuran Song. Previously MS-Research at CMU Robotics Institute with David Held and Zackory Erickson. Rice BA CS + BS EE.
- **Hardware / platforms:** Real manipulation plus pixel-based simulation; DICE-RL is a two-author paper
- **Status and signals:** Second-year, so three-plus years remaining. First-authors TWO-AUTHOR papers directly with Shuran Song, which is the highest possible PI access signal on the roster. His stated aim names safety, robustness and trustworthiness explicitly.

**Startup relevance 10/10.** Ten of ten, and of the two S10s this is the one whose track record already exists. DICE-RL (ICML 2026) uses RL as a 'distribution contraction' operator to turn a pretrained behaviour prior into a high-performing policy by amplifying high-success behaviours from online feedback - which is, in your vocabulary, controlled post-deployment policy improvement. Latent Policy Barrier (NeurIPS 2025) is about staying in-distribution, i.e. the exact failure mode an OTA update induces. S5 is 2 because every RaaS operator holding a deployed policy needs precisely this and currently has nothing.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **2**

**Alignment & ease of entry 9/10.** Nine. A1 and A2 are both 2 and unusually so: a 'distribution contraction operator' is a statistical object, not a robotics heuristic, and in-distribution barriers are estimation theory. This is the closest thing in either lab to your stated edge - statistical rigour applied to learned policies - attached to someone who is early, accessible, and publishes two-author papers with the PI. A3 is 1 only because the manipulation results need real hardware. If you want one person whose research line you could extend rather than join, read DICE-RL and Latent Policy Barrier first.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **From Prior to Pro: Efficient Skill Mastery via Distribution Contractive RL Finetuning** — [arXiv 2603.10263](https://arxiv.org/abs/2603.10263)
  - *Authors:* Zhanyi Sun, Shuran Song
  - *What it does, and why it matters to you:* Treats reinforcement learning as a distribution contraction operator: take a pretrained behaviour prior and amplify only its high-success behaviours using online feedback, turning a mediocre generalist into a specialist on long-horizon tasks from pixels. ICML 2026, two authors. Read this as controlled post-deployment policy improvement - the thing an operator wants and currently cannot do safely.
  - *Abstract (verbatim):* We introduce Distribution Contractive Reinforcement Learning (DICE-RL), a framework that uses reinforcement learning (RL) as a "distribution contraction" operator to refine pretrained generative robot policies. DICE-RL turns a pretrained behavior prior into a high-performing "pro" policy by amplifying high-success behaviors from online feedback. We pretrain a diffusion- or flow-based policy for broad behavioral coverage, then finetune it with a stable, sample-efficient residual off-policy RL framework that combines selective behavior regularization with value-guided action selection. Extensive experiments and analyses show that DICE-RL reliably improves performance with strong stability and sample efficiency. It enables mastery of complex long-horizon manipulation skills directly from high-dimensional pixel inputs, both in simulation and on a real robot. Project website: this https URL.

- **Latent Policy Barrier: Learning Robust Visuomotor Policies by Staying In-Distribution** — [arXiv 2508.05941](https://arxiv.org/abs/2508.05941)
  - *Authors:* Zhanyi Sun, Shuran Song
  - *What it does, and why it matters to you:* Keeps a visuomotor policy robust by explicitly keeping it inside the distribution it was trained on, treating out-of-distribution drift as the thing to prevent rather than to detect after the fact. NeurIPS 2025. This is distribution shift as a first-class object - the failure mode an over-the-air update induces.
  - *Abstract (verbatim):* Visuomotor policies trained via behavior cloning are vulnerable to covariate shift, where small deviations from expert trajectories can compound into failure. Common strategies to mitigate this issue involve expanding the training distribution through human-in-the-loop corrections or synthetic data augmentation. However, these approaches are often labor-intensive, rely on strong task assumptions, or compromise the quality of imitation. We introduce Latent Policy Barrier, a framework for robust visuomotor policy learning. Inspired by Control Barrier Functions, LPB treats the latent embeddings of expert demonstrations as an implicit barrier separating safe, in-distribution states from unsafe, out-of-distribution (OOD) ones. Our approach decouples the role of precise expert imitation and OOD recovery into two separate modules: a base diffusion policy solely on expert data, and a dynamics model trained on both expert and suboptimal policy rollout data. At inference time, the dynamics model predicts future latent states and optimizes them to stay within the expert distribution. Both simulated and real-world experiments show that LPB improves both policy robustness and data efficiency, enabling reliable manipulation from limited expert data and without additional human correction or annotation.

- **Memory Anchors for Continual Robot Learning** — [arXiv 2608.26545](https://arxiv.org/abs/2608.26545)
  - *Authors:* Maximilian Du, Zhanyi Sun, Chen Xu, Paarth Shah, Masha Itkina, Shuran Song
  - *What it does, and why it matters to you:* Anchors what a robot has already learned so that continual learning does not overwrite it. CoRL 2026. Catastrophic forgetting is the mechanism by which an over-the-air update silently breaks a task nobody tested.
  - *Abstract (verbatim):* Robot policies deployed in the wild should have the capability to continually learn new tasks without forgetting existing behaviors. A common approach to combat such catastrophic forgetting is to train on new task data with a replay buffer of previously learned task data. Although this buffer is commonly sampled randomly from all prior experiences, we show that a small set of these experiences contributes greatly in anchoring past performance. We call these experiences Memory Anchors. We identify Memory Anchors in regions where representations of new-task observations collapse onto those of old-task observations even though the tasks require conflicting actions, like when a familiar object must be manipulated in a new way. Rehearsing old data in this region plays a key role in preventing destructive overwriting of past task knowledge, serving as this critical Memory Anchor role. Excluding only 10% Memory Anchors before sampling the buffer leads to more than a 4.5x increase in catastrophic forgetting on the LIBERO benchmark suites. Conversely, enriching the replay buffer with Memory Anchors can decrease high-conflict task forgetting by 63% and enables successful continual learning of two task sequences on a real robot. Videos and additional visualizations can be found at this https URL

---

### Jaden Clark

**PhD (started 9/2025)** · PhD student · Multisensory sensing & interactive world models

- **Email:** `jvclark@stanford.edu`
- **Open question:** How do you adapt a pretrained visuomotor policy to force and touch after the fact, continually, without retraining it from scratch?
- **Advising:** CO-ADVISED by Shuran Song AND MAC SCHWAGER. Stanford undergrad with Dorsa Sadigh and C. Karen Liu.
- **Hardware / platforms:** Force and multimodal sensing rigs
- **Status and signals:** THE SCHWAGER BRIDGE - and this is the most important single connection in this whole document. Mac Schwager is a co-author of the tighter-than-Clopper-Pearson statistical guarantee work for robot policies (arXiv 2405.05439) that is the academic foundation of your own thesis. Clark is co-advised by Schwager and Song, which means the statistical-guarantees line and the contact-rich manipulation line already meet in one first-year student. Knight-Hennessy Fellowship AND NSF GRFP. Released a MultiSensory World Model in June 2026.

**Startup relevance 9/10.** Nine. Multisensory Continual Learning (CoRL 2026, he is first author) adapts pretrained visuomotor policies to force - which is the OTA-update problem wearing a different hat. You have a deployed policy, new information arrives, and you must incorporate it without breaking what worked. S2 is 2 on the force and compliance half. S4 is 1 because force sensing needs real rigs.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 8/10.** Eight on the rubric, and the highest strategic value in either lab once you account for the advising. A2 is 2 because multisensory fusion over force and touch is signal processing directly. But the reason to prioritise him is structural: he is a first-year, so present for four more years, and he is the living link to Mac Schwager. Approaching Schwager cold is hard; approaching him through a co-advised first-year working on continual adaptation is not.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **Multisensory Continual Learning: Adapting Pretrained Visuomotor Policies to Force** — [arXiv 2606.30988](https://arxiv.org/abs/2606.30988)
  - *Authors:* Jaden Clark, Changhao Wang, Yihuai Gao, Seongheon Hong, Hojung Choi, Mark Cutkosky, Yifan Hou, Shuran Song
  - *What it does, and why it matters to you:* Takes a pretrained visuomotor policy and continually adapts it to force and touch information it was never trained on, without retraining from scratch. CoRL 2026, first-authored by a first-year PhD student. Read this as the over-the-air update problem in miniature: new information arrives, and you must absorb it without breaking what already worked.
  - *Abstract (verbatim):* Robot manipulation often relies on sensory feedback beyond vision, particularly in contact-rich settings where force, tactile, or audio signals reveal interaction states that are not directly observable from images. However, these modalities are often hardware- and task-specific, and large-scale multisensory robot datasets remain scarce. As a result, it is impractical to pretrain policies with every sensor they may encounter. We study multisensory continual learning: adapting a pretrained robot policy to new tasks with newly introduced modalities while preserving performance under the original sensor suite. We propose MultiSensory World Model (MuSe), which incorporates limited multisensory data into pretrained vision-only policies through multi-stage fusion, multisensory future prediction, and experience replay over pretraining data. We instantiate MuSe by augmenting a pretrained vision-only policy with force-torque sensing and evaluate it on real-world manipulation tasks. Our experiments show that MuSe performs strongly on contact-rich finetuning tasks while preserving, and in some cases improving, performance on the original pretraining tasks. These results suggest that a modest multisensory dataset can improve general robot capabilities beyond the finetuning distribution.

---

### Han Zhang

**PhD (1st year)** · PhD student · Robot design & dexterous hardware interfaces

- **Email:** `robohan@stanford.edu`
- **Open question:** Can you build the hardware interface that makes dexterous manipulation data cheap to collect?
- **Advising:** Shuran Song. Tsinghua BEng in Electronic Engineering and Mechanical Engineering, advised by Huazhe Xu.
- **Hardware / platforms:** Builds his own: dexterous hands, gloves, novel manipulators. 'I'm always excited about designing and building new hardware!'
- **Status and signals:** ALREADY A STARTUP CO-FOUNDER. His page states he was a Co-Founder of DEXTA ROBOTICS INC, where he supported projects helping patients recover from stroke. He is a first-year PhD with the Stanford Graduate Fellowship who has already done the thing you are considering. DexUMI was a Best Paper Award Finalist at CoRL 2025.

**Startup relevance 9/10.** Nine. DexUMI uses the human hand itself as the universal manipulation interface for dexterous manipulation - a data-cost result on the most expensive kind of data there is. S1 is 2 because dexterous demonstration data is precisely what firms are overpaying for through teleoperation rigs. S3 is 2 because hardware interfaces for dexterity are thin and mostly proprietary.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 7/10.** Seven on the rubric, and like Hao Li this is a case where the number understates the value. He is not a research-fit match - there is little RL or estimation in hardware design. He is a conversation you should have for a different reason entirely: he is a first-year PhD student in your target lab who has already co-founded a robotics company. On the specific question of whether you can run a company and a research programme at once, he has direct evidence and you have speculation.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **DexUMI: Using Human Hand as the Universal Manipulation Interface for Dexterous Manipulation** — [arXiv 2505.21864](https://arxiv.org/abs/2505.21864)
  - *Authors:* Mengda Xu, Han Zhang, Yifan Hou, Zhenjia Xu, Linxi Fan, Manuela Veloso, Shuran Song
  - *What it does, and why it matters to you:* Uses the human hand itself as the manipulation interface for collecting dexterous data, so demonstration data stops requiring a teleoperation rig. CoRL 2025 Oral and a Best Paper Award finalist. Dexterous data is the single most expensive category of robot data, which is what makes this a cost result.
  - *Abstract (verbatim):* We present DexUMI - a data collection and policy learning framework that uses the human hand as the natural interface to transfer dexterous manipulation skills to various robot hands. DexUMI includes hardware and software adaptations to minimize the embodiment gap between the human hand and various robot hands. The hardware adaptation bridges the kinematics gap using a wearable hand exoskeleton. It allows direct haptic feedback in manipulation data collection and adapts human motion to feasible robot hand motion. The software adaptation bridges the visual gap by replacing the human hand in video data with high-fidelity robot hand inpainting. We demonstrate DexUMI's capabilities through comprehensive real-world experiments on two different dexterous robot hand hardware platforms, achieving an average task success rate of 86%.

- **HoMMI: Learning Whole-Body Mobile Manipulation from Human Demonstrations** — [arXiv 2603.03243](https://arxiv.org/abs/2603.03243)
  - *Authors:* Xiaomeng Xu, Jisang Park, Han Zhang, Eric Cousineau, Aditya Bhat, Jose Barreiros, Dian Wang, Jeannette Bohg, Shuran Song
  - *What it does, and why it matters to you:* Learns whole-body mobile manipulation from human demonstrations. RSS 2026. Three current REALab students are on the author list, which makes it a good map of who works with whom.
  - *Abstract (verbatim):* We present Whole-Body Mobile Manipulation Interface (HoMMI), a data collection and policy learning framework that learns whole-body mobile manipulation directly from robot-free human demonstrations. We augment UMI interfaces with egocentric sensing to capture the global context required for mobile manipulation, enabling portable, robot-free, and scalable data collection. However, naively incorporating egocentric sensing introduces a larger human-to-robot embodiment gap in both observation and action spaces, making policy transfer difficult. We explicitly bridge this gap with a cross-embodiment hand-eye policy design, including an embodiment agnostic visual representation; a relaxed head action representation; and a whole-body controller that realizes hand-eye trajectories through coordinated whole-body motion under robot-specific physical constraints. Together, these enable long-horizon mobile manipulation tasks requiring bimanual and whole-body coordination, navigation, and active perception.

---

### Chuer Pan

**PhD** · PhD student · Data-efficient manipulation & precision

- **Email:** `chuerpan@stanford.edu`
- **Open question:** How few demonstrations does a visuomotor policy actually need, if you augment the right thing?
- **Advising:** Shuran Song. Previously MS in Robotics at CMU with David Held. Undergrad in Engineering Science (Robotics) at Toronto.
- **Hardware / platforms:** UMI handheld grippers; UMI-FT force-torque; Boston Dynamics Atlas (internship)
- **Status and signals:** INTERNED AT BOSTON DYNAMICS on dexterous manipulation for the electric Atlas - a valuable industry channel that is neither Physical Intelligence nor NVIDIA. Her CMU MS was object-centric 3D representations for precise 6D spatial reasoning, i.e. high-precision manipulation from few RGBD captures.

**Startup relevance 9/10.** Nine. 'One Demo is Worth a Thousand Trajectories' (CoRL 2025, first author) gets generalisation from action-view augmentation rather than from more data collection - which is a direct attack on the largest line item in every robot company's budget. S4 and S5 are both 2 because the method is cheap by construction and immediately usable. S2 is held at 1 rather than 2: augmentation improves data efficiency, it does not itself solve the compliance ceiling, and her actual dexterity work at Boston Dynamics is unpublished.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **2**

**Alignment & ease of entry 8/10.** Eight. A2 is 2 because action-view augmentation and 6D spatial reasoning from multi-view RGBD is geometric signal processing. She is mid-PhD, first-authoring her own line, and carries the Boston Dynamics relationship - which is the cleanest industry channel in either lab for someone who intends to compete with or sell to policy vendors.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **One Demo is Worth a Thousand Trajectories** — no arXiv record exists; the lab publishes it only as a project page or a PDF, so there is no canonical abstract to quote. Left blank rather than paraphrased.

- **In-the-Wild Compliant Manipulation with UMI-FT** — [arXiv 2601.09988](https://arxiv.org/abs/2601.09988)
  - *Authors:* Hojung Choi, Yifan Hou, Chuer Pan, Seongheon Hong, Austin Patel, Xiaomeng Xu, Mark R. Cutkosky, Shuran Song
  - *What it does, and why it matters to you:* Adds force-torque sensing to the handheld UMI gripper so in-the-wild demonstration data carries compliance information, not just motion. ICRA 2026. This is the join between the cheap-data thesis and the compliance ceiling, which is the most commercially loaded intersection in REALab.
  - *Abstract (verbatim):* Many manipulation tasks require careful force modulation. With insufficient force the task may fail, while excessive force could cause damage. The high cost, bulky size and fragility of commercial force/torque (F/T) sensors have limited large-scale, force-aware policy learning. We introduce UMI-FT, a handheld data-collection platform that mounts compact, six-axis force/torque sensors on each finger, enabling finger-level wrench measurements alongside RGB, depth, and pose. Using the multimodal data collected from this device, we train an adaptive compliance policy that predicts position targets, grasp force, and stiffness for execution on standard compliance controllers. In evaluations on three contact-rich, force-sensitive tasks (whiteboard wiping, skewering zucchini, and lightbulb insertion), UMI-FT enables policies that reliably regulate external contact forces and internal grasp forces, outperforming baselines that lack compliance or force sensing. UMI-FT offers a scalable path to learning compliant manipulation from in-the-wild demonstrations. We open-source the hardware and software to facilitate broader adoption at:this https URL.

- **Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots** — [arXiv 2402.10329](https://arxiv.org/abs/2402.10329)
  - *Authors:* Cheng Chi, Zhenjia Xu, Chuer Pan, Eric Cousineau, Benjamin Burchfiel, Siyuan Feng, Russ Tedrake, Shuran Song
  - *What it does, and why it matters to you:* A handheld gripper lets a human collect demonstration data in the wild with no robot present, and the policy transfers to the real robot. RSS 2024. The foundational cheap-data result of REALab and the direct ancestor of Sunday Robotics' skill-capture glove.
  - *Abstract (verbatim):* We present Universal Manipulation Interface (UMI) -- a data collection and policy learning framework that allows direct skill transfer from in-the-wild human demonstrations to deployable robot policies. UMI employs hand-held grippers coupled with careful interface design to enable portable, low-cost, and information-rich data collection for challenging bimanual and dynamic manipulation demonstrations. To facilitate deployable policy learning, UMI incorporates a carefully designed policy interface with inference-time latency matching and a relative-trajectory action representation. The resulting learned policies are hardware-agnostic and deployable across multiple robot platforms. Equipped with these features, UMI framework unlocks new robot manipulation capabilities, allowing zero-shot generalizable dynamic, bimanual, precise, and long-horizon behaviors, by only changing the training data for each task. We demonstrate UMI's versatility and efficacy with comprehensive real-world experiments, where policies learned via UMI zero-shot generalize to novel environments and objects when trained on diverse human demonstrations. UMI's hardware and software system is open-sourced at this https URL.

---

### Austin Patel

**PhD** · PhD student · In-context & embodiment-general policies

- **Email:** `auspatel@stanford.edu`
- **Open question:** Can a robot learn a new task at inference time from a single human demonstration, without any retraining?
- **Advising:** Shuran Song. Berkeley EECS undergrad; computer vision in BAIR with Ilija Radosavovic and Jitendra Malik; micro-robotics in the Berkeley Autonomous Microsystems Lab with Kristofer Pister.
- **Hardware / platforms:** Multiple embodiments; UMI-FT
- **Status and signals:** NSF GRFP. President of SERIO, an organisation supporting underserved students preparing for graduate school - so community-facing and demonstrably approachable. First-authors his own line (GET-Zero, Behavior Prompting Policy).

**Startup relevance 9/10.** Nine. Behavior Prompting Policy is an in-context visuomotor policy that learns new tasks at inference time by conditioning on a single human demonstration. That is the integration-cost problem stated precisely - and integration cost is what killed Rethink Robotics twice, per your own market verdicts. S4 and S5 are both 2: one demo is as cheap as data gets, and 'teach it a new task on site in one demo' is the product a systems integrator would buy tomorrow. GET-Zero adds zero-shot generalisation across embodiments.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **2**

**Alignment & ease of entry 7/10.** Seven. Moderate fit - graph embodiment transformers and in-context learning are ML but not your RL or estimation core. Worth noting the micro-robotics background under Kris Pister, which is unusual and connects to your earlier nanorobotics field map if that thread ever reopens.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **GET-Zero: Graph Embodiment Transformer for Zero-shot Embodiment Generalization** — [arXiv 2407.15002](https://arxiv.org/abs/2407.15002)
  - *Authors:* Austin Patel, Shuran Song
  - *What it does, and why it matters to you:* A graph transformer that encodes the robot's embodiment structure so one policy generalises zero-shot to robot bodies it has never seen. ICRA 2025.
  - *Abstract (verbatim):* This paper introduces GET-Zero, a model architecture and training procedure for learning an embodiment-aware control policy that can immediately adapt to new hardware changes without retraining. To do so, we present Graph Embodiment Transformer (GET), a transformer model that leverages the embodiment graph connectivity as a learned structural bias in the attention mechanism. We use behavior cloning to distill demonstration data from embodiment-specific expert policies into an embodiment-aware GET model that conditions on the hardware configuration of the robot to make control decisions. We conduct a case study on a dexterous in-hand object rotation task using different configurations of a four-fingered robot hand with joints removed and with link length extensions. Using the GET model along with a self-modeling loss enables GET-Zero to zero-shot generalize to unseen variation in graph structure and link length, yielding a 20% improvement over baseline methods. All code and qualitative video results are on [this https URL](https://get-zero-paper.github.io)

- **Behavior Prompting Policy: Demonstrations as Prompts for Manipulation** — [arXiv 2606.30457](https://arxiv.org/abs/2606.30457)
  - *Authors:* Austin Patel, Ben Pekarek, Joel Enrique Castro Hernandez, Shuran Song
  - *What it does, and why it matters to you:* An in-context policy: the robot learns a new task at inference time by conditioning on a single human demonstration used as a prompt, with no retraining at all. This is the integration-cost problem solved at its root, and integration cost is what killed Rethink Robotics twice.
  - *Abstract (verbatim):* We study behavior prompting, a paradigm that enables robots to perform new tasks at inference time given a single human demonstration, which we call a behavior prompt. To enable this capability, we present contributions in algorithm, data, and evaluation. For algorithm, we introduce Behavior Prompting Policy (BPP), an in-context visuomotor architecture that translates the behavior prompt and the current observation into robot actions. For data, we identify that task diversity is the primary driver of the prompting capability and introduce iPhUMI, a handheld manipulation interface for collecting diverse training data. For evaluation, we introduce DrawAnything and LIBERO-Gen to evaluate test-time adaptation to unseen drawing and tabletop manipulation tasks. We also demonstrate that iPhUMI serves as a practical interface for specifying behavior prompts at test time, enabling a human to command a robot via a single demonstration to complete known tasks or to define new robot capabilities. Altogether, behavior prompting provides a flexible and scalable way to teach robots new skills without the need for expensive fine-tuning. Our project website is located at this https URL .

---

### Xiaomeng Xu

**PhD (4th year candidate)** · PhD student · Hardware-software co-design & whole-body manipulation

- **Email:** `xuxm@stanford.edu`
- **Open question:** Should you design the robot for the task, rather than only train a policy for the robot you have?
- **Advising:** Shuran Song. Tsinghua BE in Automation Engineering, worked with Li Yi and Leonidas Guibas.
- **Hardware / platforms:** Custom manipulators, RoboPanoptes whole-body platform, PanoVine soft growing vine robot, Amazon FAR humanoid
- **Status and signals:** ON THE JOB MARKET FROM FALL 2026, looking at both academia and industry, and says to reach out if there is a fit. THE MOST PRODUCTIVE STUDENT IN REALAB - 9 papers on the lab page, 4 as first author. Stanford Interdisciplinary Graduate Fellowship. Research intern at Amazon FAR on humanoid loco-manipulation.

**Startup relevance 9/10.** Nine. Dynamics-Guided Diffusion Model for Robot Manipulator Design (CoRL 2024, first author) generates the manipulator geometry for a task - hardware-software co-design is a capital-allocation result, which is why S1 is 2. RoboPanoptes gets whole-body dexterity from whole-body sensing. S3 is 2 because co-design is genuinely thin: almost everyone takes the robot as given and trains harder.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 5/10.** Seven, and A5 is a hard 0 - she is on the job market now, so there is no multi-year relationship available. That is the whole gap between her S of 9 and her practical value to you. Read her papers and talk to her about what she learned, but do not plan a two-year project around her. A4 is 1 because with 9 papers she substantially occupies her own area, the milder version of the Perry Dong problem.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **1** · Reachable and still here **0**

**Papers.**

- **RoboPanoptes: The All-seeing Robot with Whole-body Dexterity** — [arXiv 2501.05420](https://arxiv.org/abs/2501.05420)
  - *Authors:* Xiaomeng Xu, Dominik Bauer, Shuran Song
  - *What it does, and why it matters to you:* A robot covered in cameras along its whole body, using whole-body sensing to get whole-body dexterity. RSS 2025. Hardware and policy designed together rather than separately.
  - *Abstract (verbatim):* We present RoboPanoptes, a capable yet practical robot system that achieves whole-body dexterity through whole-body vision. Its whole-body dexterity allows the robot to utilize its entire body surface for manipulation, such as leveraging multiple contact points or navigating constrained spaces. Meanwhile, whole-body vision uses a camera system distributed over the robot's surface to provide comprehensive, multi-perspective visual feedback of its own and the environment's state. At its core, RoboPanoptes uses a whole-body visuomotor policy that learns complex manipulation skills directly from human demonstrations, efficiently aggregating information from the distributed cameras while maintaining resilience to sensor failures. Together, these design aspects unlock new capabilities and tasks, allowing RoboPanoptes to unbox in narrow spaces, sweep multiple or oversized objects, and succeed in multi-step stowing in cluttered environments, outperforming baselines in adaptability and efficiency.

- **Dynamics-Guided Diffusion Model for Sensor-less Robot Manipulator Design** — [arXiv 2402.15038](https://arxiv.org/abs/2402.15038)
  - *Authors:* Xiaomeng Xu, Huy Ha, Shuran Song
  - *What it does, and why it matters to you:* Generates the geometry of the manipulator itself for a given task, using a diffusion model guided by dynamics - designing the hardware rather than only training a policy for hardware you already bought. CoRL 2024. Hardware-software co-design is a capital-allocation result.
  - *Abstract (verbatim):* We present Dynamics-Guided Diffusion Model (DGDM), a data-driven framework for generating task-specific manipulator designs without task-specific training. Given object shapes and task specifications, DGDM generates sensor-less manipulator designs that can blindly manipulate objects towards desired motions and poses using an open-loop parallel motion. This framework 1) flexibly represents manipulation tasks as interaction profiles, 2) represents the design space using a geometric diffusion model, and 3) efficiently searches this design space using the gradients provided by a dynamics network trained without any task information. We evaluate DGDM on various manipulation tasks ranging from shifting/rotating objects to converging objects to a specific pose. Our generated designs outperform optimization-based and unguided diffusion baselines relatively by 31.5% and 45.3% on average success rate. With the ability to generate a new design within 0.8s, DGDM facilitates rapid design iteration and enhances the adoption of data-driven approaches for robot mechanism design. Qualitative results are best viewed on our project website [this https URL](https://dgdm-robot.github.io/).

- **HoMMI: Learning Whole-Body Mobile Manipulation from Human Demonstrations** — [arXiv 2603.03243](https://arxiv.org/abs/2603.03243)
  - *Authors:* Xiaomeng Xu, Jisang Park, Han Zhang, Eric Cousineau, Aditya Bhat, Jose Barreiros, Dian Wang, Jeannette Bohg, Shuran Song
  - *What it does, and why it matters to you:* Learns whole-body mobile manipulation from human demonstrations. RSS 2026. Three current REALab students are on the author list, which makes it a good map of who works with whom.
  - *Abstract (verbatim):* We present Whole-Body Mobile Manipulation Interface (HoMMI), a data collection and policy learning framework that learns whole-body mobile manipulation directly from robot-free human demonstrations. We augment UMI interfaces with egocentric sensing to capture the global context required for mobile manipulation, enabling portable, robot-free, and scalable data collection. However, naively incorporating egocentric sensing introduces a larger human-to-robot embodiment gap in both observation and action spaces, making policy transfer difficult. We explicitly bridge this gap with a cross-embodiment hand-eye policy design, including an embodiment agnostic visual representation; a relaxed head action representation; and a whole-body controller that realizes hand-eye trajectories through coordinated whole-body motion under robot-specific physical constraints. Together, these enable long-horizon mobile manipulation tasks requiring bimanual and whole-body coordination, navigation, and active perception.

---

### Zeyi Liu

**PhD (final year)** · PhD student · Multimodal sensorimotor learning & compliance

- **Email:** `liuzeyi@stanford.edu`
- **Open question:** Can you unify video, audio, force and 3D geometry into one robust policy - and explain the failures when it breaks?
- **Advising:** Shuran Song. Columbia undergrad in Computer Science and Applied Mathematics.
- **Hardware / platforms:** Contact microphones, force-torque sensing, multi-view 3D; compliance control rigs
- **Status and signals:** FINAL YEAR, so a short window. Meta Embodied AI intern. Nine papers. REFLECT (CoRL 2023) summarises robot experiences for FAILURE EXPLANATION AND CORRECTION - read this one regardless of what you decide, it is the closest existing artifact in either lab to the failure-taxonomy project.

**Startup relevance 9/10.** Nine. Adaptive Compliance Policy (ICRA 2025) and Compliant Residual DAgger (NeurIPS 2025) land squarely on the compliance ceiling - the 92%-removal-versus-36%-insertion gap. REFLECT is S5 = 2 on its own: a system that summarises what the robot did and explains why it failed is the raw material of an SLA failure definition.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 5/10.** Six, held down entirely by A5 = 0 for final year. But A2 is 2 and she is the single closest match in either lab to your signal-processing background specifically: ManiWAV learns manipulation from in-the-wild AUDIO-visual data, and her stated line is fusing video, audio, force and 3D geometry. If you ever wondered whether the sigpro half of your training has a home in robot learning, this is the proof that it does. Read ManiWAV and REFLECT; do not plan a project around her.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **1** · Reachable and still here **0**

**Papers.**

- **ManiWAV: Learning Robot Manipulation from In-the-Wild Audio-Visual Data** — [arXiv 2406.19464](https://arxiv.org/abs/2406.19464)
  - *Authors:* Zeyi Liu, Cheng Chi, Eric Cousineau, Naveen Kuppuswamy, Benjamin Burchfiel, Shuran Song
  - *What it does, and why it matters to you:* Learns manipulation from in-the-wild AUDIO-visual data, using contact microphones so the robot hears what it is doing. CoRL 2024. The clearest proof in either lab that classical signal processing has a real home in robot learning.
  - *Abstract (verbatim):* Audio signals provide rich information for the robot interaction and object properties through contact. This information can surprisingly ease the learning of contact-rich robot manipulation skills, especially when the visual information alone is ambiguous or incomplete. However, the usage of audio data in robot manipulation has been constrained to teleoperated demonstrations collected by either attaching a microphone to the robot or object, which significantly limits its usage in robot learning pipelines. In this work, we introduce ManiWAV: an 'ear-in-hand' data collection device to collect in-the-wild human demonstrations with synchronous audio and visual feedback, and a corresponding policy interface to learn robot manipulation policy directly from the demonstrations. We demonstrate the capabilities of our system through four contact-rich manipulation tasks that require either passively sensing the contact events and modes, or actively sensing the object surface materials and states. In addition, we show that our system can generalize to unseen in-the-wild environments by learning from diverse in-the-wild human demonstrations.

- **Adaptive Compliance Policy: Learning Approximate Compliance for Diffusion Guided Control** — [arXiv 2410.09309](https://arxiv.org/abs/2410.09309)
  - *Authors:* Yifan Hou, Zeyi Liu, Cheng Chi, Eric Cousineau, Naveen Kuppuswamy, Siyuan Feng, Benjamin Burchfiel, Shuran Song
  - *What it does, and why it matters to you:* Learns approximate compliance - how stiff or soft to be - as part of a diffusion-guided controller. ICRA 2025. Compliance is precisely the axis on which insertion fails while removal succeeds.
  - *Abstract (verbatim):* Compliance plays a crucial role in manipulation, as it balances between the concurrent control of position and force under uncertainties. Yet compliance is often overlooked by today's visuomotor policies that solely focus on position control. This paper introduces Adaptive Compliance Policy (ACP), a novel framework that learns to dynamically adjust system compliance both spatially and temporally for given manipulation tasks from human demonstrations, improving upon previous approaches that rely on pre-selected compliance parameters or assume uniform constant stiffness. However, computing full compliance parameters from human demonstrations is an ill-defined problem. Instead, we estimate an approximate compliance profile with two useful properties: avoiding large contact forces and encouraging accurate tracking. Our approach enables robots to handle complex contact-rich manipulation tasks and achieves over 50% performance improvement compared to state-of-the-art visuomotor policy methods. For result videos, see [this https URL](https://adaptive-compliance.github.io/)

- **REFLECT: Summarizing Robot Experiences for Failure Explanation and Correction** — [arXiv 2306.15724](https://arxiv.org/abs/2306.15724)
  - *Authors:* Zeyi Liu, Arpit Bahety, Shuran Song
  - *What it does, and why it matters to you:* Summarises what the robot actually did and explains WHY it failed, then proposes a correction. CoRL 2023. Of everything in either lab, this is the closest existing artifact to the failure-taxonomy project your thesis needs - a machine-generated account of what went wrong, which is the raw material of an enforceable service-level agreement.
  - *Abstract (verbatim):* The ability to detect and analyze failed executions automatically is crucial for an explainable and robust robotic system. Recently, Large Language Models (LLMs) have demonstrated strong reasoning abilities on textual inputs. To leverage the power of LLMs for robot failure explanation, we introduce REFLECT, a framework which queries LLM for failure reasoning based on a hierarchical summary of robot past experiences generated from multisensory observations. The failure explanation can further guide a language-based planner to correct the failure and complete the task. To systematically evaluate the framework, we create the RoboFail dataset with a variety of tasks and failure scenarios. We demonstrate that the LLM-based framework is able to generate informative failure explanations that assist successful correction planning.

---

### Yihuai Gao

**PhD (3rd year, EE Department)** · PhD student · World models & video generation for robots / memory

- **Email:** `yihuai@stanford.edu`
- **Open question:** Can a video generation model serve as the policy and the planner at once, and can a policy memorise in context?
- **Advising:** Shuran Song. Tsinghua dual BEng in EE and BS in Math; worked with Bowen Zhou and Heng Yang (Harvard); summer with Dirk Englund at MIT.
- **Hardware / platforms:** Mobile manipulators, legged platforms (UMI-on-Legs), TidyBot++
- **Status and signals:** THE NVIDIA CHANNEL and a cross-lab link: he is second author on Cosmos Policy with IRIS's Moo Jin Kim, Percy Liang and Shuran Song (ICLR 2026), and contributed to NVIDIA's Cosmos 3 omnimodal world model. In the EE department, which matters if you are an EE MS student.

**Startup relevance 6/10.** Six. Gated Memory Policy (first author, CoRL 2026) is in-context memorisation and adaptation, which is the thin memory thrust. But S3 drops to 1 and S4 to 1 because video-generation world models are exactly where NVIDIA, Physical Intelligence and World Labs are spending at a scale you cannot match - Cosmos Policy is an NVIDIA paper in substance.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **1** · Deployment proximity **1**

**Alignment & ease of entry 7/10.** Seven. A2 is 2 - video generation, gated memory and a Tsinghua EE-plus-Math training are signal processing and applied mathematics. A5 is 2 because he is a third-year in the EE department with two years left and an NVIDIA relationship. He is also the most useful person to ask how an academic robotics project gets NVIDIA compute, which is a practical question you will eventually face.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **1** · Reachable and still here **2**

**Papers.**

- **Gated Memory Policy: In-Context Memorization and Adaptation** — [arXiv 2604.18933](https://arxiv.org/abs/2604.18933)
  - *Authors:* Yihuai Gao, Jeff Jinyun Liu, Shuang Li, Shuran Song
  - *What it does, and why it matters to you:* A gated memory mechanism that lets a policy memorise and adapt in context, without weight updates. CoRL 2026.
  - *Abstract (verbatim):* Robotic manipulation tasks exhibit varying memory requirements, ranging from Markovian tasks that require no memory to non-Markovian tasks that demand in-context memorization of historical information within a single trial or in-context adaptation based on the outcomes of multiple past trials. Surprisingly, simply extending observation histories of a visuomotor policy often leads to a significant performance drop due to distribution shift and overfitting. To address these issues, we propose Gated Memory Policy (GMP), a visuomotor policy that learns both when to recall memory and what to recall. To learn when to recall memory, GMP employs a learned memory gate mechanism that selectively activates history context only when necessary, improving robustness and reactivity. To learn what to recall efficiently, GMP introduces a lightweight cross-attention module that constructs effective latent memory representations. To further enhance robustness, GMP injects diffusion noise into historical actions, mitigating sensitivity to noisy or inaccurate histories during both training and inference. On our proposed non-Markovian benchmark MemMimic, GMP achieves a 30.1% average success rate improvement over long-history baselines, while maintaining competitive performance on Markovian tasks in RoboMimic. All code, data and in-the-wild deployment instructions are available on our project website [this https URL](https://gated-memory-policy.github.io/).

- **Cosmos Policy: Fine-Tuning Video Models for Visuomotor Control and Planning** — [arXiv 2601.16163](https://arxiv.org/abs/2601.16163)
  - *Authors:* Moo Jin Kim, Yihuai Gao, Tsung-Yi Lin, Yen-Chen Lin, Yunhao Ge, Grace Lam, Percy Liang, Shuran Song, Ming-Yu Liu, Chelsea Finn, Jinwei Gu
  - *What it does, and why it matters to you:* Adapts NVIDIA's video diffusion model into a robot policy by encoding actions and values as latent frames. ICLR 2026. Notable as a CROSS-LAB paper: Moo Jin Kim from IRIS and Yihuai Gao from REALab are the first two authors, with Percy Liang and Shuran Song as seniors - and it is in substance an NVIDIA paper, which is why it scores badly on transferability.
  - *Abstract (verbatim):* Recent video generation models demonstrate remarkable ability to capture complex physical interactions and scene evolution over time. To leverage their spatiotemporal priors, robotics works have adapted video models for policy learning but introduce complexity by requiring multiple stages of post-training and new architectural components for action generation. In this work, we introduce Cosmos Policy, a simple approach for adapting a large pretrained video model (Cosmos-Predict2) into an effective robot policy through a single stage of post-training on the robot demonstration data collected on the target platform, with no architectural modifications. Cosmos Policy learns to directly generate robot actions encoded as latent frames within the video model's latent diffusion process, harnessing the model's pretrained priors and core learning algorithm to capture complex action distributions. Additionally, Cosmos Policy generates future state images and values (expected cumulative rewards), which are similarly encoded as latent frames, enabling test-time planning of action trajectories with higher likelihood of success. In our evaluations, Cosmos Policy achieves state-of-the-art performance on the LIBERO and RoboCasa simulation benchmarks (98.5% and 67.1% average success rates, respectively) and the highest average score in challenging real-world bimanual manipulation tasks, outperforming strong diffusion policies trained from scratch, video model-based policies, and state-of-the-art vision-language-action models fine-tuned on the same robot demonstrations. Furthermore, given policy rollout data, Cosmos Policy can learn from experience to refine its world model and value function and leverage model-based planning to achieve even higher success rates in challenging tasks. We release code, models, and training data at this https URL

- **Unified Video Action Model** — [arXiv 2503.00200](https://arxiv.org/abs/2503.00200)
  - *Authors:* Shuang Li, Yihuai Gao, Dorsa Sadigh, Shuran Song
  - *What it does, and why it matters to you:* One model that both generates video and produces actions, so prediction and control share a representation. RSS 2025.
  - *Abstract (verbatim):* A unified video and action model holds significant promise for robotics, where videos provide rich scene information for action prediction, and actions provide dynamics information for video prediction. However, effectively combining video generation and action prediction remains challenging, and current video generation-based methods struggle to match the performance of direct policy learning in action accuracy and inference speed. To bridge this gap, we introduce the Unified Video Action model (UVA), which jointly optimizes video and action predictions to achieve both high accuracy and efficient action inference. The key lies in learning a joint video-action latent representation and decoupling video-action decoding. The joint latent representation bridges the visual and action domains, effectively modeling the relationship between video and action sequences. Meanwhile, the decoupled decoding, powered by two lightweight diffusion heads, enables high-speed action inference by bypassing video generation during inference. Such a unified framework further enables versatile functionality through masked input training. By selectively masking actions or videos, a single model can tackle diverse tasks beyond policy learning, such as forward and inverse dynamics modeling and video generation. Via an extensive set of experiments, we demonstrate that UVA can serve as a general-purpose solution for a wide range of robotics tasks, such as policy learning, forward/inverse dynamics and video observation prediction, without compromising performance compared to methods tailored for specific applications. Results are best viewed on https://unified-video-action-model.github.io/.

---

### Maximilian Du

**PhD (3rd year)** · PhD student · Rapid adaptation & human-robot interaction

- **Email:** `maxjdu@stanford.edu`
- **Open question:** How do you give robots the ability to adapt quickly to changing environments and new skill demands?
- **Advising:** Shuran Song. STANFORD UNDERGRAD RESEARCH IN CHELSEA FINN'S IRIS LAB.
- **Hardware / platforms:** Diffusion policy platforms; real manipulation
- **Status and signals:** THE IRIS-TO-REALAB BRIDGE, and the single most useful person to answer the question you are actually asking. He did his undergraduate research in Finn's IRIS lab and then chose Song's REALab for his PhD. Knight-Hennessy Fellowship AND NSF GRFP. Third year, so two years left.

**Startup relevance 7/10.** Seven. DynaGuide (NeurIPS 2025, first author, two-author paper) steers diffusion policies with active dynamic guidance - steering a deployed policy at inference time rather than retraining it. S1 is 2 because rapid adaptation to changing environments is the deployment problem stated plainly. S3 is 1 because policy steering is contested.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 8/10.** Eight. A1 and A2 are both 2 - guidance inside a diffusion process is control and signal processing sitting inside policy learning. But the reason he should be near the top of your contact list is not the score. You are weighing IRIS against REALab. He has been in both, by choice, in that order. Nobody else in this document can answer that question from experience.

> RL / ML overlap **2** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **1** · Reachable and still here **2**

**Papers.**

- **DynaGuide: Steering Diffusion Polices with Active Dynamic Guidance** — [arXiv 2506.13922](https://arxiv.org/abs/2506.13922)
  - *Authors:* Maximilian Du, Shuran Song
  - *What it does, and why it matters to you:* Steers a diffusion policy at inference time using active guidance from a learned dynamics model, so you redirect behaviour without retraining. NeurIPS 2025.
  - *Abstract (verbatim):* Deploying large, complex policies in the real world requires the ability to steer them to fit the needs of a situation. Most common steering approaches, like goal-conditioning, require training the robot policy with a distribution of test-time objectives in mind. To overcome this limitation, we present DynaGuide, a steering method for diffusion policies using guidance from an external dynamics model during the diffusion denoising process. DynaGuide separates the dynamics model from the base policy, which gives it multiple advantages, including the ability to steer towards multiple objectives, enhance underrepresented base policy behaviors, and maintain robustness on low-quality objectives. The separate guidance signal also allows DynaGuide to work with off-the-shelf pretrained diffusion policies. We demonstrate the performance and features of DynaGuide against other steering approaches in a series of simulated and real experiments, showing an average steering success of 70% on a set of articulated CALVIN tasks and outperforming goal-conditioning by 5.4x when steered with low-quality objectives. We also successfully steer an off-the-shelf real robot policy to express preference for particular objects and even create novel behavior. Videos and more can be found on the project website: [this https URL](https://dynaguide.github.io)

---

### Jisang Park

**MSCS** · MS student · Data-efficient long-horizon bimanual mobile manipulation

- **Email:** `jisangp@stanford.edu`
- **Open question:** How do you get data-efficient, generalisable policy learning for long-horizon bimanual mobile manipulation?
- **Advising:** CO-ADVISED by Jeannette Bohg AND Shuran Song (IPRL + REAL). Directly mentored by Dian Wang; works closely with Xiaomeng Xu and Han Zhang.
- **Hardware / platforms:** Bimanual mobile manipulators
- **Status and signals:** READ THIS ONE CAREFULLY - HE IS YOU, ONE YEAR AHEAD. His own page states: he CO-FOUNDED THREE STARTUPS, has strategic consulting experience at McKinsey and BCG, majored in Business Administration and Computer Science, and says that background 'motivates my focus on translating robotics research into practical, impactful products.' Before Stanford he was 1.5+ years a Research Scientist at KAIST. He has been awarded TWO Graduate Research Assistantships with Jeannette Bohg and is second author on HoMMI (RSS 2026).

**Startup relevance 9/10.** Nine. Long-horizon bimanual mobile manipulation is the capability blocker, and data-efficiency is the cost line. But the score is almost beside the point here.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **1** · Deployment proximity **2**

**Alignment & ease of entry 7/10.** Seven on the rubric - and this is the clearest case in the entire document where you should ignore the number. He is an MS student in your target lab who has already co-founded three companies, came through McKinsey and BCG, and has explicitly organised his research around commercialising robotics. That is your exact profile and your exact stated goal, executed one year earlier, inside the lab you are evaluating. He has also converted an MS seat into two funded research assistantships and an RSS paper, which is the operational question you keep asking. If you send one email after reading this document, send it to him.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **HoMMI: Learning Whole-Body Mobile Manipulation from Human Demonstrations** — [arXiv 2603.03243](https://arxiv.org/abs/2603.03243)
  - *Authors:* Xiaomeng Xu, Jisang Park, Han Zhang, Eric Cousineau, Aditya Bhat, Jose Barreiros, Dian Wang, Jeannette Bohg, Shuran Song
  - *What it does, and why it matters to you:* Learns whole-body mobile manipulation from human demonstrations. RSS 2026. Three current REALab students are on the author list, which makes it a good map of who works with whom.
  - *Abstract (verbatim):* We present Whole-Body Mobile Manipulation Interface (HoMMI), a data collection and policy learning framework that learns whole-body mobile manipulation directly from robot-free human demonstrations. We augment UMI interfaces with egocentric sensing to capture the global context required for mobile manipulation, enabling portable, robot-free, and scalable data collection. However, naively incorporating egocentric sensing introduces a larger human-to-robot embodiment gap in both observation and action spaces, making policy transfer difficult. We explicitly bridge this gap with a cross-embodiment hand-eye policy design, including an embodiment agnostic visual representation; a relaxed head action representation; and a whole-body controller that realizes hand-eye trajectories through coordinated whole-body motion under robot-specific physical constraints. Together, these enable long-horizon mobile manipulation tasks requiring bimanual and whole-body coordination, navigation, and active perception.

- **Mixture of Frames Policy: Multi-Frame Action Denoising for Bimanual Mobile Manipulation** — [arXiv 2607.11884](https://arxiv.org/abs/2607.11884)
  - *Authors:* Dian Wang, Jisang Park, Xiaomeng Xu, Han Zhang, Shuran Song, Jeannette Bohg
  - *What it does, and why it matters to you:* Denoises actions over multiple frames for bimanual mobile manipulation. CoRL 2026. Three current REALab members are on it, which makes it a useful map of who actually collaborates with whom.
  - *Abstract (verbatim):* Robotic manipulation is inherently multi-frame: local actions may be simple in an end-effector frame, while transport, upright-object handling, and whole-body coordination are better represented in a base-aligned frame. However, modern diffusion-based visuomotor policies typically commit to a single predefined action frame, forcing one denoiser to model action distributions that are often unnecessarily complex in that frame. We propose Mixture of Frames Policy (MoF), a diffusion policy that performs synchronized action denoising across multiple coordinate frames. MoF maintains a single canonical diffusion state, re-expresses it in several task-relevant frames, applies frame-specialized denoisers, and fuses their noise predictions back in the canonical frame. To make this possible for intermediate noisy diffusion states, we introduce a column-based 6D rotation representation within an SE(3) action parameterization that supports exact, differentiable frame transformations without requiring noisy rotations to lie on the SO(3) manifold. Across nine simulated bimanual manipulation tasks, we show that the best action frame is task-dependent and that MoF improves over oracle frame selection and standard Mixture-of-Experts (MoE) baselines. We further evaluate MoF on two real-world bimanual mobile manipulation tasks, demonstrating that it outperforms all constituent single-frame baselines. Project homepage: this https URL

---

### Joshua Citron

**MS Computer Science (coterm)** · MS student · Teleoperation interfaces & force-sensing manipulation

- **Email:** `jcitron@stanford.edu`
- **Open question:** What does the interface between a human operator and a bimanual mobile robot need to look like?
- **Advising:** Shuran Song; also works in Mark Cutkosky's Biomimetics and Dexterous Manipulation Lab (BDML).
- **Hardware / platforms:** ModPack teleoperation hardware; multimodal force sensing rigs
- **Status and signals:** AN MS STUDENT WHO IS FIRST AUTHOR: ModPack (arXiv 2026) lists him first, ahead of Renee Zbizika, Zeyi Liu and Shuran Song. Also first-authored 'Gentle Object Retraction in Dense Clutter Using Multimodal Force Sensing and Imitation Learning' (RA-L, Nov 2025). Spans REALab and Cutkosky's BDML, so he holds two lab relationships from one MS seat.

**Startup relevance 9/10.** Nine. Force sensing for gentle retraction in dense clutter is the compliance blocker in its most commercially literal form - that is warehouse picking of fragile goods. S4 and S5 are 2 because ModPack is an extensible open interface, and teleoperation interfaces are what the teleop-fallback economics actually run on. S1 is held at 1 because teleoperation cost is well measured (hours times wage) rather than badly measured.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **2** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **2**

**Alignment & ease of entry 8/10.** Eight, and he is the REALab counterpart to IRIS's Armaan Abraham but with a stronger record: two first-author papers from an MS seat, one in RA-L. A2 is 2 on multimodal force sensing. He is direct evidence that an MS student here can lead work rather than assist it, and that you can hold both a REALab and a BDML relationship at once.

> RL / ML overlap **1** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **1** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **ModPack: An Extensible Teleoperation Interface for Bimanual Mobile Manipulation** — [arXiv 2607.19479](https://arxiv.org/abs/2607.19479)
  - *Authors:* Joshua Citron, Renee Zbizika, Zeyi Liu, Shuran Song
  - *What it does, and why it matters to you:* An extensible teleoperation interface for bimanual mobile robots, first-authored by an MS student. Interfaces are unglamorous and they are also where the operating cost of a deployed fleet actually accumulates.
  - *Abstract (verbatim):* Existing teleoperation systems are often tailored to specific robot hardware and task domains, limiting their scalability and adaptability. We present ModPack, a modular and extensible teleoperation system designed to support diverse robot embodiments and task requirements within a unified framework. At the core of ModPack is a self-contained wearable "backpack" that integrates onboard computation, power, communication, and data storage. Built on top of this shared interface, the system supports plug-and-play capability modules including joint-level teleoperation with haptic feedback, mobile manipulation, and active perception. Experiments across two distinct robot platforms and real-world mobile manipulation tasks demonstrate that ModPack provides a flexible and reusable framework for data collection and policy learning. To support future research, we open-source the complete hardware design and software stack. Project website: this https URL

---

### Renee Zbizika

**MS Computer Science (started April 2026; BS CS Stanford, June 2026)** · MS student · Learning dexterous everyday tasks from humans

- **Email:** `rzbizika@stanford.edu`
- **Open question:** How can robots learn from humans to perform dexterous, everyday tasks in the real world?
- **Advising:** Shuran Song. Previously SVL, working on brain-robot interfaces.
- **Hardware / platforms:** Teleoperation interfaces; egocentric human data collection
- **Status and signals:** Coterminal - BS in June 2026 straight into the MS. Second author on ModPack and a contributor to EgoVerse, a 30-plus-author multi-institution dataset effort. Prior work on brain-robot interfaces in SVL is an unusual background.

**Startup relevance 8/10.** Eight. Her contributions sit on the data and interface side - ModPack and EgoVerse - which is the cheap-data thesis rather than the compliance thesis, so S2 stays at 1. S4 and S5 are 2 because open interfaces and shared datasets are exactly the artifacts that travel out of a lab.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **2**

**Alignment & ease of entry 8/10.** Eight. A3 is 2 - interface and dataset work needs no privileged hardware, so it is startable immediately. A5 is 2 as a first-year MS student who has already earned second authorship. Practically she is a peer to talk to about how an MS student gets onto a large multi-institution effort like EgoVerse, which is a different and cheaper route to a publication than leading a project.

> RL / ML overlap **1** · Signal-processing / statistics overlap **1** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **ModPack: An Extensible Teleoperation Interface for Bimanual Mobile Manipulation** — [arXiv 2607.19479](https://arxiv.org/abs/2607.19479)
  - *Authors:* Joshua Citron, Renee Zbizika, Zeyi Liu, Shuran Song
  - *What it does, and why it matters to you:* An extensible teleoperation interface for bimanual mobile robots, first-authored by an MS student. Interfaces are unglamorous and they are also where the operating cost of a deployed fleet actually accumulates.
  - *Abstract (verbatim):* Existing teleoperation systems are often tailored to specific robot hardware and task domains, limiting their scalability and adaptability. We present ModPack, a modular and extensible teleoperation system designed to support diverse robot embodiments and task requirements within a unified framework. At the core of ModPack is a self-contained wearable "backpack" that integrates onboard computation, power, communication, and data storage. Built on top of this shared interface, the system supports plug-and-play capability modules including joint-level teleoperation with haptic feedback, mobile manipulation, and active perception. Experiments across two distinct robot platforms and real-world mobile manipulation tasks demonstrate that ModPack provides a flexible and reusable framework for data collection and policy learning. To support future research, we open-source the complete hardware design and software stack. Project website: this https URL

- **EgoVerse: An Egocentric Human Dataset for Robot Learning from Around the World** — [arXiv 2604.07607](https://arxiv.org/abs/2604.07607)
  - *Authors:* Ryan Punamiya, Simar Kareer, Zeyi Liu, Josh Citron, Ri-Zhao Qiu, Xiongyi Cai, Alexey Gavryushin, Jiaqi Chen, Davide Liconti, Lawrence Y. Zhu, Patcharapong Aphiwetsa, Baoyu Li, Aniketh Cheluva, Pranav Kuppili, Yangcen Liu, Dhruv Patel, Aidan Gao, Hye-Young Chung, Ryan Co, Renee Zbizika, Jeff Liu, Xiaomeng Xu, Haoyu Xiong, Geng Chen, Sebastiano Oliani, Wenkai Xuan, Chenyu Yang, Xi Wang, James Fort, Richard Newcombe, Josh Gao, Jason Chong, Garrett Matsuda, Aseem Doriwala, Marc Pollefeys, Robert Katzschmann, Xiaolong Wang, Shuran Song, Judy Hoffman, Danfei Xu
  - *What it does, and why it matters to you:* A large egocentric human dataset for robot learning gathered from around the world, with a thirty-plus-author multi-institution author list. RSS 2026. Worth noting as a route to authorship that does not require leading a project.
  - *Abstract (verbatim):* Robot learning increasingly depends on large and diverse data, yet robot data collection remains expensive and difficult to scale. Egocentric human data offer a promising alternative by capturing rich manipulation behavior across everyday environments. However, existing human datasets are often limited in scope, difficult to extend, and fragmented across institutions. We introduce EgoVerse, a collaborative platform for human data-driven robot learning that unifies data collection, processing, and access under a shared framework, enabling contributions from individual researchers, academic labs, and industry partners. The current release includes 1,362 hours (80k episodes) of human demonstrations spanning 1,965 tasks, 240 scenes, and 2,087 unique demonstrators, with standardized formats, manipulation-relevant annotations, and tooling for downstream learning. Beyond the dataset, we conduct a large-scale study of human-to-robot transfer with experiments replicated across multiple labs, tasks, and robot embodiments under shared protocols. We find that policy performance generally improves with increased human data, but that effective scaling depends on alignment between human data and robot learning objectives. Together, the dataset, platform, and study establish a foundation for reproducible progress in human data-driven robot learning.

---

### Sophia Huang

**MS Electrical Engineering** · MS student · Perception, LiDAR, SLAM & robot integration

- **Email:** `sophiacc@stanford.edu`
- **Open question:** Stated interests: robotics, perception and 3D scene understanding; LiDAR, SLAM and sensor systems; embedded systems and robot integration.
- **Advising:** Research Assistant at REALab (Shuran Song). CMU BS in Electrical and Computer Engineering and Robotics, advised by Sebastian Scherer at AirLab.
- **Hardware / platforms:** LiDAR, point-cloud sensing, embedded robot integration
- **Status and signals:** THE CLOSEST BACKGROUND MATCH TO YOU IN EITHER LAB. She is an MS student in ELECTRICAL ENGINEERING doing signal-processing-flavoured robotics: real-time 3D LiDAR perception at Google, and 4D LiDAR and point-cloud perception at SiLC Technologies. No REALab paper yet, so her thrust is still open.

**Startup relevance 6/10.** Six, and low confidence - she has no published REALab work yet, so this scores the stated area rather than an output. Perception and SLAM are mature fields with well-funded incumbents, which caps S3.

> Buyer already spending badly **1** · Attacks a verified capability ceiling **1** · Incumbent whitespace **1** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 8/10.** Eight. A1 is 0 because there is no RL here at all, and A2 is 2 because LiDAR, point clouds, SLAM and sensor systems ARE signal processing without translation. She is the single best peer in either lab for the specific question of what an EE master's student with a signals background actually does inside a robot-learning lab, and she has industry perception experience at two companies on top of it.

> RL / ML overlap **0** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

---

### Jack Goler

**Undergraduate (Mathematics and EE/CS)** · Undergraduate · Cheap-data manipulation & cross-embodiment transfer

- **Email:** `jgoler@stanford.edu`
- **Open question:** How do robots acquire manipulation skills from data that is cheap to collect - human demonstrations, handheld grippers, self-supervised interaction - and how do those skills transfer across embodiments?
- **Advising:** Shuran Song. Previously Stanford's Navigation and Autonomous Vehicles Lab.
- **Hardware / platforms:** UMI-Aquatic handheld gripper; previously NeRF and Gaussian-splat digital twins from drone imagery
- **Status and signals:** APPLYING TO PHD PROGRAMS THIS FALL, so he may leave. Third author on UMI-Underwater (RSS 2026).

**Startup relevance 9/10.** Nine. His stated research question is the cheap-data thesis stated as cleanly as anyone in either lab states it, and S1 is 2 because data acquisition cost is the largest controllable line item in robot learning. S4 and S5 are 2 because handheld grippers and self-supervised interaction are cheap by construction.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **2**

**Alignment & ease of entry 7/10.** Seven. A2 is 2 because NeRFs and Gaussian splats trained on drone imagery is 3D signal reconstruction, which connects directly to your reconstruction work. A5 is 1 because he is applying out to PhD programmes this fall. An undergraduate worth talking to for his framing of the cheap-data question, not for a multi-year collaboration.

> RL / ML overlap **0** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **1**

**Papers.**

- **UMI-Underwater** — no arXiv record exists; the lab publishes it only as a project page or a PDF, so there is no canonical abstract to quote. Left blank rather than paraphrased.

---

### Ryan Zhang

**Undergraduate (Mathematics and CS), Class of 2028** · Undergraduate · Affordance-guided policies & embodiment-agnostic data

- **Email:** `ryanzhang@stanford.edu`
- **Open question:** Affordance-guided visuomotor policy learning and embodiment-agnostic robot data - building autonomous systems that interact with environments in more versatile ways.
- **Advising:** Shuran Song. Previously César Terrer at MIT; Laurel Symes and Holger Klinck at the Cornell Lab of Ornithology.
- **Hardware / platforms:** UMI-Aquatic handheld gripper
- **Status and signals:** Class of 2028, so present for years. Regeneron STS Scholar. Fourth author on UMI-Underwater (RSS 2026) as an undergraduate. His prior work was BIOACOUSTIC SOURCE SEPARATION at the Cornell Lab of Ornithology.

**Startup relevance 8/10.** Eight. Embodiment-agnostic robot data is the cheap-data thesis again; affordance guidance is a capability-adjacent rather than capability-blocking contribution, so S2 stays at 1.

> Buyer already spending badly **2** · Attacks a verified capability ceiling **1** · Incumbent whitespace **2** · Transferability out of the lab **2** · Deployment proximity **1**

**Alignment & ease of entry 8/10.** Eight. A2 is 2 and it is the most literal match to your background anywhere in this document: bioacoustic SOURCE SEPARATION is textbook signal processing, and he moved from there into robot learning. Between him and Rohan Bhowmik at IRIS you have two worked examples of exactly the translation you are attempting - from signals into embodied AI - and both are currently undergraduates, which makes them cheap to approach.

> RL / ML overlap **0** · Signal-processing / statistics overlap **2** · Hardware barrier (inverted) **2** · Room beside them **2** · Reachable and still here **2**

**Papers.**

- **UMI-Underwater** — no arXiv record exists; the lab publishes it only as a project page or a PDF, so there is no canonical abstract to quote. Left blank rather than paraphrased.

---

### Calvin Luo

**Visiting student** · Visiting student · Unknown

- **Email:** *not published anywhere I could fetch. Reported blank rather than guessed — a constructed address is worse than no address.*
- **Open question:** NOT VERIFIED. His page (calvinyluo.com) failed to fetch - the server presented an SSL certificate that could not be validated from this machine, so I could not read it. I am not going to characterise his research from secondary inference.
- **Advising:** UNVERIFIED
- **Hardware / platforms:** Unknown
- **Status and signals:** Listed as the lab's only visiting student. Everything else UNVERIFIED.

**Not scored.** NOT SCORED - the source page could not be retrieved, and visiting status means a short window regardless.

## The two labs are not the same kind of place

| | IRIS | REALab |
|---|---|---|
| Members (excl. PI) | 32 | 19 |
| Mean startup relevance | 5.8 | 8.5 |
| Mean alignment | 6.8 | 7.5 |
| Non-robotics PhD students | 4 of 12 work entirely on language models with no robot | 0 |
| Policy-vendor conflict | **Yes** — Finn co-founded Physical Intelligence; Lucy Shi is a core PI member, Torne was there 9 months, Swerdlow interned, Sridhar's MemER is built on pi-0.5 | **No** — channels are NVIDIA, Amazon FAR, Boston Dynamics, Meta, 1X, Anthropic |
| Emails published | Almost none | 18 of 19 |
| Route in | A form on the contact page | Member emails are public |
| Artifacts that escaped | OpenVLA, OpenVLA-OFT | Diffusion Policy, Universal Manipulation Interface — both became field defaults, then became Sunday Robotics |

**Read the score gap carefully, because part of it is my rubric.** REALab scores higher on startup relevance largely because two of the five components reward work on contact-rich manipulation and cheap data, which is all REALab does, while IRIS's language-model work scores zero on both by construction. That is a real difference in what the two labs work on, not a hidden quality judgement — but if you decide language-model research is the better career bet, then the rubric is measuring the wrong thing and you should ignore the column.

**The PI entanglement runs deeper than the roster suggests.** Checking author lists rather than stated affiliations: MEM (Marcel Torne) carries nine Physical Intelligence-affiliated co-authors, Hi Robot (Lucy Shi) carries seven, and OpenVLA four. So the memory and long-horizon thrust - the one that otherwise looks like the most attractive thin thrust - is itself partly a PI collaboration. The exception matters: **Freeform Preference Learning**, the single most thesis-adjacent paper in IRIS, is Torne plus two MS students plus Finn, with no PI people at all. If you want the thin thrust without the conflict, it is that paper, not MEM.

**Thin thrusts worth knowing.** In IRIS: memory and long-horizon control has only Marcel Torne, Ajay Sridhar and one undergraduate, and the three papers genuinely disagree about the answer (architectural context vs training objective vs retrieval). Human preference learning is Torne plus two MS students. Evaluation and verification looks healthy on the publications page but IRIS members are middle authors on most of it, and the only person who owns any — Yuejiang Liu — leaves for NUS in 2027. Robustness and distribution shift emptied when Yoonho Lee pivoted to language models.

---

## Alumni traced to companies

69 alumni, 12 confirmed founders. The founder-versus-early-employee distinction is enforced strictly.

| Person | Lab | Outcome | Company | Money |
|---|---|---|---|---|
| **Alexander ('Sasha') Khazatsky** | IRIS | FOUNDER | CollectedAI | UNVERIFIED / undisclosed. Nothing in Crunchbase, TechCrunch or the 2026 robotics funding roundups. Treat as stealth or unannounced. |
| **Behzad Haghgoo** | IRIS | FOUNDER | Tym, Inc. (exited) | Acquired by Roblox around July 2022. Price, investors and funding all UNVERIFIED. |
| **David (Dewei) Yuan** | IRIS | FOUNDER | IntBot Inc. | CONTRADICTORY, treat as UNVERIFIED: VCBacked lists a $3.5M seed dated 31 Mar 2025; Tracxn's Aug 2026 profile lists IntBot as unfunded. No valuation an |
| **Frederik Ebert** | IRIS | FOUNDER | Emancro | $3.5M seed, September 2023 (AIX Ventures and Khosla Ventures named). No valuation disclosed. No round since - UNVERIFIED whether they have raised agai |
| **Govind Chada** | IRIS | FOUNDER | Enact (YC Summer 2026) | YC standard deal only; no priced round disclosed. Founded 2026, San Francisco, team of 2. |
| **Rehaan Ahmad** | IRIS | FOUNDER | alphaXiv | $7M seed announced ~19-20 Nov 2025, co-led by Menlo Ventures and Haystack, with Shakti VC, Conviction Embed and Upfront. Angels include Eric Schmidt,  |
| **Sergio Charles** | IRIS | FOUNDER | Thesis (YC Fall 2025) | YC Fall 2025 deal; no priced round found. Team of 3, San Francisco. |
| **Tony Z. Zhao** | IRIS | FOUNDER | Sunday Robotics | $35M Series A (Benchmark + Conviction, Nov 2025); $165M Series B led by Coatue announced 2026-03-12 at $1.15B post-money. Tiger Global, Bain Capital V |
| **Cheng Chi** | REALab | FOUNDER | Sunday Robotics | As above: $1.15B post-money, March 2026. |
| **Neil Nie** | REALab | FOUNDER | Verne Robotics (YC Summer 2025) | ~$500K pre-seed per Crunchbase, across 11 investors including 468 Capital, Crucible Capital, Formosa Capital, J20 Ventures and Multimodal Ventures. No |
| **Nicolas Ouporov** | REALab | FOUNDER | Fleet AI | ~$15M seed (Sequoia, Menlo Ventures, SV Angel) at sub-$100M. Series A reported at ~$45-50M on a ~$725-750M valuation as of April 2026, though sources  |
| **Zhenjia Xu** | REALab | FOUNDER-PARTIAL | Genesis AI | $105M seed, July 2025 (Eclipse and Khosla). A reported ~$500M round at ~$3B is UNVERIFIED and appears to be rumour. |
| Charles Lin | IRIS | EARLY STARTUP | Medra | $63M total, including a $52M round led by Human Capital that closed weeks after they left stealth. |
| Jenny Pan | IRIS | EARLY STARTUP | Physical Intelligence | — |
| Karl Pertsch | IRIS | EARLY STARTUP | Physical Intelligence | PI: $70M seed 2024, then $600M at $5.6B led by Google CapitalG Nov 2025. Bloomberg reported talks at ~$11B in March 2026 (not confirmed closed). |
| Moritz Stephan | IRIS | EARLY STARTUP | Cognition | Not captured. |
| Olivia Lee | IRIS | LATE-STAGE STARTUP | Figure | Figure was reported at $39B in your earlier capital map. |
| Rafael Rafailov | IRIS | EARLY STARTUP | Thinking Machines Lab | TML was founded Feb 2025; he joined ~Mar 2025, MONTHS BEFORE the $2B seed closed in July 2025 at a $12B valuation (a16z-led, with Nvidia, Accel, Servi |
| Suraj Nair | IRIS | EARLY STARTUP | Physical Intelligence | See Physical Intelligence above. |
| Takao Yatagai | IRIS | LATE-STAGE STARTUP | Crusoe | Founded 2018, late-stage. |
| Alper Canberk | REALab | EARLY STARTUP | Sunday Robotics | Joined pre-launch / in stealth. |
| Ben Pekarek | REALab | EARLY STARTUP | Generalist AI | Generalist: founded 2024 by Pete Florence, Andy Zeng and Andrew Barry; raised $400M at $2B in June 2026, extended to ~$600M at $3B by Aug 2026. |
| Dominik Bauer | REALab | EARLY STARTUP | Latitude AI | Corporate-backed AV company - a weak startup signal. |
| Hojung Choi | REALab | EARLY STARTUP | Sunday Robotics | Joined post-Series-A, at roughly the 30-70 person stage. |
| Shreeya Jain | REALab | EARLY STARTUP | Anyware Robotics | Not captured. |
| Shuang Li | REALab | EARLY STARTUP (exited) | Voyage AI, acquired by MongoDB | Acquired by MongoDB. |
| Yiqing Liang | REALab | EARLY STARTUP | Luma AI | Growth stage. |
| Ahmed Ahmed | IRIS | ACADEMIA + ADVISOR | Stanford; part-time advisor to alphaXiv and MLCommons | — |
| Ali Ghadirzadeh | IRIS | BIG TECH | Embark Studios (Nexon subsidiary) | — |
| Allan Zhou | IRIS | BIG TECH | OpenAI | — |
| Andy Tang | IRIS | UNVERIFIED | Mind Robotics (claimed by the lab page only) | Mind Robotics: $115M seed (Eclipse, late 2025), $500M Series A (Accel + a16z, Mar 2026), $400M more (Kleiner Perkins, May 2026) - over $1B total. |
| Annie S. Chen | IRIS | BIG TECH | Google DeepMind | — |
| Annie Xie | IRIS | BIG TECH | Google DeepMind | — |
| Archit Sharma | IRIS | BIG TECH | Google DeepMind | — |
| Eric Mitchell | IRIS | LATE-STAGE LAB | OpenAI | OpenAI was valued ~$86B when he joined in July 2024, rising to $157B that October. |
| Evan Z. Liu | IRIS | BIG TECH | Google DeepMind | — |
| Henrik Marklund | IRIS | ACADEMIA | Stanford | — |
| Huaxiu Yao | IRIS | ACADEMIA | UNC Chapel Hill | — |
| Kaien Yang | IRIS | BIG TECH | Citadel | — |
| Kaylee Burns | IRIS | BIG TECH | Waymo | — |
| Kyle Hsu | IRIS | BIG TECH | Tesla Optimus | — |
| Lisa Lee | IRIS | BIG TECH | Google DeepMind | — |
| Max Sobol Mark | IRIS | ACADEMIA | Carnegie Mellon | — |
| Nikhil Sardana | IRIS | BIG TECH | Databricks Mosaic Research | — |
| Qi Wu | IRIS | ACADEMIA | Cornell | — |
| Sheryl Hsu | IRIS | BIG TECH | OpenAI | — |
| Tianhe Yu | IRIS | BIG TECH | Meta Superintelligence Labs | — |
| Tom Knowles | IRIS | BIG TECH | Google DeepMind | — |
| Victor Kolev | IRIS | UNKNOWN | — | — |
| Will Dorrell | IRIS | ACADEMIA | Kempner Institute, Harvard | — |
| Yanjiang Guo | IRIS | ACADEMIA | Tsinghua University | — |
| Zipeng Fu | IRIS | ACADEMIA - DEPARTURE IMMINENT | — | — |
| Arpit Bahety | REALab | ACADEMIA | UT Austin | — |
| Dian Wang | REALab | ACADEMIA | University of Macau | — |
| Haochen Shi | REALab | UNKNOWN - POSSIBLY STEALTH | — | — |
| Haoyu Xiong | REALab | ACADEMIA | MIT EECS | — |
| Huy Ha | REALab | BIG TECH | Anthropic | — |
| Jingxi ('James') Xu | REALab | BIG TECH | Ant Group | — |
| John So | REALab | BIG TECH | Tesla Optimus | — |
| Mandi Zhao | REALab | BIG TECH | Meta Robotics Studio | — |
| Matthew Retchin | REALab | ACADEMIA | Harvard SEAS | — |
| Mengda Xu | REALab | BIG TECH | NVIDIA GEAR | — |
| Samir Gadre | REALab | BIG TECH | Anthropic | — |
| Shreeyak Sajjan / Nathalie Hager / Beichun Qi / Daniel Molinuevo / Francesc Marti Escofet | REALab | UNKNOWN | — | — |
| Yifan Hou | REALab | ACADEMIA (incoming) | UT Austin | — |
| Yinsen Jia | REALab | ACADEMIA | Duke ECE | — |
| Yulong Li | REALab | ACADEMIA | MIT EECS | — |
| Zhanpeng He | REALab | ACADEMIA | Stanford | — |
| Zixi (Claire) Wang | REALab | BIG TECH | XPENG Robotics | — |

### The founders in full

#### Alexander ('Sasha') Khazatsky — CollectedAI, Co-founder & CTO

*IRIS · PhD (Finn), Stanford 2021-2024; DROID lead author*

- **What it does:** Infrastructure for large-scale human and robot data collection for embodied AI - in effect the commercialisation of DROID. The company site describes the team as coming from 'the team that built DROID.'
- **Money:** UNVERIFIED / undisclosed. Nothing in Crunchbase, TechCrunch or the 2026 robotics funding roundups. Treat as stealth or unannounced.
- **Notes:** Triple-sourced on the title (his LinkedIn, the IRIS alumni page's 'Cofounder of a startup', and Chang Xu's 2026 robotics radar). CEO is Maxwell Nusbaum. Founding year UNVERIFIED, likely 2024-25. Whether he completed the PhD is UNVERIFIED - LinkedIn shows Stanford 2021-2024, one source still calls him a PhD candidate.
- **Source:** linkedin.com/in/alexander-khazatsky-b98841149; collected-ai.com

#### Behzad Haghgoo — Tym, Inc. (exited), Co-founder & CEO, ~Sept 2021

*IRIS · Undergraduate alum (BS + MS CS)*

- **What it does:** UNVERIFIED - no product description could be sourced.
- **Money:** Acquired by Roblox around July 2022. Price, investors and funding all UNVERIFIED.
- **Notes:** After the acquisition he was a Product Manager and then worked on AI at Roblox. His LinkedIn headline now reads 'Prev. AI @ Roblox, Founder @ Tym'; his X bio says he is 'building something new' - current venture unnamed and UNVERIFIED. Two false leads to avoid: tymstrategy.com is a different company, and Hamul Inc. (the $19.3M Roblox acquisition that surfaces in searches) is not Tym.
- **Source:** linkedin.com/in/behzadhaghgoo; corp.wiki

#### David (Dewei) Yuan — IntBot Inc., Co-founder

*IRIS · Undergraduate alum*

- **What it does:** Socially intelligent humanoid robots for public spaces - airports, hotels, retail, events.
- **Money:** CONTRADICTORY, treat as UNVERIFIED: VCBacked lists a $3.5M seed dated 31 Mar 2025; Tracxn's Aug 2026 profile lists IntBot as unfunded. No valuation anywhere.
- **Notes:** Founded 2024 with Lei Yang, San Jose / Sunnyvale. Real deployments though: in March 2026 San Jose Mineta International Airport put an IntBot humanoid named 'Jose' into Terminal B for multilingual passenger assistance in 50+ languages, and in May 2026 they announced a partnership with Certis Group to scale in Singapore.
- **Source:** councils.forbes.com profile; linkedin.com/in/dewei-yuan; tracxn.com/d/companies/intbot

#### Frederik Ebert — Emancro, Founder & CEO

*IRIS · UC Berkeley PhD May 2022, CO-ADVISED by Sergey Levine and Chelsea Finn at BAIR - not a Stanford PhD*

- **What it does:** EASO, an AI-powered mobile manipulator for hospital logistics - restocking medication cabinets and assembling medication trays. Piloting with US hospitals.
- **Money:** $3.5M seed, September 2023 (AIX Ventures and Khosla Ventures named). No valuation disclosed. No round since - UNVERIFIED whether they have raised again. Tracxn lists 2 employees as of May 2026.
- **Notes:** His own site: 'After graduating, I founded Emancro, where I led the development of learning-based robotic systems in real-world hospital settings.' Worth reading as a base rate: a genuine founder from this lineage, three years in, still at seed scale with a 2-3 person team. The contrast with Sunday Robotics' $1.15B in 15 months is the actual distribution of outcomes.
- **Source:** febert.github.io; emancro.ai/about; aVenture; Tracxn

#### Govind Chada — Enact (YC Summer 2026), Founder / CTO

*IRIS · Undergraduate alum*

- **What it does:** 'The post-training layer for robotics.' Deploys policies on physical robots, FINDS FAILURE STATES, recreates them, collects recovery demonstrations, and retrains. Their own numbers: 99/100 rollouts with 200 expert plus 50 recovery demos, against 90/100 baseline.
- **Money:** YC standard deal only; no priced round disclosed. Founded 2026, San Francisco, team of 2.
- **Notes:** READ THIS ONE TWICE. Of every company in this alumni set, Enact is the closest to the thesis you have been developing - the failure-state-and-recovery layer for deployed policies. An IRIS undergraduate alumnus is already building it, with YC behind him, as of the Summer 2026 batch. The YC page explicitly credits Chada's robotics research in Chelsea Finn's IRIS Lab plus Meta Reality Labs. Co-founder James Stevens is CEO. This is simultaneously the strongest validation that the problem is real and the clearest evidence that you are not early.
- **Source:** ycombinator.com/companies/enact

#### Rehaan Ahmad — alphaXiv, Co-founder

*IRIS · Undergraduate alum*

- **What it does:** A platform unifying AI papers, benchmarks and implementations.
- **Money:** $7M seed announced ~19-20 Nov 2025, co-led by Menlo Ventures and Haystack, with Shakti VC, Conviction Embed and Upfront. Angels include Eric Schmidt, Sebastian Thrun, Sara Hooker and Gokul Rajaram. Valuation not disclosed.
- **Notes:** Founded 2024 with Raj Palleti, Daniel Kim and Lino Le Van. CORRECTION worth carrying: alphaXiv is NOT a Y Combinator company - it was a Brown Institute for Media Innovation Magic Grant recipient. Separately, IRIS MS alum Ahmed Ahmed is a PART-TIME ADVISOR to alphaXiv, not a founder.
- **Source:** PR Newswire; brown.columbia.edu; shaktivc.com/founders/alphaxiv

#### Sergio Charles — Thesis (YC Fall 2025), Founder / CEO

*IRIS · Undergraduate alum (BS Math + CS, MS Statistics)*

- **What it does:** PIVOTED. The YC page now describes Darwin, a humanoid robot for the home that learns from real-world experience, with first deployments targeted early 2027. Earlier 2025-26 coverage described Thesis as autonomous AI research - a 'scientific discovery engine' claiming state of the art on OpenAI's MLE-Bench within a month on roughly $10k of compute.
- **Money:** YC Fall 2025 deal; no priced round found. Team of 3, San Francisco.
- **Notes:** Co-founder is his brother Luigi Charles. YC partner Tom Blomfield. The pivot from AI research agents into home humanoids inside a year is itself a useful datapoint about where founders currently think the value is.
- **Source:** ycombinator.com/companies/thesis; Crunchbase

#### Tony Z. Zhao — Sunday Robotics, Co-founder & CEO

*IRIS · PhD student (Finn) - DROPPED OUT 2024 in 3rd year*

- **What it does:** Memo, an autonomous home robot for real chores (laundry, clearing tables). Trained via 'Memory Developers' wearing a Skill Capture Glove rather than in-home teleoperation. 70+ staff, Mountain View.
- **Money:** $35M Series A (Benchmark + Conviction, Nov 2025); $165M Series B led by Coatue announced 2026-03-12 at $1.15B post-money. Tiger Global, Bain Capital Ventures, Fidelity, Benchmark, Conviction also in. Angels include Dylan Field, Kevin Weil, Carl Pei.
- **Notes:** Author of ALOHA and ACT. His own site: 'I'm the co-founder and CEO of Sunday Robotics. I previously worked on ALOHA and ACT at Stanford before dropping out.' His own quote on the raise: 'We raised $165M at a $1.15B valuation to stop doing demos.' ACT-2 unveiled July 2026 claiming >99% laundry-folding success in unseen homes. Unicorn roughly 15 months from founding.
- **Source:** tonyzhaozh.github.io; TechCrunch 2026-03-12

#### Cheng Chi — Sunday Robotics, Co-founder & CTO

*REALab · Columbia PhD (Song)*

- **What it does:** Same company as Tony Zhao - see above. He is the CTO half.
- **Money:** As above: $1.15B post-money, March 2026.
- **Notes:** THE SINGLE MOST STRIKING FACT IN THIS WHOLE ALUMNI ANALYSIS: Sunday Robotics' two co-founders are one from each lab. Tony Zhao (IRIS) is CEO, Cheng Chi (REALab) is CTO. Chi is the author of DIFFUSION POLICY and the UNIVERSAL MANIPULATION INTERFACE - two of the most-used artifacts in modern robot learning. Founded late 2024 while prototyping in Chi's apartment; out of stealth November 2025. Hojung Choi, a Song postdoc, is a second REALab person there.
- **Source:** cheng-chi.github.io; sunday.ai/company; GlobeNewswire 2026-03-12

#### Neil Nie — Verne Robotics (YC Summer 2025), Co-founder & CEO

*REALab · Columbia BS CS 2023 (Song, CAIR), then Stanford MS CS*

- **What it does:** Bimanual robot arms (Nemo3) paired with a manipulation model - their claim is 'allowing our arms to learn new skills in hours instead of weeks.'
- **Money:** ~$500K pre-seed per Crunchbase, across 11 investors including 468 Capital, Crucible Capital, Formosa Capital, J20 Ventures and Multimodal Ventures. No valuation public. Founded 2025, San Francisco, team of 7.
- **Notes:** Co-founder Aditya Jha is CPO. Holds two patents on multi-modal perception from Apple (Vision Pro). His Stanford MS was with Jiajun Wu in SVL. His personal site was DNS-unresolvable during this research, so the education detail rests on secondary sources.
- **Source:** ycombinator.com/companies/verne-robotics; linkedin.com/in/neilnie; Crunchbase

#### Nicolas Ouporov — Fleet AI, Founder & CEO

*REALab · Columbia undergrad and Stanford REAL affiliate; co-author on ContactHandover (IROS 2024) with Zeyi Liu and Song*

- **What it does:** NOT ROBOTICS. High-fidelity reinforcement-learning environments replicating enterprise software (Salesforce, Excel, browser and desktop workflows) for frontier labs training computer-use agents.
- **Money:** ~$15M seed (Sequoia, Menlo Ventures, SV Angel) at sub-$100M. Series A reported at ~$45-50M on a ~$725-750M valuation as of April 2026, though sources conflict on whether it closed. Revenue reportedly went from $1M to ~$60M+ annualised run rate.
- **Notes:** Founded 2024. Previously founding engineer and first hire at Respell (acquired by Salesforce, Jan 2024). Interesting as a counter-example: a person with a robotics research background who built the fastest-growing company in this set by leaving robotics and selling RL environments to the labs instead.
- **Source:** nicolas.info; Crunchbase; rl-list.com/vendors/fleet-ai; Sacra

#### Zhenjia Xu — Genesis AI, Co-founder (per his own site) - but see caveat

*REALab · Columbia PhD 2024 (Song); Diffusion Policy co-creator; ex-lead of NVIDIA GEAR's real-robot system*

- **What it does:** Robotics foundation models.
- **Money:** $105M seed, July 2025 (Eclipse and Khosla). A reported ~$500M round at ~$3B is UNVERIFIED and appears to be rumour.
- **Notes:** CAVEAT WORTH CARRYING: his own site says 'co-founder', which clears the primary-source bar, but Eclipse's own portfolio page names only Zhou Xian and Theophile Gervet, and his LinkedIn headline reads 'Member of Technical Staff.' The honest reading is a non-principal member of a broader founding team. Do not describe him as a principal founder.
- **Source:** zhenjiaxu.com

### What the distribution actually says

**Founding is the exception, not the path.** The dominant IRIS PhD outcome is frontier-lab research staff — OpenAI, Google DeepMind, Thinking Machines, Meta — and three of those four are on post-training specifically, because the DPO lineage pushed the whole cohort there. The dominant REALab outcome is robotics research at NVIDIA, Tesla, Meta and Anthropic. If your objective is to found a company, neither lab's modal outcome gets you there, and the founders mostly **left early**: Tony Zhao dropped out in his third year, Khazatsky's LinkedIn shows Stanford ending in 2024, and Govind Chada and Sergio Charles founded as undergraduate alumni.

**The range of outcomes is enormous.** Sunday Robotics reached $1.15B in about fifteen months. Emancro, founded by Frederik Ebert in 2022 out of the same Finn lineage, is still at a $3.5M seed with two to three employees three years later. Both are real founders. Treat the Sunday number as the tail, not the expectation.

### Four false founder claims, caught and killed

These are recorded rather than quietly dropped, because repeating any of them in a conversation with someone in the field would cost you credibility.

1. **Huaxiu Yao did not co-found Ricursive Intelligence.** Its co-founders are Anna Goldie (CEO) and Azalia Mirhoseini (CTO), the ex-Google Brain AlphaChip pair. Yao appears nowhere on ricursive.com and has no company affiliation at all. A search snippet also wrongly attached a TIME100 AI listing to him; that belongs to Goldie and Mirhoseini.
2. **Moo Jin Kim is not co-founder and CTO of CollectedAI.** A dedicated confirmation search returned zero corroborating hits and neither his site nor his profile mentions any company. The claim was a hallucinated search summary.
3. **Suraj Nair is not a Physical Intelligence co-founder.** His GRASP seminar bio calls him a "founding researcher", which is an early-employee designation. PI's seven named co-founders are Karol Hausman, Sergey Levine, Chelsea Finn, Brian Ichter, Lachy Groom, Adnan Esmail and Quan Vuong.
4. **J. Kenneth Salisbury did not found Intuitive Surgical.** He was its "Fellow and Scientific Advisor, 1997-2003". On SensAble, Stanford's own page says it was "founded based on his research" by his MIT student Thomas Massie; MIT's Lemelson page credits only Massie, so co-founder status is unverified. As far as primary sources show he has never personally founded and run a company.

Two more worth carrying: **Zhenjia Xu** says "co-founder" of Genesis AI on his own site, which clears the primary-source bar, but Eclipse's portfolio page names only Zhou Xian and Theophile Gervet and his LinkedIn says "Member of Technical Staff" — so he is a non-principal member of a broader founding team, not a principal founder. And **Andy Tang** is listed at Mind Robotics by the IRIS page alone, while his own LinkedIn still reads "Embodied Agents @ Stanford" — do not rely on it.

**The IRIS people page is stale in at least four places:** Evan Z. Liu is at Google DeepMind, not Generally Intelligent; Allan Zhou is at OpenAI, not GDM; Tom Knowles is at GDM, not Aurora; and Suraj Nair left TRI two to three years ago. Treat it as a lead list, not a source.

---

## Stanford faculty worth talking to

37 records. CS and EE are covered exhaustively; Aero/Astro, Mechanical Engineering and the rest are included and labelled, because a great deal of Stanford robotics — including the people who match your thesis best — sits outside CS and EE. **Work fit** scores physical-AI and thesis relevance; **startup experience** scores founding, boards, advisory and student pipelines.

**The single most useful pattern here: the two scores are close to anti-correlated.** The people whose research matches your thesis have founded nothing and advise nobody, which is exactly why they have no conflicts and large advising capacity. The people with real commercial experience work on something else, or are not faculty. You will need both, from different people, and neither group will give you the other thing.

### Validation, safety & certification

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Marco Pavone** | Associate Professor - ON PARTIAL LEAVE, Aeronautics & Astronautics | 9 | 3 | AA 174A / AA 274A / CS 237A Principles of Robot Autonomy |
| **Mykel Kochenderfer** | Associate Professor, Aeronautics & Astronautics | 8 | 1 | AA 228 / CS 238 Decision Making under Uncertainty; AA 22 |
| **Thomas Berrueta** | INCOMING Assistant Professor - starting 1 NO, Mechanical Engineering | 8 | 1 | None yet. |
| **Mac Schwager** | Associate Professor, Aeronautics & Astronautics | 7 | 0 | NO LECTURE COURSE on his 2026-27 roster - independent st |
| **Somil Bansal** | Assistant Professor, Aeronautics & Astronautics | 7 | 1 | AA 276 PRINCIPLES OF SAFETY-CRITICAL AUTONOMY |

#### Marco Pavone

*Associate Professor - ON PARTIAL LEAVE · Aeronautics & Astronautics*

- **Also:** EE, CS and ICME by courtesy
- **Lab:** ASL - Autonomous Systems Lab; also CARS — https://stanfordasl.github.io
- **Work:** Autonomous vehicle planning, safety assurance and verification for learning-enabled autonomy. The IRIS-adjacent verification papers (Jacky Kwok, with Pavone and Azalia Mirhoseini) are his line, not Finn's.
- **Founded:** NOTHING.
- **Advisory / industry:** NVIDIA: 'Director of Autonomous Systems and Physical AI Research', leading the ASPIRE Group, per NVIDIA's own site. Note Stanford Profiles is STALE on this - it still says 'Distinguished Research Scientist'. His bio asserts advisory boards at AV startups 'including multi-billion dollar ones' but names none, so treat that as UNVERIFIED.
- **Student-founded companies:** None confirmed - the ASL alumni page returns 404.
- **Course:** AA 174A / AA 274A / CS 237A Principles of Robot Autonomy I; AA 203 Optimal and Learning-Based Control
- **Accessibility:** 16 MS ADVISEES despite being on partial leave - the second-highest advising load in the set.
- **Work fit 9/10** — Physical AI / embodied core **2** · Touches your thesis **2** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **1**
- **Startup experience 3/10** — Personally founded a company **0** · Concurrent industry exec role **2** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **1**

> **How they can help you.** The only person here who is simultaneously a Stanford professor and a research executive inside a trillion-dollar company, which makes him the best-placed person to tell you what NVIDIA actually believes about physical AI versus what it says publicly. On your thesis specifically: the verification papers that IRIS members appear on as middle authors are led from his group, so if you want to work on verification of learned policies at Stanford, his lab is arguably where that work already lives. Caveat: partial leave plus an NVIDIA directorship means his time is the scarcest here, and the 16 MS advisees suggest it is already committed.

#### Mykel Kochenderfer

*Associate Professor · Aeronautics & Astronautics*

- **Also:** CS by courtesy; Senior Fellow HAI; Co-Director, Stanford Center for AI Safety
- **Lab:** SISL - Stanford Intelligent Systems Laboratory — https://sisl.stanford.edu
- **Work:** Decision making under uncertainty for safety-critical autonomous systems. His early work established the basis of the FAA's ACAS X airborne collision avoidance program. He published Algorithms for Validation (MIT Press, 2026).
- **Founded:** NOTHING. Firm negative - Reliable Robotics and Robust.AI were both probed explicitly and returned zero.
- **Advisory / industry:** None. Previously MIT Lincoln Laboratory.
- **Student-founded companies:** None found (lab alumni subpages unreachable).
- **Course:** AA 228 / CS 238 Decision Making under Uncertainty; AA 222 / CS 361 Engineering Design Optimization
- **Accessibility:** 27 MS ADVISEES - the most accessible person in the entire faculty set, and with zero commercial conflicts of interest.
- **Work fit 8/10** — Physical AI / embodied core **2** · Touches your thesis **2** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 1/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **1**

> **How they can help you.** He is the single best faculty match for your thesis and it is not close on the research axis. Your problem is 'how do you certify that a stochastic policy is safe enough to deploy, and how many trials does that take' - he wrote the MIT Press textbook on validation in 2026 and his earlier work became the FAA's certification basis for collision avoidance. He is also the person to ask WHY NHTSA withdrew AV STEP, because he has lived the regulator-facing version of this problem in aviation, which is the one domain where statistical validation of an autonomous system actually got institutionalised. What he cannot give you is commercial experience: he has founded nothing and advises nobody, which is exactly why he has no conflict and 27 MS advisees.

#### Thomas Berrueta

*INCOMING Assistant Professor - starting 1 NOVEMBER 2026 · Mechanical Engineering*

- **Also:** Currently a postdoc at Caltech CMS; PhD Northwestern 2024 under Todd Murphey
- **Lab:** PAL Lab - already live at pal.stanford.edu — https://pal.stanford.edu
- **Work:** Real-time robot learning for safety-critical systems, built explicitly on reinforcement learning, optimal control AND INFORMATION THEORY.
- **Founded:** NOTHING.
- **Advisory / industry:** None. Technical lead of Caltech Racer, an autonomous IndyCar programme that debuted in 2025. Associate Editor, IEEE RA-L (2025).
- **Student-founded companies:** NONE YET - the lab does not exist as a group.
- **Course:** None yet.
- **Accessibility:** DATE DISCREPANCY WORTH KNOWING: Stanford ME and his own site both say 1 November 2026. The Stanford Robotics Center roster says January 2027. Trust the department and his own page.
- **Work fit 8/10** — Physical AI / embodied core **2** · Touches your thesis **2** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **1**
- **Startup experience 1/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **1**

> **How they can help you.** THE HIGHEST-LEVERAGE OPPORTUNITY IN THIS ENTIRE DOCUMENT, purely on timing. A brand-new assistant professor arrives in roughly six weeks, his stated foundations are reinforcement learning plus optimal control plus information theory - which is your exact background, not an approximation of it - his research area is real-time learning for safety-critical systems, and HE HAS NO STUDENTS. Every other person on this list has an established group you would be joining at the back of a queue. He has an empty lab and a need to fill it. Whatever else you do, put a note in your calendar for early November.

#### Mac Schwager

*Associate Professor · Aeronautics & Astronautics*

- **Also:** CS by courtesy
- **Lab:** Multi-Robot Systems Lab — https://msl.stanford.edu
- **Work:** Multi-robot autonomy and distributed control - and, critically for you, statistical guarantees for robot policy performance. He is a co-author of the tighter-than-Clopper-Pearson bound work (arXiv 2405.05439) that reaches a minimum-expected-success bound of 0.08-0.12 in 40-50 rollouts.
- **Founded:** NOTHING. Commercially a clean zero - his only industry line is Automation Engineer at Applied Materials, 2000-02, before his PhD.
- **Advisory / industry:** None.
- **Student-founded companies:** None found.
- **Course:** NO LECTURE COURSE on his 2026-27 roster - independent study only. NOTE: msl.stanford.edu currently has an expired TLS certificate and the site is broken, which is worth knowing before you try to read it.
- **Accessibility:** 12 doctoral advisees, the most in the batch. THE ROUTE IN: Jaden Clark, a first-year PhD student, is CO-ADVISED by Schwager and Shuran Song.
- **Work fit 7/10** — Physical AI / embodied core **2** · Touches your thesis **2** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **0**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** He is a co-author of the specific statistical result your entire thesis rests on. Your own framing of the problem - that resolving a 10-point difference needs roughly 390 rollouts per arm and that required trials scale as 1 over delta squared - is the problem his group's bounds paper attacks by tightening the confidence interval rather than buying more rollouts. He has zero commercial experience, so do not go to him for the business. Go to him for the mathematics, and go through Jaden Clark, because approaching him cold is hard with no lecture course and a broken lab site, whereas approaching a co-advised first-year working on continual adaptation is easy.

#### Somil Bansal

*Assistant Professor · Aeronautics & Astronautics*

- **Lab:** Safe and Intelligent Autonomy Lab — https://smlbansal.github.io/sia-lab/
- **Work:** Hamilton-Jacobi reachability analysis and safety filters for learning-enabled autonomy - the layer that wraps a learned policy to keep it inside a provably safe set.
- **Founded:** NOTHING.
- **Advisory / industry:** Previously a Research Scientist at Waymo for roughly a year. Collaborations with Skydio, Google and Boeing, but advisory status is UNVERIFIED.
- **Student-founded companies:** None found.
- **Course:** AA 276 PRINCIPLES OF SAFETY-CRITICAL AUTONOMY
- **Accessibility:** Assistant professor, growing lab, so likely to have room.
- **Work fit 7/10** — Physical AI / embodied core **2** · Touches your thesis **2** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **0**
- **Startup experience 1/10** — Personally founded a company **0** · Concurrent industry exec role **1** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** He builds the certification layer that a learned-policy product would actually need to ship. If your wedge is non-regression at the moment of model update, the complementary question is what runtime guarantee wraps the policy between updates - and reachability-based safety filters are the leading answer. His course is the single most on-topic class in the catalogue for the safety-case half of your thesis, and a year at Waymo means he has seen what an AV safety case looks like from inside a company that spent $27B on one.

### Learned manipulation & robot policies

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Chelsea Finn** | Assistant Professor, Computer Science and Electrical Engine | 9 | 9 | Not verified for 2026-27 in this pass. |
| **Shuran Song** | Assistant Professor, Electrical Engineering | 8 | 5 | Not verified for 2026-27 in this pass. She taught the ro |
| **Dorsa Sadigh** | Associate Professor, Computer Science and Electrical Engine | 7 | 0 | No lecture course on the 2026-27 roster. Previously CS 2 |
| **Jeannette Bohg** | ASSOCIATE Professor (her own site still says, Computer Science | 7 | 0 | CS 336 ROBOT PERCEPTION AND DECISION-MAKING; co-instruct |

#### Chelsea Finn

*Assistant Professor · Computer Science and Electrical Engineering*

- **Lab:** IRIS - Intelligence through Robotic Interaction at Scale — https://irislab.stanford.edu/
- **Work:** Robot learning at scale: meta-learning (MAML), imitation learning, generalist policies, and increasingly LLM post-training across a third of the lab.
- **Founded:** PHYSICAL INTELLIGENCE - co-founder and Research Lead. $70M seed 2024, then $600M at $5.6B led by Google CapitalG in Nov 2025. Bloomberg reported talks at roughly $11B in March 2026, not confirmed closed.
- **Advisory / industry:** Research Lead at Physical Intelligence, concurrent with the professorship.
- **Student-founded companies:** THE DENSEST FOUNDER PIPELINE IN STANFORD ROBOTICS: Tony Z. Zhao (Sunday Robotics, $1.15B), Alexander Khazatsky (CollectedAI), Frederik Ebert (Emancro, co-advised at Berkeley), plus undergraduate alumni Govind Chada (Enact, YC S26), Sergio Charles (Thesis, YC F25), David Yuan (IntBot) and Rehaan Ahmad (alphaXiv).
- **Course:** Not verified for 2026-27 in this pass.
- **Accessibility:** Applications go through a form linked from the IRIS contact page, NOT by emailing members directly. 33 current lab members.
- **Work fit 9/10** — Physical AI / embodied core **2** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **2**
- **Startup experience 9/10** — Personally founded a company **2** · Concurrent industry exec role **2** · Board seats / formal advisory **2** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **1**

> **How they can help you.** Highest combined score of any faculty member - and the one you should be most careful about. She can open any door in this field, and her lab converts juniors into PhD students and founders at a rate nobody else matches. But read the conflict honestly: she is a co-founder of Physical Intelligence, and your thesis is structurally adversarial to policy vendors. The sharpest honest findings in your direction are adverse to her company - pi-0.5 substituting task progress for success rate, RECAP underpowered by its own trial budget. That does not make her unapproachable, but it does mean the evaluation thesis is the one topic where your incentives and hers diverge, and you should know that before you pitch it.

#### Shuran Song

*Assistant Professor · Electrical Engineering*

- **Lab:** REALab - Robotics and Embodied AI Lab — https://real.stanford.edu/
- **Work:** Manipulation from cheap data: the Universal Manipulation Interface lineage, compliance and contact-rich control, whole-body and mobile manipulation, hardware-software co-design. 100% robotics - no LLM drift anywhere in the lab.
- **Founded:** No company involvement found. HONEST CAVEAT: she was not individually probed for founding activity in this pass the way the 32 others were, and the prior Stanford census also lists no company for her - so read this as 'none surfaced' rather than 'confirmed none'.
- **Advisory / industry:** None surfaced.
- **Student-founded companies:** VERY STRONG: Cheng Chi (co-founder & CTO, Sunday Robotics, $1.15B), Zhenjia Xu (co-founder, Genesis AI, $105M seed), Neil Nie (co-founder & CEO, Verne Robotics, YC S25), Nicolas Ouporov (founder & CEO, Fleet AI). Plus Hojung Choi and Alper Canberk as early hires at Sunday.
- **Course:** Not verified for 2026-27 in this pass. She taught the robot perception course you had flagged in your Autumn plan.
- **Accessibility:** 20 current lab members, and the lab publishes members' Stanford email addresses openly - 18 of 19 I checked. That is a materially more open posture than IRIS.
- **Work fit 8/10** — Physical AI / embodied core **2** · Touches your thesis **1** · RL / decision / estimation content **1** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **2**
- **Startup experience 5/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **2** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **1**

> **How they can help you.** The cleaner of the two labs on the axis that matters most to you, for three specific reasons. First, no policy-vendor conflict: her students' industry channels are NVIDIA, Amazon FAR, Boston Dynamics, Meta and Anthropic rather than Physical Intelligence, so an independent-evaluation thesis is not adversarial to her interests. Second, her lab's own work already reaches into your thesis - REFLECT does failure explanation, Latent Policy Barrier does distribution shift, Adaptive Compliance Policy attacks the insertion ceiling. Third, her artifacts are the ones industry actually adopted: Diffusion Policy and UMI came out of her lab, which is the strongest available evidence that work done there escapes into products.

#### Dorsa Sadigh

*Associate Professor · Computer Science and Electrical Engineering*

- **Also:** Senior Fellow, HAI. SRC executive committee.
- **Lab:** ILIAD - Interactive and Learning Algorithms and Autonomous Decision-making — https://iliad.stanford.edu/
- **Work:** Human-robot interaction, preference-based learning, and reinforcement learning for interactive agents.
- **Founded:** NOTHING. Two conflation warnings: the SAIL-Toyota Center is an ON-CAMPUS research centre, not a job at TRI; and Physical Intelligence belongs to Chelsea Finn, not to her.
- **Advisory / industry:** None.
- **Student-founded companies:** NONE - and this was checked against her full named alumni roster. Karamcheti went to Georgia Tech, Biyik to USC, Cui to UCLA, Belkhale to Figure, Shih and Kwon to Anthropic, Sundaresan to DeepMind. An academic and frontier-lab pipeline, with zero founders.
- **Course:** No lecture course on the 2026-27 roster. Previously CS 221 and AA 274B / CS 237B Robot Autonomy II.
- **Accessibility:** SHE IS EFFECTIVELY A SECOND PI FOR THE RL-FLAVOURED HALF OF IRIS, formally co-advising Perry Dong, Ajay Sridhar, Jubayer Ibn Hamid, Jonathan Yang and Tian Gao - five students.
- **Work fit 7/10** — Physical AI / embodied core **2** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **1**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** The structurally important fact about her is the one the IRIS website does not tell you: five of the thirteen IRIS PhD students are formally co-advised by her, which means that if you join IRIS on anything RL-flavoured, she is very likely to be your second advisor. Preference-based learning is also directly relevant, since Marcel Torne's freeform preference work - the most thesis-adjacent line in IRIS - sits in her intellectual territory. Commercially she is a clean zero with zero founder students across her whole alumni roster, so the network value here is frontier-lab hiring, not company building.

#### Jeannette Bohg

*ASSOCIATE Professor (her own site still says Assistant - stale) · Computer Science*

- **Lab:** IPRL - Interactive Perception and Robot Learning — https://iprl.stanford.edu/
- **Work:** Interactive perception - using action to improve perception - and robot learning for manipulation.
- **Founded:** NOTHING. X Development and Intrinsic were both probed explicitly.
- **Advisory / industry:** None.
- **Student-founded companies:** None - her alumni go to DeepMind, NVIDIA, Figure and Scale AI, with no founders.
- **Course:** CS 336 ROBOT PERCEPTION AND DECISION-MAKING; co-instructor on CS 237B / AA 274B
- **Accessibility:** TAKES MS STUDENTS - 9 currently. REALab MS student Jisang Park is CO-ADVISED by Bohg and Song and holds TWO graduate research assistantships from her.
- **Work fit 7/10** — Physical AI / embodied core **2** · Touches your thesis **1** · RL / decision / estimation content **1** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **2**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** The most practically available manipulation professor in CS, and the evidence is specific rather than vague: Jisang Park is an MS student co-advised by Bohg and Shuran Song who has been awarded two Graduate Research Assistantships by her. That is a documented, repeatable path for a master's student to get FUNDED research work in manipulation - which is the operational question you keep circling. CS 336 is the course. No commercial experience at all, so treat this as a research and funding route, not a mentorship-on-industry route.

### RL, decision theory & optimization

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Sanjay Lall** | Professor, Electrical Engineering (ISL) | 6 | 4 | EE 263 MATRIX METHODS AND SVD (Winter); also EE 104 ML,  |
| **Emma Brunskill** | Associate Professor (tenured), Computer Science | 5 | 0 | CS 234 REINFORCEMENT LEARNING; CS 31N Counterfactuals |
| **Benjamin Van Roy** | Professor, Electrical Engineering AND Management  | 5 | 6 | EE 283 / MS&E 235A MARKOV DECISION PROCESSES (Autumn) -  |
| **Stephen Boyd** | Samsung Professor of Engineering; CHAIR of E, Electrical Engineering (ISL) | 5 | 7 | EE 364A CONVEX OPTIMIZATION I (Winter); ENGR 108 (Autumn |

#### Sanjay Lall

*Professor · Electrical Engineering (ISL)*

- **Also:** Aeronautics & Astronautics by courtesy
- **Lab:** No branded lab — https://lall.stanford.edu/
- **Work:** Control, estimation and applied algorithms - satellites, audio, Formula 1, America's Cup, cloud monitoring, IC diagnostics.
- **Founded:** UNRESOLVED. Both his own bio and Stanford Profiles say 'several startup companies' but NAME NONE. Do not infer a founding from this.
- **Advisory / industry:** DIRECTOR, AUTONOMOUS SYSTEMS GROUP, APPLE (2018-19). Visiting researcher and director at GOOGLE, listed as current - worth confirming directly. Associate Editor of Automatica.
- **Student-founded companies:** None found.
- **Course:** EE 263 MATRIX METHODS AND SVD (Winter); also EE 104 ML, EE 266 Stochastic Control, EE 364A, ENGR 207B KALMAN FILTERING
- **Accessibility:** Moderate; teaches a large core course.
- **Work fit 6/10** — Physical AI / embodied core **1** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 4/10** — Personally founded a company **0** · Concurrent industry exec role **2** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **2**

> **How they can help you.** The most industry-fluent controls person on this list - he has actually shipped estimation and control inside Apple, where he directed the Autonomous Systems Group, and at Google. For you specifically, ENGR 207B on Kalman filtering and EE 266 on stochastic control are the classical-estimation counterparts to what you would be doing statistically with policies, and he can tell you which of those methods survive contact with a real product. Two honest caveats: the 'several startup companies' claim in his bio names nothing, so do not repeat it as fact, and the concurrent Google appointment should be confirmed with him rather than assumed.

#### Emma Brunskill

*Associate Professor (tenured) · Computer Science*

- **Also:** Associate Director, Stanford Causal Science Center; SAIL; AI Safety at Stanford
- **Lab:** No branded lab — https://cs.stanford.edu/people/ebrun/
- **Work:** OFF-POLICY EVALUATION, offline and batch reinforcement learning, and sample complexity - specifically in settings where there is NO SIMULATOR. Applications in healthcare and education.
- **Founded:** NOTHING.
- **Advisory / industry:** No corporate role at all. Her advisory boards are academic and nonprofit: RLDM, Modern Classrooms Project, the NSF AI Institute for Societal Decision Making. Her Khan Academy research advisory role ran 2021-2024 and has ENDED.
- **Student-founded companies:** None found.
- **Course:** CS 234 REINFORCEMENT LEARNING; CS 31N Counterfactuals
- **Accessibility:** She states on her own site that she is ACCEPTING PHD STUDENTS.
- **Work fit 5/10** — Physical AI / embodied core **0** · Touches your thesis **2** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **0**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** READ PAST HER SCORE. The W of 5 is an artifact of my own rubric penalising her for not being a roboticist, and it badly understates her. Off-policy evaluation - estimating how a new policy would have performed using data collected under the old one, without running the new one - IS your thesis, stated in its native statistical vocabulary. Your surviving wedge is that production telemetry cannot tell you whether an OTA update is a regression because you cannot run the previous policy counterfactually without surrendering throughput. That is an off-policy evaluation problem with a throughput constraint, and she has spent her career on exactly the no-simulator version of it. She also teaches CS 234 and says she is taking students. If the thesis is the thing you care about rather than the robots, she may be the most important name on this list.

#### Benjamin Van Roy

*Professor · Electrical Engineering AND Management Science & Engineering (two primary appointments)*

- **Also:** CS by courtesy; also ICME. At Stanford since 1998.
- **Lab:** Efficient Agent Team, Google DeepMind (Mountain View) — https://web.stanford.edu/~bvr/
- **Work:** Efficient exploration and information-theoretic agent design, now aimed at alignment.
- **Founded:** ENUVIS - co-founded, acquired by SiRF and subsequently Qualcomm. Year unstated.
- **Advisory / industry:** FOUNDED AND LEADS the Efficient Agent Team at Google DeepMind - DeepMind's first US-based research team, concurrent with the professorship. Previously led research at Unica (later IBM) and at Morgan Stanley, though those were not foundings.
- **Student-founded companies:** IRIS MS alumnus Henrik Marklund is now his PhD student, which makes him a live bridge between your two worlds.
- **Course:** EE 283 / MS&E 235A MARKOV DECISION PROCESSES (Autumn) - CONFIRMED. Plus EE 383 / MS&E 235B Reinforcement Learning (Winter) and CS 338 / MS&E 338 Aligning Superintelligence (Spring).
- **Accessibility:** YOU ALREADY HAVE THE ACCESS ROUTE - your Autumn course plan had you taking his MDP course. That is a relationship you can start in week one by showing up.
- **Work fit 5/10** — Physical AI / embodied core **0** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 6/10** — Personally founded a company **1** · Concurrent industry exec role **2** · Board seats / formal advisory **0** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **1**

> **How they can help you.** The cheapest high-value relationship available to you, because you are already enrolled in his classroom. He has an exit (Enuvis to SiRF to Qualcomm), he founded and runs a research team inside Google DeepMind, and he teaches the full MDP to RL to alignment sequence across all three quarters. Concretely: the information-theoretic exploration machinery he works on is the same machinery that tells you how many samples a decision needs, which is the arithmetic core of your thesis. And a former IRIS MS student is now his PhD student, so he has already seen the exact transition you are contemplating.

#### Stephen Boyd

*Samsung Professor of Engineering; CHAIR of Electrical Engineering · Electrical Engineering (ISL)*

- **Also:** CS and MS&E courtesy appointments UNVERIFIED
- **Lab:** No branded lab — https://web.stanford.edu/~boyd/
- **Work:** Convex optimization, and its deployment as infrastructure - CVX, CVXPY, SCS, OSQP.
- **Founded:** BARCELONA DESIGN - co-founder and Chief Scientist, 1999 until it folded in 2005. Wikipedia-only sourcing, so MEDIUM CONFIDENCE.
- **Advisory / industry:** BlackRock AI Labs senior advisor, though the exact title is UNVERIFIED - and beware, the BlackRock.com bio page for a 'Stephen Boyd' is a DIFFERENT PERSON. Petuum advisory board (~2016) and H2O.ai scientific advisory panel. All three trace to Wikipedia; his own Stanford bio lists no advisory roles at all.
- **Student-founded companies:** THE DENSEST STUDENT-FOUNDER PIPELINE OF ANY NON-ROBOTICS FACULTY HERE: Neal Parikh founded SevenFifty; David Hallac is founder and CEO of Viaduct; Matt Kraning is founder and CTO of Expanse; postdoc Matt Wytock founded Gridmatic (2017). Craig Barratt became Board Chair of Intel.
- **Course:** EE 364A CONVEX OPTIMIZATION I (Winter); ENGR 108 (Autumn)
- **Accessibility:** TIGHTEST CALENDAR IN THE SET - EE department chair plus BlackRock.
- **Work fit 5/10** — Physical AI / embodied core **0** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 7/10** — Personally founded a company **1** · Concurrent industry exec role **1** · Board seats / formal advisory **2** · Student / lab founder pipeline **1** · Completed exit, clearance or productization **2**

> **How they can help you.** Worth knowing for one very concrete reason: CVXGEN, out of his group, flies SpaceX Falcon 9 and Heavy landing guidance. That is the cleanest existence proof at Stanford that optimization research becomes safety-critical deployed software - which is the transition your thesis needs to make. Also note what he did with CVXPY: he gave away the tool everyone uses and built enormous influence rather than equity, which is the commons pattern you are trying to decide whether to fight or to exploit. He also has a failed company (Barcelona Design, folded 2005), and failed-company knowledge is usually more useful than success knowledge.

### Classical manipulation, control & hardware

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Oussama Khatib** | Weichai Professor, Computer Science | 7 | 2 | CS 225A EXPERIMENTAL ROBOTICS; CS 327A / ME 323 Advanced |
| **Mark Cutkosky** | Fletcher Jones Professor, Mechanical Engineering | 6 | 3 | ME 310A/B/C GLOBAL ENGINEERING DESIGN, INNOVATION AND EN |
| **J. Kenneth Salisbury Jr.** | Professor (Research) of CS and of Surgery (A, Computer Science and Surgery | 6 | 7 | None - emeritus. |
| **Monroe Kennedy III** | Assistant Professor, Mechanical Engineering | 6 | 1 | ME 326 / CS 339R COLLABORATIVE ROBOTICS |
| **Allison Okamura** | Richard W. Weiland Professor, Mechanical Engineering | 5 | 1 | ME 327 Design and Control of Haptic Systems; ME 328 MEDI |

#### Oussama Khatib

*Weichai Professor · Computer Science*

- **Also:** EE by courtesy. DIRECTOR, Stanford Robotics Center.
- **Lab:** Stanford Robotics Lab — https://robotics.stanford.edu/~ok/
- **Work:** Whole-body control architectures, human-friendly robot design, haptics, and underwater humanoid robotics (Ocean One).
- **Founded:** NOTHING. Clean negative, checked across three primary pages.
- **Advisory / industry:** None found; editorial roles only.
- **Student-founded companies:** THE STRONGEST LINEAGE IN STANFORD ROBOTICS: Samir Menon founded DEXTERITY ($1.65B post-money, ~$300M raised, FedEx and UPS as customers) and Luis Sentis co-founded APPTRONIK (~$403M Series A). Nomadic Technologies is defunct. FLEXIV is UNVERIFIED and actively misattributed - see the conflation note.
- **Course:** CS 225A EXPERIMENTAL ROBOTICS; CS 327A / ME 323 Advanced Robotic Manipulation
- **Accessibility:** 7 MS advisees. He directs the Stanford Robotics Center, so he is the gatekeeper to the whole 42-faculty apparatus.
- **Work fit 7/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **1** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **2**
- **Startup experience 2/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **0**

> **How they can help you.** He holds lineage rather than operating knowledge - he has never founded anything, but he trained the CEO of a $1.65B manipulation company and a co-founder of a humanoid company. That is precisely the right person to ask one specific question: what did Samir Menon have to learn after leaving the lab that the lab could not teach him? Dexterity is also the most instructive case in your market map, because it sells manipulation into logistics with real FedEx and UPS deployments, which is the commercial outcome your thesis is ultimately about. Note the useful precision: Dexterity was founded in 2017 by a six-person team, six years after Menon's PhD, so it is advisor lineage rather than a graduation-day spinout.

#### Mark Cutkosky

*Fletcher Jones Professor · Mechanical Engineering*

- **Also:** Stanford Robotics Center executive committee
- **Lab:** BDML - Biomimetics and Dexterous Manipulation Lab — https://bdml.stanford.edu/
- **Work:** Biomimetic adhesion (gecko-inspired), tactile sensing, and dexterous manipulation hardware.
- **Founded:** NOTHING.
- **Advisory / industry:** TECHNICAL ADVISOR, geCKo MATERIALS, listed on the company's own page. Senior Editor, IJRR.
- **Student-founded companies:** geCKo MATERIALS - founder and CEO is CAPELLA KERST, his Stanford ME PhD. It commercialises BDML's gecko adhesive. Funding undisclosed.
- **Course:** ME 310A/B/C GLOBAL ENGINEERING DESIGN, INNOVATION AND ENTREPRENEURSHIP; ENGR 319
- **Accessibility:** Good, and ME 310 is explicitly an entrepreneurship course - a natural door.
- **Work fit 6/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **2**
- **Startup experience 3/10** — Personally founded a company **0** · Concurrent industry exec role **1** · Board seats / formal advisory **1** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **1**

> **How they can help you.** He holds the technology-transfer and licensing mechanics for hardware, plus an advisor's seat on a live materials spinout - and crucially he teaches ME 310, an entrepreneurship design course, which is the most natural low-friction way to get into a conversation with a senior robotics hardware professor. Two of REALab's people sit in his lab as well (postdoc Hao Li did his PhD there, MS student Joshua Citron works in both), so he is already one step from the lab you are evaluating. He has never raised money himself, so the advice is about licensing and hardware transfer, not fundraising.

#### J. Kenneth Salisbury Jr.

*Professor (Research) of CS and of Surgery (Anatomy), EMERITUS · Computer Science and Surgery*

- **Also:** ME by courtesy. Stanford 1999-2017; MIT AI Lab 1982-97.
- **Lab:** Salisbury Robotics Lab — https://sr.stanford.edu/
- **Work:** Haptics, surgical robotics and force control - four decades of it.
- **Founded:** THE FOLKLORE IS WRONG AND THIS IS WORTH GETTING RIGHT. He did NOT found Intuitive Surgical - he was 'Fellow and Scientific Advisor, 1997-2003'. On SensAble, Stanford's own CS page says it was 'founded based on his research' by his MIT student; some secondary sources claim he co-established SensAble Devices Inc. in August 1993, but MIT's Lemelson page credits only Thomas Massie, so CO-FOUNDER STATUS IS UNVERIFIED. As far as primary sources show, HE HAS NEVER PERSONALLY FOUNDED AND RUN A COMPANY.
- **Advisory / industry:** Intuitive Surgical advisor, 1997-2003. 50+ patents. Won the 2011 IEEE Inaba Award explicitly for 'Commercialization of Products in Medical Robotics, Robotics, and Haptics'.
- **Student-founded companies:** THOMAS MASSIE founded SensAble (the PHANToM haptic device), acquired by Geomagic in 2012.
- **Course:** None - emeritus.
- **Accessibility:** Retired. Contact is a personal Gmail address.
- **Work fit 6/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **2**
- **Startup experience 7/10** — Personally founded a company **0** · Concurrent industry exec role **2** · Board seats / formal advisory **1** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **2**

> **How they can help you.** He is the closest thing available to a living history of how force control and haptics became products, and he watched Intuitive Surgical from the inside as its scientific advisor during 1997-2003 - the exact window in which surgical robotics went from research to a category. Given your interest in the insertion and compliance ceiling, a person who spent forty years on force control and saw one instance of it clear FDA and become a monopoly is a high-value conversation. Two cautions: he is retired and reachable only informally, and do not repeat the widespread claim that he founded Intuitive Surgical - he did not, and getting that right is a credibility marker in this field.

#### Monroe Kennedy III

*Assistant Professor · Mechanical Engineering*

- **Also:** CS by courtesy. National Director, Black in Robotics.
- **Lab:** ARMLab - Assistive Robotics and Manipulation Lab — https://arm.stanford.edu/
- **Work:** Collaborative robotics - manipulation that anticipates human intent, on mobile manipulators and humanoids.
- **Founded:** NOTHING.
- **Advisory / industry:** No corporate role. National Director of Black in Robotics. Co-investigator on Renee Zhao's ARPA-H award, whose partners include Philips, Medtronic and Terumo Neuro.
- **Student-founded companies:** None found.
- **Course:** ME 326 / CS 339R COLLABORATIVE ROBOTICS
- **Accessibility:** Good - assistant professor with a growing lab and a cross-listed CS course.
- **Work fit 6/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **1** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **2**
- **Startup experience 1/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **1**

> **How they can help you.** His course is cross-listed into CS, which makes it one of the easier ways for a CS or EE student to get into a mechanical-engineering manipulation lab. Research-wise, human-intent anticipation matters to your thesis for a specific reason: if a policy operates alongside a human, the definition of failure becomes partly about the human's expectations, which is exactly the ambiguity that makes uptime SLAs unenforceable. The ARPA-H connection also puts him one step from real medical-device partners.

#### Allison Okamura

*Richard W. Weiland Professor · Mechanical Engineering*

- **Also:** CS by courtesy; Siebel Senior Fellow, Hoover; DIRECTOR OF GRADUATE STUDIES, ME; SRC executive committee
- **Lab:** CHARM Lab — https://charm.stanford.edu/
- **Work:** Haptics, teleoperation and medical robotics.
- **Founded:** NOTHING - verified against her own 62-page CV, updated June 2026.
- **Advisory / industry:** Her Hoover profile claims corporate advisory boards spanning 'surgical to warehouse' but NAMES NONE, and none appear in her own CV, so treat as UNVERIFIED. What is real: Research Engineer at IMMERSION CORPORATION, 1996-98. She also leads the robotics section of the Stanford Emerging Technology Review.
- **Student-founded companies:** NONE. Her full CV student lists were searched for founder and CEO: zero.
- **Course:** ME 327 Design and Control of Haptic Systems; ME 328 MEDICAL ROBOTICS
- **Accessibility:** DIRECTOR OF GRADUATE STUDIES for Mechanical Engineering - that administrative role is the access route, because it is her job to talk to graduate students.
- **Work fit 5/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **2**
- **Startup experience 1/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **1**

> **How they can help you.** Two specific uses. First, she leads the robotics section of the Stanford Emerging Technology Review, which means she has done the institutional version of the survey you have been building yourself - worth comparing notes with someone who had to write the official version. Second, she has product engineering experience from Immersion Corporation, a haptics company, and she has a diligence-trained eye on surgical and warehouse robotics without holding equity in any of it, which makes her unusually unbiased. Note the clean zero on student founders across a very long career - that is a real signal about haptics as a commercial field, not an oversight.

### Signals, information & sensing

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Grace Gao** | Associate Professor, Aeronautics & Astronautics | 7 | 0 | AA 272 GPS; AA 278 Lunar PNT |
| **Tsachy Weissman** | Robert and Barbara Kleist Professor, Electrical Engineering (ISL) | 5 | 4 | EE 276 INFORMATION THEORY; EE 278 Probability and Statis |
| **Mert Pilanci** | Associate Professor (recently promoted - old, Electrical Engineering | 4 | 0 | EE 364B Convex Optimization II (the Boyd-lineage success |
| **Zerina Kapetanovic** | Assistant Professor, Electrical Engineering | 4 | 0 | EE 186 / CS 140M Embedded Systems; EE 284A Internet of T |
| **Gordon Wetzstein** | Professor, Electrical Engineering | 4 | — | Not verified in this pass. |
| **Mark Horowitz** | Professor, Electrical Engineering | 3 | 6 | Not verified in this pass. |

#### Grace Gao

*Associate Professor · Aeronautics & Astronautics*

- **Also:** EE by courtesy. CO-DIRECTOR, Stanford Center for AI Safety; co-lead, SystemX Robotics.
- **Lab:** NAV Lab — https://navlab.stanford.edu/
- **Work:** GNSS spoofing and robust localization, factor-graph navigation, and lunar position-navigation-timing.
- **Founded:** NOTHING.
- **Advisory / industry:** No corporate role. Co-Director of the Stanford Center for AI Safety and co-lead of SystemX Robotics.
- **Student-founded companies:** None found.
- **Course:** AA 272 GPS; AA 278 Lunar PNT
- **Accessibility:** Good. SLUG TRAP: profiles.stanford.edu/grace-gao is a DIFFERENT PERSON.
- **Work fit 7/10** — Physical AI / embodied core **2** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** Two institutional levers, which is the real reason she is on this list. She co-directs the Stanford Center for AI Safety, which is the natural institutional home for a statistical-validation-of-autonomy project and a possible funding route. And she co-leads SystemX Robotics - SystemX is a 35-member industrial alliance including Bosch, Caterpillar, TSMC and Apple, which is a legitimate channel to industrial robot buyers, the exact people your thesis says you must learn the pain from rather than from friends. Technically, robust estimation and factor graphs under adversarial conditions is close to your signal-processing training. Note that REALab undergraduate Jack Goler came out of her NAV Lab.

#### Tsachy Weissman

*Robert and Barbara Kleist Professor · Electrical Engineering (ISL)*

- **Also:** Founding Director, Stanford Compression Forum; leads Starling Lab; runs the SHTEM outreach programme
- **Lab:** Stanford Compression Forum — https://compression.stanford.edu/
- **Work:** Information theory and compression, and where they actually ship in industry - from genomics to cloud storage.
- **Founded:** NO CONFIRMED FOUNDING. The 'co-founded and sold Compressable to Amazon' claim traces ONLY to Grokipedia and is UNVERIFIED.
- **Advisory / industry:** His own bio says he has served on unnamed 'technical advisory boards in industry' and that he advises StageCast. His bio names deployed-technology relationships with Guardant Health, Amazon, Google, HP, Ford, Siemens, Apple and Yahoo. 14 US patents. Also senior technical advisor to HBO's Silicon Valley - the Weissman score is named after him.
- **Student-founded companies:** COMPRESSABLE CORP was co-founded by his former postdoc DMITRI PAVLICHIN, confirmed on Pavlichin's own site. Weissman is not named as a founder.
- **Course:** EE 276 INFORMATION THEORY; EE 278 Probability and Statistical Inference; ENGR 76; EE 376C
- **Accessibility:** THE MOST ACCESSIBLE OF THE SIGNALS GROUP BY DESIGN - he runs the Compression Forum and the SHTEM outreach programme, both of which exist to bring people in.
- **Work fit 5/10** — Physical AI / embodied core **0** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 4/10** — Personally founded a company **0** · Concurrent industry exec role **1** · Board seats / formal advisory **1** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **2**

> **How they can help you.** Your information-theory background is the part of your training that nobody in robot learning has, and he is the person who has most thoroughly mapped where information theory actually converts into industrial value - genomics at Guardant, storage at Amazon, imaging at Siemens and Apple. That map is directly transferable to your problem, because 'how much information does one rollout actually carry about a policy's success rate' is an information-theoretic question dressed as a statistics question. He also holds those relationships as consulting rather than equity, which is a legitimate and underrated model worth understanding. Genuinely approachable by design.

#### Mert Pilanci

*Associate Professor (recently promoted - older pages still say Assistant) · Electrical Engineering*

- **Lab:** No named lab — https://stanford.edu/~pilanci/
- **Work:** Hidden convexity - exact convex reformulations of neural network training - plus sketching and quantization for machine learning.
- **Founded:** NOTHING.
- **Advisory / industry:** NO ADVISORY ROLE CONFIRMED from any primary source. The 'scientific advisor to hardware companies' and KOCREE claims are search-summary only and UNVERIFIED. His only primary industry ties are research awards from Facebook and Adobe.
- **Student-founded companies:** None found.
- **Course:** EE 364B Convex Optimization II (the Boyd-lineage successor); EE 269 SIGNAL PROCESSING AND QUANTIZATION FOR MACHINE LEARNING
- **Accessibility:** Good - newly promoted, no company commitments competing for his time.
- **Work fit 4/10** — Physical AI / embodied core **0** · Touches your thesis **1** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **0**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** EE 269 is the most literal course-level match to your background in the entire Stanford catalogue - signal processing and quantization for machine learning is your two fields in one course code. Commercially he is a clean zero, so there is nothing to learn from him about industry. Include him as a technical depth resource and as a low-competition advisor option: newly promoted, no company, no startup commitments, which usually means genuine availability.

#### Zerina Kapetanovic

*Assistant Professor · Electrical Engineering*

- **Also:** CS and Geophysics by courtesy
- **Lab:** S4 Lab — https://s4lab.stanford.edu/
- **Work:** Battery-free backscatter sensing and low-power wireless - WISPCam, Whisper TV-white-space networking, HyperCam.
- **Founded:** NOTHING - clean negative. Previously a postdoc at Microsoft Research.
- **Advisory / industry:** None found.
- **Student-founded companies:** None among nine alumni. CONFLATION WARNING: her frequent co-author Joshua R. Smith is the serial founder, not her.
- **Course:** EE 186 / CS 140M Embedded Systems; EE 284A Internet of Things
- **Accessibility:** THE MOST MS-ACCESSIBLE LAB IN THE EE SIGNALS GROUP.
- **Work fit 4/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **0**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** Off your thesis, but the single most accessible EE lab doing genuine signal-processing work, and the sensing angle is not irrelevant: battery-free backscatter sensing is what makes it economic to instrument a deployed robot fleet densely enough to measure anything. If the practical blocker on your measurement thesis turns out to be telemetry cost rather than statistics, this is the relevant expertise. Good option if you want an EE-department home with low competition.

#### Gordon Wetzstein

*Professor · Electrical Engineering*

- **Also:** SRC-affiliated
- **Lab:** Stanford Computational Imaging Lab — https://www.computationalimaging.org/
- **Work:** Computational imaging and displays - co-designing optics and algorithms.
- **Founded:** Not probed in this pass.
- **Advisory / industry:** Not probed in this pass.
- **Student-founded companies:** Not probed in this pass.
- **Course:** Not verified in this pass.
- **Accessibility:** Not probed.
- **Work fit 4/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **2** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **0**
- **Startup experience: not scored** — deliberately left blank rather than set to zero, because this person's commercial record was not probed in this pass.

> **How they can help you.** Flagged rather than researched - he appears on the Stanford Robotics Center roster and his field, computational imaging, is the purest signal-processing discipline in Stanford EE, co-designing optics and reconstruction algorithms together. That is your Reconstruction_Signals background with a much larger budget. HIS COMMERCIAL RECORD WAS NOT PROBED IN THIS PASS, so X is deliberately left unscored rather than guessed. Worth a follow-up if the sensing and imaging side of robotics interests you.

#### Mark Horowitz

*Professor · Electrical Engineering*

- **Also:** CS by courtesy. SRC-affiliated.
- **Lab:** — — https://profiles.stanford.edu/mark-horowitz
- **Work:** Computer architecture and systems - the compute substrate.
- **Founded:** RAMBUS - co-founded 1990. A public company. Source: the prior Stanford census, verified 2026-09-10.
- **Advisory / industry:** Not individually probed in this pass.
- **Student-founded companies:** Not individually probed in this pass.
- **Course:** Not verified in this pass.
- **Accessibility:** Not probed.
- **Work fit 3/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 6/10** — Personally founded a company **2** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **2**

> **How they can help you.** Included because he is one of very few EE faculty with a genuine company founding that became a public company (Rambus, 1990). HONEST LIMIT: he was carried over from the earlier Stanford census rather than individually researched in this pass, so the advisory, student and course fields are blank rather than zero. If compute economics for embodied AI becomes a question you need answered, he is the obvious name; verify the current details before acting.

### Perception, 3D & world models

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Jiajun Wu** | Assistant Professor, Computer Science | 5 | 2 | CS 348I Computer Graphics in the Era of AI (co-taught wi |
| **C. Karen Liu** | Professor, Computer Science | 5 | 2 | CS 348I Computer Graphics in the Era of AI (co-taught wi |
| **Silvio Savarese** | ADJUNCT Professor (since April 2021 - he lef, Computer Science | 4 | 8 | NONE. No classroom route at all. |
| **Fei-Fei Li** | Sequoia Professor, Computer Science | 4 | 9 | Not verified for 2026-27 in this pass. |
| **Iro Armeni** | Assistant Professor, Civil and Environmental Engineering | 4 | 0 | CEE 247C Computer Vision for the Built Environment; CEE  |
| **Leonidas Guibas** | Paul Pigott Professor of Engineering, Computer Science | 4 | — | Not verified in this pass. |

#### Jiajun Wu

*Assistant Professor · Computer Science*

- **Also:** Psychology by courtesy. SVL / SAIL / Graphics Lab / Stanford Robotics Center.
- **Lab:** Stanford Vision and Learning Lab — https://jiajunwu.com/
- **Work:** Physical scene understanding, neuro-symbolic models, and 3D perception for embodied agents.
- **Founded:** NOTHING. Previously Visiting Faculty Researcher at Google Research. His corporate money is research awards, not advisory seats.
- **Advisory / industry:** None.
- **Student-founded companies:** THE BEST STUDENT-FOUNDER RECORD AMONG THE CS ROBOTICS FACULTY: HEDRA, founded by MICHAEL LINGELBACH, co-advised in his group - $32M Series A led by a16z in May 2025, roughly $44M total, a reported ~$200M valuation (UNVERIFIED) and roughly $10M ARR. Also Rhoda AI (Eric Chan, his co-advisee; founder-versus-employee status UNVERIFIED).
- **Course:** CS 348I Computer Graphics in the Era of AI (co-taught with C. Karen Liu); CS 231N; CS 221; CS 131
- **Accessibility:** 14+ MS ADVISEES and the widest classroom surface of any robotics-adjacent CS professor - four courses.
- **Work fit 5/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **1** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **1**
- **Startup experience 2/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **2** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** The widest and cheapest classroom surface in CS robotics - four courses and 14+ MS advisees means the probability of getting into his orbit is higher than almost anyone else's. He has no personal commercial experience, but he has a live founder pipeline with real revenue (Hedra at roughly $10M ARR), which makes him a credible person to ask what distinguished the student who built a company from the students who did not. He also co-advised REALab postdoc Hao Li's master's work and currently hosts REALab alumnus Zhanpeng He as a postdoc, so he sits adjacent to the lab you are evaluating.

#### C. Karen Liu

*Professor · Computer Science*

- **Also:** SRC-affiliated
- **Lab:** The Movement Lab — https://tml.stanford.edu/
- **Work:** Human and character motion, physics-based animation, and computational models of movement.
- **Founded:** NOTHING.
- **Advisory / industry:** None.
- **Student-founded companies:** ELOQUENT LABS, founded by KEENON WERLING, now her doctoral advisee - AI support chatbots, ACQUIRED BY SQUARE/BLOCK in 2019. Important nuance: he founded it BEFORE joining her lab, so it is not a Movement Lab spinout.
- **Course:** CS 348I Computer Graphics in the Era of AI (co-taught with Jiajun Wu)
- **Accessibility:** URL TRAP: profiles.stanford.edu/karen-liu is a DIFFERENT PERSON, an Earth Systems undergraduate. Use c-karen-liu.
- **Work fit 5/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **1** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **1**
- **Startup experience 2/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **1** · Student / lab founder pipeline **1** · Completed exit, clearance or productization **0**

> **How they can help you.** Peripheral to your thesis but worth one specific thing: she advises a doctoral student who founded a company and sold it to Block before starting the PhD, which is an unusual sequence and a live example of someone who did the startup first and the research second. Given that you are weighing exactly that ordering, that is a relevant conversation. REALab alumnus Zhanpeng He is also a postdoc with her and Jiajun Wu.

#### Silvio Savarese

*ADJUNCT Professor (since April 2021 - he left the tenured faculty) · Computer Science*

- **Lab:** None at Stanford - no lab, no courses, no advising listed — https://profiles.stanford.edu/silvio-savarese
- **Work:** Historically 3D scene understanding and robot perception; now enterprise AI productization.
- **Founded:** AIBEE - co-founded, Chief Scientist roughly 2018-2020, exited. ~$175M raised at a ~$1.0-1.2B valuation, though those figures are UNVERIFIED secondary. Vision Construction Monitoring LLC from his Michigan era, also UNVERIFIED.
- **Advisory / industry:** EVP AND CHIEF SCIENTIST, SALESFORCE (2021-present) - Einstein GPT, CodeGen, Agentforce. DIRECTOR ON THE BOARD OF SEA LIMITED (NYSE: SE) SINCE AUGUST 2024, confirmed on Sea's own governance page - the biggest board seat of anyone here. Member of the UN Scientific Panel on AI (2026).
- **Student-founded companies:** NONE CONFIRMED. Important conflation trap: Karpathy, Gebru and World Labs belong to FEI-FEI LI's lineage. He is married to her, which makes search engines merge them automatically. Do not attribute her students to him.
- **Course:** NONE. No classroom route at all.
- **Accessibility:** LEAST ACCESSIBLE PERSON IN THIS SET. Adjunct, no course, no advising, substantially employed at Salesforce.
- **Work fit 4/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **1** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 8/10** — Personally founded a company **2** · Concurrent industry exec role **2** · Board seats / formal advisory **2** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **2**

> **How they can help you.** The deepest corporate knowledge on this list - a real co-founding with an exit, an EVP and Chief Scientist role at Salesforce, and a public-company board seat at Sea Limited. If you want to understand how an AI capability becomes an enterprise product line and what a board actually asks about AI risk, he has lived both. The problem is purely access: adjunct status with no course and no advising means there is no natural route to him, so this is a warm-introduction target rather than a cold email, and probably a later-stage one once you have something to show.

#### Fei-Fei Li

*Sequoia Professor · Computer Science*

- **Also:** Co-Director, Stanford HAI; co-chairs the HAI advisory council with John Hennessy
- **Lab:** Stanford Vision and Learning Lab / HAI — https://profiles.stanford.edu/fei-fei-li
- **Work:** Spatial intelligence and world models - the layer that gives an embodied system a usable 3D understanding of a scene.
- **Founded:** WORLD LABS - founder. $5B valuation after closing $1B in February 2026; roughly $1.23B total raised. Autodesk put in $200M and took a strategic advisory role, alongside NVIDIA and AMD. Shipped Marble publicly in November 2025.
- **Advisory / industry:** Co-chairs the HAI advisory council. Previously Chief Scientist of AI/ML at Google Cloud.
- **Student-founded companies:** Extensive - the ImageNet and SVL lineage. Not individually re-verified in this pass.
- **Course:** Not verified for 2026-27 in this pass.
- **Accessibility:** Very low. Among the most in-demand people in the field.
- **Work fit 4/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 9/10** — Personally founded a company **2** · Concurrent industry exec role **2** · Board seats / formal advisory **1** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **2**

> **How they can help you.** Relevant to you mainly as a capital-flow datapoint rather than a reachable mentor. World Labs went from a $1B seed valuation in September 2024 to $5B in February 2026 selling spatial intelligence, with Autodesk, NVIDIA and AMD on the cap table - which tells you what the market will pay for the world-model layer beneath physical AI, and that it will pay before there is revenue. Her access route is institutional: HAI runs a corporate affiliates programme with a stated $550K 'HAI Wallet' of research tokens directable to a named faculty member, which is a funding mechanism worth understanding if you ever want industry money pointed at a Stanford project.

#### Iro Armeni

*Assistant Professor · Civil and Environmental Engineering*

- **Lab:** Gradient Spaces — https://gradientspaces.stanford.edu/
- **Work:** 3D scene understanding for the built environment.
- **Founded:** NOTHING - clean negative. Only pre-PhD architecture consulting.
- **Advisory / industry:** None found.
- **Student-founded companies:** None found.
- **Course:** CEE 247C Computer Vision for the Built Environment; CEE 329 AI in AEC
- **Accessibility:** 8 MS ADVISEES - good availability.
- **Work fit 4/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **1** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** One sharp and slightly painful lesson. She is a co-author of the S3DIS and 2D-3D-S indoor scene datasets, which became INDUSTRY-STANDARD BENCHMARKS used everywhere - and she holds ZERO EQUITY in any of it. That is the commons argument in a single career: build the measurement artifact the whole field depends on, capture none of the value, accumulate enormous citation influence instead. Before you commit to building a public replication ledger for embodied-AI claims, talk to someone who already did the equivalent and ask whether she would do it again.

#### Leonidas Guibas

*Paul Pigott Professor of Engineering · Computer Science*

- **Also:** EE by courtesy. SRC-affiliated.
- **Lab:** Geometric Computation Group — https://geometry.stanford.edu/
- **Work:** Geometric computation, shape analysis and 3D representation learning.
- **Founded:** Not probed in this pass.
- **Advisory / industry:** Not probed in this pass.
- **Student-founded companies:** Not probed in this pass, though his lineage in 3D deep learning is extensive.
- **Course:** Not verified in this pass.
- **Accessibility:** Not probed.
- **Work fit 4/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **1** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience: not scored** — deliberately left blank rather than set to zero, because this person's commercial record was not probed in this pass.

> **How they can help you.** Flagged rather than researched. He is on the SRC roster and is one of the most cited people in 3D geometric learning; both REALab PhD students Xiaomeng Xu and Yihuai Gao worked with him or his collaborators at Tsinghua before Stanford, so he sits upstream of that lab's talent pipeline. COMMERCIAL RECORD NOT PROBED - X left unscored rather than guessed.

### Materials, soft robotics & bio-integration

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Steven H. Collins** | Associate Professor, Mechanical Engineering | 7 | 0 | ME 104; ME 204 |
| **Renee Zhao** | Assistant Professor, Mechanical Engineering | 5 | 2 | ME 303 / MATSCI 333 Soft Composites and Soft Robotics |
| **Zhenan Bao** | K. K. Lee Professor; SITTING CHAIR of Chemic, Chemical Engineering | 4 | 10 | CHEMENG 164X / 464 Polymer Chemistry |
| **Sean Follmer** | Associate Professor, Mechanical Engineering | 4 | 2 | DESIGN 141 / 192 / 361 only in 2026-27 - no robotics lec |
| **Manu Prakash** | Associate Professor, Bioengineering | 3 | 10 | BIOE 271 FRUGAL SCIENCE |
| **Natalie Larson** | Assistant Professor, Mechanical Engineering | 3 | 0 | ME 321 / MATSCI 351 Multimaterial Additive Manufacturing |

#### Steven H. Collins

*Associate Professor · Mechanical Engineering*

- **Also:** Bioengineering by courtesy. Director of Undergraduate Studies, ME; Faculty Director, Product Realization Lab and making@stanford; Science Robotics editorial board.
- **Lab:** Stanford Biomechatronics Laboratory — https://biomechatronics.stanford.edu/
- **Work:** Exoskeletons and prostheses, and specifically HUMAN-IN-THE-LOOP OPTIMIZATION on exoskeleton emulator hardware - the field's benchmark method for tuning assistance to an individual.
- **Founded:** NO EXOSKELETON COMPANY. Specifically checked across three primary sources. DELIBERATELY UNSPUN-OUT.
- **Advisory / industry:** None found.
- **Student-founded companies:** None found.
- **Course:** ME 104; ME 204
- **Accessibility:** Good - Director of Undergraduate Studies for ME and Faculty Director of the Product Realization Lab, both outward-facing roles.
- **Work fit 7/10** — Physical AI / embodied core **2** · Touches your thesis **1** · RL / decision / estimation content **1** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **1**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** One narrow but genuinely useful reason: human-in-the-loop optimization is an EVALUATION method. He solved the problem of measuring, per individual and in real time, whether an intervention actually improved performance - on noisy physiological data where every measurement is expensive. That is structurally the same measurement problem you are attacking, in a field that got there first. And he chose not to commercialise the benchmark method of his field, which makes him the right person to ask why a researcher would deliberately decline to spin out.

#### Renee Zhao

*Assistant Professor · Mechanical Engineering*

- **Also:** Bioengineering and Materials Science by courtesy
- **Lab:** Soft Intelligent Materials Lab — https://zhaolab.stanford.edu/
- **Work:** Magnetically actuated millirobots and morphing structures - notably a magnetic milli-spinner for thrombectomy that reduces clot volume by over 95% in place.
- **Founded:** NO SPINOUT FOUND.
- **Advisory / industry:** None. Commercialisation runs through Stanford OTL plus an ARPA-H award of UP TO $27.2M OVER FIVE YEARS (August 2026), with PHILIPS, MEDTRONIC and TERUMO NEURO as partners.
- **Student-founded companies:** None found.
- **Course:** ME 303 / MATSCI 333 Soft Composites and Soft Robotics
- **Accessibility:** Good - assistant professor with a growing lab.
- **Work fit 5/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **1**
- **Startup experience 2/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **1** · Completed exit, clearance or productization **1**

> **How they can help you.** She is the cleanest example at Stanford of the ALTERNATIVE commercialisation model, and that is why she is worth understanding even though her research is far from yours. She has a technology with a spectacular clinical result and no company - the value is captured through Stanford OTL licences and a $27.2M ARPA-H award with Philips, Medtronic and Terumo Neuro as named partners. That is a route where the researcher keeps the research and the incumbents do the commercialising. Given that your own thesis faces a commons problem where the field has priced tooling at zero every time, a worked example of capturing value through licences and agency funding rather than equity is directly relevant.

#### Zhenan Bao

*K. K. Lee Professor; SITTING CHAIR of Chemical Engineering (2025-) · Chemical Engineering*

- **Also:** Materials Science, Chemistry and Bioengineering by courtesy. Director, eWEAR.
- **Lab:** Bao Research Group — https://baogroup.stanford.edu/
- **Work:** Electronic skin and stretchable electronics - the sensing substrate for tactile robotics and wearables.
- **Founded:** TWO, BOTH FROM HER LAB. C3NANO (2010) - silver nanowire transparent conductors; DuPont ACQUIRED its nanowire technology and business assets, completed 1 August 2024. PYRAMES / PyrAmes Health (2016, with CEO Xina Quan) - the Boppli neonatal blood-pressure monitor, which received FDA 510(k) CLEARANCE in September 2023.
- **Advisory / industry:** PyrAmes Advisor and Board of Directors; C3Nano board roughly 2011-2023; Dreyfus Foundation board; Advising Partner at Fusion VC (medium confidence). PyrAmes' ~$6M funding figure is Crunchbase-only and UNVERIFIED.
- **Student-founded companies:** C3Nano and PyrAmes both originated in her lab.
- **Course:** CHEMENG 164X / 464 Polymer Chemistry
- **Accessibility:** Limited - she is the sitting ChemE department chair.
- **Work fit 4/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **1**
- **Startup experience 10/10** — Personally founded a company **2** · Concurrent industry exec role **2** · Board seats / formal advisory **2** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **2**

> **How they can help you.** Tied for the highest commercial score here, and the most complete commercialisation education available at Stanford: she is the only person who has taken lab research through an ACQUISITION (DuPont, 2024) and separately through FDA CLEARANCE (510k, 2023) out of the same group. If you ever build hardware or a regulated device, she knows the Stanford OTL licence-to-clearance path end to end, which is knowledge almost nobody has. Her research is only loosely coupled to your thesis - tactile sensing is adjacent to the compliance problem, not central to the measurement problem - so treat her as a process mentor rather than a technical one, and note the department-chair calendar.

#### Sean Follmer

*Associate Professor · Mechanical Engineering*

- **Also:** CS by courtesy
- **Lab:** SHAPE Lab — https://shape.stanford.edu/
- **Work:** Shape-changing displays, tactile interfaces and haptic hardware.
- **Founded:** NOTHING - clean negative.
- **Advisory / industry:** None found.
- **Student-founded companies:** SUBTLE COMPUTING, founded by his alumna SAVANNAH COFER - $6M seed, November 2025, voice isolation. DIZZYEX, with alumna DANYANG FAN as CEO.
- **Course:** DESIGN 141 / 192 / 361 only in 2026-27 - no robotics lecture course this year.
- **Accessibility:** Moderate; the design courses are the route.
- **Work fit 4/10** — Physical AI / embodied core **2** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **1**
- **Startup experience 2/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **2** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** Two recent student-founded companies, one with a fresh $6M seed as of November 2025, which makes him a current rather than historical data point on how a hardware-interface lab produces founders. His own research is off your axis. Worth noting that both of his founder alumni are women who founded in adjacent sensing markets rather than in haptics itself - which is a useful observation about where hardware-interface skills actually find a market.

#### Manu Prakash

*Associate Professor · Bioengineering*

- **Also:** Oceans by courtesy; Senior Fellow, Woods Institute; Core Leadership, Stanford Center for Innovation in Global Health
- **Lab:** Prakash Lab — https://prakashlab.stanford.edu/
- **Work:** Frugal science - building scientific instruments at radically low cost and distributing them at scale.
- **Founded:** FOLDSCOPE INSTRUMENTS (December 2015, with his PhD student Jim Cybulski) - over 1.7 MILLION UNITS shipped. CEPHLA - co-founder with CEO Hongquan Li, building the Squid and Octopi automated microscopes; year and funding undisclosed.
- **Advisory / industry:** Boards of PIVOT, Ciencia Puerto Rico and Jasper Ridge. His PlanktoScope / FairScope role is UNVERIFIED.
- **Student-founded companies:** Both Foldscope and Cephla are student-origin companies.
- **Course:** BIOE 271 FRUGAL SCIENCE
- **Accessibility:** Moderate. The Frugal Science course is a genuine open door.
- **Work fit 3/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **0**
- **Startup experience 10/10** — Personally founded a company **2** · Concurrent industry exec role **2** · Board seats / formal advisory **2** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **2**

> **How they can help you.** Off your research axis entirely, and on your manufacturing axis exactly. He has shipped over 1.7 million units of a scientific instrument by designing for distributed low-cost manufacturing - which is the discipline that decides whether a robotics hardware company survives contact with its own bill of materials. Your market map already concluded that collapsing integration cost is a STRONG opportunity and that Rethink Robotics died twice on it. He is the person at Stanford who has most thoroughly solved a cost-collapse problem in physical goods. Take the course if you have a quarter to spare.

#### Natalie Larson

*Assistant Professor · Mechanical Engineering*

- **Also:** Materials Science by courtesy
- **Lab:** Larson Lab — https://larsonlab.stanford.edu/
- **Work:** Multimaterial additive manufacturing with subvoxel control, for structural batteries and soft robotics.
- **Founded:** NOTHING.
- **Advisory / industry:** None. ONR Young Investigator, 2026.
- **Student-founded companies:** None.
- **Course:** ME 321 / MATSCI 351 Multimaterial Additive Manufacturing
- **Accessibility:** Good - newly appointed. Her exact Stanford start date is UNVERIFIED because her CV PDF would not parse.
- **Work fit 3/10** — Physical AI / embodied core **1** · Touches your thesis **0** · RL / decision / estimation content **0** · Commercially proximate artifacts **1** · Contact-rich / manipulation blocker **1**
- **Startup experience 0/10** — Personally founded a company **0** · Concurrent industry exec role **0** · Board seats / formal advisory **0** · Student / lab founder pipeline **0** · Completed exit, clearance or productization **0**

> **How they can help you.** The furthest from your thesis of anyone on this list, included for completeness of the CS/EE-adjacent robotics picture. If a hardware direction ever becomes relevant, subvoxel multimaterial printing is how soft actuators and structural batteries get made, and she is newly appointed with an empty calendar.

### Operators & commercialisation

| Faculty | Rank / dept | Work fit | Startup exp | Course |
|---|---|---|---|---|
| **Steve Cousins** | Executive Director, Stanford Robotics Center, Stanford Robotics Center | 6 | 10 | NONE. Access is through the Stanford Robotics Center its |
| **The cross-domain and clinical tail of the SRC roster** | Various, Oceans, Radiology, Surgery, Medicine,  | — | — | Not probed. |

#### Steve Cousins

*Executive Director, Stanford Robotics Center (STAFF, not faculty) · Stanford Robotics Center*

- **Also:** Founding board member, Open Source Robotics Foundation
- **Lab:** Stanford Robotics Center — https://robotics.stanford.edu/
- **Work:** Not a research programme - an operating career. Service robotics, open-source robotics infrastructure.
- **Founded:** SAVIOKE (2013) - co-founder and CEO, later CTO when it rebranded to Relay Robotics in 2022. Roughly $23M+ disclosed. Delivery robots for hotels and hospitals.
- **Advisory / industry:** Ex-CEO and President of WILLOW GARAGE, the birthplace of ROS, the PR2 and TurtleBot - which produced EIGHT SPINOUTS including Industrial Perception and Redwood Robotics, both acquired by Google. Founding board member of the Open Source Robotics Foundation. Previously senior manager at IBM Almaden and senior staff at Xerox PARC.
- **Student-founded companies:** n/a - not a faculty member.
- **Course:** NONE. Access is through the Stanford Robotics Center itself and the STVP / Entrepreneurial Thought Leaders speaker series.
- **Accessibility:** No course and no advising, but he runs the Center - so a request routed through SRC reaches him rather than going around him.
- **Work fit 6/10** — Physical AI / embodied core **2** · Touches your thesis **1** · RL / decision / estimation content **0** · Commercially proximate artifacts **2** · Contact-rich / manipulation blocker **1**
- **Startup experience 10/10** — Personally founded a company **2** · Concurrent industry exec role **2** · Board seats / formal advisory **2** · Student / lab founder pipeline **2** · Completed exit, clearance or productization **2**

> **How they can help you.** THE MOST IMPORTANT NAME IN THIS ENTIRE DOCUMENT FOR THE QUESTION YOU ACTUALLY ASKED, and he is not faculty, which is why nobody would have pointed you at him. You asked who can explain the robotics industry and its constraints. He founded a service-robotics company, raised for it, handed off the CEO seat, and ran Willow Garage - the organisation that gave ROS away for free and spun out eight companies, two of which Google bought. That means he has personally lived BOTH sides of your central strategic problem: he has watched an organisation create enormous industry value by open-sourcing its core software and capture very little of it, which is precisely the commons argument that kills your evaluation-tooling business case. Ask him why Willow Garage open-sourced ROS, what it cost, and what he would do differently. No other person at Stanford can answer that from the inside.

#### The cross-domain and clinical tail of the SRC roster

*Various · Oceans, Radiology, Surgery, Medicine, CEE, Bioengineering*

- **Lab:** Stanford Robotics Center (42-faculty roster) — https://robotics.stanford.edu/
- **Work:** The SRC roster also includes Ehsan Adeli (CS and Psychiatry), Karen Casciotti, Fiorenza Micheli and Krish Seetah (Oceans), Brooke Jeffrey (Radiology), Carla Pugh (Surgery), Le Cong and Sheng Xu (Medicine), Scott Delp (Bioengineering), Martin Fischer (CEE) and Bernie Roth (ME, emeritus).
- **Founded:** NOT INDIVIDUALLY PROBED - deliberately out of scope.
- **Advisory / industry:** Not probed.
- **Student-founded companies:** Not probed.
- **Course:** Not probed.
- **Accessibility:** n/a

> **How they can help you.** Listed for completeness and honesty rather than padded with scores. These eleven are on the Stanford Robotics Center's own 42-faculty roster, which is itself the cleanest evidence for your cross-domain thesis - a robotics centre whose membership spans Oceans, Pathology, Surgery, Radiology, Chemical Engineering and Civil Engineering. But they are clinical or domain-application faculty rather than physical-AI-core, and a previous pass established that keyword classification in this group runs at only about two-thirds precision because clinical faculty trip on 'robotic surgery'. Rather than score them on thin evidence, I am naming them so you know the boundary of what was researched. Carla Pugh (surgical skill assessment) and Scott Delp (movement biomechanics) are the two most likely to repay a closer look if measurement of human performance becomes relevant.

---

## Method, sources and what is missing

### Provenance

Rosters come from each lab's own people page, fetched 13-14 September 2026. REALab's roster and its 91-paper publication list are embedded as JavaScript literals, so the raw HTML must be read directly — a summarising fetch returns an empty shell. All 60 abstracts were fetched from their arXiv abstract pages and are quoted **verbatim**; none is paraphrased and none was substituted. The arXiv API rate-limited hard (HTTP 429), so the later abstracts came from `arxiv.org/abs` pages instead. Faculty ranks, courses and advising loads come from profiles.stanford.edu, which proved to be the best single primary source for those fields. The Stanford Robotics Center's own 42-faculty roster set the boundary of the faculty sweep.

One roster correction worth recording: an earlier pass described IRIS as having 13 PhD students, but the lab page lists 12 by name, so the count here is 32 members excluding Finn rather than 33. REALab is 19 excluding Song.

### What is missing, stated plainly

- **Seven of the 51 members are unscored** because no public research record exists: IRIS MS students Ayush Agarwal, Ron Polonsky, Mikul Rai and Elijah Song; IRIS undergraduates Yi Du and Eric Liang; and REALab visiting student Calvin Luo, whose page presented an SSL certificate this machine could not validate. Assigning a number to an absence would be inventing data.
- **IRIS emails are almost entirely absent** because they are genuinely not published. Nothing was pattern-guessed.
- **Gordon Wetzstein and Leonidas Guibas** are flagged but not researched; their startup score is left unscored rather than set to zero. **Mark Horowitz** is carried from the earlier Stanford census rather than freshly probed.
- **Shuran Song's own founding record was never individually probed** the way the other 32 faculty were, so "none surfaced" is not the same as "confirmed none".
- **Eleven clinical and cross-domain SRC faculty** are named but unscored. A previous pass established that keyword classification in that group runs at only about two-thirds precision because clinical faculty trip on "robotic surgery".
- **Two REALab papers have no arXiv record at all** — UMI-Underwater and "One Demo is Worth a Thousand Trajectories" are published only as a project page or a PDF on the lab's own site, so their abstracts are blank by choice.
- Several faculty bios claim advisory roles without naming companies (Okamura, Pavone, Lall, Boyd). Those are marked UNVERIFIED rather than counted.

### The rubric in full

```
# Scoring rubric — two scores, ten auditable components

Both scores are the sum of five 0-2 components, so every /10 decomposes.
Nothing here is a vibe; if you disagree with a score, you can point at the component.

NOTE ON HOUSE RULES: README rule 1 says "no ambition scores, no recommended verdicts."
These scores exist because they were explicitly requested on 2026-09-13. The rubric is
published with them so the score stays auditable rather than becoming a verdict.

## Score 1 — STARTUP RELEVANCE of their work /10 (blended)

Blended deliberately: the narrow surviving thesis (non-regression certification for OTA
policy updates) is only two of the five components. The other three ask the broader
question — could this line of work become or feed a venture-scale robotics company at all.
So a person can score high by attacking the measurement problem OR by attacking the
physical capability blocker, which are different bets.

S1 BUYER ALREADY SPENDING BADLY (0-2)   [thesis axis]
  2 = a named buyer demonstrably spends on this and gets poor measurement for it
      (TRI: 1,800 real + 47,000 sim rollouts, CIs still 20-30pp wide at n=50;
       PI RECAP: 300 traj/iteration to claim a 5pp effect needing ~1,570/arm)
  1 = plausible buyer, no documented misspend
  0 = research-internal, or the buyer is in a different industry (LLM cos, not robotics)

S2 ATTACKS A VERIFIED CAPABILITY CEILING (0-2)   [capability axis]
  2 = directly on a documented blocker: insertion/compliance (Gemini Robotics 2 unscrews a
      bulb 92%, screws it back 36% on the same model and hand), deformables, long-horizon
      reliability, sub-mm force-controlled assembly
  1 = adjacent
  0 = no physical blocker in scope

S3 INCUMBENT WHITESPACE (0-2)
  2 = no well-funded incumbent, not commoditised
  1 = contested
  0 = occupied (Applied Intuition $15B for scenario V&V; Foretellix $135M) OR priced at zero
      by the commons (TRI open-sourced lbm_eval, Berkeley open-sourced RoboArena — the field
      has given eval tooling away every single time)

S4 TRANSFERABILITY OUT OF THE LAB (0-2)
  2 = reproducible without privileged data, fleet, or compute
  1 = needs moderate hardware or compute
  0 = effectively requires Physical Intelligence / NVIDIA / DeepMind scale

S5 DEPLOYMENT PROXIMITY (0-2)
  2 = the artifact is something a reliability engineer, actuary, or VP of deployment
      could pick up and use
  1 = one step removed
  0 = pure science

## Score 2 — ALIGNMENT & EASE OF ENTRY for you /10

Deliberately weighted toward "can you actually start here", not "is this your comfort zone",
because you said learning matters more than fit.

A1 RL / ML OVERLAP (0-2)
  2 = core RL: value learning, critics, off-policy, reward design
  1 = ML but a different subfield (VLA, imitation, vision)
  0 = distant (NLP retrieval, medical vision)

A2 SIGNAL-PROCESSING / STATISTICS OVERLAP (0-2)
  2 = estimation, inference, variance, sampling, denoising, control, information content
      — the part of your background that is genuinely rare in this field
  1 = some
  0 = none

A3 HARDWARE BARRIER, INVERTED (0-2)
  2 = sim-only or offline data; you can start this week with no robot time
  1 = modest real-robot needs
  0 = gated on privileged hardware (da Vinci/dVRK, humanoid with five-finger hands, a fleet)

A4 ROOM BESIDE THEM (0-2)
  2 = thin or newly-opened thrust; a newcomer arrives alongside, not behind
  1 = growing, some space
  0 = single-person dominated at a cadence you cannot match
      (Perry Dong first-authors 8 of ~11 papers in his thrust)

A5 PERSON IS REACHABLE AND WILL STILL BE HERE (0-2)
  2 = present for 2+ more years AND has demonstrably co-authored with MS students
  1 = neutral, or present but unproven with MS students
  0 = departing, final-year, on the job market, or primarily at a company

## Columns mean "the work", not "the person"
S is scored on the research line, so a second-author MS student on a high-relevance paper
inherits a high S. That is intentional — it tells you which ROOM to walk into. A5 is where
seniority and availability enter.
```

