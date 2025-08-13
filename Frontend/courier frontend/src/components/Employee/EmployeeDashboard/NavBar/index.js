import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleLogout } from '../../../../services/auth'

function NavBar() {

  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    //return <Navigate replace={true} to={'/login'}/>
    navigate('/', {replace: true});
  }

  return (
    <nav className='navbar navbar-expand-lg bg-warning' data-bs-theme='light'>
      <div className='container'>
      <div className='d-flex align-items-center'>
          <img src="https://cdn-icons-png.flaticon.com/512/6259/6259042.png" alt="" style={{ maxHeight: "80px", maxWidth: "80px" }} />
          <img src="https://cdn-icons-png.flaticon.com/512/2947/2947532.png" alt="" style={{ maxHeight: "80px", maxWidth: "80px" }} />
         <Link className='navbar-brand ms-3' to='/'><h1>Swiftcourier Employee Dashboard</h1></Link>
          
        </div>
        {/* <Link className='navbar-brand'><h1>Navi</h1></Link> */}
        <div className='d-flex'>
          <Link className='btn btn-danger' onClick={logout} role="button">Log Out</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar