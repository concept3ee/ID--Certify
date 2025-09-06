import React, { useState } from 'react'
import { 
  Building,
  Heart,
  GraduationCap,
  Users,
  Shield,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Star,
  Clock,
  Target,
  Zap,
  CheckCircle,
  X,
  ArrowRight,
  Tag,
  TrendingUp,
  BarChart3,
  Activity,
  Settings,
  Copy,
  Edit,
  Trash2,
  MoreVertical,
  ExternalLink,
  BookOpen,
  Award,
  Globe,
  Smartphone,
  Monitor,
  Database,
  Lock,
  Unlock,
  RefreshCw,
  Upload,
  Save,
  Play,
  Pause
} from 'lucide-react'

// Types
interface IndustryTemplate {
  id: string
  name: string
  description: string
  industry: 'financial' | 'healthcare' | 'education' | 'government' | 'retail' | 'manufacturing' | 'technology' | 'legal'
  category: 'compliance' | 'onboarding' | 'verification' | 'approval' | 'document' | 'audit' | 'custom'
  complexity: 'simple' | 'medium' | 'complex'
  estimatedTime: number
  steps: number
  features: string[]
  compliance: string[]
  integrations: string[]
  usage: number
  rating: number
  reviews: number
  lastUpdated: string
  createdBy: string
  tags: string[]
  preview: {
    nodes: number
    connections: number
    automation: number
  }
  pricing: {
    tier: 'free' | 'basic' | 'premium' | 'enterprise'
    cost: number
    currency: string
  }
  requirements: {
    minUsers: number
    permissions: string[]
    integrations: string[]
  }
}

interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  count: number
  color: string
}

