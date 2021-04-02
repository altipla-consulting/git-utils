
const { shpty } = require('../exec')

const { window } = require('vscode')


module.exports = async function () {
  let output = window.createOutputChannel('Git Utils')
  output.append('$ ci push\n')
  output.show()

  try {
    output.append(await shpty(['ci', 'push']))
  } catch (err) {
    output.append(err.message)
  }
}
