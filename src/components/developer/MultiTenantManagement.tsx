import React, { useState, useEffect } from 'react'
import { 
  Building, 
  Users, 
  Settings, 
  Shield, 
  Database, 
  Globe, 
  Lock, 
  Unlock, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
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
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  User, 
  UserCheck, 
  UserX, 
  Key, 
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
  Laptop
} from 'lucide-react'

interface Tenant {
  id: string
  name: string
  domain: string
  status: 'active' | 'inactive' | 'suspended' | 'pending'
  plan: 'starter' | 'professional' | 'enterprise' | 'custom'
  createdAt: string
  lastActive: string
  users: {
    total: number
    active: number
    admin: number
  }
  usage: {
    verifications: number
    apiCalls: number
    storage: number
    bandwidth: number
  }
  limits: {
    verifications: number
    apiCalls: number
    storage: number
    users: number
  }
  billing: {
    amount: number
    currency: string
    nextBilling: string
    status: 'paid' | 'pending' | 'overdue'
  }
  settings: {
    sso: boolean
    customDomain: boolean
    whiteLabel: boolean
    apiAccess: boolean
    webhooks: boolean
  }
  compliance: {
    gdpr: boolean
    ccpa: boolean
    sox: boolean
    hipaa: boolean
    iso27001: boolean
  }
  integrations: string[]
  customizations: {
    branding: boolean
    workflows: boolean
    fields: boolean
    notifications: boolean
  }
}

interface MultiTenantManagementProps {
  onManageTenant: (tenant: Tenant) => void
  onCreateTenant: () => void
  onViewAnalytics: (tenant: Tenant) => void
  onClose: () => void
}

const MultiTenantManagement: React.FC<MultiTenantManagementProps> = ({
  onManageTenant,
  onCreateTenant,
  onViewAnalytics,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'organizations' | 'billing' | 'compliance' | 'analytics'>('overview')
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [tenants, setTenants] = useState<Tenant[]>([])

  useEffect(() => {
    loadTenants()
  }, [])

  const loadTenants = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockTenants: Tenant[] = [
      {
        id: '1',
        name: 'Acme Corporation',
        domain: 'acme.idcertify.com',
        status: 'active',
        plan: 'enterprise',
        createdAt: '2024-01-15T10:30:00Z',
        lastActive: '2024-01-20T14:45:00Z',
        users: { total: 150, active: 142, admin: 8 },
        usage: {
          verifications: 15420,
          apiCalls: 25680,
          storage: 2.4,
          bandwidth: 15.8
        },
        limits: {
          verifications: 50000,
          apiCalls: 100000,
          storage: 100,
          users: 200
        },
        billing: {
          amount: 2500,
          currency: 'USD',
          nextBilling: '2024-02-15T00:00:00Z',
          status: 'paid'
        },
        settings: {
          sso: true,
          customDomain: true,
          whiteLabel: true,
          apiAccess: true,
          webhooks: true
        },
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: false,
          iso27001: true
        },
        integrations: ['salesforce', 'hubspot', 'okta', 'azure-ad'],
        customizations: {
          branding: true,
          workflows: true,
          fields: true,
          notifications: true
        }
      },
      {
        id: '2',
        name: 'TechStart Inc',
        domain: 'techstart.idcertify.com',
        status: 'active',
        plan: 'professional',
        createdAt: '2024-01-10T09:15:00Z',
        lastActive: '2024-01-20T11:20:00Z',
        users: { total: 25, active: 23, admin: 3 },
        usage: {
          verifications: 3240,
          apiCalls: 5670,
          storage: 0.8,
          bandwidth: 3.2
        },
        limits: {
          verifications: 10000,
          apiCalls: 25000,
          storage: 25,
          users: 50
        },
        billing: {
          amount: 299,
          currency: 'USD',
          nextBilling: '2024-02-10T00:00:00Z',
          status: 'paid'
        },
        settings: {
          sso: false,
          customDomain: false,
          whiteLabel: false,
          apiAccess: true,
          webhooks: true
        },
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: false,
          hipaa: false,
          iso27001: false
        },
        integrations: ['slack', 'zapier'],
        customizations: {
          branding: false,
          workflows: true,
          fields: false,
          notifications: true
        }
      },
      {
        id: '3',
        name: 'Global Finance Ltd',
        domain: 'globalfinance.idcertify.com',
        status: 'active',
        plan: 'enterprise',
        createdAt: '2024-01-05T14:20:00Z',
        lastActive: '2024-01-20T16:30:00Z',
        users: { total: 500, active: 485, admin: 15 },
        usage: {
          verifications: 45680,
          apiCalls: 78920,
          storage: 8.2,
          bandwidth: 45.6
        },
        limits: {
          verifications: 100000,
          apiCalls: 500000,
          storage: 500,
          users: 1000
        },
        billing: {
          amount: 5000,
          currency: 'USD',
          nextBilling: '2024-02-05T00:00:00Z',
          status: 'paid'
        },
        settings: {
          sso: true,
          customDomain: true,
          whiteLabel: true,
          apiAccess: true,
          webhooks: true
        },
        compliance: {
          gdpr: true,
          ccpa: true,
          sox: true,
          hipaa: true,
          iso27001: true
        },
        integrations: ['salesforce', 'microsoft-dynamics', 'okta', 'azure-ad', 'aws'],
        customizations: {
          branding: true,
          workflows: true,
          fields: true,
          notifications: true
        }
      }
    ]

    setTimeout(() => {
      setTenants(mockTenants)
      setIsLoading(false)
    }, 1000)
  }

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.domain.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter
    const matchesPlan = planFilter === 'all' || tenant.plan === planFilter
    
    return matchesSearch && matchesStatus && matchesPlan
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter':
        return 'bg-blue-100 text-blue-800'
      case 'professional':
        return 'bg-purple-100 text-purple-800'
      case 'enterprise':
        return 'bg-gold-100 text-gold-800'
      case 'custom':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getBillingStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
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

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Multi-Tenant Management</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Enterprise
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewAnalytics(selectedTenant || tenants[0])}
            disabled={!selectedTenant && tenants.length === 0}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create Tenant</span>
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
                { id: 'tenants', name: 'Tenants', icon: Building },
                { id: 'organizations', name: 'Organizations', icon: Users },
                { id: 'billing', name: 'Billing', icon: DollarSign },
                { id: 'compliance', name: 'Compliance', icon: Shield },
                { id: 'analytics', name: 'Analytics', icon: TrendingUp }
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
            {activeTab === 'tenants' && (
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
                        placeholder="Search tenants..."
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
                      <option value="suspended">Suspended</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Plan
                    </label>
                    <select
                      value={planFilter}
                      onChange={(e) => setPlanFilter(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="all">All Plans</option>
                      <option value="starter">Starter</option>
                      <option value="professional">Professional</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="custom">Custom</option>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Multi-Tenant Overview</h2>
                <p className="text-gray-600">
                  Manage multiple organizations and tenants with enterprise-grade isolation and security.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Building className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                      <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {tenants.reduce((acc, tenant) => acc + tenant.users.total, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Tenants</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {tenants.filter(t => t.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(
                          tenants.reduce((acc, tenant) => acc + tenant.billing.amount, 0),
                          'USD'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {tenants.slice(0, 5).map((tenant) => (
                    <div key={tenant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{tenant.name}</p>
                          <p className="text-xs text-gray-600">
                            Last active: {new Date(tenant.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(tenant.status)}`}>
                          {tenant.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getPlanColor(tenant.plan)}`}>
                          {tenant.plan}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tenants' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Tenant Management</h2>
                <p className="text-gray-600">
                  Manage and monitor all tenant organizations and their usage.
                </p>
              </div>

              {/* Tenants List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-600">Loading tenants...</span>
                  </div>
                ) : (
                  filteredTenants.map((tenant) => (
                    <div
                      key={tenant.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedTenant(tenant)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Building className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                            <p className="text-sm text-gray-600">{tenant.domain}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(tenant.status)}`}>
                            {tenant.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getPlanColor(tenant.plan)}`}>
                            {tenant.plan}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Users</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {tenant.users.active}/{tenant.users.total}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Verifications</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {tenant.usage.verifications.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">API Calls</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {tenant.usage.apiCalls.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Storage</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {tenant.usage.storage} GB
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Verification Usage</span>
                          <span className={`font-medium ${getUsageColor(getUsagePercentage(tenant.usage.verifications, tenant.limits.verifications))}`}>
                            {getUsagePercentage(tenant.usage.verifications, tenant.limits.verifications).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${getUsagePercentage(tenant.usage.verifications, tenant.limits.verifications)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Created: {new Date(tenant.createdAt).toLocaleDateString()}</span>
                          <span>Billing: {formatCurrency(tenant.billing.amount, tenant.billing.currency)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onManageTenant(tenant)
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onViewAnalytics(tenant)
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Billing Management</h2>
                <p className="text-gray-600">
                  Monitor billing status and revenue across all tenants.
                </p>
              </div>

              {/* Billing Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(
                          tenants.reduce((acc, tenant) => acc + tenant.billing.amount, 0),
                          'USD'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {tenants.filter(t => t.billing.status === 'paid').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Overdue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {tenants.filter(t => t.billing.status === 'overdue').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Billing Details</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tenant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Next Billing
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tenants.map((tenant) => (
                        <tr key={tenant.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                              <div className="text-sm text-gray-500">{tenant.domain}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${getPlanColor(tenant.plan)}`}>
                              {tenant.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(tenant.billing.amount, tenant.billing.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${getBillingStatusColor(tenant.billing.status)}`}>
                              {tenant.billing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(tenant.billing.nextBilling).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View Invoice
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Download
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
        </div>
      </div>
    </div>
  )
}

export default MultiTenantManagement
