import { Database, Plus, Settings, Trash2, Activity } from 'lucide-react'

const Webhooks = () => {
  const webhooks = [
    {
      id: 1,
      name: 'Verification Events',
      url: 'https://api.myapp.com/webhooks/verification',
      events: ['verification.completed', 'verification.failed'],
      status: 'active',
      lastTriggered: '2024-01-20 14:30',
    },
    {
      id: 2,
      name: 'Trust Score Updates',
      url: 'https://api.myapp.com/webhooks/trust-score',
      events: ['trust_score.updated'],
      status: 'active',
      lastTriggered: '2024-01-19 10:15',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Webhooks</h1>
          <p className="text-gray-600">Manage webhook endpoints and event subscriptions</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Webhook
        </button>
      </div>

      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                <p className="text-sm text-gray-600">{webhook.url}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  webhook.status === 'active' 
                    ? 'bg-success-100 text-success-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {webhook.status}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Events</label>
                <div className="flex space-x-2">
                  {webhook.events.map((event) => (
                    <span key={event} className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Last triggered: {webhook.lastTriggered}</span>
                <button className="text-danger-600 hover:text-danger-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Webhooks
