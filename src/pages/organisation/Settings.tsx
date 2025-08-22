import { Settings as SettingsIcon, Building, Users, Shield, Bell, CreditCard } from 'lucide-react'

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
        <p className="text-gray-600">Manage your organization's account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organization Profile */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Organization Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                <input
                  type="text"
                  defaultValue="TechCorp Ltd"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                <input
                  type="text"
                  defaultValue="RC123456"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                <input
                  type="number"
                  defaultValue="156"
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  defaultValue="123 Business Street, Lagos, Nigeria"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Compliance Settings */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto AML Checks</p>
                  <p className="text-xs text-gray-600">Automatically run AML checks for new employees</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Document Expiry Alerts</p>
                  <p className="text-xs text-gray-600">Get notified when employee documents are expiring</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Compliance Reports</p>
                  <p className="text-xs text-gray-600">Generate monthly compliance reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
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
                <Building className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Organization Profile</p>
                  <p className="text-xs text-gray-600">Update organization details</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Users className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Employee Management</p>
                  <p className="text-xs text-gray-600">Manage employee access</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Shield className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Security Settings</p>
                  <p className="text-xs text-gray-600">Configure security options</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Bell className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-600">Manage notification preferences</p>
                </div>
              </button>

              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <CreditCard className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Billing Settings</p>
                  <p className="text-xs text-gray-600">Manage payment methods</p>
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
