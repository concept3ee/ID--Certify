import React, { useState } from 'react'
import { 
  Search,
  Filter,
  Star,
  Download,
  Upload,
  Share2,
  Eye,
  Heart,
  Bookmark,
  TrendingUp,
  TrendingDown,
  Award,
  Crown,
  Zap,
  Shield,
  Globe,
  Users,
  Building,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  ExternalLink,
  Copy,
  Edit,
  MoreVertical,
  Plus,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Settings,
  Bell,
  FileText,
  Link,
  X,
  Check
} from 'lucide-react'

// Types
interface MarketplaceWorkflow {
  id: string
  name: string
  description: string
  shortDescription: string
  author: {
    name: string
    avatar: string
    verified: boolean
    rating: number
    followers: number
  }
  category: 'business' | 'hr' | 'finance' | 'compliance' | 'marketing' | 'sales' | 'operations' | 'custom'
  industry: string[]
  tags: string[]
  pricing: {
    type: 'free' | 'freemium' | 'paid' | 'subscription'
    amount: number
    currency: string
    period?: string
  }
  features: string[]
  requirements: {
    minUsers: number
    integrations: string[]
    permissions: string[]
  }
  stats: {
    downloads: number
    rating: number
    reviews: number
    lastUpdated: string
    version: string
  }
  screenshots: string[]
  documentation: string
  support: {
    email: string
    documentation: string
    community: string
  }
  license: {
    type: string
    commercial: boolean
    redistribution: boolean
  }
  compatibility: {
    platforms: string[]
    versions: string[]
  }
  status: 'published' | 'draft' | 'archived' | 'featured'
  featured: boolean
  trending: boolean
  new: boolean
  verified: boolean
  createdAt: string
  updatedAt: string
}

interface MarketplaceCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  count: number
  color: string
}

interface MarketplaceReview {
  id: string
  workflowId: string
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  rating: number
  title: string
  comment: string
  helpful: number
  timestamp: string
  version: string
}

const WorkflowMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'featured' | 'trending' | 'new'>('browse')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [selectedWorkflow, setSelectedWorkflow] = useState<MarketplaceWorkflow | null>(null)
  const [showWorkflowDetail, setShowWorkflowDetail] = useState(false)

  // Categories
  const categories: MarketplaceCategory[] = [
    { id: 'all', name: 'All Workflows', description: 'Browse all available workflows', icon: Globe, count: 1247, color: 'bg-gray-500' },
    { id: 'business', name: 'Business', description: 'General business workflows', icon: Building, count: 234, color: 'bg-blue-500' },
    { id: 'hr', name: 'Human Resources', description: 'HR and employee management', icon: Users, count: 189, color: 'bg-green-500' },
    { id: 'finance', name: 'Finance', description: 'Financial and accounting workflows', icon: DollarSign, count: 156, color: 'bg-yellow-500' },
    { id: 'compliance', name: 'Compliance', description: 'Regulatory compliance workflows', icon: Shield, count: 98, color: 'bg-red-500' },
    { id: 'marketing', name: 'Marketing', description: 'Marketing and campaign workflows', icon: TrendingUp, count: 145, color: 'bg-purple-500' },
    { id: 'sales', name: 'Sales', description: 'Sales and customer management', icon: Target, count: 167, color: 'bg-orange-500' },
    { id: 'operations', name: 'Operations', description: 'Operational and process workflows', icon: Settings, count: 203, color: 'bg-indigo-500' }
  ]

  // Mock workflows
  const workflows: MarketplaceWorkflow[] = [
    {
      id: '1',
      name: 'Advanced Employee Onboarding',
      description: 'Comprehensive employee onboarding workflow with document verification, IT setup, and compliance checks. Includes automated notifications, progress tracking, and integration with HR systems.',
      shortDescription: 'Complete employee onboarding with automated verification and setup',
      author: {
        name: 'HR Solutions Pro',
        avatar: '/avatars/hr-pro.jpg',
        verified: true,
        rating: 4.9,
        followers: 1250
      },
      category: 'hr',
      industry: ['Technology', 'Finance', 'Healthcare', 'Education'],
      tags: ['onboarding', 'hr', 'automation', 'compliance', 'verification'],
      pricing: {
        type: 'paid',
        amount: 299,
        currency: 'USD',
        period: 'one-time'
      },
      features: [
        'Automated document verification',
        'IT equipment provisioning',
        'Compliance checklist',
        'Progress tracking',
        'Integration with HR systems',
        'Customizable approval chains',
        'Email notifications',
        'Mobile support'
      ],
      requirements: {
        minUsers: 5,
        integrations: ['HRIS', 'IT Management', 'Email Systems'],
        permissions: ['HR Manager', 'IT Admin', 'Compliance Officer']
      },
      stats: {
        downloads: 2347,
        rating: 4.8,
        reviews: 156,
        lastUpdated: '2024-01-15',
        version: '2.1.0'
      },
      screenshots: ['/screenshots/onboarding-1.jpg', '/screenshots/onboarding-2.jpg'],
      documentation: 'https://docs.example.com/onboarding',
      support: {
        email: 'support@hrsolutions.com',
        documentation: 'https://docs.hrsolutions.com',
        community: 'https://community.hrsolutions.com'
      },
      license: {
        type: 'Commercial',
        commercial: true,
        redistribution: false
      },
      compatibility: {
        platforms: ['Web', 'Mobile', 'Desktop'],
        versions: ['v2.0+', 'v2.1+']
      },
      status: 'published',
      featured: true,
      trending: true,
      new: false,
      verified: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Financial Approval Workflow',
      description: 'Multi-level financial approval system with budget validation, expense tracking, and automated compliance checks. Supports various approval hierarchies and integrates with accounting systems.',
      shortDescription: 'Streamlined financial approvals with budget validation',
      author: {
        name: 'FinanceFlow Inc',
        avatar: '/avatars/finance-flow.jpg',
        verified: true,
        rating: 4.7,
        followers: 890
      },
      category: 'finance',
      industry: ['Finance', 'Banking', 'Insurance', 'Real Estate'],
      tags: ['finance', 'approval', 'budget', 'compliance', 'automation'],
      pricing: {
        type: 'subscription',
        amount: 99,
        currency: 'USD',
        period: 'monthly'
      },
      features: [
        'Multi-level approvals',
        'Budget validation',
        'Expense tracking',
        'Compliance checks',
        'Integration with accounting systems',
        'Real-time notifications',
        'Audit trail',
        'Custom approval rules'
      ],
      requirements: {
        minUsers: 10,
        integrations: ['QuickBooks', 'SAP', 'Oracle'],
        permissions: ['Finance Manager', 'CFO', 'Accountant']
      },
      stats: {
        downloads: 1892,
        rating: 4.6,
        reviews: 98,
        lastUpdated: '2024-01-12',
        version: '1.8.2'
      },
      screenshots: ['/screenshots/finance-1.jpg', '/screenshots/finance-2.jpg'],
      documentation: 'https://docs.financeflow.com',
      support: {
        email: 'support@financeflow.com',
        documentation: 'https://docs.financeflow.com',
        community: 'https://community.financeflow.com'
      },
      license: {
        type: 'Commercial',
        commercial: true,
        redistribution: false
      },
      compatibility: {
        platforms: ['Web', 'Mobile'],
        versions: ['v1.8+']
      },
      status: 'published',
      featured: false,
      trending: true,
      new: false,
      verified: true,
      createdAt: '2023-12-15',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'GDPR Compliance Manager',
      description: 'Complete GDPR compliance workflow with data mapping, consent management, breach notification, and automated compliance reporting. Ensures full regulatory compliance for EU data processing.',
      shortDescription: 'Automated GDPR compliance with data protection controls',
      author: {
        name: 'Compliance Experts',
        avatar: '/avatars/compliance-experts.jpg',
        verified: true,
        rating: 4.9,
        followers: 2100
      },
      category: 'compliance',
      industry: ['Technology', 'Healthcare', 'Finance', 'E-commerce'],
      tags: ['gdpr', 'compliance', 'privacy', 'data-protection', 'automation'],
      pricing: {
        type: 'freemium',
        amount: 0,
        currency: 'USD'
      },
      features: [
        'Data mapping and inventory',
        'Consent management',
        'Breach notification',
        'Compliance reporting',
        'Privacy impact assessments',
        'Data subject rights management',
        'Automated compliance checks',
        'Audit trail'
      ],
      requirements: {
        minUsers: 3,
        integrations: ['CRM', 'Database Systems', 'Email'],
        permissions: ['Data Protection Officer', 'Compliance Manager', 'Legal']
      },
      stats: {
        downloads: 3456,
        rating: 4.9,
        reviews: 234,
        lastUpdated: '2024-01-18',
        version: '3.2.1'
      },
      screenshots: ['/screenshots/gdpr-1.jpg', '/screenshots/gdpr-2.jpg'],
      documentation: 'https://docs.complianceexperts.com/gdpr',
      support: {
        email: 'support@complianceexperts.com',
        documentation: 'https://docs.complianceexperts.com',
        community: 'https://community.complianceexperts.com'
      },
      license: {
        type: 'Open Source',
        commercial: true,
        redistribution: true
      },
      compatibility: {
        platforms: ['Web', 'Mobile', 'Desktop'],
        versions: ['v3.0+']
      },
      status: 'published',
      featured: true,
      trending: false,
      new: false,
      verified: true,
      createdAt: '2023-11-20',
      updatedAt: '2024-01-18'
    }
  ]

  const reviews: MarketplaceReview[] = [
    {
      id: '1',
      workflowId: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg',
        verified: true
      },
      rating: 5,
      title: 'Excellent onboarding solution',
      comment: 'This workflow has streamlined our onboarding process significantly. The automation features save us hours of manual work.',
      helpful: 23,
      timestamp: '2024-01-15T10:30:00Z',
      version: '2.1.0'
    },
    {
      id: '2',
      workflowId: '1',
      author: {
        name: 'Michael Chen',
        avatar: '/avatars/michael.jpg',
        verified: false
      },
      rating: 4,
      title: 'Good but needs customization',
      comment: 'Works well out of the box, but we needed to customize several steps for our specific requirements.',
      helpful: 15,
      timestamp: '2024-01-12T14:20:00Z',
      version: '2.0.5'
    }
  ]

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.icon : Globe
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.color : 'bg-gray-500'
  }

  const getPricingColor = (type: string) => {
    switch (type) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'freemium': return 'bg-blue-100 text-blue-800'
      case 'paid': return 'bg-orange-100 text-orange-800'
      case 'subscription': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      case 'featured': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'free' && workflow.pricing.type === 'free') ||
                        (priceFilter === 'paid' && workflow.pricing.type !== 'free')
    const matchesRating = ratingFilter === 'all' || 
                         (ratingFilter === '4+' && workflow.stats.rating >= 4) ||
                         (ratingFilter === '3+' && workflow.stats.rating >= 3)
    
    let matchesTab = true
    if (activeTab === 'featured') matchesTab = workflow.featured
    if (activeTab === 'trending') matchesTab = workflow.trending
    if (activeTab === 'new') matchesTab = workflow.new
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesTab
  })

  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.stats.downloads - a.stats.downloads
      case 'rating':
        return b.stats.rating - a.stats.rating
      case 'newest':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'price':
        return a.pricing.amount - b.pricing.amount
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Marketplace</h1>
              <p className="text-gray-600 mt-1">Discover, share, and download workflow templates from the community</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Workflow</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'browse', label: 'Browse All', icon: Globe },
              { id: 'featured', label: 'Featured', icon: Star },
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'new', label: 'New', icon: Zap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <p className="text-xs text-gray-600">{category.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Ratings</option>
                  <option value="4+">4+ Stars</option>
                  <option value="3+">3+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {sortedWorkflows.length} workflows found
              </h2>
              <p className="text-sm text-gray-600">
                {selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedWorkflows.map((workflow) => {
              const CategoryIcon = getCategoryIcon(workflow.category)
              const categoryColor = getCategoryColor(workflow.category)
              
              return (
                <div key={workflow.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${categoryColor} rounded-lg flex items-center justify-center`}>
                        <CategoryIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{workflow.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {workflow.featured && <Crown className="w-4 h-4 text-yellow-500" />}
                      {workflow.trending && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {workflow.new && <Zap className="w-4 h-4 text-blue-500" />}
                      {workflow.verified && <Shield className="w-4 h-4 text-blue-500" />}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">{workflow.shortDescription}</p>

                  {/* Author */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">{workflow.author.name}</span>
                    {workflow.author.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{workflow.author.rating}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {workflow.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                      {workflow.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{workflow.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{workflow.stats.downloads.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Downloads</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold text-gray-900">{workflow.stats.rating}</span>
                      </div>
                      <p className="text-xs text-gray-600">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{workflow.stats.reviews}</p>
                      <p className="text-xs text-gray-600">Reviews</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Starting from</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">
                          {workflow.pricing.type === 'free' ? 'Free' : 
                           `$${workflow.pricing.amount}${workflow.pricing.period ? `/${workflow.pricing.period}` : ''}`}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getPricingColor(workflow.pricing.type)}`}>
                          {workflow.pricing.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedWorkflow(workflow)
                        setShowWorkflowDetail(true)
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {sortedWorkflows.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No workflows found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Workflow Detail Modal */}
      {showWorkflowDetail && selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{selectedWorkflow.name}</h2>
              <button
                onClick={() => setShowWorkflowDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{selectedWorkflow.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedWorkflow.category}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Version</p>
                      <p className="font-medium text-gray-900">{selectedWorkflow.stats.version}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Downloads</p>
                      <p className="font-medium text-gray-900">{selectedWorkflow.stats.downloads.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{selectedWorkflow.stats.rating}</span>
                        <span className="text-sm text-gray-600">({selectedWorkflow.stats.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="space-y-2">
                    {selectedWorkflow.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>Minimum {selectedWorkflow.requirements.minUsers} users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span>Required permissions: {selectedWorkflow.requirements.permissions.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link className="w-4 h-4 text-gray-400" />
                      <span>Integrations: {selectedWorkflow.requirements.integrations.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Author */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Author</h3>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{selectedWorkflow.author.name}</span>
                        {selectedWorkflow.author.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{selectedWorkflow.author.rating}</span>
                        </div>
                        <span>{selectedWorkflow.author.followers} followers</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Pricing</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{selectedWorkflow.pricing.type} Plan</p>
                        <p className="text-sm text-gray-600">Starting from</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedWorkflow.pricing.type === 'free' ? 'Free' : 
                           `$${selectedWorkflow.pricing.amount}`}
                        </p>
                        {selectedWorkflow.pricing.period && (
                          <p className="text-sm text-gray-600">per {selectedWorkflow.pricing.period}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Reviews</h3>
                  <div className="space-y-3">
                    {reviews.filter(r => r.workflowId === selectedWorkflow.id).map((review) => (
                      <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{review.author.name}</span>
                          {review.author.verified && <CheckCircle className="w-3 h-3 text-blue-500" />}
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{review.title}</h4>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{new Date(review.timestamp).toLocaleDateString()}</span>
                          <div className="flex items-center space-x-2">
                            <button className="text-xs text-gray-500 hover:text-gray-700">Helpful ({review.helpful})</button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Download Workflow
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                    <Share2 className="w-4 h-4" />
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

export default WorkflowMarketplace
