import React, { useState } from 'react'
import { 
  CreditCard, 
  FileText, 
  Download, 
  Printer, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  X,
  DollarSign,
  Calendar,
  Receipt,
  Building
} from 'lucide-react'

interface BillingMethod {
  id: string
  type: 'card' | 'bank' | 'paypal'
  name: string
  number: string
  isDefault: boolean
  isActive: boolean
  expiry?: string
}

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  status: 'paid' | 'pending' | 'overdue' | 'cancelled'
  dueDate: string
  issueDate: string
  description: string
}

interface BillingPlan {
  id: string
  name: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  features: string[]
  isCurrent: boolean
}

const BillingSettings = () => {
  const [billingMethods, setBillingMethods] = useState<BillingMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      number: '**** **** **** 4242',
      isDefault: true,
      isActive: true,
      expiry: '12/25'
    },
    {
      id: '2',
      type: 'bank',
      name: 'GT Bank - 1234567890',
      number: '1234567890',
      isDefault: false,
      isActive: true
    }
  ])

  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      amount: 87500,
      status: 'paid',
      dueDate: '2024-01-15',
      issueDate: '2024-01-01',
      description: 'ID Certify Plus Membership - Annual'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      amount: 25000,
      status: 'pending',
      dueDate: '2024-01-30',
      issueDate: '2024-01-15',
      description: 'Background Check Service'
    }
  ])

  const [billingPlans] = useState<BillingPlan[]>([
    {
      id: '1',
      name: 'Basic Plan',
      price: 5000,
      billingCycle: 'monthly',
      features: ['Basic verification', 'Document storage', 'Email support'],
      isCurrent: false
    },
    {
      id: '2',
      name: 'Plus Plan',
      price: 87500,
      billingCycle: 'yearly',
      features: ['Advanced verification', 'Priority support', 'Analytics', 'API access'],
      isCurrent: true
    },
    {
      id: '3',
      name: 'Enterprise Plan',
      price: 250000,
      billingCycle: 'yearly',
      features: ['Custom verification', 'Dedicated support', 'Advanced analytics', 'White-label options'],
      isCurrent: false
    }
  ])

  const [showAddBillingMethod, setShowAddBillingMethod] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleAddBillingMethod = () => {
    setShowAddBillingMethod(true)
  }

  const handleSetDefault = (id: string) => {
    setBillingMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })))
  }

  const handleRemoveBillingMethod = (id: string) => {
    if (window.confirm('Are you sure you want to remove this billing method?')) {
      setBillingMethods(prev => prev.filter(method => method.id !== id))
    }
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    alert(`Downloading invoice ${invoice.invoiceNumber}`)
  }

  const handlePrintInvoice = (invoice: Invoice) => {
    alert(`Printing invoice ${invoice.invoiceNumber}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Settings</h1>
          <p className="text-gray-600">Manage your billing methods, plans, and invoices</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddBillingMethod}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Billing Method
          </button>
        </div>
      </div>

      {/* Billing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Plan</p>
              <p className="text-2xl font-bold text-blue-600">Plus Plan</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Billing</p>
              <p className="text-2xl font-bold text-green-600">Jan 1, 2025</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-bold text-purple-600">₦7,292</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Receipt className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
          <p className="text-sm text-gray-600">Your active subscription and billing details</p>
        </div>
        
        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Plus Plan</h3>
                <p className="text-gray-600">Annual billing cycle</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(87500)}</p>
                <p className="text-sm text-gray-500">per year</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Features included:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Advanced verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Analytics dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    API access
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Billing details:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Next billing date:</span>
                    <span className="font-medium">January 1, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing cycle:</span>
                    <span className="font-medium">Annual</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-renewal:</span>
                    <span className="font-medium text-green-600">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Change Plan
              </button>
              <button className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Methods */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Billing Methods</h2>
          <p className="text-sm text-gray-600">Manage your payment methods for automatic billing</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {billingMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {method.type === 'card' && <CreditCard className="h-5 w-5 text-blue-600" />}
                    {method.type === 'bank' && <Building className="h-5 w-5 text-green-600" />}
                    {method.type === 'paypal' && <DollarSign className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-500">{method.number}</p>
                    {method.expiry && (
                      <p className="text-xs text-gray-400">Expires: {method.expiry}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {method.isDefault ? (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Set as Default
                    </button>
                  )}
                  
                  <button className="text-gray-600 hover:text-gray-700 p-1">
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleRemoveBillingMethod(method.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
          <p className="text-sm text-gray-600">View and manage your billing history</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                        <div className="text-sm text-gray-500">{invoice.description}</div>
                        <div className="text-xs text-gray-400">{formatDate(invoice.issueDate)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(invoice.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDownloadInvoice(invoice)}
                          className="text-blue-600 hover:text-blue-700 p-1"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePrintInvoice(invoice)}
                          className="text-gray-600 hover:text-gray-700 p-1"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Invoices
            </button>
          </div>
        </div>
      </div>

      {/* Add Billing Method Modal */}
      {showAddBillingMethod && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowAddBillingMethod(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Add Billing Method</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Add a new payment method for automatic billing
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Account</option>
                  <option value="paypal">PayPal</option>
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
                onClick={() => setShowAddBillingMethod(false)}
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

export default BillingSettings
