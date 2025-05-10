import mongoose, { Schema } from 'mongoose'
import Comments from './comments.mjs'
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      email: String, 
      name: String,
      avatar: String
    },
    tags: [String],
    images: [String],
    comments: {type: Number, default: 0} ,
  },
  { timestamps: true }
)

postSchema.post("deleteOne", async function (doc) {
  try {
     await Comments.deleteMany({ postId: doc._id })
  } catch (error) {
    console.log(error.message);
  }
 
  
})

const Posts = mongoose.model('Post', postSchema)



export default Posts
