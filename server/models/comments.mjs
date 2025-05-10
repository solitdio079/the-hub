import mongoose, { Schema } from 'mongoose'
import Post from './posts.mjs'
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      email: String,
      name: String,
      avatar: String,
    },
    postId: {
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

commentSchema.post("save", async function (doc) {
  try {
    const parentPost = await Post.findById(doc.postId)
    parentPost.comments = parentPost.comments + 1

    await Post.findByIdAndUpdate(doc.postId, parentPost)
  } catch (error) {
    console.log(error);
  }
})

commentSchema.post('deleteOne', async function (doc) {
  try {
    const parentPost = await Post.findById(doc.postId)
    parentPost.comments = parentPost.comments + 1

    await Post.findByIdAndUpdate(doc.postId, parentPost)
  } catch (error) {
    console.log(error)
  }
})

export default mongoose.model('Comments', commentSchema)

 
