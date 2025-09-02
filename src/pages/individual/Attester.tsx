import { useState } from 'react'
import { 
  Users, 
  Bell, 
  CheckCircle, 
  Clock, 
  XCircle, 
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Eye,
  MessageSquare,
  X,
  Plus,
  Edit
} from 'lucide-react'

interface Attester {
  id: string
  name: string
  email: string
  phone: string
  relationship: string
  status: 'active' | 'pending' | 'inactive'
  lastVerified: string
  totalVerifications: number
  avatar?: string
}

interface AttesterRequest {
  id: string
  requesterName: string
  requesterEmail: string
  verificationType: string
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  message?: string
}

const Attester = () => {
  const [activeTab, setActiveTab] = useState<'my-attesters' | 'requests'>('my-attesters')
  const [showAddAttesterModal, setShowAddAttesterModal] = useState(false)
  const [showAttesterDetails, setShowAttesterDetails] = useState<Attester | null>(null)
  const [showRequestDetails, setShowRequestDetails] = useState<AttesterRequest | null>(null)
  const [showMessageModal, setShowMessageModal] = useState<Attester | null>(null)
  const [messageText, setMessageText] = useState('')

  const myAttesters: Attester[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      phone: '+234 801 234 5678',
      relationship: 'Professor',
      status: 'active',
      lastVerified: '2024-01-15',
      totalVerifications: 3
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@techcorp.com',
      phone: '+234 802 345 6789',
      relationship: 'Former Employer',
      status: 'active',
      lastVerified: '2024-01-10',
      totalVerifications: 2
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+234 803 456 7890',
      relationship: 'Colleague',
      status: 'pending',
      lastVerified: '2024-01-05',
      totalVerifications: 1
    }
  ]

  const attesterRequests: AttesterRequest[] = [
    {
      id: '1',
      requesterName: 'John Smith',
      requesterEmail: 'john.smith@email.com',
      verificationType: 'Professional Verification',
      status: 'pending',
      requestedAt: '2024-01-20',
      message: 'Please verify my employment at TechCorp from 2020-2023'
    },
    {
      id: '2',
      requesterName: 'Lisa Brown',
      requesterEmail: 'lisa.brown@email.com',
      verificationType: 'Academic Verification',
      status: 'approved',
      requestedAt: '2024-01-18',
      message: 'Please verify my academic credentials from University of Lagos'
    },
    {
      id: '3',
      requesterName: 'David Wilson',
      requesterEmail: 'david.wilson@email.com',
      verificationType: 'Professional Verification',
      status: 'rejected',
      requestedAt: '2024-01-15',
      message: 'Please verify my work experience at DataTech Solutions'
    }
  ]

  // Handler functions
  const handleAddAttester = () => {
    setShowAddAttesterModal(true)
  }

  const handleViewAttester = (attester: Attester) => {
    setShowAttesterDetails(attester)
  }

  const handleMessageAttester = (attester: Attester) => {
    setShowMessageModal(attester)
    setMessageText('')
  }

  const handleViewRequest = (request: AttesterRequest) => {
    setShowRequestDetails(request)
  }

  const handleApproveRequest = (requestId: string) => {
    // In a real app, this would make an API call
    console.log('Approving request:', requestId)
    alert('Request approved successfully!')
  }

  const handleRejectRequest = (requestId: string) => {
    // In a real app, this would make an API call
    console.log('Rejecting request:', requestId)
    alert('Request rejected successfully!')
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message to:', showMessageModal?.name, 'Message:', messageText)
      alert('Message sent successfully!')
      setShowMessageModal(null)
      setMessageText('')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status === 'active' ? 'Active' : 'Approved'}
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
      case 'rejected':
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
            <XCircle className="h-3 w-3 mr-1" />
            {status === 'rejected' ? 'Rejected' : 'Inactive'}
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Row - Title, Centered Navigation, and Action Button on Same Line */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center">
            {/* Left Side - Title */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Attester Management</h1>
            </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('my-attesters')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'my-attesters'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    <span>My Attesters ({myAttesters.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'requests'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                    <span>Requests to Me ({attesterRequests.filter(r => r.status === 'pending').length})</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Right Side - Action Button */}
            <div className="flex-shrink-0">
              <button onClick={handleAddAttester} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Attester
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'my-attesters' ? (
        <div className="px-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Attesters</p>
                  <p className="text-2xl font-bold text-gray-900">{myAttesters.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myAttesters.filter(a => a.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myAttesters.filter(a => a.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Verifications</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myAttesters.reduce((sum, attester) => sum + attester.totalVerifications, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attesters Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Attesters</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Relationship
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Verified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verifications
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myAttesters.map((attester) => (
                    <tr key={attester.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{attester.name}</div>
                            <div className="text-sm text-gray-500">{attester.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {attester.relationship}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(attester.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(attester.lastVerified).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {attester.totalVerifications}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleViewAttester(attester)}
                            className="text-primary-600 hover:text-primary-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleMessageAttester(attester)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Send Message"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {attesterRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {attesterRequests.filter(r => r.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-danger-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {attesterRequests.filter(r => r.status === 'rejected').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Verification Requests</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attesterRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.requesterName}</div>
                          <div className="text-sm text-gray-500">{request.requesterEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.verificationType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.requestedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleViewRequest(request)}
                            className="text-primary-600 hover:text-primary-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleApproveRequest(request.id)}
                                className="text-success-600 hover:text-success-900"
                                title="Approve Request"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleRejectRequest(request.id)}
                                className="text-danger-600 hover:text-danger-900"
                                title="Reject Request"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
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
      )}

      {/* Add New Attester Modal */}
      {showAddAttesterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Attester</h3>
              <button 
                onClick={() => setShowAddAttesterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter attester name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Select relationship</option>
                  <option value="professor">Professor</option>
                  <option value="employer">Employer</option>
                  <option value="colleague">Colleague</option>
                  <option value="friend">Friend</option>
                  <option value="family">Family</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowAddAttesterModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Attester added successfully!')
                  setShowAddAttesterModal(false)
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add Attester
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attester Details Modal */}
      {showAttesterDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Attester Details</h3>
              <button 
                onClick={() => setShowAttesterDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{showAttesterDetails.name}</h4>
                  <p className="text-gray-600">{showAttesterDetails.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{showAttesterDetails.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Relationship</label>
                  <p className="text-sm text-gray-900">{showAttesterDetails.relationship}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(showAttesterDetails.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Verifications</label>
                  <p className="text-sm text-gray-900">{showAttesterDetails.totalVerifications}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Verified</label>
                <p className="text-sm text-gray-900">
                  {new Date(showAttesterDetails.lastVerified).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setShowAttesterDetails(null)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {showRequestDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Request Details</h3>
              <button 
                onClick={() => setShowRequestDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Requester</label>
                <p className="text-sm text-gray-900">{showRequestDetails.requesterName}</p>
                <p className="text-sm text-gray-600">{showRequestDetails.requesterEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Verification Type</label>
                <p className="text-sm text-gray-900">{showRequestDetails.verificationType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">{getStatusBadge(showRequestDetails.status)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requested</label>
                <p className="text-sm text-gray-900">
                  {new Date(showRequestDetails.requestedAt).toLocaleDateString()}
                </p>
              </div>
              {showRequestDetails.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    {showRequestDetails.message}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setShowRequestDetails(null)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send Message</h3>
              <button 
                onClick={() => setShowMessageModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">To</label>
                <p className="text-sm text-gray-900">{showMessageModal.name}</p>
                <p className="text-sm text-gray-600">{showMessageModal.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  placeholder="Enter your message..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowMessageModal(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Attester
