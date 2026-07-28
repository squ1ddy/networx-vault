#!/usr/bin/env node
// install-service.mjs — register the Telegram capture daemon
// (telegram-capture.mjs) as a resilient, auto-start / auto-restart OS service
// pointed at a chosen vault (TASK-67).
//
//   node scripts/install-service.mjs --vault <path> [--name <svc>] [--node <exe>]
//   node scripts/install-service.mjs --vault <path> --uninstall
//   node scripts/install-service.mjs --vault <path> --systemd   # print unit
//   node scripts/install-service.mjs --vault <path> --launchd   # print plist
//
// Windows-first: uses NSSM (Non-Sucking Service Manager) to install a service
// whose AppDirectory is the vault root — so it reads THAT vault's .env and
// writes into its Inbox — with restart-on-crash, boot-start, and log capture to
// <vault>/logs/. systemd (Linux) and launchd (macOS) are follow-ups: this CLI
// generates their unit/plist text for you to install manually.
//
// This wrapper is the thin, side-effecting shell; all the command/argv/unit
// assembly lives in ./lib/install-service-core.mjs (unit-tested). We never build
// a shell string — nssm is spawned with argv arrays, so there is no injection
// surface.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  deriveServiceName,
  daemonPath,
  logPaths,
  nssmInstallCommands,
  nssmStartCommand,
  nssmUninstallCommands,
  nssmMissingHint,
  systemdUnit,
  launchdPlist,
} from "./lib/install-service-core.mjs";

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const takeValue = (flag) => {
    const i = args.indexOf(flag);
    if (i === -1) return null;
    const v = args[i + 1];
    args.splice(i, 2);
    return v ?? null;
  };
  const takeFlag = (flag) => {
    const i = args.indexOf(flag);
    if (i === -1) return false;
    args.splice(i, 1);
    return true;
  };
  return {
    vault: takeValue("--vault"),
    name: takeValue("--name"),
    node: takeValue("--node"),
    nssm: takeValue("--nssm"),
    uninstall: takeFlag("--uninstall"),
    systemd: takeFlag("--systemd"),
    launchd: takeFlag("--launchd"),
  };
}

// Is `exe` runnable? nssm with no args prints usage and exits non-zero, so we
// treat "spawned at all" (no ENOENT) as present. Returns true/false.
function nssmPresent(exe) {
  const r = spawnSync(exe, [], { stdio: "ignore" });
  return !(r.error && r.error.code === "ENOENT");
}

// Run one nssm argv, echoing it first. Returns the spawn result. Throws-by-exit
// on failure so a broken step stops the install cleanly.
function runNssm(exe, argv, { allowFail = false } = {}) {
  console.log(`  nssm ${argv.join(" ")}`);
  const r = spawnSync(exe, argv, { stdio: "inherit" });
  if (r.error) fail(`Failed to run nssm: ${r.error.message}`);
  if (r.status !== 0 && !allowFail) {
    fail(`nssm exited ${r.status} for: nssm ${argv.join(" ")}`);
  }
  return r;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.vault) {
    fail(
      "Usage: node scripts/install-service.mjs --vault <path> [--name <svc>] " +
        "[--node <exe>] [--uninstall] [--systemd] [--launchd]",
    );
  }

  const vaultRoot = resolve(opts.vault);
  if (!existsSync(vaultRoot)) fail(`Vault path does not exist: ${vaultRoot}`);
  // ONE derivation of the daemon path (core), reused for the existence guard,
  // the NSSM install argv, and the systemd/launchd generators — so the path we
  // check is byte-identical to the path we register.
  const daemon = daemonPath(vaultRoot);
  if (!existsSync(daemon)) {
    fail(
      `No capture daemon at ${daemon}. Point --vault at a stamped vault ` +
        "(one with scripts/telegram-capture.mjs).",
    );
  }

  const name = opts.name || deriveServiceName(vaultRoot);
  const nodeExe = opts.node || process.execPath;

  // --- systemd / launchd: generate the unit/plist text (follow-up targets) ---
  if (opts.systemd) {
    process.stdout.write(
      systemdUnit({ node: nodeExe, daemon, vaultRoot }) +
        `\n# Install: save as ~/.config/systemd/user/${name}.service, then:\n` +
        `#   systemctl --user daemon-reload && systemctl --user enable --now ${name}\n`,
    );
    return;
  }
  if (opts.launchd) {
    const label = `com.substrate.${name}`;
    process.stdout.write(
      launchdPlist({ label, node: nodeExe, daemon, vaultRoot }) +
        `\n<!-- Install: save as ~/Library/LaunchAgents/${label}.plist, then:\n` +
        `       launchctl load ~/Library/LaunchAgents/${label}.plist -->\n`,
    );
    return;
  }

  // --- Windows (NSSM) path ---------------------------------------------------
  const nssmExe = opts.nssm || "nssm";
  if (!nssmPresent(nssmExe)) {
    fail(nssmMissingHint());
  }

  if (opts.uninstall) {
    console.log(`Removing service "${name}"…`);
    for (const argv of nssmUninstallCommands(name)) {
      // stop may fail if already stopped; remove is the one that matters.
      runNssm(nssmExe, argv, { allowFail: argv[0] === "stop" });
    }
    console.log(`Service "${name}" removed.`);
    return;
  }

  // Install: ensure logs/ exists, then run the install + config + start argv.
  const logs = logPaths(vaultRoot, name);
  mkdirSync(logs.dir, { recursive: true });

  console.log(`Installing service "${name}" for vault ${vaultRoot}…`);
  const cmds = nssmInstallCommands({
    name,
    node: nodeExe,
    daemon: daemonPath(vaultRoot),
    appDirectory: vaultRoot,
    stdout: logs.stdout,
    stderr: logs.stderr,
  });
  for (const argv of cmds) runNssm(nssmExe, argv);
  runNssm(nssmExe, nssmStartCommand(name));

  console.log(
    `\nService "${name}" installed and started.\n` +
      `  Logs:      ${logs.stdout}\n` +
      `             ${logs.stderr}\n` +
      `  Uninstall: node scripts/install-service.mjs --vault "${vaultRoot}" --uninstall\n` +
      `  Manage:    services.msc  (or  nssm edit ${name})`,
  );
}

// Run main() only when invoked as a script, not when imported (so tests can
// import the core). File-URL compare is robust across Windows path quirks.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
