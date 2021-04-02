
const { git } = require('../exec')

const { window } = require('vscode')


module.exports = async function() {
  await git(['git', 'restore', '--staged', window.activeTextEditor.document.fileName])
}
