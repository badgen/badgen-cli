const tap = require('tap')
const execa = require('execa')

const check = async (t, params) => {
  const result = await execa('./cli.js', params)
  if (result.stderr) {
    t.fail()
  } else {
    t.matchSnapshot(result.stdout, t.name)
  }
}

tap.test('Output help and version', async t => {
  const { stdout } = await execa('./cli.js', ['--help'])
  t.ok(stdout.includes('Usage'))

  const { stdout: version } = await execa('./cli.js', ['--version'])
  t.equal(version, require('../package.json').version)
})

tap.test('No status', async t => {
  try {
    await execa('./cli.js')
  } catch (error) {
    const { stderr } = error
    t.ok(stderr.includes('status'))
  }
})

tap.test('Status only', async t => {
  await check(t, ['--status', 'ok'])
  t.end()
})

tap.test('Subject and status', async t => {
  await check(t, ['--subject', 'test', '--status', 'ok'])
  t.end()
})

tap.test('Status and color', async t => {
  await check(t, ['--status', 'ok', '--color', 'red'])
  t.end()
})

tap.test('Status and flat', async t => {
  await check(t, ['--status', 'ok', '--flat'])
  t.end()
})

tap.test('Assert icon from subject', async t => {
  await check(t, ['--subject', 'chrome', '--status', 'ok', '--icon'])
  t.end()
})

tap.test('Status and icon', async t => {
  await check(t, ['--status', 'ok', '--icon', 'npm'])
  t.end()
})

tap.test('Subject, status and icon', async t => {
  await check(t, ['--subject', 'test', '--status', 'ok', '--icon', 'git'])
  t.end()
})

tap.test('Override properties', async t => {
  await check(t, ['--subject', 'test', '--status', 'fail', '--color', 'red', '--status', 'ok', '--color', 'green'])
  t.end()
})
