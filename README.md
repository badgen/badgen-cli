# badgen-cli

[![npm version][npm-src]][npm-href]
[![Install size][packagephobia-src]][packagephobia-href]
[![License][license-src]][license-href]

Use the fastest badge generator from your CLI.

## Installation

    $ npm install -g badgen-cli

## Usage

    $ badgen --subject build --status ok --color green > build-ok.svg

## Options

 * `--status`, `-s`<br>
    String, right-hand side of the badge (required)
 * `--subject`, `-j`<br>
    String, left-hand side of the badge
 * `--color`, `-c`<br>
    String, color for the status (color name or RGB hexa value)
 * `--flat`, `-f`<br>
    Boolean, use the flat style badge
 * `--icon`, `-i`<br>
    String, icon before the subject (icon name, image data URI or inferred from the subject)
 * `--icon-width`, `-w`<br>
    Number, width of the icon if not square

## See also

- [badgen](https://github.com/badgen/badgen), the module behind this CLI.

[npm-src]: https://badgen.net/npm/v/badgen-cli
[npm-href]: https://www.npmjs.com/package/badgen-cli
[packagephobia-src]: https://badgen.net/packagephobia/install/badgen-cli
[packagephobia-href]: https://packagephobia.now.sh/result?p=badgen-cli
[license-src]: https://badgen.net/github/license/badgen/badgen-cli
[license-href]: LICENSE
