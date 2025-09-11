import React, { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  PieChart, 
  BarChart3,
  Download,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  CreditCard,
  Target,
  Zap
} from 'lucide-react'

interface VerificationCostManagementProps {
  onExportData?: (format: 'csv' | 'json' | 'pdf') => void
  onViewDetails?: (metric: string) => void
  onClose?: () => void
}

const VerificationCostManagement: React.FC<VerificationCostManagementProps> = ({
  onExportData,
  onViewDetails,
  onClose
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedView, setSelectedView] = useState<'overview' | 'breakdown' | 'optimization'>('overview')

  // Mock data - in real app, this would come from API
  const costData = {
    overview: {
      totalCost: 18450,
      totalVerifications: 1247,
      avgCostPerVerification: 14.8,
      monthlyBudget: 25000,
      budgetUtilization: 73.8
    },
    breakdown: {
      byType: [
        { type: 'Identity Verification', cost: 6840, count: 456, avgCost: 15.0, percentage: 37.1 },
        { type: 'Document Verification', cost: 5835, count: 389, avgCost: 15.0, percentage: 31.6 },
        { type: 'Address Verification', cost: 3510, count: 234, avgCost: 15.0, percentage: 19.0 },
        { type: 'Phone Verification', count: 168, cost: 2265, avgCost: 13.5, percentage: 12.3 }
      ],
      byProvider: [
        { provider: 'Primary Provider', cost: 12915, percentage: 70.0, avgCost: 14.5 },
        { provider: 'Backup Provider', cost: 3690, percentage: 20.0, avgCost: 16.2 },
        { provider: 'Premium Provider', cost: 1845, percentage: 10.0, avgCost: 18.5 }
      ]
    },
    trends: {
      daily: [
        { date: '2024-01-01', cost: 675, verifications: 45 },
        { date: '2024-01-02', cost: 780, verifications: 52 },
        { date: '2024-01-03', cost: 570, verifications: 38 },
        { date: '2024-01-04', cost: 915, verifications: 61 },
        { date: '2024-01-05', cost: 720, verifications: 48 },
        { date: '2024-01-06', cost: 825, verifications: 55 },
        { date: '2024-01-07', cost: 630, verifications: 42 }
      ]
    },
    optimization: {
      potentialSavings: 2767,
      recommendations: [
        {
          type: 'Provider Optimization',
          description: 'Switch 20% of verifications to backup provider',
          savings: 1845,
          impact: 'Medium',
          effort: 'Low'
        },
        {
          type: 'Batch Processing',
          description: 'Implement batch processing for non-urgent verifications',
          savings: 922,
          impact: 'High',
          effort: 'Medium'
        }
      ],
      alerts: [
        {
          type: 'warning',
          message: 'Monthly budget utilization at 73.8%',
          action: 'Consider increasing budget or optimizing costs'
        },
        {
          type: 'info',
          message: 'Premium provider usage is high',
          action: 'Review if premium features are necessary'
        }
      ]
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const getBudgetColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600'
    if (utilization >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getBudgetBgColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-red-100'
    if (utilization >= 75) return 'bg-yellow-100'
    return 'bg-green-100'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Management</h1>
          <p className="text-gray-600 mt-1">Monitor verification costs, pricing, and optimize spending</p>
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

      {/* View Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'overview', name: 'Overview', icon: PieChart },
          { id: 'breakdown', name: 'Breakdown', icon: BarChart3 },
          { id: 'optimization', name: 'Optimization', icon: Target }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedView(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedView === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedView === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cost</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(costData.overview.totalCost)}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-red-600 font-medium">+5.2%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Cost per Verification</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(costData.overview.avgCostPerVerification)}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">-2.1%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
                  <p className={`text-2xl font-bold ${getBudgetColor(costData.overview.budgetUtilization)}`}>
                    {costData.overview.budgetUtilization}%
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${getBudgetBgColor(costData.overview.budgetUtilization)}`}>
                  <Target className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      costData.overview.budgetUtilization >= 90 ? 'bg-red-500' :
                      costData.overview.budgetUtilization >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${costData.overview.budgetUtilization}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatCurrency(costData.overview.totalCost)} of {formatCurrency(costData.overview.monthlyBudget)}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Verifications</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(costData.overview.totalVerifications)}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+12.5%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
          </div>

          {/* Cost Trends Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Cost Trends</h3>
              <button
                onClick={() => onViewDetails?.('trends')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <BarChart3 className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Cost trend chart would go here</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Breakdown Tab */}
      {selectedView === 'breakdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost by Type */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Cost by Verification Type</h3>
              <button
                onClick={() => onViewDetails?.('types')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <PieChart className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
            <div className="space-y-4">
              {costData.breakdown.byType.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-600">{formatNumber(item.count)} verifications</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(item.cost)}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(item.avgCost)} avg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost by Provider */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Cost by Provider</h3>
              <button
                onClick={() => onViewDetails?.('providers')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <PieChart className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
            <div className="space-y-4">
              {costData.breakdown.byProvider.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.provider}</p>
                    <p className="text-sm text-gray-600">{item.percentage}% of total</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(item.cost)}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(item.avgCost)} avg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Optimization Tab */}
      {selectedView === 'optimization' && (
        <>
          {/* Potential Savings */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Potential Savings</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {formatCurrency(costData.optimization.potentialSavings)}
                </p>
                <p className="text-gray-600 mt-1">Available through optimization</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Optimization Recommendations</h3>
              <button
                onClick={() => onViewDetails?.('recommendations')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>View All</span>
              </button>
            </div>
            <div className="space-y-4">
              {costData.optimization.recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{rec.type}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.impact === 'High' ? 'bg-green-100 text-green-800' :
                          rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {rec.impact} Impact
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.effort === 'Low' ? 'bg-green-100 text-green-800' :
                          rec.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {rec.effort} Effort
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(rec.savings)}</p>
                      <p className="text-sm text-gray-600">potential savings</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Alerts</h3>
            <div className="space-y-3">
              {costData.optimization.alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full mr-3 ${
                      alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {alert.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Configure Budget</span>
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

export default VerificationCostManagement
