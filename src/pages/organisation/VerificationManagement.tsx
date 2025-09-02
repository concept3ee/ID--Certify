import React, { useState } from 'react'
import { OrganisationUser, VerificationRequest, EmployeeVerification, UserType } from '../../types'
import SectionNav from '../../components/ui/SectionNav'
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Send
} from 'lucide-react'


interface VerificationManagementProps {
  user: OrganisationUser
}

const VerificationManagement: React.FC<VerificationManagementProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'employees' | 'initiate'>('requests')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [activeStatusTab, setActiveStatusTab] = useState<'new' | 'pending' | 'completed' | 'failed-expired'>('new')

  // Mock data - in real app this would come from API
  const pendingRequests = user.verificationRequests.filter(req => req.status === 'pending')
  const completedRequests = user.verificationRequests.filter(req => req.status === 'completed')
  const inProgressRequests = user.verificationRequests.filter(req => req.status === 'in_progress')

  const pendingEmployees = user.employeeVerifications.filter(emp => emp.verificationStatus === 'pending')
  const verifiedEmployees = user.employeeVerifications.filter(emp => emp.verificationStatus === 'verified')
  const failedEmployees = user.employeeVerifications.filter(emp => emp.verificationStatus === 'failed')

  // Filter requests based on active status tab
  const getFilteredRequests = () => {
    switch (activeStatusTab) {
      case 'new':
        return user.verificationRequests.filter(req => req.status === 'pending')
      case 'pending':
        return user.verificationRequests.filter(req => req.status === 'in_progress')
      case 'completed':
        return user.verificationRequests.filter(req => req.status === 'completed')
      case 'failed-expired':
        return user.verificationRequests.filter(req => req.status === 'failed' || req.status === 'expired')
      default:
        return user.verificationRequests
    }
  }

  const filteredRequests = getFilteredRequests()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'in_progress': return 'text-blue-600 bg-blue-50'
      case 'completed': return 'text-green-600 bg-green-50'
      case 'expired': return 'text-red-600 bg-red-50'
      case 'verified': return 'text-green-600 bg-green-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'in_progress': return <AlertTriangle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'verified': return <UserCheck className="w-4 h-4" />
      case 'failed': return <UserX className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleInitiateVerification = (targetType: UserType, targetId: string) => {
    // In real app, this would open a form to configure verification request
    console.log('Initiating verification for:', targetType, targetId)
  }

  const handleViewDetails = (requestId: string) => {
    // In real app, this would open a detailed view
    console.log('View details for request:', requestId)
  }

  const handleBulkUpload = () => {
    // In real app, this would open file upload dialog
    console.log('Bulk upload employees for verification')
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <SectionNav
        title="Verification Management"
        tabs={[
          { id: 'requests', name: 'Verification Requests', href: '/organisation/verification' },
          { id: 'employees', name: 'Employee Verifications', href: '/organisation/employees' },
          { id: 'initiate', name: 'Initiate Verification', href: '/organisation/verification/initiate' }
        ]}
        actionButton={
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Initiate Verification
          </button>
        }
      />

      {/* Content */}
      {activeTab === 'requests' && (
        <div className="px-6 space-y-6">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              <div className="text-2xl font-bold text-blue-600">{pendingRequests.length}</div>
              <div className="text-sm text-gray-600">New</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-yellow-600">{inProgressRequests.length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{completedRequests.length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-red-600">
                {user.verificationRequests.filter(req => req.status === 'failed').length + user.verificationRequests.filter(req => req.status === 'expired').length}
              </div>
              <div className="text-sm text-gray-600">Failed/Expired</div>
            </div>
          </div>

          {/* Verification Requests Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                    const getStatusColor = (status: string) => {
                      switch (status) {
                        case 'completed': return 'bg-green-100 text-green-800'
                        case 'failed': return 'bg-red-100 text-red-800'
                        case 'pending': return 'bg-blue-100 text-blue-800'
                        case 'in_progress': return 'bg-yellow-100 text-yellow-800'
                        case 'expired': return 'bg-gray-100 text-gray-800'
                        default: return 'bg-gray-100 text-gray-800'
                      }
                    }

                    const getStatusText = (status: string) => {
                      switch (status) {
                        case 'completed': return 'COMPLETED'
                        case 'failed': return 'FAILED'
                        case 'pending': return 'NEW'
                        case 'in_progress': return 'PENDING'
                        case 'expired': return 'EXPIRED'
                        default: return status.toUpperCase()
                      }
                    }

                    const formatDate = (dateString: string) => {
                      const date = new Date(dateString)
                      const month = date.toLocaleDateString('en-US', { month: 'short' })
                      const day = date.getDate().toString().padStart(2, '0')
                      const year = date.getFullYear()
                      return `${month}-${day}-${year}`
                    }



                    return (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.companyName}
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
                          {request.status === 'pending' ? (
                            <button
                              onClick={() => handleViewDetails(request.id)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                              title="Complete Verification"
                            >
                              Complete Verification
                            </button>
                          ) : (
                            <button
                              onClick={() => handleViewDetails(request.id)}
                              className="text-gray-400 hover:text-gray-600"
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
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto text-gray-300 mb-4" />
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
      )}

      {activeTab === 'employees' && (
        <div className="px-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Employee Verifications</h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkUpload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Bulk Upload</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingEmployees.length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Verified</p>
                  <p className="text-2xl font-bold text-green-600">{verifiedEmployees.length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{failedEmployees.length}</p>
                </div>
                <UserX className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trust Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Review
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.employeeVerifications.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.employeeName}</div>
                        <div className="text-sm text-gray-500">ID: {employee.employeeId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.verificationStatus)}`}>
                        {getStatusIcon(employee.verificationStatus)}
                        <span className="ml-1">{employee.verificationStatus}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.trustScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.lastVerified).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.nextReviewDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(employee.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {employee.verificationStatus === 'pending' && (
                        <button
                          onClick={() => handleInitiateVerification('individual', employee.employeeId)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {user.employeeVerifications.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No employees</h3>
              <p className="text-gray-500">Add employees to start verification processes.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'initiate' && (
        <div className="px-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Initiate Verification</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Individual Verification</h3>
              <p className="text-gray-600 mb-4">
                Verify an individual's identity, documents, or specific information.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter individual's email or ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select verification type</option>
                  <option value="identity">Identity Verification</option>
                  <option value="document">Document Verification</option>
                  <option value="biometric">Biometric Verification</option>
                  <option value="custom">Custom Verification</option>
                </select>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Initiate Verification
                </button>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Organization Verification</h3>
              <p className="text-gray-600 mb-4">
                Verify an organization's registration, compliance, or business information.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter organization name or registration number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select verification type</option>
                  <option value="registration">Registration Verification</option>
                  <option value="compliance">Compliance Check</option>
                  <option value="aml">AML Screening</option>
                  <option value="custom">Custom Verification</option>
                </select>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Initiate Verification
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Bulk Verification</h3>
            <p className="text-blue-800 mb-4">
              Upload a CSV file with multiple individuals or organizations for batch verification.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBulkUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Upload CSV File
              </button>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                Download template
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationManagement
