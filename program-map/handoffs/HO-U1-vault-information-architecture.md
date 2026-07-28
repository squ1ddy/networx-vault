# HO-U1 — Vault Information Architecture (keystone handoff)

**Where this runs:** UPSTREAM, in `D:\Git\knowledge-task-substrate` (the framework), not in a stamped vault. Output flows down to `networx-vault` via the downstream-sync (HO-U3).
**Status:** ready to run. **Depends on:** nothing (it's the keystone). **Blocks:** HO-U2, HO-H1, HO-H2, HO-H3.

---

## Why this exists
A stamped vault (`networx-vault`) is already becoming a mess: `.md` files in random places, an `Inbox/` full of unprocessed records, near-zero use of the record templates, and no stable IDs. Before more program content is added, decide **how a vault is structured** so every record has an ID, content is findable, and program topics have a home — **without** the structure becoming so program-specific it stops being a reusable framework.

## Objective
Produce, in the substrate, an **Information Architecture (IA) spec + updated record templates** that any stamped vault inherits, defining:
- a **numbered ID scheme** (Johnny Decimal style — area.category.id) so every record is addressable;
- a **PARA + Zettelkasten hybrid** (the owner wants a combination, not one dogma);
- the canonical **record types + templates** and how they're enforced;
- where program **`topics/` / MOCs / canvases** live and how they reference records by ID;
- how IDs are **assigned and kept stable** as records move.

## Do the audit BEFORE designing
1. **Substrate current state** — read in `knowledge-task-substrate`: the existing record templates, `CONTEXT.md`, `docs/roadmap/vault-vision.md`, and the ingest/triage skills. Note what record-type model already exists and what the "new work not yet pullable downstream" (per the owner) actually is.
2. **Instance reality** — inventory `networx-vault`'s actual mess: stray `.md` locations, the unprocessed `Inbox/`, the unused templates, and the `program-map/ · canvas/ · research/` folders recently created. This is the migration surface (HO-H1).
3. **Reference models** — `johnnydecimal.com/documentation/introduction`; PARA; Zettelkasten. Map each against the substrate's existing record-type model — adopt elements, don't import wholesale.

## Decisions to make (record each as an ADR)
- The numbering scheme and its ranges (which areas/categories; how program topics slot in).
- Which PARA elements (Projects/Areas/Resources/Archives) and which Zettelkasten elements (atomic notes, links, no-orphans) are adopted.
- The canonical record types + their templates (and how the template structure is *actually enforced*, given it's currently ignored).
- Placement of `topics/`/MOCs/canvases and how they link to records **by ID**.
- ID assignment + stability rules.
- **Guardrails, not hard rules** (owner preference): the scheme should guide, not straitjacket.

## Deliverables (in the substrate)
- `IA-SPEC.md` — the architecture + numbering scheme + the PARA/Zettelkasten hybrid.
- Updated **record templates**.
- One or more **ADRs** capturing the numbering + hybrid decisions.
- A **migration note** for HO-H1 (how to move `networx-vault` onto the scheme without losing referenceable artefacts).

## Guardrails
- **Reusable-framework-first:** program specifics live in the instance, not the framework.
- **No lost artefacts:** the scheme must preserve referenceable originals (slides, transcripts, digests).
- Keep it **simple enough to actually use** — the current failure mode is non-adoption, not missing features.

## Definition of done
The owner can stamp/refresh a vault and know exactly where any record goes and what its ID is; `networx-vault`'s migration (HO-H1) is a mechanical application of the spec + migration note.

## Reference inputs
- `johnnydecimal.com` · PARA · Zettelkasten
- `D:\Git\practice_poc` (operating-model content that must have a home)
- `github.com/maleta/claude-sessions` (informs the `session` record type — see HO-U2)
