import React, { useState } from 'react'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Download, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  Globe,
  Building,
  Users,
  Settings,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Info,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Target,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface ComplianceRequirement {
  id: string
  title: string
  description: string
  category: 'technical' | 'administrative' | 'physical' | 'organizational'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'not-started' | 'in-progress' | 'completed' | 'reviewed' | 'approved'
  assignedTo: string
  dueDate: string
  lastUpdated: string
  evidence: string[]
  notes: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  dependencies: string[]
}

interface RegulatoryFramework {
  id: string
  name: string
  jurisdiction: string
  version: string
  status: 'active' | 'inactive' | 'pending' | 'deprecated'
  lastUpdated: string
  nextReview: string
  requirements: ComplianceRequirement[]
  complianceScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  category: 'data-protection' | 'financial' | 'operational' | 'regulatory'
  description: string
  applicableTo: string[]
  penalties: string[]
  resources: string[]
}

const RegulatoryComplianceManager = () => {
  const [activeTab, setActiveTab] = useState<'frameworks' | 'requirements' | 'mapping' | 'changes'>('frameworks')
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [expandedRequirements, setExpandedRequirements] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  // Mock data - in real implementation, this would come from API
  const frameworks: RegulatoryFramework[] = [
    {
      id: '1',
      name: 'GDPR',
      jurisdiction: 'EU',
      version: '2018/679',
      status: 'active',
      lastUpdated: '2024-01-15',
      nextReview: '2024-04-15',
      complianceScore: 95,
      riskLevel: 'low',
      category: 'data-protection',
      description: 'General Data Protection Regulation - EU data protection and privacy law',
      applicableTo: ['EU Operations', 'EU Customers', 'Data Processing'],
      penalties: ['Up to €20M or 4% of annual turnover', 'Reputational damage', 'Operational restrictions'],
      resources: ['GDPR Official Text', 'Guidelines', 'Case Studies', 'Training Materials'],
      requirements: [
        {
          id: '1-1',
          title: 'Data Processing Lawfulness',
          description: 'Ensure all data processing activities have a lawful basis under Article 6',
          category: 'administrative',
          priority: 'critical',
          status: 'completed',
          assignedTo: 'Legal Team',
          dueDate: '2024-01-30',
          lastUpdated: '2024-01-15',
          evidence: ['Data Processing Register', 'Consent Forms', 'Legal Basis Documentation'],
          notes: 'All processing activities documented and lawful basis established',
          riskLevel: 'low',
          dependencies: []
        },
        {
          id: '1-2',
          title: 'Data Subject Rights Implementation',
          description: 'Implement mechanisms for data subjects to exercise their rights',
          category: 'technical',
          priority: 'high',
          status: 'in-progress',
          assignedTo: 'IT Team',
          dueDate: '2024-02-15',
          lastUpdated: '2024-01-20',
          evidence: ['Right to Access Portal', 'Data Portability Tool', 'Deletion Process'],
          notes: 'Portal development in progress, testing phase',
          riskLevel: 'medium',
          dependencies: ['1-1']
        },
        {
          id: '1-3',
          title: 'Privacy by Design',
          description: 'Implement privacy by design principles in all systems and processes',
          category: 'technical',
          priority: 'high',
          status: 'reviewed',
          assignedTo: 'Product Team',
          dueDate: '2024-03-01',
          lastUpdated: '2024-01-25',
          evidence: ['System Architecture Review', 'Privacy Impact Assessments', 'Design Documentation'],
          notes: 'Architecture reviewed, awaiting final approval',
          riskLevel: 'medium',
          dependencies: ['1-2']
        }
      ]
    },
    {
      id: '2',
      name: 'SOX',
      jurisdiction: 'US',
      version: '2002',
      status: 'active',
      lastUpdated: '2024-01-10',
      nextReview: '2024-02-10',
      complianceScore: 78,
      riskLevel: 'medium',
      category: 'financial',
      description: 'Sarbanes-Oxley Act - Financial reporting and corporate governance requirements',
      applicableTo: ['Financial Reporting', 'Internal Controls', 'Audit Processes'],
      penalties: ['Criminal penalties', 'Civil penalties', 'Delisting from exchanges', 'Reputational damage'],
      resources: ['SOX Act Text', 'SEC Guidelines', 'Audit Standards', 'Control Frameworks'],
      requirements: [
        {
          id: '2-1',
          title: 'Internal Control Framework',
          description: 'Establish and maintain effective internal controls over financial reporting',
          category: 'administrative',
          priority: 'critical',
          status: 'completed',
          assignedTo: 'Finance Team',
          dueDate: '2024-01-31',
          lastUpdated: '2024-01-10',
          evidence: ['Control Documentation', 'Testing Results', 'Management Assessment'],
          notes: 'Framework established and documented',
          riskLevel: 'low',
          dependencies: []
        },
        {
          id: '2-2',
          title: 'Management Assessment',
          description: 'Conduct annual assessment of internal controls effectiveness',
          category: 'administrative',
          priority: 'high',
          status: 'in-progress',
          assignedTo: 'Management',
          dueDate: '2024-02-10',
          lastUpdated: '2024-01-20',
          evidence: ['Assessment Report', 'Testing Documentation', 'Remediation Plans'],
          notes: 'Assessment in progress, testing phase',
          riskLevel: 'medium',
          dependencies: ['2-1']
        }
      ]
    },
    {
      id: '3',
      name: 'PCI-DSS',
      jurisdiction: 'Global',
      version: '4.0',
      status: 'active',
      lastUpdated: '2024-01-05',
      nextReview: '2024-07-05',
      complianceScore: 92,
      riskLevel: 'low',
      category: 'operational',
      description: 'Payment Card Industry Data Security Standard - Security requirements for card data',
      applicableTo: ['Payment Processing', 'Card Data Storage', 'Network Security'],
      penalties: ['Fines up to $500,000', 'Loss of card processing privileges', 'Reputational damage'],
      resources: ['PCI-DSS Standard', 'Self-Assessment Questionnaire', 'Security Guidelines'],
      requirements: [
        {
          id: '3-1',
          title: 'Secure Network Architecture',
          description: 'Build and maintain secure networks and systems',
          category: 'technical',
          priority: 'critical',
          status: 'completed',
          assignedTo: 'Security Team',
          dueDate: '2024-01-31',
          lastUpdated: '2024-01-05',
          evidence: ['Network Diagrams', 'Firewall Configurations', 'Security Testing'],
          notes: 'Network architecture secured and tested',
          riskLevel: 'low',
          dependencies: []
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'reviewed': return 'text-yellow-600 bg-yellow-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'not-started': return 'text-gray-600 bg-gray-100'
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Settings className="w-4 h-4" />
      case 'administrative': return <FileText className="w-4 h-4" />
      case 'physical': return <Building className="w-4 h-4" />
      case 'organizational': return <Users className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const toggleRequirementExpansion = (requirementId: string) => {
    const newExpanded = new Set(expandedRequirements)
    if (newExpanded.has(requirementId)) {
      newExpanded.delete(requirementId)
    } else {
      newExpanded.add(requirementId)
    }
    setExpandedRequirements(newExpanded)
  }

  const filteredFrameworks = frameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         framework.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getComplianceTrend = (score: number) => {
    // Mock trend calculation
    const trend = score > 80 ? 'up' : score > 60 ? 'stable' : 'down'
    return trend
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regulatory Compliance Manager</h1>
          <p className="text-gray-600 mt-1">Manage regulatory frameworks, requirements, and compliance mapping</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Framework
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'frameworks', name: 'Frameworks', icon: Shield },
            { id: 'requirements', name: 'Requirements', icon: FileText },
            { id: 'mapping', name: 'Compliance Mapping', icon: Target },
            { id: 'changes', name: 'Regulatory Changes', icon: AlertCircle }
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
      {activeTab === 'frameworks' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search frameworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Framework Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFrameworks.map((framework) => (
              <div key={framework.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                      <p className="text-sm text-gray-600">{framework.jurisdiction} • v{framework.version}</p>
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
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">{framework.complianceScore}%</span>
                        {getComplianceTrend(framework.complianceScore) === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : getComplianceTrend(framework.complianceScore) === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <div className="w-4 h-4 bg-gray-400 rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          framework.complianceScore >= 90 ? 'bg-green-500' : 
                          framework.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${framework.complianceScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Requirements</p>
                      <p className="font-medium text-gray-900">{framework.requirements.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Review</p>
                      <p className="font-medium text-gray-900">{framework.nextReview}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">{framework.description}</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedFramework(framework.id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        View Details
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requirements' && selectedFramework && (
        <div className="space-y-6">
          {(() => {
            const framework = frameworks.find(f => f.id === selectedFramework)
            if (!framework) return null

            return (
              <>
                {/* Framework Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{framework.name} Requirements</h2>
                      <p className="text-gray-600 mt-1">{framework.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Compliance Score</p>
                      <p className="text-2xl font-bold text-gray-900">{framework.complianceScore}%</p>
                    </div>
                  </div>
                </div>

                {/* Requirements List */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Requirements ({framework.requirements.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {framework.requirements.map((requirement) => (
                      <div key={requirement.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => toggleRequirementExpansion(requirement.id)}
                              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
                            >
                              {expandedRequirements.has(requirement.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                              {getCategoryIcon(requirement.category)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{requirement.title}</h4>
                              <p className="text-sm text-gray-600">{requirement.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(requirement.status)}`}>
                              {requirement.status}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(requirement.priority)}`}>
                              {requirement.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(requirement.riskLevel)}`}>
                              {requirement.riskLevel}
                            </span>
                          </div>
                        </div>

                        {expandedRequirements.has(requirement.id) && (
                          <div className="mt-6 ml-12 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-700">Assigned To</p>
                                <p className="text-sm text-gray-900">{requirement.assignedTo}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Due Date</p>
                                <p className="text-sm text-gray-900">{requirement.dueDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Last Updated</p>
                                <p className="text-sm text-gray-900">{requirement.lastUpdated}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Category</p>
                                <p className="text-sm text-gray-900 capitalize">{requirement.category}</p>
                              </div>
                            </div>

                            {requirement.notes && (
                              <div>
                                <p className="text-sm font-medium text-gray-700">Notes</p>
                                <p className="text-sm text-gray-900">{requirement.notes}</p>
                              </div>
                            )}

                            {requirement.evidence.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-gray-700">Evidence</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {requirement.evidence.map((evidence, index) => (
                                    <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                      {evidence}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {requirement.dependencies.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-gray-700">Dependencies</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {requirement.dependencies.map((dep, index) => (
                                    <span key={index} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                      {dep}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex space-x-2 pt-4 border-t border-gray-200">
                              <button className="px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                                <Edit className="w-4 h-4 mr-1 inline" />
                                Edit
                              </button>
                              <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Eye className="w-4 h-4 mr-1 inline" />
                                View Evidence
                              </button>
                              <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      )}

      {activeTab === 'mapping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Mapping</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Compliance mapping matrix will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Map requirements across frameworks and identify overlaps</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'changes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Changes</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Regulatory change tracking will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Monitor regulatory updates and assess impact</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegulatoryComplianceManager
