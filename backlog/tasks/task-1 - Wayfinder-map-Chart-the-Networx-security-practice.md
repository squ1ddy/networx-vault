---
id: TASK-1
title: 'Wayfinder map: Chart the Networx security practice'
status: To Do
assignee: []
created_date: '2026-07-27 05:43'
labels:
  - 'wayfinder:map'
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Destination

A **charted vault**. Done when:
1. The **scope line** is drawn — Ring 1/2 (in) vs Ring 3 (reference-on-tap, out), stated explicitly.
2. The **portfolio + command-steering structure** is decided as a vault ADR — how one repo holds many workstreams and how Matt-Pocock skills scope to one at a time.
3. The **keystone forks** — NCF ownership, DB-first vs parse-first sequencing, stack choice — are decided to the depth each needs to *unblock its next path*, not to build-readiness.
4. The **DB-first rebuild** is taken as far as adjacent research allows — a POC-grade spec for tracer-bullet #1 is best-effort, NOT a gate on 'done'.

*Nice-to-have:* each near-term workstream has a named concrete next path (own subdir / future wayfinder / grill-from-docs). A ticket resolving to 'open a future wayfinder session' is a valid resolution.

## Notes

- **Domain:** data-driven multi-suite cybersecurity document/policy practice. Framework = **NCF** (Networx Control Framework; legacy source may say PCF — same thing).
- **Three rings:** Ring 1 core/grounded (NCF -> document factory -> live shelves DSP/CSOP). Ring 2 forks (this map resolves these). Ring 3 research horizon (evidence-on-tap, never scope; pulled in only as research tickets).
- **Plan, don't do:** tickets resolve *decisions*, not builds. Execution hands off downstream (/to-spec -> /to-tickets -> /implement) — in a component subdir, per the monorepo lean.
- **Repo topology lean (owner):** monorepo — pull sibling code into referenced subdirs; a control plane to start/stop apps for exploration; single backlog. To be confirmed by the Portfolio ticket.
- **Skills to consult per session:** /grilling + /domain-modeling (default), /prototype (UX/behaviour), /research (AFK facts).
- **Source docs:** program-map/WAYFINDER-BRIEF.md, program-map/PROJECT-MAP.md.
- **Sessions-as-evidence:** owner will supply prior Claude-session examples (the Learnings domain); attach each as a --ref on the ticket it informs.

## Decisions so far

<!-- index: one line per closed ticket, gist + link. Populated as tickets resolve. -->

_(none yet — charting session lays the map down; it resolves nothing.)_

## Not yet specified (fog)

- **Business model & tenancy** — consultant tool vs client product, single vs multi-tenant. Owner has thinking done; ingestible near-term. Graduates once UX/product-shape decisions land.
- **Funding shaping** — AU grants (CSIRO, R&D tax, Defence) can reorder sequencing. Explicitly downstream: needs the rest of the graph first.
- **Control plane** — in-repo dev harness to start/stop pulled-in apps. Graduates once monorepo layout is decided (off the Portfolio ticket).
- **Which sibling repos get pulled in** — needs the monorepo layout first.

## Out of scope

- **OSCAL / policy-as-code / ontologies (UCO)** — Ring 3 research horizon, not the founding build.
- **AI agents over control data** — turn-1 intent but not near-term; future requirement.
- **Cyber-insurance *market* productisation** — market play is research horizon (the NCF-I *data profile* stays in Ring 1).
- **FAIR *implementation*** — the risk-quant build stays out until the FAIR Ring-2/3 ticket says otherwise.
- **20+ suite bookshelf *build*** — the productisation meta-product; DSP/CSOP are the live shelves.
- **Open-source GRC tool evals** — Ring 3; pulled in as per-fork research tickets, not standing scope.
<!-- SECTION:DESCRIPTION:END -->
