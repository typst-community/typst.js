import { PathLike } from "node:fs";
import { toPath, typstPath } from "./utils.js";
import { $ } from "execa";

export interface TypstCompileOptions {
  root?: PathLike;
  fontPath?: PathLike;
  diagnosticFormat?: 'human' | 'short';
  format?: 'pdf' | 'png' | 'svg';
  open?: boolean;
  ppi?: number;
  flamegraph?: PathLike | undefined;
}
export default async function compile(
  inputRaw: PathLike,
  outputRaw: PathLike | undefined = undefined,
  options: TypstCompileOptions = {},
) {
  const inputPath = toPath(inputRaw);
  const outputPath = outputRaw === undefined ? undefined : toPath(outputRaw);
  const opts = [];
  if (options.root != null) opts.push("--root", toPath(options.root));
  if (options.fontPath != null) opts.push("--font-path", toPath(options.fontPath));
  if (options.diagnosticFormat != null) opts.push("--diagnostic-format", options.diagnosticFormat);
  if (options.format != null) opts.push("-f", options.format);
  if (options.open != null) opts.push("--open");
  if (options.ppi != null) opts.push("--ppi", options.ppi.toString());
  if (options.flamegraph != null) opts.push("--flamegraph", options.flamegraph ? toPath(options.flamegraph) : undefined);
  if (outputPath === undefined) {
    await $`${typstPath} compile ${opts.join(' ')} ${inputPath}`;
  } else {
    await $`${typstPath} compile ${opts.join(' ')} ${inputPath} ${outputPath}`;
  }
}
