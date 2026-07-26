# Companion Document — Founding Session: NCF Platform (Peloton Control Framework)

> Ingest of the founding Claude session `ncf-platform-conversation-70fbcce0.jsonl`
> (Claude Code CLI export, 5,879 events / 2,225 turns, 12–17 June 2026).
> Rendered transcript: [`session1-transcript.md`](./session1-transcript.md).
> Read-only intent recovery; biased toward **ecosystem breadth**. Nothing here
> is promoted — see `.claude/skills/substrate-ingest/SKILL.md`.

---

## Summary

This is the founding, most-productive session of a **cybersecurity consulting
practice's product ecosystem**, built around a proprietary control catalogue
called the **Peloton Control Framework (PCF)** — a crosswalk / "framework of
frameworks" that maps ~1,175 in-house controls to dozens of external standards
(NIST 800-53, NIST CSF, ISO 27001, and many jurisdiction-specific regimes). The
owner is a security consultancy (working name **Networx**; product branded **NCF
Platform**) whose consultants today hand-author client cybersecurity policy
documents in Word/Excel and want to industrialise that into a data-driven
document factory.

The session's concrete build was a proof-of-concept — **NCF Platform** — that
turns the PCF crosswalk into a queryable **SQLite database** (`dsp.db`, FTS5 for
future agent querying) and generates branded **`.docx` / `.xlsx`** policy
documents from it via a **template-as-stylesheet** pattern, wrapped in a
**React + TypeScript + Vite + FastAPI** web workbench. The marquee capability
is a **framework-driven control-selection workflow**: a consultant picks one or
more compliance frameworks, the system derives the union of required controls
(**MCR — Minimum Compliance Requirements**), the consultant layers on
discretionary controls (**DSR — Discretionary Security Requirements**), and the
tool emits the client's tailored policy suite (output = MCR ∪ DSR). This
directly automates a manual Excel filter-and-tag ritual the owner described in
detail.

Although the *hands-on work* stayed focused on the DSP document generator, the
session repeatedly reveals a **much larger ecosystem intent**: the DSP is only
the *first shelf* of an extensible **"bookshelf" of document suites** (a
**CSOP** — Cybersecurity Standard Operating Procedures suite — was already being
ingested as the second, with **20+ document types** named as coming:
vulnerability management, incident response, etc.); the PCF crosswalk itself is
positioned as a reusable **Rosetta-stone / framework-of-frameworks** asset; and
the catalogue already carries embryonic **special-purpose sub-frameworks**
(PCF-B Mergers & Acquisitions, **PCF-I Cyber Insurance Duty of Care**, PCF-E
Embedded Technology, PCF-R Ransomware Protection) that hint at insurance,
sector, and risk-driven productisation. A first-class, oft-repeated requirement
is that **AI agents must eventually query this data** — the database and its
FTS/API layer are explicitly built with that future in mind.

What was decided and shipped: the SQLite schema and ingest pipeline, the
template-as-stylesheet generator, the control-selection → assemble → generate
vertical, per-client persistence, schema visualisation (Mermaid, colour-coded by
subsystem), and a substantial process/governance layer (`CLAUDE.md`, `TODO.md`,
`ISSUES.md`, `SPECS.md`, `USAGE.md`, `SETUP.md`, `CHANGES.md`, `initial_setup/`
clean-schema export). What remains open: a **WYSIWYG editor** for consultant-
friendly rich-text authoring (identified as adoption-critical and unresolved),
the CSOP `.docx` renderer, the Authoring-vs-Document-Outputs "bookshelf" UX,
token reconciliation across suites, and NICE-role mapping.

---

## Ecosystem vision & distinct components

The session names — explicitly or by strong implication — a portfolio of
distinct products/assets sitting under one practice. This is the ecosystem
skeleton the Project Map should synthesise from.

> **[Element]** **Peloton Control Framework (PCF)** — the proprietary control
> catalogue and *crosswalk* (~1,175 controls) that maps in-house controls to
> external standards; the load-bearing IP the whole ecosystem sits on. Acts as a
> "framework-of-frameworks" / Rosetta stone between regimes.
> _source:_ `session.jsonl` (U1, U7, ingest script) · _promote:_ Record (concept)

> **[Element]** **NCF Platform** — the productised app: SQLite-backed policy-
> document factory + React/FastAPI web workbench. The session's actual build.
> _source:_ `session.jsonl` (U1, U28, App.tsx) · _promote:_ Record (prd)

> **[Element]** **DSP (Digital Security Program) generator** — the first output
> "shelf": generates the client's baseline policy `.docx` (+ `.xlsx` control
> tables) from selected controls.
> _source:_ `session.jsonl` (U1, U24) · _promote:_ Record (concept)

