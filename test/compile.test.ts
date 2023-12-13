import { test } from "vitest";
import compile from "../src/compile.js";

test("compile example.typ", async () => {
  await compile(
    import.meta.resolve("./example.typ"),
    import.meta.resolve("./example.pdf"),
  );
});
