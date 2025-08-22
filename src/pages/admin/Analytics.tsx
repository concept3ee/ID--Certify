import { BarChart3, TrendingUp, Users, Activity, Database, Shield } from 'lucide-react'

const Analytics = () => {
  const analyticsData = {
    totalUsers: 15420,
    totalOrganizations: 156,
    totalDevelopers: 89,
    totalVerifications: 45670,
    activeUsers: 12340,
    pendingVerifications: 2340,
  }

  const topMetrics = [
    {
      title: 'Total Users',
      value: analyticsData.totalUsers.toLocaleString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'primary' as const,
    },
    {
      title: 'Organizations',
      value: analyticsData.totalOrganizations.toLocaleString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Shield,
      color: 'success' as const,
    },
    {
      title: 'Developers',
      value: analyticsData.totalDevelopers.toLocaleString(),
      change: '+15%',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'secondary' as const,
    },
    {
      title: 'Verifications',
      value: analyticsData.totalVerifications.toLocaleString(),
      change: '+23%',
      changeType: 'positive' as const,
      icon: Database,
      color: 'warning' as const,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'New User Registration',
      description: 'John Doe registered as Individual user',
      time: '2 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'Verification Completed',
      description: 'NIN verification completed for TechCorp Ltd',
      time: '5 minutes ago',
      status: 'success',
    },
    {
      id: 3,
      type: 'API Key Generated',
      description: 'New API key created for Developer account',
      time: '10 minutes ago',
      status: 'info',
    },
    {
      id: 4,
      type: 'Compliance Alert',
      description: 'Compliance score dropped for FinanceBank',
      time: '15 minutes ago',
      status: 'warning',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Platform-wide analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMetrics.map((metric, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <metric.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
            <TrendingUp className="h-5 w-5 text-primary-600" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart placeholder</p>
              <p className="text-sm text-gray-400">User growth over time</p>
            </div>
          </div>
        </div>

        {/* Verification Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Verification Activity</h3>
            <Activity className="h-5 w-5 text-success-600" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart placeholder</p>
              <p className="text-sm text-gray-400">Daily verification volume</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <button className="text-sm text-primary-600 hover:text-primary-900">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-success-500' :
                activity.status === 'warning' ? 'bg-warning-500' :
                activity.status === 'info' ? 'bg-primary-500' : 'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
