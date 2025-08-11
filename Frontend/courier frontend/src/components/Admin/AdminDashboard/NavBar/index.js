// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { handleLogout } from '../../../../services/auth'

// function NavBar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     handleLogout();
//     //return <Navigate replace={true} to={'/login'}/>
//     navigate('/')
//     .catch(error=> {console.log(error)})
//   }

//   return (
//     <nav className='navbar navbar-expand-lg bg-info' data-bs-theme='light'>
//       <div className='container'>
//         <img src="https://cdn-icons-png.flaticon.com/512/6259/6259042.png" alt="" style={{maxHeight:"100px",maxWidth:"80px"}}/>
//         <img src="https://cdn-icons-png.flaticon.com/512/2947/2947532.png" alt="" style={{maxHeight:"100px",maxWidth:"80px"}}/>
//         <Link className='navbar-brand'><h1>Courier Service Portal</h1></Link>
//         <div className='d-flex'>
//           <Link className='btn btn-dark' onClick={logout} role="button">Log Out</Link>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default NavBar

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../../../services/auth';

function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/')
      .catch(error => { console.log(error) });
  }

  return (
    <nav className='navbar navbar-expand-lg bg-warning' data-bs-theme='light'>
      <div className='container'>
        <div className='d-flex align-items-center'>
          <img src="https://cdn-icons-png.flaticon.com/512/4942/4942038.png" alt="" style={{ maxHeight: "80px", maxWidth: "80px" }} />
          <img src="https://cdn-icons-png.flaticon.com/512/3142/3142269.png" alt="" style={{ maxHeight: "80px", maxWidth: "80px" }} />
          <Link className='navbar-brand ms-3'><h1>Courier Service Portal Admin Dashboard</h1></Link>
        </div>
        <div className='d-flex ms-auto'>
          <Link className='btn btn-danger' onClick={logout} role="button">Log Out</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
