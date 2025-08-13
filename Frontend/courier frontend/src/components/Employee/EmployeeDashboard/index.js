import React, { useState } from 'react';
import EmployeeProfile from './EmployeeProfile'
import CreateAShipment from './CreateAShipment'
import ViewOrders from './ViewOrders'
import UpdatePassword from './UpdatePassword'
import Track from './Track';


function EmployeeDashboard() {
  const [currentComponent, setCurrentComponent] = useState('Profile');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Profile':
        return <EmployeeProfile />;
      case 'View Orders':
        return <ViewOrders />;
      case 'Create A Shipment':
        return <CreateAShipment setCurrentComponent={setCurrentComponent} />;
      case 'Track A Shipment':
        return <Track />;
      case 'Update Password':
        return <UpdatePassword setCurrentComponent={setCurrentComponent} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='row'>
        <div className='col-2'>
          <div className='d-flex flex-nowrap'>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light">
              <h3 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">Employee</h3>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('Profile')}>Profile</button>
                </li>
                <li>
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('View Orders')}>View Orders</button>
                </li>
                <li>
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('Create A Shipment')}>Create A Shipment</button>
                </li>
                <li>
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent('Track A Shipment')}>Track A Shipment</button>
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
    </>
  );
}

export default EmployeeDashboard;
