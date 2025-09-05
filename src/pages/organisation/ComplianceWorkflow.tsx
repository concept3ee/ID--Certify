import React, { useState } from 'react'
import { 
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  FileText,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  Target,
  TrendingUp,
  BarChart3,
  Lock,
  Unlock,
  UserCheck,
  Building,
  Briefcase,
  GraduationCap,
  CreditCard,
  Database,
  Zap,
  Activity,
  Bell,
  Mail,
  MessageSquare,
  ExternalLink,
  Copy,
  Save,
  RefreshCw
} from 'lucide-react'

// Types
interface ComplianceRule {
  id: string
  name: string
  description: string
  category: 'hr' | 'finance' | 'healthcare' | 'education' | 'general'
  type: 'automated' | 'manual' | 'hybrid'
  status: 'active' | 'inactive' | 'draft'
  priority: 'low' | 'medium' | 'high' | 'critical'
  conditions: {
    field: string
    operator: string
    value: string
  }[]
  actions: {
    type: string
    parameters: any
  }[]
  createdAt: string
  updatedAt: string
  lastTriggered?: string
  triggerCount: number
}

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  steps: {
    id: string
    name: string
    type: 'approval' | 'notification' | 'verification' | 'document' | 'escalation'
    assignee: string
    conditions?: any
    timeout?: number
  }[]
  isActive: boolean
  usageCount: number
  createdAt: string
}

interface AuditLog {
  id: string
  action: string
  user: string
  timestamp: string
  details: any
  category: 'verification' | 'compliance' | 'workflow' | 'system'
  severity: 'low' | 'medium' | 'high' | 'critical'
}

