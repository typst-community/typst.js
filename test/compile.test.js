import test from "node:test";
import assert from "node:assert/strict";
import * as typst from "../dist/index.js";

test("compile example.typ", async () => {
  await typst.compile(
    new URL("./example.typ", import.meta.url),
    new URL("./example.pdf", import.meta.url),
  );
});
