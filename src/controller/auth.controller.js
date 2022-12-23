const { AuthUser } = require('../models/user.model')
const tryCatchFn = require('../error/error')

class AuthController {
  signup = tryCatchFn(async (req, res, next) => {
    const newUser = await AuthUser.create(req.body)
    res.status(201).json({ user: newUser })
  })
}

module.exports = new AuthController()
