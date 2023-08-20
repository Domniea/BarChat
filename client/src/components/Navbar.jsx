import React from "react";
import { Link, Navigate } from "react-router-dom";

function Navbar(props) {
  const { logout, token } = props
    return(
        // <div className="Navbar">
        <>
        {
          token &&
        <div className="navbar bg-light border border-info rounded p-3 m-3 d-flex justify-content-around" role="navigation">
          <Link className='nav-link' to='/'>Profile</Link>
          <Link className='nav-link' to='/allPosts'>All Posts</Link>
          {/* <Link className='nav-link' to='/home'>Home</Link> */}
          <Link className='btn border m-1 bg-secondary text-white border-dark' to='/' onClick={logout}>Log Out</Link>
        </div>
        }
        
        </>
    )
}

export default Navbar