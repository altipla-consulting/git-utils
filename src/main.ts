
import * as vscode from 'vscode'

import { ensureOpen, showText } from './output'
import { cmdCIPush } from './commands/ci-push'
import { cmdAmendCommit } from './commands/amend-commit'
import { cmdUnstageAll } from './commands/unstage-all'
import { cmdAdd } from './commands/add'
import { cmdCommit } from './commands/commit'
import { cmdUnstage } from './commands/unstage'
import { cmdDiffAll } from './commands/diff-all'
import { cmdDiff } from './commands/diff'
import { cmdCIUpdate } from './commands/ci-update'


function registerCommand(context: vscode.ExtensionContext, name: string, fn: () => Promise<void>): void {
  context.subscriptions.push(vscode.commands.registerCommand(name, async function() {
    try {
      await fn()
    } catch (err: any) {
      console.error(err)
      ensureOpen()
      showText(`ERROR:\n${err.toString()}`)
      throw err
    }
  }))
}


export function activate(context: vscode.ExtensionContext) {
  registerCommand(context, 'git-utils.add', cmdAdd)
  registerCommand(context, 'git-utils.commit', cmdCommit)
  registerCommand(context, 'git-utils.amendCommit', cmdAmendCommit)
  registerCommand(context, 'git-utils.unstageAll', cmdUnstageAll)
  registerCommand(context, 'git-utils.unstage', cmdUnstage)
  registerCommand(context, 'git-utils.ciPush', cmdCIPush)
  registerCommand(context, 'git-utils.diffAll', cmdDiffAll)
  registerCommand(context, 'git-utils.diff', cmdDiff)
  registerCommand(context, 'git-utils.ciUpdate', cmdCIUpdate)
}

export function deactivate() {
  // empty
}
