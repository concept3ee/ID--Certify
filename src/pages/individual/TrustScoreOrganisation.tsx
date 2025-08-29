import { useState } from 'react'
import { 
  Building, 
  Users, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  ExternalLink,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Mail,
  Phone,
  Globe,
  Lock,
  Unlock,
  Eye,
  Settings,
  Trash2,
  X
} from 'lucide-react'

interface LinkedOrganisation {
  id: string
  name: string
  type: string
  trustScore: number
  status: 'active' | 'pending' | 'suspended' | 'expired'
  connectionDate: string
  lastActivity: string
  contactPerson: string
  email: string
  phone: string
  website: string
  verificationLevel: 'basic' | 'verified' | 'premium'
  sharedData: string[]
  permissions: string[]
  mutualTrustScore: number
  change: number
}

const TrustScoreOrganisation = () => {
  const [organisations, setOrganisations] = useState<LinkedOrganisation[]>([
    {
      id: '1',
      name: 'TechCorp Solutions Ltd',
      type: 'Technology Company',
      trustScore: 1450,
      status: 'active',
      connectionDate: '2024-01-15',
      lastActivity: '2024-01-20',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+234 801 234 5678',
      website: 'https://techcorp.com',
      verificationLevel: 'verified',
      sharedData: ['Employment History', 'Professional References', 'Skills Verification'],
      permissions: ['View Profile', 'Request Verification', 'Share Documents'],
      mutualTrustScore: 1350,
      change: 25
    },
    {
      id: '2',
      name: 'Global Finance Bank',
      type: 'Financial Institution',
      trustScore: 1800,
      status: 'active',
      connectionDate: '2024-01-10',
      lastActivity: '2024-01-19',
      contactPerson: 'Michael Chen',
      email: 'michael@globalfinance.com',
      phone: '+234 802 345 6789',
      website: 'https://globalfinance.com',
      verificationLevel: 'premium',
      sharedData: ['Financial History', 'Credit Score', 'Transaction Records'],
      permissions: ['View Profile', 'Request Verification', 'Share Documents', 'Access Reports'],
      mutualTrustScore: 1600,
      change: -10
    },
    {
      id: '3',
      name: 'Innovation Labs',
      type: 'Startup',
      trustScore: 1200,
      status: 'pending',
      connectionDate: '2024-01-18',
      lastActivity: '2024-01-18',
      contactPerson: 'David Wilson',
      email: 'david@innovationlabs.com',
      phone: '+234 803 456 7890',
      website: 'https://innovationlabs.com',
      verificationLevel: 'basic',
      sharedData: ['Project Portfolio', 'Team Information'],
      permissions: ['View Profile', 'Request Verification'],
      mutualTrustScore: 1100,
      change: 0
    }
  ])

  const [selectedOrganisation, setSelectedOrganisation] = useState<LinkedOrganisation | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'suspended':
        return 'text-red-600 bg-red-100'
      case 'expired':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getVerificationLevelColor = (level: string) => {
    switch (level) {
      case 'premium':
        return 'text-purple-600 bg-purple-100'
      case 'verified':
        return 'text-blue-600 bg-blue-100'
      case 'basic':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Clock className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Linked Organisations</h1>
          <p className="text-gray-600">Manage your connections with organizations and track mutual trust scores</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          <span>Link Organisation</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Total Linked</p>
              <p className="text-2xl font-bold text-gray-900">{organisations.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {organisations.filter(org => org.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Avg Trust Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(organisations.reduce((acc, org) => acc + org.trustScore, 0) / organisations.length)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {organisations.filter(org => org.verificationLevel === 'verified' || org.verificationLevel === 'premium').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Organisations List */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Linked Organisations</h2>
        <div className="space-y-4">
          {organisations.map((organisation) => (
            <div
              key={organisation.id}
              onClick={() => setSelectedOrganisation(organisation)}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{organisation.name}</h3>
                    <p className="text-sm text-gray-600">{organisation.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {getChangeIcon(organisation.change)}
                    <span className={`text-sm font-medium ${
                      organisation.change > 0 ? 'text-green-600' : 
                      organisation.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {organisation.change > 0 ? '+' : ''}{organisation.change}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Trust Score: {organisation.trustScore}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(organisation.status)}`}>
                    {organisation.status.charAt(0).toUpperCase() + organisation.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verification Level</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerificationLevelColor(organisation.verificationLevel)}`}>
                    {organisation.verificationLevel.charAt(0).toUpperCase() + organisation.verificationLevel.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mutual Trust Score</p>
                  <p className="text-sm font-medium text-gray-900">{organisation.mutualTrustScore}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>Connected: {organisation.connectionDate}</span>
                  <span>Last Activity: {organisation.lastActivity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organisation Details Modal */}
      {selectedOrganisation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedOrganisation.name}</h2>
              <button
                onClick={() => setSelectedOrganisation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{selectedOrganisation.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-medium">{selectedOrganisation.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedOrganisation.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedOrganisation.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a href={selectedOrganisation.website} className="text-primary-600 hover:underline flex items-center space-x-1">
                      <span>{selectedOrganisation.website}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Scores */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trust Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Organisation Trust Score</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedOrganisation.trustScore}</p>
                  </div>
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Mutual Trust Score</p>
                    <p className="text-2xl font-bold text-primary-900">{selectedOrganisation.mutualTrustScore}</p>
                  </div>
                </div>
              </div>

              {/* Shared Data */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shared Data</h3>
                <div className="space-y-2">
                  {selectedOrganisation.sharedData.map((data, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{data}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Permissions</h3>
                <div className="space-y-2">
                  {selectedOrganisation.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit Connection
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Remove Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrustScoreOrganisation

