const { DataTypes, Model } = require('sequelize')
const db = require('../../db.js')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  age: DataTypes.SMALLINT,
  isDeleted: DataTypes.BOOLEAN
}, {
  sequelize: db,
  modelName: 'User',
  underscored: true,
  tableName: 'users'
})

module.exports = { User }
