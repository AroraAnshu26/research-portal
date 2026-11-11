Object.assign(PAPERS, {
rt2:{n:11, mod:11, thread:"body", year:2023, short:"RT-2 / VLA",
 title:"RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control",
 authors:"Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, et al. (54 authors, Google DeepMind)",
 venue:"arXiv 2307.15818 (July 2023); CoRL 2023",
 url:"https://arxiv.org/abs/2307.15818", pdf:"https://arxiv.org/pdf/2307.15818",
 why:"This is where the LLM recipe and robotics merge. RT-2 takes a pretrained vision-language model and teaches it to output robot actions as tokens, alongside its usual text answers. It defines the vision-language-action (VLA) model and shows which abilities transfer from web data to a robot and which do not.",
 bottleneck:"Robot policies trained only on robot data (RT-1: about 130K demonstrations) generalise poorly to new objects, backgrounds and instructions, because robot data is tiny next to web data. Using an LLM as a high-level planner that calls fixed low-level skills keeps the two systems separate, so web knowledge never reaches the motor commands.",
 contribution:"Represent each action as a short string of integers (discretised end-effector displacement, rotation, gripper and a terminate flag, 256 bins each) and fine-tune large VLMs (PaLI-X at 5B and 55B, PaLM-E at 12B) on robot trajectories <i>together with</i> their original web vision-language data. The same model answers questions about images and emits motor commands.",
 prereq:"Papers 2 and 3. A vision transformer at the level of \"cut the image into patches and treat each patch as a token\". Basic robot vocabulary: end-effector, gripper, control frequency.",
 concepts:["Vision-language model (VLM) as a backbone","Actions as tokens: discretisation into bins","Co-fine-tuning versus fine-tuning only on robot data","Generalisation axes: unseen objects, backgrounds, environments, semantic instructions","Inference latency and control frequency"],
 study:"§3 (the method) with Figure 1 and Figure 3 (how an action becomes a token string). §4.1 Figure 4 and Table 1 (generalisation versus RT-1 and other baselines). §4.2 emergent capabilities (Figure 2): symbol understanding, reasoning, human recognition. §4.3 the size and co-fine-tuning ablations (Figure 6). §4.4 chain-of-thought variant. §5 Limitations.",
 skim:"The Language Table simulation results, the per-category breakdowns, and the detailed hyperparameters.",
 evidence:"About 6,000 evaluation trials. On seen tasks RT-2 matches RT-1; on unseen objects, backgrounds and environments it roughly doubles RT-1's success (about 62% vs 32% averaged over the unseen categories). It follows instructions needing web knowledge that never appeared in robot data (\"move the banana to the sum of two plus one\", \"pick up the extinct animal\"). Co-fine-tuning beats robot-only fine-tuning, and the 55B model beats the 5B.",
 limitation:"It does not learn new motions: physical skills are limited to those in the robot data, and web data only helps decide <i>what</i> to do, not <i>how</i> to move. The 55B model runs at about 1–3 Hz on cloud TPUs, too slow for dynamic or dexterous tasks. Discretised actions are coarse. The approach needs a large proprietary VLM.",
 checkpoint:"Explain exactly how a robot action is turned into tokens, and why co-fine-tuning on web data improves generalisation to new objects but not to new motions. Then name the latency problem and one way later work addressed it.",
 lesson:`<h5>Conceptual primer</h5>
<p>A VLM already maps an image plus a question to text. If the "text" is allowed to be a string of numbers that a robot controller understands, the same model becomes a policy. Nothing in the transformer changes; only the vocabulary and the training data do.</p>
<h5>Actions as tokens</h5>
<div class="eq">Action at time t:  a_t = [ terminate, Δx, Δy, Δz, Δroll, Δpitch, Δyaw, gripper ]
Each continuous dimension → one of 256 uniform bins → an integer 0…255
Output string, e.g.  "1 128 91 241 5 101 127 217"
PaLI-X: integers up to 1000 already have tokens.  PaLM-E: overwrite the 256 least-used tokens.

Training mix:  robot episodes (image, instruction) → action string
             + web VQA / captioning data (image, question) → text
At inference, decoding is constrained to valid action tokens when a robot action is requested.</div>
<h5>What transfers, and what does not</h5>
<p>Web data carries knowledge about <i>which object</i> is meant: a picture of Taylor Swift, the concept "extinct animal" (a toy dinosaur), arithmetic in an instruction. Robot data carries knowledge about <i>how to move</i>. RT-2 combines them, so it can move a new object in a known way, but cannot perform a motion that no demonstration contained.</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>Ask RT-2 to "pick up the object you could use as an improvised hammer" with a rock, a paper cup and a sponge on the table. The VLM half knows a rock is hard and heavy. The robot half knows how to pick up things of roughly that size. The paper reports this kind of success. Now ask it to flip a pancake. No demonstration contains a flick of the wrist, so no amount of web knowledge helps. This split between semantic and motor generalisation is still the central open problem in robot foundation models.</div>
<h5>Connections</h5>
<p><b>Before:</b> CLIP and PaLI-style VLMs; SayCan and PaLM-E (LLMs as planners); RT-1 (a transformer policy trained only on robot data). <b>After:</b> Open X-Embodiment pools data across 22 robot types; OpenVLA (2024) releases an open 7B VLA; π0 (Optional) replaces discrete action tokens with a flow-matching action expert running at up to 50 Hz; π0.5 targets open-world homes; GR00T and others split the model into a slow VLM "System 2" and a fast action "System 1".</p>`,
 evalLens:"Robot results come from a few thousand physical trials on one lab's robots, scenes and objects. Check how \"unseen\" is defined (new object instances or new categories?), whether baselines were re-run on the same robots on the same days, and the number of trials behind each percentage. Real-world evaluation is expensive and noisy, so differences of a few points are rarely meaningful.",
 cc:"The parallel is structural: Claude Code turns a language model into an actor by giving it an action vocabulary (tool calls) and feeding back observations (tool results). RT-2 gives a VLM an action vocabulary of motor commands. Both are 'language model plus action interface'.",
 robot:"Your SO-101 stack and the LeRobot policies on your Jetson image (pi0, pi0.5, GR00T, SmolVLA and others) are descendants of this paper. When you compare them, the RT-2 questions apply: what backbone, what action representation (tokens, flow, diffusion), what control rate, and which generalisation axis was actually tested."},

vjepa2:{n:12, mod:11, thread:"body", year:2025, short:"V-JEPA 2 / world models",
 title:"V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning",
 authors:"Mido Assran, Adrien Bardes, David Fan, Quentin Garrido, Russell Howes, et al. (30 authors, Meta FAIR; Yann LeCun among them)",
 venue:"arXiv 2506.09985 (June 2025)",
 url:"https://arxiv.org/abs/2506.09985", pdf:"https://arxiv.org/pdf/2506.09985",
 why:"This is the JEPA paper for this course. It is the strongest test so far of Yann LeCun's argument that intelligent agents need a world model that predicts in an abstract representation space, not one that generates the next token or the next pixel. It also connects directly to robotics: an action-conditioned version plans arm motions zero-shot in new labs. Reading it beside RT-2 shows you the two competing bets on how robots should use large-scale pretraining.",
 bottleneck:"Generative world models that predict future video frames spend capacity on unpredictable detail (every leaf, every reflection), are expensive to sample, and are slow to plan with. VLA policies like RT-2 learn what to do from demonstrations but do not learn a predictive model of how the world responds to actions, so they cannot plan or check consequences.",
 contribution:"Pretrain a ~1B-parameter video encoder on over a million hours of internet video plus images with a mask-and-predict objective in representation space. Then freeze it and train a 300M-parameter action-conditioned predictor (V-JEPA 2-AC) on under 62 hours of unlabelled robot video from the DROID dataset. To act, search over action sequences whose predicted future embedding is closest to the embedding of a goal image (model-predictive control). It achieves zero-shot reaching, grasping and pick-and-place on Franka arms in two labs not in its training data, with no task-specific reward or training.",
 prereq:"Paper 2 and the ViT bridge in Paper 11. The idea of self-supervised learning. Model-predictive control at the level of \"simulate several candidate action sequences, execute the first step of the best one, repeat\".",
 concepts:["Joint-embedding predictive architecture: predict representations, not pixels or tokens","Masked latent prediction with an EMA target encoder and stop-gradient (to avoid collapse)","Action-conditioned latent world model","Planning as energy minimisation: cross-entropy method over action sequences","Generative versus predictive-representation world models"],
 study:"§1 and Figure 1 (the two-stage plan). §2 (the pretraining objective and the scaling recipe: data, model size, longer training, progressive resolution), with Figure 2. §4 V-JEPA 2-AC: the predictor, the energy function, and the planning procedure. §4.3 Table 2 (zero-shot robot results versus Octo) and the comparison with Cosmos (Table 3). The limitations discussion at the end of §4.",
 skim:"The video question-answering section (§5–6, alignment with an LLM) unless you want the multimodal-LLM connection; detailed benchmark tables for action recognition beyond the headline.",
 evidence:"Strong results on motion understanding (Something-Something v2) and action anticipation (Epic-Kitchens-100) for a self-supervised encoder. On the robots, averaged over 10 trials per task: reach 100%, grasp 65% (cup) and 25% (box), pick-and-place 80% (cup) and 65% (box), against Octo (a behaviour-cloning VLA baseline) at 15% / 0% for grasping and 15% / 10% for pick-and-place. Planning with V-JEPA 2-AC is reported to be much faster per step than with the Cosmos video-generation world model.",
 limitation:"Goals must be given as images, not language. Results are sensitive to camera position, since the model infers the action frame from the image. Planning horizons are short, so long tasks need hand-specified sub-goals. Trials are few (10 per task) and tasks simple compared with what VLA policies attempt. The comparison with Octo is not compute- or data-matched.",
 checkpoint:"Explain the difference between predicting the next token, predicting the next video frame, and predicting the next representation, and why the JEPA authors think the third is the right objective for a world model. Then explain how V-JEPA 2-AC chooses an action given a goal image, and one reason it can fail.",
 lesson:`<h5>Conceptual primer</h5>
<p>LeCun's 2022 position paper argues that LLM-style autoregressive generation is the wrong foundation for agents that act in the physical world: the world is too uncertain to predict in detail, and errors compound. Instead an agent should learn a world model that predicts <i>abstract states</i>, keeping what is predictable (the cup will move with the gripper) and discarding what is not (the exact texture of the table). JEPA is the training method for that.</p>
<h5>The objective</h5>
<div class="eq">Video clip → patches ("tubelets") → mask a large spatio-temporal region
Context encoder E_θ sees only visible patches:      s_x = E_θ(x_visible)
Target encoder E_θ̄ (EMA copy of E_θ) sees the full clip: s_y = E_θ̄(x)
Predictor P_φ predicts target embeddings at masked positions from s_x and mask tokens

Loss = ‖ P_φ(s_x, mask) − sg( s_y[masked] ) ‖₁          sg = stop-gradient
θ̄ ← τ θ̄ + (1−τ) θ                                         slow exponential moving average</div>
<p>Without the stop-gradient and EMA, the easiest solution is to map everything to the same vector (collapse): prediction becomes trivially perfect. LeJEPA (Balestriero & LeCun, Nov 2025) replaces these heuristics with an explicit regulariser that keeps embeddings spread out.</p>
<h5>Planning with the world model</h5>
<div class="eq">Encode current image:  z₀ = E(o_t);   encode goal image:  z_g = E(o_goal)
Predictor rolls forward: ẑ_{k+1} = P_AC(ẑ_k, a_k, proprio_k)
Energy of an action sequence: ℰ(a_{1:H}) = ‖ ẑ_H − z_g ‖₁
Cross-entropy method: sample many sequences, keep the lowest-energy ones, refit, repeat
Execute the first action, observe, re-plan (model-predictive control)</div>
<div class="note think"><span class="eyebrow">Thought experiment</span>Drop a pen. A pixel-predicting model must decide exactly where it lands and how it bounces, which it cannot know, so it blurs or hallucinates. A token-predicting model must describe it in words, losing geometry. A representation-predicting model only has to predict "pen on floor, roughly here", which is both knowable and what a planner needs. That is the JEPA argument in one example. Its weakness: you cannot inspect a representation the way you can watch a predicted video, so it is harder to tell when the model is wrong.</div>
<h5>The 2025–2026 JEPA line (verified on arXiv)</h5>
<ul>
<li>LeJEPA, Nov 2025 — a theoretically grounded JEPA objective without EMA or stop-gradient tricks. <a href="https://arxiv.org/abs/2511.08544" target="_blank" rel="noopener">arXiv 2511.08544</a></li>
<li>VL-JEPA, Dec 2025 — JEPA for vision and language: predict text embeddings instead of generating tokens. <a href="https://arxiv.org/abs/2512.10942" target="_blank" rel="noopener">arXiv 2512.10942</a></li>
<li>What drives success in physical planning with JEPA world models, Dec 2025. <a href="https://arxiv.org/abs/2512.24497" target="_blank" rel="noopener">arXiv 2512.24497</a></li>
<li>V-JEPA 2.1, Mar 2026 — dense features from the same family. <a href="https://arxiv.org/abs/2603.14482" target="_blank" rel="noopener">arXiv 2603.14482</a></li>
<li>Hierarchical planning with latent world models (CoRL 2026) and H-JEPA (Oct 2026) — attack the short-horizon limit with multiple time scales. <a href="https://arxiv.org/abs/2604.03208" target="_blank" rel="noopener">arXiv 2604.03208</a> · <a href="https://arxiv.org/abs/2610.06805" target="_blank" rel="noopener">arXiv 2610.06805</a></li>
</ul>
<p>Institutionally, LeCun co-founded AMI Labs (Paris, with offices in New York, Montreal and Singapore) to pursue world models; secondary press reports a funding round of about $1.03B in March 2026. The company had announced no product as of this curriculum's date.</p>
<h5>Connections</h5>
<p><b>Before:</b> I-JEPA (images, 2023), V-JEPA (video, 2024), LeCun's 2022 position paper; DINO-style self-supervised vision. <b>After:</b> the 2025–2026 papers above; video-generation world models (NVIDIA Cosmos, Genie-style models) as the competing approach; VLA policies that add predictive or world-model objectives. The convergence question for your research: do robots need a policy (RT-2, π0), a world model to plan with (V-JEPA 2-AC), or both?</p>`,
 evalLens:"Ten trials per task is a small sample: 65% versus 80% is within noise. The Octo baseline is trained differently, on different data, at a different scale, so this is a demonstration of feasibility, not a controlled comparison of the two bets. Ask what a matched comparison would require.",
 cc:"Claude Code has no learned world model in this sense: it predicts the consequences of a command implicitly, through the language model, and then checks by running it. Its 'world model' is the real environment, queried cheaply. Robots cannot query reality cheaply, which is exactly why world models matter more there.",
 robot:"This is the most direct robotics paper in the course. Ask: could a latent world model trained on your own robot's video let you specify tasks by goal image, and what would make it fail on an SO-101 with a different camera mount? The paper's camera-sensitivity limitation answers part of that."},

sweagent:{n:15, mod:13, thread:"agent", year:2024, short:"SWE-agent / ACI",
 title:"SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering",
 authors:"John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press",
 venue:"arXiv 2405.15793 (May 2024); NeurIPS 2024",
 url:"https://arxiv.org/abs/2405.15793", pdf:"https://arxiv.org/pdf/2405.15793",
 why:"It shows, with ablations, that the harness around a model (what commands it can run, what it sees after each command, how errors are reported) changes performance as much as a model upgrade. That is the central idea behind Claude Code and every coding agent, and this is the cleanest paper that measures it.",
 bottleneck:"On SWE-bench (real GitHub issues that must be fixed in full repositories, verified by the repository's tests), the best systems in early 2024 resolved under 4%: they retrieved some files and asked a model to write a patch in one shot. Letting a model loose in a plain Linux shell also worked poorly, because shell tools are designed for humans, not language models.",
 contribution:"Design an agent-computer interface (ACI): a small set of commands with LM-friendly output. A file viewer that shows 100 lines with line numbers, search commands that return concise summaries, an edit command that replaces a line range and runs a linter, rejecting edits that introduce syntax errors, and short, informative error messages. With GPT-4 Turbo it resolves 12.5% of SWE-bench, more than three times the previous best.",
 prereq:"Paper 9. Module 13's ReAct bridge (thought–action–observation loops). Knowing what a repository, a diff and a test suite are.",
 concepts:["Agent loop: thought → action → observation","Agent-computer interface design as a variable to optimise","Guardrails at the interface (lint-on-edit)","Context management: collapsing old observations","Cost and step budgets as part of the evaluation"],
 study:"§2 (the ACI principles; read slowly, they generalise beyond code). Figure 1 and Figure 2 (the commands and an example trajectory). §3 Table 1 (main results). §4 Table 3 (ablations of search, viewer window size, editing with and without linting, history handling) and the failure-mode analysis in §5 / Figure 7.",
 skim:"Per-repository results and the HumanEvalFix detail after the headline.",
 evidence:"12.5% resolved on the full SWE-bench test set with GPT-4 Turbo versus 3.8% for the previous best retrieval-based system; 87.7% on HumanEvalFix. Ablations show each interface choice matters: removing the linting guardrail, using a plain shell instead of the custom commands, or changing the file-view window all lower the resolve rate by several points with the same model.",
 limitation:"Absolute numbers belong to a 2024 model generation; SWE-bench has since been largely saturated by stronger models and harnesses, and partly replaced by SWE-bench Verified (500 human-checked tasks, Aug 2024) and newer benchmarks. Each run was capped at a cost budget, so results depend on that budget. SWE-bench repositories are public and widely discussed, so contamination is a growing concern for later models.",
 checkpoint:"Name three interface decisions in SWE-agent, and for each say what failure of the language model it prevents. Then explain why a fair comparison of two coding agents must fix the model, the tools, the step limit and the cost budget.",
 lesson:`<h5>Conceptual primer</h5>
<p>A coding agent is a loop: the model writes a thought and an action, the harness runs the action, and the output is appended to the context. The model never touches the computer; it only sees what the harness shows it. So the harness designer decides what the model can perceive and do, the way a robot designer chooses sensors and actuators.</p>
<h5>The loop</h5>
<div class="eq">context₀ = system prompt + tool docs + issue text
repeat until submit or budget exhausted:
    (thought, action) ~ π_LM( · | context_t )
    observation      = Environment.execute(action)    # sandboxed repo + shell
    context_{t+1}    = context_t ⊕ thought ⊕ action ⊕ format(observation)
evaluate: apply patch, run the repository's hidden tests → resolved ∈ {0,1}</div>
<h5>Four ACI principles from the paper</h5>
<ul><li><b>Simple actions:</b> a few commands with clear documentation beat a large toolbox.</li>
<li><b>Compact, informative feedback:</b> show 100 lines with line numbers, not a whole file; summarise search hits.</li>
<li><b>Guardrails:</b> reject an edit that breaks syntax and say why, so errors do not compound.</li>
<li><b>Manage context:</b> collapse old observations so long sessions stay within the window and focused.</li></ul>
<div class="note think"><span class="eyebrow">Thought experiment</span>Give an agent only <span class="mono">cat</span> and <span class="mono">sed</span>. It cats a 3,000-line file, filling its context with text it will mostly ignore, then writes a sed command with an off-by-one line number. The file is now broken and the next test run produces a confusing traceback far from the edit. SWE-agent's viewer and lint-on-edit remove both failures without changing the model at all. That is the paper's claim, demonstrated by ablation.</div>
<h5>Connections</h5>
<p><b>Before:</b> ReAct (interleaved reasoning and acting), SWE-bench (the benchmark, same group), Codex-style generate-and-test. <b>After:</b> OpenHands and many open agent frameworks; commercial coding agents including Claude Code (research preview Feb 2025, generally available May 2025); the Model Context Protocol (Nov 2024) as a standard way to give an agent new tools; agent environments built at scale (Paper 17).</p>`,
 evalLens:"Agent results are a property of model + harness + budget. A leaderboard row that does not state the scaffold, the step limit, the cost cap and the number of attempts cannot be compared with another row. When a lab reports a new model's SWE-bench score with its own harness, part of the gain may be the harness.",
 cc:"Claude Code is an ACI in exactly this sense, and its public documentation describes the parts: Read (file viewer with line numbers), Edit (exact string replacement that fails if the target is not unique, a guardrail), Grep and Glob (search), Bash, subagents for parallel exploration, CLAUDE.md files as persistent instructions, permission modes, hooks, MCP servers for new tools, and automatic compaction of long conversations.",
 robot:"A robot's action space and observation format are its ACI. Choosing end-effector deltas versus joint positions, the camera viewpoint, the control rate and the safety limits is the same design problem, with the same lesson: the interface can matter as much as the policy."},

gym:{n:17, mod:15, thread:"agent", year:2026, short:"Gym-Anything",
 title:"Gym-Anything: Turn any Software into an Agent Environment",
 authors:"Pranjal Aggarwal, Graham Neubig, Sean Welleck (Carnegie Mellon University)",
 venue:"arXiv 2604.06126 (7 April 2026)",
 url:"https://arxiv.org/abs/2604.06126", pdf:"https://arxiv.org/pdf/2604.06126", extra:[["Project page","https://cmu-l3.github.io/gym-anything"],["Code","https://github.com/cmu-l3/gym-anything"]],
 why:"It shows where the field's bottleneck has moved. Once models and harnesses are good, progress is limited by environments: realistic software with tasks and checkers that give feedback. Gym-Anything has coding agents build and audit those environments, which ties together everything in the course: an LLM (Modules 1–6), post-trained (8–10), acting through a harness (12), producing the feedback that trains and evaluates the next agents (13).",
 bottleneck:"Computer-use benchmarks covered short tasks on a few consumer apps, saying little about the professional software where most economic value lies. Building one realistic environment (install, configure with real data, write tasks, write checkers) took experts days to weeks per application.",
 contribution:"Treat environment creation as an agentic coding task. A creation agent (Claude Opus running in Claude Code) installs and configures each application and saves evidence; an adversarial audit agent checks it against a checklist and sends issues back; a summariser keeps shared notes. Applications are chosen by GDP-weighting occupations. Tasks are proposed and amplified by models, and graded by a checklist-based VLM verifier with an integrity check against shortcuts. Result: 200 applications, about 12K tasks (CUA-World), and a 200-task long-horizon benchmark (CUA-World-Long).",
 prereq:"Papers 9, 15. The vocabulary of RL environments (state, action, reward, episode). Module 15's distinctions below.",
 concepts:["Environment creation versus evaluation versus training signal","Creation agent + adversarial auditor loop","Task generation by propose-and-amplify","Checklist-based VLM verifiers, partial credit, integrity checks","Train/test splits that group similar tasks to prevent leakage"],
 study:"§1 and Figure 1. §2.2 (GDP-grounded software selection: an evaluation design choice worth understanding). §3 and Figure 4 (creation and audit agents). §4 and §4.1 (task generation and verifiers). §5 Table 2 (scale). §7.3 (verifier agreement with humans). §6–7 Tables 3–5 and Figures 6–7 (distillation and test-time feedback). §11 Limitations.",
 skim:"Platform details (QEMU, Android emulators, Slurm backends) in §2.3 and Appendix B; the long list of applications in the appendix.",
 evidence:"The checklist VLM verifier agrees with human judgments on 93.3% of 60 trajectories, versus 81.7% for a direct VLM judgment and 43.3% for programmatic checks. On CUA-World-Long with a 500-step, $5 cap, the best model passes 7.5%; with a 2,000-step uncapped budget GPT-5.4 reaches 27.5%. Distilling about 2,000 successful trajectories from Kimi-K2.5 into a 2B model raises its pass rate on the test split from 1.6% to 4.4%, beating a 4B model, with gains growing log-linearly with data, but little transfer to unseen software. Test-time feedback from a separate VLM reviewer raises Gemini 3 Flash from 11.5% to 14.0% under the same step limit.",
 limitation:"No reinforcement learning is run: the environments are RL-shaped, but the paper shows no RL result. Tasks are model-generated, not real user workloads, and not all were verified solvable end to end. The verifier is a VLM, validated on only 60 trajectories, and the same model family (Gemini 3) wrote most tasks, serves as the default verifier, and is a top-scoring agent, which may favour it. Contamination with frontier models' pretraining is not controlled. Build cost per environment is not reported, and the stated task counts are inconsistent across sections (9,720 + 2,500 split versus 12,103 total).",
 checkpoint:"Using Gym-Anything as the example, define and separate: environment creation, evaluation, trajectory distillation, test-time feedback, and reinforcement learning. For each, say what this paper actually did and with what result. Then explain why GPT-5.4's pass rate changes from 3.0% to 27.5% between two rows of Table 4, and what that implies for comparing models.",
 lesson:`<h5>Conceptual primer</h5>
<p>An environment is anything an agent can act in that returns observations and, ideally, a judgement of success. For code the environment is a repository plus tests. For professional software (an electronic health record system, a CAD tool, a trading platform) someone has to install it, load realistic data, define tasks and write checkers. That work was the bottleneck. This paper asks: can agents do it?</p>
<h5>Five things that are easy to confuse</h5>
<div class="eq">                         What it is                                   In this paper
Environment creation     build software state + tasks + checkers      MAIN CONTRIBUTION: 200 apps, ~12K tasks, audited
Evaluation               measure agents on held-out tasks             MAIN RESULT: CUA-World-Test, CUA-World-Long
Trajectory distillation  SFT a student on a teacher's successful runs MAIN RESULT, small: 2B model 1.6% → 4.4% pass
Test-time feedback       a reviewer critiques, the agent continues    SMALLER EXPERIMENT: 11.5% → 14.0% (Gemini 3 Flash)
Reinforcement learning   update the policy from reward on its own runs NOT DONE. The API returns a reward; no RL result.</div>
<p>Each uses the checker differently. Evaluation uses it once, as a ruler. Distillation uses it to filter which teacher runs to copy (rejection sampling, as in Llama 3 and R1's SFT stages). Test-time feedback uses a critic inside one episode, without changing weights. RL uses the reward to change the policy's weights, which is where verifier errors and reward hacking do the most damage, because the optimiser actively searches for them.</p>
<h5>The verifier</h5>
<div class="eq">For task τ, a VLM writes a weighted checklist {(item_j, w_j)} from ground truth in the setup scripts.
After an episode, the VLM grades each item from screenshots/state: g_j ∈ {0,1}
score = Σ_j w_j g_j / Σ_j w_j          (partial credit)
pass  = [score = 1]
integrity check: if the agent bypassed the intended workflow (e.g. edited files directly) → score = 0</div>
<div class="note think"><span class="eyebrow">Thought experiment: the budget changes the ranking</span>Table 4 shows GPT-5.4 at 3.0% pass under a 500-step, $5 cap, behind Gemini 3 Flash at 7.5%. Remove the cap and allow 2,000 steps: GPT-5.4 reaches 27.5%, Gemini 3 Flash 11.5%. Which model is "better" at long computer tasks? The only correct answer is: under which budget. A model that is cheap per step wins under a cost cap; a model that keeps making progress over very long trajectories wins without one. This is the clearest example in the course of why matched inference and tool budgets must be stated before any comparison.</div>
<h5>What it contributes, in one paragraph</h5>
<p>It turns environment creation from expert labour into a compute-scalable, auditable pipeline; it grounds the choice of software in economic weight rather than convenience; it introduces a long-horizon benchmark on which the best agents still fail most tasks; and it gives early evidence on what the environments are good for (evaluation clearly; distillation modestly and mostly in-distribution; test-time critique a little). It does not show that RL in these environments works. That remains the open next step, and concurrent work (below) is attempting it.</p>
<h5>Connections</h5>
<p><b>Before:</b> SWE-bench and SWE-agent (repositories as environments), OSWorld-style computer-use benchmarks, WebArena; R1's use of verifiable rewards. <b>After (verified, 2026):</b> EnvFactory (May) builds tool-use environments and trains with RL; ScaleCUA (Jul) generates verifiable tasks for online RL of computer-use agents; WildAWM (Oct) builds combined GUI/CLI/tool environments and reports out-of-distribution gains. Each claims the step Gym-Anything leaves open.</p>`,
 evalLens:"This paper is a good exercise in reading evaluation critically: generator–judge–agent overlap (the same model family plays three roles), a small human validation set for the verifier, partial-credit scores that look much higher than pass rates, budget-dependent rankings, and internally inconsistent counts. None invalidates the contribution; all limit how its numbers can be used.",
 cc:"Two links. First, the creation agent is Claude Opus running in Claude Code: an agent harness used to build environments for other agents. Second, environments like these are the kind of thing labs could use to evaluate and train computer-use and coding agents; Anthropic has not published which environments it trains Claude on.",
 robot:"For robots, simulation is the environment, and building realistic sim scenes with tasks and success checks is the same bottleneck. Agent-built simulation environments (scene generation, asset import, reward-code writing) are the robotics analogue of this paper, and the same five distinctions apply when a robotics paper says it 'used simulation'."}
});

MODULES.push(
 {id:8, title:"Post-training", years:"2017–2023", thread:"post",
  intro:"Post-training turns a next-token predictor into an assistant. It is small in compute next to pretraining and large in effect. This module covers supervised fine-tuning, reward models from human comparisons, RL against those rewards, AI feedback, and direct preference optimisation, and the failure that runs through all of them: optimising a proxy.",
  papers:["instruct"],
  bridges:[
   ["Earliest invention","<b>Deep RL from human preferences (Christiano et al., 2017).</b> Learned a reward model from human comparisons of short video clips and used it to train Atari agents and a simulated robot. The method InstructGPT applies to language. <a href=\"https://arxiv.org/abs/1706.03741\" target=\"_blank\" rel=\"noopener\">arXiv 1706.03741</a>"],
   ["Influential demonstration","<b>Learning to summarize from human feedback (Stiennon et al., 2020).</b> The first large RLHF result on language: preferred summaries from a model trained on comparisons. <a href=\"https://arxiv.org/abs/2009.01325\" target=\"_blank\" rel=\"noopener\">arXiv 2009.01325</a>"],
   ["Popularization","<b>ChatGPT (Nov 2022).</b> InstructGPT-style post-training on a chat format, released as a free product. The method was published; the product made it the default way people meet LLMs."],
   ["AI feedback","<b>Constitutional AI (Bai et al., Anthropic, 2022).</b> Replace most human harmlessness labels with the model critiquing and revising its own outputs against a written list of principles, then train a preference model on AI-generated comparisons (RLAIF). Anthropic's published method for Claude. <a href=\"https://arxiv.org/abs/2212.08073\" target=\"_blank\" rel=\"noopener\">arXiv 2212.08073</a>"],
   ["Failure mode","<b>Reward model overoptimization (Gao et al., 2022).</b> Measured how true quality rises then falls as a policy is optimised harder against a fixed reward model, with predictable scaling. <a href=\"https://arxiv.org/abs/2210.10760\" target=\"_blank\" rel=\"noopener\">arXiv 2210.10760</a>"],
   ["Simplification","<b>DPO (Rafailov et al., 2023).</b> RLHF as a classification loss on preference pairs. Listed under Optional; the equation is in Paper 8's lesson."]
  ]},
 {id:9, title:"Coding", years:"2021–2024", thread:"post",
  intro:"Code is where LLMs first became genuinely useful as tools, and the reason is not that code is easy. It is that code can be checked by running it. This module covers training on code, functional correctness, pass@k and sampling, tests as verifiers, the move from single functions to whole repositories, and why contamination is especially acute for code benchmarks.",
  papers:["codex"],
  departure:"Codex (2021) comes after InstructGPT (2022) so that you meet verifiable feedback right after learned feedback and can compare them directly.",
  bridges:[
   ["Search at scale","<b>AlphaCode (Li et al., 2022).</b> Sample up to millions of programs per competitive-programming problem, filter them on the example tests, cluster by behaviour, submit ten. Roughly median human competitor level on Codeforces. Search plus a verifier, pushed hard. <a href=\"https://arxiv.org/abs/2203.07814\" target=\"_blank\" rel=\"noopener\">arXiv 2203.07814</a>"],
   ["Repository level","<b>SWE-bench (Jimenez et al., 2023).</b> 2,294 real GitHub issues from 12 Python repositories; a fix counts only if the repository's own tests pass. Changed code evaluation from writing a function to working in a codebase. <a href=\"https://arxiv.org/abs/2310.06770\" target=\"_blank\" rel=\"noopener\">arXiv 2310.06770</a>"],
   ["Benchmark repair","<b>SWE-bench Verified (OpenAI, Aug 2024).</b> 500 tasks checked by human engineers to be solvable and fairly tested, after many original tasks proved underspecified. OpenAI later published a post on why it stopped evaluating on it. A reminder that benchmarks wear out. <a href=\"https://openai.com/index/introducing-swe-bench-verified/\" target=\"_blank\" rel=\"noopener\">announcement</a>"],
   ["Contamination","<b>LiveCodeBench (Jain et al., 2024).</b> Continuously collects new contest problems and evaluates models only on problems released after their training cutoff. <a href=\"https://arxiv.org/abs/2403.07974\" target=\"_blank\" rel=\"noopener\">arXiv 2403.07974</a>"]
  ]},
 {id:10, title:"Mathematics and reasoning", years:"2022–2025", thread:"post",
  intro:"Reasoning models think at length before answering, and accuracy grows with the number of thinking tokens. This module traces how that went from a prompting trick to a trained behaviour: chain-of-thought, sampling and voting, filtering self-generated solutions, process and outcome verifiers, RL with verifiable rewards, test-time computation, and distillation into small models.",
  papers:["r1"],
  bridges:[
   ["Influential demonstration","<b>Chain-of-thought prompting (Wei et al., 2022).</b> A few worked examples with intermediate steps in the prompt sharply improve multi-step maths in large models, and barely help small ones. <a href=\"https://arxiv.org/abs/2201.11903\" target=\"_blank\" rel=\"noopener\">arXiv 2201.11903</a>"],
   ["Sampling","<b>Self-consistency (Wang et al., 2022).</b> Sample many chains of thought and take the majority answer. The simplest form of test-time compute. <a href=\"https://arxiv.org/abs/2203.11171\" target=\"_blank\" rel=\"noopener\">arXiv 2203.11171</a>"],
   ["Self-training","<b>STaR (Zelikman et al., 2022).</b> Generate rationales, keep those that reach the correct answer, fine-tune on them, repeat. Rejection sampling plus SFT, an ancestor of RLVR. <a href=\"https://arxiv.org/abs/2203.14465\" target=\"_blank\" rel=\"noopener\">arXiv 2203.14465</a>"],
   ["Verifiers","<b>Let's Verify Step by Step (Lightman et al., 2023).</b> A process reward model trained on 800K human step-level labels beats an outcome-only verifier at picking correct maths solutions. R1 later reports PRMs did not help its RL. <a href=\"https://arxiv.org/abs/2305.20050\" target=\"_blank\" rel=\"noopener\">arXiv 2305.20050</a>"],
   ["Proprietary","<b>OpenAI o1 (12 Sep 2024).</b> Publicly disclosed: trained with large-scale RL to produce a hidden chain of thought; accuracy improves with both train-time RL compute and test-time thinking. Not disclosed: data, reward design, algorithm, model size. Anything more specific is inference. <a href=\"https://openai.com/index/learning-to-reason-with-llms/\" target=\"_blank\" rel=\"noopener\">blog post</a>"],
   ["Test-time compute","<b>Scaling test-time compute (Snell et al., 2024).</b> For a fixed budget, adaptively spending inference compute (search against a verifier, sequential revision) can beat a model 14× larger on problems of moderate difficulty. <a href=\"https://arxiv.org/abs/2408.03314\" target=\"_blank\" rel=\"noopener\">arXiv 2408.03314</a>"]
  ]},
 {id:11, title:"Science, multimodality and embodiment", years:"2021–2026", thread:"body",
  intro:"Here the course widens from text to images, video and the physical world, which is where your robotics work sits. Two essential papers represent the two current bets: RT-2 makes a vision-language model into a robot policy; V-JEPA 2 learns a world model in representation space and plans with it. The science bridges distinguish general LLMs used for scientific reasoning from specialised scientific models.",
  papers:["rt2","vjepa2"],
  departure:"Science gets bridges only, so that the essential readings in this module can serve your robotics goal. If you later work on AI for science, Minerva and AlphaFold 2 below are the first two to read.",
  bridges:[
   ["Vision–language","<b>CLIP (Radford et al., 2021).</b> Train an image encoder and a text encoder so matching pairs have similar embeddings, on 400M image–caption pairs. The basis of most VLM vision towers and of open-vocabulary robot perception. <a href=\"https://arxiv.org/abs/2103.00020\" target=\"_blank\" rel=\"noopener\">arXiv 2103.00020</a>"],
   ["Embodied LLM","<b>PaLM-E (Driess et al., 2023).</b> Inject image and robot-state embeddings into an LLM's token stream; one model for VQA and robot planning. RT-2's direct predecessor. <a href=\"https://arxiv.org/abs/2303.03378\" target=\"_blank\" rel=\"noopener\">arXiv 2303.03378</a>"],
   ["Robot data","<b>RT-1 (2022) and Open X-Embodiment (2023).</b> A transformer policy trained on 130K real demonstrations; then a pooled dataset from 22 robot types across many labs. <a href=\"https://arxiv.org/abs/2212.06817\" target=\"_blank\" rel=\"noopener\">arXiv 2212.06817</a> · <a href=\"https://arxiv.org/abs/2310.08864\" target=\"_blank\" rel=\"noopener\">arXiv 2310.08864</a>"],
   ["Open VLAs","<b>OpenVLA (Kim et al., 2024)</b> and <b>π0.5 (Physical Intelligence, 2025).</b> An open 7B VLA in the RT-2 style; and a flow-matching VLA co-trained on heterogeneous data for long tasks in unseen homes. π0 itself is in Optional. <a href=\"https://arxiv.org/abs/2406.09246\" target=\"_blank\" rel=\"noopener\">arXiv 2406.09246</a> · <a href=\"https://arxiv.org/abs/2504.16054\" target=\"_blank\" rel=\"noopener\">arXiv 2504.16054</a>"],
   ["JEPA origin","<b>LeCun, A Path Towards Autonomous Machine Intelligence (2022)</b>, then <b>I-JEPA (2023)</b> and <b>V-JEPA (2024).</b> The position paper and the first image and video JEPAs. Read the position paper's world-model and JEPA sections if V-JEPA 2 convinces you. <a href=\"https://openreview.net/forum?id=BZ5a1r-kVsf\" target=\"_blank\" rel=\"noopener\">OpenReview</a> · <a href=\"https://arxiv.org/abs/2301.08243\" target=\"_blank\" rel=\"noopener\">arXiv 2301.08243</a> · <a href=\"https://arxiv.org/abs/2404.08471\" target=\"_blank\" rel=\"noopener\">arXiv 2404.08471</a>"],
   ["General LLM, science","<b>Minerva (Lewkowycz et al., 2022).</b> A general LLM further trained on maths and science papers with LaTeX preserved; large gains on quantitative reasoning. Shows that technical data, not a new architecture, drives scientific ability in general models. <a href=\"https://arxiv.org/abs/2206.14858\" target=\"_blank\" rel=\"noopener\">arXiv 2206.14858</a>"],
   ["Specialised model","<b>AlphaFold 2 (Jumper et al., Nature 2021).</b> Not an LLM: an architecture built for protein structure, trained on structural data, with domain-specific inductive biases. The contrast with Minerva is the point: specialised scientific models solve one problem far better; general LLMs reason across many. <a href=\"https://www.nature.com/articles/s41586-021-03819-2\" target=\"_blank\" rel=\"noopener\">Nature</a>"],
   ["Tool-assisted research","<b>Co-Scientist (Gottweis et al., Google, 2025).</b> A multi-agent system built on a general LLM that generates, debates and ranks research hypotheses, with some laboratory validation. An agent harness applied to discovery; read claims of novelty with care. <a href=\"https://arxiv.org/abs/2502.18864\" target=\"_blank\" rel=\"noopener\">arXiv 2502.18864</a>"]
  ]},
 {id:13, title:"Tools and agents", years:"2022–2026", thread:"agent",
  intro:"An agent is a model in a loop that acts, observes and decides what to do next. This module covers tool calling, action–observation loops, context management, planning, verification and recovery, and the product harness around a model. Claude Code is the running example, with what is publicly documented kept separate from what is inferred. Module 14 then opens the harness up: memory, skills, hooks, and the same design on robots.",
  papers:["sweagent"],
  body:`<h5>Anatomy of Claude Code: what is public, inferred and unknown</h5>
<div class="eq">PUBLIC (Anthropic announcements and Claude Code documentation)
  Released as a research preview 24 Feb 2025; generally available 22 May 2025.
  A terminal and desktop agent: the model runs a loop of tool calls on your machine.
  Tools: Read, Write, Edit (exact-match replacement), Grep, Glob, Bash, web fetch/search,
         subagents (Task) for parallel or isolated work, plan mode, to-do lists.
  Context: CLAUDE.md memory files loaded each session; automatic compaction when long;
           prompt caching in the API for stable prefixes.
  Control: permission modes; hooks that run on events; MCP servers add tools (MCP: 25 Nov 2024).
  Retrieval: agentic search with tools rather than a vector index (lead engineer, Feb 2025).

INFERRED (reasonable, not confirmed in detail)
  The underlying models are trained specifically for agentic coding, likely including RL in
  coding environments with test-based rewards, because Anthropic markets them for this and the
  field's published methods (Papers 9, 10, 15, 17) point that way.

UNKNOWN
  Model sizes and architecture details, pretraining data mix, RL environments and reward design,
  how harness and model were co-designed, internal evaluation suites.</div>
<p>Notice how the harness implements the ideas in this course: Read with line numbers and Edit with an exact-match guardrail are SWE-agent's ACI principles; compaction and subagents are context management (Modules 6–7); running tests is Codex's verifier; the permission system is the safety layer around an agent that can change real files.</p>
<div class="note think"><span class="eyebrow">Thought experiment: recovery</span>An agent edits a file, runs the tests, and three unrelated tests fail. A weak agent edits the tests to pass (reward hacking, inside a single episode). A good agent reads the failures, notices they started after its edit, reverts, and tries a narrower change. What made the difference? Partly the model, partly whether the harness shows a clean diff and test output, and partly whether the instructions say the tests are not to be modified. Gym-Anything's integrity check (Paper 17) exists to catch the first behaviour.</div>`,
  bridges:[
   ["Agent loop","<b>ReAct (Yao et al., 2022).</b> Interleave a reasoning trace with actions (search, lookup) and observations. The thought–action–observation pattern almost every agent uses. Listed under Optional."],
   ["Tool use","<b>Toolformer (Schick et al., 2023).</b> A model teaches itself when to call APIs (calculator, search, translation) by keeping only the calls that lower its loss on the following text. An early self-supervised route to tool calling. <a href=\"https://arxiv.org/abs/2302.04761\" target=\"_blank\" rel=\"noopener\">arXiv 2302.04761</a>"],
   ["Recovery","<b>Reflexion (Shinn et al., 2023).</b> After a failed attempt the agent writes a verbal reflection that is kept in memory for the next attempt: learning across episodes without weight updates. <a href=\"https://arxiv.org/abs/2303.11366\" target=\"_blank\" rel=\"noopener\">arXiv 2303.11366</a>"],
   ["Protocol","<b>Model Context Protocol (Anthropic, 25 Nov 2024).</b> An open standard for connecting models to tools and data sources, so any compliant client can use any compliant server. <a href=\"https://www.anthropic.com/news/model-context-protocol\" target=\"_blank\" rel=\"noopener\">announcement</a>"],
   ["Open platform","<b>OpenHands (Wang et al., 2024).</b> An open-source platform for coding and general agents; useful for seeing a full harness in code. <a href=\"https://arxiv.org/abs/2407.16741\" target=\"_blank\" rel=\"noopener\">arXiv 2407.16741</a>"],
   ["Product","<b>Claude Code (Anthropic).</b> Research preview with Claude 3.7 Sonnet, 24 Feb 2025; generally available with Claude 4, 22 May 2025. <a href=\"https://www.anthropic.com/news/claude-3-7-sonnet\" target=\"_blank\" rel=\"noopener\">preview</a> · <a href=\"https://www.anthropic.com/news/claude-4\" target=\"_blank\" rel=\"noopener\">GA</a> · <a href=\"https://news.ycombinator.com/item?id=43164253\" target=\"_blank\" rel=\"noopener\">agentic search comment</a>"]
  ]},
 {id:15, title:"Agent environments and frontier synthesis", years:"2024–2026", thread:"agent",
  intro:"The last module asks where capability now comes from. Once a capable model sits in a good harness, progress depends on environments that produce feedback: tasks, checkers and trajectories. Gym-Anything is the reading. The synthesis below then pulls the whole course together into an explanation of why modern models differ, and how the same pieces are converging in robotics.",
  papers:["gym"],
  body:`<h5>What explains differences between modern models</h5>
<p>When two frontier models differ on a task, the difference usually comes from some mix of the following. Public reports rarely let you separate them, so treat any single-cause explanation with suspicion.</p>
<ul>
<li><b>Pretraining:</b> compute, data quantity and above all data mix and quality (Papers 3, 4, 6). Hardest to observe; often the largest factor.</li>
<li><b>Architecture and efficiency:</b> dense versus MoE, attention variants, context length (Papers 5, 6, DeepSeek-V3). Mostly changes cost per unit of quality.</li>
<li><b>Post-training:</b> which preferences, which verifiable tasks, which environments and how much RL (Papers 8, 10, 17). Increasingly the source of agentic and reasoning differences.</li>
<li><b>Inference budget:</b> thinking tokens, samples, steps and wall-clock allowed. Gym-Anything's Table 4 shows a ranking reversing when the budget changes.</li>
<li><b>Harness and tools:</b> the same model in different scaffolds can differ by many points (Paper 15).</li>
<li><b>Evaluation conditions:</b> contamination, prompt format, grader choice, number of attempts, partial versus full credit.</li>
</ul>
<p>So a fair claim has the form: <i>on task T, with tools U, budget B and cost C, model X scored S under grader G, measured by whom.</i> "X is better than Y" without those terms is not a scientific statement.</p>
<h5>The convergence, for robotics</h5>
<div class="eq">                LLM / coding agent                         Robot
Pretrain        next token on web text + code                 VLM backbone on web images+text; video world models (JEPA)
Adapt           SFT on demonstrations                         behaviour cloning on teleop / human-video / glove data
Feedback        preferences, tests, verifiers                 success detectors, sim rewards, human preference
Improve         RLVR, rejection sampling, distillation        RL in sim, RL fine-tuning on real robots, distillation
Act             tool calls in a harness (ACI)                 action tokens / flow / diffusion at 10–50 Hz
Environments    repos, software (Gym-Anything)                simulators, digital twins, real-world fleets
Bottleneck now  environments + verifiers                      data + verifiers + latency</div>
<p>The two columns use the same mathematics and increasingly the same backbones. What differs is the cost of feedback: a unit test runs in milliseconds; a real grasp takes seconds, needs hardware and can break things. Most open problems in robot learning are about making that right-hand column cheaper, which is why world models, simulation and learned verifiers sit at the frontier.</p>`,
  bridges:[
   ["Concurrent, 2026","<b>EnvFactory (May 2026).</b> Builds executable tool-use environments from real resources and trains agents in them with RL. <a href=\"https://arxiv.org/abs/2605.18703\" target=\"_blank\" rel=\"noopener\">arXiv 2605.18703</a>"],
   ["Concurrent, 2026","<b>Fara-1.5 (Jun 2026).</b> Live and synthetic websites with trajectory verifiers; releases small open browser agents. <a href=\"https://arxiv.org/abs/2606.20785\" target=\"_blank\" rel=\"noopener\">arXiv 2606.20785</a>"],
   ["Concurrent, 2026","<b>ScaleCUA (Jul 2026).</b> Generates verifiable tasks for online RL of computer-use agents. <a href=\"https://arxiv.org/abs/2607.11185\" target=\"_blank\" rel=\"noopener\">arXiv 2607.11185</a>"],
   ["Concurrent, 2026","<b>WildAWM (Oct 2026).</b> Combined GUI, CLI and tool environments; agents trained only in them improve on out-of-distribution benchmarks. <a href=\"https://arxiv.org/abs/2610.26828\" target=\"_blank\" rel=\"noopener\">arXiv 2610.26828</a>"]
  ]}
);
MODULES.sort((a,b)=>a.id-b.id);

