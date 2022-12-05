import mongoose from 'mongoose'

const User = new mongoose.Schema({
  id: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true }
})

export default mongoose.model('User', User)
