import React, { useState } from 'react'
import { 
  Shield, 
  Users, 
  Key, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  AlertTriangle,
  Lock,
  Unlock,
  UserCheck,
  Settings,
  FileText,
  BarChart3,
  Database,
  Mail,
  Bell,
  Calendar,
  Download,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Copy,
  Save,
  RefreshCw
} from 'lucide-react'

interface Permission {
  id: string
  name: string
  description: string
  category: 'employee' | 'verification' | 'system' | 'reports' | 'settings'
  level: 'read' | 'write' | 'admin'
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  isDefault: boolean
  createdAt: string
  updatedAt: string
  userCount: number
}

interface UserRole {
  userId: number
  userName: string
  userEmail: string
  roleId: string
  roleName: string
  assignedBy: string
  assignedAt: string
  isActive: boolean
}

const EmployeeRBAC = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions' | 'assignments'>('roles')
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const permissions: Permission[] = [
    // Employee Management
    { id: 'emp_view', name: 'View Employee Directory', description: 'View employee information and directory', category: 'employee', level: 'read' },
    { id: 'emp_create', name: 'Add Employees', description: 'Create new employee records', category: 'employee', level: 'write' },
    { id: 'emp_edit', name: 'Edit Employee Information', description: 'Modify employee details and information', category: 'employee', level: 'write' },
    { id: 'emp_delete', name: 'Remove Employees', description: 'Delete employee records', category: 'employee', level: 'admin' },
    { id: 'emp_export', name: 'Export Employee Data', description: 'Export employee information to files', category: 'employee', level: 'read' },
    { id: 'emp_import', name: 'Import Employee Data', description: 'Import employee data from files', category: 'employee', level: 'write' },
    
    // Verification Management
    { id: 'ver_view', name: 'View Verifications', description: 'View verification requests and status', category: 'verification', level: 'read' },
    { id: 'ver_initiate', name: 'Initiate Verifications', description: 'Start new verification processes', category: 'verification', level: 'write' },
    { id: 'ver_approve', name: 'Approve Verifications', description: 'Approve or reject verification requests', category: 'verification', level: 'write' },
    { id: 'ver_manage', name: 'Manage Verification Process', description: 'Configure verification workflows', category: 'verification', level: 'admin' },
    
    // System Access
    { id: 'sys_users', name: 'Manage Users', description: 'Create and manage user accounts', category: 'system', level: 'admin' },
    { id: 'sys_roles', name: 'Manage Roles', description: 'Create and assign user roles', category: 'system', level: 'admin' },
    { id: 'sys_settings', name: 'System Settings', description: 'Configure system-wide settings', category: 'system', level: 'admin' },
    { id: 'sys_logs', name: 'View System Logs', description: 'Access system audit logs', category: 'system', level: 'admin' },
    
    // Reports & Analytics
    { id: 'rep_view', name: 'View Reports', description: 'Access standard reports and dashboards', category: 'reports', level: 'read' },
    { id: 'rep_create', name: 'Create Reports', description: 'Generate custom reports', category: 'reports', level: 'write' },
    { id: 'rep_export', name: 'Export Reports', description: 'Export reports to various formats', category: 'reports', level: 'read' },
    { id: 'rep_analytics', name: 'Advanced Analytics', description: 'Access advanced analytics and insights', category: 'reports', level: 'admin' },
    
    // Settings & Configuration
    { id: 'set_org', name: 'Organization Settings', description: 'Manage organization profile and settings', category: 'settings', level: 'admin' },
    { id: 'set_integrations', name: 'Manage Integrations', description: 'Configure third-party integrations', category: 'settings', level: 'admin' },
    { id: 'set_notifications', name: 'Notification Settings', description: 'Configure notification preferences', category: 'settings', level: 'write' }
  ]

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: permissions.map(p => p.id),
      isDefault: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      userCount: 2
    },
    {
      id: 'hr_manager',
      name: 'HR Manager',
      description: 'Human resources management and employee oversight',
      permissions: ['emp_view', 'emp_create', 'emp_edit', 'emp_export', 'ver_view', 'ver_initiate', 'rep_view', 'rep_create'],
      isDefault: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      userCount: 3
    },
    {
      id: 'hr_specialist',
      name: 'HR Specialist',
      description: 'Basic HR operations and employee management',
      permissions: ['emp_view', 'emp_create', 'emp_edit', 'ver_view', 'ver_initiate', 'rep_view'],
      isDefault: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      userCount: 5
    },
    {
      id: 'manager',
      name: 'Department Manager',
      description: 'Team management and basic employee oversight',
      permissions: ['emp_view', 'ver_view', 'rep_view'],
      isDefault: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      userCount: 8
    },
    {
      id: 'employee',
      name: 'Employee',
      description: 'Basic access to personal information and verification status',
      permissions: ['emp_view'],
      isDefault: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      userCount: 45
    }
  ])

  const [userRoles, setUserRoles] = useState<UserRole[]>([
    { userId: 1, userName: 'Sarah Johnson', userEmail: 'sarah.johnson@company.com', roleId: 'hr_manager', roleName: 'HR Manager', assignedBy: 'Admin', assignedAt: '2024-01-15T10:30:00Z', isActive: true },
    { userId: 2, userName: 'Michael Chen', userEmail: 'michael.chen@company.com', roleId: 'manager', roleName: 'Department Manager', assignedBy: 'Sarah Johnson', assignedAt: '2024-01-10T14:20:00Z', isActive: true },
    { userId: 3, userName: 'Emily Davis', userEmail: 'emily.davis@company.com', roleId: 'hr_specialist', roleName: 'HR Specialist', assignedBy: 'Sarah Johnson', assignedAt: '2024-01-12T09:15:00Z', isActive: true },
    { userId: 4, userName: 'David Wilson', userEmail: 'david.wilson@company.com', roleId: 'employee', roleName: 'Employee', assignedBy: 'System', assignedAt: '2024-01-08T16:45:00Z', isActive: true },
    { userId: 5, userName: 'Lisa Wang', userEmail: 'lisa.wang@company.com', roleId: 'admin', roleName: 'Administrator', assignedBy: 'System', assignedAt: '2024-01-01T00:00:00Z', isActive: true }
  ])

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  })

  const getPermissionIcon = (category: string) => {
    switch (category) {
      case 'employee': return <Users className="w-4 h-4" />
      case 'verification': return <Shield className="w-4 h-4" />
      case 'system': return <Settings className="w-4 h-4" />
      case 'reports': return <BarChart3 className="w-4 h-4" />
      case 'settings': return <Settings className="w-4 h-4" />
      default: return <Key className="w-4 h-4" />
    }
  }

  const getPermissionColor = (level: string) => {
    switch (level) {
      case 'read': return 'bg-blue-100 text-blue-800'
      case 'write': return 'bg-green-100 text-green-800'
      case 'admin': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || permission.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateRole = () => {
    if (newRole.name && newRole.description) {
      const role: Role = {
        id: `role_${Date.now()}`,
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userCount: 0
      }
      
      setRoles([...roles, role])
      setNewRole({ name: '', description: '', permissions: [] })
      setShowRoleModal(false)
    }
  }

  const handleUpdateRole = () => {
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...editingRole, updatedAt: new Date().toISOString() }
          : role
      ))
      setEditingRole(null)
      setShowRoleModal(false)
    }
  }

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      setRoles(roles.filter(role => role.id !== roleId))
    }
  }

  const handlePermissionToggle = (permissionId: string) => {
    if (editingRole) {
      setEditingRole({
        ...editingRole,
        permissions: editingRole.permissions.includes(permissionId)
          ? editingRole.permissions.filter(p => p !== permissionId)
          : [...editingRole.permissions, permissionId]
      })
    } else {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.includes(permissionId)
          ? newRole.permissions.filter(p => p !== permissionId)
          : [...newRole.permissions, permissionId]
      })
    }
  }

  const renderRolesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Roles Management</h3>
          <p className="text-sm text-gray-600">Create and manage user roles and permissions</p>
        </div>
        <button
          onClick={() => {
            setEditingRole(null)
            setNewRole({ name: '', description: '', permissions: [] })
            setShowRoleModal(true)
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-gray-900">{role.name}</h4>
                  {role.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="relative">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Permissions:</span>
                <span className="font-medium text-gray-900">{role.permissions.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Users:</span>
                <span className="font-medium text-gray-900">{role.userCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Updated:</span>
                <span className="font-medium text-gray-900">
                  {new Date(role.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setEditingRole(role)
                  setShowRoleModal(true)
                }}
                className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => setSelectedRole(role)}
                className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              {!role.isDefault && (
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="flex items-center justify-center px-3 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>
          <p className="text-sm text-gray-600">Manage system permissions and access levels</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search permissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="employee">Employee</option>
          <option value="verification">Verification</option>
          <option value="system">System</option>
          <option value="reports">Reports</option>
          <option value="settings">Settings</option>
        </select>
      </div>

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPermissions.map((permission) => (
          <div key={permission.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="p-1.5 bg-gray-100 rounded-lg">
                  {getPermissionIcon(permission.category)}
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{permission.name}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPermissionColor(permission.level)}`}>
                    {permission.level}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600">{permission.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500 capitalize">{permission.category}</span>
              <span className="text-xs text-gray-500">ID: {permission.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAssignmentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Role Assignments</h3>
          <p className="text-sm text-gray-600">Manage user role assignments and permissions</p>
        </div>
        <button
          onClick={() => setShowAssignmentModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Assign Role
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userRoles.map((userRole) => (
                <tr key={`${userRole.userId}-${userRole.roleId}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{userRole.userName}</div>
                      <div className="text-sm text-gray-500">{userRole.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{userRole.roleName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {userRole.assignedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(userRole.assignedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      userRole.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {userRole.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
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

  return (
    <div className="space-y-6">

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'roles', name: 'Roles', icon: Shield },
            { id: 'permissions', name: 'Permissions', icon: Key },
            { id: 'assignments', name: 'Assignments', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'roles' && renderRolesTab()}
      {activeTab === 'permissions' && renderPermissionsTab()}
      {activeTab === 'assignments' && renderAssignmentsTab()}

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h2>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name *</label>
                  <input
                    type="text"
                    value={editingRole?.name || newRole.name}
                    onChange={(e) => {
                      if (editingRole) {
                        setEditingRole({ ...editingRole, name: e.target.value })
                      } else {
                        setNewRole({ ...newRole, name: e.target.value })
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <input
                    type="text"
                    value={editingRole?.description || newRole.description}
                    onChange={(e) => {
                      if (editingRole) {
                        setEditingRole({ ...editingRole, description: e.target.value })
                      } else {
                        setNewRole({ ...newRole, description: e.target.value })
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter role description"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                <div className="space-y-4">
                  {['employee', 'verification', 'system', 'reports', 'settings'].map((category) => (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3 capitalize">{category} Permissions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions
                          .filter(p => p.category === category)
                          .map((permission) => (
                            <label key={permission.id} className="flex items-start">
                              <input
                                type="checkbox"
                                checked={(editingRole?.permissions || newRole.permissions).includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="ml-3">
                                <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                                <p className="text-xs text-gray-600">{permission.description}</p>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPermissionColor(permission.level)}`}>
                                  {permission.level}
                                </span>
                              </div>
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingRole ? handleUpdateRole : handleCreateRole}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Details Modal */}
      {selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Role Details</h2>
              <button 
                onClick={() => setSelectedRole(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedRole.name}</h3>
                <p className="text-gray-600 mb-4">{selectedRole.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Users with this role:</span>
                    <span className="ml-2 font-medium">{selectedRole.userCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Permissions:</span>
                    <span className="ml-2 font-medium">{selectedRole.permissions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <span className="ml-2 font-medium">{new Date(selectedRole.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Updated:</span>
                    <span className="ml-2 font-medium">{new Date(selectedRole.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Assigned Permissions</h4>
                <div className="space-y-2">
                  {selectedRole.permissions.map((permissionId) => {
                    const permission = permissions.find(p => p.id === permissionId)
                    return permission ? (
                      <div key={permissionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          {getPermissionIcon(permission.category)}
                          <div className="ml-3">
                            <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                            <p className="text-xs text-gray-600">{permission.description}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPermissionColor(permission.level)}`}>
                          {permission.level}
                        </span>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedRole(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeRBAC
