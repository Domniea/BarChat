import React, { createContext, useState } from "react";
import axios from "axios";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const PostContext = createContext()

function PostProvider(props) {

    const [allPosts, setAllPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])

    


    //Get Users Posts
    function getUsersPosts(userId) {
        userAxios.get(`https://barchat-production.up.railway.app/api/posts/${userId}`)
            .then(res => {
                setUserPosts(res.data)
                // setUserPosts(prevState => {
                //     return 
                // })
            })
            // .then(res => console.log(res))
            .catch(err => console.log(err))
    }
        
    //Get All Posts
    function getAllPosts() {
        userAxios.get(`https://barchat-production.up.railway.app/api/vote/sorted`)
        .then(res => {
            setAllPosts(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    //Add Post
    function addPost(credentials, userId){
        userAxios.post(`https://barchat-production.up.railway.app/api/posts/${userId}`, credentials)
            .then(res => {
                // setUserPosts(prevState => {
                //     return [
                //         ...prevState,
                //         res.data
                //     ]
                // })
                setAllPosts(prevState => {
                    return [
                        ...prevState,
                        res.data
                    ]
                })
            })
            .catch(err => console.log(err.response))
    }

    //Edit Post
    function editPost(credentials, postId) {
        userAxios.put(`https://barchat-production.up.railway.app/api/posts/${postId}`, credentials)
            .then(res => {
                setUserPosts(prevState => {
                    return prevState.map(post => post._id !== postId ? post : res.data)
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    //Delete User Post
    function deletePost(postId) {
        userAxios.delete(`https://barchat-production.up.railway.app/api/posts/${postId}`)
            .then(res => {
                // setUserPosts(prevState => prevState.filter(posts => posts._id !== postId))
                setAllPosts(prevState => prevState.filter(posts => posts._id !== postId))
            })
            .catch(err => console.log(err))
    }

    //Vote Scores
    function getVoteScores() {
        userAxios.get(`https://barchat-production.up.railway.app/api/vote/`)
            // .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    //Upvote
    function upVote(postId) {
        userAxios.put(`https://barchat-production.up.railway.app/api/vote/up/${postId}`)
            .then(res => {
                console.log('butts')
                // getVoteScores()
            })
            .catch(err => console.log(err))

        getAllPosts()
    }

    //Downvote
    function downVote(postId) {
        userAxios.put(`https://barchat-production.up.railway.app/api/vote/down/${postId}`)
            .then(res => {
                // console.log('butts')
                // getVoteScores()
            })
            .catch(err => console.log(err))

        getAllPosts()
    }



    return (
        <PostContext.Provider
            value={{
                addPost,
                deletePost,
                editPost,
                getUsersPosts,
                allPosts,
                setAllPosts,
                getAllPosts,
                userPosts,
                upVote,
                downVote,
                getVoteScores
            }}
        >
            {props.children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider }