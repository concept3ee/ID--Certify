import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Shield, Home, FileText, CreditCard, BarChart3, Bell, Settings } from 'lucide-react'

interface TourStep {
  id: string
  title: string
  description: string
  target?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  highlightSelector?: string
}

interface TourGuideProps {
  isOpen: boolean
  onClose: () => void
  userType: 'individual' | 'organisation' | 'developer'
}

const TourGuide = ({ isOpen, onClose, userType }: TourGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  // Define tour steps based on user type
  const getTourSteps = (): TourStep[] => {
    const baseSteps = [
      {
        id: 'welcome',
        title: 'Welcome to IDCertify!',
        description: `Welcome to your ${userType} dashboard! Let's take a quick tour of your key features.`,
      },
      {
        id: 'dashboard',
        title: 'Dashboard Overview',
        description: 'Your central hub for all identity verification activities. Monitor your verification status, trust score, and recent activities.',
        target: 'dashboard-stats',
        position: 'bottom' as const,
        highlightSelector: '[data-tour="dashboard-stats"]'
      }
    ]

    const userSpecificSteps = {
      individual: [
        {
          id: 'verification',
          title: 'Identity Verification',
          description: 'Start your identity verification process here. Upload documents and complete verification steps to build your trust score.',
          target: 'verification-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="verification"]'
        },
        {
          id: 'documents',
          title: 'Document Management',
          description: 'Securely store and manage all your verification documents. Your data is encrypted and protected.',
          target: 'documents-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="documents"]'
        },
        {
          id: 'trust-score',
          title: 'Trust Score',
          description: 'Your trust score reflects your verification level and reputation on the platform. Higher scores unlock more features.',
          target: 'trust-score-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="trust-score"]'
        },
        {
          id: 'wallet',
          title: 'Digital Wallet',
          description: 'Manage your digital identity credentials and certificates. Share verified information securely.',
          target: 'wallet-section',
          position: 'bottom' as const,
          highlightSelector: '[data-tour="wallet"]'
        }
      ],
      organisation: [
        {
          id: 'verification',
          title: 'Verification Management',
          description: 'Manage and oversee all verification requests for your organization. Track status and approve verifications.',
          target: 'verification-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="verification"]'
        },
        {
          id: 'documents',
          title: 'Document Center',
          description: 'Centralized document management for your organization. Store and manage verification documents securely.',
          target: 'documents-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="documents"]'
        },
        {
          id: 'trust-score',
          title: 'Organization Trust Score',
          description: 'Your organization\'s trust score reflects your verification standards and compliance level.',
          target: 'trust-score-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="trust-score"]'
        },
        {
          id: 'wallet',
          title: 'Corporate Wallet',
          description: 'Manage corporate credentials and share verified information with partners and clients.',
          target: 'wallet-section',
          position: 'bottom' as const,
          highlightSelector: '[data-tour="wallet"]'
        }
      ],
      developer: [
        {
          id: 'api-keys',
          title: 'API Key Management',
          description: 'Generate and manage API keys for integrating IDCertify services into your applications.',
          target: 'api-keys-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="api-keys"]'
        },
        {
          id: 'verification',
          title: 'Verification API',
          description: 'Access verification endpoints to integrate identity verification into your applications.',
          target: 'verification-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="verification"]'
        },
        {
          id: 'documents',
          title: 'Document API',
          description: 'Upload and manage documents programmatically through our secure API endpoints.',
          target: 'documents-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="documents"]'
        },
        {
          id: 'wallet',
          title: 'Digital Wallet API',
          description: 'Integrate digital wallet functionality to manage credentials in your applications.',
          target: 'wallet-section',
          position: 'bottom' as const,
          highlightSelector: '[data-tour="wallet"]'
        }
      ]
    }

    return [...baseSteps, ...(userSpecificSteps[userType] || [])]
  }

  const tourSteps = getTourSteps()

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'welcome':
        return <Shield className="h-6 w-6" />
      case 'dashboard':
        return <Home className="h-6 w-6" />
      case 'verification':
        return <Shield className="h-6 w-6" />
      case 'documents':
        return <FileText className="h-6 w-6" />
      case 'trust-score':
        return <BarChart3 className="h-6 w-6" />
      case 'wallet':
        return <CreditCard className="h-6 w-6" />
      case 'api-keys':
        return <Settings className="h-6 w-6" />
      case 'notifications':
        return <Bell className="h-6 w-6" />
      case 'profile':
        return <Settings className="h-6 w-6" />
      default:
        return <Shield className="h-6 w-6" />
    }
  }

  if (!isOpen) return null

  console.log('TourGuide rendering with isOpen:', isOpen, 'userType:', userType, 'currentStep:', currentStep)

  const currentTourStep = tourSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === tourSteps.length - 1

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Tour Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4 border-4 border-green-500">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                {getStepIcon(currentTourStep.id)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentTourStep.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Step {currentStep + 1} of {tourSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-600 leading-relaxed">
              {currentTourStep.description}
            </p>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Back
                </button>
              )}
              
              {/* Progress Indicator */}
              <div className="flex items-center space-x-2">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-1 rounded-full transition-all duration-300 ${
                      index <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <span>{isLastStep ? 'Finish' : 'Next'}</span>
                {!isLastStep && <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourGuide
