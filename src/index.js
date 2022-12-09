import express from 'express'
import router from './routes/user.routes.js'
import db from './db.js'
import fs from 'fs'
import path from 'path'
import * as url from 'url'

// const fakedata = [
//   {
//     id: '101',
//     login: 'blaumeux@gmail.com',
//     password: 'qwert56',
//     age: '12',
//     isDeleted: true
//   },
//   {
//     id: '102',
//     login: 'billy@gmail.com',
//     password: 'qweewqawd',
//     age: '13',
//     isDeleted: true
//   },
//   {
//     id: '103',
//     login: 'servey@gmail.com',
//     password: 'qwert56dd',
//     age: '18',
//     isDeleted: true
//   },
//   {
//     id: '104',
//     login: 'epam@gmail.com',
//     password: 'glitterdb',
//     age: '5',
//     isDeleted: true
//   },
//   {
//     id: '105',
//     login: 'lucan@gmail.com',
//     password: 'asefff12bd',
//     age: '23',
//     isDeleted: true
//   }
// ]
const port = 8080
const app = express()

app.use(express.json())
app.use('/api', router)

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

async function startApp () {
  try {
    app.listen(port, () => {
      (async () => {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname + '/fakeData/fakeData.json'), 'utf-8'))
        await db.query(`CREATE TABLE IF NOT EXISTS USERS (
          Id serial PRIMARY KEY UNIQUE,
	        Login VARCHAR ( 50 ) UNIQUE NOT NULL,
	        Password VARCHAR ( 50 ) NOT NULL,
	        Age INTEGER NOT NULL,
	        IsDeleted BOOLEAN NOT NULL
        )`)
        await db.query('DELETE FROM USERS')
        await db.query(`
          INSERT INTO USERS (Id, Login, Password, Age, IsDeleted)
          VALUES
          ${data.map((obj) => `(${Object.values(obj).map((value) => typeof value === 'string' ? ('\'' + value + '\'') : value).join(', ')})`).join(', ')}
        `)
      })()
      console.log('server start! ' + port)
    })
  } catch (e) {
    console.log(e)
  }
}

startApp()
