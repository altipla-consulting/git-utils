
const cp = require('child_process')

const { workspace } = require('vscode')


async function sh(cmd, opts) {
  if (!opts) {
    opts = {}
  }
  if (!opts.cwd) {
    opts.cwd = workspace.workspaceFolders[0].uri.path
  }
  opts.stdio = ['ignore', 'pipe', 'pipe']

  return new Promise((resolve, reject) => {
    let proc = cp.spawn(cmd[0], cmd.slice(1), opts)

    let output = ''
    proc.stdout.on('data', data => output += data)
    proc.stderr.on('data', data => output += data)
  
    proc.on('close', () => resolve(output))
    proc.on('error', err => reject(err))
  })
}


async function git(command) {
  let result = await sh(['git', 'rev-parse', '--show-toplevel'])
  return await sh(command, { cwd: result.trim() })
}


module.exports = {
  sh,
  git,
}
