#!/usr/bin/env node
// reference-integrity: report-only lint for broken [[wikilinks]] in a vault.
// Also counts bare TASK-NNN references (which aren't clickable — backlog lives elsewhere),
// and flags records whose frontmatter status is draft, needs-review, or superseded.
// Usage: node scripts/reference-integrity.mjs [vaultRoot=.]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename, extname } from 'node:path';

const root = process.argv[2] || '.';
// '.claude' holds installed skills; their example [[wikilinks]] are not vault content, so skip them.
const IGNORE = new Set(['.git', 'node_modules', '.obsidian', '.trash', 'dist', 'build', '.claude']);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORE.has(name)) continue;
    const p = join(dir, name);
    (statSync(p).isDirectory() ? walk(p, files) : files.push(p));
  }
  return files;
}

const all = walk(root);
const mdFiles = all.filter(f => extname(f) === '.md');

// Resolution index: every file registered by basename (with/without ext) and relative path.
const known = new Set();
for (const f of all) {
  const rel = relative(root, f).replace(/\\/g, '/');
  known.add(rel);
  known.add(rel.replace(/\.[^./]+$/, ''));
  known.add(basename(f));
  known.add(basename(f).replace(/\.[^.]+$/, ''));
}
const resolves = t => {
  const s = t.trim();
  return known.has(s) || known.has(s.replace(/\.[^./]+$/, '')) ||
    known.has(s.split('/').pop()) || known.has(s.split('/').pop().replace(/\.[^.]+$/, ''));
};

const wikilinkRe = /!?\[\[([^\]]+)\]\]/g;
const broken = [];
const attention = [];
let taskRefs = 0;
for (const f of mdFiles) {
  const rel = relative(root, f).replace(/\\/g, '/');
  const text = readFileSync(f, 'utf8');
  let m;
  while ((m = wikilinkRe.exec(text))) {
    const target = m[1].split('|')[0].split('#')[0].trim();
    if (target && !resolves(target)) broken.push({ file: rel, link: m[1] });
  }
  taskRefs += (text.match(/\bTASK-\d+\b/g) || []).length;
  // Frontmatter status health flag (report-only).
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  const st = fm && (fm[1].match(/^status:\s*(.+)$/m) || [])[1];
  if (st && ['draft', 'needs-review', 'superseded'].includes(st.trim())) attention.push({ file: rel, status: st.trim() });
}

console.log(`Scanned ${mdFiles.length} markdown files.`);
console.log(broken.length ? `\n✗ ${broken.length} broken [[wikilink(s)]]:` : '✓ No broken [[wikilinks]].');
for (const b of broken) console.log(`  ${b.file}  →  [[${b.link}]]`);
console.log(attention.length ? `\n⚑ ${attention.length} record(s) flagged for attention by status:` : '\n✓ No records flagged draft/needs-review/superseded.');
for (const a of attention) console.log(`  ${a.file}  →  ${a.status}`);
console.log(`\nℹ ${taskRefs} bare TASK-NNN reference(s) in prose (not clickable — backlog tasks live in the framework repo).`);
process.exit(broken.length ? 1 : 0);
