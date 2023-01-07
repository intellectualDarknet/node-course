const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const DB_URL = process.env.DATABASE_URL1

const Tour = require('../models/tour.model.js')
const tours = fs.readFileSync(path.join(__dirname, '../fakeData/fakeTours.json'), 'utf-8');

(async () => {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    console.log('we are connected')
  } catch (e) {
    console.log(e.message)
  }
  process.exit()
})()

const insertConnect = async () => {
  try {
    await Tour.insertMany(JSON.parse(tours))
    console.log('Succesfully inserted')
  } catch (e) {
    console.log(e)
  }
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('data succesfully deleted')
  } catch (e) {
    console.log(e)
  }
}

switch (process.argv[2]) {
  case '--import': insertConnect()
    break
  case '--delete': deleteData()
    break
  default: break
}

console.log(process.argv[2])

// write in console to bind $ node src/scripts/insert_connect.js --import
