const mongoose = require('mongoose')
const validator = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, validate: validator.isEmail },
  photo: String,
  password: { type: String, required: true, minlength: 8 },
  passwordConfirm: { type: String, required: true }
})

const AuthUser = mongoose.model('AuthUser', userSchema)

module.exports = AuthUser
