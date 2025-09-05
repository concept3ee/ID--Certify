import React, { useState } from 'react'
import { 
  Users, 
  UserCheck, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Download, 
  Upload, 
  MoreVertical, 
  ChevronRight, 
  ChevronDown, 
  Building, 
  Globe, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Flag, 
  Star, 
  XCircle, 
  Info, 
  ExternalLink, 
  RefreshCw, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react'

interface CustomerProfile {
  id: string
  name: string
  type: 'individual' | 'entity'
  status: 'new' | 'under-review' | 'approved' | 'rejected' | 'suspended'
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  kycStatus: 'not-started' | 'in-progress' | 'completed' | 'failed'
  cddLevel: 'standard' | 'enhanced' | 'simplified'
  pepStatus: 'not-pep' | 'pep' | 'pep-related' | 'under-review'
  sanctionsStatus: 'clear' | 'hit' | 'under-review'
  documents: CustomerDocument[]
  verificationHistory: VerificationRecord[]
  riskFactors: RiskFactor[]
  assignedTo: string
  createdAt: string
  lastUpdated: string
  nextReview: string
}

interface CustomerDocument {
  id: string
  type: 'passport' | 'drivers-license' | 'national-id' | 'utility-bill' | 'bank-statement' | 'certificate' | 'other'
  name: string
  status: 'pending' | 'verified' | 'rejected' | 'expired'
  uploadedDate: string
  expiryDate?: string
  verifiedBy?: string
  notes?: string
}

interface VerificationRecord {
  id: string
  type: 'identity' | 'address' | 'employment' | 'financial' | 'pep' | 'sanctions'
  status: 'passed' | 'failed' | 'pending' | 'manual-review'
  provider: string
  score?: number
  details: string
  timestamp: string
  reviewedBy?: string
}

interface RiskFactor {
  id: string
  category: 'geographic' | 'transactional' | 'behavioral' | 'document' | 'pep' | 'sanctions'
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'active' | 'mitigated' | 'resolved'
  detectedDate: string
  resolvedDate?: string
}

interface PEPRecord {
  id: string
  name: string
  position: string
  country: string
  relationship: 'self' | 'family' | 'business' | 'other'
  riskLevel: 'low' | 'medium' | 'high'
  source: string
  lastUpdated: string
}

const CustomerDueDiligence = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'pep-screening' | 'sanctions' | 'workflows' | 'analytics'>('customers')
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [expandedCustomers, setExpandedCustomers] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all')
  const [filterCDDLevel, setFilterCDDLevel] = useState<string>('all')

  // Mock data - in real implementation, this would come from API
  const customers: CustomerProfile[] = [
    {
      id: '1',
      name: 'John Smith',
      type: 'individual',
      status: 'under-review',
      riskLevel: 'high',
      kycStatus: 'in-progress',
      cddLevel: 'enhanced',
      pepStatus: 'pep',
      sanctionsStatus: 'clear',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20',
      nextReview: '2024-02-20',
      documents: [
        {
          id: '1-1',
          type: 'passport',
          name: 'US Passport',
          status: 'verified',
          uploadedDate: '2024-01-15',
          expiryDate: '2029-01-15',
          verifiedBy: 'Sarah Johnson'
        },
        {
          id: '1-2',
          type: 'utility-bill',
          name: 'Electricity Bill',
          status: 'pending',
          uploadedDate: '2024-01-18'
        }
      ],
      verificationHistory: [
        {
          id: '1-1',
          type: 'identity',
          status: 'passed',
          provider: 'Jumio',
          score: 95,
          details: 'Identity verification successful',
          timestamp: '2024-01-15T10:30:00Z',
          reviewedBy: 'Sarah Johnson'
        },
        {
          id: '1-2',
          type: 'pep',
          status: 'failed',
          provider: 'World-Check',
          details: 'PEP match found - Government official',
          timestamp: '2024-01-16T14:20:00Z'
        }
      ],
      riskFactors: [
        {
          id: '1-1',
          category: 'pep',
          description: 'Politically Exposed Person - Government official',
          severity: 'high',
          status: 'active',
          detectedDate: '2024-01-16'
        },
        {
          id: '1-2',
          category: 'geographic',
          description: 'High-risk jurisdiction - Country X',
          severity: 'medium',
          status: 'active',
          detectedDate: '2024-01-15'
        }
      ]
    },
    {
      id: '2',
      name: 'TechCorp Solutions Ltd',
      type: 'entity',
      status: 'approved',
      riskLevel: 'low',
      kycStatus: 'completed',
      cddLevel: 'standard',
      pepStatus: 'not-pep',
      sanctionsStatus: 'clear',
      assignedTo: 'Mike Chen',
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18',
      nextReview: '2024-07-10',
      documents: [
        {
          id: '2-1',
          type: 'certificate',
          name: 'Certificate of Incorporation',
          status: 'verified',
          uploadedDate: '2024-01-10',
          verifiedBy: 'Mike Chen'
        }
      ],
      verificationHistory: [
        {
          id: '2-1',
          type: 'identity',
          status: 'passed',
          provider: 'Company Registry',
          score: 98,
          details: 'Company verification successful',
          timestamp: '2024-01-10T09:15:00Z',
          reviewedBy: 'Mike Chen'
        }
      ],
      riskFactors: []
    }
  ]

  const pepRecords: PEPRecord[] = [
    {
      id: '1',
      name: 'John Smith',
      position: 'Deputy Minister of Finance',
      country: 'Country X',
      relationship: 'self',
      riskLevel: 'high',
      source: 'World-Check',
      lastUpdated: '2024-01-16'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'under-review': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'suspended': return 'text-orange-600 bg-orange-100'
      case 'new': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'not-started': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPEPStatusColor = (status: string) => {
    switch (status) {
      case 'pep': return 'text-red-600 bg-red-100'
      case 'pep-related': return 'text-orange-600 bg-orange-100'
      case 'under-review': return 'text-yellow-600 bg-yellow-100'
      case 'not-pep': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'expired': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'manual-review': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskFactorColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const toggleCustomerExpansion = (customerId: string) => {
    const newExpanded = new Set(expandedCustomers)
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId)
    } else {
      newExpanded.add(customerId)
    }
    setExpandedCustomers(newExpanded)
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    const matchesRisk = filterRiskLevel === 'all' || customer.riskLevel === filterRiskLevel
    const matchesCDD = filterCDDLevel === 'all' || customer.cddLevel === filterCDDLevel
    return matchesSearch && matchesStatus && matchesRisk && matchesCDD
  })

  const totalCustomers = customers.length
  const approvedCustomers = customers.filter(c => c.status === 'approved').length
  const underReviewCustomers = customers.filter(c => c.status === 'under-review').length
  const highRiskCustomers = customers.filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Due Diligence</h1>
          <p className="text-gray-600 mt-1">Comprehensive KYC/AML customer onboarding and monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">{underReviewCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">{highRiskCustomers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'customers', name: 'Customers', icon: Users },
            { id: 'pep-screening', name: 'PEP Screening', icon: Flag },
            { id: 'sanctions', name: 'Sanctions', icon: Shield },
            { id: 'workflows', name: 'Workflows', icon: Activity },
            { id: 'analytics', name: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={filterRiskLevel}
                onChange={(e) => setFilterRiskLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <select
                value={filterCDDLevel}
                onChange={(e) => setFilterCDDLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All CDD Levels</option>
                <option value="simplified">Simplified</option>
                <option value="standard">Standard</option>
                <option value="enhanced">Enhanced</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Customers List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Customer Profiles ({filteredCustomers.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleCustomerExpansion(customer.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
                      >
                        {expandedCustomers.has(customer.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        {customer.type === 'individual' ? (
                          <Users className="w-5 h-5" />
                        ) : (
                          <Building className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{customer.name}</h4>
                        <p className="text-sm text-gray-600">
                          {customer.type === 'individual' ? 'Individual' : 'Entity'} • {customer.cddLevel} CDD
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(customer.riskLevel)}`}>
                        {customer.riskLevel}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getKYCStatusColor(customer.kycStatus)}`}>
                        {customer.kycStatus}
                      </span>
                      {customer.pepStatus === 'pep' && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPEPStatusColor(customer.pepStatus)}`}>
                          PEP
                        </span>
                      )}
                    </div>
                  </div>

                  {expandedCustomers.has(customer.id) && (
                    <div className="mt-6 ml-12 space-y-6">
                      {/* Customer Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Basic Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="text-gray-900 capitalize">{customer.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">CDD Level:</span>
                              <span className="text-gray-900 capitalize">{customer.cddLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assigned To:</span>
                              <span className="text-gray-900">{customer.assignedTo}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created:</span>
                              <span className="text-gray-900">{customer.createdAt}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Risk Assessment</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk Level:</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(customer.riskLevel)}`}>
                                {customer.riskLevel}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PEP Status:</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPEPStatusColor(customer.pepStatus)}`}>
                                {customer.pepStatus}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sanctions:</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                customer.sanctionsStatus === 'clear' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                              }`}>
                                {customer.sanctionsStatus}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk Factors:</span>
                              <span className="text-gray-900">{customer.riskFactors.length}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Timeline</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Updated:</span>
                              <span className="text-gray-900">{customer.lastUpdated}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Next Review:</span>
                              <span className="text-gray-900">{customer.nextReview}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Documents ({customer.documents.length})</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {customer.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                  <p className="text-xs text-gray-500 capitalize">{doc.type.replace('-', ' ')}</p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatusColor(doc.status)}`}>
                                {doc.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Verification History */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Verification History ({customer.verificationHistory.length})</h5>
                        <div className="space-y-3">
                          {customer.verificationHistory.map((verification) => (
                            <div key={verification.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                                  verification.status === 'passed' ? 'bg-green-100' :
                                  verification.status === 'failed' ? 'bg-red-100' :
                                  'bg-yellow-100'
                                }`}>
                                  {verification.status === 'passed' ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : verification.status === 'failed' ? (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-yellow-600" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 capitalize">{verification.type} Verification</p>
                                  <p className="text-xs text-gray-500">{verification.details}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getVerificationStatusColor(verification.status)}`}>
                                  {verification.status}
                                </span>
                                {verification.score && (
                                  <p className="text-xs text-gray-500 mt-1">Score: {verification.score}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risk Factors */}
                      {customer.riskFactors.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Risk Factors ({customer.riskFactors.length})</h5>
                          <div className="space-y-3">
                            {customer.riskFactors.map((factor) => (
                              <div key={factor.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{factor.description}</p>
                                  <p className="text-xs text-gray-500 capitalize">{factor.category} • {factor.detectedDate}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskFactorColor(factor.severity)}`}>
                                  {factor.severity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-3 pt-4 border-t border-gray-200">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          <Edit className="w-4 h-4 mr-2 inline" />
                          Edit Customer
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2 inline" />
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pep-screening' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">PEP Screening Results</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Relationship
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pepRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {record.relationship}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(record.riskLevel)}`}>
                          {record.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sanctions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sanctions Screening</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sanctions screening results will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Monitor global sanctions lists and watchlists</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'workflows' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CDD Workflows</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">CDD workflow management will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Configure and manage due diligence workflows</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Risk Distribution</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Risk distribution chart will be displayed here</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Completion Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">KYC trends chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDueDiligence
