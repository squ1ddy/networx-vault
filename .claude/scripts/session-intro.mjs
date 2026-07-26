#!/usr/bin/env node
// SessionStart hook: surface the START_HERE home page. No LLM, read-only, fast.
import { readFileSync } from 'node:fs';
try {
  const md = readFileSync('START_HERE.md', 'utf8').trim();
  process.stdout.write(
    'Surface this to the user verbatim at the top of your first reply, then ask what they want to do:\n\n' + md + '\n'
  );
} catch {
  process.stdout.write('START_HERE.md not found — run from the vault root.\n');
}
