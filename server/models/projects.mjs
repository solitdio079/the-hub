import mongoose, { Schema } from "mongoose"
import Todos from './todos.mjs'
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: Array,
    overview: String,
    deadline: {
        type: Date,
        required: true
    }
}, { timestamps: true })

projectSchema.post("deleteOne", async function (doc) {
  try {
     await Todos.deleteMany({ projectId: doc._id })
  } catch (error) {
    console.log(error.message);
  } 
})

export default mongoose.model('Project', projectSchema)
