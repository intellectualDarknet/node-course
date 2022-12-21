const AppError = require('../error/error')

module.exports = (req, res, next) => {
  res.e = new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  next(res)
}
