#!/usr/bin/env node
// fetch-url.mjs — write a fetched-and-converted web page into the vault Inbox
// as a light **source** record, so it composes with /harness:ingest.
//
//   node scripts/fetch-url.mjs --url <url> --md-file <converted.md> [options]
//   <converted markdown on stdin> | node scripts/fetch-url.mjs --url <url>
//
// The HTML→markdown conversion is done by the *calling agent* (its own
// web-fetch): this script is deliberately the dumb, deterministic tail —
// slug the filename, build light frontmatter (type/title/source-url/captured/
// tags), normalise the body, and drop it in Inbox/ without clobbering. All the
// testable logic lives in ./lib/fetch-url-core.mjs (see fetch-url-core.test.mjs).
//
// Options:
//   --url <url>        source URL (required; stored verbatim in source-url).
//   --md-file <path>   the converted markdown; omit to read markdown from stdin.
//   --title "..."      override the title (else first H1, else URL host+path).
//   --tags a,b,c       extra tags (the `source` tag is always added).
//   --vault <path>     vault root (default: VAULT_ROOT env, else cwd).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import {
  buildSourceFile,
  inboxFilename,
} from "./lib/fetch-url-core.mjs";

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
    url: takeValue("--url"),
    mdFile: takeValue("--md-file"),
    title: takeValue("--title"),
    tags: takeValue("--tags"),
    vault: takeValue("--vault"),
  };
}

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

// Never clobber an existing file: if <slug>.md is taken, append -2, -3, ...
function uniquePath(dir, name) {
  const base = name.replace(/\.md$/i, "");
  let candidate = join(dir, `${base}.md`);
  let n = 2;
  while (existsSync(candidate)) candidate = join(dir, `${base}-${n++}.md`);
  return candidate;
}

function nowIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.url) {
    fail(
      'Usage: node scripts/fetch-url.mjs --url <url> [--md-file <path>|stdin] [--title "..."] [--tags a,b] [--vault <path>]',
    );
  }

  const md = opts.mdFile ? readFileSync(resolve(opts.mdFile), "utf8") : readStdin();
  if (!md.trim()) {
    fail("No markdown provided. Pass --md-file <path> or pipe converted markdown on stdin.");
  }

  const vaultRoot = resolve(opts.vault ?? process.env.VAULT_ROOT ?? process.cwd());
  const inboxDir = join(vaultRoot, "Inbox");
  if (!existsSync(inboxDir)) {
    fail(`No Inbox/ at ${vaultRoot}. Point --vault at a scaffolded vault (or run from its root).`);
  }

  const tags = opts.tags
    ? opts.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const contents = buildSourceFile({
    url: opts.url,
    title: opts.title,
    md,
    captured: nowIsoDate(),
    tags,
  });

  const outPath = uniquePath(inboxDir, inboxFilename({ title: opts.title, md, url: opts.url }));

  // Traversal guard: the slug is sanitised, but assert the resolved path stays
  // inside Inbox/ before writing — no capture can escape the vault.
  const inboxPrefix = inboxDir.endsWith(sep) ? inboxDir : inboxDir + sep;
  if (!outPath.startsWith(inboxPrefix)) {
    fail(`Refusing to write outside Inbox/: ${outPath}`);
  }

  writeFileSync(outPath, contents, "utf8");
  console.log(`Wrote ${outPath}`);
}

// Run main() only when invoked as a script, not when imported. Comparing file
// URLs (not raw paths) is robust across Windows drive-letter/slash quirks.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
