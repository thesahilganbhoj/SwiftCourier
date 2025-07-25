import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function ManageStaff() {
  const navigate = useNavigate()
  
  const [staff] = useState([
    {
      staffId: "STF001",
      staffName: "Rajesh Kumar",
      status: "Available",
      city: "Mumbai",
    },
    {
      staffId: "STF002",
      staffName: "Priya Sharma",
      status: "Not Available",
      city: "Delhi",
    },
    {
      staffId: "STF003",
      staffName: "Amit Patel",
      status: "Available",
      city: "Bangalore",
    },
    {
      staffId: "STF004",
      staffName: "Sneha Reddy",
      status: "Available",
      city: "Chennai",
    },
    {
      staffId: "STF005",
      staffName: "Vikram Singh",
      status: "Not Available",
      city: "Pune",
    },
    {
      staffId: "STF006",
      staffName: "Kavya Nair",
      status: "Available",
      city: "Mumbai",
    },
    {
      staffId: "STF007",
      staffName: "Rohit Gupta",
      status: "Available",
      city: "Delhi",
    },
    {
      staffId: "STF008",
      staffName: "Anita Joshi",
      status: "Not Available",
      city: "Bangalore",
    },
  ])

  const handleEditStaff = (staffId) => {
    alert(`Edit functionality for ${staffId} - Coming Soon!`)
  }

  const handleDeleteStaff = (staffId) => {
    // Navigate to delete staff page with staff ID
    navigate(`/admin/delete-staff?staffId=${staffId}`)
  }

  const handleAddStaff = () => {
    // Navigate to add staff page
    navigate('/admin/add-staff')
  }

  const getStatusBadge = (status) => {
    return status === "Available" 
      ? "badge bg-success" 
      : "badge bg-danger"
  }

  return (
    <>
      <Navbar />
      <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h4 className="mb-0 text-dark fw-bold text-center">Manage Staff</h4>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Staff ID</th>
                          <th scope="col">Staff Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">City</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staff.map((member, index) => (
                          <tr key={index}>
                            <td className="fw-bold text-dark">{member.staffId}</td>
                            <td>{member.staffName}</td>
                            <td>
                              <span className={getStatusBadge(member.status)}>
                                {member.status}
                              </span>
                            </td>
                            <td>{member.city}</td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm me-2"
                                  onClick={() => handleEditStaff(member.staffId)}
                                >
                                  Edit Staff
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDeleteStaff(member.staffId)}
                                >
                                  Delete Staff
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Add Staff Button */}
              <div className="d-flex justify-content-center mt-4">
                <button 
                  type="button" 
                  className="btn btn-success btn-lg" 
                  onClick={handleAddStaff}
                >
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}