import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar as CalendarIcon,
  CreditCard,
  Check,
  Eye,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react'

interface VerificationRequest {
  id: string
  firstName: string
  middleName: string
  lastName: string
  verificationType: string
  status: 'active' | 'archived' | 'expired' | 'failed'
  score: number | null
  dateInitiated: string
  profileImage?: string
}

interface Candidate {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobRole: string
  startDate: string
  endDate: string
}

const Verification = () => {
  const [activeTab, setActiveTab] = useState<'initiated' | 'received'>('initiated')
  const [statusFilter, setStatusFilter] = useState<'active' | 'archived' | 'expired' | 'failed'>('active')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState('Start Jan 6, 2022 - End Jan 13, 2022')
  
  // Modal states
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  // Setup flow states
  const [selectedVerificationType, setSelectedVerificationType] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [attesterCount, setAttesterCount] = useState(2)
  const [attesterRelationships, setAttesterRelationships] = useState(['', ''])
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobRole: '',
    startDate: '',
    endDate: ''
  })

  // Get fields based on verification type
  const getVerificationFields = (verificationType: string) => {
    switch (verificationType) {
      case 'Job Verification':
        return {
          title: 'Job Information',
          fields: [
            { label: 'JOB TITLE', type: 'text', key: 'jobRole', placeholder: 'Enter job title' },
            { label: 'NAME OF ORGANISATION', type: 'text', key: 'company', placeholder: 'Enter organization name' },
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['Employment Verification', 'Background Check', 'Reference Check'] },
            { label: 'START DATE:', type: 'date', key: 'startDate' },
            { label: 'END DATE:', type: 'date', key: 'endDate' }
          ]
        }
      case 'Address Verification':
        return {
          title: 'Address Information',
          fields: [
            { label: 'STREET ADDRESS', type: 'text', key: 'streetAddress', placeholder: 'Enter street address' },
            { label: 'CITY', type: 'text', key: 'city', placeholder: 'Enter city' },
            { label: 'STATE/PROVINCE', type: 'text', key: 'state', placeholder: 'Enter state/province' },
            { label: 'POSTAL CODE', type: 'text', key: 'postalCode', placeholder: 'Enter postal code' },
            { label: 'COUNTRY', type: 'text', key: 'country', placeholder: 'Enter country' },
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['Residence Verification', 'Background Check', 'Credit Check'] }
          ]
        }
      case 'Education Verification':
        return {
          title: 'Education Information',
          fields: [
            { label: 'INSTITUTION NAME', type: 'text', key: 'institution', placeholder: 'Enter institution name' },
            { label: 'DEGREE/CERTIFICATE', type: 'text', key: 'degree', placeholder: 'Enter degree or certificate' },
            { label: 'FIELD OF STUDY', type: 'text', key: 'fieldOfStudy', placeholder: 'Enter field of study' },
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['Academic Verification', 'Employment Check', 'Professional License'] },
            { label: 'START DATE:', type: 'date', key: 'startDate' },
            { label: 'END DATE:', type: 'date', key: 'endDate' }
          ]
        }
      case 'Bank Reference Verification':
        return {
          title: 'Bank Reference Information',
          fields: [
            { label: 'BANK NAME', type: 'text', key: 'bankName', placeholder: 'Enter bank name' },
            { label: 'ACCOUNT TYPE', type: 'select', key: 'accountType', options: ['Savings', 'Current', 'Business', 'Credit'] },
            { label: 'ACCOUNT NUMBER', type: 'text', key: 'accountNumber', placeholder: 'Enter account number' },
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['Credit Check', 'Financial Assessment', 'Loan Application'] }
          ]
        }
      case 'Birth Certificate Verification':
        return {
          title: 'Birth Certificate Information',
          fields: [
            { label: 'PLACE OF BIRTH', type: 'text', key: 'birthPlace', placeholder: 'Enter place of birth' },
            { label: 'DATE OF BIRTH', type: 'date', key: 'dateOfBirth' },
            { label: 'PARENTS NAMES', type: 'text', key: 'parentsNames', placeholder: 'Enter parents names' },
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['Identity Verification', 'Legal Documentation', 'Citizenship Check'] }
          ]
        }
      case 'Vehicle Documents':
        return {
          title: 'Vehicle Information',
          fields: [
            { label: 'VEHICLE TYPE', type: 'select', key: 'vehicleType', options: ['Car', 'Motorcycle', 'Truck', 'Bus', 'Other'] },
            { label: 'LICENSE PLATE', type: 'text', key: 'licensePlate', placeholder: 'Enter license plate' },
            { label: 'REGISTRATION NUMBER', type: 'text', key: 'registrationNumber', placeholder: 'Enter registration number' },
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['Ownership Verification', 'Legal Compliance', 'Insurance Check'] }
          ]
        }
      case 'Personal Character':
        return {
          title: 'Personal Character Information',
          fields: [
            { label: 'REFERENCE NAME', type: 'text', key: 'referenceName', placeholder: 'Enter reference name' },
            { label: 'RELATIONSHIP', type: 'select', key: 'relationship', options: ['Employer', 'Colleague', 'Friend', 'Family', 'Professional'] },
            { label: 'REFERENCE CONTACT', type: 'text', key: 'referenceContact', placeholder: 'Enter reference contact' },
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['Character Assessment', 'Background Check', 'Employment Reference'] }
          ]
        }
      default:
        return {
          title: 'General Information',
          fields: [
            { label: 'VERIFICATION PURPOSE', type: 'select', key: 'purpose', options: ['General Verification', 'Background Check', 'Documentation'] }
          ]
        }
    }
  }

  const verificationRequests: VerificationRequest[] = [
    {
      id: '1',
      firstName: 'Adebolawale',
      middleName: 'Elijah',
      lastName: 'Elias',
      verificationType: 'Address Verification',
      status: 'active',
      score: null,
      dateInitiated: 'Jan 13, 2025'
    },
    {
      id: '2',
      firstName: 'Adebolawale',
      middleName: 'Elijah',
      lastName: 'Elias',
      verificationType: 'Passport',
      status: 'active',
      score: 56,
      dateInitiated: 'Jan 15, 2025'
    },
    {
      id: '3',
      firstName: 'Adebolawale',
      middleName: 'Elijah',
      lastName: 'Elias',
      verificationType: 'Driver License',
      status: 'active',
      score: 80,
      dateInitiated: 'Jan 22, 2025'
    }
  ]

  const verificationTypes = [
    'Job Verification',
    'Address Verification',
    'Bank Reference Verification',
    'Education Verification',
    'General Certification',
    'Birth Certificate Verification',
    'Death Certificate Verification',
    'Land Documents Verification',
    'Court Documents',
    'Business Agreement Documents',
    'Loan Documents',
    'Vehicle Documents',
    'Personal Character',
    'Rental Verification',
    'Invoice Verification',
    'Purchase Order Verification',
    'Association Membership Verification',
    'Guarantor Verification',
    'Collateral Verification',
    'Travel Documents Verification',
    'Estate Will & Trust Verification'
  ]

  const handleAddCandidate = () => {
    if (currentCandidate.firstName && currentCandidate.lastName) {
      setCandidates([...candidates, { ...currentCandidate, id: Date.now().toString() }])
      setCurrentCandidate({
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobRole: '',
        startDate: '',
        endDate: ''
      })
      setShowAddCandidateModal(false)
    }
  }

  const handleRemoveCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id))
  }

  const handleProceedToPayment = () => {
    setShowSetupModal(false)
    setShowPaymentModal(true)
  }

  const handlePaymentProceed = () => {
    setShowPaymentModal(false)
    setShowOtpModal(true)
  }

  const handleOtpSubmit = () => {
    setShowOtpModal(false)
    setShowSuccessModal(true)
  }

  const filteredRequests = verificationRequests.filter(request => {
    const matchesSearch = request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.verificationType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verification</h1>
        <p className="text-gray-600">Start and manage your verification processes</p>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex space-x-8 border-b border-gray-200">
        <button className="pb-2 px-1 font-medium text-sm text-primary-600 border-b-2 border-primary-600">
          Start Verification
        </button>
        <button className="pb-2 px-1 font-medium text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
          Status
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
        </button>
        <button className="pb-2 px-1 font-medium text-sm text-gray-500 hover:text-gray-700">
          History
        </button>
        <button className="pb-2 px-1 font-medium text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
          Pending
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">1</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex space-x-6">
        <button
          onClick={() => setStatusFilter('active')}
          className={`flex items-center gap-2 pb-2 px-1 font-medium text-sm ${
            statusFilter === 'active'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Active
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
        </button>
        <button
          onClick={() => setStatusFilter('archived')}
          className={`pb-2 px-1 font-medium text-sm ${
            statusFilter === 'archived'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Archived
        </button>
        <button
          onClick={() => setStatusFilter('expired')}
          className={`flex items-center gap-2 pb-2 px-1 font-medium text-sm ${
            statusFilter === 'expired'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Expired
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">4</span>
        </button>
        <button
          onClick={() => setStatusFilter('failed')}
          className={`pb-2 px-1 font-medium text-sm ${
            statusFilter === 'failed'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Failed
        </button>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search verification requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{dateRange}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => setShowSetupModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            <span>Start Verification</span>
          </button>
        </div>
      </div>

      {/* Verification Requests Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FIRST NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MIDDLE NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LAST NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VERIFICATION TYPE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SCORE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE INITIATED
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{request.firstName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.middleName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.verificationType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.score ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
                        {request.score}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">NIL</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.dateInitiated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button className="text-sm text-gray-500 hover:text-gray-700">← Previous</button>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 bg-primary-600 text-white rounded text-sm font-medium">1</button>
              <button className="w-8 h-8 text-gray-500 hover:text-gray-700 rounded text-sm">2</button>
              <button className="w-8 h-8 text-gray-500 hover:text-gray-700 rounded text-sm">3</button>
              <span className="text-gray-500">...</span>
              <button className="w-8 h-8 text-gray-500 hover:text-gray-700 rounded text-sm">8</button>
              <button className="w-8 h-8 text-gray-500 hover:text-gray-700 rounded text-sm">9</button>
              <button className="w-8 h-8 text-gray-500 hover:text-gray-700 rounded text-sm">10</button>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700">Next →</button>
          </div>
        </div>
      </div>

      {/* Setup Verification Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">Setup Verification</h2>
              <button 
                onClick={() => setShowSetupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Verification Type Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Select your verification type</h3>
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">SELECT VERIFICATION TYPE</label>
                <select
                  value={selectedVerificationType}
                  onChange={(e) => setSelectedVerificationType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select type verification</option>
                  {verificationTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-8 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Add Candidate Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Candidate</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddCandidateModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Candidate</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-pink-100 text-primary-600 rounded-lg hover:bg-pink-200">
                  <Download className="h-4 w-4" />
                  <span>Import CSV</span>
                </button>
              </div>
            </div>

            {/* Candidate Cards */}
            {candidates.map((candidate) => (
              <div key={candidate.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">FULL NAME: {candidate.firstName} {candidate.middleName} {candidate.lastName}</p>
                      <p className="text-sm text-gray-600">EMAIL ADDRESS: {candidate.email}</p>
                      <p className="text-sm text-gray-600">COMPANY: {candidate.company}</p>
                      <p className="text-sm text-gray-600">JOB ROLE: {candidate.jobRole}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-sm text-gray-600 hover:text-gray-800">Edit</button>
                    <button 
                      onClick={() => handleRemoveCandidate(candidate.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Attester Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm font-medium text-gray-900">NO ATTESTERS:</span>
                <select
                  value={attesterCount}
                  onChange={(e) => setAttesterCount(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: attesterCount }).map((_, index) => (
                  <div key={index}>
                    <label className="block text-xs font-medium text-gray-700 mb-1 uppercase">RELATIONSHIP:</label>
                    <select
                      value={attesterRelationships[index] || ''}
                      onChange={(e) => {
                        const newRelationships = [...attesterRelationships]
                        newRelationships[index] = e.target.value
                        setAttesterRelationships(newRelationships)
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="">Select Relationship</option>
                      <option value="employer">Employer</option>
                      <option value="colleague">Colleague</option>
                      <option value="friend">Friend</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleProceedToPayment}
              disabled={!selectedVerificationType || candidates.length === 0}
              className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      {/* Add Candidate Modal */}
      {showAddCandidateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4">
              <button 
                onClick={() => setShowAddCandidateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">Add Candidate</h2>
              <button 
                onClick={() => setShowAddCandidateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Candidate Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">FIRST NAME</label>
                  <input
                    type="text"
                    value={currentCandidate.firstName}
                    onChange={(e) => setCurrentCandidate({...currentCandidate, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">MIDDLE NAME</label>
                  <input
                    type="text"
                    value={currentCandidate.middleName}
                    onChange={(e) => setCurrentCandidate({...currentCandidate, middleName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={currentCandidate.email}
                    onChange={(e) => setCurrentCandidate({...currentCandidate, email: e.target.value})}
                    placeholder="Email Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">PHONE NUMBER</label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 min-w-[80px]">
                      <span className="text-sm">🇳🇬</span>
                      <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={currentCandidate.phone}
                      onChange={(e) => setCurrentCandidate({...currentCandidate, phone: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Verification Information */}
            {selectedVerificationType && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {getVerificationFields(selectedVerificationType).title}
                </h3>
                <div className="space-y-4">
                  {getVerificationFields(selectedVerificationType).fields.map((field, index) => (
                    <div key={index} className={field.type === 'date' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
                      {field.type === 'date' ? (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">{field.label}</label>
                          <div className="flex">
                            <input
                              type="text"
                              placeholder="MM/DD/YY"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <div className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50">
                              <CalendarIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      ) : field.type === 'select' ? (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">{field.label}</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                            <option value="">Select {field.label.replace(':', '')}</option>
                            {field.options?.map((option, optIndex) => (
                              <option key={optIndex} value={option.toLowerCase().replace(/\s+/g, '_')}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">{field.label}</label>
                            <input
                              type="text"
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleAddCandidate}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700"
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-4">₦4,500.00</div>
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600">VERIFICATION</div>
                  <div className="font-medium">Job Verification</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">FOR</div>
                  <div className="font-medium">Nene Oyinda Afamefuna</div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4 relative">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">WALLET</div>
                    <div className="text-xl font-bold">₦420,132.00</div>
                  </div>
                  <div className="text-xs text-gray-500">Powered by SureBanker</div>
                </div>
              </div>
              <button
                onClick={handlePaymentProceed}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <div className="text-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">OTP Verification</h3>
              <p className="text-sm text-gray-600 mb-4">
                We texted a verification code to <strong>+23470*******061</strong>
              </p>
              <p className="text-sm text-gray-600 mb-6">
                You are authorizing a payment of <strong>NGN 5,000.00</strong> on <strong>1/12/2025</strong> from your wallet
              </p>
              <div className="flex justify-center space-x-2 mb-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 mb-6">
                Didn't receive the code? <button className="text-primary-600 font-medium">Request new code</button>
              </div>
              <button
                onClick={handleOtpSubmit}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Verification Request Sent!!</h3>
            <p className="text-gray-600 mb-6">
              Verification Request has been sent to <strong className="text-red-600">Nene Oyinda Afamefuna</strong>
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Verification
