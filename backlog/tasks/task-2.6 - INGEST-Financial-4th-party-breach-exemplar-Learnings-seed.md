---
id: TASK-2.6
title: 'INGEST: Financial 4th-party breach exemplar (Learnings seed)'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 08:30'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/financial-exemplar.md
parent_task_id: TASK-2
priority: high
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The worked exemplar: 4th-party source-code breach, APRA CPS 234/230 + SOCI regulatory/legal/case-law reference, a staged threat-model-agent prompt set, an IriusRisk prompt. The canonical Learnings-domain seed. INFORMS: AI-advisory input exemplar; NCF-I insurance/duty-of-care; threat modeling. ACTION: ingest as flagship worked example (small 27KB transcript).
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/financial-exemplar.md. Arc: 28-turn worked APRA CPS 234/230 + SOCI 4th-party-code-breach analysis — strong threshold-first framing, clause+source-linked regulatory build (t1-18), then a pivot into authoring threat-model tool prompts (Claude Code scout + IriusRisk Jeff) where trouble clusters (t19-28). Zero restarts, one pivot. SALVAGE (high value, feeds AI-advisory shelf + NCF-I underwriting narratives): a portable "regulatory obligation map" recipe — threshold gate -> clause+definition+source per assertion -> split by actor/regime -> gate adjacent regimes -> result-agnostic culpability thesis — plus a reusable document skeleton + prompt scaffolds. MISSTEPS: all were TOOLING-CAPABILITY claims caught by the user (asserted Claude Code cannot see AWS screenshots — wrong, it is multimodal; then got image-handling wrong again re WebFetch), plus an over-engineered mandatory-POC gate. Domain/legal work was rigorously cited. CAVEAT: re-verify any embedded agent-capability claims before reuse. GRILLING LESSON: one "are you sure? verify against docs before asserting a capability limit" pass at t20 kills the error before it repeats.
<!-- SECTION:NOTES:END -->
