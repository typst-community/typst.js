import { PathLike } from "node:fs";
import { $ } from "execa";
import pathOrFileURLToPath from "./lib/pathOrFileURLToPath.js";
import getTypstPath from "./lib/getTypstPath.js";

export interface TypstFontsOptions {
  signal?: AbortSignal;
  fontPath?: PathLike;
  variants?: boolean;
  cert?: PathLike;
}

export default async function fonts(options: TypstFontsOptions = {}) {
  const opts = [];
  if (options.fontPath != null) opts.push("--font-path", pathOrFileURLToPath(options.fontPath));
  if (options.variants != null) opts.push("--variants");
  if (options.cert != null) opts.push("--cert", pathOrFileURLToPath(options.cert));
  const { stdout } = await $({ signal: options.signal })`${getTypstPath()} fonts ${opts}`;
  return stdout.trimEnd().split(/\r?\n/g)
}
