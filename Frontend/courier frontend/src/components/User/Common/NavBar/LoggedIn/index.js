import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleLogout } from '../../../../../services/auth'

function LoggedIn() {
    const navigate = useNavigate();

    const logout = () => {
        handleLogout(()=>{navigate('/login')});
        return <useNavigate replace={true} to={'/login'}/>
        //.catch(error => console.log(error))
    }

    return (
        <div className='flex-shrink-0 dropdown'>
            <Link className='d-block link-dark text-decoration-none dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                <h1><i className='bi bi-person-circle'></i></h1>
            </Link>
            <ul className='dropdown-menu text-small shadow'>
                <li><Link className='dropdown-item' to={'/client/dashboard'}>Dashboard</Link></li>
                <li><hr className='dropdown-divider' /></li>
                <li><Link className='dropdown-item' onClick={() => { logout(); }}>Log out</Link></li>
            </ul>
        </div>
    )
}

export default LoggedIn