// fetch-pdf-core.mjs — pure logic for the /harness:fetch-pdf skill.
//
// This module has NO network and NO I/O: it only turns a (DOI-or-URL, title,
// ...) input into (a) the URL to download from, (b) the artefact filename, and
// (c) the sidecar **source-note** file (source-note.md template shape) that
// cites the frozen artifact. The side-effecting parts — the actual binary
// download and the file writes — live in ../fetch-pdf.mjs. Keeping this seam
// pure is what makes the DOI resolution, slug, and frontmatter unit-testable.

// Slug: mirrors ingest-core/promote-core/fetch-url-core.slugify so a DOI/URL/
// title becomes a filesystem-safe, stable identifier.
export function slugify(s) {
  return (
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "untitled"
  );
}

// YAML-safe scalar (quote + escape) so titles/URLs/DOIs with colons, quotes, or
// backslashes can never break the frontmatter block. Matches fetch-url-core.
function yamlStr(value) {
  return JSON.stringify(String(value ?? ""));
}

// Recognise a bare DOI (with or without a doi: prefix). DOIs are "10.<registrant>/<suffix>".
// The suffix is intentionally permissive (any non-space run) — DOIs allow a wide
// character set, and we only need enough to distinguish a DOI from a full URL.
const DOI_RE = /^(?:doi:)?(10\.\d{4,9}\/\S+)$/i;

// Pull a bare DOI out of an input, whether it arrived as `10.x/y`, `doi:10.x/y`,
// or a `https://doi.org/10.x/y` URL. Returns the normalised bare DOI or null.
export function extractDoi(input) {
  const s = String(input ?? "").trim();
  const bare = DOI_RE.exec(s);
  if (bare) return bare[1];
  try {
    const u = new URL(s);
    if (/(^|\.)doi\.org$/i.test(u.hostname)) {
      const path = decodeURIComponent(u.pathname.replace(/^\/+/, ""));
      const m = DOI_RE.exec(path);
      if (m) return m[1];
    }
  } catch {
    /* not a URL */
  }
  return null;
}

// Resolve a DOI-or-URL input to the URL to download from. A DOI (bare, doi:, or
// a doi.org URL) resolves to https://doi.org/<doi> (the registered resolver,
// which redirects to the publisher's PDF/landing page); a plain http(s) URL is
// returned verbatim. Throws on anything that is neither — the CLI turns that into
// a usage error rather than downloading garbage.
export function resolvePdfUrl(input) {
  const s = String(input ?? "").trim();
  if (!s) throw new Error("A DOI or PDF URL is required.");
  const doi = extractDoi(s);
  if (doi) return `https://doi.org/${doi}`;
  try {
    const u = new URL(s);
    if (u.protocol === "http:" || u.protocol === "https:") return u.href;
  } catch {
    /* fall through to throw */
  }
  throw new Error(`Not a DOI or http(s) URL: ${s}`);
}

// A stable slug for the artefact, in priority order: an explicit title, then a
// DOI (if the input is one), then the URL host+path. Never throws.
export function deriveSlug({ title, input, url } = {}) {
  if (title && String(title).trim()) return slugify(title);
  const doi = extractDoi(input ?? url);
  if (doi) return slugify(doi);
  try {
    const u = new URL(String(url ?? input));
    const path = u.pathname.replace(/\.pdf$/i, "").replace(/\/+$/g, "");
    return slugify(`${u.host}${path}`);
  } catch {
    return slugify(input ?? url);
  }
}

// The artefact (binary) filename: `<slug>.pdf`. This is the frozen original.
export function artifactFilename({ title, input, url } = {}) {
  return `${deriveSlug({ title, input, url })}.pdf`;
}

// The sidecar-note filename: `<slug>.md`, a sibling of the artefact. Both share
// the slug so the pair is obviously related on disk.
export function sidecarFilename({ title, input, url } = {}) {
  return `${deriveSlug({ title, input, url })}.md`;
}

// Build the sidecar **source-note** that cites the frozen artifact. Shape is
// templates/source-note.md plus two capture-provenance fields: type source,
// frozen true, an `artifact:` path (vault-relative, e.g. artefacts/<slug>.pdf),
// provenance = the citeable identity (DOI if we have one, else the URL); the two
// added fields `source-url` = the exact URL fetched and `captured` = the date
// (a capture date, not authored `created`); optional topic, tags (source always
// present + deduped), and `related`/`next`/`status` carried from the template.
// The body points a reader at the immutable original.
export function buildSidecarNote({
  title,
  input,
  url,
  artifactPath,
  captured,
  topic,
  tags,
} = {}) {
  const resolvedTitle =
    title && String(title).trim() ? String(title).trim() : deriveSlug({ title, input, url });
  // provenance is the citeable identity: the DOI (canonical) if we have one,
  // else the source URL. source-url is always the real URL we fetched.
  const doi = extractDoi(input ?? url);
  const provenance = doi ? `https://doi.org/${doi}` : String(url ?? input ?? "");
  const sourceUrl = String(url ?? (doi ? `https://doi.org/${doi}` : input) ?? "");

  const tagList = ["source", ...(Array.isArray(tags) ? tags : [])]
    .map((t) => String(t).trim())
    .filter(Boolean);
  const dedupedTags = [...new Set(tagList)];

  const frontmatter = [
    "---",
    `type: ${yamlStr("source")}`,
    `title: ${yamlStr(resolvedTitle)}`,
    "frozen: true",
    `artifact: ${yamlStr(artifactPath)}`,
    `provenance: ${yamlStr(provenance)}`,
    `source-url: ${yamlStr(sourceUrl)}`,
    `captured: ${yamlStr(captured)}`,
    `topic: ${topic && String(topic).trim() ? yamlStr(topic) : ""}`,
    `tags: [${dedupedTags.map(yamlStr).join(", ")}]`,
    "related: []",
    "next:",
    "status: active",
    "---",
    "",
  ].join("\n");

  const body = [
    `# ${resolvedTitle}`,
    "",
    `> Sidecar note for a frozen artifact. The original PDF lives at \`${artifactPath}\` and is immutable.`,
    "",
    "## Summary",
    "",
    "## Sources",
    "",
    `- ${provenance}`,
    "",
  ].join("\n");

  return `${frontmatter}${body}`;
}
