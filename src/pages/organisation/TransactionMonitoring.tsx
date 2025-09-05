import React, { useState } from 'react'
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  CreditCard,
  Building,
  Users,
  Globe,
  Shield,
  Flag,
  Zap,
  Target,
  Info,
  ExternalLink,
  RefreshCw,
  Bell,
  FileText,
  Settings,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRightLeft
} from 'lucide-react'

interface Transaction {
  id: string
  customerId: string
  customerName: string
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'exchange'
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed' | 'suspended'
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  suspiciousFlags: string[]
  timestamp: string
  sourceAccount: string
  destinationAccount: string
  description: string
  location: string
  ipAddress: string
  deviceFingerprint: string
  counterparty: string
  counterpartyType: 'individual' | 'entity' | 'unknown'
  counterpartyRisk: 'low' | 'medium' | 'high' | 'critical'
  patterns: TransactionPattern[]
  alerts: TransactionAlert[]
  investigationStatus: 'none' | 'pending' | 'in-progress' | 'resolved' | 'escalated'
  assignedTo?: string
  notes?: string
}

interface TransactionPattern {
  id: string
  type: 'velocity' | 'amount' | 'frequency' | 'geographic' | 'time' | 'counterparty'
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  detectedAt: string
  details: string
}

interface TransactionAlert {
  id: string
  type: 'suspicious' | 'unusual' | 'high-risk' | 'sanctions' | 'pep' | 'velocity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  triggeredAt: string
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'false-positive'
  assignedTo?: string
  resolution?: string
}

interface MonitoringRule {
  id: string
  name: string
  description: string
  type: 'amount' | 'frequency' | 'velocity' | 'geographic' | 'counterparty' | 'pattern'
  status: 'active' | 'inactive' | 'testing'
  threshold: number
  conditions: string[]
  actions: string[]
  lastTriggered: string
  triggerCount: number
  falsePositiveRate: number
}

