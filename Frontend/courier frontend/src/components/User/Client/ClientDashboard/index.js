import React, { useState } from 'react';
import ClientProfile from './ClientProfile'
import ShippingHistory from './ShippingHistory'
import ViewShipments from './ViewShipments'
import UpdatePassword from './UpdatePassword'


function ClientDashboard() {
  const [currentComponent, setCurrentComponent] = useState('Profile');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Profile':
        return <ClientProfile />;
      case 'View Shipments':
        return <ViewShipments />;
      case 'View Shipping History':
        return <ShippingHistory />;
      case 'Update Password':
        return <UpdatePassword setCurrentComponent={setCurrentComponent} />;
      default:
        return null;
    }
  };

  return (
    <div className='row'>
      <div className='col-2'>
        <div className='d-flex flex-nowrap'>
          <div className='d-flex flex-column flex-shrink-0 p-3 bg-light'>
            <h3 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">Client</h3>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('Profile')}>Profile</button>
              </li>
              <li>
                <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('View Shipments')}>View Shipments</button>
              </li>
              <li>
                <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('View Shipping History')}>View Shipping History</button>
              </li>
              <li>
                <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('Update Password')}>Update Password</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='col-10'>
        {renderComponent()}
      </div>
    </div>
  );
}

export default ClientDashboard;
