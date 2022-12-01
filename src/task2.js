import http from 'http'
import csv from 'csvtojson'
import fs from 'fs'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const server = http.createServer((req, res) => {
  res.end('<h1>Hello Ken</h1>')
})

server.listen(3500, () => {
  fs.writeFileSync('csv.txt', '', function (err, data) {
    if (err) {
      return console.log(err)
    }
  })

  csv()
    .fromFile(__dirname + '../csv/' + 'csv.csv')
    .subscribe((json) => {
      return new Promise((resolve, reject) => {
        const value = JSON.stringify(json)
        fs.appendFileSync(__dirname + '/csv.txt', value + '\n')
        resolve(JSON.stringify(json))
      })
    }, (error) => {
      console.log(error)
    }, () => {

    })
})
