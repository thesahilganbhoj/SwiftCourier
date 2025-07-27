import React, { useState } from "react";
import Navbar from "../components/Navbar";

function TrackCourier() {
  const [searchTerm, setSearchTerm] = useState("");

  const sampleOrders = [
    { orderId: "ORD001", receiver: "John Doe", status: "Delivered" },
    { orderId: "ORD002", receiver: "Alice Smith", status: "Pending" },
    { orderId: "ORD003", receiver: "Bob Johnson", status: "Delivered" },
    { orderId: "ORD004", receiver: "Charlie Brown", status: "Pending" },
  ];

  // ✅ Show only PENDING orders + match search term
  const filteredOrders = sampleOrders.filter(
    (order) =>
      order.status === "Pending" && // ✅ only pending orders
      (order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.receiver.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h2 className="mb-4">Pending Orders</h2>

        {/* ✅ Search Bar */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Order ID or Receiver Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ✅ Orders Table */}
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
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.orderId}</td>
                        <td>{order.receiver}</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted">
                ✅ No pending orders found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackCourier;
