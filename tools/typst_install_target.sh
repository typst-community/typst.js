#!/bin/bash
set -ex

case $2 in
    "win32-x64") target="x86_64-pc-windows-msvc";;
    "darwin-x64") target="x86_64-apple-darwin";;
    "darwin-arm64") target="aarch64-apple-darwin";;
    "linux-arm64") target="aarch64-unknown-linux-musl";;
    "linux-x64") target="x86_64-unknown-linux-musl";;
esac

case $2 in
    "win32-x64") archive_ext=".zip";;
    *) archive_ext=".tar.xz";;
esac

case $2 in
    "win32-x64") exe_ext=".exe";;
    *) exe_ext="";;
esac

folder="typst-$target"
file="$folder$archive_ext"

typst_install="${TYPST_INSTALL:-$HOME/.typst}"
mkdir -p "$typst_install"

if [ -n "$1" ]; then
    url="https://github.com/typst/typst/releases/download/v$1/$file"
else
    url="https://github.com/typst/typst/releases/latest/download/$file"
fi

echo "Downloading Typst from $url"
curl -fsSL "$url" -o "$typst_install/$file"
if [ "$archive_ext" = ".zip" ]; then
    unzip -d "$typst_install" -o "$typst_install/$file"
else
    tar -xJf "$typst_install/$file" -C "$typst_install"
fi
rm -f "$typst_install/$file"

mkdir -p "$typst_install/bin"
mv -f "$typst_install/$folder/typst$exe_ext" "$typst_install/bin/typst$exe_ext"
chmod +x "$typst_install/bin/typst$exe_ext"

mv -f "$typst_install/$folder"/* "$typst_install"
rm -rf "${typst_install:?}/$folder"

echo "Typst $2 installed to $typst_install/bin/typst"
