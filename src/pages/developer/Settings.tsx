import { Settings as SettingsIcon, Code, Shield, Bell, CreditCard } from 'lucide-react'

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Developer Settings</h1>
        <p className="text-gray-600">Manage your developer account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Developer Name</label>
                <input
                  type="text"
                  defaultValue="Dev Studio"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="demo@developer.com"
                  className="input-field"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  defaultValue="https://devstudio.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select className="input-field">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  defaultValue="We build innovative solutions using IDCertify APIs"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* API Settings */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">API Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Rate Limiting</p>
                  <p className="text-xs text-gray-600">Set custom rate limits for your API keys</p>
                </div>
                <button className="btn-secondary text-sm">Configure</button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Webhook Retries</p>
                  <p className="text-xs text-gray-600">Configure webhook retry attempts</p>
                </div>
                <button className="btn-secondary text-sm">Configure</button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">API Version</p>
                  <p className="text-xs text-gray-600">Select preferred API version</p>
                </div>
                <select className="input-field w-32">
                  <option>v1.0</option>
                  <option>v2.0</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Settings</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Code className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">API Keys</p>
                  <p className="text-xs text-gray-600">Manage your API keys</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Shield className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Security</p>
                  <p className="text-xs text-gray-600">Security settings</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Bell className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-600">Notification preferences</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <CreditCard className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Billing</p>
                  <p className="text-xs text-gray-600">Payment methods</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
