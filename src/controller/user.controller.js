const UserService = require('../services/user.service.js')
const userValidation = require('../validation/validation.js')

const catchAsync = require('../utils/catchAsync.js')

class UserController {
  createUser = catchAsync(async (req, res, next) => {
    res.myMethod = 'UserService createUser'
    const { error } = userValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      const user = await UserService.create(req.body)
      res.status(200).json(user)
      next(res)
    }
  })

  getAutoSuggestedUsers = catchAsync(async (req, res, next) => {
    res.myMethod = 'UserService getAutoSuggestedUsers'
    const users = await UserService.getAutoSuggestedUsers(req.query)
    res.status(200).json(users)
    next(res)
  })

  getUsers = catchAsync(async (req, res, next) => {
    res.myMethod = 'UserService getUsers'
    const users = await UserService.getUsers()
    res.status(200).json(users)
    next(res)
  })

  getOneUser = catchAsync(async (req, res, next) => {
    res.myMethod = 'UserService getOneUser'
    const user = await UserService.getOneUser(req.params.id)
    if (!user) {
      res.status(404)
    }
    res.status(200).json(user)
    next(res)
  })

  updateUser = catchAsync(async (req, res, next) => {
    res.myMethod = 'UserService updateUser'
    const { error } = userValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      const person = await UserService.update(req.params.id, req.body)
      if (!person) {
        res.status(404)
      }
      res.status(200).json(person)
      next(res)
    }
  })

  deleteUser = catchAsync(async (req, res, next) => {
    res.myMethod = 'UserService deleteUser'
    const user = await UserService.delete(req.params.id)
    if (!user) {
      res.status(404)
    }
    res.status(200).json(user)
    next(res)
  })
}

module.exports = new UserController()
