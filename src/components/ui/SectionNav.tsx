import { Link, useLocation } from 'react-router-dom'

interface Tab {
  id: string
  name: string
  href: string
  badge?: number
}

interface SectionNavProps {
  title: string
  tabs: Tab[]
  description?: string
}

const SectionNav = ({ title, tabs, description }: SectionNavProps) => {
  const location = useLocation()

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        {/* Section Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href
            return (
              <Link
                key={tab.id}
                to={tab.href}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{tab.name}</span>
                  {tab.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </div>
                {/* Active indicator - red underline */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default SectionNav
