#!/usr/bin/env node
import { $ } from "execa";
import { ensureInstalled, package_, typstPath } from "./utils.js";

await ensureInstalled();

if (process.argv[2] === "upgrade") {
  console.error(
    `This installation of Typst is controlled by npm:typst@${package_.version}.\n` +
      `It's recommended to use 'npm install typst@latest' instead of the builtin\n` +
      `'typst upgrade' command.`,
  );
}

const { exitCode, signal } = await $({
  stdio: "inherit",
  reject: false,
})`${typstPath} ${process.argv.slice(2)}`;
if (signal) process.kill(process.pid, signal);
process.exit(exitCode ?? 100);
