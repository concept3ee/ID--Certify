import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { 
  Upload, 
  User, 
  FileText, 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Home,
  FileCheck,
  Users
} from 'lucide-react'

interface VerificationType {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  requiredDocuments: string[]
  estimatedTime: string
}

interface Attester {
  id: string
  name: string
  email: string
  phone: string
  relationship: string
  status: 'pending' | 'verified' | 'rejected'
}

interface VerificationStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
}

const Verification = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedVerificationType, setSelectedVerificationType] = useState<string>('')
  const [currentStep, setCurrentStep] = useState(1)
  const [attesters, setAttesters] = useState<Attester[]>([])
  const [documents, setDocuments] = useState<File[]>([])

  const verificationTypes: VerificationType[] = [
    {
      id: 'identity',
      name: 'Identity Verification',
      description: 'Verify government-issued ID, passport, or other identity documents',
      icon: User,
      requiredDocuments: ['Government ID', 'Passport', 'Birth Certificate'],
      estimatedTime: '2-3 business days'
    },
    {
      id: 'academic',
      name: 'Academic Verification',
      description: 'Verify degrees, certificates, and academic transcripts',
      icon: GraduationCap,
      requiredDocuments: ['Degree Certificate', 'Academic Transcript', 'Institution Letter'],
      estimatedTime: '3-5 business days'
    },
    {
      id: 'professional',
      name: 'Professional Verification',
      description: 'Verify work history, employment records, and professional references',
      icon: Briefcase,
      requiredDocuments: ['Employment Letter', 'Reference Letters', 'Work Certificates'],
      estimatedTime: '5-7 business days'
    },
    {
      id: 'address',
      name: 'Address Verification',
      description: 'Verify residential and business addresses',
      icon: Home,
      requiredDocuments: ['Utility Bill', 'Bank Statement', 'Rental Agreement'],
      estimatedTime: '1-2 business days'
    },
    {
      id: 'background',
      name: 'Background Check',
      description: 'Comprehensive criminal record and background verification',
      icon: Shield,
      requiredDocuments: ['Consent Form', 'Identity Documents', 'Address Proof'],
      estimatedTime: '7-10 business days'
    },
    {
      id: 'document',
      name: 'Document Authentication',
      description: 'Authenticate legal documents, licenses, and certifications',
      icon: FileCheck,
      requiredDocuments: ['Original Document', 'Supporting Evidence', 'Notarization'],
      estimatedTime: '3-5 business days'
    }
  ]

  const verificationSteps: VerificationStep[] = [
    {
      id: 'personal-details',
      title: 'Personal Details',
      description: 'Enter your personal information',
      status: currentStep >= 1 ? 'completed' : 'pending'
    },
    {
      id: 'verification-type',
      title: 'Verification Type',
      description: 'Select the type of verification needed',
      status: currentStep >= 2 ? 'completed' : 'pending'
    },
    {
      id: 'document-upload',
      title: 'Document Upload',
      description: 'Upload required documents',
      status: currentStep >= 3 ? 'completed' : 'pending'
    },
    {
      id: 'attester-info',
      title: 'Attester Information',
      description: 'Add references and validators',
      status: currentStep >= 4 ? 'completed' : 'pending'
    },
    {
      id: 'review-submit',
      title: 'Review & Submit',
      description: 'Review and submit verification request',
      status: currentStep >= 5 ? 'completed' : 'pending'
    }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setDocuments(prev => [...prev, ...files])
  }

  const addAttester = () => {
    const newAttester: Attester = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      relationship: '',
      status: 'pending'
    }
    setAttesters(prev => [...prev, newAttester])
  }

  const updateAttester = (id: string, field: keyof Attester, value: string) => {
    setAttesters(prev => prev.map(attester => 
      attester.id === id ? { ...attester, [field]: value } : attester
    ))
  }

  const removeAttester = (id: string) => {
    setAttesters(prev => prev.filter(attester => attester.id !== id))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Select Verification Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {verificationTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedVerificationType(type.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedVerificationType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <type.icon className="h-6 w-6 text-primary-600" />
                    <h4 className="font-medium text-gray-900">{type.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">Required Documents:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {type.requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-primary-600 font-medium mt-2">
                      Estimated time: {type.estimatedTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        const selectedType = verificationTypes.find(t => t.id === selectedVerificationType)
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
            {selectedType && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Required Documents for {selectedType.name}</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {selectedType.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop files here, or click to select</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </label>
            </div>

            {documents.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
                {documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{file.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Attester Information</h3>
              <button
                onClick={addAttester}
                className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Attester
              </button>
            </div>
            
            <p className="text-sm text-gray-600">
              Add references and validators who can confirm your information. They will receive a notification to verify your details.
            </p>

            <div className="space-y-4">
              {attesters.map((attester) => (
                <div key={attester.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Attester {attesters.indexOf(attester) + 1}</h4>
                    <button
                      onClick={() => removeAttester(attester.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={attester.name}
                        onChange={(e) => updateAttester(attester.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={attester.email}
                        onChange={(e) => updateAttester(attester.id, 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={attester.phone}
                        onChange={(e) => updateAttester(attester.id, 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                      <select
                        value={attester.relationship}
                        onChange={(e) => updateAttester(attester.id, 'relationship', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select relationship</option>
                        <option value="employer">Employer</option>
                        <option value="colleague">Colleague</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="professor">Professor</option>
                        <option value="landlord">Landlord</option>
                        <option value="neighbor">Neighbor</option>
                        <option value="friend">Friend</option>
                        <option value="family">Family Member</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {attesters.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No attesters added yet. Click "Add Attester" to get started.</p>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review & Submit</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Verification Summary</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification Type:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {verificationTypes.find(t => t.id === selectedVerificationType)?.name}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents Uploaded:</span>
                  <span className="text-sm font-medium text-gray-900">{documents.length} files</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Attesters Added:</span>
                  <span className="text-sm font-medium text-gray-900">{attesters.length} people</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estimated Time:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {verificationTypes.find(t => t.id === selectedVerificationType)?.estimatedTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your attesters will receive email notifications</li>
                    <li>• They will review and confirm your information</li>
                    <li>• Our team will verify your documents</li>
                    <li>• You'll receive a unique verification ID upon completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Self-Verification</h1>
        <p className="text-gray-600">Complete your verification process to get a unique ID number</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Verification Progress</h2>
          <span className="text-sm text-gray-500">Step {currentStep} of 5</span>
        </div>
        
        <div className="flex items-center space-x-4 mb-8">
          {verificationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step.status === 'completed' 
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : step.status === 'in-progress'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {index < verificationSteps.length - 1 && (
                <div className={`w-16 h-0.5 ${
                  step.status === 'completed' ? 'bg-primary-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {verificationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                step.status === 'completed' 
                  ? 'bg-primary-600 text-white'
                  : step.status === 'in-progress'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <div>
                <h3 className={`text-sm font-medium ${
                  step.status === 'completed' ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
          disabled={currentStep === 5}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === 5 ? 'Submit Verification' : 'Next'}
        </button>
      </div>
    </div>
  )
}

export default Verification
