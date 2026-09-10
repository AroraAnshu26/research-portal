# Physical Intelligence: A Chronological Review of the Machine Learning Frontier

*A literature survey covering roughly 1957 to 2026, written for a reader with graduate-level control, estimation and optimization background who wants to know where robot learning actually is, how it got there, and which open problems are worth a career. Every non-obvious claim carries an inline citation to a primary source. Company self-reports are labeled as such throughout, and live disputes in the literature are presented as disputes rather than resolved.*

---

## Executive Summary

**The one-paragraph version.** The field that now calls itself physical intelligence is the end state of a seventy-year process in which each idealizing assumption of classical optimal control was removed in turn: known dynamics, known cost, observed state, Markov state, fixed task, unlimited interaction. As of 2026 the dominant artifact is the generalist vision-language-action policy, a pretrained vision-language model with a generative action head that emits chunks of roughly fifty future actions, trained by conditional flow matching or denoising diffusion on pooled multi-robot demonstration data, and post-trained with machinery borrowed almost wholesale from language-model alignment. The technical consensus is narrower than the press suggests, the empirical claims are weaker than the valuations imply, and the two things most likely to be rate-limiting are not model architecture at all: they are the absence of any measured scaling law for robot data, and the fact that real-robot evaluation is statistically underpowered to the point where most published comparisons cannot resolve the differences they report.

**What actually changed between 2015 and 2026, stated as a mechanism.** Three substitutions did the work. Reinforcement learning was substituted by supervised conditional generative modeling, because value-based methods are the one part of the stack that does not reliably improve with more data and compute, whereas behavior cloning does. Per-timestep action prediction was substituted by action chunking, which is the single highest-leverage trick in modern robot learning: predicting $H \approx 50$ actions at once suppresses both compounding covariate shift and the non-Markovian noise of human teleoperators, and it is why methods that look theoretically naive outperform methods that look principled. And unimodal regression was substituted by generative action heads, because the conditional mean of a multimodal demonstration distribution is typically not a valid action, which is the precise reason mean-squared-error behavior cloning fails on contact-rich tasks and diffusion or flow-matching policies do not.

**Where the mathematics is genuinely load-bearing.** Four objects recur across otherwise unrelated subfields, and recognizing them collapses a great deal of the literature. The first is the sup-norm contraction of the Bellman operator, which is what makes dynamic programming tractable and whose failure under function approximation, off-policy sampling and bootstrapping is the deadly triad that has haunted deep reinforcement learning since 2013. The second is the intractable partition function, which appears as $Z_\theta$ in maximum-entropy inverse reinforcement learning, is eliminated by sampled contrast in guided cost learning, and is eliminated again by exact cancellation in direct preference optimization, the same mathematical move performed twice by the same research lineage a decade apart. The third is pessimism, the formal content of offline reinforcement learning, expressed either as a conservative penalty on out-of-support actions or as a single-policy concentrability coefficient, and it is what converts an unusable batch algorithm into one with a lower-bound guarantee. The fourth is the horizon-squared error amplification that shows up as $O(\epsilon T^2)$ compounding error in imitation learning and as $O(\epsilon H^2)$ value error in the simulation lemma for learned models, which is one phenomenon wearing two names and is the reason both long behavior-cloning rollouts and long world-model rollouts fail in the same way.

**What is not true, despite being widely repeated.** Meta-learning was not superseded by scale so much as relocated: the bilevel optimization of model-agnostic meta-learning is now performed implicitly by large-scale conditional prediction, which is what in-context learning is, and the 2020 finding that most of MAML's benefit came from feature reuse rather than rapid learning was the early warning of exactly that. Emergent abilities are contested and may in substantial part be an artifact of discontinuous metrics. The published Chinchilla scaling fit has been challenged on reanalysis. Whether reinforcement learning with verifiable rewards expands a model's reasoning boundary or merely sharpens sampling within it is an open dispute, not a settled result. And the textbook claim that interaction is necessary to escape the quadratic-horizon penalty of behavior cloning has been revised: recent minimax analysis shows behavior cloning is optimal when the accounting is done in trajectories rather than transitions, which matters because the entire modern robotics stack is behavior cloning.

**The two hard numbers you should carry away.** On evaluation: with $n$ trials per arm and success rate $p$, the binomial standard error is $\sqrt{p(1-p)/n}$, so at $n=20$ and $p=0.5$ it is about 11.2 percentage points, the minimum detectable difference between two policies is roughly 44 points, and resolving a real 10-point difference needs on the order of 390 rollouts per arm. Almost no paper in robot learning runs that many. On data: frontier language models train on the order of $10^{13}$ tokens, while the largest pooled robot corpus, Open X-Embodiment, holds roughly $10^6$ episodes across 22 embodiments, a gap of about seven orders of magnitude in raw scale, and unlike text there is no verified power law telling you what the next order of magnitude buys.

**Why Chelsea Finn's record is the best single map of the field.** Read chronologically, her publications amortize one hand-specified quantity after another: representations became learned feature points, costs became learned energies, dynamics became video predictors, adaptation rules became learned initializations, task identity became an inferred latent, datasets became shared corpora, and the policy prior became a pretrained vision-language model. The naive thesis that the program simply deletes human structure fails on the last five years, because chunking, discrete-cosine action tokenizers, explicit two-system hierarchy and advantage conditioning are all hand-designed structure being added back. The thesis that survives the record is that structure migrates from the objective to the interface: human specification of *what to optimize* is progressively deleted, while human specification of *how data and computation enter the model* is progressively elaborated. Underneath every era, the invariant target is distribution shift at deployment, which is why her language-model work on preference optimization, model editing and factuality is not a detour but the same problem in another modality.

**The strategic reading.** The load-bearing bet behind current robotics valuations is that generalist policies plus deployment data loops will produce the same compounding returns that internet-scale pretraining produced for language. The disanalogy that should worry you is the verifier: mathematics and code post-training work because correctness is checkable by a program, and the physical world supplies no such oracle, so reinforcement learning with verifiable rewards does not import cleanly into manipulation. The most promising research directions follow directly from the gaps rather than from fashion, and the four I would defend are a closed-loop distribution-shift theory that covers chunked asynchronous policies, statistically valid cheap evaluation, learned verifiers and self-critique for physical tasks, and latent-action learning from human video at scale. My reasoning for each, and the strongest counterargument to each, is in [Section 11](#11-closing-what-you-now-know-what-to-study-next-and-my-recommendations).

---

## Index

- [Executive Summary](#executive-summary)
- [Two Maps: The Timeline and the Institutions](#two-maps-the-timeline-and-the-institutions)
- [How to Read This in 45 Minutes](#how-to-read-this-in-45-minutes)
- [0. The Concept Map: What the Core Fields Are, and How They Relate](#0-the-concept-map-what-the-core-fields-are-and-how-they-relate)
- [Notation, and the Prerequisites This Review Assumes](#notation-and-the-prerequisites-this-review-assumes)
- [1. Before 2015, Part I: Decision Theory, Optimal Control, and the Reinforcement Learning Canon](#1-before-2015-part-i-decision-theory-optimal-control-and-the-reinforcement-learning-canon)
- [2. Before 2015, Part II: Statistical Learning Theory, Representation, and Learning to Learn](#2-before-2015-part-ii-statistical-learning-theory-representation-and-learning-to-learn)
- [3. Meta-Learning: MAML, Its Descendants, and Its Absorption into Pretraining](#3-meta-learning-maml-its-descendants-and-its-absorption-into-pretraining)
- [4. Deep Reinforcement Learning, 2013 to 2021: From Atari to the Offline Turn](#4-deep-reinforcement-learning-2013-to-2021-from-atari-to-the-offline-turn)
- [5. Physical Intelligence Proper: From Guided Policy Search to Vision-Language-Action Models](#5-physical-intelligence-proper-from-guided-policy-search-to-vision-language-action-models)
- [6. World Models, Video Prediction, and Self-Supervised Representations for Control](#6-world-models-video-prediction-and-self-supervised-representations-for-control)
- [7. Learning Theory at the Frontier: Overparameterization, Scaling Laws, and Distribution Shift](#7-learning-theory-at-the-frontier-overparameterization-scaling-laws-and-distribution-shift)
- [8. Sequence Models and Post-Training: The Machinery Robotics Is Now Importing](#8-sequence-models-and-post-training-the-machinery-robotics-is-now-importing)
- [9. The Chelsea Finn Program: One Researcher's Arc as a Map of the Field](#9-the-chelsea-finn-program-one-researchers-arc-as-a-map-of-the-field)
- [10. Evaluation, Data, Hardware, and the Live Open Problems](#10-evaluation-data-hardware-and-the-live-open-problems)
- [11. Closing: What You Now Know, What to Study Next, and My Recommendations](#11-closing-what-you-now-know-what-to-study-next-and-my-recommendations)

---

## Two Maps: The Timeline and the Institutions

**What does the whole chronology look like on one page?**

The following timeline marks the papers that changed what everyone else worked on next, rather than the papers with the highest citation counts. Read down the left column for the theory-and-algorithms spine and down the right column for the embodied spine; the interesting thing is how often they exchange material.

```
YEAR   THEORY / ALGORITHMS SPINE                 EMBODIED / ROBOT SPINE
────   ─────────────────────────────────────      ──────────────────────────────────────
1957   Bellman, dynamic programming
1960   Howard, policy iteration
1965   Astrom, POMDP belief state
1970s  Sondik alpha-vectors                       Jacobson & Mayne, DDP
1984   Valiant, PAC                               (LQR/LQG industrial practice)
1986   Rumelhart-Hinton-Williams, backprop
1988   Sutton, TD(lambda)                         1989 Pomerleau, ALVINN
1992   Watkins-Dayan Q-learning
       Williams, REINFORCE
1995   Baird counterexample, deadly triad
1996   Bertsekas-Tsitsiklis, neuro-DP             1998 Thrun-Burgard-Fox, prob. robotics
1999   Sutton et al. policy gradient thm
       options / SMDPs
2000   Baxter, inductive bias learning
2002   Kakade-Langford CPI                        Auer UCB, E3, R-MAX
2004                                              Abbeel & Ng, apprenticeship learning
2005   Todorov & Li, iLQG                         Ernst, fitted Q iteration
2008   Ziebart, MaxEnt IRL                        Peters & Schaal, natural actor-critic
2011                                              Ross-Gordon-Bagnell, DAgger
                                                  Deisenroth-Rasmussen, PILCO
2012   AlexNet
2013   Kingma-Welling VAE                         Levine & Koltun, guided policy search
       Mnih et al., DQN
2014   Goodfellow GAN, Adam, attention
2015   Schulman TRPO                              Levine-Finn-Darrell-Abbeel, visuomotor
2016   Finn-Goodfellow-Levine video pred.         Finn-Levine-Abbeel guided cost learning
       Vinyals matching nets                      Pinto-Gupta / Levine grasping at scale
2017   PPO, Prototypical Networks                 MAML; one-shot visual imitation
       Transformer                                Tobin domain randomization
2018   SAC, TD3, BERT                             QT-Opt; Dactyl; DAML
       Ha-Schmidhuber world models                Florence dense object nets
2019   Dreamer/PlaNet, iMAML, PEARL               ANYmal legged RL; RoboNet
       BCQ, offline RL diagnosis
2020   GPT-3 in-context learning                  MOPO; RMA precursors
       CQL, MuZero, group DRO, NTK-era theory
2021   IQL, Decision Transformer, WILDS           BC-Z; Implicit BC; RMA; BridgeData
       Chinchilla precursors, Kaplan laws
2022   MAE, InstructGPT RLHF, chain-of-thought    RT-1; R3M; VC-1
2023   DPO; LLaMA; DreamerV3                      ACT/ALOHA; Diffusion Policy; RT-2
                                                  Open X-Embodiment / RT-X
2024   o1 test-time compute; Snell scaling        pi_0; OpenVLA; DROID; Octo; FAST
       From r to Q*                                Mobile ALOHA; SIMPLER
2025   DeepSeek-R1 / GRPO; V-JEPA 2               pi_0.5; Hi Robot; real-time chunking
                                                  Gemini Robotics; RoboArena; pi*_0.6
2026   RLVR boundary dispute                      pi_0.7; Cosmos Policy; MemER; Ctrl-World
```

**Who works on what, and where?**

Institutional specialization is real and it is worth knowing before you choose an advisor or a collaborator, because the same word means different things in different buildings.

```
BERKELEY (BAIR / RAIL, Levine, Abbeel, Malik, Pathak-lineage, Bartlett, Recht, Hardt)
    Owns: offline RL formalism (BCQ, CQL, IQL), SAC, TRPO/PPO, sim-to-real
    adaptation (RMA), generalization theory, test-time training.
    Style: algorithmic invention, then scale it until it breaks.

STANFORD (IRIS, Finn; REALab, Shuran Song; NLP, Manning/Liang; theory, Ma/Candes)
    Owns: meta-learning, action chunking (ACT/ALOHA), DPO, robustness
    benchmarks (WILDS, Wild-Time), evaluation protocols (RoboArena), low-cost
    data collection (UMI), memory and world-model control (MemER, Ctrl-World).
    Style: identify the binding constraint, then build the dataset or benchmark
    that exposes it.

GOOGLE DEEPMIND (Robotics; Hafner; Silver-lineage)
    Owns: value-equivalent models (MuZero), Dreamer line, the RT-series and
    Gemini Robotics, ALOHA Unleashed. Style: largest available compute and
    fleet, applied to generalist policies.

PHYSICAL INTELLIGENCE (Hausman, Levine, Finn, Ichter, Groom; founded 2024)
    Owns: the pi-series (pi_0, FAST, pi_0.5, Hi Robot, real-time chunking,
    pi*_0.6/Recap, pi_0.7). Style: vertically integrated generalist policy
    plus deployment data loop. Caveat: most headline results are company
    self-reports.

COLUMBIA / TOYOTA RESEARCH (Song before Stanford, Chi, Burchfiel, Tedrake)
    Owns: Diffusion Policy, UMI hand-held data collection, large behavior
    models with blind A/B evaluation discipline.

CMU (Pathak, Gupta, Bagnell-lineage) . self-supervised interaction, DAgger
    heritage, curiosity and exploration.
MIT (Agrawal, Tedrake, Torralba, Adelson-lineage) . contact and geometry,
    tactile sensing, dataset-bias critique.
META FAIR (LeCun, Ballas) . JEPA line, DINO features, V-JEPA world models.
NVIDIA (GEAR, Fan; Cosmos) . simulation at scale, GR00T, world foundation models.
ETH ZURICH RSL (Hutter) . legged locomotion via massively parallel sim RL.
UCSD (Su, Hansen, Wang) . TD-MPC line, ManiSkill benchmarks.
UT AUSTIN / GEORGIA TECH / TSINGHUA / SHANGHAI AI LAB . LIBERO, EgoMimic,
    RDT and the fast-growing open VLA ecosystem.
```

The practical use of that second map is to read papers with the institution in mind, because the same result means different things depending on who produced it and under what incentives. A benchmark from a group that also builds the benchmark deserves more scrutiny than an independent replication, a capability claim from a company with a funding round in progress deserves more scrutiny than a peer-reviewed ablation, and a negative result from a group with the fleet to run it properly is often more informative than a positive result from a group without one.

---

## How to Read This in 45 Minutes

**What is the honest length of this document?**

You asked for a 45-minute read and this is longer, around 35,000 words including mathematics, which is a two-hour to three-hour careful read. I chose not to cut verified derivations and primary-source numbers to hit the time target, because the compression that would have required is exactly the compression that turns a survey into a listicle. Instead the document is built so that a short pass is a real option rather than a compromise.

**What is the 45-minute path?**

Read the [Executive Summary](#executive-summary) and both maps above, which you have now done, then read [Section 0](#0-the-concept-map-what-the-core-fields-are-and-how-they-relate) in full for the assumption-relaxation frame. Next, read the six construct primers in [Notation and Prerequisites](#notation-and-the-prerequisites-this-review-assumes) unless diffusion models, flow matching, the ELBO and attention are already second nature to you, and in either case read the symbol-collision table at the end of it, because two overloaded symbols cause more first-reading confusion in this document than anything conceptual. Skip Sections 1 and 2 unless a bound surprises you later, since they are reference material you will want when reading papers rather than narrative. Read [Section 5](#5-physical-intelligence-proper-from-guided-policy-search-to-vision-language-action-models) in full, because it is where the field currently is. Read [Section 9](#9-the-chelsea-finn-program-one-researchers-arc-as-a-map-of-the-field) in full, because it is the densest single map of how the threads connect. Then read [Section 10](#10-evaluation-data-hardware-and-the-live-open-problems) and [Section 11](#11-closing-what-you-now-know-what-to-study-next-and-my-recommendations) for the open problems and the recommendations. That is roughly 45 to 55 minutes and it gets you the argument.

**What do the other sections give you when you come back?**

Sections 1 and 2 are the vocabulary and the bounds that modern papers assume silently, and they are the right thing to read the week before a qualifying exam or before your first paper in the area. Section 3 explains why meta-learning matters even though it is no longer fashionable, which is directly relevant if you intend to work with Finn. Section 4 is the reinforcement learning background you need to understand why the field abandoned it and what would have to change for it to come back. Section 6 is world models and representation learning, the most likely source of the next architectural shift. Section 7 is the theory frontier and the section most aligned with an estimation and signal-processing background, since it is largely random-matrix asymptotics, concentration and distribution-free inference. Section 8 is the post-training machinery, which is the fastest-moving import into robotics.

---

## 0. The Concept Map: What the Core Fields Are, and How They Relate

**Why start with a taxonomy rather than a history?**

You asked for a list of the core concepts in the way that "reinforcement learning" or "learning theory" are core concepts, and there is a reason to build that list before any chronology. The field does not actually decompose into topics; it decomposes into assumptions that someone relaxed. Every named subfield below is best understood as the answer to the question "what happens if we stop assuming X?" Once you see which assumption each field attacks, the chronology stops being a list of papers and becomes a single argument unfolding over roughly seventy years, which is how this review is organized.

The frame worth carrying through the whole document is this. Classical optimal control assumed that you know the dynamics, you know the cost, you observe the state, the state is Markov, the task is fixed, and you get unlimited interaction. Almost everything since has been the systematic removal of those assumptions, and "physical intelligence" is the name for what happens when you try to remove all of them at once, on real hardware, with expensive data.

```
CLASSICAL OPTIMAL CONTROL   (known dynamics, known cost, observed Markov state,
                             fixed task, unlimited interaction, given state vector)
        |
        |-- drop "known dynamics" ......... system identification, model-based RL,
        |                                   world models                    [Sec 1, 4, 6]
        |-- drop "known cost" ............. inverse RL, imitation learning,
        |                                   preference learning, RLHF       [Sec 2, 8]
        |-- drop "observed state" ......... POMDPs, filtering, belief-state
        |                                   methods, latent-state models    [Sec 1, 6]
        |-- drop "Markov state" ........... history-dependent policies,
        |                                   sequence models, memory         [Sec 8]
        |-- drop "fixed task" ............. multi-task learning, meta-learning,
        |                                   goal conditioning, generalist
        |                                   policies                        [Sec 3, 5]
        |-- drop "unlimited interaction" .. offline RL, batch learning,
        |                                   sample-complexity theory        [Sec 4, 7]
        \-- drop "given state vector" ..... representation learning,
                                            self-supervised pretraining,
                                            robot perception                [Sec 2, 6]
```

**What are the core concept families, stated compactly?**

The following is the working list. Each entry names the field, the assumption it attacks, its central mathematical object, and where in this review it is treated. Read this list first and the rest of the document becomes navigable in any order.

*Decision and control theory.* Attacks the question of how to act optimally over time at all. Central object: the Bellman equation $V^*(s) = \max_a \big[ r(s,a) + \gamma \, \mathbb{E}_{s' \sim P(\cdot|s,a)} V^*(s') \big]$, together with the fact that the operator on the right-hand side is a $\gamma$-contraction in the sup norm, which is the single technical fact that makes the entire field computationally tractable. Treated in [Section 1](#1-before-2015-part-i-decision-theory-optimal-control-and-the-reinforcement-learning-canon).

*Reinforcement learning.* Attacks "known dynamics" and "known cost" at once, by learning from sampled interaction instead of from a model. Central objects: the temporal-difference error $\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)$, and the likelihood-ratio policy gradient $\nabla_\theta J = \mathbb{E}\big[\nabla_\theta \log \pi_\theta(a|s) \, Q^\pi(s,a)\big]$. It has two branches, value-based and policy-based, which have never fully merged. Treated in [Section 1](#1-before-2015-part-i-decision-theory-optimal-control-and-the-reinforcement-learning-canon) and [Section 4](#4-deep-reinforcement-learning-2013-to-2021-from-atari-to-the-offline-turn).

*Statistical learning theory.* Attacks the question of when fitting data implies predicting new data. Central object: uniform convergence in the shape $R(h) \le \hat{R}(h) + \mathrm{complexity}(\mathcal{H})/\sqrt{n}$, plus the succession of capacity measures (VC dimension, Rademacher complexity, margins, weight norms) that instantiate the middle term. Its modern crisis is that every classical capacity measure is vacuous for the models that actually work. Treated in [Section 2](#2-before-2015-part-ii-statistical-learning-theory-representation-and-learning-to-learn) and [Section 7](#7-learning-theory-at-the-frontier-overparameterization-scaling-laws-and-distribution-shift).

*Imitation learning and inverse reinforcement learning.* Attacks "known cost" by inferring intent from demonstration. Central objects: the covariate-shift compounding-error result, in which naive behavior cloning suffers $O(\epsilon T^2)$ regret over a horizon $T$ while interactive correction reduces it to $O(\epsilon T)$, and the maximum-entropy inverse reinforcement learning partition function $Z = \int \exp(-c_\theta(\tau)) \, d\tau$. This is the intellectual backbone of nearly everything happening in robot learning right now. Treated in [Section 2](#2-before-2015-part-ii-statistical-learning-theory-representation-and-learning-to-learn) and [Section 5](#5-physical-intelligence-proper-from-guided-policy-search-to-vision-language-action-models).

*Representation learning and self-supervision.* Attacks the assumption that somebody hands you a state vector. Central objects: the InfoNCE contrastive lower bound on mutual information, the masked-reconstruction objective, and the joint-embedding predictive objective that predicts in latent space rather than pixel space. Treated in [Section 2](#2-before-2015-part-ii-statistical-learning-theory-representation-and-learning-to-learn) and [Section 6](#6-world-models-video-prediction-and-self-supervised-representations-for-control).

*Meta-learning, or learning to learn.* Attacks "fixed task" by making the adaptation procedure itself the object of optimization. Central object: the bilevel problem $\min_\theta \mathbb{E}_{\mathcal{T} \sim p(\mathcal{T})} \mathcal{L}_{\mathcal{T}}\big(\theta - \alpha \nabla_\theta \mathcal{L}_{\mathcal{T}}(\theta)\big)$, whose inner argument is a learning algorithm and whose outer argument is a prior over tasks. Treated in [Section 3](#3-meta-learning-maml-its-descendants-and-its-absorption-into-pretraining).

*World models and model-based learning.* Attacks "known dynamics" constructively, by learning $\hat{P}(s'|s,a)$ or a latent surrogate and then planning inside it. Central object: the simulation lemma, which says that a model error of $\epsilon$ inflates to roughly $O(\epsilon H^2)$ value error over a horizon $H$, and which is exactly why long rollouts in learned models fail. Treated in [Section 6](#6-world-models-video-prediction-and-self-supervised-representations-for-control).

*Offline and batch learning.* Attacks "unlimited interaction," the assumption that real robots most obviously violate. Central object: pessimism, formalized either as an explicit conservative penalty on out-of-distribution actions or as a concentrability coefficient bounding how far the learned policy may stray from the data distribution. Treated in [Section 4](#4-deep-reinforcement-learning-2013-to-2021-from-atari-to-the-offline-turn).

*Robustness and distribution shift.* Attacks the assumption that test data resembles training data. Central object: the distributionally robust objective $\min_\theta \sup_{Q \in \mathcal{U}} \mathbb{E}_{Q}\big[\ell(\theta)\big]$ over an uncertainty set $\mathcal{U}$, together with the empirical regularities such as accuracy-on-the-line that hold for passive prediction and are not known to hold in closed loop. Treated in [Section 7](#7-learning-theory-at-the-frontier-overparameterization-scaling-laws-and-distribution-shift).

*Sequence modeling and post-training.* Attacks the Markov assumption and, more consequentially for robotics, supplies the machinery for converting a pretrained prior into a controllable policy. Central objects: attention, the KL-regularized preference objective, and its closed-form optimum $\pi^*(y|x) \propto \pi_{\mathrm{ref}}(y|x) \exp\big(r(x,y)/\beta\big)$, which direct preference optimization inverts to eliminate the reward model. Treated in [Section 8](#8-sequence-models-and-post-training-the-machinery-robotics-is-now-importing).

*Physical intelligence, or robot learning proper.* Attacks all of the above simultaneously, under the additional constraints that data is expensive, evaluation is expensive, mistakes are often irreversible, and the control loop has to close in tens of milliseconds. Central object as of 2026: the generalist vision-language-action policy that maps an image history and a language instruction to a chunk of future actions, trained by conditional generative modeling on heterogeneous multi-robot data. Treated in [Section 5](#5-physical-intelligence-proper-from-guided-policy-search-to-vision-language-action-models), [Section 9](#9-the-chelsea-finn-program-one-researchers-arc-as-a-map-of-the-field), and [Section 10](#10-evaluation-data-hardware-and-the-live-open-problems).

**Which of these are converging, and which are genuinely diverging?**

Three convergences are visible in the 2023 to 2026 literature. Control and generative modeling have merged, so that a policy is now a conditional generative model over action sequences and denoising diffusion or flow matching are, functionally, control algorithms. Meta-learning and pretraining have merged, so that adaptation which used to require an explicit bilevel optimization is now an emergent property of large-scale conditional prediction, which is what in-context learning is. Robotics and language modeling have merged at the level of tooling, sharing transformer backbones, preference-optimization objectives, and test-time-compute strategies.

Two divergences are equally real and much less often stated. Value-based reinforcement learning has not converged with the rest of the field; it remains the one component that does not reliably improve with more data and more compute, which is why the frontier robotics systems are fundamentally supervised learners with reinforcement learning added late, if at all. And statistical theory has not converged with practice in any useful sense, because there is still no predictive theory of generalization for a policy whose own errors generate its future inputs, which is precisely the robot case.

**How should you read the rest of this document?**

The sections are chronological in aggregate and topical in detail. Sections 1 and 2 cover everything before 2015, which is where the vocabulary and the bounds come from and which most current papers silently assume you already know. Sections 3 through 8 each follow a single thread from roughly 2015 to 2026, so they overlap in time and are meant to be read as parallel tracks rather than as one sequence. Section 9 reads Chelsea Finn's publication record as a single sustained argument, which turns out to be the most efficient way to see how the threads actually connect inside one person's work. Section 10 is forward-looking and states the open problems as research questions you could attack. Section 11 closes with the dense recap, a study checklist, and my own recommendations.

---

## Notation, and the Prerequisites This Review Assumes

**Why does this section exist?**

Because the review is calibrated to a reader who is strong where the field is old and thinner where the field is new. The decision-theoretic and estimation-theoretic material in Sections 1, 4, 6 and 7 is developed carefully and connected to filtering, stochastic approximation, convex optimization and random-matrix asymptotics, on the assumption that you find that vocabulary natural. The generative-modeling and sequence-modeling machinery is treated more briskly, because the papers themselves treat it briskly, and that asymmetry is precisely backwards for someone arriving from signal processing. This section closes the gap in about ten minutes so the later sections read without stalls. If a construct below is already familiar, skip it; nothing later depends on reading this in full.

**What are the six constructs the later sections assume, in estimation language?**

*Attention and transformers.* An attention layer computes $\mathrm{softmax}(QK^\top/\sqrt{d_k})V$, where the rows of $Q$, $K$ and $V$ are learned linear projections of a sequence of input vectors. Read it as content-addressable smoothing: each output is a convex combination of the value vectors, with weights given by a normalized inner-product similarity between a query and every key, so the layer implements a data-dependent linear filter whose kernel is recomputed for every input rather than fixed by design. The $\sqrt{d_k}$ divisor is variance normalization, since the inner product of two $d_k$-dimensional vectors with unit-variance entries has variance $d_k$, and without it the softmax saturates and gradients vanish. The cost is quadratic in sequence length, which is what all the efficient-attention literature attacks. Developed in [Section 8](#8-sequence-models-and-post-training-the-machinery-robotics-is-now-importing); used earlier in Sections 5 and 6.

*Latent-variable models and the ELBO.* When a model posits an unobserved $z$ generating an observation $x$, the marginal likelihood $p_\theta(x) = \int p_\theta(x|z)p(z)\,dz$ is intractable, so one maximizes the evidence lower bound $\mathcal{L}(q) = \mathbb{E}_q[\log p_\theta(x,z)] - \mathbb{E}_q[\log q(z)]$ over a tractable family $q$. The identity $\log p(x) = \mathcal{L}(q) + \mathrm{KL}(q(z)\|p(z|x))$ shows that maximizing the bound simultaneously fits the data and drives $q$ toward the true posterior, which is variational inference and is the direct descendant of EM. A variational autoencoder is this with $q$ and $p$ both neural, plus the reparameterization $z = \mu_\phi(x) + \sigma_\phi(x)\odot\varepsilon$ that makes the sampling differentiable. Defined in [Section 2](#2-before-2015-part-ii-statistical-learning-theory-representation-and-learning-to-learn); reused as the world-model objective in [Section 6](#6-world-models-video-prediction-and-self-supervised-representations-for-control) and as the style latent of action-chunking policies in [Section 5](#5-physical-intelligence-proper-from-guided-policy-search-to-vision-language-action-models).

*Denoising diffusion.* A diffusion model defines a fixed forward process that progressively corrupts a clean sample $x^0$ into noise, $x^k = \sqrt{\bar\alpha_k}\,x^0 + \sqrt{1-\bar\alpha_k}\,\epsilon$ with $\epsilon\sim\mathcal{N}(0,I)$, and learns the reverse process by training a network to predict the noise that was added, minimizing $\mathbb{E}_{k,\epsilon}\|\epsilon - \epsilon_\theta(x^k,k)\|^2$. Sampling then starts from noise and iterates the learned denoiser. The useful intuition is that $\epsilon_\theta$ is, up to scaling, an estimate of the score $\nabla_x \log p(x)$, so generation is stochastic gradient ascent on a learned log-density, which is why the method represents multimodal distributions without ever choosing a mode. That property, not image quality, is why it took over robot policies.

*Flow matching.* Same goal, straighter path. Instead of a noise schedule, define a linear interpolant between noise and data, $x^\tau = \tau x + (1-\tau)\epsilon$ for $\tau\in[0,1]$, and regress a network onto the constant conditional velocity $u = \epsilon - x$ that transports one to the other. Sampling integrates the learned velocity field by forward Euler. Because the conditional trajectories are straight lines, the discretization error is small and roughly ten integration steps suffice against about a hundred for diffusion, which is the difference between a research demo and a 50 Hz control loop.

*Tokenization and discretization.* A token is an index into a finite vocabulary, and a sequence model is a conditional distribution over the next index given previous ones. Applying this to continuous quantities requires quantization, so a robot action in $\mathbb{R}^d$ becomes tokens either by per-dimension uniform binning, which is coarse and wasteful, or by transform coding, where the action chunk is mapped through a discrete cosine transform and the low-energy coefficients are dropped before quantizing. That second scheme is exactly the rate-distortion reasoning behind audio and image codecs, and it is the actual content of the FAST tokenizer discussed in [Section 5](#5-physical-intelligence-proper-from-guided-policy-search-to-vision-language-action-models).

*Pretraining, fine-tuning, and co-training.* Pretraining fits a model to a large generic corpus with a self-supervised objective; fine-tuning then continues training on a small task-specific dataset; co-training mixes both objectives simultaneously so the generic capability is not forgotten. The reason this matters for robots is that it converts a data-poor problem into a transfer problem: a policy inherits object recognition and instruction following from web data it never had to collect, and only the mapping from perception to torque must be learned from robot data. Whether that transfer is real, and how much of it survives, is a live empirical question rather than a settled one.

**Which symbols collide between sections, and what do they mean where?**

This is a multi-thread survey drawing notation from several literatures, and a handful of symbols are genuinely overloaded. The collisions below are inherited from the source papers rather than introduced here, so learning them is useful when you go read those papers.

```
SYMBOL   MEANING                                             WHERE
------   -------------------------------------------------   -----------------
s, a     state, action                                       throughout
o        observation (image plus proprioception)             Sec 1, 5, 6
pi_theta policy with parameters theta                        throughout
r, V, Q  reward, state value, action value                   Sec 1, 4
A        advantage Q - V ...                                 Sec 1, 4, 8, 9
         ... but also an action CHUNK a_{t:t+H}              Sec 5
gamma    discount factor in [0,1)                            Sec 1, 4
         ... but also aspect ratio d/n in proportional
             asymptotics                                     Sec 7
         ... but also a per-step diffusion coefficient       Sec 5
T        task horizon (DAgger bounds)                        Sec 2
H        task horizon (simulation lemma, offline RL)
         ... and ALSO the action-chunk length                Sec 4, 5, 7, 10
alpha    inner-loop step size (MAML)                         Sec 3
         ... learned softmax temperature                     Sec 5
         ... conformal miscoverage level                     Sec 7
         ... alpha-vectors of a POMDP value function         Sec 1
beta     KL or conservatism weight (VAE, CQL, DPO)           Sec 4, 5, 8
tau      a trajectory                                        Sec 1, 2, 9
         ... but also flow time in [0,1]                     Sec 5
         ... but also the expectile level in IQL             Sec 4
lambda   TD trace decay; Lagrange multiplier; uncertainty
         penalty weight in MOPO                              Sec 1, 5, 9
epsilon  an error or suboptimality bound                     Sec 1, 2, 7
         ... but also Gaussian noise in diffusion            Sec 5
         ... but also the PPO clipping parameter             Sec 4
z        a latent variable: VAE code, inferred task
         identity (PEARL), or chunk style (ACT)              Sec 3, 5, 6
d^pi     discounted state visitation distribution of pi      Sec 1, 4
Z        a partition function, always intractable            Sec 2, 8, 9
```

The two worth memorizing before you start are that $H$ does double duty as both task horizon and chunk length, sometimes within a page, and that $A$ means advantage in the reinforcement learning sections and an action chunk in the robotics sections. Both are standard in the source literature, and both cause more confusion on first reading than any conceptual difficulty in this document.

*Where this leads.* With notation fixed, the chronology can begin. Section 1 takes the oldest thread, which is also the one closest to your existing training: how to act optimally when the world is a known or estimable dynamical system.

---

## 1. Before 2015, Part I: Decision Theory, Optimal Control, and the Reinforcement Learning Canon

**What exactly did Bellman put on the table in 1957, and why is the MDP tuple the right container for it?**
Richard Bellman, working at RAND, compiled the principle of optimality and the method he named dynamic programming into [*Dynamic Programming*](https://gwern.net/doc/statistics/decision/1957-bellman-dynamicprogramming.pdf) (Princeton University Press, 1957). The object that survived is the discounted Markov decision process $(\mathcal{S},\mathcal{A},P,r,\gamma)$, where $\mathcal{S}$ is the state space, $\mathcal{A}$ the action space, $P(s'|s,a)$ the transition kernel, $r(s,a)\in[0,R_{\max}]$ the reward, and $\gamma\in[0,1)$ the discount. A policy $\pi(a|s)$ induces a value $V^\pi(s)=\mathbb{E}_\pi\big[\sum_{t=0}^\infty \gamma^t r(s_t,a_t)\,\big|\,s_0=s\big]$. Bellman's insight is that optimality is a local algebraic condition, not a global search. Define the optimality operator $\mathcal{T}$ acting on functions $V:\mathcal{S}\to\mathbb{R}$,

$$(\mathcal{T}V)(s)=\max_{a\in\mathcal{A}}\Big\{r(s,a)+\gamma\sum_{s'}P(s'|s,a)V(s')\Big\}.$$

The optimal value $V^\star$ is the unique fixed point $V^\star=\mathcal{T}V^\star$. For a reader trained on estimation, the tuple does the same work a state-space model does in Kalman filtering: it declares which variable makes the past irrelevant given the present.

**Why does the Bellman operator being a contraction in sup-norm matter at all?**
Because it converts an infinite-horizon optimization into a Banach fixed-point problem. For any $V,U$, the max and the expectation are both non-expansive, so $\|\mathcal{T}V-\mathcal{T}U\|_\infty\le\gamma\|V-U\|_\infty$ with $\|V\|_\infty=\max_s|V(s)|$. Value iteration $V_{k+1}=\mathcal{T}V_k$ therefore satisfies $\|V_k-V^\star\|_\infty\le\gamma^k\|V_0-V^\star\|_\infty$, a purely geometric rate. Reaching $\epsilon$ accuracy takes $O\!\big(\log(1/\epsilon)/\log(1/\gamma)\big)$ sweeps, each costing $O(|\mathcal{S}|^2|\mathcal{A}|)$. The modulus $\gamma$ is thus simultaneously an economic preference and a conditioning parameter, and the effective horizon $1/(1-\gamma)$ is the quantity that appears in every later error bound. It is the structure a signal processing reader knows from stable linear recursions: a spectral radius below one buys both existence and a rate.

**What did Howard add in 1960 that value iteration did not already give?**
Ronald Howard's [*Dynamic Programming and Markov Processes*](https://gwern.net/doc/statistics/decision/1960-howard-dynamicprogrammingmarkovprocesses.pdf) (MIT Press, 1960) introduced policy iteration, which alternates exact evaluation, solving the linear system $V^{\pi_k}=(I-\gamma P^{\pi_k})^{-1}r^{\pi_k}$, with greedy improvement $\pi_{k+1}(s)\in\arg\max_a\{r(s,a)+\gamma\sum_{s'}P(s'|s,a)V^{\pi_k}(s')\}$. Policy iteration is Newton's method on the piecewise-linear equation $V=\mathcal{T}V$, which is why it terminates in finitely many steps for finite MDPs and typically in far fewer iterations than value iteration, at the cost of one matrix solve per step. David Blackwell then closed the theory in [*Discrete Dynamic Programming*](https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-33/issue-2/Discrete-Dynamic-Programming/10.1214/aoms/1177704593.full) (Annals of Mathematical Statistics, 1962), showing that a single stationary policy can be optimal simultaneously for all discount factors sufficiently close to one, the property now called Blackwell optimality, which is what lets you talk about "the" optimal policy without fixing $\gamma$.

**What breaks when the state is not observed, and what replaces it?**
Karl Johan Åström, then at IBM Nordic and later Lund, showed in [*Optimal Control of Markov Processes with Incomplete State Information*](https://www.sciencedirect.com/science/article/pii/0022247X6590154X) (Journal of Mathematical Analysis and Applications, 1965) that the posterior over states is a sufficient statistic. The belief $b_t(s)=\Pr(s_t=s\mid o_{1:t},a_{0:t-1})$ evolves by Bayes rule,

$$b'(s')\;\propto\; O(o|s',a)\sum_s P(s'|s,a)\,b(s),$$

so a POMDP is an MDP on the simplex $\Delta(\mathcal{S})$, exactly the way a Kalman filter turns a partially observed linear system into a fully observed one on the mean and covariance. Richard Smallwood and Edward Sondik at Stanford then proved in [*The Optimal Control of Partially Observable Markov Processes over a Finite Horizon*](https://pubsonline.informs.org/doi/abs/10.1287/opre.21.5.1071) (Operations Research, 1973) that with finitely many stages remaining the optimal value is piecewise linear and convex in $b$, hence representable as $V(b)=\max_{\alpha\in\Gamma}\langle \alpha,b\rangle$ over a finite set of $\alpha$-vectors. Convexity has a physical reading: information is valuable, so certainty is worth more than any mixture. Leslie Pack Kaelbling, Michael Littman and Anthony Cassandra consolidated the algorithmics, including the witness algorithm for pruning $\Gamma$, in [*Planning and Acting in Partially Observable Stochastic Domains*](https://people.csail.mit.edu/lpk/papers/aij98-pomdp.pdf) (Artificial Intelligence, 1998), while making clear that exact solution scales badly because $|\Gamma|$ explodes with horizon.

**Why did Sutton's 1988 temporal-difference idea feel like a signal-processing trick?**
Richard Sutton, then at GTE Laboratories and soon at UMass Amherst with Andrew Barto, proposed in [*Learning to Predict by the Methods of Temporal Differences*](http://incompleteideas.net/papers/sutton-88-with-erratum.pdf) (Machine Learning, 1988) that you learn from the difference between successive predictions rather than from the eventual outcome. With features $\phi(s)\in\mathbb{R}^d$ and $V_\theta(s)=\theta^\top\phi(s)$, the TD error is $\delta_t=r_t+\gamma\theta^\top\phi(s_{t+1})-\theta^\top\phi(s_t)$ and TD($\lambda$) updates

$$z_t=\gamma\lambda z_{t-1}+\phi(s_t),\qquad \theta_{t+1}=\theta_t+\alpha_t\,\delta_t\,z_t .$$

The trace $z_t$ is a first-order IIR filter on the feature stream, and $\lambda$ interpolates between one-step bootstrapping ($\lambda=0$) and Monte Carlo regression on the full return ($\lambda=1$). The forward view defines the target as the $\lambda$-return $G_t^\lambda=(1-\lambda)\sum_{n\ge1}\lambda^{n-1}G_t^{(n)}$; the backward view above computes the same total update online and causally. The bias-variance story is the one an estimation reader expects: short bootstrapped targets are low variance and biased by current model error, long returns are unbiased and noisy.

**When does TD with linear features actually converge, and when does it blow up?**
John Tsitsiklis and Benjamin Van Roy at MIT settled the on-policy case in [*An Analysis of Temporal-Difference Learning with Function Approximation*](https://www.mit.edu/~jnt/Papers/J063-97-bvr-td.pdf) (IEEE Transactions on Automatic Control, 1997). Under the stationary distribution $D=\mathrm{diag}(\mu)$ of the Markov chain induced by $\pi$, the composition $\Pi_D T^{(\lambda)}$ of the projection onto $\mathrm{span}(\Phi)$ with the $\lambda$-weighted Bellman operator is a contraction in $\|\cdot\|_D$ with modulus $\kappa=\gamma(1-\lambda)/(1-\gamma\lambda)<\gamma$, TD($\lambda$) converges with probability one to the projected fixed point $\Phi\theta^\star=\Pi_D T^{(\lambda)}\Phi\theta^\star$, and the limit obeys

$$\|\Phi\theta^\star-V^\pi\|_D\;\le\;\frac{1}{\sqrt{1-\kappa^2}}\,\|\Pi_D V^\pi-V^\pi\|_D,$$

as restated with proof pointer by [Bhandari, Russo and Singal](https://djrusso.github.io/docs/TD_finite_time-merged.pdf) (Operations Research, 2021). Note $\kappa\to0$ as $\lambda\to1$, so TD(1) returns the best projection. The catch is that $D$ must be the on-policy distribution. Leemon Baird's [*Residual Algorithms*](https://www.semanticscholar.org/paper/Residual-Algorithms:-Reinforcement-Learning-with-Baird/f518bffb712a298bff18248c67f6fc0181018ae6) (ICML, 1995) exhibited a seven-state star MDP on which linear TD(0) and linear Q-learning diverge monotonically off-policy. The three ingredients, function approximation, bootstrapping and off-policy data, are what [Sutton and Barto](http://incompleteideas.net/book/RLbook2020.pdf) later named the deadly triad, and every stable deep RL system after 2013 is in some sense a workaround for it.

**How was Q-learning's convergence actually proved?**
Chris Watkins and Peter Dayan's [*Q-learning*](https://www.gatsby.ucl.ac.uk/~dayan/papers/cjch.pdf) (Machine Learning, 1992) analyzed the update $Q(s_t,a_t)\leftarrow Q(s_t,a_t)+\alpha_t\big[r_t+\gamma\max_{a'}Q(s_{t+1},a')-Q(s_t,a_t)\big]$. The proof reads the update as Robbins-Monro stochastic approximation for the fixed point of a $\gamma$-contraction: the noise $r_t+\gamma\max_{a'}Q(s_{t+1},a')-(\mathcal{T}Q)(s_t,a_t)$ has zero conditional mean and bounded conditional variance, so with tabular representation, every state-action pair visited infinitely often, and step sizes satisfying $\sum_t\alpha_t=\infty$, $\sum_t\alpha_t^2<\infty$, the iterates converge to $Q^\star$ with probability one; Watkins and Dayan carried this out constructively through a backward induction on an auxiliary action-replay process. Both italicized conditions matter: drop the lookup table and you land in Baird's counterexample.

**Where does the likelihood-ratio policy gradient come from?**
Ronald Williams at Northeastern derived REINFORCE in [*Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning*](https://link.springer.com/article/10.1007/BF00992696) (Machine Learning, 1992). The trick is the score-function identity $\nabla_\theta p_\theta = p_\theta\nabla_\theta\log p_\theta$, which moves the derivative off the unknown dynamics and onto the policy you wrote down. Sutton, David McAllester, Satinder Singh and Yishay Mansour proved the general statement in [*Policy Gradient Methods for Reinforcement Learning with Function Approximation*](https://papers.nips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation) (NIPS, 1999):

$$\nabla_\theta J(\theta)=\mathbb{E}_{s\sim d^{\pi_\theta},\,a\sim\pi_\theta}\big[\nabla_\theta\log\pi_\theta(a|s)\,Q^{\pi_\theta}(s,a)\big],$$

with $d^{\pi}$ the discounted state visitation measure. Crucially there is no $\nabla_\theta d^{\pi_\theta}$ term, which is why the estimator is implementable from sampled trajectories. They also identified the compatibility condition $\nabla_w \hat{Q}_w=\nabla_\theta\log\pi_\theta$ under which a learned critic leaves the gradient unbiased. Vijay Konda and Tsitsiklis made this a proved algorithm in [*Actor-Critic Algorithms*](https://proceedings.neurips.cc/paper/1786-actor-critic-algorithms.pdf) (NIPS, 2000; expanded in SIAM Journal on Control and Optimization, 2003), a two-timescale scheme in which a fast linear TD critic tracks the slowly moving actor and the critic's features must span the subspace prescribed by the actor's parameterization.

**Why did people put a Riemannian metric on policy space?**
Because Euclidean gradient ascent on $\theta$ is not invariant to how you parameterized the same policy class, so step sizes that are safe for one parameterization are catastrophic for another. Drew Bagnell and Jeff Schneider at CMU argued in [*Covariant Policy Search*](https://www.ri.cmu.edu/publications/covariant-policy-search/) (IJCAI, 2003) for the metric induced by the distribution over paths, and Jan Peters and Stefan Schaal at USC and later Max Planck Tübingen turned it into [*Natural Actor-Critic*](https://people.eecs.berkeley.edu/~pabbeel/cs287-fa09/readings/PetersSchaal-NaturalActorCritic-NC2008.pdf) (Neurocomputing, 2008). With the Fisher information matrix

$$F_\theta=\mathbb{E}_{s\sim d^\pi,a\sim\pi_\theta}\big[\nabla_\theta\log\pi_\theta(a|s)\,\nabla_\theta\log\pi_\theta(a|s)^\top\big],$$

the update becomes $\theta\leftarrow\theta+\alpha F_\theta^{-1}\nabla_\theta J$, steepest ascent under the local KL geometry $\mathrm{KL}(\pi_\theta\|\pi_{\theta+d\theta})\approx\tfrac12 d\theta^\top F_\theta d\theta$. Under compatible features the natural gradient is simply the critic's weight vector, and this line is the direct ancestor of trust-region methods.

**What does the performance difference lemma buy you?**
Sham Kakade and John Langford's [*Approximately Optimal Approximate Reinforcement Learning*](https://dl.acm.org/doi/10.5555/645531.656005) (ICML, 2002) rests on the exact identity, restated in the [TRPO paper](https://ar5iv.labs.arxiv.org/html/1502.05477) as its Equation 2,

$$\eta(\tilde\pi)-\eta(\pi)=\frac{1}{1-\gamma}\,\mathbb{E}_{s\sim d^{\tilde\pi}}\,\mathbb{E}_{a\sim\tilde\pi}\big[A^\pi(s,a)\big],\qquad A^\pi(s,a)=Q^\pi(s,a)-V^\pi(s).$$

The whole difficulty of policy improvement lives in the mismatch that the advantage is measured under the old policy but weighted by the new policy's visitation. Conservative policy iteration handles it by taking a mixture step $\pi_{k+1}=(1-\alpha)\pi_k+\alpha\pi'$, for which the surrogate obtained by substituting $d^{\pi_k}$ for $d^{\pi_{k+1}}$ is accurate up to an $O(\alpha^2\gamma\epsilon/(1-\gamma)^2)$ term, yielding monotone improvement for small $\alpha$. Every trust-region and clipped-objective method after 2015 is a restatement of this inequality.

**How badly does value-function error propagate, and what did batch methods do about it?**
Dimitri Bertsekas and Tsitsiklis codified approximate dynamic programming in [*Neuro-Dynamic Programming*](http://www.athenasc.com/ndpbook.html) (Athena Scientific, 1996). The canonical warning is that if $\|V-V^\star\|_\infty\le\epsilon$ and $\pi$ is greedy with respect to $V$, then only

$$\|V^{\pi}-V^\star\|_\infty\;\le\;\frac{2\gamma\epsilon}{1-\gamma}$$

is guaranteed, as restated in [Csaba Szepesvári's planning notes](https://rltheory.github.io/lecture-notes/planning-in-mdps/lec8/). The horizon factor amplifies regression error, which is why naive supervised fitting inside a control loop is fragile. The batch response was to solve the projected Bellman equation directly rather than descend on it: Steven Bradtke and Barto's [LSTD](https://link.springer.com/article/10.1007/BF00114723) (Machine Learning, 1996) forms $A=\Phi^\top D(\Phi-\gamma P^\pi\Phi)$ and $b=\Phi^\top Dr$ from samples and returns $\theta=A^{-1}b$, a least-squares object with no step size; Michail Lagoudakis and Ronald Parr at Duke wrapped it in policy iteration as [LSPI](https://www.jmlr.org/papers/v4/lagoudakis03a.html) (JMLR, 2003); and Damien Ernst, Pierre Geurts and Louis Wehenkel at Liège showed with [fitted Q iteration](https://www.jmlr.org/papers/volume6/ernst05a/ernst05a.pdf) (JMLR, 2005) that any regressor, in their case randomized tree ensembles, can be iterated on four-tuples $(x_t,u_t,r_t,x_{t+1})$.

**Does temporal abstraction change the algebra?**
Sutton, Doina Precup and Singh's [*Between MDPs and Semi-MDPs*](https://people.cs.umass.edu/~barto/courses/cs687/Sutton-Precup-Singh-AIJ99.pdf) (Artificial Intelligence, 1999) defined an option as a triple $(\mathcal{I},\mu,\beta)$ of initiation set, internal policy and termination probability, and showed that options plus primitive actions form a semi-Markov decision process in which the Bellman backup simply replaces $\gamma$ by $\gamma^k$ for a $k$-step option, preserving the contraction. Thomas Dietterich at Oregon State took the complementary route in [*Hierarchical Reinforcement Learning with the MAXQ Value Function Decomposition*](https://arxiv.org/abs/cs/9905014) (JAIR, 2000), decomposing $Q$ additively across a task hierarchy and proving that MAXQ-Q converges to a recursively optimal policy, a weaker notion than global optimality but one that permits aggressive state abstraction.

**What was known about how much exploration must cost?**
Tze Leung Lai and Herbert Robbins at Columbia established the $\Omega(\log T)$ regret floor for bandits in [*Asymptotically Efficient Adaptive Allocation Rules*](https://www.sciencedirect.com/science/article/pii/0196885885900028) (Advances in Applied Mathematics, 1985), and Peter Auer, Nicolò Cesa-Bianchi and Paul Fischer matched it uniformly in time with the index $\bar{x}_i+\sqrt{2\ln n/n_i}$ in [*Finite-time Analysis of the Multiarmed Bandit Problem*](https://homes.di.unimi.it/~cesabian/Pubblicazioni/ml-02.pdf) (Machine Learning, 2002). For full MDPs, Michael Kearns and Singh's [E3](https://www.cis.upenn.edu/~mkearns/papers/KearnsSinghE3.pdf) (Machine Learning, 2002) gave the first algorithm with resource bounds polynomial in the number of states, actions and the mixing time, by explicitly separating exploration from exploitation over known and unknown state sets. Ronen Brafman and Moshe Tennenholtz simplified this to a single optimistic model in [R-MAX](https://www.jmlr.org/papers/volume3/brafman02a/brafman02a.pdf) (JMLR, 2002), and Thomas Jaksch, Ronald Ortner and Auer at Leoben gave the matching regret picture with UCRL2, $\tilde{O}(DS\sqrt{AT})$ against a lower bound $\Omega(\sqrt{DSAT})$, in [*Near-optimal Regret Bounds for Reinforcement Learning*](https://www.jmlr.org/papers/v11/jaksch10a.html) (JMLR, 2010). The uncomfortable fact is that all of these bounds are stated in terms of counts over discrete states, which is exactly what a camera image does not give you.

**Which parts of optimal control did robot learning actually inherit?**
The linear-quadratic case, where $x_{t+1}=Ax_t+Bu_t+w_t$ and cost is $\sum x_t^\top Qx_t+u_t^\top Ru_t$, admits an exact closed-form solution: the value is quadratic, $V_t(x)=x^\top P_tx+c_t$, the control is linear, $u_t=-K_tx_t$, and $P_t$ satisfies the discrete Riccati recursion $P_{t}=Q+A^\top P_{t+1}A-A^\top P_{t+1}B(R+B^\top P_{t+1}B)^{-1}B^\top P_{t+1}A$. With Gaussian noise and linear observations the LQG separation principle says you may estimate with a Kalman filter and control the estimate as if it were the true state, the one case where the POMDP collapses cleanly. Nonlinear problems were attacked by iterating this solution around a nominal trajectory: differential dynamic programming, introduced by David Mayne and analyzed in David Jacobson and Mayne's [*Differential Dynamic Programming*](https://archive.org/details/differentialdyna0000jaco_f3l8) (Elsevier, 1970), takes a second-order expansion of the cost-to-go along the current rollout; Emanuel Todorov and Weiwei Li's [iterative LQG](https://roboti.us/lab/papers/TodorovACC05.pdf) (American Control Conference, 2005) extended it to stochastic dynamics with control constraints and Levenberg-Marquardt regularization for global convergence. Model predictive control is the same machinery run in a receding-horizon loop.

The reason iLQR became the workhorse inside guided policy search is structural. It returns not just a trajectory but a time-varying affine feedback law $u_t=\hat{u}_t-K_t(x_t-\hat{x}_t)$, so it produces a local *controller* whose induced state distribution is Gaussian and known in closed form, and it does so with second-order convergence and no exploration noise. Sergey Levine and Vladlen Koltun at Stanford exploited exactly that in [*Guided Policy Search*](https://proceedings.mlr.press/v28/levine13.html) (ICML, 2013), using DDP to generate guiding samples that a regularized importance-sampled policy optimization then distills into a neural network, sidestepping the poor local optima of direct search.

**Could you learn a model and still be honest about uncertainty?**
Marc Deisenroth and Carl Rasmussen at Cambridge answered yes with [PILCO](https://mlg.eng.cam.ac.uk/pub/pdf/DeiRas11.pdf) (ICML, 2011). A Gaussian process is fit to state differences $\Delta x=x_{t+1}-x_t$ given $(x_t,u_t)$; long-horizon prediction cascades one-step predictions using exact moment matching, approximating each $p(x_t)$ by $\mathcal{N}(\mu_t,\Sigma_t)$ with $\mu_t=\mu_{t-1}+\mu_\Delta$ and $\Sigma_t=\Sigma_{t-1}+\Sigma_\Delta+\mathrm{cov}[x_{t-1},\Delta]+\mathrm{cov}[\Delta,x_{t-1}]$. With the saturating cost $c(x)=1-\exp(-\|x-x_{\text{target}}\|^2/\sigma_c^2)\in[0,1]$, the expected cost and its gradient $dJ/d\theta$ are available analytically via the chain rule through $\mu_t$ and $\Sigma_t$, so no sampling is needed. Averaging over model posteriors rather than committing to a point estimate suppresses model bias, and cart-pole swing-up plus balancing was learned from 17.5 seconds of physical interaction, at least an order of magnitude better than the alternatives of the day. It did not scale, for reasons visible in the equations: GP inference is cubic in the number of transitions, moment matching requires a unimodal Gaussian belief and a smooth kernel, and neither survives contact discontinuities or image observations. The Bayesian ideal was already formalized as the Bayes-adaptive MDP, whose state is the pair (physical state, posterior over dynamics), and whose exact solution is tractable essentially only for bandits via Gittins indices, as documented in Michael Duff's UMass thesis [*Optimal Learning*](https://www.semanticscholar.org/paper/Optimal-learning:-computational-procedures-for-Duff-Barto/6932937c3ac9e6e42c78f0e214445d017486542f) (2002).

```
                      Bellman / RAND (1957)  --  principle of optimality
                                    |
        +---------------------+-----+-------+-----------------------------+
        |                     |             |                             |
   DP / exact           TD / model-free  policy search            optimal control
   Howard 1960          Sutton 1988      Williams 1992           LQR / Riccati (1960s)
   Blackwell 1962       Watkins 1992     Sutton et al 1999       Mayne; Jacobson 1970 DDP
   Astrom 1965          TVR 1997         Konda-Tsitsiklis 2000   Todorov & Li 2005 iLQG
   Smallwood-Sondik'73  Baird 1995       Bagnell-Schneider 2003  MPC
   Kaelbling et al '98  LSTD/LSPI/FQI    Peters-Schaal NAC 2008        |
        |                     |             |                             |
   (OR / Stanford,     (Sutton-Barto,   (USC / MPI Tubingen,      (Todorov / UW,
    Brown, Duke)        UMass Amherst;   CMU Robotics Inst.)       Mayne / Imperial,
                        Bertsekas-           |                     Bertsekas / MIT)
                        Tsitsiklis, MIT)     |                             |
                             \               |                            /
                              \        Kakade-Langford 2002 CPI           /
                               \             |                          /
                                \      PILCO 2011 (Cambridge)          /
                                 +-----------+---------------+--------+
                                             |
                                  Guided Policy Search 2013
                                    (Levine & Koltun)
```

**So what was actually unsolved entering 2015?**
Four gaps, each of which the following decade attacks directly. First, representation: every convergence guarantee above is stated for lookup tables or fixed linear features, and nobody knew how to obtain features for raw pixels or contact-rich states without hand engineering. Second, scalable uncertainty: PILCO showed calibrated model uncertainty is worth an order of magnitude in data, and Bayes-adaptive MDPs showed the exact treatment is intractable, leaving a large hole between the two. Third, reward specification: all of the theory presumes $r$ is given, whereas a real manipulation task has no scalar signal, which is what pushed inverse reinforcement learning and imitation to the foreground. Fourth, stability of closed-loop learning: the deadly triad, the $2\gamma\epsilon/(1-\gamma)$ amplification, and the distribution shift term in the performance difference lemma are three faces of the same problem, namely that a learner which changes its own data distribution can be self-destabilizing.

*Where this leads.* The tradition just surveyed asked how to act well when the world is a known or estimable dynamical system, and it answered in the language of operators, contractions and error propagation. Running alongside it, largely in different departments and different conferences, a second tradition asked a prior question: under what conditions does fitting observed data imply anything at all about data you have not seen. Section 2 follows that second tradition, and the two converge in Section 5 when a robot policy becomes a statistical estimator whose own errors determine its future inputs.

---

## 2. Before 2015, Part II: Statistical Learning Theory, Representation, and Learning to Learn

**What did Valiant actually demand of a learning algorithm in 1984?**

Leslie Valiant, at Harvard's Aiken Computation Laboratory, published [A Theory of the Learnable](https://people.mpi-inf.mpg.de/~mehlhorn/SeminarEvolvability/ValiantLearnable.pdf) in *Communications of the ACM*, converting learning from a psychological metaphor into a complexity question. A concept class $\mathcal{C}$ over $\mathcal{X}$ is *probably approximately correct* learnable if some algorithm, for every target $c$, distribution $D$, and $\epsilon,\delta$, draws $m$ i.i.d. samples and returns $h$ with

$$\Pr\big[\,\mathrm{err}_D(h) \le \epsilon\,\big] \ge 1-\delta, \qquad \mathrm{err}_D(h) = \Pr_{x \sim D}[h(x) \ne c(x)],$$

for $m$ polynomial in $1/\epsilon$, $1/\delta$ and description length $n$; for monotone conjunctions his analysis gives $m = O\!\big((n/\epsilon)\log(n/\delta)\big)$. Two facts matter more than the constants. The guarantee is *distribution-free*, holding for every $D$, which is why PAC bounds are worst-case and later look loose on natural images. And $\delta$ enters only logarithmically, so confidence is cheap while the accuracy floor is not.

**What does VC dimension actually buy you?**

Vapnik and Chervonenkis, in Moscow and later at AT&T Bell Labs, supplied the combinatorics. For a binary class $\mathcal{H}$, the growth function $\Pi_\mathcal{H}(m) = \max_{x_1,\dots,x_m} |\{(h(x_1),\dots,h(x_m)) : h \in \mathcal{H}\}|$ counts labelings realizable on $m$ points, and the VC dimension $d$ is the largest $m$ with $\Pi_\mathcal{H}(m) = 2^m$. Sauer-Shelah is the phase transition: for $m > d$, $\Pi_\mathcal{H}(m) \le \sum_{i=0}^{d} \binom{m}{i} \le (em/d)^{d}$, exponential up to $d$ and polynomial of degree $d$ after. Union-bounding over that *effective* count, with symmetrization, yields the statement that organized the field for thirty years: w.p. $1-\delta$, for all $h \in \mathcal{H}$,

$$R(h) \;\le\; \hat{R}(h) \;+\; O\!\left(\sqrt{\frac{d\log(m/d) + \log(1/\delta)}{m}}\right),$$

with $R(h) = \mathbb{E}_{D}[\mathbf{1}\{h(x)\ne y\}]$ the true risk and $\hat{R}(h) = \frac1m\sum_i \mathbf{1}\{h(x_i)\ne y_i\}$ the empirical risk. The $\sqrt{d/m}$ rate is the $\sqrt{\text{parameters}/\text{samples}}$ scaling of Cramer-Rao variance accounting; $\log(m/d)$ prices the supremum. Structural risk minimization follows: over a nested $\mathcal{H}_1 \subset \mathcal{H}_2 \subset \cdots$ with increasing $d_k$, minimize empirical risk plus capacity penalty, which is Tikhonov regularization read generalization-theoretically.

**Why did margin bounds break the parameter-counting habit?**

By the mid-1990s AdaBoost was doing what the VC picture forbade: test error fell while the number of combined weak classifiers, and so naive capacity, grew. [Schapire, Freund (both AT&T Labs), Bartlett (ANU) and Lee, *Annals of Statistics* 26(5):1651-1686, 1998](https://cseweb.ucsd.edu/~yfreund/papers/BoostingtheMargin.pdf) resolved this by measuring the *margin* $\mathrm{margin}_f(x,y) = y f(x)$ of a convex combination $f$ of base classifiers, proving that with probability $1-\delta$, for every $\theta > 0$,

$$\Pr_D[\mathrm{margin}_f \le 0] \;\le\; \Pr_S[\mathrm{margin}_f \le \theta] \;+\; O\!\left(\frac{1}{\sqrt{m}}\left(\frac{\log m \,\log|\mathcal{H}|}{\theta^2} + \log\frac{1}{\delta}\right)^{1/2}\right).$$

The right-hand side is independent of how many base classifiers are combined: capacity is controlled by $1/\theta^2$, a geometric confidence quantity, not a parameter count. That is the first rigorous hint that parameter count is the wrong capacity measure. Bartlett and Shahar Mendelson made capacity data-dependent in [Rademacher and Gaussian Complexities, JMLR 3:463-482, 2002](https://www.jmlr.org/papers/volume3/bartlett02a/bartlett02a.pdf), where

$$\hat{\mathfrak{R}}_m(\mathcal{F}) = \mathbb{E}_{\sigma}\left[\sup_{f \in \mathcal{F}} \frac{2}{m}\sum_{i=1}^{m} \sigma_i f(x_i)\right], \qquad \sigma_i \overset{\text{iid}}{\sim} \mathrm{Unif}\{-1,+1\},$$

replaces $\sqrt{d/m}$, alongside a $\sqrt{\log(1/\delta)/m}$ deviation term. It measures how well the class correlates with pure sign noise. Their structural results extend it to convex hulls, Lipschitz compositions and neural networks, and the Bartlett-Jordan orbit at Berkeley became the center of this line.

**What made kernels dominant before deep learning, and what killed them?**

The support vector machine from Vapnik's AT&T group solves $\min_w \tfrac12\|w\|^2$ subject to $y_i \langle w, \phi(x_i)\rangle \ge 1$, whose Lagrangian dual is a quadratic program in $m$ variables,

$$\max_{\alpha \ge 0} \; \sum_i \alpha_i - \tfrac12 \sum_{i,j}\alpha_i \alpha_j y_i y_j k(x_i,x_j), \qquad \textstyle\sum_i \alpha_i y_i = 0,$$

with $k(x,x') = \langle \phi(x),\phi(x')\rangle$ a positive-definite kernel. The representer theorem makes infinite-dimensional features harmless: any minimizer of $\sum_i L(y_i, f(x_i)) + \Omega(\|f\|_{\mathcal{H}_k})$ over a reproducing kernel Hilbert space $\mathcal{H}_k$, $\Omega$ strictly increasing, admits the expansion $f(\cdot) = \sum_{i}\alpha_i k(x_i,\cdot)$: the solution lives in the span of the data. Rasmussen and Williams's [Gaussian Processes for Machine Learning (MIT Press, 2006)](http://gaussianprocess.org/gpml/chapters/RW.pdf) gives the Bayesian twin: under $f \sim \mathcal{GP}(0,k)$ with noise $\sigma_n^2$, the posterior mean $\bar{f}_* = k_*^\top (K + \sigma_n^2 I)^{-1} y$ is linear minimum-mean-square estimation with a covariance kernel. Factorizing $K + \sigma_n^2 I$ costs $O(m^3)$ time and $O(m^2)$ memory, so kernels stalled at tens of thousands of points while ImageNet held 1.2 million. The 2018 neural tangent kernel results then showed infinitely wide networks trained by gradient descent are kernel machines, so the RKHS apparatus returns to describe deep learning rather than compete with it.

**If no algorithm beats any other, what are we even doing?**

David Wolpert's [The Lack of A Priori Distinctions Between Learning Algorithms, *Neural Computation* 8(7):1341-1390, 1996](https://direct.mit.edu/neco/article/8/7/1341/6016/The-Lack-of-A-Priori-Distinctions-Between-Learning) proved that averaged uniformly over all target functions, all learners have identical off-training-set expected error. The reading is not nihilism but reframing: performance is a claim about the match between inductive bias and the problems you face, which is what makes learning-to-learn coherent as a programme. The decomposition $\mathbb{E}[(y-\hat{f})^2] = \mathrm{Bias}^2 + \mathrm{Var} + \sigma^2$ gave the tradeoff a language, but it is clean only for squared loss and its U-shaped test-error curve is empirically false for large networks.

**Why does regret, not risk, become the right currency once your predictions change the data?**

Nick Littlestone's Winnow, in [Machine Learning 2:285-318, 1988](http://ai.stanford.edu/~pabbeel/depth_qual/littlestone1988.pdf), made only $O(r \log n)$ mistakes when $r$ of $n$ attributes are relevant, logarithmic rather than linear in ambient dimension. Martin Zinkevich at CMU generalized this to the convex case in [Online Convex Programming and Generalized Infinitesimal Gradient Ascent, ICML 2003](https://martin.zinkevich.org/publications/ICML03.pdf): play $x_t$ in a convex set $F$, observe convex $c_t$, update $x_{t+1} = P_F(x_t - \eta_t \nabla c_t(x_t))$ with $\eta_t = 1/\sqrt{t}$. The regret $\mathcal{R}_T = \sum_{t} c_t(x_t) - \min_{x \in F}\sum_{t} c_t(x)$ is $O(\sqrt{T})$, the constant splitting into a diameter term $\|F\|^2$ for the starting point and a gradient term $\|\nabla c\|^2$ for curvature ignorance. Mirror descent and follow-the-regularized-leader generalize the geometry via a Bregman divergence, and Cesa-Bianchi and Lugosi's *Prediction, Learning, and Games* (Cambridge, 2006) consolidated the field. So $\mathcal{R}_T/T \to 0$ with no stationarity assumption, exactly what DAgger exploits when the learner generates its own data.

**What did the probabilistic branch contribute, and why should an estimation person feel at home?**

Dempster, Laird and Rubin's EM (*JRSS-B* 39(1):1-38, 1977) alternates $Q(\theta|\theta^{(k)}) = \mathbb{E}_{z|x,\theta^{(k)}}[\log p(x,z|\theta)]$ with $\theta^{(k+1)} = \arg\max_\theta Q$, monotonically increasing the likelihood. Jordan, Ghahramani, Jaakkola and Saul's [An Introduction to Variational Methods for Graphical Models, *Machine Learning* 37:183-233, 1999](https://people.eecs.berkeley.edu/~jordan/papers/variational-intro.pdf) generalized it by lower-bounding the evidence, $\log p(x) = \mathcal{L}(q) + \mathrm{KL}(q(z)\|p(z|x))$ with

$$\mathcal{L}(q) = \mathbb{E}_q[\log p(x,z)] - \mathbb{E}_q[\log q(z)].$$

Because KL is nonnegative, maximizing the ELBO both bounds the evidence and tightens the posterior. This is the reader's home territory: Thrun, Burgard and Fox's *Probabilistic Robotics* (MIT Press, 2005) instantiates the same Bayes filter recursion whose linear-Gaussian case is the Kalman filter and whose joint pose-and-map version is SLAM. By 2014 robot perception was a mature estimation discipline with calibrated uncertainty and robot *control* from pixels was not, and that asymmetry is the tension later sections resolve.

**How did the representation-learning branch climb back?**

Backpropagation arrived with Rumelhart, Hinton and Williams (*Nature* 323:533-536, 1986), and LeCun's convolutional networks at Bell Labs, culminating in LeNet-5 (*Proc. IEEE* 86(11):2278-2324, 1998), hard-wired translation equivariance and weight sharing. [Hinton and Salakhutdinov's *Science* 313:504-507 (2006)](https://www.cs.toronto.edu/~hinton/absps/science.pdf) revived depth: greedy layerwise unsupervised pretraining supplies an initialization from which fine-tuning yields codes far better than PCA. ReLU units and dropout removed that scaffolding, and [Krizhevsky, Sutskever and Hinton's AlexNet (NIPS 2012, Toronto)](https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf) made the argument a number: 37.5% top-1 and 17.0% top-5 on ILSVRC-2010 with 60 million parameters and 650,000 neurons, then a winning 15.3% top-5 in ILSVRC-2012 against 26.2% for the runner-up. The [official ILSVRC-2014 results](https://image-net.org/challenges/LSVRC/2014/results) list GoogLeNet at 6.656% top-5 error and Oxford's VGG at 7.325%. Tooling followed in [Adam (Kingma and Ba, arXiv December 2014)](https://arxiv.org/abs/1412.6980) and [batch normalization (Ioffe and Szegedy, arXiv February 2015)](https://arxiv.org/abs/1502.03167). Seq2seq encoders gave way to [Bahdanau, Cho and Bengio's attention (arXiv September 2014)](https://arxiv.org/abs/1409.0473), replacing the fixed-length bottleneck with a learned soft alignment, and generative modeling forked in the same twelve months: [Kingma and Welling's variational autoencoder (arXiv December 2013)](https://arxiv.org/abs/1312.6114) optimizes the reparameterized ELBO

$$\mathcal{L}(\theta,\phi;x) = \mathbb{E}_{q_\phi(z|x)}[\log p_\theta(x|z)] - \mathrm{KL}(q_\phi(z|x)\|p(z)), \quad z = \mu_\phi(x) + \sigma_\phi(x)\odot\varepsilon,$$

while [Goodfellow and colleagues' GAN (arXiv June 2014)](https://arxiv.org/abs/1406.2661) discarded likelihood for the two-player minimax value

$$\min_G \max_D \; \mathbb{E}_{x \sim p_{\mathrm{data}}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1-D(G(z)))].$$

**Why does naive behavior cloning fail quadratically, and what does DAgger fix?**

Dean Pomerleau's [ALVINN at CMU (NIPS 1988 proceedings)](https://proceedings.neurips.cc/paper/1988/file/812b4ba287f5ee0bc9d43bbf5bbe87fb-Paper.pdf) mapped camera images to steering angle with a three-layer network and drove a real vehicle, establishing supervised imitation as viable control while exposing its failure mode. Let $d_\pi = \frac1T \sum_{t=1}^T d_\pi^t$ be the average state distribution over $T$ steps under $\pi$, $C(s,a)\in[0,1]$ the task cost, $J(\pi) = T\,\mathbb{E}_{s\sim d_\pi}[C(s,\pi)]$, and $\ell(s,\pi)$ a surrogate upper-bounding disagreement with expert $\pi^*$. Behavior cloning minimizes $\mathbb{E}_{s\sim d_{\pi^*}}[\ell(s,\pi)]$, loss under the *expert's* distribution. [Ross, Gordon and Bagnell (CMU), AISTATS 2011](https://arxiv.org/abs/1011.0686) restate the guarantee as their Theorem 2.1: if $\mathbb{E}_{s\sim d_{\pi^*}}[\ell(s,\pi)] = \epsilon$ then $J(\pi) \le J(\pi^*) + T^2 \epsilon$, and it is tight, witnessed by an example with $J(\hat\pi_{\mathrm{sup}}) = (1-T\epsilon)J(\pi^*) + T^2\epsilon$. The mechanism is compounding covariate shift: each of $T$ steps offers an $\epsilon$ chance of error, and one error can move the agent off the expert's support for the remaining $O(T)$ steps, giving $T \cdot \epsilon \cdot T$. An estimation reader should recognize open-loop error propagation with self-inflicted model mismatch. The fix is to make the training distribution the *learner's* own. DAgger seeds $D$ with expert data; at iteration $i$ it rolls out $\pi_i$, queries the expert at every visited state, aggregates those labels into $D$, and trains $\hat\pi_{i+1}$ on all of $D$. That is exactly follow-the-leader on the losses $\ell_i(\pi) = \mathbb{E}_{s\sim d_{\pi_i}}[\ell(s,\pi)]$, so the no-regret guarantee $\frac1N\sum_i \ell_i(\pi_i) - \epsilon_N \le \gamma_N \to 0$ applies, where $\epsilon_N = \min_\pi \frac1N \sum_i \ell_i(\pi)$ is the best average loss in hindsight. Combining that with their Theorem 2.2, which assumes a bounded expert action-gap $Q^{\pi^*}_{T-t+1}(s,a) - Q^{\pi^*}_{T-t+1}(s,\pi^*) \le u$ for all $a,t$, gives Theorem 3.2: for $N = \tilde{O}(uT)$ there exists $\hat\pi \in \hat\pi_{1:N}$ with

$$J(\hat\pi) \;\le\; J(\pi^*) + u T \epsilon_N + O(1).$$

The $T^2$ has become $uT$, linear in horizon. The price is an interactive expert, cheap in simulation and expensive on a robot, which motivates much later work. SEARN, from [Daume, Langford and Marcu, *Machine Learning* 75:297-325, 2009](https://link.springer.com/article/10.1007/s10994-009-5106-x), is the stochastic-mixing predecessor, interpolating rather than aggregating policies.

**What did pre-2015 inverse RL establish?**

[Abbeel and Ng at Stanford, ICML 2004](https://ai.stanford.edu/~ang/papers/icml04-apprentice.pdf) posited $R(s) = w^\top \phi(s)$ with feature expectations $\mu(\pi) = \mathbb{E}[\sum_t \gamma^t \phi(s_t) \mid \pi]$, then iterated a max-margin step until $\|\mu(\hat\pi) - \mu_E\|_2 \le \epsilon$, guaranteeing expert-comparable performance under *any* reward in the linear family. Its weakness: many reward vectors explain the same demonstrations. [Ziebart, Maas, Bagnell and Dey at CMU, AAAI 2008](https://cdn.aaai.org/AAAI/2008/AAAI08-227.pdf) resolved that ambiguity with maximum entropy, placing a globally normalized distribution over whole trajectories,

$$P(\zeta \mid \theta) = \frac{1}{Z(\theta)} e^{\theta^\top \mathbf{f}_\zeta}, \qquad Z(\theta) = \sum_{\zeta} e^{\theta^\top \mathbf{f}_\zeta},$$

where $\mathbf{f}_\zeta = \sum_{s_j \in \zeta} \mathbf{f}_{s_j}$ are path feature counts. The log-likelihood is convex for deterministic MDPs and its gradient is the feature-matching residual $\nabla \mathcal{L}(\theta) = \tilde{\mathbf{f}} - \sum_{s_i} D_{s_i}\mathbf{f}_{s_i}$, with $D_{s_i}$ the expected state visitation frequency from a forward-backward recursion. They fit it to over 100,000 miles of Pittsburgh taxi GPS traces on a network of 300,000-plus states. That partition function is what every later energy-based IRL method must approximate. Bayesian IRL (Ramachandran and Amir, IJCAI 2007) put a posterior over rewards instead; [Levine, Popovic and Koltun's GP-IRL (NIPS 2011)](https://papers.nips.cc/paper/4420-nonlinear-inverse-reinforcement-learning-with-gaussian-processes) made the reward a nonlinear Gaussian process; and Kalakrishnan, Pastor, Righetti and Schaal's path-integral IRL (ICRA 2013) learned manipulation objectives from *locally* optimal demonstrations alone, sampling near them to sidestep normalization.

**What did the field already know about learning to learn?**

More than the MAML-era literature usually admits. Jurgen Schmidhuber's 1987 TU Munich diploma thesis, [Evolutionary Principles in Self-Referential Learning](https://people.idsia.ch/~juergen/diploma1987ocr.pdf), argued no fixed set of algorithms suffices and proposed feeding a learning strategy back onto itself, the meta-meta-hook. [Bengio, Bengio and Cloutier (IJCNN 1991)](https://bengio.abracadoudou.com/publications/pdf/bengio_1991_ijcnn.pdf) parameterized the synaptic update rule as a shared local function and optimized it by gradient descent and genetic search, a learned optimizer in all but name. Thrun and Pratt's *Learning to Learn* (Kluwer, 1998) named the field; Jonathan Baxter at ANU gave it a theory in [A Model of Inductive Bias Learning, *JAIR* 12:149-198, 2000](https://arxiv.org/abs/1106.0245): a learner facing related tasks samples $n$ tasks with $m$ examples each and searches for a *hypothesis space* $\mathcal{H}$ from a family $\mathbb{H}$, not for a hypothesis. Shared-representation capacity is amortized across all $nm$ examples while task-specific capacity is paid per task, so the empirical-to-true deviation carries the shared component at $O(\sqrt{\cdot/(nm)})$ and the task-specific one at $O(\sqrt{\cdot/m})$. Baxter's own summary is that behavior ranges "from no improvement at all to an $O(1/n)$ decrease" in examples required per task as $n$ grows. Hochreiter, Younger and Conwell's [Learning to Learn Using Gradient Descent (ICANN 2001, LNCS 2130:87-94)](https://link.springer.com/chapter/10.1007/3-540-44668-0_13) then built an LSTM whose recurrent dynamics *are* the learning algorithm. The shape inherited by 2015 is thus fixed: assume a task distribution $p(\mathcal{T})$, each $\mathcal{T}_i$ with its own loss $\mathcal{L}_{\mathcal{T}_i}$ and small dataset, and seek a shared object, whether hypothesis space, initialization or update rule, minimizing $\mathbb{E}_{\mathcal{T}\sim p(\mathcal{T})}[\mathcal{L}_{\mathcal{T}}(\mathcal{A}(\mathcal{D}^{\mathrm{tr}}_{\mathcal{T}}))]$ over adaptation procedures $\mathcal{A}$. Nobody had an $\mathcal{A}$ both differentiable end-to-end and architecture-agnostic.

```
              Statistical Learning Theory / Representation Lineages
              ======================================================

Valiant 1984 (Harvard) ── PAC framework
      │
Vapnik & Chervonenkis 1971 ─ VC dim, Sauer-Shelah, SRM     [Vapnik: AT&T Bell Labs]
      ├──► SVM / kernels / RKHS / representer thm ──► GP regression [Rasmussen-Williams]
      │            │                                       │  O(n^3) wall
      │            │                                       └──► (2018) Neural Tangent Kernel
      │            └──► margin as capacity
      │                     │
      ├──► Schapire & Freund, AdaBoost   [AT&T Labs → Princeton]
      │         └── Schapire-Freund-Bartlett-Lee 1998: margin bound, no dep. on #classifiers
      │                     │
      └──► Bartlett & Mendelson 2002: Rademacher complexity  [Bartlett-Jordan, UC Berkeley]
                            └──► data-dependent capacity ──► (post-2015) norm-based DL bounds

Wolpert 1996 (NFL) ──► "inductive bias is the whole game"
      └──► Schmidhuber 1987 (TUM) ─ Bengio x2 & Cloutier 1991 (Montreal/McGill)
                 └── Thrun & Pratt 1998 ── Baxter 2000 (ANU) ── Hochreiter 2001 (TUM/JKU)
                              └────────────────────────────► [Sec. 3: MAML, Finn → Stanford IRIS]

Littlestone 1988 (Winnow) ──► Zinkevich 2003 OCO, O(sqrt T) regret  [CMU]
      └── mirror descent / FTRL ── Cesa-Bianchi & Lugosi 2006
                 └──► Ross, Gordon & Bagnell 2011 DAgger  [CMU] ── T^2 ε  ⟶  u T ε

Rumelhart, Hinton & Williams 1986 (backprop)   [Toronto / UCSD]
      ├── LeCun 1989/1998 LeNet, ConvNets       [Bell Labs → NYU]
      ├── Hinton & Salakhutdinov 2006 (Science) deep-belief-net revival  [Toronto]
      └── AlexNet 2012 ── VGG (Oxford) / GoogLeNet (Google) 2014 ── BN / Adam 2014-15
                 ├── Bahdanau, Cho & Bengio 2014 attention   [Montreal]
                 └── VAE 2013 (Kingma-Welling, Amsterdam) / GAN 2014 (Goodfellow, Montreal)

Pomerleau 1989 ALVINN [CMU] ──► behavior cloning
Abbeel & Ng 2004 apprenticeship [Stanford] ──► Ziebart et al. 2008 MaxEnt IRL [CMU]
      └── Levine-Popovic-Koltun 2011 GP-IRL ── Kalakrishnan-Schaal 2013 path-integral IRL [USC]
```

**What gaps did 2015 inherit on the statistical side?**

Three gaps were inherited, each load-bearing for what follows. First, no usable capacity measure explained deep networks: a network's VC dimension scales with weight count, so $O(\sqrt{d/m})$ is vacuous when $d \gg m$, yet AlexNet's 60 million parameters generalized from 1.2 million images, and margin and Rademacher bounds pointed the right way without yielding non-vacuous numbers. Second, there was no theory of distribution shift: every bound above assumes a fixed $D$, and the one place the field confronted shift seriously, the $T^2\epsilon$ result, covered only self-generated shift and needed an interactive expert to repair it. Third, there was no account of why pretraining works. Baxter had shown that *if* tasks share a hypothesis space then per-task sample complexity can fall as $O(1/n)$, but nothing predicted which representations transfer, how to measure task relatedness, or why unsupervised pretraining helps a supervised objective. Those three absences define the next decade's agenda.

*Where this leads.* Two threads were left deliberately open here. The first is the task distribution $p(\mathcal{T})$, posed formally by Baxter and Thrun but with no practical algorithm attached, and Section 3 supplies the algorithm that made it tractable. The second is the covariate-shift analysis of imitation learning, whose classical conclusion that interaction is necessary to escape the quadratic horizon penalty has since been revised, as [Section 7](#7-learning-theory-at-the-frontier-overparameterization-scaling-laws-and-distribution-shift) discusses; read the DAgger result above as the historically decisive claim rather than as the current statistical consensus, because the entire modern robotics stack is behavior cloning and the accounting turns out to matter.

---

## 3. Meta-Learning: MAML, Its Descendants, and Its Absorption into Pretraining

**What problem was meta-learning trying to solve, and how did it become a benchmark?**

The premise is that learning itself is a function that can be fit. Instead of one dataset you get a distribution over tasks $p(\mathcal{T})$, where each $\mathcal{T}_i$ has its own loss $\mathcal{L}_{\mathcal{T}_i}$ and a small dataset split into a support set $\mathcal{D}^{\text{sup}}_i$ used to adapt and a query set $\mathcal{D}^{\text{qry}}_i$ used to score the adaptation. The optimized object is an algorithm: a map from $\mathcal{D}^{\text{sup}}_i$ to a predictor, scored by query loss averaged over $p(\mathcal{T})$. The protocol became $N$-way $K$-shot classification, sampling $N$ unseen classes and $K$ labeled examples each, on Omniglot (1623 handwritten characters, 20 examples each) and on miniImageNet, whose 64/16/20-class meta-train/validation/test split was fixed by Sachin Ravi and Hugo Larochelle in [Optimization as a Model for Few-Shot Learning](https://openreview.net/forum?id=rJY0-Kcll) (ICLR 2017), whose LSTM meta-learner used the cell state as the learner's weights. That split is why miniImageNet numbers from 2016 to 2020 are comparable at all.

**The metric branch: what if you never adapt, and only learn a distance?**

The oldest surviving idea is that few-shot learning is nearest-neighbor search in a learned space, as in the convolutional [Siamese networks](https://www.cs.cmu.edu/~rsalakhu/papers/oneshot1.pdf) of Koch, Zemel and Salakhutdinov (ICML Deep Learning Workshop 2015, Toronto). Oriol Vinyals, Charles Blundell, Timothy Lillicrap and colleagues at DeepMind made the episode the training unit in [Matching Networks](https://arxiv.org/abs/1606.04080) (NeurIPS 2016), predicting

$$\hat{y} = \sum_{i=1}^{k} a(\hat{x}, x_i)\, y_i, \qquad a(\hat{x}, x_i) = \frac{e^{c(f(\hat{x}), g(x_i))}}{\sum_{j=1}^{k} e^{c(f(\hat{x}), g(x_j))}},$$

where $(x_i, y_i)$ are support pairs, $f$ and $g$ are embedding networks and $c$ is cosine similarity. This is kernel regression with a learned kernel, and its slogan that "test and train conditions must match" is the episodic-training principle the field inherited. Jake Snell, Kevin Swersky and Richard Zemel (Toronto, later Vector) simplified it in [Prototypical Networks](https://arxiv.org/abs/1703.05175) (NeurIPS 2017), collapsing each class to its embedding mean $c_k = \frac{1}{|S_k|}\sum_{(x_i,y_i)\in S_k} f_\phi(x_i)$ and classifying by

$$p_\phi(y=k \mid x) = \frac{\exp\!\big(-d(f_\phi(x), c_k)\big)}{\sum_{k'} \exp\!\big(-d(f_\phi(x), c_{k'})\big)}.$$

When $d$ is a Bregman divergence the minimizer of within-cluster distance is the cluster mean, so prototypes are the right sufficient statistic and the model performs mixture density estimation. Their result that Euclidean distance "greatly outperforms the more commonly used cosine similarity" is therefore no tuning accident, since cosine distance is not a Bregman divergence. They report 49.42 $\pm$ 0.78% and 68.20 $\pm$ 0.66% on miniImageNet 1-shot and 5-shot, against 46.6% and 60.0% for Matching Networks. [Relation Networks](https://arxiv.org/abs/1711.06025) (Sung, Torr and Hospedales, CVPR 2018, Oxford and Edinburgh) replaced the fixed metric with a learned comparator.

**The black-box branch: what if the learning algorithm is just a recurrent network?**

Sepp Hochreiter, A. Steven Younger and Peter Conwell argued in [Learning to Learn Using Gradient Descent](https://link.springer.com/chapter/10.1007/3-540-44668-0_13) (ICANN 2001) that a recurrent network fed sequences of $(x_t, y_{t-1})$ discovers a learning algorithm in its recurrent dynamics. Adam Santoro, Timothy Lillicrap and colleagues revived it at DeepMind with [memory-augmented neural networks](https://arxiv.org/abs/1605.06065) (ICML 2016), adding content-addressable memory so new bindings could be written in one shot. The RL version appeared twice in November 2016, as [$\text{RL}^2$](https://arxiv.org/abs/1611.02779) (Yan Duan, John Schulman, Ilya Sutskever, Pieter Abbeel and colleagues, OpenAI and Berkeley) and [Learning to Reinforcement Learn](https://arxiv.org/abs/1611.05763) (Jane Wang, Matt Botvinick and colleagues, DeepMind): an RNN policy whose hidden state is not reset at episode boundaries is fed observations, actions, rewards and termination flags and trained by ordinary RL across a distribution of MDPs, so the inner loop is the forward pass. Duan et al. report that on unseen bandits and finite MDPs the learned algorithm is "close to human-designed algorithms with optimality guarantees." [SNAIL](https://arxiv.org/abs/1707.03141) (Mishra, Chen and Abbeel, ICLR 2018, Berkeley) swapped recurrence for dilated temporal convolutions plus soft attention, the architectural bridge to in-context learning.

**What did MAML propose, and why does the math take that form?**

Chelsea Finn, Pieter Abbeel and Sergey Levine at Berkeley published [Model-Agnostic Meta-Learning](https://arxiv.org/abs/1703.03400) in March 2017 (ICML 2017), following the [learned-optimizer](https://arxiv.org/abs/1606.04474) work of Marcin Andrychowicz and colleagues (DeepMind and Oxford, NeurIPS 2016), who fit an update rule $\theta_{t+1} = \theta_t + g_t(\nabla f(\theta_t), \varphi)$ with a coordinatewise LSTM. MAML instead leaves the adaptation procedure unlearned, fixing it to gradient descent, and learns only the point from which that procedure works fastest. With inner step size $\alpha$, adapted parameters are $\phi_i = \theta - \alpha \nabla_\theta \mathcal{L}^{\text{sup}}_{\mathcal{T}_i}(\theta)$ and the meta-objective is the bilevel program

$$\min_\theta \sum_{\mathcal{T}_i \sim p(\mathcal{T})} \mathcal{L}^{\text{qry}}_{\mathcal{T}_i}\big(\theta - \alpha \nabla_\theta \mathcal{L}^{\text{sup}}_{\mathcal{T}_i}(\theta)\big).$$

Because the objective is evaluated after the update, the gradient must pass through the update:

$$\nabla_\theta \mathcal{L}^{\text{qry}}_{\mathcal{T}_i}(\phi_i) = \big(\underbrace{I - \alpha \nabla^2_\theta \mathcal{L}^{\text{sup}}_{\mathcal{T}_i}(\theta)}_{\partial \phi_i / \partial \theta}\big)\, \nabla_{\phi} \mathcal{L}^{\text{qry}}_{\mathcal{T}_i}(\phi_i),$$

with $\nabla^2_\theta \mathcal{L}^{\text{sup}}$ the Hessian of the support loss. Read $-\alpha \nabla^2 \mathcal{L}^{\text{sup}}$ as the sensitivity of the adaptation direction to a perturbation of the initialization; it drives $\theta$ toward regions where support and query gradients align. For $k$ inner steps the Jacobian becomes $\prod_{j=0}^{k-1}\big(I - \alpha \nabla^2_\theta \mathcal{L}^{\text{sup}}(\theta_j)\big)$, so reverse-mode differentiation must retain all $k$ intermediate parameter vectors and activations, and memory grows linearly in $k$. That is MAML's practical ceiling, and why published results use one to five inner steps. MAML reached 98.7 $\pm$ 0.4% on Omniglot 5-way 1-shot and 48.70 $\pm$ 1.84% / 63.11 $\pm$ 0.92% on miniImageNet 1-shot / 5-shot, against 43.44% / 60.60% for the LSTM meta-learner in the same table.

**If the Hessian is the whole point, why does deleting it barely hurt?**

First-order MAML replaces the Jacobian with $I$, and Finn et al. report 48.07 $\pm$ 1.75% / 63.15 $\pm$ 0.91%, indistinguishable from second-order MAML at roughly a 33% speedup in network computation. Alex Nichol, Joshua Achiam and John Schulman at OpenAI explained why in [On First-Order Meta-Learning Algorithms](https://arxiv.org/abs/1803.02999) (2018), which also introduced Reptile: run $k$ SGD steps on a sampled task to get $\tilde{\theta}$, then move the initialization toward it,

$$\theta \leftarrow \theta + \epsilon(\tilde{\theta} - \theta),$$

with no differentiation through the inner loop and no support/query split. Expanding all three in $\alpha$ at $k=2$, with AvgGrad the gradient of expected loss (the joint-training direction) and AvgGradInner the direction that increases the inner product between gradients of different minibatches of the same task, gives

$$\text{MAML} = \text{AvgGrad} - 2\alpha\,\text{AvgGradInner} + O(\alpha^2), \quad \text{FOMAML} = \text{AvgGrad} - \alpha\,\text{AvgGradInner} + O(\alpha^2),$$
$$\text{Reptile} = 2\,\text{AvgGrad} - \alpha\,\text{AvgGradInner} + O(\alpha^2).$$

All three share the same two leading terms and differ only in coefficients. AvgGradInner is what buys fast adaptation, since maximizing within-task gradient alignment is what makes one support gradient generalize to the query set. The Hessian is not the source of the effect; it rescales a coefficient.

**What did the descendants fix?**

Aravind Rajeswaran, Chelsea Finn, Sham Kakade and Sergey Levine attacked memory in [iMAML](https://arxiv.org/abs/1909.04630) (NeurIPS 2019, University of Washington and Berkeley), replacing the fixed $k$-step loop with a proximal problem $\phi_i^\star = \arg\min_{\phi} \hat{\mathcal{L}}_i(\phi) + \frac{\lambda}{2}\|\phi - \theta\|^2$, where $\lambda$ bounds how far adaptation may travel. At the stationary point $\nabla \hat{\mathcal{L}}_i(\phi_i^\star) + \lambda(\phi_i^\star - \theta) = 0$; differentiating in $\theta$ and applying the implicit function theorem gives

$$\frac{d\phi_i^\star}{d\theta} = \Big(I + \tfrac{1}{\lambda}\nabla^2 \hat{\mathcal{L}}_i(\phi_i^\star)\Big)^{-1},$$

which depends only on the solution, not the path to it. One conjugate-gradient solve yields the meta-gradient, memory stays at $O(\text{Mem}(\nabla\hat{\mathcal{L}}_i))$ rather than scaling with $k$, and any inner optimizer is admissible; they report 99.74 $\pm$ 0.11% on Omniglot 5-way 5-shot. Others widened the learned object instead: [Meta-SGD](https://arxiv.org/abs/1707.09835) learns per-parameter step sizes and directions, [MAML++](https://arxiv.org/abs/1810.09502) (Antoniou and Storkey, Edinburgh) repairs MAML's training instabilities, [CAVIA](https://arxiv.org/abs/1810.03642) (Zintgraf, Hofmann and Whiteson, Oxford WhiRL) adapts only a low-dimensional context vector fed as extra input, and [Probabilistic MAML](https://arxiv.org/abs/1806.02817) (Finn, Kelvin Xu and Levine) and [Bayesian MAML](https://arxiv.org/abs/1806.03836) (Kim, Bengio and Ahn), both NeurIPS 2018, replace the point estimate with a posterior, adapting by noise-injected gradient descent and by Stein variational gradient descent respectively.

**Was MAML learning to learn, or just learning good features?**

This question is the pivot of the entire meta-learning story. Aniruddh Raghu (MIT), Maithra Raghu (Cornell and Google Brain), Samy Bengio (Google Brain) and Oriol Vinyals (DeepMind) asked directly in [Rapid Learning or Feature Reuse?](https://arxiv.org/abs/1909.09157) (ICLR 2020). Freezing the network body at test time left accuracy essentially unchanged (46.3% versus 46.9% on miniImageNet 5-way 1-shot), and CCA/CKA similarity across the inner loop stayed above 0.9 for body layers while falling below 0.5 only for the head. Hence ANIL, "almost no inner loop," which adapts only the head and matches MAML at 46.7 $\pm$ 0.4% versus 46.9 $\pm$ 0.2%. Feature reuse, not rapid learning, is the dominant factor.

**What happened when meta-learning met reinforcement learning?**

Here the task distribution is over MDPs and adaptation must also solve exploration, which [MAESN](https://arxiv.org/abs/1802.07245) (Abhishek Gupta, Abbeel and Levine, NeurIPS 2018, Berkeley) handles by meta-learning a structured latent noise space. [PEARL](https://arxiv.org/abs/1903.08254) (Kate Rakelly, Aurick Zhou, Chelsea Finn, Sergey Levine, Deirdre Quillen, ICML 2019, Berkeley RAIL) separates task inference from control, conditioning $\pi_\theta(a \mid s, z)$ on a latent task variable $z$ inferred from context $c$ by an encoder $q_\phi(z \mid c)$, trained against

$$\mathbb{E}_{\mathcal{T}}\Big[\mathbb{E}_{z \sim q_\phi(z|c^{\mathcal{T}})}\big[R(\mathcal{T}, z) + \beta D_{\mathrm{KL}}\big(q_\phi(z \mid c^{\mathcal{T}}) \,\|\, p(z)\big)\big]\Big],$$

with a permutation-invariant product-of-Gaussians factorization $q_\phi(z \mid c_{1:N}) \propto \prod_{n=1}^{N} \Psi_\phi(z \mid c_n)$, correct because identifying an MDP needs only the set of transitions. Posterior sampling of $z$ gives temporally extended exploration, and because the latent variable rather than the policy weights carries adaptation, meta-training can be off-policy: they report a 20x to 100x gain in meta-training sample efficiency over MAML, ProMP and $\text{RL}^2$. [VariBAD](https://arxiv.org/abs/1910.08348) (Zintgraf, Gal, Hofmann and Whiteson, ICLR 2020, Oxford WhiRL) makes the Bayesian reading explicit: augmenting the state with a belief over the unknown reward and transition functions yields a Bayes-adaptive MDP whose optimal policy trades exploration against exploitation by construction, the intractable belief replaced by a variational posterior trained on $\mathbb{E}_q[\log p(\tau_{:H^+} \mid m)] - D_{\mathrm{KL}}(q_\phi(m \mid \tau_{:t}) \| p_\theta(m))$. [Meta-Q-Learning](https://arxiv.org/abs/1910.00125) (ICLR 2020) is the meta-RL analogue of ANIL, since TD3 with a context variable plus propensity-weighted off-policy adaptation matches the state of the art. The [meta-RL survey](https://arxiv.org/abs/2301.08028) by Jacob Beck, Zintgraf, Finn and Whiteson (Oxford and Stanford) sorts the field into parameterized policy gradient, black box and task inference inner loops, and names the tension: meta-RL buys test-time sample efficiency "at the expense of sample efficiency during training and generality at test time."

**What does theory say about when adaptation should beat scale?**

The antecedent is Jonathan Baxter's [A Model of Inductive Bias Learning](https://jair.org/index.php/jair/article/view/10253) (JAIR 2000), which proved that examples required per task to learn a shared hypothesis space behaves like $O(k + W/n)$ in the number of tasks $n$, with $W$ the complexity of the shared space and $k$ the per-task complexity, so the shared cost amortizes at rate $O(1/n)$ and the per-task cost does not. [Meta-Learning and Universality](https://arxiv.org/abs/1710.11622) (Finn and Levine, ICLR 2018) settles expressiveness: a sufficiently deep network plus one gradient step is a universal learning-procedure approximator, so MAML loses nothing against a recurrent meta-learner, though the proof needs depth, a learnable bias-transformation input, and a loss whose gradient at zero prediction is linear and invertible in the label, true for squared error and cross-entropy but not $\ell_1$ or hinge. [Provable Meta-Learning of Linear Representations](https://proceedings.mlr.press/v139/tripuraneni21a.html) (Tripuraneni, Chi Jin and Michael Jordan, ICML 2021, Berkeley and Princeton) gives the cleanest rate: with $n_1$ samples from each of $t$ diverse tasks sharing a rank-$r$ representation in $\mathbb{R}^d$ and $n_2$ samples on a new task, excess error is $\tilde{O}(dr^2/n_1 + r/n_2)$ against $\tilde{O}(d/n_2)$ without meta-training, so transfer pays exactly when $n_1/n_2 \gg r^2$. [Du, Hu, Kakade, Lee and Lei](https://arxiv.org/abs/2002.09434) (ICLR 2021) get $\lesssim \sigma^2\big(kd\log(\kappa n_1)/(c n_1 T) + k/n_2\big)$, the representation term dividing by all $n_1 T$ source samples while the target term pays only the $k$-dimensional cost. [Fallah, Mokhtari and Ozdaglar](https://arxiv.org/abs/1908.10400) (AISTATS 2020, MIT and UT Austin) prove that MAML reaches an $\epsilon$-first-order stationary point in $O(1/\epsilon^2)$ iterations while FO-MAML plateaus at gradient norm $O(\alpha\sigma)$, with $\sigma^2$ bounding task-gradient variance. That is the precise sense in which dropping the Hessian is safe only when tasks are similar.

```
                Learning to learn (Schmidhuber 1987; Thrun & Pratt 1998; Baxter 2000)
                                            |
      +-------------------------+------------+------------------------+
      |                         |                                     |
 METRIC-BASED             BLACK-BOX / RECURRENT                OPTIMIZATION-BASED
 (no adaptation)          (inner loop = forward pass)           (inner loop = SGD)
      |                         |                                     |
 Siamese (Koch/Zemel/     Hochreiter/Younger/Conwell 2001       Andrychowicz+ 2016
 Salakhutdinov 2015,            |                               (DeepMind / Oxford)
 Toronto)                 MANN (Santoro+ 2016, DeepMind)              |
      |                         |                               Ravi & Larochelle 2017
 Matching Nets            RL^2 (Duan+ 2016, OpenAI/Berkeley)     (Twitter/Sherbrooke)
 (Vinyals+ 2016,          Learning to RL (Wang+ 2016, DeepMind)       |
 DeepMind)                      |                               MAML (Finn/Abbeel/Levine
      |                   SNAIL (Mishra+ 2018, Berkeley)          2017, Berkeley BAIR)
 ProtoNets (Snell/              |                                     |
 Swersky/Zemel 2017,      ..............................    +-----+---+---+--------+
 Toronto/Vector)          : absorbed into in-context   :    |     |       |        |
      |                   : learning: GPT-3 (OpenAI    : Reptile iMAML Meta-SGD  CAVIA
 RelationNet (Sung+ 2018, : 2020); Garg+ 2022          : (OpenAI (UW +  MAML++   (Oxford
 Oxford/Edinburgh)        : (Stanford); von Oswald+    :  2018)  BAIR)           WhiRL)
      |                   : 2023; Akyurek+ 2023;       :          |
      +-------------------: Chan+ 2022 (DeepMind);     :    ANIL / Raghu+ 2020
                          : MetaICL (Min+ 2022, UW)    :    (MIT/Cornell/Brain/DeepMind)
                          ..............................          |
                                            |                     |
   META-RL: MAESN (Berkeley 2018) -> PEARL (Rakelly+ 2019, Berkeley RAIL) -> VariBAD
   (Zintgraf+ 2020, Oxford WhiRL) -> MQL (2020) -> Beck+ survey (Oxford + Stanford IRIS)
                                            |
   ROBOTICS: one-shot imitation (Duan+ 2017 OpenAI; Finn+ 2017 BAIR; DAML Yu+ 2018)
   -> online dynamics adaptation (Nagabandi+ 2019) -> TTT (Sun+ 2020, BAIR)
```

**Why did explicit bilevel meta-learning lose ground after 2020?**

Because a competing implementation of the same objective arrived with no inner loop. Tom Brown, Benjamin Mann, Nick Ryder and colleagues at OpenAI showed in [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) (NeurIPS 2020) that a 175-billion-parameter model, "applied without any gradient updates or fine-tuning, with tasks and few-shot demonstrations specified purely via text interaction," was sometimes competitive with task-specific fine-tuning. Formally this is the black-box branch: next-token prediction over documents containing many implicit tasks is meta-training over an unnamed $p(\mathcal{T})$, and the prompt is the support set. Four results make the case that this is genuinely meta-learning. Shivam Garg, Dimitris Tsipras, Percy Liang and Gregory Valiant at Stanford, in [What Can Transformers Learn In-Context?](https://arxiv.org/abs/2208.01066) (NeurIPS 2022), trained transformers on prompts $(x_1, f(x_1), \dots, x_k, f(x_k), x_{\text{query}})$ with $f$ from a known class, and matched ordinary least squares on 20-dimensional linear functions, matched Lasso on 3-sparse ones, and beat greedy tree learning 0.12 to 0.80 on depth-4 decision trees. Johannes von Oswald, Joao Sacramento, Max Vladymyrov and colleagues (Google Research and ETH Zurich) gave an explicit weight construction in [Transformers Learn In-Context by Gradient Descent](https://proceedings.mlr.press/v202/von-oswald23a/von-oswald23a.pdf) (ICML 2023) under which one linear self-attention layer performs exactly one gradient step on a least-squares loss, updating tokens as $e_j \leftarrow (x_j, y_j) + (0, -\Delta W x_j)$, and showed trained single-layer models converge to it. Ekin Akyurek, Jacob Andreas, Tengyu Ma, Denny Zhou and Dale Schuurmans proved in [What Learning Algorithm Is In-Context Learning?](https://arxiv.org/abs/2211.15661) (ICLR 2023) that transformers can implement a gradient step with constant layers and $O(d)$ hidden width, and ridge regression via Sherman-Morrison updates with $O(d^2)$ width, then found a phase transition from one-step gradient descent at one layer, through ridge regression at two to four, to least squares at eight or more. Stephanie Chan, Adam Santoro, Andrew Lampinen, James McClelland and Felix Hill at DeepMind supplied the missing ingredient in [Data Distributional Properties Drive Emergent In-Context Learning](https://arxiv.org/abs/2205.05055) (NeurIPS 2022): burstiness, a long tail of rare classes, dynamic item meanings and a Zipfian class-frequency exponent near 1 are what make in-context learning emerge, and under uniform class distributions there is a strict tradeoff between in-context and in-weights learning that only the Zipfian regime resolves. That is the deepest reframing available, because task-distribution design, the thing practitioners did by hand, is what language data does for free. [MetaICL](https://arxiv.org/abs/2110.15943) (Sewon Min, Zettlemoyer and Hajishirzi, NAACL 2022, University of Washington and Meta AI) closed the loop, meta-training a pretrained model for in-context learning across 142 datasets and beating models with nearly 8x the parameters.

Did pretraining subsume MAML, or merely change its address? The honest answer is that it changed the address rather than dissolving the problem, because the bilevel objective collapsed to a single level by making the inner loop a forward pass through a fixed architecture rather than an explicit optimization, which is what $\text{RL}^2$ proposed in 2016. What died is the explicit bilevel program, because Raghu et al. showed the adaptation was mostly feature reuse, Nichol et al. showed the second-order term was a coefficient, and Chan et al. showed the task distribution could be inherited rather than curated. The accounting is not free: Tripuraneni's $\tilde{O}(dr^2/n_1 + r/n_2)$ says the target term $r/n_2$ never vanishes with more pretraining, which is exactly where explicit adaptation keeps an edge.

**Where does meta-learning still do load-bearing work in robotics?**

Where $n_2$ is one demonstration and deployment does not match pretraining. One-shot imitation began with [One-Shot Imitation Learning](https://arxiv.org/abs/1703.07326) (Duan, Sutskever, Abbeel and Zaremba, NeurIPS 2017, OpenAI), attending over a demonstration trajectory to produce block-stacking actions, and [One-Shot Visual Imitation Learning via Meta-Learning](https://arxiv.org/abs/1709.04905) (Finn, Tianhe Yu, Abbeel and Levine, CoRL 2017), which applied MAML to behavior cloning from raw pixels on real hardware. [Domain-adaptive meta-learning](https://arxiv.org/abs/1802.01557) (Yu, Finn, Annie Xie and colleagues, RSS 2018) then meta-learned a loss function letting a PR2 or Sawyer arm adapt from a single *human* video, crossing the embodiment gap without hand-specified correspondences. On dynamics, [Nagabandi, Clavera, Levine and Finn](https://arxiv.org/abs/1803.11347) (ICLR 2019) meta-train a dynamics-model prior that adapts online from the last few transitions, shown on a legged millirobot recovering from a crippled leg, novel terrain and payloads. The general form is [Test-Time Training](https://arxiv.org/abs/1909.13231) (Yu Sun, Alexei Efros and Moritz Hardt, ICML 2020, Berkeley), which turns each unlabeled test input into a self-supervised task and updates parameters before predicting. Test-time adaptation is the surviving lineage: the same bilevel structure, with the inner loop running at deployment on unlabeled data, which is where robot data lives.

**What is still open?**

Four problems stand out, and the first is that task-distribution design remains unsolved: [Meta-Learning without Memorization](https://arxiv.org/abs/1912.03820) (Yin, Tucker, Levine and Finn, ICLR 2020) showed that most meta-learners implicitly require mutually exclusive meta-training tasks and otherwise learn a single zero-shot model that ignores the support set entirely, mitigated by an information-theoretic regularizer but not eliminated. Second, no accepted theory says when adaptation beats scale; the representation bounds locate the crossover only given a known shared rank $r$ and a task-diversity condition, neither measurable for a real robot task distribution. Third, second-order memory cost is mitigated by iMAML but unresolved for long inner loops on large models, and no published result differentiates through more than a handful of steps of a modern transformer. Fourth, and most consequential for embodied intelligence, there is no meta-learning story for long-horizon tasks: every benchmark above adapts a classifier, a one-step dynamics model or a single-episode policy, and Beck et al. name no method that meta-learns temporally extended structure such as subgoals or skills from a handful of trials.

*Where this leads.* Meta-learning treated the adaptation procedure as the object of optimization while taking the base learner largely for granted. During the same years, that base learner was being rebuilt at scale, and the resulting deep reinforcement learning literature is the subject of Section 4. The connection is not merely chronological: the reason meta-reinforcement learning inherited such awkward machinery is that the underlying reinforcement learning algorithms were themselves unstable, which is the story Section 4 tells.

---

## 4. Deep Reinforcement Learning, 2013 to 2021: From Atari to the Offline Turn

**Why did Q-learning with a neural network refuse to work before 2013, and what did DQN fix?**

Tabular Q-learning converges because each state-action entry updates independently. Replace the table with a function approximator and you activate what Sutton and Barto call the deadly triad: bootstrapping (the target depends on your own estimate), off-policy sampling, and function approximation (an update at one state perturbs every other state). Any two are safe; all three admit divergence. [Mnih et al. 2013](https://arxiv.org/abs/1312.5602) at DeepMind did not solve the triad, they engineered around it. A replay buffer $\mathcal{D}$ stores transitions $(s,a,r,s')$ sampled uniformly, decorrelating the temporally adjacent samples that otherwise make the gradient one long correlated trajectory. A target network $\theta^-$, a periodic snapshot of $\theta$ held fixed for thousands of steps, stops the target from chasing the regressor. The loss is

$$\mathcal{L}(\theta) = \mathbb{E}_{(s,a,r,s')\sim\mathcal{D}}\Big[\big(r + \gamma \max_{a'} Q_{\theta^-}(s',a') - Q_\theta(s,a)\big)^2\Big],$$

with $\gamma \in [0,1)$ the discount and $Q_\theta$ a convolutional network mapping four stacked $84\times 84$ grayscale frames to one scalar per action. Freezing $\theta^-$ turns a fixed-point iteration into a sequence of ordinary supervised regressions, which is the whole trick. The [Nature version](https://www.nature.com/articles/nature14236) (Mnih et al., *Nature* 518:529 to 533, 2015) reported performance "comparable to that of a professional human games tester across a set of 49 games" from one architecture and one hyperparameter setting. The field's standard statistic, median human-normalized score over 57 games, was **79%** for DQN as tabulated by [Bellemare, Dabney and Munos](https://ar5iv.labs.arxiv.org/html/1707.06887).

**What did the Rainbow line add, and why did none of it help robots?**

Six corrections accumulated over the two years that followed. Double DQN (van Hasselt, Guez and Silver, 2016) removed maximization bias by decoupling selection from evaluation, $r + \gamma Q_{\theta^-}(s', \arg\max_{a'} Q_\theta(s',a'))$, lifting the median to **118%**. Prioritized replay (Schaul et al. 2016) sampled transition $i$ with $P(i) \propto |\delta_i|^\omega$ for TD error $\delta_i$, correcting the induced bias with weights $w_i \propto (1/(NP(i)))^\beta$. Dueling networks (Wang et al. 2016) factored $Q_\theta(s,a) = V_\eta(s) + A_\psi(s,a) - \frac{1}{|\mathcal{A}|}\sum_{a'}A_\psi(s,a')$, learning state value once rather than once per action, reaching **151%**. The deepest change was distributional: C51 replaces scalar $Q$ with a categorical distribution over 51 atoms and iterates

$$\mathcal{T}^\pi Z(s,a) \;\overset{D}{=}\; R(s,a) + \gamma Z(S', A'),$$

an equality in distribution rather than in expectation, fit by projecting $\mathcal{T}Z$ onto the atom support and minimizing cross-entropy; median **178%** ([Bellemare, Dabney and Munos 2017](https://ar5iv.labs.arxiv.org/html/1707.06887), DeepMind). [Rainbow](https://arxiv.org/abs/1710.02298) (Hessel et al. 2017, DeepMind) combined all six plus noisy nets and multi-step returns for a final median of **223%** under no-op starts and **153%** under human starts, noting it "match[es] DQN's best performance after 7M frames." The number that matters is the denominator: all of it is quoted at **200 million frames**, roughly 38 days of game time per game, which at 10 Hz on a robot arm would be over 57 days of unbroken contact-rich motion per task without one hardware failure. In this form, value-based deep RL was structurally unusable on hardware.

**Why did the policy gradient camp need a trust region, and why did PPO win anyway?**

Policy gradients optimize $\eta(\pi_\theta) = \mathbb{E}[\sum_t \gamma^t r_t]$ directly, avoiding the triad but inheriting a step-size pathology: a small change in $\theta$ can collapse the visited state distribution. Kakade and Langford's performance difference lemma gives exact accounting,

$$\eta(\tilde{\pi}) = \eta(\pi) + \mathbb{E}_{s\sim\rho_{\tilde{\pi}},\, a\sim\tilde{\pi}}\big[A^\pi(s,a)\big],$$

where $\rho_{\tilde\pi}$ is the discounted occupancy of the *new* policy and $A^\pi$ the *old* advantage. The right side is not optimizable because $\rho_{\tilde\pi}$ is unknown, so one substitutes $\rho_\pi$ to get a surrogate $L_\pi(\tilde\pi)$ valid only near $\pi$. [TRPO](https://arxiv.org/abs/1502.05477) (Schulman, Levine, Moritz, Jordan and Abbeel, Berkeley, February 2015) makes "near" precise via $\eta(\tilde\pi) \ge L_\pi(\tilde\pi) - C\,D_{KL}^{\max}(\pi,\tilde\pi)$ with $C = 4\epsilon\gamma/(1-\gamma)^2$ and $\epsilon = \max_{s,a}|A^\pi(s,a)|$, yielding "guaranteed monotonic improvement." In practice one enforces $\bar{D}_{KL}(\pi_{\theta_{old}} \| \pi_\theta) \le \delta$ and solves by conjugate gradient on the Fisher matrix. Advantages come from [GAE](https://arxiv.org/abs/1506.02438) (Schulman, Moritz, Levine, Jordan and Abbeel, 2015),

$$\hat{A}_t^{GAE(\gamma,\lambda)} = \sum_{l=0}^{\infty} (\gamma\lambda)^l \delta_{t+l}^V, \qquad \delta_t^V = r_t + \gamma V(s_{t+1}) - V(s_t),$$

where $\lambda = 0$ is one-step TD (low variance, biased by errors in $V$) and $\lambda = 1$ is Monte Carlo (unbiased given true $V$, variance growing with horizon). PPO (Schulman, Wolski, Dhariwal, Radford and Klimov, OpenAI, 2017) discards the constrained solve and maximizes

$$\mathbb{E}_t\Big[\min\big(r_t \hat{A}_t,\; \mathrm{clip}(r_t, 1-\epsilon, 1+\epsilon)\hat{A}_t\big)\Big], \qquad r_t = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}.$$

The clip is a cheap trust region because it zeroes the gradient once the likelihood ratio leaves $[1-\epsilon,1+\epsilon]$ in the improving direction, removing the incentive to move further without ever forming a Fisher matrix. A3C (Mnih et al. 2016) parallelized actor-critic across CPU threads; [IMPALA](https://arxiv.org/abs/1802.01561) (Espeholt et al., DeepMind, 2018) decoupled actors from a central learner and corrected the resulting policy lag with V-trace, whose target sums TD residuals weighted by truncated importance ratios $\rho_t = \min(\bar\rho, \pi(a_t|x_t)/\mu(a_t|x_t))$ and a product of $c_i = \min(\bar c, \pi(a_i|x_i)/\mu(a_i|x_i))$: the $c_i$ product controls variance, $\bar\rho$ sets which policy's value is the fixed point.

**What made continuous control actually deployable?**

The deterministic policy gradient (Silver et al., ICML 2014) showed that for a deterministic actor $\mu_\phi$ the gradient collapses to $\nabla_\phi\eta = \mathbb{E}_s[\nabla_\phi\mu_\phi(s)\,\nabla_a Q(s,a)|_{a=\mu_\phi(s)}]$, an expectation over states only, removing the action-space integral. DDPG (Lillicrap et al., DeepMind, 2016) grafted DQN's replay and target networks onto it. [TD3](https://arxiv.org/abs/1802.09477) (Fujimoto, van Hoof and Meger, McGill and Mila, 2018) diagnosed the residual failure as overestimation propagated through the actor, and fixed it with twin critics, target policy smoothing and delayed actor updates:

$$y = r + \gamma \min_{i=1,2} Q_{\theta_i'}\big(s',\, \mu_{\phi'}(s') + \epsilon\big), \qquad \epsilon \sim \mathrm{clip}(\mathcal{N}(0,\sigma), -c, c).$$

The minimum is deliberate pessimism; the smoothing noise regularizes $Q$ along the action axis so the actor cannot exploit a narrow spurious peak. [SAC](https://arxiv.org/abs/1801.01290) (Haarnoja, Zhou, Abbeel and Levine, Berkeley, 2018) instead changed the objective:

$$J(\pi) = \sum_t \mathbb{E}_{(s_t,a_t)\sim\rho_\pi}\big[r(s_t,a_t) + \alpha\,\mathcal{H}(\pi(\cdot|s_t))\big],$$

whose optimum is a Boltzmann policy rather than a point mass, with soft Bellman backup $\mathcal{T}^\pi Q(s,a) = r(s,a) + \gamma\mathbb{E}_{s'}[V(s')]$ and $V(s) = \mathbb{E}_{a\sim\pi}[Q(s,a) - \alpha\log\pi(a|s)]$. The entropy term is not an exploration heuristic, it is a change of objective that smooths the value landscape and makes solutions robust to model error; the paper's headline claim was stability, "achieving very similar performance across different random seeds." Treating $\alpha$ as a Lagrange multiplier for a target entropy $\bar{\mathcal{H}}$ and descending $\min_\alpha\mathbb{E}[-\alpha\log\pi(a|s) - \alpha\bar{\mathcal{H}}]$ removed the last brittle hyperparameter. Sample reuse, seed robustness and no per-task tuning are why SAC became the default for RL run directly on real robots.

**Can a learned model buy back the sample efficiency?**

[PETS](https://arxiv.org/abs/1805.12114) (Chua, Calandra, McAllister and Levine, Berkeley, 2018) fits an ensemble $\{p_{\theta_b}(s_{t+1}|s_t,a_t)\}_{b=1}^B$ of Gaussian-output networks so aleatoric noise and epistemic disagreement separate, then plans each step by the cross-entropy method with trajectory sampling through the ensemble, reporting "8 and 125 times fewer samples than Soft Actor Critic and Proximal Policy Optimization respectively on the half-cheetah task." [MBPO](https://arxiv.org/abs/1906.08253) (Janner, Fu, Zhang and Levine, Berkeley, 2019) made the tradeoff explicit with a bound $\eta[\pi] \ge \hat{\eta}[\pi] - C(\epsilon_m, \epsilon_\pi)$, where $\hat\eta$ is model return, $\epsilon_m$ is model generalization error on held-out data and $\epsilon_\pi$ is policy shift; the bound justifies short branched rollouts from real states over long imagined ones. Dreamer (Hafner, Lillicrap, Ba and Norouzi, Toronto/Vector and DeepMind) learns a recurrent state-space model whose latent $(h_t, z_t)$ splits deterministic and stochastic parts, maximizing an ELBO that trades reconstruction of observations and rewards against $\mathrm{KL}(q(z_t|h_t,o_t)\,\|\,p(z_t|h_t))$, then trains the actor on $\lambda$-returns computed entirely inside imagined latent rollouts ([Dream to Control](https://arxiv.org/abs/1912.01603), 2019). [DreamerV2](https://arxiv.org/abs/2010.02193) (2020) swapped Gaussian latents for categorical ones and claimed to "surpass the final performance of the top single-GPU agents IQN and Rainbow." [DreamerV3](https://arxiv.org/abs/2301.04104) (2023) claims to beat "specialized methods across over 150 diverse tasks, with a single configuration" and to be "the first algorithm to collect diamonds in Minecraft from scratch without human data or curricula." That is a self-reported sweep: the value is the absence of per-domain tuning, not an audited ranking. [MuZero](https://arxiv.org/abs/1911.08265) (Schrittwieser et al., DeepMind, 2019/2020) argued a model need only be value-equivalent, predicting "the reward, the action-selection policy, and the value function" without reconstructing observations, matching AlphaZero on Go, chess and shogi without the rules. [TD-MPC2](https://arxiv.org/abs/2310.16828) (Hansen, Su and Wang, UCSD, 2023) is the current workhorse, doing short-horizon latent trajectory optimization with a terminal learned value and training "a single 317M parameter agent to perform 80 tasks across multiple task domains, embodiments, and action spaces."

**Has exploration been solved?**

No. Count bonuses $r^+ = \beta/\sqrt{N(s)}$ are principled in tabular MDPs and meaningless in pixel space where no state repeats, so Bellemare et al. (2016) derived pseudo-counts from a density model's prediction gain. ICM (Pathak, Agrawal, Efros and Darrell, Berkeley, 2017) rewards forward-model error in an inverse-dynamics feature space, only partly suppressing the noisy-TV pathology. [RND](https://arxiv.org/abs/1810.12894) (Burda, Edwards, Storkey and Klimov, OpenAI, 2018) uses distillation error against a fixed random network, a purely epistemic signal, reporting "better than average human performance" on Montezuma's Revenge. [Go-Explore](https://www.nature.com/articles/s41586-020-03157-9) (Ecoffet, Huizinga, Lehman, Stanley and Clune, *Nature* 590:580 to 586, 2021) archived visited states and returned to them before exploring, discovering all 255 rooms of Pitfall at a mean score of 102,571. Every one depends on cheap resets to arbitrary states, hand-specified state abstractions, or millions of throwaway episodes. Real hardware has no reset button and failed exploration breaks the robot, so exploration remains unsolved for embodied systems.

**Why is the offline turn the pivotal move for physical intelligence?**

Because it changes what data is for. [Fujimoto, Meger and Precup](https://arxiv.org/abs/1812.02900) (Mila and McGill, 2018) named the failure: given a fixed batch, $\max_{a'}Q(s',a')$ queries the critic at actions absent from the data, where the network extrapolates freely, and that overestimate is bootstrapped into the target and amplified. Their BCQ constrains the policy's action support to a generative model of the batch; BEAR (Kumar, Fu, Soh, Tucker and Levine, 2019) relaxed support matching from distribution matching via an MMD penalty. The [offline RL tutorial](https://arxiv.org/abs/2005.01643) (Levine, Kumar, Tucker and Fu, Berkeley RAIL, 2020) consolidated diagnosis and agenda. [CQL](https://arxiv.org/abs/2006.04779) (Kumar, Zhou, Tucker and Levine, Berkeley, 2020) pushed the pessimism into the critic, adding

$$\alpha\Big(\mathbb{E}_{s\sim\mathcal{D},\,a\sim\mu}[Q(s,a)] - \mathbb{E}_{s,a\sim\mathcal{D}}[Q(s,a)]\Big)$$

to the Bellman error, where $\mu$ is a sampling distribution over actions, in practice a soft-max over $Q$ itself. The first term pushes values down at actions the policy wants, the second pushes them up at actions the data contains, and the paper proves that for sufficiently large $\alpha$ the learned $Q$ "lower-bounds the true value of the policy," converting distribution shift from a divergence risk into a conservatism bias. [IQL](https://arxiv.org/abs/2110.06169) (Kostrikov, Nair and Levine, Berkeley, 2021) avoids out-of-distribution queries entirely, learning an upper expectile of the value with the asymmetric loss $L_2^\tau(u) = |\tau - \mathbb{1}(u<0)|\,u^2$ via $L_V(\psi) = \mathbb{E}_{(s,a)\sim\mathcal{D}}[L_2^\tau(Q_{\hat\theta}(s,a) - V_\psi(s))]$ with $\tau > 0.5$, so $V$ approaches the best in-data action value, then regressing that into $Q$ and extracting the policy by advantage-weighted behavioral cloning, as in AWAC (Nair, Gupta, Dalal and Levine, 2020). On D4RL, IQL's edge sits where trajectory stitching is required: **71.2** on antmaze-medium-play against **61.2** for CQL and **0.0** for both Decision Transformer and BC, and **39.6** on antmaze-large-play against **15.8** for CQL. On locomotion the totals nearly tie at **692.4** (IQL), **698.5** (CQL), **672.6** (Decision Transformer) and **666.2** (BC). That near-tie is the honest headline. [Decision Transformer](https://arxiv.org/abs/2106.01345) (Chen, Lu, Rajeswaran, Lee, Grover, Laskin, Abbeel, Srinivas and Mordatch, Berkeley and Google, 2021) and Trajectory Transformer (Janner, Li and Levine, 2021) reframed control as autoregressive sequence modeling over $(\hat{R}_t, s_t, a_t)$ tokens with return-to-go $\hat{R}_t = \sum_{t'\ge t} r_{t'}$ as the conditioning variable. [RvS](https://arxiv.org/abs/2112.10751) (Emmons, Eysenbach, Kostrikov and Levine, Berkeley, 2021) then showed "simply maximizing likelihood with a two-layer feedforward MLP is competitive with state-of-the-art results," locating the gain in conditioning and capacity rather than attention.

**Why did sim-to-real work for legs and not for hands?**

[Tobin et al.](https://arxiv.org/abs/1703.06907) (OpenAI and Berkeley, 2017) established domain randomization: randomize textures, lighting and camera pose widely enough that reality becomes one more sample from the training distribution. OpenAI's Dactyl extended this to dynamics randomization for in-hand manipulation, and [Solving Rubik's Cube with a Robot Hand](https://arxiv.org/abs/1910.07113) (2019) added automatic domain randomization, which grows randomization ranges as performance permits. The honest reading is narrow: [reported](https://www.alexirpan.com/2019/10/29/openai-rubiks.html) success was roughly 60% on 15-rotation scrambles and 20% on a maximally difficult 26-rotation scramble, the solve plan came from Kociemba's classical solver rather than learning, and state estimation leaned on an instrumented cube. Dexterous rotation under randomization was demonstrated; learned cube solving was not. Legged locomotion fared better. [Hwangbo, Lee, Dosovitskiy, Bellicoso, Tsounis, Koltun and Hutter](https://arxiv.org/abs/1901.08652) (ETH Zurich RSL and Intel, *Science Robotics* 4(26):eaau5872, 16 January 2019) trained in simulation with a learned actuator network modeling series-elastic drive dynamics and transferred to ANYmal, achieving energy-efficient command following, higher running speed and recovery from falls. [Rudin, Hoeller, Reist and Hutter](https://arxiv.org/abs/2109.11978) (ETH RSL, 2021) simulated thousands of robots in parallel on one workstation GPU, producing flat-terrain policies "in under four minutes, and in twenty minutes for uneven terrain." [RMA](https://arxiv.org/abs/2107.04034) (Kumar, Fu, Pathak and Malik, Berkeley and CMU, 2021) closed the remaining gap with two-phase teacher-student training: a base policy trains with privileged access to the true environment vector $z_t$ (friction, payload, terrain), then an adaptation module regresses $\hat{z}_t$ from a short history of proprioceptive states and actions alone, so deployment needs no exteroception and adapts "in fractions of a second." The asymmetry has a clean cause. Locomotion is quasi-periodic, its contacts are brief and impulsive, its reward is a body velocity command that is trivially writable, and proprioception suffices for state estimation. Manipulation means persistent multi-contact interaction with objects of unknown friction, compliance and mass, needs vision, and has goals that resist scalar reward specification. Simulators are accurate enough for the first regime and not the second.

**Theory sidebar: what is proven and what is assumed?**

For online RL with linear function approximation, [Jin, Yang, Wang and Jordan](https://arxiv.org/abs/1907.05388) (Berkeley, Princeton, Yale and Northwestern, 2019) gave the first algorithm with "both polynomial runtime and polynomial sample complexity" there, an optimistic Least-Squares Value Iteration with regret $\tilde{\mathcal{O}}(\sqrt{d^3 H^3 T})$ for feature dimension $d$, horizon $H$ and $T$ steps, with no dependence on $|\mathcal{S}|$ or $|\mathcal{A}|$. What is *assumed* is linear MDP structure: both $P(s'|s,a)$ and $r(s,a)$ are linear in a known feature map $\phi(s,a)\in\mathbb{R}^d$. That does not hold for a robot, and nobody claims it does. Offline, [Jin, Yang and Wang](https://arxiv.org/abs/2012.15085) showed pessimistic value iteration is "not only provably efficient but also minimax optimal," using an uncertainty quantifier as a penalty and explicitly not assuming "sufficient coverage of the dataset." [Rashidinejad, Zhu, Ma, Jiao and Russell](https://arxiv.org/abs/2103.12021) (Berkeley, 2021) unified imitation learning and offline RL through "a weak version of the concentrability coefficient that measures the deviation from the behavior policy to the expert policy alone," rather than uniformly over all policies, showing a lower confidence bound method "achieves a faster rate of $1/N$ for nearly-expert datasets compared to the usual rate of $1/\sqrt{N}$." Single-policy concentrability is the load-bearing theoretical idea for physical intelligence: your dataset need only cover the one policy you hope to recover, exactly the regime a teleoperation dataset occupies.

```
Deep RL, 2013 to 2021
|
+-- Value-based (discrete)                       [DeepMind]
|   +-- DQN 2013/2015 --> Double --> PER --> Dueling
|   +-- C51 distributional --> QR-DQN --> Rainbow (223% median)
|
+-- Policy gradient / on-policy
|   +-- TRPO 2015, GAE 2015     [Berkeley: Schulman, Levine, Abbeel, Jordan]
|   +-- PPO 2017                [OpenAI]
|   +-- A3C 2016, IMPALA/V-trace 2018            [DeepMind]
|
+-- Off-policy continuous control
|   +-- DPG 2014, DDPG 2016     [DeepMind: Silver, Lillicrap]
|   +-- TD3 2018                [McGill / Mila: Fujimoto, Meger, Precup]
|   +-- SAC 2018 <-- default for real robots     [Berkeley BAIR/RAIL]
|
+-- Model-based
|   +-- PETS 2018, MBPO 2019    [Berkeley RAIL]
|   +-- Dreamer v1/v2/v3, MuZero                 [Toronto/Vector + DeepMind]
|   +-- TD-MPC / TD-MPC2        [UCSD: Hansen, Wang, Su]
|
+-- Exploration
|   +-- pseudo-counts, ICM, RND, Go-Explore
|       [DeepMind, Berkeley, OpenAI, Uber AI]
|
+-- OFFLINE RL  <-- the branch physical intelligence took
|   +-- BCQ 2019 --> BEAR --> CQL 2020 --> IQL 2021, AWAC
|   +-- Decision Transformer / Trajectory Transformer --> RvS
|   +-- D4RL benchmark          [Berkeley RAIL: Levine, Kumar, Kostrikov]
|
+-- Sim-to-real
    +-- domain randomization 2017, Dactyl, ADR   [OpenAI]
    +-- ANYmal 2019, massively parallel 2021     [ETH Zurich RSL]
    +-- RMA 2021 teacher-student  [Berkeley + CMU: Kumar, Fu, Pathak, Malik]
```

**What remains open at the end of this arc?**

Four problems stand out, and the first is sample complexity on real hardware: the 200M-frame regime has no hardware analogue, and even SAC leaves per-task real-robot training in the hours-to-days range with human resets. Second, reward specification: locomotion succeeded partly because velocity tracking is a writable reward, while "fold the laundry" is not, so reward engineering silently absorbs the human effort RL was meant to eliminate. Third, non-stationarity: the MDP assumption fails for wearing gearboxes, changing payloads and shifting light, exactly the gap RMA patches empirically rather than solves. Fourth and most consequential, value-based RL does not show the clean loss-versus-compute scaling that made supervised learning predictable, so more data and more parameters do not reliably buy more capability. The fragility underneath was documented directly: [Henderson et al.](https://arxiv.org/abs/1709.06560) (McGill and Mila, AAAI 2018) showed reported results swing with random seeds, architecture and reward scaling enough to invalidate many published comparisons, and [Engstrom, Ilyas, Santurkar, Tsipras, Janoos, Rudolph and Madry](https://arxiv.org/abs/2005.12729) (MIT, 2020) showed code-level optimizations absent from the papers "are responsible for most of PPO's gain in cumulative reward over TRPO." When an algorithm's advantage lives in its implementation rather than its objective, the field has a measurement problem and not merely an engineering one. The offline turn, the sequence-modeling reframings and single-policy concentrability are the threads that survive this reckoning and lead into imitation learning at scale.

*Where this leads.* The reckoning above is what pushed the field toward supervised learning on demonstrations, and Section 5 picks up exactly there. Keep two results from this section in hand while reading it. The first is that conditioned behavior cloning matched temporal-difference methods on offline benchmarks, which removed the main argument for keeping a value function at all. The second is single-policy concentrability, which is the formal reason a policy trained on a fixed dataset can only be trusted near that dataset, and which reappears in Section 5 as the practical reason robot data collection became the central activity of the field.

---

## 5. Physical Intelligence Proper: From Guided Policy Search to Vision-Language-Action Models

**What did the first credible end-to-end visuomotor learning system actually optimize?**

The modern lineage begins with guided policy search, introduced by Sergey Levine and Vladlen Koltun in 2013 and brought to real hardware with raw camera input by [Levine, Finn, Darrell and Abbeel in the 2016 JMLR paper "End-to-End Training of Deep Visuomotor Policies"](https://arxiv.org/abs/1504.00702). The insight was that policy gradient on a convolutional network with tens of thousands of real trials is hopeless, while supervised regression onto a good local controller is easy, so they split the problem. Let $\mathbf{x}_t$ be full state, available only at training time from motion capture, $\mathbf{o}_t$ the camera image plus joint encoders available at test time, $\mathbf{u}_t$ the torque command, and $\ell(\mathbf{x}_t,\mathbf{u}_t)$ a per-step cost. Training is a constrained problem over $N$ initial conditions:

$$\min_{\theta,\, p_1,\dots,p_N} \ \sum_{i=1}^{N} \mathbb{E}_{p_i}\!\left[\sum_{t=1}^{T}\ell(\mathbf{x}_t,\mathbf{u}_t)\right] \quad \text{subject to} \quad p_i(\mathbf{u}_t\mid\mathbf{x}_t) \;=\; \pi_\theta(\mathbf{u}_t\mid\mathbf{o}_t)\ \ \forall i,t .$$

Each $p_i$ is a time-varying linear-Gaussian controller $p_i(\mathbf{u}_t\mid\mathbf{x}_t)=\mathcal{N}(K_{it}\mathbf{x}_t + k_{it},\ \Sigma_{it})$, obtained by fitting a locally linear dynamics model $p(\mathbf{x}_{t+1}\mid\mathbf{x}_t,\mathbf{u}_t)=\mathcal{N}(f_{xt}\mathbf{x}_t+f_{ut}\mathbf{u}_t+f_{ct},\,F_t)$ by linear regression to sampled rollouts and then solving the resulting LQG problem with iterative LQR. The constraint is what makes this policy learning rather than trajectory optimization: it forces one global network $\pi_\theta$ to reproduce all $N$ local controllers using images alone. Levine and colleagues enforce it with a Bregman alternating direction method of multipliers, alternating a supervised step $\min_\theta \sum_{i,t}\mathbb{E}_{p_i(\mathbf{x}_t)}\!\left[D_{\mathrm{KL}}\!\left(p_i\,\|\,\pi_\theta\right)\right] + \sum_{i,t}\lambda_{it}^{\top}\big(\mathbb{E}_{\pi_\theta}[\mathbf{u}_t]-\mathbb{E}_{p_i}[\mathbf{u}_t]\big)$ with a trajectory step that re-optimizes each $p_i$ under a KL trust region against the current $\pi_\theta$, the multipliers $\lambda_{it}$ updated by dual gradient ascent on the constraint violation. The coupling exists because a state-based controller can exploit information the camera does not carry, so the local controllers must not run away to solutions the image-conditioned network cannot imitate.

**Why did a single pooling layer, the spatial softmax, matter so much?**

The visuomotor network had only about 92,000 parameters precisely because the visual representation was engineered for sample efficiency. Global average pooling destroys spatial information; flattening the feature map creates a fully connected layer that overfits within a few thousand trials. The spatial softmax instead computes, per channel $c$, a spatial distribution over feature-map activations $a_{cij}$ and returns its expected position:

$$s_{cij}=\frac{\exp(a_{cij}/\alpha)}{\sum_{i',j'}\exp(a_{ci'j'}/\alpha)},\qquad f_c=\Big(\textstyle\sum_{i,j}s_{cij}\,x_{ij},\ \sum_{i,j}s_{cij}\,y_{ij}\Big),$$

where $(x_{ij},y_{ij})$ are the normalized image coordinates of cell $(i,j)$ and $\alpha$ is a learned temperature. The output is $2C$ numbers for $C$ channels, a set of feature points. This is a strong and correct inductive bias for manipulation: what a controller needs from vision is mostly where things are, expressed in a frame commensurate with end-effector coordinates, and the softmax makes that differentiable and translation-equivariant while cutting the dimensionality entering the motor layers by orders of magnitude. That is why a real robot could learn to hang a coat hanger or screw a cap onto a bottle from images in a few hours, and the lesson persists in every modern architecture: put the geometry in the representation, not in the regression head.

**If reinforcement learning was so expensive, why not let the robots collect their own data?**

That was the second era, roughly 2015 to 2018, and it was driven by labor economics. [Lerrel Pinto and Abhinav Gupta at CMU](https://arxiv.org/abs/1509.06825) reframed grasping as 18-way binary classification over image patches and collected 50,000 grasp attempts over 700 robot hours with no human labels. Google Brain and Berkeley scaled the idea: [Levine, Pastor, Krizhevsky and Quillen](https://arxiv.org/abs/1603.02199) ran 6 to 14 manipulators for two months to gather over 800,000 grasp attempts, then used a grasp-success predictor $g_\psi(I_t,\Delta)$ as a continuous servoing controller, choosing at each step the motion $\Delta$ maximizing predicted success, which yields closed-loop correction with no camera calibration or hand-eye extrinsics. In parallel [Agrawal, Nair, Abbeel, Malik and Levine](https://arxiv.org/abs/1606.07419) collected over 100,000 pokes across 400 hours and jointly trained forward and inverse dynamics models.

The most ambitious version of this thread was learned video prediction as a world model. [Finn, Goodfellow and Levine](https://arxiv.org/abs/1605.07157) trained action-conditioned predictors on 59,000 robot pushing interactions, the best variant being CDNA, which predicts a few $5\times5$ convolutional kernels $\kappa_k$ plus compositing masks $m_{kl}$ so objects move coherently, forming $\hat I_{t+1}(i,j) = \sum_{k,l} m_{kl}(i,j)\,\big(\kappa_k \ast I_t\big)(i,j)$. [Finn and Levine's "Deep Visual Foresight"](https://arxiv.org/abs/1610.00696) closed the loop by planning in pixel space: given designated source and target pixels, sample action sequences, roll the predictor forward, pick the sequence maximizing probability mass arriving at the goal pixel, replan every step. [Ebert, Finn, Dasari, Xie, Lee and Levine](https://arxiv.org/abs/1812.00568) extended this to deformable and novel objects, and [RoboNet](https://arxiv.org/abs/1910.11215) pooled 15 million frames from seven platforms to ask whether one predictor could serve many bodies. It stalled for reasons worth stating plainly: pixel prediction spends capacity on photometric detail irrelevant to control, errors compound so planning beyond a second or two becomes fiction, and the sampling planner has no gradient to exploit. Video prediction returned later as a pretraining objective and subgoal generator, not as the planner.

**What did QT-Opt prove, and what did it cost?**

[QT-Opt, from Kalashnikov and colleagues at Google Brain in 2018](https://arxiv.org/abs/1806.10293), was the high-water mark of real-world deep reinforcement learning for manipulation. It learns a continuous-action Q-function of over 1.2 million parameters by distributed off-policy Bellman regression and dispenses with an actor entirely, obtaining the greedy action by the cross-entropy method at every step:

$$Q_\theta(\mathbf{s}_t,\mathbf{a}_t)\ \leftarrow\ r_t + \gamma \max_{\mathbf{a}'} Q_{\bar\theta}(\mathbf{s}_{t+1},\mathbf{a}'),\qquad \max_{\mathbf{a}'}Q_{\bar\theta}\ \approx\ \mathrm{CEM}\big(Q_{\bar\theta}(\mathbf{s}_{t+1},\cdot)\big),$$

with $\bar\theta$ a lagged target copy and CEM refitting a Gaussian to the top-scoring sampled actions. Dropping the parametric actor removes the deadly-triad instability of off-policy actor-critic at the cost of many forward passes per decision. Trained on over 580,000 real grasp attempts, QT-Opt reported 96% grasp success on unseen objects plus emergent regrasping, probing and singulation that no one demonstrated, and [MT-Opt](https://arxiv.org/abs/2104.08212) generalized the machinery to a task-conditioned Q-function. The cost is the whole story: hundreds of robot hours and a hand-instrumented or learned reward per narrow behavior, and nobody has repeated it for a task family as broad as language-conditioned manipulation.

**Why did the field abandon reinforcement learning for behavior cloning around 2021?**

Because the binding constraint turned out to be task breadth, not asymptotic performance, and human teleoperation buys breadth per dollar far more cheaply than exploration does, while also removing reward specification, environment resets and safe exploration in one stroke. [BC-Z, by Eric Jang, Alex Irpan, Mohi Khansari, Daniel Kappler, Frederik Ebert, Corey Lynch, Sergey Levine and Chelsea Finn at Google and Everyday Robots](https://arxiv.org/abs/2202.02005), made the argument concretely: one language- and video-conditioned policy trained on demonstrations plus human interventions across more than 100 tasks reached 44% average success on 24 tasks for which it had zero robot demonstrations, generalization coming from the conditioning embedding rather than from more trials. Berkeley RAIL industrialized the data side with [BridgeData V2](https://arxiv.org/abs/2308.12952), 60,096 trajectories across 24 environments on a low-cost WidowX platform, released so policies trained elsewhere could be evaluated on it. The bet, which proved correct, was that a mediocre objective on broad data beats an excellent objective on narrow data.

**What is actually wrong with mean-squared-error behavior cloning?**

The problem is multimodality. Suppose a demonstrator sometimes reaches around an obstacle to the left and sometimes to the right, so $p(\mathbf{a}\mid\mathbf{o})=\tfrac12\delta_{\mathbf{a}_L}+\tfrac12\delta_{\mathbf{a}_R}$. A unimodal regressor trained with squared error converges to the conditional mean $\tfrac12(\mathbf{a}_L+\mathbf{a}_R)$, which drives the gripper straight into the obstacle. This is a loss-function problem, not a capacity problem, and no amount of data fixes it. Three answers appeared in rapid succession.

[Implicit Behavioral Cloning, from Pete Florence and colleagues at Google Research in 2021](https://arxiv.org/abs/2109.00137), replaces the regressor with an energy function and defines the policy implicitly as $\hat{\mathbf{a}} = \arg\min_{\mathbf{a}\in\mathcal{A}} E_\theta(\mathbf{o},\mathbf{a})$, trained with an InfoNCE objective against $N_{\text{neg}}$ sampled counterexamples $\tilde{\mathbf{a}}_j$:

$$\mathcal{L}_{\text{InfoNCE}} = -\log\frac{\exp\!\big(-E_\theta(\mathbf{o},\mathbf{a})\big)}{\exp\!\big(-E_\theta(\mathbf{o},\mathbf{a})\big)+\sum_{j=1}^{N_{\text{neg}}}\exp\!\big(-E_\theta(\mathbf{o},\tilde{\mathbf{a}}_j)\big)}.$$

The durable contribution is the theory: an implicit model can represent discontinuous and set-valued functions a continuous explicit network provably cannot approximate uniformly, and contact-rich manipulation is full of genuine discontinuities at the moment of contact.

[Action Chunking with Transformers, from Tony Zhao, Vikash Kumar, Sergey Levine and Chelsea Finn at Stanford IRIS in 2023](https://arxiv.org/abs/2304.13705), attacks the temporal side. The policy emits a chunk $\mathbf{a}_{t:t+k}$ of length $k=100$ at 50 Hz, shortening the effective horizon by a factor of $k$ and so cutting the compounding-error term in the classic behavior-cloning bound while preventing stalls where a demonstrator paused. Chunk-level idiosyncrasy is absorbed by a conditional variational autoencoder with a style latent $\mathbf{z}$, trained on the ELBO

$$\mathcal{L}_{\text{ACT}} = \mathbb{E}\big[\|\hat{\mathbf{a}}_{t:t+k}-\mathbf{a}_{t:t+k}\|_1\big] + \beta\, D_{\mathrm{KL}}\big(q_\phi(\mathbf{z}\mid \mathbf{a}_{t:t+k},\bar{\mathbf{o}}_t)\,\|\,\mathcal{N}(0,I)\big),$$

with $\mathbf{z}$ sampled from the prior at test time so a single mode is committed to rather than averaged. Because executing chunks open-loop produces jerk at the seams, ACT adds temporal ensembling, averaging overlapping predictions from successive timesteps with exponentially decaying weights $\hat{\mathbf{a}}_t = \sum_i w_i \mathbf{a}_t^{(i)} / \sum_i w_i$, $w_i = \exp(-m i)$. On a low-cost bimanual ALOHA rig this reached 80 to 90% success on six fine-grained tasks such as threading a cable tie from about 10 minutes of demonstrations.

[Diffusion Policy, from Cheng Chi, Zhenjia Xu, Siyuan Feng, Eric Cousineau, Yilun Du, Benjamin Burchfiel, Russ Tedrake and Shuran Song, then at Columbia with Toyota Research Institute and MIT, Song now leading Stanford REALab](https://arxiv.org/abs/2303.04137), is the version that won. Writing $A_t = \mathbf{a}_{t:t+T_p}$ for the chunk and $A_t^k$ for its noised version at step $k$, the objective is the DDPM noise-prediction loss applied to actions rather than pixels,

$$\mathcal{L} = \mathbb{E}_{k,\epsilon}\Big[\big\|\epsilon - \epsilon_\theta\big(\mathbf{o}_t,\ A_t^{0}+\epsilon^k,\ k\big)\big\|^2\Big],$$

where $A_t^0$ is the demonstrated chunk, $\epsilon\sim\mathcal{N}(0,I)$ and $\epsilon^k$ is noise scaled by the step-$k$ schedule. Inference runs $A_t^{k-1} = \alpha_k\big(A_t^{k} - \gamma_k\,\epsilon_\theta(\mathbf{o}_t,A_t^{k},k)\big) + \sigma_k\,\mathcal{N}(0,I)$, literally noisy gradient descent on an implicit energy landscape, so it inherits Implicit BC's multimodality without the expensive negative sampling. Two choices matter operationally: the observation is conditioning only and is never denoised, keeping the visual encoder trainable end-to-end; and control is receding-horizon, predicting $T_p$ steps and executing only the first $T_a < T_p$, buying temporal consistency while retaining reactivity. The paper reported a 46.9% average relative improvement over prior state of the art across 12 tasks and four benchmarks.

**Why did flow matching then displace diffusion?**

Because 100 denoising steps at 50 Hz is not a control loop. Flow matching keeps multimodality but learns a straighter probability path. Sample $\tau\in[0,1]$, form the interpolant $A_t^{\tau}=\tau A_t + (1-\tau)\epsilon$, and regress onto the conditional velocity field $u(A_t^{\tau}\mid A_t)=\epsilon - A_t$:

$$L^{\tau}(\theta)=\mathbb{E}_{p(A_t\mid \mathbf{o}_t),\, q(A_t^{\tau}\mid A_t)}\Big[\big\|v_\theta(A_t^{\tau},\mathbf{o}_t) - u(A_t^{\tau}\mid A_t)\big\|^2\Big].$$

Inference is forward Euler integration $A^{\tau+\delta}=A^{\tau}+\delta\, v_\theta(A^{\tau},\mathbf{o}_t)$. Because the conditional paths are straight lines the discretization error is small, and [$\pi_0$ reports usable chunks in 10 integration steps](https://arxiv.org/html/2410.24164v1), an order of magnitude cheaper than DDPM, which is what makes a multi-billion-parameter backbone viable at 50 Hz.

**Does robot data transfer across bodies?**

This is the empirical question that defined 2022 to 2024. [RT-1, from Anthony Brohan and 50 co-authors at Google and Everyday Robots](https://arxiv.org/abs/2212.06817), established the recipe: a 35M-parameter EfficientNet plus FiLM plus TokenLearner plus Transformer stack, roughly 130,000 episodes over 700 instructions from 13 robots across 17 months, each of 11 action dimensions discretized into 256 bins and emitted as tokens at 3 Hz. It reported [97% success on seen instructions and 76% on unseen ones, 83% under added distractors and 59% under changed backgrounds](https://arxiv.org/html/2212.06817v2). RT-2 made the conceptual leap: rather than train a robot-specific network, [co-fine-tune an existing web-scale vision-language model, PaLI-X at 55B or PaLM-E at 12B, on internet vision-question-answering data mixed with robot trajectories whose actions are written as strings of numbers and consumed as ordinary text tokens](https://arxiv.org/abs/2307.15818). Across about 6,000 trials it showed generalization to unseen objects, spatial and numerical instructions, and chain-of-thought reasoning. Actions became a language.

[Open X-Embodiment, coordinated by Google DeepMind with 21 institutions](https://arxiv.org/abs/2310.08864), tested transfer directly by pooling 60 datasets into over 1 million trajectories spanning 22 robot embodiments, 527 skills and 160,266 tasks. The result was positive transfer, not mere co-existence: [RT-1-X's mean success rate was 50% higher than either the original per-dataset method or RT-1 alone in small-data domains, and RT-2-X roughly tripled RT-2 on emergent skills](https://arxiv.org/html/2310.08864v9). [DROID, led by Alexander Khazatsky and Karl Pertsch across Stanford, Berkeley and 11 other labs](https://arxiv.org/abs/2403.12945), argued for scene diversity over episode count: 76,000 trajectories and 350 hours across 564 scenes and 84 tasks, gathered by 50 collectors on a standardized Franka setup across three continents in 12 months. [Octo](https://arxiv.org/abs/2405.12213) provided the open generalist baseline, a transformer with readout tokens and a diffusion action head trained on 800,000 Open X-Embodiment trajectories, and [RDT-1B from Songming Liu and colleagues at Tsinghua](https://arxiv.org/abs/2410.07864) contributed a 1.2B-parameter diffusion transformer with a physically interpretable unified action space built to absorb embodiment heterogeneity.

**What does a modern vision-language-action model look like, concretely?**

```
    "make an espresso"        [ img_t, cam_1..cam_N ]      [ q_t, gripper ]
            |                            |                        |
            v                            v                        v
   +-----------------+        +--------------------+     +-----------------+
   | SentencePiece   |        | ViT / SigLIP+DINOv2|     | state projector |
   | text tokenizer  |        | ~400M, patch tokens|     | (linear -> d)   |
   +--------+--------+        +----------+---------+     +--------+--------+
            |                            |                        |
            +----------------------------+------------------------+
                                         v
              +-------------------------------------------------+
              |  LANGUAGE BACKBONE  (PaliGemma / Gemma3 / Llama2)|
              |  3B - 7B decoder, block-causal attention         |
              |  optional: emits subtask text + FAST tokens      |
              +----------------+--------------------+-----------+
                               | KV cache / prefix   | stop-grad
                               v                     v  (knowledge insulation)
                     +-------------------------------------+
                     |  ACTION EXPERT  (300M - 860M)       |
                     |  flow-matching velocity v_theta     |
                     |  input: A^tau, tau, state, prefix   |
                     |  10 Euler steps, tau: 0 -> 1        |
                     +------------------+------------------+
                                        v
                        A_t = [ a_t, a_{t+1}, ... , a_{t+H-1} ]
                             action chunk, H = 30..50
                                        |
                        execute first T_a << H, then replan
```

[OpenVLA, led by Moo Jin Kim at Stanford with Berkeley, Toyota Research Institute, Google DeepMind and MIT](https://arxiv.org/abs/2406.09246), was the open instantiation that let academics participate: 7B parameters, a Llama 2 backbone with fused DINOv2 and SigLIP features, 970,000 real demonstrations, reported to beat the closed 55B RT-2-X by 16.5 absolute percentage points across 29 tasks while remaining LoRA-finetunable on consumer GPUs and servable quantized. [$\pi_0$, from Kevin Black, Noah Brown, Danny Driess and colleagues at Physical Intelligence](https://arxiv.org/abs/2410.24164), fixed the frequency problem: a 3B PaliGemma backbone plus a 300M action expert, 3.3B total, trained on over 10,000 hours spanning 7 robot configurations and 68 tasks plus Open X-Embodiment, BridgeData V2 and DROID, emitting $H=50$ chunks by flow matching at 20 to 50 Hz.

**How did the Physical Intelligence line evolve after $\pi_0$?**

The line evolved in four steps, each answering a specific defect. First, [FAST, by Karl Pertsch, Kyle Stachowicz and colleagues](https://arxiv.org/abs/2501.09747), showed that per-dimension per-timestep binning collapses on high-frequency data because consecutive actions are nearly identical, so tokens carry almost no information; a discrete cosine transform of the chunk, quantized in frequency and byte-pair-encoded, yields a compact tokenization that matched diffusion-based $\pi_0$ while cutting training time by up to 5x, released as a FAST+ tokenizer fit on 1 million trajectories. Second, [Knowledge Insulation](https://arxiv.org/html/2505.23705v1) diagnosed why bolting a flow-matching expert onto a VLM degrades semantic generalization, namely that action-expert gradients corrupt the backbone, and fixed it by supervising the backbone with FAST tokens and web co-training data while blocking gradient flow from the continuous head. Third, [$\pi_{0.5}$](https://arxiv.org/abs/2504.16054) co-trained on heterogeneous examples interleaving images, language commands, object detections, predicted semantic subtasks and low-level actions, reporting cleaning of entire kitchens and bedrooms in previously unseen homes. Fourth, [$\pi^{*}_{0.6}$ with RECAP](https://arxiv.org/abs/2511.14759) reintroduced reinforcement learning without reintroducing instability. A distributional value function $p_\phi(V\mid\mathbf{o}_t,\ell)$ is trained by cross-entropy over $B=201$ return bins, $n$-step advantages are formed as $\hat A(\mathbf{o}_t,\mathbf{a}_t,\ell)=\mathbb{E}\big[\sum_{t'=t}^{t+N-1} r_{t'} + V^{\pi}(\mathbf{o}_{t+N})\big]-V^{\pi}(\mathbf{o}_t)$, and the policy is trained conditioned on a binary improvement indicator $I_t=\mathbb{1}(\hat A > \epsilon_\ell)$ under $\min_\theta \mathbb{E}\big[-\log\pi_\theta(\mathbf{a}_t\mid\mathbf{o}_t,\ell) - \alpha\log\pi_\theta(\mathbf{a}_t\mid I_t,\mathbf{o}_t,\ell)\big]$, then sampled with classifier-free guidance $\hat\pi \propto \pi_{\text{ref}}\big(\pi_{\text{ref}}(\cdot\mid I)/\pi_{\text{ref}}\big)^{\beta}$. This is advantage-weighted regression recast as conditioning, which is why it tolerates demonstrations, autonomous rollouts and teleoperated interventions in one buffer, reporting throughput more than doubled, failure rate roughly halved, and 13 hours of continuous espresso production. Most recently [$\pi_{0.7}$](https://arxiv.org/abs/2604.15483), posted April 2026, is a 5B model pairing a 4B Gemma3-initialized VLM and video-history encoder with an 860M action expert, steered by four dropout-trained context channels: subtask instructions, subgoal images from a BAGEL-based world model, episode metadata for speed and quality, and control-mode labels. Its most striking claim is zero-shot cross-embodiment transfer, 85.6% task progress and 80% success folding shirts on a bimanual UR5e with no UR5e laundry data, against 90.9 and 80.6% for experienced human teleoperators. That is a company technical report with self-designed evaluations, not independent replication.

**Who else is in the race, and how do their bets differ?**

Google DeepMind Robotics split the stack explicitly. [Gemini Robotics 1.0](https://arxiv.org/abs/2503.20020) fine-tuned Gemini 2.0 into a VLA with a separate embodied-reasoning variant, and [Gemini Robotics 1.5 with Gemini Robotics-ER 1.5](https://arxiv.org/abs/2510.03342) pairs a multi-embodiment VLA with a dedicated embodied-reasoning model that plans, points and estimates progress, reporting the best aggregate score across 15 embodied-reasoning benchmarks including ERQA and Where2Place. Two mechanisms are novel: Motion Transfer, which lets one VLA absorb ALOHA, bi-arm Franka and Apollo humanoid data and transfer skills zero-shot across them, and Embodied Thinking, an interleaved natural-language thinking trace emitted before each action chunk. [NVIDIA GEAR's GR00T N1, led by Jim Fan and Yuke Zhu](https://arxiv.org/abs/2503.14734), is explicitly dual-system, a vision-language System 2 and a diffusion-transformer System 1 trained jointly on a data pyramid of real trajectories, human video and synthetic rollouts, deployed on the Fourier GR-1 humanoid. [Figure's Helix](https://www.figure.ai/news/helix) makes that split concrete in hardware: a 7B open-weight VLM at 7 to 9 Hz distills scene and instruction into one continuous latent, and an 80M cross-attention transformer conditions on it to emit 200 Hz actions, 4-bit quantized across two onboard GPUs under 60 watts. [NVIDIA's Cosmos Policy](https://arxiv.org/abs/2601.16163) takes the most different bet, post-training the Cosmos-Predict2 video model into a policy with no architectural change by encoding actions as latent frames inside the video diffusion process, reporting 98.5% on LIBERO and 67.1% on RoboCasa. Those are simulation benchmarks, a materially weaker claim than real-robot success.

**Which methodological arguments are actually live in 2026?**

Four arguments are genuinely live. On hierarchy, everyone now runs a high-level semantic planner over a low-level action expert, but the interface is contested: natural-language subtasks in $\pi_{0.5}$ and Gemini Robotics, one continuous latent in Helix, generated subgoal images in $\pi_{0.7}$. Language is interpretable and web-pretrainable; a latent is higher bandwidth and lower latency. On discrete tokens versus continuous heads, Knowledge Insulation is the synthesis rather than a victory for either side: FAST tokens are the right signal for teaching the backbone, flow matching the right signal for emitting commands, and the two should not share gradients. On web pretraining, RT-2's numerical and spatial instruction following and the Gemini Robotics-ER sweep are real evidence, but nobody has cleanly separated transferred physical understanding from transferred object naming. On scaling laws, honesty is required. [Fanqi Lin, Yingdong Hu and Yang Gao at Tsinghua, Shanghai Qi Zhi and Shanghai AI Laboratory](https://arxiv.org/abs/2410.18647) measured, over 40,000 demonstrations and 15,000 real rollouts, that normalized score follows $1 - c\,M^{-\gamma}$ in the number of environments or objects $M$, with $\gamma\approx 0.32$ to $0.33$ for objects and $\gamma\approx 0.24$ to $0.25$ for environments at Pearson $r$ from $-0.94$ to $-0.98$, while demonstrations per environment saturate quickly. An exponent of $0.25$ means halving the residual error needs roughly $2^{4}=16$ times more distinct environments, a brutal constant and not a law in the predictive sense compute-optimal language scaling is. On RL versus imitation, RECAP and [$\pi_{\text{RL}}$](https://arxiv.org/abs/2510.25889) show online fine-tuning of flow-based VLAs is tractable, [RL Token](https://arxiv.org/abs/2604.23073) reports speeding up the hardest phase of real Ethernet and charger insertion, and [iRe-VLA and VLA-RL](https://arxiv.org/html/2505.18719v1) alternate RL with supervised phases or freeze the backbone to dodge the instability direct policy gradient on a 7B model induces.

```
1993-2013  trajectory optimization + iLQR      (Todorov, Tassa, Levine & Koltun)
                    |
2015-2016  GUIDED POLICY SEARCH + spatial softmax   Berkeley BAIR/RAIL
           Levine, Finn, Darrell, Abbeel
              |                          |
              |                          +--> self-supervised data at scale
              |                               Pinto & Gupta, Pathak (CMU)
              |                               Levine et al. (Google)
              |                               Agrawal et al. (-> MIT Improbable)
              |                                     |
              |                          +----------+----------+
              |                          v                     v
              |                 video prediction         QT-Opt / MT-Opt
              |                 CDNA, Visual Foresight   Kalashnikov (Google)
              |                 Finn, Ebert, Dasari            |
              |                          |  (stalls: pixel     | (stalls: cost
              |                          |   error compounds)  |  per skill)
              v                          v                     v
2021-2023  IMITATION RENAISSANCE  <------+---------------------+
           BC-Z (Google/Everyday) | RoboNet | BridgeData V2 (Berkeley RAIL)
                    |
           +--------+--------+-------------------+
           v                 v                   v
      Implicit BC         ACT / ALOHA        Diffusion Policy
      Florence (Google)   Zhao, Finn         Chi, Song, Burchfiel
                          Stanford IRIS      Columbia (Song, now
                                             Stanford REALab) + TRI + MIT
           |                 |                   |
           +--------+--------+-------------------+
                    v
2022-2024  CROSS-EMBODIMENT SCALING
           RT-1 -> RT-2 -> RT-X / Open X-Embodiment  (Google DeepMind + 21 labs)
           DROID (Stanford/Berkeley/11 labs) | Octo (Berkeley) | RDT-1B (Tsinghua)
                    |
2024-2026  VISION-LANGUAGE-ACTION MODELS
           OpenVLA (Stanford/Berkeley/TRI/MIT/GDM)
           pi_0 -> FAST -> Knowledge Insulation -> pi_0.5 -> pi*_0.6/RECAP -> pi_0.7
                                                     Physical Intelligence
           Gemini Robotics 1.0/1.5 (Google DeepMind) | GR00T N1 (NVIDIA GEAR)
           Helix (Figure) | Cosmos Policy (NVIDIA) | world-action models
```

**What is still broken?**

Dexterity remains the hard wall: nearly every result above is parallel-jaw or simple bimanual, and multi-finger, force-modulated contact-rich assembly is exactly where RECAP and RL Token had to be invented. Long-horizon reliability is the second wall, since 90% per-stage success compounds to 35% over ten stages, making error detection and recovery rather than nominal success the binding constraint. Evaluation is a bottleneck in its own right, since real-robot A/B tests cost days of wall-clock time per comparison, which is why company reports dominate and independent replication is rare. When replication does happen it is sobering: [Zhang, Qi and Zheng at Macquarie University](https://arxiv.org/html/2511.11298v1) benchmarked ACT, OpenVLA, RDT-1B and $\pi_0$ under spatial and instance shift and found ACT collapsing from 48.3% in-distribution to 5.5%, with $\pi_0$ degrading most gracefully from 72.3 to 58.5%. Data heterogeneity is unresolved at the representation level, since action spaces, control rates, camera counts and gripper kinematics differ across every platform, and Motion Transfer and unified action spaces are patches rather than principled solutions. Latency and on-robot compute force real trade-offs, which is why Figure quantizes to 4 bits and why action experts stay an order of magnitude smaller than backbones. And the absence of a proven scaling law is the deepest gap: without a predictive relation between collection spend and capability, nobody can say how much data buys a general robot, and exponents near $0.25$ suggest the answer is uncomfortably large.

*Where this leads.* Everything above conditions a policy on observations without asking what an observation should be, or whether the system should model the world at all rather than mapping pixels to actions directly. That question has its own literature, with its own decade of failures and its own live architectural dispute, and Section 6 takes it up. It matters commercially as well as intellectually, because a world model is the only known route to evaluating or improving a policy without running the robot.

---

## 6. World Models, Video Prediction, and Self-Supervised Representations for Control

**Why learn a model of the world instead of just a policy?**

The model-based bet is estimation-theoretic. A transition kernel lets you plan, assign credit over long horizons, and reuse one model across tasks, exactly as a Kalman filter's process model is reusable while a tuned gain is not. The cost is the simulation lemma of Michael Kearns and Satinder Singh, [Near-Optimal Reinforcement Learning in Polynomial Time](https://link.springer.com/article/10.1023/A:1017984413808) (2002), restated by Sam Lobel and colleagues at Brown in [An Optimal Tightness Bound for the Simulation Lemma](https://arxiv.org/html/2406.16249) (2024). For a true MDP $M=(\mathcal{S},\mathcal{A},P,R,\gamma)$ and a learned $\hat{M}$ with rewards in $[0,1]$,

$$\forall s,\pi:\quad \big|V^\pi_M(s) - V^\pi_{\hat{M}}(s)\big| \;\le\; \frac{\epsilon_R}{1-\gamma} \;+\; \frac{\gamma\,\epsilon_T}{2(1-\gamma)^2},$$

where $\epsilon_R = \sup_{s,a}|R-\hat{R}|$ is the worst-case reward error, $\epsilon_T = \sup_{s,a}\|P(\cdot|s,a)-\hat{P}(\cdot|s,a)\|_1$ the worst-case transition error in total variation, $\gamma$ the discount, and $V^\pi$ the discounted return of $\pi$. With effective horizon $H=(1-\gamma)^{-1}$ the dynamics term grows as $O(\epsilon_T H^2)$: one factor of $H$ counts steps at which error is injected, the second the steps over which it integrates. This is the quadratic compounding Stéphane Ross and Drew Bagnell derived for behavior cloning in [Efficient Reductions for Imitation Learning](https://proceedings.mlr.press/v9/ross10a.html) (AISTATS 2010). Imitation suffers covariate shift in state space; a world model suffers it in rollout space, since the planner seeks the sequences the model rates highly, which are those least constrained by data. Nathan Lambert, Brandon Amos, Omry Yadan and Roberto Calandra named the disease in [Objective Mismatch in Model-based RL](https://arxiv.org/abs/2002.04523) (L4DC 2020). Everything below shrinks $\epsilon_T$ where it matters or redefines "matters" so $\epsilon_T$ is measured only on task-relevant quantities.

**What happened when the field predicted raw pixels?**

The line begins with Chelsea Finn, Ian Goodfellow and Sergey Levine at Berkeley in [Unsupervised Learning for Physical Interaction through Video Prediction](https://arxiv.org/abs/1605.07157) (NIPS 2016). That paper appears three times in this review by design, and the three framings are worth distinguishing: [Section 5](#5-physical-intelligence-proper-from-guided-policy-search-to-vision-language-action-models) treats it as an episode in the history of self-supervised robot data collection, [Section 9](#9-the-chelsea-finn-program-one-researchers-arc-as-a-map-of-the-field) treats it as the moment dynamics joined costs and representations on the list of things her program stopped hand-specifying, and this section treats it as the first serious attempt at a learned world model, which is the framing that explains why it failed. Rather than regressing intensities they predicted *motion*, computing $\hat{o}_{t+1}(x,y) = \sum_{k}\hat{m}^k(x,y)\,(o_t \ast \hat{w}^k)(x,y)$ with $\hat{w}^k$ the $k$-th transformation kernel and $\hat{m}^k$ a mask summing to one over $k$: Dynamic Neural Advection (DNA) emits per-pixel flow kernels, Convolutional DNA (CDNA) a few $5\times5$ global kernels, the Spatial Transformer Predictor (STP) affine warps. Appearance is carried and only displacement inferred, which is why it generalized to unseen objects; they released 59,000 robot pushing interactions. The deterministic form hit the multimodality wall at once, since an $\ell_2$ objective on a stochastic future returns the conditional mean, which is a blur. [SV2P](https://arxiv.org/abs/1710.11252) (Mohammad Babaeizadeh, Finn, Dumitru Erhan, Roy Campbell, Levine; ICLR 2018) added a per-sequence latent with objective $\mathbb{E}_q[\sum_t \log p(o_t|o_{<t},a_{<t},z)] - \mathrm{KL}(q(z|o_{1:T})\|p(z))$, giving "a different possible future for each sample of its latent variables"; [SVG-LP](https://arxiv.org/abs/1802.07687) (Emily Denton, Rob Fergus, NYU; ICML 2018) sharpened samples by replacing the fixed prior with a learned $p_\psi(z_t|o_{<t})$. [PredNet](https://arxiv.org/abs/1605.08104) (William Lotter, Gabriel Kreiman, David Cox, Harvard; ICLR 2017) had "each layer in the network mak[e] local predictions and only forward[] deviations from those predictions to subsequent network layers," a stacked innovation-driven filter and the closest thing here to a learned Kalman cascade.

The line stalled for control because pixel likelihood allocates capacity proportional to pixel variance rather than task relevance: parameters go to shadows and foliage while the millimeter contact geometry that decides a grasp is under-resolved, and blurred rollouts break any planner scoring actions by reconstruction.

**How did latent-state models change the calculus?**

[World Models](https://arxiv.org/abs/1803.10122) (David Ha, Jürgen Schmidhuber, Google Brain and IDSIA; 2018) set the template: a vision module V (a VAE compressing frames to $z_t\in\mathbb{R}^{32}$), a memory module M (an MDN-RNN giving $p(z_{t+1}|z_t,a_t,h_t)$ as a Gaussian mixture, so multimodality is explicit rather than averaged), and a controller C that is one linear layer on $[z_t,h_t]$ trained by CMA-ES, deliberately tiny so all capacity sits in the unsupervised model. [PlaNet](https://arxiv.org/abs/1811.04551) (Danijar Hafner, Timothy Lillicrap, Ian Fischer, Ruben Villegas, Ha, Honglak Lee, James Davidson; ICML 2019) formalized the Recurrent State Space Model, splitting the latent into deterministic $h_t$ and stochastic $s_t$ so information persists without resampling. Its objective is the sequential ELBO

$$\log p(o_{1:T}|a_{1:T}) \ge \sum_t \Big(\mathbb{E}_{q}\big[\log p(o_t|s_t)\big] - \mathrm{KL}\big(q(s_t|o_{\le t},a_{<t})\,\|\,p(s_t|s_{t-1},a_{t-1})\big)\Big),$$

with $q$ the filtering posterior and $p(s_t|s_{t-1},a_{t-1})$ the learned prior. The KL term is exactly the innovation penalty of a nonlinear filter: it charges the model whenever an observation drags the posterior off the dynamics prediction. PlaNet planned by CEM in latent space, needing "substantially fewer episodes" than model-free baselines. [Dreamer](https://arxiv.org/abs/1912.01603) (ICLR 2020) then replaced planning with learning, training actor $\pi_\phi$ and critic $v_\psi$ on imagined rollouts of horizon $H$ using $V^\lambda_t = r_t + \gamma[(1-\lambda)v_\psi(s_{t+1}) + \lambda V^\lambda_{t+1}]$, $V^\lambda_{t+H}=v_\psi(s_{t+H})$, and propagating *analytic* gradients $\partial V^\lambda/\partial\phi$ through the differentiable dynamics rather than a score-function estimator, a payoff no data augmentation provides. [DreamerV2](https://arxiv.org/abs/2010.02193) (ICLR 2021) swapped Gaussian latents for categorical ones with straight-through gradients, reaching "human-level performance on the Atari benchmark of 55 tasks." [DreamerV3](https://arxiv.org/abs/2301.04104) (2023) added symlog transforms, return normalization and KL balancing, and with one fixed configuration "outperforms specialized methods across over 150 diverse tasks" while being "the first algorithm to collect diamonds in Minecraft from scratch without human data or curricula."

**What is the alternative to reconstruction, and why is it the central split here?**

[The Value Equivalence Principle](https://arxiv.org/abs/2011.03506) (Christopher Grimm, André Barreto, Satinder Singh, David Silver, DeepMind and Michigan; NeurIPS 2020) states that two models are equivalent with respect to a policy set $\Pi$ and value set $\mathcal{V}$ "if they yield the same Bellman updates," that is $\mathcal{T}^\pi_{\hat{P}} v = \mathcal{T}^\pi_{P} v$ for all $\pi\in\Pi,v\in\mathcal{V}$, where $(\mathcal{T}^\pi_P v)(s) = r(s,\pi(s)) + \gamma\sum_{s'}P(s'|s,\pi(s))v(s')$. Shrinking $\Pi$ and $\mathcal{V}$ enlarges the equivalence class, so a low-capacity model can be exactly right for its only purpose. [MuZero](https://arxiv.org/abs/1911.08265) (DeepMind, Nature 2020) is the instantiation: its dynamics function is trained only through reward, value and policy losses and never decodes an observation. The split stays open because reconstruction gives dense transferable supervision while value equivalence gives task-specific efficiency and no way to pretrain on unlabeled video.

```
                     o_t ─► [encoder E] ─► z_t ─► [dynamics f(z_t, a_t)] ─► ẑ_{t+1}
                                                                              │
 (A) RECONSTRUCTION  ────────────────────────────────────────────────────────► [decoder D]
     SV2P / PlaNet / Dreamer / Cosmos                                          │
     loss:  ||D(ẑ_{t+1}) - o_{t+1}||^2  +  KL(q || prior)      every pixel ────┘
     pays for: leaves, shadows, texture the controller never queries
     upside : dense task-agnostic signal, pretrainable on any video

 (B) VALUE EQUIVALENT ───────────────────────────────────────────────────────► [r̂, v̂, π̂ heads]
     MuZero / Grimm et al. 2020                                                │
     loss:  (r̂-r)^2 + (v̂ - z_value)^2 + CE(π̂, π_MCTS)        no o target ─────┘
     pays for: only what changes a Bellman backup
     upside : minimal sufficient model;  downside: needs rewards and actions

 (C) LATENT PREDICTION (JEPA) ───────────────────────────────────────────────► sg[E_EMA(o_{t+1})]
     I-JEPA / V-JEPA 2 / DINO-WM                                               │
     loss:  ||ẑ_{t+1} - sg[E_EMA(o_{t+1})]||_1  + anti-collapse reg  ──────────┘
     pays for: whatever the encoder chose to keep
     upside : no pixel budget;  downside: target is itself, so collapse is possible
              and nothing externally checks that z kept what control needs
```

**Where did the robot visual backbone come from?**

It came from self-supervised image learning rather than from robotics. [Contrastive Predictive Coding](https://arxiv.org/abs/1807.03748) (Aaron van den Oord, Yazhe Li, Oriol Vinyals, DeepMind; 2018) learns "by predicting the future in latent space" via

$$\mathcal{L}_N = -\mathbb{E}\left[\log \frac{f_k(x_{t+k},c_t)}{\sum_{x_j\in X} f_k(x_j,c_t)}\right], \qquad I(x_{t+k};c_t) \;\ge\; \log N - \mathcal{L}_N,$$

where $c_t$ is an autoregressive summary of the past, $f_k(x,c)=\exp(x^\top W_k c)$ an unnormalized density ratio, and $X$ holds one positive with $N-1$ negatives; the second expression is the mutual-information bound that makes the loss principled rather than heuristic. [MoCo](https://arxiv.org/abs/1911.05722) (Kaiming He and colleagues, FAIR; CVPR 2020) made the negative bank a queue with a momentum encoder; [SimCLR](https://arxiv.org/abs/2002.05709) (Ting Chen, Geoffrey Hinton and colleagues, Google Brain; ICML 2020) used NT-Xent, $\ell_{i,j} = -\log\frac{\exp(\mathrm{sim}(z_i,z_j)/\tau)}{\sum_{k\neq i}\exp(\mathrm{sim}(z_i,z_k)/\tau)}$, for cosine similarity $\mathrm{sim}$ and temperature $\tau$; [BYOL](https://arxiv.org/abs/2006.07733) (DeepMind, NeurIPS 2020) dropped negatives entirely, relying on stop-gradient and an EMA target $\xi \leftarrow \tau\xi + (1-\tau)\theta$. Mathilde Caron and colleagues at FAIR and Inria produced [DINO](https://arxiv.org/abs/2104.14294) (ICCV 2021), then [DINOv2](https://arxiv.org/abs/2304.07193) (TMLR 2024) and [DINOv3](https://arxiv.org/abs/2508.10104) (2025), a 6.7B-parameter ViT-7B on 1.7B images introducing Gram anchoring, which aligns the feature Gram matrix to an earlier checkpoint's so dense features stop degrading over long schedules. [MAE](https://arxiv.org/abs/2111.06377) (He and colleagues, CVPR 2022) masked 75% of patches and reached 87.8% ImageNet-1K accuracy with ViT-Huge on ImageNet-1K alone. ViT features became the default robot stack for a mundane reason: patch tokens form a dense, spatially indexed, frozen feature field a policy can attend over, which global CNN pooling destroys.

**Do robotics-specific pretrained encoders beat generic ones?**

This is genuinely contested. [R3M](https://arxiv.org/abs/2203.12601) (Suraj Nair, Aravind Rajeswaran, Vikash Kumar, Finn, Abhinav Gupta, Stanford and Meta AI; CoRL 2022) trained on Ego4D human video with a time-contrastive loss $-\log\frac{e^{-\|z_i-z_j\|_2}}{e^{-\|z_i-z_j\|_2}+e^{-\|z_i-z_k\|_2}}$ over frames $i<j<k$ of a clip, a video-language alignment score, and an $\ell_1$ sparsity penalty, reporting success "over 20% [higher] compared to training from scratch and over 10% compared to state-of-the-art visual representations like CLIP and MoCo," with a Franka Panda learning real apartment tasks from 20 demonstrations. [MVP](https://arxiv.org/abs/2203.06173) (Tete Xiao, Ilija Radosavovic, Trevor Darrell, Jitendra Malik, Berkeley; 2022) took the MAE route, reporting frozen masked encoders "outperform supervised encoders by up to 80% absolute success rate." [Voltron](https://arxiv.org/abs/2302.12766) (Siddharth Karamcheti, Nair, Thomas Kollar, Finn, Dorsa Sadigh, Percy Liang, Stanford; RSS 2023) diagnosed the trade-off, that "masked autoencoding approaches pick up on low-level spatial features at the cost of high-level semantics, while contrastive learning approaches capture the opposite," and interleaved language-conditioned reconstruction with grounded language generation. Meta AI's VC-1 study, [Where are we in the search for an Artificial Visual Cortex for Embodied Intelligence?](https://arxiv.org/abs/2303.18240) (Arjun Majumdar, Franziska Meier, Rajeswaran, Pieter Abbeel, Malik, Dhruv Batra and others; NeurIPS 2023), built CortexBench from 17 locomotion, navigation, dexterous and mobile-manipulation tasks and reported honestly that VC-1 "outperforms all prior PVRs on average but does not universally dominate either," with only task-specific adaptation making it competitive everywhere. [Theia](https://arxiv.org/abs/2407.20179) (Jinghuan Shang and colleagues, Robotics and AI Institute; CoRL 2024) distilled several vision foundation models into one student that "outperforms its teacher models and prior robot learning models using less training data and smaller model sizes." The 2026 position is that no encoder wins across embodiments, and off-the-shelf DINOv2 is strong enough to make robotics-specific pretraining a task-dependent gain rather than a settled win.

**What is JEPA claiming, and how does it avoid collapse?**

Yann LeCun's [A Path Towards Autonomous Machine Intelligence, Version 0.9.2](https://openreview.net/pdf?id=BZ5a1r-kVsf) (2022-06-27, NYU Courant and Meta FAIR) argued generative prediction is the wrong target and proposed hierarchical Joint Embedding Predictive Architectures with a configurator and an intrinsic-cost module. The core object minimizes over encoder $E_\theta$ and predictor $P_\phi$

$$\mathcal{L}_{\text{JEPA}} = \big\| P_\phi\big(E_\theta(x), a\big) - \mathrm{sg}\big[E_{\bar\theta}(y)\big] \big\|,$$

with $x$ context, $y$ target, $a$ a latent or real action, $\mathrm{sg}[\cdot]$ stop-gradient and $\bar\theta$ an EMA of $\theta$. The loss never charges for unpredictable pixel detail, so residual observation entropy is discarded rather than modeled; the risk is that $E\equiv\text{const}$ achieves zero loss. Stop-gradient with an EMA teacher (BYOL, DINO) breaks the symmetry making collapse a stable fixed point, asymmetric masking (I-JEPA) forces context to carry information, and explicit regularization, as in [VICReg](https://arxiv.org/abs/2105.04906) (Adrien Bardes, Jean Ponce, LeCun; ICLR 2022), adds

$$\mathcal{L} = \lambda\, s(Z,Z') + \mu\big[v(Z)+v(Z')\big] + \nu\big[c(Z)+c(Z')\big],$$

with invariance $s(Z,Z')=\frac{1}{n}\sum_i \|z_i-z'_i\|_2^2$, variance $v(Z)=\frac{1}{d}\sum_{j}\max(0,\eta - \sqrt{\mathrm{Var}(Z_{:,j})+\epsilon})$ hinging each dimension's standard deviation above $\eta$, and covariance $c(Z)=\frac{1}{d}\sum_{i\neq j}[C(Z)]_{ij}^2$ penalizing off-diagonals of $C(Z)=\frac{1}{n-1}\sum_i (z_i-\bar{z})(z_i-\bar{z})^\top$. Variance forbids dimensional collapse and covariance forbids redundancy, together a whitening constraint familiar from decorrelating an estimator's error covariance.

[I-JEPA](https://arxiv.org/abs/2301.08243) (Mahmoud Assran and colleagues, Meta AI; CVPR 2023) predicted representations of large target blocks from one context block, training ViT-Huge/14 on ImageNet with 16 A100s in under 72 hours. The control payoff arrived with [V-JEPA 2](https://arxiv.org/abs/2506.09985) (Assran, Adrien Bardes, David Fan, Nicolas Ballas and 26 co-authors, Meta AI; 2025): a 1B-parameter ViT-g encoder pretrained on "more than 1 million hours of internet video," post-trained into action-conditioned V-JEPA 2-AC on roughly 62 hours of unlabeled DROID video, then run zero-shot on Franka arms in two labs with no task rewards or demonstrations. Averages over both labs are 100% reach, 65% grasp cup, 80% pick-and-place cup and 65% pick-and-place box, against a DROID-finetuned Octo at 15% on both grasp cup and pick-and-place and a Cosmos baseline at 60 and 50%; planning costs 16 seconds per action versus 4 minutes for Cosmos. [DINO-WM](https://arxiv.org/abs/2411.04983) (Gaoyue Zhou, Hengkai Pan, LeCun, Lerrel Pinto, NYU; ICML 2025) predicts future DINOv2 *patch* features, so a goal image becomes a target feature map and planning becomes trajectory optimization against it, with no decoder anywhere.

**Can a video generator be the simulator, or the policy?**

[UniSim](https://arxiv.org/abs/2310.06114) (Sherry Yang, Yilun Du, Jonathan Tompson, Dale Schuurmans, Abbeel; ICLR 2024) conditioned video diffusion on both instructions and low-level $(\Delta x,\Delta y)$ controls, then trained RL policies and vision-language planners inside it with zero-shot real transfer. [Genie](https://arxiv.org/abs/2402.15391) (Jake Bruce and 24 co-authors, DeepMind; ICML 2024) is an 11B-parameter "first generative interactive environment trained in an unsupervised manner from unlabelled Internet videos," its key trick a latent action model inferring a small discrete action vocabulary from consecutive frames. [Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) (5 August 2025) generates 720p worlds at 24 fps in real time with roughly a minute of memory, and DeepMind states the limits directly: constrained action space, unsolved multi-agent interaction, and "a few minutes of continuous interaction, rather than extended hours." OpenAI's [Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/) (Sora, 2024) makes the strongest claim and undercuts it in the same document, conceding Sora "does not accurately model the physics of many basic interactions, like glass shattering"; visual plausibility is demonstrated, physical consistency is not. NVIDIA's [Cosmos](https://arxiv.org/abs/2501.03575) (2025) industrialized the pipeline, curating roughly 20M hours of 720p-to-4k video into about 100M clips and releasing open-weight diffusion (7B, 14B) and autoregressive (4B, 12B) families. The policy reading is [UniPi](https://arxiv.org/abs/2302.00111) (Du, Mengjiao Yang, Joshua Tenenbaum, Schuurmans, Abbeel and colleagues; NeurIPS 2023), where "a planner synthesizes a set of future frames depicting its planned actions" and "control actions are extracted from the generated video," unifying embodiments in image space. [LAPA](https://arxiv.org/abs/2410.11758) (Seonghyeon Ye, Joel Jang, Minjoon Seo and collaborators, KAIST, Microsoft Research, NVIDIA; ICLR 2025) carried latent actions to real robots: quantize inter-frame change with a VQ-VAE, pretrain a VLA on those latent actions from human video and language, finetune a small decoder to real actions, and beat a state-of-the-art VLA trained on labeled robot actions.

**Why does explicit geometry keep returning?**

Because contact happens in metric space and a 2D feature map does not represent it. [Dense Object Nets](https://arxiv.org/abs/1806.08756) (Peter Florence, Lucas Manuelli, Russ Tedrake, MIT CSAIL; CoRL 2018) showed a pixelwise contrastive loss over self-labeled multi-view RGBD correspondences yields dense descriptors "entirely learned from self-supervision," trainable on a novel object in about 20 minutes, giving a manipulation-ready notion of "the same physical point." [Transporter Networks](https://arxiv.org/abs/2010.14406) (Andy Zeng, Florence, Tompson and colleagues, Google; CoRL 2020) scored placements by spatial cross-correlation $Q_{\text{place}}(\tau) = (\psi(o) \ast \phi(c))(\tau)$ between a query crop embedding $\phi(c)$ at the pick and a dense key embedding $\psi(o)$, translation-equivariant by construction and "orders of magnitude more sample efficient than our benchmarked alternatives." [NeRF](https://arxiv.org/abs/2003.08934) (Ben Mildenhall and colleagues, Berkeley and Google; ECCV 2020) supplied a differentiable volumetric scene representation and [3D Gaussian Splatting](https://arxiv.org/abs/2308.04079) (Bernhard Kerbl, Georgios Kopanas, George Drettakis and colleague, Inria; SIGGRAPH 2023) made it real-time at 1080p and at least 30 fps. [3D Diffusion Policy](https://arxiv.org/abs/2403.03954) (Yanjie Ze, Gu Zhang, Huazhe Xu, Stanford and Tsinghua; RSS 2024) fed a sparse point-cloud encoder into a diffusion policy, handling 72 simulated tasks at 10 demonstrations each for a 24.2% relative gain and 85% success on 4 real tasks with 40 demonstrations, while "rarely violat[ing] safety requirements." [Equivariant Diffusion Policy](https://arxiv.org/abs/2407.01812) (Dian Wang, Robin Walters, Robert Platt and colleagues, Northeastern and the Boston Dynamics AI Institute; CoRL 2024) characterized when a diffusion model is $SO(2)$-equivariant, that is $\pi(g\cdot o)=g\cdot\pi(o)$ for $g\in SO(2)$, reporting success 21.9% above Diffusion Policy across 12 MimicGen tasks. [RoboVerse](https://arxiv.org/abs/2504.18904) (Haoran Geng and 36 co-authors, Berkeley and partners; 2025) built digital twins whose MetaSim layer abstracts several simulator backends behind one configuration for cross-embodiment transfer. Geometry returns because symmetry and metric structure are free constraints pretrained 2D features cannot supply, and free constraints outvalue data when demonstrations number in the dozens.

**What about touch?**

Vision cannot see occluded contact, and touch has no internet. The lineage runs from retrographic sensing by Micah Kimo Johnson and Edward Adelson at MIT (CVPR 2009) to [GelSight](https://www.mdpi.com/1424-8220/17/12/2762) (Wenzhen Yuan, Siyuan Dong, Adelson; Sensors 2017), which measures contact *geometry* photometrically rather than lumped force. Meta AI and GelSight released [Digit 360](https://ai.meta.com/blog/fair-robotics-open-source/) on 31 October 2024: an artificial fingertip with over 18 sensing features, over 8 million taxels for omnidirectional deformation, forces resolved to 1 millinewton, plus vibration, heat and chemical channels. The data problem is unsolved, because tactile signals do not transfer across sensor geometries the way RGB transfers across cameras and no public tactile corpus approaches the scale that made DINOv3 or V-JEPA 2 possible.

**What is actually missing?**

Four gaps stand out, and they are worth stating without hedging. First, no accepted metric of world-model quality predicts downstream control performance, which is objective mismatch reappearing in generative form; the 2026 position paper [How Should World Models Be Evaluated for Embodied Decision-Making?](https://arxiv.org/abs/2606.15032) argues that "the modern reliance on FID, FVD, PSNR, or VLM physics scores as primary world-model metrics is [...] a re-instance of exactly this mismatch," and proposes an L0 to L7 ladder rising from visual plausibility through interventional action fidelity, closed-loop rollout validity, reward fidelity, policy-ranking agreement, optimization lift and uncertainty calibration. Second, reconstruction versus value equivalence is unresolved: reconstruction pretrains on unlabeled video but wastes capacity, value equivalence is minimal but needs rewards and actions, and JEPA sits between with no external check that the latent kept what control requires. Third, long-horizon rollout stability is the binding constraint, with Genie 3 limited to minutes and the $O(\epsilon_T H^2)$ bound explaining why. Fourth, none of these models contains an account of contact, friction or mass; they learn the appearance of physics from pixels, which is why glass still fails to shatter correctly.

```
 LINEAGE (group annotations in brackets)

 Kearns & Singh 2002 simulation lemma  ──────────────────┐
 Ross & Bagnell 2010 compounding error [CMU]  ───────────┤ why models are hard
 Lambert+ 2020 objective mismatch [Berkeley/FAIR] ───────┘
                                                          │
 PIXEL PREDICTION                                         │
 Finn/Goodfellow/Levine 2016 CDNA-DNA-STP [Berkeley RAIL] │
   ├─ SV2P 2018 [Berkeley RAIL + Google]                  │
   ├─ SVG-LP 2018 [NYU, Denton & Fergus]                  │
   └─ PredNet 2017 [Harvard, Lotter/Kreiman/Cox]          │
                                                          ▼
 LATENT-STATE WORLD MODELS
 Ha & Schmidhuber 2018 World Models [Google Brain / IDSIA]
   └─ PlaNet 2019 RSSM [DeepMind/Toronto, Hafner]
        └─ Dreamer 2020 ─► DreamerV2 2021 ─► DreamerV3 2023 [DeepMind, Hafner]
 Grimm+ 2020 value equivalence [DeepMind/Michigan] ─► MuZero 2020 [DeepMind]

 SELF-SUPERVISED VISION
 CPC 2018 [DeepMind] ─► MoCo 2020 / SimCLR 2020 [FAIR / Google Brain]
   ├─ BYOL 2020 [DeepMind]                     stop-grad + EMA teacher
   ├─ VICReg 2022 [FAIR, Bardes/Ponce/LeCun]   variance-covariance reg
   ├─ DINO 2021 ─► DINOv2 2024 ─► DINOv3 2025 [Meta FAIR, Caron/Oquab et al.]
   └─ MAE 2022 [FAIR, He et al.]
        │                                     │
        ▼                                     ▼
 ENCODERS FOR CONTROL                    JEPA LINE
 R3M 2022 [Stanford IRIS + Meta]         LeCun 2022 position paper [Meta FAIR / NYU]
 MVP 2022 [Berkeley, Malik group]          ├─ I-JEPA 2023 [Meta FAIR]
 Voltron 2023 [Stanford, Karamcheti+]      ├─ V-JEPA 2 / -AC 2025 [Meta FAIR]
 VC-1 / CortexBench 2023 [Meta AI]         └─ DINO-WM 2025 [NYU, Zhou/LeCun/Pinto]
 Theia 2024 [RAI Institute]

 GENERATIVE VIDEO AS SIM / POLICY
 UniPi 2023 [MIT/Berkeley/Google, Du & Yang] ─► UniSim 2024 [DeepMind/Berkeley]
 Genie 2024 ─► Genie 3 2025 [DeepMind, Bruce et al.]
 Sora 2024 [OpenAI, physics not demonstrated]
 Cosmos 2025 [NVIDIA]      LAPA 2025 [KAIST / MSR / NVIDIA]

 GEOMETRY AND CONTACT
 GelSight 2009/2017 [MIT, Johnson & Adelson] ─► Digit 360 2024 [Meta FAIR + GelSight]
 Dense Object Nets 2018 [MIT, Florence/Manuelli/Tedrake]
 Transporter Nets 2020 [Google, Zeng/Florence] ─► Equivariant Diffusion Policy 2024 [Northeastern]
 NeRF 2020 [Berkeley/Google] ─► 3D Gaussian Splatting 2023 [Inria]
 3D Diffusion Policy 2024 [Stanford/Tsinghua, Ze & Xu] ─► RoboVerse 2025 [Berkeley+]
```

**What should you take from the lineage above?**

The geometric and generative branches of that tree are usually presented as rivals, and the more useful reading is that they encode different bets about where physical structure should live. The explicit-geometry line puts it in the representation, accepting engineering effort in exchange for sample efficiency and interpretability. The generative-video line puts it in the data, accepting enormous compute in exchange for generality. Neither has produced the thing the field most needs, which is a measure of world-model quality that predicts downstream control performance, so at present a world model can only be evaluated by the expense of deploying the policy it was built to improve.

*Where this leads.* Stepping back from the specific architectures, all of them are estimators fitted to finite samples and then queried off distribution, which is precisely the situation classical statistical theory was built for and precisely the situation in which classical statistical theory turned out to be vacuous. Section 7 covers what replaced it, and it is the section closest to an estimation-theoretic background: overparameterized risk curves read as random-matrix edge phenomena, scaling exponents fitted rather than derived, and distribution-free coverage guarantees whose one assumption a closed control loop violates by construction.

---

## 7. Learning Theory at the Frontier: Overparameterization, Scaling Laws, and Distribution Shift

**Why did 2017 force the field to throw out its generalization theory?**

The rupture is dated precisely. Chiyuan Zhang, Samy Bengio, Moritz Hardt, Benjamin Recht and Oriol Vinyals showed that standard convolutional networks trained by SGD "easily fit a random labeling of the training data," and continue to fit perfectly when the images themselves are replaced by Gaussian noise ([Zhang et al., ICLR 2017, arXiv:1611.03530](https://arxiv.org/abs/1611.03530)). For a reader who thinks in estimators, the damage is structural rather than empirical. Classical uniform-convergence theory controls the generalization gap by a capacity functional $\mathfrak{C}(\mathcal{H})$ of the hypothesis class, giving bounds of the form

$$\mathbb{P}\big[\,\sup_{h \in \mathcal{H}} |\hat{R}_n(h) - R(h)| > \epsilon \,\big] \le \delta(\epsilon, \mathfrak{C}(\mathcal{H}), n),$$

where $\hat{R}_n$ is empirical risk on $n$ samples, $R$ is population risk, and $\mathfrak{C}$ is VC dimension or Rademacher complexity $\mathfrak{R}_n(\mathcal{H}) = \mathbb{E}_{\sigma}\sup_{h}\frac{1}{n}\sum_i \sigma_i h(x_i)$ with $\sigma_i$ independent signs. Fitting arbitrary labels on $n$ points means exactly that $\mathfrak{R}_n(\mathcal{H}) \to 1$, its maximum, so on a $[0,1]$-bounded loss every such bound evaluates to something larger than one. The bounds were not loose; they were vacuous by construction, because the supremum cannot see which member SGD actually returns.

**What did the theory community offer instead?**

Three families of response, all of which replace class capacity with a property of the returned solution. Peter Bartlett, Dylan Foster and Matus Telgarsky at Berkeley gave the sharpest of these, a margin bound normalized by a spectral complexity ([Bartlett, Foster & Telgarsky, NeurIPS 2017, arXiv:1706.08498](https://arxiv.org/abs/1706.08498)). For an $L$-layer network with weight matrices $A_1,\dots,A_L$, $\rho_i$-Lipschitz nonlinearities, and reference matrices $M_i$ (typically initialization), the multiclass misclassification risk obeys

$$\Pr\big[\arg\max_j F_A(x)_j \neq y\big] \;\lesssim\; \hat{R}_\gamma(F_A) \;+\; \tilde{O}\!\left(\frac{\|X\|_2\, R_A}{\gamma n}\ln W\right) + \sqrt{\frac{\ln(1/\delta)}{n}},$$

$$R_A \;=\; \left(\prod_{i=1}^{L}\rho_i \|A_i\|_\sigma\right)\left(\sum_{i=1}^{L}\frac{\|A_i^\top - M_i^\top\|_{2,1}^{2/3}}{\|A_i\|_\sigma^{2/3}}\right)^{3/2},$$

with $\hat{R}_\gamma$ the empirical margin-$\gamma$ error, $\|\cdot\|_\sigma$ the spectral norm, $\|\cdot\|_{2,1}$ the sum of column $\ell_2$ norms, $\|X\|_2$ the data Frobenius norm, and $W$ the width. Read this as a signal-processing statement: the product of spectral norms is the network's worst-case gain, the $\|A_i - M_i\|$ terms measure how far training moved the operator from initialization, and dividing by the margin $\gamma$ turns gain into an effective signal-to-noise requirement. Random labels force $\gamma$ small and $R_A$ large, so the bound correctly declines to certify them. Behnam Neyshabur, Srinadh Bhojanapalli and Nathan Srebro derived a closely related bound by PAC-Bayes, in terms of the product of layer spectral norms and the Frobenius norms of the weights ([Neyshabur, Bhojanapalli & Srebro, ICLR 2018, arXiv:1707.09564](https://arxiv.org/abs/1707.09564)). Sanjeev Arora, Rong Ge, Behnam Neyshabur and Yi Zhang at Princeton took the third route, compression: if a trained net compresses to few effective parameters while preserving outputs, the compressed description length bounds generalization, and "noise stability" of trained layers is the property that makes compression possible, extending to convolutional nets that had defeated earlier attempts ([Arora et al., ICML 2018, arXiv:1802.05296](https://arxiv.org/abs/1802.05296)). None of these bounds is numerically tight on real networks. They are diagnostic, not predictive, and that remains true in 2026.

**If the class is too big, what selects the good solution?**

Optimization does, and the honest name for this is implicit bias. Daniel Soudry, Elad Hoffer, Mor Shpigel Nacson, Suriya Gunasekar and Nathan Srebro proved that gradient descent on unregularized logistic regression over linearly separable data converges in direction to the hard-margin SVM solution, and that this directional convergence is only logarithmic in $t$ while the loss itself decays much faster ([Soudry et al., JMLR 2018, arXiv:1710.10345](https://arxiv.org/abs/1710.10345)). Concretely, $w(t)/\|w(t)\| \to \hat{w}/\|\hat{w}\|$ where $\hat{w} = \arg\min \|w\|^2$ subject to $y_i \langle w, x_i\rangle \ge 1$, with the residual shrinking like $O(1/\log t)$. This explains why training long after zero training error still improves test error: the estimator is still rotating toward the max-margin direction. The same group showed that gradient descent on the factorization $W = UV^\top$ of an underdetermined least-squares problem, from small initialization and small steps, converges to the minimum nuclear-norm solution ([Gunasekar et al., NeurIPS 2017, arXiv:1705.09280](https://arxiv.org/abs/1705.09280)); the parameterization, not the loss, supplies the regularizer.

Optimization also refuses to stay in the regime where classical analysis applies. Jeremy Cohen and collaborators documented "edge of stability": with step size $\eta$, the maximum eigenvalue of the training-loss Hessian rises until it "hovers just above the numerical value $2/\eta$," after which the loss decreases non-monotonically over short windows while trending down overall ([Cohen et al., ICLR 2021, arXiv:2103.00065](https://arxiv.org/abs/2103.00065)). The threshold is exactly the stability limit of gradient descent on a quadratic, since the iteration $w \mapsto (I - \eta H)w$ diverges once $\lambda_{\max}(H) > 2/\eta$. Deep networks self-organize to sit on that boundary, which means descent lemma analyses assuming $\eta < 2/\lambda_{\max}$ do not describe real training. The flat-minima intuition was operationalized by Pierre Foret, Ariel Kleiner, Hossein Mobahi and Behnam Neyshabur as sharpness-aware minimization, $\min_w \max_{\|\epsilon\|_p \le \rho} L(w+\epsilon)$, seeking neighborhoods of uniformly low loss ([Foret et al., ICLR 2021, arXiv:2010.01412](https://arxiv.org/abs/2010.01412)). Whether flatness causes generalization or merely correlates with it is still contested.

**Is a wide network just a kernel machine?**

Arthur Jacot, Franck Gabriel and Clément Hongler at EPFL showed that in the infinite-width limit the training dynamics of a network are governed by a fixed kernel,

$$\Theta(x,x') = \big\langle \nabla_\theta f(x;\theta), \nabla_\theta f(x';\theta)\big\rangle,$$

which converges to a deterministic limit and stays constant during training, so the network function follows a linear differential equation in function space and converges fastest along the kernel's top eigendirections ([Jacot, Gabriel & Hongler, NeurIPS 2018, arXiv:1806.07572](https://arxiv.org/abs/1806.07572)). This is the lazy-training linearization $f(x;\theta_t) \approx f(x;\theta_0) + \langle \nabla_\theta f(x;\theta_0), \theta_t - \theta_0\rangle$, and it is a genuine spectral theory: generalization is governed by alignment of the target with $\Theta$'s eigenbasis, and early stopping is a low-pass filter. Its limitation is definitional. If $\Theta$ is frozen, the features $\nabla_\theta f$ never change, so nothing deserving the name representation learning can occur, and NTK cannot account for why a pretrained backbone transfers. Greg Yang at Microsoft Research, with Edward Hu and collaborators, closed part of this gap with the maximal update parametrization $\mu\mathrm{P}$, derived inside the Tensor Programs framework, under which feature updates remain $\Theta(1)$ as width grows rather than vanishing. Optimal hyperparameters then become width-invariant, so one tunes a small proxy and transfers zero-shot; they report outperforming published GPT-3 6.7B numbers by transferring from a 40M-parameter model at a tuning cost of 7% of pretraining ([Yang, Hu et al., NeurIPS 2021, arXiv:2203.03466](https://arxiv.org/abs/2203.03466)). $\mu\mathrm{P}$ is now standard at frontier labs, the rare case where limit theory changed the recipe.

**How can interpolating noise be harmless?**

Mikhail Belkin, Daniel Hsu, Siyuan Ma and Soumik Mandal named the double-descent curve, in which risk rises to a peak at the interpolation threshold and then falls again as capacity grows past it, subsuming the textbook U-shape ([Belkin et al., PNAS 2019, arXiv:1812.11118](https://arxiv.org/abs/1812.11118)). Preetum Nakkiran, Gal Kaplun, Yamini Bansal, Tristan Yang, Boaz Barak and Ilya Sutskever showed the same curve in deep networks along three axes, model size, epochs, and sample count, unified by an "effective model complexity," including the regime where quadrupling training data hurts test error ([Nakkiran et al., ICLR 2020, arXiv:1912.02292](https://arxiv.org/abs/1912.02292)).

The cleanest mathematics is in the proportional asymptotics you already know from random matrix theory. Trevor Hastie, Andrea Montanari, Saharon Rosset and Ryan Tibshirani analyzed minimum-$\ell_2$-norm ridgeless interpolation with $n, d \to \infty$, $d/n \to \gamma$, isotropic features and noise variance $\sigma^2$, and obtained

$$R(\hat\beta) \;\to\; \sigma^2\frac{\gamma}{1-\gamma} \quad (\gamma < 1), \qquad R(\hat\beta) \;\to\; r^2\Big(1 - \frac{1}{\gamma}\Big) + \sigma^2\frac{1}{\gamma-1} \quad (\gamma > 1),$$

with $r^2 = \|\beta\|_2^2$ ([Hastie, Montanari, Rosset & Tibshirani, Annals of Statistics 2022, arXiv:1903.08560](https://arxiv.org/abs/1903.08560)). Both branches blow up at $\gamma = 1$, which is the Marchenko-Pastur edge where the smallest sample eigenvalue vanishes and the pseudoinverse amplifies noise without bound. Past it, the bias term $r^2(1-1/\gamma)$ increases while the variance term $\sigma^2/(\gamma-1)$ decreases, and their sum descends a second time. Bartlett, Philip Long, Gábor Lugosi and Alexander Tsigler characterized when this is benign in terms of two effective ranks of the covariance $\Sigma$ with eigenvalues $\lambda_1 \ge \lambda_2 \ge \cdots$,

$$r_k(\Sigma) = \frac{\sum_{i>k}\lambda_i}{\lambda_{k+1}}, \qquad R_k(\Sigma) = \frac{\big(\sum_{i>k}\lambda_i\big)^2}{\sum_{i>k}\lambda_i^2},$$

showing that with $k^* = \min\{k : r_k(\Sigma) \ge bn\}$ the excess risk is small precisely when $k^*/n$ and $n/R_{k^*}(\Sigma)$ are both small ([Bartlett, Long, Lugosi & Tsigler, PNAS 2020, arXiv:1906.11300](https://arxiv.org/abs/1906.11300)). The mechanism is spectral: benign overfitting needs many low-variance directions in which the label noise can be absorbed without moving predictions, so the eigenvalue tail must be long and balanced.

**Are scaling laws laws?**

Joel Hestness and collaborators at Baidu first established that generalization error follows power laws in data across translation, language modeling, image and speech tasks ([Hestness et al., 2017, arXiv:1712.00409](https://arxiv.org/abs/1712.00409)). Jared Kaplan and collaborators at OpenAI and Johns Hopkins fit the canonical forms $L(N) = (N_c/N)^{\alpha_N}$ with $\alpha_N \approx 0.076$, $N_c \approx 8.8\times10^{13}$ non-embedding parameters; $L(D) = (D_c/D)^{\alpha_D}$ with $\alpha_D \approx 0.095$, $D_c \approx 5.4\times10^{13}$ tokens; and $L(C_{\min}) = (C_c^{\min}/C_{\min})^{\alpha_C^{\min}}$ with $\alpha_C^{\min} \approx 0.050$, plus the joint form $L(N,D) = [(N_c/N)^{\alpha_N/\alpha_D} + D_c/D]^{\alpha_D}$ ([Kaplan et al., 2020, arXiv:2001.08361](https://arxiv.org/abs/2001.08361)). Jordan Hoffmann and colleagues at DeepMind then showed those allocations were badly undertrained, concluding that for every doubling of model size the token count should double, so compute-optimal $N \propto C^{0.5}$ and $D \propto C^{0.5}$; Chinchilla at 70B parameters and 4x Gopher's data reached 67.5% on MMLU ([Hoffmann et al., 2022, arXiv:2203.15556](https://arxiv.org/abs/2203.15556)). This is contested in detail. Tamay Besiroglu, Ege Erdil, Matthew Barnett and Josh You reconstructed the third estimation procedure and found the published fit inconsistent with the paper's own first two approaches and reporting implausibly narrow confidence intervals; their refit gives $E = 1.8172$, $A = 482.01$, $B = 2085.43$, $\alpha = 0.3478$, $\beta = 0.3658$, hence $a = \beta/(\alpha+\beta) = 0.5126$ and $b = 0.4874$, about 20 tokens per parameter ([Besiroglu et al., 2024, arXiv:2404.10102](https://arxiv.org/abs/2404.10102)). Niklas Muennighoff and colleagues extended the law to data-constrained training, finding up to roughly 4 epochs of repetition nearly free and fitting decay half-lives $R_D^* \approx 15.4$ for repeated data and $R_N^* \approx 5.3$ for excess parameters ([Muennighoff et al., NeurIPS 2023, arXiv:2305.16264](https://arxiv.org/abs/2305.16264)). Utkarsh Sharma and Kaplan gave the only widely cited derivation, arguing that a network performing regression on a data manifold of intrinsic dimension $d$ should show $\alpha \approx 4/d$ ([Sharma & Kaplan, JMLR 2022, arXiv:2004.10802](https://arxiv.org/abs/2004.10802)). State this plainly: with that one partial exception, scaling-law exponents are fitted constants, not derived ones, they carry no distribution-shift term, and they are estimated on i.i.d. next-token prediction. Nothing in the derivation survives a change of data distribution, which is the normal condition of a deployed robot.

**Is emergence real?**

Alethea Power, Yuri Burda, Harri Edwards, Igor Babuschkin and Vedant Misra reported grokking on small algorithmic datasets, where test accuracy jumps from chance to perfect long past the point of training-set memorization ([Power et al., 2022, arXiv:2201.02177](https://arxiv.org/abs/2201.02177)). Jason Wei and a large collaboration then defined an ability as emergent if "it is not present in smaller models but is present in larger models," and catalogued dozens of such jumps ([Wei et al., TMLR 2022, arXiv:2206.07682](https://arxiv.org/abs/2206.07682)). Rylan Schaeffer, Brando Miranda and Sanmi Koyejo at Stanford argued that these jumps "appear due to the researcher's choice of metric rather than due to fundamental changes in model behavior with scale," since discontinuous metrics such as exact-match manufacture sharpness from smooth per-token improvement, and they induced apparent emergence in vision tasks on demand ([Schaeffer, Miranda & Koyejo, NeurIPS 2023, arXiv:2304.15004](https://arxiv.org/abs/2304.15004)). The dispute is unresolved. The metric critique is correct for many BIG-Bench items and does not by itself establish that no genuine phase transitions exist; grokking on modular arithmetic is a sharp transition in a continuous loss, so it is not a metric artifact.

**What breaks when the test distribution moves?**

Antonio Torralba at MIT and Alexei Efros then at CMU established the base rate: models trained on one vision dataset generalize poorly to another, and a classifier can identify which dataset an image came from ([Torralba & Efros, CVPR 2011](https://people.csail.mit.edu/torralba/publications/datasets_cvpr11.pdf)). Recht, Rebecca Roelofs, Ludwig Schmidt and Vaishaal Shankar rebuilt ImageNet and CIFAR-10 test sets following the original protocols and measured drops of 11 to 14 points on ImageNet and 3 to 15 points on CIFAR-10, attributing them not to test-set overfitting but to genuine distribution difference ([Recht et al., ICML 2019, arXiv:1902.10811](https://arxiv.org/abs/1902.10811)). John Miller, Rohan Taori, Aditi Raghunathan, Shiori Sagawa, Pang Wei Koh, Vaishaal Shankar, Percy Liang, Yair Carmon and Schmidt, spanning Berkeley and Stanford, then found that out-of-distribution accuracy is a strikingly precise linear function of in-distribution accuracy on a probit scale, more precise than domain-adaptation theory predicts, with a candidate Gaussian covariance-shift explanation; they also flag exceptions, including some CIFAR-10-C synthetic corruptions and Camelyon17-WILDS tissue classification ([Miller et al., ICML 2021, arXiv:2107.04649](https://arxiv.org/abs/2107.04649)). The exceptions matter more than the rule for robotics, because embodied shift is closer to a corruption or a hospital change than to a fresh i.i.d. draw.

The algorithmic response from Percy Liang's group at Stanford was group distributionally robust optimization, minimizing worst-group rather than average loss,

$$\min_\theta \; \max_{g \in \mathcal{G}} \; \mathbb{E}_{(x,y)\sim P_g}\big[\ell(\theta; x,y)\big],$$

where $\mathcal{G}$ indexes predefined groups. Shiori Sagawa, Pang Wei Koh, Tatsunori Hashimoto and Liang showed that group DRO alone fails on overparameterized networks, because vanishing average training loss makes the inner maximum uninformative, and that combined with strong regularization ($\ell_2$ penalty or early stopping) it gains 10 to 40 points of worst-group accuracy ([Sagawa et al., ICLR 2020, arXiv:1911.08731](https://arxiv.org/abs/1911.08731)). Koh, Sagawa and 21 collaborators then built WILDS, ten datasets of in-the-wild shifts spanning tumor identification across hospitals, camera-trap wildlife, and satellite poverty mapping, reporting that the in-distribution to out-of-distribution gap persists even for methods designed to close it ([Koh et al., ICML 2021, arXiv:2012.07421](https://arxiv.org/abs/2012.07421)). Polina Kirichenko, Pavel Izmailov and Andrew Gordon Wilson at NYU delivered the deflationary result: networks that appear to rely on spurious cues "still often learn core features," and deep feature reweighting, retraining only the last layer on a small group-balanced set, matches or beats state-of-the-art robustness methods ([Kirichenko, Izmailov & Wilson, ICLR 2023, arXiv:2204.02937](https://arxiv.org/abs/2204.02937)). Simplicity bias corrupts the readout, not the representation. Stanford IRIS contributions sit exactly here. Ananya Kumar, Aditi Raghunathan, Robbie Jones, Tengyu Ma and Liang showed that full fine-tuning distorts pretrained features, averaging 2% higher in-distribution but 7% lower out-of-distribution accuracy than linear probing across ten shift datasets, with linear-probe-then-fine-tune recovering roughly 10% out-of-distribution ([Kumar et al., ICLR 2022, arXiv:2202.10054](https://arxiv.org/abs/2202.10054)). Yoonho Lee, Annie Chen, Fahim Tajwar, Huaxiu Yao, Liang and Chelsea Finn showed that which layers to tune depends on the shift type, with input-level corruptions best handled by tuning early layers, proved for two-layer networks in an idealized setting ([Lee et al., ICLR 2023, arXiv:2210.11466](https://arxiv.org/abs/2210.11466)).

**Why is test-time adaptation the cleanest bridge to robot deployment?**

Because it is the only family that admits the deployment distribution as an input. Yu Sun, Xiaolong Wang, Zhuang Liu, John Miller, Efros and Hardt at Berkeley turned a single unlabeled test sample into a self-supervised problem and updated parameters before predicting ([Sun et al., ICML 2020, arXiv:1909.13231](https://arxiv.org/abs/1909.13231)). Dequan Wang, Evan Shelhamer, Shaoteng Liu, Bruno Olshausen and Trevor Darrell reduced the requirement to the test batch alone, minimizing prediction entropy $H(\hat{y}) = -\sum_c p(\hat{y}_c)\log p(\hat{y}_c)$ over batch-norm statistics and channel-wise affine parameters in one epoch ([Wang et al., ICLR 2021, arXiv:2006.10726](https://arxiv.org/abs/2006.10726)). By 2024 the idea had migrated into architecture: Sun, Xinhao Li, Karan Dalal and collaborators made the hidden state of a sequence layer itself a model whose "update rule is a step of self-supervised learning" ([Sun et al., 2024, arXiv:2407.04620](https://arxiv.org/abs/2407.04620)), while Charlie Snell, Jaehoon Lee, Kelvin Xu and Aviral Kumar showed that compute-optimally allocated test-time computation can beat a 14x larger model on problems where the base model has non-trivial success rates ([Snell et al., 2024, arXiv:2408.03314](https://arxiv.org/abs/2408.03314)). For a robot, adaptation and inference-time search are the same budget, and this is the one place where theory, method and deployment constraint coincide.

**Can we get honest uncertainty out of a deployed policy?**

Only partially. Deep ensembles and temperature scaling improve calibration but carry no guarantee. Conformal prediction, from Vladimir Vovk's line and popularized by Anastasios Angelopoulos and Stephen Bates, does carry one: given a nonconformity score $s(x,y)$ and $n$ calibration points, set $\hat{q}$ to the $\lceil (n+1)(1-\alpha)\rceil / n$ empirical quantile of the calibration scores and define $C(x) = \{y : s(x,y) \le \hat{q}\}$; then $\mathbb{P}(Y \in C(X)) \ge 1-\alpha$ in finite samples, distribution-free, with no model assumptions ([Angelopoulos & Bates, 2021, arXiv:2107.07511](https://arxiv.org/abs/2107.07511)). The load-bearing assumption is exchangeability of calibration and test points, and closed-loop robot data violates it outright, since the policy's own actions determine the next state distribution. Isaac Gibbs and Emmanuel Candès at Stanford give the standard repair, updating the level online by $\alpha_{t+1} = \alpha_t + \gamma(\alpha - \mathrm{err}_t)$ with $\mathrm{err}_t \in \{0,1\}$ the miscoverage indicator, which guarantees $\big|\frac{1}{T}\sum_t \mathrm{err}_t - \alpha\big| \le \frac{\max\{\alpha_1, 1-\alpha_1\} + \gamma}{T\gamma}$ for every $T$, irrespective of the data-generating process ([Gibbs & Candès, NeurIPS 2021, arXiv:2106.00170](https://arxiv.org/abs/2106.00170)). Note what this buys and what it does not: long-run average coverage, not coverage at the timestep where the gripper is about to crush the object.

**Does imitation need interaction, provably?**

The received answer was yes, on horizon grounds. Nived Rajaraman, Lin Yang, Jiantao Jiao and Kannan Ramchandran at Berkeley proved that offline behavior cloning from $N$ expert trajectories in an episodic MDP with $|S|$ states and horizon $H$ is suboptimal by $\lesssim |S|H^2\log N / N$, with a matching lower bound $\gtrsim |S|H^2/N$ that holds even for deterministic experts and active querying, while access to the transition model yields $\lesssim \min\{H\sqrt{|S|/N},\, |S|H^{3/2}/N\}$, an improvement of at least $\sqrt{H}$ ([Rajaraman et al., NeurIPS 2020, arXiv:2009.05990](https://arxiv.org/abs/2009.05990)). The $H^2$ is the compounding-error term familiar from DAgger. Dylan Foster, Adam Block and Dipendra Misra at Microsoft Research sharply revised this in 2024: with logarithmic loss, offline behavior cloning attains horizon-independent sample complexity whenever the range of cumulative payoffs and a supervised-learning complexity for the policy class are controlled, and linear horizon dependence under dense rewards; further, "without further assumptions on the policy class, online IL cannot improve over offline IL with the logarithmic loss, even in benign MDPs" ([Foster, Block & Misra, NeurIPS 2024, arXiv:2407.15007](https://arxiv.org/abs/2407.15007)). Measured in annotated trajectories, behavior cloning is minimax optimal even against interactive algorithms; the case for interaction now rests on per-state annotation cost and on continuous-action pathologies rather than on horizon.

**What is actually missing?**

Four gaps remain, and they are best stated plainly. First, there is no predictive theory of generalization under closed-loop shift: every bound above assumes a fixed test distribution, whereas a policy induces its own, so the shift is endogenous and none of the accuracy-on-the-line regularity has been shown to hold there. Second, there is no scaling law for robotics; no published exponent relates policy success rate to demonstration count, embodiment count or parameter count with the stability of $\alpha_N \approx 0.076$, and the intrinsic-dimension argument $\alpha \approx 4/d$ would predict very poor exponents for high-dimensional contact dynamics if it applies at all. Third, no calibrated uncertainty survives feedback: conformal guarantees are exchangeability-based, adaptive variants only control long-run averages, and there is no finite-time guarantee at the safety-critical timestep. Fourth, there is no theory of compositional or long-horizon generalization; effective-rank and margin arguments are single-prediction statements and say nothing about composing $K$ learned skills, where errors interact multiplicatively rather than additively.

```
1968-1998  Vapnik: VC dimension, uniform convergence  [class capacity]
    |
1998-2016  Rademacher / PAC-Bayes refinements  (Bartlett, Mendelson, McAllester)
    |
    +== 2017 CRISIS: random labels fit perfectly ==> capacity bounds vacuous
    |     Zhang, Bengio, Hardt, Recht, Vinyals   [Google Brain + BERKELEY]
    |
    +---> NORM / COMPRESSION BOUNDS  ......... solution-dependent capacity
    |        Bartlett-Foster-Telgarsky 2017      [UC BERKELEY]
    |        Neyshabur-Bhojanapalli-Srebro 2018  [TTI-Chicago]
    |        Arora-Ge-Neyshabur-Zhang 2018       [PRINCETON]
    |
    +---> IMPLICIT BIAS ...................... optimizer as regularizer
    |        Soudry et al. 2017 max-margin      [Technion + TTIC]
    |        Gunasekar et al. 2017 nuclear norm [TTIC]
    |        Cohen et al. 2021 edge of stability [CMU/Google]
    |        Foret et al. 2021 SAM              [Google Brain]
    |
    +---> INFINITE-WIDTH LIMITS
    |        NTK: Jacot-Gabriel-Hongler 2018    [EPFL]      <-- lazy, no features
    |          |
    |          +--> mean-field / muP: Yang & Hu 2021        [MICROSOFT RESEARCH]
    |                 muTransfer ==> frontier training recipe
    |
    +---> INTERPOLATION / RMT ASYMPTOTICS
    |        Belkin-Hsu-Ma-Mandal 2019 double descent [Ohio State/Columbia]
    |        Nakkiran et al. 2019 deep double descent [Harvard/OpenAI]
    |        Bartlett-Long-Lugosi-Tsigler 2020        [UC BERKELEY]
    |        Hastie-Montanari-Rosset-Tibshirani 2019  [STANFORD]
    |
    +---> SCALING LAWS ....................... fitted, not derived
    |        Hestness et al. 2017 [Baidu] -> Kaplan et al. 2020 [OpenAI/JHU]
    |          -> Hoffmann et al. 2022 Chinchilla [DeepMind]
    |             -> Besiroglu et al. 2024 refit [Epoch AI]  (CONTESTED)
    |          -> Muennighoff et al. 2023 data-constrained
    |          -> Sharma & Kaplan alpha ~ 4/d  (only derivation)
    |             |
    |             +--> emergence: Wei et al. 2022 [Google] vs
    |                  Schaeffer-Miranda-Koyejo 2023 mirage [STANFORD] (CONTESTED)
    |
    +---> DISTRIBUTION SHIFT ................. most relevant to robotics
             Torralba & Efros 2011 dataset bias      [MIT + CMU]
             Recht-Roelofs-Schmidt-Shankar 2019      [UC BERKELEY]
             Miller et al. 2021 accuracy on the line [BERKELEY + STANFORD]
             Sagawa-Koh-Hashimoto-Liang 2020 gDRO    [STANFORD, P. Liang]
             Koh-Sagawa et al. 2021 WILDS            [STANFORD]
             Kumar-Raghunathan-Jones-Ma-Liang 2022   [STANFORD, Tengyu Ma]
             Lee-Chen-...-Liang-Finn 2023 surgical FT [STANFORD IRIS, Finn]
             Kirichenko-Izmailov-Wilson 2023 DFR     [NYU]
               |
               +--> TEST-TIME ADAPTATION ---> deployment bridge
               |      Sun-Wang-Liu-Miller-Efros-Hardt 2020 TTT [BERKELEY]
               |      Wang et al. 2021 TENT                    [BERKELEY]
               |      Sun et al. 2024 TTT layers / Snell et al. 2024 TTC
               |
               +--> DISTRIBUTION-FREE UQ
                      Vovk conformal -> Angelopoulos & Bates 2021 [BERKELEY]
                      Gibbs & Candes 2021 adaptive conformal      [STANFORD]
                        ^ exchangeability fails in closed loop
               |
               +--> IMITATION vs RL STATISTICS
                      Rajaraman-Yang-Jiao-Ramchandran 2020  [UC BERKELEY]
                        |S|H^2/N minimax
                      Foster-Block-Misra 2024               [MICROSOFT RESEARCH]
                        BC minimax-optimal in trajectories (REVISION)
```

**What should you take from the lineage above?**

Read across that tree and a single pattern emerges. Every branch replaced an a-priori capacity measure with a solution-dependent or data-dependent one, whether that is a margin, a weight norm, an effective rank, a fitted exponent, or an empirical coverage level. That move rescued the theory of interpolating predictors, and it is also why none of it transfers cleanly to control: each of those quantities is defined with respect to a fixed sampling distribution, and a policy in closed loop does not have one.

*Where this leads.* The theory above governs a model that predicts and is then scored. It says little about a model that is subsequently reshaped by an explicit optimization against preferences or verifiable outcomes, which is what post-training is, and which is now the dominant source of imported technique in robotics. Section 8 covers that machinery, and it is worth reading even if language models do not interest you, because the objectives in it are being applied to robot policies by the same authors who introduced them.

---

## 8. Sequence Models and Post-Training: The Machinery Robotics Is Now Importing

**What is the actual computation inside the block that every modern robot policy inherits?**

Scaled dot-product attention, from "Attention Is All You Need" by Ashish Vaswani and colleagues at Google Brain and Google Research ([Vaswani et al. 2017](https://arxiv.org/abs/1706.03762)), maps queries $Q \in \mathbb{R}^{n \times d_k}$, keys $K \in \mathbb{R}^{n \times d_k}$ and values $V \in \mathbb{R}^{n \times d_v}$ to

$$\mathrm{Attn}(Q,K,V) = \mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V,$$

with $n$ the sequence length, $d_k$ the key dimension, and the softmax taken row-wise. The $\sqrt{d_k}$ is a second-moment argument any signal-processing reader will finish unaided. Take a query $q$ and key $k$ with independent components of mean zero and unit variance. Then $q \cdot k = \sum_{i=1}^{d_k} q_i k_i$ has $\mathbb{E}[q\cdot k]=0$ and $\mathrm{Var}(q\cdot k) = \sum_i \mathrm{Var}(q_i k_i) = d_k$, so its standard deviation grows as $\sqrt{d_k}$. Logits at that scale saturate the softmax, where the Jacobian $\partial p/\partial z = \mathrm{diag}(p) - pp^\top$ collapses toward zero and gradients vanish. Dividing by $\sqrt{d_k}$ restores unit-variance logits and a well-conditioned Jacobian.

The cost is an $n \times n$ score matrix: $O(n^2 d)$ arithmetic and, more painfully, $\Omega(n^2)$ traffic to GPU high-bandwidth memory. Tri Dao, then with Christopher Ré's group at Stanford, reframed this as an input/output problem rather than a FLOP problem. FlashAttention tiles the computation and recomputes the softmax in on-chip SRAM, cutting HBM accesses to $O(N^2d^2M^{-1})$ for SRAM size $M$ against $\Omega(Nd + N^2)$, and reports a 3x wall-clock speedup on GPT-2 at length 1K while doing more arithmetic ([Dao et al. 2022](https://arxiv.org/abs/2205.14135)). A parallel line attacked the asymptotics directly, through structured state-space models and then Mamba's input-dependent selective scan, reporting 5x higher inference throughput with linear rather than quadratic scaling ([Gu & Dao 2023](https://arxiv.org/abs/2312.00752)).

Robotics standardized on transformers anyway, and not for asymptotic reasons. Attention is a parallel set operation, so one backbone ingests heterogeneous streams as a single sequence: patches from several cameras, proprioceptive joint vectors, language tokens, and discretized or flow-matched action chunks. A recurrent policy must serialize these; a transformer attends across modalities at every layer. Equally decisive, the pretrained weights exist, so importing a transformer imports web-scale vision and language priors that no public state-space checkpoint matches.

**Where did learning from human preferences begin, and why does it matter that it began in RL?**

It began in continuous control rather than in language. Paul Christiano and collaborators at OpenAI and DeepMind trained MuJoCo and Atari agents from pairwise human comparisons of short trajectory segments, querying under one percent of agent interactions and eliciting behaviors as hard to specify as a backflip from roughly an hour of non-expert human time ([Christiano et al. 2017](https://arxiv.org/abs/1706.03741)). The statistical core is Bradley-Terry: for latent reward $r$ and two candidates,

$$p(y_1 \succ y_2 \mid x) = \frac{\exp r(x,y_1)}{\exp r(x,y_1) + \exp r(x,y_2)} = \sigma\big(r(x,y_1) - r(x,y_2)\big),$$

with $\sigma(z) = (1+e^{-z})^{-1}$. Fitting $r_\phi$ by maximum likelihood is logistic regression on reward differences. Only differences are identified, so $r$ is free up to an additive function of $x$, a gauge freedom DPO will exploit. That this machinery was born on robot morphologies is why the present transfer into robotics is a return rather than an invention.

**What objective did InstructGPT optimize, and what is its exact solution?**

Long Ouyang and colleagues at OpenAI supervised-finetuned GPT-3, fit a Bradley-Terry reward model on labeler comparisons, then ran PPO against a KL anchor, reporting that labelers preferred 175B InstructGPT outputs to GPT-3 outputs $85 \pm 3\%$ of the time and preferred even a 1.3B InstructGPT to the 175B base model ([Ouyang et al. 2022](https://arxiv.org/abs/2203.02155)). The objective is

$$\max_\pi \; \mathbb{E}_{x \sim \mathcal{D},\, y \sim \pi(\cdot|x)}\big[r_\phi(x,y)\big] - \beta\, \mathrm{KL}\big(\pi(y|x) \,\|\, \pi_{\text{ref}}(y|x)\big),$$

with $\pi_{\text{ref}}$ the supervised-finetuned reference and $\beta>0$ trading reward against drift. It has a closed-form maximizer in three lines. Write the objective as $\mathbb{E}_\pi[r - \beta\log(\pi/\pi_{\text{ref}})]$, divide by $-\beta$, and define $Z(x) = \sum_y \pi_{\text{ref}}(y|x)\exp(r(x,y)/\beta)$. Then

$$\min_\pi \; \mathbb{E}_{y\sim\pi}\!\left[\log \frac{\pi(y|x)}{\tfrac{1}{Z(x)}\pi_{\text{ref}}(y|x)e^{r(x,y)/\beta}}\right] - \log Z(x),$$

and since $\log Z(x)$ is independent of $\pi$, the remaining term is a KL to a normalized distribution, minimized at zero. Hence

$$\pi^*(y|x) = \frac{1}{Z(x)}\pi_{\text{ref}}(y|x)\exp\!\big(r(x,y)/\beta\big) \;\propto\; \pi_{\text{ref}}(y|x)e^{r(x,y)/\beta}.$$

This is the exponential tilting familiar from maximum-entropy inverse RL and soft Q-learning, which is why the robot-learning community recognized it on sight.

**How did DPO remove the reward model, and why does that put this section in a robotics review?**

Because $\pi^*$ is closed-form, you can solve for the reward instead of the policy. Taking logs and rearranging gives the implicit reward

$$r(x,y) = \beta \log \frac{\pi^*(y|x)}{\pi_{\text{ref}}(y|x)} + \beta \log Z(x).$$

Substitute into Bradley-Terry. Because the model depends only on reward differences at fixed $x$, the intractable $\beta\log Z(x)$ cancels identically and the preference likelihood becomes a function of the policy alone. Maximizing it gives Direct Preference Optimization,

$$\mathcal{L}_{\text{DPO}}(\pi_\theta) = -\,\mathbb{E}_{(x,y_w,y_l)}\left[\log \sigma\!\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right],$$

with $y_w$ preferred and $y_l$ dispreferred, whose gradient

$$\nabla_\theta \mathcal{L}_{\text{DPO}} = -\beta\,\mathbb{E}\Big[\sigma(\hat r_l - \hat r_w)\big(\nabla_\theta \log \pi_\theta(y_w|x) - \nabla_\theta \log \pi_\theta(y_l|x)\big)\Big]$$

is a contrastive update weighted largest exactly where the implicit reward $\hat r$ currently ranks the pair wrongly. No reward network, no rollouts, no critic. The paper is [Rafailov, Sharma, Mitchell, Manning, Ermon and Finn 2023](https://arxiv.org/abs/2305.18290), and the last author is Chelsea Finn, who co-directs Stanford IRIS and co-founded Physical Intelligence. DPO is not an adjacent NLP result robotics later borrowed; it was written by people whose day job is robot learning.

**What in the DPO family has held up, and what is contested?**

Each variant attacks a named failure mode. IPO swaps the logistic link for a squared loss on the preference margin, blunting the deterministic overfitting Bradley-Terry invites ([Azar et al. 2023](https://arxiv.org/abs/2310.12036)). KTO, from Kawin Ethayarajh and colleagues, drops paired data for a prospect-theoretic utility over unpaired desirable and undesirable examples ([Ethayarajh et al. 2024](https://arxiv.org/abs/2402.01306)). SimPO, from Yu Meng, Mengzhou Xia and Danqi Chen at Princeton, removes $\pi_{\text{ref}}$ entirely, using the length-normalized average log-probability as implicit reward plus a target margin, and reports up to 6.4 points over DPO on AlpacaEval 2 ([Meng et al. 2024](https://arxiv.org/abs/2405.14734)). ORPO folds an odds-ratio penalty into supervised finetuning, eliminating the separate alignment stage ([Hong et al. 2024](https://arxiv.org/abs/2403.07691)).

The DPO-versus-PPO question is genuinely contested. Shusheng Xu and coauthors argued at ICML 2024 that DPO is prone to biased solutions exploiting out-of-distribution responses, and that tuned PPO beat it in every setting they tested including competitive code ([Xu et al. 2024](https://arxiv.org/abs/2404.10719)). Hamish Ivison and colleagues at AI2 ran the four-factor ablation and concluded that preference-data quality dominates algorithm choice, with PPO's edge concentrated on reasoning-heavy evaluations rather than uniform ([Ivison et al. 2024](https://arxiv.org/abs/2406.09279)). Settled: both work, and data quality outweighs either. Unsettled: the size and generality of PPO's residual advantage. Separately, Rafael Rafailov, Joey Hejna, Ryan Park and Chelsea Finn showed DPO need not be a bandit method at all: derived in the token-level MDP it is inverse Q-learning, with an implicit reward satisfying a Bellman consistency condition ([Rafailov et al. 2024](https://arxiv.org/abs/2404.12358)). For robotics that is the load-bearing theorem, since robot episodes are per-step or per-chunk MDPs, never single-arm bandits.

**How did the field get from preferences to verifiable rewards?**

Through a chain in which supervision got cheaper and more objective. Jason Wei and coauthors at Google showed that prompting for intermediate steps unlocks arithmetic and symbolic reasoning at scale ([Wei et al. 2022](https://arxiv.org/abs/2201.11903)), and self-consistency showed that majority-voting over sampled reasoning paths beats greedy decoding ([Wang et al. 2022](https://arxiv.org/abs/2203.11171)). Eric Zelikman, Yuhuai Wu, Jesse Mu and Noah Goodman at Stanford closed the loop into training with STaR: sample rationales, keep those whose answer is correct, rationalize failures backward from the given answer, finetune, repeat ([Zelikman et al. 2022](https://arxiv.org/abs/2203.14465)). They state that this approximates expectation maximization. With rationale $z$ latent one wants $\max_\theta \sum_i \log \sum_z p_\theta(z, y_i \mid x_i)$; sample-and-filter is a hard E-step approximating the posterior $p_\theta(z \mid x_i, y_i)$ by those rationales reproducing $y_i$, and finetuning is the M-step. Rejection sampling on a checkable answer is the poor man's posterior.

Hunter Lightman and colleagues at OpenAI then supervised steps rather than outcomes, releasing PRM800K with 800K step-level labels and reporting that their process reward model solved 78% of a representative MATH subset, beating outcome supervision ([Lightman et al. 2023](https://arxiv.org/abs/2305.20050)). The test-time-compute turn followed: Charlie Snell, Jaehoon Lee, Kelvin Xu and Aviral Kumar formalized compute-optimal allocation between proposer and verifier, reporting that adaptive inference compute let a smaller model beat one 14x larger at matched FLOPs, roughly a 4x efficiency gain ([Snell et al. 2024](https://arxiv.org/abs/2408.03314)). OpenAI's o1, announced 12 September 2024, productized this, with the company reporting 74.4% AIME 2024 pass@1 rising to 83.3% under 64-sample consensus and monotone gains in both RL compute and thinking time ([OpenAI 2024](https://openai.com/index/learning-to-reason-with-llms/)). Those are self-reported numbers on a closed system.

**What exactly is GRPO, and why does its variance trick look familiar?**

Group Relative Policy Optimization came from Zhihong Shao and colleagues at DeepSeek in DeepSeekMath ([Shao et al. 2024](https://arxiv.org/abs/2402.03300)) and trained DeepSeek-R1, which reports AIME 2024 pass@1 rising from 15.6% to 71.0% under pure RL on the base model and to 86.7% with majority voting ([DeepSeek-AI 2025](https://arxiv.org/abs/2501.12948), later peer reviewed in *Nature* 645:633-638). Sampling $G$ completions $\{o_i\}$ per prompt $q$ and writing $r_i = \pi_\theta(o_i|q)/\pi_{\theta_{\text{old}}}(o_i|q)$,

$$\mathcal{J}(\theta) = \mathbb{E}\Big[\tfrac{1}{G}\textstyle\sum_{i=1}^{G}\min\big(r_i \hat A_i,\; \mathrm{clip}(r_i, 1-\epsilon, 1+\epsilon)\hat A_i\big) - \beta\,\mathbb{D}_{\mathrm{KL}}\big(\pi_\theta \| \pi_{\text{ref}}\big)\Big], \qquad \hat A_i = \frac{R_i - \mathrm{mean}(\mathbf{R})}{\mathrm{std}(\mathbf{R})},$$

with $R_i$ the verifier's scalar reward and $\mathbf{R} = (R_1,\dots,R_G)$. Two things matter. The value network is gone: PPO trains a critic comparable in size to the policy, so deleting it frees a full model's parameters, optimizer state and gradients, often the difference between an RL run fitting on a cluster and not. And $\mathrm{mean}(\mathbf{R})$ is just a Monte Carlo baseline. In REINFORCE, $\nabla J = \mathbb{E}[(R-b)\nabla\log\pi]$ is unbiased for any action-independent $b$, since $\mathbb{E}[b\nabla\log\pi] = b\nabla\sum_y \pi(y) = b\nabla 1 = 0$, and $b \approx \mathbb{E}[R]$ minimizes variance. GRPO estimates that baseline empirically from the group instead of learning $V_\phi$, so the reader's familiar baseline subtraction is doing all the work. One honest caveat: dividing by $\mathrm{std}(\mathbf{R})$ and by response length are not free reparameterizations, and Zichen Liu and colleagues at Sea AI Lab showed they induce a bias inflating the length of incorrect responses, proposing the unbiased Dr. GRPO ([Liu et al. 2025](https://arxiv.org/abs/2503.20783)).

**Does RLVR add capability, or just sharpen sampling?**

Contested, and it is the sharpest open question in post-training. Yang Yue and coauthors evaluated pass@$k$ at large $k$ and found RLVR models beat their base models at $k=1$ but are overtaken as $k$ grows, with coverage and perplexity analysis indicating that RLVR reasoning paths already lie inside the base model's sampling distribution ([Yue et al. 2025](https://arxiv.org/abs/2504.13837), NeurIPS 2025). On that reading RLVR sharpens a sampler rather than creating capability. Mingjie Liu and colleagues at NVIDIA pushed back with ProRL, reporting that beyond 2000 RL steps with KL control and periodic reference-policy resets both pass@1 and pass@16 improve, yielding solutions absent from the base model's support ([Liu et al. 2025](https://arxiv.org/abs/2505.24864), NeurIPS 2025). The honest 2026 synthesis is that short-horizon RLVR mostly redistributes probability mass while sufficiently long and diverse RL can extend it, with the crossover depending on task novelty, KL budget and reset schedule.

The diversity-loss mechanism is better settled. Ganqu Cui and coauthors derived that entropy change is governed by the covariance between action log-probability and logit update, which under policy gradients tracks advantage, so high-probability high-advantage tokens monotonically drain entropy; they fit $R = -a\,e^{H} + b$ relating reward $R$ to entropy $H$ and proposed Clip-Cov and KL-Cov to suppress the highest-covariance tokens ([Cui et al. 2025](https://arxiv.org/abs/2505.22617)). Reward hacking is the other confirmed pathology: imperfect verifiers admit false positives, and enough optimization pressure finds them, whether by gaming rule-based answer matchers or rubric aggregation ([Verifiable yet Noisy Rewards under Imperfect Verifiers, 2025](https://arxiv.org/abs/2510.00915)).

**Why did VLA designers pick vision-language backbones, and what do those backbones get wrong?**

CLIP trained image and text encoders jointly with a symmetric InfoNCE objective over a batch of $N$ pairs,

$$\mathcal{L} = -\frac{1}{2N}\sum_{i=1}^{N}\left[\log \frac{e^{\langle u_i, v_i\rangle/\tau}}{\sum_j e^{\langle u_i, v_j\rangle/\tau}} + \log \frac{e^{\langle u_i, v_i\rangle/\tau}}{\sum_j e^{\langle u_j, v_i\rangle/\tau}}\right],$$

where $u_i,v_i$ are normalized image and text embeddings and $\tau$ a learned temperature, giving open-vocabulary recognition from language alone ([Radford et al. 2021](https://arxiv.org/abs/2103.00020)). Flamingo at DeepMind froze a vision encoder and a language model and inserted gated cross-attention adapters for few-shot multimodal learning without retraining ([Alayrac et al. 2022](https://arxiv.org/abs/2204.14198)). PaLI and the compact PaliGemma made image-plus-text-to-text one pretrained interface ([Beyer et al. 2024](https://arxiv.org/abs/2407.07726)), LLaVA showed GPT-generated visual instruction data suffices to bolt a projector between a vision encoder and an LLM ([Liu et al. 2023](https://arxiv.org/abs/2304.08485)), and Qwen-VL added native resolution and grounding-friendly outputs ([Bai et al. 2023](https://arxiv.org/abs/2308.12966)). VLA designers wanted three properties: open-vocabulary naming, so a policy can be told to pick an object absent from its action data; instruction following, so tasks are language rather than one-hot goals; and coordinate-level grounding, so attention can be pointed at a referent.

The weakness is documented and severe. On BLINK, which recasts 14 classic vision tasks as 3,807 multiple-choice questions, humans score 95.70% while the then-best GPT-4V and Gemini reached 51.26% and 45.72%, barely above chance ([Fu et al. 2024](https://arxiv.org/abs/2404.12390), ECCV 2024). On ERQA, the 400-question embodied-reasoning benchmark shipped with Gemini Robotics, the strongest entries were Gemini 2.0 Pro Experimental at 48.3% and GPT-4o at 47.0% ([Gemini Robotics Team 2025](https://arxiv.org/abs/2503.20020)). Boyuan Chen and colleagues traced the cause to missing metric-3D supervision and synthesized 2 billion spatial VQA examples from 10 million real images to patch it ([Chen et al. 2024](https://arxiv.org/abs/2401.12168), CVPR 2024). The backbone that gives you language grounding does not give you geometry.

**What does long-horizon agent training teach about credit assignment?**

ReAct interleaved reasoning traces with environment actions so thought conditions on observation and vice versa ([Yao et al. 2022](https://arxiv.org/abs/2210.03629)). Toolformer learned self-supervised when to emit API calls, keeping only those that reduced loss on future tokens, a verifier built from the model's own likelihood ([Schick et al. 2023](https://arxiv.org/abs/2302.04761)). Voyager, from Guanzhi Wang and colleagues at NVIDIA and Caltech, added an automatic curriculum and a persistent library of executable skills, reporting 3.3x more unique items and 15.3x faster tech-tree progress than ReAct-style baselines in Minecraft ([Wang et al. 2023](https://arxiv.org/abs/2305.16291)). SWE-bench then supplied what made agent training tractable, a unit test, a free and exact per-episode verifier ([Jimenez et al. 2023](https://arxiv.org/abs/2310.06770)); its Verified split is near saturation, with September 2026 leaderboards placing frontier systems in the mid-90s ([SWE-bench Verified](https://www.swebench.com/verified.html)). The lesson is that long-horizon credit assignment became tractable through cheap terminal verification plus reusable subskills, not better estimators: the verifier collapses a 200-step episode into one reliable label, and the skill library shortens the effective horizon.

**What actually transfers into robotics, and what does not?**

Preference optimization transferred first and most literally. GRAPE applies trajectory-level preference optimization to a VLA, using a VLM to stage-decompose the task and emit stage-wise cost functions, then iterating sampling and TPO; it reports success gains of 51.79% in-domain and 58.20% on unseen manipulation tasks, plus 37.44% fewer collisions when the alignment objective is set to safety ([Zhang et al. 2024](https://arxiv.org/abs/2411.19309)). RL finetuning followed, and the verdict inverts the language case: in a controlled study of RL for VLA generalization, PPO beat both GRPO and DPO, attributed to non-stationary dynamics destabilizing group-relative estimates and to sparse reward plus distribution shift crippling DPO ([Liu et al. 2025](https://arxiv.org/abs/2505.19789)). Autonomous improvement is the 2025-2026 frontier. Physical Intelligence's $\pi^*_{0.6}$ trains a distributional value function by cross-entropy over 201 discretized return bins, computes advantages, and conditions the policy on a binary "Advantage: positive/negative" token so classifier-free guidance at inference biases toward high-advantage behavior; RECAP reports more than doubled throughput and roughly halved failure rate on the hardest tasks, laundry throughput rising from about 6 to 9 items per hour, and espresso preparation above 90% success running 13 hours unattended ([Physical Intelligence 2025](https://arxiv.org/abs/2511.14759), a company self-report not independently replicated). Fleet-scale offline-to-online RL has since been reported across 16 dual-arm robots and 8 tasks at 95% average success, with the largest gains on 3-to-5-minute horizons ([Learning While Deploying, 2026](https://arxiv.org/abs/2605.00416)).

Here is the sharp point, and it is a disanalogy. Everything that made 2024-2026 language post-training work rests on a free, exact, per-episode verifier: a boxed answer to string-match, a unit test to run, a compiler to invoke. That verifier is what makes GRPO's group baseline meaningful, what makes rejection sampling a valid E-step, and what makes test-time compute scale, since a proposer is only as good as the verifier ranking its samples. The physical world ships no such oracle. Success on "fold this shirt" is not decidable from the observation stream by any cheap program, which is why $\pi^*_{0.6}$ falls back on human raters aggregating quality metrics into a success label, and why HIL-SERL's near-perfect results within 1 to 2.5 hours of real-world training depend on human interventions inside the loop ([Luo, Xu, Wu & Levine 2024](https://arxiv.org/abs/2410.21845), *Science Robotics*). Robotics is importing the optimizer while having to manufacture the reward, and every manufactured reward is a learned reward model, which is exactly the component reward hacking attacks.

```
                        Bradley-Terry (1952)  ──────────────┐
                                                            │
  Christiano et al. 2017  [OpenAI + DeepMind]  ── preferences in RL, not NLP
        │                                                   │
        ├── InstructGPT 2022  [OpenAI]  ── RM + PPO + KL anchor
        │        │
        │        ├── DPO 2023  [Stanford NLP + IRIS: Rafailov, Sharma,
        │        │      │        Mitchell, Manning, Ermon, Finn]
        │        │      ├── IPO [Google DeepMind]   KTO [Contextual AI / Stanford]
        │        │      ├── SimPO [Princeton NLP]   ORPO [KAIST]
        │        │      └── From r to Q* 2024  [Stanford IRIS]  ── token-level MDP
        │        ├── DPO-vs-PPO debate: Xu et al. 2024 [Tsinghua]
        │        │                       Ivison et al. 2024 [AI2 / Tulu]
        │        └── Constitutional AI / RLAIF  [Anthropic]  ── AI feedback
        │
        └── verifiable-reward branch
                 ├── CoT 2022 [Google Brain]   Self-consistency 2022 [Google]
                 ├── STaR 2022 [Stanford: Zelikman, Goodman]  ── hard-EM bootstrap
                 ├── PRM800K / Let's Verify 2023 [OpenAI]  ── process supervision
                 ├── o1 2024 [OpenAI] + test-time scaling [Snell, Kumar; Berkeley/GDM]
                 ├── GRPO 2024 → R1 2025 [DeepSeek]  ── critic-free, group baseline
                 │        └── Dr. GRPO 2025 [Sea AI Lab]  ── debiased
                 └── RLVR limits: Yue 2025 (pass@k) vs ProRL 2025 [NVIDIA]
                          + entropy collapse [Cui et al., PRIME-RL]

  backbone substrate:  Transformer 2017 [Google] → FlashAttention 2022 [Stanford, Ré/Dao]
                       → S4 / Mamba 2021-23 [Stanford, CMU]
  multimodal substrate: CLIP 2021 [OpenAI] → Flamingo 2022 [DeepMind]
                       → PaLI / PaliGemma [Google] → LLaVA [Wisconsin/MSR] → Qwen-VL [Alibaba]

  ══> transfer into robotics: GRAPE (TPO) 2024 · RL-for-VLA studies 2025
      · HIL-SERL 2024 [Berkeley RAIL] · pi*0.6 / RECAP 2025 [Physical Intelligence]
      · fleet-scale offline-to-online RL 2026
```

**What are the concrete open gaps?**

Four gaps remain, none of them close to closed. First, no verifier: nothing cheap decides physical task success, so every RLVR-style recipe degrades into learned-reward-model RL with full hacking exposure, and the current substitute is human raters, which reinstates the annotation bottleneck verifiable rewards were meant to remove. Second, sample cost: language rollouts cost GPU-seconds while robot rollouts cost wall-clock hours plus hardware wear plus resets, so methods whose advantage appears only after thousands of steps, as in ProRL, may be structurally unavailable on hardware. Third, reward models do not transfer across embodiments, because a preference over a bimanual ALOHA trajectory says little about the same task on a humanoid with different kinematics and contact dynamics, and no embodiment-invariant reward parameterization has been demonstrated. Fourth, evaluation: most published VLA comparisons report one binary success rate over 25 or fewer rollouts, a binomial estimate whose confidence interval exceeds the improvements being claimed, and the sim-to-real gap remains large enough that simulation is an unreliable proxy for ranking policies ([Reliable and Scalable Robot Policy Evaluation with Imperfect Simulators, 2025](https://arxiv.org/abs/2510.04354)). Until evaluation is statistically sound, the question of whether RL post-training adds physical capability or merely sharpens the imitation prior cannot even be posed cleanly on robots, and that is exactly the question the language community has spent two years failing to settle with far better instrumentation.

*Where this leads.* Sections 1 through 8 followed eight threads separately, which is the honest way to survey a field but a poor way to see how the threads actually interact inside a working research program. Section 9 therefore reads one publication record chronologically, chosen because it touches nearly every thread in this document: visuomotor representation learning, learned costs, video prediction, meta-learning, offline reinforcement learning, distributional robustness, large-scale robot datasets, preference optimization, and generalist policies. The argument is that these are not nine interests but one.

---

## 9. The Chelsea Finn Program: One Researcher's Arc as a Map of the Field

**Where did she come from, and who taught her?**

Chelsea Finn took her B.S. in electrical engineering and computer science at MIT, then completed a Ph.D. in computer science at UC Berkeley in 2018 under the joint supervision of Pieter Abbeel and Sergey Levine, with a dissertation titled *Learning to Learn with Gradients* that won the ACM Doctoral Dissertation Award ([biographical record](https://en.wikipedia.org/wiki/Chelsea_Finn)). She is now an assistant professor in Computer Science and Electrical Engineering at Stanford, where she directs IRIS, and a co-founder of Physical Intelligence ([her Stanford page](https://ai.stanford.edu/~cbfinn/)). The EE-then-controls-then-learning trajectory matters for reading her papers: the recurring move is to take a quantity a control engineer would hand-specify and instead estimate it from data, and the recurring anxiety is what happens when that estimate is queried off its training distribution.

**What was the first idea, and what was actually new about it?**

The Berkeley visuomotor work attacked state estimation. [End-to-End Training of Deep Visuomotor Policies](https://arxiv.org/abs/1504.00702) (Levine, Finn, Darrell, Abbeel; JMLR 2016) trained a convolutional policy straight from camera pixels to torques using guided policy search, and [Deep Spatial Autoencoders for Visuomotor Learning](https://arxiv.org/abs/1509.06113) (Finn, Tan, Duan, Darrell, Levine, Abbeel) made the representation itself learned rather than engineered. The mechanism is the spatial softmax. Given a convolutional response map $a_{cij}$ for channel $c$ at pixel $(i,j)$, form

$$s_{cij} = \frac{\exp(a_{cij}/\alpha)}{\sum_{i'j'}\exp(a_{ci'j'}/\alpha)}, \qquad f_c = \Big(\textstyle\sum_{ij} i\, s_{cij},\ \sum_{ij} j\, s_{cij}\Big),$$

where $\alpha$ is a learned temperature and $f_c \in \mathbb{R}^2$ is the expected image-plane position of feature $c$. The $2C$-dimensional vector of feature points, not the raw activations, becomes the state for a local-linear-model reinforcement learner. This is the program's first amortization: an object tracker that would normally be designed becomes a differentiable expectation over a heatmap.

The second amortization was the cost function. [Guided Cost Learning](https://arxiv.org/abs/1603.00448) (Finn, Levine, Abbeel; ICML 2016) learns a neural cost from demonstrations inside a maximum-entropy inverse optimal control model, $p_\theta(\tau) = Z_\theta^{-1}\exp(-c_\theta(\tau))$ with $Z_\theta = \int \exp(-c_\theta(\tau))\,d\tau$ over trajectories $\tau$. The negative log-likelihood of demonstrations is

$$\mathcal{L}(\theta) = \mathbb{E}_{\tau\sim p_{\text{demo}}}\big[c_\theta(\tau)\big] + \log Z_\theta,$$

and the whole difficulty is that $Z_\theta$ is intractable in continuous high-dimensional trajectory space. Guided cost learning estimates it by importance sampling from a policy $q$ that is itself being improved against the current cost, using a mixture proposal $\mu = \tfrac12 \tilde p + \tfrac12 q$ so that

$$\log Z_\theta \approx \log \mathbb{E}_{\tau\sim\mu}\left[\frac{\exp(-c_\theta(\tau))}{\tfrac12 \tilde p(\tau) + \tfrac12 q(\tau)}\right].$$

[A Connection between Generative Adversarial Networks, Inverse Reinforcement Learning, and Energy-Based Models](https://arxiv.org/abs/1611.03852) (Finn, Christiano, Abbeel, Levine; NIPS 2016 adversarial-training workshop) then showed this is a GAN in disguise. If the discriminator is restricted to the form

$$D_\theta(\tau) = \frac{\tfrac{1}{Z}\exp(-c_\theta(\tau))}{\tfrac{1}{Z}\exp(-c_\theta(\tau)) + q(\tau)},$$

where $q(\tau)$ is the generator's own evaluable density, then the discriminator's cross-entropy loss reduces to exactly the maximum-entropy IRL objective above, with $Z$ playing the role of a learned scalar. The paper's value is conceptual: cost learning, density estimation and adversarial training are three views of one estimation problem, which is why her later work moves fluidly between reward models and likelihood ratios.

**Why did she then spend two years predicting video?**

Because the other hand-specified object in a robot's pipeline is the dynamics model. [Unsupervised Learning for Physical Interaction through Video Prediction](https://arxiv.org/abs/1605.07157) (Finn, Goodfellow, Levine; NIPS 2016) introduced convolutional dynamic neural advection, CDNA, whose insight is that a video predictor should predict *motion* rather than pixels. The network emits a small set of normalized $5\times5$ convolution kernels $m^{(k)}$ plus per-kernel composition masks $M_k$, applies each kernel to the previous frame,

$$\hat I^{(k)}_{t+1}(x,y) = \sum_{u,v} m^{(k)}(u,v)\, I_t(x-u,\, y-v), \qquad \hat I_{t+1} = \sum_k M_k \odot \hat I^{(k)}_{t+1},$$

with $\sum_k M_k = \mathbf{1}$ enforced by a channel-wise softmax and $\odot$ denoting elementwise product. Because each kernel is a normalized, translation-equivariant flow operator and the masks assign pixels to kernels, the model learns a soft object segmentation without segmentation labels, and generalizes to objects unseen in training. The paper also released roughly 50,000 to 59,000 robot pushing interactions, the first of many datasets from this group. [Deep Visual Foresight for Planning Robot Motion](https://arxiv.org/abs/1610.00696) (Finn, Levine; ICRA 2017) closed the loop by using the predictor inside sampling-based planning over pixel-space goals, so that the "cost" is a designated pixel arriving at a designated place. Dynamics and cost were now both learned. Task specification and adaptation were not.

**What made MAML the pivot of the whole program?**

[Model-Agnostic Meta-Learning](https://arxiv.org/abs/1703.03400) (Finn, Abbeel, Levine; ICML 2017) amortized the adaptation rule itself. For tasks $\mathcal{T}_i \sim p(\mathcal{T})$ with losses $\mathcal{L}_{\mathcal{T}_i}$, MAML learns an initialization $\theta$ such that one or a few gradient steps suffice:

$$\phi_i = \theta - \alpha\nabla_\theta \mathcal{L}^{\text{tr}}_{\mathcal{T}_i}(\theta), \qquad \min_\theta \sum_i \mathcal{L}^{\text{test}}_{\mathcal{T}_i}\big(\theta - \alpha\nabla_\theta \mathcal{L}^{\text{tr}}_{\mathcal{T}_i}(\theta)\big).$$

Differentiating the outer objective by the chain rule through the inner step gives

$$\nabla_\theta \mathcal{L}^{\text{test}}_{\mathcal{T}_i}(\phi_i) = \big(I - \alpha \nabla^2_\theta \mathcal{L}^{\text{tr}}_{\mathcal{T}_i}(\theta)\big)\, \nabla_{\phi}\mathcal{L}^{\text{test}}_{\mathcal{T}_i}(\phi)\big|_{\phi=\phi_i},$$

which is the entire algorithm and the entire practical problem: the Hessian-vector product is expensive and unrolling many inner steps is memory-bound. Note a common misattribution: MB-MPO ([Clavera et al.](https://arxiv.org/abs/1809.05214)) is MAML-inspired model-based meta-policy optimization and Finn is **not** an author.

The fix for the Hessian came from [Meta-Learning with Implicit Gradients](https://arxiv.org/abs/1909.04630) (Rajeswaran, Finn, Kakade, Levine; NeurIPS 2019), which redefines adaptation as a proximal problem, $\phi_i = \arg\min_\phi \mathcal{L}^{\text{tr}}_{\mathcal{T}_i}(\phi) + \tfrac{\lambda}{2}\|\phi - \theta\|^2$. Implicit differentiation of the stationarity condition yields

$$\frac{d\phi_i}{d\theta} = \Big(I + \tfrac{1}{\lambda}\nabla^2_\phi \mathcal{L}^{\text{tr}}_{\mathcal{T}_i}(\phi_i)\Big)^{-1},$$

so the outer gradient depends only on $\phi_i$ and not on the optimization path, making memory cost independent of inner-loop length.

**What did the meta-learning years actually settle, and what did they leave open?**

They settled that adaptation can be learned and that it transfers to robots. [One-Shot Visual Imitation Learning via Meta-Learning](https://arxiv.org/abs/1709.04905) (Finn, Yu, Zhang, Abbeel, Levine; CoRL 2017) trained a policy that acquires a new manipulation task from a single demonstration, and [One-Shot Imitation from Observing Humans via Domain-Adaptive Meta-Learning](https://arxiv.org/abs/1802.01557) (Yu, Finn, Xie, Dasari, Zhang, Abbeel, Levine; RSS 2018) pushed the demonstration modality all the way to raw human video, meta-learning a loss that bridges the human-robot embodiment gap. [Probabilistic MAML](https://arxiv.org/abs/1806.02817) (Finn, Xu, Levine) made the adapted parameters a posterior sample rather than a point, giving calibrated ambiguity when one example admits many task hypotheses, and [PEARL](https://arxiv.org/abs/1903.08254) (Rakelly, Zhou, Quillen, Finn, Levine; ICML 2019) moved task inference into a probabilistic latent context variable $z$ inferred from transitions, decoupling exploration from off-policy value learning and improving meta-RL sample efficiency by orders of magnitude.

What they left open was diagnosed inside the program. [Meta-Learning without Memorization](https://arxiv.org/abs/1912.03820) (Yin, Tucker, Zhou, Levine, Finn; ICLR 2020) showed that when task distributions are non-mutually-exclusive, the meta-learner can memorize the task mapping and never learn to adapt at all, and proposed an information-theoretic regularizer on the task-specific weights. That is a structural admission: benchmark construction, not algorithms, was the binding constraint. It anticipates the dataset-building decade that follows.

**What did the Stanford lab set out to do, and why did offline RL and robustness come first?**

IRIS states its agenda as an interest in "the capability of robots and other agents to develop broadly intelligent behavior through learning and interaction" ([lab site](https://irislab.stanford.edu/)). From 2019, the immediate obstacle was that interaction is expensive, so the lab attacked learning from fixed data and learning under shift simultaneously. [MOPO](https://arxiv.org/abs/2005.13239) (Yu, Thomas, Yu, Ermon, Zou, Levine, Finn, Ma; NeurIPS 2020) penalizes the learned model's reward by its own uncertainty,

$$\tilde r(s,a) = \hat r(s,a) - \lambda\, u(s,a),$$

where $u$ is an admissible error estimator for the learned dynamics $\hat T$ and $\lambda>0$ trades conservatism against coverage; the resulting policy provably maximizes a lower bound on true return. [COMBO](https://arxiv.org/abs/2102.08363) (Yu, Kumar, Rafailov, Rajeswaran, Levine, Finn; NeurIPS 2021) removes the need for an explicit $u$ by regularizing the value function directly on model rollouts,

$$\min_Q\ \beta\Big(\mathbb{E}_{(s,a)\sim\rho}[Q(s,a)] - \mathbb{E}_{(s,a)\sim\mathcal{D}}[Q(s,a)]\Big) + \tfrac12\,\mathbb{E}_{d_f}\big[(Q - \hat{\mathcal{B}}Q)^2\big],$$

where $\rho$ is the model-rollout distribution, $\mathcal{D}$ the offline dataset, $\hat{\mathcal{B}}$ the empirical Bellman operator and $\beta$ the conservatism weight. The pattern is the same as guided cost learning: an intractable object, here the out-of-support value, is controlled by a sampled contrast rather than an analytic bound.

The robustness thread is the same problem in supervised clothing. Group DRO itself is [Sagawa, Koh, Hashimoto and Liang](https://arxiv.org/abs/1911.08731) and Finn is **not** an author; her contribution is [Just Train Twice](https://arxiv.org/abs/2107.09044) (Liu, Haghgoo, Chen, Raghunathan, Koh, Sagawa, Liang, Finn; ICML 2021), which achieves worst-group robustness without group labels by upweighting the examples a first ERM model misclassifies. [Adaptive Risk Minimization](https://arxiv.org/abs/2007.02931) (Zhang, Marklund, Dhawan, Gupta, Levine, Finn; NeurIPS 2021) meta-trains a model to adapt from a batch of unlabeled test inputs, which is MAML pointed at domain shift rather than at tasks. [Extending the WILDS Benchmark](https://arxiv.org/abs/2112.05090) and [Wild-Time](https://arxiv.org/abs/2211.14238) (Yao, Choi, Cao, Lee, Koh, Finn) supply the evaluation infrastructure, the latter specifically for temporal shift.

**How did the lab get from algorithms to hardware and datasets?**

By building the datasets that the memorization paper implied were missing. [RoboNet](https://arxiv.org/abs/1910.11215) (Dasari et al., with Levine and Finn) pooled 15 million video frames across seven robot platforms; [Bridge Data](https://arxiv.org/abs/2109.13396) (Ebert et al., with Finn and Levine) added cross-domain kitchen data; [BC-Z](https://arxiv.org/abs/2202.02005) (Jang, Irpan, Khansari, Kappler, Ebert, Lynch, Levine, Finn) showed language- and video-conditioned behavior cloning generalizing zero-shot to held-out tasks; [Open X-Embodiment](https://arxiv.org/abs/2310.08864) merged 60 datasets across 22 embodiments into the field's first genuinely shared corpus; and [DROID](https://arxiv.org/abs/2403.12945) (Khazatsky, Pertsch et al., 101 authors including Finn and Levine) contributed 76,000 trajectories, 350 hours, 564 scenes and 84 tasks gathered by 50 collectors on three continents.

Hardware came from Tony Z. Zhao. [Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](https://arxiv.org/abs/2304.13705) (Zhao, Kumar, Levine, Finn; RSS 2023) introduced ALOHA and Action Chunking with Transformers, ACT, which predicts a chunk of $H$ future actions from one observation using a conditional-VAE transformer, reaching 80 to 90% success on precision tasks from roughly ten minutes of demonstrations per task. Chunking is the load-bearing idea: it suppresses compounding covariate shift and non-Markovian demonstrator noise by amortizing over a horizon. [Mobile ALOHA](https://arxiv.org/abs/2401.02117) (Fu, Zhao, Finn) added whole-body teleoperation, and [ALOHA Unleashed](https://arxiv.org/abs/2410.13126) (Zhao, Tompson, Driess, Florence, Ghasemipour, Finn, Wahid) scaled diffusion policies to dexterous bimanual tasks at Google DeepMind, with Finn confirmed as a co-author. [OpenVLA](https://arxiv.org/abs/2406.09246) (Kim, Pertsch, Karamcheti et al., with Finn) released a 7B open vision-language-action model trained on 970,000 episodes. Most recently the lab has turned to what large policies structurally lack: memory and evaluation. [RoboArena](https://arxiv.org/abs/2506.18123) replaces centralized robot challenges with double-blind pairwise comparisons across seven institutions aggregated by a Bradley-Terry model, over 600 real-robot episodes and seven policies, and MemER (ICLR 2026), Ctrl-World (ICLR 2026) and TQL (ICML 2026) address experience retrieval, controllable world models and Q-function scaling respectively ([IRIS publications](https://irislab.stanford.edu/publications.html)). The lab also published autonomous surgical suturing via hierarchical language-conditioned imitation in *Science Robotics* ([SRT-H, 2025](https://irislab.stanford.edu/publications.html)).

**Why is the language-model work not a detour?**

Because it produced the post-training mathematics that robot policies now use. [Direct Preference Optimization](https://arxiv.org/abs/2305.18290) (Rafailov, Sharma, Mitchell, Ermon, Manning, Finn; NeurIPS 2023) starts from the KL-regularized RLHF optimum $\pi^*(y|x) \propto \pi_{\text{ref}}(y|x)\exp(r(x,y)/\beta)$, inverts it to $r(x,y) = \beta\log\frac{\pi^*(y|x)}{\pi_{\text{ref}}(y|x)} + \beta\log Z(x)$, and observes that under a Bradley-Terry preference model the intractable $\log Z(x)$ cancels between the chosen and rejected completions, leaving

$$\mathcal{L}_{\text{DPO}} = -\,\mathbb{E}_{(x,y_w,y_l)}\left[\log\sigma\!\left(\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta\log\frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right].$$

This is structurally the same trick as guided cost learning: a partition function that cannot be computed is eliminated by contrasting samples. [From r to Q*](https://arxiv.org/abs/2404.12358) (Rafailov, Hejna, Park, Finn; COLM 2024) then proves that at the token level DPO is an inverse Q-learning algorithm satisfying a Bellman equation, so the implicit reward performs credit assignment within a sequence. Swap tokens for action tokens and that is exactly the credit-assignment problem in a chunked robot policy. The editing work is the other half: [MEND](https://arxiv.org/abs/2110.11309) and [SERAC](https://arxiv.org/abs/2206.06520) (Mitchell, Lin, Bosselut, Manning, Finn) perform targeted post-deployment correction of a deployed model, MEND by learning a low-rank transformation of the fine-tuning gradient and SERAC by routing edited inputs to a counterfactual model, which is the language analogue of correcting a robot mid-task. [DetectGPT](https://arxiv.org/abs/2301.11305) (Mitchell, Lee, Khazatsky, Manning, Finn) and [Fine-tuning Language Models for Factuality](https://arxiv.org/abs/2311.08401) (Tian, Mitchell, Yao, Manning, Finn) complete the reliability story.

**What is Physical Intelligence building, and what is actually verified?**

Physical Intelligence was founded in 2024 with Karol Hausman as CEO, alongside Sergey Levine, Finn, Brian Ichter, Lachy Groom and others. Press reporting puts a confirmed $5.6B valuation from a $600M round in November 2025, with a further roughly $1B raise at above $11B reported in talks in March 2026 and not confirmed closed ([TechCrunch](https://techcrunch.com/2026/03/27/physical-intelligence-is-reportedly-in-talks-to-raise-1-billion-again/), [Dealroom](https://app.dealroom.co/news/feed/physical-intelligence-raises-1-6b-across-two-rounds-valuation-hits-11-2b)).

[$\pi_0$](https://arxiv.org/abs/2410.24164) is a 3.3B-parameter model: a 3B PaliGemma vision-language backbone plus a 300M action expert trained by conditional flow matching over action chunks of horizon $H=50$,

$$L^\tau(\theta) = \mathbb{E}\left[\big\|v_\theta(A_t^\tau, o_t) - u(A_t^\tau \mid A_t)\big\|^2\right],$$

where $A_t$ is the ground-truth chunk, $A_t^\tau$ its noised interpolant at flow time $\tau\in[0,1]$, $u$ the target vector field and $v_\theta$ the learned one, over 10,000-plus hours across seven robot configurations and 68 tasks. [FAST](https://arxiv.org/abs/2501.09747) (Pertsch, Stachowicz, Ichter, Driess, Nair, Vuong, Mees, Finn, Levine) replaces per-timestep binning with discrete-cosine-transform tokenization, reported as up to 5x faster training at matched performance. [Hi Robot](https://arxiv.org/abs/2502.19417) (Shi, Ichter, Pertsch et al., with Finn; ICML 2025) adds a System-2 VLM that decomposes open-ended prompts and situated feedback into subtasks for the System-1 policy. [$\pi_{0.5}$](https://arxiv.org/abs/2504.16054) co-trains on heterogeneous supervision including web data, object detections and semantic subtask labels, and reports cleaning entire unseen kitchens and bedrooms. [Real-time chunking](https://arxiv.org/abs/2506.07339) reformulates chunk stitching as inpainting: the first few timesteps are frozen to the previous chunk's values while the remainder is regenerated under partial attention, holding throughput constant under 100 to 300 ms injected latency where synchronous inference and temporal ensembling degrade. $\pi^*_{0.6}$ introduces Recap, RL with Experience and Corrections via Advantage-conditioned Policies: a value function is trained on demonstrations, teleoperator coaching and autonomous practice, and the policy is conditioned on the advantage $A^\pi(s,a) = Q^\pi(s,a) - V^\pi(s)$ so that bad data is retained but annotated with its own quality, reportedly more than doubling throughput on espresso, laundry and box assembly and exceeding 90% success on the hardest task ([company blog, November 2025](https://www.pi.website/blog/pistar06)). [$\pi_{0.7}$](https://arxiv.org/abs/2604.15483) (April 2026) conditions on language, metadata, control-modality labels and world-model-generated visual subgoals, and reports one generalist matching task specialists plus zero-shot cross-embodiment laundry folding on a UR5e. The $\pi^*_{0.6}$ and $\pi_{0.7}$ headline numbers are company self-reports on internal tasks, not peer-reviewed or independently replicated, and should be read as such; $\pi_0$, FAST, Hi Robot and real-time chunking have arXiv papers, with Hi Robot at ICML 2025.

**So what unifies all of it?**

The candidate thesis, that the arc is a systematic replacement of hand-specified structure by structure amortized from data, fits the first decade almost exactly. Representations became feature points, costs became learned energies, dynamics became video predictors, adaptation rules became learned initializations, task identity became an inferred latent, and finally the policy prior became a pretrained VLM. But the thesis fails as stated on the last five years, because chunking, FAST tokenizers, explicit System-1 and System-2 hierarchy, advantage conditioning and metadata conditioning are all hand-designed structure being *added back*.

The revision that survives the record is this: structure migrates from the objective to the interface. What gets deleted is human specification of *what to optimize*, cost functions, dynamics equations, task boundaries, uncertainty bounds, adaptation rules. What gets kept and in fact elaborated is human specification of *how data and computation enter the model*, action horizons, tokenizations, conditioning variables, hierarchy, latency schedules. The second, and arguably deeper, invariant is the problem being attacked: every era targets distribution shift at deployment. Meta-learning handles it by learning to adapt, offline RL by refusing to trust out-of-support values, group robustness by reweighting, test-time adaptation by using unlabeled test batches, dataset building by widening support, and Recap by letting the robot generate its own on-distribution corrections. Read that way the language-model work is not a detour at all; DPO, MEND and factuality tuning are post-training-under-shift for a different modality, and the DPO-to-Q\* result is the bridge that hands robot policies a value-based post-training method with no RL loop.

**What does she say is still unsolved?**

She is reported as explicit that scale is not the answer by itself, treating scale as necessary for open-world generalization but subordinate to actually solving the problem, and as skeptical of naive human-video scaling on the grounds that people do not learn to write by watching others write, nor become expert tennis players by watching Wimbledon ([Fast Company](https://www.fastcompany.com/91550763/chelsea-finn-wants-robots-to-get-better-at-learning)). That profile could not be fetched directly for this review, so the two statements are given as reported paraphrase rather than as verified quotation. In 2025 and 2026 talks she has foregrounded four gaps: autonomous improvement, meaning systems that seek out their own data and supervision rather than waiting for demonstrations; the physical rollout cost of RL, since a million trajectories of a one-minute task is on the order of 700 robot-days, which makes LLM-style post-training scaling laws inapplicable; memory, since most state-of-the-art policies have effectively none; and evaluation, where a better model can still be a worse product if the benchmark misses throughput, predictability and safety constraints ([summary of her YC Startup School talk](https://www.startuphub.ai/ai-news/robotics/2026/chelsea-finn-the-state-of-physical-intelligence-in-robotics)). Note that this last source is a secondary paraphrase rather than a transcript, so the wording is not hers. Her ICLR 2025 invited talk was titled *Data-Driven Pre-Training and Post-Training for Robot Foundation Models* ([ICLR listing](https://iclr.cc/virtual/2025/10000222)), and RoboArena, MemER and Ctrl-World are the lab's direct responses to the evaluation, memory and rollout-cost gaps.

**Who came out of this lab?**

```
                 Pieter Abbeel ──┬── Sergey Levine
                                 │        │
                                 └────────┴──> Chelsea Finn (Berkeley PhD 2018)
                                                       │
                        ┌──────────────────────────────┼──────────────────────────────┐
                        │                              │                              │
                 ROBOT LEARNING                  LM / ALIGNMENT              PHYSICAL INTELLIGENCE
                        │                              │                        (co-founded 2024)
   Tianhe Yu ──> Google DeepMind          Eric Mitchell ──> OpenAI          Karol Hausman (CEO)
   Annie Xie ──> Google DeepMind          Archit Sharma ──> Google DeepMind Sergey Levine
   Allan Zhou ──> Google DeepMind         Rafael Rafailov (DPO, r->Q*)      Brian Ichter
   Tony Z. Zhao ──> Sunday Robotics                                         Lachy Groom
        (co-founder/CEO, left PhD)                                          Suraj Nair (PI author on pi0)
   A. Khazatsky ──> startup (unnamed)                                       Karl Pertsch (PI; PhD was
                                                                              at USC, collaborator not
                                                                              her student)
   (Placements that could not be verified against a primary source are omitted
    from this tree rather than hedged.)
   CURRENT IRIS (2026): Moo Jin Kim, Lucy Xiaoyang Shi, Perry Dong, Yoonho Lee,
   Anikait Singh, Jonathan Yang, Tian Gao, Jubayer Ibn Hamid, Lars Ankile,
   Alexander Swerdlow, Marcel Torne Villasevil
   POSTDOCS: Yuejiang Liu, Ji Woong Kim (SRT-H surgical autonomy)
```

Lab-reported alumni destinations include Waymo, Google DeepMind, OpenAI, Tesla, Toyota Research Institute, Physical Intelligence, Anthropic and Figure, plus faculty-track placements the lab lists in aggregate rather than by name ([IRIS people page](https://irislab.stanford.edu/people.html)).

*Where this leads.* The program just described is limited less by ideas than by measurement and data, a point its own author makes repeatedly. Section 10 takes those constraints seriously and quantifies them, beginning with the uncomfortable observation that the field's standard evaluation protocol cannot statistically resolve the differences it reports.

---

## 10. Evaluation, Data, Hardware, and the Live Open Problems

**Why can most published robot policy comparisons not resolve the differences they claim?**

Start with the arithmetic, because it settles the argument before any methodological debate begins. A rollout is a Bernoulli trial, so an estimate $\hat p$ of success probability $p$ from $n$ independent trials has standard error $\mathrm{SE}(\hat p) = \sqrt{p(1-p)/n}$, where $n$ is the number of rollouts. At $p = 0.5$ and $n = 20$, that is $\sqrt{0.25/20} \approx 0.112$, an 11.2 percentage-point standard error on a single number. Comparing two policies is worse, since the difference of two independent proportions has standard error $\sqrt{2p(1-p)/n} \approx 15.8$ points under the same conditions. The minimum detectable effect at $\alpha = 0.05$ two-sided and 80% power is roughly $(z_{0.975} + z_{0.80})\sqrt{2p(1-p)/n} = 2.80 \times 0.158 \approx 0.44$, so a 20-trial-per-arm comparison can only reliably detect a gap of about 44 percentage points. Inverting the same expression, resolving a genuine 10-point difference near $p = 0.5$ requires $n \approx 2p(1-p)(2.80/0.10)^2 \approx 390$ rollouts per policy. Almost no paper in robot learning runs that many. NVIDIA's evaluation guidance makes the point concretely with exact intervals: an observed 90% success rate over 70 rollouts carries a 95% Clopper-Pearson interval of 80.5% to 95.9%, a span of 15.4 points ([NVIDIA Developer Blog, 2025](https://developer.nvidia.com/blog/how-to-evaluate-general-purpose-robot-policies-for-real-world-deployment/)).

The field has begun to say this in print. Kress-Gazit and co-authors argue that robot learning reports "success rate" with little or no information about trial counts, initial conditions, success criteria, or statistical analysis, and call for evaluation practice appropriate to an empirical science ([Kress-Gazit et al., 2024](https://arxiv.org/abs/2409.09491)). Vincent, Nishimura, Itkina, Shah, Schwager and Kollar, spanning Toyota Research Institute and Stanford, propose distribution-free lower confidence bounds on policy performance and show that a uniformly most accurate bound needs roughly 40 to 50 rollouts to certify a maximum expected shortfall of 0.08 to 0.12 at 95% confidence, tighter than Clopper-Pearson at small $n$ ([Vincent et al., 2024](https://arxiv.org/html/2405.05439v1)). Snyder, Hancock, Badithela, Dixon and colleagues at Princeton and TRI attack the sample-size problem directly with sequential testing, cutting required trials by up to 32% while preserving probabilistic correctness, which matters precisely because the feasible regime is 10 to 50 trials ([Snyder et al., RSS 2025](https://arxiv.org/pdf/2503.10966)). The largest industrial demonstration of disciplined practice is TRI's Large Behavior Model study, an 81-author effort including Russ Tedrake that ran blind, randomized A/B trials with explicit statistical confidence rather than reporting bare success rates ([TRI LBM Team, Science Robotics 2025](https://arxiv.org/abs/2507.05331)).

**Does simulation evaluation actually predict real-world performance?**

Partially, and the best evidence is quantitative rather than rhetorical. SIMPLER, from Xuanlin Li, Kyle Hsu, Karl Pertsch, Oier Mees, Sergey Levine, Chelsea Finn, Jiajun Wu, Hao Su, Quan Vuong and Ted Xiao, ran roughly 1,500 paired sim-and-real evaluations across two embodiments and eight task families ([Li et al., CoRL 2024](https://arxiv.org/abs/2405.05941)). On the Google Robot setup with visual matching, aggregated Pearson correlation between simulated and real success was $r = 0.924$ with Mean Maximum Rank Violation of 0.056, versus $r = 0.308$ and MMRV 0.412 for a validation-loss proxy ([SIMPLER, Table I](https://arxiv.org/html/2405.05941v1)). MMRV is the useful invention here: for a set of policies with real success rates $s_i$ and simulated rates $\tilde s_i$, a rank violation between policies $i$ and $j$ is $|s_i - s_j|$ whenever the simulator orders them oppositely to reality, and MMRV averages over $i$ the maximum such violation against all $j$. It penalizes getting the ordering wrong in proportion to how much the real gap mattered, which is what a decision-maker cares about, whereas Pearson correlation rewards linear fit that no one needs.

The benchmark stack around this is now substantial: LIBERO with 130 tasks across four suites for knowledge transfer ([Liu et al., NeurIPS 2023](https://arxiv.org/abs/2306.03310)), RoboCasa with 120 kitchen scenes, 2,500-plus 3D objects, 100 tasks and over 100,000 trajectories, expanded to 365 tasks in a February 2026 release ([Nasiriany, Maddukuri, Zhu et al., 2024](https://arxiv.org/abs/2406.02523)), and ManiSkill3, which reaches 30,000-plus frames per second with parallel rendering on a single 4090 ([Tao et al., 2024](https://arxiv.org/abs/2410.00425)). Meta-World and RLBench remain in use but are effectively saturated as discriminators for modern generalist policies. The most interesting recent move is distributed real-world evaluation. RoboArena, from Atreya, Pertsch and collaborators, crowd-sources double-blind pairwise comparisons across a network of evaluators on DROID hardware, collecting 612 pairwise comparisons over seven generalist policies at seven academic institutions from 4,284 total episodes, and reports better agreement with an exhaustive oracle ranking than centralized evaluation at equal budget, converging within roughly 100 comparisons ([Atreya et al., CoRL 2025](https://arxiv.org/abs/2506.18123)). The complementary trick is statistical rather than logistical: SureSim casts evaluation as prediction-powered inference, using paired real and simulated rollouts to debias the simulator and produce non-asymptotic confidence intervals, saving 20% to 25% of hardware effort for equivalent bounds ([Badithela, Snyder, Dixit and Majumdar et al., 2025](https://arxiv.org/abs/2510.04354)). Automated real-to-sim benchmarking is arriving too, though RobotArena $\infty$ from Jangir, Ke, Bisk and Fragkiadaki's group is admirably honest that its real-world correlation was validated on essentially one task ([Jangir et al., 2025](https://arxiv.org/html/2510.23571v1)), and world-model evaluators remain unproven, with GigaWorld-1 reporting that visual fidelity correlates at $\rho = 0.84$ with evaluator quality while cautioning that photorealism is not what makes an evaluator faithful ([GigaWorld-1, 2026](https://arxiv.org/html/2607.02642)).

**How large is the data gap, and does robot data obey a scaling law?**

The ratio is the whole argument. Llama 3 was pretrained on more than 15 trillion tokens ([Meta AI, 2024](https://ai.meta.com/blog/meta-llama-3/)), while Open X-Embodiment, the largest aggregated real-robot corpus, holds over one million trajectories from 22 embodiments covering more than 500 skills ([Open X-Embodiment Collaboration, 2023](https://arxiv.org/abs/2310.08864)). You can inflate the robot number by tokenizing video frames, but the honest comparison is in independent samples of causal action consequence, and there the gap is five or six orders of magnitude. Human video partially closes it: Ego4D provides 3,670 hours from 923 participants, and Ego-Exo4D adds 1,286.3 hours of skilled activity with paired exocentric views from 740 camera wearers ([Grauman et al., CVPR 2024](https://arxiv.org/abs/2311.18259)). Neither carries actions.

Whether robot data follows a power law is genuinely unresolved. The strongest single measurement is Fanqi Lin, Yingdong Hu, Chuan Wen and Yang Gao's study at Tsinghua and Shanghai Qi Zhi, which collected over 40,000 demonstrations and ran more than 15,000 real rollouts, finding that generalization follows a roughly power-law relationship in the number of training *environments* and *objects* while demonstrations per environment saturate quickly ([Lin et al., ICLR 2025 Oral](https://arxiv.org/abs/2410.18647)). Writing the fit as
$$ 1 - S(E, O, D) \;\approx\; c\, E^{-\alpha} O^{-\beta} + \varepsilon_\infty, $$
where $S$ is success rate on novel scenes, $E$ is the number of distinct environments, $O$ the number of distinct objects, $D$ demonstrations per condition, $\alpha, \beta > 0$ the diversity exponents and $\varepsilon_\infty$ an irreducible floor, the paper's practical claim is that $\partial S / \partial D \to 0$ well before $\partial S / \partial E \to 0$. Their headline: four collectors working one afternoon sufficed for roughly 90% success on two tasks in unseen environments with unseen objects. The critical caveat, which the review should state plainly, is that these exponents belong to that laboratory's tasks, gripper and policy class. No independent group has replicated the exponents, no cross-task universality has been demonstrated, and there is no accepted definition of the unit of robot data analogous to a token. Whether robot imitation learning has a scaling law is therefore an open empirical question, not a settled fact.

The cost structure is what makes this bite. Teleoperated collection consumes human time roughly linearly in episodes, which is why the Universal Manipulation Interface from Cheng Chi, Zhenjia Xu and Shuran Song, spanning Stanford REALab, Columbia and TRI, moved collection to a 3D-printed handheld gripper with a single GoPro, removing the robot from the loop entirely ([Chi et al., RSS 2024](https://arxiv.org/abs/2402.10329)). EgoMimic at Georgia Tech went further, co-training on Project Aria egocentric human video with a kinematically matched bimanual robot, and reports 34% to 228% gains over robot data alone from 90 minutes of Aria recordings ([Kareer et al., CoRL 2024](https://arxiv.org/abs/2410.24221)). Synthetic generation is the third lever: DexMimicGen expanded 60 human demonstrations into over 20,000 bimanual dexterous trajectories across nine tasks ([Jiang et al., ICRA 2025](https://arxiv.org/abs/2410.24185)), and RoboGen and Gen2Sim use generative models to propose tasks and scenes. All three levers trade action fidelity for volume, and no one has measured the exchange rate.

**What does the hardware and latency picture honestly look like?**

Costs have collapsed at the low end. Mobile ALOHA, from Zipeng Fu, Tony Zhao and Chelsea Finn at Stanford, costs about $32,000 including onboard power and compute and learns some tasks from 50 demonstrations ([Fu et al., 2024](https://mobile-aloha.github.io/)), while ALOHA 2 at Google DeepMind open-sourced improved hardware with a MuJoCo model. Hugging Face's SO-101 in the LeRobot ecosystem can be self-built for roughly $100 to $130, with motor kits around $220 ([TechCrunch, 2025](https://techcrunch.com/2025/04/28/hugging-face-releases-a-3d-printed-robotic-arm-starting-at-100/)). Tactile sensing has matured in hardware more than in adoption: open-source DIGIT fingertips have a component cost near $15, and Digit 360 from Meta and GelSight resolves forces down to one millinewton across more than 18 sensing modalities ([GelSight, 2024](https://www.gelsight.com/gelsight-and-meta-ai-introduce-digit-360-tactile-sensor/)), yet almost no frontier VLA consumes tactile input as a first-class modality.

On humanoids, the reader should hold company statements and independent replication apart. Figure reports 200 hours of continuous autonomous package sorting with Figure 03 and states that home deployment is not ready; 1X projects 60% to 70% autonomy for NEO in 2026 with a remote human operator taking over otherwise, which is a candid admission that the product ships with a teleoperation fallback. These are self-reports relayed through press, not peer-reviewed or independently reproduced, and no third party has published matched-protocol evaluations of Figure, 1X, Tesla Optimus or Unitree platforms against each other. Treat every humanoid capability claim as unverified until someone outside the company runs it.

Compute and latency form the underrated constraint. Contact-rich manipulation wants closed-loop rates of 30 to 100 Hz, while a $\pi_0$-scale flow-matching VLA takes tens to hundreds of milliseconds per forward pass. Action chunking hides this by emitting $H$ actions at once, so blocking execution is feasible only when inference latency $\tau$ satisfies $\tau \le H \Delta t$, with $\Delta t$ the control period; at 50 Hz and $H = 50$, that is a one-second budget, but the resulting pause-and-replan seam degrades precise tasks. Real-Time Chunking from Kevin Black and colleagues at Physical Intelligence generates the next chunk while executing the current one, freezing committed actions and inpainting the remainder under prefix guidance, and remains performant with delays up to 50% of the prediction horizon ([Black et al., NeurIPS 2025](https://arxiv.org/abs/2506.07339)); a training-time variant used in the $\pi^*_{0.6}$ espresso demonstration improves on it at higher delays ([Physical Intelligence, 2025](https://arxiv.org/abs/2512.05964)).

**Which problems are actually open, and where is the bottleneck?**

```
                     DATA          ALGORITHMS     HARDWARE      EVALUATION
                  ------------   ------------   -----------   ------------
long-horizon
reliability            o              X              .             X
dexterity /
contact control        o              X              X             o
reset-free self-
improvement            .              X              o             X
memory over
long episodes          o              X              .             X
safety /
constrained policy     .              X              o             X
uncertainty /
ask-for-help           .              X              .             X
reward & preference
specification          X              o              .             X
cross-embodiment
transfer               X              X              o             o
compositional
generalization         X              X              .             X

   X = primary bottleneck    o = secondary    . = largely not the issue
```

The pattern in that table is the argument: evaluation is a primary or secondary bottleneck for every single open problem, which is why it deserves first billing. Taking the rows in turn, long-horizon reliability is a compounding-error problem with real theory behind it: behavior cloning inherits quadratic-in-horizon error growth in discrete settings, and Simchowitz and co-authors show it can be exponential in continuous action spaces, while action chunking and exploratory collection provably mitigate it by inducing control-theoretic stability ([Simchowitz et al., 2025](https://arxiv.org/html/2507.09061)). Current best attempts detect and retry rather than avoid: FAR builds failure-contrastive preferences at test time ([FAR, 2026](https://arxiv.org/abs/2607.01111)), and Rewind-IL respawns states on detected failure, but neither certifies a reliability level. Reset-free self-improvement, whose lineage runs through Gupta and Levine's multi-task reset-free dexterity work ([Gupta et al., 2021](https://arxiv.org/abs/2104.11203)), has its strongest recent instantiation in RECAP, where advantage-conditioned policies fold demonstrations, expert interventions and autonomous trials into one supervised objective and roughly halve failure rates while more than doubling throughput on laundry, box assembly and espresso ([Physical Intelligence, $\pi^*_{0.6}$, 2025](https://arxiv.org/abs/2511.14759)). That is a company self-report on company hardware; nobody has replicated it. Safety remains the sharpest gap between control theory and learned policies: CBF-based filters can be attached to a VLA by reading its attention heads to identify the intended target and treating the rest of the scene as obstacles ([attention-guided safety filter, 2026](https://arxiv.org/html/2606.09749)), but the guarantee holds only for the filter's model class, not for the policy. Knowing when to ask is best formalized by KnowNo, which uses conformal prediction over multiple-choice LLM plan options to give a distribution-free bound on task completion while minimizing help requests ([Ren, Majumdar et al., CoRL 2023](https://arxiv.org/abs/2307.01928)); it covers plan-level ambiguity, not continuous-control uncertainty. Cross-embodiment transfer is not free: naive pooling of heterogeneous action spaces produces documented negative transfer, and 2026 work finds that morphology shifts benefit far less from unstructured diversity than from paired data analogies ([Data Analogies, 2026](https://arxiv.org/abs/2603.06450)). Compositional generalization now has diagnostic instruments, with ATOM-Bench factorizing tabletop manipulation into 30 atomic and 24 held-out compositional tasks and finding that strong atomic performance does not imply composable skills ([ATOM-Bench, 2026](https://arxiv.org/abs/2606.16826)).

**Where is the value likely to accrue, and what is the funding picture?**

This paragraph is judgment, not measurement, and should be read that way. Physical Intelligence raised $600 million at a $5.6 billion valuation in November 2025 led by Alphabet's CapitalG with Lux, Thrive, Index, T. Rowe Price and Jeff Bezos ([Bloomberg, 2025](https://www.bloomberg.com/news/articles/2025-11-20/robotics-startup-physical-intelligence-valued-at-5-6-billion-in-new-funding); [The Robot Report](https://www.therobotreport.com/physical-intelligence-raises-600m-advance-robot-foundation-models/)), Skild AI raised roughly $1.4 billion at a reported $14 billion-plus valuation in early 2026, and Figure carries a $39 billion post-money valuation from its September 2025 Series C, per funding trackers aggregating press coverage ([New Market Pitch tracker, 2026](https://newmarketpitch.com/blogs/news/physical-ai-top-startups-valuation)). The load-bearing technical bet under the model-layer valuations is that a single policy family amortizes across embodiments and tasks well enough that data collected for one customer improves all others, which is exactly the cross-embodiment and scaling-law question that remains empirically unsettled. The load-bearing bet under humanoid valuations is that general-purpose morphology beats task-specific automation on total cost of ownership, which no public deployment has yet demonstrated. My reading of where durable value sits, in descending order of confidence: proprietary deployment data loops with a real reward signal, then integration and service into specific industrial workflows, then hardware, then models. Models are the most likely layer to commoditize, because open weights, shared benchmarks and academic replication move fastest there.

**Which directions would you actually attack?**

First, closed-loop distribution-shift theory for modern VLAs. The gap is that DAgger-era bounds assume single-step policies while deployed systems emit chunks under asynchronous inference, so nobody knows the correct horizon dependence for real systems. The handle is the stability analysis already developed for chunked continuous control ([Simchowitz et al., 2025](https://arxiv.org/html/2507.09061)), extended to include latency $\tau$ and prefix-guided inpainting as explicit parameters, yielding a predicted success-versus-horizon curve you can falsify on hardware. Now is the moment because RTC gives a concrete asynchronous execution model to analyze. Counterargument: bounds in this literature are usually too loose to guide engineering.

Second, statistically valid cheap evaluation as a first-class research artifact. The gap is that the field cannot afford 400 rollouts per policy, so it reports numbers it cannot defend. The handle is prediction-powered inference combining abundant simulated rollouts with scarce real ones ([SureSim](https://arxiv.org/abs/2510.04354)) fused with sequential stopping rules ([STEP](https://arxiv.org/pdf/2503.10966)) and distributed pairwise preference aggregation ([RoboArena](https://arxiv.org/abs/2506.18123)). Now is right because all three components exist separately and none has been combined into a single protocol with published operating characteristics. Counterargument: methodology contributions are under-rewarded by conference incentives, so adoption may lag correctness.

Third, verifier-based test-time compute for physical tasks. The gap is that policies have no notion of checking their own output before committing it to the world. The handle is a learned value or process reward model scoring $K$ sampled action chunks, which turns extra compute into reliability; E-TTS reports peak performance near a 1:1 ratio between reasoning and action scaling ([E-TTS, 2026](https://arxiv.org/html/2606.27268)), and RoVer upgrades frozen VLAs with a compact process reward model ([RoVer, 2025](https://arxiv.org/html/2510.10975)). Now is right because latency budgets have loosened via asynchronous chunking. Counterargument: physical verification lacks the cheap ground truth that makes verifier scaling work in code and mathematics, so the verifier may inherit the policy's blind spots.

Fourth, latent-action learning from human video at scale. The gap is the five-orders-of-magnitude data ratio, and human video is the only corpus large enough to close it. The handle is quantized inter-frame latent actions, as in LAPA, which reached 50.09% average real-world success against OpenVLA's 43.87% while pretraining unsupervised on 220,000 human videos rather than 970,000 labeled robot trajectories ([Seonghyeon Ye, Joel Jang et al., ICLR 2025](https://arxiv.org/abs/2410.11758)). Now is right because Ego-Exo4D supplies paired viewpoints that constrain the latent space. Counterargument: latent actions may encode appearance change rather than causal control, and no one has shown the representation keeps improving past the scale at which robot action labels take over.

*Where this leads.* Section 11 closes the review in three parts, as promised at the outset: a dense prose recap of the actual substance, a concrete checklist of what to study next, and my own opinionated recommendations with the reasoning attached and the strongest counterargument to each stated rather than hidden.

---

## 11. Closing: What You Now Know, What to Study Next, and My Recommendations

### What you now know

The field decomposes not into topics but into relaxed assumptions, and once you see that, the seventy-year chronology reads as one argument. Classical optimal control gave us the Bellman equation and the fact that the optimality operator is a $\gamma$-contraction in the sup norm, which is the reason dynamic programming terminates and the reason the effective horizon is $1/(1-\gamma)$. Removing the assumption of known dynamics produced system identification, then model-based reinforcement learning, then world models, and it produced along the way the simulation lemma showing that model error $\epsilon$ inflates to roughly $O(\epsilon H^2)$ value error over horizon $H$, which is why long rollouts in learned models are worthless. Removing known cost produced inverse reinforcement learning, whose central difficulty is the intractable partition function $Z_\theta = \int \exp(-c_\theta(\tau))d\tau$, and whose central trick, eliminating $Z$ by contrasting samples, was invented in guided cost learning in 2016 and reinvented as an exact cancellation in direct preference optimization in 2023 by an overlapping set of authors. Removing observed state produced POMDPs, belief-state methods and latent-state models. Removing the fixed task produced multi-task learning and then meta-learning, whose canonical form is the bilevel objective solved by MAML, whose meta-gradient carries the factor $(I - \alpha\nabla^2_\theta\mathcal{L})$, and whose expensive Hessian was later removed by implicit differentiation of a proximal inner problem. Removing unlimited interaction produced offline reinforcement learning, whose formal content is pessimism, expressed either as a conservative penalty on out-of-support actions or as a single-policy concentrability coefficient that buys a $1/N$ rather than $1/\sqrt{N}$ rate.

On the empirical side, deep reinforcement learning delivered impressive game-playing results at 200 million frames and never became usable on hardware, so between roughly 2021 and 2023 the field switched to large-scale conditional behavior cloning, and the three changes that made that work were action chunking, generative action heads, and pooled cross-embodiment data. Action chunking, predicting $H \approx 50$ future actions from one observation, is the highest-leverage single idea, because it simultaneously suppresses compounding covariate shift and averages out non-Markovian teleoperator noise. Generative action heads matter because the conditional mean of a multimodal demonstration distribution is often not a feasible action, which is exactly why squared-error behavior cloning fails on contact-rich tasks while denoising diffusion and, more recently, conditional flow matching succeed, the latter at roughly ten integration steps against a hundred for diffusion. Pooled data matters because Open X-Embodiment demonstrated measurable positive transfer across 22 embodiments, and because the modern vision-language-action model is a pretrained vision-language backbone with an action expert bolted on, so that web-scale semantic priors arrive for free.

You also know the limits, which are sharper than the field's public presentation. Value-based reinforcement learning remains the one component that does not reliably improve with data and compute, so the frontier systems are supervised learners with reinforcement learning added late if at all. There is no verified scaling law for robot data; the measured exponents that exist are in the range of roughly 0.24 to 0.33 in one study and have not been independently replicated, and the largest robot corpus is about seven orders of magnitude smaller than a frontier language corpus. Real-robot evaluation is statistically underpowered, with an 11-point standard error at twenty trials and a requirement of hundreds of rollouts per arm to resolve differences of the size routinely claimed. Classical statistical learning theory is vacuous for these models, and the modern replacements, norm-based and compression bounds, implicit-bias analyses, and proportional-asymptotic risk curves that a signal-processing reader will recognize as Marchenko-Pastur edge phenomena, explain interpolation but say nothing about a policy whose own errors generate its future inputs. Distribution-free uncertainty quantification via conformal prediction gives a clean finite-sample coverage guarantee $\mathbb{P}(Y \in C(X)) \ge 1 - \alpha$ but assumes exchangeability, which closed-loop robot data violates by construction. And the post-training machinery being imported from language models rests on a verifier, which mathematics and code have and the physical world does not.

Finally you know the shape of the sociology. Berkeley invents algorithms and scales them until they break, Stanford IRIS finds the binding constraint and builds the dataset or benchmark that exposes it, Google DeepMind applies the largest fleet and compute to generalist policies, Physical Intelligence is a vertically integrated bet on a generalist policy plus a deployment data loop, and Columbia with Toyota Research contributed both Diffusion Policy and the evaluation discipline of blind A/B testing. Read chronologically, Chelsea Finn's own record is the best available map: it deletes human specification of what to optimize while progressively elaborating human specification of how data and computation enter the model, and its invariant target across every era, from meta-learning to offline conservatism to group robustness to autonomous data collection, is distribution shift at deployment.

### Checklist: what is worth studying next

- [ ] Read [Levine, Finn, Darrell & Abbeel, "End-to-End Training of Deep Visuomotor Policies"](https://arxiv.org/abs/1504.00702) and [Chi et al., "Diffusion Policy"](https://arxiv.org/abs/2303.04137) back to back, and write down explicitly what changed in the assumptions between 2016 and 2023.
- [ ] Derive the MAML meta-gradient by hand from [Finn, Abbeel & Levine 2017](https://arxiv.org/abs/1703.03400), then derive the implicit version from [Rajeswaran, Finn, Kakade & Levine 2019](https://arxiv.org/abs/1909.04630), and confirm for yourself why the memory cost becomes independent of inner-loop length.
- [ ] Derive DPO from the KL-regularized optimum in [Rafailov et al. 2023](https://arxiv.org/abs/2305.18290), then read [From r to Q*](https://arxiv.org/abs/2404.12358) and state what the token-level Bellman result implies for a chunked robot policy.
- [ ] Read [Kumar, Zhou, Tucker & Levine, CQL](https://arxiv.org/abs/2006.04779) and [Kostrikov, Nair & Levine, IQL](https://arxiv.org/abs/2110.06169), and reproduce one D4RL number to see how brittle the reported comparisons are.
- [ ] Read the $\pi_0$ paper ([Black et al. 2024](https://arxiv.org/abs/2410.24164)) and [real-time chunking](https://arxiv.org/abs/2506.07339), and work out the latency budget $\tau \le H\Delta t$ for a 50 Hz controller yourself.
- [ ] Read [SIMPLER](https://arxiv.org/abs/2405.05941) and [RoboArena](https://arxiv.org/abs/2506.18123), then compute the required sample size to resolve a 10-point success-rate difference at 80% power, and compare it to the trial counts in any three recent VLA papers.
- [ ] Read [Foster, Block & Misra 2024](https://arxiv.org/abs/2407.15007) on the minimax optimality of behavior cloning against [Ross, Gordon & Bagnell, DAgger](https://arxiv.org/abs/1011.0686), and form your own view on whether interaction is necessary.
- [ ] Read [Angelopoulos & Bates on conformal prediction](https://arxiv.org/abs/2107.07511) plus the [Gibbs & Candès adaptive conformal](https://arxiv.org/abs/2106.00170) paper, and identify precisely where exchangeability breaks in a closed-loop robot deployment.
- [ ] Read [V-JEPA 2](https://arxiv.org/abs/2506.09985) and [DreamerV3](https://arxiv.org/abs/2301.04104) and articulate the difference between reconstruction-based and value-equivalent world-model objectives without looking at notes.
- [ ] Clone [LeRobot](https://github.com/huggingface/lerobot) and reproduce one policy on a low-cost SO-101 arm, because the gap between reading this literature and running it is larger than it appears.

### My recommendations

**On what to work on.** If your goal is to be hired into IRIS or REALab and then to found something, the highest-expected-value direction for you specifically is the intersection of statistical rigor and robot evaluation, and I say that because it is the one place where your existing background is a genuine comparative advantage rather than a liability. Everyone entering robot learning in 2026 can fine-tune a VLA; almost nobody entering it can correctly design a sequential test, reason about power, or apply prediction-powered inference to combine cheap simulated evaluations with expensive real ones. The field has an acknowledged, quantified, embarrassing measurement problem, the labs know it, RoboArena and SIMPLER are the first serious attempts at it, and the problem is wide open. It is also unusually tractable for a master's-timescale project, because you can produce a real contribution without owning a robot fleet.

**The second direction I would defend** is closed-loop distribution-shift theory for chunked, asynchronously executed policies. The existing analyses, DAgger's compounding-error bound and the newer minimax results, assume per-timestep action selection and synchronous execution, and the deployed systems violate both: they emit fifty-step chunks, they stitch chunks under 100 to 300 milliseconds of inference latency, and they inpaint the overlap. Nobody has written down the right error-amplification result for that setting, the objects involved are exactly the ones you already handle, and a correct theorem here would immediately inform how $H$, the replan interval, and the latency budget should be chosen rather than tuned. The counterargument is that theory in this area has a poor record of influencing practice, and you should take it seriously: mitigate it by pairing any bound with a measurement on real hardware.

**On the two directions I would be more cautious about than the field is.** Learned verifiers for physical tasks are the obvious import from reinforcement learning with verifiable rewards, and they are genuinely important, but the reason mathematics post-training worked is that the verifier was exact and free, and a learned physical verifier is neither, so you inherit reward hacking and a second distribution-shift problem on top of the first. Latent-action learning from human video is the highest-ceiling data play, since Ego4D-scale corpora carry no actions and inferring them would unlock orders of magnitude more data, but the field has been trying to make human video pay off since domain-adaptive meta-learning in 2018 and the wins remain modest, so treat a strong result there as a research bet rather than a plan.

**On how to position yourself.** Do not write three disconnected course projects. Build one artifact at the intersection of perception, sequential decision-making, and evaluation, and make the evaluation the contribution rather than the afterthought, because that is the part of a project that reads as maturity to a faculty member who has reviewed a hundred VLA papers with twenty-trial comparisons. Concretely, the version of this I would actually build is a statistically valid, cheap evaluation harness for a small number of open policies on a low-cost arm, using a sequential test with proper error control and prediction-powered inference to fuse simulated and real rollouts, and I would report honest confidence intervals wide enough to embarrass the published numbers. That artifact is simultaneously a paper, a lab application, and the seed of a company, because every robotics firm running a deployment data loop needs exactly this and none of them has it.

**On reading the frontier honestly.** Hold the distinction between company self-report and replicated result, because it is doing real work in 2026. The $\pi$-series results after $\pi_0$, the humanoid autonomy figures, and most throughput claims are internal evaluations on internal tasks with no third-party protocol, and the one genuinely independent replication surfaced in this survey is a single small-group study. That does not mean the claims are false, and the underlying technical ideas are strong; it means the error bars are unknown and the incentives are obvious. Treat the arXiv paper as the claim and the replication as the evidence, and you will read this literature better than most people in it.

---

*Provenance note: this review was assembled from primary sources read during preparation, with ten parallel literature passes covering the pre-2015 canon, meta-learning, deep and offline reinforcement learning, the vision-language-action lineage, world models and representation learning, the learning-theory frontier, language-model post-training, Chelsea Finn's publication record, and the evaluation and hardware landscape. Numbers were verified against arXiv abstracts, full texts, or official project pages where possible. Items that could not be verified are marked in place rather than smoothed over, valuation and funding figures are press-sourced and current as of mid-2026, and company self-reports are labeled as such throughout.*

---

