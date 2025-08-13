import React, { useRef, useState } from 'react';
import { publicAxios } from '../../../../services/helper';
import { toast } from 'react-toastify';

function Shipment(props) {
    var [order, setOrder] = useState({
        senderId: { firstName: '', lastName: '', phone: '', email: '', addressId: { address: '', address2: '', postalCode: '', city: '', state: '', country: '' } },
        receiverId: { firstName: '', lastName: '', phone: '', email: '', addressId: { address: '', address2: '', postalCode: '', city: '', state: '', country: '' } },
        parcelId: { weight: '', length: '', width: '', height: '' }, declaredValue: '',
        serviceType: '', paymentId: { amount: '', paymentMethod: '', paymentDate: '' }, orderDate: ''
    })

    var [confirmedOrder, setConfirmedOrder] = useState(null);

    const modalRef1 = useRef(null);

    const openModal1 = () => {
        modalRef1.current.classList.add('show');
        modalRef1.current.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    const closeModal1 = () => {
        modalRef1.current.classList.remove('show');
        modalRef1.current.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    const modalRef2 = useRef(null);

    const openModal2 = () => {
        modalRef2.current.classList.add('show');
        modalRef2.current.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    const navigateToNextPage = () => {
        props.setCurrentComponent('Profile');
    }

    const handleOrder = (event) => {
        const { name, value } = event.target;
        const updatedOrder = { ...order };
        const [parentName, childName, grandchildName] = name.split('.');
        if (grandchildName) {
            // update a double nested property
            updatedOrder[parentName][childName][grandchildName] = value;
        } else if (childName) {
            // update a single nested property
            updatedOrder[parentName][childName] = value;
        } else {
            updatedOrder[parentName] = value;
        }
        setOrder(updatedOrder);
    };

    var checkout = (event) => {
        event.preventDefault();
        publicAxios.get(`/customer/calculateamount/${order.parcelId.weight}/${order.parcelId.length}/${order.parcelId.width}/${order.parcelId.height}`)
            .then((response) => {
                setOrder(prevState => ({
                    ...prevState,
                    paymentId: {
                        ...prevState.paymentId,
                        amount: response.data
                    }
                }));
                openModal1();
            })
            .catch((response) => {
                toast.error('There was an error checking out. Please try again.')
            });
    }

    const placeOrder = (event) => {
        event.preventDefault();
        order.orderDate = new Date().toISOString().slice(0, 10);
        order.paymentId.paymentDate = new Date().toISOString().slice(0, 10);
        publicAxios.post('/customer/order', order)
            .then(response => {
                setConfirmedOrder(response.data)
                closeModal1();
                openModal2();
            })
            .catch(response => { toast.error('There was an error placing your order. Please try again.') })
    }

    return (
        <>
            <div className='container my-5' >
                <h1 className='utext my-5'>Create a Shipment</h1>
                <form className='row g-3'>
                    <h2 className='utext my-5'>Hello, Where are you shipping from?</h2>
                    <div className='col-md-6'>
                        <label htmlFor='firstName' className='form-label'>First Name</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='senderId.firstName' placeholder='First Name Here' value={order.senderId.firstName} required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='lastName' className='form-label'>Last Name</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='senderId.lastName' placeholder='Last Name Here' value={order.senderId.lastName} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>Address Line 1</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='senderId.addressId.address' placeholder='Address Here' value={order.senderId.addressId.address} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address2' className='form-label'>Address Line 2</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='senderId.addressId.address2' placeholder='Address Here' value={order.senderId.addressId.address2} required />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='postalCode' className='form-label'>Postal Code</label>
                        <input type={'number'} onChange={handleOrder} className='form-control' name='senderId.addressId.postalCode' placeholder='Postal Code Here' value={order.senderId.addressId.postalCode} required minLength={6} maxLength={6} />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='city' className='form-label'>City</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='senderId.addressId.city' placeholder='City Here' value={order.senderId.addressId.city} required />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='state' className='form-label'>State</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='senderId.addressId.state' placeholder='State Here' value={order.senderId.addressId.state} required />
                    </div>
                    <div className='col-md-12'>
                        <label htmlFor='country' className='form-label'>Country</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='senderId.addressId.country' placeholder='Country Here' value={order.senderId.addressId.country} required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='phone' className='form-label'>Phone</label>
                        <input type='tel' onChange={handleOrder} className='form-control' name='senderId.phone' placeholder='Phone here' pattern='[0-9]{10}' value={order.senderId.phone} required minLength={10} />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' onChange={handleOrder} className='form-control' name='senderId.email' placeholder='Email here' value={order.senderId.email} required minLength={5} />
                    </div>

                    <h2 className='utext my-5'>Where is your shipment going?</h2>
                    <div className='col-md-6'>
                        <label htmlFor='firstName' className='form-label'>First Name</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiverId.firstName' placeholder='First Name Here' value={order.receiverId.firstName} required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='lastName' className='form-label'>Last Name</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiverId.lastName' placeholder='Last Name Here' value={order.receiverId.lastName} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>Address Line 1</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiverId.addressId.address' placeholder='Address Here' value={order.receiverId.addressId.address} required />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address2' className='form-label'>Address Line 2</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiverId.addressId.address2' placeholder='Address Here' value={order.receiverId.addressId.address2} required />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='postalCode' className='form-label'>Postal Code</label>
                        <input type={'number'} onChange={handleOrder} className='form-control' name='receiverId.addressId.postalCode' placeholder='Postal Code Here' value={order.receiverId.addressId.postalCode} required minLength={6} maxLength={6} />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='city' className='form-label'>City</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiverId.addressId.city' placeholder='City Here' value={order.receiverId.addressId.city} required />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='state' className='form-label'>State</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiverId.addressId.state' placeholder='State Here' value={order.receiverId.addressId.state} required />
                    </div>
                    <div className='col-md-12'>
                        <label htmlFor='country' className='form-label'>Country</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiverId.addressId.country' placeholder='Country Here' value={order.receiverId.addressId.country} required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='phone' className='form-label'>Phone</label>
                        <input type='tel' onChange={handleOrder} className='form-control' name='receiverId.phone' placeholder='Phone Here' pattern='[0-9]{10}' value={order.receiverId.phone} required minLength={10} />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' onChange={handleOrder} className='form-control' name='receiverId.email' placeholder='Email here' value={order.receiverId.email} required minLength={5} />
                    </div>

                    <h2 className='utext my-5'>Some details about your package</h2>
                    <div className='col-md-3'>
                        <label htmlFor='weight' className='form-label'>Weight in Kgs</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcelId.weight' placeholder='Weight in Kgs' value={order.parcelId.weight} required />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='length' className='form-label'>Length in cm</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcelId.length' placeholder='Length Here' value={order.parcelId.length} required />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='width' className='form-label'>Width in cm</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcelId.width' placeholder='Width Here' value={order.parcelId.width} required />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='height' className='form-label'>Height in cm</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcelId.height' placeholder='Height Here' value={order.parcelId.height} required />
                    </div>
                    <b>Loss and Damage Protection (Declared Value)</b>
                    <p>We've got you covered up to Rs.1000 at no charge. Is this parcel worth more than Rs.1000? Purchase additional protection against loss or damage by entering the total amount of protection desired.</p>
                    <div className='col-6'>
                        <label htmlFor='declaredValue' className='form-label'>Declared Value</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='declaredValue' placeholder='Declared Value Here' value={order.declaredValue} required />
                    </div>

                    <h2 className='utext my-5'>How would you like to ship?</h2>
                    <div className='col-md-6'>
                        <label htmlFor='serviceType' className='form-label'>Shipping Type</label>
                        <select onChange={handleOrder} name='serviceType' className='form-select' value={order.serviceType} required>
                            <option>...</option>
                            <option>STANDARD</option>
                            <option>EXPRESS</option>
                        </select>
                    </div>
                    <div className='col-12'>
                        <button type='submit' className='btn btn-warning my-3' onClick={checkout}>Checkout</button>
                    </div>
                </form>
            </div>

            <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef1}>
                <div className='modal-dialog modal-xl'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='staticBackdropLabel'>How would you like to pay?</h1>
                        </div>
                        <form>
                            <div className='modal-body'>
                                <div className='form-check'>
                                    <input onChange={handleOrder} name='paymentId.paymentMethod' type='radio' className='form-check-input' required value={'CREDIT'} />
                                    <label className='form-check-label' htmlFor='credit'>Credit Card</label>
                                </div>
                                <div className='form-check'>
                                    <input onChange={handleOrder} name='paymentId.paymentMethod' type='radio' className='form-check-input' required value={'DEBIT'} />
                                    <label className='form-check-label' htmlFor='debit'>Debit Card</label>
                                </div>
                                <div className='form-check'>
                                    <input onChange={handleOrder} name='paymentId.paymentMethod' type='radio' className='form-check-input' required value={'UPI'} />
                                    <label className='form-check-label' htmlFor='upi'>UPI</label>
                                </div>
                                <div>
                                    Total Amount : <input type={'number'} disabled readOnly style={{ color: 'green' }} value={order.paymentId.amount} required />
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='submit' className='btn btn-secondary' onClick={placeOrder}>Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

            <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef2}>
                <div className='modal-dialog modal-xl'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='staticBackdropLabel'>Your Order Was Placed Successfully</h1>
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
                                    <b>Please note down the tracking number. You can use it to track your order and check its status.</b>
                                </div>
                            }
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-warning' onClick={navigateToNextPage}>Close</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Shipment;
