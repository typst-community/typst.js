import test from "node:test";
import assert from "node:assert/strict";
import * as typst from "../dist/index.js";

test("version", async () => {
  const r = await typst.version();
  console.log(`got typst v${r}`);
});
