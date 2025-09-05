import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Plus,
  Minus,
  Upload,
  Download,
  FileText,
  Users,
  Building,
  Briefcase,
  GraduationCap,
  Shield,
  CreditCard,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  Settings,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  Smartphone,
  Monitor,
  Tablet,
  Wifi,
  WifiOff,
  Battery,
  Power,
  Zap,
  Target,
  Award,
  Star,
  Flag,
  Bookmark,
  Archive,
  RefreshCw,
  Save,
  Send,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Laptop,
  Desktop,
  Printer,
  Scanner,
  HardDrive,
  Cpu,
  MemoryStick,
  Disc,
  Cd,
  Dvd,
  Usb,
  Bluetooth,
  Signal,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  PowerOff,
  Plug,
  Unplug,
  Flash,
  FlashOff,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Wind,
  Thermometer,
  Droplet,
  Flame,
  Snowflake,
  Umbrella,
  TreePine,
  TreeDeciduous,
  Flower,
  Leaf,
  Sprout,
  Bug,
  Bird,
  Fish,
  Heart,
  HeartOff,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Surprised,
  Confused,
  Tongue,
  Wink,
  Kiss,
  Hug,
  Hand,
  Handshake,
  Clap,
  Wave,
  Point,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  Tag,
  Label,
  Ticket,
  Gift,
  Package,
  Box,
  Container,
  Crate,
  Pallet,
  Truck,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Scooter,
  Skateboard,
  RollerSkate,
  Wheelchair,
  Stroller,
  Baby,
  Child,
  Adult,
  Senior,
  Male,
  Female,
  Transgender,
  NonBinary,
  GenderFluid,
  Agender,
  Bigender,
  Demigender,
  Pangender,
  TwoSpirit,
  Intersex,
  Asexual,
  Bisexual,
  Gay,
  Lesbian,
  Pansexual,
  Polysexual,
  Demisexual,
  Graysexual,
  Queer,
  Questioning,
  Ally,
  Pride,
  Rainbow,
  Trans,
  NonBinary as NonBinaryIcon,
  GenderFluid as GenderFluidIcon,
  Agender as AgenderIcon,
  Bigender as BigenderIcon,
  Demigender as DemigenderIcon,
  Pangender as PangenderIcon,
  TwoSpirit as TwoSpiritIcon,
  Intersex as IntersexIcon,
  Asexual as AsexualIcon,
  Bisexual as BisexualIcon,
  Gay as GayIcon,
  Lesbian as LesbianIcon,
  Pansexual as PansexualIcon,
  Polysexual as PolysexualIcon,
  Demisexual as DemisexualIcon,
  Graysexual as GraysexualIcon,
  Queer as QueerIcon,
  Questioning as QuestioningIcon,
  Ally as AllyIcon,
  Pride as PrideIcon,
  Rainbow as RainbowIcon,
  Trans as TransIcon
} from 'lucide-react'

// Types
interface VerificationSetup {
  type: string
  candidates: any[]
  attesters: any[]
  documents: any[]
  settings: any
}

interface WizardStep {
  id: string
  title: string
  description: string
  completed: boolean
}

const VerificationWizard: React.FC<{ onClose: () => void; onComplete: (setup: VerificationSetup) => void }> = ({ onClose, onComplete }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [verificationType, setVerificationType] = useState('')
  const [candidates, setCandidates] = useState<any[]>([])
  const [attesters, setAttesters] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [settings, setSettings] = useState<any>({})
  const [showCandidateForm, setShowCandidateForm] = useState(false)
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Individual',
    organization: ''
  })
  
  // Attester Configuration State
  const [showAttesterConfig, setShowAttesterConfig] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [verificationData, setVerificationData] = useState<any>(null)
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', ''])
  const [attesterConfig, setAttesterConfig] = useState({
    numberOfAttesters: 2,
    attesterTypes: ['Individual', 'Organization'],
    requirements: {
      minExperience: 1,
      requiredDocuments: ['ID', 'Certificate'],
      verificationLevel: 'Standard'
    },
    customRules: ''
  })

  const handleAddCandidate = () => {
    if (candidateForm.name && candidateForm.email) {
      const newCandidate = {
        id: Date.now(),
        name: candidateForm.name,
        email: candidateForm.email,
        phone: candidateForm.phone,
        type: candidateForm.type,
        organization: candidateForm.organization
      }
      setCandidates([...candidates, newCandidate])
      setCandidateForm({
        name: '',
        email: '',
        phone: '',
        type: 'Individual',
        organization: ''
      })
      setShowCandidateForm(false)
    }
  }

  const handleSaveAttesterConfig = () => {
    // Save attester configuration
    console.log('Saving attester configuration:', attesterConfig)
    setShowAttesterConfig(false)
    // TODO: Integrate with wizard flow and proceed to next step
  }

  const steps: WizardStep[] = [
    {
      id: 'type',
      title: 'Verification Type',
      description: 'Select the type of verification to initiate',
      completed: verificationType !== ''
    },
    {
      id: 'candidates',
      title: 'Add Candidates',
      description: 'Add individuals or entities to verify',
      completed: candidates.length > 0
    },
    {
      id: 'attesters',
      title: 'Attester & Document Setup',
      description: 'Configure attesters, requirements, and documents',
      completed: attesterConfig.numberOfAttesters > 0
    },
    {
      id: 'review',
      title: 'Review & Launch',
      description: 'Review configuration and launch verification',
      completed: false
    }
  ]

  const verificationTypes = [
    {
      id: 'individual',
      name: 'Individual Verification',
      description: 'Verify personal identity, credentials, and background',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'business',
      name: 'Business Verification',
      description: 'Verify company registration, licenses, and compliance',
      icon: Building,
      color: 'green'
    },
    {
      id: 'professional',
      name: 'Professional Verification',
      description: 'Verify professional licenses, certifications, and experience',
      icon: Briefcase,
      color: 'purple'
    },
    {
      id: 'academic',
      name: 'Academic Verification',
      description: 'Verify educational credentials, degrees, and transcripts',
      icon: GraduationCap,
      color: 'orange'
    },
    {
      id: 'compliance',
      name: 'Compliance Verification',
      description: 'Verify regulatory compliance and legal requirements',
      icon: Shield,
      color: 'red'
    }
  ]

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep)
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      console.log('Moving to step:', currentStep + 1)
    }
  }

  const handlePrevious = () => {
    console.log('Previous button clicked, current step:', currentStep)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      console.log('Moving to step:', currentStep - 1)
    }
  }

  const handleComplete = () => {
    console.log('Save Draft button clicked')
    const draftSetup = {
      type: verificationType,
      candidates,
      attesterConfig,
      documents,
      settings,
      timestamp: new Date().toISOString(),
      status: 'draft'
    }
    console.log('Saving draft setup:', draftSetup)
    onComplete(draftSetup)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Verification Type</h3>
              <p className="text-gray-600">Choose the type of verification you want to initiate</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setVerificationType(type.id)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    verificationType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      type.color === 'blue' ? 'bg-blue-100' :
                      type.color === 'green' ? 'bg-green-100' :
                      type.color === 'purple' ? 'bg-purple-100' :
                      type.color === 'orange' ? 'bg-orange-100' : 'bg-red-100'
                    }`}>
                      <type.icon className={`w-6 h-6 ${
                        type.color === 'blue' ? 'text-blue-600' :
                        type.color === 'green' ? 'text-green-600' :
                        type.color === 'purple' ? 'text-purple-600' :
                        type.color === 'orange' ? 'text-orange-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{type.name}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Candidates</h3>
              <p className="text-gray-600">Add individuals or entities to verify</p>
            </div>
            <div 
              className="bg-gray-50 p-6 rounded-lg"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Add Candidates</h4>
                <p className="text-gray-600 mb-4">Add candidates individually or upload a CSV file</p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Add Candidate button clicked')
                      setShowCandidateForm(true)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    type="button"
                  >
                    Add Candidate
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Upload CSV button clicked')
                      // Add multiple sample candidates for CSV upload simulation
                      const csvCandidates = [
                        {
                          id: Date.now() + 1,
                          name: 'Jane Smith',
                          email: 'jane.smith@example.com',
                          type: 'Individual'
                        },
                        {
                          id: Date.now() + 2,
                          name: 'Bob Johnson',
                          email: 'bob.johnson@example.com',
                          type: 'Individual'
                        }
                      ]
                      setCandidates([...candidates, ...csvCandidates])
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
                    type="button"
                  >
                    Upload CSV
                  </button>
                </div>
              </div>
            </div>
            
            {/* Display Added Candidates */}
            {candidates.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Added Candidates ({candidates.length})</h4>
                <div className="space-y-2">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{candidate.name}</p>
                          <p className="text-sm text-gray-500">{candidate.email}</p>
                          {candidate.phone && (
                            <p className="text-sm text-gray-500">{candidate.phone}</p>
                          )}
                          {candidate.organization && (
                            <p className="text-sm text-gray-500">{candidate.organization}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setCandidates(candidates.filter(c => c.id !== candidate.id))
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Attester & Document Setup</h3>
              <p className="text-gray-600">Configure attesters, requirements, and documents</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              {attesterConfig.numberOfAttesters > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Attester Configuration</h4>
                        <p className="text-sm text-gray-600">Configuration completed</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAttesterConfig(true)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-900 mb-1">Number of Attesters</h5>
                      <p className="text-sm text-gray-600">{attesterConfig.numberOfAttesters} attester{attesterConfig.numberOfAttesters > 1 ? 's' : ''}</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <h5 className="font-medium text-gray-900 mb-1">Verification Level</h5>
                      <p className="text-sm text-gray-600">{attesterConfig.requirements.verificationLevel}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Attester Types</h5>
                    <div className="flex flex-wrap gap-2">
                      {attesterConfig.attesterTypes.map((type, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-900 mb-2">Required Documents</h5>
                    <div className="flex flex-wrap gap-2">
                      {attesterConfig.requirements.requiredDocuments.map((doc, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Attester Configuration</h4>
                  <p className="text-gray-600 mb-4">Configure the number and type of attesters required</p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => {
                        setShowAttesterConfig(true)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Configure Attesters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review & Launch</h3>
              <p className="text-gray-600">Review your verification configuration and launch</p>
            </div>
            
            {/* Verification Summary */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Verification Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verification Type */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Verification Type</h5>
                  <p className="text-sm text-gray-600">
                    {verificationTypes.find(t => t.id === verificationType)?.name || 'Not selected'}
                  </p>
                </div>
                
                {/* Candidates */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Candidates</h5>
                  <p className="text-sm text-gray-600 mb-3">{candidates.length} candidate{candidates.length !== 1 ? 's' : ''} added</p>
                  {candidates.length > 0 && (
                    <div className="space-y-2">
                      {candidates.map((candidate, index) => (
                        <div key={candidate.id || index} className="bg-white p-3 rounded border text-xs">
                          <div className="font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-gray-600">{candidate.email}</div>
                          <div className="text-gray-500">{candidate.type} • {candidate.organization}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Attesters */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Attesters</h5>
                  <p className="text-sm text-gray-600">
                    {attesterConfig.numberOfAttesters} attester{attesterConfig.numberOfAttesters > 1 ? 's' : ''} required
                  </p>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {attesterConfig.attesterTypes.map((type, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Documents */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Required Documents</h5>
                  <div className="flex flex-wrap gap-1">
                    {attesterConfig.requirements.requiredDocuments.map((doc, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Launch Button */}
              <div className="mt-8 text-center">
                <button 
                  onClick={() => {
                    console.log('Launching verification with config:', {
                      verificationType,
                      candidates,
                      attesterConfig
                    })
                    
                    // Calculate verification cost
                    const baseCost = 50 // Base cost per verification
                    const candidateCost = candidates.length * 25 // $25 per candidate
                    const attesterCost = attesterConfig.numberOfAttesters * 15 // $15 per attester
                    const totalCost = baseCost + candidateCost + attesterCost
                    
                    // Store verification data for payment
                    const data = {
                      verificationType,
                      candidates,
                      attesterConfig,
                      cost: totalCost,
                      timestamp: new Date().toISOString()
                    }
                    
                    setVerificationData(data)
                    setShowWalletModal(true)
                  }}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
                >
                  Launch Verification
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ zIndex: 9999 }}
      onClick={() => {
        console.log('Backdrop clicked')
        onClose()
      }}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
        style={{ position: 'relative' }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Verification Setup Wizard</h2>
            <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
          </div>
          <button
            onClick={() => {
              console.log('X button clicked')
              onClose()
            }}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-2 rounded hover:bg-gray-100"
            title="Close wizard"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index < currentStep ? 'bg-green-500 text-white' :
                  index === currentStep ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="ml-4 w-8 h-0.5 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={() => {
              console.log('Previous button clicked')
              handlePrevious()
            }}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                console.log('Cancel button clicked')
                onClose()
              }}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            {currentStep === steps.length - 1 ? (
              <button
                onClick={() => {
                  console.log('Complete button clicked')
                  handleComplete()
                }}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Save Draft
              </button>
            ) : (
              <button
                onClick={() => {
                  console.log('Next button clicked')
                  handleNext()
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Candidate Form Modal */}
      {showCandidateForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 10000 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCandidateForm(false)
            }
          }}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-md mx-4 p-6"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Candidate</h3>
              <button
                onClick={() => setShowCandidateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={candidateForm.name}
                  onChange={(e) => setCandidateForm({...candidateForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter candidate's full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={candidateForm.email}
                  onChange={(e) => setCandidateForm({...candidateForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter candidate's email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={candidateForm.phone}
                  onChange={(e) => setCandidateForm({...candidateForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter candidate's phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={candidateForm.type}
                  onChange={(e) => setCandidateForm({...candidateForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Individual">Individual</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>
              
              {candidateForm.type === 'Organization' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={candidateForm.organization}
                    onChange={(e) => setCandidateForm({...candidateForm, organization: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter organization name"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCandidateForm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCandidate}
                disabled={!candidateForm.name || !candidateForm.email}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attester Configuration Modal */}
      {showAttesterConfig && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 10000 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAttesterConfig(false)
            }
          }}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Configure Attesters</h3>
              <button
                onClick={() => setShowAttesterConfig(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Number of Attesters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Attesters Required
                </label>
                <select
                  value={attesterConfig.numberOfAttesters}
                  onChange={(e) => setAttesterConfig({
                    ...attesterConfig,
                    numberOfAttesters: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value={1}>1 Attester</option>
                  <option value={2}>2 Attesters</option>
                  <option value={3}>3 Attesters</option>
                  <option value={4}>4 Attesters</option>
                  <option value={5}>5 Attesters</option>
                </select>
              </div>

              {/* Attester Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attester Types
                </label>
                <div className="space-y-2">
                  {['Individual', 'Organization', 'Government', 'Educational'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={attesterConfig.attesterTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAttesterConfig({
                              ...attesterConfig,
                              attesterTypes: [...attesterConfig.attesterTypes, type]
                            })
                          } else {
                            setAttesterConfig({
                              ...attesterConfig,
                              attesterTypes: attesterConfig.attesterTypes.filter(t => t !== type)
                            })
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Requirements</h4>
                
                {/* Minimum Experience */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Experience (years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={attesterConfig.requirements.minExperience}
                    onChange={(e) => setAttesterConfig({
                      ...attesterConfig,
                      requirements: {
                        ...attesterConfig.requirements,
                        minExperience: parseInt(e.target.value) || 0
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Required Documents */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Documents
                  </label>
                  <div className="space-y-2">
                    {['ID', 'Certificate', 'License', 'Degree', 'Passport', 'Driver License'].map((doc) => (
                      <label key={doc} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={attesterConfig.requirements.requiredDocuments.includes(doc)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAttesterConfig({
                                ...attesterConfig,
                                requirements: {
                                  ...attesterConfig.requirements,
                                  requiredDocuments: [...attesterConfig.requirements.requiredDocuments, doc]
                                }
                              })
                            } else {
                              setAttesterConfig({
                                ...attesterConfig,
                                requirements: {
                                  ...attesterConfig.requirements,
                                  requiredDocuments: attesterConfig.requirements.requiredDocuments.filter(d => d !== doc)
                                }
                              })
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Verification Level */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Level
                  </label>
                  <select
                    value={attesterConfig.requirements.verificationLevel}
                    onChange={(e) => setAttesterConfig({
                      ...attesterConfig,
                      requirements: {
                        ...attesterConfig.requirements,
                        verificationLevel: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Enhanced">Enhanced</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>

              {/* Custom Rules */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Rules (Optional)
                </label>
                <textarea
                  value={attesterConfig.customRules}
                  onChange={(e) => setAttesterConfig({
                    ...attesterConfig,
                    customRules: e.target.value
                  })}
                  placeholder="Enter any custom requirements or rules for attesters..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <button
                onClick={() => setShowAttesterConfig(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAttesterConfig}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Payment Modal */}
      {showWalletModal && verificationData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 10001 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowWalletModal(false)
            }
          }}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-md mx-4 p-6"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ₦{(verificationData.cost * 100).toLocaleString()}.00
              </div>
              <div className="text-sm text-gray-600">Verification Payment</div>
            </div>

            {/* Transaction Details */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">VERIFICATION</div>
                  <div className="font-medium text-gray-900">{verificationData.verificationType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">FOR</div>
                  <div className="font-medium text-gray-900">
                    {verificationData.candidates.length > 0 
                      ? verificationData.candidates[0].name 
                      : 'Multiple Candidates'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Section */}
            <div className="mb-6">
              <div className="bg-red-600 text-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-red-100 uppercase tracking-wide mb-1">WALLET</div>
                    <div className="text-2xl font-bold">₦420,132.00</div>
                  </div>
                  <div className="text-xs text-red-100">
                    Powered by SureBanker
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowWalletModal(false)}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Proceeding to OTP verification for:', verificationData)
                  setShowWalletModal(false)
                  setShowOTPModal(true)
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && verificationData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 10002 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowOTPModal(false)
            }
          }}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-md mx-4 p-6"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <Mail className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-green-600">OTP Verification</h2>
              </div>
              <button
                onClick={() => setShowOTPModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                We texted a verification code to <span className="font-semibold">+23470*******061</span>
              </p>
              <p className="text-gray-700">
                You are authorizing a payment of <span className="font-semibold">NGN {(verificationData.cost * 100).toLocaleString()}.00</span> on <span className="font-semibold">{new Date().toLocaleDateString()}</span> from your wallet.
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="mb-6">
              <div className="flex justify-center space-x-2">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otpCode]
                      newOtp[index] = e.target.value
                      setOtpCode(newOtp)
                      
                      // Auto-focus next input
                      if (e.target.value && index < 5) {
                        const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement
                        nextInput?.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
                        const prevInput = e.target.parentElement?.children[index - 1] as HTMLInputElement
                        prevInput?.focus()
                      }
                    }}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            {/* Request New Code */}
            <div className="mb-6 text-center">
              <span className="text-gray-600">Didn't receive the code? </span>
              <button className="text-red-600 underline hover:text-red-700">
                Request new code
              </button>
            </div>

            {/* Pay Button */}
            <button
              onClick={() => {
                const enteredOtp = otpCode.join('')
                if (enteredOtp.length === 6) {
                  console.log('OTP verified:', enteredOtp)
                  setShowOTPModal(false)
                  setShowSuccessModal(true)
                } else {
                  alert('Please enter the complete 6-digit OTP code')
                }
              }}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Pay
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && verificationData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 10003 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSuccessModal(false)
              onComplete?.(verificationData)
            }
          }}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-md mx-4 p-6 text-center"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setShowSuccessModal(false)
                  onComplete?.(verificationData)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Request Sent!!</h2>
              <p className="text-gray-700 mb-2">Verification Request has been sent to</p>
              <p className="text-lg font-semibold text-red-600">
                {verificationData.candidates.length > 0 
                  ? verificationData.candidates[0].name 
                  : 'Multiple Candidates'
                }
              </p>
            </div>

            {/* Done Button */}
            <button
              onClick={() => {
                setShowSuccessModal(false)
                onComplete?.(verificationData)
              }}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationWizard
