import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../services/customer_order";
import Navbar from "../components/Navbar";

export default function OrderDetails() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async (id) => {
    if (!id.trim()) {
      setError("Please enter an Order ID");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const data = await getOrderDetails(id);
      setOrder(data);
    } catch (error) {
      setError("Order not found or error loading order details");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrder(orderId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h2 className="mb-4">Order Details</h2>
        
        {/* Order ID Search Form */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header fw-bold">Search Order</div>
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="row">
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Order ID (e.g., ORD001)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Searching...
                      </>
                    ) : (
                      "🔍 Search Order"
                    )}
                  </button>
                </div>
              </div>
            </form>
            
            {/* Error Message */}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Order Details - Only show if order exists */}
        {order && (
          <>
            <div className="card mb-4 shadow-sm">
              <div className="card-header fw-bold">Order Information</div>
              <div className="card-body">
                <p><b>Order ID:</b> {order.orderId}</p>
                <p><b>Tracking ID:</b> {order.trackingId}</p>
                <p><b>Order Placed On:</b> {order.orderPlacedOn}</p>
                <p><b>Weight:</b> {order.weight} kg</p>
                <p><b>Description:</b> {order.description}</p>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-header fw-bold">Sender Details</div>
              <div className="card-body">
                <p><b>Name:</b> {order.senderName}</p>
                <p><b>Address:</b> {order.senderAddress}</p>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-header fw-bold">Receiver Details</div>
              <div className="card-body">
                <p><b>Name:</b> {order.receiverName}</p>
                <p><b>Contact:</b> {order.receiverContact}</p>
                <p><b>Address:</b> {order.receiverAddress}</p>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setOrder(null);
                  setOrderId("");
                  setError("");
                }}
              >
                ← Search Another Order
              </button>
              <button className="btn btn-primary" onClick={handlePrint}>
                🖨 Print Details
              </button>
            </div>
          </>
        )}

        {/* No Results Message */}
        {!loading && !order && orderId && !error && (
          <div className="alert alert-info" role="alert">
            Enter an Order ID and click "Search Order" to view details.
          </div>
        )}
      </div>
    </>
  );
}