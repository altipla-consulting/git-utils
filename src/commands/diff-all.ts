import * as fs from 'fs'
import * as path from 'path'

import { gitRoot } from '../paths'
import { git, sh } from '../exec'

export async function cmdDiffAll() {
  let diff = await git(['git', 'diff', '--no-color'])
  let file = path.join(await gitRoot(), '.git', 'all-files.diff')
  fs.writeFileSync(file, diff, 'utf-8')

  await sh(['code', '--wait', file])

  fs.unlinkSync(file)
}
