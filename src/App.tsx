import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import IndividualDashboard from './pages/individual/IndividualDashboard'
import OrganisationDashboard from './pages/organisation/OrganisationDashboard'
import DeveloperDashboard from './pages/developer/DeveloperDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { TourProvider, useTour } from './contexts/TourContext'
import TourGuide from './components/ui/TourGuide'
import WelcomeModal from './components/ui/WelcomeModal'
import { AccessibilityProvider } from './components/ui/AccessibilitySystem'

function App() {
  const { isAuthenticated, userType } = useSelector((state: RootState) => state.auth)

  return (
    <AccessibilityProvider>
      <TourProvider>
        <AppContent isAuthenticated={isAuthenticated} userType={userType} />
      </TourProvider>
    </AccessibilityProvider>
  )
}

function AppContent({ isAuthenticated, userType }: { isAuthenticated: boolean; userType: string | null }) {
  const { isOnboarding, setIsOnboarding, showWelcomeModal, setShowWelcomeModal, userType: tourUserType } = useTour()

  console.log('AppContent render:', { isAuthenticated, userType, isOnboarding, showWelcomeModal, tourUserType })

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={`/${userType}`} />} />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to={`/${userType}`} />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to={`/${userType}`} />} />
        
        {/* Protected Routes */}
        <Route 
          path="/individual/*" 
          element={
            <ProtectedRoute userType="individual">
              <IndividualDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/organisation/*" 
          element={
            <ProtectedRoute userType="organisation">
              <OrganisationDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/developer/*" 
          element={
            <ProtectedRoute userType="developer">
              <DeveloperDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute userType="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* Global Welcome Modal - Only for non-admin users */}
      {userType !== 'admin' && (
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          userType={(tourUserType || userType || 'individual') as 'individual' | 'organisation' | 'developer'}
        />
      )}
      
      {/* Global Tour Guide - Only for non-admin users */}
      {isOnboarding && userType !== 'admin' && (
        <TourGuide
          isOpen={isOnboarding}
          onClose={() => setIsOnboarding(false)}
          userType={(tourUserType || userType || 'individual') as 'individual' | 'organisation' | 'developer'}
        />
      )}
    </div>
  )
}

export default App
