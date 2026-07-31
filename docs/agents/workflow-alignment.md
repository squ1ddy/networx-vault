# Workflow alignment: Backlog.md manifesto + Matt's skills

How this vault's practice lines up with the **Backlog.md manifesto** and the **Matt Pocock
engineering skills**, plus the shared conventions agents and humans work by. Sources: Backlog.md
`MANIFESTO.md` and `ADVANCED-CONFIG.md`; the `/ask-matt` router.

## The manifesto's Core Loop *is* Matt's flow

They map almost 1:1 — reassuring, because it means the two don't fight.

| Backlog Core Loop | Matt skill(s) |
|---|---|
| 1. Capture intent | `/grill-with-docs`, `/to-spec` |
| 2. Review scope (refine ACs) | `/to-spec`, `/to-tickets` |
| 3. Plan (record approach) | task-execution `--plan` |
| 4. Review the plan (human steering) | plan approval before consequential work |
| 5. Execute one unit | `/implement` → `/tdd` (red-green) |
| 6. Verify actual behaviour | `/code-review` + task-finalization (evidence, not code presence) |
| 7. Preserve the record | implementation notes + final summary + git |

Shared tenets we hold to:
- **Intent readable before implementation** (grill → spec → ACs).
- **Review before consequence** — record a plan and let a human steer before consequential work.
- **Small reviewable units** — tracer-bullet tickets, not epics.
- **Verify actual behaviour with objective evidence** — never check an AC from code presence or grep output alone.
- **One model for humans and agents** — no agent-only meanings; everything legible in Markdown.
- **Fail closed on ambiguous identity** — read a task before mutating it; never guess which task.

## The axes — keep them separate

Each concern rides its own axis; don't collapse them:

- **status** — execution lifecycle (`To Do` / `In Progress` / `Done`). Board columns; keep few (manifesto: *simplicity over layers*).
- **milestone** — workstream / area you group tasks by.
- **priority** — urgency (`High` / `Medium` / `Low`).
- **assignee** — who acts (`@owner` or an agent).
- **labels** — orthogonal facets: e.g. an `mvp` release cut, and triage disposition.

Note this `status` axis is the **backlog task** status (board columns). It is a *different* thing
from the vault-file `status` frontmatter below — don't conflate them.

## Vault-file `status`: two values, one rule

Markdown files in the vault carry a frontmatter `status`, and there are **two distinct concepts**
behind it. Pick by asking *"is this file a record that matures through the pipeline, or a perpetual
operating doc?"*

- **Record health status** — the enum `active | draft | needs-review | superseded`. For actual
  **Records** (files whose `type:` is a record type — idea/research/concept/prd/reference/adr/source-note)
  and the record **templates**. It is a *health/attention signal*, not a supersession doctrine; the
  reference-integrity/health lint surfaces `draft`/`needs-review`/`superseded` so incomplete or stale
  records get picked up. Example: `tool-operations.md` (`type: reference`) is a record → `active`.
- **Doc status `living`** — for perpetual, non-record **operating docs** that are continuously
  maintained and never "mature" through the pipeline, so the health enum simply doesn't apply. These
  are the **Brief** (`BRIEF.md` / `BRIEF.template.md`), **`personas-and-stories.md`**, and the
  **`usage/*` guides**. `living` deliberately keeps them out of the health lint's attention list —
  they are not "stale records," they are the docs. (Some also carry a record `type:` for rendering;
  `status: living` is what marks them as an operating doc, and it wins.)

**The rule:** a file that is an actual Record uses the health enum; a perpetual operating doc uses
`living`. Never give a Record `status: living`, and never put a perpetual operating doc on the health
enum. ADRs (if this vault keeps them) are their own case — they use the ADR lifecycle (e.g.
`accepted`), unrelated to either of the above.

## Triage labels are dormant here (for now)

`needs-triage · needs-info · ready-for-agent · ready-for-human · wontfix` are an **on-ramp lifecycle
that runs *before* the status lifecycle**, driven by the `/triage` skill.

- They apply **only to issues you did *not* author** (incoming bug reports / feature requests, e.g.
  filed by `/qa`). Self-authored tickets from `/to-tickets` are already agent-ready and **must not**
  be triaged.
- They are **labels, not statuses** — deliberate (see `issue-tracker.md`). Status = how far along;
  triage = has it been vetted, and by whom.
- A fresh vault's backlog is typically **entirely self-authored, so triage is dormant.** It wakes
  when external issues start arriving.

## Definition of Done

The bar every task is checked against at finalization, **with evidence**:

1. Acceptance criteria verified with objective evidence (not code presence)
2. Relevant tests and checks pass
3. Changes reviewed via `/code-review` (Standards + Spec)
4. Implementation notes and final summary recorded

Make this a **project-level default** so it applies to every task automatically: set
`definition_of_done` in `backlog/config.yml` (a fresh `backlog init` does not seed one). Per-task
additions use `--dod` at create/edit. This bar is deliberately **lean** so it doesn't choke velocity,
and it is **expected to evolve** (e.g. CI green once CI exists; a follow-up human-review task for
load-bearing / high-stakes work — the manifesto's *review before consequence*).

**Automation seam:** Backlog supports `onStatusChange` (a shell command on status change, with
`$TASK_ID` / `$OLD_STATUS` / `$NEW_STATUS`). That is the hook for enforcing DoD, triggering CI, or
updating an activity badge as the DoD matures.

## Picking the next skill for a task (workflow adherence)

Every open task has an intended Matt-Pocock **entry point**. Pick by the task's *readiness*, not its
topic. When it's non-obvious, record it in the task notes as `Next skill: …`.

- **Well-specified feature/chore (ACs pinned, you could write the test)** → **`/implement`**. It
  drives **`/tdd`** (red-green) internally and closes with **`/code-review`** (Standards + Spec)
  before committing — so you do **not** schedule `/tdd` or `/code-review` as separate steps; they
  live *inside* `/implement`.
- **Fuzzy scope / UX or requirements undecided / "define X"** → **`/to-spec`** → `/to-tickets` →
  `/implement`.
- **Big, foggy, multi-decision effort** → **`/wayfinder`** first (decisions, not deliverables), then
  `/to-spec` onward.
- **Exploration** ("which tool?", "does this feel right?") → **`/prototype`** or **`/research`**.
- **A decision only the owner can make** (`awaiting-human` label) → owner resolves; no skill. It
  usually unblocks a downstream task.
- **Harvest/ingest of existing material** → **`/research`** to mine, then the substrate pipeline
  **`/harness:ingest`** → **`/harness:promote`**.

**Rule of thumb:** if you're tempted to `/implement` but can't yet write the acceptance test, you
needed `/to-spec` (or `/grilling`) first.
