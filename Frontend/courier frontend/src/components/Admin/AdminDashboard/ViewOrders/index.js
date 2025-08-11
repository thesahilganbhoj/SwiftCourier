import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { privateAxios } from '../../../../services/helper';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    privateAxios.get('/admin/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting orders. Please try again...')
      })
  }, [])

  useEffect(() => {
    privateAxios.get(`/admin/orders/${orderStatus}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting orders. Please try again...')
      })
  }, [orderStatus])

  return (
    <div className='container my-5'>
      <h3 className='utext my-5'>All Shipments</h3>
      Filter according to status: <p className='alink mx-4'style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('')}}>ALL</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('ORDER_CREATED')}}>ORDER_CREATED</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('ORDER_PICKED_UP')}}>ORDER_PICKED_UP</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('SHIPPED')}}>SHIPPED</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('OUT_FOR_DELIVERY')}}>OUT_FOR_DELIVERY</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('DELIVERED')}}>DELIVERED</p><p className='alink mx-4' style={{ color: '#ec942c' ,fontWeight:"bold"}} onClick={()=>{setOrderStatus('EXCEPTION')}}>EXCEPTION</p>
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
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map(order => (
                              <tr key={order.orderId}>
                                <td>{order.senderId.firstName}</td>
                                <td>{order.receiverId.firstName}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.deliveryDate}</td>
                                <td>{order.trackingNumber}</td>
                                <td>{order.serviceType}</td>
                                <td>{order.status}</td>
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
  )
}

export default ViewOrders