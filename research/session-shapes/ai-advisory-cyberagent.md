# Session shape: AI-advisory cyber agent (NCF Cyber Agent)

Source: `D:\Git\platform_research_sessions\cyberagent-architecture\ncf_cyber_agent_design_session.jsonl` (27 records) + DESIGN_SPEC.md / DECISIONS.md / BUNDLE_README.md.
Extracted: 2026-07-27. Domain: "Learnings" (session-shape + missteps).

## At a glance

| | |
|---|---|
| What | Design pass (no build code) for a standalone AU-statutory cyber **advisory** POC — RAG + light KG over CPS 234/230, SOCI, Privacy Act, ACL, AustLII case law; generates a structured advisory paper (S0–S7 + S8x overlay). |
| Provider | Anthropic. Langflow "native Anthropic"; model IDs deferred to build via the `claude-api` skill (record L27) — sound, avoids hard-coding stale IDs. Correct current default is `claude-opus-4-8`. |
| Record shape | JSONL keyed by `type`: `session_meta`(1), `decision`(D1–D8 + 3 spec-edit + CISO-strategy = 12), `research_finding`(2), `artefact`(8), `open_item`(4), `next_gate`(1). |
| State at export | DESIGN phase, PRE-BUILD. `.md` files are **pre-de-scope**; the `.jsonl` is the authoritative current decision state (per BUNDLE_README + L1 note). |
| Live decisions | D8 CONFIRMED; SEC8/SEC10-DELETE CONFIRMED; D2/D3/CISO-strategy still OPEN/IN_DISCUSSION awaiting owner; D1/D4/D5/D6/D7 OPEN on recommended defaults. |
| Headline tension | Throwaway POC vs. production-grade architecture. Repeatedly self-corrected toward "lean" but the shipped `.md` spec still carries the heavy version. |

## Narrative arc

1. **Heavy first cut.** Initial DESIGN_SPEC/DECISIONS set production-grade defaults: D2 = lightweight-custom orchestration (not a monolith), D3 = full 7-entity KG ontology (Instrument↔Clause↔Obligation↔Party↔Risk↔Precedent↔Clock), spec §8 integration path, §10 prior-art reuse, four front-end entry points.
2. **Owner pushback → de-scope wave.** Owner flags over-engineering on three axes: (a) throwaway favours a fast monolith over sunk-cost custom build; (b) subjective KG edges shouldn't be baked into schema; (c) four entry points should collapse to one agentic chat. This flips D2, D3, D8 and triggers deletion of §8 and §10.
3. **Build-vs-buy churn (D2).** v1 lightweight-custom → owner wants monolith → spike recommends **Dify** (only candidate with in-workflow code node for grounded-or-abstain) → owner rejects Dify on licence (Apache-2.0 + no-multi-tenant/no-logo) → Open WebUI checked and dropped (2025 relicense + branding + CLA) → **current lean: Langflow (MIT), native Anthropic, pip-runnable (skips Docker).** Still OPEN.
4. **CISO-Assistant deep-dive.** Discovers intuitem/ciso-assistant-community ships APRA CPS 234/230 + Essential Eight as YAML libraries with a clause-granular `RequirementNode` schema → "corpus backbone largely solved." But AGPL-3.0 copyleft. Three strategies proposed (A adopt data-model + re-author libraries / B fork / C run network-separate); **A recommended, still awaiting owner pick.**
5. **De-scope not yet folded in.** D8 + both deletes confirmed; D2/D3/CISO still open. The consistent-spec-pass to rewrite §4/5/7, delete §8/10, update D2/D3/D8 is the last open_item (L26) and blocks build green-light (L27).

## Key decisions (D1–D8)

| ID | Topic | State | Landing |
|---|---|---|---|
| D1 | Corpus scope + sourcing/licensing | OPEN | FS-anchor official texts + AustLII; official URLs = citation of record; **gate bulk redistribution pending licence check**; re-author any AGPL library content from public source. |
| D2 | Build-vs-buy / generation layer | IN_DISCUSSION | Lean **Langflow (MIT)**, native Anthropic, Python code component hosts grounded-or-abstain resolver, pip (no Docker). Was: lightweight-custom → monolith → Dify → Langflow. |
| D3 | Knowledge-graph scope | IN_DISCUSSION | **Light-touch KG**: 1 instrument + 2 objective edge types (clause→reporting_clock, control_weakness→precedent), flat store (SQLite/JSON, no graph DB). Subjective layer left to LLM. Adopt CISO-Assistant `RequirementNode` for clause model. Full KG deferred to production. |
| D4 | Eval bar | OPEN | 100% section presence (hard gate) + ≥90% populated-completeness; ≥95% citation/clause accuracy; 100% abstain-correctness; **0 fabricated citations (hard gate)**; S8x scored qualitatively. |
| D5 | Industry generalisation | OPEN | FS/APRA only; architect for a 2nd corpus, don't ingest one. |
| D6 | Integration seam to ncf_platform | OPEN | External data source; first binding = risk-impact → platform risk catalogue. §8 to be deleted/compressed; integration now largely OOTB via chosen platform connectors. |
| D7 | POC privacy/persistence | OPEN | Persist sessions locally; relax minimisation on synthetic data; zero-retention deferred to production. |
| D8 | Front-end surface model | **CONFIRMED** | Two surfaces: Curator console (U1) + single Advisory workspace (agentic chat with tools normalise_intake / retrieve / answer_grounded / assemble_paper / rank_precedents) + gated read-only Client view (U5). Invariants: assemble_paper keeps deterministic LLM→structured-intermediate→render; G5 audience gating server-enforced. |

