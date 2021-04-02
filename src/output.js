
const { window } = require('vscode')


let output


function ensureOpen() {
  if (!output) {
    output = window.createOutputChannel('Git Utils')
  }
  output.clear()
}


function showText(text) {
  output.append(text)
  output.show()
}


module.exports = {
  ensureOpen,
  showText,
}
