const UserService = require('../services/user.service.js')
const userValidation = require('../validation/validation.js')

class UserController {
  async createUser (req, res, next) {
    res.myMethod = 'UserService createUser'
    const { error } = userValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      try {
        const user = await UserService.create(req.body)
        res.status(200).json(user)
        next(res)
      } catch (e) {
        res.e = e
        next(res)
      }
    }
  }

  async getAutoSuggestedUsers (req, res, next) {
    res.myMethod = 'UserService getAutoSuggestedUsers'
    try {
      const users = await UserService.getAutoSuggestedUsers(req.query)
      res.status(200).json(users)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }

  async getUsers (req, res, next) {
    res.myMethod = 'UserService getUsers'
    try {
      throw new Error('error')
      const users = await UserService.getUsers()
      res.status(200).json(users)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }

  async getOneUser (req, res, next) {
    res.myMethod = 'UserService getOneUser'
    try {
      const user = await UserService.getOneUser(req.params.id)
      if (!user) {
        res.status(404)
      }
      res.status(200).json(user)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }

  async updateUser (req, res, next) {
    res.myMethod = 'UserService updateUser'
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
        next(res)
      } catch (e) {
        res.e = e
        next(res)
      }
    }
  }

  async deleteUser (req, res, next) {
    try {
      res.myMethod = 'UserService deleteUser'
      const user = await UserService.delete(req.params.id)
      if (!user) {
        res.status(404)
      }
      res.status(200).json(user)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }
}

module.exports = new UserController()
