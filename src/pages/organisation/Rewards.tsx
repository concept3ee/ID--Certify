import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Gift,
  Star,
  Trophy,
  Award,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Plus,
  Filter,
  Search,
  ShoppingCart,
  CreditCard,
  GiftIcon,
  Coins,
  Zap,
  Crown,
  Heart,
  Sparkles,
  DollarSign,
  Percent,
  Tag,
  Eye,
  Download,
  Share2,
  Bell,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  X,
  Check
} from 'lucide-react'

interface Reward {
  id: string
  name: string
  description: string
  category: string
  pointsCost: number
  originalPrice: number
  discount: number
  image: string
  availability: 'available' | 'limited' | 'out_of_stock'
  expiryDate?: string
  tags: string[]
  popularity: number
  rating: number
  reviews: number
}

interface PointTransaction {
  id: string
  type: 'earned' | 'redeemed' | 'expired' | 'bonus'
  amount: number
  description: string
  date: string
  source: string
  status: 'completed' | 'pending' | 'cancelled'
}

interface UserReward {
  id: string
  reward: Reward
  redeemedAt: string
  status: 'active' | 'used' | 'expired'
  expiryDate: string
  code?: string
}

const Rewards: React.FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Handle URL-based tab navigation
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/catalog')) {
      setActiveTab('catalog')
    } else if (path.includes('/transactions')) {
      setActiveTab('transactions')
    } else if (path.includes('/my-rewards')) {
      setActiveTab('my-rewards')
    } else {
      setActiveTab('dashboard')
    }
  }, [location.pathname])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)

  // Mock data
  const userPoints = 12500
  const userLevel = 'Gold'
  const nextLevelPoints = 2000
  const levelProgress = 75

  const categories = [
    { id: 'all', name: 'All Rewards', count: 48 },
    { id: 'gift_cards', name: 'Gift Cards', count: 15 },
    { id: 'experiences', name: 'Experiences', count: 8 },
    { id: 'products', name: 'Products', count: 12 },
    { id: 'services', name: 'Services', count: 7 },
    { id: 'charity', name: 'Charity', count: 6 }
  ]

  const rewards: Reward[] = [
    {
      id: '1',
      name: 'Amazon Gift Card',
      description: 'Redeem for any purchase on Amazon.com',
      category: 'gift_cards',
      pointsCost: 5000,
      originalPrice: 50,
      discount: 0,
      image: '/api/placeholder/200/150',
      availability: 'available',
      tags: ['popular', 'instant'],
      popularity: 95,
      rating: 4.8,
      reviews: 1247
    },
    {
      id: '2',
      name: 'Starbucks Gift Card',
      description: 'Enjoy your favorite coffee and treats',
      category: 'gift_cards',
      pointsCost: 2500,
      originalPrice: 25,
      discount: 0,
      image: '/api/placeholder/200/150',
      availability: 'available',
      tags: ['food', 'instant'],
      popularity: 87,
      rating: 4.6,
      reviews: 892
    },
    {
      id: '3',
      name: 'Premium Software License',
      description: '1-year license for premium productivity software',
      category: 'products',
      pointsCost: 15000,
      originalPrice: 299,
      discount: 50,
      image: '/api/placeholder/200/150',
      availability: 'limited',
      expiryDate: '2024-12-31',
      tags: ['software', 'premium'],
      popularity: 72,
      rating: 4.9,
      reviews: 156
    },
    {
      id: '4',
      name: 'Charity Donation',
      description: 'Donate to your favorite charity',
      category: 'charity',
      pointsCost: 1000,
      originalPrice: 10,
      discount: 0,
      image: '/api/placeholder/200/150',
      availability: 'available',
      tags: ['charity', 'impact'],
      popularity: 65,
      rating: 5.0,
      reviews: 234
    },
    {
      id: '5',
      name: 'Online Course Access',
      description: 'Access to premium online learning platform',
      category: 'services',
      pointsCost: 8000,
      originalPrice: 199,
      discount: 25,
      image: '/api/placeholder/200/150',
      availability: 'available',
      tags: ['education', 'learning'],
      popularity: 78,
      rating: 4.7,
      reviews: 445
    },
    {
      id: '6',
      name: 'Concert Tickets',
      description: 'VIP tickets to upcoming concerts',
      category: 'experiences',
      pointsCost: 20000,
      originalPrice: 500,
      discount: 20,
      image: '/api/placeholder/200/150',
      availability: 'limited',
      expiryDate: '2024-11-30',
      tags: ['entertainment', 'vip'],
      popularity: 89,
      rating: 4.8,
      reviews: 67
    }
  ]

  const recentTransactions: PointTransaction[] = [
    {
      id: '1',
      type: 'earned',
      amount: 500,
      description: 'Completed verification workflow',
      date: '2024-01-15',
      source: 'Workflow Completion',
      status: 'completed'
    },
    {
      id: '2',
      type: 'redeemed',
      amount: -2500,
      description: 'Redeemed Starbucks Gift Card',
      date: '2024-01-14',
      source: 'Reward Redemption',
      status: 'completed'
    },
    {
      id: '3',
      type: 'bonus',
      amount: 1000,
      description: 'Monthly bonus points',
      date: '2024-01-01',
      source: 'Monthly Bonus',
      status: 'completed'
    },
    {
      id: '4',
      type: 'earned',
      amount: 300,
      description: 'Team collaboration bonus',
      date: '2023-12-28',
      source: 'Team Bonus',
      status: 'completed'
    }
  ]

  const userRewards: UserReward[] = [
    {
      id: '1',
      reward: rewards[1], // Starbucks Gift Card
      redeemedAt: '2024-01-14',
      status: 'active',
      expiryDate: '2024-07-14',
      code: 'SBUX-1234-5678'
    }
  ]

  const filteredRewards = rewards.filter(reward => {
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory
    const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100'
      case 'limited': return 'text-yellow-600 bg-yellow-100'
      case 'out_of_stock': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'redeemed': return <ShoppingCart className="w-4 h-4 text-blue-600" />
      case 'bonus': return <Gift className="w-4 h-4 text-purple-600" />
      case 'expired': return <Clock className="w-4 h-4 text-red-600" />
      default: return <Coins className="w-4 h-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'text-green-600'
      case 'redeemed': return 'text-red-600'
      case 'bonus': return 'text-purple-600'
      case 'expired': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const handleRedeemReward = (reward: Reward) => {
    setSelectedReward(reward)
    setShowRedeemModal(true)
  }

  const handleConfirmRedemption = () => {
    // Handle redemption logic here
    setShowRedeemModal(false)
    setSelectedReward(null)
    // Show success message
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rewards & Points</h1>
              <p className="text-gray-600">Earn and redeem points for amazing rewards</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-blue-600">{userPoints.toLocaleString()} pts</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Target },
              { id: 'catalog', label: 'Reward Catalog', icon: Gift },
              { id: 'transactions', label: 'Transactions', icon: TrendingUp },
              { id: 'my-rewards', label: 'My Rewards', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Points Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Points</p>
                    <p className="text-3xl font-bold text-gray-900">{userPoints.toLocaleString()}</p>
                  </div>
                  <Coins className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Level Progress</span>
                    <span className="text-gray-900">{levelProgress}%</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                      style={{ width: `${levelProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {nextLevelPoints.toLocaleString()} points to {userLevel} level
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-3xl font-bold text-green-600">+1,800</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Points earned this month</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Rewards</p>
                    <p className="text-3xl font-bold text-blue-600">{userRewards.length}</p>
                  </div>
                  <Gift className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Rewards ready to use</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.source} • {transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">points</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>View all transactions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <Gift className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Browse Rewards</h4>
                  <p className="text-sm text-gray-600">Explore available rewards</p>
                </button>
                <button 
                  onClick={() => setActiveTab('my-rewards')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <Award className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900">My Rewards</h4>
                  <p className="text-sm text-gray-600">View your redeemed rewards</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <HelpCircle className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-900">How to Earn</h4>
                  <p className="text-sm text-gray-600">Learn about earning points</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search rewards..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={reward.image} 
                      alt={reward.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(reward.availability)}`}>
                        {reward.availability.replace('_', ' ')}
                      </span>
                    </div>
                    {reward.discount > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                          {reward.discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{reward.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {reward.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-lg font-bold text-blue-600">{reward.pointsCost.toLocaleString()} pts</p>
                        {reward.originalPrice > 0 && (
                          <p className="text-sm text-gray-500 line-through">${reward.originalPrice}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{reward.reviews} reviews</p>
                        <p className="text-sm text-gray-600">{reward.popularity}% popular</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={reward.availability === 'out_of_stock' || userPoints < reward.pointsCost}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>
                        {reward.availability === 'out_of_stock' ? 'Out of Stock' : 
                         userPoints < reward.pointsCost ? 'Insufficient Points' : 'Redeem Now'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Point Transactions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.source} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-rewards' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">My Redeemed Rewards</h3>
              </div>
              <div className="p-6">
                {userRewards.length === 0 ? (
                  <div className="text-center py-8">
                    <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards yet</h3>
                    <p className="text-gray-600 mb-4">Start earning points to redeem amazing rewards!</p>
                    <button 
                      onClick={() => setActiveTab('catalog')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Browse Rewards
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userRewards.map((userReward) => (
                      <div key={userReward.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={userReward.reward.image} 
                            alt={userReward.reward.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{userReward.reward.name}</h4>
                            <p className="text-sm text-gray-600">Redeemed on {userReward.redeemedAt}</p>
                            <p className="text-sm text-gray-600">Expires: {userReward.expiryDate}</p>
                            {userReward.code && (
                              <p className="text-sm font-mono text-blue-600">Code: {userReward.code}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            userReward.status === 'active' ? 'bg-green-100 text-green-800' :
                            userReward.status === 'used' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {userReward.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Redemption Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Redemption</h3>
              <button 
                onClick={() => setShowRedeemModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <img 
                src={selectedReward.image} 
                alt={selectedReward.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h4 className="font-medium text-gray-900 mb-2">{selectedReward.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{selectedReward.description}</p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cost:</span>
                  <span className="text-lg font-bold text-blue-600">{selectedReward.pointsCost.toLocaleString()} points</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Your Balance:</span>
                  <span className="text-sm text-gray-900">{userPoints.toLocaleString()} points</span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Remaining:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {(userPoints - selectedReward.pointsCost).toLocaleString()} points
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRedemption}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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

export default Rewards
