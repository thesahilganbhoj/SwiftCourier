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
