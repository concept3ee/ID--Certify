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
  biobankData?: BiobankData
  attesters: Attester[]
  verificationRequests: VerificationRequest[]
  pepStatus: PEPStatus
}

export interface OrganisationUser extends User {
  userType: 'organisation'
  companyName: string
  registrationNumber: string
  industry: string
  employeeCount: number
  complianceStatus: 'pending' | 'approved' | 'rejected'
  amlChecks: AMLCheck[]
  verificationRequests: VerificationRequest[]
  employeeVerifications: EmployeeVerification[]
}

export interface DeveloperUser extends User {
  userType: 'developer'
  apiKeys: APIKey[]
  webhooks: Webhook[]
  usageStats: UsageStats
  verificationTemplates: VerificationTemplate[]
  verificationAnalytics: VerificationAnalytics
}

export interface AdminUser extends User {
  userType: 'admin'
  permissions: string[]
  systemOverview: SystemOverview
}

// New Verification Flow Types
export interface VerificationRequest {
  id: string
  requesterId: string
  requesterType: UserType
  targetId: string
  targetType: UserType
  status: 'pending' | 'in_progress' | 'completed' | 'expired' | 'cancelled' | 'failed'
  type: 'individual' | 'organisation' | 'document' | 'biometric' | 'custom'
  requestedData: RequestedData[]
  expiryDate: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  result?: VerificationResult
  cost?: number
  templateId?: string // For developer custom flows
}

export interface RequestedData {
  field: string
  label: string
  type: 'text' | 'file' | 'select' | 'date' | 'boolean'
  required: boolean
  description?: string
  options?: string[] // For select type
  provided?: boolean
  value?: any
}

export interface VerificationResult {
  isVerified: boolean
  confidence: number
  details: Record<string, any>
  errors?: string[]
  trustScoreImpact?: number
  pepStatus?: PEPStatus
  attesterImpact?: AttesterImpact[]
}

export interface PEPStatus {
  isPEP: boolean
  confidence: number
  details?: string
  lastChecked: string
}

export interface Attester {
  id: string
  name: string
  email: string
  relationship: string
  trustScore: number
  isVerified: boolean
  attestations: Attestation[]
  createdAt: string
}

export interface Attestation {
  id: string
  attesterId: string
  targetId: string
  type: 'identity' | 'character' | 'professional' | 'custom'
  description: string
  confidence: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  expiresAt?: string
}

export interface AttesterImpact {
  attesterId: string
  impact: number
  reason: string
}

export interface BiobankData {
  id: string
  userId: string
  biometricType: 'fingerprint' | 'facial' | 'voice' | 'iris'
  dataHash: string
  isEncrypted: boolean
  trustScore: number
  lastVerified: string
  verificationCount: number
}

export interface VerificationTemplate {
  id: string
  developerId: string
  name: string
  description: string
  fields: RequestedData[]
  isActive: boolean
  costPerVerification: number
  usageCount: number
  createdAt: string
  updatedAt: string
}

export interface VerificationAnalytics {
  totalVerifications: number
  successfulVerifications: number
  failedVerifications: number
  averageCost: number
  totalRevenue: number
  monthlyStats: MonthlyStats[]
  templatePerformance: TemplatePerformance[]
}

export interface MonthlyStats {
  month: string
  verifications: number
  revenue: number
  successRate: number
}

export interface TemplatePerformance {
  templateId: string
  templateName: string
  usageCount: number
  successRate: number
  averageCost: number
}

export interface EmployeeVerification {
  id: string
  employeeId: string
  employeeName: string
  verificationStatus: 'pending' | 'verified' | 'failed'
  documents: Document[]
  trustScore: number
  lastVerified: string
  nextReviewDate: string
}

export interface SystemOverview {
  totalUsers: number
  totalVerifications: number
  activeRequests: number
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical'
  recentActivity: SystemActivity[]
}

export interface SystemActivity {
  id: string
  type: 'verification' | 'registration' | 'payment' | 'system'
  description: string
  timestamp: string
  severity: 'info' | 'warning' | 'error'
}

// Existing types (keeping for compatibility)
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
