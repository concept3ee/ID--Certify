import { BarChart3, AlertTriangle, TrendingUp, TrendingDown, Eye } from 'lucide-react'

const Monitoring = () => {
  const alerts = [
    {
      id: 1,
      type: 'high_risk',
      title: 'Unusual Transaction Pattern',
      description: 'Multiple high-value transactions detected',
      severity: 'high',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'medium_risk',
      title: 'Failed Verification Attempts',
      description: 'Multiple failed login attempts detected',
      severity: 'medium',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'low_risk',
      title: 'Document Expiry Warning',
      description: 'Employee documents expiring soon',
      severity: 'low',
      time: '2 hours ago',
    },
  ]

  const metrics = [
    {
      name: 'Active Users',
      value: '1,234',
      change: '+12%',
      trend: 'up',
    },
    {
      name: 'Verification Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
    },
    {
      name: 'Risk Score',
      value: '23',
      change: '-5%',
      trend: 'down',
    },
    {
      name: 'Compliance Score',
      value: '92%',
      change: '+1.5%',
      trend: 'up',
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-danger-50 border-danger-200 text-danger-800'
      case 'medium':
        return 'bg-warning-50 border-warning-200 text-warning-800'
      case 'low':
        return 'bg-info-50 border-info-200 text-info-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Monitoring</h1>
        <p className="text-gray-600">Monitor system activity and risk alerts</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`flex items-center text-sm ${
                metric.trend === 'up' ? 'text-success-600' : 'text-danger-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Alerts */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">{alert.title}</h3>
                    <p className="text-sm mt-1">{alert.description}</p>
                    <p className="text-xs mt-2 opacity-75">{alert.time}</p>
                  </div>
                </div>
                <button className="text-sm font-medium hover:opacity-75">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Activity chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Monitoring
