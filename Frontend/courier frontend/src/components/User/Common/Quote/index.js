import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicAxios } from '../../../../services/helper';

function Quote() {
    const [order, setOrder] = useState({ sender: { postalCode: '', country: '' }, receiver: { postalCode: '', country: '' }, parcel: { weight: '', length: '', width: '', height: '' } })
    var [amount] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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

    const getAQuote = (event) => {
        event.preventDefault();
        publicAxios.get(`/customer/calculateamount/${order.parcel.weight}/${order.parcel.length}/${order.parcel.width}/${order.parcel.height}`)
            .then((response) => {
                amount = response.data;
                setMessage(`Hey! we will ship your parcel for Rs.${amount}. Remember this is an estimated quote and it may vary according to the precise addresses of the sender and the recepient`)
                openModal();
            })
            .catch((error) => {
                toast.error('Hey! there was an error getting you a quote. Please try again...')
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

    const navigateToHomePage = () => {
        navigate('/')
    }

    return (
        <div className='container my-5'>
            <h1 className='utext my-5'>Package Delivery Quote</h1>
            <form>
                <div className='row g-3 my-5'>
                    <h3>Ship From:</h3>
                    <div className='col-md-4'>
                        <label htmlFor='country' className='form-label'>Country</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='sender.country' placeholder='Country Here' value={order.sender.country} required />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='postalCode' className='form-label'>Postal Code</label>
                        <input type={'number'} onChange={handleOrder} className='form-control' name='sender.postalCode' placeholder='Postal Code Here' value={order.sender.postalCode} required minLength={6} maxLength={6} />
                    </div>
                </div>
                <div className='row g-3 my-5'>
                    <h3>Ship To:</h3>
                    <div className='col-md-4'>
                        <label htmlFor='country' className='form-label'>Country</label>
                        <input type='text' onChange={handleOrder} className='form-control' name='receiver.country' placeholder='Country Here' value={order.receiver.country} required />
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor='postalCode' className='form-label'>Postal Code</label>
                        <input type={'number'} onChange={handleOrder} className='form-control' name='receiver.postalCode' placeholder='Postal Code Here' value={order.receiver.postalCode} required minLength={6} maxLength={6} />
                    </div>
                </div>
                <div className='row g-3 my-5'>
                    <h3>Package Details:</h3>
                    <div className='col-md-3'>
                        <label htmlFor='weight' className='form-label'>Weight in Kgs</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcel.weight' placeholder='Weight in Kgs' value={order.parcel.weight} required />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='length' className='form-label'>Length in cm</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcel.length' placeholder='Length Here' value={order.parcel.length} required />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='width' className='form-label'>Width in cm</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcel.width' placeholder='Width Here' value={order.parcel.width} required />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='height' className='form-label'>Height in cm</label>
                        <input onChange={handleOrder} type='number' className='form-control' name='parcel.height' placeholder='Height Here' value={order.parcel.height} required />
                    </div>
                </div>
                <button type='submit' className='btn btn-warning' onClick={getAQuote}>Get a Quote</button>
            </form>

            <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='staticBackdropLabel'>Approximate quote for the shipment</h1>
                        </div>
                        <div className='modal-body'>
                            {message}
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-outline-warning' onClick={closeModal}>Get Another Quote</button>
                            <button type='button' className='btn btn-warning' onClick={navigateToHomePage}>Go Back to Home Page</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quote