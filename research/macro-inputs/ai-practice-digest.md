# AI Practice — digest

> Source: `D:\Git\platform_research_sessions\ai-practice\ai_practice_deck_content.md` (deck draft v1) and `ai_practice_research_brief.md` (leadership evidence base). Slide PNG cues: `s6_budget_roi`, `s9_livebench`, `s13_graph_table`, `s15_timeline`. Deck title/close line: **"Sell the methodology as we prove it."**

## Thesis — "sell the methodology as we prove it"

The wedge is candour, not hype. The framing (Slide 1): *"We are not pitching AI hype. We are pitching the discipline of extracting operational value from it, proven on ourselves before it touches a client."*

The narrative spine (research brief §"Narrative spine"):

1. **Confession first — "Internal AI Slop."** Networx's own technologists — people paid to think — exhibited laziness, operational-maturity debt, compounding bias, and absent critical thinking. There are receipts: retrospectives, six named biases caught live, a documented coaching arc. Credibility through candour (Slides A1–A3).
2. **Everyone drank the kool-aid; 95% got nothing (Pillar-1 evidence).** MIT NANDA "GenAI Divide 2025": 95% of enterprise GenAI pilots deliver no measurable P&L impact despite US$30–40B invested. The failure is *usually organisational* (a "learning gap") — but *sometimes genuinely the model* (drift, context rot, infra bugs). Deliberately softened for credibility.
3. **Every named problem has an engineering/governance counter — and we are dogfooding the counters now.** Nothing is productised yet; **the practice roadmap *is* the build.** The honest lead over the 95% is *diagnosis and method, not shipped tooling.*
4. **Therefore the AI Practice:** productise the methodology as it is proven internally, and sell it to clients currently in the 95% — including *teaching them to run it themselves* ("teach them to fish").

**Business logic / the wedge.** This is the *growth engine* that opens new client conversations. Commercial thesis (Slide B3): buying from specialised vendors / partnering succeeds ~67% of the time; unguided internal builds succeed at ~1/3 that rate. The offer is neither "buy our black box" nor "good luck DIY" — it is **coached internal capability** (methodology + tooling + governance transfer) so the client's build inherits the *partnership* success rate without permanent dependence. "The 95% aren't stupid — they're unguided." The "verification tax" (efficiency gains spent validating/correcting AI output) is budgeted up front, not discovered later. Design approach *mirrors the Cyber Security Practice* (function-vs-capability grid, staged offerings) — the parallel is the design method, not an operating precedent (cyber is itself still concept-phase).

## The 7 pillars (function-vs-capability grid)

Legend on the grid: **proposed offering / future offering / red outline = dogfooding internally now.** Dogfooding marker is deliberate — a capability *earns* its way onto the sell-side by surviving internal use first. Note: the deck's *narrative* pillars ("AI beyond the kool-aid", "Core problems", "Core solutions") are the argument sections; the **seven functions below are the practice's capability grid** (Slide 2 / close Slide E1).

1. **Governance, risk & compliance** — AS ISO/IEC 42001 as certifiable backbone; AU governance stack (existing law → Voluntary AI Safety Standard/VAISS 10 guardrails → AI6 six practices → ISO 42001); demonstrable governance as a *market differentiator* (AU has no AI Act). Dogfooded artefacts becoming IP: Stage-Gate experiment process, Information Paper template, AI usage policy, tool risk register, Bias Buster. Natural extension of existing Essential Eight / CPS 234 advisory. *(Dogfooding-now on the governance stack; client offering = proposed.)*
2. **Problem discovery & advisory** — problem-first framing vs solution-led proposals ("jobs-to-be-done", used loosely = the operational task AI should do); define success before choosing a tool. The coaching arc + Stage-Gate/Information Paper process are the dogfooded proof. *(Dogfooded-now.)*
3. **AI engineering** — graphs-over-lists (GraphRAG ~3× more accurate, ~80% fewer tokens on multi-hop/finance), declarative-over-imperative (DSPy +25–65%; PayPal DSL −60% dev time), agentic chaining (3 patterns: deterministic workflow / orchestrator+subagents / autonomous loop), local/sovereign version-pinned models. *(Mix of dogfooding-now — internal harness migration — and proposed.)*
4. **Testing & validation** — "Never trust, always verify" = zero-trust applied to model outputs: separate verifier passes (no model grading its own homework), regression evals on every model/version change, verification tax budgeted. Motivated by Anthropic's own postmortem (16% of Sonnet 4 requests degraded at peak; vendor evals missed it) and GPT-4 drift (84%→51%). *(Dogfooded-now; managed offering = proposed.)*
5. **AI operations** — observability/auditability: instrument every workflow (prompts, tool calls, data accessed, model versions, outputs); logs double as compliance artefact (EU AI Act Art.19 6-month logs; APRA CPS 234/230). "Monitoring/SIEM thinking applied to AI" = native MSP territory. *(Proposed / partly dogfooded.)*
6. **Research & analysis** — the evidence-base engine itself (this research brief); benchmark literacy (LiveBench jagged-capability, Chroma context rot), live diagnostic demos (six-prompt bias battery runnable in front of leadership in 10 min). *(Dogfooded-now.)*
7. **Education & training** — "teach them to fish"; transfer methodology/tooling/governance so client builds inherit partnership success characteristics. *(Proposed.)*

