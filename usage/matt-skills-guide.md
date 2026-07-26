# Matt Pocock Engineering Skills — Practical Guide

A working reference for the Matt Pocock skill set (the `ask-matt` family). What each skill is, the workflow they form, when to reach for them, when NOT to, and where to run them.

The canonical map is `/ask-matt` — a router that names the flow for your situation. When in doubt, run `/ask-matt` and let it point you. This guide is the flattened version of that map.

**Mental model:** there is one **main flow** (idea → ship). Two **on-ramps** merge onto it. Everything else is either a **vocabulary layer** running underneath, a **session bridge**, or **standalone**.

**Where to run:** most of these are Claude Code sessions **inside a code repo** — they read the codebase, write ADRs, and file tickets. A few (`grill-me`, `research`, `teach`) are stateless or vault-friendly and can be run from the vault or any directory. Flagged per skill below.

---

## 1. The main flow: idea → ship

The route most work travels: you have an idea and want it built. Keep steps 1–3 in **one unbroken context window** — do not compact or clear until after `/to-tickets` — so the grilling, spec, and tickets all build on the same thinking. Then each `/implement` starts fresh.

| Step | Skill | One line | When to use |
|------|-------|----------|-------------|
| 1 | `/grill-with-docs` | Relentless interview that sharpens the idea AND leaves a paper trail (`CONTEXT.md`, ADRs). | Start here when you **have a codebase**. |
| 2 | (branch to prototype) | Detour only if a question needs a runnable answer. | See §6 `prototype`; bridge with `/handoff` both ways. |
| 3 | `/to-spec` | Synthesises the thread into a spec on the tracker — no new interview. | Multi-session build. |
| 3 | `/to-tickets` | Splits the spec into tracer-bullet tickets, each declaring its blocking edges. | Multi-session build, right after `/to-spec`. |
| 4 | `/implement` | Builds one ticket by driving `/tdd` internally, then runs `/code-review` before commit. | Per ticket, **clearing context between each**. Or run in-place for a single-session build. |
| — | `/tdd` | Red-green-refactor a concrete behaviour test-first. | On its own when you want one behaviour built test-first, no full spec. |
| 5 | `/code-review` | Two-axis review (Standards + Spec) of the diff vs a fixed point, in parallel sub-agents. | On its own to review any branch/PR. |

**Run from:** all of these are **code-repo-only** (they need the codebase, tracker, and git history).

**When NOT to:**
- Don't `/to-spec` / `/to-tickets` for a **single-session** build — just `/implement` in the same window.
- Don't run steps 1–3 across a compact/clear boundary — you lose the shared thinking.
- If a single window approaches the ~120k-token **smart zone** before `/to-tickets`, don't push on degraded — `/handoff` and continue fresh.

---

## 2. On-ramps

A starting situation that generates work, then merges onto the main flow.

- **`/triage`** — incoming bugs and requests piling up. Moves raw issues through triage roles and produces agent-ready briefs that `/implement` later picks up.
  - **When NOT:** only for issues **you didn't create**. Tickets `/to-tickets` already produced are agent-ready — don't re-triage them.
  - **Run from:** code repo (needs the tracker + codebase context).

- **`/diagnosing-bugs`** — something's broken, and it's a **hard** one: resists a first glance, an intermittent flake, or a regression between two known-good states. Refuses to theorise until it has a **tight feedback loop** (one command that already goes red on *this* bug), then fixes with a regression test. Hands off to `/improve-codebase-architecture` when the real finding is "there's no good seam to lock this down."
  - **When NOT:** overkill for an obvious one-line bug you can already see and reproduce.
  - **Run from:** code repo.

- **`/wayfinder`** — a **huge, foggy** effort (greenfield project or a huge feature) too big for one session, where the way from here to the destination isn't visible yet. Charts a **shared map** of decision tickets and resolves them one at a time, producing **decisions, not deliverables**, until the fog clears. Then it **hands off** onto the main flow at `/to-spec`.
  - **When NOT — use sparingly.** This is the most cognitively demanding, slowest, densest flow here. Never use it for a well-scoped feature or anything you can hold in one session — that's what `/grill-with-docs` is for. **Over-reaching for wayfinder is the over-ceremony trap that sank the prior project.** If the effort turns out genuinely small, skip the map and go straight to `/implement`.
  - **Run from:** code repo (writes decision tickets to the tracker).

---

## 3. Codebase health — upkeep, not features

