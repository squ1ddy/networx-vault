---
name: harness-fetch-url
description: Capture — fetch a cited URL, convert the page to clean markdown, and drop it into the vault Inbox/ as a light **source** (type/title/source-url/captured/tags) so it composes with /harness-ingest and /harness-promote. Invoke as /harness-fetch-url.
disable-model-invocation: true
---

# /harness-fetch-url — cited URL → markdown source in the Inbox

Turn a URL you want to keep into a clean markdown **source** in the vault
`Inbox/`. This is the zero-friction capture step for web content: fetch, clean,
drop it in the Inbox quarantine as a light source, and stop. Later passes
(`/harness-ingest`, `/harness-promote`) triage it into typed records. Read
`CONTEXT.md` for the ubiquitous language (Inbox, Artifact/Source, Record) before
you start.

**Scope — capture, not clipper.** This is the single "fetch-URL-to-markdown"
capability the ingest taxonomy (TASK-60) identified as worth building. It is the
minimal seam, not the full browser-based web clipper (that is TASK-29). Do not
build authentication, JS-rendering, or a browser extension here — one URL, one
clean markdown file, into the Inbox.

## How to run

Two steps: **you** fetch and convert (the robust, dependency-light path — your
own web-fetch already renders pages to markdown), then the helper script writes
the Inbox file deterministically.

1. **Fetch and convert.** Retrieve the page and convert it to clean markdown —
   keep the headings, prose, and links; drop nav chrome, cookie banners, and
   ads. Aim for the article body a human would want to read.

2. **Write the source into the Inbox.** Pipe the converted markdown to the
   script (or pass it via `--md-file`):

   ```bash
   printf '%s' "$MARKDOWN" | node scripts/fetch-url.mjs \
     --url "https://example.com/post" \
     --tags "research,web" \
     --vault <vault>
   ```

   The script slugs the filename from the title (an explicit `--title`, else the
   first H1, else the URL host+path), builds the light frontmatter, normalises
   the body, and writes `Inbox/<slug>.md` without clobbering an existing file.

Options:

- `--url <url>` — the source URL (required; stored verbatim in `source-url`).
- `--md-file <path>` — the converted markdown; omit to read it from **stdin**.
- `--title "..."` — override the title (else first H1, else URL host+path).
- `--tags a,b,c` — extra tags; the `source` tag is always added and deduped.
- `--vault <path>` — vault root (default: `VAULT_ROOT` env, else cwd).

## What it produces

A single `Inbox/<slug>.md` **source** file — light frontmatter, then the H1 and
the cleaned body:

```
---
type: "source"
title: "The Post Title"
source-url: "https://example.com/post"
captured: "2026-07-27"
tags: ["source", "research", "web"]
---
# The Post Title

...cleaned article markdown...
```

`type: source` and the always-present `source` tag make these captures trivially
filterable. The file lands in the **Inbox quarantine** (QC-exempt) — it is not a
graph record yet. Promotion happens later, through the ingest pipeline.

> **On `type: source`.** This is deliberately *off* the canonical record enum
> (`idea/research/concept/prd/reference/adr`; ADR-0004 + 0006). An Inbox capture
> is a **Source** (CONTEXT.md), not a typed graph record — the record `type` is
> assigned only when `/harness-promote` files it. The `title` field is included
> as a convenience for that downstream step; the light frontmatter is otherwise
> just `source-url` / `captured` / `tags`.

## Principles

- **Capture, don't file.** The source lands in `Inbox/` unjudged. Deciding
  whether it becomes a Reference record, an Artifact citation, or gets dropped
  is `/harness-ingest` + `/harness-promote`'s job, not this skill's.
- **Do not invent provenance.** `source-url` is the real URL you fetched, stored
  verbatim — never a guessed or canonicalised substitute.
- **Convert cleanly, don't summarise.** Preserve the page's actual content
  (headings, prose, links); this is a faithful capture, not a digest.
- **Dependency-light by design.** The fetch+convert uses your own web-fetch (no
  heavy `turndown`/`jsdom` install); the script is pure deterministic tail
  logic, unit-tested in `scripts/tests/fetch-url-core.test.mjs`.

## Related

- **TASK-29 (web clipper)** — the fuller browser-based capture flow. This skill
  is the minimal, agent-driven seam; it does *not* subsume the clipper.
- **`/harness-ingest` / `/harness-promote`** — the downstream triage that
  turns an Inbox source into typed graph records.
