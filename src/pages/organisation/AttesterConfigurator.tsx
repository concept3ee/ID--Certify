import React, { useState } from 'react'
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Save,
  X,
  Check,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  User,
  Building,
  Briefcase,
  GraduationCap,
  Shield,
  Star,
  Flag,
  Bookmark,
  Archive,
  Zap,
  Target,
  Award,
  Activity,
  Globe,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  Smartphone,
  Monitor,
  Tablet,
  Wifi,
  WifiOff,
  Battery,
  Power,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Wind,
  Thermometer,
  Droplet,
  Flame,
  Snowflake,
  Umbrella,
  TreePine,
  TreeDeciduous,
  Flower,
  Leaf,
  Sprout,
  Bug,
  Bird,
  Fish,
  Heart,
  HeartOff,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Hand,
  Fingerprint,
  Scan,
  QrCode,
  Tag,
  Ticket,
  Gift,
  Package,
  Box,
  Container,
  Truck,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Baby,
  Rainbow,
} from 'lucide-react'

// Types
interface Attester {
  id: string
  name: string
  email: string
  type: 'individual' | 'organization'
  specialization: string[]
  status: 'active' | 'inactive' | 'pending'
  rating: number
  verificationCount: number
  successRate: number
  avgResponseTime: number
  joinedDate: string
  lastActive: string
  credentials: string[]
  availability: 'available' | 'busy' | 'unavailable'
  hourlyRate?: number
  notes?: string
}

interface AttesterPool {
  id: string
  name: string
  description: string
  attesters: string[]
  requirements: {
    minRating: number
    maxResponseTime: number
    specializations: string[]
  }
  createdAt: string
  createdBy: string
}

