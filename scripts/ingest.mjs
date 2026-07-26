#!/usr/bin/env node
// Ingest any file into a vault's Inbox.
//
//   node scripts/ingest.mjs <file> [--title "Custom title"] [--vault <path>]
//
// Routing (see lib/ingest-core.mjs):
//   .md / .markdown / .txt   -> stamp light frontmatter, drop straight in Inbox/
//   pdf/pptx/xlsx/docx/images
//   /html/csv/... + unknown  -> markitdown -> markdown in Inbox/, and the
//                               original is frozen into artefacts/ as an
//                               Artifact with a sidecar source note.
//
// Every run overwrites .ingest/last-ingest.json with the files it created, so
// scripts/undo-ingest.mjs can drop the last batch (while still uncommitted).
//
// Seams for testing / portability:
//   --vault <path> | VAULT_ROOT | cwd     where the vault lives
//   INGEST_MARKITDOWN_CMD                  converter command (default: "python -m markitdown")
import { spawnSync } from "node:child_process";
import {
  readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync,
  mkdtempSync, rmSync,
} from "node:fs";
import { join, resolve, extname, basename } from "node:path";
import { tmpdir } from "node:os";
import {
  classify, slugify, inboxFrontmatter, sidecarNote, inboxDocument,
} from "./lib/ingest-core.mjs";

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const opts = { title: null, vault: null };
  const takeValue = (flag) => {
    const i = args.indexOf(flag);
    if (i === -1) return null;
    const v = args[i + 1];
    args.splice(i, 2);
    return v;
  };
  opts.title = takeValue("--title");
  opts.vault = takeValue("--vault");
  opts.input = args[0];
  return opts;
}

// The converter is invoked as: <cmd...> <file> -o <out>. Default matches the
// documented stack (`python -m markitdown`); override via INGEST_MARKITDOWN_CMD
// (whitespace-split) so tests can inject a fake and other machines a `markitdown` binary.
function converterInvocation() {
  const raw = process.env.INGEST_MARKITDOWN_CMD?.trim();
  const parts = raw ? raw.split(/\s+/) : ["python", "-m", "markitdown"];
  return { cmd: parts[0], base: parts.slice(1) };
}

function runConverter(file, outPath, cwd) {
  const { cmd, base } = converterInvocation();
  const args = [...base, file, "-o", outPath];
  console.log(`> ${[cmd, ...args].join(" ")}`);
  // No shell parses the filenames: on POSIX (and for real .exe on PATH) spawn
  // the command directly with an argument array. On win32 a .cmd/.bat shim
  // (markitdown/pandoc) can't be spawned without a shell, so run it through
  // cmd.exe with each argument caret/quote-escaped (cmdQuote) — cmd never sees
  // an unescaped metacharacter, so a hostile filename can't inject a command.
  const res = spawnTool(cmd, args, { stdio: "inherit", cwd, encoding: "utf8" });
  if (res.error) throw res.error;
  if (res.status !== 0) {
    fail(`Converter failed (exit ${res.status ?? "signal " + res.signal}).`);
  }
}

// Escape one token for cmd.exe: wrap in double quotes, double any inner quote,
// and caret-escape the cmd metacharacters that survive inside quotes.
function cmdQuote(s) {
  const str = String(s).replace(/"/g, '""');
  return `"${str.replace(/[%&|<>^()!]/g, "^$&")}"`;
}

// Run an external tool with an argument array and no shell metacharacter
// parsing of the args. Falls back to cmd.exe /c only for win32 .cmd/.bat shims,
// with every argument escaped via cmdQuote.
function spawnTool(cmd, args, opts) {
  const isWinBatch = process.platform === "win32" && /\.(cmd|bat)$/i.test(cmd);
  if (isWinBatch) {
    // Wrap the whole line in an extra outer pair of quotes: cmd /c strips the
    // outermost quotes when the line both begins and ends with one, so this
    // preserves the individually-quoted tokens inside.
    const line = '"' + [cmd, ...args].map(cmdQuote).join(" ") + '"';
    return spawnSync("cmd.exe", ["/d", "/s", "/c", line], {
      ...opts,
      windowsVerbatimArguments: true,
    });
  }
  return spawnSync(cmd, args, opts);
}

function nowIso() {
  return new Date().toISOString();
}

function recordManifest(vaultRoot, files, inputs) {
  const dir = join(vaultRoot, ".ingest");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const manifest = { timestamp: nowIso(), inputs, files };
  writeFileSync(join(dir, "last-ingest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
}

// Never clobber an existing file: if <slug>.md is taken, append -2, -3, ...
function uniquePath(dir, base, ext) {
  let candidate = join(dir, `${base}${ext}`);
  let n = 2;
  while (existsSync(candidate)) candidate = join(dir, `${base}-${n++}${ext}`);
  return candidate;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.input) {
    fail('Usage: node scripts/ingest.mjs <file> [--title "Custom title"] [--vault <path>]');
  }

  const vaultRoot = resolve(opts.vault ?? process.env.VAULT_ROOT ?? process.cwd());
  const inboxDir = join(vaultRoot, "Inbox");
  const artefactsDir = join(vaultRoot, "artefacts");
  if (!existsSync(inboxDir)) {
    fail(`No Inbox/ at ${vaultRoot}. Point --vault at a scaffolded vault (or run from its root).`);
  }

  const file = resolve(opts.input);
  if (!existsSync(file)) fail(`Not found: ${file}`);

  const ext = extname(file).toLowerCase();
  const title = opts.title ?? basename(file).replace(/\.[^.]+$/, "");
  const slug = slugify(opts.title ?? basename(file).replace(/\.[^.]+$/, ""));
  const ingestedAt = nowIso();
  const written = [];
  const rel = (abs) => abs.slice(vaultRoot.length + 1).replace(/\\/g, "/");

  const mode = classify(ext);

  if (mode === "text") {
    // Already text: stamp + land in Inbox, no frozen artifact.
    const body = readFileSync(file, "utf8");
    const fm = inboxFrontmatter({ title, source: file, ingestedAt });
    const dest = uniquePath(inboxDir, slug, ".md");
    writeFileSync(dest, inboxDocument(fm, title, body), "utf8");
    written.push(rel(dest));
    console.log(`Landed in Inbox: ${rel(dest)}`);
  } else {
    // Convert via markitdown; freeze the original as an Artifact + sidecar.
    const tmp = mkdtempSync(join(tmpdir(), "ingest-"));
    try {
      const out = join(tmp, "converted.md");
      runConverter(file, out, vaultRoot);
      if (!existsSync(out)) fail("Converter produced no output.");
      const body = readFileSync(out, "utf8");
      if (!body.trim()) fail("Converter produced empty content.");

      if (!existsSync(artefactsDir)) mkdirSync(artefactsDir, { recursive: true });
      // Freeze the original byte-for-byte.
      const artifactAbs = uniquePath(artefactsDir, slug, ext);
      copyFileSync(file, artifactAbs);
      const artifactRel = rel(artifactAbs);
      written.push(artifactRel);

      // Sidecar note travels with the frozen artifact. Both the sidecar and
      // the Inbox note reference the artifact by the same vault-relative path.
      const sidecarAbs = artifactAbs.replace(/\.[^.]+$/, ".md");
      writeFileSync(
        sidecarAbs,
        sidecarNote({ title, artifactRel, provenance: file, ingestedAt }),
        "utf8",
      );
      written.push(rel(sidecarAbs));

      // Converted markdown lands in the Inbox, linked back to the artifact.
      const fm = inboxFrontmatter({ title, source: file, ingestedAt, artifactRel });
      const inboxAbs = uniquePath(inboxDir, slug, ".md");
      writeFileSync(inboxAbs, inboxDocument(fm, title, body), "utf8");
      written.push(rel(inboxAbs));

      console.log(`Landed in Inbox: ${rel(inboxAbs)}`);
      console.log(`Frozen artifact: ${artifactRel} (+ sidecar ${rel(sidecarAbs)})`);
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  }

  recordManifest(vaultRoot, written, { input: file, title: opts.title, ext });
  console.log(`Recorded ${written.length} file(s). Undo with: node scripts/undo-ingest.mjs --vault "${vaultRoot}"`);
}

main();
