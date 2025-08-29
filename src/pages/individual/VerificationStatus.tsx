import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Download,
  Eye,
  FileText,
  User,
  Shield,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Info
} from 'lucide-react'

interface VerificationStatus {
  id: string
  type: string
  status: 'pending' | 'processing' | 'review' | 'completed' | 'failed' | 'rejected'
  submittedAt: Date
  estimatedCompletion: Date
  actualCompletion?: Date
  documents: {
    name: string
    status: 'pending' | 'validated' | 'rejected'
    validatedAt?: Date
  }[]
  attesters: {
    name: string
    status: 'pending' | 'invited' | 'verified' | 'rejected'
    invitedAt?: Date
    verifiedAt?: Date
  }[]
  trustScoreBoost: number
  cost: number
  verificationId?: string
  rejectionReason?: string
  notes?: string[]
}

const VerificationStatus = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [verifications, setVerifications] = useState<VerificationStatus[]>([])
  const [selectedVerification, setSelectedVerification] = useState<VerificationStatus | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockVerifications: VerificationStatus[] = [
      {
        id: '1',
        type: 'NIN Verification',
        status: 'completed',
        submittedAt: new Date('2024-01-15'),
        estimatedCompletion: new Date('2024-01-17'),
        actualCompletion: new Date('2024-01-16'),
        verificationId: 'IDC12345678',
        documents: [
          { name: 'NIN Slip', status: 'validated', validatedAt: new Date('2024-01-16') },
          { name: 'Government ID', status: 'validated', validatedAt: new Date('2024-01-16') }
        ],
        attesters: [
          { name: 'John Doe', status: 'verified', invitedAt: new Date('2024-01-15'), verifiedAt: new Date('2024-01-16') }
        ],
        trustScoreBoost: 500,
        cost: 500,
        notes: ['Verification completed successfully', 'All documents validated', 'Attester confirmed']
      },
      {
        id: '2',
        type: 'Passport Verification',
        status: 'processing',
        submittedAt: new Date('2024-01-18'),
        estimatedCompletion: new Date('2024-01-21'),
        documents: [
          { name: 'Passport', status: 'validated', validatedAt: new Date('2024-01-19') },
          { name: 'Passport Photo', status: 'pending' }
        ],
        attesters: [
          { name: 'Jane Smith', status: 'invited', invitedAt: new Date('2024-01-18') }
        ],
        trustScoreBoost: 400,
        cost: 1500,
        notes: ['Passport document validated', 'Awaiting photo validation', 'Attester invitation sent']
      },
      {
        id: '3',
        type: 'Academic Verification',
        status: 'review',
        submittedAt: new Date('2024-01-20'),
        estimatedCompletion: new Date('2024-01-25'),
        documents: [
          { name: 'Degree Certificate', status: 'validated', validatedAt: new Date('2024-01-21') },
          { name: 'Academic Transcript', status: 'validated', validatedAt: new Date('2024-01-21') }
        ],
        attesters: [
          { name: 'Dr. Michael Brown', status: 'verified', invitedAt: new Date('2024-01-20'), verifiedAt: new Date('2024-01-22') }
        ],
        trustScoreBoost: 300,
        cost: 1000,
        notes: ['All documents validated', 'Academic reference verified', 'Under final review']
      }
    ]
    setVerifications(mockVerifications)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'processing':
        return 'text-blue-600 bg-blue-100'
      case 'review':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
      case 'rejected':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'processing':
        return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'review':
        return <AlertCircle className="h-4 w-4" />
      case 'failed':
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getProgressPercentage = (verification: VerificationStatus) => {
    const totalSteps = verification.documents.length + verification.attesters.length
    const completedSteps = verification.documents.filter(d => d.status === 'validated').length +
                          verification.attesters.filter(a => a.status === 'verified').length
    return Math.round((completedSteps / totalSteps) * 100)
  }

  const refreshStatus = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const copyVerificationId = (id: string) => {
    navigator.clipboard.writeText(id)
    // Show toast notification
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Status</h1>
          <p className="text-gray-600">Track the progress of your verification requests</p>
        </div>
        <button
          onClick={refreshStatus}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification List */}
        <div className="lg:col-span-2 space-y-4">
          {verifications.map((verification) => (
            <div
              key={verification.id}
              onClick={() => setSelectedVerification(verification)}
              className={`bg-white border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                selectedVerification?.id === verification.id ? 'border-primary-500 shadow-md' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(verification.status).split(' ')[1]}`}>
                    {getStatusIcon(verification.status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{verification.type}</h3>
                    <p className="text-sm text-gray-500">
                      Submitted {verification.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                    {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                  </span>
                  {verification.verificationId && (
                    <p className="text-xs text-gray-500 mt-1">ID: {verification.verificationId}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-medium">{getProgressPercentage(verification)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(verification)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-medium">
                    {verification.documents.filter(d => d.status === 'validated').length}/{verification.documents.length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Attesters:</span>
                  <span className="font-medium">
                    {verification.attesters.filter(a => a.status === 'verified').length}/{verification.attesters.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Details */}
        <div className="space-y-4">
          {selectedVerification ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Verification Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Verification ID</h4>
                  {selectedVerification.verificationId ? (
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {selectedVerification.verificationId}
                      </code>
                      <button
                        onClick={() => copyVerificationId(selectedVerification.verificationId!)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Pending assignment</span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span>{selectedVerification.submittedAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated:</span>
                      <span>{selectedVerification.estimatedCompletion.toLocaleDateString()}</span>
                    </div>
                    {selectedVerification.actualCompletion && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span>{selectedVerification.actualCompletion.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Documents</h4>
                  <div className="space-y-2">
                    {selectedVerification.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{doc.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          doc.status === 'validated' ? 'bg-green-100 text-green-800' :
                          doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Attesters</h4>
                  <div className="space-y-2">
                    {selectedVerification.attesters.map((attester, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{attester.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          attester.status === 'verified' ? 'bg-green-100 text-green-800' :
                          attester.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          attester.status === 'invited' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {attester.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedVerification.notes && selectedVerification.notes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                    <div className="space-y-1">
                      {selectedVerification.notes.map((note, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedVerification.rejectionReason && (
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2">Rejection Reason</h4>
                    <p className="text-sm text-red-600">{selectedVerification.rejectionReason}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">₦{selectedVerification.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Trust Score Boost:</span>
                    <span className="font-medium text-green-600">+{selectedVerification.trustScoreBoost}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a verification to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerificationStatus
