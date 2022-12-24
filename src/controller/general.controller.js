const AppError = require('../error/error.js')
const logger = require('../logger/logger.js')

function errorTransformer (value) {
  switch (value.name) {
    case 'JsonWebTokenError': return new AppError('Invalid token. Please log in again ', 401)
    case 'TokenExpiredError': return new AppError('The token is expired', 401)
    default: return value
  }
}

module.exports = (err, req, res, next) => {
  res.myMethod && logger.inform(res.myMethod)
  res.warning && logger.warning(res.warning)
  if (err.name) { res.e = errorTransformer(err) }

  if (res?.e?.name) {
    console.log('resultname', res.e.name)
    res.e = errorTransformer(res.e)
  }

  if (res.e) {
    res.e.statusCode = res.e.statusCode || 500
    res.e.status = res.e.status || 'error'
    let errorObj
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
