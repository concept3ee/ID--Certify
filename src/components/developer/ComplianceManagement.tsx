import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Upload, 
  RefreshCw, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight, 
  BarChart3, 
  Activity, 
  Clock, 
  DollarSign, 
  Globe, 
  Server, 
  Network, 
  HardDrive, 
  Cpu, 
  Wifi, 
  WifiOff, 
  Bell, 
  Mail, 
  MessageSquare, 
  BookOpen, 
  ExternalLink, 
  Save, 
  X, 
  Zap, 
  Target, 
  Layers, 
  Grid, 
  List, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Desktop, 
  User, 
  UserCheck, 
  UserX, 
  Building, 
  Home, 
  LogIn, 
  LogOut, 
  Fingerprint, 
  Smartphone as Phone, 
  Mail as Email, 
  MessageSquare as Chat, 
  Calendar, 
  MapPin, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Award, 
  Flag, 
  AlertCircle, 
  Check, 
  Minus, 
  MoreHorizontal, 
  MoreVertical,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

interface ComplianceFramework {
  id: string
  name: string
  type: 'gdpr' | 'ccpa' | 'sox' | 'hipaa' | 'iso27001' | 'pci-dss' | 'custom'
  description: string
  status: 'compliant' | 'non-compliant' | 'partial' | 'pending' | 'not-applicable'
  score: number
  requirements: ComplianceRequirement[]
  lastAssessment: string
  nextAssessment: string
  responsible: string
  documentation: string[]
}

interface ComplianceRequirement {
  id: string
  title: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  status: 'compliant' | 'non-compliant' | 'partial' | 'pending'
  evidence: string[]
  controls: string[]
  lastChecked: string
  nextCheck: string
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  framework: string
  status: 'success' | 'failure' | 'warning'
  details: any
  ipAddress: string
  userAgent: string
}

interface ComplianceReport {
  id: string
  name: string
  framework: string
  type: 'assessment' | 'audit' | 'gap-analysis' | 'certification'
  status: 'draft' | 'in-progress' | 'completed' | 'approved'
  generatedBy: string
  generatedAt: string
  approvedBy?: string
  approvedAt?: string
  findings: number
  recommendations: number
  score: number
  format: 'pdf' | 'excel' | 'csv' | 'json'
}

interface ComplianceManagementProps {
  onCreateReport: () => void
  onScheduleAudit: () => void
  onViewFramework: (framework: ComplianceFramework) => void
  onClose: () => void
}

const ComplianceManagement: React.FC<ComplianceManagementProps> = ({
  onCreateReport,
  onScheduleAudit,
  onViewFramework,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'frameworks' | 'requirements' | 'audits' | 'reports' | 'settings'>('overview')
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [reports, setReports] = useState<ComplianceReport[]>([])

  useEffect(() => {
    loadComplianceData()
  }, [])

  const loadComplianceData = async () => {
    setIsLoading(true)
    
    // Mock data - in real app, this would come from API
    const mockFrameworks: ComplianceFramework[] = [
      {
        id: '1',
        name: 'GDPR Compliance',
        type: 'gdpr',
        description: 'General Data Protection Regulation compliance framework',
        status: 'compliant',
        score: 95,
        requirements: [
          {
            id: '1',
            title: 'Data Processing Lawfulness',
            description: 'Ensure all data processing has a lawful basis',
            category: 'Data Processing',
            priority: 'high',
            status: 'compliant',
            evidence: ['data-processing-agreements.pdf', 'consent-forms.pdf'],
            controls: ['Data Processing Impact Assessment', 'Consent Management'],
            lastChecked: '2024-01-15T10:30:00Z',
            nextCheck: '2024-04-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Data Subject Rights',
            description: 'Implement mechanisms for data subject rights requests',
            category: 'Data Subject Rights',
            priority: 'high',
            status: 'compliant',
            evidence: ['data-subject-rights-procedure.pdf', 'request-handling-system.pdf'],
            controls: ['Right to Access', 'Right to Rectification', 'Right to Erasure'],
            lastChecked: '2024-01-10T14:20:00Z',
            nextCheck: '2024-04-10T14:20:00Z'
          }
        ],
        lastAssessment: '2024-01-15T10:30:00Z',
        nextAssessment: '2024-04-15T10:30:00Z',
        responsible: 'compliance@idcertify.com',
        documentation: ['gdpr-policy.pdf', 'data-processing-agreements.pdf', 'consent-forms.pdf']
      },
      {
        id: '2',
        name: 'SOX Compliance',
        type: 'sox',
        description: 'Sarbanes-Oxley Act compliance for financial reporting',
        status: 'partial',
        score: 78,
        requirements: [
          {
            id: '3',
            title: 'Internal Controls',
            description: 'Implement and maintain effective internal controls',
            category: 'Internal Controls',
            priority: 'high',
            status: 'partial',
            evidence: ['internal-controls-assessment.pdf'],
            controls: ['Access Controls', 'Change Management', 'Segregation of Duties'],
            lastChecked: '2024-01-12T09:15:00Z',
            nextCheck: '2024-04-12T09:15:00Z'
          }
        ],
        lastAssessment: '2024-01-12T09:15:00Z',
        nextAssessment: '2024-04-12T09:15:00Z',
        responsible: 'finance@idcertify.com',
        documentation: ['sox-policy.pdf', 'internal-controls-assessment.pdf']
      },
      {
        id: '3',
        name: 'ISO 27001',
        type: 'iso27001',
        description: 'Information Security Management System certification',
        status: 'compliant',
        score: 92,
        requirements: [
          {
            id: '4',
            title: 'Information Security Policy',
            description: 'Establish and maintain information security policies',
            category: 'Information Security',
            priority: 'high',
            status: 'compliant',
            evidence: ['information-security-policy.pdf', 'security-awareness-training.pdf'],
            controls: ['Security Policy Management', 'Security Awareness Training'],
            lastChecked: '2024-01-08T11:30:00Z',
            nextCheck: '2024-04-08T11:30:00Z'
          }
        ],
        lastAssessment: '2024-01-08T11:30:00Z',
        nextAssessment: '2024-04-08T11:30:00Z',
        responsible: 'security@idcertify.com',
        documentation: ['iso27001-policy.pdf', 'information-security-policy.pdf']
      }
    ]

    const mockAuditLogs: AuditLog[] = [
      {
        id: '1',
        timestamp: '2024-01-20T14:45:00Z',
        user: 'compliance@idcertify.com',
        action: 'GDPR_ASSESSMENT_COMPLETED',
        resource: 'GDPR Compliance Framework',
        framework: 'GDPR',
        status: 'success',
        details: { score: 95, requirements: 12, compliant: 11 },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      },
      {
        id: '2',
        timestamp: '2024-01-20T14:30:00Z',
        user: 'auditor@external.com',
        action: 'SOX_AUDIT_STARTED',
        resource: 'SOX Compliance Framework',
        framework: 'SOX',
        status: 'success',
        details: { auditId: 'audit_001', scope: 'Q1 2024' },
        ipAddress: '203.0.113.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    ]

    const mockReports: ComplianceReport[] = [
      {
        id: '1',
        name: 'GDPR Compliance Assessment Q1 2024',
        framework: 'GDPR',
        type: 'assessment',
        status: 'completed',
        generatedBy: 'compliance@idcertify.com',
        generatedAt: '2024-01-15T10:30:00Z',
        approvedBy: 'legal@idcertify.com',
        approvedAt: '2024-01-16T14:20:00Z',
        findings: 2,
        recommendations: 5,
        score: 95,
        format: 'pdf'
      },
      {
        id: '2',
        name: 'SOX Internal Controls Review',
        framework: 'SOX',
        type: 'audit',
        status: 'in-progress',
        generatedBy: 'auditor@external.com',
        generatedAt: '2024-01-20T09:00:00Z',
        findings: 0,
        recommendations: 0,
        score: 0,
        format: 'pdf'
      }
    ]

    setTimeout(() => {
      setFrameworks(mockFrameworks)
      setAuditLogs(mockAuditLogs)
      setReports(mockReports)
      setIsLoading(false)
    }, 1000)
  }

  const filteredFrameworks = frameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         framework.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || framework.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getFrameworkIcon = (type: string) => {
    switch (type) {
      case 'gdpr':
        return <Globe className="h-5 w-5 text-blue-600" />
      case 'sox':
        return <Building className="h-5 w-5 text-green-600" />
      case 'hipaa':
        return <Shield className="h-5 w-5 text-red-600" />
      case 'iso27001':
        return <Lock className="h-5 w-5 text-purple-600" />
      case 'pci-dss':
        return <CreditCard className="h-5 w-5 text-yellow-600" />
      default:
        return <Shield className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800'
      case 'non-compliant':
        return 'bg-red-100 text-red-800'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      case 'not-applicable':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Compliance Management</h1>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Compliance
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onScheduleAudit()}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule Audit</span>
          </button>
          
          <button
            onClick={() => onCreateReport()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create Report</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Tabs */}
            <div className="space-y-2">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'frameworks', name: 'Compliance Frameworks', icon: Shield },
                { id: 'requirements', name: 'Requirements', icon: FileText },
                { id: 'audits', name: 'Audit Logs', icon: Activity },
                { id: 'reports', name: 'Reports', icon: BookOpen },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Filters */}
            {activeTab === 'frameworks' && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Filters</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Search frameworks..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="compliant">Compliant</option>
                      <option value="non-compliant">Non-Compliant</option>
                      <option value="partial">Partial</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Compliance Overview</h2>
                <p className="text-gray-600">
                  Monitor and manage regulatory compliance across multiple frameworks.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Frameworks</p>
                      <p className="text-2xl font-bold text-gray-900">{frameworks.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Compliant Frameworks</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {frameworks.filter(f => f.status === 'compliant').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Requirements</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {frameworks.reduce((acc, f) => acc + f.requirements.length, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Compliance Score</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(frameworks.reduce((acc, f) => acc + f.score, 0) / frameworks.length)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
                <div className="space-y-4">
                  {frameworks.map((framework) => (
                    <div key={framework.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getFrameworkIcon(framework.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{framework.name}</p>
                          <p className="text-xs text-gray-600">{framework.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(framework.status)}`}>
                          {framework.status}
                        </span>
                        <span className={`text-sm font-medium ${getScoreColor(framework.score)}`}>
                          {framework.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'frameworks' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Compliance Frameworks</h2>
                <p className="text-gray-600">
                  Manage regulatory compliance frameworks and requirements.
                </p>
              </div>

              {/* Frameworks List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-600">Loading frameworks...</span>
                  </div>
                ) : (
                  filteredFrameworks.map((framework) => (
                    <div
                      key={framework.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedFramework(framework)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getFrameworkIcon(framework.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{framework.name}</h3>
                            <p className="text-sm text-gray-600">{framework.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(framework.status)}`}>
                            {framework.status}
                          </span>
                          <span className={`text-lg font-bold ${getScoreColor(framework.score)}`}>
                            {framework.score}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Requirements</p>
                          <p className="text-lg font-semibold text-gray-900">{framework.requirements.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Assessment</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(framework.lastAssessment).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Next Assessment</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(framework.nextAssessment).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          Responsible: {framework.responsible}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onViewFramework(framework)
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Compliance Reports</h2>
                <p className="text-gray-600">
                  Generate and manage compliance reports and assessments.
                </p>
              </div>

              {/* Reports Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Framework
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Generated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{report.name}</div>
                              <div className="text-sm text-gray-500">by {report.generatedBy}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.framework}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {report.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.score > 0 ? `${report.score}%` : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(report.generatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Download
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
        </div>
      </div>
    </div>
  )
}

export default ComplianceManagement
