const PAPERS = {
bengio:{n:1, mod:1, thread:"arch", year:2003, short:"Neural probabilistic LM",
 title:"A Neural Probabilistic Language Model",
 authors:"Yoshua Bengio, Réjean Ducharme, Pascal Vincent, Christian Jauvin",
 venue:"Journal of Machine Learning Research 3 (2003): 1137–1155",
 url:"https://www.jmlr.org/papers/v3/bengio03a.html", pdf:"https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf",
 why:"It is the template every LLM still follows: a lookup table of learned word vectors, a neural network over a window of them, and a softmax over the vocabulary trained by gradient descent to maximise the log-probability of the next word. GPT-4-class models change the network in the middle, not the frame around it.",
 bottleneck:"N-gram models count how often word sequences occur. The number of possible sequences grows as |V|ⁿ, so almost every 5-word sequence in new text was never seen, and counts give no way to share evidence between similar words (\"cat\" and \"dog\").",
 contribution:"Give each word a learned real-valued vector and predict the next word with a smooth function of those vectors. Similar words end up with similar vectors, so evidence about one sentence generalises to many neighbouring ones. Embeddings and the predictor are learned together.",
 prereq:"Probability (chain rule, conditional distributions), softmax, the idea of a loss function and gradient descent.",
 concepts:["Chain rule of probability: p(w₁…w_T) = Π p(w_t | w₁…w_{t−1})","Curse of dimensionality in discrete models","Distributed representations (embeddings)","Softmax output and cross-entropy / perplexity","Why the |V|-way softmax dominates the compute"],
 study:"§1 (the argument for distributed representations, read twice). §2, Figure 1 and the model equation y = b + Wx + U·tanh(d + Hx). §4 Table 1–2 perplexity results. The short discussion of parallel training in §3 is a good first look at systems problems.",
 skim:"The detailed parallel-implementation description, the mixture-with-trigram experiments, and the future-work list.",
 evidence:"On the Brown corpus and AP News the neural model reaches clearly lower test perplexity than the best smoothed n-gram models (about 24% lower on Brown, smaller gains on AP News), and combining it with a trigram helps further.",
 limitation:"A fixed window of n−1 previous words (n = 5 or so) means no long-range context, and training was very slow because each step computes a softmax over all 17K–18K words. Both problems shaped the next decade: RNNs attacked the window, word2vec attacked the cost.",
 checkpoint:"Explain, with the cat/dog example, why a model with learned word vectors can assign sensible probability to a sentence it has never seen, while a count-based n-gram model cannot. Then say what part of the computation is most expensive and why.",
 lesson:`<h5>Conceptual primer</h5>
<p>A language model assigns a probability to any string. By the chain rule, that is the same as predicting each token from the ones before it, so "language modelling" and "next-token prediction" are the same problem. The question is how to represent the history.</p>
<p>Counting fails because language is sparse. Bengio's answer is to stop treating words as atoms and give each one coordinates in a space of, say, 60 dimensions, learned so that prediction gets easier.</p>
<h5>Mechanism</h5>
<div class="eq">x   = [ C(w_{t−1}); C(w_{t−2}); … ; C(w_{t−n+1}) ]     concatenate n−1 embeddings, C is |V|×m
h   = tanh( d + H x )                                   hidden layer
y   = b + W x + U h                                     one score per vocabulary word
p(w_t = i | history) = exp(y_i) / Σ_j exp(y_j)          softmax

Loss  L(θ) = − (1/T) Σ_t log p(w_t | history)           θ = {C, H, d, U, W, b}
Update θ ← θ − η ∇_θ L                                  stochastic gradient descent
Perplexity = exp(L)  ≈ "how many words the model is effectively choosing among"</div>
<p>The gradient flows into C, so the embedding of "cat" is moved whenever "cat" appears in a context where moving it would have improved a prediction. Words that predict similar continuations drift together.</p>
<h5>Compute</h5>
<p>Per prediction, the hidden layer costs about (n−1)·m·h multiplies, while the output layer costs |V|·h. With |V| ≈ 17,000 and h ≈ 100 the output dominates by an order of magnitude. Modern LLMs still pay for a |V|-way softmax (Llama 3: 128K vocabulary), but it is now a small share next to dozens of transformer layers.</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>Your training text contains "the cat is walking in the bedroom" but never "a dog was running in a room". An n-gram model has zero counts for most 4-grams in the second sentence. In Bengio's model, "dog" ≈ "cat", "a" ≈ "the", "running" ≈ "walking", "room" ≈ "bedroom" in embedding space, so the network's smooth function gives the second sentence a probability close to the first. That one sentence is the paper's argument, and it is the paper's own example.</div>
<h5>Connections</h5>
<p><b>Before:</b> n-gram models with smoothing (Kneser–Ney), and early connectionist ideas about distributed representations (Hinton, 1986). <b>After:</b> RNN language models remove the fixed window; word2vec keeps only the embeddings; the transformer (Paper 2) replaces the fixed MLP over a window with attention over the whole context. The objective and the softmax are unchanged in every model that follows.</p>`,
 evalLens:"Perplexity is only comparable between models with the same vocabulary and test set. This is the first instance of a rule you will meet constantly: a number means nothing without its exact evaluation conditions.",
 cc:"Claude Code's model is trained on the same objective at the start of its life: cross-entropy on the next token, over text and code. Every later capability in this course is built on top of that.",
 robot:"Robot policies that tokenize actions (RT-2, Paper 11) use exactly this output layer: a softmax over discrete bins of joint or end-effector motion. Continuous-action policies (π0, diffusion policies) replace the softmax, and that choice is one of the central design questions in robot learning."},

vaswani:{n:2, mod:2, thread:"arch", year:2017, short:"Transformer",
 title:"Attention Is All You Need",
 authors:"Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
 venue:"arXiv 1706.03762 (June 2017); NeurIPS 2017",
 url:"https://arxiv.org/abs/1706.03762", pdf:"https://arxiv.org/pdf/1706.03762",
 why:"Every model in this course is a transformer, including the vision encoders and action heads of robot policies. You need to be able to trace a token through it: embedding, attention, residual add, feed-forward, normalisation, output.",
 bottleneck:"RNN encoder–decoders with attention worked well but computed one position at a time, so training could not use GPU parallelism across the sequence, and information between distant positions still had to pass through many steps.",
 contribution:"Remove recurrence entirely. Each layer lets every position attend directly to every other position through scaled dot-product attention with several heads, followed by a position-wise feed-forward network, with residual connections and layer normalisation. Order is injected with positional encodings. The whole sequence is processed in parallel during training.",
 prereq:"Paper 1; matrix multiplication; softmax; the encoder–decoder idea from seq2seq and Bahdanau attention (Module 1 bridges).",
 concepts:["Queries, keys and values; scaled dot-product attention","Multi-head attention as several attention patterns in parallel","Residual stream + layer norm + feed-forward block","Causal masking in the decoder","Positional encodings and why attention needs them (it is permutation-invariant)"],
 study:"§3.1–3.5 and Figures 1–2 (the architecture, read until you can redraw it). Equation (1). §4 and Table 1 (complexity per layer, sequential operations, path length: the actual argument for the design). Table 3 (ablations: heads, d_k, model size, dropout, learned vs sinusoidal positions).",
 skim:"§5 training details beyond the learning-rate schedule (warm-up then inverse square root decay, still a recognisable ancestor of modern schedules). §6.3 constituency parsing.",
 evidence:"On WMT 2014 English→German the big model reaches 28.4 BLEU and on English→French 41.8 BLEU, beating previous single models and ensembles at a fraction of the training cost (Table 2: the base model trained 12 hours on 8 P100 GPUs). Table 3 shows the design is robust: single-head attention is worse, too many heads also hurts, learned and sinusoidal positions perform about the same.",
 limitation:"Self-attention costs O(n²·d) time and O(n²) memory in sequence length n, which becomes the central systems problem of Module 6. The paper only tests translation and parsing, so the claim that this architecture generalises to everything came from later work.",
 checkpoint:"Walk one token through one decoder layer, naming the shape of every tensor. Then explain why attention needs positional information at all, and why the decoder needs a causal mask during training but the encoder does not.",
 lesson:`<h5>Conceptual primer</h5>
<p>Attention is a soft dictionary lookup. Each position emits a <i>query</i> ("what am I looking for?"), a <i>key</i> ("what do I contain?") and a <i>value</i> ("what do I pass on if selected?"). A position's output is the average of all values, weighted by how well its query matches each key.</p>
<h5>The mechanism, with shapes</h5>
<div class="eq">X ∈ ℝ^{n×d}                         n tokens, d = 512 (base)
Q = X W_Q,  K = X W_K,  V = X W_V    each ∈ ℝ^{n×d_k}, d_k = d/h = 64 with h = 8 heads

Attention(Q,K,V) = softmax( Q Kᵀ / √d_k + M ) V        M = −∞ above diagonal in a decoder (causal mask)
                     └── n×n matrix of weights ──┘

MultiHead(X) = Concat(head₁ … head_h) W_O
Block:  X ← X + MultiHead(LN(X))        (modern "pre-norm" placement; the paper used post-norm)
        X ← X + FFN(LN(X)),   FFN(x) = W₂ · ReLU(W₁ x),  W₁: d → 4d</div>
<p>Why divide by √d_k: if query and key entries have unit variance, their dot product has variance d_k. Large logits push softmax into a near one-hot regime where gradients vanish. Scaling keeps the variance near 1.</p>
<h5>Three wirings</h5>
<ul><li><b>Encoder only</b> (BERT): no mask, every token sees every token. Good for understanding and embeddings.</li>
<li><b>Decoder only</b> (GPT, Llama, Claude): causal mask, trained to predict the next token. One model, one objective, every task. This is what won.</li>
<li><b>Encoder–decoder</b> (the original, T5): the decoder also cross-attends to the encoder's outputs. Natural for input→output tasks such as translation.</li></ul>
<h5>Compute</h5>
<p>A rough rule worth memorising: a forward pass costs about 2 FLOPs per parameter per token (each weight is used in one multiply-add), plus the attention term ≈ 2·n·d per token per layer. Training (forward + backward) ≈ 6 FLOPs per parameter per token. You will use this "6ND" rule in Module 4.</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>Shuffle the words of a sentence and feed it to a transformer with the positional encodings removed. Every output vector is the same as before, just shuffled: attention is a weighted <i>set</i> operation. That is why order has to be added explicitly, and why the choice of positional scheme later decides how well a model handles contexts longer than it was trained on (RoPE, Module 6).</div>
<h5>Connections</h5>
<p><b>Before:</b> Bahdanau attention bolted onto an RNN. <b>After:</b> BERT and GPT split the architecture into encoder-only and decoder-only branches; GPT-3 (Paper 3) scales the decoder; FlashAttention (Paper 5) makes the n×n matrix cheap; ViT applies the same block to image patches, which is how robot policies see (Paper 11).</p>`,
 evalLens:"Notice the ablation table: one variable changed at a time, against a fixed base model. Many later papers skip this. When you read a claim that some component matters, look for the row where it alone was removed.",
 cc:"Claude is a decoder-only transformer, as Anthropic has said publicly; its sizes and architectural details are not public. Its context window is the n in this paper, and the cost of attending over a long session is why the harness compacts conversations (Module 12).",
 robot:"In a VLA policy, camera images are cut into patches and embedded as tokens by a vision transformer, joined to the language tokens, and processed by the same blocks. The robot's proprioceptive state can be one more token. The transformer is the convergence point: one architecture for text, images and actions."},

gpt3:{n:3, mod:3, thread:"data", year:2020, short:"GPT-3 / few-shot",
 title:"Language Models are Few-Shot Learners",
 authors:"Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, et al. (31 authors, OpenAI)",
 venue:"arXiv 2005.14165 (May 2020); NeurIPS 2020",
 url:"https://arxiv.org/abs/2005.14165", pdf:"https://arxiv.org/pdf/2005.14165",
 why:"It is the point where pretraining stops being a step before fine-tuning and becomes the product. It documents the data mixture, the model family and the evaluation protocol, and it includes an honest section on benchmark contamination. It is also the primary source for in-context learning (Module 5).",
 bottleneck:"Pretrained models (BERT, GPT-2) still needed a labelled dataset and fine-tuning for each new task. That limits use to tasks someone has built a dataset for, and fine-tuned models can exploit spurious patterns in narrow training sets.",
 contribution:"Train a 175B-parameter decoder on about 300B tokens and show that, without any gradient updates, it can do many tasks from a natural-language instruction plus a few examples in its context window. Ability to learn from context improves smoothly with scale across eight model sizes from 125M to 175B.",
 prereq:"Papers 1–2. The idea of a held-out test set.",
 concepts:["Zero-, one-, few-shot evaluation as defined here","Data mixture and sampling weights (sources not used in proportion to size)","Quality filtering of Common Crawl with a classifier; fuzzy deduplication","Benchmark contamination and how to measure it","Scaling curves across a model family"],
 study:"§2.1–2.3 and Table 2.1–2.2 (model sizes; the training mixture: filtered Common Crawl, WebText2, two book corpora, Wikipedia, with their sampling weights and epochs). Figure 1.2 and Figure 3.1 (in-context learning improves with scale). §4 \"Measuring and Preventing Memorization of Benchmarks\" in full. §5 Limitations. Appendix A on filtering and deduplication.",
 skim:"Most of §3: read one task family closely (e.g. §3.1 language modelling or §3.9 arithmetic), skim the rest. §6 broader impacts can be skimmed unless it is your interest.",
 evidence:"Few-shot performance rises steadily with model size on most tasks, and at 175B it approaches or matches fine-tuned state of the art on some (e.g. TriviaQA, LAMBADA, some translation directions), while staying far behind on others (e.g. some reading comprehension and natural language inference tasks). The contamination study finds a filtering bug left some test data in training, estimates its effect per benchmark, and flags affected results.",
 limitation:"Few-shot still trails fine-tuning on many tasks; the model makes confident factual errors; training compute was about 3.1×10²³ FLOPs; and, by the paper's own account, part of the benchmark data leaked into training. Chinchilla (Paper 4) later shows the model was trained on too few tokens for its size.",
 checkpoint:"State precisely what \"few-shot\" means in this paper and what it does not mean (no gradient update, no fine-tuning). Then explain how the authors checked whether their benchmark scores were inflated by test data in the training set, and why that check can only give a bound, not proof of clean results.",
 lesson:`<h5>Conceptual primer</h5>
<p>GPT-3 is architecturally almost GPT-2 (a decoder-only transformer with alternating dense and locally banded sparse attention layers), made about 100× larger. The scientific claim is behavioural: a big enough next-token predictor can be <i>steered by its prompt</i> into doing tasks it was never explicitly trained on.</p>
<h5>The pretraining recipe it documents</h5>
<div class="eq">Source                  Tokens    Weight in mix   Epochs over 300B tokens
Common Crawl (filtered)  410B       60%            0.44
WebText2                  19B       22%            2.9
Books1                    12B        8%            1.9
Books2                    55B        8%            0.43
Wikipedia                  3B        3%            3.4</div>
<p>Two lessons hide in this table. First, high-quality sources are <i>upsampled</i>: Wikipedia is seen 3.4 times while most of Common Crawl is seen less than once. Data mixture is a design decision, not a given. Second, the raw crawl was filtered with a classifier trained to tell curated text (WebText, books, Wikipedia) from raw crawl, then fuzzily deduplicated. Both ideas are standard today.</p>
<h5>Compute check with the 6ND rule</h5>
<div class="eq">C ≈ 6 · N · D = 6 × 175×10⁹ × 300×10⁹ ≈ 3.15 × 10²³ FLOPs</div>
<p>This matches the figure the paper reports, which is a good test that you have the rule right.</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>A benchmark question appeared on a web page that was crawled. The model answers it correctly. Did it reason or remember? GPT-3's §4 approach: find test items with a 13-gram overlap with the training data, evaluate the model on the "clean" subset only, and compare. If clean and full scores match, contamination probably did not inflate the result. But a paraphrased copy has no 13-gram overlap, so this method misses it. That is why every later lab invents new held-out benchmarks.</div>
<h5>Connections</h5>
<p><b>Before:</b> GPT-2 (zero-shot hints), Kaplan's scaling laws (same group, Jan 2020) predicted bigger would be better. <b>After:</b> Chinchilla recalculates the optimal size/data split; InstructGPT (Paper 8) shows raw GPT-3 is hard to use without post-training; Module 5 asks what in-context learning actually is.</p>`,
 evalLens:"Contamination is the main lesson. Also notice that GPT-3 sometimes lists results from different numbers of in-context examples per task; when comparing models, check that K and the prompt format were the same.",
 cc:"When you paste an error message and one example of the fix you want, Claude Code generalises from that example without any training. That is the few-shot behaviour this paper first measured.",
 robot:"Robotics has no equivalent of Common Crawl. The largest open robot datasets (Open X-Embodiment, DROID) are roughly a million trajectories, tiny next to 300B tokens. That data gap is why robot labs borrow pretrained vision-language backbones (Paper 11) or learn from video (Paper 12)."},

chinchilla:{n:4, mod:4, thread:"data", year:2022, short:"Chinchilla scaling",
 title:"Training Compute-Optimal Large Language Models",
 authors:"Jordan Hoffmann, Sebastian Borgeaud, Arthur Mensch, Elena Buchatskaya, Trevor Cai, Eliza Rutherford, et al. (22 authors, DeepMind)",
 venue:"arXiv 2203.15556 (March 2022); NeurIPS 2022",
 url:"https://arxiv.org/abs/2203.15556", pdf:"https://arxiv.org/pdf/2203.15556",
 why:"It turns \"make it bigger\" into a budgeting rule, and in doing so overturned the field's previous recipe. Learning how the authors estimated the rule three different ways is the best lesson in this course on how scaling claims are made and where they can go wrong.",
 bottleneck:"Kaplan et al. (2020) had concluded that, as compute grows, you should mostly grow the model and only modestly grow the data. Labs followed that advice (GPT-3 175B and Gopher 280B on about 300B tokens). Nobody had checked it carefully with learning-rate schedules matched to each run's length.",
 contribution:"Over 400 training runs (70M to 16B parameters, 5B to 500B tokens) and three independent methods all find that parameters and tokens should grow in equal proportion with compute: N_opt ∝ C^0.5 and D_opt ∝ C^0.5, roughly 20 tokens per parameter. Chinchilla, 70B parameters on 1.4T tokens, uses the same compute as Gopher (280B) and beats it on nearly every benchmark.",
 prereq:"Paper 3 and the 6ND rule. Comfort with log–log plots and fitting a power law.",
 concepts:["Compute budget C ≈ 6ND","IsoFLOP curves: fix C, vary N, find the minimum loss","Parametric loss fit L(N,D) = E + A/N^α + B/D^β","Why the learning-rate schedule must match the run length","Training-optimal versus inference-optimal models"],
 study:"§3 in full, especially Figure 2 (approach 1, fixed model sizes), Figure 3 (approach 2, IsoFLOP profiles) and §3.3 with Equation (2) (approach 3, parametric fit). Table 3 (the predicted optimal sizes for each budget). Figure 1 (the headline comparison with Kaplan). §4.2 results versus Gopher, and Appendix on the cosine cycle length.",
 skim:"The per-benchmark details in §4.2 after the summary figures; the dataset composition (MassiveText) unless you want data detail.",
 evidence:"All three approaches agree on exponents near 0.5 (0.50/0.50, 0.49/0.51, 0.46/0.54). Chinchilla 70B reaches 67.5% average on MMLU against Gopher's 60.0%, at equal training compute and 4× lower inference cost. The disagreement with Kaplan is traced largely to using a fixed cosine schedule length that did not match shorter runs, and to fitting on smaller models.",
 limitation:"The rule minimises training loss for a fixed training budget. It ignores inference cost: a model that will serve billions of queries is cheaper overall if it is smaller and trained on far more tokens (Llama 3's 8B model saw about 15T tokens, roughly 1,900 tokens per parameter). It also assumes unique data and mostly one epoch, and loss is not the same as downstream ability.",
 checkpoint:"You have a budget of 10²⁴ FLOPs. Use the 6ND rule and the 20-tokens-per-parameter heuristic to estimate the compute-optimal N and D. Then explain why a company planning to serve the model to millions of users would deliberately choose a smaller N than that.",
 lesson:`<h5>Conceptual primer</h5>
<p>Loss falls smoothly as a power law in model size and data. If both cost compute, there is an optimal split for any fixed budget, in the same way there is an optimal ratio of workers to machines in a factory. The question is the exponent.</p>
<h5>The three estimates</h5>
<div class="eq">Constraint:     C ≈ 6 N D
Approach 3 fit: L(N, D) = E + A / N^α + B / D^β
                E ≈ 1.69  (irreducible loss: entropy of text)
                A ≈ 406.4, α ≈ 0.34      (penalty for a too-small model)
                B ≈ 410.7, β ≈ 0.28      (penalty for too little data)
Minimise L subject to 6ND = C  →  N_opt ∝ C^a, D_opt ∝ C^b with a ≈ b ≈ 0.5</div>
<p>Approach 2 is the most intuitive: pick nine compute budgets; for each, train models of many sizes, each for exactly as many tokens as the budget allows; plot final loss against size. Each curve is a valley ("IsoFLOP profile"), and its lowest point is the optimal size for that budget. Plot those minima against compute on log–log axes and read off the slope.</p>
<h5>Worked example</h5>
<div class="eq">Budget C = 5.76 × 10²³ FLOPs (Gopher's budget)
Heuristic D ≈ 20 N  →  C = 6 · N · 20N = 120 N²
N = √(C/120) = √(4.8 × 10²¹) ≈ 6.9 × 10¹⁰  → about 70B parameters
D ≈ 20 × 70B = 1.4T tokens          → Chinchilla's actual configuration</div>
<h5>Infrastructure: why big runs are hard (read with Module 4's bridges)</h5>
<p>Training memory per parameter with Adam in mixed precision is about 16 bytes: 2 (bf16 weights) + 2 (bf16 gradients) + 4 (fp32 master weights) + 8 (two fp32 Adam moments). A 70B model therefore needs about 1.1 TB just for this state, before activations, spread over many 80 GB GPUs. Data parallelism copies the model; ZeRO/FSDP shards the state; tensor parallelism splits each matrix; pipeline parallelism splits layers. Large runs combine all of them and must survive hardware failures (Llama 3, Paper 6, reports the failure statistics).</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>Two models cost the same to train: 280B on 300B tokens, and 70B on 1.4T tokens. The second wins on quality, and is also 4× cheaper per query and 4× smaller in memory. If the field had known this in 2020, GPT-3 would probably have been a much smaller model. The cost of a wrong scaling law is paid in every query, for years.</div>
<h5>Connections</h5>
<p><b>Before:</b> Kaplan's scaling laws and GPT-3/Gopher-sized models. <b>After:</b> open models deliberately "over-train" past Chinchilla-optimal for cheaper inference (Llama, Paper 6); MoE models (DeepSeek-V3) change the cost model by separating total parameters from active ones; reasoning models (Paper 10) shift compute from training to inference, which needs a different budget equation.</p>`,
 evalLens:"A scaling law is an extrapolation. Ask: over what range was it fitted (here up to 16B), what was held fixed (data quality, architecture, tokenizer), and whether the downstream metric you care about scales the same way as loss. Chinchilla's three-method agreement is what makes it credible.",
 cc:"Anthropic has not published Claude's parameter counts, token counts or compute. What can be said is that every frontier lab now plans runs with this kind of budget arithmetic, and that serving cost pushes deployed models below the training-optimal size.",
 robot:"Robot foundation-model companies now claim their own scaling laws for robot data (for example, Generalist AI's GEN-0 reports, which are self-reported and not independently reproduced). Ask the Chinchilla questions of them: over what range, holding what fixed, and measured on what metric."},

flash:{n:5, mod:6, thread:"sys", year:2022, short:"FlashAttention",
 title:"FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
 authors:"Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré",
 venue:"arXiv 2205.14135 (May 2022); NeurIPS 2022",
 url:"https://arxiv.org/abs/2205.14135", pdf:"https://arxiv.org/pdf/2205.14135",
 why:"It teaches the single most useful systems idea for understanding LLM cost: on a GPU, moving data between memory levels is usually slower than doing arithmetic. FlashAttention speeds attention up without approximating it at all, purely by reordering the computation. Every modern training and inference stack uses its descendants.",
 bottleneck:"Standard attention writes the full n×n score matrix to the GPU's main memory (HBM), reads it back for the softmax, writes the result, and reads it again to multiply by V. For long sequences this memory traffic, not the FLOPs, dominates runtime, and the n×n matrix itself limits sequence length. Approximate sparse attention methods saved FLOPs but often did not run faster in wall-clock time.",
 contribution:"Compute exact attention in tiles that fit in fast on-chip SRAM, using an online softmax that can be updated one block at a time, and never write the n×n matrix to HBM. In the backward pass, recompute the attention tiles instead of storing them. Memory becomes linear in n and wall-clock time drops substantially.",
 prereq:"Paper 2's attention equation. Basic idea that a GPU has a small fast memory (SRAM, ~20 MB total) and a large slow one (HBM, 40–80 GB).",
 concepts:["Memory hierarchy: HBM vs SRAM bandwidth","Arithmetic intensity: FLOPs per byte moved","Online (streaming) softmax with running max and normaliser","Tiling and kernel fusion","Recomputation trades FLOPs for memory"],
 study:"§2.2 and Figure 1 (the memory hierarchy and where standard attention spends time). §3.1, Algorithm 1 (read with the online-softmax equations below until you can redo one block update by hand). Theorem 2 (IO complexity) for the statement, not the proof. §4 Tables 1–2 and Figure 3.",
 skim:"Block-sparse FlashAttention (§3.3) and the proofs in the appendix.",
 evidence:"End-to-end training speedups: about 15% on BERT-large over the MLPerf 1.1 record, up to 3× on GPT-2, and 2.4× on Long Range Arena. Longer context becomes affordable and improves quality, and it gives the first transformers to beat chance on the Path-X (16K) and Path-256 (64K) tasks. Output is exactly standard attention, up to floating-point rounding.",
 limitation:"It still does O(n²) FLOPs, so it makes long context affordable rather than free. The first version reached only part of the GPU's peak throughput; FlashAttention-2 (2023) and -3 (2024, for H100s) improved the work partitioning. Writing such kernels is specialised work tied to particular hardware.",
 checkpoint:"Explain why FlashAttention is faster even though it performs more FLOPs than standard attention in the backward pass. Then show how a softmax over a row can be computed correctly when you only see the row one block at a time.",
 lesson:`<h5>Conceptual primer</h5>
<p>An A100 GPU can do about 312 trillion bf16 FLOPs per second but read HBM at only about 1.5–2 TB/s. If an operation does fewer than roughly 150 FLOPs per byte it moves, the arithmetic units sit idle waiting for data. Softmax, masking and dropout do very few FLOPs per byte, so standard attention is <i>memory-bound</i>.</p>
<h5>The trick: online softmax</h5>
<div class="eq">For one query row, scores s arrive in blocks s⁽¹⁾, s⁽²⁾, …
Keep running max m, running normaliser ℓ, running output o.

New block s⁽ʲ⁾ with values V⁽ʲ⁾:
  m_new = max( m, max(s⁽ʲ⁾) )
  ℓ_new = e^{m − m_new} · ℓ  +  Σ e^{s⁽ʲ⁾ − m_new}
  o_new = e^{m − m_new} · o  +  e^{s⁽ʲ⁾ − m_new} · V⁽ʲ⁾
At the end:  output = o / ℓ          exactly softmax(s) · V</div>
<p>The factor e^{m − m_new} rescales everything accumulated so far whenever a larger score appears. Nothing has to be stored except m, ℓ and o, which fit in SRAM. Loading Q, K and V tiles once from HBM and writing only the output reduces HBM traffic from Θ(nd + n²) to Θ(n²d²/M), where M is the SRAM size.</p>
<h5>KV cache: the inference side of the same problem</h5>
<p>When generating, each new token attends to all previous keys and values, so they are cached. Worked example for a Llama-3-70B-like configuration (80 layers, 8 KV heads of dimension 128, bf16):</p>
<div class="eq">bytes per token = 2 (K and V) × 80 layers × 8 heads × 128 dims × 2 bytes ≈ 0.33 MB
128K-token context → ≈ 42 GB per sequence
Same model with 64 KV heads (no grouped-query attention) → ≈ 335 GB</div>
<p>Generation reads all the weights and the whole cache for every token produced, which is why decoding speed is limited by memory bandwidth and why GQA, quantization, PagedAttention and speculative decoding (Module 6 bridges) matter so much in practice.</p>
<div class="note think"><span class="eyebrow">Thought experiment</span>You need the maximum of a million numbers but can hold only a thousand at a time. You keep a running maximum. Softmax looks harder because each term is divided by a sum over all terms, but the sum can be kept as a running value too, as long as you rescale it when the maximum changes. FlashAttention is that observation, applied with care to the GPU's memory layout.</div>
<h5>Connections</h5>
<p><b>Before:</b> sparse and low-rank approximations that saved FLOPs but not time. <b>After:</b> FlashAttention-2/3, ring attention for context parallelism (used in Llama 3's training), and inference engines built around KV-cache management. The lesson carries over to robotics: on a Jetson-class board, memory bandwidth, not FLOPs, usually limits how fast a VLA policy can run.</p>`,
 evalLens:"Speed claims depend on hardware, sequence length, batch size and baseline implementation. Check which GPU, which lengths, and whether the baseline was a strong implementation. Here the authors compare against tuned PyTorch and the MLPerf record, which is fair.",
 cc:"Long agent sessions are expensive mainly through the KV cache and the repeated reading of a long context. Prompt caching, which Anthropic offers in its API, reuses computation for a repeated prefix such as a system prompt and tool definitions; that is part of why a harness keeps a stable prefix.",
 robot:"A policy that must act at 10–50 Hz has a fixed latency budget per step. Every technique here (fused attention, KV caching across control steps, quantization) is what makes a multi-billion-parameter VLA usable on a robot rather than only in a data centre."}
};
