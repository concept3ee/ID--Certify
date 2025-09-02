import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  UserCheck, 
  FileText,
  Users,
  Building,
  Car,
  Phone,
  Heart,
  Fingerprint,
  Eye,
  Scale,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  MessageCircle,
  Upload,
  Download,
  EyeOff,
  Send,
  Check,
  X
} from 'lucide-react'

interface AttesterVerificationRequest {
  id: string
  type: 'employment-verification' | 'education-verification' | 'reference-verification' | 
        'address-verification' | 'income-verification' | 'business-verification' |
        'professional-license' | 'certification-verification' | 'membership-verification' |
        'custom-verification'
  title: string
  description: string
  requestingOrganization: string
  expiryDate: string
  status: 'pending' | 'assigned' | 'in-review' | 'requires-info' | 'completed' | 'failed'
  trustScoreImpact: number
  estimatedTime: string
  assignedAttester?: {
    id: string
    name: string
    rating: number
    specialization: string
    avatar: string
  }
  requiredDocuments: string[]
  verificationNotes?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

interface AttesterVerificationFlowProps {
  request: AttesterVerificationRequest
  onComplete: (result: 'success' | 'failed' | 'requires-info') => void
  onClose: () => void
}

const AttesterVerificationFlow: React.FC<AttesterVerificationFlowProps> = ({
  request,
  onComplete,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState<'details' | 'attester-selection' | 'document-upload' | 'communication' | 'review' | 'result'>('details')
  const [timeRemaining, setTimeRemaining] = useState<string>('')
  const [selectedAttester, setSelectedAttester] = useState<string>('')
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])
  const [messages, setMessages] = useState<Array<{id: string, sender: 'user' | 'attester', message: string, timestamp: Date}>>([])
  const [newMessage, setNewMessage] = useState('')
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | 'requires-info' | null>(null)
  const [showDocumentPreview, setShowDocumentPreview] = useState<string | null>(null)

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const expiry = new Date(request.expiryDate).getTime()
      const difference = expiry - now

