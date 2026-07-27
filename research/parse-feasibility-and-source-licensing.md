# Parse Feasibility & Source Licensing — NIST 800-53 / NIST CSF 2.0 / ISO 27001:2022

**Backlog ticket:** TASK-1.4
**Date:** 2026-07-27
**Author:** /research subagent
**Question:** Is parsing NIST SP 800-53 (Rev 5), and later NIST CSF 2.0 and ISO/IEC 27001:2022, into a de-licensed, redistributable control baseline FEASIBLE, and what are the licensing / copyright / redistribution terms of each source standard?

---

## Key findings (short version)

- **NIST SP 800-53 Rev 5** — Public domain (U.S. Government work). NIST publishes the control catalog + the 800-53B low/moderate/high baselines as machine-readable **OSCAL in JSON, XML, and YAML** from an official GitHub repo (`usnistgov/oscal-content`) that is explicitly released under **CC0 1.0**. Fully redistributable. **This is the safe, easy first parse target.**
- **NIST CSF 2.0** — Public domain (U.S. Government work). NIST publishes the CSF 2.0 Core in human- and machine-readable form (**JSON + Excel**) via the Cybersecurity and Privacy Reference Tool (CPRT). Fully redistributable.
- **ISO/IEC 27001:2022 (incl. Annex A controls)** — **Copyrighted by ISO/IEC; NOT freely redistributable.** The control text is protected. A derived crosswalk may reference control *identifiers* (e.g. "A.5.32") and describe intent in your own words, but must NOT reproduce ISO's verbatim control text/titles at scale without a licence/written permission. This is the critical legal constraint.

---

## Detailed findings (with inline sources)

### 1. NIST SP 800-53 Rev 5

- **Copyright status:** Work of the U.S. Government → public domain in the U.S. NIST publications carry the standard disclaimer that they are not subject to copyright in the United States (attribution appreciated). Publication landing page: <https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final>
- **Machine-readable formats:** Official OSCAL content repo `usnistgov/oscal-content` provides the catalog and the SP 800-53B **low / moderate / high** baselines in **XML, JSON, and YAML**. Repo: <https://github.com/usnistgov/oscal-content> ; SP800-53 subtree: <https://github.com/usnistgov/oscal-content/tree/main/nist.gov/SP800-53>
  - Repo README (quoted): *"This directory contains OSCAL examples of the catalog, and low, moderate, and high baselines defined by NIST Special Publication (SP) 800-53 Revision 5 and SP 800-53B respectively."*
  - Direct catalog files (verified reachable):
    - XML: <https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev5/xml/NIST_SP-800-53_rev5_catalog.xml>
    - YAML: <https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev5/yaml/NIST_SP-800-53_rev5_catalog.yaml>
  - The Rev 5 landing page also links Excel (.xlsx) workbooks (Rev4→Rev5 comparison, privacy control mappings, CSF/PF mappings) and an OLIR crosswalk to ISO/IEC 27001:2022. Source: <https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final>
- **Redistribution license (verified verbatim):** The `oscal-content` repo `LICENSE.md` is **CC0 1.0 Universal Public Domain Dedication**:
  - *"As a work of the United States government, this project is in the public domain within the United States."*
  - *"We waive copyright and related rights in the work worldwide through the CC0 1.0 Universal public domain dedication."*
  - *"You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission."*
  - Source: <https://raw.githubusercontent.com/usnistgov/oscal-content/main/LICENSE.md>
- **Verdict:** Fully parseable and redistributable with zero licensing risk. OSCAL JSON is a clean, structured, official machine-readable representation — no scraping/OCR needed.

### 2. NIST CSF 2.0

- **Copyright status:** Work of the U.S. Government → public domain (same basis as 800-53). Framework home: <https://www.nist.gov/cyberframework>
- **Machine-readable formats:** NIST provides the CSF 2.0 Core in human- and machine-readable form via the **Cybersecurity and Privacy Reference Tool (CPRT)**, exportable as **JSON and Excel**.
  - CPRT project: <https://csrc.nist.gov/projects/cprt>
  - CSF 2.0 JSON download endpoint (verified to return a downloadable data file): <https://csrc.nist.gov/extensions/nudp/services/json/csf/download>
  - Reference-tool announcement: <https://csrc.nist.gov/News/2023/just-released-nist-csf-2-0-reference-tool>
- **Verdict:** Fully parseable and redistributable. CPRT JSON is the clean source of truth. Deferred to a later phase per ticket sequencing, but no added legal risk.

### 3. ISO/IEC 27001:2022 (Annex A controls) — CRITICAL CONSTRAINT

- **Copyright status:** ISO owns full copyright in all ISO/IEC standards and their drafts. Standards are sold (paywalled) and are protected by copyright; any reproduction requires acceptance of ISO's copyright conditions and, for most uses, written permission. Copyright requests → copyright@iso.org.
  - ISO Terms & Conditions / Licence Agreement: <https://www.iso.org/terms-conditions-licence-agreement.html>
  - ISO 27001 standard page (paid): <https://www.iso.org/standard/27001> (returns HTTP 403 to automated fetch; a paywalled purchase page — consistent with copyrighted/for-sale status)
