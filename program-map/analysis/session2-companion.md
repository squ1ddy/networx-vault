# Companion Document — Session 2 (NCF Platform POC, `c3c69ed5`)

> Ingest per `.claude/skills/substrate-ingest/SKILL.md`. Read-only intent recovery.
> **Provenance note:** this is the owner's *second* Claude session on the NCF /
> Peloton Control Framework effort. It runs inside a separate repo
> (`D:\Git\PelotonControlFramework\Sandbox\Development\document wrangler\JSON\ncf_platform`),
> **not** the knowledge-task-substrate repo. Nothing here was written back to that
> project — only this companion + transcript live under `dogfood/project-map/`.

## Summary

This is a **long, tactical build session** on the **NCF Platform POC** — a
**Digital Security Program (DSP) cybersecurity-policy document generator**. It
turns a large controls catalog (1175 controls) plus authored prose into
client-branded `.docx` policy suites and `.xlsx` crosswalks. The stack is
self-contained under `ncf_platform/`: FastAPI + SQLite backend (`api.py`,
`generate_doc.py` via python-docx, openpyxl for crosswalk), Vite/React/TS
frontend, and a family of ingest/build scripts. The session opens by resuming
from a `STATUS / RESUME HERE` block, then works down a prioritized `TODO.md`
backlog, producing **~30 commits** across a mid-session context compaction.

Two things make this session different from a "founding vision" session: (1) it
is **execution-dense, not vision-dense** — it assumes the product concept is
already settled and grinds through UX/schema pieces; (2) its one genuinely
architectural moment is a **major mid-session pivot on the Authoring UX**
("we have totally missed the mark on the Authoring UX"), which reshapes the
document-composition model rather than the product's scope.

The **ecosystem-level intent visible here is narrow**: this session is the
**"policy/dossier generator" component** of a larger cyber-GRC vision, and it
reveals the **framework-of-frameworks / crosswalk substrate** in concrete,
built form (a Secure-Controls-Framework-style catalog that maps many source
standards onto one control set, with derived compliance requirements and a
verbatim crosswalk export). The wider ambitions the ingest brief anticipated —
**FAIR risk quantification, cyber-insurance, OSCAL, AI advisory, the AI
practice, an explicit "Rosetta-stone control framework-of-frameworks" product**
— are **not discussed in this session**. They are either upstream context (this
is the *product* that sits under that vision) or belong to other sessions. That
absence is itself a finding: session 2 is a builder's session for **one product
in the ecosystem**, not the ecosystem charter.

## The product this session builds (the one distinct component)

> **[Component]** **NCF Platform / DSP policy-document generator** — a
> proof-of-concept web app that composes and generates client-specific
> cybersecurity policy suites (`.docx`) and compliance crosswalks (`.xlsx`) from
> a shared controls catalog + authored content.
> _source:_ `session2.jsonl` (transcript §Summary, TODO/SPECS reads) ·
> _promote:_ Record (concept) · _pre-skill:_ /grill (to separate "the product"
> from "the ecosystem it sits in")

Its internal parts, all built or advanced this session:

- **Controls catalog + crosswalk substrate.** 1175 controls, organised into
  domains, with a **Secure-Controls-Framework (SCF)-style crosswalk**: per-control
  maps to `frameworks`, `risks`, `threats`, `evidence_requests`,
  `assessment_objectives`, `maturity_levels`. Frameworks carry `geography`
  (Universal/US/EMEA/APAC/Americas). Selecting frameworks derives **MCR**
  (Minimum Compliance Requirements — the union of mapped controls); **DSR**
  (Discretionary) toggles add-ons; **MSR = MCR + DSR**; per-control weighting
  (1–10 heatmap, per-client overridable).
  > **[Concept]** This is the **framework-of-frameworks / Rosetta-stone** idea in
  > operational form: one control set that many source standards crosswalk onto,
  > with derived compliance sets and a verbatim `.xlsx` crosswalk export
  > (sheets: Frameworks, Domains, Risks, Threats, Evidence Requests + six
  > per-control map sheets). The session does NOT discuss *parsing source
  > standards to build the controls* — the catalog is treated as an existing
  > asset (SCF-derived), so the "build our own controls by parsing standards"
  > ambition is **not present here**.
  > _source:_ `session2.jsonl` (SPECS §4, crosswalk `GROUPS`, USAGE §crosswalk) ·
  > _promote:_ Record (concept) · _pre-skill:_ /grill

- **Token system v2** — a curated, definition-aware, context-resolved
  find/replace layer: 73 distinct inline tokens (14 global text, 5 option,
  54 NICE work-role refs like `[OV-MGT-001]`), with a `token_acknowledged`
  table recording "reviewed — leave literal" so a CI `--check` guard can fail
  only on genuinely NEW orphan tokens. Three "provisional" tokens
  (`[process operator]`, `[primary]`, `[alternate]`) surfaced as amber badges,
  left literal pending a business decision.
  > _source:_ `session2.jsonl` (CHANGES token-v2 + acknowledge entries) ·
  > _promote:_ Record (reference) — capture the token taxonomy + CI-guard design.

- **NICE work-role integration** — the NICE framework hierarchy (8 categories /
  42 specialties / 73 roles) drives collapsible work-role token assignment per
  client.

- **Document composition model** (the reworked "bookshelf"): named,
  section-sized **content blocks** (rich markdown, figures embedded via
  `![caption](asset:ID)`), **dynamic blocks** that expand controls/procedures
  from the DB at generation time, a **Block Library** (UID + tags + usage
  counts, searchable), and a **Document Outputs** batch surface (select multiple
  documents + crosswalk → generate a zip). CSOP (operating-procedures) suite is
  a second document type alongside DSP.

- **Client vs Global-Master context model** — a workspace shell separating the
  shared master catalog/authoring (admin) from per-client "customer iterations."

## The one architectural pivot (the closest thing to ecosystem intent)

> **[Decision]** **Rework the Authoring UX around a section-sized block library +
> outline authoring + dynamic-from-DB blocks; never duplicate structured data
> (controls/procedures) as content blocks.** Triggered by the owner: "we have
> totally missed the mark on the Authoring UX." Target model: content blocks are
> NAMED library parts (front-matter = 1 block, a doc ≈ 3 blocks, NOT 42);
> outline-style editing (MS Word Outline View); dynamic blocks expand
> controls/procedures at generation; a separate Document Outputs batch surface.
> _source:_ `session2.jsonl` (pivot turn + AskUserQuestion answers) ·
> _promote:_ Record (adr) — this is the load-bearing composition decision.

Supporting decisions made in-session:

- **Production must never reference `source_files/`** — assets move to `assets/`
  (hard constraint the owner stated flatly).
- **Assets are identity-keyed** (e.g. `figure #1339`) so they cross-reference an
  existing asset library; many-to-many usage tracking.
- **No real versioning yet** — the owner pushed back on an overstated
  "version-controllable" claim; agreed there is only `created_at`/`updated_at`
  + coarse git-on-`dsp.db`; design intent recorded (content/dynamic blocks =
  every-save; structured data = publish checkpoint with mandatory changelog),
  deferred.
- **Use specific process identifiers (`P-GOV-01`)** for accuracy in dynamic
  procedure expansion.
- **Preview available in both Authoring and Document Outputs**; future intent:
  **Authoring becomes admin/Global-context only** (client users get Outputs).
- **WYSIWYG editors must advise on supported style tags** (styles defined in
  Authoring, respected by the `.docx`); token insertion is a future feature.

## Ecosystem-level intents (what the session implies about the bigger picture)

These are inferred from the product shape, not stated as vision this session:

1. **Multi-standard compliance substrate.** The crosswalk catalog is explicitly
   built to let one control set answer many source frameworks across
   jurisdictions — the "framework-of-frameworks" spine of the wider vision.
2. **Client-productised policy generation.** The Global-Master vs Client split +
   token/work-role resolution + batch Document Outputs signals a **repeatable,
   per-client delivery product** (an advisory/consulting productisation), which
   is the plausible bridge to the "AI practice / AI advisory" angle the brief
   named — though that angle is **never stated here**.
3. **Evidence/assurance hooks present but latent.** `evidence_requests`,
   `assessment_objectives`, `maturity_levels`, `risks`, `threats` all exist in
   the schema — the raw material for **risk quantification / FAIR / assurance**
   downstream — but this session does nothing with them beyond the crosswalk
   export.

## Open threads / unresolved forks

- **Versioning** — deferred; design recorded, not built. (Every-save for blocks,
  publish-checkpoint + changelog for structured data.)
- **Provisional tokens** (`[process operator]`/`[primary]`/`[alternate]`) —
  promote-to-def vs leave-literal decision left to the owner.
- **CSOP `.docx` generator**, per-procedure I-O metadata table, "by suite/shelf"
  organisation of Document Outputs — backlog, unbuilt.
- **Asset CRUD UI** (upload/delete/replace/rename), naming the unnamed baseline
  figures — backlog.
- **Bulk find/replace mapping workbook (Piece 5)** and **verbatim crosswalk
  `.xlsx` (Piece 6)** — partially present (crosswalk export exists) / blocked on
  user inputs.
- **Deferred cleanup** — orphaned workspace output actions
  (`previewControls`/`generateDocument`/`exportCrosswalk`) confirmed unused, not
  removed.
- **Handoff** — session ends with the owner deliberately handing off to a fresh
  agent session "to minimise context windows exhaustion" and exporting the
  conversation as `.jsonl` (the file we ingested). This is a workflow signal:
  the owner already runs a session-chaining / context-budget discipline.

## Lessons (transferable)

- **Sandboxed preview iframe blocks native `window.prompt/confirm/alert`** — the
  "+ New" button "did nothing" until all native dialogs were replaced with
  inline UI. A recurring class of bug when the app renders inside a preview
  frame.
- **Figure-embed alt text collided with the token regex** (`[Figure 1 ...]`
  matched as a token) — fixed with a `(?<!!)` lookbehind across all token
  regexes. The find/replace layer must exclude image-alt brackets.
- **f-string ValueError from `{...}` JSON in a SQL comment** — build-code gotcha.
- **The owner corrects overstated claims** (the "version-controllable" pushback)
  — provenance discipline: don't oversell capabilities into user-facing copy.
- **Schema-change checklist is strict** (throwaway-DB verify → backup → live
  migrate → regenerate `dsp_schema.sql` + diagrams → update consumers → log
  TODO/CHANGES) — a mature, dogfooded governance ritual already in place in the
  source project.

## How this differs from a first session

- **Altitude:** execution, not charter. It assumes the product is decided and
  grinds a prioritized backlog; the only design-level move is the Authoring-UX
  pivot (mid-altitude, not ecosystem-altitude).
- **Density:** ~30 commits, a context compaction mid-session, heavy tool-call
  volume — a working session, not a thinking session.
- **Scope:** it reveals exactly **one** distinct product (the DSP generator) and
  one architectural substrate inside it (the crosswalk catalog). It does **not**
  name the broader ecosystem components (FAIR, OSCAL, cyber-insurance,
  AI advisory, standalone policy/dossier product, "build our own controls by
  parsing standards"). If those exist, they live in a different (likely earlier
  or later, more strategic) session — this one is the build arm of the vision.

## Sources

- Session export: `C:/temp/ncf-platform-conversation-c3c69ed5.jsonl` (Artifact +
  provenance — frozen source).
- Rendered transcript: `dogfood/project-map/session2-transcript.md`
  (4213 events / 1603 turns; renderer `scripts/transcript.mjs`).
- In-transcript source reads (upstream, in the PelotonControlFramework repo, not
  ingested here): `CLAUDE.md`, `TODO.md` (STATUS block), `CHANGES.md`,
  `SPECS.md` §4–5, `USAGE.md` — cited as evidence, not promoted.
- ~30 session commits (`053381c` … `9564bbb`) in the source repo — Artifacts,
  cited for provenance; not reachable from this vault.
