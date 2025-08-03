import axios from 'axios'

// This is your backend URL (change if different)
const BASE_URL = 'http://localhost:8080'

// Function to send feedback
export async function submitFeedback(feedback) {
  try {
    const url = `${BASE_URL}/customers/feedback`
    const response = await axios.post(url, feedback, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Feedback submission failed:', error)
    throw error
  }
}
