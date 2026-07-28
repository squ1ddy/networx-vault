---
type: reference
title: backlog CLI gotchas
created: 2026-07-25
updated: 2026-07-25
topic: substrate/tooling
tags: [reference, backlog, tooling]
source:
related: ["[[example-prd]]"]
next:
status: active
---
# backlog CLI gotchas

## Summary

Hard-won notes on driving the `backlog` CLI without corrupting task metadata. A `reference`
is durable, look-it-up knowledge — no observation/inference split, just the facts you want
on hand next time. Collected while dogfooding task execution in this repo.

## Details

- **Never hand-edit task files.** Edit `backlog/tasks/*.md` only through
  `backlog task edit`; direct edits desync the metadata, filenames, and history the CLI
  maintains. (Enforced by CLAUDE.md.)
- **No `|` (pipe) characters** inside `--plan`, `--notes`/`--append-notes`, or
  `--final-summary` values. The pipe is parsed by the tool and mangles the field. Rephrase to
  avoid it entirely.
- **Quote the assignee sigil.** Use `-a '@agent'` in single quotes; an unquoted `@` can be
  eaten or misread by the shell.
- **Read before you mutate.** Run `backlog task view TASK-NNN --plain` first — status and
  acceptance criteria may have changed since the task was created.
- **Read the right guide before lifecycle actions.** `backlog instructions task-creation`
  before creating, `task-execution` before planning/status changes, `task-finalization`
  before checking acceptance criteria or writing the final summary.
- **`--help` is authoritative.** Accepted statuses and field names differ per install; run
  `backlog task edit TASK-NNN --help` rather than guessing a status string.

## Sources

- CLAUDE.md `<CRITICAL_INSTRUCTION>` block (backlog.md workflow rules).
- `backlog instructions overview` / `task-execution` / `task-finalization`.
- First-hand friction while running [[example-prd]]-style tasks in this repo.
