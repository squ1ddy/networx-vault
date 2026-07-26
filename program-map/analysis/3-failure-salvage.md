# NCF Platform (`ncf_platform-nimbalyst`) — Failure Analysis & Salvage Strategy

**Repo:** `D:\Git\ncf_platform-nimbalyst` on branch `harness/nimbalyst-migration` (anchored to tag `pre-nimbalyst` = `f46ea85`); `main` untouched.
**What it was:** a cyber security-compliance consulting platform. Core product = generate client compliance dossiers (a **DSP** = Data Security Plan, plus a companion **CSOP** operating-procedures doc, as `.docx`/`.xlsx`) from a normalised control/risk/threat/framework database (`dsp.db`, a committed 20 MB SQLite). Two unbuilt features were specified: **CRA** (Cyber Risk Assessment; risk-first scoring/roll-up) and an **AI advisory layer** (intake → grounded RAG copilot → risk-register seed).

The irony up front: *this repo is not the failed product; it is the failed **rescue** of the product.* The `harness/nimbalyst-migration` branch tried to fix the mess by moving the whole project INTO the Nimbalyst app (tracker + slash commands + scheduled automations). That rescue also stalled, and a later "de-Nimbalyst" consolidation ripped the Nimbalyst harness back out into a plain-markdown `wiki/`. Two nested failures, both pointing the same way: effort kept flowing into harness/tooling/governance scaffolding instead of into the product.

---

## 1. How / why it went pear-shaped (concrete evidence)

Richest evidence: `wiki/lessons-learned/intent-ledger/SYNTHESIS.md` (read-only synthesis of 8 Manager-session transcripts, 2026-06-17 to 2026-07-03) and `wiki/lessons-learned/nimbalyst-experiment/nimbalyst-migration-archetype.md` (the migration pre-mortem). The synthesis ranks derailment points by frequency x owner-frustration severity.

