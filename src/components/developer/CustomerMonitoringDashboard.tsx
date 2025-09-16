import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Trash2,
  Flag,
  User,
  Globe,
  CreditCard,
  Activity,
  Target,
  Zap,
  Lock,
  Unlock,
  Key,
  Database,
  Bell,
  Settings,
  Plus,
  Edit,
  Trash,
  ArrowRight,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phoneNumber: string
  country: string
  appName: string
  status: 'VALID' | 'PENDING' | 'FAILED' | 'EXPIRED'
  dateCreated: string
  lastActivity: string
  verificationTypes: VerificationType[]
  profileImage?: string
  customerType: 'individual' | 'business'
  // Individual customer fields
  dateOfBirth?: string
  gender?: 'Male' | 'Female'
  // Business customer fields
  companyName?: string
  registrationNumber?: string
  industry?: string
  employeeCount?: number
  complianceStatus?: 'pending' | 'approved' | 'rejected'
  contactPerson?: string
  website?: string
}

interface VerificationType {
  id: string
  name: string
  type: 'government_lookup' | 'document_analysis' | 'biometric_verification' | 'aml_screening' | 'address_verification' | 'phone_verification' | 'liveness_check' | 'ip_device_info'
  status: 'completed' | 'pending' | 'failed' | 'not_started'
  completedAt?: string
  results?: any
  required: boolean
  description: string
}

interface CustomerMonitoringDashboardProps {
  onViewCustomer: (customer: Customer) => void
  onBulkAction: (action: string, customerIds: string[]) => void
  onExport: (customers: Customer[]) => void
}

const CustomerMonitoringDashboard: React.FC<CustomerMonitoringDashboardProps> = ({ 
  onViewCustomer, 
  onBulkAction, 
  onExport 
}) => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'VALID' | 'PENDING' | 'FAILED' | 'EXPIRED'>('all')
  const [filterApp, setFilterApp] = useState<string>('all')
  const [filterCustomerType, setFilterCustomerType] = useState<'all' | 'individual' | 'business'>('all')
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [sortBy, setSortBy] = useState<'name' | 'dateCreated' | 'lastActivity' | 'status'>('dateCreated')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock data based on the images you shared
  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'ABRAHAM DAWODU',
        email: 'abraham@example.com',
        phoneNumber: '08071686975',
        dateOfBirth: 'Jul 25th, 1979',
        gender: 'Male',
        country: 'Nigeria',
        appName: 'finclusion',
        status: 'VALID',
        dateCreated: '10th Sep, 2025 4:13 PM',
        lastActivity: '10th Sep, 2025 4:13 PM',
        customerType: 'individual',
        verificationTypes: [
          { id: '1', name: 'Government Lookup', type: 'government_lookup', status: 'completed', completedAt: '2024-01-15T10:45:00Z', required: true, description: 'BVN verification and government database lookup', results: { bvn: '22314668509', verified: true } },
          { id: '2', name: 'Document Analysis', type: 'document_analysis', status: 'completed', completedAt: '2024-01-15T11:15:00Z', required: true, description: 'Document authenticity and data extraction', results: { documentType: 'passport', verified: true } },
          { id: '3', name: 'Biometric Verification', type: 'biometric_verification', status: 'completed', completedAt: '2024-01-15T11:30:00Z', required: true, description: 'Face matching and biometric analysis', results: { faceMatch: 0.95, verified: true } },
          { id: '4', name: 'AML Screening', type: 'aml_screening', status: 'completed', completedAt: '2024-01-15T11:45:00Z', required: false, description: 'Anti-money laundering and sanctions screening', results: { riskLevel: 'low', verified: true } },
          { id: '5', name: 'Address Verification', type: 'address_verification', status: 'not_started', required: false, description: 'Address validation and geolocation verification' },
          { id: '6', name: 'Phone Verification', type: 'phone_verification', status: 'not_started', required: false, description: 'Phone number validation and carrier lookup' },
          { id: '7', name: 'Liveness Check', type: 'liveness_check', status: 'completed', completedAt: '2024-01-15T11:30:00Z', required: true, description: 'Real-time liveness detection', results: { liveness: 0.98, verified: true } },
          { id: '8', name: 'IP & Device Info', type: 'ip_device_info', status: 'not_started', required: false, description: 'Device fingerprinting and IP analysis' }
        ]
      },
      {
        id: '2',
        name: 'Oscar Mbanugo',
        email: 'oscar@example.com',
        phoneNumber: '08091234567',
        dateOfBirth: 'Jan 16th, 1977',
        gender: 'Male',
        country: 'Nigeria',
        appName: 'finclusion',
        status: 'VALID',
        dateCreated: '10th Sep, 2025 3:12 PM',
        lastActivity: '10th Sep, 2025 3:12 PM',
        customerType: 'individual',
        verificationTypes: [
          { id: '1', name: 'Government Lookup', type: 'government_lookup', status: 'completed', completedAt: '2024-01-14T15:20:00Z', required: true, description: 'BVN verification and government database lookup', results: { bvn: '22314668510', verified: true } },
          { id: '2', name: 'Document Analysis', type: 'document_analysis', status: 'completed', completedAt: '2024-01-14T15:45:00Z', required: true, description: 'Document authenticity and data extraction', results: { documentType: 'national_id', verified: true } },
          { id: '3', name: 'Biometric Verification', type: 'biometric_verification', status: 'completed', completedAt: '2024-01-14T16:00:00Z', required: true, description: 'Face matching and biometric analysis', results: { faceMatch: 0.92, verified: true } },
          { id: '4', name: 'AML Screening', type: 'aml_screening', status: 'completed', completedAt: '2024-01-14T16:15:00Z', required: false, description: 'Anti-money laundering and sanctions screening', results: { riskLevel: 'low', verified: true } },
          { id: '5', name: 'Address Verification', type: 'address_verification', status: 'not_started', required: false, description: 'Address validation and geolocation verification' },
          { id: '6', name: 'Phone Verification', type: 'phone_verification', status: 'not_started', required: false, description: 'Phone number validation and carrier lookup' },
          { id: '7', name: 'Liveness Check', type: 'liveness_check', status: 'completed', completedAt: '2024-01-14T16:00:00Z', required: true, description: 'Real-time liveness detection', results: { liveness: 0.96, verified: true } },
          { id: '8', name: 'IP & Device Info', type: 'ip_device_info', status: 'not_started', required: false, description: 'Device fingerprinting and IP analysis' }
        ]
      },
      {
        id: '3',
        name: 'TOPE BOLANLE DANIEL',
        email: 'tope@example.com',
        phoneNumber: '08087654321',
        dateOfBirth: 'Nov 5th, 1983',
        gender: 'Female',
        country: 'Nigeria',
        appName: 'finclusion',
        status: 'VALID',
        dateCreated: '27th Aug, 2025 11:26 AM',
        lastActivity: '27th Aug, 2025 11:26 AM',
        customerType: 'individual',
        verificationTypes: [
          { id: '1', name: 'Government Lookup', type: 'government_lookup', status: 'completed', completedAt: '2024-01-13T11:30:00Z', required: true, description: 'BVN verification and government database lookup', results: { bvn: '22314668511', verified: true } },
          { id: '2', name: 'Document Analysis', type: 'document_analysis', status: 'completed', completedAt: '2024-01-13T11:45:00Z', required: true, description: 'Document authenticity and data extraction', results: { documentType: 'driver_license', verified: true } },
          { id: '3', name: 'Biometric Verification', type: 'biometric_verification', status: 'completed', completedAt: '2024-01-13T12:00:00Z', required: true, description: 'Face matching and biometric analysis', results: { faceMatch: 0.94, verified: true } },
          { id: '4', name: 'AML Screening', type: 'aml_screening', status: 'completed', completedAt: '2024-01-13T12:15:00Z', required: false, description: 'Anti-money laundering and sanctions screening', results: { riskLevel: 'low', verified: true } },
          { id: '5', name: 'Address Verification', type: 'address_verification', status: 'not_started', required: false, description: 'Address validation and geolocation verification' },
          { id: '6', name: 'Phone Verification', type: 'phone_verification', status: 'not_started', required: false, description: 'Phone number validation and carrier lookup' },
          { id: '7', name: 'Liveness Check', type: 'liveness_check', status: 'completed', completedAt: '2024-01-13T12:00:00Z', required: true, description: 'Real-time liveness detection', results: { liveness: 0.97, verified: true } },
          { id: '8', name: 'IP & Device Info', type: 'ip_device_info', status: 'not_started', required: false, description: 'Device fingerprinting and IP analysis' }
        ]
      },
      {
        id: '4',
        name: 'AMINAT ADEOGUN',
        email: 'aminat@example.com',
        phoneNumber: '08076543210',
        dateOfBirth: 'May 13th, 1977',
        gender: 'Female',
        country: 'Nigeria',
        appName: 'finclusion',
        status: 'PENDING',
        dateCreated: '21st Aug, 2025 3:06 PM',
        lastActivity: '21st Aug, 2025 3:06 PM',
        customerType: 'individual',
        verificationTypes: [
          { id: '1', name: 'Government Lookup', type: 'government_lookup', status: 'completed', completedAt: '2024-01-12T15:30:00Z', required: true, description: 'BVN verification and government database lookup', results: { bvn: '22314668512', verified: true } },
          { id: '2', name: 'Document Analysis', type: 'document_analysis', status: 'pending', required: true, description: 'Document authenticity and data extraction' },
          { id: '3', name: 'Biometric Verification', type: 'biometric_verification', status: 'not_started', required: true, description: 'Face matching and biometric analysis' },
          { id: '4', name: 'AML Screening', type: 'aml_screening', status: 'not_started', required: false, description: 'Anti-money laundering and sanctions screening' },
          { id: '5', name: 'Address Verification', type: 'address_verification', status: 'not_started', required: false, description: 'Address validation and geolocation verification' },
          { id: '6', name: 'Phone Verification', type: 'phone_verification', status: 'not_started', required: false, description: 'Phone number validation and carrier lookup' },
          { id: '7', name: 'Liveness Check', type: 'liveness_check', status: 'not_started', required: true, description: 'Real-time liveness detection' },
          { id: '8', name: 'IP & Device Info', type: 'ip_device_info', status: 'not_started', required: false, description: 'Device fingerprinting and IP analysis' }
        ]
      },
      // Business Customers
      {
        id: '5',
        name: 'TechCorp Solutions Ltd',
        email: 'admin@techcorp.com',
        phoneNumber: '+234 801 234 5678',
        country: 'Nigeria',
        appName: 'finclusion',
        status: 'VALID',
        dateCreated: '15th Sep, 2025 9:30 AM',
        lastActivity: '15th Sep, 2025 2:45 PM',
        customerType: 'business',
        companyName: 'TechCorp Solutions Ltd',
        registrationNumber: 'RC123456789',
        industry: 'Technology',
        employeeCount: 150,
        complianceStatus: 'approved',
        contactPerson: 'Sarah Johnson',
        website: 'https://techcorp.com',
        verificationTypes: [
          { id: '1', name: 'Business Registration', type: 'government_lookup', status: 'completed', completedAt: '2024-01-16T10:00:00Z', required: true, description: 'CAC registration verification', results: { registrationNumber: 'RC123456789', verified: true } },
          { id: '2', name: 'Document Analysis', type: 'document_analysis', status: 'completed', completedAt: '2024-01-16T10:30:00Z', required: true, description: 'Business document verification', results: { documentType: 'cac_certificate', verified: true } },
          { id: '3', name: 'AML Screening', type: 'aml_screening', status: 'completed', completedAt: '2024-01-16T11:00:00Z', required: true, description: 'Business AML compliance check', results: { riskLevel: 'low', verified: true } },
          { id: '4', name: 'Address Verification', type: 'address_verification', status: 'completed', completedAt: '2024-01-16T11:15:00Z', required: true, description: 'Business address verification', results: { address: 'Lagos, Nigeria', verified: true } },
          { id: '5', name: 'Phone Verification', type: 'phone_verification', status: 'completed', completedAt: '2024-01-16T11:30:00Z', required: false, description: 'Business phone verification', results: { phone: '+234 801 234 5678', verified: true } },
          { id: '6', name: 'Employee Verification', type: 'government_lookup', status: 'pending', required: false, description: 'Key employee background checks' },
          { id: '7', name: 'Financial Verification', type: 'document_analysis', status: 'not_started', required: false, description: 'Financial statement verification' },
          { id: '8', name: 'Compliance Check', type: 'aml_screening', status: 'not_started', required: false, description: 'Regulatory compliance verification' }
        ]
      },
      {
        id: '6',
        name: 'Global Finance Bank',
        email: 'compliance@globalfinance.com',
        phoneNumber: '+234 802 345 6789',
        country: 'Nigeria',
        appName: 'finclusion',
        status: 'VALID',
        dateCreated: '12th Sep, 2025 11:15 AM',
        lastActivity: '15th Sep, 2025 4:20 PM',
        customerType: 'business',
        companyName: 'Global Finance Bank',
        registrationNumber: 'RC987654321',
        industry: 'Financial Services',
        employeeCount: 500,
        complianceStatus: 'approved',
        contactPerson: 'Michael Chen',
        website: 'https://globalfinance.com',
        verificationTypes: [
          { id: '1', name: 'Bank License Verification', type: 'government_lookup', status: 'completed', completedAt: '2024-01-14T09:00:00Z', required: true, description: 'CBN banking license verification', results: { licenseNumber: 'CBN001234', verified: true } },
          { id: '2', name: 'Document Analysis', type: 'document_analysis', status: 'completed', completedAt: '2024-01-14T09:30:00Z', required: true, description: 'Banking documents verification', results: { documentType: 'banking_license', verified: true } },
          { id: '3', name: 'AML Screening', type: 'aml_screening', status: 'completed', completedAt: '2024-01-14T10:00:00Z', required: true, description: 'Enhanced AML compliance check', results: { riskLevel: 'low', verified: true } },
          { id: '4', name: 'Address Verification', type: 'address_verification', status: 'completed', completedAt: '2024-01-14T10:15:00Z', required: true, description: 'Bank headquarters verification', results: { address: 'Victoria Island, Lagos', verified: true } },
          { id: '5', name: 'Phone Verification', type: 'phone_verification', status: 'completed', completedAt: '2024-01-14T10:30:00Z', required: false, description: 'Bank contact verification', results: { phone: '+234 802 345 6789', verified: true } },
          { id: '6', name: 'Regulatory Compliance', type: 'aml_screening', status: 'completed', completedAt: '2024-01-14T11:00:00Z', required: true, description: 'CBN regulatory compliance', results: { compliance: 'approved', verified: true } },
          { id: '7', name: 'Financial Audit', type: 'document_analysis', status: 'pending', required: false, description: 'Annual financial audit verification' },
          { id: '8', name: 'Board Verification', type: 'government_lookup', status: 'not_started', required: false, description: 'Board member background checks' }
        ]
      },
      {
        id: '7',
        name: 'Innovation Labs',
        email: 'hello@innovationlabs.com',
        phoneNumber: '+234 803 456 7890',
        country: 'Nigeria',
        appName: 'finclusion',
        status: 'PENDING',
        dateCreated: '18th Sep, 2025 3:45 PM',
        lastActivity: '18th Sep, 2025 3:45 PM',
        customerType: 'business',
        companyName: 'Innovation Labs',
        registrationNumber: 'RC555666777',
        industry: 'Technology',
        employeeCount: 25,
        complianceStatus: 'pending',
        contactPerson: 'David Wilson',
        website: 'https://innovationlabs.com',
        verificationTypes: [
          { id: '1', name: 'Business Registration', type: 'government_lookup', status: 'completed', completedAt: '2024-01-18T14:00:00Z', required: true, description: 'CAC registration verification', results: { registrationNumber: 'RC555666777', verified: true } },
          { id: '2', name: 'Document Analysis', type: 'document_analysis', status: 'pending', required: true, description: 'Startup documents verification' },
          { id: '3', name: 'AML Screening', type: 'aml_screening', status: 'not_started', required: true, description: 'Startup AML compliance check' },
          { id: '4', name: 'Address Verification', type: 'address_verification', status: 'not_started', required: true, description: 'Office address verification' },
          { id: '5', name: 'Phone Verification', type: 'phone_verification', status: 'not_started', required: false, description: 'Business phone verification' },
          { id: '6', name: 'Founder Verification', type: 'government_lookup', status: 'not_started', required: false, description: 'Founder background verification' },
          { id: '7', name: 'Financial Verification', type: 'document_analysis', status: 'not_started', required: false, description: 'Financial capability verification' },
          { id: '8', name: 'Compliance Check', type: 'aml_screening', status: 'not_started', required: false, description: 'Regulatory compliance verification' }
        ]
      }
    ]
    setCustomers(mockCustomers)
  }, [])

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phoneNumber.includes(searchQuery) ||
                         (customer.companyName && customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    const matchesApp = filterApp === 'all' || customer.appName === filterApp
    const matchesCustomerType = filterCustomerType === 'all' || customer.customerType === filterCustomerType
    return matchesSearch && matchesStatus && matchesApp && matchesCustomerType
  })

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      case 'dateCreated':
        aValue = new Date(a.dateCreated)
        bValue = new Date(b.dateCreated)
        break
      case 'lastActivity':
        aValue = new Date(a.lastActivity)
        bValue = new Date(b.lastActivity)
        break
      case 'status':
        aValue = a.status
        bValue = b.status
        break
      default:
        aValue = a.dateCreated
        bValue = b.dateCreated
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }

  const handleSelectAll = () => {
    if (selectedCustomers.length === sortedCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(sortedCustomers.map(c => c.id))
    }
  }

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'VALID': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      case 'EXPIRED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCountryFlag = (country: string) => {
    // Simple flag emoji mapping
    const flags: Record<string, string> = {
      'Nigeria': '🇳🇬',
      'Ghana': '🇬🇭',
      'Kenya': '🇰🇪',
      'South Africa': '🇿🇦'
    }
    return flags[country] || '🌍'
  }

  const totalCustomers = customers.length
  const validCustomers = customers.filter(c => c.status === 'VALID').length
  const pendingCustomers = customers.filter(c => c.status === 'PENDING').length
  const failedCustomers = customers.filter(c => c.status === 'FAILED').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer 360</h1>
          <p className="text-gray-600">Monitor users performing verifications through your API</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onExport(customers)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customer name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="VALID">Valid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="EXPIRED">Expired</option>
          </select>
          
          <select
            value={filterApp}
            onChange={(e) => setFilterApp(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Apps</option>
            <option value="finclusion">finclusion</option>
            <option value="hassan_kyc">Hassan KYC</option>
            <option value="idris_backend">Idris Backend</option>
            <option value="default_app">Default App</option>
          </select>
          
          <select
            value={filterCustomerType}
            onChange={(e) => setFilterCustomerType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
          
          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Valid</p>
              <p className="text-2xl font-bold text-gray-900">{validCustomers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCustomers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Failed</p>
              <p className="text-2xl font-bold text-gray-900">{failedCustomers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Customer List</h3>
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dateCreated">Sort by Date Created</option>
                <option value="name">Sort by Name</option>
                <option value="lastActivity">Sort by Last Activity</option>
                <option value="status">Sort by Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === sortedCustomers.length && sortedCustomers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DETAILS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APP NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COUNTRIES</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE CREATED</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleSelectCustomer(customer.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          {customer.customerType === 'business' ? (
                            <Building className="h-6 w-6 text-gray-600" />
                          ) : (
                            <User className="h-6 w-6 text-gray-600" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.customerType === 'business' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {customer.customerType === 'business' ? 'Business' : 'Individual'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.customerType === 'business' ? (
                      <div>
                        <div className="font-medium">{customer.companyName}</div>
                        <div className="text-gray-500">{customer.industry} • {customer.employeeCount} employees</div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium">{customer.dateOfBirth}</div>
                        <div className="text-gray-500">{customer.gender}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.appName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCountryFlag(customer.country)}</span>
                      <span>{customer.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.dateCreated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        onViewCustomer(customer)
                        navigate(`/developer/customer-verifications/${customer.id}`)
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View customer details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedCustomers.length} customer{selectedCustomers.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onBulkAction('export', selectedCustomers)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Export Selected
              </button>
              <button
                onClick={() => onBulkAction('refresh', selectedCustomers)}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Refresh Status
              </button>
              <button
                onClick={() => setSelectedCustomers([])}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerMonitoringDashboard
