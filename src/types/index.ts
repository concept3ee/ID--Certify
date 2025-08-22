export type UserType = 'individual' | 'organisation' | 'developer' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  userType: UserType
  verificationId?: string
  trustScore: number
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface IndividualUser extends User {
  userType: 'individual'
  dateOfBirth?: string
  phoneNumber?: string
  address?: string
  biometricEnrolled: boolean
  documents: Document[]
}

export interface OrganisationUser extends User {
  userType: 'organisation'
  companyName: string
  registrationNumber: string
  industry: string
  employeeCount: number
  complianceStatus: 'pending' | 'approved' | 'rejected'
  amlChecks: AMLCheck[]
}

export interface DeveloperUser extends User {
  userType: 'developer'
  apiKeys: APIKey[]
  webhooks: Webhook[]
  usageStats: UsageStats
}

export interface AdminUser extends User {
  userType: 'admin'
  permissions: string[]
}

export interface Document {
  id: string
  type: 'NIN' | 'Passport' | 'CAC' | 'Certificate' | 'Other'
  name: string
  fileUrl: string
  status: 'pending' | 'verified' | 'rejected'
  uploadedAt: string
  verifiedAt?: string
}

export interface AMLCheck {
  id: string
  type: string
  status: 'pending' | 'passed' | 'failed'
  createdAt: string
  completedAt?: string
}

export interface APIKey {
  id: string
  name: string
  key: string
  environment: 'sandbox' | 'production'
  permissions: string[]
  createdAt: string
  lastUsed?: string
}

export interface Webhook {
  id: string
  url: string
  events: string[]
  isActive: boolean
  createdAt: string
}

export interface UsageStats {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  lastMonthRequests: number
}

export interface VerificationRequest {
  id: string
  userId: string
  documentType: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
  result?: VerificationResult
}

export interface VerificationResult {
  isVerified: boolean
  confidence: number
  details: Record<string, any>
  errors?: string[]
}

export interface TrustScoreHistory {
  id: string
  userId: string
  score: number
  change: number
  reason: string
  createdAt: string
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  userType: UserType | null
  loading: boolean
  error: string | null
}

export interface AppState {
  auth: AuthState
}