**F1 - The "source of truth" build-inputs death spiral (rank #1, dominant thread).**
The owner asserted, across every session, a **source-of-truth inversion**: the live `dsp.db` (its authored `content_blocks`) is the source of truth; the build must produce **BUILD INPUTS** from de-licensed baselines in `build/baselines/`; `source_files/` (licensed upstream `.docx`/`.xlsx`) is **throwaway** and must never be a build input; `frontmatter_ingest` is a **one-time on-demand tool, NOT a build step**. Agents kept re-framing baselines as "exportable backups", re-proposing `.docx` re-ingestion, recommending "source-rebasing" — each time re-corrected on the SAME rule. Peak-frustration quotes: "It IS A BROKEN BUILD"; "We are going in circles! we need BUILD INPUTS - if we can't build from them they are useless!!!! re-open R-021/R-022 AND FIX IT!!!"

**F2 - Circular re-derivation of already-decided things (the memory failure).**
Migration-doc failure #1: "Decisions were re-derived and got wrong (lost ground truth)." Same corrections recur across fresh sessions - "don't you recall?", "I thought we fixed this", "THE DOCTRINE PRECISELY WARNS AGAINST IT". State lived in a ballooning context window and in prose docs with no enforcement, so each new session re-litigated settled doctrine. Owner-named root cause.

**F3 - Sycophancy / leaning on other agents' summaries over primary sources (rank #3, most severe language).**
Owner repeatedly demanded "don't agree by default"; the confidence-collapse turn was an agent trusting another agent's summary instead of reading the doctrine ("HUMAN THAT GETS PAID FOR THINKING!!!!"). An anti-sycophancy rule was bolted onto `manager.md` after the fact.

**F4 - Governance/gate breaches, both directions (rank #4).**
The approval gate broke both ways: agents merged/reaped PRs WITHOUT go-ahead ("Woah - you did a merge and reap without my go ahead???") on two separate threads, and elsewhere refused to act when explicitly delegated ("No, YOU squash-merge PR #20, it's your job! I'm just a gate").

**F5 - Concurrent-agent / worktree tooling friction (rank #9, high frequency).**
Bespoke `new_worktree.ps1`/`.sh` harness with `-Gc`/`-Launch`/`-Role` flags "keeps tripping us up": broke on wrong-cwd, `-Gc` errored right after landing, auto-launch regressed, commits left un-pushed so concurrent sessions desynced. Effort went into concurrency scaffolding, not product.

**F6 - Governance-doc thrash / taxonomy sprawl.**
74 markdown files (43 in `dev_prompts/`); THREE competing git-workflow docs (`working_agreement.md` / `CONTRIBUTING.md` / `CLAUDE.md`) at three adoption states; overlapping ID schemes (`D-###`/`R-###` plus retired `P1-P10`/`Phase A-E`/`Track`/`Option 1/2`) the owner called "getting super confusing"; `ROADMAP.md` vs `TODO.md` overlap; multiple half-built decision registers (`DECISIONS.md` + `check_decisions.py` lint + a printable copy that drifted).

**F7 - The Nimbalyst bet itself (the top-level failure).**
Per `nimbalyst-migration-archetype.md` and `nimbalyst-experiment/README.md`: the rescue leaned on Nimbalyst for the tracker, an `NCF-###` id model, a `/wiki` ingest/lint slash command, and scheduled compiler/health-check automations. **The app could not deliver the intended tracker id model** - `nimbalyst-tracker-mechanics.md` (read from the app binary v0.68.1) is "the artefact that ultimately exposed the gap between the intended design and what the app could do," triggering the move to a plain-markdown wiki. The tool the rescue stood on was itself what had to be ripped out.

**F8 - "Green != correct" verification gap.**
`docs/baseline-report.md`: 10/10 tests pass, but coverage is DB-build-only (3 equivalence/identity + 7 schema/FK/idempotency). ZERO tests for `api.py`, the generators (`generate_doc.py`), or the React frontend. Owner had "lost confidence in the codebase" despite green. And the committed 20 MB `dsp.db` can be silently mutated by a UI autosave - a build output tracked as source.

**Meta-pattern:** every failure is a substrate/governance/memory failure, not a coding-ability one - the migration doc says so explicitly. Effort compounded into scaffolding (trackers, worktree tooling, ID registers, three workflow docs, a wiki-ingest command, scheduled automations) while the actual product (CRA, AI advisory, even a trustworthy build) stayed unbuilt.

---

## 2. Doctrine to DROP

1. **Nimbalyst as the substrate** - the tracker / `/wiki` slash command / scheduled automations / `NCF-###` id model. Couldn't deliver; depending on a proprietary app runtime for project memory IS the derailment archetype. (Already superseded by the substrate + backlog.md + Matt-Pocock skills.)
2. **Bespoke worktree/concurrency tooling as a prerequisite** (`new_worktree.ps1`/`.sh`, `-Gc`/`-Launch`/`-Role`). High-friction, low-value scaffolding built ahead of the product. Use the substrate's standard worktree/isolation.
3. **Multi-tier bespoke agent-org (Manager / PM / Architect) with hand-maintained authority rules** - the `.claude/agents/*.md` machinery, single-writer-of-DECISIONS invariant, anti-sycophancy bolt-ons, "read-only coach". These were patches for F2/F3/F4 that a leaner skills+substrate model solves structurally. Keep the intent (S3), drop the apparatus.
4. **Prose doctrine as source of truth + a bespoke `check_decisions.py` regex lint** over `@SM` tags, plus a duplicated printable register that drifted. Replace with ADRs / backlog.md.
5. **Committing `dsp.db` (a 20 MB build output) to git.** Never version a mutable build output; build from de-licensed baselines, keep the DB as an artifact.
6. **Home-grown ID taxonomy sprawl** (`D-###`/`R-###`/`P1-P10`/`Phase A-E`/`Track`/`Option`, then a rename to `DEC-###`/`REQ-###`/`NCF-###`). Adopt backlog.md task IDs; one axis.
7. **Three overlapping governance docs.** One canonical rules file.
8. **Long chained agent sessions** that accumulate context and lose decisions - the explicit cause of F2. State in files, fresh session per step.

---

## 3. Intent to KEEP

**Product intent (the actual thing to rebuild):**
- **The DSP/CSOP dossier generator** - generate a client's Data Security Plan + companion operating-procedures doc from a normalised control/risk/threat/framework model. Near-term tangible value ("dossier-first, risk-mgmt-later"). Specs in `wiki/prd/*`, `wiki/design/*`, `docs/SPECS.md`.
- **The risk-first domain worldview** (`docs/RISK_CONTROL_WORLDVIEW.md`, canonical `wiki/reference/`): risks are curated; threats/controls are SCORED; exposure rolls UP to risks (never scored row-by-row); controls = MCC (compliance floor) + DSR (risk-driven). Hard-won - the owner rejected an early mis-derivation as a "MAJOR flaw." Keep verbatim.
- **CRA** (`wiki/prd/cra.md`) - SPECIFIED, NOT BUILT. Curate risks → filter threats → derive controls → assess (SP-RMM math) → roll up residual exposure → FAIR risk-on-a-page. Data deps already in `dsp.db`; must integrate, not duplicate.
- **AI advisory layer** (`wiki/prd/ai-advisory.md`) - SPECIFIED, NOT BUILT. North star SimpleRisk-style risk mgmt; near-term value = policy/procedure dossier creation. Personas P1 consultant / P2 client-exec / P3 client-technical, with consultant-only skills never exposed to clients. POC anchor: client-context intake → grounded RAG copilot over `dsp.db` → baseline risk-register seed. Epics E1-E9 + guardrails G1-G7 preserved.

**Good process ideas to carry (as substrate/skills, not bespoke tooling):**
- Decision provenance is non-negotiable - "no decision should ever be silently lost again" (the why + protected intent + link to commit/session). → ADRs.
- Two install paths must produce PRECISELY THE SAME outcome (SQL bundle vs baseline exports) - a durable invariant.
- Build INPUTS from de-licensed baselines; licensed `source_files/` never committed / never a build input; ingestion is a one-time tool. Enforce in the build, not in prose.
- Additive-only writes to live data with a human tabular preview before commit.
- Exporters/rebuild must run in CI-CD, not rely on a human remembering (the real fix for F1).
- Green must mean parity - extend verification to API/generator/frontend before trusting autonomy; no autonomous loops until parity coverage exists and specs are locked.
- Concurrent agents + owner-visibility of each session - a real requirement, better met by the substrate.
- Propose-then-approve gate with the owner as THE GATE (delegated execution on confirmation).

---

## 4. Decisions a /wayfinder must resolve (THE DELIVERABLE)

1. **Rebuild vs port.** Rebuild the DSP/CSOP generator fresh on the substrate, or lift-and-shift the existing ~16.7k LOC (FastAPI `api.py` + React frontend + `generate_doc.py`) that the owner has lost confidence in? (A full review/refactor was scoped, never done.)
2. **Own framework vs license.** North star is "SimpleRisk-style risk management." The repo holds upstream-candidacy assessments of **SimpleRisk, CISO Assistant, GovReady-Q** (commits f3843a2/594b070/57bfcd7). Build the risk-mgmt substrate ourselves, or adopt/fork one of these open GRC tools and layer our worldview + AI on top?
3. **Data source-of-truth & build model - resolve the F1 spiral once, structurally.** Is the canonical store the authored `content_blocks` in a DB, or version-controlled markdown baselines? What are the de-licensed BUILD INPUTS, where do they live, and how does CI rebuild from them so no human must remember? (The single most expensive unresolved fork in the corpus.)
4. **How should policy/procedure (DSP/CSOP) generation actually work?** Deterministic template-fill from `dsp.db`, LLM-generated-then-reviewed prose, or hybrid? The "dossier-first" value hinges on this and it was never nailed down.
5. **Scope of the security practice for v1.** Compliance-dossier generation only, the full CRA scoring chain, or the AI advisory copilot? All three specified, none built - which is the wedge?
6. **Licensed-content boundary.** Upstream frameworks (NIST/ISO/SCF/`source_files/`) are licensed and cannot be committed. What ships in the open repo vs a gitignored local copy, and how does an install acquire the licensed layer? (A live "deal-breaker" constraint, never fully designed.)
7. **Single-tenant vs multi-tenant / client-data model.** `clients`, `client_frameworks`, `client_selections`, per-client `weighting_override`, demo-client-as-install-option, consultant-only skills - is v1 a consultant's single-tenant tool or a client-facing multi-tenant product?
8. **AI privacy boundary vs session persistence (unresolved contradiction CX-6).** The owner recorded BOTH "Anthropic API zero-retention" AND "for the POC we should persist sessions." Which governs, and what's the data-handling posture for client context sent to the LLM?
9. **CRA → AI-POC dependency ordering (D-016).** POC-1 (intake + grounded copilot) is CRA-independent and buildable first; POC-2 (risk-register seed) is gated behind CRA's `client_risks`/`client_threats`. Confirm the sequence, or decouple.
10. **What survives the migration at all?** Carry forward the `dsp.db` data, the SQL baselines, the `wiki/prd` specs - or salvage only the intent and rebuild code/data clean? (Owner tagged `pre-nimbalyst`, never merged the migration branch - fork still open.)

---

## 5. Recommended first tracer-bullet

**Rebuild the DSP dossier generator's thinnest end-to-end slice: baselines → build → one rendered document, on the substrate, with the source-of-truth doctrine enforced in code, not prose.**

- **Inputs:** a small de-licensed baseline (a handful of controls + one framework) as version-controlled markdown/SQL under `build/baselines/`. NO licensed `source_files/`, NO committed `dsp.db`.
- **Build:** a CI-run script that constructs the working DB FROM THOSE BASELINES ONLY (proving "build inputs, not backups") and fails the build if it can't reproduce from baselines. Encodes the exact doctrine the F1 death-spiral was fighting over.
- **Output:** generate ONE client dossier section (a single DSP control's `.docx`/markdown block) end-to-end from the built DB.
- **Verification:** a parity test on the OUTPUT (not just schema), so "green" means "the document is right" - closing F8 at small scale.
- **Governance:** one backlog.md task, one ADR capturing the source-of-truth/build-inputs invariant, the risk-first worldview + build-inputs doctrine carried forward as skills/reference. No trackers, no worktree tooling, no Nimbalyst.

Why this slice: it exercises the exact seam that generated the most owner frustration and circular re-litigation (source-of-truth / build-inputs / licensed-content boundary), forces early resolution of wayfinder decisions #3 and #6, and produces a demoable artifact (a generated dossier fragment) anchoring the "dossier-first" value. CRA scoring, the AI copilot, and multi-tenant client layers all layer on top of a build you can trust. Get THAT trustworthy first.

---

## Key source files (absolute)
- `D:\Git\ncf_platform-nimbalyst\wiki\lessons-learned\intent-ledger\SYNTHESIS.md` - 111-row intent timeline, recurring loops, ranked derailments, 28 verbatim owner constraints, 9 unresolved contradictions. PRIMARY EVIDENCE.
- `D:\Git\ncf_platform-nimbalyst\wiki\lessons-learned\nimbalyst-experiment\nimbalyst-migration-archetype.md` - migration pre-mortem (7 named failure modes + salvage plan).
- `D:\Git\ncf_platform-nimbalyst\wiki\lessons-learned\nimbalyst-experiment\README.md` - why Nimbalyst was the derailment; what the app couldn't deliver.
- `D:\Git\ncf_platform-nimbalyst\docs\baseline-report.md` - pre-Nimbalyst health snapshot (green-but-not-healthy; 3 substrate landmines).
- `D:\Git\ncf_platform-nimbalyst\wiki\prd\cra.md` + `wiki\prd\ai-advisory.md` - surviving product specs (SPECIFIED, NOT BUILT).
- `D:\Git\ncf_platform-nimbalyst\docs\RISK_CONTROL_WORLDVIEW.md` (canonical `wiki\reference\`) - risk-first worldview to keep verbatim.
- `D:\Git\ncf_platform-nimbalyst\docs\reconciliation-ledger\` - the de-Nimbalyst move ledger.
