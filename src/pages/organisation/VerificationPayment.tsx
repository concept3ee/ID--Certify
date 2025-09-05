import React, { useState, useEffect } from 'react'
import { 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft,
  Users,
  Shield,
  FileText,
  Clock,
  DollarSign
} from 'lucide-react'

interface VerificationData {
  verificationType: string
  candidates: Array<{
    id: string
    name: string
    email: string
    type: string
    organization: string
  }>
  attesterConfig: {
    numberOfAttesters: number
    attesterTypes: string[]
    requirements: {
      minExperience: number
      requiredDocuments: string[]
      verificationLevel: string
    }
  }
  cost: number
  timestamp: string
}

const VerificationPayment: React.FC = () => {
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('wallet')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    // Get verification data from localStorage
    const storedData = localStorage.getItem('pendingVerification')
    if (storedData) {
      setVerificationData(JSON.parse(storedData))
    }
  }, [])

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
      
      // Clear pending verification
      localStorage.removeItem('pendingVerification')
      
      // Redirect to verification dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = '/organisation/verification'
      }, 2000)
    }, 2000)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (!verificationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Verification Found</h2>
          <p className="text-gray-600 mb-4">No pending verification found. Please start a new verification.</p>
          <button 
            onClick={() => window.location.href = '/organisation/verification'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Verification Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your verification has been launched successfully.</p>
          <p className="text-sm text-gray-500">Redirecting to verification dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Verification Setup
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
          <p className="text-gray-600 mt-2">Review your verification details and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verification Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Summary</h2>
              
              {/* Verification Type */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Verification Type</h3>
                <p className="text-sm text-gray-600">{verificationData.verificationType}</p>
              </div>

              {/* Candidates */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Candidates ({verificationData.candidates.length})
                </h3>
                <div className="space-y-2">
                  {verificationData.candidates.map((candidate, index) => (
                    <div key={candidate.id || index} className="bg-gray-50 p-3 rounded text-sm">
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-gray-600">{candidate.email}</div>
                      <div className="text-gray-500">{candidate.type} • {candidate.organization}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attesters */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Attesters ({verificationData.attesterConfig.numberOfAttesters})
                </h3>
                <div className="flex flex-wrap gap-1">
                  {verificationData.attesterConfig.attesterTypes.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Required Documents
                </h3>
                <div className="flex flex-wrap gap-1">
                  {verificationData.attesterConfig.requirements.requiredDocuments.map((doc, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base verification fee</span>
                  <span className="font-medium">$50.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Candidates ({verificationData.candidates.length} × $25)
                  </span>
                  <span className="font-medium">
                    ${(verificationData.candidates.length * 25).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Attesters ({verificationData.attesterConfig.numberOfAttesters} × $15)
                  </span>
                  <span className="font-medium">
                    ${(verificationData.attesterConfig.numberOfAttesters * 15).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">{formatCurrency(verificationData.cost)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2 text-blue-600" />
                    <div>
                      <div className="font-medium">Organization Wallet</div>
                      <div className="text-sm text-gray-600">Available balance: $2,500.00</div>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Pay with your card</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Button */}
            <div className="bg-white rounded-lg border p-6">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pay {formatCurrency(verificationData.cost)}
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                By completing this payment, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationPayment
