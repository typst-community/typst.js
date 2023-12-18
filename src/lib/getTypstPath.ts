import { createRequire } from "node:module"
const require = createRequire(new URL(import.meta.url))
import.meta.resolve ??= s => require.resolve(s)

const getTypstPath = {
    "win32,x64": () => import.meta.resolve("@typst-community/typst-win32-x64"),
    "darwin-x64": () => import.meta.resolve("@typst-community/typst-darwin-x64"),
    "darwin-arm64": () => import.meta.resolve("@typst-community/typst-darwin-arm64"),
    "linux-arm64": () => import.meta.resolve("@typst-community/typst-linux-arm64"),
    "linux-x64": () => import.meta.resolve("@typst-community/typst-linux-x64"),
}[[process.platform, process.arch].toString()]!
export default getTypstPath