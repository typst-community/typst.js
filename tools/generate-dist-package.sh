#!/usr/bin/env node
set -e
script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)

[[ -n $npm_package_version ]] || npm_package_version=$(npm pkg get version | jq -r)
[[ -n $npm_package_homepage ]] || npm_package_homepage=$(npm pkg get homepage | jq -r)
[[ -n $npm_package_license ]] || npm_package_license=$(npm pkg get license | jq -r)

version=$(echo "$npm_package_version" | grep -Eo '[0-9]{1,}.[0-9]{1,}.[0-9]{1,}')

generate_dist_package() (
    rm -rf "./out/$1"
    mkdir -p "./out/$1"

    os=$(echo "$1" | cut -d'-' -f1)
    arch=$(echo "$1" | cut -d'-' -f2)

    if [[ $os == win32 ]]; then
      exe_ext='.exe'
    fi

    cat <<EOF > "./out/$1/package.json"
{
  "name": "@typst-community/typst-$1",
  "version": "$npm_package_version",
  "exports": "./.typst/bin/typst$exe_ext",
  "os": ["$os"],
  "arch": ["$arch"],
  "license": "$npm_package_license",
  "homepage": "$npm_package_homepage"
}
EOF
  cp LICENSE "./out/$1/LICENSE"
  cat <<EOF > "./out/$1/README.md"
This is a distribution package for $1.
See $npm_package_homepage for more information.
EOF

  export TYPST_INSTALL="./out/$1/.typst"
  bash "$script_dir/typst_install_target.sh" "$version" "$1"
)


if [[ -z $1 || $1 == '--all' ]]; then
  for tuple in win32-x64 darwin-x64 darwin-arm64 linux-arm64 linux-x64; do
    generate_dist_package "$tuple"
  done
else
  generate_dist_package "$1"
fi
