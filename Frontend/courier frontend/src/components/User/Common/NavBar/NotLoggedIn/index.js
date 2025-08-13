import React from 'react'
import { Link } from 'react-router-dom'

function NotLoggedIn() {
    return (
            <Link className='btn btn-success' to={'/login'} role="button">Log In</Link>
    )
}

export default NotLoggedIn