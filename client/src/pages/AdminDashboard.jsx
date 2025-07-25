import React from 'react'
import Navbar from '../components/Navbar'


const AdminDashboard = () => {
  // Dummy data for pending orders
  const filteredOrders = [
    { orderId: "ORD-001", customerId: "CUST-101" },
    { orderId: "ORD-002", customerId: "CUST-102" },
    { orderId: "ORD-003", customerId: "CUST-103" },
    { orderId: "ORD-004", customerId: "CUST-104" },
    { orderId: "ORD-005", customerId: "CUST-105" },
  ]

  // Handle assign button click
  const handleAssign = (orderId) => {
    alert(`Assigning Order ${orderId}`)
  }

  // Handle delete button click
  const handleDelete = (orderId) => {
    const confirmed = window.confirm(`Are you sure you want to delete order ${orderId}?`)
    if (confirmed) {
      alert(`Order ${orderId} deleted`)
    }
  }

  return (
    <>
    <Navbar/>
    <div className="container py-5">
      {/* Page Heading */}
      <h1 className="fw-bold text-center mb-4">Pending Orders</h1>

      {/* Card Container */}
      <div className="card shadow-sm">
        <div className="card-body">
          {filteredOrders.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="fw-semibold">{order.orderId}</td>
                      <td>{order.customerId}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-outline-success btn-sm px-3"
                            onClick={() => handleAssign(order.orderId)}
                          >
                            Assign
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm px-3"
                            onClick={() => handleDelete(order.orderId)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">No pending orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard

