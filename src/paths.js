
const { workspace } = require('vscode')

const { sh } = require('./exec')


async function root() {
  return workspace.workspaceFolders[0].uri.path
}


async function gitRoot() {
  let result = await sh(['git', 'rev-parse', '--show-toplevel'])
  return result.trim()
}


module.exports = {
  root,
  gitRoot,
}


