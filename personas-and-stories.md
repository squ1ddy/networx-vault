---
title: Personas & user stories
type: concept
status: living
---

# Personas & user stories

> **Living doc — updated in place, no supersession.** This is the single live home for the
> acceptance-criteria source. Records mature by editing this file; git holds the history. When a
> story changes, edit it here — do not append a superseding copy.
>
> _This is a template. Replace the placeholder personas and stories below with your own once you
> stamp a real vault, keeping this living-doc framing._

Context to load first: `CONTEXT.md` (glossary + record types), `BRIEF.md` (constraints),
`docs/adr/` (founding decisions). The stack: **Obsidian vault + backlog.md + Matt Pocock skills +
markitdown ingest / pandoc export + Telegram long-poll capture + Obsidian Canvas** (additive-only
agent proposals). Records are living, frontmatter-typed; **git is provenance** — no append-only
supersession, no tamper-check layer.

## Personas

### P1 — The owner
The person the vault belongs to. Drives the system in plain English (`user-verbs.md`) and wants
**zero-ceremony capture** so nothing is lost to friction. Fill in the owner's real working context
here — how they think, where and how they work, and any hard accessibility or workflow constraints
(these become acceptance tests, not nice-to-haves).

### P2 — A collaborator
A second human who may join later. Gets productive **from committed artifacts alone** —
`START_HERE.md`, the typed records, the canvas, the backlog board, session-log handoffs — because no
prior chat transcript will be there to help. Needs the vault to be self-explanatory and the record
types legible without a walkthrough.

### P3 — The task-worker agent
A headless or in-editor agent that executes **one scoped unit of work per session**. Ingests
sources, drafts records, decomposes PRDs into backlog tasks, and proposes canvas structure —
**additively only** (into a `⊕ Proposals` group, never rewriting the owner's nodes). Completes on
objective evidence; gate-worthy artifacts wait for the owner. Its authorship is distinguishable in
`git blame` via `Co-Authored-By` trailers.

## Example stories (self-contained, updated — this doc is the single live home)

Each story is a concrete "day in the life" walkthrough naming the real record types, the **Inbox**,
the **canvas**, and **backlog** tasks. These are generic placeholders — rewrite them for your own
work.

**US1 — Quick idea dump.** Mid-thought, the owner drops a raw idea into `Inbox/` (or, in a vault
session, asks the agent to stamp **one Idea record**, `type: idea`, into the relevant `topics/`
folder). Zero ceremony, no gate. Type is a frontmatter field, so maturing it later — editing `type`
from `idea` to `concept` — is a **field edit**, not a file move; git records the change.

**US2 — Ingest and correct a source.** The owner says *"ingest this PDF."* **markitdown** converts
it to markdown and lands it as an **Artifact** under `artefacts/` with a **sidecar note** carrying
frontmatter; the original is frozen (immutable by git history). The agent drafts a Research record
citing it. Reading it in Obsidian, the owner spots a misreading and **just fixes the paragraph in
the editor** — no agent, no ceremony. The Artifact stays untouched; the correction is a plain commit,
attributable via `git blame`. Provenance is the git history itself — no tamper-check, no supersession
diff.

**US3 — Braindump → sorted project.** The owner **braindumps** a few unstructured paragraphs
straight into `Inbox/` — QC-exempt, no filing decision. Later, in a vault session, the agent reads
the dump and proposes a **Concept record** (the project frame), a couple of **Idea records**, and
some **backlog tasks** created via `backlog task create "<title>" --ac "…" -s "To Do"`. Self-evident
placements land directly; anything gate-worthy waits for the owner. **The dump stays in `Inbox/` as
provenance.** On the canvas the owner lays out and links nodes by hand (agent proposals into
`⊕ Proposals` are additive-only — never imposing structure).

## Persona → story index

| Story | Personas | Real homes touched |
|---|---|---|
| US1 Idea dump | P1 | Idea record, `topics/` |
| US2 Ingest & correct | P1, P3 | Artifact + sidecar, Research record, git |
| US3 Braindump → sorted | P1, P3 | `Inbox/`, Concept/Idea records, backlog, canvas |
