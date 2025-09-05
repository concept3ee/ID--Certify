import React, { useState } from 'react'
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Target,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Building,
  Globe,
  FileText,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Settings,
  Eye,
  Info,
  Zap,
  Star,
  Award,
  Flag,
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Save,
  Share,
  Copy,
  Maximize2,
  Minimize2,
  Grid,
  Layout,
  Palette,
  Database,
  Cpu,
  Monitor
} from 'lucide-react'

interface Dashboard {
  id: string
  name: string
  description: string
  category: 'compliance' | 'risk' | 'operational' | 'financial' | 'custom'
  widgets: DashboardWidget[]
  isPublic: boolean
  createdBy: string
  lastModified: string
  viewCount: number
  isDefault: boolean
}

interface DashboardWidget {
  id: string
  type: 'metric' | 'chart' | 'table' | 'gauge' | 'map' | 'text'
  title: string
  data: any
  position: { x: number; y: number; w: number; h: number }
  config: any
}

interface KPI {
  id: string
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  percentage: number
  unit: string
  category: string
  description: string
}

interface Report {
  id: string
  name: string
  type: 'scheduled' | 'ad-hoc' | 'real-time'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  lastRun: string
  nextRun: string
  status: 'active' | 'paused' | 'error'
  recipients: string[]
  format: 'pdf' | 'excel' | 'csv' | 'html'
}

