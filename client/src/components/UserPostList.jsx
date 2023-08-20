import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostProvider";
import UserPost from "./UserPost";
import { all } from "axios";

function UserPostList(props) {
const { 
        getAllPosts,
        allPosts,
        userPosts,
        getUsersPosts,
        deletePost,
        editPost
    } = useContext(PostContext)
    const {user_id} = props

 
    useEffect(() => {
        // getUsersPosts(user_id)
        getAllPosts()
    }, [])

    const userPost = allPosts.map(post => {
        if(post.user === user_id){
            return <UserPost 
            {...post} 
            deletePost={deletePost} 
            key={post._id} 
            user_id={user_id}
            editPost={editPost}
        />
        }
    })
    
    return (
        <div className="PostList">
            {userPost}
        </div>
    )
}

export default UserPostList