const TransactionMonitoring = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'alerts' | 'patterns' | 'rules' | 'analytics'>('overview')
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)
  const [expandedTransactions, setExpandedTransactions] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h')

  // Mock data - in real implementation, this would come from API
  const transactions: Transaction[] = [
    {
      id: '1',
      customerId: '1',
      customerName: 'John Smith',
      type: 'transfer',
      amount: 50000,
      currency: 'USD',
      status: 'completed',
      riskScore: 85,
      riskLevel: 'high',
      suspiciousFlags: ['high-amount', 'unusual-pattern', 'high-risk-counterparty'],
      timestamp: '2024-01-20T14:30:00Z',
      sourceAccount: 'ACC-001',
      destinationAccount: 'ACC-002',
      description: 'Business transfer to offshore account',
      location: 'New York, US',
      ipAddress: '192.168.1.100',
      deviceFingerprint: 'DEV-12345',
      counterparty: 'Offshore Holdings Ltd',
      counterpartyType: 'entity',
      counterpartyRisk: 'high',
      patterns: [
        {
          id: '1-1',
          type: 'amount',
          description: 'Transaction amount exceeds normal threshold',
          severity: 'high',
          detectedAt: '2024-01-20T14:30:00Z',
          details: 'Amount $50,000 is 500% above customer average'
        },
        {
          id: '1-2',
          type: 'counterparty',
          description: 'High-risk counterparty detected',
          severity: 'critical',
          detectedAt: '2024-01-20T14:30:00Z',
          details: 'Counterparty flagged in sanctions database'
        }
      ],
      alerts: [
        {
          id: '1-1',
          type: 'suspicious',
          severity: 'high',
          title: 'High-Value Transfer to High-Risk Counterparty',
          description: 'Large transfer to entity with sanctions history',
          triggeredAt: '2024-01-20T14:30:00Z',
          status: 'investigating',
          assignedTo: 'Sarah Johnson'
        }
      ],
      investigationStatus: 'in-progress',
      assignedTo: 'Sarah Johnson',
      notes: 'Under investigation for potential sanctions violation'
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'TechCorp Solutions Ltd',
      type: 'payment',
      amount: 15000,
      currency: 'USD',
      status: 'completed',
      riskScore: 45,
      riskLevel: 'medium',
      suspiciousFlags: ['velocity'],
      timestamp: '2024-01-20T10:15:00Z',
      sourceAccount: 'ACC-003',
      destinationAccount: 'ACC-004',
      description: 'Payment to supplier',
      location: 'London, UK',
      ipAddress: '192.168.1.200',
      deviceFingerprint: 'DEV-67890',
      counterparty: 'Supplier Corp',
      counterpartyType: 'entity',
      counterpartyRisk: 'low',
      patterns: [
        {
          id: '2-1',
          type: 'velocity',
          description: 'Unusual transaction velocity',
          severity: 'medium',
          detectedAt: '2024-01-20T10:15:00Z',
          details: '5 transactions in 1 hour vs normal 1 per day'
        }
      ],
      alerts: [
        {
          id: '2-1',
          type: 'unusual',
          severity: 'medium',
          title: 'Unusual Transaction Velocity',
          description: 'Multiple transactions in short time period',
          triggeredAt: '2024-01-20T10:15:00Z',
          status: 'acknowledged'
        }
      ],
      investigationStatus: 'none'
    }
  ]

  const monitoringRules: MonitoringRule[] = [
    {
      id: '1',
      name: 'High-Value Transaction Alert',
      description: 'Alert on transactions exceeding $25,000',
      type: 'amount',
      status: 'active',
      threshold: 25000,
      conditions: ['amount > 25000', 'currency = USD'],
      actions: ['alert', 'flag', 'review'],
      lastTriggered: '2024-01-20T14:30:00Z',
      triggerCount: 15,
      falsePositiveRate: 0.2
    },
    {
      id: '2',
      name: 'Velocity Monitoring',
      description: 'Monitor transaction frequency patterns',
      type: 'velocity',
      status: 'active',
      threshold: 5,
      conditions: ['transactions_per_hour > 5'],
      actions: ['alert', 'review'],
      lastTriggered: '2024-01-20T10:15:00Z',
      triggerCount: 8,
      falsePositiveRate: 0.3
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'suspended': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-100'
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100'
      case 'investigating': return 'text-orange-600 bg-orange-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      case 'false-positive': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getInvestigationStatusColor = (status: string) => {
    switch (status) {
      case 'none': return 'text-gray-600 bg-gray-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      case 'escalated': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="w-4 h-4" />
      case 'withdrawal': return <ArrowUpRight className="w-4 h-4" />
      case 'transfer': return <ArrowRightLeft className="w-4 h-4" />
      case 'payment': return <CreditCard className="w-4 h-4" />
      case 'exchange': return <RefreshCw className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getPatternTypeIcon = (type: string) => {
    switch (type) {
      case 'velocity': return <TrendingUp className="w-4 h-4" />
      case 'amount': return <DollarSign className="w-4 h-4" />
      case 'frequency': return <Clock className="w-4 h-4" />
      case 'geographic': return <Globe className="w-4 h-4" />
      case 'time': return <Calendar className="w-4 h-4" />
      case 'counterparty': return <Users className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const toggleTransactionExpansion = (transactionId: string) => {
    const newExpanded = new Set(expandedTransactions)
    if (newExpanded.has(transactionId)) {
      newExpanded.delete(transactionId)
    } else {
      newExpanded.add(transactionId)
    }
    setExpandedTransactions(newExpanded)
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = filterRiskLevel === 'all' || transaction.riskLevel === filterRiskLevel
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    const matchesType = filterType === 'all' || transaction.type === filterType
    return matchesSearch && matchesRisk && matchesStatus && matchesType
  })

  const totalTransactions = transactions.length
  const highRiskTransactions = transactions.filter(t => t.riskLevel === 'high' || t.riskLevel === 'critical').length
  const pendingAlerts = transactions.reduce((sum, t) => sum + t.alerts.filter(a => a.status === 'new').length, 0)
  const underInvestigation = transactions.filter(t => t.investigationStatus === 'in-progress').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time transaction analysis and suspicious activity detection</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Rule
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">{highRiskTransactions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{pendingAlerts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Investigation</p>
              <p className="text-2xl font-bold text-gray-900">{underInvestigation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'transactions', name: 'Transactions', icon: Activity },
            { id: 'alerts', name: 'Alerts', icon: Bell },
            { id: 'patterns', name: 'Patterns', icon: Target },
            { id: 'rules', name: 'Rules', icon: Settings },
            { id: 'analytics', name: 'Analytics', icon: PieChart }
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
          {/* Recent High-Risk Transactions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent High-Risk Transactions</h3>
            <div className="space-y-4">
              {transactions.filter(t => t.riskLevel === 'high' || t.riskLevel === 'critical').slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                      {getTransactionTypeIcon(transaction.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{transaction.customerName}</h4>
                      <p className="text-sm text-gray-600">
                        {transaction.type} • ${transaction.amount.toLocaleString()} {transaction.currency}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">{transaction.riskScore}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(transaction.riskLevel)}`}>
                        {transaction.riskLevel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
            <div className="space-y-4">
              {transactions.flatMap(t => t.alerts).filter(a => a.status === 'new' || a.status === 'investigating').slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                    alert.severity === 'critical' ? 'bg-red-100' :
                    alert.severity === 'high' ? 'bg-orange-100' :
                    alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Bell className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{alert.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAlertStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      <span className="text-xs text-gray-500">{alert.triggeredAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <select
                value={filterRiskLevel}
                onChange={(e) => setFilterRiskLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="transfer">Transfer</option>
                <option value="payment">Payment</option>
                <option value="exchange">Exchange</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Transactions ({filteredTransactions.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleTransactionExpansion(transaction.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
                      >
                        {expandedTransactions.has(transaction.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        {getTransactionTypeIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.customerName}</h4>
                        <p className="text-sm text-gray-600">
                          {transaction.type} • ${transaction.amount.toLocaleString()} {transaction.currency}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-900">{transaction.riskScore}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(transaction.riskLevel)}`}>
                            {transaction.riskLevel}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                      {transaction.investigationStatus !== 'none' && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getInvestigationStatusColor(transaction.investigationStatus)}`}>
                          {transaction.investigationStatus}
                        </span>
                      )}
                    </div>
                  </div>

                  {expandedTransactions.has(transaction.id) && (
                    <div className="mt-6 ml-12 space-y-6">
                      {/* Transaction Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Transaction Details</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="text-gray-900">${transaction.amount.toLocaleString()} {transaction.currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="text-gray-900 capitalize">{transaction.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Description:</span>
                              <span className="text-gray-900">{transaction.description}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location:</span>
                              <span className="text-gray-900">{transaction.location}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Counterparty</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="text-gray-900">{transaction.counterparty}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="text-gray-900 capitalize">{transaction.counterpartyType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk:</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(transaction.counterpartyRisk)}`}>
                                {transaction.counterpartyRisk}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Technical Details</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">IP Address:</span>
                              <span className="text-gray-900">{transaction.ipAddress}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Device:</span>
                              <span className="text-gray-900">{transaction.deviceFingerprint}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Source:</span>
                              <span className="text-gray-900">{transaction.sourceAccount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Destination:</span>
                              <span className="text-gray-900">{transaction.destinationAccount}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Suspicious Flags */}
                      {transaction.suspiciousFlags.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Suspicious Flags ({transaction.suspiciousFlags.length})</h5>
                          <div className="flex flex-wrap gap-2">
                            {transaction.suspiciousFlags.map((flag, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                                {flag.replace('-', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Patterns */}
                      {transaction.patterns.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Detected Patterns ({transaction.patterns.length})</h5>
                          <div className="space-y-3">
                            {transaction.patterns.map((pattern) => (
                              <div key={pattern.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                                    {getPatternTypeIcon(pattern.type)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{pattern.description}</p>
                                    <p className="text-xs text-gray-500">{pattern.details}</p>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(pattern.severity)}`}>
                                  {pattern.severity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Alerts */}
                      {transaction.alerts.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Alerts ({transaction.alerts.length})</h5>
                          <div className="space-y-3">
                            {transaction.alerts.map((alert) => (
                              <div key={alert.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                                  <p className="text-xs text-gray-500">{alert.description}</p>
                                </div>
                                <div className="text-right">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAlertStatusColor(alert.status)}`}>
                                    {alert.status}
                                  </span>
                                  {alert.assignedTo && (
                                    <p className="text-xs text-gray-500 mt-1">Assigned to: {alert.assignedTo}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-3 pt-4 border-t border-gray-200">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          <Eye className="w-4 h-4 mr-2 inline" />
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <Edit className="w-4 h-4 mr-2 inline" />
                          Investigate
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Alerts</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alert
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Triggered
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.flatMap(t => t.alerts.map(alert => ({ ...alert, transactionId: t.id, customerName: t.customerName }))).map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                          <div className="text-sm text-gray-500">{alert.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {alert.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAlertStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {alert.triggeredAt}
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

      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Patterns</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Transaction pattern analysis will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Detect unusual patterns and behaviors</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring Rules</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Triggers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      False Positive Rate
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monitoringRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                          <div className="text-sm text-gray-500">{rule.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {rule.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          rule.status === 'active' ? 'text-green-600 bg-green-100' :
                          rule.status === 'inactive' ? 'text-gray-600 bg-gray-100' : 'text-yellow-600 bg-yellow-100'
                        }`}>
                          {rule.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rule.triggerCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(rule.falsePositiveRate * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Risk distribution chart will be displayed here</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Transaction trends chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionMonitoring
