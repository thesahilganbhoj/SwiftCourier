import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='container-fluid bg-warning' data-bs-theme='light'>
      <div className='container'>
        <footer className='py-5'>
          <div className='row'>
            <div className='col-6 col-md-2 mb-3'>
              <h5>This Site</h5>
              <ul className='nav flex-column'>
                <li className='nav-item mb-2'><Link to={'/'} className='nav-link p-0 text-muted'>Home</Link></li>
                <li className='nav-item mb-2'><Link to={'/track'} className='nav-link p-0 text-muted'>Tracking</Link></li>
                <li className='nav-item mb-2'><Link to={'/createashipment'} className='nav-link p-0 text-muted'>Shipping</Link></li>
                <li className='nav-item mb-2'><Link to={'/contactus'} className='nav-link p-0 text-muted'>Support</Link></li>
              </ul>
            </div>

            <div className='col-6 col-md-2 mb-3'>
              <h5>Our Company</h5>
              <ul className='nav flex-column'>
                <li className='nav-item mb-2'><Link to={'/aboutus'} className='nav-link p-0 text-muted'>About Us</Link></li>
                <li className='nav-item mb-2'><Link to={'/privacypolicy'} className='nav-link p-0 text-muted'>Privacy Policy</Link></li>
                <li className='nav-item mb-2'><Link to={'/termsandconditions'} className='nav-link p-0 text-muted'>Terms And Conditions</Link></li>
              </ul>
            </div>
          </div>

          <div className='d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top'>
            <p>© 2024 Company, Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer