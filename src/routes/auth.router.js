const Router = require('express')
const AuthController = require('../controller/auth.controller.js')
const AuthRouter = new Router()

AuthRouter.post('', AuthController.signup)
AuthRouter.post('', AuthController.login)
AuthRouter.get('', AuthController.getAllUsers)
AuthRouter.delete('/:id', AuthController.deleteUser)
AuthRouter.put('', AuthController.updateUser)
AuthRouter.post('/forget', AuthController.forgotPassword)

module.exports = AuthRouter
