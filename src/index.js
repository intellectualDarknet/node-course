import express from 'express'
import router from './routes/user.routes.js'

const port = 8080
const app = express()

app.use(express.json())
app.use('/api', router)

async function startApp () {
  try {
    app.listen(port, () => {
      console.log('server start!' + port)
    })
  } catch (e) {
    console.log(e)
  }
}

startApp()
