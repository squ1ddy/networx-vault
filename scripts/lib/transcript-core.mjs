// Pure, side-effect-free core for the session-transcript renderer (Output #1 of
// the session-ingest primitive, TASK-49). Kept separate from transcript.mjs so
// parsing and markdown rendering are unit-testable without touching the
// filesystem or a real session export.
//
// Input: the raw text of a Claude Code session `.jsonl` — one JSON event per
// line. Output: a readable markdown transcript with tool calls rendered inline,
// git commits surfaced as links, and oversized/latest tool outputs linked as
// attachments rather than dumped inline.
//
// Origin-agnostic by design (see CONTEXT.md "Session folder"): it reads whatever
// events are present and skips the ones it does not understand, so a hand-saved
// export and a live CLI session render the same way. It does NOT distil or
// promote — that is the Companion Document's job (the /harness-ingest skill).

// Event `type` values that carry no conversation content — CLI bookkeeping we
// skip so the transcript stays a readable conversation, not a machine log.
const NOISE_TYPES = new Set([
  "mode",
  "permission-mode",
  "file-history-snapshot",
  "ai-title",
  "last-prompt",
  "queue-operation",
  "system",
  "attachment",
]);

// Local-command wrappers Claude Code injects around slash-command invocations.
// They are noise in a human-readable transcript. Exported so sibling tools
// (e.g. the session locator) share one definition of "injected command noise".
export const LOCAL_COMMAND_RE =
  /<local-command-(caveat|stdout|stderr)>|<command-(name|message|args)>/;

// Tool result previews above this get linked as an attachment stub instead of
// inlined, keeping the transcript scannable. The renderer never fabricates a
// file — it emits a note that the full output lived in the session export.
const INLINE_RESULT_LIMIT = 1500;

// Parse raw .jsonl text into an array of event objects. Blank lines and lines
// that fail to parse are skipped (a truncated or partially-written export must
// not throw). Never mutates input.
export function parseSession(jsonlText) {
  const events = [];
  for (const line of String(jsonlText ?? "").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      events.push(JSON.parse(trimmed));
    } catch {
      // Skip unparseable lines rather than fail the whole render.
    }
  }
  return events;
}

// True for events that carry a real conversational message (a user turn or an
// assistant turn), as opposed to CLI bookkeeping or injected local-command noise.
function isMessageEvent(ev) {
  if (!ev || NOISE_TYPES.has(ev.type)) return false;
  if (ev.type !== "user" && ev.type !== "assistant") return false;
  if (ev.isMeta) return false;
  return true;
}

// A message's `content` is either a plain string (simple user text) or an array
// of typed blocks (text / tool_use / tool_result). Normalise to a block array.
function contentBlocks(message) {
  const content = message?.content;
  if (typeof content === "string") return [{ type: "text", text: content }];
  if (Array.isArray(content)) return content;
  return [];
}

// Extract the tool_result blocks from a user event, keyed by tool_use_id, so a
// tool call can render its result inline beneath it.
function collectResults(events) {
  const byId = new Map();
  for (const ev of events) {
    if (ev?.type !== "user") continue;
    for (const block of contentBlocks(ev.message)) {
      if (block?.type === "tool_result" && block.tool_use_id) {
        byId.set(block.tool_use_id, block);
      }
    }
  }
  return byId;
}

// Flatten a tool_result's content (string, or an array of text/image blocks)
// into a single string for previewing.
function resultText(result) {
  if (!result) return "";
  const c = result.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) {
    return c
      .map((b) => (b?.type === "text" ? b.text : `[${b?.type ?? "block"}]`))
      .join("\n");
  }
  return "";
}

// Pull 7–40 char git hashes out of a git-commit result so they can be surfaced
// as links. Deliberately conservative: only fires for a command we already know
// is a `git commit`, so ordinary hex in output is not mistaken for a commit.
function extractCommitHashes(text) {
  const hashes = [];
  const re = /\b([0-9a-f]{7,40})\b/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (!hashes.includes(m[1])) hashes.push(m[1]);
  }
  return hashes;
}

// True if a Bash tool_use command is (or contains) a git commit — used to
// surface commit links in the transcript.
function isGitCommit(toolUse) {
  if (toolUse?.name !== "Bash") return false;
  return /\bgit\s+commit\b/.test(String(toolUse.input?.command ?? ""));
}

