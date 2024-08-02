import * as fs from 'fs'
import * as path from 'path'

import { window } from 'vscode'

import { gitRoot } from '../paths'
import { git, sh } from '../exec'

export async function cmdDiff() {
  if (!window.activeTextEditor) {
    await window.showWarningMessage('There is no active text editor.')
    return
  }

  let diff = await git(['git', 'diff', '--no-color', window.activeTextEditor.document.fileName])
  let file = path.join(await gitRoot(), '.git', 'current-file.diff')
  fs.writeFileSync(file, diff, 'utf-8')

  await sh(['code', '--wait', file])

  fs.unlinkSync(file)
}
