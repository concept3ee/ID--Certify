import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import SecuritySettings from './SecuritySettings'
import NotificationPreferences from './NotificationPreferences'
import PrivacySettings from './PrivacySettings'
import BillingSettings from './BillingSettings'
import Integrations from './Integrations'
import Branding from './Branding'
import Affiliates from './Affiliates'
import RewardsAndPoints from './RewardsAndPoints'
import Referral from './Referral'

import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Settings as SettingsIcon,
  Palette,
  Users,
  Camera,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Upload,
  Key,
  Lock,
  Unlock,
  Smartphone,
  Mail,
  Globe,
  Building
} from 'lucide-react'

interface Tab {
  id: string
  label: string
}

const Settings = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState('profile')
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const tabs: Tab[] = [
    { id: 'profile', label: 'My profile' },
    { id: 'security', label: 'Security' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'rewards', label: 'Rewards & Points' },
    { id: 'referral', label: 'Referral' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'branding', label: 'Branding' },
    { id: 'affiliates', label: 'Affiliates' }
  ]

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Email Confirmation Banner */}
      {showEmailConfirmation && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">Email Confirmation Required</h4>
              <p className="text-sm text-yellow-800 mb-3">
                Please confirm your email address to access all features and receive important notifications.
              </p>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Enter OTP code"
                  className="px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                />
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm">
                  Verify email
                </button>
                <button
                  onClick={() => setShowEmailConfirmation(false)}
                  className="text-yellow-600 hover:text-yellow-700 text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile URL</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                defaultValue="idcertify.com/profile/john-doe"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary-600" />
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 text-sm">
                  <Camera className="h-4 w-4 inline mr-1" />
                  Upload
                </button>
                <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                defaultValue={user?.name || 'John Doe'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact email</label>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                defaultValue={user?.email || 'john.doe@email.com'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Business Tax ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business tax ID</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter business tax ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Business Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business address</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter business address"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Xero Integration */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Xero integration</label>
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div className="flex items-center space-x-3">
                <Building className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Xero Accounting</p>
                  <p className="text-sm text-gray-500">Connect your Xero account for automated billing</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecurityTab = () => <SecuritySettings />

  const renderBillingTab = () => <BillingSettings />

  const renderNotificationsTab = () => <NotificationPreferences />

  const renderPrivacyTab = () => <PrivacySettings />

  const renderRewardsTab = () => <RewardsAndPoints />

  const renderReferralTab = () => <Referral />

  const renderIntegrationsTab = () => <Integrations />

  const renderBrandingTab = () => <Branding />

  const renderAffiliatesTab = () => <Affiliates />

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'security':
        return renderSecurityTab()
      case 'billing':
        return renderBillingTab()
      case 'notifications':
        return renderNotificationsTab()
      case 'privacy':
        return renderPrivacyTab()
      case 'rewards':
        return renderRewardsTab()
      case 'referral':
        return renderReferralTab()
      case 'integrations':
        return renderIntegrationsTab()
      case 'branding':
        return renderBrandingTab()
      case 'affiliates':
        return renderAffiliatesTab()
      default:
        return renderProfileTab()
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Section Header Row - Title, Centered Navigation, and Action Button */}
          <div className="flex items-center">
            {/* Left Side - Title Only */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-white text-gray-900 shadow-sm font-bold'
                          : 'text-gray-500 hover:text-gray-700 font-medium'
                      }`}
                    >
                      <span>{tab.label}</span>
          </button>
                  ))}
                </nav>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6">
      {renderTabContent()}
      </div>
    </div>
  )
}

export default Settings
