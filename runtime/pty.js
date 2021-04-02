
const pty = require('node-pty')


let args = JSON.parse(process.argv[2])


let proc = pty.spawn(args.cmd[0], args.cmd.slice(1), {
  name: 'xterm-256color',
  cwd: args.cwd,
  env: process.env,
})
proc.onData(function(data) {
  console.log(JSON.stringify({ data }))
})
proc.onExit(function() {
  // console.log(JSON.stringify({data: `exit code: ${e.exitCode}`}))
  // console.log(JSON.stringify({exitCode: e.exitCode}))
  proc.kill()
})
