var User = require('../sequelize/models/user.cjs')

class UserService {
  async create (post) {
    const createdUser = await User.create(post)
    return createdUser
  }

  async getAll () {
    const users = await User.find()
    return users
  }

  async getAutoSuggestedUsers ({ loginSubstring = '', limit = 10 }) {
    const users = await User.find({ login: { $regex: loginSubstring, $options: 'i' } }).sort({ login: 1 }).limit(limit)
    return users
  }

  async getOne (id) {
    if (!id) {
      throw new Error('Не указан ID')
    }
    const user = await User.findOne({
      where: {
        id
      }
    })
    return user
  }

  async update (user) {
    if (!user._id) {
      throw new Error('Не указан ID')
    }
    const updateUser = await User.findByIdAndUpdate(user._id, user, { new: true })
    return updateUser
  }

  async delete (id) {
    if (!id) {
      throw new Error('Не указан ID')
    }
    const user = await User.findByIdAndDelete(id)
    return user
  }
}

module.exports = new UserService()
