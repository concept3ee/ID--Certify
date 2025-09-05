import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  PieChart,
  Activity,
  Target,
  Award,
  FileText,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalEmployees: number
    verifiedEmployees: number
    pendingVerifications: number
    expiredVerifications: number
    verificationRate: number
    avgProcessingTime: number
  }
  trends: {
    monthlyVerifications: Array<{
      month: string
      completed: number
      failed: number
      pending: number
    }>
    departmentStats: Array<{
      department: string
      total: number
      verified: number
      pending: number
      failed: number
    }>
  }
  insights: {
    topDepartments: Array<{
      department: string
      count: number
      percentage: number
    }>
    commonIssues: Array<{
      issue: string
      count: number
      percentage: number
    }>
    processingTimes: {
      average: number
      fastest: number
      slowest: number
    }
  }
}

const EmployeeAnalytics = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'insights' | 'reports'>('overview')
  const [dateRange, setDateRange] = useState('last30')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [showExportModal, setShowExportModal] = useState(false)

  const analyticsData: AnalyticsData = {
    overview: {
      totalEmployees: 156,
      verifiedEmployees: 142,
      pendingVerifications: 8,
      expiredVerifications: 6,
      verificationRate: 91.0,
      avgProcessingTime: 2.3
    },
    trends: {
      monthlyVerifications: [
        { month: 'Jan', completed: 45, failed: 3, pending: 2 },
        { month: 'Feb', completed: 52, failed: 2, pending: 1 },
        { month: 'Mar', completed: 38, failed: 4, pending: 3 },
        { month: 'Apr', completed: 61, failed: 1, pending: 2 },
        { month: 'May', completed: 48, failed: 3, pending: 4 },
        { month: 'Jun', completed: 55, failed: 2, pending: 1 }
      ],
      departmentStats: [
        { department: 'Engineering', total: 45, verified: 42, pending: 2, failed: 1 },
        { department: 'Marketing', total: 28, verified: 26, pending: 1, failed: 1 },
        { department: 'HR', total: 15, verified: 14, pending: 1, failed: 0 },
        { department: 'Finance', total: 22, verified: 20, pending: 1, failed: 1 },
        { department: 'Sales', total: 35, verified: 32, pending: 2, failed: 1 },
        { department: 'Operations', total: 11, verified: 8, pending: 1, failed: 2 }
      ]
    },
    insights: {
      topDepartments: [
        { department: 'Engineering', count: 45, percentage: 28.8 },
        { department: 'Sales', count: 35, percentage: 22.4 },
        { department: 'Marketing', count: 28, percentage: 17.9 },
        { department: 'Finance', count: 22, percentage: 14.1 },
        { department: 'HR', count: 15, percentage: 9.6 },
        { department: 'Operations', count: 11, percentage: 7.1 }
      ],
      commonIssues: [
        { issue: 'Document Expired', count: 12, percentage: 35.3 },
        { issue: 'Invalid Email Format', count: 8, percentage: 23.5 },
        { issue: 'Missing Required Documents', count: 7, percentage: 20.6 },
        { issue: 'Department Not Found', count: 4, percentage: 11.8 },
        { issue: 'Duplicate Employee ID', count: 3, percentage: 8.8 }
      ],
      processingTimes: {
        average: 2.3,
        fastest: 0.5,
        slowest: 7.2
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'expired': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (value: number, previous: number) => {
    if (value > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (value < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Activity className="w-4 h-4 text-gray-600" />
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalEmployees}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.overview.totalEmployees, 150)}
            <span className="ml-2 text-sm text-gray-600">+4% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Employees</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.verifiedEmployees}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.overview.verifiedEmployees, 138)}
            <span className="ml-2 text-sm text-gray-600">+2.9% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.pendingVerifications}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.overview.pendingVerifications, 12)}
            <span className="ml-2 text-sm text-gray-600">-33% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verification Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.verificationRate}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.overview.verificationRate, 89.2)}
            <span className="ml-2 text-sm text-gray-600">+1.8% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Status Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Verified</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{analyticsData.overview.verifiedEmployees}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{analyticsData.overview.pendingVerifications}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Expired</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{analyticsData.overview.expiredVerifications}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Failed</span>
              </div>
              <span className="text-sm font-medium text-gray-900">6</span>
            </div>
          </div>
        </div>

        {/* Processing Time Metrics */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Processing Times</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average</span>
              <span className="text-lg font-semibold text-gray-900">{analyticsData.insights.processingTimes.average} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fastest</span>
              <span className="text-lg font-semibold text-gray-900">{analyticsData.insights.processingTimes.fastest} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Slowest</span>
              <span className="text-lg font-semibold text-gray-900">{analyticsData.insights.processingTimes.slowest} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Department Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Failed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.trends.departmentStats.map((dept) => (
                <tr key={dept.department} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {dept.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dept.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dept.verified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dept.pending}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dept.failed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      (dept.verified / dept.total) >= 0.9 ? 'bg-green-100 text-green-800' :
                      (dept.verified / dept.total) >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {((dept.verified / dept.total) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTrendsTab = () => (
    <div className="space-y-6">
      {/* Monthly Trends Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Verification Trends</h3>
          <div className="flex items-center space-x-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="lastyear">Last Year</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {analyticsData.trends.monthlyVerifications.map((month) => (
            <div key={month.month} className="flex items-center">
              <div className="w-12 text-sm font-medium text-gray-600">{month.month}</div>
              <div className="flex-1 mx-4">
                <div className="flex items-center h-6 bg-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-green-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${(month.completed / (month.completed + month.failed + month.pending)) * 100}%` }}
                  >
                    {month.completed}
                  </div>
                  <div 
                    className="h-full bg-red-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${(month.failed / (month.completed + month.failed + month.pending)) * 100}%` }}
                  >
                    {month.failed}
                  </div>
                  <div 
                    className="h-full bg-yellow-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${(month.pending / (month.completed + month.failed + month.pending)) * 100}%` }}
                  >
                    {month.pending}
                  </div>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-600 text-right">
                {month.completed + month.failed + month.pending} total
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Department Performance Trends</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyticsData.trends.departmentStats.map((dept) => (
              <div key={dept.department} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">{dept.department}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Verified:</span>
                    <span className="font-medium text-green-600">{dept.verified}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-medium text-yellow-600">{dept.pending}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Failed:</span>
                    <span className="font-medium text-red-600">{dept.failed}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium text-gray-900">
                        {((dept.verified / dept.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderInsightsTab = () => (
    <div className="space-y-6">
      {/* Top Departments */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Departments by Employee Count</h3>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.insights.topDepartments.map((dept, index) => (
            <div key={dept.department} className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 mr-4">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{dept.department}</span>
                  <span className="text-sm text-gray-600">{dept.count} employees</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-sm text-gray-600">
                {dept.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Issues */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Common Verification Issues</h3>
          <AlertTriangle className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {analyticsData.insights.commonIssues.map((issue, index) => (
            <div key={issue.issue} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-xs font-medium text-red-600 mr-3">
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-gray-900">{issue.issue}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{issue.count} occurrences</span>
                <span className="text-sm font-medium text-gray-900">{issue.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Processing Efficiency</h3>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Processing Time</span>
              <span className="text-sm font-medium text-gray-900">{analyticsData.insights.processingTimes.average} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fastest Processing</span>
              <span className="text-sm font-medium text-green-600">{analyticsData.insights.processingTimes.fastest} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Slowest Processing</span>
              <span className="text-sm font-medium text-red-600">{analyticsData.insights.processingTimes.slowest} days</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quality Metrics</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Success Rate</span>
              <span className="text-sm font-medium text-green-600">{analyticsData.overview.verificationRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Failed Verifications</span>
              <span className="text-sm font-medium text-red-600">6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Expired Verifications</span>
              <span className="text-sm font-medium text-orange-600">{analyticsData.overview.expiredVerifications}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Generate Reports</h3>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="ml-3 font-medium text-gray-900">Employee Summary</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Complete overview of all employees and their verification status</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">Generate Report</button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="ml-3 font-medium text-gray-900">Department Analysis</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Detailed analysis by department with performance metrics</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">Generate Report</button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="ml-3 font-medium text-gray-900">Trend Analysis</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Monthly trends and performance over time</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">Generate Report</button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="ml-3 font-medium text-gray-900">Issue Report</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Common issues and failure analysis</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">Generate Report</button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="ml-3 font-medium text-gray-900">Processing Times</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Analysis of verification processing times</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">Generate Report</button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Settings className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="ml-3 font-medium text-gray-900">Custom Report</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Create a custom report with specific criteria</p>
            <button className="text-sm text-blue-600 hover:text-blue-800">Create Custom</button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3">
        <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
        <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
            <option value="lastyear">Last Year</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
            <option value="sales">Sales</option>
            <option value="operations">Operations</option>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'trends', name: 'Trends', icon: TrendingUp },
            { id: 'insights', name: 'Insights', icon: Eye },
            { id: 'reports', name: 'Reports', icon: FileText }
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
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'trends' && renderTrendsTab()}
      {activeTab === 'insights' && renderInsightsTab()}
      {activeTab === 'reports' && renderReportsTab()}
    </div>
  )
}

export default EmployeeAnalytics