const ComplianceWorkflow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'workflows' | 'audit' | 'integrations'>('rules')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [showWorkflowModal, setShowWorkflowModal] = useState(false)
  const [editingRule, setEditingRule] = useState<ComplianceRule | null>(null)

  // Mock data
  const mockComplianceRules: ComplianceRule[] = [
    {
      id: 'rule-001',
      name: 'Auto-approve High Trust Score',
      description: 'Automatically approve verifications for users with trust score above 90',
      category: 'general',
      type: 'automated',
      status: 'active',
      priority: 'medium',
      conditions: [
        { field: 'trustScore', operator: '>=', value: '90' },
        { field: 'verificationType', operator: 'in', value: 'employment,education' }
      ],
      actions: [
        { type: 'approve', parameters: { autoApproval: true } },
        { type: 'notify', parameters: { recipients: ['hr@company.com'] } }
      ],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z',
      lastTriggered: '2025-01-16T09:15:00Z',
      triggerCount: 45
    },
    {
      id: 'rule-002',
      name: 'Escalate Failed Medical Verifications',
      description: 'Escalate failed medical license verifications to compliance team',
      category: 'healthcare',
      type: 'automated',
      status: 'active',
      priority: 'high',
      conditions: [
        { field: 'verificationType', operator: '=', value: 'medical-license' },
        { field: 'status', operator: '=', value: 'failed' }
      ],
      actions: [
        { type: 'escalate', parameters: { team: 'compliance', priority: 'high' } },
        { type: 'notify', parameters: { recipients: ['compliance@company.com', 'legal@company.com'] } }
      ],
      createdAt: '2024-02-10T09:00:00Z',
      updatedAt: '2024-02-15T11:20:00Z',
      lastTriggered: '2025-01-15T16:45:00Z',
      triggerCount: 12
    },
    {
      id: 'rule-003',
      name: 'Require Additional Documentation for High-Risk',
      description: 'Request additional documentation for high-risk verifications',
      category: 'finance',
      type: 'hybrid',
      status: 'active',
      priority: 'high',
      conditions: [
        { field: 'riskScore', operator: '>', value: '75' },
        { field: 'verificationType', operator: 'in', value: 'business,financial' }
      ],
      actions: [
        { type: 'requestDocuments', parameters: { documents: ['tax-clearance', 'bank-statement'] } },
        { type: 'notify', parameters: { recipients: ['finance@company.com'] } }
      ],
      createdAt: '2024-03-05T14:00:00Z',
      updatedAt: '2024-03-10T10:15:00Z',
      lastTriggered: '2025-01-14T13:30:00Z',
      triggerCount: 8
    }
  ]

  const mockWorkflowTemplates: WorkflowTemplate[] = [
    {
      id: 'workflow-001',
      name: 'Employee Onboarding Verification',
      description: 'Complete verification workflow for new employee onboarding',
      category: 'HR',
      steps: [
        { id: 'step-1', name: 'Identity Verification', type: 'verification', assignee: 'System', timeout: 24 },
        { id: 'step-2', name: 'Employment History Check', type: 'verification', assignee: 'HR Team', timeout: 72 },
        { id: 'step-3', name: 'Reference Verification', type: 'verification', assignee: 'HR Team', timeout: 120 },
        { id: 'step-4', name: 'Final Approval', type: 'approval', assignee: 'HR Manager', timeout: 24 }
      ],
      isActive: true,
      usageCount: 156,
      createdAt: '2024-01-10T09:00:00Z'
    },
    {
      id: 'workflow-002',
      name: 'Vendor Due Diligence',
      description: 'Comprehensive verification workflow for vendor onboarding',
      category: 'Procurement',
      steps: [
        { id: 'step-1', name: 'Business Registration Check', type: 'verification', assignee: 'Compliance Team', timeout: 48 },
        { id: 'step-2', name: 'Financial Verification', type: 'verification', assignee: 'Finance Team', timeout: 72 },
        { id: 'step-3', name: 'Legal Review', type: 'approval', assignee: 'Legal Team', timeout: 48 },
        { id: 'step-4', name: 'Final Approval', type: 'approval', assignee: 'Procurement Manager', timeout: 24 }
      ],
      isActive: true,
      usageCount: 89,
      createdAt: '2024-02-15T11:00:00Z'
    },
    {
      id: 'workflow-003',
      name: 'Medical Professional Credentialing',
      description: 'Specialized workflow for medical professional verification',
      category: 'Healthcare',
      steps: [
        { id: 'step-1', name: 'License Verification', type: 'verification', assignee: 'Medical Board', timeout: 72 },
        { id: 'step-2', name: 'Education Verification', type: 'verification', assignee: 'Education Team', timeout: 96 },
        { id: 'step-3', name: 'Malpractice History Check', type: 'verification', assignee: 'Compliance Team', timeout: 48 },
        { id: 'step-4', name: 'Peer Review', type: 'approval', assignee: 'Medical Director', timeout: 72 },
        { id: 'step-5', name: 'Final Credentialing', type: 'approval', assignee: 'Chief Medical Officer', timeout: 24 }
      ],
      isActive: true,
      usageCount: 34,
      createdAt: '2024-03-20T14:30:00Z'
    }
  ]

  const mockAuditLogs: AuditLog[] = [
    {
      id: 'audit-001',
      action: 'Compliance rule triggered',
      user: 'System',
      timestamp: '2025-01-16T10:30:00Z',
      details: { ruleId: 'rule-001', verificationId: 'ver-123', action: 'auto-approve' },
      category: 'compliance',
      severity: 'medium'
    },
    {
      id: 'audit-002',
      action: 'Workflow step completed',
      user: 'Sarah Johnson',
      timestamp: '2025-01-16T09:45:00Z',
      details: { workflowId: 'workflow-001', stepId: 'step-2', result: 'approved' },
      category: 'workflow',
      severity: 'low'
    },
    {
      id: 'audit-003',
      action: 'Verification failed compliance check',
      user: 'System',
      timestamp: '2025-01-16T08:20:00Z',
      details: { verificationId: 'ver-124', reason: 'insufficient documentation' },
      category: 'verification',
      severity: 'high'
    },
    {
      id: 'audit-004',
      action: 'Integration sync completed',
      user: 'System',
      timestamp: '2025-01-16T07:00:00Z',
      details: { integration: 'HRMS', recordsProcessed: 45, status: 'success' },
      category: 'system',
      severity: 'low'
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hr': return <Users className="w-4 h-4" />
      case 'finance': return <CreditCard className="w-4 h-4" />
      case 'healthcare': return <Briefcase className="w-4 h-4" />
      case 'education': return <GraduationCap className="w-4 h-4" />
      default: return <Shield className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hr': return 'bg-blue-100 text-blue-800'
      case 'finance': return 'bg-green-100 text-green-800'
      case 'healthcare': return 'bg-red-100 text-red-800'
      case 'education': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderRulesTab = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Compliance Rules</h2>
          <span className="text-sm text-gray-500">({mockComplianceRules.length} rules)</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowRuleModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="general">General</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockComplianceRules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {getCategoryIcon(rule.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingRule(rule)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Category</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(rule.category)}`}>
                  {rule.category}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  rule.type === 'automated' ? 'bg-green-100 text-green-800' :
                  rule.type === 'manual' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {rule.type}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Priority</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rule.priority)}`}>
                  {rule.priority}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  rule.status === 'active' ? 'bg-green-100 text-green-800' :
                  rule.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {rule.status}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Triggered: {rule.triggerCount} times</span>
                  <span>Last: {rule.lastTriggered ? formatDate(rule.lastTriggered) : 'Never'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderWorkflowsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Workflow Templates</h2>
        <button
          onClick={() => setShowWorkflowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWorkflowTemplates.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-600 hover:text-gray-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Category</span>
                <span className="text-sm font-medium text-gray-900">{workflow.category}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Steps</span>
                <span className="text-sm font-medium text-gray-900">{workflow.steps.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Usage</span>
                <span className="text-sm font-medium text-gray-900">{workflow.usageCount} times</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  workflow.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {workflow.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Workflow Steps:</div>
                <div className="space-y-1">
                  {workflow.steps.slice(0, 3).map((step) => (
                    <div key={step.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{step.name}</span>
                      <span className="text-gray-900">{step.assignee}</span>
                    </div>
                  ))}
                  {workflow.steps.length > 3 && (
                    <div className="text-xs text-gray-500">+{workflow.steps.length - 3} more steps</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAuditTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Audit Log</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {log.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(log.timestamp)}
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

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">System Integrations</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'HRMS Integration', status: 'connected', lastSync: '2 hours ago', records: 1247 },
          { name: 'ERP System', status: 'connected', lastSync: '1 hour ago', records: 892 },
          { name: 'CRM Platform', status: 'disconnected', lastSync: '2 days ago', records: 0 },
          { name: 'Document Management', status: 'connected', lastSync: '30 minutes ago', records: 3456 },
          { name: 'Email System', status: 'connected', lastSync: '5 minutes ago', records: 234 },
          { name: 'SMS Gateway', status: 'connected', lastSync: '1 hour ago', records: 567 }
        ].map((integration, index) => (
          <div key={index} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                <p className="text-sm text-gray-600">System Integration</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-600 hover:text-gray-900">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  integration.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {integration.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm text-gray-900">{integration.lastSync}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Records</span>
                <span className="text-sm font-medium text-gray-900">{integration.records.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Compliance & Workflow</h1>
          <p className="text-gray-600 mt-2">Automated compliance rules, workflow templates, and system integrations</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'rules'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Compliance Rules
            </button>
            <button 
              onClick={() => setActiveTab('workflows')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'workflows'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Workflows
            </button>
            <button 
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'audit'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Audit Log
            </button>
            <button 
              onClick={() => setActiveTab('integrations')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'integrations'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Integrations
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'rules' && renderRulesTab()}
        {activeTab === 'workflows' && renderWorkflowsTab()}
        {activeTab === 'audit' && renderAuditTab()}
        {activeTab === 'integrations' && renderIntegrationsTab()}
      </div>
    </div>
  )
}

export default ComplianceWorkflow
