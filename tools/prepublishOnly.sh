#!/bin/bash
set -ex
for tuple in win32-x64 darwin-x64 darwin-arm64 linux-arm64 linux-x64; do
  pushd "./packages/typst-community+typst-$tuple"
  npm publish
  popd
done
