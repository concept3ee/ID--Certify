import { BarChart3, TrendingUp, Award, Clock } from 'lucide-react'

const TrustScore = () => {
  const scoreHistory = [
    { date: '2024-01-01', score: 70, change: 0 },
    { date: '2024-01-05', score: 75, change: 5 },
    { date: '2024-01-10', score: 80, change: 5 },
    { date: '2024-01-15', score: 85, change: 5 },
    { date: '2024-01-20', score: 85, change: 0 },
  ]

  const scoreBreakdown = [
    {
      category: 'Identity Verification',
      score: 25,
      maxScore: 30,
      description: 'NIN, Passport, and other ID verifications',
      status: 'completed',
    },
    {
      category: 'Document Verification',
      score: 20,
      maxScore: 25,
      description: 'Educational certificates and other documents',
      status: 'completed',
    },
    {
      category: 'Biometric Enrollment',
      score: 15,
      maxScore: 20,
      description: 'Face and fingerprint enrollment',
      status: 'pending',
    },
    {
      category: 'Activity History',
      score: 15,
      maxScore: 15,
      description: 'Account activity and consistency',
      status: 'completed',
    },
    {
      category: 'Social Verification',
      score: 10,
      maxScore: 10,
      description: 'Social media and online presence',
      status: 'not_started',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-600'
      case 'pending':
        return 'text-warning-600'
      case 'not_started':
        return 'text-gray-400'
      default:
        return 'text-gray-600'
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-success-500'
    if (percentage >= 60) return 'bg-warning-500'
    return 'bg-danger-500'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trust Score</h1>
        <p className="text-gray-600">Track your trust score and understand how it's calculated</p>
      </div>

      {/* Current Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-10 w-10 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">1250/2000</h2>
          <p className="text-lg text-gray-600 mb-4">Current Trust Score</p>
          <div className="flex items-center justify-center text-success-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">+5 this month</span>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Level</h3>
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8 text-warning-600" />
            <div>
              <p className="text-lg font-semibold text-gray-900">Gold Level</p>
              <p className="text-sm text-gray-600">High trust level</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Next level: Platinum (90+)</span>
              <span>5 points needed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-sm text-gray-900">NIN Verification</span>
              </div>
              <span className="text-sm font-medium text-success-600">+5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                <span className="text-sm text-gray-900">Passport Pending</span>
              </div>
              <span className="text-sm font-medium text-warning-600">+10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Score Breakdown</h2>
        <div className="space-y-6">
          {scoreBreakdown.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{item.category}</h3>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {item.score}/{item.maxScore}
                  </p>
                  <p className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor((item.score / item.maxScore) * 100)}`}
                  style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score History */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Score History</h2>
        <div className="space-y-4">
          {scoreHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{entry.date}</p>
                  <p className="text-xs text-gray-600">Score: {entry.score}/2000</p>
                </div>
              </div>
              <div className="text-right">
                {entry.change > 0 && (
                  <span className="text-sm font-medium text-success-600">+{entry.change}</span>
                )}
                {entry.change === 0 && (
                  <span className="text-sm font-medium text-gray-500">No change</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-3">How to Improve Your Score</h3>
        <ul className="space-y-2 text-sm text-primary-800">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Complete biometric enrollment (face and fingerprint)
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Verify additional identity documents
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Maintain consistent account activity
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Connect social media accounts for additional verification
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TrustScore
