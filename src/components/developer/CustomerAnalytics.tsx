import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  PieChart, 
  Activity, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Target,
  Award,
  Shield,
  Globe,
  Building,
  User,
  UserCheck,
  UserX,
  FileText,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalCustomers: number
    verifiedCustomers: number
    pendingCustomers: number
    rejectedCustomers: number
    averageTrustScore: number
    completionRate: number
    averageProcessingTime: number
  }
  trends: {
    daily: Array<{
      date: string
      submitted: number
      completed: number
      rejected: number
    }>
    weekly: Array<{
      week: string
      submitted: number
      completed: number
      rejected: number
    }>
    monthly: Array<{
      month: string
      submitted: number
      completed: number
      rejected: number
    }>
  }
  demographics: {
    byType: Array<{
      type: string
      count: number
      percentage: number
    }>
    byRisk: Array<{
      risk: string
      count: number
      percentage: number
    }>
    byCompany: Array<{
      company: string
      count: number
      percentage: number
    }>
  }
  performance: {
    processingTime: {
      average: number
      median: number
      p95: number
      p99: number
    }
    successRate: {
      overall: number
      byType: Array<{
        type: string
        rate: number
      }>
      byRisk: Array<{
        risk: string
        rate: number
      }>
    }
    bottlenecks: Array<{
      stage: string
      averageTime: number
      failureRate: number
    }>
  }
  insights: Array<{
    id: string
    type: 'success' | 'warning' | 'error' | 'info'
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    recommendation: string
  }>
}

interface CustomerAnalyticsProps {
  onExportData: (format: 'csv' | 'excel' | 'pdf') => void
  onViewDetails: (metric: string) => void
  onClose: () => void
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({
  onExportData,
  onViewDetails,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'demographics' | 'performance' | 'insights'>('overview')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockData: AnalyticsData = {
      overview: {
        totalCustomers: 1247,
        verifiedCustomers: 892,
        pendingCustomers: 234,
        rejectedCustomers: 121,
        averageTrustScore: 78.5,
        completionRate: 88.2,
        averageProcessingTime: 2.4
      },
      trends: {
        daily: [
          { date: '2024-01-20', submitted: 45, completed: 38, rejected: 7 },
          { date: '2024-01-19', submitted: 52, completed: 41, rejected: 11 },
          { date: '2024-01-18', submitted: 38, completed: 35, rejected: 3 },
          { date: '2024-01-17', submitted: 61, completed: 48, rejected: 13 },
          { date: '2024-01-16', submitted: 43, completed: 39, rejected: 4 },
          { date: '2024-01-15', submitted: 47, completed: 42, rejected: 5 },
          { date: '2024-01-14', submitted: 39, completed: 36, rejected: 3 }
        ],
        weekly: [
          { week: 'Week 1', submitted: 285, completed: 241, rejected: 44 },
          { week: 'Week 2', submitted: 312, completed: 267, rejected: 45 },
          { week: 'Week 3', submitted: 298, completed: 254, rejected: 44 },
          { week: 'Week 4', submitted: 352, completed: 310, rejected: 42 }
        ],
        monthly: [
          { month: 'Jan 2024', submitted: 1247, completed: 1072, rejected: 175 },
          { month: 'Dec 2023', submitted: 1189, completed: 1023, rejected: 166 },
          { month: 'Nov 2023', submitted: 1156, completed: 998, rejected: 158 }
        ]
      },
      demographics: {
        byType: [
          { type: 'Individual', count: 567, percentage: 45.5 },
          { type: 'Business', count: 423, percentage: 33.9 },
          { type: 'KYC', count: 189, percentage: 15.2 },
          { type: 'AML', count: 68, percentage: 5.4 }
        ],
        byRisk: [
          { risk: 'Low', count: 892, percentage: 71.5 },
          { risk: 'Medium', count: 234, percentage: 18.8 },
          { risk: 'High', count: 121, percentage: 9.7 }
        ],
        byCompany: [
          { company: 'Tech Corp', count: 156, percentage: 12.5 },
          { company: 'Finance Inc', count: 134, percentage: 10.7 },
          { company: 'StartupXYZ', count: 98, percentage: 7.9 },
          { company: 'Others', count: 859, percentage: 68.9 }
        ]
      },
      performance: {
        processingTime: {
          average: 2.4,
          median: 1.8,
          p95: 5.2,
          p99: 8.7
        },
        successRate: {
          overall: 88.2,
          byType: [
            { type: 'Individual', rate: 92.1 },
            { type: 'Business', rate: 85.3 },
            { type: 'KYC', rate: 78.9 },
            { type: 'AML', rate: 82.4 }
          ],
          byRisk: [
            { risk: 'Low', rate: 94.2 },
            { risk: 'Medium', rate: 81.6 },
            { risk: 'High', rate: 65.3 }
          ]
        },
        bottlenecks: [
          { stage: 'Document Upload', averageTime: 0.8, failureRate: 12.3 },
          { stage: 'Identity Verification', averageTime: 1.2, failureRate: 8.7 },
          { stage: 'Risk Assessment', averageTime: 0.4, failureRate: 5.2 },
          { stage: 'Final Review', averageTime: 0.3, failureRate: 3.1 }
        ]
      },
      insights: [
        {
          id: '1',
          type: 'success',
          title: 'High Success Rate',
          description: 'Your verification success rate is 15% above industry average',
          impact: 'high',
          recommendation: 'Consider expanding to new markets with this strong performance'
        },
        {
          id: '2',
          type: 'warning',
          title: 'Processing Time Increase',
          description: 'Average processing time has increased by 0.3 hours this week',
          impact: 'medium',
          recommendation: 'Review document upload process for optimization opportunities'
        },
        {
          id: '3',
          type: 'info',
          title: 'Business Verification Trend',
          description: 'Business verifications are 23% higher than last month',
          impact: 'low',
          recommendation: 'Consider adding more business-specific verification steps'
        },
        {
          id: '4',
          type: 'error',
          title: 'High Risk Rejection Rate',
          description: 'High-risk customers have a 35% rejection rate',
          impact: 'high',
          recommendation: 'Implement additional screening for high-risk customers'
        }
      ]
    }

    setTimeout(() => {
      setAnalyticsData(mockData)
      setIsLoading(false)
    }, 1000)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'info':
        return <Activity className="h-5 w-5 text-blue-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const formatTime = (hours: number) => {
    if (hours < 1) {
      return `${(hours * 60).toFixed(0)}m`
    }
    return `${hours.toFixed(1)}h`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">Loading analytics...</span>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Failed to load analytics data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into customer verification patterns</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={() => onExportData('csv')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'trends', name: 'Trends', icon: TrendingUp },
            { id: 'demographics', name: 'Demographics', icon: Users },
            { id: 'performance', name: 'Performance', icon: Target },
            { id: 'insights', name: 'Insights', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analyticsData.overview.totalCustomers)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analyticsData.overview.verifiedCustomers)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Trust Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.overview.averageTrustScore.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatTime(analyticsData.overview.averageProcessingTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {formatNumber(analyticsData.overview.verifiedCustomers)}
                </div>
                <div className="text-sm text-gray-600">Verified</div>
                <div className="text-xs text-gray-500">
                  {formatPercentage((analyticsData.overview.verifiedCustomers / analyticsData.overview.totalCustomers) * 100)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {formatNumber(analyticsData.overview.pendingCustomers)}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
                <div className="text-xs text-gray-500">
                  {formatPercentage((analyticsData.overview.pendingCustomers / analyticsData.overview.totalCustomers) * 100)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {formatNumber(analyticsData.overview.rejectedCustomers)}
                </div>
                <div className="text-sm text-gray-600">Rejected</div>
                <div className="text-xs text-gray-500">
                  {formatPercentage((analyticsData.overview.rejectedCustomers / analyticsData.overview.totalCustomers) * 100)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {formatPercentage(analyticsData.overview.completionRate)}
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-xs text-gray-500">Overall</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Trends</h3>
            <div className="space-y-4">
              {analyticsData.trends.daily.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{day.submitted}</div>
                      <div className="text-xs text-gray-500">Submitted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{day.completed}</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">{day.rejected}</div>
                      <div className="text-xs text-gray-500">Rejected</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Demographics Tab */}
      {activeTab === 'demographics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">By Verification Type</h3>
              <div className="space-y-3">
                {analyticsData.demographics.byType.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">By Risk Level</h3>
              <div className="space-y-3">
                {analyticsData.demographics.byRisk.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.risk}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.risk === 'Low' ? 'bg-green-600' :
                            item.risk === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatTime(analyticsData.performance.processingTime.average)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Median</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatTime(analyticsData.performance.processingTime.median)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">95th Percentile</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatTime(analyticsData.performance.processingTime.p95)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">99th Percentile</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatTime(analyticsData.performance.processingTime.p99)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate by Type</h3>
              <div className="space-y-3">
                {analyticsData.performance.successRate.byType.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${item.rate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {formatPercentage(item.rate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analyticsData.insights.map((insight) => (
              <div key={insight.id} className={`p-6 rounded-lg border ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getImpactColor(insight.impact)}`}>
                        {insight.impact} impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-medium text-gray-900 mb-1">Recommendation:</p>
                      <p className="text-sm text-gray-600">{insight.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerAnalytics
