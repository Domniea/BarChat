const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voterSchema = new Schema(
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            post: {
                type: Schema.Types.ObjectId,
                ref: 'Posts',
                required:true   
            },
            vote: {
                type: Number,
                required:true
            }

        }
)

module.exports =  mongoose.model('Voter', voterSchema)