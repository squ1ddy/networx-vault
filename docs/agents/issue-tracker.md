# Issue tracker: backlog.md

Tasks and specs (you may know a spec as a PRD) for this vault are tracked with
[**backlog.md**](https://github.com/MrLesk/Backlog.md) — a markdown-native task manager driven by the
`backlog` CLI. Tasks live as markdown files under `backlog/tasks/`. **This vault owns its own
backlog** — it is the work layer for the knowledge you keep here.

> If `backlog/` doesn't exist yet, run `backlog init` once to scaffold the project
> (`backlog/tasks/`, `backlog/drafts/`, `backlog/docs/`, `backlog/decisions/`, and `config.yml`).
> A freshly stamped vault already ran `backlog init`, so it is present.

## Conventions

- One task per file: `backlog/tasks/task-<id> - <title>.md`, created and mutated **through the CLI** — don't hand-edit the id/status frontmatter.
- Each task file has frontmatter (`id`, `title`, `status`, `assignee`, `labels`, `created_date`) plus body sections: **Description**, **Acceptance Criteria**, **Implementation Plan**, **Implementation Notes**.
- Statuses are backlog.md's workflow columns — `To Do`, `In Progress`, `Done`. **Triage state is a label**, not a status (see `triage-labels.md`), applied with `-l` — and only for issues you did *not* author; self-authored tickets are already agent-ready. Triage is **dormant** until external issues arrive.
- A larger effort is a parent task with subtasks (`task-3.1`, `task-3.2` …) created via `backlog task create --parent 3`.
- Specs / PRDs live as documents under `backlog/docs/` (`backlog doc create "<title>"`); architectural decisions under `backlog/decisions/` (`backlog decision create "<title>"`). (Durable knowledge instead becomes a **Record** in the vault — see `CONTEXT.md` if this vault has one.)
- **Milestones** are workstreams; **priority** is urgency; the **`mvp`** label marks a release cut. **Definition of Done** is a project default in `config.yml`, checked at finalization with evidence. See `workflow-alignment.md` for how these align with the Backlog.md manifesto and Matt's skills.

## When a skill says "publish to the issue tracker"

Create a task:

```
backlog task create "<title>" -d "<description>" --ac "<criterion>" --ac "<criterion>" -l <label> -s "To Do"
```

For a spec/PRD, use `backlog doc create "<title>"` instead and reference it from the task.

## When a skill says "fetch the relevant ticket"

```
backlog task <id> --plain          # view a single task (plain text, no TUI)
backlog task list --plain          # list all tasks
backlog task list -s "To Do" --plain
```

Always pass `--plain` in an agent context so output is parseable and non-interactive.
The user will normally pass the task id (e.g. `task-7`) or number directly.

## Mutating a ticket

```
backlog task edit <id> -s "In Progress"     # move across the board
backlog task edit <id> -l ready-for-agent   # apply a triage label
backlog task edit <id> --ac "<new criterion>"
```

`backlog board` renders the Kanban view for a human; agents should prefer the `--plain` list/view commands above.

> **CLI gotchas (Windows):** the `backlog` CLI is an npm `.cmd` shim, so a `|` pipe *anywhere* in a
> `--plan` / `--notes` / `--final-summary` value breaks arg parsing — use `/` or `,` instead. In
> PowerShell a bare `@name` splats — quote assignees as `-a '@agent'`.
