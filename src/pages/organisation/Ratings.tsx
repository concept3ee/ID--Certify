import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Reply,
  Flag,
  MoreVertical,
  Download,
  Share2,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Plus,
  Edit,
  Trash2,
  Send,
  Heart,
  Smile,
  Frown,
  Meh,
  Zap,
  Crown,
  Shield,
  Globe,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  Hash,
  Percent,
  DollarSign,
  Activity,
  Bell,
  Bookmark,
  Copy,
  Link,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface Rating {
  id: string
  customerName: string
  customerEmail: string
  customerAvatar?: string
  overallRating: number
  categoryRatings: {
    service: number
    quality: number
    communication: number
    timeliness: number
    value: number
  }
  reviewText: string
  date: string
  status: 'published' | 'pending' | 'flagged' | 'hidden'
  verified: boolean
  helpful: number
  response?: {
    text: string
    date: string
    responder: string
  }
  tags: string[]
  source: 'website' | 'email' | 'phone' | 'social' | 'survey'
}

interface RatingMetrics {
  overallAverage: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  categoryAverages: {
    service: number
    quality: number
    communication: number
    timeliness: number
    value: number
  }
  trends: {
    period: string
    change: number
    direction: 'up' | 'down' | 'stable'
  }
  responseRate: number
  averageResponseTime: number
}

interface RatingInsight {
  id: string
  type: 'trend' | 'alert' | 'opportunity' | 'achievement'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  date: string
}

const Ratings: React.FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null)
  const [responseText, setResponseText] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Handle URL-based tab navigation
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/reviews')) {
      setActiveTab('reviews')
    } else if (path.includes('/analytics')) {
      setActiveTab('analytics')
    } else if (path.includes('/feedback')) {
      setActiveTab('feedback')
    } else {
      setActiveTab('dashboard')
    }
  }, [location.pathname])

  // Mock data
  const ratingMetrics: RatingMetrics = {
    overallAverage: 4.3,
    totalReviews: 1247,
    ratingDistribution: {
      5: 45,
      4: 35,
      3: 12,
      2: 5,
      1: 3
    },
    categoryAverages: {
      service: 4.4,
      quality: 4.2,
      communication: 4.5,
      timeliness: 4.1,
      value: 4.0
    },
    trends: {
      period: 'Last 30 days',
      change: 0.2,
      direction: 'up'
    },
    responseRate: 78,
    averageResponseTime: 2.4
  }

  const ratings: Rating[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerAvatar: '/api/placeholder/40/40',
      overallRating: 5,
      categoryRatings: {
        service: 5,
        quality: 5,
        communication: 4,
        timeliness: 5,
        value: 4
      },
      reviewText: 'Excellent service! The team was professional, responsive, and delivered exactly what we needed. Highly recommend for any organization looking for reliable verification services.',
      date: '2024-01-15',
      status: 'published',
      verified: true,
      helpful: 12,
      response: {
        text: 'Thank you Sarah! We appreciate your feedback and are thrilled to hear about your positive experience.',
        date: '2024-01-16',
        responder: 'John Smith, Customer Success Manager'
      },
      tags: ['excellent', 'professional', 'recommended'],
      source: 'website'
    },
    {
      id: '2',
      customerName: 'Michael Chen',
      customerEmail: 'm.chen@company.com',
      overallRating: 4,
      categoryRatings: {
        service: 4,
        quality: 4,
        communication: 5,
        timeliness: 3,
        value: 4
      },
      reviewText: 'Good overall experience. The communication was excellent throughout the process. Only minor delay in delivery, but quality was solid.',
      date: '2024-01-14',
      status: 'published',
      verified: true,
      helpful: 8,
      tags: ['good', 'communication', 'delay'],
      source: 'email'
    },
    {
      id: '3',
      customerName: 'Emily Rodriguez',
      customerEmail: 'emily.r@startup.io',
      overallRating: 2,
      categoryRatings: {
        service: 2,
        quality: 3,
        communication: 2,
        timeliness: 1,
        value: 2
      },
      reviewText: 'Disappointed with the service. Multiple delays and poor communication. The final deliverable was okay but not worth the hassle.',
      date: '2024-01-12',
      status: 'published',
      verified: false,
      helpful: 3,
      tags: ['disappointed', 'delays', 'communication'],
      source: 'website'
    },
    {
      id: '4',
      customerName: 'David Kim',
      customerEmail: 'd.kim@enterprise.com',
      overallRating: 5,
      categoryRatings: {
        service: 5,
        quality: 5,
        communication: 5,
        timeliness: 5,
        value: 5
      },
      reviewText: 'Outstanding service from start to finish. The team went above and beyond to meet our requirements. Will definitely use again.',
      date: '2024-01-10',
      status: 'published',
      verified: true,
      helpful: 15,
      response: {
        text: 'Thank you David! We\'re honored by your kind words and look forward to working with you again.',
        date: '2024-01-11',
        responder: 'Lisa Wang, Account Manager'
      },
      tags: ['outstanding', 'exceeded expectations', 'repeat customer'],
      source: 'survey'
    },
    {
      id: '5',
      customerName: 'Anonymous',
      customerEmail: 'anonymous@email.com',
      overallRating: 3,
      categoryRatings: {
        service: 3,
        quality: 3,
        communication: 3,
        timeliness: 3,
        value: 3
      },
      reviewText: 'Average experience. Nothing particularly good or bad to report. Service was adequate.',
      date: '2024-01-08',
      status: 'pending',
      verified: false,
      helpful: 1,
      tags: ['average', 'adequate'],
      source: 'website'
    }
  ]

  const insights: RatingInsight[] = [
    {
      id: '1',
      type: 'trend',
      title: 'Rating Trend Improving',
      description: 'Overall rating has increased by 0.2 points over the last 30 days',
      impact: 'high',
      actionable: false,
      date: '2024-01-15'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Low Response Rate',
      description: 'Response rate to reviews has dropped to 78%, below target of 85%',
      impact: 'medium',
      actionable: true,
      date: '2024-01-14'
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Improve Timeliness Score',
      description: 'Timeliness rating is lowest at 4.1. Focus on delivery speed improvements',
      impact: 'high',
      actionable: true,
      date: '2024-01-13'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'High Communication Rating',
      description: 'Communication score of 4.5 is excellent and above industry average',
      impact: 'medium',
      actionable: false,
      date: '2024-01-12'
    }
  ]

  const filterOptions = [
    { id: 'all', name: 'All Reviews', count: ratings.length },
    { id: 'published', name: 'Published', count: ratings.filter(r => r.status === 'published').length },
    { id: 'pending', name: 'Pending', count: ratings.filter(r => r.status === 'pending').length },
    { id: 'flagged', name: 'Flagged', count: ratings.filter(r => r.status === 'flagged').length },
    { id: 'verified', name: 'Verified', count: ratings.filter(r => r.verified).length },
    { id: 'unverified', name: 'Unverified', count: ratings.filter(r => !r.verified).length }
  ]

  const filteredRatings = ratings.filter(rating => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'verified' && rating.verified) ||
                         (selectedFilter === 'unverified' && !rating.verified) ||
                         rating.status === selectedFilter
    const matchesSearch = rating.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rating.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rating.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'flagged': return 'bg-red-100 text-red-800'
      case 'hidden': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-5 h-5 text-blue-600" />
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-600" />
      case 'opportunity': return <Target className="w-5 h-5 text-yellow-600" />
      case 'achievement': return <Award className="w-5 h-5 text-green-600" />
      default: return <BarChart3 className="w-5 h-5 text-gray-600" />
    }
  }

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleRespondToReview = (rating: Rating) => {
    setSelectedRating(rating)
    setResponseText('')
    setShowResponseModal(true)
  }

  const handleSubmitResponse = () => {
    if (selectedRating && responseText.trim()) {
      // Handle response submission
      setShowResponseModal(false)
      setSelectedRating(null)
      setResponseText('')
      // Show success message
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ratings & Reviews</h1>
              <p className="text-gray-600">Manage customer feedback and ratings</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Overall Rating</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{ratingMetrics.overallAverage}</span>
                  {renderStars(ratingMetrics.overallAverage, 'lg')}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'reviews', label: 'Reviews', icon: MessageCircle },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'feedback', label: 'Feedback', icon: Users }
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
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overall Rating</p>
                    <p className="text-3xl font-bold text-gray-900">{ratingMetrics.overallAverage}</p>
                    <div className="mt-1">
                      {renderStars(ratingMetrics.overallAverage, 'sm')}
                    </div>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    {ratingMetrics.trends.direction === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={ratingMetrics.trends.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {ratingMetrics.trends.change > 0 ? '+' : ''}{ratingMetrics.trends.change}
                    </span>
                    <span className="text-gray-600 ml-1">{ratingMetrics.trends.period}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reviews</p>
                    <p className="text-3xl font-bold text-gray-900">{ratingMetrics.totalReviews.toLocaleString()}</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">All time reviews</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Response Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{ratingMetrics.responseRate}%</p>
                  </div>
                  <Reply className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Reviews responded to</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                    <p className="text-3xl font-bold text-gray-900">{ratingMetrics.averageResponseTime}d</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Days to respond</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(ratingMetrics.ratingDistribution).reverse().map(([rating, count]) => {
                    const percentage = (count / ratingMetrics.totalReviews) * 100
                    return (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900 w-8">{rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(ratingMetrics.categoryAverages).map(([category, rating]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
                      <div className="flex items-center space-x-2">
                        {renderStars(rating, 'sm')}
                        <span className={`text-sm font-medium ${getRatingColor(rating)}`}>
                          {rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Insights & Recommendations</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className={`border-l-4 ${getInsightColor(insight.impact)} pl-4 py-2`}>
                      <div className="flex items-start space-x-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                              insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {insight.impact} impact
                            </span>
                            {insight.actionable && (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                Actionable
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{insight.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {filterOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name} ({option.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>More Filters</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredRatings.map((rating) => (
                <div key={rating.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {rating.customerAvatar ? (
                          <img 
                            src={rating.customerAvatar} 
                            alt={rating.customerName}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <User className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{rating.customerName}</h4>
                          {rating.verified && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(rating.overallRating, 'sm')}
                          <span className="text-sm text-gray-600">{rating.date}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rating.status)}`}>
                            {rating.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{rating.reviewText}</p>

                  {/* Category Ratings */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {Object.entries(rating.categoryRatings).map(([category, score]) => (
                      <div key={category} className="text-center">
                        <p className="text-xs text-gray-600 capitalize mb-1">{category}</p>
                        <div className="flex items-center justify-center space-x-1">
                          {renderStars(score, 'sm')}
                          <span className="text-xs text-gray-900 ml-1">{score}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rating.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Response */}
                  {rating.response ? (
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-blue-900">Response</h5>
                        <span className="text-sm text-blue-700">{rating.response.date}</span>
                      </div>
                      <p className="text-blue-800 mb-2">{rating.response.text}</p>
                      <p className="text-sm text-blue-600">— {rating.response.responder}</p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRespondToReview(rating)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center space-x-1"
                      >
                        <Reply className="w-3 h-3" />
                        <span>Respond</span>
                      </button>
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 flex items-center space-x-1">
                        <Flag className="w-3 h-3" />
                        <span>Flag</span>
                      </button>
                    </div>
                  )}

                  {/* Helpful */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Helpful ({rating.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm">Not helpful</span>
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Source: {rating.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Analytics</h3>
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600">Detailed analytics and reporting features will be available soon.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Management</h3>
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Feedback System Coming Soon</h3>
                <p className="text-gray-600">Advanced feedback management and response tools will be available soon.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Respond to Review</h3>
              <button 
                onClick={() => setShowResponseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900">{selectedRating.customerName}</h4>
                  {renderStars(selectedRating.overallRating, 'sm')}
                </div>
                <p className="text-gray-700 text-sm">{selectedRating.reviewText}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Response
                </label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your response to this review..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowResponseModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitResponse}
                disabled={!responseText.trim()}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ratings
