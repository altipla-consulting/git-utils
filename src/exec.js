
const cp = require('child_process')

const { workspace } = require('vscode')
const { appendText } = require('./output')


async function spawn(cmd, opts, process) {
  if (!opts) {
    opts = {}
  }
  if (!opts.cwd) {
    opts.cwd = workspace.workspaceFolders[0].uri.path
  }
  opts.stdio = ['ignore', 'pipe', 'pipe']

  return new Promise((resolve, reject) => {
    let proc = cp.spawn(cmd[0], cmd.slice(1), opts)
    
    proc.stdout.on('data', data => process(data.toString()))
    proc.stderr.on('data', data => process(data.toString()))
  
    proc.on('close', () => resolve(null))
    proc.on('error', err => reject(err))
  })
}


async function sh(cmd, opts) {
  let output = ''
  await spawn(cmd, opts, data => output += data)
  return output
}


async function shout(cmd, opts) {
  await spawn(cmd, opts, data => {
    appendText(data)
  })
}


async function git(command) {
  let result = await sh(['git', 'rev-parse', '--show-toplevel'])
  return await sh(command, { cwd: result.trim() })
}


module.exports = {
  sh,
  shout,
  git,
}
