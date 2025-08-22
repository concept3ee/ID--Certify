import { BarChart3, TrendingUp, Activity, Clock } from 'lucide-react'

const Analytics = () => {
  const metrics = [
    {
      name: 'Total Requests',
      value: '12,450',
      change: '+15%',
      trend: 'up',
    },
    {
      name: 'Success Rate',
      value: '98.2%',
      change: '+2.1%',
      trend: 'up',
    },
    {
      name: 'Average Response Time',
      value: '245ms',
      change: '-12%',
      trend: 'down',
    },
    {
      name: 'Error Rate',
      value: '1.8%',
      change: '-0.5%',
      trend: 'down',
    },
  ]

  const topEndpoints = [
    {
      endpoint: 'POST /verify',
      calls: 5420,
      success: 98.5,
      avgTime: 280,
    },
    {
      endpoint: 'GET /trust-score',
      calls: 3890,
      success: 99.2,
      avgTime: 120,
    },
    {
      endpoint: 'POST /biobank/enroll',
      calls: 2140,
      success: 95.8,
      avgTime: 450,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Monitor your API usage and performance metrics</p>
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
                  <Activity className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Endpoints */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Endpoints</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calls
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Response Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topEndpoints.map((endpoint, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm font-mono text-gray-900">{endpoint.endpoint}</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {endpoint.calls.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-success-600 font-medium">{endpoint.success}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {endpoint.avgTime}ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Chart Placeholder */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Over Time</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Usage chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
