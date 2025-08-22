import React, { createContext, useContext, useState, ReactNode } from 'react'

type TourUserType = 'individual' | 'organisation' | 'developer'

interface TourContextType {
  isOnboarding: boolean
  setIsOnboarding: (value: boolean) => void
  showWelcomeModal: boolean
  setShowWelcomeModal: (value: boolean) => void
  userType: TourUserType | null
  setUserType: (type: TourUserType | null) => void
  startTour: (userType: TourUserType) => void
  startTourAfterNavigation: (userType: TourUserType) => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export const useTour = () => {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider')
  }
  return context
}

interface TourProviderProps {
  children: ReactNode
}

export const TourProvider = ({ children }: TourProviderProps) => {
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [userType, setUserType] = useState<TourUserType | null>(null)

  // Check for pending tour on mount
  React.useEffect(() => {
    const pendingTour = localStorage.getItem('pendingTour')
    const tourUserType = localStorage.getItem('tourUserType')
    const pendingWelcome = localStorage.getItem('pendingWelcome')
    
    console.log('TourContext useEffect:', { pendingTour, tourUserType, pendingWelcome })
    
    // Only show tour for non-admin user types
    if (tourUserType && tourUserType !== 'admin') {
      if (pendingWelcome === 'true') {
        console.log('Setting welcome modal to true for:', tourUserType)
        setShowWelcomeModal(true)
        setUserType(tourUserType as TourUserType)
        localStorage.removeItem('pendingWelcome')
      } else if (pendingTour === 'true') {
        console.log('Setting onboarding to true for:', tourUserType)
        setIsOnboarding(true)
        setUserType(tourUserType as TourUserType)
        localStorage.removeItem('pendingTour')
        localStorage.removeItem('tourUserType')
      }
    }
  }, [])

  const startTour = (userType: TourUserType) => {
    console.log('startTour called with:', userType)
    setUserType(userType)
    setIsOnboarding(true)
  }

  const startTourAfterNavigation = (userType: TourUserType) => {
    console.log('startTourAfterNavigation called with:', userType)
    localStorage.setItem('pendingWelcome', 'true')
    localStorage.setItem('tourUserType', userType)
    console.log('localStorage set:', { 
      pendingWelcome: localStorage.getItem('pendingWelcome'), 
      tourUserType: localStorage.getItem('tourUserType') 
    })
  }

  return (
    <TourContext.Provider value={{
      isOnboarding,
      setIsOnboarding,
      showWelcomeModal,
      setShowWelcomeModal,
      userType,
      setUserType,
      startTour,
      startTourAfterNavigation
    }}>
      {children}
    </TourContext.Provider>
  )
}
