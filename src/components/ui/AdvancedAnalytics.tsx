import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react'

interface AnalyticsData {
  period: string
  verifications: {
    total: number
    completed: number
    pending: number
    failed: number
    trend: number
  }
  compliance: {
    score: number
    trend: number
    violations: number
    lastAudit: string
  }
  performance: {
    avgProcessingTime: number
    trend: number
    throughput: number
    efficiency: number
  }
  team: {
    activeUsers: number
    productivity: number
    training: number
    satisfaction: number
  }
}

interface AdvancedAnalyticsProps {
  onExport?: (data: AnalyticsData) => void
  onRefresh?: () => void
}

const AdvancedAnalytics = ({ onExport, onRefresh }: AdvancedAnalyticsProps) => {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'verifications', 'compliance', 'performance', 'team'
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'comparative'>('overview')

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedPeriod])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setData({
        period: selectedPeriod,
        verifications: {
          total: 1247,
          completed: 1156,
          pending: 67,
          failed: 24,
          trend: 12.5
        },
        compliance: {
          score: 94.2,
          trend: 2.1,
          violations: 3,
          lastAudit: '2024-01-15'
        },
        performance: {
          avgProcessingTime: 2.3,
          trend: -15.2,
          throughput: 89.4,
          efficiency: 92.1
        },
        team: {
          activeUsers: 24,
          productivity: 87.3,
          training: 12,
          satisfaction: 4.6
        }
      })
      setIsLoading(false)
    }, 1000)
  }

  const periods = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: '1y', label: 'Last Year' }
  ]

  const metrics = [
    { id: 'verifications', label: 'Verifications', icon: Shield },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'team', label: 'Team', icon: Users }
  ]

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'text-green-600' : 'text-red-600'
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(period => (
                <option key={period.id} value={period.id}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'detailed', label: 'Detailed', icon: BarChart3 },
              { id: 'comparative', label: 'Compare', icon: TrendingUp }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === mode.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <mode.icon className="h-4 w-4" />
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={loadAnalyticsData}
              disabled={isLoading}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => onExport?.(data)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Show Metrics:</span>
        {metrics.map(metric => (
          <label key={metric.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedMetrics([...selectedMetrics, metric.id])
                } else {
                  setSelectedMetrics(selectedMetrics.filter(m => m !== metric.id))
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <metric.icon className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">{metric.label}</span>
          </label>
        ))}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {selectedMetrics.includes('verifications') && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Verifications</h3>
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(data.verifications.trend)}`}>
                {getTrendIcon(data.verifications.trend)}
                <span className="text-sm font-medium">{formatPercentage(data.verifications.trend)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-semibold">{formatNumber(data.verifications.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-green-600 font-medium">{formatNumber(data.verifications.completed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-orange-600 font-medium">{formatNumber(data.verifications.pending)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Failed</span>
                <span className="text-red-600 font-medium">{formatNumber(data.verifications.failed)}</span>
              </div>
            </div>
          </div>
        )}

        {selectedMetrics.includes('compliance') && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Compliance</h3>
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(data.compliance.trend)}`}>
                {getTrendIcon(data.compliance.trend)}
                <span className="text-sm font-medium">{formatPercentage(data.compliance.trend)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Score</span>
                <span className="font-semibold text-2xl">{data.compliance.score}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Violations</span>
                <span className="text-red-600 font-medium">{data.compliance.violations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Audit</span>
                <span className="text-sm text-gray-500">{data.compliance.lastAudit}</span>
              </div>
            </div>
          </div>
        )}

        {selectedMetrics.includes('performance') && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Performance</h3>
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(data.performance.trend)}`}>
                {getTrendIcon(data.performance.trend)}
                <span className="text-sm font-medium">{formatPercentage(data.performance.trend)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Time</span>
                <span className="font-semibold">{data.performance.avgProcessingTime}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Throughput</span>
                <span className="text-green-600 font-medium">{data.performance.throughput}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Efficiency</span>
                <span className="text-blue-600 font-medium">{data.performance.efficiency}%</span>
              </div>
            </div>
          </div>
        )}

        {selectedMetrics.includes('team') && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Team</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="font-semibold">{data.team.activeUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Productivity</span>
                <span className="text-green-600 font-medium">{data.team.productivity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Training</span>
                <span className="text-blue-600 font-medium">{data.team.training}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Satisfaction</span>
                <span className="text-yellow-600 font-medium">{data.team.satisfaction}/5</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed View */}
      {viewMode === 'detailed' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart Placeholder */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Performance chart would be displayed here</p>
              </div>
            </div>
          </div>

          {/* Compliance Timeline */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Timeline</h3>
            <div className="space-y-4">
              {[
                { date: '2024-01-15', event: 'Monthly Audit', status: 'completed', score: 94.2 },
                { date: '2024-01-10', event: 'Security Review', status: 'completed', score: 96.1 },
                { date: '2024-01-05', event: 'Policy Update', status: 'completed', score: 92.8 },
                { date: '2023-12-20', event: 'Year-end Review', status: 'completed', score: 89.5 }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.event}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <div className="text-sm text-gray-600">Score: {item.score}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Comparative View */}
      {viewMode === 'comparative' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Period Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { period: 'Previous Period', verifications: 1100, compliance: 92.1, performance: 85.2 },
              { period: 'Current Period', verifications: 1247, compliance: 94.2, performance: 89.4 },
              { period: 'Change', verifications: '+13.4%', compliance: '+2.3%', performance: '+4.9%' }
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                index === 2 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}>
                <h4 className="font-semibold text-gray-900 mb-3">{item.period}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Verifications</span>
                    <span className="font-medium">{item.verifications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Compliance</span>
                    <span className="font-medium">{item.compliance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Performance</span>
                    <span className="font-medium">{item.performance}%</span>
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

export default AdvancedAnalytics
