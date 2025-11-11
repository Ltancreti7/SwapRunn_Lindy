/**
 * Shared TypeScript types for SwapRunn application
 * Defines interfaces for all major entities and API responses
 */

export type UserRole = 'ADMIN' | 'DEALERSHIP_ADMIN' | 'SALESPERSON' | 'DRIVER'
export type JobStatus = 'OPEN' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'

// User types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

// Dealership types
export interface Dealership {
  id: string
  name: string
  address: string
  contactEmail: string
  phone?: string
  approved: boolean
  adminId: string
  createdAt: Date
  updatedAt: Date
}

// Salesperson types
export interface Salesperson {
  id: string
  userId: string
  dealershipId: string
  createdAt: Date
  updatedAt: Date
}

// Driver types
export interface Driver {
  id: string
  userId: string
  licenseNumber: string
  radiusMiles: number
  rating: number
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

// Job types
export interface Job {
  id: string
  dealershipId: string
  salespersonId: string
  driverId?: string
  status: JobStatus
  pickupLocation: string
  dropoffLocation: string
  vehicleInfo: string
  scheduledAt: Date
  paymentAmount: number
  pickupProof?: string
  deliveryProof?: string
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Message types
export interface Message {
  id: string
  jobId: string
  senderId: string
  receiverId: string
  message: string
  createdAt: Date
}

// Payment types
export interface Payment {
  id: string
  jobId: string
  amount: number
  status: PaymentStatus
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Auth types
export interface SignupData {
  email: string
  password: string
  name: string
  phone?: string
  role: UserRole
  dealershipId?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface DealershipRegistrationData {
  name: string
  address: string
  contactEmail: string
  phone?: string
  contactPersonName: string
  contactPersonTitle: string
}