- **`/improve-codebase-architecture`** — scans the codebase for **deepening opportunities**, presents them as a visual HTML report, and grills through whichever one you pick. Picking one *generates an idea* you take into the main flow at `/grill-with-docs`. It's the survey that finds candidates.
  - **When NOT:** not a feature-delivery tool — it produces ideas, not shipped code.
  - **Run from:** code repo.
- **`/codebase-design`** — see §4. It's the design bench you shape a chosen module on (the survey finds it; this designs it).

---

## 4. Vocabulary layers (run underneath)

Two model-invoked references, each the single source of truth for its vocabulary. Reach for them directly when the **words**, not the process, are the problem — or let the skills above pull them in.

- **`/domain-modeling`** — sharpen the project's **domain** language: challenge a fuzzy term, resolve an overloaded word ("account" doing three jobs), record a hard-to-reverse decision as an ADR. This is the discipline `/grill-with-docs` drives to keep `CONTEXT.md` a clean glossary.
- **`/codebase-design`** — the **deep-module** vocabulary (module, interface, depth, seam, adapter, leverage, locality) for designing a module's *shape*: a lot of behaviour behind a small interface at a clean seam. `/tdd` and `/improve-codebase-architecture` both speak it.
  - **Run from:** code repo (they read/write project docs and ADRs).

---

## 5. Crossing sessions — `/handoff` vs `/compact`

- **`/handoff`** — compacts the current conversation into a markdown file. You **do not continue in place** — you open a **new session** and reference that file to carry the context across. The bridge between context windows, in either direction (e.g. out to a `/prototype` session and back).
  - **Use when:** you want a **fresh session** but need the **current conversation preserved**. `/handoff` **forks**.
- **`/compact`** (built-in) — stay in the **same** conversation and let earlier turns be summarised.
  - **Use when:** at an **intentional break between phases**, and you don't mind losing verbatim history. `/compact` **continues**.
  - **When NOT:** never compact mid-phase — the agent can lose its way.

---

## 6. Standalone

Off the main flow entirely.

- **`/grill-me`** — the same relentless interview as `/grill-with-docs`, but **stateless**: no `CONTEXT.md`, saves nothing locally. For sharpening any plan or design that **doesn't live in a repo**.
  - **Run from:** anywhere — **vault-friendly**. Good for ideation before code exists.
- **`/prototype`** — a small, **throwaway** program answering one design question (does this state model feel right? what should this UI look like?). Keep the answer, delete the code. It's the step-2 detour in the main flow, but reach for it any time a design question is hard to settle on paper.
  - **When NOT:** not for production code — it's disposable by design.
  - **Run from:** code repo or a scratch dir.
- **`/research`** — delegate reading legwork to a **background agent**: investigates a question against **primary sources** and leaves a cited Markdown file in the repo. Keep working while it reads. Its output is something to take *into* `/grill-with-docs` — research feeds the thinking, it doesn't replace it.
  - **Run from:** code repo or **vault** (it just writes a Markdown file).
- **`/teach`** — learn a concept over multiple sessions, using the current directory as a stateful workspace.
  - **Run from:** anywhere; **vault-friendly** for a learning workspace.

---

## Common use cases

Concrete needs mapped to a skill path.

1. **Scope a new POC / feature in an existing repo**
   `/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement` (per ticket, clearing context between) → `/code-review`.
   Keep grill → spec → tickets in one window.

2. **A wave of incoming bug reports and feature requests**
   `/triage` (turn raw reports into agent-ready briefs) → `/implement` picks them up.
   Don't triage tickets you already generated with `/to-tickets`.

3. **An intermittent production bug nobody can pin down**
   `/diagnosing-bugs` (build a red feedback loop first, fix with a regression test) → if the finding is "no seam to lock it down," it hands off to `/improve-codebase-architecture` → that idea re-enters the main flow at `/grill-with-docs`.

4. **Sanity-check an idea before there's any code (vault ideation)**
   `/grill-me` (stateless, from the vault) or `/research` for a cited fact-find → carry the output into a repo session at `/grill-with-docs`.

---

## The one warning

**Don't over-ceremony.** Reach for the lightest skill that fits. `/wayfinder` and the full spec→tickets machinery are for genuinely large, foggy, multi-session work — not for a feature you can hold in one head. Reaching for the heavy flow on well-scoped work is exactly what sank the prior project: process outran the work. When unsure, run `/ask-matt` and take the lighter path it suggests.
