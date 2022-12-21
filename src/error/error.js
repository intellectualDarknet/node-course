class AppError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.status = `${statusCode}`[0] === '4' ? 'fail' : 'error'
    this.statusCode = statusCode
    this.isOperational = true
    this.isAppError = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
