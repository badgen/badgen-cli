#!/usr/bin/env node

const mri = require('mri')
const { badgen } = require('badgen')
const icons = require('badgen-icons')

const help = `
  Usage
      $ badgen <options>

  Options
      -s, --status <text>            Status of the badge, right part (required)
      -j, --subject <text>           Subject of the badge, left part
      -c, --color <RGB / ColorName>  Color of the status
      -f, --flat                     Use the flat badge style
      -i, --icon [<IconName>]        Icon to use
      -w, --icon-width <Number>      Width of the icon if not square

  Example
      $ badgen --subject test --status ok --color green --icon terminal --flat > test.svg
`

const args = mri(process.argv.slice(2), {
  string: ['status', 'subject', 'color', 'icon', 'icon-width'],
  boolean: ['flat', 'help', 'version'],
  alias: {
    s: 'status',
    j: 'subject',
    c: 'color',
    f: 'flat',
    i: 'icon',
    w: 'icon-width',
    h: 'help',
    v: 'version'
  }
})

if (args.help) {
  console.log(help)
  process.exit()
}

if (args.version) {
  console.log(require('./package.json').version)
  process.exit()
}

try {
  if (!args.status) {
    throw new Error('`--status` is required.')
  }

  const opts = createBadgenOptions(args)
  const svg = badgen(opts)
  console.log(svg)
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

function createBadgenOptions (args) {
  const { status, subject = '', color, flat, icon, 'icon-width': iconWidth } = args

  const options = {
    status,
    subject,
    color,
    flat,
    icon,
    iconWidth
  }

  // Normalize flag to keep the last override
  Object.keys(options).forEach(key => {
    const flag = options[key]

    if (Array.isArray(flag)) {
      options[key] = flag[flag.length - 1]
    }
  })

  options.style = options.flat && 'flat'

  const matchedIcon = icons[options.icon === '' ? options.subject : options.icon]
  options.icon = (matchedIcon && matchedIcon.base64) || ''
  options.iconWidth = options.iconWidth || (matchedIcon && matchedIcon.width) || null

  return options
}
