
const path = require('path')
const fs = require('fs')

const { gitRoot } = require('../paths')
const { git, sh } = require('../exec')
const { ensureOpen, showText } = require('../output')


const SEPARATOR = '# --------------'


module.exports = async function () {
  let lines = [
    await git(['git', 'log', '-n', '1', '--format=format:%B']),
    SEPARATOR,
    '# Please enter the commit message for your changes. Everything below',
    '# this paragraph is ignored, and an empty message aborts the commit.',
    '# Just close the window to accept your message.',
    await git(['git', 'diff', '--staged', '--no-color']),
  ]
  let file = path.join(await gitRoot(), '.git', 'COMMIT_EDITMSG')
  fs.writeFileSync(file, lines.join('\n'), 'utf-8')

  await sh(['code', '--wait', file])

  let msg = fs.readFileSync(file, 'utf-8')
  if (!msg.includes(SEPARATOR)) {
  } else {
    msg = msg.substring(0, msg.indexOf(SEPARATOR)).trim()
  }

  fs.writeFileSync(file, msg, 'utf-8')
  ensureOpen()
  try {
    showText(await sh(['git', 'commit', '--amend', '-F', file]))
  } catch (err) {
    showText(err.message)
  } finally {
    fs.unlinkSync(file)
  }
}
