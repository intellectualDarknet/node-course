const logger = require('../logger/logger.js')

module.exports = (err, req, res, next) => {
  logger.error(err)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      code: err.statusCode,
      message: err.message,
      stack: err.stack
    })
  } else if (process.env.NODE_ENV === 'production') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }
}
