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
  Clock,
  UserCheck,
  Lock,
  Activity,
  Wallet,
  Folder,
  Eye,
  Key,
  Search,
  Sun,
  Moon,
  HelpCircle,
  CheckCircle,
  Calendar,
  UserPlus,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  PieChart,
  Lightbulb,
  Clipboard,
  Link as LinkIcon,
  Gauge,
  Play,
  Download,
  BookOpen,
  TestTube,
  Rocket,
  GraduationCap,
  Star,
  DollarSign,
  MessageCircle,
  Mail
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

const Sidebar = ({ isCollapsed = false }: SidebarProps) => {
  const location = useLocation()
  const { userType } = useSelector((state: RootState) => state.auth)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

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
              { name: 'Verification Status', href: '/individual/verification/status', icon: CheckCircle },
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
            href: '/individual/data-monitoring',
            icon: Activity,
            children: [
              { name: 'Overview', href: '/individual/data-monitoring', icon: BarChart3 },
              { name: 'Activity Logs', href: '/individual/data-monitoring', icon: Activity },
              { name: 'Security Events', href: '/individual/data-monitoring', icon: Shield },
              { name: 'Privacy Dashboard', href: '/individual/data-monitoring', icon: Eye },
              { name: 'Data Usage', href: '/individual/data-monitoring', icon: Database }
            ]
          }
        ]
      case 'organisation':
        return [
          { 
            name: 'Overview', 
            href: '/organisation', 
            icon: Home 
          },
          {
            name: 'Verification',
            href: '/organisation/verification',
            icon: Shield,
            children: [
              { name: 'Start Verification', href: '/organisation/verification', icon: Shield },
              { name: 'Verification Status', href: '/organisation/verification/status', icon: CheckCircle },
              { name: 'Verification History', href: '/organisation/verification/history', icon: FileText },
              { name: 'Pending Actions', href: '/organisation/verification/pending', icon: Clock }
            ]
          },
          {
            name: 'Compliance',
            href: '/organisation/compliance',
            icon: CheckCircle,
            children: [
              { name: 'Compliance Overview', href: '/organisation/compliance', icon: BarChart3 },
              { name: 'Regulatory Requirements', href: '/organisation/compliance/regulatory', icon: FileText },
              { name: 'Audit Reports', href: '/organisation/compliance/audit', icon: Clipboard },
              { name: 'Compliance Calendar', href: '/organisation/compliance/calendar', icon: Calendar }
            ]
          },
          {
            name: 'Employee Management',
            href: '/organisation/employees',
            icon: Users,
            children: [
              { name: 'Employee Directory', href: '/organisation/employees', icon: Users },
              { name: 'Add Employee', href: '/organisation/employees/add', icon: UserPlus },
              { name: 'Employee Verification', href: '/organisation/employees/verification', icon: Shield },
              { name: 'Access Permissions', href: '/organisation/employees/permissions', icon: Key }
            ]
          },
          {
            name: 'AML & KYC',
            href: '/organisation/aml',
            icon: Shield,
            children: [
              { name: 'AML Overview', href: '/organisation/aml', icon: BarChart3 },
              { name: 'KYC Procedures', href: '/organisation/aml/kyc', icon: UserCheck },
              { name: 'Risk Assessment', href: '/organisation/aml/risk', icon: AlertTriangle },
              { name: 'Suspicious Activity', href: '/organisation/aml/suspicious', icon: Eye }
            ]
          },
          {
            name: 'Data Monitoring',
            href: '/organisation/monitoring',
            icon: Activity,
            children: [
              { name: 'Monitoring Overview', href: '/organisation/monitoring', icon: BarChart3 },
              { name: 'Activity Logs', href: '/organisation/monitoring/activity', icon: Activity },
              { name: 'Security Events', href: '/organisation/monitoring/security', icon: Shield },
              { name: 'Data Access', href: '/organisation/monitoring/access', icon: Database }
            ]
          },
          {
            name: 'Integrations',
            href: '/organisation/integrations',
            icon: LinkIcon,
            children: [
              { name: 'API Connections', href: '/organisation/integrations', icon: Code },
              { name: 'Third-party Services', href: '/organisation/integrations/services', icon: ExternalLink },
              { name: 'Webhooks', href: '/organisation/integrations/webhooks', icon: Code },
              { name: 'Data Sync', href: '/organisation/integrations/sync', icon: RefreshCw }
            ]
          },
          {
            name: 'Trust Score',
            href: '/organisation/trust-score',
            icon: BarChart3,
            children: [
              { name: 'Score Overview', href: '/organisation/trust-score', icon: BarChart3 },
              { name: 'Score Breakdown', href: '/organisation/trust-score/breakdown', icon: PieChart },
              { name: 'Score History', href: '/organisation/trust-score/history', icon: TrendingUp },
              { name: 'Improvement Tips', href: '/organisation/trust-score/tips', icon: Lightbulb }
            ]
          },
          {
            name: 'Financial',
            href: '/organisation/wallet',
            icon: Wallet,
            children: [
              { name: 'Wallet Balance', href: '/organisation/wallet', icon: CreditCard },
              { name: 'Transactions', href: '/organisation/wallet/transactions', icon: TrendingUp },
              { name: 'Billing & Invoices', href: '/organisation/billing', icon: FileText },
              { name: 'Payment Methods', href: '/organisation/wallet/payment-methods', icon: CreditCard }
            ]
          },
          {
            name: 'Document Management',
            href: '/organisation/documents',
            icon: FileText,
            children: [
              { name: 'Document Vault', href: '/organisation/documents', icon: Folder },
              { name: 'Document Templates', href: '/organisation/documents/templates', icon: FileText },
              { name: 'Access Permissions', href: '/organisation/documents/permissions', icon: Key },
              { name: 'Document Analytics', href: '/organisation/documents/analytics', icon: BarChart3 }
            ]
          },
          {
            name: 'Settings',
            href: '/organisation/settings',
            icon: Settings,
            children: [
              { name: 'General Settings', href: '/organisation/settings', icon: Settings },
              { name: 'Security Settings', href: '/organisation/settings/security', icon: Shield },
              { name: 'Notification Preferences', href: '/organisation/settings/notifications', icon: Bell },
              { name: 'Team Management', href: '/organisation/settings/team', icon: Users }
            ]
          }
        ]
      case 'developer':
        return [
          { 
            name: 'Overview', 
            href: '/developer', 
            icon: Home 
          },
          {
            name: 'API Management',
            href: '/developer/api-keys',
            icon: Code,
            children: [
              { name: 'API Keys', href: '/developer/api-keys', icon: Key },
              { name: 'API Documentation', href: '/developer/docs', icon: FileText },
              { name: 'Rate Limits', href: '/developer/api-keys/rate-limits', icon: Gauge },
              { name: 'API Testing', href: '/developer/api-keys/testing', icon: Play }
            ]
          },
          {
            name: 'Integration Tools',
            href: '/developer/webhooks',
            icon: LinkIcon,
            children: [
              { name: 'Webhooks', href: '/developer/webhooks', icon: Code },
              { name: 'SDK Downloads', href: '/developer/webhooks/sdk', icon: Download },
              { name: 'Integration Guides', href: '/developer/webhooks/guides', icon: BookOpen },
              { name: 'Code Examples', href: '/developer/webhooks/examples', icon: Code }
            ]
          },
          {
            name: 'Verification',
            href: '/developer/verification',
            icon: Shield,
            children: [
              { name: 'Verification API', href: '/developer/verification', icon: Shield },
              { name: 'Verification Status', href: '/developer/verification/status', icon: CheckCircle },
              { name: 'Verification History', href: '/developer/verification/history', icon: FileText },
              { name: 'Test Environment', href: '/developer/verification/test', icon: TestTube }
            ]
          },
          {
            name: 'Analytics & Monitoring',
            href: '/developer/analytics',
            icon: BarChart3,
            children: [
              { name: 'API Analytics', href: '/developer/analytics', icon: BarChart3 },
              { name: 'Usage Metrics', href: '/developer/analytics/usage', icon: TrendingUp },
              { name: 'Error Logs', href: '/developer/analytics/errors', icon: AlertTriangle },
              { name: 'Performance', href: '/developer/analytics/performance', icon: Gauge }
            ]
          },
          {
            name: 'Documentation',
            href: '/developer/docs',
            icon: BookOpen,
            children: [
              { name: 'API Reference', href: '/developer/docs', icon: FileText },
              { name: 'Quick Start', href: '/developer/docs/quickstart', icon: Rocket },
              { name: 'Tutorials', href: '/developer/docs/tutorials', icon: GraduationCap },
              { name: 'Best Practices', href: '/developer/docs/best-practices', icon: Star }
            ]
          },
          {
            name: 'Financial',
            href: '/developer/wallet',
            icon: Wallet,
            children: [
              { name: 'Wallet Balance', href: '/developer/wallet', icon: CreditCard },
              { name: 'Billing History', href: '/developer/wallet/billing', icon: FileText },
              { name: 'Usage Costs', href: '/developer/wallet/usage', icon: DollarSign },
              { name: 'Payment Methods', href: '/developer/wallet/payment-methods', icon: CreditCard }
            ]
          },
          {
            name: 'Support & Community',
            href: '/developer/support',
            icon: HelpCircle,
            children: [
              { name: 'Developer Support', href: '/developer/support', icon: MessageCircle },
              { name: 'Community Forum', href: '/developer/support/forum', icon: Users },
              { name: 'Status Page', href: '/developer/support/status', icon: Activity },
              { name: 'Contact Support', href: '/developer/support/contact', icon: Mail }
            ]
          },
          {
            name: 'Settings',
            href: '/developer/settings',
            icon: Settings,
            children: [
              { name: 'Account Settings', href: '/developer/settings', icon: Settings },
              { name: 'Security Settings', href: '/developer/settings/security', icon: Shield },
              { name: 'Notification Preferences', href: '/developer/settings/notifications', icon: Bell },
              { name: 'API Preferences', href: '/developer/settings/api', icon: Code }
            ]
          }
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
