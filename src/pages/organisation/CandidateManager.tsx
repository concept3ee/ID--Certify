import React, { useState } from 'react'
import { 
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Users,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  MoreVertical,
  RefreshCw,
  Save,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
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
interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  type: 'individual' | 'business'
  status: 'active' | 'pending' | 'verified' | 'rejected' | 'expired' | 'expiring_soon'
  addedDate: string
  verificationCount: number
  lastVerification?: string
  notes?: string
  documents: string[]
  attesters: string[]
  trustScore: number
  expiryDate?: string
  verificationHistory: VerificationRecord[]
  unverifiedItems: string[]
  attesterTrustScores: AttesterTrustScore[]
}

interface VerificationRecord {
  id: string
  type: string
  status: 'verified' | 'pending' | 'failed' | 'expired'
  verifiedDate?: string
  expiryDate?: string
  attesterName: string
  attesterTrustScore: number
  documents: string[]
  notes?: string
}

interface AttesterTrustScore {
  attesterId: string
  attesterName: string
  trustScore: number
  verificationCount: number
  lastVerification: string
}

const CandidateManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  // Mock data
  const mockCandidates: Candidate[] = [
    {
      id: 'candidate-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      type: 'individual',
      status: 'expiring_soon',
      addedDate: '2025-01-15T10:00:00Z',
      verificationCount: 3,
      lastVerification: '2025-01-16T14:30:00Z',
      notes: 'High priority candidate for executive position',
      documents: ['resume.pdf', 'id_scan.pdf', 'references.pdf'],
      attesters: ['attester-001', 'attester-002'],
      trustScore: 87,
      expiryDate: '2025-02-15T14:30:00Z',
      verificationHistory: [
        {
          id: 'ver-001',
          type: 'Identity Verification',
          status: 'verified',
          verifiedDate: '2025-01-16T14:30:00Z',
          expiryDate: '2025-02-15T14:30:00Z',
          attesterName: 'John Smith',
          attesterTrustScore: 92,
          documents: ['passport.pdf', 'drivers_license.pdf'],
          notes: 'Identity verified successfully'
        },
        {
          id: 'ver-002',
          type: 'Background Check',
          status: 'verified',
          verifiedDate: '2025-01-15T10:00:00Z',
          expiryDate: '2025-07-15T10:00:00Z',
          attesterName: 'Jane Doe',
          attesterTrustScore: 88,
          documents: ['background_check.pdf'],
          notes: 'Clean background check'
        }
      ],
      unverifiedItems: ['Education Verification', 'Employment History'],
      attesterTrustScores: [
        {
          attesterId: 'attester-001',
          attesterName: 'John Smith',
          trustScore: 92,
          verificationCount: 45,
          lastVerification: '2025-01-16T14:30:00Z'
        },
        {
          attesterId: 'attester-002',
          attesterName: 'Jane Doe',
          trustScore: 88,
          verificationCount: 32,
          lastVerification: '2025-01-15T10:00:00Z'
        }
      ]
    },
    {
      id: 'candidate-002',
      name: 'TechCorp Solutions',
      email: 'hr@techcorp.com',
      phone: '+1 (555) 987-6543',
      type: 'business',
      status: 'verified',
      addedDate: '2025-01-14T14:30:00Z',
      verificationCount: 1,
      lastVerification: '2025-01-15T09:15:00Z',
      notes: 'Vendor verification for software services',
      documents: ['business_license.pdf', 'tax_certificate.pdf'],
      attesters: ['attester-003'],
      trustScore: 94,
      expiryDate: '2025-07-15T09:15:00Z',
      verificationHistory: [
        {
          id: 'ver-003',
          type: 'Business License',
          status: 'verified',
          verifiedDate: '2025-01-15T09:15:00Z',
          expiryDate: '2025-07-15T09:15:00Z',
          attesterName: 'Mike Wilson',
          attesterTrustScore: 95,
          documents: ['business_license.pdf', 'tax_certificate.pdf'],
          notes: 'Business license verified and current'
        }
      ],
      unverifiedItems: ['Financial Statements', 'Insurance Documents'],
      attesterTrustScores: [
        {
          attesterId: 'attester-003',
          attesterName: 'Mike Wilson',
          trustScore: 95,
          verificationCount: 67,
          lastVerification: '2025-01-15T09:15:00Z'
        }
      ]
    },
    {
      id: 'candidate-003',
      name: 'David Lee',
      email: 'david.lee@email.com',
      phone: '+1 (555) 456-7890',
      type: 'individual',
      status: 'pending',
      addedDate: '2025-01-16T09:15:00Z',
      verificationCount: 0,
      notes: 'New candidate awaiting initial verification',
      documents: [],
      attesters: [],
      trustScore: 0,
      verificationHistory: [],
      unverifiedItems: ['Identity Verification', 'Background Check', 'Education Verification'],
      attesterTrustScores: []
    },
    {
      id: 'candidate-004',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 321-0987',
      type: 'individual',
      status: 'expired',
      addedDate: '2025-01-13T16:45:00Z',
      verificationCount: 1,
      lastVerification: '2025-01-14T11:20:00Z',
      notes: 'Failed background check - criminal record found',
      documents: ['resume.pdf', 'background_check.pdf'],
      attesters: ['attester-001'],
      trustScore: 23,
      expiryDate: '2025-01-14T11:20:00Z',
      verificationHistory: [
        {
          id: 'ver-004',
          type: 'Background Check',
          status: 'failed',
          verifiedDate: '2025-01-14T11:20:00Z',
          attesterName: 'John Smith',
          attesterTrustScore: 92,
          documents: ['background_check.pdf'],
          notes: 'Criminal record found - verification failed'
        }
      ],
      unverifiedItems: ['Identity Verification', 'Education Verification'],
      attesterTrustScores: [
        {
          attesterId: 'attester-001',
          attesterName: 'John Smith',
          trustScore: 92,
          verificationCount: 45,
          lastVerification: '2025-01-14T11:20:00Z'
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'expiring_soon': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'individual' ? <User className="w-4 h-4" /> : <Building className="w-4 h-4" />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    })
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getTrustScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    if (score >= 40) return 'bg-orange-100'
    return 'bg-red-100'
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const now = new Date()
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const isExpiringSoon = (expiryDate: string) => {
    return getDaysUntilExpiry(expiryDate) <= 30 && getDaysUntilExpiry(expiryDate) > 0
  }

  const isExpired = (expiryDate: string) => {
    return getDaysUntilExpiry(expiryDate) <= 0
  }

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = searchQuery === '' || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = typeFilter === 'all' || candidate.type === typeFilter
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-medium text-gray-900">Candidate Management</h1>
              <p className="text-xs text-gray-500 mt-1">Manage candidates for verification processes</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => setShowBulkModal(true)}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Bulk Import
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Candidate
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{mockCandidates.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCandidates.filter(c => c.status === 'verified').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCandidates.filter(c => c.status === 'expiring_soon').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCandidates.filter(c => c.status === 'expired').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCandidates.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="verified">Verified</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Candidates</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {selectedCandidates.length === filteredCandidates.length ? 'Deselect All' : 'Select All'}
                </button>
                {selectedCandidates.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedCandidates.length} selected
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trust Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verifications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleSelectCandidate(candidate.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {getTypeIcon(candidate.type)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                          {candidate.phone && (
                            <div className="text-xs text-gray-400">{candidate.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {candidate.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTrustScoreBgColor(candidate.trustScore)} ${getTrustScoreColor(candidate.trustScore)}`}>
                          {candidate.trustScore}/100
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.expiryDate ? (
                        <div className="flex items-center">
                          <span className={`text-sm ${isExpired(candidate.expiryDate) ? 'text-red-600' : isExpiringSoon(candidate.expiryDate) ? 'text-orange-600' : 'text-gray-600'}`}>
                            {isExpired(candidate.expiryDate) 
                              ? 'Expired' 
                              : isExpiringSoon(candidate.expiryDate) 
                                ? `${getDaysUntilExpiry(candidate.expiryDate)} days`
                                : formatDate(candidate.expiryDate)
                            }
                          </span>
                          {isExpiringSoon(candidate.expiryDate) && (
                            <AlertTriangle className="w-4 h-4 text-orange-500 ml-1" />
                          )}
                          {isExpired(candidate.expiryDate) && (
                            <XCircle className="w-4 h-4 text-red-500 ml-1" />
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No expiry</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.verificationCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(candidate.addedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedCandidate(candidate)
                            setShowDetailsModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedCandidate(candidate)
                            setShowHistoryModal(true)
                          }}
                          className="text-green-600 hover:text-green-900"
                          title="Verification History"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Candidate Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Candidate</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter candidate name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter any additional notes"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Candidate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Import Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Bulk Import Candidates</h3>
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload CSV File</h3>
                <p className="text-gray-600 mb-6">
                  Upload a CSV file with candidate information to import multiple candidates at once
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <span className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      CSV files only
                    </span>
                  </label>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowBulkModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Import Candidates
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidate Details Modal */}
        {showDetailsModal && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Candidate Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-900">{selectedCandidate.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">{selectedCandidate.email}</span>
                      </div>
                      {selectedCandidate.phone && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium text-gray-900">{selectedCandidate.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {selectedCandidate.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCandidate.status)}`}>
                          {selectedCandidate.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Added Date:</span>
                        <span className="font-medium text-gray-900">{formatDate(selectedCandidate.addedDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Score</h3>
                    <div className="flex items-center space-x-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${getTrustScoreBgColor(selectedCandidate.trustScore)}`}>
                        <span className={`text-2xl font-bold ${getTrustScoreColor(selectedCandidate.trustScore)}`}>
                          {selectedCandidate.trustScore}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Overall Trust Score</p>
                        <p className="text-xs text-gray-500">Based on verification history and attester ratings</p>
                      </div>
                    </div>
                  </div>

                  {/* Expiry Information */}
                  {selectedCandidate.expiryDate && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Expiry Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expiry Date:</span>
                          <span className="font-medium text-gray-900">{formatDate(selectedCandidate.expiryDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Days Until Expiry:</span>
                          <span className={`font-medium ${isExpired(selectedCandidate.expiryDate) ? 'text-red-600' : isExpiringSoon(selectedCandidate.expiryDate) ? 'text-orange-600' : 'text-gray-900'}`}>
                            {isExpired(selectedCandidate.expiryDate) 
                              ? 'Expired' 
                              : `${getDaysUntilExpiry(selectedCandidate.expiryDate)} days`
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isExpired(selectedCandidate.expiryDate) 
                              ? 'bg-red-100 text-red-800' 
                              : isExpiringSoon(selectedCandidate.expiryDate) 
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {isExpired(selectedCandidate.expiryDate) 
                              ? 'Expired' 
                              : isExpiringSoon(selectedCandidate.expiryDate) 
                                ? 'Expiring Soon'
                                : 'Valid'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Details */}
                <div className="space-y-6">
                  {/* Attester Trust Scores */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Attester Trust Scores</h3>
                    <div className="space-y-3">
                      {selectedCandidate.attesterTrustScores.map((attester, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{attester.attesterName}</p>
                            <p className="text-sm text-gray-500">{attester.verificationCount} verifications</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTrustScoreBgColor(attester.trustScore)} ${getTrustScoreColor(attester.trustScore)}`}>
                              {attester.trustScore}/100
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              Last: {formatDate(attester.lastVerification)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unverified Items */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Unverified Items</h3>
                    <div className="space-y-2">
                      {selectedCandidate.unverifiedItems.map((item, index) => (
                        <div key={index} className="flex items-center p-2 bg-white rounded-lg">
                          <XCircle className="w-4 h-4 text-red-500 mr-2" />
                          <span className="text-gray-900">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                    <div className="space-y-2">
                      {selectedCandidate.documents.map((doc, index) => (
                        <div key={index} className="flex items-center p-2 bg-white rounded-lg">
                          <FileText className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-gray-900">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verification History Modal */}
        {showHistoryModal && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Verification History</h2>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedCandidate.verificationHistory.length > 0 ? (
                  selectedCandidate.verificationHistory.map((record, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
                          <p className="text-sm text-gray-600">Verified by: {record.attesterName}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'verified' ? 'bg-green-100 text-green-800' :
                          record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          record.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Attester Trust Score:</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTrustScoreBgColor(record.attesterTrustScore)} ${getTrustScoreColor(record.attesterTrustScore)}`}>
                            {record.attesterTrustScore}/100
                          </span>
                        </div>
                        {record.verifiedDate && (
                          <div>
                            <p className="text-sm text-gray-600">Verified Date:</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(record.verifiedDate)}</p>
                          </div>
                        )}
                        {record.expiryDate && (
                          <div>
                            <p className="text-sm text-gray-600">Expiry Date:</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(record.expiryDate)}</p>
                          </div>
                        )}
                      </div>

                      {record.documents.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {record.documents.map((doc, docIndex) => (
                              <span key={docIndex} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                <FileText className="w-3 h-3 mr-1" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {record.notes && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Notes:</p>
                          <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No verification history available</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateManager
