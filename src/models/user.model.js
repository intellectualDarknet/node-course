const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, validate: validator.isEmail },
  photo: String,
  // select false и пароль никогда не будет показан
  password: { type: String, required: true, minlength: 8, select: false },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        // el == this.confirmPassword
        // validation returns true then it ok when false then the validation is not passed
        // and only works for create user
        return el === this.password
      },
      message: 'Passwords are not the same!'
    }
  },
  role: {
    type: String, enum: ['user', 'guide', 'admin', 'lead-guide'], default: 'user'
  },
  passwordChangedAt: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date }
})

// middleware on safe takes smth and executes then right before the saving to db
// next to call next middleware
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)

  // we dont need confirm password to be in your db no sense in this!
  this.passwordConfirm = undefined

  next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}
userSchema.methods.isPasswordChanged = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

    return JWTTimeStamp < changedTimeStamp
  }
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  console.log(resetToken, this.passwordResetToken)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('AuthUser', userSchema)

// import mongoose from 'mongoose'

// const User = new mongoose.Schema({
//   id: { type: String, required: true },
//   login: { type: String, required: true },
//   password: { type: String, required: true },
//   age: { type: Number, required: true },
//   isDeleted: { type: Boolean, required: true }
// })

// export default mongoose.model('User', User)
