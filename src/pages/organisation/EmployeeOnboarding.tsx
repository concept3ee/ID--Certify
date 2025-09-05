import React, { useState } from 'react'
import { 
  User, 
  Building, 
  Shield, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  X,
  Upload,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserPlus,
  Briefcase,
  CreditCard,
  AlertCircle,
  Check,
  Clock
} from 'lucide-react'

interface OnboardingData {
  // Step 1: Personal Information
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    city: string
    state: string
    zipCode: string
    emergencyContact: {
      name: string
      relationship: string
      phone: string
    }
  }
  
  // Step 2: Employment Information
  employmentInfo: {
    employeeId: string
    department: string
    position: string
    manager: string
    hireDate: string
    employmentType: 'full-time' | 'part-time' | 'contract' | 'intern'
    salary: string
    workLocation: string
    workSchedule: string
  }
  
  // Step 3: Documents & Verification
  documents: {
    requiredDocuments: string[]
    uploadedDocuments: { [key: string]: File | null }
    documentStatus: { [key: string]: 'pending' | 'uploaded' | 'verified' | 'rejected' }
  }
  
  // Step 4: Access & Permissions
  accessInfo: {
    role: string
    permissions: string[]
    systemAccess: string[]
    emailAccess: boolean
    systemAccessEnabled: boolean
    documentAccess: boolean
  }
  
  // Step 5: Review & Confirmation
  review: {
    termsAccepted: boolean
    privacyPolicyAccepted: boolean
    dataProcessingConsent: boolean
    welcomeEmailSent: boolean
  }
}

const EmployeeOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    },
    employmentInfo: {
      employeeId: '',
      department: '',
      position: '',
      manager: '',
      hireDate: '',
      employmentType: 'full-time',
      salary: '',
      workLocation: '',
      workSchedule: '9:00 AM - 5:00 PM'
    },
    documents: {
      requiredDocuments: ['NIN', 'Passport', 'CAC', 'Bank Account Details', 'Emergency Contact Form'],
      uploadedDocuments: {},
      documentStatus: {}
    },
    accessInfo: {
      role: '',
      permissions: [],
      systemAccess: [],
      emailAccess: true,
      systemAccessEnabled: true,
      documentAccess: false
    },
    review: {
      termsAccepted: false,
      privacyPolicyAccepted: false,
      dataProcessingConsent: false,
      welcomeEmailSent: false
    }
  })

  const [showOnboardingModal, setShowOnboardingModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const steps = [
    { id: 1, title: 'Personal Info', icon: User, description: 'Basic personal information' },
    { id: 2, title: 'Employment', icon: Briefcase, description: 'Job details and position' },
    { id: 3, title: 'Documents', icon: FileText, description: 'Required documents upload' },
    { id: 4, title: 'Access', icon: Shield, description: 'System access and permissions' },
    { id: 5, title: 'Review', icon: CheckCircle, description: 'Review and confirm' }
  ]

  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations', 'Legal', 'IT']
  const roles = ['Employee', 'Manager', 'Senior Manager', 'Director', 'Admin', 'HR Admin']
  const permissions = [
    'View Employee Directory',
    'Edit Employee Information',
    'Access Verification System',
    'View Reports',
    'Manage Documents',
    'System Administration'
  ]

  const handleInputChange = (section: keyof OnboardingData, field: string, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleNestedInputChange = (section: keyof OnboardingData, parentField: string, field: string, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...(prev[section] as any)[parentField],
          [field]: value
        }
      }
    }))
  }

  const handleFileUpload = (documentType: string, file: File) => {
    setOnboardingData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        uploadedDocuments: {
          ...prev.documents.uploadedDocuments,
          [documentType]: file
        },
        documentStatus: {
          ...prev.documents.documentStatus,
          [documentType]: 'uploaded'
        }
      }
    }))
  }

  const handlePermissionToggle = (permission: string) => {
    setOnboardingData(prev => ({
      ...prev,
      accessInfo: {
        ...prev.accessInfo,
        permissions: prev.accessInfo.permissions.includes(permission)
          ? prev.accessInfo.permissions.filter(p => p !== permission)
          : [...prev.accessInfo.permissions, permission]
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate employee ID
    const employeeId = `EMP${Date.now().toString().slice(-6)}`
    
    // Update with generated ID
    setOnboardingData(prev => ({
      ...prev,
      employmentInfo: {
        ...prev.employmentInfo,
        employeeId
      }
    }))
    
    setIsSubmitting(false)
    setShowSuccessModal(true)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={onboardingData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={onboardingData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={onboardingData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={onboardingData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={onboardingData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                  <input
                    type="text"
                    value={onboardingData.personalInfo.address}
                    onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={onboardingData.personalInfo.city}
                    onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={onboardingData.personalInfo.state}
                    onChange={(e) => handleInputChange('personalInfo', 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={onboardingData.personalInfo.zipCode}
                    onChange={(e) => handleInputChange('personalInfo', 'zipCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                  <input
                    type="text"
                    value={onboardingData.personalInfo.emergencyContact.name}
                    onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                  <input
                    type="text"
                    value={onboardingData.personalInfo.emergencyContact.relationship}
                    onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'relationship', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Spouse, Parent, Sibling"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={onboardingData.personalInfo.emergencyContact.phone}
                    onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                <select
                  value={onboardingData.employmentInfo.department}
                  onChange={(e) => handleInputChange('employmentInfo', 'department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                <input
                  type="text"
                  value={onboardingData.employmentInfo.position}
                  onChange={(e) => handleInputChange('employmentInfo', 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter job position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manager *</label>
                <input
                  type="text"
                  value={onboardingData.employmentInfo.manager}
                  onChange={(e) => handleInputChange('employmentInfo', 'manager', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter manager name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date *</label>
                <input
                  type="date"
                  value={onboardingData.employmentInfo.hireDate}
                  onChange={(e) => handleInputChange('employmentInfo', 'hireDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
                <select
                  value={onboardingData.employmentInfo.employmentType}
                  onChange={(e) => handleInputChange('employmentInfo', 'employmentType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="intern">Intern</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                <input
                  type="text"
                  value={onboardingData.employmentInfo.salary}
                  onChange={(e) => handleInputChange('employmentInfo', 'salary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter salary (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Location *</label>
                <input
                  type="text"
                  value={onboardingData.employmentInfo.workLocation}
                  onChange={(e) => handleInputChange('employmentInfo', 'workLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter work location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Schedule</label>
                <input
                  type="text"
                  value={onboardingData.employmentInfo.workSchedule}
                  onChange={(e) => handleInputChange('employmentInfo', 'workSchedule', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                <p className="text-sm text-blue-800">
                  Please upload all required documents. Supported formats: PDF, JPG, PNG (Max 10MB each)
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {onboardingData.documents.requiredDocuments.map((docType) => (
                <div key={docType} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{docType}</h3>
                      <p className="text-xs text-gray-500">Required document</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {onboardingData.documents.documentStatus[docType] === 'uploaded' && (
                        <span className="flex items-center text-green-600 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Uploaded
                        </span>
                      )}
                      {onboardingData.documents.documentStatus[docType] === 'verified' && (
                        <span className="flex items-center text-green-600 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(docType, file)
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    
                    {onboardingData.documents.uploadedDocuments[docType] && (
                      <span className="text-sm text-gray-600">
                        {onboardingData.documents.uploadedDocuments[docType]?.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                <select
                  value={onboardingData.accessInfo.role}
                  onChange={(e) => handleInputChange('accessInfo', 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Access</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={onboardingData.accessInfo.emailAccess}
                    onChange={(e) => handleInputChange('accessInfo', 'emailAccess', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Email Access</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={onboardingData.accessInfo.systemAccessEnabled}
                    onChange={(e) => handleInputChange('accessInfo', 'systemAccessEnabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">System Access</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={onboardingData.accessInfo.documentAccess}
                    onChange={(e) => handleInputChange('accessInfo', 'documentAccess', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Document Access</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {permissions.map((permission) => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={onboardingData.accessInfo.permissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Personal Information</h4>
                  <p className="text-sm text-gray-600">
                    {onboardingData.personalInfo.firstName} {onboardingData.personalInfo.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{onboardingData.personalInfo.email}</p>
                  <p className="text-sm text-gray-600">{onboardingData.personalInfo.phone}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Employment Information</h4>
                  <p className="text-sm text-gray-600">
                    {onboardingData.employmentInfo.position} - {onboardingData.employmentInfo.department}
                  </p>
                  <p className="text-sm text-gray-600">Manager: {onboardingData.employmentInfo.manager}</p>
                  <p className="text-sm text-gray-600">Hire Date: {onboardingData.employmentInfo.hireDate}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Documents</h4>
                  <p className="text-sm text-gray-600">
                    {Object.values(onboardingData.documents.documentStatus).filter(status => status === 'uploaded').length} of {onboardingData.documents.requiredDocuments.length} documents uploaded
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Access & Permissions</h4>
                  <p className="text-sm text-gray-600">Role: {onboardingData.accessInfo.role}</p>
                  <p className="text-sm text-gray-600">
                    {onboardingData.accessInfo.permissions.length} permissions assigned
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Terms & Conditions</h3>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={onboardingData.review.termsAccepted}
                  onChange={(e) => handleInputChange('review', 'termsAccepted', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I accept the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Employee Agreement</a>
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={onboardingData.review.privacyPolicyAccepted}
                  onChange={(e) => handleInputChange('review', 'privacyPolicyAccepted', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I have read and agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={onboardingData.review.dataProcessingConsent}
                  onChange={(e) => handleInputChange('review', 'dataProcessingConsent', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I consent to the processing of my personal data for employment purposes
                </span>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.personalInfo.firstName && 
               onboardingData.personalInfo.lastName && 
               onboardingData.personalInfo.email && 
               onboardingData.personalInfo.phone
      case 2:
        return onboardingData.employmentInfo.department && 
               onboardingData.employmentInfo.position && 
               onboardingData.employmentInfo.manager && 
               onboardingData.employmentInfo.hireDate
      case 3:
        return Object.values(onboardingData.documents.documentStatus).some(status => status === 'uploaded')
      case 4:
        return onboardingData.accessInfo.role
      case 5:
        return onboardingData.review.termsAccepted && 
               onboardingData.review.privacyPolicyAccepted && 
               onboardingData.review.dataProcessingConsent
      default:
        return false
    }
  }

  return (
    <>
      {/* Onboarding Modal */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Progress Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Step {currentStep} of 5: {steps[currentStep - 1].title}</p>
              </div>
              <button 
                onClick={() => setShowOnboardingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep > step.id 
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="ml-2 hidden sm:block">
                      <p className={`text-xs font-medium ${
                        currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {renderStepContent()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              <div className="flex items-center space-x-3">
                {currentStep < 5 ? (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isSubmitting}
                    className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Onboarding
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Onboarding Complete!</h3>
              <p className="text-gray-600 mb-4">
                Employee {onboardingData.personalInfo.firstName} {onboardingData.personalInfo.lastName} has been successfully onboarded.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Employee ID: {onboardingData.employmentInfo.employeeId}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✅ Account created and activated</p>
                <p>✅ Welcome email sent</p>
                <p>✅ Verification process initiated</p>
                <p>✅ System access configured</p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => {
                  setShowSuccessModal(false)
                  setShowOnboardingModal(false)
                  setCurrentStep(1)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button 
        onClick={() => setShowOnboardingModal(true)}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Start Onboarding
      </button>
    </>
  )
}

export default EmployeeOnboarding
