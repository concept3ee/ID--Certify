import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import {
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Eye,
  FileText,
  Plus,
  Download,
  RefreshCw,
  Shield,
  UserCheck,
  Building,
  GraduationCap,
  MapPin,
  CreditCard,
  Fingerprint,
  AlertTriangle,
  XCircle,
  Calendar,
  TrendingUp,
  BarChart3,
  Circle,
  Star,
  X
} from 'lucide-react'

// Verification Status Types
type VerificationStatus = 'not_started' | 'pending' | 'in_progress' | 'completed' | 'expired' | 'failed' | 'requires_info' | 'cancelled'

// Verification Types
type VerificationType = 
  | 'bvn-verification' 
  | 'nin-verification' 
  | 'employment-verification' 
  | 'education-verification' 
  | 'address-verification' 
  | 'income-verification' 
  | 'reference-verification' 
  | 'business-verification' 
  | 'facial-verification' 
  | 'fingerprint-verification' 
  | 'frsc-verification' 
  | 'immigration-verification' 
  | 'cac-verification' 
  | 'firs-verification'
  | 'passport-verification'
  | 'driver-license-verification'

interface VerificationRecord {
  id: string
  type: VerificationType
  title: string
  description: string
  status: VerificationStatus
  priority: 'low' | 'medium' | 'high' | 'critical'
  trustScoreImpact: number
  initiatedDate?: string
  completedDate?: string
  expiryDate?: string
  assignedTo?: string
  progress?: number
  issues?: string[]
  metadata?: Record<string, any>
  cost?: number
  category: 'identity' | 'financial' | 'employment' | 'education' | 'biometric' | 'business' | 'government'
}

