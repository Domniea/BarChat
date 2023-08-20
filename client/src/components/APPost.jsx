import React, { useEffect, useState } from 'react'
import CommentsBox from './CommentsBox'
import axios from 'axios'



const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function APPost(props) {
    const { title, description, _id, upVote, downVote } = props

  
    const [postComments, setPostComments] = useState([])
    const [poster, setPoster] = useState('')

    //Retrieve Post Comments
    function retrievePostComments(postId) {
        userAxios.get(`https://barchat-production.up.railway.app/api/comment/${postId}`)
            .then(res => setPostComments(res.data))
            .catch(err => console.log(err))
    }

    function retrievePoster(postId) {
        userAxios.get(`https://barchat-production.up.railway.app/api/posts/${postId}/username`)
            .then(res => {
                return setPoster(String(res.data.username))
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
        retrievePostComments(_id)
        retrievePoster(_id)
    }, [])

    const CapsPoster = poster.charAt(0).toUpperCase() + poster.slice(1)

    return (
        <div className="p-3 m-3 border border-info bg-light text-dark rounded">
            <button className='btn border m-1 bg-secondary text-white border-dark' onClick={() => upVote(_id)}>UpVote</button>
            <button className='btn border m-1 bg-secondary text-white border-dark' onClick={() => downVote(_id)}>DownVote</button>
            <h3 className='info post--username'>User: {CapsPoster}</h3>
            <h4 className='post--title'>{title}</h4>
            <h5 className='post--description'>{description}</h5>
            <CommentsBox 
                _id={_id}
                postComments={postComments}
                setPostComments={setPostComments}
            />
        </div>
    )
}

export default APPost