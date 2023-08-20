const express = require('express')
const voteRouter = express.Router()
const Vote = require('../models/voter')
const Post = require('../models/post')


let posts;
let voters;
async function displaySortedPosts(res){
    let updatedArr = []
    
    try {
        posts = await Post.find();
        voters = await Vote.find();
    } catch(err) {
      console.log(err);
    }


    posts.map(post => {
        const postID = post._id.toString()
        
        let postVotes = voters.filter(vote => {
            let voteID = vote.post.toString()
            return voteID === postID
        })
        let totalVote = postVotes.reduce((acc, ballot) => {
            return acc += ballot.vote
        }, 0)
        // console.log(totalVote)
        post.votes = totalVote
        
        updatedArr.push(post)
        
    })
    const sortedArr = updatedArr.sort((a,b) => {
        return b.votes - a.votes
    })

    // console.log(sortedArr)
    return res.send(sortedArr)
    updatedArr = []
}

// displaySortedPosts()

voteRouter.get('/sorted', ( req, res, next) => {
    displaySortedPosts(res)
        .then(res => console.log(res))


})


//UpVote
voteRouter.put('/up/:postId', (req, res, next) => {
    req.body._id = req.auth._id
    Vote.findOneAndUpdate(
        { user: req.auth._id, post: req.params.postId},
        {user: req.auth._id, post: req.params.postId, vote: 1},
        { upsert: true },
        (err, upvote) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(upvote)
        }
    )
    
})

//Update Post Vote
voteRouter.put('/update/:postId', (req, res, next) => {
    Vote.find(
        {post: req.params.postId},
        (err,votes)=>{
            const voteTotal = votes.reduce((acc, vote) => {
                acc += vote.vote
                return acc
            }, 0)

            Post.findOneAndUpdate(
                { _id: req.params.postId},
                { votes: voteTotal },
                { new: true },
                (err, update) => {
                    if(err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(200).send(update)
                }
            )

        }
    )

    

})


//DownVote
voteRouter.put('/down/:postId', (req, res, next) => {
    req.body._id = req.auth._id
    Vote.findOneAndUpdate(
        { user: req.auth._id, post: req.params.postId},
        {user: req.auth._id, post: req.params.postId, vote: 1 ? 0 : -1},
        { upsert: true },
        (err, downvote) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(downvote)
        }
    )


})

//VoteCount
voteRouter.get('/', (req, res, next) => {
    Vote.find(
        (err,votes)=>{
            // console.log(votes)
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(votes)
        }
    )
})

module.exports = voteRouter