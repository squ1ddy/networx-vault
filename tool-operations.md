---
title: Tool operations cheat-sheet
type: reference
status: active
date: "2026-07-24"
---

# Tool operations cheat-sheet

Agents read this so the human never memorises tool syntax. Our stack: **backlog.md CLI (v1.48)** + **markitdown** (ingest) + **pandoc** (export) + **Telegram long-poll daemon** (capture) + **Obsidian canvas**. When unsure, run `backlog <cmd> --help` — it ships excellent help.

> **This page is operational truth** — everything here works today. The fuller intended capability set (plain-English capture/ingest/triage commands, richer Telegram capture, node-scoped canvas actions) is the framework roadmap: `docs/roadmap/vault-vision.md`.

## 1. backlog.md (tasks & bugs) — v1.48

Canonical state lives in `backlog/` markdown. **Never hand-edit those files** — the CLI owns IDs, filenames, metadata, and relationships. `auto_commit` is off, so **commit task changes with git** like any other edit. Always pass `--plain` for agent-readable output.

### Read / search
- `backlog task list --status "To Do" --plain` — filters: `--labels`, `--type`, `--assignee`, `--parent`, `--priority`, `--limit`
- `backlog task view TASK-123 --plain`
- `backlog board` — terminal kanban

### Create
- `backlog task create "Title" -d "Why/outcome" --ac "Testable criterion" --ac "Another"`
- Labels: `-l a,b` · subtasks: `-p TASK-010` · dependencies: `--dep TASK-021` (comma-separated or repeat)
- Type a bug: `--type bug` (types: bug, feature, enhancement, task, chore, docs, spike)
- Statuses: "To Do" → "In Progress" → "Done". Write tasks so a future agent can act without this conversation's context.

### Work / finish
- Start: `backlog task edit TASK-123 -s "In Progress" -a @claude`
- Plan (after research, before code): `backlog task edit TASK-123 --plan "1. ..."`
- Notes: `--append-notes "..."` · discussion: `--comment "..."`
- Check a criterion (1-based, only with objective evidence): `--check-ac 1`
- Finish: `--final-summary "Changed X, verified with Y"` then `-s Done`

> Edit-flag gotchas: labels on `edit` use `--label` / `--add-label` / `--remove-label` (not `-l`); `--notes` **replaces**, `--append-notes` appends. Then `git add backlog/ && git commit`.

## 2. Ingest (markitdown) / Export (pandoc)

**The split: markitdown IN, pandoc OUT.**

- **Ingest** — `markitdown <file>` converts `.pdf` / `.pptx` / `.xlsx` / `.docx` / images → markdown. Lands the result in the Inbox (QC-exempt) for triage into records.
  - `markitdown report.docx -o report.md`
- **Export** — `pandoc` converts our markdown → `.docx` / `.pdf` / `.html` for outbound deliverables.
  - `pandoc note.md -o note.docx`
  - `pandoc note.md -o note.pdf`
  - `pandoc note.md -o note.html`

## 3. Canvas (Obsidian)

The canvas is a **derived spatial view** over records, not a separate store — a native Obsidian feature you lay out by hand. Conventions:

- **Nodes embed record files** — a node points at a record's markdown file, never a fork of its content.
- **Agent proposals are additive-only** — new nodes go **into a "Proposals" group**, never mixed into the human's layout.
- **Never edit or move human nodes.** Agents add; the human curates, links, and relocates.

## 4. Telegram capture

Remote/mobile capture via a **local outbound-polling daemon** (`getUpdates`) — no public endpoint or inbound port (per ADR-0002). Messages land **passively in the single Inbox** (`VAULT_INBOX`).

- plain text — captured to the Inbox as a `type: idea` note (every capture is an idea today).
- `/proj <name> <msg>` — the same capture, plus a `project: <name>` frontmatter tag. **The name is free text you type; it does not route to a separate inbox and there is no project lookup.**
- `/status` — runs `backlog task list -s "In Progress" --plain` and returns the result.

> Run it: `node scripts/telegram-capture.mjs` (config in `.env`; point it at your own bot from BotFather — a generic example, not a specific bot).
> Richer Telegram capture (message typing, attachment / PDF capture, real per-project routing) is on the framework roadmap — `docs/roadmap/vault-vision.md`.

## Session logs

Archive a Claude Code session as frozen provenance (an Artifact/source) with a matchable name:

1. Run Matt's `/handoff` to produce the human-readable summary of the session.
2. Run `node scripts/session-log.mjs <path-to-session.jsonl> --title "..."` to copy the raw `.jsonl` into `session-logs/<date>-<slug>-<id8>.jsonl` (original bytes preserved) plus a matching `.md` sidecar.
3. Paste the `/handoff` summary into that sidecar `.md`. The two share a basename so transcript and summary stay paired.
