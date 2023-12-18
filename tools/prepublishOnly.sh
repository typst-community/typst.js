#!/bin/bash
set -e
for tuple in win32-x64 darwin-x64 darwin-arm64 linux-arm64 linux-x64; do
  (cd "./out/$tuple" && npm publish)
done
