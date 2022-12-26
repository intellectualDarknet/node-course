const Router = require('express')
const TourController = require('../controller/tour.controller.js')

const TourRouter = new Router()

TourRouter.post('', TourController.createUser)
// TourRouter.get('', UserController.getUsers)
// TourRouter.get('/:id', UserController.getOneUser)
// TourRouter.put('/:id', UserController.updateUser)
// TourRouter.delete('/:id', UserController.deleteUser)

module.exports = TourRouter
