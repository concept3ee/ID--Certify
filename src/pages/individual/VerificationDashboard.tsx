import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { IndividualUser, VerificationRequest } from '../../types'
import VerificationResponseForm from '../../components/verification/VerificationResponseForm'
import SystemVerificationFlow from '../../components/verification/SystemVerificationFlow'
import AttesterVerificationFlow from '../../components/verification/AttesterVerificationFlow'
import { 
  Shield, 
  Users, 
  Fingerprint, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Eye,
  UserPlus,
  Search,
  CreditCard,
  Building,
  FileText,
  UserCheck,
  Car
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
  const [activeStatusTab, setActiveStatusTab] = useState<'new' | 'pending' | 'completed' | 'failed-expired'>('new')
  const [showSystemVerification, setShowSystemVerification] = useState(false)
  const [showAttesterVerification, setShowAttesterVerification] = useState(false)
  const [selectedVerificationType, setSelectedVerificationType] = useState<'system' | 'attester' | null>(null)
  const [selectedSystemRequest, setSelectedSystemRequest] = useState<any>(null)
  const [selectedAttesterRequest, setSelectedAttesterRequest] = useState<any>(null)

  // Mock data - in real app this would come from API
  const mockVerificationRequests: VerificationRequest[] = [
    {
      id: 'req-001',
      requesterId: 'org-001',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'pending',
      type: 'document',
      requestedData: [
        { field: 'fullName', label: 'Full Name', type: 'text', required: true, description: 'Your full legal name' },
        { field: 'passport', label: 'Passport', type: 'file', required: true, description: 'Upload your passport' },
        { field: 'address', label: 'Current Address', type: 'text', required: true, description: 'Your current residential address' }
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
      type: 'biometric',
      requestedData: [
        { field: 'fingerprint', label: 'Fingerprint Scan', type: 'file', required: true, description: 'Upload your fingerprint scan' }
      ],
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 15.00,
      result: {
        isVerified: true,
        confidence: 95,
        details: { biometricMatch: true, quality: 'excellent' },
        trustScoreImpact: 10
      }
    },
    {
      id: 'req-003',
      requesterId: 'org-003',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'failed',
      type: 'document',
      requestedData: [
        { field: 'driversLicense', label: 'Driver\'s License', type: 'file', required: true, description: 'Upload your driver\'s license' }
      ],
      expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 20.00,
      result: {
        isVerified: false,
        confidence: 0,
        details: { error: 'Document quality insufficient' },
        errors: ['Document image too blurry', 'Missing required information']
      }
    },
    {
      id: 'req-004',
      requesterId: 'org-004',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'in_progress',
      type: 'custom',
      requestedData: [
        { field: 'employmentHistory', label: 'Employment History', type: 'text', required: true, description: 'List your employment history for the past 5 years' },
        { field: 'references', label: 'Professional References', type: 'text', required: true, description: 'Provide contact details for 2 professional references' },
        { field: 'certifications', label: 'Professional Certifications', type: 'file', required: false, description: 'Upload any relevant professional certifications' }
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
      type: 'document',
      requestedData: [
        { field: 'utilityBill', label: 'Utility Bill', type: 'file', required: true, description: 'Recent utility bill for address verification' },
        { field: 'bankStatement', label: 'Bank Statement', type: 'file', required: true, description: 'Recent bank statement for financial verification' }
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
      type: 'biometric',
      requestedData: [
        { field: 'facialRecognition', label: 'Facial Recognition', type: 'file', required: true, description: 'Upload a clear photo for facial recognition' },
        { field: 'voiceSample', label: 'Voice Sample', type: 'file', required: true, description: 'Record a voice sample for voice biometrics' }
      ],
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 40.00,
      result: {
        isVerified: true,
        confidence: 98,
        details: { facialMatch: true, voiceMatch: true, quality: 'excellent' },
        trustScoreImpact: 15
      }
    },
    {
      id: 'req-007',
      requesterId: 'org-007',
      requesterType: 'organisation',
      targetId: individualUser.id,
      targetType: 'individual',
      status: 'pending',
      type: 'custom',
      requestedData: [
        { field: 'academicTranscript', label: 'Academic Transcript', type: 'file', required: true, description: 'Upload your academic transcript' },
        { field: 'degreeCertificate', label: 'Degree Certificate', type: 'file', required: true, description: 'Upload your degree certificate' },
        { field: 'institutionDetails', label: 'Institution Details', type: 'text', required: true, description: 'Provide details about your educational institution' }
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
      type: 'document',
      requestedData: [
        { field: 'taxReturns', label: 'Tax Returns', type: 'file', required: true, description: 'Upload your last 2 years tax returns' },
        { field: 'incomeProof', label: 'Income Proof', type: 'file', required: true, description: 'Recent payslips or income statements' }
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
      type: 'biometric',
      requestedData: [
        { field: 'irisScan', label: 'Iris Scan', type: 'file', required: true, description: 'Upload your iris scan for advanced biometric verification' },
        { field: 'gaitAnalysis', label: 'Gait Analysis', type: 'file', required: true, description: 'Record your walking pattern for gait recognition' }
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
      type: 'custom',
      requestedData: [
        { field: 'socialMediaProfiles', label: 'Social Media Profiles', type: 'text', required: true, description: 'Provide links to your professional social media profiles' },
        { field: 'onlinePresence', label: 'Online Presence Verification', type: 'text', required: true, description: 'List any websites or online portfolios you maintain' }
      ],
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 25.00,
      result: {
        isVerified: true,
        confidence: 92,
        details: { socialMediaVerified: true, onlinePresenceConfirmed: true },
        trustScoreImpact: 8
      }
    }
  ]

  // Mock System Verification Requests
  const mockSystemVerificationRequests = [
    {
      id: 'sys-001',
      type: 'bvn',
      title: 'Bank Verification Number (BVN)',
      description: 'Verify your Bank Verification Number with our secure backend systems',
      requestingOrganization: 'SecureBank International',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 15,
      estimatedTime: '2-4 hours',
      icon: CreditCard
    },
    {
      id: 'sys-002',
      type: 'nin',
      title: 'National Identity Number (NIN)',
      description: 'Verify your National Identity Number through government databases',
      requestingOrganization: 'TechCorp Solutions',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 20,
      estimatedTime: '1-3 hours',
      icon: UserCheck
    },
    {
      id: 'sys-003',
      type: 'frsc',
      title: 'Federal Road Safety Commission (FRSC)',
      description: 'Verify your driver\'s license and vehicle registration with FRSC',
      requestingOrganization: 'Transport Authority',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 12,
      estimatedTime: '4-6 hours',
      icon: Car
    },
    {
      id: 'sys-004',
      type: 'immigration',
      title: 'Immigration Status Verification',
      description: 'Verify your immigration status and visa information',
      requestingOrganization: 'Immigration Services',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 18,
      estimatedTime: '6-8 hours',
      icon: Building
    }
  ]

  // Mock Attester Verification Requests
  const mockAttesterVerificationRequests = [
    {
      id: 'att-001',
      type: 'employment-verification',
      title: 'Employment Verification',
      description: 'Verify your employment history with previous employers',
      requestingOrganization: 'FinanceFirst Ltd',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 25,
      estimatedTime: '3-5 business days',
      requiredDocuments: ['Employment Letter', 'Payslips', 'Reference Letter'],
      priority: 'high',
      icon: Building
    },
    {
      id: 'att-002',
      type: 'education-verification',
      title: 'Education Verification',
      description: 'Verify your educational qualifications and certificates',
      requestingOrganization: 'EduTech Academy',
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 18,
      estimatedTime: '5-7 business days',
      requiredDocuments: ['Degree Certificate', 'Transcript', 'Student ID'],
      priority: 'medium',
      icon: FileText
    },
    {
      id: 'att-003',
      type: 'reference-verification',
      title: 'Reference Verification',
      description: 'Verify your professional and personal references',
      requestingOrganization: 'HR Solutions Ltd',
      expiryDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 22,
      estimatedTime: '7-10 business days',
      requiredDocuments: ['Reference Contact Details', 'Relationship Description', 'Duration of Relationship'],
      priority: 'high',
      icon: Users
    },
    {
      id: 'att-004',
      type: 'business-verification',
      title: 'Business Verification',
      description: 'Verify your business ownership and operations',
      requestingOrganization: 'Business Registry Services',
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      trustScoreImpact: 30,
      estimatedTime: '10-14 business days',
      requiredDocuments: ['Business Registration', 'Tax Certificates', 'Financial Statements', 'Business Plan'],
      priority: 'urgent',
      icon: Building
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
      console.log('View details for request:', request)
    }
  }

  const handleSubmitResponse = async (requestId: string, responses: Record<string, any>) => {
    console.log('Submitting response for request:', requestId, responses)
    setShowResponseForm(false)
    setSelectedRequest(null)
  }

  // Handle clicks outside the verification type dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedVerificationType && !(event.target as Element).closest('.verification-dropdown')) {
        setSelectedVerificationType(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [selectedVerificationType])

  function getFilteredRequests() {
    switch (activeStatusTab) {
      case 'new':
        return mockVerificationRequests.filter(req => req.status === 'pending')
      case 'pending':
        return mockVerificationRequests.filter(req => req.status === 'in_progress')
      case 'completed':
        return mockVerificationRequests.filter(req => req.status === 'completed')
      case 'failed-expired':
        return mockVerificationRequests.filter(req => req.status === 'failed' || req.status === 'expired')
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
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'NEW'
      case 'in_progress':
        return 'PENDING'
      case 'completed':
        return 'COMPLETED'
      case 'failed':
        return 'FAILED'
      case 'expired':
        return 'EXPIRED'
      default:
        return status.toUpperCase()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="px-6">
          <div className="space-y-6">
            {/* Section Navigation */}
            <SectionNav
              title="Verification Dashboard"
              tabs={[
                { id: 'requests', name: 'Verification Requests', href: '/individual/verification' },
                { id: 'biobank', name: 'BioBank', href: '/individual/biobank' },
                { id: 'attesters', name: 'Attester Network', href: '/individual/attester' },
                { id: 'trust', name: 'Trust Score', href: '/individual/trust-score' }
              ]}
              actionButton={
                <div className="relative verification-dropdown">
                  <button 
                    onClick={() => setSelectedVerificationType(selectedVerificationType ? null : 'system')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Start Verification</span>
                  </button>
                  
                  {/* Verification Type Selection Dropdown */}
                  {selectedVerificationType && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="p-2">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Choose Verification Type</h3>
                        
                        {/* System Verifications */}
                        <div className="mb-3">
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">System Verifications</h4>
                          <div className="space-y-1">
                            {mockSystemVerificationRequests.map((req) => (
                              <button
                                key={req.id}
                                onClick={() => {
                                  setSelectedSystemRequest(req)
                                  setShowSystemVerification(true)
                                  setSelectedVerificationType(null)
                                }}
                                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                              >
                                <div className="flex items-center space-x-2">
                                  {React.createElement(req.icon, { className: "h-4 w-4 text-blue-600" })}
                                  <span className="text-gray-900">{req.title}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{req.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Attester Verifications */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Attester Verifications</h4>
                          <div className="space-y-1">
                            {mockAttesterVerificationRequests.map((req) => (
                              <button
                                key={req.id}
                                onClick={() => {
                                  setSelectedAttesterRequest(req)
                                  setShowAttesterVerification(true)
                                  setSelectedVerificationType(null)
                                }}
                                className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm"
                              >
                                <div className="flex items-center space-x-2">
                                  {React.createElement(req.icon, { className: "h-4 w-4 text-purple-600" })}
                                  <span className="text-gray-900">{req.title}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{req.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              }
            />

            {/* Tab Content */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="px-6">
                <div className="space-y-6">
                  {/* Status Tabs */}
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                    <button 
                      onClick={() => setActiveStatusTab('new')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeStatusTab === 'new'
                          ? 'text-gray-900 bg-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      New
                    </button>
                    <button 
                      onClick={() => setActiveStatusTab('pending')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeStatusTab === 'pending'
                          ? 'text-gray-900 bg-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Pending
                    </button>
                    <button 
                      onClick={() => setActiveStatusTab('completed')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeStatusTab === 'completed'
                          ? 'text-gray-900 bg-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Completed
                    </button>
                    <button 
                      onClick={() => setActiveStatusTab('failed-expired')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeStatusTab === 'failed-expired'
                          ? 'text-gray-900 bg-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Failed/Expired
                    </button>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search by name or reference ID"
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                        />
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Filter
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                      Export
                    </button>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-blue-600">
                        {mockVerificationRequests.filter(req => req.status === 'pending').length}
                      </div>
                      <div className="text-sm text-gray-600">New</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-yellow-600">
                        {mockVerificationRequests.filter(req => req.status === 'in_progress').length}
                      </div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-green-600">{completedRequests.length}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-red-600">
                        {mockVerificationRequests.filter(req => req.status === 'failed').length + expiredRequests.length}
                      </div>
                      <div className="text-sm text-gray-600">Failed/Expired</div>
                    </div>
                  </div>

                  {/* Verification Requests Table */}
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Initiated by
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type of verification
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date Initiated
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredRequests.map((request) => {
                            const organizationName = organizationNames[request.requesterId] || 'Unknown Organization'
                            return (
                              <tr key={request.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {organizationName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(request.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                    {getStatusText(request.status)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  {activeStatusTab === 'new' && (
                                    <button 
                                      onClick={() => handleRespondToRequest(request.id)}
                                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                      title="Complete Verification"
                                    >
                                      Complete Verification
                                    </button>
                                  )}
                                  {activeStatusTab !== 'new' && (
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

                    {filteredRequests.length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeStatusTab.replace('-', '/')} requests</h3>
                        <p className="text-gray-500">
                          {activeStatusTab === 'new' && "You don't have any new verification requests."}
                          {activeStatusTab === 'pending' && "You don't have any pending verification requests."}
                          {activeStatusTab === 'completed' && "You don't have any completed verification requests."}
                          {activeStatusTab === 'failed-expired' && "You don't have any failed or expired verification requests."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  )
}

export default VerificationDashboard
