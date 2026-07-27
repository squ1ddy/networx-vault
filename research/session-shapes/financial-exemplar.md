# Session Shape — Financial Exemplar (APRA CPS 234/230 + SOCI 4th-party breach)

Source: `D:\Git\platform_research_sessions\financial_example-treatmodel\`
Transcript: `conversation.jsonl` (28 turns, 14 user / 14 assistant, ~27KB)
Type: worked regulatory/legal/case-law analysis → threat-model tooling prompts. Flagship "Learnings" exemplar.

## At a glance

| | |
|---|---|
| Turns | 28 (14 user, 14 assistant) |
| Tools used | web_search, web_fetch, ask_user_input_v0, create_file, str_replace, bash_tool, present_files |
| Restarts / hard resets | 0 |
| Scope pivots | 1 major (regulatory analysis → threat-modelling tooling, turn 19) |
| Self-corrections | 3 explicit (all in the threat-model half; turns 22, 24 — see below) |
| Unverified-claim incidents | 2 material (assistant asserted then had to retract) |
| Net shape | Clean, disciplined front half; churny, correction-heavy back half |

## Narrative arc

1. **Framing (t1–2)** — User asks a mis-typed question ("CSP230/234"). Assistant corrects the terminology, front-loads the *threshold question* (is the code an "information asset" of the regulated entity?), and refuses to answer beyond scope until that gate resolves. Strong opening: it made the right thing conditional instead of guessing.
2. **Deep regulatory build (t3–8)** — User confirms in-scope. Assistant maps CPS 234/230 clause-by-clause, MSP derivative obligations, adjacent regimes (Privacy Act/NDB, SOCI, ACL, equitable confidence), and case law. User then trims the list interactively (t5) and later pastes a research doc expanding IT-provider case law (t7), leading to a ranked, culpability-focused case set with the "outcome-immaterial" thesis (t8).
3. **Artefact production (t9–18)** — Convert to a downloadable .md, split case law into a companion file, add forensic-catalogue items, TOC, a Teams-pasteable HTML variant, and a wording debate (immaterial vs irrelevant).
4. **Pivot to tooling (t19–26)** — User attaches AWS diagrams and pivots to *authoring prompts for other agents*: a staged Claude Code threat-model-tool scout/builder, then an IriusRisk "Jeff" prompt. This half is where the missteps cluster.
5. **Packaging (t27–28)** — Emit the conversation.jsonl and a zipped artefact pack.

## Key decisions (mostly good)

- **Threshold-first framing (t2).** Refused to enumerate obligations until the "information asset" scope question was answered. This is the reusable move.
- **Clause + definition + source-link discipline (t4 onward).** Every assertion tied to a paragraph number and a legislation.gov.au/APRA/CISC link. Definitions supplied inline.
- **Interactive trimming via `ask_user_input_v0` (t6).** Batched three genuine judgement calls (equitable-confidence scoping, s180 footnote, output format) into one interactive prompt rather than guessing.
- **Candid about weak spots.** Explicitly flagged that direct MSP case law is "thin" (t6/t8) rather than padding; kept live matters (Medibank, Fortnum, Latitude) labelled as unproven allegations throughout.
- **Result-agnostic thesis (t8).** "Swap the ransomware crew for a departing contractor and the analysis is materially identical" — a genuinely portable analytical spine.

## Missteps & dead-ends

1. **"Claude Code can't see your AWS screenshots" — flatly wrong (t20 → retracted t22).** Assistant asserted the agent couldn't use the attached diagrams; user pushed back ("I thought Claude Code was multimodal?"). Assistant conceded it *is* multimodal. **User caught this, not the assistant.**
2. **Image-handling nuance still wrong after the first fix (t22 → re-corrected t24).** Having conceded multimodality, the assistant then implied web-page images could be used during research. User pushed again (t23: "can't the agent retrieve the image from the website?"). Assistant had to verify and re-correct: WebFetch returns *text only*; images only reach the model via Read on a local file. So the same capability question was wrong **twice**, each time surfaced by the user.
3. **Over-engineered POC gate (t20 → walked back t22).** Assistant imposed a mandatory proof-of-concept "hard gate" to establish import confidence. User objected (t21) that importability is usually determinable from docs and a full POC is "overly burdensome." Assistant softened to documentation-first. Scope/process churn driven entirely by user correction.
4. **Statutory-term slip (t4 → t6).** Used "material harm" for the NDB test; the statutory term is "serious harm" (s 26WG). Self-caught here, but only after the user's structured clarification pass.
5. **Format thrash in the artefact half (t11–t16).** Reorder sections, re-bulletise the MSP block ("may not be read due to the vast quantity of text"), split files, add TOC, then a whole separate Teams-HTML variant. Not wrong, but a lot of iterative reshaping that a clearer up-front output spec would have collapsed.
6. **Superseded single-file prompt (t20→t22).** The first monolithic threat-model prompt was discarded in favour of a split CLAUDE.md + stage set and archived. A dead-end kept only "for reference."

## Where grilling / wayfinder would have helped

- **The multimodal claim (t20) is the flagship "grilling-would-have-caught-it" moment.** A single adversarial pass — "are you *sure* Claude Code can't read those images? verify against docs before asserting a capability limit" — would have prevented an incorrect assertion that the user had to catch and that then failed a *second* time (t22→t24). Capability claims about the tooling were the least-verified content in an otherwise source-disciplined session.
- **POC gate (t20).** Grilling "why is a full POC a *gate* rather than a documentation check? what's the cheapest thing that resolves import confidence?" would have pre-empted the t21 pushback.
- **Output spec up front.** A wayfinder step pinning the deliverable set (files, section order, formats, audience) before t10 would have collapsed the t11–t16 reshaping loop.
- **Statutory-term precision (t4).** A verification checkpoint on named legal terms ("material" vs "serious" harm) — the reg-analysis half was strong precisely because it later got this discipline; the slip shows what happens before the checkpoint fires.
- **Pattern:** every substantive error lived in the *tooling/meta* half (claims about agent capabilities), never in the *domain* half (regulatory law), which was rigorously cited. Grilling should be aimed at un-sourceable capability/process assertions.

## Salvage — reusable method & skeleton

**Reusable method (the "regulatory obligation map" recipe — directly portable to the AI-advisory shelf + NCF-I insurance):**

1. **Threshold gate first.** Identify the single scoping question that determines whether *any* obligation attaches (here: "is X an information asset of the regulated entity?"). Refuse to enumerate until answered. → For AI-advisory: "is this system a *material* arrangement / does it touch a critical operation?"
2. **Clause + definition + source-link for every assertion.** No obligation without (a) the governing instrument, (b) the paragraph/section, (c) a primary-source link, (d) inline definition of terms of art.
3. **Split obligations by actor.** Regulated entity vs service provider vs 4th party; and by regime (prudential / privacy / sector-specific / general law). Mark which bind *directly* vs *derivatively via flow-down*.
4. **Gate the adjacent regimes.** Each secondary regime carries an explicit trigger condition ("only if personal information exfiltrated"; "only if AFSL held") so items can be struck cleanly.
5. **Result-agnostic culpability thesis.** Rank case law by *similarity to the scenario*, and separate "what happened" (ransomware vs insider) from "control-weakness / statutory culpability" — the consequences are broadly equivalent. Directly reusable for NCF-I underwriting narratives.
6. **Candour markers.** Flag thin evidence, live/unproven matters, and standards that shift on a known date (CPS 230 para-number drift @ 1 Jul 2026). Bake a "verify before relying" disclaimer in.

**Reusable document skeleton (from `4th-party-code-breach-regulatory-legal-risk-reference.md`):**

```
Disclaimer (not legal advice; live matters; date-drift warning)
Contents (TOC)
1. Executive Summary — most pertinent exposures per party
2. Risk impact of [asset] leakage  (numbered top-N + catalogue, each w/ concrete example)
3. [Role] duty of care — actions beyond the statutory minimum (worst-case assumptions, phased)
4. Key definitions (source-linked)
5. Regulated entity — compelled/expected actions
   5a. <Prudential std A>   5b. <Prudential std B>   5c. <Sector Act>
6. Service provider — statutory & general-law obligations (independent of contract)
   6a. Privacy/NDB (gated)  6b. Sector Act + flow-down  6c. Equitable confidence  6d. Consumer law
--- companion file: Case law ranked by similarity + "outcome immaterial to culpability" ---
```

**Reusable prompt scaffolds (threat-model half — usable despite the missteps):**
- `threat-model-agent/` staged Claude Code set: shared `CLAUDE.md` (mission, weighted decision criteria with *importability decisive*, visual bar, a `threat-tool-scout` sub-agent, Appendix A scenario/infra baseline marked GIVEN vs ASSUMED, Appendix B threat primitives → candidate ATT&CK IDs + controls + sources), plus 3 lean stage files + `RUN-SEQUENCE.md` orchestration with a human decision gate.
- `iriusrisk/` "Jeff" prompt: RAG-friendly standard component names, named trust zones ordered by trust, intended + circumvention data flows, tagged data assets, actors, threat focus; OTM JSON/YAML offered as a deterministic alternative.
- **Salvage caveat:** carry forward the *structure*, but re-verify every embedded claim about agent capabilities (multimodality, WebFetch image handling) before reuse — that is exactly the content class that failed here.
