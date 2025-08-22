import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { User, Mail, Phone, MapPin, Shield, Edit, Save, Search, Plus, CheckCircle, ExternalLink } from 'lucide-react'
import Tabs from '@/components/ui/Tabs'

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'My profile' },
    { id: 'security', label: 'Security' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'branding', label: 'Branding' },
    { id: 'affiliates', label: 'Affiliates' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your details and personal preferences here.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            + Invite
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
            Upgrade
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-600" />
            </div>
            <CheckCircle className="h-4 w-4 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Email Confirmation Banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="h-3 w-3 text-primary-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Please confirm your email to publish your profile
            </p>
            <p className="text-sm text-gray-600 mb-3">
              We sent a 6-digit verification code to {user?.email}. Didn't get the email?
            </p>
            <div className="flex items-center space-x-2 mb-3">
              {[0, 0, 0, 0, 0, 0].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0"
                />
              ))}
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
              Verify email
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">My profile</h2>
        
        <div className="space-y-6">
          {/* Profile URL */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Profile *</label>
              <p className="text-sm text-gray-600">uui.com/florence</p>
            </div>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Edit
            </button>
          </div>

          {/* Photo */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Photo</label>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div className="space-x-2">
                  <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
                  <button className="text-sm text-primary-600 hover:text-primary-700">Upload</button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">This will be displayed on your profile.</p>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Full name *</label>
              <p className="text-sm text-gray-600">Florence Shaw</p>
              <p className="text-xs text-gray-500 mt-1">This will be displayed on your profile.</p>
            </div>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Edit
            </button>
          </div>

          {/* Contact Email */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Contact email *</label>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-600">f.shaw@gmail.com</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">Add at least one contact email.</p>
            </div>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Edit
            </button>
          </div>

          {/* Business Tax ID */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Business tax ID *</label>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-600">65 655 466 729</p>
                <CheckCircle className="h-4 w-4 text-primary-600" />
              </div>
            </div>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Edit
            </button>
          </div>

          {/* Business Address */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Business address *</label>
              <p className="text-sm text-gray-600">100 Smith Street, Collingwood VIC 3066, AUSTRALIA</p>
            </div>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Edit
            </button>
          </div>

          {/* Xero Integration */}
          <div className="flex items-center justify-between py-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Xero integration</label>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-600">hello@untitledui.com</p>
                <CheckCircle className="h-4 w-4 text-primary-600" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Connect your account to Xero.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Manage
              </button>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
