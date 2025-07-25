import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

function Navbar() {
    // get the logged in user info
    const { user, setUser } = useContext(AuthContext)
    // get the navigate function reference
    const navigate = useNavigate()

    // Logout function
    const handleLogout = () => {
        // Clear user data
        setUser(null)
        // Clear any stored authentication data (if using localStorage/sessionStorage)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        // Redirect to login page
        navigate('/login')
    }

    return (
        <nav
            className='navbar navbar-expand-lg bg-dark bg-body-tertiary'
            data-bs-theme='dark'
        >
            <div className='container-fluid'>
                <Link
                    className='navbar-brand'
                    to='/swiftcourier'
                >
                    SwiftCourier
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarNavDropdown'
                >
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        {/* Admin Dropdown */}
                        <li className='nav-item dropdown'>
                            <a
                                className='nav-link dropdown-toggle'
                                href='#'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                            >
                                Admin
                            </a>
                            <ul className='dropdown-menu'>
                                <li>
                                    <Link className='dropdown-item' to='/admin/dashboard'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/admin/manage-staff'>
                                        Manage Staff
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/admin/add-staff'>
                                        Add Staff
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/admin/delete-staff'>
                                        Delete Staff
                                    </Link>
                                </li>
                                <li><hr className='dropdown-divider' /></li>
                                <li>
                                    <Link className='dropdown-item' to='/admin/manage-hub'>
                                        Manage Hub
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/admin/order-history'>
                                        Order History
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Staff Dropdown */}
                        <li className='nav-item dropdown'>
                            <a
                                className='nav-link dropdown-toggle'
                                href='#'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                            >
                                Staff
                            </a>
                            <ul className='dropdown-menu'>
                                <li>
                                    <Link className='dropdown-item' to='/staff/staff-details'>
                                        Staff Details
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/staff/profile'>
                                        Staff Profile
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Customer Dropdown */}
                        <li className='nav-item dropdown'>
                            <a
                                className='nav-link dropdown-toggle'
                                href='#'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                            >
                                Customer
                            </a>
                            <ul className='dropdown-menu'>
                                <li>
                                    <Link className='dropdown-item' to='/customer/homepage'>
                                        Home Page
                                        </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/customer/add-courier'>
                                       Add Order
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/customer/profile'>
                                        Customer Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/customer/order-details'>
                                        Order Details
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/customer/track-courier'>
                                        Track Order
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/customer/order-history'>
                                        Order History
                                    </Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='/customer/feedback'>
                                        Feedback
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    {/* Logout Button */}
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <button
                                onClick={handleLogout}
                                className='btn btn-outline-light'
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