const BusinessIntelligence = () => {
  const [activeTab, setActiveTab] = useState<'dashboards' | 'kpis' | 'reports' | 'data-sources' | 'analytics'>('dashboards')
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null)
  const [expandedDashboards, setExpandedDashboards] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Mock data
  const dashboards: Dashboard[] = [
    {
      id: '1',
      name: 'Compliance Executive Dashboard',
      description: 'High-level compliance metrics and trends for executives',
      category: 'compliance',
      widgets: [
        { id: '1-1', type: 'metric', title: 'Overall Compliance Score', data: { value: 87, target: 90 }, position: { x: 0, y: 0, w: 3, h: 2 }, config: {} },
        { id: '1-2', type: 'chart', title: 'Compliance Trends', data: {}, position: { x: 3, y: 0, w: 6, h: 4 }, config: {} }
      ],
      isPublic: true,
      createdBy: 'Sarah Johnson',
      lastModified: '2024-01-20',
      viewCount: 156,
      isDefault: true
    },
    {
      id: '2',
      name: 'Risk Management Dashboard',
      description: 'Comprehensive risk analysis and monitoring',
      category: 'risk',
      widgets: [
        { id: '2-1', type: 'metric', title: 'Critical Risks', data: { value: 12, target: 5 }, position: { x: 0, y: 0, w: 3, h: 2 }, config: {} },
        { id: '2-2', type: 'gauge', title: 'Risk Level', data: { value: 75, max: 100 }, position: { x: 3, y: 0, w: 3, h: 2 }, config: {} }
      ],
      isPublic: false,
      createdBy: 'Mike Chen',
      lastModified: '2024-01-19',
      viewCount: 89,
      isDefault: false
    }
  ]

  const kpis: KPI[] = [
    {
      id: '1',
      name: 'Overall Compliance Score',
      value: 87,
      target: 90,
      trend: 'up',
      percentage: 3.6,
      unit: '%',
      category: 'compliance',
      description: 'Overall compliance score across all frameworks'
    },
    {
      id: '2',
      name: 'Risk Reduction Rate',
      value: 15,
      target: 20,
      trend: 'up',
      percentage: 8.2,
      unit: '%',
      category: 'risk',
      description: 'Percentage reduction in high-risk items'
    },
    {
      id: '3',
      name: 'Report Submission Rate',
      value: 95,
      target: 100,
      trend: 'stable',
      percentage: 0,
      unit: '%',
      category: 'operational',
      description: 'Percentage of reports submitted on time'
    }
  ]

  const reports: Report[] = [
    {
      id: '1',
      name: 'Weekly Compliance Summary',
      type: 'scheduled',
      frequency: 'weekly',
      lastRun: '2024-01-20',
      nextRun: '2024-01-27',
      status: 'active',
      recipients: ['executives@company.com', 'compliance@company.com'],
      format: 'pdf'
    },
    {
      id: '2',
      name: 'Monthly Risk Report',
      type: 'scheduled',
      frequency: 'monthly',
      lastRun: '2024-01-01',
      nextRun: '2024-02-01',
      status: 'active',
      recipients: ['risk@company.com'],
      format: 'excel'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compliance': return 'text-blue-600 bg-blue-100'
      case 'risk': return 'text-red-600 bg-red-100'
      case 'operational': return 'text-green-600 bg-green-100'
      case 'financial': return 'text-yellow-600 bg-yellow-100'
      case 'custom': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return <Shield className="w-5 h-5" />
      case 'risk': return <AlertTriangle className="w-5 h-5" />
      case 'operational': return <Activity className="w-5 h-5" />
      case 'financial': return <Building className="w-5 h-5" />
      case 'custom': return <Settings className="w-5 h-5" />
      default: return <BarChart3 className="w-5 h-5" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'paused': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const toggleDashboardExpansion = (dashboardId: string) => {
    const newExpanded = new Set(expandedDashboards)
    if (newExpanded.has(dashboardId)) {
      newExpanded.delete(dashboardId)
    } else {
      newExpanded.add(dashboardId)
    }
    setExpandedDashboards(newExpanded)
  }

  const filteredDashboards = dashboards.filter(dashboard => {
    const matchesSearch = dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dashboard.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || dashboard.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const totalDashboards = dashboards.length
  const publicDashboards = dashboards.filter(d => d.isPublic).length
  const totalViews = dashboards.reduce((sum, d) => sum + d.viewCount, 0)
  const activeReports = reports.filter(r => r.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Intelligence</h1>
          <p className="text-gray-600 mt-1">Custom dashboards, KPIs, and advanced analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Dashboard
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Monitor className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Dashboards</p>
              <p className="text-2xl font-bold text-gray-900">{totalDashboards}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Public Dashboards</p>
              <p className="text-2xl font-bold text-gray-900">{publicDashboards}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Eye className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Reports</p>
              <p className="text-2xl font-bold text-gray-900">{activeReports}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboards', name: 'Dashboards', icon: Monitor },
            { id: 'kpis', name: 'KPIs', icon: Target },
            { id: 'reports', name: 'Reports', icon: FileText },
            { id: 'data-sources', name: 'Data Sources', icon: Database },
            { id: 'analytics', name: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboards' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search dashboards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                <option value="compliance">Compliance</option>
                <option value="risk">Risk</option>
                <option value="operational">Operational</option>
                <option value="financial">Financial</option>
                <option value="custom">Custom</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Dashboards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDashboards.map((dashboard) => (
              <div key={dashboard.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                      {getCategoryIcon(dashboard.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{dashboard.name}</h3>
                      <p className="text-sm text-gray-600">{dashboard.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(dashboard.category)}`}>
                      {dashboard.category}
                    </span>
                    {dashboard.isPublic && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Public
                      </span>
                    )}
                    {dashboard.isDefault && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Widgets</p>
                      <p className="font-medium text-gray-900">{dashboard.widgets.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Views</p>
                      <p className="font-medium text-gray-900">{dashboard.viewCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Created By</p>
                      <p className="font-medium text-gray-900">{dashboard.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Modified</p>
                      <p className="font-medium text-gray-900">{dashboard.lastModified}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                        <Eye className="w-4 h-4 mr-1 inline" />
                        View
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Edit className="w-4 h-4 mr-1 inline" />
                        Edit
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Share className="w-4 h-4 mr-1 inline" />
                        Share
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{kpi.name}</h4>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(kpi.trend)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(kpi.category)}`}>
                        {kpi.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{kpi.value}{kpi.unit}</p>
                        <p className="text-sm text-gray-600">Target: {kpi.target}{kpi.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          kpi.percentage > 0 ? 'text-green-600' :
                          kpi.percentage < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {kpi.percentage > 0 ? '+' : ''}{kpi.percentage}%
                        </p>
                        <p className="text-xs text-gray-500">vs target</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (kpi.value / kpi.target) >= 1 ? 'bg-green-500' : 
                          (kpi.value / kpi.target) >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{kpi.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Run
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Run
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {report.frequency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.lastRun}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.nextRun}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
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

      {activeTab === 'data-sources' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Sources</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Data source management will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Connect and manage data sources for analytics</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Analytics</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Usage analytics will be displayed here</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance metrics will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Dashboard Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New Dashboard</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter dashboard name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter dashboard description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="">Select category</option>
                    <option value="compliance">Compliance</option>
                    <option value="risk">Risk</option>
                    <option value="operational">Operational</option>
                    <option value="financial">Financial</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2 inline" />
                    Create Dashboard
                  </button>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
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

export default BusinessIntelligence
