# Macro program structure — comprehensive notes (v2)

_v2, 28 Jul 2026 — rewritten to fold in the owner's @SM corrections on v1 (v1 preserved in git history). Companion visual: `canvas/macro-program-map.canvas`. Action plan: `program-map/HANDOFF-PLAN.md`._

> **Changelog v1 → v2:** AI Practice is **decoupled** from Cyber Practice (not a subordinate method) and needs its **own problem-shape**; New Operating Model = **EOS**, broader than the gated framework, drawn as an underpinning substrate-box; **AI GRC ≠ Cyber GRC**; **FAIR is a deep domain, not a low-cost elevation**; the operating model is no longer named after a person; §6 rhetoric dialled back to concrete claims; the corpus re-homes with corrected box assignments; and a first step is added — **deconstruct the slides into linkable graph nodes**.

---

## 0. TL;DR

Five top-down boxes: **Networx MSP · Cyber Security Practice · AI Practice · New Operating Model/Strategy (EOS) · Sandbox**, over an as-is → vision narrative.

Three things reframed the work:
1. **AI Practice and Cyber Practice are distinct, independently-viable capabilities** — one heavily leverages the other (AI Practice dogfoods/builds the Cyber Practice), but neither is mutually inclusive. AI Practice may go to market *first* and sell to non-cyber clients (finance, commodity trading, construction). It also has **its own problem shape** — why clients struggle to operationalise AI — which we still need to draw (a box parallel to the cyber as-is journey).
2. **The real blocker is upstream.** Before more program content goes into this vault, the framework (`knowledge-task-substrate`) and a proper **numbered vault structure** need finalising; the downstream-sync (substrate → vault) is being worked on. See `HANDOFF-PLAN.md`.
3. **A concrete first step:** deconstruct the PowerPoint slides into **linkable graph nodes** so they can be researched, linked and prioritised — with prioritisation aimed mostly at **raising knowledge-substrate quality** and deciding which **AI-Practice components are most fundamental** to move forward measurably.

---

## 1. The vision (the destination)

> A cohesive set of **open-source components grounded in a shared ontological & semantic language** that puts strategic cyber-risk decisions in the hands of those most qualified — **business operators, not sales folk** — with **compliance-as-code** as the foundational tenet.

Anti-opacity: it rejects black-box vendor AI, FUD selling, vanity metrics, unvalidated questionnaires, tools with no skin in the game.

