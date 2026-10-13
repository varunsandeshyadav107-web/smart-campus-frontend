import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
})

let backendAvailable = null
const statusListeners = new Set()

export function subscribeBackendStatus(listener) {
  statusListeners.add(listener)
  if (backendAvailable !== null) {
    listener(backendAvailable)
  }
  return () => statusListeners.delete(listener)
}

function notifyStatus(status) {
  backendAvailable = status
  statusListeners.forEach((fn) => fn(status))
}

export async function pingBackend() {
  try {
    await axios.get(`${API_BASE_URL}/dashboard/health`, { timeout: 3000 })
    notifyStatus(true)
    return true
  } catch (err) {
    try {
      await axios.get(`${API_BASE_URL}/dashboard/stats`, { timeout: 3000 })
      notifyStatus(true)
      return true
    } catch (err2) {
      notifyStatus(false)
      return false
    }
  }
}

// Initial ping
pingBackend()

export function getBackendStatus() {
  return backendAvailable
}

export function getErrorInfo(error) {
  if (error.response) {
    const data = error.response.data || {}
    return {
      message: data.message || 'Server returned an error. Please try again.',
      fieldErrors: data.fieldErrors || {},
      status: error.response.status,
    }
  }
  if (error.request) {
    return {
      message: 'Cannot reach the Spring Boot backend. Operating in local demo storage mode.',
      fieldErrors: {},
      isNetworkError: true,
    }
  }
  return { message: error.message || 'An unexpected error occurred.', fieldErrors: {} }
}

export default api
