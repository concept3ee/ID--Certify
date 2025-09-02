import { useState } from 'react'

import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft, Eye, X, CheckCircle, ArrowRight, Shield } from 'lucide-react'

const Wallet = () => {
  const [isLinked, setIsLinked] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState<'none' | 'error' | 'success'>('none')
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'activities'>('overview')

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

  const groupedTransactions = transactions.reduce((groups, tx) => {
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
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Top up
                        </button>
                        <button className="border border-primary-600 text-primary-600 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
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
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">All Activities</h2>
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
    </div>
  )
}

export default Wallet
