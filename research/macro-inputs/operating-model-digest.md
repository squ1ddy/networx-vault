---
title: "New Operating Model — digest"
summary: "Digest of the 'ian specific' lean-experimentation framework for the New Operating Model / Strategy macro model."
source_folder: "platform_research_sessions/llm-biases/ian specific/ (docs 00–14)"
tags: [macro-input, operating-model, lean-startup, gated-experimentation, governance]
---

# New Operating Model — digest

*Source: the "ian specific" wiki — 14 curated docs (00-index … 14-team-briefing). Drawn from Eric Ries (The Lean Startup 2011, The Startup Way 2017), Kromatic's practitioner tooling (Learn S.M.A.R.T., innovation accounting), and Wedell-Wedellsborg, "Are You Solving the Right Problems?" (HBR 2017).*

## The core idea — gated experimentation + lean-startup-in-an-enterprise (and why)

The framework answers one question: **how do we decide what to build under uncertainty?** It exists because "we have more ideas than capital, and enthusiasm is not evidence." The one-paragraph version (doc 00): before spending real money, do three things *in order* — (1) establish the problem is real and material, (2) frame it honestly including the framings you dislike, (3) run the cheapest experiment that could invalidate the belief. Each step releases a tranche of time/money and each is gated by a human who can say stop.

Why gate it at all (doc 01):
- **Time is capital.** Internal experimentation is *not* free "because we pay salaries anyway" — engineer hours are the scarcest capital, and half-finished internal projects have a long tail of cost. The question is never "can we afford to try this?" but "is this the best use of the next tranche of capacity?"
- **Subjective pain ≠ objective value.** Lived experience is a legitimate *source* of candidate problems but not evidence of value. The individual has the signal; the business has the scale.
- **Name the value type.** Money-today / money-tomorrow / cost-avoidance / experience are all fundable — but a capability-building exercise disguised as a near-term efficiency case is not (doc 01, doc 06).
- **Evidence before capital:** "you do not write the big cheque until the small cheque pays off." This is Ries's *metered funding* — small fixed budget, more released only on validated learning, funds ring-fenced from operational raids (doc 03). The enterprise twist (The Startup Way, doc 03): an MSP's normal management system (annual budgets, utilisation, fixed deliverables) is *actively hostile* to work whose defining feature is not-yet-knowing the answer. The fix is a parallel **entrepreneurial-management** function: small cross-functional teams with scarcity budgets, accountable to a **growth board** that decides (not advises) and is genuinely willing to kill things.

Underlying method (Lean Startup, doc 02): **validated learning** as the unit of progress; **Build→Measure→Learn designed in reverse** (learn → measure → build); **MVP = smallest thing that produces the learning** (often interviews or a manual process, not a product); **test the riskiest assumption first**; **pivot / persevere / scale / kill decided explicitly and on a date** — and a cheap early kill is one of the highest-ROI events the system produces. Precision that matters: we never *validate*; we **fail to invalidate**.

## The Networx gated process (doc 07) — how ideas move problem → experiment → project

Ries's metered funding implemented as **three gates, two core documents, one fast track.** Each stage buys down a specific risk; each gate is a human deciding whether the evidence justifies the next tranche.

| Stage / Gate | Question | Artefact / decision |
|---|---|---|
| **Problem surfacing** | (intuition, anecdote, lived experience all welcome) | a paragraph |
| **Gate 0 — Triage / sniff test** | Real, plausibly material, in an area we care about? Fast-track eligible? | practice lead; no document needed |
| **Stage 1 — Discovery** | Is the pain real, sized, honestly framed? *No tool selection, no vendor eval, no building.* | → **Information Paper** |
| **Gate 1 — Is this worth money?** | Magnitude? Honest competing framings? Which value type? Riskiest assumption? Spend proportionate? | go / refine / kill → releases *experiment* budget |
| **Stage 2 — Experiments** | **Diagnostic first, then solution.** Time-boxed, guardrailed, fail + early-stop conditions written before running. | → **Experiment Proposal(s)** + results |
| **Gate 2 — What did we learn?** | Met success / fail / neither? Next riskiest assumption? | scale / iterate / pivot / **kill (a kill here is a success)** |
| **Stage 3 — Adopt / Scale** | Build at scale, with **cross-functional buy-in** (security, service delivery, ops can block) | → **Project Proposal** |

