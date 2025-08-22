import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft, Eye } from 'lucide-react'

const Wallet = () => {
  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 50000,
      description: 'Monthly subscription payment',
      date: '2024-01-20',
      status: 'completed',
    },
    {
      id: 2,
      type: 'debit',
      amount: 2500,
      description: 'Employee verification fees',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 3,
      type: 'debit',
      amount: 5000,
      description: 'AML compliance check',
      date: '2024-01-10',
      status: 'pending',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organization Wallet</h1>
        <p className="text-gray-600">Manage payments and transactions for your organization</p>
      </div>

      {/* Balance Card */}
      <div className="card bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Available Balance</p>
            <p className="text-3xl font-bold">₦42,500</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex space-x-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors duration-200">
            <Plus className="h-4 w-4 inline mr-2" />
            Add Funds
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors duration-200">
            <Eye className="h-4 w-4 inline mr-2" />
            View History
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Plus className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Add Funds</h3>
          <p className="text-sm text-gray-600">Top up organization wallet</p>
        </div>
        
        <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ArrowUpRight className="h-6 w-6 text-success-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Pay Bills</h3>
          <p className="text-sm text-gray-600">Pay for services and subscriptions</p>
        </div>
        
        <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ArrowDownLeft className="h-6 w-6 text-warning-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Withdraw</h3>
          <p className="text-sm text-gray-600">Withdraw to bank account</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'credit' ? 'bg-success-100' : 'bg-danger-100'
                }`}>
                  {tx.type === 'credit' ? (
                    <ArrowUpRight className="h-5 w-5 text-success-600" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5 text-danger-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  tx.type === 'credit' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wallet
