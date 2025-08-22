import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import Dashboard from './Dashboard'
import Users from './Users'
import Organisations from './Organisations'
import Developers from './Developers'
import Verifications from './Verifications'
import Biobank from './Biobank'
import Compliance from './Compliance'
import Analytics from './Analytics'
import Settings from './Settings'

const AdminDashboard = () => {
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
            <Route path="/users" element={<Users />} />
            <Route path="/organisations" element={<Organisations />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/verifications" element={<Verifications />} />
            <Route path="/biobank" element={<Biobank />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
