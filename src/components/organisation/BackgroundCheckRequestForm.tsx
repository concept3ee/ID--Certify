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
  EyeOff,
  CreditCard
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
  const [selectedChecks, setSelectedChecks] = useState<{[key: string]: {selected: boolean, price: number}}>({
    // Personal Identity sub-checks
    'personalIdentity.address': { selected: false, price: 2000 },
    'personalIdentity.bvn': { selected: false, price: 1500 },
    'personalIdentity.nin': { selected: false, price: 1000 },
    'personalIdentity.frsc': { selected: false, price: 2500 },
    'personalIdentity.birthCertificate': { selected: false, price: 1800 },
    'personalIdentity.stateResidency': { selected: false, price: 1200 },
    'personalIdentity.nameChange': { selected: false, price: 800 },
    'personalIdentity.phoneEmail': { selected: false, price: 500 },
    'personalIdentity.passport': { selected: false, price: 3000 },
    // Criminal Record sub-checks
    'criminalRecord.criminalHistory': { selected: false, price: 4000 },
    'criminalRecord.financialCrime': { selected: false, price: 3500 },
    'criminalRecord.courtRecords': { selected: false, price: 3000 },
    'criminalRecord.sexOffenderRegistry': { selected: false, price: 2500 },
    // Financial & Credit sub-checks
    'financialCredit.creditReport': { selected: false, price: 2000 },
    'financialCredit.incomeSources': { selected: false, price: 2500 },
    'financialCredit.outstandingDebts': { selected: false, price: 1800 },
    'financialCredit.businessFinancial': { selected: false, price: 3000 },
    'financialCredit.firsHistory': { selected: false, price: 2200 },
    'financialCredit.bankVerification': { selected: false, price: 1500 },
    'financialCredit.loanHistory': { selected: false, price: 2000 },
    // Association sub-checks
    'association.professionalBodies': { selected: false, price: 1500 },
    'association.alumniNetworks': { selected: false, price: 2000 },
    'association.exclusiveAssociations': { selected: false, price: 2500 },
    'association.politicalExposure': { selected: false, price: 3000 },
    'association.professionalAssociations': { selected: false, price: 1200 },
    'association.businessAssociations': { selected: false, price: 1800 },
    'association.socialAssociations': { selected: false, price: 1000 },
    // Medical sub-checks
    'medical.medicalHistory': { selected: false, price: 2000 },
    'medical.medicalRecords': { selected: false, price: 2500 },
    'medical.drugTest': { selected: false, price: 3000 },
    'medical.fitnessAssessment': { selected: false, price: 1500 },
    // Employment sub-checks
    'employment.employmentHistory': { selected: false, price: 2500 },
    'employment.referenceCheck': { selected: false, price: 2000 },
    'employment.backgroundGapAnalysis': { selected: false, price: 1800 },
    // Education sub-checks
    'education.degreeVerification': { selected: false, price: 2000 },
    'education.transcriptVerification': { selected: false, price: 2500 },
    'education.professionalCertifications': { selected: false, price: 1500 },
    // Social Media sub-checks
    'socialMedia.newsArticles': { selected: false, price: 1000 },
    'socialMedia.onlineContent': { selected: false, price: 1500 },
    'socialMedia.thoughtLeadership': { selected: false, price: 2000 },
    'socialMedia.socialMediaProfiles': { selected: false, price: 1200 },
    'socialMedia.reputationScore': { selected: false, price: 1800 },
    // Fraud Detection sub-checks
    'fraudDetection.identityFraud': { selected: false, price: 2000 },
    'fraudDetection.watchlistCheck': { selected: false, price: 1500 },
    'fraudDetection.deviceFingerprint': { selected: false, price: 1000 }
  })

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
      subTabs: ['address', 'bvn', 'nin', 'frsc', 'birthCertificate', 'stateResidency', 'nameChange', 'phoneEmail', 'passport']
    },
    {
      key: 'criminalRecord',
      name: 'Criminal Record Check',
      icon: AlertTriangle,
      subTabs: ['criminalHistory', 'financialCrime', 'courtRecords', 'sexOffenderRegistry']
    },
    {
      key: 'financialCredit',
      name: 'Financial & Credit History',
      icon: CheckCircle,
      subTabs: ['creditReport', 'incomeSources', 'outstandingDebts', 'businessFinancial', 'firsHistory', 'bankVerification', 'loanHistory']
    },
    {
      key: 'association',
      name: 'Association Verification',
      icon: CheckCircle,
      subTabs: ['professionalBodies', 'alumniNetworks', 'exclusiveAssociations', 'politicalExposure', 'professionalAssociations', 'businessAssociations', 'socialAssociations']
    },
    {
      key: 'medical',
      name: 'Medical History',
      icon: Clock,
      subTabs: ['medicalHistory', 'medicalRecords', 'drugTest', 'fitnessAssessment']
    },
    {
      key: 'employment',
      name: 'Professional Records (Employment & Credentials)',
      icon: Clock,
      subTabs: ['employmentHistory', 'referenceCheck', 'backgroundGapAnalysis']
    },
    {
      key: 'education',
      name: 'Education',
      icon: AlertTriangle,
      subTabs: ['degreeVerification', 'transcriptVerification', 'professionalCertifications']
    },
    {
      key: 'socialMedia',
      name: 'Social Media & Online Presence (Digital Reputation)',
      icon: CheckCircle,
      subTabs: ['newsArticles', 'onlineContent', 'thoughtLeadership', 'socialMediaProfiles', 'reputationScore']
    },
    {
      key: 'fraudDetection',
      name: 'Fraud & Anti-Fraud Detection',
      icon: CheckCircle,
      subTabs: ['identityFraud', 'watchlistCheck', 'deviceFingerprint']
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

  const toggleCheck = (checkKey: string) => {
    setSelectedChecks(prev => ({
      ...prev,
      [checkKey]: {
        ...prev[checkKey],
        selected: !prev[checkKey].selected
      }
    }))
  }

  const getTotalPrice = () => {
    return Object.values(selectedChecks)
      .filter(check => check.selected)
      .reduce((total, check) => total + check.price, 0)
  }

  const getSelectedChecksList = () => {
    return Object.entries(selectedChecks)
      .filter(([_, check]) => check.selected)
      .map(([key, check]) => {
        // Handle all sub-checks
        if (key.includes('.')) {
          const [category, subTab] = key.split('.')
          const subTabNames: {[key: string]: {[key: string]: string}} = {
            'personalIdentity': {
              'address': 'Address Verification',
              'bvn': 'BVN Check',
              'nin': 'NIN Check',
              'frsc': 'FRSC History Check',
              'birthCertificate': 'Birth Certificate',
              'stateResidency': 'State Residency Verification',
              'nameChange': 'Name Change History',
              'phoneEmail': 'Phone & Email Verification',
              'passport': 'Passport History Verification'
            },
            'criminalRecord': {
              'criminalHistory': 'Criminal History',
              'financialCrime': 'Financial Crime History',
              'courtRecords': 'Court Records',
              'sexOffenderRegistry': 'Sex Offender Registry'
            },
            'financialCredit': {
              'creditReport': 'Credit Report',
              'incomeSources': 'Verified Income Sources',
              'outstandingDebts': 'Outstanding Debts & Liabilities',
              'businessFinancial': 'Business Financial History',
              'firsHistory': 'FIRS History',
              'bankVerification': 'Bank Verification',
              'loanHistory': 'Loan History'
            },
            'association': {
              'professionalBodies': 'Professional Bodies (NBA, ICAN, etc.)',
              'alumniNetworks': 'Alumni Networks (Harvard, Oxford, etc.)',
              'exclusiveAssociations': 'Exclusive Industry Associations',
              'politicalExposure': 'Political Exposure (PEPs)',
              'professionalAssociations': 'Professional Associations',
              'businessAssociations': 'Business Associations',
              'socialAssociations': 'Social Associations'
            },
            'medical': {
              'medicalHistory': 'Medical History',
              'medicalRecords': 'Medical Records',
              'drugTest': 'Drug Test',
              'fitnessAssessment': 'Fitness Assessment'
            },
            'employment': {
              'employmentHistory': 'Employment History',
              'referenceCheck': 'Reference Check',
              'backgroundGapAnalysis': 'Background Gap Analysis'
            },
            'education': {
              'degreeVerification': 'Degree Verification',
              'transcriptVerification': 'Transcript Verification',
              'professionalCertifications': 'Professional Certifications'
            },
            'socialMedia': {
              'newsArticles': 'News Articles & Public Mentions',
              'onlineContent': 'Online Content & Reputation Analysis',
              'thoughtLeadership': 'Thought Leadership & Professional Contributions',
              'socialMediaProfiles': 'Social Media Profiles',
              'reputationScore': 'Reputation Score'
            },
            'fraudDetection': {
              'identityFraud': 'Identity Fraud Check',
              'watchlistCheck': 'Watchlist Check',
              'deviceFingerprint': 'Device Fingerprint'
            }
          }
          return {
            name: subTabNames[category]?.[subTab] || key,
            price: check.price
          }
        }
        // Handle other categories
        return {
          name: categories.find(c => c.key === key)?.name || key,
          price: check.price
        }
      })
  }

  const renderPersonalIdentityContent = () => {
    const details = request.details?.personalIdentity
    const subTabs = [
      { key: 'address', name: 'Address', icon: MapPin, price: 2000 },
      { key: 'bvn', name: 'BVN Check', icon: User, price: 1500 },
      { key: 'nin', name: 'NIN Check', icon: User, price: 1000 },
      { key: 'frsc', name: 'FRSC History', icon: User, price: 2500 },
      { key: 'birthCertificate', name: 'Birth Certificate', icon: User, price: 1800 },
      { key: 'stateResidency', name: 'State Residency', icon: MapPin, price: 1200 },
      { key: 'nameChange', name: 'Name change', icon: User, price: 800 },
      { key: 'phoneEmail', name: 'Phone & Email', icon: Mail, price: 500 },
      { key: 'passport', name: 'Passport', icon: User, price: 3000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
            {!selectedChecks['personalIdentity.address']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Address Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's residential address</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.address')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Address Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Address Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.address')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
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
          </div>
        )}

        {selectedSubTab === 'bvn' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.bvn']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">BVN Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's Bank Verification Number</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.bvn')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add BVN Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">BVN Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.bvn')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
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
          </div>
        )}

        {selectedSubTab === 'nin' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.nin']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">NIN Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's National Identification Number</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.nin')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add NIN Check - ₦1,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">NIN Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.nin')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIN Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.nin || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.nin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.nin || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'frsc' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.frsc']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">FRSC History Check</h3>
                <p className="text-gray-500 mb-4">Check the candidate's Federal Road Safety Corps history</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.frsc')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add FRSC Check - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">FRSC History Check</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.frsc')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver's License Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.frscHistory || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.frscHistory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.frscHistory || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'residency' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.residency']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">State Residency Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's state of residence</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.residency')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Residency Check - ₦1,200
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">State Residency Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.residency')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State of Residence</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.stateResidency || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.stateResidency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.stateResidency || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'nameChange' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.nameChange']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Name Change History</h3>
                <p className="text-gray-500 mb-4">Check for any legal name changes</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.nameChange')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Name Change Check - ₦800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Name Change History</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.nameChange')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Names</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.nameChange || ''}
                      onChange={(e) => handleInputChange('details.personalIdentity.nameChange', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.nameChange || 'No previous names'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'phoneEmail' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.phoneEmail']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Phone & Email Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's phone number and email address</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.phoneEmail')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Phone & Email Check - ₦500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone & Email Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.phoneEmail')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={details?.email || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.email || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={details?.email || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.email || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'birthCertificate' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.birthCertificate']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Birth Certificate Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's birth certificate details</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.birthCertificate')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Birth Certificate Check - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Birth Certificate Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.birthCertificate')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birth Certificate Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.nin || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.nin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.nin || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.email || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.email || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                  {isEditing ? (
                    <input
                      type="text"
                        value={details?.address || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                      <p className="text-gray-900">{details?.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'passport' && (
          <div className="space-y-4">
            {!selectedChecks['personalIdentity.passport']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Passport History Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's passport details and travel history</p>
                <button
                  onClick={() => toggleCheck('personalIdentity.passport')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Passport Check - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Passport History Verification</h3>
                  <button
                    onClick={() => toggleCheck('personalIdentity.passport')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Expiry Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.email || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.email || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                        value={details?.state || ''}
                        onChange={(e) => handleInputChange('details.personalIdentity.state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                      <p className="text-gray-900">{details?.state || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderCriminalRecordContent = () => {
    const details = request.details?.criminalRecord
    const subTabs = [
      { key: 'criminalHistory', name: 'Criminal History', icon: AlertTriangle, price: 4000 },
      { key: 'financialCrime', name: 'Financial Crime', icon: AlertTriangle, price: 3500 },
      { key: 'courtRecords', name: 'Court Records', icon: AlertTriangle, price: 3000 },
      { key: 'sexOffenderRegistry', name: 'Sex Offender Registry', icon: AlertTriangle, price: 2500 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'criminalHistory' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.criminalHistory']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Criminal History Check</h3>
                <p className="text-gray-500 mb-4">Check for any criminal records or convictions</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.criminalHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Criminal History Check - ₦4,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Criminal History Check</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.criminalHistory')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Criminal Record Status</label>
                  {isEditing ? (
                    <select
                      value={details?.criminalHistory || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.criminalHistory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="clean">Clean Record</option>
                      <option value="minor">Minor Offenses</option>
                      <option value="serious">Serious Offenses</option>
                      <option value="pending">Pending Cases</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.criminalHistory || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'financialCrime' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.financialCrime']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Crime History</h3>
                <p className="text-gray-500 mb-4">Check for financial crimes and fraud-related offenses</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.financialCrime')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Financial Crime Check - ₦3,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Financial Crime History</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.financialCrime')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crime Type</label>
                  {isEditing ? (
                    <select
                        value={details?.courtRecords || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.courtRecords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select crime type</option>
                      <option value="fraud">Fraud</option>
                      <option value="embezzlement">Embezzlement</option>
                      <option value="money_laundering">Money Laundering</option>
                      <option value="tax_evasion">Tax Evasion</option>
                      <option value="identity_theft">Identity Theft</option>
                      <option value="none">No Financial Crimes</option>
                    </select>
                  ) : (
                      <p className="text-gray-900">{details?.courtRecords || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'courtRecords' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.courtRecords']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Court Records</h3>
                <p className="text-gray-500 mb-4">Search court records and legal proceedings</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.courtRecords')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Court Records Check - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Court Records</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.courtRecords')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Court Type</label>
                  {isEditing ? (
                    <select
                      value={details?.courtRecords || ''}
                      onChange={(e) => handleInputChange('details.criminalRecord.courtRecords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select court type</option>
                      <option value="federal">Federal Court</option>
                      <option value="state">State Court</option>
                      <option value="county">County Court</option>
                      <option value="municipal">Municipal Court</option>
                      <option value="none">No Court Records</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.courtRecords || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'sexOffenderRegistry' && (
          <div className="space-y-4">
            {!selectedChecks['criminalRecord.sexOffenderRegistry']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sex Offender Registry</h3>
                <p className="text-gray-500 mb-4">Check against sex offender registries</p>
                <button
                  onClick={() => toggleCheck('criminalRecord.sexOffenderRegistry')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Sex Offender Registry Check - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Sex Offender Registry</h3>
                  <button
                    onClick={() => toggleCheck('criminalRecord.sexOffenderRegistry')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registry Status</label>
                  {isEditing ? (
                    <select
                        value={details?.arrestRecords || ''}
                        onChange={(e) => handleInputChange('details.criminalRecord.arrestRecords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="clear">Clear</option>
                      <option value="registered">Registered</option>
                      <option value="pending">Pending Review</option>
                      <option value="expired">Registration Expired</option>
                    </select>
                  ) : (
                      <p className="text-gray-900">{details?.arrestRecords || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderFinancialCreditContent = () => {
    const details = request.details?.financialCredit
    const subTabs = [
      { key: 'creditReport', name: 'Credit Report', icon: CheckCircle, price: 2000 },
      { key: 'incomeSources', name: 'Income Sources', icon: CheckCircle, price: 2500 },
      { key: 'outstandingDebts', name: 'Outstanding Debts', icon: CheckCircle, price: 1800 },
      { key: 'businessFinancial', name: 'Business Financial', icon: CheckCircle, price: 3000 },
      { key: 'firsHistory', name: 'FIRS History', icon: CheckCircle, price: 2200 },
      { key: 'bankVerification', name: 'Bank Verification', icon: CheckCircle, price: 1500 },
      { key: 'loanHistory', name: 'Loan History', icon: CheckCircle, price: 2000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'creditReport' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.creditReport']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Credit Report Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's credit history and score</p>
                <button
                  onClick={() => toggleCheck('financialCredit.creditReport')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Credit Report Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Credit Report Verification</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.creditReport')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.creditScore || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter credit score"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Bureau</label>
                    {isEditing ? (
                      <select
                        value={details?.creditHistory || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select bureau</option>
                        <option value="experian">Experian</option>
                        <option value="equifax">Equifax</option>
                        <option value="transunion">TransUnion</option>
                        <option value="crc">CRC Credit Bureau</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit History Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.creditHistory || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter credit history summary"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'incomeSources' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.incomeSources']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Verified Income Sources</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's income sources and financial transactions</p>
                <button
                  onClick={() => toggleCheck('financialCredit.incomeSources')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Income Sources Check - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Verified Income Sources</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.incomeSources')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.creditScore || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter monthly income"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Income Source</label>
                    {isEditing ? (
                      <select
                        value={details?.creditHistory || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select source</option>
                        <option value="salary">Salary</option>
                        <option value="business">Business</option>
                        <option value="freelance">Freelance</option>
                        <option value="investment">Investment</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employer/Business Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.financialRecords || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.financialRecords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter employer or business name"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.financialRecords || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'outstandingDebts' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.outstandingDebts']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Outstanding Debts & Liabilities</h3>
                <p className="text-gray-500 mb-4">Check for outstanding debts and financial liabilities</p>
                <button
                  onClick={() => toggleCheck('financialCredit.outstandingDebts')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Outstanding Debts Check - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Outstanding Debts & Liabilities</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.outstandingDebts')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Outstanding Debt</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.creditScore || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditScore', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter total debt amount"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditScore || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Debt Status</label>
                    {isEditing ? (
                      <select
                        value={details?.creditHistory || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="current">Current</option>
                        <option value="overdue">Overdue</option>
                        <option value="settled">Settled</option>
                        <option value="none">No Outstanding Debts</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'bankVerification' && (
          <div className="space-y-4">
            {!selectedChecks['financialCredit.bankVerification']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bank Verification</h3>
                <p className="text-gray-500 mb-4">Verify bank account details and banking history</p>
                <button
                  onClick={() => toggleCheck('financialCredit.bankVerification')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Bank Verification - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Bank Verification</h3>
                  <button
                    onClick={() => toggleCheck('financialCredit.bankVerification')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.creditHistory || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter bank name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.financialRecords || ''}
                        onChange={(e) => handleInputChange('details.financialCredit.financialRecords', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter account number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.financialRecords || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                  {isEditing ? (
                    <select
                      value={details?.creditHistory || ''}
                      onChange={(e) => handleInputChange('details.financialCredit.creditHistory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="dormant">Dormant</option>
                      <option value="closed">Closed</option>
                      <option value="restricted">Restricted</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.creditHistory || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderAssociationContent = () => {
    const details = request.details?.association
    const subTabs = [
      { key: 'professionalBodies', name: 'Professional Bodies', icon: CheckCircle, price: 1500 },
      { key: 'alumniNetworks', name: 'Alumni Networks', icon: CheckCircle, price: 2000 },
      { key: 'exclusiveAssociations', name: 'Exclusive Associations', icon: CheckCircle, price: 2500 },
      { key: 'politicalExposure', name: 'Political Exposure', icon: CheckCircle, price: 3000 },
      { key: 'professionalAssociations', name: 'Professional Associations', icon: CheckCircle, price: 1200 },
      { key: 'businessAssociations', name: 'Business Associations', icon: CheckCircle, price: 1800 },
      { key: 'socialAssociations', name: 'Social Associations', icon: CheckCircle, price: 1000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'professionalBodies' && (
          <div className="space-y-4">
            {!selectedChecks['association.professionalBodies']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Bodies (NBA, ICAN, etc.)</h3>
                <p className="text-gray-500 mb-4">Verify membership in professional bodies and associations</p>
                <button
                  onClick={() => toggleCheck('association.professionalBodies')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Professional Bodies Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Professional Bodies (NBA, ICAN, etc.)</h3>
                  <button
                    onClick={() => toggleCheck('association.professionalBodies')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Body</label>
                    {isEditing ? (
                      <select
                        value={details?.knownAssociates || ''}
                        onChange={(e) => handleInputChange('details.association.knownAssociates', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select body</option>
                        <option value="nba">Nigerian Bar Association (NBA)</option>
                        <option value="ican">Institute of Chartered Accountants (ICAN)</option>
                        <option value="cima">Chartered Institute of Management Accountants (CIMA)</option>
                        <option value="pmi">Project Management Institute (PMI)</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.knownAssociates || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.familyConnections || ''}
                        onChange={(e) => handleInputChange('details.association.familyConnections', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter membership number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.familyConnections || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Membership Status</label>
                  {isEditing ? (
                    <select
                      value={details?.businessAssociations || ''}
                      onChange={(e) => handleInputChange('details.association.businessAssociations', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                      <option value="expired">Expired</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.businessAssociations || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'alumniNetworks' && (
          <div className="space-y-4">
            {!selectedChecks['association.alumniNetworks']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Alumni Networks (Harvard, Oxford, etc.)</h3>
                <p className="text-gray-500 mb-4">Verify alumni status and network connections</p>
                <button
                  onClick={() => toggleCheck('association.alumniNetworks')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Alumni Networks Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Alumni Networks (Harvard, Oxford, etc.)</h3>
                  <button
                    onClick={() => toggleCheck('association.alumniNetworks')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.knownAssociates || ''}
                        onChange={(e) => handleInputChange('details.association.knownAssociates', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter institution name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.knownAssociates || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.familyConnections || ''}
                        onChange={(e) => handleInputChange('details.association.familyConnections', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter graduation year"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.familyConnections || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Program</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={details?.businessAssociations || ''}
                      onChange={(e) => handleInputChange('details.association.businessAssociations', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter degree or program"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.businessAssociations || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'politicalExposure' && (
          <div className="space-y-4">
            {!selectedChecks['association.politicalExposure']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Political Exposure (PEPs)</h3>
                <p className="text-gray-500 mb-4">Check for politically exposed person status</p>
                <button
                  onClick={() => toggleCheck('association.politicalExposure')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Political Exposure Check - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Political Exposure (PEPs)</h3>
                  <button
                    onClick={() => toggleCheck('association.politicalExposure')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PEP Status</label>
                  {isEditing ? (
                    <select
                        value={details?.knownAssociates || ''}
                        onChange={(e) => handleInputChange('details.association.knownAssociates', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="not_pep">Not a PEP</option>
                      <option value="domestic_pep">Domestic PEP</option>
                      <option value="foreign_pep">Foreign PEP</option>
                      <option value="family_pep">Family Member of PEP</option>
                      <option value="close_associate">Close Associate of PEP</option>
                    </select>
                  ) : (
                      <p className="text-gray-900">{details?.knownAssociates || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Political Position</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.familyConnections || ''}
                        onChange={(e) => handleInputChange('details.association.familyConnections', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter political position (if applicable)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.familyConnections || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderMedicalContent = () => {
    const details = request.details?.medical
    const subTabs = [
      { key: 'medicalHistory', name: 'Medical History', icon: Clock, price: 2000 },
      { key: 'medicalRecords', name: 'Medical Records', icon: Clock, price: 2500 },
      { key: 'drugTest', name: 'Drug Test', icon: Clock, price: 3000 },
      { key: 'fitnessAssessment', name: 'Fitness Assessment', icon: Clock, price: 1500 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'medicalHistory' && (
          <div className="space-y-4">
            {!selectedChecks['medical.medicalHistory']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Medical History Check</h3>
                <p className="text-gray-500 mb-4">Review the candidate's medical history and health records</p>
                <button
                  onClick={() => toggleCheck('medical.medicalHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Medical History Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Medical History Check</h3>
                  <button
                    onClick={() => toggleCheck('medical.medicalHistory')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                    {isEditing ? (
                      <textarea
                        value={details?.medicalHistory || ''}
                        onChange={(e) => handleInputChange('details.medical.medicalHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        placeholder="Enter any known medical conditions"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.medicalHistory || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                    {isEditing ? (
                      <select
                        value={details?.healthRecords || ''}
                        onChange={(e) => handleInputChange('details.medical.healthRecords', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                        <option value="not_disclosed">Not Disclosed</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.healthRecords || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'drugTest' && (
          <div className="space-y-4">
            {!selectedChecks['medical.drugTest']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drug Test</h3>
                <p className="text-gray-500 mb-4">Conduct drug screening and substance abuse testing</p>
                <button
                  onClick={() => toggleCheck('medical.drugTest')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Drug Test - ₦3,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Drug Test</h3>
                  <button
                    onClick={() => toggleCheck('medical.drugTest')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                    {isEditing ? (
                      <select
                        value={details?.drugTest || ''}
                        onChange={(e) => handleInputChange('details.medical.drugTest', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select test type</option>
                        <option value="urine">Urine Test</option>
                        <option value="blood">Blood Test</option>
                        <option value="hair">Hair Test</option>
                        <option value="saliva">Saliva Test</option>
                        <option value="comprehensive">Comprehensive Panel</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.drugTest || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Result</label>
                    {isEditing ? (
                      <select
                        value={details?.medicalHistory || ''}
                        onChange={(e) => handleInputChange('details.medical.medicalHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select result</option>
                        <option value="negative">Negative</option>
                        <option value="positive">Positive</option>
                        <option value="inconclusive">Inconclusive</option>
                        <option value="pending">Pending</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.medicalHistory || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={details?.healthRecords || ''}
                      onChange={(e) => handleInputChange('details.medical.healthRecords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.healthRecords || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'fitnessAssessment' && (
          <div className="space-y-4">
            {!selectedChecks['medical.fitnessAssessment']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Fitness Assessment</h3>
                <p className="text-gray-500 mb-4">Evaluate physical fitness and capability for specific roles</p>
                <button
                  onClick={() => toggleCheck('medical.fitnessAssessment')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Fitness Assessment - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Fitness Assessment</h3>
                  <button
                    onClick={() => toggleCheck('medical.fitnessAssessment')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Physical Fitness Level</label>
                    {isEditing ? (
                      <select
                        value={details?.medicalHistory || ''}
                        onChange={(e) => handleInputChange('details.medical.medicalHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="below_average">Below Average</option>
                        <option value="poor">Poor</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.medicalHistory || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.drugTest || ''}
                        onChange={(e) => handleInputChange('details.medical.drugTest', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.drugTest || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Notes</label>
                  {isEditing ? (
                    <textarea
                      value={details?.healthRecords || ''}
                      onChange={(e) => handleInputChange('details.medical.healthRecords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter assessment notes and observations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.healthRecords || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderEmploymentContent = () => {
    const details = request.details?.employment
    const subTabs = [
      { key: 'employmentHistory', name: 'Employment History', icon: Clock, price: 2500 },
      { key: 'referenceCheck', name: 'Reference Check', icon: Clock, price: 2000 },
      { key: 'backgroundGapAnalysis', name: 'Background Gap Analysis', icon: Clock, price: 1800 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'employmentHistory' && (
          <div className="space-y-4">
            {!selectedChecks['employment.employmentHistory']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Employment History Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's employment history and work experience</p>
                <button
                  onClick={() => toggleCheck('employment.employmentHistory')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Employment History Check - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Employment History Verification</h3>
                  <button
                    onClick={() => toggleCheck('employment.employmentHistory')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Employer</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.currentEmployer || ''}
                        onChange={(e) => handleInputChange('details.employment.currentEmployer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current employer name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentEmployer || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position/Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.employmentHistory || ''}
                        onChange={(e) => handleInputChange('details.employment.employmentHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter current position"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.employmentHistory || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.currentEmployer || ''}
                        onChange={(e) => handleInputChange('details.employment.currentEmployer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentEmployer || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                    {isEditing ? (
                      <select
                        value={details?.previousEmployers || ''}
                        onChange={(e) => handleInputChange('details.employment.previousEmployers', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="terminated">Terminated</option>
                        <option value="resigned">Resigned</option>
                        <option value="contract">Contract</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.previousEmployers || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Employers</label>
                  {isEditing ? (
                    <textarea
                      value={details?.previousEmployers || ''}
                      onChange={(e) => handleInputChange('details.employment.previousEmployers', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter previous employers and positions"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.previousEmployers || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'referenceCheck' && (
          <div className="space-y-4">
            {!selectedChecks['employment.referenceCheck']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reference Check</h3>
                <p className="text-gray-500 mb-4">Contact and verify professional references</p>
                <button
                  onClick={() => toggleCheck('employment.referenceCheck')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Reference Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Reference Check</h3>
                  <button
                    onClick={() => toggleCheck('employment.referenceCheck')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.currentEmployer || ''}
                        onChange={(e) => handleInputChange('details.employment.currentEmployer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentEmployer || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Position</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.employmentHistory || ''}
                        onChange={(e) => handleInputChange('details.employment.employmentHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference position"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.employmentHistory || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Company</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.previousEmployers || ''}
                        onChange={(e) => handleInputChange('details.employment.previousEmployers', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter reference company"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.previousEmployers || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference Contact</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.currentEmployer || ''}
                        onChange={(e) => handleInputChange('details.employment.currentEmployer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter contact information"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentEmployer || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Feedback</label>
                  {isEditing ? (
                    <textarea
                      value={details?.employmentHistory || ''}
                      onChange={(e) => handleInputChange('details.employment.employmentHistory', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter reference feedback and comments"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.employmentHistory || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'backgroundGapAnalysis' && (
          <div className="space-y-4">
            {!selectedChecks['employment.backgroundGapAnalysis']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Background Gap Analysis</h3>
                <p className="text-gray-500 mb-4">Analyze gaps in employment history and background</p>
                <button
                  onClick={() => toggleCheck('employment.backgroundGapAnalysis')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Background Gap Analysis - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Background Gap Analysis</h3>
                  <button
                    onClick={() => toggleCheck('employment.backgroundGapAnalysis')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gap Period Start</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.currentEmployer || ''}
                        onChange={(e) => handleInputChange('details.employment.currentEmployer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.currentEmployer || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gap Period End</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.employmentHistory || ''}
                        onChange={(e) => handleInputChange('details.employment.employmentHistory', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.employmentHistory || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gap Explanation</label>
                  {isEditing ? (
                    <textarea
                      value={details?.previousEmployers || ''}
                      onChange={(e) => handleInputChange('details.employment.previousEmployers', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter explanation for employment gaps"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.previousEmployers || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gap Analysis Result</label>
                  {isEditing ? (
                    <select
                      value={details?.currentEmployer || ''}
                      onChange={(e) => handleInputChange('details.employment.currentEmployer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select result</option>
                      <option value="explained">Gap Explained</option>
                      <option value="unexplained">Gap Unexplained</option>
                      <option value="concerning">Concerning</option>
                      <option value="acceptable">Acceptable</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.currentEmployer || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderEducationContent = () => {
    const details = request.details?.education
    const subTabs = [
      { key: 'degreeVerification', name: 'Degree Verification', icon: AlertTriangle, price: 2000 },
      { key: 'transcriptVerification', name: 'Transcript Verification', icon: AlertTriangle, price: 2500 },
      { key: 'professionalCertifications', name: 'Professional Certifications', icon: AlertTriangle, price: 1500 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'degreeVerification' && (
          <div className="space-y-4">
            {!selectedChecks['education.degreeVerification']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Degree Verification</h3>
                <p className="text-gray-500 mb-4">Verify the candidate's educational degrees and qualifications</p>
                <button
                  onClick={() => toggleCheck('education.degreeVerification')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Degree Verification - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Degree Verification</h3>
                  <button
                    onClick={() => toggleCheck('education.degreeVerification')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.institution || ''}
                        onChange={(e) => handleInputChange('details.education.institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter institution name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.institution || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree Type</label>
                    {isEditing ? (
                      <select
                        value={details?.degree || ''}
                        onChange={(e) => handleInputChange('details.education.degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD/Doctorate</option>
                        <option value="diploma">Diploma</option>
                        <option value="certificate">Certificate</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.degree || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.degree || ''}
                        onChange={(e) => handleInputChange('details.education.degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter field of study"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.degree || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={details?.graduationDate || ''}
                        onChange={(e) => handleInputChange('details.education.graduationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter graduation year"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.graduationDate || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
                  {isEditing ? (
                    <select
                      value={details?.verificationStatus || ''}
                      onChange={(e) => handleInputChange('details.education.verificationStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="unverified">Unverified</option>
                      <option value="discrepancy">Discrepancy Found</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.verificationStatus || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'transcriptVerification' && (
          <div className="space-y-4">
            {!selectedChecks['education.transcriptVerification']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Transcript Verification</h3>
                <p className="text-gray-500 mb-4">Verify academic transcripts and grade records</p>
                <button
                  onClick={() => toggleCheck('education.transcriptVerification')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Transcript Verification - ₦2,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Transcript Verification</h3>
                  <button
                    onClick={() => toggleCheck('education.transcriptVerification')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA/CGPA</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.institution || ''}
                        onChange={(e) => handleInputChange('details.education.institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter GPA/CGPA"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.institution || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grading Scale</label>
                    {isEditing ? (
                      <select
                        value={details?.degree || ''}
                        onChange={(e) => handleInputChange('details.education.degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select scale</option>
                        <option value="4.0">4.0 Scale</option>
                        <option value="5.0">5.0 Scale</option>
                        <option value="100">100 Point Scale</option>
                        <option value="percentage">Percentage</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.degree || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Standing</label>
                  {isEditing ? (
                    <select
                      value={details?.graduationDate || ''}
                      onChange={(e) => handleInputChange('details.education.graduationDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select standing</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="satisfactory">Satisfactory</option>
                      <option value="poor">Poor</option>
                      <option value="probation">Academic Probation</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.graduationDate || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transcript Notes</label>
                  {isEditing ? (
                    <textarea
                      value={details?.verificationStatus || ''}
                      onChange={(e) => handleInputChange('details.education.verificationStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter any additional notes about the transcript"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.verificationStatus || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'professionalCertifications' && (
          <div className="space-y-4">
            {!selectedChecks['education.professionalCertifications']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Certifications</h3>
                <p className="text-gray-500 mb-4">Verify professional certifications and licenses</p>
                <button
                  onClick={() => toggleCheck('education.professionalCertifications')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Professional Certifications - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Professional Certifications</h3>
                  <button
                    onClick={() => toggleCheck('education.professionalCertifications')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.institution || ''}
                        onChange={(e) => handleInputChange('details.education.institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter certification name"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.institution || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.degree || ''}
                        onChange={(e) => handleInputChange('details.education.degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter issuing organization"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.degree || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certification Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.graduationDate || ''}
                        onChange={(e) => handleInputChange('details.education.graduationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter certification number"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.graduationDate || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={details?.verificationStatus || ''}
                        onChange={(e) => handleInputChange('details.education.verificationStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.verificationStatus || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certification Status</label>
                  {isEditing ? (
                    <select
                      value={details?.verificationStatus || ''}
                      onChange={(e) => handleInputChange('details.education.verificationStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                      <option value="suspended">Suspended</option>
                      <option value="revoked">Revoked</option>
                      <option value="pending">Pending</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.verificationStatus || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderSocialMediaContent = () => {
    const details = request.details?.socialMedia
    const subTabs = [
      { key: 'newsArticles', name: 'News Articles', icon: CheckCircle, price: 1000 },
      { key: 'onlineContent', name: 'Online Content', icon: CheckCircle, price: 1500 },
      { key: 'thoughtLeadership', name: 'Thought Leadership', icon: CheckCircle, price: 2000 },
      { key: 'socialMediaProfiles', name: 'Social Media Profiles', icon: CheckCircle, price: 1200 },
      { key: 'reputationScore', name: 'Reputation Score', icon: CheckCircle, price: 1800 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'newsArticles' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.newsArticles']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">News Articles & Public Mentions</h3>
                <p className="text-gray-500 mb-4">Search for news articles and public mentions (positive or negative)</p>
                <button
                  onClick={() => toggleCheck('socialMedia.newsArticles')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add News Articles Check - ₦1,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">News Articles & Public Mentions</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.newsArticles')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Keywords</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.socialProfiles || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter search keywords"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Period</label>
                    {isEditing ? (
                      <select
                        value={details?.onlinePresence || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.onlinePresence', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select period</option>
                        <option value="1_year">Last 1 Year</option>
                        <option value="2_years">Last 2 Years</option>
                        <option value="5_years">Last 5 Years</option>
                        <option value="all_time">All Time</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.onlinePresence || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Article Sentiment</label>
                  {isEditing ? (
                    <select
                      value={details?.reputationCheck || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.reputationCheck', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select sentiment</option>
                      <option value="positive">Positive</option>
                      <option value="negative">Negative</option>
                      <option value="neutral">Neutral</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{details?.reputationCheck || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Found Articles</label>
                  {isEditing ? (
                    <textarea
                      value={details?.socialProfiles || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="List found articles and their sources"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'onlineContent' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.onlineContent']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Online Content & Reputation Analysis</h3>
                <p className="text-gray-500 mb-4">Analyze online content and digital reputation</p>
                <button
                  onClick={() => toggleCheck('socialMedia.onlineContent')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Online Content Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Online Content & Reputation Analysis</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.onlineContent')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                    {isEditing ? (
                      <select
                        value={details?.socialProfiles || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="blog_posts">Blog Posts</option>
                        <option value="forum_posts">Forum Posts</option>
                        <option value="comments">Comments</option>
                        <option value="reviews">Reviews</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Sentiment</label>
                    {isEditing ? (
                      <select
                        value={details?.onlinePresence || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.onlinePresence', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select sentiment</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                        <option value="neutral">Neutral</option>
                        <option value="concerning">Concerning</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.onlinePresence || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platforms Checked</label>
                  {isEditing ? (
                    <textarea
                      value={details?.reputationCheck || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.reputationCheck', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="List platforms and websites checked"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.reputationCheck || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.socialProfiles || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter analysis summary and findings"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'socialMediaProfiles' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.socialMediaProfiles']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Social Media Profiles</h3>
                <p className="text-gray-500 mb-4">Check social media profiles and activity</p>
                <button
                  onClick={() => toggleCheck('socialMedia.socialMediaProfiles')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Social Media Profiles Check - ₦1,200
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Social Media Profiles</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.socialMediaProfiles')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                    {isEditing ? (
                      <select
                        value={details?.socialProfiles || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select platform</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter/X</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                        <option value="tiktok">TikTok</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Status</label>
                    {isEditing ? (
                      <select
                        value={details?.onlinePresence || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.onlinePresence', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="private">Private</option>
                        <option value="deleted">Deleted</option>
                        <option value="not_found">Not Found</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.onlinePresence || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile URL</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={details?.reputationCheck || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.reputationCheck', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter profile URL"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.reputationCheck || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Summary</label>
                  {isEditing ? (
                    <textarea
                      value={details?.socialProfiles || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter activity summary and observations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'reputationScore' && (
          <div className="space-y-4">
            {!selectedChecks['socialMedia.reputationScore']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reputation Score</h3>
                <p className="text-gray-500 mb-4">Calculate overall digital reputation score</p>
                <button
                  onClick={() => toggleCheck('socialMedia.reputationScore')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Reputation Score - ₦1,800
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Reputation Score</h3>
                  <button
                    onClick={() => toggleCheck('socialMedia.reputationScore')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overall Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.socialProfiles || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Score Category</label>
                    {isEditing ? (
                      <select
                        value={details?.onlinePresence || ''}
                        onChange={(e) => handleInputChange('details.socialMedia.onlinePresence', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        <option value="excellent">Excellent (90-100)</option>
                        <option value="good">Good (70-89)</option>
                        <option value="average">Average (50-69)</option>
                        <option value="poor">Poor (30-49)</option>
                        <option value="concerning">Concerning (0-29)</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.onlinePresence || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Score Breakdown</label>
                  {isEditing ? (
                    <textarea
                      value={details?.reputationCheck || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.reputationCheck', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter detailed score breakdown and factors"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.reputationCheck || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations</label>
                  {isEditing ? (
                    <textarea
                      value={details?.socialProfiles || ''}
                      onChange={(e) => handleInputChange('details.socialMedia.socialProfiles', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter recommendations based on reputation analysis"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.socialProfiles || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderFraudDetectionContent = () => {
    const details = request.details?.fraudDetection
    const subTabs = [
      { key: 'identityFraud', name: 'Identity Fraud', icon: CheckCircle, price: 2000 },
      { key: 'watchlistCheck', name: 'Watchlist Check', icon: CheckCircle, price: 1500 },
      { key: 'deviceFingerprint', name: 'Device Fingerprint', icon: CheckCircle, price: 1000 }
    ]

    return (
      <div className="space-y-6">
        {/* Sub-tabs */}
        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSubTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
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
        {selectedSubTab === 'identityFraud' && (
          <div className="space-y-4">
            {!selectedChecks['fraudDetection.identityFraud']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Identity Fraud Check</h3>
                <p className="text-gray-500 mb-4">Detect potential identity fraud and synthetic identity risks</p>
                <button
                  onClick={() => toggleCheck('fraudDetection.identityFraud')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Identity Fraud Check - ₦2,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Identity Fraud Check</h3>
                  <button
                    onClick={() => toggleCheck('fraudDetection.identityFraud')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fraud Risk Level</label>
                    {isEditing ? (
                      <select
                        value={details?.fraudAlerts || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.fraudAlerts', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select risk level</option>
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                        <option value="critical">Critical Risk</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.fraudAlerts || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Identity Verification Score</label>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={details?.identityTheft || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.identityTheft', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter score (0-100)"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.identityTheft || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fraud Indicators</label>
                  {isEditing ? (
                    <textarea
                      value={details?.suspiciousActivity || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.suspiciousActivity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="List any fraud indicators found"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.suspiciousActivity || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Methods Used</label>
                  {isEditing ? (
                    <textarea
                      value={details?.fraudAlerts || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.fraudAlerts', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="List verification methods and checks performed"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.fraudAlerts || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'watchlistCheck' && (
          <div className="space-y-4">
            {!selectedChecks['fraudDetection.watchlistCheck']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Watchlist Check</h3>
                <p className="text-gray-500 mb-4">Check against various watchlists and sanctions databases</p>
                <button
                  onClick={() => toggleCheck('fraudDetection.watchlistCheck')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Watchlist Check - ₦1,500
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Watchlist Check</h3>
                  <button
                    onClick={() => toggleCheck('fraudDetection.watchlistCheck')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Watchlist Status</label>
                    {isEditing ? (
                      <select
                        value={details?.fraudAlerts || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.fraudAlerts', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select status</option>
                        <option value="clear">Clear</option>
                        <option value="match">Match Found</option>
                        <option value="partial">Partial Match</option>
                        <option value="pending">Pending Review</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.fraudAlerts || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Databases Checked</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.identityTheft || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.identityTheft', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter databases checked"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.identityTheft || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Match Details</label>
                  {isEditing ? (
                    <textarea
                      value={details?.suspiciousActivity || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.suspiciousActivity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter details of any matches found"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.suspiciousActivity || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Assessment</label>
                  {isEditing ? (
                    <textarea
                      value={details?.fraudAlerts || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.fraudAlerts', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter risk assessment and recommendations"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.fraudAlerts || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedSubTab === 'deviceFingerprint' && (
          <div className="space-y-4">
            {!selectedChecks['fraudDetection.deviceFingerprint']?.selected ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Device Fingerprint</h3>
                <p className="text-gray-500 mb-4">Analyze device fingerprint for fraud detection</p>
                <button
                  onClick={() => toggleCheck('fraudDetection.deviceFingerprint')}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Add Device Fingerprint - ₦1,000
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Device Fingerprint</h3>
                  <button
                    onClick={() => toggleCheck('fraudDetection.deviceFingerprint')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                    {isEditing ? (
                      <select
                        value={details?.fraudAlerts || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.fraudAlerts', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select device type</option>
                        <option value="mobile">Mobile</option>
                        <option value="desktop">Desktop</option>
                        <option value="tablet">Tablet</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{details?.fraudAlerts || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Browser</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.identityTheft || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.identityTheft', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter browser information"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.identityTheft || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Operating System</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.suspiciousActivity || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.suspiciousActivity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter OS information"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.suspiciousActivity || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={details?.fraudAlerts || ''}
                        onChange={(e) => handleInputChange('details.fraudDetection.fraudAlerts', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter IP address"
                      />
                    ) : (
                      <p className="text-gray-900">{details?.fraudAlerts || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Risk Score</label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={details?.identityTheft || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.identityTheft', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter risk score (0-100)"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.identityTheft || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fingerprint Analysis</label>
                  {isEditing ? (
                    <textarea
                      value={details?.suspiciousActivity || ''}
                      onChange={(e) => handleInputChange('details.fraudDetection.suspiciousActivity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter device fingerprint analysis"
                    />
                  ) : (
                    <p className="text-gray-900">{details?.suspiciousActivity || 'Not provided'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderDetailContent = () => {
    switch (selectedCategory) {
      case 'personalIdentity':
        return renderPersonalIdentityContent()
      case 'criminalRecord':
        return renderCriminalRecordContent()
      case 'financialCredit':
        return renderFinancialCreditContent()
      case 'association':
        return renderAssociationContent()
      case 'medical':
        return renderMedicalContent()
      case 'employment':
        return renderEmploymentContent()
      case 'education':
        return renderEducationContent()
      case 'socialMedia':
        return renderSocialMediaContent()
      case 'fraudDetection':
        return renderFraudDetectionContent()
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

        {/* Candidate Information */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-500" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      value={request.candidateName}
                      onChange={(e) => handleInputChange('candidateName', e.target.value)}
                      className="bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none"
                      placeholder="Enter candidate name"
                    />
                  ) : (
                    request.candidateName || 'Unknown Candidate'
                  )}
                </h2>
              </div>
              <p className="text-gray-600 mt-1">
                {isEditing ? (
                  <input
                    type="email"
                    value={request.candidateEmail}
                    onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
                    className="bg-transparent border-b border-gray-300 focus:border-primary-500 outline-none"
                    placeholder="Enter email"
                  />
                ) : (
                  request.candidateEmail || 'No email provided'
                )}
              </p>
            </div>
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
                  const isCheckSelected = selectedChecks[category.key]?.selected || false
                  
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

          {/* Center Panel - Details */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {selectedCategory && (
                <div className="space-y-6">
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
                  {renderDetailContent()}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Payment Section */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              
              {getSelectedChecksList().length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {getSelectedChecksList().map((check, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{check.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">₦{check.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">₦{getTotalPrice().toLocaleString()}</span>
                    </div>
                    
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No background checks selected</p>
                  <p className="text-gray-400 text-xs mt-1">Click "Add" on any category to get started</p>
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
