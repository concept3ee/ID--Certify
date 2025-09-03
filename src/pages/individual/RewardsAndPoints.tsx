import React, { useState } from 'react'
import { 
  Gift, 
  Star, 
  Trophy, 
  Target, 
  TrendingUp, 
  Download, 
  Plus, 
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  X,
  Award,
  Zap,
  Users,
  BarChart3
} from 'lucide-react'

interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  category: 'service' | 'discount' | 'feature' | 'badge'
  isAvailable: boolean
  isRedeemed: boolean
  redemptionDate?: string
}

interface PointTransaction {
  id: string
  type: 'earned' | 'spent' | 'bonus' | 'expired'
  amount: number
  description: string
  date: string
  balance: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  pointsReward: number
  isUnlocked: boolean
  unlockDate?: string
  progress: number
  target: number
}

const RewardsAndPoints = () => {
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Premium Verification',
      description: 'Upgrade to premium verification service',
      pointsCost: 5000,
      category: 'service',
      isAvailable: true,
      isRedeemed: false
    },
    {
      id: '2',
      name: '20% Service Discount',
      description: 'Get 20% off your next service',
      pointsCost: 2000,
      category: 'discount',
      isAvailable: true,
      isRedeemed: false
    },
    {
      id: '3',
      name: 'Priority Support',
      description: 'Access to priority customer support',
      pointsCost: 1500,
      category: 'feature',
      isAvailable: true,
      isRedeemed: false
    },
    {
      id: '4',
      name: 'Trust Badge',
      description: 'Exclusive trust verification badge',
      pointsCost: 3000,
      category: 'badge',
      isAvailable: true,
      isRedeemed: false
    }
  ])

  const [pointTransactions] = useState<PointTransaction[]>([
    {
      id: '1',
      type: 'earned',
      amount: 1000,
      description: 'Completed identity verification',
      date: '2024-01-20T10:30:00Z',
      balance: 1000
    },
    {
      id: '2',
      type: 'earned',
      amount: 500,
      description: 'Document verification bonus',
      date: '2024-01-19T15:45:00Z',
      balance: 1500
    },
    {
      id: '3',
      type: 'earned',
      amount: 200,
      description: 'Daily login streak',
      date: '2024-01-18T09:15:00Z',
      balance: 1700
    },
    {
      id: '4',
      type: 'spent',
      amount: -300,
      description: 'Redeemed service discount',
      date: '2024-01-17T14:20:00Z',
      balance: 1400
    }
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'Verification Master',
      description: 'Complete 10 verifications',
      icon: '🏆',
      pointsReward: 1000,
      isUnlocked: true,
      unlockDate: '2024-01-15T12:00:00Z',
      progress: 10,
      target: 10
    },
    {
      id: '2',
      name: 'Document Collector',
      description: 'Upload 5 different document types',
      icon: '📄',
      pointsReward: 500,
      isUnlocked: false,
      progress: 3,
      target: 5
    },
    {
      id: '3',
      name: 'Trust Builder',
      description: 'Maintain 90+ trust score for 30 days',
      icon: '⭐',
      pointsReward: 800,
      isUnlocked: false,
      progress: 15,
      target: 30
    },
    {
      id: '4',
      name: 'Referral Champion',
      description: 'Refer 5 new users',
      icon: '👥',
      pointsReward: 1200,
      isUnlocked: false,
      progress: 2,
      target: 5
    }
  ])

  const [currentPoints, setCurrentPoints] = useState(1400)
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)

  const handleRedeemReward = (reward: Reward) => {
    if (currentPoints >= reward.pointsCost) {
      setSelectedReward(reward)
      setShowRedeemModal(true)
    } else {
      alert('Insufficient points to redeem this reward')
    }
  }

  const handleConfirmRedeem = () => {
    if (selectedReward) {
      setCurrentPoints(prev => prev - selectedReward.pointsCost)
      // Update reward status
      alert(`Successfully redeemed ${selectedReward.name}!`)
      setShowRedeemModal(false)
      setSelectedReward(null)
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned': return <Plus className="h-4 w-4 text-green-600" />
      case 'spent': return <X className="h-4 w-4 text-red-600" />
      case 'bonus': return <Gift className="h-4 w-4 text-blue-600" />
      case 'expired': return <Clock className="h-4 w-4 text-gray-600" />
      default: return <Star className="h-4 w-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'text-green-600'
      case 'spent': return 'text-red-600'
      case 'bonus': return 'text-blue-600'
      case 'expired': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service': return 'bg-blue-100 text-blue-800'
      case 'discount': return 'bg-green-100 text-green-800'
      case 'feature': return 'bg-purple-100 text-purple-800'
      case 'badge': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
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
          <h1 className="text-2xl font-bold text-gray-900">Rewards & Points</h1>
          <p className="text-gray-600">Earn points, unlock achievements, and redeem rewards</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export History
          </button>
        </div>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Points</p>
              <p className="text-3xl font-bold text-blue-600">{currentPoints.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earned</p>
              <p className="text-2xl font-bold text-green-600">
                {pointTransactions
                  .filter(t => t.type === 'earned')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-purple-600">
                {achievements.filter(a => a.isUnlocked).length}/{achievements.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rewards Redeemed</p>
              <p className="text-2xl font-bold text-orange-600">
                {rewards.filter(r => r.isRedeemed).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Rewards</h2>
          <p className="text-sm text-gray-600">Redeem your points for exclusive benefits and services</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{reward.name}</h3>
                    <p className="text-sm text-gray-500">{reward.description}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(reward.category)}`}>
                    {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{reward.pointsCost.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Points Required</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleRedeemReward(reward)}
                    disabled={currentPoints < reward.pointsCost}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      currentPoints >= reward.pointsCost
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentPoints >= reward.pointsCost ? 'Redeem Now' : 'Insufficient Points'}
                  </button>
                  
                  <div className="text-xs text-gray-500">
                    {currentPoints >= reward.pointsCost ? 'Available' : `${reward.pointsCost - currentPoints} more needed`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
          <p className="text-sm text-gray-600">Complete challenges to earn points and unlock badges</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{achievement.pointsReward}</div>
                    <div className="text-xs text-gray-500">Points</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {achievement.progress}/{achievement.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {achievement.isUnlocked ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">In Progress</span>
                    </div>
                  )}
                  
                  {achievement.isUnlocked && achievement.unlockDate && (
                    <span className="text-xs text-gray-400">
                      {formatDate(achievement.unlockDate)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Points History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Points History</h2>
          <p className="text-sm text-gray-600">Track your points earnings and spending</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pointTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span className={`text-sm font-medium capitalize ${getTransactionColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === 'earned' ? '+' : ''}{transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowRedeemModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Redeem Reward</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Confirm your reward redemption
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">{selectedReward.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{selectedReward.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Points Cost:</span>
                <span className="text-lg font-bold text-blue-600">{selectedReward.pointsCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Balance:</span>
                <span className="text-lg font-bold text-gray-900">{currentPoints.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Remaining After:</span>
                <span className="text-lg font-bold text-green-600">{(currentPoints - selectedReward.pointsCost).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRedeem}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm Redemption
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RewardsAndPoints
