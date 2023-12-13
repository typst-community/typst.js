import { test } from "vitest";
import * as typst from "../src/index.ts"

test("compile example.typ", async () => {
  await typst.compile(
    new URL("./example.typ", import.meta.url),
    new URL("./example.pdf", import.meta.url),
  );
});
