const User = require('../sequelize/models/user.cjs')

class UserController {
  async createUser (req, res) {
    const user = req.body
    const newPerson = await User.create({
      id: user.id,
      login: user.login,
      password: user.password,
      age: user.age,
      isDeleted: user.isDeleted
    })
    res.json(newPerson.dataValues)
  }

  async getUsers (req, res) {
    const users = await User.findAll()
    res.status(200).json(users)
  }

  async getOneUser (req, res) {
    const id = req.params.id
    const user = await User.findByPk(id)
    res.status(200).json(user)
  }

  async updateUser (req, res) {
    const {
      id,
      login,
      password,
      age,
      isDeleted
    } = req.body
    const user = await User.findByPk(id)

    await user.set({ login, password, age, isDeleted })
    await user.save()
    res.status(200).json(user)
  }

  async deleteUser (req, res) {
    const id = req.params.id
    const user = await User.findByPk(id)
    console.log('user', user)
    await user.destroy()
    console.log('user', user)
    res.status(200).json(user)
  }
}

module.exports = new UserController()
