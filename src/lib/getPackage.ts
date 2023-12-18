import { readFileSync } from "node:fs";

let package_: any;
export default function getPackage() {
  if (package_ === undefined) {
    const packageFile = new URL("../../package.json", import.meta.url);
    const text = readFileSync(packageFile, "utf8");
    package_ = JSON.parse(text);
  }
  return package_;
}
