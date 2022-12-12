const express = require('express')
const router = require('./routes/user.routes.js')
const fs = require('fs')
const path = require('path')
const User = require('./sequelize/models/user.cjs')

const port = 8080
const app = express()

app.use(express.json())
app.use('/postgres', router);

(async function startApp () {
  await User.sync()
  try {
    app.listen(port, () => {
      (async () => {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, '/fakeData/fakeData.json'), 'utf-8'))
        User.bulkCreate(data)
      })()
      console.log('server start! ' + port)
    })
  } catch (e) {
    console.log(e)
  }
})()
