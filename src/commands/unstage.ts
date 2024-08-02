import { window } from 'vscode'

import { git } from '../exec'

export async function cmdUnstage() {
  if (!window.activeTextEditor) {
    await window.showWarningMessage('There is no active text editor.')
    return
  }

  await git(['git', 'restore', '--staged', window.activeTextEditor.document.fileName])
}