      if (difference <= 0) {
        setTimeRemaining('EXPIRED')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeRemaining(`${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }

    calculateTimeRemaining()
    const timer = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(timer)
  }, [request.expiryDate])

  // Mock attesters data
  const availableAttesters = [
    {
      id: 'att1',
      name: 'Dr. Sarah Johnson',
      rating: 4.9,
      specialization: 'Employment & Education',
      avatar: '👩‍💼',
      experience: '8 years',
      completedVerifications: 1247,
      responseTime: '2-4 hours'
    },
    {
      id: 'att2',
      name: 'Prof. Michael Chen',
      rating: 4.8,
      specialization: 'Professional Licenses',
      avatar: '👨‍🏫',
      experience: '12 years',
      completedVerifications: 2156,
      responseTime: '4-6 hours'
    },
    {
      id: 'att3',
      name: 'Ms. Emily Rodriguez',
      rating: 4.7,
      specialization: 'Business & References',
      avatar: '👩‍💻',
      experience: '6 years',
      completedVerifications: 892,
      responseTime: '3-5 hours'
    }
  ]

  const handleAttesterSelection = () => {
    if (selectedAttester) {
      setCurrentStep('document-upload')
    }
  }

  const handleDocumentUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setUploadedDocuments(prev => [...prev, ...newFiles])
    }
  }

  const handleRemoveDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: 'user' as const,
        message: newMessage.trim(),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, message])
      setNewMessage('')
      
      // Simulate attester response
      setTimeout(() => {
        const attesterResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'attester' as const,
          message: `Thank you for the information. I'm reviewing your ${request.title.toLowerCase()} documents. I'll have an update within the next few hours.`,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, attesterResponse])
      }, 2000)
    }
  }

  const handleSubmitForReview = () => {
    setCurrentStep('review')
    
    // Simulate review process
    setTimeout(() => {
      const result = Math.random() > 0.15 ? 'success' : (Math.random() > 0.5 ? 'requires-info' : 'failed')
      setVerificationResult(result)
      setCurrentStep('result')
      
      // Auto-close after showing result
      setTimeout(() => {
        onComplete(result)
      }, 5000)
    }, 4000)
  }

  const getVerificationIcon = (type: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'employment-verification': Building,
      'education-verification': FileText,
      'reference-verification': Users,
      'address-verification': MapPin,
      'income-verification': TrendingUp,
      'business-verification': Building,
      'professional-license': Shield,
      'certification-verification': CheckCircle,
      'membership-verification': Users,
      'custom-verification': Shield
    }
    return iconMap[type] || Shield
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'assigned': return 'bg-blue-100 text-blue-800'
      case 'in-review': return 'bg-purple-100 text-purple-800'
      case 'requires-info': return 'bg-orange-100 text-orange-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'PENDING'
      case 'assigned': return 'ASSIGNED'
      case 'in-review': return 'IN REVIEW'
      case 'requires-info': return 'REQUIRES INFO'
      case 'completed': return 'COMPLETED'
      case 'failed': return 'FAILED'
      default: return 'UNKNOWN'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderDetailsStep = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <AlertTriangle className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Attester Verification Request</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Verification Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              {React.createElement(getVerificationIcon(request.type), { className: "h-6 w-6 text-purple-600" })}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
              {getStatusText(request.status)}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
              {request.priority.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Requesting Organization:</span>
            <p className="font-medium text-gray-900">{request.requestingOrganization}</p>
          </div>
          <div>
            <span className="text-gray-500">Estimated Time:</span>
            <p className="font-medium text-gray-900">{request.estimatedTime}</p>
          </div>
          <div>
            <span className="text-gray-500">Trust Score Impact:</span>
            <p className="font-medium text-green-600">+{request.trustScoreImpact} points</p>
          </div>
          <div>
            <span className="text-gray-500">Required Documents:</span>
            <p className="font-medium text-gray-900">{request.requiredDocuments.length} documents</p>
          </div>
        </div>

        {/* Required Documents List */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Required Documents:</h4>
          <ul className="space-y-1">
            {request.requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-gray-400" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Time Remaining</span>
          </div>
          <div className="text-lg font-bold text-yellow-800">{timeRemaining}</div>
        </div>
        <p className="text-xs text-yellow-700 mt-2">
          Complete this verification before the deadline to maintain your trust score
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={() => setCurrentStep('attester-selection')}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <Users className="h-5 w-5" />
        <span>Select Attester & Continue</span>
      </button>
    </div>
  )

  const renderAttesterSelectionStep = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Select an Attester</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Attester Selection */}
      <div className="space-y-4">
        {availableAttesters.map((attester) => (
          <div
            key={attester.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedAttester === attester.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedAttester(attester.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{attester.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{attester.name}</h3>
                  <p className="text-sm text-gray-600">{attester.specialization}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>{attester.experience} experience</span>
                    <span>{attester.completedVerifications} verifications</span>
                    <span>{attester.responseTime} response</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{attester.rating}</span>
                </div>
                {selectedAttester === attester.id && (
                  <Check className="h-5 w-5 text-purple-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setCurrentStep('details')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleAttesterSelection}
          disabled={!selectedAttester}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
            selectedAttester
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )

  const renderDocumentUploadStep = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Upload Required Documents</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Document Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
        <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
        <input
          type="file"
          multiple
          onChange={(e) => handleDocumentUpload(e.target.files)}
          className="hidden"
          id="document-upload"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        <label
          htmlFor="document-upload"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors"
        >
          Choose Files
        </label>
      </div>

      {/* Uploaded Documents */}
      {uploadedDocuments.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Uploaded Documents:</h4>
          {uploadedDocuments.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-900">{file.name}</span>
                <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowDocumentPreview(file.name)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleRemoveDocument(index)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setCurrentStep('attester-selection')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep('communication')}
          disabled={uploadedDocuments.length === 0}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
            uploadedDocuments.length > 0
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )

  const renderCommunicationStep = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Communication with Attester</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-50 rounded-lg p-4 h-80 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Start a conversation with your attester</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setCurrentStep('document-upload')}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmitForReview}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Check className="h-5 w-5" />
          <span>Submit for Review</span>
        </button>
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6 text-center">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Under Review</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Review Animation */}
      <div className="py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Attester Review in Progress</h3>
        <p className="text-gray-600">Your attester is carefully reviewing your documents and information...</p>
      </div>

      {/* Progress Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Estimated review time: {request.estimatedTime}</span>
        </div>
      </div>
    </div>
  )

  const renderResultStep = () => (
    <div className="space-y-6 text-center">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Verification Result</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-500">&times;</span>
        </button>
      </div>

      {/* Result Display */}
      <div className="py-8">
        {verificationResult === 'success' ? (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-900">Verification Successful!</h3>
            <p className="text-gray-600">Your {request.title.toLowerCase()} has been verified by the attester.</p>
          </div>
        ) : verificationResult === 'requires-info' ? (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-orange-900">Additional Information Required</h3>
            <p className="text-gray-600">The attester needs more information to complete your verification.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-900">Verification Failed</h3>
            <p className="text-gray-600">We were unable to verify your {request.title.toLowerCase()}. Please try again or contact support.</p>
          </div>
        )}
      </div>

      {/* Trust Score Update */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-sm">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-gray-700">
            Trust Score: {verificationResult === 'success' ? `+${request.trustScoreImpact} points` : 'No change'}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onComplete(verificationResult!)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
      >
        Continue
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {currentStep === 'details' && renderDetailsStep()}
          {currentStep === 'attester-selection' && renderAttesterSelectionStep()}
          {currentStep === 'document-upload' && renderDocumentUploadStep()}
          {currentStep === 'communication' && renderCommunicationStep()}
          {currentStep === 'review' && renderReviewStep()}
          {currentStep === 'result' && renderResultStep()}
        </div>
      </div>
    </div>
  )
}

export default AttesterVerificationFlow
