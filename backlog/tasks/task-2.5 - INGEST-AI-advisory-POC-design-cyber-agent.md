---
id: TASK-2.5
title: 'INGEST: AI advisory POC design (cyber agent)'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 08:30'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/ai-advisory-cyberagent.md
parent_task_id: TASK-2
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Standalone AU-statutory cyber ADVISORY POC design: RAG/KG over APRA CPS 234/230, SOCI, Privacy Act, case law; decisions D1-D8, CISO-Assistant deep-dive, Langflow leaning. Design phase, no build. INFORMS: the deferred AI-advisory shelf (Out of scope now: AI agents over control data) + the AI practice. ACTION: park as design record; small .jsonl (9KB) parses cheaply.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/ai-advisory-cyberagent.md. 27-record design record for an AU-statutory cyber ADVISORY POC (RAG + light KG over CPS 234/230, SOCI, case law). DESIGN phase, pre-build. DOMINANT TENSION: production instincts on a throwaway — every misstep (full 7-entity KG, spec sections 8/10, four UI entry points, custom-vs-monolith) shares that root, each corrected only after owner pushback. LIVE RISK: two sources of truth — the .md spec is PRE-de-scope (heavy), the .jsonl is authoritative (lean); reconciliation is only an open item, so a build could ship off the wrong spec. D2 thrashed custom->monolith->Dify->Langflow (two killed on LICENCE after technical scoring); landed Langflow (MIT, pip, native Anthropic). CISO-Assistant = corpus-backbone win but AGPL -> Strategy A (re-author, zero linkage) recommended. SALVAGE (feeds deferred AI-advisory shelf): lean stack + deterministic assemble_paper invariant + 0-fabricated-citations eval bar + single agentic-chat surface; model IDs deferred to build (claude-opus-4-8 via claude-api skill). GRILLING LESSON: front-load the eliminating constraint (permissive licence + inline code node); treat "throwaway" as a hard scope forbidder; licence-first OSS triage (also applies to TASK-2.8 open-source evals).
<!-- SECTION:NOTES:END -->
