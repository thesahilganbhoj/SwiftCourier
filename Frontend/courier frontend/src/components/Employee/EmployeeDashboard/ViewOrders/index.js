import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { privateAxios } from '../../../../services/helper';

function ViewShipments() {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [newOrder, setNewOrder] = useState('');

  const handleNewOrder = (event) => {
    const { name, value } = event.target;
    const updatedNewOrder = { ...newOrder };
    const [parentName, childName, grandchildName] = name.split('.');
    if (grandchildName) {
      // update a double nested property
      updatedNewOrder[parentName][childName][grandchildName] = value;
    } else if (childName) {
      // update a single nested property
      updatedNewOrder[parentName][childName] = value;
    } else {
      updatedNewOrder[parentName] = value;
    }
    setNewOrder(updatedNewOrder);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'ORDER_CREATED':
        return { backgroundColor: 'lightblue' };
      case 'ORDER_PICKED_UP':
        return { backgroundColor: 'lightgreen' };
      case 'SHIPPED':
        return { backgroundColor: 'lightyellow' };
      case 'OUT_FOR_DELIVERY':
        return { backgroundColor: 'lightcoral' };
      case 'DELIVERED':
        return { backgroundColor: 'lightgray' };
      case 'EXCEPTION':
        return { backgroundColor: 'lightpink' };
      default:
        return {};
    }
  }
  

  useEffect(() => {
    privateAxios.get(`/employee/orders/${orderStatus}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting orders. Please try again...')
      })
  }, [])

  useEffect(() => {
    privateAxios.get(`/employee/orders/${orderStatus}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting orders. Please try again...')
      })
  }, [orderStatus])

  const getOrders = () => {
    privateAxios.get(`/employee/orders/${orderStatus}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting orders. Please try again...')
      })
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

  const updateOrder = (trackingNumber) => {
    privateAxios.get(`/employee/order/${trackingNumber}`)
      .then(response => {
        setNewOrder(response.data);
        openModal();
      })
      .catch(response => {
        toast.error('There was an error trying to update the order details. Please try again.')
      })
  }

  const confirmOrderUpdate = (orderId) => {
    debugger;
    privateAxios.put(`/employee/order/${orderId}`,newOrder)
      .then(response => {
        closeModal();
        toast.success(response.data);
        getOrders();
      })
      .catch(response => {
        toast.error(response.data);
      })
  }

  return (
    <div>
      <div className='container my-5'>
        <h3 className='utext my-5'>All Shipments</h3>
        Filter according to status: <p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('')}}>ALL</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('ORDER_CREATED')}}>ORDER_CREATED</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('ORDER_PICKED_UP')}}>ORDER_PICKED_UP</p><p className='alink mx-4'style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('SHIPPED')}}>SHIPPED</p><p className='alink mx-4'style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('OUT_FOR_DELIVERY')}}>OUT_FOR_DELIVERY</p><p className='alink mx-4'style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('DELIVERED')}}>DELIVERED</p><p className='alink mx-4'style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('EXCEPTION')}}>EXCEPTION</p>
        <section className="intro">
          <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}>
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '700px' }}>
                          <table className="table table-striped mb-0">
                            <thead style={{ backgroundColor: '#f9e154' }}>
                              <tr>
                                <th scope='col'>Sender</th>
                                <th scope='col'>Receiver</th>
                                <th scope='col'>Order Date</th>
                                <th scope='col'>Delivery Date</th>
                                <th scope='col'>Tracking Number</th>
                                <th scope='col'>Service Type</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map(order => (
                                <tr key={order.orderId} style={getStatusStyle(order.status)}>
                                  <td>{order.senderId.firstName}</td>
                                  <td>{order.receiverId.firstName}</td>
                                  <td>{order.orderDate}</td>
                                  <td>{order.deliveryDate}</td>
                                  <td>{order.trackingNumber}</td>
                                  <td>{order.serviceType}</td>
                                  <td>{order.status}</td>
                                  <td><button type='button' className='btn btn-warning' onClick={()=>{updateOrder(order.trackingNumber)}}>Update Order</button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true' ref={modalRef}>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='modal-title fs-5' id='staticBackdropLabel'>Order Details</h2>
            </div>
            <form>
              <div className='modal-body'>
                <div className='row g-3'>
                  <select className='form-select' aria-label="Order Status" name='status' onChange={handleNewOrder} value={newOrder.status}>
                    <option>Open this select menu</option>
                    <option value={'ORDER_CREATED'}>ORDER_CREATED</option>
                    <option value={'ORDER_PICKED_UP'}>ORDER_PICKED_UP</option>
                    <option value={'SHIPPED'}>SHIPPED</option>
                    <option value={'OUT_FOR_DELIVERY'}>OUT_FOR_DELIVERY</option>
                    <option value={'DELIVERED'}>DELIVERED</option>
                    <option value={'EXCEPTION'}>EXCEPTION</option>
                  </select>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-outline-warning' onClick={closeModal}>Cancel</button>
                <button type='submit' className='btn btn-warning' onClick={() => { confirmOrderUpdate(newOrder.orderId) }}>Confirm Order Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewShipments