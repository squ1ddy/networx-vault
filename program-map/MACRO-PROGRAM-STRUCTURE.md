# Macro program structure — comprehensive notes

_Written overnight, 27 Jul 2026, from your hand-written narrative + three slides (Networx MSP, AI Practice, Cyber Security Practice) + digests of the two new corpus folders (`ai-practice/`, `llm-biases/ian specific/`). Companion visual: `canvas/macro-program-map.canvas`. Read this alongside the canvas._

---

## 0. TL;DR — what I did with your model

You gave me a top-down model of five boxes: **Networx MSP · Cyber Security Practice · AI Practice · New Operating Model/Strategy · Sandbox**, plus a hand-written as-is → vision narrative. I:

1. Built `canvas/macro-program-map.canvas` — your five boxes across the top, your three slides **embedded as originals**, the **as-is customer journey** on the left as "the problem", the **vision** on top as "the destination", and my two bottom-up maps (`wayfinder-map`, `session-corpus-map`) hung **underneath** the boxes they belong to.
2. Reconciled the bottom-up work into the top-down model (§4).
3. Surfaced the structural insights, tensions, and linkages I think are worth your decision (§5–§7).

The single most important thing I found: **your "New Operating Model" (the Ian gated-experimentation framework) and the grilling/wayfinder tooling you've started using are the same discipline.** The operating model is the *why*; the MP-skills are the *how*. That's the thread that ties the whole program together — more on this in §3 and §6.

---

## 1. The vision (the destination), in your words

> A cohesive set of **open-source components grounded in a shared ontological & semantic language** that puts strategic cyber-risk decisions in the hands of those most qualified — **business operators, not sales folk** — with **compliance-as-code** as the foundational tenet of digitally transforming an industry that desperately needs it.

This is the north star every box points at. Note what it rejects: black-box vendor AI, FUD-driven selling, vanity metrics, unvalidated questionnaires, and tools with no skin in the game. The vision is *anti-opacity*. That matters because it makes your **Testing & Validation / bias-diagnostics** capability (AI Practice) a **market differentiator**, not just internal hygiene — you are selling the thing the incumbents can't: provability.

---

## 2. The problem (the as-is), condensed

