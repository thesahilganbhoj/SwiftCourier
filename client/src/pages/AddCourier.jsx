// import React from 'react'
 import Navbar from '../components/Navbar'


export default function Component() {
  return (
    <>
      <Navbar />
    
    <div className="container-fluid py-5 bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="card-title text-center mb-4 fw-bold text-uppercase">Add Order</h4>

              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Sender Name:</label>
                  <input className="form-control" placeholder="Enter sender's name" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Sender Address:</label>
                  <textarea className="form-control" rows="2" placeholder="Enter sender's address"></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Receiver's Name:</label>
                  <input className="form-control" placeholder="Enter receiver's name" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Receiver's Address:</label>
                  <textarea className="form-control" rows="2" placeholder="Enter receiver's address"></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Receiver's Contact Number:</label>
                  <input className="form-control" type="tel" placeholder="Enter contact number" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Weight of Package (kg):</label>
                  <input className="form-control" type="number" min="0" placeholder="Enter weight" />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description:</label>
                  <textarea className="form-control" rows="3" placeholder="Enter package description"></textarea>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-outline-primary px-4">Add Order</button>
                  <button className="btn btn-outline-secondary px-4">Reset</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
