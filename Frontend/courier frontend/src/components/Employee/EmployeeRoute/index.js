import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isEmployee, isLoggedIn } from '../../../services/auth';
import NavBar from '../EmployeeDashboard/NavBar';

const EmployeeRoute = () => {
    return (isLoggedIn() && isEmployee()) ? <><NavBar /><Outlet /></> : <Navigate to={"/login"} />
}
export default EmployeeRoute