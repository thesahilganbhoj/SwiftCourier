import axios from "axios"

const BASE_URL = "http://localhost:8080"

// Get pending orders that staff can accept
export const getPendingOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/pending`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch pending orders:", error)
    throw error
  }
}

// Accept a pending order
export const acceptPendingOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/staff/accept-order`, orderData)
    return response.data
  } catch (error) {
    console.error("Failed to accept order:", error)
    throw error
  }
}

// Get staff tasks
export const getStaffTasks = async (staffId) => {
  try {
    const response = await axios.get(`${BASE_URL}/staff/tasks?staffId=${staffId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch staff tasks:", error)
    throw error
  }
}

// Update order status
export const updateOrderStatus = async (statusData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/staff/update-status`, statusData)
    return response.data
  } catch (error) {
    console.error("Failed to update order status:", error)
    throw error
  }
}

// Update warehouse
export const updateOrderWarehouse = async (warehouseData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/staff/update-warehouse`, warehouseData)
    return response.data
  } catch (error) {
    console.error("Failed to update warehouse:", error)
    throw error
  }
}
