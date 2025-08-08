import axios from "axios"

const BASE_URL = "http://localhost:8080/auth"

export const registerCustomer = async (payload) => {
  const res = await axios.post(`${BASE_URL}/register`, payload, {
    headers: { "Content-Type": "application/json" },
  })
  // API returns { timeStamp, message, data: { customer fields } }
  return res.data
}

export const login = async ({ email, password, role }) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password, role: role?.toUpperCase() }, {
    headers: { "Content-Type": "application/json" },
  })
  // API returns LoginResponseDTO
  return res.data
}
