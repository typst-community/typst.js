import { spawnSync } from "node:child_process";

/**
 * "Absorbs" the subprocess into the current process. Sort of like
 * how `exec othercomomand "$@"` works in Bash. Synchronous. Always
 * triggers `process.exit()`.
 */
export default function abexec(argv0: string, argv: string[]) {
  const r = spawnSync(argv0, argv, { stdio: "inherit" });
  if (r.error) {
    console.error(r.error);
    process.exit(100);
  } else {
    process.exit(r.status ?? 100);
  }
}
