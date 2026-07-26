#!/usr/bin/env node
// Promote a *triaged* Companion Document into the vault (TASK-50).
//
//   node scripts/promote.mjs <name> [--vault <path>] [--doc <file>] [--no-backlog]
//
// <name> is the session folder under Inbox/ingest-backlog/<name>/ (the session
// identity from ingest). By default we read the Companion Document from that
// folder (the single *.md that isn't transcript.md); --doc overrides.
//
// The document is assumed already triaged by a human: kept elements remain,
// the rest were deleted (default-delete). For each remaining tagged element:
//   Record  -> a typed record file under topics/<topic>/, filled from the
//              matching template; enumerable sections split one-record-per-item.
//   Artifact+ provenance -> the cited source is ensured under artefacts/<name>/
//              and cited in the record's ## Sources (no graph record).
//   Action annotation -> a backlog todo labelled `ingest-ready` (no record).
//
// On completion the session originals (.jsonl, transcript.md, sibling
// artefacts) are frozen from Inbox/ingest-backlog/<name>/ into
// artefacts/<name>/ and the Sources links repointed. Default-delete is safe
// because the frozen source makes non-promotion reversible by re-ingest.
//
// Seams: --vault <path> | VAULT_ROOT | cwd  where the vault lives.
//        PROMOTE_BACKLOG_CMD  backlog command (default "backlog"); --no-backlog
//        skips todo creation entirely (records the intended argv instead).
import { spawnSync } from "node:child_process";
import {
  readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, renameSync,
  statSync,
} from "node:fs";
import { join, resolve, basename, extname, relative } from "node:path";
import {
  parseCompanionDocument, topicFolder, splitEnumerable, buildRecord,
  backlogTodoArgv, slugify,
} from "./lib/promote-core.mjs";

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const take = (flag) => {
    const i = args.indexOf(flag);
    if (i === -1) return null;
    const v = args[i + 1];
    args.splice(i, 2);
    return v;
  };
  const vault = take("--vault");
  const doc = take("--doc");
  const noBacklog = args.includes("--no-backlog");
  const name = args.filter((a) => !a.startsWith("--"))[0];
  return { name, vault, doc, noBacklog };
}

function nowDate() {
  return new Date().toISOString().slice(0, 10);
}

