const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    memberStartDate: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//Signup Password encryption
userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

//Edit Password
userSchema.pre('findOneAndUpdate', function(next) {
   const user = this
   if(this._update.password) {
        bcrypt.hash(this._update.password , 10, (err, hash) => {
        if(err) {
            return next(err)
        }
        this._update.password = hash
        next()
        })
   }
})

//Login encrypted Password validation
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) {
            callback(err)
        }
        return callback(null, isMatch)
    })
}

//Hide encrypted Password from front end
userSchema.methods.withoutPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', userSchema)