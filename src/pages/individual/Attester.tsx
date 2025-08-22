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
  MessageSquare
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attester Management</h1>
          <p className="text-gray-600">Manage your attesters and verification requests</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Attester
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('my-attesters')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'my-attesters'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            My Attesters ({myAttesters.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'requests'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bell className="h-4 w-4 inline mr-2" />
            Requests to Me ({attesterRequests.filter(r => r.status === 'pending').length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'my-attesters' ? (
        <div className="space-y-6">
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
                          <button className="text-primary-600 hover:text-primary-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
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
        <div className="space-y-6">
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
                          <button className="text-primary-600 hover:text-primary-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button className="text-success-600 hover:text-success-900">
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button className="text-danger-600 hover:text-danger-900">
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
    </div>
  )
}

export default Attester
