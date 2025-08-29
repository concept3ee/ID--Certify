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
  X
} from 'lucide-react'

interface ScoreFactor {
  id: string
  name: string
  category: string
  currentScore: number
  maxScore: number
  weight: number
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'not_started'
  trend: 'up' | 'down' | 'stable'
  lastUpdated: string
  description: string
  improvements: string[]
  icon: React.ComponentType<{ className?: string }>
}

interface ScoreHistory {
  date: string
  score: number
  change: number
  factors: {
    factorId: string
    change: number
  }[]
}

const TrustScoreBreakdown = () => {
  const [selectedFactor, setSelectedFactor] = useState<ScoreFactor | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  const scoreFactors: ScoreFactor[] = [
    {
      id: 'identity-verification',
      name: 'Identity Verification',
      category: 'Core Identity',
      currentScore: 25,
      maxScore: 30,
      weight: 15,
      status: 'excellent',
      trend: 'up',
      lastUpdated: '2024-01-20',
      description: 'Government-issued ID verification and biometric authentication',
      improvements: ['Complete biometric enrollment', 'Verify additional ID documents'],
      icon: User
    },
    {
      id: 'document-verification',
      name: 'Document Verification',
      category: 'Core Identity',
      currentScore: 20,
      maxScore: 25,
      weight: 12,
      status: 'good',
      trend: 'stable',
      lastUpdated: '2024-01-18',
      description: 'Educational certificates, professional licenses, and other documents',
      improvements: ['Upload academic transcripts', 'Verify professional certifications'],
      icon: FileText
    },
    {
      id: 'biometric-enrollment',
      name: 'Biometric Enrollment',
      category: 'Security',
      currentScore: 15,
      maxScore: 20,
      weight: 10,
      status: 'fair',
      trend: 'up',
      lastUpdated: '2024-01-15',
      description: 'Fingerprint, facial recognition, and voice biometrics',
      improvements: ['Complete facial recognition setup', 'Add voice biometrics'],
      icon: Database
    },
    {
      id: 'activity-consistency',
      name: 'Activity Consistency',
      category: 'Behavior',
      currentScore: 15,
      maxScore: 15,
      weight: 8,
      status: 'excellent',
      trend: 'stable',
      lastUpdated: '2024-01-20',
      description: 'Regular platform usage and consistent behavior patterns',
      improvements: ['Maintain regular activity', 'Engage with community features'],
      icon: Activity
    },
    {
      id: 'social-verification',
      name: 'Social Verification',
      category: 'Social',
      currentScore: 8,
      maxScore: 10,
      weight: 5,
      status: 'good',
      trend: 'up',
      lastUpdated: '2024-01-19',
      description: 'Social media presence and online reputation',
      improvements: ['Connect additional social accounts', 'Build online presence'],
      icon: Share2
    },
    {
      id: 'attester-network',
      name: 'Attester Network',
      category: 'Social',
      currentScore: 12,
      maxScore: 15,
      weight: 8,
      status: 'good',
      trend: 'up',
      lastUpdated: '2024-01-20',
      description: 'Network of trusted individuals who can vouch for you',
      improvements: ['Add more trusted attesters', 'Respond to attester requests'],
      icon: Shield
    },
    {
      id: 'financial-history',
      name: 'Financial History',
      category: 'Financial',
      currentScore: 0,
      maxScore: 10,
      weight: 6,
      status: 'not_started',
      trend: 'stable',
      lastUpdated: 'Never',
      description: 'Credit history and financial responsibility',
      improvements: ['Connect bank accounts', 'Build credit history'],
      icon: BarChart3
    },
    {
      id: 'professional-references',
      name: 'Professional References',
      category: 'Professional',
      currentScore: 5,
      maxScore: 10,
      weight: 7,
      status: 'fair',
      trend: 'up',
      lastUpdated: '2024-01-17',
      description: 'Professional references and work history verification',
      improvements: ['Add more professional references', 'Verify employment history'],
      icon: User
    }
  ]

  const scoreHistory: ScoreHistory[] = [
    { date: '2024-01-01', score: 1200, change: 0, factors: [] },
    { date: '2024-01-05', score: 1210, change: 10, factors: [{ factorId: 'identity-verification', change: 5 }, { factorId: 'document-verification', change: 5 }] },
    { date: '2024-01-10', score: 1225, change: 15, factors: [{ factorId: 'biometric-enrollment', change: 10 }, { factorId: 'social-verification', change: 5 }] },
    { date: '2024-01-15', score: 1235, change: 10, factors: [{ factorId: 'attester-network', change: 10 }] },
    { date: '2024-01-20', score: 1250, change: 15, factors: [{ factorId: 'identity-verification', change: 5 }, { factorId: 'professional-references', change: 10 }] }
  ]

  const totalScore = scoreFactors.reduce((acc, factor) => acc + factor.currentScore, 0)
  const maxPossibleScore = scoreFactors.reduce((acc, factor) => acc + factor.maxScore, 0)
  const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100'
      case 'good':
        return 'text-blue-600 bg-blue-100'
      case 'fair':
        return 'text-yellow-600 bg-yellow-100'
      case 'poor':
        return 'text-red-600 bg-red-100'
      case 'not_started':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'stable':
        return <Clock className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: 'Elite', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (score >= 80) return { level: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (score >= 70) return { level: 'Silver', color: 'text-gray-600', bg: 'bg-gray-100' }
    if (score >= 60) return { level: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { level: 'Basic', color: 'text-blue-600', bg: 'bg-blue-100' }
  }

  const scoreLevel = getScoreLevel(scorePercentage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Score Breakdown</h1>
          <p className="text-gray-600">Detailed analysis of your trust score factors and improvement opportunities</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Share2 className="h-4 w-4 mr-2" />
            Share Score
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{totalScore}/{maxPossibleScore}</h2>
          <p className="text-lg text-gray-600 mb-4">Current Trust Score</p>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${scoreLevel.bg} ${scoreLevel.color}`}>
            <Award className="h-4 w-4 mr-2" />
            {scoreLevel.level} Level
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <span className="text-sm font-medium text-gray-900">{scorePercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${scorePercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Score Level</p>
                <p className="font-medium">{scoreLevel.level}</p>
              </div>
              <div>
                <p className="text-gray-600">Next Level</p>
                <p className="font-medium">{scorePercentage >= 90 ? 'Max Level' : `${Math.ceil((scorePercentage + 10) / 10) * 10}%`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {scoreFactors
              .filter(factor => factor.status === 'fair' || factor.status === 'poor' || factor.status === 'not_started')
              .slice(0, 3)
              .map((factor) => (
                <div key={factor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <factor.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{factor.name}</p>
                      <p className="text-xs text-gray-600">{factor.currentScore}/{factor.maxScore}</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm">
                    Improve
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Score Factors */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Score Factors</h2>
        <div className="space-y-4">
          {scoreFactors.map((factor) => (
            <div
              key={factor.id}
              onClick={() => setSelectedFactor(factor)}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <factor.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{factor.name}</h3>
                    <p className="text-sm text-gray-600">{factor.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(factor.trend)}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(factor.status)}`}>
                      {factor.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Weight: {factor.weight}%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="text-sm font-medium text-gray-900">{factor.currentScore}/{factor.maxScore}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.status === 'excellent' ? 'bg-green-500' :
                        factor.status === 'good' ? 'bg-blue-500' :
                        factor.status === 'fair' ? 'bg-yellow-500' :
                        factor.status === 'poor' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${(factor.currentScore / factor.maxScore) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{factor.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Last updated: {factor.lastUpdated}</span>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score History */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Score History</h2>
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
        <div className="space-y-4">
          {scoreHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{entry.date}</p>
                  <p className="text-xs text-gray-600">Score: {entry.score}</p>
                </div>
              </div>
              <div className="text-right">
                {entry.change > 0 && (
                  <span className="text-sm font-medium text-green-600">+{entry.change}</span>
                )}
                {entry.change === 0 && (
                  <span className="text-sm font-medium text-gray-500">No change</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Factor Details Modal */}
      {selectedFactor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <selectedFactor.icon className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedFactor.name}</h2>
                  <p className="text-gray-600">{selectedFactor.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFactor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Score Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Score Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Current Score</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedFactor.currentScore}/{selectedFactor.maxScore}</p>
                  </div>
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="text-2xl font-bold text-primary-900">{selectedFactor.weight}%</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedFactor.status)}`}>
                      {selectedFactor.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700">{selectedFactor.description}</p>
              </div>

              {/* Improvements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Improvement Suggestions</h3>
                <div className="space-y-2">
                  {selectedFactor.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  View Details
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrustScoreBreakdown

