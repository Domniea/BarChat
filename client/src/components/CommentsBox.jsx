import React , { useState } from "react";
import axios from "axios";
import Comment from "./Comment";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function CommentsBox(props) {
    
    const { _id, postComments, setPostComments } = props

    const initInput = {
        comment:''
    }

    const [input, setInput] = useState(initInput)

    //Post Comment
    function addComment(credentials, postId) {
        userAxios.post(`https://barchat-production.up.railway.app/api/comment/${postId}`, {comment: credentials.comment, post: postId})
        .then(res => setPostComments(prevState => {
            return [
                ...prevState,
                res.data
            ]
        }))
        .catch(err => console.log(err))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setInput(prevState => ({
             ...prevState,
            [name]: value
        }))
     }

    function handleSubmit(e) {
        e.preventDefault()
        addComment(input, _id)
        setInput(initInput)
 
    }

    const comment = postComments.map(comment => {
        return <Comment
        key={comment._id}
            {...comment}
        />
    })
    
    return (
        <div className=" border border-dark p-2 m-2 rounded bg-white">
            {comment}
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="comment"
                value={input.comment}
                onChange={handleChange}
                className="form-control border-dark"
            />
            <button className='btn border m-1 bg-secondary text-white border-dark'>Comment</button>
        </form>
        </div>
    )
}

export default CommentsBox