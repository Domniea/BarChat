const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

//Get Post Comment
commentRouter.get('/:postId', (req, res, next) => {
    Comment.find(
        { post: req.params.postId },
        (err, allData) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allData)
    })
})

//Post Comment
commentRouter.post('/:postId', (req, res, next) => {
    req.body.user = req.auth._id
    console.log(req.body)
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedComment)
    })
})

//Delete
commentRouter.delete('/:commentId', (req, res, next) => {
    req.body.user = req.auth_id
    Comment.findOneAndDelete(
        {_id: req.params._id, user: req.auth._id},
        (err, deletedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(deletedComment)
        }
    )
})

//Retrieve Comment Username
commentRouter.get('/:commentId/username', (req, res, next) => {
    Comment.findOne(
        { _id: req.params.commentId },
        (err,comment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // res.send(comment)
            User.findOne(
                {_id: comment.user},
                (err, user) => {
                    // console.log(user)
                    if(err){
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(user)
                    
                    

                }
            )
        }
    )
   
})

module.exports = commentRouter