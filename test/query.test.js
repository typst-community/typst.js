import test from "node:test";
import assert from "node:assert/strict";
import * as typst from "../dist/index.js";

test("compile example.typ", async () => {
  const r = await typst.query(new URL("./example.typ"), "<note>");
  console.log(r);
});
