import { Bell, CheckCircle, Clock, XCircle, Trash2 } from 'lucide-react'

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'Verification Completed',
      message: 'Your NIN verification has been completed successfully. Your trust score has increased by 5 points.',
      type: 'success',
      time: '2 minutes ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'Trust Score Updated',
      message: 'Your trust score has increased by 5 points due to successful document verification.',
      type: 'info',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: 3,
      title: 'Document Expiring',
      message: 'Your passport will expire in 30 days. Please update your document to maintain your verification status.',
      type: 'warning',
      time: '2 hours ago',
      isRead: true,
    },
    {
      id: 4,
      title: 'Verification Failed',
      message: 'Your CAC verification failed due to invalid document. Please upload a valid document.',
      type: 'error',
      time: '1 day ago',
      isRead: true,
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'warning':
        return <Clock className="h-5 w-5 text-warning-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-danger-600" />
      default:
        return <Bell className="h-5 w-5 text-primary-600" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-200'
      case 'warning':
        return 'bg-warning-50 border-warning-200'
      case 'error':
        return 'bg-danger-50 border-danger-200'
      default:
        return 'bg-primary-50 border-primary-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your verification status and activities</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            Mark All Read
          </button>
          <button className="btn-secondary">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`card border-l-4 border-l-primary-500 ${getNotificationBg(notification.type)} ${
              !notification.isRead ? 'ring-2 ring-primary-200' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    {!notification.isRead && (
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="flex items-center space-x-2 mt-3">
                  <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    View Details
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
              <p className="text-xs text-gray-600">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Push Notifications</p>
              <p className="text-xs text-gray-600">Receive notifications in browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
              <p className="text-xs text-gray-600">Receive notifications via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
