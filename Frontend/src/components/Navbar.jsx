import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

function Navbar() {
    // get the logged in user info
    const { user, setUser } = useContext(AuthContext)
    // get the navigate function reference
    const navigate = useNavigate()

    // Helper to check if user has a specific role
    const hasRole = (roleToCheck) => {
        return user && user.role?.toUpperCase() === roleToCheck.toUpperCase();
    };

    // Determine the brand link based on user role
    const getBrandLink = () => {
        if (!user) {
            return '/'; // If not logged in, go to public homepage
        }
        switch (user.role?.toUpperCase()) {
            case 'ADMIN':
                return '/admin/dashboard';
            case 'CUSTOMER':
                return '/customer/homepage'; // Or just '/' if it's the same public page
            case 'STAFF':
                return `/staff/staff-details/${user.userId}`;
            default:
                return '/';
        }
    };

    // Logout function
    const handleLogout = () => {
        // Clear user data
        setUser(null)
        // Clear any stored authentication data (if using localStorage/sessionStorage)
        localStorage.removeItem('user')
        localStorage.removeItem('token') // Assuming you might store a token
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
                    to={getBrandLink()}
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
                        {hasRole('ADMIN') && (
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
                        )}

                        {/* Staff Dropdown */}
                        {hasRole('STAFF') && (
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
                                        <Link className='dropdown-item' to={`/staff/staff-details/${user.userId}`}>
                                            Staff Details
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item' to={`/staff/profile/${user.userId}`}>
                                            Staff Profile
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}

                        {/* Customer Dropdown */}
                        {hasRole('CUSTOMER') && (
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
                                        <Link className='dropdown-item' to='/customer/feedback'>
                                            Feedback
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Login/Logout Button */}
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className='btn btn-outline-light'
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className='btn btn-outline-light'>
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
