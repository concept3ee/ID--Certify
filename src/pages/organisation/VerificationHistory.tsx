import React, { useState } from 'react'
import { 
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Building,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Users,
  Target,
  Award
} from 'lucide-react'

// Types
interface VerificationRecord {
  id: string
  candidateName: string
  candidateEmail: string
  candidateType: 'individual' | 'business'
  verificationType: string
  status: 'completed' | 'failed' | 'pending' | 'expired'
  initiatedBy: string
  initiatedDate: string
  completedDate?: string
  attesterName: string
  attesterTrustScore: number
  processingTime?: number // in hours
  department: string
  notes?: string
  documents: string[]
}

const VerificationHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null)

  // Mock data - comprehensive verification history
  const mockVerificationHistory: VerificationRecord[] = [
    {
      id: 'ver-001',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      candidateType: 'individual',
      verificationType: 'Identity Verification',
      status: 'completed',
      initiatedBy: 'John Smith',
      initiatedDate: '2025-01-16T10:00:00Z',
      completedDate: '2025-01-16T12:30:00Z',
      attesterName: 'Jane Doe',
      attesterTrustScore: 92,
      processingTime: 2.5,
      department: 'HR',
      notes: 'Identity verified successfully with passport and driver license',
      documents: ['passport.pdf', 'drivers_license.pdf']
    },
    {
      id: 'ver-002',
      candidateName: 'TechCorp Solutions',
      candidateEmail: 'hr@techcorp.com',
      candidateType: 'business',
      verificationType: 'Business License',
      status: 'completed',
      initiatedBy: 'Mike Wilson',
      initiatedDate: '2025-01-16T09:15:00Z',
      completedDate: '2025-01-16T11:45:00Z',
      attesterName: 'David Lee',
      attesterTrustScore: 88,
      processingTime: 2.5,
      department: 'Procurement',
      notes: 'Business license verified and current',
      documents: ['business_license.pdf', 'tax_certificate.pdf']
    },
    {
      id: 'ver-003',
      candidateName: 'David Lee',
      candidateEmail: 'david.lee@email.com',
      candidateType: 'individual',
      verificationType: 'Background Check',
      status: 'pending',
      initiatedBy: 'Sarah Johnson',
      initiatedDate: '2025-01-16T14:00:00Z',
      attesterName: 'John Smith',
      attesterTrustScore: 92,
      department: 'Security',
      notes: 'Background check in progress',
      documents: ['background_check_form.pdf']
    },
    {
      id: 'ver-004',
      candidateName: 'Maria Garcia',
      candidateEmail: 'maria.garcia@email.com',
      candidateType: 'individual',
      verificationType: 'Education Verification',
      status: 'failed',
      initiatedBy: 'Lisa Wang',
      initiatedDate: '2025-01-15T16:30:00Z',
      completedDate: '2025-01-15T18:00:00Z',
      attesterName: 'Jane Doe',
      attesterTrustScore: 88,
      processingTime: 1.5,
      department: 'HR',
      notes: 'Education credentials could not be verified - institution not found',
      documents: ['diploma.pdf', 'transcript.pdf']
    },
    {
      id: 'ver-005',
      candidateName: 'Robert Chen',
      candidateEmail: 'robert.chen@email.com',
      candidateType: 'individual',
      verificationType: 'Identity Verification',
      status: 'expired',
      initiatedBy: 'Mike Wilson',
      initiatedDate: '2025-01-10T08:00:00Z',
      completedDate: '2025-01-10T10:30:00Z',
      attesterName: 'David Lee',
      attesterTrustScore: 88,
      processingTime: 2.5,
      department: 'Finance',
      notes: 'Identity verification expired after 30 days',
      documents: ['passport.pdf', 'utility_bill.pdf']
    },
    {
      id: 'ver-006',
      candidateName: 'InnovateTech Inc',
      candidateEmail: 'contact@innovatetech.com',
      candidateType: 'business',
      verificationType: 'Financial Verification',
      status: 'completed',
      initiatedBy: 'Sarah Johnson',
      initiatedDate: '2025-01-15T11:00:00Z',
      completedDate: '2025-01-15T15:30:00Z',
      attesterName: 'John Smith',
      attesterTrustScore: 92,
      processingTime: 4.5,
      department: 'Finance',
      notes: 'Financial statements verified and company is financially stable',
      documents: ['financial_statements.pdf', 'bank_statements.pdf', 'audit_report.pdf']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'expired': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (hours?: number) => {
    if (!hours) return 'N/A'
    if (hours < 1) return `${Math.round(hours * 60)} min`
    return `${hours.toFixed(1)} hrs`
  }

  const filteredHistory = mockVerificationHistory.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.verificationType.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    const matchesType = typeFilter === 'all' || record.candidateType === typeFilter
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesDepartment
  })

  // Calculate statistics
  const totalVerifications = mockVerificationHistory.length
  const completedVerifications = mockVerificationHistory.filter(v => v.status === 'completed').length
  const failedVerifications = mockVerificationHistory.filter(v => v.status === 'failed').length
  const pendingVerifications = mockVerificationHistory.filter(v => v.status === 'pending').length
  const successRate = totalVerifications > 0 ? Math.round((completedVerifications / totalVerifications) * 100) : 0
  const averageProcessingTime = mockVerificationHistory
    .filter(v => v.processingTime)
    .reduce((acc, v) => acc + (v.processingTime || 0), 0) / 
    mockVerificationHistory.filter(v => v.processingTime).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-medium text-gray-900">Verification History</h1>
              <p className="text-xs text-gray-500 mt-1">Complete audit trail of all verification activities</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{totalVerifications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedVerifications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{failedVerifications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingVerifications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{successRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search verifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="HR">HR</option>
                <option value="Security">Security</option>
                <option value="Finance">Finance</option>
                <option value="Procurement">Procurement</option>
              </select>
            </div>
          </div>
        </div>

        {/* Verification History Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Verification Records</h3>
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
                    Attester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processing Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map((record) => (
                  <React.Fragment key={record.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              {record.candidateType === 'individual' ? 
                                <User className="w-5 h-5 text-gray-600" /> : 
                                <Building className="w-5 h-5 text-gray-600" />
                              }
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.candidateName}</div>
                            <div className="text-sm text-gray-500">{record.candidateEmail}</div>
                            <div className="text-xs text-gray-400">{record.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.verificationType}</div>
                        <div className="text-xs text-gray-500">Initiated by: {record.initiatedBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1">{record.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.attesterName}</div>
                        <div className="text-xs text-gray-500">Trust: {record.attesterTrustScore}/100</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDuration(record.processingTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{formatDate(record.initiatedDate)}</div>
                        {record.completedDate && (
                          <div className="text-xs text-gray-400">
                            Completed: {formatDate(record.completedDate)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {expandedRecord === record.id ? 'Hide' : 'View'}
                          {expandedRecord === record.id ? 
                            <ChevronUp className="w-4 h-4 ml-1" /> : 
                            <ChevronDown className="w-4 h-4 ml-1" />
                          }
                        </button>
                      </td>
                    </tr>
                    {expandedRecord === record.id && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">Verification Details</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Verification ID:</span>
                                  <span className="text-sm font-medium text-gray-900">{record.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Initiated:</span>
                                  <span className="text-sm font-medium text-gray-900">{formatDate(record.initiatedDate)}</span>
                                </div>
                                {record.completedDate && (
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Completed:</span>
                                    <span className="text-sm font-medium text-gray-900">{formatDate(record.completedDate)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Department:</span>
                                  <span className="text-sm font-medium text-gray-900">{record.department}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">Documents & Notes</h4>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm text-gray-600">Documents:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {record.documents.map((doc, index) => (
                                      <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        <FileText className="w-3 h-3 mr-1" />
                                        {doc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {record.notes && (
                                  <div>
                                    <span className="text-sm text-gray-600">Notes:</span>
                                    <p className="text-sm text-gray-900 bg-white p-2 rounded mt-1">{record.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{averageProcessingTime.toFixed(1)} hrs</div>
              <div className="text-sm text-gray-600">Average Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalVerifications}</div>
              <div className="text-sm text-gray-600">Total Verifications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationHistory
