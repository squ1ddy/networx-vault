---
title: Worked examples — one well-formed record per type
type: reference
status: living
last_updated: 2026-07-25
tags: [usage, templates, examples]
---

# Worked examples

Copy-from exemplars showing house style for every record type. Each is a *filled* version
of the matching stub in `../` (the plain templates), grounded in real substrate dogfooding
rather than lorem ipsum. Read the one you need, then start from the plain template and match
its shape: a strong `## Summary`, correct unified frontmatter
(`type` / `title` / `created` / `updated` / `topic` / `tags` / `source` / `related` /
`next` / `status`), the per-type sections filled *well*, and a real `## Sources` block with
resolvable wiki-links.

| Type | Example | Template |
|---|---|---|
| Idea | [[example-idea]] | `../idea.md` |
| Research | [[example-research]] | `../research.md` |
| Concept | [[example-concept]] | `../concept.md` |
| PRD | [[example-prd]] | `../prd.md` |
| Reference | [[example-reference]] | `../reference.md` |
| ADR | [[example-adr]] | `../adr.md` |
| Source-note | [[example-source-note]] | `../source-note.md` |

The examples cross-link to each other on purpose — they trace one real thread (records are
living → the ingest/promote loop → link integrity → a CI gate), which is also what a healthy
patch of the vault looks like.

## House style, in one breath

- **Summary earns its place.** One paragraph that says what this record *is* and why it
  exists — not a restatement of the title.
- **Sections stay in their lane.** For `research`, keep Observation / Inference /
  Recommendation genuinely separate. Fill every section the template gives you.
- **Links are earned and resolvable.** Every wiki-link points at a note that exists.
  Promote is a `type` field edit, not a file move (see [[example-adr]]).
