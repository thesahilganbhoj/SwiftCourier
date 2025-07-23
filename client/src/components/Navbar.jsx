import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

function Navbar() {
    // get the logged in user info
    const { user, setUser } = useContext(AuthContext)


    // get the navigate function reference
    const navigate = useNavigate()

    return (
        <nav
            className='navbar navbar-expand-lg bg-dark bg-body-tertiary'
            data-bs-theme='dark'
        >
            <div className='container-fluid'>
                <Link
                    className='navbar-brand'
                    to='/admin'
                >
                    SwiftCourier
                </Link>

                <div
                    className='collapse navbar-collapse'
                    id='navbarText'
                >
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                aria-current='page'
                                to='/user'
                            >
                                Home
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                aria-current='page'
                                to='/add-courier'
                            >
                                Add Courier
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                aria-current='page'
                                to='/view-couriers'
                            >
                                View Couriers
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                aria-current='page'
                                to='/track-courier'
                            >
                                Track Courier
                            </Link>
                        </li>
                        
                        <li className='nav-item'>
                            <button
                                // onClick={onLogout}
                                className='btn'
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