**Fast track** (Ries's "work by exception"): eligible only if *all* of — below effort threshold, reversible, no sensitive data, no production change, run by someone with a track record. Then a short brief + single chair approval, no gate review. It is a **privilege attached to a track record**, withdrawn if boxes are blown or results unreported. **Proportionality** is explicit: formality must match the money at stake. The AI structured-prompting sequence (1a→1b→2→3) is a *thinking aid inside Stage 1*, not the process — every AI step is followed by a human review before its output becomes an input.

## Problem framing + hypotheses/falsifiability + innovation accounting (docs 04/05/06) — the thinking discipline

**Problem framing (doc 04):** organisations are good at solving problems and poor at deciding *which* problem to solve. The **slow-elevator** lesson: reframe "the lift is slow" → "the wait is annoying" (mirrors, not a new motor) — the original framing wasn't wrong, just not the best available, and problems are **multicausal** so don't hunt for *the* root cause — **weight the mix**. Use **neutral language** ("operational knowledge," not "the fragmented knowledge problem" — the label is itself a framing decision). A good problem statement is **outcome-led and tool-agnostic**: *if your definition of success can't survive without naming a tool, you've described a solution, not a problem.* Same test for **user stories** (As a [persona], I want [action], so that [benefit]) — if the "so that" only works with your preferred tool, it isn't a story.

**Hypotheses / falsifiability (doc 05):** "a belief is only useful if you can say, in advance, what result would make you abandon it." Write both the true *and* false conditions with **numeric thresholds** before running (afterwards they get shaped to fit). Distinguish **fail condition** (evaluated at end) from **early-stop condition** (tripwire during). **Don't design a test that can only pass** — deliberately include the bad cases (the stale doc, the sceptical user); serving an out-of-date procedure confidently *is the test working*. **Seek the disconfirming case on purpose.** Word conclusions as "failed to invalidate under conditions A,B" — never "proved." **Diagnostic experiments** (which problem is it?) come before **solution experiments** (does this fix work?); running solution-first tells you only whether your tool works, not whether it mattered. Anecdote is a *prompt to investigate*, not proof (beware the availability heuristic).

**Innovation accounting (doc 06):** how to measure progress when revenue/ROI/market-share are all zero. **Leading over lagging** indicators, and state the causal chain to the lagging metric out loud. **Vanity vs actionable** metrics — "usage is the most seductive vanity metric in AI work"; test: *if the number moved either way, would we do anything differently?* **Baselines are mandatory** ("faster than *what*?") and establishing one is often the cheapest, most valuable first experiment (and sometimes kills the case cheaply). **Size the return with visible arithmetic** (frequency × cost × population → order of magnitude ±50%). Pair every efficiency metric with a **quality guardrail**. Process-level KPIs: experiment cadence (≥1/week), cycle time, and a non-zero **kill rate**.

## Templates on offer (docs 08/09/10)

- **Information Paper (doc 08)** — 2–4 pages, answers *is this problem worth money?* **Contains no chosen solution.** Sections: neutral problem domain; origin + **declared biases** (name what you already want the answer to be); observable symptoms with a specific dated example; **magnitude with arithmetic**; value hypothesis (one type, defended); **2–4 competing framings, at least one locating cause in process/behaviour**; a discriminating-evidence map (one cheap measurement that weights several framings); ranked assumptions + the riskiest; tool-agnostic user stories; recommendation = request for *experiment* budget.
- **Experiment Proposal (doc 09)** — **one page**, maps directly onto Kromatic's **Learn S.M.A.R.T.** Exactly one assumption under test; diagnostic-vs-solution flagged; falsifiable hypothesis with numeric true/false thresholds; data table with baseline + **quality guardrail**; explicit data/reversibility guardrails; short time-box; **fail + early-stop conditions**; **decision criteria (scale/iterate/pivot/kill) written before running**. Post-run: results, insights ("we fail to invalidate"), next steps — sections 1–10 never edited retrospectively.
- **Project Proposal (doc 10)** — commit real resources, *only* on the strength of experiment evidence ("a Project Proposal not standing on experiment results is just an opinion with a budget attached"). Evidence base; validated (still tool-agnostic) problem statement; solution *now* justified from evidence not preference; **"do nothing" argued against on its merits**; once-off + **ongoing** costs; return with sensitivity test; a named **adoption owner** with week-2-retention metrics; **sunset criteria**; **cross-functional sign-off** where any function may block.

The two worked cases (docs 11/12) demonstrate the method: the neutral on-call-handover example where a 4-hour diagnostic killed a 6-week AI-summariser build (the context existed only in people's heads — nothing to summarise; an AI would have produced *authoritative briefs with a hole in them* — "worse than nothing"); and the real, messy operational-knowledge case (declined AI-migration proposal that reasoned backwards from a chosen solution; the reframe filed at the bottom; three failure modes — findability / access-ownership / **currency**, where stale docs become "loud, authoritative wrong answers").

## Anti-patterns to avoid (doc 13) + the critical-thinking / LLM-slop concern

Fifteen recurring failure modes, each with a "tell" and a fix: **solution-first reasoning** (tool named in the title; thin "alternatives"); **the reframe filed at the bottom** ("a real reframe rewrites the top of the page"); **vanity metrics**; **the unfalsifiable claim**; **the test that can only pass**; **solution experiment before diagnosis**; **no baseline**; **anecdote inflation** ("lots of people" = three, twice each); **zombie projects** (no time-box); **sunk-cost polishing** of throwaway work (IKEA effect); **proportionality failure**.

Four are squarely the **critical-thinking / LLM-slop** concern:
- **#11 AI as validation engine** — asking a model to polish a foregone conclusion and mistaking fluency for rigour; the tell is *the model never told you you were wrong*. Fix: point AI at *attacking* your framing, and re-issue the adversarial stance every new session (it isn't permanent).
- **#12 Skipping the human gate** — chaining prompt outputs into inputs with no human pressure-test; **"the method's reliability lives in the human gates, not the prompts"** — skip one and errors compound invisibly.
- **#13 "Continue our previous conversation"** — a fresh agent confabulates continuity; **separate context (data) from instruction (task).**
- **#14 Process theatre** — perfectly filled templates with no thinking behind them; *"the structure is disposable; the habit is the asset."*

A named **bias reference table** (confirmation, anchoring, law of the instrument, sunk-cost, automation bias, curse of knowledge, IKEA effect, availability, moral licensing) grounds each in a citation — and the sharpest note: **disclosure is not neutralisation** ("I disclosed my bias, so it's handled" is moral licensing); the refinement is *disclose that a bias exists, withhold its substance* so a model can guard against it without anchoring on it.

## How it binds the other boxes into one operating model

This framework is the **competency spine** connecting the practice areas — the shared discipline that turns "technical people who can use tools" into people who reason about the right problems and build durable, repeatable operations:

- **Networx MSP (the operational core):** doc 03 names the exact tension — an MSP is *built* for predictable, repeatable delivery, and that management system will reliably kill good experiments. The operating model adds an entrepreneurial-management lane *alongside* delivery, with ring-fenced metered funding so experimentation survives operational pressure. Structured, tool-agnostic problem statements and required baselines are also the machine-readable, governance-by-default habits the MSP needs.
- **AI Practice:** the framework is largely *about* how to adopt AI responsibly — "usage is the most seductive vanity metric," AI outputs are raw material for a human gate, the LLM-slop anti-patterns (#11–#14), and the recurring lesson that pointing AI at stale/ungoverned knowledge produces *confidently wrong* answers. AI is positioned as an assist to human reasoning, never a replacement for evidence that doesn't exist.
- **Cyber Security Practice:** governance/compliance is baked in by-default, not bolted on at the end. Doc 03's **gatekeeper→enabling** shift has security define *in advance* what data may never touch an external tool, what's reversible, and what always escalates — so teams self-serve inside known boundaries (fewer meetings, *better* security than a rushed end-of-line review). Stage-3 cross-functional sign-off gives security a genuine block.

The binding mechanism is **one method, three vocabularies** (doc 14): stage-gate for structure, lean-startup for intent, tranches for the money argument — the same spine spoken to whichever practice/audience is in the room. Success signals: a problem brought with *no solution attached*, a *failed* experiment reported without embarrassment, and someone killing their own idea early and being publicly credited for it.
