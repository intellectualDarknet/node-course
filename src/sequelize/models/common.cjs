const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

class Group extends Model {}

Group.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING

}, {
  sequelize,
  modelName: 'Group',
  underscored: true,
  tableName: 'groups'
})

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  age: DataTypes.NUMBER,
  isDeleted: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'User',
  underscored: true,
  tableName: 'users'
})

// has One - connetion

// User.hasOne(Group, {
//   foreignKey: {
//     name: 'userId',
//     type: DataTypes.UUID
//   }
// })
// Group.belongsTo(User)

// Has Many

// User.hasMany(Group, {
//   foreignKey: {
//     name: 'userId',
//     type: DataTypes.UUID
//   }
// })
// Group.belongsTo(User)

// many to many

User.belongsToMany(Group, { as: 'User', foreignKey: 'UserId', through: 'Users_Groups' })
Group.belongsToMany(User, { as: 'Group', foreignKey: 'FollowedId', through: 'Users_Groups' })

module.exports = { Group, User }
