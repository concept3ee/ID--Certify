import React, { useState } from 'react'
import { 
  Users, 
  Share2, 
  Copy, 
  Link, 
  TrendingUp, 
  Gift, 
  CheckCircle, 
  Clock,
  X,
  Download,
  BarChart3,
  Target,
  Award,
  Mail,
  MessageCircle
} from 'lucide-react'

interface Referral {
  id: string
  name: string
  email: string
  status: 'pending' | 'completed' | 'expired'
  joinDate: string
  completedDate?: string
  reward: number
  isPaid: boolean
}

interface ReferralCampaign {
  id: string
  name: string
  description: string
  reward: number
  requirements: string[]
  isActive: boolean
  startDate: string
  endDate: string
  maxReferrals: number
  currentReferrals: number
}

const Referral = () => {
  const [referrals] = useState<Referral[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'completed',
      joinDate: '2024-01-15T10:30:00Z',
      completedDate: '2024-01-20T14:45:00Z',
      reward: 1000,
      isPaid: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      status: 'pending',
      joinDate: '2024-01-18T15:20:00Z',
      reward: 1000,
      isPaid: false
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      status: 'completed',
      joinDate: '2024-01-12T09:15:00Z',
      completedDate: '2024-01-17T16:30:00Z',
      reward: 1000,
      isPaid: true
    }
  ])

  const [referralCampaigns] = useState<ReferralCampaign[]>([
    {
      id: '1',
      name: 'Winter Referral Bonus',
      description: 'Earn extra rewards for referring friends this winter',
      reward: 1000,
      requirements: ['Friend must complete verification', 'Minimum 30-day retention'],
      isActive: true,
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-03-31T23:59:59Z',
      maxReferrals: 10,
      currentReferrals: 3
    },
    {
      id: '2',
      name: 'Premium Referral Program',
      description: 'Exclusive rewards for premium user referrals',
      reward: 2000,
      requirements: ['Friend must upgrade to premium', 'Complete 3 verifications'],
      isActive: true,
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
      maxReferrals: 5,
      currentReferrals: 1
    }
  ])

  const [referralLink] = useState('https://idcertify.com/ref/JOHN123')
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareMethod, setShareMethod] = useState<'email' | 'social' | 'copy'>('copy')

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    alert('Referral link copied to clipboard!')
  }

  const handleShareViaEmail = () => {
    const subject = 'Join ID Certify - I\'ll get you started!'
    const body = `Hi there!\n\nI thought you might be interested in ID Certify. It's a great platform for identity verification and trust building.\n\nUse my referral link to get started: ${referralLink}\n\nLet me know if you have any questions!`
    
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const handleShareViaSocial = () => {
    const text = `Join ID Certify with my referral link: ${referralLink}`
    const url = referralLink
    
    if (navigator.share) {
      navigator.share({
        title: 'Join ID Certify',
        text: text,
        url: url
      })
    } else {
      // Fallback for browsers that don't support native sharing
      alert('Share this link: ' + referralLink)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'expired': return <X className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
          <p className="text-gray-600">Invite friends and earn rewards together</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Referral
          </button>
        </div>
      </div>

      {/* Referral Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-blue-600">{referrals.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {referrals.filter(r => r.status === 'completed').length}
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
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {referrals.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earned</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(referrals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.reward, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Referral Link</h2>
          <p className="text-sm text-gray-600">Share this link with friends to start earning rewards</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-mono text-gray-900">{referralLink}</span>
              </div>
            </div>
            
            <button
              onClick={handleCopyLink}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            
            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-medium text-blue-900">Refer Friends</h3>
              <p className="text-sm text-blue-600">Share your unique link</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-medium text-green-900">They Join</h3>
              <p className="text-sm text-green-600">Complete verification</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="font-medium text-purple-900">Earn Rewards</h3>
              <p className="text-sm text-purple-600">Get points for both</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Campaigns</h2>
          <p className="text-sm text-gray-600">Current referral programs and their requirements</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {referralCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-500">{campaign.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{formatCurrency(campaign.reward)}</div>
                    <div className="text-xs text-gray-500">Reward per referral</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {campaign.currentReferrals}/{campaign.maxReferrals}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(campaign.currentReferrals / campaign.maxReferrals) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {campaign.requirements.map((requirement, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Valid: {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    campaign.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Referral History</h2>
          <p className="text-sm text-gray-600">Track your referrals and their status</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                        <div className="text-sm text-gray-500">{referral.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(referral.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.status)}`}>
                          {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(referral.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {referral.completedDate ? formatDate(referral.completedDate) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(referral.reward)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        referral.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.isPaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowShareModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Share Your Referral</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Choose how you'd like to share your referral link
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleShareViaEmail}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Share via Email</span>
              </button>
              
              <button
                onClick={handleShareViaSocial}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Share via Social Media</span>
              </button>
              
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Copy className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Copy Link</span>
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Your referral link: <span className="font-mono text-gray-900">{referralLink}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Referral
