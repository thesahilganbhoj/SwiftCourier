import axios from "axios"

const BASE_URL = "http://localhost:8080/api/staff"

// Get pending orders that staff can accept
export const getPendingOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pending-orders`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch pending orders:", error)
    throw error
  }
}

// Accept an order
export const acceptOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/accept-order`, orderData)
    return response.data
  } catch (error) {
    console.error("Failed to accept order:", error)
    throw error
  }
}

// Get order details by order ID
export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/order/${orderId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch order details:", error)
    throw error
  }
}

// Get accepted tasks for a staff member
export const getAcceptedTasks = async (staffId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks?staffId=${staffId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch accepted tasks:", error)
    throw error
  }
}

// Update order status
export const updateOrderStatus = async (statusData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/update-status`, statusData)
    return response.data
  } catch (error) {
    console.error("Failed to update order status:", error)
    throw error
  }
}

// Update warehouse for an order
export const updateWarehouse = async (warehouseData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/update-warehouse`, warehouseData)
    return response.data
  } catch (error) {
    console.error("Failed to update warehouse:", error)
    throw error
  }
}
