import React, { useState } from 'react'
import { 
  Users, 
  Link, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Settings, 
  Copy, 
  ExternalLink,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Eye,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react'

interface Affiliate {
  id: string
  name: string
  email: string
  status: 'active' | 'pending' | 'inactive'
  joinDate: string
  clicks: number
  conversions: number
  earnings: number
  commission: number
  referralCode: string
}

interface AffiliateProgram {
  id: string
  name: string
  description: string
  commission: number
  requirements: string[]
  isActive: boolean
}

const Affiliates = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'active',
      joinDate: '2024-01-15',
      clicks: 1250,
      conversions: 45,
      earnings: 22500,
      commission: 15,
      referralCode: 'JOHN15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'active',
      joinDate: '2024-01-10',
      clicks: 890,
      conversions: 32,
      earnings: 16000,
      commission: 15,
      referralCode: 'SARAH20'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      status: 'pending',
      joinDate: '2024-01-20',
      clicks: 0,
      conversions: 0,
      earnings: 0,
      commission: 15,
      referralCode: 'MIKE25'
    }
  ])

  const [affiliatePrograms] = useState<AffiliateProgram[]>([
    {
      id: '1',
      name: 'Standard Program',
      description: 'Basic affiliate program with 15% commission',
      commission: 15,
      requirements: ['Minimum 100 followers', 'Active social media presence'],
      isActive: true
    },
    {
      id: '2',
      name: 'Premium Program',
      description: 'Advanced program with 20% commission and bonuses',
      commission: 20,
      requirements: ['Minimum 1000 followers', 'Verified account', 'Monthly content creation'],
      isActive: true
    },
    {
      id: '3',
      name: 'Enterprise Program',
      description: 'Exclusive program for influencers and agencies',
      commission: 25,
      requirements: ['Minimum 10000 followers', 'Professional portfolio', 'Contract agreement'],
      isActive: false
    }
  ])

  const [showAddAffiliate, setShowAddAffiliate] = useState(false)
  const [showProgramModal, setShowProgramModal] = useState(false)
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null)

  const handleAddAffiliate = () => {
    setShowAddAffiliate(true)
  }

  const handleEditAffiliate = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate)
    // Handle edit logic
  }

  const handleDeleteAffiliate = (id: string) => {
    if (window.confirm('Are you sure you want to remove this affiliate?')) {
      setAffiliates(prev => prev.filter(affiliate => affiliate.id !== id))
    }
  }

  const handleCopyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert('Referral code copied to clipboard!')
  }

  const handleToggleProgram = (id: string) => {
    // Handle program toggle logic
    console.log('Toggle program:', id)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Calendar className="h-4 w-4 text-yellow-600" />
      case 'inactive': return <X className="h-4 w-4 text-gray-600" />
      default: return <X className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
          <p className="text-gray-600">Manage your affiliate program and partnerships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddAffiliate}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Affiliate
          </button>
        </div>
      </div>

      {/* Affiliate Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
              <p className="text-2xl font-bold text-blue-600">{affiliates.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Affiliates</p>
              <p className="text-2xl font-bold text-green-600">
                {affiliates.filter(a => a.status === 'active').length}
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
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-600">
                {affiliates.reduce((sum, a) => sum + a.clicks, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(affiliates.reduce((sum, a) => sum + a.earnings, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Programs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Affiliate Programs</h2>
              <p className="text-sm text-gray-600">Manage different commission tiers and requirements</p>
            </div>
            <button
              onClick={() => setShowProgramModal(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Create Program
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {affiliatePrograms.map((program) => (
              <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{program.name}</h3>
                    <p className="text-sm text-gray-500">{program.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggleProgram(program.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      program.isActive ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      program.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{program.commission}%</div>
                  <p className="text-sm text-gray-600">Commission Rate</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {program.requirements.map((requirement, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Affiliates List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Affiliate Partners</h2>
          <p className="text-sm text-gray-600">Manage your affiliate relationships and performance</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {affiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                        <div className="text-xs text-gray-400">Joined {formatDate(affiliate.joinDate)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(affiliate.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(affiliate.status)}`}>
                          {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="text-xs text-gray-500">Clicks</div>
                            <div className="font-medium">{affiliate.clicks.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Conversions</div>
                            <div className="font-medium">{affiliate.conversions}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{formatCurrency(affiliate.earnings)}</div>
                        <div className="text-xs text-gray-500">{affiliate.commission}% commission</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {affiliate.referralCode}
                        </span>
                        <button
                          onClick={() => handleCopyReferralCode(affiliate.referralCode)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditAffiliate(affiliate)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAffiliate(affiliate.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
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
      </div>

      {/* Performance Analytics */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Performance Analytics</h2>
          <p className="text-sm text-gray-600">Track affiliate program performance and trends</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Conversion Rates</h3>
              <div className="space-y-3">
                {affiliates.map((affiliate) => (
                  <div key={affiliate.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{affiliate.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(affiliate.conversions / affiliate.clicks) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {affiliate.clicks > 0 ? ((affiliate.conversions / affiliate.clicks) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Earnings Distribution</h3>
              <div className="space-y-3">
                {affiliates.map((affiliate) => (
                  <div key={affiliate.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{affiliate.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(affiliate.earnings)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Affiliates
