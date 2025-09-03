import React, { useState } from 'react'
import { 
  Link, 
  Settings, 
  CheckCircle, 
  X, 
  Plus, 
  ExternalLink, 
  Key, 
  Globe,
  Database,
  Shield,
  Zap,
  AlertTriangle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  category: 'payment' | 'verification' | 'communication' | 'analytics'
  status: 'active' | 'inactive' | 'pending' | 'error'
  isConnected: boolean
  lastSync?: string
  apiKey?: string
  webhookUrl?: string
  permissions: string[]
}

const Integrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Paystack',
      description: 'Payment processing and transaction management',
      category: 'payment',
      status: 'active',
      isConnected: true,
      lastSync: '2024-01-20T10:30:00Z',
      apiKey: 'pk_test_...',
      webhookUrl: 'https://webhook.site/...',
      permissions: ['read_transactions', 'create_charges', 'refund_payments']
    },
    {
      id: '2',
      name: 'Flutterwave',
      description: 'Alternative payment gateway for local transactions',
      category: 'payment',
      status: 'inactive',
      isConnected: false,
      permissions: ['read_transactions', 'create_charges']
    },
    {
      id: '3',
      name: 'NIMC Verification',
      description: 'National Identity Management Commission verification',
      category: 'verification',
      status: 'active',
      isConnected: true,
      lastSync: '2024-01-19T15:45:00Z',
      apiKey: 'nimc_...',
      permissions: ['verify_identity', 'read_biometric_data']
    },
    {
      id: '4',
      name: 'Google Analytics',
      description: 'Website and app analytics tracking',
      category: 'analytics',
      status: 'pending',
      isConnected: false,
      permissions: ['read_analytics', 'track_events']
    },
    {
      id: '5',
      name: 'Slack',
      description: 'Team communication and notifications',
      category: 'communication',
      status: 'error',
      isConnected: false,
      permissions: ['send_notifications', 'read_channels']
    },
    {
      id: '6',
      name: 'Zapier',
      description: 'Automation and workflow integration',
      category: 'analytics',
      status: 'inactive',
      isConnected: false,
      permissions: ['create_webhooks', 'read_data']
    }
  ])

  const [showAddIntegration, setShowAddIntegration] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [showConfigModal, setShowConfigModal] = useState(false)

  const handleConnectIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, isConnected: true, status: 'active' }
        : integration
    ))
  }

  const handleDisconnectIntegration = (id: string) => {
    if (window.confirm('Are you sure you want to disconnect this integration?')) {
      setIntegrations(prev => prev.map(integration => 
        integration.id === id 
          ? { ...integration, isConnected: false, status: 'inactive' }
          : integration
      ))
    }
  }

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration)
    setShowConfigModal(true)
  }

  const handleRemoveIntegration = (id: string) => {
    if (window.confirm('Are you sure you want to remove this integration? This action cannot be undone.')) {
      setIntegrations(prev => prev.filter(integration => integration.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'inactive': return <X className="h-4 w-4 text-gray-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <X className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payment': return <Globe className="h-5 w-5 text-green-600" />
      case 'verification': return <Shield className="h-5 w-5 text-blue-600" />
      case 'communication': return <Zap className="h-5 w-5 text-purple-600" />
      case 'analytics': return <Database className="h-5 w-5 text-orange-600" />
      default: return <Settings className="h-5 w-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payment': return 'bg-green-100 text-green-800'
      case 'verification': return 'bg-blue-100 text-blue-800'
      case 'communication': return 'bg-purple-100 text-purple-800'
      case 'analytics': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect and manage third-party services and APIs</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddIntegration(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Integration
          </button>
        </div>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Link className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {integrations.filter(i => i.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected</p>
              <p className="text-2xl font-bold text-blue-600">
                {integrations.filter(i => i.isConnected).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Link className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-red-600">
                {integrations.filter(i => i.status === 'error').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getCategoryIcon(integration.category)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{integration.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(integration.category)}`}>
                      {integration.category.charAt(0).toUpperCase() + integration.category.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(integration.status)}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                      {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleConfigureIntegration(integration)}
                  className="text-blue-600 hover:text-blue-700 p-1"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleRemoveIntegration(integration.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

            {integration.isConnected && (
              <div className="space-y-3 mb-4">
                {integration.lastSync && (
                  <div className="text-xs text-gray-500">
                    Last sync: {formatDate(integration.lastSync)}
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  <div className="font-medium mb-1">Permissions:</div>
                  <div className="flex flex-wrap gap-1">
                    {integration.permissions.slice(0, 3).map((permission, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {permission.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {integration.permissions.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        +{integration.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              {integration.isConnected ? (
                <button
                  onClick={() => handleDisconnectIntegration(integration.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => handleConnectIntegration(integration.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Connect
                </button>
              )}
              
              <button className="text-gray-600 hover:text-gray-700 p-1">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Configuration Modal */}
      {showConfigModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setShowConfigModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Configure {selectedIntegration.name}</h3>
              <p className="text-gray-600">{selectedIntegration.description}</p>
            </div>

            <div className="space-y-6">
              {/* API Configuration */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">API Configuration</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="password"
                        value={selectedIntegration.apiKey || ''}
                        placeholder="Enter API key"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button className="text-blue-600 hover:text-blue-700 p-2">
                        <Key className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                    <input
                      type="url"
                      value={selectedIntegration.webhookUrl || ''}
                      placeholder="Enter webhook URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Permissions</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedIntegration.permissions.map((permission, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{permission.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sync Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sync Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                      <option value="forever">Forever</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Integrations
