import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import Dashboard from './Dashboard'
import Verification from './Verification'
import Documents from './Documents'
import TrustScore from './TrustScore'
import Wallet from './Wallet'
import Profile from './Profile'
import Settings from './Settings'
import Notifications from './Notifications'
import Biobank from './Biobank'
import Attester from './Attester'
import { useTour } from '@/contexts/TourContext'

const IndividualDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { setShowWelcomeModal, setIsOnboarding } = useTour()

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Debug Controls */}
          <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Controls:</h3>
            <div className="space-x-2">
              <button
                onClick={() => setShowWelcomeModal(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Show Welcome Modal
              </button>
              <button
                onClick={() => setIsOnboarding(true)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Start Tour
              </button>
            </div>
          </div>
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/verification/history" element={<Verification />} />
            <Route path="/verification/pending" element={<Verification />} />
            <Route path="/attester" element={<Attester />} />
            <Route path="/attester/my-attesters" element={<Attester />} />
            <Route path="/attester/requests" element={<Attester />} />
            <Route path="/biobank" element={<Biobank />} />
            <Route path="/trust-score" element={<TrustScore />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet/transactions" element={<Wallet />} />
            <Route path="/wallet/billing" element={<Wallet />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/documents/permissions" element={<Documents />} />
            <Route path="/monitoring" element={<Documents />} />
            <Route path="/monitoring/activity" element={<Documents />} />
            <Route path="/monitoring/access" element={<Documents />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/support" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default IndividualDashboard
