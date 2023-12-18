import { PathLike } from "node:fs";
import { toPath, typstPath } from "./utils.js";
import { $ } from "execa";

export interface TypstQueryOptions {
  signal?: AbortSignal;
  root?: PathLike;
  fontPath?: PathLike;
  diagnosticFormat?: 'human' | 'short' | 'json' | 'yaml';
  field?: string;
  one?: boolean;
  format?: 'json' | 'yaml';
  cert?: PathLike;
}

export async function query(
  inputRaw: PathLike,
  selectorRaw: PathLike,
  options: TypstQueryOptions = {},
) {
  const inputPath = toPath(inputRaw);
  const selectorPath = toPath(selectorRaw);
  const opts = [];
  if (options.root != null) opts.push("--root", toPath(options.root));
  if (options.fontPath != null) opts.push("--font-path", toPath(options.fontPath));
  if (options.diagnosticFormat != null) opts.push("--diagnostic-format", options.diagnosticFormat);
  if (options.field != null) opts.push("--field", options.field);
  if (options.one != null) opts.push("--one");
  if (options.format != null) opts.push("--format", options.format);
  if (options.cert != null) opts.push("--cert", toPath(options.cert));
  await $({ signal: options.signal })`${typstPath} query ${opts} ${inputPath} ${selectorPath}`;
}
