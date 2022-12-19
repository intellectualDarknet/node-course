const express = require('express')
const UsersRouter = require('./routes/user.routes.js')
const GroupRouter = require('./routes/group.router.js')
const { User } = require('./sequelize/models')
const db = require('./db.js')
const fs = require('fs')
const path = require('path')
const logger = require('../src/logger/logger.js')

const port = 8080
const app = express()

app.use(express.json())

app.use((req, res, next) => {
  next()
})

app.use('/postgres/groups/', GroupRouter)
app.use('/postgres/users/', UsersRouter)
app.use((err, req, res, next) => {
  logger.inform(res.myMethod)
  if (res.e) {
    err.status = 500
    logger.error(`Internal Server Error ${err.status}`)
  }
  next()
});

(async function startApp () {
  try {
    await db.sync({ force: true })
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
