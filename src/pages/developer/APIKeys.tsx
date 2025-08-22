import { useState } from 'react'
import { Plus, Settings, Eye, Copy, Trash2 } from 'lucide-react'

const APIKeys = () => {
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({})

  const togglePassword = (id: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'pk_live_1234567890abcdef',
      environment: 'production',
      permissions: ['verify', 'trust-score', 'biometric'],
      lastUsed: '2024-01-20 14:30',
      status: 'active',
    },
    {
      id: 2,
      name: 'Sandbox API Key',
      key: 'pk_test_abcdef1234567890',
      environment: 'sandbox',
      permissions: ['verify', 'trust-score'],
      lastUsed: '2024-01-19 10:15',
      status: 'active',
    },
    {
      id: 3,
      name: 'Test API Key',
      key: 'pk_test_9876543210fedcba',
      environment: 'sandbox',
      permissions: ['verify'],
      lastUsed: '2024-01-18 16:45',
      status: 'inactive',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600">Manage your API keys and permissions</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Generate New Key
        </button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                <p className="text-sm text-gray-600">Environment: {apiKey.environment}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  apiKey.status === 'active' 
                    ? 'bg-success-100 text-success-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {apiKey.status}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type={showPasswords[apiKey.id] ? 'text' : 'password'}
                      value={apiKey.key}
                      readOnly
                      className="input-field font-mono text-sm pr-32"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700"
                      onClick={() => togglePassword(apiKey.id)}
                    >
                      {showPasswords[apiKey.id] ? 'HIDE KEY' : 'SHOW KEY'}
                    </button>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="flex space-x-2">
                  {apiKey.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Last used: {apiKey.lastUsed}</span>
                <button className="text-danger-600 hover:text-danger-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default APIKeys
