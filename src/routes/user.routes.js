const Router = require('express')
const UserController = require('../controller/user.controller.js')

const UsersRouter = new Router()

UsersRouter.post('', UserController.createUser)
UsersRouter.get('', UserController.getUsers)
UsersRouter.get(':id', UserController.getOneUser)
UsersRouter.put(':id', UserController.updateUser)
UsersRouter.delete(':id', UserController.deleteUser)

module.exports = UsersRouter
