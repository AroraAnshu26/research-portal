Object.assign(PAPERS, {
llama3:{n:6, mod:6, thread:"sys", year:2024, short:"Llama 3 report",
 title:"The Llama 3 Herd of Models",
 authors:"Aaron Grattafiori, Abhimanyu Dubey, Abhinav Jauhri, et al. (Llama Team, AI @ Meta; 561 authors)",
 venue:"arXiv 2407.21783 (July 2024; v3 November 2024)",
 url:"https://arxiv.org/abs/2407.21783", pdf:"https://arxiv.org/pdf/2407.21783",
 why:"This is the course's complete foundation-model technical report. In one document it covers data curation, scaling-law planning, 4D parallelism on 16K GPUs, training failures, long-context extension, post-training with SFT, rejection sampling and DPO, safety, FP8 inference, and compositional vision and speech adapters. Read it as a map of how every earlier module fits into one production run.",
 bottleneck:"By 2024 the best models were closed, and their reports omitted data, compute and recipe. The research community could not study how the pieces interact at frontier scale.",
 contribution:"A detailed public account of training dense models at 8B, 70B and 405B parameters on about 15T tokens with a 128K context, competitive with the leading closed models of the time on many benchmarks, with weights released. The report argues for simple choices (a dense transformer rather than MoE, DPO rather than PPO) made at very large scale.",
 prereq:"Papers 2–5. Module 4's parallelism bridges. A first look at Module 8 helps for §4.",
 concepts:["Data pipeline: extraction, URL/document dedup, MinHash, heuristic and model-based quality filters, domain classification","Data mix chosen by scaling experiments; annealing on high-quality data at the end","4D parallelism: tensor, context, pipeline, data (FSDP)","Training reliability: failures, checkpointing, stragglers","Post-training loop: reward model → rejection sampling → SFT → DPO, iterated"],
 study:"§3.1 Pre-training data (the whole subsection). §3.2.1 Scaling laws, including how they predict downstream benchmark accuracy, not only loss (Figure 4). §3.3 Infrastructure, Figure 5 (4D parallelism) and Table 5 (root causes of interruptions). §3.4 Training recipe (long-context extension, annealing). §4.1–4.2 Post-training overview and data. §5.1 key results tables and the contamination analysis (§5.1.4).",
 skim:"Most per-benchmark tables in §5; the safety section §5.4 unless it is your interest; §7–8 on vision and speech (return to these in Module 11).",
 evidence:"The flagship 405B model is reported as comparable to leading closed models of mid-2024 on many standard benchmarks, with human evaluations reported separately. The report states that the main run used up to 16K H100 GPUs, and that over a 54-day snapshot there were 466 job interruptions, most of them unexpected and caused largely by hardware. Ablations justify data-mix and annealing choices at smaller scale.",
 limitation:"The training data itself is not released and the sources are described only at a high level, so the data pipeline cannot be reproduced. Many design decisions are justified at small scale and then assumed to hold at large scale. Benchmark comparisons with closed models use those models' reported or API numbers under conditions Meta did not control.",
 checkpoint:"Draw the full pipeline from raw web pages to a deployed chat model, naming one decision Meta made at each stage and the evidence they gave for it. Then explain what 4D parallelism splits along each of its four dimensions.",
 lesson:`<h5>Conceptual primer</h5>
<p>Read this report as an engineering document. The research question is not "what is a new idea?" but "which known ideas, combined how, at what scale, give the best model for a fixed budget?" Its answers are often deliberately conservative.</p>
<h5>The pipeline, stage by stage</h5>
<div class="eq">Raw web  →  HTML extraction (custom parser)  →  PII and safety filters
         →  dedup: URL-level, document-level (MinHash), line-level
         →  heuristic filters (repetition, "dirty word" counts, KL vs token distribution)
         →  model-based quality classifiers (fastText, RoBERTa-style trained on Llama 2 labels)
         →  code and reasoning extraction, multilingual routing
         →  mix: roughly 50% general knowledge, 25% math & reasoning, 17% code, 8% multilingual
Pretrain 405B on ~15.6T tokens, 8K context  →  long-context continued training up to 128K
         →  annealing: last ~40M tokens on high-quality data, LR to zero
Post-train: reward model → sample many responses → rejection sampling → SFT → DPO   (×6 rounds)
Inference: FP8 (row-wise) quantization of feed-forward weights for the 405B model</div>
<h5>Compute check</h5>
<div class="eq">6 · N · D = 6 × 405×10⁹ × 15.6×10¹² ≈ 3.8 × 10²⁵ FLOPs</div>
<p>This is the figure the report gives, about 120× GPT-3. The 405B size was chosen as roughly compute-optimal for that budget using the paper's own scaling-law fits. The 8B and 70B models are trained far past Chinchilla-optimal because they are meant to be cheap to serve.</p>
<h5>4D parallelism</h5>
<ul><li><b>Tensor (TP):</b> split each weight matrix across 8 GPUs in a node; requires fast NVLink.</li>
<li><b>Context (CP):</b> split the sequence across GPUs for very long contexts; attention needs to exchange keys and values.</li>
<li><b>Pipeline (PP):</b> put different layers on different nodes; micro-batches flow through like an assembly line.</li>
<li><b>Data (DP, with FSDP sharding):</b> replicate the above over many groups that see different data; average gradients.</li></ul>
<div class="note think"><span class="eyebrow">Thought experiment</span>A run on 16,000 GPUs where each GPU has a small chance of failing on any given day will be interrupted constantly. Llama 3 reports 466 interruptions in 54 days, about 8 a day. If restarting costs 30 minutes, reliability engineering is worth more than most architecture tweaks. This is why the infrastructure section is as long as the modelling section.</div>
<h5>Connections</h5>
<p><b>Before:</b> GPT-3's data recipe, Chinchilla's budgeting, FlashAttention and GQA. <b>After:</b> DeepSeek-V3 (Optional) makes the opposite choice on architecture (MoE, FP8 training); Module 8 explains the DPO step; Module 11 returns to the vision adapters.</p>`,
 evalLens:"The report runs its own contamination analysis and notes that it is hard to estimate. It also reports pre-trained and post-trained results separately, which makes clear how much each stage contributes. Note which comparisons use the competitor's own reported number.",
 cc:"The same stages exist for Claude, but Anthropic has published far less about them. The public facts: Claude models are pretrained on a large text and code corpus and then post-trained with human and AI feedback (Constitutional AI is Anthropic's published method). The data mix, scale and RL environments are not public.",
 robot:"Robot foundation models are now repeating this playbook: a vision-language backbone pretrained on web data, robot-specific continued training, then post-training. NVIDIA, Physical Intelligence and others publish reports in this style. The missing piece is the data pipeline: there is no robot equivalent of filtering 15T tokens."},

rag:{n:7, mod:7, thread:"data", year:2020, short:"RAG",
 title:"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
 authors:"Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, et al. (12 authors)",
 venue:"arXiv 2005.11401 (May 2020); NeurIPS 2020",
 url:"https://arxiv.org/abs/2005.11401", pdf:"https://arxiv.org/pdf/2005.11401",
 why:"It is the cleanest formulation of a model with two memories: parametric (the weights) and non-parametric (an index you can search and edit). It names the pattern used in most production assistants and gives you a probabilistic way to think about combining a retriever with a generator.",
 bottleneck:"Knowledge stored in weights cannot be inspected, cited or updated without retraining, and models hallucinate facts they half-remember. Earlier retrieval-augmented systems were mostly extractive (copying an answer span) or limited to specific tasks.",
 contribution:"A general fine-tuning recipe: a dense retriever (DPR) fetches the top-k Wikipedia passages for an input, and a seq2seq generator (BART) conditions on each. The retrieved document is treated as a latent variable and marginalised out, so retriever and generator are trained end to end from input–output pairs alone, with no labels saying which document was relevant.",
 prereq:"Paper 2 (encoder–decoder). The idea of an embedding and a dot-product similarity. Module 7's DPR bridge.",
 concepts:["Bi-encoder dense retrieval and maximum inner product search","Treating the retrieved document as a latent variable","RAG-Sequence vs RAG-Token marginalisation","Index hot-swapping as a way to update knowledge","Retrieve-then-rerank pipelines (bridge)"],
 study:"§2 Methods with Equations (1) and (2), until you can explain the difference between the two variants in one sentence. Figure 1. §4 Tables 1–2 (open-domain QA, generation). §4.5 index hot-swapping and the retrieval ablations (frozen vs learned retriever).",
 skim:"FEVER details, the human evaluation protocol, and the appendix decoding details.",
 evidence:"State-of-the-art results at the time on several open-domain QA benchmarks (Natural Questions, TriviaQA, WebQuestions, CuratedTrec), outperforming both parametric-only seq2seq models and task-specific retrieve-and-extract systems. Human raters found RAG's generations more factual and specific than BART's. Replacing the 2016 Wikipedia index with a 2018 one updates answers about world leaders without retraining.",
 limitation:"The document encoder and index stay fixed during training (only the query encoder and generator are updated), retrieval quality caps answer quality, and the system has no way to decide that it should not retrieve or that retrieved text is wrong. With long-context models, the trade-off between retrieving a few passages and reading a whole corpus in context becomes an empirical question, and Lost in the Middle (Optional) shows long contexts are not used uniformly.",
 checkpoint:"Write the RAG-Sequence probability formula and explain each term. Then explain how the retriever can improve during training even though no one tells it which documents were relevant.",
 lesson:`<h5>Conceptual primer</h5>
<p>Think of a student who may bring a library into the exam. They still need to know enough to search well and to use what they find. RAG makes the "search" step part of the model and lets gradients from the final answer teach the search.</p>
<h5>The mathematics</h5>
<div class="eq">Retriever:   p_η(z | x) ∝ exp( d(z)ᵀ q(x) )        d, q: BERT encoders → 768-d vectors
Top-k:       Z = top-k_z p_η(z|x)                     via approximate nearest-neighbour search (FAISS), 21M passages

RAG-Sequence: p(y|x) ≈ Σ_{z∈Z} p_η(z|x) · Π_i p_θ(y_i | x, z, y_{<i})
              one document conditions the whole answer; mix answers at the end
RAG-Token:    p(y|x) ≈ Π_i Σ_{z∈Z} p_η(z|x) · p_θ(y_i | x, z, y_{<i})
              may switch documents token by token

Train: minimise − log p(y|x).  ∂/∂η flows through p_η(z|x): documents that make y likely gain weight.</div>
<h5>Why the retriever learns without document labels</h5>
<p>If a retrieved passage makes the correct answer more probable, increasing its retrieval score increases p(y|x), so the gradient pushes the query encoder toward it. Useless passages get pushed down. It is the same trick as training a mixture model: credit assignment through a latent variable.</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>Ask a model trained in 2019 "Who is the current Prime Minister of the UK?" A parametric model answers from frozen weights. A RAG model answers from whatever index you give it today, and you can show the passage it used. Now imagine the index contains a wrong page. The model will likely repeat it confidently. RAG moves the trust problem from the weights to the corpus; it does not remove it.</div>
<h5>Connections</h5>
<p><b>Before:</b> REALM (retrieval during pretraining), DPR. <b>After:</b> RETRO (retrieval at trillion-token scale), retrieve-and-rerank in production systems, long-context models that make some retrieval unnecessary, and agentic search, where the model chooses its own queries with tools (Modules 7 and 12).</p>`,
 evalLens:"For retrieval systems, separate retrieval recall (was the right passage in the top-k?) from generation accuracy given retrieval. A system can fail at either stage, and reporting only the final score hides which.",
 cc:"Claude Code does not use RAG in this paper's sense. Its lead engineer said publicly in February 2025 that agentic search (the model running grep, glob and file reads) outperformed a vector-index RAG approach they had tried. Retrieval is still central, but it is done by actions the model chooses.",
 robot:"Robot systems retrieve too: from a map, a library of skills, or past episodes similar to the current scene. Retrieval-augmented policies are an active research area, and the same questions apply: what is the index, what is the similarity, and how does the policy know when retrieved experience does not apply."},

instruct:{n:8, mod:8, thread:"post", year:2022, short:"InstructGPT / RLHF",
 title:"Training language models to follow instructions with human feedback",
 authors:"Long Ouyang, Jeff Wu, Xu Jiang, Diogo Almeida, Carroll L. Wainwright, Pamela Mishkin, et al. (20 authors, OpenAI)",
 venue:"arXiv 2203.02155 (March 2022); NeurIPS 2022",
 url:"https://arxiv.org/abs/2203.02155", pdf:"https://arxiv.org/pdf/2203.02155",
 why:"It is the clearest public description of the three-stage post-training recipe (supervised fine-tuning, a reward model trained on human comparisons, reinforcement learning against that reward) that turned GPT-3 into the system behind ChatGPT. Every later method in Modules 8–10 modifies one of these three stages.",
 bottleneck:"A pretrained model continues text; it does not follow instructions, and its errors (making facts up, toxic or unhelpful output) are not fixed by scale. Next-token loss on the web is a different objective from \"do what the user intended\".",
 contribution:"Collect demonstrations and rankings from about 40 contractors, then: (1) fine-tune GPT-3 on demonstrations; (2) train a reward model to predict which of two outputs labellers prefer; (3) optimise the policy against the reward model with PPO, keeping it close to the SFT model with a KL penalty and mixing in pretraining gradients. A 1.3B InstructGPT model is preferred by labellers over the 175B GPT-3.",
 prereq:"Paper 3. Basic reinforcement-learning vocabulary: policy, reward, policy gradient. The logistic (sigmoid) function.",
 concepts:["Supervised fine-tuning on demonstrations","Bradley–Terry preference model and the pairwise reward loss","KL-regularised RL objective; why the KL term prevents reward hacking","Alignment tax and the PPO-ptx fix","Whose preferences: labeller instructions as the real specification"],
 study:"Figure 2 (the three steps, memorise it). §3.1–3.5 (data collection, labeller selection, the models), especially §3.5 Equations (1)–(2). Figure 1 and §4.1 results. §4.2 (truthfulness, toxicity, the alignment tax). §5.2–5.3 on whose preferences are being learned.",
 skim:"Detailed dataset statistics in the appendix, and the many per-category plots beyond Figures 1, 3 and 4.",
 evidence:"On held-out prompts from the API, labellers prefer outputs of the 1.3B InstructGPT model over the 175B GPT-3 most of the time; the 175B InstructGPT is preferred around 85% of the time over 175B GPT-3. InstructGPT makes up facts less often on closed-domain tasks and improves on TruthfulQA. PPO-ptx reduces the performance regressions on public NLP benchmarks seen with plain PPO.",
 limitation:"The model learns the preferences of a specific small group of contractors following OpenAI's instructions, not human values in general. The reward model is an imperfect proxy: optimising it too hard makes true quality fall (later measured by Gao et al., 2022). The model still makes simple mistakes and can follow harmful instructions.",
 checkpoint:"Write the reward-model loss and the RL objective, and explain in plain words why the KL penalty is there. Then explain why a 1.3B model can be preferred to a 175B model when the larger one knows much more.",
 lesson:`<h5>Conceptual primer</h5>
<p>Pretraining teaches a model what text looks like. Post-training teaches it which of the many continuations it could produce is the one a person wants. That second signal is cheap to state as a comparison ("A is better than B") and hard to state as a correct answer, which is why preference learning works.</p>
<h5>The mathematics</h5>
<div class="eq">Step 1  SFT:  maximise log π(y_demo | x)                         ~13K prompts

Step 2  Reward model (Bradley–Terry):
        P(y_w ≻ y_l | x) = σ( r_φ(x, y_w) − r_φ(x, y_l) )
        loss(φ) = − E[ log σ( r_φ(x,y_w) − r_φ(x,y_l) ) ]           ~33K prompts, K = 4–9 ranked outputs each

Step 3  RL (PPO):
        maximise  E_{x, y∼π}[ r_φ(x,y) − β · log( π(y|x) / π_SFT(y|x) ) ]  +  γ · E_{x∼pretrain}[ log π(x) ]
                  └─ reward ─┘   └──── KL penalty: stay near SFT ────┘     └─ PPO-ptx: keep old skills ─┘</div>
<h5>Related method: DPO (Optional reading)</h5>
<p>Rafailov et al. (2023) showed that the optimal policy for the KL-regularised objective can be written in closed form, which turns RLHF into a classification loss on preference pairs with no separate reward model and no sampling during training:</p>
<div class="eq">L_DPO = − E[ log σ( β log π(y_w|x)/π_ref(y_w|x)  −  β log π(y_l|x)/π_ref(y_l|x) ) ]</div>
<p>Llama 3 (Paper 6) uses DPO; Anthropic's Constitutional AI (Module 8 bridge) replaces many human labels with AI feedback guided by a written list of principles.</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>Your reward model learned that labellers like longer, more detailed answers. Run RL with no KL penalty. The policy discovers that padding answers with confident detail raises reward, so it does, even when the detail is wrong. Reward keeps climbing while real quality falls. That is reward hacking, and β is the leash. Gao et al. (2022) measured this curve directly: true quality rises, peaks, then falls as the policy moves further from where it started.</div>
<h5>Connections</h5>
<p><b>Before:</b> Christiano et al. (2017) learned rewards from human preferences for Atari and robot locomotion; Stiennon et al. (2020) applied it to summarisation. <b>After:</b> ChatGPT (Nov 2022), Constitutional AI (Dec 2022), DPO (2023), and RL with verifiable rewards (Paper 10), which swaps the learned reward model for a checker wherever one exists.</p>`,
 evalLens:"Preference win rates depend on who judges, on what prompts, and against what baseline. Check whether the labellers who rated outputs are the same people who wrote the training labels (here, partly yes, with a held-out group reported separately). Reward hacking is the failure mode to look for in every RL paper from here on.",
 cc:"Claude is post-trained with human feedback and with Anthropic's Constitutional AI method; Anthropic has published both approaches. The exact data, reward models and RL environments used for Claude's coding behaviour are not public.",
 robot:"RLHF began in robotics: Christiano et al. 2017 taught a simulated robot to backflip from human comparisons of video clips. Robot learning is returning to it, using preferences or success detectors to post-train VLA policies, because writing a reward function for 'fold this shirt well' is as hard as for 'write a helpful answer'."},

codex:{n:9, mod:9, thread:"post", year:2021, short:"Codex / HumanEval",
 title:"Evaluating Large Language Models Trained on Code",
 authors:"Mark Chen, Jerry Tworek, Heewoo Jun, Qiming Yuan, Henrique Ponde de Oliveira Pinto, Jared Kaplan, et al. (58 authors, OpenAI)",
 venue:"arXiv 2107.03374 (July 2021)",
 url:"https://arxiv.org/abs/2107.03374", pdf:"https://arxiv.org/pdf/2107.03374",
 why:"Code is the domain where a model's output can be checked automatically by running it. This paper introduces functional correctness as the metric, the HumanEval benchmark, and the unbiased pass@k estimator, and shows that sampling many candidates and filtering them changes what a model can solve. Those three ideas are the foundation of coding agents and of RL with verifiable rewards.",
 bottleneck:"Code generation was scored by text-match metrics like BLEU, which reward looking like the reference rather than working. There was no clean, held-out benchmark that tested whether generated code runs correctly.",
 contribution:"Fine-tune GPT models on 159 GB of Python from public GitHub repositories (Codex, up to 12B parameters), and evaluate on HumanEval: 164 hand-written programming problems with unit tests. Introduce pass@k with an unbiased estimator. Show that pass rate rises sharply with the number of samples, and that a simple ranking heuristic recovers much of that gain when only one answer can be submitted.",
 prereq:"Paper 3. Basic probability (combinations). What a unit test is.",
 concepts:["Functional correctness vs similarity metrics","The pass@k estimator and why the naive one is biased","Sampling temperature and the diversity–accuracy trade-off","Selecting among samples: mean log-probability, tests as verifiers","Contamination risk for code benchmarks"],
 study:"§2.1 (functional correctness) and Equation (1) with the numerically stable estimator in Figure 3. §2.2 HumanEval construction. §3 Figures 5–7 (scaling with model size, pass@k vs temperature, ranking heuristics). §4 Codex-S (supervised fine-tuning on standalone functions). §5 Docstring generation. §6 Limitations.",
 skim:"§7 broader impacts (useful but long) and the appendix on sandboxing, unless you care about safe execution infrastructure, which coding agents do.",
 evidence:"Codex-12B solves 28.8% of HumanEval with one sample; GPT-3 solves 0%. With 100 samples per problem, 70.2% of problems have at least one correct sample. Picking the sample with the highest mean log-probability gives 44.5%. Fine-tuning on correctly implemented standalone functions (Codex-S) raises single-sample pass rate to 37.7%.",
 limitation:"HumanEval is small (164 problems), short, self-contained and easy by today's standards, and once public it inevitably leaked into training data. It tests writing one function from a docstring, not understanding a repository, running a test suite or fixing an issue. The paper documents that the model degrades with long chains of operations in a specification.",
 checkpoint:"Explain why pass@100 can be 70% when pass@1 is 29%, and what that gap tells you about where the model's knowledge lies. Then explain why this gap is the reason RL with verifiable rewards (Paper 10) works.",
 lesson:`<h5>Conceptual primer</h5>
<p>For most text, judging quality needs a person. For code, a test suite can judge. That single fact makes code the first domain where a model can be evaluated, filtered and eventually trained against an automatic, mostly reliable signal.</p>
<h5>pass@k, carefully</h5>
<div class="eq">Generate n ≥ k samples per problem, count c that pass all tests.
pass@k = E_problems [ 1 − C(n−c, k) / C(n, k) ]
         = probability that at least one of k samples drawn without replacement passes

Naive estimate 1 − (1 − ĉ/n)^k is biased upward for small n.
Paper: n = 200, k ∈ {1, 10, 100}</div>
<div class="note think"><span class="eyebrow">Worked example</span>A problem has n = 10 samples, c = 2 correct. pass@1 = 1 − C(8,1)/C(10,1) = 1 − 8/10 = 0.2. pass@5 = 1 − C(8,5)/C(10,5) = 1 − 56/252 ≈ 0.78. Same model, same problem, four times the apparent ability, just from being allowed five tries. Whenever a paper reports code results, find k and the sampling temperature before reading the number.</div>
<h5>Why sampling plus a verifier is so powerful</h5>
<p>If the right program has even a few percent probability under the model, drawing enough samples will find it, and tests can recognise it. The model "knows" far more than its single best guess shows. Three later developments exploit that gap: AlphaCode (sample a million programs, filter by tests and cluster), coding agents (write, run, read the error, retry), and RL with verifiable rewards (reward the samples that pass, so the policy moves probability onto them).</p>
<h5>Connections</h5>
<p><b>Before:</b> GPT-3's surprising zero-shot coding ability; BLEU-based code benchmarks. <b>After:</b> AlphaCode (2022), SWE-bench (2023: real GitHub issues in real repositories), SWE-agent (Paper 13), LiveCodeBench (2024: new problems released after model cutoffs to avoid contamination), and RLVR (Paper 10).</p>`,
 evalLens:"Three evaluation lessons in one paper: report k and temperature; tests can be incomplete, so a passing program can still be wrong (a verifier error); and a public benchmark gets into future training data, which is why contamination-resistant benchmarks like LiveCodeBench release problems after model cutoffs.",
 cc:"Claude Code's basic loop is this paper's insight turned into an agent: generate a change, run the tests or the build, read the result, and try again. The tests are the verifier. When there are no tests, the agent is far less reliable, which is why it is often worth asking it to write tests first.",
 robot:"Robotics lacks a cheap, reliable verifier like a unit test. Checking whether a grasp succeeded or a shirt is folded needs a camera, a learned success detector, or a person. Much current robot-learning research is about building that verifier, because with one, the sample-and-filter and RL methods from code transfer directly."},

r1:{n:10, mod:10, thread:"post", year:2025, short:"DeepSeek-R1 / RLVR",
 title:"DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
 authors:"DeepSeek-AI (Daya Guo, Dejian Yang, Haowei Zhang, et al.)",
 venue:"arXiv 2501.12948 (January 2025; v2 January 2026). Peer-reviewed version: \"DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning\", Nature 645, 633–638 (17 Sep 2025)",
 url:"https://arxiv.org/abs/2501.12948", pdf:"https://arxiv.org/pdf/2501.12948", extra:[["Nature version","https://www.nature.com/articles/s41586-025-09422-z"]],
 why:"It is the first detailed public recipe for a reasoning model of the o1 kind, and it isolates the key mechanism: reinforcement learning on problems whose answers can be checked automatically, with no human-written reasoning traces, makes long chains of thought, self-checking and backtracking emerge. It also shows that this behaviour can be distilled into small models.",
 bottleneck:"OpenAI's o1 (Sept 2024) showed that models trained to think at length before answering score far higher on maths and code, but OpenAI disclosed little about how. Earlier attempts in the open community (process reward models, Monte Carlo tree search over steps) had not reproduced it.",
 contribution:"R1-Zero: apply large-scale RL with GRPO directly to the DeepSeek-V3 base model, rewarding only a correct final answer (checked by rule or by running code) and a format. Reasoning length and accuracy grow together during training. R1 adds a small cold-start SFT set, RL, rejection-sampled SFT on about 800K samples and a final RL stage, to fix readability and general ability. Distilling R1's outputs into Qwen and Llama models from 1.5B to 70B beats running RL on those small models directly.",
 prereq:"Papers 8 and 9. Chain-of-thought prompting (Module 10 bridge). Policy gradients at the level of \"increase the probability of actions that got high reward\".",
 concepts:["Reinforcement learning with verifiable rewards (RLVR)","GRPO: group-relative advantages with no value network","Emergent long chain of thought and test-time compute","Rule-based rewards versus learned reward models (reward hacking)","Distillation of reasoning traces into small models"],
 study:"§2.2 (R1-Zero) with the GRPO objective, the reward design and Figure 2–3 (accuracy and response length during training). The \"aha moment\" passage and Table 3. §2.3 (the four-stage R1 pipeline). §3 Table 4 (results) and Table 5 (distilled models). §4.1 (distillation versus RL on small models) and §4.2 \"Unsuccessful attempts\" (PRM and MCTS): this section is unusually informative.",
 skim:"Per-benchmark detail beyond the main tables; prompt templates in the appendix after you have seen one. The Nature version adds methodological detail and safety analysis; skim it after the arXiv version.",
 evidence:"During R1-Zero training, AIME 2024 pass@1 rises from 15.6% to 71.0% (86.7% with majority voting over 64 samples), and average response length grows steadily without being rewarded directly. R1 is reported as comparable to OpenAI-o1-1217 on maths and coding benchmarks. A distilled 7B Qwen model outperforms much larger non-reasoning models on AIME. RL applied directly to a 32B model does worse than distilling R1 into it.",
 limitation:"Works best where answers can be verified automatically (maths, code); open-ended tasks still depend on learned reward models, which the authors avoided for the reasoning stage because of reward hacking. R1-Zero mixes languages and is hard to read. Benchmark comparisons with o1 rely on OpenAI's reported numbers. Spending many more tokens per answer raises cost and latency, so comparisons must hold the inference budget fixed.",
 checkpoint:"Explain GRPO's advantage formula and why it removes the need for a value network. Then explain why rewarding only the final answer can produce long reasoning, and why the authors chose rule-based rewards over a learned reward model.",
 lesson:`<h5>Conceptual primer</h5>
<p>Chain-of-thought prompting (Wei et al., 2022) showed that asking a model to write intermediate steps improves accuracy. That is a prompt trick on a frozen model. R1 turns it into a trained behaviour: if writing longer, self-checking solutions leads to more correct answers, and correct answers are rewarded, RL will make the model write that way.</p>
<h5>GRPO</h5>
<div class="eq">For a question q, sample a group of G outputs {o₁ … o_G} from the old policy.
Reward each:  r_i = 1 if final answer correct (and format OK), else 0
Advantage:    A_i = ( r_i − mean(r₁…r_G) ) / std(r₁…r_G)

Objective (per token, PPO-style clipped ratio):
J = E[ (1/G) Σ_i min( ρ_i A_i , clip(ρ_i, 1−ε, 1+ε) A_i ) − β · KL(π_θ ‖ π_ref) ]
ρ_i = π_θ(o_i | q) / π_old(o_i | q)</div>
<p>PPO normally needs a learned value function to estimate how good a state is. GRPO uses the group as its own baseline: an answer is good if it beat the other attempts at the same question. That removes a network as large as the policy and works because the reward is a clean 0/1.</p>
<h5>Why final-answer reward produces long reasoning</h5>
<p>The model is never told to think longer. But among its sampled attempts, the ones that happened to re-check a step or try a second approach were correct more often, so their tokens get positive advantage. Over thousands of updates, re-checking, backtracking and longer answers become more probable. Accuracy now depends on how many tokens the model spends, which is <b>test-time compute</b>: a second scaling axis next to Chinchilla's training compute.</p>
<div class="note think"><span class="eyebrow">Thought experiment: why not a learned reward model?</span>Suppose the reward came from a neural network that scores how good a solution looks. RL is an optimiser; it will find solutions that look good to that network without being correct (Module 8). A rule that compares the final number with the known answer cannot be fooled that way, although it can still be gamed by guessing or by exploiting format checks. Verifiers have errors too: a maths checker that mis-parses "1/2" vs "0.5" teaches the wrong thing. RLVR is only as good as its checker.</div>
<h5>Distillation versus RL</h5>
<p>The paper's §4.1 is a useful lesson in where abilities come from. RL on a 32B model is expensive and gives less than simply fine-tuning the 32B model on reasoning traces produced by the much larger R1. Large-model RL discovers the behaviour; distillation copies it cheaply. Note what this does not show: that small models cannot discover reasoning with better methods.</p>
<h5>Connections</h5>
<p><b>Before:</b> chain-of-thought and self-consistency prompting, STaR (self-taught reasoning by filtering correct rationales), process supervision (Let's Verify Step by Step), OpenAI o1. <b>After:</b> reasoning modes in most frontier models, RL on agentic tasks with environment feedback (Papers 13–14), and test-time compute budgets as a product setting (\"thinking\" effort levels).</p>`,
 evalLens:"Match inference budgets: a reasoning model that uses 10× more tokens should be compared against a baseline given the same token budget (for example majority voting over samples). Report pass@1 averaged over several samples, not one lucky run. Check contamination: AIME problems are public after each year's contest.",
 cc:"Claude models offer an extended-thinking mode, which Anthropic has documented as a configurable budget of reasoning tokens. How that ability was trained is not public; it would be speculation to say it was trained like R1. What is public is the product consequence: more thinking costs more tokens and time, and helps most on hard, checkable problems.",
 robot:"Verifiable rewards are the hard part in robotics. In simulation, success can be checked from the state, which is why sim-based RL (for example Eka's force-sensing hand trained in physics simulation) can use RLVR-style methods. On real robots, a learned success detector is a learned reward model, with the same reward-hacking risks."}
});
