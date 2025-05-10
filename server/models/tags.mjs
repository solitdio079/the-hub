import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true })


export default mongoose.model('Tags', tagSchema)