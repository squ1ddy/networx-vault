# FAIR Quantification — Light Scoping (TASK-1.6)

**Question:** Is a "risk on a page" FAIR (Factor Analysis of Information Risk) quantification capability a near-term (Ring 2) build or a deferred (Ring 3) research item for a small cybersecurity document/policy consultancy? This is scoping, not method design.

**Researched:** 2026-07-27 · Primary sources: FAIR Institute, The Open Group (Open FAIR standard). All URLs cited inline.

---

## FAIR in brief

FAIR is the international standard **quantitative** model for information/operational risk. It expresses risk as **probable frequency × probable magnitude of future loss**, using probability distributions (ranges), not point scores, and is simulated (typically Monte Carlo) to produce an annualized loss-exposure distribution (min / most-likely / max, average annualized loss).

Core factor tree (from the FAIR standard):

- **Risk = Loss Event Frequency (LEF) × Loss Magnitude (LM)**
- **LEF = Threat Event Frequency (TEF) × Vulnerability**
  - **TEF = Contact Frequency × Probability of Action**
  - **Vulnerability = f(Threat Capability vs. Resistance/Control Strength)** — probability that a threat event becomes a loss event.
- **LM = Primary Loss + Secondary Loss** (secondary = reputation, fines, response/legal, i.e. fallout from stakeholder reaction).

