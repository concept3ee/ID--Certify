import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { DeveloperUser } from '@/types'
import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import SectionNav from '@/components/ui/SectionNav'
import Dashboard from './Dashboard'
import APIKeys from './APIKeys'
import Documentation from './Documentation'
import Webhooks from './Webhooks'
import Analytics from './Analytics'
import Wallet from './Wallet'
import Settings from './Settings'
import VisualFlowBuilder from '@/components/developer/VisualFlowBuilder'
import TemplateMarketplace from '@/components/developer/TemplateMarketplace'
import CustomerVerificationDashboard from '@/components/developer/CustomerVerificationDashboard'
// import FlowTestingEnvironment from '@/components/developer/FlowTestingEnvironment'
import VerificationTemplates from './VerificationTemplates'
import WhiteLabelingSystem from '@/components/developer/WhiteLabelingSystem'
import MobileSDKIntegration from '@/components/developer/MobileSDKIntegration'
import AdvancedAPIManagement from '@/components/developer/AdvancedAPIManagement'
// import AIPoweredFeatures from '@/components/developer/AIPoweredFeatures'
import MultiTenantManagement from '@/components/developer/MultiTenantManagement'
import EnterpriseSecurity from '@/components/developer/EnterpriseSecurity'
import AdvancedAnalytics from '@/components/developer/AdvancedAnalytics'
import EnterpriseIntegrations from '@/components/developer/EnterpriseIntegrations'
// import WorkflowOrchestration from '@/components/developer/WorkflowOrchestration'
import ComplianceManagement from '@/components/developer/ComplianceManagement'
import CustomerAnalytics from '@/components/developer/CustomerAnalytics'
import CustomerDetails from '@/components/developer/CustomerDetails'
import CustomerMonitoringDashboard from '@/components/developer/CustomerMonitoringDashboard'
import CustomerDetailView from '@/components/developer/CustomerDetailView'
import VerificationAnalytics from '@/components/developer/VerificationAnalytics'
import VerificationCostManagement from '@/components/developer/VerificationCostManagement'
import Financial from './Financial'
import BackgroundCheckAPI from './BackgroundCheckAPI'

const DeveloperDashboard = () => {
  const { userType, user } = useSelector((state: RootState) => state.auth)

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
            
            {/* API Management Routes */}
            <Route path="/api-keys" element={
              <>
                <SectionNav
                  title="API Management"
                  tabs={[
                    { id: 'keys', name: 'API Keys', href: '/developer/api-keys' },
                    { id: 'docs', name: 'API Documentation', href: '/developer/docs' },
                    { id: 'rate-limits', name: 'Rate Limits', href: '/developer/api-keys/rate-limits' },
                    { id: 'testing', name: 'API Testing', href: '/developer/api-keys/testing' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <APIKeys />
                </div>
              </>
            } />
            <Route path="/api-keys/rate-limits" element={
              <>
                <SectionNav
                  title="API Management"
                  tabs={[
                    { id: 'keys', name: 'API Keys', href: '/developer/api-keys' },
                    { id: 'docs', name: 'API Documentation', href: '/developer/docs' },
                    { id: 'rate-limits', name: 'Rate Limits', href: '/developer/api-keys/rate-limits' },
                    { id: 'testing', name: 'API Testing', href: '/developer/api-keys/testing' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Rate Limits</h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900">Free Tier</h3>
                        <p className="text-gray-600">1,000 requests per month</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900">Pro Tier</h3>
                        <p className="text-gray-600">10,000 requests per month</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900">Enterprise Tier</h3>
                        <p className="text-gray-600">Unlimited requests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            } />
            <Route path="/api-keys/testing" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">API Testing</h2>
                  <p className="text-gray-600">Test your API integrations and verify functionality.</p>
                </div>
              </div>
            } />

            {/* Integration Tools Routes */}
            <Route path="/webhooks" element={
              <>
                <SectionNav
                  title="Integration Tools"
                  tabs={[
                    { id: 'webhooks', name: 'Webhooks', href: '/developer/webhooks' },
                    { id: 'sdk', name: 'SDK Downloads', href: '/developer/webhooks/sdk' },
                    { id: 'guides', name: 'Integration Guides', href: '/developer/webhooks/guides' },
                    { id: 'examples', name: 'Code Examples', href: '/developer/webhooks/examples' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Webhooks />
                </div>
              </>
            } />
            <Route path="/webhooks/sdk" element={
              <>
                <SectionNav
                  title="Integration Tools"
                  tabs={[
                    { id: 'webhooks', name: 'Webhooks', href: '/developer/webhooks' },
                    { id: 'sdk', name: 'SDK Downloads', href: '/developer/webhooks/sdk' },
                    { id: 'guides', name: 'Integration Guides', href: '/developer/webhooks/guides' },
                    { id: 'examples', name: 'Code Examples', href: '/developer/webhooks/examples' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">SDK Downloads</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">JavaScript/Node.js</h3>
                        <p className="text-gray-600 text-sm mb-2">Official SDK for JavaScript and Node.js</p>
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm">Download</button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">Python</h3>
                        <p className="text-gray-600 text-sm mb-2">Official SDK for Python</p>
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm">Download</button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">PHP</h3>
                        <p className="text-gray-600 text-sm mb-2">Official SDK for PHP</p>
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm">Download</button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">Java</h3>
                        <p className="text-gray-600 text-sm mb-2">Official SDK for Java</p>
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm">Download</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            } />
            <Route path="/webhooks/guides" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Integration Guides</h2>
                  <p className="text-gray-600">Step-by-step guides for integrating IDCertify into your applications.</p>
                </div>
              </div>
            } />
            <Route path="/webhooks/examples" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Code Examples</h2>
                  <p className="text-gray-600">Ready-to-use code examples for common integration scenarios.</p>
                </div>
              </div>
            } />

            {/* Verification Routes */}
            <Route path="/verification" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'api', name: 'Verification API', href: '/developer/verification' },
                    { id: 'status', name: 'Verification Status', href: '/developer/verification/status' },
                    { id: 'history', name: 'Verification History', href: '/developer/verification/history' },
                    { id: 'test', name: 'Test Environment', href: '/developer/verification/test' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification API</h2>
                    <p className="text-gray-600">Integrate identity verification into your applications using our REST API.</p>
                  </div>
                </div>
              </>
            } />

            {/* Verification Templates Routes */}
            <Route path="/verification-templates" element={
              <>
                <SectionNav
                  title="Verification Flows"
                  tabs={[
                    { id: 'builder', name: 'Flow Builder', href: '/developer/verification-templates' },
                    { id: 'marketplace', name: 'Template Marketplace', href: '/developer/template-marketplace' },
                    { id: 'testing', name: 'Flow Testing', href: '/developer/flow-testing' },
                    { id: 'analytics', name: 'Analytics & Insights', href: '/developer/verification-templates/analytics' },
                    { id: 'costs', name: 'Cost Management', href: '/developer/verification-templates/costs' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <VerificationTemplates user={user as DeveloperUser} />
                </div>
              </>
            } />

            <Route path="/verification-templates/analytics" element={
              <>
                <SectionNav
                  title="Verification Flows"
                  tabs={[
                    { id: 'builder', name: 'Flow Builder', href: '/developer/verification-templates' },
                    { id: 'marketplace', name: 'Template Marketplace', href: '/developer/template-marketplace' },
                    { id: 'testing', name: 'Flow Testing', href: '/developer/flow-testing' },
                    { id: 'analytics', name: 'Analytics & Insights', href: '/developer/verification-templates/analytics' },
                    { id: 'costs', name: 'Cost Management', href: '/developer/verification-templates/costs' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <VerificationAnalytics
                    onExportData={(format) => {
                      console.log('Exporting analytics data in format:', format)
                    }}
                    onViewDetails={(metric) => {
                      console.log('Viewing details for metric:', metric)
                    }}
                    onClose={() => {
                      window.history.back()
                    }}
                  />
                </div>
              </>
            } />

            <Route path="/verification-templates/costs" element={
              <>
                <SectionNav
                  title="Verification Flows"
                  tabs={[
                    { id: 'builder', name: 'Flow Builder', href: '/developer/verification-templates' },
                    { id: 'marketplace', name: 'Template Marketplace', href: '/developer/template-marketplace' },
                    { id: 'testing', name: 'Flow Testing', href: '/developer/flow-testing' },
                    { id: 'analytics', name: 'Analytics & Insights', href: '/developer/verification-templates/analytics' },
                    { id: 'costs', name: 'Cost Management', href: '/developer/verification-templates/costs' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <VerificationCostManagement
                    onExportData={(format) => {
                      console.log('Exporting cost data in format:', format)
                    }}
                    onViewDetails={(metric) => {
                      console.log('Viewing details for metric:', metric)
                    }}
                    onClose={() => {
                      window.history.back()
                    }}
                  />
                </div>
              </>
            } />

            {/* Template Marketplace Route */}
            <Route path="/template-marketplace" element={
              <>
                <SectionNav
                  title="Verification Flows"
                  tabs={[
                    { id: 'builder', name: 'Flow Builder', href: '/developer/verification-templates' },
                    { id: 'marketplace', name: 'Template Marketplace', href: '/developer/template-marketplace' },
                    { id: 'testing', name: 'Flow Testing', href: '/developer/flow-testing' },
                    { id: 'analytics', name: 'Analytics & Insights', href: '/developer/verification-templates/analytics' },
                    { id: 'costs', name: 'Cost Management', href: '/developer/verification-templates/costs' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <TemplateMarketplace
                    onSelectTemplate={(template) => {
                      console.log('Selected template:', template)
                      // In real app, this would open the template in flow builder
                    }}
                    onCreateCustom={() => {
                      // Navigate to flow builder
                      window.location.href = '/developer/verification-templates'
                    }}
                  />
                </div>
              </>
            } />

            <Route path="/customer-verifications" element={
              <>
                <SectionNav
                  title="Customer Management"
                  tabs={[
                    { id: 'dashboard', name: 'Verification Dashboard', href: '/developer/customer-verifications' },
                    { id: 'analytics', name: 'Customer Analytics', href: '/developer/customer-verifications/analytics' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <CustomerMonitoringDashboard
                    onViewCustomer={(customer) => {
                      console.log('Viewing customer details:', customer)
                      // In real app, this would open detailed view
                    }}
                    onBulkAction={(action, customerIds) => {
                      console.log('Bulk action:', action, customerIds)
                      // In real app, this would perform bulk operations
                    }}
                    onExport={(customers) => {
                      console.log('Exporting customers:', customers)
                      // In real app, this would export data
                    }}
                  />
                </div>
              </>
            } />


            <Route path="/customer-verifications/analytics" element={
              <>
                <SectionNav
                  title="Customer Management"
                  tabs={[
                    { id: 'dashboard', name: 'Verification Dashboard', href: '/developer/customer-verifications' },
                    { id: 'analytics', name: 'Customer Analytics', href: '/developer/customer-verifications/analytics' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <CustomerAnalytics
                    onExportData={(format) => {
                      console.log('Exporting data in format:', format)
                      // In real app, this would export analytics data
                    }}
                    onViewDetails={(metric) => {
                      console.log('Viewing details for metric:', metric)
                      // In real app, this would open detailed view
                    }}
                    onClose={() => {
                      window.history.back()
                    }}
                  />
                </div>
              </>
            } />




            <Route path="/customer-verifications/:customerId" element={
              <CustomerDetailView
                onClose={() => {
                  window.history.back()
                }}
                onVerificationAction={(verificationType, action) => {
                  console.log('Verification action:', verificationType, action)
                  // In real app, this would perform verification actions
                }}
              />
            } />

            <Route path="/flow-testing" element={
              <>
                <SectionNav
                  title="Verification Flows"
                  tabs={[
                    { id: 'builder', name: 'Flow Builder', href: '/developer/verification-templates' },
                    { id: 'marketplace', name: 'Template Marketplace', href: '/developer/template-marketplace' },
                    { id: 'testing', name: 'Flow Testing', href: '/developer/flow-testing' },
                    { id: 'analytics', name: 'Analytics & Insights', href: '/developer/verification-templates/analytics' },
                    { id: 'costs', name: 'Cost Management', href: '/developer/verification-templates/costs' }
                  ]}
                />
                {/* <div className="p-6 mx-6">
                  <FlowTestingEnvironment
                    flow={{
                      id: 'test-flow',
                      name: 'Test Flow',
                      nodes: [],
                      connections: []
                    }}
                    onClose={() => {
                      window.history.back()
                    }}
                  />
                </div> */}
              </>
            } />

            {/* Phase 2: Advanced Integration Routes */}
            <Route path="/white-labeling" element={
              <WhiteLabelingSystem
                onSave={(config) => {
                  console.log('Saving branding config:', config)
                  // In real app, this would save to API
                }}
                onPreview={(config) => {
                  console.log('Previewing branding config:', config)
                  // In real app, this would open preview
                }}
                onExport={(config) => {
                  console.log('Exporting branding config:', config)
                  // In real app, this would export config
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />

            <Route path="/mobile-sdk" element={
              <MobileSDKIntegration
                onGenerateCode={(platform, config) => {
                  console.log('Generating code for platform:', platform, config)
                  // In real app, this would generate SDK code
                }}
                onDownloadSDK={(platform) => {
                  console.log('Downloading SDK for platform:', platform)
                  // In real app, this would download SDK
                }}
                onViewDocs={(platform) => {
                  console.log('Viewing docs for platform:', platform)
                  // In real app, this would open documentation
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />

            <Route path="/advanced-api" element={
              <AdvancedAPIManagement
                onTestEndpoint={(endpoint) => {
                  console.log('Testing endpoint:', endpoint)
                  // In real app, this would test the endpoint
                }}
                onGenerateSDK={(platform) => {
                  console.log('Generating SDK for platform:', platform)
                  // In real app, this would generate SDK
                }}
                onViewDocs={(endpoint) => {
                  console.log('Viewing docs for endpoint:', endpoint)
                  // In real app, this would open documentation
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />

            {/* <Route path="/ai-features" element={
              <AIPoweredFeatures
                onConfigureFeature={(feature) => {
                  console.log('Configuring AI feature:', feature)
                  // In real app, this would open configuration
                }}
                onTestFeature={(feature) => {
                  console.log('Testing AI feature:', feature)
                  // In real app, this would test the feature
                }}
                onViewAnalytics={(feature) => {
                  console.log('Viewing analytics for feature:', feature)
                  // In real app, this would open analytics
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } /> */}

            {/* Phase 3: Enterprise Features Routes */}
            <Route path="/multi-tenant" element={
              <MultiTenantManagement
                onManageTenant={(tenant) => {
                  console.log('Managing tenant:', tenant)
                  // In real app, this would open tenant management
                }}
                onCreateTenant={() => {
                  console.log('Creating new tenant')
                  // In real app, this would open tenant creation
                }}
                onViewAnalytics={(tenant) => {
                  console.log('Viewing tenant analytics:', tenant)
                  // In real app, this would open tenant analytics
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />

            <Route path="/enterprise-security" element={
              <EnterpriseSecurity
                onConfigureSSO={(provider) => {
                  console.log('Configuring SSO provider:', provider)
                  // In real app, this would open SSO configuration
                }}
                onManageRoles={(role) => {
                  console.log('Managing role:', role)
                  // In real app, this would open role management
                }}
                onViewAuditLogs={() => {
                  console.log('Viewing audit logs')
                  // In real app, this would open audit logs
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />

            <Route path="/advanced-analytics" element={
              <AdvancedAnalytics
                onCreateReport={() => {
                  console.log('Creating new report')
                  // In real app, this would open report creation
                }}
                onExportData={(format) => {
                  console.log('Exporting data in format:', format)
                  // In real app, this would export data
                }}
                onShareDashboard={(dashboard) => {
                  console.log('Sharing dashboard:', dashboard)
                  // In real app, this would share dashboard
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />

            {/* Phase 4: Advanced Enterprise Features Routes */}
            <Route path="/enterprise-integrations" element={
              <EnterpriseIntegrations
                onConfigureIntegration={(integration) => {
                  console.log('Configuring integration:', integration)
                  // In real app, this would open integration configuration
                }}
                onTestIntegration={(integration) => {
                  console.log('Testing integration:', integration)
                  // In real app, this would test the integration
                }}
                onViewLogs={(integration) => {
                  console.log('Viewing integration logs:', integration)
                  // In real app, this would open integration logs
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />

            {/* <Route path="/workflow-orchestration" element={
              <WorkflowOrchestration
                onCreateWorkflow={() => {
                  console.log('Creating new workflow')
                  // In real app, this would open workflow builder
                }}
                onEditWorkflow={(workflow) => {
                  console.log('Editing workflow:', workflow)
                  // In real app, this would open workflow editor
                }}
                onExecuteWorkflow={(workflow) => {
                  console.log('Executing workflow:', workflow)
                  // In real app, this would execute the workflow
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } /> */}

            <Route path="/compliance-management" element={
              <ComplianceManagement
                onCreateReport={() => {
                  console.log('Creating compliance report')
                  // In real app, this would open report creation
                }}
                onScheduleAudit={() => {
                  console.log('Scheduling audit')
                  // In real app, this would open audit scheduling
                }}
                onViewFramework={(framework) => {
                  console.log('Viewing framework:', framework)
                  // In real app, this would open framework details
                }}
                onClose={() => {
                  window.history.back()
                }}
              />
            } />
            <Route path="/verification/status" element={
              <>
                <SectionNav
                  title="Verification"
                  tabs={[
                    { id: 'api', name: 'Verification API', href: '/developer/verification' },
                    { id: 'status', name: 'Verification Status', href: '/developer/verification/status' },
                    { id: 'history', name: 'Verification History', href: '/developer/verification/history' },
                    { id: 'test', name: 'Test Environment', href: '/developer/verification/test' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Status</h2>
                    <p className="text-gray-600">Check the status of verification requests and track their progress.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/verification/history" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification History</h2>
                  <p className="text-gray-600">View historical verification data and analytics.</p>
                </div>
              </div>
            } />
            <Route path="/verification/test" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Environment</h2>
                  <p className="text-gray-600">Test your verification integrations in a sandbox environment.</p>
                </div>
              </div>
            } />

            {/* Analytics & Monitoring Routes */}
            <Route path="/analytics" element={
              <>
                <SectionNav
                  title="Analytics & Monitoring"
                  tabs={[
                    { id: 'analytics', name: 'API Analytics', href: '/developer/analytics' },
                    { id: 'usage', name: 'Usage Metrics', href: '/developer/analytics/usage' },
                    { id: 'errors', name: 'Error Logs', href: '/developer/analytics/errors' },
                    { id: 'performance', name: 'Performance', href: '/developer/analytics/performance' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Analytics />
                </div>
              </>
            } />
            <Route path="/analytics/usage" element={
              <>
                <SectionNav
                  title="Analytics & Monitoring"
                  tabs={[
                    { id: 'analytics', name: 'API Analytics', href: '/developer/analytics' },
                    { id: 'usage', name: 'Usage Metrics', href: '/developer/analytics/usage' },
                    { id: 'errors', name: 'Error Logs', href: '/developer/analytics/errors' },
                    { id: 'performance', name: 'Performance', href: '/developer/analytics/performance' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Metrics</h2>
                    <p className="text-gray-600">Detailed metrics on your API usage patterns and consumption.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/analytics/errors" element={
              <>
                <SectionNav
                  title="Analytics & Monitoring"
                  tabs={[
                    { id: 'analytics', name: 'API Analytics', href: '/developer/analytics' },
                    { id: 'usage', name: 'Usage Metrics', href: '/developer/analytics/usage' },
                    { id: 'errors', name: 'Error Logs', href: '/developer/analytics/errors' },
                    { id: 'performance', name: 'Performance', href: '/developer/analytics/performance' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Error Logs</h2>
                    <p className="text-gray-600">Monitor and debug API errors and issues.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/analytics/performance" element={
              <>
                <SectionNav
                  title="Analytics & Monitoring"
                  tabs={[
                    { id: 'analytics', name: 'API Analytics', href: '/developer/analytics' },
                    { id: 'usage', name: 'Usage Metrics', href: '/developer/analytics/usage' },
                    { id: 'errors', name: 'Error Logs', href: '/developer/analytics/errors' },
                    { id: 'performance', name: 'Performance', href: '/developer/analytics/performance' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance</h2>
                    <p className="text-gray-600">Track API response times and performance metrics.</p>
                  </div>
                </div>
              </>
            } />

            <Route path="/analytics/realtime" element={
              <>
                <SectionNav
                  title="Analytics & Monitoring"
                  tabs={[
                    { id: 'analytics', name: 'API Analytics', href: '/developer/analytics' },
                    { id: 'usage', name: 'Usage Metrics', href: '/developer/analytics/usage' },
                    { id: 'errors', name: 'Error Logs', href: '/developer/analytics/errors' },
                    { id: 'performance', name: 'Performance', href: '/developer/analytics/performance' },
                    { id: 'realtime', name: 'Real-time Monitoring', href: '/developer/analytics/realtime' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-time Monitoring</h2>
                    <p className="text-gray-600">Live monitoring of API performance and usage.</p>
                  </div>
                </div>
              </>
            } />

            {/* Documentation Routes */}
            <Route path="/docs" element={
              <>
                <SectionNav
                  title="Documentation"
                  tabs={[
                    { id: 'reference', name: 'API Reference', href: '/developer/docs' },
                    { id: 'quickstart', name: 'Quick Start', href: '/developer/docs/quickstart' },
                    { id: 'tutorials', name: 'Tutorials', href: '/developer/docs/tutorials' },
                    { id: 'best-practices', name: 'Best Practices', href: '/developer/docs/best-practices' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <Documentation />
                </div>
              </>
            } />
            <Route path="/docs/quickstart" element={
              <>
                <SectionNav
                  title="Documentation"
                  tabs={[
                    { id: 'reference', name: 'API Reference', href: '/developer/docs' },
                    { id: 'quickstart', name: 'Quick Start', href: '/developer/docs/quickstart' },
                    { id: 'tutorials', name: 'Tutorials', href: '/developer/docs/tutorials' },
                    { id: 'best-practices', name: 'Best Practices', href: '/developer/docs/best-practices' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start Guide</h2>
                    <p className="text-gray-600">Get up and running with IDCertify API in minutes.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/docs/tutorials" element={
              <>
                <SectionNav
                  title="Documentation"
                  tabs={[
                    { id: 'reference', name: 'API Reference', href: '/developer/docs' },
                    { id: 'quickstart', name: 'Quick Start', href: '/developer/docs/quickstart' },
                    { id: 'tutorials', name: 'Tutorials', href: '/developer/docs/tutorials' },
                    { id: 'best-practices', name: 'Best Practices', href: '/developer/docs/best-practices' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Tutorials</h2>
                    <p className="text-gray-600">Step-by-step tutorials for common integration scenarios.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/docs/best-practices" element={
              <>
                <SectionNav
                  title="Documentation"
                  tabs={[
                    { id: 'reference', name: 'API Reference', href: '/developer/docs' },
                    { id: 'quickstart', name: 'Quick Start', href: '/developer/docs/quickstart' },
                    { id: 'tutorials', name: 'Tutorials', href: '/developer/docs/tutorials' },
                    { id: 'best-practices', name: 'Best Practices', href: '/developer/docs/best-practices' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h2>
                    <p className="text-gray-600">Learn the best practices for integrating IDCertify API.</p>
                  </div>
                </div>
              </>
            } />

            {/* Financial Routes */}
            <Route path="/wallet" element={<Financial />} />
            <Route path="/wallet/billing" element={
              <>
                <SectionNav
                  title="Financial"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/developer/wallet' },
                    { id: 'billing', name: 'Billing History', href: '/developer/wallet/billing' },
                    { id: 'usage', name: 'Usage Costs', href: '/developer/wallet/usage' },
                    { id: 'payment', name: 'Payment Methods', href: '/developer/wallet/payment-methods' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing History</h2>
                    <p className="text-gray-600">View your billing history and download invoices.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/wallet/usage" element={
              <>
                <SectionNav
                  title="Financial"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/developer/wallet' },
                    { id: 'billing', name: 'Billing History', href: '/developer/wallet/billing' },
                    { id: 'usage', name: 'Usage Costs', href: '/developer/wallet/usage' },
                    { id: 'payment', name: 'Payment Methods', href: '/developer/wallet/payment-methods' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Costs</h2>
                    <p className="text-gray-600">Track your API usage costs and consumption.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/wallet/payment-methods" element={
              <>
                <SectionNav
                  title="Financial"
                  tabs={[
                    { id: 'balance', name: 'Wallet Balance', href: '/developer/wallet' },
                    { id: 'billing', name: 'Billing History', href: '/developer/wallet/billing' },
                    { id: 'usage', name: 'Usage Costs', href: '/developer/wallet/usage' },
                    { id: 'payment', name: 'Payment Methods', href: '/developer/wallet/payment-methods' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
                    <p className="text-gray-600">Manage your payment methods and billing preferences.</p>
                  </div>
                </div>
              </>
            } />

            {/* Background Check API Route */}
            <Route path="/background-check" element={<BackgroundCheckAPI />} />

            {/* Support & Community Routes */}
            <Route path="/support" element={
              <>
                <SectionNav
                  title="Support & Community"
                  tabs={[
                    { id: 'support', name: 'Developer Support', href: '/developer/support' },
                    { id: 'forum', name: 'Community Forum', href: '/developer/support/forum' },
                    { id: 'status', name: 'Status Page', href: '/developer/support/status' },
                    { id: 'contact', name: 'Contact Support', href: '/developer/support/contact' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Developer Support</h2>
                    <p className="text-gray-600">Get help with your integration and technical questions.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/support/forum" element={
              <>
                <SectionNav
                  title="Support & Community"
                  tabs={[
                    { id: 'support', name: 'Developer Support', href: '/developer/support' },
                    { id: 'forum', name: 'Community Forum', href: '/developer/support/forum' },
                    { id: 'status', name: 'Status Page', href: '/developer/support/status' },
                    { id: 'contact', name: 'Contact Support', href: '/developer/support/contact' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Forum</h2>
                    <p className="text-gray-600">Connect with other developers and share knowledge.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/support/status" element={
              <>
                <SectionNav
                  title="Support & Community"
                  tabs={[
                    { id: 'contact', name: 'Contact Support', href: '/developer/support' },
                    { id: 'forum', name: 'Community Forum', href: '/developer/support/forum' },
                    { id: 'faq', name: 'FAQs', href: '/developer/support/faq' },
                    { id: 'status', name: 'Status Page', href: '/developer/support/status' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Page</h2>
                    <p className="text-gray-600">Check the current status of IDCertify services.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/support/contact" element={
              <>
                <SectionNav
                  title="Support & Community"
                  tabs={[
                    { id: 'contact', name: 'Contact Support', href: '/developer/support' },
                    { id: 'forum', name: 'Community Forum', href: '/developer/support/forum' },
                    { id: 'faq', name: 'FAQs', href: '/developer/support/faq' },
                    { id: 'status', name: 'Status Page', href: '/developer/support/status' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Support</h2>
                    <p className="text-gray-600">Get in touch with our technical support team.</p>
                  </div>
                </div>
              </>
            } />

            {/* Settings Routes */}
            <Route path="/settings" element={
              <>
                <SectionNav
                  title="Settings"
                  tabs={[
                    { id: 'account', name: 'Account Settings', href: '/developer/settings' },
                    { id: 'security', name: 'Security Settings', href: '/developer/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/developer/settings/notifications' },
                    { id: 'api', name: 'API Preferences', href: '/developer/settings/api' }
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
                  tabs={[
                    { id: 'account', name: 'Account Settings', href: '/developer/settings' },
                    { id: 'security', name: 'Security Settings', href: '/developer/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/developer/settings/notifications' },
                    { id: 'api', name: 'API Preferences', href: '/developer/settings/api' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
                    <p className="text-gray-600">Manage your account security and authentication settings.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/settings/notifications" element={
              <>
                <SectionNav
                  title="Settings"
                  tabs={[
                    { id: 'account', name: 'Account Settings', href: '/developer/settings' },
                    { id: 'security', name: 'Security Settings', href: '/developer/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/developer/settings/notifications' },
                    { id: 'api', name: 'API Preferences', href: '/developer/settings/api' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                    <p className="text-gray-600">Configure your notification preferences and alerts.</p>
                  </div>
                </div>
              </>
            } />
            <Route path="/settings/api" element={
              <>
                <SectionNav
                  title="Settings"
                  tabs={[
                    { id: 'account', name: 'Account Settings', href: '/developer/settings' },
                    { id: 'security', name: 'Security Settings', href: '/developer/settings/security' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/developer/settings/notifications' },
                    { id: 'api', name: 'API Preferences', href: '/developer/settings/api' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">API Preferences</h2>
                    <p className="text-gray-600">Configure your API settings and preferences.</p>
                  </div>
                </div>
              </>
            } />

            <Route path="/support/faq" element={
              <>
                <SectionNav
                  title="Support & Community"
                  tabs={[
                    { id: 'contact', name: 'Contact Support', href: '/developer/support' },
                    { id: 'forum', name: 'Community Forum', href: '/developer/support/forum' },
                    { id: 'faq', name: 'FAQs', href: '/developer/support/faq' },
                    { id: 'status', name: 'Status Page', href: '/developer/support/status' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">Find answers to common questions about IDCertify API.</p>
                  </div>
                </div>
              </>
            } />

            <Route path="/settings/team" element={
              <>
                <SectionNav
                  title="Settings"
                  tabs={[
                    { id: 'account', name: 'Account Settings', href: '/developer/settings' },
                    { id: 'security', name: 'Security Settings', href: '/developer/settings/security' },
                    { id: 'team', name: 'Team Management', href: '/developer/settings/team' },
                    { id: 'notifications', name: 'Notification Preferences', href: '/developer/settings/notifications' },
                    { id: 'api', name: 'API Preferences', href: '/developer/settings/api' }
                  ]}
                />
                <div className="p-6 mx-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Management</h2>
                    <p className="text-gray-600">Manage team members and their access permissions.</p>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default DeveloperDashboard
