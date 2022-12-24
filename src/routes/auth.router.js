const Router = require('express')
const AuthController = require('../controller/auth.controller.js')
const AuthRouter = new Router()

AuthRouter.post('', AuthController.signup)
AuthRouter.post('', AuthController.login)
AuthRouter.get('', AuthController.getAllUsers)
AuthRouter.delete('/:id', AuthController.deleteUser)
// AuthRouter.get('/:id', AuthController.getOneGroup)
// AuthRouter.put('/:id', AuthController.updateGroup)
// AuthRouter.delete('/:id', AuthController.deleteGroup)
// AuthRouter.put('/:id/add-users', AuthController.addUserToGroup)

module.exports = AuthRouter
