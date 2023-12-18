import { $ } from "execa";
import getTypstPath from "./lib/getTypstPath.js";

export default async function help(options: { signal?: AbortSignal } = {}) {
  const { stdout } = await $({
    signal: options.signal,
  })`${getTypstPath()} --help`;
  return stdout;
}
