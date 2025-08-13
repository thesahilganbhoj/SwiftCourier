import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../../../../services/auth';
import { privateAxios } from '../../../../../services/helper';

function ClientProfile() {
  const [client, setClient] = useState('')
  const [updatedClient, setUpdatedClient] = useState({ firstName: '', lastName: '', phone: '', email: '' })

  const handleUpdatedClient = (event) => {
    const { name, value } = event.target;
    const copyOfUpdatedClient = { ...updatedClient };
    const [parentName, childName, grandchildName] = name.split('.');
    if (grandchildName) {
      // update a double nested property
      copyOfUpdatedClient[parentName][childName][grandchildName] = value;
    } else if (childName) {
      // update a single nested property
      copyOfUpdatedClient[parentName][childName] = value;
    } else {
      copyOfUpdatedClient[parentName] = value;
    }
    setUpdatedClient(copyOfUpdatedClient);
  };

  useEffect(() => {
    const id = getCurrentUser().userId;
    privateAxios.get(`/client/profile/${id}`)
      .then(response => {
        setClient(response.data);
        setUpdatedClient(response.data);
      })
  }, [])

  const updateProfile = (event) => {
    event.preventDefault();
    const id = getCurrentUser().userId;
    privateAxios.put(`/client/profile/${id}`, updatedClient)
      .then(response => {
        setClient(updatedClient)
        closeModal();
        toast.success(response.data)
      })
      .catch(response => {
        toast.error(response.data)
      })
  }

  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.classList.add('show');
    modalRef.current.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  const closeModal = () => {
    setUpdatedClient(client)
    modalRef.current.classList.remove('show');
    modalRef.current.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  return (
    <>
      <div className='container my-5'>
        <h3 className='utext my-5'>Your Profile</h3>
        <div className='row'>
          <div className='col-md-5 my-3'>
            <label htmlFor='firstName' className='form-label'>First Name</label>
            <p className='lead'>{client.firstName}</p>
          </div>
          <div className='col-md-5 my-3'>
            <label htmlFor='lastName' className='form-label'>Last Name</label>
            <p className='lead'>{client.lastName}</p>
          </div>
          <div className='col-md-5 my-3'>
            <label htmlFor='phone' className='form-label'>Phone</label>
            <p className='lead'>{client.phone}</p>
          </div>
          <div className='col-md-5 my-3'>
            <label htmlFor='email' className='form-label'>Email</label>
            <p className='lead'>{client.email}</p>
          </div>
        </div>
        <button type='button' className='btn btn-warning' onClick={openModal}>Update Profile</button>
      </div>

      <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>Update Profile</h1>
            </div>
            <form className='row g-3 needs-validation'>
              <div className='modal-body'>
                <div className='col-md-5 my-3'>
                  <label htmlFor='firstName' className='form-label'>First Name</label>
                  <input type='text' onChange={handleUpdatedClient} className='form-control' name='firstName' placeholder='First Name Here' value={updatedClient.firstName} required />
                </div>
                <div className='col-md-5 my-3'>
                  <label htmlFor='lastName' className='form-label'>Last Name</label>
                  <input type='text' onChange={handleUpdatedClient} className='form-control' name='lastName' placeholder='Last Name Here' value={updatedClient.lastName} required />
                </div>
                <div className='col-md-5 my-3'>
                  <label htmlFor='phone' className='form-label'>Phone</label>
                  <input type='tel' onChange={handleUpdatedClient} className='form-control' name='phone' placeholder='Phone Here' pattern='[0-9]{10}' value={updatedClient.phone} required minLength={10} />
                </div>
                <div className='col-md-5 my-3'>
                  <label htmlFor='email' className='form-label'>Email</label>
                  <input type='email' onChange={handleUpdatedClient} className='form-control' name='email' placeholder='Email here' value={updatedClient.email} required minLength={5} />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-outline-warning' onClick={() => {setUpdatedClient(client); closeModal();}}>Cancel</button>
                <button type='submit' className='btn btn-warning mx-3' onClick={updateProfile}>Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientProfile