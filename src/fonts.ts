import { PathLike } from "node:fs";
import { toPath, typstPath } from "./utils.js";
import { $ } from "execa";

export interface TypstFontsOptions {
  fontPath?: PathLike;
  variants?: boolean;
  cert?: PathLike;
}

export default async function fonts(options: TypstFontsOptions = {}) {
  const opts = [];
  if (options.fontPath != null) opts.push("--font-path", toPath(options.fontPath));
  if (options.variants != null) opts.push("--variants");
  if (options.cert != null) opts.push("--cert", toPath(options.cert));
  const { stdout } = await $`${typstPath} fonts ${opts}`;
  return stdout.trimEnd().split(/\r?\n/g)
}
