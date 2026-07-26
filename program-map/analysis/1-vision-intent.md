# NCF Platform (nimbalyst attempt) — Vision & Intent Recovery

Read-only investigation of `D:\Git\ncf_platform-nimbalyst` (branch `harness/nimbalyst-migration`,
anchored to the `pre-nimbalyst` tag `f46ea85`). Lens: recover *intent* from the documented
wiki/design artifacts, not the code. All citations are file paths in that repo.

**Orientation of the source material.** This repo is itself a *replatforming-off-nimbalyst*
attempt. The richest intent evidence is not a single vision doc — it's the reconstructed
**intent-ledger** built from 8 exported Claude "Manager" session transcripts
(`wiki/lessons-learned/intent-ledger/` + `SYNTHESIS.md`), plus the design/PRD/worldview docs
under `wiki/`. There is **no ratified "true north"** — `wiki/true-north.md` is a one-line
placeholder ("DRAFT — awaiting owner ratification"). So the end-state has to be triangulated
from the worldview doc, the AI PRD, and the owner's own verbatim quotes in the ledgers.

---

## 1. The intended end-state — what the ecosystem was meant to BE and DO

**Two layers of ambition, explicitly ordered.** The *near-term tangible product* is a
policy/procedure document generator; the *eventual destination* is a full risk-management +
AI-advisory practice.

Product north star (verbatim), `wiki/prd/ai-advisory.md` §1:
> "**North star:** SimpleRisk-style risk management is the *eventual* destination; the
> **near-term tangible value is policy/procedure dossier creation**, which most clients can
> adopt at low maturity. AI features must earn their keep against *that* value first
> (dossier-first, risk-mgmt-later — resolved 2026-06-24)."

What the platform IS today (its built core), `wiki/reference/SPECS.md` §1:
> "The NCF Platform turns a structured cybersecurity-controls database into tailored,
> client-specific **policy documents** (Digital Security Program / 'DSP'). It replaces a
> manual spreadsheet-crosswalk-then-hand-write-Word process with a data-driven pipeline plus
> a web workbench."

The **domain worldview is risk-first** and is the load-bearing philosophy of the whole
ecosystem (`wiki/reference/RISK_CONTROL_WORLDVIEW.md` §2):
> "Risk is therefore **primary**; controls are the **response**. If a risk did not exist, the
> control addressing it would have no reason to exist. Any design that treats the control set
> as the starting point and risk as an afterthought is backwards."

The **capstone deliverable** of the risk layer is a FAIR "risk on a page" — the model on one
sheet, per critical risk (`RISK_CONTROL_WORLDVIEW.md` §6):
> "This is the capstone deliverable: it joins risk → threats → controls → assessed rating →
> target, per critical risk."

The full future stack is captured in the AI PRD's 9 epics (E1–E9,
`wiki/prd/ai-advisory.md` §2): client-context intake → grounded Q&A copilot → baseline risk
register + control seed → dossier authoring assist → prioritised roadmap → threat model +
control overlay → maturity-tiered guidance → evidence/completeness validator → **FAIR-structured
cyber risk quantification (CRQ)**. This is the "extensive, research-heavy, first-to-market
AI-driven security practice" the owner described — encoded as a phased backlog (POC → MVP →
Release), **all SPECIFIED, NONE BUILT**.

**A strategic pivot mid-flight.** After a stakeholder meeting (2026-06-24) the AI ambition was
re-scoped to a **standalone Australian-statutory advisory POC** in a separate repo
(`ncf_cyber_agent`), decoupled from the platform (D-018), verbatim
(`wiki/lessons-learned/intent-ledger/4d892482-….md` I-09):
> "the focus would be around providing expert advice, based on Australia statutory requirements
> … Build a stand-alone poc with a focus on pre-existing data (both structured and
> unstructured)."

Constraints on that POC: persist sessions; intake is just text/markdown of client context ("no
elaborate risk assessment .docx etc"); grounded on the ACSC **ISM-OSCAL** Australian standards
(`github.com/AustralianCyberSecurityCentre/ism-oscal`) (C-05/C-06/C-07). Method: **owner
supplies an exemplar "information paper", the agent abstracts a reusable skeleton from it**
(CR-03). So the AI practice was to be Australian-jurisdiction-first, exemplar-driven, and
built on pre-existing public standards rather than licensed content.

---

## 2. The first-step deliverable — the policy-generation flow

This is the one part that was actually **built** (a working FastAPI + React app). The intended
flow, from `wiki/reference/SPECS.md` §1:

**Inputs → selection → composition → output:**
1. **Stores** the full controls catalog — "1175 controls across 33 domains" and their
   many-to-many mappings to frameworks, risks, threats, evidence, maturity — in a single
   SQLite `dsp.db`.
2. **Selects** the controls relevant to a client by **picking the client's compliance
   frameworks**. Membership is *derived*: a control is in scope (**MCR** = Minimum Compliance
   Requirements) if it maps to any chosen framework; the user hand-adds discretionary extras
   (**DSR** = Discretionary Security Requirements) per the client's risk appetite.
   `MSR = MCR ∪ DSR` is the final selected set.
3. **Composes** documents from reusable, ordered **content blocks** (authored prose + control
   sections that point at a control row).
4. **Personalises** per client via **substitution tokens** (`[Company Name]` → real name) and
   optional per-control **weighting overrides**.
5. **Generates** a styled Microsoft Word **`.docx`** using a Word template purely as a
   stylesheet ("template-as-stylesheet, not template-as-content"), and **exports the selection
   as an `.xlsx` crosswalk**.

**Intended UX / workbench:** a React UI over a FastAPI JSON API providing "selection, preview,
generation, export, per-client persistence, token editing, and full document/block CRUD"
(SPECS §1). Design principles that must not regress (SPECS §1.53): component-based generation
from scratch; template-as-stylesheet; **"edit raw, resolve late"** (tokens stay literal in
storage, resolved only at preview/generate); style-via-indirection (`style_role` → Word style
name); heading levels *derived* from PCF dotted-id depth, never stored.

So the concrete first deliverable = **select controls (via frameworks + hand-added DSR) →
generate client-ready `.docx` policy doc + `.xlsx` control crosswalk.** This matches the
owner's stated first deliverable exactly. A real CSOP operating-procedures `.docx` output was
also an explicit target (ledger `ef96fe9d` E38: "Real target is a CSOP operating-procedures
.docx output").

---

## 3. The framework ambition — own control framework vs SCF, and the licensing angle

The catalog content is **SCF/ComplianceForge-derived** (the DSP / "DevModel" workbooks, CSOP,
Risk & Threat catalogs all live under `source_files/` as *licensed upstream inputs*). The
platform's internal identifiers are **PCF-* / pcf_id** ("Peloton Control Framework" — see the
stray `pelotoncontrolframework` project reference in ledger `4d892482` F-04). The ambition was
to **de-brand PCF → NCF** ("Networx Control Framework") as the owner's own framework identity.

**The de-brand is staged and deliberately shallow first.** `wiki/reference/SPECS.md` (§ crosswalk
export, ~line 165):
> "**De-brand is labels/headers only** (PCF→NCF in sheet titles + column headers; row data and
> code identifiers — `pcf_id` values, the `PCF-B/E/R/I` framework codes — pass through
> verbatim; the code rename is the separate PCF→NCF migration)."

The full identifier rename is roadmap **R-027** ("PCF→NCF de-brand migration: rename
`pcf_*`/`PCF-*` identifiers across `build_db.py`, `api.py`, schema, frontend; a separate,
sequenced migration after the cutover", `wiki/reference/ROADMAP.md`).

**The licensing angle is the deal-breaker driver.** The owner treats the SCF/ComplianceForge
`source_files/` as licensed and therefore *not committable* — this is a hard constraint, and it
is one of the most-repeated in the corpus. Verbatim (`SYNTHESIS.md` §4 item 3, from MT thread):
> "Right the licensed products is the deal breaker on commit source_files/ … I have saved a
> copy out to local_source_files/ that can safely be added to .gitignore"

This is why `source_files/` must stay untracked/gitignored and the routine build must read only
the **de-licensed committed baselines** in `build/baselines/*` — see the "Build inputs —
NON-NEGOTIABLE" section of `CLAUDE.md` and D-022. The version label is standardised as
**`NCF-2023.3.3`** (SPECS §1). The strategic through-line: **own the framework (NCF) so the
product isn't hostage to SCF's licence** — decouple the shipped artifact from the licensed
upstream, keeping the upstream only as a local, on-demand "import a new version" tool.

> NB: I did not find an explicit doc that says in one sentence "build our own framework because
> SCF is unlicensed" — the ambition is reconstructed from (a) the licensing deal-breaker
> constraint, (b) the systematic PCF→NCF de-brand (R-027 + the labels-only first pass), and
> (c) the de-licensed-baselines build rule. The intent is unambiguous across those three; it is
> just never stated as a single vision sentence. (The code-lens agent may find more in
> `build_db.py`/`api.py`.)

---

## 4. The AI-practice / dogfooding angle — how AI bootstraps the security practice

**Two distinct "AI" stories in this repo — do not conflate them:**

**(a) AI *inside the product* (the AI Advisory Layer)** — how AI makes the security practice
scalable. Architecture principle (`wiki/design/ai-advisory-design.md`):
> "**LLM produces a structured intermediate; deterministic code performs the consequential
> action** (render, score, or write via existing endpoints). The model never writes to the DB
> directly and never renders pixels."

It is grounded by an **authority split** (design doc "Domain fit"): the **doctrine docs are
authoritative for the DOMAIN MODEL** (encoded in the system prompt so the model *frames*
answers risk-first), while the **live `dsp.db` is the source of truth for the DATA** (retrieval
grounds in it via existing FTS5 tables `controls_fts`/`ao_fts`). Guardrails G1–G7: grounding +
per-record citations, grounded-or-**abstain** ("not in the curated corpus", never invent),
propose-don't-commit ("the agent proposes; the human disposes"), surface-gating (consultant-only
vs client skills), auditability, and a mandatory eval harness. The POC anchor was **client
intake → grounded copilot → baseline risk register seed**, "immediately demoable" and
demonstrating "the whole risk-first chain" (`prd/ai-advisory.md` §1). All SPECIFIED, NOT BUILT.

**(b) AI *building the product* (agentic dogfooding)** — the whole platform was built by an
**agent operating model**: a persistent read-only **Manager** session + **PM** sessions
dispatching sub-agents in git worktrees, gated by the owner. The governing laws
(`wiki/operating/operating-model.md`): *Sanitise before persist · Expunge before execute · One
truth per fact · Provenance or it didn't happen · **Human gate on record state**.* The owner is
explicit that the human is *only the gate* (`SYNTHESIS.md` §4 item 8):
> "No, YOU squash-merge PR #20, it's your job! I'm just a gate."

So the AI-practice-bootstraps-security-practice thesis operates on both axes: AI-in-product
scales delivery once features ship, and AI-as-builder was meant to let one owner run a
multi-agent shop. **This second axis is where the attempt went pear-shaped** — huge effort went
into agent/tracker harness scaffolding (the "derailment archetype", see §5) instead of shipping
features.

---

## 5. Open intent / unresolved tensions — GOLD for a /wayfinder

`wiki/lessons-learned/intent-ledger/SYNTHESIS.md` §5 records **9 explicit owner-vs-owner
contradictions, left unresolved** (verbatim, quoted here condensed):

