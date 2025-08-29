import { useState } from 'react'
import { 
  User, 
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
  X,
  Heart,
  Star,
  MessageSquare,
  Camera
} from 'lucide-react'

interface LinkedIndividual {
  id: string
  name: string
  email: string
  avatar: string
  trustScore: number
  status: 'active' | 'pending' | 'blocked' | 'inactive'
  connectionDate: string
  lastActivity: string
  relationship: 'friend' | 'colleague' | 'family' | 'professional' | 'acquaintance'
  mutualConnections: number
  sharedInterests: string[]
  verificationLevel: 'basic' | 'verified' | 'premium'
  mutualTrustScore: number
  change: number
  isFavorite: boolean
  isAttester: boolean
}

const TrustScoreIndividual = () => {
  const [individuals, setIndividuals] = useState<LinkedIndividual[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      trustScore: 1350,
      status: 'active',
      connectionDate: '2024-01-10',
      lastActivity: '2024-01-20',
      relationship: 'colleague',
      mutualConnections: 12,
      sharedInterests: ['Technology', 'Innovation', 'Professional Development'],
      verificationLevel: 'verified',
      mutualTrustScore: 1250,
      change: 15,
      isFavorite: true,
      isAttester: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      trustScore: 1420,
      status: 'active',
      connectionDate: '2024-01-05',
      lastActivity: '2024-01-19',
      relationship: 'professional',
      mutualConnections: 8,
      sharedInterests: ['Finance', 'Investment', 'Business Strategy'],
      verificationLevel: 'premium',
      mutualTrustScore: 1380,
      change: -5,
      isFavorite: false,
      isAttester: true
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      trustScore: 1280,
      status: 'pending',
      connectionDate: '2024-01-15',
      lastActivity: '2024-01-18',
      relationship: 'friend',
      mutualConnections: 5,
      sharedInterests: ['Art', 'Travel', 'Photography'],
      verificationLevel: 'basic',
      mutualTrustScore: 1200,
      change: 0,
      isFavorite: false,
      isAttester: false
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david.brown@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      trustScore: 1550,
      status: 'active',
      connectionDate: '2023-12-20',
      lastActivity: '2024-01-20',
      relationship: 'family',
      mutualConnections: 25,
      sharedInterests: ['Sports', 'Music', 'Family'],
      verificationLevel: 'verified',
      mutualTrustScore: 1500,
      change: 30,
      isFavorite: true,
      isAttester: true
    }
  ])

  const [selectedIndividual, setSelectedIndividual] = useState<LinkedIndividual | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'favorites' | 'attesters' | 'pending'>('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'blocked':
        return 'text-red-600 bg-red-100'
      case 'inactive':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'family':
        return 'text-purple-600 bg-purple-100'
      case 'friend':
        return 'text-blue-600 bg-blue-100'
      case 'colleague':
        return 'text-green-600 bg-green-100'
      case 'professional':
        return 'text-orange-600 bg-orange-100'
      case 'acquaintance':
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

  const filteredIndividuals = individuals.filter(individual => {
    if (filter === 'favorites') return individual.isFavorite
    if (filter === 'attesters') return individual.isAttester
    if (filter === 'pending') return individual.status === 'pending'
    return true
  })

  const toggleFavorite = (id: string) => {
    setIndividuals(prev => prev.map(ind => 
      ind.id === id ? { ...ind, isFavorite: !ind.isFavorite } : ind
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Linked Individuals</h1>
          <p className="text-gray-600">Manage your personal connections and track mutual trust scores</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          <span>Connect Individual</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Total Connected</p>
              <p className="text-2xl font-bold text-gray-900">{individuals.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Favorites</p>
              <p className="text-2xl font-bold text-gray-900">
                {individuals.filter(ind => ind.isFavorite).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Attesters</p>
              <p className="text-2xl font-bold text-gray-900">
                {individuals.filter(ind => ind.isAttester).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Avg Trust Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(individuals.reduce((acc, ind) => acc + ind.trustScore, 0) / individuals.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({individuals.length})
        </button>
        <button
          onClick={() => setFilter('favorites')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'favorites' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Favorites ({individuals.filter(ind => ind.isFavorite).length})
        </button>
        <button
          onClick={() => setFilter('attesters')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'attesters' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Attesters ({individuals.filter(ind => ind.isAttester).length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'pending' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending ({individuals.filter(ind => ind.status === 'pending').length})
        </button>
      </div>

      {/* Individuals List */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Connected Individuals</h2>
        <div className="space-y-4">
          {filteredIndividuals.map((individual) => (
            <div
              key={individual.id}
              onClick={() => setSelectedIndividual(individual)}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={individual.avatar}
                      alt={individual.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {individual.isAttester && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">{individual.name}</h3>
                      {individual.isFavorite && (
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{individual.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {getChangeIcon(individual.change)}
                    <span className={`text-sm font-medium ${
                      individual.change > 0 ? 'text-green-600' : 
                      individual.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {individual.change > 0 ? '+' : ''}{individual.change}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Trust Score: {individual.trustScore}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(individual.status)}`}>
                    {individual.status.charAt(0).toUpperCase() + individual.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Relationship</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(individual.relationship)}`}>
                    {individual.relationship.charAt(0).toUpperCase() + individual.relationship.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mutual Connections</p>
                  <p className="text-sm font-medium text-gray-900">{individual.mutualConnections}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mutual Trust Score</p>
                  <p className="text-sm font-medium text-gray-900">{individual.mutualTrustScore}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>Connected: {individual.connectionDate}</span>
                  <span>Last Activity: {individual.lastActivity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(individual.id)
                    }}
                    className={`hover:text-red-500 ${individual.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    <Heart className={`h-4 w-4 ${individual.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="text-primary-600 hover:text-primary-700">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Details Modal */}
      {selectedIndividual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedIndividual.avatar}
                    alt={selectedIndividual.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {selectedIndividual.isAttester && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedIndividual.name}</h2>
                  <p className="text-gray-600">{selectedIndividual.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIndividual(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Trust Scores */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trust Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Individual Trust Score</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedIndividual.trustScore}</p>
                  </div>
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Mutual Trust Score</p>
                    <p className="text-2xl font-bold text-primary-900">{selectedIndividual.mutualTrustScore}</p>
                  </div>
                </div>
              </div>

              {/* Connection Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connection Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Relationship</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(selectedIndividual.relationship)}`}>
                      {selectedIndividual.relationship.charAt(0).toUpperCase() + selectedIndividual.relationship.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mutual Connections</p>
                    <p className="font-medium">{selectedIndividual.mutualConnections}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Connected Since</p>
                    <p className="font-medium">{selectedIndividual.connectionDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Activity</p>
                    <p className="font-medium">{selectedIndividual.lastActivity}</p>
                  </div>
                </div>
              </div>

              {/* Shared Interests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shared Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIndividual.sharedInterests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Send Message
                  </button>
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    View Profile
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => toggleFavorite(selectedIndividual.id)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedIndividual.isFavorite 
                        ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {selectedIndividual.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Remove Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrustScoreIndividual

