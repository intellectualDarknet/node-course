const UserService = require('../services/user.service.js')

class UserController {
  async createUser (req, res) {
    const user = await UserService.create(req.body)
    res.status(200).json(user)
  }

  async getAutoSuggestedUsers (req, res) {
    console.log('reqQuery', req.query)
    const users = await UserService.getAutoSuggestedUsers(req.query)
    res.status(200).json(users)
  }

  async getUsers (req, res) {
    const users = await UserService.getUsers()
    res.status(200).json(users)
  }

  async getOneUser (req, res) {
    const user = await UserService.getOneUser(req.params.id)
    res.status(200).json(user)
  }

  async updateUser (req, res) {
    const person = await UserService.update(req.body)
    res.status(200).json(person)
  }

  async deleteUser (req, res) {
    const user = await UserService.delete(req.params.id)
    res.status(200).json(user)
  }
}

module.exports = new UserController()
