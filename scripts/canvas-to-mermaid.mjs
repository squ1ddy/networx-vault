#!/usr/bin/env node
// canvas-to-mermaid: JSON Canvas 1.0 (.canvas) -> Mermaid flowchart.
// Proves the canvas stays machine-readable regardless of which Obsidian canvas
// plugins touched it (they only add ignorable extension fields).
//
// Usage: node scripts/canvas-to-mermaid.mjs <file.canvas> [> out.mmd]
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/canvas-to-mermaid.mjs <file.canvas>'); process.exit(1); }
const c = JSON.parse(readFileSync(file, 'utf8'));

const id = s => 'n_' + String(s).replace(/[^a-zA-Z0-9]/g, '');
const esc = s => String(s || '').replace(/["\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
function label(n) {
  if (n.type === 'file') return esc((n.file || '').split(/[\\/]/).pop().replace(/\.md$/, ''));
  if (n.type === 'text') return esc((n.text || '').split('\n')[0].replace(/^#+\s*/, '')) || 'note';
  if (n.type === 'group') return esc(n.label || 'group');
  if (n.type === 'link') return esc(n.url || 'link');
  return esc(n.id);
}

const lines = ['flowchart TD'];
for (const n of c.nodes || []) lines.push(`  ${id(n.id)}["${label(n)}"]`);
for (const e of c.edges || []) {
  const arrow = e.label ? `-- "${esc(e.label)}" -->` : '-->';
  lines.push(`  ${id(e.fromNode)} ${arrow} ${id(e.toNode)}`);
}
process.stdout.write(lines.join('\n') + '\n');
