---
id: TASK-1.7
title: 'Sequencing: DB-first vs parse-first'
status: To Do
assignee: []
created_date: '2026-07-27 05:45'
labels:
  - 'wayfinder:grilling'
dependencies:
  - TASK-1.2
parent_task_id: TASK-1
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Question
Rebuild from live.db first (fast usable POC + preserves the per-client token model), then de-license by parsing standards as the forward clean-up — or parse-first?

**Leaning (brief):** DB-first. Only meaningful once Build-own-NCF (task-1.2) commits to owning the framework, hence blocked on it.
<!-- SECTION:DESCRIPTION:END -->
