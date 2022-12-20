const logger = require('../logger/logger.js')

module.exports = (err, req, res, next) => {
  res.myMethod && logger.inform(res.myMethod)
  if (res.e) {
    logger.error(`Internal Server Error ${res.e.status}`)
  }
  next()
}