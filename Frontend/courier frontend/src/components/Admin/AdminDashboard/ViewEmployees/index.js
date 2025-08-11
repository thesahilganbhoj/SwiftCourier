import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { privateAxios } from '../../../../services/helper';

function ViewEmployees(props) {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', phone: '', email: '', password: '', hireDate: '', salary: '', branchId: '' })
  const [confirmPassword, setConfirmPassword] = useState('');
  const [action, setAction] = useState('add');

  const handleConfirmPassword = (args) => {
    setConfirmPassword(args.target.value)
  }

  const handleNewEmployee = (event) => {
    const { name, value } = event.target;
    const updatedNewEmployee = { ...newEmployee };
    const [parentName, childName, grandchildName] = name.split('.');
    if (grandchildName) {
      // update a double nested property
      updatedNewEmployee[parentName][childName][grandchildName] = value;
    } else if (childName) {
      // update a single nested property
      updatedNewEmployee[parentName][childName] = value;
    } else {
      updatedNewEmployee[parentName] = value;
    }
    setNewEmployee(updatedNewEmployee);
  };

  useEffect(() => {
    privateAxios.get(`/admin/employees/${props.branchId}`)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting employees. Please try again...')
      })
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

  const getAllEmployees = () => {
    privateAxios.get(`/admin/employees/${props.branchId}`)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting employees. Please try again...')
      })
  }

  const addEmployee = (event) => {
    event.preventDefault();
    if (newEmployee.password !== confirmPassword) {
      toast.error("The passwords do not match");
    } else {
      // newEmployee.branchId = props.branchId;
      privateAxios.post(`/admin/employee/${props.branchId}`, newEmployee)
        .then(response => {
          closeModal();
          toast.success("Employee details are Added")
          setNewEmployee('')
          getAllEmployees();
        })
        .catch(response => {
          toast.error(response.data)
        })
    }
  }

  const updateEmployee = (userId) => {
    privateAxios.get(`/admin/employee/${userId}`)
      .then(response => {
        setNewEmployee(response.data);
        setConfirmPassword(response.data.password)
        openModal();
      })
      .catch(response => {
        toast.error('There was an error trying to update the employee details. Please try again.')
      })
  }

  const confirmEmployeeUpdate = (userId) => {
    // event.preventDefault();
    console.log(newEmployee);
    debugger;
    privateAxios.put(`/admin/employee/${userId}`, newEmployee)
      .then(response => {
        toast.success("Employee details are updated");
        closeModal();
        getAllEmployees();
      })
      .catch(response => {
        toast.error(response.data);
      })
  }

  const deleteEmployee = (userId) => {
    privateAxios.delete(`/admin/employee/${userId}`)
      .then(response => {
        getAllEmployees();
        toast.success("Employee details are deleted");
      })
      .catch(response => {
        toast.error(response.data);
      })
  }

  return (
    <div>
      <div className='container my-5'>
        <h3 className='utext my-5'>All Employees</h3>
        <button className='btn btn-warning mb-3' onClick={() => { setAction('add'); setNewEmployee(''); openModal(); }}>Add an Employee</button>
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
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope='col'>Phone</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Hire Date</th>
                                <th scope='col'>Salary</th>
                                <th scope='col'>Update</th>
                                <th scope='col'>Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {employees.map(employee => (
                                <tr key={employee.userId}>
                                  <td>{employee.firstName}</td>
                                  <td>{employee.lastName}</td>
                                  <td>{employee.phone}</td>
                                  <td>{employee.email}</td>
                                  <td>{employee.hireDate}</td>
                                  <td>{employee.salary}</td>
                                  <td><button type='button' className='btn btn-outline-warning' onClick={() => { setAction('update'); updateEmployee(employee.userId) }}>Update Employee</button></td>
                                  <td><button type='button' className='btn btn-outline-warning mx-3' onClick={() => { deleteEmployee(employee.userId) }}>Delete Employee</button></td>
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
              <h2 className='modal-title fs-5' id='staticBackdropLabel'>Employee Details</h2>
            </div>
            <form>
              <div className='modal-body'>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label htmlFor='firstName' className='form-label'>First Name</label>
                    <input type='text' onChange={handleNewEmployee} className='form-control' name='firstName' placeholder='First Name Here' value={newEmployee.firstName} required />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='lastName' className='form-label'>Last Name</label>
                    <input type='text' onChange={handleNewEmployee} className='form-control' name='lastName' placeholder='Last Name Here' value={newEmployee.lastName} required />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='phone' className='form-label'>Phone</label>
                    <input type='tel' onChange={handleNewEmployee} className='form-control' name='phone' placeholder='Phone Here' pattern='[0-9]{10}' value={newEmployee.phone} required minLength={10} />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type='email' onChange={handleNewEmployee} className='form-control' name='email' placeholder='Email here' value={newEmployee.email} required minLength={5} />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' className='form-control' name='password' placeholder='Password Here' onChange={handleNewEmployee} value={newEmployee.password} required />
                  </div>
                  <div className='col-md-6'>
                    <label for='confirmPassword' className='form-label'>Confirm Password</label>
                    <input type='password' className='form-control' name='confirmPassword' placeholder='Password Here' onChange={handleConfirmPassword} value={confirmPassword} required />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='hireDate' className='form-label'>HireDate</label>
                    <input type='date' onChange={handleNewEmployee} className='form-control' name='hireDate' placeholder='Hire Date here' value={newEmployee.hireDate} required />
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='salary' className='form-label'>Salary</label>
                    <input type='number' onChange={handleNewEmployee} className='form-control' name='salary' placeholder='Salary here' value={newEmployee.salary} required />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-outline-warning' onClick={closeModal}>Cancel</button>
                {action === 'add' ? <button type='submit' className='btn btn-warning' onClick={addEmployee}>Add Employee</button> : <button type='submit' className='btn btn-warning' onClick={() => { confirmEmployeeUpdate(newEmployee.userId) }}>Confirm Employee Update</button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEmployees