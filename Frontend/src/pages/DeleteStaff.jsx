"use client";
import Navbar from '../components/Navbar'
export default function StaffDetailsPage() {
  const handleDeleteStaff = () => {
    console.log("Delete staff clicked");
  };

  return (
      <>
      <Navbar />
    <div className="container py-5">
 
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {/* Page Header */}
          <h4 className="fw-bold border-bottom pb-3 mb-4 text-center">
            Staff Details
          </h4>

          {/* Staff Details Card */}
          <div className="card shadow-sm border rounded-3">
            <div className="card-body">
              <DetailRow label="ID:" />
              <DetailRow label="Name:" />
              <DetailRow label="Email:" />
              <DetailRow label="Contact:" />
              <DetailRow label="Address:" />
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

function DetailRow({ label }) {
  return (
    <div className="mb-3 d-flex">
      <strong className="me-2">{label}</strong>
      <span className="text-muted flex-grow-1">{/* dynamic content */}</span>
    </div>
  );
}
