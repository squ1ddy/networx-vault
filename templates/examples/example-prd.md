---
type: prd
title: Reference-integrity lint in CI
created: 2026-07-25
updated: 2026-07-25
topic: substrate/link-integrity
tags: [prd, ci]
source:
related: ["[[example-research]]", "[[example-concept]]"]
next: /to-tickets
status: active
---
# Reference-integrity lint in CI

## Summary

Broken wiki-links and stray draft records erode trust in the vault as a substrate.
`reference-integrity.mjs` already reports them, but it only runs when someone remembers to.
This PRD commits to running it automatically so a broken link fails fast instead of rotting.
It is the committed shape of the recommendation raised in [[example-research]].

## What & why

**What.** Run `node vault-template/scripts/reference-integrity.mjs vault-template` on every
push and pull request via GitHub Actions, and fail the job on any *new* broken link.

**Why.** The lint's value is only realised if it is unavoidable. Link integrity is the load-
bearing property behind "records are living and linkable" ([[example-adr]]); manual runs
guarantee nothing. CI turns the lint from advisory into a gate, at near-zero ongoing cost.

## Acceptance criteria

- A CI job runs the lint on push and PR and is required to pass before merge.
- The job **fails on any broken link except the known `BRIEF` placeholder**, which is
  allowlisted (it resolves only in a stamped vault).
- Bare `TASK-NNN` prose references are reported but do **not** fail the build (backlog tasks
  live in the framework repo, not the vault).
- The job name and failure output make the offending file and link obvious to a human.

## Sources

- [[example-research]] — basename resolution and the collision failure mode the lint can't catch.
- `vault-template/scripts/reference-integrity.mjs` — the script being wired into CI.
- [[example-concept]] — the ingest → promote loop this gate protects.
