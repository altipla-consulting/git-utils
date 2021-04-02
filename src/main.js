
const vscode = require('vscode')

const { ensureOpen, showText } = require('./output')


function registerCommand(context, name, fn) {
	context.subscriptions.push(vscode.commands.registerCommand(name, async function() {
		try {
			await fn()
		} catch (err) {
			console.error(err)
			ensureOpen()
			showText(`ERROR:\n${err.toString()}`)
			throw err
		}
	}))
}


function activate(context) {
	registerCommand(context, 'git-utils.add', require('./commands/add'))
	registerCommand(context, 'git-utils.commit', require('./commands/commit'))
	registerCommand(context, 'git-utils.amendCommit', require('./commands/amend-commit'))
	registerCommand(context, 'git-utils.unstageAll', require('./commands/unstage-all'))
	registerCommand(context, 'git-utils.unstage', require('./commands/unstage'))
	registerCommand(context, 'git-utils.ciPush', require('./commands/ci-push'))
	registerCommand(context, 'git-utils.diffAll', require('./commands/diff-all'))
	registerCommand(context, 'git-utils.diff', require('./commands/diff'))
	registerCommand(context, 'git-utils.ciUpdate', require('./commands/ci-update'))
}

function deactivate() { }


module.exports = {
	activate,
	deactivate
}
