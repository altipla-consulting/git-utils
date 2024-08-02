import * as fs from 'fs'
import * as path from 'path'

import { window } from 'vscode'

import { git } from '../exec'
import { gitRoot } from '../paths'

interface File {
  label: string
  description: string
  add: {
    file?: string
    all?: boolean
    untracked?: boolean
  }
}

export async function cmdAdd() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let changes = await git(['git', 'status', '--porcelain'])
    let items: File[] = changes
      .split('\n')
      .filter((change) => !!change)
      .filter((change) => change.charAt(1) !== ' ')
      .map((change) => {
        return {
          label: change.substring(0, 2).trim(),
          description: change.substring(3),
          add: {
            file: change.substring(3),
          },
        }
      })
    if (!items.length) {
      break
    }
    items.unshift({
      label: '+ All Files',
      description: 'including untracked files',
      add: {
        all: true,
        untracked: true,
      },
    })
    items.unshift({
      label: '+ All Files',
      description: 'apart from untracked files',
      add: {
        all: true,
      },
    })

    let selected = await window.showQuickPick(items, {
      matchOnDescription: true,
    })
    if (selected) {
      if (selected.add.file) {
        if (fs.existsSync(path.join(await gitRoot(), selected.add.file))) {
          await git(['git', 'add', '--', selected.add.file])
        } else {
          await git(['git', 'rm', '--', selected.add.file])
        }
      } else if (selected.add.all && selected.add.untracked) {
        await git(['git', 'add', '--all'])
      } else {
        await git(['git', 'add', '--update'])
      }
    } else {
      break
    }
  }
}
