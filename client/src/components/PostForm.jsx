import React, { useState } from "react";


function PostForm(props) {
    const initInputs = {
        title: '',
        description: '',
        posts: []
    }

    const { submit, post_id, toggleEdit, edit } = props

    const [inputs, setInputs] = useState(initInputs)

    const { title, description } = inputs

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        console.log(inputs)
        submit(inputs, post_id)
        // console.log(edit)
        if(edit) {
            toggleEdit()
        }
        setInputs(initInputs)

    }

    return (
        // <div className='PostForm'>
            <div className='p-2 m-2 rounded border border-info bg-light bg-transparent text-white'>
            <form className='' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='' htmlFor="title">Title</label>
                    <input 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Type Here"
                        value={title}
                        onChange={handleChange}
                        className="form-control border-dark"
                    />
                </div>
                <div className="form-group">
                    <label className='' htmlFor="description">Description</label>
                    <input 
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Type Here"
                        value={description}
                        onChange={handleChange} 
                        className="form-control border-dark"
                    />
                    <button className="btn border text-light bg-dark m-2">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default PostForm