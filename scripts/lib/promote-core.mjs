// Pure, side-effect-free core for promotion (TASK-50): turn a *triaged*
// Companion Document into typed vault records, artefact citations, and queued
// action annotations. Kept separate from promote.mjs so parsing, path
// derivation, and template-fill are unit-testable without a filesystem, git,
// or a real vault.
//
// See .agents/skills/harness-ingest/SKILL.md for the Companion Document
// format and docs/adr/0004 + 0006 + vault-template/templates/* for the record
// model this fills.

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

// Slug for folder/file names: mirrors ingest-core.slugify so a topic hint and
// a record title become filesystem-safe, stable identifiers.
export function slugify(s) {
  return (
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "untitled"
  );
}

// YAML-safe scalar (quote + escape) so titles/paths with colons, quotes, or
// backslashes can never break the frontmatter block. Matches ingest-core.
function yamlStr(value) {
  return JSON.stringify(String(value ?? ""));
}

// The canonical record types (vault-template/templates/*, ADR-0004 + 0006).
export const RECORD_TYPES = new Set([
  "idea", "research", "concept", "prd", "reference", "adr",
]);

// The `next` skill each record type recommends, mirrored from the templates so
// a promoted record is actionable out of the gate. A `pre-skill:` tag on the
// element overrides this (it is the human's per-element recommendation).
export const NEXT_BY_TYPE = {
  idea: "/grill",
  research: "/grill-with-docs",
  concept: "/to-spec",
  prd: "/to-tickets",
  reference: "",
  adr: "",
};

// The per-type section skeleton between Summary and Sources (from the
// templates). Every record is Summary-first, Sources-last.
export const SECTIONS_BY_TYPE = {
  idea: [],
  research: ["Observation", "Inference", "Recommendation"],
  concept: ["Option", "Trade-offs"],
  prd: ["What & why", "Acceptance criteria"],
  reference: ["Details"],
  adr: ["Decision", "Rationale", "Consequence"],
};

// ---------------------------------------------------------------------------
// Parsing the Companion Document
// ---------------------------------------------------------------------------

// One tagged element pulled from a Companion Document body section.
//   heading      the `## <section>` it lived under (e.g. "Decisions")
//   description  the one-line description after **[Element]**
//   source       the source: tag value (e.g. "session.jsonl")
//   topic        the topic: tag value (soft hint; may be null)
//   promote      { kind: "record"|"artifact"|"action", recordType?: string }
//   preSkill     the pre-skill: tag value (may be null)
//   body         the prose beneath the element (until the next element/heading)

// Parse the `_key:_ value · _key:_ value` metadata line into a map. Tolerates
// both the `_source:_` markdown-emphasis form and a plain `source:` form, and
// either `·` or `,`/`/` separators (the CLI-gotcha-safe alternatives).
export function parseTagLine(line) {
  const out = {};
  // Strip a leading blockquote marker and surrounding whitespace.
  const cleaned = String(line).replace(/^\s*>?\s*/, "").trim();
  // Split on the middot separator (the documented form); fall back to nothing
  // else so a stray comma inside a value survives.
  const parts = cleaned.split("·");
  for (const part of parts) {
    // key may be wrapped in underscores/asterisks: _source:_ or **source:**
    const m = part.match(/^\s*[_*]*\s*([a-z-]+)\s*:\s*[_*]*\s*(.+?)\s*$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    // strip surrounding backticks/emphasis from the value
    const value = m[2].replace(/^[`*_]+|[`*_]+$/g, "").trim();
    out[key] = value;
  }
  return out;
}

// Classify a `promote:` tag value into a destination.
//   "Record (concept)" -> { kind: "record", recordType: "concept" }
//   "Artifact + provenance" / "Artifact" -> { kind: "artifact" }
//   "Action annotation" / "Action" -> { kind: "action" }
// Unknown/malformed -> { kind: "unknown", raw }
export function classifyPromote(raw) {
  const v = String(raw ?? "").trim();
  const lower = v.toLowerCase();
  if (lower.startsWith("record")) {
    const m = v.match(/\(([^)]+)\)/);
    const recordType = m ? m[1].trim().toLowerCase() : null;
    if (recordType && RECORD_TYPES.has(recordType)) {
      return { kind: "record", recordType };
    }
    return { kind: "unknown", raw: v, reason: `unknown record type: ${recordType ?? "(none)"}` };
  }
  if (lower.startsWith("artifact")) return { kind: "artifact" };
  if (lower.startsWith("action")) return { kind: "action" };
  return { kind: "unknown", raw: v, reason: "unrecognised promote target" };
}

