
const { window, workspace } = require('vscode')

const { shout } = require('../exec')
const { ensureOpen, showText } = require('../output')


module.exports = async function () {
  if (!workspace.workspaceFolders) {
    window.showWarningMessage('Open a workspace to run this command.')
    return
  }

  ensureOpen()
  showText('$ ci push\n')

  try {
    await shout(['ci', 'push'])
  } catch (err) {
    showText(err.message)
  }
}
