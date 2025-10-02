import { useState, useEffect } from 'react'
import {
  Fingerprint,
  Eye,
  Shield,
  Database,
  Search,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye as ViewIcon,
  Lock,
  Unlock,
  RefreshCw,
  FileText,
  Calendar,
  MapPin,
  UserCheck,
  AlertCircle,
  XCircle,
  Info
} from 'lucide-react'

// Types
interface BiometricRecord {
  id: string
  employeeId: string
  employeeName: string
  biometricType: 'fingerprint' | 'facial' | 'iris' | 'voice' | 'palm'
  status: 'active' | 'inactive' | 'expired' | 'pending'
  quality: 'excellent' | 'good' | 'fair' | 'poor'
  lastUpdated: string
  department: string
  position: string
  accessLevel: 'basic' | 'standard' | 'premium' | 'admin'
  securityClearance: 'public' | 'confidential' | 'secret' | 'top-secret'
  complianceStatus: 'compliant' | 'non-compliant' | 'pending-review'
  dataRetention: string
  encryptionStatus: 'encrypted' | 'unencrypted' | 'pending'
}

interface BiobankStats {
  totalRecords: number
  activeRecords: number
  pendingRecords: number
  expiredRecords: number
  complianceRate: number
  securityScore: number
  lastBackup: string
  storageUsed: string
  encryptionRate: number
}

interface SecurityEvent {
  id: string
  type: 'access' | 'modification' | 'deletion' | 'breach' | 'compliance'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  timestamp: string
  user: string
  status: 'resolved' | 'investigating' | 'pending'
}

