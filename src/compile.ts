import { PathLike } from "node:fs";
import { toPath, typstPath } from "./utils.js";
import { $ } from "execa";

export interface TypstCompileOptions {
  fontPath?: PathLike;
}
export default async function compile(
  inputRaw: PathLike,
  outputRaw: PathLike | undefined = undefined,
  options: TypstCompileOptions = {},
) {
  const inputPath = toPath(inputRaw);
  const outputPath = outputRaw === undefined ? undefined : toPath(outputRaw);
  const opts = [
    ...(options.fontPath == null
      ? []
      : ["--font-path", toPath(options.fontPath)]),
  ];
  if (outputPath === undefined) {
    await $`${typstPath} compile ${opts} ${inputPath}`;
  } else {
    await $`${typstPath} compile ${opts} ${inputPath} ${outputPath}`;
  }
}
