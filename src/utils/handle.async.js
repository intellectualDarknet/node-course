const func = fn => {
  return async (req, res, next) => {
    fn(req, res, next).catch(err => {
      res.e = err
      next(res)
    })
  }
}
module.exports = func
