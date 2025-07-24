import React from 'react'
import Navbar from '../components/Navbar'

function AddCourier() {
  return (
    <div class="container">
      <Navbar />

      <h2 class="page-header">Place Order</h2>
      <div className='row mb-3'>
        <div className='col'>
          <p>Sender Name :</p>
          <input type="text" name="" id="" className='form-control' />
        </div>
        <div className='col'>
          <p>Sender Address</p>
          <textarea name="" id="" className="form-control"></textarea>

        </div>
      </div>
      <div className='row mb-3'>
        <div className='col'>
          <p>Receiver's Name</p>
          <input type="text" name="" id="" className='form-control' />
        </div>
        <div className='col'>
          <p>Receiver's Contact Number</p>
          <input type="tel" name="" id="" className='form-control' />

        </div>
      </div>

      <div className='row mb-3'>
        <div className='col'>
          <p>Weight of Package </p>
          <input type="number" name="" id="" className='form-control' />
        </div>
        <div className='col'>
          <p>Description </p>
          <textarea name="" id="" className="form-control"></textarea>

        </div>
      </div>

      <div className='row'>
        <div className='col-md-6'>
          <button className='btn btn-success ms-2' > Save</button>
          <button className='btn btn-danger ms-2 '> Cancel</button>

        </div>


      </div>

    </div>

  )
}

export default AddCourier
