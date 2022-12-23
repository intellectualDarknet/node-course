const { AuthUser } = require('../models/user.model')
const tryCatchFn = require('../utils/handle.async.js')

class AuthController {
  signup = tryCatchFn(async (req, res, next) => {
    res.myMethod = 'UserService createUser'
    const newUser = await AuthUser.create(req.body)
    res.status(201).json({ user: newUser })
    next(res)
  })
}

module.exports = new AuthController()
