import React, { useState, useEffect } from 'react'
import { 
  Brain, 
  Shield, 
  Eye, 
  Zap, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  BarChart3,
  Activity,
  Users,
  Clock,
  Star,
  Award,
  Lock,
  Unlock,
  RefreshCw,
  Info,
  AlertCircle,
  Lightbulb,
  Cpu,
  Database,
  Network,
  Globe,
  Smartphone,
  Camera,
  Fingerprint,
  FileText,
  MessageSquare,
  Bell,
  Mail,
  ExternalLink,
  Copy,
  Save,
  Edit,
  Trash2,
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Filter,
  Search,
  Calendar,
  MapPin,
  CreditCard,
  Building,
  User,
  UserCheck,
  UserX,
  Flag,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  BookOpen,
  Code,
  Terminal,
  Layers,
  Grid,
  List,
  Monitor,
  Smartphone as Phone,
  Tablet
} from 'lucide-react'

interface AIFeature {
  id: string
  name: string
  description: string
  category: 'fraud-detection' | 'document-analysis' | 'biometric-verification' | 'risk-assessment' | 'automation' | 'analytics'
  status: 'active' | 'inactive' | 'beta' | 'maintenance'
  accuracy: number
  confidence: number
  processingTime: number
  cost: number
  usage: {
    total: number
    successful: number
    failed: number
    lastUsed: string
  }
  configuration: any
  metrics: {
    precision: number
    recall: number
    f1Score: number
    falsePositiveRate: number
  }
  dependencies: string[]
  version: string
  lastUpdated: string
}

interface FraudDetectionRule {
  id: string
  name: string
  description: string
  type: 'pattern' | 'behavioral' | 'device' | 'location' | 'velocity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  enabled: boolean
  threshold: number
  conditions: any[]
  actions: string[]
  accuracy: number
  falsePositives: number
  lastTriggered: string
}

interface RiskScore {
  overall: number
  factors: {
    document: number
    biometric: number
    behavioral: number
    device: number
    location: number
    velocity: number
  }
  confidence: number
  recommendations: string[]
  flags: string[]
}

interface AIPoweredFeaturesProps {
  onConfigureFeature: (feature: AIFeature) => void
  onTestFeature: (feature: AIFeature) => void
  onViewAnalytics: (feature: AIFeature) => void
  onClose: () => void
}

