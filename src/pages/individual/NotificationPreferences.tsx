import React, { useState } from 'react'
import { 
  Bell, 
  Mail, 
  Smartphone, 
  CheckCircle, 
  X, 
  Settings,
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle
} from 'lucide-react'

interface NotificationCategory {
  id: string
  name: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
}

interface NotificationSchedule {
  id: string
  name: string
  description: string
  isEnabled: boolean
  time: string
  timezone: string
}

const NotificationPreferences = () => {
  const [notificationCategories, setNotificationCategories] = useState<NotificationCategory[]>([
    {
      id: '1',
      name: 'Account Security',
      description: 'Login attempts, password changes, and security alerts',
      email: true,
      push: true,
      sms: false,
      inApp: true
    },
    {
      id: '2',
      name: 'Verification Updates',
      description: 'Status changes and progress updates for verifications',
      email: true,
      push: true,
      sms: true,
      inApp: true
    },
    {
      id: '3',
      name: 'Document Management',
      description: 'Document uploads, approvals, and access changes',
      email: false,
      push: true,
      sms: false,
      inApp: true
    },
    {
      id: '4',
      name: 'Wallet & Payments',
      description: 'Transaction confirmations and payment reminders',
      email: true,
      push: true,
      sms: true,
      inApp: true
    },
    {
      id: '5',
      name: 'Trust Score',
      description: 'Score changes and achievement notifications',
      email: false,
      push: true,
      sms: false,
      inApp: true
    },
    {
      id: '6',
      name: 'Support & Help',
      description: 'Ticket updates and support responses',
      email: true,
      push: false,
      sms: false,
      inApp: true
    }
  ])

  const [notificationSchedules] = useState<NotificationSchedule[]>([
    {
      id: '1',
      name: 'Quiet Hours',
      description: 'Reduce notifications during specified hours',
      isEnabled: true,
      time: '22:00 - 08:00',
      timezone: 'WAT (UTC+1)'
    },
    {
      id: '2',
      name: 'Weekly Digest',
      description: 'Receive a summary of all activities weekly',
      isEnabled: false,
      time: 'Monday 09:00',
      timezone: 'WAT (UTC+1)'
    },
    {
      id: '3',
      name: 'Monthly Report',
      description: 'Monthly summary of account activity',
      isEnabled: true,
      time: '1st of month 10:00',
      timezone: 'WAT (UTC+1)'
    }
  ])

  const [globalSettings, setGlobalSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    marketingEmails: false,
    partnerUpdates: true
  })

  const handleToggleCategory = (categoryId: string, channel: keyof Omit<NotificationCategory, 'id' | 'name' | 'description'>) => {
    setNotificationCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, [channel]: !category[channel] }
        : category
    ))
  }

  const handleToggleGlobal = (setting: keyof typeof globalSettings) => {
    setGlobalSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleToggleSchedule = (scheduleId: string) => {
    // This would update the schedule state
    console.log('Toggle schedule:', scheduleId)
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'push': return <Bell className="h-4 w-4" />
      case 'sms': return <Smartphone className="h-4 w-4" />
      case 'inApp': return <CheckCircle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email': return 'text-blue-600'
      case 'push': return 'text-green-600'
      case 'sms': return 'text-purple-600'
      case 'inApp': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Preferences</h1>
          <p className="text-gray-600">Customize how and when you receive notifications</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Test Notifications
          </button>
        </div>
      </div>

      {/* Global Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Global Notification Settings</h2>
          <p className="text-sm text-gray-600">Control notification channels across all categories</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Primary Channels</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleGlobal('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    globalSettings.emailNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    globalSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications on devices</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleGlobal('pushNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    globalSettings.pushNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    globalSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleGlobal('smsNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    globalSettings.smsNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    globalSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">In-App Notifications</p>
                    <p className="text-sm text-gray-500">Show notifications within the app</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleGlobal('inAppNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    globalSettings.inAppNotifications ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    globalSettings.inAppNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Additional Preferences</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Receive promotional content</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleGlobal('marketingEmails')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    globalSettings.marketingEmails ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    globalSettings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Partner Updates</p>
                    <p className="text-sm text-gray-500">Updates from trusted partners</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleGlobal('partnerUpdates')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    globalSettings.partnerUpdates ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    globalSettings.partnerUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Categories */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Notification Categories</h2>
          <p className="text-sm text-gray-600">Customize notifications for specific activities</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {notificationCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(category).filter(([key]) => !['id', 'name', 'description'].includes(key)).map(([channel, enabled]) => (
                    <div key={channel} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`${getChannelColor(channel)}`}>
                          {getChannelIcon(channel)}
                        </span>
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {channel === 'inApp' ? 'In-App' : channel}
                        </span>
                      </div>
                      <button
                        onClick={() => handleToggleCategory(category.id, channel as keyof Omit<NotificationCategory, 'id' | 'name' | 'description'>)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          enabled ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          enabled ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Schedules */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Notification Schedules</h2>
          <p className="text-sm text-gray-600">Set specific times for certain types of notifications</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {notificationSchedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Bell className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{schedule.name}</h3>
                    <p className="text-sm text-gray-500">{schedule.description}</p>
                    <p className="text-xs text-gray-400">{schedule.time} • {schedule.timezone}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleToggleSchedule(schedule.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    schedule.isEnabled ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    schedule.isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Preview */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Notification Preview</h2>
          <p className="text-sm text-gray-600">See how your notifications will appear</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">Verification Complete</h4>
                  <p className="text-sm text-blue-700">Your identity verification has been completed successfully.</p>
                  <p className="text-xs text-blue-500 mt-1">2 minutes ago</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-green-900">Document Approved</h4>
                  <p className="text-sm text-green-700">Your uploaded document has been approved by our team.</p>
                  <p className="text-xs text-green-500 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-900">Security Alert</h4>
                  <p className="text-sm text-yellow-700">New login detected from an unrecognized device.</p>
                  <p className="text-xs text-yellow-500 mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationPreferences
