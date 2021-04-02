
const { sh } = require('../exec')
const { ensureOpen, showText } = require('../output')


module.exports = async function () {
  ensureOpen()
  showText('$ ci push\n')

  try {
    showText(await sh(['ci', 'push']))
  } catch (err) {
    showText(err.message)
  }
}