const AIPoweredFeatures: React.FC<AIPoweredFeaturesProps> = ({
  onConfigureFeature,
  onTestFeature,
  onViewAnalytics,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'fraud-detection' | 'document-analysis' | 'biometric-verification' | 'risk-assessment' | 'automation' | 'analytics'>('overview')
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [showConfiguration, setShowConfiguration] = useState(false)
  const [fraudRules, setFraudRules] = useState<FraudDetectionRule[]>([])
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null)

  const [features, setFeatures] = useState<AIFeature[]>([])

  useEffect(() => {
    loadAIFeatures()
  }, [])

  const loadAIFeatures = async () => {
    // Mock data - in real app, this would come from API
    const mockFeatures: AIFeature[] = [
      {
        id: '1',
        name: 'Advanced Fraud Detection',
        description: 'AI-powered fraud detection using machine learning models to identify suspicious patterns and behaviors',
        category: 'fraud-detection',
        status: 'active',
        accuracy: 96.8,
        confidence: 0.94,
        processingTime: 150,
        cost: 0.05,
        usage: {
          total: 15420,
          successful: 14920,
          failed: 500,
          lastUsed: '2024-01-20T10:30:00Z'
        },
        configuration: {
          model: 'fraud-detection-v2.1',
          threshold: 0.85,
          features: ['document_analysis', 'behavioral_patterns', 'device_fingerprinting'],
          retrainFrequency: 'weekly'
        },
        metrics: {
          precision: 0.968,
          recall: 0.952,
          f1Score: 0.960,
          falsePositiveRate: 0.032
        },
        dependencies: ['document-analysis', 'biometric-verification'],
        version: '2.1.0',
        lastUpdated: '2024-01-15T14:30:00Z'
      },
      {
        id: '2',
        name: 'Document Authenticity Verification',
        description: 'Advanced OCR and document analysis to verify document authenticity and extract information',
        category: 'document-analysis',
        status: 'active',
        accuracy: 98.2,
        confidence: 0.97,
        processingTime: 800,
        cost: 0.03,
        usage: {
          total: 25680,
          successful: 25220,
          failed: 460,
          lastUsed: '2024-01-20T10:25:00Z'
        },
        configuration: {
          model: 'document-analysis-v1.8',
          supportedTypes: ['passport', 'drivers-license', 'national-id', 'utility-bill'],
          ocrEngine: 'tesseract-v5',
          authenticityChecks: ['watermark', 'microprint', 'security-features']
        },
        metrics: {
          precision: 0.982,
          recall: 0.978,
          f1Score: 0.980,
          falsePositiveRate: 0.018
        },
        dependencies: [],
        version: '1.8.0',
        lastUpdated: '2024-01-10T09:15:00Z'
      },
      {
        id: '3',
        name: 'Liveness Detection',
        description: 'AI-powered liveness detection to ensure the person is real and present during verification',
        category: 'biometric-verification',
        status: 'active',
        accuracy: 99.1,
        confidence: 0.98,
        processingTime: 200,
        cost: 0.02,
        usage: {
          total: 18930,
          successful: 18750,
          failed: 180,
          lastUsed: '2024-01-20T10:20:00Z'
        },
        configuration: {
          model: 'liveness-detection-v3.0',
          actions: ['blink', 'smile', 'turn-head', 'nod'],
          qualityThreshold: 0.8,
          antiSpoofing: true
        },
        metrics: {
          precision: 0.991,
          recall: 0.989,
          f1Score: 0.990,
          falsePositiveRate: 0.009
        },
        dependencies: [],
        version: '3.0.0',
        lastUpdated: '2024-01-12T16:45:00Z'
      },
      {
        id: '4',
        name: 'Risk Assessment Engine',
        description: 'Comprehensive risk scoring based on multiple factors including document, biometric, and behavioral analysis',
        category: 'risk-assessment',
        status: 'active',
        accuracy: 94.5,
        confidence: 0.91,
        processingTime: 300,
        cost: 0.04,
        usage: {
          total: 12340,
          successful: 11660,
          failed: 680,
          lastUsed: '2024-01-20T10:15:00Z'
        },
        configuration: {
          model: 'risk-assessment-v2.3',
          factors: ['document_quality', 'biometric_match', 'behavioral_analysis', 'device_trust', 'location_risk'],
          weights: {
            document: 0.3,
            biometric: 0.25,
            behavioral: 0.2,
            device: 0.15,
            location: 0.1
          }
        },
        metrics: {
          precision: 0.945,
          recall: 0.938,
          f1Score: 0.941,
          falsePositiveRate: 0.055
        },
        dependencies: ['document-analysis', 'biometric-verification', 'fraud-detection'],
        version: '2.3.0',
        lastUpdated: '2024-01-08T11:20:00Z'
      },
      {
        id: '5',
        name: 'Smart Automation',
        description: 'AI-powered automation for verification workflows, including auto-approval and escalation',
        category: 'automation',
        status: 'beta',
        accuracy: 92.3,
        confidence: 0.89,
        processingTime: 100,
        cost: 0.01,
        usage: {
          total: 5670,
          successful: 5230,
          failed: 440,
          lastUsed: '2024-01-20T10:10:00Z'
        },
        configuration: {
          model: 'automation-v1.2',
          autoApproveThreshold: 0.95,
          escalationThreshold: 0.3,
          maxAutoApprovalRate: 0.8
        },
        metrics: {
          precision: 0.923,
          recall: 0.915,
          f1Score: 0.919,
          falsePositiveRate: 0.077
        },
        dependencies: ['risk-assessment'],
        version: '1.2.0',
        lastUpdated: '2024-01-05T13:30:00Z'
      },
      {
        id: '6',
        name: 'Predictive Analytics',
        description: 'Advanced analytics and predictions for verification trends, fraud patterns, and performance optimization',
        category: 'analytics',
        status: 'active',
        accuracy: 88.7,
        confidence: 0.85,
        processingTime: 500,
        cost: 0.02,
        usage: {
          total: 2340,
          successful: 2070,
          failed: 270,
          lastUsed: '2024-01-20T10:05:00Z'
        },
        configuration: {
          model: 'analytics-v1.5',
          predictionHorizon: '7d',
          features: ['historical_patterns', 'seasonal_trends', 'fraud_indicators'],
          updateFrequency: 'daily'
        },
        metrics: {
          precision: 0.887,
          recall: 0.875,
          f1Score: 0.881,
          falsePositiveRate: 0.113
        },
        dependencies: ['fraud-detection', 'risk-assessment'],
        version: '1.5.0',
        lastUpdated: '2024-01-03T10:15:00Z'
      }
    ]

    const mockFraudRules: FraudDetectionRule[] = [
      {
        id: '1',
        name: 'Rapid Document Upload',
        description: 'Detects suspiciously fast document uploads that may indicate automated attacks',
        type: 'velocity',
        severity: 'medium',
        enabled: true,
        threshold: 0.8,
        conditions: [
          { field: 'upload_time', operator: '<', value: 2 },
          { field: 'document_quality', operator: '>', value: 0.9 }
        ],
        actions: ['flag_for_review', 'request_additional_verification'],
        accuracy: 0.85,
        falsePositives: 12,
        lastTriggered: '2024-01-20T09:45:00Z'
      },
      {
        id: '2',
        name: 'Device Fingerprint Mismatch',
        description: 'Identifies when device fingerprints don\'t match expected patterns',
        type: 'device',
        severity: 'high',
        enabled: true,
        threshold: 0.7,
        conditions: [
          { field: 'device_trust_score', operator: '<', value: 0.3 },
          { field: 'browser_anomalies', operator: '>', value: 0.5 }
        ],
        actions: ['block_verification', 'request_manual_review'],
        accuracy: 0.92,
        falsePositives: 8,
        lastTriggered: '2024-01-20T08:30:00Z'
      }
    ]

    const mockRiskScore: RiskScore = {
      overall: 0.85,
      factors: {
        document: 0.92,
        biometric: 0.88,
        behavioral: 0.78,
        device: 0.82,
        location: 0.90,
        velocity: 0.85
      },
      confidence: 0.91,
      recommendations: [
        'Document quality is excellent',
        'Biometric match is strong',
        'Consider additional behavioral verification',
        'Device trust score is acceptable'
      ],
      flags: ['high_confidence', 'low_risk']
    }

    setFeatures(mockFeatures)
    setFraudRules(mockFraudRules)
    setRiskScore(mockRiskScore)
  }

  const testFeature = async (feature: AIFeature) => {
    setIsTesting(true)
    setSelectedFeature(feature)
    
    // Simulate AI feature testing
    setTimeout(() => {
      setTestResults({
        feature: feature.name,
        status: 'success',
        accuracy: feature.accuracy,
        processingTime: feature.processingTime,
        confidence: feature.confidence,
        result: {
          prediction: 'low_risk',
          score: 0.92,
          explanation: 'AI model processed the input successfully with high confidence'
        },
        timestamp: new Date().toISOString()
      })
      setIsTesting(false)
    }, 2000)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fraud-detection':
        return <Shield className="h-5 w-5" />
      case 'document-analysis':
        return <FileText className="h-5 w-5" />
      case 'biometric-verification':
        return <Fingerprint className="h-5 w-5" />
      case 'risk-assessment':
        return <Target className="h-5 w-5" />
      case 'automation':
        return <Zap className="h-5 w-5" />
      case 'analytics':
        return <BarChart3 className="h-5 w-5" />
      default:
        return <Brain className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fraud-detection':
        return 'bg-red-100 text-red-800'
      case 'document-analysis':
        return 'bg-blue-100 text-blue-800'
      case 'biometric-verification':
        return 'bg-green-100 text-green-800'
      case 'risk-assessment':
        return 'bg-yellow-100 text-yellow-800'
      case 'automation':
        return 'bg-purple-100 text-purple-800'
      case 'analytics':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'beta':
        return 'bg-yellow-100 text-yellow-800'
      case 'maintenance':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`
  }

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">AI-Powered Features</h1>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
            Machine Learning
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewAnalytics(selectedFeature || features[0])}
            disabled={!selectedFeature && features.length === 0}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </button>
          
          <button
            onClick={() => onConfigureFeature(selectedFeature || features[0])}
            disabled={!selectedFeature && features.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Settings className="h-4 w-4" />
            <span>Configure</span>
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
                { id: 'overview', name: 'Overview', icon: Brain },
                { id: 'fraud-detection', name: 'Fraud Detection', icon: Shield },
                { id: 'document-analysis', name: 'Document Analysis', icon: FileText },
                { id: 'biometric-verification', name: 'Biometric Verification', icon: Fingerprint },
                { id: 'risk-assessment', name: 'Risk Assessment', icon: Target },
                { id: 'automation', name: 'Automation', icon: Zap },
                { id: 'analytics', name: 'Analytics', icon: BarChart3 }
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

            {/* Quick Stats */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Features</span>
                  <span className="text-sm font-medium text-gray-900">
                    {features.filter(f => f.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Accuracy</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatPercentage(features.reduce((acc, f) => acc + f.accuracy, 0) / features.length / 100)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Usage</span>
                  <span className="text-sm font-medium text-gray-900">
                    {features.reduce((acc, f) => acc + f.usage.total, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Features Overview</h2>
                <p className="text-gray-600">
                  Leverage advanced AI and machine learning to enhance verification accuracy and automate processes.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getCategoryIcon(feature.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getStatusColor(feature.status)}`}>
                            {feature.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            testFeature(feature)
                          }}
                          disabled={isTesting}
                          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onConfigureFeature(feature)
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Accuracy</span>
                        <span className="font-medium text-gray-900">{feature.accuracy}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Processing Time</span>
                        <span className="font-medium text-gray-900">{feature.processingTime}ms</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Cost per Use</span>
                        <span className="font-medium text-gray-900">{formatCurrency(feature.cost)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Usage</span>
                        <span className="font-medium text-gray-900">{feature.usage.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPercentage(features.reduce((acc, f) => acc + f.metrics.precision, 0) / features.length)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Precision</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPercentage(features.reduce((acc, f) => acc + f.metrics.recall, 0) / features.length)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Recall</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatPercentage(features.reduce((acc, f) => acc + f.metrics.f1Score, 0) / features.length)}
                    </div>
                    <div className="text-sm text-gray-600">Avg F1 Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatPercentage(features.reduce((acc, f) => acc + f.metrics.falsePositiveRate, 0) / features.length)}
                    </div>
                    <div className="text-sm text-gray-600">Avg False Positive Rate</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fraud-detection' && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Fraud Detection</h2>
                <p className="text-gray-600">
                  AI-powered fraud detection rules and patterns to identify suspicious activities.
                </p>
              </div>

              {/* Fraud Rules */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold text-gray-900">Detection Rules</h3>
                  <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Rule</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {fraudRules.map((rule) => (
                    <div key={rule.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{rule.name}</h4>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getSeverityColor(rule.severity)}`}>
                            {rule.severity}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {rule.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="ml-2 font-medium text-gray-900">{formatPercentage(rule.accuracy)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">False Positives:</span>
                          <span className="ml-2 font-medium text-gray-900">{rule.falsePositives}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Triggered:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {new Date(rule.lastTriggered).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risk-assessment' && riskScore && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Risk Assessment</h2>
                <p className="text-gray-600">
                  Comprehensive risk scoring based on multiple AI-powered factors.
                </p>
              </div>

              {/* Risk Score Overview */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Current Risk Score</h3>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {formatPercentage(riskScore.overall)}
                  </div>
                  <div className="text-sm text-gray-600">Overall Risk Score</div>
                  <div className="text-sm text-gray-500">Confidence: {formatPercentage(riskScore.confidence)}</div>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(riskScore.factors).map(([factor, score]) => (
                    <div key={factor}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {factor.replace('_', ' ')}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{formatPercentage(score)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${score * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {riskScore.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Risk Flags</h3>
                <div className="flex flex-wrap gap-2">
                  {riskScore.flags.map((flag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {flag.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testing' && selectedFeature && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Feature Testing</h2>
                <p className="text-gray-600">
                  Test the <strong>{selectedFeature.name}</strong> AI feature with sample data.
                </p>
              </div>

              {/* Test Configuration */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Test Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Data Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="sample">Sample Data</option>
                      <option value="upload">Upload File</option>
                      <option value="url">URL Input</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Input
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Enter test data or upload a file..."
                    />
                  </div>
                  
                  <button
                    onClick={() => testFeature(selectedFeature)}
                    disabled={isTesting}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isTesting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    <span>{isTesting ? 'Testing...' : 'Run Test'}</span>
                  </button>
                </div>
              </div>

              {/* Test Results */}
              {testResults && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-md font-semibold text-gray-900 mb-4">Test Results</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{testResults.accuracy}%</div>
                        <div className="text-sm text-gray-600">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{testResults.processingTime}ms</div>
                        <div className="text-sm text-gray-600">Processing Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{formatPercentage(testResults.confidence)}</div>
                        <div className="text-sm text-gray-600">Confidence</div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AI Prediction
                      </label>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="font-mono text-sm">
                          <div><strong>Prediction:</strong> {testResults.result.prediction}</div>
                          <div><strong>Score:</strong> {testResults.result.score}</div>
                          <div><strong>Explanation:</strong> {testResults.result.explanation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIPoweredFeatures
