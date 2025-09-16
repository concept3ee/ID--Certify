import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Users,
  Building,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Camera,
  Shield,
  TrendingUp,
  BarChart3,
  MoreVertical,
  Play,
  Pause,
  RotateCcw,
  Send,
  MessageSquare,
  ExternalLink,
  Copy,
  Archive,
  Trash2
} from 'lucide-react'

interface CustomerVerification {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerType: 'individual' | 'business'
  flowId: string
  flowName: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'expired' | 'cancelled'
  progress: number
  startedAt: string
  completedAt?: string
  estimatedCompletion?: string
  steps: VerificationStep[]
  documents: Document[]
  results: VerificationResults
  appName: string
  country: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  verificationTypes: VerificationType[]
  metadata: CustomerMetadata
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
  notes?: string
  tags: string[]
}

interface VerificationType {
  id: string
  name: string
  type: 'government_lookup' | 'document_analysis' | 'biometric_verification' | 'aml_screening' | 'address_verification' | 'phone_verification' | 'liveness_check'
  status: 'completed' | 'pending' | 'failed' | 'not_started'
  completedAt?: string
  results?: any
  required: boolean
}

interface CustomerMetadata {
  ipAddress: string
  userAgent: string
  deviceType: string
  location: string
}

interface VerificationStep {
  id: string
  name: string
  type: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped'
  startedAt?: string
  completedAt?: string
  duration?: number
  data?: any
  errors?: string[]
}

interface Document {
  id: string
  name: string
  type: string
  status: 'uploaded' | 'processing' | 'verified' | 'rejected'
  uploadedAt: string
  verifiedAt?: string
  url: string
  metadata: any
}

interface VerificationResults {
  overallScore: number
  confidence: number
  riskLevel: 'low' | 'medium' | 'high'
  flags: string[]
  recommendations: string[]
  compliance: {
    kyc: boolean
    aml: boolean
    gdpr: boolean
  }
}

interface CustomerMetadata {
  ipAddress: string
  userAgent: string
  location: string
  device: string
  browser: string
  referrer?: string
  campaign?: string
}

interface CustomerVerificationDashboardProps {
  onViewDetails: (verification: CustomerVerification) => void
  onBulkAction: (action: string, verificationIds: string[]) => void
  onExport: (verifications: CustomerVerification[]) => void
}

