import React, { useState, useEffect } from 'react'
import { 
  Code, 
  Database, 
  Zap, 
  Shield, 
  Settings, 
  Play, 
  Download, 
  Copy, 
  Eye, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  TrendingUp,
  BarChart3,
  Globe,
  Lock,
  Unlock,
  Key,
  Server,
  Network,
  Activity,
  FileText,
  Terminal,
  BookOpen,
  ExternalLink,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Download as DownloadIcon,
  Send,
  MessageSquare,
  Bell,
  AlertCircle,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Layers,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff
} from 'lucide-react'

interface APIEndpoint {
  id: string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  category: string
  version: string
  status: 'active' | 'deprecated' | 'beta' | 'maintenance'
  rateLimit: {
    requests: number
    period: string
  }
  authentication: string[]
  parameters: APIParameter[]
  responses: APIResponse[]
  examples: APIExample[]
  lastUpdated: string
  usage: {
    calls: number
    successRate: number
    avgResponseTime: number
  }
}

interface APIParameter {
  name: string
  type: string
  required: boolean
  description: string
  example: any
  validation?: any
}

interface APIResponse {
  status: number
  description: string
  schema: any
  example: any
}

interface APIExample {
  language: string
  title: string
  code: string
  description: string
}

interface GraphQLSchema {
  types: GraphQLType[]
  queries: GraphQLQuery[]
  mutations: GraphQLMutation[]
  subscriptions: GraphQLSubscription[]
}

interface GraphQLType {
  name: string
  description: string
  fields: GraphQLField[]
  kind: string
}

interface GraphQLField {
  name: string
  type: string
  description: string
  args: GraphQLArgument[]
}

interface GraphQLArgument {
  name: string
  type: string
  description: string
  defaultValue?: any
}

interface GraphQLQuery {
  name: string
  description: string
  type: string
  args: GraphQLArgument[]
}

interface GraphQLMutation {
  name: string
  description: string
  type: string
  args: GraphQLArgument[]
}

interface GraphQLSubscription {
  name: string
  description: string
  type: string
  args: GraphQLArgument[]
}

interface AdvancedAPIManagementProps {
  onTestEndpoint: (endpoint: APIEndpoint) => void
  onGenerateSDK: (platform: string) => void
  onViewDocs: (endpoint: APIEndpoint) => void
  onClose: () => void
}

const AdvancedAPIManagement: React.FC<AdvancedAPIManagementProps> = ({
  onTestEndpoint,
  onGenerateSDK,
  onViewDocs,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'rest' | 'graphql' | 'webhooks' | 'testing' | 'monitoring'>('rest')
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCodePreview, setShowCodePreview] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([])
  const [graphqlSchema, setGraphqlSchema] = useState<GraphQLSchema | null>(null)

  useEffect(() => {
    loadAPIData()
  }, [])

  const loadAPIData = async () => {
    // Mock data - in real app, this would come from API
    const mockEndpoints: APIEndpoint[] = [
      {
        id: '1',
        name: 'Start Verification',
        method: 'POST',
        path: '/api/v1/verifications',
        description: 'Initiate a new verification process',
        category: 'verification',
        version: 'v1',
        status: 'active',
        rateLimit: { requests: 100, period: 'minute' },
        authentication: ['api-key', 'jwt'],
        parameters: [
          {
            name: 'flowId',
            type: 'string',
            required: true,
            description: 'The ID of the verification flow to use',
            example: 'flow_kyc_001'
          },
          {
            name: 'customerId',
            type: 'string',
            required: true,
            description: 'Unique identifier for the customer',
            example: 'cust_12345'
          },
          {
            name: 'metadata',
            type: 'object',
            required: false,
            description: 'Additional metadata for the verification',
            example: { source: 'mobile-app', campaign: 'signup-2024' }
          }
        ],
        responses: [
          {
            status: 201,
            description: 'Verification created successfully',
            schema: { type: 'object' },
            example: {
              id: 'ver_12345',
              status: 'pending',
              flowId: 'flow_kyc_001',
              customerId: 'cust_12345',
              createdAt: '2024-01-20T10:30:00Z',
              verificationUrl: 'https://verify.idcertify.com/ver_12345'
            }
          },
          {
            status: 400,
            description: 'Bad request - invalid parameters',
            schema: { type: 'object' },
            example: {
              error: 'INVALID_PARAMETERS',
              message: 'flowId is required',
              details: { field: 'flowId', code: 'REQUIRED' }
            }
          }
        ],
        examples: [
          {
            language: 'javascript',
            title: 'Node.js Example',
            code: `
const response = await fetch('https://api.idcertify.com/v1/verifications', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    flowId: 'flow_kyc_001',
    customerId: 'cust_12345',
    metadata: {
      source: 'mobile-app',
      campaign: 'signup-2024'
    }
  })
});

const verification = await response.json();
console.log('Verification created:', verification);
            `,
            description: 'Create a new verification using Node.js'
          },
          {
            language: 'python',
            title: 'Python Example',
            code: `
import requests

response = requests.post(
    'https://api.idcertify.com/v1/verifications',
    headers={
        'Authorization': 'Bearer your-api-key',
        'Content-Type': 'application/json'
    },
    json={
        'flowId': 'flow_kyc_001',
        'customerId': 'cust_12345',
        'metadata': {
            'source': 'mobile-app',
            'campaign': 'signup-2024'
        }
    }
)

verification = response.json()
print('Verification created:', verification)
            `,
            description: 'Create a new verification using Python'
          }
        ],
        lastUpdated: '2024-01-15T14:30:00Z',
        usage: {
          calls: 15420,
          successRate: 98.5,
          avgResponseTime: 245
        }
      },
      {
        id: '2',
        name: 'Get Verification Status',
        method: 'GET',
        path: '/api/v1/verifications/{id}',
        description: 'Retrieve the status and details of a verification',
        category: 'verification',
        version: 'v1',
        status: 'active',
        rateLimit: { requests: 1000, period: 'minute' },
        authentication: ['api-key', 'jwt'],
        parameters: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'The verification ID',
            example: 'ver_12345'
          }
        ],
        responses: [
          {
            status: 200,
            description: 'Verification details retrieved successfully',
            schema: { type: 'object' },
            example: {
              id: 'ver_12345',
              status: 'completed',
              flowId: 'flow_kyc_001',
              customerId: 'cust_12345',
              createdAt: '2024-01-20T10:30:00Z',
              completedAt: '2024-01-20T10:45:00Z',
              result: {
                overallScore: 95,
                confidence: 0.92,
                riskLevel: 'low',
                compliance: { kyc: true, aml: true }
              }
            }
          }
        ],
        examples: [
          {
            language: 'javascript',
            title: 'Node.js Example',
            code: `
const response = await fetch('https://api.idcertify.com/v1/verifications/ver_12345', {
  headers: {
    'Authorization': 'Bearer your-api-key'
  }
});

const verification = await response.json();
console.log('Verification status:', verification.status);
            `,
            description: 'Get verification status using Node.js'
          }
        ],
        lastUpdated: '2024-01-15T14:30:00Z',
        usage: {
          calls: 25680,
          successRate: 99.2,
          avgResponseTime: 120
        }
      }
    ]

    const mockGraphQLSchema: GraphQLSchema = {
      types: [
        {
          name: 'Verification',
          description: 'A verification process',
          kind: 'OBJECT',
          fields: [
            {
              name: 'id',
              type: 'ID!',
              description: 'Unique identifier for the verification',
              args: []
            },
            {
              name: 'status',
              type: 'VerificationStatus!',
              description: 'Current status of the verification',
              args: []
            },
            {
              name: 'customer',
              type: 'Customer!',
              description: 'Customer associated with the verification',
              args: []
            },
            {
              name: 'result',
              type: 'VerificationResult',
              description: 'Result of the verification process',
              args: []
            }
          ]
        }
      ],
      queries: [
        {
          name: 'verification',
          description: 'Get a verification by ID',
          type: 'Verification',
          args: [
            {
              name: 'id',
              type: 'ID!',
              description: 'The verification ID'
            }
          ]
        },
        {
          name: 'verifications',
          description: 'Get a list of verifications',
          type: '[Verification!]!',
          args: [
            {
              name: 'filter',
              type: 'VerificationFilter',
              description: 'Filter criteria for verifications'
            },
            {
              name: 'limit',
              type: 'Int',
              description: 'Maximum number of verifications to return',
              defaultValue: 10
            }
          ]
        }
      ],
      mutations: [
        {
          name: 'createVerification',
          description: 'Create a new verification',
          type: 'Verification!',
          args: [
            {
              name: 'input',
              type: 'CreateVerificationInput!',
              description: 'Input data for creating a verification'
            }
          ]
        }
      ],
      subscriptions: [
        {
          name: 'verificationUpdated',
          description: 'Subscribe to verification status updates',
          type: 'Verification!',
          args: [
            {
              name: 'id',
              type: 'ID!',
              description: 'The verification ID to subscribe to'
            }
          ]
        }
      ]
    }

    setEndpoints(mockEndpoints)
    setGraphqlSchema(mockGraphQLSchema)
  }

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         endpoint.path.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || endpoint.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || endpoint.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800'
      case 'POST':
        return 'bg-blue-100 text-blue-800'
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800'
      case 'DELETE':
        return 'bg-red-100 text-red-800'
      case 'PATCH':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'deprecated':
        return 'bg-red-100 text-red-800'
      case 'beta':
        return 'bg-yellow-100 text-yellow-800'
      case 'maintenance':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const testEndpoint = async (endpoint: APIEndpoint) => {
    setIsTesting(true)
    setSelectedEndpoint(endpoint)
    
    // Simulate API test
    setTimeout(() => {
      setTestResults({
        status: 200,
        responseTime: Math.random() * 500 + 100,
        response: {
          id: 'test_verification',
          status: 'completed',
          result: { score: 95, confidence: 0.92 }
        },
        timestamp: new Date().toISOString()
      })
      setIsTesting(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'verification', name: 'Verification' },
    { id: 'customer', name: 'Customer' },
    { id: 'flow', name: 'Flow Management' },
    { id: 'webhook', name: 'Webhooks' },
    { id: 'analytics', name: 'Analytics' }
  ]

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'beta', name: 'Beta' },
    { id: 'deprecated', name: 'Deprecated' },
    { id: 'maintenance', name: 'Maintenance' }
  ]

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'php', name: 'PHP' },
    { id: 'java', name: 'Java' },
    { id: 'csharp', name: 'C#' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'go', name: 'Go' },
    { id: 'curl', name: 'cURL' }
  ]

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Advanced API Management</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            REST & GraphQL
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onGenerateSDK('javascript')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Generate SDK</span>
          </button>
          
          <button
            onClick={() => onViewDocs(selectedEndpoint || endpoints[0])}
            disabled={!selectedEndpoint && endpoints.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <BookOpen className="h-4 w-4" />
            <span>View Docs</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Tabs */}
            <div className="space-y-2">
              {[
                { id: 'rest', name: 'REST API', icon: Code },
                { id: 'graphql', name: 'GraphQL', icon: Database },
                { id: 'webhooks', name: 'Webhooks', icon: Zap },
                { id: 'testing', name: 'API Testing', icon: Play },
                { id: 'monitoring', name: 'Monitoring', icon: BarChart3 }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Filters */}
            {activeTab === 'rest' && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Filters</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search endpoints..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status.id} value={status.id}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'rest' && (
            <div className="p-6 space-y-6">
              {/* API Overview */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">REST API Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{endpoints.length}</div>
                    <div className="text-sm text-gray-600">Endpoints</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">245ms</div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">v1</div>
                    <div className="text-sm text-gray-600">Latest Version</div>
                  </div>
                </div>
              </div>

              {/* Endpoints List */}
              <div className="space-y-4">
                {filteredEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedEndpoint(endpoint)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-800">{endpoint.path}</code>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(endpoint.status)}`}>
                          {endpoint.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            testEndpoint(endpoint)
                          }}
                          disabled={isTesting}
                          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onViewDocs(endpoint)
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{endpoint.name}</h3>
                    <p className="text-gray-600 mb-4">{endpoint.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Rate Limit: {endpoint.rateLimit.requests}/{endpoint.rateLimit.period}</span>
                        <span>Auth: {endpoint.authentication.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{endpoint.usage.calls.toLocaleString()} calls</span>
                        <span>{endpoint.usage.successRate}% success</span>
                        <span>{endpoint.usage.avgResponseTime}ms avg</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'graphql' && graphqlSchema && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">GraphQL API</h2>
                <p className="text-gray-600">
                  Query your data with GraphQL for more efficient and flexible data fetching.
                </p>
              </div>

              {/* GraphQL Playground */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">GraphQL Playground</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Query
                    </label>
                    <textarea
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="query { verifications { id status result { score } } }"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response
                    </label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm min-h-[200px]">
                      {`{
  "data": {
    "verifications": [
      {
        "id": "ver_12345",
        "status": "completed",
        "result": {
          "score": 95
        }
      }
    ]
  }
}`}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Play className="h-4 w-4" />
                    <span>Execute Query</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Copy className="h-4 w-4" />
                    <span>Copy Query</span>
                  </button>
                </div>
              </div>

              {/* Schema Explorer */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Schema Explorer</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Queries</h4>
                    <div className="space-y-2">
                      {graphqlSchema.queries.map((query) => (
                        <div key={query.name} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <code className="text-sm font-mono text-blue-600">{query.name}</code>
                              <p className="text-sm text-gray-600">{query.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Mutations</h4>
                    <div className="space-y-2">
                      {graphqlSchema.mutations.map((mutation) => (
                        <div key={mutation.name} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <code className="text-sm font-mono text-green-600">{mutation.name}</code>
                              <p className="text-sm text-gray-600">{mutation.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testing' && selectedEndpoint && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">API Testing</h2>
                <p className="text-gray-600">
                  Test the <code className="bg-gray-100 px-1 rounded">{selectedEndpoint.method} {selectedEndpoint.path}</code> endpoint
                </p>
              </div>

              {/* Test Configuration */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Test Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Environment
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="sandbox">Sandbox</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Authentication
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="api-key">API Key</option>
                      <option value="jwt">JWT Token</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Body
                  </label>
                  <textarea
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Enter request body (JSON)"
                    defaultValue={JSON.stringify({
                      flowId: 'flow_kyc_001',
                      customerId: 'cust_12345',
                      metadata: { source: 'test' }
                    }, null, 2)}
                  />
                </div>
                
                <div className="mt-4 flex items-center space-x-3">
                  <button
                    onClick={() => testEndpoint(selectedEndpoint)}
                    disabled={isTesting}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isTesting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    <span>{isTesting ? 'Testing...' : 'Run Test'}</span>
                  </button>
                </div>
              </div>

              {/* Test Results */}
              {testResults && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-md font-semibold text-gray-900 mb-4">Test Results</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status Code</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        testResults.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {testResults.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-medium text-gray-900">{testResults.responseTime.toFixed(0)}ms</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Timestamp</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(testResults.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Response Body
                      </label>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-100">
                          <code>{JSON.stringify(testResults.response, null, 2)}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">API Monitoring</h2>
                <p className="text-gray-600">
                  Monitor API performance, usage, and health in real-time.
                </p>
              </div>

              {/* Monitoring Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Requests/min</p>
                      <p className="text-2xl font-bold text-gray-900">1,247</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">98.5%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-2xl font-bold text-gray-900">245ms</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Errors</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Performance Trends</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Performance chart would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdvancedAPIManagement
