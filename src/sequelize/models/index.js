const { User } = require('./user.cjs')
const { Group } = require('./group.cjs')

Group.belongsToMany(User, { as: 'Group', foreignKey: 'FollowedId', through: 'Users_Groups' })
User.belongsToMany(Group, { as: 'User', foreignKey: 'UserId', through: 'Users_Groups' })

module.exports = {
  User,
  Group
}
