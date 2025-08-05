"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { getOrderDetails, updateOrderStatus } from "../services/staff"

export default function UpdateOrderStatus() {
  const [orderData, setOrderData] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  const { staffId, orderId } = useParams()
  const navigate = useNavigate()

  const statusOptions = [
    {
      value: "PICKED_UP",
      label: "Picked Up",
      color: "bg-info",
      description: "Package has been picked up from sender",
      phase: "pickup",
    },
    {
      value: "AT_SOURCE_WAREHOUSE",
      label: "At Source City Warehouse",
      color: "bg-primary",
      description: "Package delivered to source warehouse (task will be transferred to admin)",
      phase: "warehouse",
      isTransfer: true,
    },
    {
      value: "IN_TRANSIT",
      label: "In Transit",
      color: "bg-warning",
      description: "Package is being transported between cities (Admin managed)",
      phase: "transit",
      adminOnly: true,
    },
    {
      value: "AT_DESTINATION_WAREHOUSE",
      label: "At Destination City Warehouse",
      color: "bg-secondary",
      description: "Package has reached destination warehouse (Admin managed)",
      phase: "warehouse",
      adminOnly: true,
    },
    {
      value: "OUT_FOR_DELIVERY",
      label: "Out for Delivery",
      color: "bg-info",
      description: "Package is out for final delivery to receiver",
      phase: "delivery",
    },
    {
      value: "DELIVERED",
      label: "Delivered",
      color: "bg-success",
      description: "Package has been delivered to receiver (task completed)",
      phase: "delivery",
      isCompletion: true,
    },
    {
      value: "CANCELLED",
      label: "Cancelled",
      color: "bg-danger",
      description: "Order has been cancelled",
      phase: "cancelled",
      isCompletion: true,
    },
  ]

  useEffect(() => {
    fetchOrderDetails()
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const order = await getOrderDetails(orderId)
      setOrderData(order)
      setSelectedStatus(order.status || "")
    } catch (err) {
      setError("Failed to fetch order details")
      console.error("Error fetching order details:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (e) => {
    e.preventDefault()
    if (!selectedStatus) {
      alert("Please select a status")
      return
    }

    const selectedOption = statusOptions.find((opt) => opt.value === selectedStatus)

    // Show confirmation for transfer/completion statuses
    if (selectedOption?.isTransfer || selectedOption?.isCompletion) {
      const actionType = selectedOption.isTransfer ? "transferred to admin" : "completed"
      const confirmMessage = `Are you sure you want to update the status to "${selectedOption.label}"?\n\nThis will ${actionType === "transferred to admin" ? "transfer the task to admin for further processing" : "mark the task as completed"} and remove it from your active task list.`

      if (!window.confirm(confirmMessage)) {
        return
      }
    }

    try {
      setUpdating(true)
      const statusData = {
        trackingId: orderData.trackingId,
        orderId: orderData.orderId,
        senderName: orderData.senderName,
        receiverName: orderData.receiverName,
        receiverContact: orderData.receiverContact,
        senderAddress: orderData.senderAddress || "",
        receiverAddress: orderData.receiverAddress,
        weight: orderData.weight,
        description: orderData.description || "",
        status: selectedStatus,
      }

      await updateOrderStatus(statusData)

      const statusLabel = selectedOption?.label
      alert(`Status updated to "${statusLabel}" successfully!`)

      navigate(`/staff/staff-details/${staffId}`)
    } catch (err) {
      setError("Failed to update status")
      console.error("Error updating status:", err)
      alert("Failed to update status. Please try again.")
    } finally {
      setUpdating(false)
    }
  }

  const handleCancel = () => {
    navigate(`/staff/staff-details/${staffId}`)
  }

  const getStatusBadgeClass = (status) => {
    const statusOption = statusOptions.find((option) => option.value === status)
    return statusOption ? statusOption.color : "bg-secondary"
  }

  const getStatusLabel = (status) => {
    const statusOption = statusOptions.find((option) => option.value === status)
    return statusOption ? statusOption.label : status
  }

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "pickup":
        return "text-primary"
      case "warehouse":
        return "text-info"
      case "transit":
        return "text-warning"
      case "delivery":
        return "text-success"
      case "cancelled":
        return "text-danger"
      default:
        return "text-secondary"
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container py-5">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !orderData) {
    return (
      <div>
        <Navbar />
        <div className="container py-5">
          <div className="card shadow mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body text-center">
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error || "Order not found"}
              </div>
              <button className="btn btn-primary" onClick={handleCancel}>
                <i className="bi bi-arrow-left me-2"></i>
                Back to Staff Details
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="card shadow mx-auto" style={{ maxWidth: "900px" }}>
          <div className="card-body">
            <div className="text-center mb-4 border-bottom pb-3">
              <h2 className="card-title">Update Order Status</h2>
              <p className="text-muted">
                Staff ID: {staffId} | Order ID: {orderId}
              </p>
            </div>

            {/* Delivery Flow Information */}
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle-fill me-2"></i>
              <strong>Delivery Flow:</strong> Pickup → Source Warehouse → In Transit (Admin) → Destination Warehouse
              (Admin) → Out for Delivery → Delivered
            </div>

            {/* Order Details */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card bg-light">
                  <div className="card-header">
                    <h6 className="mb-0">Order Information</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <strong>Tracking ID:</strong> {orderData.trackingId}
                    </div>
                    <div className="mb-2">
                      <strong>Current Status:</strong>
                      <span className={`badge ms-2 ${getStatusBadgeClass(orderData.status)}`}>
                        {getStatusLabel(orderData.status)}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong>Weight:</strong> {orderData.weight} kg
                    </div>
                    <div className="mb-2">
                      <strong>Price:</strong> ₹{orderData.price}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light">
                  <div className="card-header">
                    <h6 className="mb-0">Delivery Information</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <strong>Sender:</strong> {orderData.senderName}
                    </div>
                    <div className="mb-2">
                      <strong>Receiver:</strong> {orderData.receiverName}
                    </div>
                    <div className="mb-2">
                      <strong>Contact:</strong> {orderData.receiverContact}
                    </div>
                    <div className="mb-2">
                      <strong>Address:</strong> {orderData.receiverAddress}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleStatusUpdate}>
              <div className="mb-4">
                <label className="form-label">
                  <h5>Select New Status</h5>
                </label>
                <div className="row">
                  {statusOptions.map((option) => (
                    <div key={option.value} className="col-md-6 mb-3">
                      <div
                        className={`card h-100 ${option.adminOnly ? "border-warning" : ""}`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="status"
                              id={option.value}
                              value={option.value}
                              checked={selectedStatus === option.value}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                              disabled={option.adminOnly}
                            />
                            <label className="form-check-label w-100" htmlFor={option.value}>
                              <div className="d-flex align-items-center mb-2">
                                <span className={`badge ${option.color} me-2`}>{option.label}</span>
                                {option.adminOnly && (
                                  <span className="badge bg-warning text-dark me-2">Admin Only</span>
                                )}
                                {option.isTransfer && (
                                  <i
                                    className="bi bi-arrow-right-circle text-info"
                                    title="This will transfer the task"
                                  ></i>
                                )}
                                {option.isCompletion && (
                                  <i
                                    className="bi bi-check-circle text-success"
                                    title="This will complete the task"
                                  ></i>
                                )}
                              </div>
                              <small className={`${getPhaseColor(option.phase)}`}>{option.description}</small>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transfer/Completion Status Warning */}
              {selectedStatus && statusOptions.find((opt) => opt.value === selectedStatus)?.isTransfer && (
                <div className="alert alert-warning" role="alert">
                  <i className="bi bi-arrow-right-circle-fill me-2"></i>
                  <strong>Transfer Notice:</strong> This status will transfer the task to admin for inter-city transport
                  management.
                </div>
              )}

              {selectedStatus && statusOptions.find((opt) => opt.value === selectedStatus)?.isCompletion && (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>Completion Notice:</strong> This status will mark the task as completed and remove it from
                  your active tasks.
                </div>
              )}

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-success btn-lg" disabled={updating || !selectedStatus}>
                  <i className="bi bi-check-lg me-2"></i>
                  {updating ? "Updating..." : "Update Status"}
                </button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={handleCancel} disabled={updating}>
                  <i className="bi bi-x-lg me-2"></i>
                  Cancel
                </button>
              </div>
            </form>

            {/* Status Flow Guide */}
            <div className="mt-5">
              <h6 className="text-muted">Complete Delivery Flow:</h6>
              <div className="row mt-3">
                <div className="col-md-6">
                  <h6 className="text-primary">Staff Responsibilities:</h6>
                  <ul className="list-unstyled">
                    <li>
                      <span className="badge bg-info me-2">Picked Up</span> - Collect from sender
                    </li>
                    <li>
                      <span className="badge bg-primary me-2">At Source Warehouse</span> - Deliver to warehouse
                    </li>
                    <li>
                      <span className="badge bg-info me-2">Out for Delivery</span> - Final delivery
                    </li>
                    <li>
                      <span className="badge bg-success me-2">Delivered</span> - Complete delivery
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="text-warning">Admin Responsibilities:</h6>
                  <ul className="list-unstyled">
                    <li>
                      <span className="badge bg-warning me-2">In Transit</span> - Inter-city transport
                    </li>
                    <li>
                      <span className="badge bg-secondary me-2">At Destination Warehouse</span> - Warehouse management
                    </li>
                    <li>
                      <span className="text-muted">• Assign to destination city staff</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
