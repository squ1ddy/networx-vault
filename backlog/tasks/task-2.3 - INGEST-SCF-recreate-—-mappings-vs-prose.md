---
id: TASK-2.3
title: 'INGEST: SCF recreate — mappings vs prose'
status: To Do
assignee: []
created_date: '2026-07-27 06:48'
updated_date: '2026-07-27 06:52'
labels:
  - ingest
dependencies: []
references:
  - research/session-shapes/scf-recreate.md
parent_task_id: TASK-2
priority: high
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Recreating SCF from scratch; establishes the mappings-vs-prose split + the ComplianceForge-obfuscated-public-material finding (2.5MB transcript). INFORMS: TASK-1.2 (build-own NCF), TASK-1.11 (canonical source & CI). ACTION: subagent parses .jsonl for the de-license approach + prose-vs-mappings evidence (see PCF crosswalk xlsx cols D/H/I).
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
SHAPE EXTRACTED -> research/session-shapes/scf-recreate.md. Arc: 11 days, 14 human / 316 assistant turns. deep-research -> source-tracing -> xlsx forensics -> PoC v1 (blind prose regen) -> PoC v2 (20-control) -> 2 accuracy walk-backs. Committed poc/prose_regen/ on ncf_platform main. ORGANIZING INSIGHT surfaced late (~L207): framework = mappings (public) + prose (proprietary); de-license = regenerate prose from NIST public-domain + free SCF, never redistribute. KEY SALVAGE: de-license regen recipe + runnable harness (feeds TASK-1.2); mappings-vs-prose model, open canonical sources + license map, 94% ISM-join numbers (feeds TASK-1.11). CRITICAL CROSS-CHECK: a sub-agent found the SCF text FREE in CISO-Assistant SCF mirror (corrected a self-contradiction). MISSTEPS: (1) hallucinated a verbatim ISO 27002 clause from memory, never read the paywalled standard (user caught it 550 lines later) -> reinforces the UNVERIFIED ISO flag on TASK-1.4; (2) burned ~4 turns on ISM fetch timeouts resolved instantly once the file was attached. Carry the ISO-attribution caveat as inferred/unverified.
<!-- SECTION:NOTES:END -->