// Render a single tool_use block plus its paired result as an inline markdown
// block. `commitLinkBase`, when set (e.g. a repo URL), turns detected commit
// hashes into links; otherwise the bare short hash is shown.
function renderToolCall(toolUse, result, opts) {
  const name = toolUse.name ?? "tool";
  const input = toolUse.input ?? {};
  const lines = [];

  // A compact one-line summary of the call, then the full input as JSON so
  // nothing is lost (capture fat).
  const summary =
    input.description ||
    input.command ||
    input.file_path ||
    input.pattern ||
    input.prompt ||
    "";
  lines.push(`**Tool:** \`${name}\`${summary ? ` — ${truncate(String(summary), 200)}` : ""}`);
  lines.push("");
  lines.push("```json");
  lines.push(safeJson(input));
  lines.push("```");

  if (isGitCommit(toolUse)) {
    const text = resultText(result);
    const hashes = extractCommitHashes(text).slice(0, 5);
    if (hashes.length) {
      const rendered = hashes.map((h) => commitRef(h, opts.commitLinkBase)).join(", ");
      lines.push("");
      lines.push(`**Commit:** ${rendered}`);
    }
  }

  if (result) {
    const text = resultText(result).trimEnd();
    const errored = result.is_error ? " (error)" : "";
    lines.push("");
    if (text.length > INLINE_RESULT_LIMIT) {
      // Latest / oversized outputs are linked as attachment stubs rather than
      // dumped inline (spec: "latest outputs as linked attachments").
      lines.push(
        `<details><summary>Result${errored} — ${text.length} chars (attachment)</summary>`,
      );
      lines.push("");
      lines.push("```");
      lines.push(truncate(text, INLINE_RESULT_LIMIT));
      lines.push("```");
      lines.push("");
      lines.push(
        "_Output truncated in transcript; full output preserved in the session export._",
      );
      lines.push("</details>");
    } else if (text) {
      lines.push(`<details><summary>Result${errored}</summary>`);
      lines.push("");
      lines.push("```");
      lines.push(text);
      lines.push("```");
      lines.push("</details>");
    } else {
      lines.push(`_Result${errored}: (empty)_`);
    }
  }
  return lines.join("\n");
}

function commitRef(hash, base) {
  const short = hash.slice(0, 8);
  if (base) {
    const url = `${String(base).replace(/\/+$/, "")}/commit/${hash}`;
    return `[\`${short}\`](${url})`;
  }
  return `\`${short}\``;
}

function truncate(s, n) {
  const str = String(s);
  return str.length <= n ? str : str.slice(0, n) + "\n… [truncated]";
}

// JSON that never throws on circular refs and stays readable.
function safeJson(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

// Render the full transcript markdown from parsed events.
//   opts.sessionId      shown in the header (falls back to first event's id)
//   opts.commitLinkBase repo URL for commit links (optional)
//   opts.title          document H1 (optional)
export function renderTranscript(events, opts = {}) {
  const results = collectResults(events);
  const sessionId =
    opts.sessionId ||
    events.find((e) => e?.sessionId)?.sessionId ||
    "unknown";
  const title = opts.title || `Session transcript — ${sessionId}`;

  const out = [];
  out.push(`# ${title}`);
  out.push("");
  out.push(`> Deterministic transcript of session \`${sessionId}\`.`);
  out.push("> Rendered by `scripts/transcript.mjs` (session-ingest Output #1).");
  out.push("");

  let turnCount = 0;
  for (const ev of events) {
    if (!isMessageEvent(ev)) continue;
    const blocks = contentBlocks(ev.message);

    // Drop injected local-command wrapper turns (slash-command plumbing).
    const textPieces = blocks
      .filter((b) => b?.type === "text")
      .map((b) => b.text)
      .filter((t) => t && !LOCAL_COMMAND_RE.test(t));
    const toolUses = blocks.filter((b) => b?.type === "tool_use");

    // A user turn that is only a tool_result (no text, no tool_use) is the
    // paired result of a prior call — already rendered inline, so skip it here.
    if (
      ev.type === "user" &&
      textPieces.length === 0 &&
      toolUses.length === 0
    ) {
      continue;
    }
    if (textPieces.length === 0 && toolUses.length === 0) continue;

    turnCount++;
    const speaker = ev.type === "user" ? "User" : "Assistant";
    out.push(`## ${speaker}`);
    out.push("");
    for (const t of textPieces) {
      out.push(t.trim());
      out.push("");
    }
    for (const tu of toolUses) {
      out.push(renderToolCall(tu, results.get(tu.id), opts));
      out.push("");
    }
  }

  if (turnCount === 0) {
    out.push("_No conversational turns found in this session._");
    out.push("");
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

export const _internal = {
  parseSession,
  isMessageEvent,
  contentBlocks,
  collectResults,
  resultText,
  extractCommitHashes,
  isGitCommit,
  INLINE_RESULT_LIMIT,
};
