import mongoose, { Schema } from 'mongoose'

const notifcationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  target: {
    type: mongoose.Types.ObjectId
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model('Notifications', notifcationSchema)