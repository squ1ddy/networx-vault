---
title: Interaction modes — how you actually drive this
type: reference
status: living
last_updated: 2026-07-24
tags: [usage, onboarding]
---

# Interaction modes

The other docs tell you *what to say* ([[user-verbs]]) and *what runs under the hood* ([[tool-operations]]). This one tells you **where you stand when you say it** — the five surfaces you can drive the system from, and what each can and can't do. Pick the surface that fits where you are; then use the plain-English verbs.

## 1. Claude Code session in the vault — the primary driver

**What it is.** Run `claude` in a terminal with the working directory set to the vault (`cd your-vault && claude`). You get the full agent: all skills, all tools (file edits, bash, backlog, markitdown, pandoc), grounded reads across every record.

**Good for.** Everything with substance — writing and editing records, running the toolchain (backlog tasks, markitdown ingest, pandoc export), and reading across the vault. This is the default; the rest of the docs assume you're here.

**Can't.** Requires a terminal at (or SSH'd to) the machine with the vault checked out — not a phone-from-the-couch surface. No GUI; you don't see the canvas render.

**How you invoke a verb.** Say it in plain English — *"break this PRD into tasks"*, *"convert this PDF to markdown"*, *"what's on the board"*. The agent translates to tool syntax ([[user-verbs]]); you never type a command. (The fuller plain-English verb set is the framework roadmap — `docs/roadmap/vault-vision.md`.)

## 2. Claudian (Obsidian plugin)

**What it is.** Runs the Claude Code CLI *inside* Obsidian, with the open vault as its working directory. Same engine as surface 1 — skills, slash commands, file/bash/tool access, MCP — but in a panel next to your notes instead of a separate terminal. Ref: `github.com/yishentu/claudian`.

**Good for.** Ideating and driving the agent *without leaving the vault* — you see the note and the canvas while the agent works on it. The "thinking in place" surface.

**Can't.** **Desktop-only** (no Obsidian mobile). Because it shells out to the `claude` binary, if you install Node via a version manager (nvm, fnm, volta) the plugin may not inherit your PATH — point it at an absolute `claude` path or launch Obsidian from a shell that already has the PATH.

**How you invoke a verb.** Same as surface 1 — plain English in the Claudian panel. Slash commands (e.g. `/handoff`) work too.

## 3. Obsidian-native (no agent)

**What it is.** Plain Obsidian: edit note markdown directly, plus plugin hotkeys — QuickAdd/Templater to stamp a new typed record from a template, Canvas Mindmap on a canvas (**Tab** = child node, **Enter** = sibling).

**Good for.** Fast, offline, no-LLM work — jotting a braindump straight into `Inbox/`, hand-editing a record you already know, laying out the canvas by hand. Zero latency, zero token cost, works with no network.

**Can't.** No agent means no translation, no grounded Q&A, no triage, no toolchain (backlog / markitdown / pandoc). You do the filing and the syntax yourself. Don't hand-edit `backlog/` files here — the CLI owns those ([[tool-operations]]).

**How you invoke a verb.** You *are* the executor. "Capture an idea" = QuickAdd a record from the Idea template (or drop text in `Inbox/`); "canvas this" = add the node yourself with Tab/Enter.

## 4. Telegram capture

**What it is.** A local outbound-polling daemon (`getUpdates`, no public endpoint) that drops any message you text the bot **passively into `Inbox/`** as a `type: idea` note. Plus `/proj <name> <msg>` (adds a free-text `project:` tag — no routing) and `/status` (reads back in-progress tasks). This is the accessibility path (ADR-0002) — the away-from-desk surface. Richer Telegram capture (typed capture, attachments, real routing) is roadmap — `docs/roadmap/vault-vision.md`.

**Good for.** Mobile / remote / hands-busy **capture only** — never lose a thought when you can't reach a desk (a binding constraint in `BRIEF.md`).

**Can't.** **Capture-only.** No editing, no triage, no promoting records, no grounded answers (beyond `/status`). Whatever lands sits in `Inbox/` until a real session (surface 1 or 2) triages it.

**How you invoke a verb.** Only two verbs exist here: *capture* (text the bot → lands in Inbox) and *status* (`/status`). Everything else waits for a session.

## 5. backlog CLI

**What it is.** `backlog task ...` run directly in a terminal — the task/board tool the agent itself uses, driven by hand.

**Good for.** Quick, precise task and board operations when you already know the syntax — creating a task, flipping status, viewing the board (`backlog board`).

**Can't.** Tasks only. Nothing about ideas, research, concepts, PRDs, the canvas, or the Inbox — those live in the vault, not backlog. You must know the flags (or run `backlog <cmd> --help`); there's no plain-English layer.

**How you invoke a verb.** Type the command, e.g. `backlog task create "Title" --ac "criterion" -s "To Do"` or `backlog task edit TASK-123 -s "In Progress"`. See [[tool-operations]] §1.

## Verb → surface map

Which surfaces can invoke each **operational** verb from [[user-verbs]]. **Agent** = surfaces 1 & 2 (Claude Code / Claudian). **Obsidian** = surface 3, native. **Telegram** = surface 4. **CLI** = surface 5.

| Verb | Agent | Obsidian | Telegram | CLI |
|---|:--:|:--:|:--:|:--:|
| braindump (raw → Inbox) | ✅ | ✅ (direct edit) | ✅ | — |
| capture from phone | — | — | ✅ | — |
| ingest a file (markitdown) | ✅ | — | — | — |
| write a record by hand | ✅ | ✅ (template) | — | — |
| break PRD into tasks | ✅ | — | — | ✅ |
| log a bug | ✅ | — | — | ✅ |
| what's on the board | ✅ | — | ✅ (`/status`, in-progress only) | ✅ |
| move task status | ✅ | — | — | ✅ |
| canvas layout | — | ✅ (Tab/Enter) | — | — |
| export / hand off a session | ✅ (`/handoff`) | — | — | — |

Legend: ✅ = supported · — = not on this surface · notes in parentheses. The fuller plain-English verb set (capture / ingest / triage commands, grounded "ask the vault" queries, node-scoped canvas actions, an ADR verb) is the framework roadmap — `docs/roadmap/vault-vision.md`.
