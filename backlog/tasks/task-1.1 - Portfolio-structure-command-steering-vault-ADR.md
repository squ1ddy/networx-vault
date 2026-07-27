---
id: TASK-1.1
title: Portfolio structure & command-steering (vault ADR)
status: To Do
assignee: []
created_date: '2026-07-27 05:44'
updated_date: '2026-07-27 08:29'
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

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
ADDED SCOPE (owner): the Obsidian vault structure as stamped is NOT working for the owner. Open meta-question: fix it in the framework repo (D:\Git\knowledge-task-substrate) itself, OR describe/dogfood the desired structure HERE first. RECOMMENDATION to resolve in this ticket: dogfood in THIS vault first — capture the desired structure as a grilled spec/ADR (drawing on the concept-canvas invariants: additive-only, human-draws-edges, legend-as-ontology, node-scoped AI actions, shared edge vocab). Only push a PROVEN structure upstream to knowledge-task-substrate; do NOT reactively edit the framework before the shape is validated on a real instance (this vault). So TASK-1.1 now covers: (a) monorepo + command-steering; (b) the vault/knowledge organisation that actually fits how the owner thinks (see the MACRO-model task); (c) the framework(substrate) vs instance(this vault) change-flow.
<!-- SECTION:NOTES:END -->
