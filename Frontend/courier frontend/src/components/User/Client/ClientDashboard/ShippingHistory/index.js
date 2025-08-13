import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../../../../services/auth';
import { privateAxios } from '../../../../../services/helper';

function ShippingHistory() {
  const [orders, setOrders] = useState([]);
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
    const id = getCurrentUser().userId;
    privateAxios.get(`/client/delivered_orders/${id}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(response => {
        toast.error('There was an error getting your shipping history. Please try again.')
      })
  }, [])

  return (
    <div className='container my-5'>
      <h3 className='utext my-5'>Your Shipping History</h3>
      <table className='table'>
        <thead>
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
          {orders[0]!==null && orders.map(order => (
            <tr key={order.orderId} style={getStatusStyle(order.status)}>
              <td>{order.senderId.firstName} {order.senderId.lastName}</td>
              <td>{order.receiverId.firstName} {order.receiverId.lastName}</td>
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
  )
}

export default ShippingHistory