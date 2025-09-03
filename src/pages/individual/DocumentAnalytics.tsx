import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Shield,
  Calendar,
  Filter,
  Download as DownloadIcon,
  RefreshCw,
  Activity,
  PieChart,
  LineChart,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Search
} from 'lucide-react'

interface AnalyticsData {
  totalFiles: number
  totalSize: string
  encryptedFiles: number
  sharedFiles: number
  activeUsers: number
  totalDownloads: number
  totalViews: number
  securityScore: number
}

interface FileTypeStats {
  type: string
  count: number
  size: string
  percentage: number
  color: string
}

interface AccessStats {
  date: string
  views: number
  downloads: number
  uploads: number
  shares: number
}

interface UserActivity {
  userId: string
  userName: string
  userEmail: string
  lastActivity: string
  filesAccessed: number
  totalTime: string
  riskLevel: 'low' | 'medium' | 'high'
}

const DocumentAnalytics = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'security' | 'users'>('overview')
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [showExportModal, setShowExportModal] = useState(false)
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserActivity | null>(null)

  // Mock analytics data
  const [analyticsData] = useState<AnalyticsData>({
    totalFiles: 1247,
    totalSize: '2.4TB',
    encryptedFiles: 1247,
    sharedFiles: 89,
    activeUsers: 23,
    totalDownloads: 456,
    totalViews: 2341,
    securityScore: 98
  })

  const [fileTypeStats] = useState<FileTypeStats[]>([
    { type: 'Documents', count: 423, size: '856GB', percentage: 34, color: 'text-blue-600' },
    { type: 'Images', count: 512, size: '1.2TB', percentage: 41, color: 'text-green-600' },
    { type: 'Videos', count: 89, size: '234GB', percentage: 7, color: 'text-purple-600' },
    { type: 'Archives', count: 223, size: '110GB', percentage: 18, color: 'text-orange-600' }
  ])

  const [accessStats] = useState<AccessStats[]>([
    { date: '2024-01-14', views: 45, downloads: 12, uploads: 3, shares: 2 },
    { date: '2024-01-15', views: 67, downloads: 18, uploads: 5, shares: 4 },
    { date: '2024-01-16', views: 89, downloads: 23, uploads: 7, shares: 6 },
    { date: '2024-01-17', views: 123, downloads: 34, uploads: 12, shares: 8 },
    { date: '2024-01-18', views: 156, downloads: 45, uploads: 15, shares: 12 },
    { date: '2024-01-19', views: 134, downloads: 38, uploads: 11, shares: 9 },
    { date: '2024-01-20', views: 98, downloads: 28, uploads: 8, shares: 5 }
  ])

  const [userActivity] = useState<UserActivity[]>([
    {
      userId: 'user-1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      lastActivity: '2 hours ago',
      filesAccessed: 45,
      totalTime: '12h 30m',
      riskLevel: 'low'
    },
    {
      userId: 'user-2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      lastActivity: '1 hour ago',
      filesAccessed: 23,
      totalTime: '8h 15m',
      riskLevel: 'low'
    },
    {
      userId: 'user-3',
      userName: 'Bob Wilson',
      userEmail: 'bob@example.com',
      lastActivity: '30 minutes ago',
      filesAccessed: 67,
      totalTime: '15h 45m',
      riskLevel: 'medium'
    },
    {
      userId: 'user-4',
      userName: 'Alice Johnson',
      userEmail: 'alice@example.com',
      lastActivity: '15 minutes ago',
      filesAccessed: 34,
      totalTime: '6h 20m',
      riskLevel: 'low'
    }
  ])

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const handleViewUserDetails = (user: UserActivity) => {
    setSelectedUser(user)
    setShowUserDetailsModal(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your document usage and security</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <DownloadIcon className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'usage'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Usage Patterns
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'security'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Security Insights
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User Activity
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Files</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalFiles.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalSize}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span>+5% from last month</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Score</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.securityScore}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  <span>Excellent security</span>
                </div>
              </div>
            </div>
          </div>

          {/* File Type Distribution */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">File Type Distribution</h2>
              <p className="text-sm text-gray-600">Breakdown of files by type and size</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    {fileTypeStats.map((stat, index) => (
                      <div key={stat.type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${stat.color.replace('text-', 'bg-')}`}></div>
                          <span className="text-sm font-medium text-gray-900">{stat.type}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{stat.count} files</div>
                          <div className="text-xs text-gray-500">{stat.size}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 relative">
                    {/* Simple pie chart representation */}
                    <div className="w-full h-full rounded-full border-8 border-blue-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 opacity-75"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{analyticsData.totalFiles}</div>
                        <div className="text-xs text-gray-600">Total Files</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-600">Latest document access and modifications</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {accessStats.slice(-5).reverse().map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{new Date(stat.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{stat.views} views, {stat.downloads} downloads</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {stat.views}
                      </span>
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {stat.downloads}
                      </span>
                      <span className="flex items-center">
                        <Upload className="h-4 w-4 mr-1" />
                        {stat.uploads}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-6">
          {/* Usage Trends Chart */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Usage Trends</h2>
              <p className="text-sm text-gray-600">Document access patterns over time</p>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {accessStats.map((stat, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-t-lg relative">
                      <div 
                        className="bg-blue-500 rounded-t-lg transition-all duration-300"
                        style={{ height: `${(stat.views / 200) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">Views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Downloads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-sm text-gray-600">Uploads</span>
                </div>
              </div>
            </div>
          </div>

          {/* File Access Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Most Accessed Files</h3>
                <p className="text-sm text-gray-600">Top documents by view count</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'financial-report-2024.pdf', views: 156, downloads: 23 },
                    { name: 'company-policy.pdf', views: 134, downloads: 18 },
                    { name: 'employee-handbook.pdf', views: 98, downloads: 15 },
                    { name: 'contract-template.docx', views: 87, downloads: 12 }
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.views} views</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{file.downloads}</div>
                        <div className="text-xs text-gray-500">downloads</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Storage Growth</h3>
                <p className="text-sm text-gray-600">Monthly storage consumption</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { month: 'Jan 2024', size: '2.1TB', growth: '+15%' },
                    { month: 'Dec 2023', size: '1.8TB', growth: '+12%' },
                    { month: 'Nov 2023', size: '1.6TB', growth: '+8%' },
                    { month: 'Oct 2023', size: '1.5TB', growth: '+5%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.month}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900">{item.size}</span>
                        <span className="text-xs text-green-600">{item.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Security Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Encryption Status</h3>
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <p className="text-sm text-gray-600">Files Encrypted</p>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                All documents are protected with AES-256 encryption
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Access Violations</h3>
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">3</div>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Failed login attempts and unauthorized access
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Security Score</h3>
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98/100</div>
                <p className="text-sm text-gray-600">Overall Score</p>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Excellent security posture maintained
              </div>
            </div>
          </div>

          {/* Security Events Timeline */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Security Events</h2>
              <p className="text-sm text-gray-600">Recent security-related activities</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { time: '2 hours ago', event: 'User login from new device', user: 'jane@example.com', ip: '192.168.1.101', severity: 'info' },
                  { time: '4 hours ago', event: 'Failed login attempt', user: 'unknown@example.com', ip: '203.45.67.89', severity: 'warning' },
                  { time: '1 day ago', event: 'Permission revoked', user: 'bob@example.com', ip: '192.168.1.102', severity: 'info' },
                  { time: '2 days ago', event: 'File access denied', user: 'alice@example.com', ip: '192.168.1.103', severity: 'warning' }
                ].map((event, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      event.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.user} • {event.ip}</p>
                    </div>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* User Activity Table */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">User Activity</h2>
              <p className="text-sm text-gray-600">Monitor user behavior and access patterns</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files Accessed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userActivity.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                          <div className="text-sm text-gray-500">{user.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActivity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.filesAccessed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.totalTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(user.riskLevel)}`}>
                          {getRiskLevelIcon(user.riskLevel)}
                          <span className="ml-1 capitalize">{user.riskLevel}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleViewUserDetails(user)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="text-sm font-medium text-gray-900">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Users</span>
                  <span className="text-sm font-medium text-gray-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Inactive Users</span>
                  <span className="text-sm font-medium text-gray-900">8</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Patterns</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Peak Hours</span>
                  <span className="text-sm font-medium text-gray-900">9 AM - 5 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Most Active Day</span>
                  <span className="text-sm font-medium text-gray-900">Wednesday</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Session</span>
                  <span className="text-sm font-medium text-gray-900">45 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setShowExportModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <DownloadIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Export Analytics Report</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Download comprehensive analytics data
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="comprehensive">Comprehensive Report</option>
                  <option value="usage">Usage Report</option>
                  <option value="security">Security Report</option>
                  <option value="user-activity">User Activity Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative">
            <button onClick={() => setShowUserDetailsModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">User Details</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Detailed information for {selectedUser.userName}
            </p>
            
            <div className="space-y-6">
              {/* User Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">User Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-sm text-gray-900">{selectedUser.userName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedUser.userEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">User ID</label>
                    <p className="text-sm text-gray-900">{selectedUser.userId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Risk Level</label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(selectedUser.riskLevel)}`}>
                        {getRiskLevelIcon(selectedUser.riskLevel)}
                        <span className="ml-1 capitalize">{selectedUser.riskLevel}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Activity Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedUser.filesAccessed}</div>
                    <div className="text-sm text-gray-600">Files Accessed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedUser.totalTime}</div>
                    <div className="text-sm text-gray-600">Total Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedUser.lastActivity}</div>
                    <div className="text-sm text-gray-600">Last Activity</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Recent Activity Timeline</h4>
                <div className="space-y-3">
                  {[
                    { time: '2 hours ago', action: 'Viewed financial-report.pdf', details: 'File accessed for review' },
                    { time: '4 hours ago', action: 'Downloaded company-policy.pdf', details: 'Document downloaded for offline review' },
                    { time: '1 day ago', action: 'Shared contract-template.docx', details: 'File shared with legal team' },
                    { time: '2 days ago', action: 'Uploaded new-document.pdf', details: 'New document uploaded to system' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                        <p className="text-xs text-gray-500 truncate">{activity.details}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Assessment */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Security Assessment</h4>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-700">Login History</span>
                    <span className="text-sm text-green-600">Normal</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-700">File Access Patterns</span>
                    <span className="text-sm text-green-600">Consistent</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-700">Permission Usage</span>
                    <span className="text-sm text-green-600">Appropriate</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-700">Risk Indicators</span>
                    <span className="text-sm text-yellow-600">Low</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowUserDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Export User Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentAnalytics
