"use client";

import Navbar from '../components/Navbar';
import React, { useState } from "react";

export default function AddStaffForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    warehouseName: "",
    warehouseId: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }

    if (!formData.warehouseName.trim()) newErrors.warehouseName = "Warehouse name is required";
    if (!formData.warehouseId) newErrors.warehouseId = "Warehouse ID is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // ✅ Stop submission if validation fails

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/staff/createStaff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.text();
        alert(data);
        setFormData({
          name: "",
          email: "",
          password: "",
          contactNumber: "",
          warehouseName: "",
          warehouseId: "",
          city: "",
          address: "",
        });
      } else {
        const errorText = await response.text();
        alert("❌ Failed: " + errorText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Something went wrong while adding staff!");
    } finally {
      setLoading(false);
    }
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

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Email */}
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Password */}
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                {/* Contact Number */}
                <div className="form-group mb-3">
                  <label htmlFor="contactNumber" className="form-label">Contact</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                  {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                </div>

                {/* Warehouse Name */}
                <div className="form-group mb-3">
                  <label htmlFor="warehouseName" className="form-label">Warehouse Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.warehouseName ? "is-invalid" : ""}`}
                    id="warehouseName"
                    name="warehouseName"
                    value={formData.warehouseName}
                    onChange={handleInputChange}
                  />
                  {errors.warehouseName && <div className="invalid-feedback">{errors.warehouseName}</div>}
                </div>

                {/* Warehouse ID */}
                <div className="form-group mb-3">
                  <label htmlFor="warehouseId" className="form-label">Warehouse ID</label>
                  <input
                    type="number"
                    className={`form-control ${errors.warehouseId ? "is-invalid" : ""}`}
                    id="warehouseId"
                    name="warehouseId"
                    value={formData.warehouseId}
                    onChange={handleInputChange}
                  />
                  {errors.warehouseId && <div className="invalid-feedback">{errors.warehouseId}</div>}
                </div>

                {/* City */}
                <div className="form-group mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>

                {/* Address */}
                <div className="form-group mb-4">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Adding..." : "Add Staff"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
