import React, { useState } from 'react'
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Lock, 
  Users, 
  Database, 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertTriangle,
  X,
  Settings,
  FileText,
  Activity,
  Globe,
  Smartphone
} from 'lucide-react'

interface PrivacySetting {
  id: string
  name: string
  description: string
  isEnabled: boolean
  category: 'data-sharing' | 'analytics' | 'marketing' | 'third-party'
}

interface DataRetention {
  id: string
  type: string
  description: string
  retentionPeriod: string
  canDelete: boolean
}

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: '1',
      name: 'Data Sharing with Partners',
      description: 'Allow trusted partners to access your verification data',
      isEnabled: true,
      category: 'data-sharing'
    },
    {
      id: '2',
      name: 'Analytics & Insights',
      description: 'Help improve our services with anonymous usage data',
      isEnabled: true,
      category: 'analytics'
    },
    {
      id: '3',
      name: 'Marketing Communications',
      description: 'Receive promotional content and updates',
      isEnabled: false,
      category: 'marketing'
    },
    {
      id: '4',
      name: 'Third-Party Services',
      description: 'Allow third-party integrations and services',
      isEnabled: false,
      category: 'third-party'
    },
    {
      id: '5',
      name: 'Location Data',
      description: 'Share your location for enhanced security',
      isEnabled: true,
      category: 'data-sharing'
    },
    {
      id: '6',
      name: 'Device Information',
      description: 'Collect device data for security purposes',
      isEnabled: true,
      category: 'data-sharing'
    }
  ])

  const [dataRetention] = useState<DataRetention[]>([
    {
      id: '1',
      type: 'Personal Information',
      description: 'Name, email, phone number, and basic details',
      retentionPeriod: '7 years',
      canDelete: false
    },
    {
      id: '2',
      type: 'Verification Documents',
      description: 'ID cards, passports, and verification files',
      retentionPeriod: '10 years',
      canDelete: true
    },
    {
      id: '3',
      type: 'Transaction History',
      description: 'Payment records and wallet transactions',
      retentionPeriod: '7 years',
      canDelete: false
    },
    {
      id: '4',
      type: 'Activity Logs',
      description: 'Login history and system interactions',
      retentionPeriod: '2 years',
      canDelete: true
    },
    {
      id: '5',
      type: 'Analytics Data',
      description: 'Usage patterns and service improvements',
      retentionPeriod: '3 years',
      canDelete: true
    }
  ])

  const [showDataExportModal, setShowDataExportModal] = useState(false)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('json')

  const handleTogglePrivacy = (id: string) => {
    setPrivacySettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, isEnabled: !setting.isEnabled } : setting
    ))
  }

  const handleDataExport = () => {
    // Simulate data export
    alert(`Exporting your data in ${exportFormat.toUpperCase()} format. This may take a few minutes.`)
    setShowDataExportModal(false)
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you absolutely sure? This action cannot be undone and will permanently delete your account and all associated data.')) {
      alert('Account deletion request submitted. Our team will process this within 30 days.')
      setShowDeleteAccountModal(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'data-sharing': return 'bg-blue-100 text-blue-800'
      case 'analytics': return 'bg-green-100 text-green-800'
      case 'marketing': return 'bg-purple-100 text-purple-800'
      case 'third-party': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'data-sharing': return <Users className="h-4 w-4" />
      case 'analytics': return <Activity className="h-4 w-4" />
      case 'marketing': return <Globe className="h-4 w-4" />
      case 'third-party': return <Smartphone className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Privacy Settings</h1>
          <p className="text-gray-600">Control how your data is used and shared</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowDataExportModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Privacy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Sharing</p>
              <p className="text-2xl font-bold text-blue-600">
                {privacySettings.filter(s => s.category === 'data-sharing' && s.isEnabled).length} Active
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Analytics</p>
              <p className="text-2xl font-bold text-green-600">
                {privacySettings.filter(s => s.category === 'analytics' && s.isEnabled).length} Active
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Marketing</p>
              <p className="text-2xl font-bold text-purple-600">
                {privacySettings.filter(s => s.category === 'marketing' && s.isEnabled).length} Active
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Privacy Controls</h2>
          <p className="text-sm text-gray-600">Manage how your data is used and shared</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {privacySettings.map((setting) => (
              <div key={setting.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(setting.category)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{setting.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(setting.category)}`}>
                        {setting.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleTogglePrivacy(setting.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.isEnabled ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    setting.isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Data Retention Policy</h2>
          <p className="text-sm text-gray-600">Understand how long we keep your data</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataRetention.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.retentionPeriod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {item.canDelete ? (
                        <button className="text-red-600 hover:text-red-700 flex items-center gap-1">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      ) : (
                        <span className="text-gray-400">Required</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Rights */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Data Rights</h2>
          <p className="text-sm text-gray-600">Understand and exercise your privacy rights</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Access & Portability</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Download className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Export Your Data</p>
                    <p className="text-sm text-gray-500">Download all your data in various formats</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">View Your Data</p>
                    <p className="text-sm text-gray-500">See what information we have about you</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Control & Deletion</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Update Preferences</p>
                    <p className="text-sm text-gray-500">Change how your data is used</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Trash2 className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Delete Account</p>
                    <p className="text-sm text-gray-500">Permanently remove your account and data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowDeleteAccountModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Request Account Deletion
            </button>
          </div>
        </div>
      </div>

      {/* Data Export Modal */}
      {showDataExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowDataExportModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Export Your Data</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Download all your personal data in your preferred format
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <select 
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="json">JSON (Recommended)</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                  <option value="pdf">PDF Report</option>
                </select>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Personal information and profile data</li>
                  <li>• Verification documents and history</li>
                  <li>• Transaction records and wallet data</li>
                  <li>• Activity logs and system interactions</li>
                  <li>• Privacy preferences and settings</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowDataExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDataExport}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowDeleteAccountModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Delete Account</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-red-900 mb-2">What happens when you delete your account:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• All personal information will be permanently removed</li>
                <li>• Verification documents and history will be deleted</li>
                <li>• Wallet balance and transaction history will be lost</li>
                <li>• Trust score and achievements will be erased</li>
                <li>• Account cannot be recovered under any circumstances</li>
              </ul>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowDeleteAccountModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrivacySettings
