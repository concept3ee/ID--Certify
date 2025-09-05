import React, { useState } from 'react'
import { 
  Users,
  UserPlus,
  UserMinus,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Share2,
  MessageSquare,
  Bell,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  ExternalLink,
  Copy,
  Send,
  FileText,
  BarChart3,
  Activity,
  TrendingUp,
  Building,
  User,
  UserCheck,
  UserX,
  Crown,
  Key,
  Database,
  Globe,
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
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Star,
  Flag,
  Bookmark,
  Archive,
  RefreshCw,
  X
} from 'lucide-react'

// Types
interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'reviewer' | 'viewer'
  department: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
  permissions: {
    canView: boolean
    canEdit: boolean
    canDelete: boolean
    canApprove: boolean
    canExport: boolean
  }
  verificationAccess: {
    types: string[]
    departments: string[]
    regions: string[]
  }
  joinedDate: string
  avatar?: string
}

interface AccessGroup {
  id: string
  name: string
  description: string
  members: string[]
  permissions: {
    canView: boolean
    canEdit: boolean
    canDelete: boolean
    canApprove: boolean
    canExport: boolean
  }
  verificationAccess: {
    types: string[]
    departments: string[]
    regions: string[]
  }
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface SharedResource {
  id: string
  name: string
  type: 'verification' | 'report' | 'dashboard' | 'document'
  sharedWith: {
    userId: string
    userName: string
    accessLevel: 'view' | 'edit' | 'admin'
    sharedAt: string
    expiresAt?: string
  }[]
  sharedBy: string
  sharedAt: string
  status: 'active' | 'expired' | 'revoked'
}

interface AuditTrail {
  id: string
  action: string
  user: string
  resource: string
  timestamp: string
  details: any
  ipAddress: string
  userAgent: string
  location: string
}

const CollaborationOversight: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'permissions' | 'sharing' | 'audit' | 'activity'>('team')
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddMember, setShowAddMember] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [showEditMember, setShowEditMember] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null)
  const [showViewDetails, setShowViewDetails] = useState(false)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionMessage, setActionMessage] = useState('')
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'viewer' as 'admin' | 'manager' | 'reviewer' | 'viewer',
    department: '',
    status: 'active' as 'active' | 'inactive' | 'pending'
  })

  // Mock data
  const mockTeamMembers: TeamMember[] = [
    {
      id: 'member-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'admin',
      department: 'HR',
      status: 'active',
      lastActive: '2025-01-16T10:30:00Z',
      permissions: {
        canView: true,
        canEdit: true,
        canDelete: true,
        canApprove: true,
        canExport: true
      },
      verificationAccess: {
        types: ['employment', 'education', 'identity', 'business'],
        departments: ['HR', 'Finance', 'Legal'],
        regions: ['North America', 'Europe']
      },
      joinedDate: '2024-01-15T09:00:00Z',
      avatar: 'SJ'
    },
    {
      id: 'member-002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'manager',
      department: 'Compliance',
      status: 'active',
      lastActive: '2025-01-16T09:45:00Z',
      permissions: {
        canView: true,
        canEdit: true,
        canDelete: false,
        canApprove: true,
        canExport: true
      },
      verificationAccess: {
        types: ['business', 'license', 'compliance'],
        departments: ['Compliance', 'Legal'],
        regions: ['North America', 'Asia']
      },
      joinedDate: '2024-02-20T10:00:00Z',
      avatar: 'MC'
    },
    {
      id: 'member-003',
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      role: 'reviewer',
      department: 'Finance',
      status: 'active',
      lastActive: '2025-01-16T08:20:00Z',
      permissions: {
        canView: true,
        canEdit: true,
        canDelete: false,
        canApprove: false,
        canExport: false
      },
      verificationAccess: {
        types: ['financial', 'business'],
        departments: ['Finance'],
        regions: ['North America']
      },
      joinedDate: '2024-03-10T14:30:00Z',
      avatar: 'LW'
    },
    {
      id: 'member-004',
      name: 'David Lee',
      email: 'david.lee@company.com',
      role: 'viewer',
      department: 'Legal',
      status: 'inactive',
      lastActive: '2025-01-10T16:00:00Z',
      permissions: {
        canView: true,
        canEdit: false,
        canDelete: false,
        canApprove: false,
        canExport: false
      },
      verificationAccess: {
        types: ['legal', 'compliance'],
        departments: ['Legal'],
        regions: ['North America']
      },
      joinedDate: '2024-04-05T11:15:00Z',
      avatar: 'DL'
    }
  ]

  const mockAccessGroups: AccessGroup[] = [
    {
      id: 'group-001',
      name: 'HR Managers',
      description: 'HR team members with full access to employee verifications',
      members: ['member-001', 'member-003'],
      permissions: {
        canView: true,
        canEdit: true,
        canDelete: false,
        canApprove: true,
        canExport: true
      },
      verificationAccess: {
        types: ['employment', 'education', 'identity'],
        departments: ['HR'],
        regions: ['North America', 'Europe']
      },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z',
      createdBy: 'member-001'
    },
    {
      id: 'group-002',
      name: 'Compliance Team',
      description: 'Compliance team with access to business and regulatory verifications',
      members: ['member-002'],
      permissions: {
        canView: true,
        canEdit: true,
        canDelete: false,
        canApprove: true,
        canExport: true
      },
      verificationAccess: {
        types: ['business', 'license', 'compliance'],
        departments: ['Compliance', 'Legal'],
        regions: ['North America', 'Asia', 'Europe']
      },
      createdAt: '2024-02-20T10:00:00Z',
      updatedAt: '2024-02-25T11:20:00Z',
      createdBy: 'member-001'
    }
  ]

  const mockSharedResources: SharedResource[] = [
    {
      id: 'resource-001',
      name: 'Monthly Verification Report',
      type: 'report',
      sharedWith: [
        { userId: 'member-002', userName: 'Mike Chen', accessLevel: 'view', sharedAt: '2025-01-15T10:00:00Z' },
        { userId: 'member-003', userName: 'Lisa Wang', accessLevel: 'edit', sharedAt: '2025-01-15T10:00:00Z' }
      ],
      sharedBy: 'Sarah Johnson',
      sharedAt: '2025-01-15T10:00:00Z',
      status: 'active'
    },
    {
      id: 'resource-002',
      name: 'Verification Dashboard',
      type: 'dashboard',
      sharedWith: [
        { userId: 'member-004', userName: 'David Lee', accessLevel: 'view', sharedAt: '2025-01-10T14:30:00Z', expiresAt: '2025-02-10T14:30:00Z' }
      ],
      sharedBy: 'Sarah Johnson',
      sharedAt: '2025-01-10T14:30:00Z',
      status: 'active'
    }
  ]

  const mockAuditTrail: AuditTrail[] = [
    {
      id: 'audit-001',
      action: 'User login',
      user: 'Sarah Johnson',
      resource: 'System',
      timestamp: '2025-01-16T10:30:00Z',
      details: { loginMethod: 'SSO', sessionDuration: '2h 15m' },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA'
    },
    {
      id: 'audit-002',
      action: 'Verification shared',
      user: 'Sarah Johnson',
      resource: 'Monthly Verification Report',
      timestamp: '2025-01-15T10:00:00Z',
      details: { sharedWith: ['Mike Chen', 'Lisa Wang'], accessLevel: 'view' },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA'
    },
    {
      id: 'audit-003',
      action: 'Permission modified',
      user: 'Sarah Johnson',
      resource: 'Mike Chen',
      timestamp: '2025-01-14T16:45:00Z',
      details: { permission: 'canApprove', oldValue: false, newValue: true },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA'
    }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'manager': return 'bg-blue-100 text-blue-800'
      case 'reviewer': return 'bg-green-100 text-green-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'edit': return 'bg-blue-100 text-blue-800'
      case 'view': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const renderTeamTab = () => (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Team Management</h2>
          <span className="text-sm text-gray-500">({filteredMembers.length} members)</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => {
              console.log('Add Member button clicked')
              setShowAddMember(true)
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="reviewer">Reviewer</option>
              <option value="viewer">Viewer</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{member.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    console.log('Edit clicked for:', member.name)
                    setSelectedMember(member)
                    setShowEditMember(true)
                  }}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <div className="relative dropdown-container">
                  <button 
                    onClick={() => {
                      console.log('More options clicked for:', member.name)
                      setShowMoreOptions(showMoreOptions === member.id ? null : member.id)
                    }}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {showMoreOptions === member.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border dropdown-container">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log('Button clicked! View details for:', member.name)
                            setSelectedMember(member)
                            setShowViewDetails(true)
                            setShowMoreOptions(null)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const action = member.status === 'active' ? 'deactivate' : 'activate'
                            setActionMessage(`${action.charAt(0).toUpperCase() + action.slice(1)} ${member.name}`)
                            setShowActionModal(true)
                            console.log(`${action} user:`, member.name)
                            setShowMoreOptions(null)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          {member.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setActionMessage(`Reset password for ${member.name}`)
                            setShowActionModal(true)
                            console.log('Reset password for:', member.name)
                            setShowMoreOptions(null)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          Reset Password
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setActionMessage(`Remove ${member.name}`)
                            setShowActionModal(true)
                            console.log('Remove user:', member.name)
                            setShowMoreOptions(null)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          Remove User
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Role</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                  {member.role}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Department</span>
                <span className="text-sm font-medium text-gray-900">{member.department}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Active</span>
                <span className="text-sm text-gray-900">{formatDate(member.lastActive)}</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Permissions:</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(member.permissions).map(([key, value]) => (
                    <span
                      key={key}
                      className={`px-2 py-1 text-xs rounded-full ${
                        value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {key.replace('can', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Access Groups</h2>
        <button
          onClick={() => setShowAddGroup(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAccessGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{group.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-600 hover:text-gray-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Members</span>
                <span className="text-sm font-medium text-gray-900">{group.members.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="text-sm text-gray-900">{formatDate(group.createdAt)}</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Permissions:</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(group.permissions).map(([key, value]) => (
                    <span
                      key={key}
                      className={`px-2 py-1 text-xs rounded-full ${
                        value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {key.replace('can', '')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Verification Access:</div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">
                    Types: {group.verificationAccess.types.join(', ')}
                  </div>
                  <div className="text-xs text-gray-600">
                    Departments: {group.verificationAccess.departments.join(', ')}
                  </div>
                  <div className="text-xs text-gray-600">
                    Regions: {group.verificationAccess.regions.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSharingTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Shared Resources</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Share2 className="w-4 h-4 mr-2" />
          Share Resource
        </button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shared With
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shared By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSharedResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {resource.sharedWith.map((share, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-900">{share.userName}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(share.accessLevel)}`}>
                            {share.accessLevel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resource.sharedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      resource.status === 'active' ? 'bg-green-100 text-green-800' :
                      resource.status === 'expired' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAuditTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Audit Trail</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAuditTrail.map((audit) => (
                <tr key={audit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{audit.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{audit.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{audit.resource}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{audit.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(audit.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderActivityTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      
      <div className="space-y-4">
        {[
          { action: 'New team member added', user: 'Sarah Johnson', time: '2 hours ago', type: 'success' },
          { action: 'Permissions updated for Mike Chen', user: 'Sarah Johnson', time: '4 hours ago', type: 'info' },
          { action: 'Resource shared with external user', user: 'Mike Chen', time: '6 hours ago', type: 'warning' },
          { action: 'Access group created', user: 'Sarah Johnson', time: '1 day ago', type: 'success' },
          { action: 'Failed login attempt', user: 'Unknown', time: '2 days ago', type: 'error' }
        ].map((activity, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                  <div className="text-xs text-gray-500">by {activity.user}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showMoreOptions && !target.closest('.dropdown-container')) {
        setShowMoreOptions(null)
      }
    }

    if (showMoreOptions) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMoreOptions])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-lg font-medium text-gray-900">Collaboration & Oversight</h1>
          <p className="text-xs text-gray-500 mt-1">Team management, permissions, sharing, and audit controls</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'team'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Team
            </button>
            <button 
              onClick={() => setActiveTab('permissions')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'permissions'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Permissions
            </button>
            <button 
              onClick={() => setActiveTab('sharing')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'sharing'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sharing
            </button>
            <button 
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'audit'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Audit
            </button>
            <button 
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'activity'
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'team' && renderTeamTab()}
        {activeTab === 'permissions' && renderPermissionsTab()}
        {activeTab === 'sharing' && renderSharingTab()}
        {activeTab === 'audit' && renderAuditTab()}
        {activeTab === 'activity' && renderActivityTab()}
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add Team Member</h2>
              <button
                onClick={() => setShowAddMember(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newMember.department}
                  onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newMember.status}
                  onChange={(e) => setNewMember({...newMember, status: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Adding new member:', newMember)
                  setActionMessage('Team member added successfully!')
                  setShowActionModal(true)
                  setShowAddMember(false)
                  setNewMember({
                    name: '',
                    email: '',
                    role: 'viewer',
                    department: '',
                    status: 'active'
                  })
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditMember && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Team Member</h2>
              <button
                onClick={() => setShowEditMember(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={selectedMember.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={selectedMember.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={selectedMember.role}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={selectedMember.department}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedMember.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditMember(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Updating member:', selectedMember.name)
                  setActionMessage('Team member updated successfully!')
                  setShowActionModal(true)
                  setShowEditMember(false)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewDetails && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Member Details</h2>
              <button
                onClick={() => setShowViewDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-medium text-blue-600">{selectedMember.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h4>
                    <p className="text-gray-600">{selectedMember.email}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(selectedMember.role)}`}>
                      {selectedMember.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium text-gray-900">{selectedMember.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMember.status)}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Active:</span>
                    <span className="font-medium text-gray-900">{formatDate(selectedMember.lastActive)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined:</span>
                    <span className="font-medium text-gray-900">{formatDate(selectedMember.joinedDate)}</span>
                  </div>
                </div>
              </div>

              {/* Permissions & Access */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Permissions</h3>
                <div className="space-y-2">
                  {Object.entries(selectedMember.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">{key.replace('can', '')}:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {value ? 'Allowed' : 'Denied'}
                      </span>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-6">Verification Access</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">Types:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedMember.verificationAccess.types.map((type, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Departments:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedMember.verificationAccess.departments.map((dept, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Regions:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedMember.verificationAccess.regions.map((region, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewDetails(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Action Completed</h2>
              <p className="text-gray-600 mb-6">{actionMessage}</p>
              <button
                onClick={() => setShowActionModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollaborationOversight
