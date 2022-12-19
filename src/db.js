const Sequelize = require('sequelize')

const db = new Sequelize('mydb', 'postgres', '54321', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = db
