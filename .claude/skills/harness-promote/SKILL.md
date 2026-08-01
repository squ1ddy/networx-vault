---
name: harness-promote
description: Promotion — take a *triaged* Companion Document and turn its remaining elements into their destinations: typed vault Records (from templates, in topics/<topic>/), Artifact+provenance citations (frozen, off-graph), and ingest-ready backlog todos. Then freeze the session originals. Invoke as /harness-promote.
disable-model-invocation: true
---

# /harness-promote — Companion Document → typed records

Second half of the ingest MVP. `/harness-ingest` (TASK-49) produced a
**Companion Document** — a verbose narrative digest whose every element is
inline-tagged with `source:`, `topic:`, `promote:`, and optional `pre-skill:`.
This skill turns a **triaged** Companion Document into the graph. Read
`CONTEXT.md` for the ubiquitous language (Record, Artifact, Action annotation,
Promotion) and `docs/adr/0004` + `0006` for the record model before you start.

**Capture fat, promote lean.** Ingest kept everything; promotion is the lean
pass that only carries forward what the human kept.

## Precondition — triage

The Companion Document must already be **triaged by a human**: kept elements
remain in the document; the rest were **deleted** (default-delete). You do not
decide what to keep — you promote what is left. Default-delete is safe because
the frozen session originals make any non-promotion reversible by re-ingest.

## What promotion does, per element

Each remaining `**[Element]**` carries a `promote:` tag naming exactly one
destination. The script `scripts/promote.mjs` reads the document and acts on
each:

- **Record** (`promote: Record (idea|research|concept|prd|reference|adr)`) →
  a typed record file from the matching `vault-template/templates/` shape, in
  the derived `topics/<topic>/` folder. Frontmatter is filled: `type`, `title`,
  `created`, `topic`, `tags`, `source` (→ the frozen Companion Document),
  `next` (the type default, or the element's `pre-skill:` if it set one),
  `status: active`. The element's prose becomes the **Summary**; the per-type
  section skeleton is stubbed. **Enumerable body → one record per item** (the
  linkability test, ADR-0006): a top-level list becomes one record per item so
  each is independently linkable.
- **Artifact + provenance** (`promote: Artifact + provenance`) → the cited
  source is **frozen** under `artefacts/<name>/` and **cited from Sources**. No
  graph record is created — this is evidence you link *to*, not knowledge.
- **Action annotation** (`promote: Action annotation`) → a **backlog todo
  labelled `ingest-ready`** capturing the next-step. **Not** a vault record.

## Freeze on completion

After promoting, the script **freezes the session originals** — the `.jsonl`,
`transcript.md`, the Companion Document, and every sibling artefact — from
`Inbox/ingest-backlog/<name>/` into `artefacts/<name>/`, and the records'
`## Sources` links point at the frozen locations. The Inbox session folder is
emptied. This is the immutable Artifact-provenance layer (ADR-0004: git owns
provenance); the freeze is what makes default-delete reversible.

## How to run

```bash
node scripts/promote.mjs <name> [--vault <path>] [--doc <file>] [--no-backlog]
```

- `<name>` — the session folder under `Inbox/ingest-backlog/<name>/` (the
  session identity from ingest). The Companion Document is auto-located as the
  session's non-transcript markdown; override with `--doc`.
- `--no-backlog` — plan the `ingest-ready` todos without creating them (prints
  the argv); use where the vault has no backlog yet, or to dry-run.

The script prints a summary (records created, artefacts cited, todos, originals
frozen). After it runs, sanity-check with the vault's reference-integrity lint:

```bash
node scripts/reference-integrity.mjs .
```

Expect no broken wiki-links (Sources resolve to the frozen artefacts) and
no unexpected attention flags.

## Judgment calls this skill encodes

- **`topics/<topic>/` placement.** The `topic:` tag is a **soft hint**
  (CONTEXT.md, ADR-0006), not a binding assignment. The script slugifies it into
  `topics/<slug>/` and **defaults to `topics/inbox/`** when a record has no
  topic — so a record is never dropped on the floor; it lands somewhere clearly
  triageable. Move records between topic folders freely afterward: type is a
  frontmatter facet, not a folder (ADR-0004), so re-homing is a file move with
  no field churn.
- **The linkability test decides record granularity.** An enumerable element is
  split one-record-per-item because each item is independently linkable; a prose
  element stays a single record. Over-atomising is costly to reverse; a
  non-linkable Section has no inbound links, so under-splitting is cheap to fix
  later (ADR-0006). When unsure, prefer fewer records.
- **`pre-skill:` sets `next`.** A record's `next` field is the recommended next
  skill that makes it actionable. The type default (e.g. `/grill` for an idea)
  applies unless the element's `pre-skill:` tag named a different one — that is
  the human's per-element recommendation and it wins.

## Principles

- **Do not invent provenance.** A `source:` that isn't a real sibling file in
  the session folder (a URL, DOI, or external reference) is **cited verbatim**,
  never fabricated into a frozen artefact.
- **Freeze, don't copy-then-orphan.** Originals move into `artefacts/<name>/`;
  the Inbox session folder is left empty, and Sources point at the frozen set.
- **Backlog CLI only for todos.** Action annotations become `ingest-ready`
  backlog tasks via the CLI (a `|` pipe in a description breaks the npm `.cmd`
  shim, so pipes are rewritten to `/`).
