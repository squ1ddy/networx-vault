---
id: TASK-2.11
title: 'INGEST: Claude-sessions ingest tooling'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 08:30'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/claude-sessions-ingest-tool.md
parent_task_id: TASK-2
ordinal: 24000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
A session about a tool for ingesting Claude sessions into a wiki/substrate (5KB). INFORMS: the ingest MECHANISM itself (meta — tooling for THIS corpus-ingest track). ACTION: evaluate whether this tool can automate the rest of the ingest track.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/claude-sessions-ingest-tool.md. 6-msg session that BUILT the session-ingest tooling itself: a Claude skill session-scanner (scan_code_sessions.py, scan_chat_export.py, build_bundle.py, SKILL.md), zipped + delivered. Correctly split: Code sessions = local JSONL (automatable) vs chat/Desktop = manual ~24h account export (human-in-loop, NOT automatable). AUTOMATION VERDICT (relevant to TASK-3 + the ingest track): PARTLY reusable — scan_code_sessions.py + build_bundle.py are the right tool to pull in for the Code-surface ingest, BUT prototype-grade (synthetic fixtures only) and need one verification pass on REAL D:\ transcripts before trusting. The delivered zip lives in the SOURCE session, not this repo — must be recovered/recreated here first. MISSTEP: "done" never defined as "runs on my real data"; riskiest unknowns (real transcript layout, real export schema) deferred to user and never closed; silently dropped the original live Code-capture hooks for a pull/scan model.
<!-- SECTION:NOTES:END -->
