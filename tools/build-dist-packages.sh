#!/bin/bash
set -ex
script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
for tuple in win32-x64 darwin-x64 darwin-arm64 linux-arm64 linux-x64; do
  pushd "./packages/typst-community+typst-$tuple"
    npm run build
  popd
done
