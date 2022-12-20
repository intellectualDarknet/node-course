const logger = require('../logger/logger.js')

module.exports = (err, req, res, next) => {
  logger.error(err)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    code: err.statusCode,
    message: err.message
  })
}
