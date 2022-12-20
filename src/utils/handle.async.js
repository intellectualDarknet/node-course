const func = fn => {
  return async (req, res, next) => {
    fn(req, res, next)
  }
}
module.exports = func
