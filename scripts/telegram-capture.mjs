#!/usr/bin/env node
// Telegram capture daemon — long-poll (getUpdates), OUTBOUND-ONLY, no public endpoint (ADR-0002).
// Passive capture: drops messages into the vault Inbox as idea records. /status reports the board.
//
// Run:   node scripts/telegram-capture.mjs      (keep it running; Ctrl-C to stop)
// Config: .env (see .env.example). First message /start prints your chat id — put it in
//         TELEGRAM_ALLOWED_CHAT_IDS to lock the bot to you.
//
// Commands:  <text>            -> capture to Inbox
//            /proj <n> <text>  -> capture, tagged project: <n>
//            /status           -> backlog task list -s "In Progress" (from BACKLOG_DIR)
//            /start            -> prints your chat id

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

// --- load .env (simple, no deps) ---
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) { console.error('Set TELEGRAM_BOT_TOKEN in .env (see .env.example).'); process.exit(1); }
const API = `https://api.telegram.org/bot${TOKEN}`;
const INBOX = process.env.VAULT_INBOX || 'Inbox';
const BACKLOG_DIR = process.env.BACKLOG_DIR || '.';
const ALLOWED = (process.env.TELEGRAM_ALLOWED_CHAT_IDS || '').split(',').map(s => s.trim()).filter(Boolean);

mkdirSync(INBOX, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function api(method, body) {
  const r = await fetch(`${API}/${method}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  });
  return r.json();
}
const send = (chat_id, text) => api('sendMessage', { chat_id, text });

const slug = s => (s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'note');
const hash = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h).toString(36).slice(0, 6); };

function capture(text, from, proj) {
  const ts = new Date().toISOString();
  const name = `${ts.slice(0, 10)}-${slug(text)}-${hash(ts + text)}.md`;
  const fm = [
    '---', 'type: idea', 'status: captured', `created: ${ts}`,
    'tags: [inbox, telegram]', 'source: telegram', `from: ${from}`,
    ...(proj ? [`project: ${proj}`] : []), '---', '', text, '',
  ].join('\n');
  writeFileSync(join(INBOX, name), fm);
  return name;
}

function backlogStatus() {
  try {
    return execSync('backlog task list -s "In Progress" --plain', { cwd: BACKLOG_DIR, encoding: 'utf8' }).trim()
      || 'No tasks in progress.';
  } catch (e) { return 'backlog error: ' + (e.message || e); }
}

async function handle(msg) {
  const chatId = msg.chat?.id;
  const from = msg.from?.username || msg.from?.first_name || String(msg.from?.id || '?');
  const text = (msg.text || '').trim();
  if (ALLOWED.length && !ALLOWED.includes(String(chatId))) {
    await send(chatId, `Not authorized. Your chat id is ${chatId} — add it to TELEGRAM_ALLOWED_CHAT_IDS.`);
    return;
  }
  if (!text) return void send(chatId, 'Send text to capture.');
  if (text === '/start')
    return void send(chatId, `Vault capture. Your chat id: ${chatId}. Send text to capture; /status for the board; /proj <name> <msg> to route.`);
  if (text === '/status' || text.startsWith('/status ')) return void send(chatId, backlogStatus());
  if (text.startsWith('/proj ')) {
    const [, proj, ...rest] = text.split(/\s+/);
    const body = rest.join(' ');
    if (!body) return void send(chatId, 'Usage: /proj <name> <message>');
    return void send(chatId, `Captured → ${capture(body, from, proj)} (project: ${proj}) OK`);
  }
  send(chatId, `Captured → ${capture(text, from, null)} OK`);
}

async function main() {
  const me = await api('getMe', {});
  if (!me.ok) { console.error('Bad token / no connection:', me); process.exit(1); }
  console.log(`Telegram capture daemon live as @${me.result.username}. Long-polling (outbound-only). Ctrl-C to stop.`);
  let offset = 0;
  for (;;) {
    try {
      const res = await api('getUpdates', { offset, timeout: 50, allowed_updates: ['message'] });
      if (!res.ok) { console.error('getUpdates:', res); await sleep(3000); continue; }
      for (const u of res.result) {
        offset = u.update_id + 1;
        if (u.message) { try { await handle(u.message); } catch (e) { console.error('handle:', e); } }
      }
    } catch (e) { console.error('poll:', e.message || e); await sleep(3000); }
  }
}
main();
