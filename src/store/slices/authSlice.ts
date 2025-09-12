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
        isActive: true,
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
      totalVerifications: 1247,
      monthlyVerifications: 456,
      apiCalls: 8934,
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    verificationTemplates: [
      {
        id: '1',
        name: 'Basic Identity Verification',
        description: 'Standard identity verification flow',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        fields: [
          { id: '1', type: 'document_upload', name: 'Upload ID Document' },
          { id: '2', type: 'selfie', name: 'Take Selfie' },
          { id: '3', type: 'verification', name: 'Verify Identity' }
        ],
        usageCount: 234,
        costPerVerification: 15
      },
      {
        id: '2',
        name: 'Enhanced KYC Flow',
        description: 'Comprehensive KYC verification process',
        isActive: true,
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-10T14:20:00Z',
        fields: [
          { id: '1', type: 'document_upload', name: 'Upload Documents' },
          { id: '2', type: 'address_verification', name: 'Verify Address' },
          { id: '3', type: 'selfie', name: 'Biometric Verification' },
          { id: '4', type: 'background_check', name: 'Background Check' }
        ],
        usageCount: 156,
        costPerVerification: 25
      },
      {
        id: '3',
        name: 'Quick Phone Verification',
        description: 'Fast phone number verification',
        isActive: false,
        createdAt: '2024-01-08T00:00:00Z',
        updatedAt: '2024-01-12T09:15:00Z',
        fields: [
          { id: '1', type: 'phone_input', name: 'Enter Phone Number' },
          { id: '2', type: 'sms_verification', name: 'Verify SMS Code' }
        ],
        usageCount: 89,
        costPerVerification: 5
      }
    ],
    verificationAnalytics: {
      totalVerifications: 1247,
      successRate: 94.2,
      avgProcessingTime: 2.3,
      totalRevenue: 18450,
      monthlyTrend: [
        { month: 'Jan', verifications: 234, revenue: 3510 },
        { month: 'Feb', verifications: 267, revenue: 4005 },
        { month: 'Mar', verifications: 298, revenue: 4470 }
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

const initialState: AuthState = {
  isAuthenticated: true, // Temporarily set to true for testing
  user: demoUsers.developer, // Set demo user
  userType: 'developer', // Set user type
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Registration failed'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.userType = null
      })
  },
})

export const { clearError, setUserType } = authSlice.actions
export default authSlice.reducer
