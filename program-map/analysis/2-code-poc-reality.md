# NCF Platform (nimbalyst) — Code & PoC Reality

Investigation of `D:\Git\ncf_platform-nimbalyst`. Lens: what the CODE actually does and what the PoC actually proved. Read-only.

## Headline

The product code is **small, complete, green, and entirely nimbalyst-free**. It already does the owner's first concrete deliverable end-to-end: **select controls -> generate client-ready `.docx` policies + a multi-sheet `.xlsx` crosswalk, bundled as a `.zip`**. Nimbalyst was never in the product; it was a project-management harness (YAML trackers + wiki automations) that consumed effort *around* the product. The "pear-shaped" failure was process/tooling derailment, not a code dead-end. The database and the two generator modules are highly salvageable.

Evidence of health (from `docs/baseline-report.md`, tag `pre-nimbalyst`): frontend `tsc -b` + `vite build` pass; backend `pytest` 10/10 green; build-from-baselines reproduces the live DB.

---

## 1. What actually runs (real capabilities)

Backend is a single FastAPI app. Entry points:

- **`api.py`** (1809 lines) — the whole HTTP surface. Real, working endpoints:
  - `GET /api/controls?frameworks=...` — full 1175-control catalog in document order; flags MCR (mapped-compliance) vs the client-side DSR layer. `_catalog()` at api.py:774.
  - `GET /api/frameworks` — the 239-framework list (api.py:756).
  - `POST /api/documents/{id}/generate` — renders a **stored** document to `.docx` (api.py:238).
  - `GET /api/documents/{id}/preview` — HTML preview (api.py:211).
  - `POST /api/outputs/batch` — **the flagship deliverable** (api.py:996): generates selected stored docs (one `.docx` each, dynamic control-blocks expanded) PLUS an optional crosswalk `.xlsx`, zipped into `document-outputs.zip`.
  - Full CRUD for documents, blocks, a reusable block library, assets/images (upload, rename, GC, usage-count), clients, and per-client control selections (MCR/DSR designations, weighting overrides).
- **`generate_doc.py`** (501 lines) — the `.docx` engine. `render_stored_document()` (line 454) is the main path; `generate_from_controls()` (line 442) builds a doc from an ad-hoc ordered pcf_id list — literally "select controls -> docx". Handles style-role -> Word-style indirection, heading level *derived* from PCF id depth, minimal markdown -> runs (bold/italic/bullets), figures with side panels, and **footnotes via raw OOXML** (python-docx has no native support — the notable hard part they solved). Also a CLI (`python generate_doc.py "<title>" out.docx --template tpl.docx`).
- **`tokens.py`** (68 lines) — client-token resolver (`[Company Name]` -> value) with a def-aware resolver closure; unmapped tokens left verbatim.
- **`render_preview.py`** — drives Word via COM to export PDF, then PyMuPDF -> PNG page images for visual QA. Windows/Word-dependent (the only OS-coupled piece).
- **`tools/build_db.py`** — rebuilds `dsp.db` from committed `.sql` baselines (routine, stdlib-only) or re-imports from licensed source `.xlsx`/JSON via `--from-upstream`. Plus a full family of exporter/ingest/seed tools under `tools/`.

The `.xlsx` crosswalk generator is `_crosswalk_workbook()` (api.py:906) + `_crosswalk_refs()` (api.py:862) + `_table_sheet()` (api.py:841): a styled primary "Control Crosswalk" sheet (Domain/PCF/Control/Weighting heat-map/MSR/MCR/DSR) plus 11 reference/mapping sheets (Frameworks, Domains, Risks, Threats, Evidence Requests, Control-Framework/Risk/Threat/Evidence maps, Maturity Levels, Assessment Objectives), with per-control maps scoped to the selection.

**Frontend** (`frontend/src/`, React + Vite + TS, builds clean): `SelectionView.tsx` (control picker), `AuthoringView.tsx`, `DocumentOutputsView.tsx` (the batch generate/zip UI), `ProceduresView.tsx`, `TokensView.tsx`, `BlockLibraryView.tsx`, plus a ProseMirror-style rich editor (`editor/`) with token nodes and markdown round-trip.

**Works:** everything above (10/10 tests). **Stubbed/deferred:** dynamic block `selector='frameworks'` derivation returns `[]` (only `selector='explicit'` works — `_dynamic_pcfs`, generate_doc.py); true floating figure anchoring is a table-based stand-in; `render_preview.py` needs Word+COM.

---

## 2. The PoC that proves "build our own framework is doable"

The proof is **`dsp.db` + `tools/build_db.py` + the generators**, and it is convincing. It demonstrates a full, self-owned control framework and turns a control selection into finished client artifacts:

- **`dsp.db`** (20 MB, committed SQLite) contains a curated, real corpus:
  - **1175 controls** (`controls`), keyed by PCF id (GOV-01, GOV-01.1, ...), across **33 domains** — this is the SCF/PCF/NCF control set (descriptions are verbatim SCF "Mechanisms exist to..." text).
  - **239 frameworks** (`frameworks`) — ISO 27001/2, NIST 800-53 r4/r5 + baselines, CSF, CMMC, PCI DSS, SOC/TSC, GDPR, plus four home-grown **PCF-\* frameworks** (PCF-B/I/E/R: M&A, Cyber-Insurance, Embedded Tech, Ransomware) — direct evidence they authored their own framework layer.
  - **58,511 control-framework mappings** (`control_framework_map`) — the crosswalk that is the hard, valuable IP.
  - **1175 CSOP procedures** (`csop_procedures`), 4773 assessment objectives, 182 evidence requests, 33 risks, 27 threats, 33 policies, plus maturity levels and risk/threat maps.
- **`tools/build_db.py`** proves the corpus is *reproducible from source*: it parses the licensed `PCF 2023-x-x Crosswalk DevModel v0.1-RECOVERED.xlsx` + SCF JSON catalogs into the schema, and the equivalence tests (`tests/test_equivalence.py`) prove build-from-baseline == the live DB. So the framework is not a hand-built one-off — there is a pipeline.
- **End-to-end proof:** two seeded documents exist (`documents`: "Digital Security Program (DSP) — Baseline" and "Cybersecurity Standardized Operating Procedures (CSOP) — Baseline"), each with dynamic blocks that expand a control/procedure list into a rendered `.docx`. `generate_from_controls()` closes the loop from a bare selection.

**Control schema** (`initial_setup/dsp_schema.sql`, 37 tables): `controls(pcf_id PK, domain_id, policy_no, control_name, control_description, control_question, methods_to_comply, weighting, control_objective, standard_content, standard_guidance, target_audience, maturity tiers, ...)`. Selection is modeled in `client_selections(client_id, pcf_id, designation IN ('MCR','DSR'), weighting_override)`. This schema *is* the reusable definition of "our control framework."

---

## 3. Architecture & the nimbalyst dependency

Structure: SQLite (`dsp.db`) as single source of truth <- `tools/build_db.py` (from committed `build/baselines/*.sql`, or `--from-upstream` from licensed xlsx/JSON) ; FastAPI (`api.py`) reads the DB and composes documents from `content_blocks`/`document_blocks` (static markdown blocks + `dynamic` blocks that expand control/procedure lists) ; `generate_doc.py` renders to `.docx`, `_crosswalk_workbook` to `.xlsx` ; React/Vite frontend calls the API.

**Nimbalyst entanglement in product code: ZERO.** `grep -rniI 'nimbalyst' --include='*.py'` returns **nothing**. Nimbalyst appears only in:
- `.nimbalyst/trackers/*.yaml` (task/idea/plan/decision tracker configs),
- `nimbalyst-local/` (plans + disabled automations),
- `docs/nimbalyst-prep/`, `docs/reconciliation-ledger/`, and `wiki/lessons-learned/nimbalyst-experiment/` (post-mortem docs).

