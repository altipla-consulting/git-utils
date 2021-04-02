
const cp = require('child_process')
const stripColor = require('strip-color')

const { workspace } = require('vscode')


async function sh(cmd, opts) {
  if (!opts) {
    opts = {}
  }
  if (!opts.cwd) {
    opts.cwd = workspace.workspaceFolders[0].uri.path
  }

  return new Promise((resolve, reject) => {
    let proc = cp.spawn(cmd[0], cmd.slice(1), opts)
  
    let output = ''
    proc.stdout.on('data', data => output += data)
    proc.stderr.on('data', data => output += data)
  
    proc.on('close', () => resolve(output))
    proc.on('error', err => reject(err))
  })
}


function shpty(cmd, opts) {
  if (!opts) {
    opts = {}
  }
  if (!opts.cwd) {
    opts.cwd = workspace.workspaceFolders[0].uri.path
  }

  return new Promise((resolve, reject) => {
    let args = [
      require.resolve('../runtime/pty.js'),
      JSON.stringify({
        cwd: opts.cwd,
        cmd: cmd,
      })
    ]
    let proc = cp.spawn('node', args)

    let output = ''
    proc.stdout.on('data', data => output += data)
    proc.stderr.on('data', data => output += data)
    
    proc.on('exit', () => {
      output = output
        .split('\n')
        .map(line => {
          if (line === '') {
            return {data: ''}
          }

          try {
            return JSON.parse(line)
          } catch (err) {
            return {data: line}
          }
        })
        .map(line => stripColor(line.data))
        .join('')
      resolve(output)
    })
    proc.on('error', err => reject(err))
  })
}


async function git(command) {
  let result = await sh(['git', 'rev-parse', '--show-toplevel'])
  return await sh(command, { cwd: result.trim() })
}


module.exports = {
  sh,
  shpty,
  git,
}
