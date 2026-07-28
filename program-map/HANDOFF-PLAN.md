# Handoff plan — finalise the substrate before building further here

_Created 28 Jul 2026, from the owner's @SM commentary on `MACRO-PROGRAM-STRUCTURE.md`. Purpose: stop piling program content into `networx-vault` until the framework (`knowledge-task-substrate`) and a proper numbered vault structure are finalised. This file curates the handoff briefs the owner will run — primarily **upstream** — in dependency order._

## The split principle

- **UPSTREAM = `knowledge-task-substrate`** — anything that should hold for *any* vault stamped from the framework (information architecture, record templates, ingest pipeline, downstream-sync, canvas/repo conventions). Finalise here first.
- **HERE = `networx-vault`** — program-specific content + cleanup, applied *after* the upstream capability exists so it isn't re-done.

## External dependency (already in flight)

**Downstream sync (substrate → stamped vaults).** The owner notes there is upstream work not cleanly pullable downstream yet, and it's being worked on. The plan treats this as an **external dependency**, not a fresh handoff: the HERE cleanup (below) is gated on it so improvements flow down rather than being hand-copied.

## Reference inputs to pull in (not yet ingested)

- `D:\Git\practice_poc` — well-defined operating-model content (EOS / People-Strategy-Execution-Cash).
- The giants to distil into the operating model: Jim Collins, Verne Harnish, Patrick Lencioni, Simon Sinek, Eric Ries (*The Lean Startup*, *The Startup Way*). Preference: **guardrails, not hard gated rules.**
- `https://johnnydecimal.com` — the numbered-ID scheme the owner wants (every record has an ID). Blend with **PARA + Zettelkasten** (owner wants a combination).
- `https://github.com/maleta/claude-sessions` — the claude-sessions ingestion approach to adapt (the capability that "keeps getting forgotten").
- The **AI Practice problem-statements + customer journey** (owner says these were under-explained; source: `platform_research_sessions/ai-practice/`).

## The handoff set (dependency-ordered)

| ID | Handoff | Where | Depends on | Output |
|----|---------|-------|-----------|--------|
| **HO-U1** | **Vault Information Architecture** (numbered IDs / Johnny Decimal + PARA+Zettelkasten hybrid + record types/templates) | UPSTREAM | — | IA spec + templates in the substrate; the keystone |
| HO-U2 | Claude-sessions ingestion pipeline (adapt maleta/claude-sessions) | UPSTREAM | HO-U1 (record types) | An ingest skill + a `session` record type |
| HO-U3 | Downstream-sync finish/coordinate (substrate → vaults) | UPSTREAM | — (in flight) | Clean pull-downstream mechanism |
| HO-U4 | Agent harness + observability/eval layer (validated prompt comparisons, benchmarking) | UPSTREAM (decided) | — | Basic, validatable agentic dev framework, reusable by every vault |
| HO-H0 | Deconstruct the 3 slides into linkable **graph nodes** (redraw as pieces) + draw the **AI-Practice problem-shape** box from the `ai-practice/` files | HERE | HO-U1 (for stable IDs) | Slides become linkable/prioritisable graph pieces |
| HO-H1 | Structure migration + cleanup here (process Inbox, relocate stray `.md`, apply templates, assign IDs) | HERE | HO-U1, HO-U3 | A tidy, ID'd `networx-vault` |
| HO-H2 | Re-ingest + re-home the corpus under the macro map, correct box assignments, prioritized; pull in the missing sessions + `practice_poc` + giants | HERE | HO-U2, HO-U1 | Corpus ingested where it belongs |
| HO-H3 | Rebuild the wayfinder map under the macro model | HERE | HO-H1, HO-H2 | A map that reports into the top-down view |

**Critical path:** HO-U1 → (U2, U3, U4) → HO-H0/H1 → HO-H2 → HO-H3. Upstream first.

_Prioritisation principle (owner): once the slides are graph nodes, priorities are set mostly by **raising knowledge-substrate quality** and deciding which **AI-Practice components are most fundamental** to move forward measurably._

### Re-homing correction (feeds HO-H2)
The earlier "corpus hangs under AI Practice" was too blunt. Correct assignments once re-ingested:
- **Financial exemplar** → Cyber Security Practice (regulatory/legal), not AI Practice.
- **OSCAL / threat-model agentic workflows** → cybersecurity overlays, not pure AI Practice.
- AI Practice keeps the genuinely AI-methodology sessions (bias/eval, problem-framing, the ai-practice deck).
- Re-ingest is deliberate now that the macro map exists.

## HO-U1 — Vault Information Architecture (keystone)

**Full runnable brief:** [`handoffs/HO-U1-vault-information-architecture.md`](handoffs/HO-U1-vault-information-architecture.md) — paste it into an upstream `knowledge-task-substrate` session. In short: audit the substrate + this vault's mess → decide a numbered ID scheme (Johnny Decimal) + PARA/Zettelkasten hybrid + record templates → output an IA spec + templates + migration note. Guardrail: reusable-framework-first; guardrails not hard rules.

## Naming / cleanup note
- Published-repo references to the operating model are kept neutral (EOS / the gated-experimentation framework, not a person's name); final label TBD.
- Update `MACRO-PROGRAM-STRUCTURE.md` → v2 folding in the @SM corrections (AI Practice decoupled; NOM = EOS substrate-box with People/Strategy/Execution/Cash branches; AI GRC ≠ Cyber GRC; FAIR not elevated). Do this as part of HO-H1 or immediately, owner's call.
