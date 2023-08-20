const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const Vote = require('../models/voter')



// Get All Posts
postRouter.get("/", (req, res, next) => {
    var myCursor = Post.find(
        (err, posts) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(posts)
        }
    )
            
    
})

//Get Single Users Posts
postRouter.get('/:userId', (req,res,next) => {
    Post.find(
        { user: req.params.userId },
        (err, posts) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res. status(200).send(posts)
        }
    )
})

//Add a Post
postRouter.post('/:userId', (req, res, next) => {
    req.body.user = req.auth._id
    const newPost = new Post(req.body)
    newPost.save((err, savedPost) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedPost)

    })
})

//Edit a Post
postRouter.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        { _id: req.params.postId},
        req.body,
        { new: true },
        (err, update) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(update)
    
        }
    )
})

//Delete a Post
postRouter.delete('/:postId', (req, res, next) => {
    Post.findOneAndDelete(
        {
            _id: req.params.postId, user: req.auth._id
        },
        (err, deletedPost) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(deletedPost)
        }
    )
    
})

//Retrieve Posters Username
postRouter.get('/:postId/username', (req, res, next) => {
    const Poster = Post.findOne(
        { _id: req.params.postId },
        (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // console.log(post)
            User.findOne(
                {_id: post.user},
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

module.exports = postRouter