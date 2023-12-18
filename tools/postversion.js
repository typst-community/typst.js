#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const processCWDFileURL = pathToFileURL(process.cwd());
processCWDFileURL.pathname += "/";

const packageFile = new URL("./package.json", processCWDFileURL);
let text = await readFile(packageFile, "utf8");
let package_ = JSON.parse(text);

const tuples = [
  "win32-x64",
  "darwin-x64",
  "darwin-arm64",
  "linux-arm64",
  "linux-x64",
];

for (const tuple of tuples) {
  const distPackageFile = new URL(
    `./packages/typst-community%2Btypst-${tuple}/package.json`,
    processCWDFileURL,
  );
  let distText = await readFile(distPackageFile);
  let distPackage = JSON.parse(distText);

  distPackage.version = package_.version;

  distText = JSON.stringify(distPackage, null, 2);
  await writeFile(distPackageFile, distText);
}

for (const tuple of tuples) {
  package_.optionalDependencies[`@typst-community/typst-${tuple}`] =
    package_.version;
}

text = JSON.stringify(package_, null, 2);
await writeFile(packageFile, text);
