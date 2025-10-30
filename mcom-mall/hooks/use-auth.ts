"use client"

import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { SignUpRequest, SignInRequest, AuthResponse } from "@/types/user"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"

/**
 * Extracts a user-friendly error message from API errors
 * Handles common HTTP status codes and provides helpful feedback
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    // Try to get the error message from the API response
    const apiMessage = error.response?.data?.message || error.response?.data?.error

    if (apiMessage) {
      return apiMessage
    }

    // Map HTTP status codes to user-friendly messages
    switch (error.response?.status) {
      case 400:
        return "Invalid information provided. Please check your details."
      case 401:
        return "Invalid email or password."
      case 403:
        return "Please verify your email address. Check your inbox for the confirmation link."
      case 404:
        return "Service not found. Please contact support."
      case 409:
        return "An account with this email already exists. Please sign in instead."
      case 422:
        return "Please check your information and try again."
      case 500:
        return "Server error. Please try again later."
      default:
        return error.message || "Something went wrong. Please try again."
    }
  }

  return "An unexpected error occurred. Please try again."
}

/**
 * Hook for user registration
 * Handles account creation and automatic authentication on success
 */
export function useSignUp() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await apiClient.post<AuthResponse>("/users/create", data)
      return response.data
    },
    onSuccess: (data) => {
      // The API returns auth tokens in a nested structure
      // Try multiple possible locations to handle different response formats
      const token = data?.auth?.accessToken || data?.data?.auth?.accessToken || data?.data?.token || data?.token

      // Build user object from response data
      const user = data?.user ||
        data?.data?.user || {
          userId: data?.userId,
          name: data?.name,
          email: data?.email,
          role: data?.role,
          packageInfo: data?.packageInfo,
        }

      // Some accounts require email verification before they can sign in
      if (!token) {
        const requiresVerification = data?.data?.requiresVerification || data?.requiresVerification
        if (requiresVerification) {
          throw new Error("Please check your email to verify your account before signing in.")
        }
        throw new Error("Authentication failed - no token received")
      }

      // Save credentials for authenticated API requests
      localStorage.setItem("auth_token", token)
      if (user) {
        localStorage.setItem("user_data", JSON.stringify(user))
      }

      router.push("/search")
    },
  })
}

/**
 * Hook for user authentication
 * Handles login and redirects to search page on success
 */
export function useSignIn() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      const response = await apiClient.post<AuthResponse>("/auth", {
        ...data,
        role: "customer", // Backend requires role field for auth
      })
      return response.data
    },
    onSuccess: (data) => {
      // Extract token from nested response structure
      const token = data?.auth?.accessToken || data?.data?.auth?.accessToken || data?.data?.token || data?.token

      // Build user object from available data
      const user = data?.user ||
        data?.data?.user || {
          userId: data?.userId,
          name: data?.name,
          email: data?.email,
          role: data?.role,
          packageInfo: data?.packageInfo,
        }

      // Check if email verification is required
      if (!token) {
        const requiresVerification = data?.data?.requiresVerification || data?.requiresVerification
        if (requiresVerification) {
          throw new Error(
            "Please verify your email address before signing in. Check your inbox for the confirmation link.",
          )
        }
        throw new Error("Authentication failed - no token received")
      }

      // Persist auth state for subsequent requests
      localStorage.setItem("auth_token", token)
      if (user) {
        localStorage.setItem("user_data", JSON.stringify(user))
      }

      router.push("/search")
    },
  })
}

export { getErrorMessage }
