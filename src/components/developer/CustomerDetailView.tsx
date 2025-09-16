import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
  ArrowLeft,
  User,
  Users,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  FileText,
  Camera,
  Shield,
  Target,
  Zap,
  Lock,
  Key,
  Database,
  Activity,
  BarChart3,
  TrendingUp,
  Flag,
  Star,
  Bell,
  Settings,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
  Send,
  MessageSquare,
  Archive,
  Tag,
  Award,
  Heart,
  DollarSign,
  CreditCard,
  PieChart,
  LineChart,
  Grid,
  List,
  Search,
  Filter,
  SortAsc,
  SortDesc
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

interface CustomerDetailViewProps {
  onClose: () => void
  onVerificationAction: (verificationType: string, action: string) => void
}

const CustomerDetailView: React.FC<CustomerDetailViewProps> = ({ 
  onClose, 
  onVerificationAction 
}) => {
  const { customerId } = useParams<{ customerId: string }>()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [activeTab, setActiveTab] = useState<string>('government_lookup')
  const [showResults, setShowResults] = useState<Record<string, boolean>>({})

  // Mock customer data - in real app, this would fetch based on customerId
  useEffect(() => {
    const mockCustomers: Record<string, Customer> = {
      '1': {
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
      '2': {
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
      '3': {
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
      '4': {
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
      '5': {
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
      '6': {
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
      '7': {
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
    }

    if (customerId && mockCustomers[customerId]) {
      setCustomer(mockCustomers[customerId])
    }
  }, [customerId])

  const verificationTabs = [
    { id: 'government_lookup', name: 'Government Lookup', icon: Building, description: 'BVN and government database verification' },
    { id: 'document_analysis', name: 'Document Analysis', icon: FileText, description: 'Document authenticity and data extraction' },
    { id: 'biometric_verification', name: 'Biometric Verification', icon: Camera, description: 'Face matching and biometric analysis' },
    { id: 'aml_screening', name: 'AML Screening', icon: Shield, description: 'Anti-money laundering and sanctions screening' },
    { id: 'address_verification', name: 'Address Verification', icon: MapPin, description: 'Address validation and geolocation' },
    { id: 'phone_verification', name: 'Phone Verification', icon: Phone, description: 'Phone number validation and carrier lookup' },
    { id: 'liveness_check', name: 'Liveness Check', icon: Eye, description: 'Real-time liveness detection' },
    { id: 'ip_device_info', name: 'IP & Device Info', icon: Database, description: 'Device fingerprinting and IP analysis' }
  ]

  const getStatusIcon = (status: VerificationType['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />
      case 'not_started': return <AlertTriangle className="h-5 w-5 text-gray-400" />
      default: return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: VerificationType['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'not_started': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'Nigeria': '🇳🇬',
      'Ghana': '🇬🇭',
      'Kenya': '🇰🇪',
      'South Africa': '🇿🇦'
    }
    return flags[country] || '🌍'
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Customer Details</h3>
          <p className="text-gray-500">Please wait while we fetch the customer information...</p>
        </div>
      </div>
    )
  }

  const currentVerification = customer.verificationTypes.find(v => v.type === activeTab)
  const completedVerifications = customer.verificationTypes.filter(v => v.status === 'completed').length
  const totalVerifications = customer.verificationTypes.length
  const progressPercentage = (completedVerifications / totalVerifications) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Go Back: Customer 360</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  {customer.customerType === 'business' ? (
                    <Building className="h-10 w-10 text-gray-600" />
                  ) : (
                    <User className="h-10 w-10 text-gray-600" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
                <p className="text-gray-600">{customer.email}</p>
                <div className="mt-2 flex items-center justify-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(customer.status as any)}`}>
                    {customer.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customer.customerType === 'business' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {customer.customerType === 'business' ? 'Business' : 'Individual'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-900">{customer.phoneNumber}</span>
                </div>
                
                {customer.customerType === 'business' ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{customer.companyName}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{customer.registrationNumber}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{customer.industry}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{customer.employeeCount} employees</span>
                    </div>
                    
                    {customer.contactPerson && (
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-900">{customer.contactPerson}</span>
                      </div>
                    )}
                    
                    {customer.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <a href={customer.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                          {customer.website}
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{customer.dateOfBirth}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{customer.gender}</span>
                    </div>
                  </>
                )}
                
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCountryFlag(customer.country)}</span>
                    <span className="text-sm text-gray-900">{customer.country}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-900">{customer.appName}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Verification Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium">{completedVerifications}/{totalVerifications}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(progressPercentage)}% Complete
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Account Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Date Created:</span>
                    <span>{customer.dateCreated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Activity:</span>
                    <span>{customer.lastActivity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg">
              {/* Verification Tabs */}
              <div className="border-b border-gray-200">
                <div className="overflow-x-auto">
                  <nav className="flex space-x-4 px-6 min-w-max" aria-label="Tabs">
                    {verificationTabs.map(tab => {
                      const verification = customer.verificationTypes.find(v => v.type === tab.id)
                      const Icon = tab.icon
                      
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {verification && getStatusIcon(verification.status)}
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="hidden sm:inline">{tab.name}</span>
                          <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </div>

              {/* Verification Content */}
              <div className="p-4 sm:p-6">
                {currentVerification ? (
                  <div className="space-y-6">
                    {/* Verification Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {currentVerification.name}
                        </h3>
                        <p className="text-gray-600">{currentVerification.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(currentVerification.status)}`}>
                          {currentVerification.status.replace('_', ' ').toUpperCase()}
                        </span>
                        {currentVerification.required && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            Required
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Verification Results */}
                    {currentVerification.status === 'completed' && currentVerification.results && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-green-800">Verification Results</h4>
                          <button
                            onClick={() => setShowResults(prev => ({ ...prev, [activeTab]: !prev[activeTab] }))}
                            className="text-green-600 hover:text-green-800"
                          >
                            {showResults[activeTab] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </button>
                        </div>
                        
                        {showResults[activeTab] && (
                          <div className="space-y-3">
                            {Object.entries(currentVerification.results).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between text-sm">
                                <span className="font-medium text-green-700">{key.replace('_', ' ').toUpperCase()}:</span>
                                <span className="text-green-600">{String(value)}</span>
                              </div>
                            ))}
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-green-700">Completed At:</span>
                              <span className="text-green-600">
                                {currentVerification.completedAt ? new Date(currentVerification.completedAt).toLocaleString() : 'N/A'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Verification Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {currentVerification.status === 'not_started' && (
                        <button
                          onClick={() => onVerificationAction(currentVerification.type, 'start')}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Play className="h-4 w-4" />
                          <span>Start Verification</span>
                        </button>
                      )}
                      
                      {currentVerification.status === 'pending' && (
                        <button
                          onClick={() => onVerificationAction(currentVerification.type, 'retry')}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                          <span>Retry Verification</span>
                        </button>
                      )}
                      
                      {currentVerification.status === 'failed' && (
                        <button
                          onClick={() => onVerificationAction(currentVerification.type, 'retry')}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                          <span>Retry Verification</span>
                        </button>
                      )}
                      
                      {currentVerification.status === 'completed' && (
                        <button
                          onClick={() => onVerificationAction(currentVerification.type, 'view_details')}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                      )}
                      
                      <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Export Results</span>
                      </button>
                    </div>

                    {/* Verification Status Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Status Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <span className="ml-2 font-medium">{currentVerification.status.replace('_', ' ').toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Required:</span>
                          <span className="ml-2 font-medium">{currentVerification.required ? 'Yes' : 'No'}</span>
                        </div>
                        {currentVerification.completedAt && (
                          <div>
                            <span className="text-gray-600">Completed:</span>
                            <span className="ml-2 font-medium">
                              {new Date(currentVerification.completedAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Not Found</h3>
                    <p className="text-gray-500">This verification type is not available for this customer.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetailView
