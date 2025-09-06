import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WorkflowDesigner from './WorkflowDesigner'
import CrossPlatformWorkflows from './CrossPlatformWorkflows'
import IndustryTemplates from './IndustryTemplates'
import WorkflowAnalytics from './WorkflowAnalytics'
import MobileWorkflow from './MobileWorkflow'
import WorkflowMarketplace from './WorkflowMarketplaceTest'
import { 
  CheckSquare,
  Clock,
  History,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  Settings,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Building,
  Shield,
  CreditCard,
  Briefcase,
  GraduationCap,
  Heart,
  Car,
  Phone,
  MapPin,
  Star,
  Zap,
  Activity,
  BarChart3,
  Target,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  MoreVertical,
  Download,
  Upload,
  RefreshCw,
  Smartphone,
  Globe
} from 'lucide-react'

// Types
interface WorkflowStep {
  id: string
  name: string
  type: 'approval' | 'notification' | 'verification' | 'document' | 'escalation'
  assignee: string
  assigneeType: 'user' | 'role' | 'department'
  conditions?: any
  timeout?: number
  isRequired: boolean
  order: number
}

interface ApprovalWorkflow {
  id: string
  name: string
  description: string
  category: 'verification' | 'compliance' | 'financial' | 'hr' | 'custom'
  status: 'active' | 'inactive' | 'draft'
  steps: WorkflowStep[]
  triggers: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  usageCount: number
  avgCompletionTime: number
  successRate: number
}

interface PendingApproval {
  id: string
  workflowId: string
  workflowName: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_review' | 'escalated'
  currentStep: number
  totalSteps: number
  assignedTo: string
  assignedToType: 'user' | 'role' | 'department'
  submittedBy: string
  submittedAt: string
  dueDate: string
  data: any
  attachments: string[]
}

interface ApprovalHistory {
  id: string
  workflowId: string
  workflowName: string
  title: string
  status: 'approved' | 'rejected' | 'cancelled' | 'expired'
  submittedBy: string
  approvedBy: string
  submittedAt: string
  completedAt: string
  processingTime: number
  steps: {
    stepName: string
    assignee: string
    action: 'approved' | 'rejected' | 'escalated'
    timestamp: string
    comments: string
  }[]
  category: string
  priority: string
}

interface WorkflowAnalytics {
  totalWorkflows: number
  activeWorkflows: number
  pendingApprovals: number
  avgProcessingTime: number
  successRate: number
  topWorkflows: {
    name: string
    usage: number
    avgTime: number
    successRate: number
  }[]
  recentActivity: {
    action: string
    user: string
    timestamp: string
    details: string
  }[]
}

