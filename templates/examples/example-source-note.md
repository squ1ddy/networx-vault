---
type: source
title: FAIR Guiding Principles (Wilkinson et al., 2016) — sidecar
frozen: true
artifact: artefacts/wilkinson-2016-fair-principles.pdf
provenance: Illustrative sidecar — records the shape a real ingest would fill (source DOI + date). No artifact is shipped with this example.
created: 2026-07-25
topic: substrate/link-integrity
tags: [source]
related: ["[[example-research]]"]
next:
status: active
---
# FAIR Guiding Principles (Wilkinson et al., 2016) — sidecar

> Sidecar note for a frozen artifact. The original lives at `artifact:` and is immutable.

## Summary

The frontmatter home for a frozen artifact: in a real vault the paper is a PDF under
`artefacts/` that never changes, so this sidecar carries everything mutable (tags, topic,
links) and lets the source be cited and linked like any other record. The `frozen: true`
flag and the `provenance:` line record where the artifact came from and that it must not be
edited in place. (This is a *teaching* example — no PDF ships with it; the `artifact:` path
shows the shape a real ingest would set.)

Used here to ground [[example-research]]: the paper's Findable/Accessible principles are the
external anchor for the claim that stable *identifiers* beat positional *paths* — the same
reasoning behind basename wikilink resolution in this vault.

## Sources

- Wilkinson, M. et al. (2016). "The FAIR Guiding Principles for scientific data management
  and stewardship." *Scientific Data* 3, 160018. https://doi.org/10.1038/sdata.2016.18
- Frozen copy (illustrative path): `artefacts/wilkinson-2016-fair-principles.pdf` — where a
  real ingest would put the PDF (see `artifact:` frontmatter).
