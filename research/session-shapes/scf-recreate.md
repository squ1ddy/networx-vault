# SCF recreate (prose vs mappings) — session shape

Source transcript: `D:\Git\platform_research_sessions\scf-prose-oscal\NIST OSCAL prose and SCF research.jsonl`
Original session: `9e5ceb1a-...` — custom title "NIST OSCAL prose and SCF research" (cwd `D:\Git\ncf_platform`, entrypoint claude-desktop, started in plan mode).

## At a glance
- **Span:** 2026-07-16 → 2026-07-27 (11 calendar days, resumed repeatedly).
- **Size:** 770 JSONL lines, ~2.5 MB. 144 user records / 316 assistant records; **14 human turns**.
- **Tool freq:** Bash 29, WebFetch 26, WebSearch 25, Agent 13 (all sub-agent research/extraction), Write 13, Edit 7, ToolSearch 3, Glob 2, Read 1, TaskCreate 1 (abandoned), SendMessage 1.
- **Shape:** deep-research → source-tracing → forensic proof → PoC build → PoC v2 scale-up → two accuracy walk-backs. Ended with a committed `poc/prose_regen/` package on `ncf_platform` main (`127200f`, then `b24db45`).
- **Deliverables:** plan file `i-am-researching-nist-bubbly-bee.md`; runnable PoC (`build_prompt.py`, `fewshot_template.py`, `compare.py`, `render_comparison.py`, `ism_join.py`, `nist_80053_r5.json`, REPORT.md, ISM_JOIN.md).

## Narrative arc
1. **Q1/Q2 framing (L3):** Does OSCAL carry DSP-equivalent "prose"? And is ComplianceForge (CF) paywalling prose that is actually public? Answer converged fast: OSCAL catalogs *do* carry prose (`parts` statement/guidance); user was looking in the wrong `examples/` folder. SCF free download = crosswalk + control text; CF DSP = the paywalled prose layers. **Key structural insight (whole session): a control framework = (a) MAPPINGS/crosswalk + (b) PROSE, and only the prose is proprietary.**
2. **Source-tracing (L85–L133):** Trace which public library CF lifted prose from. Sub-agents on the internal `dsp.db` found `standard_guidance` = verbatim NIST 800-53 R5 discussion text; CSOP roles = NICE/800-181 work-roles. Built a "layer→origin" table.
3. **Side-by-side validation (L137–L207):** Pulled real 800-53 R5 text (csf.tools) for the 5 controls' mapped IDs; checked ASD ISM / Essential Eight (`ism-oscal` repo, then user-supplied cyber.gov.au URL). Finding: **mappings match, prose does NOT** — ISM/E8 contribute crosswalk refs only, no prose.
4. **The 6-layer model (L214–L254):** User corrects scope. CF's structure is the proprietary **HCGF** (Policies→Control Objectives→Standards→Controls→Procedures→Guidelines). Found open SCF catalog mirrors (CISO Assistant `scf-*.yaml`, `zerobias-org/framework`) — **catalog + objectives only, no policy/standard/procedure prose.**
5. **Exact-phrase forensics (L294–L346):** Grep distinctive DSP sentences across the web → Bucket A (only on CF/SCF = proprietary) vs Bucket B (free SCF). Capped by the user-supplied original `.xlsx`: forensic sub-agent proved it is a **hand-authored Excel+Power Pivot workbook (created 2017, Tom Cornelius, pre-genAI)** — killing the "AI-generated" theory and confirming footnotes are a structured crosswalk, not lifted prose.
6. **PoC v1 (L354–L516):** Blind generator rebuilds DSP prose from ONLY free inputs (SCF control+objective + NIST 800-53). DCH-01/IRO-01 blind output scored "near-identical intent." Committed license-clean package (gold read from `dsp.db` at runtime, gitignored).
7. **PoC v2 (L520–L717):** Scaled to 20 controls (10 NIST-derived / 10 ISO-derived), added readability + LLM-judge metrics + side-by-side renderer; resolved ISM-join coverage (94% of 851 refs join to v2026 catalog). Two standout findings: many DSP standards are **one-line placeholders**; NIST-derived guidance ≈ verbatim 800-53.
8. **Two walk-backs (L721–L735):** User challenges (a) sloppy reuse of "terse/imperative" for both ISM and CF, and (b) the unsourced "verbatim ISO 27002" claim. Assistant concedes it never accessed paywalled ISO 27002, then salvages with a DB-crosswalk corroboration table.

## Key decisions made
- **Mappings-vs-prose split** established as the organizing frame early and held throughout: crosswalk (public/mappable, already in `dsp.db`) vs prose (the only proprietary, paywalled layer).
- **De-license approach:** don't redistribute CF text — instead **regenerate** the proprietary prose layers from public-domain/clean inputs (NIST 800-53 R5 public domain + SCF free control/objective text), so the output is license-clean. Gold CF prose read from `dsp.db` at runtime only; never committed (gitignored `prompt.txt`, `comparison.md`).
- **Provenance model:** DSP = layered stack — policy/standard = CF-authored connective prose; guidance = blend of verbatim NIST discussion (NIST-derived controls) + ISO 27002 clause-objective restatements (ISO-derived controls); roles = NICE.
- **AI-authoring question closed** by primary-source forensics on the original `.xlsx` (human-authored since 2017).
- **Metrics:** started with lexical sim/jaccard (v1), user asked what they meant → added readability (Flesch) + an LLM clarity/ambiguity judge in v2 (lexical overlap deemed misleading "by design").

