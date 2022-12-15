const { Group } = require('../sequelize/models')

class GroupService {
  async create (login, userId) {
    const createdUser = await Group.create({ login, user_id: userId })
    return createdUser
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
}

module.exports = new GroupService()
