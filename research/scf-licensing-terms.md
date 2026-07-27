# SCF Licensing Terms — Research (TASK-1.5)

**Date:** 2026-07-27
**Question owner context:** An existing proprietary control framework ("NCF", ~1,175 controls) was DERIVED from the Secure Controls Framework (SCF). The owner wants to know what in the SCF license would force a "de-license" — i.e. rebuilding NCF from parsing source standards (NIST, ISO, etc.) instead of from the SCF.

---

## Question

What are the exact licensing terms of the SCF, what do they permit/require/restrict for commercial derivative work, and is there any clause that genuinely forces rebuilding an independent framework from source standards?

---

## License Identification

- **License:** Creative Commons Attribution-NoDerivatives 4.0 International Public License
- **Short code:** CC BY-ND 4.0
- **Governed by:** SCF End User License Agreement (EULA) referencing the CC BY-ND 4.0 Public License, plus separate paid Commercial License tiers.
- **Primary sources:**
  - SCF Terms and Conditions — https://securecontrolsframework.com/terms-and-conditions
  - SCF Commercial License — https://securecontrolsframework.com/commercial-license
  - SCF FAQ — https://securecontrolsframework.com/faq
  - CC BY-ND 4.0 legal code (base license) — https://creativecommons.org/licenses/by-nd/4.0/legalcode.en

**IMPORTANT — NOT NonCommercial.** Early web-snippet noise suggested CC BY-**NC**-ND (NonCommercial). This is INCORRECT. The primary SCF Terms page and Commercial License page both identify the license as CC BY-**ND** 4.0 (no "NC"). This distinction matters a lot: CC BY-ND 4.0 **does permit commercial use** of the material; the restriction is on **derivatives**, not on commerce. (Source: securecontrolsframework.com/terms-and-conditions; securecontrolsframework.com/commercial-license)

---

## What the License PERMITS (free / no-cost tier)

Per the CC BY-ND 4.0 grant, Section 2(a)(1), as applied by SCF:

