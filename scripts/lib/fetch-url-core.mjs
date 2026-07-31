// fetch-url-core.mjs — pure logic for the /harness:fetch-url skill.
//
// The *fetch and HTML→markdown conversion* is done by the calling agent (its
// own web-fetch), so this module deliberately has NO network and NO I/O: it
// only turns an already-fetched (url, title, markdown) triple into a clean
// Inbox **source** file (light frontmatter + normalised body). Keeping this
// seam pure is what makes it unit-testable — the side-effecting CLI that writes
// the file lives in ../fetch-url.mjs.

// Slug for the Inbox filename: mirrors ingest-core/promote-core.slugify so a
// title (or URL fallback) becomes a filesystem-safe, stable identifier.
export function slugify(s) {
  return (
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "untitled"
  );
}

// YAML-safe scalar (quote + escape) so titles/URLs with colons, quotes, or
// backslashes can never break the frontmatter block. Matches promote-core.
function yamlStr(value) {
  return JSON.stringify(String(value ?? ""));
}

// A human-meaningful title, in priority order: an explicit title, then the
// first markdown H1, then a compact host+path rendering of the URL. Never
// throws — an empty/garbage URL still yields "untitled" downstream via slugify.
export function deriveTitle({ title, md, url } = {}) {
  if (title && String(title).trim()) return String(title).trim();
  const h1 = /^#[ \t]+(.+?)[ \t]*$/m.exec(String(md ?? ""));
  if (h1) return h1[1].trim();
  try {
    const u = new URL(String(url));
    const path = u.pathname.replace(/\/+$/g, "");
    return `${u.host}${path}`;
  } catch {
    return String(url ?? "").trim() || "untitled";
  }
}

// Normalise converted markdown: strip CRs, trim trailing per-line whitespace,
// collapse 3+ blank lines to a single blank, and end with exactly one newline.
// Cheap hygiene so the Inbox source reads cleanly regardless of the converter.
export function normalizeMarkdown(md) {
  return (
    String(md ?? "")
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/^\n+/, "")
      .replace(/\n+$/, "") + "\n"
  );
}

// Build the full Inbox source file: a light frontmatter block
// (type/title/source-url/captured/tags) followed by the H1 and the normalised
// body. The `source` tag is always present (and deduped) so these captures are
// trivially filterable. An H1 is injected when the body has none, so every
// source is a well-formed record-shaped file ready for /harness:ingest.
export function buildSourceFile({ url, title, md, captured, tags } = {}) {
  const resolvedTitle = deriveTitle({ title, md, url });
  const tagList = ["source", ...(Array.isArray(tags) ? tags : [])]
    .map((t) => String(t).trim())
    .filter(Boolean);
  const dedupedTags = [...new Set(tagList)];

  const frontmatter = [
    "---",
    `type: ${yamlStr("source")}`,
    `title: ${yamlStr(resolvedTitle)}`,
    `source-url: ${yamlStr(url)}`,
    `captured: ${yamlStr(captured)}`,
    `tags: [${dedupedTags.map(yamlStr).join(", ")}]`,
    "---",
    "",
  ].join("\n");

  let body = normalizeMarkdown(md);
  // Inject an H1 when the body lacks one, so the source has a visible title.
  if (!/^#[ \t]+/m.test(body)) {
    body = `# ${resolvedTitle}\n\n${body}`;
  }

  return `${frontmatter}${body}`;
}

// The Inbox filename for a capture: slugified title/URL fallback, `.md`.
export function inboxFilename({ title, md, url } = {}) {
  return `${slugify(deriveTitle({ title, md, url }))}.md`;
}
