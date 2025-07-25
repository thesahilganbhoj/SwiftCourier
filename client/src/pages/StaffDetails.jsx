"use client";

import Navbar from '../components/Navbar'
import { useState } from "react";

// Sample data for demonstration
const sampleRequests = [
    {
        id: 1,
        orderId: "ORD-2024-001",
        senderAddress: "1303,The Crown Greens, Hinjawadi,Pune,Maharashtra",
        receiverAddress: "601, Kumar Samruddhi, Yerwada, Pune, Maharashtra",
        weight: "2.5 kg",
        description: "Electronics package containing laptop accessories",
    },
    
]

const sampleTaskDetails = {
    trackingId: "TRK-2024-001-ABC",
    senderName: "Anirudha Adekar",
    receiverName: "Paras Garg",
    receiverContact: "+919874563218",
    orderId: "ORD-2024-001",
    senderAddress: "1303,The Crown Greens, Hinjawadi,Pune,Maharashtra",
    receiverAddress: "601, Kumar Samruddhi, Yerwada, Pune, Maharashtra",
    weight: "2.5 kg",
    description: "Electronics package containing laptop accessories",
    status: "In Transit",
}

export default function StaffDetails() {
  const [requests, setRequests] = useState(sampleRequests);
  const [acceptedTask, setAcceptedTask] = useState(null);

  const handleAccept = (request) => {
    setRequests(requests.filter((req) => req.id !== request.id));
    setAcceptedTask({
      ...sampleTaskDetails,
      orderId: request.orderId,
      senderAddress: request.senderAddress,
      receiverAddress: request.receiverAddress,
      weight: request.weight,
      description: request.description,
    });
  };

  const handleDecline = (requestId) => {
    setRequests(requests.filter((req) => req.id !== requestId));
  };

  return (
    <>
      
<Navbar />
      <div className="container-fluid py-3">
        {/* Top Right Navigation */}
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-end pe-5">
            <button className="btn btn-outline-primary">Availability</button>
          </div>
        </div>

        {/* Requests Section */}
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">Requests</h4>

                {requests.length === 0 ? (
                  <div className="alert alert-info">
                    No pending requests at the moment.
                  </div>
                ) : (
                  requests.map((request) => (
                    <div key={request.id} className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="mb-2">
                              <strong>Order ID:</strong> {request.orderId}
                            </div>
                            <div className="mb-2">
                              <strong>Sender's Address:</strong> {request.senderAddress}
                            </div>
                            <div className="mb-2">
                              <strong>Receiver's Address:</strong> {request.receiverAddress}
                            </div>
                            <div className="mb-2">
                              <strong>Weight of Package:</strong> {request.weight}
                            </div>
                            <div className="mb-3">
                              <strong>Description:</strong> {request.description}
                            </div>
                          </div>
                          <div className="col-md-4 d-flex flex-column gap-2 justify-content-end">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAccept(request)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleDecline(request.id)}
                            >
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

        {/* Task Details Section */}
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">Task Details:</h4>

                <div className="card p-4" style={{ minHeight: "300px" }}>
                  {acceptedTask ? (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Tracking ID:</strong> {acceptedTask.trackingId}
                        </div>
                        <div className="mb-3">
                          <strong>Order ID:</strong> {acceptedTask.orderId}
                        </div>
                        <div className="mb-3">
                          <strong>Sender's Name:</strong> {acceptedTask.senderName}
                        </div>
                        <div className="mb-3">
                          <strong>Receiver's Name:</strong> {acceptedTask.receiverName}
                        </div>
                        <div className="mb-3">
                          <strong>Receiver's Contact:</strong> {acceptedTask.receiverContact}
                        </div>
                        <div className="mb-3">
                          <strong>Status:</strong>
                          <span className="badge bg-info ms-2">
                            {acceptedTask.status}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Sender's Address:</strong> {acceptedTask.senderAddress}
                        </div>
                        <div className="mb-3">
                          <strong>Receiver's Address:</strong> {acceptedTask.receiverAddress}
                        </div>
                        <div className="mb-3">
                          <strong>Weight:</strong> {acceptedTask.weight}
                        </div>
                        <div className="mb-3">
                          <strong>Description:</strong> {acceptedTask.description}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 text-muted text-center">
                      <div>
                        <i className="bi bi-inbox" style={{ fontSize: "3rem" }}></i>
                        <p className="mt-3 mb-0">
                          No task details available. Accept a request to view task details here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-10">
            <div className="d-flex gap-3">
              <button className="btn btn-success btn-lg" disabled={!acceptedTask}>
                Update Status
              </button>
              <button className="btn btn-warning btn-lg" disabled={!acceptedTask}>
                Update Warehouse
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
