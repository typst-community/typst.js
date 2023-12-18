#!/usr/bin/env node
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

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
  const rootDir = new URL(
    `./packages/typst-community%2Btypst-${tuple}/`,
    processCWDFileURL,
  );
  await mkdir(rootDir, { recursive: true });

  const version = package_.version.match(/^\d+\.\d+\.\d+/)[0];

  const [os, arch] = tuple.split("-");
  const distPackage = {
    name: `@typst-community/typst-${tuple}`,
    version: package_.version,
    // type: "commonjs",
    // type: "module",
    exports: "./.typst/bin/typst",
    os: [os],
    cpu: [arch],
    license: package_.license,
    homepage: package_.homepage,
    files: [".typst"],
    scripts: {
      build: `bash -c "export TYPST_INSTALL=.typst; bash ../../tools/typst_install_target.sh ${version} ${tuple}"`,
    },
  };
  const distText = JSON.stringify(distPackage, null, 2);
  await writeFile(new URL("./package.json", rootDir), distText);

  const gitignore = ".typst";
  await writeFile(new URL("./.gitignore", rootDir), gitignore);

  await copyFile(
    new URL("./LICENSE", processCWDFileURL),
    new URL("./LICENSE", rootDir),
  );

  const readme = package_.homepage;
  await writeFile(new URL("./README.md", rootDir), readme);
}