const Biobank = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'verifications' | 'initiate' | 'analytics'>('overview')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [priorityFilter, setPriorityFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVerification, setSelectedVerification] = useState<VerificationRecord | null>(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showSystemVerification, setShowSystemVerification] = useState(false)
  const [showAttesterVerification, setShowAttesterVerification] = useState(false)
  const [selectedSystemRequest, setSelectedSystemRequest] = useState<any>(null)
  const [selectedAttesterRequest, setSelectedAttesterRequest] = useState<any>(null)
  const [completedVerificationData, setCompletedVerificationData] = useState<Record<string, any>>({})

  // Mock verification data - comprehensive verification records
  const verificationRecords: VerificationRecord[] = [
    // Identity Verifications
    {
      id: '1',
      type: 'bvn-verification',
      title: 'BVN Verification',
      description: 'Bank Verification Number validation for financial transactions',
      status: 'completed',
      priority: 'high',
      trustScoreImpact: 25,
      initiatedDate: '2024-08-15',
      completedDate: '2024-08-20',
      category: 'financial',
      cost: 500
    },
    {
      id: '2',
      type: 'nin-verification',
      title: 'NIN Verification',
      description: 'National Identity Number validation',
      status: 'pending',
      priority: 'critical',
      trustScoreImpact: 30,
      initiatedDate: '2024-08-25',
      category: 'identity',
      progress: 65,
      assignedTo: 'System AI',
      cost: 750
    },
    {
      id: '3',
      type: 'passport-verification',
      title: 'Passport Verification',
      description: 'International passport validation',
      status: 'completed',
      priority: 'medium',
      trustScoreImpact: 20,
      initiatedDate: '2024-07-10',
      completedDate: '2024-07-15',
      category: 'identity',
      cost: 1000
    },
    // Employment Verifications
    {
      id: '4',
      type: 'employment-verification',
      title: 'Employment Verification',
      description: 'Current employment status and history validation',
      status: 'in_progress',
      priority: 'high',
      trustScoreImpact: 35,
      initiatedDate: '2024-08-20',
      category: 'employment',
      progress: 40,
      assignedTo: 'HR Department',
      cost: 800
    },
    {
      id: '5',
      type: 'income-verification',
      title: 'Income Verification',
      description: 'Salary and income documentation validation',
      status: 'not_started',
      priority: 'medium',
      trustScoreImpact: 25,
      category: 'employment',
      cost: 600
    },
    // Education Verifications
    {
      id: '6',
      type: 'education-verification',
      title: 'Education Verification',
      description: 'Academic credentials and qualifications validation',
      status: 'requires_info',
      priority: 'medium',
      trustScoreImpact: 20,
      category: 'education',
      initiatedDate: '2024-08-18',
      issues: ['Missing transcript', 'Incomplete degree information'],
      cost: 700
    },
    // Address Verifications
    {
      id: '7',
      type: 'address-verification',
      title: 'Address Verification',
      description: 'Residential address validation and confirmation',
      status: 'expired',
      priority: 'low',
      trustScoreImpact: 15,
      initiatedDate: '2024-06-01',
      expiryDate: '2024-08-01',
      category: 'identity',
      cost: 400
    },
    // Biometric Verifications
    {
      id: '8',
      type: 'facial-verification',
      title: 'Facial Recognition',
      description: 'Biometric facial verification for identity confirmation',
      status: 'completed',
      priority: 'high',
      trustScoreImpact: 40,
      initiatedDate: '2024-08-10',
      completedDate: '2024-08-12',
      category: 'biometric',
      cost: 1200
    },
    {
      id: '9',
      type: 'fingerprint-verification',
      title: 'Fingerprint Verification',
      description: 'Biometric fingerprint validation',
      status: 'failed',
      priority: 'critical',
      trustScoreImpact: -10,
      initiatedDate: '2024-08-22',
      issues: ['Poor quality scan', 'Multiple attempts exceeded'],
      category: 'biometric',
      cost: 800
    },
    // Government Verifications
    {
      id: '10',
      type: 'frsc-verification',
      title: 'FRSC Verification',
      description: 'Federal Road Safety Corps driver license validation',
      status: 'not_started',
      priority: 'medium',
      trustScoreImpact: 20,
      category: 'government',
      cost: 600
    },
    {
      id: '11',
      type: 'immigration-verification',
      title: 'Immigration Verification',
      description: 'Immigration status and travel history validation',
      status: 'cancelled',
      priority: 'low',
      trustScoreImpact: 0,
      initiatedDate: '2024-08-05',
      category: 'government',
      cost: 900
    },
    // Business Verifications
    {
      id: '12',
      type: 'business-verification',
      title: 'Business Verification',
      description: 'Business registration and operational status validation',
      status: 'pending',
      priority: 'high',
      trustScoreImpact: 30,
      initiatedDate: '2024-08-28',
      category: 'business',
      progress: 20,
      assignedTo: 'Business Registry',
      cost: 1100
    }
  ]

  // Helper functions
  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'not_started': return 'bg-gray-100 text-gray-600'
      case 'expired': return 'bg-orange-100 text-orange-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'requires_info': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-gray-100 text-gray-500'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'in_progress': return <RefreshCw className="h-4 w-4" />
      case 'not_started': return <Circle className="h-4 w-4" />
      case 'expired': return <AlertTriangle className="h-4 w-4" />
      case 'failed': return <XCircle className="h-4 w-4" />
      case 'requires_info': return <AlertCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Circle className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'identity': return <UserCheck className="h-4 w-4" />
      case 'financial': return <CreditCard className="h-4 w-4" />
      case 'employment': return <Building className="h-4 w-4" />
      case 'education': return <GraduationCap className="h-4 w-4" />
      case 'biometric': return <Fingerprint className="h-4 w-4" />
      case 'business': return <Building className="h-4 w-4" />
      case 'government': return <Shield className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getVerificationTypeDisplay = (type: VerificationType) => {
    return type.replace('-verification', '').split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Filtered data
  const filteredVerifications = verificationRecords.filter(verification => {
    const matchesStatus = !statusFilter || verification.status === statusFilter
    const matchesCategory = !categoryFilter || verification.category === categoryFilter
    const matchesPriority = !priorityFilter || verification.priority === priorityFilter
    const matchesSearch = !searchTerm || 
      verification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch
  })

  // Statistics
  const stats = {
    total: verificationRecords.length,
    completed: verificationRecords.filter(v => v.status === 'completed').length,
    pending: verificationRecords.filter(v => v.status === 'pending').length,
    inProgress: verificationRecords.filter(v => v.status === 'in_progress').length,
    notStarted: verificationRecords.filter(v => v.status === 'not_started').length,
    expired: verificationRecords.filter(v => v.status === 'expired').length,
    failed: verificationRecords.filter(v => v.status === 'failed').length,
    requiresInfo: verificationRecords.filter(v => v.status === 'requires_info').length,
    cancelled: verificationRecords.filter(v => v.status === 'cancelled').length
  }

  const totalTrustScore = verificationRecords.reduce((sum, v) => sum + v.trustScoreImpact, 0)

  // Action handlers
  const handleInitiateVerification = (type: VerificationType) => {
    // Determine if it's a system verification or attester verification
    const systemVerificationTypes = [
      'bvn-verification', 'nin-verification', 'passport-verification', 
      'facial-verification', 'fingerprint-verification', 'frsc-verification', 
      'immigration-verification', 'cac-verification', 'firs-verification'
    ]
    
    const attesterVerificationTypes = [
      'employment-verification', 'education-verification', 'address-verification',
      'income-verification', 'reference-verification', 'business-verification'
    ]
    
    if (systemVerificationTypes.includes(type)) {
      // Create system verification request with proper structure for custom component
      const verificationRecord = verificationRecords.find(v => v.type === type)
      const systemRequest = {
        id: `sys-${Date.now()}`,
        type: type,
        title: getVerificationTypeDisplay(type),
        description: `Self-initiated ${getVerificationTypeDisplay(type)} verification`,
        category: verificationRecord?.category || 'identity',
        trustScoreImpact: verificationRecord?.trustScoreImpact || 20,
        estimatedTime: '1-3 business days',
        status: 'not_started' as const
      }
      setSelectedSystemRequest(systemRequest)
      setShowSystemVerification(true)
    } else if (attesterVerificationTypes.includes(type)) {
      // Create attester verification request with proper structure for custom component
      const verificationRecord = verificationRecords.find(v => v.type === type)
      const attesterRequest = {
        id: `att-${Date.now()}`,
        type: type,
        title: getVerificationTypeDisplay(type),
        description: `Self-initiated ${getVerificationTypeDisplay(type)} verification`,
        category: verificationRecord?.category || 'employment',
        trustScoreImpact: verificationRecord?.trustScoreImpact || 25,
        estimatedTime: '3-7 business days',
        requiredDocuments: ['Identity Document', 'Supporting Evidence', 'Consent Form'],
        status: 'not_started' as const
      }
      setSelectedAttesterRequest(attesterRequest)
      setShowAttesterVerification(true)
    }
  }

  const handleViewVerification = (verification: VerificationRecord) => {
    setSelectedVerification(verification)
    setShowVerificationModal(true)
  }

  const handleResolveIssue = (verification: VerificationRecord) => {
    // For issues, we'll show the verification flow with issue context
    if (verification.status === 'requires_info') {
      handleInitiateVerification(verification.type)
    }
  }

  const handleRenewVerification = (verification: VerificationRecord) => {
    // For expired verifications, we'll restart the verification flow
    if (verification.status === 'expired') {
      handleInitiateVerification(verification.type)
    }
  }

  const handleSystemVerificationComplete = (result: 'success' | 'failed', formData?: any) => {
    setShowSystemVerification(false)
    
    if (result === 'success' && selectedSystemRequest && formData) {
      // Store the completed verification data using the verification type as key
      setCompletedVerificationData(prev => ({
        ...prev,
        [selectedSystemRequest.type]: {
          ...selectedSystemRequest,
          formData,
          completedAt: new Date().toISOString()
        }
      }))
      console.log('System verification completed successfully with data:', formData)
    }
    
    setSelectedSystemRequest(null)
  }

  const handleAttesterVerificationComplete = (result: 'success' | 'failed' | 'requires-info', formData?: any) => {
    setShowAttesterVerification(false)
    
    if (result === 'success' && selectedAttesterRequest && formData) {
      // Store the completed verification data using the verification type as key
      setCompletedVerificationData(prev => ({
        ...prev,
        [selectedAttesterRequest.type]: {
          ...selectedAttesterRequest,
          formData,
          completedAt: new Date().toISOString()
        }
      }))
      console.log('Attester verification completed successfully with data:', formData)
    } else if (result === 'requires-info') {
      console.log('Attester verification requires additional information')
    }
    
    setSelectedAttesterRequest(null)
  }

  // Custom Self-Initiated System Verification Component
  const SelfInitiatedSystemVerification: React.FC<{
    request: any
    onComplete: (result: 'success' | 'failed', formData?: any) => void
    onClose: () => void
  }> = ({ request, onComplete, onClose }) => {
    const [currentStep, setCurrentStep] = useState<'details' | 'input' | 'consent' | 'processing' | 'result'>('details')
    const [isConsented, setIsConsented] = useState(false)
    const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null)
    const [formData, setFormData] = useState<Record<string, any>>({})

    const handleConsent = () => {
      setIsConsented(true)
      setCurrentStep('input')
    }

    const handleInputComplete = () => {
      // Basic validation - check if required fields are filled
      let isValid = true
      
      if (request.type === 'frsc-verification') {
        isValid = formData.licenseNumber && formData.fullName && formData.dateOfBirth && formData.licenseType
      } else if (request.type === 'bvn-verification') {
        isValid = formData.bvnNumber && formData.bankName && formData.accountNumber
      } else if (request.type === 'nin-verification') {
        isValid = formData.ninNumber && formData.fullName && formData.dateOfBirth
      } else if (request.type === 'passport-verification') {
        isValid = formData.passportNumber && formData.fullName && formData.dateOfBirth && formData.expiryDate
      } else if (request.type === 'facial-verification') {
        isValid = formData.facialVerified
      } else if (request.type === 'fingerprint-verification') {
        isValid = formData.fingerprintVerified
      }
      
      if (isValid) {
        setCurrentStep('consent')
      } else {
        alert('Please fill in all required fields before proceeding.')
      }
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
          onComplete(result, formData)
        }, 3000)
      }, 3000)
    }

    const getVerificationIcon = () => {
      return getCategoryIcon(request.category || 'identity')
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'success': return 'text-green-600'
        case 'failed': return 'text-red-600'
        default: return 'text-gray-600'
      }
    }

    const getStatusText = (status: string) => {
      switch (status) {
        case 'success': return 'Verification Successful'
        case 'failed': return 'Verification Failed'
        default: return 'Processing'
      }
    }

    if (currentStep === 'details') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Self-Initiated Verification</h4>
                <p className="text-sm text-blue-700">You are starting this verification process yourself to enhance your trust score.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              {getVerificationIcon()}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                <p className="text-sm text-gray-600">{request.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Trust Score Impact</label>
                <span className="text-lg font-bold text-green-600">+{request.trustScoreImpact} points</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Time</label>
                <span className="text-lg font-medium text-gray-900">{request.estimatedTime}</span>
              </div>
            </div>

            <button
              onClick={handleConsent}
              className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Verification Process
            </button>
          </div>
        </div>
      )
    }

    if (currentStep === 'input') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Verification Details Required</h4>
                <p className="text-sm text-blue-700">Please provide the necessary information for {request.title} verification.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Your Information</h3>
            
            {request.type === 'frsc-verification' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License Number</label>
                  <input
                    type="text"
                    value={formData.licenseNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                    placeholder="Enter your driver's license number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name (as on license)</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name as it appears on your license"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Type</label>
                  <select
                    value={formData.licenseType || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, licenseType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select license type</option>
                    <option value="learner">Learner's Permit</option>
                    <option value="provisional">Provisional License</option>
                    <option value="full">Full License</option>
                    <option value="commercial">Commercial License</option>
                  </select>
                </div>
              </div>
            )}

            {request.type === 'bvn-verification' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BVN Number</label>
                  <input
                    type="text"
                    value={formData.bvnNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, bvnNumber: e.target.value }))}
                    placeholder="Enter your 11-digit BVN"
                    maxLength={11}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={formData.bankName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="Enter your bank name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={formData.accountNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                    placeholder="Enter your account number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {request.type === 'nin-verification' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NIN Number</label>
                  <input
                    type="text"
                    value={formData.ninNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, ninNumber: e.target.value }))}
                    placeholder="Enter your 11-digit NIN"
                    maxLength={11}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name as it appears on your NIN"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {request.type === 'passport-verification' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number</label>
                  <input
                    type="text"
                    value={formData.passportNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
                    placeholder="Enter your passport number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name as it appears on your passport"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {request.type === 'facial-verification' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <UserCheck className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Camera access required</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Click to start facial verification</p>
                </div>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, facialVerified: true }))}
                  className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Facial Verification
                </button>
              </div>
            )}

            {request.type === 'fingerprint-verification' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <Fingerprint className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Fingerprint scanner required</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Click to start fingerprint verification</p>
                </div>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, fingerprintVerified: true }))}
                  className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Fingerprint Verification
                </button>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setCurrentStep('details')}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleInputComplete}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Consent
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 'consent') {
      return (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-yellow-900">Consent Required</h4>
                <p className="text-sm text-yellow-700">Please review and consent to the verification process.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Consent</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Data Processing</h4>
                  <p className="text-sm text-gray-600">Your information will be processed securely for verification purposes only.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Trust Score Impact</h4>
                  <p className="text-sm text-gray-600">Successful verification will increase your trust score by {request.trustScoreImpact} points.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Privacy Protection</h4>
                  <p className="text-sm text-gray-600">Your personal data is protected under our privacy policy and data protection standards.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentStep('details')}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleProceed}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                I Consent & Proceed
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 'processing') {
      return (
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Verification</h3>
            <p className="text-sm text-gray-600">Please wait while we process your {request.title} verification...</p>
          </div>
        </div>
      )
    }

    if (currentStep === 'result') {
      return (
        <div className="text-center space-y-6">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
            verificationResult === 'success' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {verificationResult === 'success' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600" />
            )}
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold ${getStatusColor(verificationResult || '')}`}>
              {getStatusText(verificationResult || '')}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {verificationResult === 'success' 
                ? `Your ${request.title} verification has been completed successfully!`
                : `We encountered an issue with your ${request.title} verification. Please try again.`
              }
            </p>
          </div>
        </div>
      )
    }

    return null
  }

  // Custom Self-Initiated Attester Verification Component
  const SelfInitiatedAttesterVerification: React.FC<{
    request: any
    onComplete: (result: 'success' | 'failed' | 'requires-info', formData?: any) => void
    onClose: () => void
  }> = ({ request, onComplete, onClose }) => {
    const [currentStep, setCurrentStep] = useState<'details' | 'attester-selection' | 'document-upload' | 'communication' | 'review' | 'result'>('details')
    const [selectedAttester, setSelectedAttester] = useState<string>('')
    const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])
    const [messages, setMessages] = useState<Array<{id: string, sender: 'user' | 'attester', message: string, timestamp: Date}>>([])
    const [newMessage, setNewMessage] = useState('')
    const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | 'requires-info' | null>(null)

    // Mock attester data
    const mockAttesters = [
      { id: '1', name: 'Dr. Sarah Johnson', rating: 4.8, specialization: 'Employment Verification', avatar: 'SJ' },
      { id: '2', name: 'Prof. Michael Chen', rating: 4.9, specialization: 'Education Verification', avatar: 'MC' },
      { id: '3', name: 'Ms. Emily Davis', rating: 4.7, specialization: 'Reference Verification', avatar: 'ED' }
    ]

    const handleAttesterSelection = (attesterId: string) => {
      setSelectedAttester(attesterId)
      setCurrentStep('document-upload')
    }

    const handleDocumentUpload = (files: FileList | null) => {
      if (files) {
        setUploadedDocuments(Array.from(files))
      }
    }

    const handleRemoveDocument = (index: number) => {
      setUploadedDocuments(prev => prev.filter((_, i) => i !== index))
    }

    const handleSendMessage = () => {
      if (newMessage.trim()) {
        const message = {
          id: Date.now().toString(),
          sender: 'user' as const,
          message: newMessage,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, message])
        setNewMessage('')
      }
    }

    const handleSubmitForReview = () => {
      setCurrentStep('review')
    }

    const getVerificationIcon = () => {
      return getCategoryIcon(request.category || 'employment')
    }

    const getStatusColor = (status: string) => {
    switch (status) {
        case 'success': return 'text-green-600'
        case 'failed': return 'text-red-600'
        case 'requires-info': return 'text-yellow-600'
        default: return 'text-gray-600'
      }
    }

    const getStatusText = (status: string) => {
      return status === 'success' ? 'Verification Successful' : 'Verification Failed'
    }

    if (currentStep === 'details') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Self-Initiated Attester Verification</h4>
                <p className="text-sm text-blue-700">You are starting this verification process yourself with the help of trusted attesters.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              {getVerificationIcon()}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                <p className="text-sm text-gray-600">{request.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Trust Score Impact</label>
                <span className="text-lg font-bold text-green-600">+{request.trustScoreImpact} points</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Time</label>
                <span className="text-lg font-medium text-gray-900">{request.estimatedTime}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('attester-selection')}
              className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Select Attester & Continue
            </button>
          </div>
        </div>
      )
    }

    if (currentStep === 'attester-selection') {
  return (
    <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Attester</h3>
            <p className="text-sm text-gray-600 mb-6">Choose a trusted attester to verify your {request.title}.</p>
            
            <div className="space-y-3">
              {mockAttesters.map((attester) => (
                <div
                  key={attester.id}
                  onClick={() => handleAttesterSelection(attester.id)}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{attester.avatar}</span>
                    </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{attester.name}</h4>
                    <p className="text-sm text-gray-600">{attester.specialization}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{attester.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep('details')}
              className="mt-6 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )
    }

    if (currentStep === 'document-upload') {
      return (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Required Documents</h3>
            <p className="text-sm text-gray-600 mb-6">Please upload the documents required for {request.title} verification.</p>
            
            <div className="space-y-4">
              {request.requiredDocuments?.map((doc: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{doc}</span>
                  <input
                    type="file"
                    onChange={(e) => handleDocumentUpload(e.target.files)}
                    className="ml-auto text-sm text-gray-500 file:mr-4 file:py-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              ))}
            </div>

            {uploadedDocuments.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                <div className="space-y-2">
                  {uploadedDocuments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveDocument(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setCurrentStep('attester-selection')}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('communication')}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Communication
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 'communication') {
      return (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication with Attester</h3>
            <p className="text-sm text-gray-600 mb-6">Communicate with your selected attester to complete the verification.</p>
            
            <div className="space-y-4 mb-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setCurrentStep('document-upload')}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmitForReview}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 'review') {
      return (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Submit</h3>
            <p className="text-sm text-gray-600 mb-6">Review your verification details before final submission.</p>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Verification Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium text-gray-900">{request.title}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Attester:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {mockAttesters.find(a => a.id === selectedAttester)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Documents:</span>
                    <span className="ml-2 font-medium text-gray-900">{uploadedDocuments.length} uploaded</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Trust Impact:</span>
                    <span className="ml-2 font-medium text-green-600">+{request.trustScoreImpact} points</span>
                  </div>
                </div>
        </div>
      </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentStep('communication')}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setCurrentStep('result')
                  // Simulate verification completion
                  setTimeout(() => {
                    const result = Math.random() > 0.2 ? 'success' : 'requires-info'
                    setVerificationResult(result)
                    setTimeout(() => onComplete(result, { selectedAttester, uploadedDocuments, messages }), 2000)
                  }, 2000)
                }}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Verification
              </button>
      </div>
          </div>
        </div>
      )
    }

    if (currentStep === 'result') {
      return (
        <div className="text-center space-y-6">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
            verificationResult === 'success' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {verificationResult === 'success' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            )}
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold ${getStatusColor(verificationResult || '')}`}>
              {getStatusText(verificationResult || '')}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {verificationResult === 'success' 
                ? `Your ${request.title} verification has been submitted successfully!`
                : `Your ${request.title} verification requires additional information.`
              }
            </p>
          </div>
        </div>
      )
    }

    return null
  }

  return (
        <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Section Header Row - Title, Centered Navigation, and Action Button */}
          <div className="flex items-center">
            {/* Left Side - Title Only */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Verification Biobank</h1>
            </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveMainTab('overview')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'overview'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('verifications')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'verifications'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>All Verifications</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('initiate')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'initiate'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Initiate New</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('analytics')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'analytics'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Analytics</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeMainTab === 'overview' ? (
        <div className="px-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
              <div className="text-sm text-gray-600">Completed</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
            </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">In Progress</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.pending + stats.inProgress}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
              <div className="text-sm text-gray-600">Issues</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.failed + stats.requiresInfo}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
              <div className="text-sm text-gray-600">Trust Score</div>
                  <div className="text-2xl font-bold text-blue-600">{totalTrustScore}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveMainTab('initiate')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Plus className="h-5 w-5 text-blue-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Start New Verification</div>
                  <div className="text-sm text-gray-500">Initiate a new verification process</div>
              </div>
              </button>
              <button 
                onClick={() => setActiveMainTab('verifications')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <Eye className="h-5 w-5 text-green-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">View All Verifications</div>
                  <div className="text-sm text-gray-500">Monitor all verification activities</div>
                </div>
              </button>
              <button 
                onClick={() => setActiveMainTab('analytics')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-500">Track performance and insights</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {verificationRecords.slice(0, 5).map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(verification.category)}
                    <div>
                      <div className="font-medium text-gray-900">{verification.title}</div>
                      <div className="text-sm text-gray-500">{verification.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                      {getStatusIcon(verification.status)}
                      <span className="ml-1">{verification.status.replace('_', ' ').toUpperCase()}</span>
                    </span>
                    <button 
                      onClick={() => handleViewVerification(verification)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      ) : activeMainTab === 'verifications' ? (
        <div className="px-6 space-y-6">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    placeholder="Search verifications..." 
                    className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64" 
                  />
                </div>
                <select 
                  value={statusFilter} 
                  onChange={e => setStatusFilter(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="not_started">Not Started</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="expired">Expired</option>
                  <option value="failed">Failed</option>
                  <option value="requires_info">Requires Info</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select 
                  value={categoryFilter} 
                  onChange={e => setCategoryFilter(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="identity">Identity</option>
                  <option value="financial">Financial</option>
                  <option value="employment">Employment</option>
                  <option value="education">Education</option>
                  <option value="biometric">Biometric</option>
                  <option value="business">Business</option>
                  <option value="government">Government</option>
                </select>
                <select 
                  value={priorityFilter} 
                  onChange={e => setPriorityFilter(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
          <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Verifications Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trust Impact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVerifications.map((verification) => (
                    <tr key={verification.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getCategoryIcon(verification.category)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{verification.title}</div>
                            <div className="text-sm text-gray-500">{verification.description}</div>
                          </div>
                        </div>
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {verification.category.charAt(0).toUpperCase() + verification.category.slice(1)}
                        </span>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                          {getStatusIcon(verification.status)}
                          <span className="ml-1">{verification.status.replace('_', ' ').toUpperCase()}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}>
                          {verification.priority.charAt(0).toUpperCase() + verification.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {verification.progress ? (
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${verification.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{verification.progress}%</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${verification.trustScoreImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {verification.trustScoreImpact >= 0 ? '+' : ''}{verification.trustScoreImpact}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleViewVerification(verification)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {verification.status === 'not_started' && (
                            <button 
                              onClick={() => handleInitiateVerification(verification.type)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          )}
                          {verification.status === 'requires_info' && (
                            <button 
                              onClick={() => handleResolveIssue(verification)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </button>
                          )}
                          {verification.status === 'expired' && (
                            <button 
                              onClick={() => handleRenewVerification(verification)}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
                  </div>
      ) : activeMainTab === 'initiate' ? (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Initiate New Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verificationRecords.filter(v => v.status === 'not_started').map((verification) => (
                <div key={verification.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3 mb-4">
                    {getCategoryIcon(verification.category)}
                    <div>
                      <h4 className="font-medium text-gray-900">{verification.title}</h4>
                      <p className="text-sm text-gray-500">{verification.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}>
                        {verification.priority.charAt(0).toUpperCase() + verification.priority.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Trust Impact:</span>
                      <span className="font-medium text-gray-900">+{verification.trustScoreImpact}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium text-gray-900">₦{verification.cost}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleInitiateVerification(verification.type)}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start Verification
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeMainTab === 'analytics' ? (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Verification Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Status Distribution</h4>
                <div className="space-y-3">
                  {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Trust Score Trend</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{totalTrustScore}</div>
                  <div className="text-sm text-gray-500">Total Trust Score Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Verification Details Modal */}
      {showVerificationModal && selectedVerification && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedVerification.title}</h3>
                <button 
                  onClick={() => setShowVerificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedVerification.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedVerification.status)}`}>
                      {getStatusIcon(selectedVerification.status)}
                      <span className="ml-1">{selectedVerification.status.replace('_', ' ').toUpperCase()}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedVerification.priority)}`}>
                      {selectedVerification.priority.charAt(0).toUpperCase() + selectedVerification.priority.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <span className="text-sm text-gray-900">{selectedVerification.category.charAt(0).toUpperCase() + selectedVerification.category.slice(1)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trust Score Impact</label>
                    <span className={`text-sm font-medium ${selectedVerification.trustScoreImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedVerification.trustScoreImpact >= 0 ? '+' : ''}{selectedVerification.trustScoreImpact}
                    </span>
                  </div>
                </div>
                {selectedVerification.issues && selectedVerification.issues.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issues</label>
                    <ul className="mt-1 text-sm text-red-600">
                      {selectedVerification.issues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
            </div>
          )}

                {/* Show collected verification data if available */}
                {(() => {
                  const completedData = completedVerificationData[selectedVerification.type]
                  console.log('Modal Debug:', {
                    verificationType: selectedVerification.type,
                    completedData,
                    allCompletedData: completedVerificationData
                  })
                  
                  if (completedData && completedData.formData) {
                    return (
                      <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Verification Details</label>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          {completedData.type === 'frsc-verification' && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-sm font-medium text-gray-600">License Number:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.licenseNumber}</span>
        </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">License Type:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.licenseType}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Full Name:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.fullName}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.dateOfBirth}</span>
                                </div>
                              </div>
                            </>
                          )}
                          
                          {completedData.type === 'bvn-verification' && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-sm font-medium text-gray-600">BVN Number:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.bvnNumber}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Bank Name:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.bankName}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Account Number:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.accountNumber}</span>
                                </div>
                              </div>
                            </>
                          )}

                          {completedData.type === 'nin-verification' && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-sm font-medium text-gray-600">NIN Number:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.ninNumber}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Full Name:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.fullName}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.dateOfBirth}</span>
                                </div>
                              </div>
                            </>
                          )}

                          {completedData.type === 'passport-verification' && (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Passport Number:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.passportNumber}</span>
                                  </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Full Name:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.fullName}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.dateOfBirth}</span>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-600">Expiry Date:</span>
                                  <span className="ml-2 text-sm text-gray-900">{completedData.formData.expiryDate}</span>
                                </div>
                              </div>
                            </>
                          )}

                          {completedData.type === 'facial-verification' && (
                            <div className="text-center">
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Facial verification completed
                              </div>
                            </div>
                          )}

                          {completedData.type === 'fingerprint-verification' && (
                            <div className="text-center">
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-green-100 text-green-800">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Fingerprint verification completed
                              </div>
                            </div>
                          )}

                          {completedData.completedAt && (
                            <div className="text-center pt-2 border-t">
                              <span className="text-xs text-gray-500">
                                Completed on: {new Date(completedData.completedAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }
                  
                  // Show debug info when no data is found
                  return (
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Debug Info</label>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Verification Type:</strong> {selectedVerification.type}
                        </p>
                        <p className="text-sm text-yellow-800">
                          <strong>Available Keys:</strong> {Object.keys(completedVerificationData).join(', ') || 'None'}
                        </p>
                        <p className="text-sm text-yellow-800">
                          <strong>Status:</strong> {selectedVerification.status}
                        </p>
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> This verification may not have been completed through the Biobank flow yet.
                        </p>
                      </div>
                    </div>
                  )
                })()}
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    onClick={() => setShowVerificationModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {selectedVerification.status === 'not_started' && (
                    <button 
                      onClick={() => {
                        handleInitiateVerification(selectedVerification.type)
                        setShowVerificationModal(false)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Start Verification
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Verification Flow Modal */}
      {showSystemVerification && selectedSystemRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Self-Initiated {selectedSystemRequest.title} Verification</h3>
                <button 
                  onClick={() => setShowSystemVerification(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <SelfInitiatedSystemVerification
                request={selectedSystemRequest}
                onComplete={handleSystemVerificationComplete}
                onClose={() => setShowSystemVerification(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Attester Verification Flow Modal */}
      {showAttesterVerification && selectedAttesterRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Self-Initiated {selectedAttesterRequest.title} Verification</h3>
                <button 
                  onClick={() => setShowAttesterVerification(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <SelfInitiatedAttesterVerification
                request={selectedAttesterRequest}
                onComplete={handleAttesterVerificationComplete}
                onClose={() => setShowAttesterVerification(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Biobank
