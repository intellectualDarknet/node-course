const express = require('express')
const UsersRouter = require('./routes/user.routes.js')
const GroupRouter = require('./routes/group.router.js')
const { User } = require('./sequelize/models')

const globalErrorHandler = require('./controller/error.controller.js')

const AppError = require('./custom-error/appError.js')
const db = require('./db.js')
const fs = require('fs')
const path = require('path')
const logger = require('../src/logger/logger.js')

const port = 8080
const app = express()

app.use(express.json())

app.use('/postgres/groups/', GroupRouter)
app.use('/postgres/users/', UsersRouter)

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`
  // })
  const err = new AppError(`Can't find ${req.originalUrl} on server !`, 404)

  next(err)
})

// app.use((err, req, res, next) => {
//   logger.inform(res.myMethod)
//   if (res.e) {
//     console.log(res.e.stack)
//     err.status = 500
//     logger.error(`Internal Server Error ${err.status} \t ${res.e.stack}`)
//   }
//   next()
// });

app.use(globalErrorHandler);

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
