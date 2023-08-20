import React, { useContext, useEffect, useState } from "react";
import APPost from "./APPost";
import { PostContext } from "../context/PostProvider";


function APList() {

    const {
        allPosts,
        getAllPosts,
        upVote,
        downVote,
        getVoteScores
    } = useContext(PostContext)

    useEffect(() => {
        getAllPosts()
        getVoteScores()
    },[])

    const posts = allPosts
    // .sort((a,b) => b.votes - a.votes)
    .map(post => {
        return <APPost 
            key={post._id}
            {...post}
            upVote={upVote}
            downVote={downVote}
        />
    })
    
    return (
        <div>
            <h1 className="d-flex justify-content-center">All Posts</h1>
            {posts}
        </div>
    )
}

export default APList