import type { PathLike } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default function pathOrFileURLToPath(input: PathLike) {
  if (input instanceof URL) {
    const fileURL = new URL(input);
    fileURL.pathname = fileURL.pathname.replace(/\/$/, "");
    return fileURLToPath(fileURL);
  } else {
    return resolve(`${input}`);
  }
}
