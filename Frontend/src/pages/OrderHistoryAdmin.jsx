import { useState } from "react"
import Navbar from "../components/Navbar";

export default function OrderHistoryAdmin() {
  // Dummy data for orders
  const [orders] = useState([
    {
      orderId: "ORD-001",
      customerId: "CUST-101",
      status: "Delivered",
      feedback: "Great service! Food arrived hot and on time.",
    },
    {
      orderId: "ORD-002",
      customerId: "CUST-102",
      status: "Cancelled",
      feedback: "-",
    },
    {
      orderId: "ORD-003",
      customerId: "CUST-103",
      status: "Delivered",
      feedback: "The delivery was a bit late but food quality was excellent.",
    },
    {
      orderId: "ORD-004",
      customerId: "CUST-104",
      status: "Cancelled",
      feedback: "Had to cancel due to emergency. Will order again soon.",
    },
    {
      orderId: "ORD-005",
      customerId: "CUST-105",
      status: "Delivered",
      feedback: "-",
    },
    {
      orderId: "ORD-006",
      customerId: "CUST-106",
      status: "Delivered",
      feedback: "Amazing food! The packaging was also very good.",
    },
    {
      orderId: "ORD-007",
      customerId: "CUST-107",
      status: "Cancelled",
      feedback: "-",
    },
    {
      orderId: "ORD-008",
      customerId: "CUST-108",
      status: "Delivered",
      feedback: "Quick delivery and tasty food. Highly recommended!",
    },
  ])

  const getStatusBadge = (status) => {
    if (status === "Delivered") {
      return <span className="badge bg-success">Delivered</span>
    } else if (status === "Cancelled") {
      return <span className="badge bg-danger">Cancelled</span>
    }
  }

  return (
    <>
      <Navbar />
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">Order History</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td className="fw-medium">{order.orderId}</td>
                          <td>{order.customerId}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            <div className="text-truncate" style={{ maxWidth: "300px" }}>
                              {order.feedback}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
