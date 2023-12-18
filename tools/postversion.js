#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { $ } from "execa";

let text = await readFile("./package.json", "utf8");
const package_ = JSON.parse(text);

const tuples = [
  "win32-x64",
  "darwin-x64",
  "darwin-arm64",
  "linux-arm64",
  "linux-x64",
];
for (const tuple of tuples) {
  const name = `@typst-community/typst-${tuple}`;
  package_.optionalDependencies[name] = package_.version;
}

text = JSON.stringify(package_, null, 2);
await writeFile("./package.json", text);