// Locate the Companion Document in the session folder: the single markdown file
// that is neither the mechanical transcript nor a sidecar/README.
function findCompanionDoc(sessionDir) {
  const mds = readdirSync(sessionDir).filter(
    (f) => extname(f).toLowerCase() === ".md" &&
      !/^transcript\.md$/i.test(f) && !/^readme\.md$/i.test(f),
  );
  if (mds.length === 0) return null;
  if (mds.length === 1) return join(sessionDir, mds[0]);
  // Prefer one whose name hints at a companion/digest doc.
  const hinted = mds.find((f) => /companion|digest|ingest/i.test(f));
  return join(sessionDir, hinted ?? mds[0]);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.name) {
    fail("Usage: node scripts/promote.mjs <name> [--vault <path>] [--doc <file>] [--no-backlog]");
  }
  const vaultRoot = resolve(opts.vault ?? process.env.VAULT_ROOT ?? process.cwd());
  const sessionDir = join(vaultRoot, "Inbox", "ingest-backlog", opts.name);
  if (!existsSync(sessionDir)) {
    fail(`No session folder at ${sessionDir}. Ingest it first (Inbox/ingest-backlog/<name>/).`);
  }

  const docPath = opts.doc ? resolve(opts.doc) : findCompanionDoc(sessionDir);
  if (!docPath || !existsSync(docPath)) {
    fail(`No Companion Document found in ${sessionDir}. Pass --doc <file>.`);
  }
  const rel = (abs) => relative(vaultRoot, abs).replace(/\\/g, "/");

  const { elements } = parseCompanionDocument(readFileSync(docPath, "utf8"));
  if (elements.length === 0) {
    fail(`No tagged **[Element]** entries in ${rel(docPath)}. Nothing to promote.`);
  }

  // Freeze destination for this session's originals.
  const frozenDir = join(vaultRoot, "artefacts", opts.name);
  const frozenRel = `artefacts/${opts.name}`;

  const written = [];
  const todos = [];
  let recordCount = 0;
  let artifactCount = 0;

  // The canonical Sources citation for records: the frozen Companion Document
  // + transcript (repointed to artefacts/ after the freeze below).
  const companionFrozenRel = `${frozenRel}/${basename(docPath)}`;
  const transcriptFrozenRel = existsSync(join(sessionDir, "transcript.md"))
    ? `${frozenRel}/transcript.md`
    : null;

  for (const el of elements) {
    if (el.promote.kind === "record") {
      const folder = join(vaultRoot, topicFolder(el.topic));
      mkdirSync(folder, { recursive: true });
      // Enumerable body -> one record per item (linkability test).
      const items = splitEnumerable(el.description, el.body);
      const split = items.length > 1;
      for (const item of items) {
        const title = item.title || el.description || "Untitled";
        // For a split list item, its own text is the record body (not the whole
        // element). A non-split element keeps its full prose body.
        const summary = split ? (item.body || item.title) : (el.body || item.body);
        const sources = [`[[${companionFrozenRel}]]`];
        if (transcriptFrozenRel) sources.push(`[[${transcriptFrozenRel}]]`);
        // If the element cited a sibling source, ensure+cite it as an Artifact.
        const cited = ensureArtifact(el.source, sessionDir, frozenRel);
        if (cited) sources.push(`[[${cited}]]`);
        const md = buildRecord({
          type: el.promote.recordType,
          title,
          topic: el.topic,
          created: nowDate(),
          source: `[[${companionFrozenRel}]]`,
          summary,
          next: el.preSkill,
          sources,
        });
        const dest = uniquePath(folder, slugify(title), ".md");
        writeFileSync(dest, md, "utf8");
        written.push(rel(dest));
        recordCount++;
      }
    } else if (el.promote.kind === "artifact") {
      // Freeze the cited source (if a sibling) — no graph record.
      const cited = ensureArtifact(el.source, sessionDir, frozenRel);
      if (cited) artifactCount++;
    } else if (el.promote.kind === "action") {
      todos.push(backlogTodoArgv(el, { sessionName: opts.name }));
    } else {
      console.warn(`Skipped unrecognised promote target: "${el.promote.raw}" (${el.description})`);
    }
  }

  // Create ingest-ready backlog todos for Action annotations.
  const createdTodos = [];
  for (const argv of todos) {
    if (opts.noBacklog) {
      createdTodos.push({ skipped: true, argv });
      continue;
    }
    const cmd = process.env.PROMOTE_BACKLOG_CMD || "backlog";
    const res = spawnSync(cmd, argv.slice(1), {
      cwd: vaultRoot, encoding: "utf8", shell: process.platform === "win32",
    });
    if (res.status !== 0) {
      console.warn(`backlog todo failed (${res.status}): ${res.stderr || res.stdout}`);
    }
    createdTodos.push({ skipped: false, argv, status: res.status });
  }

  // Freeze the session originals into artefacts/<name>/ (the immutable set:
  // .jsonl, transcript.md, sibling artefacts, and the Companion Document).
  const frozen = freezeSession(sessionDir, frozenDir, frozenRel);

  // Summary.
  console.log(`Promoted ${rel(docPath)}:`);
  console.log(`  Records:   ${recordCount}`);
  console.log(`  Artefacts: ${artifactCount} cited`);
  console.log(`  Ingest-ready todos: ${createdTodos.filter((t) => !t.skipped).length}` +
    (opts.noBacklog ? ` (${createdTodos.length} planned, --no-backlog)` : ""));
  console.log(`  Frozen ${frozen.length} original(s) into ${frozenRel}/`);
  for (const w of written) console.log(`    record: ${w}`);
  if (opts.noBacklog) {
    for (const t of createdTodos) console.log(`    todo (planned): ${JSON.stringify(t.argv)}`);
  }
}

// Never clobber: append -2, -3, ...
function uniquePath(dir, base, ext) {
  let candidate = join(dir, `${base}${ext}`);
  let n = 2;
  while (existsSync(candidate)) candidate = join(dir, `${base}-${n++}${ext}`);
  return candidate;
}

// Ensure a cited *sibling* source is frozen under artefacts/<name>/ and return
// its vault-relative frozen path (for a Sources citation). External sources
// (URLs, DOIs, or files not in the session folder) are returned as-is — they
// are cited but not copied. Returns null when there is nothing to cite.
function ensureArtifact(source, sessionDir, frozenRel) {
  if (!source) return null;
  const bare = source.replace(/^[`[]+|[`\]]+$/g, "").trim();
  if (!bare) return null;
  // A URL/DOI is cited verbatim, not frozen.
  if (/^(https?:\/\/|doi:|10\.\d)/i.test(bare)) return bare;
  const sibling = join(sessionDir, basename(bare));
  if (existsSync(sibling) && statSync(sibling).isFile()) {
    // It will be frozen by freezeSession; cite its post-freeze location.
    return `${frozenRel}/${basename(bare)}`;
  }
  // Unknown/external reference: cite the bare string, don't invent provenance.
  return bare;
}

// Move every immutable original from the session folder into artefacts/<name>/.
// Idempotent-ish: skips anything already frozen. Returns the vault-relative
// frozen paths.
function freezeSession(sessionDir, frozenDir, frozenRel) {
  mkdirSync(frozenDir, { recursive: true });
  const frozen = [];
  for (const name of readdirSync(sessionDir)) {
    const src = join(sessionDir, name);
    if (!statSync(src).isFile()) continue;
    const dest = join(frozenDir, name);
    if (existsSync(dest)) continue;
    renameSync(src, dest);
    frozen.push(`${frozenRel}/${name}`);
  }
  return frozen;
}

main();
