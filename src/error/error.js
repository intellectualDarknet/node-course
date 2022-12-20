class AppError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.result = `${statusCode}`[0] === '4' ? 'bad request' : 'server Error'
  }
}

module.exports = AppError
