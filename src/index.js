const express = require('express')
const router = require('./routes/user.routes.js')
// const fs = require('fs')
// const path = require('path')
// const url = require('url')
// const db = require('./sequelize/models/db.cjs')
const User = require('./sequelize/models/user.cjs')

const port = 8080
const app = express()

app.use(express.json())
app.use('/postgres', router);

// const dbStart = async () => {
//   await db.query(`CREATE TABLE IF NOT EXISTS users (
//     Id serial PRIMARY KEY UNIQUE,
//     Login VARCHAR ( 50 ) UNIQUE NOT NULL,
//     Password VARCHAR ( 50 ) NOT NULL,
//     Age INTEGER NOT NULL,
//     IsDeleted BOOLEAN NOT NULL,
//     created_at VARCHAR ( 50 ),
//     updated_at VARCHAR ( 50 )
//   )`)
// }

(async function startApp () {
  await User.sync()
  try {
    app.listen(port, () => {
      // (async () => {
      //   const data = JSON.parse(fs.readFileSync(path.join(__dirname, '/fakeData/fakeData.json'), 'utf-8'))
      //   await db.query(`CREATE TABLE IF NOT EXISTS users (
      //     Id serial PRIMARY KEY UNIQUE,
      //     Login VARCHAR ( 50 ) UNIQUE NOT NULL,
      //     Password VARCHAR ( 50 ) NOT NULL,
      //     Age INTEGER NOT NULL,
      //     IsDeleted BOOLEAN NOT NULL
      //   )`)
      //   await db.query('DELETE FROM users')
      //   await db.query(`
      //     INSERT INTO users (Id, Login, Password, Age, IsDeleted)
      //     VALUES
      //     ${data.map((obj) => `(${Object.values(obj).map((value) => typeof value === 'string' ? ('\'' + value + '\'') : value).join(', ')})`).join(', ')}
      //   `)
      // })()
      console.log('server start! ' + port)
    })
  } catch (e) {
    console.log(e)
  }
})()
