const express = require('express')
const router = require('./routes/user.routes.js')
const GroupRouter = require('./routes/group.router.js')
const { User, Group } = require('./sequelize/models/common.cjs')
const db = require('./sequelize/models/db.cjs')

const port = 8080
const app = express()

app.use(express.json())
app.use('/postgres', router)
app.use('/postgres', GroupRouter);

(async function startApp () {
  await db.authenticate()
  await User.sync()
  await Group.sync()
  try {
    app.listen(port)
    // app.listen(port, () => {
    //   (async () => {
    //     const data = JSON.parse(fs.readFileSync(path.join(__dirname, '/fakeData/fakeData.json'), 'utf-8'))
    //     User.bulkCreate(data)
    //   })()
    //   console.log('server start! ' + port)
    // })
  } catch (e) {
    console.log(e)
  }
})()