const IndustryTemplates: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeIndustry, setActiveIndustry] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [complexityFilter, setComplexityFilter] = useState('all')
  const [pricingFilter, setPricingFilter] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<IndustryTemplate | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  // Template categories
  const categories: TemplateCategory[] = [
    { id: 'all', name: 'All Templates', description: 'Browse all available templates', icon: FileText, count: 24, color: 'bg-gray-500' },
    { id: 'compliance', name: 'Compliance', description: 'Regulatory and compliance workflows', icon: Shield, count: 8, color: 'bg-red-500' },
    { id: 'onboarding', name: 'Onboarding', description: 'Employee and customer onboarding', icon: Users, count: 6, color: 'bg-blue-500' },
    { id: 'verification', name: 'Verification', description: 'Identity and document verification', icon: CheckCircle, count: 5, color: 'bg-green-500' },
    { id: 'approval', name: 'Approval', description: 'Multi-level approval processes', icon: Target, count: 4, color: 'bg-purple-500' },
    { id: 'document', name: 'Document', description: 'Document management workflows', icon: FileText, count: 3, color: 'bg-orange-500' },
    { id: 'audit', name: 'Audit', description: 'Audit and review processes', icon: BarChart3, count: 2, color: 'bg-yellow-500' }
  ]

  // Industry templates
  const templates: IndustryTemplate[] = [
    {
      id: 'fin-1',
      name: 'Banking KYC/AML Workflow',
      description: 'Complete Know Your Customer and Anti-Money Laundering compliance workflow for banking institutions',
      industry: 'financial',
      category: 'compliance',
      complexity: 'complex',
      estimatedTime: 5,
      steps: 8,
      features: ['Automated risk scoring', 'Document verification', 'Sanctions screening', 'PEP screening', 'Transaction monitoring'],
      compliance: ['Basel III', 'FATCA', 'CRS', 'AML/CTF', 'GDPR'],
      integrations: ['SWIFT', 'FICO', 'LexisNexis', 'WorldCheck', 'Banking APIs'],
      usage: 1247,
      rating: 4.9,
      reviews: 89,
      lastUpdated: '2024-01-15',
      createdBy: 'Financial Services Team',
      tags: ['banking', 'kyc', 'aml', 'compliance', 'risk'],
      preview: { nodes: 12, connections: 18, automation: 85 },
      pricing: { tier: 'premium', cost: 299, currency: 'USD' },
      requirements: { minUsers: 10, permissions: ['compliance_officer', 'risk_manager'], integrations: ['banking_system'] }
    },
    {
      id: 'health-1',
      name: 'HIPAA Patient Onboarding',
      description: 'HIPAA-compliant patient registration and verification workflow for healthcare providers',
      industry: 'healthcare',
      category: 'onboarding',
      complexity: 'medium',
      estimatedTime: 3,
      steps: 6,
      features: ['HIPAA compliance', 'Identity verification', 'Insurance verification', 'Medical history collection', 'Consent management'],
      compliance: ['HIPAA', 'HITECH', 'GDPR', 'State privacy laws'],
      integrations: ['EMR systems', 'Insurance APIs', 'Identity providers', 'SMS/Email'],
      usage: 892,
      rating: 4.8,
      reviews: 67,
      lastUpdated: '2024-01-12',
      createdBy: 'Healthcare Solutions',
      tags: ['healthcare', 'hipaa', 'patient', 'onboarding', 'privacy'],
      preview: { nodes: 8, connections: 12, automation: 70 },
      pricing: { tier: 'basic', cost: 149, currency: 'USD' },
      requirements: { minUsers: 5, permissions: ['healthcare_provider', 'privacy_officer'], integrations: ['emr_system'] }
    },
    {
      id: 'edu-1',
      name: 'Student Enrollment Verification',
      description: 'Comprehensive student enrollment and credential verification workflow for educational institutions',
      industry: 'education',
      category: 'verification',
      complexity: 'medium',
      estimatedTime: 2,
      steps: 5,
      features: ['Academic record verification', 'Transcript validation', 'Financial aid verification', 'International student support', 'Document authentication'],
      compliance: ['FERPA', 'GDPR', 'State education laws'],
      integrations: ['Student information systems', 'Financial aid systems', 'International databases', 'Document verification'],
      usage: 634,
      rating: 4.7,
      reviews: 45,
      lastUpdated: '2024-01-10',
      createdBy: 'Education Technology',
      tags: ['education', 'student', 'enrollment', 'verification', 'academic'],
      preview: { nodes: 7, connections: 10, automation: 65 },
      pricing: { tier: 'basic', cost: 99, currency: 'USD' },
      requirements: { minUsers: 3, permissions: ['registrar', 'admissions_officer'], integrations: ['sis_system'] }
    },
    {
      id: 'gov-1',
      name: 'Government Contract Approval',
      description: 'Multi-level approval workflow for government contract processing and compliance',
      industry: 'government',
      category: 'approval',
      complexity: 'complex',
      estimatedTime: 7,
      steps: 10,
      features: ['Multi-level approvals', 'Compliance checks', 'Budget validation', 'Vendor verification', 'Audit trail'],
      compliance: ['FAR', 'DFARS', 'State procurement laws', 'Security clearances'],
      integrations: ['Government databases', 'Budget systems', 'Vendor management', 'Security systems'],
      usage: 423,
      rating: 4.6,
      reviews: 34,
      lastUpdated: '2024-01-08',
      createdBy: 'Government Solutions',
      tags: ['government', 'contracts', 'approval', 'compliance', 'procurement'],
      preview: { nodes: 15, connections: 22, automation: 60 },
      pricing: { tier: 'enterprise', cost: 599, currency: 'USD' },
      requirements: { minUsers: 20, permissions: ['contract_officer', 'comptroller'], integrations: ['government_systems'] }
    },
    {
      id: 'tech-1',
      name: 'Software License Compliance',
      description: 'Automated software license compliance and audit workflow for technology companies',
      industry: 'technology',
      category: 'audit',
      complexity: 'medium',
      estimatedTime: 4,
      steps: 7,
      features: ['License tracking', 'Usage monitoring', 'Compliance reporting', 'Renewal management', 'Cost optimization'],
      compliance: ['Software licensing laws', 'Data protection', 'Export controls'],
      integrations: ['Software asset management', 'IT service management', 'Financial systems', 'Monitoring tools'],
      usage: 567,
      rating: 4.5,
      reviews: 38,
      lastUpdated: '2024-01-05',
      createdBy: 'Technology Solutions',
      tags: ['technology', 'software', 'licensing', 'compliance', 'audit'],
      preview: { nodes: 9, connections: 14, automation: 75 },
      pricing: { tier: 'premium', cost: 199, currency: 'USD' },
      requirements: { minUsers: 8, permissions: ['it_manager', 'compliance_officer'], integrations: ['sam_system'] }
    },
    {
      id: 'retail-1',
      name: 'Vendor Onboarding & Verification',
      description: 'Comprehensive vendor onboarding and verification workflow for retail organizations',
      industry: 'retail',
      category: 'onboarding',
      complexity: 'simple',
      estimatedTime: 2,
      steps: 4,
      features: ['Vendor verification', 'Document collection', 'Compliance checks', 'Payment setup', 'Performance tracking'],
      compliance: ['Consumer protection laws', 'Data privacy', 'Payment card industry'],
      integrations: ['ERP systems', 'Payment processors', 'Document management', 'Communication tools'],
      usage: 789,
      rating: 4.4,
      reviews: 52,
      lastUpdated: '2024-01-03',
      createdBy: 'Retail Solutions',
      tags: ['retail', 'vendor', 'onboarding', 'verification', 'supply_chain'],
      preview: { nodes: 6, connections: 8, automation: 80 },
      pricing: { tier: 'basic', cost: 79, currency: 'USD' },
      requirements: { minUsers: 5, permissions: ['procurement_manager', 'vendor_manager'], integrations: ['erp_system'] }
    }
  ]

  const industries = [
    { id: 'all', name: 'All Industries', icon: Globe },
    { id: 'financial', name: 'Financial Services', icon: Building },
    { id: 'healthcare', name: 'Healthcare', icon: Heart },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'government', name: 'Government', icon: Shield },
    { id: 'technology', name: 'Technology', icon: Monitor },
    { id: 'retail', name: 'Retail', icon: Smartphone },
    { id: 'manufacturing', name: 'Manufacturing', icon: Database },
    { id: 'legal', name: 'Legal', icon: BookOpen }
  ]

  const getIndustryIcon = (industry: string) => {
    const industryData = industries.find(i => i.id === industry)
    return industryData ? industryData.icon : Globe
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'complex': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPricingColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'enterprise': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory
    const matchesIndustry = activeIndustry === 'all' || template.industry === activeIndustry
    const matchesComplexity = complexityFilter === 'all' || template.complexity === complexityFilter
    const matchesPricing = pricingFilter === 'all' || template.pricing.tier === pricingFilter
    return matchesSearch && matchesCategory && matchesIndustry && matchesComplexity && matchesPricing
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Industry Templates</h1>
              <p className="text-gray-600 mt-1">Pre-built workflow templates for different industries and use cases</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Template</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Manage</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-0">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0 overflow-y-auto">
          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                    activeCategory === category.id
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

          {/* Industries */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Industries</h3>
            <div className="space-y-1">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`w-full flex items-center space-x-3 p-2 text-left rounded-lg transition-colors ${
                    activeIndustry === industry.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <industry.icon className="w-4 h-4" />
                  <span className="text-sm">{industry.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
                <select
                  value={complexityFilter}
                  onChange={(e) => setComplexityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="simple">Simple</option>
                  <option value="medium">Medium</option>
                  <option value="complex">Complex</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pricing</label>
                <select
                  value={pricingFilter}
                  onChange={(e) => setPricingFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Tiers</option>
                  <option value="free">Free</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 min-w-0 overflow-hidden">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const IndustryIcon = getIndustryIcon(template.industry)
              
              return (
                <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IndustryIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{template.name}</h3>
                        <p className="text-xs text-gray-600 capitalize">{template.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getComplexityColor(template.complexity)}`}>
                        {template.complexity}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getPricingColor(template.pricing.tier)}`}>
                        {template.pricing.tier}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                  {/* Features */}
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-900 mb-1">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 2).map((feature) => (
                        <span key={feature} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded truncate">
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 2 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          +{template.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{template.steps}</p>
                      <p className="text-xs text-gray-600">Steps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{template.estimatedTime}d</p>
                      <p className="text-xs text-gray-600">Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{template.preview.automation}%</p>
                      <p className="text-xs text-gray-600">Auto</p>
                    </div>
                  </div>

                  {/* Rating and Usage */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium text-gray-900">{template.rating}</span>
                      <span className="text-xs text-gray-500">({template.reviews})</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.usage.toLocaleString()} uses
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">From</span>
                      <span className="text-sm font-bold text-gray-900">
                        ${template.pricing.cost}/{template.pricing.tier === 'free' ? 'free' : 'mo'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSelectedTemplate(template)
                        setShowPreview(true)
                      }}
                      className="flex-1 bg-blue-600 text-white px-2 py-1.5 rounded text-xs hover:bg-blue-700 flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 px-2 py-1.5 rounded text-xs hover:bg-gray-200 flex items-center justify-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>Use</span>
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-2 py-1.5 rounded text-xs hover:bg-gray-200">
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{selectedTemplate.name}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Details */}
              <div>
                <div className="mb-4">
                  <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Industry</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedTemplate.industry}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedTemplate.category}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Complexity</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedTemplate.complexity}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Steps</p>
                      <p className="font-medium text-gray-900">{selectedTemplate.steps}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                  <div className="space-y-2">
                    {selectedTemplate.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Compliance Standards</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedTemplate.compliance.map((standard) => (
                      <span key={standard} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Template Preview */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Workflow Preview</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{selectedTemplate.preview.nodes}</p>
                      <p className="text-sm text-gray-600">Nodes</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{selectedTemplate.preview.connections}</p>
                      <p className="text-sm text-gray-600">Connections</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{selectedTemplate.preview.automation}%</p>
                      <p className="text-sm text-gray-600">Automation</p>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{selectedTemplate.pricing.tier} Plan</p>
                        <p className="text-sm text-gray-600">Starting from</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          ${selectedTemplate.pricing.cost}
                        </p>
                        <p className="text-sm text-gray-600">per month</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>Minimum {selectedTemplate.requirements.minUsers} users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span>Required permissions: {selectedTemplate.requirements.permissions.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Use Template
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                    <Copy className="w-4 h-4" />
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

export default IndustryTemplates
