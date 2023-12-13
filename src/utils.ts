import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { Writable } from "node:stream";
import { PathLike, createWriteStream, existsSync } from "node:fs";
import { $ } from "execa";
import { resolve } from "node:path";
import * as meta from "./meta/index.js";

export const package_ = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
export const tag = `v${package_.version.match(/^\d+\.\d+\.\d+/)[0]}`;

export const ext = process.platform === "win32" ? ".exe" : "";

export const typstPath = fileURLToPath(
  new URL(`../bin/typst${ext}`, import.meta.url),
);

export function toPath(input: PathLike) {
  if (input instanceof URL) {
    return fileURLToPath(input);
  } else {
    return resolve(`${input}`);
  }
}
export function toFileURL(input: PathLike, options: { dir?: boolean } = {}) {
  const { dir = false } = options;
  let fileURL: URL;
  if (input instanceof URL) {
    fileURL = new URL(input);
  } else {
    fileURL = pathToFileURL(`${input}`);
  }
  if (dir) {
    fileURL.pathname = fileURL.pathname.replace(/\/?$/, "/");
  } else {
    fileURL.pathname = fileURL.pathname.replace(/\/?$/, "");
  }
  return fileURL;
}

export async function ensureInstalled() {
  if (!existsSync(typstPath)) {
    await meta.install(new URL("../", import.meta.url), tag);
  }
}
