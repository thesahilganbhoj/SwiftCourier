import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { addOrder } from "../services/customer_order";

export default function AddCourier() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
    receiverContact: "",
    weight: "",
    description: "",
    sourceCity: "",
    destinationCity: "",
    sourceWarehouseId: "",
    destinationWarehouseId: "",
    customer: { customerId: 1 } // Example static customer ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addOrder(formData);
      alert(`Order added successfully! Tracking ID: ${res.data.trackingId}`);
      handleReset();
    } catch (error) {
      alert("Failed to add order.");
      console.error(error);
    }
  };

  const handleReset = () => {
    setFormData({
      senderName: "",
      senderAddress: "",
      receiverName: "",
      receiverAddress: "",
      receiverContact: "",
      weight: "",
      description: "",
      sourceCity: "",
      destinationCity: "",
      sourceWarehouseId: "",
      destinationWarehouseId: "",
      customer: { customerId: 1 }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5 bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h4 className="card-title text-center mb-4 fw-bold text-uppercase">
                  Add Order
                </h4>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Sender Name:</label>
                    <input
                      className="form-control"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      placeholder="Enter sender's name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Sender Address:</label>
                    <textarea
                      className="form-control"
                      name="senderAddress"
                      value={formData.senderAddress}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Enter sender's address"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Source City:</label>
                    <input
                      className="form-control"
                      name="sourceCity"
                      value={formData.sourceCity}
                      onChange={handleChange}
                      placeholder="Enter source city"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Destination City:</label>
                    <input
                      className="form-control"
                      name="destinationCity"
                      value={formData.destinationCity}
                      onChange={handleChange}
                      placeholder="Enter destination city"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Source Warehouse ID:</label>
                    <input
                      className="form-control"
                      name="sourceWarehouseId"
                      type="number"
                      value={formData.sourceWarehouseId}
                      onChange={handleChange}
                      placeholder="Enter source warehouse ID"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Destination Warehouse ID:</label>
                    <input
                      className="form-control"
                      name="destinationWarehouseId"
                      type="number"
                      value={formData.destinationWarehouseId}
                      onChange={handleChange}
                      placeholder="Enter destination warehouse ID"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Receiver's Name:</label>
                    <input
                      className="form-control"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleChange}
                      placeholder="Enter receiver's name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Receiver's Address:</label>
                    <textarea
                      className="form-control"
                      name="receiverAddress"
                      value={formData.receiverAddress}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Enter receiver's address"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Receiver's Contact Number:</label>
                    <input
                      className="form-control"
                      type="tel"
                      name="receiverContact"
                      value={formData.receiverContact}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Weight of Package (kg):</label>
                    <input
                      className="form-control"
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Enter weight"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Description:</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter package description"
                    />
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button type="submit" className="btn btn-outline-primary px-4">
                      Add Order
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-outline-secondary px-4"
                    >
                      Reset
                    </button>
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
