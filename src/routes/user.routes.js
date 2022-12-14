const Router = require('express')
const UserController = require('../controller/user.controller.js')

const router = new Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getOneUser)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

module.exports = router
