# Session Shape: OSS vs Open-Weight LLMs + Domain Training

Source: `platform_research_sessions/wiki-ingest/open-source-llm-models-training/session-transcript.jsonl`
Ring 3 (low priority) · 14 lines / 7 user turns · single assistant, no tools · dated ~July 2026

## At a glance
- Q&A research session: user probes the open-weight vs fully-open-source distinction, then drills toward a concrete goal — self-hosted, fully-open, domain-tuned models (cyber security, risk/GRC).
- Clean funnel shape: broad taxonomy -> mechanics -> evidence -> vendor landscape -> buildable recipe. No corrections, no dead-ends, no tool use. Assistant answers were dense and internally consistent.
- Verdict: high-signal reference dump, low process-learning value. Salvage the facts; there's little to learn from the *shape*.

## Narrative arc
1. Definitions + landscape: open-weight (weights only; DeepSeek/Qwen/Llama/GLM/Mistral) vs fully-open per OSI OSAID 2024 (weights+data+code+recipe+checkpoints; OLMo/Pythia/BLOOM/StarCoder/LLM360). Paper list + a proposed all-open validation architecture.
2. "Park OSCAL" — user narrows scope. What weights *are* in practice; how to compare DeepSeek vs Llama 3 (config diff, controlled benchmarking, hardware efficiency, internals).
3. Primitives: RLHF, tensors, GGUF quantization, 4-bit vs 16-bit behavior, and how to fine-tune without catastrophic forgetting.
4. Evidence: can open-data models match frontier? (No absolute catch-up; gap closed at matched scale — DCLM, SmolLM, Olmo 3.) Economics, reverse-engineering methods, high-value public corpora.
5. Dataset taxonomy cleanup: corpora vs models vs post-training data, each tied to a proof model.
6. Niche outperformance evidence with commercial/nonprofit cases (text-to-SQL, function calling, translation, medicine, finance).
7. Landing: open-source alternatives to Predibase/Defog/Nexusflow/Together; concrete recipe to build fully-open domain models (cyber via Primus; GRC = self-built corpus).

## Key decisions (by the user)
- Explicitly parked the OSCAL-specific validation piece (turn 3) to focus on the general open-weight question.
- Steered from academic curiosity toward an actionable end state: build/train several fully-open, domain-tuned models internally (cyber security, risk management).

## Missteps & dead-ends
- None substantive. The session ran straight; no backtracking, no wrong turns, no rejected answers.
- Minor: user's turn-9 framing ("how do X datasets compare *for frontier models*") mixed categories (corpora vs models vs post-training data); assistant caught and corrected it with a taxonomy, and noted no frontier lab actually discloses using these. Self-corrected in-flight.
- Risk carried but never flagged loudly: every "beats GPT-4" claim is narrow / in-distribution, and several sources are vendor papers (LoRA Land/Predibase, Defog, DeepSeek's $5.6M). Assistant did caveat these, but they were never independently verified — treat as directional.

## Where grilling / wayfinder would have helped
- The session never pressure-tested the destination. The user drifted from "clarify a definition" to "let's train multiple domain models" without anyone asking: do we actually need self-hosted/fully-open, or is that ideology? What's the maintenance + eval cost vs a frontier API? A wayfinder pass would have forced the ring-placement question (this is Ring 3 — is a training program even in scope?).
- "Fully open lineage" was treated as a goal in itself (turn 14: Primus-on-Olmo "would be a novel publishable artifact"). Grilling would ask: who consumes that artifact, and is novelty a business reason or a vanity one?
- No cost/benefit anchor. "Hundreds to low thousands of dollars per domain model" ignores the assistant's own note that corpus curation + eval design (not compute) is the expensive part. That elision would not survive a grill.

## Salvage (facts worth keeping if a self-hosted-model decision ever arises)
- Distinction: open-weight = downloadable weights, secret data/code (licenses vary Apache/MIT to restricted community); fully-open (OSI OSAID 2024) = weights+data+code+recipe+checkpoints. Only fully-open enables bias tracing, contamination auditing, causal checkpoint interventions.
- Open-data ceiling: no fully-open-data model has caught the absolute frontier, but at matched scale/compute the gap is ~closed. DCLM-Baseline 7B ~64% MMLU (~Mistral-7B/Llama-3-8B) at ~6.6x less compute. Olmo 3-Think 32B ≈ Qwen-32B class and is the fully-open ceiling.
- Winning open stack (as of session): FineWeb-Edu + DCLM + The Stack v2 (pretrain) + Tulu 3 (post-train). Rule of thumb: FineWeb-Edu 60 / DCLM 40 mix.
- Fine-tuning safety recipe (anti-catastrophic-forgetting): LoRA/QLoRA, LR ~1e-5, 1-3 epochs, KL regularization to base, 5-30% general-data replay, and a per-checkpoint regression suite (MMLU/GSM8K/HumanEval/IFEval + safety refusals + task metric) watching for task-up/general-down.
- Quantization: Q8 ≈ fp16 (within noise); Q4_K_M ~1-3% drop on reasoning/code; Q2-Q3 degrades sharply. A well-quantized 4-bit large model usually beats a 16-bit smaller model at equal memory.
- Cyber is unusually well-served: Primus (Trend Micro, EMNLP 2025) — full-stack MIT/ODC-BY datasets incl. Primus-FineWeb 2.57B-token corpus (+~16% on cyber benchmarks); Foundation-Sec-8B (Cisco, open weights) reaches Llama-3.1-70B / GPT-4o-mini level on some tasks. Benchmarks: CTI-Bench, CyberMetric, SecEval, CISSP-style. Risk/GRC has NO equivalent corpus — would be self-built (NIST pubs, regulator guidance, standards) + synthetic instructions.
- Open toolchain (replaces Predibase/Defog/Nexusflow/Together): train = Axolotl / LLaMA-Factory / TRL+PEFT / Unsloth / torchtune; serve multi-LoRA = vLLM (Predibase's actual architecture) or LoRAX (Apache-2.0); data = HF Datasets + Distilabel + Argilla; eval = Inspect AI (UK AISI, MIT) or lm-evaluation-harness.
- Buildable recipe: base Olmo 3 7B/32B (fully open) or Qwen/Llama (more capable, less open) -> continued pretrain on domain corpus -> SFT + 20-30% Tulu 3 general mix -> optional DPO/reasoning distillation -> serve all domains as LoRA adapters on one vLLM -> gate every checkpoint on domain + general benchmarks. Budget: days on 4xA100/domain; real cost is curation + eval design, not compute.
- Watch-out for citing: DeepSeek-V3 "$5.6M" (contested), LoRA Land / SQLCoder / Gorilla "beats GPT-4" all narrow + in-distribution; Medprompt showed GPT-4 can reclaim medical gaps via prompting alone. Frontier wins as task distribution widens.
