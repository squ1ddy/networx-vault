// Pure, side-effect-free core for the ingest pipeline. Kept separate from
// ingest.mjs so routing, slugging, and frontmatter stamping are unit-testable
// without touching the filesystem, git, markitdown, or a real vault.

// Extensions we treat as already-text: land straight in the Inbox, stamped,
// no conversion and no frozen artifact (the markdown IS the content).
export const TEXT_EXTS = new Set([".md", ".markdown", ".txt"]);

// Extensions markitdown converts to markdown. The original is non-markdown
// evidence, so it is frozen into artefacts/ with a sidecar note.
export const CONVERT_EXTS = new Set([
  // documents
  ".pdf", ".docx", ".doc", ".rtf", ".odt", ".epub",
  // slides
  ".pptx", ".ppt", ".odp",
  // sheets
  ".xlsx", ".xls", ".ods", ".csv",
  // images
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tiff",
  // structured / web
  ".html", ".htm", ".json", ".xml", ".msg",
]);

// Decide how ingest should handle a file by its extension.
//   "text"    -> stamp + drop in Inbox, no artifact
//   "convert" -> markitdown -> Inbox, freeze original as artifact + sidecar
// Unknown extensions fall through to "convert": markitdown is tried and, if it
// yields nothing, the CLI surfaces the failure rather than guessing.
export function classify(ext) {
  const e = String(ext || "").toLowerCase();
  if (TEXT_EXTS.has(e)) return "text";
  if (CONVERT_EXTS.has(e)) return "convert";
  return "convert";
}

export function slugify(s) {
  return (
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "untitled"
  );
}

// YAML-safe scalar: quote and escape so titles/paths with colons, quotes, or
// backslashes (Windows paths) can never break the frontmatter block.
function yamlStr(value) {
  return JSON.stringify(String(value ?? ""));
}

// Light frontmatter for the Inbox note. The Inbox is QC-exempt raw capture, so
// this stays minimal: enough provenance to triage later, nothing more.
// `artifactRel` links to the frozen original (omitted for text passthrough).
export function inboxFrontmatter({ title, source, ingestedAt, artifactRel = null }) {
  const lines = [
    "---",
    "type: inbox",
    "status: captured",
    `ingested: ${yamlStr(ingestedAt)}`,
    `source: ${yamlStr(source)}`,
  ];
  if (artifactRel) lines.push(`artifact: ${yamlStr(artifactRel)}`);
  lines.push("tags: [inbox, ingested]", "---", "");
  return lines.join("\n");
}

// Sidecar note that travels with a frozen artifact (mirrors the vault's
// templates/source-note.md). The original lives at `artifact:` and is immutable.
export function sidecarNote({ title, artifactRel, provenance, ingestedAt }) {
  return [
    "---",
    "type: source",
    "frozen: true",
    `artifact: ${yamlStr(artifactRel)}`,
    `provenance: ${yamlStr(provenance)}`,
    `ingested: ${yamlStr(ingestedAt)}`,
    "tags: [source]",
    "---",
    `# ${title}`,
    "",
    "> Sidecar note for a frozen artifact. The original lives at `artifact:` and is immutable.",
    "",
  ].join("\n");
}

// Compose a full Inbox markdown document from stamped frontmatter + body,
// guaranteeing exactly one trailing newline.
export function inboxDocument(frontmatter, title, body) {
  const heading = `# ${title}\n\n`;
  return frontmatter + heading + String(body).trimEnd() + "\n";
}