Per `wiki/lessons-learned/nimbalyst-experiment/README.md`, nimbalyst was the app the *project was run inside* — a tracker board + scheduled automations + custom `/wiki` slash command. Their own retro calls it the **"derailment archetype": effort went into bespoke tooling around the tracker (an `NCF-###` id model the app could not deliver, a custom ingest/lint command, scheduled compilers) instead of the product.** They are replatforming onto a plain git-markdown wiki. So nimbalyst is a *harness*, not a library dependency — it is not entangled with anything that generates documents.

---

## 4. Data assets (reusable, nimbalyst-independent)

All under `dsp.db` and `build/baselines/` — none depends on nimbalyst:
- **`dsp.db`** — the whole curated corpus (controls, 239 frameworks, 58k crosswalk mappings, CSOP, AOs, evidence, risks/threats, policies).
- **`build/baselines/NCF-2023.3.3_*.{sql,json,xlsx}`** — portable exports of every layer: `crosswalk`, `catalogs`, `csop`, `frameworks`, `risk_threat_catalog`, `content_blocks`, `asset_index`, `token_seed`, `demo_client_seed`. These are the rebuild inputs and are plain SQL/JSON.
- **`initial_setup/dsp_schema.sql`** + JSON schemas (`JSON_Schema_SCF 2023.2.json`, etc.) — the 37-table data model.
- **`source_files/`** — the licensed upstream: `PCF 2023-x-x Crosswalk DevModel v0.1-RECOVERED.xlsx` (12 MB, master crosswalk), SCF JSON catalogs, `CSOP - DSP version ... .xlsx`, and Word brand/style templates: **`Networx Style Template.docx`** and `Networx Document Template Master.docx` (also in `templates/`, used by the generators). `assets/` holds registered figures (FIG### codes).

---

## 5. Salvageable vs disposable

**Carry forward (high value):**
- `dsp.db` and `build/baselines/*` — the control corpus + crosswalk. Crown jewel; pure data.
- `initial_setup/dsp_schema.sql` — the control/selection/crosswalk data model.
- `generate_doc.py` — self-contained `.docx` engine incl. the hard-won raw-OOXML footnote code and token/style indirection. Depends only on `python-docx`.
- The `_crosswalk_workbook`/`_crosswalk_refs`/`_table_sheet` block from `api.py` — self-contained `.xlsx` generator (openpyxl only).
- `tokens.py` — client-token substitution.
- `tools/build_db.py` + exporters — the reproducible build pipeline + equivalence gate (`tests/test_equivalence.py`).
- `templates/Networx Style Template.docx` — brand styling the generators bind to.

**Disposable (nimbalyst-coupled / harness dead weight):**
- `.nimbalyst/`, `nimbalyst-local/` — tracker configs + disabled automations.
- `docs/nimbalyst-prep/`, `docs/reconciliation-ledger/`, `wiki/lessons-learned/nimbalyst-experiment/` — keep only as a cautionary post-mortem; not load-bearing.
- The heavy `dev_prompts/` + wiki doc sprawl (baseline report flags 74 markdown files, much historical).
- `render_preview.py` is optional (Word/COM-bound); nice-to-have, not core.

**Caveat:** the committed 20 MB binary `dsp.db` as source-of-truth is fragile (a UI autosave silently mutates it) — their own baseline report calls this the top migration risk. The `.sql` baselines are the safer canonical form to carry into the substrate.

---

## Single most important reusable asset

**`dsp.db` / `build/baselines/NCF-2023.3.3_crosswalk.*`** — 1175 owned controls across 33 domains mapped to 239 frameworks via **58,511 crosswalk entries**, reproducible from licensed source and exported as plain SQL/JSON. It is the actual proof that building their own control framework is doable, it is completely independent of nimbalyst, and everything else (docx/xlsx generation) is a thin, replaceable rendering layer on top of it.
