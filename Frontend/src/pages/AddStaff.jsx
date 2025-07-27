"use client";

import Navbar from '../components/Navbar'
import React, { useState } from "react";

export default function AddStaffForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    warehouseName: "",
    warehouseId: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      
<Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0 p-4">
              <div className="text-center mb-3">
                <h3 className="mb-1">Add New Staff</h3>
                <hr />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="contact" className="form-label">Contact</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="warehouseName" className="form-label">Warehouse Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="warehouseName"
                    name="warehouseName"
                    value={formData.warehouseName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="warehouseId" className="form-label">Warehouse ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="warehouseId"
                    name="warehouseId"
                    value={formData.warehouseId}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Add Staff
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
