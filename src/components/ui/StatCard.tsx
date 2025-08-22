import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'increase' | 'decrease'
  icon?: ReactNode
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  [key: string]: any // Allow additional props like data attributes
}

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'primary',
  ...props
}: StatCardProps) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
    secondary: 'bg-gray-50 text-gray-600',
  }

  const changeColorClasses = {
    increase: 'text-success-600',
    decrease: 'text-danger-600',
  }

  return (
    <div className="card" {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {changeType === 'increase' ? (
                <TrendingUp className="h-4 w-4 text-success-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-danger-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${changeColorClasses[changeType || 'increase']}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
