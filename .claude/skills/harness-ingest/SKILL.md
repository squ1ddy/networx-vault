---
name: harness-ingest
description: End-of-session ingest — read a Session folder (a .jsonl session export plus sibling artefacts) and produce a Companion Document, a verbose narrative digest with every element source-tagged and given a promotion recommendation. Invoke as /harness:ingest.
disable-model-invocation: true
---

# /harness:ingest — Session → Companion Document

> **FIRST DRAFT (TASK-49).** The two outputs and the promotion-recommendation
> model are settled; the exact **body-section taxonomy** and the **Claude
> Desktop export** handling are still open (see "Open questions" at the end).
> Do not treat the section list below as final — it is a working starting point.

Ingest one **Session folder** and emit a **Companion Document**. Ingestion is
the seam between a conversation and the Vault: it captures the session *fat*
(verbose, high-fidelity) so that later **promotion** can be *lean*. This skill
produces the digest only — turning its elements into actual records is a
separate step (TASK-50). Read `CONTEXT.md` for the ubiquitous language
(Companion Document, Promotion, Action annotation, Session folder, Record,
Artifact) before you start; the definitions there are authoritative.

## Inputs — the Session folder

A **Session folder** holds one session `.jsonl` plus any sibling artefacts
(saved tool outputs, exported files, pasted docs). It is **origin-agnostic**:
it may come from a live Claude Code session or a hand-saved Desktop export — you
read whatever is in the folder. **Drop the whole folder into
`Inbox/ingest-backlog/` and give it a human-meaningful name** (e.g.
`claude-sessions-ingest`), never a bare UUID — that folder name (`<name>`) is the
session's identity everywhere downstream.

1. **Render the transcript first (Output #1).** Run the deterministic renderer
   so you read a clean, readable conversation rather than raw JSON:

   ```bash
   node scripts/transcript.mjs <session.jsonl> \
     --out <vault>/Inbox/ingest-backlog/<session>/transcript.md --commit-base <repo-url>
   ```

   The transcript renders tool calls inline, links git commits, and links
   oversized/latest tool outputs as attachments. It is a mechanical render, not
   a digest — but it is your primary reading surface.

2. **Read the sibling artefacts** in the folder (PDFs, exported code, saved
   outputs). Treat each as a candidate **Artifact** (frozen source).

## Output — the Companion Document (Output #2)

A single markdown file. **Deliberately verbose narrative prose**, not a checkbox
ledger — err on capturing too much. Structure, in order:

1. **`## Summary`** — first. A cohesive narrative of what this session was
   about, what was decided, what was produced, and what remains open. Written to
   be read on its own.

2. **Typed body sections** — the middle. Group the session's substance into
   readable sections. Working starting set (NOT final — see open questions):
   - **Decisions** — choices made and their rationale.
   - **Concepts & options explored** — solutions/architectures weighed.
   - **Research & findings** — investigations, grounded in sources.
   - **Work produced** — code, docs, commits (link the commits from the
     transcript).
   - **Lessons learned** — mistakes made and what to do differently; candidates
     to feed into a corrective skill (e.g. `/diagnosing-bugs` or
     `/improve-codebase-architecture`).
   - **Open threads** — unresolved questions, deferred work.
   Add or drop sections to fit the session; keep prose over bullets where a
   narrative reads better.

3. **`## Sources`** — last. Provenance backlinks: the session `.jsonl`, the
   rendered `transcript.md`, and every sibling artefact, each as a link. This is
   the Artifact-provenance layer — frozen, off-graph, cited here. **Lifecycle:**
   while the session sits in `Inbox/ingest-backlog/<name>/` the originals live
   there; on promotion the immutable files (the `.jsonl`, the `transcript.md`,
   and every sibling artefact) are frozen into `artefacts/<name>/`, and these
   Sources links are updated to point there.

### Tag every promotable element

Inside the body, each **element** worth carrying forward is tagged inline with:

- **Source input** — where it came from: the `.jsonl` session, a specific `.md`
  output/artefact, or code (name the file/commit).
- **Promotion recommendation** — exactly one destination:
  - **Record** — becomes a typed graph node. Name the record type: `idea`,
    `research`, `concept`, `prd`, `reference`, or `adr` (see
    `vault-template/templates/`).
  - **Artifact + provenance** — a frozen source, off-graph, cited in Sources
    (use for evidence you link *to*, not knowledge you promote).
  - **Action annotation** — a queued next-step (from "fetch this PDF" up to
    "salvage-only: re-run this through the skill pipeline"). Not a Record.
- **Pre-promotion skill** (optional) — a recommended skill to run before
  promoting (e.g. `/grill` an idea, `/research` a claim). Mirrors the `next`
  field on records.
- **Likely destination (topic)** — the graph area or MOC this element probably
  belongs to (e.g. `AI-practice`, a named project, `research`,
  `business-strategy`). A soft hint that primes the promoting skill, not a
  binding assignment. Mirrors the `topic` frontmatter field on records.

Suggested inline tag format (draft):

```
> **[Element]** <one-line description>
> _source:_ `session.jsonl` · _topic:_ AI-practice · _promote:_ Record (concept) · _pre-skill:_ /grill
```

## Principles

- **Capture fat, promote lean.** Verbosity here is a feature — fidelity is
  cheap now, unrecoverable later.
- **Narrative, not ledger.** Prose a human will actually read.
- **Do not promote.** No records are created and nothing is written into the
  graph in this skill — that is TASK-50. You produce the Companion Document and
  stop.
- **Do not invent provenance.** Every source-tag must point at something real in
  the folder or the transcript.

## Decisions (settled) and the one open question

**Settled (owner, 2026-07-25):**

- **Claude Desktop is in scope and works.** A hand-saved *per-session* Desktop
  `.jsonl` uses the same `user`/`assistant` message shape as the CLI, and the
  renderer handles it (verified). The *bulk* account export (`conversations.json`
  — one array of many chats) is a different, batched format, deferred to the
  historical-batch flow, not this MVP.
- **Outputs land in the Inbox, not the graph.** Drop the raw session folder into
  `Inbox/ingest-backlog/<name>/` (human-named); the transcript and Companion
  Document are written there too. Everything stays in this Inbox quarantine until
  a later pass promotes only quality-checked, typed records into the Vault, at
  which point the immutable originals are frozen into `artefacts/<name>/` (see
  the Sources lifecycle). Session logs live in the Inbox too — just another thing
  to ingest.
- **The transcript (Output #1) is a frozen Artifact.** Because it is a purely
  mechanical render (never parsed, derived, or subjectively edited), it is a
  frozen Artifact, cited in Sources. It becomes a graph node only once promotion
  decides its next step.

**Still open (needs owner approval — do not finalise):**

1. **Exact body-section taxonomy.** The typed sections above (Decisions /
   Concepts & options / Research & findings / Work produced / Open threads) are a
   working set pending ratification.
