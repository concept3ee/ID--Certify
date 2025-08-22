import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import StatCard from '@/components/ui/StatCard'
import { Shield, Users, BarChart3, CreditCard, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const complianceStatus = [
    {
      id: 1,
      type: 'AML Compliance',
      status: 'compliant',
      lastCheck: '2024-01-20',
      nextCheck: '2024-02-20',
    },
    {
      id: 2,
      type: 'KYC Verification',
      status: 'pending',
      lastCheck: '2024-01-15',
      nextCheck: '2024-01-25',
    },
    {
      id: 3,
      type: 'Data Protection',
      status: 'compliant',
      lastCheck: '2024-01-10',
      nextCheck: '2024-02-10',
    },
  ]

  const recentVerifications = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      type: 'NIN Verification',
      status: 'completed',
      date: '2024-01-20',
    },
    {
      id: 2,
      employee: 'Michael Chen',
      type: 'Passport Verification',
      status: 'pending',
      date: '2024-01-19',
    },
    {
      id: 3,
      employee: 'Emily Davis',
      type: 'CAC Verification',
      status: 'failed',
      date: '2024-01-18',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">Compliant</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning-800 rounded-full">Pending</span>
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-danger-100 text-danger-800 rounded-full">Failed</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-green-100">
          Organization ID: {user?.verificationId} | Compliance Status: Active
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-tour="dashboard-stats">
        <StatCard
          title="Total Employees"
          value="156"
          change={12}
          changeType="increase"
          icon={<Users className="h-6 w-6" />}
          color="primary"
        />
        <StatCard
          title="Verified Employees"
          value="142"
          icon={<CheckCircle className="h-6 w-6" />}
          color="success"
        />
        <StatCard
          title="Pending Verifications"
          value="14"
          icon={<Clock className="h-6 w-6" />}
          color="warning"
        />
        <StatCard
          title="Trust Score"
          value="1450/2000"
          icon={<Shield className="h-6 w-6" />}
          color="secondary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h2>
          <div className="space-y-4">
            {complianceStatus.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.type}</p>
                  <p className="text-xs text-gray-500">Last check: {item.lastCheck}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(item.status)}
                  <p className="text-xs text-gray-500 mt-1">Next: {item.nextCheck}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Verifications */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Employee Verifications</h2>
          <div className="space-y-3">
            {recentVerifications.map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{verification.employee}</p>
                  <p className="text-xs text-gray-500">{verification.type}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(verification.status)}
                  <p className="text-xs text-gray-500 mt-1">{verification.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
            <Users className="h-6 w-6 text-primary-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Add Employee</p>
              <p className="text-xs text-gray-600">Register new employee</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-success-50 hover:bg-success-100 rounded-lg transition-colors duration-200">
            <Shield className="h-6 w-6 text-success-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Run AML Check</p>
              <p className="text-xs text-gray-600">Perform compliance check</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-warning-50 hover:bg-warning-100 rounded-lg transition-colors duration-200">
            <BarChart3 className="h-6 w-6 text-warning-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">View Reports</p>
              <p className="text-xs text-gray-600">Generate compliance reports</p>
            </div>
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div className="card bg-warning-50 border-warning-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-warning-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-warning-900">Action Required</h3>
            <p className="text-sm text-warning-800 mt-1">
              14 employee verifications are pending. Please complete these verifications to maintain compliance.
            </p>
            <button className="text-sm text-warning-900 font-medium mt-2 hover:text-warning-700">
              View Pending Verifications →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
