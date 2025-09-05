import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  FileText, 
  Download, 
  Calendar,
  Bell,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Building,
  Globe,
  Target,
  Zap,
  Eye,
  Settings,
  RefreshCw,
  Filter,
  Search,
  Plus,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Info,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Monitor
} from 'lucide-react'
import RegulatoryComplianceManager from './RegulatoryComplianceManager'
import ComplianceCalendar from './ComplianceCalendar'
import AdvancedRiskAssessment from './AdvancedRiskAssessment'
import SuspiciousActivityReporting from './SuspiciousActivityReporting'
import ComplianceAnalytics from './ComplianceAnalytics'
import RiskAnalytics from './RiskAnalytics'
import RegulatoryReporting from './RegulatoryReporting'
import BusinessIntelligence from './BusinessIntelligence'

interface ComplianceFramework {
  id: string
  name: string
  jurisdiction: string
  status: 'compliant' | 'at-risk' | 'non-compliant' | 'pending'
  score: number
  lastAudit: string
  nextAudit: string
  requirements: number
  completed: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  category: 'data-protection' | 'financial' | 'operational' | 'regulatory'
}

interface ComplianceAlert {
  id: string
  type: 'deadline' | 'violation' | 'update' | 'audit'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  framework: string
  dueDate: string
  status: 'new' | 'acknowledged' | 'resolved'
}

interface ComplianceMetric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  target: number
  unit: string
}

const EnhancedComplianceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'frameworks' | 'alerts' | 'analytics' | 'regulatory' | 'calendar' | 'risk' | 'sar' | 'compliance-analytics' | 'risk-analytics' | 'regulatory-reporting' | 'business-intelligence'>('overview')
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')


  // Mock data - in real implementation, this would come from API
  const frameworks: ComplianceFramework[] = [
    {
      id: '1',
      name: 'GDPR',
      jurisdiction: 'EU',
      status: 'compliant',
      score: 95,
      lastAudit: '2024-01-15',
      nextAudit: '2024-04-15',
      requirements: 45,
      completed: 43,
      riskLevel: 'low',
      category: 'data-protection'
    },
    {
      id: '2',
      name: 'SOX',
      jurisdiction: 'US',
      status: 'at-risk',
      score: 78,
      lastAudit: '2024-01-10',
      nextAudit: '2024-02-10',
      requirements: 32,
      completed: 25,
      riskLevel: 'medium',
      category: 'financial'
    },
    {
      id: '3',
      name: 'PCI-DSS',
      jurisdiction: 'Global',
      status: 'compliant',
      score: 92,
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05',
      requirements: 28,
      completed: 26,
      riskLevel: 'low',
      category: 'operational'
    },
    {
      id: '4',
      name: 'HIPAA',
      jurisdiction: 'US',
      status: 'non-compliant',
      score: 45,
      lastAudit: '2024-01-20',
      nextAudit: '2024-01-30',
      requirements: 38,
      completed: 17,
      riskLevel: 'high',
      category: 'data-protection'
    },
    {
      id: '5',
      name: 'ISO 27001',
      jurisdiction: 'Global',
      status: 'pending',
      score: 65,
      lastAudit: '2023-12-15',
      nextAudit: '2024-02-15',
      requirements: 52,
      completed: 34,
      riskLevel: 'medium',
      category: 'operational'
    }
  ]

  // Risk distribution data for analytics
  const riskDistribution = [
    { level: 'critical', count: 3, percentage: 15, trend: 'down' },
    { level: 'high', count: 8, percentage: 25, trend: 'up' },
    { level: 'medium', count: 12, percentage: 35, trend: 'stable' },
    { level: 'low', count: 7, percentage: 25, trend: 'down' }
  ]

  // Helper function for trend icons
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />
      default: return <div className="w-4 h-4" />
    }
  }

  const alerts: ComplianceAlert[] = [
    {
      id: '1',
      type: 'deadline',
      severity: 'high',
      title: 'HIPAA Audit Due',
      description: 'Annual HIPAA compliance audit is due in 5 days',
      framework: 'HIPAA',
      dueDate: '2024-01-30',
      status: 'new'
    },
    {
      id: '2',
      type: 'violation',
      severity: 'critical',
      title: 'Data Breach Notification',
      description: 'Potential data breach detected in customer database',
      framework: 'GDPR',
      dueDate: '2024-01-25',
      status: 'acknowledged'
    },
    {
      id: '3',
      type: 'update',
      severity: 'medium',
      title: 'SOX Requirements Updated',
      description: 'New SOX requirements published by SEC',
      framework: 'SOX',
      dueDate: '2024-02-15',
      status: 'new'
    }
  ]

  const metrics: ComplianceMetric[] = [
    {
      name: 'Overall Compliance Score',
      value: 75,
      change: 5,
      trend: 'up',
      target: 90,
      unit: '%'
    },
    {
      name: 'Active Frameworks',
      value: 5,
      change: 0,
      trend: 'stable',
      target: 5,
      unit: ''
    },
    {
      name: 'Requirements Completed',
      value: 145,
      change: 12,
      trend: 'up',
      target: 195,
      unit: ''
    },
    {
      name: 'Pending Audits',
      value: 3,
      change: -1,
      trend: 'down',
      target: 0,
      unit: ''
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100'
      case 'at-risk': return 'text-yellow-600 bg-yellow-100'
      case 'non-compliant': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'data-protection': return <Shield className="w-5 h-5" />
      case 'financial': return <Building className="w-5 h-5" />
      case 'operational': return <Activity className="w-5 h-5" />
      case 'regulatory': return <Globe className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Calendar className="w-5 h-5" />
      case 'violation': return <AlertTriangle className="w-5 h-5" />
      case 'update': return <Bell className="w-5 h-5" />
      case 'audit': return <FileText className="w-5 h-5" />
      default: return <Info className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage regulatory compliance across all frameworks</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metric.value}{metric.unit}
                </p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <Activity className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Target: {metric.target}{metric.unit}</span>
                <span>{Math.round((metric.value / metric.target) * 100)}%</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'frameworks', name: 'Frameworks', icon: Shield },
            { id: 'alerts', name: 'Alerts', icon: Bell },
            { id: 'analytics', name: 'Analytics', icon: PieChart },
            { id: 'regulatory', name: 'Regulatory', icon: FileText },
            { id: 'calendar', name: 'Calendar', icon: Calendar },
            { id: 'risk', name: 'Risk Assessment', icon: Target },
            { id: 'sar', name: 'SAR Reporting', icon: AlertTriangle },
            { id: 'compliance-analytics', name: 'Compliance Analytics', icon: BarChart3 },
            { id: 'risk-analytics', name: 'Risk Analytics', icon: TrendingUp },
            { id: 'regulatory-reporting', name: 'Regulatory Reporting', icon: FileText },
            { id: 'business-intelligence', name: 'Business Intelligence', icon: Monitor }
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compliance Status Overview */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Status</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {frameworks.map((framework) => (
                <div key={framework.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                      {getCategoryIcon(framework.category)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{framework.name}</h4>
                      <p className="text-sm text-gray-600">{framework.jurisdiction}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{framework.score}%</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(framework.status)}`}>
                          {framework.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{framework.completed}/{framework.requirements} requirements</p>
                    </div>
                    <div className="w-16">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            framework.score >= 90 ? 'bg-green-500' : 
                            framework.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${framework.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {alerts.filter(a => a.status === 'new').length} new
              </span>
            </div>
            <div className="space-y-4">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getSeverityColor(alert.severity)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{alert.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{alert.framework}</span>
                      <span className="text-xs text-gray-500">{alert.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Alerts
            </button>
          </div>
        </div>
      )}

      {activeTab === 'frameworks' && (
        <div className="space-y-6">
          {/* Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework) => (
              <div key={framework.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                      {getCategoryIcon(framework.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                      <p className="text-sm text-gray-600">{framework.jurisdiction}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(framework.riskLevel)}`}>
                    {framework.riskLevel}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                      <span className="text-sm font-bold text-gray-900">{framework.score}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          framework.score >= 90 ? 'bg-green-500' : 
                          framework.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${framework.score}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Requirements</p>
                      <p className="font-medium text-gray-900">{framework.completed}/{framework.requirements}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Audit</p>
                      <p className="font-medium text-gray-900">{framework.nextAudit}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                      View Details
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          {/* Alert Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Alerts Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Compliance Alerts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alert
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Framework
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getSeverityColor(alert.severity)}`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                            <div className="text-sm text-gray-500">{alert.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {alert.framework}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {alert.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          alert.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.status}
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

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Trends */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center w-full">
                <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                <div className="text-sm text-gray-600 mb-4">Overall Compliance Score</div>
                <div className="flex items-center justify-center space-x-4 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">+3.2%</span>
                  </div>
                  <span className="text-gray-400">vs last month</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">GDPR</div>
                    <div className="text-green-600">92%</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">SOX</div>
                    <div className="text-blue-600">85%</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">PCI</div>
                    <div className="text-green-600">95%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="w-full space-y-4">
                {riskDistribution.map((risk) => (
                  <div key={risk.level} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(risk.level)}`}>
                        {risk.level}
                      </span>
                      <span className="text-sm text-gray-600">{risk.count} items</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            risk.level === 'critical' ? 'bg-red-500' :
                            risk.level === 'high' ? 'bg-orange-500' :
                            risk.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${risk.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {risk.percentage}%
                      </span>
                      {getTrendIcon(risk.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Framework Performance */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Performance</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {frameworks.slice(0, 3).map((framework) => (
                    <div key={framework.id} className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{framework.score}%</div>
                      <div className="text-sm text-gray-600 mb-2">{framework.name}</div>
                      <div className="bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${
                            framework.score >= 90 ? 'bg-green-500' : 
                            framework.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${framework.score}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {framework.completed}/{framework.requirements} requirements
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'regulatory' && (
        <RegulatoryComplianceManager />
      )}

      {activeTab === 'calendar' && (
        <ComplianceCalendar />
      )}

      {activeTab === 'risk' && (
        <AdvancedRiskAssessment />
      )}

      {activeTab === 'sar' && (
        <SuspiciousActivityReporting />
      )}

      {activeTab === 'compliance-analytics' && (
        <ComplianceAnalytics />
      )}

      {activeTab === 'risk-analytics' && (
        <RiskAnalytics />
      )}

      {activeTab === 'regulatory-reporting' && (
        <RegulatoryReporting />
      )}

      {activeTab === 'business-intelligence' && (
        <BusinessIntelligence />
      )}
    </div>
  )
}

export default EnhancedComplianceDashboard
