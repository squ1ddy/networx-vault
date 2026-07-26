# ncf_platform — Recovered Concept & /wayfinder Seed

Synthesis of three read-only investigations of `D:\Git\ncf_platform-nimbalyst` (2026-07-26). Full lenses: `1-vision-intent.md`, `2-code-poc-reality.md`, `3-failure-salvage.md`. Purpose: recover the intent + assets from the failed effort, and seed a `/wayfinder` session for rebuilding on the substrate.

## The headline reframe (this changes everything)

**It was not a product failure — the product works.** The dossier generator has *zero* nimbalyst dependency and passes its tests. What failed was **governance/tooling, twice**: the nimbalyst bet, then the *rescue* of it. The repo you pointed me at is not the failed product — it's the failed **rescue** of an earlier mess (a `nimbalyst-migration` branch that stalled, then a "de-nimbalyst" pass). You are **rescuing a working engine + an owned control framework from a bad harness**, not rebuilding from scratch.

## The vision (recovered)

- **North star:** an innovative, first-to-market **AI-driven security practice**. Two ordered layers: **near-term = client-ready policy/procedure DOSSIER generation** (dossier-first); **eventual = risk management** (FAIR "risk on a page") **+ AI advisory**.
- **Risk-first doctrine (verbatim):** *"Risk is primary; controls are the response … any design that treats the control set as the starting point is backwards."*
- **Own control framework**, because SCF/ComplianceForge content is **licensed / un-committable** → build only from **de-licensed baselines**, keep upstream local/gitignored, de-brand **PCF → NCF** ("Networx Control Framework").
- **Caveat:** there is **no single ratified vision doc** — the richest intent artifact is a reconstructed 8-session intent-ledger + `SYNTHESIS.md` with verbatim owner quotes and contradictions.

## What actually works — the assets to rescue

- **DSP/CSOP dossier generator** (10/10 tests green): FastAPI `api.py` + `generate_doc.py` → select controls → client-ready **`.docx` policies + multi-sheet `.xlsx` crosswalk**, zipped (`POST /api/outputs/batch`). Even solved footnotes via raw OOXML. React/Vite frontend builds clean.
- **THE CROWN JEWEL — `dsp.db` / `build/baselines/`:** 1,175 owned controls · 33 domains · 239 frameworks · **58,511 crosswalk mappings** · 1,175 CSOP procedures · 4,773 assessment objectives · **4 home-grown PCF-\* frameworks** (M&A, cyber-insurance, embedded, ransomware). **Reproducible from licensed source; equivalence tests prove build-from-baseline == the live DB.** Nimbalyst-independent, exportable as plain SQL/JSON. *This is the moat.*
- **Specified but never built:** CRA (risk-first scoring) and an AI advisory copilot (grounded-or-abstain, propose-don't-commit).
- **Fragility caveat:** the committed 20 MB binary `dsp.db` as source-of-truth is unsafe (a UI autosave can silently mutate it) — **carry the `.sql` baselines forward as canonical instead.**

## Why it went pear-shaped — and why the substrate already fixes it

The ranked failure modes (from `SYNTHESIS.md`) map almost one-to-one onto what the substrate we built this week was designed to prevent. **The substrate is the answer to why ncf_platform failed — the dogfood thesis, validated in reverse:**

| ncf failure mode | What the substrate does about it |
|---|---|
| **F1** source-of-truth / build-inputs death spiral (re-litigated 8+ times) | grill-once → capture as ADRs; the settled record ends re-litigation |
| **F2** circular re-derivation of settled decisions (owner's named root cause) | ADRs + backlog = **CI-not-human-memory**; decisions are durable |
| **F3** trusting agent summaries over primary sources | DoD: verify ACs with **objective evidence**, not summaries |
| **F6** doc/taxonomy sprawl (74 md, 3 workflow docs, ID sprawl) | `CONTEXT.md` single glossary; gospel-root docs; workflow-alignment |
| **F5** bespoke worktree-tooling friction | the dispatcher (TASK-57) encodes the worktree fix |
| **F8** "green ≠ correct" (build-only tests; mutable committed DB) | DoD demands behaviour-verified ACs; baselines-as-canonical |
| long chained sessions | context hygiene + `/handoff` + fresh-session-per-`/implement` |

**DROP:** nimbalyst, bespoke worktree tooling, the Manager/PM/Architect role apparatus, prose-doctrine-as-truth (`check_decisions.py`), committing `dsp.db`, ID sprawl, long chained sessions.

**KEEP:** the DSP/CSOP generator; the risk-first worldview; the CRA + AI-advisory specs; and the good invariants — build-inputs-from-de-licensed-baselines, two-install-paths-identical, decision-provenance, additive-only-with-preview, CI-not-human-memory, parity-before-autonomy.

## The /wayfinder decision list (the deliverable)

1. **Rebuild vs port** the existing ~16.7k LOC the owner has lost confidence in?
2. **Own framework vs license** — build risk-mgmt ourselves, or fork SimpleRisk / CISO Assistant / GovReady-Q (all assessed in-repo) and layer our worldview + AI on top?
3. **Data source-of-truth & build model** — DB `content_blocks` vs versioned markdown baselines; what are the de-licensed build inputs, and how does CI rebuild from them? *(the most expensive open fork)*
4. **How should DSP/CSOP generation actually work** — deterministic template-fill, LLM-then-review, or hybrid?
5. **v1 scope** — dossier generation only, full CRA scoring, or the AI copilot? *(which is the wedge)*
6. **Licensed-content boundary** — what ships open vs gitignored-local; how does an install acquire the licensed framework layer?
7. **Single-tenant vs multi-tenant** — consultant tool vs client-facing product?
8. **AI privacy vs session persistence** — the unresolved "zero-retention" vs "persist sessions" contradiction.
9. **CRA → AI-POC ordering** — build the CRA-independent POC first, or decouple?
10. **What survives migration at all** — carry forward `dsp.db`/baselines/specs, or salvage only the intent and rebuild clean?

## Recommended first tracer-bullet

The thinnest end-to-end slice, as **one backlog task + one ADR**: a small **de-licensed baseline → CI build-from-baselines-only** (fails if it can't reproduce) **→ generate ONE dossier section → an output-parity test.** It hits the exact seam that caused the most pain (F1/F8) and forces decisions **#3 and #6** early, while producing a demoable dossier fragment.

## How to run the wayfinder from here

Don't front-load exhaustive context — **these digests are the context.** Compose a one-page brief: the **destination paragraph** (dossier-first AI security practice, built on the rescued engine + owned NCF framework) + **the 10 tensions above**. Then `/wayfinder` charts the decision map, resolves each → `/to-spec` → `/to-tickets` → `/implement`. Per the earlier advice: destination first, tensions second, history as evidence-on-tap.
