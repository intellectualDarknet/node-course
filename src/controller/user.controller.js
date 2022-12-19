const UserService = require('../services/user.service.js')
// const GroupService = require('../services/group.service.js')
const userValidation = require('../validation/validation.js')

class UserController {
  async createUser (req, res) {
    const { error } = userValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      try {
        const user = await UserService.create(req.body)
        // console.log('user id', user.id)
        // const group = await GroupService.create(req.body.login, user.id)
        // res.status(200).json({ user, group })
        res.status(200).json(user)
      } catch (e) {
        res.status(500).json(e)
      }
    }
  }

  async getAutoSuggestedUsers (req, res) {
    const users = await UserService.getAutoSuggestedUsers(req.query)
    res.status(200).json(users)
  }

  async getUsers (req, res) {
    const users = await UserService.getUsers()
    res.status(200).json(users)
  }

  async getOneUser (req, res) {
    try {
      const user = await UserService.getOneUser(req.params.id)
      if (!user) {
        res.status(404)
      }
      res.status(200).json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async updateUser (req, res) {
    const { error } = userValidation(req.body)
    if (error) {
      console.log('from error', error)
      res.status(400).json(error.message)
    } else {
      try {
        const person = await UserService.update(req.params.id, req.body)
        if (!person) {
          res.status(404)
        }
        res.status(200).json(person)
      } catch (e) {
        res.status(500).json(e)
      }
    }
  }

  async deleteUser (req, res) {
    try {
      const user = await UserService.delete(req.params.id)
      if (!user) {
        res.status(404)
      }
      res.status(200).json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new UserController()
