import http from 'http'

const server = http.createServer((req, res) => {
  res.end('<h1>Hello Ken</h1>')
})

server.listen(3500, () => {
  process.stdin.on('data', (data) => {
    process.stdout.write(data.toString().split('').reverse().join('') + '\n')
  })
})
