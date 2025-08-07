import { workspace } from 'vscode'

import { sh } from './exec'

export function root(): string {
  if (!workspace.workspaceFolders?.length) {
    return ''
  }
  return workspace.workspaceFolders[0].uri.path
}

export async function gitRoot(): Promise<string> {
  let result = await sh(['git', 'rev-parse', '--show-toplevel'])
  return result.trim()
}

export function isCursor(): boolean {
  return process.argv[0].includes('.cursor-server')
}

export function cliCommand(): string {
  return isCursor() ? 'cursor' : 'code'
}
