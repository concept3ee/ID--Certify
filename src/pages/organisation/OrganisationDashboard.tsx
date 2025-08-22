import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import Dashboard from './Dashboard'
import Compliance from './Compliance'
import Employees from './Employees'
import AML from './AML'
import Monitoring from './Monitoring'
import Integrations from './Integrations'
import Wallet from './Wallet'
import Billing from './Billing'
import Settings from './Settings'

const OrganisationDashboard = () => {
  const { userType } = useSelector((state: RootState) => state.auth)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/aml" element={<AML />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default OrganisationDashboard
