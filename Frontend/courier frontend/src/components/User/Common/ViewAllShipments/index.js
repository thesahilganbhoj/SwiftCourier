import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../../../services/auth'
import ViewAllShipments1 from './images/ViewAllShipments1.svg'
import ViewAllShipments2 from './images/ViewAllShipments2.jpg'
import ViewAllShipments3 from './images/ViewAllShipments3.jpg'

function ViewAllShipments() {
    const loggedIn = isLoggedIn();

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col'>
                    <h1 className='utext mb-5'>View All Shipments</h1>
                    <p className='lead'>Sign up for free and you can manage all your shipments from one dashboard. Get visibility and control, including status and updates on shipments.</p>
                    {loggedIn ? (
                        <Link className='btn btn-success my-3' to={'/client/dashboard'}>Log in to the Dashboard</Link>
                    ) : (
                        <Link className='btn btn-success my-3' to={'/login'}>Log in to the dashboard</Link>
                    )}
                    <p>
                        New here ?
                        {loggedIn ? (
                            <Link to={'/client/dashboard'}>Sign Up</Link>
                        ) : (
                            <Link to={'/signup'}>Sign Up</Link>
                        )}
                    </p>
                </div>
                <div className='col'>
                    <img src={ViewAllShipments1} alt='ViewAllShipments1' style={{ width: '600px' }} />
                </div>
            </div>
            <div className='container my-5 py-5'>
                <div className='d-flex justify-content-center'>
                    <h2>No Need for Tracking Numbers.</h2>
                </div>
                <div className='d-flex justify-content-center'>
                    <h2 className='utext'>On One Screen, You Can:</h2>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='row'>
                        <div className='col'>
                            <p className='lead'>View all details for your shipments.</p>
                        </div>
                        <div className='col'>
                            <p className='lead'>View the estimated time for delivery.</p>
                        </div>
                        <div className='col'>
                            <p className='lead'>Follow shipments as they move towards their destinations.</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center my-3'>
                    {loggedIn ? (
                        <Link className='btn btn-success' to={'/client/dashboard'}>Log in to Join</Link>
                    ) : (
                        <Link className='btn btn-success' to={'/login'}>Log in to Join</Link>
                    )}
                </div>
            </div>
            <div className='my-5 py-5'>
                <div className='row'>
                    <div className='col'>
                        <h1 className='utext mb-5'>One Place to do it All</h1>
                        <p className='lead'>Supercharge your shipping. Get total visibility and control with a Navi account.</p>
                        {loggedIn ? (
                            <Link className='btn btn-success my-3' to={'/client/dashboard'}>Sign Up</Link>
                        ) : (
                            <Link className='btn btn-success my-3' to={'/signup'}>Sign Up</Link>
                        )}
                        <p>
                            Already enrolled ?
                            {loggedIn ? (
                                <Link to={'/client/dashboard'}>Log In</Link>
                            ) : (
                                <Link to={'/login'}>Log In</Link>
                            )}
                        </p>
                    </div>
                    <div className='col'>
                        <img src={ViewAllShipments2} alt='ViewAllShipments2' style={{ width: '600px' }} />
                    </div>
                </div>
            </div>

            <div className='my-5 py-5'>
                <div className='row'>
                    <div className='col'>
                        <img src={ViewAllShipments3} alt='ViewAllShipments3' style={{ width: '600px' }} />
                    </div>
                    <div className='col'>
                        <h1 className='utext mb-5'>Sign up and enjoy these perks.</h1>
                        <p className='lead'>Get delivery alerts and estimated delivery times. View all of your inbound and outbound packages on one dashboard.</p>
                        {loggedIn ? (
                            <Link className='btn btn-success my-3' to={'/client/dashboard'}>Sign Up</Link>
                        ) : (
                            <Link className='btn btn-success my-3' to={'/signup'}>Sign Up</Link>
                        )}
                        <p>
                            Already enrolled ?
                            {loggedIn ? (
                                <Link to={'/client/dashboard'}>Log In</Link>
                            ) : (
                                <Link to={'/login'}>Log In</Link>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAllShipments