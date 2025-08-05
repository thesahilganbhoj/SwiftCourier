import axios from "axios"

const BASE_URL = "http://localhost:8080/staff"

// Get staff profile by ID
export const getStaffProfile = async (staffId) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/${staffId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch staff profile:", error)
    throw error
  }
}

// Update staff profile
export const updateStaffProfile = async (staffId, profileData) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/${staffId}`, profileData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to update staff profile:", error)
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

// Get accepted tasks for a staff member
export const getAcceptedTasks = async (staffId) => {
  try {
    console.log("Fetching tasks for staff ID:", staffId)
    const response = await axios.get(`${BASE_URL}/tasks?staffId=${staffId}`)
    console.log("Tasks response:", response.data)
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

// Get order details
export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/order/${orderId}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch order details:", error)
    throw error
  }
}

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

// Get staff availability status
export const getStaffAvailability = async (staffId) => {
  try {
    console.log("Fetching availability for staff ID:", staffId)
    const response = await axios.get(`${BASE_URL}/availability/${staffId}`)
    console.log("Availability response:", response.data)
    return response.data
  } catch (error) {
    console.error("Failed to fetch staff availability:", error)
    console.error("Error details:", error.response?.data || error.message)
    throw error
  }
}

// Update staff availability status
export const updateStaffAvailability = async (staffId, availabilityData) => {
  try {
    console.log("Updating availability for staff:", staffId, "with data:", availabilityData)
    const response = await axios.put(`${BASE_URL}/availability/${staffId}`, availabilityData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("Availability update response:", response.data)
    return response.data
  } catch (error) {
    console.error("Failed to update staff availability:", error)
    console.error("Error details:", error.response?.data || error.message)
    throw error
  }
}
