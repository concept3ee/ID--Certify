import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import SectionNav from '@/components/ui/SectionNav'
import Dashboard from './Dashboard'
import Compliance from './Compliance'
import Employees from './Employees'
import AML from './AML'
import Monitoring from './Monitoring'
import Integrations from './Integrations'
import Wallet from './Wallet'
import Billing from './Billing'
import Settings from './Settings'
import Verification from './Verification'

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
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={
              <div className="p-6 mx-6">
                <Dashboard />
              </div>
            } />
            
            {/* Verification Routes */}
            <Route path="/verification" element={
              <>
                <SectionNav
                  title="Verification"
                  description="Start and manage verification processes for candidates"
                  tabs={[
                    { id: 'start', name: 'Start Verification', href: '/organisation/verification' },
                    { id: 'status', name: 'Verification Status', href: '/organisation/verification/status', badge: 3 },
                    { id: 'history', name: 'Verification History', href: '/organisation/verification/history' },
                    { id: 'pending', name: 'Pending Actions', href: '/organisation/verification/pending', badge: 2 }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Verification />
                </div>
              </>
            } />
            <Route path="/verification/status" element={
              <>
                <SectionNav
                  title="Verification Status"
                  description="Track the progress of verification requests"
                  tabs={[
                    { id: 'start', name: 'Start Verification', href: '/organisation/verification' },
                    { id: 'status', name: 'Verification Status', href: '/organisation/verification/status', badge: 3 },
                    { id: 'history', name: 'Verification History', href: '/organisation/verification/history' },
                    { id: 'pending', name: 'Pending Actions', href: '/organisation/verification/pending', badge: 2 }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Verification />
                </div>
              </>
            } />
            <Route path="/verification/history" element={
              <div className="p-6 mx-6">
                <Verification />
              </div>
            } />
            <Route path="/verification/pending" element={
              <div className="p-6 mx-6">
                <Verification />
              </div>
            } />

            {/* Compliance Routes */}
            <Route path="/compliance" element={
              <>
                <SectionNav
                  title="Compliance"
                  description="Manage regulatory compliance and audit requirements"
                  tabs={[
                    { id: 'overview', name: 'Compliance Overview', href: '/organisation/compliance' },
                    { id: 'regulatory', name: 'Regulatory Requirements', href: '/organisation/compliance/regulatory' },
                    { id: 'audit', name: 'Audit Reports', href: '/organisation/compliance/audit' },
                    { id: 'calendar', name: 'Compliance Calendar', href: '/organisation/compliance/calendar' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Compliance />
                </div>
              </>
            } />
            <Route path="/compliance/regulatory" element={
              <>
                <SectionNav
                  title="Compliance"
                  description="Manage regulatory compliance and audit requirements"
                  tabs={[
                    { id: 'overview', name: 'Compliance Overview', href: '/organisation/compliance' },
                    { id: 'regulatory', name: 'Regulatory Requirements', href: '/organisation/compliance/regulatory' },
                    { id: 'audit', name: 'Audit Reports', href: '/organisation/compliance/audit' },
                    { id: 'calendar', name: 'Compliance Calendar', href: '/organisation/compliance/calendar' }
                  ]}
                />
                <div className="p-6 mx-6">
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

            {/* Employee Management Routes */}
            <Route path="/employees" element={
              <>
                <SectionNav
                  title="Employee Management"
                  description="Manage your organization's employees and their access"
                  tabs={[
                    { id: 'directory', name: 'Employee Directory', href: '/organisation/employees' },
                    { id: 'add', name: 'Add Employee', href: '/organisation/employees/add' },
                    { id: 'verification', name: 'Employee Verification', href: '/organisation/employees/verification' },
                    { id: 'permissions', name: 'Access Permissions', href: '/organisation/employees/permissions' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Employees />
                </div>
              </>
            } />
            <Route path="/employees/add" element={
              <>
                <SectionNav
                  title="Employee Management"
                  description="Manage your organization's employees and their access"
                  tabs={[
                    { id: 'directory', name: 'Employee Directory', href: '/organisation/employees' },
                    { id: 'add', name: 'Add Employee', href: '/organisation/employees/add' },
                    { id: 'verification', name: 'Employee Verification', href: '/organisation/employees/verification' },
                    { id: 'permissions', name: 'Access Permissions', href: '/organisation/employees/permissions' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Employees />
                </div>
              </>
            } />
            <Route path="/employees/verification" element={
              <div className="p-6 mx-6">
                <Employees />
              </div>
            } />
            <Route path="/employees/permissions" element={
              <div className="p-6 mx-6">
                <Employees />
              </div>
            } />

            {/* AML & KYC Routes */}
            <Route path="/aml" element={
              <>
                <SectionNav
                  title="AML & KYC"
                  description="Anti-Money Laundering and Know Your Customer procedures"
                  tabs={[
                    { id: 'overview', name: 'AML Overview', href: '/organisation/aml' },
                    { id: 'kyc', name: 'KYC Procedures', href: '/organisation/aml/kyc' },
                    { id: 'risk', name: 'Risk Assessment', href: '/organisation/aml/risk' },
                    { id: 'suspicious', name: 'Suspicious Activity', href: '/organisation/aml/suspicious' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <AML />
                </div>
              </>
            } />
            <Route path="/aml/kyc" element={
              <>
                <SectionNav
                  title="AML & KYC"
                  description="Anti-Money Laundering and Know Your Customer procedures"
                  tabs={[
                    { id: 'overview', name: 'AML Overview', href: '/organisation/aml' },
                    { id: 'kyc', name: 'KYC Procedures', href: '/organisation/aml/kyc' },
                    { id: 'risk', name: 'Risk Assessment', href: '/organisation/aml/risk' },
                    { id: 'suspicious', name: 'Suspicious Activity', href: '/organisation/aml/suspicious' }
                  ]}
                />
                <div className="p-6 mx-6">
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
                  description="Monitor system activity and security events"
                  tabs={[
                    { id: 'overview', name: 'Monitoring Overview', href: '/organisation/monitoring' },
                    { id: 'activity', name: 'Activity Logs', href: '/organisation/monitoring/activity' },
                    { id: 'security', name: 'Security Events', href: '/organisation/monitoring/security' },
                    { id: 'access', name: 'Data Access', href: '/organisation/monitoring/access' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Monitoring />
                </div>
              </>
            } />
            <Route path="/monitoring/activity" element={
              <>
                <SectionNav
                  title="Data Monitoring"
                  description="Monitor system activity and security events"
                  tabs={[
                    { id: 'overview', name: 'Monitoring Overview', href: '/organisation/monitoring' },
                    { id: 'activity', name: 'Activity Logs', href: '/organisation/monitoring/activity' },
                    { id: 'security', name: 'Security Events', href: '/organisation/monitoring/security' },
                    { id: 'access', name: 'Data Access', href: '/organisation/monitoring/access' }
                  ]}
                />
                <div className="p-6 mx-6">
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
                  description="Manage API connections and third-party integrations"
                  tabs={[
                    { id: 'api', name: 'API Connections', href: '/organisation/integrations' },
                    { id: 'services', name: 'Third-party Services', href: '/organisation/integrations/services' },
                    { id: 'webhooks', name: 'Webhooks', href: '/organisation/integrations/webhooks' },
                    { id: 'sync', name: 'Data Sync', href: '/organisation/integrations/sync' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Integrations />
                </div>
              </>
            } />
            <Route path="/integrations/services" element={
              <>
                <SectionNav
                  title="Integrations"
                  description="Manage API connections and third-party integrations"
                  tabs={[
                    { id: 'api', name: 'API Connections', href: '/organisation/integrations' },
                    { id: 'services', name: 'Third-party Services', href: '/organisation/integrations/services' },
                    { id: 'webhooks', name: 'Webhooks', href: '/organisation/integrations/webhooks' },
                    { id: 'sync', name: 'Data Sync', href: '/organisation/integrations/sync' }
                  ]}
                />
                <div className="p-6 mx-6">
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

            {/* Trust Score Routes */}
            <Route path="/trust-score" element={
              <>
                <SectionNav
                  title="Trust Score"
                  description="Track and improve your organization's trust score"
                  tabs={[
                    { id: 'overview', name: 'Score Overview', href: '/organisation/trust-score' },
                    { id: 'breakdown', name: 'Score Breakdown', href: '/organisation/trust-score/breakdown' },
                    { id: 'history', name: 'Score History', href: '/organisation/trust-score/history' },
                    { id: 'tips', name: 'Improvement Tips', href: '/organisation/trust-score/tips' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Trust Score Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                        <div className="text-3xl font-bold">850</div>
                        <div className="text-primary-100">Current Score</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="text-2xl font-bold text-gray-900">+25</div>
                        <div className="text-gray-600">This Month</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="text-2xl font-bold text-gray-900">A+</div>
                        <div className="text-gray-600">Grade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            } />
            <Route path="/trust-score/breakdown" element={
              <>
                <SectionNav
                  title="Trust Score"
                  description="Track and improve your organization's trust score"
                  tabs={[
                    { id: 'overview', name: 'Score Overview', href: '/organisation/trust-score' },
                    { id: 'breakdown', name: 'Score Breakdown', href: '/organisation/trust-score/breakdown' },
                    { id: 'history', name: 'Score History', href: '/organisation/trust-score/history' },
                    { id: 'tips', name: 'Improvement Tips', href: '/organisation/trust-score/tips' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Identity Verification</span>
                        <span className="font-semibold">200/200</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Compliance Score</span>
                        <span className="font-semibold">180/200</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Document Verification</span>
                        <span className="font-semibold">170/200</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Activity Score</span>
                        <span className="font-semibold">150/200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            } />
            <Route path="/trust-score/history" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Score History</h2>
                  <p className="text-gray-600">Historical trust score data will be displayed here.</p>
                </div>
              </div>
            } />
            <Route path="/trust-score/tips" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Improvement Tips</h2>
                  <p className="text-gray-600">Tips to improve your trust score will be displayed here.</p>
                </div>
              </div>
            } />

            {/* Financial Routes */}
            <Route path="/wallet" element={
              <>
                <SectionNav
                  title="Financial"
                  description="Manage your organization's financial transactions and billing"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/organisation/wallet' },
                    { id: 'transactions', name: 'Transactions', href: '/organisation/wallet/transactions' },
                    { id: 'billing', name: 'Billing & Invoices', href: '/organisation/billing' },
                    { id: 'payment', name: 'Payment Methods', href: '/organisation/wallet/payment-methods' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Wallet />
                </div>
              </>
            } />
            <Route path="/wallet/transactions" element={
              <>
                <SectionNav
                  title="Financial"
                  description="Manage your organization's financial transactions and billing"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/organisation/wallet' },
                    { id: 'transactions', name: 'Transactions', href: '/organisation/wallet/transactions' },
                    { id: 'billing', name: 'Billing & Invoices', href: '/organisation/billing' },
                    { id: 'payment', name: 'Payment Methods', href: '/organisation/wallet/payment-methods' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Wallet />
                </div>
              </>
            } />
            <Route path="/wallet/payment-methods" element={
              <div className="p-6 mx-6">
                <Wallet />
              </div>
            } />
            <Route path="/billing" element={
              <>
                <SectionNav
                  title="Financial"
                  description="Manage your organization's financial transactions and billing"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/organisation/wallet' },
                    { id: 'transactions', name: 'Transactions', href: '/organisation/wallet/transactions' },
                    { id: 'billing', name: 'Billing & Invoices', href: '/organisation/billing' },
                    { id: 'payment', name: 'Payment Methods', href: '/organisation/wallet/payment-methods' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Billing />
                </div>
              </>
            } />

            {/* Document Management Routes */}
            <Route path="/documents" element={
              <>
                <SectionNav
                  title="Document Management"
                  description="Manage your organization's documents and templates"
                  tabs={[
                    { id: 'vault', name: 'Document Vault', href: '/organisation/documents' },
                    { id: 'templates', name: 'Document Templates', href: '/organisation/documents/templates' },
                    { id: 'permissions', name: 'Access Permissions', href: '/organisation/documents/permissions' },
                    { id: 'analytics', name: 'Document Analytics', href: '/organisation/documents/analytics' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Vault</h2>
                    <p className="text-gray-600">Secure document storage and management for your organization.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/documents/templates" element={
              <>
                <SectionNav
                  title="Document Management"
                  description="Manage your organization's documents and templates"
                  tabs={[
                    { id: 'vault', name: 'Document Vault', href: '/organisation/documents' },
                    { id: 'templates', name: 'Document Templates', href: '/organisation/documents/templates' },
                    { id: 'permissions', name: 'Access Permissions', href: '/organisation/documents/permissions' },
                    { id: 'analytics', name: 'Document Analytics', href: '/organisation/documents/analytics' }
                  ]}
                />
                <div className="p-6 mx-6">
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
              <>
                <SectionNav
                  title="Settings"
                  description="Manage your organization's settings and preferences"
                  tabs={[
                    { id: 'general', name: 'General Settings', href: '/organisation/settings' },
                    { id: 'security', name: 'Security Settings', href: '/organisation/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/organisation/settings/notifications' },
                    { id: 'team', name: 'Team Management', href: '/organisation/settings/team' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Settings />
                </div>
              </>
            } />
            <Route path="/settings/security" element={
              <>
                <SectionNav
                  title="Settings"
                  description="Manage your organization's settings and preferences"
                  tabs={[
                    { id: 'general', name: 'General Settings', href: '/organisation/settings' },
                    { id: 'security', name: 'Security Settings', href: '/organisation/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/organisation/settings/notifications' },
                    { id: 'team', name: 'Team Management', href: '/organisation/settings/team' }
                  ]}
                />
                <div className="p-6 mx-6">
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
