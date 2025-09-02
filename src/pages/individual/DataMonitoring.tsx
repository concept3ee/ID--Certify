import { useState } from 'react'

import { 
  Activity, 
  Shield, 
  Eye, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  User,
  Database,
  Lock,
  Unlock,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings,
  Bell,
  Globe,
  Smartphone,
  Monitor,
  Server
} from 'lucide-react'

interface MonitoringEvent {
  id: string
  timestamp: string
  type: 'login' | 'data_access' | 'document_upload' | 'verification' | 'security_alert' | 'privacy_change'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  source: string
  location: string
  ipAddress: string
  userAgent: string
  status: 'resolved' | 'pending' | 'investigating'
  icon: React.ComponentType<{ className?: string }>
}

interface DataUsage {
  category: string
  current: number
  limit: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  lastUpdated: string
}

const DataMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d')

  const monitoringEvents: MonitoringEvent[] = [
    {
      id: '1',
      timestamp: '2024-01-20 14:30:00',
      type: 'login',
      title: 'Successful Login',
      description: 'User logged in from Lagos, Nigeria',
      severity: 'low',
      source: 'Web Browser',
      location: 'Lagos, Nigeria',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'resolved',
      icon: User
    },
    {
      id: '2',
      timestamp: '2024-01-20 10:15:00',
      type: 'data_access',
      title: 'Document Accessed',
      description: 'NIN Slip document was viewed',
      severity: 'low',
      source: 'Web Browser',
      location: 'Lagos, Nigeria',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'resolved',
      icon: Eye
    },
    {
      id: '3',
      timestamp: '2024-01-19 16:45:00',
      type: 'security_alert',
      title: 'Unusual Login Attempt',
      description: 'Failed login attempt from unknown location',
      severity: 'high',
      source: 'Mobile App',
      location: 'Unknown',
      ipAddress: '203.45.67.89',
      userAgent: 'IDCertify/2.1.0 (iOS)',
      status: 'investigating',
      icon: AlertTriangle
    },
    {
      id: '4',
      timestamp: '2024-01-19 09:20:00',
      type: 'document_upload',
      title: 'Document Uploaded',
      description: 'University Certificate uploaded for verification',
      severity: 'low',
      source: 'Web Browser',
      location: 'Lagos, Nigeria',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'resolved',
      icon: Upload
    },
    {
      id: '5',
      timestamp: '2024-01-18 11:30:00',
      type: 'verification',
      title: 'Verification Completed',
      description: 'NIN verification completed successfully',
      severity: 'low',
      source: 'System',
      location: 'System',
      ipAddress: 'System',
      userAgent: 'System',
      status: 'resolved',
      icon: CheckCircle
    }
  ]

  const dataUsage: DataUsage[] = [
    {
      category: 'Document Storage',
      current: 7.2,
      limit: 10,
      unit: 'GB',
      trend: 'up',
      lastUpdated: '2024-01-20'
    },
    {
      category: 'API Calls',
      current: 1250,
      limit: 2000,
      unit: 'calls/month',
      trend: 'stable',
      lastUpdated: '2024-01-20'
    },
    {
      category: 'Verification Requests',
      current: 8,
      limit: 50,
      unit: 'requests/month',
      trend: 'up',
      lastUpdated: '2024-01-20'
    },
    {
      category: 'Data Exports',
      current: 3,
      limit: 10,
      unit: 'exports/month',
      trend: 'down',
      lastUpdated: '2024-01-20'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100'
      case 'high':
        return 'text-orange-600 bg-orange-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'investigating':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'stable':
        return <Clock className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'activity', name: 'Activity Logs', icon: Activity },
    { id: 'security', name: 'Security Events', icon: Shield },
    { id: 'privacy', name: 'Privacy Dashboard', icon: Lock },
    { id: 'usage', name: 'Data Usage', icon: Database }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{monitoringEvents.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Security Alerts</p>
              <p className="text-2xl font-bold text-gray-900">
                {monitoringEvents.filter(event => event.severity === 'high' || event.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {monitoringEvents.filter(event => event.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">7.2/10 GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {monitoringEvents.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-gray-100 rounded-lg">
                <event.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-xs text-gray-600">{event.timestamp}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                {event.severity.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Usage Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Usage Overview</h3>
        <div className="space-y-4">
          {dataUsage.map((usage, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getTrendIcon(usage.trend)}
                <span className="text-sm font-medium text-gray-900">{usage.category}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {usage.current}/{usage.limit} {usage.unit}
                </p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(usage.current / usage.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderActivityLogs = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>All Types</option>
              <option>Login</option>
              <option>Data Access</option>
              <option>Document Upload</option>
              <option>Verification</option>
              <option>Security Alert</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            {(['24h', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  timeRange === range ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Logs</h3>
        <div className="space-y-4">
          {monitoringEvents.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <event.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                    {event.severity.toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Source</p>
                  <p className="font-medium">{event.source}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
                <div>
                  <p className="text-gray-600">IP Address</p>
                  <p className="font-medium">{event.ipAddress}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSecurityEvents = () => (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-gray-900">
                {monitoringEvents.filter(event => event.severity === 'critical').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {monitoringEvents.filter(event => event.severity === 'high').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Protected</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Events</h3>
        <div className="space-y-4">
          {monitoringEvents
            .filter(event => event.severity === 'high' || event.severity === 'critical')
            .map((event) => (
              <div key={event.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                    {event.severity.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Time</p>
                    <p className="font-medium">{event.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Source</p>
                    <p className="font-medium">{event.source}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )

  const renderPrivacyDashboard = () => (
    <div className="space-y-6">
      {/* Privacy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <Eye className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Data Access</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Lock className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Encrypted Data</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Data Sharing</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Profile Visibility</p>
                <p className="text-sm text-gray-600">Control who can see your profile</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Data Retention</p>
                <p className="text-sm text-gray-600">Manage how long your data is stored</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Data Export</p>
                <p className="text-sm text-gray-600">Download your personal data</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDataUsage = () => (
    <div className="space-y-6">
      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h3>
          <div className="space-y-4">
            {dataUsage.slice(0, 2).map((usage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{usage.category}</span>
                  <span className="text-sm text-gray-600">
                    {usage.current}/{usage.limit} {usage.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(usage.current / usage.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Usage</h3>
          <div className="space-y-4">
            {dataUsage.slice(2).map((usage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{usage.category}</span>
                  <span className="text-sm text-gray-600">
                    {usage.current}/{usage.limit} {usage.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(usage.current / usage.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage History</h3>
        <div className="space-y-4">
          {dataUsage.map((usage, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getTrendIcon(usage.trend)}
                <div>
                  <p className="font-medium text-gray-900">{usage.category}</p>
                  <p className="text-sm text-gray-600">Last updated: {usage.lastUpdated}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {usage.current}/{usage.limit} {usage.unit}
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round((usage.current / usage.limit) * 100)}% used
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Section Header Row - Title, Centered Navigation, and Action Button */}
          <div className="flex items-center">
            {/* Left Side - Title Only */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Data Monitoring</h1>
            </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'overview'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'activity'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Activity Logs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'security'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Security Events</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'privacy'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Privacy Dashboard</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'usage'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Data Usage</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Right Side - Action Button */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'activity' && renderActivityLogs()}
        {activeTab === 'security' && renderSecurityEvents()}
        {activeTab === 'privacy' && renderPrivacyDashboard()}
        {activeTab === 'usage' && renderDataUsage()}
      </div>
    </div>
  )
}

export default DataMonitoring
