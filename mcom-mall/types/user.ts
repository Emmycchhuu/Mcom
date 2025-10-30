/**
 * Request payload for user registration
 */
export interface SignUpRequest {
  name: string
  email: string
  phoneNumber: string
  password: string
  confirm_password: string
  role: "customer" | "admin"
}

/**
 * Request payload for user authentication
 */
export interface SignInRequest {
  email: string
  password: string
  role: "customer" | "admin"
}

/**
 * API response structure for authentication endpoints
 * The actual API returns tokens in a nested auth object
 */
export interface AuthResponse {
  auth?: {
    accessToken: string
    refreshToken: string
  }
  userId?: string
  name?: string
  email?: string
  role?: string
  packageInfo?: any
  user?: User
  data?: {
    auth?: {
      accessToken: string
      refreshToken: string
    }
    token?: string
    user?: User
    requiresVerification?: boolean
  }
  requiresVerification?: boolean
}

/**
 * User profile data structure
 */
export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  createdAt: string
}
