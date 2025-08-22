import { useState } from 'react'
import { 
  Database, 
  Shield, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  Upload, 
  Download,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Trash2,
  Plus,
  Scan,
  Camera
} from 'lucide-react'

interface BiometricData {
  id: string
  type: 'fingerprint' | 'facial' | 'voice' | 'iris'
  name: string
  description: string
  status: 'active' | 'pending' | 'expired'
  uploadedAt: string
  lastUsed: string
  size: string
  isEncrypted: boolean
}

const Biobank = () => {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedDataType, setSelectedDataType] = useState<string>('')
  const [isEncryptionEnabled, setIsEncryptionEnabled] = useState(true)

  const biometricData: BiometricData[] = [
    {
      id: '1',
      type: 'fingerprint',
      name: 'Right Thumb',
      description: 'Primary fingerprint for authentication',
      status: 'active',
      uploadedAt: '2024-01-15',
      lastUsed: '2024-01-20',
      size: '2.3 MB',
      isEncrypted: true
    },
    {
      id: '2',
      type: 'facial',
      name: 'Face Recognition',
      description: 'Facial biometric data for identity verification',
      status: 'active',
      uploadedAt: '2024-01-15',
      lastUsed: '2024-01-19',
      size: '5.7 MB',
      isEncrypted: true
    },
    {
      id: '3',
      type: 'voice',
      name: 'Voice Sample',
      description: 'Voice biometric for secure authentication',
      status: 'pending',
      uploadedAt: '2024-01-18',
      lastUsed: 'Never',
      size: '8.1 MB',
      isEncrypted: false
    },
    {
      id: '4',
      type: 'iris',
      name: 'Left Eye',
      description: 'Iris scan data for high-security verification',
      status: 'expired',
      uploadedAt: '2023-12-10',
      lastUsed: '2024-01-05',
      size: '3.2 MB',
      isEncrypted: true
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Expired
          </span>
        )
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fingerprint':
        return <Fingerprint className="h-5 w-5" />
      case 'facial':
        return <Camera className="h-5 w-5" />
      case 'voice':
        return <Database className="h-5 w-5" />
      case 'iris':
        return <Eye className="h-5 w-5" />
      default:
        return <Database className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fingerprint':
        return 'text-blue-600 bg-blue-100'
      case 'facial':
        return 'text-green-600 bg-green-100'
      case 'voice':
        return 'text-purple-600 bg-purple-100'
      case 'iris':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biometric Data Bank</h1>
          <p className="text-gray-600">Securely store and manage your biometric data</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Biometric Data
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Database className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{biometricData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {biometricData.filter(d => d.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {biometricData.filter(d => d.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Encrypted</p>
              <p className="text-2xl font-bold text-gray-900">
                {biometricData.filter(d => d.isEncrypted).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            <p className="text-sm text-gray-600">Manage encryption and access controls</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Encryption</span>
              <button
                onClick={() => setIsEncryptionEnabled(!isEncryptionEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isEncryptionEnabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEncryptionEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </button>
          </div>
        </div>
      </div>

      {/* Biometric Data Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Biometric Records</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Security
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {biometricData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(data.type)}`}>
                        {getTypeIcon(data.type)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 capitalize">{data.type}</div>
                        <div className="text-sm text-gray-500">{data.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(data.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.lastUsed === 'Never' ? 'Never' : new Date(data.lastUsed).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {data.isEncrypted ? (
                        <Lock className="h-4 w-4 text-green-600" />
                      ) : (
                        <Unlock className="h-4 w-4 text-red-600" />
                      )}
                      <span className="ml-2 text-sm text-gray-500">
                        {data.isEncrypted ? 'Encrypted' : 'Unencrypted'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add Biometric Data</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                <select
                  value={selectedDataType}
                  onChange={(e) => setSelectedDataType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select data type</option>
                  <option value="fingerprint">Fingerprint</option>
                  <option value="facial">Facial Recognition</option>
                  <option value="voice">Voice Sample</option>
                  <option value="iris">Iris Scan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Method</label>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <Upload className="h-5 w-5 mr-2 text-gray-400" />
                    Upload File
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Scan className="h-5 w-5 mr-2 text-gray-400" />
                    Scan Now
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="encrypt"
                  checked={isEncryptionEnabled}
                  onChange={(e) => setIsEncryptionEnabled(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="encrypt" className="text-sm text-gray-700">
                  Encrypt this data for enhanced security
                </label>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Biobank
