import React, { useState } from 'react'
import { 
  Code, 
  Play, 
  Copy, 
  Download, 
  BookOpen, 
  Settings, 
  Shield, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Database,
  Key,
  Lock,
  FileText,
  Send,
  RefreshCw,
  Star,
  Flag,
  Tag,
  Calendar,
  DollarSign,
  CreditCard,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  MoreVertical
} from 'lucide-react'

interface APIEndpoint {
  id: string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  description: string
  parameters: {
    name: string
    type: string
    required: boolean
    description: string
  }[]
  response: any
  example: {
    request: any
    response: any
  }
}

interface BackgroundCheckRequest {
  id: string
  candidateName: string
  candidateEmail: string
  position: string
  company: string
  requestDate: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  cost: number
  checks: string[]
  results?: any
  apiCalls: number
  responseTime: number
}

const BackgroundCheckAPI = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'requests' | 'analytics' | 'documentation'>('overview')
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null)
  const [showCodeExample, setShowCodeExample] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Mock API endpoints
  const apiEndpoints: APIEndpoint[] = [
    {
      id: '1',
      name: 'Initiate Background Check',
      method: 'POST',
      endpoint: '/api/v1/background-check/initiate',
      description: 'Start a new background check process for a candidate',
      parameters: [
        { name: 'candidate_name', type: 'string', required: true, description: 'Full name of the candidate' },
        { name: 'candidate_email', type: 'string', required: true, description: 'Email address of the candidate' },
        { name: 'candidate_phone', type: 'string', required: true, description: 'Phone number of the candidate' },
        { name: 'position', type: 'string', required: true, description: 'Job position being applied for' },
        { name: 'company', type: 'string', required: true, description: 'Company name' },
        { name: 'checks', type: 'array', required: true, description: 'Array of check types to perform' },
        { name: 'priority', type: 'string', required: false, description: 'Priority level (low, medium, high, urgent)' }
      ],
      response: {
        success: true,
        data: {
          request_id: 'BC-2024-001',
          status: 'pending',
          estimated_completion: '2024-01-18T10:00:00Z',
          cost: 25000
        }
      },
      example: {
        request: {
          candidate_name: 'John Smith',
          candidate_email: 'john.smith@email.com',
          candidate_phone: '+234 801 234 5678',
          position: 'Senior Software Engineer',
          company: 'TechCorp Solutions',
          checks: ['criminal', 'employment', 'education', 'identity'],
          priority: 'high'
        },
        response: {
          success: true,
          data: {
            request_id: 'BC-2024-001',
            status: 'pending',
            estimated_completion: '2024-01-18T10:00:00Z',
            cost: 25000
          }
        }
      }
    },
    {
      id: '2',
      name: 'Get Check Status',
      method: 'GET',
      endpoint: '/api/v1/background-check/{request_id}/status',
      description: 'Retrieve the current status of a background check request',
      parameters: [
        { name: 'request_id', type: 'string', required: true, description: 'Unique identifier for the background check request' }
      ],
      response: {
        success: true,
        data: {
          request_id: 'BC-2024-001',
          status: 'completed',
          progress: 100,
          completed_checks: ['criminal', 'employment', 'education', 'identity'],
          results: {
            criminal: 'clear',
            employment: 'verified',
            education: 'verified',
            identity: 'verified'
          }
        }
      },
      example: {
        request: {},
        response: {
          success: true,
          data: {
            request_id: 'BC-2024-001',
            status: 'completed',
            progress: 100,
            completed_checks: ['criminal', 'employment', 'education', 'identity'],
            results: {
              criminal: 'clear',
              employment: 'verified',
              education: 'verified',
              identity: 'verified'
            }
          }
        }
      }
    },
    {
      id: '3',
      name: 'Get Check Results',
      method: 'GET',
      endpoint: '/api/v1/background-check/{request_id}/results',
      description: 'Retrieve detailed results of a completed background check',
      parameters: [
        { name: 'request_id', type: 'string', required: true, description: 'Unique identifier for the background check request' }
      ],
      response: {
        success: true,
        data: {
          request_id: 'BC-2024-001',
          candidate_name: 'John Smith',
          status: 'completed',
          results: {
            criminal: {
              status: 'clear',
              details: 'No criminal records found',
              verified_date: '2024-01-18T09:30:00Z'
            },
            employment: {
              status: 'verified',
              details: 'Previous employment verified',
              verified_date: '2024-01-18T10:15:00Z'
            }
          },
          report_url: 'https://api.idcertify.com/reports/BC-2024-001.pdf'
        }
      },
      example: {
        request: {},
        response: {
          success: true,
          data: {
            request_id: 'BC-2024-001',
            candidate_name: 'John Smith',
            status: 'completed',
            results: {
              criminal: {
                status: 'clear',
                details: 'No criminal records found',
                verified_date: '2024-01-18T09:30:00Z'
              }
            },
            report_url: 'https://api.idcertify.com/reports/BC-2024-001.pdf'
          }
        }
      }
    }
  ]

  // Mock background check requests
  const backgroundCheckRequests: BackgroundCheckRequest[] = [
    {
      id: 'BC-2024-001',
      candidateName: 'John Smith',
      candidateEmail: 'john.smith@email.com',
      position: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      requestDate: '2024-01-15',
      status: 'completed',
      cost: 25000,
      checks: ['criminal', 'employment', 'education', 'identity'],
      apiCalls: 12,
      responseTime: 245
    },
    {
      id: 'BC-2024-002',
      candidateName: 'Maria Garcia',
      candidateEmail: 'maria.garcia@email.com',
      position: 'Financial Analyst',
      company: 'Global Finance Bank',
      requestDate: '2024-01-20',
      status: 'processing',
      cost: 30000,
      checks: ['criminal', 'employment', 'education', 'credit', 'identity'],
      apiCalls: 8,
      responseTime: 189
    },
    {
      id: 'BC-2024-003',
      candidateName: 'David Wilson',
      candidateEmail: 'david.wilson@email.com',
      position: 'Marketing Manager',
      company: 'Creative Agency Ltd',
      requestDate: '2024-01-22',
      status: 'pending',
      cost: 20000,
      checks: ['criminal', 'employment', 'education', 'identity'],
      apiCalls: 3,
      responseTime: 156
    }
  ]

  const stats = {
    totalRequests: backgroundCheckRequests.length,
    completed: backgroundCheckRequests.filter(req => req.status === 'completed').length,
    processing: backgroundCheckRequests.filter(req => req.status === 'processing').length,
    pending: backgroundCheckRequests.filter(req => req.status === 'pending').length,
    totalRevenue: backgroundCheckRequests.reduce((sum, req) => sum + req.cost, 0),
    averageResponseTime: Math.round(backgroundCheckRequests.reduce((sum, req) => sum + req.responseTime, 0) / backgroundCheckRequests.length),
    totalApiCalls: backgroundCheckRequests.reduce((sum, req) => sum + req.apiCalls, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800'
      case 'POST': return 'bg-blue-100 text-blue-800'
      case 'PUT': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  const handleTestEndpoint = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint)
    setShowCodeExample(true)
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Background Check API</h1>
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
                    onClick={() => setActiveTab('endpoints')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'endpoints'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>API Endpoints</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'requests'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Requests</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'analytics'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Analytics</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('documentation')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'documentation'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Documentation</span>
                  </button>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Keys
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
                  <Users className="h-6 w-6 text-blue-600" />
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
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageResponseTime}ms</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">1. Get API Key</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Generate your API key to start making requests</p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Generate Key →
                </button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">2. Make Request</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Use our REST API to initiate background checks</p>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  View Endpoints →
                </button>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">3. Get Results</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Receive comprehensive background check reports</p>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View Results →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent API Requests</h2>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {backgroundCheckRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{request.candidateName}</p>
                      <p className="text-sm text-gray-500">{request.position} • {request.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="text-sm text-gray-500">{request.apiCalls} calls</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'endpoints' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">API Endpoints</h2>
              <div className="flex items-center space-x-3">
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download SDK
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Full Docs
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {apiEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{endpoint.name}</h3>
                      <p className="text-gray-600">{endpoint.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTestEndpoint(endpoint)}
                        className="text-primary-600 hover:text-primary-700 p-2"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 p-2">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Parameters</h4>
                      <div className="space-y-2">
                        {endpoint.parameters.map((param, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <code className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">
                                {param.name}
                              </code>
                              <span className="text-gray-500">({param.type})</span>
                              {param.required && (
                                <span className="text-red-500 text-xs">*</span>
                              )}
                            </div>
                            <span className="text-gray-500 text-xs">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Example Response</h4>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                        <pre>{JSON.stringify(endpoint.response, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="px-6 space-y-6">
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
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Calls</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backgroundCheckRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                          {request.id}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.candidateName}</div>
                          <div className="text-sm text-gray-500">{request.position}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(request.cost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.apiCalls}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.responseTime}ms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-primary-600 hover:text-primary-700">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-700">
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
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">API Analytics</h2>
            <p className="text-gray-600">Detailed analytics and performance metrics for your Background Check API usage.</p>
          </div>
        </div>
      )}

      {activeTab === 'documentation' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h2>
            <p className="text-gray-600">Comprehensive documentation for integrating Background Check API into your platform.</p>
          </div>
        </div>
      )}

      {/* Code Example Modal */}
      {showCodeExample && selectedEndpoint && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setShowCodeExample(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEndpoint.name}</h3>
              <p className="text-gray-600">{selectedEndpoint.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Request Example</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{JSON.stringify(selectedEndpoint.example.request, null, 2)}</pre>
                </div>
                <button
                  onClick={() => handleCopyCode(JSON.stringify(selectedEndpoint.example.request, null, 2))}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  Copy Request
                </button>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Response Example</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{JSON.stringify(selectedEndpoint.example.response, null, 2)}</pre>
                </div>
                <button
                  onClick={() => handleCopyCode(JSON.stringify(selectedEndpoint.example.response, null, 2))}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  Copy Response
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowCodeExample(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
                <Play className="h-4 w-4" />
                Test Endpoint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundCheckAPI
