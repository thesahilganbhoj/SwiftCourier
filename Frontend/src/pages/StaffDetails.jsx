"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import {
  getAcceptedTasks,
  acceptOrder,
  getPendingOrders,
  getStaffAvailability,
  updateStaffAvailability,
} from "../services/staff"

export default function StaffDetails() {
  const [requests, setRequests] = useState([])
  const [acceptedTasks, setAcceptedTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Availability state
  const [availability, setAvailability] = useState(null)
  const [updatingAvailability, setUpdatingAvailability] = useState(false)

  const { staffId: paramStaffId } = useParams()
  const navigate = useNavigate()

  // Get staff ID from URL params or default to 1 for testing
  const staffId = paramStaffId ? Number.parseInt(paramStaffId) : 1

  // Fetch data on component mount
  useEffect(() => {
    fetchPendingOrders()
    fetchAcceptedTasks()
    fetchStaffAvailability()
  }, [staffId])

  const fetchPendingOrders = async () => {
    try {
      setLoading(true)
      const orders = await getPendingOrders()
      setRequests(orders || [])
    } catch (err) {
      console.error("Failed to fetch pending orders:", err)
      setError("Failed to load pending orders")
    } finally {
      setLoading(false)
    }
  }

  const fetchAcceptedTasks = async () => {
    try {
      setLoading(true)
      const tasks = await getAcceptedTasks(staffId)
      setAcceptedTasks(tasks || [])
      if (tasks && tasks.length > 0) {
        setSelectedTask(tasks[0]) // Select first task by default
      } else {
        setSelectedTask(null) // Clear selection if no tasks
      }
    } catch (err) {
      console.error("Failed to fetch accepted tasks:", err)
      setAcceptedTasks([])
      setSelectedTask(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchStaffAvailability = async () => {
    try {
      const availabilityData = await getStaffAvailability(staffId)
      setAvailability(availabilityData)
    } catch (err) {
      console.error("Failed to fetch staff availability:", err)
      // Set default availability if fetch fails
      setAvailability({
        staffId: staffId,
        isAvailable: true,
        currentLocation: "Unknown",
        lastUpdated: new Date().toISOString(),
      })
    }
  }

  const handleAvailabilityUpdate = async (newAvailabilityStatus) => {
    try {
      setUpdatingAvailability(true)
      setError(null)

      const updateData = {
        isAvailable: newAvailabilityStatus,
        currentLocation: availability?.currentLocation || "Unknown",
      }

      console.log("Updating availability with data:", updateData)

      const response = await updateStaffAvailability(staffId, updateData)
      console.log("Availability update response:", response)

      // Update local state
      setAvailability((prev) => ({
        ...prev,
        isAvailable: newAvailabilityStatus,
        lastUpdated: new Date().toLocaleString(),
      }))

      const statusText = newAvailabilityStatus ? "Available" : "Unavailable"
      alert(`Availability updated to ${statusText} successfully!`)
    } catch (err) {
      setError("Failed to update availability")
      console.error("Error updating availability:", err)
      alert("Failed to update availability. Please try again.")
    } finally {
      setUpdatingAvailability(false)
    }
  }

  const handleAccept = async (request) => {
    try {
      setLoading(true)
      setError(null)

      const acceptData = {
        orderId: request.orderId,
        staffId: staffId,
        senderAddress: request.senderAddress,
        receiverAddress: request.receiverAddress,
        weight: request.weight,
        description: request.description,
      }

      await acceptOrder(acceptData)

      // Remove from requests and refresh accepted tasks
      setRequests(requests.filter((req) => req.orderId !== request.orderId))
      await fetchAcceptedTasks()

      alert("Order accepted successfully!")
    } catch (err) {
      setError("Failed to accept order. Please try again.")
      console.error("Error accepting order:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDecline = (requestId) => {
    setRequests(requests.filter((req) => req.orderId !== requestId))
  }

  const handleUpdateStatus = () => {
    if (!selectedTask) {
      alert("Please select a task first")
      return
    }
    // Navigate to update status page with task details
    navigate(`/staff/update-status/${staffId}/${selectedTask.orderId}`)
  }

  // Helper function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-success"
      case "IN_TRANSIT":
        return "bg-warning"
      case "OUT_FOR_DELIVERY":
        return "bg-info"
      case "PICKED_UP":
        return "bg-primary"
      case "AT_SOURCE_WAREHOUSE":
        return "bg-secondary"
      case "AT_DESTINATION_WAREHOUSE":
        return "bg-dark"
      case "ACCEPTED":
        return "bg-info"
      case "CANCELLED":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  // Helper function to get readable status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "PICKED_UP":
        return "Picked Up"
      case "AT_SOURCE_WAREHOUSE":
        return "At Source Warehouse"
      case "IN_TRANSIT":
        return "In Transit"
      case "AT_DESTINATION_WAREHOUSE":
        return "At Destination Warehouse"
      case "OUT_FOR_DELIVERY":
        return "Out for Delivery"
      case "DELIVERED":
        return "Delivered"
      case "CANCELLED":
        return "Cancelled"
      case "ACCEPTED":
        return "Accepted"
      default:
        return status
    }
  }

  // Helper function to get next possible status
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "ACCEPTED":
        return "Pick up the package"
      case "PICKED_UP":
        return "Deliver to source warehouse"
      case "OUT_FOR_DELIVERY":
        return "Deliver to receiver"
      default:
        return "Update status"
    }
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid py-3">
        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        {/* Staff ID Display with Availability */}
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-between align-items-center pe-5">
            <div>
              <h4 className="mb-0">Staff Dashboard - ID: {staffId}</h4>
              <small className="text-muted">Manage your delivery tasks through the complete delivery process</small>
            </div>

            {/* Availability Dropdown */}
            <div className="dropdown">
              <button
                className={`btn ${availability?.isAvailable ? "btn-success" : "btn-danger"} dropdown-toggle`}
                type="button"
                id="availabilityDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={updatingAvailability}
              >
                {updatingAvailability ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className={`bi ${availability?.isAvailable ? "bi-check-circle" : "bi-x-circle"} me-2`}></i>
                    {availability?.isAvailable ? "Available" : "Unavailable"}
                  </>
                )}
              </button>
              <ul className="dropdown-menu" aria-labelledby="availabilityDropdown">
                <li>
                  <button
                    className={`dropdown-item ${availability?.isAvailable ? "active" : ""}`}
                    onClick={() => handleAvailabilityUpdate(true)}
                    disabled={updatingAvailability}
                  >
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Available
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${!availability?.isAvailable ? "active" : ""}`}
                    onClick={() => handleAvailabilityUpdate(false)}
                    disabled={updatingAvailability}
                  >
                    <i className="bi bi-x-circle text-danger me-2"></i>
                    Unavailable
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <span className="dropdown-item-text text-muted small">
                    <i className="bi bi-clock me-1"></i>
                    Last updated:{" "}
                    {availability?.lastUpdated ? new Date(availability.lastUpdated).toLocaleString() : "Unknown"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Delivery Process Flow */}
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="alert alert-light border" role="alert">
              <h6 className="alert-heading">
                <i className="bi bi-diagram-3 me-2"></i>
                Delivery Process Flow
              </h6>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <span className="badge bg-info">Accept Order</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-primary">Pick Up</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-secondary">Source Warehouse</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-warning">In Transit (Admin)</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-dark">Destination Warehouse (Admin)</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-info">Out for Delivery</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-success">Delivered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Section */}
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">
                  <i className="bi bi-inbox me-2"></i>
                  Pending Requests (Admin Assigned)
                </h4>

                {loading && requests.length === 0 ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading pending requests...</p>
                  </div>
                ) : requests.length === 0 ? (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    No pending requests assigned by admin at the moment.
                  </div>
                ) : (
                  requests.map((request) => (
                    <div key={request.orderId} className="card mb-3 border-primary">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="mb-2">
                              <strong>Order ID:</strong> {request.orderId}
                            </div>
                            <div className="mb-2">
                              <strong>Tracking ID:</strong> {request.trackingId}
                            </div>
                            <div className="mb-2">
                              <strong>Sender:</strong> {request.senderName}
                            </div>
                            <div className="mb-2">
                              <strong>Receiver:</strong> {request.receiverName}
                            </div>
                            <div className="mb-2">
                              <strong>Receiver Address:</strong> {request.receiverAddress}
                            </div>
                            <div className="mb-2">
                              <strong>Weight:</strong> {request.weight} kg
                            </div>
                            <div className="mb-2">
                              <strong>Price:</strong> ₹{request.price}
                            </div>
                          </div>
                          <div className="col-md-4 d-flex flex-column gap-2 justify-content-end">
                            <button
                              className="btn btn-success"
                              onClick={() => handleAccept(request)}
                              disabled={loading}
                            >
                              <i className="bi bi-check-lg me-2"></i>
                              {loading ? "Accepting..." : "Accept Order"}
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleDecline(request.orderId)}
                            >
                              <i className="bi bi-x-lg me-2"></i>
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Tasks Section */}
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">
                  <i className="bi bi-clipboard-check me-2"></i>
                  My Active Tasks (Staff ID: {staffId})
                </h4>

                {acceptedTasks.length === 0 ? (
                  <div className="alert alert-info">
                    <i className="bi bi-clipboard-check me-2"></i>
                    No active tasks. Tasks remain active until delivered to source warehouse or final delivery.
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-4">
                      <h6>Active Task List:</h6>
                      <div className="list-group">
                        {acceptedTasks.map((task) => (
                          <button
                            key={task.orderId}
                            type="button"
                            className={`list-group-item list-group-item-action ${
                              selectedTask?.orderId === task.orderId ? "active" : ""
                            }`}
                            onClick={() => setSelectedTask(task)}
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <h6 className="mb-1">Order #{task.orderId}</h6>
                              <small className={`badge ${getStatusBadgeClass(task.status)}`}>
                                {getStatusLabel(task.status)}
                              </small>
                            </div>
                            <p className="mb-1">{task.receiverName}</p>
                            <small>{task.trackingId}</small>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-8">
                      {selectedTask && (
                        <div className="card">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Task Details - Order #{selectedTask.orderId}</h6>
                            <span className={`badge ${getStatusBadgeClass(selectedTask.status)} fs-6`}>
                              {getStatusLabel(selectedTask.status)}
                            </span>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <strong>Tracking ID:</strong> {selectedTask.trackingId}
                                </div>
                                <div className="mb-3">
                                  <strong>Sender:</strong> {selectedTask.senderName}
                                </div>
                                <div className="mb-3">
                                  <strong>Receiver:</strong> {selectedTask.receiverName}
                                </div>
                                <div className="mb-3">
                                  <strong>Contact:</strong> {selectedTask.receiverContact}
                                </div>
                                <div className="mb-3">
                                  <strong>Weight:</strong> {selectedTask.weight} kg
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <strong>Receiver Address:</strong> {selectedTask.receiverAddress}
                                </div>
                                <div className="mb-3">
                                  <strong>Price:</strong> ₹{selectedTask.price}
                                </div>
                                <div className="mb-3">
                                  <strong>Source Warehouse:</strong> {selectedTask.sourceWarehouseId}
                                </div>
                                <div className="mb-3">
                                  <strong>Destination Warehouse:</strong> {selectedTask.destinationWarehouseId}
                                </div>
                                <div className="mb-3">
                                  <strong>Created:</strong>{" "}
                                  {selectedTask.createdAt
                                    ? new Date(selectedTask.createdAt).toLocaleDateString()
                                    : "N/A"}
                                </div>
                              </div>
                            </div>

                            {/* Next Action Hint */}
                            <div className="alert alert-light border-start border-primary border-4" role="alert">
                              <i className="bi bi-lightbulb me-2"></i>
                              <strong>Next Action:</strong> {getNextStatus(selectedTask.status)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex gap-3 flex-wrap justify-content-center">
              <button className="btn btn-success btn-lg" disabled={!selectedTask} onClick={handleUpdateStatus}>
                <i className="bi bi-arrow-up-circle me-2"></i>
                Update Status
              </button>
            </div>

            {selectedTask && (
              <div className="text-center mt-3">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Task will remain in your list until delivered to source warehouse or final delivery
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
