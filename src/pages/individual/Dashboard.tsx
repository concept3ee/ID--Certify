import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '@/store/store'
import StatCard from '@/components/ui/StatCard'
import { Shield, FileText, BarChart3, CreditCard, CheckCircle, Clock, XCircle, Database, UserCheck } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const recentActivities = [
    {
      id: 1,
      type: 'verification',
      title: 'NIN Verification Completed',
      description: 'Your NIN verification has been successfully completed',
      status: 'completed',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'document',
      title: 'Passport Uploaded',
      description: 'You uploaded a new passport document',
      status: 'pending',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'score',
      title: 'Trust Score Increased',
      description: 'Your trust score increased by 5 points',
      status: 'completed',
      time: '2 days ago',
    },
    {
      id: 4,
      type: 'verification',
      title: 'CAC Verification Failed',
      description: 'CAC verification failed due to invalid document',
      status: 'failed',
      time: '3 days ago',
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-warning-600" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-danger-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-primary-100">
          Your verification ID: {user?.verificationId}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-tour="dashboard-stats">
        <StatCard
          title="Trust Score"
          value={`${user?.trustScore}/2000`}
          change={5}
          changeType="increase"
          icon={<BarChart3 className="h-6 w-6" />}
          color="primary"
          data-tour="trust-score"
        />
        <StatCard
          title="Verified Documents"
          value="3"
          icon={<FileText className="h-6 w-6" />}
          color="success"
        />
        <StatCard
          title="Pending Verifications"
          value="1"
          icon={<Clock className="h-6 w-6" />}
          color="warning"
        />
        <StatCard
          title="Wallet Balance"
          value="₦2,500"
          icon={<CreditCard className="h-6 w-6" />}
          color="secondary"
        />
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card" data-tour="monitoring">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              className="w-full flex items-center justify-between p-3 text-left bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200"
              data-tour="verification"
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Start New Verification</p>
                  <p className="text-xs text-gray-600">Verify your identity documents</p>
                </div>
              </div>
            </button>
            
            <button 
              className="w-full flex items-center justify-between p-3 text-left bg-success-50 hover:bg-success-100 rounded-lg transition-colors duration-200"
              data-tour="documents"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-success-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Upload Documents</p>
                  <p className="text-xs text-gray-600">Add new documents to your vault</p>
                </div>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 text-left bg-warning-50 hover:bg-warning-100 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-warning-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Add Funds</p>
                  <p className="text-xs text-gray-600">Top up your wallet balance</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Verification Status</h2>
          <Link to="/individual/verification/status" className="text-sm text-primary-600 hover:text-primary-700">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-success-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">NIN</p>
              <p className="text-xs text-success-600">Verified</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-warning-50 rounded-lg">
            <Clock className="h-5 w-5 text-warning-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Passport</p>
              <p className="text-xs text-warning-600">Pending</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <XCircle className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">CAC</p>
              <p className="text-xs text-gray-500">Not Uploaded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Biobank & Attester Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card" data-tour="biobank">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Biometric Biobank</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Database className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Fingerprint Data</p>
                <p className="text-xs text-blue-600">Securely stored</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Database className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Facial Recognition</p>
                <p className="text-xs text-purple-600">Encrypted vault</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card" data-tour="attester">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attester Network</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Active Attesters</p>
                <p className="text-xs text-green-600">3 verified</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Pending Requests</p>
                <p className="text-xs text-orange-600">2 awaiting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
