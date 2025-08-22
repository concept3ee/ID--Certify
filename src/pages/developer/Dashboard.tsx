import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import StatCard from '@/components/ui/StatCard'
import { Code, BarChart3, CreditCard, Database, TrendingUp, Activity } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const recentAPIUsage = [
    {
      id: 1,
      endpoint: 'POST /verify',
      calls: 1250,
      success: 98.5,
      date: '2024-01-20',
    },
    {
      id: 2,
      endpoint: 'GET /trust-score',
      calls: 890,
      success: 99.2,
      date: '2024-01-19',
    },
    {
      id: 3,
      endpoint: 'POST /biobank/enroll',
      calls: 450,
      success: 95.8,
      date: '2024-01-18',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-purple-100">
          Developer ID: {user?.verificationId} | API Status: Active
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-tour="dashboard-stats">
        <StatCard
          title="Total API Calls"
          value="2,590"
          change={15}
          changeType="increase"
          icon={<Code className="h-6 w-6" />}
          color="primary"
        />
        <StatCard
          title="Trust Score"
          value="1350/2000"
          icon={<TrendingUp className="h-6 w-6" />}
          color="success"
        />
        <StatCard
          title="Active API Keys"
          value="3"
          icon={<Database className="h-6 w-6" />}
          color="warning"
        />
        <StatCard
          title="Monthly Usage"
          value="₦12,500"
          icon={<CreditCard className="h-6 w-6" />}
          color="secondary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent API Usage */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent API Usage</h2>
          <div className="space-y-4">
            {recentAPIUsage.map((usage) => (
              <div key={usage.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{usage.endpoint}</p>
                  <p className="text-xs text-gray-500">{usage.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{usage.calls} calls</p>
                  <p className="text-xs text-success-600">{usage.success}% success</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center p-3 text-left bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
              <Code className="h-5 w-5 text-primary-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Generate API Key</p>
                <p className="text-xs text-gray-600">Create new API key for your application</p>
              </div>
            </button>
            
            <button className="w-full flex items-center p-3 text-left bg-success-50 hover:bg-success-100 rounded-lg transition-colors duration-200">
              <Database className="h-5 w-5 text-success-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">View Documentation</p>
                <p className="text-xs text-gray-600">Access API documentation and examples</p>
              </div>
            </button>
            
            <button className="w-full flex items-center p-3 text-left bg-warning-50 hover:bg-warning-100 rounded-lg transition-colors duration-200">
              <BarChart3 className="h-5 w-5 text-warning-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Usage Analytics</p>
                <p className="text-xs text-gray-600">View detailed usage statistics</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">API Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Verification API</p>
              <p className="text-xs text-success-600">Operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Biobank API</p>
              <p className="text-xs text-success-600">Operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Trust Score API</p>
              <p className="text-xs text-success-600">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
