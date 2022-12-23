const Router = require('express')
const AuthController = require('../controller/auth.controller.js')
const AuthRouter = new Router()

AuthRouter.post('/signup', AuthController.signup)
// AuthRouter.get('', AuthController.getGroups)
// AuthRouter.get('/:id', AuthController.getOneGroup)
// AuthRouter.put('/:id', AuthController.updateGroup)
// AuthRouter.delete('/:id', AuthController.deleteGroup)
// AuthRouter.put('/:id/add-users', AuthController.addUserToGroup)

module.exports = AuthRouter
