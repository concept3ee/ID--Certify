import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Shield,
  User,
  FileText,
  Database,
  Activity,
  Star,
  Target,
  Award,
  Info,
  Plus,
  Minus,
  Eye,
  Settings,
  Download,
  Share2,
  Filter,
  Search,
  Calendar,
  X,
  ExternalLink,
  RefreshCw
} from 'lucide-react'

interface ActivityLog {
  id: string
  timestamp: string
  type: 'score_change' | 'verification' | 'document_upload' | 'attester_action' | 'system' | 'security'
  title: string
  description: string
  scoreChange: number
  previousScore: number
  newScore: number
  status: 'completed' | 'pending' | 'failed' | 'processing'
  category: string
  details: {
    factor?: string
    document?: string
    attester?: string
    action?: string
    metadata?: Record<string, any>
  }
  icon: React.ComponentType<{ className?: string }>
}

interface ScoreChange {
  date: string
  score: number
  change: number
  factors: string[]
  reason: string
}

const TrustScoreHistory = () => {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)
  const [filter, setFilter] = useState<'all' | 'score_change' | 'verification' | 'document_upload' | 'attester_action' | 'system' | 'security'>('all')
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [searchTerm, setSearchTerm] = useState('')

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      timestamp: '2024-01-20 14:30:00',
      type: 'score_change',
      title: 'Trust Score Increased',
      description: 'Your trust score increased due to completed biometric enrollment',
      scoreChange: 15,
      previousScore: 1235,
      newScore: 1250,
      status: 'completed',
      category: 'Biometric Enrollment',
      details: {
        factor: 'biometric-enrollment',
        action: 'Facial recognition completed',
        metadata: { biometricType: 'facial', confidence: 0.95 }
      },
      icon: TrendingUp
    },
    {
      id: '2',
      timestamp: '2024-01-20 10:15:00',
      type: 'verification',
      title: 'Document Verification Completed',
      description: 'Academic transcript verification completed successfully',
      scoreChange: 10,
      previousScore: 1225,
      newScore: 1235,
      status: 'completed',
      category: 'Document Verification',
      details: {
        factor: 'document-verification',
        document: 'Academic Transcript - University of Lagos',
        metadata: { institution: 'University of Lagos', degree: 'BSc Computer Science' }
      },
      icon: CheckCircle
    },
    {
      id: '3',
      timestamp: '2024-01-19 16:45:00',
      type: 'attester_action',
      title: 'Attester Verification',
      description: 'Sarah Johnson verified your professional credentials',
      scoreChange: 5,
      previousScore: 1220,
      newScore: 1225,
      status: 'completed',
      category: 'Attester Network',
      details: {
        factor: 'attester-network',
        attester: 'Sarah Johnson',
        action: 'Professional reference verified',
        metadata: { relationship: 'colleague', company: 'TechCorp Solutions' }
      },
      icon: Shield
    },
    {
      id: '4',
      timestamp: '2024-01-18 09:20:00',
      type: 'document_upload',
      title: 'New Document Uploaded',
      description: 'Professional certification document uploaded for verification',
      scoreChange: 0,
      previousScore: 1220,
      newScore: 1220,
      status: 'processing',
      category: 'Document Upload',
      details: {
        document: 'AWS Solutions Architect Certification',
        metadata: { documentType: 'certification', issuer: 'Amazon Web Services' }
      },
      icon: FileText
    },
    {
      id: '5',
      timestamp: '2024-01-17 11:30:00',
      type: 'security',
      title: 'Security Alert',
      description: 'Unusual login attempt detected from new location',
      scoreChange: -5,
      previousScore: 1225,
      newScore: 1220,
      status: 'completed',
      category: 'Security',
      details: {
        action: 'Login attempt from new IP',
        metadata: { ipAddress: '192.168.1.100', location: 'Lagos, Nigeria' }
      },
      icon: AlertTriangle
    },
    {
      id: '6',
      timestamp: '2024-01-16 14:15:00',
      type: 'score_change',
      title: 'Trust Score Increased',
      description: 'Score increased due to consistent platform activity',
      scoreChange: 10,
      previousScore: 1215,
      newScore: 1225,
      status: 'completed',
      category: 'Activity Consistency',
      details: {
        factor: 'activity-consistency',
        action: 'Regular platform usage',
        metadata: { loginDays: 7, actionsPerDay: 5 }
      },
      icon: Activity
    },
    {
      id: '7',
      timestamp: '2024-01-15 08:45:00',
      type: 'verification',
      title: 'Identity Verification Completed',
      description: 'NIN verification completed successfully',
      scoreChange: 20,
      previousScore: 1195,
      newScore: 1215,
      status: 'completed',
      category: 'Identity Verification',
      details: {
        factor: 'identity-verification',
        document: 'National Identification Number',
        metadata: { verificationType: 'government_id', status: 'verified' }
      },
      icon: User
    },
    {
      id: '8',
      timestamp: '2024-01-14 13:20:00',
      type: 'system',
      title: 'System Maintenance',
      description: 'Scheduled system maintenance completed',
      scoreChange: 0,
      previousScore: 1195,
      newScore: 1195,
      status: 'completed',
      category: 'System',
      details: {
        action: 'System maintenance',
        metadata: { maintenanceType: 'scheduled', duration: '2 hours' }
      },
      icon: Settings
    }
  ]

  const scoreChanges: ScoreChange[] = [
    { date: '2024-01-20', score: 1250, change: 15, factors: ['Biometric Enrollment'], reason: 'Facial recognition completed' },
    { date: '2024-01-20', score: 1235, change: 10, factors: ['Document Verification'], reason: 'Academic transcript verified' },
    { date: '2024-01-19', score: 1225, change: 5, factors: ['Attester Network'], reason: 'Professional reference verified' },
    { date: '2024-01-17', score: 1220, change: -5, factors: ['Security'], reason: 'Unusual login attempt' },
    { date: '2024-01-16', score: 1225, change: 10, factors: ['Activity Consistency'], reason: 'Regular platform usage' },
    { date: '2024-01-15', score: 1215, change: 20, factors: ['Identity Verification'], reason: 'NIN verification completed' }
  ]

  const filteredLogs = activityLogs.filter(log => {
    if (filter !== 'all' && log.type !== filter) return false
    if (searchTerm && !log.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !log.description.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      case 'processing':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'score_change':
        return 'text-blue-600 bg-blue-100'
      case 'verification':
        return 'text-green-600 bg-green-100'
      case 'document_upload':
        return 'text-purple-600 bg-purple-100'
      case 'attester_action':
        return 'text-orange-600 bg-orange-100'
      case 'system':
        return 'text-gray-600 bg-gray-100'
      case 'security':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Clock className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">History / Logs</h1>
          <p className="text-gray-600">Complete audit trail of your trust score changes and activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-primary-600" />
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{activityLogs.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Score Increase</p>
              <p className="text-2xl font-bold text-gray-900">
                +{activityLogs.filter(log => log.scoreChange > 0).reduce((acc, log) => acc + log.scoreChange, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Score Decrease</p>
              <p className="text-2xl font-bold text-gray-900">
                {activityLogs.filter(log => log.scoreChange < 0).reduce((acc, log) => acc + log.scoreChange, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {activityLogs.filter(log => log.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="score_change">Score Changes</option>
              <option value="verification">Verifications</option>
              <option value="document_upload">Document Uploads</option>
              <option value="attester_action">Attester Actions</option>
              <option value="system">System</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  timeRange === range ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Activity Logs</h2>
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <log.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{log.title}</h3>
                    <p className="text-sm text-gray-600">{log.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {getChangeIcon(log.scoreChange)}
                    <span className={`text-sm font-medium ${
                      log.scoreChange > 0 ? 'text-green-600' : 
                      log.scoreChange < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {log.scoreChange > 0 ? '+' : ''}{log.scoreChange}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{log.timestamp}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                    {log.category}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-sm font-medium text-gray-900">{log.previousScore} → {log.newScore}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Category: {log.category}</span>
                <button className="text-primary-600 hover:text-primary-700">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Changes Timeline */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Score Changes Timeline</h2>
        <div className="space-y-4">
          {scoreChanges.map((change, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{change.date}</h3>
                  <div className="flex items-center space-x-2">
                    {getChangeIcon(change.change)}
                    <span className={`text-sm font-medium ${
                      change.change > 0 ? 'text-green-600' : 
                      change.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {change.change > 0 ? '+' : ''}{change.change}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Score: {change.score}</p>
                <p className="text-sm text-gray-600">Reason: {change.reason}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {change.factors.map((factor, factorIndex) => (
                    <span key={factorIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <selectedLog.icon className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedLog.title}</h2>
                  <p className="text-gray-600">{selectedLog.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Activity Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Timestamp</p>
                    <p className="font-medium">{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedLog.type)}`}>
                      {selectedLog.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLog.status)}`}>
                      {selectedLog.status.charAt(0).toUpperCase() + selectedLog.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Score Change</p>
                    <div className="flex items-center space-x-2">
                      {getChangeIcon(selectedLog.scoreChange)}
                      <span className={`font-medium ${
                        selectedLog.scoreChange > 0 ? 'text-green-600' : 
                        selectedLog.scoreChange < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {selectedLog.scoreChange > 0 ? '+' : ''}{selectedLog.scoreChange}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700">{selectedLog.description}</p>
              </div>

              {/* Score Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Score Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Previous Score</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedLog.previousScore}</p>
                  </div>
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Change</p>
                    <p className={`text-2xl font-bold ${
                      selectedLog.scoreChange > 0 ? 'text-green-600' : 
                      selectedLog.scoreChange < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {selectedLog.scoreChange > 0 ? '+' : ''}{selectedLog.scoreChange}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">New Score</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedLog.newScore}</p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              {selectedLog.details && Object.keys(selectedLog.details).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h3>
                  <div className="space-y-2">
                    {selectedLog.details.factor && (
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Factor: {selectedLog.details.factor}</span>
                      </div>
                    )}
                    {selectedLog.details.document && (
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Document: {selectedLog.details.document}</span>
                      </div>
                    )}
                    {selectedLog.details.attester && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Attester: {selectedLog.details.attester}</span>
                      </div>
                    )}
                    {selectedLog.details.action && (
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Action: {selectedLog.details.action}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  View Related Activities
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Export Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrustScoreHistory

