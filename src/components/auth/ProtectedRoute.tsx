import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '@/store/store'
import { UserType } from '@/types'

interface ProtectedRouteProps {
  children: ReactNode
  userType: UserType
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isAuthenticated, userType: currentUserType } = useSelector(
    (state: RootState) => state.auth
  )

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (currentUserType !== userType) {
    return <Navigate to={`/${currentUserType}`} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
