import React, { useState } from 'react'
import BackgroundCheckDetailsPage from '../../components/organisation/BackgroundCheckDetailsPage'
import BackgroundCheckRequestForm from '../../components/organisation/BackgroundCheckRequestForm'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Download, 
  FileText, 
  User, 
  Building, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Shield,
  Users,
  TrendingUp,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Star,
  Flag,
  MoreVertical,
  Edit,
  Trash2,
  RefreshCw,
  ExternalLink,
  Copy,
  Send,
  Archive,
  Tag,
  Play,
  X,
  Printer,
  ChevronDown,
  Info
} from 'lucide-react'

interface BackgroundCheck {
  id: string
  candidateName: string
  candidateEmail: string
  candidatePhone: string
  position: string
  department: string
  requestDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  completionDate?: string
  reportUrl?: string
  cost: number
  checks: {
    criminal: boolean
    employment: boolean
    education: boolean
    reference: boolean
    credit: boolean
    identity: boolean
  }
  results?: {
    criminal: 'clear' | 'issues' | 'pending'
    employment: 'verified' | 'discrepancy' | 'pending'
    education: 'verified' | 'discrepancy' | 'pending'
    reference: 'positive' | 'negative' | 'pending'
    credit: 'good' | 'poor' | 'pending'
    identity: 'verified' | 'failed' | 'pending'
  }
  notes?: string
  tags: string[]
}

const BackgroundCheck = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCheck, setSelectedCheck] = useState<BackgroundCheck | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [editingRequestId, setEditingRequestId] = useState<string | undefined>(undefined)
  const [showEntitySelectionModal, setShowEntitySelectionModal] = useState(false)
  const [selectedEntityType, setSelectedEntityType] = useState<'individual' | 'organization' | null>(null)
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const [showRegisteredUserForm, setShowRegisteredUserForm] = useState(false)
  const [candidateInfo, setCandidateInfo] = useState<{
    name: string;
    email: string;
    phone: string;
    score: number;
    profileImage: string;
  } | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    personalIdentity: true,
    criminalRecord: false,
    financialCredit: false,
    associationVerification: false,
    medicalHistory: false,
    professionalRecords: false,
    socialMedia: false
  })
  const [newRequestData, setNewRequestData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    position: '',
    department: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    assignedTo: '',
    userId: '',
    checks: {
      criminal: true,
      employment: true,
      education: true,
      reference: false,
      credit: false,
      identity: true
    }
  })
  const [selectedChecks, setSelectedChecks] = useState({
    'Address Verification': { selected: true, price: 3000 },
    'BVN Verification Check': { selected: true, price: 3000 },
    'NIN Verification Check': { selected: true, price: 3000 },
    'FRSC History': { selected: true, price: 3000 },
    'Birth Certificate': { selected: false, price: 2000 },
    'State Residency': { selected: false, price: 1500 },
    'Name change or alias history': { selected: false, price: 1000 },
    'Phone number & email verification': { selected: false, price: 500 },
    'Passport History Verification': { selected: false, price: 2500 },
    'Criminal History': { selected: false, price: 2000 },
    'Sexual Criminal History': { selected: false, price: 2000 },
    'Financial Crime History': { selected: false, price: 2000 },
    'Prison/Jail History': { selected: false, price: 2000 },
    'Credit History Verification': { selected: false, price: 3000 },
    'Verified income sources & financial transactions': { selected: false, price: 2500 },
    'Outstanding debts & liabilities': { selected: false, price: 2000 },
    'Business financial history & investments': { selected: false, price: 3000 },
    'FIRS History': { selected: false, price: 2000 },
    'Membership in professional bodies History': { selected: false, price: 1500 },
    'Alumni networks': { selected: false, price: 1000 },
    'Exclusive Industry Associations': { selected: false, price: 2000 },
    'Political Exposure (PEPs)': { selected: false, price: 3000 },
    'Medical History': { selected: false, price: 1000 },
    'Employment History': { selected: false, price: 2000 },
    'School records & Academic history': { selected: false, price: 1500 },
    'Academic degrees & certifications': { selected: false, price: 2000 },
    'Professional licenses & industry recognition': { selected: false, price: 2500 },
    'News articles & public mentions': { selected: false, price: 1000 },
    'Verified social media accounts': { selected: false, price: 500 },
    'Online content & reputation analysis': { selected: false, price: 1500 },
    'Thought leadership & professional contributions': { selected: false, price: 2000 }
  })

  // Helper functions
  const handleUserIdSearch = async (userId: string) => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      if (userId === '189479274') {
        setCandidateInfo({
          name: 'Nene Oyinda Afamefuna',
          email: 'NeneAfamefuna@gmail.com',
          phone: '07036723061',
          score: 830,
          profileImage: '/api/placeholder/40/40'
        })
        setNewRequestData(prev => ({
          ...prev,
          candidateName: 'Nene Oyinda Afamefuna',
          candidateEmail: 'NeneAfamefuna@gmail.com',
          candidatePhone: '07036723061'
        }))
      } else {
        setCandidateInfo(null)
      }
      setIsSearching(false)
    }, 1500)
  }

  const calculateTotal = () => {
    const selectedCheckItems = Object.entries(selectedChecks).filter(([_, data]) => data.selected)
    const subtotal = selectedCheckItems.reduce((sum, [_, data]) => sum + data.price, 0)
    const serviceFee = 500
    return {
      subtotal,
      serviceFee,
      total: subtotal + serviceFee
    }
  }

  const handleCheckToggle = (checkName: string) => {
    setSelectedChecks(prev => ({
      ...prev,
      [checkName]: {
        ...prev[checkName as keyof typeof prev],
        selected: !prev[checkName as keyof typeof prev].selected
      }
    }))
  }

  const toggleSection = (sectionKey: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  const resetNewRequest = () => {
    setCurrentStep(1)
    setCandidateInfo(null)
    setIsSearching(false)
    setNewRequestData({
      candidateName: '',
      candidateEmail: '',
      candidatePhone: '',
      position: '',
      department: '',
      priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
      assignedTo: '',
      userId: '',
      checks: {
        criminal: true,
        employment: true,
        education: true,
        reference: false,
        credit: false,
        identity: true
      }
    })
  }

  // Mock data
  const backgroundChecks: BackgroundCheck[] = [
    {
      id: 'BC-2024-001',
      candidateName: 'John Smith',
      candidateEmail: 'john.smith@email.com',
      candidatePhone: '+234 801 234 5678',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      requestDate: '2024-01-15',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      completionDate: '2024-01-18',
      reportUrl: '/reports/bc-2024-001.pdf',
      cost: 25000,
      checks: {
        criminal: true,
        employment: true,
        education: true,
        reference: true,
        credit: false,
        identity: true
      },
      results: {
        criminal: 'clear',
        employment: 'verified',
        education: 'verified',
        reference: 'positive',
        credit: 'pending',
        identity: 'verified'
      },
      notes: 'All checks completed successfully. Candidate cleared for hire.',
      tags: ['engineering', 'senior-level', 'cleared']
    },
    {
      id: 'BC-2024-002',
      candidateName: 'Maria Garcia',
      candidateEmail: 'maria.garcia@email.com',
      candidatePhone: '+234 802 345 6789',
      position: 'Financial Analyst',
      department: 'Finance',
      requestDate: '2024-01-20',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Michael Brown',
      cost: 30000,
      checks: {
        criminal: true,
        employment: true,
        education: true,
        reference: true,
        credit: true,
        identity: true
      },
      results: {
        criminal: 'pending',
        employment: 'verified',
        education: 'pending',
        reference: 'pending',
        credit: 'pending',
        identity: 'verified'
      },
      tags: ['finance', 'analyst', 'in-progress']
    },
    {
      id: 'BC-2024-003',
      candidateName: 'David Wilson',
      candidateEmail: 'david.wilson@email.com',
      candidatePhone: '+234 803 456 7890',
      position: 'Marketing Manager',
      department: 'Marketing',
      requestDate: '2024-01-22',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Lisa Davis',
      cost: 20000,
      checks: {
        criminal: true,
        employment: true,
        education: true,
        reference: false,
        credit: false,
        identity: true
      },
      tags: ['marketing', 'manager', 'pending']
    }
  ]

  const stats = {
    totalRequests: backgroundChecks.length,
    completed: backgroundChecks.filter(bc => bc.status === 'completed').length,
    inProgress: backgroundChecks.filter(bc => bc.status === 'in-progress').length,
    pending: backgroundChecks.filter(bc => bc.status === 'pending').length,
    totalCost: backgroundChecks.reduce((sum, bc) => sum + bc.cost, 0),
    averageTime: 3.2, // days
    clearanceRate: 85 // percentage
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-gray-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleViewDetails = (check: BackgroundCheck) => {
    setSelectedCheck(check)
    setShowDetails(true)
  }

  const handleViewRequestForm = (check: BackgroundCheck) => {
    setSelectedCheck(check)
    setEditingRequestId(check.id)
    setShowRequestForm(true)
  }

  const handleCreateNewRequest = () => {
    setEditingRequestId(undefined)
    setSelectedEntityType(null)
    setIsRegistered(null)
    setShowEntitySelectionModal(true)
  }

  const handleSaveRequest = (request: any) => {
    console.log('Saving request:', request)
    // Here you would typically save to your backend
    setShowRequestForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Background Checks</h1>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'overview'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('reports')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'reports'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Reports</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'settings'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Settings</span>
                  </button>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCreateNewRequest}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="px-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cost</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalCost)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Background Check Requests Table */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Background Check Requests</h2>
              <div className="flex items-center space-x-3">
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates, positions, or departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="all">All Priorities</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="all">All Departments</option>
                      <option value="engineering">Engineering</option>
                      <option value="finance">Finance</option>
                      <option value="marketing">Marketing</option>
                      <option value="hr">Human Resources</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Table Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Q Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                {/* Date Range Selector */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Start Jan 6, 2022 - End Jan 13, 2022</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  💡 Click on any row to view detailed background check information
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FIRST NAME</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MIDDLE NAME</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LAST NAME</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TRUST SCORE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BG CHECK SCORE</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE INITIATED</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {backgroundChecks.map((check, index) => {
                      // Generate mock data similar to the image
                      const names = check.candidateName.split(' ')
                      const firstName = names[0] || 'Unknown'
                      const middleName = 'Elijah'
                      const lastName = names[1] || 'Elias'
                      
                      // Generate trust score based on status
                      const getTrustScore = () => {
                        if (check.status === 'completed') {
                          const scores = [300, 241, 812, 790, 830, 932, 540]
                          return scores[index % scores.length]
                        }
                        return 'NIL'
                      }
                      
                      const trustScore = getTrustScore()
                      const getScoreColor = (score: number | string) => {
                        if (score === 'NIL') return 'bg-gray-100 text-gray-600'
                        if (typeof score === 'number') {
                          if (score < 400) return 'bg-red-100 text-red-700'
                          if (score < 600) return 'bg-orange-100 text-orange-700'
                          return 'bg-green-100 text-green-700'
                        }
                        return 'bg-gray-100 text-gray-600'
                      }
                      
                      return (
                        <tr 
                          key={check.id} 
                          className="hover:bg-blue-50 cursor-pointer transition-all duration-200 border-l-4 border-transparent hover:border-primary-500"
                          onClick={() => handleViewDetails(check)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className="rounded border-gray-300" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3 text-white font-semibold text-sm">
                                {firstName.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{firstName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{middleName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lastName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                              COMPLETED
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getScoreColor(trustScore)}`}>
                              {trustScore}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getScoreColor(trustScore)}`}>
                              {trustScore}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Oct 16, 2024 13:45:00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewRequestForm(check)}
                                className="text-primary-600 hover:text-primary-700"
                                title="View Request Form"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-700">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">← Previous</button>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">1</button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">2</button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">3</button>
                  <span className="px-2 text-gray-400">...</span>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">8</button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">9</button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">10</button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">Next →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {activeTab === 'reports' && (
        <div className="px-6 space-y-6">
          {/* Reports Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports Generated</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Processing Time</p>
                  <p className="text-2xl font-bold text-gray-900">2.3 days</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clearance Rate</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Report Categories */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Report Categories</h2>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export All Reports
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Criminal Background</h3>
                    <p className="text-sm text-gray-500">Criminal record checks</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Checks:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Clear Rate:</span>
                    <span className="font-medium text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Time:</span>
                    <span className="font-medium">1.2 days</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Employment History</h3>
                    <p className="text-sm text-gray-500">Previous employment verification</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Checks:</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Verified:</span>
                    <span className="font-medium text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Time:</span>
                    <span className="font-medium">2.1 days</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Education Verification</h3>
                    <p className="text-sm text-gray-500">Academic credentials check</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Checks:</span>
                    <span className="font-medium">38</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Verified:</span>
                    <span className="font-medium text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Time:</span>
                    <span className="font-medium">3.5 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
            <div className="space-y-4">
              {backgroundChecks.filter(check => check.status === 'completed').map((check) => (
                <div key={check.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{check.candidateName}</p>
                      <p className="text-sm text-gray-500">{check.position} • Completed {check.completionDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">Cost: {formatCurrency(check.cost)}</span>
                    <button className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="px-6 space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Default Check Types</label>
                
                {/* Personal & Identity Information */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Personal & Identity Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Address Verification</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">BVN Verification Check</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">NIN Verification Check</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">FRSC History</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Birth Certificate</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">State Residency</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Name change or alias history</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Phone number & email verification</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Passport History Verification</span>
                    </label>
                  </div>
                </div>

                {/* Criminal Record Check */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Criminal Record Check
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Criminal History</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Sexual Criminal History</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Financial Crime History</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Prison/Jail History</span>
                    </label>
                  </div>
                </div>

                {/* Financial & Credit History */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Financial & Credit History
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Credit History Verification</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Verified income sources & financial transactions</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Outstanding debts & liabilities</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Business financial history & investments</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">FIRS History</span>
                    </label>
                  </div>
                </div>

                {/* Association Verification */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Association Verification
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Membership in professional bodies History (NBA, ICAN, etc.)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Alumni networks (Harvard, Oxford, etc.)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Exclusive Industry Associations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Political Exposure (PEPs - Politically Exposed Persons)</span>
                    </label>
                  </div>
                </div>

                {/* Medical History */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Medical History
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Medical History</span>
                    </label>
                  </div>
                </div>

                {/* Professional Records */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Professional Records (Employment & Credentials)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Employment History</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">School records & Academic history</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Academic degrees & certifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Professional licenses & industry recognition</span>
                    </label>
                  </div>
                </div>

                {/* Social Media & Online Presence */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Social Media & Online Presence (Digital Reputation)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">News articles & public mentions (positive or negative)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Verified social media accounts (LinkedIn, Twitter, Instagram)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Online content & reputation analysis</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Thought leadership & professional contributions</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Priority Level</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Assigned To</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="sarah">Sarah Johnson</option>
                    <option value="michael">Michael Brown</option>
                    <option value="lisa">Lisa Davis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-approval Threshold</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="85" 
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">85%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Automatically approve candidates with scores above this threshold</p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email updates for background check status changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Receive SMS alerts for urgent background checks</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Dashboard Alerts</h3>
                  <p className="text-sm text-gray-500">Show notifications in the dashboard</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Integration Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">HR System Integration</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="none">No Integration</option>
                  <option value="bamboo">BambooHR</option>
                  <option value="workday">Workday</option>
                  <option value="adp">ADP</option>
                  <option value="custom">Custom API</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input 
                  type="url" 
                  placeholder="https://your-system.com/webhook/background-check"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Receive real-time updates when background checks are completed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <div className="flex space-x-2">
                  <input 
                    type="password" 
                    placeholder="Enter your API key"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Test
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Settings */}
          <div className="flex justify-end space-x-3">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Reset to Defaults
            </button>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Entity Selection Modal */}
      {showEntitySelectionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
            <button 
              onClick={() => setShowEntitySelectionModal(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">New Background Check Request</h3>
              <p className="text-gray-600">Let's get started by selecting the type of entity you want to perform a background check on.</p>
            </div>

            {/* Entity Type Selection */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">What type of entity are you checking?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedEntityType('individual')}
                  className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
                    selectedEntityType === 'individual'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedEntityType === 'individual' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <User className={`h-6 w-6 ${
                        selectedEntityType === 'individual' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Individual</h5>
                      <p className="text-sm text-gray-600">Check a person's background</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedEntityType('organization')}
                  className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
                    selectedEntityType === 'organization'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedEntityType === 'organization' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Building className={`h-6 w-6 ${
                        selectedEntityType === 'organization' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Organization</h5>
                      <p className="text-sm text-gray-600">Check a company's background</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Registration Status Selection */}
            {selectedEntityType && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Is this {selectedEntityType} registered with IDcertify?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsRegistered(true)}
                    className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
                      isRegistered === true
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isRegistered === true ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <CheckCircle className={`h-6 w-6 ${
                          isRegistered === true ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Yes, Registered</h5>
                        <p className="text-sm text-gray-600">They have an IDcertify account</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setIsRegistered(false)}
                    className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
                      isRegistered === false
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isRegistered === false ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        <User className={`h-6 w-6 ${
                          isRegistered === false ? 'text-orange-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">No, Not Registered</h5>
                        <p className="text-sm text-gray-600">They don't have an IDcertify account</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEntitySelectionModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isRegistered === true) {
                    setShowEntitySelectionModal(false)
                    setShowRegisteredUserForm(true)
                  } else if (isRegistered === false) {
                    setShowEntitySelectionModal(false)
                    setShowRequestForm(true)
                  }
                }}
                disabled={!selectedEntityType || isRegistered === null}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registered User Form Modal */}
      {showRegisteredUserForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
            <button 
              onClick={() => setShowRegisteredUserForm(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Registered {selectedEntityType === 'individual' ? 'Individual' : 'Organization'}</h3>
              <p className="text-gray-600">Please provide the {selectedEntityType === 'individual' ? 'person\'s' : 'organization\'s'} IDcertify details to pre-fill the form.</p>
            </div>

            <div className="space-y-6">
              {/* Search for Registered User */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search for {selectedEntityType === 'individual' ? 'Individual' : 'Organization'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Enter ${selectedEntityType === 'individual' ? 'name, email, or ID' : 'company name, email, or ID'}`}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mock Search Results */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">Search Results</h4>
                <div className="space-y-3">
                  {selectedEntityType === 'individual' ? (
                    // Individual results
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          J
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">John Doe</h5>
                          <p className="text-sm text-gray-600">john.doe@email.com • ID: IDC-123456</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          S
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">Sarah Johnson</h5>
                          <p className="text-sm text-gray-600">sarah.j@email.com • ID: IDC-789012</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    // Organization results
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          T
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">TechCorp Solutions</h5>
                          <p className="text-sm text-gray-600">info@techcorp.com • ID: IDC-ORG-001</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          I
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">InnovateLabs Inc.</h5>
                          <p className="text-sm text-gray-600">contact@innovatelabs.com • ID: IDC-ORG-002</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pre-filled Information Display */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Pre-filled Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Name:</span>
                    <span className="text-green-900 font-medium">
                      {selectedEntityType === 'individual' ? 'John Doe' : 'TechCorp Solutions'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Email:</span>
                    <span className="text-green-900 font-medium">
                      {selectedEntityType === 'individual' ? 'john.doe@email.com' : 'info@techcorp.com'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">IDcertify ID:</span>
                    <span className="text-green-900 font-medium">
                      {selectedEntityType === 'individual' ? 'IDC-123456' : 'IDC-ORG-001'}
                    </span>
                  </div>
                  {selectedEntityType === 'organization' && (
                    <div className="flex justify-between">
                      <span className="text-green-700">Registration Date:</span>
                      <span className="text-green-900 font-medium">Jan 15, 2023</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setShowRegisteredUserForm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setShowRegisteredUserForm(false)
                  setShowRequestForm(true)
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue with Pre-filled Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Check Details Page */}
      {showDetails && selectedCheck && (
        <BackgroundCheckDetailsPage
          backgroundCheck={selectedCheck}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* New Request Modal - Multi-Step Flow */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => {
                setShowNewRequest(false)
                resetNewRequest()
              }} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Background Check</h3>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-red-500' : currentStep > 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm font-medium text-gray-700">Candidate Basic Information</span>
                </div>
                <span className="text-sm font-medium text-red-600">STEP {currentStep} OF 3</span>
              </div>
            </div>

            {/* Step 1: Candidate Basic Information */}
            {currentStep === 1 && (
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Enter Candidate's Finclusion User ID?</h4>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Certify User ID</label>
                    <input
                      type="text"
                      value={newRequestData.userId}
                      onChange={(e) => {
                        setNewRequestData({...newRequestData, userId: e.target.value})
                        if (e.target.value.length > 0) {
                          handleUserIdSearch(e.target.value)
                        }
                      }}
                      className="w-full px-3 py-2 border border-red-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="189479274"
                    />
                    {isSearching && (
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-2"></div>
                        Searching for User ID
                      </div>
                    )}
                    {newRequestData.userId && newRequestData.userId !== '189479274' && !isSearching && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                        <X className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-red-700">You enter a wrong ID Certify User ID</span>
                      </div>
                    )}
                  </div>

                  {candidateInfo && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{candidateInfo.name}</h5>
                          <p className="text-sm text-gray-600">{candidateInfo.email}</p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {candidateInfo.score}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-orange-600">
                        <Info className="h-4 w-4 mr-2" />
                        Please note an authorisation request will be sent to the person above, before your request is processed.
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-4">Or Basic Information</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={newRequestData.candidatePhone}
                          onChange={(e) => setNewRequestData({...newRequestData, candidatePhone: e.target.value})}
                          className="w-full px-3 py-2 border border-red-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="07036723061"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={newRequestData.candidateEmail}
                          onChange={(e) => setNewRequestData({...newRequestData, candidateEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Email Address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name (Optional)</label>
                        <input
                          type="text"
                          value={newRequestData.candidateName.split(' ')[0] || ''}
                          onChange={(e) => setNewRequestData({...newRequestData, candidateName: e.target.value + ' ' + newRequestData.candidateName.split(' ').slice(1).join(' ')})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name (Optional)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Middle Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name (Optional)</label>
                        <input
                          type="text"
                          value={newRequestData.candidateName.split(' ').slice(1).join(' ') || ''}
                          onChange={(e) => setNewRequestData({...newRequestData, candidateName: newRequestData.candidateName.split(' ')[0] + ' ' + e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!candidateInfo && !newRequestData.candidatePhone}
                    className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Request Consent
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Select Background Check */}
            {currentStep === 2 && (
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h4 className="text-lg font-semibold text-gray-900">Select Background Check</h4>
                </div>
                <p className="text-gray-600 mb-6">Choose the types of background checks you want to run. The candidate will be prompted to provide specific documents or information for each selected checked.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Check Selection */}
                  <div className="space-y-4">
                    {/* Personal & Identity Information */}
                    <div className="border border-gray-200 rounded-lg">
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection('personalIdentity')}
                      >
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${expandedSections.personalIdentity ? 'rotate-0' : '-rotate-90'}`} />
                          Personal & Identity Information
                        </h5>
                      </div>
                      {expandedSections.personalIdentity && (
                        <div className="p-4 space-y-3">
                          {Object.entries(selectedChecks).slice(0, 9).map(([checkName, data]) => (
                            <label key={checkName} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={data.selected}
                                  onChange={() => handleCheckToggle(checkName)}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{checkName}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Criminal Record Check */}
                    <div className="border border-gray-200 rounded-lg">
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection('criminalRecord')}
                      >
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${expandedSections.criminalRecord ? 'rotate-0' : '-rotate-90'}`} />
                          Criminal Record Check
                        </h5>
                      </div>
                      {expandedSections.criminalRecord && (
                        <div className="p-4 space-y-3">
                          {Object.entries(selectedChecks).slice(9, 13).map(([checkName, data]) => (
                            <label key={checkName} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={data.selected}
                                  onChange={() => handleCheckToggle(checkName)}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{checkName}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Financial & Credit History */}
                    <div className="border border-gray-200 rounded-lg">
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection('financialCredit')}
                      >
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${expandedSections.financialCredit ? 'rotate-0' : '-rotate-90'}`} />
                          Financial & Credit History
                        </h5>
                      </div>
                      {expandedSections.financialCredit && (
                        <div className="p-4 space-y-3">
                          {Object.entries(selectedChecks).slice(13, 18).map(([checkName, data]) => (
                            <label key={checkName} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={data.selected}
                                  onChange={() => handleCheckToggle(checkName)}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{checkName}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Association Verification */}
                    <div className="border border-gray-200 rounded-lg">
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection('associationVerification')}
                      >
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${expandedSections.associationVerification ? 'rotate-0' : '-rotate-90'}`} />
                          Association Verification
                        </h5>
                      </div>
                      {expandedSections.associationVerification && (
                        <div className="p-4 space-y-3">
                          {Object.entries(selectedChecks).slice(18, 22).map(([checkName, data]) => (
                            <label key={checkName} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={data.selected}
                                  onChange={() => handleCheckToggle(checkName)}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{checkName}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Medical History */}
                    <div className="border border-gray-200 rounded-lg">
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection('medicalHistory')}
                      >
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${expandedSections.medicalHistory ? 'rotate-0' : '-rotate-90'}`} />
                          Medical History
                        </h5>
                      </div>
                      {expandedSections.medicalHistory && (
                        <div className="p-4 space-y-3">
                          {Object.entries(selectedChecks).slice(22, 23).map(([checkName, data]) => (
                            <label key={checkName} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={data.selected}
                                  onChange={() => handleCheckToggle(checkName)}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{checkName}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Professional Records */}
                    <div className="border border-gray-200 rounded-lg">
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection('professionalRecords')}
                      >
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${expandedSections.professionalRecords ? 'rotate-0' : '-rotate-90'}`} />
                          Professional Records (Employment & Credentials)
                        </h5>
                      </div>
                      {expandedSections.professionalRecords && (
                        <div className="p-4 space-y-3">
                          {Object.entries(selectedChecks).slice(23, 27).map(([checkName, data]) => (
                            <label key={checkName} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={data.selected}
                                  onChange={() => handleCheckToggle(checkName)}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{checkName}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Social Media & Online Presence */}
                    <div className="border border-gray-200 rounded-lg">
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection('socialMedia')}
                      >
                        <h5 className="font-semibold text-gray-900 flex items-center">
                          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${expandedSections.socialMedia ? 'rotate-0' : '-rotate-90'}`} />
                          Social Media & Online Presence (Digital Reputation)
                        </h5>
                      </div>
                      {expandedSections.socialMedia && (
                        <div className="p-4 space-y-3">
                          {Object.entries(selectedChecks).slice(27, 31).map(([checkName, data]) => (
                            <label key={checkName} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={data.selected}
                                  onChange={() => handleCheckToggle(checkName)}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm text-gray-700">{checkName}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Payment Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 mb-4">Payment Summary</h5>
                    {(() => {
                      const totals = calculateTotal()
                      const selectedItems = Object.entries(selectedChecks).filter(([_, data]) => data.selected)
                      
                      if (selectedItems.length === 0) {
                        return <p className="text-gray-500">No background Checks Selected</p>
                      }

                      return (
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600">Processing & Verification Fee</div>
                          <div className="text-sm font-medium text-gray-900">₦{totals.serviceFee.toLocaleString()}</div>
                          
                          {selectedItems.map(([checkName, data]) => (
                            <div key={checkName} className="flex justify-between text-sm">
                              <span className="text-gray-600">{checkName}</span>
                              <span className="font-medium text-gray-900">₦{data.price.toLocaleString()}</span>
                            </div>
                          ))}
                          
                          <div className="border-t border-gray-200 pt-3">
                            <div className="flex justify-between text-lg font-semibold">
                              <span>Total</span>
                              <span>₦{totals.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Pay
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Deposit */}
            {currentStep === 3 && (
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h4 className="text-lg font-semibold text-gray-900">Review and Deposit</h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Escrow Summary */}
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h5 className="font-semibold text-gray-900 mb-4">Escrow Summary</h5>
                      {(() => {
                        const totals = calculateTotal()
                        return (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Selected Background Checks Total</span>
                              <span className="font-medium">₦{totals.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Platform Service Fee</span>
                              <span className="font-medium">₦{totals.serviceFee.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3">
                              <div className="flex justify-between text-lg font-semibold">
                                <span>Total to Escrow</span>
                                <span>₦{totals.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h5 className="font-semibold text-gray-900 mb-4">Escrow Details</h5>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Funds will be held securely
                        </div>
                        <div className="flex items-center text-sm text-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Released after check is complete
                        </div>
                        <div className="flex items-center text-sm text-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Refund if candidate doesn't respond in 7d
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Wallet Information */}
                  <div className="space-y-6">
                    <div className="bg-red-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">WALLET</span>
                        <span className="text-sm opacity-75">Powered by SureBanker</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">₦20,132.00</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-2">₦14,632</div>
                        <div className="text-sm text-gray-600">Remaining after escrow</div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => setShowOTPModal(true)}
                        className="w-full px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 text-lg font-semibold"
                      >
                        Deposit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowOTPModal(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">OTP Verification</h3>
              <p className="text-sm text-gray-600">We texted a verification code to +23470*******061</p>
              <p className="text-sm text-gray-600 mt-2">
                You are authorizing a payment of <strong>NGN 5,000.00</strong> on <strong>1/12/2025</strong> from your <strong>SureBanker Account</strong> to <strong>SureEscrow</strong>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[1,2,3,4,5,6].map((digit) => (
                  <input
                    key={digit}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code? <span className="text-red-600 font-medium">Request new code 0:24</span>
                </p>
              </div>

              <button
                onClick={() => {
                  setShowOTPModal(false)
                  setShowSuccessModal(true)
                }}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                Pay
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <span className="text-red-600 font-medium">Request via code via Email</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => {
                setShowSuccessModal(false)
                setShowNewRequest(false)
                resetNewRequest()
              }} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent to Candidate</h3>
              <p className="text-sm text-gray-600 mb-6">
                Background check request for <strong className="text-red-600">Nene Oyinda Afamefuna</strong> has been successfully paid. Please allow up to 48 hours for the results to be processed.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  setShowNewRequest(false)
                  resetNewRequest()
                }}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                View Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Background Check Request Form */}
      {showRequestForm && (
        <BackgroundCheckRequestForm
          requestId={editingRequestId}
          entityType={selectedEntityType}
          isRegistered={isRegistered}
          preFilledData={isRegistered ? {
            firstName: selectedEntityType === 'individual' ? 'John' : 'TechCorp',
            middleName: selectedEntityType === 'individual' ? '' : '',
            lastName: selectedEntityType === 'individual' ? 'Doe' : 'Solutions',
            candidateEmail: selectedEntityType === 'individual' ? 'john.doe@email.com' : 'info@techcorp.com',
            idcertifyId: selectedEntityType === 'individual' ? 'IDC-123456' : 'IDC-ORG-001'
          } : undefined}
          onClose={() => {
            setShowRequestForm(false)
            setEditingRequestId(undefined)
            setSelectedEntityType(null)
            setIsRegistered(null)
          }}
          onSave={handleSaveRequest}
        />
      )}
    </div>
  )
}

export default BackgroundCheck
