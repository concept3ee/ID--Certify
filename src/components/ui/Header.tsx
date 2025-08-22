import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { logoutUser } from '@/store/slices/authSlice'
import { 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  MessageSquare,
  Search,
  Menu,
  X,
  Home,
  Shield,
  FileText,
  BarChart3,
  CreditCard,
  UserCheck,
  Database,
  Wallet,
  Lock,
  Activity
} from 'lucide-react'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
  onToggleSidebar?: () => void
  isSidebarCollapsed?: boolean
}

const Header = ({ onToggleSidebar, isSidebarCollapsed }: HeaderProps) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showChats, setShowChats] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment)
    const breadcrumbs: Array<{name: string, path: string, isLast: boolean}> = []
    
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Map route segments to readable names
      let name = segment
      switch (segment) {
        case 'individual':
          name = 'Individual'
          break
        case 'organisation':
          name = 'Organisation'
          break
        case 'developer':
          name = 'Developer'
          break
        case 'admin':
          name = 'Admin'
          break
        case 'verification':
          name = 'Verification'
          break
        case 'documents':
          name = 'Documents'
          break
        case 'trust-score':
          name = 'Trust Score'
          break
        case 'wallet':
          name = 'Wallet'
          break
        case 'profile':
          name = 'Profile'
          break
        case 'settings':
          name = 'Settings'
          break
        default:
          name = segment.charAt(0).toUpperCase() + segment.slice(1)
      }
      
      breadcrumbs.push({
        name,
        path: currentPath,
        isLast: index === pathSegments.length - 1
      })
    })
    
    return breadcrumbs
  }

  const notifications = [
    {
      id: 1,
      title: 'Verification Completed',
      message: 'Your identity verification has been successfully completed.',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'New Attester Request',
      message: 'John Doe has requested you to be an attester.',
      time: '1 day ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Document Upload Required',
      message: 'Please upload additional documents for verification.',
      time: '2 days ago',
      type: 'warning'
    }
  ]

  const chats = [
    {
      id: 1,
      name: 'Support Team',
      message: 'How can we help you today?',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      name: 'Verification Team',
      message: 'Your documents have been reviewed.',
      time: '1 hour ago',
      unread: false
    }
  ]

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Toggle Button and Breadcrumbs */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2">
            <Home className="h-4 w-4 text-gray-400" />
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.path} className="flex items-center space-x-2">
                <span className="text-gray-400">/</span>
                {breadcrumb.isLast ? (
                  <span className="text-sm font-medium text-gray-900">{breadcrumb.name}</span>
                ) : (
                  <a
                    href={breadcrumb.path}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {breadcrumb.name}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Section - Search, Notifications, Chats, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-64"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              {notifications.filter(n => n.type === 'warning').length > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chats */}
          <div className="relative">
            <button
              onClick={() => setShowChats(!showChats)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              {chats.filter(c => c.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></span>
              )}
            </button>

            {/* Chats Dropdown */}
            {showChats && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                            <p className="text-xs text-gray-500">{chat.time}</p>
                          </div>
                          <p className="text-sm text-gray-600">{chat.message}</p>
                        </div>
                        {chat.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all messages
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <div className="py-2">
                  <a
                    href={`/${user?.userType}/profile`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </a>
                  <a
                    href={`/${user?.userType}/settings`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </a>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfileMenu || showChats) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false)
            setShowProfileMenu(false)
            setShowChats(false)
          }}
        />
      )}
    </header>
  )
}

export default Header
