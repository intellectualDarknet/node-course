import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basename = path.basename(__filename)

const db = {}

export const sequelize = new Sequelize('node_postgres', 'postgres', '54321', {
  host: 'localhost',
  dialect: 'postgres'
})

console.log(__dirname)
console.log(basename)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(async (file) => {
    console.log('path', path.join(__dirname, file))
    const model = await import(path.join(__dirname, file))
    const value = model(sequelize, Sequelize.DataTypes)
    db[model] = value
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
