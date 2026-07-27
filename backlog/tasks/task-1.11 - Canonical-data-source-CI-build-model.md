---
id: TASK-1.11
title: Canonical data source & CI build model
status: To Do
assignee: []
created_date: '2026-07-27 05:45'
updated_date: '2026-07-27 06:38'
labels:
  - 'wayfinder:grilling'
dependencies:
  - TASK-1.2
  - TASK-1.7
  - TASK-1.4
parent_task_id: TASK-1
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Question
What are the de-licensed canonical baselines, and how does CI rebuild NCF from parsed sources? The most expensive fork.

Blocked on: Build-own-NCF (task-1.2), Sequencing (task-1.7), and parse-feasibility research (task-1.4).
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Treat the build as TWO input pipelines (from task-1.2 owner context): (a) control MAPPINGS — rebuildable clean-room from public-domain NIST 800-53/CSF OSCAL JSON; (b) PROSE — the ComplianceForge-authored narrative, which is the genuinely paywalled/derivative-risk part and needs its own clean-room authoring (or public-source) strategy. CI build model differs per pipeline.
<!-- SECTION:NOTES:END -->
