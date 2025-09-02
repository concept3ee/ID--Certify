import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  UserCheck, 
  FileText,
  CreditCard,
  Building,
  Car,
  Phone,
  Heart,
  Fingerprint,
  Eye,
  Scale,
  MapPin,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react'

interface SystemVerificationRequest {
  id: string
  type: 'bvn' | 'nin' | 'frsc' | 'immigration' | 'cac' | 'firs' | 'state-residency' | 
        'facial-fingerprint' | 'liveliness' | 'criminal-history' | 'sexual-criminal-history' |
        'legal-cases' | 'credit-history' | 'phone' | 'health-insurance' | 'drivers-license' | 'association-group'
  title: string
  description: string
  requestingOrganization: string
  expiryDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  trustScoreImpact: number
  estimatedTime: string
  icon: React.ComponentType<{ className?: string }>
}

interface SystemVerificationFlowProps {
  request: SystemVerificationRequest
  onComplete: (result: 'success' | 'failed') => void
  onClose: () => void
}

const SystemVerificationFlow: React.FC<SystemVerificationFlowProps> = ({
  request,
  onComplete,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState<'details' | 'consent' | 'processing' | 'result'>('details')
  const [timeRemaining, setTimeRemaining] = useState<string>('')
  const [isConsented, setIsConsented] = useState(false)
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null)

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const expiry = new Date(request.expiryDate).getTime()
      const difference = expiry - now

      if (difference <= 0) {
        setTimeRemaining('EXPIRED')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeRemaining(`${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }

    calculateTimeRemaining()
    const timer = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(timer)
  }, [request.expiryDate])

  const handleConsent = () => {
    setIsConsented(true)
    setCurrentStep('consent')
  }

  const handleProceed = async () => {
    setCurrentStep('processing')
    
    // Simulate backend API call
    setTimeout(() => {
      const result = Math.random() > 0.1 ? 'success' : 'failed' // 90% success rate
      setVerificationResult(result)
      setCurrentStep('result')
      
      // Auto-close after showing result
      setTimeout(() => {
        onComplete(result)
      }, 3000)
    }, 3000)
  }

  const getVerificationIcon = (type: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'bvn': CreditCard,
      'nin': UserCheck,
      'frsc': Car,
      'immigration': Building,
      'cac': Building,
      'firs': Building,
      'state-residency': MapPin,
      'facial-fingerprint': Fingerprint,
      'liveliness': Eye,
      'criminal-history': Scale,
      'sexual-criminal-history': Scale,
      'legal-cases': Scale,
      'credit-history': TrendingUp,
      'phone': Phone,
      'health-insurance': Heart,
      'drivers-license': Car,
      'association-group': Users
    }
    return iconMap[type] || Shield
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'PENDING'
      case 'in-progress': return 'IN PROGRESS'
      case 'completed': return 'COMPLETED'
      case 'failed': return 'FAILED'
      default: return 'UNKNOWN'
    }
  }

  const renderDetailsStep = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <AlertTriangle className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">System Verification Request</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Verification Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              {React.createElement(getVerificationIcon(request.type), { className: "h-6 w-6 text-blue-600" })}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
            {getStatusText(request.status)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Requesting Organization:</span>
            <p className="font-medium text-gray-900">{request.requestingOrganization}</p>
          </div>
          <div>
            <span className="text-gray-500">Estimated Time:</span>
            <p className="font-medium text-gray-900">{request.estimatedTime}</p>
          </div>
          <div>
            <span className="text-gray-500">Trust Score Impact:</span>
            <p className="font-medium text-green-600">+{request.trustScoreImpact} points</p>
          </div>
          <div>
            <span className="text-gray-500">Current Status:</span>
            <p className="font-medium text-gray-900">{getStatusText(request.status)}</p>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Time Remaining</span>
          </div>
          <div className="text-lg font-bold text-yellow-800">{timeRemaining}</div>
        </div>
        <p className="text-xs text-yellow-700 mt-2">
          Complete this verification before the deadline to maintain your trust score
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleConsent}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <Shield className="h-5 w-5" />
        <span>Proceed with Verification</span>
      </button>
    </div>
  )

  const renderConsentStep = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Verification Consent</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Consent Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Information</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <p>• This verification will be processed automatically through our secure backend systems</p>
              <p>• Your personal information will be handled in accordance with data protection regulations</p>
              <p>• The verification process typically takes {request.estimatedTime}</p>
              <p>• Upon completion, your trust score will be updated accordingly</p>
              <p>• You can track the progress in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="consent"
          checked={isConsented}
          onChange={(e) => setIsConsented(e.target.checked)}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I understand and consent to proceed with this {request.title.toLowerCase()} verification. 
          I authorize IDCertify to process my information through secure backend systems.
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setCurrentStep('details')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleProceed}
          disabled={!isConsented}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
            isConsented
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Start Verification
        </button>
      </div>
    </div>
  )

  const renderProcessingStep = () => (
    <div className="space-y-6 text-center">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Processing Verification</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Processing Animation */}
      <div className="py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification in Progress</h3>
        <p className="text-gray-600">Please wait while we process your {request.title.toLowerCase()} verification...</p>
      </div>

      {/* Progress Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Estimated time remaining: {request.estimatedTime}</span>
        </div>
      </div>
    </div>
  )

  const renderResultStep = () => (
    <div className="space-y-6 text-center">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Verification Result</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Result Display */}
      <div className="py-8">
        {verificationResult === 'success' ? (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-900">Verification Successful!</h3>
            <p className="text-gray-600">Your {request.title.toLowerCase()} has been verified successfully.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-900">Verification Failed</h3>
            <p className="text-gray-600">We were unable to verify your {request.title.toLowerCase()}. Please try again or contact support.</p>
          </div>
        )}
      </div>

      {/* Trust Score Update */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-sm">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-gray-700">
            Trust Score: {verificationResult === 'success' ? `+${request.trustScoreImpact} points` : 'No change'}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onComplete(verificationResult!)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
      >
        Continue
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {currentStep === 'details' && renderDetailsStep()}
          {currentStep === 'consent' && renderConsentStep()}
          {currentStep === 'processing' && renderProcessingStep()}
          {currentStep === 'result' && renderResultStep()}
        </div>
      </div>
    </div>
  )
}

export default SystemVerificationFlow
