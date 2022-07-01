
import { OutputChannel, window } from 'vscode'


let output: OutputChannel


export function ensureOpen() {
  if (!output) {
    output = window.createOutputChannel('Git Utils')
  }
  output.clear()
}


export function showText(text: string): void {
  if (text) {
    output.append(text)
  }
  output.show()
}


export function appendText(text: string): void {
  output.append(text)
}

