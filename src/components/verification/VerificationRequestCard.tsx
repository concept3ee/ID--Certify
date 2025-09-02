import React from 'react'
import { VerificationRequest, UserType } from '../../types'
import { Clock, User, Building, FileText, Fingerprint, Settings, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface VerificationRequestCardProps {
  request: VerificationRequest
  onRespond: (requestId: string) => void
  onViewDetails: (requestId: string) => void
}

const VerificationRequestCard: React.FC<VerificationRequestCardProps> = ({
  request,
  onRespond,
  onViewDetails
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'in_progress': return 'text-blue-600 bg-blue-50'
      case 'completed': return 'text-green-600 bg-green-50'
      case 'expired': return 'text-red-600 bg-red-50'
      case 'cancelled': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'in_progress': return <AlertCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'expired': return <XCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return <User className="w-4 h-4" />
      case 'organisation': return <Building className="w-4 h-4" />
      case 'document': return <FileText className="w-4 h-4" />
      case 'biometric': return <Fingerprint className="w-4 h-4" />
      case 'custom': return <Settings className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTimeRemaining = () => {
    const now = new Date()
    const expiry = new Date(request.expiryDate)
    const diff = expiry.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expired'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  const isExpired = new Date(request.expiryDate) < new Date()
  const isUrgent = !isExpired && new Date(request.expiryDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000 // Less than 24 hours

  return (
    <div className={`bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow ${
      isExpired ? 'border-red-200' : isUrgent ? 'border-yellow-200' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getTypeIcon(request.type)}
          <div>
            <h3 className="font-semibold text-gray-900">
              {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Verification
            </h3>
            <p className="text-sm text-gray-500">Request #{request.id.slice(0, 8)}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
          {getStatusIcon(request.status)}
          <span>{request.status.replace('_', ' ')}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Requester:</span>
          <span className="font-medium">{request.requesterType}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Target:</span>
          <span className="font-medium">{request.targetType}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Requested Fields:</span>
          <span className="font-medium">{request.requestedData.length} fields</span>
        </div>
        {request.cost && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cost:</span>
            <span className="font-medium">${request.cost}</span>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Time Remaining</span>
          <span className={`text-sm font-medium ${
            isExpired ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-gray-600'
          }`}>
            {getTimeRemaining()}
          </span>
        </div>

        <div className="flex space-x-2">
          {request.status === 'pending' && !isExpired && (
            <button
              onClick={() => onRespond(request.id)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Respond
            </button>
          )}
          <button
            onClick={() => onViewDetails(request.id)}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerificationRequestCard
