import { PathLike } from "node:fs";
import { $ } from "execa";
import pathOrFileURLToPath from "./lib/pathOrFileURLToPath.js";
import getTypstPath from "./lib/getTypstPath.js";

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

export default async function query(
  inputRaw: PathLike,
  selectorRaw: PathLike,
  options: TypstQueryOptions = {},
) {
  const inputPath = pathOrFileURLToPath(inputRaw);
  const selectorPath = pathOrFileURLToPath(selectorRaw);
  const opts = [];
  if (options.root != null) opts.push("--root", pathOrFileURLToPath(options.root));
  if (options.fontPath != null) opts.push("--font-path", pathOrFileURLToPath(options.fontPath));
  if (options.diagnosticFormat != null) opts.push("--diagnostic-format", options.diagnosticFormat);
  if (options.field != null) opts.push("--field", options.field);
  if (options.one != null) opts.push("--one");
  if (options.format != null) opts.push("--format", options.format);
  if (options.cert != null) opts.push("--cert", pathOrFileURLToPath(options.cert));
  const { stdout } = await $({ signal: options.signal })`${getTypstPath()} query ${opts} ${inputPath} ${selectorPath}`;
  const json = JSON.parse(stdout)
  return json
}
