---
id: TASK-1.4
title: >-
  RESEARCH: parse-a-standard feasibility + source-standard licensing (NIST
  800-53 first)
status: To Do
assignee: []
created_date: '2026-07-27 05:44'
updated_date: '2026-07-27 05:50'
labels:
  - 'wayfinder:research'
dependencies: []
references:
  - research/parse-feasibility-and-source-licensing.md
parent_task_id: TASK-1
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Question
Is parsing NIST 800-53 (and later CSF / ISO 27001) into a de-licensed control baseline feasible, and what are the licensing/redistribution terms of each source standard? Surface the facts the Build-own-NCF and Canonical-source-&-CI decisions wait on.
(AFK — resolved by a /research subagent on a throwaway research/ branch; findings captured back on this ticket.)
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
RESEARCH COMPLETE — findings in research/parse-feasibility-and-source-licensing.md (awaiting owner review).

Gist: NIST SP 800-53 Rev 5 = PUBLIC DOMAIN / CC0; official OSCAL JSON/XML/YAML incl. 800-53B low/mod/high baselines at github.com/usnistgov/oscal-content — fully redistributable. NIST CSF 2.0 = PUBLIC DOMAIN, machine-readable JSON+Excel via CPRT (csrc.nist.gov). ISO/IEC 27001:2022 = COPYRIGHTED by ISO, paid, all rights reserved; verbatim Annex A text/titles NOT redistributable — a crosswalk may use only control IDs + own paraphrase + NIST's public-domain OLIR mapping. FEASIBLE overall. FIRST TARGET = NIST 800-53 Rev 5 OSCAL JSON (structured, zero legal risk), then CSF 2.0 CPRT JSON; never parse ISO text. UNVERIFIED: exact ISO short-quotation (POCOSA) allowance.
<!-- SECTION:NOTES:END -->
