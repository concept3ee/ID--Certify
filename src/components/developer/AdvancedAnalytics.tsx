import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Clock, 
  DollarSign, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Save, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Target, 
  Layers, 
  Grid, 
  List, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Desktop, 
  User, 
  UserCheck, 
  UserX, 
  Building, 
  Home, 
  LogIn, 
  LogOut, 
  Fingerprint, 
  Smartphone as Phone, 
  Mail as Email, 
  MessageSquare as Chat, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Globe, 
  Server, 
  Network, 
  Database, 
  HardDrive, 
  Cpu, 
  Wifi, 
  WifiOff, 
  Bell, 
  Mail, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  ExternalLink, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight, 
  Star, 
  Award, 
  Flag, 
  AlertCircle, 
  Check, 
  Minus, 
  MoreHorizontal, 
  MoreVertical,
  Settings,
  Key,
  Lock,
  Unlock
} from 'lucide-react'

interface AnalyticsMetric {
  id: string
  name: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  unit: string
  description: string
  category: 'usage' | 'performance' | 'revenue' | 'security' | 'compliance'
  trend: number[]
  lastUpdated: string
}

interface Report {
  id: string
  name: string
  type: 'usage' | 'performance' | 'security' | 'compliance' | 'custom'
  description: string
  schedule: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'manual'
  recipients: string[]
  lastGenerated: string
  nextGeneration: string
  status: 'active' | 'paused' | 'error'
  format: 'pdf' | 'excel' | 'csv' | 'json'
  filters: any
  metrics: string[]
}

