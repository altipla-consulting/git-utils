
import * as cp from 'child_process'

import { workspace } from 'vscode'
import { appendText } from './output'


async function spawn(cmd: string[], opts: cp.SpawnOptions | undefined, onData: (data: string) => void) {
  if (!opts) {
    opts = {}
  }
  if (!opts.cwd && workspace.workspaceFolders) {
    opts.cwd = workspace.workspaceFolders[0].uri.path
  }
  opts.stdio = ['ignore', 'pipe', 'pipe']

  return new Promise((resolve, reject) => {
    let proc = cp.spawn(cmd[0], cmd.slice(1), opts || {})
    
    proc.stdout?.on('data', data => onData(data.toString()))
    proc.stderr?.on('data', data => onData(data.toString()))
  
    proc.on('close', () => resolve(null))
    proc.on('error', err => reject(err))
  })
}


export async function sh(cmd: string[], opts?: cp.SpawnOptions) {
  let output = ''
  await spawn(cmd, opts, data => output += data)
  return output
}


export async function shout(cmd: string[], opts?: cp.SpawnOptions) {
  await spawn(cmd, opts, data => appendText(data))
}


export async function git(command: string[]): Promise<string> {
  let result = await sh(['git', 'rev-parse', '--show-toplevel'])
  return await sh(command, { cwd: result.trim() })
}
