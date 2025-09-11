import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Filter,
  Calendar,
  Eye,
  RefreshCw
} from 'lucide-react'

interface VerificationAnalyticsProps {
  onExportData?: (format: 'csv' | 'json' | 'pdf') => void
  onViewDetails?: (metric: string) => void
  onClose?: () => void
}

const VerificationAnalytics: React.FC<VerificationAnalyticsProps> = ({
  onExportData,
  onViewDetails,
  onClose
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<string>('all')

  // Mock data - in real app, this would come from API
  const analyticsData = {
    overview: {
      totalVerifications: 1247,
      successRate: 94.2,
      avgProcessingTime: 2.3,
      totalRevenue: 18450
    },
    trends: {
      verifications: [
        { date: '2024-01-01', count: 45, success: 42, failed: 3 },
        { date: '2024-01-02', count: 52, success: 49, failed: 3 },
        { date: '2024-01-03', count: 38, success: 36, failed: 2 },
        { date: '2024-01-04', count: 61, success: 58, failed: 3 },
        { date: '2024-01-05', count: 48, success: 45, failed: 3 },
        { date: '2024-01-06', count: 55, success: 52, failed: 3 },
        { date: '2024-01-07', count: 42, success: 40, failed: 2 }
      ]
    },
    breakdown: {
      byType: [
        { type: 'Identity Verification', count: 456, percentage: 36.6 },
        { type: 'Document Verification', count: 389, percentage: 31.2 },
        { type: 'Address Verification', count: 234, percentage: 18.8 },
        { type: 'Phone Verification', count: 168, percentage: 13.4 }
      ],
      byStatus: [
        { status: 'Completed', count: 1174, percentage: 94.2, color: 'green' },
        { status: 'Failed', count: 48, percentage: 3.9, color: 'red' },
        { status: 'Pending', count: 25, percentage: 2.0, color: 'yellow' }
      ]
    },
    performance: {
      avgResponseTime: 2.3,
      peakHour: '14:00-15:00',
      slowestDay: 'Sunday',
      fastestDay: 'Tuesday'
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Track flow performance, usage metrics, and get actionable insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={() => onExportData?.('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalVerifications)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12.5%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.successRate}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+2.1%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.avgProcessingTime}s</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">-0.3s</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+8.7%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Trends */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Verification Trends</h3>
            <button
              onClick={() => onViewDetails?.('trends')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Status Breakdown</h3>
            <button
              onClick={() => onViewDetails?.('status')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
          <div className="space-y-4">
            {analyticsData.breakdown.byStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.color === 'green' ? 'bg-green-500' :
                    item.color === 'red' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">{item.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{formatNumber(item.count)}</span>
                  <span className="text-sm text-gray-500">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
          <button
            onClick={() => onViewDetails?.('performance')}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{analyticsData.performance.avgResponseTime}s</div>
            <div className="text-sm text-gray-600">Average Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{analyticsData.performance.peakHour}</div>
            <div className="text-sm text-gray-600">Peak Hour</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{analyticsData.performance.slowestDay}</div>
            <div className="text-sm text-gray-600">Slowest Day</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{analyticsData.performance.fastestDay}</div>
            <div className="text-sm text-gray-600">Fastest Day</div>
          </div>
        </div>
      </div>

      {/* Verification Types Breakdown */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Verification Types</h3>
          <button
            onClick={() => onViewDetails?.('types')}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
        <div className="space-y-4">
          {analyticsData.breakdown.byType.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-gray-700">{item.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{formatNumber(item.count)}</span>
                <span className="text-sm text-gray-500">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerificationAnalytics
