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
  Layers
} from 'lucide-react'

interface VerificationTemplatesProps {
  user: DeveloperUser
}

const VerificationTemplates: React.FC<VerificationTemplatesProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'analytics' | 'costs'>('templates')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

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
            onClick={() => console.log('Browse marketplace')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Browse Marketplace</span>
          </button>
          
          <button
            onClick={() => console.log('Create flow')}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Create Flow</span>
          </button>
          
          <button
            onClick={() => console.log('Create template')}
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

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'costs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Costs & Revenue
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Templates Grid/List */}
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
                            onClick={() => console.log('Toggle status:', template.id)}
                            className="text-yellow-600 hover:text-yellow-700"
                            title={template.isActive ? "Pause template" : "Activate template"}
                          >
                            {template.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => console.log('Edit template:', template.id)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit template"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => console.log('Duplicate template:', template.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Duplicate template"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => console.log('Delete template:', template.id)}
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
                            onClick={() => console.log('View details:', template.id)}
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
                          onClick={() => console.log('Toggle status:', template.id)}
                          className="text-yellow-600 hover:text-yellow-700"
                          title={template.isActive ? "Pause template" : "Activate template"}
                        >
                          {template.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => console.log('Edit template:', template.id)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Edit template"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => console.log('Duplicate template:', template.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Duplicate template"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => console.log('Delete template:', template.id)}
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
                    onClick={() => console.log('Create template')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Template
                  </button>
                  <button
                    onClick={() => console.log('Browse marketplace')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Browse Marketplace
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Verification Analytics</h2>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Verifications</dt>
                    <dd className="text-lg font-medium text-gray-900">{user.verificationAnalytics.totalVerifications}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Success Rate</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {user.verificationAnalytics.totalVerifications > 0 
                        ? Math.round((user.verificationAnalytics.successfulVerifications / user.verificationAnalytics.totalVerifications) * 100)
                        : 0}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Processing Time</dt>
                    <dd className="text-lg font-medium text-gray-900">2.3s</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">${user.verificationAnalytics.totalRevenue}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'costs' && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Costs & Revenue</h2>

          {/* Cost Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">${user.verificationAnalytics.totalRevenue}</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">$6,150</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Cost per Verification</dt>
                    <dd className="text-lg font-medium text-gray-900">$14.80</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown by Template</h3>
            <div className="space-y-4">
              {verificationTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500">{template.usageCount} verifications</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${(template.usageCount * template.costPerVerification).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${template.costPerVerification} per verification</p>
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