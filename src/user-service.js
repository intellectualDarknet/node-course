import User from './user.js'

class UserService {
  async create (post) {
    Object.keys(post).forEach((value) => {
      if (post[value] === undefined || post[value] === '') {
        throw new Error(`отсутствует поле ${value}`)
      }
    })
    if (!post.password.replace(/[^a-z]/g, '').length || !post.password.replace(/[^0-9]/g, '').length) {
      throw new Error('пароль должен содержать как минимум 1 цифру и символ')
    }
    if (post.age < 4 || post.age > 130) {
      throw new Error('введите корректный возраст')
    }

    if (!post.login.includes('@') || !post.login.includes('.') || post.login.length < 6) {
      throw new Error('введите корректный login')
    }
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
    const user = await User.findById(id)
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

export default new UserService()
