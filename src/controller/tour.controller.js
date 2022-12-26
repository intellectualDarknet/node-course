const { Tour } = require('../models/tour.model.js')

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
        message: error
      })
      next(res)
    }
  }

  getTours = () => {}
  getOneTour = () => {}
  updateTour = () => {}
  deleteTour = () => {}
}

module.exports = new TourController()
