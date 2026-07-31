#!/usr/bin/env node
// Render a Claude Code session `.jsonl` into a readable markdown transcript —
// Output #1 of the session-ingest primitive (TASK-49). Tool calls render
// inline, git commits surface as links, oversized outputs link as attachments.
//
//   node scripts/transcript.mjs <session.jsonl> [--out <file.md>]
//                               [--title "..."] [--commit-base <repo-url>]
//
// With no --out, the transcript is written next to the input as
// <session>.transcript.md. This is a deterministic renderer only: the distilled
// Companion Document is produced separately by the /harness:ingest skill.
//
// Seam for testing/portability: the core (parse + render) lives in
// lib/transcript-core.mjs and is pure; this wrapper only does I/O + arg parsing.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseSession, renderTranscript } from "./lib/transcript-core.mjs";

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const opts = { out: null, title: null, commitBase: null };
  const takeValue = (flag) => {
    const i = args.indexOf(flag);
    if (i === -1) return null;
    const v = args[i + 1];
    args.splice(i, 2);
    return v;
  };
  opts.out = takeValue("--out");
  opts.title = takeValue("--title");
  opts.commitBase = takeValue("--commit-base");
  opts.input = args[0];
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.input) {
    fail(
      'Usage: node scripts/transcript.mjs <session.jsonl> [--out <file.md>] [--title "..."] [--commit-base <repo-url>]',
    );
  }

  // resolve() collapses any ../ traversal into a concrete absolute path; we only
  // ever read the one file the user named and write the one --out they chose.
  const inAbs = resolve(opts.input);
  let jsonl;
  try {
    jsonl = readFileSync(inAbs, "utf8");
  } catch (err) {
    fail(`Cannot read session file: ${inAbs}\n${err.message}`);
  }

  const events = parseSession(jsonl);
  const markdown = renderTranscript(events, {
    title: opts.title,
    commitLinkBase: opts.commitBase,
  });

  const outAbs = opts.out
    ? resolve(opts.out)
    : resolve(dirname(inAbs), basename(inAbs).replace(/\.jsonl$/i, "") + ".transcript.md");

  try {
    writeFileSync(outAbs, markdown, "utf8");
  } catch (err) {
    fail(`Cannot write transcript: ${outAbs}\n${err.message}`);
  }

  const turns = (markdown.match(/^## (User|Assistant)$/gm) || []).length;
  console.log(`Rendered ${events.length} events / ${turns} turns -> ${outAbs}`);
}

// Run main() only when invoked as a script, not when imported. Comparing file
// URLs (not raw paths) is robust across Windows drive-letter/slash quirks.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
