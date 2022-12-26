const Router = require('express')
const UserController = require('../controller/user.controller.js')
const AuthController = require('../controller/auth.controller')

const UsersRouter = new Router()

UsersRouter.post('', AuthController.protect, UserController.createUser)
UsersRouter.get('', UserController.getUsers)
UsersRouter.get('/:id', UserController.getOneUser)
UsersRouter.put('/:id', UserController.updateUser)
UsersRouter.delete('/:id', AuthController.protect, AuthController.restrictTo('admin'), UserController.deleteUser)

module.exports = UsersRouter
