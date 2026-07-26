# User verbs

You drive the system in plain English; the agent translates each verb (any phrasing) into the tool operation below. You never learn tool syntax.

This page lists **only what works today**. The fuller intended verb set — plain-English `/capture`, `/ingest`, `/triage`, grounded "ask the vault" queries, node-scoped canvas actions, an ADR verb — is the framework roadmap, not built yet: see `docs/roadmap/vault-vision.md` in the framework repo.

| Human says (any phrasing) | Agent does | Command |
|---|---|---|
| "braindump", "dump this, don't file it" | Writes raw text straight to `Inbox/`, QC-exempt, no filing decision | *(direct edit — none by design)* |
| "capture from my phone", "text it to the vault" | Telegram long-poll daemon drops the message into `Inbox/` as a `type: idea` note; `/proj <name>` adds a free-text `project:` tag; `/status` replies | `node scripts/telegram-capture.mjs` |
| "ingest this file", "convert this to markdown" | markitdown converts the file to markdown for the Inbox | `markitdown <file> -o <out.md>` |
| "break this PRD into tasks" | Creates backlog tasks with ACs from an approved requirement | `backlog task create "<title>" --ac "<criterion>" -s "To Do"` |
| "log a bug", "something's broken" | Backlog task labelled as a bug (or jot to `Inbox/` for triage) | `backlog task create "<title>" -l bug -s "To Do"` |
| "what's on the board", "what's next" | Lists tasks and summarizes; offers the Kanban view | `backlog task list --plain` (human: `backlog board`) |
| "move this to in progress / done" | Edits task status across the board | `backlog task edit <id> -s "In Progress"` |
| "export this", "hand this off" | Matt's `/handoff` writes a session-log handoff; pandoc exports markdown to the target format | `/handoff` (+ `pandoc <in.md> -o <out.ext>`) |

See [[tool-operations]] for the exact syntax behind each command.
