---
id: TASK-1.6
title: 'RESEARCH: FAIR scoping — what would Ring-2 adoption actually require?'
status: To Do
assignee: []
created_date: '2026-07-27 05:44'
updated_date: '2026-07-27 05:50'
labels:
  - 'wayfinder:research'
dependencies: []
references:
  - research/fair-scoping.md
parent_task_id: TASK-1
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Question
Light scoping of FAIR risk quantification: what a minimal 'risk on a page' capability would require (data inputs, method, effort), enough to judge Ring-2-now vs Ring-3-later. Not a full FAIR build design.
(AFK — /research subagent.)
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
RESEARCH COMPLETE — findings in research/fair-scoping.md (awaiting owner review before this ticket resolves).

Gist: FAIR risk = LEF (TEF x Vuln) x Loss Magnitude; probabilistic, Monte Carlo'd to a loss range (FAIR Std v3.0 / Open Group O-RT+O-RA). Minimal inputs for ONE scenario = calibrated ranges (scenario def, threat event freq, control/vuln, loss magnitude) from SME estimation + internal incident logs + industry loss stats — not a dataset. Minimal build needs NO custom code: free Open FAIR Excel tool + FAIR-U Workbook; real gate is analyst calibration skill. Effort (UNVERIFIED): ~1-3 wks to stand up a reusable one-page template, ~0.5-2 days/client after; custom engine = months (Ring 3). Free base: Open FAIR BoK + guides + Excel tool + FAIR-U all free. LEAN: Ring 2 now, tightly scoped (one scenario, free tools, template output); defer custom tooling/portfolio aggregation to Ring 3 — high on-brand payoff, low effort, only cost is analyst fluency.
<!-- SECTION:NOTES:END -->
