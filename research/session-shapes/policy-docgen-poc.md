# Policy docgen POC — session shape

Source transcript: `D:\Git\platform_research_sessions\policy_docgen-poc-session\ncf-platform-conversation-70fbcce0.jsonl`
Session id: `70fbcce0-e26a-48a6-b133-6531215763f8` · model `claude-opus-4-8` · entrypoint claude-desktop (Claude Code GUI)

## At a glance

- **Duration:** 2026-06-12 → 2026-06-17 as active work (5 dev days), with a stray tail event on 2026-07-26 (the export request that produced this file). The June 12–17 window is the real session.
- **Transcript volume:** 5,879 JSONL lines. Real conversation = 2,889 `assistant` + 1,386 `user` records; the rest are wrappers (`queue-operation`, `attachment`, `custom-title`, `ai-title`, `mode`, `system` hooks). File ≈ 20 MB.
- **Assistant prose:** ~283k chars (~71k tokens) of text blocks, on top of tool traffic.
- **Real user turns:** ~74 substantive prompts (many are one-word: "continue", "yes", "do both", "proceed").
- **Context compactions:** **10** "continued from a previous conversation" restarts — i.e. the session blew its context window ~10 times over 5 days.
- **Tools used (freq):** Bash 401, Edit 295, Read 172, preview_eval 102, Write 68, TodoWrite 67, TaskUpdate 40, ToolSearch 31, Grep 26, TaskCreate 23, preview_screenshot 16, preview_console_logs 12, AskUserQuestion 8, Agent 7, ExitPlanMode 7, Glob 4.
- **Artifacts produced:** SQLite `dsp.db` / `live.db` from crosswalk xlsx+json ingest; a full **React 19 + TS + Vite + Tailwind** frontend (`SelectionView.tsx` [42 edits], `App.tsx`, `api.ts`, `BlockEditor.tsx`, `ProseEditor.tsx`, `TokensView.tsx`, `ProceduresView.tsx`, `DocBlocks.tsx`); a **FastAPI** backend (`api.py` [29 edits], `tokens.py`); doc-gen pipeline (`generate_doc.py` [17 edits], `build_content_schema.py`, `build_db.py`, `render_preview.py`, `strip_template.py`); process docs (`TODO.md`, `SPECS.md`, `USAGE.md`, `ISSUES.md`, `CLAUDE.md`, `CHANGES.md`); schema diagram tool; TipTap WYSIWYG spike; memory files.

## Narrative arc

**Set out to do (U1):** a *narrow POC* — get existing cyber-control data into SQLite so it can be programmatically queried, confirm a schema (mermaid/ascii + one sample record per table) before building anything, keep infra light, keep AI-agent querying in mind. Explicitly a "confirm the schema first" request.

**How it actually went:** the schema-confirm step expanded into data-reconciliation (xlsx vs json column parity, 2023.2 vs 2023.3.3 version mismatch, 1176 controls). By U9–U11 the user opened a broad "let's slow down and brainstorm" planning thread about human editing, storage of rich text, and Word-template style fidelity. That planning decision spawned a **web interface**, which the user chose to build in **React** "so it looks snappy from the beginning" (U20) — a large scope jump from "light POC / SQLite". From there it grew into a full platform: control catalog browser, framework-based MCC/DSR selection, per-client token model, CSOP (operating procedures) ingest, a TipTap WYSIWYG editor spike, .docx + .xlsx export, auth, and a "bookshelf" of extensible document outputs.

**Where it ended:** a working-ish React/FastAPI/SQLite app called "NCF Platform" with control selection, tokens, procedures views and doc export, plus heavy process scaffolding (SPECS/USAGE/CLAUDE/ISSUES). It ended not at a finished POC but at a **handoff**: U70–U72 the user asks for a prompt to spin up a *fresh* Claude session to continue, and whether to run it in plan mode. The July 26 tail is just "export this conversation as .jsonl".

## Key decisions made

- SQLite as the store; ingest from the RECOVERED crosswalk xlsx (~1176 controls) + json, ignoring Control Selection / Client-NAK / Control Variables (U5–U6).
- Include risk/threat + evidence/AO detail even with known gaps; defer gap-filling to TODO (U6, U8).
- Build a web interface for ongoing human editing (U9–U10) — and do it in React up front (U20).
- Rich-text storage strategy for control fields deferred until a **throwaway TipTap spike** proved lossless round-trip of the worst-case content (authored list markers `(a)`,`i.`, Wingdings bullets, tokens) before committing to markup-string vs structured-JSON storage (U51 → spike ~L3395–3420).
- MCC (minimum compliance criteria) / DSR (discretionary) selection modelled on the user's manual Excel filter workflow (U25).
- Per-client token model with reconciliation across DSP + CSOP as a repeatable task (U67–U69).
- Consolidate everything under `ncf_platform/` with a `source_files/` subdir (U42).
- Introduce CLAUDE.md specifically to force loop-closing / keep SPECS+USAGE updated (U41, U61).

## Missteps & dead-ends (approx turn positions)

1. **Scope creep from "schema-confirm POC" → full React platform (U9–U20).** The stated first step was "confirm you can create the schema" with a diagram and sample records. Within one planning thread it became a React+FastAPI SPA. No explicit "is a web app in scope for the POC?" gate was set. This is the root misstep that everything downstream inherits.
2. **Ten context-window compactions over 5 days.** Each "continued from a previous conversation" restart (U12, U17, U26, U31, U35, U38, U43, U48, U52, U54) re-summarised state — repeated re-establishment of the same project facts, and the source of the user's frustration at U41 ("This way of working is unacceptable... I have to keep reminding you to close the loop"). Symptom of doing too much in one runaway session rather than scoping discrete deliverables.
3. **DB-fundamentals detour (U46–U47).** User (self-described "database newbie") had to stop and be taught PK vs FK and question whether `client_frameworks.framework_id` should be an FK — schema was built/diagrammed before the user understood it well enough to review, inverting the U1 "confirm before building" intent.
4. **WYSIWYG realisation arrives late (U51).** Only after the editor was a raw-markup `<textarea>` (with a hand-rolled Markdown parser *duplicating* the backend regex taxonomy) did the "consultants edit in Excel/Word, this isn't human-editable" problem surface, forcing a TipTap spike and a storage-strategy rethink. The duplicated taxonomy is tech debt born of skipping the editor question up front.
5. **CSOP UI omission despite "lengthy planning" (U64–U65).** CSOP data was ingested with no way to view it; user: "confused how we could possibly have missed the UI elements... when we went through a fairly lengthy planning process." Planning covered data but not the corresponding UX surface.
6. **Loop-closing / doc-sync failures (U39 "what's going on?", U40 "what about USAGE/SPECS?", U41, U61).** Repeated user nudges that deliverables (USAGE.md, SPECS.md) weren't updated; CLAUDE.md added reactively to patch the workflow.
7. **Low-level churn:** "port" appears ~100× and "revert" ~20× in assistant text — recurring friction wiring the Vite/uvicorn preview servers and ports; a Unicode/cp1252 encoding crash (U31) from writing `→` to a Windows console.

## Where /grilling or /wayfinder would have helped (meta-learning)

- **The single clearest catch: the U1 "POC" boundary.** The prompt said "proof of concept... light infra... confirm the schema first." A grilling pass on turn 1 would have forced: *What is the POC actually proving — that a doc can be generated, or that consultants can edit content in a browser? Is a web UI in scope for the POC or a later phase? React (a multi-week build) vs a throwaway CLI/Streamlit to prove the .docx pipeline?* That one question gate would have prevented the U9→U20 slide into a full SPA and most of misstep #1's downstream cost.
- **Editor requirement should have been surfaced up front, not at U51.** Wayfinding on "who edits this content and with what tool today?" (answer: consultants in Excel/Word) makes WYSIWYG + lossless list-marker/token round-trip a **day-one constraint**, not a mid-build pivot. Would have avoided the raw-textarea + duplicated-parser dead-end (misstep #4).
- **Rich-text storage format is the true architectural fork** (markup-string vs structured JSON) and it drives DB schema, editor, and .docx renderer simultaneously. Grilling would have named it as the pivotal decision and run the TipTap spike *first*, before schema/editor/renderer were all built against an unproven assumption.
- **Deliverable & data⇄UX parity checklist.** A wayfinder pass listing every data entity and its required UX surface would have caught the CSOP-has-no-view gap (misstep #5) during planning instead of after ingest.
- **Session hygiene.** Ten compactions signal the work should have been decomposed into scoped sessions/tasks with a persistent brief — which is exactly what the user ended up hand-rolling at U70–U72 (asking for a handoff prompt for a fresh session). Structured wayfinding would have produced that decomposition on day one.

## Salvage (worth ingesting into the substrate)

- **Domain model:** DSP vs CSOP; controls, frameworks, `client_frameworks`; MCC (minimum compliance criteria) vs DSR (discretionary security requirements); per-client token model; the "bookshelf" mental model for extensible doc outputs (U70). This is reusable ubiquitous language for the platform.
- **The MCC/DSR selection workflow (U25)** — a clean statement of the consultant's manual Excel process; good source for a UX spec.
- **Hard constraint discovered:** control content carries authored list markers (`(a)`, `i.`, Wingdings/hollow bullets) + tokens that must round-trip verbatim; zero bold/italic/footnotes in control fields (footnotes live in narrative blocks only). This fixture analysis (L3407) is a genuine reusable finding for any future editor/renderer.
- **Data provenance caveats:** RECOVERED crosswalk, ~1176 controls, 2023.2 descriptions vs 2023.3.3 mappings misalignment, known AO/evidence gaps.
- **Process artifacts pattern:** SPECS.md + USAGE.md (with a "functionality verification" section) + CLAUDE.md-enforced loop-closing — a decent template, but note it was built reactively after failures, which is itself the lesson.
- **The handoff prompt request (U70–U72):** evidence the user independently reached for session-scoping; the substrate's wayfinder/grilling flow is the productised version of that instinct.
