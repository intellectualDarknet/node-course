const UserService = require('../services/user.service.js')
const userValidation = require('../validation/validation.js')
const logger = require('../logger/logger.js')

class UserController {
  async createUser (req, res, next) {
    logger.inform('UserService.createUser')
    const { error } = userValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      try {
        const user = await UserService.create(req.body)
        res.status(200).json(user)
      } catch (e) {
        next(e)
      }
    }
  }

  async getAutoSuggestedUsers (req, res, next) {
    try {
      const users = await UserService.getAutoSuggestedUsers(req.query)
      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }

  async getUsers (req, res, next) {
    try {
      throw new Error()
      const users = await UserService.getUsers()
      res.status(200).json(users)
      res.myMethod = 'UserService getUsers'
      console.log(res.myMethod)
      next(res)
    } catch (e) {
      next(e)
    }
  }

  async getOneUser (req, res, next) {
    logger.inform(`UserService.getOneUser ${req.params.id}`)
    try {
      const user = await UserService.getOneUser(req.params.id)
      if (!user) {
        res.status(404)
      }
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }

  async updateUser (req, res, next) {
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
        next(e)
      }
    }
  }

  async deleteUser (req, res, next) {
    try {
      const user = await UserService.delete(req.params.id)
      if (!user) {
        res.status(404)
      }
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
