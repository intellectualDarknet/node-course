var Sequelize = require('sequelize')

var db = new Sequelize('node_postgres', 'postgres', '54321', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = db
