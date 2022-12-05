import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'

const port = 5000
const DB_URL = 'mongodb+srv://ladyblaumeux24:4057321qwe@cluster0.od2acyz.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(express.json())
app.use('/api', router)

async function startApp () {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(port, () => {
      console.log('server start!' + port)
    })
  } catch (e) {
    console.log(e)
  }
}

startApp()
