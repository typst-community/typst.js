import test from "node:test";
import assert from "node:assert/strict";
import * as typst from "../dist/index.js";

test("query example.typ <note>", async () => {
  const r = await typst.query(
    new URL("./example.typ", import.meta.url),
    "<note>",
  );
  console.log(r);
});
