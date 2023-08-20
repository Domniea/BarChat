import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserContext = createContext()

function UserProvider(props) {
    const initUser = {
        user: JSON.parse(localStorage.getItem('user')) || '',
        token: localStorage.getItem('token') || '',
        errMsg: ''
    }

    const [userState, setUserState] = useState(initUser)

    //Credentials Error Messages
    function errMsgAlert(errAlert) {
        setUserState(prevState => ({
            ...prevState,
            errMsg: errAlert 
        }))
    }

    //Signup
    function signup(credentials) {
        axios.post(`https://barchat-production.up.railway.app/auth/signup`, credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
            })
            .catch(err => errMsgAlert(err.response.data.errMsg))
    }

    //Login
    function login(credentials) {
        axios.post(`https://barchat-production.up.railway.app/auth/login`, credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                // getUsersPosts()
                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
            })
            .catch(err => errMsgAlert(err.response.data.errMsg))
    }

    //Logout
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('posts')

        setUserState({
            user: '',
            token: '',
            errMsg: ''
        })
    }

    //Add Post
    function addPost(credentials){
        userAxios.post(`https://barchat-production.up.railway.app/api/posts/`, credentials)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    posts: [...prevState.posts, res.data]
                }))
                localStorage.setItem('posts', posts)
            })
            .catch(err => console.log(err.response))
    }

    // //Get Users Posts
    // function getUsersPosts(userId) {
    //     userAxios.get(`https://barchat-production.up.railway.app/api/posts/${userId}`)
    //         .then(res => {
    //             setUserState(prevState => ({
    //                 ...prevState,
    //                 posts: res.data
    //             }))
    //         })
    //         // .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
    // }

    //Delete User Post
    function deletePost(postId) {
        userAxios.delete(`https://barchat-production.up.railway.app/api/posts/${postId}`)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    posts: prevState.posts.filter(posts => posts._id !== postId)
                }))
            })
            .catch(err => console.log(err))
    }

    //Edit Password
    function editPassword(credentials, userId) {
        userAxios.put(`https://barchat-production.up.railway.app/auth/passupdate/${userId}`, credentials)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
    <UserContext.Provider
        value={{
            ...userState,
            signup,
            login,
            editPassword,
            logout,
            addPost,
            deletePost,
            // getUsersPosts
            // getAllPosts,
            // allPosts,

        }}
    >
        {props.children}
    </UserContext.Provider>
    )
}

export { UserContext, UserProvider }