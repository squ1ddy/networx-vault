---
id: TASK-2.2
title: 'INGEST: Policy docgen POC session'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 06:53'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/policy-docgen-poc.md
parent_task_id: TASK-2
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Initial POC of the dossier/policy document generator (20MB transcript). INFORMS: TASK-1.3 (stack), TASK-1.7 (DB-first sequencing), TASK-1.8 (rebuild-vs-port). ACTION: subagent parses the huge .jsonl for shape + decisions + missteps.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/policy-docgen-poc.md. Arc: began as a light "confirm-the-schema-first" SQLite POC to generate cyber-policy .docx; slid within ONE planning thread into a full React+FastAPI NCF Platform (control selection, MCC/DSR, tokens, CSOP, WYSIWYG, exports); ended unfinished at a handoff prompt. Signals: 5,879 lines, ~74 user turns, 10 CONTEXT COMPACTIONS in 5 days, Bash 401 / Edit 295, "port" ~100x + "revert" ~20x (Vite/uvicorn + encoding churn). MISSTEPS: (1) scope creep schema-POC -> React SPA (U9->U20) with no in-scope gate; (2) the "consultants edit in Excel/Word — a raw textarea is not human-editable" WYSIWYG realization arrived only at U51, AFTER building a textarea editor whose parser duplicated backend logic -> directly validates TASK-1.9 Authoring-UX as the biggest adoption risk; (3) CSOP ingested with no UI after lengthy planning. GRILLING LESSON (turn 1): one question — is a web UI in scope for the POC or later? what is the POC actually proving? — would have blocked the React build and most downstream cost. SALVAGE (reusable): DSP/CSOP domain model, MCC/DSR workflow, and the verbatim list-marker/token round-trip constraint (zero bold/italic/footnotes in control fields) — feeds TASK-1.3 / 1.7 / 1.8 / 1.9.
<!-- SECTION:NOTES:END -->
