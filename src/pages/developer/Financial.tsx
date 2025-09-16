import React, { useState } from 'react'
import { 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Eye, 
  X, 
  CheckCircle, 
  ArrowRight, 
  Shield,
  Download,
  Printer,
  Copy,
  ExternalLink,
  Search,
  Filter,
  Star,
  Bell,
  Heart,
  Trash2,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  FileText,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  Zap,
  Building,
  Settings
} from 'lucide-react'

const Financial = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'billing' | 'payment-methods'>('overview')

  // Mock data for developer financial dashboard
  const developerStats = {
    totalBalance: 2450000,
    monthlyRevenue: 875000,
    pendingPayouts: 125000,
    totalCustomers: 1247,
    apiCalls: 45678,
    verificationCosts: 234000
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Financial Dashboard</h1>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1">
                <nav className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'overview'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'transactions'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Transactions</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('billing')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'billing'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Billing</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('payment-methods')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      activeTab === 'payment-methods'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
                    }`}
                  >
                    <span>Payment Methods</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="px-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Balance Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-xs font-bold text-white">ID</div>
                      ID Certify Developer Account
                    </div>
                    <div className="text-gray-900 font-semibold text-sm mb-1">TOTAL AVAILABLE BALANCE</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(developerStats.totalBalance)}</div>
                    <div className="text-xs text-gray-500 mb-4">
                      This month you have earned <span className="text-green-600 font-medium">{formatCurrency(developerStats.monthlyRevenue)}</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Funds
                      </button>
                      <button className="border border-primary-600 text-primary-600 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                        <ArrowDownLeft className="h-4 w-4" />
                        Withdraw
                      </button>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(developerStats.monthlyRevenue)}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Customers</p>
                      <p className="text-2xl font-bold text-gray-900">{developerStats.totalCustomers.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">API Calls</p>
                      <p className="text-2xl font-bold text-gray-900">{developerStats.apiCalls.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pending Payouts */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="text-center">
                  <div className="text-xs font-medium mb-2 text-yellow-800">PENDING PAYOUTS</div>
                  <div className="text-2xl font-bold mb-3 text-yellow-900">{formatCurrency(developerStats.pendingPayouts)}</div>
                  <button className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 flex items-center gap-1 mx-auto">
                    Request Payout
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Generate Invoice</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">View Analytics</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Billing Settings</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">All Transactions</h2>
            <p className="text-gray-600">Transaction history will be displayed here.</p>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing & Invoices</h2>
            <p className="text-gray-600">Billing information will be displayed here.</p>
          </div>
        </div>
      )}

      {activeTab === 'payment-methods' && (
        <div className="px-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
            <p className="text-gray-600">Payment methods will be displayed here.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Financial