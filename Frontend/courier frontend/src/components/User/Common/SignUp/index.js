import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { isLoggedIn } from '../../../../services/auth';
import { publicAxios } from '../../../../services/helper';

function SignUp() {
    const [user, setUser] = useState({ firstName: '', lastName: '', phone: '', email: '', password: '' })
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const loggedIn = isLoggedIn();

    const handleUser = (event) => {
        const { name, value } = event.target;
        const updatedUser = { ...user };
        const [parentName, childName, grandchildName] = name.split('.');
        if (grandchildName) {
            // update a double nested property
            updatedUser[parentName][childName][grandchildName] = value;
        } else if (childName) {
            // update a single nested property
            updatedUser[parentName][childName] = value;
        } else {
            updatedUser[parentName] = value;
        }
        setUser(updatedUser);
    };

    const handleConfirmPassword = (args) => {
        setConfirmPassword(args.target.value)
    }

    const signUp = (event) => {
        event.preventDefault();
        if (user.password !== confirmPassword) {
            toast.error("Your passwords do not match");
        } else {
            publicAxios.post('/client/signup', user)
                .then(response => {
                    toast.success('You have signed up succesfully')
                    navigate('/login')
                })
                .catch(response => {
                    toast.error('Error while signing up. Please try again.')
                })
        }
    }

    return (
        <>
            <div className='container my-5'>
                <form>
                    <h1 className='utext my-5'>Sign Up</h1>
                    <div className='mb-3 row'>
                        <div className='col-md-4'>
                            <label htmlFor='firstName' className='form-label'>First Name</label>
                            <input type='text' className='form-control' name='firstName' placeholder='First Name Here' onChange={handleUser} value={user.firstName} required />
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='lastName' className='form-label'>Last Name</label>
                            <input type='text' className='form-control' name='lastName' placeholder='Last Name Here' onChange={handleUser} value={user.lastName} required />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className='col-md-4'>
                            <label htmlFor='phone' className='form-label'>Phone</label>
                            <input type='tel' className='form-control' name='phone' placeholder='Phone here' onChange={handleUser} pattern='[0-9]{10}' value={user.phone} required minLength={10} />
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type='text' className='form-control' name='email' placeholder='Email Here' onChange={handleUser} value={user.email} required minLength={5} />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className='col-md-4'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type='password' className='form-control' name='password' placeholder='Password Here' onChange={handleUser} value={user.password} required minLength={8} />
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                            <input type='password' className='form-control' name='confirmPassword' placeholder='Confirm Password Here' onChange={handleConfirmPassword} value={confirmPassword} required minLength={8} />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success' onClick={signUp}>Sign Up</button>
                </form>
            </div>
            <div className='container my-5'>
                <h3>Already have an account ?</h3>
                {loggedIn ? (
                    <Link className='btn btn-outline-success' to={'/client/dashboard'}>Log In</Link>
                ) : (
                    <Link className='btn btn-outline-success' to={'/login'}>Log In</Link>
                )}
            </div>
        </>
    )
}

export default SignUp