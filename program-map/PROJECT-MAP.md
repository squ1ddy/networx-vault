# Ecosystem Project Map — Networx security practice (v2)

The **wayfinder seed at portfolio altitude.** v2 integrates the owner's `@SM` annotations (v1 preserved as `PROJECT-MAP-v1-annotated.md`). Sources: the two founding sessions, the `ncf-analysis`, `ui-issues.txt`, `link_list.txt`. Staged in `dogfood/` — headed for `networx-vault`.

> **Naming:** the framework/product is **NCF** (Networx Control Framework / NCF Platform) going forward. Legacy source material may still say **PCF** — same thing.

## The single most important framing: three concentric rings

1. **CORE PRODUCT (grounded, partly built)** — NCF framework → document factory → the 20+ suite bookshelf. Tight, real, de-riskable.
2. **FORWARD DECISIONS (the forks)** — the architectural choices that reshape the core. This is what `/wayfinder` resolves.
3. **RESEARCH HORIZON (`link_list`)** — a huge field to *explore for maybe*. **Evidence-on-tap, NOT scope.** Ingest into the vault only when a decision pulls one in.

> Wayfinder decides Ring 2, grounded in Ring 1, with Ring 3 as reference — never tries to "solve" Ring 3.

## Components (initiatives)

| Component | What it is | State |
|---|---|---|
| **NCF — Networx Control Framework** | The proprietary ~1,175-control **Rosetta-stone** crosswalk (own controls ↔ NIST 800-53 / CSF / ISO 27001 / jurisdictional). The IP. | **Built as data** (SCF-derived). Forward: rebuild *de-licensed* by parsing source standards. |
| **NCF Platform / document factory** | FastAPI+SQLite+React engine: controls → client `.docx` policies + `.xlsx` crosswalks, incl. a **per-client injectable-token model** (real IP). | **Works** (tests pass); code doctrine-laden, *no faith*. Rescue the data, rebuild the thin layer. |
| **DSP generator** | First "shelf": client baseline policy suite. | **Works.** |
| **CSOP suite** | Second shelf: standard operating procedures. | In progress. |
| **The "bookshelf"** | Extensible meta-product: **20+ document suites** (vuln mgmt, IR, SOPs…), token system spanning suites. | Planned; the real productisation play. |
| **NCF-B/I/E/R sub-frameworks** | Curated control profiles by industry/strategy. **NCF-I = Cyber-Insurance Duty of Care** (real NAIC / MA 201 CMR 17 / FAR refs). | Data-grounded; **aim at real Australian client contexts**, not just illustrative. |
| **Learnings domain** *(NEW — from @SM)* | A growing **library of AI-usage sessions** where the owner solved real problems with/for the team. First seed recovered: the **financial-regulation → information-paper → threat-model POC** session (in `platform_research_sessions/financial_example-treatmodel/`). | Seed captured; grows via the session-locator + `/substrate:ingest`. Part of the *AI practice*. |
| **AI practice / substrate** | The knowledge-task substrate + skills built to dogfood and build everything else. | **Built.** |
| **AI agents over control data** | Agentic querying/advisory over NCF (FTS5 + API built with this in mind). | Future requirement (turn-1 intent). |
| **FAIR risk quantification (CRA)** | Risk-first scoring / "risk on a page". | Spec'd, research-heavy. Ring 2-or-3 decision. |
| **Cyber-insurance productisation** | Market vertical seeded by NCF-I. | Data-grounded seed; market = research horizon. |
| **Open-source evals** | SimpleRisk, CISO-Assistant, verinice/veo, GovReady-Q, eramba — clone + run through paces. | Research horizon; vault holds keep/replatform/reject decisions. |
| **OSCAL / policy-as-code / ontologies (UCO)** | Compliance automation + knowledge-graph threads. | Research horizon; NOT in the founding build. |

## The cross-cutting decision forks (the ecosystem wayfinder list)

1. **Scope line** — what's explicitly *not* in the near-term build?
2. **Build-own NCF vs stay SCF-derived** — parse source standards (NIST 800-53 first) to own a de-licensed framework. **(Leaning yes — the keystone.)**
3. **Sequencing: DB-first vs parse-first** *(from @SM)* — **(Leaning: rebuild from `live.db` first** for a fast usable POC + to preserve the token model; de-license via parsing as the forward clean-up.)
4. **Canonical data source & CI build model** — the de-licensed baselines; how CI rebuilds NCF. *The most expensive fork.*
5. **Stack choice** *(from @SM)* — keep the proven Python generation core (the `.docx`/`.xlsx` OOXML engine) vs replatform the app/AI layer (Vercel AI SDK / TS). Bias: proven-stack rebuild for POC speed; replatform only if the AI-native app layer becomes central. (Owner can't code → favour a stack **agents build well**.)
6. **Rebuild vs port the old code** — rescue the *data*, rebuild the thin layer clean.
7. **Authoring / WYSIWYG UX** — biggest adoption risk (`ui-issues.txt`: Global-Master vs Client context, an Authoring section, token mgmt, bulk find/replace, the 20+ suite).
8. **FAIR risk-quant — Ring 2 (now) or Ring 3 (later)?**
9. **Portfolio structure + command-steering** *(from @SM's question)* — how the vault holds many workstreams **and how Matt-Pocock commands are steered to one branch.** Three levers: **(a)** buildable components spin into their **own single-context repos** (where `/implement`, `/tdd` run natively); **(b)** vault-side thinking (`/grill`, `/research`) scopes via a **per-component MOC + folder** you name explicitly; **(c)** the **dispatcher (TASK-57)** primes a fresh session scoped to a branch. *An early vault ADR.*
10. **Business model & tenancy** — consultant tool vs client product; single vs multi-tenant.
11. **Open-source evals** — adopt/replatform vs build.
12. **Funding shaping** — AU grants (CSIRO, R&D tax, Defence) influence sequencing.

## Sequence & dependencies

**NCF (the framework data) is the foundation** — everything downstream consumes it. Near-term, that foundation is `live.db`; the forward move de-licenses it by parsing standards. Build order: **framework-data → document factory → sub-frameworks/insurance → risk-quant/AI-advisory.**

## Tracer-bullets (DB-first)

1. **Rebuild the dossier generator from `live.db`** (with the token model) → regenerate ONE dossier section → **output-parity test** against known-good output. *Fast usable POC.*
2. **De-license:** parse ONE standard (NIST 800-53) → CI builds that NCF slice from the baseline only → the same section regenerates → parity holds. *Solves licensing + the canonical-source fork.*

## Research horizon (`link_list`, grouped — parked)

Framework-of-frameworks / GRC-mapping · FAIR risk quant · cyber-insurance data · OSCAL · threat modeling / MITRE · ontologies & knowledge graphs · AI / agentic tooling · open-source tool evals · AU funding. **Ingest as `research`/`reference` records only when a decision pulls one in.**
