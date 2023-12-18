import { PathLike } from "node:fs";
import { $ } from "execa";
import pathOrFileURLToPath from "./lib/pathOrFileURLToPath.js";
import getTypstPath from "./lib/getTypstPath.js";

export interface TypstCompileOptions {
  signal?: AbortSignal;
  root?: PathLike;
  fontPath?: PathLike;
  diagnosticFormat?: 'human' | 'short';
  format?: 'pdf' | 'png' | 'svg';
  open?: boolean;
  ppi?: number;
  flamegraph?: PathLike;
  cert?: PathLike;
}

export default async function compile(
  inputRaw: PathLike,
  outputRaw: PathLike | undefined = undefined,
  options: TypstCompileOptions = {},
) {
  const inputPath = pathOrFileURLToPath(inputRaw);
  const outputPath = outputRaw == null ? undefined : pathOrFileURLToPath(outputRaw);
  const opts = [];
  if (options.root != null) opts.push("--root", pathOrFileURLToPath(options.root));
  if (options.fontPath != null) opts.push("--font-path", pathOrFileURLToPath(options.fontPath));
  if (options.diagnosticFormat != null) opts.push("--diagnostic-format", options.diagnosticFormat);
  if (options.format != null) opts.push("-f", options.format);
  if (options.open != null) opts.push("--open");
  if (options.ppi != null) opts.push("--ppi", options.ppi.toString());
  if (options.flamegraph != null) opts.push("--flamegraph", options.flamegraph ? pathOrFileURLToPath(options.flamegraph) : undefined);
  if (options.cert != null) opts.push("--cert", pathOrFileURLToPath(options.cert));
  if (outputPath === undefined) {
    await $({ signal: options.signal })`${getTypstPath()} compile ${opts} ${inputPath}`;
  } else {
    await $({ signal: options.signal })`${getTypstPath()} compile ${opts} ${inputPath} ${outputPath}`;
  }
}
