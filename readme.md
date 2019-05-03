# Badgen-cli

Use the fastest badge generator from your CLI.

## Installation

    $ npm install -g badgen-cli

## Usage

    $ badgen --subject build --status ok --color green > build-ok.svg

## Options

 * `--status`, `-s`<br>
    (required) String, Right-hand side of the badge
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

[Badgen](https://github.com/badgen/badgen), the module behind this CLI.

## License

[ISC](license)
