import React, { useState } from 'react'
import { 
  Key, 
  UserPlus, 
  Users, 
  Shield, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Plus
} from 'lucide-react'

interface Permission {
  id: string
  userId: string
  userName: string
  userEmail: string
  userRole: 'owner' | 'admin' | 'editor' | 'viewer'
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    share: boolean
    decrypt: boolean
  }
  grantedAt: string
  grantedBy: string
  expiresAt?: string
  isActive: boolean
  lastAccessed?: string
  accessCount: number
}

interface AccessGroup {
  id: string
  name: string
  description: string
  members: string[]
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
    share: boolean
    decrypt: boolean
  }
  createdAt: string
  createdBy: string
  memberCount: number
}

const DocumentPermissions = () => {
  const [activeTab, setActiveTab] = useState<'permissions' | 'groups' | 'audit'>('permissions')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false)
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)
  
  // Form state for Add User Permission modal
  const [permissionForm, setPermissionForm] = useState({
    userEmail: '',
    role: 'viewer',
    documents: 'all'
  })

  // Filter state
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState({
    role: 'all',
    status: 'all',
    dateRange: 'all'
  })

  // Handler for granting user permission
  const handleGrantPermission = () => {
    if (!permissionForm.userEmail.trim()) {
      alert('Please enter a valid email address')
      return
    }
    
    // Create new permission
    const newPermission: Permission = {
      id: `perm-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: permissionForm.userEmail.split('@')[0], // Use email prefix as name
      userEmail: permissionForm.userEmail,
      userRole: permissionForm.role as 'owner' | 'admin' | 'editor' | 'viewer',
      permissions: {
        read: true,
        write: permissionForm.role === 'editor' || permissionForm.role === 'admin',
        delete: permissionForm.role === 'admin',
        share: permissionForm.role === 'editor' || permissionForm.role === 'admin',
        decrypt: true
      },
      grantedAt: new Date().toISOString().split('T')[0],
      grantedBy: 'Current User',
      isActive: true,
      accessCount: 0
    }
    
    // Add to permissions list
    setPermissions(prev => [newPermission, ...prev])
    
    // Reset form and close modal
    setPermissionForm({
      userEmail: '',
      role: 'viewer',
      documents: 'all'
    })
    setShowAddPermissionModal(false)
    
    // Show success message
    alert(`Permission granted to ${permissionForm.userEmail}`)
  }

  // Handler for editing permission
  const handleEditPermission = (permission: Permission) => {
    setSelectedPermission(permission)
    // You can add logic to open an edit modal here
    alert(`Editing permission for ${permission.userName}`)
  }

  // Handler for deactivating/activating permission
  const handleDeactivatePermission = (permissionId: string) => {
    setPermissions(prev => prev.map(perm => 
      perm.id === permissionId 
        ? { ...perm, isActive: !perm.isActive }
        : perm
    ))
    
    const permission = permissions.find(p => p.id === permissionId)
    const action = permission?.isActive ? 'deactivated' : 'activated'
    alert(`Permission ${action} for ${permission?.userName}`)
  }

  // Handler for revoking permission
  const handleRevokePermission = (permissionId: string) => {
    if (window.confirm('Are you sure you want to revoke this permission? This action cannot be undone.')) {
      setPermissions(prev => prev.filter(perm => perm.id !== permissionId))
      
      const permission = permissions.find(p => p.id === permissionId)
      alert(`Permission revoked for ${permission?.userName}`)
    }
  }

  // Handler for filter button
  const handleFilterClick = () => {
    setShowFilterPanel(!showFilterPanel)
  }

  // Handler for applying filters
  const handleApplyFilters = () => {
    // Apply filter logic here
    alert('Filters applied! Add your custom filtering logic here')
    setShowFilterPanel(false)
  }

  // Handler for clearing filters
  const handleClearFilters = () => {
    setFilterCriteria({
      role: 'all',
      status: 'all',
      dateRange: 'all'
    })
    setShowFilterPanel(false)
  }

  // Mock data
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'perm-1',
      userId: 'user-1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userRole: 'owner',
      permissions: { read: true, write: true, delete: true, share: true, decrypt: true },
      grantedAt: '2024-01-15',
      grantedBy: 'system',
      isActive: true,
      lastAccessed: '2024-01-20T10:30:00Z',
      accessCount: 45
    },
    {
      id: 'perm-2',
      userId: 'user-2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      userRole: 'editor',
      permissions: { read: true, write: true, delete: false, share: true, decrypt: true },
      grantedAt: '2024-01-16',
      grantedBy: 'John Doe',
      isActive: true,
      lastAccessed: '2024-01-20T09:15:00Z',
      accessCount: 23
    },
    {
      id: 'perm-3',
      userId: 'user-3',
      userName: 'Bob Wilson',
      userEmail: 'bob@example.com',
      userRole: 'viewer',
      permissions: { read: true, write: false, delete: false, share: false, decrypt: true },
      grantedAt: '2024-01-17',
      grantedBy: 'John Doe',
      isActive: true,
      lastAccessed: '2024-01-19T14:20:00Z',
      accessCount: 12
    }
  ])

  const [accessGroups, setAccessGroups] = useState<AccessGroup[]>([
    {
      id: 'group-1',
      name: 'Finance Team',
      description: 'Access to financial documents and reports',
      members: ['user-2', 'user-3'],
      permissions: { read: true, write: false, delete: false, share: false, decrypt: true },
      createdAt: '2024-01-10',
      createdBy: 'John Doe',
      memberCount: 8
    },
    {
      id: 'group-2',
      name: 'Legal Team',
      description: 'Access to legal documents and contracts',
      members: ['user-4', 'user-5'],
      permissions: { read: true, write: false, delete: false, share: false, decrypt: true },
      createdAt: '2024-01-12',
      createdBy: 'John Doe',
      memberCount: 5
    },
    {
      id: 'group-3',
      name: 'HR Team',
      description: 'Access to HR documents and employee records',
      members: ['user-6', 'user-7'],
      permissions: { read: true, write: true, delete: false, share: false, decrypt: true },
      createdAt: '2024-01-14',
      createdBy: 'John Doe',
      memberCount: 3
    }
  ])

  const [auditLogs] = useState([
    {
      id: 'audit-1',
      timestamp: '2024-01-20T10:30:00Z',
      user: 'John Doe',
      action: 'Permission granted',
      resource: 'confidential-report.pdf',
      details: 'Granted editor access to jane@example.com',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'audit-2',
      timestamp: '2024-01-20T09:15:00Z',
      user: 'Jane Smith',
      action: 'File accessed',
      resource: 'financial-data.xlsx',
      details: 'Downloaded file for review',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'audit-3',
      timestamp: '2024-01-20T08:45:00Z',
      user: 'Bob Wilson',
      action: 'Permission revoked',
      resource: 'legal-contract.pdf',
      details: 'Access revoked due to role change',
      ipAddress: '192.168.1.102'
    }
  ])



  const getPermissionColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-red-100 text-red-800'
      case 'admin': return 'bg-orange-100 text-orange-800'
      case 'editor': return 'bg-blue-100 text-blue-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPermissionIcon = (permission: string, enabled: boolean) => {
    if (!enabled) return null
    
    switch (permission) {
      case 'read': return <Eye className="h-3 w-3 text-green-600" />
      case 'write': return <Edit className="h-3 w-3 text-blue-600" />
      case 'delete': return <Trash2 className="h-3 w-3 text-red-600" />
      case 'share': return <Users className="h-3 w-3 text-purple-600" />
      case 'decrypt': return <Key className="h-3 w-3 text-orange-600" />
      default: return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Access Permissions</h1>
          <p className="text-gray-600">Manage who can access your documents and how</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setPermissionForm({
                userEmail: '',
                role: 'viewer',
                documents: 'all'
              })
              setShowAddPermissionModal(true)
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
          <button
            onClick={() => setShowAddGroupModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Create Group
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('permissions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'permissions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User Permissions
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'groups'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Access Groups
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'audit'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Access Audit
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users, files, or permissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-80"
            />
          </div>
          <button 
            onClick={handleFilterClick}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Access control active</span>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select 
                value={filterCriteria.role}
                onChange={(e) => setFilterCriteria(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                value={filterCriteria.status}
                onChange={(e) => setFilterCriteria(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select 
                value={filterCriteria.dateRange}
                onChange={(e) => setFilterCriteria(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">User Permissions</h2>
            <p className="text-sm text-gray-600">Manage individual user access to your documents</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {permissions.map((permission) => (
                  <tr key={permission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{permission.userName}</div>
                        <div className="text-sm text-gray-500">{permission.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPermissionColor(permission.userRole)}`}>
                        {permission.userRole}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        {Object.entries(permission.permissions).map(([perm, enabled]) => (
                          <div key={perm} className="flex items-center space-x-1">
                            {getPermissionIcon(perm, enabled)}
                            <span className={`text-xs px-2 py-1 rounded ${
                              enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {perm}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        <div>Last: {permission.lastAccessed ? new Date(permission.lastAccessed).toLocaleDateString() : 'Never'}</div>
                        <div>Count: {permission.accessCount}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditPermission(permission)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeactivatePermission(permission.id)}
                          className="text-yellow-600 hover:text-yellow-700 text-sm"
                        >
                          {permission.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleRevokePermission(permission.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Access Groups</h2>
            <p className="text-sm text-gray-600">Manage team-based access to your documents</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessGroups.map((group) => (
                <div key={group.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    <span className="text-sm text-gray-500">{group.memberCount} members</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs font-medium text-gray-700">Permissions:</div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(group.permissions).map(([perm, enabled]) => (
                        <span key={perm} className={`text-xs px-2 py-1 rounded ${
                          enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Created: {group.createdAt}</span>
                    <span>By: {group.createdBy}</span>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm">Members</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Access Audit Log</h2>
            <p className="text-sm text-gray-600">Monitor all document access and permission changes</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.resource}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Permission Modal */}
      {showAddPermissionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowAddPermissionModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Add User Permission</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Grant access to a new user for your documents
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={permissionForm.userEmail}
                  onChange={(e) => setPermissionForm(prev => ({ ...prev, userEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select 
                  value={permissionForm.role}
                  onChange={(e) => setPermissionForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
                <select 
                  value={permissionForm.documents}
                  onChange={(e) => setPermissionForm(prev => ({ ...prev, documents: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Documents</option>
                  <option value="financial">Financial Documents</option>
                  <option value="legal">Legal Documents</option>
                  <option value="hr">HR Documents</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowAddPermissionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleGrantPermission}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Grant Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowAddGroupModal(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create Access Group</h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Create a new group for team-based access control
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input
                  type="text"
                  placeholder="e.g., Finance Team"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe the group's purpose and access needs"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  {['read', 'write', 'delete', 'share', 'decrypt'].map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={perm === 'read' || perm === 'decrypt'}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 capitalize">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowAddGroupModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentPermissions
