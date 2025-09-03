import React, { useState } from 'react'
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  X,
  Search,
  Filter
} from 'lucide-react'

interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'mobile'
  name: string
  number: string
  expiry?: string
  isDefault: boolean
  isVerified: boolean
  lastUsed?: string
}

const PaymentMethods = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      number: '**** **** **** 4242',
      expiry: '12/25',
      isDefault: true,
      isVerified: true,
      lastUsed: '2024-01-20'
    },
    {
      id: '2',
      type: 'bank',
      name: 'GT Bank - 1234567890',
      number: '1234567890',
      isDefault: false,
      isVerified: true,
      lastUsed: '2024-01-15'
    },
    {
      id: '3',
      type: 'mobile',
      name: 'Mobile Money - 08012345678',
      number: '08012345678',
      isDefault: false,
      isVerified: false,
      lastUsed: '2024-01-10'
    }
  ])

  const handleAddPaymentMethod = () => {
    setShowAddModal(true)
  }

  const handleEditPaymentMethod = (method: PaymentMethod) => {
    setSelectedMethod(method)
    setShowEditModal(true)
  }

  const handleDeletePaymentMethod = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id))
    }
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })))
  }

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="h-5 w-5 text-blue-600" />
      case 'bank': return <Shield className="h-5 w-5 text-green-600" />
      case 'mobile': return <CheckCircle className="h-5 w-5 text-purple-600" />
      default: return <CreditCard className="h-5 w-5 text-gray-600" />
    }
  }

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case 'card': return 'bg-blue-100 text-blue-800'
      case 'bank': return 'bg-green-100 text-green-800'
      case 'mobile': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-gray-600">Manage your payment options and billing preferences</p>
        </div>
        <button
          onClick={handleAddPaymentMethod}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Payment Method
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search payment methods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-80"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Secure payment processing</span>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="all">All Types</option>
                <option value="card">Cards</option>
                <option value="bank">Bank Accounts</option>
                <option value="mobile">Mobile Money</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="all">All</option>
                <option value="default">Default Only</option>
                <option value="non-default">Non-Default</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getPaymentIcon(method.type)}
                <div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentTypeColor(method.type)}`}>
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                  </span>
                  {method.isDefault && (
                    <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditPaymentMethod(method)}
                  className="text-blue-600 hover:text-blue-700 p-1"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeletePaymentMethod(method.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-900">{method.name}</h3>
                <p className="text-sm text-gray-500">{method.number}</p>
                {method.expiry && (
                  <p className="text-xs text-gray-400">Expires: {method.expiry}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {method.isVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                  <span className={`text-xs ${method.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                    {method.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Set as Default
                  </button>
                )}
              </div>

              {method.lastUsed && (
                <div className="text-xs text-gray-400">
                  Last used: {new Date(method.lastUsed).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowAddModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Add Payment Method</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Add a new payment method to your wallet
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Account</option>
                  <option value="mobile">Mobile Money</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card/Account Number</label>
                <input
                  type="text"
                  placeholder="Enter card or account number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Add Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentMethods
