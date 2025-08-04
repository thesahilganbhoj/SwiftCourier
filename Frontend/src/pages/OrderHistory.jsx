import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getOrdersByCustomerId } from "../services/customer_order";

function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState([]);

  const customerId = 1; // 🔁 Replace with actual logged-in customer ID

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByCustomerId(customerId);
        setOrders(data);
      } catch (error) {
        alert("Failed to load orders");
      }
    };

    fetchOrders();
  }, [customerId]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.receiverName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h2 className="mb-4">Order History</h2>

        {/* 🔍 Search + Filter */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Order ID or Receiver Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option> {/* ✅ New option */}
            </select>
          </div>
        </div>

        {/* 📋 Orders Table */}
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
                        <td>{order.receiverName}</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "Delivered"
                                ? "bg-success"
                                : order.status === "Pending"
                                ? "bg-warning text-dark"
                                : order.status === "In Transit"
                                ? "bg-info text-dark"
                                : "bg-secondary"
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