_Correction: this vision is foundational to the **Cyber Practice** (the owner's years-long dream). It is **not** necessarily the north star every box points to — the **AI Practice stands by itself**. Both are decoupled capabilities where one is heavily leveraged by the other._

---

## 2. The problem(s) — two problem-shapes, not one

### 2.1 Cyber Practice as-is (built)
The 14-step customer journey (full text in the canvas 🔥 panel) is the canonical as-is for the **Cyber Security Practice**. Through-lines: no shared language / no machine-readable data so nothing compounds; the **$ of risk is unknowable in practice**; every incumbent product hides a **black-box AI layer**. The vision negates this list, so the journey doubles as the requirements spec.

### 2.2 AI Practice problem-shape (TO BUILD)
The AI Practice needs its **own** problem panel — *why clients struggle to operationalise AI technology* — which is a **different problem in a different domain** from the cyber black-box (the AI layer is a black box in cyber *and* in many other contexts, but the client's job-to-be-done differs). Source material the owner linked:
- `platform_research_sessions/ai-practice/ai_practice_deck_content.md`
- `platform_research_sessions/ai-practice/ai_practice_research_brief.md`
- `platform_research_sessions/ai-practice/ai-practice-session-2026-07-27.jsonl`

**Action:** build an "AI Practice as-is" box mirroring the cyber one, from those files. (Currently missing.)

---

## 3. The five boxes

### 3.1 🏢 Networx MSP — *context, install base, tenant-zero*
20+ yr business, low op-maturity. Slide: Service Desk · Professional Services · Centralised Services · Network Administration · vCIO. **It is the first customer of *both* the Cyber and AI practices** — some workstreams run concurrently (solving cyber problems, solving AI problems, dogfooding both). Transforming Networx is the dual-pronged proof; don't overthink it.

### 3.2 🛡️ Cyber Security Practice — *the domain / product spine*
What you were hired (CSO) to build; you've effectively been COO. Slide (Function × Capability): GRC · Security Engineering · Testing & Validation · Security Operations · Research & Analysis · DFIR · Education & Training. The near-term NCF product is the **GRC function productised**. Note: the **baseline AI-Practice capabilities are prerequisites** we must decide on and dogfood *first*, then apply to building this practice.

### 3.3 🤖 AI Practice — *a distinct capability that builds the Cyber Practice*
"**Sell the methodology as we prove it.**" Dogfooding now, nothing productised. Slide (7 pillars): GRC · Problem discovery & advisory · AI engineering · Testing & validation · AI operations · Research & analysis · Education & training. Commercial thesis (digest): coached internal capability beats black-box vendors *and* unguided DIY; the offer is method + tooling + governance transfer.

**Corrected read:** AI Practice is **decoupled** — a distinct capability that can exist and earn on its own, sellable to non-cyber clients (finance, commodity trading, construction). Its relationship to Cyber Practice is **leverage, not subordination**: build & dogfood the baseline AI-Practice capabilities (observability, collaboration, governance, agentic workflows) *first*, then apply them to the Cyber Practice — **and** offer the same competencies to existing clients. In future the AI Practice may be a full product spine and **lead go-to-market before** parts of the Cyber Practice are ready. If the Cyber Practice underperformed commercially, you would **not** kill the AI Practice — the tell that they're separate.

> **AI GRC ≠ Cyber GRC** (correcting a v1 error): AI GRC is the *operating model of AI usage* — which models are permitted, how used, observability, disclosure, the depth of usability/observability around AI and agentic-AI usage. It is **not** the NCF cyber control/policy engine.

### 3.4 ⚙️ New Operating Model / Strategy — *EOS; the substrate under all three*
Not just the gated-experimentation framework — that is **one exhaustive example**, not the be-all. The New Operating Model is closer to an **EOS (Entrepreneurial Operating System)**: a simple way to keep strategy, leadership and personnel aligned on **True North**, with referenceable artefacts (strategy-on-a-page), spanning **People · Strategy · Execution · Cash**. It also covers how you collaborate, how you share information, your corporate values, and what matters most to deliver stakeholder/client value. Distilled from the giants — **Collins, Harnish, Lencioni, Sinek, Ries** (*The Lean Startup*, *The Startup Way*). Explicit preference: **guardrails over governance** — respectful questioning so good ideas stay cohesive (not "engineers chasing shiny tools"), while leaving space for creativity and innovation. Needs more brainstorming/fleshing out.

**Drawn as a box/substrate that underpins all three practices**, with sub-branches to build out (People / Strategy / Execution / Cash, and the components above) as decisions are made.

### 3.5 🧪 Sandbox — *experimentation lane*
Explore without forcing a fit. Maps to the monorepo control-plane idea (TASK-1.1). Where an idea proves out before earning a home in a box.

---

## 4. How the bottom-up work re-homes (corrected)

- **Wayfinder decision map (TASK-1)** → the near-term **NCF product build** under Cyber Practice (GRC). *Clarifying the v1 phrasing you queried:* "productises steps 1–9" = the document factory generates the artefacts of the early journey (risk assessment → control selection → the `.docx/.xlsx`); "a slice, not the whole" simply meant the wayfinder map only covers that near-term NCF build — one function of one box — not the whole 5-box program. **You want this map fully rebuilt under the top-down view — blocked on the upstream work (§8).**
- **Session corpus (TASK-2)** → re-home with **corrected box assignments**: **financial exemplar → Cyber Practice**; **OSCAL / threat-model agentic workflows → cybersecurity overlays**; AI Practice keeps the genuinely AI-methodology sessions (bias/eval, problem-framing, the ai-practice deck). Re-ingest deliberately (HO-H2). There are also **missing sessions/data to ingest first** so priorities can be set with the full picture.
- **Substrate / vault + TASK-1.1** → New Operating Model — the **upstream-first** work (§8).

**First step you proposed:** deconstruct the three PowerPoint slides into **linkable graph nodes** (redraw them as pieces in the graph) so each can be linked to research and prioritised. Prioritisation then aims mostly at **raising knowledge-substrate quality** and choosing the **fundamental AI-Practice components**. This depends on the numbered-structure decision (HO-U1) so nodes get stable IDs.

Consistent with the earlier three-layer thesis (`platform_research_initial_scoping`): Layer 1 platform wedge = Cyber Practice product; Layer 2 = AI Practice; Layer 3 insurance grand prize = the vision endgame.

---

## 5. Structural observations (corrected)

### 5.1 NOM is the floor; the practices are decoupled peers
NOM (EOS) is the **substrate box** under MSP, Cyber Practice and AI Practice, with sub-branches. MSP is the ground (context + tenant-zero). Cyber Practice and AI Practice are **peers, not parent/child** — leverage flows between them via dogfooding.

### 5.2 Cyber Practice and AI Practice are distinct — share dogfooding, not a single engine
Correcting v1: not "one spine, don't build twice." Separate offerings. The AI-Practice capabilities are **built & dogfooded first**, then applied to the Cyber Practice, and are **also sellable independently**. Staff/sequence them as distinct, related capabilities.

### 5.3 FAIR / "$ of risk" — a deep domain, NOT a low-cost elevation
Correcting v1. After years on cyber-risk quantification: doing FAIR badly produces **snake-oil decisions**. It needs deep investigation, adjacent adversarial hypotheses, and probably a conversation with the FAIR organisation (who gated their research into a GRC product). It **could** be a linchpin, but it is **not** elevated at this stage — it stays a scoped ticket to be investigated properly.

### 5.4 Provability → build a basic agent harness + observability layer (early, upstream)
Agreed and concrete: an **agent harness + observability/eval layer** — validatable prompt comparisons, benchmarking — using existing tooling, starting simple, not boiling the ocean. A **first** program task; lives **upstream** as reusable dogfooding infrastructure (HO-U4).

---

## 6. On the operating-model / tooling relationship (concrete, no criticism)

Precisely, without rhetoric: the operating model's **guardrails** (frame the problem before the solution; don't commit the big cheque until the small one pays; keep a human gate) are the same instincts grilling/wayfinder operationalise. The **evidence** is specific — in the shape-extractions, particular documented waste (the docgen session building the wrong editor before the U51 realisation; the threat-model's ~1-hour GUI rabbit hole) is exactly what a scope/verification guardrail catches. **No criticism of the corpus is intended** — there is strong thinking in it, which is why every ticket carries **salvage notes to capture it**, not discard it (no baby out with the bathwater). The point is narrow: adopting guardrails isn't a new imposition — it's your own stated preference, made executable.

---

## 7. Cross-box linkages (corrected)

1. ~~Cyber GRC ↔ AI GRC = one NCF engine~~ → **wrong.** AI GRC = the operating model of AI usage/observability/disclosure; Cyber GRC = the control/policy engine. Different domains that touch.
2. **as-is "$ risk" ↔ FAIR ↔ insurance grand prize** — real, but FAIR needs deep work first (§5.3).
3. **AI Testing/Validation ↔ black-box-AI** — provability as differentiator; realised via the agent harness (§5.4).
4. **New Operating Model (EOS) ↔ everything** — the connective substrate (guardrails, machine-readable data, values, True North).
5. **MSP ↔ both practices** — tenant-zero and first customer of Cyber *and* AI; concurrent workstreams.

---

## 8. Decisions settled + what's next (from the @SM pass)

- **NOM = box/substrate underpinning all three**, sub-branches People/Strategy/Execution/Cash. ✔
- **AI Practice = separate offering**, related via leverage/dogfooding; intention is for it to build the Cyber Practice from the ground up. ✔
- **FAIR = not elevated**; deep-domain ticket. ✔
- **Vault structure:** OK to dogfood here, *but* risk of over-fitting to this program → handle via a dedicated **handoff, likely upstream**. Everything **numbered/ID'd** (Johnny Decimal) blending **PARA + Zettelkasten**. ✔
- **Wayfinder map:** needs a **full rebuild** under the top-down view — **blocked** on upstream substrate work (ingestible data, no lost referenceable artefacts, capture the operating-model content in `D:\Git\practice_poc`). ✔

**The plan is now `program-map/HANDOFF-PLAN.md`** — upstream-first: finalise the substrate (vault IA, claude-sessions ingest, downstream-sync, agent harness) before the here-cleanup, the slide-deconstruction, the corpus re-ingest, and the wayfinder rebuild.

---

## 9. Reference inputs still to pull in
- `D:\Git\practice_poc` — the operating-model (EOS) content.
- The giants (Collins, Harnish, Lencioni, Sinek, Ries).
- `johnnydecimal.com` (numbering) + PARA + Zettelkasten.
- `github.com/maleta/claude-sessions` (session ingestion to adapt — the recurring forgotten capability).
- The three `ai-practice/` files → the AI-Practice problem-shape (§2.2).

---

_Digests: `research/macro-inputs/`. Slides: `canvas/reference/`. Bottom-up maps: `canvas/wayfinder-map.canvas`, `canvas/session-corpus-map.canvas`. Plan: `program-map/HANDOFF-PLAN.md`._
