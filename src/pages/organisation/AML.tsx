import { Shield, AlertTriangle, CheckCircle, Clock, Search, Filter } from 'lucide-react'

const AML = () => {
  const amlChecks = [
    {
      id: 1,
      customer: 'John Smith',
      type: 'Enhanced Due Diligence',
      status: 'passed',
      risk: 'low',
      date: '2024-01-20',
      score: 85,
    },
    {
      id: 2,
      customer: 'Jane Doe',
      type: 'Standard Check',
      status: 'pending',
      risk: 'medium',
      date: '2024-01-19',
      score: 65,
    },
    {
      id: 3,
      customer: 'Bob Wilson',
      type: 'Enhanced Due Diligence',
      status: 'failed',
      risk: 'high',
      date: '2024-01-18',
      score: 25,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">Passed</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning-800 rounded-full">Pending</span>
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-danger-100 text-danger-800 rounded-full">Failed</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">Low</span>
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning-800 rounded-full">Medium</span>
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium bg-danger-100 text-danger-800 rounded-full">High</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AML Compliance</h1>
        <p className="text-gray-600">Manage anti-money laundering checks and monitoring</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="input-field pl-10"
              />
            </div>
          </div>
          <button className="btn-secondary">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* AML Checks Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {amlChecks.map((check) => (
                <tr key={check.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{check.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {check.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(check.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRiskBadge(check.risk)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            check.score >= 80 ? 'bg-success-500' : 
                            check.score >= 60 ? 'bg-warning-500' : 'bg-danger-500'
                          }`}
                          style={{ width: `${check.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{check.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {check.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AML
