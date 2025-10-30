import axios from "axios"

const API_BASE_URL = "https://mcom-mall-rest.vercel.app/api/v1"

/**
 * Configured axios instance for all API requests
 * Automatically handles authentication and error responses
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Request interceptor - adds JWT token to all authenticated requests
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response interceptor - handles authentication errors globally
 * Automatically redirects to login when token expires or is invalid
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored credentials and redirect to login
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
      window.location.href = "/signin"
    }
    return Promise.reject(error)
  },
)
