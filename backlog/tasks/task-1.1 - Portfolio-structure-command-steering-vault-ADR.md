---
id: TASK-1.1
title: Portfolio structure & command-steering (vault ADR)
status: To Do
assignee: []
created_date: '2026-07-27 05:44'
labels:
  - 'wayfinder:grilling'
dependencies: []
parent_task_id: TASK-1
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Question
How does one vault-repo hold many workstreams, and how are Matt-Pocock skills scoped to one workstream at a time?

**Hypothesis (owner's lean):** *Monorepo, not polyrepo* — pull code from sibling projects into referenced subdirs; a **control plane** in-repo to start/stop apps for exploration; a **single backlog** tracking all moving pieces; components scoped by folder + a component: label.

**Resolve:** the exact convention — labels vs parent-tasks vs milestones for component scoping; folder/MOC layout per component; whether a dispatcher is also needed. Produce a vault ADR. Foundational: defines how every other ticket's output gets steered into a subdir/branch.
**Levers (from PROJECT-MAP):** (a) per-component repos; (b) vault MOC+folder scoped by name; (c) dispatcher.
<!-- SECTION:DESCRIPTION:END -->
