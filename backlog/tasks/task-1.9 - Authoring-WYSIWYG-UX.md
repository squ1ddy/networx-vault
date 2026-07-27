---
id: TASK-1.9
title: Authoring / WYSIWYG UX
status: To Do
assignee: []
created_date: '2026-07-27 05:45'
updated_date: '2026-07-27 06:53'
labels:
  - 'wayfinder:prototype'
dependencies:
  - TASK-1.3
references:
  - research/session-shapes/policy-docgen-poc.md
parent_task_id: TASK-1
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Question
What authoring UX do consultants need (Global-Master vs Client context, an Authoring section, token mgmt, bulk find/replace, the 20+ suite)? The biggest adoption risk — consultants will not use markdown-in-a-textarea. See ui-issues.txt.

Prototype-type: make a cheap concrete artifact to react to. Depends on the Stack decision (task-1.3).
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
EVIDENCE from the docgen POC session (see ref): a raw-textarea editor with a parser duplicating backend logic was built BEFORE the team realized (U51) consultants edit in Excel/Word and will not hand-edit markup. Confirms this ticket is the biggest adoption risk. Also salvage: the list-marker/token round-trip constraint means control fields must carry ZERO bold/italic/footnotes — a hard constraint on any authoring surface.
<!-- SECTION:NOTES:END -->