**Explicit gaps the design exercise surfaced — all folded into the grid (Slide E1 / brief §Practice structure):** vendor AI due diligence, shadow-AI monitoring (managed service), AI incident response (DFIR-for-AI), data readiness assessment, independent ROI/value measurement. These are largely *proposed/future* cells with no current owner in the dot points.

## Roadmap / sequencing

- **Dogfood → prove → productise → sell.** Capabilities move from red-outline (dogfooding-now) → proposed → future as they survive internal use. The roadmap *is* the build; nothing is a product yet.
- **s6 (budget/ROI):** misallocated spend — >50% of GenAI budgets go to sales/marketing, but measured ROI concentrates in **back-office operations** (process automation, agency-cost elimination, ops streamlining). Generic chatbots ~83% adoption for trivial tasks; only ~5% of custom tools survive pilot-to-production; ~42% abandoned most AI initiatives in 2025 (up from 17% in 2024). ROI figures may be *directional* in the source, not published numbers — do not invent.
- **s15 (timeline):** the Anthropic incident strip — Aug 5 bug → Aug 29 amplification → Aug 31 peak (16% of Sonnet 4 requests) → Sept 16 resolution — used as the "your verification layer must be yours" proof, not a product roadmap timeline.
- **The ask (Slide E2), sequenced — no capital ask today:** (1) endorse the practice model + dogfooding-first principle; (2) prepare business case / resource ask for next stage of internal builds + go-to-market pilot; (3) nominate first client candidates for guided pilots; (4) governance sign-off path (AI6 / ISO 42001). "Dogfood first, then the business case for capital to productise."

## How it connects to the rest of the program

- **Cyber Security Practice** — the *design template*: same function-vs-capability grid, staged offerings, function-vs-capability logic. AI GRC extends the existing **Essential Eight / CPS 234** cyber advisory; AI testing/ops reuse **SIEM/monitoring and DFIR** muscle memory ("SIEM thinking applied to AI", "DFIR-for-AI"). Cyber is itself concept-phase — parallel is method, not precedent.
- **NCF product** — internal proof point cited directly: the **ncf_platform migration to an orchestration *harness*** after governance failures in the framework-only era (lost ground truth, agent re-derivation, context bloat). Frameworks (CrewAI/LangGraph) = how engineers build a chain; harnesses (e.g. Nimbalyst, Multica) = how the org governs many — this distinction is the AI-engineering IP.
- **Networx MSP** — the practice is MSP-native: observability = SIEM, incident response = DFIR, vendor AI due diligence = supply-chain assessment, and APRA-regulated clients (CPS 234/230 control evidence, fourth-party concerns) are the target market. Local/sovereign models answer APRA data-residency + shadow-AI breach premium.
- **New Operating Model** — dogfooding-first *is* the operating principle: internal Stage-Gate experiment process, Information Paper template, human-in-the-middle gates, disclosure-as-leadership-control (undisclosed AI silently breaks the leader's calibration of team competence → destroys delegation economics). The governance stack the org runs on becomes the client offering.

## Open questions / risks

- **Nothing is productised** — the whole pitch rests on method + diagnosis; execution risk sits entirely in the "roadmap is the build" promise.
- **ROI numbers may be directional, not published** (s6) — risk of inventing figures; slides must fall back to budget-share bars with ROI-direction arrows.
- **METR caveat kept deliberately visible** — the robust finding is the *perception gap* (practitioners can't self-assess AI productivity), not "AI slows everyone down"; over-claiming breaks the intellectual-honesty positioning that is the whole wedge.
- **Ownerless capabilities** — vendor AI due diligence, shadow-AI monitoring, AI incident response, data readiness, independent ROI measurement have no current owner; included in the grid but unstaffed.
- **Sovereign-model capability gap** vs frontier cloud — trade-off framed as task-fit ("a governed adequate model beats an unauditable brilliant one"), but the gap is real for complex reasoning.
- **Several code/visual placeholders unbuilt** — before/after problem statements, Bias Buster prompt to be reconciled with internal version, LiveBench/graph/timeline visuals sourced live at build time (Scott to add manually).
- **Cyber-practice parallel is aspirational** — cyber is itself concept-phase, so the "mirror" is a design analogy with no operating precedent to lean on.
