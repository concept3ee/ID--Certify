import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import SectionNav from '@/components/ui/SectionNav'
import MobileNavigation from '@/components/ui/MobileNavigation'
import { Users, Shield, MessageSquare, Award, BarChart3, TrendingUp, CheckCircle, Activity, Archive, Settings as SettingsIcon, CheckSquare, FileText, LinkIcon, Wallet as WalletIcon, Gift, ThumbsUp } from 'lucide-react'
import Dashboard from './Dashboard'
import Compliance from './Compliance'
import Employees from './Employees'
import AML from './AML'
import Monitoring from './Monitoring'
import Integrations from './Integrations'
import WalletComponent from './Wallet'
import Billing from './Billing'
import Settings from './Settings'
import Verification from './Verification'
// New Organization Verification System Components
import VerificationDashboard from './VerificationDashboard'
import CandidateManager from './CandidateManager'
import VerificationHistory from './VerificationHistory'
import AttesterConfigurator from './AttesterConfigurator'
import VerificationAnalytics from './VerificationAnalytics'
import ComplianceWorkflow from './ComplianceWorkflow'
import CollaborationOversight from './CollaborationOversight'
import VerificationPayment from './VerificationPayment'
import Documents from './Documents'
import TrustScore from './TrustScore'
import Chat from './Chat'
import ApprovalWorkflow from './ApprovalWorkflow'
import Rewards from './Rewards'
import Ratings from './Ratings'
import HistoricalData from './HistoricalData'

const OrganisationDashboard = () => {
  const { userType } = useSelector((state: RootState) => state.auth)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Navigation */}
      <MobileNavigation userType={userType || 'organisation'} />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 h-full overflow-hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto min-h-0">
          <Routes>
            <Route path="/" element={
              <div className="p-4 sm:p-6">
                <Dashboard />
              </div>
            } />
            
            {/* Verification Routes - New Comprehensive System */}
            <Route path="/verification" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'dashboard', name: 'Dashboard', href: '/organisation/verification' },
                    { id: 'candidates', name: 'Candidates', href: '/organisation/verification/candidates' },
                    { id: 'history', name: 'History', href: '/organisation/verification/history' },
                    { id: 'attesters', name: 'Attesters', href: '/organisation/verification/attesters' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/verification/analytics' },
                    { id: 'compliance', name: 'Compliance', href: '/organisation/verification/compliance' },
                    { id: 'collaboration', name: 'Collaboration', href: '/organisation/verification/collaboration' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <VerificationDashboard />
                </div>
              </>
            } />
            <Route path="/verification/candidates" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'dashboard', name: 'Dashboard', href: '/organisation/verification' },
                    { id: 'candidates', name: 'Candidates', href: '/organisation/verification/candidates' },
                    { id: 'history', name: 'History', href: '/organisation/verification/history' },
                    { id: 'attesters', name: 'Attesters', href: '/organisation/verification/attesters' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/verification/analytics' },
                    { id: 'compliance', name: 'Compliance', href: '/organisation/verification/compliance' },
                    { id: 'collaboration', name: 'Collaboration', href: '/organisation/verification/collaboration' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <CandidateManager />
                </div>
              </>
            } />
            <Route path="/verification/history" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'dashboard', name: 'Dashboard', href: '/organisation/verification' },
                    { id: 'candidates', name: 'Candidates', href: '/organisation/verification/candidates' },
                    { id: 'history', name: 'History', href: '/organisation/verification/history' },
                    { id: 'attesters', name: 'Attesters', href: '/organisation/verification/attesters' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/verification/analytics' },
                    { id: 'compliance', name: 'Compliance', href: '/organisation/verification/compliance' },
                    { id: 'collaboration', name: 'Collaboration', href: '/organisation/verification/collaboration' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <VerificationHistory />
                </div>
              </>
            } />
            <Route path="/verification/attesters" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'dashboard', name: 'Dashboard', href: '/organisation/verification' },
                    { id: 'candidates', name: 'Candidates', href: '/organisation/verification/candidates' },
                    { id: 'history', name: 'History', href: '/organisation/verification/history' },
                    { id: 'attesters', name: 'Attesters', href: '/organisation/verification/attesters' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/verification/analytics' },
                    { id: 'compliance', name: 'Compliance', href: '/organisation/verification/compliance' },
                    { id: 'collaboration', name: 'Collaboration', href: '/organisation/verification/collaboration' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <AttesterConfigurator />
                </div>
              </>
            } />
            <Route path="/verification/analytics" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'dashboard', name: 'Dashboard', href: '/organisation/verification' },
                    { id: 'candidates', name: 'Candidates', href: '/organisation/verification/candidates' },
                    { id: 'history', name: 'History', href: '/organisation/verification/history' },
                    { id: 'attesters', name: 'Attesters', href: '/organisation/verification/attesters' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/verification/analytics' },
                    { id: 'compliance', name: 'Compliance', href: '/organisation/verification/compliance' },
                    { id: 'collaboration', name: 'Collaboration', href: '/organisation/verification/collaboration' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <VerificationAnalytics />
                </div>
              </>
            } />
            <Route path="/verification/compliance" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'dashboard', name: 'Dashboard', href: '/organisation/verification' },
                    { id: 'candidates', name: 'Candidates', href: '/organisation/verification/candidates' },
                    { id: 'history', name: 'History', href: '/organisation/verification/history' },
                    { id: 'attesters', name: 'Attesters', href: '/organisation/verification/attesters' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/verification/analytics' },
                    { id: 'compliance', name: 'Compliance', href: '/organisation/verification/compliance' },
                    { id: 'collaboration', name: 'Collaboration', href: '/organisation/verification/collaboration' }
                  ]}
                />
              <div className="p-6 mx-6">
                  <ComplianceWorkflow />
              </div>
              </>
            } />
            <Route path="/verification/collaboration" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'dashboard', name: 'Dashboard', href: '/organisation/verification' },
                    { id: 'candidates', name: 'Candidates', href: '/organisation/verification/candidates' },
                    { id: 'history', name: 'History', href: '/organisation/verification/history' },
                    { id: 'attesters', name: 'Attesters', href: '/organisation/verification/attesters' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/verification/analytics' },
                    { id: 'compliance', name: 'Compliance', href: '/organisation/verification/compliance' },
                    { id: 'collaboration', name: 'Collaboration', href: '/organisation/verification/collaboration' }
                  ]}
                />
              <div className="p-6 mx-6">
                  <CollaborationOversight />
              </div>
              </>
            } />

            {/* Compliance Routes */}
            <Route path="/compliance" element={
              <>
                <SectionNav
                  title="Compliance"
                  tabs={[
                    { id: 'overview', name: 'Compliance Overview', href: '/organisation/compliance' },
                    { id: 'regulatory', name: 'Regulatory Requirements', href: '/organisation/compliance/regulatory' },
                    { id: 'audit', name: 'Audit Reports', href: '/organisation/compliance/audit' },
                    { id: 'calendar', name: 'Compliance Calendar', href: '/organisation/compliance/calendar' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Compliance />
                </div>
              </>
            } />
            <Route path="/compliance/regulatory" element={
              <>
                <SectionNav
                  title="Compliance"
                  tabs={[
                    { id: 'overview', name: 'Compliance Overview', href: '/organisation/compliance' },
                    { id: 'regulatory', name: 'Regulatory Requirements', href: '/organisation/compliance/regulatory' },
                    { id: 'audit', name: 'Audit Reports', href: '/organisation/compliance/audit' },
                    { id: 'calendar', name: 'Compliance Calendar', href: '/organisation/compliance/calendar' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Compliance />
                </div>
              </>
            } />
            <Route path="/compliance/audit" element={
              <div className="p-6 mx-6">
                <Compliance />
              </div>
            } />
            <Route path="/compliance/calendar" element={
              <div className="p-6 mx-6">
                <Compliance />
              </div>
            } />

            {/* People Routes */}
            <Route path="/people" element={
              <div className="p-4 sm:p-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                  <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">People Management</h2>
                  <p className="text-gray-600 mb-6">Manage employees, verification, and team collaboration</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="/organisation/employees" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Employee Directory</h3>
                    </a>
                    <a href="/organisation/verification" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Verification Center</h3>
                    </a>
                    <a href="/organisation/chat" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                      <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Team Chat</h3>
                    </a>
                    <a href="/organisation/trust-score" className="p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                      <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Trust Score</h3>
                    </a>
                  </div>
                </div>
              </div>
            } />
            <Route path="/employees" element={
              <>
                <SectionNav
                  title="Employee Management"
                  tabs={[
                    { id: 'directory', name: 'Employee Directory', href: '/organisation/employees' },
                    { id: 'onboarding', name: 'Onboarding', href: '/organisation/employees/onboarding' },
                    { id: 'bulk', name: 'Bulk Operations', href: '/organisation/employees/bulk' },
                    { id: 'permissions', name: 'Access Control', href: '/organisation/employees/permissions' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/employees/analytics' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Employees />
                </div>
              </>
            } />
            <Route path="/employees/onboarding" element={
              <>
                <SectionNav
                  title="Employee Management"
                  tabs={[
                    { id: 'directory', name: 'Employee Directory', href: '/organisation/employees' },
                    { id: 'onboarding', name: 'Onboarding', href: '/organisation/employees/onboarding' },
                    { id: 'bulk', name: 'Bulk Operations', href: '/organisation/employees/bulk' },
                    { id: 'permissions', name: 'Access Control', href: '/organisation/employees/permissions' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/employees/analytics' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Employees />
                </div>
              </>
            } />
            <Route path="/employees/bulk" element={
              <>
                <SectionNav
                  title="Employee Management"
                  tabs={[
                    { id: 'directory', name: 'Employee Directory', href: '/organisation/employees' },
                    { id: 'onboarding', name: 'Onboarding', href: '/organisation/employees/onboarding' },
                    { id: 'bulk', name: 'Bulk Operations', href: '/organisation/employees/bulk' },
                    { id: 'permissions', name: 'Access Control', href: '/organisation/employees/permissions' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/employees/analytics' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                <Employees />
              </div>
              </>
            } />
            <Route path="/employees/permissions" element={
              <>
                <SectionNav
                  title="Employee Management"
                  tabs={[
                    { id: 'directory', name: 'Employee Directory', href: '/organisation/employees' },
                    { id: 'onboarding', name: 'Onboarding', href: '/organisation/employees/onboarding' },
                    { id: 'bulk', name: 'Bulk Operations', href: '/organisation/employees/bulk' },
                    { id: 'permissions', name: 'Access Control', href: '/organisation/employees/permissions' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/employees/analytics' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Employees />
                </div>
              </>
            } />
            <Route path="/employees/analytics" element={
              <>
                <SectionNav
                  title="Employee Management"
                  tabs={[
                    { id: 'directory', name: 'Employee Directory', href: '/organisation/employees' },
                    { id: 'onboarding', name: 'Onboarding', href: '/organisation/employees/onboarding' },
                    { id: 'bulk', name: 'Bulk Operations', href: '/organisation/employees/bulk' },
                    { id: 'permissions', name: 'Access Control', href: '/organisation/employees/permissions' },
                    { id: 'analytics', name: 'Analytics', href: '/organisation/employees/analytics' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                <Employees />
              </div>
              </>
            } />

            {/* AML & KYC Routes */}
            <Route path="/aml" element={
              <>
                <SectionNav
                  title="AML & KYC"
                  tabs={[
                    { id: 'overview', name: 'AML Overview', href: '/organisation/aml' },
                    { id: 'kyc', name: 'KYC Procedures', href: '/organisation/aml/kyc' },
                    { id: 'risk', name: 'Risk Assessment', href: '/organisation/aml/risk' },
                    { id: 'suspicious', name: 'Suspicious Activity', href: '/organisation/aml/suspicious' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <AML />
                </div>
              </>
            } />
            <Route path="/aml/kyc" element={
              <>
                <SectionNav
                  title="AML & KYC"
                  tabs={[
                    { id: 'overview', name: 'AML Overview', href: '/organisation/aml' },
                    { id: 'kyc', name: 'KYC Procedures', href: '/organisation/aml/kyc' },
                    { id: 'risk', name: 'Risk Assessment', href: '/organisation/aml/risk' },
                    { id: 'suspicious', name: 'Suspicious Activity', href: '/organisation/aml/suspicious' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <AML />
                </div>
              </>
            } />
            <Route path="/aml/risk" element={
              <div className="p-6 mx-6">
                <AML />
              </div>
            } />
            <Route path="/aml/suspicious" element={
              <div className="p-6 mx-6">
                <AML />
              </div>
            } />

            {/* Data Monitoring Routes */}
            <Route path="/monitoring" element={
              <>
                <SectionNav
                  title="Data Monitoring"
                  tabs={[
                    { id: 'overview', name: 'Monitoring Overview', href: '/organisation/monitoring' },
                    { id: 'activity', name: 'Activity Logs', href: '/organisation/monitoring/activity' },
                    { id: 'security', name: 'Security Events', href: '/organisation/monitoring/security' },
                    { id: 'access', name: 'Data Access', href: '/organisation/monitoring/access' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Monitoring />
                </div>
              </>
            } />
            <Route path="/monitoring/activity" element={
              <>
                <SectionNav
                  title="Data Monitoring"
                  tabs={[
                    { id: 'overview', name: 'Monitoring Overview', href: '/organisation/monitoring' },
                    { id: 'activity', name: 'Activity Logs', href: '/organisation/monitoring/activity' },
                    { id: 'security', name: 'Security Events', href: '/organisation/monitoring/security' },
                    { id: 'access', name: 'Data Access', href: '/organisation/monitoring/access' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Monitoring />
                </div>
              </>
            } />
            <Route path="/monitoring/security" element={
              <div className="p-6 mx-6">
                <Monitoring />
              </div>
            } />
            <Route path="/monitoring/access" element={
              <div className="p-6 mx-6">
                <Monitoring />
              </div>
            } />

            {/* Integrations Routes */}
            <Route path="/integrations" element={
              <>
                <SectionNav
                  title="Integrations"
                  tabs={[
                    { id: 'api', name: 'API Connections', href: '/organisation/integrations' },
                    { id: 'services', name: 'Third-party Services', href: '/organisation/integrations/services' },
                    { id: 'webhooks', name: 'Webhooks', href: '/organisation/integrations/webhooks' },
                    { id: 'sync', name: 'Data Sync', href: '/organisation/integrations/sync' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Integrations />
                </div>
              </>
            } />
            <Route path="/integrations/services" element={
              <>
                <SectionNav
                  title="Integrations"
                  tabs={[
                    { id: 'api', name: 'API Connections', href: '/organisation/integrations' },
                    { id: 'services', name: 'Third-party Services', href: '/organisation/integrations/services' },
                    { id: 'webhooks', name: 'Webhooks', href: '/organisation/integrations/webhooks' },
                    { id: 'sync', name: 'Data Sync', href: '/organisation/integrations/sync' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Integrations />
                </div>
              </>
            } />
            <Route path="/integrations/webhooks" element={
              <div className="p-6 mx-6">
                <Integrations />
              </div>
            } />
            <Route path="/integrations/sync" element={
              <div className="p-6 mx-6">
                <Integrations />
              </div>
            } />

            {/* Analytics Routes */}
            <Route path="/analytics" element={
              <div className="p-4 sm:p-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                  <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Reports</h2>
                  <p className="text-gray-600 mb-6">Reports, insights, and performance metrics</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="/organisation/verification/analytics" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Verification Reports</h3>
                    </a>
                    <a href="/organisation/compliance" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Compliance Metrics</h3>
                    </a>
                    <a href="/organisation/monitoring" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                      <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold">System Monitoring</h3>
                    </a>
                    <a href="/organisation/historical-data" className="p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                      <Archive className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Historical Data</h3>
                    </a>
                  </div>
                </div>
              </div>
            } />

            {/* Operations Routes */}
            <Route path="/operations" element={
              <div className="p-4 sm:p-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                  <SettingsIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Operations Center</h2>
                  <p className="text-gray-600 mb-6">Workflows, compliance, and document management</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="/organisation/approval" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <CheckSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Approval Workflows</h3>
                    </a>
                    <a href="/organisation/compliance" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Compliance & AML</h3>
                    </a>
                    <a href="/organisation/documents" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                      <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Document Center</h3>
                    </a>
                    <a href="/organisation/integrations" className="p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                      <LinkIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Integrations</h3>
                    </a>
                  </div>
                </div>
              </div>
            } />

            {/* Trust Score Routes */}
            <Route path="/trust-score" element={
              <div className="p-4 sm:p-6">
                <TrustScore />
              </div>
            } />

            {/* Approval Workflow Routes */}
            <Route path="/approval" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/pending" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/history" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/analytics" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/cross-platform" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/templates" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/advanced-analytics" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/mobile" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
              </div>
            } />
            <Route path="/approval/marketplace" element={
              <div className="p-4 sm:p-6">
                <ApprovalWorkflow />
                      </div>
            } />

            {/* Rewards Routes */}
            <Route path="/rewards" element={
              <div className="p-4 sm:p-6">
                <Rewards />
                      </div>
            } />
            <Route path="/rewards/catalog" element={
              <div className="p-4 sm:p-6">
                <Rewards />
                      </div>
            } />
            <Route path="/rewards/transactions" element={
              <div className="p-4 sm:p-6">
                <Rewards />
                    </div>
            } />
            <Route path="/rewards/my-rewards" element={
              <div className="p-4 sm:p-6">
                <Rewards />
                  </div>
            } />

            {/* Ratings Routes */}
            <Route path="/ratings" element={
              <div className="p-4 sm:p-6">
                <Ratings />
                </div>
            } />
            <Route path="/ratings/reviews" element={
              <div className="p-4 sm:p-6">
                <Ratings />
                      </div>
            } />
            <Route path="/ratings/analytics" element={
              <div className="p-4 sm:p-6">
                <Ratings />
                      </div>
            } />
            <Route path="/ratings/feedback" element={
              <div className="p-4 sm:p-6">
                <Ratings />
                      </div>
            } />

            {/* Historical Data Routes */}
            <Route path="/historical-data" element={
              <div className="p-4 sm:p-6">
                <HistoricalData />
                      </div>
            } />
            <Route path="/historical-data/analytics" element={
              <div className="p-4 sm:p-6">
                <HistoricalData />
                    </div>
            } />
            <Route path="/historical-data/audit-logs" element={
              <div className="p-4 sm:p-6">
                <HistoricalData />
                  </div>
            } />
            <Route path="/historical-data/reports" element={
              <div className="p-4 sm:p-6">
                <HistoricalData />
                </div>
            } />

            {/* Chat & Communication Routes */}
            <Route path="/chat" element={
              <div className="p-4 sm:p-6">
                <Chat />
                </div>
            } />
            <Route path="/chat/support" element={
              <div className="p-4 sm:p-6">
                <Chat />
              </div>
            } />
            <Route path="/chat/notifications" element={
              <div className="p-4 sm:p-6">
                <Chat />
                </div>
            } />
            <Route path="/chat/email" element={
              <div className="p-4 sm:p-6">
                <Chat />
              </div>
            } />

            {/* Financial Routes */}
            <Route path="/wallet" element={
              <>
                <SectionNav
                  title="Financial"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/organisation/wallet' },
                    { id: 'transactions', name: 'Transactions', href: '/organisation/wallet/transactions' },
                    { id: 'billing', name: 'Billing & Invoices', href: '/organisation/billing' },
                    { id: 'payment', name: 'Payment Methods', href: '/organisation/wallet/payment-methods' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <WalletComponent />
                </div>
              </>
            } />
            <Route path="/wallet/transactions" element={
              <>
                <SectionNav
                  title="Financial"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/organisation/wallet' },
                    { id: 'transactions', name: 'Transactions', href: '/organisation/wallet/transactions' },
                    { id: 'billing', name: 'Billing & Invoices', href: '/organisation/billing' },
                    { id: 'payment', name: 'Payment Methods', href: '/organisation/wallet/payment-methods' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <WalletComponent />
                </div>
              </>
            } />
            <Route path="/wallet/payment-methods" element={
              <div className="p-6 mx-6">
                <WalletComponent />
              </div>
            } />
            <Route path="/billing" element={
              <>
                <SectionNav
                  title="Financial"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/organisation/wallet' },
                    { id: 'transactions', name: 'Transactions', href: '/organisation/wallet/transactions' },
                    { id: 'billing', name: 'Billing & Invoices', href: '/organisation/billing' },
                    { id: 'payment', name: 'Payment Methods', href: '/organisation/wallet/payment-methods' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Billing />
                </div>
              </>
            } />
            
            {/* Verification Payment Route */}
            <Route path="/verification/payment" element={<VerificationPayment />} />

            {/* Document Management Routes */}
            <Route path="/documents" element={
              <div className="p-4 sm:p-6">
                <Documents />
                </div>
            } />
            <Route path="/documents/templates" element={
              <>
                <SectionNav
                  title="Document Management"
                  tabs={[
                    { id: 'vault', name: 'Document Vault', href: '/organisation/documents' },
                    { id: 'templates', name: 'Document Templates', href: '/organisation/documents/templates' },
                    { id: 'permissions', name: 'Access Permissions', href: '/organisation/documents/permissions' },
                    { id: 'analytics', name: 'Document Analytics', href: '/organisation/documents/analytics' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Templates</h2>
                    <p className="text-gray-600">Manage document templates for your organization.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/documents/permissions" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Access Permissions</h2>
                  <p className="text-gray-600">Manage document access permissions for your organization.</p>
                </div>
              </div>
            } />
            <Route path="/documents/analytics" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Analytics</h2>
                  <p className="text-gray-600">Analytics and insights for your organization's documents.</p>
                </div>
              </div>
            } />

            {/* Settings Routes */}
            <Route path="/settings" element={
              <div className="p-4 sm:p-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                  <SettingsIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Organization Settings</h2>
                  <p className="text-gray-600 mb-6">Configuration and preferences for your organization</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <a href="/organisation/settings" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <SettingsIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">General Settings</h3>
                    </a>
                    <a href="/organisation/settings/security" className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Security & Access</h3>
                    </a>
                    <a href="/organisation/wallet" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                      <WalletIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Financial Management</h3>
                    </a>
                    <a href="/organisation/rewards" className="p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                      <Gift className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Rewards & Points</h3>
                    </a>
                    <a href="/organisation/ratings" className="p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors">
                      <ThumbsUp className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Ratings & Reviews</h3>
                    </a>
                  </div>
                </div>
              </div>
            } />
            <Route path="/settings/detailed" element={
              <>
                <SectionNav
                  title="Settings"
                  tabs={[
                    { id: 'general', name: 'General Settings', href: '/organisation/settings' },
                    { id: 'security', name: 'Security Settings', href: '/organisation/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/organisation/settings/notifications' },
                    { id: 'team', name: 'Team Management', href: '/organisation/settings/team' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Settings />
                </div>
              </>
            } />
            <Route path="/settings/security" element={
              <>
                <SectionNav
                  title="Settings"
                  tabs={[
                    { id: 'general', name: 'General Settings', href: '/organisation/settings' },
                    { id: 'security', name: 'Security Settings', href: '/organisation/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/organisation/settings/notifications' },
                    { id: 'team', name: 'Team Management', href: '/organisation/settings/team' }
                  ]}
                />
                <div className="p-4 sm:p-6">
                  <Settings />
                </div>
              </>
            } />
            <Route path="/settings/notifications" element={
              <div className="p-6 mx-6">
                <Settings />
              </div>
            } />
            <Route path="/settings/team" element={
              <div className="p-6 mx-6">
                <Settings />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default OrganisationDashboard
