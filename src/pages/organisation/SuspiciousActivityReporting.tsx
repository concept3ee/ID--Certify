import React, { useState } from 'react'
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Download, 
  Upload, 
  MoreVertical, 
  ChevronRight, 
  ChevronDown, 
  Users, 
  Building, 
  Globe, 
  Target, 
  Info, 
  ExternalLink, 
  RefreshCw, 
  Bell, 
  Settings, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  XCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Send,
  Save,
  Trash2
} from 'lucide-react'

interface SARReport {
  id: string
  reportNumber: string
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'filed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  subject: string
  customerId: string
  customerName: string
  suspiciousActivity: string
  activityType: 'money-laundering' | 'terrorist-financing' | 'fraud' | 'tax-evasion' | 'other'
  amount: number
  currency: string
  dateDetected: string
  dateReported: string
  reportingDeadline: string
  assignedTo: string
  createdBy: string
  reviewedBy?: string
  approvedBy?: string
  evidence: SAREvidence[]
  narrative: string
  riskAssessment: string
  regulatoryBodies: string[]
  submissionStatus: 'not-submitted' | 'submitted' | 'acknowledged' | 'under-investigation' | 'closed'
  submissionDate?: string
  acknowledgmentNumber?: string
  notes: string
}

interface SAREvidence {
  id: string
  type: 'transaction' | 'document' | 'communication' | 'witness' | 'other'
  description: string
  source: string
  date: string
  relevance: 'high' | 'medium' | 'low'
  status: 'collected' | 'verified' | 'pending'
}

interface SARCase {
  id: string
  sarId: string
  caseNumber: string
  status: 'open' | 'investigating' | 'escalated' | 'closed'
  assignedTo: string
  openedDate: string
  lastUpdated: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  description: string
  findings: string[]
  actions: string[]
}

const SuspiciousActivityReporting = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'cases' | 'templates' | 'analytics'>('overview')
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [expandedReports, setExpandedReports] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Mock data - in real implementation, this would come from API
  const sarReports: SARReport[] = [
    {
      id: '1',
      reportNumber: 'SAR-2024-001',
      status: 'submitted',
      priority: 'high',
      subject: 'Suspicious High-Value Transfer to High-Risk Jurisdiction',
      customerId: '1',
      customerName: 'John Smith',
      suspiciousActivity: 'Large transfer to offshore account in high-risk jurisdiction',
      activityType: 'money-laundering',
      amount: 50000,
      currency: 'USD',
      dateDetected: '2024-01-20',
      dateReported: '2024-01-22',
      reportingDeadline: '2024-01-25',
      assignedTo: 'Sarah Johnson',
      createdBy: 'Mike Chen',
      reviewedBy: 'Sarah Johnson',
      approvedBy: 'David Wilson',
      evidence: [
        {
          id: '1-1',
          type: 'transaction',
          description: 'Transfer of $50,000 to offshore account',
          source: 'Transaction Monitoring System',
          date: '2024-01-20',
          relevance: 'high',
          status: 'verified'
        },
        {
          id: '1-2',
          type: 'document',
          description: 'Customer KYC documentation',
          source: 'Customer File',
          date: '2024-01-15',
          relevance: 'medium',
          status: 'collected'
        }
      ],
      narrative: 'Customer John Smith initiated a high-value transfer of $50,000 to an offshore account in a high-risk jurisdiction. The transaction was flagged by our monitoring system due to the amount and destination. Further investigation revealed that the customer is a PEP and the counterparty has been flagged in sanctions databases.',
      riskAssessment: 'High risk due to PEP status, high-value transaction, and high-risk jurisdiction',
      regulatoryBodies: ['FinCEN', 'FATF'],
      submissionStatus: 'submitted',
      submissionDate: '2024-01-22',
      acknowledgmentNumber: 'ACK-2024-001',
      notes: 'Submitted to FinCEN within regulatory deadline'
    },
    {
      id: '2',
      reportNumber: 'SAR-2024-002',
      status: 'draft',
      priority: 'medium',
      subject: 'Unusual Transaction Patterns',
      customerId: '2',
      customerName: 'TechCorp Solutions Ltd',
      suspiciousActivity: 'Multiple transactions just below reporting threshold',
      activityType: 'money-laundering',
      amount: 24000,
      currency: 'USD',
      dateDetected: '2024-01-18',
      dateReported: '',
      reportingDeadline: '2024-01-25',
      assignedTo: 'Mike Chen',
      createdBy: 'Sarah Johnson',
      evidence: [
        {
          id: '2-1',
          type: 'transaction',
          description: 'Multiple transactions of $9,500 each',
          source: 'Transaction Monitoring System',
          date: '2024-01-18',
          relevance: 'high',
          status: 'collected'
        }
      ],
      narrative: 'Customer TechCorp Solutions Ltd has been conducting multiple transactions just below the $10,000 reporting threshold. This pattern suggests potential structuring to avoid reporting requirements.',
      riskAssessment: 'Medium risk due to structuring pattern',
      regulatoryBodies: ['FinCEN'],
      submissionStatus: 'not-submitted',
      notes: 'Under review by compliance team'
    }
  ]

  const sarCases: SARCase[] = [
    {
      id: '1',
      sarId: '1',
      caseNumber: 'CASE-2024-001',
      status: 'investigating',
      assignedTo: 'Sarah Johnson',
      openedDate: '2024-01-22',
      lastUpdated: '2024-01-23',
      priority: 'high',
      description: 'Investigation into high-value transfer to high-risk jurisdiction',
      findings: ['PEP status confirmed', 'Sanctions hit on counterparty'],
      actions: ['Enhanced due diligence', 'Transaction monitoring', 'Regulatory reporting']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filed': return 'text-green-600 bg-green-100'
      case 'submitted': return 'text-blue-600 bg-blue-100'
      case 'under-review': return 'text-yellow-600 bg-yellow-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'draft': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'money-laundering': return 'text-red-600 bg-red-100'
      case 'terrorist-financing': return 'text-red-600 bg-red-100'
      case 'fraud': return 'text-orange-600 bg-orange-100'
      case 'tax-evasion': return 'text-yellow-600 bg-yellow-100'
      case 'other': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-600 bg-blue-100'
      case 'acknowledged': return 'text-green-600 bg-green-100'
      case 'under-investigation': return 'text-yellow-600 bg-yellow-100'
      case 'closed': return 'text-gray-600 bg-gray-100'
      case 'not-submitted': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const toggleReportExpansion = (reportId: string) => {
    const newExpanded = new Set(expandedReports)
    if (newExpanded.has(reportId)) {
      newExpanded.delete(reportId)
    } else {
      newExpanded.add(reportId)
    }
    setExpandedReports(newExpanded)
  }

  const filteredReports = sarReports.filter(report => {
    const matchesSearch = report.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    const matchesPriority = filterPriority === 'all' || report.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalReports = sarReports.length
  const submittedReports = sarReports.filter(r => r.status === 'submitted' || r.status === 'filed').length
  const draftReports = sarReports.filter(r => r.status === 'draft').length
  const pendingDeadlines = sarReports.filter(r => r.reportingDeadline && new Date(r.reportingDeadline) > new Date()).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suspicious Activity Reporting</h1>
          <p className="text-gray-600 mt-1">SAR creation, management, and regulatory submission</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New SAR
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-gray-900">{submittedReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{draftReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Deadlines</p>
              <p className="text-2xl font-bold text-gray-900">{pendingDeadlines}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'reports', name: 'SAR Reports', icon: FileText },
            { id: 'cases', name: 'Cases', icon: Target },
            { id: 'templates', name: 'Templates', icon: Settings },
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
          {/* Recent SAR Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent SAR Reports</h3>
            <div className="space-y-4">
              {sarReports.slice(0, 3).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{report.reportNumber}</h4>
                      <p className="text-sm text-gray-600">{report.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{report.dateDetected}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Cases */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Cases</h3>
            <div className="space-y-4">
              {sarCases.map((case_) => (
                <div key={case_.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{case_.caseNumber}</h4>
                      <p className="text-sm text-gray-600">{case_.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      case_.status === 'open' ? 'text-blue-600 bg-blue-100' :
                      case_.status === 'investigating' ? 'text-yellow-600 bg-yellow-100' :
                      case_.status === 'escalated' ? 'text-orange-600 bg-orange-100' : 'text-green-600 bg-green-100'
                    }`}>
                      {case_.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{case_.assignedTo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search SAR reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="filed">Filed</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* SAR Reports List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">SAR Reports ({filteredReports.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleReportExpansion(report.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
                      >
                        {expandedReports.has(report.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{report.reportNumber}</h4>
                        <p className="text-sm text-gray-600">{report.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityTypeColor(report.activityType)}`}>
                        {report.activityType.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {expandedReports.has(report.id) && (
                    <div className="mt-6 ml-12 space-y-6">
                      {/* Report Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Report Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Report Number:</span>
                              <span className="text-gray-900">{report.reportNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Priority:</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(report.priority)}`}>
                                {report.priority}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Activity Type:</span>
                              <span className="text-gray-900 capitalize">{report.activityType.replace('-', ' ')}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Customer & Activity</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer:</span>
                              <span className="text-gray-900">{report.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="text-gray-900">${report.amount.toLocaleString()} {report.currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date Detected:</span>
                              <span className="text-gray-900">{report.dateDetected}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Deadline:</span>
                              <span className="text-gray-900">{report.reportingDeadline}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Assignment</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assigned To:</span>
                              <span className="text-gray-900">{report.assignedTo}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created By:</span>
                              <span className="text-gray-900">{report.createdBy}</span>
                            </div>
                            {report.reviewedBy && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Reviewed By:</span>
                                <span className="text-gray-900">{report.reviewedBy}</span>
                              </div>
                            )}
                            {report.approvedBy && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Approved By:</span>
                                <span className="text-gray-900">{report.approvedBy}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Narrative */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Narrative</h5>
                        <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{report.narrative}</p>
                      </div>

                      {/* Risk Assessment */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Risk Assessment</h5>
                        <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{report.riskAssessment}</p>
                      </div>

                      {/* Evidence */}
                      {report.evidence.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Evidence ({report.evidence.length})</h5>
                          <div className="space-y-3">
                            {report.evidence.map((evidence) => (
                              <div key={evidence.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{evidence.description}</p>
                                    <p className="text-xs text-gray-500">{evidence.source} • {evidence.date}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    evidence.relevance === 'high' ? 'text-red-600 bg-red-100' :
                                    evidence.relevance === 'medium' ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100'
                                  }`}>
                                    {evidence.relevance}
                                  </span>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    evidence.status === 'verified' ? 'text-green-600 bg-green-100' :
                                    evidence.status === 'collected' ? 'text-blue-600 bg-blue-100' : 'text-yellow-600 bg-yellow-100'
                                  }`}>
                                    {evidence.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Regulatory Bodies */}
                      {report.regulatoryBodies.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Regulatory Bodies</h5>
                          <div className="flex flex-wrap gap-2">
                            {report.regulatoryBodies.map((body, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {body}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Submission Status */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Submission Status</h5>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSubmissionStatusColor(report.submissionStatus)}`}>
                            {report.submissionStatus}
                          </span>
                          {report.submissionDate && (
                            <span className="text-sm text-gray-600">Submitted: {report.submissionDate}</span>
                          )}
                          {report.acknowledgmentNumber && (
                            <span className="text-sm text-gray-600">Acknowledgment: {report.acknowledgmentNumber}</span>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      {report.notes && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Notes</h5>
                          <p className="text-sm text-gray-900">{report.notes}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-3 pt-4 border-t border-gray-200">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          <Edit className="w-4 h-4 mr-2 inline" />
                          Edit Report
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2 inline" />
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          <Send className="w-4 h-4 mr-2 inline" />
                          Submit
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

      {activeTab === 'cases' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SAR Cases</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Case Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SAR Report
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opened
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sarCases.map((case_) => (
                    <tr key={case_.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{case_.caseNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        SAR-{case_.sarId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          case_.status === 'open' ? 'text-blue-600 bg-blue-100' :
                          case_.status === 'investigating' ? 'text-yellow-600 bg-yellow-100' :
                          case_.status === 'escalated' ? 'text-orange-600 bg-orange-100' : 'text-green-600 bg-green-100'
                        }`}>
                          {case_.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {case_.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(case_.priority)}`}>
                          {case_.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {case_.openedDate}
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

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SAR Templates</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">SAR templates will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Create and manage SAR report templates</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SAR Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">SAR trends chart will be displayed here</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Type Distribution</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Activity type distribution will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create SAR Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New SAR Report</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="">Select activity type</option>
                      <option value="money-laundering">Money Laundering</option>
                      <option value="terrorist-financing">Terrorist Financing</option>
                      <option value="fraud">Fraud</option>
                      <option value="tax-evasion">Tax Evasion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suspicious Activity Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Describe the suspicious activity..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Narrative</label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Provide detailed narrative of the suspicious activity..."
                  />
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2 inline" />
                    Save Draft
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Send className="w-4 h-4 mr-2 inline" />
                    Create & Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuspiciousActivityReporting
