---
id: TASK-1.2
title: Build-own NCF vs stay SCF-derived
status: To Do
assignee: []
created_date: '2026-07-27 05:44'
updated_date: '2026-07-27 06:38'
labels:
  - 'wayfinder:grilling'
dependencies: []
references:
  - >-
    D:\Git\platform_research_sessions\scf-prose-oscal\NIST OSCAL prose and SCF
    research.jsonl
  - >-
    D:\Git\ncf_platform-nimbalyst\source_files\PCF 2023-x-x Crosswalk DevModel
    v0.1-RECOVERED.xlsx
parent_task_id: TASK-1
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Question
Do we build a de-licensed, owned control framework (NCF) by parsing source standards (NIST 800-53 first) — or stay SCF-derived?

**Leaning (brief):** yes, own it — it's the keystone IP (the ~1,175-control Rosetta-stone crosswalk). Resolve the commitment and its immediate implications; informed by the SCF-licensing and parse-feasibility research tickets.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
OWNER CONTEXT (decision-critical):
- Current NCF was built from ComplianceForge SCF/PCF material the owner paid $50k+ to license. Owner's finding (see scf-prose-oscal session): ComplianceForge largely PARSED PUBLICLY-AVAILABLE documents and inserted proprietary terms to obfuscate the origin. Combined with the CC BY-ND + AI-derivative-ban finding (task-1.5) and NIST being public-domain/CC0 (task-1.4), the build-own thesis is strongly supported: de-licensing is reclaiming largely-public material, not inventing from nothing.
- CRUX — the de-license problem splits into TWO components:
  (a) CONTROL MAPPINGS / crosswalk — SCF-style mappings of own controls to NIST/CSF/ISO. 'Open source' but non-derivative-licensed under SCF.
  (b) PROSE — the control/policy narrative text authored by ComplianceForge (the paywalled part).
  Example to inspect: 'PCF 2023-x-x Crosswalk DevModel v0.1-RECOVERED.xlsx', worksheet 'PCF Policy - Standards', columns D, H, I.
- Implication for the decision: de-license = clean-room rebuild of MAPPINGS from public NIST OSCAL + author (or reclaim public) PROSE. These are two different build problems with different effort/risk profiles — the Canonical-source ticket (1.11) must treat them separately.
<!-- SECTION:NOTES:END -->
