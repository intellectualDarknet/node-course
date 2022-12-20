const express = require('express')
const UsersRouter = require('./routes/user.routes.js')
const GroupRouter = require('./routes/group.router.js')
const { User } = require('./sequelize/models')
const db = require('./db.js')
const fs = require('fs')
const path = require('path')

const wrongPathHandler = require('./controller/path.controller.js')
const generalHandler = require('./controller/general.controller.js')

const port = 8080
const app = express()

app.use(express.json())

app.use('/postgres/groups/', GroupRouter)
app.use('/postgres/users/', UsersRouter)

app.all('*', wrongPathHandler)
app.use(generalHandler);

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
