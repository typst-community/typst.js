#!/bin/bash
set -ex
tuple=$(node -p '`${process.platform}-${process.arch}`')
npm link "./packages/typst-community+typst-$tuple"