const Biobank = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'security' | 'analytics' | 'settings'>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<BiometricRecord | null>(null)
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [showSecurityModal, setShowSecurityModal] = useState(false)

  // Mock data
  const biobankStats: BiobankStats = {
    totalRecords: 2847,
    activeRecords: 2654,
    pendingRecords: 123,
    expiredRecords: 70,
    complianceRate: 94.2,
    securityScore: 87.5,
    lastBackup: '2024-01-15 14:30',
    storageUsed: '2.4 TB',
    encryptionRate: 98.7
  }

  const biometricRecords: BiometricRecord[] = [
    {
      id: 'BR001',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      biometricType: 'fingerprint',
      status: 'active',
      quality: 'excellent',
      lastUpdated: '2024-01-15 10:30',
      department: 'IT',
      position: 'Software Engineer',
      accessLevel: 'standard',
      securityClearance: 'confidential',
      complianceStatus: 'compliant',
      dataRetention: '7 years',
      encryptionStatus: 'encrypted'
    },
    {
      id: 'BR002',
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      biometricType: 'facial',
      status: 'active',
      quality: 'good',
      lastUpdated: '2024-01-14 16:45',
      department: 'HR',
      position: 'HR Manager',
      accessLevel: 'premium',
      securityClearance: 'secret',
      complianceStatus: 'compliant',
      dataRetention: '10 years',
      encryptionStatus: 'encrypted'
    },
    {
      id: 'BR003',
      employeeId: 'EMP003',
      employeeName: 'Mike Davis',
      biometricType: 'iris',
      status: 'pending',
      quality: 'fair',
      lastUpdated: '2024-01-13 09:15',
      department: 'Finance',
      position: 'Financial Analyst',
      accessLevel: 'basic',
      securityClearance: 'public',
      complianceStatus: 'pending-review',
      dataRetention: '5 years',
      encryptionStatus: 'pending'
    },
    {
      id: 'BR004',
      employeeId: 'EMP004',
      employeeName: 'Lisa Wilson',
      biometricType: 'voice',
      status: 'expired',
      quality: 'poor',
      lastUpdated: '2023-12-20 14:20',
      department: 'Operations',
      position: 'Operations Manager',
      accessLevel: 'standard',
      securityClearance: 'confidential',
      complianceStatus: 'non-compliant',
      dataRetention: '7 years',
      encryptionStatus: 'encrypted'
    }
  ]

  const securityEvents: SecurityEvent[] = [
    {
      id: 'SE001',
      type: 'access',
      severity: 'medium',
      description: 'Unauthorized access attempt to biometric data',
      timestamp: '2024-01-15 11:30',
      user: 'Unknown',
      status: 'investigating'
    },
    {
      id: 'SE002',
      type: 'modification',
      severity: 'low',
      description: 'Biometric record updated by authorized user',
      timestamp: '2024-01-15 10:15',
      user: 'admin@company.com',
      status: 'resolved'
    },
    {
      id: 'SE003',
      type: 'compliance',
      severity: 'high',
      description: 'Data retention policy violation detected',
      timestamp: '2024-01-14 16:45',
      user: 'System',
      status: 'pending'
    }
  ]

  const filteredRecords = biometricRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || record.status === statusFilter
    const matchesType = !typeFilter || record.biometricType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'expired': return 'text-red-600 bg-red-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getBiometricIcon = (type: string) => {
    switch (type) {
      case 'fingerprint': return <Fingerprint className="h-5 w-5" />
      case 'facial': return <Eye className="h-5 w-5" />
      case 'iris': return <Eye className="h-5 w-5" />
      case 'voice': return <Users className="h-5 w-5" />
      case 'palm': return <Fingerprint className="h-5 w-5" />
      default: return <Database className="h-5 w-5" />
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{biobankStats.totalRecords.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Records</p>
              <p className="text-2xl font-bold text-gray-900">{biobankStats.activeRecords.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">{((biobankStats.activeRecords / biobankStats.totalRecords) * 100).toFixed(1)}% of total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{biobankStats.complianceRate}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+2.1% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-gray-900">{biobankStats.securityScore}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Lock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Encryption: {biobankStats.encryptionRate}%</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Security Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {securityEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.description}</p>
                    <p className="text-sm text-gray-500">{event.timestamp} • {event.user}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === 'resolved' ? 'text-green-600 bg-green-100' :
                    event.status === 'investigating' ? 'text-yellow-600 bg-yellow-100' :
                    'text-gray-600 bg-gray-100'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <Plus className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">Add Biometric Record</span>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <Download className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">Export Data</span>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <RefreshCw className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">Run Security Scan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecords = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="fingerprint">Fingerprint</option>
            <option value="facial">Facial</option>
            <option value="iris">Iris</option>
            <option value="voice">Voice</option>
            <option value="palm">Palm</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biometric Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Security
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                      <div className="text-sm text-gray-500">{record.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getBiometricIcon(record.biometricType)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">{record.biometricType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {record.quality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {record.encryptionStatus === 'encrypted' ? (
                        <Lock className="h-4 w-4 text-green-500" />
                      ) : (
                        <Unlock className="h-4 w-4 text-red-500" />
                      )}
                      <span className="ml-1 text-sm text-gray-900 capitalize">{record.encryptionStatus}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRecord(record)
                          setShowRecordModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <ViewIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
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
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Encryption Rate</p>
              <p className="text-2xl font-bold text-gray-900">{biobankStats.encryptionRate}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Lock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-sm font-bold text-gray-900">{biobankStats.lastBackup}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">{biobankStats.storageUsed}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Security Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.description}</p>
                    <p className="text-sm text-gray-500">{event.timestamp} • {event.user}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === 'resolved' ? 'text-green-600 bg-green-100' :
                    event.status === 'investigating' ? 'text-yellow-600 bg-yellow-100' :
                    'text-gray-600 bg-gray-100'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biometric Type Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Biometric Type Distribution</h3>
          <div className="space-y-3">
            {['fingerprint', 'facial', 'iris', 'voice', 'palm'].map((type) => {
              const count = biometricRecords.filter(r => r.biometricType === type).length
              const percentage = (count / biometricRecords.length) * 100
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getBiometricIcon(type)}
                    <span className="ml-2 text-sm font-medium text-gray-900 capitalize">{type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <div className="space-y-3">
            {['active', 'pending', 'expired', 'inactive'].map((status) => {
              const count = biometricRecords.filter(r => r.status === status).length
              const percentage = (count / biometricRecords.length) * 100
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[1]}`}></div>
                    <span className="ml-2 text-sm font-medium text-gray-900 capitalize">{status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getStatusColor(status).split(' ')[1]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{biobankStats.complianceRate}%</div>
            <div className="text-sm text-gray-500">Overall Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{biobankStats.encryptionRate}%</div>
            <div className="text-sm text-gray-500">Data Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{biobankStats.securityScore}</div>
            <div className="text-sm text-gray-500">Security Score</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Biobank Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Policy</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>5 years</option>
              <option>7 years</option>
              <option>10 years</option>
              <option>Indefinite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Standard</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>AES-256</option>
              <option>AES-128</option>
              <option>RSA-2048</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biobank Management</h1>
          <p className="text-gray-600">Secure biometric data storage and verification</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'records', name: 'Records', icon: Database },
            { id: 'security', name: 'Security', icon: Shield },
            { id: 'analytics', name: 'Analytics', icon: TrendingUp },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'records' && renderRecords()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Biometric Record Details</h3>
                <button
                  onClick={() => setShowRecordModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                  <p className="text-sm text-gray-900">{selectedRecord.employeeName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <p className="text-sm text-gray-900">{selectedRecord.employeeId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Biometric Type</label>
                  <p className="text-sm text-gray-900 capitalize">{selectedRecord.biometricType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRecord.status)}`}>
                    {selectedRecord.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quality</label>
                  <p className="text-sm text-gray-900 capitalize">{selectedRecord.quality}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Encryption Status</label>
                  <div className="flex items-center">
                    {selectedRecord.encryptionStatus === 'encrypted' ? (
                      <Lock className="h-4 w-4 text-green-500" />
                    ) : (
                      <Unlock className="h-4 w-4 text-red-500" />
                    )}
                    <span className="ml-1 text-sm text-gray-900 capitalize">{selectedRecord.encryptionStatus}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-sm text-gray-900">{selectedRecord.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <p className="text-sm text-gray-900">{selectedRecord.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Security Clearance</label>
                  <p className="text-sm text-gray-900">{selectedRecord.securityClearance}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data Retention</label>
                  <p className="text-sm text-gray-900">{selectedRecord.dataRetention}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                  <p className="text-sm text-gray-900">{selectedRecord.lastUpdated}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Compliance Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedRecord.complianceStatus === 'compliant' ? 'text-green-600 bg-green-100' :
                    selectedRecord.complianceStatus === 'non-compliant' ? 'text-red-600 bg-red-100' :
                    'text-yellow-600 bg-yellow-100'
                  }`}>
                    {selectedRecord.complianceStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowRecordModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Biobank
