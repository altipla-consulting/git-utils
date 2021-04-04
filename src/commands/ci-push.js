
const { shout } = require('../exec')
const { ensureOpen, showText } = require('../output')


module.exports = async function () {
  ensureOpen()
  showText('$ ci push\n')

  try {
    await shout(['ci', 'push'])
  } catch (err) {
    showText(err.message)
  }
}
