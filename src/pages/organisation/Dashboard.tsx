import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import StatCard from '@/components/ui/StatCard'
import { 
  Shield, 
  Users, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  UserPlus, 
  FileText, 
  Activity,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  // Priority-based data structure
  const urgentActions = [
    {
      id: 1,
      title: '14 Verifications Pending',
      description: 'Employee verifications require immediate attention',
      priority: 'high',
      count: 14,
      action: 'Review Now',
      href: '/organisation/verification'
    },
    {
      id: 2,
      title: '3 Compliance Checks Due',
      description: 'AML and KYC checks due this week',
      priority: 'medium',
      count: 3,
      action: 'Schedule',
      href: '/organisation/compliance'
    }
  ]

  const insights = [
    {
      id: 1,
      type: 'success',
      title: 'Verification Time Improved',
      value: '15%',
      description: 'Average processing time down from last month',
      icon: TrendingUp
    },
    {
      id: 2,
      type: 'success',
      title: 'Compliance Rate',
      value: '98%',
      description: 'Above target of 95%',
      icon: CheckCircle
    },
    {
      id: 3,
      type: 'info',
      title: 'New Integrations',
      value: '3',
      description: 'Available for enhanced workflow',
      icon: Zap
    }
  ]

  const quickActions = [
    {
      id: 1,
      title: 'Add Employee',
      description: 'Register new team member',
      icon: UserPlus,
      color: 'primary',
      href: '/organisation/employees'
    },
    {
      id: 2,
      title: 'Run Verification',
      description: 'Start verification process',
      icon: Shield,
      color: 'success',
      href: '/organisation/verification'
    },
    {
      id: 3,
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: BarChart3,
      color: 'info',
      href: '/organisation/analytics'
    },
    {
      id: 4,
      title: 'Manage Documents',
      description: 'Access document center',
      icon: FileText,
      color: 'secondary',
      href: '/organisation/documents'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'medium':
        return 'bg-orange-50 border-orange-200 text-orange-900'
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-900'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'medium':
        return <Clock className="h-5 w-5 text-orange-600" />
      case 'low':
        return <Target className="h-5 w-5 text-blue-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  const getActionColor = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-blue-50 hover:bg-blue-100 text-blue-600'
      case 'success':
        return 'bg-green-50 hover:bg-green-100 text-green-600'
      case 'info':
        return 'bg-blue-50 hover:bg-blue-100 text-blue-600'
      case 'secondary':
        return 'bg-gray-50 hover:bg-gray-100 text-gray-600'
      default:
        return 'bg-gray-50 hover:bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 text-lg">
              Organization ID: {user?.verificationId} | Status: Active
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Today's Focus</div>
            <div className="text-blue-100">14 Pending Verifications</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Urgent Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">🚨 Urgent Actions</h2>
          <span className="text-sm text-gray-500">Priority-based</span>
        </div>
        <div className="space-y-4">
          {urgentActions.map((action) => (
            <div key={action.id} className={`p-4 rounded-xl border-2 ${getPriorityColor(action.priority)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getPriorityIcon(action.priority)}
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm opacity-80">{action.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold">{action.count}</span>
                  <button className="px-4 py-2 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    {action.action}
                    <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">📈 Quick Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <insight.icon className="h-6 w-6 text-gray-600" />
                <span className={`text-2xl font-bold ${
                  insight.type === 'success' ? 'text-green-600' : 
                  insight.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {insight.value}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">⚡ Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button 
              key={action.id}
              className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 ${getActionColor(action.color)}`}
            >
              <action.icon className="h-8 w-8 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
