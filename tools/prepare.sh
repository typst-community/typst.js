#!/bin/bash
set -e
script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
tuple=$(node -p '`${process.platform}-${process.arch}`')
bash "$script_dir/generate-dist-package.sh" "$tuple"
if ! o=$(npm link "./out/$tuple" 2>&1); then
  echo "$o" >&2
  exit 1
fi
