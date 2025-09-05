import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Shield, 
  Target, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Building,
  Globe,
  FileText,
  Zap,
  Info,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  RefreshCw
} from 'lucide-react'

interface RiskFactor {
  id: string
  name: string
  category: 'operational' | 'financial' | 'regulatory' | 'reputational' | 'technical'
  weight: number
  currentScore: number
  previousScore: number
  impact: 'low' | 'medium' | 'high' | 'critical'
  likelihood: 'low' | 'medium' | 'high' | 'critical'
  description: string
  mitigation: string[]
  owner: string
  lastAssessed: string
  nextReview: string
  status: 'active' | 'mitigated' | 'monitoring' | 'closed'
}

interface RiskAssessment {
  id: string
  name: string
  framework: string
  overallScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  lastUpdated: string
  nextReview: string
  factors: RiskFactor[]
  trends: {
    score: number[]
    date: string[]
  }
  recommendations: string[]
  status: 'draft' | 'in-progress' | 'completed' | 'approved'
}

interface RiskMitigation {
  id: string
  riskId: string
  title: string
  description: string
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTo: string
  dueDate: string
  cost: number
  effectiveness: number
  progress: number
}

const AdvancedRiskAssessment = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assessments' | 'factors' | 'mitigation' | 'analytics'>('overview')
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)
  const [expandedFactors, setExpandedFactors] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all')

  // Mock data - in real implementation, this would come from API
  const assessments: RiskAssessment[] = [
    {
      id: '1',
      name: 'GDPR Compliance Risk Assessment',
      framework: 'GDPR',
      overallScore: 75,
      riskLevel: 'medium',
      lastUpdated: '2024-01-20',
      nextReview: '2024-04-20',
      status: 'completed',
      factors: [
        {
          id: '1-1',
          name: 'Data Breach Risk',
          category: 'regulatory',
          weight: 25,
          currentScore: 80,
          previousScore: 85,
          impact: 'critical',
          likelihood: 'medium',
          description: 'Risk of data breach leading to GDPR violations',
          mitigation: ['Encryption', 'Access Controls', 'Monitoring'],
          owner: 'Security Team',
          lastAssessed: '2024-01-15',
          nextReview: '2024-02-15',
          status: 'active'
        },
        {
          id: '1-2',
          name: 'Consent Management',
          category: 'operational',
          weight: 20,
          currentScore: 70,
          previousScore: 65,
          impact: 'high',
          likelihood: 'medium',
          description: 'Risk of improper consent collection and management',
          mitigation: ['Consent Forms', 'Audit Trail', 'Training'],
          owner: 'Legal Team',
          lastAssessed: '2024-01-18',
          nextReview: '2024-02-18',
          status: 'active'
        }
      ],
      trends: {
        score: [70, 72, 75, 75],
        date: ['2023-10-20', '2023-11-20', '2023-12-20', '2024-01-20']
      },
      recommendations: [
        'Implement additional data encryption measures',
        'Enhance consent management system',
        'Conduct regular security training'
      ]
    },
    {
      id: '2',
      name: 'SOX Financial Risk Assessment',
      framework: 'SOX',
      overallScore: 85,
      riskLevel: 'low',
      lastUpdated: '2024-01-15',
      nextReview: '2024-04-15',
      status: 'completed',
      factors: [
        {
          id: '2-1',
          name: 'Internal Controls',
          category: 'financial',
          weight: 30,
          currentScore: 90,
          previousScore: 88,
          impact: 'critical',
          likelihood: 'low',
          description: 'Risk of ineffective internal controls over financial reporting',
          mitigation: ['Control Testing', 'Documentation', 'Training'],
          owner: 'Finance Team',
          lastAssessed: '2024-01-10',
          nextReview: '2024-02-10',
          status: 'active'
        }
      ],
      trends: {
        score: [80, 82, 85, 85],
        date: ['2023-10-15', '2023-11-15', '2023-12-15', '2024-01-15']
      },
      recommendations: [
        'Maintain current control effectiveness',
        'Continue regular testing procedures'
      ]
    }
  ]

  const mitigations: RiskMitigation[] = [
    {
      id: '1',
      riskId: '1-1',
      title: 'Implement Advanced Encryption',
      description: 'Deploy end-to-end encryption for all sensitive data',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Security Team',
      dueDate: '2024-02-28',
      cost: 50000,
      effectiveness: 85,
      progress: 60
    },
    {
      id: '2',
      riskId: '1-2',
      title: 'Enhance Consent Management',
      description: 'Upgrade consent collection and management system',
      status: 'planned',
      priority: 'medium',
      assignedTo: 'IT Team',
      dueDate: '2024-03-15',
      cost: 25000,
      effectiveness: 75,
      progress: 0
    }
  ]

  const getRiskLevelColor = (level: string) => {
    switch (level) {
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
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'planned': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-gray-600 bg-gray-100'
      case 'active': return 'text-blue-600 bg-blue-100'
      case 'mitigated': return 'text-green-600 bg-green-100'
      case 'monitoring': return 'text-yellow-600 bg-yellow-100'
      case 'closed': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'operational': return <Settings className="w-4 h-4" />
      case 'financial': return <Building className="w-4 h-4" />
      case 'regulatory': return <Shield className="w-4 h-4" />
      case 'reputational': return <Globe className="w-4 h-4" />
      case 'technical': return <Zap className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getMitigationStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'planned': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const toggleFactorExpansion = (factorId: string) => {
    const newExpanded = new Set(expandedFactors)
    if (newExpanded.has(factorId)) {
      newExpanded.delete(factorId)
    } else {
      newExpanded.add(factorId)
    }
    setExpandedFactors(newExpanded)
  }

  const calculateRiskScore = (impact: string, likelihood: string) => {
    const impactScores = { low: 1, medium: 2, high: 3, critical: 4 }
    const likelihoodScores = { low: 1, medium: 2, high: 3, critical: 4 }
    return impactScores[impact as keyof typeof impactScores] * likelihoodScores[likelihood as keyof typeof likelihoodScores]
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 12) return 'text-red-600 bg-red-100'
    if (score >= 8) return 'text-orange-600 bg-orange-100'
    if (score >= 4) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.framework.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const overallRiskScore = assessments.reduce((sum, assessment) => sum + assessment.overallScore, 0) / assessments.length
  const criticalRisks = assessments.filter(a => a.riskLevel === 'critical').length
  const highRisks = assessments.filter(a => a.riskLevel === 'high').length
  const activeMitigations = mitigations.filter(m => m.status === 'in-progress').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Risk Assessment</h1>
          <p className="text-gray-600 mt-1">Comprehensive risk analysis and mitigation management</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Assessment
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overall Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(overallRiskScore)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Risks</p>
              <p className="text-2xl font-bold text-gray-900">{criticalRisks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Risks</p>
              <p className="text-2xl font-bold text-gray-900">{highRisks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Mitigations</p>
              <p className="text-2xl font-bold text-gray-900">{activeMitigations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'assessments', name: 'Assessments', icon: Target },
            { id: 'factors', name: 'Risk Factors', icon: AlertTriangle },
            { id: 'mitigation', name: 'Mitigation', icon: Shield },
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
          {/* Risk Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
            <div className="space-y-4">
              {['critical', 'high', 'medium', 'low'].map((level) => {
                const count = assessments.filter(a => a.riskLevel === level).length
                const percentage = assessments.length > 0 ? (count / assessments.length) * 100 : 0
                return (
                  <div key={level} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(level)}`}>
                        {level}
                      </span>
                      <span className="text-sm text-gray-600">{count} assessments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            level === 'critical' ? 'bg-red-500' :
                            level === 'high' ? 'bg-orange-500' :
                            level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Assessments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h3>
            <div className="space-y-4">
              {assessments.slice(0, 3).map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{assessment.name}</h4>
                    <p className="text-sm text-gray-600">{assessment.framework}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">{assessment.overallScore}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(assessment.riskLevel)}`}>
                        {assessment.riskLevel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{assessment.lastUpdated}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assessments' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search assessments..."
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

          {/* Assessment Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAssessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{assessment.name}</h3>
                    <p className="text-sm text-gray-600">{assessment.framework}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(assessment.riskLevel)}`}>
                    {assessment.riskLevel}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Risk Score</span>
                      <span className="text-sm font-bold text-gray-900">{assessment.overallScore}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          assessment.overallScore >= 80 ? 'bg-red-500' : 
                          assessment.overallScore >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${assessment.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Risk Factors</p>
                      <p className="font-medium text-gray-900">{assessment.factors.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Updated</p>
                      <p className="font-medium text-gray-900">{assessment.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedAssessment(assessment.id)}
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
            ))}
          </div>
        </div>
      )}

      {activeTab === 'factors' && selectedAssessment && (
        <div className="space-y-6">
          {(() => {
            const assessment = assessments.find(a => a.id === selectedAssessment)
            if (!assessment) return null

            return (
              <>
                {/* Assessment Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{assessment.name} - Risk Factors</h2>
                      <p className="text-gray-600 mt-1">{assessment.framework} Risk Assessment</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Overall Risk Score</p>
                      <p className="text-2xl font-bold text-gray-900">{assessment.overallScore}</p>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Risk Factors ({assessment.factors.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {assessment.factors.map((factor) => {
                      const riskScore = calculateRiskScore(factor.impact, factor.likelihood)
                      return (
                        <div key={factor.id} className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => toggleFactorExpansion(factor.id)}
                                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
                              >
                                {expandedFactors.has(factor.id) ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>
                              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                                {getCategoryIcon(factor.category)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{factor.name}</h4>
                                <p className="text-sm text-gray-600">{factor.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskScoreColor(riskScore)}`}>
                                Score: {riskScore}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(factor.impact)}`}>
                                {factor.impact}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(factor.likelihood)}`}>
                                {factor.likelihood}
                              </span>
                            </div>
                          </div>

                          {expandedFactors.has(factor.id) && (
                            <div className="mt-6 ml-12 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Owner</p>
                                  <p className="text-sm text-gray-900">{factor.owner}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Weight</p>
                                  <p className="text-sm text-gray-900">{factor.weight}%</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Current Score</p>
                                  <p className="text-sm text-gray-900">{factor.currentScore}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Previous Score</p>
                                  <p className="text-sm text-gray-900">{factor.previousScore}</p>
                                </div>
                              </div>

                              {factor.mitigation.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Mitigation Strategies</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {factor.mitigation.map((strategy, index) => (
                                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                        {strategy}
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
                                  View Details
                                </button>
                                <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      )}

      {activeTab === 'mitigation' && (
        <div className="space-y-6">
          {/* Mitigation Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Mitigation Actions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mitigation Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mitigations.map((mitigation) => (
                    <tr key={mitigation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{mitigation.title}</div>
                          <div className="text-sm text-gray-500">{mitigation.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Risk {mitigation.riskId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMitigationStatusColor(mitigation.status)}`}>
                          {mitigation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${mitigation.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{mitigation.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mitigation.dueDate}
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
          {/* Risk Trends */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Risk trend analysis will be displayed here</p>
              </div>
            </div>
          </div>

          {/* Risk Heat Map */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Heat Map</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Risk heat map will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedRiskAssessment
