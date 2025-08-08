// "use client";
// import Navbar from '../components/Navbar'
// export default function StaffDetailsPage() {
//   const handleDeleteStaff = () => {
//     console.log("Delete staff clicked");
//   };

//   return (
//       <>
//       <Navbar />
//     <div className="container py-5">
 
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-8 col-lg-6">
//           {/* Page Header */}
//           <h4 className="fw-bold border-bottom pb-3 mb-4 text-center">
//             Staff Details
//           </h4>

//           {/* Staff Details Card */}
//           <div className="card shadow-sm border rounded-3">
//             <div className="card-body">
//               <DetailRow label="ID:" />
//               <DetailRow label="Name:" />
//               <DetailRow label="Email:" />
//               <DetailRow label="Contact:" />
//               <DetailRow label="Address:" />
//             </div>
//           </div>

//           {/* Delete Button */}
//           <div className="text-center mt-4">
//             <button className="btn btn-outline-danger px-4 py-2" onClick={handleDeleteStaff}>
//               Delete Staff
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// function DetailRow({ label }) {
//   return (
//     <div className="mb-3 d-flex">
//       <strong className="me-2">{label}</strong>
//       <span className="text-muted flex-grow-1">{/* dynamic content */}</span>
//     </div>
//   );
// }

"use client";
import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function StaffDetailsPage() {
  const { staffId } = useParams(); // ✅ Staff ID from URL (e.g., /staff/5)
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch staff details on page load
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/staff/profile/${staffId}`);
        if (!response.ok) throw new Error("Failed to fetch staff details");
        const data = await response.json();
        setStaff(data);
      } catch (error) {
        console.error(error);
        alert("❌ Could not load staff details");
      } finally {
        setLoading(false);
      }
    };
    fetchStaffDetails();
  }, [staffId]);

  // ✅ Handle delete staff
  const handleDeleteStaff = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete staff ID ${staffId}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/staff/${staffId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.text();
        alert(result); // ✅ Show backend message
        navigate("/staff-list"); // ✅ Redirect to staff listing page
      } else {
        const errorText = await response.text();
        alert("❌ Failed: " + errorText);
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("❌ Something went wrong while deleting staff!");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading staff details...</p>;

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h4 className="fw-bold border-bottom pb-3 mb-4 text-center">
              Staff Details
            </h4>

            {/* Staff Details Card */}
            <div className="card shadow-sm border rounded-3">
              <div className="card-body">
                <DetailRow label="Staff ID:" value={staff?.staffId} />
                <DetailRow label="Warehouse ID:" value={staff?.warehouseId} />
                <DetailRow label="Name:" value={staff?.name} />
                <DetailRow label="Email:" value={staff?.email} />
                <DetailRow label="Contact Number:" value={staff?.contactNumber} />
                <DetailRow label="Address:" value={staff?.address} />
                <DetailRow label="Warehouse Name:" value={staff?.warehouseName} />
              </div>
            </div>

            {/* Delete Button */}
            <div className="text-center mt-4">
              <button className="btn btn-outline-danger px-4 py-2" onClick={handleDeleteStaff}>
                Delete Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="mb-3 d-flex">
      <strong className="me-2">{label}</strong>
      <span className="text-muted flex-grow-1">{value || "N/A"}</span>
    </div>
  );
}
