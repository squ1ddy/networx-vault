#!/usr/bin/env node
// Undo the most recent scripts/ingest.mjs batch, as recorded in
// <vault>/.ingest/last-ingest.json (paths + timestamp + inputs).
//
//   node scripts/undo-ingest.mjs [--vault <path>]            show + delete uncommitted batch
//   node scripts/undo-ingest.mjs --dry-run [--vault <path>]  show only, delete nothing
//
// Salvaged from practice_poc (task-25). Design insight: git is the ratchet.
// Anything uncommitted is freely undoable; a file already in HEAD is refused
// and left for git to recover (`git revert`). Commits are the safe points.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join, resolve, sep } from "node:path";

function parseArgs(argv) {
  const args = [...argv];
  const dryRun = args.includes("--dry-run");
  const vi = args.indexOf("--vault");
  const vault = vi !== -1 ? args[vi + 1] : null;
  return { dryRun, vault };
}

const { dryRun, vault } = parseArgs(process.argv.slice(2));
const vaultRoot = resolve(vault ?? process.env.VAULT_ROOT ?? process.cwd());
const manifestPath = join(vaultRoot, ".ingest", "last-ingest.json");

function git(args) {
  return spawnSync("git", args, { cwd: vaultRoot, encoding: "utf8" });
}

// Present in HEAD (committed at least once)?
function isCommitted(relPath) {
  const posix = relPath.replace(/\\/g, "/");
  return git(["cat-file", "-e", `HEAD:${posix}`]).status === 0;
}

function isStaged(relPath) {
  const posix = relPath.replace(/\\/g, "/");
  const res = git(["diff", "--cached", "--name-only", "--", posix]);
  return res.status === 0 && res.stdout.split(/\r?\n/).includes(posix);
}

if (!existsSync(manifestPath)) {
  console.log(`No ingest manifest at ${manifestPath} — nothing to undo.`);
  console.log("(scripts/ingest.mjs writes this on every run; run it at least once first.)");
  process.exit(0);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch (err) {
  console.error(`Could not parse ${manifestPath}: ${err.message}`);
  process.exit(1);
}

const files = Array.isArray(manifest.files) ? manifest.files : [];
if (files.length === 0) {
  console.log("Last ingest batch is empty — nothing to undo.");
  process.exit(0);
}

console.log(`Last ingest batch (${manifest.timestamp ?? "unknown time"}):`);
if (manifest.inputs) console.log(`  inputs: ${JSON.stringify(manifest.inputs)}`);
for (const f of files) console.log(`  - ${f}`);

if (dryRun) {
  console.log("\n--dry-run: nothing deleted.");
  process.exit(0);
}

// git is the ratchet: isCommitted()/isStaged() only mean anything inside a repo.
// Without one, every file would look "not committed" and be deleted blindly —
// abort instead of falling through to a blind sweep.
if (git(["rev-parse", "--is-inside-work-tree"]).status !== 0) {
  console.error(
    `Not a git repository at ${vaultRoot}. undo-ingest relies on git to tell ` +
      "committed (safe) from uncommitted (undoable) files; refusing to delete blindly.",
  );
  process.exit(1);
}

const vaultBase = resolve(vaultRoot) + sep;
const removed = [];
const missing = [];
const refused = [];

for (const relPath of files) {
  const abs = join(vaultRoot, relPath);
  // Refuse to delete outside the vault: a tampered manifest with `../` entries
  // must not let undo-ingest reach beyond the vault root.
  if (!(resolve(abs) + sep).startsWith(vaultBase)) {
    console.warn(`Skipped — outside vault root: ${relPath}`);
    continue;
  }
  if (!existsSync(abs)) {
    missing.push(relPath);
    continue;
  }
  if (isCommitted(relPath)) {
    refused.push(relPath);
    continue;
  }
  if (isStaged(relPath)) git(["restore", "--staged", "--", relPath.replace(/\\/g, "/")]);
  rmSync(abs, { force: true });
  removed.push(relPath);
}

console.log("");
if (removed.length) console.log(`Removed (${removed.length}): ${removed.join(", ")}`);
if (missing.length) console.log(`Already gone, skipped (${missing.length}): ${missing.join(", ")}`);
if (refused.length) {
  console.log(`Refused — already committed (${refused.length}): ${refused.join(", ")}`);
  console.log(
    "These are past the ratchet point; undo-ingest only touches uncommitted state. " +
      "Recover a committed ingest with `git revert <commit>` (or delete the files in a new commit).",
  );
}

// Rewrite the manifest so a second run is a no-op: only the refused
// (still-committed) remainder carries forward; a clean sweep clears the batch.
writeFileSync(
  manifestPath,
  JSON.stringify({ ...manifest, files: refused, lastUndoAt: new Date().toISOString() }, null, 2) + "\n",
  "utf8",
);
