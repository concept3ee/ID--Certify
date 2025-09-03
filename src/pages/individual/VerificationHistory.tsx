import React, { useState } from 'react'
import { CheckCircle, Clock, XCircle, AlertCircle, FileText, Calendar, User, Building, Filter, Search, Download, Eye } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface VerificationHistoryItem {
  id: string
  type: string
  title: string
  status: 'completed' | 'failed' | 'expired' | 'cancelled'
  initiatedBy: 'self' | 'organization'
  organizationName?: string
  dateInitiated: string
  dateCompleted?: string
  cost: number
  trustScoreImpact?: number
  verificationMethod: 'system' | 'attester'
  result?: {
    isVerified: boolean
    confidence: number
    details: Record<string, any>
    errors?: string[]
  }
}

const VerificationHistory: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState<'all' | 'self' | 'requested'>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<VerificationHistoryItem | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Mock data for verification history
  const mockVerificationHistory: VerificationHistoryItem[] = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-slate-100 text-slate-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'expired': return <Clock className="w-4 h-4" />
      case 'cancelled': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getVerificationTypeDisplay = (type: string) => {
    switch (type) {
      case 'bvn-verification': return 'BVN Verification'
      case 'nin-verification': return 'NIN Verification'
      case 'employment-verification': return 'Employment Verification'
      case 'education-verification': return 'Education Verification'
      case 'address-verification': return 'Address Verification'
      case 'income-verification': return 'Income Verification'
      case 'reference-verification': return 'Reference Verification'
      case 'business-verification': return 'Business Verification'
      case 'facial-verification': return 'Facial Recognition'
      case 'fingerprint-verification': return 'Fingerprint Verification'
      case 'frsc-verification': return 'FRSC Verification'
      case 'immigration-verification': return 'Immigration Verification'
      case 'cac-verification': return 'CAC Verification'
      case 'firs-verification': return 'FIRS Verification'
      default: return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
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

  const getFilteredHistory = () => {
    let filtered = mockVerificationHistory

    // Filter by tab
    if (activeTab === 'self') {
      filtered = filtered.filter(item => item.initiatedBy === 'self')
    } else if (activeTab === 'requested') {
      filtered = filtered.filter(item => item.initiatedBy === 'organization')
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter)
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

  const handleViewDetails = (item: VerificationHistoryItem) => {
    setSelectedItem(item)
    setShowDetails(true)
  }

  const filteredHistory = getFilteredHistory()

  const getStats = () => {
    const all = mockVerificationHistory.length
    const completed = mockVerificationHistory.filter(item => item.status === 'completed').length
    const failed = mockVerificationHistory.filter(item => item.status === 'failed').length
    const totalCost = mockVerificationHistory.reduce((sum, item) => sum + item.cost, 0)
    
    return { all, completed, failed, totalCost }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Navigation - Full Width */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Verification History</h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export History</span>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'all'
                    ? 'text-gray-900 bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All Verifications ({stats.all})
              </button>
              <button 
                onClick={() => setActiveTab('self')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'self'
                    ? 'text-gray-900 bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Self-Initiated
              </button>
              <button 
                onClick={() => setActiveTab('requested')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'requested'
                    ? 'text-gray-900 bg-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Organization Requests
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
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
                    {filteredHistory.map((item) => (
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
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                          </span>
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.cost.toFixed(2)}
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(item)}
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

                {filteredHistory.length === 0 && (
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

      {/* Verification Details Modal */}
      {showDetails && selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Verification Details
                </h3>
                <button
                  onClick={() => {
                    setShowDetails(false)
                    setSelectedItem(null)
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
                    <p className="mt-1 text-sm text-gray-900">{selectedItem.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                      {getStatusIcon(selectedItem.status)}
                      <span className="ml-1">{selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Initiated By</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedItem.initiatedBy === 'self' ? 'Self' : selectedItem.organizationName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Method</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedItem.verificationMethod === 'system' ? 'System Verification' : 'Attester Verification'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Initiated</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedItem.dateInitiated)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cost</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedItem.cost.toFixed(2)}</p>
                  </div>
                </div>

                {selectedItem.dateCompleted && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Completed</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedItem.dateCompleted)}</p>
                  </div>
                )}

                {selectedItem.trustScoreImpact && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trust Score Impact</label>
                    <p className="mt-1 text-sm text-gray-900">+{selectedItem.trustScoreImpact}</p>
                  </div>
                )}

                {selectedItem.result && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Result</label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Status</label>
                          <p className="text-sm text-gray-900">
                            {selectedItem.result.isVerified ? 'Verified' : 'Not Verified'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Confidence</label>
                          <p className="text-sm text-gray-900">{selectedItem.result.confidence}%</p>
                        </div>
                      </div>
                      {selectedItem.result.errors && selectedItem.result.errors.length > 0 && (
                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Errors</label>
                          <ul className="text-sm text-red-600 space-y-1">
                            {selectedItem.result.errors.map((error, index) => (
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
                    setShowDetails(false)
                    setSelectedItem(null)
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
    </div>
  )
}

export default VerificationHistory

