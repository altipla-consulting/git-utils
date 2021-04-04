
const { window } = require('vscode')


let output


function ensureOpen() {
  if (!output) {
    output = window.createOutputChannel('Git Utils')
  }
  output.clear()
}


function showText(text) {
  if (text) {
    output.append(text)
  }
  output.show()
}


function appendText(text) {
  output.append(text)
}


module.exports = {
  ensureOpen,
  showText,
  appendText,
}
