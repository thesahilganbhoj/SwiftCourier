import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

function Navbar() {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const hasRole = (roleToCheck) => {
        return user && user.role?.toUpperCase() === roleToCheck.toUpperCase();
    };

    const getBrandLink = () => {
        if (!user) {
            return '/';
        }
        switch (user.role?.toUpperCase()) {
            case 'ADMIN':
                return '/admin/dashboard';
            case 'CUSTOMER':
                return '/customer/homepage';
            case 'STAFF':
                return `/staff/staff-details/${user.userId}`;
            default:
                return '/';
        }
    };

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav
            className='navbar navbar-expand-lg bg-dark bg-body-tertiary'
            data-bs-theme='dark'
        >
            <div className='container-fluid'>
                <Link className='navbar-brand' to={getBrandLink()}>
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
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        {/* Public/Customer Home Link (always visible if customer or not logged in) */}
                        {!user || hasRole('CUSTOMER') ? (
                            <li className='nav-item'>
                                <Link className='nav-link' to='/customer/homepage'>
                                    Home
                                </Link>
                            </li>
                        ) : null}

                        {/* Admin Navigation */}
                        {hasRole('ADMIN') && (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/admin/dashboard'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/admin/manage-staff'>
                                        Manage Staff
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/admin/add-staff'>
                                        Add Staff
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/admin/manage-hub'>
                                        Manage Hub
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/admin/order-history'>
                                        Order History
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Staff Navigation */}
                        {hasRole('STAFF') && (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to={`/staff/staff-details/${user.userId}`}>
                                        Staff Dashboard
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to={`/staff/profile/${user.userId}`}>
                                        Staff Profile
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Customer Navigation (additional links) */}
                        {hasRole('CUSTOMER') && (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/customer/add-courier'>
                                        Add Order
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/customer/profile'>
                                        Profile
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/customer/order-details'>
                                        Order Details
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/customer/track-courier'>
                                        Track Order
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/customer/order-history'>
                                        Order History
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/customer/feedback'>
                                        Feedback
                                    </Link>
                                </li>
                            </>
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
