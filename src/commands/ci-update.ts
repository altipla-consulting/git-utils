
import { window, workspace } from 'vscode'

import { shout, sh } from '../exec'
import { ensureOpen, showText } from '../output'


export async function cmdCIUpdate() {
  if (!workspace.workspaceFolders) {
    window.showWarningMessage('Open a workspace to run this command.')
    return
  }

  let changes = await sh(['git', 'status', '-s'])
  if (changes.length) {
    let result = await window.showWarningMessage('There are local changes that will be LOST. Are you sure you want to proceed?', 'Delete and update everything', 'Cancel')
    if (!result || result === 'Cancel') {
      return
    }
  }

  ensureOpen()
  showText('$ ci update -f\n')
  await shout(['ci', 'update', '-f'])
}
