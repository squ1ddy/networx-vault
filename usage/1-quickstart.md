---
title: Quickstart — follow the bouncing ball
type: reference
status: living
last_updated: 2026-07-24
tags: [usage, onboarding]
---

# Quickstart

The one-page path from "I have a thought" to "it's shaped work." No ceremony. Follow the ball.

## 1. Capture — never lose a thought

Drop it and move on. There is no filing decision at capture time.

- **Braindump** (fastest): write raw text straight into `Inbox/`. QC-exempt, no gate, no structure. This is the couch/mid-thought path.
- **Capture as a record**: start from a template in `templates/` (Idea, Research, Concept, PRD) to stamp one typed record — by hand, or ask a vault session to write it for you.
- **Tag the topic (optional)**: if you already know where it belongs, set `topic:` in the record's frontmatter or note it in the dump. If you don't, leave it. Never stall capture on placement.

Away from the desk, the Telegram capture path lands messages passively in `Inbox/` as `type: idea` notes. Everything in `Inbox/` stays there as provenance even after it's sorted out.

## 2. Mature it along the pipeline

Records grow up in place: **Idea → Research → Concept → PRD → Task**. Each stage has a template in `templates/`.

| Stage | What it is |
|---|---|
| **Idea** | raw thought worth keeping |
| **Research** | investigation grounded in sources (observation / inference / recommendation kept separate) |
| **Concept** | an explored option, not yet committed |
| **PRD** | a committed requirement with acceptance criteria |
| **Task** | a unit of implementation work (`backlog task create …`) |

Promoting a record is a **frontmatter `type` edit, not a file move** (ADR-0004). Changing that one field promotes the record; git holds the history; the file's links stay intact. Tasks are the handoff *out* of the vault — they live in `backlog.md` in the code repo. (A one-word plain-English promote/capture verb set is on the roadmap — `docs/roadmap/vault-vision.md`.)

## 3. Where things live

- **Organise topic-first** under `topics/` — one folder per initiative (e.g. `topics/<your-initiative>/`).
- **Type is a facet, not a folder.** There are no `ideas/` or `concepts/` folders. The frontmatter `type` field is the truth; boards, tables, and the canvas render type as a *view* over the single files (ADR-0004).
- One vault holds every initiative so links cross freely between them (ADR-0001). Confidentiality is handled by folders, never by splitting the vault.
- **Artifacts** (frozen PDFs, `.jsonl`, `oscal.json`) live in `artefacts/`, each with a sidecar note for its frontmatter.

## 4. The canvas is the thinking layer

When you need to *see* how pieces relate, open a canvas in `canvas/`. Nodes **embed record files** (never copies), you arrange them spatially, and you draw an edge when a link is earned. It's a derived view over records, not a second store — see [[canvas]].

## 5. Where to look next

- **[[user-verbs]]** — drive everything in plain English; the agent translates to tool syntax so you never memorise it.
- **[[tool-operations]]** — what the agent runs under the hood (backlog.md, markitdown in, pandoc out).
- **`BRIEF.md`** — the project context pack; load-me-first for who/why and the binding output standards.
- **[[personas-and-stories]]** — day-in-the-life walkthroughs (US1–US7) naming the real record types and homes.
