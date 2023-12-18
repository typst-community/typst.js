import { $ } from "execa";
import getTypstPath from "./lib/getTypstPath.js";

export default async function version(options: { signal?: AbortSignal } = {}) {
  const { stdout } = await $({
    signal: options.signal,
  })`${getTypstPath()} --version`;
  const version = stdout.match(/\d+\.\d+\.\d+/)[0];
  return version;
}