interface Dashboard {
  id: string
  name: string
  description: string
  widgets: Widget[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface Widget {
  id: string
  type: 'chart' | 'metric' | 'table' | 'map' | 'gauge' | 'text'
  title: string
  data: any
  config: any
  position: { x: number; y: number; w: number; h: number }
}

interface AdvancedAnalyticsProps {
  onCreateReport: () => void
  onExportData: (format: string) => void
  onShareDashboard: (dashboard: Dashboard) => void
  onClose: () => void
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({
  onCreateReport,
  onExportData,
  onShareDashboard,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'reports' | 'dashboards' | 'exports' | 'alerts'>('overview')
  const [selectedMetric, setSelectedMetric] = useState<AnalyticsMetric | null>(null)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null)
  const [dateRange, setDateRange] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)

  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [dashboards, setDashboards] = useState<Dashboard[]>([])

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockMetrics: AnalyticsMetric[] = [
      {
        id: '1',
        name: 'Total Verifications',
        value: 15420,
        change: 12.5,
        changeType: 'increase',
        unit: 'verifications',
        description: 'Total number of verifications completed',
        category: 'usage',
        trend: [1200, 1350, 1180, 1420, 1380, 1560, 1542],
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        name: 'Success Rate',
        value: 98.5,
        change: 2.1,
        changeType: 'increase',
        unit: '%',
        description: 'Percentage of successful verifications',
        category: 'performance',
        trend: [96.2, 97.1, 96.8, 97.5, 98.1, 98.3, 98.5],
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '3',
        name: 'Average Processing Time',
        value: 245,
        change: -8.3,
        changeType: 'decrease',
        unit: 'ms',
        description: 'Average time to process a verification',
        category: 'performance',
        trend: [280, 265, 270, 255, 250, 248, 245],
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '4',
        name: 'API Calls',
        value: 25680,
        change: 18.7,
        changeType: 'increase',
        unit: 'calls',
        description: 'Total API calls made',
        category: 'usage',
        trend: [2100, 2250, 2180, 2420, 2380, 2560, 2568],
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '5',
        name: 'Revenue',
        value: 12500,
        change: 15.2,
        changeType: 'increase',
        unit: 'USD',
        description: 'Monthly recurring revenue',
        category: 'revenue',
        trend: [10800, 11200, 11000, 11800, 12000, 12300, 12500],
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '6',
        name: 'Security Score',
        value: 96.8,
        change: 1.2,
        changeType: 'increase',
        unit: '%',
        description: 'Overall security compliance score',
        category: 'security',
        trend: [95.2, 95.8, 95.5, 96.1, 96.3, 96.6, 96.8],
        lastUpdated: '2024-01-20T10:30:00Z'
      }
    ]

    const mockReports: Report[] = [
      {
        id: '1',
        name: 'Monthly Usage Report',
        type: 'usage',
        description: 'Comprehensive monthly usage analytics',
        schedule: 'monthly',
        recipients: ['admin@idcertify.com', 'analytics@idcertify.com'],
        lastGenerated: '2024-01-01T00:00:00Z',
        nextGeneration: '2024-02-01T00:00:00Z',
        status: 'active',
        format: 'pdf',
        filters: { dateRange: '30d', tenant: 'all' },
        metrics: ['verifications', 'api_calls', 'users', 'revenue']
      },
      {
        id: '2',
        name: 'Performance Dashboard',
        type: 'performance',
        description: 'Real-time performance metrics',
        schedule: 'daily',
        recipients: ['ops@idcertify.com'],
        lastGenerated: '2024-01-20T06:00:00Z',
        nextGeneration: '2024-01-21T06:00:00Z',
        status: 'active',
        format: 'excel',
        filters: { dateRange: '24h', metrics: ['response_time', 'success_rate'] },
        metrics: ['response_time', 'success_rate', 'error_rate', 'throughput']
      },
      {
        id: '3',
        name: 'Security Compliance Report',
        type: 'security',
        description: 'Security and compliance audit report',
        schedule: 'quarterly',
        recipients: ['security@idcertify.com', 'compliance@idcertify.com'],
        lastGenerated: '2024-01-01T00:00:00Z',
        nextGeneration: '2024-04-01T00:00:00Z',
        status: 'active',
        format: 'pdf',
        filters: { compliance: ['gdpr', 'ccpa', 'sox'], dateRange: '90d' },
        metrics: ['security_score', 'compliance_rate', 'audit_findings']
      }
    ]

    const mockDashboards: Dashboard[] = [
      {
        id: '1',
        name: 'Executive Dashboard',
        description: 'High-level metrics for executive team',
        widgets: [
          {
            id: '1',
            type: 'metric',
            title: 'Total Revenue',
            data: { value: 12500, change: 15.2 },
            config: { format: 'currency' },
            position: { x: 0, y: 0, w: 3, h: 2 }
          },
          {
            id: '2',
            type: 'chart',
            title: 'Verification Trends',
            data: { type: 'line', data: [1200, 1350, 1180, 1420, 1380, 1560, 1542] },
            config: { chartType: 'line' },
            position: { x: 3, y: 0, w: 6, h: 4 }
          }
        ],
        isPublic: false,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        createdBy: 'admin@idcertify.com'
      },
      {
        id: '2',
        name: 'Operations Dashboard',
        description: 'Real-time operational metrics',
        widgets: [
          {
            id: '3',
            type: 'gauge',
            title: 'System Health',
            data: { value: 98.5, max: 100 },
            config: { color: 'green' },
            position: { x: 0, y: 0, w: 3, h: 3 }
          },
          {
            id: '4',
            type: 'table',
            title: 'Recent Activity',
            data: { rows: [], columns: [] },
            config: { pageSize: 10 },
            position: { x: 3, y: 0, w: 6, h: 4 }
          }
        ],
        isPublic: true,
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-18T09:15:00Z',
        createdBy: 'ops@idcertify.com'
      }
    ]

    setTimeout(() => {
      setMetrics(mockMetrics)
      setReports(mockReports)
      setDashboards(mockDashboards)
      setIsLoading(false)
    }, 1000)
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'usage':
        return <Activity className="h-5 w-5 text-blue-600" />
      case 'performance':
        return <BarChart3 className="h-5 w-5 text-green-600" />
      case 'revenue':
        return <DollarSign className="h-5 w-5 text-yellow-600" />
      case 'security':
        return <Shield className="h-5 w-5 text-red-600" />
      case 'compliance':
        return <CheckCircle className="h-5 w-5 text-purple-600" />
      default:
        return <BarChart3 className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    }
    if (unit === '%') {
      return `${value.toFixed(1)}%`
    }
    if (unit === 'ms') {
      return `${value}ms`
    }
    return value.toLocaleString()
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Advanced Analytics</h1>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Analytics
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button
            onClick={() => onExportData('csv')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={() => onCreateReport()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create Report</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Tabs */}
            <div className="space-y-2">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'metrics', name: 'Metrics', icon: TrendingUp },
                { id: 'reports', name: 'Reports', icon: FileText },
                { id: 'dashboards', name: 'Dashboards', icon: Monitor },
                { id: 'exports', name: 'Data Exports', icon: Download },
                { id: 'alerts', name: 'Alerts', icon: Bell }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Plus className="h-4 w-4" />
                  <span>New Dashboard</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                  <FileText className="h-4 w-4" />
                  <span>Schedule Report</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Download className="h-4 w-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Analytics Overview</h2>
                <p className="text-gray-600">
                  Comprehensive analytics and insights for your verification platform.
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.slice(0, 6).map((metric) => (
                  <div
                    key={metric.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedMetric(metric)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getCategoryIcon(metric.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                          <p className="text-sm text-gray-600">{metric.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {formatValue(metric.value, metric.unit)}
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${getChangeColor(metric.changeType)}`}>
                        {getChangeIcon(metric.changeType)}
                        <span>{Math.abs(metric.change)}% from last period</span>
                      </div>
                    </div>
                    
                    <div className="h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-xs text-gray-500">Trend chart would be displayed here</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Reports */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{report.name}</p>
                          <p className="text-xs text-gray-600">
                            Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <span className="text-xs text-gray-500">{report.format.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h2>
                <p className="text-gray-600">
                  Detailed metrics and KPIs for monitoring platform performance.
                </p>
              </div>

              {/* Metrics List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-600">Loading metrics...</span>
                  </div>
                ) : (
                  metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedMetric(metric)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getCategoryIcon(metric.category)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                            <p className="text-sm text-gray-600">{metric.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatValue(metric.value, metric.unit)}
                          </div>
                          <div className={`flex items-center justify-end space-x-1 text-sm ${getChangeColor(metric.changeType)}`}>
                            {getChangeIcon(metric.changeType)}
                            <span>{Math.abs(metric.change)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-sm text-gray-500">Detailed trend chart would be displayed here</div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          Last updated: {new Date(metric.lastUpdated).toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Reports</h2>
                <p className="text-gray-600">
                  Manage automated reports and analytics delivery.
                </p>
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                          <p className="text-sm text-gray-600">{report.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                          {report.format.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Schedule</p>
                        <p className="text-sm font-medium text-gray-900 capitalize">{report.schedule}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Recipients</p>
                        <p className="text-sm font-medium text-gray-900">{report.recipients.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Generation</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(report.nextGeneration).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Play className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dashboards' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Dashboards</h2>
                <p className="text-gray-600">
                  Create and manage custom analytics dashboards.
                </p>
              </div>

              {/* Dashboards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboards.map((dashboard) => (
                  <div
                    key={dashboard.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedDashboard(dashboard)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Monitor className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{dashboard.name}</h3>
                          <p className="text-sm text-gray-600">{dashboard.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {dashboard.isPublic ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                            Public
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                            Private
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Widgets</p>
                        <p className="text-sm font-medium text-gray-900">{dashboard.widgets.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created By</p>
                        <p className="text-sm font-medium text-gray-900">{dashboard.createdBy}</p>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-sm text-gray-500">Dashboard preview would be displayed here</div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Updated: {new Date(dashboard.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onShareDashboard(dashboard)
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdvancedAnalytics
