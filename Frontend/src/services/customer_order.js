import axios from "axios";

const API_BASE_URL = "http://localhost:8080/customers/orders";

export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    throw error;
  }
};
