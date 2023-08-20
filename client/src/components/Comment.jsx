import React, { useState, useEffect } from "react";
import axios from "axios";


const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


function Comment(props) {
    const { comment, _id } = props
    const [commenter, setCommenter] = useState('')

    const CapsPoster = commenter.charAt(0).toUpperCase() + commenter.slice(1)

    function retrieveCommenter(commentId) {
        userAxios.get(`https://barchat-production.up.railway.app/api/comment/${commentId}/username`)
            .then(res => {
              setCommenter(String(res.data.username))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        retrieveCommenter(_id)
    }, [])

    return(
        <div className="Comment">
            <h5>{CapsPoster}</h5>
            <h5 className="small">{comment}</h5>
        </div>
    )
}

export default Comment