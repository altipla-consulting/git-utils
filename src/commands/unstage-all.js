
const { git } = require('../exec')


module.exports = async function() {
  await git(['git', 'restore', '--staged', '.'])
}
