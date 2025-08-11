import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAdmin, isLoggedIn } from '../../../services/auth';
import NavBar from '../AdminDashboard/NavBar';

const AdminRoute = () => {
    return (isLoggedIn() && isAdmin()) ? <><NavBar /><Outlet /></> : <Navigate to={"/login"} />
}
export default AdminRoute