const { Group, User } = require('../sequelize/models')

class GroupService {
  async create (group) {
    const createdGroup = await Group.create(group)
    return createdGroup
  }

  async getGroups () {
    const users = await Group.findAll()
    return users
  }

  async getOneGroup (id) {
    const user = await Group.findByPk(id)
    return user
  }

  async update (id, body) {
    const {
      name,
      permissions
    } = body
    const user = await Group.findByPk(id)
    await user.set({ name, permissions })
    await user.save()
    return user
  }

  async delete (id) {
    const user = await Group.findByPk(id)
    await user.destroy()
    return user
  }

  async addUserToGroup (groupId, userIds) {
    const group = await Group.findByPk(groupId)
    const users = await User.findAll({
      where: {
        id: userIds
      }
    })

    await group.addUsers(users)
    const groupUsers = await group.getUsers()
    return groupUsers
  }
}

module.exports = new GroupService()
