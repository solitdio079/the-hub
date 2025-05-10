import mongoose, { Schema } from 'mongoose'

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      email: String,
      name: String,
      avatar: String
    },
    parent: {
        type: mongoose.Types.ObjectId,
        default: null,
    },
  },
  { timestamps: true }
)

const Tweets = mongoose.model('Tweets', tweetSchema)

export default Tweets
