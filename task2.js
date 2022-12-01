const http = require('http')
const csv = require('csvtojson')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.end('<h1>Hello Ken</h1>')
})
  
server.listen(3500, () => {
  
  fs.writeFileSync('csv.txt', '', function (err,data) {
    if (err) {
      return console.log(err);
    }
  });
  
  csv()
    .fromFile(__dirname + '/csv/' + 'csv.csv')
    .subscribe((json)=> {
     return new Promise((resolve,reject)=>{
         const value = JSON.stringify(json)
         fs.appendFileSync(__dirname + '/csv.txt', value +'\n')
         resolve(JSON.stringify(json))
     })
    },(error) => {
      console.log(error)
    },() => {
  
    });
    
})