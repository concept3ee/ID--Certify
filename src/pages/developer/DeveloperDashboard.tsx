import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import Dashboard from './Dashboard'
import APIKeys from './APIKeys'
import Documentation from './Documentation'
import Webhooks from './Webhooks'
import Analytics from './Analytics'
import Wallet from './Wallet'
import Settings from './Settings'

const DeveloperDashboard = () => {
  const { userType } = useSelector((state: RootState) => state.auth)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar userType={userType!} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/api-keys" element={<APIKeys />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/webhooks" element={<Webhooks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default DeveloperDashboard
