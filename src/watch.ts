import { PathLike } from "node:fs";
import { toPath, typstPath } from "./utils.js";
import { $ } from "execa";

export interface TypstWatchOptions {
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

export default async function watch(
  inputRaw: PathLike,
  outputRaw: PathLike | undefined = undefined,
  options: TypstWatchOptions = {},
) {
  const inputPath = toPath(inputRaw);
  const outputPath = outputRaw == null ? undefined : toPath(outputRaw);
  const opts = [];
  if (options.root != null) opts.push("--root", toPath(options.root));
  if (options.fontPath != null) opts.push("--font-path", toPath(options.fontPath));
  if (options.diagnosticFormat != null) opts.push("--diagnostic-format", options.diagnosticFormat);
  if (options.format != null) opts.push("-f", options.format);
  if (options.open != null) opts.push("--open");
  if (options.ppi != null) opts.push("--ppi", options.ppi.toString());
  if (options.flamegraph != null) opts.push("--flamegraph", toPath(options.flamegraph));
  if (options.cert != null) opts.push("--cert", toPath(options.cert));
  if (outputPath === undefined) {
    await $({ signal: options.signal })`${typstPath} watch ${opts} ${inputPath}`;
  } else {
    await $({ signal: options.signal })`${typstPath} watch ${opts} ${inputPath} ${outputPath}`;
  }
}
