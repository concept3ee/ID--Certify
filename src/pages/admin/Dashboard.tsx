import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import StatCard from '@/components/ui/StatCard'
import { Users, Building, Code, Shield, BarChart3, AlertTriangle, Activity } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High API Usage',
      description: 'API usage is 85% of capacity',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'info',
      title: 'System Maintenance',
      description: 'Scheduled maintenance in 2 hours',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      description: 'Daily backup completed successfully',
      time: '3 hours ago',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-orange-100">
          Admin ID: {user?.verificationId} | System Status: All Systems Operational
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="12,450"
          change={8}
          changeType="increase"
          icon={<Users className="h-6 w-6" />}
          color="primary"
        />
        <StatCard
          title="Organizations"
          value="156"
          change={12}
          changeType="increase"
          icon={<Building className="h-6 w-6" />}
          color="success"
        />
        <StatCard
          title="Developers"
          value="89"
          change={5}
          changeType="increase"
          icon={<Code className="h-6 w-6" />}
          color="warning"
        />
        <StatCard
          title="Verifications Today"
          value="2,340"
          change={15}
          changeType="increase"
          icon={<Shield className="h-6 w-6" />}
          color="secondary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h2>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.type === 'warning' ? 'bg-warning-50 border-warning-200' :
                  alert.type === 'info' ? 'bg-blue-50 border-blue-200' :
                  'bg-success-50 border-success-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-warning-600' :
                    alert.type === 'info' ? 'text-blue-600' :
                    'text-success-600'
                  }`} />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                  </div>
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
              <Users className="h-5 w-5 text-primary-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Manage Users</p>
                <p className="text-xs text-gray-600">View and manage user accounts</p>
              </div>
            </button>
            
            <button className="w-full flex items-center p-3 text-left bg-success-50 hover:bg-success-100 rounded-lg transition-colors duration-200">
              <Shield className="h-5 w-5 text-success-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Monitor Verifications</p>
                <p className="text-xs text-gray-600">Track verification requests</p>
              </div>
            </button>
            
            <button className="w-full flex items-center p-3 text-left bg-warning-50 hover:bg-warning-100 rounded-lg transition-colors duration-200">
              <BarChart3 className="h-5 w-5 text-warning-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">View Analytics</p>
                <p className="text-xs text-gray-600">System performance metrics</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">API Services</p>
              <p className="text-xs text-success-600">Operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Database</p>
              <p className="text-xs text-success-600">Operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Biobank</p>
              <p className="text-xs text-success-600">Operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Payment Gateway</p>
              <p className="text-xs text-success-600">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
