import { git } from '../exec'

export async function cmdUnstageAll() {
  await git(['git', 'restore', '--staged', '.'])
}
