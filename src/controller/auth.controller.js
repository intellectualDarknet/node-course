const { promisify } = require('util')
const AuthUser = require('../models/user.model')
const tryCatchFn = require('../utils/handle.async.js')
const jwt = require('jsonwebtoken')
const AppError = require('../error/error.js')

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

class AuthController {
  signup = tryCatchFn(async (req, res, next) => {
    res.myMethod = 'AuthController signup'
    const newUser = await AuthUser.create(req.body)

    const token = signToken(newUser._id)

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    })
    next(res)
  })

  login = tryCatchFn(async (req, res, next) => {
    res.myMethod = 'AuthController login'
    const { email, password } = req.body

    if (!email || !password) {
      res.e = new AppError('Please provide email and password', 400)
      next(res)
    }

    // allows us to take user with the password and check it
    const user = await AuthUser.findOne({ email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.e = new AppError('Incorrect email or password', 401)
      return next(res)
    } else {
      const token = signToken(user._id)
      res.status(200).json({
        status: 'success',
        token,
        user
      })
    }
  })

  getAllUsers = tryCatchFn(async (req, res, next) => {
    res.myMethod = 'AuthController getAllUsers'
    const users = await AuthUser.find()
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    })
    next(res)
  })

  deleteUser = tryCatchFn(async (req, res, next) => {
    res.myMethod = 'UserService deleteUser'
    const user = await AuthUser.findByIdAndDelete(req.params.id)
    if (!user) {
      res.status(404)
    }
    if (user === null) {
      res.warning = 'there was nothing to delete'
    }
    res.status(200).json(user)
    next(res)
  })

  updateUser = tryCatchFn(async (req, res, next) => {
    res.myMethod = 'UserService deleteUser'
    const { id, body } = req.body
    console.log(body)
    const updateUser = await AuthUser.findByIdAndUpdate(id, body, { new: true })
    res.status(200).json(updateUser)
    next(res)
  })

  protect = tryCatchFn(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      res.e = new AppError('You are not logged in!', 401)
      next(res.e)
    }

    // checking the timing and checking the same secret
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log('decoded', decoded)

    // check for token

    const freshUser = await AuthUser.findById(decoded.id)
    if (!freshUser) {
      res.e = new AppError('this token belongs to user that does not exist anymore', 401)
      next(res.e)
    }

    // check if the user changed password after the token was issued
    if (freshUser.isPasswordChanged(decoded.iat)) {
      res.e = new AppError('User recently changed password, Please log in again', 401)
      next(res.e)
    }

    next()
  })
}

module.exports = new AuthController()
