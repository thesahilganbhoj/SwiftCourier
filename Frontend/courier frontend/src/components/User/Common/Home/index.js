import React, { useRef, useState } from 'react';
import Home1 from './images/Picture1.png';


import './index.css'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../../../../services/auth'
import { publicAxios } from '../../../../services/helper';
import { toast } from 'react-toastify';
import video1 from "./images/express.mov" 
import video2 from "./images/expresstwo.mp4" 
function Home() {
  var [confirmedOrder, setConfirmedOrder] = useState(null);
  var [trackingNumber, setTrackingNumber] = useState('');
  const loggedIn = isLoggedIn();

  var handleTrackingNumber = (args) => {
    setTrackingNumber(args.target.value);
  }

  var trackOrder = (event) => {
    event.preventDefault();
    publicAxios.get(`/customer/order/${trackingNumber}`)
      .then(response => {
        setConfirmedOrder(response.data)
        openModal();
      })
      .catch(response => {
        toast.error("There was an error tracking your order. Please check your tracking number and try again.")
      });
  }

  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.classList.add('show');
    modalRef.current.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  const closeModal = () => {
    modalRef.current.classList.remove('show');
    modalRef.current.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  return (
    <div>
      <div className='container-fluid' style={{ backgroundImage: `url(${Home1})`, backgroundSize: 'cover', position: "relative" }}>
        <img src={Home1} alt='Home1' style={{ width: '100%', visibility: 'hidden' }} />
        <div className='container' style={{ position: 'absolute', left: '10%', top: '30%' }}>
          <h2><Link className='alink mx-4' to={'/'}>Track</Link><Link className='alink mx-4' to={'/quote'}>Quote</Link><Link className='alink mx-4' to={'/createashipment'}>Ship</Link></h2>
          <form className='row g-3 my-4 requires-validation'>
            <div className='col-sm-4'>
              <input type='text' value={trackingNumber} onChange={handleTrackingNumber} className='form-control form-control-lg' name='trackingNumber' placeholder='Tracking Number Here' required minLength={10} />
              <div className="invalid-feedback">
                Please enter a valid tracking number.
              </div>
            </div>
            <div className='col-auto'>
              <button type='submit' className='btn btn-warning btn-lg' onClick={trackOrder}>Track</button>
            </div>
          </form>
        </div>
      </div>

      <div className='container my-5'>
        <div className='my-5 py-5'>
          <div className='row'>
            <div className='col'>
              <h1 className='utext mb-5'>Let's Start Shipping</h1>
              <p className='lead'>You’ve got parcels. We’ll take care of them.</p>
              <Link className='btn btn-success' to={'/createashipment'}>Ship Now</Link>
            </div>
            <div className='col'>
              
              <video src={video2} autoPlay loop muted style={{maxWidth: "600px" }} />
            </div>
          </div>
        </div>
        

        <div className='my-5 py-5'>
          <div className='row'>
            <div className='col'>
              {/* <img src={Home3} alt='Home3' style={{ width: '600px' }} /> */}
              <video src={video1} autoPlay loop muted style={{maxWidth: "600px" }} />
            </div>
            <div className='col'>
              <h2 className='utext mb-5'>Total Visibility and Control.</h2>
              <p className='lead'>Track your parcels, view shipping history and much more.</p>
              {loggedIn ? (
                <Link className='btn btn-success' to={'/client/dashboard'}>Log In</Link>
              ) : (
                <Link className='btn btn-success' to={'/login'}>Log In</Link>
              )}
              {loggedIn ? (
                <Link className='btn btn-outline-success mx-3' to={'/client/dashboard'}>Sign Up</Link>
              ) : (
                <Link className='btn btn-outline-success mx-3' to={'/signup'}>Sign Up</Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef}>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>Your Order Details</h1>
            </div>
            <div className='modal-body'>
              {confirmedOrder !== null &&
                <div className='container'>
                  <div className='row g-3'>
                    <div className='col-6'>
                      <b>SENDER</b><br></br>
                      {confirmedOrder.senderId.firstName} {confirmedOrder.senderId.lastName}<br></br>
                      {confirmedOrder.senderId.addressId.address}<br></br>
                      {confirmedOrder.senderId.addressId.address2}<br></br>
                      {confirmedOrder.senderId.addressId.city}<br></br>
                      {confirmedOrder.senderId.addressId.state}<br></br>
                      {confirmedOrder.senderId.addressId.country}<br></br>
                      {confirmedOrder.senderId.addressId.postalCode}<br></br>
                      {confirmedOrder.senderId.phone}<br></br>
                      {confirmedOrder.senderId.email}
                    </div>
                    <div className='col-6'>
                      <b>RECEIVER</b><br></br>
                      {confirmedOrder.receiverId.firstName} {confirmedOrder.receiverId.lastName}<br></br>
                      {confirmedOrder.receiverId.addressId.address}<br></br>
                      {confirmedOrder.receiverId.addressId.address2}<br></br>
                      {confirmedOrder.receiverId.addressId.city}<br></br>
                      {confirmedOrder.receiverId.addressId.state}<br></br>
                      {confirmedOrder.receiverId.addressId.country}<br></br>
                      {confirmedOrder.receiverId.addressId.postalCode}<br></br>
                      {confirmedOrder.receiverId.phone}<br></br>
                      {confirmedOrder.receiverId.email}
                    </div>
                  </div><br></br>
                  <p>TrackingNumber : {confirmedOrder.trackingNumber}</p>
                  <p>Order Date : {confirmedOrder.orderDate}</p>
                  <p>Delivery Date : {confirmedOrder.deliveryDate}</p>
                  <p>Shipping Type : {confirmedOrder.serviceType}</p>
                  <p>Declared Value : {confirmedOrder.declaredValue}</p>
                  <p style={{ color: 'green' }}>Status : {confirmedOrder.status}</p><br></br><br></br>
                </div>
              }
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-info' onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Home