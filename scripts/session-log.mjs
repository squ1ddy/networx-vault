#!/usr/bin/env node
// Session-log archival — freeze a Claude Code session transcript (.jsonl) into the vault.
//
// Archives the raw .jsonl under session-logs/ as frozen provenance (an Artifact/source, per
// CONTEXT.md), with a matchable name, paired with a human-readable summary sidecar (.md).
// Pair with Matt's /handoff, which produces the summary you paste into the sidecar.
//
// Usage:  node scripts/session-log.mjs <path-to-session.jsonl> [--title "Short title"]

import { copyFileSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const OUT_DIR = 'session-logs';

const slug = s =>
  (String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'session');

// Deterministic short hash of an arbitrary string (dependency-free).
const hash = s => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h).toString(16).padStart(8, '0').slice(0, 8);
};

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error('Usage: node scripts/session-log.mjs <path-to-session.jsonl> [--title "Short title"]');
  console.error('  Archives a Claude Code session transcript into session-logs/ with a summary sidecar.');
  process.exit(1);
}

// --- parse args ---
const args = process.argv.slice(2);
let src = null;
let title = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--title') { title = args[++i] ?? null; }
  else if (a.startsWith('--title=')) { title = a.slice('--title='.length); }
  else if (!src) { src = a; }
  else usage(`unexpected argument: ${a}`);
}

if (!src) usage('missing path to session .jsonl');
if (!existsSync(src)) usage(`file not found: ${src}`);
const st = statSync(src);
if (!st.isFile()) usage(`not a file: ${src}`);

// --- derive name parts ---
const srcName = basename(src);
const date = new Date(st.mtime).toISOString().slice(0, 10); // file mtime, YYYY-MM-DD

// session id: first 8 hex chars if the source filename looks like a uuid, else short hash of path.
const uuidMatch = srcName.match(/([0-9a-fA-F]{8})-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
const id8 = uuidMatch ? uuidMatch[1].toLowerCase() : hash(src);

const nameSlug = slug(title || 'session');
const base = `${date}-${nameSlug}-${id8}`;

// full session id: prefer the uuid from the filename, else the id8.
const fullUuid = srcName.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
const sessionId = fullUuid ? fullUuid[0].toLowerCase() : id8;

// --- write outputs ---
mkdirSync(OUT_DIR, { recursive: true });
const jsonlPath = join(OUT_DIR, `${base}.jsonl`);
const mdPath = join(OUT_DIR, `${base}.md`);

// Preserve original bytes exactly — frozen provenance.
copyFileSync(src, jsonlPath);

const archived = new Date().toISOString();
const fm = [
  '---',
  'type: source',
  'kind: session-log',
  `title: ${JSON.stringify(title || 'Session log')}`,
  `session_id: ${sessionId}`,
  `archived: ${archived}`,
  'tags: [session-log]',
  '---',
  '',
  `# ${title || 'Session log'}`,
  '',
  `> Frozen transcript: \`${base}.jsonl\` (original bytes preserved, immutable provenance).`,
  '',
  'Paste or attach the `/handoff` markdown summary below.',
  '',
].join('\n');

writeFileSync(mdPath, fm);

console.log(`Archived transcript → ${jsonlPath}`);
console.log(`Summary sidecar     → ${mdPath}`);
console.log(`Next: run /handoff and paste its markdown summary into the sidecar.`);
