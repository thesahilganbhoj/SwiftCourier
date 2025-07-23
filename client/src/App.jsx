import {ToastContainer} from 'react-toastify'
import React, { useState,createContext } from 'react'
import {Route,Routes} from 'react-router-dom'


import AddCourier from './pages/AddCourier'
import ViewCouriers from './pages/ViewCouriers'
import TrackCourier from './pages/TrackCourier'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Login from './pages/Login'
import Register from './pages/Register'

export const AuthContext = createContext()

function App() {
  
  const [user,setUser] = useState(null)


  return (
    <div>
      
      <AuthContext.Provider value={{ user, setUser }}>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/add-courier' element={<AddCourier />} />
          <Route path='/view-couriers' element={<ViewCouriers />} />
          <Route path='/track-courier' element={<TrackCourier />} />
        </Routes>
        
      </AuthContext.Provider>
    <ToastContainer />
    </div>
   
  )
}

export default App
