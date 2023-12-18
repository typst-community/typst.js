#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises"
import { pathToFileURL } from "node:url"

const processCWDFileURL = pathToFileURL(process.cwd())
processCWDFileURL.pathname += "/"

const packageFile = new URL("./package.json", processCWDFileURL)
let text = await readFile(packageFile, "utf8")
let package_ = JSON.parse(text)

const tuples = [
    "@typst-community/typst-win32-x64",
    "@typst-community/typst-darwin-x64",
    "@typst-community/typst-darwin-arm64",
    "@typst-community/typst-linux-arm64",
    "@typst-community/typst-linux-x64",
]

for (const tuple of tuples) {
    const distPackageFile = new URL(`./packages/typst-community%2Btypst-${tuple}/package.json`, processCWDFileURL)
    let distText = await readFile(distPackageFile)
    let distPackage = JSON.parse(distText)

    distPackage.version = package_.version

    distText = JSON.stringify(distPackage, null, 2)
    await writeFile(distPackageFile, distText)
}


for (const tuple of tuples) {
    package_.optionalDependencies[`@typst-community/typst-${tuple}`] = package_.version
}

text = JSON.stringify(package_, null, 2)
await writeFile(packageFile, text)