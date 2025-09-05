import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  PieChart, 
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
  MoreVertical
} from 'lucide-react'

interface ComplianceMetric {
  id: string
  name: string
  value: number
  previousValue: number
  trend: 'up' | 'down' | 'stable'
  percentage: number
  target: number
  status: 'good' | 'warning' | 'critical'
  category: 'overall' | 'framework' | 'risk' | 'operational'
  unit: string
  description: string
}

interface ComplianceTrend {
  date: string
  overall: number
  gdpr: number
  sox: number
  pci: number
  hipaa: number
  iso27001: number
}

interface RiskDistribution {
  level: 'low' | 'medium' | 'high' | 'critical'
  count: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
}

interface FrameworkPerformance {
  framework: string
  score: number
  previousScore: number
  trend: 'up' | 'down' | 'stable'
  requirements: number
  completed: number
  pending: number
  overdue: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface AlertTrend {
  date: string
  total: number
  critical: number
  high: number
  medium: number
  low: number
  resolved: number
}

const ComplianceAnalytics = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'frameworks' | 'risks' | 'alerts' | 'custom'>('overview')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [expandedMetrics, setExpandedMetrics] = useState<Set<string>>(new Set())

  // Mock data - in real implementation, this would come from API
  const complianceMetrics: ComplianceMetric[] = [
    {
      id: '1',
      name: 'Overall Compliance Score',
      value: 87,
      previousValue: 84,
      trend: 'up',
      percentage: 3.6,
      target: 90,
      status: 'good',
      category: 'overall',
      unit: '%',
      description: 'Overall compliance score across all frameworks'
    },
    {
      id: '2',
      name: 'Active Frameworks',
      value: 5,
      previousValue: 5,
      trend: 'stable',
      percentage: 0,
      target: 5,
      status: 'good',
      category: 'framework',
      unit: '',
      description: 'Number of active compliance frameworks'
    },
    {
      id: '3',
      name: 'Requirements Completed',
      value: 156,
      previousValue: 142,
      trend: 'up',
      percentage: 9.9,
      target: 200,
      status: 'good',
      category: 'framework',
      unit: '',
      description: 'Total compliance requirements completed'
    },
    {
      id: '4',
      name: 'Pending Audits',
      value: 3,
      previousValue: 5,
      trend: 'down',
      percentage: -40,
      target: 0,
      status: 'warning',
      category: 'operational',
      unit: '',
      description: 'Number of pending compliance audits'
    },
    {
      id: '5',
      name: 'High Risk Items',
      value: 12,
      previousValue: 8,
      trend: 'up',
      percentage: 50,
      target: 5,
      status: 'critical',
      category: 'risk',
      unit: '',
      description: 'Number of high-risk compliance items'
    },
    {
      id: '6',
      name: 'SAR Reports Filed',
      value: 8,
      previousValue: 6,
      trend: 'up',
      percentage: 33.3,
      target: 10,
      status: 'good',
      category: 'operational',
      unit: '',
      description: 'Suspicious Activity Reports filed this month'
    }
  ]

  const complianceTrends: ComplianceTrend[] = [
    { date: '2024-01-01', overall: 82, gdpr: 85, sox: 78, pci: 90, hipaa: 80, iso27001: 75 },
    { date: '2024-01-08', overall: 84, gdpr: 87, sox: 80, pci: 92, hipaa: 82, iso27001: 77 },
    { date: '2024-01-15', overall: 85, gdpr: 88, sox: 82, pci: 93, hipaa: 84, iso27001: 79 },
    { date: '2024-01-22', overall: 87, gdpr: 90, sox: 85, pci: 95, hipaa: 86, iso27001: 81 }
  ]

  const riskDistribution: RiskDistribution[] = [
    { level: 'low', count: 45, percentage: 60, trend: 'up' },
    { level: 'medium', count: 20, percentage: 27, trend: 'down' },
    { level: 'high', count: 8, percentage: 11, trend: 'stable' },
    { level: 'critical', count: 2, percentage: 2, trend: 'up' }
  ]

  const frameworkPerformance: FrameworkPerformance[] = [
    {
      framework: 'GDPR',
      score: 90,
      previousScore: 88,
      trend: 'up',
      requirements: 25,
      completed: 23,
      pending: 2,
      overdue: 0,
      riskLevel: 'low'
    },
    {
      framework: 'SOX',
      score: 85,
      previousScore: 82,
      trend: 'up',
      requirements: 18,
      completed: 15,
      pending: 3,
      overdue: 0,
      riskLevel: 'low'
    },
    {
      framework: 'PCI-DSS',
      score: 95,
      previousScore: 93,
      trend: 'up',
      requirements: 12,
      completed: 12,
      pending: 0,
      overdue: 0,
      riskLevel: 'low'
    },
    {
      framework: 'HIPAA',
      score: 78,
      previousScore: 80,
      trend: 'down',
      requirements: 20,
      completed: 15,
      pending: 3,
      overdue: 2,
      riskLevel: 'medium'
    },
    {
      framework: 'ISO 27001',
      score: 72,
      previousScore: 75,
      trend: 'down',
      requirements: 30,
      completed: 20,
      pending: 8,
      overdue: 2,
      riskLevel: 'high'
    }
  ]

