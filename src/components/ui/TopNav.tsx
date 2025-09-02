import React from 'react'
import { Clock, Fingerprint, Users, Shield } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon: React.ElementType
}

interface TopNavProps {
  activeTab: 'requests' | 'biobank' | 'attesters' | 'trust'
  setActiveTab: (tabId: 'requests' | 'biobank' | 'attesters' | 'trust') => void
}

const TopNav: React.FC<TopNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs: Tab[] = [
    { id: 'requests', label: 'Verification Requests', icon: Clock },
    { id: 'biobank', label: 'Biobank', icon: Fingerprint },
    { id: 'attesters', label: 'Attester Network', icon: Users },
    { id: 'trust', label: 'Trust Score', icon: Shield }
  ]

  return (
    <div className="bg-gray-100 rounded-lg p-1">
      <nav className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
                              onClick={() => setActiveTab(tab.id as 'requests' | 'biobank' | 'attesters' | 'trust')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm font-bold'
                  : 'text-gray-500 hover:text-gray-700 font-medium'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default TopNav
