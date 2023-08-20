import React from "react";

function AuthForm(props) {
    const {
            handleChange,
            handleSubmit,
            buttonTxt,
            inputs:
            { 
                username,
                password 
                }
        } = props
        
    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="username"
                value={username}
                id="username"
                placeholder="Username"
                onChange={handleChange} 
                className='form-control'
            />
            <input 
                type="password"
                name="password"
                value={password}
                id="password"
                placeholder="Password"
                onChange={handleChange} 
                className='form-control'
            />
            <button className='btn border m-1 bg-secondary text-white border-dark'>{buttonTxt}</button>
        </form>
    )
}
export default AuthForm