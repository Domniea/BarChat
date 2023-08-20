import React ,{ useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import PostForm from "./PostForm";
import UserPostList from "./UserPostList";
import { UserContext } from "../context/UserProvider";
import { PostContext } from "../context/PostProvider";

function Profile() {
    const { 
        user: {
            username,
            _id
        },
        token
     } = useContext(UserContext)

     const {
        userPosts,
        addPost,
        deletePost,
        getUsersPosts
     } = useContext(PostContext)

    return (
        <div className="container">
            <div className="text-white p-2 m-2 rounded d-flex flex-column align-items-center">
                <h1>Profile</h1>
                <h2>Welcome {username[0].toUpperCase() + username.slice(1)}</h2>
            </div>
            <PostForm submit={addPost} post_id={_id}/>
            {/* <h2 className="text-white">Your Posts</h2> */}
            <UserPostList user_id={_id}/>
            <div className=" bg-danger rounded d-flex justify-content-center">
                <Link className="text-white" to='/editPassword' >Edit Password</Link>
                {/* <span className="text-white"> - </span> */}
                {/* <Link className="text-white">Contact</Link> */}
               
            </div>
        </div>
    )
}

export default Profile