- **CX-1** Deferral agreed then declared unacceptable in the same message ("agree - defer" vs
  "I am uncomfortable in delaying something that was a hard gate to being production prep
  ready").
- **CX-2** "Rebasing is completely pointless" vs earlier "recreate clean exports using live.db
  … imported at build time" — whether these are the same operation is the live ambiguity.
- **CX-3** `source_files/`: strip-down/de-license it vs use it as a *tracked* destination to
  move docs into ("proceed with Phase-1, move .docs to source_files/ and track").
- **CX-4** PR #21: "Woah - you did a merge and reap without my go ahead???" vs "let PR#21
  stand … push/merge."
- **CX-5** Architect agent: "I definitely need to run concurrent agents" (→ worktree) vs "I'll
  leave it in the console for now."
- **CX-6** D-013 zero-retention vs "for the POC we should persist sessions" (privacy vs
  persistence).
- **CX-7** Merge/reap: gated "on my confirmation" vs after-the-fact "In and of itself this is
  fine."
- **CX-8** CRA timing: "deliver CRA by 2pm tomorrow" vs ~35 min later "I'll delay until end of
  week."
- **CX-9** CRA sequencing: "let's get ambitious with … concurrent session" vs "clean baseline
  before adding CRA."

**Recurring loops that never durably resolved** (`SYNTHESIS.md` §2–3), the top derailments:
1. **Build still ingests `source_files/`; baselines framed as backups not BUILD INPUTS** —
   the dominant thread, peak frustration: *"It IS A BROKEN BUILD…"*, *"We are going in
   circles!"*, *"we need BUILD INPUTS - if we can't build from them they are useless!!!!"*.
2. **`frontmatter_ingest` / `.docx` ingestion re-mischaracterised** as a build step despite
   being ruled a one-time tool 3+ times ("A ONE TIME TOOL", folding into "your performance
   today is woeful").
3. **Agents leaning on other agents' summaries over primary sources / sycophancy** — the
   owner's own root-cause for the collapse: *"HUMAN THAT GETS PAID FOR THINKING!!!! … THE
   DOCTRINE PRECISELY WARNS AGAINST IT"*, *"don't agree by default"*.
4. **Merge/reap gate breached** in two separate threads.
5. **Source-of-truth ORDERING doctrine reverted in a fresh agent** ("I thought we fixed this").

**Genuinely open decisions (never settled), from `wiki/prd/ai-advisory.md` §7 + ROADMAP:**
- PII redaction posture for uploaded documents (MVP).
- External MITRE ATT&CK / STIX ingest — in-boundary or out of scope (Release).
- **FAIR licensing** — REQUIRED before E9: confirm Open FAIR only (FAIR-CAM/-MAM are
  CC BY-NC-ND → inspiration only). A direct parallel to the SCF licensing tension.
- Replace the context-dropdown **soft** consultant/client boundary with real auth.
- R-019 per-control token cadence (design blocked); R-029 the 2023.3.3 catalog data gaps
  (owner must supply exports); R-036 provisional token values; R-037 bulk find/replace mapping.

**The meta-tension (the reason this repo exists):** the owner explicitly lost confidence in the
codebase and diagnosed the failures as **memory, governance and boundary failures, not coding
ability** (`wiki/lessons-learned/nimbalyst-experiment/nimbalyst-migration-archetype.md` §1). The
nimbalyst harness itself is called the **"derailment archetype"**
(`wiki/lessons-learned/nimbalyst-experiment/README.md`):
> "a large share of effort went into building bespoke tooling *around* the Nimbalyst tracker …
> instead of into the product."
That is the crux the owner's new "lean substrate" approach is reacting against.

---

## Key source files (all in `D:\Git\ncf_platform-nimbalyst`)
- `wiki/reference/SPECS.md` — the built product (policy-doc POC): purpose, domain concepts
  (MCR/DSR/MSR/tokens), generation pipeline, de-brand-labels-only rule.
- `wiki/reference/RISK_CONTROL_WORLDVIEW.md` — the risk-first doctrine + FAIR "risk on a page"
  capstone. The philosophical anchor.
- `wiki/prd/ai-advisory.md` + `wiki/design/ai-advisory-design.md` — the AI practice north star,
  E1–E9 epics, authority split, guardrails. SPECIFIED, NOT BUILT.
- `wiki/design/cra-design.md` — the CRA (Cyber Risk Assessment) engine spec (SP-RMM math).
- `wiki/reference/ROADMAP.md` — 38-item consolidated roadmap (R-027 de-brand, R-026 AI held).
- `wiki/decisions/DECISIONS.md` — the D-001…D-025 owner-decision register (D-018 standalone POC,
  D-022 build-inputs inversion, licensing constraints).
- `wiki/lessons-learned/intent-ledger/SYNTHESIS.md` — **the single best intent artifact**:
  verbatim owner constraints, 9 unresolved contradictions, ranked derailments.
- `wiki/lessons-learned/intent-ledger/4d892482-….md` — the standalone-POC pivot detail.
- `wiki/lessons-learned/nimbalyst-experiment/README.md` + `nimbalyst-migration-archetype.md` —
  why it went pear-shaped ("derailment archetype"; memory/governance/boundary failures).
- `wiki/operating/operating-model.md` — the agent governing laws + human gate.
- `CLAUDE.md` — the working agreement, "Build inputs NON-NEGOTIABLE" (de-licensed baselines).
- `wiki/true-north.md` — **empty placeholder** (no ratified vision statement exists).
