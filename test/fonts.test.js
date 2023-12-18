import test from "node:test";
import assert from "node:assert/strict";
import * as typst from "../dist/index.js";

test("fonts", async () => {
  const r = await typst.fonts();
  console.log(`${r.length} fonts`);
});
