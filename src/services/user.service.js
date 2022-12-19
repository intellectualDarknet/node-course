const { User } = require('../sequelize/models')
const { Op } = require('sequelize')

class UserService {
  async create (post) {
    const createdUser = await User.create(post)
    return createdUser
  }

  async getAutoSuggestedUsers ({ loginSubstring = '', limit = 10 }) {
    const users = await User.findAll({
      where: {
        login: {
          [Op.substring]: loginSubstring
        }
      },
      limit
    })
    return users
  }

  getUsers = async function () {
    const users = await User.findAll()
    return users
  }

  async getOneUser (id) {
    const user = await User.findByPk(id)
    return user
  }

  async update (id, body) {
    const {
      login,
      password,
      age,
      isDeleted
    } = body
    const user = await User.findByPk(id)
    await user.set({ login, password, age, isDeleted })
    await user.save()
    return user
  }

  async delete (id) {
    const user = await User.findByPk(id)
    await user.destroy()
    return user
  }
}

module.exports = new UserService()
