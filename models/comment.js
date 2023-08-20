const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true
        },
        // poster: {
        //     type: Schema.Types.ObjectId,
        //     ref:'User.username'
        // },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        }
    }
)

module.exports = mongoose.model('Comment', commentSchema)