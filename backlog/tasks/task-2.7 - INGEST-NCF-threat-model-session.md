---
id: TASK-2.7
title: 'INGEST: NCF threat-model session'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 08:31'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/ncf-threat-model.md
parent_task_id: TASK-2
ordinal: 20000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
NCF threat-modelling session (138KB). INFORMS: threat modeling; AI advisory. Relates to the financial exemplar threat-model-agent prompt set. ACTION: subagent parses for shape + reconcile with financial_example.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/ncf-threat-model.md. NCF threat-model session (Claude Code, Opus 4.8): pick a free threat-modelling tool, then build the Appendix B source-code-leakage model as an importable, board-ready attack-path artifact. Two-gate design; ~7h + 2 touch-ups. STRONG: 8 parallel tool-scout sub-agents, benchmark-validated pick (diagrams/D2 + MITRE Attack Flow + Navigator), reusable SSOT-emitter pipeline. BIG DEAD-END: 1h+ rabbit hole forcing output to render in the MITRE Attack Flow Builder GUI (.afb reverse-engineering, STIX dangling edges) — bug was upstream (Builder mirrorConnections/layout commented out, GitHub #149). Agent flagged "cant verify myself" at seq203 but the human had to force the pivot at seq268. OTHER MISSTEPS: jargon leakage (SSOT), over-reach on Appendix A assumptions, coverage gap (4/10 governance scenarios never visualised) caught late. SALVAGE (AI practice + NCF-I): SSOT->emitters method, parallel scout-eval harness, deploy-vs-instruct triage, attack-path-over-architecture visual convention, and an explicit anti-pattern: do NOT automate human-only GUIs, use the af CLI. GRILLING LESSON: a verifiability gate + stop-loss checkpoint kills the Builder detour early.
<!-- SECTION:NOTES:END -->
