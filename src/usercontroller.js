const UserService = require('./user-service.js')
const userValidation = require('./validations/user.js')
// const User = require ('./user.js')

class UserController {
  async create (req, res, next) {
    const { error } = userValidation(req.body)

    if (error) {
      console.log('from error', error)
      res.status(400).json(error.message)
    } else {
      try {
        const user = await UserService.create(req.body)
        res.json(user)
      } catch (e) {
        res.status(500).json(e)
      }
    }
  }

  async getAll (req, res) {
    try {
      const users = await UserService.getAll()
      return res.json(users)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAutoSuggestedUsers (req, res) {
    try {
      const users = await UserService.getAutoSuggestedUsers(req.query)
      res.json(users)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getOne (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'Id не указан' })
      }
      const user = await UserService.getOne(id)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update (req, res) {
    const { _id, ...rest } = req.body
    const { error } = userValidation(rest)

    if (error) {
      console.log('from error', error)
      res.status(400).json(error.message)
    } else {
      try {
        const user = req.body
        const updatePost = await UserService.update(user)
        return res.json(updatePost)
      } catch (e) {
        res.status(500).json(e)
      }
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'ID не указан' })
      }
      const user = await UserService.delete(id)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new UserController()
