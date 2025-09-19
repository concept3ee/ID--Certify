import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, X, User, MapPin, Mail, Phone, CheckCircle, AlertTriangle, Clock, Building, GraduationCap, Shield, CreditCard, FileText, Users, Briefcase, Heart, Globe, Eye, Lock, Star, TrendingUp, BarChart3, Calendar, Flag, MoreVertical, Edit, Trash2, RefreshCw, ExternalLink, Copy, Send, Archive, Tag, Play, Printer, ChevronDown, Info } from 'lucide-react'

interface BackgroundCheck {
  id: string
  candidateName: string
  candidateEmail: string
  candidatePhone: string
  position: string
  department: string
  requestDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  completionDate?: string
  reportUrl?: string
  cost: number
  checks: {
    criminal: boolean
    employment: boolean
    education: boolean
    reference: boolean
    credit: boolean
    identity: boolean
  }
  results?: {
    criminal: 'clear' | 'issues' | 'pending'
    employment: 'verified' | 'discrepancy' | 'pending'
    education: 'verified' | 'discrepancy' | 'pending'
    reference: 'positive' | 'negative' | 'pending'
    credit: 'good' | 'poor' | 'pending'
    identity: 'verified' | 'failed' | 'pending'
  }
  notes?: string
  tags: string[]
}

const BackgroundCheckDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  // Mock data - in real app, this would be fetched based on the ID
  const backgroundCheck: BackgroundCheck = {
    id: id || '1',
    candidateName: 'Nene Oyinda Afamefuna',
    candidateEmail: 'nene.afamefuna@example.com',
    candidatePhone: '+234 70 1234 5678',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    requestDate: '2024-01-15',
    status: 'completed',
    priority: 'high',
    assignedTo: 'John Doe',
    completionDate: '2024-01-20',
    reportUrl: '/reports/bg-check-1.pdf',
    cost: 15000,
    checks: {
      criminal: true,
      employment: true,
      education: true,
      reference: true,
      credit: true,
      identity: true
    },
    results: {
      criminal: 'clear',
      employment: 'verified',
      education: 'verified',
      reference: 'positive',
      credit: 'good',
      identity: 'verified'
    },
    notes: 'All checks completed successfully. Candidate has a clean record.',
    tags: ['high-priority', 'engineering', 'senior-level']
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'clear':
      case 'verified':
      case 'positive':
      case 'good':
        return 'bg-green-100 text-green-800'
      case 'issues':
      case 'discrepancy':
      case 'negative':
      case 'poor':
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/organisation/background-check')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Background Check Details</h1>
              <p className="text-sm text-gray-600">Request ID: {backgroundCheck.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <Edit className="h-4 w-4" />
              <span>Edit Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Candidate Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Candidate Summary */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {backgroundCheck.candidateName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{backgroundCheck.candidateName}</h3>
                  <p className="text-sm text-gray-600">{backgroundCheck.position}</p>
                  <p className="text-sm text-gray-500">{backgroundCheck.department}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{backgroundCheck.candidateEmail}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{backgroundCheck.candidatePhone}</span>
                </div>
              </div>
            </div>

            {/* Request Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Request Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backgroundCheck.status)}`}>
                    {backgroundCheck.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Priority</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(backgroundCheck.priority)}`}>
                    {backgroundCheck.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Request Date</span>
                  <span className="text-sm text-gray-900">{new Date(backgroundCheck.requestDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completion Date</span>
                  <span className="text-sm text-gray-900">
                    {backgroundCheck.completionDate ? new Date(backgroundCheck.completionDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Assigned To</span>
                  <span className="text-sm text-gray-900">{backgroundCheck.assignedTo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost</span>
                  <span className="text-sm text-gray-900">₦{backgroundCheck.cost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {backgroundCheck.tags.map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Check Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Check Results Overview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-6">Background Check Results</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(backgroundCheck.checks).map(([check, enabled]) => {
                  if (!enabled) return null
                  const result = backgroundCheck.results?.[check as keyof typeof backgroundCheck.results]
                  return (
                    <div key={check} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          {check === 'criminal' && <Shield className="h-4 w-4 text-blue-600" />}
                          {check === 'employment' && <Briefcase className="h-4 w-4 text-blue-600" />}
                          {check === 'education' && <GraduationCap className="h-4 w-4 text-blue-600" />}
                          {check === 'reference' && <Users className="h-4 w-4 text-blue-600" />}
                          {check === 'credit' && <CreditCard className="h-4 w-4 text-blue-600" />}
                          {check === 'identity' && <User className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{check} Check</p>
                          <p className="text-sm text-gray-600">
                            {result ? result.replace('-', ' ') : 'Pending'}
                          </p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getResultColor(result || 'pending')}`}>
                        {result ? result.replace('-', ' ') : 'Pending'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Notes */}
            {backgroundCheck.notes && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Notes</h4>
                <p className="text-sm text-gray-600">{backgroundCheck.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Actions</h4>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <Download className="h-4 w-4" />
                  <span>Download Full Report</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Edit className="h-4 w-4" />
                  <span>Edit Request</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <RefreshCw className="h-4 w-4" />
                  <span>Re-run Check</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundCheckDetails
