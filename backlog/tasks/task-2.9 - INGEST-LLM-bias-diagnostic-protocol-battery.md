---
id: TASK-2.9
title: 'INGEST: LLM bias diagnostic protocol + battery'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 08:32'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/llm-biases.md
parent_task_id: TASK-2
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Bias diagnostic protocol, promptfoo bias battery, annotated bibliography, psych/neuro reading list (+ 760KB transcript). INFORMS: the AI practice / eval methodology (benchmarking agents; known biases — an Output-Standards concern). ACTION: ingest the bias protocol into the substrate quality/eval practice.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/llm-biases.md. ** FOLDER MISMATCH (headline) **: the exported .jsonl in llm-biases/ is NOT the bias session — it is an INFORMATION-ARCHITECTURE session (Karpathy LLM-wiki SSOT + Backlog.md), zero bias/promptfoo/sycophancy mentions. The 01-04 bias artifacts (bias protocol, promptfoo battery, bibliography) came from a DIFFERENT, un-exported session; only their .md outputs sit in the folder. => two provenance streams in one folder; the real bias transcript is missing. Actual transcript: ~7 turns, claude-fable-5, disciplined/evidence-honest (104-agent deep-research fan-out, 23/25 claims verified). SALVAGE SPLITS TWO WAYS: (a) transcript = IA/SSOT methodology (one canonical home + everything derived; duplicate-and-drift anti-pattern; bootstrap-with-verification; primary-source discipline) -> feeds TASK-1.1 vault structure + the concept-canvas invariants; (b) the 01-04 md files = the real bias/eval gold (sycophancy-vs-cognitive-bias rubric, rates-not-examples N>=20 protocol, run-metadata discipline, promptfoo battery) -> AI-practice eval methodology, but flagged UNAUDITABLE-PROVENANCE (not traceable to this transcript). MISSTEPS: 104-agent fan-out for an already-constrained decision; split record-homes walked back at L103; architecture bets on two small third-party repos with no exit strategy; no done-condition.
<!-- SECTION:NOTES:END -->
