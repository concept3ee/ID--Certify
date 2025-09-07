import { useState, useEffect } from 'react'
import { 
  ChevronDown, 
  ChevronRight, 
  Info, 
  AlertCircle, 
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Shield,
  BarChart3
} from 'lucide-react'

interface DisclosureItem {
  id: string
  title: string
  description: string
  type: 'info' | 'warning' | 'success' | 'action'
  priority: 'high' | 'medium' | 'low'
  category: string
  data?: any
  children?: DisclosureItem[]
  action?: {
    label: string
    href: string
  }
}

interface ProgressiveDisclosureProps {
  currentSection?: string
  userRole?: string
  showAdvanced?: boolean
  onItemClick?: (item: DisclosureItem) => void
}

const ProgressiveDisclosure = ({ 
  currentSection = 'dashboard',
  userRole = 'organisation',
  showAdvanced = false,
  onItemClick 
}: ProgressiveDisclosureProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [disclosureItems, setDisclosureItems] = useState<DisclosureItem[]>([])

  useEffect(() => {
    const generateDisclosureItems = (): DisclosureItem[] => {
      const baseItems: DisclosureItem[] = [
        {
          id: 'essential',
          title: 'Essential Actions',
          description: 'Critical tasks requiring immediate attention',
          type: 'warning',
          priority: 'high',
          category: 'actions',
          children: [
            {
              id: 'pending-verifications',
              title: '14 Pending Verifications',
              description: 'Employee verifications awaiting review',
              type: 'warning',
              priority: 'high',
              category: 'verification',
              data: { count: 14, urgency: 'high' },
              action: { label: 'Review Now', href: '/organisation/verification' }
            },
            {
              id: 'compliance-due',
              title: '3 Compliance Checks Due',
              description: 'AML and KYC checks scheduled this week',
              type: 'info',
              priority: 'medium',
              category: 'compliance',
              data: { count: 3, dueDate: '2024-01-30' },
              action: { label: 'Schedule', href: '/organisation/compliance' }
            }
          ]
        },
        {
          id: 'contextual',
          title: 'Contextual Information',
          description: 'Relevant insights based on your current activity',
          type: 'info',
          priority: 'medium',
          category: 'insights',
          children: [
            {
              id: 'performance-trends',
              title: 'Performance Trends',
              description: 'Verification time improved by 15% this month',
              type: 'success',
              priority: 'low',
              category: 'performance',
              data: { improvement: '15%', period: 'month' },
              action: { label: 'View Details', href: '/organisation/analytics' }
            },
            {
              id: 'team-activity',
              title: 'Team Activity',
              description: '5 new employees added this week',
              type: 'info',
              priority: 'low',
              category: 'team',
              data: { newEmployees: 5, period: 'week' },
              action: { label: 'View Team', href: '/organisation/people' }
            }
          ]
        }
      ]

      // Add advanced items if showAdvanced is true
      if (showAdvanced) {
        baseItems.push({
          id: 'advanced',
          title: 'Advanced Features',
          description: 'Power user tools and advanced configurations',
          type: 'action',
          priority: 'low',
          category: 'advanced',
          children: [
            {
              id: 'workflow-automation',
              title: 'Workflow Automation',
              description: 'Set up automated approval workflows',
              type: 'action',
              priority: 'low',
              category: 'automation',
              action: { label: 'Configure', href: '/organisation/operations' }
            },
            {
              id: 'api-integrations',
              title: 'API Integrations',
              description: 'Connect with external systems and services',
              type: 'action',
              priority: 'low',
              category: 'integrations',
              action: { label: 'Explore', href: '/organisation/integrations' }
            }
          ]
        })
      }

      // Filter based on current section
      if (currentSection !== 'dashboard') {
        return baseItems.map(item => ({
          ...item,
          children: item.children?.filter(child => 
            child.category === currentSection || 
            item.priority === 'high' ||
            child.priority === 'high'
          )
        })).filter(item => item.children && item.children.length > 0)
      }

      return baseItems
    }

    setDisclosureItems(generateDisclosureItems())
  }, [currentSection, showAdvanced])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'action':
        return <TrendingUp className="h-4 w-4 text-purple-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-900'
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'action':
        return 'bg-purple-50 border-purple-200 text-purple-900'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900'
    }
  }

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500'
      case 'medium':
        return 'border-l-4 border-orange-500'
      case 'low':
        return 'border-l-4 border-blue-500'
      default:
        return 'border-l-4 border-gray-500'
    }
  }

  const renderItem = (item: DisclosureItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0
    const isClickable = item.action || hasChildren

    return (
      <div key={item.id} className={`${getPriorityStyles(item.priority)}`}>
        <div 
          className={`p-4 rounded-lg border ${getTypeStyles(item.type)} ${
            isClickable ? 'cursor-pointer hover:shadow-md' : ''
          } transition-all duration-200`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else if (item.action) {
              onItemClick?.(item)
            }
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getTypeIcon(item.type)}
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm opacity-90">{item.description}</p>
                {item.data && (
                  <div className="flex items-center space-x-4 mt-2 text-xs">
                    {item.data.count && (
                      <span className="bg-white/50 px-2 py-1 rounded">
                        {item.data.count} items
                      </span>
                    )}
                    {item.data.improvement && (
                      <span className="bg-white/50 px-2 py-1 rounded text-green-700">
                        +{item.data.improvement}
                      </span>
                    )}
                    {item.data.dueDate && (
                      <span className="bg-white/50 px-2 py-1 rounded">
                        Due: {item.data.dueDate}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {item.action && (
                <span className="text-xs bg-white/50 px-2 py-1 rounded">
                  {item.action.label}
                </span>
              )}
              {hasChildren && (
                <button className="p-1 hover:bg-white/50 rounded">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (disclosureItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Info className="h-8 w-8 mx-auto mb-2" />
        <p>No contextual information available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Contextual Information</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Priority-based</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" title="High Priority"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full" title="Medium Priority"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full" title="Low Priority"></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {disclosureItems.map(item => renderItem(item))}
      </div>
    </div>
  )
}

export default ProgressiveDisclosure
