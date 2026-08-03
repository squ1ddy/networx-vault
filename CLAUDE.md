## What this repo is

This is a **substrate vault** — your knowledge and work layer. Records (typed markdown
notes) mature through a pipeline, and the **vault owns its own backlog** of tasks. It is
*not* the framework repo that produced it; the framework's scripts and skills are vendored
here, but decisions, tasks, and knowledge in this vault are yours.

Agent guides live in `docs/agents/` — read them when a skill or task touches the tracker or
conventions:

- **Issue tracker** — tasks and specs are tracked with **backlog.md** (`backlog` CLI), one
  markdown file per task under `backlog/`. See `docs/agents/issue-tracker.md`.
- **Triage labels** — five canonical roles (`needs-triage`, `needs-info`, `ready-for-agent`,
  `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.
- **Workflow alignment** — the axes (status vs milestone vs priority vs label), the
  record-vs-doc `status` rule, the Definition of Done, and **how to pick the next skill for a
  task**. See `docs/agents/workflow-alignment.md`.
- **Tool operations** — the cheat-sheet for every tool in the stack. See `tool-operations.md`.

## Conventions

- **Done means done.** A task reaches Done only when its deliverable is complete. If finishing
  it surfaces decisions only the owner can make, file an **`awaiting-human`**-labelled follow-up
  task capturing them (and reference it) *before* marking the original Done — never leave
  owner-decisions buried in task notes. Find them with
  `backlog task list --labels awaiting-human --plain`.
- **Reference tasks by clickable path.** When mentioning a task to the user, write its file path
  (e.g. `backlog/tasks/task-12 - Some-title.md`) so it is ctrl+clickable — not a bare `TASK-12`.
- **No `Co-Authored-By` trailer** on commits.

## CLI gotchas (Windows)

- **Pipes in `backlog` CLI values are safe.** `|` in `--content` / `--notes` / `--plan` /
  `--final-summary` values was tested against backlog v1.48.0 on 2026-08-03 from both
  PowerShell and Bash, and passed through byte-perfect — markdown tables included. (An
  earlier note here claimed the npm `.cmd` shim broke on pipes; that did not reproduce.)
- In **PowerShell** a bare `@name` triggers splatting — always quote assignees as `-a '@agent'`.
  (Untested — carried forward as a precaution; not covered by the 2026-08-03 test.)

<!-- BACKLOG.MD GUIDELINES START -->
<!-- backlog.md-instructions-version: 1.48.0 -->
<CRITICAL_INSTRUCTION>

## Backlog.md Workflow

This vault uses Backlog.md for task and project management.

**For every user request in this project, run `backlog instructions overview` before answering or taking action.**

Use the overview to decide whether to search, read, create, or update Backlog tasks.

Before task lifecycle actions, read the matching detailed guide:
- `backlog instructions task-creation` before creating or splitting tasks
- `backlog instructions task-execution` before planning, changing status or assignee, adding a plan or implementation notes, or implementing task work
- `backlog instructions task-finalization` before checking acceptance criteria, writing final summaries, or moving tasks to terminal statuses

Use `backlog <command> --help` before running unfamiliar commands. Help shows options, fields, and examples.

Do not edit Backlog task, draft, document, decision, or milestone markdown files directly. Use the `backlog` CLI so metadata, relationships, and history stay consistent.

</CRITICAL_INSTRUCTION>
<!-- BACKLOG.MD GUIDELINES END -->
