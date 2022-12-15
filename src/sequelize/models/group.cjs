const { DataTypes, Model } = require('sequelize')
const db = require('../../db.js')

class Group extends Model {}

Group.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: DataTypes.STRING,
  login: DataTypes.STRING
}, {
  sequelize: db,
  modelName: 'Group',
  underscored: true,
  tableName: 'groups'
})

module.exports = { Group }
