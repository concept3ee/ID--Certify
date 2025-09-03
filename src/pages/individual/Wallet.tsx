import { useState } from 'react'

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
  AlertCircle
} from 'lucide-react'

const Wallet = () => {
  const [isLinked, setIsLinked] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState<'none' | 'error' | 'success'>('none')
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'activities'>('overview')
  
  // Fund Wallet Modal
  const [showFundWallet, setShowFundWallet] = useState(false)
  
  // Withdraw Modal
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [withdrawStep, setWithdrawStep] = useState<'form' | 'review' | 'success'>('form')
  const [withdrawData, setWithdrawData] = useState({
    accountNumber: '',
    bankName: '',
    amount: '',
    description: ''
  })
  
  // Transaction Details Modal
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')
  const [selectedAmountRange, setSelectedAmountRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Favorites
  const [showFavorites, setShowFavorites] = useState(false)
  const [favoriteAccounts, setFavoriteAccounts] = useState([
    { id: 1, name: 'Okonye Tochi', accountNumber: '1234567890', bankName: 'Surebanker' },
    { id: 2, name: 'John Doe', accountNumber: '0987654321', bankName: 'GT Bank' },
    { id: 3, name: 'Jane Smith', accountNumber: '1122334455', bankName: 'Access Bank' }
  ])
  
  // Notifications
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Payment received: ₦87,500', time: '2 min ago', read: false },
    { id: 2, type: 'info', message: 'New transaction: Background check payment', time: '1 hour ago', read: false },
    { id: 3, type: 'warning', message: 'Low balance alert: ₦5,000 remaining', time: '3 hours ago', read: true },
    { id: 4, type: 'success', message: 'Withdrawal successful: ₦34,000', time: '1 day ago', read: true }
  ])

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 87500,
      description: 'ID Certify Plus membership',
      category: 'Subscription',
      date: 'Today, Aug 20',
      status: 'completed',
    },
    {
      id: 2,
      type: 'credit',
      amount: 87500,
      description: 'Top-up from Okonye Tochi(Surebanker)',
      category: 'Withdrawal',
      date: 'Today, Aug 20',
      status: 'completed',
    },
    {
      id: 3,
      type: 'credit',
      amount: 87500,
      description: 'Top-up from Okonye Tochi(Surebanker)',
      category: 'Withdrawal',
      date: 'Today, Aug 20',
      status: 'completed',
    },
    {
      id: 4,
      type: 'debit',
      amount: 7500,
      description: 'Paid for Background checks',
      category: 'Background',
      date: 'Today, Aug 20',
      status: 'completed',
    },
    {
      id: 5,
      type: 'debit',
      amount: 3400,
      description: 'Withdrawal from available balance',
      category: 'Withdrawal',
      date: 'Yesterday, Aug 19',
      status: 'completed',
    },
    {
      id: 6,
      type: 'credit',
      amount: 87500,
      description: 'Withdrawal from available balance',
      category: 'Withdrawal',
      date: 'Yesterday, Aug 19',
      status: 'completed',
    },
    {
      id: 7,
      type: 'credit',
      amount: 87500,
      description: 'Withdrawal from available balance',
      category: 'Withdrawal',
      date: 'Yesterday, Aug 19',
      status: 'completed',
    },
  ]

  const ecosystemServices = [
    { name: 'Jobs Pro', isNew: true },
    { name: 'Sure Banker' },
    { name: 'Sure Savings' },
    { name: 'Sure Escrow' },
  ]

  const handleChangeOtp = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[idx] = value
    setOtp(next)
    setOtpError('none')
    const input = document.getElementById(`otp-${idx}`) as HTMLInputElement | null
    if (value && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`) as HTMLInputElement | null
      nextInput?.focus()
    }
    if (!value && idx > 0) input?.blur()
  }

  const handleLink = () => {
    // Demo validate: all digits non-empty
    if (otp.every((d) => d !== '')) {
      setOtpError('success')
      setTimeout(() => {
        setShowOtp(false)
        setShowSuccess(true)
        setIsLinked(true)
      }, 500)
    } else {
      setOtpError('error')
    }
  }

  // Fund Wallet handlers
  const handleFundWallet = () => {
    setShowFundWallet(true)
  }

  const handleCopyBankDetails = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Withdraw handlers
  const handleWithdraw = () => {
    setShowWithdraw(true)
    setWithdrawStep('form')
  }

  const handleWithdrawNext = () => {
    if (withdrawData.accountNumber && withdrawData.amount) {
      setWithdrawStep('review')
    }
  }

  const handleWithdrawConfirm = () => {
    setWithdrawStep('success')
    setTimeout(() => {
      setShowWithdraw(false)
      setWithdrawStep('form')
      setWithdrawData({ accountNumber: '', bankName: '', amount: '', description: '' })
    }, 3000)
  }

  const handleWithdrawBack = () => {
    setWithdrawStep('form')
  }

  // Transaction Details handlers
  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowTransactionDetails(true)
  }

  const handleDownloadReceipt = () => {
    // Simulate download
    alert('Receipt downloaded!')
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  const handleShareTransaction = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Transaction Details',
          text: `Transaction: ${selectedTransaction?.description} - ₦${selectedTransaction?.amount.toLocaleString()}`
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(`Transaction: ${selectedTransaction?.description} - ₦${selectedTransaction?.amount.toLocaleString()}`)
      alert('Transaction details copied to clipboard!')
    }
  }

  // Favorites handlers
  const handleAddToFavorites = (account: any) => {
    if (!favoriteAccounts.find(fav => fav.accountNumber === account.accountNumber)) {
      setFavoriteAccounts([...favoriteAccounts, account])
    }
  }

  const handleRemoveFromFavorites = (accountId: number) => {
    setFavoriteAccounts(favoriteAccounts.filter(fav => fav.id !== accountId))
  }

  // Notifications handlers
  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const handleClearAllNotifications = () => {
    setNotifications([])
  }

  // Export handlers
  const handleExportTransactions = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Description,Category,Amount,Status\n" +
      transactions.map(tx => 
        `${tx.date},${tx.description},${tx.category},₦${tx.amount.toLocaleString()},${tx.status}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "wallet_transactions.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const groupedTransactions = transactions.reduce((groups, tx) => {
    if (!groups[tx.date]) {
      groups[tx.date] = []
    }
    groups[tx.date].push(tx)
    return groups
  }, {} as Record<string, typeof transactions>)

  // Filter transactions based on search and filters
  const getFilteredTransactions = () => {
    let filtered = transactions

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(tx => 
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.amount.toString().includes(searchQuery)
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tx => tx.category === selectedCategory)
    }

    // Date range filter
    if (selectedDateRange !== 'all') {
      switch (selectedDateRange) {
        case 'today':
          filtered = filtered.filter(tx => tx.date.includes('Today'))
          break
        case 'yesterday':
          filtered = filtered.filter(tx => tx.date.includes('Yesterday'))
          break
        case 'week':
          // Filter for last 7 days (simplified)
          filtered = filtered.filter(tx => 
            tx.date.includes('Today') || tx.date.includes('Yesterday') || 
            tx.date.includes('Aug 18') || tx.date.includes('Aug 17') ||
            tx.date.includes('Aug 16') || tx.date.includes('Aug 15') ||
            tx.date.includes('Aug 14')
          )
          break
        case 'month':
          // Filter for current month (simplified)
          filtered = filtered.filter(tx => tx.date.includes('Aug'))
          break
      }
    }

    // Amount range filter
    if (selectedAmountRange !== 'all') {
      switch (selectedAmountRange) {
        case 'small':
          filtered = filtered.filter(tx => tx.amount < 10000)
          break
        case 'medium':
          filtered = filtered.filter(tx => tx.amount >= 10000 && tx.amount < 100000)
          break
        case 'large':
          filtered = filtered.filter(tx => tx.amount >= 100000)
          break
      }
    }

    return filtered
  }

  const filteredTransactions = getFilteredTransactions()
  const groupedFilteredTransactions = filteredTransactions.reduce((groups, tx) => {
    if (!groups[tx.date]) {
      groups[tx.date] = []
    }
    groups[tx.date].push(tx)
    return groups
  }, {} as Record<string, typeof transactions>)

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Section Header Row - Title, Centered Navigation, and Action Button */}
          <div className="flex items-center">
            {/* Left Side - Title Only */}
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
      </div>

            {/* Center - Navigation Tabs with Trust Score Styling */}
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
          onClick={() => setActiveTab('activities')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'activities'
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-700 font-medium'
          }`}
        >
                    <span>Activities</span>
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
            {/* Pre-linked banner */}
            {!isLinked && (
              <div className="bg-gradient-to-r from-[#7a0b0f] to-[#6a0a0e] text-white rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-xs font-bold text-white">SB</div>
                    Powered by SureBanker
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect to Surebanker</h3>
                  <p className="text-white/80 text-sm max-w-2xl mb-4">
                    Link your ID Certify account to SureBanker and unlock a wide range of financial services tailored to your needs!
                  </p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowOtp(true)} 
                      className="bg-white text-[#7a0b0f] px-4 py-2 rounded-md text-sm font-medium hover:bg-white/90 flex items-center gap-2"
                    >
                      Link Wallet
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="border border-white/40 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                      Create SureBanker Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Linked view */}
            {isLinked && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-xs font-bold text-white">SB</div>
                      Powered by SureBanker
                    </div>
                    <div className="text-gray-900 font-semibold text-sm mb-1">TOTAL AVAILABLE BALANCE</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">₦875,000.00</div>
                    <div className="text-xs text-gray-500 mb-4">
                      In the last 24days you have received <span className="text-green-600 font-medium">NGN 3,000,000</span>
                    </div>
                    <div className="flex gap-3">
                        <button 
                          onClick={handleFundWallet}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                        >
                        <Plus className="h-4 w-4" />
                        Top up
                      </button>
                        <button 
                          onClick={handleWithdraw}
                          className="border border-primary-600 text-primary-600 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                        >
                        <ArrowDownLeft className="h-4 w-4" />
                        Withdraw
                      </button>
                    </div>
                    <div className="mt-4">
                      <a href="#" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                        Visit Surebanker for more service
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            )}

            {/* Transactions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions</h2>
              <div className="space-y-6">
                {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
                  <div key={date}>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">{date}</h3>
                    <div className="space-y-3">
                      {dateTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {tx.type === 'credit' ? (
                                <ArrowDownLeft className="h-5 w-5 text-green-600" />
                              ) : (
                                <ArrowUpRight className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                              <p className="text-xs text-gray-500">{tx.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${
                              tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Sidebar */}
          <div className="space-y-6">
            {/* Certify Points */}
            <div className="bg-[#0d1f16] text-white rounded-xl p-6">
              <div className="text-center">
                <div className="text-xs font-medium mb-2">CERTIFY POINTS</div>
                <div className="text-4xl font-bold mb-3">0<span className="text-sm align-top">PT</span></div>
                <button className="text-xs bg-white/10 px-3 py-1 rounded-md hover:bg-white/20 flex items-center gap-1 mx-auto">
                  See point Breakdown
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Our Ecosystem */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Ecosystem</h3>
              <div className="space-y-3">
                {ecosystemServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{service.name}</span>
                    </div>
                    {service.isNew && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">New</span>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className="px-6 space-y-6">
          {/* Search and Filter Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">All Activities</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleExportTransactions}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button
                  onClick={() => setShowFavorites(true)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Favorites
                </button>
                <button
                  onClick={() => setShowNotifications(true)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2 relative"
                >
                  <Bell className="h-4 w-4" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="Subscription">Subscription</option>
                      <option value="Withdrawal">Withdrawal</option>
                      <option value="Background">Background</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
                    <select
                      value={selectedAmountRange}
                      onChange={(e) => setSelectedAmountRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Amounts</option>
                      <option value="small">Small (&lt;₦10,000)</option>
                      <option value="medium">Medium (₦10,000 - ₦100,000)</option>
                      <option value="large">Large (&gt;₦100,000)</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('all')
                        setSelectedDateRange('all')
                        setSelectedAmountRange('all')
                      }}
                      className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Results Summary */}
            {searchQuery || selectedCategory !== 'all' || selectedDateRange !== 'all' || selectedAmountRange !== 'all' ? (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </p>
              </div>
            ) : null}

            {/* Transactions List */}
          <div className="space-y-6">
              {Object.entries(groupedFilteredTransactions).length > 0 ? (
                Object.entries(groupedFilteredTransactions).map(([date, dateTransactions]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-gray-700 mb-3">{date}</h3>
                <div className="space-y-3">
                  {dateTransactions.map((tx) => (
                        <div 
                          key={tx.id} 
                          onClick={() => handleTransactionClick(tx)}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {tx.type === 'credit' ? (
                            <ArrowDownLeft className="h-5 w-5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transactions found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowOtp(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">OTP Verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the OTP sent to your Email and Phone Number, to link your Surebanker Account.
            </p>
            <div className="flex items-center justify-between gap-2 mb-3">
              {otp.map((d, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={d}
                  onChange={(e) => handleChangeOtp(e.target.value, i)}
                  maxLength={1}
                  className={`w-14 h-14 text-center text-2xl rounded-md outline-none border ${
                    otpError === 'error' ? 'border-red-500' : otpError === 'success' ? 'border-green-600' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-600 mb-4">
              Didn't receive the code? <button className="text-primary-700 font-medium">Request new code</button>
            </div>
            <button 
              onClick={handleLink} 
              className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-md font-medium"
            >
              Link
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative text-center">
            <button onClick={() => setShowSuccess(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-gray-900 font-medium mb-6">Well done, SureBanker Wallet Linked</p>
            <button 
              onClick={() => setShowSuccess(false)} 
              className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-md font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Fund Wallet Modal */}
      {showFundWallet && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowFundWallet(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Fund your wallet</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Transfer funds to the account details below to top up your wallet
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Bank Name</span>
                  <button
                    onClick={() => handleCopyBankDetails('Surebanker Microfinance Bank')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-lg font-semibold text-gray-900">Surebanker Microfinance Bank</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Account Number</span>
                  <button
                    onClick={() => handleCopyBankDetails('1234567890')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-lg font-semibold text-gray-900">1234567890</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Account Name</span>
                  <button
                    onClick={() => handleCopyBankDetails('IDCertify Wallet')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-lg font-semibold text-gray-900">IDCertify Wallet</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Important:</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Use your wallet ID as reference</li>
                    <li>• Funds will be credited within 24 hours</li>
                    <li>• Minimum transfer: ₦1,000</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowWithdraw(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            {withdrawStep === 'form' && (
              <>
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <ArrowDownLeft className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Withdraw Funds</h3>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  Enter your bank account details to withdraw funds
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <input
                      type="text"
                      value={withdrawData.accountNumber}
                      onChange={(e) => setWithdrawData({...withdrawData, accountNumber: e.target.value})}
                      placeholder="Enter account number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={withdrawData.bankName}
                      onChange={(e) => setWithdrawData({...withdrawData, bankName: e.target.value})}
                      placeholder="Enter bank name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                    <input
                      type="number"
                      value={withdrawData.amount}
                      onChange={(e) => setWithdrawData({...withdrawData, amount: e.target.value})}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                    <input
                      type="text"
                      value={withdrawData.description}
                      onChange={(e) => setWithdrawData({...withdrawData, description: e.target.value})}
                      placeholder="Enter description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setShowWithdraw(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdrawNext}
                    disabled={!withdrawData.accountNumber || !withdrawData.amount}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            
            {withdrawStep === 'review' && (
              <>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Review Withdrawal</h3>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  Please review your withdrawal details before confirming
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Account Number:</span>
                    <span className="text-sm font-medium text-gray-900">{withdrawData.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bank Name:</span>
                    <span className="text-sm font-medium text-gray-900">{withdrawData.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-sm font-medium text-gray-900">₦{Number(withdrawData.amount).toLocaleString()}</span>
                  </div>
                  {withdrawData.description && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Description:</span>
                      <span className="text-sm font-medium text-gray-900">{withdrawData.description}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={handleWithdrawBack}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleWithdrawConfirm}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              </>
            )}
            
            {withdrawStep === 'success' && (
              <>
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Withdrawal Successful!</h3>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  Your withdrawal request has been submitted successfully. Funds will be transferred within 24 hours.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-green-800">
                      Transaction ID: <span className="font-mono font-medium">WTX{Date.now().toString().slice(-8)}</span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showTransactionDetails && selectedTransaction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowTransactionDetails(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              {selectedTransaction.type === 'credit' ? (
                <ArrowDownLeft className="h-8 w-8 text-green-600" />
              ) : (
                <ArrowUpRight className="h-8 w-8 text-red-600" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Transaction Details</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Description</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{selectedTransaction.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Amount</span>
                  <p className={`text-lg font-semibold ${selectedTransaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedTransaction.type === 'credit' ? '+' : '-'}₦{selectedTransaction.amount.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Category</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedTransaction.category}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Date</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedTransaction.date}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600">Status</span>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{selectedTransaction.status}</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Receipt
              </button>
              <button
                onClick={handlePrintReceipt}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button
                onClick={handleShareTransaction}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowFavorites(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Favorite Accounts</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Manage your frequently used bank accounts
            </p>
            
            <div className="space-y-3 mb-6">
              {favoriteAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{account.name}</p>
                    <p className="text-sm text-gray-600">{account.accountNumber} • {account.bankName}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromFavorites(account.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Add new account to favorites</p>
              <button
                onClick={() => setShowFavorites(false)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowNotifications(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Notifications</h3>
              <button
                onClick={handleClearAllNotifications}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border ${
                      notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {notification.type === 'info' && <AlertCircle className="h-4 w-4 text-blue-600" />}
                          {notification.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                          <p className={`text-sm font-medium ${
                            notification.read ? 'text-gray-700' : 'text-gray-900'
                          }`}>
                            {notification.message}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notifications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wallet
