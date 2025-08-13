import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { publicAxios } from '../../../../services/helper';

function Track() {
    var [confirmedOrder, setConfirmedOrder] = useState(null);
    var [trackingNumber, setTrackingNumber] = useState('');

    var handleTrackingNumber = (args) => {
        setTrackingNumber(args.target.value);
    }

    var trackOrder = (event) => {
        event.preventDefault();
        publicAxios.get(`customer/order/${trackingNumber}`)
            .then(response => {
                setConfirmedOrder(response.data)
                openModal();
            })
            .catch(response => {
                toast.error("There was an error tracking your order. Please check the tracking number and try again.")
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
        <>
            <div className='card container my-5'>
                <div className='card-body'>
                    <form className='row g-3'>
                        <h1 className='utext my-5'>Track Your Order</h1>
                        <div className='col-6'>
                            <label htmlFor='trackingNumber' className='form-label'>Tracking Number</label>
                            <input type='text' className='form-control' onChange={handleTrackingNumber} name='trackingNumber' placeholder='Tracking Number Here' required minLength={10} />
                        </div>
                        <div className='col-12'>
                            <button type='submit' className='btn btn-warning' onClick={trackOrder}>Track Your Order</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef}>
                <div className='modal-dialog modal-xl'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h2 className='modal-title fs-5' id='staticBackdropLabel'>Your Order Details</h2>
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
                            <button type='button' className='btn btn-warning' onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Track