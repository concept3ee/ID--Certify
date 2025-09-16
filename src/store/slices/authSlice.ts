import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User, UserType, DeveloperUser } from '@/types'

// Demo users for testing
const demoUsers: Record<UserType, User> = {
  individual: {
    id: '1',
    email: 'demo@individual.com',
    name: 'John Doe',
    userType: 'individual',
    verificationId: 'IND-001',
    trustScore: 1250,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  organisation: {
    id: '2',
    email: 'demo@organisation.com',
    name: 'TechCorp Ltd',
    userType: 'organisation',
    verificationId: 'ORG-001',
    trustScore: 1450,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  developer: {
    id: '3',
    email: 'demo@developer.com',
    name: 'Dev Studio',
    userType: 'developer',
    verificationId: 'DEV-001',
    trustScore: 1350,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    // Extended properties for DeveloperUser
    apiKeys: [
      {
        id: '1',
        name: 'Production API Key',
        key: 'sk_live_...',
        environment: 'production' as const,
        permissions: ['verification:read', 'verification:write', 'webhook:manage'],
        createdAt: '2024-01-01T00:00:00Z',
        lastUsed: '2024-01-15T10:30:00Z'
      }
    ],
    webhooks: [
      {
        id: '1',
        url: 'https://api.example.com/webhook',
        events: ['verification.completed', 'verification.failed'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      }
    ],
    usageStats: {
      totalRequests: 1247,
      successfulRequests: 1175,
      failedRequests: 72,
      lastMonthRequests: 456
    },
    verificationTemplates: [
      {
        id: '1',
        developerId: '3',
        name: 'Basic Identity Verification',
        description: 'Standard identity verification flow',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        fields: [
          { field: 'document', label: 'Upload ID Document', type: 'file', required: true, description: 'Upload a valid government-issued ID' },
          { field: 'selfie', label: 'Take Selfie', type: 'file', required: true, description: 'Take a clear selfie for verification' },
          { field: 'verification', label: 'Verify Identity', type: 'boolean', required: true, description: 'Confirm identity verification' }
        ],
        usageCount: 234,
        costPerVerification: 15
      },
      {
        id: '2',
        developerId: '3',
        name: 'Enhanced KYC Flow',
        description: 'Comprehensive KYC verification process',
        isActive: true,
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-10T14:20:00Z',
        fields: [
          { field: 'documents', label: 'Upload Documents', type: 'file', required: true, description: 'Upload required documents' },
          { field: 'address', label: 'Verify Address', type: 'text', required: true, description: 'Enter your current address' },
          { field: 'biometric', label: 'Biometric Verification', type: 'file', required: true, description: 'Complete biometric verification' },
          { field: 'background', label: 'Background Check', type: 'boolean', required: true, description: 'Authorize background check' }
        ],
        usageCount: 156,
        costPerVerification: 25
      },
      {
        id: '3',
        developerId: '3',
        name: 'Quick Phone Verification',
        description: 'Fast phone number verification',
        isActive: false,
        createdAt: '2024-01-08T00:00:00Z',
        updatedAt: '2024-01-12T09:15:00Z',
        fields: [
          { field: 'phone', label: 'Enter Phone Number', type: 'text', required: true, description: 'Enter your phone number' },
          { field: 'sms', label: 'Verify SMS Code', type: 'text', required: true, description: 'Enter the SMS verification code' }
        ],
        usageCount: 89,
        costPerVerification: 5
      }
    ],
    verificationAnalytics: {
      totalVerifications: 1247,
      successfulVerifications: 1175,
      failedVerifications: 72,
      averageCost: 15.5,
      totalRevenue: 18450,
      monthlyStats: [
        { month: 'Jan', verifications: 234, revenue: 3510, successRate: 94.2 },
        { month: 'Feb', verifications: 267, revenue: 4005, successRate: 95.1 },
        { month: 'Mar', verifications: 298, revenue: 4470, successRate: 93.8 }
      ],
      templatePerformance: [
        { templateId: '1', templateName: 'Basic Identity Verification', usageCount: 234, successRate: 94.2, averageCost: 15 },
        { templateId: '2', templateName: 'Enhanced KYC Flow', usageCount: 156, successRate: 95.1, averageCost: 25 },
        { templateId: '3', templateName: 'Quick Phone Verification', usageCount: 89, successRate: 93.8, averageCost: 5 }
      ]
    }
  } as DeveloperUser,
  admin: {
    id: '4',
    email: 'demo@admin.com',
    name: 'Admin User',
    userType: 'admin',
    verificationId: 'ADM-001',
    trustScore: 2000,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, userType }: { email: string; password: string; userType: UserType }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo login - accept any password for demo users
    if (email === `demo@${userType}.com`) {
      return demoUsers[userType]
    }
    
    throw new Error('Invalid credentials')
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, userType, firstName, lastName }: { 
    email: string; 
    password: string; 
    userType: UserType;
    firstName?: string;
    lastName?: string;
  }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create new user based on type
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: firstName && lastName ? `${firstName} ${lastName}` : email,
      userType,
      verificationId: `${userType.toUpperCase()}-${Date.now()}`,
      trustScore: 750,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    return newUser
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
  }
)

// Get initial state from localStorage or default to developer for demo
const getInitialState = (): AuthState => {
  const savedUserType = localStorage.getItem('userType') as UserType
  const savedUserId = localStorage.getItem('userId')
  
  // If we have a saved user type and user ID, restore that user
  if (savedUserType && savedUserId && demoUsers[savedUserType]) {
    return {
      isAuthenticated: true,
      user: demoUsers[savedUserType],
      userType: savedUserType,
  loading: false,
  error: null,
    }
  }
  
  // Default to developer for demo purposes
  return {
    isAuthenticated: true,
    user: demoUsers.developer,
    userType: 'developer',
    loading: false,
    error: null,
  }
}

const initialState: AuthState = getInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload
      state.user = demoUsers[action.payload]
      
      // Save user type and ID to localStorage
      localStorage.setItem('userType', action.payload)
      localStorage.setItem('userId', demoUsers[action.payload].id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.userType = action.payload.userType
        
        // Save user type and ID to localStorage
        localStorage.setItem('userType', action.payload.userType)
        localStorage.setItem('userId', action.payload.id)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.userType = action.payload.userType
        
        // Save user type and ID to localStorage
        localStorage.setItem('userType', action.payload.userType)
        localStorage.setItem('userId', action.payload.id)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Registration failed'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.userType = null
        
        // Clear localStorage
        localStorage.removeItem('userType')
        localStorage.removeItem('userId')
      })
  },
})

export const { clearError, setUserType } = authSlice.actions
export default authSlice.reducer
