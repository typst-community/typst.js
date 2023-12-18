import test from "node:test";
import assert from "node:assert/strict";
import { $ } from "execa";
import { fileURLToPath } from "node:url";

test("main.js --version", async () => {
  const mainPath = fileURLToPath(new URL("../dist/main.js", import.meta.url));
  await $({ stdio: "inherit" })`${process.execPath} ${mainPath} --version`;
});
