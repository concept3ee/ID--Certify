import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { 
  User, 
  FileText, 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Home,
  FileCheck,
  Users,
  Send,
  Eye,
  Download
} from 'lucide-react'

interface VerificationType {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  requiredDocuments: string[]
  estimatedTime: string
  price: string
}

interface VerificationRequest {
  id: string
  candidateName: string
  candidateEmail: string
  verificationType: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  submittedAt: string
  completedAt?: string
  documents: number
  attesters: number
}

const Verification = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [selectedVerificationType, setSelectedVerificationType] = useState<string>('')
  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  })

  const verificationTypes: VerificationType[] = [
    {
      id: 'identity',
      name: 'Identity Verification',
      description: 'Verify government-issued ID, passport, or other identity documents',
      icon: User,
      requiredDocuments: ['Government ID', 'Passport', 'Birth Certificate'],
      estimatedTime: '2-3 business days',
      price: '₦2,500'
    },
    {
      id: 'academic',
      name: 'Academic Verification',
      description: 'Verify degrees, certificates, and academic transcripts',
      icon: GraduationCap,
      requiredDocuments: ['Degree Certificate', 'Academic Transcript', 'Institution Letter'],
      estimatedTime: '3-5 business days',
      price: '₦3,500'
    },
    {
      id: 'professional',
      name: 'Professional Verification',
      description: 'Verify work history, employment records, and professional references',
      icon: Briefcase,
      requiredDocuments: ['Employment Letter', 'Reference Letters', 'Work Certificates'],
      estimatedTime: '5-7 business days',
      price: '₦4,500'
    },
    {
      id: 'address',
      name: 'Address Verification',
      description: 'Verify residential and business addresses',
      icon: Home,
      requiredDocuments: ['Utility Bill', 'Bank Statement', 'Rental Agreement'],
      estimatedTime: '1-2 business days',
      price: '₦1,500'
    },
    {
      id: 'background',
      name: 'Background Check',
      description: 'Comprehensive criminal record and background verification',
      icon: Shield,
      requiredDocuments: ['Consent Form', 'Identity Documents', 'Address Proof'],
      estimatedTime: '7-10 business days',
      price: '₦8,500'
    },
    {
      id: 'document',
      name: 'Document Authentication',
      description: 'Authenticate legal documents, licenses, and certifications',
      icon: FileCheck,
      requiredDocuments: ['Original Document', 'Supporting Evidence', 'Notarization'],
      estimatedTime: '3-5 business days',
      price: '₦3,000'
    }
  ]

  const verificationRequests: VerificationRequest[] = [
    {
      id: 'VR-001',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      verificationType: 'Professional Verification',
      status: 'completed',
      submittedAt: '2024-01-15',
      completedAt: '2024-01-20',
      documents: 3,
      attesters: 2
    },
    {
      id: 'VR-002',
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      verificationType: 'Academic Verification',
      status: 'in-progress',
      submittedAt: '2024-01-18',
      documents: 2,
      attesters: 1
    },
    {
      id: 'VR-003',
      candidateName: 'Emily Davis',
      candidateEmail: 'emily.davis@email.com',
      verificationType: 'Background Check',
      status: 'pending',
      submittedAt: '2024-01-20',
      documents: 0,
      attesters: 0
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </span>
        )
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </span>
        )
      default:
        return null
    }
  }

  const handleSubmitRequest = () => {
    // Handle verification request submission
    console.log('Submitting verification request:', {
      candidateInfo,
      verificationType: selectedVerificationType
    })
    setShowNewRequest(false)
    setCandidateInfo({ name: '', email: '', phone: '', position: '' })
    setSelectedVerificationType('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Third-Party Verification</h1>
          <p className="text-gray-600">Initiate verification requests for candidates and track their progress</p>
        </div>
        <button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Verification Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Requests Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Verification Requests</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {verificationRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.candidateName}</div>
                      <div className="text-sm text-gray-500">{request.candidateEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.verificationType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            request.status === 'completed' ? 'bg-success-500' :
                            request.status === 'in-progress' ? 'bg-warning-500' :
                            'bg-gray-300'
                          }`}
                          style={{ 
                            width: request.status === 'completed' ? '100%' :
                                   request.status === 'in-progress' ? '60%' : '20%'
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {request.documents} docs, {request.attesters} attesters
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      {request.status === 'completed' && (
                        <button className="text-success-600 hover:text-success-900">
                          <Download className="h-4 w-4" />
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

      {/* New Verification Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">New Verification Request</h3>
                <button
                  onClick={() => setShowNewRequest(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-6">
              {/* Candidate Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Candidate Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={candidateInfo.name}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter candidate's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={candidateInfo.email}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="candidate@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={candidateInfo.phone}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
                    <input
                      type="text"
                      value={candidateInfo.position}
                      onChange={(e) => setCandidateInfo(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                </div>
              </div>

              {/* Verification Type Selection */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Select Verification Type</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verificationTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedVerificationType(type.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedVerificationType === type.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-5 w-5 text-primary-600" />
                          <h5 className="font-medium text-gray-900">{type.name}</h5>
                        </div>
                        <span className="text-sm font-medium text-primary-600">{type.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                      <p className="text-xs text-gray-500">Estimated time: {type.estimatedTime}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">What happens next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• The candidate will receive an email invitation</li>
                      <li>• They'll complete the verification process</li>
                      <li>• You'll receive real-time updates on progress</li>
                      <li>• Final report will be available for download</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowNewRequest(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                disabled={!candidateInfo.name || !candidateInfo.email || !selectedVerificationType}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Verification
