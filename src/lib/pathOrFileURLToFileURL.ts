import { PathLike } from "node:fs";
import { pathToFileURL } from "node:url";

export default function pathOrFileURLToFileURL(input: PathLike, options: { dir?: boolean } = {}) {
    const { dir = false } = options;
    let fileURL: URL;
    if (input instanceof URL) {
      fileURL = new URL(input);
    } else {
      fileURL = pathToFileURL(`${input}`);
    }
    if (dir) {
      fileURL.pathname = fileURL.pathname.replace(/\/?$/, "/");
    } else {
      fileURL.pathname = fileURL.pathname.replace(/\/?$/, "");
    }
    return fileURL;
  }