# /wayfinder input — Networx security practice

The one-page brief. Pair with `PROJECT-MAP.md` (the full context). Feed both to `/wayfinder`.

## Destination (what must be true when this is "done")

A **data-driven, multi-suite cybersecurity document/policy practice**: client-ready `.docx`/`.xlsx` dossiers generated from an **owned, de-licensed control framework (NCF)** — the near-term revenue engine — with **FAIR risk quantification** and an **AI advisory** layer as later "shelves," all built and operated through an AI-agent practice. Near-term proof: **regenerate the working dossier output from the existing `live.db` (preserving the per-client token model), then de-license the framework by parsing source standards.**

## Scope discipline (the three rings — the rule the wayfinder must hold)

- **Ring 1 — core, grounded:** NCF control framework → document factory → the 20+ suite bookshelf. Insurance (NCF-I) is a data-grounded profile, best aimed at **real Australian client contexts**.
- **Ring 2 — the forks below** (what wayfinder decides).
- **Ring 3 — research horizon** (`link_list`: FAIR, OSCAL, ontologies, open-source tools, funding). **Reference on tap, never scope.** Ingest into the vault only when a decision pulls one in.

## The decision map (resolve roughly in this order)

1. **Scope line** — what is explicitly *not* in the near-term build?
2. **Build-own-framework (NCF) vs stay SCF-derived** — parse source standards (NIST 800-53 first) to own a de-licensed framework. *(Leaning: yes — it's the keystone.)*
3. **Sequencing: DB-first vs parse-first** — *(Leaning: rebuild from `live.db` first for a fast usable POC + to keep the token model; de-license by parsing standards as the forward clean-up.)*
4. **Canonical data source & CI build model** — de-licensed baselines; how CI rebuilds NCF from parsed sources. *(The most expensive fork.)*
5. **Stack choice** — keep the proven Python generation core (the OOXML/`.docx`/`.xlsx` engine) vs replatform the app/AI layer (e.g. Vercel AI SDK / TS). Bias: proven-stack rebuild for POC speed; reconsider only if the AI-native app layer becomes the center.
6. **Rebuild vs port the old code** — *(Leaning: rescue the data, rebuild the thin layer clean — no faith in the old code.)*
7. **Authoring / WYSIWYG UX** — the biggest adoption risk (consultants won't use markdown-in-a-textarea; see `ui-issues.txt`).
8. **FAIR risk-quant — Ring 2 (now) or Ring 3 (later)?**
9. **Portfolio + command-steering structure** — how the vault holds many workstreams, and **how Matt-Pocock commands are steered to one branch** (per-component repos vs scoped vault sub-contexts vs the dispatcher). *An early vault ADR.*
10. **Business model & tenancy** — consultant tool vs client product; single vs multi-tenant.
11. **Open-source evals** — adopt/replatform vs build (SimpleRisk / CISO-Assistant / verinice).
12. **Funding shaping** — AU grants (CSIRO, R&D tax, Defence) influence sequencing.

## First tracer-bullet (DB-first)

As one backlog task + one ADR in a component repo: **rebuild the dossier generator from `live.db` (with the token model) → regenerate ONE dossier section → output-parity test against the known-good output.** Then the *second* tracer-bullet de-licenses: parse ONE standard (NIST 800-53) → CI builds that NCF slice from the baseline only → same section regenerates → parity holds.

## How to run

`/wayfinder` against this + `PROJECT-MAP.md` → it charts the decision tickets, resolves each (decisions, not deliverables) → `/to-spec` → `/to-tickets` → `/implement` **in the per-component repo**, not the vault.
