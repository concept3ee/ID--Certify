import React, { useState } from 'react'
import { 
  ArrowRight,
  ArrowLeft,
  Users,
  User,
  Building,
  Shield,
  FileText,
  MessageSquare,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  Activity,
  TrendingUp,
  BarChart3,
  Zap,
  Brain,
  Target,
  Lock,
  Unlock,
  Download,
  Upload,
  RefreshCw,
  Settings,
  MoreVertical,
  ExternalLink,
  Copy,
  Send,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Video,
  MessageCircle,
  Share2,
  Link,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

// Types
interface CrossPlatformWorkflow {
  id: string
  name: string
  description: string
  type: 'org_to_individual' | 'individual_to_org' | 'org_to_org' | 'individual_to_individual'
  direction: 'outbound' | 'inbound' | 'bidirectional'
  status: 'active' | 'inactive' | 'draft' | 'testing'
  category: 'verification' | 'document' | 'consent' | 'notification' | 'compliance'
  trigger: {
    event: string
    conditions: any
    frequency: 'immediate' | 'scheduled' | 'batch'
  }
  steps: WorkflowStep[]
  participants: {
    organization: string
    individual?: string
    role: string
  }[]
  permissions: {
    dataAccess: string[]
    actions: string[]
    restrictions: string[]
  }
  analytics: {
    totalExecutions: number
    successRate: number
    avgProcessingTime: number
    lastExecuted: string
  }
  createdAt: string
  updatedAt: string
}

interface WorkflowStep {
  id: string
  name: string
  type: 'request' | 'response' | 'notification' | 'verification' | 'approval'
  platform: 'organization' | 'individual' | 'system'
  assignee: string
  timeout: number
  isRequired: boolean
  dataFields: string[]
  actions: string[]
}

interface WorkflowExecution {
  id: string
  workflowId: string
  workflowName: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled'
  initiatedBy: string
  initiatedAt: string
  completedAt?: string
  participants: {
    organization: string
    individual?: string
    role: string
    status: 'pending' | 'completed' | 'failed'
    lastActivity: string
  }[]
  data: any
  processingTime: number
  errorMessage?: string
}

interface IntegrationPartner {
  id: string
  name: string
  type: 'organization' | 'individual' | 'system'
  status: 'active' | 'inactive' | 'pending'
  permissions: string[]
  lastActivity: string
  trustScore: number
  integrations: number
}

const CrossPlatformWorkflows: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'executions' | 'partners' | 'analytics'>('workflows')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Mock data
  const workflows: CrossPlatformWorkflow[] = [
    {
      id: '1',
      name: 'Employee Verification Request',
      description: 'Organization requests verification from individual employee',
      type: 'org_to_individual',
      direction: 'outbound',
      status: 'active',
      category: 'verification',
      trigger: {
        event: 'new_employee',
        conditions: { department: 'engineering' },
        frequency: 'immediate'
      },
      steps: [
        {
          id: '1',
          name: 'Send Verification Request',
          type: 'request',
          platform: 'organization',
          assignee: 'HR Manager',
          timeout: 24,
          isRequired: true,
          dataFields: ['employee_id', 'verification_type', 'deadline'],
          actions: ['send_notification', 'create_task']
        },
        {
          id: '2',
          name: 'Individual Response',
          type: 'response',
          platform: 'individual',
          assignee: 'Employee',
          timeout: 72,
          isRequired: true,
          dataFields: ['documents', 'consent', 'additional_info'],
          actions: ['upload_documents', 'provide_consent']
        },
        {
          id: '3',
          name: 'Verification Processing',
          type: 'verification',
          platform: 'system',
          assignee: 'Verification System',
          timeout: 48,
          isRequired: true,
          dataFields: ['verification_result', 'confidence_score'],
          actions: ['process_verification', 'update_status']
        }
      ],
      participants: [
        { organization: 'TechCorp Ltd', individual: 'John Smith', role: 'Employee' },
        { organization: 'TechCorp Ltd', role: 'HR Manager' }
      ],
      permissions: {
        dataAccess: ['personal_info', 'documents', 'verification_history'],
        actions: ['request_verification', 'view_results', 'update_status'],
        restrictions: ['no_third_party_sharing', 'data_retention_30_days']
      },
      analytics: {
        totalExecutions: 156,
        successRate: 94,
        avgProcessingTime: 2.3,
        lastExecuted: '2024-01-20T10:30:00Z'
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Document Sharing Consent',
      description: 'Individual shares documents with organization for verification',
      type: 'individual_to_org',
      direction: 'outbound',
      status: 'active',
      category: 'document',
      trigger: {
        event: 'document_share_request',
        conditions: { document_type: 'identity' },
        frequency: 'immediate'
      },
      steps: [
        {
          id: '1',
          name: 'Initiate Document Share',
          type: 'request',
          platform: 'individual',
          assignee: 'Individual',
          timeout: 24,
          isRequired: true,
          dataFields: ['document_type', 'organization', 'purpose'],
          actions: ['select_documents', 'set_permissions']
        },
        {
          id: '2',
          name: 'Organization Review',
          type: 'approval',
          platform: 'organization',
          assignee: 'Compliance Officer',
          timeout: 48,
          isRequired: true,
          dataFields: ['review_notes', 'approval_status'],
          actions: ['review_documents', 'approve_access']
        },
        {
          id: '3',
          name: 'Access Notification',
          type: 'notification',
          platform: 'system',
          assignee: 'System',
          timeout: 1,
          isRequired: true,
          dataFields: ['access_granted', 'expiry_date'],
          actions: ['send_notification', 'log_access']
        }
      ],
      participants: [
        { organization: 'BankCorp', individual: 'Sarah Johnson', role: 'Customer' },
        { organization: 'BankCorp', role: 'Compliance Officer' }
      ],
      permissions: {
        dataAccess: ['shared_documents', 'access_logs'],
        actions: ['view_documents', 'download_documents', 'revoke_access'],
        restrictions: ['view_only', 'no_redistribution', 'audit_trail']
      },
      analytics: {
        totalExecutions: 89,
        successRate: 97,
        avgProcessingTime: 1.8,
        lastExecuted: '2024-01-19T14:15:00Z'
      },
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      name: 'Compliance Check Request',
      description: 'Organization requests compliance verification from another organization',
      type: 'org_to_org',
      direction: 'bidirectional',
      status: 'active',
      category: 'compliance',
      trigger: {
        event: 'compliance_audit',
        conditions: { audit_type: 'quarterly' },
        frequency: 'scheduled'
      },
      steps: [
        {
          id: '1',
          name: 'Audit Request',
          type: 'request',
          platform: 'organization',
          assignee: 'Audit Team',
          timeout: 24,
          isRequired: true,
          dataFields: ['audit_scope', 'deadline', 'requirements'],
          actions: ['send_request', 'schedule_meeting']
        },
        {
          id: '2',
          name: 'Partner Response',
          type: 'response',
          platform: 'organization',
          assignee: 'Compliance Team',
          timeout: 72,
          isRequired: true,
          dataFields: ['compliance_documents', 'certifications', 'notes'],
          actions: ['prepare_documents', 'schedule_review']
        },
        {
          id: '3',
          name: 'Mutual Verification',
          type: 'verification',
          platform: 'system',
          assignee: 'Compliance System',
          timeout: 48,
          isRequired: true,
          dataFields: ['verification_result', 'compliance_score'],
          actions: ['verify_compliance', 'generate_report']
        }
      ],
      participants: [
        { organization: 'TechCorp Ltd', role: 'Audit Team' },
        { organization: 'PartnerCorp', role: 'Compliance Team' }
      ],
      permissions: {
        dataAccess: ['compliance_documents', 'audit_reports', 'certifications'],
        actions: ['request_audit', 'view_results', 'download_reports'],
        restrictions: ['confidential_data', 'no_public_disclosure']
      },
      analytics: {
        totalExecutions: 23,
        successRate: 91,
        avgProcessingTime: 4.2,
        lastExecuted: '2024-01-18T09:00:00Z'
      },
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    }
  ]

  const executions: WorkflowExecution[] = [
    {
      id: '1',
      workflowId: '1',
      workflowName: 'Employee Verification Request',
      status: 'in_progress',
      initiatedBy: 'HR Manager',
      initiatedAt: '2024-01-20T10:30:00Z',
      participants: [
        { organization: 'TechCorp Ltd', individual: 'John Smith', role: 'Employee', status: 'completed', lastActivity: '2024-01-20T11:00:00Z' },
        { organization: 'TechCorp Ltd', role: 'HR Manager', status: 'in_progress', lastActivity: '2024-01-20T10:30:00Z' }
      ],
      data: { employee_id: 'EMP001', verification_type: 'background_check' },
      processingTime: 0.5
    },
    {
      id: '2',
      workflowId: '2',
      workflowName: 'Document Sharing Consent',
      status: 'completed',
      initiatedBy: 'Sarah Johnson',
      initiatedAt: '2024-01-19T14:15:00Z',
      completedAt: '2024-01-19T16:30:00Z',
      participants: [
        { organization: 'BankCorp', individual: 'Sarah Johnson', role: 'Customer', status: 'completed', lastActivity: '2024-01-19T14:15:00Z' },
        { organization: 'BankCorp', role: 'Compliance Officer', status: 'completed', lastActivity: '2024-01-19T16:30:00Z' }
      ],
      data: { document_type: 'passport', purpose: 'account_verification' },
      processingTime: 2.25
    }
  ]

  const partners: IntegrationPartner[] = [
    {
      id: '1',
      name: 'TechCorp Ltd',
      type: 'organization',
      status: 'active',
      permissions: ['verification_requests', 'document_access', 'compliance_checks'],
      lastActivity: '2024-01-20T10:30:00Z',
      trustScore: 95,
      integrations: 12
    },
    {
      id: '2',
      name: 'BankCorp',
      type: 'organization',
      status: 'active',
      permissions: ['document_sharing', 'compliance_verification'],
      lastActivity: '2024-01-19T16:30:00Z',
      trustScore: 92,
      integrations: 8
    },
    {
      id: '3',
      name: 'John Smith',
      type: 'individual',
      status: 'active',
      permissions: ['document_upload', 'verification_response'],
      lastActivity: '2024-01-20T11:00:00Z',
      trustScore: 88,
      integrations: 3
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'org_to_individual': return <ArrowRight className="w-4 h-4" />
      case 'individual_to_org': return <ArrowLeft className="w-4 h-4" />
      case 'org_to_org': return <Building className="w-4 h-4" />
      case 'individual_to_individual': return <User className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'org_to_individual': return 'bg-blue-100 text-blue-800'
      case 'individual_to_org': return 'bg-green-100 text-green-800'
      case 'org_to_org': return 'bg-purple-100 text-purple-800'
      case 'individual_to_individual': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'testing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'verification': return <Shield className="w-4 h-4" />
      case 'document': return <FileText className="w-4 h-4" />
      case 'consent': return <CheckCircle className="w-4 h-4" />
      case 'notification': return <Bell className="w-4 h-4" />
      case 'compliance': return <Target className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || workflow.type === typeFilter
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cross-Platform Workflows</h1>
              <p className="text-gray-600 mt-1">Manage workflows between organizations and individuals</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Workflow</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-8">
            {[
              { id: 'workflows', label: 'Workflows', icon: Activity, count: workflows.length },
              { id: 'executions', label: 'Executions', icon: Clock, count: executions.length },
              { id: 'partners', label: 'Integration Partners', icon: Users, count: partners.length },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, count: null }
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
                {tab.count !== null && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Workflows Tab */}
        {activeTab === 'workflows' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search workflows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="org_to_individual">Org → Individual</option>
                  <option value="individual_to_org">Individual → Org</option>
                  <option value="org_to_org">Org → Org</option>
                  <option value="individual_to_individual">Individual → Individual</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                  <option value="testing">Testing</option>
                </select>
              </div>
            </div>

            {/* Workflows Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredWorkflows.map((workflow) => (
                <div key={workflow.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getCategoryIcon(workflow.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                        <p className="text-sm text-gray-600">{workflow.category.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(workflow.type)}`}>
                        {workflow.type.replace('_', ' → ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>

                  {/* Workflow Steps */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Workflow Steps</h4>
                    <div className="space-y-2">
                      {workflow.steps.map((step, index) => (
                        <div key={step.id} className="flex items-center space-x-3 text-sm">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{step.name}</span>
                            <span className="text-gray-500 ml-2">({step.platform})</span>
                          </div>
                          <span className="text-gray-500 text-xs">{step.timeout}h</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{workflow.analytics.totalExecutions}</p>
                      <p className="text-xs text-gray-600">Executions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{workflow.analytics.successRate}%</p>
                      <p className="text-xs text-gray-600">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{workflow.analytics.avgProcessingTime}d</p>
                      <p className="text-xs text-gray-600">Avg. Time</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Executions Tab */}
        {activeTab === 'executions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Workflow Executions</h2>
                <p className="text-sm text-gray-600 mt-1">Monitor active and completed workflow executions</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {executions.map((execution) => (
                  <div key={execution.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{execution.workflowName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(execution.status)}`}>
                            {execution.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Initiated by: {execution.initiatedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Started: {new Date(execution.initiatedAt).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Processing: {execution.processingTime} hours</span>
                          </div>
                        </div>

                        {/* Participants */}
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Participants</h4>
                          <div className="flex flex-wrap gap-2">
                            {execution.participants.map((participant, index) => (
                              <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
                                <div className={`w-2 h-2 rounded-full ${
                                  participant.status === 'completed' ? 'bg-green-500' :
                                  participant.status === 'in_progress' ? 'bg-blue-500' :
                                  'bg-yellow-500'
                                }`}></div>
                                <span className="text-sm text-gray-700">
                                  {participant.individual || participant.organization} ({participant.role})
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        {execution.status === 'in_progress' && (
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Integration Partners Tab */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Integration Partners</h2>
                <p className="text-sm text-gray-600 mt-1">Manage organizations and individuals with workflow access</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {partners.map((partner) => (
                  <div key={partner.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {partner.type === 'organization' ? <Building className="w-6 h-6 text-blue-600" /> : <User className="w-6 h-6 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(partner.status)}`}>
                              {partner.status}
                            </span>
                            <span className="text-sm text-gray-500 capitalize">{partner.type}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Last activity: {new Date(partner.lastActivity).toLocaleString()}
                          </p>
                          
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-1">
                              <Target className="w-4 h-4 text-gray-400" />
                              <span>Trust Score: {partner.trustScore}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Activity className="w-4 h-4 text-gray-400" />
                              <span>Integrations: {partner.integrations}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {partner.permissions.map((permission) => (
                                <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  {permission.replace('_', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                    <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Executions</p>
                    <p className="text-2xl font-bold text-gray-900">{executions.filter(e => e.status === 'in_progress').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Integration Partners</p>
                    <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(executions.reduce((acc, e) => acc + (e.status === 'completed' ? 1 : 0), 0) / executions.length * 100)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Performance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Performance</h3>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getCategoryIcon(workflow.category)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                        <p className="text-sm text-gray-600">{workflow.type.replace('_', ' → ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{workflow.analytics.totalExecutions}</p>
                        <p className="text-gray-600">Executions</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-green-600">{workflow.analytics.successRate}%</p>
                        <p className="text-gray-600">Success Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-blue-600">{workflow.analytics.avgProcessingTime}d</p>
                        <p className="text-gray-600">Avg. Time</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CrossPlatformWorkflows
