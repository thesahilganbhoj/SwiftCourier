import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer';
import NavBar from '../NavBar';

const OpenRoute = () => {
    return <><NavBar /><Outlet /><Footer /></>
}
export default OpenRoute