- **What the licence does NOT grant (quoted from ISO T&Cs, via ISO's official terms):** *"This Licence does not include rights of reproduction, distribution, adaptation, incorporation, digital integration, or creation of derivative works of the ISO Publication, in whole or in part."* For hard copy: *"photocopying or reproduction in any form is not permitted without prior written authorization from ISO."*
  - Source: <https://www.iso.org/terms-conditions-licence-agreement.html>
- **POCOSA (ISO's copyright policy):** Permits sharing within the standards-development process but does **not** permit posting standards on the internet for free public access. Reference: <https://www.iso.org/files/live/sites/isoorg/files/store/en/PUB100206.pdf> (title: "How to best use IEC and ISO standards"; direct fetch 403 — access via the ISO store page; UNVERIFIED verbatim quote, but the policy summary is corroborated across ISO's own pages).
- **What a derived crosswalk CAN legally reproduce:**
  - ISO control **identifiers / numbering** (e.g. `A.5.1`, `A.5.32`, `A.8.x`) — short factual references, not the protected creative text.
  - Your own paraphrase / description of the control's intent.
  - Mappings/relationships ("800-53 AC-2 ↔ ISO 27001 A.5.15"). Note: NIST itself publishes an OLIR crosswalk 800-53↔27001 (public-domain mapping metadata), linked from the 800-53 page above — that mapping *table structure and NIST's descriptions* are usable, but it does not license ISO's own text.
- **What it CANNOT reproduce:** ISO's verbatim Annex A control **titles and control text**, the Annex A table reproduced wholesale, or any substantial derivative of the standard's text — not without an ISO licence / written permission.
- **Verdict:** ISO 27001 cannot be "de-licensed." Build the crosswalk on public-domain identifiers + original paraphrase + NIST's own mapping metadata; treat ISO verbatim text as off-limits.

---

## Licensing table per standard

| Standard | Copyright / status | Redistributable? | Official machine-readable format & location | Parse difficulty |
|---|---|---|---|---|
| **NIST SP 800-53 Rev 5** (+ 800-53B baselines) | U.S. Gov public domain; repo dedicated **CC0 1.0** | **Yes — fully** | OSCAL **JSON/XML/YAML** — `usnistgov/oscal-content` (GitHub) | **Trivial** (structured official data) |
| **NIST CSF 2.0** | U.S. Gov public domain | **Yes — fully** | CPRT **JSON + Excel** — csrc.nist.gov CPRT | Easy (structured official data) |
| **ISO/IEC 27001:2022** (Annex A) | **ISO/IEC copyright; paid; all rights reserved** | **No** — verbatim text off-limits | None free; paid PDF from ISO store | High legal risk / mostly out of bounds |

---

## Feasibility verdict

- **Overall: FEASIBLE, with one hard boundary.** Building a de-licensed, redistributable control baseline is straightforward for the NIST sources and effectively impossible (legally) for ISO's verbatim text.
- **Recommended first parse target: NIST SP 800-53 Rev 5 via the OSCAL JSON catalog in `usnistgov/oscal-content`.** It is public domain / CC0, already structured (no scraping/OCR), includes the 800-53B low/moderate/high baselines, and carries zero licensing risk. This becomes the canonical spine of the baseline.
- **Second: NIST CSF 2.0** via CPRT JSON — same legal safety, adds the higher-level function/category framing that maps well onto 800-53.
- **ISO 27001:2022: do NOT parse the standard text.** Instead build a crosswalk keyed on ISO control identifiers, paraphrased intent, and NIST's public-domain OLIR 800-53↔27001 mapping. Reproducing ISO's Annex A text requires a paid licence / written ISO permission and should be excluded from any redistributable artifact.

---

## Open questions / UNVERIFIED items

- **UNVERIFIED (verbatim):** The exact POCOSA wording on permissible short quotations "for review/study/comment" — the PUB100206 PDF and the ISO 27001 store page both returned HTTP 403 to automated fetch. Policy summary corroborated across ISO's terms page and secondary sources, but the precise fair-use-style allowance should be confirmed by a human reading the ISO PDF or consulting legal counsel before relying on any quotation.
- **Open:** How much of a "crosswalk" (identifiers + paraphrase) is safe before it becomes a "derivative work" of ISO 27001 — a legal judgment call; recommend counsel review if the crosswalk is redistributed commercially.
- **Open:** Confirm the CSF 2.0 CPRT JSON schema/stability for automated parsing (endpoint returns a live download; schema not yet inspected in detail).
- **Open:** Whether NIST's OLIR 800-53↔27001 crosswalk itself reproduces any ISO text (it is NIST-authored mapping metadata; assumed safe, not exhaustively verified line-by-line).
