const AppError = require('../error/error')

module.exports = (req, res, next) => {
  console.log('resque', res)
  res.e = res.e = new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  next(res)
}
