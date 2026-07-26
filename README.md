# vault-template

The **pristine, generic vault template** the installer stamps into a fresh Obsidian vault. It lives
in the framework (substrate) repo so a new deployment can be created without copying from any live
vault. Everything here is generic and reusable — no business, client, or deployment-specific content.

## What the installer stamps

- **Folder skeleton** (each kept by a `.gitkeep`): `Inbox/`, `artefacts/`, `session-logs/`,
  `canvas/`, `topics/`
- **`templates/`** — the typed record templates: `idea.md`, `research.md`, `concept.md`, `prd.md`,
  `source-note.md`
- **`scripts/`** — `session-log.mjs` (transcript archival), `canvas-to-mermaid.mjs`,
  `telegram-capture.mjs`, `reference-integrity.mjs` (broken-wikilink lint)
- **`usage/`** — `1-quickstart.md`, `canvas.md`, `interaction-modes.md`, `matt-skills-guide.md`
- **`.claude/`** — `settings.json` + `scripts/session-intro.mjs` (session-start intro hook)
- **`.obsidian/app.json`** — minimal, portable Obsidian app settings (no plugin binaries, no
  workspace/cache/appearance/graph state)
- **`START_HERE.md`**, **`user-verbs.md`**, **`tool-operations.md`**, **`personas-and-stories.md`**
- **`.env.example`**, **`.gitignore`**
- **`BRIEF.template.md`** — placeholder brief to copy to `BRIEF.md` and fill in per deployment

## After stamping

Full, verified steps (git/backlog init, skills, and a functional smoke test) are in
[`docs/deployment.md`](../docs/deployment.md). In short:

1. Copy `BRIEF.template.md` → `BRIEF.md` and fill in every section (delete the instructions).
2. Copy `.env.example` → `.env` and set the real values (`TELEGRAM_BOT_TOKEN`, `VAULT_INBOX`,
   `BACKLOG_DIR`, `TELEGRAM_ALLOWED_CHAT_IDS`). `.env` is git-ignored — never commit it.
3. Rewrite `personas-and-stories.md` with your real personas and stories (keep the living-doc
   framing).
4. Start adding initiatives under `topics/`, one folder each with its own index note.
5. `git init` and, if the vault owns its own tasks, `backlog init` (see `docs/deployment.md`).

> Skills **ship with the vault** (ADR-0007). This template carries `skills-lock.json` (the pinned
> set) and the substrate's own `.claude/skills/`; the stamp-vault installer fetches Matt Pocock's
> skills into `.claude/skills/`. They are invocable only when the vault is opened in **Claude Code**
> (a prerequisite). Update later — and review the diff — with:
> `npx skills add mattpocock/skills --agent claude-code --skill '*' --copy -y`.

## Generic vs deployment-specific

This template is deliberately **generic**. The following are deployment-specific and are **NOT**
included here — they belong only in a live, stamped vault:

- **`BRIEF.md`** — the real project context pack (who we are, what this is, constraints, output
  standards). The template ships only `BRIEF.template.md` as a placeholder to fill in.
- **`topics/<initiative>/` content** — real research corpora, sources, and per-topic material. The
  template ships only an empty `topics/` skeleton.
- **`.env`** — real secrets and machine paths (only `.env.example` is shipped).
- **Obsidian plugin binaries, workspace, cache, appearance, and graph state** — only the portable
  `app.json` is shipped.

Anything client-, business-, or person-specific stays out of this template by design.
