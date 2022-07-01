
import { window, workspace } from 'vscode'

import { shout } from '../exec'
import { ensureOpen, showText } from '../output'


export async function cmdCIPush() {
  if (!workspace.workspaceFolders) {
    window.showWarningMessage('Open a workspace to run this command.')
    return
  }

  ensureOpen()
  showText('$ ci push\n')

  try {
    await shout(['ci', 'push'])
  } catch (err: any) {
    showText(err.message)
  }
}
