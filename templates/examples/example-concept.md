---
type: concept
title: The ingest → promote loop
created: 2026-07-25
updated: 2026-07-25
topic: substrate/pipeline
tags: [concept, pipeline]
source:
related: ["[[example-research]]", "[[example-adr]]"]
next: /to-spec
status: active
---
# The ingest → promote loop

## Summary

The substrate has two motions that together move a rough input to shaped work: **ingest**
(bring outside material in as a typed record with provenance) and **promote** (mature that
record along Idea → Research → Concept → PRD in place). This note frames them as a single
loop and weighs how tightly to couple them. It is an explored option, not a committed
requirement — the committed shape would land as a PRD (see [[example-prd]]).

## Option

Model the flow as one loop with two verbs over a single living file:

1. **Ingest** — a URL, PDF, or braindump lands in `Inbox/`. A vault session (or the
   `harness-ingest` skill) stamps it as a typed record (usually `idea`), sets `topic:`,
   and records provenance. Frozen artifacts get a sidecar `source-note` (see
   [[example-source-note]]); the original stays immutable.
2. **Promote** — the same file grows up by a `type` field edit (ADR-0004). No copy, no move;
   git holds the history and inbound wiki-links stay intact.

The loop closes when a PRD hands off *out* of the vault to a `backlog` task.

## Trade-offs

- **One file, edited in place** keeps links and provenance stable and makes the canvas a
  true derived view — at the cost of leaning entirely on git for "what did this look like at
  the idea stage?"
- **Coupling ingest to promote** (auto-suggesting the next stage on ingest) is fast but risks
  promoting before a thought has been grilled. Keeping them as distinct, owner-invoked verbs
  is slower but preserves the "capture never stalls, maturation is deliberate" boundary from
  [[1-quickstart]].
- **Skill-driven vs. hand-driven**: the skills make the loop repeatable for agents, but the
  owner must still be able to run either step by hand with a template.

## Sources

- [[example-adr]] — records are living and frontmatter-typed.
- [[example-research]] — links survive the in-place edits this loop relies on.
- [[1-quickstart]] — the Idea → Research → Concept → PRD → Task pipeline.
