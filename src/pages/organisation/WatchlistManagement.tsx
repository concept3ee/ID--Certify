import React, { useState } from 'react'
import { 
  Shield, 
  Flag, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  MoreVertical, 
  ChevronRight, 
  ChevronDown, 
  Users, 
  Building, 
  Globe, 
  FileText, 
  Target, 
  Info, 
  ExternalLink, 
  RefreshCw, 
  Bell, 
  Settings, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  XCircle,
  Star,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

interface WatchlistEntry {
  id: string
  name: string
  type: 'individual' | 'entity'
  category: 'pep' | 'sanctions' | 'adverse-media' | 'watchlist' | 'terrorist'
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  status: 'active' | 'inactive' | 'under-review' | 'removed'
  source: string
  sourceId: string
  aliases: string[]
  dateOfBirth?: string
  placeOfBirth?: string
  nationality?: string
  address?: string
  phone?: string
  email?: string
  position?: string
  organization?: string
  country?: string
  reason: string
  addedDate: string
  lastUpdated: string
  nextReview: string
  matches: WatchlistMatch[]
  documents: WatchlistDocument[]
  notes: string
  assignedTo?: string
}

interface WatchlistMatch {
  id: string
  customerId: string
  customerName: string
  matchType: 'exact' | 'fuzzy' | 'partial'
  confidence: number
  matchedFields: string[]
  status: 'new' | 'reviewed' | 'false-positive' | 'confirmed' | 'escalated'
  detectedAt: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

interface WatchlistDocument {
  id: string
  type: 'passport' | 'drivers-license' | 'national-id' | 'birth-certificate' | 'other'
  number: string
  issuingCountry: string
  issueDate?: string
  expiryDate?: string
  status: 'valid' | 'expired' | 'revoked' | 'unknown'
}

interface ScreeningResult {
  id: string
  customerId: string
  customerName: string
  screeningType: 'pep' | 'sanctions' | 'adverse-media' | 'watchlist'
  status: 'clear' | 'hit' | 'review' | 'pending'
  confidence: number
  matches: WatchlistMatch[]
  screenedAt: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

const WatchlistManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'entries' | 'matches' | 'screening' | 'analytics'>('overview')
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Mock data - in real implementation, this would come from API
  const watchlistEntries: WatchlistEntry[] = [
    {
      id: '1',
      name: 'John Smith',
      type: 'individual',
      category: 'pep',
      riskLevel: 'high',
      status: 'active',
      source: 'World-Check',
      sourceId: 'WC-12345',
      aliases: ['Johnny Smith', 'J. Smith'],
      dateOfBirth: '1975-03-15',
      placeOfBirth: 'New York, USA',
      nationality: 'American',
      address: '123 Main St, New York, NY 10001',
      phone: '+1-555-0123',
      email: 'john.smith@email.com',
      position: 'Deputy Minister of Finance',
      organization: 'Ministry of Finance',
      country: 'Country X',
      reason: 'Politically Exposed Person - Government official',
      addedDate: '2024-01-10',
      lastUpdated: '2024-01-15',
      nextReview: '2024-04-10',
      matches: [
        {
          id: '1-1',
          customerId: '1',
          customerName: 'John Smith',
          matchType: 'exact',
          confidence: 95,
          matchedFields: ['name', 'dateOfBirth', 'nationality'],
          status: 'confirmed',
          detectedAt: '2024-01-16T10:30:00Z',
          reviewedBy: 'Sarah Johnson',
          reviewedAt: '2024-01-16T14:20:00Z',
          notes: 'Confirmed PEP match - Government official'
        }
      ],
      documents: [
        {
          id: '1-1',
          type: 'passport',
          number: 'US123456789',
          issuingCountry: 'USA',
          issueDate: '2020-01-15',
          expiryDate: '2030-01-15',
          status: 'valid'
        }
      ],
      notes: 'High-risk PEP with significant political influence',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'Offshore Holdings Ltd',
      type: 'entity',
      category: 'sanctions',
      riskLevel: 'critical',
      status: 'active',
      source: 'OFAC',
      sourceId: 'OFAC-67890',
      aliases: ['Offshore Holdings Limited', 'OHL'],
      address: 'Cayman Islands',
      country: 'Cayman Islands',
      reason: 'Sanctions - Money laundering and tax evasion',
      addedDate: '2024-01-05',
      lastUpdated: '2024-01-12',
      nextReview: '2024-02-05',
      matches: [
        {
          id: '2-1',
          customerId: '2',
          customerName: 'TechCorp Solutions Ltd',
          matchType: 'fuzzy',
          confidence: 78,
          matchedFields: ['name', 'address'],
          status: 'false-positive',
          detectedAt: '2024-01-18T09:15:00Z',
          reviewedBy: 'Mike Chen',
          reviewedAt: '2024-01-18T11:30:00Z',
          notes: 'False positive - Different entity with similar name'
        }
      ],
      documents: [],
      notes: 'Critical sanctions target - High priority monitoring required'
    },
    {
      id: '3',
      name: 'Ahmed Hassan',
      type: 'individual',
      category: 'terrorist',
      riskLevel: 'critical',
      status: 'active',
      source: 'UN Security Council',
      sourceId: 'UN-11111',
      aliases: ['Ahmed H.', 'A. Hassan'],
      dateOfBirth: '1980-07-22',
      placeOfBirth: 'Damascus, Syria',
      nationality: 'Syrian',
      reason: 'Terrorist designation - UN Security Council',
      addedDate: '2024-01-01',
      lastUpdated: '2024-01-08',
      nextReview: '2024-01-15',
      matches: [],
      documents: [],
      notes: 'Critical terrorist designation - Immediate alert required'
    }
  ]

  const screeningResults: ScreeningResult[] = [
    {
      id: '1',
      customerId: '1',
      customerName: 'John Smith',
      screeningType: 'pep',
      status: 'hit',
      confidence: 95,
      matches: watchlistEntries[0].matches,
      screenedAt: '2024-01-16T10:30:00Z',
      reviewedBy: 'Sarah Johnson',
      reviewedAt: '2024-01-16T14:20:00Z',
      notes: 'Confirmed PEP match'
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'TechCorp Solutions Ltd',
      screeningType: 'sanctions',
      status: 'review',
      confidence: 78,
      matches: watchlistEntries[1].matches,
      screenedAt: '2024-01-18T09:15:00Z',
      reviewedBy: 'Mike Chen',
      reviewedAt: '2024-01-18T11:30:00Z',
      notes: 'False positive - Different entity'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pep': return 'text-blue-600 bg-blue-100'
      case 'sanctions': return 'text-red-600 bg-red-100'
      case 'adverse-media': return 'text-orange-600 bg-orange-100'
      case 'watchlist': return 'text-yellow-600 bg-yellow-100'
      case 'terrorist': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'under-review': return 'text-yellow-600 bg-yellow-100'
      case 'removed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-100'
      case 'reviewed': return 'text-yellow-600 bg-yellow-100'
      case 'false-positive': return 'text-gray-600 bg-gray-100'
      case 'confirmed': return 'text-red-600 bg-red-100'
      case 'escalated': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getScreeningStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'text-green-600 bg-green-100'
      case 'hit': return 'text-red-600 bg-red-100'
      case 'review': return 'text-yellow-600 bg-yellow-100'
      case 'pending': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pep': return <Flag className="w-4 h-4" />
      case 'sanctions': return <Shield className="w-4 h-4" />
      case 'adverse-media': return <FileText className="w-4 h-4" />
      case 'watchlist': return <Target className="w-4 h-4" />
      case 'terrorist': return <AlertTriangle className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const toggleEntryExpansion = (entryId: string) => {
    const newExpanded = new Set(expandedEntries)
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId)
    } else {
      newExpanded.add(entryId)
    }
    setExpandedEntries(newExpanded)
  }

  const filteredEntries = watchlistEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory
    const matchesRisk = filterRiskLevel === 'all' || entry.riskLevel === filterRiskLevel
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus
    return matchesSearch && matchesCategory && matchesRisk && matchesStatus
  })

  const totalEntries = watchlistEntries.length
  const activeEntries = watchlistEntries.filter(e => e.status === 'active').length
  const totalMatches = watchlistEntries.reduce((sum, e) => sum + e.matches.length, 0)
  const pendingMatches = watchlistEntries.reduce((sum, e) => sum + e.matches.filter(m => m.status === 'new').length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Watchlist Management</h1>
          <p className="text-gray-600 mt-1">PEP, sanctions, and watchlist screening and management</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900">{totalEntries}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{activeEntries}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-gray-900">{totalMatches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingMatches}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'entries', name: 'Watchlist Entries', icon: Shield },
            { id: 'matches', name: 'Matches', icon: Target },
            { id: 'screening', name: 'Screening Results', icon: Search },
            { id: 'analytics', name: 'Analytics', icon: PieChart }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Matches */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Matches</h3>
            <div className="space-y-4">
              {watchlistEntries.flatMap(e => e.matches).slice(0, 3).map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{match.customerName}</h4>
                      <p className="text-sm text-gray-600">
                        {match.matchType} match • {match.confidence}% confidence
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchStatusColor(match.status)}`}>
                      {match.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{match.detectedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
            <div className="space-y-4">
              {['pep', 'sanctions', 'adverse-media', 'watchlist', 'terrorist'].map((category) => {
                const count = watchlistEntries.filter(e => e.category === category).length
                const percentage = totalEntries > 0 ? (count / totalEntries) * 100 : 0
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
                        {category.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">{count} entries</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            category === 'pep' ? 'bg-blue-500' :
                            category === 'sanctions' ? 'bg-red-500' :
                            category === 'adverse-media' ? 'bg-orange-500' :
                            category === 'watchlist' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'entries' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search watchlist entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                <option value="pep">PEP</option>
                <option value="sanctions">Sanctions</option>
                <option value="adverse-media">Adverse Media</option>
                <option value="watchlist">Watchlist</option>
                <option value="terrorist">Terrorist</option>
              </select>
              <select
                value={filterRiskLevel}
                onChange={(e) => setFilterRiskLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="under-review">Under Review</option>
                <option value="removed">Removed</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Watchlist Entries */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Watchlist Entries ({filteredEntries.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleEntryExpansion(entry.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
                      >
                        {expandedEntries.has(entry.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        {getCategoryIcon(entry.category)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{entry.name}</h4>
                        <p className="text-sm text-gray-600">
                          {entry.type === 'individual' ? 'Individual' : 'Entity'} • {entry.source}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(entry.category)}`}>
                        {entry.category.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(entry.riskLevel)}`}>
                        {entry.riskLevel}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                      {entry.matches.length > 0 && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          {entry.matches.length} matches
                        </span>
                      )}
                    </div>
                  </div>

                  {expandedEntries.has(entry.id) && (
                    <div className="mt-6 ml-12 space-y-6">
                      {/* Entry Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Basic Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="text-gray-900 capitalize">{entry.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Source:</span>
                              <span className="text-gray-900">{entry.source}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Source ID:</span>
                              <span className="text-gray-900">{entry.sourceId}</span>
                            </div>
                            {entry.dateOfBirth && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Date of Birth:</span>
                                <span className="text-gray-900">{entry.dateOfBirth}</span>
                              </div>
                            )}
                            {entry.nationality && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Nationality:</span>
                                <span className="text-gray-900">{entry.nationality}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h5>
                          <div className="space-y-2 text-sm">
                            {entry.address && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Address:</span>
                                <span className="text-gray-900">{entry.address}</span>
                              </div>
                            )}
                            {entry.phone && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="text-gray-900">{entry.phone}</span>
                              </div>
                            )}
                            {entry.email && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="text-gray-900">{entry.email}</span>
                              </div>
                            )}
                            {entry.organization && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Organization:</span>
                                <span className="text-gray-900">{entry.organization}</span>
                              </div>
                            )}
                            {entry.position && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Position:</span>
                                <span className="text-gray-900">{entry.position}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Management</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Added Date:</span>
                              <span className="text-gray-900">{entry.addedDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Updated:</span>
                              <span className="text-gray-900">{entry.lastUpdated}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Next Review:</span>
                              <span className="text-gray-900">{entry.nextReview}</span>
                            </div>
                            {entry.assignedTo && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Assigned To:</span>
                                <span className="text-gray-900">{entry.assignedTo}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Aliases */}
                      {entry.aliases.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Aliases ({entry.aliases.length})</h5>
                          <div className="flex flex-wrap gap-2">
                            {entry.aliases.map((alias, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                {alias}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Documents */}
                      {entry.documents.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Documents ({entry.documents.length})</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {entry.documents.map((doc) => (
                              <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{doc.number}</p>
                                    <p className="text-xs text-gray-500 capitalize">{doc.type.replace('-', ' ')}</p>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  doc.status === 'valid' ? 'text-green-600 bg-green-100' :
                                  doc.status === 'expired' ? 'text-orange-600 bg-orange-100' :
                                  doc.status === 'revoked' ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'
                                }`}>
                                  {doc.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Matches */}
                      {entry.matches.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Matches ({entry.matches.length})</h5>
                          <div className="space-y-3">
                            {entry.matches.map((match) => (
                              <div key={match.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{match.customerName}</p>
                                  <p className="text-xs text-gray-500">
                                    {match.matchType} match • {match.confidence}% confidence • {match.matchedFields.join(', ')}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchStatusColor(match.status)}`}>
                                    {match.status}
                                  </span>
                                  {match.reviewedBy && (
                                    <p className="text-xs text-gray-500 mt-1">Reviewed by: {match.reviewedBy}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {entry.notes && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Notes</h5>
                          <p className="text-sm text-gray-900">{entry.notes}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-3 pt-4 border-t border-gray-200">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          <Edit className="w-4 h-4 mr-2 inline" />
                          Edit Entry
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2 inline" />
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Watchlist Matches</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Watchlist Entry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detected
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {watchlistEntries.flatMap(e => e.matches.map(match => ({ ...match, entryName: e.name, entryCategory: e.category }))).map((match) => (
                    <tr key={match.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{match.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{match.entryName}</div>
                          <div className="text-sm text-gray-500">{match.entryCategory.toUpperCase()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {match.matchType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {match.confidence}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchStatusColor(match.status)}`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {match.detectedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Review
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
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

      {activeTab === 'screening' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Screening Results</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Screening Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Screened
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {screeningResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {result.screeningType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScreeningStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.confidence}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.screenedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
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

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Match trends chart will be displayed here</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">False Positive Rate</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">False positive analysis will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WatchlistManagement