const OPTIONAL = [
 {title:"Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (T5)", who:"Raffel et al.", when:"Oct 2019", mod:3, url:"https://arxiv.org/abs/1910.10683",
  why:"Read it if you want controlled evidence on encoder–decoder versus decoder-only, and on pretraining objectives, data filtering (it introduces the C4 corpus) and transfer. Its §3 is a systematic ablation study that no later paper repeats at this breadth."},
 {title:"ReAct: Synergizing Reasoning and Acting in Language Models", who:"Yao et al.", when:"Oct 2022 · ICLR 2023", mod:13, url:"https://arxiv.org/abs/2210.03629",
  why:"Read it for the origin of the thought–action–observation loop used by SWE-agent and Claude Code. It is short, and its error analysis shows why reasoning without acting hallucinates and acting without reasoning wanders."},
 {title:"Direct Preference Optimization: Your Language Model is Secretly a Reward Model", who:"Rafailov et al.", when:"May 2023", mod:8, url:"https://arxiv.org/abs/2305.18290",
  why:"Read it if the RLHF objective in Paper 8 felt opaque. Its derivation of the closed-form optimal policy is the best two pages in this field for understanding what the KL-regularised objective actually wants, and DPO is what Llama 3 uses."},
 {title:"DeepSeek-V3 Technical Report", who:"DeepSeek-AI", when:"Dec 2024", mod:6, url:"https://arxiv.org/abs/2412.19437",
  why:"Read it as the counterpoint to Llama 3: a mixture-of-experts model (671B total, 37B active per token), multi-head latent attention to shrink the KV cache, FP8 training, multi-token prediction, and a detailed account of training at low cost. It is also the base model R1 was trained from."},
 {title:"Lost in the Middle: How Language Models Use Long Contexts", who:"Liu et al.", when:"Jul 2023 · TACL", mod:7, url:"https://arxiv.org/abs/2307.03172",
  why:"Read it before trusting any claim about long context. A short paper with a simple, reproducible experiment: move the relevant document through the context and watch accuracy form a U-shape. It explains why harnesses curate context instead of filling it."},
 {title:"π0: A Vision-Language-Action Flow Model for General Robot Control", who:"Black et al. (Physical Intelligence)", when:"Oct 2024 · RSS 2025", mod:11, url:"https://arxiv.org/abs/2410.24164",
  why:"Read it right after RT-2, because it fixes RT-2's two biggest problems: discrete action tokens and low control rate. A VLM backbone plus a flow-matching action expert produces continuous action chunks at up to 50 Hz for dexterous tasks like laundry folding. It is in your LeRobot stack."}
];

const METHOD = [
 ["Place it (10 min)","Read the abstract, introduction and first figure. Write one sentence each: the bottleneck before this paper, the claimed contribution, and what it builds on. Check the date against the course timeline."],
 ["Predict (5 min)","Before reading the method, write how you would have solved the bottleneck. This makes the paper's actual choices visible instead of obvious."],
 ["Mechanism (main effort)","Read the method section with the lesson's equations open. For every equation, say in words what each symbol is and what the equation is for. Trace one concrete example through it: a token, a batch, a trajectory."],
 ["Compute it","Do one back-of-the-envelope estimate: FLOPs (6ND), memory (bytes per parameter, KV cache), tokens, or dollars. If your number disagrees with the paper's, find out why."],
 ["Interrogate the evidence","For each main claim, find the table or figure that supports it. Check baselines, ablations, sample sizes, budgets and contamination using the questions below."],
 ["Find the limit","Write the one thing this paper cannot show, and find which later paper in this course addressed it. The lesson's Connections section is the answer key."],
 ["Explain it","Answer the checkpoint in writing, in your own words, and press \"Grade my answer\". Then ask the tutor one question you still cannot answer. Mark the paper done only after this step."]
];

const EVALQ = [
 "<b>Contamination:</b> could the test data, or a paraphrase of it, have been in training? How did the authors check, and what does the check miss?",
 "<b>Generalisation:</b> is the test distribution actually different from training (new objects, new repositories, new software), or only new examples of the same thing?",
 "<b>Ablations:</b> is there a row where only the claimed component was removed, with everything else fixed?",
 "<b>Reward hacking:</b> if anything was optimised against a reward or a judge, could the optimiser have found a shortcut? Was it checked?",
 "<b>Verifier errors:</b> how often is the grader wrong, measured against what, on how many examples?",
 "<b>Matched budgets:</b> same number of samples, thinking tokens, steps, tools and dollars for every system compared?",
 "<b>Who measured:</b> self-reported, or independently reproduced? Same harness for every model?"
];
