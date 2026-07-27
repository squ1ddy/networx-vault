---
id: TASK-2.10
title: 'INGEST: Concept-canvas + graph-thinking system design'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 06:52'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/concept-canvas.md
parent_task_id: TASK-2
ordinal: 23000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Canvas architecture v2, canvas legend, graph-capture system design, graph-thinking research brief (+ 6MB transcript). INFORMS: TASK-1.1 (portfolio/vault structure) + the substrate itself — holding knowledge as a graph/canvas (how the owner thinks best). ACTION: ingest; feed the Portfolio & command-steering ADR. Subagent parses the 6MB transcript.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/concept-canvas.md. Arc: short, well-run session (only ~5 human turns / 156 lines) — brief -> 4 tasks -> 3 parallel research agents -> synthesis -> v2 rewrite after user dropped Heuristica screenshots -> handoff. Designed an Obsidian-Canvas / JSON-Canvas graph-capture system over an llm-wiki + backlog.md stack. STRONG SALVAGE for TASK-1.1 (vault-as-graph invariants, directly reusable): additive-only / human-draws-edges; legend-as-externalised-ontology; node-scoped (never holistic) AI actions; fragments arrive as portals not merges; a single ~6-relation edge vocabulary shared between canvas edges and wiki typed-links. (Caveat: several depend on a then-unlanded page-type schema.) MISSTEPS: (1) committed to heavyweight deliverables off one fuzzy prompt, dispatched 3 agents with zero clarifying questions; (2) the screenshots holding the ACTUAL intent (a node-scoped prompt palette, not the map) arrived only after synthesis #1, forcing a v2 rewrite; (3) late tooling flail hunting a nonexistent write path. GRILLING LESSON: one up-front wayfinder question (research or build-spec? one artefact? reference material first?) would have surfaced the screenshots and eliminated the wrong-target pass.
<!-- SECTION:NOTES:END -->
