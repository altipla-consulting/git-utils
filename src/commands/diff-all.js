
const path = require('path')
const fs = require('fs')

const { gitRoot } = require('../paths')
const { git, sh } = require('../exec')


module.exports = async function() {
  let diff = await git(['git', 'diff', '--no-color'])
  let file = path.join(await gitRoot(), '.git', 'output.diff')
  fs.writeFileSync(file, diff, 'utf-8')
  
	await sh(['code', '--wait', file])

  fs.unlinkSync(file)
}
