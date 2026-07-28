---
type: research
title: Are wikilinks a durable resolution target across vault moves?
created: 2026-07-25
updated: 2026-07-25
topic: substrate/link-integrity
tags: [research, links]
source:
related: ["[[example-reference]]", "[[example-adr]]"]
next: /grill-with-docs
status: active
---
# Are wikilinks a durable resolution target across vault moves?

## Summary

Records mature by a `type` field edit rather than a file move (ADR-0004), but folders
still get reorganised topic-first. This note investigates whether wiki-links survive
that churn, and what the reference-integrity lint actually guarantees. Observation,
inference, and recommendation are kept separate so a later reader can trust the boundary
between what was measured and what was concluded.

## Observation

- Obsidian resolves a wiki-link by **note name (basename)**, not by path, and auto-updates
  links when a file is renamed or moved *inside the vault*.
- The repo's `reference-integrity.mjs` builds its resolution index by registering every
  file under its `basename` (with and without extension) — so a link resolves if *any*
  file in the tree carries that name, regardless of folder.
- This mirrors the FAIR "Findable/Accessible" idea: a stable identifier (the name) beats a
  positional one (the path).

## Inference

- Because both Obsidian and the lint key on basename, moving a record between `topics/`
  folders does **not** break inbound links — consistent with the ADR-0004 promise that
  maturation and reorganisation are cheap.
- The failure mode is **name collision**, not movement: two notes sharing a basename make a
  a wiki-link ambiguous. The lint would still pass (a target exists), so it cannot catch this
  class on its own.

## Recommendation

- Keep promotion as a field edit and reorganisation as free folder moves — the evidence
  says inbound links hold.
- Treat **unique, descriptive note names** as a house rule, since neither tool flags
  collisions. Run the lint in CI to catch the broken-link case (see [[example-prd]]).

## Sources

- `vault-template/scripts/reference-integrity.mjs` (basename resolution index).
- [[example-adr]] — records-are-living / field-edit-not-file-move.
- [[example-reference]] — backlog + link-integrity gotchas observed while dogfooding.
