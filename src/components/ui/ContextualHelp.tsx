import { useState, useEffect } from 'react'
import { 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageCircle, 
  ExternalLink,
  Search,
  X,
  ChevronRight,
  Lightbulb,
  Play
} from 'lucide-react'

interface HelpItem {
  id: string
  title: string
  description: string
  type: 'guide' | 'video' | 'faq' | 'contact' | 'tip'
  category: string
  priority: 'high' | 'medium' | 'low'
  url?: string
  videoId?: string
  tags: string[]
}

interface ContextualHelpProps {
  currentSection?: string
  currentPage?: string
  userRole?: string
  onHelpItemClick?: (item: HelpItem) => void
}

const ContextualHelp = ({ 
  currentSection = 'dashboard',
  currentPage = 'overview',
  userRole = 'organisation',
  onHelpItemClick 
}: ContextualHelpProps) => {
  const [helpItems, setHelpItems] = useState<HelpItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const generateHelpItems = (): HelpItem[] => {
      const baseItems: HelpItem[] = [
        {
          id: 'getting-started',
          title: 'Getting Started with Organization Dashboard',
          description: 'Learn the basics of managing your organization on iDCERTIFY',
          type: 'guide',
          category: 'onboarding',
          priority: 'high',
          url: '/help/getting-started',
          tags: ['dashboard', 'basics', 'organization']
        },
        {
          id: 'employee-verification',
          title: 'How to Verify Employees',
          description: 'Step-by-step guide to verifying new employees',
          type: 'video',
          category: 'verification',
          priority: 'high',
          videoId: 'employee-verification-guide',
          tags: ['verification', 'employees', 'kyc']
        },
        {
          id: 'compliance-checklist',
          title: 'Compliance Checklist',
          description: 'Essential compliance requirements and deadlines',
          type: 'guide',
          category: 'compliance',
          priority: 'high',
          url: '/help/compliance-checklist',
          tags: ['compliance', 'aml', 'regulations']
        },
        {
          id: 'analytics-dashboard',
          title: 'Understanding Analytics Dashboard',
          description: 'How to read and interpret your organization metrics',
          type: 'video',
          category: 'analytics',
          priority: 'medium',
          videoId: 'analytics-dashboard-tour',
          tags: ['analytics', 'metrics', 'reporting']
        },
        {
          id: 'workflow-automation',
          title: 'Setting Up Workflow Automation',
          description: 'Automate approval processes and reduce manual work',
          type: 'guide',
          category: 'automation',
          priority: 'medium',
          url: '/help/workflow-automation',
          tags: ['workflow', 'automation', 'approvals']
        },
        {
          id: 'troubleshooting',
          title: 'Common Issues and Solutions',
          description: 'Frequently asked questions and troubleshooting tips',
          type: 'faq',
          category: 'support',
          priority: 'medium',
          url: '/help/troubleshooting',
          tags: ['troubleshooting', 'faq', 'issues']
        },
        {
          id: 'mobile-app',
          title: 'Using the Mobile App',
          description: 'Tips for managing your organization on mobile devices',
          type: 'tip',
          category: 'mobile',
          priority: 'low',
          url: '/help/mobile-app',
          tags: ['mobile', 'app', 'tips']
        },
        {
          id: 'contact-support',
          title: 'Contact Support Team',
          description: 'Get help from our support specialists',
          type: 'contact',
          category: 'support',
          priority: 'high',
          url: '/support/contact',
          tags: ['support', 'contact', 'help']
        }
      ]

      // Filter based on current section
      let filtered = baseItems

      if (currentSection === 'verification') {
        filtered = filtered.filter(item => 
          item.category === 'verification' || 
          item.tags.includes('verification') ||
          item.priority === 'high'
        )
      } else if (currentSection === 'compliance') {
        filtered = filtered.filter(item => 
          item.category === 'compliance' || 
          item.tags.includes('compliance') ||
          item.priority === 'high'
        )
      } else if (currentSection === 'analytics') {
        filtered = filtered.filter(item => 
          item.category === 'analytics' || 
          item.tags.includes('analytics') ||
          item.priority === 'high'
        )
      }

      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(item => item.category === selectedCategory)
      }

      return filtered
    }

    setHelpItems(generateHelpItems())
  }, [currentSection, searchQuery, selectedCategory])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="h-4 w-4" />
      case 'video':
        return <Play className="h-4 w-4" />
      case 'faq':
        return <HelpCircle className="h-4 w-4" />
      case 'contact':
        return <MessageCircle className="h-4 w-4" />
      case 'tip':
        return <Lightbulb className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'guide':
        return 'bg-blue-50 border-blue-200 text-blue-900'
      case 'video':
        return 'bg-purple-50 border-purple-200 text-purple-900'
      case 'faq':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'contact':
        return 'bg-orange-50 border-orange-200 text-orange-900'
      case 'tip':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'onboarding', label: 'Getting Started' },
    { id: 'verification', label: 'Verification' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'automation', label: 'Automation' },
    { id: 'support', label: 'Support' },
    { id: 'mobile', label: 'Mobile' }
  ]

  if (!showHelp) {
    return (
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
        title="Get Help"
      >
        <HelpCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
              <p className="text-gray-600">Find answers and get help with {currentSection}</p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Help Items */}
        <div className="p-6 overflow-y-auto max-h-96">
          {helpItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <HelpCircle className="h-12 w-12 mx-auto mb-4" />
              <p>No help topics found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {helpItems.map(item => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border-2 ${getTypeStyles(item.type)} cursor-pointer hover:shadow-md transition-all duration-200`}
                  onClick={() => onHelpItemClick?.(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getTypeIcon(item.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm opacity-90 mb-2">{item.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-white/50 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Can't find what you're looking for?
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View All Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContextualHelp
