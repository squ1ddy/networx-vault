# Ecosystem Project Map — Networx security practice

The **wayfinder seed at portfolio altitude.** Synthesized (2026-07-26) from: the two founding sessions (`session1/2-companion.md`), the `ncf_platform-nimbalyst` 3-lens analysis (`../ncf-analysis/`), `ui-issues.txt` (dossier-generator UX), and `link_list.txt` (research breadth). Staged in `dogfood/` — headed for `networx-vault`, not the substrate.

## The single most important framing: three concentric rings

Most of your paralysis comes from these three being mixed together. They are not the same, and the wayfinder must treat them differently:

1. **CORE PRODUCT (grounded, partly built)** — what the founding sessions + platform actually define and build. Tight, real, de-riskable.
2. **FORWARD DECISIONS (the big forks)** — a handful of architectural choices that reshape the core. This is what `/wayfinder` resolves.
3. **RESEARCH HORIZON (the `link_list`)** — a huge field of resources/tools/standards to *explore for potential inclusion*. **This is evidence-on-tap, NOT committed scope.** Treating it as scope is what makes the project feel infinite.

> The wayfinder decides Ring 2, grounded in Ring 1, with Ring 3 as reference. It should never try to "solve" Ring 3.

## The components (initiatives)

| Component | What it is | State |
|---|---|---|
| **PCF — Peloton Control Framework** | The proprietary ~1,175-control **Rosetta-stone** crosswalk (in-house controls ↔ NIST 800-53 / CSF / ISO 27001 / jurisdictional). The IP. | **Built as data** (SCF-derived). Forward: rebuild *de-licensed* by parsing source standards. |
@SM - To be renamed moving forward as NCF platform, hoever we may be using some source material that still states PCF
| **NCF Platform / document factory** | FastAPI+SQLite+React engine: controls → client `.docx` policies + `.xlsx` crosswalks. | **Works** (tests pass) — but code is doctrine-laden; *no faith*. Rescue the data, rebuild the thin layer. |
@SM - agreed, I'm wondering about two things - #1 were the correct engines chosen to begin with are should we be considering platforming with something like Vercel's AI SDK (per Matt Pocock course), either way I can't write code so it doesn't really matt. It's just more about fast deliver to usable poc vs extensibility in the future. #2 do we rebuild this now based on the data that is in the live.db, which also considers per-client injectable tokens (there was some significant thinking behin this) before try to recreate it all from ingested policy documents (which may or may not be related to decisions we make about oscal / UCO / other taxonomy frameworks)
| **DSP generator** | First "shelf": client baseline policy suite. | **Works.** |
| **CSOP suite** | Second shelf: standard operating procedures. | In progress. |
| **The "bookshelf"** | Extensible meta-product: **20+ document suites** (vuln mgmt, IR, SOPs…), token system spanning suites. | Planned; the real productisation play. |
| **PCF-B/I/E/R sub-frameworks** | Curated control profiles by industry/strategy. **PCF-I = Cyber-Insurance Duty of Care** (real NAIC / MA 201 CMR 17 / FAR refs). | Data exists; insurance angle is **data-grounded, not aspirational.** |
@SM - good as useful examples but for more valuable for real australian based client contexts.
@SM - Honeslty I had a decent session with claude where I fed it financial regulation data, it helped me produce an information paper and we even then start to build a threat model poc code but I can't locate it, if you could felp me locate it and put the jsonl and artfaces in D:\Git\platform_research_sessions\financial_example-treatmodel that would be awesome
| **AI practice / substrate** | The knowledge-task substrate + skills we built this week — to dogfood and build everything else. | **Built.** |
| **AI agents over control data** | Agentic querying/advisory over PCF (FTS5 + API built with this in mind). | Future requirement (turn-1 intent). |
| **FAIR risk quantification (CRA)** | Risk-first scoring / "risk on a page". | **Spec'd** (in ncf-analysis), research-heavy. Forward decision. |
| **Cyber-insurance productisation** | A market vertical seeded by PCF-I. | Data-grounded seed; research horizon for the market. |
| **Open-source evals** | SimpleRisk, CISO-Assistant, verinice/veo, GovReady-Q, eramba — clone + run through their paces. | Research horizon; vault holds the keep/replatform/reject decisions. |
| **OSCAL / policy-as-code / ontologies** | Compliance automation + knowledge-graph threads. | Research horizon (`link_list`); NOT in the founding build. |

## The cross-cutting decision forks (the ecosystem wayfinder list)

Higher-altitude than the platform-specific questions in `../ncf-analysis/README.md` — resolve these *first*:

1. **Scope discipline** — draw the line between the near-term build (Ring 1) and the research horizon (Ring 3). *What are we explicitly NOT doing yet?*
2. **Build-own-framework vs SCF-derived** — parse source standards (NIST 800-53 first) to rebuild PCF *de-licensed*. **(You're leaning yes.)** This is the keystone; it makes the document factory a consumer of *your* framework.
3. **Canonical data source & build model** — the de-licensed baselines; how CI rebuilds PCF from parsed sources. *The most expensive fork.*
4. **Rebuild vs port the platform code** — recommendation: rescue the *data*, rebuild the thin generation layer clean (you have no faith in the code, rightly).
5. **Authoring / WYSIWYG UX** — the **biggest adoption risk**: consultants won't use markdown-in-a-textarea (`ui-issues.txt` details the real workflow: Global-Master vs Client context, an Authoring section, token management, bulk find/replace, the 20+ suite).
6. **FAIR / risk-quantification — in near-term scope, or later?** (Ring 2 vs Ring 3.)
7. **Portfolio structure** — how `networx-vault` organizes the many initiatives (topic-MOCs + component-milestones + canvas; separate code repos per buildable tool). *An early vault ADR.*
8. **Business model & tenancy** — consultant tool vs client-facing product; single vs multi-tenant.
9. **Funding shaping** — the AU grants (CSIRO Kickstart, R&D tax, Defence) influence timing/scope/sequencing.
10. **Open-source evals** — which to adopt/replatform vs build (SimpleRisk / CISO-Assistant / verinice).

## Sequence & dependencies

**PCF (de-licensed) is the foundation.** Everything downstream — document factory, sub-frameworks, insurance profiles, risk quant, AI advisory — consumes it. So the build order is *framework-data-first*, product-second, advisory-third.

## Recommended first tracer-bullet

The thinnest end-to-end slice that forces the keystone decisions (#2, #3) early and yields a demoable artefact — as **one backlog task + one ADR** in `networx-vault`:

> **Parse ONE source standard (NIST 800-53) into a small de-licensed baseline → CI builds the PCF slice from that baseline only (fails if it can't reproduce) → generate ONE dossier section from it → an output-parity test.**

This proves the framework-of-frameworks is buildable de-licensed *and* re-establishes the working generator on a canonical source you own.

## How to run the wayfinder from here

Compose a **one-page brief**: the destination paragraph *(a data-driven, multi-suite security-document practice built on an owned, de-licensed control framework, with risk-quant and AI advisory as later shelves)* + **the 10 forks above**. Feed that to `/wayfinder`. It charts the decision map, resolves each → `/to-spec` → `/to-tickets` → `/implement`. **Ring 3 (`link_list`) is reference you point at when a decision needs it — never the map itself.**

## Research horizon (`link_list`, grouped — parked, not scope)

Framework-of-frameworks / GRC-mapping · FAIR risk quantification · cyber-insurance data · OSCAL compliance automation · threat modeling / MITRE · ontologies & knowledge graphs · AI / agentic tooling · open-source tool evals · AU funding. **Ingest into `networx-vault` as `research`/`reference` records when a decision actually pulls one in** — do not try to consume it up front.
