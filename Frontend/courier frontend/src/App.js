import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Privacy from './components/User/Common/Privacy';
import Terms from './components/User/Common/Terms';
import Home from './components/User/Common/Home';
import CreateAShipment from './components/User/Common/CreateAShipment';
import Quote from './components/User/Common/Quote';
import { Route, Routes } from 'react-router-dom';
import Locations from './components/User/Common/Locations';
import HowToShip from './components/User/Common/HowToShip';
import Track from './components/User/Common/Track';
import ViewAllShipments from './components/User/Common/ViewAllShipments';
import Login from './components/User/Common/LogIn';
import SignUp from './components/User/Common/SignUp';
import ClientDashboard from './components/User/Client/ClientDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminRoute from './components/Admin/AdminRoute'
import EmployeeRoute from './components/Employee/EmployeeRoute'
import ClientRoute from './components/User/Client/ClientRoute'
import OpenRoute from './components/User/Common/OpenRoute'
import ContactUs from './components/User/Common/ContactUs';
import AboutUs from './components/User/Common/AboutUs';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<OpenRoute />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/privacypolicy' element={<Privacy />}></Route>
          <Route path='/createashipment' element={<CreateAShipment />}></Route>
          <Route path='/termsandconditions' element={<Terms />}></Route>
          <Route path='/quote' element={<Quote />}></Route>
          <Route path='/locations' element={<Locations />}></Route>
          <Route path='/howtoship' element={<HowToShip />}></Route>
          <Route path='/track' element={<Track />}></Route>
          <Route path='/viewallshipments' element={<ViewAllShipments />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/contactus' element={<ContactUs />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
        </Route>
        <Route path='/client' element={<ClientRoute />}>
          <Route path='dashboard' element={<ClientDashboard />}></Route>
        </Route>
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='dashboard' element={<AdminDashboard />}></Route>
        </Route>
        <Route path='/employee' element={<EmployeeRoute />}>
          <Route path='dashboard' element={<EmployeeDashboard />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
