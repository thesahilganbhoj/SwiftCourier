import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { privateAxios } from '../../../../services/helper';
import './index.css'

function ViewBranches(props) {
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({ branchName: '', phone: '', email: '', addressId: { address: '', address2: '', postalCode: '', city: '', state: '', country: '' } })
  const [action, setAction] = useState('add');

  const handleNewBranch = (event) => {
    const { name, value } = event.target;
    const updatedNewBranch = { ...newBranch };
    const [parentName, childName, grandchildName] = name.split('.');
    if (grandchildName) {
      // update a double nested property
      updatedNewBranch[parentName][childName][grandchildName] = value;
    } else if (childName) {
      // update a single nested property
      updatedNewBranch[parentName][childName] = value;
    } else {
      updatedNewBranch[parentName] = value;
    }
    setNewBranch(updatedNewBranch);
  };

  useEffect(() => {
    getAllBranches();
  }, [])

  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.classList.add('show');
    modalRef.current.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  const closeModal = () => {
    modalRef.current.classList.remove('show');
    modalRef.current.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  const getAllBranches = () => {
    privateAxios.get('/admin/branch')
      .then(response => {
        setBranches(response.data);
        console.log(response)
      })
      .catch(response => {
        toast.error('There was an error getting branches. Please try again...')
      })
  }

  const addBranch = (event) => {
    event.preventDefault();
    privateAxios.post('/admin/branch', newBranch)
      .then(response => {
        closeModal();
        toast.success(response.data)
        setNewBranch({ branchName: '', phone: '', email: '', addressId: { address: '', address2: '', postalCode: '', city: '', state: '', country: '' } })
        getAllBranches();
      })
      .catch(response => {
        toast.error(response.data)
      })
  }

  const updateBranch = (branchId) => {
    privateAxios.get(`/admin/branch/${branchId}`)
      .then(response => {
        setNewBranch(response.data);
        openModal();
      })
      .catch(response => {
        toast.error('There was an error trying to update the branch details. Please try again.')
      })
  }

  const confirmBranchUpdate = (branchId) => {
    privateAxios.put(`/admin/branch/${branchId}`, newBranch)
      .then(response => {
        console.log(response)
        toast.success(response.data);
        closeModal();
        getAllBranches();
      })
      .catch(response => {
        toast.error(response.data);
      })
  }

  const deleteBranch = (branchId) => {
    privateAxios.delete(`/admin/branch/${branchId}`)
      .then(response => {
        getAllBranches();
        toast.success(response.data);
      })
      .catch(response => {
        toast.error(response.data);
      })
  }

  const viewEmployees = (branchId) => {
    props.setCurrentComponent({ name: 'View Employees', prop: branchId })
  }

  return (
    <div>
      <div className='container my-5'>
        <h3 className='utext my-5'>Branches</h3>
        <button className='btn btn-warning mb-3' onClick={() => { setAction('add'); setNewBranch({ branchName: '', phone: '', email: '', addressId: { address: '', address2: '', postalCode: '', city: '', state: '', country: '' } }); openModal(); }}>Add a Branch</button>
        <section className="intro">
          <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}>
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '700px' }}>
                          <table className="table table-striped mb-0">
                            <thead style={{ backgroundColor: '#f9e154' }}>
                              <tr>
                                <th scope="col">Branch Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address Line 1</th>
                                {/* <th scope="col">Address Line 2</th> */}
                                <th scope='col'>City</th>
                                <th scope='col'>State</th>
                                {/* <th scope='col'>Postal Code</th> */}
                                {/* <th scope='col'>Country</th> */}
                                <th scope='col'>Actions</th>
                                <th scope='col'>Update</th>
                                <th scope='col'>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {branches.map(branch => (
                                <tr key={branch.branchId}>
                                  <td>{branch.branchName}</td>
                                  <td>{branch.phone}</td>
                                  <td>{branch.email}</td>
                                  <td>{branch.addressId.address}</td>
                                  {/* <td>{branch.addressId.address2}</td> */}
                                  <td>{branch.addressId.city}</td>
                                  <td>{branch.addressId.state}</td>
                                  {/* <td>{branch.addressId.postalCode}</td> */}
                                  {/* <td>{branch.addressId.country}</td> */}
                                  <td><button type='button' className='btn btn-outline-warning' onClick={() => { viewEmployees(branch.branchId) }}>View Employees</button></td>
                                  <td><button type='button' className='btn btn-outline-warning' onClick={() => { setAction('update'); updateBranch(branch.branchId) }}>Update Branch</button></td>
                                  <td><button type='button' className='btn btn-outline-warning mx-3' onClick={() => { deleteBranch(branch.branchId) }}>Delete Branch</button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef}>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='modal-title fs-5' id='staticBackdropLabel'>Branch Details</h2>
            </div>
            <form>
              <div className='modal-body'>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label htmlFor='branchName' className='form-label'>Branch Name</label>
                    <input type='text' onChange={handleNewBranch} className='form-control' name='branchName' placeholder='Branch Name Here' value={newBranch.branchName} required />
                  </div>
                </div>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label htmlFor='phone' className='form-label'>Phone</label>
                    <input type='tel' onChange={handleNewBranch} className='form-control' name='phone' placeholder='Phone Here' pattern='[0-9]{10}' value={newBranch.phone} required minLength={10} />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' onChange={handleNewBranch} className='form-control' name='email' placeholder='Email here' value={newBranch.email} required minLength={5} />
                  </div>
                  <div className='col-12'>
                    <label htmlFor='address' className='form-label'>Address Line 1</label>
                    <input type='text' onChange={handleNewBranch} className='form-control' name='addressId.address' placeholder='Address Here' value={newBranch.addressId.address} required />
                  </div>
                  <div className='col-12'>
                    <label htmlFor='address2' className='form-label'>Address Line 2</label>
                    <input type='text' onChange={handleNewBranch} className='form-control' name='addressId.address2' placeholder='Address Here' value={newBranch.addressId.address2} required />
                  </div>
                  <div className='col-md-4'>
                    <label htmlFor='postalCode' className='form-label'>Postal Code</label>
                    <input type={'number'} onChange={handleNewBranch} className='form-control' name='addressId.postalCode' placeholder='Postal Code Here' value={newBranch.addressId.postalCode} required minLength={6} maxLength={6} />
                  </div>
                  <div className='col-md-4'>
                    <label htmlFor='city' className='form-label'>City</label>
                    <input type='text' onChange={handleNewBranch} className='form-control' name='addressId.city' placeholder='City Here' value={newBranch.addressId.city} required />
                  </div>
                  <div className='col-md-4'>
                    <label htmlFor='state' className='form-label'>State</label>
                    <input type='text' onChange={handleNewBranch} className='form-control' name='addressId.state' placeholder='State Here' value={newBranch.addressId.state} required />
                  </div>
                  <div className='col-md-12'>
                    <label htmlFor='country' className='form-label'>Country</label>
                    <input type='text' onChange={handleNewBranch} className='form-control' name='addressId.country' placeholder='Country Here' value={newBranch.addressId.country} required />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-outline-warning' onClick={closeModal}>Cancel</button>
                {action === 'add' ? <button type='submit' className='btn btn-warning' onClick={addBranch}>Add Branch</button> : <button type='submit' className='btn btn-warning' onClick={() => {confirmBranchUpdate(newBranch.branchId)}}>Confirm Branch Update</button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ViewBranches