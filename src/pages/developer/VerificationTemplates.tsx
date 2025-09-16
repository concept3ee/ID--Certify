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
  const verificationTemplates = user?.verificationTemplates || []
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

      {/* Flow Builder Modal */}
      {showFlowBuilder && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Visual Flow Builder</h1>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Flow name"
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Flow description"
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleTestFlow}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Test Flow</span>
              </button>
              
              <button
                onClick={handleSaveFlow}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Save Flow</span>
              </button>
              
              <button
                onClick={() => setShowFlowBuilder(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Node Palette */}
            <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Steps</h3>
              <div className="space-y-2">
                {[
                  { type: 'document-upload', title: 'Document Upload', description: 'Collect and verify identity documents', icon: FileText, color: 'bg-blue-500' },
                  { type: 'face-match', title: 'Face Matching', description: 'Match face with document photo', icon: Camera, color: 'bg-green-500' },
                  { type: 'liveness-check', title: 'Liveness Detection', description: 'Verify the person is real and present', icon: Eye, color: 'bg-purple-500' },
                  { type: 'data-collection', title: 'Data Collection', description: 'Collect additional user information', icon: Users, color: 'bg-orange-500' },
                  { type: 'approval', title: 'Manual Approval', description: 'Human review and approval step', icon: CheckCircle, color: 'bg-yellow-500' },
                  { type: 'conditional', title: 'Conditional Logic', description: 'Branch based on conditions', icon: Target, color: 'bg-indigo-500' },
                  { type: 'webhook', title: 'Webhook', description: 'Send data to external service', icon: Zap, color: 'bg-red-500' },
                  { type: 'notification', title: 'Notification', description: 'Send notification to user', icon: Mail, color: 'bg-teal-500' }
                ].map((nodeType) => {
                  const Icon = nodeType.icon
                  return (
                    <div
                      key={nodeType.type}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify(nodeType))
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${nodeType.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{nodeType.title}</h4>
                          <p className="text-sm text-gray-500">{nodeType.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 relative bg-gray-50 overflow-hidden">
              <div className="w-full h-full p-6">
                {/* Flow Canvas */}
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[500px] relative">
                  {/* Start Node */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span className="font-medium">Start</span>
                    </div>
                  </div>

                  {/* Sample Flow Nodes */}
                  <div className="absolute top-20 left-1/4">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">Document Upload</span>
                    </div>
                  </div>

                  <div className="absolute top-20 right-1/4">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <span className="font-medium">Face Matching</span>
                    </div>
                  </div>

                  <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">Liveness Check</span>
                    </div>
                  </div>

                  <div className="absolute top-60 left-1/3">
                    <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Manual Approval</span>
                    </div>
                  </div>

                  <div className="absolute top-60 right-1/3">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">Webhook</span>
                    </div>
                  </div>

                  {/* End Node */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">End</span>
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Start to Document Upload */}
                    <line x1="50%" y1="60" x2="25%" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Start to Face Matching */}
                    <line x1="50%" y1="60" x2="75%" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Document Upload to Liveness */}
                    <line x1="25%" y1="140" x2="50%" y2="200" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Face Matching to Liveness */}
                    <line x1="75%" y1="140" x2="50%" y2="200" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Liveness to Manual Approval */}
                    <line x1="50%" y1="240" x2="33%" y2="300" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Liveness to Webhook */}
                    <line x1="50%" y1="240" x2="67%" y2="300" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Manual Approval to End */}
                    <line x1="33%" y1="340" x2="50%" y2="400" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Webhook to End */}
                    <line x1="67%" y1="340" x2="50%" y2="400" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Arrow marker definition */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>
                  </svg>

                  {/* Drop Zone Overlay */}
                  <div 
                    className="absolute inset-0 bg-transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      const nodeData = JSON.parse(e.dataTransfer.getData('application/json'))
                      console.log('Dropped node:', nodeData)
                    }}
                  />
                </div>

                {/* Flow Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                      <Grid className="h-4 w-4 inline mr-1" />
                      Snap to Grid
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                      <Target className="h-4 w-4 inline mr-1" />
                      Auto Layout
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                      <Eye className="h-4 w-4 inline mr-1" />
                      Preview
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Zoom:</span>
                    <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">-</button>
                    <span className="text-sm text-gray-700">100%</span>
                    <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Builder Modal */}
      {showTemplateBuilder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost per Verification</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            defaultValue={editingTemplate?.costPerVerification || 15}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="15.00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Identity Verification</option>
                          <option>KYC Process</option>
                          <option>Phone Verification</option>
                          <option>Document Verification</option>
                          <option>Biometric Verification</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Steps */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Verification Steps</h3>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                      <Plus className="h-4 w-4 inline mr-1" />
                      Add Step
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Document Upload', type: 'document_upload', required: true },
                      { name: 'Selfie Capture', type: 'selfie', required: true },
                      { name: 'Liveness Check', type: 'liveness', required: false },
                      { name: 'Manual Review', type: 'manual_review', required: false }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{step.name}</h4>
                            <p className="text-sm text-gray-500">{step.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            step.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {step.required ? 'Required' : 'Optional'}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Auto-approve on success</h4>
                        <p className="text-sm text-gray-500">Automatically approve when all checks pass</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Require manual review</h4>
                        <p className="text-sm text-gray-500">Always require human approval</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (seconds)</label>
                      <input
                        type="number"
                        defaultValue={300}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview & Actions */}
              <div className="space-y-6">
                {/* Preview */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                  <div className="bg-white border rounded-lg p-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Identity Verification</h4>
                      <p className="text-sm text-gray-500 mb-4">Standard identity verification flow</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Steps:</span>
                          <span className="font-medium">4</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Cost:</span>
                          <span className="font-medium">$15.00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Status:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      <Eye className="h-4 w-4 inline mr-2" />
                      Preview Flow
                    </button>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      <Play className="h-4 w-4 inline mr-2" />
                      Test Template
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      <Download className="h-4 w-4 inline mr-2" />
                      Export Template
                    </button>
                  </div>
                </div>

                {/* Save Actions */}
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleSaveTemplate}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingTemplate ? 'Update Template' : 'Create Template'}
                  </button>
                  <button
                    onClick={() => setShowTemplateBuilder(false)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
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