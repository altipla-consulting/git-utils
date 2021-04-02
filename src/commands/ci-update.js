
const { window } = require('vscode')

const { sh } = require('../exec')
const { ensureOpen, showText } = require('../output')


module.exports = async function () {
  let changes = await sh(['git', 'status', '-s'])
  if (changes.length) {
    let result = await window.showWarningMessage('El proyecto tiene cambios. ¿Estás seguro de que deseas borrar todo y actualizar?', 'Borrar y actualizar todo', 'Cancelar')
    if (!result || result === 'Cancelar') {
      return
    }
  }

  ensureOpen()
  showText('$ ci update -f\n')
  showText(await sh(['ci', 'update', '-f']))
}
