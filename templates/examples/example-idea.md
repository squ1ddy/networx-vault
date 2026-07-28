---
type: idea
title: One-word plain-English promote verb
created: 2026-07-25
updated: 2026-07-25
topic: substrate/vault-ergonomics
tags: [idea, ergonomics]
source:
related: ["[[example-concept]]"]
next: /grill
status: active
---
# One-word plain-English promote verb

## Summary

Promoting a record today means editing the frontmatter `type` field (ADR-0004). That
is the right *mechanism*, but "edit the `type` field" is not something the owner should
have to think in. There should be a single plain-English verb — `promote this` — that
the agent translates into the field edit, mirrors into any board/canvas view, and stamps
the `updated:` date. Capture should get the same treatment (`capture this`). The point is
to keep the ergonomic surface at the level of intent, not tool syntax.

This is a raw thought worth keeping, not yet a committed requirement. The obvious next
step is to grill it: does one verb cover idea→research→concept→prd, or do the stages
need distinct verbs? What happens on an invalid transition?

## Sources

- Ergonomics gap noticed while writing [[1-quickstart]] ("a one-word plain-English
  promote/capture verb set is on the framework roadmap").
- Builds on the field-edit-not-file-move rule in [[example-adr]].
