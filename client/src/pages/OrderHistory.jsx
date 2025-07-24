import React, { useState } from "react";
import Navbar from "../components/Navbar";

function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const sampleOrders = [
    { orderId: "ORD001", receiver: "John Doe", status: "Delivered" },
    { orderId: "ORD002", receiver: "Alice Smith", status: "Pending" },
    { orderId: "ORD003", receiver: "Bob Johnson", status: "Delivered" },
    { orderId: "ORD004", receiver: "Charlie Brown", status: "Pending" },
  ];

  // ✅ Filter logic for search + status
  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.receiver.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h2 className="mb-4">Order History</h2>

        {/* ✅ Search + Filter Row */}
        <div className="row mb-4 justify-content-center">
          {/* Search Box */}
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Order ID or Receiver Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
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
                          <span
                            className={`badge ${
                              order.status === "Delivered"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted">No orders found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
