import test from "node:test";
import assert from "node:assert/strict";
import * as typst from "../dist/index.js";

test("compile example.typ", async () => {
  const r = await typst.fonts();
  console.log(r);
});
