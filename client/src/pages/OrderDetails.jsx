import React from "react";
import Navbar from "../components/Navbar";

export default function OrderDetails() {
  const orderInfo = {
    orderId: "ORD-2024-001",
    trackingId: "TRK-789456123",
    orderPlacedOn: "January 15, 2024",
    weight: "2.5 kg",
    description: "Electronics - Smartphone with accessories",
  };

  const senderDetails = {
    name: "John Smith",
    address: "123 Main Street, New York, NY 10001",
  };

  const receiverDetails = {
    name: "Sarah Johnson",
    contact: "+1 (555) 123-4567",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* ✅ Your Navbar */}
      <Navbar />

      <div className="container py-4">
        <h2 className="mb-4">Order Details</h2>

        {/* ✅ Order Information Card */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header fw-bold">Order Information</div>
          <div className="card-body">
            <p>
              <span className="fw-bold">Order ID:</span> {orderInfo.orderId}
            </p>
            <p>
              <span className="fw-bold">Tracking ID:</span> {orderInfo.trackingId}
            </p>
            <p>
              <span className="fw-bold">Order Placed On:</span> {orderInfo.orderPlacedOn}
            </p>
            <p>
              <span className="fw-bold">Weight of Package:</span> {orderInfo.weight}
            </p>
            <p>
              <span className="fw-bold">Description:</span> {orderInfo.description}
            </p>
          </div>
        </div>

        {/* ✅ Sender Details Card */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header fw-bold">Sender Details</div>
          <div className="card-body">
            <p>
              <span className="fw-bold">Name:</span> {senderDetails.name}
            </p>
            <p>
              <span className="fw-bold">Address:</span> {senderDetails.address}
            </p>
          </div>
        </div>

        {/* ✅ Receiver Details Card */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header fw-bold">Receiver Details</div>
          <div className="card-body">
            <p>
              <span className="fw-bold">Name:</span> {receiverDetails.name}
            </p>
            <p>
              <span className="fw-bold">Contact:</span> {receiverDetails.contact}
            </p>
          </div>
        </div>

        {/* ✅ Buttons Section */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            ← Back to Orders
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            🖨 Print Details
          </button>
        </div>
      </div>
    </>
  );
}