// Split a Companion Document into { summary, elements, sourcesLines }.
// An element begins on a line matching `**[Element]** <description>` (with an
// optional leading blockquote `>`); its very next non-empty line is the tag
// line; everything after, until the next element or `## ` heading, is its body.
export function parseCompanionDocument(text) {
  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  const elements = [];
  const sourcesLines = [];
  let summary = "";
  let currentHeading = null;
  let inSources = false;
  let summaryLines = [];
  let inSummary = false;

  const elementRe = /^\s*>?\s*\*\*\[Element\]\*\*\s*(.*)$/;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const headingMatch = line.match(/^##\s+(.*)$/);
    if (headingMatch) {
      const h = headingMatch[1].trim();
      inSummary = /^summary$/i.test(h);
      inSources = /^sources$/i.test(h);
      currentHeading = h;
      if (inSummary) summaryLines = [];
      i++;
      continue;
    }
    if (inSummary) {
      summaryLines.push(line);
      i++;
      continue;
    }
    if (inSources) {
      if (line.trim()) sourcesLines.push(line);
      i++;
      continue;
    }
    const elMatch = line.match(elementRe);
    if (elMatch) {
      const description = elMatch[1].trim();
      // The tag line is the next non-empty line.
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      const tags = j < lines.length ? parseTagLine(lines[j]) : {};
      // Body: everything after the tag line until the next element or heading.
      const bodyLines = [];
      let k = j + 1;
      while (k < lines.length) {
        if (elementRe.test(lines[k]) || /^##\s+/.test(lines[k])) break;
        bodyLines.push(lines[k]);
        k++;
      }
      elements.push({
        heading: currentHeading,
        description,
        source: tags.source ?? null,
        topic: tags.topic ?? null,
        promote: classifyPromote(tags.promote),
        preSkill: tags["pre-skill"] ?? tags.preskill ?? null,
        body: bodyLines.join("\n").trim(),
      });
      i = k;
      continue;
    }
    i++;
  }
  summary = summaryLines.join("\n").trim();
  return { summary, elements, sources: sourcesLines };
}

// ---------------------------------------------------------------------------
// Path derivation
// ---------------------------------------------------------------------------

// Derive the vault-relative folder a record lands in from its topic tag. The
// topic is a *soft hint* (SKILL.md, CONTEXT.md): we slugify it into
// `topics/<slug>/`. When absent we fall back to `topics/inbox/` so a record is
// never dropped on the floor — it lands in a clearly-triageable place instead.
export function topicFolder(topic) {
  const slug = topic && topic.trim() ? slugify(topic) : "inbox";
  return `topics/${slug}`;
}

// ---------------------------------------------------------------------------
// Enumerable-section splitting (the linkability test)
// ---------------------------------------------------------------------------

// If an element's body is an enumerable list (top-level `- ` / `1. ` items),
// each item is a candidate for its own record (the linkability test: "will you
// link to this?"). Returns an array of { title, body }. A non-list body
// returns a single item carrying the element description as title.
export function splitEnumerable(description, body) {
  const lines = String(body).split("\n");
  const items = [];
  let current = null;
  const itemRe = /^\s*(?:[-*+]|\d+[.)])\s+(.*)$/;
  let sawList = false;
  for (const line of lines) {
    const m = line.match(itemRe);
    if (m && !/^\s{2,}/.test(line)) {
      // Top-level list item -> new record candidate.
      sawList = true;
      if (current) items.push(current);
      current = { title: stripFormatting(m[1]).trim(), body: "" };
    } else if (current) {
      // Continuation lines fold into the current item's body.
      current.body += (current.body ? "\n" : "") + line;
    }
  }
  if (current) items.push(current);
  if (!sawList || items.length === 0) {
    return [{ title: description, body: String(body).trim() }];
  }
  return items.map((it) => ({ title: it.title, body: it.body.trim() }));
}

// Strip leading markdown emphasis/link syntax from a derived title so a list
// item like "**Freeze the transcript** — because ..." yields a clean title.
function stripFormatting(s) {
  return String(s)
    .replace(/\*\*|__|`/g, "")
    // Cut a title at the first em-dash/colon delimiter (keep the lead phrase).
    .split(/\s+[—–-]\s+|:\s+/)[0]
    .trim();
}

// ---------------------------------------------------------------------------
// Template fill
// ---------------------------------------------------------------------------

// Build a full record markdown string for one record.
//   type       one of RECORD_TYPES
//   title      record title (H1 + frontmatter title)
//   topic      topic tag value (soft hint; stored raw in frontmatter)
//   created    ISO date (YYYY-MM-DD)
//   source     a vault wikilink/path citing the Companion/transcript
//   summary    body for the ## Summary section
//   next       optional override for the `next` skill (else NEXT_BY_TYPE)
//   sources    array of source citation lines for ## Sources
export function buildRecord({
  type, title, topic, created, source, summary = "", next = null, sources = [],
}) {
  if (!RECORD_TYPES.has(type)) throw new Error(`Unknown record type: ${type}`);
  const nextSkill = next != null && next !== "" ? next : NEXT_BY_TYPE[type];
  const fm = [
    "---",
    `type: ${type}`,
    `title: ${yamlStr(title)}`,
    `created: ${created}`,
    "updated:",
    `topic: ${yamlStr(topic ?? "")}`,
    `tags: [${type}]`,
    `source: ${yamlStr(source ?? "")}`,
    "related: []",
    `next: ${nextSkill}`,
    "status: active",
    "---",
  ];
  const parts = [fm.join("\n"), `# ${title}`, "", "## Summary", ""];
  if (summary.trim()) parts.push(summary.trim(), "");
  for (const section of SECTIONS_BY_TYPE[type]) {
    parts.push(`## ${section}`, "");
  }
  parts.push("## Sources", "");
  for (const s of sources) parts.push(`- ${s}`);
  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

// ---------------------------------------------------------------------------
// Action annotations -> backlog todo
// ---------------------------------------------------------------------------

// Assemble the argv (no shell) for creating an `ingest-ready` backlog todo from
// an Action-annotation element. The `|` pipe breaks the npm .cmd shim, so any
// pipe in the description is replaced with "/" (the documented CLI gotcha).
export function backlogTodoArgv(element, { sessionName } = {}) {
  const title = String(element.description || "Ingest action").replace(/\|/g, "/").trim();
  const descParts = [];
  if (element.body) descParts.push(element.body);
  if (sessionName) descParts.push(`From ingest session: ${sessionName}.`);
  if (element.preSkill) descParts.push(`Recommended pre-skill: ${element.preSkill}.`);
  const desc = descParts.join(" ").replace(/\|/g, "/").trim();
  const argv = ["backlog", "task", "create", title, "--labels", "ingest-ready"];
  if (desc) argv.push("--description", desc);
  return argv;
}
