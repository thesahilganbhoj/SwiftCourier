import React, { useState } from 'react';
import AdminProfile from './AdminProfile'
import ViewBranches from './ViewBranches'
import ViewOrders from './ViewOrders'
import UpdatePassword from './UpdatePassword'
import ViewEmployees from './ViewEmployees';

function AdminDashboard() {
  const [currentComponent, setCurrentComponent] = useState({ name: 'Profile', prop: '' });

  const renderComponent = () => {
    switch (currentComponent.name) {
      case 'Profile':
        return <AdminProfile />;
      case 'View Orders':
        return <ViewOrders />;
      case 'View Branches':
        return <ViewBranches setCurrentComponent={setCurrentComponent} />;
      case 'Update Password':
        return <UpdatePassword setCurrentComponent={setCurrentComponent} />;
      case 'View Employees':
        return <ViewEmployees branchId={currentComponent.prop} />;
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
              <h3 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">Admin</h3>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent({ name: 'Profile' })}>Profile</button>
                </li>
                <li>
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent({ name: 'View Orders' })}>View Orders</button>
                </li>
                <li>
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent({ name: 'View Branches' })}>View Branches</button>
                </li>
                <li>
                  <button type='button' className='btn btn-light my-3' onClick={() => setCurrentComponent({ name: 'Update Password' })}>Update Password</button>
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

export default AdminDashboard;
