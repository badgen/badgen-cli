#!/usr/bin/env node

const meow = require('meow')
const badgen = require('badgen')
const icons = require('badgen-icons')

const flags = {
    status: {
        type: 'string',
        alias: 's'
    },
    subject: {
        type: 'string',
        alias: 'j',
        default: ''
    },
    color: {
        type: 'string',
        alias: 'c'
    },
    flat: {
        type: 'boolean',
        alias: 'f'
    },
    icon: {
        type: 'string',
        alias: 'i'
    },
    iconWidth: {
        type: 'string',
        alias: 'w'
    }
}

const cli = meow(`
    Usage
        $ badgen <options>

    Options
        --status, -s       (required) Status of the badge, right part
        --subject, -j       Subject of the badge, left part
        --color, -c         Color of the status
        --flat, -f          Use the flat badge style
        --icon, -i          Icon to use
        --icon-width, -w    Width of the icon if not square

    Example
        $ badgen --subject test --status ok --color green --icon terminal --flat > test.svg
`, {
    flags
})

const options = {}

// Normalize flag to keep the last override
// Might be unnecessary when https://github.com/sindresorhus/meow/issues/111 is resolved
Object.keys(flags).forEach(key => {
    let flag = cli.flags[key]

    if (Array.isArray(flag)) {
        flag = flag[flag.length - 1]
    }

    options[key] = flag
})

options.style = options.flat && 'flat'

const icon = icons[options.icon === '' ? options.subject : options.icon]
options.icon = icon && icon.base64 || ''
options.iconWidth = options.iconWidth || icon && icon.width || null

try {
    const svg = badgen(options)
    console.log(svg)
} catch (error) {
    console.error(error.message)
}
