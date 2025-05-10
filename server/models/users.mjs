import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: String
  // notifcations: Array
}, {timestamps: true})

export default mongoose.model('User', userSchema)
