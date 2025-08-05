"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import {
  getPendingOrders,
  acceptOrder,
  getAcceptedTasks,
  updateOrderStatus,
  updateWarehouse,
  getOrderDetails,
} from "../services/staff_order"

function StaffDetails() {
  const [activeTab, setActiveTab] = useState("pending")
  const [pendingOrders, setPendingOrders] = useState([])
  const [acceptedTasks, setAcceptedTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [staffId] = useState(1) // Get from authentication context

  // Status update form state
  const [statusUpdate, setStatusUpdate] = useState({
    orderId: "",
    newStatus: "",
    staffId: staffId,
  })

  // Warehouse update form state
  const [warehouseUpdate, setWarehouseUpdate] = useState({
    orderId: "",
    newWarehouseId: "",
    staffId: staffId,
  })

  useEffect(() => {
    if (activeTab === "pending") {
      fetchPendingOrders()
    } else if (activeTab === "tasks") {
      fetchAcceptedTasks()
    }
  }, [activeTab])

  const fetchPendingOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const orders = await getPendingOrders()
      setPendingOrders(orders || [])
    } catch (err) {
      setError("Failed to fetch pending orders")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAcceptedTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const tasks = await getAcceptedTasks(staffId)
      setAcceptedTasks(tasks || [])
    } catch (err) {
      setError("Failed to fetch accepted tasks")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptOrder = async (orderId) => {
    try {
      const orderData = {
        orderId: orderId,
        staffId: staffId,
      }
      await acceptOrder(orderData)
      alert("Order accepted successfully!")
      fetchPendingOrders() // Refresh pending orders
      if (activeTab === "tasks") {
        fetchAcceptedTasks() // Refresh tasks if on tasks tab
      }
    } catch (err) {
      alert("Failed to accept order")
      console.error(err)
    }
  }

  const handleTaskClick = async (task) => {
    try {
      const orderDetails = await getOrderDetails(task.orderId)
      setSelectedTask(orderDetails)
    } catch (err) {
      console.error("Failed to fetch order details:", err)
      setSelectedTask(task) // Fallback to basic task info
    }
  }

  const handleStatusUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateOrderStatus(statusUpdate)
      alert("Order status updated successfully!")
      setStatusUpdate({ orderId: "", newStatus: "", staffId: staffId })
      fetchAcceptedTasks() // Refresh tasks
    } catch (err) {
      alert("Failed to update order status")
      console.error(err)
    }
  }

  const handleWarehouseUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateWarehouse(warehouseUpdate)
      alert("Warehouse updated successfully!")
      setWarehouseUpdate({ orderId: "", newWarehouseId: "", staffId: staffId })
      fetchAcceptedTasks() // Refresh tasks
    } catch (err) {
      alert("Failed to update warehouse")
      console.error(err)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Staff Dashboard</h2>

            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
              </div>
            )}

            {/* Navigation Tabs */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
                  onClick={() => setActiveTab("pending")}
                >
                  Pending Requests ({pendingOrders.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "tasks" ? "active" : ""}`}
                  onClick={() => setActiveTab("tasks")}
                >
                  My Tasks ({acceptedTasks.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "update" ? "active" : ""}`}
                  onClick={() => setActiveTab("update")}
                >
                  Update Orders
                </button>
              </li>
            </ul>

            {/* Loading Spinner */}
            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Pending Orders Tab */}
            {activeTab === "pending" && !loading && (
              <div className="row">
                <div className="col-12">
                  <h4>Available Orders</h4>
                  {pendingOrders.length === 0 ? (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      No pending orders available at the moment.
                    </div>
                  ) : (
                    <div className="row">
                      {pendingOrders.map((order) => (
                        <div key={order.orderId} className="col-md-6 col-lg-4 mb-3">
                          <div className="card h-100">
                            <div className="card-body">
                              <h6 className="card-title">Order #{order.orderId}</h6>
                              <p className="card-text">
                                <strong>From:</strong> {order.senderAddress}
                                <br />
                                <strong>To:</strong> {order.receiverAddress}
                                <br />
                                <strong>Priority:</strong>
                                <span
                                  className={`badge ms-1 ${
                                    order.priority === "HIGH"
                                      ? "bg-danger"
                                      : order.priority === "MEDIUM"
                                        ? "bg-warning"
                                        : "bg-success"
                                  }`}
                                >
                                  {order.priority}
                                </span>
                              </p>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleAcceptOrder(order.orderId)}
                              >
                                Accept Order
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* My Tasks Tab */}
            {activeTab === "tasks" && !loading && (
              <div className="row">
                <div className="col-md-6">
                  <h4>My Accepted Tasks</h4>
                  {acceptedTasks.length === 0 ? (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      You haven't accepted any tasks yet.
                    </div>
                  ) : (
                    <div className="list-group">
                      {acceptedTasks.map((task) => (
                        <button
                          key={task.orderId}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleTaskClick(task)}
                        >
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">Order #{task.orderId}</h6>
                            <span
                              className={`badge ${
                                task.status === "DELIVERED"
                                  ? "bg-success"
                                  : task.status === "IN_TRANSIT"
                                    ? "bg-primary"
                                    : task.status === "PICKED_UP"
                                      ? "bg-warning"
                                      : "bg-secondary"
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                          <p className="mb-1">
                            {task.senderAddress} → {task.receiverAddress}
                          </p>
                          <small>Click to view details</small>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <h4>Task Details</h4>
                  {selectedTask ? (
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Order #{selectedTask.orderId}</h6>
                        <div className="mb-2">
                          <strong>Status:</strong>
                          <span
                            className={`badge ms-2 ${
                              selectedTask.status === "DELIVERED"
                                ? "bg-success"
                                : selectedTask.status === "IN_TRANSIT"
                                  ? "bg-primary"
                                  : selectedTask.status === "PICKED_UP"
                                    ? "bg-warning"
                                    : "bg-secondary"
                            }`}
                          >
                            {selectedTask.status}
                          </span>
                        </div>
                        <p>
                          <strong>From:</strong> {selectedTask.senderAddress}
                        </p>
                        <p>
                          <strong>To:</strong> {selectedTask.receiverAddress}
                        </p>
                        <p>
                          <strong>Customer:</strong> {selectedTask.customerName}
                        </p>
                        <p>
                          <strong>Phone:</strong> {selectedTask.customerPhone}
                        </p>
                        {selectedTask.specialInstructions && (
                          <p>
                            <strong>Instructions:</strong> {selectedTask.specialInstructions}
                          </p>
                        )}
                        <p>
                          <strong>Warehouse:</strong> {selectedTask.warehouseId}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-secondary">
                      <i className="bi bi-arrow-left me-2"></i>
                      Select a task from the left to view details
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Update Orders Tab */}
            {activeTab === "update" && (
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5>Update Order Status</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleStatusUpdate}>
                        <div className="mb-3">
                          <label className="form-label">Order ID</label>
                          <input
                            type="number"
                            className="form-control"
                            value={statusUpdate.orderId}
                            onChange={(e) => setStatusUpdate({ ...statusUpdate, orderId: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">New Status</label>
                          <select
                            className="form-select"
                            value={statusUpdate.newStatus}
                            onChange={(e) => setStatusUpdate({ ...statusUpdate, newStatus: e.target.value })}
                            required
                          >
                            <option value="">Select Status</option>
                            <option value="PICKED_UP">Picked Up</option>
                            <option value="IN_TRANSIT">In Transit</option>
                            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                            <option value="DELIVERED">Delivered</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Update Status
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5>Update Warehouse</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleWarehouseUpdate}>
                        <div className="mb-3">
                          <label className="form-label">Order ID</label>
                          <input
                            type="number"
                            className="form-control"
                            value={warehouseUpdate.orderId}
                            onChange={(e) => setWarehouseUpdate({ ...warehouseUpdate, orderId: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">New Warehouse ID</label>
                          <input
                            type="number"
                            className="form-control"
                            value={warehouseUpdate.newWarehouseId}
                            onChange={(e) => setWarehouseUpdate({ ...warehouseUpdate, newWarehouseId: e.target.value })}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-success">
                          Update Warehouse
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffDetails
