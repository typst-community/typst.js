import { ensureInstalled } from "./utils.js";

await ensureInstalled();

export * as meta from "./meta/index.js";
export { default as compile } from "./compile.js";
