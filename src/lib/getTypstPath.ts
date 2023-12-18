import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
const require = createRequire(new URL(import.meta.url));
import.meta.resolve ??= (s) => pathToFileURL(require.resolve(s)).href;

const getTypstPath =
  {
    "win32,x64": () =>
      fileURLToPath(import.meta.resolve("@typst-community/typst-win32-x64")),
    "darwin,x64": () =>
      fileURLToPath(import.meta.resolve("@typst-community/typst-darwin-x64")),
    "darwin,arm64": () =>
      fileURLToPath(import.meta.resolve("@typst-community/typst-darwin-arm64")),
    "linux,arm64": () =>
      fileURLToPath(import.meta.resolve("@typst-community/typst-linux-arm64")),
    "linux,x64": () =>
      fileURLToPath(import.meta.resolve("@typst-community/typst-linux-x64")),
  }[[process.platform, process.arch].toString()] ??
  (() => {
    throw new ReferenceError(
      `@typst-community/typst-[os]-[arch] not found for ${process.platform}-${process.arch}`,
    );
  });
export default getTypstPath;
