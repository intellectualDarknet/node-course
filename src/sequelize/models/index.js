const { User } = require('./user.cjs')
const { Group } = require('./group.cjs')

Group.belongsToMany(User, { through: 'Users_Groups' })
User.belongsToMany(Group, { through: 'Users_Groups' })

module.exports = {
  User,
  Group
}
