import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { 
  Home, 
  Shield, 
  FileText, 
  BarChart3, 
  CreditCard, 
  Bell, 
  Settings,
  ChevronDown,
  ChevronRight,
  Users,
  Code,
  Database,
  TrendingUp,
  CheckCircle,
  Clock,
  MessageSquare,
  HelpCircle,
  Moon,
  Sun,
  Search,
  Menu,
  X,
  UserCheck,
  Lock,
  Activity,
  Wallet,
  Folder,
  Eye,
  Key
} from 'lucide-react'
import { useState } from 'react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
  children?: SidebarItem[]
}

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

const Sidebar = ({ isCollapsed = false, onToggle }: SidebarProps) => {
  const location = useLocation()
  const { userType } = useSelector((state: RootState) => state.auth)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [darkMode, setDarkMode] = useState(false)

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  const getNavigationItems = (): SidebarItem[] => {
    switch (userType) {
      case 'individual':
        return [
          { 
            name: 'Overview', 
            href: '/individual', 
            icon: Home 
          },
          {
            name: 'Verification',
            href: '/individual/verification',
            icon: Shield,
            children: [
              { name: 'Start Verification', href: '/individual/verification', icon: Shield },
              { name: 'Verification History', href: '/individual/verification/history', icon: FileText },
              { name: 'Pending Actions', href: '/individual/verification/pending', icon: Clock }
            ]
          },
          {
            name: 'Attester',
            href: '/individual/attester',
            icon: UserCheck,
            children: [
              { name: 'My Attesters', href: '/individual/attester/my-attesters', icon: Users },
              { name: 'Requests to Me', href: '/individual/attester/requests', icon: Bell }
            ]
          },
          { 
            name: 'Biobank', 
            href: '/individual/biobank', 
            icon: Database 
          },
          { 
            name: 'Trust Score', 
            href: '/individual/trust-score', 
            icon: BarChart3 
          },
          {
            name: 'Wallet',
            href: '/individual/wallet',
            icon: Wallet,
            children: [
              { name: 'Balance', href: '/individual/wallet', icon: CreditCard },
              { name: 'Transactions', href: '/individual/wallet/transactions', icon: TrendingUp },
              { name: 'Billing & Invoices', href: '/individual/wallet/billing', icon: FileText }
            ]
          },
          {
            name: 'Encrypted Document Storage',
            href: '/individual/documents',
            icon: Lock,
            children: [
              { name: 'Secure Files', href: '/individual/documents', icon: Folder },
              { name: 'Access Permissions', href: '/individual/documents/permissions', icon: Key }
            ]
          },
          {
            name: 'Data Monitoring',
            href: '/individual/monitoring',
            icon: Activity,
            children: [
              { name: 'Activity Logs', href: '/individual/monitoring/activity', icon: Activity },
              { name: 'Access Requests', href: '/individual/monitoring/access', icon: Eye }
            ]
          }
        ]
      case 'organisation':
        return [
          { name: 'Dashboard', href: '/organisation', icon: Home },
          { name: 'Verification', href: '/organisation/verification', icon: Shield },
          { name: 'Documents', href: '/organisation/documents', icon: FileText },
          { name: 'Trust Score', href: '/organisation/trust-score', icon: BarChart3 },
          { name: 'Wallet', href: '/organisation/wallet', icon: CreditCard },
          { name: 'Notifications', href: '/organisation/notifications', icon: Bell },
          { name: 'Profile', href: '/organisation/profile', icon: Settings }
        ]
      case 'developer':
        return [
          { name: 'Dashboard', href: '/developer', icon: Home },
          { name: 'API Keys', href: '/developer/api-keys', icon: Code },
          { name: 'Verification', href: '/developer/verification', icon: Shield },
          { name: 'Documents', href: '/developer/documents', icon: FileText },
          { name: 'Wallet', href: '/developer/wallet', icon: CreditCard },
          { name: 'Notifications', href: '/developer/notifications', icon: Bell },
          { name: 'Profile', href: '/developer/profile', icon: Settings }
        ]
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin', icon: Home },
          { name: 'Users', href: '/admin/users', icon: Users },
          { name: 'Verifications', href: '/admin/verifications', icon: Shield },
          { name: 'Documents', href: '/admin/documents', icon: FileText },
          { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
          { name: 'Settings', href: '/admin/settings', icon: Settings }
        ]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  const renderNavItem = (item: SidebarItem, level: number = 0) => {
    const isActive = location.pathname === item.href || 
                    (item.href !== `/${userType}` && location.pathname.startsWith(item.href))
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.name)
    
    return (
      <div key={item.name}>
        <Link
          to={item.href}
          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive 
              ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          data-tour={item.name.toLowerCase().replace(/\s+/g, '-')}
        >
          <item.icon className={`h-5 w-5 mr-3 ${
            isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
          }`} />
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.name}</span>
              {item.count && (
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleExpanded(item.name)
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </>
          )}
        </Link>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="ml-4">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-gray-900">IDCertify</h1>
              <p className="text-sm text-gray-500">Identity Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents, verifications..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 mr-3 text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 mr-3 text-gray-400" />
          )}
          {!isCollapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {/* Support */}
        <Link
          to={`/${userType}/support`}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
        >
          <HelpCircle className="h-5 w-5 mr-3 text-gray-400" />
          {!isCollapsed && <span>Support</span>}
        </Link>

        {/* Settings */}
        <Link
          to={`/${userType}/settings`}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
        >
          <Settings className="h-5 w-5 mr-3 text-gray-400" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