const AttesterConfigurator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attesters' | 'pools' | 'requirements'>('attesters')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showAddAttester, setShowAddAttester] = useState(false)
  const [showAddPool, setShowAddPool] = useState(false)
  const [selectedAttester, setSelectedAttester] = useState<Attester | null>(null)

  // Mock data
  const mockAttesters: Attester[] = [
    {
      id: 'attester-001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@attester.com',
      type: 'individual',
      specialization: ['Medical', 'Professional', 'Education'],
      status: 'active',
      rating: 4.8,
      verificationCount: 156,
      successRate: 94.2,
      avgResponseTime: 2.3,
      joinedDate: '2024-01-15T10:00:00Z',
      lastActive: '2025-01-16T10:30:00Z',
      credentials: ['MD', 'PhD', 'Board Certified'],
      availability: 'available',
      hourlyRate: 75,
      notes: 'Expert in medical credential verification'
    },
    {
      id: 'attester-002',
      name: 'Mike Chen',
      email: 'mike.chen@attester.com',
      type: 'individual',
      specialization: ['Business', 'Financial', 'Legal'],
      status: 'active',
      rating: 4.9,
      verificationCount: 89,
      successRate: 97.8,
      avgResponseTime: 1.8,
      joinedDate: '2024-02-20T10:00:00Z',
      lastActive: '2025-01-16T09:45:00Z',
      credentials: ['CPA', 'JD', 'CFA'],
      availability: 'available',
      hourlyRate: 85,
      notes: 'Specializes in business and financial verifications'
    },
    {
      id: 'attester-003',
      name: 'Lisa Wang',
      email: 'lisa.wang@attester.com',
      type: 'individual',
      specialization: ['Education', 'Academic', 'Research'],
      status: 'active',
      rating: 4.7,
      verificationCount: 203,
      successRate: 91.6,
      avgResponseTime: 1.2,
      joinedDate: '2024-03-10T14:30:00Z',
      lastActive: '2025-01-16T08:20:00Z',
      credentials: ['PhD', 'Professor', 'Research Director'],
      availability: 'busy',
      hourlyRate: 65,
      notes: 'Academic verification specialist'
    },
    {
      id: 'attester-004',
      name: 'Legal Associates LLC',
      email: 'contact@legalassociates.com',
      type: 'organization',
      specialization: ['Legal', 'Compliance', 'Regulatory'],
      status: 'active',
      rating: 4.6,
      verificationCount: 67,
      successRate: 98.5,
      avgResponseTime: 3.1,
      joinedDate: '2024-04-05T11:15:00Z',
      lastActive: '2025-01-15T16:00:00Z',
      credentials: ['Law Firm', 'Licensed', 'Bar Certified'],
      availability: 'available',
      hourlyRate: 120,
      notes: 'Legal verification services'
    }
  ]

  const mockAttesterPools: AttesterPool[] = [
    {
      id: 'pool-001',
      name: 'Medical Professionals',
      description: 'Pool of medical professionals for healthcare verifications',
      attesters: ['attester-001'],
      requirements: {
        minRating: 4.5,
        maxResponseTime: 48,
        specializations: ['Medical', 'Healthcare']
      },
      createdAt: '2024-01-15T09:00:00Z',
      createdBy: 'admin'
    },
    {
      id: 'pool-002',
      name: 'Business Experts',
      description: 'Pool of business and financial experts',
      attesters: ['attester-002', 'attester-004'],
      requirements: {
        minRating: 4.0,
        maxResponseTime: 24,
        specializations: ['Business', 'Financial', 'Legal']
      },
      createdAt: '2024-02-20T10:00:00Z',
      createdBy: 'admin'
    },
    {
      id: 'pool-003',
      name: 'Academic Specialists',
      description: 'Pool of academic and educational specialists',
      attesters: ['attester-003'],
      requirements: {
        minRating: 4.0,
        maxResponseTime: 72,
        specializations: ['Education', 'Academic']
      },
      createdAt: '2024-03-20T14:30:00Z',
      createdBy: 'admin'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      case 'unavailable': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const filteredAttesters = mockAttesters.filter(attester => {
    const matchesSearch = searchQuery === '' || 
      attester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attester.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attester.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || attester.status === statusFilter
    const matchesType = typeFilter === 'all' || attester.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const renderAttestersTab = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Attesters</h2>
          <span className="text-sm text-gray-500">({filteredAttesters.length} attesters)</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowAddAttester(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Attester
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search attesters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attesters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttesters.map((attester) => (
          <div key={attester.id} className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{attester.name}</h3>
                  <p className="text-sm text-gray-600">{attester.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedAttester(attester)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {attester.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attester.status)}`}>
                  {attester.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Availability</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(attester.availability)}`}>
                  {attester.availability}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-1">{attester.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(attester.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-gray-900">{attester.successRate}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Response</span>
                <span className="text-sm font-medium text-gray-900">{attester.avgResponseTime} days</span>
              </div>

              {attester.hourlyRate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rate</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(attester.hourlyRate)}/hr</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Specializations:</div>
                <div className="flex flex-wrap gap-1">
                  {attester.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPoolsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Attester Pools</h2>
        <button
          onClick={() => setShowAddPool(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Pool
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAttesterPools.map((pool) => (
          <div key={pool.id} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{pool.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{pool.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-600 hover:text-gray-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Attesters</span>
                <span className="text-sm font-medium text-gray-900">{pool.attesters.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Min Rating</span>
                <span className="text-sm font-medium text-gray-900">{pool.requirements.minRating}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Max Response Time</span>
                <span className="text-sm font-medium text-gray-900">{pool.requirements.maxResponseTime}h</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Required Specializations:</div>
                <div className="flex flex-wrap gap-1">
                  {pool.requirements.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderRequirementsTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Attester Requirements</h2>
      
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-md font-semibold text-gray-900 mb-4">Default Requirements</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              defaultValue="4.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Response Time (hours)
            </label>
            <input
              type="number"
              min="1"
              max="168"
              defaultValue="48"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Specializations
            </label>
            <div className="space-y-2">
              {['Medical', 'Business', 'Education', 'Legal', 'Financial'].map((spec) => (
                <label key={spec} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={['Medical', 'Business', 'Education'].includes(spec)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{spec}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Requirements
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Attester Configuration</h1>
          <p className="text-gray-600 mt-2">Manage attesters, pools, and verification requirements</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setActiveTab('attesters')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'attesters'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Attesters
            </button>
            <button 
              onClick={() => setActiveTab('pools')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'pools'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pools
            </button>
            <button 
              onClick={() => setActiveTab('requirements')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'requirements'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Requirements
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'attesters' && renderAttestersTab()}
        {activeTab === 'pools' && renderPoolsTab()}
        {activeTab === 'requirements' && renderRequirementsTab()}
      </div>
    </div>
  )
}

export default AttesterConfigurator
