import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getPendingOrders, trackOrderByTrackingId } from "../services/customer_order";

function TrackCourier() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const data = await getPendingOrders();
        setOrders(data);
      } catch (err) {
        alert("Failed to load pending orders.");
      }
    };
    fetchPendingOrders();
  }, []);

  // 🔍 Filter logic based on tracking ID or receiver
  const filteredOrders = orders.filter(
    (order) =>
      order.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.receiverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") return;
      const order = await trackOrderByTrackingId(searchTerm.trim());
      setOrders([order]); // Show only the matched order
    } catch (err) {
      alert("Order not found or not pending.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h2 className="mb-4">Pending Orders</h2>

        <div className="row mb-4 justify-content-center">
          <div className="col-md-6 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Tracking ID or Receiver Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <button className="btn btn-primary" onClick={handleSearch}>
              Track
            </button> */}
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {filteredOrders.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Order ID</th>
                      <th>Receiver Name</th>
                      <th>Status</th>
                      <th>Tracking ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.orderId}</td>
                        <td>{order.receiverName}</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            {order.status}
                          </span>
                        </td>
                        <td>{order.trackingId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted">No pending orders found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackCourier;
