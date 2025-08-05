"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { getStaffProfile } from "../services/staff"

function StaffProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [staffData, setStaffData] = useState(null)
  const [editData, setEditData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [staffId] = useState(1) // You should get this from authentication/context

  // Fetch staff profile from backend
  const fetchStaffProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const profile = await getStaffProfile(staffId)

      if (profile) {
        // Map backend response to frontend format
        const mappedData = {
          id: profile.staffId,
          name: profile.name,
          email: profile.email,
          address: profile.address,
          warehouseId: profile.warehouseId,
          warehouseName: profile.warehouseName,
        }

        setStaffData(mappedData)
        setEditData(mappedData)
      } else {
        setError("No staff profile found")
      }
    } catch (err) {
      setError("Failed to fetch staff profile from database")
      console.error("Error fetching staff profile:", err)
    } finally {
      setLoading(false)
    }
  }

  // Load profile on component mount
  useEffect(() => {
    fetchStaffProfile()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...staffData })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      // Note: You'll need to add an update profile endpoint to your backend
      // For now, we'll just update the local state
      setStaffData({ ...editData })
      setIsEditing(false)
      console.log("Updated staff data:", editData)
      alert("Profile updated successfully! (Note: Backend update endpoint needed)")
    } catch (err) {
      setError("Failed to update profile")
      console.error("Error updating profile:", err)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({ ...staffData })
  }

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Loading state
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
              <p className="text-muted">Loading staff profile...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container py-5">
          <div className="card shadow mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body text-center">
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
              <button className="btn btn-primary" onClick={fetchStaffProfile}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No data state
  if (!staffData) {
    return (
      <div>
        <Navbar />
        <div className="container py-5">
          <div className="card shadow mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body text-center">
              <div className="alert alert-warning" role="alert">
                <i className="bi bi-person-x-fill me-2"></i>
                No staff profile found in database
              </div>
              <button className="btn btn-primary" onClick={fetchStaffProfile}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main profile display
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="card shadow mx-auto" style={{ maxWidth: "700px" }}>
          <div className="card-body">
            <div className="text-center mb-4 border-bottom pb-3">
              <h2 className="card-title">Staff Profile</h2>
              <p className="text-muted">SwiftCourier Staff Member Details</p>
            </div>

            <form onSubmit={handleSave}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Staff ID</label>
                  <div className="form-control-plaintext bg-light rounded p-2">{staffData.id}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Warehouse ID</label>
                  <div className="form-control-plaintext bg-light rounded p-2">
                    {staffData.warehouseId || "Not Assigned"}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={editData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                ) : (
                  <div className="form-control-plaintext bg-light rounded p-2">{staffData.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={editData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                ) : (
                  <div className="form-control-plaintext bg-light rounded p-2">{staffData.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    id="address"
                    className="form-control"
                    rows="3"
                    value={editData.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                ) : (
                  <div className="form-control-plaintext bg-light rounded p-2">{staffData.address}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="warehouseName" className="form-label">
                  Warehouse Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="warehouseName"
                    className="form-control"
                    value={editData.warehouseName || ""}
                    onChange={(e) => handleInputChange("warehouseName", e.target.value)}
                    required
                  />
                ) : (
                  <div className="form-control-plaintext bg-light rounded p-2">
                    {staffData.warehouseName || "Not Assigned"}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center gap-3">
                {isEditing ? (
                  <>
                    <button type="submit" className="btn btn-success">
                      <i className="bi bi-check-lg me-2"></i>
                      Save Changes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                      <i className="bi bi-x-lg me-2"></i>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleEdit}>
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffProfile
