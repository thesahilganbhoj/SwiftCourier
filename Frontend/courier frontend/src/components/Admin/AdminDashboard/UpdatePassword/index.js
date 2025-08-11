import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../../../services/auth';
import { privateAxios } from '../../../../services/helper';

function UpdatePassword(props) {
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' })
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handlePasswords = (event) => {
    const { name, value } = event.target;
    const updatedPasswords = { ...passwords };
    const [parentName, childName, grandchildName] = name.split('.');
    if (grandchildName) {
      // update a double nested property
      updatedPasswords[parentName][childName][grandchildName] = value;
    } else if (childName) {
      // update a single nested property
      updatedPasswords[parentName][childName] = value;
    } else {
      updatedPasswords[parentName] = value;
    }
    setPasswords(updatedPasswords);
  };

  const handleConfirmPassword = (args) => {
    setConfirmNewPassword(args.target.value)
  }

  const updatePassword = (event) => {
    event.preventDefault();
    if (confirmNewPassword !== passwords.newPassword) {
      toast.error('Your new passwords do not match!')
    } else {
      const id = getCurrentUser().userId;
      privateAxios.patch(`/admin/profile/${id}`, passwords)
        .then(response => {
          toast.success(response.data)
          props.setCurrentComponent({name: 'Profile'});
        })
        .catch(response => toast.error(response.data))
    }
  }

  return (
    <div className='container my-5'>
      <h3 className='utext my-5'>Update Password</h3>
      <form>
        <div className='mb-3 row'>
          <div className='col-md-4'>
            <label htmlFor='oldPassword' className='form-label'>Old Password</label>
            <input type='password' className='form-control' name='oldPassword' placeholder='Old Password Here' onChange={handlePasswords} value={passwords.oldPassword} required minLength={8} />
          </div>
        </div>
        <div className='mb-3 row'>
          <div className='col-md-4'>
            <label htmlFor='newPassword' className='form-label'>New Password</label>
            <input type='password' className='form-control' name='newPassword' placeholder='New Password Here' onChange={handlePasswords} value={passwords.newPassword} required minLength={8} />
          </div>
        </div>
        <div className='mb-3 row'>
          <div className='col-md-4'>
            <label htmlFor='confirmNewPassword' className='form-label'>Confirm New Password</label>
            <input type='password' className='form-control' name='confirmNewPassword' placeholder='Confirm New Password' onChange={handleConfirmPassword} value={confirmNewPassword} required minLength={8} />
          </div>
        </div>
        <button type='button' className='btn btn-outline-warning' onClick={() => props.setCurrentComponent({name: 'Profile'})}>Cancel</button>
        <button type='submit' className='btn btn-warning mx-3' onClick={updatePassword}>Update Password</button>
      </form>
    </div>
  )
}

export default UpdatePassword