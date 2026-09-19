# IRIS outreach drafts — 18 September 2026

Source: [reports/stanford-labs-map-2026-09-14.md](stanford-labs-map-2026-09-14.md), the person-by-person IRIS/REALab map.

**Already covered by Anshu:** Marcel Torne Villasevil, Bo Ai, Ajay Sridhar, Lars Lien Ankile.

**Drafted here (7):** Yuejiang Liu, Alexander Swerdlow, Perry Dong, Jonathan Yang, Tian Gao, Lucy Xiaoyang Shi, Ji Woong Kim.

**Deliberately skipped (5), with the reason:**

| Person | Why not |
|---|---|
| Moo Jin Kim | Final-year AND has moved off robotics onto LLM post-training for Marin. Read OpenVLA, do not plan around him. |
| Yoonho Lee | LLM-only, no robot. On the 2026-2027 job market, so no relationship is available. |
| Anikait Singh | LLM-only. Final year, currently at Meta Superintelligence Labs. |
| Jubayer Ibn Hamid | Strong RL, zero robotics — he pivoted off robot action chunking to inference compute. First-year and very reachable, so he is the right person to ask *how the conversion path works*, not a research fit. |
| Chelsea Finn herself | Not a PhD student; separate approach, and the lab routes applications through its form. |

> **One practical warning.** IRIS members do **not** publish email addresses, and the lab's contact page explicitly asks that applications go through its form rather than by emailing members directly. None of these can be sent as-is until you have an address from a talk, a mutual, or the form. I have not guessed any addresses — a constructed one is worse than none.

---

## 1. Yuejiang Liu — postdoc, world models / verification

*The single best alignment on the roster (9/10). His research question **is** your thesis. Caveat: incoming Assistant Professor at NUS from 2027, so this is a one-year window — but he is already in your SGSI coaching Team Two, so the relationship is live.*

Hello Yuejiang,

My name is Anshu Arora, and I am an incoming MS student in EE.

In my undergrad at IIT Bombay, I worked on reinforcement learning (proved linear speed up and convergence bounds for clustering in federated reinforcement learning, did a project on adversarial attacks in federated learning), robotics (part of our student autonomous underwater vehicle club- I debugged hardware, coded microcontrollers and even published a paper in the Naval engineers Journal, also did the ML pipeline for an EMG controlled prosthetic arm), and signal processing (power-efficient sampling, published four papers in the same).

Here at Stanford, I want to delve deeper into robotics- and focus my efforts on bridging the gap between research in labs and deployments in the industry. While searching for people working in the same field, I came across your profile.

I resonate with the core claim of World Action Verifier, that checking a prediction is fundamentally cheaper than making one. What struck me is that the decomposition into state plausibility and action reachability is really an estimation argument dressed in robotics clothing- you are exploiting an asymmetry in where the information lives, exactly the way a good estimator exploits structure instead of brute-forcing the full joint distribution. That is the same instinct behind the sampling work I did in undergrad, where the whole game was figuring out what you can get away with not measuring. And if a world model can be trusted to score a policy, that is the thing that lets a company know whether an update helped without paying for thousands of real rollouts, which feels like the actual bottleneck between a lab result and a deployment.

I would really appreciate talking to you more, here is my CV. In my website you can find all other projects I have worked on as well. I love the intersection of robotics and ML, and want to take this passion further and truly dedicate myself to the field. If you have an opportunity for me, please let me know.

Thanks so much for going through this email Yuejiang. I hope to talk to you and learn from you. Please do let me know the next steps, and I am happy to tell you more about my projects and discipline!

Regards,
Anshu Arora

### His research, explained like you are five

Imagine you have a friend who tries to guess what a room will look like after you move the furniture. He is often wrong, and you have no way to tell when.

Yuejiang's idea: instead of making the guess better, teach the friend to **grade his own guesses**. And grading is split into two easy questions instead of one hard one:

1. **Is this picture even a real-looking room?** (state plausibility) — you do not need to know anything about furniture-moving to spot a room where the sofa is floating in mid-air. You can learn that from watching ordinary videos, of which there are millions.
2. **Could you actually get from the old room to this new room by doing that one push?** (action reachability) — a much smaller question, because only a few features of the picture matter.

Both checks are cheap. The guessing is expensive. So the model keeps guessing, grades itself, throws out the bad guesses, and gets better with far less data — 2x more sample-efficient, 22% better downstream.

**Why you care:** if the grader is good enough, you can grade a *robot* without running the robot. That is a surrogate evaluator, and it is the thing your whole startup thesis needs to exist.

---

## 2. Alexander Swerdlow — PhD, RL for expressive policies

*Alignment 9/10. Second-year, advised by Finn alone, no hardware needed at all, and he got into the lab's most crowded thrust as a co-first author rather than a competitor — which is the demonstrated way in. If your constraint is "start something this quarter with no robot access", he is the most frictionless entry point in IRIS.*

Hello Alexander,

My name is Anshu Arora, and I am an incoming MS student in EE.

In my undergrad at IIT Bombay, I worked on reinforcement learning (proved linear speed up and convergence bounds for clustering in federated reinforcement learning, did a project on adversarial attacks in federated learning), robotics (part of our student autonomous underwater vehicle club- I debugged hardware, coded microcontrollers and even published a paper in the Naval engineers Journal, also did the ML pipeline for an EMG controlled prosthetic arm), and signal processing (power-efficient sampling, published four papers in the same).

Here at Stanford, I want to delve deeper into robotics- and focus my efforts on bridging the gap between research in labs and deployments in the industry. While searching for people working in the same field, I came across your profile.

FASTER is the paper on the IRIS site that I felt closest to, almost uncomfortably so. My undergrad research was in power-efficient sampling, which in practice means one question asked over and over: what is the cheapest set of measurements that still gets me the answer? FASTER asks the same question inside the denoising chain- do not finish denoising every candidate and then pick, learn to throw candidates away early, while they are still half-formed. Framing that filtering as its own MDP in denoising space is a lovely move, and it is genuinely signal processing sitting inside reinforcement learning. I also went back and read UniDisc, which made it click what you carried into the lab from CMU. Inference cost is one of the concrete reasons good policies do not survive contact with a real deployment, so this line feels like it matters well beyond the benchmark.

I would really appreciate talking to you more, here is my CV. In my website you can find all other projects I have worked on as well. I love the intersection of robotics and ML, and want to take this passion further and truly dedicate myself to the field. If you have an opportunity for me, please let me know.

Thanks so much for going through this email Alexander. I hope to talk to you and learn from you. Please do let me know the next steps, and I am happy to tell you more about my projects and discipline!

Regards,
Anshu Arora

### His research, explained like you are five

**Diffusion / denoising**, first. Think of a sculptor with a block of static-y noise. Step by step he chips away the noise until a clear shape appears. Modern robot policies decide what to do this way: start from random noise, denoise it about 50 times, and out pops "move the arm here."

**The expensive trick everyone uses:** do this 20 times in parallel to get 20 candidate moves, then pick the best one. Better moves, 20x the cost.

**FASTER's idea:** you do not have to wait until all 20 sculptures are finished to see which ones are going badly. Learn to spot a loser when it is still a blurry lump, and stop chipping at it. Same quality, a fraction of the compute.

**UniDisc** (his earlier CMU work) is the same sculpting idea applied to text and images in one model, so you can "inpaint" a missing sentence the way you inpaint a missing patch of picture.

**Why you care:** this is literally your undergrad question — spend the measurement/compute budget only where it changes the answer.

---

## 3. Perry Dong — PhD, RL for expressive policies

*Technically the best raw match on the roster to your RL background — value learning, critics, off-policy stability, TD variance. But the honest warning from the map: he first-authors 8 of ~11 papers in his own thrust at a cadence an MS student cannot match. Best fit, least room. Write to him to learn, not to carve out a project.*

*Rewritten 19 Sep around **Q-Learning With World Models** ([arXiv 2608.17163](https://arxiv.org/abs/2608.17163)) at Anshu's request, replacing the EXPO hook. Note: I have the title and a one-line characterisation of this paper from [iris-and-robotics-market-2026-09-13.md](iris-and-robotics-market-2026-09-13.md) — "learned critics used for test-time search" — but **not** its abstract. Read the arXiv page before sending, and correct the paragraph if the method differs.*

Hello Perry,

My name is Anshu Arora, and I am an incoming MS student in EE.

In my undergrad at IIT Bombay, I worked on reinforcement learning (proved linear speed up and convergence bounds for clustering in federated reinforcement learning, did a project on adversarial attacks in federated learning), robotics (part of our student autonomous underwater vehicle club- I debugged hardware, coded microcontrollers and even published a paper in the Naval engineers Journal, also did the ML pipeline for an EMG controlled prosthetic arm), and signal processing (power-efficient sampling, published four papers in the same).

Here at Stanford, I want to delve deeper into robotics- and focus my efforts on bridging the gap between research in labs and deployments in the industry. While searching for people working in the same field, I came across your profile.

Q-Learning With World Models is the paper of yours I have spent the most time with, and I think it is pointed at the right thing. The bet it makes is that you can move the expensive part of reinforcement learning off the robot and into the model- learn a critic, then spend compute at test time searching over imagined actions rather than buying that experience in the real world. Coming from undergrad work on convergence and stability in federated reinforcement learning, where I proved a linear speedup for clustered agents, I read the learned critic as an estimator first: what it is really doing is off-policy evaluation, which is a question statistics has been circling for a century under names like importance sampling and doubly robust estimation. What I find genuinely hard about the setup, and interesting for that reason, is that the critic and the model are both learned, so a search is only ever as good as the error in the things it searches over- and quantifying that error is the part I would most want to work on. I read EXPO alongside it, and sidestepping the denoising chain with a light edit policy rather than trying to make the chain robust struck me as the same instinct applied to a different bottleneck.

I would really appreciate talking to you more, here is my CV. In my website you can find all other projects I have worked on as well. I love the intersection of robotics and ML, and want to take this passion further and truly dedicate myself to the field. If you have an opportunity for me, please let me know.

Thanks so much for going through this email Perry. I hope to talk to you and learn from you. Please do let me know the next steps, and I am happy to tell you more about my projects and discipline!

Regards,
Anshu Arora

### His research, explained like you are five

A robot policy has to answer "what do I do next?" Two ways to build it:

- **Simple policy:** basically "aim here, give or take a wobble." Easy to train, but it can only ever express one intention. If there are two good ways to pick up a mug, it averages them and gets a bad third way.
- **Expressive policy (diffusion):** the 50-step noise-sculpting thing. It can represent "either this way or that way," which is much more realistic.

**The problem:** to *improve* a policy with reinforcement learning, you need to push a signal ("that was good, do more of it") backwards through the policy. Through a simple policy, easy. Through 50 sculpting steps, the signal gets mangled — like whispering a message down a line of 50 people.

**EXPO's fix:** don't push the signal through the chain at all. Train the big sculptor to just *copy demonstrations* (which is stable and easy), and bolt on a small, simple "nudge" policy that takes the sculptor's answer and tweaks it toward something better. The small nudger is the only part that has to learn from reward. 2–3x more sample-efficient.

**FASTER** (with Alexander Swerdlow) is the follow-up: kill the bad candidates early instead of finishing them all.

**Q-Learning With World Models — the one you liked.**

Two pieces. A **world model** is a daydream machine: give it the scene and a move, and it predicts what happens next, without touching the robot. A **critic** (the Q in Q-learning) is a scorer: show it a scene and a move, and it says "that move is worth about 7."

Put them together and the robot gets to *think before acting*. It imagines several moves, imagines what each leads to, scores the outcomes, and picks the best — all inside its head, in milliseconds, with no real arm moving. That's "test-time search": you buy performance with thinking instead of with experience.

Why that matters for your gap: real robot experience is the most expensive thing in the field. Every rollout costs a human, a fixture, and wall-clock time, and it can break something. Imagined rollouts cost a GPU-second. So a method that shifts work from the first column to the second is directly a deployment-economics method, not just a benchmark method.

**The catch, and why it is the interesting part:** the daydream machine is *learned*, not a physics engine. It has never been told what gravity is. It is a very good guesser trained on video, and it guesses worst exactly where you have the least data — which is precisely the weird situation where you most needed the search to work. Same for the critic. So the whole approach rests on a question nobody has fully answered: **how wrong is my imagination, and can I tell when?**

That question is the bridge between this paper and Yuejiang Liu's World Action Verifier, and it is where your estimation background actually has something to say.

---

## 4. Jonathan Yang — PhD, data composition / robustness

*Startup relevance 8/10 — one of the most underrated lines in the lab for your purposes. Underneath the robotics vocabulary this is experimental design and variance decomposition, which is the edge you actually have. Timing caveat: admitted 2022, likely finishing 2027.*

Hello Jonathan,

My name is Anshu Arora, and I am an incoming MS student in EE.

In my undergrad at IIT Bombay, I worked on reinforcement learning (proved linear speed up and convergence bounds for clustering in federated reinforcement learning, did a project on adversarial attacks in federated learning), robotics (part of our student autonomous underwater vehicle club- I debugged hardware, coded microcontrollers and even published a paper in the Naval engineers Journal, also did the ML pipeline for an EMG controlled prosthetic arm), and signal processing (power-efficient sampling, published four papers in the same).

Here at Stanford, I want to delve deeper into robotics- and focus my efforts on bridging the gap between research in labs and deployments in the industry. While searching for people working in the same field, I came across your profile.

Data Analogies is the paper I keep coming back to, because it is one of the few I have read that makes a claim specific enough to be wrong. Saying that viewpoint shifts want broad unstructured diversity while morphology shifts want *paired* demonstrations, and then getting 22.5% in the real world by changing nothing but the composition of the dataset, is a result about experimental design rather than architecture- and that is the part of ML I find most underrated. It also rhymes with what I ran into in federated reinforcement learning, where the whole difficulty is heterogeneity across clients, and where the useful question turned out to be which clients to cluster together rather than how much data to pile on. Every robotics company I read about is spending enormous sums collecting data with no theory of what to collect, so a falsifiable answer to that seems worth a great deal more than one more point on a benchmark.

I would really appreciate talking to you more, here is my CV. In my website you can find all other projects I have worked on as well. I love the intersection of robotics and ML, and want to take this passion further and truly dedicate myself to the field. If you have an opportunity for me, please let me know.

Thanks so much for going through this email Jonathan. I hope to talk to you and learn from you. Please do let me know the next steps, and I am happy to tell you more about my projects and discipline!

Regards,
Anshu Arora

### His research, explained like you are five

You want to teach a robot to make a sandwich. You have a budget to record demonstrations. **What should you record?**

Everybody's default answer is "more, and more varied." Jonathan says: it depends on *what kind of difference* you are trying to survive.

- **The camera moved** (a "viewpoint shift"). Here, more variety wins. Record from a hundred random angles and the robot stops caring about angles. Easy.
- **The robot's hand is a different shape** (a "morphology shift" — say a two-finger pincher instead of a soft gripper). Here, piling on random variety **barely helps**. What helps is **paired** recordings: the *same* task, *same* scene, done once by each body. Now the robot can line them up side by side and work out what stays the same — the goal — and what changes — the wiggling.

Those are "data analogies": *this hand does X the way that hand does Y.*

Changing only *which* data goes in the pile — not the model, not the training — gave 22.5% better real-world transfer.

**Why you care:** this is a direct answer to "we have $10M for data collection, what do we buy?" Very few papers answer that.

---

## 5. Tian Gao — PhD, generalist policies & VLAs / multi-robot

*Middling on both scores (5/5) — no hidden gem, no trap. But multi-robot is his own corner inside a crowded thrust, so there is some room, and CHORUS is the paper on the roster that maps most directly onto your federated learning background.*

Hello Tian,

My name is Anshu Arora, and I am an incoming MS student in EE.

In my undergrad at IIT Bombay, I worked on reinforcement learning (proved linear speed up and convergence bounds for clustering in federated reinforcement learning, did a project on adversarial attacks in federated learning), robotics (part of our student autonomous underwater vehicle club- I debugged hardware, coded microcontrollers and even published a paper in the Naval engineers Journal, also did the ML pipeline for an EMG controlled prosthetic arm), and signal processing (power-efficient sampling, published four papers in the same).

Here at Stanford, I want to delve deeper into robotics- and focus my efforts on bridging the gap between research in labs and deployments in the industry. While searching for people working in the same field, I came across your profile.

CHORUS genuinely delighted me. My undergrad research was in federated reinforcement learning, where the entire premise is many agents that cannot see each other's data and must still end up coordinated, and CHORUS is that same structure pushed to its cleanest form- one shared backbone, each robot running its own copy on purely local observations plus a prompt telling it who it is, and no communication at inference at all. That the shared visuomotor prior is enough to make them cooperate, with no explicit alignment step, is a much stronger statement than I expected. It also reminds me of swarm behaviour in nature, where nothing is centrally planned and coordination is a property of shared instincts rather than shared information. Practically, a fleet that does not need a central planner is a fleet with one fewer thing to fail in a warehouse, which is exactly the sort of deployment detail I want to work on.

I would really appreciate talking to you more, here is my CV. In my website you can find all other projects I have worked on as well. I love the intersection of robotics and ML, and want to take this passion further and truly dedicate myself to the field. If you have an opportunity for me, please let me know.

Thanks so much for going through this email Tian. I hope to talk to you and learn from you. Please do let me know the next steps, and I am happy to tell you more about my projects and discipline!

Regards,
Anshu Arora

### His research, explained like you are five

First, what a **VLA** is: a Vision-Language-Action model. It looks at a camera image, reads an instruction in plain English, and outputs motor commands. Eyes, ears, hands, one model.

**CHORUS — three robots carrying a couch.**

The old ways were both bad:
- **One big brain watching everyone.** Works for two robots. For ten, the brain is drowning, and if it dies everyone stops.
- **Each robot gets its own brain.** Now they have to phone each other constantly to stay in sync, and they must be trained together from scratch.

**Tian's version:** give every robot an *identical copy* of the same brain. Each copy sees only its own camera, and is told "you are robot 2 of 3." No phone calls. No central boss.

It works — 90% on three-robot teams, 64 points better than from-scratch decentralised models. The reason it works is that they all learned from the *same* pretrained model, so they have the same instincts, and can each predict what the others will probably do. Like two people carrying a table who never talk but have carried tables before.

**SteerVLA** (his other paper) is about self-driving: a big reasoning model watches a weird situation and *talks to* the driving policy in detailed English ("ease left, the cyclist is drifting") instead of just grabbing the wheel.

---

## 6. Lucy Xiaoyang Shi — PhD, generalist policies & VLAs / world models

*Her work is the most deployment-real on the roster. **Read the caveat before sending:** she has been a researcher at Physical Intelligence since March 2024, as one of its first team members. The map flags a structural conflict — an independent policy evaluator is adversarial to a policy vendor. Sending this to learn from her is fine. Building your evaluation thesis under her is the thing to avoid. Do not mention the startup in the first email.*

Hello Lucy,

My name is Anshu Arora, and I am an incoming MS student in EE.

In my undergrad at IIT Bombay, I worked on reinforcement learning (proved linear speed up and convergence bounds for clustering in federated reinforcement learning, did a project on adversarial attacks in federated learning), robotics (part of our student autonomous underwater vehicle club- I debugged hardware, coded microcontrollers and even published a paper in the Naval engineers Journal, also did the ML pipeline for an EMG controlled prosthetic arm), and signal processing (power-efficient sampling, published four papers in the same).

Here at Stanford, I want to delve deeper into robotics- and focus my efforts on bridging the gap between research in labs and deployments in the industry. While searching for people working in the same field, I came across your profile.

Yell At Your Robot struck me as the most honest paper I have read about how robots actually work outside a lab. Every deployed system I have read about runs at partial autonomy with a human ready to step in, and instead of treating that human as an embarrassment to be engineered away, you treated them as a supervision channel and showed that even "move a bit to the left" can be folded back into the high-level policy. Coming from hardware- I spent a lot of undergrad debugging an autonomous underwater vehicle, where the operator's intuition was frequently the most reliable sensor on the platform- that framing feels correct to me in a way that fully-autonomous framings do not. I read Ctrl-World alongside it, and the result that a world model can rank policies without real rollouts is the one I have thought about most, because knowing whether a change helped, cheaply, seems to be the thing standing between a good policy and a shippable one.

I would really appreciate talking to you more, here is my CV. In my website you can find all other projects I have worked on as well. I love the intersection of robotics and ML, and want to take this passion further and truly dedicate myself to the field. If you have an opportunity for me, please let me know.

Thanks so much for going through this email Lucy. I hope to talk to you and learn from you. Please do let me know the next steps, and I am happy to tell you more about my projects and discipline!

Regards,
Anshu Arora

### Her research, explained like you are five

**Yell At Your Robot.** The robot is making a sandwich. It is about to put the bread on upside down. You just... shout "no, flip it." And it does. And — this is the actual contribution — it *remembers*, so next time it does not need shouting.

The structure that makes this possible is two layers: a **boss** layer that decides "now pick up the bread," and a **hands** layer that knows how to pick up bread. Your shouting corrects the boss, not the hands. Correcting the boss is cheap (it is just words), and the boss is usually the part that was wrong.

Why that is a big deal: real shipped humanoids today run at maybe 60–70% autonomy with a human teleoperator on standby. That human is expensive. Turning their corrections into training data means the robot gets cheaper every day it works.

**Hi Robot** is the grown-up version: handles messy instructions like "make me a vegetarian sandwich" or "I don't like that one" by reasoning about them first, then acting.

**Ctrl-World** is the other half of her work: a robot **dream simulator**. Instead of running a robot 500 times to see if a new version is better, you let it act inside a generated video of the world. It ranked real policies correctly *without any real rollouts* — and training on its dreams improved success by 44.7%.

**Why you care:** Ctrl-World is a working demonstration of the thing your thesis is about. Also note who she works for.

---

## 7. Ji Woong Kim — postdoc, surgical & medical robotics

*Lower research alignment (5/10) — almost no estimation or RL content, and a hard hardware barrier. But he has the single most explicit "I will take students" signal on the entire roster: his page openly solicits graduate students and PhD visitors. This is the cheapest door in the lab for a conversation. Also the one person whose work touches your prosthetics experience.*

Hello Ji Woong,

My name is Anshu Arora, and I am an incoming MS student in EE.

In my undergrad at IIT Bombay, I worked on reinforcement learning (proved linear speed up and convergence bounds for clustering in federated reinforcement learning, did a project on adversarial attacks in federated learning), robotics (part of our student autonomous underwater vehicle club- I debugged hardware, coded microcontrollers and even published a paper in the Naval engineers Journal, also did the ML pipeline for an EMG controlled prosthetic arm), and signal processing (power-efficient sampling, published four papers in the same).

Here at Stanford, I want to delve deeper into robotics- and focus my efforts on bridging the gap between research in labs and deployments in the industry. While searching for people working in the same field, I came across your profile.

SRT-H is the clearest example I have seen of the gap I care about actually being closed. A hundred percent across eight unseen gallbladders is a deployment number rather than a benchmark number, and the reason it is achievable seems to be the corrective layer- the high-level planner issuing instructions in language that fix the low-level policy's mistakes, rather than a single policy that has to be right the first time. I came to robotics through hardware, building an autonomous underwater vehicle and later doing the ML pipeline for an EMG-controlled prosthetic arm, and the prosthetics work is why the medical side of this appeals to me specifically: reading a noisy biological signal and turning it into a safe actuation was the first time I understood that the model is only part of the problem and the deployment constraints are the rest. Ego-Pi interests me for a related reason- human video as the cheapest robot data there is, is a very direct answer to the data bottleneck.

I would really appreciate talking to you more, here is my CV. In my website you can find all other projects I have worked on as well. I love the intersection of robotics and ML, and want to take this passion further and truly dedicate myself to the field. If you have an opportunity for me, please let me know.

Thanks so much for going through this email Ji Woong. I hope to talk to you and learn from you. Please do let me know the next steps, and I am happy to tell you more about my projects and discipline!

Regards,
Anshu Arora

### His research, explained like you are five

**SRT-H — a robot that does a real surgery, by itself.**

Specifically, removing a gallbladder. Not "make an incision" — the *whole procedure*, start to finish, no human touching the controls. 8 out of 8 gallbladders it had never seen. It was on the cover of Science Robotics.

The bit that makes it work is the same two-layer trick as Lucy's robot, but here the top layer is doing something cleverer. The **planner** watches, and thinks in *English*: "now clip the duct." The **hands** layer executes. And when the hands get it slightly wrong, the planner does not panic — it just says something corrective: "you're too far left, come back." So a mistake is recoverable instead of fatal.

That is the real result. Not "it can do surgery" — **"it can be wrong and then fix itself."** Tissue is squishy and every patient is different, so any system that has to be right first time was never going to work.

**Ego-Pi — teaching robots from GoPro footage.**

There is no internet-sized pile of robot data. There *is* an internet-sized pile of humans doing things. So: strap a camera to a person's head, film them working, and train a robot with two five-fingered hands on that. It learned new tasks, and new *combinations* of skills, from human video with no matching robot data.

**Why you care:** he is the one person on this roster publicly asking for students, and the prosthetics line on your CV is a real conversation with him rather than a keyword match.

---

## Suggested order to send

1. **Yuejiang Liu** — best fit, already in your SGSI coaching Team Two, and the NUS clock is ticking.
2. **Alexander Swerdlow** — no hardware, second-year, most likely to say yes to a project this quarter.
3. **Ji Woong Kim** — the only one actively soliciting; cheapest conversation to get.
4. **Jonathan Yang** — highest commercial relevance to your thesis.
5. **Perry Dong** — send it, but expect a conversation rather than a project.
6. **Tian Gao** — genuine fit with your federated background.
7. **Lucy Xiaoyang Shi** — last, and read the PI caveat first.
