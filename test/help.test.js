import test from "node:test";
import assert from "node:assert/strict";
import * as typst from "../dist/index.js";

test("help", async () => {
  const r = await typst.help();
  console.log(`${r.length} chars`);
});
