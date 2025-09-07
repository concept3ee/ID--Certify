import { useState, useEffect } from 'react'
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  ArrowRight,
  X
} from 'lucide-react'

interface Recommendation {
  id: string
  type: 'success' | 'warning' | 'info' | 'action'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  action?: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  dismissible?: boolean
  category: string
}

interface SmartRecommendationsProps {
  userRole?: string
  currentSection?: string
  recentActivity?: string[]
  onDismiss?: (id: string) => void
}

const SmartRecommendations = ({ 
  userRole = 'organisation', 
  currentSection = 'dashboard',
  recentActivity = [],
  onDismiss 
}: SmartRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [dismissed, setDismissed] = useState<string[]>([])

  // Generate contextual recommendations based on current state
  useEffect(() => {
    const generateRecommendations = (): Recommendation[] => {
      const baseRecommendations: Recommendation[] = [
        {
          id: 'pending-verifications',
          type: 'warning',
          priority: 'high',
          title: '14 Verifications Pending',
          description: 'Complete pending employee verifications to maintain compliance',
          action: 'Review Now',
          href: '/organisation/verification',
          icon: AlertTriangle,
          category: 'verification'
        },
        {
          id: 'compliance-check',
          type: 'info',
          priority: 'medium',
          title: 'Schedule Compliance Review',
          description: 'Your monthly compliance review is due in 5 days',
          action: 'Schedule',
          href: '/organisation/compliance',
          icon: CheckCircle,
          category: 'compliance'
        },
        {
          id: 'performance-improvement',
          type: 'success',
          priority: 'low',
          title: 'Verification Time Improved',
          description: 'Your verification processing time has improved by 15% this month',
          action: 'View Details',
          href: '/organisation/analytics',
          icon: TrendingUp,
          category: 'performance'
        },
        {
          id: 'new-features',
          type: 'info',
          priority: 'low',
          title: 'New Features Available',
          description: 'Enhanced workflow automation and mobile optimization features',
          action: 'Explore',
          href: '/organisation/operations',
          icon: Lightbulb,
          category: 'features'
        }
      ]

      // Filter based on current section and recent activity
      let filtered = baseRecommendations

      // Show section-specific recommendations
      if (currentSection === 'verification') {
        filtered = filtered.filter(r => r.category === 'verification' || r.priority === 'high')
      } else if (currentSection === 'compliance') {
        filtered = filtered.filter(r => r.category === 'compliance' || r.priority === 'high')
      } else if (currentSection === 'analytics') {
        filtered = filtered.filter(r => r.category === 'performance' || r.priority === 'high')
      }

      // Remove dismissed recommendations
      return filtered.filter(r => !dismissed.includes(r.id))
    }

    setRecommendations(generateRecommendations())
  }, [currentSection, recentActivity, dismissed])

  const handleDismiss = (id: string) => {
    setDismissed(prev => [...prev, id])
    onDismiss?.(id)
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-900'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-900'
      case 'action':
        return 'bg-purple-50 border-purple-200 text-purple-900'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'medium':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'low':
        return <Target className="h-4 w-4 text-blue-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          Smart Recommendations
        </h3>
        <span className="text-sm text-gray-500">
          {recommendations.length} suggestion{recommendations.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className={`p-4 rounded-xl border-2 ${getTypeStyles(rec.type)} transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(rec.priority)}
                  <rec.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{rec.title}</h4>
                  <p className="text-sm opacity-90 mb-3">{rec.description}</p>
                  {rec.action && (
                    <button className="inline-flex items-center text-sm font-medium hover:underline">
                      {rec.action}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
              {rec.dismissible !== false && (
                <button
                  onClick={() => handleDismiss(rec.id)}
                  className="p-1 hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SmartRecommendations
