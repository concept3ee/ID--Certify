import { Settings as SettingsIcon, Shield, Database, Users, Bell, Globe } from 'lucide-react'

const Settings = () => {
  const settingsSections = [
    {
      title: 'Platform Settings',
      description: 'Configure global platform settings',
      icon: SettingsIcon,
      items: [
        { name: 'Platform Name', value: 'IDCertify', editable: true },
        { name: 'Support Email', value: 'support@idcertify.com', editable: true },
        { name: 'Maintenance Mode', value: 'Disabled', editable: true },
        { name: 'Default Language', value: 'English', editable: true },
      ],
    },
    {
      title: 'Security Settings',
      description: 'Manage security and authentication',
      icon: Shield,
      items: [
        { name: 'Two-Factor Authentication', value: 'Required', editable: true },
        { name: 'Session Timeout', value: '30 minutes', editable: true },
        { name: 'Password Policy', value: 'Strong', editable: true },
        { name: 'API Rate Limiting', value: '1000 requests/hour', editable: true },
      ],
    },
    {
      title: 'Data Management',
      description: 'Configure data retention and storage',
      icon: Database,
      items: [
        { name: 'Data Retention Period', value: '7 years', editable: true },
        { name: 'Backup Frequency', value: 'Daily', editable: true },
        { name: 'Encryption Level', value: 'AES-256', editable: true },
        { name: 'Auto Cleanup', value: 'Enabled', editable: true },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600">Manage platform-wide settings and configurations</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">12,450</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Security Score</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Database className="h-8 w-8 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">2.4TB</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Bell className="h-8 w-8 text-danger-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <div key={index} className="card">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <section.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.value}</p>
                  </div>
                  {item.editable && (
                    <button className="text-sm text-primary-600 hover:text-primary-900 font-medium">
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* System Information */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0">
            <Globe className="h-6 w-6 text-primary-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">System Information</h3>
            <p className="text-sm text-gray-500">Platform version and system details</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Platform Version</span>
              <span className="text-sm font-medium text-gray-900">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Last Updated</span>
              <span className="text-sm font-medium text-gray-900">2024-01-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Database Version</span>
              <span className="text-sm font-medium text-gray-900">PostgreSQL 14.5</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Server Status</span>
              <span className="text-sm font-medium text-success-600">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Uptime</span>
              <span className="text-sm font-medium text-gray-900">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Response Time</span>
              <span className="text-sm font-medium text-gray-900">45ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
