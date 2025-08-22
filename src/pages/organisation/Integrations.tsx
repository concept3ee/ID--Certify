import { Globe, Plus, Settings, CheckCircle, Clock, XCircle } from 'lucide-react'

const Integrations = () => {
  const integrations = [
    {
      id: 1,
      name: 'Government API',
      description: 'NIN and CAC verification services',
      status: 'active',
      lastSync: '2024-01-20 14:30',
      type: 'government',
    },
    {
      id: 2,
      name: 'Banking API',
      description: 'Account verification and AML checks',
      status: 'active',
      lastSync: '2024-01-20 13:45',
      type: 'financial',
    },
    {
      id: 3,
      name: 'Credit Bureau',
      description: 'Credit history and score checks',
      status: 'pending',
      lastSync: '2024-01-19 16:20',
      type: 'financial',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">Active</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-warning-100 text-warning-800 rounded-full">Pending</span>
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Manage third-party API connections and services</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
              </div>
              {getStatusBadge(integration.status)}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Sync:</span>
                <span className="text-gray-900">{integration.lastSync}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Type:</span>
                <span className="text-gray-900 capitalize">{integration.type}</span>
              </div>
              
              <div className="flex space-x-2 pt-3">
                <button className="btn-secondary text-sm flex-1">
                  <Settings className="h-4 w-4 mr-1" />
                  Configure
                </button>
                <button className="btn-secondary text-sm">
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Integrations