- **Reproduce and Share the Licensed Material, in whole or in part** — you can copy and distribute the SCF as-is. (https://creativecommons.org/licenses/by-nd/4.0/legalcode.en)
- **Commercial use is allowed** for the unmodified material — the base CC BY-ND 4.0 grant is worldwide and royalty-free with no NonCommercial restriction. (https://creativecommons.org/licenses/by-nd/4.0/legalcode.en)
- **Produce and reproduce (but NOT Share) Adapted Material** — i.e. you may modify/adapt SCF content **for your own internal use**, but may not distribute the modified version. (https://creativecommons.org/licenses/by-nd/4.0/legalcode.en; https://securecontrolsframework.com/terms-and-conditions)

---

## What the License REQUIRES / RESTRICTS

### Requires (Attribution)
- Give appropriate credit, provide a link to the license, and indicate if changes were made; retain creator/copyright/license notices. Must not imply endorsement by the licensor. (https://securecontrolsframework.com/terms-and-conditions; https://creativecommons.org/licenses/by-nd/4.0/legalcode.en)

### Restricts (NoDerivatives — the load-bearing clause)
- **"You do not have permission under this Public License to Share Adapted Material."** Modification for internal use is fine; **distributing** the modified/derived version is prohibited. (https://creativecommons.org/licenses/by-nd/4.0/legalcode.en)
- **"Adapted Material"** = material "derived from or based upon the Licensed Material" in which it is "translated, altered, arranged, transformed, or otherwise modified." (https://creativecommons.org/licenses/by-nd/4.0/legalcode.en)
- **"Share"** = "provide material to the public by any means or process that requires permission under the Licensed Rights." (https://creativecommons.org/licenses/by-nd/4.0/legalcode.en)
- **AI-generation prohibition (SCF-specific):** "This prohibition on creating derivative works includes utilizing Artificial Intelligence (AI) (or similar technologies) to leverage SCF content to generate policies, standards, procedures, metrics, risks, threats or other derivative content." (https://securecontrolsframework.com/terms-and-conditions)
- **Commercial license required to distribute derivatives:** "An organization needs to purchase a commercial license to offer derivative SCF content." (https://securecontrolsframework.com/terms-and-conditions)

### Commercial License tiers (paid path to distribute derivatives)
- Licensed Content Providers (LCPs) buy a commercial license to legally share/sell SCF-derived content.
- Tier structure exists (Tier 1 / Tier 2). Tier 2 reportedly carries a marketplace-sales restriction: *"Tier 2 SCF Commercial Licenses are prohibited from selling SCF-based content ... in any form of online storefront or marketplace."* (https://securecontrolsframework.com/commercial-license)
- **UNVERIFIED:** Specific dollar figures ($25k–$200k+ annually) and exact per-tier allowances surfaced via a summarization of the commercial-license page but were not quoted verbatim from the source. Treat pricing/tier detail as indicative only; confirm directly with SCF before relying on it.

---

## Commercial-Use Verdict (the consultancy question)

**Selling unmodified SCF copies with attribution:** PERMITTED under the free CC BY-ND 4.0 license (commercial use is allowed; it is not a NonCommercial license).

**Building and SELLING client deliverables (tailored policy docs, standards, crosswalks) that are DERIVED from / based upon the SCF:** NOT permitted under the free license. Delivering customized SCF-derived content to a client constitutes **Sharing Adapted Material**, which CC BY-ND 4.0 forbids. Per SCF: *"An organization needs to purchase a commercial license to offer derivative SCF content."* A consultancy doing this at scale needs an SCF Commercial License (LCP status). (https://securecontrolsframework.com/terms-and-conditions; https://creativecommons.org/licenses/by-nd/4.0/legalcode.en)

Note the internal/external line: adapting the SCF **for the licensee's own internal use** is allowed for free; the moment the adapted output is handed to a third party (client), it is "Sharing" and requires the commercial license.

---

## Why-De-License Analysis (does anything FORCE rebuilding NCF from source standards?)

The trigger is the **NoDerivatives** term, not a NonCommercial term. NCF (~1,175 controls) is by description a **derivative** of the SCF — it is "based upon / derived from" SCF material. That means:

1. **Distributing or selling NCF as an SCF-derived product is not permitted under the free license.** Any external distribution of NCF-as-derivative requires either (a) an SCF Commercial License, or (b) that NCF no longer be a derivative of the SCF.

2. **A commercial license is a valid alternative to de-licensing** — the owner does NOT strictly have to rebuild. Buying an SCF Commercial License / LCP status legitimizes selling SCF-derived deliverables. The choice is: pay ongoing commercial-license fees + accept SCF branding/attribution + tier restrictions (e.g. Tier 2 marketplace ban), OR de-license.

3. **What genuinely motivates de-licensing (rebuild from source standards):**
   - **Independence from SCF's derivative restriction and ongoing fees** — a framework parsed directly from primary standards (NIST 800-53, ISO 27001/27002, etc.) is NOT "derived from the Licensed Material" and therefore falls entirely outside CC BY-ND 4.0. No commercial license, no attribution-to-SCF, no tier caps, no marketplace ban.
   - **The AI clause** — if NCF was (or will be) generated/expanded using AI over SCF content, that is explicitly prohibited even beyond ordinary derivation. A clean-room rebuild from source standards removes this exposure.
   - **Freedom to sell/modify without SCF constraints** — mapping crosswalks and selling policy deliverables freely requires either the commercial license or a genuinely independent source.

**Caveat / clean-room requirement (UNVERIFIED legal point, flagged):** Rebuilding "from source standards" only escapes the SCF license if the new framework is genuinely independent of SCF expression — i.e. NOT copied-then-reworded from SCF. Control *facts* and the underlying public standards are not SCF's IP, but SCF's specific control **expression, structure, catalog numbering and mappings** are copyrightable. A true de-license means clean-room reconstruction from the primary standards, not paraphrasing SCF. This is a legal-counsel question, not resolved by the license text alone.

---

## Bottom Line

- License = **CC BY-ND 4.0** (Attribution-NoDerivatives, **commercial use allowed**, derivatives-sharing prohibited) + paid Commercial License tiers for distributing derivatives.
- Nothing forces de-licensing outright — **buying an SCF Commercial License is a legitimate path** to sell SCF-derived deliverables.
- De-licensing (clean-room rebuild from source standards) is the route to **avoid the NoDerivatives restriction, the AI-generation prohibition, ongoing commercial-license fees, attribution obligations, and tier/marketplace caps** entirely — but it must be a genuine independent build, not a reworded SCF.
