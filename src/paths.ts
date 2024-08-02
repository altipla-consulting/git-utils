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
