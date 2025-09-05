import React, { useState } from 'react'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  PieChart,
  Activity,
  Target,
  Award,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react'

// Types
interface AnalyticsData {
  totalVerifications: number
  completedVerifications: number
  failedVerifications: number
  pendingVerifications: number
  totalCost: number
  avgTurnaroundTime: number
  successRate: number
  monthlyTrend: {
    month: string
    verifications: number
    cost: number
    successRate: number
  }[]
  verificationTypes: {
    type: string
    count: number
    successRate: number
    avgCost: number
  }[]
  attesterPerformance: {
    name: string
    totalVerifications: number
    successRate: number
    avgResponseTime: number
    rating: number
  }[]
  costAnalysis: {
    category: string
    amount: number
    percentage: number
  }[]
  complianceMetrics: {
    metric: string
    value: number
    target: number
    status: 'met' | 'below' | 'above'
  }[]
}

const VerificationAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'costs' | 'compliance' | 'reports'>('overview')
  const [dateRange, setDateRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    totalVerifications: 1247,
    completedVerifications: 1089,
    failedVerifications: 89,
    pendingVerifications: 69,
    totalCost: 45680.50,
    avgTurnaroundTime: 2.3,
    successRate: 87.3,
    monthlyTrend: [
      { month: 'Jan', verifications: 145, cost: 5200, successRate: 89.2 },
      { month: 'Feb', verifications: 167, cost: 6100, successRate: 87.8 },
      { month: 'Mar', verifications: 189, cost: 6800, successRate: 88.5 },
      { month: 'Apr', verifications: 203, cost: 7200, successRate: 86.9 },
      { month: 'May', verifications: 178, cost: 6400, successRate: 87.3 },
      { month: 'Jun', verifications: 195, cost: 6900, successRate: 88.1 },
      { month: 'Jul', verifications: 170, cost: 6200, successRate: 87.3 }
    ],
    verificationTypes: [
      { type: 'Employment Verification', count: 456, successRate: 91.2, avgCost: 45.00 },
      { type: 'Education Verification', count: 234, successRate: 89.7, avgCost: 35.00 },
      { type: 'Identity Verification', count: 198, successRate: 95.4, avgCost: 25.00 },
      { type: 'Business Verification', count: 156, successRate: 84.6, avgCost: 75.00 },
      { type: 'Reference Verification', count: 123, successRate: 87.8, avgCost: 50.00 },
      { type: 'License Verification', count: 80, successRate: 92.5, avgCost: 60.00 }
    ],
    attesterPerformance: [
      { name: 'Sarah Johnson', totalVerifications: 156, successRate: 94.2, avgResponseTime: 2.3, rating: 4.8 },
      { name: 'Mike Chen', totalVerifications: 89, successRate: 97.8, avgResponseTime: 1.8, rating: 4.9 },
      { name: 'Lisa Wang', totalVerifications: 203, successRate: 91.6, avgResponseTime: 1.2, rating: 4.7 },
      { name: 'Dr. Maria Garcia', totalVerifications: 67, successRate: 98.5, avgResponseTime: 3.1, rating: 4.9 }
    ],
    costAnalysis: [
      { category: 'Base Verification Fees', amount: 32000, percentage: 70.1 },
      { category: 'Attester Fees', amount: 8900, percentage: 19.5 },
      { category: 'Platform Fees', amount: 3200, percentage: 7.0 },
      { category: 'Processing Fees', amount: 1580.50, percentage: 3.4 }
    ],
    complianceMetrics: [
      { metric: 'SLA Compliance', value: 94.2, target: 95, status: 'below' },
      { metric: 'Data Accuracy', value: 98.7, target: 98, status: 'above' },
      { metric: 'Audit Readiness', value: 100, target: 100, status: 'met' },
      { metric: 'Security Score', value: 96.8, target: 95, status: 'above' }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'met': return 'text-green-600'
      case 'above': return 'text-blue-600'
      case 'below': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'met': return <CheckCircle className="w-4 h-4" />
      case 'above': return <ArrowUpRight className="w-4 h-4" />
      case 'below': return <ArrowDownRight className="w-4 h-4" />
      default: return <Minus className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalVerifications.toLocaleString()}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{formatPercentage(analyticsData.successRate)}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.1% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Turnaround</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.avgTurnaroundTime} days</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <TrendingDown className="w-3 h-3 mr-1" />
                +0.3 days from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.totalCost)}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.7% from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trend</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Verifications</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.monthlyTrend.map((month, index) => (
              <div key={month.month} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(month.verifications / 250) * 200}px` }}
                ></div>
                <div className="mt-2 text-xs text-gray-600">{month.month}</div>
                <div className="text-xs font-medium text-gray-900">{month.verifications}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Types Distribution */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Types</h3>
          <div className="space-y-3">
            {analyticsData.verificationTypes.map((type, index) => (
              <div key={type.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-yellow-500' :
                    index === 3 ? 'bg-purple-500' :
                    index === 4 ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-900">{type.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{type.count}</div>
                  <div className="text-xs text-gray-500">{formatPercentage(type.successRate)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analyticsData.completedVerifications}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{analyticsData.failedVerifications}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analyticsData.pendingVerifications}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {/* Attester Performance */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Attester Performance</h3>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Verifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.attesterPerformance.map((attester) => (
                <tr key={attester.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{attester.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attester.totalVerifications}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${attester.successRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{formatPercentage(attester.successRate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {attester.avgResponseTime} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-1">{attester.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(attester.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                    </div>
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
  )

  const renderCostsTab = () => (
    <div className="space-y-6">
      {/* Cost Analysis */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Cost Breakdown</h4>
            <div className="space-y-3">
              {analyticsData.costAnalysis.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-sm text-gray-900">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</div>
                    <div className="text-xs text-gray-500">{formatPercentage(item.percentage)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Cost Trends</h4>
            <div className="h-48 flex items-end justify-between space-x-2">
              {analyticsData.monthlyTrend.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(month.cost / 8000) * 150}px` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-600">{month.month}</div>
                  <div className="text-xs font-medium text-gray-900">{formatCurrency(month.cost)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cost per Verification</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(analyticsData.totalCost / analyticsData.totalVerifications)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cost Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">87.3%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ROI</p>
              <p className="text-2xl font-bold text-gray-900">245%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderComplianceTab = () => (
    <div className="space-y-6">
      {/* Compliance Metrics */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analyticsData.complianceMetrics.map((metric) => (
            <div key={metric.metric} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{metric.metric}</h4>
                <div className={`flex items-center ${getStatusColor(metric.status)}`}>
                  {getStatusIcon(metric.status)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{formatPercentage(metric.value)}</div>
                  <div className="text-xs text-gray-500">Target: {formatPercentage(metric.target)}</div>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === 'met' ? 'bg-green-600' :
                      metric.status === 'above' ? 'bg-blue-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Audit Events</h3>
        <div className="space-y-3">
          {[
            { action: 'Verification completed', user: 'Sarah Johnson', time: '2 hours ago', type: 'success' },
            { action: 'Attester assigned', user: 'Mike Chen', time: '4 hours ago', type: 'info' },
            { action: 'Payment processed', user: 'System', time: '6 hours ago', type: 'success' },
            { action: 'Verification failed', user: 'Lisa Wang', time: '8 hours ago', type: 'warning' },
            { action: 'Bulk verification initiated', user: 'Admin', time: '1 day ago', type: 'info' }
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  event.type === 'success' ? 'bg-green-500' :
                  event.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{event.action}</div>
                  <div className="text-xs text-gray-500">by {event.user}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderReportsTab = () => (
    <div className="space-y-6">
      {/* Report Templates */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Create Custom Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Monthly Verification Summary', description: 'Complete overview of monthly verification activities', type: 'monthly' },
            { name: 'Attester Performance Report', description: 'Detailed performance metrics for all attesters', type: 'performance' },
            { name: 'Cost Analysis Report', description: 'Comprehensive cost breakdown and trends', type: 'cost' },
            { name: 'Compliance Audit Report', description: 'Compliance metrics and audit trail', type: 'compliance' },
            { name: 'Failed Verification Analysis', description: 'Analysis of failed verifications and reasons', type: 'analysis' },
            { name: 'Custom Date Range Report', description: 'Flexible reporting for any date range', type: 'custom' }
          ].map((report) => (
            <div key={report.name} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                <button className="text-gray-400 hover:text-gray-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-600 mb-3">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.type === 'monthly' ? 'bg-blue-100 text-blue-800' :
                  report.type === 'performance' ? 'bg-green-100 text-green-800' :
                  report.type === 'cost' ? 'bg-yellow-100 text-yellow-800' :
                  report.type === 'compliance' ? 'bg-purple-100 text-purple-800' :
                  report.type === 'analysis' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {report.type}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                  Generate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Verification Analytics</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights and reporting for verification activities</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('performance')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'performance'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Performance
            </button>
            <button 
              onClick={() => setActiveTab('costs')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'costs'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Costs
            </button>
            <button 
              onClick={() => setActiveTab('compliance')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'compliance'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Compliance
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'reports'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reports
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'performance' && renderPerformanceTab()}
        {activeTab === 'costs' && renderCostsTab()}
        {activeTab === 'compliance' && renderComplianceTab()}
        {activeTab === 'reports' && renderReportsTab()}
      </div>
    </div>
  )
}

export default VerificationAnalytics
