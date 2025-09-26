import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  ChevronDown,
  Bell,
  Search,
  Plus,
  User,
  FileText,
  Shield,
  CreditCard
} from 'lucide-react'

interface MobileNavigationProps {
  userType?: string
  onNavigate?: (path: string) => void
}

const MobileNavigation = ({ userType = 'organisation', onNavigate }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setShowSearch(false)
  }, [location.pathname])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setShowSearch(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Quick actions for mobile
  const quickActions = [
    { name: 'New Verification', href: '/organisation/verification', icon: Plus, color: 'bg-blue-500' },
    { name: 'Add Employee', href: '/organisation/employees', icon: User, color: 'bg-green-500' },
    { name: 'View Reports', href: '/organisation/analytics', icon: FileText, color: 'bg-purple-500' },
    { name: 'Security', href: '/organisation/security', icon: Shield, color: 'bg-red-500' }
  ]

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/organisation',
      icon: Home,
      description: 'Overview and quick actions'
    },
    {
      id: 'people',
      name: 'People',
      href: '/organisation/people',
      icon: Users,
      description: 'Employee management and verification',
      children: [
        { name: 'Employee Directory', href: '/organisation/employees' },
        { name: 'Verification Center', href: '/organisation/verification' },
        { name: 'Team Chat', href: '/organisation/chat' },
        { name: 'Trust Score', href: '/organisation/trust-score' }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics',
      href: '/organisation/analytics',
      icon: BarChart3,
      description: 'Reports and performance metrics',
      children: [
        { name: 'Verification Reports', href: '/organisation/verification/analytics' },
        { name: 'Compliance Metrics', href: '/organisation/compliance' },
        { name: 'System Monitoring', href: '/organisation/monitoring' },
        { name: 'Historical Data', href: '/organisation/historical-data' }
      ]
    },
    {
      id: 'operations',
      name: 'Operations',
      href: '/organisation/operations',
      icon: Settings,
      description: 'Workflows and document management',
      children: [
        { name: 'Approval Workflows', href: '/organisation/approval' },
        { name: 'Compliance & AML', href: '/organisation/compliance' },
        { name: 'Document Center', href: '/organisation/documents' },
        { name: 'Integrations', href: '/organisation/integrations' }
      ]
    },
    {
      id: 'settings',
      name: 'Settings',
      href: '/organisation/settings',
      icon: Settings,
      description: 'Organization configuration',
      children: [
        { name: 'General Settings', href: '/organisation/settings' },
        { name: 'Security & Access', href: '/organisation/settings/security' },
        { name: 'Financial Management', href: '/organisation/wallet' },
        { name: 'Rewards & Points', href: '/organisation/rewards' },
        { name: 'Ratings & Reviews', href: '/organisation/ratings' }
      ]
    }
  ]

  const handleNavigation = (href: string) => {
    setIsOpen(false)
    setExpandedSection(null)
    onNavigate?.(href)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <Search className="h-5 w-5" />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  <div className="absolute inset-1 border-2 border-red-600 rounded-full"></div>
                  <div className="absolute inset-2 border-2 border-red-600 rounded-full"></div>
                  <div className="absolute inset-3 border-2 border-red-600 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-red-600 rounded-full"></div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  <span className="text-sm">i</span>DCERTIFY
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(action.href)}
                    className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                    style={{ minHeight: '60px' }}
                  >
                    <div className={`p-2 rounded-lg ${action.color} mb-2`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">{action.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (item.children) {
                          toggleSection(item.id)
                        } else {
                          handleNavigation(item.href)
                        }
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors touch-manipulation ${
                        isActive(item.href)
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      style={{ minHeight: '56px' }}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className={`h-5 w-5 ${
                          isActive(item.href) ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <div className="text-left">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </div>
                      {item.children && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          expandedSection === item.id ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>
                    
                    {item.children && expandedSection === item.id && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.href}
                            onClick={() => handleNavigation(child.href)}
                            className={`w-full text-left p-2 rounded-lg transition-colors ${
                              isActive(child.href)
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p>iDCERTIFY Organization Portal</p>
                <p>Version 2.0 - Smart Features</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
          <button
            onClick={() => handleNavigation('/organisation')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors touch-manipulation ${
              isActive('/organisation') ? 'text-blue-600' : 'text-gray-500'
            }`}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/organisation/verification')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors touch-manipulation ${
              isActive('/organisation/verification') ? 'text-blue-600' : 'text-gray-500'
            }`}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <Shield className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Verify</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/organisation/analytics')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors touch-manipulation ${
              isActive('/organisation/analytics') ? 'text-blue-600' : 'text-gray-500'
            }`}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <BarChart3 className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Analytics</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/organisation/employees')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors touch-manipulation ${
              isActive('/organisation/employees') ? 'text-blue-600' : 'text-gray-500'
            }`}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <Users className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">People</span>
          </button>
          
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center p-2 rounded-lg transition-colors touch-manipulation text-gray-500"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileNavigation
