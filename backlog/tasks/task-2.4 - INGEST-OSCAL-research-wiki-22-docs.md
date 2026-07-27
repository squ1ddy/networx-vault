---
id: TASK-2.4
title: 'INGEST: OSCAL research wiki (22 docs)'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 06:53'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/oscal-research.md
parent_task_id: TASK-2
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
22-doc OSCAL wiki (00-21): fundamentals to model deep-dives to validation ecosystem, product-design capstone (doc 13) + evidence-pipeline capstone (doc 17). INFORMS: TASK-1.4 + TASK-1.11 — OSCAL is the FORMAT NIST 800-53/CSF ship in (the de-license parse target). NOTE: OSCAL-as-a-platform stays Out of scope; OSCAL-as-a-data-format is IN. ACTION: ingest docs 13 + 17; subagent can parse the 2.9MB transcript for missteps.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/oscal-research.md. Arc: one rich brief (L11) fanned into a DISCIPLINED map-reduce — 21 subagents in 3 staged batches (core 01-13 -> validation 14-17 -> telemetry/OSS/reading 18-21), 5 commit batches, ~2.6 days. Only 12 human turns; todo tracking + "extend dont duplicate" guardrails kept 22 docs from true sprawl (the best-run of the four big sessions). SALVAGE SPLIT (clean): docs 01-07 (+09, 11) = reusable OSCAL-as-FORMAT core -> feeds TASK-1.4 / 1.11 (the parse target); docs 12-21 + poc-code = OSCAL-as-PLATFORM -> stays Out of scope. MISSTEPS: (1) YouTube/Chrome tooling saga — sandbox allowlist then dead Chrome-extension, ~40 javascript_tool calls over 2 days, doc 08 written twice; (2) blended user turns bolted new tracks on with no done-condition for the wiki; (3) a PoC built at L337 before the market wedge was chosen at L323. GRILLING LESSON: at the first YouTube wall (L138), one question — is video transcription on the critical path or a nice-to-have to quarantine? — saves 2 days.
<!-- SECTION:NOTES:END -->
