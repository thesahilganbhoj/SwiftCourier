import { useState } from "react"
import Navbar from "../components/Navbar"

export default function ManageHub() {
  const [warehouses] = useState([
    {
      warehouseId: "WH001",
      city: "Mumbai",
      address: "123 Industrial Area, Andheri East, Mumbai - 400069",
      contactNumber: "+91 98765 43210",
    },
    {
      warehouseId: "WH002",
      city: "Delhi",
      address: "456 Logistics Park, Gurgaon, Delhi NCR - 122001",
      contactNumber: "+91 87654 32109",
    },
    {
      warehouseId: "WH003",
      city: "Bangalore",
      address: "789 Tech Hub, Electronic City, Bangalore - 560100",
      contactNumber: "+91 76543 21098",
    },
    {
      warehouseId: "WH004",
      city: "Chennai",
      address: "321 Port Road, Ambattur, Chennai - 600058",
      contactNumber: "+91 65432 10987",
    },
    {
      warehouseId: "WH005",
      city: "Pune",
      address: "654 Manufacturing Zone, Hinjewadi, Pune - 411057",
      contactNumber: "+91 54321 09876",
    },
  ])

  const handleEditHub = (warehouseId) => {
    alert(`Edit functionality for ${warehouseId} - Coming Soon!`)
  }

  const handleDeleteHub = (warehouseId) => {
    if (window.confirm(`Are you sure you want to delete ${warehouseId}?`)) {
      alert(`${warehouseId} deleted successfully!`)
    }
  }

  const handleAddHub = () => {
    alert("Add Hub functionality - Coming Soon!")
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
                  {/* ✅ Explicit black color */}
                  <h4 className="mb-0 text-dark fw-bold text-center">Manage Hub</h4>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Warehouse ID</th>
                          <th scope="col">City</th>
                          <th scope="col">Address</th>
                          <th scope="col">Contact Number</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {warehouses.map((warehouse, index) => (
                          <tr key={index}>
                            {/* ✅ Warehouse IDs explicitly styled as black */}
                            <td className="fw-bold text-dark">{warehouse.warehouseId}</td>
                            <td>{warehouse.city}</td>
                            <td>
                              <div className="text-truncate" style={{ maxWidth: "300px" }}>
                                {warehouse.address}
                              </div>
                            </td>
                            <td>{warehouse.contactNumber}</td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm me-2"
                                  onClick={() => handleEditHub(warehouse.warehouseId)}
                                >
                                  Edit Hub
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDeleteHub(warehouse.warehouseId)}
                                >
                                  Delete Hub
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

              {/* ✅ Add Hub Button CENTERED */}
              <div className="d-flex justify-content-center mt-4">
                <button type="button" className="btn btn-success btn-lg" onClick={handleAddHub}>
                  Add Hub
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
