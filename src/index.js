const express = require('express')

const db = require('./db.js')
const fs = require('fs')
const path = require('path')

const UsersRouter = require('./routes/user.routes.js')
const GroupRouter = require('./routes/group.router.js')
const AuthRouter = require('./routes/auth.router.js')
const { User } = require('./sequelize/models')
const logger = require('./logger/logger')

const wrongPathHandler = require('./controller/path.controller.js')
const generalHandler = require('./controller/general.controller.js')

const port = 8080
const app = express()

process.on('uncaughtException', err => {
  logger.error(`${err.name} ${err.message}`)
  logger.inform('UNCAUGHT EXCEPTION! Shutting down...')
  process.exit(1)
})

app.use(express.json())
// app.use((req, res, next) => {
//   console.log(b)
//   next()
// })
app.use('/postres/user/', AuthRouter)
app.use('/postgres/groups/', GroupRouter)
app.use('/postgres/users/', UsersRouter)

app.all('*', wrongPathHandler)
app.use(generalHandler)
let server;

(async function startApp () {
  try {
    await db.sync({ force: true })
    server = app.listen(port, () => {
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

process.on('unhandledRejection', err => {
  logger.error(`${err.name} ${err.message}`)
  logger.inform('UNHANDLER REJECTION! Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})

// import express from 'express'
// import mongoose from 'mongoose'
// import router from './router.js'

// const port = 5000
// const DB_URL = 'mongodb+srv://ladyblaumeux24:4057321qwe@cluster0.od2acyz.mongodb.net/?retryWrites=true&w=majority'

// const app = express()

// app.use(express.json())
// app.use('/api', router)

// async function startApp () {
//   try {
//     await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
//     app.listen(port, () => {
//       console.log('server start!' + port)
//     })
//   } catch (e) {
//     console.log(e)
//   }
// }

// startApp()
