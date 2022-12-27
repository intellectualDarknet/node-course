const Tour = require('../models/tour.model.js')

class TourController {
  createTour = async (req, res, next) => {
    try {
      const newTour = await Tour.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
      next(res)
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      })
      next(res)
    }
  }

  getAllTours = async (req, res, next) => {
    try {
      const tours = await Tour.find()
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours
        }
      })
      next(res)
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
      })
      next(res)
    }
  }

  getOneTour = async (req, res, next) => {
    try {
      const tour = await Tour.findById(req.params.id)
      res.status(200).json({
        status: 'success',
        results: tour.length,
        data: {
          tour
        }
      })
      next(res)
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
      })
      next(res)
    }
  }

  updateTour = async (req, res, next) => {
    try {
      const tour = await Tour.findOneAndUpdate(req.params.id, req.body, { new: false, runValidators: true })
      res.status(200).json({
        status: 'success',
        results: tour.length,
        data: {
          tour
        }
      })
      next(res)
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
      })
      next(res)
    }
  }

  deleteTour = async (req, res, next) => {
    try {
      const tour = await Tour.findByIdAndDelete(req.params.id)
      Tour.findByIdAndRemove()
      Tour.findOneAndDelete()
      res.status(204).json({
        status: 'success',
        data: {
          tour
        }
      })
      next(res)
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error.message
      })
      next(res)
    }
  }
}

module.exports = new TourController()
