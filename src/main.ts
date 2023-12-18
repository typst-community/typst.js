#!/usr/bin/env node
import abexec from "./lib/abexec.js";
import getTypstPath from "./lib/getTypstPath.js";

if (process.argv[2] === "upgrade") {
  console.error(`This 'typst' is controlled by npm. Use npm to upgrade.`);
  process.exit(1);
}
abexec(getTypstPath(), process.argv.slice(2));
