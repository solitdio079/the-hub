import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    parent: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Todo', todoSchema)