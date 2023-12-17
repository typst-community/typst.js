import { PathLike } from "node:fs";
import { toPath, typstPath } from "./utils.js";
import { $ } from "execa";

export interface TypstFontsOptions {
  fontPath?: PathLike;
  variants?: boolean;
}

export default async function fonts(options: TypstFontsOptions = {}) {
  const opts = [];
  if (options.fontPath != null) opts.push("--font-path", toPath(options.fontPath));
  if (options.variants != null) opts.push("--variants");
  await $`${typstPath} fonts ${opts}`;
}
