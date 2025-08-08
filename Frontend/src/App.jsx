"use client"

import { ToastContainer } from "react-toastify"
import { useState, createContext } from "react"
import { Route, Routes } from "react-router-dom"

import AddCourier from "./pages/AddCourier"
import HomePage from "./pages/HomePage"
import OrderHistoryAdmin from "./pages/OrderHistoryAdmin"
import TrackCourier from "./pages/TrackCourier"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import StaffProfile from "./pages/StaffProfile"
import CustomerProfile from "./pages/CustomerProfile"
import OrderDetails from "./pages/OrderDetails"
import OrderHistory from "./pages/OrderHistory"
import ManageHub from "./pages/ManageHub"
import StaffDetails from "./pages/StaffDetails"
import AddStaff from "./pages/AddStaff"
import DeleteStaff from "./pages/DeleteStaff"
import FeedbackForm from "./pages/Feedback"
import ManageStaff from "./pages/ManageStaff"
import UpdateOrderStatus from "./pages/UpdateOrderStatus"
import ProtectedRoute from "./components/ProtectedRoute" // Import the new component

export const AuthContext = createContext()

function App() {
  // Initialize user from localStorage on app load
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          {/* Public Routes - Accessible to everyone */}
          <Route path="/" element={<HomePage />} /> {/* Main landing/home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* If /customer/homepage is the same as /, make it public too */}
          <Route path="/customer/homepage" element={<HomePage />} />


          {/* Admin Routes - Protected */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/order-history" element={<ProtectedRoute allowedRoles={['ADMIN']}><OrderHistoryAdmin /></ProtectedRoute>} />
          <Route path="/admin/manage-hub" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageHub /></ProtectedRoute>} />
          <Route path="/admin/add-staff" element={<ProtectedRoute allowedRoles={['ADMIN']}><AddStaff /></ProtectedRoute>} />
          <Route path="/admin/manage-staff" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageStaff /></ProtectedRoute>} />
          <Route path="/admin/delete-staff/:staffId" element={<ProtectedRoute allowedRoles={['ADMIN']}><DeleteStaff /></ProtectedRoute>} />

          {/* Customer Routes - Protected (except homepage) */}
          <Route path="/customer/add-courier" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><AddCourier /></ProtectedRoute>} />
          <Route path="/customer/track-courier" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><TrackCourier /></ProtectedRoute>} />
          <Route path="/customer/order-details" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><OrderDetails /></ProtectedRoute>} />
          <Route path="/customer/order-history" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><OrderHistory /></ProtectedRoute>} />
          <Route path="/customer/profile" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerProfile /></ProtectedRoute>} />
          <Route path="/customer/feedback" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><FeedbackForm /></ProtectedRoute>} />

          {/* Staff Routes - Protected */}
          <Route path="/staff/profile" element={<ProtectedRoute allowedRoles={['STAFF']}><StaffProfile /></ProtectedRoute>} />
          <Route path="/staff/profile/:staffId" element={<ProtectedRoute allowedRoles={['STAFF']}><StaffProfile /></ProtectedRoute>} />
          <Route path="/staff/staff-details" element={<ProtectedRoute allowedRoles={['STAFF']}><StaffDetails /></ProtectedRoute>} />
          <Route path="/staff/staff-details/:staffId" element={<ProtectedRoute allowedRoles={['STAFF']}><StaffDetails /></ProtectedRoute>} />
          <Route path="/staff/update-status/:staffId/:orderId" element={<ProtectedRoute allowedRoles={['STAFF']}><UpdateOrderStatus /></ProtectedRoute>} />
        </Routes>
      </AuthContext.Provider>
      <ToastContainer />
    </div>
  )
}

export default App
