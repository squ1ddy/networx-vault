# Session Shape: Claude Sessions Ingest Tool

Source: `platform_research_sessions/wiki-ingest/claude-sessions-ingest/session_2026-07-24_claude-sessions-tool.jsonl` (6 msgs, ~15 min, chat surface)

Meta: this session BUILT the tooling for the very session-ingest track this shape doc belongs to.

## At a glance
- Goal: a local tool to catalog all Claude sessions (Code + Desktop/claude.ai/Cowork) -> title, date, summary, first prompt, artifact count; downloadable bundle for wiki/agent ingest.
- Outcome: a Claude skill `session-scanner` (3 Python scripts + SKILL.md), zipped and delivered.
- Status: DELIVERED but UNVERIFIED against real data. Never run on the user's actual D:\ transcripts or a real chat export.
- Effort: fast, single-pass build. No iteration, no debugging cycle.

## Narrative arc
1. User points at `maleta/claude-sessions` plugin, wants same for all surfaces.
2. Assistant researches (web_fetch repo + web_search export API), correctly diagnoses the hard constraint: Code = local JSONL (automatable); chat/Desktop = NO live API, only manual ~24h account data export (conversations.json). Proposes two-pipeline architecture. Asks 3 scoping questions.
3. User scopes down: view-only catalog + Code scan on D:\ + downloadable bundle; "you decide" on fork-vs-build; local only.
4. Assistant builds fresh skill `session-scanner`: `scan_code_sessions.py`, `scan_chat_export.py`, `build_bundle.py`, SKILL.md. Tests each against SYNTHETIC fixtures. Zips + delivers. Flags real D:\ path + real export schema still unverified.
5. User asks for a .jsonl transcript of the session itself (dogfooding into the tool's own schema) -> the file being analyzed here.

## Key decisions
- Build fresh vs. fork: chose fresh skill (original plugin only handles Code hooks, not the dual-surface problem). Sound.
- Package as a Claude skill (SKILL.md + scripts) not a hooks plugin -> matches "view/catalog + bundle" ask; drops the original's live Stop/SessionEnd hook automation.
- Schema-first: all three scripts emit ONE shared session schema so Code + chat merge cleanly. Good design instinct.
- Defensive parsing of `conversations.json` (multiple field-name variants) because export schema is undocumented/drifts.
- Artifact count = count of file-writing tool_use blocks. Heuristic, reasonable.

## Missteps & dead-ends
- Tested ONLY against fabricated fixtures. The two riskiest unknowns (real D:\ transcript layout, real export JSON schema) were explicitly deferred to the user and never closed -> tool is plausible, not proven.
- Chat/Desktop ingestion is fundamentally manual (24h export link). The tool cannot automate that surface; it was accepted rather than challenged.
- "Fork or build? — you decide" handed a real architecture fork to the assistant with no pushback. Cheap now, but no record of tradeoff.
- Dropped the original's live-hook automation without noting the regression: the new skill is a pull/scan model, so Code sessions are only captured when the scan is run, not continuously.
- No HTML viewer delivered (offered, not built) despite user asking to "view sessions."

## Where grilling / wayfinder would have helped
- Grill the "you decide" fork: fresh vs. fork vs. wrap the original's hooks for Code + add a chat scanner. Might have kept live capture for Code.
- Wayfinder on acceptance criteria: "done" was never defined as "runs on my real D:\ and my real export." It shipped on synthetic data — the exact gap that makes reuse uncertain.
- Challenge the manual-export dead-end: is a periodic export reminder / semi-automated ZIP watcher acceptable, or does chat surface get dropped from v1?

## Salvage — can this tool automate the rest of the ingest track?
- Directly relevant: `scan_code_sessions.py` is exactly the ingest track's core need — walk `*.jsonl`, extract title/date/summary/first-prompt/artifact-count, emit shared schema. That is the same shape as this very shape-extraction task.
- `build_bundle.py` produces a wiki-ready `sessions_bundle.md` grouped by surface/project — directly aligned with pushing sessions into a substrate/wiki.
- REUSABLE FOR CODE SESSIONS, WITH VERIFICATION: it targets Claude Code JSONL, which is what the ingest track consumes. But it has never run on real transcripts, the D:\ root is unconfirmed, and the artifact-count/summary heuristics are untested at scale.
- NOT usable as-is for chat/Desktop: that surface depends on a manual export the tool cannot fetch. Any "automation" there is human-in-the-loop.
- The skill artifact (`session-scanner-skill.zip`) is delivered but lives in the session output, not in this repo — would need to be recovered/re-created here.

## Bottom line
The Code-session scanner is the right tool for automating the ingest track's Code surface and worth pulling in — but it is a prototype validated only on synthetic data. Treat it as a strong starting point that needs one verification pass on real D:\ transcripts before trusting it to drive the pipeline.