Plus: **SEC8-DELETE** (drop spec §8 integration) CONFIRMED; **SEC10-DELETE** (drop §10 prior-art reuse) CONFIRMED; **CISO-STRATEGY** A/B/C PROPOSED (A recommended, awaiting owner).

## Missteps & dead-ends

- **Doc/state drift (the big one).** Two sources of truth: the `.md` files carry the pre-de-scope design; the `.jsonl` carries the current state. Anyone reading DESIGN_SPEC.md/DECISIONS.md gets the *wrong* (heavy) design unless they also read the JSONL note. Live risk: build off the stale spec. The reconciling pass exists only as an open_item (L26).
- **D2 thrash.** Four positions in one decision (custom → monolith → Dify → Langflow), two of them killed purely on licence after technical evaluation. The grounded-or-abstain guardrail was the real requirement; licence was the actual selection axis — surfacing "MIT/permissive + in-workflow code node" as the gate up front would have collapsed the search (RAGFlow, AnythingLLM, Open WebUI all fail one or the other).
- **Over-engineered KG (D3, corrected).** Full 7-entity ontology proposed before owner caught that subjective edges (incident→instrument, case ranking) don't belong in a schema. Corrected to 2 objective edges + LLM for the rest — but only after the ontology was authored into the spec.
- **§8 / §10 spec bloat (corrected).** Integration-path and prior-art-reuse sections written, then judged "lowest-value for a throwaway" and marked for deletion. §10's intent ("do-not-re-research") was misread as "must-have-a-section."
- **Four entry points (D8, corrected).** Copilot + paper + audit as separate surfaces, collapsed to one agentic chat after owner raised it. Material, hard-to-reverse UX choice nearly absorbed silently.
- **Docker deploy risk noted but unresolved at design time.** Env probe: Docker daemon not running / not headlessly startable by a sandboxed agent → "1 human click." Langforw-via-pip sidesteps it, reinforcing D2 — but this is a build-blocker discovered late, not designed around.
- **AGPL entanglement is the quiet trap.** CISO-Assistant is the corpus-backbone win *and* the biggest commercial risk. Strategy A (re-author, zero code linkage) is correct; forking (B) would contaminate a later network-delivered commercial product. Recommended but not locked.

## Where grilling / wayfinder would have helped

- **Front-load the decision gate for D2.** A single grill — "what is the one non-negotiable that eliminates candidates?" — yields "permissive licence + inline code node." That prunes the whole monolith survey to Dify-vs-Langflow immediately; the Dify licence rejection then falls out of the same criterion, not a separate later round.
- **"Throwaway" as a first-class constraint.** Every over-engineering misstep (full KG, §8, §10, four surfaces, lightweight-custom) is the same root: production instincts applied to a 4-hour throwaway. One up-front "what does throwaway forbid?" pass would have pre-empted D3/§8/§10/D8 churn.
- **Two-sources-of-truth is a process smell.** A wayfinder check would flag that shipping pre-de-scope `.md` alongside a "read the JSONL instead" note guarantees a future build off the wrong spec. Either reconcile before export or don't ship the stale docs.
- **Licence-first triage for any OSS dependency.** CISO-Assistant AGPL + Dify/Open WebUI licence kills show licence is the dominant axis; make it step 1 of every build-vs-buy, not the thing discovered after technical scoring.

## Salvage (for the deferred AI-advisory shelf)

Reusable if the AI-advisory line is revived:

- **The de-scoped lean stack is the keeper**: Langflow (MIT, pip, native Anthropic) + flat 2-edge objective KG + CISO-Assistant Strategy A (re-authored CPS 234/230/E8 YAML libraries, `RequirementNode` clause model, zero AGPL linkage). Model IDs resolve at build via the `claude-api` skill → `claude-opus-4-8`.
- **Load-bearing invariants worth carrying forward**: deterministic `assemble_paper` (LLM→structured-intermediate→render); grounded-or-abstain enforced in an in-workflow code node; server-enforced audience gating (G5); 0-fabricated-citations hard gate.
- **The eval bar (D4)** is a portable, well-specified acceptance contract for any grounded-generation advisory POC — reuse verbatim.
- **The single agentic-chat surface (D8)** with the 5-tool agent (normalise_intake / retrieve / answer_grounded / assemble_paper / rank_precedents) is a clean, reusable advisory-agent shape.
- **Anti-patterns to inherit as guardrails**: front-load the eliminating constraint; treat "throwaway" as a hard scope forbidder; never ship stale design docs beside a "read the other file" note; licence-first OSS triage.
- **Do NOT salvage**: the full 7-entity KG ontology, spec §8 (integration path) and §10 (prior-art reuse), the four-entry-point UX, or the lightweight-custom-vs-monolith debate — all resolved/deleted.
