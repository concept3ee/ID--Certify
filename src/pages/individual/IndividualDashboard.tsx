import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import SectionNav from '@/components/ui/SectionNav'
import Dashboard from './Dashboard'
import Verification from './Verification'
import VerificationStatus from './VerificationStatus'
import Documents from './Documents'
import DataMonitoring from './DataMonitoring'
import Support from './Support'
import TrustScore from './TrustScore'
import TrustScoreOrganisation from './TrustScoreOrganisation'
import TrustScoreIndividual from './TrustScoreIndividual'
import TrustScoreBreakdown from './TrustScoreBreakdown'
import TrustScoreHistory from './TrustScoreHistory'
import Wallet from './Wallet'
import Profile from './Profile'
import Settings from './Settings'
import Notifications from './Notifications'
import Biobank from './Biobank'
import Attester from './Attester'
 

const IndividualDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

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
        <main className="flex-1 overflow-y-auto">
          
          <Routes>
            <Route path="/" element={
              <div className="p-6 mx-6">
                <Dashboard />
              </div>
            } />
            <Route path="/verification" element={
              <div className="p-6 mx-6">
                <Verification />
              </div>
            } />
            <Route path="/verification/status" element={
              <>
                <SectionNav
                  title="Verification Status"
                  description="Track the progress of your verification requests"
                  tabs={[
                    { id: 'start', name: 'Start Verification', href: '/individual/verification' },
                    { id: 'status', name: 'Status', href: '/individual/verification/status', badge: 2 },
                    { id: 'history', name: 'History', href: '/individual/verification/history' },
                    { id: 'pending', name: 'Pending', href: '/individual/verification/pending', badge: 1 }
                  ]}
                />
                <div className="p-6 mx-6">
                  <VerificationStatus />
                </div>
              </>
            } />
            <Route path="/verification/history" element={
              <div className="p-6 mx-6">
                <VerificationStatus />
              </div>
            } />
            <Route path="/verification/pending" element={
              <div className="p-6 mx-6">
                <VerificationStatus />
              </div>
            } />
            <Route path="/attester" element={
              <div className="p-6 mx-6">
                <Attester />
              </div>
            } />
            <Route path="/attester/my-attesters" element={
              <div className="p-6 mx-6">
                <Attester />
              </div>
            } />
            <Route path="/attester/requests" element={
              <div className="p-6 mx-6">
                <Attester />
              </div>
            } />
            <Route path="/biobank" element={
              <div className="p-6 mx-6">
                <Biobank />
              </div>
            } />
            <Route path="/trust-score" element={
              <>
                <SectionNav
                  title="Trust Score"
                  description="Track and improve your trust score"
                  tabs={[
                    { id: 'overview', name: 'Overview', href: '/individual/trust-score' },
                    { id: 'linked-organisation', name: 'Linked Organisation', href: '/individual/trust-score/organisation' },
                    { id: 'linked-individual', name: 'Linked Individual', href: '/individual/trust-score/individual' },
                    { id: 'score-breakdown', name: 'Score Breakdown', href: '/individual/trust-score/breakdown' },
                    { id: 'history-logs', name: 'History / Logs', href: '/individual/trust-score/history' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <TrustScore />
                </div>
              </>
            } />
            <Route path="/trust-score/organisation" element={
              <>
                <SectionNav
                  title="Trust Score"
                  description="Track and improve your trust score"
                  tabs={[
                    { id: 'overview', name: 'Overview', href: '/individual/trust-score' },
                    { id: 'linked-organisation', name: 'Linked Organisation', href: '/individual/trust-score/organisation' },
                    { id: 'linked-individual', name: 'Linked Individual', href: '/individual/trust-score/individual' },
                    { id: 'score-breakdown', name: 'Score Breakdown', href: '/individual/trust-score/breakdown' },
                    { id: 'history-logs', name: 'History / Logs', href: '/individual/trust-score/history' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <TrustScoreOrganisation />
                </div>
              </>
            } />
            <Route path="/trust-score/individual" element={
              <>
                <SectionNav
                  title="Trust Score"
                  description="Track and improve your trust score"
                  tabs={[
                    { id: 'overview', name: 'Overview', href: '/individual/trust-score' },
                    { id: 'linked-organisation', name: 'Linked Organisation', href: '/individual/trust-score/organisation' },
                    { id: 'linked-individual', name: 'Linked Individual', href: '/individual/trust-score/individual' },
                    { id: 'score-breakdown', name: 'Score Breakdown', href: '/individual/trust-score/breakdown' },
                    { id: 'history-logs', name: 'History / Logs', href: '/individual/trust-score/history' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <TrustScoreIndividual />
                </div>
              </>
            } />
            <Route path="/trust-score/breakdown" element={
              <>
                <SectionNav
                  title="Trust Score"
                  description="Track and improve your trust score"
                  tabs={[
                    { id: 'overview', name: 'Overview', href: '/individual/trust-score' },
                    { id: 'linked-organisation', name: 'Linked Organisation', href: '/individual/trust-score/organisation' },
                    { id: 'linked-individual', name: 'Linked Individual', href: '/individual/trust-score/individual' },
                    { id: 'score-breakdown', name: 'Score Breakdown', href: '/individual/trust-score/breakdown' },
                    { id: 'history-logs', name: 'History / Logs', href: '/individual/trust-score/history' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <TrustScoreBreakdown />
                </div>
              </>
            } />
            <Route path="/trust-score/history" element={
              <>
                <SectionNav
                  title="Trust Score"
                  description="Track and improve your trust score"
                  tabs={[
                    { id: 'overview', name: 'Overview', href: '/individual/trust-score' },
                    { id: 'linked-organisation', name: 'Linked Organisation', href: '/individual/trust-score/organisation' },
                    { id: 'linked-individual', name: 'Linked Individual', href: '/individual/trust-score/individual' },
                    { id: 'score-breakdown', name: 'Score Breakdown', href: '/individual/trust-score/breakdown' },
                    { id: 'history-logs', name: 'History / Logs', href: '/individual/trust-score/history' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <TrustScoreHistory />
                </div>
              </>
            } />
            <Route path="/wallet" element={
              <div className="p-6 mx-6">
                <Wallet />
              </div>
            } />
            <Route path="/wallet/transactions" element={
              <div className="p-6 mx-6">
                <Wallet />
              </div>
            } />
            <Route path="/wallet/billing" element={
              <div className="p-6 mx-6">
                <Wallet />
              </div>
            } />
            <Route path="/documents" element={
              <div className="p-6 mx-6">
                <Documents />
              </div>
            } />
            <Route path="/data-monitoring" element={
              <div className="p-6 mx-6">
                <DataMonitoring />
              </div>
            } />
            <Route path="/documents/permissions" element={
              <div className="p-6 mx-6">
                <Documents />
              </div>
            } />


            <Route path="/profile" element={
              <div className="p-6 mx-6">
                <Profile />
              </div>
            } />
            <Route path="/settings" element={
              <div className="p-6 mx-6">
                <Settings />
              </div>
            } />
            <Route path="/notifications" element={
              <div className="p-6 mx-6">
                <Notifications />
              </div>
            } />
            <Route path="/support" element={
              <div className="p-6 mx-6">
                <Support />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default IndividualDashboard
