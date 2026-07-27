# OSCAL research wiki — session shape

_Source transcript: `D:\Git\platform_research_sessions\oscal\oscal-session-513d1239.jsonl` (762 JSONL records, ~2.9 MB). Output: 22-doc wiki `00-21` in `D:\Git\platform_research_sessions\oscal\`._

## At a glance

- **Surface:** Claude.ai desktop / Cowork session (not Claude Code). Cloud sandbox + remote-device file commits (`device_commit_files` to `D:\Git\platform_research\oscal\`) + Claude-in-Chrome for YouTube.
- **Span:** 2026-07-20 02:49 → 2026-07-22 17:44 (~2.6 calendar days, punctuated by at least one session-limit reset).
- **Only 12 real human turns** drove the whole thing — the rest is orchestration. Very high leverage per prompt.
- **Orchestration profile:** 21 `Agent` (subagent) dispatches, 23 `TaskCreate` / 31 `TaskUpdate` (disciplined todo tracking), 29 `Bash`, 40 Chrome `javascript_tool` calls (nearly all in the YouTube fight), 5 `device_commit_files` batches. Subagent transcripts preserved in `oscal-session-subagents/` (21 files).
- **Output:** 22 markdown docs, ~800 KB total, committed in 5 batches. Well-indexed (`00-index.md`), consistent frontmatter/summary discipline.
- **Verdict:** Mostly *disciplined* fan-out, not runaway. Scope grew but each growth was a deliberate user request. The real cost was tooling (YouTube/Chrome), not scope.

## Narrative arc

1. **L11 — kickoff.** User gives one rich brief: understand OSCAL basics→depth before building a GRC product, use subagents, output ingestible wiki markdown with Mermaid, plus a curated link list (NIST repos, awesome-oscal, Neo4j blog, ACSC ISM, GovReady-Q).
2. **Batch 1 (L25-57).** 10 `TaskCreate` + 10 parallel `general-purpose` subagents covering the core: overview, catalog/profile, implementation/assessment, metaschema, webinars, Neo4j graph, tooling, ISM, GovReady-Q, and a synthesis pass (→ docs 01-13). Clean map-reduce.
3. **First YouTube wall (L138).** User: "how can I make YouTube available to you." Assistant explains the sandbox outbound allowlist and offers 3 options (L162). User picks "option 2" *and simultaneously* adds a new research request (validate OSCAL controls against Azure/Entra/M365/firewall/MDR). **Session limit hit (L169).**
4. **Batch 2 (L177-223).** Validation-ecosystem extension: ScubaGear/Maester/Azure Policy, firewall/EDR/allowlisting, CAASM/estate discovery, then a pipeline-synthesis subagent (→ docs 14-17).
5. **L250 — the sharpest user turn.** "How are orgs bridging OSCAL definitions ↔ empirical telemetry? Is there OSS middleware? Papers/NIST guidance on the gap?" + points at `Safe-Security/signal`. Spawns bridge-middleware + telemetry-schema subagents and a **working PoC build** subagent (→ docs 18-19, `poc-code/`).
6. **L309-338 — product framing.** User connects `platform_research/` dir; assistant uses `AskUserQuestion` (L323) to force a market-wedge decision (Australia-first E8/ISM vs US FedRAMP) and spawns an OSS-strategy subagent (→ doc 20).
7. **Second YouTube wall (L402-431).** Chrome finally "available," but the extension registry keeps returning empty across L413/L426 — several failed reconnect round-trips over ~14 hours before it works.
8. **Batch 3 (L591-712).** With real transcripts finally captured, subagents *rewrite* the webinar notes (doc 08 had been reconstructed from slides), add the deep-dive video, and produce the closing reading-list/premise/atrophy doc (→ doc 21). Session ends with a request to export the JSONL.

## Key decisions made

- **Map-reduce topology chosen up front** — parallel research subagents + dedicated synthesis subagents, with the orchestrator holding only the todo list and commit state. This kept the 2.9 MB main transcript from drowning in raw research.
- **Documents-as-truth, graph-as-derived-index** storage stance (doc 09) rather than Neo4j-as-system-of-record.
- **Market wedge: Australia-first E8/ISM** over US FedRAMP, decided via an explicit `AskUserQuestion` (L323) rather than assumed.
- **"Extend, don't duplicate"** instruction baked into every batch-2/3 subagent prompt (each told to skim `00-index.md` + specific existing docs first) — a deliberate anti-sprawl guardrail.
- **Rewrite over append** when better sources arrived: reconstructed webinar notes were replaced with verbatim-transcript-based notes rather than layered on top.

## Missteps & dead-ends (approx turn positions)

- **YouTube/Chrome tooling saga — by far the biggest time sink.** Two separate walls: the sandbox network allowlist (L138-166) and then the Chrome-extension connection (L402-431). ~40 `javascript_tool` + 8 `navigate` + 3 `list_connected_browsers` calls, multiple failed reconnect explanations (L413, L426), spread across two days and a session-limit reset. Doc 08 was written **twice** (slides-based first, transcript-based later) purely because the video capture couldn't be sequenced early.
- **Blended requests inside a single turn (L166, L250).** The user repeatedly bolted a brand-new research track onto a tooling reply ("do option 2 … as the next step research adjacent validation projects"). This is where scope *grew* — each addition was reasonable, but there was no explicit checkpoint on whether the wiki should keep expanding or freeze.
- **Scope creep, but mostly controlled.** 22 docs is a lot, yet the growth was staged (13 → 17 → 20 → 21) and each stage was user-initiated with anti-duplication guardrails. The one genuinely speculative branch is the **evidence-pipeline / telemetry-bridge / PoC-code** track (docs 17-19 + `poc-code/`): a working PoC was *built* off a spec that itself came out of research, before the product's market wedge was even decided (that decision came later at L323). That's build-ahead-of-validation.
- **Session-limit interruption (L169→L173 "continue from where you left off")** — a soft dead-end forcing a resume, low cost here but evidence the batches were long-running.

## Where /grilling or /wayfinder would have helped (specific)

- **Before Batch 1 (at L11):** a wayfinder pass would have separated "understand OSCAL-the-FORMAT" (the durable, reusable deliverable) from "design an OSCAL-native GRC *platform*" (a much larger, speculative bet). The brief fused them; the session dutifully researched both, producing ~9 platform-strategy docs (13-20) whose shelf-life depends on a product that may never ship.
- **At L166 / L250 (blended turns):** grilling — "is this a new deliverable or a refinement of the current one? what would make you *stop* adding docs?" — would have caught the open-ended expansion. There was never a stated done-condition for the wiki.
- **Before the PoC build (L337):** grilling "what decision does a working PoC change *today*, given the market wedge isn't chosen until L323?" would likely have deferred `poc-code/` until after the wedge decision — avoiding build-ahead-of-validation.
- **At the first YouTube wall (L138):** a wayfinder "is video transcription on the critical path, or a nice-to-have we can quarantine and revisit once tooling works?" would have prevented ~2 days of intermittent Chrome-fighting and the double-write of doc 08. The video content was ultimately additive, not load-bearing — it could have been explicitly deprioritized instead of blocking twice.

## Salvage

**Reusable now — OSCAL-as-FORMAT (relevant to TASK-1.4 / TASK-1.11):**
- `01`, `02`, `03`, `04`, `05`, `06` — the format itself: three-layer stack, eight models, catalog/profile/SSP/component-def/assessment vocabulary, profile resolution. This is the durable core and directly feeds any task that must *read, emit, or map to* OSCAL documents.
- `07-metaschema-formats-versioning.md` — XML/JSON/YAML equivalence, Metaschema single-sourcing, datatypes, the four-tier validation story, semver history. **The reference for treating OSCAL as an interchange format** (schema/version handling for TASK-1.4 / TASK-1.11).
- `11-australian-ism-oscal.md` — concrete ISM OSCAL release shape (v2026.06.18); useful if a task ingests real-world OSCAL catalogs.
- `09-oscal-as-graph-neo4j.md` — the JSON→property-graph mapping and the "documents-as-truth" stance; relevant if OSCAL data needs to be indexed/queried.

**Out of scope for the format tasks — OSCAL-as-PLATFORM (do not pull into TASK-1.4 / TASK-1.11):**
- `12`, `13`, `14`-`20` (GovReady-Q post-mortem, product-design synthesis, validation-ecosystem survey, evidence-pipeline/telemetry-bridge, OSS strategy) and `poc-code/` — all premised on building a GRC *product*. Interesting context, but platform-strategy, not format spec. Keep quarantined from the format-conformance work.
- `21-reading-list-premise-future-atrophy.md` — meta/strategic (program sunset risk); reference-only.
