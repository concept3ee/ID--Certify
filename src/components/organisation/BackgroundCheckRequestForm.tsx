import React, { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Download,
  ArrowLeft,
  X,
  Edit3,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

interface BackgroundCheckRequest {
  id: string
  candidateName: string
  candidateEmail: string
  candidatePhone: string
  position: string
  department: string
  requestDate: string
  status: 'draft' | 'submitted' | 'in-progress' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  completionDate?: string
  reportUrl?: string
  cost: number
  checks: {
    personalIdentity: boolean
    criminalRecord: boolean
    financialCredit: boolean
    fraudDetection: boolean
    education: boolean
    employment: boolean
    medical: boolean
    socialMedia: boolean
    association: boolean
  }
  results?: {
    personalIdentity: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    criminalRecord: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    financialCredit: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    fraudDetection: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    education: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    employment: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    medical: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    socialMedia: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
    association: 'pending' | 'completed' | 'failed' | 'inconsistent' | 'in-progress'
  }
  details?: {
    personalIdentity: {
      address: string
      lga: string
      city: string
      state: string
      bvn: string
      nin: string
      frscHistory: string
      stateResidency: string
      nameChange: string
      email: string
    }
    criminalRecord: {
      criminalHistory: string
      courtRecords: string
      arrestRecords: string
    }
    financialCredit: {
      creditScore: number
      creditHistory: string
      financialRecords: string
    }
    fraudDetection: {
      fraudAlerts: string
      identityTheft: string
      suspiciousActivity: string
    }
    education: {
      institution: string
      degree: string
      graduationDate: string
      verificationStatus: string
    }
    employment: {
      currentEmployer: string
      previousEmployers: string
      employmentHistory: string
    }
    medical: {
      medicalHistory: string
      drugTest: string
      healthRecords: string
    }
    socialMedia: {
      socialProfiles: string
      onlinePresence: string
      reputationCheck: string
    }
    association: {
      knownAssociates: string
      familyConnections: string
      businessAssociations: string
    }
  }
  notes?: string
  tags?: string[]
}

interface BackgroundCheckRequestFormProps {
  requestId?: string
  onClose: () => void
  onSave?: (request: BackgroundCheckRequest) => void
}

const BackgroundCheckRequestForm: React.FC<BackgroundCheckRequestFormProps> = ({
  requestId,
  onClose,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('personalIdentity')
  const [selectedSubTab, setSelectedSubTab] = useState('address')
  const [showDetails, setShowDetails] = useState(false)

  // Initialize with empty form or existing data
  const [request, setRequest] = useState<BackgroundCheckRequest>({
    id: requestId || `BC-${Date.now()}`,
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    position: '',
    department: '',
    requestDate: new Date().toISOString().split('T')[0],
    status: 'draft',
    priority: 'medium',
    assignedTo: '',
    cost: 0,
    checks: {
      personalIdentity: false,
      criminalRecord: false,
      financialCredit: false,
      fraudDetection: false,
      education: false,
      employment: false,
      medical: false,
      socialMedia: false,
      association: false
    }
  })

  // Mock data for demonstration
  useEffect(() => {
    if (requestId) {
      // Load existing request data
      setRequest({
        id: requestId,
        candidateName: 'Nene Oyinda Afamefuna',
        candidateEmail: 'NeneAfamefuna@gmail.com',
        candidatePhone: '+234 801 234 5678',
        position: 'Senior Software Engineer',
        department: 'Engineering',
        requestDate: '2024-01-15',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Sarah Johnson',
        completionDate: '2024-01-18',
        reportUrl: '/reports/bc-2024-001.pdf',
        cost: 25000,
        checks: {
          personalIdentity: true,
          criminalRecord: true,
          financialCredit: true,
          fraudDetection: true,
          education: true,
          employment: false,
          medical: false,
          socialMedia: false,
          association: false
        },
        results: {
          personalIdentity: 'completed',
          criminalRecord: 'in-progress',
          financialCredit: 'completed',
          fraudDetection: 'completed',
          education: 'inconsistent',
          employment: 'pending',
          medical: 'pending',
          socialMedia: 'pending',
          association: 'pending'
        },
        details: {
          personalIdentity: {
            address: 'No 6 Ajanaku Street, Opebi',
            lga: 'Ikeja L.G.A',
            city: 'Ikeja',
            state: 'Lagos',
            bvn: '12345678901',
            nin: '12345678901',
            frscHistory: 'Clean record',
            stateResidency: 'Lagos State',
            nameChange: 'No changes',
            email: 'NeneAfamefuna@gmail.com'
          },
          criminalRecord: {
            criminalHistory: 'No criminal record found',
            courtRecords: 'No court records',
            arrestRecords: 'No arrest records'
          },
          financialCredit: {
            creditScore: 750,
            creditHistory: 'Good credit history',
            financialRecords: 'No financial issues'
          },
          fraudDetection: {
            fraudAlerts: 'No fraud alerts',
            identityTheft: 'No identity theft reports',
            suspiciousActivity: 'No suspicious activity'
          },
          education: {
            institution: 'University of Lagos',
            degree: 'Computer Science',
            graduationDate: '2019',
            verificationStatus: 'Inconsistent records found'
          },
          employment: {
            currentEmployer: 'Tech Corp',
            previousEmployers: 'Previous Company',
            employmentHistory: '5 years experience'
          },
          medical: {
            medicalHistory: 'No significant medical history',
            drugTest: 'Pending',
            healthRecords: 'Clean health record'
          },
          socialMedia: {
            socialProfiles: 'LinkedIn, Twitter profiles found',
            onlinePresence: 'Professional online presence',
            reputationCheck: 'Positive reputation'
          },
          association: {
            knownAssociates: 'Professional network',
            familyConnections: 'Family background verified',
            businessAssociations: 'No concerning associations'
          }
        },
        notes: 'All checks completed successfully. Candidate cleared for hire.',
        tags: ['engineering', 'senior-level', 'cleared']
      })
      setIsEditing(false)
    }
  }, [requestId])

  const categories = [
    {
      key: 'personalIdentity',
      name: 'Personal & Identity Information',
      icon: User,
      subTabs: ['address', 'bvn', 'nin', 'frsc', 'residency', 'nameChange', 'email']
    },
    {
      key: 'criminalRecord',
      name: 'Criminal Record Check',
      icon: AlertTriangle,
      subTabs: ['criminalHistory', 'courtRecords', 'arrestRecords']
    },
    {
      key: 'financialCredit',
      name: 'Financial & Credit History',
      icon: CheckCircle,
      subTabs: ['creditScore', 'creditHistory', 'financialRecords']
    },
    {
      key: 'fraudDetection',
      name: 'Fraud & Anti-Fraud Detection',
      icon: CheckCircle,
      subTabs: ['fraudAlerts', 'identityTheft', 'suspiciousActivity']
    },
    {
      key: 'education',
      name: 'Education Verification',
      icon: AlertTriangle,
      subTabs: ['institution', 'degree', 'graduation', 'verification']
    },
    {
      key: 'employment',
      name: 'Employment History',
      icon: Clock,
      subTabs: ['currentEmployer', 'previousEmployers', 'employmentHistory']
    },
    {
      key: 'medical',
      name: 'Medical Records',
      icon: Clock,
      subTabs: ['medicalHistory', 'drugTest', 'healthRecords']
    },
    {
      key: 'socialMedia',
      name: 'Social Media Check',
      icon: Clock,
      subTabs: ['socialProfiles', 'onlinePresence', 'reputationCheck']
    },
    {
      key: 'association',
      name: 'Association Check',
      icon: Clock,
      subTabs: ['knownAssociates', 'familyConnections', 'businessAssociations']
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'inconsistent':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'inconsistent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleInputChange = (field: string, value: any) => {
    if (isEditing) {
      setRequest(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleCheckChange = (checkType: string, checked: boolean) => {
    if (isEditing) {
      setRequest(prev => ({
        ...prev,
        checks: {
          ...prev.checks,
          [checkType]: checked
        }
      }))
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(request)
    }
    setIsEditing(false)
  }

  const renderPersonalIdentityContent = () => {
    const details = request.details?.personalIdentity
    const subTabs = [
      { key: 'address', name: 'Address', icon: MapPin },
      { key: 'bvn', name: 'BVN Check', icon: User },
      { key: 'nin', name: 'NIN Check', icon: User },
      { key: 'frsc', name: 'FRSC History', icon: User },
      { key: 'residency', name: 'State Residency', icon: MapPin },
      { key: 'nameChange', name: 'Name change', icon: User },
      { key: 'email', name: 'Email', icon: Mail }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                selectedSubTab === tab.key
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content based on selected sub-tab */}
        {selectedSubTab === 'address' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ADDRESS</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={details?.address || ''}
                    onChange={(e) => handleInputChange('details.personalIdentity.address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{details?.address || 'No address provided'}</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">From Jun, 2019 to now</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">L.G.A</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={details?.lga || ''}
                    onChange={(e) => handleInputChange('details.personalIdentity.lga', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{details?.lga || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CITY</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={details?.city || ''}
                    onChange={(e) => handleInputChange('details.personalIdentity.city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{details?.city || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">STATE</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={details?.state || ''}
                    onChange={(e) => handleInputChange('details.personalIdentity.state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{details?.state || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedSubTab === 'bvn' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">BVN Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={details?.bvn || ''}
                  onChange={(e) => handleInputChange('details.personalIdentity.bvn', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{details?.bvn || 'Not provided'}</p>
              )}
            </div>
          </div>
        )}

        {/* Add other sub-tabs content here */}
      </div>
    )
  }

  const renderDetailContent = () => {
    switch (selectedCategory) {
      case 'personalIdentity':
        return renderPersonalIdentityContent()
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Select a category to view details</p>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Background Check Request</h1>
          </div>
          <div className="flex items-center space-x-4">
            {request.status === 'completed' && (
              <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Full Report</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>


        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Categories */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Check Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const result = request.results?.[category.key as keyof typeof request.results]
                  const isSelected = selectedCategory === category.key
                  
                  return (
                    <div
                      key={category.key}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-white border-2 border-blue-500 shadow-sm' 
                          : 'hover:bg-white hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedCategory(category.key)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result && (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(result)}`}>
                              {result.toUpperCase().replace('-', ' ')}
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {selectedCategory && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {categories.find(c => c.key === selectedCategory)?.name}
                      </h3>
                      {request.results?.[selectedCategory as keyof typeof request.results] && (
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(request.results[selectedCategory as keyof typeof request.results])}`}>
                          {request.results[selectedCategory as keyof typeof request.results]?.toUpperCase().replace('-', ' ')}
                        </span>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                    )}
                  </div>
                  {renderDetailContent()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundCheckRequestForm
