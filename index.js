const http = require('http')
const csv=require('csvtojson')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.end('<h1>Hello Ken</h1>')
})

server.listen(3500, () => {


})
