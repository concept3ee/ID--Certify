import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  Users, 
  TrendingUp,
  Clock,
  Tag,
  Grid,
  List,
  Heart,
  Share2,
  Bookmark,
  CheckCircle,
  Award,
  Zap,
  Shield,
  Building,
  CreditCard,
  UserCheck,
  FileText,
  Camera,
  Globe
} from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: string
  industry: string
  complexity: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  downloads: number
  price: number
  isFree: boolean
  isPremium: boolean
  tags: string[]
  preview: string
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  features: string[]
  estimatedTime: string
  lastUpdated: string
  version: string
  compatibility: string[]
  useCases: string[]
  screenshots: string[]
  documentation: string
  support: boolean
}

interface TemplateMarketplaceProps {
  onSelectTemplate: (template: Template) => void
  onCreateCustom: () => void
}

const TemplateMarketplace: React.FC<TemplateMarketplaceProps> = ({
  onSelectTemplate,
  onCreateCustom
}) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedComplexity, setSelectedComplexity] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockTemplates: Template[] = [
      {
        id: '1',
        name: 'Standard KYC Verification',
        description: 'Complete Know Your Customer verification flow with document upload, face matching, and liveness detection.',
        category: 'kyc',
        industry: 'fintech',
        complexity: 'intermediate',
        rating: 4.8,
        downloads: 15420,
        price: 0,
        isFree: true,
        isPremium: false,
        tags: ['kyc', 'identity', 'compliance', 'fintech'],
        preview: '/templates/kyc-preview.png',
        author: {
          name: 'IDCertify Team',
          avatar: '/avatars/idcertify.png',
          verified: true
        },
        features: [
          'Document upload and validation',
          'Face matching with document photo',
          'Liveness detection',
          'OCR data extraction',
          'Compliance reporting'
        ],
        estimatedTime: '5-10 minutes',
        lastUpdated: '2024-01-15',
        version: '2.1.0',
        compatibility: ['web', 'mobile', 'api'],
        useCases: ['Banking', 'Crypto', 'Lending', 'Insurance'],
        screenshots: ['/screenshots/kyc-1.png', '/screenshots/kyc-2.png'],
        documentation: '/docs/templates/kyc',
        support: true
      },
      {
        id: '2',
        name: 'Employee Onboarding',
        description: 'Comprehensive employee verification flow for HR departments with background checks and document collection.',
        category: 'hr',
        industry: 'enterprise',
        complexity: 'advanced',
        rating: 4.6,
        downloads: 8930,
        price: 299,
        isFree: false,
        isPremium: true,
        tags: ['hr', 'onboarding', 'employee', 'background-check'],
        preview: '/templates/hr-preview.png',
        author: {
          name: 'HR Solutions Inc.',
          avatar: '/avatars/hr-solutions.png',
          verified: true
        },
        features: [
          'Identity verification',
          'Background check integration',
          'Document collection',
          'Reference verification',
          'Compliance tracking'
        ],
        estimatedTime: '15-30 minutes',
        lastUpdated: '2024-01-10',
        version: '1.5.2',
        compatibility: ['web', 'api'],
        useCases: ['HR', 'Recruitment', 'Enterprise'],
        screenshots: ['/screenshots/hr-1.png', '/screenshots/hr-2.png'],
        documentation: '/docs/templates/hr',
        support: true
      },
      {
        id: '3',
        name: 'Quick Identity Check',
        description: 'Lightweight identity verification for quick user registration and account creation.',
        category: 'identity',
        industry: 'general',
        complexity: 'beginner',
        rating: 4.4,
        downloads: 25680,
        price: 0,
        isFree: true,
        isPremium: false,
        tags: ['identity', 'quick', 'registration', 'simple'],
        preview: '/templates/quick-preview.png',
        author: {
          name: 'Dev Community',
          avatar: '/avatars/community.png',
          verified: false
        },
        features: [
          'Basic document upload',
          'Simple face verification',
          'Quick processing',
          'Mobile optimized'
        ],
        estimatedTime: '2-5 minutes',
        lastUpdated: '2024-01-08',
        version: '1.0.0',
        compatibility: ['web', 'mobile'],
        useCases: ['Social Media', 'E-commerce', 'Gaming'],
        screenshots: ['/screenshots/quick-1.png'],
        documentation: '/docs/templates/quick',
        support: false
      },
      {
        id: '4',
        name: 'Healthcare Patient Verification',
        description: 'HIPAA-compliant patient identity verification for healthcare providers and telemedicine platforms.',
        category: 'healthcare',
        industry: 'healthcare',
        complexity: 'advanced',
        rating: 4.9,
        downloads: 5670,
        price: 499,
        isFree: false,
        isPremium: true,
        tags: ['healthcare', 'hipaa', 'patient', 'telemedicine'],
        preview: '/templates/healthcare-preview.png',
        author: {
          name: 'HealthTech Solutions',
          avatar: '/avatars/healthtech.png',
          verified: true
        },
        features: [
          'HIPAA compliance',
          'Patient identity verification',
          'Insurance verification',
          'Medical record access',
          'Telemedicine integration'
        ],
        estimatedTime: '10-20 minutes',
        lastUpdated: '2024-01-12',
        version: '3.0.1',
        compatibility: ['web', 'mobile', 'api'],
        useCases: ['Healthcare', 'Telemedicine', 'Pharmacy'],
        screenshots: ['/screenshots/healthcare-1.png', '/screenshots/healthcare-2.png'],
        documentation: '/docs/templates/healthcare',
        support: true
      },
      {
        id: '5',
        name: 'Crypto Exchange KYC',
        description: 'Advanced KYC flow specifically designed for cryptocurrency exchanges with enhanced security.',
        category: 'crypto',
        industry: 'fintech',
        complexity: 'advanced',
        rating: 4.7,
        downloads: 12340,
        price: 399,
        isFree: false,
        isPremium: true,
        tags: ['crypto', 'exchange', 'kyc', 'aml', 'security'],
        preview: '/templates/crypto-preview.png',
        author: {
          name: 'CryptoCompliance Pro',
          avatar: '/avatars/crypto-pro.png',
          verified: true
        },
        features: [
          'Enhanced KYC/AML',
          'Crypto-specific validations',
          'Risk scoring',
          'Regulatory compliance',
          'Multi-jurisdiction support'
        ],
        estimatedTime: '15-25 minutes',
        lastUpdated: '2024-01-14',
        version: '2.3.0',
        compatibility: ['web', 'mobile', 'api'],
        useCases: ['Crypto Exchange', 'DeFi', 'NFT Marketplace'],
        screenshots: ['/screenshots/crypto-1.png', '/screenshots/crypto-2.png'],
        documentation: '/docs/templates/crypto',
        support: true
      }
    ]

    setTemplates(mockTemplates)
    setFilteredTemplates(mockTemplates)
  }, [])

  useEffect(() => {
    let filtered = templates

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }

    // Industry filter
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(template => template.industry === selectedIndustry)
    }

    // Complexity filter
    if (selectedComplexity !== 'all') {
      filtered = filtered.filter(template => template.complexity === selectedComplexity)
    }

    // Price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(template => template.isFree)
    } else if (priceFilter === 'premium') {
      filtered = filtered.filter(template => !template.isFree)
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    setFilteredTemplates(filtered)
  }, [templates, searchQuery, selectedCategory, selectedIndustry, selectedComplexity, priceFilter, sortBy])

  const categories = [
    { id: 'all', name: 'All Categories', icon: Grid },
    { id: 'kyc', name: 'KYC/AML', icon: Shield },
    { id: 'identity', name: 'Identity', icon: UserCheck },
    { id: 'hr', name: 'HR & Onboarding', icon: Users },
    { id: 'healthcare', name: 'Healthcare', icon: FileText },
    { id: 'crypto', name: 'Crypto', icon: CreditCard },
    { id: 'ecommerce', name: 'E-commerce', icon: Building }
  ]

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'fintech', name: 'Fintech' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'enterprise', name: 'Enterprise' },
    { id: 'general', name: 'General' }
  ]

  const complexities = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ]

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Marketplace</h1>
          <p className="text-gray-600">Choose from pre-built verification flows or create your own</p>
        </div>
        <button
          onClick={onCreateCustom}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Zap className="h-4 w-4" />
          <span>Create Custom Flow</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Industry */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {industries.map(industry => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>

          {/* Complexity */}
          <select
            value={selectedComplexity}
            onChange={(e) => setSelectedComplexity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {complexities.map(complexity => (
              <option key={complexity.id} value={complexity.id}>
                {complexity.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Price Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Price:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid/List */}
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {/* Preview Image */}
            <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'} bg-gray-100 relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Template Preview</p>
                </div>
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {template.isFree && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Free
                  </span>
                )}
                {template.isPremium && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                    Premium
                  </span>
                )}
                <span className={`px-2 py-1 text-xs font-medium rounded ${getComplexityColor(template.complexity)}`}>
                  {template.complexity}
                </span>
              </div>

              {/* Actions */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <button
                  onClick={() => toggleFavorite(template.id)}
                  className={`p-2 rounded-full ${
                    favorites.includes(template.id)
                      ? 'bg-red-100 text-red-600'
                      : 'bg-white text-gray-400 hover:text-red-600'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white text-gray-400 rounded-full hover:text-blue-600">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {template.isFree ? 'Free' : `$${template.price}`}
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-2 mb-3">
                <img
                  src={template.author.avatar}
                  alt={template.author.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600">{template.author.name}</span>
                {template.author.verified && (
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                )}
              </div>

              {/* Rating and Downloads */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(template.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({template.rating})</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Download className="h-4 w-4" />
                  <span>{template.downloads.toLocaleString()}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {template.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{template.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {template.features.length > 3 && (
                    <li className="text-xs text-gray-500">
                      +{template.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Use Template</span>
                </button>
                <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a custom flow.</p>
          <button
            onClick={onCreateCustom}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Custom Flow
          </button>
        </div>
      )}
    </div>
  )
}

export default TemplateMarketplace
