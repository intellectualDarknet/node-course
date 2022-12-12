var Router = require('express')
var UserController = require('../controller/user.controller.js')

var router = new Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getOneUser)
router.put('/users', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

module.exports = router
