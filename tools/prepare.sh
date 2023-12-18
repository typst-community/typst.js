#!/bin/bash
set -ex
tuple=$(node -p '`${process.platform}-${process.arch}`')
(cd "./packages/typst-community+typst-$tuple" && npm run build)
npm link "./packages/typst-community+typst-$tuple"
