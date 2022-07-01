
import { window } from 'vscode'

import { git } from '../exec'


export async function cmdUnstage() {
  await git(['git', 'restore', '--staged', window.activeTextEditor.document.fileName])
}
