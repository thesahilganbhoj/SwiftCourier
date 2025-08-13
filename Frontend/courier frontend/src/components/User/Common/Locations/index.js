import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { publicAxios } from '../../../../services/helper';

function Locations() {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        publicAxios.get('/branch')
            .then(response => {
                setBranches(response.data)
            })
            .catch(response => {
                toast.error('There was an error getting our branches data. Please try again.')
            })
    }, [])

    return (
        <div className='container my-5' >
            <h1 className='utext my-5'>Locations</h1>
            <div className='container my-5 row row-cols-1 row-cols-md-4 g-4'>
                {branches.map(branch => (
                    <div className='col' key={branch.branchId}>
                        <div className='card h-100'>
                            <img src="https://cdn-icons-png.flaticon.com/512/4400/4400913.png" alt="" style={{maxHeight:"200px"}}/>
                            <div className='card-body'>
                                <h3 className='card-title my-5'>{branch.branchName}</h3>
                                <p className='card-text'>{branch.addressId.address}</p>
                                <p className='card-text'>{branch.addressId.address2}</p>
                                <p className='card-text'>{branch.addressId.city}, {branch.addressId.state}, {branch.addressId.country}</p>
                                <p className='card-text'>{branch.addressId.postalCode}</p>
                                <p className='card-text'>{branch.phone}</p>
                                <p className='card-text'>{branch.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Locations