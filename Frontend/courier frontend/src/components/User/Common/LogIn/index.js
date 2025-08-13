import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { handleLogin, isAdmin, isClient, isEmployee, isLoggedIn } from '../../../../services/auth';
import { publicAxios } from '../../../../services/helper';

function LogIn() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const loggedIn = isLoggedIn();

    const handleCredentials = (event) => {
        const { name, value } = event.target;
        const updatedCredentials = { ...credentials };
        const [parentName, childName, grandchildName] = name.split('.');
        if (grandchildName) {
            // update a double nested property
            updatedCredentials[parentName][childName][grandchildName] = value;
        } else if (childName) {
            // update a single nested property
            updatedCredentials[parentName][childName] = value;
        } else {
            updatedCredentials[parentName] = value;
        }
        setCredentials(updatedCredentials);
    };

    const login = (event) => {
        event.preventDefault();
        publicAxios.defaults.baseURL = "http://localhost:8080";
        publicAxios.post("/auth/signin", credentials)
            .then(response => {
                handleLogin(response.data)
                if (isAdmin()) {
                    navigate("/admin/dashboard");
                } else if (isEmployee()) {
                    navigate("/employee/dashboard");
                } else if (isClient()) {
                    navigate('/client/dashboard')
                }
            })
            .catch(response => {
                toast.error('There was an error logging you in. Please try again...')
            })
            .finally(() => {
                //Resetting the base url to its original value
                publicAxios.defaults.baseURL = "http://localhost:8080/api";
            })
    }

    return (
        <div className='container my-5'>
            <form className='container my-5'>
                <h1 className='utext my-5'>Log In</h1>
                <div className='mb-3 row'>
                    <div className='col-md-4'>
                        <label for='email' className='col-form-label'>Email</label>
                        <input type='email' className='form-control' name='email' placeholder='Email Here' onChange={handleCredentials} value={credentials.email} required minLength={5} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <div className='col-md-4'>
                        <label for='password' className='form-label'>Password</label>
                        <input type='password' className='form-control' name='password' placeholder='Password Here' onChange={handleCredentials} value={credentials.password} required minLength={8} />
                    </div>
                </div>
                <button type='submit' className='btn btn-success' onClick={login}>Log In</button>
            </form>
            <div className='container my-5'>
                <h3>New To Courier Services</h3>
                <p>Save time on your shipping activities with a your account.</p>
                {loggedIn ? (
                    <Link className='btn btn-success' to={'/client/dashboard'}>Sign Up</Link>
                ) : (
                    <Link className='btn btn-success' to={'/signup'}>Sign Up</Link>
                )}
            </div>
        </div>
    )
}

export default LogIn