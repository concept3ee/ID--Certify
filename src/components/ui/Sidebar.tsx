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
  Grid,
  History,
  Layers,
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
  Mail,
  Fingerprint,
  Building,
  Zap,
  Target,
  Award,
  ShieldCheck,
  FileCheck,
  Plus,
  Cpu,
  Server
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
  children?: SidebarItem[]
  badge?: number
  description?: string
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

  // Auto-expand parent items when child routes are active
  useEffect(() => {
    const navigationItems = getNavigationItems()
    const newExpandedItems: string[] = []
    
    navigationItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          location.pathname === child.href
        )
        if (hasActiveChild) {
          newExpandedItems.push(item.name)
        }
      }
    })
    
    setExpandedItems(prev => {
      const combined = [...new Set([...prev, ...newExpandedItems])]
      return combined
    })
  }, [location.pathname, userType])

  const getNavigationItems = (): SidebarItem[] => {
    switch (userType) {
      case 'individual':
        return [
          { 
            name: 'Dashboard', 
            href: '/individual', 
            icon: Home,
            description: 'Overview of your verification status and activities'
          },
          {
            name: 'Verification Hub',
            href: '/individual/verification',
            icon: Shield,
            description: 'Manage all verification processes and requests'
          },
          {
            name: 'Trust Network',
            href: '/individual/attester',
            icon: Users,
            description: 'Build and manage your network of trusted attesters',
            children: [
              { 
                name: 'My Attesters', 
                href: '/individual/attester/my-attesters', 
                icon: UserCheck,
                description: 'People who can vouch for you'
              },
              { 
                name: 'Attestation Requests', 
                href: '/individual/attester/requests', 
                icon: Bell,
                description: 'Requests for you to attest others'
              },
              { 
                name: 'Add Attester', 
                href: '/individual/attester/add', 
                icon: UserPlus,
                description: 'Connect with new trusted individuals'
              }
            ]
          },
          { 
            name: 'Biometric Biobank', 
            href: '/individual/biobank', 
            icon: Fingerprint,
            description: 'Secure biometric data storage and verification'
          },
          { 
            name: 'Trust Score', 
            href: '/individual/trust-score', 
            icon: Award,
            description: 'Your credibility score and improvement opportunities'
          },
          {
            name: 'Digital Wallet',
            href: '/individual/wallet',
            icon: Wallet,
            description: 'Manage payments and financial transactions',
            children: [
              { 
                name: 'Balance & Transactions', 
                href: '/individual/wallet', 
                icon: CreditCard,
                description: 'View balance and transaction history'
              },
              { 
                name: 'Payment Methods', 
                href: '/individual/wallet/payment-methods', 
                icon: CreditCard,
                description: 'Manage payment options'
              },
              { 
                name: 'Billing & Invoices', 
                href: '/individual/wallet/billing', 
                icon: FileText,
                description: 'View and download invoices'
              }
            ]
          },
          {
            name: 'Secure Documents',
            href: '/individual/documents',
            icon: Lock,
            description: 'Encrypted document storage and management',
            children: [
              { 
                name: 'Document Vault', 
                href: '/individual/documents', 
                icon: Folder,
                description: 'Securely store and manage documents'
              },
              { 
                name: 'Access Permissions', 
                href: '/individual/documents/permissions', 
                icon: Key,
                description: 'Control who can access your documents'
              },
              { 
                name: 'Document Analytics', 
                href: '/individual/documents/analytics', 
                icon: BarChart3,
                description: 'Track document usage and access'
              }
            ]
          },
          {
            name: 'Activity Monitoring',
            href: '/individual/data-monitoring',
            icon: Activity,
            description: 'Monitor your data usage and security',
            children: [
              { 
                name: 'Activity Overview', 
                href: '/individual/data-monitoring', 
                icon: BarChart3,
                description: 'Summary of all activities'
              },
              { 
                name: 'Security Events', 
                href: '/individual/data-monitoring/security', 
                icon: ShieldCheck,
                description: 'Track security-related activities'
              },
              { 
                name: 'Privacy Dashboard', 
                href: '/individual/data-monitoring/privacy', 
                icon: Eye,
                description: 'Monitor data privacy and access'
              },
              { 
                name: 'Data Usage', 
                href: '/individual/data-monitoring/usage', 
                icon: Database,
                description: 'Track how your data is being used'
              }
            ]
          },
          {
            name: 'Support & Help',
            href: '/individual/support',
            icon: HelpCircle,
            description: 'Get help and support resources',
            children: [
              { 
                name: 'Help Center', 
                href: '/individual/support', 
                icon: HelpCircle,
                description: 'Find answers to common questions'
              },
              { 
                name: 'Contact Support', 
                href: '/individual/support/contact', 
                icon: MessageCircle,
                description: 'Get in touch with support team'
              },
              { 
                name: 'FAQ', 
                href: '/individual/support/faq', 
                icon: BookOpen,
                description: 'Frequently asked questions'
              }
            ]
          },
          {
            name: 'Chat',
            href: '/individual/messages',
            icon: MessageCircle,
            description: 'Direct messaging with support and verification teams',
            badge: 2 // Unread messages count
          },
          {
            name: 'Settings',
            href: '/individual/settings',
            icon: Settings,
            description: 'Manage your account and preferences',
            children: [
              { 
                name: 'Profile Settings', 
                href: '/individual/settings', 
                icon: Settings,
                description: 'Update your profile information'
              },
              { 
                name: 'Security Settings', 
                href: '/individual/settings/security', 
                icon: Shield,
                description: 'Manage security preferences'
              },
              { 
                name: 'Notification Preferences', 
                href: '/individual/settings/notifications', 
                icon: Bell,
                description: 'Configure notification settings'
              },
              { 
                name: 'Privacy Settings', 
                href: '/individual/settings/privacy', 
                icon: Eye,
                description: 'Manage privacy and data settings'
              }
            ]
          }
        ]
      case 'organisation':
        return [
          { 
            name: 'Dashboard', 
            href: '/organisation', 
            icon: Home,
            description: 'Overview of organizational verification activities'
          },
          {
            name: 'Verification Center',
            href: '/organisation/verification',
            icon: Shield,
            badge: 5, // Active verifications
            description: 'Manage verification processes for individuals and organizations',
            children: [
              { 
                name: 'Dashboard', 
                href: '/organisation/verification', 
                icon: Grid,
                description: 'Verification overview and analytics'
              },
              { 
                name: 'Candidate Management', 
                href: '/organisation/verification/candidates', 
                icon: Users,
                description: 'Monitor candidates and track verification status'
              },
              { 
                name: 'Verification History', 
                href: '/organisation/verification/history', 
                icon: History,
                description: 'Complete audit trail of all verifications'
              },
              { 
                name: 'Attester Config', 
                href: '/organisation/verification/attesters', 
                icon: Shield,
                description: 'Configure and manage attesters'
              },
              { 
                name: 'Analytics', 
                href: '/organisation/verification/analytics', 
                icon: TrendingUp,
                description: 'Verification performance analytics'
              },
              { 
                name: 'Compliance', 
                href: '/organisation/verification/compliance', 
                icon: CheckCircle,
                description: 'Compliance and workflow integration'
              },
              { 
                name: 'Collaboration', 
                href: '/organisation/verification/collaboration', 
                icon: Users,
                description: 'Team collaboration and oversight'
              },
              { 
                name: 'Bulk Operations', 
                href: '/organisation/verification/bulk', 
                icon: Layers,
                description: 'Process multiple verifications'
              }
            ]
          },
          {
            name: 'Employee Management',
            href: '/organisation/employees',
            icon: Users,
            description: 'Manage employee database and verification status'
          },
          {
            name: 'Compliance & AML',
            href: '/organisation/compliance',
            icon: CheckCircle,
            description: 'Ensure regulatory compliance and AML procedures'
          },
          {
            name: 'System Monitoring',
            href: '/organisation/monitoring',
            icon: Activity,
            description: 'Monitor system health and performance',
            children: [
              { 
                name: 'System Overview', 
                href: '/organisation/monitoring', 
                icon: BarChart3,
                description: 'System health and performance metrics'
              },
              { 
                name: 'Activity Logs', 
                href: '/organisation/monitoring/activity', 
                icon: Activity,
                description: 'Track system activities'
              },
              { 
                name: 'Security Events', 
                href: '/organisation/monitoring/security', 
                icon: Shield,
                description: 'Monitor security events'
              },
              { 
                name: 'Performance Metrics', 
                href: '/organisation/monitoring/performance', 
                icon: Gauge,
                description: 'System performance analytics'
              }
            ]
          },
          {
            name: 'Integrations',
            href: '/organisation/integrations',
            icon: LinkIcon,
            description: 'Connect with external systems and services',
            children: [
              { 
                name: 'API Connections', 
                href: '/organisation/integrations', 
                icon: Code,
                description: 'Manage API integrations'
              },
              { 
                name: 'Third-party Services', 
                href: '/organisation/integrations/services', 
                icon: ExternalLink,
                description: 'Connect external services'
              },
              { 
                name: 'Webhooks', 
                href: '/organisation/integrations/webhooks', 
                icon: Code,
                description: 'Configure webhook notifications'
              },
              { 
                name: 'Data Sync', 
                href: '/organisation/integrations/sync', 
                icon: RefreshCw,
                description: 'Synchronize data with external systems'
              }
            ]
          },
          {
            name: 'Trust Score',
            href: '/organisation/trust-score',
            icon: Award,
            description: 'Monitor and improve organizational trust score',
            children: [
              { 
                name: 'Score Overview', 
                href: '/organisation/trust-score', 
                icon: BarChart3,
                description: 'Current trust score and metrics'
              },
              { 
                name: 'Score Breakdown', 
                href: '/organisation/trust-score/breakdown', 
                icon: PieChart,
                description: 'Detailed score analysis'
              },
              { 
                name: 'Score History', 
                href: '/organisation/trust-score/history', 
                icon: TrendingUp,
                description: 'Historical trust score data'
              },
              { 
                name: 'Improvement Tips', 
                href: '/organisation/trust-score/tips', 
                icon: Lightbulb,
                description: 'Ways to improve trust score'
              }
            ]
          },
          {
            name: 'Financial Management',
            href: '/organisation/wallet',
            icon: Wallet,
            description: 'Manage payments, billing, and financial transactions',
            children: [
              { 
                name: 'Wallet Balance', 
                href: '/organisation/wallet', 
                icon: CreditCard,
                description: 'View current balance'
              },
              { 
                name: 'Transactions', 
                href: '/organisation/wallet/transactions', 
                icon: TrendingUp,
                description: 'Transaction history'
              },
              { 
                name: 'Billing & Invoices', 
                href: '/organisation/billing', 
                icon: FileText,
                description: 'Manage billing and invoices'
              },
              { 
                name: 'Payment Methods', 
                href: '/organisation/wallet/payment-methods', 
                icon: CreditCard,
                description: 'Manage payment options'
              }
            ]
          },
          {
            name: 'Document Center',
            href: '/organisation/documents',
            icon: FileText,
            description: 'Secure document management and storage',
            children: [
              { 
                name: 'Document Vault', 
                href: '/organisation/documents', 
                icon: Folder,
                description: 'Secure document storage'
              },
              { 
                name: 'Document Templates', 
                href: '/organisation/documents/templates', 
                icon: FileText,
                description: 'Manage document templates'
              },
              { 
                name: 'Access Permissions', 
                href: '/organisation/documents/permissions', 
                icon: Key,
                description: 'Control document access'
              },
              { 
                name: 'Document Analytics', 
                href: '/organisation/documents/analytics', 
                icon: BarChart3,
                description: 'Document usage analytics'
              }
            ]
          },
          {
            name: 'Settings',
            href: '/organisation/settings',
            icon: Settings,
            description: 'Manage organizational settings and preferences',
            children: [
              { 
                name: 'General Settings', 
                href: '/organisation/settings', 
                icon: Settings,
                description: 'Basic organizational settings'
              },
              { 
                name: 'Security Settings', 
                href: '/organisation/settings/security', 
                icon: Shield,
                description: 'Security and access controls'
              },
              { 
                name: 'Notification Preferences', 
                href: '/organisation/settings/notifications', 
                icon: Bell,
                description: 'Configure notifications'
              },
              { 
                name: 'Team Management', 
                href: '/organisation/settings/team', 
                icon: Users,
                description: 'Manage team members and roles'
              }
            ]
          }
        ]
      case 'developer':
        return [
          { 
            name: 'Dashboard', 
            href: '/developer', 
            icon: Home,
            description: 'Overview of API usage and verification activities'
          },
          {
            name: 'Verification Templates',
            href: '/developer/verification-templates',
            icon: Shield,
            description: 'Create and manage custom verification templates',
            children: [
              { 
                name: 'Template Builder', 
                href: '/developer/verification-templates', 
                icon: Grid,
                description: 'Build custom verification flows'
              },
              { 
                name: 'Template Analytics', 
                href: '/developer/verification-templates/analytics', 
                icon: BarChart3,
                description: 'Track template performance'
              },
              { 
                name: 'Cost Management', 
                href: '/developer/verification-templates/costs', 
                icon: DollarSign,
                description: 'Monitor verification costs'
              }
            ]
          },
          {
            name: 'API Management',
            href: '/developer/api-keys',
            icon: Code,
            description: 'Manage API keys and access',
            children: [
              { 
                name: 'API Keys', 
                href: '/developer/api-keys', 
                icon: Key,
                description: 'Generate and manage API keys'
              },
              { 
                name: 'Rate Limits', 
                href: '/developer/api-keys/rate-limits', 
                icon: Gauge,
                description: 'Monitor API rate limits'
              },
              { 
                name: 'API Testing', 
                href: '/developer/api-keys/testing', 
                icon: Play,
                description: 'Test API endpoints'
              },
              { 
                name: 'API Analytics', 
                href: '/developer/analytics', 
                icon: BarChart3,
                description: 'API usage analytics'
              }
            ]
          },
          {
            name: 'Integration Tools',
            href: '/developer/webhooks',
            icon: LinkIcon,
            description: 'Configure integrations and webhooks',
            children: [
              { 
                name: 'Webhooks', 
                href: '/developer/webhooks', 
                icon: Code,
                description: 'Configure webhook notifications'
              },
              { 
                name: 'SDK Downloads', 
                href: '/developer/webhooks/sdk', 
                icon: Download,
                description: 'Download SDK libraries'
              },
              { 
                name: 'Integration Guides', 
                href: '/developer/webhooks/guides', 
                icon: BookOpen,
                description: 'Integration documentation'
              },
              { 
                name: 'Code Examples', 
                href: '/developer/webhooks/examples', 
                icon: Code,
                description: 'Sample code and examples'
              }
            ]
          },
          {
            name: 'Documentation',
            href: '/developer/docs',
            icon: BookOpen,
            description: 'API documentation and guides',
            children: [
              { 
                name: 'API Reference', 
                href: '/developer/docs', 
                icon: FileText,
                description: 'Complete API documentation'
              },
              { 
                name: 'Quick Start', 
                href: '/developer/docs/quickstart', 
                icon: Rocket,
                description: 'Get started quickly'
              },
              { 
                name: 'Tutorials', 
                href: '/developer/docs/tutorials', 
                icon: GraduationCap,
                description: 'Step-by-step tutorials'
              },
              { 
                name: 'Best Practices', 
                href: '/developer/docs/best-practices', 
                icon: Star,
                description: 'Development best practices'
              }
            ]
          },
          {
            name: 'Analytics & Monitoring',
            href: '/developer/analytics',
            icon: BarChart3,
            description: 'Monitor API performance and usage',
            children: [
              { 
                name: 'Usage Metrics', 
                href: '/developer/analytics/usage', 
                icon: TrendingUp,
                description: 'Track API usage patterns'
              },
              { 
                name: 'Error Logs', 
                href: '/developer/analytics/errors', 
                icon: AlertTriangle,
                description: 'Monitor API errors'
              },
              { 
                name: 'Performance', 
                href: '/developer/analytics/performance', 
                icon: Gauge,
                description: 'API performance metrics'
              },
              { 
                name: 'Real-time Monitoring', 
                href: '/developer/analytics/realtime', 
                icon: Activity,
                description: 'Live API monitoring'
              }
            ]
          },
          {
            name: 'Financial',
            href: '/developer/wallet',
            icon: Wallet,
            description: 'Manage billing and payments',
            children: [
              { 
                name: 'Wallet Balance', 
                href: '/developer/wallet', 
                icon: CreditCard,
                description: 'View current balance'
              },
              { 
                name: 'Billing History', 
                href: '/developer/wallet/billing', 
                icon: FileText,
                description: 'Payment history'
              },
              { 
                name: 'Usage Costs', 
                href: '/developer/wallet/usage', 
                icon: DollarSign,
                description: 'Track usage costs'
              },
              { 
                name: 'Payment Methods', 
                href: '/developer/wallet/payment-methods', 
                icon: CreditCard,
                description: 'Manage payment options'
              }
            ]
          },
          {
            name: 'Support & Community',
            href: '/developer/support',
            icon: HelpCircle,
            description: 'Get help and connect with the community',
            children: [
              { 
                name: 'Developer Support', 
                href: '/developer/support', 
                icon: MessageCircle,
                description: 'Technical support for developers'
              },
              { 
                name: 'Community Forum', 
                href: '/developer/support/forum', 
                icon: Users,
                description: 'Connect with other developers'
              },
              { 
                name: 'Status Page', 
                href: '/developer/support/status', 
                icon: Activity,
                description: 'Service status and updates'
              },
              { 
                name: 'Contact Support', 
                href: '/developer/support/contact', 
                icon: Mail,
                description: 'Get in touch with support'
              }
            ]
          },
          {
            name: 'Settings',
            href: '/developer/settings',
            icon: Settings,
            description: 'Manage account and API preferences',
            children: [
              { 
                name: 'Account Settings', 
                href: '/developer/settings', 
                icon: Settings,
                description: 'Update account information'
              },
              { 
                name: 'Security Settings', 
                href: '/developer/settings/security', 
                icon: Shield,
                description: 'Security preferences'
              },
              { 
                name: 'Notification Preferences', 
                href: '/developer/settings/notifications', 
                icon: Bell,
                description: 'Configure notifications'
              },
              { 
                name: 'API Preferences', 
                href: '/developer/settings/api', 
                icon: Code,
                description: 'API configuration settings'
              }
            ]
          }
        ]
      case 'admin':
        return [
          { 
            name: 'System Dashboard', 
            href: '/admin', 
            icon: Home,
            description: 'System-wide overview and monitoring'
          },
          { 
            name: 'User Management', 
            href: '/admin/users', 
            icon: Users,
            description: 'Manage all platform users'
          },
          { 
            name: 'Verification Oversight', 
            href: '/admin/verifications', 
            icon: Shield,
            description: 'Monitor all verification activities'
          },
          { 
            name: 'Document Management', 
            href: '/admin/documents', 
            icon: FileText,
            description: 'System-wide document oversight'
          },
          { 
            name: 'System Analytics', 
            href: '/admin/analytics', 
            icon: BarChart3,
            description: 'Platform-wide analytics and insights'
          },
          { 
            name: 'System Settings', 
            href: '/admin/settings', 
            icon: Settings,
            description: 'Configure system-wide settings'
          }
        ]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  const renderNavItem = (item: SidebarItem, level: number = 0) => {
    // Improved active state logic for nested routes
    let isActive = false
    if (level === 0) {
      // For top-level items, check if current path starts with the href
      isActive = location.pathname === item.href || 
                    (item.href !== `/${userType}` && location.pathname.startsWith(item.href))
    } else {
      // For child items, use exact path matching
      isActive = location.pathname === item.href
    }
    
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
              <span className="flex-1">{item.name}</span>
          {item.badge && (
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {item.badge}
                </span>
              )}
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleExpanded(item.name)
                  }}
              className="ml-2 p-1 rounded-md hover:bg-gray-100"
                >
                  {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </button>
          )}
        </Link>
        
        {hasChildren && isExpanded && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-full ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 overflow-hidden`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
        <div className="flex items-center space-x-3">
            {/* Custom iDCERTIFY Logo */}
            <div className="relative w-8 h-8">
              {/* White oval background */}
              <div className="absolute inset-0 bg-white rounded-full"></div>
              {/* Red concentric circles */}
              <div className="absolute inset-1 border-2 border-red-600 rounded-full"></div>
              <div className="absolute inset-2 border-2 border-red-600 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
              <div className="absolute inset-3 border-2 border-red-600 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
              {/* Red dot */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-red-600 rounded-full"></div>
            </div>
            <span className="text-lg font-bold text-gray-900">
              <span className="text-sm">i</span>DCERTIFY
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="relative w-8 h-8 mx-auto">
            {/* Custom iDCERTIFY Logo (collapsed) */}
            <div className="absolute inset-0 bg-white rounded-full"></div>
            <div className="absolute inset-1 border-2 border-red-600 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-red-600 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
            <div className="absolute inset-3 border-2 border-red-600 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-red-600 rounded-full"></div>
            </div>
          )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
        {navigationItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Theme</span>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <Sun className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