const CustomerVerificationDashboard: React.FC<CustomerVerificationDashboardProps> = ({
  onViewDetails,
  onBulkAction,
  onExport
}) => {
  const [verifications, setVerifications] = useState<CustomerVerification[]>([])
  const [filteredVerifications, setFilteredVerifications] = useState<CustomerVerification[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [dateRange, setDateRange] = useState('7d')
  const [selectedVerifications, setSelectedVerifications] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [sortBy, setSortBy] = useState('newest')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadVerifications()
  }, [])

  useEffect(() => {
    filterVerifications()
  }, [verifications, searchQuery, statusFilter, typeFilter, priorityFilter, dateRange, sortBy])

  const loadVerifications = async () => {
    setIsLoading(true)
    // Mock data - in real app, this would come from API
    const mockVerifications: CustomerVerification[] = [
      {
        id: '1',
        customerId: 'cust_001',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerType: 'individual',
        flowId: 'flow_kyc_001',
        flowName: 'Standard KYC Verification',
        status: 'completed',
        progress: 100,
        startedAt: '2024-01-20T10:30:00Z',
        completedAt: '2024-01-20T10:45:00Z',
        appName: 'ID-Certify App',
        country: 'USA',
        dateOfBirth: '1990-01-15',
        gender: 'Male',
        phoneNumber: '+1-555-0123',
        verificationTypes: [
          { id: '1', name: 'Document Verification', type: 'document_analysis', required: true, status: 'completed' },
          { id: '2', name: 'Face Matching', type: 'biometric_verification', required: true, status: 'completed' },
          { id: '3', name: 'Liveness Check', type: 'liveness_check', required: true, status: 'completed' }
        ],
        steps: [
          { id: '1', name: 'Document Upload', type: 'document-upload', status: 'completed', startedAt: '2024-01-20T10:30:00Z', completedAt: '2024-01-20T10:35:00Z', duration: 300 },
          { id: '2', name: 'Face Matching', type: 'face-match', status: 'completed', startedAt: '2024-01-20T10:35:00Z', completedAt: '2024-01-20T10:40:00Z', duration: 300 },
          { id: '3', name: 'Liveness Check', type: 'liveness-check', status: 'completed', startedAt: '2024-01-20T10:40:00Z', completedAt: '2024-01-20T10:45:00Z', duration: 300 }
        ],
        documents: [
          { id: '1', name: 'passport.pdf', type: 'passport', status: 'verified', uploadedAt: '2024-01-20T10:32:00Z', verifiedAt: '2024-01-20T10:35:00Z', url: '/documents/passport.pdf', metadata: {} }
        ],
        results: {
          overallScore: 95,
          confidence: 0.92,
          riskLevel: 'low',
          flags: [],
          recommendations: ['Verification completed successfully'],
          compliance: { kyc: true, aml: true, gdpr: true }
        },
        metadata: {
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          location: 'New York, NY, USA',
          device: 'Desktop',
          deviceType: 'desktop',
          browser: 'Chrome',
          referrer: 'https://example.com',
          campaign: 'signup-2024'
        },
        priority: 'medium',
        tags: ['kyc', 'completed', 'high-confidence']
      },
      {
        id: '2',
        customerId: 'cust_002',
        customerName: 'Acme Corporation',
        customerEmail: 'legal@acme.com',
        customerType: 'business',
        flowId: 'flow_business_001',
        flowName: 'Business Verification',
        status: 'in-progress',
        progress: 60,
        startedAt: '2024-01-20T14:00:00Z',
        estimatedCompletion: '2024-01-20T16:00:00Z',
        appName: 'ID-Certify Business',
        country: 'USA',
        dateOfBirth: '1985-03-20',
        gender: 'N/A',
        phoneNumber: '+1-555-0456',
        verificationTypes: [
          { id: '1', name: 'Business Registration', type: 'document_analysis', required: true, status: 'completed' },
          { id: '2', name: 'Authorized Representative', type: 'biometric_verification', required: true, status: 'pending' },
          { id: '3', name: 'Business Verification', type: 'government_lookup', required: true, status: 'pending' }
        ],
        steps: [
          { id: '1', name: 'Business Registration', type: 'document-upload', status: 'completed', startedAt: '2024-01-20T14:00:00Z', completedAt: '2024-01-20T14:15:00Z', duration: 900 },
          { id: '2', name: 'Authorized Representative', type: 'face-match', status: 'in-progress', startedAt: '2024-01-20T14:15:00Z' },
          { id: '3', name: 'Business Verification', type: 'approval', status: 'pending' }
        ],
        documents: [
          { id: '1', name: 'business_license.pdf', type: 'business-license', status: 'verified', uploadedAt: '2024-01-20T14:05:00Z', verifiedAt: '2024-01-20T14:15:00Z', url: '/documents/business_license.pdf', metadata: {} }
        ],
        results: {
          overallScore: 0,
          confidence: 0,
          riskLevel: 'medium',
          flags: [],
          recommendations: [],
          compliance: { kyc: false, aml: false, gdpr: false }
        },
        metadata: {
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          location: 'San Francisco, CA, USA',
          device: 'Desktop',
          deviceType: 'desktop',
          browser: 'Safari'
        },
        priority: 'high',
        assignedTo: 'reviewer_001',
        tags: ['business', 'in-progress', 'high-priority']
      },
      {
        id: '3',
        customerId: 'cust_003',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        customerType: 'individual',
        flowId: 'flow_kyc_001',
        flowName: 'Standard KYC Verification',
        status: 'failed',
        progress: 40,
        startedAt: '2024-01-20T09:00:00Z',
        appName: 'ID-Certify App',
        country: 'USA',
        dateOfBirth: '1988-07-10',
        gender: 'Female',
        phoneNumber: '+1-555-0789',
        verificationTypes: [
          { id: '1', name: 'Document Verification', type: 'document_analysis', required: true, status: 'completed' },
          { id: '2', name: 'Face Matching', type: 'biometric_verification', required: true, status: 'completed' },
          { id: '3', name: 'Liveness Check', type: 'liveness_check', required: true, status: 'completed' }
        ],
        steps: [
          { id: '1', name: 'Document Upload', type: 'document-upload', status: 'failed', startedAt: '2024-01-20T09:00:00Z', errors: ['Document quality too low', 'Unable to extract text'] },
          { id: '2', name: 'Face Matching', type: 'face-match', status: 'pending' },
          { id: '3', name: 'Liveness Check', type: 'liveness-check', status: 'pending' }
        ],
        documents: [
          { id: '1', name: 'id_blurry.jpg', type: 'drivers-license', status: 'rejected', uploadedAt: '2024-01-20T09:05:00Z', url: '/documents/id_blurry.jpg', metadata: {} }
        ],
        results: {
          overallScore: 0,
          confidence: 0,
          riskLevel: 'high',
          flags: ['document-quality', 'extraction-failed'],
          recommendations: ['Please upload a clearer image of your ID', 'Ensure good lighting and focus'],
          compliance: { kyc: false, aml: false, gdpr: false }
        },
        metadata: {
          ipAddress: '192.168.1.102',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
          location: 'Chicago, IL, USA',
          device: 'Mobile',
          deviceType: 'mobile',
          browser: 'Safari'
        },
        priority: 'medium',
        notes: 'Customer needs to retry with better document quality',
        tags: ['kyc', 'failed', 'document-issue']
      }
    ]

    setTimeout(() => {
      setVerifications(mockVerifications)
      setIsLoading(false)
    }, 1000)
  }

  const filterVerifications = () => {
    let filtered = verifications

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(verification =>
        verification.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verification.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verification.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verification.flowName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(verification => verification.status === statusFilter)
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(verification => verification.customerType === typeFilter)
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(verification => verification.priority === priorityFilter)
    }

    // Date range filter
    const now = new Date()
    const daysAgo = parseInt(dateRange.replace('d', ''))
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    filtered = filtered.filter(verification => 
      new Date(verification.startedAt) >= cutoffDate
    )

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())
        break
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress)
        break
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
        break
    }

    setFilteredVerifications(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'expired':
        return <Clock className="h-4 w-4 text-gray-600" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      case 'high':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatDuration = (startedAt: string, completedAt?: string) => {
    const start = new Date(startedAt)
    const end = completedAt ? new Date(completedAt) : new Date()
    const diffMs = end.getTime() - start.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 60) {
      return `${diffMins}m`
    } else {
      const hours = Math.floor(diffMins / 60)
      const mins = diffMins % 60
      return `${hours}h ${mins}m`
    }
  }

  const handleSelectVerification = (verificationId: string) => {
    setSelectedVerifications(prev =>
      prev.includes(verificationId)
        ? prev.filter(id => id !== verificationId)
        : [...prev, verificationId]
    )
  }

  const handleSelectAll = () => {
    if (selectedVerifications.length === filteredVerifications.length) {
      setSelectedVerifications([])
    } else {
      setSelectedVerifications(filteredVerifications.map(v => v.id))
    }
  }

  const handleBulkAction = (action: string) => {
    onBulkAction(action, selectedVerifications)
    setSelectedVerifications([])
  }

  const handleExport = () => {
    const verificationsToExport = selectedVerifications.length > 0
      ? filteredVerifications.filter(v => selectedVerifications.includes(v.id))
      : filteredVerifications
    onExport(verificationsToExport)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Verifications</h1>
          <p className="text-gray-600">Monitor and manage customer verification processes</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={loadVerifications}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{verifications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {verifications.filter(v => v.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {verifications.filter(v => v.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">
                {verifications.filter(v => v.status === 'failed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="progress">Progress</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded ${viewMode === 'cards' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Users className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedVerifications.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedVerifications.length} selected
              </span>
              <select
                onChange={(e) => handleBulkAction(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Bulk Actions</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
                <option value="resend">Resend</option>
                <option value="archive">Archive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Verifications Table/Cards */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedVerifications.length === filteredVerifications.length && filteredVerifications.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVerifications.map((verification) => (
                  <tr key={verification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedVerifications.includes(verification.id)}
                        onChange={() => handleSelectVerification(verification.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {verification.customerType === 'business' ? (
                              <Building className="h-5 w-5 text-gray-600" />
                            ) : (
                              <Users className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {verification.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {verification.customerEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{verification.flowName}</div>
                      <div className="text-sm text-gray-500">{verification.customerId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(verification.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(verification.status)}`}>
                          {verification.status.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${verification.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{verification.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDuration(verification.startedAt, verification.completedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(verification.priority)}`}>
                        {verification.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getRiskColor(verification.results.riskLevel)}`}>
                        {verification.results.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewDetails(verification)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVerifications.map((verification) => (
            <div key={verification.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    {verification.customerType === 'business' ? (
                      <Building className="h-6 w-6 text-gray-600" />
                    ) : (
                      <Users className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{verification.customerName}</h3>
                    <p className="text-sm text-gray-500">{verification.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(verification.status)}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(verification.status)}`}>
                    {verification.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Flow: {verification.flowName}</p>
                  <p className="text-sm text-gray-600">ID: {verification.customerId}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{verification.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${verification.progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900">{formatDuration(verification.startedAt, verification.completedAt)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Priority</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(verification.priority)}`}>
                    {verification.priority}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Risk Level</span>
                  <span className={`font-medium ${getRiskColor(verification.results.riskLevel)}`}>
                    {verification.results.riskLevel}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => onViewDetails(verification)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredVerifications.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No verifications found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading verifications...</p>
        </div>
      )}
    </div>
  )
}

export default CustomerVerificationDashboard
