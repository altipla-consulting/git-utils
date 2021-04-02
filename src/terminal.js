
const normalizeNewline = require('normalize-newline')
const { window, EventEmitter, ExtensionTerminalOptions: _ExtensionTerminalOptions, commands } = require('vscode')


let messages = []


function ensureOpen() {
  let terminal = window.terminals.find(t => t.name === 'Git Utils')
  if (!terminal) {
    let writeEmitter = new EventEmitter()
    // /** @type {_ExtensionTerminalOptions} */
    let terminalOpts = {
      name: 'Git Utils',
      pty: {
        onDidWrite: writeEmitter.event,
        open: () => {
          messages.forEach(msg => writeEmitter.fire(msg))
          // @ts-ignore
          messages.push = msg => writeEmitter.fire(msg)
        },
        close: () => { },
      },
    }
    terminal = window.createTerminal(terminalOpts)
  } else {
    messages.push('\x1b[2J\x1b[3J\x1b[;H')
  }
}


function writeTerminal(msg) {
  messages.push(normalizeNewline(msg).replace(/\n/g, '\r\n'))
}


function showTerminal() {
  let terminal = window.terminals.find(t => t.name === 'Git Utils')
  if (terminal) {
    terminal.show()
    setTimeout(() => {
      commands.executeCommand('workbench.action.terminal.kill')
    }, 4000)
  }
}


module.exports = {
  ensureOpen,
  writeTerminal,
  showTerminal,
}
