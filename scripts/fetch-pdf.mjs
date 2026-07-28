#!/usr/bin/env node
// fetch-pdf.mjs — download a cited PDF (from a DOI or PDF URL) into the vault's
// artefacts/ as a frozen **Artifact**, and write a source-note sidecar that cites
// it — so it composes with /substrate:ingest and /substrate:promote (the
// "Artifact + provenance" destination).
//
//   node scripts/fetch-pdf.mjs --doi 10.1234/abc [options]
//   node scripts/fetch-pdf.mjs --url https://.../paper.pdf [options]
//
// Unlike /substrate:fetch-url (where the agent converts HTML→markdown), a PDF is
// an opaque binary the agent cannot faithfully render — so the download happens
// *here*, with Node's built-in fetch (no dependency), writing the raw bytes. The
// deterministic tail (DOI→URL resolution, slug, sidecar frontmatter) lives in
// ./lib/fetch-pdf-core.mjs (see fetch-pdf-core.test.mjs).
//
// Options:
//   --doi <doi>        a DOI (bare, doi:, or doi.org URL); resolves via doi.org.
//   --url <url>        a direct PDF URL. Exactly one of --doi/--url is required.
//   --title "..."      title for the sidecar + slug (else derived from DOI/URL).
//   --topic <topic>    optional topic for the sidecar frontmatter.
//   --tags a,b,c       extra tags (the `source` tag is always added).
//   --vault <path>     vault root (default: VAULT_ROOT env, else cwd).
import { writeFileSync, existsSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import {
  resolvePdfUrl,
  artifactFilename,
  sidecarFilename,
  buildSidecarNote,
} from "./lib/fetch-pdf-core.mjs";

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const takeValue = (flag) => {
    const i = args.indexOf(flag);
    if (i === -1) return null;
    const v = args[i + 1];
    args.splice(i, 2);
    return v ?? null;
  };
  return {
    doi: takeValue("--doi"),
    url: takeValue("--url"),
    title: takeValue("--title"),
    topic: takeValue("--topic"),
    tags: takeValue("--tags"),
    vault: takeValue("--vault"),
  };
}

// Never clobber: if <slug>.<ext> is taken, append -2, -3, ... (same base for the
// pair so they stay siblings).
function uniqueBase(dir, base) {
  let candidate = base;
  let n = 2;
  while (existsSync(join(dir, `${candidate}.pdf`)) || existsSync(join(dir, `${candidate}.md`))) {
    candidate = `${base}-${n++}`;
  }
  return candidate;
}

function nowIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if ((!opts.doi && !opts.url) || (opts.doi && opts.url)) {
    fail(
      'Usage: node scripts/fetch-pdf.mjs (--doi <doi> | --url <pdf-url>) [--title "..."] [--topic <t>] [--tags a,b] [--vault <path>]',
    );
  }

  const input = opts.doi ?? opts.url;
  let downloadUrl;
  try {
    downloadUrl = resolvePdfUrl(input);
  } catch (e) {
    fail(String(e.message ?? e));
  }

  const vaultRoot = resolve(opts.vault ?? process.env.VAULT_ROOT ?? process.cwd());
  const artefactsDir = join(vaultRoot, "artefacts");
  if (!existsSync(artefactsDir)) {
    fail(`No artefacts/ at ${vaultRoot}. Point --vault at a scaffolded vault (or run from its root).`);
  }

  const tags = opts.tags
    ? opts.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const slugArgs = { title: opts.title, input: opts.doi, url: opts.url };
  const base = uniqueBase(
    artefactsDir,
    artifactFilename(slugArgs).replace(/\.pdf$/i, ""),
  );
  const pdfPath = join(artefactsDir, `${base}.pdf`);
  const notePath = join(artefactsDir, `${base}.md`);

  // Traversal guard: the slug is sanitised, but assert both resolved paths stay
  // inside artefacts/ before writing — no capture can escape the vault.
  const prefix = artefactsDir.endsWith(sep) ? artefactsDir : artefactsDir + sep;
  for (const p of [pdfPath, notePath]) {
    if (!p.startsWith(prefix)) fail(`Refusing to write outside artefacts/: ${p}`);
  }

  // Download the PDF bytes with the built-in fetch (follows redirects — doi.org
  // redirects to the publisher). No dependency, no shell.
  let bytes;
  try {
    const res = await fetch(downloadUrl, {
      redirect: "follow",
      headers: { Accept: "application/pdf,*/*", "User-Agent": "substrate-fetch-pdf" },
    });
    if (!res.ok) fail(`Download failed: HTTP ${res.status} ${res.statusText} for ${downloadUrl}`);
    const ct = res.headers.get("content-type") || "";
    bytes = Buffer.from(await res.arrayBuffer());
    // Best-effort sanity check: warn (don't fail) if it doesn't look like a PDF —
    // a DOI may resolve to an HTML landing page rather than a direct PDF.
    const looksPdf = ct.includes("pdf") || bytes.slice(0, 5).toString("latin1") === "%PDF-";
    if (!looksPdf) {
      console.error(
        `Warning: response from ${res.url || downloadUrl} is not a PDF (content-type: ${ct || "unknown"}). ` +
          "A DOI often resolves to a landing page — pass the direct PDF --url instead.",
      );
    }
  } catch (e) {
    fail(`Download error for ${downloadUrl}: ${String(e.message ?? e)}`);
  }

  const artifactRel = `artefacts/${base}.pdf`;
  const note = buildSidecarNote({
    title: opts.title,
    input: opts.doi,
    url: opts.url,
    artifactPath: artifactRel,
    captured: nowIsoDate(),
    topic: opts.topic,
    tags,
  });

  writeFileSync(pdfPath, bytes);
  writeFileSync(notePath, note, "utf8");
  console.log(`Wrote ${pdfPath} (${bytes.length} bytes)`);
  console.log(`Wrote ${notePath} (sidecar source-note citing ${artifactRel})`);
}

// Run main() only when invoked as a script, not when imported. Comparing file
// URLs (not raw paths) is robust across Windows drive-letter/slash quirks.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => fail(String(e?.stack ?? e)));
}
