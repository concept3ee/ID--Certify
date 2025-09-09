import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  Lock, 
  Key, 
  Users, 
  Settings, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight, 
  BarChart3, 
  Activity, 
  Clock, 
  Globe, 
  Server, 
  Network, 
  Database, 
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
  Play, 
  Pause, 
  RotateCcw, 
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
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Award, 
  Flag, 
  AlertCircle, 
  Check, 
  Minus, 
  MoreHorizontal, 
  MoreVertical
} from 'lucide-react'

interface SSOProvider {
  id: string
  name: string
  type: 'saml' | 'oauth' | 'oidc' | 'ldap' | 'azure-ad' | 'okta' | 'google' | 'microsoft'
  status: 'active' | 'inactive' | 'error' | 'pending'
  description: string
  icon: string
  configuration: {
    endpoint: string
    clientId: string
    clientSecret: string
    redirectUri: string
    scopes: string[]
    attributes: string[]
  }
  users: {
    total: number
    active: number
    lastSync: string
  }
  security: {
    encryption: boolean
    certificateValidation: boolean
    tokenExpiry: number
    refreshToken: boolean
  }
  compliance: {
    gdpr: boolean
    ccpa: boolean
    sox: boolean
    hipaa: boolean
    iso27001: boolean
  }
  lastUpdated: string
  createdBy: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  users: number
  createdAt: string
  updatedAt: string
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failure' | 'warning'
  details: any
}

interface SecurityPolicy {
  id: string
  name: string
  type: 'password' | 'session' | 'api' | 'network' | 'data'
  enabled: boolean
  rules: any[]
  lastUpdated: string
}

interface EnterpriseSecurityProps {
  onConfigureSSO: (provider: SSOProvider) => void
  onManageRoles: (role: Role) => void
  onViewAuditLogs: () => void
  onClose: () => void
}

