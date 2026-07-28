---
type: adr
title: Records are living and frontmatter-typed
created: 2026-07-25
updated: 2026-07-25
topic: substrate/architecture
tags: [adr, architecture]
source:
related: ["[[example-concept]]", "[[example-research]]"]
next:
status: active
---
# Records are living and frontmatter-typed

## Summary

An architecture decision, captured as a vault record so agents and the owner copy the shape.
It mirrors the repo's real ADR-0004. An `adr` states one decision, why it beat the
alternatives, and what living with it costs — Decision / Rationale / Consequence, kept
crisp. (The canonical, immutable copy of accepted decisions lives in `docs/adr/`; this vault
record is the working, linkable form.)

## Decision

Each record is **one markdown file that is its own single live home**, updated in place and
typed by a frontmatter `type` field (`idea`/`research`/`concept`/`prd`/`adr`) **rather than
by folder**. Maturation along the pipeline is a `type` field edit, not a file move. Provenance
and immutability come from **git history** (and frozen artifact originals), not from an
append-only supersession doctrine or a tamper-check layer.

## Rationale

- **Links must survive maturation.** Keeping one file means inbound wiki-links never
  break as a record grows up — verified in [[example-research]].
- **Type is a facet, not a place.** Boards, tables, and the canvas render type groupings as
  *views* over the single files, so there is no `ideas/`-vs-`concepts/` folder churn.
- **Git already is the provenance layer.** History answers "what did this look like earlier?"
  without inventing a second immutability mechanism.

## Consequence

- Organisation is **topic-first** (folders) with **type as a facet**; every board or canvas
  is a derived view over the single files.
- "What did the idea stage look like?" is a `git log` question, not a separate document — an
  accepted trade-off.
- Ergonomics need a plain-English `promote` verb over the field edit (see [[example-idea]]),
  since editing frontmatter by hand is the wrong altitude for the owner.

## Sources

- Repo ADR-0004 (`docs/adr/0004-living-frontmatter-typed-records.md`) — the real decision.
- [[example-concept]] — the ingest → promote loop that depends on in-place editing.
- [[example-research]] — evidence that links survive the field-edit motion.
