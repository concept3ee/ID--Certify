import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { IndividualUser, VerificationRequest } from '../../types'
import VerificationResponseForm from '../../components/verification/VerificationResponseForm'
import SystemVerificationFlow from '../../components/verification/SystemVerificationFlow'
import AttesterVerificationFlow from '../../components/verification/AttesterVerificationFlow'

import { 
  CheckCircle, 
  Plus,
  Eye,
  Search,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Building,
  FileText
} from 'lucide-react'
import SectionNav from '../../components/ui/SectionNav'

const VerificationDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  
  // Check if user exists
  if (!user) {
    return <div>Loading...</div>
  }

  const individualUser = user as IndividualUser

  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)
  const [showResponseForm, setShowResponseForm] = useState(false)
  const [showViewDetails, setShowViewDetails] = useState(false)
  const [activeTab, setActiveTab] = useState<'requests' | 'history'>('requests')
  const [activeStatusTab, setActiveStatusTab] = useState<'action_required' | 'in_progress' | 'assigned' | 'in_review' | 'completed' | 'failed-expired' | 'cancelled'>('action_required')
  const [showSystemVerification, setShowSystemVerification] = useState(false)
  const [showAttesterVerification, setShowAttesterVerification] = useState(false)
  const [selectedSystemRequest, setSelectedSystemRequest] = useState<any>(null)
  const [selectedAttesterRequest, setSelectedAttesterRequest] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null)
  const [showHistoryDetails, setShowHistoryDetails] = useState(false)


  // Mock data - in real app this would come from API
  const mockVerificationRequests: VerificationRequest[] = [
    {
      id: 'req-001',
      requesterId: 'org-001',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'pending',
      type: 'bvn-verification',
      requestedData: [
        { field: 'fullName', label: 'Full Name', type: 'text', required: true, description: 'Your full legal name' },
        { field: 'bvn', label: 'Bank Verification Number', type: 'text', required: true, description: 'Enter your 11-digit BVN' },
        { field: 'bankDetails', label: 'Bank Account Details', type: 'text', required: true, description: 'Your bank account number and bank name' }
      ],
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cost: 25.00
    },
    {
      id: 'req-002',
      requesterId: 'org-002',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'completed',
      type: 'nin-verification',
      requestedData: [
        { field: 'nin', label: 'National Identity Number', type: 'text', required: true, description: 'Enter your 11-digit NIN' },
        { field: 'idCard', label: 'NIN ID Card', type: 'file', required: true, description: 'Upload your NIN ID card' }
      ],
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 20.00,
      result: {
        isVerified: true,
        confidence: 95,
        details: { ninVerified: true, quality: 'excellent' },
        trustScoreImpact: 15
      }
    },
    {
      id: 'req-003',
      requesterId: 'org-003',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'failed',
      type: 'employment-verification',
      requestedData: [
        { field: 'employmentLetter', label: 'Employment Letter', type: 'file', required: true, description: 'Upload your employment letter' },
        { field: 'payslips', label: 'Recent Payslips', type: 'file', required: true, description: 'Upload your last 3 months payslips' },
        { field: 'employerDetails', label: 'Employer Details', type: 'text', required: true, description: 'Your employer\'s name and contact information' }
      ],
      expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 30.00,
      result: {
        isVerified: false,
        confidence: 0,
        details: { error: 'Document quality insufficient' },
        errors: ['Employment letter image too blurry', 'Missing employer contact information']
      }
    },
    {
      id: 'req-004',
      requesterId: 'org-004',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'in_progress',
      type: 'education-verification',
      requestedData: [
        { field: 'degreeCertificate', label: 'Degree Certificate', type: 'file', required: true, description: 'Upload your degree certificate' },
        { field: 'transcript', label: 'Academic Transcript', type: 'file', required: true, description: 'Upload your academic transcript' },
        { field: 'institutionDetails', label: 'Institution Details', type: 'text', required: true, description: 'Your educational institution name and address' }
      ],
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      cost: 35.00
    },
    {
      id: 'req-005',
      requesterId: 'org-005',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'expired',
      type: 'address-verification',
      requestedData: [
        { field: 'utilityBill', label: 'Utility Bill', type: 'file', required: true, description: 'Recent utility bill for address verification' },
        { field: 'bankStatement', label: 'Bank Statement', type: 'file', required: true, description: 'Recent bank statement for financial verification' },
        { field: 'rentalAgreement', label: 'Rental Agreement', type: 'file', required: false, description: 'Your rental agreement if applicable' }
      ],
      expiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 30.00
    },
    {
      id: 'req-006',
      requesterId: 'org-006',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'completed',
      type: 'facial-verification',
      requestedData: [
        { field: 'facialRecognition', label: 'Facial Recognition', type: 'file', required: true, description: 'Upload a clear photo for facial recognition' },
        { field: 'voiceSample', label: 'Voice Sample', type: 'file', required: true, description: 'Record a voice sample for voice biometrics' },
        { field: 'livenessCheck', label: 'Liveness Check', type: 'file', required: true, description: 'Complete the liveness detection test' }
      ],
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 40.00,
      result: {
        isVerified: true,
        confidence: 98,
        details: { facialMatch: true, voiceMatch: true, livenessVerified: true, quality: 'excellent' },
        trustScoreImpact: 20
      }
    },
    {
      id: 'req-007',
      requesterId: 'org-007',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'pending',
      type: 'income-verification',
      requestedData: [
        { field: 'payslips', label: 'Recent Payslips', type: 'file', required: true, description: 'Upload your last 6 months payslips' },
        { field: 'bankStatements', label: 'Bank Statements', type: 'file', required: true, description: 'Your last 3 months bank statements' },
        { field: 'taxReturns', label: 'Tax Returns', type: 'file', required: true, description: 'Your last 2 years tax returns' }
      ],
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cost: 45.00
    },
    {
      id: 'req-008',
      requesterId: 'org-008',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'in_progress',
      type: 'reference-verification',
      requestedData: [
        { field: 'referenceContacts', label: 'Reference Contacts', type: 'text', required: true, description: 'Provide contact details for 3 professional references' },
        { field: 'relationshipDetails', label: 'Relationship Details', type: 'text', required: true, description: 'Describe your professional relationship with each reference' },
        { field: 'referenceLetters', label: 'Reference Letters', type: 'file', required: false, description: 'Upload any existing reference letters' }
      ],
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      cost: 50.00
    },
    {
      id: 'req-009',
      requesterId: 'org-009',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'pending',
      type: 'fingerprint-verification',
      requestedData: [
        { field: 'fingerprintScan', label: 'Fingerprint Scan', type: 'file', required: true, description: 'Upload your fingerprint scan for biometric verification' },
        { field: 'handGeometry', label: 'Hand Geometry', type: 'file', required: true, description: 'Record your hand geometry measurements' },
        { field: 'biometricConsent', label: 'Biometric Consent', type: 'boolean', required: true, description: 'Confirm your consent for biometric data processing' }
      ],
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cost: 60.00
    },
    {
      id: 'req-010',
      requesterId: 'org-010',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'completed',
      type: 'business-verification',
      requestedData: [
        { field: 'businessRegistration', label: 'Business Registration', type: 'file', required: true, description: 'Upload your business registration certificate' },
        { field: 'taxCertificates', label: 'Tax Certificates', type: 'file', required: true, description: 'Your business tax certificates and compliance documents' },
        { field: 'financialStatements', label: 'Financial Statements', type: 'file', required: true, description: 'Your business financial statements for the last 2 years' }
      ],
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 25.00,
      result: {
        isVerified: true,
        confidence: 92,
        details: { businessVerified: true, complianceConfirmed: true },
        trustScoreImpact: 25
      }
    },
    {
      id: 'req-011',
      requesterId: 'org-011',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'assigned',
      type: 'frsc-verification',
      requestedData: [
        { field: 'driversLicense', label: 'Driver\'s License', type: 'file', required: true, description: 'Upload your driver\'s license' },
        { field: 'vehicleRegistration', label: 'Vehicle Registration', type: 'file', required: true, description: 'Upload your vehicle registration document' }
      ],
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 35.00
    },
    {
      id: 'req-012',
      requesterId: 'org-012',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'in_review',
      type: 'immigration-verification',
      requestedData: [
        { field: 'passport', label: 'Passport', type: 'file', required: true, description: 'Upload your passport' },
        { field: 'visa', label: 'Visa Documents', type: 'file', required: true, description: 'Upload your visa documents' }
      ],
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      cost: 45.00
    },
    {
      id: 'req-013',
      requesterId: 'org-013',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'requires_info',
      type: 'cac-verification',
      requestedData: [
        { field: 'cacCertificate', label: 'CAC Certificate', type: 'file', required: true, description: 'Upload your CAC certificate' },
        { field: 'businessDetails', label: 'Business Details', type: 'text', required: true, description: 'Provide your business details' }
      ],
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      cost: 40.00
    },
    {
      id: 'req-014',
      requesterId: 'org-014',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'cancelled',
      type: 'firs-verification',
      requestedData: [
        { field: 'taxClearance', label: 'Tax Clearance Certificate', type: 'file', required: true, description: 'Upload your tax clearance certificate' },
        { field: 'taxReturns', label: 'Tax Returns', type: 'file', required: true, description: 'Upload your tax returns' }
      ],
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 30.00
    }
  ]





  // Organization names mapping
  const organizationNames: Record<string, string> = {
    'org-001': 'TechCorp Solutions',
    'org-002': 'FinanceFirst Ltd',
    'org-003': 'HealthCare Partners',
    'org-004': 'EduTech Academy',
    'org-005': 'GreenEnergy Corp',
    'org-006': 'SecureBank International',
    'org-007': 'EduTech Academy',
    'org-008': 'FinanceFirst Ltd',
    'org-009': 'BioTech Innovations',
    'org-010': 'Digital Identity Corp'
  }

  // Mock verification history data
  const mockVerificationHistory = [
    {
      id: 'hist-001',
      type: 'bvn-verification',
      title: 'BVN Verification',
      status: 'completed',
      initiatedBy: 'self',
      dateInitiated: '2025-08-15T10:00:00Z',
      dateCompleted: '2025-08-15T10:05:00Z',
      cost: 25.00,
      trustScoreImpact: 15,
      verificationMethod: 'system',
      result: {
        isVerified: true,
        confidence: 98,
        details: { bvnVerified: true, identityConfirmed: true }
      }
    },
    {
      id: 'hist-002',
      type: 'employment-verification',
      title: 'Employment Verification',
      status: 'completed',
      initiatedBy: 'organization',
      organizationName: 'TechCorp Solutions',
      dateInitiated: '2025-08-10T09:00:00Z',
      dateCompleted: '2025-08-12T14:30:00Z',
      cost: 35.00,
      trustScoreImpact: 20,
      verificationMethod: 'attester',
      result: {
        isVerified: true,
        confidence: 95,
        details: { employmentConfirmed: true, datesVerified: true }
      }
    },
    {
      id: 'hist-003',
      type: 'education-verification',
      title: 'Education Verification',
      status: 'failed',
      initiatedBy: 'self',
      dateInitiated: '2025-08-05T11:00:00Z',
      dateCompleted: '2025-08-07T16:00:00Z',
      cost: 30.00,
      verificationMethod: 'attester',
      result: {
        isVerified: false,
        confidence: 0,
        details: { educationUnverified: true },
        errors: ['Document authenticity could not be confirmed', 'Institution records mismatch']
      }
    },
    {
      id: 'hist-004',
      type: 'facial-verification',
      title: 'Facial Recognition',
      status: 'completed',
      initiatedBy: 'organization',
      organizationName: 'SecureBank Ltd',
      dateInitiated: '2025-07-28T13:00:00Z',
      dateCompleted: '2025-07-28T13:03:00Z',
      cost: 20.00,
      trustScoreImpact: 10,
      verificationMethod: 'system',
      result: {
        isVerified: true,
        confidence: 99,
        details: { facialMatch: true, livenessDetected: true }
      }
    },
    {
      id: 'hist-005',
      type: 'business-verification',
      title: 'Business Verification',
      status: 'expired',
      initiatedBy: 'self',
      dateInitiated: '2025-07-20T10:00:00Z',
      cost: 45.00,
      verificationMethod: 'attester'
    },
    {
      id: 'hist-006',
      type: 'income-verification',
      title: 'Income Verification',
      status: 'cancelled',
      initiatedBy: 'organization',
      organizationName: 'LoanCorp Financial',
      dateInitiated: '2025-07-15T14:00:00Z',
      cost: 40.00,
      verificationMethod: 'attester'
    }
  ]

  const pendingRequests = mockVerificationRequests.filter(req => req.status === 'pending')
  const completedRequests = mockVerificationRequests.filter(req => req.status === 'completed')
  const expiredRequests = mockVerificationRequests.filter(req => req.status === 'expired')

  const filteredRequests = getFilteredRequests()

  const handleRespondToRequest = (requestId: string) => {
    const request = mockVerificationRequests.find(req => req.id === requestId)
    if (request) {
      setSelectedRequest(request)
      setShowResponseForm(true)
    }
  }

  const handleViewRequestDetails = (requestId: string) => {
    const request = mockVerificationRequests.find(req => req.id === requestId)
    if (request) {
      setSelectedRequest(request)
      setShowViewDetails(true)
    }
  }

  const handleSubmitResponse = async (requestId: string, responses: Record<string, any>) => {
    console.log('Submitting response for request:', requestId, responses)
    setShowResponseForm(false)
    setSelectedRequest(null)
  }

  const handleCompleteVerification = (request: VerificationRequest) => {
    // Determine which verification flow to open based on the type
    const systemVerificationTypes = [
      'bvn-verification', 'nin-verification', 'facial-verification', 'fingerprint-verification'
    ]
    
    if (systemVerificationTypes.includes(request.type)) {
      // Convert to system verification format
      const systemRequest = {
        id: request.id,
        type: request.type.replace('-verification', ''),
        title: getVerificationTypeDisplay(request.type),
        description: `Complete your ${getVerificationTypeDisplay(request.type).toLowerCase()}`,
        requestingOrganization: organizationNames[request.requesterId] || 'Unknown Organization',
        expiryDate: request.expiryDate,
        status: 'pending',
        trustScoreImpact: 25,
        estimatedTime: '2-5 minutes',
        icon: CheckCircle // Default icon
      }
      setSelectedSystemRequest(systemRequest)
      setShowSystemVerification(true)
    } else {
      // Convert to attester verification format
      const attesterRequest = {
        id: request.id,
        type: request.type,
        title: getVerificationTypeDisplay(request.type),
        description: `Complete your ${getVerificationTypeDisplay(request.type).toLowerCase()}`,
        requestingOrganization: organizationNames[request.requesterId] || 'Unknown Organization',
        expiryDate: request.expiryDate,
        status: 'pending',
        trustScoreImpact: 30,
        estimatedTime: '3-7 business days',
        requiredDocuments: request.requestedData.map(d => d.label),
        priority: 'high' as const
      }
      setSelectedAttesterRequest(attesterRequest)
      setShowAttesterVerification(true)
    }
  }

  function getFilteredRequests() {
    switch (activeStatusTab) {
      case 'action_required':
        return mockVerificationRequests.filter(req => req.status === 'pending' || req.status === 'requires_info')
      case 'in_progress':
        return mockVerificationRequests.filter(req => req.status === 'in_progress')
      case 'assigned':
        return mockVerificationRequests.filter(req => req.status === 'assigned')
      case 'in_review':
        return mockVerificationRequests.filter(req => req.status === 'in_review')
      case 'completed':
        return mockVerificationRequests.filter(req => req.status === 'completed')
      case 'failed-expired':
        return mockVerificationRequests.filter(req => req.status === 'failed' || req.status === 'expired')
      case 'cancelled':
        return mockVerificationRequests.filter(req => req.status === 'cancelled')
      default:
        return mockVerificationRequests
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[date.getMonth()]
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}-${day}-${year}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'assigned':
        return 'bg-purple-100 text-purple-800'
      case 'in_review':
        return 'bg-orange-100 text-orange-800'
      case 'requires_info':
        return 'bg-amber-100 text-amber-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'NEW'
      case 'in_progress':
        return 'IN PROGRESS'
      case 'assigned':
        return 'ASSIGNED'
      case 'in_review':
        return 'IN REVIEW'
      case 'requires_info':
        return 'REQUIRES INFO'
      case 'completed':
        return 'COMPLETED'
      case 'failed':
        return 'FAILED'
      case 'expired':
        return 'EXPIRED'
      case 'cancelled':
        return 'CANCELLED'
      default:
        return status.toUpperCase()
    }
  }

  const getVerificationTypeDisplay = (type: string) => {
    switch (type) {
      case 'bvn-verification':
        return 'BVN Verification'
      case 'nin-verification':
        return 'NIN Verification'
      case 'employment-verification':
        return 'Employment Verification'
      case 'education-verification':
        return 'Education Verification'
      case 'address-verification':
        return 'Address Verification'
      case 'income-verification':
        return 'Income Verification'
      case 'reference-verification':
        return 'Reference Verification'
      case 'business-verification':
        return 'Business Verification'
      case 'facial-verification':
        return 'Facial Recognition'
      case 'fingerprint-verification':
        return 'Fingerprint Verification'
      case 'frsc-verification':
        return 'FRSC Verification'
      case 'immigration-verification':
        return 'Immigration Verification'
      case 'cac-verification':
        return 'CAC Verification'
      case 'firs-verification':
        return 'FIRS Verification'
      default:
        return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
    }
  }

  // Helper functions for verification history
  const getHistoryStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-slate-100 text-slate-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getHistoryStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'expired': return <Clock className="w-4 h-4" />
      case 'cancelled': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getFilteredHistory = () => {
    let filtered = mockVerificationHistory

    // Filter by initiation type
    if (statusFilter === 'self') {
      filtered = filtered.filter(item => item.initiatedBy === 'self')
    } else if (statusFilter === 'organization') {
      filtered = filtered.filter(item => item.initiatedBy === 'organization')
    }

    // Filter by status
    if (historyStatusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === historyStatusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.organizationName && item.organizationName.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return filtered
  }

  const getHistoryStats = () => {
    const all = mockVerificationHistory.length
    const completed = mockVerificationHistory.filter(item => item.status === 'completed').length
    const failed = mockVerificationHistory.filter(item => item.status === 'failed').length
    const totalCost = mockVerificationHistory.reduce((sum, item) => sum + item.cost, 0)
    
    return { all, completed, failed, totalCost }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Navigation - Full Width */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-semibold text-gray-900">Verification Dashboard</h1>
                
                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setActiveTab('requests')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'requests'
                        ? 'text-gray-900 bg-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Verification Requests
                  </button>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'history'
                        ? 'text-gray-900 bg-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Verification History
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => window.location.href = '/individual/biobank'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Start Verification</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content - With Horizontal Margins */}
        <div className="px-6 mt-6 mb-6">
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Status Tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit overflow-x-auto">
                      <button 
                        onClick={() => setActiveStatusTab('action_required')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          activeStatusTab === 'action_required'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Action Required
                      </button>
                      <button 
                        onClick={() => setActiveStatusTab('in_progress')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          activeStatusTab === 'in_progress'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        In Progress
                      </button>
                      <button 
                        onClick={() => setActiveStatusTab('assigned')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          activeStatusTab === 'assigned'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Assigned
                      </button>
                      <button 
                        onClick={() => setActiveStatusTab('in_review')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          activeStatusTab === 'in_review'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        In Review
                      </button>
                      <button 
                        onClick={() => setActiveStatusTab('completed')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          activeStatusTab === 'completed'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Completed
                      </button>
                      <button 
                        onClick={() => setActiveStatusTab('failed-expired')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          activeStatusTab === 'failed-expired'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Failed/Expired
                      </button>
                      <button 
                        onClick={() => setActiveStatusTab('cancelled')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          activeStatusTab === 'cancelled'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Cancelled
                      </button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-2xl font-bold text-blue-600">
                          {mockVerificationRequests.filter(req => req.status === 'pending' || req.status === 'requires_info').length}
                        </div>
                        <div className="text-sm text-gray-600">Action Required</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-2xl font-bold text-yellow-600">
                          {mockVerificationRequests.filter(req => req.status === 'in_progress').length}
                        </div>
                        <div className="text-sm text-gray-600">In Progress</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-2xl font-bold text-green-600">
                          {mockVerificationRequests.filter(req => req.status === 'completed').length}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="text-2xl font-bold text-red-600">
                          {mockVerificationRequests.filter(req => req.status === 'failed' || req.status === 'expired').length}
                        </div>
                        <div className="text-sm text-gray-600">Failed/Expired</div>
                      </div>
                    </div>

                    {/* Verification Requests Table */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                      <div className="p-4">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Organization
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Verification Type
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Expiry Date
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cost
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {getFilteredRequests().map((request) => {
                              return (
                                <tr key={request.id} className="hover:bg-gray-50">
                                  <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                      {organizationNames[request.requesterId] || 'Unknown Organization'}
                                    </div>
                                  </td>
                                  <td className="py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {getVerificationTypeDisplay(request.type)}
                                    </div>
                                  </td>
                                  <td className="py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                      {getStatusText(request.status)}
                                    </span>
                                  </td>
                                  <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(request.expiryDate)}
                                  </td>
                                  <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(request.createdAt)}
                                  </td>
                                  <td className="py-4 whitespace-nowrap text-sm font-medium">
                                    {activeStatusTab === 'action_required' && (
                                      <button 
                                        onClick={() => handleCompleteVerification(request)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        title="Complete Verification"
                                      >
                                        Complete Verification
                                      </button>
                                    )}
                                    {activeStatusTab !== 'action_required' && (
                                      <button 
                                        onClick={() => handleViewRequestDetails(request.id)}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        title="View Details"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>

                      {getFilteredRequests().length === 0 && (
                        <div className="text-center py-12">
                          <CheckCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeStatusTab.replace('-', '/')} requests</h3>
                          <p className="text-gray-500">
                            {activeStatusTab === 'action_required' && "You don't have any verification requests requiring action."}
                            {activeStatusTab === 'in_progress' && "You don't have any in-progress verification requests."}
                            {activeStatusTab === 'completed' && "You don't have any completed verification requests."}
                            {activeStatusTab === 'failed-expired' && "You don't have any failed or expired verification requests."}
                            {activeStatusTab === 'cancelled' && "You don't have any cancelled verification requests."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6">
                  <div className="space-y-6">
                    {/* History Navigation Tabs */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
                      <button 
                        onClick={() => setStatusFilter('all')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          statusFilter === 'all'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        All Verifications ({mockVerificationHistory.length})
                      </button>
                      <button 
                        onClick={() => setStatusFilter('self')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          statusFilter === 'self'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Self-Initiated ({mockVerificationHistory.filter(item => item.initiatedBy === 'self').length})
                      </button>
                      <button 
                        onClick={() => setStatusFilter('organization')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          statusFilter === 'organization'
                            ? 'text-gray-900 bg-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Organization Requests ({mockVerificationHistory.filter(item => item.initiatedBy === 'organization').length})
                      </button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {(() => {
                        const stats = getHistoryStats()
                        return (
                          <>
                            <div className="bg-white p-4 rounded-lg border">
                              <div className="text-2xl font-bold text-blue-600">{stats.all}</div>
                              <div className="text-sm text-gray-600">Total Verifications</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border">
                              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                              <div className="text-sm text-gray-600">Completed</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border">
                              <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                              <div className="text-sm text-gray-600">Failed</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border">
                              <div className="text-2xl font-bold text-purple-600">${stats.totalCost.toFixed(2)}</div>
                              <div className="text-sm text-gray-600">Total Spent</div>
                            </div>
                          </>
                        )
                      })()}
                    </div>

                    {/* Filters and Search */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search verifications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                          />
                        </div>
                        <select
                          value={historyStatusFilter}
                          onChange={(e) => setHistoryStatusFilter(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">All Statuses</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                          <option value="expired">Expired</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Verification History Table */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                      <div className="p-4">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Verification Details
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Initiated By
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cost
                              </th>
                              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {getFilteredHistory().map((item) => (
                              <tr key={item.id} className="hover:bg-gray-50">
                                <td className="py-4">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                    <div className="text-sm text-gray-500">{item.verificationMethod === 'system' ? 'System Verification' : 'Attester Verification'}</div>
                                  </div>
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    {item.initiatedBy === 'self' ? (
                                      <>
                                        <User className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-gray-900">Self</span>
                                      </>
                                    ) : (
                                      <>
                                        <Building className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-900">{item.organizationName}</span>
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{formatDate(item.dateInitiated)}</div>
                                  {item.dateCompleted && (
                                    <div className="text-xs text-gray-500">Completed: {formatDate(item.dateCompleted)}</div>
                                  )}
                                </td>
                                <td className="py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHistoryStatusColor(item.status)}`}>
                                    {getHistoryStatusIcon(item.status)}
                                    <span className="ml-1">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                                  </span>
                                </td>
                                <td className="py-4 whitespace-nowrap text-sm text-gray-900">
                                  ${item.cost.toFixed(2)}
                                </td>
                                <td className="py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => {
                                      setSelectedHistoryItem(item)
                                      setShowHistoryDetails(true)
                                    }}
                                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {getFilteredHistory().length === 0 && (
                          <div className="text-center py-12">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No verification history found</h3>
                            <p className="text-gray-500">
                              {searchQuery || statusFilter !== 'all' 
                                ? "Try adjusting your search or filter criteria."
                                : "You haven't completed any verifications yet."
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Response Form Modal */}
      {showResponseForm && selectedRequest && (
        <VerificationResponseForm
          request={selectedRequest}
          onSubmit={handleSubmitResponse}
          onCancel={() => {
            setShowResponseForm(false)
            setSelectedRequest(null)
          }}
        />
      )}

      {/* System Verification Flow Modal */}
      {showSystemVerification && selectedSystemRequest && (
        <SystemVerificationFlow
          request={selectedSystemRequest}
          onComplete={(result) => {
            console.log('System verification completed:', result)
            setShowSystemVerification(false)
            setSelectedSystemRequest(null)
            // Refresh your verification requests here
          }}
          onClose={() => {
            setShowSystemVerification(false)
            setSelectedSystemRequest(null)
          }}
        />
      )}

      {/* Attester Verification Flow Modal */}
      {showAttesterVerification && selectedAttesterRequest && (
        <AttesterVerificationFlow
          request={selectedAttesterRequest}
          onComplete={(result) => {
            console.log('Attester verification completed:', result)
            setShowAttesterVerification(false)
            setSelectedAttesterRequest(null)
            // Refresh your verification requests here
          }}
          onClose={() => {
            setShowAttesterVerification(false)
            setSelectedAttesterRequest(null)
          }}
        />
      )}

      {/* Verification History Details Modal */}
      {showHistoryDetails && selectedHistoryItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Verification Details
                </h3>
                <button
                  onClick={() => {
                    setShowHistoryDetails(false)
                    setSelectedHistoryItem(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedHistoryItem.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHistoryStatusColor(selectedHistoryItem.status)}`}>
                      {getHistoryStatusIcon(selectedHistoryItem.status)}
                      <span className="ml-1">{selectedHistoryItem.status.charAt(0).toUpperCase() + selectedHistoryItem.status.slice(1)}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Initiated By</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedHistoryItem.initiatedBy === 'self' ? 'Self' : selectedHistoryItem.organizationName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Method</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedHistoryItem.verificationMethod === 'system' ? 'System Verification' : 'Attester Verification'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Initiated</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedHistoryItem.dateInitiated)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cost</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedHistoryItem.cost.toFixed(2)}</p>
                  </div>
                </div>

                {selectedHistoryItem.dateCompleted && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Completed</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedHistoryItem.dateCompleted)}</p>
                  </div>
                )}

                {selectedHistoryItem.trustScoreImpact && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trust Score Impact</label>
                    <p className="mt-1 text-sm text-gray-900">+{selectedHistoryItem.trustScoreImpact}</p>
                  </div>
                )}

                {selectedHistoryItem.result && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Result</label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Status</label>
                          <p className="text-sm text-gray-900">
                            {selectedHistoryItem.result.isVerified ? 'Verified' : 'Not Verified'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Confidence</label>
                          <p className="text-sm text-gray-900">{selectedHistoryItem.result.confidence}%</p>
                        </div>
                      </div>
                      {selectedHistoryItem.result.errors && selectedHistoryItem.result.errors.length > 0 && (
                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Errors</label>
                          <ul className="text-sm text-red-600 space-y-1">
                            {selectedHistoryItem.result.errors.map((error: string, index: number) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setShowHistoryDetails(false)
                    setSelectedHistoryItem(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewDetails && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Verification Request Details
                </h3>
                <button
                  onClick={() => {
                    setShowViewDetails(false)
                    setSelectedRequest(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Organization</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {organizationNames[selectedRequest.requesterId] || 'Unknown Organization'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification Type</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {getVerificationTypeDisplay(selectedRequest.type)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {getStatusText(selectedRequest.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cost</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedRequest.cost?.toFixed(2) || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Initiated</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRequest.expiryDate)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Information</label>
                  <div className="space-y-2">
                    {selectedRequest.requestedData.map((field, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{field.label}</p>
                          <p className="text-xs text-gray-500">{field.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          field.required 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {field.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedRequest.result && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Result</label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Status</label>
                          <p className="text-sm text-gray-900">
                            {selectedRequest.result.isVerified ? 'Verified' : 'Not Verified'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Confidence</label>
                          <p className="text-sm text-gray-900">{selectedRequest.result.confidence}%</p>
                        </div>
                        {selectedRequest.result.trustScoreImpact && (
                          <div>
                            <label className="block text-xs font-medium text-gray-500">Trust Score Impact</label>
                            <p className="text-sm text-gray-900">+{selectedRequest.result.trustScoreImpact}</p>
                          </div>
                        )}
                      </div>
                      {selectedRequest.result.errors && selectedRequest.result.errors.length > 0 && (
                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Errors</label>
                          <ul className="text-sm text-red-600 space-y-1">
                            {selectedRequest.result.errors.map((error, index) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowViewDetails(false)
                    setSelectedRequest(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedRequest.status === 'pending' && (
                  <button
                    onClick={() => {
                      setShowViewDetails(false)
                      handleCompleteVerification(selectedRequest)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Complete Verification
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default VerificationDashboard
