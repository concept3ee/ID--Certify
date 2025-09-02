import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
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

const DeveloperDashboard = () => {
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
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Error Logs</h2>
                  <p className="text-gray-600">Monitor and debug API errors and issues.</p>
                </div>
              </div>
            } />
            <Route path="/analytics/performance" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance</h2>
                  <p className="text-gray-600">Track API response times and performance metrics.</p>
                </div>
              </div>
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
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Tutorials</h2>
                  <p className="text-gray-600">Step-by-step tutorials for common integration scenarios.</p>
                </div>
              </div>
            } />
            <Route path="/docs/best-practices" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h2>
                  <p className="text-gray-600">Learn the best practices for integrating IDCertify API.</p>
                </div>
              </div>
            } />

            {/* Financial Routes */}
            <Route path="/wallet" element={
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
                  <Wallet />
                </div>
              </>
            } />
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
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Costs</h2>
                  <p className="text-gray-600">Track your API usage costs and consumption.</p>
                </div>
              </div>
            } />
            <Route path="/wallet/payment-methods" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
                  <p className="text-gray-600">Manage your payment methods and billing preferences.</p>
                </div>
              </div>
            } />

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
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Page</h2>
                  <p className="text-gray-600">Check the current status of IDCertify services.</p>
                </div>
              </div>
            } />
            <Route path="/support/contact" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Support</h2>
                  <p className="text-gray-600">Get in touch with our technical support team.</p>
                </div>
              </div>
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
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                  <p className="text-gray-600">Configure your notification preferences and alerts.</p>
                </div>
              </div>
            } />
            <Route path="/settings/api" element={
              <div className="p-6 mx-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">API Preferences</h2>
                  <p className="text-gray-600">Configure your API settings and preferences.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default DeveloperDashboard