const EnterpriseSecurity: React.FC<EnterpriseSecurityProps> = ({
  onConfigureSSO,
  onManageRoles,
  onViewAuditLogs,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sso' | 'rbac' | 'audit' | 'policies' | 'compliance'>('overview')
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [ssoProviders, setSsoProviders] = useState<SSOProvider[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>([])

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockSSOProviders: SSOProvider[] = [
      {
        id: '1',
        name: 'Azure Active Directory',
        type: 'azure-ad',
        status: 'active',
        description: 'Microsoft Azure Active Directory integration',
        icon: 'azure',
        configuration: {
          endpoint: 'https://login.microsoftonline.com/tenant-id/oauth2/v2.0/authorize',
          clientId: 'azure-client-id',
          clientSecret: '***',
          redirectUri: 'https://app.idcertify.com/auth/azure/callback',
          scopes: ['openid', 'profile', 'email'],
          attributes: ['email', 'name', 'groups', 'roles']
        },
        users: {
          total: 150,
          active: 142,
          lastSync: '2024-01-20T10:30:00Z'
        },
        security: {
          encryption: true,
          certificateValidation: true,
          tokenExpiry: 3600,
          refreshToken: true
        },
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: true,
          iso27001: true
        },
        lastUpdated: '2024-01-15T14:30:00Z',
        createdBy: 'admin@idcertify.com'
      },
      {
        id: '2',
        name: 'Okta',
        type: 'okta',
        status: 'active',
        description: 'Okta identity provider integration',
        icon: 'okta',
        configuration: {
          endpoint: 'https://company.okta.com/oauth2/default/v1/authorize',
          clientId: 'okta-client-id',
          clientSecret: '***',
          redirectUri: 'https://app.idcertify.com/auth/okta/callback',
          scopes: ['openid', 'profile', 'email'],
          attributes: ['email', 'name', 'groups', 'roles']
        },
        users: {
          total: 89,
          active: 85,
          lastSync: '2024-01-20T09:45:00Z'
        },
        security: {
          encryption: true,
          certificateValidation: true,
          tokenExpiry: 3600,
          refreshToken: true
        },
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: false,
          iso27001: true
        },
        lastUpdated: '2024-01-10T11:20:00Z',
        createdBy: 'admin@idcertify.com'
      },
      {
        id: '3',
        name: 'Google Workspace',
        type: 'google',
        status: 'inactive',
        description: 'Google Workspace SSO integration',
        icon: 'google',
        configuration: {
          endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
          clientId: 'google-client-id',
          clientSecret: '***',
          redirectUri: 'https://app.idcertify.com/auth/google/callback',
          scopes: ['openid', 'profile', 'email'],
          attributes: ['email', 'name', 'groups']
        },
        users: {
          total: 0,
          active: 0,
          lastSync: '2024-01-05T16:15:00Z'
        },
        security: {
          encryption: true,
          certificateValidation: true,
          tokenExpiry: 3600,
          refreshToken: true
        },
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: false,
          hipaa: false,
          iso27001: false
        },
        lastUpdated: '2024-01-05T16:15:00Z',
        createdBy: 'admin@idcertify.com'
      }
    ]

    const mockRoles: Role[] = [
      {
        id: '1',
        name: 'Super Admin',
        description: 'Full system access with all permissions',
        permissions: [
          'user:create', 'user:read', 'user:update', 'user:delete',
          'tenant:create', 'tenant:read', 'tenant:update', 'tenant:delete',
          'sso:configure', 'audit:read', 'billing:manage', 'security:configure'
        ],
        users: 3,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        name: 'Tenant Admin',
        description: 'Full access within assigned tenant',
        permissions: [
          'user:create', 'user:read', 'user:update', 'user:delete',
          'verification:create', 'verification:read', 'verification:update',
          'analytics:read', 'settings:update'
        ],
        users: 15,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-10T11:20:00Z'
      },
      {
        id: '3',
        name: 'Verification Manager',
        description: 'Manage verification processes and review results',
        permissions: [
          'verification:create', 'verification:read', 'verification:update',
          'analytics:read', 'reports:generate'
        ],
        users: 45,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-08T09:15:00Z'
      },
      {
        id: '4',
        name: 'Viewer',
        description: 'Read-only access to verification data and analytics',
        permissions: [
          'verification:read', 'analytics:read', 'reports:view'
        ],
        users: 120,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-05T16:15:00Z'
      }
    ]

    const mockAuditLogs: AuditLog[] = [
      {
        id: '1',
        timestamp: '2024-01-20T14:45:00Z',
        user: 'admin@idcertify.com',
        action: 'LOGIN_SUCCESS',
        resource: 'Authentication',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        status: 'success',
        details: { method: 'SSO', provider: 'Azure AD' }
      },
      {
        id: '2',
        timestamp: '2024-01-20T14:30:00Z',
        user: 'user@acme.com',
        action: 'VERIFICATION_CREATE',
        resource: 'Verification',
        ipAddress: '10.0.0.50',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        status: 'success',
        details: { verificationId: 'ver_12345', flowId: 'flow_kyc_001' }
      },
      {
        id: '3',
        timestamp: '2024-01-20T14:15:00Z',
        user: 'admin@techstart.com',
        action: 'SSO_CONFIG_UPDATE',
        resource: 'SSO Configuration',
        ipAddress: '172.16.0.25',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
        status: 'success',
        details: { provider: 'Okta', changes: ['endpoint', 'scopes'] }
      },
      {
        id: '4',
        timestamp: '2024-01-20T14:00:00Z',
        user: 'unknown@external.com',
        action: 'LOGIN_FAILED',
        resource: 'Authentication',
        ipAddress: '203.0.113.1',
        userAgent: 'curl/7.68.0',
        status: 'failure',
        details: { reason: 'Invalid credentials', attempts: 3 }
      }
    ]

    const mockSecurityPolicies: SecurityPolicy[] = [
      {
        id: '1',
        name: 'Password Policy',
        type: 'password',
        enabled: true,
        rules: [
          { type: 'minLength', value: 12 },
          { type: 'requireUppercase', value: true },
          { type: 'requireLowercase', value: true },
          { type: 'requireNumbers', value: true },
          { type: 'requireSpecialChars', value: true },
          { type: 'maxAge', value: 90 }
        ],
        lastUpdated: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        name: 'Session Management',
        type: 'session',
        enabled: true,
        rules: [
          { type: 'timeout', value: 3600 },
          { type: 'maxConcurrent', value: 3 },
          { type: 'requireReauth', value: true },
          { type: 'rememberMe', value: false }
        ],
        lastUpdated: '2024-01-10T11:20:00Z'
      },
      {
        id: '3',
        name: 'API Security',
        type: 'api',
        enabled: true,
        rules: [
          { type: 'rateLimit', value: 1000 },
          { type: 'requireAuth', value: true },
          { type: 'ipWhitelist', value: [] },
          { type: 'auditLogging', value: true }
        ],
        lastUpdated: '2024-01-08T09:15:00Z'
      }
    ]

    setTimeout(() => {
      setSsoProviders(mockSSOProviders)
      setRoles(mockRoles)
      setAuditLogs(mockAuditLogs)
      setSecurityPolicies(mockSecurityPolicies)
      setIsLoading(false)
    }, 1000)
  }

  const filteredSSOProviders = ssoProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failure':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'azure-ad':
        return <Building className="h-5 w-5 text-blue-600" />
      case 'okta':
        return <Shield className="h-5 w-5 text-purple-600" />
      case 'google':
        return <Globe className="h-5 w-5 text-red-600" />
      case 'microsoft':
        return <Building className="h-5 w-5 text-blue-600" />
      default:
        return <Key className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Enterprise Security</h1>
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            Security
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewAuditLogs()}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Audit Logs</span>
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add SSO</span>
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
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'sso', name: 'SSO Providers', icon: Key },
                { id: 'rbac', name: 'Roles & Permissions', icon: Users },
                { id: 'audit', name: 'Audit Logs', icon: FileText },
                { id: 'policies', name: 'Security Policies', icon: Shield },
                { id: 'compliance', name: 'Compliance', icon: CheckCircle }
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
            {activeTab === 'sso' && (
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
                        placeholder="Search providers..."
                      />
                    </div>
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
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="error">Error</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Security Overview</h2>
                <p className="text-gray-600">
                  Monitor and manage enterprise security features including SSO, RBAC, and compliance.
                </p>
              </div>

              {/* Security Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Key className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">SSO Providers</p>
                      <p className="text-2xl font-bold text-gray-900">{ssoProviders.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {ssoProviders.reduce((acc, provider) => acc + provider.users.active, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Security Policies</p>
                      <p className="text-2xl font-bold text-gray-900">{securityPolicies.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                      <p className="text-2xl font-bold text-gray-900">98%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Security Events */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Events</h3>
                <div className="space-y-4">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{log.action}</p>
                          <p className="text-xs text-gray-600">
                            {log.user} • {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getActionStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                        <span className="text-xs text-gray-500">{log.ipAddress}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sso' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">SSO Providers</h2>
                <p className="text-gray-600">
                  Configure and manage Single Sign-On providers for enterprise authentication.
                </p>
              </div>

              {/* SSO Providers List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-600">Loading SSO providers...</span>
                  </div>
                ) : (
                  filteredSSOProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedProvider(provider)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getProviderIcon(provider.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                            <p className="text-sm text-gray-600">{provider.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(provider.status)}`}>
                            {provider.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Users</p>
                          <p className="text-lg font-semibold text-gray-900">{provider.users.total}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Active Users</p>
                          <p className="text-lg font-semibold text-gray-900">{provider.users.active}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Sync</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(provider.users.lastSync).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Type: {provider.type.toUpperCase()}</span>
                          <span>Updated: {new Date(provider.lastUpdated).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onConfigureSSO(provider)
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              // Test SSO connection
                            }}
                            className="p-1 text-gray-400 hover:text-green-600"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'rbac' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Roles & Permissions</h2>
                <p className="text-gray-600">
                  Manage user roles and permissions for fine-grained access control.
                </p>
              </div>

              {/* Roles List */}
              <div className="space-y-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Users</p>
                        <p className="text-lg font-semibold text-gray-900">{role.users}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Permissions ({role.permissions.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.slice(0, 6).map((permission, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{role.permissions.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Created: {new Date(role.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onManageRoles(role)
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Audit Logs</h2>
                <p className="text-gray-600">
                  Monitor and review all security-related activities and access attempts.
                </p>
              </div>

              {/* Audit Logs Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resource
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.resource}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.ipAddress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${getActionStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnterpriseSecurity
