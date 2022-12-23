const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, validate: validator.isEmail },
  photo: String,
  password: { type: String, required: true, minlength: 8 },
  passwordConfirm: { type: String, required: true }
})

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
