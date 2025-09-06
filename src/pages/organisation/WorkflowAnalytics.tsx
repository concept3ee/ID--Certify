import React, { useState, useEffect } from 'react'
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Target,
  Zap,
  Brain,
  Eye,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Settings,
  Maximize2,
  Minimize2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Save,
  Share2,
  Bell,
  Mail,
  MessageSquare,
  FileText,
  Database,
  Server,
  Globe,
  Shield,
  Lock,
  Unlock,
  Key,
  User,
  Building,
  Smartphone,
  Monitor,
  Tablet,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  WifiHigh,
  WifiLow,
  WifiMedium,
  WifiOff as WifiOffIcon,
  Wifi as WifiIcon,
  WifiHigh as WifiHighIcon,
  WifiLow as WifiLowIcon,
  WifiMedium as WifiMediumIcon
} from 'lucide-react'

// Types
interface AnalyticsMetric {
  id: string
  name: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  trend: number[]
  unit: string
  description: string
  category: 'performance' | 'efficiency' | 'compliance' | 'user' | 'system'
}

interface WorkflowPerformance {
  id: string
  name: string
  category: string
  totalExecutions: number
  successRate: number
  avgProcessingTime: number
  bottleneckSteps: string[]
  optimizationOpportunities: string[]
  costPerExecution: number
  roi: number
  lastOptimized: string
  performanceScore: number
}

interface UserAnalytics {
  userId: string
  name: string
  role: string
  department: string
  totalApprovals: number
  avgResponseTime: number
  approvalRate: number
  workload: number
  efficiency: number
  lastActivity: string
  performanceTrend: number[]
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  uptime: number
  responseTime: number
  errorRate: number
  activeUsers: number
  systemLoad: number
  memoryUsage: number
  cpuUsage: number
  diskUsage: number
  networkLatency: number
  lastMaintenance: string
  nextMaintenance: string
}

interface ComplianceReport {
  id: string
  name: string
  standard: string
  status: 'compliant' | 'non-compliant' | 'pending'
  score: number
  lastAudit: string
  nextAudit: string
  violations: number
  recommendations: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface PredictiveInsight {
  id: string
  type: 'bottleneck' | 'optimization' | 'risk' | 'opportunity'
  title: string
  description: string
  confidence: number
  impact: 'low' | 'medium' | 'high'
  timeframe: string
  recommendedAction: string
  potentialSavings: number
  aiModel: string
  lastUpdated: string
}

const WorkflowAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'users' | 'compliance' | 'predictions' | 'system'>('overview')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Mock data
  const metrics: AnalyticsMetric[] = [
    {
      id: '1',
      name: 'Total Workflows',
      value: 1247,
      change: 12.5,
      changeType: 'increase',
      trend: [1000, 1050, 1100, 1150, 1200, 1247],
      unit: 'workflows',
      description: 'Total number of active workflows',
      category: 'performance'
    },
    {
      id: '2',
      name: 'Success Rate',
      value: 94.2,
      change: 2.1,
      changeType: 'increase',
      trend: [90, 91, 92, 93, 94, 94.2],
      unit: '%',
      description: 'Overall workflow success rate',
      category: 'performance'
    },
    {
      id: '3',
      name: 'Avg Processing Time',
      value: 2.3,
      change: -15.2,
      changeType: 'decrease',
      trend: [3.5, 3.2, 2.8, 2.5, 2.4, 2.3],
      unit: 'days',
      description: 'Average time to complete workflows',
      category: 'efficiency'
    },
    {
      id: '4',
      name: 'Active Users',
      value: 156,
      change: 8.3,
      changeType: 'increase',
      trend: [140, 145, 150, 152, 154, 156],
      unit: 'users',
      description: 'Number of active workflow users',
      category: 'user'
    },
    {
      id: '5',
      name: 'Compliance Score',
      value: 98.7,
      change: 0.5,
      changeType: 'increase',
      trend: [98, 98.2, 98.4, 98.5, 98.6, 98.7],
      unit: '%',
      description: 'Overall compliance rating',
      category: 'compliance'
    },
    {
      id: '6',
      name: 'System Uptime',
      value: 99.9,
      change: 0.1,
      changeType: 'increase',
      trend: [99.8, 99.8, 99.9, 99.9, 99.9, 99.9],
      unit: '%',
      description: 'System availability',
      category: 'system'
    }
  ]

  const workflowPerformance: WorkflowPerformance[] = [
    {
      id: '1',
      name: 'Employee Onboarding',
      category: 'HR',
      totalExecutions: 456,
      successRate: 96.5,
      avgProcessingTime: 1.8,
      bottleneckSteps: ['Document Verification', 'Background Check'],
      optimizationOpportunities: ['Automate document verification', 'Parallel processing for checks'],
      costPerExecution: 25.50,
      roi: 340,
      lastOptimized: '2024-01-15',
      performanceScore: 92
    },
    {
      id: '2',
      name: 'Financial Approval',
      category: 'Finance',
      totalExecutions: 234,
      successRate: 89.2,
      avgProcessingTime: 3.2,
      bottleneckSteps: ['Executive Approval', 'Budget Validation'],
      optimizationOpportunities: ['Auto-approve low amounts', 'Streamline approval chain'],
      costPerExecution: 45.75,
      roi: 280,
      lastOptimized: '2024-01-10',
      performanceScore: 78
    },
    {
      id: '3',
      name: 'Document Verification',
      category: 'Compliance',
      totalExecutions: 567,
      successRate: 97.8,
      avgProcessingTime: 0.9,
      bottleneckSteps: ['Manual Review'],
      optimizationOpportunities: ['AI-powered document analysis', 'OCR integration'],
      costPerExecution: 12.25,
      roi: 420,
      lastOptimized: '2024-01-18',
      performanceScore: 95
    }
  ]

  const userAnalytics: UserAnalytics[] = [
    {
      userId: '1',
      name: 'Sarah Johnson',
      role: 'HR Manager',
      department: 'Human Resources',
      totalApprovals: 234,
      avgResponseTime: 2.5,
      approvalRate: 94.2,
      workload: 78,
      efficiency: 92,
      lastActivity: '2024-01-20T10:30:00Z',
      performanceTrend: [85, 87, 89, 91, 92, 92]
    },
    {
      userId: '2',
      name: 'Michael Chen',
      role: 'Finance Manager',
      department: 'Finance',
      totalApprovals: 189,
      avgResponseTime: 4.2,
      approvalRate: 87.5,
      workload: 92,
      efficiency: 78,
      lastActivity: '2024-01-19T16:45:00Z',
      performanceTrend: [75, 76, 77, 78, 78, 78]
    },
    {
      userId: '3',
      name: 'Emily Davis',
      role: 'Compliance Officer',
      department: 'Legal',
      totalApprovals: 156,
      avgResponseTime: 1.8,
      approvalRate: 98.7,
      workload: 65,
      efficiency: 96,
      lastActivity: '2024-01-20T09:15:00Z',
      performanceTrend: [94, 95, 95, 96, 96, 96]
    }
  ]

  const systemHealth: SystemHealth = {
    status: 'healthy',
    uptime: 99.9,
    responseTime: 245,
    errorRate: 0.02,
    activeUsers: 156,
    systemLoad: 45,
    memoryUsage: 68,
    cpuUsage: 32,
    diskUsage: 42,
    networkLatency: 12,
    lastMaintenance: '2024-01-15T02:00:00Z',
    nextMaintenance: '2024-02-15T02:00:00Z'
  }

  const complianceReports: ComplianceReport[] = [
    {
      id: '1',
      name: 'GDPR Compliance',
      standard: 'GDPR',
      status: 'compliant',
      score: 98.5,
      lastAudit: '2024-01-10',
      nextAudit: '2024-04-10',
      violations: 0,
      recommendations: ['Update privacy policy', 'Enhance data encryption'],
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'SOX Compliance',
      standard: 'SOX',
      status: 'compliant',
      score: 96.2,
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05',
      violations: 1,
      recommendations: ['Improve audit trail', 'Strengthen access controls'],
      riskLevel: 'medium'
    },
    {
      id: '3',
      name: 'HIPAA Compliance',
      standard: 'HIPAA',
      status: 'non-compliant',
      score: 87.3,
      lastAudit: '2024-01-08',
      nextAudit: '2024-03-08',
      violations: 3,
      recommendations: ['Implement encryption', 'Update access policies', 'Train staff'],
      riskLevel: 'high'
    }
  ]

  const predictiveInsights: PredictiveInsight[] = [
    {
      id: '1',
      type: 'bottleneck',
      title: 'Financial Approval Bottleneck',
      description: 'Executive approval step is causing 40% delays in financial workflows',
      confidence: 0.92,
      impact: 'high',
      timeframe: 'Next 30 days',
      recommendedAction: 'Implement auto-approval for amounts under $10,000',
      potentialSavings: 12500,
      aiModel: 'WorkflowOptimizer v2.1',
      lastUpdated: '2024-01-20T08:00:00Z'
    },
    {
      id: '2',
      type: 'optimization',
      title: 'Document Processing Optimization',
      description: 'AI-powered document analysis could reduce processing time by 60%',
      confidence: 0.87,
      impact: 'medium',
      timeframe: 'Next 60 days',
      recommendedAction: 'Deploy OCR and AI document analysis',
      potentialSavings: 8500,
      aiModel: 'DocumentAI v1.5',
      lastUpdated: '2024-01-19T14:30:00Z'
    },
    {
      id: '3',
      type: 'risk',
      title: 'Compliance Risk Alert',
      description: 'HIPAA compliance score trending downward, intervention needed',
      confidence: 0.95,
      impact: 'high',
      timeframe: 'Next 14 days',
      recommendedAction: 'Immediate compliance review and remediation',
      potentialSavings: -25000,
      aiModel: 'ComplianceMonitor v3.0',
      lastUpdated: '2024-01-20T06:00:00Z'
    }
  ]

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return <ArrowUp className="w-4 h-4 text-green-500" />
      case 'decrease': return <ArrowDown className="w-4 h-4 text-red-500" />
      default: return <ArrowRight className="w-4 h-4 text-gray-500" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600'
      case 'decrease': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      case 'compliant': return 'bg-green-100 text-green-800'
      case 'non-compliant': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'bottleneck': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'optimization': return <Zap className="w-5 h-5 text-blue-500" />
      case 'risk': return <Shield className="w-5 h-5 text-orange-500" />
      case 'opportunity': return <Target className="w-5 h-5 text-green-500" />
      default: return <Brain className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Analytics</h1>
              <p className="text-gray-600 mt-1">Advanced analytics and business intelligence for workflow optimization</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                    autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                  <span>Auto-refresh</span>
                </button>
              </div>
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'performance', label: 'Performance', icon: TrendingUp },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'compliance', label: 'Compliance', icon: Shield },
              { id: 'predictions', label: 'AI Insights', icon: Brain },
              { id: 'system', label: 'System Health', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex items-center space-x-1">
                      {getChangeIcon(metric.changeType)}
                      <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{metric.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Workflows</h3>
                <div className="space-y-4">
                  {workflowPerformance.slice(0, 3).map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{workflow.performanceScore}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                          <p className="text-sm text-gray-600">{workflow.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{workflow.successRate}%</p>
                        <p className="text-xs text-gray-600">Success Rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(systemHealth.status)}`}>
                      {systemHealth.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.uptime}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.responseTime}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.activeUsers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.errorRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Performance Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Executions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workflowPerformance.map((workflow) => (
                      <tr key={workflow.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                            <div className="text-sm text-gray-500">{workflow.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.totalExecutions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.successRate}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.avgProcessingTime}d</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${workflow.performanceScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{workflow.performanceScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.roi}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">Optimize</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Performance Analytics</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approvals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userAnalytics.map((user) => (
                      <tr key={user.userId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.department}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalApprovals}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.avgResponseTime}h</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.approvalRate}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${user.efficiency}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{user.efficiency}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
                                style={{ width: `${user.workload}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{user.workload}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Reports</h3>
              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.standard} Standard</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(report.riskLevel)}`}>
                          {report.riskLevel} risk
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Score</p>
                        <p className="text-lg font-bold text-gray-900">{report.score}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Violations</p>
                        <p className="text-lg font-bold text-gray-900">{report.violations}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Audit</p>
                        <p className="text-sm text-gray-900">{new Date(report.lastAudit).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Audit</p>
                        <p className="text-sm text-gray-900">{new Date(report.nextAudit).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {report.recommendations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Recommendations:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {report.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-600">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Insights</h3>
              <div className="space-y-4">
                {predictiveInsights.map((insight) => (
                  <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round(insight.confidence * 100)}% confidence
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{insight.timeframe}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Recommended Action:</strong> {insight.recommendedAction}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">Potential Savings: <span className={`font-medium ${insight.potentialSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>${Math.abs(insight.potentialSavings).toLocaleString()}</span></span>
                        <span className="text-gray-600">AI Model: {insight.aiModel}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                          Apply Insight
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">System Load</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${systemHealth.systemLoad}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{systemHealth.systemLoad}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Memory Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${systemHealth.memoryUsage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{systemHealth.memoryUsage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">CPU Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${systemHealth.cpuUsage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{systemHealth.cpuUsage}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Disk Usage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${systemHealth.diskUsage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{systemHealth.diskUsage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Network & Connectivity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.responseTime}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Network Latency</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.networkLatency}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Error Rate</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.errorRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Users</span>
                    <span className="text-sm font-medium text-gray-900">{systemHealth.activeUsers}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Last Maintenance</h4>
                  <p className="text-sm text-gray-600">{new Date(systemHealth.lastMaintenance).toLocaleString()}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Next Maintenance</h4>
                  <p className="text-sm text-gray-600">{new Date(systemHealth.nextMaintenance).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowAnalytics
