const logger = require('../logger/logger.js')

module.exports = (err, req, res, next) => {
  res.myMethod && logger.inform(res.myMethod)
  console.log('errorName', err.name, err)
  if (err.name) { res.e = err }
  if (res.e) {
    res.e.statusCode = res.e.statusCode || 500
    res.e.status = res.e.status || 'error'
    let errorObj
    console.log('processEnv', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
      errorObj = {
        status: res.e.status,
        message: res.e.message,
        code: res.e.statusCode,
        stack: res.e.stack
      }
    } else {
      errorObj = {
        status: res.e.status,
        message: res.e.message
      }
    }

    res.status(res.e.statusCode).json(errorObj)
    logger.error(errorObj)
    next()
  }
}
