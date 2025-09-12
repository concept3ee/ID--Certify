import React, { useState } from 'react'
import { DeveloperUser, VerificationTemplate } from '../../types'
import { 
  Plus, 
  Settings, 
  BarChart3, 
  DollarSign, 
  Users, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Download,
  Upload,
  Grid,
  List,
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  Layers,
  FileText,
  Camera,
  Shield,
  Building,
  CreditCard,
  Fingerprint,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ArrowDown
} from 'lucide-react'

interface VerificationTemplatesProps {
  user: DeveloperUser
}

const VerificationTemplates: React.FC<VerificationTemplatesProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'analytics' | 'costs'>('templates')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [showFlowBuilder, setShowFlowBuilder] = useState(false)
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false)
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<VerificationTemplate | null>(null)

  // Ensure verificationTemplates exists, provide empty array as fallback
  const verificationTemplates = user.verificationTemplates || []
  const activeTemplates = verificationTemplates.filter(t => t.isActive)
  const inactiveTemplates = verificationTemplates.filter(t => !t.isActive)

  const filteredTemplates = verificationTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && template.isActive) ||
                         (filterStatus === 'inactive' && !template.isActive)
    return matchesSearch && matchesFilter
  })

  const handleCreateTemplate = () => {
    setEditingTemplate(null)
    setShowTemplateBuilder(true)
  }

  const handleCreateFlow = () => {
    setShowFlowBuilder(true)
  }

  const handleBrowseMarketplace = () => {
    setShowMarketplace(true)
  }

  const handleEditTemplate = (template: VerificationTemplate) => {
    setEditingTemplate(template)
    setShowTemplateBuilder(true)
  }

  const handleSaveTemplate = (templateData: any) => {
    console.log('Saving template:', templateData)
    setShowTemplateBuilder(false)
    setEditingTemplate(null)
  }

  const handleSaveFlow = (flowData: any) => {
    console.log('Saving flow:', flowData)
    setShowFlowBuilder(false)
  }

  const handleTestFlow = (flowData: any) => {
    console.log('Testing flow:', flowData)
  }

  const handleToggleTemplateStatus = (templateId: string) => {
    console.log('Toggling template status:', templateId)
  }

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Deleting template:', templateId)
  }

  const handleDuplicateTemplate = (template: VerificationTemplate) => {
    console.log('Duplicating template:', template)
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Templates</h1>
          <p className="text-gray-600">Create and manage your verification flows</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBrowseMarketplace}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Browse Marketplace</span>
          </button>
          
          <button
            onClick={handleCreateFlow}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Create Flow</span>
          </button>
          
          <button
            onClick={handleCreateTemplate}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Templates</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Templates Content */}
      <div className="space-y-6">
        {filteredTemplates.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredTemplates.map((template) => (
              <div key={template.id} className={`bg-white border rounded-lg hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'p-4 flex items-center justify-between' : 'p-6'
              }`}>
                {viewMode === 'grid' ? (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleTemplateStatus(template.id)}
                          className="text-yellow-600 hover:text-yellow-700"
                          title={template.isActive ? "Pause template" : "Activate template"}
                        >
                          {template.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Edit template"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateTemplate(template)}
                          className="text-green-600 hover:text-green-700"
                          title="Duplicate template"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete template"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Fields:</span>
                        <span className="font-medium">{template.fields.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Usage:</span>
                        <span className="font-medium">{template.usageCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Last Updated:</span>
                        <span className="font-medium">{new Date(template.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{template.fields.length} fields</span>
                        <span>{template.usageCount} uses</span>
                        <span>Updated {new Date(template.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleTemplateStatus(template.id)}
                        className="text-yellow-600 hover:text-yellow-700"
                        title={template.isActive ? "Pause template" : "Activate template"}
                      >
                        {template.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Edit template"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateTemplate(template)}
                        className="text-green-600 hover:text-green-700"
                        title="Duplicate template"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No templates found' : 'No templates yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? 'Try adjusting your search or filters'
                : 'Create your first verification template to get started.'
              }
            </p>
            {!searchQuery && (
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={handleCreateTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Template
                </button>
                <button
                  onClick={handleBrowseMarketplace}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Browse Marketplace
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showFlowBuilder && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Visual Flow Builder</h1>
            <button
              onClick={() => setShowFlowBuilder(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Flow Builder</h3>
              <p className="text-gray-500">Drag and drop interface coming soon</p>
            </div>
          </div>
        </div>
      )}

      {showTemplateBuilder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTemplate ? 'Edit Template' : 'Create New Template'}
              </h2>
              <button
                onClick={() => setShowTemplateBuilder(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                <input
                  type="text"
                  defaultValue={editingTemplate?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter template name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  defaultValue={editingTemplate?.description || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter template description"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowTemplateBuilder(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingTemplate ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMarketplace && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Template Marketplace</h2>
              <button
                onClick={() => setShowMarketplace(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Basic Identity Verification', description: 'Standard identity verification flow', category: 'Identity', rating: 4.8, downloads: 1250, price: 0 },
                { name: 'Enhanced KYC Flow', description: 'Comprehensive KYC verification process', category: 'KYC', rating: 4.9, downloads: 890, price: 25 },
                { name: 'Quick Phone Verification', description: 'Fast phone number verification', category: 'Phone', rating: 4.7, downloads: 2100, price: 0 }
              ].map((template, index) => (
                <div key={index} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {template.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{template.rating}</span>
                      <span className="text-sm text-gray-500">({template.downloads} downloads)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-900">
                        {template.price === 0 ? 'Free' : `$${template.price}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                      {template.price === 0 ? 'Use Template' : 'Purchase'}
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationTemplates