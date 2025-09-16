import React, { useState, useEffect } from 'react'
import { 
  User, 
  Users,
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Clock, 
  Shield, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Eye, 
  Download, 
  Edit, 
  Send, 
  Archive, 
  Tag, 
  MessageSquare, 
  History, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target, 
  Globe, 
  MapPin, 
  CreditCard, 
  UserCheck, 
  UserX, 
  Ban, 
  RefreshCw, 
  ArrowLeft, 
  ArrowRight, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Minus, 
  MoreHorizontal, 
  MoreVertical,
  Lock,
  Unlock,
  Key,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  Star,
  Flag,
  Bookmark,
  Share,
  Copy,
  ExternalLink
} from 'lucide-react'

interface CustomerDetail {
  id: string
  personalInfo: {
    name: string
    email: string
    phone: string
    dateOfBirth: string
    nationality: string
    address: {
      street: string
      city: string
      state: string
      country: string
      postalCode: string
    }
  }
  businessInfo?: {
    companyName: string
    registrationNumber: string
    taxId: string
    industry: string
    size: string
    website: string
    address: {
      street: string
      city: string
      state: string
      country: string
      postalCode: string
    }
  }
  verification: {
    type: 'individual' | 'business' | 'kyc' | 'aml'
    status: 'pending' | 'verified' | 'rejected' | 'expired' | 'in-progress'
    submittedAt: string
    completedAt?: string
    trustScore: number
    riskLevel: 'low' | 'medium' | 'high'
    riskFactors: string[]
    complianceStatus: {
      gdpr: boolean
      aml: boolean
      kyc: boolean
      sanctions: boolean
    }
  }
  documents: Array<{
    id: string
    type: string
    name: string
    status: 'pending' | 'approved' | 'rejected' | 'expired'
    uploadedAt: string
    reviewedAt?: string
    reviewer?: string
    notes?: string
    url: string
  }>
  activity: Array<{
    id: string
    type: 'submission' | 'review' | 'approval' | 'rejection' | 'update' | 'communication'
    description: string
    timestamp: string
    user?: string
    details?: any
  }>
  communications: Array<{
    id: string
    type: 'email' | 'sms' | 'call' | 'chat'
    direction: 'inbound' | 'outbound'
    subject: string
    content: string
    timestamp: string
    status: 'sent' | 'delivered' | 'read' | 'failed'
  }>
  notes: Array<{
    id: string
    content: string
    author: string
    timestamp: string
    type: 'general' | 'review' | 'compliance' | 'follow-up'
  }>
  tags: string[]
  metadata: {
    source: string
    referrer?: string
    userAgent?: string
    ipAddress?: string
    deviceType: string
    browser: string
  }
}

interface CustomerDetailsProps {
  customerId: string
  onClose: () => void
  onEdit: (customer: CustomerDetail) => void
  onSendMessage: (customer: CustomerDetail) => void
  onAddNote: (customerId: string) => void
  onUpdateStatus: (customerId: string, status: string) => void
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customerId,
  onClose,
  onEdit,
  onSendMessage,
  onAddNote,
  onUpdateStatus
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'activity' | 'communications' | 'notes'>('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [customer, setCustomer] = useState<CustomerDetail | null>(null)

  useEffect(() => {
    loadCustomerData()
  }, [customerId])

  const loadCustomerData = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockCustomer: CustomerDetail = {
      id: customerId,
      personalInfo: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1-555-0123',
        dateOfBirth: '1985-03-15',
        nationality: 'US',
        address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          country: 'United States',
          postalCode: '10001'
        }
      },
      businessInfo: {
        companyName: 'Tech Corp',
        registrationNumber: 'TC-2024-001',
        taxId: '12-3456789',
        industry: 'Technology',
        size: '50-200 employees',
        website: 'https://techcorp.com',
        address: {
          street: '456 Business Ave',
          city: 'New York',
          state: 'NY',
          country: 'United States',
          postalCode: '10002'
        }
      },
      verification: {
        type: 'business',
        status: 'verified',
        submittedAt: '2024-01-20T10:30:00Z',
        completedAt: '2024-01-20T14:45:00Z',
        trustScore: 92,
        riskLevel: 'low',
        riskFactors: ['Clean background', 'Established business', 'Good credit history'],
        complianceStatus: {
          gdpr: true,
          aml: true,
          kyc: true,
          sanctions: true
        }
      },
      documents: [
        {
          id: '1',
          type: 'Passport',
          name: 'passport_john_smith.pdf',
          status: 'approved',
          uploadedAt: '2024-01-20T10:35:00Z',
          reviewedAt: '2024-01-20T11:15:00Z',
          reviewer: 'Sarah Johnson',
          notes: 'Valid passport, clear image quality',
          url: '/documents/passport_john_smith.pdf'
        },
        {
          id: '2',
          type: 'Business License',
          name: 'business_license_techcorp.pdf',
          status: 'approved',
          uploadedAt: '2024-01-20T10:40:00Z',
          reviewedAt: '2024-01-20T12:30:00Z',
          reviewer: 'Mike Chen',
          notes: 'Valid business license, matches company information',
          url: '/documents/business_license_techcorp.pdf'
        },
        {
          id: '3',
          type: 'Bank Statement',
          name: 'bank_statement_jan_2024.pdf',
          status: 'approved',
          uploadedAt: '2024-01-20T10:45:00Z',
          reviewedAt: '2024-01-20T13:20:00Z',
          reviewer: 'Emily Davis',
          notes: 'Recent bank statement, sufficient funds',
          url: '/documents/bank_statement_jan_2024.pdf'
        }
      ],
      activity: [
        {
          id: '1',
          type: 'submission',
          description: 'Customer submitted verification application',
          timestamp: '2024-01-20T10:30:00Z',
          user: 'John Smith'
        },
        {
          id: '2',
          type: 'review',
          description: 'Document review started',
          timestamp: '2024-01-20T11:00:00Z',
          user: 'Sarah Johnson'
        },
        {
          id: '3',
          type: 'approval',
          description: 'Passport document approved',
          timestamp: '2024-01-20T11:15:00Z',
          user: 'Sarah Johnson'
        },
        {
          id: '4',
          type: 'approval',
          description: 'Business license approved',
          timestamp: '2024-01-20T12:30:00Z',
          user: 'Mike Chen'
        },
        {
          id: '5',
          type: 'approval',
          description: 'Bank statement approved',
          timestamp: '2024-01-20T13:20:00Z',
          user: 'Emily Davis'
        },
        {
          id: '6',
          type: 'approval',
          description: 'Verification completed and approved',
          timestamp: '2024-01-20T14:45:00Z',
          user: 'System'
        }
      ],
      communications: [
        {
          id: '1',
          type: 'email',
          direction: 'outbound',
          subject: 'Verification Application Received',
          content: 'Thank you for submitting your verification application. We will review your documents and get back to you within 24 hours.',
          timestamp: '2024-01-20T10:32:00Z',
          status: 'delivered'
        },
        {
          id: '2',
          type: 'email',
          direction: 'outbound',
          subject: 'Verification Approved',
          content: 'Congratulations! Your verification has been approved. You can now access all features of our platform.',
          timestamp: '2024-01-20T14:47:00Z',
          status: 'delivered'
        }
      ],
      notes: [
        {
          id: '1',
          content: 'High-value customer, expedite processing',
          author: 'Sarah Johnson',
          timestamp: '2024-01-20T11:00:00Z',
          type: 'review'
        },
        {
          id: '2',
          content: 'All documents verified successfully, no issues found',
          author: 'Mike Chen',
          timestamp: '2024-01-20T12:35:00Z',
          type: 'compliance'
        }
      ],
      tags: ['priority', 'vip', 'enterprise', 'verified'],
      metadata: {
        source: 'Web Application',
        referrer: 'https://techcorp.com/verification',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        ipAddress: '192.168.1.100',
        deviceType: 'Desktop',
        browser: 'Chrome'
      }
    }

    setTimeout(() => {
      setCustomer(mockCustomer)
      setIsLoading(false)
    }, 1000)
  }

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

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <FileText className="h-4 w-4 text-blue-600" />
      case 'review':
        return <Eye className="h-4 w-4 text-yellow-600" />
      case 'approval':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'rejection':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'update':
        return <Edit className="h-4 w-4 text-purple-600" />
      case 'communication':
        return <MessageSquare className="h-4 w-4 text-indigo-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
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

  const formatTrustScore = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">Loading customer details...</span>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Customer not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.personalInfo.name}</h1>
            <p className="text-gray-600">{customer.personalInfo.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 text-sm font-semibold rounded ${getStatusColor(customer.verification.status)}`}>
            {customer.verification.status}
          </span>
          <button
            onClick={() => onEdit(customer)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onSendMessage(customer)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Trust Score</p>
              <p className={`text-2xl font-bold ${formatTrustScore(customer.verification.trustScore)}`}>
                {customer.verification.trustScore}/100
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Risk Level</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">
                {customer.verification.riskLevel}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">
                {customer.documents.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {customer.verification.completedAt ? 
                  `${Math.round((new Date(customer.verification.completedAt).getTime() - new Date(customer.verification.submittedAt).getTime()) / (1000 * 60 * 60))}h` :
                  'In Progress'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: User },
            { id: 'documents', name: 'Documents', icon: FileText },
            { id: 'activity', name: 'Activity', icon: Activity },
            { id: 'communications', name: 'Communications', icon: MessageSquare },
            { id: 'notes', name: 'Notes', icon: Bookmark }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{customer.personalInfo.name}</p>
                  <p className="text-sm text-gray-600">Full Name</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{customer.personalInfo.email}</p>
                  <p className="text-sm text-gray-600">Email Address</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{customer.personalInfo.phone}</p>
                  <p className="text-sm text-gray-600">Phone Number</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(customer.personalInfo.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{customer.personalInfo.nationality}</p>
                  <p className="text-sm text-gray-600">Nationality</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {customer.personalInfo.address.street}, {customer.personalInfo.address.city}, {customer.personalInfo.address.state} {customer.personalInfo.address.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">Address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          {customer.businessInfo && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.businessInfo.companyName}</p>
                    <p className="text-sm text-gray-600">Company Name</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.businessInfo.registrationNumber}</p>
                    <p className="text-sm text-gray-600">Registration Number</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.businessInfo.taxId}</p>
                    <p className="text-sm text-gray-600">Tax ID</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.businessInfo.industry}</p>
                    <p className="text-sm text-gray-600">Industry</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.businessInfo.size}</p>
                    <p className="text-sm text-gray-600">Company Size</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.businessInfo.website}</p>
                    <p className="text-sm text-gray-600">Website</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verification Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {customer.verification.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(customer.verification.status)}`}>
                  {customer.verification.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Risk Level</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getRiskColor(customer.verification.riskLevel)}`}>
                  {customer.verification.riskLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Submitted</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(customer.verification.submittedAt)}
                </span>
              </div>
              {customer.verification.completedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(customer.verification.completedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
            <div className="space-y-3">
              {Object.entries(customer.verification.complianceStatus).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 uppercase">{key}</span>
                  <div className="flex items-center space-x-2">
                    {value ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {value ? 'Compliant' : 'Non-compliant'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
            <div className="space-y-4">
              {customer.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.type}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded: {formatDate(doc.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getDocumentStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {customer.activity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(activity.timestamp)}
                      {activity.user && ` • ${activity.user}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Communications Tab */}
      {activeTab === 'communications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication History</h3>
            <div className="space-y-4">
              {customer.communications.map((comm) => (
                <div key={comm.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{comm.subject}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        comm.direction === 'inbound' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {comm.direction}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(comm.timestamp)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{comm.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
            <button
              onClick={() => onAddNote(customer.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Note</span>
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              {customer.notes.map((note) => (
                <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{note.author}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        note.type === 'review' ? 'bg-yellow-100 text-yellow-800' :
                        note.type === 'compliance' ? 'bg-green-100 text-green-800' :
                        note.type === 'follow-up' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {note.type}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(note.timestamp)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDetails
