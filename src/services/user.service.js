var User = require('../sequelize/models/user.cjs')
const { Op } = require('sequelize')

class UserService {
  async create (post) {
    const createdUser = await User.create(post)
    return createdUser
  }

  async getAutoSuggestedUsers ({ loginSubstring = '', limit = 10 }) {
    console.log('query', loginSubstring, limit)
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

  async getUsers () {
    const users = await User.findAll()
    return users
  }

  async getOneUser (id) {
    if (!id) {
      throw new Error('Не указан ID')
    }
    const user = await User.findByPk(id)
    return user
  }

  async update (body) {
    if (!body.id) {
      throw new Error('Не указан ID')
    }
    const {
      id,
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
    if (!id) {
      throw new Error('Не указан ID')
    }
    const user = await User.findByPk(id)
    await user.destroy()

    return user
  }
}

module.exports = new UserService()
