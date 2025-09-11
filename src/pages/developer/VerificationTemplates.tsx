import React, { useState } from 'react'
import { DeveloperUser, VerificationTemplate, VerificationAnalytics } from '../../types'
import VerificationTemplateBuilder from '../../components/verification/VerificationTemplateBuilder'
import SectionNav from '../../components/ui/SectionNav'
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
  Pause
} from 'lucide-react'

interface VerificationTemplatesProps {
  user: DeveloperUser
}

const VerificationTemplates: React.FC<VerificationTemplatesProps> = ({ user }) => {
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<VerificationTemplate | null>(null)
  const [activeTab, setActiveTab] = useState<'templates' | 'analytics' | 'costs'>('templates')

  // Handle case where user or verificationTemplates might be undefined
  if (!user || !user.verificationTemplates) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your verification templates.</p>
        </div>
      </div>
    )
  }

  const activeTemplates = user.verificationTemplates.filter(t => t.isActive)
  const inactiveTemplates = user.verificationTemplates.filter(t => !t.isActive)

  const handleCreateTemplate = () => {
    setEditingTemplate(null)
    setShowTemplateBuilder(true)
  }

  const handleEditTemplate = (template: VerificationTemplate) => {
    setEditingTemplate(template)
    setShowTemplateBuilder(true)
  }

  const handleSaveTemplate = (templateData: any) => {
    // In real app, this would save to API
    console.log('Saving template:', templateData)
    setShowTemplateBuilder(false)
    setEditingTemplate(null)
  }

  const handleToggleTemplateStatus = (templateId: string) => {
    // In real app, this would update via API
    console.log('Toggling template status:', templateId)
  }

  const handleDeleteTemplate = (templateId: string) => {
    // In real app, this would delete via API
    console.log('Deleting template:', templateId)
  }

  const handleDuplicateTemplate = (template: VerificationTemplate) => {
    // In real app, this would duplicate via API
    console.log('Duplicating template:', template)
  }

  const getRevenueColor = (amount: number) => {
    if (amount > 1000) return 'text-green-600'
    if (amount > 500) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <SectionNav
        title="Verification Templates"
        tabs={[
          { id: 'templates', name: 'Templates', href: '/developer/templates' },
          { id: 'analytics', name: 'Analytics', href: '/developer/analytics' },
          { id: 'costs', name: 'Costs & Revenue', href: '/developer/costs' }
        ]}
        actionButton={
          <button
            onClick={handleCreateTemplate}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        }
      />

      {/* Content */}
      {activeTab === 'templates' && (
        <div className="px-6 space-y-6">
          {/* Active Templates */}
          {activeTemplates.length > 0 && (
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Active Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeTemplates.map((template) => (
                      <div key={template.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-500">{template.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleTemplateStatus(template.id)}
                              className="text-yellow-600 hover:text-yellow-700"
                              title="Pause template"
                            >
                              <Pause className="w-4 h-4" />
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
                              className="text-gray-600 hover:text-gray-700"
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

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Fields</p>
                            <p className="font-medium">{template.fields.length}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Usage</p>
                            <p className="font-medium">{template.usageCount}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Cost per verification</p>
                            <p className="font-medium">${template.costPerVerification}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Revenue</p>
                            <p className="font-medium">${(template.usageCount * template.costPerVerification).toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Created: {new Date(template.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(template.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inactive Templates */}
              {inactiveTemplates.length > 0 && (
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Inactive Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inactiveTemplates.map((template) => (
                      <div key={template.id} className="bg-gray-50 border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-500">{template.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleTemplateStatus(template.id)}
                              className="text-green-600 hover:text-green-700"
                              title="Activate template"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditTemplate(template)}
                              className="text-blue-600 hover:text-blue-700"
                              title="Edit template"
                            >
                              <Edit className="w-4 h-4" />
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

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Fields</p>
                            <p className="font-medium">{template.fields.length}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Usage</p>
                            <p className="font-medium">{template.usageCount}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Cost per verification</p>
                            <p className="font-medium">${template.costPerVerification}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Revenue</p>
                            <p className="font-medium">${(template.usageCount * template.costPerVerification).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTemplates.length === 0 && inactiveTemplates.length === 0 && (
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
                  <p className="text-gray-500 mb-4">Create your first verification template to get started.</p>
                  <button
                    onClick={handleCreateTemplate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Template
                  </button>
                </div>
              )}
            </div>
          )}

      {activeTab === 'analytics' && (
        <div className="px-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Verification Analytics</h2>

              {/* Monthly Stats */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Verifications
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Success Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.verificationAnalytics.monthlyStats.map((stat) => (
                        <tr key={stat.month} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {stat.month}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stat.verifications}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${stat.revenue.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stat.successRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Template Performance */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Template Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Template
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usage Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Success Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Average Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.verificationAnalytics.templatePerformance.map((template) => (
                        <tr key={template.templateId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {template.templateName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {template.usageCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {template.successRate}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${template.averageCost.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

      {activeTab === 'costs' && (
        <div className="px-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Costs & Revenue</h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${user.verificationAnalytics.totalRevenue.toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Cost</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${user.verificationAnalytics.averageCost.toFixed(2)}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Verifications</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {user.verificationAnalytics.totalVerifications}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown by Template</h3>
                <div className="space-y-4">
                  {user.verificationTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-500">{template.usageCount} verifications</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${(template.usageCount * template.costPerVerification).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${template.costPerVerification} per verification
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

      {/* Template Builder Modal */}
      {showTemplateBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <VerificationTemplateBuilder
              template={editingTemplate || undefined}
              onSave={handleSaveTemplate}
              onCancel={() => {
                setShowTemplateBuilder(false)
                setEditingTemplate(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationTemplates
