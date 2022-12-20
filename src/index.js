const express = require('express')
const UsersRouter = require('./routes/user.routes.js')
const GroupRouter = require('./routes/group.router.js')
const { User } = require('./sequelize/models')
const db = require('./db.js')
const fs = require('fs')
const path = require('path')
const AppError = require('../src/error/error.js')

const wrongPathHandler = require('./controller/error.controller.js')

const port = 8080
const app = express()

app.use(express.json())

app.use('/postgres/groups/', GroupRouter)
app.use('/postgres/users/', UsersRouter)

app.all('*', (req, res, next) => {
  res.status(404).json({
    message: ''
  })
  res.e = res.e = new AppError('wrong path', 404)
  next(res)
})
app.use(wrongPathHandler);

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
