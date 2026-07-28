---
name: substrate-fetch-pdf
description: Capture — given a DOI or PDF URL, download the original PDF into the vault `artefacts/` as a frozen **Artifact** and write a source-note sidecar that cites it, so it composes with /substrate:ingest and /substrate:promote (the "Artifact + provenance" destination). Invoke as /substrate:fetch-pdf.
disable-model-invocation: true
---

# /substrate:fetch-pdf — cited DOI/PDF → frozen artifact + source note

Turn a citeable reference (a **DOI** or a direct **PDF URL**) into the original
article, frozen in the vault `artefacts/` as an immutable **Artifact**, with a
**source-note sidecar** that cites it. This is the "citeable PDF referenced →
download as artefact" element of the ingest taxonomy (TASK-60): the destination
is *Artifact + provenance*, the same one `/substrate:promote` freezes into.
Read `CONTEXT.md` for the ubiquitous language (Artifact, Source, provenance,
frozen) before you start.

**Scope — freeze the original, don't read it for the graph.** This downloads and
freezes one PDF and writes its citing sidecar. It does not extract text, summarise,
or promote to a typed record — those are `/substrate:ingest` + `/substrate:promote`.
Do not build DOI metadata enrichment, multi-file crawling, or paywall bypass here.

## How to run

One step: the helper script both **downloads the PDF** and **writes the sidecar**.
Unlike `/substrate:fetch-url` (where you convert HTML→markdown yourself), a PDF is
an opaque binary you cannot faithfully re-render — so the download is done in the
script with Node's built-in `fetch` (no dependency), writing the raw bytes.

```bash
# From a DOI (resolves via https://doi.org/<doi>):
node scripts/fetch-pdf.mjs --doi 10.5555/attention \
  --title "Attention Is All You Need" --topic transformers --tags ml,paper \
  --vault <vault>

# Or from a direct PDF URL:
node scripts/fetch-pdf.mjs --url https://arxiv.org/pdf/2401.00001.pdf --vault <vault>
```

The script resolves the DOI/URL, slugs a filename, downloads the bytes into
`artefacts/<slug>.pdf`, and writes the sibling `artefacts/<slug>.md` sidecar —
without clobbering existing files.

Options:

- `--doi <doi>` — a DOI (bare `10.x/y`, `doi:10.x/y`, or a `doi.org` URL).
- `--url <url>` — a direct PDF URL. **Exactly one** of `--doi`/`--url` is required.
- `--title "..."` — title for the sidecar + slug (else derived from the DOI/URL).
- `--topic <topic>` — optional topic for the sidecar frontmatter.
- `--tags a,b,c` — extra tags; the `source` tag is always added and deduped.
- `--vault <path>` — vault root (default: `VAULT_ROOT` env, else cwd).

> **A DOI often resolves to a landing page, not a direct PDF.** `doi.org`
> redirects to the publisher; for open-access works that is frequently the PDF,
> but sometimes an HTML page. The script downloads whatever it gets and **warns**
> (does not fail) when the bytes are not a PDF — if you see that warning, re-run
> with the direct `--url` to the PDF.

## What it produces

A frozen **Artifact** and its citing **source-note**, a sibling pair in `artefacts/`:

```
artefacts/attention.pdf          # the frozen original (immutable)
artefacts/attention.md           # the source-note sidecar:
---
type: "source"
title: "Attention Is All You Need"
frozen: true
artifact: "artefacts/attention.pdf"
provenance: "https://doi.org/10.5555/attention"
source-url: "https://doi.org/10.5555/attention"
captured: "2026-07-27"
topic: "transformers"
tags: ["source", "ml", "paper"]
related: []
next:
status: active
---
# Attention Is All You Need

> Sidecar note for a frozen artifact. The original PDF lives at
> `artefacts/attention.pdf` and is immutable.

## Summary

## Sources

- https://doi.org/10.5555/attention
```

The sidecar shape is `templates/source-note.md` plus two capture fields
(`source-url`, the exact URL fetched; `captured`, the capture date in place of an
authored `created`). `frozen: true` + the `artifact:` path mark the pair as an
immutable Artifact; `provenance` / `source-url` carry the real DOI/URL you fetched. It composes with
`/substrate:ingest` and `/substrate:promote`, which treat this exactly as the
*Artifact + provenance* destination.

> **On `type: source`.** As with `/substrate:fetch-url`, this is deliberately
> *off* the canonical record enum (`idea/research/concept/prd/reference/adr`;
> ADR-0004 + 0006). A frozen artifact's sidecar is a **Source** (CONTEXT.md), not
> a typed graph record — the record `type` is assigned only when the ingest
> pipeline files it.

## Principles

- **Freeze, don't paraphrase.** The value is the *original* bytes, stored
  immutably. Never regenerate or "clean up" the PDF.
- **Do not invent provenance.** `provenance`/`source-url` are the real DOI/URL you
  fetched, stored verbatim — never a guessed or canonicalised substitute.
- **DOI resolves through doi.org.** A DOI is turned into `https://doi.org/<doi>`,
  the registered resolver — not a hard-coded publisher URL.
- **Dependency-light by design.** The download uses Node's built-in `fetch` (no
  `axios`/`node-fetch` install); the deterministic tail (DOI→URL, slug, sidecar
  frontmatter) is pure and unit-tested in `scripts/tests/fetch-pdf-core.test.mjs`.

## Related

- **`/substrate:fetch-url`** — the sibling capture skill for web pages
  (HTML→markdown into `Inbox/`). This one is for *binary PDFs* frozen as artifacts.
- **`/substrate:ingest` / `/substrate:promote`** — the downstream triage that
  cites this Artifact into typed graph records.