  const alertTrends: AlertTrend[] = [
    { date: '2024-01-01', total: 15, critical: 2, high: 4, medium: 6, low: 3, resolved: 8 },
    { date: '2024-01-08', total: 18, critical: 3, high: 5, medium: 7, low: 3, resolved: 12 },
    { date: '2024-01-15', total: 12, critical: 1, high: 3, medium: 5, low: 3, resolved: 15 },
    { date: '2024-01-22', total: 10, critical: 1, high: 2, medium: 4, low: 3, resolved: 18 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
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

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'overall': return <Target className="w-5 h-5" />
      case 'framework': return <Shield className="w-5 h-5" />
      case 'risk': return <AlertTriangle className="w-5 h-5" />
      case 'operational': return <Activity className="w-5 h-5" />
      default: return <BarChart3 className="w-5 h-5" />
    }
  }

  const toggleMetricExpansion = (metricId: string) => {
    const newExpanded = new Set(expandedMetrics)
    if (newExpanded.has(metricId)) {
      newExpanded.delete(metricId)
    } else {
      newExpanded.add(metricId)
    }
    setExpandedMetrics(newExpanded)
  }

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100
    if (percentage >= 90) return 'bg-green-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Analytics</h1>
          <p className="text-gray-600 mt-1">Advanced analytics and insights for compliance management</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complianceMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                  {getCategoryIcon(metric.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.value}{metric.unit}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' :
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.percentage > 0 ? '+' : ''}{metric.percentage}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Target</p>
                  <p className="text-sm font-medium text-gray-900">{metric.target}{metric.unit}</p>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(metric.value, metric.target)}`}
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Previous: {metric.previousValue}{metric.unit}</span>
                <button
                  onClick={() => toggleMetricExpansion(metric.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {expandedMetrics.has(metric.id) ? 'Less' : 'More'} Details
                </button>
              </div>

              {expandedMetrics.has(metric.id) && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900 capitalize">{metric.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trend:</span>
                    <span className={`capitalize ${
                      metric.trend === 'up' ? 'text-green-600' :
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.trend}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Change:</span>
                    <span className={`${
                      metric.percentage > 0 ? 'text-green-600' :
                      metric.percentage < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.percentage > 0 ? '+' : ''}{metric.percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'trends', name: 'Trends', icon: TrendingUp },
            { id: 'frameworks', name: 'Frameworks', icon: Shield },
            { id: 'risks', name: 'Risk Analysis', icon: AlertTriangle },
            { id: 'alerts', name: 'Alert Trends', icon: Bell },
            { id: 'custom', name: 'Custom Reports', icon: Settings }
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Score Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Score Trend</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Compliance score trend chart will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Showing {timeRange} data</p>
              </div>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
            <div className="space-y-4">
              {riskDistribution.map((risk) => (
                <div key={risk.level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(risk.level)}`}>
                      {risk.level}
                    </span>
                    <span className="text-sm text-gray-600">{risk.count} items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          risk.level === 'critical' ? 'bg-red-500' :
                          risk.level === 'high' ? 'bg-orange-500' :
                          risk.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${risk.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                      {risk.percentage}%
                    </span>
                    {getTrendIcon(risk.trend)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trends Over Time</h3>
            <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Compliance trends chart will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Interactive chart showing compliance scores over {timeRange}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'frameworks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Framework
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requirements
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {frameworkPerformance.map((framework) => (
                    <tr key={framework.framework} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{framework.framework}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-900">{framework.score}%</span>
                          {getTrendIcon(framework.trend)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {framework.trend}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {framework.completed}/{framework.requirements}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(framework.completed, framework.requirements)}`}
                              style={{ width: `${(framework.completed / framework.requirements) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {Math.round((framework.completed / framework.requirements) * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(framework.riskLevel)}`}>
                          {framework.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
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

      {activeTab === 'risks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Heat Map</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Risk heat map will be displayed here</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Risk trend analysis will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Alert trends chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Reports</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Custom report builder will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Create and schedule custom compliance reports</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComplianceAnalytics
