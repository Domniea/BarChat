import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import axios from "axios";
import CommentsBox from "./CommentsBox";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserPost(props) {
    const { title, _id, description, deletePost, editPost, user_id } = props
    
    const [postComments, setPostComments] = useState([])
    
    const [edit, setEdit] = useState(false)
    
    function toggleEdit() {
        setEdit(prevState => !prevState)
        console.log(edit)
    }
    
    //Retrieve Post Comments
    function retrievePostComments(postID) {
        userAxios.get(`https://barchat-production.up.railway.app/api/comment/${postID}`)
            .then(res => setPostComments(res.data))
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
        retrievePostComments(_id)
    }, [])


    return(
        // <div className="post">
        <div className="p-3 m-3 border border-info bg-light text-dark rounded">
            { !edit ?
            <>
                <h2>{title}</h2>
                <h4 className="small">{description}</h4>
            </>
                :
                <PostForm 
                    submit={editPost}
                    post_id={_id}
                    toggleEdit={toggleEdit}
                    edit={edit}
                />
            }
            <CommentsBox 
                _id={_id}
                postComments={postComments}
                setPostComments={setPostComments}
            />
            <button className='btn border m-1 bg-secondary text-white border-dark' onClick={toggleEdit} >Edit</button>
            <button className='btn border m-1 bg-secondary text-white border-dark' onClick={() => deletePost(_id)}>Delete</button>
        </div>
    )
}

export default UserPost