import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User, UserType } from '@/types'

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
  },
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
  user: demoUsers.organisation, // Set demo user
  userType: 'organisation', // Set user type
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
