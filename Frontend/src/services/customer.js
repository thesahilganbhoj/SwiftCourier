import axios from "axios";

// ✅ Replace with your actual backend URL
const BASE_URL = "http://localhost:8080/customers";

const customerService = {
  // Get customer profile using ID
  getCustomerProfile: (customerId) => {
    return axios.get(`${BASE_URL}/${customerId}`);
  },

  // Update customer profile using ID
  updateCustomerProfile: (customerId, updatedData) => {
    return axios.put(`${BASE_URL}/${customerId}`, updatedData);
  },
};

export default customerService;