> **[Element]** **CSOP (Cybersecurity Standard Operating Procedures) suite** —
> the *second* shelf, already being ingested this session; procedure prose plus
> per-procedure input/output metadata, keyed to controls by PCF#.
> _source:_ `session.jsonl` (U77–U83, transcript ~L26577, L32185, L32477) · _promote:_ Record (concept)

> **[Element]** **The "bookshelf" — extensible document-suite library** — the
> explicit meta-product: Document Outputs modelled as shelves (DSP, CSOP, …),
> each holding multiple `.docx`/`.xlsx` artifacts, generated on demand. Owner
> flags a **suite of 20+ documents** coming (vulnerability management, incident
> response, cybersecurity SOPs, …).
> _source:_ `session.jsonl` (U82–U83, transcript ~L42631) · _promote:_ Record (concept)

> **[Element]** **Special-purpose sub-frameworks (PCF-B / PCF-I / PCF-E /
> PCF-R)** — curated control-selection profiles by industry/strategy: PCF-B
> Business Mergers & Acquisitions, **PCF-I Cyber Insurance Duty of Care**, PCF-E
> Embedded Technology, PCF-R Ransomware Protection. These are the ecosystem's
> insurance/sector/risk productisation seed. Notably **PCF-I carries real
> external refs** (NAIC, MA 201 CMR 17, FAR 52.204-21, Lockton) — a genuine
> cyber-insurance regulatory crosswalk, not just a tag.
> _source:_ `session.jsonl` (transcript L764, L24767–24798) · _promote:_ Record (concept) · _pre-skill:_ /grill

> **[Element]** **AI agents over the control data** — a first-class *future*
> requirement stated in the opening turn and reinforced by the FTS5 index + the
> FastAPI "middleware" layer (owner explicitly speculates the API "could have
> been created to assist agents processing data in the future"). This is the
> ecosystem's AI-advisory / agentic-query ambition in embryo.
> _source:_ `session.jsonl` (U1, U51) · _promote:_ Record (idea) · _pre-skill:_ /grill

> **[Element]** **Networx consulting practice** — the human practice these tools
> serve; consultants tailor client policy suites per compliance frameworks +
> risk appetite. The ecosystem's *why*. (Framework template file is
> "Networx Document Template Master.docx".)
> _source:_ `session.jsonl` (U19, U33) · _promote:_ Record (concept)

**Ecosystem terms NOT found (checked, absent as product intents):** OSCAL,
FAIR risk quantification, Rego/policy-as-code, "Rosetta stone" as a named
product, an explicit AI-advisory product line. FAIR/insurance/NIST appear only
as *catalogue content*, not stated ambitions. If the owner considers these part
of the ecosystem, they originate **outside this founding session**. (The
framework-of-frameworks ambition *is* present, but as the PCF crosswalk /
sub-frameworks, not via OSCAL machine-readable controls.)

---

## Decisions made

> **[Element]** **SQLite (`dsp.db`) as the store; FTS5 for future agent
> querying.** Lightweight, local, no heavy infra — chosen in the first exchange.
> _source:_ `session.jsonl` (U1) · _promote:_ Record (adr)

> **[Element]** **Rich content lives in a structured DB, NOT static Word
> templates.** Owner explicitly rejected maintaining many hand-authored `.docx`
> ("too many to maintain… can't rely on humans to update across all templates").
> Content stored as markdown; tokens (e.g. `[Company Name]`) kept literal and
> resolved only at preview/generate time.
> _source:_ `session.jsonl` (U15, U47) · _promote:_ Record (adr)

> **[Element]** **Template-as-stylesheet.** One `.docx` (`Networx Style
> Template.docx`, stripped from the master) holds named styles/theme/headers/
> footers; heading levels are *derived* from PCF control depth. Content is
> injected programmatically.
> _source:_ `session.jsonl` (U19–U21, transcript L3276) · _promote:_ Record (adr)

> **[Element]** **MCR vs DSR selection model.** MCR = auto-derived union of
> selected frameworks (Minimum Compliance Requirements); DSR = manual
> discretionary layer; output = MCR ∪ DSR (MCR wins). Mirrors the manual Excel
> filter-and-tag workflow the owner walked through.
> _source:_ `session.jsonl` (U31, U33) · _promote:_ Record (adr)

> **[Element]** **React + TypeScript + Vite + Tailwind (frontend) / FastAPI +
> uvicorn (backend), built from scratch.** "Go straight with React so it looks
> snappy from the beginning." Do NOT reuse existing repo OpenXML tooling.
> _source:_ `session.jsonl` (U15, U28) · _promote:_ Record (adr)

> **[Element]** **PCF-B/I/E/R reclassified from boolean columns to real
> frameworks.** They were mistakenly modelled as 4 boolean columns on `controls`;
> decision to migrate them into `frameworks` + `control_framework_map`,
> preserving PCF-I's external refs that the old boolean `flag()` was discarding.
> _source:_ `session.jsonl` (U60, transcript L24473, L24798) · _promote:_ Record (adr)

> **[Element]** **Reproducible clean-build discipline.** A vetted schema export
> under `initial_setup/` is the canonical way to stand up a new instance; any
> app change must update `SETUP.md` + `initial_setup/`. Governance codified in
> `CLAUDE.md` after the owner's "close the loop" complaint.
> _source:_ `session.jsonl` (U50, U52) · _promote:_ Record (adr)

---

## Concepts & options explored

> **[Element]** **Content-block model.** Documents composed of typed, ordered,
> *reusable* content blocks (many-to-many via `document_blocks`); footnotes shown
> to be framework references derivable at render time (control_framework_map ∩
> client_frameworks) rather than authored.
> _source:_ `session.jsonl` (U16–U18, transcript L26893) · _promote:_ Record (concept)

> **[Element]** **Schema visualisation as a planning tool.** Mermaid ER diagrams
> generated and split into 3 colour-coded views — (1) security-controls tables,
> (2) document-authoring/style tables, (3) combined — so a "DB newbie" owner
> could validate completeness and plan operational-process extensions.
> SchemaCrawler noted as a fallback.
> _source:_ `session.jsonl` (U54–U57) · _promote:_ Record (concept)

> **[Element]** **Per-client context.** Selections + client tokens + weighting
> overrides persisted per client; a "Global Master" (default) context vs
> "Client Context" toggle drives which defaults apply.
> _source:_ `session.jsonl` (U31, U72) · _promote:_ Record (concept)

> **[Element]** **Token system spanning the whole suite.** `[Company Name]`-style
> tokens apply not just to policy content but to front-matter/appendices and
> across DSP + CSOP; owner asked for a *repeatable token-reconciliation function*
> to catch orphaned tokens whenever content is added.
> _source:_ `session.jsonl` (U15, U80–U82) · _promote:_ Record (concept)

---

## Research & findings

> **[Element]** **Cross-version data reconciliation.** Descriptive catalogues
> (risk/threat/evidence/assessment-objectives) are SCF 2023.2 JSON; the mappings
> are PCF/DSP 2023.3.3 xlsx. IDs aligned on stable keys (PCF#, R-xx, NT-/MT-,
> E-xx); cross-version gaps expected and tolerated. Source of much early "gymnastics".
> _source:_ `session.jsonl` (U8–U9, ingest script L1452) · _promote:_ Record (research)

> **[Element]** **Footnote provenance investigation.** Established DSP/CSOP
> master footnotes split into (a) per-control framework citations = already in DB
> (97% populated, render client-scoped) and (b) master editorial footnotes
> (source URLs + glossary, 882/301) genuinely absent from build inputs. Resolves
> whether the WYSIWYG editor must author footnotes (it need not).
> _source:_ `session.jsonl` (transcript L26723, L26893) · _promote:_ Record (research)

> **[Element]** **PCF-I holds a real cyber-insurance regulatory crosswalk.**
> Non-blank PCF-I cells contain NAIC / MA 201 CMR 17 / FAR 52.204-21 / Lockton
> references — evidence the insurance angle is data-grounded, not aspirational.
> _source:_ `session.jsonl` (transcript L24790) · _promote:_ Record (research)

---

## Work produced

All under `ncf_platform/` in the source repo (not this vault). Commits were made
and pushed to `origin/main` at session end.

- **`build_db.py`** — ingest pipeline: xlsx crosswalk + SCF JSON catalogues →
  normalised SQLite schema (domains, policies, controls, frameworks + junction
  tables, risks/threats, evidence, assessment objectives) + FTS5 indexes.
  (transcript L1452)
- **Template tooling** — `Networx Style Template.docx` (blank style-only base) +
  `generate_doc.py` / `tokens.py` (`.docx` generation, token resolution),
  `.docx` preview/render script. (transcript L3276)
- **Web workbench** — React/TS/Vite/Tailwind frontend (`App.tsx`, `api.ts`) +
  FastAPI backend: control catalogue browse/filter, framework-driven selection
  (MCR/DSR), document composition CRUD, assembled preview, per-client
  persistence, `.xlsx` export.
- **Schema visualisation** — Mermaid ER generator + 3 colour-coded HTML exports;
  `schema_diagram.md`.
