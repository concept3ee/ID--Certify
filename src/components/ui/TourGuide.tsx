import { useState } from 'react'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Home, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Bell, 
  Settings,
  UserCheck,
  Database,
  Lock,
  Activity,
  Users,
  Code,
  TrendingUp,
  Key,
  Eye,
  MessageSquare,
  HelpCircle,
  Wallet,
  Folder,
  CheckCircle,
  Clock,
  AlertTriangle,
  Globe,
  Zap
} from 'lucide-react'

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
        description: `Welcome to your ${userType} dashboard! Let's take a comprehensive tour of all your powerful features.`,
      },
      {
        id: 'dashboard',
        title: 'Enhanced Dashboard Overview',
        description: 'Your intelligent central hub with real-time statistics, recent activities, quick actions, and verification status tracking.',
        target: 'dashboard-stats',
        position: 'bottom' as const,
        highlightSelector: '[data-tour="dashboard-stats"]'
      }
    ]

    const userSpecificSteps = {
      individual: [
        {
          id: 'verification',
          title: 'Advanced Identity Verification',
          description: 'Multi-document verification system supporting NIN, Passport, CAC, and more. Real-time status tracking and automated verification processes.',
          target: 'verification-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="verification"]'
        },
        {
          id: 'attester',
          title: 'Attester Network',
          description: 'Connect with trusted attesters to verify your identity and build credibility. Request attestations and manage your network.',
          target: 'attester-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="attester"]'
        },
        {
          id: 'biobank',
          title: 'Biometric Biobank',
          description: 'Securely store and manage your biometric data for enhanced verification. Advanced security with end-to-end encryption.',
          target: 'biobank-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="biobank"]'
        },
        {
          id: 'trust-score',
          title: 'Dynamic Trust Score',
          description: 'AI-powered trust scoring system that adapts based on your verification activities, attestations, and platform engagement.',
          target: 'trust-score-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="trust-score"]'
        },
        {
          id: 'wallet',
          title: 'Digital Wallet & Payments',
          description: 'Manage your digital identity credentials, make secure payments, and track all transactions with detailed billing.',
          target: 'wallet-section',
          position: 'bottom' as const,
          highlightSelector: '[data-tour="wallet"]'
        },
        {
          id: 'documents',
          title: 'Encrypted Document Storage',
          description: 'Military-grade encrypted document vault with granular access controls, permission management, and audit trails.',
          target: 'documents-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="documents"]'
        },
        {
          id: 'monitoring',
          title: 'Data Monitoring & Security',
          description: 'Real-time activity monitoring, access request tracking, and comprehensive security logs for complete transparency.',
          target: 'monitoring-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="monitoring"]'
        },
        {
          id: 'notifications',
          title: 'Smart Notifications',
          description: 'Intelligent notification system that keeps you informed about verification status, security alerts, and important updates.',
          target: 'notifications-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="notifications"]'
        }
      ],
      organisation: [
        {
          id: 'verification',
          title: 'Enterprise Verification Management',
          description: 'Comprehensive verification system for managing employee identities, bulk uploads, and compliance tracking.',
          target: 'verification-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="verification"]'
        },
        {
          id: 'employees',
          title: 'Employee Management',
          description: 'Centralized employee database with verification status, role management, and compliance monitoring.',
          target: 'employees-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="employees"]'
        },
        {
          id: 'compliance',
          title: 'AML & Compliance Center',
          description: 'Automated AML screening, compliance monitoring, and regulatory reporting to meet industry standards.',
          target: 'compliance-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="compliance"]'
        },
        {
          id: 'documents',
          title: 'Corporate Document Center',
          description: 'Secure document management for corporate files with role-based access and audit trails.',
          target: 'documents-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="documents"]'
        },
        {
          id: 'monitoring',
          title: 'System Monitoring',
          description: 'Real-time system health monitoring, performance analytics, and security incident tracking.',
          target: 'monitoring-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="monitoring"]'
        },
        {
          id: 'integrations',
          title: 'Third-Party Integrations',
          description: 'Seamless integration with HR systems, payroll platforms, and other enterprise tools.',
          target: 'integrations-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="integrations"]'
        },
        {
          id: 'wallet',
          title: 'Corporate Wallet',
          description: 'Manage corporate payments, subscription billing, and financial transactions with detailed reporting.',
          target: 'wallet-section',
          position: 'bottom' as const,
          highlightSelector: '[data-tour="wallet"]'
        },
        {
          id: 'billing',
          title: 'Billing & Analytics',
          description: 'Comprehensive billing management with usage analytics, cost tracking, and invoice generation.',
          target: 'billing-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="billing"]'
        }
      ],
      developer: [
        {
          id: 'api-keys',
          title: 'Advanced API Management',
          description: 'Generate, manage, and monitor API keys with detailed usage analytics and rate limiting controls.',
          target: 'api-keys-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="api-keys"]'
        },
        {
          id: 'analytics',
          title: 'API Analytics Dashboard',
          description: 'Comprehensive analytics showing API usage patterns, performance metrics, and success rates.',
          target: 'analytics-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="analytics"]'
        },
        {
          id: 'webhooks',
          title: 'Webhook Management',
          description: 'Configure webhooks for real-time notifications, event-driven integrations, and automated workflows.',
          target: 'webhooks-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="webhooks"]'
        },
        {
          id: 'documentation',
          title: 'Interactive Documentation',
          description: 'Comprehensive API documentation with code examples, testing tools, and integration guides.',
          target: 'documentation-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="documentation"]'
        },
        {
          id: 'verification',
          title: 'Verification API',
          description: 'RESTful API endpoints for identity verification, document processing, and trust score calculation.',
          target: 'verification-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="verification"]'
        },
        {
          id: 'wallet',
          title: 'Payment API',
          description: 'Secure payment processing API with transaction management and billing integration.',
          target: 'wallet-section',
          position: 'bottom' as const,
          highlightSelector: '[data-tour="wallet"]'
        },
        {
          id: 'monitoring',
          title: 'API Monitoring',
          description: 'Real-time API performance monitoring, error tracking, and system health analytics.',
          target: 'monitoring-section',
          position: 'right' as const,
          highlightSelector: '[data-tour="monitoring"]'
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
      case 'attester':
        return <UserCheck className="h-6 w-6" />
      case 'biobank':
        return <Database className="h-6 w-6" />
      case 'documents':
        return <Lock className="h-6 w-6" />
      case 'trust-score':
        return <BarChart3 className="h-6 w-6" />
      case 'wallet':
        return <Wallet className="h-6 w-6" />
      case 'api-keys':
        return <Key className="h-6 w-6" />
      case 'analytics':
        return <TrendingUp className="h-6 w-6" />
      case 'webhooks':
        return <Zap className="h-6 w-6" />
      case 'documentation':
        return <FileText className="h-6 w-6" />
      case 'notifications':
        return <Bell className="h-6 w-6" />
      case 'monitoring':
        return <Activity className="h-6 w-6" />
      case 'employees':
        return <Users className="h-6 w-6" />
      case 'compliance':
        return <CheckCircle className="h-6 w-6" />
      case 'integrations':
        return <Globe className="h-6 w-6" />
      case 'billing':
        return <CreditCard className="h-6 w-6" />
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
