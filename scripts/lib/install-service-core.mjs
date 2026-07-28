// install-service-core.mjs — pure logic for installing the Telegram capture
// daemon (telegram-capture.mjs) as a resilient, auto-start / auto-restart OS
// service (TASK-67). NO I/O and NO process spawning: this module only DERIVES
// the exact commands / config files the installer would run, so every piece is
// unit-testable without NSSM installed or admin rights. The side-effecting CLI
// that actually spawns `nssm` and writes files lives in ../install-service.mjs.
//
// Three targets:
//   - Windows: NSSM (Non-Sucking Service Manager) — we produce the `nssm
//     install` + `nssm set …` argv arrays and the `nssm remove` argv.
//   - Linux: systemd — we produce the .service unit file *text*.
//   - macOS: launchd — we produce the .plist file *text*.
//
// The Windows path is the priority (see task); systemd/launchd are follow-ups
// shipped as generated-file text the owner installs manually.

// A service name derived from the vault, so multiple vaults on one machine can
// each run their own capture service without colliding. The basename of the
// vault root is slugified and prefixed. Falls back to a stable default.
export function deriveServiceName(vaultRoot, prefix = "vault-capture") {
  const raw = String(vaultRoot ?? "")
    .replace(/[\\/]+$/g, "") // drop trailing separators
    .split(/[\\/]/)
    .filter(Boolean)
    .pop();
  const slug = String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug ? `${prefix}-${slug}` : prefix;
}

// The absolute path to the capture daemon shipped inside a stamped vault.
// Uses forward slashes joined with the platform default is fine for nssm on
// Windows (it accepts both), but we keep the caller's separator by simple join.
export function daemonPath(vaultRoot) {
  const root = String(vaultRoot ?? "").replace(/[\\/]+$/g, "");
  return `${root}/scripts/telegram-capture.mjs`;
}

// The log file paths (stdout / stderr) the service writes under the vault's
// logs/ directory. Returned as { dir, stdout, stderr } so the CLI can mkdir the
// dir before handing the paths to nssm.
export function logPaths(vaultRoot, name) {
  const root = String(vaultRoot ?? "").replace(/[\\/]+$/g, "");
  const dir = `${root}/logs`;
  return {
    dir,
    stdout: `${dir}/${name}.out.log`,
    stderr: `${dir}/${name}.err.log`,
  };
}

// --- NSSM (Windows) ----------------------------------------------------------
//
// Build the ordered list of nssm command argv arrays that register the service.
// Each element is a full argv (program-less: the CLI prepends the nssm exe).
// We DELIBERATELY return argv arrays, never a shell string, so there is no
// quoting/injection surface — the CLI spawns nssm with these directly.
//
// Config applied:
//   install  <name> <node> <daemon>   — run `node telegram-capture.mjs`
//   set AppDirectory  <vaultRoot>     — cwd = vault root, so it reads THAT
//                                       vault's .env and writes its Inbox
//   set AppExit Default Restart       — restart on any exit (crash resilience)
//   set AppRestartDelay 5000          — 5s backoff between restarts
//   set Start SERVICE_AUTO_START      — start on boot
//   set AppStdout / AppStderr <logs>  — capture output to logs/
//   set AppStdoutCreationDisposition 4 / AppStderrCreationDisposition 4
//                                       — append to the log, don't truncate
//   set DisplayName / Description     — human-readable in services.msc
export function nssmInstallCommands({ name, node, daemon, appDirectory, stdout, stderr } = {}) {
  if (!name) throw new Error("nssmInstallCommands: name is required.");
  if (!node) throw new Error("nssmInstallCommands: node (path/exe) is required.");
  if (!daemon) throw new Error("nssmInstallCommands: daemon path is required.");
  if (!appDirectory) throw new Error("nssmInstallCommands: appDirectory (vault root) is required.");
  return [
    ["install", name, node, daemon],
    ["set", name, "AppDirectory", appDirectory],
    ["set", name, "AppExit", "Default", "Restart"],
    ["set", name, "AppRestartDelay", "5000"],
    ["set", name, "Start", "SERVICE_AUTO_START"],
    ["set", name, "AppStdout", stdout],
    ["set", name, "AppStderr", stderr],
    ["set", name, "AppStdoutCreationDisposition", "4"],
    ["set", name, "AppStderrCreationDisposition", "4"],
    ["set", name, "DisplayName", `Vault capture (${name})`],
    ["set", name, "Description", "Telegram capture daemon — outbound-only poller (knowledge-task-substrate)."],
  ];
}

// After install/config, start the service. Separate so the CLI can install,
// then start, and report each step.
export function nssmStartCommand(name) {
  if (!name) throw new Error("nssmStartCommand: name is required.");
  return ["start", name];
}

// Uninstall: stop then remove. `confirm` makes `nssm remove` non-interactive.
export function nssmUninstallCommands(name) {
  if (!name) throw new Error("nssmUninstallCommands: name is required.");
  return [
    ["stop", name],
    ["remove", name, "confirm"],
  ];
}

// Actionable hint printed when the nssm executable is not found on PATH.
export function nssmMissingHint() {
  return [
    "NSSM (Non-Sucking Service Manager) was not found on PATH.",
    "Install it, then re-run this command:",
    "  winget install NSSM.NSSM        (or)   choco install nssm",
    "  scoop install nssm              (or)   download from https://nssm.cc/download",
    "NSSM registers telegram-capture.mjs as an auto-start, auto-restart Windows service.",
  ].join("\n");
}

// --- systemd (Linux) ---------------------------------------------------------
//
// Generate a user-or-system .service unit that runs the daemon with the vault
// as WorkingDirectory (so it reads that vault's .env), restarts on failure, and
// starts at boot. Returned as text the owner installs manually (follow-up
// target; see task). `node` is the node executable path, `user` optional.
export function systemdUnit({ node, daemon, vaultRoot, user } = {}) {
  if (!node) throw new Error("systemdUnit: node is required.");
  if (!daemon) throw new Error("systemdUnit: daemon path is required.");
  if (!vaultRoot) throw new Error("systemdUnit: vaultRoot is required.");
  const lines = [
    "[Unit]",
    "Description=Telegram capture daemon (knowledge-task-substrate)",
    "After=network-online.target",
    "Wants=network-online.target",
    "",
    "[Service]",
    "Type=simple",
    `ExecStart=${node} ${daemon}`,
    `WorkingDirectory=${vaultRoot}`,
    "Restart=always",
    "RestartSec=5",
  ];
  if (user) lines.push(`User=${user}`);
  lines.push(
    "",
    "[Install]",
    "WantedBy=multi-user.target",
    "",
  );
  return lines.join("\n");
}

// --- launchd (macOS) ---------------------------------------------------------
//
// Generate a LaunchAgent plist that runs the daemon with the vault as the
// working directory, keeps it alive (restart-on-crash), and runs at load/login.
// Returned as text the owner installs manually (follow-up target; see task).
export function launchdPlist({ label, node, daemon, vaultRoot, stdout, stderr } = {}) {
  if (!label) throw new Error("launchdPlist: label is required.");
  if (!node) throw new Error("launchdPlist: node is required.");
  if (!daemon) throw new Error("launchdPlist: daemon path is required.");
  if (!vaultRoot) throw new Error("launchdPlist: vaultRoot is required.");
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    "<dict>",
    "  <key>Label</key>",
    `  <string>${esc(label)}</string>`,
    "  <key>ProgramArguments</key>",
    "  <array>",
    `    <string>${esc(node)}</string>`,
    `    <string>${esc(daemon)}</string>`,
    "  </array>",
    "  <key>WorkingDirectory</key>",
    `  <string>${esc(vaultRoot)}</string>`,
    "  <key>RunAtLoad</key>",
    "  <true/>",
    "  <key>KeepAlive</key>",
    "  <true/>",
    "  <key>StandardOutPath</key>",
    `  <string>${esc(stdout ?? `${vaultRoot}/logs/${label}.out.log`)}</string>`,
    "  <key>StandardErrorPath</key>",
    `  <string>${esc(stderr ?? `${vaultRoot}/logs/${label}.err.log`)}</string>`,
    "</dict>",
    "</plist>",
    "",
  ].join("\n");
}
