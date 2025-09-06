import React, { useState, useEffect } from 'react'
import { 
  Menu,
  X,
  Bell,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Send,
  Camera,
  FileText,
  Image,
  Mic,
  Paperclip,
  Download,
  Share2,
  Bookmark,
  Flag,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Phone,
  Video,
  Mail,
  Calendar,
  MapPin,
  User,
  Users,
  Building,
  Shield,
  CreditCard,
  FileText as Document,
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Target,
  Lock,
  Unlock,
  Key,
  Settings,
  HelpCircle,
  Info,
  ExternalLink,
  RefreshCw,
  Save,
  Copy,
  Cut,
  Paste,
  Undo,
  Redo,
  Maximize2,
  Minimize2,
  RotateCcw,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Wifi,
  Battery,
  Signal,
  Smartphone,
  Tablet,
  Monitor,
  Globe,
  Database,
  Server,
  Cloud,
  HardDrive,
  Cpu,
  MemoryStick,
  HardDrive as Storage,
  Wifi as Network,
  Battery as Power,
  Signal as Connectivity
} from 'lucide-react'

// Types
interface MobileWorkflow {
  id: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'rejected' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  assignedTo: string
  dueDate: string
  progress: number
  steps: MobileWorkflowStep[]
  attachments: string[]
  comments: MobileComment[]
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  offline: boolean
  lastSync: string
}

interface MobileWorkflowStep {
  id: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'skipped'
  type: 'approval' | 'verification' | 'document' | 'location' | 'photo' | 'signature'
  required: boolean
  estimatedTime: number
  instructions: string
  data?: any
}

interface MobileComment {
  id: string
  author: string
  message: string
  timestamp: string
  type: 'text' | 'voice' | 'image' | 'location'
  attachments?: string[]
}

interface MobileNotification {
  id: string
  title: string
  message: string
  type: 'workflow' | 'approval' | 'deadline' | 'system'
  priority: 'low' | 'medium' | 'high'
  timestamp: string
  read: boolean
  action?: string
}

const MobileWorkflow: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'detail' | 'step' | 'camera' | 'location'>('list')
  const [selectedWorkflow, setSelectedWorkflow] = useState<MobileWorkflow | null>(null)
  const [selectedStep, setSelectedStep] = useState<MobileWorkflowStep | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNotifications, setShowNotifications] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [networkStatus, setNetworkStatus] = useState<'connected' | 'weak' | 'disconnected'>('connected')

  // Mock data
  const workflows: MobileWorkflow[] = [
    {
      id: '1',
      name: 'Site Inspection Approval',
      description: 'Construction site safety inspection and approval',
      status: 'in_progress',
      priority: 'high',
      category: 'Safety',
      assignedTo: 'John Smith',
      dueDate: '2024-01-22T17:00:00Z',
      progress: 60,
      steps: [
        {
          id: '1',
          name: 'Take Photos',
          description: 'Capture photos of the construction site',
          status: 'completed',
          type: 'photo',
          required: true,
          estimatedTime: 15,
          instructions: 'Take clear photos of all safety equipment and work areas'
        },
        {
          id: '2',
          name: 'Location Check',
          description: 'Verify GPS location of the site',
          status: 'in_progress',
          type: 'location',
          required: true,
          estimatedTime: 5,
          instructions: 'Confirm you are at the correct construction site location'
        },
        {
          id: '3',
          name: 'Safety Checklist',
          description: 'Complete safety compliance checklist',
          status: 'pending',
          type: 'verification',
          required: true,
          estimatedTime: 20,
          instructions: 'Review and verify all safety requirements are met'
        },
        {
          id: '4',
          name: 'Digital Signature',
          description: 'Sign the inspection report',
          status: 'pending',
          type: 'signature',
          required: true,
          estimatedTime: 2,
          instructions: 'Provide your digital signature to approve the inspection'
        }
      ],
      attachments: ['site_photo_1.jpg', 'safety_checklist.pdf'],
      comments: [
        {
          id: '1',
          author: 'John Smith',
          message: 'Starting site inspection now',
          timestamp: '2024-01-20T10:30:00Z',
          type: 'text'
        },
        {
          id: '2',
          author: 'Safety Manager',
          message: 'Please ensure all safety equipment is visible in photos',
          timestamp: '2024-01-20T10:35:00Z',
          type: 'text'
        }
      ],
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: '123 Construction St, San Francisco, CA'
      },
      offline: false,
      lastSync: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      name: 'Document Verification',
      description: 'Verify customer identity documents',
      status: 'pending',
      priority: 'medium',
      category: 'Verification',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-01-21T12:00:00Z',
      progress: 0,
      steps: [
        {
          id: '1',
          name: 'ID Document Scan',
          description: 'Scan customer ID document',
          status: 'pending',
          type: 'document',
          required: true,
          estimatedTime: 10,
          instructions: 'Use camera to scan the front and back of the ID document'
        },
        {
          id: '2',
          name: 'Face Verification',
          description: 'Take customer photo for verification',
          status: 'pending',
          type: 'photo',
          required: true,
          estimatedTime: 5,
          instructions: 'Take a clear photo of the customer for identity verification'
        },
        {
          id: '3',
          name: 'Document Review',
          description: 'Review document authenticity',
          status: 'pending',
          type: 'verification',
          required: true,
          estimatedTime: 15,
          instructions: 'Verify document authenticity and match with customer'
        }
      ],
      attachments: [],
      comments: [],
      offline: false,
      lastSync: '2024-01-20T09:00:00Z'
    }
  ]

  const notifications: MobileNotification[] = [
    {
      id: '1',
      title: 'Site Inspection Due',
      message: 'Site inspection approval is due in 2 hours',
      type: 'deadline',
      priority: 'high',
      timestamp: '2024-01-20T08:00:00Z',
      read: false,
      action: 'view_workflow'
    },
    {
      id: '2',
      title: 'Document Approved',
      message: 'Your document verification has been approved',
      type: 'approval',
      priority: 'medium',
      timestamp: '2024-01-20T07:30:00Z',
      read: true
    },
    {
      id: '3',
      title: 'New Workflow Assigned',
      message: 'You have been assigned a new document verification workflow',
      type: 'workflow',
      priority: 'medium',
      timestamp: '2024-01-20T07:00:00Z',
      read: false,
      action: 'view_workflow'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="w-5 h-5" />
      case 'location': return <MapPin className="w-5 h-5" />
      case 'document': return <Document className="w-5 h-5" />
      case 'signature': return <Edit className="w-5 h-5" />
      case 'verification': return <Shield className="w-5 h-5" />
      case 'approval': return <CheckCircle className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
  }

  const getNetworkIcon = () => {
    switch (networkStatus) {
      case 'connected': return <Wifi className="w-4 h-4 text-green-500" />
      case 'weak': return <Wifi className="w-4 h-4 text-yellow-500" />
      case 'disconnected': return <Wifi className="w-4 h-4 text-red-500" />
      default: return <Wifi className="w-4 h-4 text-gray-500" />
    }
  }

  const getBatteryIcon = () => {
    if (batteryLevel > 75) return <Battery className="w-4 h-4 text-green-500" />
    if (batteryLevel > 25) return <Battery className="w-4 h-4 text-yellow-500" />
    return <Battery className="w-4 h-4 text-red-500" />
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || workflow.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {activeView !== 'list' && (
                <button
                  onClick={() => setActiveView('list')}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-lg font-semibold text-gray-900">Mobile Workflow</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Status Indicators */}
              <div className="flex items-center space-x-1">
                {getNetworkIcon()}
                {getBatteryIcon()}
                <span className="text-xs text-gray-500">{batteryLevel}%</span>
              </div>
              
              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        {activeView === 'list' && (
          <div className="px-4 pb-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute top-16 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pb-20">
        {/* Workflow List */}
        {activeView === 'list' && (
          <div className="p-4 space-y-3">
            {filteredWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                onClick={() => {
                  setSelectedWorkflow(workflow)
                  setActiveView('detail')
                }}
                className="bg-white rounded-lg border border-gray-200 p-4 active:bg-gray-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{workflow.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{workflow.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow.status)}`}>
                      {workflow.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(workflow.priority)}`}>
                      {workflow.priority}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Assigned to: {workflow.assignedTo}</span>
                  <span>Due: {new Date(workflow.dueDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{workflow.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${workflow.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">{workflow.steps.filter(s => s.status === 'completed').length}/{workflow.steps.length}</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Workflow Detail */}
        {activeView === 'detail' && selectedWorkflow && (
          <div className="p-4 space-y-4">
            {/* Workflow Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900">{selectedWorkflow.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedWorkflow.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedWorkflow.status)}`}>
                    {selectedWorkflow.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedWorkflow.priority)}`}>
                    {selectedWorkflow.priority}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Assigned to:</span>
                  <p className="font-medium text-gray-900">{selectedWorkflow.assignedTo}</p>
                </div>
                <div>
                  <span className="text-gray-600">Due Date:</span>
                  <p className="font-medium text-gray-900">{new Date(selectedWorkflow.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <p className="font-medium text-gray-900">{selectedWorkflow.category}</p>
                </div>
                <div>
                  <span className="text-gray-600">Progress:</span>
                  <p className="font-medium text-gray-900">{selectedWorkflow.progress}%</p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Workflow Steps</h3>
              <div className="space-y-3">
                {selectedWorkflow.steps.map((step, index) => (
                  <div
                    key={step.id}
                    onClick={() => {
                      setSelectedStep(step)
                      setActiveView('step')
                    }}
                    className={`p-3 rounded-lg border ${
                      step.status === 'completed' ? 'bg-green-50 border-green-200' :
                      step.status === 'in_progress' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    } active:bg-gray-100`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                         step.status === 'in_progress' ? <Clock className="w-4 h-4" /> :
                         <span className="text-xs font-bold">{index + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{step.name}</h4>
                        <p className="text-xs text-gray-600">{step.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStepIcon(step.type)}
                          <span className="text-xs text-gray-500">{step.estimatedTime} min</span>
                          {step.required && <span className="text-xs text-red-500">Required</span>}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            {selectedWorkflow.comments.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Comments</h3>
                <div className="space-y-3">
                  {selectedWorkflow.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{comment.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step Detail */}
        {activeView === 'step' && selectedStep && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedStep.status === 'completed' ? 'bg-green-500 text-white' :
                  selectedStep.status === 'in_progress' ? 'bg-blue-500 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {getStepIcon(selectedStep.type)}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900">{selectedStep.name}</h2>
                  <p className="text-sm text-gray-600">{selectedStep.description}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Instructions</h3>
                <p className="text-sm text-gray-600">{selectedStep.instructions}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-600">Estimated Time:</span>
                  <p className="font-medium text-gray-900">{selectedStep.estimatedTime} minutes</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p className="font-medium text-gray-900 capitalize">{selectedStep.status.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Step Actions */}
            <div className="space-y-3">
              {selectedStep.type === 'photo' && (
                <button
                  onClick={() => setActiveView('camera')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Take Photo</span>
                </button>
              )}
              
              {selectedStep.type === 'location' && (
                <button
                  onClick={() => setActiveView('location')}
                  className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Get Location</span>
                </button>
              )}
              
              {selectedStep.type === 'document' && (
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
                  <Document className="w-5 h-5" />
                  <span>Scan Document</span>
                </button>
              )}
              
              {selectedStep.type === 'signature' && (
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
                  <Edit className="w-5 h-5" />
                  <span>Add Signature</span>
                </button>
              )}
              
              {selectedStep.type === 'verification' && (
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Verify</span>
                </button>
              )}
              
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Add Comment</span>
              </button>
            </div>
          </div>
        )}

        {/* Camera View */}
        {activeView === 'camera' && (
          <div className="h-screen bg-black flex flex-col">
            <div className="flex items-center justify-between p-4 text-white">
              <button
                onClick={() => setActiveView('step')}
                className="p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="font-semibold">Take Photo</h2>
              <button className="p-2">
                <Settings className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white rounded-lg flex items-center justify-center">
                <Camera className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-center space-x-4">
              <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-white" />
              </button>
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-black" />
              </button>
              <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Location View */}
        {activeView === 'location' && (
          <div className="h-screen bg-gray-100 flex flex-col">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <button
                onClick={() => setActiveView('step')}
                className="p-2 text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="font-semibold text-gray-900">Location</h2>
              <button className="p-2 text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Getting Location...</h3>
                <p className="text-sm text-gray-600">Please allow location access</p>
              </div>
            </div>
            
            <div className="p-4 bg-white border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                Confirm Location
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center space-y-1 p-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-blue-600">Workflows</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Notifications</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Analytics</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileWorkflow
