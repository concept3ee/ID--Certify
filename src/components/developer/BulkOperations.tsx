import React, { useState, useEffect } from 'react'
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Upload, 
  RefreshCw, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight, 
  BarChart3, 
  Activity, 
  Clock, 
  DollarSign, 
  Shield, 
  Globe, 
  Server, 
  Network, 
  HardDrive, 
  Cpu, 
  Wifi, 
  WifiOff, 
  Bell, 
  Mail, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  ExternalLink, 
  Save, 
  X, 
  Zap, 
  Target, 
  Layers, 
  Grid, 
  List, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Desktop, 
  User, 
  UserCheck, 
  UserX, 
  Building, 
  Home, 
  LogIn, 
  LogOut, 
  Fingerprint, 
  Smartphone as Phone, 
  Mail as Email, 
  MessageSquare as Chat, 
  Calendar, 
  MapPin, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Award, 
  Flag, 
  AlertCircle, 
  Check, 
  Minus, 
  MoreHorizontal, 
  MoreVertical,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Settings,
  Play,
  Pause,
  RotateCcw,
  FileSpreadsheet,
  Send,
  Archive,
  Tag,
  UserPlus,
  UserMinus,
  Ban,
  CheckSquare,
  Square
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'pending' | 'verified' | 'rejected' | 'expired' | 'in-progress'
  verificationType: 'individual' | 'business' | 'kyc' | 'aml'
  submittedAt: string
  completedAt?: string
  trustScore: number
  documents: number
  riskLevel: 'low' | 'medium' | 'high'
  tags: string[]
  notes: string
}

interface BulkOperation {
  id: string
  name: string
  type: 'approve' | 'reject' | 'resend' | 'export' | 'tag' | 'archive' | 'delete'
  description: string
  icon: React.ComponentType<any>
  color: string
  requiresConfirmation: boolean
  batchSize: number
}

interface BulkOperationsProps {
  onExecuteOperation: (operation: BulkOperation, customerIds: string[]) => void
  onViewCustomer: (customer: Customer) => void
  onClose: () => void
}

const BulkOperations: React.FC<BulkOperationsProps> = ({
  onExecuteOperation,
  onViewCustomer,
  onClose
}) => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [sortBy, setSortBy] = useState('submittedAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isLoading, setIsLoading] = useState(false)
  const [showOperationModal, setShowOperationModal] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState<BulkOperation | null>(null)

  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    loadCustomersData()
  }, [])

  const loadCustomersData = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1-555-0123',
        company: 'Tech Corp',
        status: 'pending',
        verificationType: 'individual',
        submittedAt: '2024-01-20T10:30:00Z',
        trustScore: 85,
        documents: 3,
        riskLevel: 'low',
        tags: ['priority', 'vip'],
        notes: 'High-value customer, expedite processing'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        phone: '+1-555-0456',
        company: 'Finance Inc',
        status: 'verified',
        verificationType: 'business',
        submittedAt: '2024-01-19T14:20:00Z',
        completedAt: '2024-01-19T16:45:00Z',
        trustScore: 92,
        documents: 5,
        riskLevel: 'low',
        tags: ['verified', 'enterprise'],
        notes: 'Complete business verification'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike.chen@startup.io',
        phone: '+1-555-0789',
        company: 'StartupXYZ',
        status: 'rejected',
        verificationType: 'kyc',
        submittedAt: '2024-01-18T09:15:00Z',
        completedAt: '2024-01-18T11:30:00Z',
        trustScore: 45,
        documents: 2,
        riskLevel: 'high',
        tags: ['rejected', 'review'],
        notes: 'Incomplete documentation, requires resubmission'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@consulting.com',
        phone: '+1-555-0321',
        company: 'Davis Consulting',
        status: 'in-progress',
        verificationType: 'aml',
        submittedAt: '2024-01-17T16:45:00Z',
        trustScore: 78,
        documents: 4,
        riskLevel: 'medium',
        tags: ['in-progress', 'aml'],
        notes: 'AML screening in progress'
      },
      {
        id: '5',
        name: 'Robert Wilson',
        email: 'robert.w@enterprise.com',
        phone: '+1-555-0654',
        company: 'Enterprise Solutions',
        status: 'expired',
        verificationType: 'business',
        submittedAt: '2024-01-15T12:00:00Z',
        completedAt: '2024-01-15T14:30:00Z',
        trustScore: 88,
        documents: 6,
        riskLevel: 'low',
        tags: ['expired', 'enterprise'],
        notes: 'Verification expired, needs renewal'
      }
    ]

    setTimeout(() => {
      setCustomers(mockCustomers)
      setIsLoading(false)
    }, 1000)
  }

  const bulkOperations: BulkOperation[] = [
    {
      id: '1',
      name: 'Approve Verifications',
      type: 'approve',
      description: 'Approve selected customer verifications',
      icon: CheckCircle,
      color: 'green',
      requiresConfirmation: true,
      batchSize: 50
    },
    {
      id: '2',
      name: 'Reject Verifications',
      type: 'reject',
      description: 'Reject selected customer verifications',
      icon: XCircle,
      color: 'red',
      requiresConfirmation: true,
      batchSize: 50
    },
    {
      id: '3',
      name: 'Resend Requests',
      type: 'resend',
      description: 'Resend verification requests to customers',
      icon: Send,
      color: 'blue',
      requiresConfirmation: false,
      batchSize: 100
    },
    {
      id: '4',
      name: 'Export Data',
      type: 'export',
      description: 'Export selected customer data',
      icon: Download,
      color: 'purple',
      requiresConfirmation: false,
      batchSize: 1000
    },
    {
      id: '5',
      name: 'Add Tags',
      type: 'tag',
      description: 'Add tags to selected customers',
      icon: Tag,
      color: 'orange',
      requiresConfirmation: false,
      batchSize: 100
    },
    {
      id: '6',
      name: 'Archive Customers',
      type: 'archive',
      description: 'Archive selected customer records',
      icon: Archive,
      color: 'gray',
      requiresConfirmation: true,
      batchSize: 100
    }
  ]

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    const matchesType = typeFilter === 'all' || customer.verificationType === typeFilter
    const matchesRisk = riskFilter === 'all' || customer.riskLevel === riskFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesRisk
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof Customer]
    const bValue = b[sortBy as keyof Customer]
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id))
    }
  }

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }

  const handleExecuteOperation = (operation: BulkOperation) => {
    setSelectedOperation(operation)
    setShowOperationModal(true)
  }

  const confirmOperation = () => {
    if (selectedOperation && selectedCustomers.length > 0) {
      onExecuteOperation(selectedOperation, selectedCustomers)
      setShowOperationModal(false)
      setSelectedOperation(null)
      setSelectedCustomers([])
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Operations</h1>
          <p className="text-gray-600">Manage multiple customer verifications at once</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {selectedCustomers.length} of {filteredCustomers.length} selected
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Bulk Operations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bulkOperations.map((operation) => {
            const Icon = operation.icon
            const isDisabled = selectedCustomers.length === 0
            return (
              <button
                key={operation.id}
                onClick={() => handleExecuteOperation(operation)}
                disabled={isDisabled}
                className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                  isDisabled 
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                    : `border-${operation.color}-200 bg-${operation.color}-50 hover:bg-${operation.color}-100`
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-6 w-6 ${isDisabled ? 'text-gray-400' : `text-${operation.color}-600`}`} />
                  <div className="text-left">
                    <h3 className={`font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>
                      {operation.name}
                    </h3>
                    <p className={`text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                      {operation.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search customers..."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="kyc">KYC</option>
              <option value="aml">AML</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="submittedAt">Submitted Date</option>
              <option value="name">Name</option>
              <option value="company">Company</option>
              <option value="trustScore">Trust Score</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Customers ({filteredCustomers.length})</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {selectedCustomers.length === filteredCustomers.length ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                <span>Select All</span>
              </button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading customers...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trust Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {customer.verificationType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getTrustScoreColor(customer.trustScore)}`}>
                        {customer.trustScore}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getRiskColor(customer.riskLevel)}`}>
                        {customer.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(customer.submittedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => onViewCustomer(customer)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Operation Confirmation Modal */}
      {showOperationModal && selectedOperation && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <selectedOperation.icon className={`h-6 w-6 text-${selectedOperation.color}-600`} />
              <h3 className="text-lg font-semibold text-gray-900">{selectedOperation.name}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Are you sure you want to {selectedOperation.name.toLowerCase()} {selectedCustomers.length} customer(s)?
            </p>
            
            {selectedOperation.requiresConfirmation && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-sm text-yellow-800">
                    This action cannot be undone. Please confirm your selection.
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowOperationModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmOperation}
                className={`px-4 py-2 bg-${selectedOperation.color}-600 text-white rounded-lg hover:bg-${selectedOperation.color}-700`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BulkOperations