Your journey narrative is the canonical "as-is" for the Cyber Security Practice. Fourteen steps, every one manual, disconnected, low-maturity (full text in the canvas's 🔥 panel). The through-lines:

- **No shared language / no data.** Every step re-derives context by hand; nothing is machine-readable, so nothing compounds.
- **The $ of risk is unknowable in practice.** Open FAIR "isn't terribly open"; insurer loss data is hard to get; clients can't articulate BIA financials. → this is the hinge of the whole program (see §5.3).
- **The AI layer is a black box.** Every incumbent product has one nobody can prove, benchmark, or adapt.

The vision is a direct negation of this list. So the as-is journey isn't just backstory — **it's the requirements spec for what the cohesive components must replace.**

---

## 3. The five boxes — decomposition and my read

I'll give each box: what it is, its decomposition (from your slide/digest), and my structural read.

### 3.1 🏢 Networx MSP — *the context & install base*
The 20+ yr business being transformed, low operational maturity. Slide decomposition: **Service Desk/Support · Professional Services · Centralised Services · Network Administration · Business Relationship/vCIO**.

**My read:** this box is not a *build* target — it's the **substrate and tenant-zero**. It's where the operating-model transformation is *applied first*, and it's the first customer of the Cyber Practice. Its "vCIO / identify business risk" branch is the natural on-ramp to selling risk quantification.

### 3.2 🛡️ Cyber Security Practice — *the domain / product spine*
What you were hired (CSO) to build; you've been doing COO because of maturity/tech-debt/competency gaps. Slide decomposition (**Function × Capability**): **GRC · Security Engineering · Testing & Validation · Security Operations · Research & Analysis · DFIR · Education & Training**.

**My read:** this is the **domain model** of the whole program. The as-is journey maps almost one-to-one onto its GRC + Testing + Education functions. **The near-term product (NCF → document factory → FAIR) is the GRC function of this box, productised.** Everything in the wayfinder map (TASK-1) lives here.

### 3.3 🤖 AI Practice — *the growth engine / go-to-market*
"**Sell the methodology as we prove it.**" Nothing productised; dogfooding now. Slide decomposition (7 pillars): **GRC · Problem discovery & advisory · AI engineering · Testing & validation · AI operations · Research & analysis · Education & training**.

From the digest, the commercial thesis is sharp: **coached internal capability beats both black-box vendors and unguided DIY** (partnered builds succeed ~67% vs ~⅓ for DIY; ~95% of AI initiatives fail, mostly organisationally). The offer is *method + tooling + governance transfer* — "teach them to fish" — with the verification tax budgeted up front. The roadmap **is** the build: dogfood → prove → productise → sell. Ask today is not capital — it's endorsement + pilot-client nomination + AI6/ISO 42001 sign-off.

**My read (important):** the AI Practice and Cyber Practice have a **near-identical pillar structure** — both have GRC, Testing & Validation, Research & Analysis, Education & Training. That is not a coincidence and it's your biggest reuse opportunity: **the two practices share a spine.** The AI Practice is, in effect, the Cyber Practice's *methodology and delivery layer* pointed at a broader market (any AI adoption problem), with cyber as the flagship vertical. Don't model them as unrelated silos.

### 3.4 ⚙️ New Operating Model / Strategy — *the method that binds (and the substrate)*
Machine-readable/structured data by default; governance & compliance baked in (compliance-as-code); a **competency journey**; a defence against eroded critical thinking / LLM-slop. Decomposition (from the Ian framework): a **gated experimentation** process — problem → experiment → project, with 3 gates, 2 documents (Information Paper, Experiment/Project Proposal), 1 fast-track; a thinking discipline of **neutral problem-framing, falsifiable hypotheses, and innovation accounting**; and an **anti-patterns register** (esp. #11 AI-as-validation-engine, #12 skipping-the-human-gate — "reliability lives in the human gates, not the prompts").

**My read (the key insight of these notes):** this box is **not a fourth peer silo — it's the operating substrate under the other three**, and it is *the same discipline as the grilling/wayfinder tooling you've adopted.* Consider the mapping:

| Ian gated framework | grilling / wayfinder | this session |
|---|---|---|
| Problem framing before solution | grilling one question at a time | we named the destination before charting |
| Falsifiable hypotheses, kill = win | wayfinder tickets = decisions, "open a future wayfinder" is a valid resolution | tickets, not builds |
| Information Paper (no solution) | `/research` findings | the 3 research tickets |
| Anti-pattern #11/#12: AI as validation, skipping the human gate | HITL vs AFK ticket types; the human speaks for themselves | you catching the corpus missteps |

**The corpus missteps I found earlier are literally the anti-patterns doc 13 warns about.** So: the operating model is the theory; the MP-skills are the running implementation; this vault is where you dogfood it. That's the cleanest possible answer to "was wayfinder the right tool" — it's the operating model, executable.

### 3.5 🧪 Sandbox — *experimentation lane*
Space to explore without forcing a fit. Maps to your **monorepo control-plane** idea (TASK-1.1 fog). In gated-framework terms, the Sandbox is where **Gate-0 experiments** run before they earn a home in one of the four boxes. Good instinct to keep it explicitly outside the taxonomy.

---

## 4. How the bottom-up work re-homes under your model

This is the reconciliation you asked for — my two canvases were bottom-up; here's where they attach:

- **Wayfinder decision map (TASK-1)** → hangs under **Cyber Security Practice (GRC)** and **New Operating Model**. It is the near-term *product build*: NCF → document factory (.docx/.xlsx + token model) → FAIR → bookshelf. It productises as-is steps 1–9. **The wayfinder map's "destination" (a charted vault) is a slice of this macro model, not the whole thing** — worth keeping straight so the map doesn't feel like it's trying to boil the ocean.
- **Session corpus (TASK-2)** → hangs under **AI Practice**. It's the dogfooding proof base — every "dogfooded-now" cell on the AI Practice slide should point at a real session here (e.g. bias diagnostics → `llm-biases`; information papers → `financial-exemplar`; agentic workflows → `oscal`/`threat-model`).
- **The substrate / this vault + TASK-1.1 (portfolio & command-steering + vault structure)** → hangs under **New Operating Model**. Your "the vault structure isn't working" frustration is a NOM problem, and the Ian framework + concept-canvas invariants are the design inputs for fixing it.
- **FAIR (TASK-1.10)** → elevate; it's the hinge of the as-is journey (step 2) *and* the insurance grand prize (§5.3).

**Reconciliation with the earlier three-layer thesis** (from `platform_research_initial_scoping/CONTEXT.md`): your macro model is consistent with it — Layer 1 "platform wedge" = Cyber Practice product; Layer 2 "AI practice" = the AI Practice box; Layer 3 "insurance grand prize" = the vision's endgame (continuous, empirical control assurance feeding underwriting). The macro model is the *organisational* view; the three-layer thesis is the *strategic-horizon* view. They agree.

---

## 5. Structural observations worth a decision

### 5.1 The four boxes are not peers — they layer
- **MSP** = context/install base (and tenant-zero)
- **Cyber Practice** = domain/product
- **AI Practice** = methodology + go-to-market (cyber is its flagship vertical)
- **New Operating Model** = the substrate/method under all three

You can keep drawing them as four boxes (it's how you think, and it communicates), but internally treat NOM as the floor and MSP as the ground the others stand on. I've drawn the "bound by / transforms into" edges on the canvas to hint at this without flattening your model.

### 5.2 Cyber Practice and AI Practice share a spine — don't build it twice
Both have GRC, Testing & Validation, Research, Education pillars. The **NCF control/policy engine** is the shared GRC substrate; the **methodology** is the shared delivery layer. Decide deliberately whether AI Practice is "Cyber Practice's method, generalised" (my read) or a genuinely separate offering — it changes how you staff and sequence.

### 5.3 FAIR / "$ of risk" is the linchpin — consider elevating it
Your narrative's step 2 (can't quantify $ risk) is the pain that *everything downstream* inherits: prioritisation, board memos, insurance. FAIR is currently a single blocked wayfinder ticket (1.10). Given it sits on the critical path from **pain → method → the insurance grand prize**, it may deserve to be a named thread across boxes rather than one ticket. The research already says minimal FAIR is cheap (free tools; the gate is analyst skill) — so this is a high-payoff, low-cost elevation.

### 5.4 "Provability" is your differentiator, not your hygiene
The vision rejects black-box AI; the AI Practice has bias-diagnostics/benchmarking dogfooded. That capability is the one incumbents structurally can't offer. Treat Testing & Validation as a **sell-side wedge**, not just an internal counter.

---

## 6. The convergence to lean on (repeat, because it matters)

**Your operating model, your tooling, and your dogfooding are the same thing.** The Ian gated framework says: don't write the big cheque until the small cheque pays off; frame the problem before the solution; a kill is a win; reliability lives in the human gates. Grilling/wayfinder *are* that, executable. This vault *is* the dogfooding lab. So when you doubt whether this way of working is right — the corpus proves the cost of *not* doing it (every big session thrashed at exactly the anti-patterns the framework names), and the framework proves this way of working is your own stated strategy. They're one loop.

---

## 7. Cross-box linkages (you said these are for next — here's my starter set)

1. **Cyber GRC ↔ AI GRC** — one shared control/policy engine (NCF). The strongest "don't duplicate" edge.
2. **as-is "$ risk" ↔ FAIR ↔ insurance grand prize** — one thread from pain → method → market (§5.3).
3. **AI Testing/Validation ↔ the black-box-AI problem** — provability as differentiator (§5.4).
4. **New Operating Model ↔ everything** — compliance-as-code + machine-readable data is the connective tissue, not a silo.
5. **MSP ↔ Cyber Practice** — tenant-zero, first customer, the vCIO on-ramp.

Detailed branch-to-branch mapping is the natural next working session.

---

## 8. Open questions for you (morning coffee list)

1. **Is "New Operating Model" a box or the floor?** I lean *floor/substrate drawn as a box*. Your call changes the canvas.
2. **Is AI Practice = generalised Cyber-Practice method, or a separate offering?** (§5.2)
3. **Do we elevate FAIR from a ticket to a named cross-box thread?** (§5.3)
4. **Vault structure:** confirm we dogfood the new structure *here* first (using the concept-canvas invariants + the Ian framework), and only push proven changes upstream to `knowledge-task-substrate`. (This is TASK-1.1.)
5. **Does the macro model become the new "root" the wayfinder map reports into** — i.e. do we re-scope the wayfinder map explicitly as "the Cyber-Practice-GRC product build under the macro model"?

---

## 9. Recommended next steps

1. **You react to this structure** (the 5 open questions above) — that's the next grilling.
2. **Re-home the wayfinder map** as a child of the macro model (a one-line re-scope on TASK-1).
3. **Work TASK-1.1** (Portfolio & command-steering + vault structure) — now with three strong inputs: concept-canvas invariants, the Ian operating-model framework, and this macro model. This is where "the vault isn't working" gets fixed.
4. **Elevate FAIR** if you agree (§5.3).
5. **Ingest, one at a time**, starting with the two new high-value folders (`ai-practice` → TASK-2.13, `ian specific` → TASK-2.14) since they underpin two whole boxes.

---

_Deep source digests: `research/macro-inputs/ai-practice-digest.md`, `research/macro-inputs/operating-model-digest.md`. Your original slides: `canvas/reference/`. Bottom-up maps: `canvas/wayfinder-map.canvas`, `canvas/session-corpus-map.canvas`._
