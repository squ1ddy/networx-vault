# LLM-biases folder — session shape

_Source transcript: `D:\Git\platform_research_sessions\llm-biases\conversation-export.jsonl` (184 JSONL records, ~744 KB, 129 real message events). Model: `claude-fable-5`. Surface: Claude Code (Skill/Workflow/ToolSearch/TaskCreate present)._

> **FOLDER MISMATCH — read first.** The task framed this as "a session producing a bias diagnostic protocol, a promptfoo bias battery, and psych-neuro reading list." **The transcript is not that session.** It contains **zero** occurrences of "bias", "promptfoo", "sycophancy", "neuroscience", or "cognitive". The exported conversation is an **information-architecture** session: designing a markdown-in-git single-source-of-truth (Karpathy-style LLM wiki + Backlog.md task tracker) for an agent-assisted codebase. The bias artifacts (`01`–`04`) in this same folder were produced by a **different, un-exported session**; only their polished MD outputs are present. The shape below describes the transcript that actually exists. Bias-artifact salvage is covered separately at the end from the `01`–`04` files, not from the transcript.

## At a glance

- **Real subject:** where to canonically store doctrine / knowledge / decisions / tasks / bugs / ideas / plans / designs for a solo→small-team codebase built with Claude Code + Codex on Windows/VS Code/git, without the duplicate-and-drift failure that killed a prior Nimbalyst attempt.
- **Span:** 2026-07-15 16:22 → 2026-07-16 (substantive work) + one session-limit reset (L78→L82 "continue"), then a gap to 2026-07-23 08:09 for the final "export to jsonl" request. ~1 working day of real effort.
- **Only ~7 real human turns** drove it (L3 brief, L103 consolidation pushback, L119 file-types, L144/L148 agent-heavy-lifting, L162 amend, L176 export). Very high leverage per prompt — same profile as the OSCAL session.
- **Orchestration profile:** 1 `deep-research` skill/Workflow (backgrounded, 104-agent fan-out, 22 sources, 25 claims verified), then 15 `Bash`, 8 `WebFetch`, 1 `WebSearch`, 3 `TaskCreate`/6 `TaskUpdate`, 2 `Write`, 1 `Edit`, 3 `SendUserFile`.
- **Outputs (delivered in-session as files, NOT the folder's `01`–`04`):** `information-architecture-report.md` (Phase-1 synthesis + type→canonical-home table + 4 candidate architectures + tradeoff matrix + recommendation), and `bootstrap-prompt.md` (paste-into-fresh-session kit: doctrine rules, directory layout, Mermaid diagram, 6 build steps, verb vocabulary).
- **Verdict:** Disciplined, well-scoped, evidence-honest. Little sprawl. The main risks are (a) the deep-research fan-out was heavy for a decision that was already fairly constrained, and (b) a fair amount of trust placed in two small third-party repos.

## Narrative arc

1. **L3 — kickoff.** Rich self-contained brief: pick an information architecture; hard constraint "one canonical home per information type, everything else is a derived view or reference"; explicit prior failure (Nimbalyst tracker DB duplicating the markdown wiki → drift).
2. **L8–L17 — dispatch deep-research.** Assistant invokes the `deep-research` skill/Workflow, backgrounds it across 5 angles (Karpathy LLM-wiki, gh-issue-sync / markdown-mirror, Obsidian plugin arch, agent-memory projects, GitHub Issues/Projects as canonical store).
3. **L21–L45 — harvest.** Workflow completes (104 agents, 22 sources fetched, 104 claims, top 25 adversarially verified → 23 confirmed / 2 refuted). Assistant mines the journal for supersession pattern, llm-wiki authorship model, etc.
4. **L49–L72 — gap-fill.** Three `TaskCreate`s (fill gaps / write report / verify+deliver). Targeted `WebFetch`/`WebSearch` to confirm GitHub Projects is a view-layer over Issues and that Obsidian Dataview renders derived views over markdown. One WebFetch blocked on a provenance/permission timeout (L62).
5. **L75–L98 — report.** Writes `information-architecture-report.md`; session-limit hit mid-write (L78), resumes on "continue" (L82); greps its own citation tags to tally verified vs unverified (L90-91: 6 `[verified]`, 6 `[verified, 3-0]`, plus several `[primary/blog/secondary, unverified]`), then delivers with an honest verification summary (L98).
6. **L103 — user pushback (the pivotal turn).** User accepts "Approach A" but rejects multiple homes for ideas/plans/decisions/designs/doctrine — wants all in the wiki, CLAUDE.md/AGENTS.md as *derived* outputs — and asks to confirm Backlog.md can ingest ideas/designs from wiki markdown. Points at two concrete repos: `lucasastorian/llmwiki` and `atomicstrata/llm-wiki-compiler`.
7. **L106–L115 — reconcile.** Fetches both repos + Backlog.md docs; concedes the consolidation but fights for two guardrails (per-section *ownership* even under a unified location; compiler owns `wiki/` so hand-authored records live canonically in `sources/records/`, not `wiki/`).
8. **L119–L140 — file-types deep dive.** "What file-type ingestion/output does atomicstrata support?" README-level WebFetch is thin (and one path hits `ROBOTS_DISALLOWED`), so assistant **clones the repo** and reads `docs/cli/ingest.mdx`, `export.mdx`, `connector.mdx`, `SOURCES_CONTRACT.md` for ground truth — good primary-source discipline.
9. **L144–L158 — bootstrap kit.** "What's needed so an agent does the heavy lifting; I don't want to learn backlog.md/compiler syntax." Writes `ncf-bootstrap-prompt.md`: MCP-self-teaching tools + generated AGENTS.md + Mermaid + 6 build steps + dummy idea→tasks→board round-trip verification.
10. **L162–L172 — amend.** User: strip `ncf_platform`. Only one reference existed (`ncf_platform/` in the dir tree → `<project-root>/`); file renamed `bootstrap-prompt.md`, re-delivered.
11. **L176–L184 — export.** User asks to export the conversation to `.jsonl`; assistant copies the session file out. (This is the file being analyzed.)

## Key decisions made

- **One canonical home per information type; everything else derived or a reference** — the user's hard constraint, adopted as the evaluation lens for every option.
- **Architecture "Approach A" — git-native markdown monorepo** as SSOT (over GitHub-canonical-tasks and other candidates). GitHub Issues explicitly deprioritized by the user ("don't care for now").
- **Consolidate all record types into one wiki tree** (user override of the report's separate `docs/{adr,plans,design,ideas}`), but **preserve per-section ownership and lifecycle rules inside it** — the assistant's retained guardrail.
- **Reconcile with the compiler's ownership model:** because `llm-wiki-compiler` owns and regenerates `wiki/`, hand-authored canonical records live in `sources/records/` and flow *through* the compiler — not authored directly into `wiki/`.
- **Backlog.md for task tracking** (markdown-SSOT with derived kanban), with digests/links from the wiki.
- **Agents learn the tools themselves over MCP** (`backlog instructions`, `llmwiki serve`) + a generated AGENTS.md/CLAUDE.md — so the human never memorizes CLI syntax.
- **Deliver a self-contained bootstrap prompt** with a built-in verification round-trip (idea→tasks→board) before handing over.

## Missteps & dead-ends (approx turn positions)

- **Heavy machinery for a semi-decided question (L8).** A 104-agent deep-research fan-out was launched on a brief that already stated the answer's shape ("one canonical home per type," markdown-in-git, Karpathy wiki). The research validated priors more than it changed the decision — arguably over-engineered discovery for a constrained choice. Cheap in tokens-to-user, but a lot of orchestration for confirmation.
- **Report structure had to be walked back at L103.** The report proposed separate `docs/{adr,plans,design,ideas}` homes; the user immediately rejected physical separation. The assistant recovered gracefully (recast it as lifecycle-not-location), but the split was avoidable had the "one home" constraint from L3 been taken more literally in the first draft.
- **Trust placed in two small third-party repos** (`lucasastorian/llmwiki`, `atomicstrata/llm-wiki-compiler`) as load-bearing infrastructure. The whole final architecture + bootstrap kit depends on them; maintenance/abandonment risk was not surfaced. Mitigated somewhat by cloning and reading real docs (L128-140) rather than trusting the README.
- **Two blocked fetches** — a provenance/permission timeout (L62) and a `ROBOTS_DISALLOWED` (L127). Both handled (WebSearch fallback; git clone fallback), minor cost.
- **Session-limit interruption** (L78→L82) mid-report; low cost, clean resume.
- **No stated done-condition.** The session ended when the user said "take it for a spin," not on a defined completion bar. Scope stayed contained only because the user's turns were tight.
- **Not a misstep in the transcript, but a data-integrity one for this exercise:** the exported JSONL was filed into the `llm-biases` folder, whose actual deliverables came from an unrelated session. Provenance of the `01`–`04` bias artifacts is unrecoverable from this transcript.

## Where /grilling or /wayfinder would have helped (specific)

- **Before the deep-research dispatch (L8):** a wayfinder pass — "the brief already names the pattern and the constraint; what specific *unknowns* would change Approach A vs B? Is a 104-agent fan-out the right instrument, or would 3 targeted fetches + a decision memo do?" — would likely have replaced the fan-out with a much cheaper, equally decisive pass.
- **On the report's directory design (before L75):** grilling "you split records into four `docs/` homes — does that satisfy the user's stated *one-canonical-home* rule, or does it re-introduce the very multiplicity they called a hard constraint?" would have caught the L103 walk-back before it shipped.
- **At L106 (adopting the two repos):** grilling "what's the blast radius if `atomicstrata/llm-wiki-compiler` is abandoned or breaks on Windows? Is there a no-dependency fallback that still satisfies markdown-SSOT?" — the architecture bet everything on two small repos with no exit strategy stated.
- **At L144 (bootstrap kit):** wayfinder "what is the smallest thing that proves this works before you build the full 6-step kit?" — the built-in round-trip is good, but the kit could have been validated as a 1-step spike first.
- **At L3 (framing):** a done-condition — "what artifact, in the user's hands, means this is finished?" — was never pinned; the session relied on user judgment to stop.

## Salvage

### From the transcript — IA / SSOT methodology (reusable in the AI practice)

- **The "one canonical home per information type, everything else derived or reference" lens** — a clean, reusable evaluation rubric for any knowledge/state architecture; directly transferable to how the practice structures its own vaults and doctrine.
- **Duplicate-and-drift as the named anti-pattern** (the Nimbalyst failure): two editable stores of the same *state* always drift; kanban/graph/CLAUDE.md must be *views*, not second copies. Good doctrine to bank.
- **Compiler-ownership reconciliation** (`sources/records/` canonical → compiler regenerates `wiki/`): a concrete pattern for "hand-authored truth + machine-generated presentation" without violating single-source.
- **Bootstrap-prompt-with-verification-round-trip** as an output standard: a paste-once kit that stands up *and self-tests* a system (idea→tasks→board round-trip) before handing over. Reusable template for onboarding any agent-maintained system.
- **Primary-source discipline under README-thinness** (L128-140): when docs are shallow or robots-blocked, clone and read `docs/*.mdx` / contracts directly rather than trusting summaries. Bank as an output standard.
- **Honest verification tallying** (L90-98): grepping citation tags to report verified-vs-unverified counts, and stating refutations (23/25 confirmed, 2 refuted) in the delivery. Good evidence-honesty standard.

### From the folder's `01`–`04` files — bias/eval methodology (separate session, but the actual "Learnings domain" gold)

- **`01-Bias-Diagnostic-Protocol.md`** — separates **sycophancy** (model bends toward the *user*) from **cognitive bias** (model bends toward the *framing*) and shows how they compound into a false "independent confirmation." Core rubric for LLM-output-trust work in the practice.
- **Rates-not-examples methodology** — N≥20 runs per condition, report percentages, because outputs are non-reproducible even at temperature 0 (batch-size dependence in GPU inference kernels, not RNG). "It anchored high in 17/20 runs" survives the "you got a weird one" objection; a screenshot does not. **This is a reusable eval output standard.**
- **Run-metadata discipline** — record model, version/snapshot, temperature, system prompt, date, and N for every run; never treat fixed temperature as "controlled." Directly reusable for any eval harness the practice builds.
- **`02-bias-battery-promptfoo.yaml`** — a runnable promptfoo battery; a ready template for a bias/eval test suite (anchoring, availability, confirmation, framing, gain/loss).
- **`03` / `04`** — annotated bibliography + psych-neuro reading list with load-bearing cited anchors (ELEPHANT arXiv:2505.13995 ~48% affirm-both-sides; SycEval arXiv:2502.08177 ~14.7% regressive / ~58% overall / ~78.5% persistence; arXiv:2509.22856 17.8–57.3% bias-consistent across 45 models / 2.8M responses). Reusable evidence base for the AI-trust practice.

_Caveat on `01`–`04`: these were not produced by the analyzed transcript, so their internal claim-verification provenance cannot be audited from this session. Treat the cited rates as needing independent confirmation before external use._
