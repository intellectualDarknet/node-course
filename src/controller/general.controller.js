const logger = require('../logger/logger.js')

module.exports = (err, req, res, next) => {
  res.myMethod && logger.inform(res.myMethod)
  err = err + ''
  if (res.e) {
    res.e.statusCode = res.e.statusCode || 500
    res.e.status = res.e.status || 'error'
    const errorObj = {
      status: res.e.status,
      message: res.e.message
    }
    if (process.env.NODE_ENV === 'development') {
      errorObj.code = res.e.statusCode
      errorObj.message = res.e.message
      errorObj.stack = res.e.stac
    }

    res.status(res.e.statusCode).json(errorObj)
    logger.error(errorObj)
    next()
  }
}

// console.log(res.e.stack)
// logger.inform(res.myMethod)
// if (res.e) {
//   err.status = 500
//   logger.error(`Internal Server Error ${err.status}`)
// }
// next()
