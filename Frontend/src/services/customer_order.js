import axios from "axios";

const BASE_URL = "http://localhost:8080/customers";

// 🔸 Get all orders by customer ID
export const getOrdersByCustomerId = async (customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${customerId}/orders`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch customer orders:", error);
    throw error;
  }
};

// 🔸 Get details of a specific order by order ID
export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    throw error;
  }
};

// Get all pending orders
export const getPendingOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/orders/pending`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch pending orders", err);
    throw err;
  }
};

// Track order by tracking ID
export const trackOrderByTrackingId = async (trackingId) => {
  try {
    const res = await axios.get(`${BASE_URL}/orders/track/${trackingId}`);
    return res.data;
  } catch (err) {
    console.error("Tracking failed", err);
    throw err;
  }
};


// 🔸 Add new order
export const addOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders/add`, orderData);
    return response.data;
  } catch (error) {
    console.error("Failed to add order:", error);
    throw error;
  }
};