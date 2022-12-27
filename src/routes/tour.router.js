const Router = require('express')
const TourController = require('../controller/tour.controller.js')
const TourRouter = new Router()

TourRouter.post('', TourController.createTour)
TourRouter.get('', TourController.getAllTours)
TourRouter.get('/:id', TourController.getOneTour)
TourRouter.put('/:id', TourController.updateTour)
TourRouter.delete('/:id', TourController.deleteTour)

module.exports = TourRouter
