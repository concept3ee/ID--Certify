import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Search,
  Eye,
  FileText,
  Activity,
  Users,
  Clock,
  Database,
  PieChart,
  LineChart,
  Settings,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  X,
  Check
} from 'lucide-react'

interface HistoricalMetric {
  id: string
  name: string
  value: number
  change: number
  period: string
  trend: 'up' | 'down' | 'stable'
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
  ip: string
  status: 'success' | 'failed' | 'warning'
}

interface DataExport {
  id: string
  name: string
  type: string
  dateRange: string
  status: 'completed' | 'processing' | 'failed'
  downloadUrl?: string
  createdAt: string
}

const HistoricalData: React.FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [searchQuery, setSearchQuery] = useState('')
  const [showExportModal, setShowExportModal] = useState(false)

  // Handle URL-based tab navigation
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/analytics')) {
      setActiveTab('analytics')
    } else if (path.includes('/audit-logs')) {
      setActiveTab('audit-logs')
    } else if (path.includes('/reports')) {
      setActiveTab('reports')
    } else {
      setActiveTab('dashboard')
    }
  }, [location.pathname])

  // Mock data
  const metrics: HistoricalMetric[] = [
    {
      id: '1',
      name: 'Total Verifications',
      value: 1247,
      change: 12.5,
      period: 'Last 30 days',
      trend: 'up'
    },
    {
      id: '2',
      name: 'Active Users',
      value: 89,
      change: -2.3,
      period: 'Last 30 days',
      trend: 'down'
    },
    {
      id: '3',
      name: 'Data Points',
      value: 45678,
      change: 8.7,
      period: 'Last 30 days',
      trend: 'up'
    },
    {
      id: '4',
      name: 'API Calls',
      value: 23456,
      change: 0.0,
      period: 'Last 30 days',
      trend: 'stable'
    }
  ]

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      user: 'john.smith@company.com',
      action: 'Login',
      resource: 'Dashboard',
      details: 'Successful login from Chrome browser',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:10',
      user: 'sarah.johnson@company.com',
      action: 'Export Data',
      resource: 'Historical Data',
      details: 'Exported verification data for Q4 2023',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:45',
      user: 'mike.chen@company.com',
      action: 'Failed Login',
      resource: 'Authentication',
      details: 'Invalid password attempt',
      ip: '192.168.1.102',
      status: 'failed'
    }
  ]

  const dataExports: DataExport[] = [
    {
      id: '1',
      name: 'Q4 2023 Verification Report',
      type: 'CSV',
      dateRange: 'Oct 1 - Dec 31, 2023',
      status: 'completed',
      downloadUrl: '/exports/q4-2023-verifications.csv',
      createdAt: '2024-01-15 10:30:00'
    },
    {
      id: '2',
      name: 'Monthly Analytics Summary',
      type: 'PDF',
      dateRange: 'Dec 1 - Dec 31, 2023',
      status: 'processing',
      createdAt: '2024-01-15 14:25:00'
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Historical Data</h1>
              <p className="text-gray-600">Access and analyze historical data and trends</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button 
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'audit-logs', label: 'Audit Logs', icon: Activity },
              { id: 'reports', label: 'Reports', icon: FileText }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.name}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm">
                      <span className={metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                      <span className="text-gray-600 ml-1">{metric.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Storage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Storage Used</span>
                    <span className="text-sm font-medium text-gray-900">2.4 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Available Space</span>
                    <span className="text-sm font-medium text-gray-900">1.6 GB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {auditLogs.slice(0, 3).map((log) => (
                    <div key={log.id} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 
                        log.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{log.action}</p>
                        <p className="text-xs text-gray-600">{log.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Analytics</h3>
              <div className="text-center py-12">
                <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600">Advanced analytics and data visualization features will be available soon.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit-logs' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search audit logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.resource}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Data Exports</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dataExports.map((export_) => (
                    <div key={export_.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{export_.name}</h4>
                          <p className="text-sm text-gray-600">{export_.type} • {export_.dateRange}</p>
                          <p className="text-xs text-gray-500">Created: {export_.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(export_.status)}`}>
                          {export_.status}
                        </span>
                        {export_.downloadUrl && (
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center space-x-1">
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>CSV</option>
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                  <option>Custom range</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowExportModal(false)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HistoricalData