Sources: [FAIR Standard v3.0, Jan 2025 (FAIR Institute PDF)](https://www.fairinstitute.org/hubfs/Standards%20Artifacts/Factor%20Analysis%20of%20Information%20Risk%20(FAIR)%20Standard%20v3.0%20(January%202025).pdf) · [Open Group Open FAIR (O-RT / O-RA)](https://www.opengroup.org/open-fair) · [Wikipedia: FAIR](https://en.wikipedia.org/wiki/Factor_analysis_of_information_risk)

---

## Minimum data inputs

A single scenario analysis ("risk on a page" = one scenario) needs **calibrated estimates**, not perfect data. FAIR is explicitly designed to run on ranged estimates where hard data is absent. Minimum inputs:

1. **Scenario definition** — asset at risk, threat community, threat effect (e.g. "external actor causes confidentiality breach of customer PII DB").
2. **Threat Event Frequency** — how often this actor acts against this asset per year (range).
3. **Vulnerability / control strength** — probability an attempt succeeds, or Threat Capability vs. Resistance Strength.
4. **Loss Magnitude** — Primary loss (response, replacement, lost productivity) + Secondary loss (fines, legal, reputation, notification), as ranges.

**Where practitioners get them (per FAIR guidance / typical practice):**
- **Calibrated expert estimation / SME interviews** — the primary source in FAIR; formal calibration training reduces bias. (Core FAIR method, not an add-on.)
- **Internal data** — incident logs, help-desk/SOC telemetry, prior breach costs, control test results.
- **Industry data** — breach-cost reports (e.g. IBM/Ponemon Cost of a Data Breach), Verizon DBIR for frequencies, insurance/actuarial loss data, threat-intel feeds. *(UNVERIFIED as to specific figures — named as commonly-used reference sets, not endorsed by the FAIR standard itself.)*

The load-bearing point: **FAIR does not require a data lake. It requires a defensible scenario, calibrated ranges, and a simulation.** That is what makes a minimal build feasible.

---

## Minimal "risk on a page" capability — what it takes

A minimal, honest capability = *scope one scenario → capture 4 ranged inputs → run Monte Carlo → output a one-page loss-exposure chart + narrative*. Requirements:

| Dimension | Minimal requirement |
|---|---|
| **Method** | FAIR taxonomy (O-RT) + FAIR analysis process (O-RA / Process Guide). Freely available (below). |
| **Tooling** | Off-the-shelf, free: **Open FAIR Risk Analysis Tool** (Excel) or **FAIR-U Workbook** (Excel), or **FAIR-U for Cyber** (web, Safe Security). No custom code needed for v1. |
| **Data** | Calibrated SME estimates + a small reference library of industry loss/frequency stats. No proprietary dataset required. |
| **Expertise** | One analyst who understands the taxonomy and calibrated estimation. This is the real gate — scoping scenarios and eliciting unbiased ranges is a skill. Open FAIR Foundation cert / FAIR Analysis Fundamentals course closes it. |
| **Effort (rough)** | **Learn + stand up a repeatable template: ~1–3 weeks of specialist time** (cert/self-study on free BoK ≈ days; build a reusable one-pager template + reference-data cheat sheet ≈ days). **Per client analysis thereafter: ~0.5–2 days** once fluent. Building *bespoke tooling* would push this to months — but that is explicitly out of scope for a minimal capability. |

*Effort figures are estimates for a competent security practitioner, flagged UNVERIFIED — they are judgment, not sourced benchmarks.*

---

## Free resources (barrier-lowering)

The barrier to entry is genuinely low because the standard **and** working tools are free:

- **The Open Group — Open FAIR Body of Knowledge:** O-RT (Risk Taxonomy) and O-RA (Risk Analysis) standards, **Risk Analysis Process Guide (G180)**, **Risk Analysis Example Guide (G21A)**, **Mathematics for the Open FAIR Methodology (G224)**, and integration **cookbooks** (NIST, ISO/IEC 27005). Publications are downloadable from the Open Group library. [opengroup.org/open-fair](https://www.opengroup.org/open-fair) — *registration/account requirement UNVERIFIED; some Open Group downloads require a free account.*
- **Open FAIR Risk Analysis Tool** — free **Excel** tool; compares before/after risk states, multi-currency, outputs average annual loss exposure. [Open Group blog](https://blog.opengroup.org/2018/03/29/introducing-the-open-group-open-fair-risk-analysis-tool/)
- **FAIR-U (free training app):** original RiskLens-powered FAIR-U has been **discontinued**; replaced by **FAIR-U for Cyber** (web, powered by Safe Security's Safe One — build scenarios, define assets, financial inputs, Monte Carlo, reporting) plus a **FAIR-U Workbook for Learners** (Excel). Free from the FAIR Institute. [FAIR Institute – free training app](https://www.fairinstitute.org/blog/now-available-learn-fair-with-our-free-training-app) · [FAIR-U Workbook](https://www.fairinstitute.org/fair-u-workbook)
- **Free FAIR Fundamentals training** for university students/professors; exec course via Coursera / FAIR Academy. [FAIR Institute](https://www.fairinstitute.org/blog/free-fair-fundamentals-training-for-university-students-and-professors)
- **The FAIR Model** primer (FAIR Institute PDF). [PDF](https://cdn2.hubspot.net/hubfs/1616664/The%20FAIR%20Model_FINAL_Web%20Only.pdf)

**Note:** "RiskLens community edition" as a standalone free product is **UNVERIFIED / effectively superseded** — RiskLens' free offering was FAIR-U, now migrated to Safe Security. Do not assume a free commercial RiskLens tier exists.

---

## Recommendation: Ring 2 (near-term), scoped tight

**Lean: Ring 2 — but only the minimal template capability, with the ambitious "build our own engine" explicitly kicked to Ring 3.**

Reasoning (effort vs payoff for a small consultancy):

- **Payoff is high and on-brand.** A doc/policy practice already produces the qualitative risk narratives clients expect; adding a defensible *dollar* figure on a page is a differentiated, sellable upgrade and directly leverages existing client scenario knowledge.
- **Effort is low because the hard parts are free and off-the-shelf.** The standard, the math, the process guides, and a working Monte Carlo tool all exist at zero cost. The build is "learn + template," not "engineer a platform."
- **The only real gate is analyst fluency** (calibrated estimation + scenario scoping), which is a ~1–3 week investment against a durable capability — acceptable for Ring 2.
- **De-risk by scoping:** Ring 2 = *one scenario, free Excel/web tool, one-page output template, reference-data cheat sheet.* Defer to **Ring 3**: custom tooling/automation, portfolio-level aggregation, integration into a product, and any data-pipeline work — none of which is needed to start selling "risk on a page."

Bottom line: the classic reason to defer FAIR (data-heavy, tool-heavy, specialist-heavy) does **not** hold at the minimal-capability altitude. Ring 2, tightly scoped.

---

*Sources consolidated:* FAIR Institute (fairinstitute.org), The Open Group Open FAIR (opengroup.org/open-fair). Items flagged UNVERIFIED are judgment or unconfirmed access-terms and should be checked before quoting to a client.