const ApprovalWorkflow: React.FC = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<'designer' | 'pending' | 'history' | 'analytics' | 'cross-platform' | 'templates' | 'advanced-analytics' | 'mobile' | 'marketplace'>('designer')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Set active tab based on URL
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/approval/pending')) {
      setActiveTab('pending')
    } else if (path.includes('/approval/history')) {
      setActiveTab('history')
    } else if (path.includes('/approval/analytics')) {
      setActiveTab('analytics')
    } else if (path.includes('/approval/cross-platform')) {
      setActiveTab('cross-platform')
    } else if (path.includes('/approval/templates')) {
      setActiveTab('templates')
    } else if (path.includes('/approval/advanced-analytics')) {
      setActiveTab('advanced-analytics')
    } else if (path.includes('/approval/mobile')) {
      setActiveTab('mobile')
    } else if (path.includes('/approval/marketplace')) {
      setActiveTab('marketplace')
    } else {
      setActiveTab('designer')
    }
  }, [location.pathname])

  // Mock data
  const workflows: ApprovalWorkflow[] = [
    {
      id: '1',
      name: 'Employee Onboarding Approval',
      description: 'Complete approval workflow for new employee onboarding',
      category: 'hr',
      status: 'active',
      steps: [
        { id: '1', name: 'HR Review', type: 'approval', assignee: 'HR Manager', assigneeType: 'role', isRequired: true, order: 1 },
        { id: '2', name: 'IT Setup', type: 'verification', assignee: 'IT Department', assigneeType: 'department', isRequired: true, order: 2 },
        { id: '3', name: 'Final Approval', type: 'approval', assignee: 'Department Head', assigneeType: 'role', isRequired: true, order: 3 }
      ],
      triggers: ['new_employee'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      createdBy: 'Sarah Johnson',
      usageCount: 45,
      avgCompletionTime: 2.5,
      successRate: 95
    },
    {
      id: '2',
      name: 'Document Verification',
      description: 'Approval workflow for document verification requests',
      category: 'verification',
      status: 'active',
      steps: [
        { id: '1', name: 'Initial Review', type: 'approval', assignee: 'Verification Team', assigneeType: 'department', isRequired: true, order: 1 },
        { id: '2', name: 'Compliance Check', type: 'verification', assignee: 'Compliance Officer', assigneeType: 'role', isRequired: true, order: 2 },
        { id: '3', name: 'Final Approval', type: 'approval', assignee: 'Verification Manager', assigneeType: 'role', isRequired: true, order: 3 }
      ],
      triggers: ['document_upload'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      createdBy: 'Michael Chen',
      usageCount: 128,
      avgCompletionTime: 1.8,
      successRate: 92
    },
    {
      id: '3',
      name: 'Financial Approval',
      description: 'Multi-level approval for financial transactions',
      category: 'financial',
      status: 'active',
      steps: [
        { id: '1', name: 'Department Approval', type: 'approval', assignee: 'Department Head', assigneeType: 'role', isRequired: true, order: 1 },
        { id: '2', name: 'Finance Review', type: 'approval', assignee: 'Finance Manager', assigneeType: 'role', isRequired: true, order: 2 },
        { id: '3', name: 'Executive Approval', type: 'approval', assignee: 'CFO', assigneeType: 'role', isRequired: true, order: 3 }
      ],
      triggers: ['expense_request', 'budget_approval'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
      createdBy: 'Emily Davis',
      usageCount: 67,
      avgCompletionTime: 3.2,
      successRate: 88
    }
  ]

  const pendingApprovals: PendingApproval[] = [
    {
      id: '1',
      workflowId: '1',
      workflowName: 'Employee Onboarding Approval',
      title: 'New Employee: John Smith',
      description: 'Onboarding approval for new software engineer',
      category: 'hr',
      priority: 'high',
      status: 'pending',
      currentStep: 1,
      totalSteps: 3,
      assignedTo: 'HR Manager',
      assignedToType: 'role',
      submittedBy: 'Sarah Johnson',
      submittedAt: '2024-01-20T10:30:00Z',
      dueDate: '2024-01-22T17:00:00Z',
      data: { employeeName: 'John Smith', position: 'Software Engineer', department: 'Engineering' },
      attachments: ['resume.pdf', 'contract.pdf']
    },
    {
      id: '2',
      workflowId: '2',
      workflowName: 'Document Verification',
      title: 'Passport Verification Request',
      description: 'Verification request for international employee',
      category: 'verification',
      priority: 'medium',
      status: 'in_review',
      currentStep: 2,
      totalSteps: 3,
      assignedTo: 'Compliance Officer',
      assignedToType: 'role',
      submittedBy: 'Michael Chen',
      submittedAt: '2024-01-19T14:15:00Z',
      dueDate: '2024-01-21T12:00:00Z',
      data: { documentType: 'Passport', employeeName: 'Maria Garcia', country: 'Spain' },
      attachments: ['passport.pdf']
    },
    {
      id: '3',
      workflowId: '3',
      workflowName: 'Financial Approval',
      title: 'Equipment Purchase Request',
      description: 'Purchase request for new development laptops',
      category: 'financial',
      priority: 'urgent',
      status: 'escalated',
      currentStep: 3,
      totalSteps: 3,
      assignedTo: 'CFO',
      assignedToType: 'role',
      submittedBy: 'Emily Davis',
      submittedAt: '2024-01-18T09:00:00Z',
      dueDate: '2024-01-20T17:00:00Z',
      data: { amount: 15000, items: 'Development Laptops', department: 'Engineering' },
      attachments: ['quote.pdf', 'justification.pdf']
    }
  ]

  const approvalHistory: ApprovalHistory[] = [
    {
      id: '1',
      workflowId: '1',
      workflowName: 'Employee Onboarding Approval',
      title: 'New Employee: Alice Johnson',
      status: 'approved',
      submittedBy: 'Sarah Johnson',
      approvedBy: 'HR Manager',
      submittedAt: '2024-01-18T10:00:00Z',
      completedAt: '2024-01-19T15:30:00Z',
      processingTime: 1.5,
      steps: [
        { stepName: 'HR Review', assignee: 'HR Manager', action: 'approved', timestamp: '2024-01-18T14:00:00Z', comments: 'All documents verified' },
        { stepName: 'IT Setup', assignee: 'IT Department', action: 'approved', timestamp: '2024-01-19T10:00:00Z', comments: 'Equipment allocated' },
        { stepName: 'Final Approval', assignee: 'Department Head', action: 'approved', timestamp: '2024-01-19T15:30:00Z', comments: 'Welcome aboard!' }
      ],
      category: 'hr',
      priority: 'medium'
    },
    {
      id: '2',
      workflowId: '2',
      workflowName: 'Document Verification',
      title: 'Driver License Verification',
      status: 'rejected',
      submittedBy: 'Michael Chen',
      approvedBy: 'Compliance Officer',
      submittedAt: '2024-01-17T11:00:00Z',
      completedAt: '2024-01-18T09:00:00Z',
      processingTime: 0.9,
      steps: [
        { stepName: 'Initial Review', assignee: 'Verification Team', action: 'approved', timestamp: '2024-01-17T15:00:00Z', comments: 'Document appears valid' },
        { stepName: 'Compliance Check', assignee: 'Compliance Officer', action: 'rejected', timestamp: '2024-01-18T09:00:00Z', comments: 'Document expired' }
      ],
      category: 'verification',
      priority: 'low'
    }
  ]

  const analytics: WorkflowAnalytics = {
    totalWorkflows: 12,
    activeWorkflows: 8,
    pendingApprovals: 15,
    avgProcessingTime: 2.1,
    successRate: 91,
    topWorkflows: [
      { name: 'Document Verification', usage: 128, avgTime: 1.8, successRate: 92 },
      { name: 'Employee Onboarding', usage: 45, avgTime: 2.5, successRate: 95 },
      { name: 'Financial Approval', usage: 67, avgTime: 3.2, successRate: 88 }
    ],
    recentActivity: [
      { action: 'Workflow Created', user: 'Sarah Johnson', timestamp: '2 hours ago', details: 'Created new compliance workflow' },
      { action: 'Approval Completed', user: 'Michael Chen', timestamp: '4 hours ago', details: 'Approved document verification' },
      { action: 'Workflow Updated', user: 'Emily Davis', timestamp: '6 hours ago', details: 'Updated financial approval workflow' }
    ]
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hr': return <Users className="w-4 h-4" />
      case 'verification': return <Shield className="w-4 h-4" />
      case 'financial': return <CreditCard className="w-4 h-4" />
      case 'compliance': return <CheckCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_review': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'escalated': return 'bg-red-100 text-red-800 border-red-200'
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || workflow.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Approval Workflow</h1>
              <p className="text-gray-600 mt-1">Design, manage, and track approval processes</p>
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
          <div className="flex space-x-4 overflow-x-auto">
            {[
              { id: 'designer', label: 'Designer', icon: CheckSquare, count: workflows.length },
              { id: 'pending', label: 'Pending', icon: Clock, count: pendingApprovals.length },
              { id: 'history', label: 'History', icon: History, count: approvalHistory.length },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, count: null },
              { id: 'cross-platform', label: 'Cross-Platform', icon: Users, count: null },
              { id: 'templates', label: 'Templates', icon: FileText, count: null },
              { id: 'advanced-analytics', label: 'Advanced', icon: BarChart3, count: null },
              { id: 'mobile', label: 'Mobile', icon: Smartphone, count: null },
              { id: 'marketplace', label: 'Marketplace', icon: Globe, count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 border-b-2 font-medium text-sm flex items-center space-x-1 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs">
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
        {/* Workflow Designer Tab */}
        {activeTab === 'designer' && (
          <WorkflowDesigner />
        )}

        {/* Cross-Platform Workflows Tab */}
        {activeTab === 'cross-platform' && (
          <CrossPlatformWorkflows />
        )}

        {/* Industry Templates Tab */}
        {activeTab === 'templates' && (
          <IndustryTemplates />
        )}

        {/* Advanced Analytics Tab */}
        {activeTab === 'advanced-analytics' && (
          <WorkflowAnalytics />
        )}

        {/* Mobile Workflow Tab */}
        {activeTab === 'mobile' && (
          <MobileWorkflow />
        )}

        {/* Workflow Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <WorkflowMarketplace />
        )}

        {/* Legacy Designer Tab */}
        {activeTab === 'designer' && false && (
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
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="hr">HR</option>
                  <option value="verification">Verification</option>
                  <option value="financial">Financial</option>
                  <option value="compliance">Compliance</option>
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
                </select>
              </div>
            </div>

            {/* Workflows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Steps:</span>
                      <span className="font-medium">{workflow.steps.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Usage:</span>
                      <span className="font-medium">{workflow.usageCount} times</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Avg. Time:</span>
                      <span className="font-medium">{workflow.avgCompletionTime} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="font-medium text-green-600">{workflow.successRate}%</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100">
                      {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Approvals Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
                <p className="text-sm text-gray-600 mt-1">Review and process pending approval requests</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{approval.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(approval.priority)}`}>
                            {approval.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(approval.status)}`}>
                            {approval.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{approval.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Assigned to: {approval.assignedTo}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {new Date(approval.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Activity className="w-4 h-4" />
                            <span>Step {approval.currentStep} of {approval.totalSteps}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Approval History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Approval History</h2>
                <p className="text-sm text-gray-600 mt-1">Complete audit trail of all approval decisions</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {approvalHistory.map((history) => (
                  <div key={history.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{history.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(history.status)}`}>
                            {history.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(history.priority)}`}>
                            {history.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{history.workflowName}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Submitted by: {history.submittedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Approved by: {history.approvedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Processing time: {history.processingTime} days</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Steps Timeline */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Approval Steps</h4>
                      <div className="space-y-2">
                        {history.steps.map((step, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              step.action === 'approved' ? 'bg-green-100 text-green-600' :
                              step.action === 'rejected' ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {step.action === 'approved' ? <CheckCircle className="w-4 h-4" /> :
                               step.action === 'rejected' ? <XCircle className="w-4 h-4" /> :
                               <Clock className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">{step.stepName}</span>
                              <span className="text-gray-500 ml-2">by {step.assignee}</span>
                              {step.comments && (
                                <p className="text-gray-600 text-xs mt-1">{step.comments}</p>
                              )}
                            </div>
                            <span className="text-gray-500 text-xs">
                              {new Date(step.timestamp).toLocaleString()}
                            </span>
                          </div>
                        ))}
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
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalWorkflows}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.activeWorkflows}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.pendingApprovals}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.successRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Workflows */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Workflows</h3>
              <div className="space-y-4">
                {analytics.topWorkflows.map((workflow, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                        <p className="text-sm text-gray-600">{workflow.usage} uses</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{workflow.avgTime} days</p>
                        <p className="text-gray-600">Avg. Time</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-green-600">{workflow.successRate}%</p>
                        <p className="text-gray-600">Success Rate</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-xs text-gray-600">{activity.timestamp}</p>
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

export default ApprovalWorkflow