## Missteps & dead-ends (approx turn positions)
- **L214–L216 — scope miss (comparison axis).** Assistant compared live DB text against **NIST**; user actually wanted DB-text vs a candidate **source library** in CF's own 6-layer format. Forced a re-frame and re-run.
- **L294–L323 — self-contradicting bucketing.** Labeled two phrases "DSP-proprietary" (Bucket A), then the GovReady/CISO-Assistant sub-agent showed they were free SCF text; had to publicly "refine and partly correct" the earlier claim.
- **L177→L207→L261→L275 — ISM prose wild goose chase / version churn.** Repeated attempts to fetch the ISM catalog (github raw, then cyber.gov.au v2026.03.24) timed out multiple times; a version-mismatch flag lingered until the user finally dropped the file locally (L535) — then it parsed instantly. ~4 turns of thrash resolvable by asking for the file up front.
- **L721–L723 — "terse/imperative" overloaded.** One word carried two opposite meanings (ISM = concise-and-complete strength; thin DSP standards = short-and-thin weakness); needed a correction turn.
- **L727–L731 — unsourced ISO 27002 claim (the sharpest).** Wrote "verbatim ISO 27002 clause 8.2" from **model memory**, never having accessed paywalled ISO 27002. Conceded it was circumstantial; salvaged with a `dsp.db` crosswalk table (L735).
- **L386→L393 — abandoned TaskCreate.** Set up formal task tracking, immediately dropped it ("Task tool isn't essential here").
- **L498→L504→L509 — tooling fumble.** Used PowerShell here-string `@'...'@` inside the **Bash** tool; `@` leaked into the git commit message; needed an amend with a proper heredoc.
- **L699–L704 — unknown staged artifacts.** A 32 MB `oscal-catalog-2026.1.json` the user had placed got auto-staged; caught and reset pre-commit (good recovery, but shows loose working-tree hygiene).

## Where /grilling or /wayfinder would have helped (specific)
- **Before L3 deep-research kick-off:** a wayfinder pass would have forced the goal statement "regenerate proprietary prose from clean inputs" and the mappings-vs-prose decomposition on turn 1 — instead it emerged organically over ~L207. Also would have pinned the **comparison axis** (DB vs source-library vs NIST) and avoided the L214 re-run.
- **At L294 (bucketing claim):** grilling "what would falsify 'DSP-proprietary'? have you checked the open SCF mirrors *before* asserting?" would have caught the Bucket-A error before it was stated (the CISO-Assistant repo already held that text).
- **At L170/L207 (guidance = ISO 27002):** the clearest grill-would-have-caught-it. Any "how do you *know* it's verbatim ISO 27002 — did you read the paywalled standard?" challenge would have surfaced the memory-only sourcing 500+ lines earlier, instead of the user catching it at L727.
- **At L177/L261 (ISM fetch):** wayfinder "the authoritative file is large and keeps timing out — ask the user to attach it" would have saved ~4 timeout turns (exactly what unblocked it at L535).
- **At L354 (PoC design):** grilling the eval design — "lexical sim will understate quality if your generator is deliberately fuller; what metric actually answers 'is this license-clean prose good enough'?" — would have front-loaded the readability/LLM-judge metrics rather than bolting them on in v2 after the user asked (L520).

## Salvage (what to ingest)
**Feeds TASK-1.2 (build-own-NCF):**
- The **de-license regeneration recipe**: rebuild proprietary prose layers from NIST 800-53 R5 (public domain) + SCF free control/objective text; keep any licensed gold out of the repo (read at runtime, gitignore the gold-bearing prompt). Proven viable — blind DCH-01/IRO-01 scored "near-identical intent."
- The **runnable PoC package** at `ncf_platform:poc/prose_regen/` (`build_prompt.py`, `fewshot_template.py` with tightened authoring rules + NICE role map, `compare.py`, `render_comparison.py`, REPORT.md). Directly reusable as the NCF prose-generation harness skeleton.
- **Layer→origin provenance model** (policy/standard = CF connective prose; guidance = NIST discussion verbatim for NIST-derived, ISO 27002 clause-objective restatement for ISO-derived; roles = NICE/800-181). This is the spec for what an own-NCF prose generator must synthesize per layer.
- Finding that **many DSP standards are one-line placeholders** — an own-NCF can *exceed* the source here, not just match it.

**Feeds TASK-1.11 (canonical-source):**
- **Mappings-vs-prose split** as the canonical data model: crosswalk (mappable, public — already fully in `dsp.db`) is separable from prose (proprietary layer).
- Concrete **open canonical sources located:** NIST 800-53 R5 OSCAL (`usnistgov/oscal-content`, public domain), ASD ISM OSCAL catalog (cyber.gov.au v2026.03.24, `ism-<4digit>` IDs, E8 profiles at ML1/2/3), SCF catalog+objectives via CISO Assistant `backend/library/libraries/scf-*.yaml` and `zerobias-org/framework` (⚠️ latter unlicensed — flag before ingest).
- **ISM join facts** (`ISM_JOIN.md`, `ism_join.py`): 800/851 (94%) of DB ISM refs join by 4-digit number to v2026; 51 are 2022→2026 renumberings; E8 `Principle N.N` refs do NOT join the catalog (separate profile layer).
- **License map:** NIST public domain (clean); SCF CC BY-ND (crosswalk usable, prose not redistributable); CIS CC BY-NC-SA (non-commercial); ISO 27002 fully paywalled — do NOT rely on for canonical prose.

**Caveat to carry forward:** the ISO 27002 "verbatim clause" attributions were never verified against the primary standard (paywalled). Treat as *inferred from the DB crosswalk*, not confirmed source text.