- **Governance/docs** — `CLAUDE.md`, `TODO.md` (with DONE log), `ISSUES.md`,
  `CHANGES.md`, `SPECS.md`, `USAGE.md` (+ functionality-verification section),
  `SETUP.md`, `initial_setup/` clean-schema export, `source_files/` for inputs.
- **Session handoff artefacts** — a plan-mode prompt for continuing in a fresh
  Claude Code session (two-phase: investigate → plan → approve → execute).

> **[Element]** These outputs are the founding codebase; promote the *knowledge*
> (schema model, generation pattern, selection model), not the code itself.
> _source:_ code (`ncf_platform/`) · _promote:_ Artifact + provenance

---

## Open threads / unresolved forks

> **[Element]** **WYSIWYG editor (adoption-critical, UNRESOLVED).** Owner
> pushed back hard: consultants edit in Excel/Word; markdown-in-textarea is not
> "human editable" enough — "we might be backing ourselves into a corner." A
> WYSIWYG option was opened for discussion but not settled. Biggest product risk.
> _source:_ `session.jsonl` (U64) · _promote:_ Action annotation · _pre-skill:_ /grill

> **[Element]** **CSOP `.docx` renderer + Authoring-vs-Document-Outputs
> "bookshelf" UX.** Data ingested but no renderer/surface yet; the extensible
> suite model is designed but unbuilt.
> _source:_ `session.jsonl` (U82–U83) · _promote:_ Action annotation

> **[Element]** **Token reconciliation across DSP + CSOP** — repeatable orphaned-
> token check, restricted to Global Master; deferred.
> _source:_ `session.jsonl` (U80–U81) · _promote:_ Action annotation

> **[Element]** **NICE work-role mapping** — tokens/roles should map back to NICE
> roles from source data; unclear and deferred.
> _source:_ `session.jsonl` (U82) · _promote:_ Action annotation

> **[Element]** **Client↔framework coupling (FK vs decouple)**, per-client
> weighting overrides UI, jurisdiction/colour grouping of frameworks (Global/US/
> Europe/APAC), full `.xlsx` round-trip matching the original crosswalk — all
> parked in TODO.
> _source:_ `session.jsonl` (U33, U59, U77) · _promote:_ Action annotation

---

## Lessons (what caused pain)

> **[Element]** **"Close the loop" workflow failure.** Owner: *"This way of
> working is unacceptable… I have to keep reminding you to update me."* Root
> cause: docs (SPECS/USAGE) drifted from work. Fix: `CLAUDE.md` conventions +
> a functionality-verification checklist per feature. A "no user-facing surface"
> planning smell was identified (Piece 2 shipped API-only, missed UI).
> _source:_ `session.jsonl` (U50, U74, transcript L37882) · _promote:_ Record (concept)

> **[Element]** **Data "gymnastics" → reproducibility discipline.** The pain of
> deriving relationships from JSON then populating from spreadsheet drove the
> `initial_setup/` clean-schema convention.
> _source:_ `session.jsonl` (U52) · _promote:_ Record (concept)

> **[Element]** **Context-window churn.** The session ran out of context ~10
> times (continuation summaries); the owner worried about it explicitly and asked
> for handoff prompts. Motivates this whole ingest/substrate effort.
> _source:_ `session.jsonl` (U82–U85) · _promote:_ Action annotation

> **[Element]** **Non-ASCII / mojibake in generated docs** — owner flagged
> non-human-readable characters; drove a text-cleanup pass in ingest.
> _source:_ `session.jsonl` (U52) · _promote:_ Action annotation

---

## Sources

- **Session (frozen):** `D:/Git/PelotonControlFramework/Sandbox/Development/document wrangler/JSON/ncf-platform-conversation-70fbcce0.jsonl`
  — 5,879 events / 2,225 turns, 2026-06-12 → 2026-06-17.
- **Rendered transcript:** [`session1-transcript.md`](./session1-transcript.md)
  (mechanical render via `scripts/transcript.mjs`).
- **Referenced source artifacts** (in the source repo's `JSON/` folder, not this
  vault): `PCF 2023-x-x Crosswalk DevModel v0.1-RECOVERED.xlsx`,
  `JSON_Data_*.json` (Risk/Threat/Evidence/Assessment-Objectives/Authoritative-
  Sources catalogues, SCF 2023.2), `Networx Document Template Master.docx`,
  `CSOP - DSP version (2023) (version 1).xlsx`.
- **Founding codebase (frozen):** `ncf_platform/` in
  `D:/Git/PelotonControlFramework/Sandbox/Development/document wrangler/JSON/`.
