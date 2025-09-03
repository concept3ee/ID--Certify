import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Eye,
  FileText,
  Plus,
  Download,
  RefreshCw,
  Shield,
  UserCheck,
  Building,
  GraduationCap,
  MapPin,
  CreditCard,
  Fingerprint,
  AlertTriangle,
  XCircle,
  Calendar,
  TrendingUp,
  BarChart3,
  Circle
} from 'lucide-react'

// Verification Status Types
type VerificationStatus = 'not_started' | 'pending' | 'in_progress' | 'completed' | 'expired' | 'failed' | 'requires_info' | 'cancelled'

// Verification Types
type VerificationType = 
  | 'bvn-verification' 
  | 'nin-verification' 
  | 'employment-verification' 
  | 'education-verification' 
  | 'address-verification' 
  | 'income-verification' 
  | 'reference-verification' 
  | 'business-verification' 
  | 'facial-verification' 
  | 'fingerprint-verification' 
  | 'frsc-verification' 
  | 'immigration-verification' 
  | 'cac-verification' 
  | 'firs-verification'
  | 'passport-verification'
  | 'driver-license-verification'

interface VerificationRecord {
  id: string
  type: VerificationType
  title: string
  description: string
  status: VerificationStatus
  priority: 'low' | 'medium' | 'high' | 'critical'
  trustScoreImpact: number
  initiatedDate?: string
  completedDate?: string
  expiryDate?: string
  assignedTo?: string
  progress?: number
  issues?: string[]
  metadata?: Record<string, any>
  cost?: number
  category: 'identity' | 'financial' | 'employment' | 'education' | 'biometric' | 'business' | 'government'
}

const Biobank = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'verifications' | 'initiate' | 'analytics'>('overview')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [priorityFilter, setPriorityFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVerification, setSelectedVerification] = useState<VerificationRecord | null>(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  // Mock verification data - comprehensive verification records
  const verificationRecords: VerificationRecord[] = [
    // Identity Verifications
    {
      id: '1',
      type: 'bvn-verification',
      title: 'BVN Verification',
      description: 'Bank Verification Number validation for financial transactions',
      status: 'completed',
      priority: 'high',
      trustScoreImpact: 25,
      initiatedDate: '2024-08-15',
      completedDate: '2024-08-20',
      category: 'financial',
      cost: 500
    },
    {
      id: '2',
      type: 'nin-verification',
      title: 'NIN Verification',
      description: 'National Identity Number validation',
      status: 'pending',
      priority: 'critical',
      trustScoreImpact: 30,
      initiatedDate: '2024-08-25',
      category: 'identity',
      progress: 65,
      assignedTo: 'System AI',
      cost: 750
    },
    {
      id: '3',
      type: 'passport-verification',
      title: 'Passport Verification',
      description: 'International passport validation',
      status: 'completed',
      priority: 'medium',
      trustScoreImpact: 20,
      initiatedDate: '2024-07-10',
      completedDate: '2024-07-15',
      category: 'identity',
      cost: 1000
    },
    // Employment Verifications
    {
      id: '4',
      type: 'employment-verification',
      title: 'Employment Verification',
      description: 'Current employment status and history validation',
      status: 'in_progress',
      priority: 'high',
      trustScoreImpact: 35,
      initiatedDate: '2024-08-20',
      category: 'employment',
      progress: 40,
      assignedTo: 'HR Department',
      cost: 800
    },
    {
      id: '5',
      type: 'income-verification',
      title: 'Income Verification',
      description: 'Salary and income documentation validation',
      status: 'not_started',
      priority: 'medium',
      trustScoreImpact: 25,
      category: 'employment',
      cost: 600
    },
    // Education Verifications
    {
      id: '6',
      type: 'education-verification',
      title: 'Education Verification',
      description: 'Academic credentials and qualifications validation',
      status: 'requires_info',
      priority: 'medium',
      trustScoreImpact: 20,
      category: 'education',
      initiatedDate: '2024-08-18',
      issues: ['Missing transcript', 'Incomplete degree information'],
      cost: 700
    },
    // Address Verifications
    {
      id: '7',
      type: 'address-verification',
      title: 'Address Verification',
      description: 'Residential address validation and confirmation',
      status: 'expired',
      priority: 'low',
      trustScoreImpact: 15,
      initiatedDate: '2024-06-01',
      expiryDate: '2024-08-01',
      category: 'identity',
      cost: 400
    },
    // Biometric Verifications
    {
      id: '8',
      type: 'facial-verification',
      title: 'Facial Recognition',
      description: 'Biometric facial verification for identity confirmation',
      status: 'completed',
      priority: 'high',
      trustScoreImpact: 40,
      initiatedDate: '2024-08-10',
      completedDate: '2024-08-12',
      category: 'biometric',
      cost: 1200
    },
    {
      id: '9',
      type: 'fingerprint-verification',
      title: 'Fingerprint Verification',
      description: 'Biometric fingerprint validation',
      status: 'failed',
      priority: 'critical',
      trustScoreImpact: -10,
      initiatedDate: '2024-08-22',
      issues: ['Poor quality scan', 'Multiple attempts exceeded'],
      category: 'biometric',
      cost: 800
    },
    // Government Verifications
    {
      id: '10',
      type: 'frsc-verification',
      title: 'FRSC Verification',
      description: 'Federal Road Safety Corps driver license validation',
      status: 'not_started',
      priority: 'medium',
      trustScoreImpact: 20,
      category: 'government',
      cost: 600
    },
    {
      id: '11',
      type: 'immigration-verification',
      title: 'Immigration Verification',
      description: 'Immigration status and travel history validation',
      status: 'cancelled',
      priority: 'low',
      trustScoreImpact: 0,
      initiatedDate: '2024-08-05',
      category: 'government',
      cost: 900
    },
    // Business Verifications
    {
      id: '12',
      type: 'business-verification',
      title: 'Business Verification',
      description: 'Business registration and operational status validation',
      status: 'pending',
      priority: 'high',
      trustScoreImpact: 30,
      initiatedDate: '2024-08-28',
      category: 'business',
      progress: 20,
      assignedTo: 'Business Registry',
      cost: 1100
    }
  ]

  // Helper functions
  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'not_started': return 'bg-gray-100 text-gray-600'
      case 'expired': return 'bg-orange-100 text-orange-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'requires_info': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-gray-100 text-gray-500'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'in_progress': return <RefreshCw className="h-4 w-4" />
      case 'not_started': return <Circle className="h-4 w-4" />
      case 'expired': return <AlertTriangle className="h-4 w-4" />
      case 'failed': return <XCircle className="h-4 w-4" />
      case 'requires_info': return <AlertCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Circle className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'identity': return <UserCheck className="h-4 w-4" />
      case 'financial': return <CreditCard className="h-4 w-4" />
      case 'employment': return <Building className="h-4 w-4" />
      case 'education': return <GraduationCap className="h-4 w-4" />
      case 'biometric': return <Fingerprint className="h-4 w-4" />
      case 'business': return <Building className="h-4 w-4" />
      case 'government': return <Shield className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getVerificationTypeDisplay = (type: VerificationType) => {
    return type.replace('-verification', '').split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  // Filtered data
  const filteredVerifications = verificationRecords.filter(verification => {
    const matchesStatus = !statusFilter || verification.status === statusFilter
    const matchesCategory = !categoryFilter || verification.category === categoryFilter
    const matchesPriority = !priorityFilter || verification.priority === priorityFilter
    const matchesSearch = !searchTerm || 
      verification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch
  })

  // Statistics
  const stats = {
    total: verificationRecords.length,
    completed: verificationRecords.filter(v => v.status === 'completed').length,
    pending: verificationRecords.filter(v => v.status === 'pending').length,
    inProgress: verificationRecords.filter(v => v.status === 'in_progress').length,
    notStarted: verificationRecords.filter(v => v.status === 'not_started').length,
    expired: verificationRecords.filter(v => v.status === 'expired').length,
    failed: verificationRecords.filter(v => v.status === 'failed').length,
    requiresInfo: verificationRecords.filter(v => v.status === 'requires_info').length,
    cancelled: verificationRecords.filter(v => v.status === 'cancelled').length
  }

  const totalTrustScore = verificationRecords.reduce((sum, v) => sum + v.trustScoreImpact, 0)

  // Action handlers
  const handleInitiateVerification = (type: VerificationType) => {
    navigate('/individual/verification', { state: { preset: type } })
  }

  const handleViewVerification = (verification: VerificationRecord) => {
    setSelectedVerification(verification)
    setShowVerificationModal(true)
  }

  const handleResolveIssue = (verification: VerificationRecord) => {
    // Navigate to issue resolution flow
    navigate('/individual/verification', { state: { preset: verification.type, issue: true } })
  }

  const handleRenewVerification = (verification: VerificationRecord) => {
    // Navigate to renewal flow
    navigate('/individual/verification', { state: { preset: verification.type, renewal: true } })
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Section Header Row - Title, Centered Navigation, and Action Button */}
          <div className="flex items-center">
            {/* Left Side - Title Only */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Verification Biobank</h1>
            </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveMainTab('overview')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'overview'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('verifications')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'verifications'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>All Verifications</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('initiate')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'initiate'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Initiate New</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('analytics')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeMainTab === 'analytics'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Analytics</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeMainTab === 'overview' ? (
        <div className="px-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Completed</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">In Progress</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.pending + stats.inProgress}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Issues</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.failed + stats.requiresInfo}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Trust Score</div>
                  <div className="text-2xl font-bold text-blue-600">{totalTrustScore}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveMainTab('initiate')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Plus className="h-5 w-5 text-blue-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Start New Verification</div>
                  <div className="text-sm text-gray-500">Initiate a new verification process</div>
                </div>
              </button>
              <button 
                onClick={() => setActiveMainTab('verifications')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <Eye className="h-5 w-5 text-green-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">View All Verifications</div>
                  <div className="text-sm text-gray-500">Monitor all verification activities</div>
                </div>
              </button>
              <button 
                onClick={() => setActiveMainTab('analytics')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-500">Track performance and insights</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {verificationRecords.slice(0, 5).map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(verification.category)}
                    <div>
                      <div className="font-medium text-gray-900">{verification.title}</div>
                      <div className="text-sm text-gray-500">{verification.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                      {getStatusIcon(verification.status)}
                      <span className="ml-1">{verification.status.replace('_', ' ').toUpperCase()}</span>
                    </span>
                    <button 
                      onClick={() => handleViewVerification(verification)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeMainTab === 'verifications' ? (
        <div className="px-6 space-y-6">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    placeholder="Search verifications..." 
                    className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm w-64" 
                  />
                </div>
                <select 
                  value={statusFilter} 
                  onChange={e => setStatusFilter(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="not_started">Not Started</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="expired">Expired</option>
                  <option value="failed">Failed</option>
                  <option value="requires_info">Requires Info</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select 
                  value={categoryFilter} 
                  onChange={e => setCategoryFilter(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="identity">Identity</option>
                  <option value="financial">Financial</option>
                  <option value="employment">Employment</option>
                  <option value="education">Education</option>
                  <option value="biometric">Biometric</option>
                  <option value="business">Business</option>
                  <option value="government">Government</option>
                </select>
                <select 
                  value={priorityFilter} 
                  onChange={e => setPriorityFilter(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Verifications Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trust Impact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVerifications.map((verification) => (
                    <tr key={verification.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getCategoryIcon(verification.category)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{verification.title}</div>
                            <div className="text-sm text-gray-500">{verification.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {verification.category.charAt(0).toUpperCase() + verification.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                          {getStatusIcon(verification.status)}
                          <span className="ml-1">{verification.status.replace('_', ' ').toUpperCase()}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}>
                          {verification.priority.charAt(0).toUpperCase() + verification.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {verification.progress ? (
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${verification.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{verification.progress}%</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${verification.trustScoreImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {verification.trustScoreImpact >= 0 ? '+' : ''}{verification.trustScoreImpact}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleViewVerification(verification)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {verification.status === 'not_started' && (
                            <button 
                              onClick={() => handleInitiateVerification(verification.type)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          )}
                          {verification.status === 'requires_info' && (
                            <button 
                              onClick={() => handleResolveIssue(verification)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </button>
                          )}
                          {verification.status === 'expired' && (
                            <button 
                              onClick={() => handleRenewVerification(verification)}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              <RefreshCw className="h-4 w-4" />
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
        </div>
      ) : activeMainTab === 'initiate' ? (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Initiate New Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verificationRecords.filter(v => v.status === 'not_started').map((verification) => (
                <div key={verification.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3 mb-4">
                    {getCategoryIcon(verification.category)}
                    <div>
                      <h4 className="font-medium text-gray-900">{verification.title}</h4>
                      <p className="text-sm text-gray-500">{verification.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}>
                        {verification.priority.charAt(0).toUpperCase() + verification.priority.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Trust Impact:</span>
                      <span className="font-medium text-gray-900">+{verification.trustScoreImpact}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium text-gray-900">₦{verification.cost}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleInitiateVerification(verification.type)}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start Verification
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeMainTab === 'analytics' ? (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Verification Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Status Distribution</h4>
                <div className="space-y-3">
                  {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Trust Score Trend</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{totalTrustScore}</div>
                  <div className="text-sm text-gray-500">Total Trust Score Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Verification Details Modal */}
      {showVerificationModal && selectedVerification && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedVerification.title}</h3>
                <button 
                  onClick={() => setShowVerificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedVerification.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedVerification.status)}`}>
                      {getStatusIcon(selectedVerification.status)}
                      <span className="ml-1">{selectedVerification.status.replace('_', ' ').toUpperCase()}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedVerification.priority)}`}>
                      {selectedVerification.priority.charAt(0).toUpperCase() + selectedVerification.priority.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <span className="text-sm text-gray-900">{selectedVerification.category.charAt(0).toUpperCase() + selectedVerification.category.slice(1)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trust Score Impact</label>
                    <span className={`text-sm font-medium ${selectedVerification.trustScoreImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedVerification.trustScoreImpact >= 0 ? '+' : ''}{selectedVerification.trustScoreImpact}
                    </span>
                  </div>
                </div>
                {selectedVerification.issues && selectedVerification.issues.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issues</label>
                    <ul className="mt-1 text-sm text-red-600">
                      {selectedVerification.issues.map((issue, index) => (
                        <li key={index}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    onClick={() => setShowVerificationModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {selectedVerification.status === 'not_started' && (
                    <button 
                      onClick={() => {
                        handleInitiateVerification(selectedVerification.type)
                        setShowVerificationModal(false)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Start Verification
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Biobank
