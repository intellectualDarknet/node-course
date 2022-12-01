const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url)

  res.write('<h1>Hello world</h1>')

  res.end('<h1>Hello Ken</h1>')
})

server.listen(3500, () => {
  console.log('server is running')


})