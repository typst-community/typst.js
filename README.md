# Typst

📦 Typst for JavaScript

<table align=center><td>

```sh
# ✨ Use Typst right away through the power of npx! 🚀
npx typst --help
npx typst compile example.typ example.pdf
npx typst query example.typ "<note>"
#=> [ { "func": "metadata", "value": "This is a note" } ]
```

<tr><td>

```js
// 👨‍💻 Or use the JavaScript API (with types!)
import * as typst from "typst";
await typst.compile("example.typ", "example.pdf");
console.log(await typst.query("example.typ", "<note>"));
//=> [ { func: 'metadata', value: 'This is a note' } ]
```

</table>

<p align=center>
  <a href="https://typst.community/typst.js/">Docs</a>
  | <a href="https://github.com/typst-community/typst.js">GitHub</a>
  | <a href="https://typst.app/">Typst</a>
</p>

👨‍💻 Includes the Typst CLI so you can `npx typst` \
💻 Provides a typed JavaScript API so you can `typst.compile()` \
📑 Install it locally with `npm install --save` as a project-level dependency \
🌎 Or install it globally with `npm install --global`

[**📑 Make sure you check out the official Typst website!**](https://typst.app/)

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

You can install Typst using your favorite npm package manager like npm, [Yarn], [pnpm], or [Bun].

```sh
npm install typst
```

If you're using Deno you can import Typst straight from `npm:typst`.

```js
import * as typst from "npm:typst";
```

🛑 Typst does not yet work in the browser. WASM support is planned.

Supported native platforms: Windows x64, macOS x64, macOS ARM64, Linux x64, Linux ARM64

## Usage

![Windows](https://img.shields.io/static/v1?style=for-the-badge&message=Windows&color=0078D4&logo=Windows&logoColor=FFFFFF&label=)
![macOS](https://img.shields.io/static/v1?style=for-the-badge&message=macOS&color=000000&logo=macOS&logoColor=FFFFFF&label=)
![Linux](https://img.shields.io/static/v1?style=for-the-badge&message=Linux&color=222222&logo=Linux&logoColor=FCC624&label=)
![Terminal](https://img.shields.io/static/v1?style=for-the-badge&message=Terminal&color=4D4D4D&logo=Windows+Terminal&logoColor=FFFFFF&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

This package provides both the Typst CLI as well as a JavaScript API. To use the
CLI, just run `npx typst --help`.

```
The Typst compiler

Usage: typst [OPTIONS] <COMMAND>

Commands:
  compile  Compiles an input file into a supported output format [aliases: c]
  watch    Watches an input file and recompiles on changes [aliases: w]
  query    Processes an input file to extract provided metadata
  fonts    Lists all discovered fonts in system and custom font paths
  update   Self update the Typst CLI
  help     Print this message or the help of the given subcommand(s)

Options:
  -v, --verbosity...  Sets the level of logging verbosity: -v = warning & error, -vv = info, -vvv = debug, -vvvv = trace
      --cert <CERT>   Path to a custom CA certificate to use when making network requests [env: TYPST_CERT=]
  -h, --help          Print help
  -V, --version       Print version
```

<sup>ℹ The `typst update` command will fail. Use `npm install typst@latest` to update it through npm.</sup>

All of the major Typst CLI commands are also exposed for use in JavaScript:

```js
import * as typst from "typst";
await typst.query("example.typ", "<note>"); //=> object[]
await typst.compile("example.typ", "example.pdf");
await typst.watch("example.typ", "example.pdf");
await typst.fonts(); //=> string[]
await typst.help(); //=> string
await typst.version(); //=> string
```

[📚 Check out the Typst JavaScript API documentation for more details!](https://typst.community/typst.js/)

### Example

<img align=right width=400 src="https://i.imgur.com/24wiUGN.png">

```typst
#set page(width: 10cm, height: auto)
#set heading(numbering: "1.")

= Fibonacci sequence
The Fibonacci sequence is defined through
the recurrence relation $F_n = F_(n-1) + F_(n-2)$.
It can also be expressed in _closed form:_

$ F_n = round(1 / sqrt(5) phi.alt^n), quad
  phi.alt = (l + sqrt(5)) / 2 $

#let count = 8
#let nums = range(1, count + 1)
#let fib(n) = (
  if n <= 2 { 1 }
  else { fib(n - 1) + fib(n - 2) }
)

The first #count numbers of the sequence are:

#align(center, table(
  columns: count,
  ..nums.map(n => $F_#n$),
  ..nums.map(n => str(fib(n))),
))
```

```sh
typst compile example.typ
$BROWSER example.pdf
```

## Development

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)

This package contains two primary parts: a binary redistribution setup using a
bunch of `optionalDependencies` and a bunch of pretty `typst ...` CLI wrapper
functions.

When you clone this repository and run `npm install`, it auto runs the
`tools/generate-dist-package` script with your current `$OS-$ARCH` tuple and
uses `npm link` to link that to the current workspace. This is for debugging.

To bump the version, use `npm version --no-git-tag-version $NEW_VERSION` so that
the `tools/postversion.js` script gets run to realign the `optionalDependencies`
with the new `version` field. You can do this manually if you prefer. 🤷‍♂️

Then, when you want to create a new release, remember to run `npm run build`
_after_ the `version` field has been updated (it gets used in the build step). This will generate a bunch of `out/$OS-$ARCH/` folders, each of which is a targeted distribution of a native binary that only works on that platform.

Then finally when you run `npm publish`, there's a hook to publish all the `out/$OS-$ARCH/` packages (`@typst-community/typst-$OS-$ARCH`) _before_ finally publishing the root `typst` package.
