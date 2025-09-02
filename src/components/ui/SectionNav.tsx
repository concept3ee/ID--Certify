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
  actionButton?: React.ReactNode
}

const SectionNav = ({ title, tabs, actionButton }: SectionNavProps) => {
  const location = useLocation()

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-3">
        {/* Section Header Row - Title, Centered Navigation, and Action Button */}
        <div className="flex items-center">
          {/* Left Side - Title Only */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>

          {/* Center - Navigation Tabs with Exact CSS Styling */}
          <div className="flex-1 flex justify-center">
            <div 
              className="overflow-x-auto rounded-[0.375rem] p-1"
              style={{
                backgroundColor: 'rgb(247, 247, 247)',
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <nav className="flex items-center gap-2">
                {tabs.map((tab, index) => {
                  // Check if all tabs point to the same URL
                  const allTabsSameUrl = tabs.length > 0 && tabs.every(t => t.href === tabs[0].href)
                  
                  // Determine if this tab should be active
                  let isActive = false
                  if (location.pathname === tab.href) {
                    // Exact URL match - always active
                    isActive = true
                  } else if (allTabsSameUrl && index === 0) {
                    // When all tabs point to same URL, only first tab is active
                    isActive = true
                  }
                  
                  return (
                    <Link
                      key={tab.id}
                      to={tab.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        isActive
                          ? 'bg-white text-gray-900 shadow-sm font-bold'
                          : 'text-gray-500 hover:text-gray-700 font-medium'
                      }`}
                    >
                      <span>{tab.name}</span>
                      {tab.badge && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                          {tab.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Right Side - Action Button */}
          {actionButton && (
            <div className="flex-shrink-0">
              {actionButton}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionNav
