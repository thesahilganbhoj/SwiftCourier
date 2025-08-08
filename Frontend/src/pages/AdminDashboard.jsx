
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch Pending Orders from API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/admin/pending-orders");
//         if (response.status === 204) {
//           setOrders([]);
//         } else if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         } else {
//           const data = await response.json();
//           setOrders(data);
//         }
//       } catch (error) {
//         console.error(error);
//         alert("❌ Could not load pending orders");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // ✅ Handle Assign Button
//   const handleAssign = (orderId) => {
//     alert(`Assigning Order ${orderId}`);
//   };

//   // ✅ Handle Delete Order
//   const handleDelete = async (orderId) => {
//   console.log("Deleting Order ID:", orderId); // ✅ Debug log to verify

//   if (!orderId) {
//     alert("❌ Invalid Order ID");
//     return;
//   }

//   const confirmed = window.confirm(`Are you sure you want to delete order ${orderId}?`);
//   if (!confirmed) return;

//   try {
//     const response = await fetch(`http://localhost:8080/admin/pending-orders/${orderId}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       alert("✅ Order deleted successfully.");
//       setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
//     } else {
//       const errorText = await response.text();
//       console.error("Backend Error:", errorText); // ✅ Debug log
//       alert("❌ Failed: " + errorText);
//     }
//   } catch (error) {
//     console.error("Error deleting order:", error); // ✅ Debug log
//     alert("❌ Something went wrong while deleting the order.");
//   }
// };



//   if (loading) return <p className="text-center mt-5">Loading pending orders...</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="container py-5">
//         {/* Page Heading */}
//         <h1 className="fw-bold text-center mb-4">Pending Orders</h1>

//         {/* Card Container */}
//         <div className="card shadow-sm">
//           <div className="card-body">
//             {orders.length > 0 ? (
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle text-center">
//                   <thead className="table-dark">
//                     <tr>
//                       <th style={{ width: "10%" }}>Order ID</th>
//                       <th style={{ width: "10%" }}>Customer ID</th>
//                       <th style={{ width: "25%" }}>Sender Address</th>
//                       <th style={{ width: "25%" }}>Receiver Address</th>
//                       <th style={{ width: "15%" }}>City</th>
//                       <th style={{ width: "15%" }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order.orderId}>
//                         <td className="fw-semibold">{order.orderId}</td>
//                         <td>{order.customerId}</td>
//                         <td>{order.senderAddress}</td>
//                         <td>{order.receiverAddress}</td>
//                         <td>{order.city}</td>
//                         <td>
//                           <div className="d-flex justify-content-center gap-2">
//                             <button
//                               className="btn btn-outline-success btn-sm px-3"
//                               onClick={() => handleAssign(order.orderId)}
//                             >
//                               Assign
//                             </button>
//                             <button
//                               className="btn btn-outline-danger btn-sm px-3"
//                               onClick={() => handleDelete(order.orderId)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="text-center py-4">
//                 <p className="text-muted">No pending orders found.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableStaff, setAvailableStaff] = useState([]); // ✅ Store available staff
  const adminId = 1; // Replace with dynamic admin ID (e.g., from auth)

  // ✅ Fetch Pending Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/pending-orders");
        if (response.status === 204) {
          setOrders([]);
        } else if (!response.ok) {
          throw new Error("Failed to fetch orders");
        } else {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
        alert("❌ Could not load pending orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Fetch Available Staff
  useEffect(() => {
    const fetchAvailableStaff = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/staff/${adminId}/available`);
        if (response.ok) {
          const data = await response.json();
          setAvailableStaff(data);
        } else if (response.status === 204) {
          setAvailableStaff([]);
        } else {
          throw new Error("Failed to fetch available staff");
        }
      } catch (error) {
        console.error(error);
      //  alert("❌ Could not load available staff");
      }
    };
    fetchAvailableStaff();
  }, [adminId]);

  // ✅ Handle Assign Order to Staff
  // ✅ Handle Assign Order to Staff
const handleAssign = async (orderId, staffId) => {
  if (!staffId) {
    alert("❌ Please select a staff member.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/admin/assign-order/${orderId}/${staffId}`, {
      method: "PUT",
    });

    if (response.ok) {
      alert("✅ Order assigned successfully!");

      // ✅ Remove the assigned order from the table
      setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
    } else {
      const errorText = await response.text();
      alert("❌ Failed: " + errorText);
    }
  } catch (error) {
    console.error("Error assigning order:", error);
    alert("❌ Something went wrong while assigning the order.");
  }
};


  // ✅ Handle Delete Order
  const handleDelete = async (orderId) => {
    const confirmed = window.confirm(`Are you sure you want to delete order ${orderId}?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/admin/pending-orders/${orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("✅ Order deleted successfully.");
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      } else {
        const errorText = await response.text();
        alert("❌ Failed: " + errorText);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("❌ Something went wrong while deleting the order.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading pending orders...</p>;

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="fw-bold text-center mb-4">Pending Orders</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            {orders.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer ID</th>
                      <th>Sender Address</th>
                      <th>Receiver Address</th>
                      <th>City</th>
                      <th>Assign to Staff</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderId}>
                        <td className="fw-semibold">{order.orderId}</td>
                        <td>{order.customerId}</td>
                        <td>{order.senderAddress}</td>
                        <td>{order.receiverAddress}</td>
                        <td>{order.city}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            onChange={(e) => handleAssign(order.orderId, e.target.value)}
                            defaultValue=""
                          >
                            <option value="">Select Staff</option>
                            {availableStaff.map((staff) => (
                              <option key={staff.staffId} value={staff.staffId}>
                                {staff.staffName}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm px-3"
                            onClick={() => handleDelete(order.orderId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted">No pending orders found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
