import React, { useState } from 'react'
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  CheckCircle, 
  AlertTriangle,
  X,
  Plus,
  Trash2,
  Edit,
  QrCode,
  Download
} from 'lucide-react'

interface TwoFactorMethod {
  id: string
  type: 'app' | 'sms' | 'email'
  name: string
  isEnabled: boolean
  lastUsed?: string
}

interface SecurityLog {
  id: string
  action: string
  location: string
  device: string
  timestamp: string
  status: 'success' | 'failed' | 'warning'
}

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [twoFactorMethods, setTwoFactorMethods] = useState<TwoFactorMethod[]>([
    {
      id: '1',
      type: 'app',
      name: 'Google Authenticator',
      isEnabled: true,
      lastUsed: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      type: 'sms',
      name: '+234 80*** ***78',
      isEnabled: false,
      lastUsed: '2024-01-15T14:20:00Z'
    },
    {
      id: '3',
      type: 'email',
      name: 'joh***@example.com',
      isEnabled: false,
      lastUsed: '2024-01-10T09:15:00Z'
    }
  ])

  const [securityLogs] = useState<SecurityLog[]>([
    {
      id: '1',
      action: 'Password changed',
      location: 'Lagos, Nigeria',
      device: 'Chrome on Windows',
      timestamp: '2024-01-20T10:30:00Z',
      status: 'success'
    },
    {
      id: '2',
      action: 'Login attempt',
      location: 'Unknown',
      device: 'Unknown',
      timestamp: '2024-01-19T15:45:00Z',
      status: 'failed'
    },
    {
      id: '3',
      action: '2FA enabled',
      location: 'Lagos, Nigeria',
      device: 'Chrome on Windows',
      timestamp: '2024-01-18T11:20:00Z',
      status: 'success'
    },
    {
      id: '4',
      action: 'New device login',
      location: 'Abuja, Nigeria',
      device: 'Safari on iPhone',
      timestamp: '2024-01-17T16:30:00Z',
      status: 'warning'
    }
  ])

  const [showAdd2FAModal, setShowAdd2FAModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    
    // Simulate password change
    alert('Password changed successfully')
    setShowPasswordModal(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleToggle2FA = (id: string) => {
    setTwoFactorMethods(prev => prev.map(method => 
      method.id === id ? { ...method, isEnabled: !method.isEnabled } : method
    ))
  }

  const handleAdd2FA = () => {
    setShowAdd2FAModal(true)
  }

  const handleRemove2FA = (id: string) => {
    if (window.confirm('Are you sure you want to remove this 2FA method?')) {
      setTwoFactorMethods(prev => prev.filter(method => method.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed': return <X className="h-4 w-4 text-red-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />
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
          <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
          <p className="text-gray-600">Manage your account security and authentication preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            Change Password
          </button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Password Strength</p>
              <p className="text-2xl font-bold text-green-600">Strong</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">2FA Methods</p>
              <p className="text-2xl font-bold text-blue-600">
                {twoFactorMethods.filter(m => m.isEnabled).length} Active
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Login</p>
              <p className="text-2xl font-bold text-gray-900">Today</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={handleAdd2FA}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Method
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {twoFactorMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {method.type === 'app' && <Smartphone className="h-5 w-5 text-blue-600" />}
                    {method.type === 'sms' && <Mail className="h-5 w-5 text-green-600" />}
                    {method.type === 'email' && <Mail className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-500">
                      {method.isEnabled ? 'Active' : 'Inactive'} • 
                      {method.lastUsed && ` Last used: ${formatDate(method.lastUsed)}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggle2FA(method.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      method.isEnabled 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {method.isEnabled ? 'Disable' : 'Enable'}
                  </button>
                  
                  {method.type === 'app' && (
                    <button className="text-blue-600 hover:text-blue-700 p-1">
                      <QrCode className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleRemove2FA(method.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Security Activity Log</h2>
          <p className="text-sm text-gray-600">Recent security-related activities on your account</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {securityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(log.timestamp)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowPasswordModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Change Password</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Update your password to keep your account secure
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handlePasswordChange}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecuritySettings
