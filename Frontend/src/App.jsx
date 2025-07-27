import { ToastContainer } from 'react-toastify'
import React, { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'


import AddCourier from './pages/AddCourier'
import HomePage from './pages/HomePage'
import OrderHistoryAdmin from './pages/OrderHistoryAdmin'
import ViewCouriers from './pages/ViewCouriers'
import TrackCourier from './pages/TrackCourier'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import StaffProfile from './pages/StaffProfile'
import CustomerProfile from './pages/CustomerProfile'
import OrderDetails from './pages/OrderDetails'
import OrderHistory from './pages/OrderHistory'
import ManageHub from './pages/ManageHub'
import StaffDetails from './pages/StaffDetails'
import AddStaff from './pages/AddStaff'
import DeleteStaff from './pages/DeleteStaff'
import FeedbackForm from './pages/Feedback'
import ManageStaff from './pages/ManageStaff'

export const AuthContext = createContext()

function App() {

  const [user, setUser] = useState(null)


  return (
    <div>

      <AuthContext.Provider value={{ user, setUser }}>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/order-history' element={<OrderHistoryAdmin />} />
          <Route path='/admin/manage-hub' element={<ManageHub />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/customer/add-courier' element={<AddCourier />} />
          {/* <Route path='/view-couriers' element={<ViewCouriers />} /> */}
          <Route path='/customer/homepage' element={<HomePage />} />
          <Route path='/customer/track-courier' element={<TrackCourier />} />
          <Route path='/customer/order-details' element={<OrderDetails />} />
          <Route path='/customer/order-history' element={<OrderHistory />} />
          <Route path='/staff/profile' element={<StaffProfile />} />
          <Route path='/customer/profile' element={<CustomerProfile />} />
          <Route path='/staff/staff-details' element={<StaffDetails />} />
          <Route path='/admin/add-staff' element={<AddStaff />} />
          <Route path='/admin/delete-staff' element={<DeleteStaff />} />
          <Route path='/customer/feedback' element={<FeedbackForm />} />
          <Route path='/admin/manage-staff' element={<ManageStaff />} />

          <Route path='/' element={<HomePage />} />
        </Routes>

      </AuthContext.Provider>
      <ToastContainer />
    </div>

  )
}

export default App
