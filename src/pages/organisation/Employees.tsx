import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  XCircle,
  X,
  Download,
  Upload,
  MoreVertical,
  UserPlus,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building,
  Shield,
  AlertTriangle,
  BarChart3,
  Settings,
  Key,
  FileText
} from 'lucide-react'
import EmployeeOnboarding from './EmployeeOnboarding'
import EmployeeBulkOperations from './EmployeeBulkOperations'
import EmployeeRBAC from './EmployeeRBAC'
import EmployeeAnalytics from './EmployeeAnalytics'

interface Employee {
  id: number
  name: string
  email: string
  phone?: string
  department: string
  position: string
  hireDate: string
  verificationStatus: 'completed' | 'pending' | 'failed' | 'expired'
  documents: string[]
  lastUpdated: string
  manager?: string
  location?: string
  trustScore?: number
  expiryDate?: string
}

const Employees = () => {
  const location = useLocation()
  
  // Determine active tab based on URL
  const getActiveTab = () => {
    if (location.pathname.includes('/onboarding')) return 'onboarding'
    if (location.pathname.includes('/bulk')) return 'bulk'
    if (location.pathname.includes('/permissions')) return 'rbac'
    if (location.pathname.includes('/analytics')) return 'analytics'
    return 'employees'
  }
  
  const activeTab = getActiveTab()
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      hireDate: '2023-01-15',
      verificationStatus: 'completed',
      documents: ['NIN', 'Passport'],
      lastUpdated: '2024-01-20',
      manager: 'John Smith',
      location: 'San Francisco, CA',
      trustScore: 95,
      expiryDate: '2025-01-20'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Marketing',
      position: 'Marketing Manager',
      hireDate: '2023-03-10',
      verificationStatus: 'pending',
      documents: ['NIN'],
      lastUpdated: '2024-01-19',
      manager: 'Lisa Wang',
      location: 'New York, NY',
      trustScore: 78,
      expiryDate: '2024-12-19'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 345-6789',
      department: 'HR',
      position: 'HR Specialist',
      hireDate: '2023-06-01',
      verificationStatus: 'failed',
      documents: ['NIN', 'CAC'],
      lastUpdated: '2024-01-18',
      manager: 'Robert Brown',
      location: 'Austin, TX',
      trustScore: 45,
      expiryDate: '2024-11-18'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Finance',
      position: 'Financial Analyst',
      hireDate: '2023-09-15',
      verificationStatus: 'expired',
      documents: ['NIN', 'Passport', 'CAC'],
      lastUpdated: '2024-01-10',
      manager: 'Jennifer Lee',
      location: 'Chicago, IL',
      trustScore: 92,
      expiryDate: '2024-01-10'
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showMoreOptions, setShowMoreOptions] = useState<number | null>(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionMessage, setActionMessage] = useState('')

  // New employee form state
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    hireDate: '',
    manager: '',
    location: ''
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center w-fit">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </span>
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center w-fit">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center w-fit">
          <XCircle className="w-3 h-3 mr-1" />
          Failed
        </span>
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full flex items-center w-fit">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Expired
        </span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    if (score >= 50) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || employee.verificationStatus === statusFilter
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.department) {
      const employee: Employee = {
        id: employees.length + 1,
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone,
        department: newEmployee.department,
        position: newEmployee.position,
        hireDate: newEmployee.hireDate,
        verificationStatus: 'pending',
        documents: ['NIN'],
        lastUpdated: new Date().toISOString().split('T')[0],
        manager: newEmployee.manager,
        location: newEmployee.location,
        trustScore: 0,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
      
      setEmployees([...employees, employee])
      setNewEmployee({
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        hireDate: '',
        manager: '',
        location: ''
      })
      setShowAddModal(false)
      setActionMessage('Employee added successfully!')
      setShowActionModal(true)
    }
  }

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowDetailsModal(true)
  }

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId))
    setShowMoreOptions(null)
    setActionMessage('Employee removed successfully!')
    setShowActionModal(true)
  }

  const handleInitiateVerification = (employeeId: number) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { ...emp, verificationStatus: 'pending' as const, lastUpdated: new Date().toISOString().split('T')[0] }
        : emp
    ))
    setShowMoreOptions(null)
    setActionMessage('Verification initiated successfully!')
    setShowActionModal(true)
  }

  const departments = [...new Set(employees.map(emp => emp.department))]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-lg font-medium text-gray-900">
                {activeTab === 'employees' && 'Employee Directory'}
                {activeTab === 'onboarding' && 'Employee Onboarding'}
                {activeTab === 'bulk' && 'Bulk Operations'}
                {activeTab === 'rbac' && 'Access Control'}
                {activeTab === 'analytics' && 'Employee Analytics'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'employees' && 'Manage employee database and verification status'}
                {activeTab === 'onboarding' && 'Streamlined employee onboarding workflow'}
                {activeTab === 'bulk' && 'Import, export, and manage multiple employees at once'}
                {activeTab === 'rbac' && 'Manage user roles, permissions, and access control'}
                {activeTab === 'analytics' && 'Comprehensive insights into employee verification and management'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {activeTab === 'employees' && (
                <>
                  <button 
                    onClick={() => setShowFilterModal(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </button>
                </>
              )}
            </div>
          </div>
        </div>


        {/* Tab Content */}
        {activeTab === 'employees' && (
          <>
            {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => emp.verificationStatus === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => emp.verificationStatus === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Issues</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employees.filter(emp => emp.verificationStatus === 'failed' || emp.verificationStatus === 'expired').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200 sm:mx-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trust Score
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                      <div className="text-sm text-gray-500">{employee.position}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(employee.verificationStatus)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {employee.trustScore !== undefined && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTrustScoreColor(employee.trustScore)}`}>
                          {employee.trustScore}%
                        </span>
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        {employee.documents.map((doc, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewDetails(employee)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setShowMoreOptions(showMoreOptions === employee.id ? null : employee.id)}
                            className="text-gray-600 hover:text-gray-900 p-1"
                            title="More Options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {showMoreOptions === employee.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                              <div className="py-1">
                                <button 
                                  onClick={() => handleInitiateVerification(employee.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Initiate Verification
                                </button>
                                <button 
                                  onClick={() => handleDeleteEmployee(employee.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  Remove Employee
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Employee</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter job position"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                  <input
                    type="date"
                    value={newEmployee.hireDate}
                    onChange={(e) => setNewEmployee({...newEmployee, hireDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                  <input
                    type="text"
                    value={newEmployee.manager}
                    onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter manager name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newEmployee.location}
                    onChange={(e) => setNewEmployee({...newEmployee, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter work location"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddEmployee}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Employee Details Modal */}
        {showDetailsModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Employee Details</h2>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedEmployee.name}</h3>
                    <p className="text-gray-600">{selectedEmployee.position}</p>
                    {getStatusBadge(selectedEmployee.verificationStatus)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        {selectedEmployee.email}
                      </div>
                      {selectedEmployee.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          {selectedEmployee.phone}
                        </div>
                      )}
                      {selectedEmployee.location && (
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          {selectedEmployee.location}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Employment Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 text-gray-400 mr-2" />
                        {selectedEmployee.department}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        Hired: {selectedEmployee.hireDate}
                      </div>
                      {selectedEmployee.manager && (
                        <div className="flex items-center text-sm">
                          <UserPlus className="w-4 h-4 text-gray-400 mr-2" />
                          Manager: {selectedEmployee.manager}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Verification Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Trust Score</p>
                      {selectedEmployee.trustScore !== undefined && (
                        <span className={`px-2 py-1 text-sm font-medium rounded-full ${getTrustScoreColor(selectedEmployee.trustScore)}`}>
                          {selectedEmployee.trustScore}%
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="text-sm font-medium">{selectedEmployee.lastUpdated}</p>
                    </div>
                    {selectedEmployee.expiryDate && (
                      <div>
                        <p className="text-sm text-gray-600">Expiry Date</p>
                        <p className="text-sm font-medium">{selectedEmployee.expiryDate}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.documents.map((doc, index) => (
                      <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleInitiateVerification(selectedEmployee.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Initiate Verification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filter Employees</h2>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => {
                    setStatusFilter('all')
                    setDepartmentFilter('all')
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Clear Filters
                </button>
                <button 
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
          </>
        )}

        {/* Other Tabs */}
        {activeTab === 'onboarding' && <EmployeeOnboarding />}
        {activeTab === 'bulk' && <EmployeeBulkOperations />}
        {activeTab === 'rbac' && <EmployeeRBAC />}
        {activeTab === 'analytics' && <EmployeeAnalytics />}

        {/* Action Confirmation Modal */}
        {showActionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600">{actionMessage}</p>
              </div>
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => setShowActionModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Employees