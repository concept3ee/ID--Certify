import React, { useState } from 'react'
import VerificationWizard from './VerificationWizard'
import { 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  User,
  Building,
  Briefcase,
  GraduationCap,
  Shield,
  MoreVertical,
  RefreshCw,
  Settings,
  Bell,
  Mail,
  MessageSquare,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Star,
  Flag,
  Bookmark,
  Archive,
  Zap,
  Target,
  Award,
  Activity,
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
  MapPin,
  Phone,
  Mail as MailIcon,
  MessageCircle,
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Laptop,
  Printer,
  HardDrive,
  Cpu,
  MemoryStick,
  Disc,
  Usb,
  Bluetooth,
  Wifi as WifiIcon,
  Signal,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Power,
  PowerOff,
  Plug,
  Unplug,
  Zap as ZapIcon,
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
  Hand,
  Fingerprint,
  Scan,
  QrCode,
  Tag,
  Ticket,
  Gift,
  Package,
  Box,
  Container,
  Truck,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Baby,
  Rainbow,
} from 'lucide-react'

// Types
interface VerificationRequest {
  id: string
  candidateName: string
  candidateEmail: string
  verificationType: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'expired'
  submittedDate: string
  progress: {
    documents: number
    attesters: number
    completed: number
    total: number
  }
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
  dueDate?: string
  cost: number
  attesterCount: number
  documentsCount: number
}

interface VerificationStats {
  total: number
  completed: number
  inProgress: number
  pending: number
  failed: number
  expired: number
  totalCost: number
  avgTurnaroundTime: number
  successRate: number
}

const VerificationDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showInitiateModal, setShowInitiateModal] = useState(false)
  const [drafts, setDrafts] = useState<any[]>([])

  // Mock data
  const mockStats: VerificationStats = {
    total: 1247,
    completed: 1089,
    inProgress: 89,
    pending: 69,
    failed: 12,
    expired: 8,
    totalCost: 45680.50,
    avgTurnaroundTime: 2.3,
    successRate: 87.3
  }

  const mockVerificationRequests: VerificationRequest[] = [
    {
      id: 'ver-001',
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      verificationType: 'Professional Verification',
      status: 'completed',
      submittedDate: '2025-01-15T10:00:00Z',
      progress: { documents: 3, attesters: 2, completed: 5, total: 5 },
      priority: 'medium',
      assignedTo: 'Mike Chen',
      dueDate: '2025-01-20T17:00:00Z',
      cost: 150.00,
      attesterCount: 2,
      documentsCount: 3
    },
    {
      id: 'ver-002',
      candidateName: 'David Lee',
      candidateEmail: 'david.lee@email.com',
      verificationType: 'Academic Verification',
      status: 'in-progress',
      submittedDate: '2025-01-14T14:30:00Z',
      progress: { documents: 2, attesters: 1, completed: 2, total: 3 },
      priority: 'high',
      assignedTo: 'Lisa Wang',
      dueDate: '2025-01-18T17:00:00Z',
      cost: 125.00,
      attesterCount: 1,
      documentsCount: 2
    },
    {
      id: 'ver-003',
      candidateName: 'Maria Garcia',
      candidateEmail: 'maria.garcia@email.com',
      verificationType: 'Background Check',
      status: 'pending',
      submittedDate: '2025-01-16T09:15:00Z',
      progress: { documents: 4, attesters: 3, completed: 0, total: 7 },
      priority: 'urgent',
      assignedTo: 'Sarah Johnson',
      dueDate: '2025-01-19T17:00:00Z',
      cost: 200.00,
      attesterCount: 3,
      documentsCount: 4
    },
    {
      id: 'ver-004',
      candidateName: 'John Smith',
      candidateEmail: 'john.smith@email.com',
      verificationType: 'Identity Verification',
      status: 'completed',
      submittedDate: '2025-01-13T16:45:00Z',
      progress: { documents: 1, attesters: 1, completed: 2, total: 2 },
      priority: 'low',
      assignedTo: 'Mike Chen',
      dueDate: '2025-01-17T17:00:00Z',
      cost: 75.00,
      attesterCount: 1,
      documentsCount: 1
    },
    {
      id: 'ver-005',
      candidateName: 'Emily Chen',
      candidateEmail: 'emily.chen@email.com',
      verificationType: 'Professional Verification',
      status: 'failed',
      submittedDate: '2025-01-12T11:20:00Z',
      progress: { documents: 2, attesters: 2, completed: 1, total: 4 },
      priority: 'medium',
      assignedTo: 'Lisa Wang',
      dueDate: '2025-01-16T17:00:00Z',
      cost: 150.00,
      attesterCount: 2,
      documentsCount: 2
    }
  ]

  // Mock draft data
  const mockDrafts = [
    {
      id: 'draft-001',
      name: 'Employee Background Check - Q1 2025',
      type: 'Professional Verification',
      candidatesCount: 5,
      attestersCount: 3,
      lastModified: '2025-01-15T14:30:00Z',
      status: 'draft'
    },
    {
      id: 'draft-002', 
      name: 'University Degree Verification',
      type: 'Academic Verification',
      candidatesCount: 12,
      attestersCount: 2,
      lastModified: '2025-01-14T09:15:00Z',
      status: 'draft'
    },
    {
      id: 'draft-003',
      name: 'Contractor Credentials Check',
      type: 'Professional Verification', 
      candidatesCount: 8,
      attestersCount: 4,
      lastModified: '2025-01-13T16:45:00Z',
      status: 'draft'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4" />
      case 'pending': return <AlertTriangle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'expired': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const filteredRequests = mockVerificationRequests.filter(request => {
    const matchesSearch = searchQuery === '' || 
      request.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.verificationType.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesType = typeFilter === 'all' || request.verificationType === typeFilter
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const handleInitiateVerification = () => {
    setShowInitiateModal(true)
  }

  const handleWizardComplete = (setup: any) => {
    console.log('Verification setup completed:', setup)
    
    if (setup.status === 'draft') {
      // Save as draft
      const newDraft = {
        id: `draft-${Date.now()}`,
        name: `${setup.type} - ${new Date().toLocaleDateString()}`,
        type: setup.type,
        candidatesCount: setup.candidates?.length || 0,
        attestersCount: setup.attesterConfig?.numberOfAttesters || 0,
        lastModified: setup.timestamp,
        status: 'draft',
        data: setup
      }
      setDrafts(prev => [newDraft, ...prev])
      console.log('Draft saved:', newDraft)
    } else {
      // Launch verification
      console.log('Verification launched:', setup)
      // Here you would typically send the setup to your API
      // and refresh the verification requests list
    }
    
    setShowInitiateModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Verification Management</h1>
              <p className="text-gray-600 mt-2">Initiate verification requests for candidates and track their progress</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button
                onClick={handleInitiateVerification}
                className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Verification Request
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.completed.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.inProgress.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.pending.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Drafts Section */}
        {(drafts.length > 0 || mockDrafts.length > 0) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Saved Drafts</h2>
              <span className="text-sm text-gray-500">
                {drafts.length + mockDrafts.length} draft{(drafts.length + mockDrafts.length) !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...drafts, ...mockDrafts].map((draft) => (
                <div key={draft.id} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{draft.name}</h3>
                      <p className="text-xs text-gray-500">{draft.type}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {draft.candidatesCount} candidates
                      </span>
                      <span className="flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        {draft.attestersCount} attesters
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-3">
                    Last modified: {new Date(draft.lastModified).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        console.log('Continue draft:', draft)
                        // TODO: Load draft data into wizard
                      }}
                      className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      Continue
                    </button>
                    <button 
                      onClick={() => {
                        console.log('Launch draft:', draft)
                        // TODO: Launch verification from draft
                      }}
                      className="flex-1 px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                    >
                      Launch
                    </button>
                    <button 
                      onClick={() => {
                        console.log('Delete draft:', draft)
                        if (draft.id.startsWith('draft-')) {
                          setDrafts(prev => prev.filter(d => d.id !== draft.id))
                        }
                      }}
                      className="px-2 py-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search verification requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="expired">Expired</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Professional Verification">Professional</option>
                <option value="Academic Verification">Academic</option>
                <option value="Background Check">Background</option>
                <option value="Identity Verification">Identity</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Verification Requests Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Verification Requests</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.candidateName}</div>
                        <div className="text-sm text-gray-500">{request.candidateEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.verificationType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.submittedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(request.progress.completed / request.progress.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          {request.progress.completed}/{request.progress.total}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {request.progress.documents} docs, {request.progress.attesters} attesters
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(request.cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Wizard Modal */}
        {showInitiateModal && (
          <VerificationWizard
            onClose={() => {
              console.log('Wizard onClose called')
              setShowInitiateModal(false)
            }}
            onComplete={handleWizardComplete}
          />
        )}
      </div>
    </div>
  )
}

export default VerificationDashboard
