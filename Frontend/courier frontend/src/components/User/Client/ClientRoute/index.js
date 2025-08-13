import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isClient, isLoggedIn } from '../../../../services/auth';
import Footer from '../../Common/Footer';
import NavBar from '../../Common/NavBar';

const ClientRoute = () => {
    return (isLoggedIn() && isClient()) ? <><NavBar /><Outlet /><Footer /></> : <Navigate to={"/login"} />
}
export default ClientRoute