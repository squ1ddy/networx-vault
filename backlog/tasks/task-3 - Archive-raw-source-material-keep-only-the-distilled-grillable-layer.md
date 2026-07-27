---
id: TASK-3
title: Archive raw source material; keep only the distilled grillable layer
status: To Do
assignee: []
created_date: '2026-07-27 08:29'
labels:
  - chore
dependencies: []
ordinal: 26000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
DESIRABLE (owner-flagged). Problem: the raw session material (large .jsonl transcripts in D:\Git\platform_research_sessions) must be preserved so its thinking/hypotheses/research can be consulted during a grilling — WITHOUT clogging the canvas or being re-parsed. PROPOSED MECHANISM (two layers): (1) DISTILLED / grillable layer stays in-vault = research/session-shapes/*.md + the salvage notes on TASK-2.* ingest tickets + the curated md already in some folders. This is what grilling consults. (2) RAW layer = zip the transcripts into an archive kept OUT of git (gitignored archive/ or stored beside the repo), with an in-vault MANIFEST (archive-manifest.md: what is in the zip, sha, which distilled artifact covers it). Re-parse only ever happens deliberately from the archive, never accidentally. OPEN: where the zip lives (in-repo-ignored vs external drive); whether to keep per-session zips or one. ACTION: confirm mechanism, then build zip + manifest.
<!-- SECTION:DESCRIPTION:END -->
