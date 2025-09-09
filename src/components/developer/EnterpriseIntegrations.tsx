import React, { useState, useEffect } from 'react'
import { 
  Link, 
  Building, 
  Users, 
  Database, 
  Cloud, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
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
  Unlock
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  type: 'crm' | 'erp' | 'sso' | 'payment' | 'communication' | 'analytics' | 'storage' | 'custom'
  provider: string
  description: string
  status: 'active' | 'inactive' | 'error' | 'pending' | 'maintenance'
  version: string
  lastSync: string
  configuration: {
    endpoint: string
    credentials: any
    settings: any
    mappings: any[]
  }
  usage: {
    calls: number
    successRate: number
    avgResponseTime: number
    lastUsed: string
  }
  features: string[]
  compliance: {
    gdpr: boolean
    ccpa: boolean
    sox: boolean
    hipaa: boolean
    iso27001: boolean
  }
  pricing: {
    model: 'free' | 'per-call' | 'monthly' | 'enterprise'
    cost: number
    currency: string
  }
}

interface IntegrationTemplate {
  id: string
  name: string
  provider: string
  type: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: string
  features: string[]
  requirements: string[]
  documentation: string
  support: boolean
}

interface EnterpriseIntegrationsProps {
  onConfigureIntegration: (integration: Integration) => void
  onTestIntegration: (integration: Integration) => void
  onViewLogs: (integration: Integration) => void
  onClose: () => void
}

const EnterpriseIntegrations: React.FC<EnterpriseIntegrationsProps> = ({
  onConfigureIntegration,
  onTestIntegration,
  onViewLogs,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'integrations' | 'templates' | 'marketplace' | 'logs' | 'settings'>('overview')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [templates, setTemplates] = useState<IntegrationTemplate[]>([])

  useEffect(() => {
    loadIntegrationsData()
  }, [])

  const loadIntegrationsData = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockIntegrations: Integration[] = [
      {
        id: '1',
        name: 'Salesforce CRM',
        type: 'crm',
        provider: 'Salesforce',
        description: 'Customer relationship management integration',
        status: 'active',
        version: 'v2.1.0',
        lastSync: '2024-01-20T10:30:00Z',
        configuration: {
          endpoint: 'https://api.salesforce.com/v1',
          credentials: { clientId: 'sf_client_123', clientSecret: '***' },
          settings: { syncInterval: 300, batchSize: 100 },
          mappings: [
            { source: 'customer_id', target: 'sf_contact_id' },
            { source: 'verification_status', target: 'sf_verification_status' }
          ]
        },
        usage: {
          calls: 15420,
          successRate: 98.5,
          avgResponseTime: 245,
          lastUsed: '2024-01-20T10:25:00Z'
        },
        features: ['contact_sync', 'lead_management', 'opportunity_tracking', 'custom_fields'],
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: false,
          iso27001: true
        },
        pricing: {
          model: 'per-call',
          cost: 0.05,
          currency: 'USD'
        }
      },
      {
        id: '2',
        name: 'Microsoft Dynamics 365',
        type: 'erp',
        provider: 'Microsoft',
        description: 'Enterprise resource planning integration',
        status: 'active',
        version: 'v1.8.0',
        lastSync: '2024-01-20T09:45:00Z',
        configuration: {
          endpoint: 'https://api.dynamics.com/v1',
          credentials: { tenantId: 'ms_tenant_456', clientId: 'ms_client_789' },
          settings: { syncInterval: 600, batchSize: 50 },
          mappings: [
            { source: 'organization_id', target: 'd365_account_id' },
            { source: 'verification_data', target: 'd365_custom_fields' }
          ]
        },
        usage: {
          calls: 8920,
          successRate: 97.2,
          avgResponseTime: 320,
          lastUsed: '2024-01-20T09:40:00Z'
        },
        features: ['account_management', 'order_processing', 'inventory_tracking', 'financial_reporting'],
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: true,
          iso27001: true
        },
        pricing: {
          model: 'monthly',
          cost: 299,
          currency: 'USD'
        }
      },
      {
        id: '3',
        name: 'Okta SSO',
        type: 'sso',
        provider: 'Okta',
        description: 'Single sign-on authentication integration',
        status: 'active',
        version: 'v3.0.0',
        lastSync: '2024-01-20T08:30:00Z',
        configuration: {
          endpoint: 'https://company.okta.com/oauth2/default',
          credentials: { clientId: 'okta_client_321', clientSecret: '***' },
          settings: { tokenExpiry: 3600, refreshToken: true },
          mappings: [
            { source: 'user_id', target: 'okta_user_id' },
            { source: 'user_roles', target: 'okta_groups' }
          ]
        },
        usage: {
          calls: 25680,
          successRate: 99.1,
          avgResponseTime: 120,
          lastUsed: '2024-01-20T08:25:00Z'
        },
        features: ['user_authentication', 'role_mapping', 'group_sync', 'mfa_support'],
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: false,
          iso27001: true
        },
        pricing: {
          model: 'enterprise',
          cost: 0,
          currency: 'USD'
        }
      },
      {
        id: '4',
        name: 'Stripe Payments',
        type: 'payment',
        provider: 'Stripe',
        description: 'Payment processing integration',
        status: 'active',
        version: 'v2.5.0',
        lastSync: '2024-01-20T07:15:00Z',
        configuration: {
          endpoint: 'https://api.stripe.com/v1',
          credentials: { publishableKey: 'pk_test_***', secretKey: 'sk_test_***' },
          settings: { webhookUrl: 'https://app.idcertify.com/webhooks/stripe' },
          mappings: [
            { source: 'customer_id', target: 'stripe_customer_id' },
            { source: 'verification_fee', target: 'stripe_amount' }
          ]
        },
        usage: {
          calls: 5670,
          successRate: 99.8,
          avgResponseTime: 180,
          lastUsed: '2024-01-20T07:10:00Z'
        },
        features: ['payment_processing', 'subscription_management', 'webhook_handling', 'refund_processing'],
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: false,
          iso27001: true
        },
        pricing: {
          model: 'per-call',
          cost: 0.029,
          currency: 'USD'
        }
      }
    ]

    const mockTemplates: IntegrationTemplate[] = [
      {
        id: '1',
        name: 'HubSpot CRM Integration',
        provider: 'HubSpot',
        type: 'crm',
        description: 'Complete HubSpot CRM integration with contact and deal management',
        category: 'Customer Management',
        difficulty: 'easy',
        estimatedTime: '30 minutes',
        features: ['contact_sync', 'deal_tracking', 'email_marketing', 'analytics'],
        requirements: ['HubSpot API key', 'Admin access'],
        documentation: '/docs/integrations/hubspot',
        support: true
      },
      {
        id: '2',
        name: 'SAP ERP Integration',
        provider: 'SAP',
        type: 'erp',
        description: 'Enterprise SAP integration for financial and operational data',
        category: 'Enterprise Systems',
        difficulty: 'hard',
        estimatedTime: '2-4 hours',
        features: ['financial_data', 'inventory_management', 'hr_integration', 'reporting'],
        requirements: ['SAP system access', 'Technical expertise', 'VPN connection'],
        documentation: '/docs/integrations/sap',
        support: true
      },
      {
        id: '3',
        name: 'Slack Communication',
        provider: 'Slack',
        type: 'communication',
        description: 'Slack integration for notifications and team collaboration',
        category: 'Communication',
        difficulty: 'easy',
        estimatedTime: '15 minutes',
        features: ['notifications', 'channel_integration', 'bot_commands', 'file_sharing'],
        requirements: ['Slack workspace', 'Bot token'],
        documentation: '/docs/integrations/slack',
        support: true
      }
    ]

    setTimeout(() => {
      setIntegrations(mockIntegrations)
      setTemplates(mockTemplates)
      setIsLoading(false)
    }, 1000)
  }

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = typeFilter === 'all' || integration.type === typeFilter
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crm':
        return <Users className="h-5 w-5 text-blue-600" />
      case 'erp':
        return <Building className="h-5 w-5 text-green-600" />
      case 'sso':
        return <Key className="h-5 w-5 text-purple-600" />
      case 'payment':
        return <CreditCard className="h-5 w-5 text-yellow-600" />
      case 'communication':
        return <MessageSquare className="h-5 w-5 text-indigo-600" />
      case 'analytics':
        return <BarChart3 className="h-5 w-5 text-red-600" />
      case 'storage':
        return <Database className="h-5 w-5 text-gray-600" />
      default:
        return <Link className="h-5 w-5 text-gray-600" />
    }
  }

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
      case 'maintenance':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Enterprise Integrations</h1>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
            Integrations
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewLogs(selectedIntegration || integrations[0])}
            disabled={!selectedIntegration && integrations.length === 0}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <FileText className="h-4 w-4" />
            <span>View Logs</span>
          </button>
          
          <button
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Integration</span>
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
                { id: 'integrations', name: 'Active Integrations', icon: Link },
                { id: 'templates', name: 'Integration Templates', icon: FileText },
                { id: 'marketplace', name: 'Marketplace', icon: Globe },
                { id: 'logs', name: 'Integration Logs', icon: Activity },
                { id: 'settings', name: 'Settings', icon: Settings }
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
            {activeTab === 'integrations' && (
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
                        placeholder="Search integrations..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="crm">CRM</option>
                      <option value="erp">ERP</option>
                      <option value="sso">SSO</option>
                      <option value="payment">Payment</option>
                      <option value="communication">Communication</option>
                      <option value="analytics">Analytics</option>
                      <option value="storage">Storage</option>
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
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="error">Error</option>
                      <option value="pending">Pending</option>
                      <option value="maintenance">Maintenance</option>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Integrations Overview</h2>
                <p className="text-gray-600">
                  Manage enterprise integrations with CRM, ERP, SSO, and other business systems.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Link className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Integrations</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {integrations.filter(i => i.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total API Calls</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {integrations.reduce((acc, i) => acc + i.usage.calls, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(integrations.reduce((acc, i) => acc + i.usage.successRate, 0) / integrations.length).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(integrations.reduce((acc, i) => acc + i.usage.avgResponseTime, 0) / integrations.length).toFixed(0)}ms
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration Types */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['crm', 'erp', 'sso', 'payment'].map((type) => {
                    const count = integrations.filter(i => i.type === type).length
                    const Icon = getTypeIcon(type)
                    return (
                      <div key={type} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          {Icon}
                          <span className="font-medium text-gray-900 capitalize">{type}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{count}</div>
                        <div className="text-sm text-gray-600">integrations</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Active Integrations</h2>
                <p className="text-gray-600">
                  Manage and monitor your active enterprise integrations.
                </p>
              </div>

              {/* Integrations List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-600">Loading integrations...</span>
                  </div>
                ) : (
                  filteredIntegrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getTypeIcon(integration.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                            <p className="text-sm text-gray-600">{integration.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </span>
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                            {integration.version}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">API Calls</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {integration.usage.calls.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Success Rate</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {integration.usage.successRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Response Time</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {integration.usage.avgResponseTime}ms
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Used</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(integration.usage.lastUsed).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Provider: {integration.provider}</span>
                          <span>Type: {integration.type.toUpperCase()}</span>
                          <span>Cost: {formatCurrency(integration.pricing.cost, integration.pricing.currency)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onTestIntegration(integration)
                            }}
                            className="p-1 text-gray-400 hover:text-green-600"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onConfigureIntegration(integration)
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Integration Templates</h2>
                <p className="text-gray-600">
                  Pre-built integration templates for quick setup and deployment.
                </p>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getTypeIcon(template.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.provider}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium text-gray-900">{template.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Estimated Time</span>
                        <span className="font-medium text-gray-900">{template.estimatedTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Features</span>
                        <span className="font-medium text-gray-900">{template.features.length}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        {template.support && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            Supported
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <BookOpen className="h-4 w-4" />
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Install
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnterpriseIntegrations
